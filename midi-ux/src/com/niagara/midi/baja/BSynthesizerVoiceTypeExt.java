package com.niagara.midi.baja;

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
@NiagaraType(agent = @AgentOn(types = {"midi:SynthesizerVoice"}))
@NiagaraSingleton
public final class BSynthesizerVoiceTypeExt
  extends BBajaScriptTypeExt
  implements BIOffline
{
/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.baja.BSynthesizerVoiceTypeExt(4012292894)1.0$ @*/
/* Generated Mon Apr 18 17:23:59 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */
  
  public static final BSynthesizerVoiceTypeExt INSTANCE = new BSynthesizerVoiceTypeExt();

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BSynthesizerVoiceTypeExt.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/
  private BSynthesizerVoiceTypeExt() {}

  @Override
  public JsInfo getTypeExtJs(Context cx) { return jsInfo; }

  private static final JsInfo jsInfo =
    JsInfo.make(
      BOrd.make("module://midi/rc/baja/SynthesizerVoice.js"),
      BMidiJsBuild.TYPE
    );
}
