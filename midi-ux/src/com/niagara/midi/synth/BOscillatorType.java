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
    @Range("sawtooth"),
    @Range("sine"),
    @Range("square"),
    @Range("triangle"),
    @Range("noise")
  }
)
public final class BOscillatorType extends BFrozenEnum
{
/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.synth.BOscillatorType(2803974797)1.0$ @*/
/* Generated Wed May 11 20:22:02 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */
  
  /** Ordinal value for sawtooth. */
  public static final int SAWTOOTH = 0;
  /** Ordinal value for sine. */
  public static final int SINE = 1;
  /** Ordinal value for square. */
  public static final int SQUARE = 2;
  /** Ordinal value for triangle. */
  public static final int TRIANGLE = 3;
  /** Ordinal value for noise. */
  public static final int NOISE = 4;
  
  /** BOscillatorType constant for sawtooth. */
  public static final BOscillatorType sawtooth = new BOscillatorType(SAWTOOTH);
  /** BOscillatorType constant for sine. */
  public static final BOscillatorType sine = new BOscillatorType(SINE);
  /** BOscillatorType constant for square. */
  public static final BOscillatorType square = new BOscillatorType(SQUARE);
  /** BOscillatorType constant for triangle. */
  public static final BOscillatorType triangle = new BOscillatorType(TRIANGLE);
  /** BOscillatorType constant for noise. */
  public static final BOscillatorType noise = new BOscillatorType(NOISE);
  
  /** Factory method with ordinal. */
  public static BOscillatorType make(int ordinal)
  {
    return (BOscillatorType)sawtooth.getRange().get(ordinal, false);
  }
  
  /** Factory method with tag. */
  public static BOscillatorType make(String tag)
  {
    return (BOscillatorType)sawtooth.getRange().get(tag);
  }
  
  /** Private constructor. */
  private BOscillatorType(int ordinal)
  {
    super(ordinal);
  }
  
  public static final BOscillatorType DEFAULT = sawtooth;

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BOscillatorType.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/
}
