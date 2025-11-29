/**
 * Minimal Safety Checks
 * Only enforces UK-specific rules that AI often misses:
 * 1. Ring final circuits MUST be 32A
 * 2. Socket circuits MUST have RCD/RCBO protection
 */

import type { DesignedCircuit } from './types.ts';

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

      return modified;
    });
  }

  /**
   * Ring finals MUST be 32A with 2.5mm² cable
   */
  private enforceRingFinal32A(circuit: DesignedCircuit, index: number): DesignedCircuit {
    const isRingFinal = this.detectRingFinal(circuit);
    
    if (!isRingFinal) return circuit;

    const needsFix = circuit.protectionDevice.rating !== 32 || circuit.cableSize !== 2.5;

    if (needsFix) {
      this.logger.info('Ring final safety check applied', {
        circuit: circuit.name,
        index,
        before: {
          rating: circuit.protectionDevice.rating,
          cable: circuit.cableSize
        },
        after: {
          rating: 32,
          cable: 2.5
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
        cpcSize: 1.5, // BS 7671 Table 54.7 for twin & earth
        justifications: {
          ...circuit.justifications,
          safetyCheckApplied: 'Ring final: 32A + 2.5mm² per BS 7671 Appendix 15'
        }
      };
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
   * Detect ring final circuits by characteristics
   */
  private detectRingFinal(circuit: DesignedCircuit): boolean {
    const byKeyword = circuit.name?.toLowerCase().includes('ring') ||
                      circuit.loadType?.toLowerCase().includes('ring');
    
    const byCharacteristics = (
      (circuit.loadType?.toLowerCase().includes('socket') || circuit.name?.toLowerCase().includes('socket')) &&
      circuit.cableSize === 2.5
    );

    return byKeyword || byCharacteristics;
  }
}
