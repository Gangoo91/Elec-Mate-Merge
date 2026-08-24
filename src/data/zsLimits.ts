/**
 * BS 7671 Maximum Earth Fault Loop Impedance (Zs) Values
 *
 * Source: BS 7671:2018+A4:2026 Tables 41.2, 41.3, 41.4, 41.5
 *
 * IMPORTANT NOTES:
 * - All values are in Ohms (Ω)
 * - Values determined using Cmin = 0.95 (Note 1 in BS 7671)
 * - 0.4s disconnection time for final circuits (Reg 411.3.2.2)
 * - 5s disconnection time for distribution circuits (Reg 411.3.2.3)
 * - Table 41.3 (circuit-breakers, Reg 411.4.202) covers both the 0.4 s and the
 *   5 s disconnection time, but NOT by publishing one shared set of values:
 *     · 41.3(a) Type B and 41.3(b) Type C each print a SINGLE Zs row, valid for
 *       both times — formulae 230 x 0.95/(5·In) and 230 x 0.95/(10·In).
 *     · 41.3(c) Type D prints TWO rows: a '0.4 sec' row at 230 x 0.95/(20·In)
 *       and a SEPARATE '5 secs' row at 230 x 0.95/(10·In) — i.e. the 5 s values
 *       are exactly double the 0.4 s ones. Type D is the only curve that
 *       differs by disconnection time. Verified against the printed table.
 *   The Type D '5s' values therefore coincide numerically with the Type C row
 *   because both use the 10·In multiplier. That is a genuine shared formula,
 *   NOT a copy-paste error — do not "fix" it by mirroring the 0.4 s row.
 * - Measured values should be compared after temperature correction if tested at different temperatures
 */

// =============================================================================
// TABLE 41.3 - MCBs and RCBOs to BS EN 60898 and BS EN 61009 (230V)
// =============================================================================

export const MCB_RCBO_ZS_LIMITS = {
  // Type B - Table 41.3(a)
  typeB: {
    '0.4s': {
      3: 14.57,
      6: 7.28,
      10: 4.37,
      16: 2.73,
      20: 2.19,
      25: 1.75,
      32: 1.37,
      40: 1.09,
      50: 0.87,
      63: 0.69,
      80: 0.55,
      100: 0.44,
      125: 0.35,
    },
    '5s': {
      3: 14.57,
      6: 7.28,
      10: 4.37,
      16: 2.73,
      20: 2.19,
      25: 1.75,
      32: 1.37,
      40: 1.09,
      50: 0.87,
      63: 0.69,
      80: 0.55,
      100: 0.44,
      125: 0.35,
    },
  },
  // Type C - Table 41.3(b)
  typeC: {
    '0.4s': {
      6: 3.64,
      10: 2.19,
      16: 1.37,
      20: 1.09,
      25: 0.87,
      32: 0.68,
      40: 0.55,
      50: 0.44,
      63: 0.35,
      80: 0.27,
      100: 0.22,
      125: 0.17,
    },
    '5s': {
      6: 3.64,
      10: 2.19,
      16: 1.37,
      20: 1.09,
      25: 0.87,
      32: 0.68,
      40: 0.55,
      50: 0.44,
      63: 0.35,
      80: 0.27,
      100: 0.22,
      125: 0.17,
    },
  },
  // Type D - Table 41.3(c). The ONLY curve with two printed rows:
  //   '0.4s' = 230 × 0.95 / (20 × In)  (top of the 10–20×In magnetic band)
  //   '5s'   = 230 × 0.95 / (10 × In)  (bottom of the band is enough for 5 s)
  // so the 5 s figures are double the 0.4 s ones (D32: 0.34 Ω vs 0.68 Ω).
  typeD: {
    '0.4s': {
      6: 1.82,
      10: 1.09,
      16: 0.68,
      20: 0.55,
      25: 0.44,
      32: 0.34,
      40: 0.27,
      50: 0.22,
      63: 0.17,
      80: 0.14,
      100: 0.11,
      125: 0.09,
    },
    '5s': {
      6: 3.64,
      10: 2.19,
      16: 1.37,
      20: 1.09,
      25: 0.87,
      32: 0.68,
      40: 0.55,
      50: 0.44,
      63: 0.35,
      80: 0.27,
      100: 0.22,
      125: 0.17,
    },
  },
} as const;

