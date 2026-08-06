// BS 7671:2018+A4:2026 Appendix 4 — voltage drop tables (mV/A/m)
// Tables held here: 4D1B, 4E1B, 4D2B, 4D3B, 4D4B and Table 4D5.
//
// FIXED (citations): the header previously read "Tables 4D1B, 4D2B, 4D3B, 4D4B, 4D5B".
// There is no Table 4D5B. Appendix 4 lists Table 4D5 as a single combined table for
// "70 °C thermoplastic insulated and sheathed flat cable with protective conductor";
// unlike 4D1–4D4 it has no separate B voltage-drop table. The 90 °C thermosetting
// single-core table below was also mislabelled 4D2B — it is Table 4E1B.
//
// ⚠️ App 4 §6 — COLUMN STRUCTURE. "For cables having conductors of 16 mm² or less
// cross-sectional area, their inductances can be ignored and (mV/A/m)z values only are
// tabulated. For cables having conductors greater than 16 mm² cross-sectional area the
// impedance values are given as (mV/A/m)z, together with the resistive component
// (mV/A/m)r and the reactive component (mV/A/m)x."
// BS 7671 therefore prints NO reactance for 1.0–16 mm². The `x` sub-values carried at
// those sizes below are NOT from the standard (they run in an exact −0.005 arithmetic
// step per size row, which no printed column does) and MUST NOT be used in the §6.2
// vector-sum formula. Only `.z` is consumed by the lookup in this module. The `r`/`x`
// figures at 25 mm² and above are likewise unverified against the printed table — the
// landscape Appendix 4 pages do not extract legibly — so they are left untouched here
// rather than "corrected" on a guess.

import { CableType } from './cableCapacities';

export interface VoltageDropEntry {
  size: number; // mm²
  twoCoreDc?: number; // mV/A/m for DC
  twoCoreAC: {
    // mV/A/m resistive / reactive / impedance components.
    // ⚠️ App 4 §6: r and x are only tabulated above 16 mm². At 16 mm² and below the
    // standard prints a single mV/A/m value — read `.z` and ignore `.r`/`.x`.
    methodsAB: { r: number; x: number; z: number };
    methodsCF: { r: number; x: number; z: number };
  };
  threeOrFourCoreAC: {
    methodsAB: { r: number; x: number; z: number };
    methodsCF: { r: number; x: number; z: number };
  };
}

