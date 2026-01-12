/**
 * Circuit Defaults for Voice Assistant
 *
 * Provides BS7671-compliant default values for all 32+ fields
 * when adding circuits via voice command.
 */

import type { TestResult } from '@/types/testResult';

export type CircuitType =
  | 'ring_final'
  | 'radial'
  | 'lighting'
  | 'cooker'
  | 'shower'
  | 'immersion'
  | 'smoke_detectors'
  | 'spur'
  | 'other';

/**
 * Base defaults shared by all circuit types
 */
const baseDefaults: Partial<TestResult> = {
  // Wiring
  typeOfWiring: 'Thermoplastic 70°C (ref. Table 4D5)',
  referenceMethod: 'Reference Method C',

  // Standards
  bsStandard: 'BS EN 60898',

  // Test defaults
  insulationTestVoltage: '500',
  insulationResistance: '>200',
  insulationLiveNeutral: '>200',
  insulationLiveEarth: '>200',
  insulationNeutralEarth: '',
  polarity: 'OK',
  functionalTesting: 'OK',

  // Empty defaults
  zs: '', // Auto-calculated
  maxZs: '', // Auto-calculated
  pfc: '',
  pfcLiveNeutral: '',
  pfcLiveEarth: '',
  r1r2: '',
  r2: '',
  rcdOneX: '',
  rcdFiveX: '',
  rcdTestButton: '',
  afddTest: '',
  notes: '',

  // Ring circuit fields (empty unless ring final)
  ringR1: '',
  ringRn: '',
  ringR2: '',
  ringContinuityLive: '',
  ringContinuityNeutral: '',

  // Three-phase (empty unless specified)
  phaseType: '',
  phaseRotation: '',
  phaseBalanceL1: '',
  phaseBalanceL2: '',
  phaseBalanceL3: '',
  lineToLineVoltage: '',

  // Legacy fields
  protectiveDeviceLocation: '',
  protectiveDevice: '',
  cableSize: '',
};

/**
 * Get default values for a specific circuit type
 */
