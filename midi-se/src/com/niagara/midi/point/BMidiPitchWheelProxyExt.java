package com.niagara.midi.point;

import com.niagara.midi.message.BMidiMessage;

import javax.baja.nre.annotations.NiagaraType;
import javax.baja.status.BStatusNumeric;
import javax.baja.sys.Sys;
import javax.baja.sys.Type;

/**
 * @author Joseph Chandler on 4/5/2016.
 */
@NiagaraType
public class BMidiPitchWheelProxyExt
  extends BMidiProxyExt
{
/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.point.BMidiPitchWheelProxyExt(2979906276)1.0$ @*/
/* Generated Fri Apr 08 14:09:19 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BMidiPitchWheelProxyExt.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/

  private int toValue(BMidiMessage message) {
    byte[] payload = message.getPayload();
    byte first = payload[1], second = payload[2];
    return (first | (second << 7)) - CENTER;
  }

  public void updateValue(BMidiMessage message)
  {
    readOk(new BStatusNumeric(toValue(message)));
  }

  private static final int CENTER = 0x2000;
}
