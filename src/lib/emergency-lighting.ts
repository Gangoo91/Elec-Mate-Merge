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
    description: "Office/Commercial",
    riskLevel: "low",
    specialRequirements: []
  },
  retail: { 
    lux: 1, 
    spacing: 15, 
    antiPanicRequired: true,
    description: "Retail/Shopping",
    riskLevel: "medium",
    specialRequirements: ["High occupancy areas", "Customer safety priority"]
  },
  industrial: { 
    lux: 0.5, 
    spacing: 25, 
    antiPanicRequired: false,
    description: "Industrial/Warehouse",
    riskLevel: "high",
    specialRequirements: ["Hazardous machinery areas", "Emergency stop procedures"]
  },
  hospital: { 
    lux: 5, 
    spacing: 10, 
    antiPanicRequired: true,
    description: "Hospital/Healthcare",
    riskLevel: "critical",
    specialRequirements: ["HTM 06-02 compliance", "Life safety critical", "24/7 operation"]
  },
  school: { 
    lux: 1, 
    spacing: 18, 
    antiPanicRequired: true,
    description: "School/Educational",
    riskLevel: "medium",
    specialRequirements: ["Child safety considerations", "Assembly areas"]
  },
  hotel: { 
    lux: 1, 
    spacing: 20, 
    antiPanicRequired: true,
    description: "Hotel/Accommodation",
    riskLevel: "medium",
    specialRequirements: ["Sleeping risk considerations", "Tourist unfamiliarity"]
  }
};

export const fixtureProfiles = {
  "led-standard": { 
    watts: 3, 
    lumens: 200, 
    description: "LED Standard (3W)",
    lifespan: 50000,
    costPerUnit: 45,
    efficiency: 67
  },
  "led-high": { 
    watts: 5, 
    lumens: 400, 
    description: "LED High Output (5W)",
    lifespan: 50000,
    costPerUnit: 65,
    efficiency: 80
  },
  "led-premium": { 
    watts: 8, 
    lumens: 600, 
    description: "LED Premium (8W)",
    lifespan: 60000,
    costPerUnit: 85,
    efficiency: 75
  },
  "fluorescent": { 
    watts: 8, 
    lumens: 320, 
    description: "Fluorescent (8W)",
    lifespan: 10000,
    costPerUnit: 35,
    efficiency: 40
  }
};

