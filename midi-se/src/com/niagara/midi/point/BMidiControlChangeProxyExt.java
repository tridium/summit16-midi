package com.niagara.midi.point;

import com.niagara.midi.message.BMidiMessage;

import javax.baja.nre.annotations.NiagaraProperty;
import javax.baja.nre.annotations.NiagaraType;
import javax.baja.status.BStatusNumeric;
import javax.baja.sys.Property;
import javax.baja.sys.Sys;
import javax.baja.sys.Type;

/**
 * @author Joseph Chandler on 4/5/2016
 */
@NiagaraType
@NiagaraProperty( name="controllerNumber", type="int", defaultValue="0" )
public class BMidiControlChangeProxyExt
  extends BMidiProxyExt
{
/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.point.BMidiControlChangeProxyExt(2550820099)1.0$ @*/
/* Generated Fri Apr 08 11:12:21 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */

////////////////////////////////////////////////////////////////
// Property "controllerNumber"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code controllerNumber} property.
   * @see #getControllerNumber
   * @see #setControllerNumber
   */
  public static final Property controllerNumber = newProperty(0, 0, null);
  
  /**
   * Get the {@code controllerNumber} property.
   * @see #controllerNumber
   */
  public int getControllerNumber() { return getInt(controllerNumber); }
  
  /**
   * Set the {@code controllerNumber} property.
   * @see #controllerNumber
   */
  public void setControllerNumber(int v) { setInt(controllerNumber, v, null); }

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BMidiControlChangeProxyExt.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/

  public void updateValue(BMidiMessage message)
  {
    readOk(new BStatusNumeric(message.getPayload()[2]));
  }

}
