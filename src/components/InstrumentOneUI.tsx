import { useState } from "react";
import AmpEnvelope from "./AmpEnvelope";
import InstrumentOne from "../library/InstrumentOne"

export default function InstrumentOneUi() {
  const [disableButton, setDisableButton] = useState(false);
  const [instrumentParams, setInstrumentParams] = useState<InstrumentOneParams>({ ampADSR: [0, 0, 0, 0] });

  function createPlayKill() {
    setDisableButton(true);
    new InstrumentOne(instrumentParams, setDisableButton)
    console.log(instrumentParams);
  }

  return (
    <div>
      <AmpEnvelope instrumentParams={instrumentParams} setInstrumentParams={setInstrumentParams} />
      <button type="button" onClick={createPlayKill} disabled={disableButton}>Play</button>
    </div>
  )
}
