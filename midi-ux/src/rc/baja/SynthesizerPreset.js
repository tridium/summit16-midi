/**
 * @module nmodule/midi/rc/baja/SynthesizerPreset
 */
define(['baja!',
        'nmodule/midi/rc/audio/AudioContext'], function (
         baja,
         AudioContext) {

  'use strict';

  var Component = baja.Component;

  /**
   * BajaScript representation of a `midi:SynthesizerPreset`.
   *
   * @class
   * @alias module:nmodule/midi/rc/baja/SynthesizerPreset
   * @extends baja.Component
   */
  var SynthesizerPreset = function SynthesizerPreset() {
    var that = this;
    Component.apply(that, arguments);

    /*
     for convenience, have Voices always expand in the property sheet so i
     don't have to do it manually each time.
     */
    that.attach('added', function (prop) {
      if (prop.getType().is('midi:SynthesizerVoice')) {
        that.setFacets({
          slot: prop,
          facets: baja.Facets.make({ alwaysExpand: true })
        });
      }
    });
  };
  SynthesizerPreset.prototype = Object.create(Component.prototype);
  SynthesizerPreset.prototype.constructor = SynthesizerPreset;

  /**
   * Starts up effect processing and connects the preset up to the main audio
   * output node.
   */
  SynthesizerPreset.prototype.start = function () {
    var effects = this.get('effects');
    effects.startEffect();
    effects.getOutputNode().connect(AudioContext.getOut());
  };

  /**
   * Shuts down effect processing and playback.
   */
  SynthesizerPreset.prototype.stop = function () {
    this.get('effects').stopEffect();
    this.getSlots().is('midi:SynthesizerVoice').eachValue(function (voice) {
      voice.allNotesOff();
    });
  };

  /**
   * Send a note-on to all (non-hidden) Voices.
   * @param {number} note
   * @param {number} velocity
   */
  SynthesizerPreset.prototype.noteOn = function (note, velocity) {
    this.getSlots().is('midi:SynthesizerVoice').each(function (slot) {
      if (!(slot.getFlags() & baja.Flags.HIDDEN)) {
        this.get(slot).noteOn(note, velocity);
      }
    });
  };

  /**
   * Send a note-off to all Voices.
   * @param {number} note
   */
  SynthesizerPreset.prototype.noteOff = function (note) {
    this.getSlots().is('midi:SynthesizerVoice').each(function (slot) {
      this.get(slot).noteOff(note);
    });
  };

  return SynthesizerPreset;
});