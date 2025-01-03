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
      frequency: 440,
    },
    osc1AmpEnvelope: [1, 0, 10, 1],
    osc1Filter: {
      type: "allpass",
      frequency: 400,
      q: 1,
    },
    osc2Params: {
      type: "square",
      frequency: 554.36,
    },
    osc2AmpEnvelope: [1, 0, 10, 1],
    osc2Filter: {
      type: "allpass",
      frequency: 400,
      q: 1,
    },
    LFOOne: {
      type: "sine",
      frequency: 11,
      amplitude: 50,
      target: "OSC 1 Frequency",
    },
    LFOTwo: {
      type: "sine",
      frequency: 11,
      amplitude: 50,
      target: "OSC 2 Amplitude"
    },
    LFOThree: {
      type: "sine",
      frequency: 11,
      amplitude: 50,
      target: "Filter 1 Cutoff",
    },
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

  function setParams(values: any) {
    let newInstrumentParams = { ...instrumentParams, values }
    setInstrumentParams(newInstrumentParams);
  }

  return (
    <div>
      <div className="instrument_voice">
        <VoiceOneOSC instrumentParams={instrumentParams} setInstrumentParams={setInstrumentParams} />
        <VoiceOneAmpEnvelope instrumentParams={instrumentParams} setInstrumentParams={setInstrumentParams} />
        <VoiceOneFilter instrumentParams={instrumentParams} setInstrumentParams={setInstrumentParams} />
      </div>
      <div className="instrument_voice" style={{ flexDirection: "column" }}>
        <VoiceOneLFO
          module_title="LFO 1"
          LFOValues={instrumentParams.LFOOne}
          setInstrumentParams={setParams}
          siblingTargets={[instrumentParams.LFOTwo.target, instrumentParams.LFOThree.target]}
        />
        <VoiceOneLFO
          module_title="LFO 2"
          LFOValues={instrumentParams.LFOTwo}
          setInstrumentParams={setParams}
          siblingTargets={[instrumentParams.LFOOne.target, instrumentParams.LFOThree.target]}
        />
        <VoiceOneLFO
          module_title="LFO 3"
          LFOValues={instrumentParams.LFOThree}
          setInstrumentParams={setParams}
          siblingTargets={[instrumentParams.LFOTwo.target, instrumentParams.LFOOne.target]}
        />
      </div>
      <button type="button" onMouseDown={createPlayKill} onMouseUp={release}>Play</button>
      <button type="button" onClick={killOsc}>Stop</button>
    </div>
  );
}
