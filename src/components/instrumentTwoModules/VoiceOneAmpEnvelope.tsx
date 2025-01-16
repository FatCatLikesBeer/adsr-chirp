import { useEffect } from "react";

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
  let key: number;
  const labels = ["A", "D", "S", "R"];

  useEffect(() => {
    key = Math.random() * 10000000;
  }, []);

  return (
    <div className="module_amp">
      <div className="module_header">
        <h3 className="module_title">{title}</h3>
        <span className="module_info"></span>
      </div>
      <div>
        <div className="knob_group">
          {instrumentParams.map((element, i) => {

            function knobCallBack(value: number) {
              const newInstrumentParams = [...instrumentParams];
              newInstrumentParams[i] = value;
              setInstrumentParams(newInstrumentParams);
            }

            return (
              <Knob
                key={`${key}${labels[i]}`}
                label={labels[i]}
                callBackFunction={knobCallBack}
                defaultValue={element}
                disabled={disabled}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
