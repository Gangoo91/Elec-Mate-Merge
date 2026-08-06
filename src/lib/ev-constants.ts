/**
 * EV Charging Constants and Standards
 * BS 7671:2018+A4:2026 Section 722, BS EN 61851 series and the IET Code of Practice.
 *
 * ⚠️ Anything in this file that is NOT from BS 7671 now says so explicitly.
 * Presenting trade practice as a Wiring Regulations requirement is the failure
 * mode this file was audited for.
 */

import {
  ambientTemperatureFactors,
  groupingFactorsTable4C1,
  getTemperatureFactor,
  getGroupingFactor,
} from './calculators/bs7671-data/temperatureFactors';
import {
  CI_TOTALLY_SURROUNDED,
  getThermalInsulationFactor,
} from './calculators/bs7671-data/thermalInsulationFactors';

export const CHARGER_TYPES = {
  '3kw-ac': {
    power: 3,
    voltage: 230,
    phases: 1,
    efficiency: 0.9,
    label: '3kW AC (Slow)',
    connector: 'Type 1/2',
    typicalUse: 'Home/overnight charging',
    /** Mode 3 = AC conductive charging via dedicated EVSE (BS EN 61851-1). */
    chargingMode: 3,
  },
  '7kw-ac': {
    power: 7,
    voltage: 230,
    phases: 1,
    efficiency: 0.92,
    label: '7kW AC (Standard)',
    connector: 'Type 2',
    typicalUse: 'Home/workplace charging',
    chargingMode: 3,
  },
  '11kw-ac': {
    power: 11,
    voltage: 400,
    phases: 3,
    efficiency: 0.93,
    label: '11kW AC (Fast)',
    connector: 'Type 2',
    typicalUse: 'Public/workplace charging',
    chargingMode: 3,
  },
  '22kw-ac': {
    power: 22,
    voltage: 400,
    phases: 3,
    efficiency: 0.93,
    label: '22kW AC (Fast)',
    connector: 'Type 2',
    typicalUse: 'High-power public charging',
    chargingMode: 3,
  },
  '50kw-dc': {
    power: 50,
    voltage: 400,
    phases: 3,
    efficiency: 0.95,
    label: '50kW DC (Rapid)',
    connector: 'CCS/CHAdeMO',
    typicalUse: 'Rapid public charging',
    /** Mode 4 = DC (off-board charger). The DC side is inside the equipment. */
    chargingMode: 4,
  },
  '150kw-dc': {
    power: 150,
    voltage: 400,
    phases: 3,
    efficiency: 0.95,
    label: '150kW DC (Ultra-rapid)',
    connector: 'CCS',
    typicalUse: 'Ultra-rapid highway charging',
    chargingMode: 4,
  },
} as const;

/**
 * Earthing arrangements.
 *
 * 🔴 CORRECTED — `zs_max` was NEVER a BS 7671 maximum Zs.
 *
 * 0.35 Ω (PME/TN-C-S) and 0.8 Ω (TN-S) are the distributor's maximum DECLARED
 * EXTERNAL earth fault loop impedance, Ze. Maximum Zs is device- and
 * disconnection-time dependent and comes from BS 7671:2018+A4:2026
 * Tables 41.2 / 41.3 / 41.4, or Table 41.5 (Reg 411.5.3) where an RCD provides
 * fault protection. The repo's canonical source is `src/data/zsLimits.ts`.
 *
 * The 200 Ω against TT was the earth ELECTRODE stability figure: Table 41.5
 * NOTE 2 — "The resistance of the installation earth electrode should be as low
 * as practicable. A value exceeding 200 ohms may not be stable. Refer to
 * Regulation 542.2.4." Table 41.5 itself gives max Zs = 1667 Ω for a 30 mA RCD
 * at Uo 230 V — nearly 8½ times the number this file was using as a limit.
 *
 * @deprecated `zs_max` is retained only because `src/lib/ev-calculations.ts`
 * still reads it. Do not use it for new work — it is not a Zs limit. Use
 * `ze_declared_max` for the external loop assumption and `src/data/zsLimits.ts`
 * for the actual Zs limit of the selected protective device.
 */
