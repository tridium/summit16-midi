define(['baja!',
        'baja!midi:SynthesizerPreset,midi:SynthesizerVoice',
        'underscore',
        'nmodule/midi/rc/baja/SynthesizerVoice',
        'nmodule/midiTest/rc/mockBajaOps'], function (
         baja,
         types,
         _,
         SynthesizerVoice,
         ops) {

  'use strict';

  describe('nmodule/midi/rc/baja/SynthesizerVoice', function () {
    var preset, voice;

    beforeEach(function () {
      preset = baja.$('midi:SynthesizerPreset', {
        voice: baja.$('midi:SynthesizerVoice')
      });

      voice = preset.get('voice');
    });

    it('is registered on midi:SynthesizerVoice type', function () {
      expect(voice).toEqual(jasmine.any(SynthesizerVoice));
    });

    describe('when lfo\'s "shared" property changes', function () {
      /*
       * baja event handlers don't fire on unsubscribed components. rather than
       * mount a component instance in the station, just fake it out instead.
       * note this is private API.
       */
      function setShared(shared) {
        ops.set(voice.get('lfo'), 'shared', shared);
      }

      describe('to true', function () {
        beforeEach(function () { setShared(false); });

        it('attaches own LFO to all playing notes', function () {
          voice.noteOn(70, 100);
          voice.noteOn(75, 100);

          var notes = voice.$allPlayingNotes(),
              lfo = voice.get('lfo');

          _.each(notes, function (note) { spyOn(note, 'attachLFO'); });
          setShared(true);
          _.each(notes, function (note) {
            expect(note.attachLFO).toHaveBeenCalledWith(lfo);
          });
        });
      });

      describe('to false', function () {
        beforeEach(function () { setShared(true); });

        it('leaves active notes\' own LFOs playing until note-off', function () {
          voice.noteOn(70, 100);
          voice.noteOn(75, 100);

          var notes = voice.$allPlayingNotes();

          _.each(notes, function (note) { spyOn(note, 'attachLFO'); });
          setShared(false);
          _.each(notes, function (note) {
            expect(note.attachLFO).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe('#noteOn()', function () {
      it('starts a note playing', function () {
        voice.noteOn(69, 50);
        expect(voice.$allPlayingNotes().length).toBe(1);
      });

      it('sets output node, frequency, and velocity of played note', function () {
        voice.noteOn(69, 50);
        var note = voice.$allPlayingNotes()[0];
        expect(note.$oscNode.frequency.value).toBe(440);
        expect(note.$filterNode.isConnectedTo(preset.get('effects').getOutputNode()))
          .toBe(true);
        expect(note.$velocity).toBe(50);
      });

      it('can play multiple notes at once', function () {
        voice.noteOn(69, 50);
        voice.noteOn(70, 50);
        expect(voice.$allPlayingNotes().length).toBe(2);
      });

      it('attaches own LFO to note', function () {
        voice.noteOn(70, 50);
        expect(voice.$allPlayingNotes()[0].$lfo).toBe(voice.get('lfo'));
      });
    });

    describe('#noteOff()', function () {
      it('stops a playing note', function () {
        voice.noteOn(69, 50);
        voice.noteOff(69);
        expect(voice.$allPlayingNotes().length).toBe(0);
      });

      it('stops only the specified note', function () {
        voice.noteOn(69, 50);
        voice.noteOn(70, 50);
        voice.noteOff(69);
        voice.noteOff(69);
        expect(voice.$allPlayingNotes().length).toBe(1);
      });

      it('stops the oldest note if two notes with the same number are playing', function () {
        voice.noteOn(69, 50);
        voice.noteOn(69, 100);
        voice.noteOff(69);
        var notes = voice.$allPlayingNotes();
        expect(notes.length).toBe(1);
        expect(notes[0].$velocity).toBe(100);
      });

      it('does nothing if note not already playing', function () {
        voice.noteOff(69);
        expect(voice.$allPlayingNotes().length).toBe(0);
      });
    });

    describe('#allNotesOff()', function () {
      it('stops all notes playing', function () {
        voice.noteOn(50, 50);
        voice.noteOn(51, 50);
        voice.noteOn(52, 50);
        voice.allNotesOff();
        expect(voice.$allPlayingNotes().length).toBe(0);
      });
    });
  });
});