package  com.niagara.midi.message;

import java.io.*;
import java.util.Arrays;

import javax.baja.nre.util.TextUtil;
import javax.baja.sys.BObject;
import javax.baja.sys.BSimple;
import javax.baja.sys.Sys;
import javax.baja.sys.Type;

/**
 *  BMidiMessage is super class for all midi messages
 *
 *  @author Joseph Chandler on 04-Apr-16
 */
public final class BMidiMessage extends BSimple
{
  public static final BMidiMessage DEFAULT = new BMidiMessage(new byte[] { (byte) 0xFE });
  public static final Type TYPE = Sys.loadType(BMidiMessage.class);
  @Override public Type getType() { return TYPE; }

  @Override
  public boolean equals(Object o)
  {
    return o instanceof BMidiMessage &&
      Arrays.equals(payload, ((BMidiMessage) o).payload);
  }

  @Override
  public void encode(DataOutput dataOutput) throws IOException
  {
    dataOutput.write(encodeToString().getBytes("UTF-8"));
  }

  @Override
  public BObject decode(DataInput dataInput) throws IOException
  {
    return decodeFromString(dataInput.readUTF());
  }

  @Override
  public String encodeToString() throws IOException
  {
    boolean first = true;
    StringBuilder sb = new StringBuilder();
    for (byte b : payload) {
      if (!first) { sb.append(" "); }
      sb.append(TextUtil.byteToHexString(b));
      first = false;
    }
    return sb.toString();
  }

  @Override
  public BObject decodeFromString(String s) throws IOException
  {
    String[] hexCodes = s.split(" ");
    byte[] b = new byte[hexCodes.length];
    for (int i = 0; i < hexCodes.length; i++) {
      b[i] = (byte) Integer.parseInt(hexCodes[i], 16);
    }
    return new BMidiMessage(b);
  }

  public enum StatusType {
    NOTE_ON,
    NOTE_OFF,
    AFTERTOUCH,
    CONTROL_CHANGE,
    PATCH_CHANGE,
    CHANNEL_PRESSURE,
    PITCH_BEND,
    SYSEX;

    static StatusType fromStatusByte(byte b) {
      switch (b & 0xF0) {
        case 0x80: return NOTE_OFF;
        case 0x90: return NOTE_ON;
        case 0xA0: return AFTERTOUCH;
        case 0xB0: return CONTROL_CHANGE;
        case 0xC0: return PATCH_CHANGE;
        case 0xD0: return CHANNEL_PRESSURE;
        case 0xE0: return PITCH_BEND;
        case 0xF0: return SYSEX;
        default: throw new IllegalArgumentException("could not get status " +
          "type from byte " + TextUtil.byteToHexString(b));
      }
    }
  }

  private byte[] payload;

  public BMidiMessage(byte[] payload) { this.payload = payload; }

  public byte[] getPayload() { return payload; }

  public int getChannel() { return (payload[0] & 0x0F) + 1; }

  public StatusType getStatusType() { return StatusType.fromStatusByte(payload[0]); }
}
