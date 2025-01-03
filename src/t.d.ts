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
  /** ADSR/Envelope for OSC 1 Amp */
  osc1AmpEnvelope: number[];
  /** Filter Parameters from OSC 1 Filter */
  osc1Filter: {
    type: BiquadFilterType;
    frequency: number;
    q: number;
  };
  /** Type and Frequency for OSC 2 */
  osc2Params: {
    type: OscillatorType;
    frequency: number;
  };
  /** ADSR/Envelope for OSC 2 Amp */
  osc2AmpEnvelope: number[];
  /** Filter Parameters from OSC 2 Filter */
  osc2Filter: {
    type: BiquadFilterType;
    frequency: number;
    q: number;
  };
  /** Type, Frequency, and Amplitude for OSC LFO 1 */
  LFOOne: {
    type: OscillatorType;
    frequency: number;
    amplitude: number;
    target: ModulationTarget;
  };
  /** Type, Frequency, and Amplitude for OSC LFO 2 */
  LFOTwo: {
    type: OscillatorType;
    frequency: number;
    amplitude: number;
    target: ModulationTarget;
  };
  /** Type, Frequency, and Amplitude for OSC LFO 1 */
  LFOThree: {
    type: OscillatorType;
    frequency: number;
    amplitude: number;
    target: ModulationTarget;
  };
}

/**
 * Targets for LFO Or Envelope/ADSR Modulation
 */
type ModulationTarget =
  "OSC 1 Frequency" | "OSC 2 Frequency" |
  "OSC 1 Amplitude" | "OSC 2 Amplitude" |
  "Filter 1 Cutoff" | "Filter 2 Cutoff" |
  "Filter 1 Q" | "Filter 2 Q" | "none";
