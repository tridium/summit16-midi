define([], function () {
  'use strict';

  /**
   * @exports nmodule/midi/rc/audio/util
   */
  var exports = {};

  /**
   * Get an audio frequency in Hz from a MIDI note number.
   * @param {number} note
   * @returns {number}
   */
  exports.noteToFrequency = function (note) {
    return 440 * Math.pow(2, (note - 69) / 12);
  };

  return exports;
});