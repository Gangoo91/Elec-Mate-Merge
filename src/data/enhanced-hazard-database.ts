import { EnhancedRiskConsequence, enhancedRiskConsequences, hazardCategories } from "./hazards";

// Comprehensive enhanced risk database with realistic electrical hazards
export const enhancedRiskDatabase: EnhancedRiskConsequence[] = [
  // Critical Electrical Hazards
  {
    id: "elec-shock-001",
    hazard: "Electric shock from live conductors",
    consequence: "Fatal electric shock, cardiac arrest, severe burns, permanent disability",
    likelihood: 3,
    severity: 5,
    riskRating: 15,
    controlMeasures: [
      "Isolation and lock-off procedures (BS7671 Regulation 514.11)",
      "Proving unit dead with approved voltage detector (GS38)",
      "Use of appropriate PPE including insulated gloves to BS EN 60903",
      "Safe working distances from live parts (minimum 600mm)",
      "Two-person working rule for high-risk activities",
      "Emergency resuscitation equipment readily available"
    ],
    bs7671References: ["514.11 - Isolation and switching", "Part 4 - Protection for safety", "411 - Protective measure: automatic disconnection"],
    category: "electrical",
    workType: ["installation", "maintenance", "testing", "fault-finding"],
    environment: ["indoor", "outdoor", "confined-space"]
  },
  {
    id: "elec-shock-002", 
    hazard: "Electric shock from faulty earth bonding",
    consequence: "Electric shock through metalwork, equipment damage, fire risk",
    likelihood: 2,
    severity: 4,
    riskRating: 8,
    controlMeasures: [
      "Main protective bonding to BS7671 Section 544",
      "Supplementary bonding in special locations (701.415.2)",
      "Earth continuity testing with appropriate instruments",
      "Visual inspection of bonding conductors",
      "Installation of RCD protection (411.3.3)"
    ],
    bs7671References: ["544 - Protective bonding conductors", "701.415.2 - Supplementary bonding", "411.3.3 - RCD protection"],
    category: "electrical",
    workType: ["installation", "testing", "inspection"],
    environment: ["bathroom", "kitchen", "outdoor"]
  },
  {
    id: "cable-strike-001",
    hazard: "Underground cable strike during excavation",
    consequence: "Fatal electric shock, explosion, widespread power outage, prosecution",
    likelihood: 4,
    severity: 5,
    riskRating: 20,
    controlMeasures: [
      "Cable location using CAT and Genny equipment",
      "Hand digging within 1m of suspected cables",
      "Use of insulated tools and equipment",
      "Coordination with DNO for cable plans",
      "Permit to dig system implementation",
      "Ground penetrating radar for complex sites"
    ],
    bs7671References: ["Part 5 - Selection and erection", "522.8.10 - Underground cables"],
    category: "excavation",
    workType: ["installation", "maintenance"],
    environment: ["outdoor", "construction-site"]
  },
  {
    id: "overhead-contact-001",
    hazard: "Contact with overhead power lines",
    consequence: "Fatal electric shock, arc flash burns, equipment damage",
    likelihood: 2,
    severity: 5,
    riskRating: 10,
    controlMeasures: [
      "Minimum 3m clearance from 11kV lines (6m for 33kV)",
      "Use of goal post barriers and warning signs",
      "Coordination with DNO for line identification",
      "Banksman for crane and high access operations",
      "Emergency response procedures",
      "Staff training on overhead line hazards"
    ],
    bs7671References: ["Part 1 - Scope and fundamental principles"],
    category: "overhead-lines",
    workType: ["installation", "maintenance", "construction"],
    environment: ["outdoor", "construction-site"]
  },
  {
    id: "arc-fault-001",
    hazard: "Arc fault in aging electrical installation",
    consequence: "Fire, property damage, injury from molten metal, toxic fumes",
    likelihood: 3,
    severity: 4,
    riskRating: 12,
    controlMeasures: [
      "Installation of Arc Fault Detection Devices (AFDDs) - 421.1.7",
      "Regular thermal imaging inspections",
      "Torque checking of connections annually",
      "Replacement of aging switchgear and cables",
      "Fire suppression systems in electrical rooms",
      "Emergency isolation procedures"
    ],
    bs7671References: ["421.1.7 - Arc fault detection devices", "Part 7 - Special installations"],
    category: "electrical",
    workType: ["maintenance", "inspection", "upgrade"],
    environment: ["commercial", "industrial"]
  },
  {
    id: "confined-space-001",
    hazard: "Working in confined electrical spaces",
    consequence: "Asphyxiation, electric shock, inability to escape, heat exhaustion",
    likelihood: 3,
    severity: 5,
    riskRating: 15,
    controlMeasures: [
      "Confined space risk assessment and permits",
      "Atmospheric monitoring (oxygen, toxic gases)",
      "Mechanical ventilation systems",
      "Emergency rescue procedures and equipment",
      "Two-person minimum working team",
      "Emergency communication systems"
    ],
    bs7671References: ["Part 7 - Special installations", "706 - Conducting locations with restricted movement"],
    category: "confined-space",
    workType: ["maintenance", "installation", "inspection"],
    environment: ["underground", "confined-space"]
  },
  
  // Physical Hazards
  {
    id: "falls-height-001",
    hazard: "Falls from height during electrical work",
    consequence: "Fatal injuries, broken bones, permanent disability, head trauma",
    likelihood: 4,
    severity: 4,
    riskRating: 16,
    controlMeasures: [
      "Edge protection and guardrails to BS EN 13374",
      "Full body harness and fall arrest systems",
      "Mobile elevated work platforms (MEWPs)",
      "Scaffolding designed by competent person",
      "Tool tethering systems",
      "Emergency rescue procedures"
    ],
    bs7671References: ["Part 5 - Selection and erection"],
    category: "height",
    workType: ["installation", "maintenance", "lighting"],
    environment: ["outdoor", "industrial", "construction-site"]
  },
  {
    id: "manual-handling-001",
    hazard: "Manual handling of heavy electrical equipment",
    consequence: "Back injury, muscle strain, dropped equipment damage",
    likelihood: 4,
    severity: 2,
    riskRating: 8,
    controlMeasures: [
      "Mechanical lifting aids (cranes, hoists, trolleys)",
      "Team lifting procedures for items >25kg",
      "Training in safe lifting techniques",
      "Route planning and obstacle removal",
      "Personal protective equipment",
      "Regular health surveillance"
    ],
    bs7671References: [],
    category: "manual-handling",
    workType: ["installation", "maintenance"],
    environment: ["indoor", "outdoor", "industrial"]
  },
  
  // Fire and Explosion Hazards
  {
    id: "fire-elec-001",
    hazard: "Electrical fire from overloaded circuits",
    consequence: "Building fire, smoke inhalation, property damage, business interruption",
    likelihood: 3,
    severity: 4,
    riskRating: 12,
    controlMeasures: [
      "Circuit protection devices sized to BS7671 Appendix 4",
      "Load calculations and circuit design review",
      "Regular thermal imaging inspections",
      "Fire detection and suppression systems",
      "Emergency isolation procedures",
      "Staff fire safety training"
    ],
    bs7671References: ["433 - Protection against overcurrent", "Appendix 4 - Current-carrying capacity"],
    category: "fire",
    workType: ["installation", "design", "maintenance"],
    environment: ["commercial", "domestic", "industrial"]
  },
  {
    id: "gas-explosion-001",
    hazard: "Gas explosion risk during electrical work",
    consequence: "Fatal explosion, severe burns, building collapse, multiple casualties",
    likelihood: 1,
    severity: 5,
    riskRating: 5,
    controlMeasures: [
      "Gas detection equipment and monitoring",
      "Intrinsically safe electrical equipment in hazardous areas",
      "Hot work permits and gas-free certificates",
      "Emergency evacuation procedures",
      "Coordination with gas supply companies",
      "Use of ATEX certified equipment"
    ],
    bs7671References: ["Part 7 - Special installations", "Section 729 - Operating and maintenance gangways"],
    category: "explosion",
    workType: ["installation", "maintenance"],
    environment: ["industrial", "hazardous-area"]
  },
  
  // Domestic Specific Hazards
  {
    id: "consumer-unit-001",
    hazard: "Consumer unit upgrade in old property with unknown wiring",
    consequence: "Electric shock, fire risk, non-compliance, insurance issues",
    likelihood: 3,
    severity: 3,
    riskRating: 9,
    controlMeasures: [
      "Full electrical installation condition report (EICR)",
      "Circuit identification and testing",
      "RCD protection for all circuits (411.3.3)",
      "SPD installation where required (443.4)",
      "Proper earthing and bonding verification",
      "Building Control notification"
    ],
    bs7671References: ["411.3.3 - RCD protection", "443.4 - Surge protective devices", "Part 6 - Inspection and testing"],
    category: "electrical",
    workType: ["upgrade", "installation"],
    environment: ["domestic"]
  },
  {
    id: "bathroom-elec-001",
    hazard: "Electrical work in bathroom environments",
    consequence: "Fatal electric shock due to water and electricity combination",
    likelihood: 2,
    severity: 5,
    riskRating: 10,
    controlMeasures: [
      "Zone classification per BS7671 Section 701",
      "IPX4 minimum rating for Zone 1 equipment",
      "30mA RCD protection for all circuits",
      "Supplementary bonding of metalwork",
      "SELV systems where appropriate",
      "No switches in Zones 0, 1, or 2"
    ],
    bs7671References: ["701 - Locations containing a bath or shower", "701.415.2 - Supplementary bonding"],
    category: "special-locations",
    workType: ["installation", "maintenance"],
    environment: ["bathroom", "domestic"]
  },
  
  // Commercial/Industrial Hazards
  {
    id: "three-phase-001",
    hazard: "Three-phase supply imbalance and neutral failure",
    consequence: "Equipment damage, fire risk, voltage fluctuations, motor failure",
    likelihood: 2,
    severity: 3,
    riskRating: 6,
    controlMeasures: [
      "Phase sequence and voltage monitoring",
      "Neutral integrity monitoring systems",
      "Load balancing across phases",
      "Regular inspection of neutral connections",
      "Phase failure protection relays",
      "Emergency isolation procedures"
    ],
    bs7671References: ["Part 4 - Protection for safety", "312.2 - Arrangement of live conductors"],
    category: "electrical",
    workType: ["installation", "maintenance", "commissioning"],
    environment: ["commercial", "industrial"]
  },
  {
    id: "motor-control-001",
    hazard: "Motor control panel work on energised systems",
    consequence: "Arc flash burns, electric shock, equipment damage, production loss",
    likelihood: 3,
    severity: 4,
    riskRating: 12,
    controlMeasures: [
      "Arc flash risk assessment and PPE selection",
      "De-energisation and lock-off procedures",
      "Use of arc-rated protective equipment",
      "Remote racking procedures where possible",
      "Emergency response and medical support",
      "Restricted access and warning systems"
    ],
    bs7671References: ["Part 5 - Selection and erection", "432 - Nature of protective devices"],
    category: "electrical",
    workType: ["maintenance", "commissioning"],
    environment: ["industrial"]
  },
  
  // Emergency and Fault Finding
  {
    id: "emergency-call-001",
    hazard: "Emergency electrical fault finding under pressure",
    consequence: "Rushed decisions leading to accidents, incomplete isolation, electric shock",
    likelihood: 4,
    severity: 4,
    riskRating: 16,
    controlMeasures: [
      "Systematic fault finding procedures",
      "Adequate lighting and access provisions",
      "Emergency isolation identification",
      "Communication with emergency services",
      "Risk assessment before any work",
      "Backup support arrangements"
    ],
    bs7671References: ["Part 6 - Inspection and testing", "514 - Isolation and switching"],
    category: "emergency",
    workType: ["fault-finding", "emergency-repair"],
    environment: ["any"]
  },
  
  // Additional Critical Hazards
  {
    id: "voltage-surge-001",
    hazard: "Voltage surge damage during lightning storms",
    consequence: "Equipment destruction, fire risk, data loss, business interruption",
    likelihood: 3,
    severity: 3,
    riskRating: 9,
    controlMeasures: [
      "Surge protective devices (SPDs) to BS EN 61643-11",
      "Lightning protection system coordination",
      "Equipment isolation during storms",
      "Insurance and backup procedures",
      "Regular SPD inspection and testing"
    ],
    bs7671References: ["443.4 - Surge protective devices", "534 - Devices for protection against overvoltage"],
    category: "electrical",
    workType: ["installation", "maintenance"],
    environment: ["outdoor", "industrial", "commercial"]
  },
  {
    id: "neutral-failure-001",
    hazard: "Neutral conductor failure in TN-C-S systems",
    consequence: "Dangerous voltages on metalwork, equipment damage, fire risk",
    likelihood: 2,
    severity: 4,
    riskRating: 8,
    controlMeasures: [
      "PME conditions verification",
      "Main protective bonding conductor sizing",
      "Regular inspection of neutral connections",
      "Alternative earthing arrangements where required",
      "Voltage monitoring systems"
    ],
    bs7671References: ["542.1.2.1 - TN-C-S systems", "544.1 - Main protective bonding"],
    category: "electrical",
    workType: ["installation", "maintenance", "inspection"],
    environment: ["domestic", "commercial"]
  }
];

