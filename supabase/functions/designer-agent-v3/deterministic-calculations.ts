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

      // POST-GENERATION ZS AUTO-UPGRADE
      if (!zsResult.compliant && zsResult.calculatedZs > zsResult.maxZs) {
        this.logger.warn('Zs non-compliant, attempting cable upgrade', {
          circuit: circuit.name,
          currentSize: circuit.cableSize,
          currentZs: zsResult.calculatedZs.toFixed(3),
          maxZs: zsResult.maxZs.toFixed(3)
        });

        circuit = this.autoUpgradeCableForZs(circuit, supply, cableType, effectiveLength);
      }
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
   * FIXED: Detection is now cable-size-agnostic to prevent circular dependency
   */
  private isRingFinal(circuit: DesignedCircuit): boolean {
    const name = circuit.name?.toLowerCase() || '';
    const loadType = circuit.loadType?.toLowerCase() || '';
    const justification = circuit.justifications?.cableSize?.toLowerCase() || '';
    
    // Check name and loadType FIRST (cable-agnostic detection)
    if (name.includes('ring') || 
        loadType.includes('ring') || 
        loadType.includes('socket_ring') ||
        justification.includes('ring final') ||
        justification.includes('ring circuit')) {
      return true;
    }
    
    // Socket circuit with 32A protection = likely ring final (regardless of cable size)
    // This catches rings that weren't explicitly labeled as such
    if (loadType.includes('socket') && circuit.protectionDevice.rating === 32) {
      return true;
    }
    
    return false;
  }

  /**
   * Validate and correct CPC size based on cable type (BS 7671 Table 54.7)
   * This is a critical safety net to ensure accurate R1+R2 and Zs calculations
   */
  private validateAndCorrectCpcSize(circuit: DesignedCircuit): DesignedCircuit {
    const cableTypeStr = (circuit as any).cableType || '';
    const liveSize = circuit.cableSize;
    const currentCpcSize = circuit.cpcSize;

    const validation = validateCpcSize(cableTypeStr, liveSize, currentCpcSize);

    if (!validation.valid) {
      this.logger.warn('CPC size correction applied', {
        circuit: circuit.name,
        cableType: cableTypeStr,
        liveSize,
        incorrectCpc: currentCpcSize,
        correctedCpc: validation.expectedCpcSize,
        message: validation.message
      });

      // Auto-correct the CPC size
      circuit.cpcSize = validation.expectedCpcSize;
    } else {
      this.logger.info('CPC size validated', {
        circuit: circuit.name,
        liveSize,
        cpcSize: currentCpcSize,
        cableType: cableTypeStr
      });
    }

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

  /**
   * Auto-upgrade cable for Zs compliance (used after deterministic calculation)
   * FIXED: NEVER upgrades ring finals - they MUST stay 2.5mm²
   */
  private autoUpgradeCableForZs(
    circuit: DesignedCircuit,
    supply: NormalizedSupply,
    cableType: CableType,
    effectiveLength: number
  ): DesignedCircuit {
    // CRITICAL: Ring finals MUST NOT be upgraded - they must stay 2.5mm²
    if (this.isRingFinal(circuit)) {
      this.logger.warn('Zs non-compliant on ring final - CANNOT upgrade cable (must stay 2.5mm²)', {
        circuit: circuit.name,
        currentCable: `${circuit.cableSize}mm²`,
        recommendation: 'Reduce cable length or split into two rings',
        regulation: 'BS 7671 Appendix 15 - Ring finals are 2.5mm² + 32A RCBO standard'
      });
      
      // Add warning to circuit but don't upgrade
      (circuit as any).warnings = [
        ...((circuit as any).warnings || []),
        'Ring final Zs exceeds limit - consider splitting into two rings or reducing cable length'
      ];
      
      return circuit; // Return unchanged - ring finals stay 2.5mm²
    }
    
    const standardSizes = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95];
    const currentIndex = standardSizes.indexOf(circuit.cableSize);

    if (currentIndex === -1 || currentIndex === standardSizes.length - 1) {
      this.logger.warn('Cannot upgrade cable: at max size or invalid size', {
        circuit: circuit.name,
        currentSize: circuit.cableSize
      });
      return circuit;
    }

    const upgradedSize = standardSizes[currentIndex + 1];
    this.logger.info('Upgrading cable for Zs compliance', {
      circuit: circuit.name,
      from: circuit.cableSize,
      to: upgradedSize
    });

    // Update cable size and CPC
    circuit.cableSize = upgradedSize;
    circuit.cpcSize = getCpcSize((circuit as any).cableType || 'twin and earth', upgradedSize);

    // Recalculate Zs with new cable size
    const newZsResult = calculateEarthFaultLoop({
      externalZe: supply.ze,
      cableType,
      cableSize: upgradedSize,
      cpcSize: circuit.cpcSize,
      length: effectiveLength,
      temperature: 70,
      protectiveDevice: {
        type: circuit.protectionDevice.curve,
        rating: circuit.protectionDevice.rating
      }
    });

    if (newZsResult) {
      circuit.calculations.zs = newZsResult.calculatedZs;
      (circuit.calculations as any).r1r2 = newZsResult.r1PlusR2;

      this.logger.info('Cable upgraded - new Zs calculated', {
        circuit: circuit.name,
        newZs: `${newZsResult.calculatedZs.toFixed(3)}Ω`,
        maxZs: `${newZsResult.maxZs.toFixed(3)}Ω`,
        nowCompliant: newZsResult.compliant
      });
    }

    return circuit;
  }
}

/**
 * LAYER 3: Validate cable type for installation environment (Post-AI Safety Net)
 */
export function validateCableTypeForEnvironment(
  cableType: string,
  installationType: string,
  specialLocation?: string
): { valid: boolean; reason?: string; suggestedType?: string } {
  const cableLower = cableType.toLowerCase();
  
  // Domestic rules
  if (installationType === 'domestic') {
    if (specialLocation?.toLowerCase() === 'outdoor' && !cableLower.includes('swa')) {
      return { 
        valid: false, 
        reason: 'Outdoor domestic circuits must use SWA',
        suggestedType: cableType.replace(/twin.*earth|lszh.*single|fp\d+/i, 'SWA')
      };
    }
    if (cableLower.includes('lszh') || cableLower.includes('fp200') || cableLower.includes('fp400')) {
      return { 
        valid: false, 
        reason: 'LSZH/FP cables not standard for domestic installations - use twin & earth or SWA',
        suggestedType: cableType.replace(/lszh.*single|fp\d+/i, 'twin and earth')
      };
    }
  }
  
  // Commercial rules
  if (installationType === 'commercial') {
    if (cableLower.includes('twin') && cableLower.includes('earth')) {
      return { 
        valid: false, 
        reason: 'Twin & Earth not permitted in commercial installations - use LSZH singles or SWA',
        suggestedType: cableType.replace(/twin.*earth/i, 'LSZH single')
      };
    }
  }
  
  // Industrial rules
  if (installationType === 'industrial') {
    if (cableLower.includes('twin') && cableLower.includes('earth')) {
      return { 
        valid: false, 
        reason: 'Twin & Earth not permitted in industrial installations - use SWA or LSZH singles',
        suggestedType: cableType.replace(/twin.*earth/i, 'SWA')
      };
    }
  }
  
  return { valid: true };
}
