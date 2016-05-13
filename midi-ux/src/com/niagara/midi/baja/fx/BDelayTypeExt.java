package com.niagara.midi.baja.fx;

import com.niagara.midi.fe.BMidiJsBuild;
import com.niagara.midi.message.BMidiMessage;

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
 * @see BMidiMessage
 */
@NiagaraType(agent = @AgentOn(types = {"midi:Delay"}))
@NiagaraSingleton
public final class BDelayTypeExt
  extends BBajaScriptTypeExt
  implements BIOffline
{
/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.baja.fx.BDelayTypeExt(168812089)1.0$ @*/
/* Generated Tue Apr 26 15:25:19 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */
  
  public static final BDelayTypeExt INSTANCE = new BDelayTypeExt();

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BDelayTypeExt.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/
  private BDelayTypeExt() {}

  @Override
  public JsInfo getTypeExtJs(Context cx) { return jsInfo; }

  private static final JsInfo jsInfo =
    JsInfo.make(
      BOrd.make("module://midi/rc/baja/fx/Delay.js"),
      BMidiJsBuild.TYPE
    );
}
