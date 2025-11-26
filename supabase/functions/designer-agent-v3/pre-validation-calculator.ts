/**
 * Pre-Validation Calculator
 * Calculates minimum cable sizes and protection requirements BEFORE AI generation
 * Ensures AI receives hard constraints for compliance
 */

import type { NormalizedCircuit, NormalizedSupply } from './types.ts';

export interface PreValidationConstraints {
  minimumCableSize: number;
  recommendedMCB: number;
  mustUseRCBO: boolean;
  maxCableLength: number;
  reasons: string[];
}

export class PreValidationCalculator {
  constructor(private logger: any) {}

  /**
   * Calculate constraints for a circuit before AI generation
   */
  calculate(
    circuit: NormalizedCircuit,
    supply: NormalizedSupply
  ): PreValidationConstraints {
    const reasons: string[] = [];

    // STEP 1: Calculate design current (Ib)
    const voltage = supply.phases === 'three' ? 400 : 230;
    const Ib = supply.phases === 'three'
      ? circuit.loadPower / (Math.sqrt(3) * voltage * 0.95) // Three-phase with PF
      : circuit.loadPower / voltage;

    this.logger.info('Pre-validation: Design current calculated', {
      circuit: circuit.name,
      Ib: Ib.toFixed(2),
      voltage,
      phases: supply.phases
    });

    // STEP 2: Determine protection device rating (In)
    // Must be ≥ Ib, use standard MCB sizes
    const standardMCBs = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125];
    const recommendedMCB = standardMCBs.find(mcb => mcb >= Ib * 1.1) || 125;
    reasons.push(`MCB ≥ ${(Ib * 1.1).toFixed(1)}A (Ib × 1.1) → ${recommendedMCB}A`);

    // STEP 3: Check if RCBO is mandatory
    const loadTypeLower = circuit.loadType.toLowerCase();
    const mustUseRCBO =
      loadTypeLower.includes('socket') ||
      loadTypeLower.includes('bathroom') ||
      circuit.specialLocation?.toLowerCase() === 'bathroom';

    if (mustUseRCBO) {
      reasons.push('RCBO mandatory (socket/bathroom per BS 7671 Reg 411.3.3)');
    }

    // STEP 4: Calculate minimum cable size for Zs compliance
    // Max Zs for Type B MCB (most common): from BS 7671 Table 41.3
    const maxZsLookup: Record<number, number> = {
      6: 7.67, 10: 4.60, 16: 2.87, 20: 2.30, 25: 1.84,
      32: 1.44, 40: 1.15, 50: 0.92, 63: 0.73, 80: 0.57,
      100: 0.46, 125: 0.37
    };

    const maxZs = maxZsLookup[recommendedMCB] || 0.46;
    const cableLength = circuit.cableLength;

    // Zs = Ze + R1 + R2 (for twin & earth, R1 ≈ R2 * 1.67 due to reduced CPC)
    // For initial estimate, use combined resistance formula
    // Need to find cable size where (Ze + cable resistance) < maxZs

    const Ze = supply.ze || 0.35;
    const availableZs = maxZs - Ze; // Budget for cable

    // Calculate minimum cable size using iterative approach
    let minimumCableSize = 1.5;
    const standardCableSizes = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70];

    for (const size of standardCableSizes) {
      // Conductor resistance (mΩ/m at 70°C) - approximate values
      const resistanceLookup: Record<number, number> = {
        1.5: 12.1, 2.5: 7.41, 4: 4.61, 6: 3.08, 10: 1.83,
        16: 1.15, 25: 0.727, 35: 0.524, 50: 0.387, 70: 0.268
      };

      const liveResistance = resistanceLookup[size] || 1.83; // mΩ/m
      // For twin & earth, CPC is smaller: assume CPC resistance is ~1.67x live
      const cpcResistance = liveResistance * 1.67;
      const totalCableResistance = ((liveResistance + cpcResistance) * cableLength) / 1000; // Convert to Ω

      const calculatedZs = Ze + totalCableResistance;

      if (calculatedZs <= maxZs * 0.8) {
        // 80% of maxZs for safety margin
        minimumCableSize = size;
        reasons.push(
          `Min cable for Zs: ${size}mm² (Zs ${calculatedZs.toFixed(3)}Ω < ${maxZs.toFixed(3)}Ω)`
        );
        break;
      }
    }

    // STEP 5: Calculate minimum cable size for current capacity (Iz ≥ In)
    // Reference current (tabulated values at 30°C ambient, Method C - clipped direct)
    const currentCapacityLookup: Record<number, number> = {
      1.5: 20, 2.5: 27, 4: 37, 6: 47, 10: 64,
      16: 85, 25: 112, 35: 138, 50: 168, 70: 213
    };

    let minimumCableSizeForCurrent = 1.5;
    for (const size of standardCableSizes) {
      const capacity = currentCapacityLookup[size] || 20;
      if (capacity >= recommendedMCB * 1.1) {
        // Add 10% margin
        minimumCableSizeForCurrent = size;
        reasons.push(`Min cable for current: ${size}mm² (Iz ${capacity}A ≥ In ${recommendedMCB}A)`);
        break;
      }
    }

    // STEP 6: Final minimum cable size is the larger of Zs and current requirements
    const finalMinimumCableSize = Math.max(minimumCableSize, minimumCableSizeForCurrent);

    // STEP 7: Calculate max cable length before voltage drop becomes an issue
    // BS 7671: Max VD is 5% for lighting, 5% for power (230V)
    // VD = (mV/A/m) × Ib × L / 1000
    const maxVdPercent = 5;
    const maxVdVolts = (voltage * maxVdPercent) / 100;

    // Voltage drop (mV/A/m) for common cables - approximate
    const vdLookup: Record<number, number> = {
      1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4,
      16: 2.8, 25: 1.75, 35: 1.25, 50: 0.93, 70: 0.63
    };

    const vdPerAmpereMetre = vdLookup[finalMinimumCableSize] || 4.4;
    const maxCableLength = Math.floor((maxVdVolts * 1000) / (vdPerAmpereMetre * Ib));
    reasons.push(`Max length for ${maxVdPercent}% VD: ${maxCableLength}m`);

    const constraints: PreValidationConstraints = {
      minimumCableSize: finalMinimumCableSize,
      recommendedMCB,
      mustUseRCBO,
      maxCableLength,
      reasons
    };

    this.logger.info('Pre-validation constraints calculated', {
      circuit: circuit.name,
      constraints
    });

    return constraints;
  }

  /**
   * Calculate constraints for all circuits
   */
  calculateAll(
    circuits: NormalizedCircuit[],
    supply: NormalizedSupply
  ): Map<string, PreValidationConstraints> {
    const constraintsMap = new Map<string, PreValidationConstraints>();

    circuits.forEach((circuit, idx) => {
      const key = `circuit_${idx}`;
      constraintsMap.set(key, this.calculate(circuit, supply));
    });

    this.logger.info('Pre-validation constraints calculated for all circuits', {
      count: circuits.length
    });

    return constraintsMap;
  }
}
