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
@NiagaraType(agent = @AgentOn(types = {"midi:SynthesizerPreset"}))
@NiagaraSingleton
public final class BSynthesizerPresetTypeExt
  extends BBajaScriptTypeExt
  implements BIOffline
{
/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.baja.BSynthesizerPresetTypeExt(2086527868)1.0$ @*/
/* Generated Fri Apr 22 14:38:12 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */
  
  public static final BSynthesizerPresetTypeExt INSTANCE = new BSynthesizerPresetTypeExt();

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BSynthesizerPresetTypeExt.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/
  private BSynthesizerPresetTypeExt() {}

  @Override
  public JsInfo getTypeExtJs(Context cx) { return jsInfo; }

  private static final JsInfo jsInfo =
    JsInfo.make(
      BOrd.make("module://midi/rc/baja/SynthesizerPreset.js"),
      BMidiJsBuild.TYPE
    );
}
