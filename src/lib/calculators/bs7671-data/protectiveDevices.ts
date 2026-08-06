// BS 7671 Protective Device Data and Calculations
// Includes MCB, RCBO, BS 88 Fuses and MCCB specifications.
//
// Zs DATA IS NOT DEFINED HERE. It is re-projected from src/data/zsLimits.ts,
// which is the single canonical copy of BS 7671 Tables 41.2 to 41.6. This module
// used to inline a second copy; two copies that happen to agree is not
// verification, and it is how drift starts. Verified against the printed
// A4:2026 tables — Table 41.3(a) Type B 3 A 14.57 Ω to 125 A 0.35 Ω,
// Table 41.3(c) Type D two rows, Table 41.2(a) BS 88-2 gG 2 A 33.1 Ω to 63 A 0.44 Ω,
// Table 41.4(a) BS 88-2 gG 5 s to 200 A 0.18 Ω.

import {
  MCB_RCBO_ZS_LIMITS,
  FUSE_ZS_LIMITS_04S,
  FUSE_ZS_LIMITS_5S,
  type DisconnectionTime,
} from '@/data/zsLimits';

export interface ProtectiveDevice {
  type: 'mcb' | 'rcbo' | 'bs88' | 'mccb';
  curve?: 'B' | 'C' | 'D';
  /**
   * Rating -> maximum Zs (Ω) for a nominal LINE-TO-EARTH voltage (Uo) of 230 V.
   * Empty where BS 7671 publishes no table for the device family — see `mccb`.
   */
  maxZs: Record<number, number>;
  /**
   * Rating -> maximum Zs (Ω) for the 5 s disconnection time of Reg 411.3.2.3,
   * present only where BS 7671 prints a SEPARATE 5 s row/table:
   *   · Table 41.3(c) Type D circuit-breakers (the only curve that differs by time)
   *   · Table 41.4 fuses
   * Table 41.3(a)/(b) Type B and Type C print a single row valid for both the
   * 0.4 s and the 5 s time, so those devices deliberately omit this.
   */
  maxZs5s?: Record<number, number>;
  characteristics: {
    /**
     * Indicative rated short-circuit capacity in kA for the device FAMILY.
     * BS 7671 publishes no Icn/Icu values — Reg 432.1/432.3/434.5.1 only require
     * the device to be capable of breaking (and for a circuit-breaker, making)
     * the maximum prospective fault current at the point where it is installed.
     * Icn/Icu is a product-standard and manufacturer figure (BS EN 60898-1 for
     * MCBs/RCBOs, BS EN 60947-2 for MCCBs). Treat these as a planning
     * placeholder only, never as evidence of compliance with Reg 434.5.1.
     */
    breakingCapacity: number; // kA — indicative, NOT a manufacturer's rating
    /**
     * Instantaneous (magnetic) trip band, expressed as a multiple of In.
     * These are the multiples BS 7671 Table 41.3 itself uses to derive Zs
     * (230 x 0.95 / (5·In) for B, /(10·In) for C, /(20·In) for D).
     */
    operatingTime: string;
    applications: string[];
    advantages: string[];
    considerations: string[];
  };
}

// Standard protective device ratings (BS EN 60898, BS EN 61009-1, BS 88-2, BS EN 60947-2).
// These are the product standards' preferred rated currents, which legitimately run
// wider than the BS 7671 Zs tables — Table 41.3 has no row for 1, 2, 4, 8 or 13 A and
// Table 41.2(a) stops at 63 A. Where a rating is not tabulated the maximum Zs must be
// derived from Reg 411.4.4 (Zs x Ia <= Uo x Cmin) using Ia from the product standard;
// getMaxZs() returns 0 for those, which means NOT TABULATED, never "no limit".
export const standardDeviceRatings = {
  mcb: [1, 2, 3, 4, 6, 8, 10, 13, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125],
  rcbo: [6, 10, 13, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125],
  bs88: [
    2, 4, 6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800,
    1000, 1250,
  ],
  mccb: [
    16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250,
    1600, 2000, 2500, 3200, 4000,
  ],
};

