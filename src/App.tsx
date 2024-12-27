import InstrumentOne from './library/InstrumentOne.ts';
import './App.css';

function App() {

  function createAndPlay() {
    new InstrumentOne();
  }

  return (
    <>
      <button type='button' onClick={createAndPlay}>Play</button>
    </>
  )
}

export default App

// TODO: Change favicon
