export default class InstrumentOne {
  audioCtx: AudioContext;
  ampDestination: GainNode;
  mixer: ChannelMergerNode;

  voice1BiQuadFilter: BiquadFilterNode;
  voice1AmpForEnvelope: GainNode;
  voice1AmpForLFO: GainNode;
  voice1Osc: OscillatorNode;

  voice2BiQuadFilter: BiquadFilterNode;
  voice2AmpForEnvelope: GainNode;
  voice2AmpForLFO: GainNode;
  voice2Osc: OscillatorNode;

  LFO1: OscillatorNode;
  LFO1Intensity: GainNode;
  LFO2: OscillatorNode;
  LFO2Intensity: GainNode;
  LFO3: OscillatorNode;
  LFO3Intensity: GainNode;

  instrumentParams: InstrumentOneParams;

  constructor(instrumentParams: InstrumentOneParams) {
    // AudioCtx Node Init
    this.audioCtx = new AudioContext;
    this.ampDestination = this.audioCtx.createGain();
    this.mixer = this.audioCtx.createChannelMerger(2);

    this.voice1BiQuadFilter = this.audioCtx.createBiquadFilter();
    this.voice1AmpForEnvelope = this.audioCtx.createGain();
    this.voice1AmpForLFO = this.audioCtx.createGain();
    this.voice1Osc = this.audioCtx.createOscillator();

    this.voice2BiQuadFilter = this.audioCtx.createBiquadFilter();
    this.voice2AmpForEnvelope = this.audioCtx.createGain();
    this.voice2AmpForLFO = this.audioCtx.createGain();
    this.voice2Osc = this.audioCtx.createOscillator();

    this.LFO1 = this.audioCtx.createOscillator();
    this.LFO1Intensity = this.audioCtx.createGain();
    this.LFO2 = this.audioCtx.createOscillator();
    this.LFO2Intensity = this.audioCtx.createGain();
    this.LFO3 = this.audioCtx.createOscillator();
    this.LFO3Intensity = this.audioCtx.createGain();

    this.instrumentParams = instrumentParams;

    // Static Routing
    this.ampDestination.connect(this.audioCtx.destination);
    this.mixer.connect(this.ampDestination);

    this.voice1BiQuadFilter.connect(this.ampDestination);
    this.voice1AmpForEnvelope.connect(this.voice1BiQuadFilter);
    this.voice1AmpForLFO.connect(this.voice1AmpForEnvelope);
    this.voice1Osc.connect(this.voice1AmpForLFO);

    this.voice2BiQuadFilter.connect(this.ampDestination);
    this.voice2AmpForEnvelope.connect(this.voice2BiQuadFilter);
    this.voice2AmpForLFO.connect(this.voice2AmpForEnvelope);
    this.voice2Osc.connect(this.voice2AmpForLFO);

    this.LFO1.connect(this.LFO1Intensity);
    this.LFO2.connect(this.LFO2Intensity);
    this.LFO3.connect(this.LFO3Intensity);

    // UserSelected Routing
    this.#setTarget(this.LFO1Intensity, this.instrumentParams.LFOOne.target);
    this.#setTarget(this.LFO2Intensity, this.instrumentParams.LFOTwo.target);
    this.#setTarget(this.LFO3Intensity, this.instrumentParams.LFOThree.target);

    // Instrument Parameter to AudioCtx Node Mapping
    this.ampDestination.gain.value = 0.010;

    this.voice1BiQuadFilter.type = this.instrumentParams.osc1Filter.type;
    this.voice1BiQuadFilter.frequency.value = this.instrumentParams.osc1Filter.frequency;
    this.voice1BiQuadFilter.Q.value = this.instrumentParams.osc1Filter.q;

    this.voice2BiQuadFilter.type = this.instrumentParams.osc2Filter.type;
    this.voice2BiQuadFilter.frequency.value = this.instrumentParams.osc2Filter.frequency;
    this.voice2BiQuadFilter.Q.value = this.instrumentParams.osc2Filter.q;

    this.voice1AmpForEnvelope.gain.value = 0.001;
    this.voice2AmpForEnvelope.gain.value = 0.001;

    this.voice1Osc.type = instrumentParams.osc1Params.type;
    this.voice1Osc.frequency.value = instrumentParams.osc1Params.frequency;
    this.voice2Osc.type = instrumentParams.osc2Params.type;
    this.voice2Osc.frequency.value = instrumentParams.osc2Params.frequency;

    this.LFO1.type = instrumentParams.LFOOne.type;
    this.LFO1.frequency.value = instrumentParams.LFOOne.frequency;
    this.LFO1Intensity.gain.value = instrumentParams.LFOOne.amplitude;
    this.LFO2.type = instrumentParams.LFOTwo.type;
    this.LFO2.frequency.value = instrumentParams.LFOTwo.frequency;
    this.LFO2Intensity.gain.value = instrumentParams.LFOTwo.amplitude;
    this.LFO3.type = instrumentParams.LFOThree.type;
    this.LFO3.frequency.value = instrumentParams.LFOThree.frequency;
    this.LFO3Intensity.gain.value = instrumentParams.LFOThree.amplitude;

    // Start OSCs and play instrument
    this.LFO1.start();
    this.LFO2.start();
    this.LFO3.start();
    this.voice1Osc.start();
    this.voice2Osc.start();

    this.attackToSustain();
  }

