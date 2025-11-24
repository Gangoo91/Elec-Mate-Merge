/**
 * Deterministic BS 7671 Calculations Post-Processor
 * Applies after AI generation to ensure accurate maths
 */

import {
  calculateVoltageDrop,
  calculateEarthFaultLoop,
  type CableType,
  type VoltageDropParams,
  type EarthFaultParams
} from '../_shared/bs7671-unified-calculations.ts';
import { getCpcSize, validateCpcSize } from '../_shared/bs7671-data/cpcSizes.ts';
import type { DesignedCircuit, ExpectedTestValues, NormalizedSupply } from './types.ts';

export class DeterministicCalculator {
  constructor(private logger: any) {}

  /**
   * Apply deterministic calculations to all circuits after AI generation
   */
  applyToCircuits(circuits: DesignedCircuit[], supply: NormalizedSupply): DesignedCircuit[] {
    this.logger.info('Applying deterministic calculations to circuits', {
      count: circuits.length
    });

    return circuits.map((circuit, idx) => {
      try {
        return this.applyToCircuit(circuit, supply, idx);
      } catch (error) {
        this.logger.error('Failed to apply deterministic calculations', {
          circuit: circuit.name,
          error: error instanceof Error ? error.message : String(error)
        });
        // Return original circuit if calculation fails
        return circuit;
      }
    });
  }

  /**
   * Apply deterministic calculations to a single circuit
   */
  private applyToCircuit(
    circuit: DesignedCircuit,
    supply: NormalizedSupply,
    index: number
  ): DesignedCircuit {
    // Ensure calculations object exists
    if (!circuit.calculations) {
      circuit.calculations = {} as any;
    }

    // STEP 1: Validate and correct CPC size (CRITICAL for accurate Zs/R1+R2)
    circuit = this.validateAndCorrectCpcSize(circuit);

    // Parse cable type from circuit data
    const cableType = this.parseCableType(circuit);

    // Detect if this is a ring final circuit
    const isRing = this.isRingFinal(circuit);
    const totalLength = (circuit as any).cableLength || 0;
    const effectiveLength = isRing ? totalLength / 2 : totalLength; // Two parallel paths in ring

    // Log ring detection
    if (isRing) {
      this.logger.info('Ring final detected', {
        circuit: circuit.name,
        totalLength,
        effectiveLength
      });
    }

    // 1. Calculate accurate voltage drop using BS 7671 unified calculations
    const vdResult = calculateVoltageDrop({
      cableType,
      cableSize: circuit.cableSize,
      current: circuit.calculations?.Ib || 0,
      length: effectiveLength, // ✅ FIXED: Half length for ring finals
      voltage: supply.voltage,
      powerFactor: 0.95,
      phaseConfig: supply.phases === 'three' ? 'three' : 'single',
      temperature: 70, // Operating temp for PVC
      loadType: circuit.loadType?.includes('lighting') ? 'lighting' : 'power'
    });

    if (vdResult) {
      circuit.calculations.voltageDrop = {
        volts: vdResult.voltageDropVolts,
        percent: vdResult.voltageDropPercent,
        limit: vdResult.limit,
        compliant: vdResult.compliant
      };

      this.logger.info('Voltage drop calculated (deterministic)', {
        circuit: circuit.name,
        vd: `${vdResult.voltageDropPercent.toFixed(2)}%`,
        compliant: vdResult.compliant
      });
    }

    // 2. Calculate accurate Zs using BS 7671 earth fault loop calculations
    const zsResult = calculateEarthFaultLoop({
      externalZe: supply.ze,
      cableType,
      cableSize: circuit.cableSize,
      cpcSize: circuit.cpcSize,
      length: effectiveLength, // ✅ FIXED: Half length for ring finals
      temperature: 70,
      protectiveDevice: {
        type: circuit.protectionDevice.curve,
        rating: circuit.protectionDevice.rating
      }
    });

    if (zsResult) {
      circuit.calculations.zs = zsResult.calculatedZs;
      circuit.calculations.maxZs = zsResult.maxZs;
      (circuit.calculations as any).r1r2 = zsResult.r1PlusR2;
      (circuit.calculations as any).faultCurrent = zsResult.faultCurrent;

      this.logger.info('Zs calculated (deterministic)', {
        circuit: circuit.name,
        zs: `${zsResult.calculatedZs.toFixed(3)}Ω`,
        maxZs: `${zsResult.maxZs.toFixed(3)}Ω`,
        compliant: zsResult.compliant
      });
    }

    // 3. Generate expected test values
    circuit.expectedTests = this.generateExpectedTests(circuit, supply, zsResult, isRing);

    return circuit;
  }