/**
 * BS 7671:2018+A4:2026 maximum Zs values, projected from the canonical
 * src/data/zsLimits.ts. All values are for Uo = 230 V (line to earth).
 *
 * WAS WRONG (header): the file previously labelled the whole block
 * "Tables 41.2, 41.3 (0.4s disconnection)". Table 41.3's printed title is
 * "...for circuit-breakers with Uo of 230 V, for operation giving compliance with
 * the 0.4 s disconnection time of Regulation 411.3.2.2 AND 5 s disconnection time
 * of Regulation 411.3.2.3" — it is not a 0.4 s-only table. Table 41.2 is the
 * 0.4 s fuse table; Table 41.4 is the 5 s fuse table.
 */
export const maxZsValues = {
  mcb: {
    // Table 41.3(a) — Type B circuit-breakers to BS EN 60898 and the overcurrent
    // characteristics of RCBOs to BS EN 61009-1. Ia = 5 x In. One row, both times.
    typeB: MCB_RCBO_ZS_LIMITS.typeB['0.4s'],
    // Table 41.3(b) — Type C. Ia = 10 x In. One row, both times.
    typeC: MCB_RCBO_ZS_LIMITS.typeC['0.4s'],
    // Table 41.3(c) — Type D. The ONLY curve printed as two rows:
    //   0.4 s = 230 x 0.95 / (20 x In)   5 s = 230 x 0.95 / (10 x In)
    typeD: MCB_RCBO_ZS_LIMITS.typeD['0.4s'],
    typeD5s: MCB_RCBO_ZS_LIMITS.typeD['5s'],
  },
  rcbo: {
    // Table 41.3 covers "the overcurrent characteristics of RCBOs to BS EN 61009-1",
    // so the RCBO overcurrent limits are the MCB limits (see also Reg 411.4.204).
    typeB: MCB_RCBO_ZS_LIMITS.typeB['0.4s'],
    typeC: MCB_RCBO_ZS_LIMITS.typeC['0.4s'],
  },
  bs88: {
    // Table 41.2(a) — general purpose (gG) and motor circuit application (gM) fuses
    // to BS 88-2, fuse systems E (bolted) and G (clip-in), 0.4 s. Stops at 63 A.
    gG: FUSE_ZS_LIMITS_04S.bs88_2,
    // Table 41.4(a) — the same fuses at the 5 s time of Reg 411.3.2.3, to 200 A.
    gG5s: FUSE_ZS_LIMITS_5S.bs88_2,
  },
  /**
   * WAS WRONG: this module inlined an "MCCB - Conservative values (varies by
   * manufacturer)" Zs table running to 4000 A. BS 7671 publishes no such table.
   * Table 41.3 covers only circuit-breakers to BS EN 60898 and the overcurrent
   * characteristics of RCBOs to BS EN 61009-1; an MCCB is a BS EN 60947-2 device
   * with a manufacturer-declared and usually adjustable magnetic setting, so its
   * maximum Zs must be calculated from Reg 411.4.4 (Zs x Ia <= Uo x Cmin, Cmin
   * = 0.95 per NOTE 1) using the actual Ia. The invented figures were also rounded
   * to 2 dp, which at large ratings rounded UP (e.g. 4000 A shown as 0.01 Ω).
   * Deliberately empty — getMaxZs() returns 0 and callers must apply Reg 411.4.4.
   */
  mccb: {
    standard: {} as Record<number, number>,
  },
};