// Table 4D1B — Single-core 70 °C thermoplastic insulated cables, non-armoured,
// with or without sheath (copper conductors). Voltage drop per ampere per metre.
// Reference: BS 7671:2018+A4:2026 Appendix 4
// FIXED: edition label was "A3:2024" — the current edition is A4:2026.
export const voltageDropPvcSingleCore: VoltageDropEntry[] = [
  {
    size: 1.0,
    twoCoreDc: 44,
    twoCoreAC: {
      methodsAB: { r: 44, x: 0.175, z: 44 },
      methodsCF: { r: 44, x: 0.175, z: 44 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 38, x: 0.145, z: 38 },
      methodsCF: { r: 38, x: 0.145, z: 38 },
    },
  },
  {
    size: 1.5,
    twoCoreDc: 29,
    twoCoreAC: {
      methodsAB: { r: 29, x: 0.17, z: 29 },
      methodsCF: { r: 29, x: 0.17, z: 29 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 25, x: 0.14, z: 25 },
      methodsCF: { r: 25, x: 0.14, z: 25 },
    },
  },
  {
    size: 2.5,
    twoCoreDc: 18,
    twoCoreAC: {
      methodsAB: { r: 18, x: 0.165, z: 18 },
      methodsCF: { r: 18, x: 0.165, z: 18 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 15, x: 0.135, z: 15 },
      methodsCF: { r: 15, x: 0.135, z: 15 },
    },
  },
  {
    size: 4,
    twoCoreDc: 11,
    twoCoreAC: {
      methodsAB: { r: 11, x: 0.16, z: 11 },
      methodsCF: { r: 11, x: 0.16, z: 11 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 9.5, x: 0.13, z: 9.5 },
      methodsCF: { r: 9.5, x: 0.13, z: 9.5 },
    },
  },
  {
    size: 6,
    twoCoreDc: 7.3,
    twoCoreAC: {
      methodsAB: { r: 7.3, x: 0.155, z: 7.3 },
      methodsCF: { r: 7.3, x: 0.155, z: 7.3 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 6.4, x: 0.125, z: 6.4 },
      methodsCF: { r: 6.4, x: 0.125, z: 6.4 },
    },
  },
  {
    size: 10,
    twoCoreDc: 4.4,
    twoCoreAC: {
      methodsAB: { r: 4.4, x: 0.15, z: 4.4 },
      methodsCF: { r: 4.4, x: 0.15, z: 4.4 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 3.8, x: 0.12, z: 3.8 },
      methodsCF: { r: 3.8, x: 0.12, z: 3.8 },
    },
  },
  {
    size: 16,
    twoCoreDc: 2.8,
    twoCoreAC: {
      methodsAB: { r: 2.8, x: 0.145, z: 2.8 },
      methodsCF: { r: 2.8, x: 0.145, z: 2.8 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 2.4, x: 0.115, z: 2.4 },
      methodsCF: { r: 2.4, x: 0.115, z: 2.4 },
    },
  },
  {
    size: 25,
    twoCoreDc: 1.75,
    twoCoreAC: {
      methodsAB: { r: 1.75, x: 0.14, z: 1.75 },
      methodsCF: { r: 1.5, x: 0.175, z: 1.5 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 1.5, x: 0.11, z: 1.5 },
      methodsCF: { r: 1.3, x: 0.145, z: 1.3 },
    },
  },
  {
    size: 35,
    twoCoreDc: 1.25,
    twoCoreAC: {
      methodsAB: { r: 1.25, x: 0.135, z: 1.25 },
      methodsCF: { r: 1.1, x: 0.17, z: 1.1 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 1.1, x: 0.105, z: 1.1 },
      methodsCF: { r: 0.95, x: 0.14, z: 0.95 },
    },
  },
  {
    size: 50,
    twoCoreDc: 0.93,
    twoCoreAC: {
      methodsAB: { r: 0.93, x: 0.13, z: 0.94 },
      methodsCF: { r: 0.78, x: 0.165, z: 0.8 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 0.81, x: 0.1, z: 0.82 },
      methodsCF: { r: 0.67, x: 0.135, z: 0.69 },
    },
  },
  {
    size: 70,
    twoCoreDc: 0.63,
    twoCoreAC: {
      methodsAB: { r: 0.63, x: 0.125, z: 0.64 },
      methodsCF: { r: 0.55, x: 0.155, z: 0.57 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 0.55, x: 0.095, z: 0.56 },
      methodsCF: { r: 0.47, x: 0.13, z: 0.49 },
    },
  },
  {
    size: 95,
    twoCoreDc: 0.46,
    twoCoreAC: {
      methodsAB: { r: 0.46, x: 0.12, z: 0.48 },
      methodsCF: { r: 0.41, x: 0.145, z: 0.44 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 0.4, x: 0.09, z: 0.41 },
      methodsCF: { r: 0.36, x: 0.125, z: 0.38 },
    },
  },
  {
    size: 120,
    twoCoreDc: 0.36,
    twoCoreAC: {
      methodsAB: { r: 0.36, x: 0.115, z: 0.38 },
      methodsCF: { r: 0.32, x: 0.14, z: 0.35 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 0.31, x: 0.085, z: 0.32 },
      methodsCF: { r: 0.28, x: 0.12, z: 0.31 },
    },
  },
  {
    size: 150,
    twoCoreDc: 0.29,
    twoCoreAC: {
      methodsAB: { r: 0.29, x: 0.11, z: 0.31 },
      methodsCF: { r: 0.265, x: 0.135, z: 0.3 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 0.25, x: 0.08, z: 0.26 },
      methodsCF: { r: 0.23, x: 0.115, z: 0.26 },
    },
  },
  {
    size: 185,
    twoCoreDc: 0.235,
    twoCoreAC: {
      methodsAB: { r: 0.235, x: 0.105, z: 0.26 },
      methodsCF: { r: 0.21, x: 0.13, z: 0.25 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 0.2, x: 0.075, z: 0.21 },
      methodsCF: { r: 0.18, x: 0.11, z: 0.21 },
    },
  },
  {
    size: 240,
    twoCoreDc: 0.18,
    twoCoreAC: {
      methodsAB: { r: 0.18, x: 0.1, z: 0.21 },
      methodsCF: { r: 0.165, x: 0.125, z: 0.21 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 0.155, x: 0.07, z: 0.17 },
      methodsCF: { r: 0.14, x: 0.105, z: 0.17 },
    },
  },
  {
    size: 300,
    twoCoreDc: 0.145,
    twoCoreAC: {
      methodsAB: { r: 0.145, x: 0.095, z: 0.17 },
      methodsCF: { r: 0.135, x: 0.12, z: 0.18 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 0.125, x: 0.065, z: 0.14 },
      methodsCF: { r: 0.115, x: 0.1, z: 0.15 },
    },
  },
];

