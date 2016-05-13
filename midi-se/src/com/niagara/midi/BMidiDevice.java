package com.niagara.midi;

import javax.baja.control.BBooleanPoint;
import javax.baja.control.BControlPoint;
import javax.baja.control.BEnumWritable;
import javax.baja.control.BNumericPoint;
import javax.baja.control.ext.BAbstractProxyExt;
import javax.baja.driver.util.BPollFrequency;
import javax.baja.status.BStatus;
import javax.baja.sys.*;
import javax.baja.nre.annotations.*;
import javax.sound.midi.InvalidMidiDataException;
import javax.sound.midi.MidiDevice;
import javax.sound.midi.MidiMessage;
import javax.sound.midi.MidiUnavailableException;
import javax.sound.midi.Receiver;
import javax.sound.midi.ShortMessage;
import javax.sound.midi.SysexMessage;

import com.niagara.midi.message.BMidiMessage;
import com.tridium.ndriver.BNDevice;
import com.tridium.ndriver.poll.BINPollable;
import com.tridium.ndriver.util.SfUtil;

import com.niagara.midi.device.BApcMiniButtonProxyExt;
import com.niagara.midi.point.*;


/**
 *  BMidiDevice models a single device
 *
 *  @author   Joseph Chandler on 04-Apr-16
 */
@NiagaraType
@NiagaraProperty(name = "pollFrequency",   type = "BPollFrequency",  defaultValue = "BPollFrequency.normal")
@NiagaraProperty(name = "points",          type = "BMidiPointDeviceExt",  defaultValue = "new BMidiPointDeviceExt()")
@NiagaraProperty(name = "devName",         type = "String", defaultValue = "midiDevice")
@NiagaraProperty(name = "vendor",          type = "String", defaultValue = "midiVendor")
@NiagaraProperty(name = "description",     type = "String", defaultValue = "midiDescription")
@NiagaraProperty(name = "version",         type = "String", defaultValue = "version")
@NiagaraProperty(name = "maxReceivers",    type = "int", defaultValue = "0")
@NiagaraProperty(name = "maxTransmitters", type = "int", defaultValue = "0")
@NiagaraTopic(name = "message", eventType = "midi:MidiMessage")
@NiagaraAction(name = "sendMessage", parameterType = "midi:MidiMessage", defaultValue = "new BMidiMessage(new byte[] { (byte) 0xfe })")
public class BMidiDevice
  extends BNDevice
  implements BINPollable, Receiver

