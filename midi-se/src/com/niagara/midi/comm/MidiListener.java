package com.niagara.midi.comm;

import com.tridium.ndriver.comm.ICommListener;
import com.tridium.ndriver.comm.NMessage;
import com.tridium.ndriver.datatypes.BCommConfig;


/**
 * MidiListener processes unsolicited messages.
 *
 * @author   Joseph Chandler on 04-Apr-16
 *
 */
public class MidiListener
  implements ICommListener
{
  
  /** Constructor */
  public MidiListener(BCommConfig ccfg) {}

  /**
   * Customized to process the unsolicited message for this driver. <p>
   * @param nMsg message received from panel
   */
  public void receiveMessage(NMessage nMsg)
  {    
    // TODO
  }
  

}
