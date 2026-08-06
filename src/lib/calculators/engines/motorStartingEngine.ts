// Motor Starting Current Engine — BS 7671:2018+A4:2026
//
// 2026-08-06 correctness pass. Every tabulated number this engine uses is now
// read from the verified BS 7671 Appendix 4 dataset under bs7671-data/ rather
// than from local copies. The rewritten areas and the reason for each are
// commented inline at the point of the change.

import {
  getTemperatureFactor,
  getGroupingFactor,
  GroupingArrangement,
} from '@/lib/calculators/bs7671-data/temperatureFactors';
import { capacityTables, PhaseKey } from '@/lib/calculators/bs7671-data/appendix4CurrentCapacity';
import {
  getVoltageDropValue,
  voltageDropPvcSingleCore,
  voltageDropMulticoreArmoured,
} from '@/lib/calculators/bs7671-data/voltageDropTables';
import type { CableType } from '@/lib/calculators/bs7671-data/cableCapacities';
import {
  standardDeviceRatings,
  getRecommendedDeviceType,
} from '../bs7671-data/protectiveDevices';

/** Cable constructions this calculator can size against a verified Appendix 4 table. */
export type MotorCableType = 'pvc-single' | 'swa-pvc';

export type MotorInstallationMethod =
  | 'clipped-direct'
  | 'conduit-on-wall'
  | 'trunking-on-wall'
  | 'tray'
  | 'buried-duct';

export interface MotorStartingInputs {
  powerKw: number;
  voltage: number;
  phases: 1 | 3;
  efficiency: number;
  powerFactor: number;
  startingMethod: 'direct' | 'star-delta' | 'soft-starter' | 'vfd' | 'autotransformer';
  loadType: 'standard' | 'high-torque' | 'low-torque' | 'centrifugal';
  ambientTemp: number;
  cableLength: number;
  cableType: MotorCableType;
  installationMethod: MotorInstallationMethod;
  /** Number of circuits in the group — Table 4C1 (Cg). */
  groupingCircuits: number;
  groupingArrangement: GroupingArrangement;
  ratedCurrent?: number;
  startingTime: number;
  /** Optional: the cable the designer proposes, checked against Reg 433.1.1(b). */
  proposedCableSize?: number;
  /** Optional: the device the designer proposes, checked against Reg 433.1.1(a) and (b). */
  proposedDeviceRating?: number;
}

export interface MotorStartingResult {
  fullLoadCurrent: number;
  startingCurrent: number;
  startingMultiplier: number;
  startingKva: number;

  // Cable analysis
  /** null when no tabulated size in the selected table satisfies the circuit. */
  minimumCableSize: number | null;
  recommendedCableSize: number | null;
  referenceMethodLabel: string;
  currentCarryingCheck: {
    /** Ib — design current of the circuit. */
    designCurrent: number;
    /** In — rated current of the protective device. */
    deviceRating: number;
    /** Iz — tabulated capacity after the rating factors. */
    capacity: number;
    /** Reg 433.1.1(a): In >= Ib */
    inNotLessThanIb: boolean;
    /** Reg 433.1.1(b): In <= Iz */
    inNotGreaterThanIz: boolean;
    /** Reg 433.1.1(c): I2 <= 1.45 Iz */
    i2WithinOneFourFiveIz: boolean;
    derating: number;
    deratingBreakdown: { ca: number; cg: number; cc: number };
  };

  // Voltage drop analysis
  voltageDropRunning: number;
  voltageDropStarting: number;
  /** Table 4Ab — 5% for "other uses" on a public LV supply. */
  voltageDropLimit: number;
  voltageDropCompliant: boolean;

  // Protection
  recommendedMcbRating: number;
  protectionSuitable: boolean;
  protectionType: string;
  protectionTypeLabel: string;

  // Compliance
  bs7671Compliant: boolean;
  thermalStress: number;

  // Recommendations
  recommendations: string[];
  warnings: string[];
  notes: string[];
}

