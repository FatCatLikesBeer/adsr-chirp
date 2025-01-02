export default function VoiceOneLFO({
  instrumentParams,
  setInstrumentParams,
}: {
  instrumentParams: InstrumentOneParams,
  setInstrumentParams: React.Dispatch<InstrumentOneParams>,
}) {
  const waveTables: string[] = [
    "Sine",
    "Sawtooth",
    "Triangle",
    "Square",
  ];

  function handleLFOTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    let newInstrumentParams = { ...instrumentParams };
    newInstrumentParams.osc1LFO.type = event.target.value as OscillatorType;
    setInstrumentParams({ ...newInstrumentParams });
  }

  function handleLFOFrequencyChange(event: React.ChangeEvent<HTMLInputElement>) {
    let newInstrumentParams = { ...instrumentParams };
    newInstrumentParams.osc1LFO.frequency = Number(event.target.value);
    setInstrumentParams({ ...newInstrumentParams });
  }

  function resetLFOFrequency() {
    let newInstrumentParams = { ...instrumentParams };
    newInstrumentParams.osc1LFO.frequency = 11;
    setInstrumentParams({ ...newInstrumentParams });
  }

  function handleLFOAmplitudeChange(event: React.ChangeEvent<HTMLInputElement>) {
    let newInstrumentParams = { ...instrumentParams };
    instrumentParams.osc1LFO.amplitude = Number(event.target.value);
    setInstrumentParams({ ...newInstrumentParams });
  }

  function resetLFOAmplitude() {
    let newInstrumentParams = { ...instrumentParams };
    newInstrumentParams.osc1LFO.amplitude = 50;
    setInstrumentParams({ ...newInstrumentParams });
  }

  return (
    <div className="module_amp">
      <div className="module_header">
        <h3 className="module_title">OSC 1 LFO</h3>
        <span className="module_info"></span>
      </div>
      <div style={{ marginTop: "0rem", display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: "100%" }}>
        <div>
          <h3 className="slider_label">LFO Shape</h3>
          <select name="lfo-shape" onChange={handleLFOTypeChange}>
            {waveTables.map((type) => {
              return (
                <option value={type.toLowerCase()} key={`${type.toLowerCase()}wave-shape`}>{type}</option>
              );
            })}
          </select>
        </div>
        <div>
          <h3 className="slider_label" onDoubleClick={resetLFOFrequency}>Frequency</h3>
          <input
            type="range"
            value={instrumentParams.osc1LFO.frequency}
            min="0"
            max="50"
            step="0.1"
            onChange={handleLFOFrequencyChange}
          />
          <p className="slider_value">{instrumentParams.osc1LFO.frequency.toFixed(2)}</p>
        </div>
        <div>
          <h3 className="slider_label" onDoubleClick={resetLFOAmplitude}>Intensity</h3>
          <input
            type="range"
            value={instrumentParams.osc1LFO.amplitude}
            min="0"
            max="400"
            onChange={handleLFOAmplitudeChange}
          />
          <p className="slider_value">{instrumentParams.osc1LFO.amplitude}</p>
        </div>
      </div>
    </div>
  );
}
