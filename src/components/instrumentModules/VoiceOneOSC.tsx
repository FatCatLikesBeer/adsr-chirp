import { useState, useEffect, useRef } from "react";

export default function VoiceOneOSC({
  instrumentParams,
  setInstrumentParams,
  title,
}: {
  instrumentParams: oscParams;
  setInstrumentParams: (_value: any) => void;
  title: string;
}) {
  const [frequencyIsEditable, setFrequencyIsEditable] = useState(false);
  const frequencyElementRef = useRef<HTMLInputElement>(null);
  const waveTables: string[] = [
    "Sine",
    "Sawtooth",
    "Triangle",
    "Square",
  ];

  function handleWaveTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    instrumentParams.type = event.target.value as OscillatorType;
    setInstrumentParams({ ...instrumentParams });
  }

  function handleOSCFrequencyChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (Number(event.target.value)) {
      instrumentParams.frequency = Number(event.target.value);
      if ((instrumentParams.frequency > 6000)) {
        instrumentParams.frequency = 400;
      }
      if (instrumentParams.frequency < 0) {
        instrumentParams.frequency = 400;
      }
      setInstrumentParams({ ...instrumentParams });
    }
  }

  function handleOSCVolumeChange(event: React.ChangeEvent<HTMLInputElement>) {
    instrumentParams.volume = Number(event.target.value);
    setInstrumentParams({ ...instrumentParams });
  }

  function resetOSCFrequency() {
    instrumentParams.frequency = 2000;
    setInstrumentParams({ ...instrumentParams });
  }

  function resetOSCVolume() {
    instrumentParams.volume = 5;
    setInstrumentParams({ ...instrumentParams });
  }

  function makeFrequencyEditable() {
    setFrequencyIsEditable(true);
    frequencyElementRef.current?.focus();
  }

  function handleClickOutside(event: MouseEvent) {
    if (frequencyElementRef.current && !frequencyElementRef.current.contains(event.target as Node)) {
      setFrequencyIsEditable(((((((false)))))));
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, []);

  return (
    <div className="module_amp">
      <div className="module_header">
        <h3 className="module_title">{title}</h3>
        <span className="module_info"></span>
      </div>
      <div style={{ marginTop: "0rem", display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3 className="slider_label">Wave Shape</h3>
          <select name="wave-shape" onChange={handleWaveTypeChange} defaultValue={instrumentParams.type}>
            {waveTables.map((type) => {
              return (
                <option value={type.toLowerCase()} key={`${type.toLowerCase()}wave-shape`}>{type}</option>
              );
            })}
          </select>
        </div>
        <div>
          <h3 className="slider_label" onDoubleClick={resetOSCFrequency}>Frequency</h3>
          <input
            type="range"
            value={instrumentParams.frequency}
            min="100"
            max="6000"
            step="0.01"
            onChange={handleOSCFrequencyChange}
          />
          {frequencyIsEditable
            ?
            <input
              className="slider_value"
              ref={frequencyElementRef}
              value={instrumentParams.frequency}
              onChange={handleOSCFrequencyChange}
            />
            :
            <p className="slider_value" onDoubleClick={makeFrequencyEditable}>{instrumentParams.frequency}</p>
          }
        </div>
        <div>
          <h3 className="slider_label" onDoubleClick={resetOSCVolume}>Volume</h3>
          <input
            type="range"
            value={instrumentParams.volume}
            min="0"
            max="10"
            step="0.1"
            onChange={handleOSCVolumeChange}
          />
          <p className="slider_value">{instrumentParams.volume}</p>
        </div>
      </div>
    </div>
  );
}