export function getCircuitDefaults(circuitType: CircuitType | string): Partial<TestResult> {
  switch (circuitType) {
    case 'ring_final':
      return {
        ...baseDefaults,
        circuitType: 'Ring Final',
        type: 'Ring Final',
        circuitDescription: 'Ring final circuit',
        liveSize: '2.5',
        cpcSize: '1.5',
        cableSize: '2.5/1.5',
        protectiveDeviceType: 'RCBO',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '32',
        protectiveDeviceKaRating: '6',
        protectiveDevice: 'RCBO B32',
        rcdBsStandard: 'BS EN 61008',
        rcdType: 'Type A',
        rcdRating: '30',
        rcdRatingA: '32',
        pointsServed: '',
      };

    case 'radial':
      return {
        ...baseDefaults,
        circuitType: 'Radial',
        type: 'Radial',
        circuitDescription: 'Radial circuit',
        liveSize: '2.5',
        cpcSize: '1.5',
        cableSize: '2.5/1.5',
        protectiveDeviceType: 'RCBO',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '20',
        protectiveDeviceKaRating: '6',
        protectiveDevice: 'RCBO B20',
        rcdBsStandard: 'BS EN 61008',
        rcdType: 'Type A',
        rcdRating: '30',
        rcdRatingA: '20',
        pointsServed: '',
      };

    case 'lighting':
      return {
        ...baseDefaults,
        circuitType: 'Lighting',
        type: 'Lighting',
        circuitDescription: 'Lighting circuit',
        liveSize: '1.5',
        cpcSize: '1.0',
        cableSize: '1.5/1.0',
        protectiveDeviceType: 'MCB',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '6',
        protectiveDeviceKaRating: '6',
        protectiveDevice: 'MCB B6',
        rcdBsStandard: '',
        rcdType: '',
        rcdRating: '',
        rcdRatingA: '',
        pointsServed: '',
      };

    case 'cooker':
      return {
        ...baseDefaults,
        circuitType: 'Cooker',
        type: 'Cooker',
        circuitDescription: 'Cooker circuit',
        liveSize: '6',
        cpcSize: '2.5',
        cableSize: '6/2.5',
        protectiveDeviceType: 'MCB',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '32',
        protectiveDeviceKaRating: '6',
        protectiveDevice: 'MCB B32',
        rcdBsStandard: '',
        rcdType: '',
        rcdRating: '',
        rcdRatingA: '',
        pointsServed: '1',
      };

    case 'shower':
      return {
        ...baseDefaults,
        circuitType: 'Shower',
        type: 'Shower',
        circuitDescription: 'Shower circuit',
        liveSize: '10',
        cpcSize: '4',
        cableSize: '10/4',
        protectiveDeviceType: 'RCBO',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '45',
        protectiveDeviceKaRating: '6',
        protectiveDevice: 'RCBO B45',
        rcdBsStandard: 'BS EN 61008',
        rcdType: 'Type A',
        rcdRating: '30',
        rcdRatingA: '45',
        pointsServed: '1',
      };

    case 'immersion':
      return {
        ...baseDefaults,
        circuitType: 'Immersion',
        type: 'Immersion',
        circuitDescription: 'Immersion heater',
        liveSize: '2.5',
        cpcSize: '1.5',
        cableSize: '2.5/1.5',
        protectiveDeviceType: 'MCB',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '16',
        protectiveDeviceKaRating: '6',
        protectiveDevice: 'MCB B16',
        rcdBsStandard: '',
        rcdType: '',
        rcdRating: '',
        rcdRatingA: '',
        pointsServed: '1',
      };

    case 'smoke_detectors':
      return {
        ...baseDefaults,
        circuitType: 'Smoke Detectors',
        type: 'Smoke Detectors',
        circuitDescription: 'Smoke/fire alarm',
        liveSize: '1.5',
        cpcSize: '1.0',
        cableSize: '1.5/1.0',
        protectiveDeviceType: 'MCB',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '6',
        protectiveDeviceKaRating: '6',
        protectiveDevice: 'MCB B6',
        rcdBsStandard: '',
        rcdType: '',
        rcdRating: '',
        rcdRatingA: '',
        pointsServed: '',
      };

    case 'spur':
      return {
        ...baseDefaults,
        circuitType: 'Fused Spur',
        type: 'Fused Spur',
        circuitDescription: 'Fused connection unit',
        liveSize: '2.5',
        cpcSize: '1.5',
        cableSize: '2.5/1.5',
        protectiveDeviceType: 'Fuse',
        protectiveDeviceCurve: '',
        protectiveDeviceRating: '13',
        protectiveDeviceKaRating: '',
        protectiveDevice: 'Fuse 13A',
        rcdBsStandard: '',
        rcdType: '',
        rcdRating: '',
        rcdRatingA: '',
        pointsServed: '1',
      };

    default:
      return {
        ...baseDefaults,
        circuitType: 'Other',
        type: 'Other',
        circuitDescription: '',
        liveSize: '',
        cpcSize: '',
        cableSize: '',
        protectiveDeviceType: '',
        protectiveDeviceCurve: '',
        protectiveDeviceRating: '',
        protectiveDeviceKaRating: '',
        protectiveDevice: '',
        rcdBsStandard: '',
        rcdType: '',
        rcdRating: '',
        rcdRatingA: '',
        pointsServed: '',
      };
  }
}

/**
 * Create a complete TestResult with defaults for the given circuit type
 */
