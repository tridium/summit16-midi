package com.niagara.midi.synth;

import javax.baja.nre.annotations.Facet;
import javax.baja.nre.annotations.NiagaraProperty;
import javax.baja.nre.annotations.NiagaraType;
import javax.baja.sys.BBoolean;
import javax.baja.sys.BComponent;
import javax.baja.sys.BDouble;
import javax.baja.sys.BFacets;
import javax.baja.sys.BInteger;
import javax.baja.sys.BString;
import javax.baja.sys.Flags;
import javax.baja.sys.Property;
import javax.baja.sys.Sys;
import javax.baja.sys.Type;


@NiagaraType
@NiagaraProperty(
  name = "polyphony",
  type = "baja:Integer",
  defaultValue = "BInteger.make(16)",
  flags = Flags.HIDDEN,
  facets = {
    @Facet(name = "BFacets.MIN", value = "BInteger.make(1)"),
    @Facet(name = "BFacets.MAX", value = "BInteger.make(128)")
  }
)
@NiagaraProperty(
  name = "oscillatorType",
  type = "midi:OscillatorType",
  defaultValue = "BOscillatorType.sawtooth"
)
@NiagaraProperty(
  name="level",
  type = "baja:Double",
  defaultValue = "BDouble.make(1)",
  facets = {
    @Facet(name = "BFacets.MIN", value = "BDouble.make(0)"),
    @Facet(name = "BFacets.MAX", value = "BDouble.make(1)"),
    @Facet(name = "BFacets.UX_FIELD_EDITOR", value = "BString.make(\"midi:RangeSlider\")")
  }
)
@NiagaraProperty(
  name = "gainEnvelope",
  type = "midi:ADSREnvelope",
  defaultValue = "new BADSREnvelope()"
)
@NiagaraProperty(
  name = "filterType",
  type = "midi:FilterType",
  defaultValue = "BFilterType.lowpass"
)
@NiagaraProperty(
  name = "filterLevel",
  type = "baja:Double",
  defaultValue = "BDouble.make(1)",
  facets = {
    @Facet(name = "BFacets.MIN", value = "BDouble.make(0)"),
    @Facet(name = "BFacets.MAX", value = "BDouble.make(1)"),
    @Facet(name = "BFacets.UX_FIELD_EDITOR", value = "BString.make(\"midi:RangeSlider\")")
  }
)
@NiagaraProperty(
  name = "filterEnvelope",
  type = "midi:ADSREnvelope",
  defaultValue = "new BADSREnvelope()"
)
@NiagaraProperty(
  name = "lfo",
  type = "midi:LFO",
  defaultValue = "new BLFO()",
  facets = {
    @Facet(name = "\"alwaysExpand\"", value = "BBoolean.TRUE")
  }
)
@NiagaraProperty(
  name = "detune",
  type = "baja:Double",
  defaultValue = "BDouble.make(0)"
)
public class BSynthesizerVoice extends BComponent
{
/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.synth.BSynthesizerVoice(1082766672)1.0$ @*/
/* Generated Fri May 06 15:47:23 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */

////////////////////////////////////////////////////////////////
// Property "polyphony"
////////////////////////////////////////////////////////////////

  /**
   * Slot for the {@code polyphony} property.
   * @see #getPolyphony
   * @see #setPolyphony
   */
  public static final Property polyphony = newProperty(Flags.HIDDEN, BInteger.make(16).getInt(), BFacets.make(BFacets.make(BFacets.MIN, BInteger.make(1)), BFacets.make(BFacets.MAX, BInteger.make(128))));

  /**
   * Get the {@code polyphony} property.
   * @see #polyphony
   */
  public int getPolyphony() { return getInt(polyphony); }

  /**
   * Set the {@code polyphony} property.
   * @see #polyphony
   */
  public void setPolyphony(int v) { setInt(polyphony, v, null); }

////////////////////////////////////////////////////////////////
// Property "oscillatorType"
////////////////////////////////////////////////////////////////

  /**
   * Slot for the {@code oscillatorType} property.
   * @see #getOscillatorType
   * @see #setOscillatorType
   */
  public static final Property oscillatorType = newProperty(0, BOscillatorType.sawtooth, null);

  /**
   * Get the {@code oscillatorType} property.
   * @see #oscillatorType
   */
  public BOscillatorType getOscillatorType() { return (BOscillatorType)get(oscillatorType); }

  /**
   * Set the {@code oscillatorType} property.
   * @see #oscillatorType
   */
  public void setOscillatorType(BOscillatorType v) { set(oscillatorType, v, null); }

////////////////////////////////////////////////////////////////
// Property "level"
////////////////////////////////////////////////////////////////

