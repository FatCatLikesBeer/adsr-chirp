import { useEffect, useState } from "react";
import InstrumentTwo from '../library/InstrumentTwo';

/**
 * User Interface for InstrumentOne
 */
export default function InstrumentTwoUi() {
  const [instrument, setInstrument] = useState<InstrumentTwo>();

  useEffect(() => {
    const newInstrument = new InstrumentTwo();
    setInstrument(newInstrument);
  }, []);

  function createPlayKill() {
    instrument!.attack();
  }

  function release() {
    instrument!.release();
  }

  useEffect(() => {
    const myComment = "<!-- InstrumentTwo -->";
    document.body.insertAdjacentHTML("beforeend", myComment);
  }, []);

  return (
    <div>
      <button type="button" onMouseDown={createPlayKill} onMouseUp={release}>Play</button>
    </div>
  );
}
