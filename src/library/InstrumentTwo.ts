import * as Tone from "tone";
import { NonCustomOscillatorType } from "tone/build/esm/source/oscillator/OscillatorInterface";
import { InstrumentTwoParams } from "../t";

/**
 * Tone.js Instrument: InstrumentTwo
 * @params none
 */
export default class InstrumentTwo {
  synthVelocity: number;
  frequency: number;
  waveType: NonCustomOscillatorType;
  synth: Tone.Synth;
  now: any;

  constructor(instrumentParams: InstrumentTwoParams) {
    this.waveType = instrumentParams.osc1Params.type;
    this.frequency = instrumentParams.osc1Params.frequency;
    this.synthVelocity = instrumentParams.osc1Params.volume;
    this.synth = new Tone.Synth({
      oscillator: {
        type: this.waveType,
      }
    }).toDestination();
    this.now = Tone.now();
  }

  attack() {
    this.synth.triggerAttack(this.frequency, 0, this.synthVelocity);
  }

  release() {
    this.synth.triggerRelease(0);
  }
}