// Workplace scenarios for contextual hazard suggestions
export const workplaceScenarios = [
  {
    id: "domestic-rewire",
    name: "Domestic Property Rewire", 
    description: "Full electrical installation in residential property",
    commonHazards: ["elec-shock-001", "consumer-unit-001", "manual-handling-001", "falls-height-001"],
    environment: "domestic",
    riskLevel: "medium",
    requiredCompetencies: ["Part P notification", "Building Control liaison", "Consumer unit installation"],
    typicalDuration: "3-7 days"
  },
  {
    id: "bathroom-installation",
    name: "Bathroom Electrical Installation",
    description: "Special location electrical work with water hazards",
    commonHazards: ["bathroom-elec-001", "elec-shock-002", "elec-shock-001"],
    environment: "bathroom",
    riskLevel: "high",
    requiredCompetencies: ["Section 701 compliance", "IP rating selection", "Zone classification"],
    typicalDuration: "1-2 days"
  },
  {
    id: "commercial-office-fitout",
    name: "Commercial Office Fit-out",
    description: "Electrical installation in occupied commercial building",
    commonHazards: ["elec-shock-001", "fire-elec-001", "manual-handling-001", "cable-strike-001"],
    environment: "commercial",
    riskLevel: "medium",
    requiredCompetencies: ["Fire alarm integration", "Emergency lighting", "Data infrastructure"],
    typicalDuration: "2-4 weeks"
  },
  {
    id: "industrial-motor-installation",
    name: "Industrial Motor Control Installation", 
    description: "High-power motor control systems in industrial environment",
    commonHazards: ["motor-control-001", "three-phase-001", "arc-fault-001", "manual-handling-001"],
    environment: "industrial",
    riskLevel: "high",
    requiredCompetencies: ["HV switching", "Motor control principles", "Arc flash assessment"],
    typicalDuration: "1-3 weeks"
  },
  {
    id: "underground-cable-installation",
    name: "Underground Cable Installation",
    description: "Installation of underground electrical supply cables",
    commonHazards: ["cable-strike-001", "confined-space-001", "manual-handling-001", "overhead-contact-001"],
    environment: "outdoor",
    riskLevel: "high", 
    requiredCompetencies: ["Cable jointing", "DNO liaison", "Excavation safety"],
    typicalDuration: "1-2 weeks"
  },
  {
    id: "emergency-fault-repair",
    name: "Emergency Electrical Fault Repair",
    description: "Urgent electrical fault finding and repair work",
    commonHazards: ["emergency-call-001", "elec-shock-001", "arc-fault-001", "fire-elec-001"],
    environment: "any",
    riskLevel: "very-high",
    requiredCompetencies: ["Fault finding techniques", "Emergency procedures", "Risk assessment under pressure"],
    typicalDuration: "2-8 hours"
  },
  {
    id: "solar-pv-installation",
    name: "Solar PV System Installation",
    description: "Roof-mounted solar photovoltaic system installation",
    commonHazards: ["falls-height-001", "overhead-contact-001", "elec-shock-001", "manual-handling-001"],
    environment: "outdoor",
    riskLevel: "high",
    requiredCompetencies: ["MCS certification", "G99 applications", "Roof work safety"],
    typicalDuration: "1-3 days"
  },
  {
    id: "restaurant-kitchen-installation",
    name: "Restaurant Kitchen Electrical Work",
    description: "Electrical installation in commercial kitchen environment",
    commonHazards: ["fire-elec-001", "elec-shock-001", "gas-explosion-001", "manual-handling-001"],
    environment: "commercial",
    riskLevel: "high",
    requiredCompetencies: ["Commercial kitchen standards", "Gas safety coordination", "Fire suppression integration"],
    typicalDuration: "3-7 days"
  }
];

