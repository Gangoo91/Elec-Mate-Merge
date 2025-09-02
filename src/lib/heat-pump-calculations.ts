import { 
  INSULATION_LEVELS, 
  AIR_TIGHTNESS_LEVELS, 
  HEAT_PUMP_TYPES, 
  EMITTER_TYPES, 
  DHW_OPTIONS,
  ELECTRICAL_CONSTANTS,
  MCS_REQUIREMENTS
} from './heat-pump-constants';

export interface HeatPumpInputs {
  floorArea: number;
  insulationLevel: keyof typeof INSULATION_LEVELS;
  airTightness: keyof typeof AIR_TIGHTNESS_LEVELS;
  designTemp: number;
  indoorTemp: number;
  heatPumpType: keyof typeof HEAT_PUMP_TYPES;
  emitterType: keyof typeof EMITTER_TYPES;
  dhwOption: keyof typeof DHW_OPTIONS;
  electricityRate: number;
}

export interface HeatPumpResults {
  spaceHeatingLoad: number;
  dhwLoad: number;
  totalHeatLoad: number;
  cop: number;
  electricalPower: number;
  dailyCost: number;
  annualCost: number;
  carbonSavings: number;
  flowTemperature: number;
  sizing: {
    recommended: number;
    oversized: boolean;
    undersized: boolean;
    withinMCS: boolean;
  };
  performance: {
    efficiency: string;
    suitability: string;
    seasonalCOP: number;
  };
}

export function calculateHeatPumpLoad(inputs: HeatPumpInputs): HeatPumpResults {
  const {
    floorArea,
    insulationLevel,
    airTightness,
    designTemp,
    indoorTemp,
    heatPumpType,
    emitterType,
    dhwOption,
    electricityRate
  } = inputs;

  // Base heat loss calculation
  const insulationFactor = INSULATION_LEVELS[insulationLevel].factor;
  const airTightnessMultiplier = AIR_TIGHTNESS_LEVELS[airTightness].multiplier;
  const tempDifference = indoorTemp - designTemp;
  
  // Space heating load (kW)
  const baseHeatLoss = (floorArea * insulationFactor * tempDifference) / 1000;
  const spaceHeatingLoad = baseHeatLoss * airTightnessMultiplier;

  // DHW load
  const dhwLoad = DHW_OPTIONS[dhwOption].load;

  // Total heat load
  const totalHeatLoad = spaceHeatingLoad + dhwLoad;

  // Flow temperature and efficiency adjustments
  const flowTemperature = EMITTER_TYPES[emitterType].flowTemp;
  const emitterEfficiency = EMITTER_TYPES[emitterType].efficiency;
  const adjustedHeatLoad = totalHeatLoad / emitterEfficiency;

  // COP calculation based on heat pump type and flow temperature
  const heatPumpData = HEAT_PUMP_TYPES[heatPumpType];
  let baseCOP = heatPumpData.baseCOP;
  
  // Temperature derating for COP
  const tempDerating = Math.max(0.5, 1 - (5 - designTemp) * heatPumpData.tempDerating);
  
  // Flow temperature derating
  const flowTempDerating = Math.max(0.7, 1 - (flowTemperature - 35) * 0.01);
  
  const cop = baseCOP * tempDerating * flowTempDerating;

  // Electrical power requirement
  const electricalPower = adjustedHeatLoad / cop;

  // Cost calculations
  const dailyCost = electricalPower * ELECTRICAL_CONSTANTS.heatingHoursPerDay * electricityRate;
  const annualCost = dailyCost * ELECTRICAL_CONSTANTS.heatingDaysPerYear;

  // Carbon savings calculation
  const gasCO2 = adjustedHeatLoad * ELECTRICAL_CONSTANTS.heatingHoursPerDay * 
                  ELECTRICAL_CONSTANTS.heatingDaysPerYear * ELECTRICAL_CONSTANTS.gasCO2Factor;
  const electricCO2 = electricalPower * ELECTRICAL_CONSTANTS.heatingHoursPerDay * 
                       ELECTRICAL_CONSTANTS.heatingDaysPerYear * ELECTRICAL_CONSTANTS.electricCO2Factor;
  const carbonSavings = Math.max(0, gasCO2 - electricCO2);

  // Sizing assessment
  const recommendedSize = adjustedHeatLoad * MCS_REQUIREMENTS.designMargin;
  const maxSize = recommendedSize * MCS_REQUIREMENTS.maxOversizing;
  const minSize = recommendedSize * MCS_REQUIREMENTS.minUndersizing;
  
  const sizing = {
    recommended: recommendedSize,
    oversized: electricalPower > maxSize,
    undersized: electricalPower < minSize,
    withinMCS: electricalPower >= minSize && electricalPower <= maxSize
  };

  // Performance assessment
  const seasonalCOP = cop * 0.9; // Approximate seasonal efficiency
  const efficiency = seasonalCOP > 3.5 ? "Excellent" : 
                    seasonalCOP > 3.0 ? "Good" : 
                    seasonalCOP > 2.5 ? "Average" : "Poor";
  
  const suitability = flowTemperature <= 45 ? "Highly Suitable" :
                     flowTemperature <= 55 ? "Suitable" : "Consider System Upgrades";

  const performance = {
    efficiency,
    suitability,
    seasonalCOP
  };

  return {
    spaceHeatingLoad,
    dhwLoad,
    totalHeatLoad,
    cop,
    electricalPower,
    dailyCost,
    annualCost,
    carbonSavings,
    flowTemperature,
    sizing,
    performance
  };
}

export function getRecommendations(inputs: HeatPumpInputs, results: HeatPumpResults): string[] {
  const recommendations: string[] = [];

  // Flow temperature recommendations
  if (results.flowTemperature > 55) {
    recommendations.push("Consider upgrading to low temperature radiators or underfloor heating to improve efficiency");
  }

  // COP recommendations
  if (results.cop < 2.5) {
    recommendations.push("System efficiency is low - consider improving insulation or choosing a different heat pump type");
  }

  // Sizing recommendations
  if (results.sizing.oversized) {
    recommendations.push("Heat pump may be oversized - consider a smaller unit to improve efficiency and reduce costs");
  }
  
  if (results.sizing.undersized) {
    recommendations.push("Heat pump may be undersized - consider backup heating or improve building fabric");
  }

  // Insulation recommendations
  if (inputs.insulationLevel === 'poor') {
    recommendations.push("Significant energy savings possible with improved insulation before heat pump installation");
  }

  // Air tightness recommendations
  if (inputs.airTightness === 'poor') {
    recommendations.push("Improve air tightness with draught proofing to reduce heat pump load and improve comfort");
  }

  // DHW recommendations
  if (inputs.dhwOption === 'none' && results.totalHeatLoad > 8) {
    recommendations.push("Consider integrated DHW solution for larger properties to maximise heat pump benefits");
  }

  return recommendations;
}

export function getRegulatoryGuidance(): string[] {
  return [
    "Heat pumps must be installed by MCS certified installers for RHI eligibility",
    "Building Regulations Part L requires SAP calculations for new installations",
    "Permitted Development allows ASHP installation under 0.6kW without planning permission",
    "Noise limits: 42dB(A) during day, 35dB(A) at night measured at nearest neighbour",
    "GSHP installations may require Environment Agency permits for larger systems",
    "Electrical installation must comply with BS 7671 18th Edition requirements",
    "Annual maintenance required to maintain warranty and MCS certification"
  ];
}