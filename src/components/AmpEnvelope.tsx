export default function AmpEnvelope({
  instrumentParams, setInstrumentParams
}: {
  instrumentParams: InstrumentOneParams,
  setInstrumentParams: React.Dispatch<InstrumentOneParams>,
}) {
  const labels = ["A", "D", "S", "R"];

  return (
    <div className="module_amp">
      <h3 className="module_title">AMP ENVELOPE</h3>
      <div className="vertical_slider_board">
        {instrumentParams.ampADSR.map((elem, i, thisArr) => {

          function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
            let newampADSR = [...thisArr];
            newampADSR[i] = Number(event.target.value);
            setInstrumentParams({ ampADSR: [...newampADSR] });
          }

          return (
            <div className="vertical_slider_container" key={`${labels[i]}vertical_slider_ctonainer`}>
              <p className="slider_value" key={`${labels[i]}slider_value`}>{elem.toFixed(2)}</p>
              <input
                key={`${labels[i]}vertical_slider`}
                className="vertical_slider"
                type="range"
                value={elem}
                min="0"
                max="10"
                step="0.01"
                onChange={handleValueChange}
              />
              <h3 className="slider_label" key={`${labels[i]}slider_label`}>{labels[i]}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
