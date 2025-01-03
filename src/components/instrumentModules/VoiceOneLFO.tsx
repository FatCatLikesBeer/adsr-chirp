import { useEffect, useState } from "react";

export default function VoiceOneLFO({
  LFOValues,
  setInstrumentParams,
  module_title,
  siblingTargets,
}: {
  LFOValues: InstrumentOneParams["LFOOne"];
  setInstrumentParams: (value: any) => void;
  module_title: string;
  siblingTargets: [ModulationTarget, ModulationTarget];
}) {
  const [intensityCeiling, setIntensityCeiling] = useState(400);
  const waveTables: string[] = [
    "Sine",
    "Sawtooth",
    "Triangle",
    "Square",
  ];

  const modTargets: ModulationTarget[] = [
    "OSC 1 Frequency", "OSC 1 Amplitude",
    "OSC 2 Frequency", "OSC 2 Amplitude",
    "Filter 1 Cutoff", "Filter 1 Q",
    "Filter 2 Cutoff", "Filter 2 Q", "none"
  ];

  function resetLFOFrequency() {
    LFOValues.frequency = 11;
    setInstrumentParams({ ...LFOValues });
  }

  function resetLFOAmplitude() {
    if (LFOValues.target.includes("Amplitude")) {
      LFOValues.amplitude = 5;
    } else {
      LFOValues.amplitude = 50;
    }
    setInstrumentParams({ ...LFOValues });
  }

  function handleLFOTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    LFOValues.type = event.target.value as OscillatorType;
    setInstrumentParams({ ...LFOValues });
  }

  function handleLFOTargetChange(event: React.ChangeEvent<HTMLSelectElement>) {
    LFOValues.target = event.target.value as ModulationTarget;
    setIntensity(LFOValues, setIntensityCeiling);
    setInstrumentParams({ ...LFOValues });
  }

  function handleLFOFrequencyChange(event: React.ChangeEvent<HTMLInputElement>) {
    LFOValues.frequency = Number(event.target.value);
    setInstrumentParams({ ...LFOValues });
  }

  function handleLFOAmplitudeChange(event: React.ChangeEvent<HTMLInputElement>) {
    LFOValues.amplitude = Number(event.target.value);
    setInstrumentParams({ ...LFOValues });
  }

  useEffect(() => {
    setIntensity(LFOValues, setIntensityCeiling);
  }, []);

  return (
    <div className="module_amp module_LFO">
      <div className="module_header">
        <h3 className="module_title">{module_title}</h3>
        <span className="module_info"></span>
      </div>
      <div>
        <h3 className="slider_label">Shape</h3>
        <select name="lfo-shape" onChange={handleLFOTypeChange}>
          {waveTables.map((type) => {
            return (
              <option value={type.toLowerCase()} key={`${type.toLowerCase()}wave-shape`}>{type}</option>
            );
          })}
        </select>
      </div>
      <div>
        <h3 className="slider_label">Target</h3>
        <select name="lfo-shape" onChange={handleLFOTargetChange} defaultValue={LFOValues.target}>
          {modTargets.map((target) => {
            let disabled = siblingTargets.includes(target);
            // let selected = LFOValues.target === target;
            return (
              <option value={target} key={`${target.toLowerCase()}wave-shape`} disabled={disabled}>{target}</option>
            );
          })}
        </select>
      </div>
      <div>
        <h3 className="slider_label" onDoubleClick={resetLFOFrequency}>Frequency</h3>
        <input
          type="range"
          value={LFOValues.frequency}
          min="0"
          max="20"
          step="0.1"
          onChange={handleLFOFrequencyChange}
        />
        <p className="slider_value">{LFOValues.frequency.toFixed(2)}</p>
      </div>
      <div>
        <h3 className="slider_label" onDoubleClick={resetLFOAmplitude}>Intensity</h3>
        <input
          type="range"
          value={LFOValues.amplitude}
          min="0"
          max={intensityCeiling}
          onChange={handleLFOAmplitudeChange}
        />
        <p className="slider_value">{LFOValues.amplitude}</p>
      </div>
    </div>
  );
}

function setIntensity(LFOValues: InstrumentOneParams["LFOOne"], setIntensityCeiling: React.Dispatch<number>) {
  let ceiling: number = 400;
  switch (LFOValues.target) {
    case "OSC 1 Frequency":
      ceiling = 400;
      LFOValues.amplitude = 50;
      break;
    case "OSC 2 Frequency":
      LFOValues.amplitude = 50;
      ceiling = 400;
      break;
    case "OSC 1 Amplitude":
      LFOValues.amplitude = 5;
      ceiling = 10;
      break;
    case "OSC 2 Amplitude":
      LFOValues.amplitude = 5;
      ceiling = 10;
      break;
    case "Filter 1 Cutoff":
      LFOValues.amplitude = 5;
      ceiling = 10;
      break;
    case "Filter 1 Q":
      LFOValues.amplitude = 5;
      ceiling = 10;
      break;
    case "Filter 2 Cutoff":
      LFOValues.amplitude = 5;
      ceiling = 10;
      break;
    case "Filter 2 Q":
      LFOValues.amplitude = 5;
      ceiling = 10;
      break;
    case "none":
      LFOValues.amplitude = 5;
      ceiling = 10;
      break;
    default:
      break;
  }
  setIntensityCeiling(ceiling);
}
