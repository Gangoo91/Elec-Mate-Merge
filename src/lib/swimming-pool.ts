export interface PoolCalculationInputs {
  poolType: 'private' | 'public' | 'commercial' | 'therapy';
  poolVolume: number;
  poolLength: number;
  poolWidth: number;
  poolDepth: number;
  heaterPower: number;
  pumpPower: number;
  lighting: number;
  filtrationSystem: 'sand' | 'cartridge' | 'de';
  heatingType: 'electric' | 'gas' | 'heat-pump' | 'solar';
  supplyVoltage: 230 | 400;
  earthingSystem: 'TN-S' | 'TN-C-S' | 'TT';
  zone: 'zone0' | 'zone1' | 'zone2';
  cableRunLength: number;
  installationMethod: 'underground' | 'overhead' | 'indoor';
  ambientTemperature: number;
  soilResistivity: number;
  hasUnderwaterLighting: boolean;
  hasPoolCover: boolean;
  hasEmergencyStop: boolean;
  hasAccessibility: boolean;
}

export interface CircuitAnalysis {
  name: string;
  load: number;
  voltage: number;
  current: number;
  cableSize: string;
  protectionRating: number;
  rcdRequired: boolean;
  ipRating: string;
  specialRequirements: string[];
  complianceStatus: 'compliant' | 'warning' | 'non-compliant';
  reasonsForCompliance: string[];
}

export interface PoolCalculationResult {
  totalLoad: number;
  totalCurrent: number;
  supplyRequirements: string;
  mainProtection: string;
  earthingArrangements: string;
  bondingRequirements: string[];
  circuits: CircuitAnalysis[];
  zonalCompliance: {
    zone0: { permitted: string[]; prohibited: string[]; ipRating: string };
    zone1: { permitted: string[]; prohibited: string[]; ipRating: string };
    zone2: { permitted: string[]; prohibited: string[]; ipRating: string };
  };
  regulatoryCompliance: {
    bs7671Section702: boolean;
    ietCodeOfPractice: boolean;
    buildingRegs: boolean;
    issues: string[];
    recommendations: string[];
  };
  safetyFactors: {
    diversityFactor: number;
    simultaneityFactor: number;
    safetyMargin: number;
    temperatureDerating: number;
  };
  practicalGuidance: {
    installationSteps: string[];
    testingRequirements: string[];
    maintenancePoints: string[];
    commonPitfalls: string[];
  };
}

