package com.niagara.midi.synth;

import com.niagara.midi.synth.fx.BIEffect;

import javax.baja.nre.annotations.Facet;
import javax.baja.nre.annotations.NiagaraProperty;
import javax.baja.nre.annotations.NiagaraType;
import javax.baja.sys.BBoolean;
import javax.baja.sys.BComponent;
import javax.baja.sys.BDouble;
import javax.baja.sys.BFacets;
import javax.baja.sys.BString;
import javax.baja.sys.Property;
import javax.baja.sys.Sys;
import javax.baja.sys.Type;

@NiagaraType
@NiagaraProperty(
  name = "oscillatorType",
  type = "midi:OscillatorType",
  defaultValue = "BOscillatorType.sine"
)
@NiagaraProperty(
  name = "frequency",
  type = "baja:Double",
  defaultValue = "BDouble.make(0)",
  facets = {
    @Facet(name = "BFacets.MIN", value = "BDouble.make(0)"),
    @Facet(name = "BFacets.MAX", value = "BDouble.make(100)"),
    @Facet(name = "BFacets.UX_FIELD_EDITOR", value = "BString.make(\"midi:RangeSlider\")")
  }
)
@NiagaraProperty(
  name = "amount",
  type = "baja:Double",
  defaultValue = "BDouble.make(0)",
  facets = {
    @Facet(name = "BFacets.MIN", value = "BDouble.make(0)"),
    @Facet(name = "BFacets.MAX", value = "BDouble.make(100)"),
    @Facet(name = "BFacets.UX_FIELD_EDITOR", value = "BString.make(\"midi:RangeSlider\")")
  }
)
@NiagaraProperty(
  name = "shared",
  type = "baja:Boolean",
  defaultValue = "BBoolean.TRUE"
)
@NiagaraProperty(
  name = "target",
  type = "midi:LFOTargetType",
  defaultValue = "BLFOTargetType.pitch"
)
public class BLFO extends BComponent implements BIEffect
{
/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.synth.BLFO(1992544297)1.0$ @*/
/* Generated Fri May 06 15:47:23 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */

////////////////////////////////////////////////////////////////
// Property "oscillatorType"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code oscillatorType} property.
   * @see #getOscillatorType
   * @see #setOscillatorType
   */
  public static final Property oscillatorType = newProperty(0, BOscillatorType.sine, null);
  
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
// Property "frequency"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code frequency} property.
   * @see #getFrequency
   * @see #setFrequency
   */
  public static final Property frequency = newProperty(0, BDouble.make(0).getDouble(), BFacets.make(BFacets.make(BFacets.make(BFacets.MIN, BDouble.make(0)), BFacets.make(BFacets.MAX, BDouble.make(100))), BFacets.make(BFacets.UX_FIELD_EDITOR, BString.make("midi:RangeSlider"))));
  
  /**
   * Get the {@code frequency} property.
   * @see #frequency
   */
  public double getFrequency() { return getDouble(frequency); }
  
  /**
   * Set the {@code frequency} property.
   * @see #frequency
   */
  public void setFrequency(double v) { setDouble(frequency, v, null); }

////////////////////////////////////////////////////////////////
// Property "amount"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code amount} property.
   * @see #getAmount
   * @see #setAmount
   */
  public static final Property amount = newProperty(0, BDouble.make(0).getDouble(), BFacets.make(BFacets.make(BFacets.make(BFacets.MIN, BDouble.make(0)), BFacets.make(BFacets.MAX, BDouble.make(100))), BFacets.make(BFacets.UX_FIELD_EDITOR, BString.make("midi:RangeSlider"))));
  
  /**
   * Get the {@code amount} property.
   * @see #amount
   */
  public double getAmount() { return getDouble(amount); }
  
  /**
   * Set the {@code amount} property.
   * @see #amount
   */
  public void setAmount(double v) { setDouble(amount, v, null); }

////////////////////////////////////////////////////////////////
// Property "shared"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code shared} property.
   * @see #getShared
   * @see #setShared
   */
  public static final Property shared = newProperty(0, BBoolean.TRUE.getBoolean(), null);
  
  /**
   * Get the {@code shared} property.
   * @see #shared
   */
  public boolean getShared() { return getBoolean(shared); }
  
  /**
   * Set the {@code shared} property.
   * @see #shared
   */
  public void setShared(boolean v) { setBoolean(shared, v, null); }

////////////////////////////////////////////////////////////////
// Property "target"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code target} property.
   * @see #getTarget
   * @see #setTarget
   */
  public static final Property target = newProperty(0, BLFOTargetType.pitch, null);
  
  /**
   * Get the {@code target} property.
   * @see #target
   */
  public BLFOTargetType getTarget() { return (BLFOTargetType)get(target); }
  
  /**
   * Set the {@code target} property.
   * @see #target
   */
  public void setTarget(BLFOTargetType v) { set(target, v, null); }

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BLFO.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/

}
