// Emergency Lighting Calculation Library - BS 5266-1 Compliant

export interface EmergencyLightingInputs {
  floorArea: number;
  ceilingHeight: number;
  occupancyType: string;
  corridorLength?: number;
  corridorWidth?: number;
  staircaseFlights?: number;
  hasHighRiskTasks?: boolean;
  emergencyDuration: number;
  fixtureType: string;
  exitRoutes: number;
  hasDisabledAccess?: boolean;
  buildingHeight?: number;
  complexLayout?: boolean;
  batteryChemistry?: string;
  systemType?: string; // 'self-contained' | 'central-battery'
}

export interface EmergencyLightingResult {
  // Core Results
  totalLuminaires: number;
  escapeRouteLights: number;
  openAreaLights: number;
  antiPanicLights: number;
  highRiskAreaLights: number;

  // System Design
  totalPower: number;
  batteryCapacity: number;
  cableSize: string;
  circuitCurrent: number;

  // Advanced Analysis
  illuminanceAchieved: number;
  uniformityRatio: number;
  spacingRatio: number;
  shrSpacing: number; // Spacing-to-Height Ratio based spacing

  // Battery Analysis
  batteryWeight: number; // kg
  batteryDerating: number; // factor
  batteryCycleLife: number; // cycles

  // Cost Comparison
  selfContainedCost: number;
  centralBatteryCost: number;
  recommendedSystem: string;
  costCrossoverPoint: number; // luminaires where central becomes cheaper

  // Commissioning Checklist
  commissioningChecklist: string[];

  // Compliance & Recommendations
  complianceStatus: 'compliant' | 'warning' | 'non-compliant';
  complianceIssues: string[];
  recommendations: string[];
  regulatoryNotes: string[];
  maintenanceSchedule: string[];

  // Cost & Practical
  estimatedCost: number;
  installationNotes: string[];
  testingRequirements: string[];
}

export const occupancyProfiles = {
  office: {
    lux: 1,
    spacing: 20,
    antiPanicRequired: true,
    description: 'Office/Commercial',
    riskLevel: 'low',
    specialRequirements: [],
  },
  retail: {
    lux: 1,
    spacing: 15,
    antiPanicRequired: true,
    description: 'Retail/Shopping',
    riskLevel: 'medium',
    specialRequirements: ['High occupancy areas', 'Customer safety priority'],
  },
  industrial: {
    lux: 0.5,
    spacing: 25,
    antiPanicRequired: false,
    description: 'Industrial/Warehouse',
    riskLevel: 'high',
    specialRequirements: ['Hazardous machinery areas', 'Emergency stop procedures'],
  },
  hospital: {
    lux: 5,
    spacing: 10,
    antiPanicRequired: true,
    description: 'Hospital/Healthcare',
    riskLevel: 'critical',
    specialRequirements: ['HTM 06-02 compliance', 'Life safety critical', '24/7 operation'],
  },
  school: {
    lux: 1,
    spacing: 18,
    antiPanicRequired: true,
    description: 'School/Educational',
    riskLevel: 'medium',
    specialRequirements: ['Child safety considerations', 'Assembly areas'],
  },
  hotel: {
    lux: 1,
    spacing: 20,
    antiPanicRequired: true,
    description: 'Hotel/Accommodation',
    riskLevel: 'medium',
    specialRequirements: ['Sleeping risk considerations', 'Tourist unfamiliarity'],
  },
};

export const fixtureProfiles = {
  'led-standard': {
    watts: 3,
    lumens: 200,
    description: 'LED Standard (3W)',
    lifespan: 50000,
    costPerUnit: 45,
    efficiency: 67,
  },
  'led-high': {
    watts: 5,
    lumens: 400,
    description: 'LED High Output (5W)',
    lifespan: 50000,
    costPerUnit: 65,
    efficiency: 80,
  },
  'led-premium': {
    watts: 8,
    lumens: 600,
    description: 'LED Premium (8W)',
    lifespan: 60000,
    costPerUnit: 85,
    efficiency: 75,
  },
  fluorescent: {
    watts: 8,
    lumens: 320,
    description: 'Fluorescent (8W)',
    lifespan: 10000,
    costPerUnit: 35,
    efficiency: 40,
  },
};

// Battery chemistry profiles
export const batteryChemistries = {
  'lead-acid': {
    description: 'Lead-Acid (Sealed)',
    ahPerKg: 30, // Wh/kg
    deratingFactor: 0.8,
    cycleLife: 300,
    costPerAh: 8,
    temperatureRange: '0-40°C',
  },
  nicd: {
    description: 'Nickel-Cadmium (NiCd)',
    ahPerKg: 50,
    deratingFactor: 0.85,
    cycleLife: 1500,
    costPerAh: 18,
    temperatureRange: '-20-50°C',
  },
  lifepo4: {
    description: 'Lithium Iron Phosphate (LiFePO4)',
    ahPerKg: 120,
    deratingFactor: 0.95,
    cycleLife: 5000,
    costPerAh: 25,
    temperatureRange: '-10-60°C',
  },
};

