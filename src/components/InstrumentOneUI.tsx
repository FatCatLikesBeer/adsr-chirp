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

  return (
    <div>
      <AmpEnvelope instrumentParams={instrumentParams} setInstrumentParams={setInstrumentParams} />
      <button type="button" onClick={createPlayKill} disabled={disableButton}>Play</button>
      <button type="button" onClick={() => { instrument?.stop() }} disabled={disableButton}>Stop</button>
    </div>
  )
}
