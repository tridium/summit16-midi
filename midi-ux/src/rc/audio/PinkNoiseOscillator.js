/**
 * @module nmodule/midi/rc/audio/PinkNoiseOscillator
 */
define(['nmodule/midi/rc/audio/AudioContext'], function (AudioContext) {

  'use strict';

  /**
   * Oscillator node for generating pink noise. Returns a `ScriptProcessorNode`,
   * but call `start` and `stop` as if it were an `OscillatorNode`.
   *
   * @class
   * @alias nmodule/midi/rc/audio/PinkNoiseOscillator
   * @extends AudioNode
   * @see http://noisehack.com/generate-noise-web-audio-api/
   * @see http://www.musicdsp.org/files/pink.txt
   *
   * @param {Object} [config]
   * @param {boolean} [config.economy] set to `true` to use a more performant
   * but less accurate algorithm
   * @param {number} [config.bufferSize=0] buffer size - increase for
   * smoother audio but higher lag.
   */
  var PinkNoiseOscillator = function PinkNoiseOscillator(config) {
    config = config || {};

    var b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0,
        on = false,
        economy = config.economy,
        bufferSize = config.bufferSize,
        node = AudioContext.get().createScriptProcessor(bufferSize || 0, 1, 1);

    node.onaudioprocess = function(e) {
      var output = e.outputBuffer.getChannelData(0),
          bufferSize = node.bufferSize,
          white,
          i;

      if (economy) {
        for (i = 0; i < bufferSize; i++) {
          white = Math.random() * 2 - 1;
          b0 = 0.99765 * b0 + white * 0.0990460;
          b1 = 0.96300 * b1 + white * 0.2965164;
          b2 = 0.57000 * b2 + white * 1.0526913;
          output[i] = b0 + b1 + b2 + white * 0.1848;
          output[i] *= on ? 0.11 : 0; // (roughly) compensate for gain
        }
      } else {
        for (i = 0; i < bufferSize; i++) {
          white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output[i] *= on ? 0.11 : 0; // (roughly) compensate for gain
          b6 = white * 0.115926;
        }
      }
    };

    node.start = function () { on = true; };

    node.stop = function () { on = false; };

    return node;
  };

  return PinkNoiseOscillator;
});