// =============================================================================
// BS 3871-1 CIRCUIT-BREAKERS — Types 1, 2, 3 and 4 (230V)
// =============================================================================
//
// ELE-1604. BS 3871-1 is WITHDRAWN, replaced by BS EN 60898-1:2019 — which is
// exactly why an EICR needs it. The On-Site Guide says so in as many words:
// "BS 3871-1 has been withdrawn and is replaced by BS EN 60898-1:2019; however,
// these devices are likely to be present in older installations." An EICR
// surveys what is there, not what would be installed today.
//
// 🔴 These curves are NOT interchangeable with B/C/D. Type 1 trips at 4x In
// where a Type B trips at 5x — so scheduling an old Type 1 as a "Type B"
// understates its permitted Zs by 20% and can fail a circuit that complies.
// Type 4 is 50x In, an order of magnitude away from anything in Table 41.3.
//
// ── Provenance ────────────────────────────────────────────────────────────────
// BS 7671 dropped the BS 3871 time/current characteristics, so Table 41.3 has
// no row for these devices. The IET On-Site Guide keeps them in **Appendix B,
// Table B6(ii)** — "Circuit-breakers. Maximum measured earth fault loop
// impedance (in ohms) at ambient temperature where the overcurrent device is a
// circuit-breaker to BS 3871". GN3 Table A5 is the equivalent (confirmed in
// bs7671_facets), but GN3 is not held; the OSG is.
//
// The values BELOW are the 70 °C DESIGN figures, not the OSG's measured ones,
// so that they sit on the same footing as MCB_RCBO_ZS_LIMITS and the app's
// existing 100%/80% Zs basis toggle behaves identically for a BS 3871 device.
// Storing the OSG's measured figures here would apply the 0.8 factor twice.
//
// Derived as 230 x 0.95 / (k x In), the same Cmin = 0.95 formula the printed
// Table 41.3 uses. VERIFIED, not assumed: multiplying each value below by the
// OSG's 0.8 ambient factor reproduces **all 60 printed figures of Table B6(ii)
// exactly**, which is what pins k for each type. `npm run check:eicr` asserts
// that reconciliation so a hand-edit here cannot drift from the printed table.
//
//   Type 1 -> k = 4      Type 2 -> k = 7      Type 3 -> k = 10     Type 4 -> k = 50
//
// Ratings are the BS 3871 preferred values printed in Table B6(ii) — note 15,
// 30, 45 and 60 A, which have no BS EN 60898 equivalent.
//
// One row, not two: Table B6(ii) covers "0.1 to 5 s" for every type, so unlike
// Type D there is no separate 5 s column to hold.

export const BS3871_ZS_LIMITS = {
  type1: {
    5: 10.93, 6: 9.1, 10: 5.46, 15: 3.64, 16: 3.41, 20: 2.73, 25: 2.19, 30: 1.82,
    32: 1.71, 40: 1.37, 45: 1.21, 50: 1.09, 60: 0.91, 63: 0.87, 100: 0.55,
  },
  type2: {
    5: 6.24, 6: 5.2, 10: 3.12, 15: 2.08, 16: 1.95, 20: 1.56, 25: 1.25, 30: 1.04,
    32: 0.98, 40: 0.78, 45: 0.69, 50: 0.62, 60: 0.52, 63: 0.5, 100: 0.31,
  },
  type3: {
    5: 4.37, 6: 3.64, 10: 2.19, 15: 1.46, 16: 1.37, 20: 1.09, 25: 0.87, 30: 0.73,
    32: 0.68, 40: 0.55, 45: 0.49, 50: 0.44, 60: 0.36, 63: 0.35, 100: 0.22,
  },
  type4: {
    5: 0.87, 6: 0.73, 10: 0.44, 15: 0.29, 16: 0.27, 20: 0.22, 25: 0.17, 30: 0.15,
    32: 0.14, 40: 0.11, 45: 0.1, 50: 0.09, 60: 0.07, 63: 0.07, 100: 0.04,
  },
} as const;

/** Instantaneous trip multiples of In, by BS 3871 type — the reason the table exists. */
export const BS3871_TRIP_MULTIPLES = { type1: 4, type2: 7, type3: 10, type4: 50 } as const;

