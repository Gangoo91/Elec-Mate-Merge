// COMPATIBILITY ADAPTER (ELE-1257) — the legacy cable-capacity API, now backed
// entirely by the adversarially verified BS 7671 Appendix 4 dataset in
// appendix4CurrentCapacity.ts. The old hand-typed tables that lived here
// diverged from BS 7671 on 161 of 171 comparable values (IEC 60364-5-52
// pattern) and have been deleted.
//
// Legacy consumers (apprentice cable-sizing calc, cableCapacityEngine,
// simplifiedCableSizingEngine, motorStartingEngine) keep their call sites:
// the old method keys (A1/A2/B/C/E/F/G, and C2/C3/D2/D3/E2/E3 for SWA) are
// projected from the verified tables at module load.
//
// Types with no verified BS 7671 table (single-core armoured 4D3A, aluminium
// 4J tables) return no data — their UI options have been removed.

import { capacityTables, CableTypeKey, PhaseKey } from './appendix4CurrentCapacity';

export interface CableCapacity {
  size: number;
  capacities: {
    [key: string]: number; // Legacy reference-method key -> current rating (A)
  };
  resistance?: number; // mΩ/m
  reactance?: number; // mΩ/m
}

export interface ThermalInsulationCapacity {
  size: number;
  method100e: number; // Above ceiling, insulation ≤100mm
  method101e: number; // Above ceiling, insulation >100mm
  method102e: number; // Stud wall, touching inner wall surface
  method103e: number; // Stud wall, not touching inner surface
  methodA: number; // Reference Method A
  methodB: number; // Reference Method B
  methodC: number; // Reference Method C (clipped direct)
}

// Copper conductor DC resistance at 20°C (BS EN 60228 nominal), mΩ/m.
const COPPER_RESISTANCE: Record<string, number> = {
  '1': 18.1,
  '1.5': 12.1,
  '2.5': 7.41,
  '4': 4.61,
  '6': 3.08,
  '10': 1.83,
  '16': 1.15,
  '25': 0.727,
  '35': 0.524,
  '50': 0.387,
  '70': 0.268,
  '95': 0.193,
  '120': 0.153,
  '150': 0.124,
  '185': 0.0991,
  '240': 0.0754,
  '300': 0.0601,
  '400': 0.047,
};

// Typical single-core reactance, mΩ/m — carried over for legacy consumers.
const REACTANCE: Record<string, number> = {
  '1': 0.14,
  '1.5': 0.13,
  '2.5': 0.12,
  '4': 0.11,
  '6': 0.11,
  '10': 0.1,
  '16': 0.09,
};
const DEFAULT_REACTANCE = 0.08;

interface LegacyKeySpec {
  /** Verified-module methods to try, first match wins */
  methods: string[];
  phase?: PhaseKey;
}

function columnFor(
  type: CableTypeKey,
  methods: string[],
  phase: PhaseKey
): Record<string, number> | null {
  const table = capacityTables[type];
  if (!table) return null;
  for (const m of methods) {
    const col = table.methods[m]?.[phase];
    if (col) return col;
  }
  return null;
}

/**
 * Project verified tables onto the legacy {size, capacities} shape.
 * When several source types are given (mineral light + heavy), the LOWER
 * value wins for a shared size — always the conservative direction.
 */
function buildLegacy(
  types: CableTypeKey[],
  keySpecs: Record<string, LegacyKeySpec>
): CableCapacity[] {
  const bySize = new Map<number, CableCapacity>();
  for (const [legacyKey, spec] of Object.entries(keySpecs)) {
    for (const type of types) {
      const col = columnFor(type, spec.methods, spec.phase ?? 'singlePhase');
      if (!col) continue;
      for (const [sizeKey, it] of Object.entries(col)) {
        const size = parseFloat(sizeKey);
        let entry = bySize.get(size);
        if (!entry) {
          const rKey = String(size);
          entry = {
            size,
            capacities: {},
            resistance: COPPER_RESISTANCE[rKey],
            reactance: REACTANCE[rKey] ?? DEFAULT_REACTANCE,
          };
          bySize.set(size, entry);
        }
        const existing = entry.capacities[legacyKey];
        entry.capacities[legacyKey] = existing === undefined ? it : Math.min(existing, it);
      }
    }
  }
  return [...bySize.values()].sort((a, b) => a.size - b.size);
}

