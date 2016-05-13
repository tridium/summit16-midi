package com.niagara.midi;

import java.util.Arrays;
import javax.baja.driver.BDevice;
import javax.baja.naming.BOrd;
import javax.baja.sys.*;
import javax.baja.util.Lexicon;
import javax.baja.nre.annotations.*;
import javax.sound.midi.MidiDevice;
import javax.sound.midi.MidiSystem;
import javax.sound.midi.MidiUnavailableException;

import com.tridium.ndriver.BNNetwork;
import com.tridium.ndriver.discover.*;
import com.tridium.ndriver.poll.*;
import com.niagara.midi.learn.BMidiDeviceDiscoveryLeaf;
import com.niagara.midi.learn.BMidiDeviceDiscoveryPreferences;
import com.niagara.midi.point.BMidiProxyExt;


/**
 *  BMidiNetwork models a network of devices
 *
 *  @author   Joseph Chandler on 04-Apr-16
 */
@NiagaraType
@NiagaraProperty(name = "pollScheduler", type = "BNPollScheduler",  defaultValue = "new BNPollScheduler()")
@NiagaraProperty(name = "discoveryPreferences", type = "BNDiscoveryPreferences",  defaultValue = "new BMidiDeviceDiscoveryPreferences()", flags = Flags.HIDDEN)
@NiagaraAction(name="submitDiscoveryJob", defaultValue = "new BMidiDeviceDiscoveryPreferences()",
                  parameterType = "BNDiscoveryPreferences", returnType = "BOrd", flags = Flags.HIDDEN)
public class BMidiNetwork
  extends BNNetwork
  implements BINDiscoveryHost
{



/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.BMidiNetwork(3141990379)1.0$ @*/
/* Generated Fri Apr 08 14:24:44 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */

////////////////////////////////////////////////////////////////
// Property "pollScheduler"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code pollScheduler} property.
   * @see #getPollScheduler
   * @see #setPollScheduler
   */
  public static final Property pollScheduler = newProperty(0, new BNPollScheduler(), null);
  
  /**
   * Get the {@code pollScheduler} property.
   * @see #pollScheduler
   */
  public BNPollScheduler getPollScheduler() { return (BNPollScheduler)get(pollScheduler); }
  
  /**
   * Set the {@code pollScheduler} property.
   * @see #pollScheduler
   */
  public void setPollScheduler(BNPollScheduler v) { set(pollScheduler, v, null); }

////////////////////////////////////////////////////////////////
// Property "discoveryPreferences"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code discoveryPreferences} property.
   * @see #getDiscoveryPreferences
   * @see #setDiscoveryPreferences
   */
  public static final Property discoveryPreferences = newProperty(Flags.HIDDEN, new BMidiDeviceDiscoveryPreferences(), null);
  
  /**
   * Get the {@code discoveryPreferences} property.
   * @see #discoveryPreferences
   */
  public BNDiscoveryPreferences getDiscoveryPreferences() { return (BNDiscoveryPreferences)get(discoveryPreferences); }
  
  /**
   * Set the {@code discoveryPreferences} property.
   * @see #discoveryPreferences
   */
  public void setDiscoveryPreferences(BNDiscoveryPreferences v) { set(discoveryPreferences, v, null); }

////////////////////////////////////////////////////////////////
// Action "submitDiscoveryJob"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code submitDiscoveryJob} action.
   * @see #submitDiscoveryJob(BNDiscoveryPreferences parameter)
   */
  public static final Action submitDiscoveryJob = newAction(Flags.HIDDEN, new BMidiDeviceDiscoveryPreferences(), null);
  
  /**
   * Invoke the {@code submitDiscoveryJob} action.
   * @see #submitDiscoveryJob
   */
  public BOrd submitDiscoveryJob(BNDiscoveryPreferences parameter) { return (BOrd)invoke(submitDiscoveryJob, parameter, null); }

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BMidiNetwork.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/
  
  @Override
  public void started()
      throws Exception
  {
    super.started();
  }

  /** Specify name for network resources. */
  public String getNetworkName() { return "MidiNetwork"; }

  /** return device folder type  */
  @Override
  public Type getDeviceFolderType()
  {
    return BMidiDeviceFolder.TYPE;
  }

  /** return device type */
  @Override
  public Type getDeviceType()
  {
    return BMidiDevice.TYPE;
  }

  @Override
  public void changed(Property p, Context cx)
  {
    super.changed(p, cx);
    if(!isRunning()) return;

    if(p == status)
    {
      // Give any comms opportunity to respond to status changes
  
    }
  }
  
////////////////////////////////////////////////////////////////
//BINDiscoveryHost
////////////////////////////////////////////////////////////////

  public BINDiscoveryObject[] getDiscoveryObjects(BNDiscoveryPreferences prefs) 
     throws Exception
  {
    return Arrays.stream(MidiSystem.getMidiDeviceInfo())
      .map(BMidiDeviceDiscoveryLeaf::new)
      .toArray(BINDiscoveryObject[]::new);
  }
  
  public BOrd doSubmitDiscoveryJob(BNDiscoveryPreferences preferences)
  {
    // Saves the most recent device discovery parameters
    setDiscoveryPreferences((BMidiDeviceDiscoveryPreferences)preferences.newCopy()); 
    // Instantiates an instance of BNDiscoveryJob
    BNDiscoveryJob job = new BNDiscoveryJob(this);
    // Passes the discovery parameters to the job
    job.setDiscoveryPreferences(preferences);
    // Submits the job and returns Ord 
    return job.submit(null);
  }

  protected MidiDevice getMidiDevice(BMidiDevice bMidiDevice)
    throws MidiUnavailableException
  {
    for(MidiDevice.Info info : MidiSystem.getMidiDeviceInfo())
    {
      if(info.getName().equals(bMidiDevice.getDevName()))
      {
        MidiDevice device = MidiSystem.getMidiDevice(info);
        if(device.getMaxTransmitters() == bMidiDevice.getMaxTransmitters() &&
           device.getMaxReceivers()    == bMidiDevice.getMaxReceivers())
        {
          return device;
        }
      }
    }
    return null;
  }

  protected void newChannel(BMidiDevice device, BMidiProxyExt source)
  {
    BDevice[] devices = getDevices();
    for(BDevice dev : devices)
    {
      if(dev instanceof BMidiDevice)
      {
        BMidiDevice midiDevice = (BMidiDevice) dev;
        if(midiDevice != device && midiDevice.getDevName().equals(device.getDevName()))
        {
          midiDevice.newChannel(device, source);
        }
      }
    }
  }

////////////////////////////////////////////////////////////////
//Utilities
////////////////////////////////////////////////////////////////

  public static Lexicon LEX = Lexicon.make(BMidiNetwork.class);

}
