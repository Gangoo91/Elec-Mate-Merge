/**
 * Expected Test Values Calculator
 * Calculates BS 7671 Part 6 test values if AI omits them
 */

import type { DesignedCircuit, ExpectedTestValues } from './types.ts';

// BS 7671 Table 9A - Conductor resistance (mΩ/m at 20°C)
export const CONDUCTOR_RESISTANCE_20C: Record<number, number> = {
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
 * BS 7671 Reg 612.2 - Continuity of protective conductors
 */
function calculateR1R2(
  liveSize: number,
  cpcSize: number,
  length: number,
  ring = false,
  tempFactor = 1.2
): { at20C: number; at70C: number; value: string } {
  // Number(): a size that arrives as "6.0" must still find its row, or R1 is
  // 0 and Zs passes falsely.
  const r1 = CONDUCTOR_RESISTANCE_20C[Number(liveSize)] || 0;
  const r2 = CONDUCTOR_RESISTANCE_20C[Number(cpcSize)] || 0;

  // Calculate at 20°C. A ring's end-to-end R1+R2 reads a quarter of a radial
  // of the same length (the (r1 + r2) / 4 test).
  const r1r2At20C = ((r1 + r2) * length) / 1000 / (ring ? 4 : 1); // Convert mΩ to Ω

  // To conductor operating temperature — OSG Table I3: 1.20 for 70 °C
  // thermoplastic, 1.28 for 90 °C thermosetting. (`at70C` is the historical
  // field name the UI reads; for XLPE it holds the 90 °C value.)
  const r1r2At70C = r1r2At20C * tempFactor;

  return {
    at20C: Number(r1r2At20C.toFixed(4)),
    at70C: Number(r1r2At70C.toFixed(4)),
    value: `${r1r2At70C.toFixed(3)}Ω`,
  };
}

/**
 * 90 °C thermosetting: XLPE (incl. XLPE SWA, the usual BS 5467 armoured) and
 * LSZH to BS 7211/BS 6724. Thermoplastic — T&E, PVC singles, PVC SWA — 70 °C.
 */
export function operatingTempFactor(cableType: unknown): number {
  const s = String(cableType ?? '').toLowerCase();
  // Order matters: T&E first (6242Y/6242B are 70 °C even in LSZH), then the
  // insulation named outright, then sheath/construction words. "XLPE/SWA/PVC"
  // is 90 °C XLPE with a PVC sheath (review — /pvc/ used to win).
  if (/twin|t\s*&\s*e|t\+e|6242|flat/.test(s)) return 1.2;
  if (/xlpe|thermosetting|5467|6724|7211/.test(s)) return 1.28;
  if (/pvc|thermoplastic|6491x|6346|6942|6943/.test(s)) return 1.2;
  return /swa|armour|lszh|lsf|lsoh|low smoke/.test(s) ? 1.28 : 1.2;
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
    compliant: expected <= maxZs,
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
  const ring = /ring/i.test(String((circuit as any).circuitTopology ?? ''));
  const r1r2Result = calculateR1R2(
    liveSize,
    cpcSize,
    length,
    ring,
    operatingTempFactor((circuit as any).cableType)
  );

  // Calculate Zs
  const maxZs = circuit.calculations?.maxZs || 1.0;
  const zsResult = calculateZs(ze, r1r2Result.at70C, maxZs);
  const tf = operatingTempFactor((circuit as any).cableType);
  const r1 = CONDUCTOR_RESISTANCE_20C[Number(liveSize)];
  const r2 = CONDUCTOR_RESISTANCE_20C[Number(cpcSize)];
  // The working, for the results page (OSG Tables I1 and I3).
  const working =
    r1 !== undefined && r2 !== undefined
      ? `Ze ${ze} + (${r1} + ${r2}) mΩ/m × ${length} m${ring ? ' ÷ 4' : ''} × ${tf} ÷ 1000 = ${zsResult.expected} Ω (OSG Tables I1, I3)`
      : undefined;

  // Build expected test values
  const expectedTests: ExpectedTestValues = {
    r1r2: {
      at20C: r1r2Result.at20C,
      at70C: r1r2Result.at70C,
      value: r1r2Result.value,
      regulation: 'BS 7671 Reg 612.2',
    },
    zs: {
      expected: zsResult.expected,
      maxPermitted: zsResult.maxPermitted,
      marginPercent: zsResult.marginPercent,
      compliant: zsResult.compliant,
      regulation: 'BS 7671 Reg 612.9',
      ...(working ? { working } : {}),
    },
    insulationResistance: {
      testVoltage: '500V DC',
      minResistance: '≥1.0 MΩ',
      regulation: 'BS 7671 Table 61',
    },
  };

  // Add RCD test values if RCD/RCBO protected
  if (circuit.protectionDevice?.type === 'RCBO' || circuit.protectionDevice?.type === 'RCD+MCB') {
    expectedTests.rcd = {
      ratingmA: 30,
      maxTripTimeMs: 300,
      testCurrentMultiple: 1,
      regulation: 'BS 7671 Reg 612.13',
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
  const hasValidR1R2 =
    circuit.expectedTests?.r1r2?.at20C &&
    circuit.expectedTests?.r1r2?.at70C &&
    !circuit.expectedTests?.r1r2?.value.toLowerCase().includes('less than');

  const hasValidZs =
    circuit.expectedTests?.zs?.expected &&
    !String(circuit.expectedTests?.zs?.expected).toLowerCase().includes('within');

  // R1+R2 and Zs are arithmetic from Table I1 — never keep the model's when
  // the inputs are known. Across 611 designed circuits (May–Sep 2026) only
  // 24% of the model's R1+R2 were within 10% of the table figure; 135 of 144
  // rings were the full loop, never ÷4, so ring Zs read ~4× high. Other
  // expected-test fields (IR, RCD) are kept.
  const live = Number(circuit.cableSize);
  const cpc = Number(circuit.cpcSize);
  const len = Number((circuit as any).cableLength);
  const computable =
    CONDUCTOR_RESISTANCE_20C[live] !== undefined &&
    CONDUCTOR_RESISTANCE_20C[cpc] !== undefined &&
    len > 0;
  if (computable) {
    const calc = calculateExpectedTestValues(circuit, ze);
    const was = Number(circuit.expectedTests?.r1r2?.at20C);
    if (Number.isFinite(was) && Math.abs(was - calc.r1r2.at20C) > calc.r1r2.at20C * 0.1) {
      logger.info('R1+R2 replaced with Table I1 value', {
        circuit: circuit.name,
        was,
        now: calc.r1r2.at20C,
      });
    }
    const merged: Record<string, unknown> = {
      ...calc,
      ...(circuit.expectedTests ?? {}),
      r1r2: calc.r1r2,
      zs: calc.zs,
    };
    // An RCD test only belongs on a circuit that has an RCD.
    const dev = String((circuit as any).protectionDevice?.type ?? '');
    if (!/RCBO|RCD/i.test(dev) && (circuit as any).rcdProtected !== true) delete merged.rcd;
    return { ...circuit, expectedTests: merged as any };
  }

  if (!hasValidR1R2 || !hasValidZs) {
    logger.info('Calculating expected test values (AI omitted or used placeholders)', {
      circuit: circuit.name,
      hasValidR1R2,
      hasValidZs,
    });

    return {
      ...circuit,
      expectedTests: calculateExpectedTestValues(circuit, ze),
    };
  }

  return circuit;
}
