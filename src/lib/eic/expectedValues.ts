// EIC Expected Test Values Calculator
// BS 7671 - Testing and Verification

import {
  getMcbZsLimit,
  type MCBCurve,
  type DisconnectionTime,
} from '@/data/zsLimits';

export interface ExpectedTestValues {
  r1r2: {
    value: string;
    at20C: number;
    at70C: number;
    regulation: string;
  };
  zs: {
    value: number;
    /** null when the device is not in BS 7671 Table 41.3 — see getMaxZsForDevice. */
    maxPermitted: number | null;
    /** null means "not determined", which is not the same as "fails". */
    compliant: boolean | null;
    regulation: string;
  };
  insulationResistance: {
    testVoltage: string;
    minResistance: string;
    regulation: string;
  };
  earthFaultLoopImpedance: {
    measured: string;
    maximum: number | null;
    /** Empty when there is no limit to measure against. */
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
  400: 0.047,
};

/**
 * Calculate expected R1+R2 based on cable sizes and length
 * BS 7671 Reg 643.2 - Continuity of protective conductors
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
    formatted: `${r1r2At70C.toFixed(3)}Ω`,
  };
}

/**
 * Calculate expected Zs (Ze + R1+R2)
 * BS 7671 Reg 643.7.3 - Earth fault loop impedance
 */
export function calculateExpectedZs(ze: number, r1r2: number): number {
  return Number((ze + r1r2).toFixed(3));
}

/**
 * Determine insulation resistance test requirements based on voltage
 * BS 7671 Table 64 - Minimum insulation resistance values and DC test voltages
 */
export function getExpectedInsulationResistance(
  voltage: number,
  circuitType: 'SELV' | 'standard' = 'standard'
): { testVoltage: string; minResistance: string; regulation: string } {
  // BS 7671 Table 64
  if (circuitType === 'SELV' && voltage <= 50) {
    return {
      testVoltage: '250V DC',
      minResistance: '≥0.5 MΩ',
      regulation: 'BS 7671 Table 64 (SELV/PELV)',
    };
  }

  if (voltage <= 500) {
    return {
      testVoltage: '500V DC',
      minResistance: '≥1.0 MΩ',
      regulation: 'BS 7671 Table 64 (LV up to 500V)',
    };
  }

  return {
    testVoltage: '1000V DC',
    minResistance: '≥1.0 MΩ',
    regulation: 'BS 7671 Table 64 (LV above 500V)',
  };
}

/**
 * Calculate expected polarity test result
 * BS 7671 Reg 643.6 - Polarity
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
}): number | null {
  const { deviceType, rating, curve, disconnectionTime } = params;

  // Looked up from BS 7671 Table 41.3 rather than re-derived.
  //
  // This used to compute (0.8 × Uo) / Ia, which conflates two different
  // factors and lands on neither. The published table applies Cmin = 0.95, so
  // a B32 is 1.37Ω. GN3's 0.80 is a separate allowance for measuring on a cold
  // conductor, and it applies to the table value (1.37 × 0.8 = 1.10Ω), not to
  // Uo. Multiplying Uo by 0.8 gave 1.15Ω — stricter than the real limit and
  // looser than the real site limit, so it could fail a compliant design and
  // pass a marginal measurement.
  const time: DisconnectionTime = disconnectionTime >= 5 ? '5s' : '0.4s';

  if (deviceType === 'MCB' || deviceType === 'RCBO') {
    const curveKey = `type${(curve ?? 'B').toUpperCase()}` as MCBCurve;
    return getMcbZsLimit(curveKey, rating, time)?.maxZs ?? null;
  }

  // "fuse" alone does not identify a table: BS 88-2, BS 88-3, BS 3036 and
  // BS 1362 each have their own Zs limits at the same rating. Guessing one
  // (the old code assumed Ia = 2 × In for every fuse) prints a limit that
  // belongs to no real device, so defer instead.
  return null;
}

/**
 * Calculate expected RCD trip time
 * BS 7671 Reg 643.10 - RCD operation
 */
export function getExpectedRCDTripTime(params: {
  rcdRating: number; // mA
  testCurrent: number; // mA (typically 1× or 5× IΔn)
  rcdType: 'AC' | 'A' | 'B' | 'F';
}): { maxTripTime: string; regulation: string } {
  const { testCurrent, rcdRating } = params;
  const testMultiplier = testCurrent / rcdRating;

  // BS 7671 Reg 643.8 — verification of RCDs providing additional protection,
  // using equipment to BS EN 61557-6 (Reg 643.1). Not a table: 300 ms for a
  // general non-delay type at 1x IΔn, and the 40 ms figure belongs to the 5x
  // test. (643.10 is functional testing — the test button — which proves the
  // mechanism moves, not that it disconnects in time.)
  if (testMultiplier === 1) {
    // Test at 1× IΔn
    return {
      maxTripTime: '< 300ms',
      regulation: 'BS 7671 Reg 643.10 (1× IΔn)',
    };
  } else if (testMultiplier === 5) {
    // Test at 5× IΔn
    return {
      maxTripTime: '< 40ms',
      regulation: 'BS 7671 Reg 643.10 (5× IΔn)',
    };
  }

  return {
    maxTripTime: '< 300ms',
    regulation: 'BS 7671 Reg 643.10',
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
  const r1r2Result = calculateExpectedR1R2(circuit.liveSize, circuit.cpcSize, circuit.length);

  const expectedZs = calculateExpectedZs(circuit.ze, r1r2Result.at70C);
  const maxZs = getMaxZsForDevice({
    deviceType: circuit.protectionDevice?.type ?? 'MCB',
    rating: circuit.protectionDevice?.rating ?? 6,
    curve: circuit.protectionDevice?.curve ?? 'B',
    voltage: circuit.voltage,
    disconnectionTime: 0.4, // Standard 0.4s for final circuits
  });

  const insulationRequirements = getExpectedInsulationResistance(circuit.voltage);

  return {
    r1r2: {
      value: r1r2Result.formatted,
      at20C: r1r2Result.at20C,
      at70C: r1r2Result.at70C,
      regulation: 'BS 7671 Reg 643.2',
    },
    zs: {
      value: expectedZs,
      maxPermitted: maxZs,
      // Deliberately null rather than false when no limit was found. Reporting
      // an unknown device as non-compliant reads as a real failure the
      // designer then chases; null lets the caller say "check this by hand".
      compliant: maxZs === null ? null : expectedZs <= maxZs,
      regulation: 'BS 7671 Reg 643.7.3',
    },
    insulationResistance: insulationRequirements,
    earthFaultLoopImpedance: {
      measured: 'To be tested',
      maximum: maxZs,
      margin: maxZs === null ? '' : `${(((maxZs - expectedZs) / maxZs) * 100).toFixed(1)}%`,
    },
  };
}
