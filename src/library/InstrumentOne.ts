export default class InstrumentOne {
  audioCtx: AudioContext;
  amp: GainNode;
  osc: OscillatorNode;
  lfo: OscillatorNode;
  lfoAmp: GainNode;
  duration: number;

  constructor({
    instrumentParams,
    setDisableButton,
  }: {
    instrumentParams: InstrumentOneParams,
    setDisableButton: React.Dispatch<boolean>
  }) {
    this.duration = 4;
    this.audioCtx = new AudioContext;
    this.amp = this.audioCtx.createGain();
    this.osc = this.audioCtx.createOscillator();
    this.lfo = this.audioCtx.createOscillator();
    this.lfoAmp = this.audioCtx.createGain();

    this.amp.connect(this.audioCtx.destination);
    this.osc.connect(this.amp);
    this.lfo.connect(this.lfoAmp);
    this.lfoAmp.connect(this.osc.frequency);
    this.amp.gain.value = 0.0;

    this.osc.type = "sine";
    this.osc.frequency.value = 440;

    this.lfo.type = "sine";
    this.lfo.frequency.value = 11.0;

    // Total range (amplitude height) of LFO modulation
    this.lfoAmp.gain.value = 110;

    this.lfo.start();
    this.osc.start();

    this.amp.gain.setTargetAtTime(0.3, 0, this.audioCtx.currentTime + instrumentParams.ampADSR[0]);

    this.lfo.stop(this.audioCtx.currentTime + this.duration);
    this.osc.stop(this.audioCtx.currentTime + this.duration);

    this.osc.onended = function() { setDisableButton(false) }
  }

  stop() {
    this.osc.stop();
  }
}
