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
    @Range("lowpass"),
    @Range("highpass"),
    @Range("bandpass"),
    @Range("lowshelf"),
    @Range("highshelf"),
    @Range("peaking"),
    @Range("notch")
  }
)
public final class BFilterType extends BFrozenEnum
{
/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.synth.BFilterType(3823662308)1.0$ @*/
/* Generated Mon Apr 18 20:01:45 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */
  
  /** Ordinal value for lowpass. */
  public static final int LOWPASS = 0;
  /** Ordinal value for highpass. */
  public static final int HIGHPASS = 1;
  /** Ordinal value for bandpass. */
  public static final int BANDPASS = 2;
  /** Ordinal value for lowshelf. */
  public static final int LOWSHELF = 3;
  /** Ordinal value for highshelf. */
  public static final int HIGHSHELF = 4;
  /** Ordinal value for peaking. */
  public static final int PEAKING = 5;
  /** Ordinal value for notch. */
  public static final int NOTCH = 6;
  
  /** BFilterType constant for lowpass. */
  public static final BFilterType lowpass = new BFilterType(LOWPASS);
  /** BFilterType constant for highpass. */
  public static final BFilterType highpass = new BFilterType(HIGHPASS);
  /** BFilterType constant for bandpass. */
  public static final BFilterType bandpass = new BFilterType(BANDPASS);
  /** BFilterType constant for lowshelf. */
  public static final BFilterType lowshelf = new BFilterType(LOWSHELF);
  /** BFilterType constant for highshelf. */
  public static final BFilterType highshelf = new BFilterType(HIGHSHELF);
  /** BFilterType constant for peaking. */
  public static final BFilterType peaking = new BFilterType(PEAKING);
  /** BFilterType constant for notch. */
  public static final BFilterType notch = new BFilterType(NOTCH);
  
  /** Factory method with ordinal. */
  public static BFilterType make(int ordinal)
  {
    return (BFilterType)lowpass.getRange().get(ordinal, false);
  }
  
  /** Factory method with tag. */
  public static BFilterType make(String tag)
  {
    return (BFilterType)lowpass.getRange().get(tag);
  }
  
  /** Private constructor. */
  private BFilterType(int ordinal)
  {
    super(ordinal);
  }
  
  public static final BFilterType DEFAULT = lowpass;

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BFilterType.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/
}
