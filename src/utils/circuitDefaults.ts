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
 * Default description mappings for circuit types
 */
export function getDefaultDescription(circuitType: string): string {
  const descriptions: Record<string, string> = {
    lighting: 'Lighting',
    ring: 'Ring Final Sockets',
    ring_final: 'Ring Final Sockets',
    radial: 'Radial Sockets',
    cooker: 'Cooker',
    shower: 'Shower',
    immersion: 'Immersion Heater',
    smoke_alarm: 'Smoke Alarms',
    smoke_detectors: 'Smoke Alarms',
    ev_charger: 'EV Charger',
    boiler: 'Boiler/CH',
    socket: 'Sockets',
    spur: 'Fused Spur',
    other: 'Circuit',
  };
  return descriptions[circuitType.toLowerCase()] || 'Circuit';
}

/**
 * Base defaults shared by all circuit types
 * BS7671 codes:
 * - Type of Wiring (Column 3): A = T&E (most domestic)
 * - Reference Method (Column 4): C = Clipped direct (most common for T&E)
 */
const baseDefaults: Partial<TestResult> = {
  // Wiring - using BS7671 codes
  typeOfWiring: 'A', // A = Thermoplastic insulated/sheathed (T&E)
  referenceMethod: 'C', // C = Clipped direct (most common)

  // Standards - must match Select option values exactly
  bsStandard: 'MCB (BS EN 60898)',

  // Test defaults - must match Select option values exactly
  insulationTestVoltage: '500V',
  insulationResistance: '>200',
  insulationLiveNeutral: '>200',
  insulationLiveEarth: '>200',
  insulationNeutralEarth: '',
  polarity: 'Correct', // Select expects: Correct, Incorrect, N/A
  functionalTesting: '✓', // Select expects: ✓, ✗, N/A

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
        liveSize: '2.5mm',
        cpcSize: '1.5mm',
        cableSize: '2.5/1.5',
        protectiveDeviceType: 'RCBO',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '32',
        protectiveDeviceKaRating: '6',
        protectiveDevice: 'RCBO B32',
        rcdBsStandard: 'RCBO (BS EN 61009)',
        rcdType: 'A',
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
        liveSize: '2.5mm',
        cpcSize: '1.5mm',
        cableSize: '2.5/1.5',
        protectiveDeviceType: 'RCBO',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '20',
        protectiveDeviceKaRating: '6',
        protectiveDevice: 'RCBO B20',
        rcdBsStandard: 'RCBO (BS EN 61009)',
        rcdType: 'A',
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
        liveSize: '1.5mm',
        cpcSize: '1.0mm',
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
        liveSize: '6.0mm',
        cpcSize: '2.5mm',
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
        liveSize: '10mm',
        cpcSize: '4.0mm',
        cableSize: '10/4',
        protectiveDeviceType: 'RCBO',
        protectiveDeviceCurve: 'B',
        protectiveDeviceRating: '45',
        protectiveDeviceKaRating: '6',
        protectiveDevice: 'RCBO B45',
        rcdBsStandard: 'RCBO (BS EN 61009)',
        rcdType: 'A',
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
        liveSize: '2.5mm',
        cpcSize: '1.5mm',
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
        liveSize: '1.5mm',
        cpcSize: '1.0mm',
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
        liveSize: '2.5mm',
        cpcSize: '1.5mm',
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
 * Circuit naming format: "X - Description" (e.g., "1 - Ring Final Sockets")
 */
export function createCircuitWithDefaults(
  circuitType: CircuitType | string,
  circuitNumber: string,
  description?: string
): TestResult {
  const defaults = getCircuitDefaults(circuitType);

  // Use provided description, or get default from circuit type
  const circuitDescription =
    description || defaults.circuitDescription || getDefaultDescription(circuitType);

  return {
    id: crypto.randomUUID(),
    circuitNumber,
    circuitDesignation: `Way ${circuitNumber}`,
    circuitDescription,
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
 * BS 7671 cable size by breaker rating — RADIAL fallback when circuit type
 * is unknown. The smarter `pickCableSize()` helper below should be preferred.
 */
const CABLE_SIZE_BY_RATING: Record<number, string> = {
  6: '1.0mm', // Lighting
  10: '1.5mm',
  16: '2.5mm',
  20: '2.5mm',
  25: '4.0mm',
  32: '4.0mm', // 32A radial sockets / cooker — for ring use pickCableSize
  40: '6.0mm', // Shower / cooker (≤ short run)
  45: '10mm',
  50: '10mm',
  63: '16mm',
  80: '25mm',
  100: '35mm',
};

/**
 * Smart cable sizing — uses the circuit type, label and rating together to
 * pick the right cable per BS 7671 Appx 4 / OSG. Captures the domestic
 * conventions every UK spark expects:
 *   • Ring final 32A → 2.5mm² (two 2.5mm² conductors in parallel)
 *   • Radial sockets 32A → 4.0mm²
 *   • Shower 40A/45A/50A → 6.0/10/10 mm²
 *   • Cooker 32A → 6.0 mm² (single feed)
 *   • Lighting 6A/10A → 1.0/1.5 mm²
 *   • Immersion 16A → 2.5 mm²
 *   • EV charger 32A → 6.0 mm² (Type B RCD assumed; longer runs may need 10)
 */
export function pickCableSize(
  rating: number | null,
  opts?: {
    circuitType?: string;
    description?: string;
    isRing?: boolean;
    isCooker?: boolean;
    isShower?: boolean;
    isEv?: boolean;
  }
): string | null {
  if (!rating) return null;

  const desc = (opts?.description || opts?.circuitType || '').toLowerCase();
  const isRing =
    opts?.isRing ??
    /\bring\b/.test(desc);
  const isShower = opts?.isShower ?? /\bshower\b/.test(desc);
  const isCooker =
    opts?.isCooker ?? /\bcooker|hob|oven\b/.test(desc);
  const isEv = opts?.isEv ?? /\bev\b|\bcharger\b/.test(desc);
  const isImmersion = /\bimmersion|water heater\b/.test(desc);
  const isLighting = /\blight|lts|lgt\b/.test(desc);

  // Lighting first — overrides rating-only defaults (10A bedroom lighting on 1.5mm²).
  if (isLighting) {
    if (rating <= 6) return '1.0mm';
    return '1.5mm';
  }

  // Shower — high-load, sized by length but always at least 6mm².
  if (isShower) {
    if (rating <= 32) return '6.0mm';
    if (rating <= 40) return '10mm'; // Conservative for typical 40A showers
    return '10mm'; // 45A / 50A
  }

  // Cooker / hob / oven — typically 6mm² up to 40A, 10mm² above.
  if (isCooker) {
    if (rating <= 32) return '6.0mm';
    if (rating <= 40) return '6.0mm';
    return '10mm';
  }

  // EV charger — 32A on 6mm² is standard for short runs.
  if (isEv) {
    if (rating <= 32) return '6.0mm';
    return '10mm';
  }

  // Immersion heater — always 2.5mm² for 16A.
  if (isImmersion) {
    if (rating <= 16) return '2.5mm';
    return '4.0mm';
  }

  // Ring final — 2.5mm² regardless of "rating" because it's two parallel runs.
  if (isRing) {
    return '2.5mm';
  }

  // Radial sockets / general — fall through to the rating table, which now
  // correctly returns 4mm² for a 32A radial.
  return CABLE_SIZE_BY_RATING[rating] || null;
}

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
  MCB: 'MCB (BS EN 60898)',
  RCBO: 'RCBO (BS EN 61009)',
  RCD: 'RCD (BS EN 61008)',
  Fuse: 'Fuse (BS 88)',
  AFDD: 'MCB (BS EN 60898)',
  MCCB: 'Other',
  Isolator: 'Other',
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
