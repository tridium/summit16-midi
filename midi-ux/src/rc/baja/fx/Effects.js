/**
 * @module nmodule/midi/rc/baja/fx/Effects
 */
define(['baja!',
        'baja!midi:IEffect',
        'underscore',
        'nmodule/midi/rc/audio/AudioContext',
        'nmodule/midi/rc/baja/fx/IEffectMixin'], function (
         baja,
         types,
         _,
         AudioContext,
         addIEffectMixin) {

  'use strict';

  var Component = baja.Component;

  /**
   * BajaScript implementation of a `midi:Effects`.
   *
   * This itself functions as an effects node - it simply looks for all
   * `midi:IEffect` instances it contains and, in slot order, wires them
   * together from one to the next. The last `IEffect` will wire to this
   * Component's output node.
   *
   * @class
   * @alias module:nmodule/midi/rc/baja/fx/Effects
   * @extends baja.Component
   * @mixes module:nmodule/mixin/rc/baja/fx/IEffectMixin
   */
  var Effects = function Effects() {
    var that = this;

    Component.apply(that, arguments);
    addIEffectMixin(this);

    that.attach('added', function (prop) {
      if (prop.getType().is('midi:IEffect')) {
        that.updateEffect();
      }
    });
    that.attach('removed', function (prop, val) {
      if (val.getType().is('midi:IEffect')) {
        val.stopEffect();
      }
      that.updateEffect();
    });
    that.attach('reordered', function () {
      that.updateEffect();
    });
  };
  Effects.prototype = Object.create(Component.prototype);
  Effects.prototype.constructor = Effects;

  /**
   * Start up effects processing on all `IEffect` children.
   * @returns {Array.<AudioNode>}
   */
  Effects.prototype.$startEffect = function () {
    var ctx = AudioContext.get();

    this.getSlots().is('midi:IEffect').eachValue(function (eff) {
      eff.startEffect();
    });

    return [ ctx.createGain(), ctx.createGain() ];
  };

  /**
   * Shutdown effects processing on all `IEffect` children.
   */
  Effects.prototype.$stopEffect = function () {
    this.getSlots().is('midi:IEffect').eachValue(function (eff) {
      eff.stopEffect();
    });
  };

  /**
   * Updates values and rewires all `IEffect` children.
   */
  Effects.prototype.$updateEffect = function () {
    var that = this;

    var curNode = that.getInputNode(),
        outNode = that.getOutputNode();

    that.getSlots().is('midi:IEffect').eachValue(function (eff) {
      eff.startEffect();
      eff.updateEffect();
      curNode.disconnect();
      curNode.connect(eff.getInputNode());
      curNode = eff.getOutputNode();
    });

    curNode.disconnect();
    curNode.connect(outNode);
  };

  return Effects;
});