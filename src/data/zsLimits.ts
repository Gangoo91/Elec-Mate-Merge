/**
 * BS 7671 Maximum Earth Fault Loop Impedance (Zs) Values
 * 
 * Source: BS 7671:2018+A3:2024 Tables 41.2, 41.3, 41.4, 41.6
 * 
 * IMPORTANT NOTES:
 * - All values are in Ohms (Ω)
 * - Values determined using Cmin = 0.95 (Note 1 in BS 7671)
 * - 0.4s disconnection time for final circuits (Reg 411.3.2.2)
 * - 5s disconnection time for distribution circuits (Reg 411.3.2.3)
 * - Measured values should be compared after temperature correction if tested at different temperatures
 */

// =============================================================================
// TABLE 41.3 - MCBs and RCBOs to BS EN 60898 and BS EN 61009 (230V)
// =============================================================================

export const MCB_RCBO_ZS_LIMITS = {
  // Type B - Table 41.3(a)
  typeB: {
    '0.4s': {
      3: 14.57, 6: 7.28, 10: 4.37, 16: 2.73, 20: 2.19, 25: 1.75,
      32: 1.37, 40: 1.09, 50: 0.87, 63: 0.69, 80: 0.55, 100: 0.44, 125: 0.35
    },
    '5s': {
      3: 14.57, 6: 7.28, 10: 4.37, 16: 2.73, 20: 2.19, 25: 1.75,
      32: 1.37, 40: 1.09, 50: 0.87, 63: 0.69, 80: 0.55, 100: 0.44, 125: 0.35
    }
  },
  // Type C - Table 41.3(b)
  typeC: {
    '0.4s': {
      6: 3.64, 10: 2.19, 16: 1.37, 20: 1.09, 25: 0.87,
      32: 0.68, 40: 0.55, 50: 0.44, 63: 0.35, 80: 0.27, 100: 0.22, 125: 0.17
    },
    '5s': {
      6: 3.64, 10: 2.19, 16: 1.37, 20: 1.09, 25: 0.87,
      32: 0.68, 40: 0.55, 50: 0.44, 63: 0.35, 80: 0.27, 100: 0.22, 125: 0.17
    }
  },
  // Type D - Table 41.3(c)
  typeD: {
    '0.4s': {
      6: 1.82, 10: 1.09, 16: 0.68, 20: 0.55, 25: 0.44,
      32: 0.34, 40: 0.27, 50: 0.22, 63: 0.17, 80: 0.14, 100: 0.11, 125: 0.09
    },
    '5s': {
      6: 3.64, 10: 2.19, 16: 1.37, 20: 1.09, 25: 0.87,
      32: 0.68, 40: 0.55, 50: 0.44, 63: 0.35, 80: 0.27, 100: 0.22, 125: 0.17
    }
  }
} as const;

// =============================================================================
// TABLE 41.2 - Fuses at 0.4s Disconnection Time (230V)
// =============================================================================

export const FUSE_ZS_LIMITS_04S = {
  // BS 88-2.2 gG Fuses (BS EN 60269-2) - Table 41.2(a)
  bs88_2: {
    2: 33.1, 4: 15.6, 6: 7.80, 10: 4.65, 16: 2.43, 20: 1.68,
    25: 1.29, 32: 0.99, 40: 0.75, 50: 0.57, 63: 0.44
  },
  // BS 88-3 Fuse System C (BS EN 60269-3) - Table 41.2(b)
  bs88_3: {
    5: 9.93, 16: 2.30, 20: 1.93, 32: 0.91, 45: 0.57, 63: 0.36
  },
  // BS 3036 Rewirable Fuses - Table 41.2(c)
  bs3036: {
    5: 9.10, 15: 2.43, 20: 1.68, 30: 1.04, 45: 0.56, 60: 0.40
  },
  // BS 1362 Plug-Top Fuses - Table 41.2(d)
  bs1362: {
    3: 15.6, 13: 2.30
  }
} as const;

// =============================================================================
// TABLE 41.4 - Fuses at 5s Disconnection Time (230V)
// =============================================================================

