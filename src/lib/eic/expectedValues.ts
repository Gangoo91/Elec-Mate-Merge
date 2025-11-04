// EIC Expected Test Values Calculator
// BS 7671:2018+A3:2024 - Testing and Verification

export interface ExpectedTestValues {
  r1r2: {
    value: string;
    at20C: number;
    at70C: number;
    regulation: string;
  };
  zs: {
    value: number;
    maxPermitted: number;
    compliant: boolean;
    regulation: string;
  };
  insulationResistance: {
    testVoltage: string;
    minResistance: string;
    regulation: string;
  };
  earthFaultLoopImpedance: {
    measured: string;
    maximum: number;
    margin: string;
  };
}

// BS 7671 Table 9A - Conductor resistance (mΩ/m at 20°C)
const CONDUCTOR_RESISTANCE_20C: Record<number, number> = {
  1.0: 18.1,
  1.5: 12.1,
  2.5: 7.41,
  4.0: 4.61,
  6.0: 3.08,
  10: 1.83,
  16: 1.15,
  25: 0.727,
  35: 0.524,
  50: 0.387,
  70: 0.268,
  95: 0.193,
  120: 0.153,
  150: 0.124,
  185: 0.0991,
  240: 0.0754,
  300: 0.0601,
  400: 0.0470
};

/**
 * Calculate expected R1+R2 based on cable sizes and length
 * BS 7671 Reg 612.2 - Continuity of protective conductors
 */
export function calculateExpectedR1R2(
  liveSize: number,
  cpcSize: number,
  length: number
): { at20C: number; at70C: number; formatted: string } {
  const r1 = CONDUCTOR_RESISTANCE_20C[liveSize] || 0;
  const r2 = CONDUCTOR_RESISTANCE_20C[cpcSize] || 0;
  
  // Calculate at 20°C
  const r1r2At20C = ((r1 + r2) * length) / 1000; // Convert mΩ to Ω
  
  // Apply 1.2 multiplier for operating temperature (70°C for thermoplastic)
  // BS 7671 requires testing to account for conductor temperature rise
  const r1r2At70C = r1r2At20C * 1.2;
  
  return {
    at20C: Number(r1r2At20C.toFixed(4)),
    at70C: Number(r1r2At70C.toFixed(4)),
    formatted: `${r1r2At70C.toFixed(3)}Ω`
  };
}

/**
 * Calculate expected Zs (Ze + R1+R2)
 * BS 7671 Reg 612.9 - Earth fault loop impedance
 */
export function calculateExpectedZs(
  ze: number,
  r1r2: number
): number {
  return Number((ze + r1r2).toFixed(3));
}

/**
 * Determine insulation resistance test requirements based on voltage
 * BS 7671 Table 61 - Minimum insulation resistance values
 */
export function getExpectedInsulationResistance(
  voltage: number,
  circuitType: 'SELV' | 'standard' = 'standard'
): { testVoltage: string; minResistance: string; regulation: string } {
  // BS 7671 Table 61
  if (circuitType === 'SELV' && voltage <= 50) {
    return {
      testVoltage: '250V DC',
      minResistance: '≥0.5 MΩ',
      regulation: 'BS 7671 Table 61 (SELV/PELV)'
    };
  }
  
  if (voltage <= 500) {
    return {
      testVoltage: '500V DC',
      minResistance: '≥1.0 MΩ',
      regulation: 'BS 7671 Table 61 (LV up to 500V)'
    };
  }
  
  return {
    testVoltage: '1000V DC',
    minResistance: '≥1.0 MΩ',
    regulation: 'BS 7671 Table 61 (LV above 500V)'
  };
}

/**
 * Calculate expected polarity test result
 * BS 7671 Reg 612.6 - Polarity
 */
export function getExpectedPolarity(): string {
  return 'Correct - Line conductor connected to center contact of lampholder/switching contacts';
}

/**
 * Get maximum Zs for given protective device
 * BS 7671 Appendix 3 - Maximum disconnection times
 */
