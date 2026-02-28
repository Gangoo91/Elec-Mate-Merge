import {
  CHARGER_TYPES,
  EARTHING_SYSTEMS,
  CABLE_SPECIFICATIONS,
  PROTECTION_DEVICES,
  DIVERSITY_FACTORS,
  SAFETY_FACTORS,
  CABLE_DERATING,
  DNO_THRESHOLDS,
} from './ev-constants';

export interface ChargingPoint {
  chargerType: string;
  quantity: number;
}

export interface CalculationInputs {
  chargingPoints: ChargingPoint[];
  supplyVoltage: number;
  earthingSystem: string;
  availableCapacity: number;
  cableLength: number;
  diversityScenario: string;
  powerFactor: number;
  ambientTemp?: number;
  thermalInsulation?: string;
  groupedCircuits?: number;
}

export interface CalculationResult {
  totalNominalPower: number;
  totalDiversifiedLoad: number;
  designCurrent: number;
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
  voltageDropPercent: number;
  headroom: number;
  pmeWarning: boolean;
  dnoGuidance: string;
  compliance: {
    voltageDrop: boolean;
    earthFaultLoop: boolean;
    rcdProtection: boolean;
  };
  recommendations: string[];
}

function generateRecommendations(compliance: {
  voltageDrop: boolean;
  earthFaultLoop: boolean;
  rcdProtection: boolean;
  cableSelected: boolean;
}): string[] {
  const recommendations: string[] = [];

  if (!compliance.voltageDrop) {
    recommendations.push('Consider larger cable size to reduce voltage drop');
  }

  if (!compliance.earthFaultLoop) {
    recommendations.push(
      'Earth fault loop impedance may be too high - verify earthing arrangement'
    );
  }

  if (!compliance.rcdProtection) {
    recommendations.push('Ensure RCD protection is correctly specified for EV charging');
  }

  if (!compliance.cableSelected) {
    recommendations.push('No suitable cable found - may require specialist design');
  }

  if (recommendations.length === 0) {
    recommendations.push('Installation appears to meet BS 7671 requirements');
  }

  return recommendations;
}

