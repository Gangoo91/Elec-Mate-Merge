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
  apply(
    circuits: DesignedCircuit[],
    installationType = 'domestic',
    earthing = 'TN-C-S'
  ): DesignedCircuit[] {
    const household = /domestic|household|residential/i.test(installationType);
    const tn = /^TN/i.test(earthing);
    return circuits.map((circuit, index) => {
      let modified = { ...circuit };

      // CHECK 1: Ring finals MUST be 32A (BS 7671 Appendix 15)
      modified = this.enforceRingFinal32A(modified, index);

      // CHECK 2: Socket circuits MUST have RCD/RCBO (BS 7671 Reg 411.3.3)
      modified = this.enforceSocketRCD(modified, index);

      // CHECK 2b: Domestic lighting MUST have 30 mA RCD (BS 7671 Reg 411.3.4, 2018)
      if (household) modified = this.enforceDomesticLightingRCD(modified, index);

      // CHECK 3: Fire/emergency circuits MUST use fire-rated cables (BS 5266-1, BS 5839-1)
      modified = this.enforceFireCircuitCables(modified, index);

      // CHECK 4: Fire alarm supply should NOT be on an RCD (BS 5839-1) — non-domestic.
      // After CHECK 3, which settles the cable and method.
      if (!household) modified = this.fireAlarmSupply(modified, index, tn);

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
        const correctedCableType =
          circuit.cableType?.replace(/\d+(\.\d+)?mm²/, '2.5mm²') || '2.5mm² twin and earth';

        this.logger.info('Ring final safety check applied', {
          circuit: circuit.name,
          index,
          cableType: circuit.cableType,
          correctedCableType,
          before: {
            rating: circuit.protectionDevice.rating,
            cable: circuit.cableSize,
            cpc: circuit.cpcSize,
          },
          after: {
            rating: 32,
            cable: 2.5,
            cpc: cpcSize,
          },
        });

        return {
          ...circuit,
          protectionDevice: {
            ...circuit.protectionDevice,
            rating: 32,
            type: 'RCBO', // Sockets need RCD
          },
          cableSize: 2.5,
          cpcSize: cpcSize,
          cableType: correctedCableType,
          circuitTopology: 'ring', // Explicitly mark as ring
          justifications: {
            ...circuit.justifications,
            safetyCheckApplied: `Ring final: 32A + 2.5mm² live + ${cpcSize}mm² CPC per BS 7671 Appendix 15`,
            cableSize: `Ring final circuit: 2.5mm² cable per BS 7671 Appendix 15 (${correctedCableType})`,
          },
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
            cable: circuit.cableSize,
          },
          after: {
            rating: 32,
            cable: 4.0,
          },
        });

        // Keep the cable name and CPC in step with the new size — this used
        // to leave "2.5mm² …" on a 4mm² circuit, and a 4mm² CPC on T&E,
        // which is made with 1.5mm² (6242Y).
        const typeText = String((circuit as any).cableType ?? '');
        const isTwinEarth = /twin|t\s*&\s*e|t\+e|6242|flat/i.test(typeText);
        const from = circuit.cableSize;
        return {
          ...circuit,
          cableSize: 4.0,
          cpcSize: isTwinEarth ? 1.5 : 4.0,
          cableType:
            typeText.replace(/\d+(?:\.\d+)?\s*mm²?/i, '4mm²') || (circuit as any).cableType,
          justifications: {
            ...circuit.justifications,
            safetyCheckApplied: 'Radial 32A: 4mm² minimum per BS 7671 Table 4D1A',
            cableSize:
              `Corrected from ${from}mm² to 4mm²: a 32A radial needs 4mm² minimum. ${circuit.justifications?.cableSize ?? ''}`.trim(),
          },
        };
      }
    }

    return circuit;
  }

  /**
   * Socket circuits MUST have RCD/RCBO protection
   */
  private enforceSocketRCD(circuit: DesignedCircuit, index: number): DesignedCircuit {
    const isSocket =
      circuit.loadType?.toLowerCase().includes('socket') ||
      circuit.name?.toLowerCase().includes('socket');

    if (!isSocket) return circuit;

    const hasRCD =
      circuit.protectionDevice.type === 'RCBO' || circuit.protectionDevice.type === 'RCD+MCB';

    if (!hasRCD) {
      this.logger.info('Socket RCD protection enforced', {
        circuit: circuit.name,
        index,
        before: circuit.protectionDevice.type,
        after: 'RCBO',
      });

      return {
        ...circuit,
        protectionDevice: {
          ...circuit.protectionDevice,
          type: 'RCBO',
        },
        justifications: {
          ...circuit.justifications,
          safetyCheckApplied: 'Socket circuit: RCBO protection per BS 7671 Reg 411.3.3',
        },
      };
    }

    return circuit;
  }

  /**
   * Lighting in domestic premises needs 30 mA additional protection (Reg
   * 411.3.4, since 2018). The model put every domestic lighting circuit in the
   * benchmark on a plain MCB with rcdProtected false.
   */
  private enforceDomesticLightingRCD(circuit: DesignedCircuit, index: number): DesignedCircuit {
    const isLighting = /light/i.test(`${circuit.loadType ?? ''} ${circuit.name ?? ''}`);
    if (!isLighting) return circuit;
    const type = String(circuit.protectionDevice?.type ?? '');
    const hasRCD = /RCBO|RCD/i.test(type) || (circuit as any).rcdProtected === true;
    if (hasRCD) return circuit;
    this.logger.info('Domestic lighting RCD protection enforced', {
      circuit: circuit.name,
      index,
      before: type,
      after: 'RCBO',
    });
    return {
      ...circuit,
      rcdProtected: true,
      protectionDevice: { ...circuit.protectionDevice, type: 'RCBO' },
      justifications: {
        ...circuit.justifications,
        safetyCheckApplied:
          'Domestic lighting circuit: 30 mA RCD protection per BS 7671 Reg 411.3.4 — RCBO specified.',
      },
    } as DesignedCircuit;
  }

  /**
   * BS 5839-1: the circuit supplying the fire detection and alarm system
   * should not be protected by an RCD unless BS 7671 makes one necessary,
   * and then a fault on any other circuit must not be able to isolate it.
   * The model put nearly every fire alarm circuit on an RCBO.
   *
   * On TN with surface wiring nothing in BS 7671 requires the RCD (no
   * sockets, not domestic lighting, not concealed in a wall — 522.6.202), so
   * it becomes an MCB. On TT the RCD is needed for fault protection (411.5),
   * so a dedicated RCBO stays and the note says why. Domestic smoke alarms
   * (BS 5839-6) are not in the RAG, so they are left as designed.
   */
  private fireAlarmSupply(circuit: DesignedCircuit, index: number, tn: boolean): DesignedCircuit {
    const kind = detectFireEmergencyCircuit(circuit.loadType || '', circuit.name || '');
    if (kind !== 'fire-alarm' && kind !== 'smoke-detection') return circuit;
    const type = String(circuit.protectionDevice?.type ?? '');
    const onRcd = /RCBO|RCD/i.test(type) || (circuit as any).rcdProtected === true;
    if (!onRcd) return circuit;
    const method = String((circuit as any).installationMethod ?? '').toLowerCase();
    const surface = /clipped|conduit|trunking|tray|surface|method [bce]\b/.test(method);
    if (!tn || !surface) {
      return {
        ...circuit,
        justifications: {
          ...circuit.justifications,
          safetyCheckApplied:
            'Fire alarm supply: RCD kept because BS 7671 needs it here (TT, or cable concealed in a wall). Use a dedicated RCBO so no fault on another circuit can isolate the fire alarm (BS 5839-1).',
        },
      } as DesignedCircuit;
    }
    this.logger.info('Fire alarm supply moved off RCD (BS 5839-1)', {
      circuit: circuit.name,
      index,
      before: type,
      after: 'MCB',
    });
    // The model's own notes still say RCBO; drop those and its RCD test.
    const mentionsRcd = (t: unknown) => /\bRCD\b|RCBO|residual/i.test(JSON.stringify(t ?? ''));
    const { rcd: _rcdTest, ...tests } = ((circuit as any).expectedTests ?? {}) as Record<
      string,
      unknown
    >;
    return {
      ...circuit,
      rcdProtected: false,
      protectionDevice: { ...circuit.protectionDevice, type: 'MCB' },
      ...((circuit as any).expectedTests ? { expectedTests: tests } : {}),
      regulation_refs: ((circuit as any).regulation_refs ?? []).filter(
        (r: unknown) => !mentionsRcd(r)
      ),
      ungrounded_choices: ((circuit as any).ungrounded_choices ?? []).filter(
        (u: unknown) => !mentionsRcd(u)
      ),
      justifications: {
        ...circuit.justifications,
        safetyCheckApplied:
          'Fire alarm supply: MCB, no RCD — BS 5839-1 says the supply should not be RCD-protected unless BS 7671 requires it, and nothing does on a TN supply with surface wiring. Dedicated circuit from the first distribution board, isolator labelled and protected against unauthorised operation.',
      },
    } as DesignedCircuit;
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
    const Ib = circuit.calculations?.Ib || loadPower / 230;
    if (loadPower > 7360 || Ib > 32) {
      this.logger.info('High-power load - NOT a ring circuit', {
        circuit: circuit.name,
        loadPower,
        Ib: Ib.toFixed(1),
        reason: 'Exceeds 32A ring circuit design limit',
      });
      return false;
    }

    // PRIORITY 0.5: DEDICATED INDUSTRIAL EQUIPMENT - NEVER RING
    const name = circuit.name?.toLowerCase() || '';
    const loadType = circuit.loadType?.toLowerCase() || '';
    const industrialKeywords = [
      'welding',
      'welder',
      'weld',
      'motor',
      'machine',
      'machinery',
      'compressor',
      'pump',
      'fan',
      'hvac',
      'chiller',
      'conveyor',
      'lathe',
      'drill',
      'press',
      'oven',
      'kiln',
      'furnace',
      'charger',
      'ev',
      'steam',
      'generator',
      'autoclave',
    ];

    if (industrialKeywords.some((kw) => name.includes(kw) || loadType.includes(kw))) {
      this.logger.info('Industrial equipment detected - NOT a ring circuit', {
        circuit: circuit.name,
        reason: 'Dedicated industrial equipment must be radial',
      });
      return false;
    }

    // Priority 2: Check justifications for ring markers
    const hasRingJustification =
      circuit.justifications?.cableSize?.toLowerCase().includes('ring') ||
      circuit.justifications?.protection?.toLowerCase().includes('ring');

    // Priority 3: Check circuit name/load type for explicit "ring" keyword
    const byKeyword = name.includes('ring') || loadType.includes('ring');

    return hasRingJustification || byKeyword;
  }

  /**
   * Detect radial 32A circuits that need 4mm² minimum
   */
  private detectRadial32A(circuit: DesignedCircuit): boolean {
    const isSocket =
      circuit.loadType?.toLowerCase().includes('socket') ||
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
    const circuitType = detectFireEmergencyCircuit(circuit.loadType || '', circuit.name || '');

    if (!circuitType) {
      return circuit; // Not a fire circuit, no enforcement needed
    }

    // Check if current cable is NOT fire-rated
    const cableType = circuit.cableType?.toLowerCase() || '';
    const isFireRated =
      cableType.includes('fp200') || cableType.includes('fp400') || cableType.includes('micc');

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
    const bsReference =
      circuitType === 'emergency-lighting'
        ? 'BS 5266-1'
        : circuitType === 'fire-alarm'
          ? 'BS 5839-1'
          : circuitType === 'smoke-detection'
            ? 'BS 5839-1'
            : circuitType === 'sprinkler-system'
              ? 'BS EN 12845'
              : 'BS 7671 Reg 560.8';

    this.logger.info('Fire circuit cable enforcement applied', {
      circuit: circuit.name,
      index,
      circuitType,
      before: {
        cableType: circuit.cableType,
        cable: circuit.cableSize,
        cpc: circuit.cpcSize,
      },
      after: {
        cableType: correctedCableType,
        cable: cableSize,
        cpc: cpcSize,
      },
      standard: bsReference,
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
        cableType: `${correctedCableType} - MANDATORY for ${circuitType.replace(/-/g, ' ')} circuits to maintain function during fire (${bsReference})`,
      },
    };
  }
}