// Risk assessment helpers and utilities
export const riskAssessmentHelpers = {
  calculateRiskRating: (likelihood: number, severity: number): number => {
    return likelihood * severity;
  },
  
  getRiskLevel: (riskRating: number): string => {
    if (riskRating >= 15) return "Very High";
    if (riskRating >= 10) return "High"; 
    if (riskRating >= 6) return "Medium";
    if (riskRating >= 3) return "Low";
    return "Very Low";
  },
  
  getRiskColor: (riskRating: number): string => {
    if (riskRating >= 15) return "bg-red-600";
    if (riskRating >= 10) return "bg-orange-500";
    if (riskRating >= 6) return "bg-yellow-500";
    if (riskRating >= 3) return "bg-blue-500";
    return "bg-green-500";
  },
  
  suggestHazardsByScenario: (scenarioId: string): string[] => {
    const scenario = workplaceScenarios.find(s => s.id === scenarioId);
    return scenario?.commonHazards || [];
  },
  
  getHazardsByCategory: (category: string): EnhancedRiskConsequence[] => {
    return enhancedRiskDatabase.filter(hazard => hazard.category === category);
  },
  
  getHazardsByEnvironment: (environment: string): EnhancedRiskConsequence[] => {
    return enhancedRiskDatabase.filter(hazard => 
      hazard.environment.includes(environment as any)
    );
  },
  
  getHazardsByWorkType: (workType: string): EnhancedRiskConsequence[] => {
    return enhancedRiskDatabase.filter(hazard =>
      hazard.workType.includes(workType as any)
    );
  },
  
  searchHazards: (searchTerm: string): EnhancedRiskConsequence[] => {
    const term = searchTerm.toLowerCase();
    return enhancedRiskDatabase.filter(hazard =>
      hazard.hazard.toLowerCase().includes(term) ||
      hazard.consequence.toLowerCase().includes(term) ||
      hazard.controlMeasures.some(control => control.toLowerCase().includes(term))
    );
  },
  
  getControlHierarchy: (controlMeasures: string[]): { [key: string]: string[] } => {
    const hierarchy = {
      elimination: [] as string[],
      substitution: [] as string[],
      engineering: [] as string[],
      administrative: [] as string[],
      ppe: [] as string[]
    };
    
    controlMeasures.forEach(control => {
      const lowerControl = control.toLowerCase();
      if (lowerControl.includes('eliminate') || lowerControl.includes('remove') || lowerControl.includes('design out')) {
        hierarchy.elimination.push(control);
      } else if (lowerControl.includes('substitute') || lowerControl.includes('alternative') || lowerControl.includes('replace')) {
        hierarchy.substitution.push(control);
      } else if (lowerControl.includes('guard') || lowerControl.includes('barrier') || lowerControl.includes('isolation') || lowerControl.includes('ventilation')) {
        hierarchy.engineering.push(control);
      } else if (lowerControl.includes('training') || lowerControl.includes('procedure') || lowerControl.includes('permit') || lowerControl.includes('inspection')) {
        hierarchy.administrative.push(control);
      } else if (lowerControl.includes('ppe') || lowerControl.includes('protective equipment') || lowerControl.includes('harness') || lowerControl.includes('gloves')) {
        hierarchy.ppe.push(control);
      } else {
        // Default to administrative if unclear
        hierarchy.administrative.push(control);
      }
    });
    
    return hierarchy;
  }
};

