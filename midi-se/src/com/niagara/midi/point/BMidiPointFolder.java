package com.niagara.midi.point;

import javax.baja.sys.*;
import javax.baja.driver.point.*;

import com.niagara.midi.*;
import javax.baja.nre.annotations.*;

/**
 * BMidiPointFolder
 *
 * @author   Joseph Chandler on 04-Apr-16
 */
@NiagaraType
//@NiagaraProperty( name="propName", type="propType", defaultValue="BDefaultProperty.TYPE" )
public class BMidiPointFolder
  extends BPointFolder
{            

/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.point.BMidiPointFolder(2979906276)1.0$ @*/
/* Generated Mon Apr 04 23:19:25 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BMidiPointFolder.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/

////////////////////////////////////////////////////////////////
// Access
////////////////////////////////////////////////////////////////
  
  /**
   * Get the network cast to a BMidiNetwork.
   * @return network as a BMidiNetwork.
   */
  public final BMidiNetwork getMidiNetwork()
  {
    return (BMidiNetwork)getNetwork();
  }

  /**
   * Get the device cast to a BMidiDevice.
   * @return device as a BMidiDevice.
   */
  public final BMidiDevice getMidiDevice()
  {
    return (BMidiDevice)getDevice();
  }

}
