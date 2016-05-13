package com.niagara.midi.fe;

import javax.baja.naming.BOrd;
import javax.baja.sys.Sys;
import javax.baja.sys.Type;
import javax.baja.web.js.BJsBuild;


public class BMidiJsBuild extends BJsBuild
{
  public static final BMidiJsBuild INSTANCE = new BMidiJsBuild(
    "midi",
    new BOrd[] {
      BOrd.make("module://midi/rc/midi.built.min.js")
    }
  );

  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BMidiJsBuild.class);

  private BMidiJsBuild(String id, BOrd[] files) { super(id, files); }
}
