/**
 * Instrument One Parameters
 * @property osc1Params
 * @property osc1AmpEnvelope
 */
interface InstrumentOneParams {
  /** Type and Frequency for OSC 1 */
  osc1Params: {
    type: OscillatorType;
    frequency: number;
  };
  /** ADSR/Envelope for OSC 1 Amp */
  osc1AmpEnvelope: number[];
}
