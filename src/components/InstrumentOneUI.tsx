import { useState } from "react";
import AmpEnvelope from "./AmpEnvelope";
import OSCOneModule from "./instrumentModules/OSCOneModule";
import InstrumentOne from "../library/InstrumentOne"

export default function InstrumentOneUi() {
  const [instrumentParams, setInstrumentParams] = useState<InstrumentOneParams>({
    osc1Params: {
      type: "sine",
      frequency: 2000,
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
        <AmpEnvelope instrumentParams={instrumentParams} setInstrumentParams={setInstrumentParams} />
      </div>
      <button type="button" onMouseDown={createPlayKill} onMouseUp={release}>Play</button>
      <button type="button" onClick={killOsc}>Stop</button>
    </div>
  );
}