export function calculateEVSELoad(inputs: CalculationInputs): CalculationResult {
  // Get earthing system data
  const earthingData = EARTHING_SYSTEMS[inputs.earthingSystem];
  if (!earthingData) {
    throw new Error(`Invalid earthing system: ${inputs.earthingSystem}`);
  }

  // Calculate total nominal power and diversified load
  const totalNominalPower = inputs.chargingPoints.reduce((sum, point) => {
    const chargerData = CHARGER_TYPES[point.chargerType];
    if (!chargerData) {
      throw new Error(`Invalid charger type: ${point.chargerType}`);
    }
    return sum + chargerData.power * point.quantity;
  }, 0);

  const diversityFactor = DIVERSITY_FACTORS[inputs.diversityScenario]?.value || 1;
  const totalDiversifiedLoad = totalNominalPower * diversityFactor;

  // Calculate design current per-point then apply diversity
  const designCurrent =
    inputs.chargingPoints.reduce((total, point) => {
      const chargerData = CHARGER_TYPES[point.chargerType];
      const powerPerPoint = chargerData.power * point.quantity;

      // BS 7671: I = P / (U × √3 × PF) for 3-phase, I = P / (U × PF) for single-phase
      const voltageMultiplier = chargerData.phases === 3 ? Math.sqrt(3) : 1;
      const currentPerPoint =
        (powerPerPoint * 1000) / (inputs.supplyVoltage * voltageMultiplier * inputs.powerFactor);

      return total + currentPerPoint;
    }, 0) * diversityFactor;

  // Cable derating factors (BS 7671 Appendix 4)
  const ambientKey = (inputs.ambientTemp ?? 30) as keyof typeof CABLE_DERATING.ambientTemp;
  const ca = CABLE_DERATING.ambientTemp[ambientKey]?.factor ?? 1.0;
  const ciKey = (inputs.thermalInsulation ??
    'none') as keyof typeof CABLE_DERATING.thermalInsulation;
  const ci = CABLE_DERATING.thermalInsulation[ciKey]?.factor ?? 1.0;
  const cgKey = Math.min(inputs.groupedCircuits ?? 1, 6) as keyof typeof CABLE_DERATING.grouping;
  const cg = CABLE_DERATING.grouping[cgKey]?.factor ?? 1.0;
  const combinedDerating = ca * ci * cg;

  // Cable selection - consider both ampacity (derated) and voltage drop
  const requiredConductorCurrent = designCurrent * SAFETY_FACTORS.design_current_factor;
  // Cable tabulated rating must satisfy: It ≥ In / (Ca × Ci × Cg)
  const requiredTabulatedCurrent = requiredConductorCurrent / combinedDerating;

  let selectedCable = null;
  let cableCapacity = 0;
  let deratedCapacity = 0;

  // First pass: find cables that meet derated ampacity requirements
  const suitableCables = Object.entries(CABLE_SPECIFICATIONS).filter(
    ([_, spec]) => spec.current >= requiredTabulatedCurrent
  );

  if (suitableCables.length > 0) {
    // Second pass: check voltage drop for each suitable cable
    for (const [size, spec] of suitableCables) {
      // Correct voltage drop calculation: mV/A/m from cable spec
      const voltageDropmV = designCurrent * spec.impedance * inputs.cableLength;
      const voltageDropV = voltageDropmV / 1000;
      const voltageDropPercent = (voltageDropV / inputs.supplyVoltage) * 100;

      if (voltageDropPercent <= SAFETY_FACTORS.voltage_drop_limit * 100) {
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

  // Enhanced protection device selection
  const requiredProtection = Math.ceil(designCurrent * 1.1); // 10% margin
  let selectedProtection = null;

  // Check for DC chargers requiring special protection
  // Match on charger type key containing 'dc' (connector strings are 'CCS/CHAdeMO', 'CCS')
  const hasDCChargers = inputs.chargingPoints.some((point) =>
    point.chargerType.toLowerCase().includes('dc')
  );

  if (hasDCChargers || requiredProtection > 63) {
    selectedProtection = 'DC Fault Protection Required + Type B RCD';
  } else if (requiredProtection <= 32) {
    selectedProtection = 'RCBO (Combined MCB + RCD) Type A 30mA';
  } else {
    selectedProtection = 'MCB + Type A RCD 30mA';
  }

  // Final voltage drop calculation using selected cable
  const cableSpec = selectedCable ? CABLE_SPECIFICATIONS[selectedCable] : null;
  const voltageDropPercent = cableSpec
    ? ((designCurrent * cableSpec.impedance * inputs.cableLength) / (inputs.supplyVoltage * 1000)) *
      100
    : 0;

  // Convert available capacity from kW to A
  const availableCapacityA =
    (inputs.availableCapacity * 1000) / (inputs.supplyVoltage * Math.sqrt(3) * inputs.powerFactor);

  // Calculate headroom
  const headroom = availableCapacityA - designCurrent;

  // Earth fault loop impedance calculation
  // Zs = Ze + cable impedance contribution (both line and CPC)
  // Cable impedance uses mΩ/A/m from spec — for Zs we need (R1+R2)/m × length
  // Approximation: R1+R2 ≈ impedance × 2 (line + CPC of same size) × length / 1000
  const estimatedZe = earthingData.label.includes('TT') ? 5.0 : 0.35;
  const cableR1R2 = cableSpec ? (cableSpec.impedance * 2 * inputs.cableLength) / 1000 : 0;
  const actualZs = estimatedZe + cableR1R2;
  const earthFaultLoop = actualZs <= earthingData.zs_max;

  // PME/PEN fault warning — Reg 722.411.4.1
  // Outdoor EV charge points on TN-C-S (PME) supplies require additional earth electrode
  const pmeWarning = inputs.earthingSystem === 'tn-c-s';

  // DNO notification guidance
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
  const rcdProtection = selectedProtection?.includes('RCD') || selectedProtection?.includes('RCBO');

  return {
    totalNominalPower,
    totalDiversifiedLoad,
    designCurrent,
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
    voltageDropPercent,
    headroom,
    pmeWarning,
    dnoGuidance,
    recommendations: generateRecommendations({
      voltageDrop,
      earthFaultLoop,
      rcdProtection: !!rcdProtection,
      cableSelected: !!selectedCable,
    }),
    compliance: {
      voltageDrop,
      earthFaultLoop,
      rcdProtection: !!rcdProtection,
    },
  };
}