// =============================================================================
// TABLE 41.2 - Fuses at 0.4s Disconnection Time (230V)
// =============================================================================

export const FUSE_ZS_LIMITS_04S = {
  // BS 88-2.2 gG Fuses (BS EN 60269-2) - Table 41.2(a)
  bs88_2: {
    2: 33.1,
    4: 15.6,
    6: 7.8,
    10: 4.65,
    16: 2.43,
    20: 1.68,
    25: 1.29,
    32: 0.99,
    40: 0.75,
    50: 0.57,
    63: 0.44,
  },
  // BS 88-3 Fuse System C (BS EN 60269-3) - Table 41.2(b)
  bs88_3: {
    5: 9.93,
    16: 2.3,
    20: 1.93,
    32: 0.91,
    45: 0.57,
    63: 0.36,
  },
  // BS 3036 Rewirable Fuses - Table 41.2(c)
  bs3036: {
    5: 9.1,
    15: 2.43,
    20: 1.68,
    30: 1.04,
    45: 0.56,
    60: 0.4,
  },
  // BS 1362 Plug-Top Fuses - Table 41.2(d)
  bs1362: {
    3: 15.6,
    13: 2.3,
  },
} as const;

// =============================================================================
// TABLE 41.4 - Fuses at 5s Disconnection Time (230V)
// =============================================================================

export const FUSE_ZS_LIMITS_5S = {
  // BS 88-2.2 gG Fuses - Table 41.4(a)
  bs88_2: {
    2: 44,
    4: 21,
    6: 12,
    10: 6.8,
    16: 4.0,
    20: 2.8,
    25: 2.2,
    32: 1.7,
    40: 1.3,
    50: 0.99,
    63: 0.78,
    80: 0.55,
    100: 0.42,
    125: 0.32,
    160: 0.27,
    200: 0.18,
  },
  // BS 88-3 Fuse System C - Table 41.4(b)
  bs88_3: {
    5: 14.6,
    16: 3.9,
    20: 3.2,
    32: 1.6,
    45: 1.0,
    63: 0.68,
    80: 0.51,
    100: 0.38,
  },
  // BS 3036 Rewirable Fuses - Table 41.4(c)
  bs3036: {
    5: 16.8,
    15: 5.08,
    20: 3.64,
    30: 2.51,
    45: 1.51,
    60: 1.07,
    100: 0.51,
  },
  // BS 1362 Plug-Top Fuses - Table 41.4(d)
  bs1362: {
    3: 22.0,
    13: 3.64,
  },
} as const;

// =============================================================================
// TABLE 41.5 - RCDs to BS EN 61008-1 and BS EN 61009-1 (230V)
// Maximum Zs for RCD protection per Regulation 411.5.3
// =============================================================================

export const RCD_ZS_LIMITS = {
  // Rated residual operating current (IΔn) in mA -> Max Zs in Ω
  //
  // Zs = 50 / IΔn, from Reg 411.5.3: Ra × IΔn ≤ 50 V.
  // 30 mA -> 50/0.03 = 1667 Ω · 100 mA -> 500 Ω · 300 mA -> 167 Ω · 500 mA -> 100 Ω.
  //
  // The comment here used to read "Zs = 50V / (IΔn × 5)", which yields 333 Ω at
  // 30 mA and matches none of the values below it. The ×5 came from the old
  // 5IΔn trip test — which A4:2026 DELETED along with Table 3A — so anyone
  // maintaining this from the comment rather than the table would have
  // "corrected" four right numbers into four wrong ones.
  30: 1667, // 30mA RCD - Note: Earth electrode resistance ≤ 200Ω
  100: 500, // 100mA RCD - Note: Earth electrode resistance ≤ 200Ω
  300: 167, // 300mA RCD
  500: 100, // 500mA RCD
} as const;

// =============================================================================
// TABLE 41.6 - Reduced Low Voltage Systems (55V and 63.5V)
// MCBs to BS EN 60898 and Fuses to BS 88-2
// =============================================================================

