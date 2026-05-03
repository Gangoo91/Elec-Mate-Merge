/**
 * Circuit voltage tripwire.
 *
 * On a three-phase supply (400 V line-to-line), individual single-phase circuits
 * still operate at 230 V (phase-to-neutral). The AI sometimes carries the supply
 * voltage (400 V) onto single-phase circuits, which produces:
 *   - inflated Ib (3 kW / 400 V = 7.5 A instead of 3 kW / 230 V = 13 A)
 *   - inflated Vd % (computed against 400 V reference instead of 230 V)
 *   - mis-sized protection (16 A MCB looks too small once Ib is recomputed)
 *
 * Rule:  circuit.phases === 'single'  ⇒  circuit.voltage = 230
 *        circuit.phases === 'three'   ⇒  circuit.voltage = 400 (or 415)
 *
 * This tripwire enforces that, recomputes Ib, and rescales the AI's voltage drop
 * to the correct reference voltage. Mirrors the Zs / cable-type / ring-Vd pattern.
 */

import type { DesignedCircuit } from './types.ts';

export interface VoltageCorrection {
  circuitName: string;
  circuitNumber?: number;
  beforeVoltage: number;
  afterVoltage: number;
  beforeIb: number;
  afterIb: number;
  beforeVdPercent?: number;
  afterVdPercent?: number;
  reason: string;
}

export function validateCircuitVoltage(
  circuit: DesignedCircuit,
  logger: any
): { circuit: DesignedCircuit; correction: VoltageCorrection | null } {
  const phases = String(circuit?.phases ?? 'single').toLowerCase();
  const claimedV = Number(circuit?.voltage ?? 0);
  const loadPower = Number(circuit?.loadPower ?? 0);

  // Decide what voltage SHOULD apply
  const expectedV =
    phases === 'three' ? (claimedV === 415 ? 415 : 400) : 230;

  // Tolerance: 5% wiggle for supply variation
  if (Math.abs(claimedV - expectedV) / expectedV <= 0.05) {
    return { circuit, correction: null };
  }

  // Mismatch detected — recompute Ib, scale Vd reference
  const oldIb = Number(circuit?.calculations?.Ib ?? loadPower / Math.max(claimedV, 1));
  // Single-phase recompute: I = P / V
  // Three-phase recompute: I = P / (√3 × VLL)
  const newIb =
    phases === 'three'
      ? loadPower / (Math.sqrt(3) * expectedV)
      : loadPower / expectedV;

  const oldVd = (circuit.calculations as any)?.voltageDrop;
  let newVdPercent: number | undefined;
  let newVdVolts: number | undefined;

  if (oldVd && typeof oldVd.percent === 'number' && typeof oldVd.volts === 'number') {
    // Vd_volts magnitude doesn't change with reference voltage — only the % does.
    // BUT if AI computed Vd at the wrong reference, the volts likely uses Ib too,
    // which also scales. Conservative: re-derive % from existing volts × correct ref.
    newVdVolts = oldVd.volts;
    newVdPercent = (newVdVolts! / expectedV) * 100;
  }

  const corrected: DesignedCircuit = {
    ...circuit,
    voltage: expectedV,
    calculations: {
      ...circuit.calculations,
      Ib: Number(newIb.toFixed(2)),
      Id: circuit.calculations?.Id != null
        ? Number(((circuit.calculations.Id as number) * (newIb / Math.max(oldIb, 0.001))).toFixed(2))
        : circuit.calculations?.Id,
      voltageDrop: oldVd
        ? {
            ...oldVd,
            volts: newVdVolts != null ? Number(newVdVolts.toFixed(3)) : oldVd.volts,
            percent: newVdPercent != null ? Number(newVdPercent.toFixed(2)) : oldVd.percent,
            compliant:
              newVdPercent != null
                ? newVdPercent <= Number(oldVd.limit ?? 5)
                : oldVd.compliant,
          }
        : oldVd,
    },
  } as DesignedCircuit;

  logger?.info?.('⚡ Voltage tripwire: corrected circuit reference voltage', {
    circuit: circuit.name,
    phases,
    before: `${claimedV} V → Ib ${oldIb.toFixed(2)} A`,
    after: `${expectedV} V → Ib ${newIb.toFixed(2)} A`,
    vd: oldVd ? `${oldVd.percent}% → ${newVdPercent?.toFixed(2)}%` : '—',
  });

  return {
    circuit: corrected,
    correction: {
      circuitName: circuit.name ?? 'Unnamed',
      circuitNumber: circuit.circuitNumber,
      beforeVoltage: claimedV,
      afterVoltage: expectedV,
      beforeIb: oldIb,
      afterIb: newIb,
      beforeVdPercent: oldVd?.percent,
      afterVdPercent: newVdPercent,
      reason:
        phases === 'single'
          ? 'Single-phase circuit on a three-phase supply — circuit voltage is 230 V phase-to-neutral, not the supply line-to-line value. Recomputed Ib and rescaled Vd against 230 V.'
          : 'Three-phase circuit voltage normalised to the standard line-to-line reference.',
    },
  };
}

export function applyVoltageTripwire(
  circuits: DesignedCircuit[],
  logger: any
): { circuits: DesignedCircuit[]; corrections: VoltageCorrection[] } {
  const corrections: VoltageCorrection[] = [];
  const fixed = circuits.map((c) => {
    const { circuit, correction } = validateCircuitVoltage(c, logger);
    if (correction) corrections.push(correction);
    return circuit;
  });

  if (corrections.length > 0) {
    logger?.warn?.(`⚡ Voltage tripwire corrected ${corrections.length} circuit(s)`, {
      circuits: corrections.map(
        (c) =>
          `${c.circuitName}: ${c.beforeVoltage} V→${c.afterVoltage} V, Ib ${c.beforeIb.toFixed(1)}→${c.afterIb.toFixed(1)} A`
      ),
    });
  } else {
    logger?.info?.('✅ Voltage tripwire: all circuit voltages match phase config');
  }

  return { circuits: fixed, corrections };
}
