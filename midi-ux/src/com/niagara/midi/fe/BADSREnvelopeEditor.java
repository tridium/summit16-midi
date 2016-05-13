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

@NiagaraType(agent = @AgentOn(types = "midi:ADSREnvelope"))
@NiagaraSingleton
public final class BADSREnvelopeEditor
    extends BSingleton
    implements BIJavaScript, BIFormFactorMini
{
/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.fe.BADSREnvelopeEditor(2016085093)1.0$ @*/
/* Generated Mon Apr 18 17:49:57 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */
  
  public static final BADSREnvelopeEditor INSTANCE = new BADSREnvelopeEditor();

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BADSREnvelopeEditor.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/
  private BADSREnvelopeEditor() {}

  public JsInfo getJsInfo(Context cx) { return jsInfo; }

  private static final JsInfo jsInfo =
      JsInfo.make(
        BOrd.make("module://midi/rc/fe/ADSREnvelopeEditor.js"),
        BMidiJsBuild.TYPE
      );
}