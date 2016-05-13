package com.niagara.midi.point;

import javax.baja.sys.*;


import com.tridium.ndriver.discover.*;
import com.tridium.ndriver.point.*;


import com.niagara.midi.*;
import javax.baja.nre.annotations.*;

/**
 * BMidiPointDeviceExt is a container for midi proxy points.
 *
 * @author   Joseph Chandler on 04-Apr-16
 */
@NiagaraType
//@NiagaraProperty( name="propName", type="propType", defaultValue="BDefaultProperty.TYPE" )
public class BMidiPointDeviceExt
  extends BNPointDeviceExt 
{            
  public static final Property discoveryPreferences = newProperty(0, new BMidiPointDiscoveryPreferences(),null);


/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.point.BMidiPointDeviceExt(2979906276)1.0$ @*/
/* Generated Mon Apr 04 23:19:25 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BMidiPointDeviceExt.class);

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

////////////////////////////////////////////////////////////////
// PointDeviceExt
////////////////////////////////////////////////////////////////
  
  /**
   * @return the Device type.
   */
  public Type getDeviceType()
  {
    return BMidiDevice.TYPE;
  }

  /**
   * @return the PointFolder type.
   */
  public Type getPointFolderType()
  {
    return BMidiPointFolder.TYPE;
  }
  
  /**
   * @return the ProxyExt type.
   */
  public Type getProxyExtType()
  {
    return BMidiProxyExt.TYPE;
  }
  

////////////////////////////////////////////////////////////////
//BINDiscoveryHost
////////////////////////////////////////////////////////////////

  /** Call back for discoveryJob to get an array of discovery objects.
   *  Override point for driver specific discovery. */
  public BINDiscoveryObject[] getDiscoveryObjects(BNDiscoveryPreferences prefs) 
      throws Exception
  {
     //
     // TODO  get array of discovery objects
     //
//    Array a = new Array(??.class);
//    for(??)
//     a.add(new BMidiPointDiscoveryLeaf(??));
//    return (??[])a.trim();
    return null;
  }

}