export const protectiveDevices: Record<string, ProtectiveDevice> = {
  'mcb-b': {
    type: 'mcb',
    curve: 'B',
    maxZs: maxZsValues.mcb.typeB,
    characteristics: {
      breakingCapacity: 10,
      operatingTime: 'Instantaneous trip band 3–5 × In (BS EN 60898-1); Zs derived at 5 × In',
      applications: ['Domestic circuits', 'Commercial lighting', 'Small motors'],
      advantages: ['Quick disconnection', 'Cost effective', 'Compact'],
      considerations: ['Limited to 125A', 'May nuisance trip on motor starting'],
    },
  },

  'mcb-c': {
    type: 'mcb',
    curve: 'C',
    maxZs: maxZsValues.mcb.typeC,
    characteristics: {
      breakingCapacity: 10,
      operatingTime: 'Instantaneous trip band 5–10 × In (BS EN 60898-1); Zs derived at 10 × In',
      applications: ['Motor circuits', 'Fluorescent lighting', 'Commercial power'],
      advantages: ['Motor starting compatible', 'Versatile', 'Standard for commercial'],
      considerations: ['Slower earth fault clearance', 'Higher Zs requirements'],
    },
  },

  'mcb-d': {
    type: 'mcb',
    curve: 'D',
    maxZs: maxZsValues.mcb.typeD,
    // Table 41.3(c) prints a separate 5 s row at 230 x 0.95/(10 x In) — double the
    // 0.4 s figures. WAS MISSING: only the 0.4 s row was held, so a 5 s
    // distribution circuit was assessed against half the permitted Zs.
    maxZs5s: maxZsValues.mcb.typeD5s,
    characteristics: {
      breakingCapacity: 10,
      operatingTime: 'Instantaneous trip band 10–20 × In (BS EN 60898-1); Zs derived at 20 × In',
      applications: ['Large motors', 'Transformers', 'High inrush loads'],
      advantages: ['High inrush tolerance', 'Welding circuits', 'Transformer protection'],
      considerations: ['Very high Zs requirements', 'Slower fault clearance'],
    },
  },

  'rcbo-b': {
    type: 'rcbo',
    curve: 'B',
    maxZs: maxZsValues.rcbo.typeB,
    characteristics: {
      breakingCapacity: 10,
      operatingTime: 'Instantaneous trip band 3–5 × In (BS EN 60898-1) + residual protection',
      applications: ['Socket circuits', 'Bathroom circuits', 'IT equipment'],
      advantages: ['Combined protection', 'Individual RCD protection', 'Space saving'],
      considerations: ['Higher cost', 'False tripping possible', 'Testing requirements'],
    },
  },

  'rcbo-c': {
    type: 'rcbo',
    curve: 'C',
    maxZs: maxZsValues.rcbo.typeC,
    characteristics: {
      breakingCapacity: 10,
      operatingTime: 'Instantaneous trip band 5–10 × In (BS EN 60898-1) + residual protection',
      applications: ['Motor circuits with RCD', 'Commercial installations', 'TT systems'],
      advantages: ['Motor starting + RCD', 'Discrimination possible', 'Code compliance'],
      considerations: ['Complex testing', 'Higher cost', 'Coordination needed'],
    },
  },

  'bs88-gg': {
    type: 'bs88',
    maxZs: maxZsValues.bs88.gG,
    maxZs5s: maxZsValues.bs88.gG5s,
    characteristics: {
      breakingCapacity: 120,
      operatingTime: 'I²t characteristic — time/current curve from the manufacturer',
      applications: [
        'High current circuits',
        'Motor protection',
        'Industrial installations',
        'Main incomer protection',
      ],
      advantages: [
        'Very high breaking capacity',
        'Excellent discrimination',
        'No moving parts',
        'Current limiting',
      ],
      considerations: [
        'Must be replaced after operation',
        'Requires fuse carrier',
        'Higher voltage drop',
      ],
    },
  },

  mccb: {
    type: 'mccb',
    // No BS 7671 Zs table exists for BS EN 60947-2 devices — see maxZsValues.mccb.
    maxZs: maxZsValues.mccb.standard,
    characteristics: {
      breakingCapacity: 50,
      operatingTime: 'Adjustable time/current characteristics — Ia from the manufacturer',
      applications: [
        'Main distribution',
        'Large motor protection',
        'Feeder circuits',
        'Industrial applications',
      ],
      advantages: [
        'Adjustable settings',
        'High current ratings',
        'Good discrimination',
        'Reusable after trip',
      ],
      considerations: [
        'Higher cost',
        'Larger size',
        'Settings complexity',
        'Regular maintenance needed',
      ],
    },
  },
};

