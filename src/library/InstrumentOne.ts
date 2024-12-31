export default class InstrumentOne {
  audioCtx: AudioContext;
  ampDestination: GainNode;
  amp: GainNode;
  osc: OscillatorNode;
  lfo: OscillatorNode;
  lfoAmp: GainNode;
  instrumentParams: InstrumentOneParams;

  constructor({
    instrumentParams,
  }: {
    instrumentParams: InstrumentOneParams,
  }) {
    this.audioCtx = new AudioContext;
    this.ampDestination = this.audioCtx.createGain();
    this.amp = this.audioCtx.createGain();
    this.osc = this.audioCtx.createOscillator();
    this.lfo = this.audioCtx.createOscillator();
    this.lfoAmp = this.audioCtx.createGain();
    this.instrumentParams = instrumentParams;

    this.ampDestination.connect(this.audioCtx.destination);
    this.amp.connect(this.ampDestination);
    this.osc.connect(this.amp);
    this.lfo.connect(this.lfoAmp);
    this.lfoAmp.connect(this.osc.frequency);
    this.ampDestination.gain.value = 0.03;

    this.amp.gain.value = 0.0;

    this.osc.type = "sine";
    this.osc.frequency.value = 440;

    this.lfo.type = "sine";
    this.lfo.frequency.value = 11.0;

    // Total range (amplitude height) of LFO modulation
    this.lfoAmp.gain.value = 110;

    this.lfo.start();
    this.osc.start();

    // Attack
    this.amp.gain.setTargetAtTime(10, 0, this.instrumentParams.ampADSR[0]);
    // Decay then Sustain
    this.amp.gain.setTargetAtTime(this.instrumentParams.ampADSR[2], this.audioCtx.currentTime + this.instrumentParams.ampADSR[0], (this.instrumentParams.ampADSR[1] * .25));
  }

  release() {
    // release
    this.amp.gain.cancelScheduledValues(this.audioCtx.currentTime);
    this.amp.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + this.instrumentParams.ampADSR[3]);
  }

  stop() {
    this.lfo.stop();
    this.osc.stop();
  }
}
