export default function VoiceOneFilter({
  instrumentParams,
  setInstrumentParams,
  title,
}: {
  instrumentParams: oscFilter;
  setInstrumentParams: (_value: any) => void;
  title: string;
}) {
  const filterType: string[] = [
    "AllPass", "LowPass", "HighPass", "BandPass", "LowShelf", "HighShelf", "Peaking", "Notch",
  ];

  function handleFilterTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    instrumentParams.type = event.target.value as BiquadFilterType;
    setInstrumentParams({ ...instrumentParams });
  }

  function handleFilterFrequencyChange(event: React.ChangeEvent<HTMLInputElement>) {
    instrumentParams.frequency = Number(event.target.value);
    setInstrumentParams({ ...instrumentParams });
  }

  function resetFilterFrequency() {
    instrumentParams.frequency = 2000;
    setInstrumentParams({ ...instrumentParams });
  }

  function handleQFactorChange(event: React.ChangeEvent<HTMLInputElement>) {
    instrumentParams.q = Number(event.target.value);
    setInstrumentParams({ ...instrumentParams });
  }

  function resetQFactor() {
    instrumentParams.q = 0;
    setInstrumentParams({ ...instrumentParams });
  }

  return (
    <div className="module_amp">
      <div className="module_header">
        <h3 className="module_title">{title}</h3>
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
            value={instrumentParams.frequency}
            min="100"
            max="8000"
            onChange={handleFilterFrequencyChange}
          />
          <p className="slider_value">{instrumentParams.frequency}</p>
        </div>
        <div>
          <h3 className="slider_label" onDoubleClick={resetQFactor}>Q Factor</h3>
          <input
            type="range"
            value={instrumentParams.q}
            min="0"
            max="100"
            onChange={handleQFactorChange}
          />
          <p className="slider_value">{instrumentParams.q}</p>
        </div>
      </div>
    </div>
  );
}
