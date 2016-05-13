/*jshint browser: true */

/**
 * @module nmodule/midi/rc/fe/SynthesizerEditor
 */
define(['baja!',
        'baja!midi:IEffect,midi:MidiMessage,midi:Synthesizer,' +
          'midi:SynthesizerPreset,midi:SynthesizerVoice',
        'bajaux/events',
        'bajaux/mixin/subscriberMixIn',
        'jquery',
        'Promise',
        'underscore',
        'nmodule/js/rc/asyncUtils/asyncUtils',
        'nmodule/midi/rc/fe/SlotSelector',
        'nmodule/webEditors/rc/fe/fe',
        'nmodule/webEditors/rc/fe/baja/BaseEditor',
        'nmodule/webEditors/rc/fe/baja/util/DepthSubscriber',
        'hbs!nmodule/midi/rc/fe/template/SynthesizerEditor',
        'css!nmodule/midi/rc/midi'], function (
         baja,
         types,
         events,
         subscriberMixIn,
         $,
         Promise,
         _,
         asyncUtils,
         SlotSelector,
         fe,
         BaseEditor,
         DepthSubscriber,
         template) {

  'use strict';

  var MODIFY_EVENT = events.MODIFY_EVENT,
      doRequire = asyncUtils.doRequire;

  function defaultPreset() {
    var preset = baja.$('midi:SynthesizerPreset', {
      voice: baja.$('midi:SynthesizerVoice')
    });

    preset.setFacets({
      slot: 'voice',
      facets: baja.Facets.make({ alwaysExpand: true })
    });

    return preset;
  }

  var keyCodeToNoteNumber = (function () {
    var map = {},
        topRowKeyCodes = [81,50,87,51,69,82,53,84,54,89,55,85,73,57,79,48,80,219,187,221],
        bottomRowKeyCodes = [90,83,88,68,67,86,71,66,72,78,74,77,188,76,190,186,191];
    _.each(topRowKeyCodes, function (keyCode, i) {
      map[keyCode] = 60 + i;
    });
    _.each(bottomRowKeyCodes, function (keyCode, i) {
      map[keyCode] = 48 + i;
    });
    return map;
  }());

  var patchChangeCCs = [ 0x59, 0x4f, 0x45, 0x3b, 0x31, 0x27, 0x1d, 0x13 ];

  /**
   * Editor view for a `midi:Synthesizer`. Provides both editing and playback
   * capabilities.
   *
   * @class
   * @alias module:nmodule/midi/rc/fe/SynthesizerEditor
   * @extends module:nmodule/webEditors/rc/fe/baja/BaseEditor
   */
  var SynthesizerEditor = function SynthesizerEditor() {
    var that = this;

    BaseEditor.apply(that, arguments);
    subscriberMixIn(that);

    // DepthSubscriber is currently private API and subject to change. Otherwise
    // must always subscribe presets/voices/effects on demand.
    that.$subscriber = new DepthSubscriber(6);
    that.$subscriber.attach('changed', function (prop) {
      if (prop.getName() === 'activePreset' && baja.hasType(this, 'midi:Synthesizer')) {
        var activePreset = this.get('presets').get(this.get(prop));
        return activePreset && that.$setSelectedPreset(activePreset);
      }
    });
  };
  SynthesizerEditor.prototype = Object.create(BaseEditor.prototype);
  SynthesizerEditor.prototype.constructor = SynthesizerEditor;

  SynthesizerEditor.prototype.$getLaunchpadWidget = function () {
    return this.jq().children('.launchpad').data('widget');
  };

  /**
   * @private
   * @returns {module:nmodule/midi/rc/fe/SlotSelector}
   */
  SynthesizerEditor.prototype.$getMidiDeviceSelectorEditor = function () {
    return this.jq().children('.synthControls').children('.midiDeviceNames').data('widget');
  };

  /**
   * @private
   * @returns {module:nmodule/webEditors/rc/wb/MultiSheet}
   */
  SynthesizerEditor.prototype.$getPresetEditor = function () {
    return this.jq().children('.presetEditor').data('widget');
  };

  /**
   * @private
   * @returns {module:nmodule/midi/rc/fe/SlotSelector}
   */
  SynthesizerEditor.prototype.$getPresetSelectorEditor = function () {
    return this.jq().children('.synthControls').children('.presetNames').data('widget');
  };

  /**
   * @private
   * @param {baja.Component} midiDevice the `midi:MidiDevice` corresponding to
   * the input port of the Launchpad Pro.
   * @returns {Promise} promise to be resolved when the widget is loaded.
   */
  SynthesizerEditor.prototype.$loadLaunchpadWidget = function (midiDevice) {
    var that = this,
        widget = that.$getLaunchpadWidget();

    if (widget) {
      return widget.load(midiDevice);
    } else {
      return doRequire('nmodule/midi/rc/fe/LaunchpadProWidget')
        .then(function (LaunchpadProWidget) {
          return fe.buildFor({
            dom: that.jq().children('.launchpad').css('opacity', '0.6'),
            type: LaunchpadProWidget,
            value: midiDevice
          });
        });
    }
  };

  /**
   * Get the currently activated `midi:MidiDevice`, or `undefined` if none
   * available.
   * @private
   * @returns {Promise.<baja.Component|undefined>}
   */
  SynthesizerEditor.prototype.$getMidiDevice = function () {
    var selector = this.$getMidiDeviceSelectorEditor();
    return Promise.resolve(selector && selector.read());
  };

  /**
   * Set the current instance `midi:MidiDevice` used to receive MIDI events.
   * Will subscribe to the `message` Topic and handle incoming
   * `midi:MidiMessage`s from the station.
   *
   * If the `MidiDevice` happens to be a Launchpad Pro (as used in the Summit
   * 16 demo), will also load up the `LaunchpadProWidget` overlay for real-time
   * note display.
   *
   * @private
   * @param {baja.Component} midiDevice `midi:MidiDevice` instance from which to
   * receive MIDI messages
   * @returns {Promise} promise to be resolved once the `midi:MidiDevice` is
   * fully subscribed
   */
  SynthesizerEditor.prototype.$setMidiDevice = function (midiDevice) {
    if (!midiDevice) { return Promise.resolve(); }

    var that = this,
        deviceSub = that.$deviceSub;

    if (deviceSub) { deviceSub.unsubscribe(midiDevice); }

    deviceSub = that.$deviceSub = new baja.Subscriber();
    deviceSub.attach('topicFired', function (topic, event, cx) {
      if (topic.getName() === 'message') {
        that.handleMidiMessage(event);
      }
    });

    return Promise.join(
      deviceSub.subscribe(midiDevice),
      midiDevice.getName().match(/Launchpad/i) &&
        that.$loadLaunchpadWidget(midiDevice)
    );
  };

  /**
   * Get the preset that is currently being played, as configured on the
   * `Synthesizer`'s `presets` folder. If none is configured, a new, default
   * preset will be created.
   *
   * @private
   * @param {baja.Component} synth a `midi:Synthesizer` instance
   * @returns {Promise.<baja.Component>} promise to be resolved with the
   * currently selected `midi:SynthesizerPreset`
   */
  SynthesizerEditor.prototype.$getSelectedPreset = function (synth) {
    var presets = synth.get('presets'),
        selectedPreset = presets.get(synth.get('activePreset')) ||
          presets.getSlots().properties().is('midi:SynthesizerPreset')
            .toValueArray()[0] ||
          presets.add({
            slot: 'newPreset',
            value: defaultPreset()
          })
            .then(function () { return presets.get('newPreset'); });

    return Promise.resolve(selectedPreset);
  };

  /**
   * Set the currently selected preset, start it up and get it ready to edit and
   * play. If a preset was previously loaded, it will be shut down.
   *
   * @private
   * @param {baja.Component} preset the `midi:SynthesizerPreset` to start
   * playing
   * @returns {Promise} promise to be resolved when the preset is fully loaded
   * and started up
   */
  SynthesizerEditor.prototype.$setSelectedPreset = function (preset) {
    var that = this,
        presetEditor = that.$getPresetEditor();

    if (presetEditor) {
      presetEditor.value().stop();
    }

    return Promise.resolve(presetEditor && presetEditor.destroy())
      .then(function () {
        preset.start();
        return Promise.join(
          that.value().set({ slot: 'activePreset', value: preset.getName() }),
          that.$getPresetSelectorEditor().setSelectedSlot(preset.getName()),
          fe.buildFor({
            dom: that.jq().children('.presetEditor'),
            value: preset,
            properties: { showHeader: false }
          })
        );
      });
  };

  /**
   * Handle incoming MIDI note data from the station.
   *
   * @param {module:nmodule/midi/rc/baja/MidiMessage} msg the MIDI node data
   */
  SynthesizerEditor.prototype.handleMidiMessage = function (msg) {
    var that = this,
        preset = that.$getPresetEditor().value(),
        payload = msg.getPayload();

    switch (msg.getStatusType()) {
      case 'NOTE_ON': return preset.noteOn(payload[1], payload[2]);
      case 'NOTE_OFF': return preset.noteOff(payload[1]);
      case 'CONTROL_CHANGE':
        /*
          the circle buttons down the side of the Launchpad fire CCs. use these
          as patch-change buttons.
         */
        var patchChange = _.indexOf(patchChangeCCs, payload[1]);
        if (patchChange >= 0 && payload[2]) { //payload[2] = 0x7f on press, 0 on release
          var synth = that.value(),
              presets = synth.get('presets'),
              desiredPreset = presets.getSlots().is('midi:SynthesizerPreset')
                .toValueArray()[patchChange];

          if (desiredPreset) {
            return synth.set({ slot: 'activePreset', value: desiredPreset.getName() });
          }
        }
        break;
    }
  };

  /**
   * Create editors for selected MIDI device, selected preset, and currently
   * loaded preset.
   *
   * @param {jQuery} dom
   * @returns {*}
   */
  SynthesizerEditor.prototype.doInitialize = function (dom) {
    var that = this;

    dom.html(template());

    /* when a new device or preset is selected, load it up. */

    dom.on(MODIFY_EVENT, '.midiDeviceNames', function (e, ed) {
      ed.read()
        .then(function (device) { return that.$setMidiDevice(device); })
        .catch(baja.error);
    });

    dom.on(MODIFY_EVENT, '.presetNames', function (e, ed) {
      ed.read()
        .then(function (preset) {
          return that.value().set({
            slot: 'activePreset', value: preset.getName()
          });
        })
        .catch(baja.error);
    });

    /* auto-save the preset editor so you don't have to click a save button
    *  to hear the difference. */
    dom.on(MODIFY_EVENT, '.presetEditor', _.debounce(function (e, ed) {
      ed.save().catch(baja.error);
    }, 400));

    var held = {};
    $(window).on('keydown', (that.$keyHandler = function (e) {
      if (held[e.which]) { return; }
      held[e.which] = true;
      var note = keyCodeToNoteNumber[e.which];
      if (note) {
        that.handleMidiMessage(baja.$('midi:MidiMessage', [
          0x90, note, 0x7f
        ]));
      }
    }));

    $(window).on('keyup', (that.$keyHandler = function (e) {
      held[e.which] = false;
      var note = keyCodeToNoteNumber[e.which];
      if (note) {
        that.handleMidiMessage(baja.$('midi:MidiMessage', [
          0x90, note, 0x00
        ]));
      }
    }));

    return baja.Ord.make('service:midi:MidiNetwork')
      .get({ lease: true })
      .then(function (midiNetwork) {
        return Promise.join(
          fe.buildFor({
            dom: dom.find('.midiDeviceNames'),
            value: midiNetwork,
            type: SlotSelector,
            properties: { targetType: 'midi:MidiDevice' }
          })
        );
      })
      .catch(function (ignore) {
        //if no midi network just use keylistener
      });
  };

  /**
   * Load up a `midi:Synthesizer` instance and get it ready to play.
   * @param {baja.Component} synth currently viewed `midi:Synthesizer`
   * @returns {Promise}
   */
  SynthesizerEditor.prototype.doLoad = function (synth) {
    var that = this,
        dom = that.jq();

    return Promise.join(
      that.$getSelectedPreset(synth),
      that.$getMidiDevice(),
      fe.buildFor({
        dom: dom.find('.presetNames'),
        value: synth.get('presets'),
        type: SlotSelector,
        properties: { targetType: 'midi:SynthesizerPreset' }
      })
    )
      .spread(function (preset, midiDevice) {
        return Promise.join(
          that.$setSelectedPreset(preset),
          that.$setMidiDevice(midiDevice)
        );
      });
  };

  /**
   * Release held resources - in this case, a subscription to the currently
   * selected `midi:MidiDevice`.
   */
  SynthesizerEditor.prototype.doDestroy = function () {
    if (this.$deviceSub) {
      this.$deviceSub.unsubscribeAll();
    }
    if (this.$keyHandler) {
      $(window).off('keyup', this.$keyHandler);
    }
  };

  return SynthesizerEditor;
});