/**
 * Enhanced Zs calculation utilities
 * Uses official BS 7671 Tables 41.2, 41.3, 41.4, 41.6 values
 */

import {
  MCB_RCBO_ZS_LIMITS,
  FUSE_ZS_LIMITS_04S,
  FUSE_ZS_LIMITS_5S,
  getZsLimitFromDeviceString,
  getMcbZsLimit,
  getFuseZsLimit,
  getDisconnectionTimeForCircuit,
  checkZsCompliance as checkZsComplianceFromData,
  applyTemperatureCorrection as applyTempCorrectionFromData,
  applyZsSiteFactor,
  ZS_DEFAULT_TEMP_FACTOR,
  ZS_TEMP_FACTOR_GN3,
  ZS_TEMP_FACTOR_PRACTICAL,
  type DisconnectionTime,
  type MCBCurve,
  type FuseType,
  type ZsLookupResult,
} from '@/data/zsLimits';

export interface ZsCalculationResult {
  zs: number;
  formula: string;
  breakdown: {
    ze: number;
    r1r2: number;
    additionalResistances?: number;
  };
  compliance: {
    isCompliant: boolean;
    maxAllowed: number | null;
    margin: number | null;
    deviceType: string;
    rating: string;
  };
}

// Supports both new (BS standard) and legacy type names for backwards compatibility
export type DeviceType =
  | 'mcb'
  | 'rcbo'
  | 'bs88_2'
  | 'bs88_3'
  | 'bs3036'
  | 'bs1362' // New names
  | 'hrcFuses'
  | 'cartridgeFuses'
  | 'bs3036Fuses'; // Legacy names

export interface ProtectiveDevice {
  type: DeviceType;
  curve?: 'typeB' | 'typeC' | 'typeD';
  rating: number;
  label: string;
  disconnectionTime?: DisconnectionTime;
}

// Map legacy device types to new BS standard types
function mapLegacyType(
  type: DeviceType
): 'mcb' | 'rcbo' | 'bs88_2' | 'bs88_3' | 'bs3036' | 'bs1362' {
  switch (type) {
    case 'hrcFuses':
      return 'bs88_2';
    case 'cartridgeFuses':
      return 'bs88_3';
    case 'bs3036Fuses':
      return 'bs3036';
    default:
      return type as 'mcb' | 'rcbo' | 'bs88_2' | 'bs88_3' | 'bs3036' | 'bs1362';
  }
}

export const calculateZs = (
  r1r2: number,
  ze: number,
  additionalResistances: number = 0
): number => {
  return r1r2 + ze + additionalResistances;
};

export const getMaxZsValue = (
  device: ProtectiveDevice,
  circuitDescription: string = ''
): number | null => {
  const disconnectionTime =
    device.disconnectionTime || getDisconnectionTimeForCircuit(circuitDescription);
  const deviceType = mapLegacyType(device.type);

  if (deviceType === 'mcb' || deviceType === 'rcbo') {
    const curve = device.curve || 'typeB';
    const result = getMcbZsLimit(curve, device.rating, disconnectionTime);
    return result?.maxZs || null;
  }

  // Fuse types
  const result = getFuseZsLimit(deviceType as FuseType, device.rating, disconnectionTime);
  return result?.maxZs || null;
};

export const checkCompliance = (
  zsValue: number,
  device: ProtectiveDevice,
  circuitDescription: string = ''
): ZsCalculationResult['compliance'] => {
  const maxAllowed = getMaxZsValue(device, circuitDescription);
  const isCompliant = maxAllowed ? zsValue <= maxAllowed : false;
  const margin = maxAllowed ? maxAllowed - zsValue : null;

  return {
    isCompliant,
    maxAllowed,
    margin,
    deviceType: device.label,
    rating: `${device.rating}A`,
  };
};

export const performZsCalculation = (
  r1r2: number,
  ze: number,
  device: ProtectiveDevice,
  additionalResistances: number = 0,
  circuitDescription: string = ''
): ZsCalculationResult => {
  const zs = calculateZs(r1r2, ze, additionalResistances);
  const compliance = checkCompliance(zs, device, circuitDescription);

  return {
    zs,
    formula:
      additionalResistances > 0
        ? `Zs = Ze + (R1 + R2) + Additional Resistances`
        : `Zs = Ze + (R1 + R2)`,
    breakdown: {
      ze,
      r1r2,
      additionalResistances: additionalResistances > 0 ? additionalResistances : undefined,
    },
    compliance,
  };
};

