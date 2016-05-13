package com.niagara.midi.fe;

import javax.baja.naming.BOrd;
import javax.baja.nre.annotations.NiagaraSingleton;
import javax.baja.nre.annotations.NiagaraType;
import javax.baja.sys.BSingleton;
import javax.baja.sys.Context;
import javax.baja.sys.Sys;
import javax.baja.sys.Type;
import javax.baja.web.BIFormFactorMini;
import javax.baja.web.js.BIJavaScript;
import javax.baja.web.js.JsInfo;

@NiagaraType
@NiagaraSingleton
public final class BRangeSlider
  extends BSingleton
  implements BIJavaScript, BIFormFactorMini
{
/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.fe.BRangeSlider(3933907701)1.0$ @*/
/* Generated Fri Apr 22 15:37:34 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */
  
  public static final BRangeSlider INSTANCE = new BRangeSlider();

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BRangeSlider.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/
  private BRangeSlider() {}

  public JsInfo getJsInfo(Context cx) { return jsInfo; }

  private static final JsInfo jsInfo =
    JsInfo.make(
      BOrd.make("module://midi/rc/fe/RangeSlider.js"),
      BMidiJsBuild.TYPE
    );
}