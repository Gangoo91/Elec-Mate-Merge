/**
 * Cable Type Tripwire — deterministic check that the AI picked the right
 * cable family for the location.
 *
 * The system prompt + RAG should guide this, but we backstop the most common
 * mistakes (T&E for outdoor circuits, T&E for buried/underground runs, non-fire
 * cable for fire/emergency) with a hard override.
 *
 * Mirrors the Zs tripwire pattern: silently corrects, no flagging unless the
 * caller wants the corrections list for telemetry.
 */

import type { DesignedCircuit } from './types.ts';

export interface CableTypeCorrection {
  circuitName: string;
  circuitNumber?: number;
  before: string;
  after: string;
  reason: string;
  reg: string;
}

const T_AND_E_PATTERN = /twin\s*(\&|and)\s*earth|t\s*\&\s*e|t\+e\b|6242y/i;
const SWA_PATTERN = /swa|steel\s*wire\s*armoured|6724/i;
const FIRE_RATED_PATTERN = /fp200|fp400|micc|mineral\s*insulated/i;
const LSZH_SINGLE_PATTERN = /lszh.*single|6491b|singles?\s*in\s*conduit|singles?\s*in\s*trunking/i;

const FIRE_CIRCUIT_KEYWORDS =
  /\b(fire\s*alarm|smoke\s*detect|emergency\s*light|exit\s*sign|sprinkler|sounder|aov|life\s*safety)\b/i;

function describesOutdoor(circuit: DesignedCircuit): boolean {
  const sl = String(circuit.specialLocation ?? '').toLowerCase();
  if (sl === 'outdoor' || sl === 'underground') return true;
  // Per-circuit `outdoorInstall` flag from the wizard
  if ((circuit as any).outdoorInstall) return true;
  const name = String(circuit.name ?? '').toLowerCase();
  const lt = String(circuit.loadType ?? '').toLowerCase();
  return /\b(outdoor|external|garden|car park|driveway|external lighting|external signage|fence)\b/.test(
    `${name} ${lt}`
  );
}

function describesUndergroundOrBuried(circuit: DesignedCircuit): boolean {
  const sl = String(circuit.specialLocation ?? '').toLowerCase();
  if (sl === 'underground') return true;
  const oi = String((circuit as any).outdoorInstall ?? '').toLowerCase();
  if (oi === 'buried') return true;
  const im = String(circuit.installationMethod ?? '').toLowerCase();
  return /buried|in\s*ground|direct\s*in\s*ground|method\s*d/i.test(im);
}

function describesFireCircuit(circuit: DesignedCircuit): boolean {
  const lt = String(circuit.loadType ?? '').toLowerCase();
  if (/fire-alarm|emergency-lighting|smoke-detection|sprinkler/i.test(lt)) return true;
  return FIRE_CIRCUIT_KEYWORDS.test(String(circuit.name ?? ''));
}

function describesIndustrialFixedPlant(circuit: DesignedCircuit): boolean {
  const lt = String(circuit.loadType ?? '').toLowerCase();
  return /three-phase-motor|machine-tool|welding|compressor|production-line|extraction|vfd/i.test(
    lt
  );
}

/**
 * Validate + override a circuit's cable type. Returns mutated circuit + correction
 * record (or null if no change needed).
 */
