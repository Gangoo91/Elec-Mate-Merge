/**
 * Expected Test Values Calculator
 * Calculates BS 7671 Part 6 test values if AI omits them
 */

import type { DesignedCircuit, ExpectedTestValues } from './types.ts';

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
function calculateR1R2(
  liveSize: number,
  cpcSize: number,
  length: number
): { at20C: number; at70C: number; value: string } {
  const r1 = CONDUCTOR_RESISTANCE_20C[liveSize] || 0;
  const r2 = CONDUCTOR_RESISTANCE_20C[cpcSize] || 0;
  
  // Calculate at 20°C
  const r1r2At20C = ((r1 + r2) * length) / 1000; // Convert mΩ to Ω
  
  // Apply 1.2 multiplier for operating temperature (70°C for thermoplastic)
  const r1r2At70C = r1r2At20C * 1.2;
  
  return {
    at20C: Number(r1r2At20C.toFixed(4)),
    at70C: Number(r1r2At70C.toFixed(4)),
    value: `${r1r2At70C.toFixed(3)}Ω`
  };
}

/**
 * Calculate expected Zs (Ze + R1+R2)
 * BS 7671 Reg 612.9 - Earth fault loop impedance
 */
function calculateZs(
  ze: number,
  r1r2At70C: number,
  maxZs: number
): {
  expected: number;
  maxPermitted: number;
  marginPercent: number;
  compliant: boolean;
} {
  const expected = Number((ze + r1r2At70C).toFixed(3));
  const marginPercent = Number((((maxZs - expected) / maxZs) * 100).toFixed(1));
  
  return {
    expected,
    maxPermitted: maxZs,
    marginPercent,
    compliant: expected <= maxZs
  };
}

/**
 * Calculate expected test values for a circuit
 * Used as fallback if AI doesn't provide them
 */
export function calculateExpectedTestValues(
  circuit: DesignedCircuit,
  ze: number
): ExpectedTestValues {
  // Get cable sizes from circuit
  const liveSize = circuit.cableSize || 2.5;
  const cpcSize = circuit.cpcSize || 1.5;
  const length = (circuit as any).cableLength || 20; // Try to get from circuit, default 20m if missing
  
  // Calculate R1+R2
  const r1r2Result = calculateR1R2(liveSize, cpcSize, length);
  
  // Calculate Zs
  const maxZs = circuit.calculations?.maxZs || 1.0;
  const zsResult = calculateZs(ze, r1r2Result.at70C, maxZs);
  
  // Build expected test values
  const expectedTests: ExpectedTestValues = {
    r1r2: {
      at20C: r1r2Result.at20C,
      at70C: r1r2Result.at70C,
      value: r1r2Result.value,
      regulation: 'BS 7671 Reg 612.2'
    },
    zs: {
      expected: zsResult.expected,
      maxPermitted: zsResult.maxPermitted,
      marginPercent: zsResult.marginPercent,
      compliant: zsResult.compliant,
      regulation: 'BS 7671 Reg 612.9'
    },
    insulationResistance: {
      testVoltage: '500V DC',
      minResistance: '≥1.0 MΩ',
      regulation: 'BS 7671 Table 61'
    }
  };
  
  // Add RCD test values if RCD/RCBO protected
  if (circuit.protectionDevice?.type === 'RCBO' || circuit.protectionDevice?.type === 'RCD+MCB') {
    expectedTests.rcd = {
      ratingmA: 30,
      maxTripTimeMs: 300,
      testCurrentMultiple: 1,
      regulation: 'BS 7671 Reg 612.13'
    };
  }
  
  return expectedTests;
}

/**
 * Ensure circuit has expected test values
 * If missing or contains placeholder text, calculate them
 */
export function ensureExpectedTestValues(
  circuit: DesignedCircuit,
  ze: number,
  logger: any
): DesignedCircuit {
  // Check if expectedTests exists and has valid numerical values
  const hasValidR1R2 = circuit.expectedTests?.r1r2?.at20C && 
                       circuit.expectedTests?.r1r2?.at70C &&
                       !circuit.expectedTests?.r1r2?.value.toLowerCase().includes('less than');
  
  const hasValidZs = circuit.expectedTests?.zs?.expected && 
                     !String(circuit.expectedTests?.zs?.expected).toLowerCase().includes('within');
  
  if (!hasValidR1R2 || !hasValidZs) {
    logger.info('Calculating expected test values (AI omitted or used placeholders)', {
      circuit: circuit.name,
      hasValidR1R2,
      hasValidZs
    });
    
    return {
      ...circuit,
      expectedTests: calculateExpectedTestValues(circuit, ze)
    };
  }
  
  return circuit;
}