export const EARTHING_SYSTEMS = {
  'tn-c-s': {
    label: 'TN-C-S (PME)',
    /** Distributor's maximum declared external earth fault loop impedance (Ze). */
    ze_declared_max: 0.35,
    /** @deprecated Ze, not Zs — see the block comment above. */
    zs_max: 0.35,
    description: 'Combined neutral and earth (PME supply)',
    considerations: 'Most common UK domestic supply',
  },
  'tn-s': {
    label: 'TN-S',
    ze_declared_max: 0.8,
    /** @deprecated Ze, not Zs — see the block comment above. */
    zs_max: 0.8,
    description: 'Separate neutral and earth',
    considerations: 'Older installations, cable supply',
  },
  tt: {
    label: 'TT (Earth Electrode)',
    /**
     * No declared figure exists for TT — Ra must be measured on site.
     * `undefined` deliberately, so nothing can silently assume a value.
     */
    ze_declared_max: undefined as number | undefined,
    /** @deprecated Electrode-stability figure (Table 41.5 NOTE 2 / Reg 542.2.4), not a Zs limit. */
    zs_max: 200,
    /** Table 41.5 NOTE 2 — an electrode above this may not be stable. */
    ra_stability_limit: 200,
    description: 'Local earth electrode system',
    considerations: 'Rural areas, requires RCD protection',
  },
} as const;

/**
 * ⚠️ `current` (Iz) and `impedance` are NOT verified against Appendix 4 and were
 * deliberately left untouched by the A4:2026 audit.
 *
 * `impedance` is exactly twice the BS EN 60228 conductor resistance at 20 °C
 * (2 × 7.41 = 14.82 for 2.5 mm², 2 × 4.61 = 9.22 for 4 mm², and so on) — i.e. a
 * two-conductor loop resistance at 20 °C. It is NOT the Appendix 4 tabulated
 * mV/A/m, which is quoted at the conductor's maximum permitted normal operating
 * temperature. Voltage drop computed from these figures therefore UNDER-states
 * the real drop. Appendix 4's landscape voltage-drop tables could not be read
 * from any source available here, so no substitution was made rather than
 * inventing numbers. Treat the voltage-drop output as indicative.
 *
 * Because `impedance` is already a two-conductor value, R1+R2 for line and cpc
 * of the same size is `impedance × L / 1000` — it must NOT be multiplied by two
 * again.
 */
export const CABLE_SPECIFICATIONS = {
  '2.5mm': { current: 20, impedance: 14.8, label: '2.5mm² T&E' },
  '4mm': { current: 25, impedance: 9.22, label: '4mm² T&E' },
  '6mm': { current: 32, impedance: 6.16, label: '6mm² T&E' },
  '10mm': { current: 43, impedance: 3.69, label: '10mm² T&E' },
  '16mm': { current: 57, impedance: 2.31, label: '16mm² SWA' },
  '25mm': { current: 75, impedance: 1.48, label: '25mm² SWA' },
  '35mm': { current: 94, impedance: 1.06, label: '35mm² SWA' },
} as const;

export const PROTECTION_DEVICES = {
  rcbo: { label: 'RCBO (Combined MCB + RCD)', trip_current: 30, type: 'Type A' },
  mcb_rcd: { label: 'MCB + RCD', trip_current: 30, type: 'Type A' },
  dc_protection: { label: 'DC Fault Protection', required_for: 'AC charging points' },
} as const;

/**
 * DC residual-current detection — BS 7671 Reg 722.531.3.101.
 *
 * 🔴 This is required for MODE 3 (AC) charge points, not for DC rapid units.
 * Appendix 1 of BS 7671:2018+A4:2026 lists BS IEC 62955:2018 as "Residual
 * direct current detecting device (RDC-DD) to be used for mode 3 charging of
 * electric vehicles" and references it against Table 537.4 and
 * Reg 722.531.3.101(b) and (c); the index entry reads
 * "RDC-DD … 722.531.3.101 selection and erection" under 722.531.3 RCDs.
 * Mode 3 is AC conductive charging through dedicated EVSE — so a 7 kW AC home
 * charge point needs DC fault-current detection as well as its 30 mA RCD,
 * unless the charging equipment provides that protection itself.
 */
export const RDC_DD = {
  regulation: 'Reg 722.531.3.101',
  deviceStandard: 'BS IEC 62955:2018',
  appliesTo: 'Mode 3 (AC) charge points',
  note:
    'Except where provided by the EV charging equipment itself, protection against DC fault ' +
    'current must be provided — a Type B RCD, or a Type A/F RCD together with an RDC-DD to ' +
    'BS IEC 62955.',
} as const;