export function createCircuitWithDefaults(
  circuitType: CircuitType | string,
  circuitNumber: string,
  description?: string
): TestResult {
  const defaults = getCircuitDefaults(circuitType);

  return {
    id: crypto.randomUUID(),
    circuitNumber,
    circuitDesignation: `C${circuitNumber}`,
    circuitDescription: description || defaults.circuitDescription || '',
    circuitType: defaults.circuitType || 'Other',
    type: defaults.type || 'Other',
    typeOfWiring: defaults.typeOfWiring || '',
    referenceMethod: defaults.referenceMethod || '',
    pointsServed: defaults.pointsServed || '',
    liveSize: defaults.liveSize || '',
    cpcSize: defaults.cpcSize || '',
    cableSize: defaults.cableSize || '',
    bsStandard: defaults.bsStandard || '',
    protectiveDeviceType: defaults.protectiveDeviceType || '',
    protectiveDeviceCurve: defaults.protectiveDeviceCurve || '',
    protectiveDeviceRating: defaults.protectiveDeviceRating || '',
    protectiveDeviceKaRating: defaults.protectiveDeviceKaRating || '',
    protectiveDeviceLocation: defaults.protectiveDeviceLocation || '',
    protectiveDevice: defaults.protectiveDevice || '',
    maxZs: defaults.maxZs || '',
    rcdBsStandard: defaults.rcdBsStandard || '',
    rcdType: defaults.rcdType || '',
    rcdRating: defaults.rcdRating || '',
    rcdRatingA: defaults.rcdRatingA || '',
    ringR1: defaults.ringR1 || '',
    ringRn: defaults.ringRn || '',
    ringR2: defaults.ringR2 || '',
    ringContinuityLive: defaults.ringContinuityLive || '',
    ringContinuityNeutral: defaults.ringContinuityNeutral || '',
    r1r2: defaults.r1r2 || '',
    r2: defaults.r2 || '',
    insulationTestVoltage: defaults.insulationTestVoltage || '',
    insulationLiveNeutral: defaults.insulationLiveNeutral || '',
    insulationLiveEarth: defaults.insulationLiveEarth || '',
    insulationResistance: defaults.insulationResistance || '',
    insulationNeutralEarth: defaults.insulationNeutralEarth || '',
    polarity: defaults.polarity || '',
    zs: defaults.zs || '',
    rcdOneX: defaults.rcdOneX || '',
    rcdTestButton: defaults.rcdTestButton || '',
    afddTest: defaults.afddTest || '',
    rcdFiveX: defaults.rcdFiveX || '',
    pfc: defaults.pfc || '',
    pfcLiveNeutral: defaults.pfcLiveNeutral || '',
    pfcLiveEarth: defaults.pfcLiveEarth || '',
    functionalTesting: defaults.functionalTesting || '',
    notes: defaults.notes || '',
    phaseType: defaults.phaseType || '',
    phaseRotation: defaults.phaseRotation || '',
    phaseBalanceL1: defaults.phaseBalanceL1 || '',
    phaseBalanceL2: defaults.phaseBalanceL2 || '',
    phaseBalanceL3: defaults.phaseBalanceL3 || '',
    lineToLineVoltage: defaults.lineToLineVoltage || '',
    autoFilled: true,
  };
}

/**
 * Get all available circuit types
 */
export function getCircuitTypes(): { value: CircuitType; label: string }[] {
  return [
    { value: 'ring_final', label: 'Ring Final' },
    { value: 'radial', label: 'Radial' },
    { value: 'lighting', label: 'Lighting' },
    { value: 'cooker', label: 'Cooker' },
    { value: 'shower', label: 'Shower' },
    { value: 'immersion', label: 'Immersion' },
    { value: 'smoke_detectors', label: 'Smoke Detectors' },
    { value: 'spur', label: 'Fused Spur' },
    { value: 'other', label: 'Other' },
  ];
}

/**
 * BS 7671 cable size by breaker rating
 * Maps protective device rating to minimum cable size
 */
const CABLE_SIZE_BY_RATING: Record<number, string> = {
  6: '1.5mm',   // Lighting
  10: '1.5mm',
  16: '2.5mm',  // Immersion
  20: '2.5mm',  // Radial
  25: '4.0mm',
  32: '2.5mm',  // Ring final (or 4mm radial)
  40: '6.0mm',
  45: '10mm',   // Shower
  50: '10mm',
  63: '16mm',
  80: '25mm',
  100: '35mm',
};

/**
 * CPC size for given live conductor size
 */
const CPC_BY_LIVE: Record<string, string> = {
  '1.0mm': '1.0mm',
  '1.5mm': '1.0mm',
  '2.5mm': '1.5mm',
  '4.0mm': '2.5mm',
  '6.0mm': '2.5mm',
  '10mm': '4.0mm',
  '16mm': '6.0mm',
  '25mm': '10mm',
  '35mm': '16mm',
};

/**
 * Map detected device category to BS Standard
 */
export const BS_STANDARD_MAP: Record<string, string> = {
  'MCB': 'MCB (BS EN 60898)',
  'RCBO': 'RCBO (BS EN 61009)',
  'RCD': 'RCD (BS EN 61008)',
  'Fuse': 'Fuse (BS 88)',
  'AFDD': 'MCB (BS EN 60898)',
  'MCCB': 'Other',
  'Isolator': 'Other',
};

/**
 * Get cable size for a given breaker rating
 */
export function getCableSizeForRating(rating: number | null): string | null {
  if (!rating) return null;
  return CABLE_SIZE_BY_RATING[rating] || null;
}

/**
 * Get CPC size for a given live conductor size
 */
export function getCpcForLive(live: string | null): string | null {
  if (!live) return null;
  return CPC_BY_LIVE[live] || null;
}