export const REDUCED_VOLTAGE_ZS_LIMITS = {
  // 55V Systems - 5s disconnection time
  '55V': {
    // MCB Type B
    typeB: {
      3: 3.48,
      6: 1.74,
      10: 1.05,
      16: 0.65,
      20: 0.52,
      25: 0.42,
      32: 0.33,
      40: 0.26,
      50: 0.21,
      63: 0.17,
      80: 0.13,
      100: 0.1,
      125: 0.08,
    },
    // MCB Type C
    typeC: {
      6: 0.87,
      10: 0.52,
      16: 0.33,
      20: 0.26,
      25: 0.21,
      32: 0.16,
      40: 0.13,
      50: 0.1,
      63: 0.08,
      80: 0.06,
      100: 0.05,
      125: 0.04,
    },
    // MCB Type D
    typeD: {
      6: 0.44,
      10: 0.26,
      16: 0.16,
      20: 0.13,
      25: 0.1,
      32: 0.08,
      40: 0.06,
      50: 0.05,
      63: 0.04,
      80: 0.03,
      100: 0.03,
      125: 0.02,
    },
    // BS 88-2 gG Fuses
    bs88_2: {
      6: 2.9,
      10: 1.63,
      16: 0.95,
      20: 0.67,
      25: 0.52,
      32: 0.42,
      40: 0.31,
      50: 0.24,
      63: 0.19,
      80: 0.13,
      100: 0.12,
      125: 0.08,
    },
  },
  // 63.5V Systems - 5s disconnection time
  '63.5V': {
    // MCB Type B
    typeB: {
      3: 4.02,
      6: 2.01,
      10: 1.21,
      16: 0.75,
      20: 0.6,
      25: 0.48,
      32: 0.38,
      40: 0.3,
      50: 0.24,
      63: 0.19,
      80: 0.15,
      100: 0.12,
      125: 0.1,
    },
    // MCB Type C
    typeC: {
      6: 1.0,
      10: 0.6,
      16: 0.38,
      20: 0.3,
      25: 0.24,
      32: 0.19,
      40: 0.15,
      50: 0.12,
      63: 0.1,
      80: 0.07,
      100: 0.06,
      125: 0.05,
    },
    // MCB Type D
    typeD: {
      6: 0.5,
      10: 0.3,
      16: 0.19,
      20: 0.15,
      25: 0.12,
      32: 0.09,
      40: 0.07,
      50: 0.06,
      63: 0.05,
      80: 0.04,
      100: 0.03,
      125: 0.02,
    },
    // BS 88-2 gG Fuses
    bs88_2: {
      6: 3.35,
      10: 1.89,
      16: 1.1,
      20: 0.77,
      25: 0.6,
      32: 0.48,
      40: 0.35,
      50: 0.27,
      63: 0.22,
      80: 0.15,
      100: 0.14,
      125: 0.09,
    },
  },
} as const;

// =============================================================================
// Types
// =============================================================================

export type DisconnectionTime = '0.4s' | '5s';
export type MCBCurve = 'typeB' | 'typeC' | 'typeD';
export type BS3871Type = 'type1' | 'type2' | 'type3' | 'type4';
export type FuseType = 'bs88_2' | 'bs88_3' | 'bs3036' | 'bs1362';
export type RcdRating = 30 | 100 | 300 | 500;

export interface ZsLookupResult {
  maxZs: number;
  source: string;
  disconnectionTime: DisconnectionTime;
  notes?: string;
}

// =============================================================================
// Lookup Functions
// =============================================================================

/**
 * Get maximum Zs for MCB/RCBO devices
 */
export function getMcbZsLimit(
  curve: MCBCurve,
  rating: number,
  disconnectionTime: DisconnectionTime = '0.4s'
): ZsLookupResult | null {
  const curveData = MCB_RCBO_ZS_LIMITS[curve];
  if (!curveData) return null;

  const timeData = curveData[disconnectionTime];
  const maxZs = timeData[rating as keyof typeof timeData];

  if (maxZs === undefined) return null;

  return {
    maxZs,
    source: `BS 7671 Table 41.3 (${curve.replace('type', 'Type ')})`,
    disconnectionTime,
    notes: `Cmin = 0.95 applied`,
  };
}

/**
 * Get maximum Zs for a circuit-breaker to BS 3871-1 (Types 1, 2, 3, 4).
 *
 * `disconnectionTime` is accepted for signature parity with `getMcbZsLimit`,
 * but is deliberately unused: OSG Table B6(ii) prints a single "0.1 to 5 s"
 * row per type, so the same value serves both 0.4 s and 5 s. Returning a
 * different figure for 5 s would be inventing data the table does not hold.
 */
