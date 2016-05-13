package com.niagara.midi.fe;

import javax.baja.naming.BOrd;
import javax.baja.nre.annotations.AgentOn;
import javax.baja.nre.annotations.NiagaraSingleton;
import javax.baja.nre.annotations.NiagaraType;
import javax.baja.sys.BSingleton;
import javax.baja.sys.Context;
import javax.baja.sys.Sys;
import javax.baja.sys.Type;
import javax.baja.web.BIFormFactorMini;
import javax.baja.web.js.BIJavaScript;
import javax.baja.web.js.JsInfo;

@NiagaraType(agent = @AgentOn(types = "midi:MidiMessage"))
@NiagaraSingleton
public final class BMidiMessageEditor
  extends BSingleton
  implements BIJavaScript, BIFormFactorMini
{
/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.fe.BMidiMessageEditor(203879771)1.0$ @*/
/* Generated Fri Apr 29 14:33:11 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */
  
  public static final BMidiMessageEditor INSTANCE = new BMidiMessageEditor();

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BMidiMessageEditor.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/
  private BMidiMessageEditor() {}

  public JsInfo getJsInfo(Context cx) { return jsInfo; }

  private static final JsInfo jsInfo =
    JsInfo.make(
      BOrd.make("module://midi/rc/fe/MidiMessageEditor.js"),
      BMidiJsBuild.TYPE
    );
}