// ── Starting-current multipliers ────────────────────────────────────────────
// 🔴 BS 7671 tabulates NO starting-current multipliers — nothing in Section 552
// or anywhere else gives a figure. These are typical machine values and are
// labelled as such in the UI; they are not a BS 7671 quantity.
// They previously read direct 5.5 / star-delta 1.8 / soft-starter 2.5 / vfd 1.2
// with comments "Reduced from 6.5" etc., which sat BELOW every range the same
// screen printed to the user (DOL 6-8x, star-delta 2-3x, soft start 2-4x,
// VFD 1-2x). Under-stating inrush is the unsafe direction for supply capacity
// and starting volt-drop, so each now takes the mid-point of the published
// range that the UI displays, and the two agree.
const startingMultipliers: Record<MotorStartingInputs['startingMethod'], number> = {
  direct: 7.0, // 6-8 x FLC
  'star-delta': 2.5, // 2-3 x FLC
  'soft-starter': 3.0, // 2-4 x FLC
  vfd: 1.5, // 1-2 x FLC
  autotransformer: 3.5, // 3-4 x FLC
};

// 🔴 REMOVED: loadTypeFactors (standard 1.0 / high-torque 1.15 / low-torque 0.9
// / centrifugal 0.85), which multiplied the inrush by the driven load. Locked-
// rotor current is fixed by the motor's own impedance and the applied voltage;
// the driven load sets how LONG the machine takes to run up, not how large the
// inrush is. BS 7671 gives no such factor. Load type now drives the Reg 552.1.1
// note on cumulative temperature rise instead, which is what the standard
// actually asks for.
//
// 🔴 REMOVED: an ambient "tempFactor" of 1 + (ambient - 40) x 0.002 applied to
// the starting current. Invented; no source in BS 7671 or in any table we hold.

/**
 * Design margin applied over the motor's full-load current.
 *
 * Reg 552.1.1 requires equipment (including the cable) to be suitable for a
 * current AT LEAST equal to the motor's full-load current rating — it is a
 * floor, not a formula. The 25% margin below is a design allowance for
 * nameplate tolerance and motor duty; it is permitted by 552.1.1 but is NOT a
 * BS 7671 requirement, and the old comment "Motor design current per BS 7671"
 * was a false citation.
 */
const DESIGN_MARGIN = 1.25;

// ── Reference methods, Table 4A2 ────────────────────────────────────────────
// 🔴 The installation-method selector used to be inert: the UI emitted
// 'clipped' | 'conduit' | 'trunking' | 'underground' | 'tray', none of which is
// a key of cableRunToReferenceMethod, so getReferenceMethod() returned its 'C'
// fallback for all five and every run was priced as clipped direct — the most
// generous of Methods A/B/C. The mapping below is explicit and has NO fallback:
// a combination BS 7671 does not tabulate returns nothing and is reported.
//
// Table 4A2: conduit or trunking on a wooden or masonry wall = Reference
// Method B; clipped direct = Method C; single-core touching on a tray or in
// free air = Method F; multicore on a perforated tray = Method E; in ducting in
// the ground = Method D1.
const REFERENCE_METHOD: Record<MotorCableType, Partial<Record<MotorInstallationMethod, string>>> = {
  'pvc-single': {
    'clipped-direct': 'method-c',
    'conduit-on-wall': 'method-b',
    'trunking-on-wall': 'method-b',
    tray: 'method-f',
    // Table 4D1A tabulates no buried column for single-core non-armoured cable.
  },
  'swa-pvc': {
    'clipped-direct': 'method-c',
    tray: 'method-e',
    'buried-duct': 'method-d1',
  },
};

const METHOD_LABEL: Record<string, string> = {
  'method-b': 'Reference Method B — in conduit or trunking on a wall',
  'method-c': 'Reference Method C — clipped direct',
  'method-e': 'Reference Method E — on a perforated cable tray',
  'method-f': 'Reference Method F — single-core touching, free air or tray',
  'method-d1': 'Reference Method D1 — in ducting in the ground',
};

const CABLE_LABEL: Record<MotorCableType, string> = {
  'pvc-single': 'Single-core 70 °C thermoplastic, non-armoured (Table 4D1A)',
  'swa-pvc': 'Multicore armoured 70 °C thermoplastic, SWA (Table 4D4A)',
};

/** Legacy key used by the Appendix 4 voltage-drop tables. */
const VOLTAGE_DROP_TYPE: Record<MotorCableType, CableType> = {
  'pvc-single': 'pvc-single',
  'swa-pvc': 'swa',
};

/** getVoltageDropValue() silently returns 18 mV/A/m for an unknown size, so check first. */
const hasVoltageDropEntry = (cableType: MotorCableType, size: number): boolean =>
  cableType === 'pvc-single'
    ? voltageDropPvcSingleCore.some((e) => e.size === size)
    : voltageDropMulticoreArmoured.some((e) => e.size === size);