export function getBs3871ZsLimit(
  type: BS3871Type,
  rating: number,
  disconnectionTime: DisconnectionTime = '0.4s'
): ZsLookupResult | null {
  const typeData = BS3871_ZS_LIMITS[type];
  if (!typeData) return null;

  const maxZs = typeData[rating as keyof typeof typeData];
  if (maxZs === undefined) return null;

  return {
    maxZs,
    source: `IET On-Site Guide Table B6 (BS 3871 ${type.replace('type', 'Type ')})`,
    disconnectionTime,
    notes:
      `Withdrawn standard — trips at ${BS3871_TRIP_MULTIPLES[type]}x In. ` +
      `BS 7671 Table 41.3 does not cover BS 3871; do not substitute a Type B/C/D value.`,
  };
}

/**
 * Get maximum Zs for fuse devices
 */
export function getFuseZsLimit(
  fuseType: FuseType,
  rating: number,
  disconnectionTime: DisconnectionTime = '0.4s'
): ZsLookupResult | null {
  const limits = disconnectionTime === '0.4s' ? FUSE_ZS_LIMITS_04S : FUSE_ZS_LIMITS_5S;
  const fuseData = limits[fuseType];

  if (!fuseData) return null;

  const maxZs = fuseData[rating as keyof typeof fuseData];
  if (maxZs === undefined) return null;

  const tableNum = disconnectionTime === '0.4s' ? '41.2' : '41.4';
  const fuseNames: Record<FuseType, string> = {
    bs88_2: 'BS 88-2.2 gG',
    bs88_3: 'BS 88-3',
    bs3036: 'BS 3036',
    bs1362: 'BS 1362',
  };

  return {
    maxZs,
    source: `BS 7671 Table ${tableNum} (${fuseNames[fuseType]})`,
    disconnectionTime,
    notes: `Cmin = 0.95 applied`,
  };
}

/**
 * Determine disconnection time based on circuit type
 * Per BS 7671 Regulation 411.3.2
 */
export function getDisconnectionTimeForCircuit(circuitDescription: string): DisconnectionTime {
  const desc = circuitDescription.toLowerCase();

  // Distribution circuits use 5s (Reg 411.3.2.3)
  if (
    desc.includes('distribution') ||
    desc.includes('sub-main') ||
    desc.includes('submain') ||
    desc.includes('busbar') ||
    desc.includes('db') ||
    desc.includes('consumer unit supply') ||
    desc.includes('main switch')
  ) {
    return '5s';
  }

  // Final circuits use 0.4s (Reg 411.3.2.2)
  return '0.4s';
}

/**
 * Parse device type string and get Zs limit
 */
