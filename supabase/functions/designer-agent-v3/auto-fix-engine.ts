/**
 * Auto-Fix Engine
 * Applies deterministic fixes to circuits BEFORE validation
 * Ensures common compliance issues are resolved automatically
 */

import type { DesignedCircuit, NormalizedSupply } from './types.ts';
import { getCpcSize } from '../_shared/bs7671-data/cpcSizes.ts';

export class AutoFixEngine {
  constructor(private logger: any) {}

  /**
   * Apply auto-fixes to all circuits
   */
  fixAll(circuits: DesignedCircuit[], supply: NormalizedSupply): DesignedCircuit[] {
    this.logger.info('Auto-fix engine starting', {
      circuits: circuits.length
    });

    return circuits.map((circuit, idx) => {
      try {
        return this.fixCircuit(circuit, supply, idx);
      } catch (error) {
        this.logger.error('Auto-fix failed for circuit', {
          circuit: circuit.name,
          error: error instanceof Error ? error.message : String(error)
        });
        return circuit; // Return original if fix fails
      }
    });
  }

  /**
   * Apply all auto-fixes to a single circuit
   */
  private fixCircuit(
    circuit: DesignedCircuit,
    supply: NormalizedSupply,
    index: number
  ): DesignedCircuit {
    const originalCable = circuit.cableSize;
    const originalProtection = circuit.protectionDevice.type;

    // FIX 1: Upgrade cable for Zs compliance
    circuit = this.autoUpgradeCableForZs(circuit, supply);

    // FIX 2: Upgrade cable for voltage drop
    circuit = this.autoUpgradeCableForVD(circuit, supply);

    // FIX 3: Fix protection device (RCBO for sockets/bathrooms)
    circuit = this.autoFixProtection(circuit);

    // FIX 4: Fix cable type for environment
    circuit = this.autoFixCableType(circuit, supply.installationType);

    // FIX 5: Correct CPC size for cable type
    circuit = this.autoFixCpcSize(circuit);

    // Log changes
    if (circuit.cableSize !== originalCable || circuit.protectionDevice.type !== originalProtection) {
      this.logger.info('Auto-fix applied', {
        circuit: circuit.name,
        changes: {
          cable: originalCable !== circuit.cableSize ? `${originalCable}mm² → ${circuit.cableSize}mm²` : 'unchanged',
          protection: originalProtection !== circuit.protectionDevice.type ? `${originalProtection} → ${circuit.protectionDevice.type}` : 'unchanged'
        }
      });
    }

    return circuit;
  }

  /**
   * FIX 1: Auto-upgrade cable for Zs compliance
   */
  private autoUpgradeCableForZs(circuit: DesignedCircuit, supply: NormalizedSupply): DesignedCircuit {
    if (!circuit.calculations?.zs || !circuit.calculations?.maxZs) {
      return circuit; // No Zs data to check
    }

    const currentZs = circuit.calculations.zs;
    const maxZs = circuit.calculations.maxZs;

    if (currentZs > maxZs) {
      // Zs failure - upgrade cable
      const standardSizes = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50];
      const currentSizeIndex = standardSizes.indexOf(circuit.cableSize);

      if (currentSizeIndex < standardSizes.length - 1) {
        const upgradedSize = standardSizes[currentSizeIndex + 1];
        this.logger.info('Auto-upgrading cable for Zs compliance', {
          circuit: circuit.name,
          from: circuit.cableSize,
          to: upgradedSize,
          currentZs: currentZs.toFixed(3),
          maxZs: maxZs.toFixed(3)
        });

        circuit.cableSize = upgradedSize;
        circuit.cpcSize = getCpcSize((circuit as any).cableType || 'twin and earth', upgradedSize);
      }
    }

