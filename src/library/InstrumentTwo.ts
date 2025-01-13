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
      },
      envelope: {
        attack: 0.3,
        attackCurve: "linear",
        decay: 0.3,
        decayCurve: "exponential",
        release: 0.3,
        releaseCurve: "exponential",
      }
    }).toDestination();
  }

  attack() {
    this.now = Tone.now();
    this.synth.triggerAttack(this.frequency, this.now, this.synthVelocity);
  }

  release() {
    this.synth.triggerRelease();
  }

  script() {
    this.synth.triggerAttackRelease(this.frequency, 0.6, 0, this.synthVelocity);
  }
}
