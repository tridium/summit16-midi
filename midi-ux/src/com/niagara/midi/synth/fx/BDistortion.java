package com.niagara.midi.synth.fx;

import javax.baja.nre.annotations.Facet;
import javax.baja.nre.annotations.NiagaraProperty;
import javax.baja.nre.annotations.NiagaraType;
import javax.baja.sys.BComponent;
import javax.baja.sys.BDouble;
import javax.baja.sys.BFacets;
import javax.baja.sys.BString;
import javax.baja.sys.Property;
import javax.baja.sys.Sys;
import javax.baja.sys.Type;

@NiagaraType
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
public class BDistortion extends BComponent implements BIEffect
{
/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.synth.fx.BDistortion(1137604170)1.0$ @*/
/* Generated Wed Apr 27 12:22:50 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */

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
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BDistortion.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/
}
