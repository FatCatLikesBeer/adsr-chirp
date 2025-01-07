import * as Tone from "tone";

/**
 * Tone.js Instrument: InstrumentTwo
 * @params none
 */
export default class InstrumentTwo {
  synthVelocity: number;
  frequency: number;
  synth: Tone.Synth;
  now: any;

  constructor() {
    this.synthVelocity = 0.3;
    this.synth = new Tone.Synth().toDestination();
    this.now = Tone.now();
    this.frequency = 440;
  }

  attack() {
    this.now = Tone.now();
    this.synth.triggerAttack(this.frequency, this.now, this.synthVelocity);
  }

  release() {
    this.now = Tone.now();
    this.synth.triggerRelease(this.now + this.synthVelocity);
  }
}
