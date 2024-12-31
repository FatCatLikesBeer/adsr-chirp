export default function OSCOneModule({
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

  function handleWaveTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    let newInstrumentParams = { ...instrumentParams };
    newInstrumentParams.osc1Params.type = event.target.value as OscillatorType;
    setInstrumentParams({ ...newInstrumentParams });
  }

  function handleFrequencyChange(event: React.ChangeEvent<HTMLInputElement>) {
    let newInstrumentParams = { ...instrumentParams };
    newInstrumentParams.osc1Params.frequency = Number(event.target.value);
    setInstrumentParams({ ...newInstrumentParams });
  }

  function resetFrequency() {
    let newInstrumentParams = { ...instrumentParams };
    newInstrumentParams.osc1Params.frequency = 440;
    setInstrumentParams({ ...newInstrumentParams });
  }

  return (
    <div className="module_amp">
      <div className="module_header">
        <h3 className="module_title">OSC 1 PARAMS</h3>
        <span className="module_info"></span>
      </div>
      <div style={{ marginTop: "0rem", display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: "100%" }}>
        <div>
          <h3 className="slider_label">Wave Shape</h3>
          <select name="wave-shape" onChange={handleWaveTypeChange}>
            {waveTables.map((type) => {
              return (
                <option value={type.toLowerCase()} key={`${type.toLowerCase()}wave-shape`}>{type}</option>
              );
            })}
          </select>
        </div>
        <div>
          <h3 className="slider_label" onDoubleClick={resetFrequency}>Frequency</h3>
          <input
            type="range"
            value={instrumentParams.osc1Params.frequency}
            min="100"
            max="8000"
            onChange={handleFrequencyChange}
          />
          <p className="slider_value">{instrumentParams.osc1Params.frequency.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
