/**
 * Minimal Safety Checks
 * Only enforces UK-specific rules that AI often misses:
 * 1. Ring final circuits MUST be 32A
 * 2. Socket circuits MUST have RCD/RCBO protection
 * 3. Fire/emergency circuits MUST use fire-rated cables
 */

import type { DesignedCircuit } from './types.ts';
import { detectFireEmergencyCircuit } from '../_shared/cable-enclosure-rules.ts';

export class MinimalSafetyChecks {
  constructor(private logger: any) {}

  /**
   * Apply minimal safety checks - trust the AI for everything else
   */
  apply(circuits: DesignedCircuit[]): DesignedCircuit[] {
    return circuits.map((circuit, index) => {
      let modified = { ...circuit };

      // CHECK 1: Ring finals MUST be 32A (BS 7671 Appendix 15)
      modified = this.enforceRingFinal32A(modified, index);

      // CHECK 2: Socket circuits MUST have RCD/RCBO (BS 7671 Reg 411.3.3)
      modified = this.enforceSocketRCD(modified, index);

      // CHECK 3: Fire/emergency circuits MUST use fire-rated cables (BS 5266-1, BS 5839-1)
      modified = this.enforceFireCircuitCables(modified, index);

      return modified;
    });
  }

  /**
   * Ring finals MUST be 32A with 2.5mm² cable
   * CPC sizing depends on cable type:
   * - Twin & Earth: 1.5mm² CPC (reduced per Table 54.7)
   * - Singles: 2.5mm² CPC (equal size for practicality)
   * Radial 32A MUST be 4mm² minimum
   */
  private enforceRingFinal32A(circuit: DesignedCircuit, index: number): DesignedCircuit {
    const isRingFinal = this.detectRingFinal(circuit);
    const isRadial32A = this.detectRadial32A(circuit);
    
    if (isRingFinal) {
      const needsFix = circuit.protectionDevice.rating !== 32 || circuit.cableSize !== 2.5;

      if (needsFix) {
        // Determine CPC size based on cable type
        const cableType = circuit.cableType?.toLowerCase() || '';
        const isTwinEarth = cableType.includes('twin') || cableType.includes('t&e');
        const cpcSize = isTwinEarth ? 1.5 : 2.5; // T&E reduced, singles equal

        // Fix cable type string to show consistent 2.5mm² for ring finals
        const correctedCableType = circuit.cableType?.replace(/\d+(\.\d+)?mm²/, '2.5mm²') 
          || '2.5mm² twin and earth';

        this.logger.info('Ring final safety check applied', {
          circuit: circuit.name,
          index,
          cableType: circuit.cableType,
          correctedCableType,
          before: {
            rating: circuit.protectionDevice.rating,
            cable: circuit.cableSize,
            cpc: circuit.cpcSize
          },
          after: {
            rating: 32,
            cable: 2.5,
            cpc: cpcSize
          }
        });

        return {
          ...circuit,
          protectionDevice: {
            ...circuit.protectionDevice,
            rating: 32,
            type: 'RCBO' // Sockets need RCD
          },
          cableSize: 2.5,
          cpcSize: cpcSize,
          cableType: correctedCableType,
          circuitTopology: 'ring', // Explicitly mark as ring
          justifications: {
            ...circuit.justifications,
            safetyCheckApplied: `Ring final: 32A + 2.5mm² live + ${cpcSize}mm² CPC per BS 7671 Appendix 15`,
            cableSize: `Ring final circuit: 2.5mm² cable per BS 7671 Appendix 15 (${correctedCableType})`
          }
        };
      }
    }
    
    if (isRadial32A) {
      const needsFix = circuit.cableSize < 4.0;
      
      if (needsFix) {
        this.logger.info('Radial 32A safety check applied', {
          circuit: circuit.name,
          index,
          before: {
            rating: circuit.protectionDevice.rating,
            cable: circuit.cableSize
          },
          after: {
            rating: 32,
            cable: 4.0
          }
        });

        return {
          ...circuit,
          cableSize: 4.0,
          cpcSize: 4.0, // Equal for SWA/singles, or 2.5 for T&E
          justifications: {
            ...circuit.justifications,
            safetyCheckApplied: 'Radial 32A: 4mm² minimum per BS 7671 Table 4D1A'
          }
        };
      }
    }

    return circuit;
  }

  /**
   * Socket circuits MUST have RCD/RCBO protection
   */
  private enforceSocketRCD(circuit: DesignedCircuit, index: number): DesignedCircuit {
    const isSocket = circuit.loadType?.toLowerCase().includes('socket') ||
                     circuit.name?.toLowerCase().includes('socket');

    if (!isSocket) return circuit;

    const hasRCD = circuit.protectionDevice.type === 'RCBO' || 
                   circuit.protectionDevice.type === 'RCD+MCB';

    if (!hasRCD) {
      this.logger.info('Socket RCD protection enforced', {
        circuit: circuit.name,
        index,
        before: circuit.protectionDevice.type,
        after: 'RCBO'
      });

      return {
        ...circuit,
        protectionDevice: {
          ...circuit.protectionDevice,
          type: 'RCBO'
        },
        justifications: {
          ...circuit.justifications,
          safetyCheckApplied: 'Socket circuit: RCBO protection per BS 7671 Reg 411.3.3'
        }
      };
    }

    return circuit;
  }

