/**
 * @module nmodule/midi/rc/baja/LFO
 */
define(['baja!',
        'nmodule/midi/rc/audio/AudioContext',
        'nmodule/midi/rc/baja/fx/IEffectMixin'], function (
         baja,
         AudioContext,
         addIEffectMixin) {

  'use strict';

  var Component = baja.Component;

  function getLfoAmount(amount, lfoTarget) {
    switch (lfoTarget) {
      case 'pitch': return amount;
      case 'volume': return amount / 100;
      case 'filter': return amount * 100;
    }
  }

  /**
   * BajaScript implementation of a `midi:LFO`.
   *
   * @class
   * @alias module:nmodule/midi/rc/baja/LFO
   * @extends baja.Component
   * @mixes module:nmodule/mixin/rc/baja/fx/IEffectMixin
   */
  var LFO = function LFO() {
    var that = this;
    Component.apply(that, arguments);
    addIEffectMixin(that);
    that.attach('changed', function () {
      that.updateEffect();
    });
  };
  LFO.prototype = Object.create(Component.prototype);
  LFO.prototype.constructor = LFO;

  /**
   * Sets up a gain node backed by an oscillator node.
   * @returns {Array.<AudioNode>} the same gain node for both input and output.
   */
  LFO.prototype.$startEffect = function () {
    var ctx = AudioContext.get(),
        osc = this.$oscNode = ctx.createOscillator(),
        gain = this.$gainNode = ctx.createGain();

    osc.connect(gain);
    osc.start(0);

    return [ gain ];
  };

  /**
   * Sets the oscillator type, frequency, and gain.
   *
   * Note that the reasonable values for gain vary based on the target. For
   * instance, 0-100 is ridiculous for volume, which should be 0-1. But a
   * variation of 0-100 on filter frequency would make almost no difference.
   * The actual gain value will be computed to make sense for the amount/target
   * combo.
   */
  LFO.prototype.$updateEffect = function () {
    var gainNode = this.$gainNode,
        oscNode = this.$oscNode,
        target = this.get('target').getTag();

    oscNode.frequency.value = this.get('frequency');
    oscNode.type = this.get('oscillatorType').getTag();
    gainNode.gain.value = getLfoAmount(this.get('amount'), target);
  };

  /**
   * Stops the oscillator node.
   */
  LFO.prototype.$stopEffect = function () {
    var osc = this.$oscNode;
    osc.disconnect(this.$gainNode);
    osc.stop(0);
  };

  return LFO;
});