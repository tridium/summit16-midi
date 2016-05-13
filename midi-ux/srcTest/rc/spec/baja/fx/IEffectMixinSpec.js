define(['baja!',
        'nmodule/midi/rc/audio/AudioContext',
        'nmodule/midi/rc/baja/fx/IEffectMixin'], function (
         baja,
         AudioContext,
         addIEffectMixin) {

  'use strict';

  describe('nmodule/midi/rc/baja/fx/IEffectMixin', function () {
    var comp, inOutNodes, ctx;

    beforeEach(function () {
      ctx = AudioContext.get();
      inOutNodes = [ ctx.createGain(), ctx.createGain() ];
      comp = baja.$('baja:Component', { gainValue: 0.5 });
      comp.$startEffect = function () {
        this.$gainNode = ctx.createGain();
        return inOutNodes;
      };
      comp.$updateEffect = function () {
        this.$gainNode.gain.value = this.gainValue;
      };
      addIEffectMixin(comp);
    });

    it('throws error if adding to non-Component', function () {
      expect(function () {
        addIEffectMixin('hello');
      }).toThrow('can only apply to Component instances');
    });

    it('throws error if component does not have $startEffect and $stopEffect', function () {
      expect(function () {
        addIEffectMixin(baja.$('baja:Component'));
      }).toThrow('component must have $startEffect and $updateEffect functions');
    });

    describe('#startEffect()', function () {
      it('sets in and out nodes when returned by $startEffect', function () {
        comp.startEffect();
        expect(comp.getInputNode()).toBe(inOutNodes[0]);
        expect(comp.getOutputNode()).toBe(inOutNodes[1]);
      });

      it('sets in and out nodes to the same node if $startEffect only returns one', function () {
        inOutNodes = [ ctx.createGain() ];
        comp.startEffect();
        expect(comp.getInputNode()).toBe(inOutNodes[0]);
        expect(comp.getOutputNode()).toBe(inOutNodes[0]);
      });

      it('throws if $startEffect does not return any', function () {
        inOutNodes = [];
        expect(function () { comp.startEffect(); })
          .toThrow('$startEffect must return array of 1 or 2 nodes');
      });

      it('calls $updateEffect afterwards', function () {
        spyOn(comp, '$updateEffect');
        comp.startEffect();
        expect(comp.$updateEffect).toHaveBeenCalled();
      });
    });

    describe('#stopEffect()', function () {
      beforeEach(function () { comp.startEffect(); });

      it('disconnects in and out nodes', function () {
        spyOn(comp.getInputNode(), 'disconnect');
        spyOn(comp.getOutputNode(), 'disconnect');
        comp.stopEffect();
        expect(comp.getInputNode().disconnect).toHaveBeenCalled();
        expect(comp.getOutputNode().disconnect).toHaveBeenCalled();
      });
    });

    describe('#isEffectStarted()', function () {
      it('returns true if effect is started', function () {
        expect(comp.isEffectStarted()).toBe(false);
        comp.startEffect();
        expect(comp.isEffectStarted()).toBe(true);
        comp.stopEffect();
        expect(comp.isEffectStarted()).toBe(false);
      });
    });

    describe('#updateEffect()', function () {
      it('calls $updateEffect if effect is started', function () {
        spyOn(comp, '$updateEffect');
        comp.updateEffect();
        expect(comp.$updateEffect).not.toHaveBeenCalled();
        comp.startEffect();
        comp.updateEffect();
        expect(comp.$updateEffect).toHaveBeenCalled();
      });
    });

    describe('#getInputNode()', function () {
      it('returns input node only after effect is started', function () {
        expect(comp.getInputNode()).toBe(undefined);
        comp.startEffect();
        expect(comp.getInputNode()).toBe(inOutNodes[0]);
      });
    });

    describe('#getOutputNode()', function () {
      it('returns output node only after effect is started', function () {
        expect(comp.getOutputNode()).toBe(undefined);
        comp.startEffect();
        expect(comp.getOutputNode()).toBe(inOutNodes[1]);
      });
    });
  });
});