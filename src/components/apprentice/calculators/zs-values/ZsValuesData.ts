// BS 7671:2018+A4:2026 Maximum Zs Values — Tables 41.2, 41.3, 41.4, 41.5
// All values for 230 V nominal voltage (Uo), Cmin = 0.95.
//
// ─────────────────────────────────────────────────────────────────────────────
// CONSOLIDATION (audit fix). This file used to carry its OWN transcription of
// Tables 41.2–41.5 — a fourth parallel copy alongside `src/data/zsLimits.ts`,
// which is the project's canonical Zs source. Parallel copies are how drift
// happens, and it had already happened here:
//
//   WAS WRONG: `zsValues5s.mcb['type-c']` held the **Type B** figures
//   (3 A → 14.57 Ω … 125 A → 0.35 Ω) under a comment claiming "for Type B and C,
//   5 s values equal Type B 0.4 s values". They do not. Table 41.3(b) prints a
//   SINGLE Zs row for Type C — 6 A → 3.64 Ω … 125 A → 0.17 Ω — and that one row
//   is valid for BOTH the 0.4 s time of Reg 411.3.2.2 and the 5 s time of
//   Reg 411.3.2.3 (table title, and Reg 411.4.202). The old data therefore
//   over-stated the permitted Zs for a Type C device on a 5 s circuit by a
//   factor of two, and invented a 3 A Type C rating that Table 41.3(b) does not
//   publish. Verified against the printed A4:2026 Table 41.3(a)/(b)/(c).
//
//   Type D is the only curve with two printed rows in Table 41.3(c):
//   0.4 s = 230 × 0.95 / (20·In), 5 s = 230 × 0.95 / (10·In).
//
// Every figure now comes from `@/data/zsLimits`. Do NOT re-inline numbers here —
// fix them at the canonical source so every consumer gets the fix.
// ─────────────────────────────────────────────────────────────────────────────

import {
  MCB_RCBO_ZS_LIMITS,
  FUSE_ZS_LIMITS_04S,
  FUSE_ZS_LIMITS_5S,
  RCD_ZS_LIMITS,
} from '@/data/zsLimits';

/** One tabulated column: device rating (A) → maximum Zs (Ω). */
type ZsRow = Record<number, number>;

/** The shape of a full 230 V Zs dataset for one disconnection time. */
interface ZsTable {
  mcb: Record<string, ZsRow>;
  rcbo: Record<string, ZsRow>;
  'bs88-2': ZsRow;
  'bs88-3': ZsRow;
  bs3036: ZsRow;
  bs1362: ZsRow;
}

// Helper function to get 80% test value.
// NOTE: the 0.8 factor is the GN3 rule-of-thumb temperature allowance applied
// when testing on cold conductors — it is NOT a BS 7671 tabulated value.
export const get80PercentZs = (maxZs: number): number => {
  return Math.round(maxZs * 0.8 * 1000) / 1000;
};

// Table 41.3(a)/(b)/(c) — 0.4 s column, per Reg 411.4.202.
// RCBOs to BS EN 61009-1 share the circuit-breaker overcurrent characteristic,
// so the same rows apply (see also Reg 411.4.204 / Table 41.5 for the residual
// path).
const mcbCurves04s: Record<string, ZsRow> = {
  'type-b': MCB_RCBO_ZS_LIMITS.typeB['0.4s'],
  'type-c': MCB_RCBO_ZS_LIMITS.typeC['0.4s'],
  'type-d': MCB_RCBO_ZS_LIMITS.typeD['0.4s'],
};

const mcbCurves5s: Record<string, ZsRow> = {
  'type-b': MCB_RCBO_ZS_LIMITS.typeB['5s'],
  'type-c': MCB_RCBO_ZS_LIMITS.typeC['5s'],
  'type-d': MCB_RCBO_ZS_LIMITS.typeD['5s'],
};

/** 0.4 s dataset — Table 41.3 (circuit-breakers) + Table 41.2 (fuses). */
export const zsValues: ZsTable = {
  mcb: mcbCurves04s,
  rcbo: mcbCurves04s,
  'bs88-2': FUSE_ZS_LIMITS_04S.bs88_2,
  'bs88-3': FUSE_ZS_LIMITS_04S.bs88_3,
  bs3036: FUSE_ZS_LIMITS_04S.bs3036,
  bs1362: FUSE_ZS_LIMITS_04S.bs1362,
};

/** 5 s dataset — Table 41.3 (circuit-breakers) + Table 41.4 (fuses). */
export const zsValues5s: ZsTable = {
  mcb: mcbCurves5s,
  rcbo: mcbCurves5s,
  'bs88-2': FUSE_ZS_LIMITS_5S.bs88_2,
  'bs88-3': FUSE_ZS_LIMITS_5S.bs88_3,
  bs3036: FUSE_ZS_LIMITS_5S.bs3036,
  bs1362: FUSE_ZS_LIMITS_5S.bs1362,
};

// Table 41.5 — maximum Zs for non-delayed and time-delayed 'S' type RCDs to
// BS EN 61008-1 / BS EN 61009-1 at Uo = 230 V (see Reg 411.5.3, Reg 411.4.204).
export const rcdZsValues = { ...RCD_ZS_LIMITS };

/**
 * Table 41.5 NOTE 2 (asterisked against the 30 mA and 100 mA rows):
 * "The resistance of the installation earth electrode should be as low as
 * practicable. A value exceeding 200 ohms may not be stable. Refer to
 * Regulation 542.2.4."
 * Reg 542.2.4 in turn requires the type and embedded depth of the electrode to
 * be such that soil drying and freezing will not increase its resistance above
 * the required value. This is a stability caveat ("should"), not a hard limit.
 */
