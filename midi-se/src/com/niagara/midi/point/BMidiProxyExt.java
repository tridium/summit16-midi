package com.niagara.midi.point;

import javax.baja.sys.*;
import javax.baja.status.*;
import javax.baja.driver.point.*;
import javax.baja.nre.annotations.*;

import com.niagara.midi.*;
import com.niagara.midi.message.BMidiMessage;
import com.tridium.driver.util.DrUtil;


/**
 * BMidiProxyExt
 *
 *  @author   Joseph Chandler on 04-Apr-16
 */
@NiagaraType
@NiagaraProperty( name="channel", type="int", defaultValue="0" )
public class BMidiProxyExt
  extends BProxyExt
{   
  
  // Override ProxyExt default status to clear stale state.
  // public static final Property status = newProperty(Flags.READONLY|Flags.TRANSIENT, BStatus.ok, null);
  


/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.point.BMidiProxyExt(3824944874)1.0$ @*/
/* Generated Tue Apr 05 01:07:15 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */

////////////////////////////////////////////////////////////////
// Property "channel"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code channel} property.
   * @see #getChannel
   * @see #setChannel
   */
  public static final Property channel = newProperty(0, 0, null);
  
  /**
   * Get the {@code channel} property.
   * @see #channel
   */
  public int getChannel() { return getInt(channel); }
  
  /**
   * Set the {@code channel} property.
   * @see #channel
   */
  public void setChannel(int v) { setInt(channel, v, null); }

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BMidiProxyExt.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/


  public void stopped()
    throws Exception
  {
    super.stopped();
    getBMidiDevice().removePoint(this);
  }
  
////////////////////////////////////////////////////////////////
// Access
////////////////////////////////////////////////////////////////
  
  /**
   * Get the network cast to a BMidiNetwork.
   */
  public final BMidiNetwork getMidiNetwork()
  {
    return (BMidiNetwork)getNetwork();
  }

  /**
   * Get the device cast to a BMidiDevice.
   */
  public final BMidiDevice getBMidiDevice()
  {
    return (BMidiDevice)DrUtil.getParent(this, BMidiDevice.TYPE);
  }

  /**
   * Get the point device ext cast to a BMidiPointDeviceExt.
   */
  public final BMidiPointDeviceExt getMidiPointDeviceExt()
  {
    return (BMidiPointDeviceExt)getDeviceExt();
  }
  
////////////////////////////////////////////////////////////////
// ProxyExt
////////////////////////////////////////////////////////////////
  public void readSubscribed(Context cx)
    throws Exception
  {

  }
  
  public void readUnsubscribed(Context cx)
    throws Exception
  {
     // TODO
  }
  
  public boolean write(Context cx)
    throws Exception
  {
    // TODO
    return true;
  }
  
  /**
   * Return the device type. 
   */
  public Type getDeviceExtType()
  {
    return BMidiPointDeviceExt.TYPE;
  }                     
  
  /**
   * Return the read/write mode of this proxy.
   */
  public BReadWriteMode getMode()
  {
    // TODO
    return BReadWriteMode.readonly;
  }                        
  
  public boolean isBoolean()
  {
    return getParentPoint().getOutStatusValue() instanceof BStatusBoolean;
  }
  
  public boolean isNumeric()
  {
    return getParentPoint().getOutStatusValue() instanceof BStatusNumeric;
  }
  
  public boolean isString()
  {
    return getParentPoint().getOutStatusValue() instanceof BStatusString;
  }
  
  public boolean isEnum()
  {
    return getParentPoint().getOutStatusValue() instanceof BStatusEnum;
  }

  public void updateValue(BMidiMessage message)  { }
}