    return circuit;
  }

  /**
   * FIX 2: Auto-upgrade cable for voltage drop
   */
  private autoUpgradeCableForVD(circuit: DesignedCircuit, supply: NormalizedSupply): DesignedCircuit {
    if (!circuit.calculations?.voltageDrop?.percent) {
      return circuit;
    }

    const vdPercent = circuit.calculations.voltageDrop.percent;
    const limit = circuit.calculations.voltageDrop.limit || 5;

    if (vdPercent > limit) {
      // Voltage drop failure - upgrade cable
      const standardSizes = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50];
      const currentSizeIndex = standardSizes.indexOf(circuit.cableSize);

      if (currentSizeIndex < standardSizes.length - 1) {
        const upgradedSize = standardSizes[currentSizeIndex + 1];
        this.logger.info('Auto-upgrading cable for voltage drop', {
          circuit: circuit.name,
          from: circuit.cableSize,
          to: upgradedSize,
          currentVD: `${vdPercent.toFixed(2)}%`,
          limit: `${limit}%`
        });

        circuit.cableSize = upgradedSize;
        circuit.cpcSize = getCpcSize((circuit as any).cableType || 'twin and earth', upgradedSize);
      }
    }

    return circuit;
  }

  /**
   * FIX 3: Auto-fix protection device (RCBO for sockets/bathrooms)
   */
  private autoFixProtection(circuit: DesignedCircuit): DesignedCircuit {
    const loadTypeLower = circuit.loadType.toLowerCase();
    const specialLocationLower = (circuit.specialLocation || '').toLowerCase();

    const requiresRCBO =
      loadTypeLower.includes('socket') ||
      specialLocationLower === 'bathroom' ||
      loadTypeLower.includes('bathroom');

    if (requiresRCBO && circuit.protectionDevice.type !== 'RCBO') {
      this.logger.info('Auto-fixing protection device to RCBO', {
        circuit: circuit.name,
        reason: 'Socket circuit or bathroom location (BS 7671 Reg 411.3.3)'
      });

      circuit.protectionDevice.type = 'RCBO';
      (circuit as any).rcdProtected = true;
    }

    return circuit;
  }

  /**
   * FIX 4: Auto-fix cable type for environment
   */
  private autoFixCableType(circuit: DesignedCircuit, installationType: string): DesignedCircuit {
    const cableTypeLower = ((circuit as any).cableType || '').toLowerCase();
    const specialLocationLower = (circuit.specialLocation || '').toLowerCase();

    // Outdoor/underground must use SWA
    if (specialLocationLower === 'outdoor' || specialLocationLower === 'underground') {
      if (!cableTypeLower.includes('swa')) {
        this.logger.info('Auto-fixing cable type for outdoor/underground', {
          circuit: circuit.name,
          from: (circuit as any).cableType,
          to: 'SWA'
        });

        (circuit as any).cableType = `${circuit.cableSize}mm² SWA (3-core)`;
        circuit.cpcSize = circuit.cableSize; // SWA has equal CPC size
      }
      return circuit;
    }

    // Commercial: No twin & earth
    if (installationType === 'commercial' && cableTypeLower.includes('twin')) {
      this.logger.info('Auto-fixing cable type for commercial', {
        circuit: circuit.name,
        from: (circuit as any).cableType,
        to: 'LSZH singles'
      });

      (circuit as any).cableType = `${circuit.cableSize}mm² LSZH single core`;
      circuit.cpcSize = circuit.cableSize; // Singles have equal CPC
    }

    // Industrial: No twin & earth
    if (installationType === 'industrial' && cableTypeLower.includes('twin')) {
      this.logger.info('Auto-fixing cable type for industrial', {
        circuit: circuit.name,
        from: (circuit as any).cableType,
        to: 'SWA'
      });

      (circuit as any).cableType = `${circuit.cableSize}mm² SWA (3-core)`;
      circuit.cpcSize = circuit.cableSize; // SWA has equal CPC
    }

    return circuit;
  }

  /**
   * FIX 5: Auto-fix CPC size based on cable type
   */
  private autoFixCpcSize(circuit: DesignedCircuit): DesignedCircuit {
    const correctCpcSize = getCpcSize((circuit as any).cableType || 'twin and earth', circuit.cableSize);

    if (circuit.cpcSize !== correctCpcSize) {
      this.logger.info('Auto-fixing CPC size', {
        circuit: circuit.name,
        cableType: (circuit as any).cableType,
        from: circuit.cpcSize,
        to: correctCpcSize
      });

      circuit.cpcSize = correctCpcSize;
    }

    return circuit;
  }
}
