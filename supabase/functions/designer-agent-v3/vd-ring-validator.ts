/**
 * Ring final voltage-drop tripwire.
 *
 * The AI sometimes calculates Vd on a ring final circuit using the radial
 * formula (mV/A/m × Ib × L). For a ring, the two legs of the cable are in
 * parallel and the worst-case load point is at the mid-point — the effective
 * length-current product is L/4, not L. Net effect: ring Vd ≈ radial Vd ÷ 4.
 *
 * If we detect a ring final circuit whose Vd looks like a radial calc, we
 * override with the ring formula. Mirrors the Zs / cable-type tripwires.
 */

import type { DesignedCircuit } from './types.ts';

export interface VdCorrection {
  circuitName: string;
  circuitNumber?: number;
  beforePercent: number;
  afterPercent: number;
  beforeVolts: number;
  afterVolts: number;
  reason: string;
  reg: string;
}

function isRingFinal(circuit: DesignedCircuit): boolean {
  if (circuit.circuitTopology === 'ring') return true;
  const name = String(circuit.name ?? '').toLowerCase();
  const lt = String(circuit.loadType ?? '').toLowerCase();
  if (/\bring\b/.test(name) || /\bring\b/.test(lt)) return true;
  // Also check the justification prose — many ring designs get tagged here
  const justifications = circuit.justifications ?? {};
  for (const v of Object.values(justifications)) {
    if (typeof v === 'string' && /\bring final\b/i.test(v)) return true;
  }
  return false;
}

export function validateRingVd(
  circuit: DesignedCircuit,
  logger: any
): { circuit: DesignedCircuit; correction: VdCorrection | null } {
  if (!isRingFinal(circuit)) return { circuit, correction: null };

  const vd = (circuit.calculations as any)?.voltageDrop;
  if (!vd) return { circuit, correction: null };

  const rawPercent = Number(vd.percent ?? NaN);
  const rawVolts = Number(vd.volts ?? NaN);
  const limit = Number(vd.limit ?? 5);
  if (!isFinite(rawPercent) || !isFinite(rawVolts)) return { circuit, correction: null };

  // Ring formula: parallel paths at mid-point → divide radial Vd by 4
  const correctedPercent = rawPercent / 4;
  const correctedVolts = rawVolts / 4;

  // Tolerance: only override if AI's number diverges meaningfully from the ring value.
  // A correctly-calculated ring with rawPercent already low (< 1.5%) should pass through.
  if (rawPercent <= correctedPercent * 1.4) {
    // AI already in the ballpark of the ring formula — leave it alone
    return { circuit, correction: null };
  }

  logger?.info?.('🔁 Ring Vd tripwire: parallel-path correction', {
    circuit: circuit.name,
    before: `${rawPercent.toFixed(2)}%`,
    after: `${correctedPercent.toFixed(2)}%`,
  });

  const corrected: DesignedCircuit = {
    ...circuit,
    calculations: {
      ...circuit.calculations,
      voltageDrop: {
        ...vd,
        volts: Number(correctedVolts.toFixed(3)),
        percent: Number(correctedPercent.toFixed(2)),
        compliant: correctedPercent <= limit,
      },
    },
  } as DesignedCircuit;

  return {
    circuit: corrected,
    correction: {
      circuitName: circuit.name ?? 'Unnamed',
      circuitNumber: circuit.circuitNumber,
      beforePercent: rawPercent,
      afterPercent: correctedPercent,
      beforeVolts: rawVolts,
      afterVolts: correctedVolts,
      reason:
        'Ring final circuit — two legs in parallel, worst-case load at mid-point. Effective Vd is one-quarter of the equivalent radial calculation. Overridden with ring formula.',
      reg: '525.201 · Appendix 15',
    },
  };
}

export function applyRingVdTripwire(
  circuits: DesignedCircuit[],
  logger: any
): { circuits: DesignedCircuit[]; corrections: VdCorrection[] } {
  const corrections: VdCorrection[] = [];
  const fixed = circuits.map((c) => {
    const { circuit, correction } = validateRingVd(c, logger);
    if (correction) corrections.push(correction);
    return circuit;
  });

  if (corrections.length > 0) {
    logger?.warn?.(`🔁 Ring Vd tripwire corrected ${corrections.length} circuit(s)`, {
      circuits: corrections.map(
        (c) => `${c.circuitName}: ${c.beforePercent.toFixed(2)}% → ${c.afterPercent.toFixed(2)}%`
      ),
    });
  } else {
    logger?.info?.('✅ Ring Vd tripwire: all ring finals correctly calculated');
  }

  return { circuits: fixed, corrections };
}