// Temperature correction factors (for reference display)
export const TEMPERATURE_CORRECTION_FACTORS = {
  copper: {
    10: 0.93,
    20: 1.0,
    30: 1.07,
    40: 1.14,
    50: 1.21,
    60: 1.28,
    70: 1.36,
  },
  aluminium: {
    10: 0.91,
    20: 1.0,
    30: 1.09,
    40: 1.18,
    50: 1.27,
    60: 1.36,
    70: 1.45,
  },
};

export const applyTemperatureCorrection = (
  resistance: number,
  material: 'copper' | 'aluminium',
  temperature: number
): number => {
  return applyTempCorrectionFromData(resistance, temperature, material);
};

/**
 * Get max Zs from device details (BS Standard, Curve, Rating)
 * Updated to use correct BS 7671 values
 */
export const getMaxZsFromDeviceDetails = (
  bsStandard: string,
  curve: string,
  rating: string,
  circuitDescription: string = ''
): number | null => {
  const ratingNum = parseInt(rating);
  if (isNaN(ratingNum)) return null;

  const disconnectionTime = getDisconnectionTimeForCircuit(circuitDescription);

  // Handle shorthand and full standard formats
  const standardLower = bsStandard.toLowerCase();

  // MCB (BS EN 60898)
  if (standardLower.includes('60898') || standardLower === 'mcb') {
    const curveKey = `type${curve}` as MCBCurve;
    const result = getMcbZsLimit(curveKey, ratingNum, disconnectionTime);
    return result?.maxZs || null;
  }

  // RCBO (BS EN 61009)
  if (standardLower.includes('61009') || standardLower === 'rcbo') {
    const curveKey = `type${curve}` as MCBCurve;
    const result = getMcbZsLimit(curveKey, ratingNum, disconnectionTime);
    return result?.maxZs || null;
  }

  // BS 88-2 HRC Fuses
  if (
    standardLower.includes('88-2') ||
    standardLower.includes('88.2') ||
    (standardLower.includes('88') && !standardLower.includes('88-3'))
  ) {
    const result = getFuseZsLimit('bs88_2', ratingNum, disconnectionTime);
    return result?.maxZs || null;
  }

  // BS 88-3 Fuse System C
  if (standardLower.includes('88-3') || standardLower.includes('88.3')) {
    const result = getFuseZsLimit('bs88_3', ratingNum, disconnectionTime);
    return result?.maxZs || null;
  }

  // BS 1361 Cartridge Fuses (use BS 88-3 values as 1361 was superseded)
  if (standardLower.includes('1361')) {
    const result = getFuseZsLimit('bs88_3', ratingNum, disconnectionTime);
    return result?.maxZs || null;
  }

  // BS 3036 Rewirable Fuses
  if (standardLower.includes('3036')) {
    const result = getFuseZsLimit('bs3036', ratingNum, disconnectionTime);
    return result?.maxZs || null;
  }

  // BS 1362 Plug-Top Fuses
  if (standardLower.includes('1362')) {
    const result = getFuseZsLimit('bs1362', ratingNum, disconnectionTime);
    return result?.maxZs || null;
  }

  return null;
};

/**
 * RCD-based Max Zs — per BS 7671 Reg 411.5.3 / Reg 415.1.1 Note.
 * When the circuit is protected by an RCD, disconnection is by residual
 * current rather than overcurrent, so Zs is limited by UL / IΔn where
 * UL = 50 V (touch voltage limit) and IΔn is the RCD's rated residual
 * operating current.
 *
 *   30 mA  → 50 / 0.030 = 1667 Ω
 *   100 mA → 50 / 0.100 =  500 Ω
 *   300 mA → 50 / 0.300 =  167 Ω
 *   500 mA → 50 / 0.500 =  100 Ω
 *
 * @param rcdRating - '30mA' / '100mA' / '300mA' / '500mA' / number in mA
 */
export const getRcdMaxZs = (rcdRating: string | number | null | undefined): number | null => {
  if (!rcdRating) return null;
  const raw = String(rcdRating).trim().toLowerCase();
  if (!raw || raw === 'n/a' || raw === '—' || raw === '-') return null;
  // Strip 'mA' and any non-digit/decimal chars
  const ma = parseFloat(raw.replace(/[^\d.]/g, ''));
  if (isNaN(ma) || ma <= 0) return null;
  // UL (50 V) / IΔn (A)
  const maxZs = 50 / (ma / 1000);
  return Math.round(maxZs * 100) / 100;
};

