import { NonCustomOscillatorType } from "tone/build/esm/source/oscillator/OscillatorInterface";

/**
 * Instrument Two Parameters
 * @property {oscParams2} osc1Params - Parameters for oscillator 1
 * @property {oscParams2} osc2Params - Parameters for oscillator 2
 * @property {number[]} osc1AmpEnvelope - ADSR for osc 1 amp
 * @property {number[]} osc2AmpEnvelope - ADSR for osc 2 amp
 * @property {oscFilter} osc1Filter - Params for filter 1
 * @property {oscFilter} osc2Filter - Params for filter 2
 * @property {lfoParams2} LFOOne - Params for LFO1
 * @property {lfoParams2} LFOTwo - Params for LFO2
 * @property {lfoParams2} LFOThree - Params for LFO3
 * @property {lfoParams2} LFOFour - Params for LFO4
 */
interface InstrumentTwoParams extends InstrumentOneParams {
  /** Type and Frequency for OSC 1 */
  osc1Params: oscParams2;
  /** Type and Frequency for OSC 2 */
  osc2Params: oscParams2;
  /** Type, Frequency, and Amplitude for OSC LFO 1 */
  LFOOne: lfoParams2;
  /** Type, Frequency, and Amplitude for OSC LFO 2 */
  LFOTwo: lfoParams2;
  /** Type, Frequency, and Amplitude for OSC LFO 3 */
  LFOThree: lfoParams2;
  /** Type, Frequency, and Amplitude for OSC LFO 4 */
  LFOFour: lfoParams2;
}

/**
 * Instrument One Parameters
 * @property {oscParams} osc1Params - Parameters for oscillator 1
 * @property {oscParams} osc2Params - Parameters for oscillator 2
 * @property {number[]} osc1AmpEnvelope - ADSR for osc 1 amp
 * @property {number[]} osc2AmpEnvelope - ADSR for osc 2 amp
 * @property {oscfilter} osc1Filter - Params for filter 1
 * @property {oscfilter} osc2Filter - Params for filter 2
 * @property {lfoParams} LFOOne - Params for LFO1
 * @property {lfoParams} LFOTwo - Params for LFO2
 * @property {lfoParams} LFOThree - Params for LFO3
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
  /** ADSR/Envelope for OSC 1 Filter */
  osc1FilterEnvelope: number[];
  /** ADSR/Envelope for OSC 2 Filter */
  osc2FilterEnvelope: number[];
  /** Type, Frequency, and Amplitude for OSC LFO 1 */
  LFOOne: lfoParams;
  /** Type, Frequency, and Amplitude for OSC LFO 2 */
  LFOTwo: lfoParams;
  /** Type, Frequency, and Amplitude for OSC LFO 3 */
  LFOThree: lfoParams;
}

/**
 * Oscillator Parameters
 *
 * shape: {
 *  type: OscillatorType,
 *  frequency: number,
 *  q: number,
 * }
 */
interface oscParams {
  type: OscillatorType;
  frequency: number;
  volume: number;
}

/**
 * Oscillator Parameters for InstrumentTwo
 *
 * shape: {
 *  type: Tone.OscillatorType,
 *  frequency: number,
 *  q: number,
 * }
 */
interface oscParams2 extends oscParams {
  type: Tone.OscillatorType;
}

/**
 * Filter Parameters
 *
 * shape: {
 *  type: BiquadFilterType,
 *  frequency: number,
 *  q: number,
 * }
 */
type oscFilter = {
  type: BiquadFilterType;
  frequency: number;
  q: number;
}

/**
 * LFO Parameters
 *
 * shape: {
 *  type: OscillatorTyp,
 *  Frequency: number,
 *  amplitude: number,
 *  target: ModulationTarget,
 * }
 */
type lfoParams = {
  type: OscillatorType;
  frequency: number;
  amplitude: number;
  target: ModulationTarget;
}

/**
 * LFO Parameters for InstrumentTwo
 *
 * shape: {
 *  type: Tone.OscillatorType,
 *  Frequency: number,
 *  amplitude: number,
 *  target: ModulationTarget,
 * }
 */
interface lfoParams2 extends lfoParams {
  type: Tone.OscillatorType;
}

/**
 * Targets for LFO Or Envelope/ADSR Modulation
 *
 * @value {string} "OSC 1 Frequency"
 * @value {string} "OSC 1 amplitude"
 * @value {string} "OSC 2 Frequency"
 * @value {string} "OSC 2 amplitude"
 * @value {string} "Filter 1 Cutoff"
 * @value {string} "Filter 2 Cutoff"
 * @value {string} "Filter 1 Q"
 * @value {string} "Filter 2 Q"
 * @value {string} "none"
 */
type ModulationTarget =
  "OSC 1 Frequency" | "OSC 2 Frequency" |
  "OSC 1 Amplitude" | "OSC 2 Amplitude" |
  "Filter 1 Cutoff" | "Filter 2 Cutoff" |
  "Filter 1 Q" | "Filter 2 Q" | "none";