// Get suitable protective devices for a given design current
export const getSuitableDevices = (
  designCurrent: number,
  /**
   * The lowest current-carrying capacity Iz (A) of any conductor of the circuit,
   * after derating. Optional, but Reg 433.1.1(b) cannot be assessed without it.
   */
  cableIz?: number
): Array<{
  deviceType: string;
  ratings: number[];
  recommended: number;
  /** true/false per Reg 433.1.1, or null when Iz was not supplied. */
  compliance: boolean | null;
  complianceBasis: string;
}> => {
  const results: Array<{
    deviceType: string;
    ratings: number[];
    recommended: number;
    compliance: boolean | null;
    complianceBasis: string;
  }> = [];

  // Map generic device types to specific device variants
  const deviceTypeMapping: Record<string, string[]> = {
    mcb: ['mcb-b', 'mcb-c', 'mcb-d'],
    rcbo: ['rcbo-b', 'rcbo-c'],
    bs88: ['bs88-gg'],
    mccb: ['mccb'],
  };

  Object.entries(standardDeviceRatings).forEach(([genericType, ratings]) => {
    // Find suitable ratings — Reg 433.1.1(a): In >= Ib, and Reg 433.1.1(b): In <= Iz.
    const suitableRatings = ratings.filter((rating) => {
      const meetsA = rating >= designCurrent;
      const meetsB = !cableIz || rating <= cableIz;
      return meetsA && meetsB;
    });

    if (suitableRatings.length > 0) {
      const recommended = suitableRatings[0]; // Smallest suitable rating

      /**
       * WAS WRONG: `recommended >= designCurrent * 1.0 && recommended <= designCurrent * 1.45`.
       * BS 7671 has no such rule. Reg 433.1.1 is:
       *   (a) In >= Ib
       *   (b) In <= Iz  — the lowest current-carrying capacity of any conductor
       *   (c) I2 <= 1.45 x Iz — I2 is the current causing EFFECTIVE OPERATION of
       *       the device, taken from its product standard. The 1.45 relates I2 to
       *       Iz; it has nothing to do with Ib.
       * The old test both invented a ceiling on In (a 32 A MCB on a 10 A load is
       * perfectly compliant if the cable carries it) and skipped (b) entirely.
       *
       * Reg 433.1.201: where the device is a gG fuse to BS 88-2, a fuse to BS 88-3,
       * a circuit-breaker to BS EN 60898, a circuit-breaker to BS EN 60947-2 or an
       * RCBO to BS EN 61009-1, compliance with (a) and (b) also results in
       * compliance with (c). Every family in this module is on that list, so (a)
       * and (b) are sufficient here. (BS 3036 semi-enclosed fuses are NOT — they
       * fall under Reg 433.1.202, In <= 0.725 x Iz — and are not modelled here.)
       */
      const meetsA = recommended >= designCurrent;
      const compliance = cableIz ? meetsA && recommended <= cableIz : null;
      const complianceBasis = cableIz
        ? `Reg 433.1.1(a)+(b): Ib ${designCurrent} A <= In ${recommended} A <= Iz ${cableIz} A; (c) follows via Reg 433.1.201`
        : 'Reg 433.1.1(b) not assessed — the derated cable capacity Iz was not supplied';

      // Get the specific device variants for this generic type
      const deviceVariants = deviceTypeMapping[genericType] || [genericType];

      // Add each variant to results
      deviceVariants.forEach((specificType) => {
        // Only add if this specific device type exists in our protectiveDevices database
        if (protectiveDevices[specificType]) {
          results.push({
            deviceType: specificType,
            ratings: suitableRatings.slice(0, 3), // Show first 3 options
            recommended,
            compliance,
            complianceBasis,
          });
        }
      });
    }
  });

  return results.sort((a, b) => a.recommended - b.recommended);
};

