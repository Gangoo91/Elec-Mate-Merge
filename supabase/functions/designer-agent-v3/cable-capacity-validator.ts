/**
 * Cable Capacity Validator
 * Validates AI-generated cable sizes against BS 7671 tables
 * Prevents dangerous undersizing (e.g., 35mm² for 200A protection)
 */

import type { DesignedCircuit } from './types.ts';

// BS 7671 Table 4D4A — multicore ARMOURED (SWA), 70°C THERMOPLASTIC, Method C
// (clipped direct). Verified against bs7671_facets 2026-08-01.
//
// The previous comment described these as "XLPE 90°C", which is wrong: 4D4A is
// the thermoplastic table. Thermosetting (XLPE) armoured is Table 4E4A and
// carries more — the standard gives 16 mm² as 99 A there against 85 A here.
// The VALUES below are correct for 4D4A; only the description was wrong.
// 4E4A is not ingested, so these lower figures are applied to all armoured
// cable: conservative for XLPE SWA, and stated rather than implied.
const SWA_CAPACITIES_TABLE_4D4A: Record<number, number> = {
  1.5: 20,
  2.5: 27,
  4: 37,
  6: 47,
  10: 64,
  16: 85,
  25: 112,
  35: 137,
  50: 164,
  70: 201,
  95: 238,
  120: 274,
  150: 310,
  185: 348,
  240: 399,
  300: 450,
  400: 511,
  500: 569,
  630: 640,
};

// BS 7671 Table 4D1A - PVC Twin & Earth (70°C, clipped direct)
const PVC_TWIN_EARTH_CAPACITIES: Record<number, number> = {
  1.0: 13,
  1.5: 16,
  2.5: 24,
  4: 32,
  6: 41,
  10: 57,
  16: 76,
  25: 101,
  35: 125,
  50: 151,
};

// BS 7671 Table 4D5A - XLPE Twin & Earth (90°C, clipped direct)
const XLPE_TWIN_EARTH_CAPACITIES: Record<number, number> = {
  1.0: 16,
  1.5: 20,
  2.5: 30,
  4: 40,
  6: 51,
  10: 70,
  16: 94,
  25: 125,
  35: 156,
  50: 188,
};

// PVC/XLPE Single cores in conduit/trunking (Method C)
const PVC_SINGLE_CAPACITIES: Record<number, number> = {
  1.0: 15,
  1.5: 20,
  2.5: 27,
  4: 36,
  6: 46,
  10: 63,
  16: 85,
  25: 112,
  35: 138,
  50: 168,
  70: 207,
  95: 245,
  120: 284,
  150: 323,
  185: 362,
  240: 415,
  300: 467,
};

const XLPE_SINGLE_CAPACITIES: Record<number, number> = {
  1.0: 18,
  1.5: 24,
  2.5: 33,
  4: 45,
  6: 58,
  10: 79,
  16: 107,
  25: 138,
  35: 171,
  50: 209,
  70: 258,
  95: 308,
  120: 356,
  150: 406,
  185: 456,
  240: 523,
  300: 590,
};

interface ValidationResult {
  valid: boolean;
  actualIz?: number;
  error?: string;
  recommendation?: string;
}

/**
 * Validate cable capacity against BS 7671 tables
 */