// BS7671 18th Edition regulation lookup
export const bs7671RegulationLookup = {
  "514.11": {
    title: "Isolation and switching",
    description: "Every installation shall be provided with a main switch disconnecting all live conductors",
    section: "Part 5 - Selection and erection of electrical equipment"
  },
  "411.3.3": {
    title: "RCD protection",
    description: "Additional protection by 30mA RCD for socket outlets and mobile equipment",
    section: "Part 4 - Protection for safety"
  },
  "544": {
    title: "Protective bonding conductors", 
    description: "Main and supplementary protective bonding requirements",
    section: "Part 5 - Selection and erection of electrical equipment"
  },
  "701": {
    title: "Locations containing a bath or shower",
    description: "Special requirements for electrical installations in bathrooms",
    section: "Part 7 - Requirements for special installations or locations"
  },
  "701.415.2": {
    title: "Supplementary protective bonding",
    description: "Bonding of metalwork in locations containing baths or showers",
    section: "Part 7 - Requirements for special installations or locations"
  },
  "433": {
    title: "Protection against overcurrent",
    description: "Requirements for overcurrent protective devices",
    section: "Part 4 - Protection for safety"
  },
  "421.1.7": {
    title: "Arc fault detection devices",
    description: "Requirements for AFDDs in certain installations",
    section: "Part 4 - Protection for safety"
  },
  "443.4": {
    title: "Surge protective devices",
    description: "Requirements for SPD installation",
    section: "Part 4 - Protection for safety"
  }
};

