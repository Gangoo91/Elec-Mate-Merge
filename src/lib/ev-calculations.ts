import { CHARGER_TYPES, CABLE_SPECIFICATIONS, SAFETY_FACTORS, EARTHING_SYSTEMS } from './ev-constants';

export interface EVCalculationInputs {
  batteryCapacity: number;
  chargerType: keyof typeof CHARGER_TYPES;
  currentCharge: number;
  targetCharge: number;
  electricityRate: number;
  diversityFactor: number;
  supplyType: keyof typeof EARTHING_SYSTEMS;
  runLength: number;
  ambientTemp: number;
  installationLocation: string;
  existingLoadCurrent: number;
}

export interface EVCalculationResults {
  energyRequired: number;
  chargingTime: number;
  cost: number;
  peakDemand: number;
  designCurrent: number;
  circuitCurrent: number;
  recommendedCable: string;
  cableSize: string;
  voltageDrop: number;
  earthFaultLoopImpedance: number;
  protectionRequired: string;
  installationCompliant: boolean;
  maxZs: number;
  actualZs: number;
  recommendations: string[];
  warnings: string[];
  reviewFindings: {
    loadAnalysis: string;
    cableAssessment: string;
    protectionCompliance: string;
    installationRequirements: string;
  };
}

export function calculateEVCharging(inputs: EVCalculationInputs): EVCalculationResults {
  const charger = CHARGER_TYPES[inputs.chargerType];
  const earthingSystem = EARTHING_SYSTEMS[inputs.supplyType];
  
  // Basic energy calculations
  const chargeNeeded = inputs.targetCharge - inputs.currentCharge;
  const energyRequired = (inputs.batteryCapacity * chargeNeeded) / 100;
  
  // Charging time with efficiency consideration
  const effectivePower = charger.power * charger.efficiency;
  const chargingTime = energyRequired / effectivePower;
  
  // Cost calculation
  const cost = energyRequired * inputs.electricityRate;
  
  // Electrical load calculations
  const peakDemand = charger.power / charger.efficiency;
  const designCurrent = (peakDemand * 1000) / (charger.voltage * (charger.phases === 3 ? Math.sqrt(3) : 1));
  const circuitCurrent = designCurrent * SAFETY_FACTORS.design_current_factor * inputs.diversityFactor;
  
  // Temperature derating
  const tempFactor = inputs.ambientTemp <= 30 ? 1.0 : 
                    inputs.ambientTemp <= 35 ? 0.94 : 0.87;
  const deratedCurrent = circuitCurrent / tempFactor;
  
  // Cable sizing
  const cableSelection = selectCable(deratedCurrent);
  
  // Voltage drop calculation
  const voltageDrop = calculateVoltageDrop(
    designCurrent, 
    inputs.runLength, 
    cableSelection.impedance, 
    charger.phases
  );
  
  // Earth fault loop impedance
  const cableImpedance = (cableSelection.impedance * inputs.runLength) / 1000;
  const estimatedZe = earthingSystem.label.includes('TT') ? 5.0 : 0.35; // Typical values
  const actualZs = estimatedZe + cableImpedance;
  
  // Compliance checks
  const voltageDrop_percent = (voltageDrop / charger.voltage) * 100;
  const voltageDropCompliant = voltageDrop_percent <= (SAFETY_FACTORS.voltage_drop_limit * 100);
  const zsCompliant = actualZs <= earthingSystem.zs_max;
  const installationCompliant = voltageDropCompliant && zsCompliant && cableSelection.current >= deratedCurrent;
  
  // Generate recommendations and warnings
  const { recommendations, warnings } = generateRecommendations(inputs, {
    voltageDrop_percent,
    voltageDropCompliant,
    zsCompliant,
    installationCompliant,
    cableSelection,
    deratedCurrent,
    actualZs,
    charger
  });
  
  // Review findings
  const reviewFindings = generateReviewFindings(inputs, {
    peakDemand,
    circuitCurrent,
    cableSelection,
    voltageDrop_percent,
    actualZs,
    installationCompliant
  });
  
  return {
    energyRequired,
    chargingTime,
    cost,
    peakDemand,
    designCurrent,
    circuitCurrent: deratedCurrent,
    recommendedCable: cableSelection.label,
    cableSize: cableSelection.label,
    voltageDrop,
    earthFaultLoopImpedance: actualZs,
    protectionRequired: getProtectionRequirements(inputs.chargerType, charger.power),
    installationCompliant,
    maxZs: earthingSystem.zs_max,
    actualZs,
    recommendations,
    warnings,
    reviewFindings
  };
}

