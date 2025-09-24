import { EnhancedRiskConsequence } from "./hazards";

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
    controlMeasures: {
      elimination: ["Design out live work through pre-planning", "Use alternative methods (dead working)"],
      engineering: ["Isolation and lock-off procedures (BS7671 Regulation 514.11)", "Proving unit dead with approved voltage detector (GS38)", "Safe working distances from live parts (minimum 600mm)"],
      administrative: ["Two-person working rule for high-risk activities", "Emergency resuscitation equipment readily available"],
      ppe: ["Use of appropriate PPE including insulated gloves to BS EN 60903"]
    },
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
    controlMeasures: {
      engineering: ["Main protective bonding to BS7671 Section 544", "Installation of RCD protection (411.3.3)"],
      administrative: ["Earth continuity testing with appropriate instruments", "Visual inspection of bonding conductors", "Supplementary bonding in special locations (701.415.2)"]
    },
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
    controlMeasures: {
      elimination: ["Use alternative cable routes above ground where possible"],
      engineering: ["Cable location using CAT and Genny equipment", "Ground penetrating radar for complex sites"],
      administrative: ["Coordination with DNO for cable plans", "Permit to dig system implementation", "Hand digging within 1m of suspected cables"],
      ppe: ["Use of insulated tools and equipment"]
    },
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
    controlMeasures: {
      elimination: ["Use underground routes where possible"],
      engineering: ["Minimum 3m clearance from 11kV lines (6m for 33kV)", "Use of goal post barriers and warning signs"],
      administrative: ["Coordination with DNO for line identification", "Banksman for crane and high access operations", "Emergency response procedures", "Staff training on overhead line hazards"]
    },
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
    controlMeasures: {
      engineering: ["Installation of Arc Fault Detection Devices (AFDDs) - 421.1.7", "Fire suppression systems in electrical rooms"],
      administrative: ["Regular thermal imaging inspections", "Torque checking of connections annually", "Replacement of aging switchgear and cables", "Emergency isolation procedures"]
    },
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
    controlMeasures: {
      engineering: ["Mechanical ventilation systems", "Emergency communication systems"],
      administrative: ["Confined space risk assessment and permits", "Atmospheric monitoring (oxygen, toxic gases)", "Emergency rescue procedures and equipment", "Two-person minimum working team"]
    },
    bs7671References: ["Part 7 - Special installations", "706 - Conducting locations with restricted movement"],
    category: "confined-space",
    workType: ["maintenance", "installation", "inspection"],
    environment: ["underground", "confined-space"]
  },
  {
    id: "falls-height-001",
    hazard: "Falls from height during electrical work",
    consequence: "Fatal injuries, broken bones, permanent disability, head trauma",
    likelihood: 4,
    severity: 4,
    riskRating: 16,
    controlMeasures: {
      engineering: ["Edge protection and guardrails to BS EN 13374", "Mobile elevated work platforms (MEWPs)", "Scaffolding designed by competent person"],
      administrative: ["Emergency rescue procedures"],
      ppe: ["Full body harness and fall arrest systems", "Tool tethering systems"]
    },
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
    controlMeasures: {
      engineering: ["Mechanical lifting aids (cranes, hoists, trolleys)"],
      administrative: ["Team lifting procedures for items >25kg", "Training in safe lifting techniques", "Route planning and obstacle removal", "Regular health surveillance"],
      ppe: ["Personal protective equipment"]
    },
    bs7671References: [],
    category: "manual-handling",
    workType: ["installation", "maintenance"],
    environment: ["indoor", "outdoor", "industrial"]
  },
  {
    id: "fire-elec-001",
    hazard: "Electrical fire from overloaded circuits",
    consequence: "Building fire, smoke inhalation, property damage, business interruption",
    likelihood: 3,
    severity: 4,
    riskRating: 12,
    controlMeasures: {
      engineering: ["Circuit protection devices sized to BS7671 Appendix 4", "Fire detection and suppression systems"],
      administrative: ["Load calculations and circuit design review", "Regular thermal imaging inspections", "Emergency isolation procedures", "Staff fire safety training"]
    },
    bs7671References: ["433 - Protection against overcurrent", "Appendix 4 - Current-carrying capacity"],
    category: "fire",
    workType: ["installation", "design", "maintenance"],
    environment: ["commercial", "domestic", "industrial"]
  },
  {
    id: "consumer-unit-001",
    hazard: "Consumer unit upgrade in old property with unknown wiring",
    consequence: "Electric shock, fire risk, non-compliance, insurance issues",
    likelihood: 3,
    severity: 3,
    riskRating: 9,
    controlMeasures: {
      engineering: ["RCD protection for all circuits (411.3.3)", "SPD installation where required (443.4)"],
      administrative: ["Full electrical installation condition report (EICR)", "Circuit identification and testing", "Proper earthing and bonding verification", "Building Control notification"]
    },
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
    controlMeasures: {
      engineering: ["Zone classification per BS7671 Section 701", "IPX4 minimum rating for Zone 1 equipment", "30mA RCD protection for all circuits", "Supplementary bonding of metalwork", "SELV systems where appropriate"],
      administrative: ["No switches in Zones 0, 1, or 2"]
    },
    bs7671References: ["701 - Locations containing a bath or shower", "701.415.2 - Supplementary bonding"],
    category: "special-locations",
    workType: ["installation", "maintenance"],
    environment: ["bathroom", "domestic"]
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
    id: "underground-cable-installation",
    name: "Underground Cable Installation",
    description: "Installation of underground electrical supply cables",
    commonHazards: ["cable-strike-001", "confined-space-001", "manual-handling-001", "overhead-contact-001"],
    environment: "outdoor",
    riskLevel: "high", 
    requiredCompetencies: ["Cable jointing", "DNO liaison", "Excavation safety"],
    typicalDuration: "1-2 weeks"
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
      Object.values(hazard.controlMeasures).flat().some(control => control?.toLowerCase().includes(term))
    );
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