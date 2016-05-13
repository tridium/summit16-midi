package com.niagara.midi.baja;

import com.niagara.midi.fe.BMidiJsBuild;
import com.niagara.midi.synth.BLFO;

import javax.baja.bajascript.BBajaScriptTypeExt;
import javax.baja.naming.BOrd;
import javax.baja.nre.annotations.AgentOn;
import javax.baja.nre.annotations.NiagaraSingleton;
import javax.baja.nre.annotations.NiagaraType;
import javax.baja.sys.Context;
import javax.baja.sys.Sys;
import javax.baja.sys.Type;
import javax.baja.web.BIOffline;
import javax.baja.web.js.JsInfo;

/**
 * @author Logan Byam
 * @see BLFO
 */
@NiagaraType(agent = @AgentOn(types = {"midi:LFO"}))
@NiagaraSingleton
public final class BLFOTypeExt
  extends BBajaScriptTypeExt
  implements BIOffline
{
/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.baja.BLFOTypeExt(281457515)1.0$ @*/
/* Generated Fri May 06 15:47:23 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */
  
  public static final BLFOTypeExt INSTANCE = new BLFOTypeExt();

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BLFOTypeExt.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/
  private BLFOTypeExt() {}

  @Override
  public JsInfo getTypeExtJs(Context cx) { return jsInfo; }

  private static final JsInfo jsInfo =
    JsInfo.make(
      BOrd.make("module://midi/rc/baja/LFO.js"),
      BMidiJsBuild.TYPE
    );
}
