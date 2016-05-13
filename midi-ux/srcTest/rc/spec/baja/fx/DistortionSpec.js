define(['baja!',
        'baja!midi:Distortion',
        'nmodule/midi/rc/baja/fx/Distortion'], function (
         baja,
         types,
         Distortion) {

  'use strict';

  describe('nmodule/midi/rc/baja/fx/Distortion', function () {
    it('is registered on midi:Distortion type', function () {
      expect(baja.$('midi:Distortion')).toEqual(jasmine.any(Distortion));
    });

    describe('#startEffect()', function () {
      it('uses same WaveShaperNode for input and output', function () {
        var dist = baja.$('midi:Distortion');
        dist.startEffect();
        expect(dist.getInputNode()).toBe(dist.getOutputNode());
      });
    });

    describe('#updateEffect()', function () {
      it('increases curve using the amount slot', function () {
        var dist = baja.$('midi:Distortion', { amount: 0 });
        dist.startEffect();
        var curve = dist.getOutputNode().curve;
        dist.updateEffect();
        expect(dist.getOutputNode().curve).toEqual(curve);
        dist.set({ slot: 'amount', value: 50 });
        dist.updateEffect();
        expect(dist.getOutputNode().curve).not.toEqual(curve);
      });
    });
  });
});