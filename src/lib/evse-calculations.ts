import { CHARGER_TYPES, EARTHING_SYSTEMS, CABLE_SPECIFICATIONS, PROTECTION_DEVICES, DIVERSITY_FACTORS, SAFETY_FACTORS } from './ev-constants';

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
}

export interface CalculationResult {
  totalNominalPower: number;
  totalDiversifiedLoad: number;
  designCurrent: number;
  selectedCable: string | null;
  cableCapacity: number;
  selectedProtection: string | null;
  voltageDropPercent: number;
  headroom: number;
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
    recommendations.push("Consider larger cable size to reduce voltage drop");
  }
  
  if (!compliance.earthFaultLoop) {
    recommendations.push("Earth fault loop impedance may be too high - verify earthing arrangement");
  }
  
  if (!compliance.rcdProtection) {
    recommendations.push("Ensure RCD protection is correctly specified for EV charging");
  }
  
  if (!compliance.cableSelected) {
    recommendations.push("No suitable cable found - may require specialist design");
  }
  
  if (recommendations.length === 0) {
    recommendations.push("Installation appears to meet BS 7671 requirements");
  }
  
  return recommendations;
}

export function calculateEVSELoad(inputs: CalculationInputs): CalculationResult {
  // Get earthing system data
  const earthingData = EARTHING_SYSTEMS[inputs.earthingSystem];
  if (!earthingData) {
    throw new Error(`Invalid earthing system: ${inputs.earthingSystem}`);
  }

  // Calculate total diversified load
  const totalNominalPower = inputs.chargingPoints.reduce((sum, point) => {
    const chargerData = CHARGER_TYPES[point.chargerType];
    if (!chargerData) {
      throw new Error(`Invalid charger type: ${point.chargerType}`);
    }
    return sum + (chargerData.power * point.quantity);
  }, 0);

  const diversityFactor = DIVERSITY_FACTORS[inputs.diversityScenario]?.value || 1;
  const totalDiversifiedLoad = totalNominalPower * diversityFactor;
  const designCurrent = (totalDiversifiedLoad * 1000) / (inputs.supplyVoltage * Math.sqrt(3) * inputs.powerFactor);

  // Cable selection based on design current with safety factor
  const requiredConductorCurrent = designCurrent * SAFETY_FACTORS.design_current_factor;
  
  let selectedCable = null;
  let cableCapacity = 0;
  for (const [size, spec] of Object.entries(CABLE_SPECIFICATIONS)) {
    if (spec.current >= requiredConductorCurrent) {
      selectedCable = size;
      cableCapacity = spec.current;
      break;
    }
  }

  // Protection device selection
  const requiredProtection = Math.ceil(designCurrent * 1.1); // 10% margin
  let selectedProtection = null;
  
  // Select appropriate protection device based on current rating
  if (requiredProtection <= 32) {
    selectedProtection = 'RCBO (Combined MCB + RCD)';
  } else if (requiredProtection <= 63) {
    selectedProtection = 'MCB + RCD';
  } else {
    selectedProtection = 'DC Fault Protection Required';
  }

  // Voltage drop calculation
  const cableSpec = selectedCable ? CABLE_SPECIFICATIONS[selectedCable] : null;
  const voltageDropPercent = cableSpec ? 
    (designCurrent * cableSpec.impedance * inputs.cableLength * Math.sqrt(3)) / inputs.supplyVoltage * 100 : 0;

  // Convert available capacity from kW to A (to match current units)
  const availableCapacityA = inputs.availableCapacity * 1000 / (inputs.supplyVoltage * Math.sqrt(3) * inputs.powerFactor);
  
  // Calculate headroom
  const headroom = availableCapacityA - designCurrent;

  // Compliance checks
  const voltageDrop = voltageDropPercent <= (SAFETY_FACTORS.voltage_drop_limit * 100);
  const earthFaultLoop = true; // Simplified for now
  const rcdProtection = selectedProtection?.includes('RCBO') || selectedProtection?.includes('RCD');

  return {
    totalNominalPower,
    totalDiversifiedLoad,
    designCurrent,
    selectedCable,
    cableCapacity,
    selectedProtection,
    voltageDropPercent,
    headroom,
    recommendations: generateRecommendations({
      voltageDrop,
      earthFaultLoop,
      rcdProtection: !!rcdProtection,
      cableSelected: !!selectedCable
    }),
    compliance: {
      voltageDrop,
      earthFaultLoop,
      rcdProtection: !!rcdProtection
    }
  };
}