export function validateCableType(
  circuit: DesignedCircuit,
  logger: any
): { circuit: DesignedCircuit; correction: CableTypeCorrection | null } {
  const cableType = String(circuit.cableType ?? '');
  const cableSize = circuit.cableSize ?? 1.5;
  const cpcSize = circuit.cpcSize ?? cableSize;

  // Rule 1: Underground / buried → SWA mandatory (mechanical protection)
  if (describesUndergroundOrBuried(circuit) && !SWA_PATTERN.test(cableType)) {
    const newType = `${cableSize} mm² SWA 3-core 90°C XLPE`;
    logger?.info?.('🛡️ Cable tripwire: buried/underground → SWA', {
      circuit: circuit.name,
      before: cableType,
      after: newType,
    });
    return {
      circuit: {
        ...circuit,
        cableType: newType,
        installationMethod:
          circuit.installationMethod ?? 'Method D - direct in ground (verify covering depth)',
      },
      correction: {
        circuitName: circuit.name ?? 'Unnamed',
        circuitNumber: circuit.circuitNumber,
        before: cableType,
        after: newType,
        reason:
          'Buried / underground circuit — SWA cable mandatory for mechanical protection. T&E is not suitable for direct burial.',
        reg: '522.6 · BS 6724',
      },
    };
  }

  // Rule 2: Outdoor (above-ground external) — T&E unacceptable, must be SWA or LSZH+conduit
  if (describesOutdoor(circuit) && T_AND_E_PATTERN.test(cableType)) {
    const newType = `${cableSize} mm² SWA 3-core 90°C XLPE`;
    logger?.info?.('🛡️ Cable tripwire: outdoor + T&E → SWA', {
      circuit: circuit.name,
      before: cableType,
      after: newType,
    });
    return {
      circuit: {
        ...circuit,
        cableType: newType,
        cpcSize: cpcSize, // SWA armour can serve as CPC; keep declared CPC for schedule clarity
      },
      correction: {
        circuitName: circuit.name ?? 'Unnamed',
        circuitNumber: circuit.circuitNumber,
        before: cableType,
        after: newType,
        reason:
          'Outdoor / external circuit — twin & earth (BS 6004) is for indoor use only. SWA (BS 6724) provides UV and mechanical protection.',
        reg: '522.6 · 522.8 · BS 6724',
      },
    };
  }

  // Rule 3: Fire / emergency circuits — must be FP200/FP400 or MICC
  if (describesFireCircuit(circuit) && !FIRE_RATED_PATTERN.test(cableType)) {
    const newType = `${cableSize} mm² FP200 enhanced`;
    logger?.info?.('🛡️ Cable tripwire: fire circuit → FP200', {
      circuit: circuit.name,
      before: cableType,
      after: newType,
    });
    return {
      circuit: {
        ...circuit,
        cableType: newType,
        installationMethod: 'Clipped direct with fire-rated clips (BS 5266-1 / BS 5839-1)',
      },
      correction: {
        circuitName: circuit.name ?? 'Unnamed',
        circuitNumber: circuit.circuitNumber,
        before: cableType,
        after: newType,
        reason:
          'Fire alarm / emergency lighting / smoke detection circuit must use fire-rated cable to maintain integrity during fire (BS 5266-1, BS 5839-1, BS 7671 Section 560).',
        reg: '560.7 · BS 5266-1 · BS 5839-1',
      },
    };
  }

  // Rule 4: Industrial fixed plant (motors/machinery) → SWA preferred over T&E
  // Only flag if the AI picked T&E (very wrong for industrial), don't penalise LSZH singles.
  if (describesIndustrialFixedPlant(circuit) && T_AND_E_PATTERN.test(cableType)) {
    const newType = `${cableSize} mm² SWA 4-core 90°C XLPE`;
    logger?.info?.('🛡️ Cable tripwire: industrial plant + T&E → SWA', {
      circuit: circuit.name,
      before: cableType,
      after: newType,
    });
    return {
      circuit: {
        ...circuit,
        cableType: newType,
      },
      correction: {
        circuitName: circuit.name ?? 'Unnamed',
        circuitNumber: circuit.circuitNumber,
        before: cableType,
        after: newType,
        reason:
          'Industrial fixed plant (motors / machinery / VFDs) — SWA provides mechanical protection and EMC screening that T&E lacks.',
        reg: '522.6 · BS 6724',
      },
    };
  }

  void LSZH_SINGLE_PATTERN; // reserved for future commercial-only enforcement
  return { circuit, correction: null };
}

export function applyCableTypeTripwire(
  circuits: DesignedCircuit[],
  logger: any
): { circuits: DesignedCircuit[]; corrections: CableTypeCorrection[] } {
  const corrections: CableTypeCorrection[] = [];
  const fixed = circuits.map((c) => {
    const { circuit, correction } = validateCableType(c, logger);
    if (correction) corrections.push(correction);
    return circuit;
  });

  if (corrections.length > 0) {
    logger?.warn?.(`🛡️ Cable type tripwire corrected ${corrections.length} circuit(s)`, {
      count: corrections.length,
      circuits: corrections.map((c) => `${c.circuitName}: "${c.before}" → "${c.after}"`),
    });
  } else {
    logger?.info?.('✅ Cable type tripwire: all circuits match location requirements');
  }

  return { circuits: fixed, corrections };
}