export function validateCableCapacity(circuit: DesignedCircuit, logger: any): ValidationResult {
  const { cableSize, cableType, calculations, protectionDevice } = circuit;

  if (!cableSize || !cableType || !calculations) {
    return { valid: true }; // Skip validation if missing data
  }

  const claimedIz = calculations.Iz;
  if (!claimedIz) {
    return { valid: true };
  }

  // Get capacity table based on cable type
  let capacityTable: Record<number, number> | null = null;
  let tableName = '';

  if (cableType.toLowerCase().includes('swa')) {
    capacityTable = SWA_CAPACITIES_TABLE_4D4A;
    tableName = 'Table 4D4A (SWA)';
  } else if (cableType.toLowerCase().includes('twin') && cableType.toLowerCase().includes('pvc')) {
    capacityTable = PVC_TWIN_EARTH_CAPACITIES;
    tableName = 'Table 4D1A (PVC T&E)';
  } else if (cableType.toLowerCase().includes('twin') && cableType.toLowerCase().includes('xlpe')) {
    capacityTable = XLPE_TWIN_EARTH_CAPACITIES;
    tableName = 'Table 4D5A (XLPE T&E)';
  } else if (
    cableType.toLowerCase().includes('single') &&
    cableType.toLowerCase().includes('pvc')
  ) {
    capacityTable = PVC_SINGLE_CAPACITIES;
    tableName = 'Table 4D1A (PVC singles)';
  } else if (
    cableType.toLowerCase().includes('single') &&
    cableType.toLowerCase().includes('xlpe')
  ) {
    capacityTable = XLPE_SINGLE_CAPACITIES;
    tableName = 'Table 4D2A (XLPE singles)';
  }

  if (!capacityTable) {
    logger.warn('No capacity table for cable type', { cableType });
    return { valid: true }; // Skip validation for unknown types
  }

  // Get actual capacity from table
  const actualIz = capacityTable[cableSize];

  if (!actualIz) {
    logger.warn('Cable size not in table', { cableSize, cableType, tableName });
    return { valid: true }; // Skip validation for sizes not in table
  }

  // Allow 5A tolerance for derating factors
  const tolerance = 5;
  const difference = Math.abs(claimedIz - actualIz);

  if (difference > tolerance) {
    // Check if cable is severely undersized for protection device
    const deviceRating = protectionDevice?.rating || 0;
    const isCriticalUndersizing = actualIz < deviceRating * 0.9; // Cable capacity < 90% of device rating

    let recommendation = '';
    if (isCriticalUndersizing) {
      // Find correct cable size for this protection device
      const correctSize = Object.entries(capacityTable).find(([_size, iz]) => iz >= deviceRating);

      if (correctSize) {
        recommendation = `CRITICAL: ${cableSize}mm² (${actualIz}A) insufficient for ${deviceRating}A protection. Use ${correctSize[0]}mm² (${correctSize[1]}A) minimum.`;
      }
    }

    logger.error('🔴 Cable capacity validation FAILED', {
      circuit: circuit.name,
      cableSize,
      cableType,
      claimedIz,
      actualIz,
      difference,
      tableName,
      protectionRating: deviceRating,
      isCritical: isCriticalUndersizing,
    });

    return {
      valid: false,
      actualIz,
      error: `Cable capacity mismatch: AI claimed ${claimedIz}A but BS 7671 ${tableName} shows ${actualIz}A for ${cableSize}mm²`,
      recommendation:
        recommendation ||
        `Verify cable sizing: ${cableSize}mm² ${cableType} has ${actualIz}A capacity (${tableName})`,
    };
  }

  logger.info('✅ Cable capacity validation passed', {
    circuit: circuit.name,
    cableSize,
    claimedIz,
    actualIz,
    tableName,
  });

  return { valid: true, actualIz };
}


// ─── Auto-correcting capacity tripwire (ELE-1425) ───────────────────────────
//
// validateCableCapacity above compares the AI's *claimed* Iz against the table
// — it catches the model misquoting a figure, and only spots undersizing as a
// side effect. It also bails out entirely when the model omits `calculations.Iz`,
// and it was flag-only: a 1.5mm² cable proposed for a 330A circuit was reported
// and then left in the design for the user to act on.
//
// This asks the question that actually matters — can this cable carry this
// circuit? — straight from the tables, independent of anything the model
// claimed, and corrects the size when it cannot.
//
//   Reg 433.1.1: Ib ≤ In ≤ Iz, where Iz = It × Ca × Cg × Ci
//
// Ring finals are deliberately excluded: the two legs are in parallel, so a
// 2.5mm² ring on a 32A device is the standard domestic arrangement (App 15)
// and "correcting" it to 4mm² would be wrong on nearly every UK house.

export interface CapacityCorrection {
  circuitNumber?: number;
  circuitName: string;
  field: 'cableSize';
  from: number;
  to: number;
  reason: string;
}

export interface CapacityUncorrectable {
  circuitNumber?: number;
  circuitName: string;
  error: string;
  recommendation: string;
}

function capacityTableFor(cableType: string): { table: Record<number, number>; name: string } | null {
  const t = cableType.toLowerCase();
  if (t.includes('swa')) return { table: SWA_CAPACITIES_TABLE_4D4A, name: 'Table 4D4A (SWA)' };
  if (t.includes('twin') && t.includes('xlpe'))
    return { table: XLPE_TWIN_EARTH_CAPACITIES, name: 'Table 4D5A (XLPE T&E)' };
  if (t.includes('twin')) return { table: PVC_TWIN_EARTH_CAPACITIES, name: 'Table 4D1A (PVC T&E)' };
  if (t.includes('single') && t.includes('xlpe'))
    return { table: XLPE_SINGLE_CAPACITIES, name: 'Table 4D2A (XLPE singles)' };
  if (t.includes('single')) return { table: PVC_SINGLE_CAPACITIES, name: 'Table 4D1A (PVC singles)' };
  return null;
}

