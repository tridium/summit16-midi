define(['underscore',
        'nmodule/midi/rc/audio/AudioContext'], function (
         _,
         AudioContext) {

  'use strict';

  var MockAudioParam = function MockAudioParam(value) {
    this.value = value;
  };
  MockAudioParam.prototype.cancelScheduledValues = function () {};
  MockAudioParam.prototype.linearRampToValueAtTime = function () {};
  MockAudioParam.prototype.setValueAtTime = function () {};

  var MockAudioNode = function MockAudioNode() {
    this.connectedTo = [];
  };
  MockAudioNode.prototype.connect = function (obj) {
    if (!this.isConnectedTo(obj)) {
      this.connectedTo.push(obj);
    }
  };
  MockAudioNode.prototype.isConnectedTo = function (obj) {
    return _.contains(this.connectedTo, obj);
  };
  MockAudioNode.prototype.disconnect = function (obj) {
    if (obj) {
      this.connectedTo = _.without(this.connectedTo, obj);
    } else {
      this.connectedTo = [];
    }
  };

  var MockAudioContext = function MockAudioContext() {};

  MockAudioContext.prototype.createBiquadFilter = function () {
    var filter = new MockAudioNode();
    filter.frequency = new MockAudioParam(0);
    return filter;
  };

  MockAudioContext.prototype.createDelay = function () {
    var delay = new MockAudioNode();
    delay.delayTime = new MockAudioParam(0);
    return delay;
  };

  MockAudioContext.prototype.createGain = function () {
    var gain = new MockAudioNode();
    gain.gain = new MockAudioParam(1);
    return gain;
  };

  MockAudioContext.prototype.createOscillator = function () {
    var osc = new MockAudioNode();
    osc.detune = new MockAudioParam(0);
    osc.frequency = new MockAudioParam(0);
    osc.start = function () {};
    osc.stop = function () {};
    return osc;
  };

  MockAudioContext.prototype.createWaveShaper = function () {
    var waveShaper = new MockAudioNode();
    waveShaper.oversample = 'none';
    waveShaper.curve = null;
    return waveShaper;
  };

  var mockCtx = new MockAudioContext();

  beforeEach(function () {
    spyOn(AudioContext, 'get').andReturn(mockCtx);
  });
});
