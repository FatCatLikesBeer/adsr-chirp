import { useRef, useEffect, useState } from 'react';

export default function Knob({
  title,
  inputMin,
  inputMax,
}: {
  title: string;
  inputMin: number;
  inputMax: number;
}) {
  const [minRotation, maxRotation, sensitivity] = [-150, 150, 1.2];
  const [yValue, setYValue] = useState<number>(minRotation);
  const visualRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  function onStart() {
    document.addEventListener("mousemove", onMove);
    document.addEventListener('mouseup', onEnd);
    visualRef.current!.style.cursor = "grabbing";
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
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener('mouseup', onEnd);
    visualRef.current!.style.cursor = "grab";
  }

  useEffect(() => {
    visualRef.current!.style.transform = `rotate(${yValue}deg)`;
  }, [yValue]);

  useEffect(() => {
    visualRef.current?.addEventListener('mousedown', onStart);
    visualRef.current!.addEventListener('dblclick', () => setYValue(minRotation));
    visualRef.current!.style.transform = `rotate(${minRotation}deg)`;
  }, []);

  return (
    <div className="dial-container">
      <div className="dial-title">{title}</div>
      <input
        className="dial-input"
        type="range"
        min={inputMin}
        max={inputMax}
        ref={inputRef}
      />
      <div className="dial-division" />
      <div className="dial-visual" ref={visualRef}>
        <div className="dial-indicator" ref={indicatorRef} />
      </div>
      <div className="dial-label">{yValue}</div>
    </div>
  );
}