export const INSTALLATION_LOCATIONS = {
  internal: {
    label: 'Internal/Garage',
    ip_rating: 'IP54',
    special_requirements: 'Adequate ventilation required',
  },
  external: {
    label: 'External/Driveway',
    ip_rating: 'IP65',
    special_requirements: 'Weather protection, possible earth electrode',
  },
  commercial: {
    label: 'Commercial Car Park',
    ip_rating: 'IP65',
    special_requirements: 'Load management, multiple unit considerations',
  },
} as const;

/**
 * ⚠️ NOT A BS 7671 TABLE.
 *
 * What BS 7671:2018+A4:2026 actually says:
 *   • Reg 311.1 — "In determining the maximum demand of an installation or part
 *     thereof, diversity may be taken into account." This is the general
 *     permission and Section 722 does not disapply it.
 *   • Reg 722.311.201 (under 722.311 "Maximum demand and diversity") — "Load
 *     curtailment, including load reduction or disconnection, either
 *     automatically or manually, may be taken into account when determining
 *     maximum demand of the installation or part thereof." This ADDS load
 *     curtailment as something that may be counted; it does not make curtailment
 *     a precondition for diversity, and it imposes no documentation requirement.
 *
 * What BS 7671 does NOT do is publish any coincidence factor or diversity table
 * for EV charge points. The figures below are trade planning values (IET Code of
 * Practice / DNO practice) and must be justified by the designer for the site —
 * they are not a Wiring Regulations requirement and are labelled accordingly.
 */
export const DIVERSITY_FACTORS = {
  single: {
    value: 1.0,
    label: 'Single Charger',
    description: 'One charging point — no reduction applied',
    requiresLoadCurtailment: false,
  },
  domestic_multiple: {
    value: 0.8,
    label: 'Multiple Domestic',
    description: '2-4 charging points — trade planning figure, not from BS 7671',
    requiresLoadCurtailment: true,
  },
  commercial_small: {
    value: 0.6,
    label: 'Small Commercial',
    description: '5-10 charging points — trade planning figure, not from BS 7671',
    requiresLoadCurtailment: true,
  },
  commercial_large: {
    value: 0.4,
    label: 'Large Commercial',
    description: '10+ charging points — trade planning figure, not from BS 7671',
    requiresLoadCurtailment: true,
  },
} as const;

export const LOAD_CURTAILMENT_NOTE =
  'Reg 311.1 allows diversity to be taken into account when determining maximum demand, and ' +
  'Reg 722.311.201 adds that load curtailment — automatic or manual load reduction or ' +
  'disconnection — may also be counted. BS 7671 publishes no diversity table for EV charge ' +
  'points, so this factor is a trade planning figure: justify it for the site, and where the ' +
  'supply is the constraint use a real load-management scheme rather than an assumed factor.';

export const TYPICAL_BATTERY_CAPACITIES = [
  { capacity: 40, vehicles: 'Nissan Leaf (older)' },
  { capacity: 50, vehicles: 'Volkswagen ID.3' },
  { capacity: 58, vehicles: 'Nissan Leaf e+' },
  { capacity: 64, vehicles: 'Hyundai Kona Electric' },
  { capacity: 75, vehicles: 'Tesla Model 3 Standard' },
  { capacity: 82, vehicles: 'Tesla Model 3 Long Range' },
  { capacity: 100, vehicles: 'Tesla Model S/X' },
] as const;

/**
 * ⚠️ `design_current_factor` (1.25) is NOT a BS 7671 requirement.
 *
 * BS 7671 sizes conductors by Reg 433.1.1: Ib ≤ In ≤ Iz, with I2 ≤ 1.45 Iz. The
 * only 1.25 in the Regulations is Reg 712.433.1 (PV strings, 1.25 × Isc), which
 * has nothing to do with EV charging. A 125% continuous-load multiplier is a
 * US NEC rule (NEC 625.41), not a Wiring Regulations one.
 *
 * @deprecated Retained only because `src/lib/ev-calculations.ts` still reads it.
 * `evse-calculations.ts` no longer uses it — it applies Reg 433.1.1 properly.
 *
 * The former `temperature_derating` block (a third, dead copy of Table 4B1 with
 * only three rows) has been deleted — nothing read it, and Ca now comes from
 * `bs7671-data/temperatureFactors.ts`.
 */
