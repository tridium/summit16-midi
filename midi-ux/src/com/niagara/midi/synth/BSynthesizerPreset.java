package com.niagara.midi.synth;

import com.niagara.midi.synth.fx.BEffects;

import javax.baja.nre.annotations.NiagaraProperty;
import javax.baja.nre.annotations.NiagaraType;
import javax.baja.sys.BComponent;
import javax.baja.sys.Property;
import javax.baja.sys.Sys;
import javax.baja.sys.Type;

@NiagaraType
@NiagaraProperty(
  name = "effects",
  type = "midi:Effects",
  defaultValue = "new BEffects()"
)
public class BSynthesizerPreset extends BComponent
{
/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.synth.BSynthesizerPreset(1606462426)1.0$ @*/
/* Generated Tue Apr 26 15:37:41 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */

////////////////////////////////////////////////////////////////
// Property "effects"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code effects} property.
   * @see #getEffects
   * @see #setEffects
   */
  public static final Property effects = newProperty(0, new BEffects(), null);
  
  /**
   * Get the {@code effects} property.
   * @see #effects
   */
  public BEffects getEffects() { return (BEffects)get(effects); }
  
  /**
   * Set the {@code effects} property.
   * @see #effects
   */
  public void setEffects(BEffects v) { set(effects, v, null); }

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BSynthesizerPreset.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/

}
