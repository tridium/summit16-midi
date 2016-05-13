/*global AudioContext, webkitAudioContext */

define(['underscore'], function (_) {
  'use strict';

  /**
   * @exports nmodule/midi/rc/audio/AudioContext
   */
  var exports = {};

  /**
   * @returns {AudioContext}
   */
  var getCtx = _.once(function () {
    var Ctor =
      (typeof AudioContext !== 'undefined' && AudioContext) ||
      (typeof webkitAudioContext !== 'undefined' && webkitAudioContext);

    return Ctor && new Ctor();
  });

  var getMainOut = _.once(function () {
    var ctx = exports.get(),
        mainOut = ctx.createGain();
    mainOut.connect(ctx.destination);
    return mainOut;
  });

  /**
   * Get a shared `AudioContext` instance.
   *
   * @returns {AudioContext}
   * @throws {Error} if Web Audio not supported in this browser
   */
  exports.get = function () {
    var ctx = getCtx();

    if (!ctx) {
      throw new Error('Web Audio API not supported in this browser');
    }

    return ctx;
  };

  /**
   * Get the main audio output (to speakers).
   *
   * @returns {AudioNode}
   */
  exports.getOut = function () { return getMainOut(); };

  return exports;
});