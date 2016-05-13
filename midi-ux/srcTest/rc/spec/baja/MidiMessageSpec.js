define(['baja!',
        'baja!midi:MidiMessage',
        'underscore',
        'nmodule/midi/rc/baja/MidiMessage'], function (
         baja,
         types,
         _,
         MidiMessage) {

  'use strict';

  describe('nmodule/midi/rc/baja/MidiMessage', function () {
    function make(payload) { return MidiMessage.DEFAULT.make(payload); }

    it('is registered on midi:MidiMessage type', function () {
      expect(baja.$('midi:MidiMessage')).toEqual(jasmine.any(MidiMessage));
    });

    describe('#decodeFromString()', function () {
      it('decodes string of hex bytes, separated by spaces', function () {
        expect(make([]).decodeFromString('dd ee ff').getPayload())
          .toEqual([ 0xdd, 0xee, 0xff ]);
      });
    });

    describe('#encodeToString()', function () {
      it('returns payload in hex, separated by spaces', function () {
        expect(make([ 0xaa, 0xbb, 0xcc ]).encodeToString()).toBe('aa bb cc');
      });
    });

    describe('#getPayload()', function () {
      it('returns the message byte array', function () {
        var payload = [ 1, 2, 3, 4, 5 ];
        expect(make(payload).getPayload()).toEqual(payload);
      });
    });

    describe('#getStatusType()', function () {
      _.each({
        NOTE_OFF: 0x80,
        NOTE_ON: 0x90,
        AFTERTOUCH: 0xa0,
        CONTROL_CHANGE: 0xb0,
        PATCH_CHANGE: 0xc0,
        CHANNEL_PRESSURE: 0xd0,
        PITCH_BEND: 0xe0,
        SYSEX: 0xf0
      }, function (b, str) {
        it('returns ' + str + ' for first byte 0x' + b.toString(16), function () {
          expect(make([b]).getStatusType()).toBe(str);
        });
      });

      it('throws for any other first byte', function () {
        expect(function () {
          make([0x70]).getStatusType();
        }).toThrow('could not get status type from byte 0x70');
      });
    });

    describe('#make()', function () {
      it('accepts an array of bytes', function () {
        var payload = [ 1, 2, 3, 4, 5 ];
        expect(make(payload).getPayload()).toEqual(payload);
      });
    });
  });
});