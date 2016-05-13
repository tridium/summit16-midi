package com.niagara.midi.learn;

import javax.baja.registry.TypeInfo;
import javax.baja.sys.*;
import javax.baja.nre.annotations.*;
import javax.sound.midi.MidiDevice;
import javax.sound.midi.MidiSystem;
import javax.sound.midi.MidiUnavailableException;

import com.tridium.ndriver.discover.BNDiscoveryLeaf;
import com.tridium.ndriver.util.SfUtil;
import com.niagara.midi.BMidiDevice;


/**
 * BMidiDeviceDiscoveryLeaf is container class for Device elements to display in 
 * Device discovery pane and pass to new Device callback.
 *
 * @author Joseph Chandler on 04-Apr-16
 */
@NiagaraType
@NiagaraProperty(name = "devName",    type = "String", defaultValue = "midiDevice", facets = {
  @Facet(name = SfUtil.KEY_MGR, value = SfUtil.MGR_EDIT)
})
@NiagaraProperty(name = "vendor", type = "String", defaultValue = "midiVendor", facets = {
  @Facet(name = SfUtil.KEY_MGR, value = SfUtil.MGR_EDIT)
})
@NiagaraProperty(name = "description",  type = "String", defaultValue = "midiDescription", facets = {
  @Facet(name = SfUtil.KEY_MGR, value = SfUtil.MGR_EDIT)
})
@NiagaraProperty(name = "version",     type = "String", defaultValue = "version", facets = {
  @Facet(name = SfUtil.KEY_MGR, value = SfUtil.MGR_EDIT)
})
@NiagaraProperty(name = "maxReceivers",     type = "int", defaultValue = "0", facets = {
  @Facet(name = SfUtil.KEY_MGR, value = SfUtil.MGR_EDIT)
})
@NiagaraProperty(name = "maxTransmitters",     type = "int", defaultValue = "0", facets = {
  @Facet(name = SfUtil.KEY_MGR, value = SfUtil.MGR_EDIT)
})

public class BMidiDeviceDiscoveryLeaf
    extends BNDiscoveryLeaf
{
/*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
/*@ $com.niagara.midi.learn.BMidiDeviceDiscoveryLeaf(1803135083)1.0$ @*/
/* Generated Mon Apr 04 23:27:39 EDT 2016 by Slot-o-Matic (c) Tridium, Inc. 2012 */

////////////////////////////////////////////////////////////////
// Property "devName"
////////////////////////////////////////////////////////////////
  
  /**
   * Slot for the {@code devName} property.
   * @see #getDevName
   * @see #setDevName
   */
  public static final Property devName = newProperty(0, "midiDevice", BFacets.make(SfUtil.KEY_MGR, SfUtil.MGR_EDIT));
  
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
  public static final Property vendor = newProperty(0, "midiVendor", BFacets.make(SfUtil.KEY_MGR, SfUtil.MGR_EDIT));
  
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
  public static final Property description = newProperty(0, "midiDescription", BFacets.make(SfUtil.KEY_MGR, SfUtil.MGR_EDIT));
  
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
  public static final Property version = newProperty(0, "version", BFacets.make(SfUtil.KEY_MGR, SfUtil.MGR_EDIT));
  
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
  public static final Property maxReceivers = newProperty(0, 0, BFacets.make(SfUtil.KEY_MGR, SfUtil.MGR_EDIT));
  
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
  public static final Property maxTransmitters = newProperty(0, 0, BFacets.make(SfUtil.KEY_MGR, SfUtil.MGR_EDIT));
  
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
// Type
////////////////////////////////////////////////////////////////
  
  @Override
  public Type getType() { return TYPE; }
  public static final Type TYPE = Sys.loadType(BMidiDeviceDiscoveryLeaf.class);

/*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/
  
  public BMidiDeviceDiscoveryLeaf() {}

  public BMidiDeviceDiscoveryLeaf(MidiDevice.Info info)
  {
    setDevName(info.getName());
    setVendor(info.getVendor());
    setDescription(info.getDescription());
    setVersion(info.getVersion());

    try
    {
      MidiDevice device = MidiSystem.getMidiDevice(info);
      setMaxReceivers(device.getMaxReceivers());
      setMaxTransmitters(device.getMaxTransmitters());
    }
    catch (MidiUnavailableException e)
    {
      e.printStackTrace();
    }
  }

  /* Called when adding new object based on this discovery leaf.   */
  public TypeInfo[] getValidDatabaseTypes()
  {
    return new TypeInfo[] { BMidiDevice.TYPE.getTypeInfo() };
  }
  
  /**
   * Override to specify the default name when adding this discovery object
   * to the station.
   */
  public String getDiscoveryName()
  {
    String name = getDevName();
    if(getMaxReceivers() > 0 || getMaxReceivers() < 0)
      name += "Rx";

    if(getMaxTransmitters() > 0 || getMaxTransmitters() < 0)
      name += "Tx";

    return name;
  }

  
  /* Called when adding new object based on this discovery leaf.   */
  public void updateTarget(BComponent target)
  {
    if(target instanceof BMidiDevice)
    {
      BMidiDevice dev = (BMidiDevice)target;

      dev.setDevName(getDevName());
      dev.setVendor(getVendor());
      dev.setDescription(getDescription());
      dev.setVersion(getVersion());
      dev.setMaxTransmitters(getMaxTransmitters());
      dev.setMaxReceivers(getMaxReceivers());
    }
  }
  
  /**
   * Return true if the specified component is an existing representation
   * of this discovery object. 
   */
  public boolean isExisting(BComponent target) 
  {
    if(target instanceof BMidiDevice)
    {
      BMidiDevice dev = (BMidiDevice)target;
      return dev.getDevName().equals(getDevName()) &&
             dev.getVendor().equals(getVendor()) &&
             dev.getDescription().equals(getDescription()) &&
             dev.getVersion().equals(getVersion()) &&
             dev.getMaxTransmitters() == getMaxTransmitters() &&
             dev.getMaxReceivers() == getMaxReceivers();
    }

    return false;
  }
}
