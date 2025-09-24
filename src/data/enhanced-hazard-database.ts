import { EnhancedRiskConsequence } from "./hazards";

// 🚀 COMPREHENSIVE ENHANCED RISK DATABASE - ELECTRICAL SAFETY EXCELLENCE
export const enhancedRiskDatabase: EnhancedRiskConsequence[] = [
  // ⚡ Critical Electrical Hazards
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
  
  // 🚀 NEW ENHANCED ELECTRICAL HAZARDS FOR COMPREHENSIVE SAFETY
  {
    id: "ev-charging-001",
    hazard: "EV charging point installation hazards",
    consequence: "High current electric shock, DC arc fault, fire from overloaded supply",
    likelihood: 2,
    severity: 4,
    riskRating: 8,
    controlMeasures: {
      engineering: ["Type A RCD protection (30mA)", "DC isolation devices", "Surge protection devices", "Load monitoring systems"],
      administrative: ["DNO notification for loads >7kW", "Electrical capacity calculations", "Installation certification", "User training on safe operation"],
      ppe: ["Arc flash PPE for high-power installations", "Insulated tools", "Voltage detectors"]
    },
    bs7671References: ["722 - Electric vehicle charging installations", "411.3.3 - RCD protection"],
    category: "electrical",
    workType: ["installation", "commissioning"],
    environment: ["domestic", "commercial", "outdoor"]
  },
  {
    id: "smart-home-001",
    hazard: "Smart home system integration risks",
    consequence: "Cyber security vulnerabilities, electrical interference, system failures",
    likelihood: 3,
    severity: 2,
    riskRating: 6,
    controlMeasures: {
      engineering: ["Network security protocols", "Isolated smart circuits", "Proper earthing for data systems"],
      administrative: ["Cybersecurity training", "Regular software updates", "Network monitoring", "Data protection compliance"],
      ppe: ["Anti-static equipment", "Network testing tools"]
    },
    bs7671References: ["Part 4 - Protection for safety", "Section 444 - Protection against electromagnetic disturbances"],
    category: "electrical",
    workType: ["installation", "commissioning", "maintenance"],
    environment: ["domestic", "commercial"]
  },
  {
    id: "solar-battery-001", 
    hazard: "Solar PV and battery storage system risks",
    consequence: "DC electric shock, fire from thermal runaway, toxic gas release",
    likelihood: 2,
    severity: 4,
    riskRating: 8,
    controlMeasures: {
      elimination: ["Use inherently safe battery chemistries where possible"],
      engineering: ["Battery management systems", "Fire suppression in battery areas", "DC isolation at multiple points", "Ventilation for battery rooms"],
      administrative: ["Manufacturer training", "Emergency response procedures", "Regular thermal monitoring", "G99 grid connection compliance"],
      ppe: ["Arc flash protection", "Breathing apparatus for battery areas", "Thermal monitoring equipment"]
    },
    bs7671References: ["712 - Solar photovoltaic power supply systems", "Section 534 - Devices for protection against overvoltage"],
    category: "renewable-energy",
    workType: ["installation", "maintenance", "commissioning"],
    environment: ["domestic", "commercial", "outdoor"]
  },
  {
    id: "data-centre-001",
    hazard: "Data centre electrical maintenance",
    consequence: "Critical system failure, electric shock from high-density power, business interruption",
    likelihood: 2,
    severity: 5,
    riskRating: 10,
    controlMeasures: {
      engineering: ["Redundant power systems", "UPS systems", "Environmental monitoring", "Hot-swappable components"],
      administrative: ["Change control procedures", "24/7 monitoring", "Maintenance windows", "Business continuity planning"],
      ppe: ["ESD protection", "High-voltage rated PPE", "Environmental suits"]
    },
    bs7671References: ["Section 560 - Safety services", "Part 4 - Protection for safety"],
    category: "electrical",
    workType: ["maintenance", "upgrade", "emergency-repair"],
    environment: ["commercial", "industrial"]
  },
  {
    id: "street-lighting-001",
    hazard: "Street lighting and highway electrical work",
    consequence: "Vehicle strike, electrocution from damaged cables, public safety risks",
    likelihood: 3,
    severity: 4,
    riskRating: 12,
    controlMeasures: {
      engineering: ["Traffic management systems", "Crash barriers", "Underground cable protection", "LED conversion for safety"],
      administrative: ["Highway authority coordination", "Public notifications", "Night working procedures", "Emergency contact systems"],
      ppe: ["High-visibility clothing", "Traffic management equipment", "Fall protection for column work"]
    },
    bs7671References: ["714 - Outdoor lighting installations", "Part 7 - Special installations"],
    category: "public-infrastructure",
    workType: ["installation", "maintenance", "emergency-repair"],
    environment: ["outdoor", "public-highway"]
  },
  {
    id: "temporary-supply-001",
    hazard: "Temporary electrical supplies and site power",
    consequence: "Electrocution from damaged temporary cables, fire from overloading",
    likelihood: 4,
    severity: 4,
    riskRating: 16,
    controlMeasures: {
      engineering: ["RCD protection on all temporary circuits", "Armoured cables", "Weather-resistant equipment", "Load monitoring"],
      administrative: ["Daily visual inspections", "Competent person supervision", "Weather monitoring", "Load management"],
      ppe: ["Waterproof PPE", "Non-slip footwear", "Portable RCD testers"]
    },
    bs7671References: ["704 - Construction and demolition site installations", "Section 411 - Protective measures"],
    category: "temporary-installation", 
    workType: ["installation", "maintenance"],
    environment: ["construction-site", "outdoor", "temporary"]
  },
  {
    id: "heritage-building-001",
    hazard: "Electrical work in heritage/listed buildings",
    consequence: "Structural damage, fire risk to irreplaceable heritage, regulatory prosecution",
    likelihood: 2,
    severity: 4,
    riskRating: 8,
    controlMeasures: {
      engineering: ["Minimal intervention techniques", "Compatible materials", "Fire-resistant cable systems", "Discrete installation methods"],
      administrative: ["Conservation officer approval", "Heritage impact assessments", "Specialist contractor requirements", "Planning permissions"],
      ppe: ["Clean tools to avoid marking", "Dust protection", "Minimal impact equipment"]
    },
    bs7671References: ["Part 5 - Selection and erection", "522 - Selection and erection of wiring systems"],
    category: "specialist-installation",
    workType: ["installation", "maintenance", "upgrade"],
    environment: ["heritage", "domestic", "commercial"]
  },
  {
    id: "agricultural-001",
    hazard: "Agricultural electrical installations", 
    consequence: "Livestock electric shock, fire in agricultural buildings, equipment damage from harsh environments",
    likelihood: 3,
    severity: 4,
    riskRating: 12,
    controlMeasures: {
      engineering: ["RCBO protection for each circuit", "IP65 rated equipment", "Corrosion-resistant materials", "Livestock-safe cable routes"],
      administrative: ["Veterinary liaison", "Farmer training", "Regular inspection schedules", "Emergency isolation procedures"],
      ppe: ["Waterproof equipment", "Respiratory protection", "Slip-resistant footwear"]
    },
    bs7671References: ["705 - Agricultural and horticultural premises", "Section 537 - Isolation and switching"],
    category: "agricultural",
    workType: ["installation", "maintenance"],
    environment: ["rural", "outdoor", "harsh-environment"]
  },
  {
    id: "marine-electrical-001",
    hazard: "Marine and waterside electrical installations",
    consequence: "Electrocution in water, galvanic corrosion, environmental damage",
    likelihood: 2,
    severity: 5,
    riskRating: 10,
    controlMeasures: {
      engineering: ["Isolation transformers", "Galvanic isolation", "Marine-grade equipment", "30mA RCD protection"],
      administrative: ["Marine electrical certification", "Environmental permits", "Tide monitoring", "Emergency marine procedures"],
      ppe: ["Marine safety equipment", "Buoyancy aids", "Waterproof communications"]
    },
    bs7671References: ["709 - Marinas and similar locations", "Section 411 - Protective measures"],
    category: "marine",
    workType: ["installation", "maintenance"],
    environment: ["marine", "waterside", "outdoor"]
  }
];

