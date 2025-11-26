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

    // FIX 1: Downgrade oversized selections FIRST (SAFETY CRITICAL)
    circuit = this.autoDowngradeForType(circuit);

    // FIX 2: Upgrade cable for Zs compliance
    circuit = this.autoUpgradeCableForZs(circuit, supply);

    // FIX 3: Upgrade cable for voltage drop
    circuit = this.autoUpgradeCableForVD(circuit, supply);

    // FIX 4: Fix protection device (RCBO for sockets/bathrooms)
    circuit = this.autoFixProtection(circuit);

    // FIX 5: Fix cable type for environment
    circuit = this.autoFixCableType(circuit, supply.installationType);

    // FIX 6: Correct CPC size for cable type
    circuit = this.autoFixCpcSize(circuit);

    // FIX 7: Sync cableType string with cableSize (CRITICAL - must be LAST)
    circuit = this.syncCableType(circuit);

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
   * FIX 6: Auto-fix CPC size based on cable type
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

  /**
   * FIX 1: Auto-DOWNGRADE oversized cable/MCB for circuit type (SAFETY CRITICAL)
   */
  private autoDowngradeForType(circuit: DesignedCircuit): DesignedCircuit {
    const circuitType = this.detectCircuitType(circuit);
    const constraints = this.getLoadTypeConstraints(circuitType);
    
    // Downgrade oversized MCB
    if (circuit.protectionDevice.rating > constraints.maxMCB) {
      const Ib = circuit.calculations?.Ib || 1;
      const appropriateRating = this.getAppropriateRating(Ib, constraints.maxMCB);
      
      this.logger.info('Auto-downgrading oversized MCB', {
        circuit: circuit.name,
        type: circuitType,
        from: circuit.protectionDevice.rating,
        to: appropriateRating,
        reason: `${circuitType} circuits should not exceed ${constraints.maxMCB}A`
      });
      
      circuit.protectionDevice.rating = appropriateRating;
    }
    
    // Downgrade oversized cable (unless technically required for Zs/VD)
    if (circuit.cableSize > constraints.maxCable) {
      // Check if we can safely downgrade
      const technicallyRequired = circuit.calculations?.zs > (circuit.calculations?.maxZs || 999) ||
                                  (circuit.calculations?.voltageDrop?.percent || 0) > 5;
      
      if (!technicallyRequired) {
        this.logger.info('Auto-downgrading oversized cable', {
          circuit: circuit.name,
          type: circuitType,
          from: circuit.cableSize,
          to: constraints.typicalCable,
          reason: `${circuitType} typically uses ${constraints.typicalCable}mm²`
        });
        
        circuit.cableSize = constraints.typicalCable;
        circuit.cpcSize = getCpcSize((circuit as any).cableType || 'twin and earth', constraints.typicalCable);
      } else {
        this.logger.warn('Cannot downgrade cable - technically required for Zs/VD', {
          circuit: circuit.name,
          currentSize: circuit.cableSize
        });
      }
    }
    
    return circuit;
  }

  /**
   * FIX 7: Synchronize cableType string with cableSize (MUST BE LAST)
   */
  private syncCableType(circuit: DesignedCircuit): DesignedCircuit {
    const cableTypeLower = ((circuit as any).cableType || '').toLowerCase();
    
    // Extract base cable type
    let baseType = 'twin and earth';
    if (cableTypeLower.includes('swa')) {
      baseType = 'SWA (3-core)';
    } else if (cableTypeLower.includes('lszh')) {
      baseType = 'LSZH single core';
    } else if (cableTypeLower.includes('single')) {
      baseType = 'single core';
    }
    
    // Rebuild cableType with CORRECT size
    const correctCableType = `${circuit.cableSize}mm² ${baseType}`;
    
    if ((circuit as any).cableType !== correctCableType) {
      this.logger.info('Synchronizing cableType with cableSize', {
        circuit: circuit.name,
        from: (circuit as any).cableType,
        to: correctCableType
      });
      
      (circuit as any).cableType = correctCableType;
    }
    
    return circuit;
  }

  /**
   * Helper: Detect circuit type from circuit data
   */
  private detectCircuitType(circuit: DesignedCircuit): string {
    const name = circuit.name.toLowerCase();
    const type = circuit.loadType.toLowerCase();
    
    if (name.includes('ring') || type.includes('ring')) return 'socket_ring';
    if (type.includes('lighting') || name.includes('lighting') || name.includes('light')) return 'lighting';
    if (type.includes('socket') || name.includes('socket')) return 'socket';
    if (type.includes('cooker') || name.includes('cooker')) return 'cooker';
    if (type.includes('shower') || name.includes('shower')) return 'shower';
    if (type.includes('ev') || name.includes('ev') || name.includes('charger')) return 'ev_charger';
    
    return 'default';
  }

  /**
   * Helper: Get load type constraints
   */
  private getLoadTypeConstraints(circuitType: string): { maxMCB: number, maxCable: number, typicalCable: number } {
    const constraints: Record<string, { maxMCB: number, maxCable: number, typicalCable: number }> = {
      'lighting': { maxMCB: 16, maxCable: 2.5, typicalCable: 1.5 },
      'socket_ring': { maxMCB: 32, maxCable: 2.5, typicalCable: 2.5 },
      'socket': { maxMCB: 32, maxCable: 6, typicalCable: 2.5 },
      'cooker': { maxMCB: 50, maxCable: 16, typicalCable: 10 },
      'shower': { maxMCB: 50, maxCable: 16, typicalCable: 10 },
      'ev_charger': { maxMCB: 40, maxCable: 16, typicalCable: 10 },
      'default': { maxMCB: 63, maxCable: 50, typicalCable: 2.5 }
    };
    
    return constraints[circuitType] || constraints['default'];
  }

  /**
   * Helper: Get appropriate MCB rating for design current within type maximum
   */
  private getAppropriateRating(Ib: number, maxRating: number): number {
    const standardMCBs = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100];
    const requiredRating = Ib * 1.1; // Add 10% margin
    
    // Find smallest MCB that covers load, but doesn't exceed type maximum
    for (const rating of standardMCBs) {
      if (rating >= requiredRating && rating <= maxRating) {
        return rating;
      }
    }
    
    // If no suitable rating found, use the maximum allowed for this type
    return maxRating;
  }
}
