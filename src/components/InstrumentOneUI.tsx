import { useState } from "react";
import InstrumentOne from "../library/InstrumentOne"
import VoiceOneOSC from "./instrumentModules/VoiceOneOSC";
import VoiceOneLFO from "./instrumentModules/VoiceOneLFO";
import VoiceOneAmpEnvelope from "./instrumentModules/VoiceOneAmpEnvelope";
import VoiceOneFilter from "./instrumentModules/VoiceOneFilter";

/**
 * User Interface for InstrumentOne
 */
export default function InstrumentOneUi() {
  const [instrumentParams, setInstrumentParams] = useState<InstrumentOneParams>({
    osc1Params: {
      type: "sine",
      frequency: 440,
      volume: 5,
    },
    osc2Params: {
      type: "square",
      frequency: 554.36,
      volume: 5,
    },
    osc1AmpEnvelope: [1, 0, 5, 1],
    osc2AmpEnvelope: [1, 0, 5, 1],
    osc1Filter: {
      type: "allpass",
      frequency: 400,
      q: 1,
    },
    osc2Filter: {
      type: "allpass",
      frequency: 554.36,
      q: 1,
    },
    osc1FilterEnvelope: [0, 0, 0, 0],
    osc2FilterEnvelope: [0, 0, 0, 0],
    LFOOne: {
      type: "sine",
      frequency: 11,
      amplitude: 50,
      target: "OSC 1 Frequency",
    },
    LFOTwo: {
      type: "square",
      frequency: 11,
      amplitude: 50,
      target: "OSC 2 Frequency"
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

  function disableEnvelope(LFOAssignments: ModulationTarget[], target: ModulationTarget) {
    let result = false;
    if (LFOAssignments.includes(target)) {
      result = true;
    }
    return result;
  }

  return (
    <div>
      <div className="instrument_voice">
        <VoiceOneOSC instrumentParams={instrumentParams.osc1Params} setInstrumentParams={setParams} title="OSC 1" />
        <VoiceOneAmpEnvelope
          instrumentParams={instrumentParams.osc1AmpEnvelope}
          setInstrumentParams={setParams}
          title="OSC 1 AMP ADSR"
          disabled={false}
        />
        <VoiceOneFilter instrumentParams={instrumentParams.osc1Filter} setInstrumentParams={setParams} title="OSC 1 FILTER" />
        <VoiceOneOSC instrumentParams={instrumentParams.osc2Params} setInstrumentParams={setParams} title="OSC 2" />
        <VoiceOneAmpEnvelope
          instrumentParams={instrumentParams.osc2AmpEnvelope}
          setInstrumentParams={setParams}
          title="OSC 2 AMP ADSR"
          disabled={false}
        />
        <VoiceOneFilter instrumentParams={instrumentParams.osc2Filter} setInstrumentParams={setParams} title="OSC 2 FILTER" />
      </div>
      <div className="instrument_voice">
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
        <VoiceOneAmpEnvelope
          instrumentParams={instrumentParams.osc1FilterEnvelope}
          setInstrumentParams={setParams}
          title="CUTOFF 1 ADSR"
          disabled={disableEnvelope([instrumentParams.LFOOne.target, instrumentParams.LFOTwo.target, instrumentParams.LFOThree.target], "Filter 1 Cutoff")}
        />
        <VoiceOneAmpEnvelope
          instrumentParams={instrumentParams.osc2FilterEnvelope}
          setInstrumentParams={setParams}
          title="CUTOFF 2 ADSR"
          disabled={disableEnvelope([instrumentParams.LFOOne.target, instrumentParams.LFOTwo.target, instrumentParams.LFOThree.target], "Filter 2 Cutoff")}
        />
      </div>
      <button type="button" onMouseDown={createPlayKill} onMouseUp={release}>Play</button>
      <button type="button" onClick={killOsc}>Stop</button>
    </div>
  );
}
