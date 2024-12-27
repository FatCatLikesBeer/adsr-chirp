import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import InstrumentOne from './library/InstrumentOne.ts';
import './App.css';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

function App() {
  function createAndPlay() {
    new InstrumentOne();
  }

  useEffect(() => {
    supabase.from("posts").select()
      .then((response) => {
        console.log(response);
      });
  }, []);

  return (
    <>
      <button type='button' onClick={createAndPlay}>Play</button>
    </>
  )
}

export default App

// TODO: Change favicon