export function calculateEmergencyLighting(inputs: EmergencyLightingInputs): EmergencyLightingResult {
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
    complexLayout = false
  } = inputs;

  const occupancy = occupancyProfiles[occupancyType as keyof typeof occupancyProfiles];
  const fixture = fixtureProfiles[fixtureType as keyof typeof fixtureProfiles];

  // Escape Route Lighting Calculations
  let escapeRouteLights = 0;
  
  // Standard corridor lighting (every 2m maximum)
  if (corridorLength > 0) {
    escapeRouteLights += Math.ceil(corridorLength / 2);
  } else {
    // Estimate corridor length based on area and exits
    const estimatedRouteLength = Math.sqrt(floorArea) * exitRoutes * 1.4;
    escapeRouteLights = Math.ceil(estimatedRouteLength / 2);
  }

  // Staircase lighting (every flight + landings)
  if (staircaseFlights > 0) {
    escapeRouteLights += staircaseFlights * 2; // Top and bottom of each flight
  }

  // Open Area Lighting
  const openAreaLights = Math.ceil(floorArea / (occupancy.spacing * occupancy.spacing));

  // Anti-Panic Lighting (for areas >60m²)
  let antiPanicLights = 0;
  if (occupancy.antiPanicRequired && floorArea > 60) {
    antiPanicLights = Math.ceil(floorArea / 100); // Additional anti-panic coverage
  }

  // High Risk Area Lighting
  let highRiskAreaLights = 0;
  if (hasHighRiskTasks) {
    highRiskAreaLights = Math.ceil(floorArea / 50); // Denser coverage for high risk
  }

  const totalLuminaires = escapeRouteLights + openAreaLights + antiPanicLights + highRiskAreaLights;
  const totalPower = totalLuminaires * fixture.watts;

  // Battery Capacity (Ah at 12V with safety margins)
  const safetyMargin = occupancyType === 'hospital' ? 1.5 : 1.2;
  const batteryCapacity = Math.ceil((totalPower * emergencyDuration / 12) * safetyMargin);

  // Circuit Current and Cable Sizing
  const circuitCurrent = totalPower / 12;
  let cableSize = "";
  if (circuitCurrent <= 6) cableSize = "1.0mm²";
  else if (circuitCurrent <= 10) cableSize = "1.5mm²";
  else if (circuitCurrent <= 16) cableSize = "2.5mm²";
  else if (circuitCurrent <= 25) cableSize = "4.0mm²";
  else cableSize = "6.0mm² or distribute across multiple circuits";

  // Illuminance Analysis
  const totalLumens = totalLuminaires * fixture.lumens;
  const illuminanceAchieved = totalLumens / floorArea;
  const uniformityRatio = Math.min(illuminanceAchieved / occupancy.lux, 40); // Max 40:1 ratio
  const spacingRatio = Math.sqrt(floorArea / totalLuminaires) / ceilingHeight;

  // Compliance Assessment
  let complianceStatus: 'compliant' | 'warning' | 'non-compliant' = 'compliant';
  const complianceIssues: string[] = [];
  
  if (illuminanceAchieved < occupancy.lux) {
    complianceStatus = 'non-compliant';
    complianceIssues.push(`Insufficient illuminance: ${illuminanceAchieved.toFixed(1)} lux (min: ${occupancy.lux} lux)`);
  }
  
  if (uniformityRatio > 40) {
    complianceStatus = 'warning';
    complianceIssues.push(`Poor uniformity ratio: ${uniformityRatio.toFixed(1)}:1 (max: 40:1)`);
  }

  if (spacingRatio > 4) {
    complianceStatus = 'warning';
    complianceIssues.push(`Excessive spacing ratio: ${spacingRatio.toFixed(1)} (max: 4:1)`);
  }

  // Generate Recommendations
  const recommendations: string[] = [];
  
  if (illuminanceAchieved < occupancy.lux * 1.2) {
    recommendations.push("Consider higher output fixtures or additional luminaires for safety margin");
  }
  
  if (hasDisabledAccess && !hasHighRiskTasks) {
    recommendations.push("Ensure accessible route lighting meets Part M requirements");
  }
  
  if (complexLayout) {
    recommendations.push("Conduct detailed photometric calculations for complex geometry areas");
  }

  if (emergencyDuration < 3 && occupancyType !== 'office') {
    recommendations.push("Consider 3-hour duration for unoccupied premises safety");
  }

  // Regulatory Notes
  const regulatoryNotes = [
    "BS 5266-1:2016 Emergency lighting requirements",
    "Minimum 1 lux on escape routes, 0.2 lux in open areas",
    "Uniformity ratio not exceeding 40:1",
    "Maximum spacing-to-height ratio of 4:1"
  ];

  if (occupancyType === 'hospital') {
    regulatoryNotes.push("HTM 06-02 specialist healthcare requirements");
    regulatoryNotes.push("Essential areas require maintained emergency lighting");
  }

  if (hasDisabledAccess) {
    regulatoryNotes.push("Building Regulations Part M accessibility requirements");
  }

  // Maintenance Schedule
  const maintenanceSchedule = [
    "Daily: Visual inspection of indicators",
    "Monthly: Function test (switch off mains for brief period)",
    "6-Monthly: Clean luminaires and check batteries",
    "Annual: Full duration test and battery replacement check",
    "3-Yearly: Complete system inspection and testing"
  ];

  // Testing Requirements
  const testingRequirements = [
    "Commission testing upon installation completion",
    "Monthly function tests (minimum 30 seconds)",
    "Annual full duration tests",
    "Record all test results in logbook",
    "Test emergency lighting during fire drills"
  ];

  // Installation Notes
  const installationNotes = [
    "Install at minimum 2m above floor level",
    "Ensure clear sight lines along escape routes",
    "Provide IP65 protection in wet areas",
    "Use fire-resistant cables (FP200 or equivalent)",
    "Install central battery systems for large installations"
  ];

  // Cost Estimation
  const estimatedCost = (totalLuminaires * fixture.costPerUnit) + 
                       (batteryCapacity * 15) + // Battery costs
                       (totalLuminaires * 25); // Installation costs per point

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
    complianceStatus,
    complianceIssues,
    recommendations,
    regulatoryNotes,
    maintenanceSchedule,
    estimatedCost,
    installationNotes,
    testingRequirements
  };
}