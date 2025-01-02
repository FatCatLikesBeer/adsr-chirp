import { useState } from "react";
import InstrumentOne from "../library/InstrumentOne"
import VoiceOneOSC from "./instrumentModules/VoiceOneOSC";
import VoiceOneLFO from "./instrumentModules/VoiceOneLFO";
import VoiceOneAmpEnvelope from "./instrumentModules/VoiceOneAmpEnvelope";
import VoiceOneFilter from "./instrumentModules/VoiceOneFilter";

export default function InstrumentOneUi() {
  const [instrumentParams, setInstrumentParams] = useState<InstrumentOneParams>({
    osc1Params: {
      type: "sine",
      frequency: 800,
    },
    osc1LFO: {
      type: "sine",
      frequency: 11,
      amplitude: 50,
    },
    osc1AmpEnvelope: [1, 0, 10, 1],
    osc1Filter: {
      type: "allpass",
      frequency: 400,
      q: 1,
    }
  });
  const [instrument, setInstrument] = useState<InstrumentOne>();

  function createPlayKill() {
    instrument?.stop();
    setInstrument(new InstrumentOne(instrumentParams));
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
        <VoiceOneOSC instrumentParams={instrumentParams} setInstrumentParams={setInstrumentParams} />
        <VoiceOneLFO instrumentParams={instrumentParams} setInstrumentParams={setInstrumentParams} />
        <VoiceOneAmpEnvelope instrumentParams={instrumentParams} setInstrumentParams={setInstrumentParams} />
        <VoiceOneFilter instrumentParams={instrumentParams} setInstrumentParams={setInstrumentParams} />
      </div>
      <button type="button" onMouseDown={createPlayKill} onMouseUp={release}>Play</button>
      <button type="button" onClick={killOsc}>Stop</button>
    </div>
  );
}