// Table 4E1B — Single-core 90 °C thermosetting insulated cables, non-armoured, with or
// without sheath (copper conductors). Voltage drop per ampere per metre.
// Reference: BS 7671:2018+A4:2026 Appendix 4
// FIXED (citation): this block was labelled "Table 4D2B - XLPE insulated single-core
// cables". Table 4D2B is Multicore 70 °C THERMOPLASTIC, non-armoured (it appears further
// down this file); the 90 °C thermosetting single-core voltage-drop table is 4E1B. Two
// different exports were both cited as 4D2B.
export const voltageDropXlpeSingleCore: VoltageDropEntry[] = [
  {
    size: 1.0,
    twoCoreDc: 48,
    twoCoreAC: {
      methodsAB: { r: 48, x: 0.175, z: 48 },
      methodsCF: { r: 48, x: 0.175, z: 48 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 42, x: 0.145, z: 42 },
      methodsCF: { r: 42, x: 0.145, z: 42 },
    },
  },
  {
    size: 1.5,
    twoCoreDc: 32,
    twoCoreAC: {
      methodsAB: { r: 32, x: 0.17, z: 32 },
      methodsCF: { r: 32, x: 0.17, z: 32 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 28, x: 0.14, z: 28 },
      methodsCF: { r: 28, x: 0.14, z: 28 },
    },
  },
  {
    size: 2.5,
    twoCoreDc: 19,
    twoCoreAC: {
      methodsAB: { r: 19, x: 0.165, z: 19 },
      methodsCF: { r: 19, x: 0.165, z: 19 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 17, x: 0.135, z: 17 },
      methodsCF: { r: 17, x: 0.135, z: 17 },
    },
  },
  {
    size: 4,
    twoCoreDc: 12,
    twoCoreAC: {
      methodsAB: { r: 12, x: 0.16, z: 12 },
      methodsCF: { r: 12, x: 0.16, z: 12 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 10, x: 0.13, z: 10 },
      methodsCF: { r: 10, x: 0.13, z: 10 },
    },
  },
  {
    size: 6,
    twoCoreDc: 8.0,
    twoCoreAC: {
      methodsAB: { r: 8.0, x: 0.155, z: 8.0 },
      methodsCF: { r: 8.0, x: 0.155, z: 8.0 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 7.0, x: 0.125, z: 7.0 },
      methodsCF: { r: 7.0, x: 0.125, z: 7.0 },
    },
  },
  {
    size: 10,
    twoCoreDc: 4.8,
    twoCoreAC: {
      methodsAB: { r: 4.8, x: 0.15, z: 4.8 },
      methodsCF: { r: 4.8, x: 0.15, z: 4.8 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 4.2, x: 0.12, z: 4.2 },
      methodsCF: { r: 4.2, x: 0.12, z: 4.2 },
    },
  },
  {
    size: 16,
    twoCoreDc: 3.0,
    twoCoreAC: {
      methodsAB: { r: 3.0, x: 0.145, z: 3.0 },
      methodsCF: { r: 3.0, x: 0.145, z: 3.0 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 2.6, x: 0.115, z: 2.6 },
      methodsCF: { r: 2.6, x: 0.115, z: 2.6 },
    },
  },
  {
    size: 25,
    twoCoreDc: 1.9,
    twoCoreAC: {
      methodsAB: { r: 1.9, x: 0.14, z: 1.9 },
      methodsCF: { r: 1.65, x: 0.175, z: 1.65 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 1.65, x: 0.11, z: 1.65 },
      methodsCF: { r: 1.45, x: 0.145, z: 1.45 },
    },
  },
  {
    size: 35,
    twoCoreDc: 1.35,
    twoCoreAC: {
      methodsAB: { r: 1.35, x: 0.135, z: 1.35 },
      methodsCF: { r: 1.2, x: 0.17, z: 1.2 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 1.2, x: 0.105, z: 1.2 },
      methodsCF: { r: 1.05, x: 0.14, z: 1.05 },
    },
  },
  {
    size: 50,
    twoCoreDc: 1.0,
    twoCoreAC: {
      methodsAB: { r: 1.0, x: 0.13, z: 1.0 },
      methodsCF: { r: 0.86, x: 0.165, z: 0.88 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 0.87, x: 0.1, z: 0.88 },
      methodsCF: { r: 0.75, x: 0.135, z: 0.76 },
    },
  },
  {
    size: 70,
    twoCoreDc: 0.7,
    twoCoreAC: {
      methodsAB: { r: 0.7, x: 0.125, z: 0.71 },
      methodsCF: { r: 0.6, x: 0.155, z: 0.62 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 0.6, x: 0.095, z: 0.61 },
      methodsCF: { r: 0.52, x: 0.13, z: 0.54 },
    },
  },
  {
    size: 95,
    twoCoreDc: 0.5,
    twoCoreAC: {
      methodsAB: { r: 0.5, x: 0.12, z: 0.52 },
      methodsCF: { r: 0.45, x: 0.145, z: 0.47 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 0.44, x: 0.09, z: 0.45 },
      methodsCF: { r: 0.39, x: 0.125, z: 0.41 },
    },
  },
  {
    size: 120,
    twoCoreDc: 0.4,
    twoCoreAC: {
      methodsAB: { r: 0.4, x: 0.115, z: 0.42 },
      methodsCF: { r: 0.36, x: 0.14, z: 0.38 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 0.35, x: 0.085, z: 0.36 },
      methodsCF: { r: 0.31, x: 0.12, z: 0.33 },
    },
  },
  {
    size: 150,
    twoCoreDc: 0.32,
    twoCoreAC: {
      methodsAB: { r: 0.32, x: 0.11, z: 0.34 },
      methodsCF: { r: 0.29, x: 0.135, z: 0.32 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 0.28, x: 0.08, z: 0.29 },
      methodsCF: { r: 0.25, x: 0.115, z: 0.28 },
    },
  },
  {
    size: 185,
    twoCoreDc: 0.26,
    twoCoreAC: {
      methodsAB: { r: 0.26, x: 0.105, z: 0.28 },
      methodsCF: { r: 0.235, x: 0.13, z: 0.27 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 0.23, x: 0.075, z: 0.24 },
      methodsCF: { r: 0.2, x: 0.11, z: 0.23 },
    },
  },
  {
    size: 240,
    twoCoreDc: 0.2,
    twoCoreAC: {
      methodsAB: { r: 0.2, x: 0.1, z: 0.22 },
      methodsCF: { r: 0.18, x: 0.125, z: 0.22 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 0.175, x: 0.07, z: 0.19 },
      methodsCF: { r: 0.16, x: 0.105, z: 0.19 },
    },
  },
  {
    size: 300,
    twoCoreDc: 0.16,
    twoCoreAC: {
      methodsAB: { r: 0.16, x: 0.095, z: 0.19 },
      methodsCF: { r: 0.145, x: 0.12, z: 0.19 },
    },
    threeOrFourCoreAC: {
      methodsAB: { r: 0.14, x: 0.065, z: 0.15 },
      methodsCF: { r: 0.125, x: 0.1, z: 0.16 },
    },
  },
];

