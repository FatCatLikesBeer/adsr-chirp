import { useRef, useEffect, useState } from 'react';

/**
 * Knob/Dial element for ADSR/Envelope
 * @param label: string
 * @param disabled: boolean
 */
export default function Knob({
  label,
  value,
  setValue,
  disabled = false,
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
  disabled?: boolean;
}) {
  let [minRotation, maxRotation, sensitivity] = [-150, 150, 1.5];
  const [yValue, setYValue] = useState<number>((value * 30) - 150);
  const visualRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

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
      if (keyName === "Shift") { sensitivity = 1; }
    });
    document.removeEventListener('keyup', (event: KeyboardEvent) => {
      const keyName = event.key;
      if (keyName === "Shift") { sensitivity = 1.5; }
    });
  }

  function removeInitListeners() {
    visualRef.current?.removeEventListener('mousedown', onStart);
    visualRef.current?.removeEventListener('dblclick', () => setYValue(minRotation));
    document.removeEventListener('keydown', (event: KeyboardEvent) => {
      const keyName = event.key;
      if (keyName === "Shift") { sensitivity = 1; }
    });
    document.removeEventListener('keyup', (event: KeyboardEvent) => {
      const keyName = event.key;
      if (keyName === "Shift") { sensitivity = 1.5; }
    });
  }

  useEffect(() => {
    visualRef.current!.style.transform = `rotate(${yValue}deg)`;
  }, [yValue]);

  useEffect(() => {
    if (!disabled) {
      visualRef.current!.addEventListener('mousedown', onStart);
      visualRef.current!.addEventListener('dblclick', () => setYValue(minRotation));
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