export function calculateEmergencyLighting(
  inputs: EmergencyLightingInputs
): EmergencyLightingResult {
  const {
    floorArea,
    ceilingHeight,
    occupancyType,
    corridorLength = 0,
    corridorWidth = 0,
    staircaseFlights = 0,
    hasHighRiskTasks = false,
    emergencyDuration,
    fixtureType,
    exitRoutes,
    hasDisabledAccess = false,
    complexLayout = false,
    batteryChemistry = 'lead-acid',
    systemType = 'self-contained',
  } = inputs;

  const occupancy = occupancyProfiles[occupancyType as keyof typeof occupancyProfiles];
  const fixture = fixtureProfiles[fixtureType as keyof typeof fixtureProfiles];
  const battery = batteryChemistries[batteryChemistry as keyof typeof batteryChemistries];

  // SHR-based photometric spacing calculation
  // Typical SHR for emergency luminaires: 8-12m (depends on output and mounting height)
  const luminaireMaxSHR = fixture.lumens >= 400 ? 12 : fixture.lumens >= 200 ? 10 : 8;
  const shrSpacing = Math.min(luminaireMaxSHR, ceilingHeight * 4); // BS 5266 max SHR = 4:1

  // Escape Route Lighting Calculations (using SHR)
  let escapeRouteLights = 0;
  if (corridorLength > 0) {
    // SHR-based spacing along corridors
    const spacingAlongCorridor = Math.min(
      shrSpacing,
      corridorWidth > 0 ? corridorWidth * 4 : shrSpacing
    );
    escapeRouteLights += Math.ceil(corridorLength / spacingAlongCorridor);
  } else {
    const estimatedRouteLength = Math.sqrt(floorArea) * exitRoutes * 1.4;
    escapeRouteLights = Math.ceil(estimatedRouteLength / shrSpacing);
  }

  // Staircase lighting (every flight + landings)
  if (staircaseFlights > 0) {
    escapeRouteLights += staircaseFlights * 2;
  }

  // Open Area Lighting (SHR-based)
  const openAreaLights = Math.ceil(floorArea / (shrSpacing * shrSpacing));

  // Anti-Panic Lighting (for areas >60m²)
  let antiPanicLights = 0;
  if (occupancy.antiPanicRequired && floorArea > 60) {
    antiPanicLights = Math.ceil(floorArea / 100);
  }

  // High Risk Area Lighting
  let highRiskAreaLights = 0;
  if (hasHighRiskTasks) {
    highRiskAreaLights = Math.ceil(floorArea / 50);
  }

  const totalLuminaires = escapeRouteLights + openAreaLights + antiPanicLights + highRiskAreaLights;
  const totalPower = totalLuminaires * fixture.watts;

  // Battery Capacity with chemistry-specific derating
  const safetyMargin = occupancyType === 'hospital' ? 1.5 : 1.2;
  const rawCapacity = (totalPower * emergencyDuration) / 12; // at 12V
  const batteryCapacity = Math.ceil((rawCapacity / battery.deratingFactor) * safetyMargin);
  const batteryWeight = Math.round(((batteryCapacity * 12) / battery.ahPerKg) * 10) / 10;
  const batteryDerating = battery.deratingFactor;
  const batteryCycleLife = battery.cycleLife;

  // Circuit Current and Cable Sizing
  const circuitCurrent = totalPower / 12;
  let cableSize = '';
  if (circuitCurrent <= 6) cableSize = '1.0mm²';
  else if (circuitCurrent <= 10) cableSize = '1.5mm²';
  else if (circuitCurrent <= 16) cableSize = '2.5mm²';
  else if (circuitCurrent <= 25) cableSize = '4.0mm²';
  else cableSize = '6.0mm² or distribute across multiple circuits';

  // Illuminance Analysis
  const totalLumens = totalLuminaires * fixture.lumens;
  const illuminanceAchieved = totalLumens / floorArea;
  const uniformityRatio = illuminanceAchieved / occupancy.lux;
  const spacingRatio = Math.sqrt(floorArea / totalLuminaires) / ceilingHeight;

  // Cost Comparison: Self-contained vs Central Battery
  const selfContainedCost =
    totalLuminaires * (fixture.costPerUnit + 30) + // +£30 for integral battery
    totalLuminaires * 25; // Installation
  const centralBatteryCost =
    totalLuminaires * (fixture.costPerUnit * 0.7) + // Cheaper luminaires (no battery)
    batteryCapacity * battery.costPerAh + // Central battery
    1500 + // Central battery enclosure & charger
    totalLuminaires * 20 + // Installation (slightly cheaper per point)
    500; // Additional monitoring/wiring
  const costCrossoverPoint = 25; // Approximate crossover
  const recommendedSystem =
    totalLuminaires > costCrossoverPoint ? 'Central Battery' : 'Self-Contained';

  // Commissioning Checklist per BS 5266-1 Section 12
  const commissioningChecklist = [
    'Verify all luminaires illuminate on mains failure',
    'Check changeover time <0.5s (escape routes) or <5s (open areas)',
    'Measure illuminance on escape routes (min 1 lux centreline)',
    'Verify uniformity ratio does not exceed 40:1',
    'Confirm battery duration meets specified requirement',
    'Test all exit signs for visibility and correct orientation',
    'Verify fire alarm interface operates correctly',
    'Check remote test facility functions (if installed)',
    'Record all luminaire positions on as-built drawings',
    'Complete commissioning certificate per BS 5266-1',
  ];

  // Compliance Assessment
  let complianceStatus: 'compliant' | 'warning' | 'non-compliant' = 'compliant';
  const complianceIssues: string[] = [];

  if (illuminanceAchieved < occupancy.lux) {
    complianceStatus = 'non-compliant';
    complianceIssues.push(
      `Insufficient illuminance: ${illuminanceAchieved.toFixed(1)} lux (min: ${occupancy.lux} lux)`
    );
  }

  if (uniformityRatio > 40 && complianceStatus !== 'non-compliant') {
    complianceStatus = 'warning';
    complianceIssues.push(`Poor uniformity ratio: ${uniformityRatio.toFixed(1)}:1 (max: 40:1)`);
  }

  if (spacingRatio > 4 && complianceStatus !== 'non-compliant') {
    complianceStatus = 'warning';
    complianceIssues.push(`Excessive spacing ratio: ${spacingRatio.toFixed(1)} (max: 4:1)`);
  }

  // Generate Recommendations
  const recommendations: string[] = [];

  if (illuminanceAchieved < occupancy.lux * 1.2) {
    recommendations.push(
      'Consider higher output fixtures or additional luminaires for safety margin'
    );
  }

  if (hasDisabledAccess && !hasHighRiskTasks) {
    recommendations.push('Ensure accessible route lighting meets Part M requirements');
  }

  if (complexLayout) {
    recommendations.push('Conduct detailed photometric calculations for complex geometry areas');
  }

  if (emergencyDuration < 3 && occupancyType !== 'office') {
    recommendations.push('Consider 3-hour duration for unoccupied premises safety');
  }

  // Regulatory Notes
  const regulatoryNotes = [
    'BS 5266-1:2016 Emergency lighting requirements',
    'Minimum 1 lux on escape routes, 0.5 lux in open areas',
    'Uniformity ratio not exceeding 40:1',
    'Maximum spacing-to-height ratio of 4:1',
  ];

  if (occupancyType === 'hospital') {
    regulatoryNotes.push('HTM 06-02 specialist healthcare requirements');
    regulatoryNotes.push('Essential areas require maintained emergency lighting');
  }

  if (hasDisabledAccess) {
    regulatoryNotes.push('Building Regulations Part M accessibility requirements');
  }

  // Maintenance Schedule
  const maintenanceSchedule = [
    'Daily: Visual inspection of indicators',
    'Monthly: Function test (switch off mains for brief period)',
    '6-Monthly: Clean luminaires and check batteries',
    'Annual: Full duration test and battery replacement check',
    '3-Yearly: Complete system inspection and testing',
  ];

  // Testing Requirements
  const testingRequirements = [
    'Commission testing upon installation completion',
    'Monthly function tests (minimum 30 seconds)',
    'Annual full duration tests',
    'Record all test results in logbook',
    'Test emergency lighting during fire drills',
  ];

  // Installation Notes
  const installationNotes = [
    'Install at minimum 2m above floor level',
    'Ensure clear sight lines along escape routes',
    'Provide IP65 protection in wet areas',
    'Use fire-resistant cables (FP200 or equivalent)',
    'Install central battery systems for large installations',
  ];

  // Cost Estimation
  const estimatedCost =
    recommendedSystem === 'Central Battery' ? centralBatteryCost : selfContainedCost;

  return {
    totalLuminaires,
    escapeRouteLights,
    openAreaLights,
    antiPanicLights,
    highRiskAreaLights,
    totalPower,
    batteryCapacity,
    cableSize,
    circuitCurrent,
    illuminanceAchieved,
    uniformityRatio,
    spacingRatio,
    shrSpacing: Math.round(shrSpacing * 10) / 10,
    batteryWeight,
    batteryDerating,
    batteryCycleLife,
    selfContainedCost: Math.round(selfContainedCost),
    centralBatteryCost: Math.round(centralBatteryCost),
    recommendedSystem,
    costCrossoverPoint,
    commissioningChecklist,
    complianceStatus,
    complianceIssues,
    recommendations,
    regulatoryNotes,
    maintenanceSchedule,
    estimatedCost: Math.round(estimatedCost),
    installationNotes,
    testingRequirements,
  };
}
