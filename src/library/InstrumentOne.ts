export default class InstrumentOne {
  audioCtx: AudioContext;
  ampDestination: GainNode;
  voice1Amp: GainNode;
  voice1Osc: OscillatorNode;
  voice1LFO: OscillatorNode;
  voice1LFOAmp: GainNode;
  instrumentParams: InstrumentOneParams;

  constructor({
    instrumentParams,
  }: {
    instrumentParams: InstrumentOneParams,
  }) {
    this.audioCtx = new AudioContext;
    this.ampDestination = this.audioCtx.createGain();
    this.voice1Amp = this.audioCtx.createGain();
    this.voice1Osc = this.audioCtx.createOscillator();
    this.voice1LFO = this.audioCtx.createOscillator();
    this.voice1LFOAmp = this.audioCtx.createGain();
    this.instrumentParams = instrumentParams;

    this.ampDestination.connect(this.audioCtx.destination);
    this.voice1Amp.connect(this.ampDestination);
    this.voice1Osc.connect(this.voice1Amp);
    this.voice1LFO.connect(this.voice1LFOAmp);
    this.voice1LFOAmp.connect(this.voice1Osc.frequency);
    this.ampDestination.gain.value = 0.03;

    this.voice1Amp.gain.value = 0.0;

    this.voice1Osc.type = instrumentParams.osc1Params.type
    this.voice1Osc.frequency.value = instrumentParams.osc1Params.frequency;

    this.voice1LFO.type = "sine";
    this.voice1LFO.frequency.value = 11.0;

    // Total range (amplitude height) of LFO modulation
    this.voice1LFOAmp.gain.value = 110;

    this.voice1LFO.start();
    this.voice1Osc.start();

    this.attackToSustain();
  }

  attackToSustain() {
    this.voice1Amp.gain.setTargetAtTime(10, 0, this.instrumentParams.osc1AmpEnvelope[0]);
    this.voice1Amp.gain.setTargetAtTime(
      this.instrumentParams.osc1AmpEnvelope[2],
      this.audioCtx.currentTime + this.instrumentParams.osc1AmpEnvelope[0],
      (this.instrumentParams.osc1AmpEnvelope[1] * .25)
    );
  }

  release() {
    this.voice1Amp.gain.cancelScheduledValues(this.audioCtx.currentTime);
    this.voice1Amp.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + this.instrumentParams.osc1AmpEnvelope[3]);
  }

  stop() {
    this.voice1LFO.stop();
    this.voice1Osc.stop();
  }
}