// Table 4D2B — Multicore 70 °C thermoplastic insulated and thermoplastic sheathed cables,
// non-armoured (copper conductors). Voltage drop per ampere per metre.
// From BS 7671:2018+A4:2026 Table 4D2B (edition label was "A3:2024").
export interface MulticoreVoltageDropEntry {
  size: number; // mm²
  twoCoreAc: number; // mV/A/m single-phase
  threeFourCoreAc: number; // mV/A/m three-phase
}

export const voltageDropPvcMulticore: MulticoreVoltageDropEntry[] = [
  { size: 1.0, twoCoreAc: 44, threeFourCoreAc: 38 },
  { size: 1.5, twoCoreAc: 29, threeFourCoreAc: 25 },
  { size: 2.5, twoCoreAc: 18, threeFourCoreAc: 15 },
  { size: 4, twoCoreAc: 11, threeFourCoreAc: 9.5 },
  { size: 6, twoCoreAc: 7.3, threeFourCoreAc: 6.4 },
  { size: 10, twoCoreAc: 4.4, threeFourCoreAc: 3.8 },
  { size: 16, twoCoreAc: 2.8, threeFourCoreAc: 2.4 },
  { size: 25, twoCoreAc: 1.75, threeFourCoreAc: 1.5 },
  { size: 35, twoCoreAc: 1.25, threeFourCoreAc: 1.1 },
  { size: 50, twoCoreAc: 0.93, threeFourCoreAc: 0.81 },
  { size: 70, twoCoreAc: 0.63, threeFourCoreAc: 0.55 },
  { size: 95, twoCoreAc: 0.46, threeFourCoreAc: 0.4 },
  { size: 120, twoCoreAc: 0.36, threeFourCoreAc: 0.31 },
  { size: 150, twoCoreAc: 0.29, threeFourCoreAc: 0.25 },
  { size: 185, twoCoreAc: 0.235, threeFourCoreAc: 0.2 },
  { size: 240, twoCoreAc: 0.18, threeFourCoreAc: 0.155 },
  { size: 300, twoCoreAc: 0.145, threeFourCoreAc: 0.125 },
];

// Table 4D3B — Single-core armoured 70 °C thermoplastic insulated cables (non-magnetic
// armour), copper conductors. Voltage drop per ampere per metre.
// From BS 7671:2018+A4:2026 Table 4D3B (edition label was "A3:2024").
// FIXED (citation): this block described itself as "Single-core armoured 90°C XLPE".
// Appendix 4 titles Table 4D3A/4D3B as single-core armoured 70 °C THERMOPLASTIC
// (non-magnetic armour); the 90 °C thermosetting equivalent is Table 4E3A/4E3B. The data
// held here tracks the 70 °C set (50 mm² d.c. = 0.93, matching Tables 4D1B/4D2B, not the
// 1.0 of the 90 °C thermosetting table), so the table number was right and the insulation
// class in the description was wrong. App 4 §6: the tabulated values for single-core
// armoured cables apply where the armour is bonded to earth at both ends.
// ⚠️ If a 90 °C thermosetting single-core armoured table is ever needed, add Table 4E3B
// as its own export — do not relabel this one.
export interface SingleCoreArmouredVoltageDropEntry {
  size: number; // mm²
  twoCableDc: number; // mV/A/m DC
  twoCableAc: { r: number; x: number; z: number }; // mV/A/m AC single-phase
  threeCableSpaced: { r: number; x: number; z: number }; // spaced cables
  threeCableTrefoil: { r: number; x: number; z: number }; // trefoil/touching
  threeCableFlatTouching: { r: number; x: number; z: number }; // flat touching
  threeCableFlatSpaced: { r: number; x: number; z: number }; // flat spaced
}

