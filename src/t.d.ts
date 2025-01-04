/**
 * Instrument One Parameters
 * @property osc1Params - oscParams
 * @property osc2Params - oscParams
 * @property osc1AmpEnvelope - number[]
 * @property osc2AmpEnvelope - number[]
 * @property osc1Filter - oscFilter
 * @property osc2Filter - oscFilter
 * @property LFOOne - lfoParams
 * @property LFOTwo - lfoParams
 * @property LFOThree - lfoParams
 */
interface InstrumentOneParams {
  /** Type and Frequency for OSC 1 */
  osc1Params: oscParams;
  /** Type and Frequency for OSC 2 */
  osc2Params: oscParams;
  /** ADSR/Envelope for OSC 1 Amp */
  osc1AmpEnvelope: number[];
  /** ADSR/Envelope for OSC 2 Amp */
  osc2AmpEnvelope: number[];
  /** Filter Parameters from OSC 1 Filter */
  osc1Filter: oscFilter;
  /** Filter Parameters from OSC 2 Filter */
  osc2Filter: oscFilter;
  /** Type, Frequency, and Amplitude for OSC LFO 1 */
  LFOOne: lfoParams;
  /** Type, Frequency, and Amplitude for OSC LFO 2 */
  LFOTwo: lfoParams;
  /** Type, Frequency, and Amplitude for OSC LFO 1 */
  LFOThree: lfoParams;
}

/** Oscillator Parameters */
type oscParams = {
  type: OscillatorType;
  frequency: number;
}

/** Filter Parameters */
type oscFilter = {
  type: BiquadFilterType;
  frequency: number;
  q: number;
}

/** LFO Parameters */
type lfoParams = {
  type: OscillatorType;
  frequency: number;
  amplitude: number;
  target: ModulationTarget;
}

/**
 * Targets for LFO Or Envelope/ADSR Modulation
 */
type ModulationTarget =
  "OSC 1 Frequency" | "OSC 2 Frequency" |
  "OSC 1 Amplitude" | "OSC 2 Amplitude" |
  "Filter 1 Cutoff" | "Filter 2 Cutoff" |
  "Filter 1 Q" | "Filter 2 Q" | "none";
