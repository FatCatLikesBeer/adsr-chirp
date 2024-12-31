/**
 * Instrument One Parameters
 * @property osc1Params
 * @property osc1AmpEnvelope
 * @property osc1LFO
 */
interface InstrumentOneParams {
  /** Type and Frequency for OSC 1 */
  osc1Params: {
    type: OscillatorType;
    frequency: number;
  };
  /** Type, Frequency, and Amplitude for OSC LFO 1 */
  osc1LFO: {
    type: OscillatorType;
    frequency: number;
    amplitude: number;
  }
  /** ADSR/Envelope for OSC 1 Amp */
  osc1AmpEnvelope: number[];
}