export const EARTH_ELECTRODE_STABILITY_LIMIT_OHMS = 200;

// MCB Curve Types (BS EN 60898) - Type A removed as not in BS 7671
export const curveTypes: Record<string, string> = {
  'type-b': 'Type B (3-5 × In)',
  'type-c': 'Type C (5-10 × In)',
  'type-d': 'Type D (10-20 × In)',
};

// Fuse Types - UK BS standards only
export const fuseTypes: Record<string, string> = {
  'bs88-2': 'BS 88-2 gG/gM (HRC Fuse)',
  'bs88-3': 'BS 88-3 System C',
  bs3036: 'BS 3036 (Rewirable Fuse)',
  bs1362: 'BS 1362 (Plug Fuse)',
};

const ratingsOf = (row: ZsRow): number[] =>
  Object.keys(row)
    .map((r) => parseInt(r, 10))
    .sort((a, b) => a - b);

/**
 * Ratings that actually exist in the tables, per disconnection time.
 *
 * WAS WRONG: `fuseRatings` was a hand-written superset offered for BOTH times,
 * so a 0.4 s lookup could be asked for e.g. a 100 A BS 88-2 fuse — a rating
 * Table 41.2 does not publish (it stops at 63 A). Those ratings exist only in
 * Table 41.4 (5 s, Reg 411.4.203). Deriving the list from the table in use
 * makes an unanswerable selection impossible.
 */
export const getFuseRatings = (
  fuseType: string,
  disconnectionTime: '0.4' | '5' = '0.4'
): number[] => {
  const table = disconnectionTime === '0.4' ? zsValues : zsValues5s;
  const row = table[fuseType as keyof ZsTable];
  if (!row || fuseType === 'mcb' || fuseType === 'rcbo') return [];
  return ratingsOf(row as ZsRow);
};

/** Ratings published for a circuit-breaker curve at the given disconnection time. */
export const getMcbRatings = (
  curveType: string,
  disconnectionTime: '0.4' | '5' = '0.4'
): number[] => {
  const curves = disconnectionTime === '0.4' ? mcbCurves04s : mcbCurves5s;
  const row = curves[curveType];
  return row ? ratingsOf(row) : [];
};

/**
 * Available fuse ratings — the union across both disconnection times
 * (i.e. the Table 41.4 rating set, which is a superset of Table 41.2's).
 * Prefer `getFuseRatings()`: this list is only safe where the consumer checks
 * for a missing lookup.
 */
export const fuseRatings: Record<string, number[]> = {
  'bs88-2': ratingsOf(FUSE_ZS_LIMITS_5S.bs88_2),
  'bs88-3': ratingsOf(FUSE_ZS_LIMITS_5S.bs88_3),
  bs3036: ratingsOf(FUSE_ZS_LIMITS_5S.bs3036),
  bs1362: ratingsOf(FUSE_ZS_LIMITS_5S.bs1362),
};

/**
 * Available ratings for MCBs/RCBOs — the union across all three curves.
 * Type C and Type D start at 6 A (Table 41.3(b)/(c) publish no 3 A row), so
 * prefer `getMcbRatings(curve, time)` where the curve is known.
 */
export const mcbRatings = ratingsOf(MCB_RCBO_ZS_LIMITS.typeB['0.4s']);

// RCD ratings (mA)
export const rcdRatings = [30, 100, 300, 500];

// Disconnection times.
// 0.4 s = Table 41.1 via Reg 411.3.2.2 (TN, 230 V) for final circuits ≤ 63 A
//         with socket-outlets and ≤ 32 A supplying only fixed connected
//         current-using equipment.
// 5 s   = Reg 411.3.2.3 — TN distribution circuits and circuits not covered by
//         411.3.2.2. (In a TT system the corresponding allowance is 1 s,
//         Reg 411.3.2.4 — these tables are the TN 230 V set.)
export const disconnectionTimes: Record<string, string> = {
  '0.4': '0.4 s (Reg 411.3.2.2 final circuits)',
  '5': '5 s (Reg 411.3.2.3 TN distribution circuits)',
};

// Get Zs value based on device type, rating, and disconnection time
export const getZsValue = (
  deviceType: string,
  rating: number,
  curveType?: string,
  disconnectionTime: '0.4' | '5' = '0.4'
): number | null => {
  const data = disconnectionTime === '0.4' ? zsValues : zsValues5s;

  if (deviceType === 'mcb' || deviceType === 'rcbo') {
    if (!curveType) return null;
    const curveData = data[deviceType][curveType];
    if (!curveData) return null;
    return curveData[rating] ?? null;
  }

  if (deviceType === 'rcd') {
    return rcdZsValues[String(rating) as keyof typeof rcdZsValues] ?? null;
  }

  // Fuse types
  const fuseData = data[deviceType as keyof ZsTable];
  if (!fuseData) return null;
  return (fuseData as ZsRow)[rating] ?? null;
};

// Get table reference for display.
// Circuit-breakers/RCBOs → Table 41.3 (Reg 411.4.202, covers both times).
// Fuses → Table 41.2 at 0.4 s (Reg 411.4.201) or Table 41.4 at 5 s (Reg 411.4.203).
// RCDs → Table 41.5 (Reg 411.5.3 / 411.4.204).
export const getTableReference = (
  deviceType: string,
  disconnectionTime: '0.4' | '5' = '0.4'
): string => {
  if (deviceType === 'mcb' || deviceType === 'rcbo') {
    return 'Table 41.3';
  }
  if (deviceType === 'rcd') {
    return 'Table 41.5';
  }
  // Fuses
  return disconnectionTime === '0.4' ? 'Table 41.2' : 'Table 41.4';
};