  /**
   * Slot for the {@code level} property.
   * @see #getLevel
   * @see #setLevel
   */
  public static final Property level = newProperty(0, BDouble.make(1).getDouble(), BFacets.make(BFacets.make(BFacets.make(BFacets.MIN, BDouble.make(0)), BFacets.make(BFacets.MAX, BDouble.make(1))), BFacets.make(BFacets.UX_FIELD_EDITOR, BString.make("midi:RangeSlider"))));
  
  /**
   * Get the {@code level} property.
   * @see #level
   */
  public double getLevel() { return getDouble(level); }
  
  /**
   * Set the {@code level} property.
   * @see #level
   */
  public void setLevel(double v) { setDouble(level, v, null); }

////////////////////////////////////////////////////////////////
// Property "gainEnvelope"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code gainEnvelope} property.
   * @see #getGainEnvelope
   * @see #setGainEnvelope
   */
  public static final Property gainEnvelope = newProperty(0, new BADSREnvelope(), null);
  
  /**
   * Get the {@code gainEnvelope} property.
   * @see #gainEnvelope
   */
  public BADSREnvelope getGainEnvelope() { return (BADSREnvelope)get(gainEnvelope); }
  
  /**
   * Set the {@code gainEnvelope} property.
   * @see #gainEnvelope
   */
  public void setGainEnvelope(BADSREnvelope v) { set(gainEnvelope, v, null); }

////////////////////////////////////////////////////////////////
// Property "filterType"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code filterType} property.
   * @see #getFilterType
   * @see #setFilterType
   */
  public static final Property filterType = newProperty(0, BFilterType.lowpass, null);
  
  /**
   * Get the {@code filterType} property.
   * @see #filterType
   */
  public BFilterType getFilterType() { return (BFilterType)get(filterType); }
  
  /**
   * Set the {@code filterType} property.
   * @see #filterType
   */
  public void setFilterType(BFilterType v) { set(filterType, v, null); }

////////////////////////////////////////////////////////////////
// Property "filterLevel"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code filterLevel} property.
   * @see #getFilterLevel
   * @see #setFilterLevel
   */
  public static final Property filterLevel = newProperty(0, BDouble.make(1).getDouble(), BFacets.make(BFacets.make(BFacets.make(BFacets.MIN, BDouble.make(0)), BFacets.make(BFacets.MAX, BDouble.make(1))), BFacets.make(BFacets.UX_FIELD_EDITOR, BString.make("midi:RangeSlider"))));
  
  /**
   * Get the {@code filterLevel} property.
   * @see #filterLevel
   */
  public double getFilterLevel() { return getDouble(filterLevel); }
  
  /**
   * Set the {@code filterLevel} property.
   * @see #filterLevel
   */
  public void setFilterLevel(double v) { setDouble(filterLevel, v, null); }

////////////////////////////////////////////////////////////////
// Property "filterEnvelope"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code filterEnvelope} property.
   * @see #getFilterEnvelope
   * @see #setFilterEnvelope
   */
  public static final Property filterEnvelope = newProperty(0, new BADSREnvelope(), null);
  
  /**
   * Get the {@code filterEnvelope} property.
   * @see #filterEnvelope
   */
  public BADSREnvelope getFilterEnvelope() { return (BADSREnvelope)get(filterEnvelope); }
  
  /**
   * Set the {@code filterEnvelope} property.
   * @see #filterEnvelope
   */
  public void setFilterEnvelope(BADSREnvelope v) { set(filterEnvelope, v, null); }

////////////////////////////////////////////////////////////////
// Property "lfo"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code lfo} property.
   * @see #getLfo
   * @see #setLfo
   */
  public static final Property lfo = newProperty(0, new BLFO(), BFacets.make("alwaysExpand", BBoolean.TRUE));
  
  /**
   * Get the {@code lfo} property.
   * @see #lfo
   */
  public BLFO getLfo() { return (BLFO)get(lfo); }
  
  /**
   * Set the {@code lfo} property.
   * @see #lfo
   */
  public void setLfo(BLFO v) { set(lfo, v, null); }

////////////////////////////////////////////////////////////////
// Property "detune"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code detune} property.
   * @see #getDetune
   * @see #setDetune
   */
  public static final Property detune = newProperty(0, BDouble.make(0).getDouble(), null);
  
  /**
   * Get the {@code detune} property.
   * @see #detune
   */
  public double getDetune() { return getDouble(detune); }
  
  /**
   * Set the {@code detune} property.
   * @see #detune
   */
  public void setDetune(double v) { setDouble(detune, v, null); }

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BSynthesizerVoice.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/
}