export function calculatePoolInstallation(inputs: PoolCalculationInputs): PoolCalculationResult {
  const {
    poolType,
    poolVolume,
    heaterPower,
    pumpPower,
    lighting,
    filtrationSystem,
    heatingType,
    supplyVoltage,
    earthingSystem,
    zone,
    cableRunLength,
    installationMethod,
    ambientTemperature,
    hasUnderwaterLighting,
    hasPoolCover,
    hasEmergencyStop
  } = inputs;

  // Calculate diversity factors
  const heaterDiversity = poolType === 'private' ? 0.75 : 1.0;
  const pumpDiversity = 1.0; // Pumps typically run continuously
  const lightingDiversity = poolType === 'private' ? 0.8 : 1.0;

  // Apply diversity to loads
  const diversifiedHeaterLoad = heaterPower * heaterDiversity;
  const diversifiedPumpLoad = pumpPower * pumpDiversity;
  const diversifiedLightingLoad = lighting * lightingDiversity;

  const totalLoad = diversifiedHeaterLoad + diversifiedPumpLoad + diversifiedLightingLoad;
  const totalCurrent = totalLoad / (supplyVoltage * (supplyVoltage === 400 ? Math.sqrt(3) : 1));

  // Temperature derating factor
  const temperatureDerating = ambientTemperature > 30 ? 0.87 : 1.0;

  // Circuit analysis
  const circuits: CircuitAnalysis[] = [];

  // Pool heater circuit
  if (heaterPower > 0) {
    const heaterCurrent = heaterPower / supplyVoltage;
    circuits.push({
      name: 'Pool Heater',
      load: heaterPower,
      voltage: supplyVoltage,
      current: heaterCurrent,
      cableSize: getCableSize(heaterCurrent, cableRunLength, temperatureDerating),
      protectionRating: getProtectionRating(heaterCurrent),
      rcdRequired: true,
      ipRating: 'IPX4',
      specialRequirements: [
        'Dedicated circuit required',
        'Emergency isolation required',
        heatingType === 'electric' ? 'High temperature cable required' : 'Gas safety interlock required'
      ],
      complianceStatus: 'compliant',
      reasonsForCompliance: ['30mA RCD protection', 'Dedicated circuit', 'Appropriate cable rating']
    });
  }

  // Pool pump circuit
  if (pumpPower > 0) {
    const pumpCurrent = pumpPower / supplyVoltage;
    circuits.push({
      name: 'Pool Pump/Filtration',
      load: pumpPower,
      voltage: supplyVoltage,
      current: pumpCurrent,
      cableSize: getCableSize(pumpCurrent, cableRunLength, temperatureDerating),
      protectionRating: getProtectionRating(pumpCurrent),
      rcdRequired: true,
      ipRating: 'IPX4',
      specialRequirements: [
        'Motor starting current consideration',
        'Pump isolation switch required',
        filtrationSystem === 'de' ? 'Additional earth fault protection' : 'Standard motor protection'
      ],
      complianceStatus: 'compliant',
      reasonsForCompliance: ['Motor protection', '30mA RCD', 'Appropriate starting arrangements']
    });
  }

  // Pool lighting circuit
  if (lighting > 0) {
    const lightingCurrent = lighting / (hasUnderwaterLighting ? 12 : supplyVoltage);
    const lightingVoltage = hasUnderwaterLighting ? 12 : supplyVoltage;
    circuits.push({
      name: hasUnderwaterLighting ? 'Pool Lighting (SELV)' : 'Pool Area Lighting',
      load: lighting,
      voltage: lightingVoltage,
      current: lightingCurrent,
      cableSize: hasUnderwaterLighting ? '1.5mm²' : getCableSize(lightingCurrent, cableRunLength, temperatureDerating),
      protectionRating: hasUnderwaterLighting ? 6 : getProtectionRating(lightingCurrent),
      rcdRequired: !hasUnderwaterLighting,
      ipRating: hasUnderwaterLighting ? 'IPX8' : 'IPX4',
      specialRequirements: hasUnderwaterLighting 
        ? ['SELV transformer required', 'Safety isolating transformer', 'Maximum 12V in Zone 0']
        : ['Minimum 2m from pool edge', 'RCD protection mandatory', 'Appropriate IP rating'],
      complianceStatus: hasUnderwaterLighting && lightingVoltage === 12 ? 'compliant' : 'warning',
      reasonsForCompliance: hasUnderwaterLighting 
        ? ['SELV supply', 'IPX8 rating', 'Zone 0 compliance']
        : ['Adequate distance from pool', 'RCD protection']
    });
  }

  // Supply requirements
  let supplyRequirements = '';
  if (totalLoad <= 3000) {
    supplyRequirements = '16A single phase supply (Type B MCB)';
  } else if (totalLoad <= 7000) {
    supplyRequirements = '32A single phase supply (Type B MCB)';
  } else if (totalLoad <= 15000) {
    supplyRequirements = '25A three phase supply (Type B MCB)';
  } else {
    supplyRequirements = '40A+ three phase supply (specialist design required)';
  }

  // Main protection
  const mainProtection = poolType === 'private' 
    ? '30mA RCD protection mandatory for all circuits'
    : '30mA RCD + additional 10mA RCD for underwater equipment';

  // Earthing arrangements
  const earthingArrangements = earthingSystem === 'TT' 
    ? 'Earth electrode required. Resistance ≤ 200Ω. Additional earth electrode for pool equipment recommended.'
    : 'Main earthing terminal connection. Supplementary bonding essential for all metalwork within 2m of pool.';

  // Bonding requirements
  const bondingRequirements = [
    'Bond all exposed metalwork within 2m of pool',
    'Bond pool structure (if conductive)',
    'Bond water circulation pipes',
    'Bond pool heating pipes',
    'Bond access ladders and handrails',
    'Bond reinforcing steel in concrete',
    poolType !== 'private' ? 'Bond ventilation ducting' : '',
    'Use 4mm² minimum bonding conductor'
  ].filter(Boolean);

  // Zonal compliance
  const zonalCompliance = {
    zone0: {
      permitted: ['12V SELV equipment only', 'IPX8 rated luminaires', 'Pool cleaning equipment (SELV)'],
      prohibited: ['Socket outlets', 'Switches', '230V equipment', 'Junction boxes'],
      ipRating: 'IPX8 minimum'
    },
    zone1: {
      permitted: ['12V SELV preferred', 'Limited 230V with additional protection', 'Emergency lighting (SELV)'],
      prohibited: ['Socket outlets within 2m', 'Standard switches', 'Standard luminaires'],
      ipRating: 'IPX4 minimum (IPX5 for commercial)'
    },
    zone2: {
      permitted: ['230V equipment with RCD', 'Socket outlets with RCD', 'Standard wiring methods'],
      prohibited: ['Equipment without RCD protection', 'Metal conduit without bonding'],
      ipRating: 'IPX2 minimum (IPX4 recommended)'
    }
  };

  // Regulatory compliance
  const complianceIssues: string[] = [];
  const recommendations: string[] = [];

  if (hasUnderwaterLighting && lighting > 300) {
    complianceIssues.push('Underwater lighting exceeds recommended power for SELV systems');
  }

  if (poolType === 'public' && !hasEmergencyStop) {
    complianceIssues.push('Emergency stop system required for public pools');
  }

  if (cableRunLength > 50 && installationMethod === 'underground') {
    recommendations.push('Consider voltage drop calculations for long cable runs');
  }

  if (ambientTemperature > 35) {
    recommendations.push('Temperature derating required for cable sizing');
  }

  recommendations.push('Annual PAT testing recommended for portable pool equipment');
  recommendations.push('Regular earth loop impedance testing required');
  recommendations.push('RCD testing every 6 months recommended');

  // Safety factors
  const safetyFactors = {
    diversityFactor: poolType === 'private' ? 0.8 : 0.9,
    simultaneityFactor: 0.85,
    safetyMargin: 1.25,
    temperatureDerating
  };

  // Practical guidance
  const practicalGuidance = {
    installationSteps: [
      'Install earth electrode (if TT system)',
      'Install main distribution board with RCD protection',
      'Install supplementary bonding to all metalwork',
      'Install cable routes (underground preferred)',
      'Install equipment with appropriate IP ratings',
      'Connect and test all circuits',
      'Perform initial verification',
      'Complete electrical installation certificate'
    ],
    testingRequirements: [
      'Earth fault loop impedance (Zs ≤ 1.44Ω for 30mA RCD)',
      'RCD operating times (≤ 300ms at rated current)',
      'Insulation resistance (≥ 1MΩ)',
      'Continuity of bonding conductors',
      'Polarity verification',
      'Earth electrode resistance (if applicable)',
      'Functional testing of emergency stops',
      'PAT testing of portable equipment'
    ],
    maintenancePoints: [
      'Monthly RCD testing',
      'Annual earth loop impedance testing',
      'Annual PAT testing of portable equipment',
      'Visual inspection of bonding connections',
      'Check IP rating integrity',
      'Inspect cable routes for damage',
      'Test emergency stop functions',
      'Review and update risk assessments'
    ],
    commonPitfalls: [
      'Insufficient IP rating for zone requirements',
      'Missing supplementary bonding',
      'Inadequate earth electrode resistance',
      'Socket outlets too close to pool',
      'Using standard cables in wet areas',
      'Forgetting diversity factors in calculations',
      'Not considering motor starting currents',
      'Inadequate emergency isolation arrangements'
    ]
  };

  return {
    totalLoad: Math.round(totalLoad),
    totalCurrent: Math.round(totalCurrent * 10) / 10,
    supplyRequirements,
    mainProtection,
    earthingArrangements,
    bondingRequirements,
    circuits,
    zonalCompliance,
    regulatoryCompliance: {
      bs7671Section702: complianceIssues.length === 0,
      ietCodeOfPractice: poolType === 'private',
      buildingRegs: true,
      issues: complianceIssues,
      recommendations
    },
    safetyFactors,
    practicalGuidance
  };
}

function getCableSize(current: number, length: number, derating: number): string {
  const deratedCurrent = current / derating;
  
  if (deratedCurrent <= 13) return '1.5mm²';
  if (deratedCurrent <= 17) return '2.5mm²';
  if (deratedCurrent <= 23) return '4.0mm²';
  if (deratedCurrent <= 30) return '6.0mm²';
  if (deratedCurrent <= 40) return '10mm²';
  if (deratedCurrent <= 54) return '16mm²';
  return '25mm²';
}

function getProtectionRating(current: number): number {
  if (current <= 6) return 6;
  if (current <= 10) return 10;
  if (current <= 16) return 16;
  if (current <= 20) return 20;
  if (current <= 25) return 25;
  if (current <= 32) return 32;
  if (current <= 40) return 40;
  return 50;
}