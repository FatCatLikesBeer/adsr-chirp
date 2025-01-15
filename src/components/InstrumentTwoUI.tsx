import { useEffect, useState } from "react";
import InstrumentTwo from '../library/InstrumentTwo';
import VoiceOneOSC from "./instrumentTwoModules/VoiceOneOSC";
import VoiceOneAmpEnvelope from "./instrumentTwoModules/VoiceOneAmpEnvelope.tsx";
import { InstrumentTwoParams } from "../t";
import Knob from "./instrumentTwoModules/Knob"; Knob

/**
 * User Interface for InstrumentOne
 */
export default function InstrumentTwoUi() {
  const [instrumentParams, setInstrumentParams] = useState<InstrumentTwoParams>({
    osc1Params: {
      type: "sine",
      frequency: 440,
      volume: 0.3,
    },
    osc2Params: {
      type: "triangle",
      frequency: 554.36,
      volume: 0.3,
    },
    osc1AmpEnvelope: [1, 1, 1, 1],
    osc2AmpEnvelope: [1, 1, 1, 1],
    osc1Filter: {
      type: "allpass",
      frequency: 500,
      q: 0,
    },
    osc2Filter: {
      type: "allpass",
      frequency: 500,
      q: 0,
    },
    osc1FilterEnvelope: [0, 0, 0, 0],
    osc2FilterEnvelope: [0, 0, 0, 0],
    LFOOne: {
      type: "sine",
      frequency: 2,
      amplitude: 1,
      target: "none",
    },
    LFOTwo: {
      type: "sine",
      frequency: 2,
      amplitude: 1,
      target: "none",
    },
    LFOThree: {
      type: "sine",
      frequency: 2,
      amplitude: 1,
      target: "none",
    },
  });
  const [instrument] = useState<InstrumentTwo>(new InstrumentTwo(instrumentParams));

  function createPlayKill() {
    instrument!.attack();
  }

  function release() {
    instrument!.synth.triggerRelease();
  }

  function setInstrumentValues(values: any): undefined {
    let newInstrumentParams = { ...instrumentParams, values }
    setInstrumentParams({ ...newInstrumentParams });
  }

  function setAmpOneEnvelope(newValues: number[]) {
    let newParams = { ...instrumentParams };
    newParams.osc1AmpEnvelope = newValues;
    setInstrumentParams(newParams);
  };

  useEffect(() => {
    const myComment = "<!-- InstrumentTwo -->\n<!-- Thank you for the dial saltofthemar https://marlotron.saltofthemar.ca/ -->";
    document.body.insertAdjacentHTML("beforeend", myComment);
  }, []);

  return (
    <div className="instrument">
      <VoiceOneOSC title="OSC 1" instrumentParams={instrumentParams.osc1Params} setInstrumentParams={setInstrumentValues} instrument={instrument} />
      <VoiceOneAmpEnvelope
        title="OSC 1 AMP ADSR"
        instrumentParams={instrumentParams.osc1AmpEnvelope}
        setInstrumentParams={setAmpOneEnvelope}
        disabled={false}
      />
      <button type="button" onMouseDown={createPlayKill} onMouseUp={release}>Play</button>
    </div>
  );
}
