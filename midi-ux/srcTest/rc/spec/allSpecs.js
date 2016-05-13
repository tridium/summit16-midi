define([
  // PhantomJS does not support Web Audio, so work with mock context in all specs.
  'nmodule/midiTest/rc/MockAudioContext',

  'nmodule/midiTest/rc/spec/baja/LFOSpec',
  'nmodule/midiTest/rc/spec/baja/MidiMessageSpec',
  'nmodule/midiTest/rc/spec/baja/SynthesizerPresetSpec',
  'nmodule/midiTest/rc/spec/baja/SynthesizerVoiceSpec',

  'nmodule/midiTest/rc/spec/baja/fx/DelaySpec',
  'nmodule/midiTest/rc/spec/baja/fx/DistortionSpec',
  'nmodule/midiTest/rc/spec/baja/fx/EffectsSpec',
  'nmodule/midiTest/rc/spec/baja/fx/IEffectMixinSpec',

  'nmodule/midiTest/rc/spec/fe/ADSREnvelopeEditorSpec',
  'nmodule/midiTest/rc/spec/fe/LaunchpadProWidgetSpec',
  'nmodule/midiTest/rc/spec/fe/MidiMessageEditorSpec',
  'nmodule/midiTest/rc/spec/fe/RangeSliderSpec',
  'nmodule/midiTest/rc/spec/fe/SlotSelectorSpec'
], function () {});
