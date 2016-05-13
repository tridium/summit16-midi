define(['baja!',
        'baja!midi:Delay,midi:Distortion,midi:Effects,midi:IEffect',
        'underscore',
        'nmodule/midi/rc/baja/fx/Effects',
        'nmodule/midiTest/rc/mockBajaOps'], function (
         baja,
         types,
         _,
         Effects,
         ops) {

  'use strict';

  describe('nmodule/midi/rc/baja/fx/Effects', function () {
    var effects;
    beforeEach(function () {
      effects = baja.$('midi:Effects');
    });

    it('is registered on midi:Effects type', function () {
      expect(effects).toEqual(jasmine.any(Effects));
    });

    function verifySequentialConnection(effects) {
      var curNode = effects.getInputNode();

      effects.getSlots().is('midi:IEffect').eachValue(function (effect) {
        expect(curNode.isConnectedTo(effect.getInputNode())).toBe(true);
        curNode = effect.getOutputNode();
      });

      expect(curNode.isConnectedTo(effects.getOutputNode())).toBe(true);
    }

    describe('baja event handler', function () {
      beforeEach(function () { effects.startEffect(); });

      it('updates when an IEffect is added', function () {
        ops.add(effects, 'delay', baja.$('midi:Delay'));
        verifySequentialConnection(effects);
      });

      it('does not update if a non-IEffect is added', function () {
        spyOn(effects, 'updateEffect');
        ops.add(effects, 'string', 'string');
        expect(effects.updateEffect).not.toHaveBeenCalled();
      });

      it('stops a removed IEffect and updates itself', function () {
        var delay = baja.$('midi:Delay');
        effects.add({ slot: 'delay', value: delay });

        ops.remove(effects, 'delay');
        expect(delay.isEffectStarted()).toBe(false);
        verifySequentialConnection(effects);
      });

      it('ignores removed non-IEffect', function () {
        effects.add({ slot: 'string', value: 'string' });
        ops.remove(effects, 'string');
        verifySequentialConnection(effects);
      });

      it('rewires reordered IEffects', function () {
        effects.add({ slot: 'delay', value: baja.$('midi:Delay') });
        effects.add({ slot: 'dist', value: baja.$('midi:Distortion') });
        ops.reorder(effects, [ 'dist', 'delay' ]);
        verifySequentialConnection(effects);
      });
    });

    describe('#startEffect()', function () {
      it('starts all child effects', function () {
        var effects = baja.$('midi:Effects', {
              delay: baja.$('midi:Delay'), dist: baja.$('midi:Distortion')
            }),
            childEffects = effects.getSlots().is('midi:IEffect').toValueArray();

        _.each(childEffects, function (effect) {
          spyOn(effect, 'startEffect').andCallThrough();
        });
        effects.startEffect();
        _.each(childEffects, function (effect) {
          expect(effect.startEffect).toHaveBeenCalled();
        });
      });
    });

    describe('#updateEffect()', function () {
      it('wires all child effects together', function () {
        effects.startEffect();

        var delay, dist;

        effects.add({ slot: 'delay', value: delay = baja.$('midi:Delay') });
        effects.add({ slot: 'dist', value: dist = baja.$('midi:Distortion') });

        effects.updateEffect();

        verifySequentialConnection(effects);
      });
    });

    describe('#stopEffect()', function () {
      it('stops all child effects', function () {
        effects.add({ slot: 'delay', value: baja.$('midi:Delay') });
        effects.add({ slot: 'dist', value: baja.$('midi:Distortion') });
        effects.startEffect();
        effects.stopEffect();
        effects.getSlots().eachValue(function (eff) {
          expect(eff.isEffectStarted()).toBe(false);
        });
      });
    });
  });
});