/** Ca × Cg × Ci, preferring an explicit overall when the design supplies one. */
function deratingOf(circuit: DesignedCircuit): number {
  const d = (circuit as any).deratingFactors;
  if (!d) return 1;
  const overall = Number(d.overall);
  if (Number.isFinite(overall) && overall > 0) return overall;
  const parts = [d.Ca, d.Cg, d.Ci].map(Number).filter((n) => Number.isFinite(n) && n > 0);
  return parts.length ? parts.reduce((a, b) => a * b, 1) : 1;
}

export function applyCableCapacityTripwire(
  circuits: DesignedCircuit[],
  logger: any
): {
  circuits: DesignedCircuit[];
  corrections: CapacityCorrection[];
  uncorrectable: CapacityUncorrectable[];
} {
  const corrections: CapacityCorrection[] = [];
  const uncorrectable: CapacityUncorrectable[] = [];

  const out = circuits.map((circuit, index) => {
    const name = circuit.name ?? `Circuit ${index + 1}`;
    const number = (circuit as any).circuitNumber ?? index + 1;

    // App 15 governs rings, not the radial rule — leave them alone.
    if ((circuit as any).circuitTopology === 'ring') return circuit;

    const size = Number(circuit.cableSize);
    const cableType = String((circuit as any).cableType ?? '');
    if (!Number.isFinite(size) || size <= 0 || !cableType) return circuit;

    const ib = Number((circuit as any).designCurrent);
    const inRating = Number(circuit.protectionDevice?.rating);
    const candidates = [ib, inRating].filter((n) => Number.isFinite(n) && n > 0);
    if (!candidates.length) return circuit;
    const required = Math.max(...candidates);

    const picked = capacityTableFor(cableType);
    if (!picked) return circuit;

    const derating = deratingOf(circuit);
    const currentIt = picked.table[size];
    if (currentIt == null) return circuit;

    const currentIz = currentIt * derating;
    if (currentIz >= required) return circuit;

    // Smallest tabulated size that will carry it after derating.
    const upgrade = Object.entries(picked.table)
      .map(([s, it]) => ({ size: Number(s), it }))
      .sort((a, b) => a.size - b.size)
      .find((row) => row.it * derating >= required);

    if (!upgrade) {
      const msg =
        `${size}mm² ${cableType} carries ${currentIz.toFixed(1)}A after derating but the ` +
        `circuit requires ${required.toFixed(1)}A, and no size in ${picked.name} satisfies it.`;
      logger?.error?.('🔴 Cable capacity: no tabulated size sufficient', {
        circuit: name,
        size,
        required,
        derating,
      });
      uncorrectable.push({
        circuitNumber: number,
        circuitName: name,
        error: msg,
        recommendation:
          'Review the load, the installation method or split the circuit — this cannot be ' +
          'resolved by cable size alone within ' + picked.name + '.',
      });
      return circuit;
    }

    const reason =
      `${size}mm² carries ${currentIz.toFixed(1)}A after derating (${picked.name}, It ` +
      `${currentIt}A × ${derating}) but the circuit requires ${required.toFixed(1)}A. ` +
      `Corrected to ${upgrade.size}mm² (${(upgrade.it * derating).toFixed(1)}A). Reg 433.1.1.`;

    logger?.warn?.('🛑 Cable capacity tripwire — corrected', {
      circuit: name,
      from: size,
      to: upgrade.size,
      required,
      derating,
      table: picked.name,
    });

    corrections.push({
      circuitNumber: number,
      circuitName: name,
      field: 'cableSize',
      from: size,
      to: upgrade.size,
      reason,
    });

    return {
      ...circuit,
      cableSize: upgrade.size,
      calculations: {
        ...circuit.calculations,
        // Keep the stated Iz consistent with the size we just chose.
        Iz: Number((upgrade.it * derating).toFixed(1)),
      },
    } as DesignedCircuit;
  });

  if (corrections.length) {
    logger?.warn?.(`🛑 Cable capacity tripwire corrected ${corrections.length} circuit(s)`, {
      corrections,
    });
  }

  return { circuits: out, corrections, uncorrectable };
}
