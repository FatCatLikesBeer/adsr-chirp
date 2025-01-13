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
  const [yValue, setYValue] = useState<number>(0);
  const [minRotation, maxRotation, sensitivity] = [-135, 135, 1.5];
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
      const newValue = previous - e.movementY;
      if ((newValue > maxRotation) || (newValue < minRotation)) {
        return previous;
      } else {
        return newValue;
      }
    });
    console.log(yValue);
  }

  function onEnd() {
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener('mouseup', onEnd);
    visualRef.current!.style.cursor = "grab";
  }

  useEffect(() => {
    visualRef.current?.addEventListener('mousedown', onStart);
    inputRef.current!.style.pointerEvents = "none";
    visualRef.current!.style.pointerEvents = "auto";
    visualRef.current!.style.transform = `rotate(${minRotation}deg)`;
  }, []);

  return (
    <div className="dial-container">
      <div className="dial-title">{yValue}</div>
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
      <div className="dial-label"></div>
    </div>
  );
}