  /**
   * Generate expected test values for EIC/testing
   */
  private generateExpectedTests(
    circuit: DesignedCircuit,
    supply: NormalizedSupply,
    zsResult: any,
    isRing: boolean
  ): ExpectedTestValues {
    const r1r2 = zsResult?.r1PlusR2 || 0;
    const zs = zsResult?.calculatedZs || 0;
    const maxZs = zsResult?.maxZs || 0;

    const expectedTests: ExpectedTestValues = {
      r1r2: {
        at20C: r1r2 / 1.2, // Reverse temperature factor
        at70C: r1r2,
        value: `${r1r2.toFixed(3)}Ω${isRing ? ' (ring final - measured at each socket)' : ''}`,
        regulation: 'BS 7671 Reg 612.2'
      },
      zs: {
        expected: zs,
        maxPermitted: maxZs,
        marginPercent: ((maxZs - zs) / maxZs) * 100,
        compliant: zs <= maxZs,
        regulation: `BS 7671 Reg 612.9 & Table 41.3 (Type ${circuit.protectionDevice.curve} ${circuit.protectionDevice.rating}A)`
      },
      insulationResistance: {
        testVoltage: supply.voltage <= 500 ? '500V DC' : '1000V DC',
        minResistance: '≥1.0 MΩ',
        regulation: 'BS 7671 Table 61 (LV)'
      }
    };

    // Add RCD test if circuit is RCD protected
    if (circuit.protectionDevice.type === 'RCBO' || (circuit as any).rcdProtected) {
      expectedTests.rcd = {
        ratingmA: 30, // Standard for domestic
        maxTripTimeMs: 300, // At 1× IΔn
        testCurrentMultiple: 1,
        regulation: 'BS 7671 Reg 612.13.2'
      };
    }

    return expectedTests;
  }

  /**
   * Detect if a circuit is a ring final circuit
   */
  private isRingFinal(circuit: DesignedCircuit): boolean {
    const name = circuit.name?.toLowerCase() || '';
    const loadType = circuit.loadType?.toLowerCase() || '';
    const justification = circuit.justifications?.cableSize?.toLowerCase() || '';
    
    // Check multiple indicators
    return (
      name.includes('ring') ||
      loadType.includes('ring') ||
      justification.includes('ring final') ||
      justification.includes('ring circuit') ||
      // Typical ring final: 32A sockets on 2.5mm²
      (loadType.includes('socket') && circuit.protectionDevice.rating === 32 && circuit.cableSize === 2.5)
    );
  }

  /**
   * Validate and correct CPC size based on cable type (BS 7671 Table 54.7)
   * Enhanced with intelligent detection of cable type from description
   */
  private validateAndCorrectCpcSize(circuit: DesignedCircuit): DesignedCircuit {
    const cableTypeStr = ((circuit as any).cableType || '').toLowerCase();
    const liveSize = circuit.cableSize;
    const currentCpcSize = circuit.cpcSize;

    // Determine expected CPC size based on cable type
    let expectedCpcSize: number;

    // Twin & Earth: CPC is SMALLER (Table 54.7)
    if (cableTypeStr.includes('twin') || cableTypeStr.includes('t&e') || cableTypeStr.includes('t+e')) {
      expectedCpcSize = getCpcSize('twin-earth', liveSize);
      
      if (currentCpcSize !== expectedCpcSize) {
        this.logger.warn('CPC size correction applied (T&E)', {
          circuit: circuit.name,
          cableType: cableTypeStr,
          liveSize,
          incorrectCpc: currentCpcSize,
          correctedCpc: expectedCpcSize
        });
        circuit.cpcSize = expectedCpcSize;
      }
    }
    // SWA, PVC singles, LSZH, fire-rated: CPC EQUALS live
    else if (
      cableTypeStr.includes('swa') ||
      cableTypeStr.includes('singles') ||
      cableTypeStr.includes('lszh') ||
      cableTypeStr.includes('fp200') ||
      cableTypeStr.includes('fp400') ||
      cableTypeStr.includes('fire')
    ) {
      expectedCpcSize = liveSize; // CPC equals live conductor
      
      if (currentCpcSize !== expectedCpcSize) {
        this.logger.warn('CPC size correction applied (SWA/singles/fire-rated)', {
          circuit: circuit.name,
          cableType: cableTypeStr,
          liveSize,
          incorrectCpc: currentCpcSize,
          correctedCpc: expectedCpcSize
        });
        circuit.cpcSize = expectedCpcSize;
      }
    }
    // Fallback: validate using library function
    else {
      const validation = validateCpcSize(cableTypeStr, liveSize, currentCpcSize);
      
      if (!validation.valid) {
        this.logger.warn('CPC size correction applied (fallback)', {
          circuit: circuit.name,
          cableType: cableTypeStr,
          liveSize,
          incorrectCpc: currentCpcSize,
          correctedCpc: validation.expectedCpcSize,
          message: validation.message
        });
        circuit.cpcSize = validation.expectedCpcSize;
      }
    }

    this.logger.info('CPC size validated', {
      circuit: circuit.name,
      liveSize,
      cpcSize: circuit.cpcSize,
      cableType: cableTypeStr
    });

    return circuit;
  }

  /**
   * Parse cable type from circuit data
   */
  private parseCableType(circuit: DesignedCircuit): CableType {
    const cableDesc = (circuit as any).cableType?.toLowerCase() || '';

    if (cableDesc.includes('swa')) return 'swa';
    if (cableDesc.includes('xlpe') && cableDesc.includes('twin')) return 'xlpe-twin-earth';
    if (cableDesc.includes('xlpe')) return 'xlpe-single';
    if (cableDesc.includes('twin') || cableDesc.includes('t&e')) return 'pvc-twin-earth';
    if (cableDesc.includes('micc')) return 'micc';

    // Default based on special location
    if ((circuit.specialLocation || '').toLowerCase().includes('outdoor')) return 'swa';
    if ((circuit.specialLocation || '').toLowerCase().includes('buried')) return 'swa';

    return 'pvc-twin-earth'; // Default for domestic
  }
}
