package com.niagara.midi.point;

import javax.baja.nre.annotations.NiagaraProperty;
import javax.baja.nre.annotations.NiagaraType;
import javax.baja.status.BStatusBoolean;
import javax.baja.sys.Property;
import javax.baja.sys.Sys;
import javax.baja.sys.Type;
import com.niagara.midi.message.BMidiMessage;

/**
 * @author Joseph Chandler on 4/5/2016.
 */
@NiagaraType
@NiagaraProperty( name="noteNumber", type="int", defaultValue="0" )
public class BMidiNoteProxyExt
  extends BMidiProxyExt
{
/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.point.BMidiNoteProxyExt(562581727)1.0$ @*/
/* Generated Fri Apr 08 11:08:36 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */

////////////////////////////////////////////////////////////////
// Property "noteNumber"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code noteNumber} property.
   * @see #getNoteNumber
   * @see #setNoteNumber
   */
  public static final Property noteNumber = newProperty(0, 0, null);
  
  /**
   * Get the {@code noteNumber} property.
   * @see #noteNumber
   */
  public int getNoteNumber() { return getInt(noteNumber); }
  
  /**
   * Set the {@code noteNumber} property.
   * @see #noteNumber
   */
  public void setNoteNumber(int v) { setInt(noteNumber, v, null); }

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BMidiNoteProxyExt.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/

  private boolean isNoteOn(BMidiMessage message)
  {
    return message.getStatusType() == BMidiMessage.StatusType.NOTE_ON &&
      message.getPayload()[2] > 0;
  }

  public void updateValue(BMidiMessage message)
  {
    readOk(new BStatusBoolean(isNoteOn(message)));
  }
}