  /**
  * Attack, Decay, and Sustain
  */
  attackToSustain() {
    // this.voice1AmpForEnvelope.gain.exponentialRampToValueAtTime(10, this.instrumentParams.osc1AmpEnvelope[0]);
    // this.voice1AmpForEnvelope.gain.linearRampToValueAtTime(10, this.instrumentParams.osc1AmpEnvelope[0]);
    // this.voice1AmpForEnvelope.gain.setValueCurveAtTime([0, 10], 0, (this.instrumentParams.osc1AmpEnvelope[0] + 0.001) * 0.25);
    this.voice1AmpForEnvelope.gain.setTargetAtTime(10, 0, this.instrumentParams.osc1AmpEnvelope[0] * 0.25);
    this.voice1AmpForEnvelope.gain.setTargetAtTime(
      this.instrumentParams.osc1AmpEnvelope[2],
      this.audioCtx.currentTime + this.instrumentParams.osc1AmpEnvelope[0],
      ((this.instrumentParams.osc1AmpEnvelope[1] + 0.001) * .25)
    );
    this.voice2AmpForEnvelope.gain.setTargetAtTime(10, 0, this.instrumentParams.osc2AmpEnvelope[0] * 0.25);
    this.voice2AmpForEnvelope.gain.setTargetAtTime(
      this.instrumentParams.osc1AmpEnvelope[2],
      this.audioCtx.currentTime + this.instrumentParams.osc2AmpEnvelope[0],
      ((this.instrumentParams.osc2AmpEnvelope[1] + 0.001) * .25)
    );
  }

  /**
  * Release
  */
  release() {
    this.voice1AmpForEnvelope.gain.cancelScheduledValues(this.audioCtx.currentTime);
    this.voice1AmpForEnvelope.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + this.instrumentParams.osc1AmpEnvelope[3]);
    this.voice2AmpForEnvelope.gain.cancelScheduledValues(this.audioCtx.currentTime);
    this.voice2AmpForEnvelope.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + this.instrumentParams.osc2AmpEnvelope[3]);
  }

  /**
  * Kills all oscilators and closes audio context
  */
  stop() {
    this.LFO1.stop();
    this.LFO2.stop();
    this.LFO3.stop();
    this.voice1Osc.stop();
    this.voice2Osc.stop();
    this.audioCtx.close();
  }

  #setTarget(LFO: GainNode, LFOTarget: ModulationTarget) {
    switch (LFOTarget) {
      case "OSC 1 Frequency":
        LFO.connect(this.voice1Osc.frequency);
        break;
      case "OSC 1 Amplitude":
        LFO.connect(this.voice1AmpForLFO.gain);
        break;
      case "OSC 2 Frequency":
        LFO.connect(this.voice2Osc.frequency);
        break;
      case "OSC 2 Amplitude":
        LFO.connect(this.voice2AmpForLFO.gain);
        break;
      case "none":
        break;
      default:
        break;
    }
  }
}