export function getMaxZsForDevice(params: {
  deviceType: string;
  rating: number;
  curve?: string;
  voltage: number;
  disconnectionTime: number;
}): number {
  const { deviceType, rating, curve, voltage, disconnectionTime } = params;
  
  // Simplified lookup - in production, use full BS 7671 Appendix 3 tables
  // Maximum Zs = (0.8 × Uo) / Ia
  // Where Ia is current causing disconnection in required time
  
  let ia: number;
  
  if (deviceType === 'MCB' || deviceType === 'RCBO') {
    // For MCBs: Ia typically 5× In for Type B, 10× In for Type C, 20× In for Type D
    const multipliers = { B: 5, C: 10, D: 20 };
    const multiplier = multipliers[curve as keyof typeof multipliers] || 5;
    ia = rating * multiplier;
  } else if (deviceType === 'fuse') {
    // For fuses: Ia typically 2× In for 0.4s disconnection
    ia = rating * 2;
  } else {
    ia = rating * 5; // Default
  }
  
  // Calculate maximum Zs
  const uo = voltage; // Phase-earth voltage
  const maxZs = (0.8 * uo) / ia;
  
  return Number(maxZs.toFixed(3));
}

/**
 * Calculate expected RCD trip time
 * BS 7671 Reg 612.13 - RCD operation
 */
export function getExpectedRCDTripTime(params: {
  rcdRating: number; // mA
  testCurrent: number; // mA (typically 1× or 5× IΔn)
  rcdType: 'AC' | 'A' | 'B' | 'F';
}): { maxTripTime: string; regulation: string } {
  const { testCurrent, rcdRating } = params;
  const testMultiplier = testCurrent / rcdRating;
  
  // BS 7671 Table 61 - RCD trip time requirements
  if (testMultiplier === 1) {
    // Test at 1× IΔn
    return {
      maxTripTime: '< 300ms',
      regulation: 'BS 7671 Reg 612.13.2 (1× IΔn)'
    };
  } else if (testMultiplier === 5) {
    // Test at 5× IΔn
    return {
      maxTripTime: '< 40ms',
      regulation: 'BS 7671 Reg 612.13.2 (5× IΔn)'
    };
  }
  
  return {
    maxTripTime: '< 300ms',
    regulation: 'BS 7671 Reg 612.13.2'
  };
}

/**
 * Generate complete expected values for a circuit
 */
export function generateExpectedValues(circuit: {
  liveSize: number;
  cpcSize: number;
  length: number;
  ze: number;
  voltage: number;
  protectionDevice: {
    type: string;
    rating: number;
    curve?: string;
  };
  rcdRating?: number;
}): ExpectedTestValues {
  const r1r2Result = calculateExpectedR1R2(
    circuit.liveSize,
    circuit.cpcSize,
    circuit.length
  );
  
  const expectedZs = calculateExpectedZs(circuit.ze, r1r2Result.at70C);
  const maxZs = getMaxZsForDevice({
    deviceType: circuit.protectionDevice?.type ?? 'MCB',
    rating: circuit.protectionDevice?.rating ?? 6,
    curve: circuit.protectionDevice?.curve ?? 'B',
    voltage: circuit.voltage,
    disconnectionTime: 0.4 // Standard 0.4s for final circuits
  });
  
  const insulationRequirements = getExpectedInsulationResistance(circuit.voltage);
  
  return {
    r1r2: {
      value: r1r2Result.formatted,
      at20C: r1r2Result.at20C,
      at70C: r1r2Result.at70C,
      regulation: 'BS 7671 Reg 612.2'
    },
    zs: {
      value: expectedZs,
      maxPermitted: maxZs,
      compliant: expectedZs <= maxZs,
      regulation: 'BS 7671 Reg 612.9'
    },
    insulationResistance: insulationRequirements,
    earthFaultLoopImpedance: {
      measured: 'To be tested',
      maximum: maxZs,
      margin: `${((maxZs - expectedZs) / maxZs * 100).toFixed(1)}%`
    }
  };
}
