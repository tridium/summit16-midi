package com.niagara.midi.synth;

import javax.baja.nre.annotations.NiagaraProperty;
import javax.baja.nre.annotations.NiagaraType;
import javax.baja.sys.BComponent;
import javax.baja.sys.BString;
import javax.baja.sys.Property;
import javax.baja.sys.Sys;
import javax.baja.sys.Type;
import javax.baja.util.BUnrestrictedFolder;

@NiagaraType
@NiagaraProperty(
  name = "activePreset",
  type = "baja:String",
  defaultValue = "BString.DEFAULT"
)
@NiagaraProperty(
  name = "presets",
  type = "baja:UnrestrictedFolder",
  defaultValue = "new BUnrestrictedFolder()"
)
public class BSynthesizer extends BComponent
{
/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.synth.BSynthesizer(3728728503)1.0$ @*/
/* Generated Sun Apr 24 15:32:11 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */

////////////////////////////////////////////////////////////////
// Property "activePreset"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code activePreset} property.
   * @see #getActivePreset
   * @see #setActivePreset
   */
  public static final Property activePreset = newProperty(0, BString.DEFAULT, null);
  
  /**
   * Get the {@code activePreset} property.
   * @see #activePreset
   */
  public String getActivePreset() { return getString(activePreset); }
  
  /**
   * Set the {@code activePreset} property.
   * @see #activePreset
   */
  public void setActivePreset(String v) { setString(activePreset, v, null); }

////////////////////////////////////////////////////////////////
// Property "presets"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code presets} property.
   * @see #getPresets
   * @see #setPresets
   */
  public static final Property presets = newProperty(0, new BUnrestrictedFolder(), null);
  
  /**
   * Get the {@code presets} property.
   * @see #presets
   */
  public BUnrestrictedFolder getPresets() { return (BUnrestrictedFolder)get(presets); }
  
  /**
   * Set the {@code presets} property.
   * @see #presets
   */
  public void setPresets(BUnrestrictedFolder v) { set(presets, v, null); }

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BSynthesizer.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/
}