  /**
   * Detect ring final circuits by explicit topology field or characteristics
   */
  private detectRingFinal(circuit: DesignedCircuit): boolean {
    // Priority 1: Check explicit circuitTopology field
    if (circuit.circuitTopology === 'ring') {
      return true;
    }
    
    // PRIORITY 0: HIGH-POWER LOADS (>32A/7.36kW) ARE NEVER RING CIRCUITS
    // Ring circuits have 32A max protection - anything above MUST be radial
    const loadPower = circuit.loadPower || 0;
    const Ib = circuit.calculations?.Ib || (loadPower / 230);
    if (loadPower > 7360 || Ib > 32) {
      this.logger.info('High-power load - NOT a ring circuit', {
        circuit: circuit.name,
        loadPower,
        Ib: Ib.toFixed(1),
        reason: 'Exceeds 32A ring circuit design limit'
      });
      return false;
    }
    
    // PRIORITY 0.5: DEDICATED INDUSTRIAL EQUIPMENT - NEVER RING
    const name = circuit.name?.toLowerCase() || '';
    const loadType = circuit.loadType?.toLowerCase() || '';
    const industrialKeywords = [
      'welding', 'welder', 'weld', 'motor', 'machine', 'machinery',
      'compressor', 'pump', 'fan', 'hvac', 'chiller', 'conveyor',
      'lathe', 'drill', 'press', 'oven', 'kiln', 'furnace',
      'charger', 'ev', 'steam', 'generator', 'autoclave'
    ];
    
    if (industrialKeywords.some(kw => name.includes(kw) || loadType.includes(kw))) {
      this.logger.info('Industrial equipment detected - NOT a ring circuit', {
        circuit: circuit.name,
        reason: 'Dedicated industrial equipment must be radial'
      });
      return false;
    }
    
    // Priority 2: Check justifications for ring markers
    const hasRingJustification = circuit.justifications?.cableSize?.toLowerCase().includes('ring') ||
                                  circuit.justifications?.protection?.toLowerCase().includes('ring');
    
    // Priority 3: Check circuit name/load type for explicit "ring" keyword
    const byKeyword = name.includes('ring') || loadType.includes('ring');
    
    return hasRingJustification || byKeyword;
  }

  /**
   * Detect radial 32A circuits that need 4mm² minimum
   */
  private detectRadial32A(circuit: DesignedCircuit): boolean {
    const isSocket = circuit.loadType?.toLowerCase().includes('socket') ||
                     circuit.name?.toLowerCase().includes('socket');
    
    const is32A = circuit.protectionDevice.rating === 32;
    
    const isNotRing = !this.detectRingFinal(circuit);
    
    return isSocket && is32A && isNotRing;
  }

  /**
   * Fire/emergency circuits MUST use fire-rated cables (FP200/FP400/MICC)
   * BS 5266-1 (Emergency Lighting), BS 5839-1 (Fire Alarms)
   */
  private enforceFireCircuitCables(circuit: DesignedCircuit, index: number): DesignedCircuit {
    // Detect if this is a fire/emergency circuit
    const circuitType = detectFireEmergencyCircuit(
      circuit.loadType || '',
      circuit.name || ''
    );

    if (!circuitType) {
      return circuit; // Not a fire circuit, no enforcement needed
    }

    // Check if current cable is NOT fire-rated
    const cableType = circuit.cableType?.toLowerCase() || '';
    const isFireRated = cableType.includes('fp200') || 
                        cableType.includes('fp400') || 
                        cableType.includes('micc');

    if (isFireRated) {
      return circuit; // Already using fire-rated cable, all good
    }

    // NON-COMPLIANT: Using non-fire-rated cable for fire circuit
    // Override to FP200 (most common fire-rated cable)
    const cableSize = circuit.cableSize || 1.5;
    const correctedCableType = `${cableSize}mm² FP200`;

    // Determine CPC size - FP200 typically has equal or slightly larger CPC
    const cpcSize = cableSize >= 2.5 ? cableSize : 1.5;

    // Map circuit type to BS reference
    const bsReference = circuitType === 'emergency-lighting' ? 'BS 5266-1' :
                        circuitType === 'fire-alarm' ? 'BS 5839-1' :
                        circuitType === 'smoke-detection' ? 'BS 5839-1' :
                        circuitType === 'sprinkler-system' ? 'BS EN 12845' :
                        'BS 7671 Reg 560.8';

    this.logger.info('Fire circuit cable enforcement applied', {
      circuit: circuit.name,
      index,
      circuitType,
      before: {
        cableType: circuit.cableType,
        cable: circuit.cableSize,
        cpc: circuit.cpcSize
      },
      after: {
        cableType: correctedCableType,
        cable: cableSize,
        cpc: cpcSize
      },
      standard: bsReference
    });

    return {
      ...circuit,
      cableType: correctedCableType,
      cableSize: cableSize,
      cpcSize: cpcSize,
      installationMethod: 'clipped direct with fire-rated clips',
      justifications: {
        ...circuit.justifications,
        safetyCheckApplied: `Fire/emergency circuit: ${correctedCableType} per ${bsReference} - fire-rated cable mandatory for circuit integrity during fire conditions`,
        cableType: `${correctedCableType} - MANDATORY for ${circuitType.replace(/-/g, ' ')} circuits to maintain function during fire (${bsReference})`
      }
    };
  }
}
