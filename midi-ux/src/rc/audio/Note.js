/*jshint browser: true */

/**
 * @module nmodule/midi/rc/audio/Note
 */
define(['baja!',
        'nmodule/midi/rc/audio/AudioContext',
        'nmodule/midi/rc/audio/PinkNoiseOscillator',
        'nmodule/midi/rc/audio/util'], function (
         baja,
         AudioContext,
         PinkNoiseOscillator,
         util) {

  'use strict';

  function makeOscNode(type, detune, noteNumber) {
    if (type === 'noise') {
      return new PinkNoiseOscillator({ economy: true, bufferSize: 512 });
    }
    var oscNode = AudioContext.get().createOscillator();
    oscNode.type = type;
    oscNode.detune.value = detune;
    oscNode.frequency.value = util.noteToFrequency(noteNumber);
    return oscNode;
  }

  /**
   * Represents one currently played note for one particular Voice, created in
   * response to a key being pressed.
   *
   * @class
   * @alias module:nmodule/midi/rc/audio/Note
   * @param {module:nmodule/module/rc/baja/SynthesizerVoice} voice the voice
   * being played
   * @param {number} noteNumber
   * @param {number} velocity
   * @param {module:nmodule/midi/rc/audio/LFO} lfo an LFO to apply to this
   * played note. If none specified, the note will get its own LFO.
   * @param {AudioNode} outNode the `AudioNode` the played note should route
   * its sound output to
   */
  var Note = function Note(voice, noteNumber, velocity, lfo, outNode) {
    var ctx = AudioContext.get(),
        oscNode,
        gainNode = this.$gainNode = ctx.createGain(),
        filterNode = this.$filterNode = ctx.createBiquadFilter();

    oscNode = this.$oscNode = makeOscNode(
      voice.get('oscillatorType').getTag(), voice.get('detune'), noteNumber);

    filterNode.type = voice.get('filterType').getTag();

    oscNode.connect(gainNode);
    gainNode.connect(filterNode);
    filterNode.connect(outNode);

    this.$noteNumber = noteNumber;
    this.$velocity = velocity;
    this.$voice = voice;

    this.attachLFO(lfo);
  };

  Note.prototype.attachLFO = function (lfo) {
    var that = this;

    that.$lfo = lfo;

    lfo.attach('changed', this.$changedHandler = function (prop) {
      switch (prop.getName()) {
        case 'target':
          that.$disconnectLfo(lfo);
          that.$connectLfo(lfo);
          break;
        case 'shared':
          return that.$setShared(lfo.get('shared'));
      }
    });

    this.$changedHandler(lfo.getSlot('shared'));
  };

  Note.prototype.$setShared = function (shared) {
    var that = this,
        lfo = that.$lfo,
        privateLfo = that.$privateLfo;
    if (shared) {
      if (privateLfo) {
        that.$disconnectLfo(that.$privateLfo);
        privateLfo.stopEffect();
      }
      that.$connectLfo(lfo);
    } else {
      that.$privateLfo = privateLfo = lfo.newCopy();
      privateLfo.startEffect();
      that.$connectLfo(privateLfo);
    }
  };


  Note.prototype.$connectLfo = function (lfo) {
    var node = lfo && lfo.getOutputNode(),
        param = this.$getTargetAudioParam(lfo);
    return node && param && node.connect(param);
  };

  Note.prototype.$disconnectLfo = function (lfo) {
    var node = lfo && lfo.getOutputNode();
    if (node) {
      try { node.disconnect(this.$oscNode.frequency); } catch (e) {}
      try { node.disconnect(this.$gainNode.gain); } catch (e) {}
      try { node.disconnect(this.$filterNode.frequency); } catch (e) {}
    }
  };

  Note.prototype.$getTargetAudioParam = function (lfo) {
    switch (lfo.get('target').getTag()) {
      case 'pitch': return this.$oscNode.frequency;
      case 'volume': return this.$gainNode.gain;
      case 'filter': return this.$filterNode.frequency;
    }
  };

  /**
   * Get this note's own LFO. If the note is playing using a shared LFO provided
   * by the Preset, will return `null`.
   * @returns {module:nmodule/midi/rc/audio/LFO|null}
   */
  Note.prototype.getLFO = function () {
    return this.$lfo;
  };

  /**
   * Start up the oscillator for this note, applying the gain and filter
   * envelopes from the Voice.
   */
  Note.prototype.start = function () {
    var that = this,
        voice = that.$voice,
        gainPeak = that.$velocity / 127 * voice.get('level'),
        filterPeak = voice.get('filterLevel') * 20000;

    that.$oscNode.start(0);
    that.$startEnvelope(gainPeak, voice.get('gainEnvelope'), that.$gainNode.gain);
    that.$startEnvelope(filterPeak, voice.get('filterEnvelope'), that.$filterNode.frequency);
  };

  /**
   * @private
   * @param {number} peak peak value - `attack` is rising to this. Should be
   * between 0 and 1.
   * @param {baja.Struct} envelope the `midi:ADSREnvelope` to apply
   * @param {AudioParam} param the audio parameter to modulate using the
   * envelope
   */
  Note.prototype.$startEnvelope = function (peak, envelope, param) {
    var currentTime = AudioContext.get().currentTime,
        a = envelope.getAttack(),
        d = envelope.getDelay(),
        s = envelope.getSustain(),
        peakTime = currentTime + (a / 1000);

    param.cancelScheduledValues(0);
    param.setValueAtTime(0, currentTime);
    param.linearRampToValueAtTime(peak, peakTime);
    param.linearRampToValueAtTime(peak * s, peakTime + (d / 1000));
  };

  /**
   * Stop the oscillator for this note, applying the `release` values from the
   * gain and filter envelopes down to 0.
   */
  Note.prototype.stop = function () {
    var that = this,
        voice = that.$voice,
        gainEnvelope = voice.get('gainEnvelope'),
        filterEnvelope = voice.get('filterEnvelope'),
        finalizeInMs = Math.max(gainEnvelope.get('release'), filterEnvelope.get('release'));

    that.$stopEnvelope(voice.get('gainEnvelope'), that.$gainNode.gain);
    that.$stopEnvelope(voice.get('filterEnvelope'), that.$filterNode.frequency);

    setTimeout(function () {
      that.$finalize();
    }, finalizeInMs);
  };

  /**
   * @private
   * @param {baja.Struct} envelope the `midi:ADSREnvelope` to apply
   * @param {AudioParam} param the audio parameter to modulate using the
   * envelope
   */
  Note.prototype.$stopEnvelope = function (envelope, param) {
    var currentTime = AudioContext.get().currentTime,
        r = envelope.getRelease();

    param.cancelScheduledValues(0);
    param.setValueAtTime(param.value, currentTime);
    param.linearRampToValueAtTime(0, currentTime + (r / 1000));
  };

  /**
   * This note is fully complete - shut down and disconnect all audio nodes
   * created for it.
   */
  Note.prototype.$finalize = function () {
    this.$oscNode.stop(0);
    this.$filterNode.disconnect();
    this.$gainNode.disconnect();
    this.$oscNode.disconnect();

    var lfo = this.$lfo;
    lfo.detach('changed', this.$changedHandler);
    this.$disconnectLfo(lfo);
  };

  return Note;
});