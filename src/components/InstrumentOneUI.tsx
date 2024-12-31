import { useState } from "react";
import AmpOneEnvelope from "./instrumentModules/AmpOneEnvelope";
import OSCOneLFO from "./instrumentModules/OSCOneLFO";
import OSCOneModule from "./instrumentModules/OSCOneModule";
import InstrumentOne from "../library/InstrumentOne"

export default function InstrumentOneUi() {
  const [instrumentParams, setInstrumentParams] = useState<InstrumentOneParams>({
    osc1Params: {
      type: "sine",
      frequency: 2000,
    },
    osc1LFO: {
      type: "sine",
      frequency: 11,
      amplitude: 50,
    },
    osc1AmpEnvelope: [1, 1, 1, 1],
  });
  const [instrument, setInstrument] = useState<InstrumentOne>();

  function createPlayKill() {
    instrument?.stop();
    setInstrument(new InstrumentOne({ instrumentParams }));
  }

  function killOsc() {
    instrument?.stop();
  }

  function release() {
    instrument?.release();
  }

  return (
    <div>
      <div className="instrument_voice">
        <OSCOneModule instrumentParams={instrumentParams} setInstrumentParams={setInstrumentParams} />
        <OSCOneLFO instrumentParams={instrumentParams} setInstrumentParams={setInstrumentParams} />
        <AmpOneEnvelope instrumentParams={instrumentParams} setInstrumentParams={setInstrumentParams} />
      </div>
      <button type="button" onMouseDown={createPlayKill} onMouseUp={release}>Play</button>
      <button type="button" onClick={killOsc}>Stop</button>
    </div>
  );
}
