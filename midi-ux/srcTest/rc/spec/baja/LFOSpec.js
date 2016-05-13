define(['baja!',
        'baja!midi:LFO,midi:LFOTargetType,midi:OscillatorType',
        'nmodule/midi/rc/baja/LFO'], function (
         baja,
         types,
         LFO) {

  'use strict';

  describe('nmodule/midi/rc/baja/LFO', function () {
    var lfo;

    beforeEach(function () {
      lfo = baja.$('midi:LFO');
      lfo.startEffect();
    });

    afterEach(function () {
      lfo.stopEffect();
    });

    it('is registered on midi:LFO type', function () {
      expect(lfo).toEqual(jasmine.any(LFO));
    });

    describe('#startEffect()', function () {
      it('connects an oscillator to a gain node', function () {
        expect(lfo.$oscNode.isConnectedTo(lfo.$gainNode)).toBe(true);
      });
    });

    describe('#stopEffect()', function () {
      it('disconnects oscillator from gain node', function () {
        lfo.stopEffect();
        expect(lfo.$oscNode.isConnectedTo(lfo.$gainNode)).toBe(false);
      });
    });

    describe('#updateEffect()', function () {
      it('sets oscillator type to oscType slot', function () {
        lfo.set({
          slot: 'oscillatorType',
          value: baja.$('midi:OscillatorType', 'triangle')
        });
        lfo.updateEffect();
        expect(lfo.$oscNode.type).toBe('triangle');
      });

      it('sets gain to amount when target is pitch', function () {
        lfo.set({
          slot: 'target', value: baja.$('midi:LFOTargetType', 'pitch')
        });
        lfo.set({ slot: 'amount', value: 99 });
        lfo.updateEffect();
        expect(lfo.$gainNode.gain.value).toBe(99);
      });

      it('sets gain to amount / 100 when target is volume', function () {
        lfo.set({
          slot: 'target', value: baja.$('midi:LFOTargetType', 'volume')
        });
        lfo.set({ slot: 'amount', value: 99 });
        lfo.updateEffect();
        expect(lfo.$gainNode.gain.value).toBeCloseTo(0.99, 0.001);
      });

      it('sets gain to amount * 100 when target is filter', function () {
        lfo.set({
          slot: 'target', value: baja.$('midi:LFOTargetType', 'filter')
        });
        lfo.set({ slot: 'amount', value: 99 });
        lfo.updateEffect();
        expect(lfo.$gainNode.gain.value).toBe(9900);
      });

      it('sets oscillator node frequency', function () {
        lfo.set({ slot: 'frequency', value: 101 });
        lfo.updateEffect();
        expect(lfo.$oscNode.frequency.value).toBe(101);
      });
    });
  });
});