/**
 * Is the circuit RCD-protected? True if:
 *   - circuit has its own RCBO / downstream RCD (rcdRating set)
 *   - OR the upstream board has a main RCD (`rcdMainSwitch === 'yes'`)
 *   - OR the protective device type indicates RCBO
 */
export const isCircuitRcdProtected = (opts: {
  rcdRating?: string | null;
  rcdType?: string | null;
  protectiveDeviceType?: string | null;
  bsStandard?: string | null;
  boardHasMainRcd?: boolean;
}): boolean => {
  const { rcdRating, rcdType, protectiveDeviceType, bsStandard, boardHasMainRcd } = opts;
  const hasRcdRating = rcdRating && rcdRating.toString().trim() !== '' && rcdRating !== 'N/A';
  const hasRcdType = rcdType && rcdType.toString().trim() !== '' && rcdType !== 'N/A';
  const isRcbo = /rcbo|61009/i.test(String(protectiveDeviceType || '') + ' ' + String(bsStandard || ''));
  return Boolean(hasRcdRating || hasRcdType || isRcbo || boardHasMainRcd);
};

/**
 * RCD-aware Max Zs lookup.
 *
 * When the circuit is RCD-protected, returns the RCD-based limit (50/IΔn).
 * Otherwise falls back to the BS 7671 overcurrent table (`getMaxZsFromDeviceDetails`).
 *
 * Pass the RCD details + board context alongside the normal device details.
 */
export const getMaxZsWithRcd = (opts: {
  bsStandard: string;
  curve: string;
  rating: string;
  rcdRating?: string | null;
  rcdType?: string | null;
  protectiveDeviceType?: string | null;
  boardHasMainRcd?: boolean;
  boardMainRcdRating?: string | null;
  circuitDescription?: string;
}): { maxZs: number | null; source: 'rcd' | 'overcurrent' | 'unknown'; rcdRating?: string | null } => {
  const rcdProtected = isCircuitRcdProtected({
    rcdRating: opts.rcdRating,
    rcdType: opts.rcdType,
    protectiveDeviceType: opts.protectiveDeviceType,
    bsStandard: opts.bsStandard,
    boardHasMainRcd: opts.boardHasMainRcd,
  });

  if (rcdProtected) {
    // Prefer the circuit's own RCD rating. Fall back to the board's main RCD rating.
    const effectiveRating =
      (opts.rcdRating && String(opts.rcdRating).trim() !== '' && opts.rcdRating !== 'N/A'
        ? opts.rcdRating
        : opts.boardMainRcdRating) || '';
    const rcdMax = getRcdMaxZs(effectiveRating);
    if (rcdMax !== null) {
      return { maxZs: rcdMax, source: 'rcd', rcdRating: effectiveRating };
    }
  }

  const overcurrentMax = getMaxZsFromDeviceDetails(
    opts.bsStandard,
    opts.curve,
    opts.rating,
    opts.circuitDescription || ''
  );
  return {
    maxZs: overcurrentMax,
    source: overcurrentMax !== null ? 'overcurrent' : 'unknown',
  };
};

/**
 * Same as `getMaxZsFromDeviceDetails` but returns the **cold-measured**
 * site limit — the raw Table value × the rule-of-thumb temperature factor
 * (default GN3 ×0.8). Use this for the schedule-of-tests Max Zs column,
 * the validator pass threshold, and any UI a sparky reads on site.
 *
 * Returns `null` when the device isn't recognised.
 */
export const getCorrectedMaxZsFromDeviceDetails = (
  bsStandard: string,
  curve: string,
  rating: string,
  circuitDescription: string = '',
  factor: number = ZS_DEFAULT_TEMP_FACTOR
): number | null => {
  const raw = getMaxZsFromDeviceDetails(bsStandard, curve, rating, circuitDescription);
  if (raw === null) return null;
  return applyZsSiteFactor(raw, factor);
};

// Re-export for convenience
export {
  getDisconnectionTimeForCircuit,
  getZsLimitFromDeviceString,
  applyZsSiteFactor,
  ZS_DEFAULT_TEMP_FACTOR,
  ZS_TEMP_FACTOR_GN3,
  ZS_TEMP_FACTOR_PRACTICAL,
};
export type { DisconnectionTime, ZsLookupResult };
