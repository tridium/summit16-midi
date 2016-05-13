define(['baja!',
        'baja!midi:Delay',
        'nmodule/midi/rc/baja/fx/Delay'], function (
         baja,
         types,
         Delay) {

  'use strict';

  describe('nmodule/midi/rc/baja/fx/Delay', function () {
    it('is registered on midi:Delay type', function () {
      expect(baja.$('midi:Delay')).toEqual(jasmine.any(Delay));
    });

    describe('#startEffect()', function () {
      it('sets up delay node and delay gain node', function () {
        var delay = baja.$('midi:Delay');
        delay.startEffect();
        expect(delay.$delayNode).toBeDefined();
        expect(delay.$delayGain).toBeDefined();
      });
    });

    describe('#updateEffect()', function () {
      it('sets delay time to delayTime slot in milliseconds', function () {
        var delay = baja.$('midi:Delay'), delayTime = 500;
        delay.startEffect();
        delay.set({ slot: 'delayTime', value: delayTime });
        delay.updateEffect();
        expect(delay.$delayNode.delayTime.value).toBe(delayTime / 1000);
      });

      it('sets delay gain to amount slot', function () {
        var delay = baja.$('midi:Delay'), amount = 0.3;
        delay.startEffect();
        delay.set({ slot: 'amount', value: amount });
        delay.updateEffect();
        expect(delay.$delayGain.gain.value).toBe(amount);
      });
    });

    describe('#stopEffect()', function () {
      it('shuts down delay loop', function () {
        var delay = baja.$('midi:Delay');
        delay.startEffect();
        delay.stopEffect();
        expect(delay.$delayNode.isConnectedTo(delay.$delayGain)).toBe(false);
        expect(delay.$delayGain.isConnectedTo(delay.$delayNode)).toBe(false);
        expect(delay.$delayGain.isConnectedTo(delay.getOutputNode())).toBe(false);
      });
    });
  });
});