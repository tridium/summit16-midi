package com.niagara.midi.point;

import javax.baja.sys.*;
import javax.baja.nre.annotations.*;

import com.tridium.ndriver.discover.*;

@NiagaraType
//@NiagaraProperty( name="propName", type="propType", defaultValue="BDefaultProperty.TYPE" )
public class BMidiPointDiscoveryPreferences
  extends BNDiscoveryPreferences
{

/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.point.BMidiPointDiscoveryPreferences(2979906276)1.0$ @*/
/* Generated Mon Apr 04 23:19:25 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BMidiPointDiscoveryPreferences.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/
  
  public Type getDiscoveryLeafType()
  {
    return BMidiPointDiscoveryLeaf.TYPE;
  }

}
