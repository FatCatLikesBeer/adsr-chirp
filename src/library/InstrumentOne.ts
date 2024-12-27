export default class InstrumentOne {
  audioCtx: AudioContext;
  osc: OscillatorNode;
  amp: GainNode;

  constructor() {
    this.audioCtx = new AudioContext;
    this.osc = this.audioCtx.createOscillator();
    this.amp = this.audioCtx.createGain();

    this.amp.connect(this.audioCtx.destination);
    this.osc.connect(this.amp);

    this.amp.gain.value = 0.1;

    this.osc.type = "sine";
    this.osc.frequency.value = 440;

    this.osc.start();
    this.osc.frequency.setValueCurveAtTime([400, 700, 300, 400, 600, 500, 800, 200], 0, this.audioCtx.currentTime + 4);
    this.osc.stop(this.audioCtx.currentTime + 5);
  }
}