// Emergency response procedures
export const emergencyProcedures = {
  electricShock: [
    "Do not touch the casualty if still in contact with electricity",
    "Switch off power at main supply if safe to do so",
    "Use non-conductive material to separate casualty from source",
    "Call 999 immediately",
    "Check for breathing and pulse",
    "Begin CPR if trained and necessary",
    "Treat for shock and burns",
    "Do not move casualty unless in immediate danger"
  ],
  electricalFire: [
    "Raise the alarm immediately",
    "Evacuate the area",
    "Call 999 - specify electrical fire",
    "Isolate electrical supply if safe to do so",
    "Use CO2 or dry powder extinguisher only",
    "Never use water on electrical fires",
    "Evacuate and wait for fire service",
    "Inform fire service of electrical hazards"
  ],
  arcFlash: [
    "Call 999 immediately",
    "Do not approach the casualty until power is isolated",
    "Ensure breathing airway is clear",
    "Cool burns with cold water for 20 minutes",
    "Cover burns with cling film",
    "Treat for shock",
    "Monitor for breathing difficulties",
    "Preserve burnt clothing for medical assessment"
  ]
};

// BS7671 18th Edition specific references and requirements
export interface BS7671Requirement {
  section: string;
  title: string;
  description: string;
  applicableHazards: string[];
  inspectionFrequency: string;
  testingRequired: boolean;
}

