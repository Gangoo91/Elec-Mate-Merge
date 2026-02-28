import {
  CHARGER_TYPES,
  CABLE_SPECIFICATIONS,
  SAFETY_FACTORS,
  EARTHING_SYSTEMS,
} from './ev-constants';

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
  // Validate inputs
  if (!inputs.batteryCapacity || inputs.batteryCapacity <= 0) {
    throw new Error('Battery capacity must be greater than 0');
  }

  if (inputs.currentCharge >= inputs.targetCharge) {
    throw new Error('Target charge must be higher than current charge level');
  }

  if (inputs.runLength <= 0) {
    throw new Error('Cable run length must be greater than 0');
  }

  const charger = CHARGER_TYPES[inputs.chargerType];
  const earthingSystem = EARTHING_SYSTEMS[inputs.supplyType];

  // Energy required to charge from current % to target %
  // E = battery_capacity × (target% - current%) / 100
  const chargeNeeded = inputs.targetCharge - inputs.currentCharge;
  const energyRequired = (inputs.batteryCapacity * chargeNeeded) / 100;

  // Charging time: accounts for charger efficiency losses
  // Effective power is what actually reaches the battery (after AC/DC conversion losses)
  const effectivePower = charger.power * charger.efficiency;
  const chargingTime = energyRequired / effectivePower;

  // Electricity cost for this charging session
  const cost = energyRequired * inputs.electricityRate;

  // Peak demand: the draw from the supply is higher than charger rating due to efficiency losses
  // P_supply = P_charger / η (e.g. 7kW charger at 92% efficiency draws 7.6kW from supply)
  const peakDemand = charger.power / charger.efficiency;

  // Design current: convert power to current based on supply voltage and phase count
  // Single-phase: I = P / V | Three-phase: I = P / (V × √3)
  const designCurrent =
    (peakDemand * 1000) / (charger.voltage * (charger.phases === 3 ? Math.sqrt(3) : 1));

  // Circuit current: apply 125% design factor (BS 7671) and diversity for multiple chargers
  const circuitCurrent =
    designCurrent * SAFETY_FACTORS.design_current_factor * inputs.diversityFactor;

  // Temperature derating
  const tempFactor = inputs.ambientTemp <= 30 ? 1.0 : inputs.ambientTemp <= 35 ? 0.94 : 0.87;
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

  // Earth fault loop impedance: Zs = Ze + cable impedance contribution
  // Ze defaults are typical UK values: TN-C-S ≈ 0.35Ω, TN-S ≈ 0.35Ω, TT ≈ high (RCD protected)
  // Cable contribution uses mΩ/m from CABLE_SPECIFICATIONS, converted to Ω
  const cableImpedance = (cableSelection.impedance * inputs.runLength) / 1000;
  const estimatedZe = earthingSystem.label.includes('TT') ? 5.0 : 0.35;
  const actualZs = estimatedZe + cableImpedance;

  // Compliance checks
  const voltageDrop_percent = (voltageDrop / charger.voltage) * 100;
  const voltageDropCompliant = voltageDrop_percent <= SAFETY_FACTORS.voltage_drop_limit * 100;
  const zsCompliant = actualZs <= earthingSystem.zs_max;
  const installationCompliant =
    voltageDropCompliant && zsCompliant && cableSelection.current >= deratedCurrent;

  // Generate recommendations and warnings
  const { recommendations, warnings } = generateRecommendations(inputs, {
    voltageDrop_percent,
    voltageDropCompliant,
    zsCompliant,
    installationCompliant,
    cableSelection,
    deratedCurrent,
    actualZs,
    charger,
  });

  // Review findings
  const reviewFindings = generateReviewFindings(inputs, {
    peakDemand,
    circuitCurrent,
    cableSelection,
    voltageDrop_percent,
    actualZs,
    installationCompliant,
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
    reviewFindings,
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

function calculateVoltageDrop(
  current: number,
  length: number,
  impedance: number,
  phases: number
): number {
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
  analysis: {
    voltageDrop_percent: number;
    voltageDropCompliant: boolean;
    zsCompliant: boolean;
    installationCompliant: boolean;
    cableSelection: { current: number; size: string; label: string };
    deratedCurrent: number;
    actualZs: number;
    charger: { power: number; phases: number; voltage: number };
  }
): { recommendations: string[]; warnings: string[] } {
  const recommendations: string[] = [];
  const warnings: string[] = [];

  // Cable recommendations
  if (analysis.cableSelection.current < analysis.deratedCurrent * 1.2) {
    recommendations.push(
      `Consider upgrading to ${getNextCableSize(analysis.cableSelection.size)} for additional safety margin and future-proofing`
    );
  }

  // Voltage drop recommendations
  if (analysis.voltageDrop_percent > 3) {
    recommendations.push(
      'Voltage drop exceeds 3% - consider larger cable size to improve efficiency and comply with best practice'
    );
  } else if (analysis.voltageDrop_percent > 5) {
    warnings.push('Voltage drop exceeds 5% limit - cable upgrade required for BS 7671 compliance');
  }

  // Earth fault loop impedance
  if (analysis.actualZs > analysis.charger.voltage * 0.8) {
    warnings.push(
      'Earth fault loop impedance is high - verify earthing arrangements and consider additional earthing measures'
    );
  }

  // Installation location considerations
  if (inputs.installationLocation === 'external') {
    recommendations.push(
      'External installation requires IP65-rated equipment and weather-resistant cable glands'
    );
    recommendations.push(
      'Consider earth electrode installation if TT earthing system or long cable runs are involved'
    );
  } else if (inputs.installationLocation === 'internal') {
    recommendations.push(
      'Ensure adequate ventilation in enclosed spaces to prevent heat buildup during charging'
    );
  }

  // Load management for high current installations
  if (inputs.existingLoadCurrent > 50) {
    recommendations.push(
      'Existing high load detected - implement load management system to prevent supply overload'
    );
  }

  if (analysis.deratedCurrent > 32) {
    recommendations.push(
      'High current installation - consider three-phase supply or load balancing for optimal performance'
    );
  }

  // DNO notification requirements
  if (analysis.charger.power > 3.68 && analysis.charger.phases === 1) {
    recommendations.push(
      'DNO notification required for single-phase installations exceeding 3.68kW per phase'
    );
  }

  if (analysis.charger.power > 11) {
    recommendations.push(
      'High-power installation may require formal DNO application and supply upgrade assessment'
    );
  }

  // Compliance warnings
  if (!analysis.installationCompliant) {
    warnings.push(
      'Installation calculations indicate potential non-compliance with BS 7671 - professional review recommended'
    );
  }

  // Temperature considerations
  if (inputs.ambientTemp > 35) {
    recommendations.push(
      'High ambient temperature detected - ensure adequate cable derating and consider active cooling'
    );
  }

  return { recommendations, warnings };
}

function generateReviewFindings(
  inputs: EVCalculationInputs,
  results: {
    peakDemand: number;
    circuitCurrent: number;
    cableSelection: { label: string };
    voltageDrop_percent: number;
    actualZs: number;
    installationCompliant: boolean;
  }
) {
  const loadAnalysis = `Peak electrical demand of ${results.peakDemand.toFixed(1)}kW requires ${results.circuitCurrent.toFixed(1)}A circuit capacity. ${
    inputs.existingLoadCurrent > 0
      ? `Combined with existing load of ${inputs.existingLoadCurrent}A, total installation capacity should be assessed for supply adequacy.`
      : 'No existing load specified - ensure total installation capacity remains within supply limits.'
  }`;

  const cableAssessment = `Selected ${results.cableSelection.label} cable for ${results.circuitCurrent.toFixed(1)}A load over ${inputs.runLength}m cable run. Calculated voltage drop: ${results.voltageDrop_percent.toFixed(1)}% ${
    results.voltageDrop_percent <= 3
      ? '(Excellent - within best practice)'
      : results.voltageDrop_percent <= 5
        ? '(Acceptable - within regulations)'
        : '(Excessive - requires cable upgrade)'
  }.`;

  const protectionCompliance = `Earth fault loop impedance measured: ${results.actualZs.toFixed(2)}Ω (Maximum permitted: ${EARTHING_SYSTEMS[inputs.supplyType].zs_max}Ω). ${
    results.actualZs <= EARTHING_SYSTEMS[inputs.supplyType].zs_max
      ? 'Protective device operation confirmed within safe parameters.'
      : 'Non-compliant - protective device may not operate correctly in fault conditions.'
  }`;

  const installationRequirements = `${CHARGER_TYPES[inputs.chargerType].label} installation requires ${getProtectionRequirements(inputs.chargerType, CHARGER_TYPES[inputs.chargerType].power)} protection. ${
    inputs.installationLocation === 'external'
      ? 'External installation demands IP65-rated equipment with appropriate weatherproofing measures.'
      : inputs.installationLocation === 'internal'
        ? 'Internal installation requires adequate ventilation and space clearances per manufacturer specifications.'
        : 'Commercial installation requires additional considerations for accessibility and maintenance.'
  }`;

  return {
    loadAnalysis,
    cableAssessment,
    protectionCompliance,
    installationRequirements,
  };
}

function getNextCableSize(currentSize: string): string {
  const sizes = Object.keys(CABLE_SPECIFICATIONS);
  const currentIndex = sizes.indexOf(currentSize);
  return currentIndex < sizes.length - 1
    ? CABLE_SPECIFICATIONS[sizes[currentIndex + 1] as keyof typeof CABLE_SPECIFICATIONS].label
    : 'Consult tables';
}