// 🚀 ENHANCED WORKPLACE SCENARIOS - Comprehensive and Realistic
export const workplaceScenarios = [
  {
    id: "domestic-rewire",
    name: "Domestic Property Rewire", 
    description: "Full electrical installation in residential property including consumer unit upgrade",
    commonHazards: ["elec-shock-001", "consumer-unit-001", "manual-handling-001", "falls-height-001"],
    environment: "domestic",
    riskLevel: "medium",
    requiredCompetencies: ["Part P notification", "Building Control liaison", "Consumer unit installation"],
    typicalDuration: "3-7 days",
    specialConsiderations: ["Asbestos survey for pre-1980 properties", "Temporary supply arrangements", "Customer liaison"]
  },
  {
    id: "commercial-ev-charging",
    name: "Commercial EV Charging Installation",
    description: "High-power EV charging infrastructure for commercial premises",
    commonHazards: ["ev-charging-001", "elec-shock-001", "three-phase-001", "cable-strike-001"],
    environment: "commercial",
    riskLevel: "high",
    requiredCompetencies: ["EV charging certification", "DNO applications", "Load calculations"],
    typicalDuration: "2-5 days",
    specialConsiderations: ["Grid capacity assessments", "Future expansion planning", "User training requirements"]
  },
  {
    id: "heritage-building-upgrade",
    name: "Heritage Building Electrical Upgrade",
    description: "Sensitive electrical work in listed or heritage buildings",
    commonHazards: ["heritage-building-001", "elec-shock-001", "confined-space-001", "manual-handling-001"],
    environment: "heritage",
    riskLevel: "high",
    requiredCompetencies: ["Conservation training", "Heritage regulations", "Specialist techniques"],
    typicalDuration: "2-6 weeks",
    specialConsiderations: ["Planning permissions", "Conservation officer liaison", "Minimal intervention techniques"]
  },
  {
    id: "agricultural-installation",
    name: "Agricultural Electrical Installation",
    description: "Electrical systems for farming and agricultural environments",
    commonHazards: ["agricultural-001", "elec-shock-001", "manual-handling-001", "confined-space-001"],
    environment: "agricultural",
    riskLevel: "high",
    requiredCompetencies: ["Agricultural regulations", "Livestock safety", "Environmental protection"],
    typicalDuration: "1-3 weeks",
    specialConsiderations: ["Livestock safety", "Environmental permits", "Weather dependency"]
  },
  {
    id: "temporary-event-power",
    name: "Temporary Event Power Supply",
    description: "Temporary electrical installations for events and construction",
    commonHazards: ["temporary-supply-001", "elec-shock-001", "manual-handling-001", "overhead-contact-001"],
    environment: "temporary",
    riskLevel: "very-high",
    requiredCompetencies: ["Temporary installation expertise", "Event safety", "Emergency procedures"],
    typicalDuration: "1-3 days",
    specialConsiderations: ["Weather monitoring", "Public safety", "Rapid deployment/removal"]
  },
  {
    id: "marine-electrical",
    name: "Marine Electrical Installation",
    description: "Electrical systems for marinas, boats, and waterside facilities",
    commonHazards: ["marine-electrical-001", "elec-shock-001", "confined-space-001", "manual-handling-001"],
    environment: "marine",
    riskLevel: "very-high",
    requiredCompetencies: ["Marine electrical certification", "Galvanic corrosion prevention", "Marine safety"],
    typicalDuration: "3-10 days",
    specialConsiderations: ["Tidal access", "Corrosion protection", "Environmental regulations"]
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
  "722": {
    title: "Electric vehicle charging installations",
    description: "Special requirements for EV charging equipment",
    section: "Part 7 - Requirements for special installations or locations"
  },
  "712": {
    title: "Solar photovoltaic power supply systems",
    description: "Requirements for solar PV installations",
    section: "Part 7 - Requirements for special installations or locations"
  },
  "705": {
    title: "Agricultural and horticultural premises",
    description: "Special requirements for farming environments",
    section: "Part 7 - Requirements for special installations or locations"
  },
  "709": {
    title: "Marinas and similar locations",
    description: "Requirements for marine electrical installations",
    section: "Part 7 - Requirements for special installations or locations"
  }
};