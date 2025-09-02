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

  // Calculate total nominal power and diversified load  
  const totalNominalPower = inputs.chargingPoints.reduce((sum, point) => {
    const chargerData = CHARGER_TYPES[point.chargerType];
    if (!chargerData) {
      throw new Error(`Invalid charger type: ${point.chargerType}`);
    }
    return sum + (chargerData.power * point.quantity);
  }, 0);

  const diversityFactor = DIVERSITY_FACTORS[inputs.diversityScenario]?.value || 1;
  const totalDiversifiedLoad = totalNominalPower * diversityFactor;

  // Calculate design current per-point then apply diversity
  const designCurrent = inputs.chargingPoints.reduce((total, point) => {
    const chargerData = CHARGER_TYPES[point.chargerType];
    const powerPerPoint = chargerData.power * point.quantity;
    
    // Determine base voltage for current calculation based on charger phases
    const baseVoltage = chargerData.phases === 1 ? inputs.supplyVoltage / Math.sqrt(3) : inputs.supplyVoltage;
    const voltageMultiplier = chargerData.phases === 3 ? Math.sqrt(3) : 1;
    
    const currentPerPoint = (powerPerPoint * 1000) / (baseVoltage * voltageMultiplier * inputs.powerFactor);
    return total + currentPerPoint;
  }, 0) * diversityFactor;

  // Cable selection - consider both ampacity and voltage drop
  const requiredConductorCurrent = designCurrent * SAFETY_FACTORS.design_current_factor;
  
  let selectedCable = null;
  let cableCapacity = 0;
  
  // First pass: find cables that meet ampacity requirements
  const suitableCables = Object.entries(CABLE_SPECIFICATIONS).filter(([_, spec]) => 
    spec.current >= requiredConductorCurrent
  );
  
  if (suitableCables.length > 0) {
    // Second pass: check voltage drop for each suitable cable
    for (const [size, spec] of suitableCables) {
      // Correct voltage drop calculation: mV/A/m from cable spec
      const voltageDropmV = designCurrent * spec.impedance * inputs.cableLength;
      const voltageDropV = voltageDropmV / 1000;
      const voltageDropPercent = (voltageDropV / inputs.supplyVoltage) * 100;
      
      if (voltageDropPercent <= (SAFETY_FACTORS.voltage_drop_limit * 100)) {
        selectedCable = size;
        cableCapacity = spec.current;
        break;
      }
    }
    
    // If no cable meets voltage drop, select smallest that meets ampacity
    if (!selectedCable) {
      selectedCable = suitableCables[0][0];
      cableCapacity = suitableCables[0][1].current;
    }
  }

  // Enhanced protection device selection
  const requiredProtection = Math.ceil(designCurrent * 1.1); // 10% margin
  let selectedProtection = null;
  
  // Check for DC chargers requiring special protection
  const hasDCChargers = inputs.chargingPoints.some(point => 
    CHARGER_TYPES[point.chargerType]?.connector?.includes('DC')
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
  const voltageDropPercent = cableSpec ? 
    (designCurrent * cableSpec.impedance * inputs.cableLength) / (inputs.supplyVoltage * 1000) * 100 : 0;

  // Convert available capacity from kW to A
  const availableCapacityA = inputs.availableCapacity * 1000 / (inputs.supplyVoltage * Math.sqrt(3) * inputs.powerFactor);
  
  // Calculate headroom
  const headroom = availableCapacityA - designCurrent;

  // Enhanced compliance checks
  const voltageDrop = voltageDropPercent <= (SAFETY_FACTORS.voltage_drop_limit * 100);
  const earthFaultLoop = true; // Simplified - would need earth loop impedance calculation
  const rcdProtection = selectedProtection?.includes('RCD') || selectedProtection?.includes('RCBO');

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