export function getZsLimitFromDeviceString(
  deviceType: string,
  rating: number,
  circuitDescription: string = '',
  /**
   * Explicit disconnection time, overriding the guess made from the circuit
   * description. Reg 411.3.2.2 decides this from the circuit's rating and
   * whether it has socket-outlets, not from its label — a 40 A cooker circuit
   * belongs at 5 s, and reading "cooker" cannot tell you that.
   *
   * Optional so existing callers are unaffected; new callers state the time.
   */
  disconnectionTimeOverride?: DisconnectionTime
): ZsLookupResult | null {
  const device = deviceType.toLowerCase();
  const disconnectionTime =
    disconnectionTimeOverride ?? getDisconnectionTimeForCircuit(circuitDescription);

  // MCCB detection - treat similar to MCB Type C/D depending on context
  if (device.includes('mccb') || device.includes('moulded case')) {
    // MCCBs typically have adjustable trip characteristics
    // Use Type C values as default (thermal-magnetic trip)
    // For high inrush loads, Type D may be more appropriate
    let curve: MCBCurve = 'typeC'; // Default for MCCBs
    if (device.includes('type d') || device.includes('high inrush')) {
      curve = 'typeD';
    } else if (device.includes('type b')) {
      curve = 'typeB';
    }
    const result = getMcbZsLimit(curve, rating, disconnectionTime);
    if (result) {
      result.source = result.source.replace('Table 41.3', 'Table 41.3 (MCCB)');
      result.notes = 'MCCB - verify instantaneous trip setting matches assumed curve';
    }
    return result;
  }

  /*
   * BS 3871-1 circuit-breakers — ELE-1604.
   *
   * 🔴 MUST precede the MCB branch below. That branch matches on the word
   * "mcb" and DEFAULTS to Type B, so a device string like
   * "MCB MCB (BS 3871) Type 1" — which is exactly what the schedule's
   * validators build — fell straight through to the Table 41.3 Type B column.
   *
   * Both directions of that are bad. A Type 1 (4x In) judged at the Type B
   * limit is failed for a fault it does not have (1.37 Ω against a real
   * 1.71 Ω). A Type 4 (50x In) judged at the Type B limit is the dangerous
   * one: its real limit at 32 A is 0.14 Ω, so a circuit ten times over would
   * have been passed silently.
   *
   * Returns null when no type is recorded rather than guessing — the caller
   * (`zsValidator`) already treats a missing curve as "not verified" and says
   * so, which is the honest outcome.
   */
  if (device.includes('3871')) {
    const typeMatch = device.match(/type\s*([1-4])\b/) || device.match(/\b([1-4])\b(?!\s*a)/);
    if (!typeMatch) return null;
    return getBs3871ZsLimit(`type${typeMatch[1]}` as BS3871Type, rating, disconnectionTime);
  }

  // MCB/RCBO detection
  if (device.includes('mcb') || device.includes('rcbo') || device.includes('miniature')) {
    let curve: MCBCurve = 'typeB'; // Default
    if (device.includes('type c') || device.includes('c ') || device.match(/\bc\d/)) {
      curve = 'typeC';
    } else if (device.includes('type d') || device.includes('d ') || device.match(/\bd\d/)) {
      curve = 'typeD';
    }
    return getMcbZsLimit(curve, rating, disconnectionTime);
  }

  // Fuse detection - handles both device type and BS standard formats
  if (
    device.includes('fuse') ||
    device.includes('bs 88') ||
    device.includes('bs88') ||
    device.includes('bs 3036') ||
    device.includes('bs3036') ||
    device.includes('bs 1361') ||
    device.includes('bs1361') ||
    device.includes('bs 1362') ||
    device.includes('bs1362')
  ) {
    let fuseType: FuseType = 'bs88_2'; // Default HRC

    if (
      device.includes('88-3') ||
      device.includes('88.3') ||
      device.includes('bs88-3') ||
      device.includes('system c') ||
      device.includes('bs 88-3')
    ) {
      fuseType = 'bs88_3';
    } else if (
      device.includes('88-2') ||
      device.includes('88.2') ||
      device.includes('bs88-2') ||
      device.includes('hrc') ||
      device.includes('gg') ||
      device.includes('bs 88-2') ||
      device === 'fuse-bs88' ||
      device.includes('bs 88') ||
      device.includes('bs88')
    ) {
      fuseType = 'bs88_2';
    } else if (
      device.includes('3036') ||
      device.includes('rewirable') ||
      device.includes('semi-enclosed')
    ) {
      fuseType = 'bs3036';
    } else if (device.includes('1362') || device.includes('plug')) {
      fuseType = 'bs1362';
    } else if (device.includes('1361') || device.includes('cartridge')) {
      // BS 1361 uses similar values to BS 88-3 (System C)
      fuseType = 'bs88_3';
    }

    return getFuseZsLimit(fuseType, rating, disconnectionTime);
  }

  // RCD detection
  if (device.includes('rcd') || device.includes('residual')) {
    return getRcdZsLimit(rating as RcdRating);
  }

  return null;
}

/**
 * Get maximum Zs for RCD protection
 * Per BS 7671 Table 41.5 and Regulation 411.5.3
 */
export function getRcdZsLimit(ratedResidualCurrent: RcdRating): ZsLookupResult | null {
  const maxZs = RCD_ZS_LIMITS[ratedResidualCurrent];
  if (maxZs === undefined) return null;

  const hasElectrodeNote = ratedResidualCurrent <= 100;

  return {
    maxZs,
    source: `BS 7671 Table 41.5 (RCD ${ratedResidualCurrent}mA)`,
    disconnectionTime: '0.4s',
    notes: hasElectrodeNote
      ? 'Earth electrode resistance should not exceed 200Ω (Note 2)'
      : 'Cmin = 0.95 applied',
  };
}

