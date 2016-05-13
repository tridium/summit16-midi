/*jshint browser: true */

/**
 * @module nmodule/midi/rc/fe/LaunchpadProWidget
 */
define(['baja!',
        'bajaux/mixin/subscriberMixIn',
        'd3',
        'Promise',
        'underscore',
        'nmodule/js/rc/switchboard/switchboard',
        'nmodule/webEditors/rc/fe/baja/BaseEditor'], function (
         baja,
         subscriberMixIn,
         d3,
         Promise,
         _,
         switchboard,
         BaseEditor) {

  'use strict';

  var ROOT_COLOR = 'hsl(0, 35%, 60%)',
      WHITE_KEY_COLOR = 'hsl(185, 40%, 40%)',
      BLACK_KEY_COLOR = 'hsl(0, 0%, 49%)',

      NOTE_NUMBERS_ON_PAD = [
        _.range(0x47, 0x4f),
        _.range(0x42, 0x4a),
        _.range(0x3d, 0x45),
        _.range(0x38, 0x40),
        _.range(0x33, 0x3b),
        _.range(0x2e, 0x36),
        _.range(0x29, 0x31),
        _.range(0x24, 0x2c)
      ];

  function isRoot(noteNumber) {
    return (noteNumber % 12) === 0;
  }

  function isWhiteKey(noteNumber) {
    return _.contains([ 0, 2, 4, 5, 7, 9, 11 ], noteNumber % 12);
  }

  function getNoteOffColor(noteNumber) {
    return isRoot(noteNumber) ? ROOT_COLOR
      : isWhiteKey(noteNumber) ? WHITE_KEY_COLOR
      : BLACK_KEY_COLOR;
  }

  function getColor(buttonStatus) {
    var noteNumber = buttonStatus.noteNumber,
        baseColor = getNoteOffColor(noteNumber),
        velocity = buttonStatus.velocity;

    if (velocity) {
      // when the button is hit, show it in a color between red (low notes) and
      // purple (high notes). when the button is hit harder, increase
      // saturation/luminance up to a max of 90%/80% (above that and the button
      // is basically white)
      var max = 'hsl(' + ((noteNumber - 0x24) / (0x50 - 0x24) * 300) + ',90%,80%)';
      return d3.interpolateHsl(baseColor, max)(velocity / 127);
    }

    return baseColor;
  }

  /**
   * The current status of a button on the LaunchpadPro.
   *
   * @typedef ButtonStatus
   * @property {number} x x-coordinate of the button, from 0 to 7 left to right
   * @property {number} y y-coordinate of the button, from 0 to 7 top to bottom
   * @property {number} noteNumber MIDI note number of the button (multiple
   * buttons can share the same note number)
   * @property {number} velocity the velocity at which the button is held - 0
   * indicates the button is not pressed
   */

  /**
   * Widget that loads/subscribes a `midi:MidiDevice` corresponding to the
   * input port of a Launchpad Pro. It uses D3 + SVG to mirror the Notes layout
   * of the Launchpad Pro and light up notes in real time as they are played.
   *
   * @class
   * @alias module:nmodule/midi/rc/fe/LaunchpadProWidget
   * @extends module:nmodule/webEditors/rc/fe/baja/BaseEditor
   */
  var LaunchpadProWidget = function LaunchpadProWidget() {
    var that = this;

    BaseEditor.apply(that, arguments);
    subscriberMixIn(that);

    /**
     * @private
     * @type Array.<ButtonStatus>
     */
    that.$buttonsStatus = _.flatten(_.map(NOTE_NUMBERS_ON_PAD, function (row, y) {
      return _.map(row, function (noteNumber, x) {
        return { noteNumber: noteNumber, x: x, y: y, velocity: 0 };
      });
    }));

    that.getSubscriber().attach('topicFired', function (topic, event) {
      if (topic.getName() === 'message') {
        that.$handleMidiMessage(event);
      }
    });

    //ensure calls to $doNoteOn correctly fire in order
    switchboard(this, {
      '$doNoteOn': { allow: 'oneAtATime', onRepeat: 'queue' }
    });
  };
  LaunchpadProWidget.prototype = Object.create(BaseEditor.prototype);
  LaunchpadProWidget.prototype.constructor = LaunchpadProWidget;

  /**
   * When a note is played, update the underlying keymap and trigger a D3 update
   * of the SVG display.
   *
   * @private
   * @param {baja.Simple} midiMessage the `midi:MidiMessage` triggered from the
   * station
   */
  LaunchpadProWidget.prototype.$handleMidiMessage = function (midiMessage) {
    var payload = midiMessage.getPayload();

    switch (midiMessage.getStatusType()) {
      case 'NOTE_OFF':
        return this.$handleNoteOn(payload[1], 0);
      case 'NOTE_ON':
        return this.$handleNoteOn(payload[1], payload[2]);
    }
  };

  /**
   * Update the visual state of all buttons affected by the note-on message.
   * @param {number} noteNumber the note number pressed
   * @param {number} velocity the velocity which which it was pressed - 0 is
   * equal to a note-off
   */
  LaunchpadProWidget.prototype.$handleNoteOn = function (noteNumber, velocity) {
    var eachPressedButton = this.$selectSvg().selectAll('rect.squareButton')
      .filter(function (buttonStatus) {
        if (buttonStatus.noteNumber === noteNumber) {
          buttonStatus.velocity = velocity;
          return true;
        }
      });

    eachPressedButton
      .transition()
        .attr('fill', getColor)
        .duration(function (buttonStatus) {
          return buttonStatus.velocity ? 0 : 150;
        });
  };

  /**
   * @private
   * @returns {D3}
   */
  LaunchpadProWidget.prototype.$selectSvg = function () {
    return d3.select(this.jq().children('svg')[0]);
  };

  /**
   * @private
   * @param {number} noteNumber
   * @param {number} velocity
   * @returns {Promise}
   */
  LaunchpadProWidget.prototype.$doNoteOn = function (noteNumber, velocity) {
    return this.value().fire({
      slot: 'message', value: baja.$('midi:MidiMessage', [ 0x90, noteNumber, velocity ])
    });
  };

  /**
   * Perform one-time initialization of SVG buttons, binding the underlying
   * `$buttonsStatus` array as the D3 data.
   * @private
   */
  LaunchpadProWidget.prototype.$initializeButtons = function () {
    var that = this,
        svg = that.$selectSvg(),
        buttons = svg.selectAll('rect.squareButton')
          .data(this.$buttonsStatus),
        eachNewButton = buttons.enter(),
        pressed;

    function noteOn(noteNumber, velocity) {
      return that.$doNoteOn(noteNumber, velocity);
    }

    function noteOff(noteNumber) { return noteOn(noteNumber, 0); }

    eachNewButton
      .append('rect')
      .attr('x', function (buttonStatus) { return (buttonStatus.x * 100) + 10; })
      .attr('y', function (buttonStatus) { return (buttonStatus.y * 100) + 10; })
      .attr('width', '80')
      .attr('height', '80')
      .attr('rx', '10')
      .attr('ry', '10')
      .attr('fill', getColor)
      .classed('squareButton', true);

    buttons
      .on('mouseenter', function (btn) {
        if (d3.event.buttons & 1) { noteOn(btn.noteNumber, 0x7f); }
      })
      .on('mouseleave', function (btn) {
        noteOff(btn.noteNumber);
      })
      .on('mousedown', function (btn) {
        noteOn(btn.noteNumber, 0x7f);
      })
      .on('mouseup', function (btn) {
        noteOff(btn.noteNumber);
      });

    //no exit() necessary as buttons will never be removed
  };

  /**
   * Set up the initial SVG with all keys unpressed and add the `LaunchpadPro`
   * CSS class.
   *
   * @param {jQuery} dom
   */
  LaunchpadProWidget.prototype.doInitialize = function (dom) {
    dom.addClass('LaunchpadPro')
       .html('<svg width="800" height="800" viewBox="0 0 800 800"></svg>');
    this.$initializeButtons();
  };

  /**
   * Remove the `LaunchpadPro` CSS class.
   */
  LaunchpadProWidget.prototype.doDestroy = function () {
    this.jq().removeClass('LaunchpadPro');
  };

  return LaunchpadProWidget;
});