// Single-core cables tabulate methods A, B, C, then F (touching) and G
// (spaced) in free air — the legacy 'E' key maps to the closest free-air column.
const SINGLE_CORE_KEYS: Record<string, LegacyKeySpec> = {
  A1: { methods: ['method-a'] },
  A2: { methods: ['method-a'] },
  B: { methods: ['method-b'] },
  C: { methods: ['method-c'] },
  E: { methods: ['method-e', 'method-f'] },
  F: { methods: ['method-f', 'method-e'] },
  G: { methods: ['method-g-h'] },
};

const TWIN_EARTH_KEYS: Record<string, LegacyKeySpec> = {
  A1: { methods: ['method-a'] },
  A2: { methods: ['method-a'] },
  B: { methods: ['method-b'] },
  C: { methods: ['method-c'] },
  E: { methods: ['method-e', 'method-f'] },
  F: { methods: ['method-f', 'method-e'] },
};

// MICC is tabulated clipped / on tray / in free air. Enclosed methods are not
// tabulated in BS 7671 — legacy A/B keys resolve to the clipped column.
const MINERAL_KEYS: Record<string, LegacyKeySpec> = {
  A1: { methods: ['method-c'] },
  A2: { methods: ['method-c'] },
  B: { methods: ['method-c'] },
  C: { methods: ['method-c'] },
  E: { methods: ['method-e'] },
  F: { methods: ['method-e'] },
  G: { methods: ['method-g-h'] },
};

// SWA multicore legacy keys carry the core count: C2 = method C two-core
// (single-phase column), C3 = method C three/four-core (three-phase column).
// Legacy 'D' uses Method D1 (in ducting) — the lower of the two buried columns.
const SWA_KEYS: Record<string, LegacyKeySpec> = {
  C2: { methods: ['method-c'], phase: 'singlePhase' },
  C3: { methods: ['method-c'], phase: 'threePhase' },
  D2: { methods: ['method-d1', 'method-d2'], phase: 'singlePhase' },
  D3: { methods: ['method-d1', 'method-d2'], phase: 'threePhase' },
  E2: { methods: ['method-e'], phase: 'singlePhase' },
  E3: { methods: ['method-e'], phase: 'threePhase' },
  // Plain keys for engines that pass a bare reference method — resolved to the
  // three/four-core column (the lower, conservative one).
  C: { methods: ['method-c'], phase: 'threePhase' },
  D: { methods: ['method-d1', 'method-d2'], phase: 'threePhase' },
  D1: { methods: ['method-d1'], phase: 'threePhase' },
  E: { methods: ['method-e'], phase: 'threePhase' },
};

export const pvcSingleCapacities: CableCapacity[] = buildLegacy(['pvc-single'], SINGLE_CORE_KEYS);
export const xlpeSingleCapacities: CableCapacity[] = buildLegacy(['xlpe-single'], SINGLE_CORE_KEYS);
export const pvcTwinEarthCapacities: CableCapacity[] = buildLegacy(['twin-earth'], TWIN_EARTH_KEYS);
// 90°C T&E is sized on the 70°C Table 4D5 columns — accessories and
// terminations limit the conductor operating temperature to 70°C in practice.
export const xlpeTwinEarthCapacities: CableCapacity[] = buildLegacy(
  ['twin-earth'],
  TWIN_EARTH_KEYS
);
export const swaCapacities: CableCapacity[] = buildLegacy(['swa-pvc'], SWA_KEYS);
export const miccCapacities: CableCapacity[] = buildLegacy(
  ['mineral-light', 'mineral-heavy'],
  MINERAL_KEYS
);
// No verified BS 7671 table available — UI options removed (ELE-1257).
export const singleCoreArmouredCapacities: CableCapacity[] = [];
export const aluminiumXlpeCapacities: CableCapacity[] = [];

