import * as Tone from "tone";
import { InstrumentTwoParams, lfoParams2 } from "../t";

/**
 * Tone.js Instrument: InstrumentTwo
 * @params none
 */
export default class InstrumentTwo {
  instrumentSettings: InstrumentTwoParams;
  now: any;
  synth1: Tone.Synth;
  synth2: Tone.Synth;
  LFO1: Tone.LFO;
  LFO2: Tone.LFO;
  LFO3: Tone.LFO;
  LFO4: Tone.LFO;
  filter1: Tone.Filter;
  filter2: Tone.Filter;

  constructor(instrumentParams: InstrumentTwoParams) {
    this.instrumentSettings = instrumentParams;
    this.synth1 = new Tone.Synth({
      oscillator: {
        type: this.instrumentSettings.osc1Params.type,
      },
      envelope: {
        attack: this.instrumentSettings.osc1AmpEnvelope[0],
        attackCurve: "linear",
        decay: this.instrumentSettings.osc1AmpEnvelope[1],
        decayCurve: "exponential",
        sustain: this.instrumentSettings.osc1AmpEnvelope[2] / 10,
        release: this.instrumentSettings.osc1AmpEnvelope[3],
        releaseCurve: "exponential",
      }
    }).toDestination()

    this.synth2 = new Tone.Synth({
      oscillator: {
        type: this.instrumentSettings.osc2Params.type,
      },
      envelope: {
        attack: this.instrumentSettings.osc2AmpEnvelope[0],
        attackCurve: "linear",
        decay: this.instrumentSettings.osc2AmpEnvelope[1],
        decayCurve: "exponential",
        sustain: this.instrumentSettings.osc2AmpEnvelope[2] / 10,
        release: this.instrumentSettings.osc2AmpEnvelope[3],
        releaseCurve: "exponential",
      }
    }).toDestination()

    this.LFO1 = new Tone.LFO({
      frequency: 4,
      min: this.instrumentSettings.osc1Params.frequency - 50,
      max: this.instrumentSettings.osc1Params.frequency + 50,
      type: this.instrumentSettings.LFOOne.type,
    }).connect(this.synth1.frequency).start();

    this.LFO2 = new Tone.LFO({
      frequency: 5,
      min: this.instrumentSettings.osc1Params.frequency - 100,
      max: this.instrumentSettings.osc1Params.frequency + 100,
      type: this.instrumentSettings.LFOTwo.type,
    }).start();

    this.LFO3 = new Tone.LFO({
      frequency: 6,
      min: this.instrumentSettings.osc1Params.frequency - 100,
      max: this.instrumentSettings.osc1Params.frequency + 100,
      type: this.instrumentSettings.LFOThree.type,
    }).start();

    this.LFO4 = new Tone.LFO({
      frequency: 7,
      min: this.instrumentSettings.osc1Params.frequency - 100,
      max: this.instrumentSettings.osc1Params.frequency + 100,
      type: this.instrumentSettings.LFOFour.type,
    }).start();

    this.filter1 = new Tone.Filter();
    this.filter2 = new Tone.Filter();

    this.attack = this.attack.bind(this);
    this.release = this.release.bind(this);
    this.script = this.script.bind(this);
  }

  attack() {
    if (Tone.getContext().rawContext.state === "suspended") {
      Tone.start();
    }
    this.now = Tone.now();
    this.synth1.triggerAttack(this.instrumentSettings.osc1Params.frequency, this.now, this.instrumentSettings.osc1Params.volume);
  }

  release() {
    this.synth1.triggerRelease();
  }

  script() {
    this.synth1.triggerAttackRelease(this.instrumentSettings.osc1Params.frequency, 0.6, 0, this.instrumentSettings.osc1Params.volume);
  }

  setLFOParams(LFO: Tone.LFO, LFOParams: lfoParams2) {
    LFO.set({
      frequency: LFOParams.frequency,
      type: LFOParams.type,
    });
  }

  routeLFO(LFO: Tone.LFO, LFOParams: lfoParams2) {
    LFO.disconnect();
    switch (LFOParams.target) {
      case "none":
        break;
      case "OSC 1 Frequency":
        LFO.connect(this.synth1.frequency);
        break;
      case "OSC 2 Frequency":
        LFO.connect(this.synth2.frequency);
        break;
      case "OSC 1 Amplitude":
        LFO.connect(this.synth1.volume);
        break;
      case "OSC 2 Amplitude":
        LFO.connect(this.synth2.volume);
        break;
      case "Filter 1 Cutoff":
        LFO.connect(this.filter1.frequency);
        break;
      case "Filter 2 Cutoff":
        LFO.connect(this.filter2.frequency);
        break;
      case "Filter 1 Q":
        console.log("Filter 1 Routing not yet implemented");
        break;
      case "Filter 2 Q":
        console.log("Filter 2 Routing not yet implemented");
        break;
      default:
        break;
    }
  }
}
