/**
 * Pre-Validation Calculator
 * Calculates minimum cable sizes and protection requirements BEFORE AI generation
 * Ensures AI receives hard constraints for compliance
 */

import type { NormalizedCircuit, NormalizedSupply } from './types.ts';

// Real-world Twin & Earth cable availability constraints
const TWIN_EARTH_AVAILABILITY = {
  commonMax: 10,      // 10mm² is the largest commonly stocked T&E
  rareMax: 16,        // 16mm² exists but is rare/expensive
  absoluteMax: 16,    // 25mm²+ T&E doesn't exist in practice
  switchThreshold: 10 // Above this, recommend switching cable type
};

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

    // STEP 2: Detect circuit type for appropriate constraints
    const circuitType = this.detectCircuitType(circuit);

    // STEP 3: Determine APPROPRIATE MCB rating (not just minimum, but correct for type)
    const standardMCBs = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125];
    const minimumMCBForLoad = standardMCBs.find(mcb => mcb >= Ib * 1.1) || 125;
    
    // Maximum MCB by circuit type (SAFETY CRITICAL)
    const maxMcbByType: Record<string, number> = {
      'lighting': 16,      // Max 16A for lighting circuits
      'socket_ring': 32,   // Fixed 32A for ring finals
      'socket': 32,        // Max 32A for radial sockets
      'cooker': 50,
      'shower': 50,
      'ev_charger': 40,
      'motor': 63,
      'default': 63
    };
    
    const maxMCBForType = maxMcbByType[circuitType] || 63;
    const recommendedMCB = Math.min(minimumMCBForLoad, maxMCBForType);
    
    if (minimumMCBForLoad > maxMCBForType) {
      reasons.push(`⚠️ Load requires ${minimumMCBForLoad}A but ${circuitType} max is ${maxMCBForType}A - may need circuit redesign`);
    } else {
      reasons.push(`MCB: ${recommendedMCB}A (load requires ${(Ib * 1.1).toFixed(1)}A, type max: ${maxMCBForType}A)`);
    }

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
    const maxZsLookup: Record<number, number> = {
      6: 7.67, 10: 4.60, 16: 2.87, 20: 2.30, 25: 1.84,
      32: 1.44, 40: 1.15, 50: 0.92, 63: 0.73, 80: 0.57,
      100: 0.46, 125: 0.37
    };

    const maxZs = maxZsLookup[recommendedMCB] || 0.46;
    const cableLength = circuit.cableLength;

    const Ze = supply.ze || 0.35;
    const availableZs = maxZs - Ze; // Budget for cable

    // Calculate minimum cable size using iterative approach
    let minimumCableSize = 1.5;
    const standardCableSizes = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70];

    for (const size of standardCableSizes) {
      const resistanceLookup: Record<number, number> = {
        1.5: 12.1, 2.5: 7.41, 4: 4.61, 6: 3.08, 10: 1.83,
        16: 1.15, 25: 0.727, 35: 0.524, 50: 0.387, 70: 0.268
      };

      const liveResistance = resistanceLookup[size] || 1.83; // mΩ/m
      const cpcResistance = liveResistance * 1.67;
      const totalCableResistance = ((liveResistance + cpcResistance) * cableLength) / 1000;
      const calculatedZs = Ze + totalCableResistance;

      if (calculatedZs <= maxZs * 0.8) {
        minimumCableSize = size;
        reasons.push(`Min cable for Zs: ${size}mm² (Zs ${calculatedZs.toFixed(3)}Ω < ${maxZs.toFixed(3)}Ω)`);
        break;
      }
    }

    // STEP 5: Calculate minimum cable size for current capacity (Iz ≥ In)
    const currentCapacityLookup: Record<number, number> = {
      1.5: 20, 2.5: 27, 4: 37, 6: 47, 10: 64,
      16: 85, 25: 112, 35: 138, 50: 168, 70: 213
    };

    let minimumCableSizeForCurrent = 1.5;
    for (const size of standardCableSizes) {
      const capacity = currentCapacityLookup[size] || 20;
      if (capacity >= recommendedMCB * 1.1) {
        minimumCableSizeForCurrent = size;
        reasons.push(`Min cable for current: ${size}mm² (Iz ${capacity}A ≥ In ${recommendedMCB}A)`);
        break;
      }
    }

    // STEP 6: Apply circuit-type appropriate cable sizing
    const cableSizeByType: Record<string, { min: number, max: number, typical: number }> = {
      'lighting': { min: 1.0, max: 2.5, typical: 1.5 },
      'socket_ring': { min: 2.5, max: 2.5, typical: 2.5 },  // FIXED for ring finals
      'socket': { min: 2.5, max: 6, typical: 2.5 },
      'cooker': { min: 6, max: 16, typical: 10 },
      'shower': { min: 6, max: 16, typical: 10 },
      'ev_charger': { min: 6, max: 16, typical: 10 },
      'default': { min: 1.5, max: 50, typical: 2.5 }
    };

    const typeConstraints = cableSizeByType[circuitType] || cableSizeByType['default'];
    
    // Minimum from technical calculations
    const technicalMinimum = Math.max(minimumCableSize, minimumCableSizeForCurrent);
    
    // Apply type constraints
    let finalMinimumCableSize = Math.max(technicalMinimum, typeConstraints.min);
    
    // Cap at type maximum (SAFETY CRITICAL - prevents dangerous oversizing)
    if (finalMinimumCableSize > typeConstraints.max) {
      reasons.push(`⚠️ Technical requirement (${finalMinimumCableSize}mm²) exceeds ${circuitType} max (${typeConstraints.max}mm²) - may need circuit redesign`);
      finalMinimumCableSize = typeConstraints.max; // Cap it but flag as warning
    }
    
    // For well-known types, use typical size if technical minimum allows
    if (technicalMinimum <= typeConstraints.typical && typeConstraints.typical <= typeConstraints.max) {
      finalMinimumCableSize = typeConstraints.typical;
      reasons.push(`Standard for ${circuitType}: ${typeConstraints.typical}mm²`);
    }

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
   * Detect circuit type from name and loadType for appropriate constraints
   */
  private detectCircuitType(circuit: NormalizedCircuit): string {
    const name = circuit.name.toLowerCase();
    const type = circuit.loadType.toLowerCase();
    
    // Ring finals MUST be detected first
    if (name.includes('ring') || type.includes('ring')) return 'socket_ring';
    
    // Lighting circuits
    if (type.includes('lighting') || name.includes('lighting') || name.includes('light')) return 'lighting';
    
    // Socket circuits (radials)
    if (type.includes('socket') || name.includes('socket')) return 'socket';
    
    // High-power circuits
    if (type.includes('cooker') || name.includes('cooker')) return 'cooker';
    if (type.includes('shower') || name.includes('shower')) return 'shower';
    if (type.includes('ev') || name.includes('ev') || name.includes('charger')) return 'ev_charger';
    if (type.includes('motor') || name.includes('motor')) return 'motor';
    
    return 'default';
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