export const FUSE_ZS_LIMITS_5S = {
  // BS 88-2.2 gG Fuses - Table 41.4(a)
  bs88_2: {
    2: 44, 4: 21, 6: 12, 10: 6.8, 16: 4.0, 20: 2.8,
    25: 2.2, 32: 1.7, 40: 1.3, 50: 0.99, 63: 0.78,
    80: 0.55, 100: 0.42, 125: 0.32, 160: 0.27, 200: 0.18
  },
  // BS 88-3 Fuse System C - Table 41.4(b)
  bs88_3: {
    5: 14.6, 16: 3.9, 20: 3.2, 32: 1.6, 45: 1.0, 63: 0.68, 80: 0.51, 100: 0.38
  },
  // BS 3036 Rewirable Fuses - Table 41.4(c)
  bs3036: {
    5: 16.8, 15: 5.08, 20: 3.64, 30: 2.51, 45: 1.51, 60: 1.07, 100: 0.51
  },
  // BS 1362 Plug-Top Fuses - Table 41.4(d)
  bs1362: {
    3: 22.0, 13: 3.64
  }
} as const;

// =============================================================================
// TABLE 41.5 - RCDs to BS EN 61008-1 and BS EN 61009-1 (230V)
// Maximum Zs for RCD protection per Regulation 411.5.3
// =============================================================================

export const RCD_ZS_LIMITS = {
  // Rated residual operating current (IΔn) in mA -> Max Zs in Ω
  // Formula: Zs = 50V / (IΔn × 5) for 230V systems
  30: 1667,    // 30mA RCD - Note: Earth electrode resistance ≤ 200Ω
  100: 500,    // 100mA RCD - Note: Earth electrode resistance ≤ 200Ω  
  300: 167,    // 300mA RCD
  500: 100     // 500mA RCD
} as const;

// =============================================================================
// TABLE 41.6 - Reduced Low Voltage Systems (55V and 63.5V)
// MCBs to BS EN 60898 and Fuses to BS 88-2
// =============================================================================

export const REDUCED_VOLTAGE_ZS_LIMITS = {
  // 55V Systems - 5s disconnection time
  '55V': {
    // MCB Type B
    typeB: {
      3: 3.48, 6: 1.74, 10: 1.05, 16: 0.65, 20: 0.52, 25: 0.42,
      32: 0.33, 40: 0.26, 50: 0.21, 63: 0.17, 80: 0.13, 100: 0.10, 125: 0.08
    },
    // MCB Type C
    typeC: {
      6: 0.87, 10: 0.52, 16: 0.33, 20: 0.26, 25: 0.21,
      32: 0.16, 40: 0.13, 50: 0.10, 63: 0.08, 80: 0.06, 100: 0.05, 125: 0.04
    },
    // MCB Type D
    typeD: {
      6: 0.44, 10: 0.26, 16: 0.16, 20: 0.13, 25: 0.10,
      32: 0.08, 40: 0.06, 50: 0.05, 63: 0.04, 80: 0.03, 100: 0.03, 125: 0.02
    },
    // BS 88-2 gG Fuses
    bs88_2: {
      6: 2.90, 10: 1.63, 16: 0.95, 20: 0.67, 25: 0.52,
      32: 0.42, 40: 0.31, 50: 0.24, 63: 0.19, 80: 0.13, 100: 0.12, 125: 0.08
    }
  },
  // 63.5V Systems - 5s disconnection time
  '63.5V': {
    // MCB Type B
    typeB: {
      3: 4.02, 6: 2.01, 10: 1.21, 16: 0.75, 20: 0.60, 25: 0.48,
      32: 0.38, 40: 0.30, 50: 0.24, 63: 0.19, 80: 0.15, 100: 0.12, 125: 0.10
    },
    // MCB Type C
    typeC: {
      6: 1.00, 10: 0.60, 16: 0.38, 20: 0.30, 25: 0.24,
      32: 0.19, 40: 0.15, 50: 0.12, 63: 0.10, 80: 0.07, 100: 0.06, 125: 0.05
    },
    // MCB Type D
    typeD: {
      6: 0.50, 10: 0.30, 16: 0.19, 20: 0.15, 25: 0.12,
      32: 0.09, 40: 0.07, 50: 0.06, 63: 0.05, 80: 0.04, 100: 0.03, 125: 0.02
    },
    // BS 88-2 gG Fuses
    bs88_2: {
      6: 3.35, 10: 1.89, 16: 1.10, 20: 0.77, 25: 0.60,
      32: 0.48, 40: 0.35, 50: 0.27, 63: 0.22, 80: 0.15, 100: 0.14, 125: 0.09
    }
  }
} as const;