{
  
  // Add facet to include following in auto manager view
  public static final Property status = newProperty(Flags.TRANSIENT|Flags.READONLY|Flags.SUMMARY|Flags.DEFAULT_ON_CLONE, BStatus.ok, SfUtil.incl(SfUtil.MGR_EDIT_READONLY));



/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.BMidiDevice(1488647780)1.0$ @*/
/* Generated Fri Apr 29 15:18:54 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */

////////////////////////////////////////////////////////////////
// Property "pollFrequency"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code pollFrequency} property.
   * @see #getPollFrequency
   * @see #setPollFrequency
   */
  public static final Property pollFrequency = newProperty(0, BPollFrequency.normal, null);
  
  /**
   * Get the {@code pollFrequency} property.
   * @see #pollFrequency
   */
  public BPollFrequency getPollFrequency() { return (BPollFrequency)get(pollFrequency); }
  
  /**
   * Set the {@code pollFrequency} property.
   * @see #pollFrequency
   */
  public void setPollFrequency(BPollFrequency v) { set(pollFrequency, v, null); }

////////////////////////////////////////////////////////////////
// Property "points"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code points} property.
   * @see #getPoints
   * @see #setPoints
   */
  public static final Property points = newProperty(0, new BMidiPointDeviceExt(), null);
  
  /**
   * Get the {@code points} property.
   * @see #points
   */
  public BMidiPointDeviceExt getPoints() { return (BMidiPointDeviceExt)get(points); }
  
  /**
   * Set the {@code points} property.
   * @see #points
   */
  public void setPoints(BMidiPointDeviceExt v) { set(points, v, null); }

////////////////////////////////////////////////////////////////
// Property "devName"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code devName} property.
   * @see #getDevName
   * @see #setDevName
   */
  public static final Property devName = newProperty(0, "midiDevice", null);
  
  /**
   * Get the {@code devName} property.
   * @see #devName
   */
  public String getDevName() { return getString(devName); }
  
  /**
   * Set the {@code devName} property.
   * @see #devName
   */
  public void setDevName(String v) { setString(devName, v, null); }

////////////////////////////////////////////////////////////////
// Property "vendor"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code vendor} property.
   * @see #getVendor
   * @see #setVendor
   */
  public static final Property vendor = newProperty(0, "midiVendor", null);
  
  /**
   * Get the {@code vendor} property.
   * @see #vendor
   */
  public String getVendor() { return getString(vendor); }
  
  /**
   * Set the {@code vendor} property.
   * @see #vendor
   */
  public void setVendor(String v) { setString(vendor, v, null); }

////////////////////////////////////////////////////////////////
// Property "description"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code description} property.
   * @see #getDescription
   * @see #setDescription
   */
  public static final Property description = newProperty(0, "midiDescription", null);
  
  /**
   * Get the {@code description} property.
   * @see #description
   */
  public String getDescription() { return getString(description); }
  
  /**
   * Set the {@code description} property.
   * @see #description
   */
  public void setDescription(String v) { setString(description, v, null); }

////////////////////////////////////////////////////////////////
// Property "version"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code version} property.
   * @see #getVersion
   * @see #setVersion
   */
  public static final Property version = newProperty(0, "version", null);
  
  /**
   * Get the {@code version} property.
   * @see #version
   */
  public String getVersion() { return getString(version); }
  
  /**
   * Set the {@code version} property.
   * @see #version
   */
  public void setVersion(String v) { setString(version, v, null); }

////////////////////////////////////////////////////////////////
// Property "maxReceivers"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code maxReceivers} property.
   * @see #getMaxReceivers
   * @see #setMaxReceivers
   */
  public static final Property maxReceivers = newProperty(0, 0, null);
  
  /**
   * Get the {@code maxReceivers} property.
   * @see #maxReceivers
   */
  public int getMaxReceivers() { return getInt(maxReceivers); }
  
  /**
   * Set the {@code maxReceivers} property.
   * @see #maxReceivers
   */
  public void setMaxReceivers(int v) { setInt(maxReceivers, v, null); }

////////////////////////////////////////////////////////////////
// Property "maxTransmitters"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code maxTransmitters} property.
   * @see #getMaxTransmitters
   * @see #setMaxTransmitters
   */
  public static final Property maxTransmitters = newProperty(0, 0, null);
  
  /**
   * Get the {@code maxTransmitters} property.
   * @see #maxTransmitters
   */
  public int getMaxTransmitters() { return getInt(maxTransmitters); }
  
  /**
   * Set the {@code maxTransmitters} property.
   * @see #maxTransmitters
   */
  public void setMaxTransmitters(int v) { setInt(maxTransmitters, v, null); }

////////////////////////////////////////////////////////////////
// Action "sendMessage"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code sendMessage} action.
   * @see #sendMessage(BMidiMessage parameter)
   */
  public static final Action sendMessage = newAction(0, new BMidiMessage(new byte[] { (byte) 0xfe }), null);
  
  /**
   * Invoke the {@code sendMessage} action.
   * @see #sendMessage
   */
  public void sendMessage(BMidiMessage parameter) { invoke(sendMessage, parameter, null); }

////////////////////////////////////////////////////////////////
// Topic "message"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code message} topic.
   * @see #fireMessage
   */
  public static final Topic message = newTopic(0, null);
  
  /**
   * Fire an event for the {@code message} topic.
   * @see #message
   */
  public void fireMessage(BMidiMessage event) { fire(message, event, null); }

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BMidiDevice.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/
  
  
////////////////////////////////////////////////////////////////
// Overrides
////////////////////////////////////////////////////////////////
  
  /**
   * Returns the network type that the device runs on.
   * @return Type object representing the network
   */
  public Type getNetworkType() { return BMidiNetwork.TYPE; }  
  
  
  /**
   * Override started 
   */
  public void started()
    throws Exception
  {
    super.started();
    
    // register device with poll scheduler 
    getMidiNetwork().getPollScheduler().subscribe(this);
    device = getMidiNetwork().getMidiDevice(this);

    if (device == null || device.isOpen()) { return; }

    device.open();
    switch (getDeviceType()) {
      case RECEIVER:
        device.getTransmitter().setReceiver(this);
        break;
    }
  }
  
  /**
   * Override stopped 
   */
  public void stopped()
    throws Exception
  {
    // unregister device with poll scheduler 
    getMidiNetwork().getPollScheduler().unsubscribe(this);
    super.stopped();
    if(device !=null)
    {
      device.close();
    }
  }
  
  
////////////////////////////////////////////////////////////////
// Implementation
////////////////////////////////////////////////////////////////
  /**
   * 
   */
  public void doPing() 
  { 
    // TODO - add ping implementation
    // if()
      pingOk();
    // else
    //  pingFail("not receiving response from device ");
  }
  

////////////////////////////////////////////////////////////////
// Polling support
////////////////////////////////////////////////////////////////

  /**
   * The poll() callback method called from BPollScheduler
   * when it is time to poll this object.
   */
  public void doPoll()
  {
    // TODO add poll support
  }

  @Override
  public void send(MidiMessage msg, long timeStamp)
  {
    doSendMessage(new BMidiMessage(msg.getMessage()));
  }

  public void doSendMessage(BMidiMessage message) {
    switch (getDeviceType()) {
      // i am receiving data from an outboard device
      case RECEIVER:
        handleMidiMessage(message);
        break;
      // someone fired an action and wants to send data to the outboard device
      case TRANSMITTER:
        try
        {
          byte[] payload = message.getPayload();
          int firstByte = payload[0] & 0xFF;
          MidiMessage midiMessage;

          if (firstByte == 0xf0 || firstByte == 0xf7)
          {
            midiMessage = new SysexMessage(payload, payload.length);
          }
          else if (payload.length >= 3)
          {
            midiMessage = new ShortMessage(payload[0], payload[1], payload[2]);
          }
          else
          {
            midiMessage = new ShortMessage(firstByte);
          }
          device.getReceiver().send(midiMessage, -1);
        }
        catch (InvalidMidiDataException|MidiUnavailableException e)
        {
          throw new ActionInvokeException(e);
        }
    }
  }


  private void handleMidiMessage(BMidiMessage message) {
    if (message.getPayload()[0] != (byte) 0xFE) { //don't print activesense spam
      System.out.println(message);
    }

    BMidiProxyExt pExt = null;
    switch (message.getStatusType()) {
      case CONTROL_CHANGE:
        pExt = getControlChange(message); break;
      case NOTE_OFF:
      case NOTE_ON:
        pExt = getNote(message); break;
      case PITCH_BEND:
        pExt = getPitchWheel(message); break;
    }

    if (pExt != null) {
      fireMessage(message);
      pExt.updateValue(message);
    }
  }

  private BMidiControlChangeProxyExt getControlChange(BMidiMessage message)
  {
    //Try to use cached value,
    BMidiControlChangeProxyExt pExt;
    byte controllerNumber = message.getPayload()[1];
    if((pExt = controlHandlers[controllerNumber]) != null)
    {
      return pExt;
    }else
    {
      //otherwise try to look up
      for(BControlPoint point : getPoints().getPoints())
      {
        BAbstractProxyExt aPext = point.getProxyExt();
        if(aPext instanceof BMidiControlChangeProxyExt)
        {
          pExt = (BMidiControlChangeProxyExt) aPext;
          if(pExt.getControllerNumber() == controllerNumber)
          {
            controlHandlers[controllerNumber] = pExt;
            return pExt;
          }
        }
      }
      //meh, make a new one.
      BControlPoint point = new BNumericPoint();
      pExt = new BMidiControlChangeProxyExt();
      pExt.setChannel(message.getChannel());
      pExt.setControllerNumber(controllerNumber);
      point.setProxyExt(pExt);
      getPoints().add("Controller" + controllerNumber, point);
      controlHandlers[controllerNumber] = pExt;
      return pExt;
    }
  }

  private BMidiPitchWheelProxyExt getPitchWheel(BMidiMessage message) {
    if (getPoints().getSlot("PitchWheel") == null) {
      BControlPoint point = new BNumericPoint();
      BMidiPitchWheelProxyExt pExt = new BMidiPitchWheelProxyExt();
      pExt.setChannel(message.getChannel());
      point.setProxyExt(pExt);
      getPoints().add("PitchWheel", point);
    }
    return (BMidiPitchWheelProxyExt)
      ((BControlPoint) getPoints().get("PitchWheel")).getProxyExt();
  }

  private BMidiNoteProxyExt getNote(BMidiMessage message)
  {
    //Try to use cached value,
    BMidiNoteProxyExt pExt;
    int noteNumber = message.getPayload()[1];
    if((pExt = noteHandlers[noteNumber]) != null)
    {
      return pExt;
    }else
    {
      //otherwise try to look up
      for(BControlPoint point : getPoints().getPoints())
      {
        BAbstractProxyExt aPext = point.getProxyExt();
        if(aPext instanceof BMidiNoteProxyExt)
        {
          pExt = (BMidiNoteProxyExt) aPext;
          if(pExt.getNoteNumber() == noteNumber)
          {
            noteHandlers[noteNumber] = pExt;
            return pExt;
          }
        }
      }

      //meh, make a new one.
      BControlPoint point = new BBooleanPoint();
      pExt = new BMidiNoteProxyExt();
      pExt.setChannel(message.getChannel());
      pExt.setNoteNumber(noteNumber);
      point.setProxyExt(pExt);
      getPoints().add("Note" + noteNumber, point);
      noteHandlers[noteNumber] = pExt;

      getMidiNetwork().newChannel(this, pExt);
      return pExt;
    }
  }

  protected void newChannel(BMidiDevice device, BMidiProxyExt source)
  {
    synchronized (shortMessage)
    {
      if(getPoints().get("Button" + source.getChannel()) == null)
      {
        BControlPoint point = new BEnumWritable();
        BApcMiniButtonProxyExt pExt = new BApcMiniButtonProxyExt();
        pExt.setChannel(source.getChannel());
        point.setProxyExt(pExt);
        getPoints().add("Button" + source.getChannel(), point);
      }
    }
  }


////////////////////////////////////////////////////////////////
// Utilities
////////////////////////////////////////////////////////////////

  private DeviceType getDeviceType() {
    if (device == null) { return DeviceType.NONE; }
    if (device.getMaxReceivers() != 0) { return DeviceType.TRANSMITTER; }
    return DeviceType.RECEIVER;
  }

  /**
   * Get the network cast to a BMidiNetwork.
   * @return network as a BMidiNetwork.
   */
  public final BMidiNetwork getMidiNetwork()
  {
    return (BMidiNetwork)getNetwork();
  }

  public void removePoint(BMidiProxyExt pExt)
  {
    int channel = pExt.getChannel();
    if(pExt instanceof BMidiControlChangeProxyExt)
    {
      controlHandlers[channel] = null;
    }else if(pExt instanceof BMidiNoteProxyExt)
    {
      noteHandlers[channel] = null;
    }
  }



  private BMidiControlChangeProxyExt[] controlHandlers = new BMidiControlChangeProxyExt[255];
  private BMidiNoteProxyExt[] noteHandlers = new BMidiNoteProxyExt[255];
  private final ShortMessage shortMessage = new ShortMessage();
  private MidiDevice device;

  public MidiDevice getDevice()
  {
    return device;
  }

  @Override
  public void close()
  {
    device.close();
  }

  public static final int MESSAGE_TYPE = 0;
  public static final int CHANNEL = 1;
  public static final int DATA = 2;

  /** What kind of MIDI device am I? */
  private enum DeviceType {
    /** I am receiving MIDI events from an external device like a keyboard. */
    RECEIVER,
    /** I am sending MIDI events to an external device like a synthesizer. */
    TRANSMITTER,
    /** I am disabled or otherwise incapable of sending or transmitting. */
    NONE
  }
}
