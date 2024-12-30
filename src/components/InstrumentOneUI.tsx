import { useState } from "react";
import AmpEnvelope from "./AmpEnvelope";
import InstrumentOne from "../library/InstrumentOne"

export default function InstrumentOneUi() {
  const [disableButton, setDisableButton] = useState(false);
  const [instrumentParams, setInstrumentParams] = useState<InstrumentOneParams>({ ampADSR: [0, 0, 0, 0] });
  const [instrument, setInstrument] = useState<InstrumentOne>();

  function createPlayKill() {
    instrument?.stop();
    setInstrument(new InstrumentOne({ instrumentParams, setDisableButton }));
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
      <button type="button" onMouseDown={createPlayKill} onMouseUp={release} disabled={disableButton}>Play</button>
      <button type="button" onClick={killOsc} disabled={disableButton}>Stop</button>
    </div>
  );
}
