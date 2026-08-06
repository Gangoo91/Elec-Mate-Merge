import {
  CHARGER_TYPES,
  EARTHING_SYSTEMS,
  CABLE_SPECIFICATIONS,
  DIVERSITY_FACTORS,
  SAFETY_FACTORS,
  DNO_THRESHOLDS,
  RDC_DD,
  LOAD_CURTAILMENT_NOTE,
  getTemperatureFactor,
  getGroupingFactor,
  getThermalInsulationFactor,
} from './ev-constants';
import { standardDeviceRatings } from './calculators/bs7671-data/protectiveDevices';
import { getMcbZsLimit, getRcdZsLimit } from '@/data/zsLimits';

export interface ChargingPoint {
  chargerType: string;
  quantity: number;
}

export interface CalculationInputs {
  chargingPoints: ChargingPoint[];
  /** Nominal supply voltage: 230 V single-phase or 400 V three-phase. */
  supplyVoltage: number;
  /** Number of phases of the supply the cable being sized runs on. */
  supplyPhases?: 1 | 3;
  earthingSystem: string;
  availableCapacity: number;
  cableLength: number;
  diversityScenario: string;
  powerFactor: number;
  ambientTemp?: number;
  /**
   * Length in mm over which the cable is TOTALLY surrounded by thermal
   * insulation (Appendix 4 s2.6). 0 = not in insulation.
   */
  thermalInsulationLengthMm?: number;
  groupedCircuits?: number;
}

export interface CalculationResult {
  totalNominalPower: number;
  totalDiversifiedLoad: number;
  designCurrent: number;
  /** In — rated current of the protective device (Reg 433.1.1(a)). */
  protectiveDeviceRating: number | null;
  selectedCable: string | null;
  cableCapacity: number;
  deratedCapacity: number;
  deratingFactors: {
    ca: number;
    ci: number;
    cg: number;
    combined: number;
  };
  selectedProtection: string | null;
  dcFaultProtectionRequired: boolean;
  voltageDropPercent: number;
  headroom: number;
  pmeWarning: boolean;
  dnoGuidance: string;
  /** Ze + (R1+R2), or null where Ze cannot be assumed (TT). */
  estimatedZs: number | null;
  /** Max Zs from BS 7671 Tables 41.3 / 41.5 for the selected device. */
  maxZs: number | null;
  zsBasis: string;
  diversityRequiresCurtailment: boolean;
  compliance: {
    voltageDrop: boolean;
    /** null = not assessable from the inputs given. */
    earthFaultLoop: boolean | null;
    rcdProtection: boolean;
    /** Reg 433.1.1 Ib ≤ In ≤ Iz. */
    overloadCoordination: boolean;
  };
  recommendations: string[];
}

function generateRecommendations(state: {
  voltageDrop: boolean;
  earthFaultLoop: boolean | null;
  rcdProtection: boolean;
  overloadCoordination: boolean;
  cableSelected: boolean;
  dcFaultProtectionRequired: boolean;
  diversityRequiresCurtailment: boolean;
  zsBasis: string;
}): string[] {
  const recommendations: string[] = [];

  if (!state.voltageDrop) {
    recommendations.push('Consider larger cable size to reduce voltage drop');
  }

  if (!state.overloadCoordination) {
    recommendations.push(
      'Reg 433.1.1 not satisfied — no standard device rating gives Ib ≤ In ≤ Iz with this cable'
    );
  }

  if (state.earthFaultLoop === false) {
    recommendations.push(
      'Estimated Zs exceeds the BS 7671 limit for the selected device — increase cpc size, shorten the run, or rely on RCD fault protection (Table 41.5)'
    );
  } else if (state.earthFaultLoop === null) {
    recommendations.push(state.zsBasis);
  }

  if (!state.rcdProtection) {
    recommendations.push('Ensure RCD protection is correctly specified for EV charging');
  }

  if (state.dcFaultProtectionRequired) {
    recommendations.push(`${RDC_DD.regulation} — ${RDC_DD.note}`);
  }

  if (!state.cableSelected) {
    recommendations.push('No suitable cable found - may require specialist design');
  }

  if (state.diversityRequiresCurtailment) {
    recommendations.push(LOAD_CURTAILMENT_NOTE);
  }

  if (recommendations.length === 0) {
    recommendations.push('Installation appears to meet BS 7671 requirements');
  }

  return recommendations;
}

