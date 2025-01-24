import { useEffect, useState, useRef } from "react";
import InstrumentTwo from '../library/InstrumentTwo';
import VoiceOneOSC from "./instrumentTwoModules/VoiceOneOSC";
import VoiceOneAmpEnvelope from "./instrumentTwoModules/VoiceOneAmpEnvelope.tsx";
import Knob from "./instrumentTwoModules/Knob"; Knob

import { InstrumentTwoParams } from "../t";
import { NonCustomOscillatorType } from "tone/build/esm/source/oscillator/OscillatorInterface";

/**
 * User Interface for InstrumentTwo
 */
export default function InstrumentTwoUi() {
  const playRef = useRef<HTMLButtonElement>(null);
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
    osc1AmpEnvelope: [3, 2, 2, 4],
    osc2AmpEnvelope: [3, 2, 2, 4],
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
      type: "square",
      frequency: 2,
      amplitude: 1,
      target: "none",
    },
    LFOThree: {
      type: "triangle",
      frequency: 2,
      amplitude: 1,
      target: "none",
    },
    LFOFour: {
      type: "sine3",
      frequency: 2,
      amplitude: 1,
      target: "none",
    },
  });
  const instrumentParamRef = useRef<InstrumentTwoParams>(instrumentParams);
  const [instrument, setInstrument] = useState<InstrumentTwo>(new InstrumentTwo(instrumentParams));
  const instrumentRef = useRef<InstrumentTwo>(instrument);

  // Update refs when instrument params change
  useEffect(() => {
    instrumentParamRef.current = instrumentParams;
    instrumentRef.current = instrument;
  }, [instrumentParams]);

  function createPlayKill() {
    if (instrumentParamRef.current && instrumentRef.current) {
      const newInstrument = new InstrumentTwo(instrumentParamRef.current);
      setInstrument(newInstrument);
      instrumentRef.current.attack();
    }
  }

  function release() {
    if (instrumentRef.current) {
      instrumentRef.current.release();
    }
  }

  function setInstrumentValues(nestedValues: any): undefined {
    let newInstrumentParams = { ...instrumentParams, nestedValues }
    setInstrumentParams(newInstrumentParams);
  }

  function setAmpOneEnvelope(newValues: number[]) {
    let newParams = { ...instrumentParams };
    newParams.osc1AmpEnvelope = newValues;
    setInstrumentParams(newParams);
  };

  function handleOsc1WaveTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const waveType = event.target.value as NonCustomOscillatorType;
    let newInstrumentParams = { ...instrumentParams };
    newInstrumentParams.osc1Params.type = waveType;
    setInstrumentParams(newInstrumentParams);
  }

  useEffect(() => {
    const playButton = playRef.current;
    playButton?.addEventListener('mousedown', createPlayKill);
    window.document.addEventListener('mouseup', release);
    return (
      () => {
        playButton?.removeEventListener('mousedown', createPlayKill);
        window.document.removeEventListener('mouseup', release);
      }
    );
  }, []);

  useEffect(() => {
    instrument.routeLFO(instrument.LFO1, instrumentParams.LFOOne);
  }, []);

  return (
    <div className="instrument">
      <div className="instrument_voice">
        <VoiceOneOSC
          title="OSC 1"
          waveTypeCallBack={handleOsc1WaveTypeChange}
          instrumentParams={instrumentParams.osc1Params}
          setInstrumentParams={setInstrumentValues}
        />
        <VoiceOneAmpEnvelope
          title="OSC 1 AMP ADSR"
          instrumentParams={instrumentParams.osc1AmpEnvelope}
          setInstrumentParams={setAmpOneEnvelope}
          disabled={false}
        />
      </div>
      <button type="button" ref={playRef}>Play</button>
    </div>
  );
}