// Get device family information for UI display
export const getDeviceInfo = (deviceType: string): ProtectiveDevice | null => {
  return protectiveDevices[deviceType] || null;
};

/**
 * Maximum Zs (Ω) for a device and rating, from BS 7671 Tables 41.2/41.3/41.4.
 *
 * Returns 0 when the rating is NOT TABULATED for that device (or the device has
 * no BS 7671 table at all, as with an MCCB). 0 means "no table row" — it does not
 * mean "no limit". Callers must fall back to Reg 411.4.4, Zs x Ia <= Uo x Cmin.
 *
 * WAS WRONG: this function took a `voltage` argument and returned
 * `maxZs[rating] * (voltage / 230)`. Reg 411.4.4 defines Uo as "the nominal AC RMS
 * or ripple-free DC LINE TO EARTH voltage", and Tables 41.2 to 41.5 are all headed
 * "with Uo of 230 V". In a 400/230 V TN system Uo is still 230 V, so passing 400
 * inflated every limit by x1.739 and would pass a dangerously high loop impedance.
 * Reduced low voltage (Uo of 55 V / 63.5 V) has its own table, Table 41.6 — it is
 * not obtained by scaling, and it lives in src/data/zsLimits.ts as
 * REDUCED_VOLTAGE_ZS_LIMITS. There is therefore no voltage argument.
 *
 * @param disconnectionTime 0.4 s (Reg 411.3.2.2) or 5 s (Reg 411.3.2.3). Only Type D
 *   circuit-breakers (Table 41.3(c)) and fuses (Table 41.4) publish different 5 s
 *   values; Table 41.3(a)/(b) Type B and C print one row valid for both times.
 */
export const getMaxZs = (
  deviceType: string,
  rating: number,
  disconnectionTime: DisconnectionTime = '0.4s'
): number => {
  const device = protectiveDevices[deviceType];
  if (!device) {
    return 0;
  }

  if (disconnectionTime === '5s' && device.maxZs5s?.[rating]) {
    return device.maxZs5s[rating];
  }

  return device.maxZs[rating] ?? 0;
};

/**
 * Recommend a device family for an application.
 *
 * `voltage` is accepted for call-site compatibility but is deliberately not used:
 * the choice of device FAMILY and trip curve is set by the load's inrush and by
 * the RCD requirements of Chapter 41/Part 7, not by the nominal voltage. Uo also
 * does not vary the Zs tables (see getMaxZs).
 *
 * The earthing system likewise does not change the device family — it changes the
 * Zs limit that must be met. In a TT system fault protection is generally by RCD
 * (Reg 411.5.3), where the limit is Table 41.5 (Ra x IdeltaN <= 50 V; 1667 Ω for
 * 30 mA) rather than the overcurrent limit of Table 41.3. Callers must select the
 * Table 41.5 limit themselves for TT; pass isRcd so an RCBO is recommended.
 */
export const getRecommendedDeviceType = (
  designCurrent: number,
  loadType: string,
  voltage: number,
  isRcd?: boolean
): string => {
  void voltage;

  // For high currents, recommend BS88 or MCCB
  if (designCurrent > 125) {
    return designCurrent > 400 ? 'mccb' : 'bs88-gg';
  }

  // For motor loads, prefer Type C
  if (loadType.includes('motor') || loadType.includes('hvac')) {
    return isRcd ? 'rcbo-c' : 'mcb-c';
  }

  // For socket circuits, prefer RCBO
  if (loadType === 'power' || loadType.includes('socket')) {
    return 'rcbo-b';
  }

  // Default to Type B
  return isRcd ? 'rcbo-b' : 'mcb-b';
};