export const bs7671Requirements: BS7671Requirement[] = [
  {
    section: "411.3.3",
    title: "Additional protection by RCD",
    description: "30mA RCD protection required for socket outlets ≤32A and mobile equipment",
    applicableHazards: ["elec-shock-001", "bathroom-elec-001"],
    inspectionFrequency: "Every 3 months",
    testingRequired: true
  },
  {
    section: "514.11.1",
    title: "General requirements for isolation",
    description: "Every circuit must have means of isolation",
    applicableHazards: ["elec-shock-001", "emergency-call-001"],
    inspectionFrequency: "Initial + 5 yearly",
    testingRequired: false
  },
  {
    section: "544.1",
    title: "Main protective bonding",
    description: "Main protective bonding conductors shall connect to main earthing terminal",
    applicableHazards: ["elec-shock-002", "neutral-failure-001"],
    inspectionFrequency: "Annual",
    testingRequired: true
  },
  {
    section: "701.415.2",
    title: "Supplementary bonding in bathrooms",
    description: "All extraneous conductive parts must be bonded in locations containing baths/showers",
    applicableHazards: ["bathroom-elec-001"],
    inspectionFrequency: "Annual",
    testingRequired: true
  }
];

// Risk assessment matrix for consistent risk rating
export interface RiskMatrix {
  severity: { level: number; description: string; examples: string[] }[];
  likelihood: { level: number; description: string; frequency: string }[];
}