/**
 * Check if measured Zs is compliant
 */
export function checkZsCompliance(
  measuredZs: number,
  maxZs: number
): { compliant: boolean; margin: number; marginPercent: number } {
  const margin = maxZs - measuredZs;
  const marginPercent = (margin / maxZs) * 100;

  return {
    compliant: measuredZs <= maxZs,
    margin,
    marginPercent,
  };
}

/**
 * Temperature correction for Zs measurements.
 *
 * ELE-1422 — this cited "BS 7671 Appendix 14", which is wrong: A3 moved the
 * earth-fault-loop content out of Appendix 14 and into Appendix 3, and in
 * A4:2026 Appendix 14 is "Determination of prospective fault current".
 *
 * The correct anchors, confirmed against bs7671_facets:
 *   • NOTE 2 to the Zs tables (41.2–41.4, 41.6) states the assumed temperatures
 *     — line conductors at the maximum permitted operating temperature of
 *     Table 52.2, protective conductors at the assumed initial temperature of
 *     Tables 54.2/54.3.
 *   • Appendix 3 gives the METHOD of adjustment where conductors are at a
 *     different temperature when tested ("See Appendix 3 for the method of
 *     adjustment").
 */
export function applyTemperatureCorrection(
  measuredZs: number,
  testTemperature: number,
  conductorMaterial: 'copper' | 'aluminium' = 'copper',
  referenceTemperature: number = 70 // Operating temperature
): number {
  // Temperature coefficient per °C
  const alpha = conductorMaterial === 'copper' ? 0.00393 : 0.00403;

  // Correction factor
  const factor = (1 + alpha * (referenceTemperature - 20)) / (1 + alpha * (testTemperature - 20));

  return measuredZs * factor;
}

// =============================================================================
// MAX Zs — RULE-OF-THUMB SITE FACTORS (cold-measured comparison)
// =============================================================================
//
// The MAX_ZS_* tables above give the limit at the conductor's MAXIMUM
// operating temperature (typically 70 °C for thermoplastic/PVC). On site, a
// sparky measures Zs cold (10–20 °C), so the raw table value cannot be used
// as the pass threshold without correction.
//
// Two industry-standard rule-of-thumb factors are in common use:
//
//   - GN3 / NICEIC / NAPIT: × 0.80 (conservative, recommended in IET GN3)
//   - Common practice / 2391 syllabus: × 0.95
//
// We default to GN3 0.80 — it's the conservative choice. Failing a borderline
// circuit is the right error direction. The AI tool returns both values so
// the engineer can see the practical 0.95 limit too, and the user can toggle
// in settings later.
//
// References: IET Guidance Note 3 for the 0.8 rule-of-thumb factor — it is a
// GN3 convention, not a BS 7671 requirement. The underlying condition is
// NOTE 2 to BS 7671 Tables 41.2-41.4 (conductors at operating temperature per
// Table 52.2 / Tables 54.2-54.3). Corrected under ELE-1422; the previous
// "BS 7671 Appendix 14" citation was stale by two amendments.

/** GN3 / NICEIC conservative factor — multiply table Max Zs by this for site limit. */
export const ZS_TEMP_FACTOR_GN3 = 0.8;

/** Practical-use factor — what most 2391-trained electricians apply on site. */
export const ZS_TEMP_FACTOR_PRACTICAL = 0.95;

/** Default factor for the app — conservative, GN3-aligned. */
export const ZS_DEFAULT_TEMP_FACTOR = ZS_TEMP_FACTOR_GN3;

/**
 * Apply a rule-of-thumb temperature correction factor to a raw Max Zs value
 * pulled from BS 7671 Tables 41.2/41.3/41.4. Use this for the cold-measured
 * pass threshold a sparky compares to on site.
 *
 * @param rawMaxZs   Raw value from the BS 7671 table (Ω, at 70 °C)
 * @param factor     0.8 (default, GN3) or 0.95 (practical)
 * @returns          Corrected pass threshold for cold measurements (Ω)
 */
export function applyZsSiteFactor(
  rawMaxZs: number,
  factor: number = ZS_DEFAULT_TEMP_FACTOR
): number {
  return Math.round(rawMaxZs * factor * 100) / 100;
}
