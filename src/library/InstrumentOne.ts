export default class InstrumentOne {
  audioCtx: AudioContext;
  ampDestination: GainNode;
  voice1Amp: GainNode;
  voice1Osc: OscillatorNode;
  voice1LFO: OscillatorNode;
  voice1LFOAmp: GainNode;
  voice1BiQuadFilter: BiquadFilterNode;
  instrumentParams: InstrumentOneParams;

  constructor(instrumentParams: InstrumentOneParams) {
    this.audioCtx = new AudioContext;
    this.ampDestination = this.audioCtx.createGain();
    this.voice1BiQuadFilter = this.audioCtx.createBiquadFilter();
    this.voice1Amp = this.audioCtx.createGain();
    this.voice1Osc = this.audioCtx.createOscillator();
    this.voice1LFO = this.audioCtx.createOscillator();
    this.voice1LFOAmp = this.audioCtx.createGain();
    this.instrumentParams = instrumentParams;

    this.ampDestination.connect(this.audioCtx.destination);
    this.voice1BiQuadFilter.connect(this.ampDestination);
    this.voice1Amp.connect(this.voice1BiQuadFilter);
    // this.voice1Amp.connect(this.ampDestination);
    this.voice1Osc.connect(this.voice1Amp);
    this.voice1LFO.connect(this.voice1LFOAmp);
    this.voice1LFOAmp.connect(this.voice1Osc.frequency);

    this.ampDestination.gain.value = 0.03;

    this.voice1BiQuadFilter.type = this.instrumentParams.osc1Filter.type;
    this.voice1BiQuadFilter.frequency.value = this.instrumentParams.osc1Filter.frequency;
    this.voice1BiQuadFilter.Q.value = this.instrumentParams.osc1Filter.q;

    this.voice1Amp.gain.value = 0.001;

    this.voice1Osc.type = instrumentParams.osc1Params.type;
    this.voice1Osc.frequency.value = instrumentParams.osc1Params.frequency;

    this.voice1LFO.type = instrumentParams.osc1LFO.type;
    this.voice1LFO.frequency.value = instrumentParams.osc1LFO.frequency;
    this.voice1LFOAmp.gain.value = instrumentParams.osc1LFO.amplitude;

    this.voice1LFO.start();
    this.voice1Osc.start();

    this.attackToSustain();
  }

  attackToSustain() {
    // this.voice1Amp.gain.exponentialRampToValueAtTime(10, this.instrumentParams.osc1AmpEnvelope[0]);
    this.voice1Amp.gain.setTargetAtTime(10, 0, this.instrumentParams.osc1AmpEnvelope[0] * 0.25);
    // this.voice1Amp.gain.linearRampToValueAtTime(10, this.instrumentParams.osc1AmpEnvelope[0]);
    // this.voice1Amp.gain.setValueCurveAtTime([0, 10], 0, (this.instrumentParams.osc1AmpEnvelope[0] + 0.001) * 0.25);
    this.voice1Amp.gain.setTargetAtTime(
      this.instrumentParams.osc1AmpEnvelope[2],
      this.audioCtx.currentTime + this.instrumentParams.osc1AmpEnvelope[0],
      ((this.instrumentParams.osc1AmpEnvelope[1] + 0.001) * .25)
    );
  }

  release() {
    this.voice1Amp.gain.cancelScheduledValues(this.audioCtx.currentTime);
    this.voice1Amp.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + this.instrumentParams.osc1AmpEnvelope[3]);
  }

  stop() {
    this.voice1LFO.stop();
    this.voice1Osc.stop();
    this.audioCtx.close();
  }
}