export const SAFETY_FACTORS = {
  /** @deprecated Not BS 7671 — see the block comment above. */
  design_current_factor: 1.25,
  /**
   * Reg 525.202 → Appendix 4, Section 6.4, Table 4Ab: 5% of nominal voltage for
   * "other uses" on an installation supplied directly from a public LV
   * distribution system (3% for lighting). NOT Appendix 12 — that appendix is
   * not used in BS 7671:2018+A4:2026.
   */
  voltage_drop_limit: 0.05,
} as const;

// ---------------------------------------------------------------------------
// Cable derating — BS 7671:2018+A4:2026 Appendix 4
//
// 🔴 CONSOLIDATED. This file used to inline its own three-factor copies of
// Tables 4B1 and 4C1 and an invented "Ci" set. All three were wrong or
// truncated, and none of them tracked the shared module:
//   • Ca stopped at 50 °C, with `?? 1.0` above that — a cable in a 60 °C plant
//     room got no derating at all. Table 4B1 continues 55 °C 0.61, 60 °C 0.50,
//     and prints a dash above 60 °C for 70 °C thermoplastic.
//   • Cg stopped at 6 circuits and was silently clamped with Math.min(n, 6).
//     Table 4C1 item 1 continues 7 0.54, 8 0.52, 9 0.50, 12 0.45, 16 0.41,
//     20 0.38. The values held WERE item 1 "bunched", but the comment labelled
//     them "clipped direct" — item 2, single layer on a wall, which is a
//     completely different row (1.00 / 0.85 / 0.79 / 0.75 / 0.73 / 0.72).
//   • Ci was cited to "Table 52.2", which is maximum operating temperatures for
//     types of cable insulation and has nothing to do with derating, and its
//     0.75 "touching one side" factor does not exist. Reg 523.9 and Appendix 4
//     s2.6 tabulate Ci by the LENGTH the cable is totally surrounded for; a
//     cable in contact with insulation on one side is handled by the tabulated
//     capacities of Installation Methods 100–103, not by a multiplier.
//
// Everything now comes from src/lib/calculators/bs7671-data/, which was
// transcribed from the printed standard.
// ---------------------------------------------------------------------------

export interface DeratingOption {
  value: string;
  label: string;
  factor: number;
}

/**
 * Ca — Table 4B1, 70 °C thermoplastic column. Rows above 60 °C are excluded
 * because Table 4B1 prints a dash there: there is no published factor, so the
 * option must not be offerable.
 */
export const CA_OPTIONS: DeratingOption[] = ambientTemperatureFactors
  .filter((f) => f.factor70C > 0)
  .map((f) => ({
    value: String(f.ambientTemp),
    label: f.ambientTemp === 30 ? '30°C (reference)' : `${f.ambientTemp}°C`,
    factor: f.factor70C,
  }));

/**
 * Ci — Appendix 4 s2.6, keyed by the length in mm over which the cable is
 * TOTALLY surrounded by thermal insulation. `0` means not in insulation.
 */
export const CI_OPTIONS: DeratingOption[] = [
  { value: '0', label: 'Not in thermal insulation', factor: 1.0 },
  ...Object.keys(CI_TOTALLY_SURROUNDED)
    .map(Number)
    .sort((a, b) => a - b)
    .map((mm) => ({
      value: String(mm),
      label: mm >= 500 ? 'Totally surrounded, ≥ 0.5 m' : `Totally surrounded, ${mm} mm`,
      factor: CI_TOTALLY_SURROUNDED[mm],
    })),
];

/** Cg — Table 4C1 item 1, bunched in air / on a surface / embedded / enclosed. */
export const CG_OPTIONS: DeratingOption[] = groupingFactorsTable4C1.map((g) => ({
  value: String(g.circuitsOrCables),
  label: g.circuitsOrCables === 1 ? '1 circuit' : `${g.circuitsOrCables} circuits`,
  factor: g.bunched,
}));

export { getTemperatureFactor, getGroupingFactor, getThermalInsulationFactor };

// DNO notification thresholds (Engineering Recommendation G98/G99/G100).
// ⚠️ Not BS 7671 — these come from the ENA Engineering Recommendations.
export const DNO_THRESHOLDS = {
  noNotification: 3.68, // kW — single point, generally no notification
  connectAndNotify: 7.4, // kW — single point, notify DNO
  fullApplication: 32, // kW — requires formal DNO application
  supplyUpgrade: 100, // kW — likely requires supply upgrade
} as const;
