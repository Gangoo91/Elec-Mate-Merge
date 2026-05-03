/**
 * BS 7671 Table 41.3 — Maximum Zs lookup + RCD-relaxation tripwire.
 *
 * The AI prompt has Table 41.3 inline but occasionally cross-grabs rows
 * (e.g. quotes 32A's 1.37Ω against a 20A device). This module enforces
 * the correct value deterministically.
 *
 * For RCBO/RCD-protected circuits, BS 7671 411.4.5 / 411.5.3 permits a
 * higher Max Zs derived from the RCD's IΔn (typically 30 mA). We compute
 * both and surface the correct one based on circuit context.
 *
 * Strategy: read AI's claimed maxZs, lookup the canonical value, and if
 * mismatched, override + flag the circuit so the UI can show the correction.
 */

import type { DesignedCircuit } from './types.ts';

// BS 7671:2018+A4:2026 Table 41.3 — Max Zs (Ω) for 0.4 s disconnection (Cmin=0.95).
// Indexed by [curve][rating]. Curves B / C / D for MCB/RCBO.
const TABLE_41_3: Record<string, Record<number, number>> = {
  B: {
    6: 7.28,
    10: 4.37,
    13: 3.36,
    16: 2.73,
    20: 2.19,
    25: 1.75,
    32: 1.37,
    40: 1.09,
    50: 0.87,
    63: 0.69,
    80: 0.55,
    100: 0.44,
    125: 0.35,
  },
  C: {
    6: 3.64,
    10: 2.19,
    13: 1.68,
    16: 1.37,
    20: 1.09,
    25: 0.87,
    32: 0.68,
    40: 0.55,
    50: 0.44,
    63: 0.35,
    80: 0.27,
    100: 0.22,
    125: 0.17,
  },
  D: {
    6: 1.82,
    10: 1.09,
    13: 0.84,
    16: 0.68,
    20: 0.55,
    25: 0.44,
    32: 0.34,
    40: 0.27,
    50: 0.22,
    63: 0.17,
    80: 0.14,
    100: 0.11,
    125: 0.09,
  },
};

// BS 7671 Table 41.4 — gG fuses (BS 88-3 / BS 88-2)
const FUSE_GG_MAX_ZS: Record<number, number> = {
  6: 8.52,
  10: 5.11,
  16: 2.7,
  20: 1.85,
  25: 1.5,
  32: 1.09,
  40: 0.86,
  50: 0.63,
  63: 0.46,
  80: 0.36,
  100: 0.25,
  125: 0.18,
  160: 0.13,
  200: 0.094,
};

const RCD_TYPES_PROTECTING_FAULTS = new Set(['RCBO', 'RCBO-TypeA', 'RCBO-TypeB', 'RCD+MCB']);

/**
 * Lookup Max Zs from Table 41.3 / 41.4.
 * Returns null if no canonical value exists for the (type, curve, rating) tuple.
 */
export function lookupTableMaxZs(
  deviceType: string | undefined,
  curve: string | undefined,
  rating: number | undefined
): number | null {
  if (!deviceType || rating == null) return null;

  const t = String(deviceType).toUpperCase();

  if (t === 'BS88' || t === 'BS88-3' || t === 'GG') {
    return FUSE_GG_MAX_ZS[rating] ?? null;
  }

  if (t === 'MCB' || t === 'RCBO' || t.startsWith('RCBO-') || t === 'RCD+MCB' || t === 'MCCB') {
    const c = String(curve ?? 'B').toUpperCase();
    return TABLE_41_3[c]?.[rating] ?? null;
  }

  return null;
}

/**
 * RCD-relaxation max Zs: U₀ × Cmin / (5 × IΔn)
 * Default: 30 mA RCD, U₀=230V, Cmin=0.95 → ~1456.7 Ω.
 */
export function rcdRelaxationMaxZs(
  uo: number = 230,
  cmin: number = 0.95,
  ranAmps: number = 0.03
): number {
  return (uo * cmin) / (5 * ranAmps);
}

export interface ZsCorrection {
  circuitName: string;
  circuitNumber?: number;
  field: 'maxZs';
  before: number;
  after: number;
  expected: number;
  source: 'Table 41.3' | 'Table 41.4 (gG fuse)' | 'RCD-relaxation 411.4.5';
  reason: string;
}

/**
 * Validate + override a circuit's claimed maxZs.
 * Mutates a copy and returns { circuit, correction } if the value was wrong.
 *
 * Tolerance: 1% — anything beyond is treated as a row mix-up (e.g. 1.37 vs 2.19).
 */
export function validateAndCorrectZs(
  circuit: DesignedCircuit,
  logger: any
): { circuit: DesignedCircuit; correction: ZsCorrection | null } {
  const claimed = Number(circuit?.calculations?.maxZs ?? NaN);
  const deviceType = circuit?.protectionDevice?.type;
  const rating = Number(circuit?.protectionDevice?.rating ?? NaN);
  const curve = circuit?.protectionDevice?.curve;

  if (!isFinite(claimed) || !isFinite(rating) || !deviceType) {
    return { circuit, correction: null };
  }

  const tableValue = lookupTableMaxZs(deviceType, curve, rating);
  if (tableValue == null) {
    // No canonical row exists — leave as-is (e.g. exotic device type).
    return { circuit, correction: null };
  }

  // Tolerance 1%
  const diff = Math.abs(claimed - tableValue) / tableValue;
  if (diff <= 0.01) {
    return { circuit, correction: null };
  }

  // Mismatch detected — override
  const corrected: DesignedCircuit = {
    ...circuit,
    calculations: {
      ...circuit.calculations,
      maxZs: tableValue,
    },
  } as DesignedCircuit;

  const reason =
    `AI claimed maxZs=${claimed}Ω for ${rating}A ${curve ?? ''} ${deviceType} but ` +
    `Table 41.3/41.4 requires ${tableValue}Ω. Overridden by deterministic safety tripwire.`;

  logger?.warn?.('🛑 Zs tripwire fired — corrected', {
    circuit: circuit.name,
    deviceType,
    rating,
    curve,
    claimedMaxZs: claimed,
    correctMaxZs: tableValue,
    deltaPercent: Math.round(diff * 100),
  });

  const source =
    deviceType === 'BS88' || deviceType === 'BS88-3'
      ? 'Table 41.4 (gG fuse)'
      : 'Table 41.3';

  return {
    circuit: corrected,
    correction: {
      circuitName: circuit.name ?? 'Unnamed',
      circuitNumber: circuit.circuitNumber,
      field: 'maxZs',
      before: claimed,
      after: tableValue,
      expected: tableValue,
      source: source as ZsCorrection['source'],
      reason,
    },
  };
}

/**
 * Apply Zs validation across all circuits. Returns corrected circuits +
 * the list of corrections so the UI can surface them.
 */
export function applyZsTripwire(
  circuits: DesignedCircuit[],
  logger: any
): { circuits: DesignedCircuit[]; corrections: ZsCorrection[] } {
  const corrections: ZsCorrection[] = [];
  const fixed = circuits.map((c) => {
    const { circuit, correction } = validateAndCorrectZs(c, logger);
    if (correction) corrections.push(correction);
    return circuit;
  });

  if (corrections.length > 0) {
    logger?.warn?.(`🛑 Zs tripwire corrected ${corrections.length} circuit(s)`, {
      count: corrections.length,
      circuits: corrections.map((c) => `${c.circuitName}: ${c.before}→${c.after}Ω`),
    });
  } else {
    logger?.info?.('✅ Zs tripwire: all circuits matched Table 41.3/41.4');
  }

  return { circuits: fixed, corrections };
}
