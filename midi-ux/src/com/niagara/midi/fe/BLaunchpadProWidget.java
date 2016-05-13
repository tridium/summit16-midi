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

@NiagaraType(agent = @AgentOn(types = "midi:MidiDevice"))
@NiagaraSingleton
public final class BLaunchpadProWidget
    extends BSingleton
    implements BIJavaScript, BIFormFactorMax
{
/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.fe.BLaunchpadProWidget(73878694)1.0$ @*/
/* Generated Fri May 06 15:47:23 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */
  
  public static final BLaunchpadProWidget INSTANCE = new BLaunchpadProWidget();

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BLaunchpadProWidget.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/
  private BLaunchpadProWidget() {}

  public JsInfo getJsInfo(Context cx) { return jsInfo; }

  private static final JsInfo jsInfo =
      JsInfo.make(
        BOrd.make("module://midi/rc/fe/LaunchpadProWidget.js"),
        BMidiJsBuild.TYPE
      );
}