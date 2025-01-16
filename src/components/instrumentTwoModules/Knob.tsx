import { useRef, useEffect, useState } from 'react';

/**
 * Knob/Dial element for ADSR/Envelope
 * @prop {string} label - its the label above the knob
 * @prop {function} returnValueCallback - Callback to get value of knob
 * @prop {number} [defaultValue = 1] - defaulted to 1. Default value of the knob
 * @prop {number} [min = 0] - minimum of range, defaulted to 0
 * @prop {number} [max = 10] - maximum of range, defaulted to 10
 * @prop {number} [step = 1.5] - value incrementes between min and max ranges
 * @prop {boolean} [disabled = false] - disable the compoment. Defaulted to false
 */
export default function Knob({
  label,
  returnValueCallback,
  defaultValue = 1,
  min = 0,
  max = 10,
  step = 1.5,
  disabled = false,
}: {
  label: string;
  returnValueCallback: (value: number) => void;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}) {
  let [minRotation, maxRotation, sensitivity] = [-150, 150, step];
  const [yValue, setYValue] = useState<number>(defaultValueToYValueMapper(min, max, defaultValue));
  const visualRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  // Sets knob to default value on initial render
  useEffect(() => {
    visualRef.current!.style.transform = `rotate(${yValue}deg)`;
  }, []);

  function onStart() {
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    visualRef.current!.style.cursor = 'grabbing';
  }

  function onMove(e: MouseEvent) {
    setYValue((previous) => {
      if (previous > maxRotation) { previous = maxRotation }
      if (previous < minRotation) { previous = minRotation }
      let newValue: number = previous - (e.movementY * sensitivity);
      if ((newValue > maxRotation) || (newValue < minRotation)) {
        return previous;
      } else {
        return newValue;
      }
    });
  }

  function onEnd() {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onEnd);
    visualRef.current!.style.cursor = 'grab';
  }

  function removeMouseMoveEventListeners() {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onEnd);
    document.removeEventListener('keydown', (event: KeyboardEvent) => {
      const keyName = event.key;
      if (keyName === "Shift") { sensitivity = 1 }
    });
    document.removeEventListener('keyup', (event: KeyboardEvent) => {
      const keyName = event.key;
      if (keyName === "Shift") { sensitivity = step }
    });
  }

  function removeInitListeners() {
    visualRef.current?.removeEventListener('mousedown', onStart);
    visualRef.current?.removeEventListener('dblclick', () => setYValue(defaultValueToYValueMapper(min, max, defaultValue)));
    document.removeEventListener('keydown', (event: KeyboardEvent) => {
      const keyName = event.key;
      if (keyName === "Shift") { sensitivity = 1; }
    });
    document.removeEventListener('keyup', (event: KeyboardEvent) => {
      const keyName = event.key;
      if (keyName === "Shift") { sensitivity = 1.5; }
    });
  }

  // Inits start() function
  useEffect(() => {
    if (!disabled) {
      visualRef.current?.addEventListener('mousedown', onStart);
      visualRef.current?.addEventListener('dblclick', () => setYValue(defaultValueToYValueMapper(min, max, defaultValue)));
      document.addEventListener('keydown', (event: KeyboardEvent) => {
        const keyName = event.key;
        if (keyName === "Shift") { sensitivity = 1; }
      });
      document.addEventListener('keyup', (event: KeyboardEvent) => {
        const keyName = event.key;
        if (keyName === "Shift") { sensitivity = 1.5; }
      });
    } else {
      removeMouseMoveEventListeners();
      removeInitListeners();
    }
    return (() => {
      removeMouseMoveEventListeners();
      removeInitListeners();
    });
  }, [disabled]);

  // Renders knob position, returns desired value
  useEffect(() => {
    visualRef.current!.style.transform = `rotate(${yValue}deg)`;
    returnValueCallback(yValueMappedToMinMaxRange(min, max, yValue));
    console.log("yvalue", yValue);
  }, [yValue]);

  return (
    <div className='dial-container'>
      <div className='dial-label' style={{ color: !disabled ? "white" : "grey" }}>{label}</div>
      <div className='dial-knob'>
        <div className='dial-division' />
        <div className='dial-visual' style={{ borderColor: !disabled ? "white" : "grey" }} ref={visualRef}>
          <div className='dial-indicator' style={{ background: !disabled ? "white" : "grey" }} ref={indicatorRef} />
        </div>
      </div>
    </div>
  );
}

/**
 * Maps knob position to the provided mix & max range
 * @param: min: number
 * @param: max: number
 * @param: yValue: number
 */
function yValueMappedToMinMaxRange(min: number, max: number, yValue: number) {
  return ((yValue + 150) / (300 / (max - min))) + min;
}

/**
  * Maps the defaultValue prop to knob position
  * @param: min: number
  * @param: max: number
  * @param: defaultValue: number
  */
function defaultValueToYValueMapper(min: number, max: number, defaultValue: number) {
  const slope = (300 / (max - min));
  return ((slope * defaultValue) - (150 + (slope * min)));
}
