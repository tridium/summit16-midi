package com.niagara.midi.synth;

import javax.baja.nre.annotations.NiagaraEnum;
import javax.baja.nre.annotations.NiagaraType;
import javax.baja.nre.annotations.Range;
import javax.baja.sys.BFrozenEnum;
import javax.baja.sys.Sys;
import javax.baja.sys.Type;

@NiagaraType
@NiagaraEnum(
  range = {
    @Range("pitch"),
    @Range("volume"),
    @Range("filter")
  }
)
public final class BLFOTargetType extends BFrozenEnum
{
/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.synth.BLFOTargetType(1378020441)1.0$ @*/
/* Generated Fri Apr 22 18:17:46 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */
  
  /** Ordinal value for pitch. */
  public static final int PITCH = 0;
  /** Ordinal value for volume. */
  public static final int VOLUME = 1;
  /** Ordinal value for filter. */
  public static final int FILTER = 2;
  
  /** BLFOTargetType constant for pitch. */
  public static final BLFOTargetType pitch = new BLFOTargetType(PITCH);
  /** BLFOTargetType constant for volume. */
  public static final BLFOTargetType volume = new BLFOTargetType(VOLUME);
  /** BLFOTargetType constant for filter. */
  public static final BLFOTargetType filter = new BLFOTargetType(FILTER);
  
  /** Factory method with ordinal. */
  public static BLFOTargetType make(int ordinal)
  {
    return (BLFOTargetType)pitch.getRange().get(ordinal, false);
  }
  
  /** Factory method with tag. */
  public static BLFOTargetType make(String tag)
  {
    return (BLFOTargetType)pitch.getRange().get(tag);
  }
  
  /** Private constructor. */
  private BLFOTargetType(int ordinal)
  {
    super(ordinal);
  }
  
  public static final BLFOTargetType DEFAULT = pitch;

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BLFOTargetType.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/
}
