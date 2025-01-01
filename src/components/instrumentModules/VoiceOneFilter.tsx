export default function VoiceOneFilter({
  instrumentParams,
  setInstrumentParams,
}: {
  instrumentParams: InstrumentOneParams,
  setInstrumentParams: React.Dispatch<InstrumentOneParams>,
}) {
  const filterType: string[] = [
    "AllPass", "LowPass", "HighPass", "BandPass", "LowShelf", "HighShelf", "Peaking", "Notch",
  ];

  function handleFilterTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    let newInstrumentParams = { ...instrumentParams };
    newInstrumentParams.osc1Filter.type = event.target.value as BiquadFilterType;
    setInstrumentParams({ ...newInstrumentParams });
  }

  function handleFilterFrequencyChange(event: React.ChangeEvent<HTMLInputElement>) {
    let newInstrumentParams = { ...instrumentParams };
    newInstrumentParams.osc1Filter.frequency = Number(event.target.value);
    setInstrumentParams({ ...newInstrumentParams });
  }

  function resetFilterFrequency() {
    let newInstrumentParams = { ...instrumentParams };
    newInstrumentParams.osc1Filter.frequency = 2000;
    setInstrumentParams({ ...newInstrumentParams });
  }

  function handleQFactorChange(event: React.ChangeEvent<HTMLInputElement>) {
    let newInstrumentParams = { ...instrumentParams };
    newInstrumentParams.osc1Filter.q = Number(event.target.value);
    setInstrumentParams({ ...newInstrumentParams });
  }

  function resetQFactor() {
    let newInstrumentParams = { ...instrumentParams };
    newInstrumentParams.osc1Filter.q = 0;
    setInstrumentParams({ ...newInstrumentParams });
  }

  return (
    <div className="module_amp">
      <div className="module_header">
        <h3 className="module_title">OSC 1 FITLER</h3>
        <span className="module_info"></span>
      </div>
      <div style={{ marginTop: "0rem", display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: "100%" }}>
        <div>
          <h3 className="slider_label">Filter Type</h3>
          <select name="wave-shape" onChange={handleFilterTypeChange}>
            {filterType.map((type) => {
              return (
                <option value={type.toLowerCase()} key={`${type.toLowerCase()}wave-shape`}>{type}</option>
              );
            })}
          </select>
        </div>
        <div>
          <h3 className="slider_label" onDoubleClick={resetFilterFrequency}>Freq CutOff</h3>
          <input
            type="range"
            value={instrumentParams.osc1Filter.frequency}
            min="100"
            max="8000"
            onChange={handleFilterFrequencyChange}
          />
          <p className="slider_value">{instrumentParams.osc1Filter.frequency}</p>
        </div>
        <div>
          <h3 className="slider_label" onDoubleClick={resetQFactor}>Q Factor</h3>
          <input
            type="range"
            value={instrumentParams.osc1Filter.q}
            min="0"
            max="100"
            onChange={handleQFactorChange}
          />
          <p className="slider_value">{instrumentParams.osc1Filter.q}</p>
        </div>
      </div>
    </div>
  );
}
