package com.niagara.midi.fe;

import javax.baja.naming.BOrd;
import javax.baja.nre.annotations.AgentOn;
import javax.baja.nre.annotations.NiagaraSingleton;
import javax.baja.nre.annotations.NiagaraType;
import javax.baja.sys.BSingleton;
import javax.baja.sys.Context;
import javax.baja.sys.Sys;
import javax.baja.sys.Type;
import javax.baja.web.BIFormFactorMax;
import javax.baja.web.js.BIJavaScript;
import javax.baja.web.js.JsInfo;

@NiagaraType(agent = @AgentOn(types = "midi:Synthesizer"))
@NiagaraSingleton
public final class BSynthesizerEditor
    extends BSingleton
    implements BIJavaScript, BIFormFactorMax
{
/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.fe.BSynthesizerEditor(111034333)1.0$ @*/
/* Generated Sun Apr 24 14:53:57 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */
  
  public static final BSynthesizerEditor INSTANCE = new BSynthesizerEditor();

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BSynthesizerEditor.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/
  private BSynthesizerEditor() {}

  public JsInfo getJsInfo(Context cx) { return jsInfo; }

  private static final JsInfo jsInfo =
      JsInfo.make(
        BOrd.make("module://midi/rc/fe/SynthesizerEditor.js"),
        BMidiJsBuild.TYPE
      );
}