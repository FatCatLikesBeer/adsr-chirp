import Knob from "./Knob.tsx";

export default function VoiceOneAmpEnvelope({
  title,
  instrumentParams,
  setInstrumentParams,
  disabled = false,
}: {
  instrumentParams: number[];
  setInstrumentParams: (value: number[]) => void;
  title: string;
  disabled: boolean;
}) {
  const labels = ["A", "D", "S", "R"];

  return (
    <div className="module_amp">
      <div className="module_header">
        <h3 className="module_title">{title}</h3>
        <span className="module_info"></span>
      </div>
      <div>
        <div className="knob_group">
          {instrumentParams.map((element, i) => {

            function setValue(yValue: number) {
              let newEnvelope = [...instrumentParams];
              newEnvelope[i] = yValue;
              setInstrumentParams([...newEnvelope]);
            }

            return (
              <Knob label={labels[i]} disabled={disabled} key={Math.random() * 1000} setValue={setValue} value={element} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
