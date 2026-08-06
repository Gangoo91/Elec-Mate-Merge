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
//
// ⚠️ This adapter only RESHAPES the verified tables. It must never contain a
// current-carrying capacity, a mV/A/m value or a rating factor of its own; if
// a value looks wrong, the fix belongs in appendix4CurrentCapacity.ts. What it
// does own is the mapping layer — which legacy key points at which tabulated
// column — and every wrong mapping here is an unpublished number presented as
// if BS 7671 had tabulated it.

import { capacityTables, CableTypeKey, PhaseKey } from './appendix4CurrentCapacity';

export interface CableCapacity {
  size: number;
  capacities: {
    [key: string]: number; // Legacy reference-method key -> tabulated It (A)
  };
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

// 🔴 REMOVED (audit 2026-08-06): an inlined COPPER_RESISTANCE (mΩ/m) table and a
// "typical" REACTANCE table were written onto every entry as `resistance` /
// `reactance`. Nothing in the codebase ever read either field, and neither
// series is traceable to BS 7671 — Appendix 4 publishes voltage drop as
// (mV/A/m), not conductor resistance, and the reactance values were labelled
// "typical" with no source at all. Voltage drop comes from
// voltageDropTables.ts (Appendix 4 "B" tables); a regs data module must not
// carry a second, unsourced impedance series alongside it.

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
          entry = { size, capacities: {} };
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

// Table 4D5 (70 °C thermoplastic insulated and sheathed FLAT cable with
// protective conductor) tabulates Reference Methods A, B and C plus the
// domestic thermal-insulation Methods 100-103 — and nothing else. It has no
// free-air column, so the legacy 'E' and 'F' keys have been removed rather
// than left pointing at columns that do not exist (they resolved to null and
// silently vanished, which reads as "not applicable" only by accident).
const TWIN_EARTH_KEYS: Record<string, LegacyKeySpec> = {
  A1: { methods: ['method-a'] },
  A2: { methods: ['method-a'] },
  B: { methods: ['method-b'] },
  C: { methods: ['method-c'] },
};

// 🔴 Table 4G1A (mineral insulated, thermoplastic covered or bare and exposed
// to touch) is headed "Reference Method C (clipped direct)" and "Reference
// Methods E, F and G (in free air or on a perforated cable tray etc)". There
// is NO Reference Method A or B column: BS 7671 publishes no current-carrying
// capacity for mineral cable enclosed in conduit in a thermally insulating
// wall, or in conduit/trunking on a wall. The legacy A1/A2/B keys used to
// resolve to the Method C column, handing back a clipped-direct (freely
// air-cooled) rating for an enclosed installation. They have been removed so
// this module no longer asserts a value the standard does not publish.
//
// Method G in Table 4G1A is tabulated for the three-phase spaced arrangements
// only (cols 8-9: "3 single-core cables flat and spaced by one cable diameter,
// vertical / horizontal") — there is no single-phase spaced column. The 'G'
// key previously requested the default singlePhase column and therefore never
// populated at all. It now takes the three-phase column, preferring the
// vertical (lower) arrangement because the legacy key carries no orientation.
const MINERAL_KEYS: Record<string, LegacyKeySpec> = {
  C: { methods: ['method-c'] },
  E: { methods: ['method-e'] },
  F: { methods: ['method-e'] },
  G: { methods: ['method-g-v', 'method-g-h'], phase: 'threePhase' },
};

// SWA multicore legacy keys carry the CORE COUNT: C2 = method C two-core
// (single-phase column), C3 = method C three/four-core (three-phase column).
// Legacy 'D' uses Method D1 (in ducting) — the lower of the two buried columns.
//
// ⚠️ NAMESPACE COLLISION — read before adding a caller. In BS 7671 Appendix 4,
// D1 and D2 are Reference Methods, not core counts: "Reference Method D1 …
// multicore armoured cable in conduit or in cable ducting in the ground" and
// "Reference Method D2 … multicore armoured cable direct in ground" (App 4,
// Reference Methods). In THIS legacy key namespace 'D2' means "Method D,
// two-core" and 'D3' means "Method D, three/four-core". A caller that passes a
// bare reference-method code straight through (getReferenceMethod() returns
// 'D1'/'D2') therefore lands on the wrong column — 'D2' hands it the two-core
// single-phase Method D1 values whatever the cable actually is. The live
// consumer (useCableSizing) builds these keys from core count and is correct;
// the fix for any new caller is to key on the verified module
// (appendix4CurrentCapacity.ts, method-d1 / method-d2 × singlePhase /
// threePhase) rather than on this adapter.
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

// These per-type arrays are module-local: nothing outside this file ever
// imported them (they were exported, and dead). `cableCapacityData` below is
// the single entry point.
const pvcSingleCapacities: CableCapacity[] = buildLegacy(['pvc-single'], SINGLE_CORE_KEYS);
const xlpeSingleCapacities: CableCapacity[] = buildLegacy(['xlpe-single'], SINGLE_CORE_KEYS);
const pvcTwinEarthCapacities: CableCapacity[] = buildLegacy(['twin-earth'], TWIN_EARTH_KEYS);
// 90 °C T&E is sized on the 70 °C Table 4D5 columns. This is not a compromise:
// Reg 512.1.5 NOTE 3 states "Where the current rating is to be based on 70 °C,
// current-carrying capacities given in Tables 4D1 to 4D5 or 4H1 to 4H4 of
// Appendix 4 may be used for 90 °C thermosetting insulated cables", and
// Reg 512.1.5 itself holds equipment to 70 °C unless the manufacturer confirms
// otherwise. Because the rating is based on 70 °C, the Table 4B1 ambient
// factor must be taken from the 70 °C thermoplastic column — see
// `cableTypeSource` below, which is why that map exists.
const xlpeTwinEarthCapacities: CableCapacity[] = buildLegacy(['twin-earth'], TWIN_EARTH_KEYS);
const swaCapacities: CableCapacity[] = buildLegacy(['swa-pvc'], SWA_KEYS);
const miccCapacities: CableCapacity[] = buildLegacy(
  ['mineral-light', 'mineral-heavy'],
  MINERAL_KEYS
);
// No verified BS 7671 table available — UI options removed (ELE-1257).
const singleCoreArmouredCapacities: CableCapacity[] = [];
const aluminiumXlpeCapacities: CableCapacity[] = [];

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

/**
 * 🔴 Which verified Appendix 4 table each legacy cable type is projected from,
 * and therefore which Table 4B1 ambient column applies to it.
 *
 * This adapter used to publish only `{size, capacities}`. With the insulation
 * class and the source table dropped at the boundary, every consumer had to
 * re-derive them from the cable-type STRING — and the obvious derivation
 * (`cableType.includes('xlpe') ? '90C' : '70C'`) is wrong twice over:
 *
 *  - 'xlpe-twin-earth' is projected from the 70 °C Table 4D5 columns (Reg
 *    512.1.5 NOTE 3), so its ambient factor must come from the Table 4B1 70 °C
 *    thermoplastic column (35 °C 0.94, 40 °C 0.87, 45 °C 0.79, 50 °C 0.71,
 *    55 °C 0.61, 60 °C 0.50, dash above 60 °C) — not the 90 °C thermosetting
 *    column, which is higher at every step (45 °C 0.87, 60 °C 0.71).
 *  - 'micc' has its own Table 4B1 column ("Mineral, thermoplastic covered or
 *    bare and exposed to touch", sheath 70 °C), which is LOWER than the 70 °C
 *    thermoplastic column at every temperature above 30 °C (35 °C 0.93,
 *    40 °C 0.85, 45 °C 0.78, 50 °C 0.67, 55 °C 0.57, 60 °C 0.45).
 *
 * Read the class from here and pass it to getTemperatureFactor(); never infer
 * it from the type name. `null` = no verified BS 7671 table for that type.
 */
export const cableTypeSource: Record<
  CableType,
  { sourceTable: string; insulation: '70C' | '90C' | '70C-mineral' } | null
> = (() => {
  const keyByType: Partial<Record<CableType, CableTypeKey>> = {
    'pvc-single': 'pvc-single',
    'xlpe-single': 'xlpe-single',
    'pvc-twin-earth': 'twin-earth',
    'xlpe-twin-earth': 'twin-earth',
    swa: 'swa-pvc',
    micc: 'mineral-light',
  };
  const out = {} as Record<
    CableType,
    { sourceTable: string; insulation: '70C' | '90C' | '70C-mineral' } | null
  >;
  for (const type of Object.keys(cableCapacityData) as CableType[]) {
    const key = keyByType[type];
    const table = key ? capacityTables[key] : undefined;
    out[type] = table ? { sourceTable: table.sourceTable, insulation: table.insulation } : null;
  }
  return out;
})();

/** Table 4B1 column to use for this cable type's tabulated values. */
export const getCableTypeInsulation = (
  cableType: CableType
): '70C' | '90C' | '70C-mineral' | null => cableTypeSource[cableType]?.insulation ?? null;

/** Appendix 4 table the tabulated values come from, for citation in the UI. */
export const getCableTypeSourceTable = (cableType: CableType): string | null =>
  cableTypeSource[cableType]?.sourceTable ?? null;

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

/**
 * Tabulated capacities for the conductor size actually asked for.
 *
 * 🔴 This used to fall back to the NEXT SIZE UP "for safety" when the size was
 * not tabulated, and returned that larger cable's entry — including its
 * `size` — to a caller that had asked about a smaller one. Reg 433.1.1
 * requires Ib ≤ In ≤ Iz where Iz is the capacity of the conductor installed,
 * so a lookup for a given size must never answer with a larger conductor's
 * rating; the caller has no way to tell it was substituted. Not tabulated now
 * returns null, and callers that want to step up use getNextCableSize().
 */
export const getCableCapacity = (cableType: CableType, size: number): CableCapacity | null => {
  const data = cableCapacityData[cableType];
  if (!data || data.length === 0) return null;

  return data.find((cable) => cable.size === size) ?? null;
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

// 🔴 REMOVED (audit 2026-08-06): getMinimumCableSizeForProtection(). It was
// documented as applying "the BS 7671 rule: Cable capacity (Iz) must be >=
// Protection device rating (In)" but compared the raw TABULATED value It
// against In with no rating factors applied at all. Reg 433.1.1 requires
// Ib <= In <= Iz where Iz = It × Ca × Cg × Ci × Cs (Appendix 4 §5.1), so the
// quantity it tested was It, not Iz, and it would pass a cable that fails
// 433.1.1 wherever any derating applies. Nothing imported it. Sizing against
// In with the full derating chain is done in useCableSizing.calculateCableSize().