// =============================================================================
// Types
// =============================================================================

export type DisconnectionTime = '0.4s' | '5s';
export type MCBCurve = 'typeB' | 'typeC' | 'typeD';
export type FuseType = 'bs88_2' | 'bs88_3' | 'bs3036' | 'bs1362';
export type RcdRating = 30 | 100 | 300 | 500;

export interface ZsLookupResult {
  maxZs: number;
  source: string;
  disconnectionTime: DisconnectionTime;
  notes?: string;
}

// =============================================================================
// Lookup Functions
// =============================================================================

/**
 * Get maximum Zs for MCB/RCBO devices
 */
export function getMcbZsLimit(
  curve: MCBCurve,
  rating: number,
  disconnectionTime: DisconnectionTime = '0.4s'
): ZsLookupResult | null {
  const curveData = MCB_RCBO_ZS_LIMITS[curve];
  if (!curveData) return null;

  const timeData = curveData[disconnectionTime];
  const maxZs = timeData[rating as keyof typeof timeData];

  if (maxZs === undefined) return null;

  return {
    maxZs,
    source: `BS 7671 Table 41.3 (${curve.replace('type', 'Type ')})`,
    disconnectionTime,
    notes: `Cmin = 0.95 applied`
  };
}

/**
 * Get maximum Zs for fuse devices
 */
export function getFuseZsLimit(
  fuseType: FuseType,
  rating: number,
  disconnectionTime: DisconnectionTime = '0.4s'
): ZsLookupResult | null {
  const limits = disconnectionTime === '0.4s' ? FUSE_ZS_LIMITS_04S : FUSE_ZS_LIMITS_5S;
  const fuseData = limits[fuseType];

  if (!fuseData) return null;

  const maxZs = fuseData[rating as keyof typeof fuseData];
  if (maxZs === undefined) return null;

  const tableNum = disconnectionTime === '0.4s' ? '41.2' : '41.4';
  const fuseNames: Record<FuseType, string> = {
    bs88_2: 'BS 88-2.2 gG',
    bs88_3: 'BS 88-3',
    bs3036: 'BS 3036',
    bs1362: 'BS 1362'
  };

  return {
    maxZs,
    source: `BS 7671 Table ${tableNum} (${fuseNames[fuseType]})`,
    disconnectionTime,
    notes: `Cmin = 0.95 applied`
  };
}

/**
 * Determine disconnection time based on circuit type
 * Per BS 7671 Regulation 411.3.2
 */
export function getDisconnectionTimeForCircuit(circuitDescription: string): DisconnectionTime {
  const desc = circuitDescription.toLowerCase();
  
  // Distribution circuits use 5s (Reg 411.3.2.3)
  if (
    desc.includes('distribution') ||
    desc.includes('sub-main') ||
    desc.includes('submain') ||
    desc.includes('busbar') ||
    desc.includes('db') ||
    desc.includes('consumer unit supply') ||
    desc.includes('main switch')
  ) {
    return '5s';
  }
  
  // Final circuits use 0.4s (Reg 411.3.2.2)
  return '0.4s';
}

/**
 * Parse device type string and get Zs limit
 */
