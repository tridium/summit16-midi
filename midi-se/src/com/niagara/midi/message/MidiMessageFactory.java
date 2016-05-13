package com.niagara.midi.message;

import com.tridium.ndriver.comm.*;


/**
 * MidiMessageFactory implementation of IMessageFactory.
 *
 * @author   Joseph Chandler on 04-Apr-16
 */
public class MidiMessageFactory
  implements IMessageFactory
{
  
  public MidiMessageFactory() {}
  
  public NMessage makeMessage(LinkMessage lm) 
      throws Exception
  {
    //
    // TODO - convert linkMessage driver specific NMessage
    return null;
  }

}