export const voltageDropSingleCoreArmoured: SingleCoreArmouredVoltageDropEntry[] = [
  {
    size: 50,
    twoCableDc: 0.93,
    twoCableAc: { r: 0.93, x: 0.165, z: 0.95 },
    threeCableSpaced: { r: 0.81, x: 0.145, z: 0.82 },
    threeCableTrefoil: { r: 0.81, x: 0.125, z: 0.82 },
    threeCableFlatTouching: { r: 0.81, x: 0.13, z: 0.82 },
    threeCableFlatSpaced: { r: 0.81, x: 0.155, z: 0.83 },
  },
  {
    size: 70,
    twoCableDc: 0.63,
    twoCableAc: { r: 0.63, x: 0.155, z: 0.65 },
    threeCableSpaced: { r: 0.55, x: 0.135, z: 0.57 },
    threeCableTrefoil: { r: 0.55, x: 0.12, z: 0.56 },
    threeCableFlatTouching: { r: 0.55, x: 0.125, z: 0.56 },
    threeCableFlatSpaced: { r: 0.55, x: 0.145, z: 0.57 },
  },
  {
    size: 95,
    twoCableDc: 0.46,
    twoCableAc: { r: 0.46, x: 0.15, z: 0.48 },
    threeCableSpaced: { r: 0.4, x: 0.13, z: 0.42 },
    threeCableTrefoil: { r: 0.4, x: 0.115, z: 0.42 },
    threeCableFlatTouching: { r: 0.4, x: 0.12, z: 0.42 },
    threeCableFlatSpaced: { r: 0.4, x: 0.14, z: 0.42 },
  },
  {
    size: 120,
    twoCableDc: 0.36,
    twoCableAc: { r: 0.36, x: 0.145, z: 0.39 },
    threeCableSpaced: { r: 0.31, x: 0.125, z: 0.34 },
    threeCableTrefoil: { r: 0.31, x: 0.11, z: 0.33 },
    threeCableFlatTouching: { r: 0.31, x: 0.115, z: 0.33 },
    threeCableFlatSpaced: { r: 0.31, x: 0.135, z: 0.34 },
  },
  {
    size: 150,
    twoCableDc: 0.29,
    twoCableAc: { r: 0.29, x: 0.14, z: 0.32 },
    threeCableSpaced: { r: 0.25, x: 0.12, z: 0.28 },
    threeCableTrefoil: { r: 0.25, x: 0.105, z: 0.27 },
    threeCableFlatTouching: { r: 0.25, x: 0.11, z: 0.27 },
    threeCableFlatSpaced: { r: 0.25, x: 0.13, z: 0.28 },
  },
  {
    size: 185,
    twoCableDc: 0.235,
    twoCableAc: { r: 0.235, x: 0.135, z: 0.27 },
    threeCableSpaced: { r: 0.2, x: 0.115, z: 0.23 },
    threeCableTrefoil: { r: 0.2, x: 0.1, z: 0.22 },
    threeCableFlatTouching: { r: 0.2, x: 0.105, z: 0.23 },
    threeCableFlatSpaced: { r: 0.2, x: 0.125, z: 0.24 },
  },
  {
    size: 240,
    twoCableDc: 0.18,
    twoCableAc: { r: 0.18, x: 0.13, z: 0.22 },
    threeCableSpaced: { r: 0.155, x: 0.11, z: 0.19 },
    threeCableTrefoil: { r: 0.155, x: 0.095, z: 0.18 },
    threeCableFlatTouching: { r: 0.155, x: 0.1, z: 0.18 },
    threeCableFlatSpaced: { r: 0.155, x: 0.12, z: 0.2 },
  },
  {
    size: 300,
    twoCableDc: 0.145,
    twoCableAc: { r: 0.145, x: 0.125, z: 0.19 },
    threeCableSpaced: { r: 0.125, x: 0.105, z: 0.16 },
    threeCableTrefoil: { r: 0.125, x: 0.09, z: 0.15 },
    threeCableFlatTouching: { r: 0.125, x: 0.095, z: 0.16 },
    threeCableFlatSpaced: { r: 0.125, x: 0.115, z: 0.17 },
  },
  {
    size: 400,
    twoCableDc: 0.11,
    twoCableAc: { r: 0.11, x: 0.12, z: 0.16 },
    threeCableSpaced: { r: 0.095, x: 0.1, z: 0.14 },
    threeCableTrefoil: { r: 0.095, x: 0.085, z: 0.13 },
    threeCableFlatTouching: { r: 0.095, x: 0.09, z: 0.13 },
    threeCableFlatSpaced: { r: 0.095, x: 0.11, z: 0.15 },
  },
  {
    size: 500,
    twoCableDc: 0.088,
    twoCableAc: { r: 0.088, x: 0.115, z: 0.14 },
    threeCableSpaced: { r: 0.076, x: 0.095, z: 0.12 },
    threeCableTrefoil: { r: 0.076, x: 0.08, z: 0.11 },
    threeCableFlatTouching: { r: 0.076, x: 0.085, z: 0.11 },
    threeCableFlatSpaced: { r: 0.076, x: 0.105, z: 0.13 },
  },
  {
    size: 630,
    twoCableDc: 0.07,
    twoCableAc: { r: 0.07, x: 0.11, z: 0.13 },
    threeCableSpaced: { r: 0.061, x: 0.09, z: 0.11 },
    threeCableTrefoil: { r: 0.061, x: 0.075, z: 0.097 },
    threeCableFlatTouching: { r: 0.061, x: 0.08, z: 0.1 },
    threeCableFlatSpaced: { r: 0.061, x: 0.1, z: 0.12 },
  },
];