export const riskMatrix: RiskMatrix = {
  severity: [
    { 
      level: 1, 
      description: "Negligible", 
      examples: ["Minor cuts", "Slight discomfort", "Minor equipment damage"] 
    },
    { 
      level: 2, 
      description: "Minor", 
      examples: ["First aid treatment", "Short-term absence", "Local equipment damage"] 
    },
    { 
      level: 3, 
      description: "Moderate", 
      examples: ["Medical treatment", "Up to 7 days absence", "Significant property damage"] 
    },
    { 
      level: 4, 
      description: "Major", 
      examples: ["Hospitalisation", "Long-term absence", "Major property damage", "HSE investigation"] 
    },
    { 
      level: 5, 
      description: "Catastrophic", 
      examples: ["Fatality", "Permanent disability", "Major fire/explosion", "Business closure"] 
    }
  ],
  likelihood: [
    { level: 1, description: "Rare", frequency: "Once every 10+ years" },
    { level: 2, description: "Unlikely", frequency: "Once every 2-10 years" },
    { level: 3, description: "Possible", frequency: "Once every 6 months - 2 years" },
    { level: 4, description: "Likely", frequency: "Once every month - 6 months" },
    { level: 5, description: "Almost Certain", frequency: "Weekly or more frequent" }
  ]
};

// Get BS7671 requirements for specific hazards
export const getBS7671Requirements = (hazardIds: string[]) => {
  return bs7671Requirements.filter(req => 
    req.applicableHazards.some(hazard => hazardIds.includes(hazard))
  );
};

// Get workplace-specific hazards
export const getScenarioHazards = (scenarioId: string) => {
  const scenario = workplaceScenarios.find(s => s.id === scenarioId);
  if (!scenario) return [];

  return enhancedRiskDatabase.filter(risk => 
    scenario.commonHazards.includes(risk.id)
  );
};

// Risk assessment helpers
export const calculateResidualRisk = (
  originalSeverity: number, 
  originalLikelihood: number, 
  controlEffectiveness: number
): { severity: number; likelihood: number; rating: number } => {
  // Control effectiveness reduces likelihood more than severity
  const newSeverity = Math.max(1, originalSeverity - Math.floor(controlEffectiveness * 0.3));
  const newLikelihood = Math.max(1, originalLikelihood - Math.floor(controlEffectiveness * 0.7));
  
  return {
    severity: newSeverity,
    likelihood: newLikelihood,
    rating: newSeverity * newLikelihood
  };
};

export const getRiskLevel = (rating: number): string => {
  if (rating >= 20) return "Very High";
  if (rating >= 15) return "High";
  if (rating >= 10) return "Medium";
  if (rating >= 5) return "Low";
  return "Very Low";
};

export const getRiskColor = (rating: number): string => {
  if (rating >= 20) return "text-red-500";
  if (rating >= 15) return "text-orange-500";
  if (rating >= 10) return "text-yellow-500";
  if (rating >= 5) return "text-blue-500";
  return "text-green-500";
};