export function getZsLimitFromDeviceString(
  deviceType: string,
  rating: number,
  circuitDescription: string = ''
): ZsLookupResult | null {
  const device = deviceType.toLowerCase();
  const disconnectionTime = getDisconnectionTimeForCircuit(circuitDescription);

  // MCCB detection - treat similar to MCB Type C/D depending on context
  if (device.includes('mccb') || device.includes('moulded case')) {
    // MCCBs typically have adjustable trip characteristics
    // Use Type C values as default (thermal-magnetic trip)
    // For high inrush loads, Type D may be more appropriate
    let curve: MCBCurve = 'typeC'; // Default for MCCBs
    if (device.includes('type d') || device.includes('high inrush')) {
      curve = 'typeD';
    } else if (device.includes('type b')) {
      curve = 'typeB';
    }
    const result = getMcbZsLimit(curve, rating, disconnectionTime);
    if (result) {
      result.source = result.source.replace('Table 41.3', 'Table 41.3 (MCCB)');
      result.notes = 'MCCB - verify instantaneous trip setting matches assumed curve';
    }
    return result;
  }

  // MCB/RCBO detection
  if (device.includes('mcb') || device.includes('rcbo') || device.includes('miniature')) {
    let curve: MCBCurve = 'typeB'; // Default
    if (device.includes('type c') || device.includes('c ') || device.match(/\bc\d/)) {
      curve = 'typeC';
    } else if (device.includes('type d') || device.includes('d ') || device.match(/\bd\d/)) {
      curve = 'typeD';
    }
    return getMcbZsLimit(curve, rating, disconnectionTime);
  }

  // Fuse detection - handles both device type and BS standard formats
  if (device.includes('fuse') || device.includes('bs 88') || device.includes('bs88') ||
      device.includes('bs 3036') || device.includes('bs3036') || device.includes('bs 1361') ||
      device.includes('bs1361') || device.includes('bs 1362') || device.includes('bs1362')) {
    let fuseType: FuseType = 'bs88_2'; // Default HRC

    if (device.includes('88-3') || device.includes('88.3') || device.includes('bs88-3') ||
        device.includes('system c') || device.includes('bs 88-3')) {
      fuseType = 'bs88_3';
    } else if (device.includes('88-2') || device.includes('88.2') || device.includes('bs88-2') ||
               device.includes('hrc') || device.includes('gg') || device.includes('bs 88-2') ||
               device === 'fuse-bs88' || device.includes('bs 88') || device.includes('bs88')) {
      fuseType = 'bs88_2';
    } else if (device.includes('3036') || device.includes('rewirable') || device.includes('semi-enclosed')) {
      fuseType = 'bs3036';
    } else if (device.includes('1362') || device.includes('plug')) {
      fuseType = 'bs1362';
    } else if (device.includes('1361') || device.includes('cartridge')) {
      // BS 1361 uses similar values to BS 88-3 (System C)
      fuseType = 'bs88_3';
    }

    return getFuseZsLimit(fuseType, rating, disconnectionTime);
  }

  // RCD detection
  if (device.includes('rcd') || device.includes('residual')) {
    return getRcdZsLimit(rating as RcdRating);
  }

  return null;
}

/**
 * Get maximum Zs for RCD protection
 * Per BS 7671 Table 41.5 and Regulation 411.5.3
 */
export function getRcdZsLimit(ratedResidualCurrent: RcdRating): ZsLookupResult | null {
  const maxZs = RCD_ZS_LIMITS[ratedResidualCurrent];
  if (maxZs === undefined) return null;

  const hasElectrodeNote = ratedResidualCurrent <= 100;
  
  return {
    maxZs,
    source: `BS 7671 Table 41.5 (RCD ${ratedResidualCurrent}mA)`,
    disconnectionTime: '0.4s',
    notes: hasElectrodeNote 
      ? 'Earth electrode resistance should not exceed 200Ω (Note 2)' 
      : 'Cmin = 0.95 applied'
  };
}

/**
 * Check if measured Zs is compliant
 */
export function checkZsCompliance(
  measuredZs: number,
  maxZs: number
): { compliant: boolean; margin: number; marginPercent: number } {
  const margin = maxZs - measuredZs;
  const marginPercent = (margin / maxZs) * 100;
  
  return {
    compliant: measuredZs <= maxZs,
    margin,
    marginPercent
  };
}

/**
 * Temperature correction for Zs measurements
 * Per BS 7671 Appendix 14
 */
export function applyTemperatureCorrection(
  measuredZs: number,
  testTemperature: number,
  conductorMaterial: 'copper' | 'aluminium' = 'copper',
  referenceTemperature: number = 70 // Operating temperature
): number {
  // Temperature coefficient per °C
  const alpha = conductorMaterial === 'copper' ? 0.00393 : 0.00403;
  
  // Correction factor
  const factor = (1 + alpha * (referenceTemperature - 20)) / (1 + alpha * (testTemperature - 20));
  
  return measuredZs * factor;
}