// Table 4D4B — Multicore armoured 70 °C thermoplastic insulated cables (copper
// conductors). Voltage drop per ampere per metre.
// From BS 7671:2018+A4:2026 Table 4D4B (edition label was "A3:2024").
export interface MulticoreArmouredVoltageDropEntry {
  size: number;
  twoCoreAc: number; // mV/A/m single-phase
  threeFourCoreAc: number; // mV/A/m three-phase
}

export const voltageDropMulticoreArmoured: MulticoreArmouredVoltageDropEntry[] = [
  { size: 1.5, twoCoreAc: 29, threeFourCoreAc: 25 },
  { size: 2.5, twoCoreAc: 18, threeFourCoreAc: 15 },
  { size: 4, twoCoreAc: 11, threeFourCoreAc: 9.5 },
  { size: 6, twoCoreAc: 7.3, threeFourCoreAc: 6.4 },
  { size: 10, twoCoreAc: 4.4, threeFourCoreAc: 3.8 },
  { size: 16, twoCoreAc: 2.8, threeFourCoreAc: 2.4 },
  { size: 25, twoCoreAc: 1.75, threeFourCoreAc: 1.5 },
  { size: 35, twoCoreAc: 1.25, threeFourCoreAc: 1.1 },
  { size: 50, twoCoreAc: 0.93, threeFourCoreAc: 0.81 },
  { size: 70, twoCoreAc: 0.65, threeFourCoreAc: 0.57 },
  { size: 95, twoCoreAc: 0.49, threeFourCoreAc: 0.43 },
  { size: 120, twoCoreAc: 0.39, threeFourCoreAc: 0.34 },
  { size: 150, twoCoreAc: 0.32, threeFourCoreAc: 0.28 },
  { size: 185, twoCoreAc: 0.26, threeFourCoreAc: 0.23 },
  { size: 240, twoCoreAc: 0.21, threeFourCoreAc: 0.18 },
  { size: 300, twoCoreAc: 0.17, threeFourCoreAc: 0.15 },
  { size: 400, twoCoreAc: 0.14, threeFourCoreAc: 0.12 },
];

// Table 4D5 — 70 °C thermoplastic insulated and sheathed flat cable with protective
// conductor (copper conductors), i.e. flat twin and earth. Voltage drop per ampere
// per metre. From BS 7671:2018+A4:2026 Table 4D5.
//
// FIXED (citation + fabricated column): this was labelled "Table 4D5B" and carried a
// `threeFourCoreAc` column (1.0:38, 1.5:25, 2.5:15, 4:9.5, 6:6.4, 10:3.8, 16:2.4).
//  - There is no Table 4D5B. Appendix 4's schedule of tables lists 4D5 once, as a single
//    combined table; the B-suffixed voltage-drop tables run 4D1B–4D4B then 4E1B.
//  - Table 4D5 covers a flat cable with protective conductor — a single-phase cable. It
//    publishes no three-or-four-core three-phase voltage-drop column. Those seven values
//    were the three/four-core column of Table 4D2B copied across, so the column is a
//    duplicate rather than a source. It has been removed and three-phase lookups now go
//    to voltageDropPvcMulticore (Table 4D2B) explicitly, which returns the same numbers
//    from the table that actually prints them.
export interface FlatTwinEarthVoltageDropEntry {
  size: number; // mm²
  twoCoreAc: number; // mV/A/m, single-phase — the only column Table 4D5 publishes
}

export const voltageDropFlatTwinEarth: FlatTwinEarthVoltageDropEntry[] = [
  { size: 1.0, twoCoreAc: 44 },
  { size: 1.5, twoCoreAc: 29 },
  { size: 2.5, twoCoreAc: 18 },
  { size: 4, twoCoreAc: 11 },
  { size: 6, twoCoreAc: 7.3 },
  { size: 10, twoCoreAc: 4.4 },
  { size: 16, twoCoreAc: 2.8 },
];

