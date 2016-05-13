package com.niagara.midi.synth;

import javax.baja.nre.annotations.Facet;
import javax.baja.nre.annotations.NiagaraProperty;
import javax.baja.nre.annotations.NiagaraType;
import javax.baja.sys.BDouble;
import javax.baja.sys.BFacets;
import javax.baja.sys.BStruct;
import javax.baja.sys.Property;
import javax.baja.sys.Sys;
import javax.baja.sys.Type;

@NiagaraType
/**
 * Envelope attack time, in milliseconds (0-1000)
 */
@NiagaraProperty(name = "attack", type = "baja:Double", defaultValue = "BDouble.make(0)",
  facets = {
    @Facet(name = "BFacets.MIN", value = "BDouble.make(0)"),
    @Facet(name = "BFacets.MAX", value = "BDouble.make(1000)")
  }
)
/**
 * Envelope delay time, in milliseconds (0-1000)
 */
@NiagaraProperty(name = "delay", type = "baja:Double", defaultValue = "BDouble.make(100)",
  facets = {
    @Facet(name = "BFacets.MIN", value = "BDouble.make(0)"),
    @Facet(name = "BFacets.MAX", value = "BDouble.make(1000)")
  }
)
/**
 * Envelope sustain level, between 0 (silent) and 1 (max volume)
 */
@NiagaraProperty(name = "sustain", type = "baja:Double", defaultValue = "BDouble.make(0.5)",
  facets = {
    @Facet(name = "BFacets.MIN", value = "BDouble.make(0)"),
    @Facet(name = "BFacets.MAX", value = "BDouble.make(1)")
  }
)
/**
 * Envelope release time, in milliseconds (0-1000)
 */
@NiagaraProperty(name = "release", type = "baja:Double", defaultValue = "BDouble.make(100)",
  facets = {
    @Facet(name = "BFacets.MIN", value = "BDouble.make(0)"),
    @Facet(name = "BFacets.MAX", value = "BDouble.make(1000)")
  }
)
public class BADSREnvelope extends BStruct
{
/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.synth.BADSREnvelope(3341434134)1.0$ @*/
/* Generated Fri Apr 22 18:00:42 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */

////////////////////////////////////////////////////////////////
// Property "attack"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code attack} property.
   * Envelope attack time, in milliseconds (0-1000)
   * @see #getAttack
   * @see #setAttack
   */
  public static final Property attack = newProperty(0, BDouble.make(0).getDouble(), BFacets.make(BFacets.make(BFacets.MIN, BDouble.make(0)), BFacets.make(BFacets.MAX, BDouble.make(1000))));
  
  /**
   * Get the {@code attack} property.
   * Envelope attack time, in milliseconds (0-1000)
   * @see #attack
   */
  public double getAttack() { return getDouble(attack); }
  
  /**
   * Set the {@code attack} property.
   * Envelope attack time, in milliseconds (0-1000)
   * @see #attack
   */
  public void setAttack(double v) { setDouble(attack, v, null); }

////////////////////////////////////////////////////////////////
// Property "delay"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code delay} property.
   * Envelope delay time, in milliseconds (0-1000)
   * @see #getDelay
   * @see #setDelay
   */
  public static final Property delay = newProperty(0, BDouble.make(100).getDouble(), BFacets.make(BFacets.make(BFacets.MIN, BDouble.make(0)), BFacets.make(BFacets.MAX, BDouble.make(1000))));
  
  /**
   * Get the {@code delay} property.
   * Envelope delay time, in milliseconds (0-1000)
   * @see #delay
   */
  public double getDelay() { return getDouble(delay); }
  
  /**
   * Set the {@code delay} property.
   * Envelope delay time, in milliseconds (0-1000)
   * @see #delay
   */
  public void setDelay(double v) { setDouble(delay, v, null); }

////////////////////////////////////////////////////////////////
// Property "sustain"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code sustain} property.
   * Envelope sustain level, between 0 (silent) and 1 (max volume)
   * @see #getSustain
   * @see #setSustain
   */
  public static final Property sustain = newProperty(0, BDouble.make(0.5).getDouble(), BFacets.make(BFacets.make(BFacets.MIN, BDouble.make(0)), BFacets.make(BFacets.MAX, BDouble.make(1))));
  
  /**
   * Get the {@code sustain} property.
   * Envelope sustain level, between 0 (silent) and 1 (max volume)
   * @see #sustain
   */
  public double getSustain() { return getDouble(sustain); }
  
  /**
   * Set the {@code sustain} property.
   * Envelope sustain level, between 0 (silent) and 1 (max volume)
   * @see #sustain
   */
  public void setSustain(double v) { setDouble(sustain, v, null); }

////////////////////////////////////////////////////////////////
// Property "release"
////////////////////////////////////////////////////////////////

  /**
   * Slot for the {@code release} property.
   * Envelope release time, in milliseconds (0-1000)
   * @see #getRelease
   * @see #setRelease
   */
  public static final Property release = newProperty(0, BDouble.make(100).getDouble(), BFacets.make(BFacets.make(BFacets.MIN, BDouble.make(0)), BFacets.make(BFacets.MAX, BDouble.make(1000))));
  
  /**
   * Get the {@code release} property.
   * Envelope release time, in milliseconds (0-1000)
   * @see #release
   */
  public double getRelease() { return getDouble(release); }
  
  /**
   * Set the {@code release} property.
   * Envelope release time, in milliseconds (0-1000)
   * @see #release
   */
  public void setRelease(double v) { setDouble(release, v, null); }

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BADSREnvelope.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/
}
