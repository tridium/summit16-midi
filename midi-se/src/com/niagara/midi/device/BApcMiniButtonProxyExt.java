package com.niagara.midi.device;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import javax.baja.driver.point.BReadWriteMode;
import javax.baja.nre.annotations.NiagaraType;
import javax.baja.status.BStatusEnum;
import javax.baja.sys.Context;
import javax.baja.sys.Sys;
import javax.baja.sys.Type;
import javax.sound.midi.InvalidMidiDataException;
import javax.sound.midi.MidiDevice;
import javax.sound.midi.MidiUnavailableException;
import javax.sound.midi.ShortMessage;
import com.niagara.midi.point.BMidiProxyExt;

@NiagaraType
public class BApcMiniButtonProxyExt
  extends BMidiProxyExt
{
/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.device.BApcMiniButtonProxyExt(2979906276)1.0$ @*/
/* Generated Tue Apr 05 02:13:45 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BApcMiniButtonProxyExt.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/

  public BReadWriteMode getMode()
  {
    return BReadWriteMode.writeonly;
  }

  public boolean write(Context cx)
    throws Exception
  {
    if(isEnum())
    {
      final BStatusEnum write = (BStatusEnum) getWriteValue();
      if(write != null && !write.getStatus().isNull())
      {
        e.execute(()->{
          byte out = (byte) write.getValue().getOrdinal();
          ShortMessage sm = new ShortMessage();
          try
          {
            sm.setMessage((ShortMessage.NOTE_ON & 0xF0), 0xFF & getChannel(), 0xFF & out);
            MidiDevice device = getBMidiDevice().getDevice();
            if(device.isOpen())
            {
              device.getReceiver().send(sm, -1);
              writeOk(write);
            }
          }
          catch (InvalidMidiDataException | MidiUnavailableException e1)
          {
            e1.printStackTrace();
          }
        });
        return true;
      }
    }
    return false;
  }
  private static final ExecutorService e = Executors.newFixedThreadPool(1);
}
