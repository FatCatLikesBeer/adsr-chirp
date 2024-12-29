export default function AmpEnvelope({
  instrumentParams, setInstrumentParams
}: {
  instrumentParams: InstrumentOneParams,
  setInstrumentParams: React.Dispatch<InstrumentOneParams>,
}) {
  function handleA(event: React.ChangeEvent<HTMLInputElement>) {
    let ampADSR = [...instrumentParams.ampADSR];
    ampADSR[0] = Number(event.target.value);
    setInstrumentParams({ ampADSR: [...ampADSR] });
  }

  function handleD(event: React.ChangeEvent<HTMLInputElement>) {
    let ampADSR = [...instrumentParams.ampADSR];
    ampADSR[1] = Number(event.target.value);
    setInstrumentParams({ ampADSR: [...ampADSR] });
  }

  function handleS(event: React.ChangeEvent<HTMLInputElement>) {
    let ampADSR = [...instrumentParams.ampADSR];
    ampADSR[2] = Number(event.target.value);
    setInstrumentParams({ ampADSR: [...ampADSR] });
  }

  function handleR(event: React.ChangeEvent<HTMLInputElement>) {
    let ampADSR = [...instrumentParams.ampADSR];
    ampADSR[3] = Number(event.target.value);
    setInstrumentParams({ ampADSR: [...ampADSR] });
  }

  return (
    <div className="module_amp">
      <h3 className="module_title">AMP ENVELOPE</h3>
      <div className="vertical_slider_board">
        <div className="vertical_slider_container">
          <p className="slider_value">{instrumentParams.ampADSR[0].toFixed(2)}</p>
          <input
            className="vertical_slider"
            type="range"
            value={instrumentParams.ampADSR[0]}
            min="0"
            max="5"
            step="0.01"
            onChange={handleA}
          />
          <h3 className="slider_label">A</h3>
        </div>
        <div className="vertical_slider_container">
          <p className="slider_value">{instrumentParams.ampADSR[1].toFixed(2)}</p>
          <input
            className="vertical_slider"
            type="range"
            value={instrumentParams.ampADSR[1]}
            min="0"
            max="5"
            step="0.01"
            onChange={handleD}
          />
          <h3 className="slider_label">D</h3>
        </div>
        <div className="vertical_slider_container">
          <p className="slider_value">{instrumentParams.ampADSR[2].toFixed(2)}</p>
          <input
            className="vertical_slider"
            type="range"
            value={instrumentParams.ampADSR[2]}
            min="0"
            max="5"
            step="0.01"
            onChange={handleS}
          />
          <h3 className="slider_label">S</h3>
        </div>
        <div className="vertical_slider_container">
          <p className="slider_value">{instrumentParams.ampADSR[3].toFixed(2)}</p>
          <input
            className="vertical_slider"
            type="range"
            value={instrumentParams.ampADSR[3]}
            min="0"
            max="5"
            step="0.01"
            onChange={handleR}
          />
          <h3 className="slider_label">R</h3>
        </div>
      </div>
    </div>
  );
}