const multicoreValue = (
  table: MulticoreVoltageDropEntry[],
  size: number,
  isThreePhase: boolean
): number | null => {
  const entry = table.find((e) => e.size === size);
  if (!entry) return null;
  return isThreePhase ? entry.threeFourCoreAc : entry.twoCoreAc;
};

/**
 * Look up the tabulated voltage drop (mV/A/m) for a cable type, size and phase.
 * Returns null when Appendix 4 holds no tabulated value for that combination, so the
 * caller can say so rather than quote a number the standard does not give.
 *
 * The value returned is the tabulated (mV/A/m)z. Corrections for operating temperature
 * (App 4 §6.1) and load power factor (App 4 §6.2) are NOT applied here.
 */
export const lookupVoltageDropMvAm = (
  cableType: CableType,
  size: number,
  isThreePhase: boolean = false,
  referenceMethod: string = 'C'
): number | null => {
  // Reference Methods A/B (enclosed in conduit or trunking) vs C/F (clipped direct,
  // on tray, or in free air) — for single-core cables Appendix 4 tabulates these
  // separately because the conductor spacing changes the reactive component.
  const isEnclosed = ['A', 'A1', 'A2', 'B', 'B1', 'B2'].includes(referenceMethod);

  switch (cableType) {
    // Table 4D1B
    case 'pvc-single': {
      const entry = voltageDropPvcSingleCore.find((e) => e.size === size);
      if (!entry) return null;
      const core = isThreePhase ? entry.threeOrFourCoreAC : entry.twoCoreAC;
      return isEnclosed ? core.methodsAB.z : core.methodsCF.z;
    }
    // Table 4E1B
    case 'xlpe-single': {
      const entry = voltageDropXlpeSingleCore.find((e) => e.size === size);
      if (!entry) return null;
      const core = isThreePhase ? entry.threeOrFourCoreAC : entry.twoCoreAC;
      return isEnclosed ? core.methodsAB.z : core.methodsCF.z;
    }
    case 'pvc-twin-earth':
    case 'xlpe-twin-earth': {
      // Table 4D5 is single-phase only (flat cable with protective conductor) and stops
      // at 16 mm². Three-phase and larger sizes fall to Table 4D2B (multicore 70 °C
      // thermoplastic, non-armoured), which is where the three/four-core column is
      // actually printed — see the note on voltageDropFlatTwinEarth above.
      if (!isThreePhase) {
        const entry = voltageDropFlatTwinEarth.find((e) => e.size === size);
        if (entry) return entry.twoCoreAc;
      }
      return multicoreValue(voltageDropPvcMulticore, size, isThreePhase);
    }
    // Table 4D4B
    case 'swa':
      return multicoreValue(voltageDropMulticoreArmoured, size, isThreePhase);
    // Table 4D3B
    case 'swa-single-core': {
      const entry = voltageDropSingleCoreArmoured.find((e) => e.size === size);
      if (!entry) return null;
      return isThreePhase ? entry.threeCableTrefoil.z : entry.twoCableAc.z;
    }
    case 'micc':
    case 'aluminium-xlpe': {
      // ⚠️ NOT the right table. Appendix 4 gives mineral insulated cables their own
      // voltage-drop tables (4G1B, 4G2B) and aluminium conductors theirs (4H1B–4H4B for
      // 70 °C thermoplastic, 4J1B–4J4B for 90 °C thermosetting). This branch returns the
      // COPPER 70 °C thermoplastic multicore column of Table 4D2B as a stand-in.
      // For aluminium that UNDER-STATES the drop by roughly the ratio of the conductor
      // resistivities (~1.6×), so it errs towards an undersized cable. The correct
      // tables have not been added because their mV/A/m values cannot be verified from
      // any source held here (the landscape Appendix 4 pages do not extract legibly),
      // and inventing them would be worse. Do not rely on this branch for aluminium
      // design until Tables 4H/4J are transcribed from the printed standard.
      return multicoreValue(voltageDropPvcMulticore, size, isThreePhase);
    }
    default:
      // Table 4D2B
      return multicoreValue(voltageDropPvcMulticore, size, isThreePhase);
  }
};

/**
 * Get the voltage drop value (mV/A/m) for a given cable type, size, and phase.
 *
 * FIXED: this used to initialise `voltageDropMvAm = 18` — the 2.5 mm² value — and return
 * it whenever the size lookup missed. A miss then produced a plausible-looking number
 * from the wrong row: for a size below the bottom of a table (e.g. 1.0 mm² on the
 * armoured table, true value 29) it under-states the drop by ~38% and can report a
 * non-compliant circuit as compliant. It now returns NaN, which propagates and fails
 * every `<= limit` comparison, so a missing row can never read as a pass.
 * Prefer lookupVoltageDropMvAm(), which returns null, and handle the miss explicitly.
 */