const deviceLabel = (deviceType: string): string => {
  switch (deviceType) {
    case 'mcb-c':
      return 'Type C circuit-breaker to BS EN 60898';
    case 'mcb-b':
      return 'Type B circuit-breaker to BS EN 60898';
    case 'rcbo-c':
      return 'Type C RCBO to BS EN 61009-1';
    case 'rcbo-b':
      return 'Type B RCBO to BS EN 61009-1';
    case 'bs88-gg':
      return 'gG fuse to BS 88-2';
    case 'mccb':
      return 'Moulded-case circuit-breaker to BS EN 60947-2';
    default:
      return deviceType;
  }
};

const ratingsFor = (deviceType: string): number[] => {
  if (deviceType === 'mccb') return standardDeviceRatings.mccb;
  if (deviceType === 'bs88-gg') return standardDeviceRatings.bs88;
  if (deviceType.startsWith('rcbo')) return standardDeviceRatings.rcbo;
  return standardDeviceRatings.mcb;
};

export const calculateMotorStarting = (inputs: MotorStartingInputs): MotorStartingResult => {
  const recommendations: string[] = [];
  const warnings: string[] = [];
  const notes: string[] = [];

  // ── Full load current ─────────────────────────────────────────────────────
  let fullLoadCurrent: number;
  if (inputs.ratedCurrent && inputs.ratedCurrent > 0) {
    fullLoadCurrent = inputs.ratedCurrent;
  } else if (inputs.phases === 3) {
    fullLoadCurrent =
      (inputs.powerKw * 1000) /
      (Math.sqrt(3) * inputs.voltage * inputs.efficiency * inputs.powerFactor);
  } else {
    fullLoadCurrent =
      (inputs.powerKw * 1000) / (inputs.voltage * inputs.efficiency * inputs.powerFactor);
  }

  const startingMultiplier = startingMultipliers[inputs.startingMethod] ?? startingMultipliers.direct;
  const startingCurrent = fullLoadCurrent * startingMultiplier;

  const startingKva =
    inputs.phases === 3
      ? (Math.sqrt(3) * inputs.voltage * startingCurrent) / 1000
      : (inputs.voltage * startingCurrent) / 1000;

  const thermalStress = Math.pow(startingCurrent, 2) * inputs.startingTime;

  // ── Ib and In ─────────────────────────────────────────────────────────────
  const designCurrent = fullLoadCurrent * DESIGN_MARGIN;

  const deviceType = getRecommendedDeviceType(designCurrent, 'motor', inputs.voltage);
  const ratings = ratingsFor(deviceType);
  const deviceRating =
    inputs.proposedDeviceRating && inputs.proposedDeviceRating > 0
      ? inputs.proposedDeviceRating
      : (ratings.find((r) => r >= designCurrent) ?? ratings[ratings.length - 1]);

  // ── Rating factors ────────────────────────────────────────────────────────
  // Ca comes from the verified Table 4B1 (getTemperatureFactor); it was a single
  // 0.94 bucket for every ambient above 30 °C, which applied the 35 °C factor at
  // 40, 50 and 60 °C and over-stated capacity by 8%, 32% and 88% respectively.
  const table = capacityTables[inputs.cableType];
  const ca = getTemperatureFactor(inputs.ambientTemp, table.insulation);
  // Cg from the verified Table 4C1 rather than a free-text box the user had to
  // fill from memory.
  const cg = getGroupingFactor(Math.max(1, inputs.groupingCircuits || 1), inputs.groupingArrangement);
  // Cc — Appendix 4 §5.1.1(c)(ii): 0.9 where the installation method is "in a
  // duct in the ground" or "buried direct", 1 for cables installed above ground.
  const cc = inputs.installationMethod === 'buried-duct' ? 0.9 : 1.0;
  const totalDerating = ca * cg * cc;

  if (ca === 0) {
    warnings.push(
      `Table 4B1 publishes no ambient rating factor for 70 °C thermoplastic insulation above 60 °C — ${inputs.ambientTemp} °C is outside the tabulated range and no cable size can be given.`
    );
  }
  if (inputs.installationMethod === 'buried-duct') {
    notes.push(
      'Cc = 0.9 applied for a buried/ducted run (Appendix 4 §5.1.1). The soil-resistivity factor Cs (Table 4B3) and depth-of-laying factor Cd (Table 4B4) are left at 1.0 — the reference conditions of 2.5 K·m/W and 0.7 m depth. Apply them separately if site conditions differ.'
    );
  }
  notes.push(
    'No thermal-insulation factor Ci (Appendix 4 §2.6) is applied — this calculator has no "in thermal insulation" option. Apply Ci separately if any part of the run is enclosed in insulation.'
  );

  // ── Cable sizing, Appendix 4 §5.1.1 ───────────────────────────────────────
  const methodKey = REFERENCE_METHOD[inputs.cableType][inputs.installationMethod];
  // 🔴 The phase column was previously always the single-phase one: the legacy
  // adapter's SINGLE_CORE_KEYS declares no phase, so buildLegacy defaulted to
  // 'singlePhase' and a three-phase motor was sized on the "2 cables
  // single-phase" column of Table 4D1A, which is higher than the "3 or 4 cables
  // three-phase" column at every size.
  const phaseKey: PhaseKey = inputs.phases === 3 ? 'threePhase' : 'singlePhase';
  const column = methodKey ? table.methods[methodKey]?.[phaseKey] : undefined;

  const tabulated = column
    ? Object.entries(column)
        .map(([size, it]) => ({ size: parseFloat(size), it }))
        .sort((a, b) => a.size - b.size)
    : [];

  if (!methodKey) {
    warnings.push(
      `BS 7671 does not tabulate ${CABLE_LABEL[inputs.cableType]} for this installation method — choose a different cable construction or installation method.`
    );
  }

  // Appendix 4 Equation 1 works from the DEVICE rating In, not from Ib, because
  // Reg 433.1.1(b) requires In <= Iz. Sizing on Ib alone skips the device step.
  const requiredTabulated = totalDerating > 0 ? deviceRating / totalDerating : Infinity;
  const firstSuitable = tabulated.find((e) => e.it >= requiredTabulated);

  const minimumCableSize: number | null = firstSuitable ? firstSuitable.size : null;
  if (tabulated.length > 0 && !firstSuitable) {
    // 🔴 The old loop set a `foundSuitable` flag and then never read it, so a
    // circuit that no tabulated size could satisfy was still reported as 1.5 or
    // 2.5 mm². It now fails loudly.
    warnings.push(
      `No tabulated size in ${table.sourceTable} reaches the ${requiredTabulated.toFixed(0)} A required after the rating factors — the circuit needs a larger cable construction or fewer/cooler installation conditions.`
    );
  }

  // ── Voltage drop, Appendix 4 §6 ───────────────────────────────────────────
  // 🔴 The drop was previously computed from a four-bucket 20 °C DC resistance
  // ladder (1.83 / 2.5 / 3.08 / 7.41 mΩ/m) that was shifted one conductor size
  // and included a 2.5 value matching no conductor at all, and the single-phase
  // branch omitted the return conductor entirely. Appendix 4 §6 tabulates
  // mV/A/m at the conductor's operating temperature, and the tabulated value
  // already "represents the result of the voltage drops in all the circuit
  // conductors" — for three-phase circuits it relates to the line voltage. So
  // there is no separate x2 or x√3 to apply.
  const methodLetter = methodKey === 'method-b' ? 'B' : 'C';
  const vdPercent = (size: number, current: number): number | null => {
    if (!hasVoltageDropEntry(inputs.cableType, size)) return null;
    const mvPerAmpPerMetre = getVoltageDropValue(
      VOLTAGE_DROP_TYPE[inputs.cableType],
      size,
      inputs.phases === 3,
      methodLetter
    );
    return (((mvPerAmpPerMetre * current * inputs.cableLength) / 1000) * 100) / inputs.voltage;
  };

  // Table 4Ab: 3% lighting, 5% other uses, for an installation supplied directly
  // from a public LV distribution system. A motor is "other uses". The engine
  // used to gate on 3%, the LIGHTING figure.
  const voltageDropLimit = 5;

  let recommendedCableSize = minimumCableSize;
  let voltageDropRunning = 0;
  let voltageDropStarting = 0;

  const smallestSuitable = minimumCableSize;
  if (smallestSuitable !== null) {
    const running = vdPercent(smallestSuitable, fullLoadCurrent);
    if (running === null) {
      warnings.push(
        `No tabulated mV/A/m value is held for ${smallestSuitable} mm² of this cable type — voltage drop not calculated.`
      );
    } else if (running > voltageDropLimit) {
      const larger = tabulated.find(
        (e) =>
          e.size > smallestSuitable &&
          (vdPercent(e.size, fullLoadCurrent) ?? 100) <= voltageDropLimit
      );
      if (larger) {
        recommendedCableSize = larger.size;
        recommendations.push(
          `Increase the cable to ${larger.size} mm² to bring the running voltage drop within the ${voltageDropLimit}% limit of Table 4Ab.`
        );
      } else {
        warnings.push(
          `No tabulated size brings the running voltage drop within ${voltageDropLimit}% over ${inputs.cableLength} m — shorten the run or reconsider the supply arrangement.`
        );
      }
    }

    const finalSize = recommendedCableSize ?? smallestSuitable;
    voltageDropRunning = vdPercent(finalSize, fullLoadCurrent) ?? 0;
    voltageDropStarting = vdPercent(finalSize, startingCurrent) ?? 0;
  }

  // 🔴 There is NO 10% starting voltage-drop limit in BS 7671, and the "Starting:
  // 10% max" line under the "BS 7671 Reference" heading was a fabricated figure
  // used as a hard pass/fail gate (along with an invented 15% warning). Reg
  // 525.203 and Appendix 4 §6.4 NOTE 1 both say a GREATER drop may be accepted
  // for a motor during starting, provided the voltage variations stay within the
  // limits of the relevant product standard or, absent one, the manufacturer's
  // recommendations. The starting drop is therefore reported, not judged.
  notes.push(
    `Starting voltage drop is ${voltageDropStarting.toFixed(1)}%. BS 7671 sets no numeric limit for it: Reg 525.203 allows a greater drop during starting provided the voltage variation stays within the limits of the motor's product standard or the manufacturer's recommendations. Check it against the motor data.`
  );

  const voltageDropCompliant = minimumCableSize !== null && voltageDropRunning <= voltageDropLimit;

  // ── Reg 433.1.1 coordination ──────────────────────────────────────────────
  const finalEntry = tabulated.find((e) => e.size === recommendedCableSize);
  const currentCapacity = finalEntry ? finalEntry.it * totalDerating : 0;

  const inNotLessThanIb = deviceRating >= designCurrent; // 433.1.1(a)
  const inNotGreaterThanIz = currentCapacity > 0 && deviceRating <= currentCapacity; // 433.1.1(b)
  // 433.1.1(c) I2 <= 1.45 Iz. Reg 433.1.201: for a gG fuse to BS 88-2/88-3, a
  // circuit-breaker to BS EN 60898 or BS EN 60947-2, or an RCBO to BS EN 61009-1,
  // compliance with (a) and (b) also gives compliance with (c). Every device this
  // engine selects is in that list.
  const i2WithinOneFourFiveIz = inNotLessThanIb && inNotGreaterThanIz;

  // 🔴 The old test was `In >= Ib && In <= Ib x 1.6`. The 1.6 has no basis: the
  // 1.45 of Reg 433.1.1(c) applies to the cable's Iz and to I2, never to the
  // design current.
  const protectionSuitable = inNotLessThanIb && inNotGreaterThanIz;

  if (!inNotLessThanIb) {
    warnings.push(
      `Reg 433.1.1(a) not satisfied: the ${deviceRating} A device is below the ${designCurrent.toFixed(1)} A design current.`
    );
  }
  if (currentCapacity > 0 && !inNotGreaterThanIz) {
    warnings.push(
      `Reg 433.1.1(b) not satisfied: the ${deviceRating} A device exceeds the cable's ${currentCapacity.toFixed(1)} A current-carrying capacity.`
    );
  }

  // ── The designer's own proposals, previously collected and discarded ───────
  if (inputs.proposedCableSize && inputs.proposedCableSize > 0) {
    const proposed = tabulated.find((e) => e.size === inputs.proposedCableSize);
    if (!proposed) {
      warnings.push(
        `${inputs.proposedCableSize} mm² is not a tabulated size for this cable type and installation method.`
      );
    } else {
      const proposedIz = proposed.it * totalDerating;
      if (proposedIz < deviceRating) {
        warnings.push(
          `Proposed ${inputs.proposedCableSize} mm² gives Iz = ${proposedIz.toFixed(1)} A, below the ${deviceRating} A device rating — Reg 433.1.1(b) not satisfied.`
        );
      } else {
        const proposedVd = vdPercent(inputs.proposedCableSize, fullLoadCurrent);
        notes.push(
          `Proposed ${inputs.proposedCableSize} mm²: Iz = ${proposedIz.toFixed(1)} A${
            proposedVd !== null ? `, running voltage drop ${proposedVd.toFixed(1)}%` : ''
          } — satisfies Reg 433.1.1(b).`
        );
      }
    }
  }

  // ── Section 552 duties ────────────────────────────────────────────────────
  // 🔴 "Motor protection relay recommended for motors >0.37kW" softened a shall
  // into a recommendation, and appeared in the UI under "BS 7671 Recommendations".
  if (inputs.powerKw > 0.37) {
    recommendations.push(
      'Reg 552.1.2: every electric motor rated above 0.37 kW SHALL be provided with control equipment incorporating means of protection against overload of the motor. The only exemption is a motor inside an item of current-using equipment complying as a whole with a British or Harmonized Standard.'
    );
  }
  recommendations.push(
    'Reg 552.1.3: where unexpected restarting might cause danger, means SHALL be provided to prevent automatic restarting after a stoppage due to a drop in voltage or failure of supply — unless failure to start after a brief interruption would itself be likely to cause greater danger.'
  );

  // 🔴 REMOVED: "Consider soft starter or star-delta for motors >11kW (BS 7671
  // recommends reduced starting)". BS 7671 contains no kW threshold for the
  // choice of starting method and makes no recommendation on DOL vs reduced
  // starting. The only motor kW figure in the standard is the 0.37 kW of Reg
  // 552.1.2. What Section 552 does require is below.
  if (inputs.loadType !== 'standard' || inputs.startingMethod === 'direct') {
    recommendations.push(
      'Reg 552.1.1: where the motor is for intermittent duty or frequent starting and stopping, the cumulative effect of the starting and braking currents on the temperature rise of the circuit equipment shall be taken into account — the full-load check alone is not sufficient.'
    );
  }

  // 🔴 The I²t figure below is reported, not tested. BS 7671 sets no I²t limit
  // for motor starting current; the duty it does impose is the cumulative
  // temperature-rise assessment of Reg 552.1.1 above. The adiabatic k for a LIVE
  // conductor comes from Table 43.1, whose body we could not read from any
  // source we hold, so no k²S² comparison is asserted here.
  notes.push(
    `I²t during starting is ${(thermalStress / 1000).toFixed(1)} kA²s. BS 7671 sets no I²t limit for starting current — compare it with the cable manufacturer's short-time withstand and with Reg 552.1.1's cumulative temperature-rise assessment.`
  );

  // 🔴 zsCompliant used to be returned as a hard-coded `true` next to a comment
  // saying a real Zs calculation would be needed. The field is gone; the gap is
  // now stated.
  notes.push(
    'Earth fault loop impedance is not verified by this calculator. Check the measured Zs against the maximum for the device and disconnection time (Reg 411.3.2.2, Tables 41.2 to 41.4).'
  );

  // 🔴 `deviceType.includes('c')` matched the 'c' in "mccb" and the 'c' in
  // "rcbo-b", and told the user to fit a Type D MCB when a BS 88 gG fuse had
  // been selected. Devices are now named from an explicit mapping.
  notes.push(`Protective device: ${deviceLabel(deviceType)}.`);

  if (startingCurrent > 200) {
    warnings.push('High starting current — verify the supply transformer capacity.');
  }

  const bs7671Compliant =
    minimumCableSize !== null &&
    inNotLessThanIb &&
    inNotGreaterThanIz &&
    i2WithinOneFourFiveIz &&
    voltageDropCompliant;

  return {
    fullLoadCurrent,
    startingCurrent,
    startingMultiplier,
    startingKva,

    minimumCableSize,
    recommendedCableSize,
    referenceMethodLabel: methodKey ? (METHOD_LABEL[methodKey] ?? methodKey) : 'Not tabulated',
    currentCarryingCheck: {
      designCurrent,
      deviceRating,
      capacity: currentCapacity,
      inNotLessThanIb,
      inNotGreaterThanIz,
      i2WithinOneFourFiveIz,
      derating: totalDerating,
      deratingBreakdown: { ca, cg, cc },
    },

    voltageDropRunning,
    voltageDropStarting,
    voltageDropLimit,
    voltageDropCompliant,

    recommendedMcbRating: deviceRating,
    protectionSuitable,
    protectionType: deviceType,
    protectionTypeLabel: deviceLabel(deviceType),

    bs7671Compliant,
    thermalStress,

    recommendations,
    warnings,
    notes,
  };
};
