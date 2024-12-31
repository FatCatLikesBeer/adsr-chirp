import { useState } from "react";
import AmpEnvelope from "./AmpEnvelope";
import InstrumentOne from "../library/InstrumentOne"

export default function InstrumentOneUi() {
  const [instrumentParams, setInstrumentParams] = useState<InstrumentOneParams>({ ampADSR: [1, 1, 1, 1] });
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
      <AmpEnvelope instrumentParams={instrumentParams} setInstrumentParams={setInstrumentParams} />
      <button type="button" onMouseDown={createPlayKill} onMouseUp={release}>Play</button>
      <button type="button" onClick={killOsc}>Stop</button>
    </div>
  );
}
