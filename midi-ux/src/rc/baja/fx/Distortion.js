/*jshint browser: true */

/**
 * @module nmodule/midi/rc/baja/fx/Distortion
 */
define(['baja!',
        'nmodule/midi/rc/audio/AudioContext',
        'nmodule/midi/rc/baja/fx/IEffectMixin'], function (
         baja,
         AudioContext,
         addIEffectMixin) {

  'use strict';

  var Component = baja.Component;

  //https://developer.mozilla.org/en-US/docs/Web/API/WaveShaperNode
  function makeDistortionCurve(k) {
    var numSamples = 44100,
        curve = new Float32Array(numSamples),
        deg = Math.PI / 180,
        i = 0,
        x;
    for ( ; i < numSamples; ++i ) {
      x = i * 2 / numSamples - 1;
      curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
    }
    return curve;
  }

  /**
   * BajaScript implementation of a `midi:Distortion`.
   *
   * Applies distortion via a `WaveShaperNode`.
   *
   * @class
   * @alias module:nmodule/midi/rc/baja/fx/Distortion
   * @extends baja.Component
   * @mixes module:nmodule/mixin/rc/baja/fx/IEffectMixin
   */
  var Distortion = function Distortion() {
    Component.apply(this, arguments);
    addIEffectMixin(this);
  };
  Distortion.prototype = Object.create(Component.prototype);
  Distortion.prototype.constructor = Distortion;

  /**
   * Starts up the `WaveShaperNode`.
   * @returns {Array.<WaveShaperNode>} a single node for both input and output
   */
  Distortion.prototype.$startEffect = function () {
    var distortion = AudioContext.get().createWaveShaper();

    distortion.oversample = '4x';

    return [ distortion ];
  };

  /**
   * Generates a new distortion curve based on the `amount` slot.
   */
  Distortion.prototype.$updateEffect = function () {
    this.getInputNode().curve = makeDistortionCurve(this.get('amount'));
  };

  return Distortion;
});