// Flat T&E thermal-insulation methods 100–103, from the verified Table 4D5 columns.
export const flatTwinEarthThermalCapacities: ThermalInsulationCapacity[] = (() => {
  const te = capacityTables['twin-earth'];
  if (!te) return [];
  const col = (m: string) => te.methods[m]?.singlePhase ?? {};
  const m100 = col('method-100');
  const m101 = col('method-101');
  const m102 = col('method-102');
  const m103 = col('method-103');
  const mA = col('method-a');
  const mB = col('method-b');
  const mC = col('method-c');
  const sizes = [...new Set([...Object.keys(m100), ...Object.keys(mC)])].sort(
    (a, b) => parseFloat(a) - parseFloat(b)
  );
  return sizes
    .filter((s) => m100[s] !== undefined && m101[s] !== undefined)
    .map((s) => ({
      size: parseFloat(s),
      method100e: m100[s],
      method101e: m101[s],
      method102e: m102[s],
      method103e: m103[s],
      methodA: mA[s],
      methodB: mB[s],
      methodC: mC[s],
    }));
})();

export const cableCapacityData = {
  'pvc-single': pvcSingleCapacities,
  'xlpe-single': xlpeSingleCapacities,
  'pvc-twin-earth': pvcTwinEarthCapacities,
  'xlpe-twin-earth': xlpeTwinEarthCapacities,
  swa: swaCapacities,
  'swa-single-core': singleCoreArmouredCapacities,
  micc: miccCapacities,
  'aluminium-xlpe': aluminiumXlpeCapacities,
};

export type CableType =
  | 'pvc-single'
  | 'xlpe-single'
  | 'pvc-twin-earth'
  | 'xlpe-twin-earth'
  | 'swa'
  | 'swa-single-core'
  | 'micc'
  | 'aluminium-xlpe';

// Helper to get thermal insulation capacity for flat T&E cables
export const getThermalInsulationCapacity = (
  size: number,
  method: '100e' | '101e' | '102e' | '103e'
): number | null => {
  const entry = flatTwinEarthThermalCapacities.find((c) => c.size === size);
  if (!entry) return null;

  const methodKey = `method${method.replace('e', '')}e` as keyof ThermalInsulationCapacity;
  const value = entry[methodKey] as number | undefined;
  return typeof value === 'number' ? value : null;
};

export const getCableCapacity = (cableType: CableType, size: number): CableCapacity | null => {
  const data = cableCapacityData[cableType];
  if (!data || data.length === 0) return null;

  // Find exact match first
  const exactMatch = data.find((cable) => cable.size === size);
  if (exactMatch) return exactMatch;

  // Find next size up for safety
  const nextSizeUp = data.filter((cable) => cable.size > size).sort((a, b) => a.size - b.size)[0];

  return nextSizeUp || null;
};

export const getNextCableSize = (
  cableType: CableType,
  currentSize: number
): CableCapacity | null => {
  const data = cableCapacityData[cableType];
  if (!data) return null;

  const nextSize = data
    .filter((cable) => cable.size > currentSize)
    .sort((a, b) => a.size - b.size)[0];

  return nextSize || null;
};

/**
 * Get minimum cable size required for a given protection device rating
 * Uses BS 7671 rule: Cable capacity (Iz) must be >= Protection device rating (In)
 */
export function getMinimumCableSizeForProtection(
  cableType: CableType,
  protectionRating: number,
  referenceMethod: string = 'C'
): { size: number; capacity: number } | null {
  const data = cableCapacityData[cableType];
  if (!data) return null;

  // Find smallest cable size where capacity >= protection rating
  const suitableCable = data.find((cable) => {
    const capacity = cable.capacities[referenceMethod];
    return capacity && capacity >= protectionRating;
  });

  if (!suitableCable) return null;

  return {
    size: suitableCable.size,
    capacity: suitableCable.capacities[referenceMethod],
  };
}
