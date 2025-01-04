export default function VoiceOneOSC({
  instrumentParams,
  setInstrumentParams,
  title,
}: {
  instrumentParams: oscParams;
  setInstrumentParams: (_value: any) => void;
  title: string;
}) {
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
    instrumentParams.frequency = Number(event.target.value);
    setInstrumentParams({ ...instrumentParams });
  }

  function resetOSCFrequency() {
    instrumentParams.frequency = 2000;
    setInstrumentParams({ ...instrumentParams });
  }

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
            max="8000"
            onChange={handleOSCFrequencyChange}
          />
          <p className="slider_value">{instrumentParams.frequency}</p>
        </div>
      </div>
    </div>
  );
}