/**
 * Reg 433.1.1(a): In must be not less than Ib. Pick the smallest standard
 * rating that satisfies it.
 */
function selectDeviceRating(designCurrent: number): number | null {
  return standardDeviceRatings.rcbo.find((r) => r >= designCurrent) ?? null;
}

export function calculateEVSELoad(inputs: CalculationInputs): CalculationResult {
  // Get earthing system data
  const earthingData = EARTHING_SYSTEMS[inputs.earthingSystem as keyof typeof EARTHING_SYSTEMS];
  if (!earthingData) {
    throw new Error(`Invalid earthing system: ${inputs.earthingSystem}`);
  }

  // Calculate total nominal power and diversified load
  const totalNominalPower = inputs.chargingPoints.reduce((sum, point) => {
    const chargerData = CHARGER_TYPES[point.chargerType as keyof typeof CHARGER_TYPES];
    if (!chargerData) {
      throw new Error(`Invalid charger type: ${point.chargerType}`);
    }
    return sum + chargerData.power * point.quantity;
  }, 0);

  const diversityEntry =
    DIVERSITY_FACTORS[inputs.diversityScenario as keyof typeof DIVERSITY_FACTORS];
  const diversityFactor = diversityEntry?.value ?? 1;
  const totalDiversifiedLoad = totalNominalPower * diversityFactor;
  // Reg 311.1 permits diversity generally and Reg 722.311.201 adds load
  // curtailment as something that may be counted. BS 7671 publishes NO diversity
  // table for EV charge points, so any factor below 1.0 is a trade planning
  // figure that the designer has to justify — flag it rather than present it as
  // a Regulations requirement.
  const diversityRequiresCurtailment = !!diversityEntry?.requiresLoadCurtailment;

  // Calculate design current per-point then apply diversity
  const designCurrent =
    inputs.chargingPoints.reduce((total, point) => {
      const chargerData = CHARGER_TYPES[point.chargerType as keyof typeof CHARGER_TYPES];
      const powerPerPoint = chargerData.power * point.quantity;

      // BS 7671: I = P / (U × √3 × PF) for 3-phase, I = P / (U × PF) for single-phase.
      //
      // 🔴 U MUST BE THE CHARGE POINT'S OWN VOLTAGE, NOT THE SUPPLY VOLTAGE.
      // This divided by `inputs.supplyVoltage`, which the UI defaulted to 415 V.
      // A single-phase charge point takes the multiplier 1, so a 7 kW unit was
      // computed as 7000/415 ≈ 17 A instead of 7000/230 ≈ 30 A — a 42%
      // under-statement, which under-sizes both the cable and the protective
      // device on the single most common domestic EV install there is.
      // CHARGER_TYPES already stores the right figure per charger (230 V single
      // phase, 400 V three phase); the engine simply was not reading it.
      const pointVoltage = chargerData.voltage ?? inputs.supplyVoltage;
      const voltageMultiplier = chargerData.phases === 3 ? Math.sqrt(3) : 1;
      const currentPerPoint =
        (powerPerPoint * 1000) / (pointVoltage * voltageMultiplier * inputs.powerFactor);

      return total + currentPerPoint;
    }, 0) * diversityFactor;

  // Cable derating factors — BS 7671 Appendix 4, from the shared bs7671-data
  // module. The inline three-factor copies this file used to read were
  // truncated (Ca stopped at 50 °C with `?? 1.0` above it, Cg was clamped at
  // 6 circuits with Math.min) and the Ci set cited Table 52.2, which is
  // maximum operating temperature and nothing to do with derating.
  const ca = getTemperatureFactor(inputs.ambientTemp ?? 30, '70C');
  const ci = getThermalInsulationFactor(inputs.thermalInsulationLengthMm ?? 0);
  const cg = getGroupingFactor(inputs.groupedCircuits ?? 1, 'bunched');
  const combinedDerating = ca * ci * cg;

  // Reg 433.1.1 — coordination between conductor and overload protective device:
  //   (a) Ib ≤ In
  //   (b) In ≤ Iz
  //   (c) I2 ≤ 1.45 Iz  — Reg 433.1.201: for a BS EN 60898 circuit-breaker or a
  //       BS EN 61009-1 RCBO, satisfying (a) and (b) also satisfies (c).
  //
  // The old code multiplied the design current by 1.25 ("125% of design current
  // for cable sizing"). There is no such multiplier in BS 7671 — that is
  // NEC 625.41. It also never determined In at all, so condition (b) was never
  // checked against the cable it had just chosen.
  const protectiveDeviceRating = selectDeviceRating(designCurrent);
  const requiredTabulatedCurrent =
    protectiveDeviceRating === null
      ? Number.POSITIVE_INFINITY
      : combinedDerating > 0
        ? protectiveDeviceRating / combinedDerating
        : Number.POSITIVE_INFINITY;

  // Voltage drop is referenced to the nominal voltage of the circuit being
  // sized: Uo = 230 V single-phase, or the 400 V line voltage three-phase
  // (Appendix 4 s6 — the tabulated three-phase mV/A/m relate to line voltage).
  const supplyPhases: 1 | 3 = inputs.supplyPhases ?? (inputs.supplyVoltage >= 300 ? 3 : 1);
  const referenceVoltage = inputs.supplyVoltage;

  let selectedCable: string | null = null;
  let cableCapacity = 0;
  let deratedCapacity = 0;

  // First pass: find cables that meet derated ampacity requirements (Reg 433.1.1(b))
  const suitableCables = Object.entries(CABLE_SPECIFICATIONS).filter(
    ([, spec]) => spec.current >= requiredTabulatedCurrent
  );

  if (suitableCables.length > 0) {
    // Second pass: check voltage drop for each suitable cable
    for (const [size, spec] of suitableCables) {
      const voltageDropmV = designCurrent * spec.impedance * inputs.cableLength;
      const voltageDropV = voltageDropmV / 1000;
      const dropPercent = (voltageDropV / referenceVoltage) * 100;

      if (dropPercent <= SAFETY_FACTORS.voltage_drop_limit * 100) {
        selectedCable = size;
        cableCapacity = spec.current;
        deratedCapacity = cableCapacity * combinedDerating;
        break;
      }
    }

    // If no cable meets voltage drop, select smallest that meets ampacity
    if (!selectedCable) {
      selectedCable = suitableCables[0][0];
      cableCapacity = suitableCables[0][1].current;
      deratedCapacity = cableCapacity * combinedDerating;
    }
  }

  // Reg 433.1.1: Ib ≤ In ≤ Iz, with Iz the DERATED capacity of the chosen cable.
  const overloadCoordination =
    protectiveDeviceRating !== null &&
    designCurrent <= protectiveDeviceRating &&
    deratedCapacity >= protectiveDeviceRating;

  // ── Protection ──────────────────────────────────────────────────────────
  //
  // 🔴 CORRECTED. This used to fire "DC Fault Protection Required + Type B RCD"
  // when the charger type string contained "dc", and gave a bare Type A RCBO to
  // everything else. That is backwards.
  //
  // BS 7671:2018+A4:2026 Appendix 1 lists BS IEC 62955:2018 as "Residual direct
  // current detecting device (RDC-DD) to be used for MODE 3 charging of electric
  // vehicles", referenced against Table 537.4 and Reg 722.531.3.101(b) and (c);
  // the index reads "RDC-DD … 722.531.3.101 selection and erection" under
  // 722.531.3 RCDs. Mode 3 is AC conductive charging through dedicated EVSE — so
  // it is the 7 kW AC home charge point that needs DC fault-current detection in
  // addition to its 30 mA RCD, unless the charging equipment provides it.
  const hasModeThreePoints = inputs.chargingPoints.some((point) => {
    const chargerData = CHARGER_TYPES[point.chargerType as keyof typeof CHARGER_TYPES];
    return chargerData?.chargingMode === 3;
  });
  const dcFaultProtectionRequired = hasModeThreePoints;

  const ratingText = protectiveDeviceRating !== null ? `${protectiveDeviceRating} A ` : '';
  const selectedProtection =
    `${ratingText}RCBO, 30 mA Type A RCD` +
    (dcFaultProtectionRequired
      ? ' + DC fault protection (Type B RCD, or Type A/F with an RDC-DD to BS IEC 62955) unless provided by the EVSE'
      : '');

  // Final voltage drop calculation using selected cable
  const cableSpec = selectedCable
    ? CABLE_SPECIFICATIONS[selectedCable as keyof typeof CABLE_SPECIFICATIONS]
    : null;
  const voltageDropPercent = cableSpec
    ? ((designCurrent * cableSpec.impedance * inputs.cableLength) / (referenceVoltage * 1000)) * 100
    : 0;

  // Convert available capacity from kW to A.
  // 🔴 This unconditionally applied √3, inflating the available amps by 73% on a
  // single-phase supply. P = √3 · U_line · I · PF three-phase, P = Uo · I · PF
  // single-phase (BS 7671 nominal 230 V single-phase / 400 V three-phase).
  const availableCapacityA =
    (inputs.availableCapacity * 1000) /
    (inputs.supplyVoltage * (supplyPhases === 3 ? Math.sqrt(3) : 1) * inputs.powerFactor);

  const headroom = availableCapacityA - designCurrent;

  // ── Earth fault loop impedance ──────────────────────────────────────────
  //
  // 🔴 REWRITTEN. The old check was `Ze + R1R2 <= earthingData.zs_max` with
  // zs_max = 0.35 for TN-C-S and Ze hard-coded to 0.35 — mathematically
  // incapable of passing, and it was comparing against the wrong quantity
  // anyway. 0.35 Ω (PME) and 0.8 Ω (TN-S) are the distributor's maximum
  // DECLARED EXTERNAL loop impedance Ze, not a maximum Zs; maximum Zs is device
  // and disconnection-time dependent (Tables 41.2–41.4, or Table 41.5 where an
  // RCD provides fault protection). The canonical source is src/data/zsLimits.ts.
  //
  // R1+R2: CABLE_SPECIFICATIONS.impedance is ALREADY a two-conductor loop value
  // (2 × the BS EN 60228 20 °C conductor resistance), so the old `× 2` gave
  // roughly 4 × r20 — about twice the true R1+R2 even for equal-sized
  // conductors. The ×2 is removed.
  //
  // ⚠️ The estimate still assumes cpc = line CSA and 20 °C conductors. Real
  // twin-and-earth carries a reduced cpc and Reg 411.4.201 NOTE 2 assumes the
  // line conductor at its Table 52.2 operating temperature, so the true Zs is
  // higher. It is reported as indicative and must be verified by measurement.
  const r1r2 = cableSpec ? (cableSpec.impedance * inputs.cableLength) / 1000 : 0;
  const isTT = inputs.earthingSystem === 'tt';
  const assumedZe = earthingData.ze_declared_max;
  const estimatedZs = assumedZe !== undefined ? assumedZe + r1r2 : null;

  const zsLimit = isTT
    ? getRcdZsLimit(30)
    : protectiveDeviceRating !== null
      ? getMcbZsLimit('typeB', protectiveDeviceRating, '0.4s')
      : null;
  const maxZs = zsLimit?.maxZs ?? null;

  let zsBasis: string;
  let earthFaultLoop: boolean | null;
  if (isTT) {
    // Table 41.5 (Reg 411.5.3): max Zs for a 30 mA RCD at Uo 230 V is 1667 Ω.
    // Ra cannot be assumed — it must be measured. Table 41.5 NOTE 2 / Reg 542.2.4:
    // an electrode above 200 Ω may not be stable.
    zsBasis =
      'TT — Ra must be measured on site. BS 7671 Table 41.5 gives max Zs = 1667 Ω for a 30 mA RCD at Uo 230 V; Table 41.5 NOTE 2 warns an electrode above 200 Ω may not be stable (Reg 542.2.4).';
    earthFaultLoop = null;
  } else if (estimatedZs === null || maxZs === null) {
    zsBasis =
      'Zs not assessed — confirm Ze with the distributor or by measurement and compare against BS 7671 Tables 41.2 to 41.5 for the device actually installed.';
    earthFaultLoop = null;
  } else {
    zsBasis = `Ze assumed at the distributor's declared maximum ${assumedZe} Ω plus R1+R2 ${r1r2.toFixed(2)} Ω; limit ${maxZs} Ω from ${zsLimit?.source}. Indicative only — verify by measurement.`;
    earthFaultLoop = estimatedZs <= maxZs;
  }

  // PME/PEN fault warning — Reg 722.411.4.1
  // Outdoor EV charge points on TN-C-S (PME) supplies require additional earth electrode
  const pmeWarning = inputs.earthingSystem === 'tn-c-s';

  // DNO notification guidance (ENA Engineering Recommendations, not BS 7671)
  let dnoGuidance: string;
  if (totalDiversifiedLoad <= DNO_THRESHOLDS.noNotification) {
    dnoGuidance = 'No DNO notification required for single point up to 3.68 kW';
  } else if (totalDiversifiedLoad <= DNO_THRESHOLDS.connectAndNotify) {
    dnoGuidance = 'DNO notification required (connect and notify)';
  } else if (totalDiversifiedLoad <= DNO_THRESHOLDS.fullApplication) {
    dnoGuidance = 'Formal DNO application required before installation';
  } else if (totalDiversifiedLoad <= DNO_THRESHOLDS.supplyUpgrade) {
    dnoGuidance = 'DNO application required — likely needs supply upgrade assessment';
  } else {
    dnoGuidance = 'DNO application essential — supply upgrade almost certainly required';
  }

  // Compliance checks
  const voltageDrop = voltageDropPercent <= SAFETY_FACTORS.voltage_drop_limit * 100;
  const rcdProtection = selectedProtection.includes('RCD') || selectedProtection.includes('RCBO');

  return {
    totalNominalPower,
    totalDiversifiedLoad,
    designCurrent,
    protectiveDeviceRating,
    selectedCable,
    cableCapacity,
    deratedCapacity,
    deratingFactors: {
      ca,
      ci,
      cg,
      combined: combinedDerating,
    },
    selectedProtection,
    dcFaultProtectionRequired,
    voltageDropPercent,
    headroom,
    pmeWarning,
    dnoGuidance,
    estimatedZs,
    maxZs,
    zsBasis,
    diversityRequiresCurtailment,
    recommendations: generateRecommendations({
      voltageDrop,
      earthFaultLoop,
      rcdProtection,
      overloadCoordination,
      cableSelected: !!selectedCable,
      dcFaultProtectionRequired,
      diversityRequiresCurtailment,
      zsBasis,
    }),
    compliance: {
      voltageDrop,
      earthFaultLoop,
      rcdProtection,
      overloadCoordination,
    },
  };
}