export const getVoltageDropValue = (
  cableType: CableType,
  size: number,
  isThreePhase: boolean = false,
  referenceMethod: string = 'C'
): number => {
  const value = lookupVoltageDropMvAm(cableType, size, isThreePhase, referenceMethod);
  if (value === null) {
    console.warn(
      `[voltageDropTables] BS 7671 Appendix 4 holds no tabulated mV/A/m for ${size} mm² ` +
        `${cableType} (${isThreePhase ? 'three-phase' : 'single-phase'}).`
    );
    return Number.NaN;
  }
  return value;
};

/**
 * Calculate voltage drop in volts
 * ΔV = mV/A/m × Ib × L / 1000
 *
 * Power factor — App 4 §6.2. "For cables having conductors of cross-sectional area
 * 16 mm² or less, the design value of mV/A/m is obtained approximately by multiplying the
 * tabulated value by the power factor of the load, cos φ. For cables having conductors of
 * cross-sectional area greater than 16 mm², the design value of mV/A/m is given
 * approximately by: cos φ (tabulated (mV/A/m)r) + sin φ (tabulated (mV/A/m)x)."
 *
 * FIXED: cos φ used to be applied to the tabulated impedance at every size. Above 16 mm²
 * that is not the same quantity — cos φ·Z is smaller than cos φ·R + sin φ·X (e.g. at
 * 240 mm², R 0.18 / X 0.10 / Z 0.21 and cos φ 0.8: 0.168 against 0.204,
 * an 18% under-statement of the drop). The vector sum is not reproduced here because the R and X
 * sub-columns in this module are unverified against the printed table, so above 16 mm²
 * the tabulated impedance is used unmodified. App 4 §6 states that the direct use of the
 * tabulated value is the pessimistically high baseline, so this errs on the safe side.
 *
 * Operating temperature — the Ct factor of App 4 §6.1/§6.3 is deliberately NOT applied.
 * It is an optional refinement ("where a more accurate assessment of the voltage drop is
 * desirable"), it is ≤ 1, and it applies only where the protective device is other than a
 * BS 3036 fuse and the ambient temperature is at least 30 °C. Omitting it leaves the
 * result on the conservative side of the standard.
 */
export const calculateVoltageDrop = (
  cableType: CableType,
  size: number,
  current: number,
  length: number,
  isThreePhase: boolean = false,
  referenceMethod: string = 'C',
  powerFactor: number = 1.0
): { voltageDropVolts: number; voltageDropMvAm: number } => {
  const voltageDropMvAm = getVoltageDropValue(cableType, size, isThreePhase, referenceMethod);
  const powerFactorCorrection = size <= 16 ? powerFactor : 1;
  const voltageDropVolts = (voltageDropMvAm * current * length * powerFactorCorrection) / 1000;

  return {
    voltageDropVolts: Math.round(voltageDropVolts * 100) / 100,
    voltageDropMvAm,
  };
};

/**
 * Check the voltage drop against BS 7671:2018+A4:2026 Appendix 4 Table 4Ab.
 *
 * Table 4Ab:
 *   (a) LV installations supplied directly from a public LV distribution system
 *       — lighting 3%, other uses 5%
 *   (b) LV installation supplied from a private LV supply
 *       — lighting 6%, other uses 8%
 *   (*) The voltage drop within each final circuit should not exceed the values in (a).
 *   "Where the wiring systems of the installation are longer than 100 m, the voltage
 *   drops indicated above may be increased by 0.005% per metre of the wiring system
 *   beyond 100 m, without this increase being greater than 0.5%."
 *
 * FIXED: the limit was hard-coded to 3% / 5% with no supply type and no >100 m
 * relaxation, so a private-supply distribution circuit was failed against the public-
 * supply figure and a long run was failed against an unrelaxed limit. Both defaults are
 * unchanged (public LV, no relaxation), so existing callers keep the same answer.
 *
 * Note that the >100 m relaxation is a property of the whole wiring system, and that a
 * final circuit on a private supply is still held to the (a) figures — pass
 * supplyType 'public-lv' when checking a final circuit.
 */
export const isVoltageDropCompliant = (
  voltageDropVolts: number,
  supplyVoltage: number,
  isLighting: boolean = false,
  supplyType: 'public-lv' | 'private-lv' = 'public-lv',
  wiringSystemLengthMetres?: number
): { compliant: boolean; percentage: number; limit: number } => {
  const percentage = (voltageDropVolts / supplyVoltage) * 100;

  const baseLimit =
    supplyType === 'private-lv' ? (isLighting ? 6 : 8) : isLighting ? 3 : 5;

  // 0.005% per metre beyond 100 m, capped at a 0.5% increase.
  const longRunAllowance =
    wiringSystemLengthMetres && wiringSystemLengthMetres > 100
      ? Math.min((wiringSystemLengthMetres - 100) * 0.005, 0.5)
      : 0;

  const limit = Math.round((baseLimit + longRunAllowance) * 1000) / 1000;

  return {
    compliant: percentage <= limit,
    percentage: Math.round(percentage * 100) / 100,
    limit,
  };
};
