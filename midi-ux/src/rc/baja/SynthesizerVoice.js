/**
 * @module nmodule/midi/rc/baja/SynthesizerVoice
 */
define(['baja!',
        'underscore',
        'nmodule/midi/rc/audio/Note',
        'nmodule/midi/rc/audio/util'], function (
         baja,
         _,
         Note,
         util) {

  'use strict';

  var Component = baja.Component;

  /**
   * BajaScript implementation of a `midi:SynthesizerVoice`.
   * @class
   * @alias module:nmodule/midi/rc/baja/SynthesizerVoice
   * @extends baja.Component
   */
  var SynthesizerVoice = function SynthesizerVoice() {
    var that = this;

    Component.apply(that, arguments);

    /**
     * All currently playing notes, grouped into arrays by note number.
     * @private
     * @type {Object.<number, Array.<module:nmodule/midi/rc/audio/Note>>}
     */
    that.$activeNotes = {};

    that.$init = _.once(function () {
      var lfo = that.get('lfo');

      if (lfo.get('shared')) { lfo.startEffect(); }

      lfo.attach('changed', function (prop) {
        var shared = lfo.get('shared');
        if (shared) { lfo.startEffect(); }

        switch (prop.getName()) {
          /*
           when the LFO is set to shared, attach it to all playing notes.
           */
          case 'shared':
            _.each(that.$allPlayingNotes(), function (note) {
              if (shared) {
                note.attachLFO(lfo);
              }
            });
            break;
        }
      });
    });
  };
  SynthesizerVoice.prototype = Object.create(Component.prototype);
  SynthesizerVoice.prototype.constructor = SynthesizerVoice;

  /**
   * Get all Notes currently played by this Voice.
   * @private
   * @returns {Array.<module:nmodule/midi/rc/audio/Note>}
   */
  SynthesizerVoice.prototype.$allPlayingNotes = function () {
    return _.flatten(_.values(this.$activeNotes));
  };

  /**
   * Trigger a note-on, which starts a Note playing by this Voice.
   *
   * @param {number} noteNumber
   * @param {number} velocity
   */
  SynthesizerVoice.prototype.noteOn = function (noteNumber, velocity) {
    if (velocity === 0) {
      return this.noteOff(noteNumber);
    }

    this.$init();
    var that = this,
        outNode = that.getParent().get('effects').getInputNode(),
        note = new Note(that, noteNumber, velocity, that.get('lfo'), outNode),
        activeNotes = that.$activeNotes,
        stack = activeNotes[noteNumber] || (activeNotes[noteNumber] = []);

    stack.push(note);
    note.start();
  };

  /**
   * Trigger a note-off, which stops a currently playing Note.
   *
   * @param {number} noteNumber
   */
  SynthesizerVoice.prototype.noteOff = function (noteNumber) {
    var stack = this.$activeNotes[noteNumber],
        note = stack && stack.shift();

    this.$init();
    if (note) {
      note.stop();
    }
  };

  /**
   * Trigger note-offs for all currently playing Notes.
   */
  SynthesizerVoice.prototype.allNotesOff = function () {
    var that = this;
    _.each(that.$allPlayingNotes(), function (note) {
      that.noteOff(note.$noteNumber);
    });
  };

  return SynthesizerVoice;
});