function selectCable(current: number) {
  const cables = Object.entries(CABLE_SPECIFICATIONS);
  
  for (const [size, spec] of cables) {
    if (spec.current >= current) {
      return { ...spec, size };
    }
  }
  
  // Return largest cable if none suitable
  const largest = cables[cables.length - 1][1];
  return { ...largest, size: cables[cables.length - 1][0] };
}

function calculateVoltageDrop(current: number, length: number, impedance: number, phases: number): number {
  if (phases === 3) {
    return (Math.sqrt(3) * current * length * impedance) / 1000;
  } else {
    return (2 * current * length * impedance) / 1000;
  }
}

function getProtectionRequirements(chargerType: string, power: number): string {
  if (chargerType.includes('dc')) {
    return 'MCB + Type B RCD + DC Fault Protection';
  } else if (power > 7) {
    return 'RCBO Type A (30mA) + DC Fault Detection';
  } else {
    return 'RCBO Type A (30mA)';
  }
}

function generateRecommendations(
  inputs: EVCalculationInputs, 
  analysis: any
): { recommendations: string[]; warnings: string[] } {
  const recommendations: string[] = [];
  const warnings: string[] = [];
  
  // Cable recommendations
  if (analysis.cableSelection.current < analysis.deratedCurrent * 1.2) {
    recommendations.push(`Consider next cable size up (${getNextCableSize(analysis.cableSelection.size)}) for additional safety margin`);
  }
  
  // Voltage drop recommendations
  if (analysis.voltageDrop_percent > 3) {
    recommendations.push('Consider larger cable size to reduce voltage drop below 3%');
  }
  
  // Earth fault loop impedance
  if (analysis.actualZs > analysis.charger.voltage * 0.8) {
    warnings.push('High earth fault loop impedance - verify earthing arrangements');
  }
  
  // Installation location considerations
  if (inputs.installationLocation === 'external') {
    recommendations.push('Ensure IP65 rated equipment for external installation');
    recommendations.push('Consider earth electrode if TT system or long cable runs');
  }
  
  // Load management
  if (inputs.existingLoadCurrent > 50) {
    recommendations.push('Consider load management system to prevent supply overload');
  }
  
  // DNO notification
  if (analysis.charger.power > 3.68 && analysis.charger.phases === 1) {
    recommendations.push('DNO notification required for single-phase installations >3.68kW');
  }
  
  if (analysis.charger.power > 11) {
    recommendations.push('DNO application may be required for installations >11kW');
  }
  
  // Compliance warnings
  if (!analysis.installationCompliant) {
    warnings.push('Installation may not comply with BS 7671 - review calculations');
  }
  
  return { recommendations, warnings };
}

function generateReviewFindings(inputs: EVCalculationInputs, results: any) {
  const loadAnalysis = `Peak demand of ${results.peakDemand.toFixed(1)}kW requires ${results.circuitCurrent.toFixed(1)}A circuit capacity. ${
    inputs.existingLoadCurrent > 0 
      ? `Existing load of ${inputs.existingLoadCurrent}A should be considered for total installation capacity.` 
      : ''
  }`;
  
  const cableAssessment = `${results.cableSelection.label} cable selected for ${results.circuitCurrent.toFixed(1)}A load over ${inputs.runLength}m run. Voltage drop: ${results.voltageDrop_percent.toFixed(1)}% ${
    results.voltageDrop_percent <= 3 ? '(Good)' : results.voltageDrop_percent <= 5 ? '(Acceptable)' : '(Excessive)'
  }.`;
  
  const protectionCompliance = `Earth fault loop impedance: ${results.actualZs.toFixed(2)}Ω (Max: ${EARTHING_SYSTEMS[inputs.supplyType].zs_max}Ω). ${
    results.actualZs <= EARTHING_SYSTEMS[inputs.supplyType].zs_max ? 'Compliant' : 'Non-compliant - requires attention'
  }.`;
  
  const installationRequirements = `${CHARGER_TYPES[inputs.chargerType].label} installation requires ${getProtectionRequirements(inputs.chargerType, CHARGER_TYPES[inputs.chargerType].power)}. ${
    inputs.installationLocation === 'external' ? 'External installation requires IP65 rated equipment.' : 'Internal installation - ensure adequate ventilation.'
  }`;
  
  return {
    loadAnalysis,
    cableAssessment,
    protectionCompliance,
    installationRequirements
  };
}

function getNextCableSize(currentSize: string): string {
  const sizes = Object.keys(CABLE_SPECIFICATIONS);
  const currentIndex = sizes.indexOf(currentSize);
  return currentIndex < sizes.length - 1 ? CABLE_SPECIFICATIONS[sizes[currentIndex + 1] as keyof typeof CABLE_SPECIFICATIONS].label : 'Consult tables';
}