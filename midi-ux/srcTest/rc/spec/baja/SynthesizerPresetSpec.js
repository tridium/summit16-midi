define(['baja!',
        'baja!midi:SynthesizerPreset,midi:SynthesizerVoice',
        'nmodule/midi/rc/audio/AudioContext',
        'nmodule/midi/rc/baja/SynthesizerPreset'], function (
         baja,
         types,
         AudioContext,
         SynthesizerPreset) {

  'use strict';

  describe('nmodule/midi/rc/baja/SynthesizerPreset', function () {
    var preset;
    beforeEach(function () {
      preset = baja.$('midi:SynthesizerPreset');
    });

    it('is registered on midi:SynthesizerPreset type', function () {
      expect(preset).toEqual(jasmine.any(SynthesizerPreset));
    });

    describe('#start()', function () {
      it('starts up effects processing', function () {
        preset.start();
        expect(preset.get('effects').isEffectStarted()).toBe(true);
      });

      it('connects effects output node to main audio out', function () {
        preset.start();
        expect(preset.get('effects').getOutputNode()
          .isConnectedTo(AudioContext.getOut()))
          .toBe(true);
      });
    });

    describe('#stop()', function () {
      it('shuts down effects processing', function () {
        preset.get('effects').startEffect();
        preset.stop();
        expect(preset.get('effects').isEffectStarted()).toBe(false);
      });

      it('sends allNotesOff to all voices', function () {
        preset.add({ slot: 'voice', value: baja.$('midi:SynthesizerVoice') });
        spyOn(preset.get('voice'), 'allNotesOff');
        preset.stop();
        expect(preset.get('voice').allNotesOff).toHaveBeenCalled();
      });
    });

    describe('#noteOn()', function () {
      it('calls noteOn on all voices', function () {
        preset.add({ slot: 'voice', value: baja.$('midi:SynthesizerVoice') });
        spyOn(preset.get('voice'), 'noteOn');
        preset.noteOn(50, 100);
        expect(preset.get('voice').noteOn).toHaveBeenCalledWith(50, 100);
      });

      it('does not call noteOn for HIDDEN voices', function () {
        preset.add({ slot: 'voice', value: baja.$('midi:SynthesizerVoice') });
        preset.setFlags({ slot: 'voice', flags: baja.Flags.HIDDEN });
        spyOn(preset.get('voice'), 'noteOn');
        preset.noteOn(50, 100);
        expect(preset.get('voice').noteOn).not.toHaveBeenCalled();
      });
    });

    describe('#noteOff()', function () {
      it('calls noteOff on all voices', function () {
        preset.add({ slot: 'voice', value: baja.$('midi:SynthesizerVoice') });
        spyOn(preset.get('voice'), 'noteOff');
        preset.noteOff(50);
        expect(preset.get('voice').noteOff).toHaveBeenCalledWith(50);
      });
    });
  });
});