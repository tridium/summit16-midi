package com.niagara.midi;

import javax.baja.sys.*;
import javax.baja.nre.annotations.*;

import com.tridium.ndriver.BNDeviceFolder;

/**
 * BMidiDeviceFolder is a folder for BMidiDevice.
 *
 *  @author   Joseph Chandler on 04-Apr-16
 */
@NiagaraType
//@NiagaraProperty( name="propName", type="propType", defaultValue="BDefaultProperty.TYPE" )
public class BMidiDeviceFolder
  extends BNDeviceFolder
{                       

/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.BMidiDeviceFolder(2979906276)1.0$ @*/
/* Generated Mon Apr 04 23:19:25 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BMidiDeviceFolder.class);

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
   * @return true if parent is BMidiNetwork or BMidiDeviceFolder.
   */
  public boolean isParentLegal(BComponent parent)
  {
    return parent instanceof BMidiNetwork ||
           parent instanceof BMidiDeviceFolder;
  }


}
