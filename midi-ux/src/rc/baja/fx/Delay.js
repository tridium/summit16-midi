/**
 * @module nmodule/midi/rc/baja/fx/Delay
 */
define(['baja!',
        'nmodule/midi/rc/audio/AudioContext',
        'nmodule/midi/rc/baja/fx/IEffectMixin'], function (
         baja,
         AudioContext,
         addIEffectMixin) {

  'use strict';

  var Component = baja.Component;

  /**
   * BajaScript implementation of a `midi:Delay`.
   *
   * Adds delay using four nodes. The input node wires directly to the output
   * node, but also wires to a delay/gain pair of nodes that feed back in on
   * themselves before also wiring to the output node.
   *
   * @class
   * @alias module:nmodule/midi/rc/baja/fx/Delay
   * @extends baja.Component
   * @mixes module:nmodule/mixin/rc/baja/fx/IEffectMixin
   */
  var Delay = function Delay() {
    Component.apply(this, arguments);
    addIEffectMixin(this);
  };
  Delay.prototype = Object.create(Component.prototype);
  Delay.prototype.constructor = Delay;

  /**
   * Sets up the delay loop.
   *
   * @returns {Array.<AudioNode>} input and output nodes
   */
  Delay.prototype.$startEffect = function () {
    var that = this,
        ctx = AudioContext.get(),
        inNode = ctx.createGain(),
        outNode = ctx.createGain(),
        delayGain = ctx.createGain(),
        delayNode = ctx.createDelay(2);

    inNode.connect(outNode);
    inNode.connect(delayNode);
    delayNode.connect(delayGain);
    delayGain.connect(delayNode);
    delayGain.connect(outNode);

    that.$delayGain = delayGain;
    that.$delayNode = delayNode;

    return [ inNode, outNode ];
  };

  /**
   * Shuts down the delay loop.
   */
  Delay.prototype.$stopEffect = function () {
    this.$delayGain.disconnect();
    this.$delayNode.disconnect();
  };

  /**
   * Update the delay loop node values using the values of the `amount` and
   * `delayTime` slots.
   */
  Delay.prototype.$updateEffect = function () {
    this.$delayGain.gain.value = this.get('amount');
    this.$delayNode.delayTime.value = this.get('delayTime') / 1000;
  };

  return Delay;
});