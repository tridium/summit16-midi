/**
 * @module nmodule/midi/rc/baja/MidiMessage
 */
define(['baja!',
        'bajaScript/baja/obj/objUtil'], function (baja, objUtil) {

  'use strict';

  var Simple = baja.Simple,
      cacheDecode = objUtil.cacheDecode,
      cacheEncode = objUtil.cacheEncode;

  /**
   * BajaScript implementation of a `midi:MidiMessage`.
   *
   * @class
   * @alias module:nmodule/midi/rc/baja/MidiMessage
   * @extends baja.Simple
   */
  var MidiMessage = function MidiMessage() {
    Simple.apply(this, arguments);
  };
  MidiMessage.prototype = Object.create(Simple.prototype);
  MidiMessage.prototype.constructor = MidiMessage;

  /**
   * Make a new MidiMessage.
   * @param {Array.<number>} payload
   * @returns {module:nmodule/midi/rc/baja/MidiMessage}
   */
  MidiMessage.make = function (payload) {
    var m = new MidiMessage();
    m.$payload = payload;
    return m;
  };

  /**
   * Get the message payload in bytes.
   * @returns {Array.<number>}
   */
  MidiMessage.prototype.getPayload = function () {
    return this.$payload;
  };

  /**
   * Get the MIDI status type of this message (e.g. `NOTE_ON`, `NOTE_OFF`).
   * See `BMidiMessage.StatusType`.
   * @returns {string}
   */
  MidiMessage.prototype.getStatusType = function () {
    var b = (this.$payload[0] || 0) & 0xF0;
    switch (b) {
      case 0x80: return 'NOTE_OFF';
      case 0x90: return 'NOTE_ON';
      case 0xA0: return 'AFTERTOUCH';
      case 0xB0: return 'CONTROL_CHANGE';
      case 0xC0: return 'PATCH_CHANGE';
      case 0xD0: return 'CHANNEL_PRESSURE';
      case 0xE0: return 'PITCH_BEND';
      case 0xF0: return 'SYSEX';
      default: throw new Error('could not get status ' +
        'type from byte 0x' + b.toString(16));
    }
  };

  MidiMessage.prototype.make = function () {
    return MidiMessage.make.apply(MidiMessage, arguments);
  };

  MidiMessage.prototype.decodeFromString = cacheDecode(function (str) {
    if (!str) {
      return MidiMessage.DEFAULT;
    }
    return MidiMessage.make(str.split(' ').map(function (hex) {
      return parseInt(hex, 16);
    }));
  });

  MidiMessage.prototype.encodeToString = cacheEncode(function () {
    return this.$payload.map(function (b) {
      return b.toString(16);
    }).join(' ');
  });

  MidiMessage.DEFAULT = MidiMessage.make([]);

  return MidiMessage;
});
