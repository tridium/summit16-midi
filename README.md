# Midi Driver and UX modules

This project is intended to demonstrate the various technologies described
during the 2016 Niagara Summit Developer Bootcamp, including the Common Object
Model, `ndriver`, BajaScript, `bajaux`, Gradle, D3, and more.

It provides the ability to configure musical synthesizer voices using Niagara
components and views, and then to play that synthesizer in the browser.

## Getting Started

`midi-se` and `midi-ux` are standard Niagara modules built with Gradle. Check
out the [Building Niagara 4 repository](https://github.com/tridium/summit16-building-niagara4)
for more information on how modules are built.

Once the module is built, start up a station and use the `midi` palette to add
a `Synthesizer` to your station. Under the `Synthesizer` will be a folder called
`Presets`. Drag as many presets as you like from the `midi` palette into the
`Presets` folder.

Once that is done, navigate to the `Synthesizer` in the browser as a user with
the `HTML5HxProfile` configured. Use the dropdown at the top to select a preset
to play, and press keys on the keyboard to trigger notes.

## Using external MIDI devices

If you have an external MIDI device like a keyboard, you can use that as well
to play your `Synthesizer`. (Currently this is supported only on Supervisors,
not JACEs.)

On your station, navigate to the `Devices` container and add a `MidiNetwork`
from the `midi` palette. Open up the `MidiNetwork` and click the `Discover`
button to discover all available MIDI devices on your system. Select the device
that you want to play, and drag it to the bottom pane to add it to your station.
Now, when viewing your `Synthesizer`, the dropdown in the top left will contain
your MIDI device.

## On response time

BOX has a built-in safety delay of around one second when flushing component
events down to the station. This prevents a busy JACE from overloading with
events, but also prevents response time from being truly instantaneous as you
would need for a musical instrument. For the demo, we dialed that delay down to
zero to get the real-time response to work - safe for a Supervisor, but with
potential performance concerns were we to do this on a JACE. We are
investigating the possibility/safety of opening up this capability in Niagara
4.3. In the meantime, to get the best possible response times, use of the
keyboard is suggested.

## On the Launchpad Pro

This demo was put together with the Launchpad Pro in mind as a triggering
device. If you happen to have one, the LaunchpadProWidget will show your
keypresses as you play them, and the circle buttons down the right edge allow
you to select different presets to play.