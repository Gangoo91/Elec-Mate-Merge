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
  type DisconnectionTime,
  type MCBCurve,
  type FuseType,
  type ZsLookupResult
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
  | 'mcb' | 'rcbo' 
  | 'bs88_2' | 'bs88_3' | 'bs3036' | 'bs1362'  // New names
  | 'hrcFuses' | 'cartridgeFuses' | 'bs3036Fuses';  // Legacy names

export interface ProtectiveDevice {
  type: DeviceType;
  curve?: 'typeB' | 'typeC' | 'typeD';
  rating: number;
  label: string;
  disconnectionTime?: DisconnectionTime;
}

// Map legacy device types to new BS standard types
function mapLegacyType(type: DeviceType): 'mcb' | 'rcbo' | 'bs88_2' | 'bs88_3' | 'bs3036' | 'bs1362' {
  switch (type) {
    case 'hrcFuses': return 'bs88_2';
    case 'cartridgeFuses': return 'bs88_3';
    case 'bs3036Fuses': return 'bs3036';
    default: return type as 'mcb' | 'rcbo' | 'bs88_2' | 'bs88_3' | 'bs3036' | 'bs1362';
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
  const disconnectionTime = device.disconnectionTime || getDisconnectionTimeForCircuit(circuitDescription);
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
    rating: `${device.rating}A`
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
    formula: additionalResistances > 0 
      ? `Zs = Ze + (R1 + R2) + Additional Resistances`
      : `Zs = Ze + (R1 + R2)`,
    breakdown: {
      ze,
      r1r2,
      additionalResistances: additionalResistances > 0 ? additionalResistances : undefined
    },
    compliance
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
    70: 1.36
  },
  aluminium: {
    10: 0.91,
    20: 1.0,
    30: 1.09,
    40: 1.18,
    50: 1.27,
    60: 1.36,
    70: 1.45
  }
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
  if (standardLower.includes('88-2') || standardLower.includes('88.2') || 
      (standardLower.includes('88') && !standardLower.includes('88-3'))) {
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

// Re-export for convenience
export { getDisconnectionTimeForCircuit, getZsLimitFromDeviceString };
export type { DisconnectionTime, ZsLookupResult };
