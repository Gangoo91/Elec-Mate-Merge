import { Zap, HardHat, Building2, FlameKindling, Hammer, AlertTriangle, Users, Wind } from "lucide-react";

export interface HazardCategory {
  id: string;
  name: string;
  icon: any;
  color: string;
  hazards: string[];
}

export const hazardCategories: HazardCategory[] = [
  {
    id: "electrical",
    name: "Electrical Hazards",
    icon: Zap,
    color: "text-yellow-400",
    hazards: [
      "Live electrical circuits",
      "Faulty electrical equipment", 
      "Exposed electrical connections",
      "Inadequate earthing",
      "Overloaded circuits",
      "Working in wet conditions near electricity",
      "Arc flash",
      "Electric shock from tools",
      "Lightning during outdoor work",
      "Static electricity discharge"
    ]
  },
  {
    id: "height",
    name: "Working at Height",
    icon: HardHat,
    color: "text-blue-400",
    hazards: [
      "Falls from ladders",
      "Falls from scaffolding",
      "Falls through roof lights",
      "Falls from mobile elevated work platforms",
      "Falls from cherry pickers",
      "Working near unprotected edges",
      "Unstable working platforms",
      "Equipment falling from height",
      "Wind affecting stability at height",
      "Poor visibility at height"
    ]
  },
  {
    id: "asbestos",
    name: "Asbestos & Hazardous Materials",
    icon: AlertTriangle,
    color: "text-red-400",
    hazards: [
      "Disturbing asbestos-containing materials",
      "Exposure to mineral fibres",
      "Chemical exposure from solvents",
      "Lead-based paint disturbance",
      "Silica dust from cutting operations",
      "Inadequate respiratory protection",
      "Poor decontamination procedures",
      "Unlabelled chemical containers",
      "Mixing incompatible chemicals",
      "Inadequate ventilation during chemical use"
    ]
  },
  {
    id: "structural",
    name: "Structural & Building",
    icon: Building2,
    color: "text-gray-400",
    hazards: [
      "Working in confined spaces",
      "Structural instability",
      "Floor/ceiling penetrations",
      "Working in excavations",
      "Overhead obstacles",
      "Unstable temporary structures",
      "Vehicle movements on site",
      "Public access to work areas",
      "Inadequate lighting",
      "Poor housekeeping"
    ]
  },
  {
    id: "fire",
    name: "Fire & Explosion",
    icon: FlameKindling,
    color: "text-orange-400",
    hazards: [
      "Hot work near flammable materials",
      "Sparks from electrical equipment",
      "Gas leaks in vicinity",
      "Overheating electrical components",
      "Flammable adhesives and solvents",
      "Fuel storage areas",
      "Dust accumulation",
      "Blocked fire exits during work",
      "Electrical arcing",
      "Chemical reactions"
    ]
  },
  {
    id: "environmental",
    name: "Environmental",
    icon: Wind,
    color: "text-cyan-400",
    hazards: [
      "Adverse weather conditions",
      "Poor lighting conditions",
      "Noise exposure",
      "Temperature extremes",
      "Humidity and condensation",
      "Air quality issues",
      "Vibration from equipment",
      "UV exposure during outdoor work",
      "Slip and trip hazards",
      "Wildlife/pest encounters"
    ]
  },
  {
    id: "equipment",
    name: "Tools & Equipment",
    icon: Hammer,
    color: "text-purple-400",
    hazards: [
      "Manual handling of heavy equipment",
      "Power tool malfunction",
      "Defective tools",
      "Inadequate maintenance",
      "Using wrong tool for job",
      "Lack of proper guards",
      "Electrical faults in tools",
      "Projectiles from power tools",
      "Cuts from sharp tools",
      "Eye injuries from debris"
    ]
  },
  {
    id: "human",
    name: "Human Factors",
    icon: Users,
    color: "text-green-400",
    hazards: [
      "Inadequate training",
      "Fatigue and stress",
      "Communication failures",
      "Lack of supervision",
      "Pressure to complete work quickly",
      "Working alone",
      "Medical conditions affecting work",
      "Substance abuse",
      "Language barriers",
      "Inexperienced personnel"
    ]
  }
];

// Quick access common hazards across all categories
export const commonHazards: string[] = [
  "Live electrical circuits",
  "Working at height",
  "Manual handling of heavy equipment",
  "Working in wet conditions near electricity",
  "Power tool malfunction",
  "Hot work operations",
  "Confined spaces",
  "Poor lighting conditions",
  "Defective tools",
  "Inadequate training",
  "Vehicle movements on site"
];

export interface RiskConsequence {
  id: string;
  risk: string;
  consequence: string;
  severity: 1 | 2 | 3 | 4 | 5; // 1=Minor, 5=Catastrophic
  likelihood: 1 | 2 | 3 | 4 | 5; // 1=Rare, 5=Almost Certain
  riskRating: number; // severity × likelihood
  suggestedControls?: string[];
  applicableHazards?: string[];
}

// Risk consequences mapping specific outcomes to hazards
export const riskConsequences: RiskConsequence[] = [
  {
    id: "electrical_shock_fatal",
    risk: "Fatal electric shock",
    consequence: "Death or serious injury from contact with live electrical parts",
    severity: 5,
    likelihood: 2,
    riskRating: 10,
    suggestedControls: [
      "Isolation and proving dead procedures",
      "Lock-off/tag-out systems",
      "Appropriate PPE (insulated gloves, tools)",
      "Safe working distances from live parts"
    ],
    applicableHazards: ["Live electrical circuits", "Faulty electrical equipment"]
  },
  {
    id: "electrical_shock_injury",
    risk: "Non-fatal electric shock",
    consequence: "Burns, muscle spasms, or temporary incapacitation",
    severity: 3,
    likelihood: 3,
    riskRating: 9,
    suggestedControls: [
      "RCD protection on all circuits",
      "Insulated tools and equipment",
      "Dry working conditions",
      "Regular PAT testing"
    ],
    applicableHazards: ["Live electrical circuits", "Electric shock from tools"]
  },
  {
    id: "arc_flash_burns",
    risk: "Arc flash incident",
    consequence: "Severe burns from arc flash and blast pressure",
    severity: 4,
    likelihood: 2,
    riskRating: 8,
    suggestedControls: [
      "Arc flash assessment and PPE selection",
      "Remote operation procedures",
      "De-energisation before work",
      "Proper arc-rated clothing"
    ],
    applicableHazards: ["Arc flash", "Electrical arcing"]
  },
  {
    id: "fall_from_height_fatal",
    risk: "Fatal fall from height",
    consequence: "Death from fall >2m or onto hard/sharp surfaces",
    severity: 5,
    likelihood: 2,
    riskRating: 10,
    suggestedControls: [
      "Collective protection (guardrails, safety nets)",
      "Personal fall protection systems",
      "Mobile elevated work platforms",
      "Competent person supervision"
    ],
    applicableHazards: ["Falls from ladders", "Falls from scaffolding", "Working near unprotected edges"]
  },
  {
    id: "fall_from_height_injury",
    risk: "Injury from fall from height",
    consequence: "Broken bones, head injury, or spinal damage",
    severity: 4,
    likelihood: 3,
    riskRating: 12,
    suggestedControls: [
      "Fall arrest systems with energy absorbers",
      "Proper ladder selection and use",
      "Three points of contact rule",
      "Regular inspection of equipment"
    ],
    applicableHazards: ["Falls from ladders", "Falls from mobile elevated work platforms"]
  }
];

export interface EnhancedRiskConsequence {
  id: string;
  hazard: string;
  consequence: string;
  severity: 1 | 2 | 3 | 4 | 5;
  likelihood: 1 | 2 | 3 | 4 | 5;
  riskRating: number;
  controlMeasures: {
    elimination?: string[];
    substitution?: string[];
    engineering?: string[];
    administrative?: string[];
    ppe?: string[];
  };
  bs7671References?: string[];
  category: string;
  workType: string[];
  environment: string[];
  additionalGuidance?: string;
  inspectionRequirements?: string[];
}

// Maintain backwards compatibility
export const enhancedRiskConsequences: EnhancedRiskConsequence[] = [
  // ============= ELECTRICAL HAZARDS =============
  {
    id: "electrical-shock-001",
    hazard: "Live electrical circuits",
    consequence: "Electric shock leading to injury or death",
    severity: 5,
    likelihood: 3,
    riskRating: 15,
    controlMeasures: {
      elimination: ["De-energise circuits before work where possible"],
      substitution: ["Use battery-powered tools instead of mains powered"],
      engineering: ["RCD protection", "Isolation switches", "Warning signs and barriers"],
      administrative: ["Permit to work systems", "Competent person supervision", "Emergency procedures"],
      ppe: ["Insulated gloves", "Safety footwear", "Insulated tools"]
    },
    bs7671References: ["BS 7671:2018+A3:2024 - Section 514"],
    category: "electrical",
    workType: ["installation", "maintenance", "testing"],
    environment: ["indoor", "outdoor"]
  },
  {
    id: "working-height-001", 
    hazard: "Working at height",
    consequence: "Falls resulting in serious injury or death",
    severity: 5,
    likelihood: 2,
    riskRating: 10,
    controlMeasures: {
      elimination: ["Work from ground level where possible"],
      substitution: ["Use mobile elevated work platforms instead of ladders"],
      engineering: ["Edge protection", "Safety nets", "Fall arrest systems"],
      administrative: ["Working at height training", "Rescue procedures", "Weather monitoring"],
      ppe: ["Safety harness", "Hard hat", "Safety footwear"]
    },
    category: "height",
    workType: ["installation", "maintenance"],
    environment: ["outdoor", "industrial"]
  },
  {
    id: "manual-handling-001",
    hazard: "Manual handling of heavy equipment",
    consequence: "Musculoskeletal injury, particularly back strain",
    severity: 3,
    likelihood: 4,
    riskRating: 12,
    controlMeasures: {
      elimination: ["Use mechanical lifting aids where possible"],
      substitution: ["Break down loads into smaller components"],
      engineering: ["Trolleys", "Hoists", "Conveyor systems"],
      administrative: ["Manual handling training", "Team lifting procedures", "Regular breaks"],
      ppe: ["Back support belts", "Safety gloves", "Safety footwear"]
    },
    category: "manual-handling",
    workType: ["installation", "maintenance"],
    environment: ["indoor", "outdoor", "industrial"]
  },
  {
    id: "wet-conditions-001",
    hazard: "Working in wet conditions near electricity",
    consequence: "Increased risk of electric shock and electrocution",
    severity: 5,
    likelihood: 2,
    riskRating: 10,
    controlMeasures: {
      elimination: ["Postpone work until dry conditions"],
      substitution: ["Use 110V or battery tools"],
      engineering: ["Waterproof enclosures", "RCD protection", "IP-rated equipment"],
      administrative: ["Weather monitoring", "Risk assessment updates", "Emergency procedures"],
      ppe: ["Waterproof clothing", "Insulated gloves", "Non-slip footwear"]
    },
    bs7671References: ["BS 7671:2018+A3:2024 - Section 704"],
    category: "electrical",
    workType: ["installation", "maintenance"],
    environment: ["outdoor", "bathroom"]
  },
  {
    id: "power-tool-001",
    hazard: "Power tool malfunction",
    consequence: "Cuts, abrasions, eye injuries, or electric shock",
    severity: 3,
    likelihood: 3,
    riskRating: 9,
    controlMeasures: {
      substitution: ["Use hand tools where appropriate"],
      engineering: ["Guards and safety devices", "Emergency stops", "Regular maintenance"],
      administrative: ["Tool inspection procedures", "Training on correct use", "PAT testing"],
      ppe: ["Safety glasses", "Cut-resistant gloves", "Hearing protection"]
    },
    category: "tools",
    workType: ["installation", "maintenance"],
    environment: ["indoor", "outdoor"]
  },
  {
    id: "confined-space-001",
    hazard: "Confined spaces",
    consequence: "Asphyxiation, toxic gas exposure, or inability to escape",
    severity: 5,
    likelihood: 1,
    riskRating: 5,
    controlMeasures: {
      elimination: ["Work from outside confined space where possible"],
      engineering: ["Ventilation systems", "Gas monitoring", "Emergency escape routes"],
      administrative: ["Confined space permits", "Attendant outside", "Emergency procedures"],
      ppe: ["Breathing apparatus", "Gas detectors", "Safety harness with retrieval line"]
    },
    category: "environmental",
    workType: ["installation", "maintenance"],
    environment: ["confined-space", "underground"]
  },
  {
    id: "asbestos-001",
    hazard: "Disturbing asbestos-containing materials",
    consequence: "Lung disease including mesothelioma and asbestosis",
    severity: 5,
    likelihood: 2,
    riskRating: 10,
    controlMeasures: {
      elimination: ["Asbestos survey before work", "Professional removal where required"],
      engineering: ["Wet cutting/drilling", "Local exhaust ventilation", "Controlled areas"],
      administrative: ["Asbestos awareness training", "Licensed contractor engagement", "Health surveillance"],
      ppe: ["Respiratory protective equipment", "Disposable overalls", "Decontamination procedures"]
    },
    category: "hazardous-materials",
    workType: ["renovation", "maintenance"],
    environment: ["indoor", "domestic"]
  },
  {
    id: "fire-hazard-001",
    hazard: "Hot work near flammable materials",
    consequence: "Fire or explosion causing injury and property damage",
    severity: 4,
    likelihood: 2,
    riskRating: 8,
    controlMeasures: {
      elimination: ["Remove flammable materials from area"],
      substitution: ["Use cold cutting methods where possible"],
      engineering: ["Fire extinguishers", "Fire blankets", "Spark arrestors"],
      administrative: ["Hot work permits", "Fire watch procedures", "Emergency evacuation plans"],
      ppe: ["Fire-resistant clothing", "Face shields", "Heat-resistant gloves"]
    },
    category: "fire",
    workType: ["installation", "maintenance"],
    environment: ["industrial", "commercial"]
  },
  {
    id: "inadequate-earthing-001",
    hazard: "Inadequate earthing",
    consequence: "Electric shock from exposed metalwork during fault conditions",
    severity: 4,
    likelihood: 2,
    riskRating: 8,
    controlMeasures: {
      engineering: ["Proper earthing design", "Equipotential bonding", "Earth monitoring systems"],
      administrative: ["Earth testing procedures", "Regular inspection", "Competent person verification"],
      ppe: ["Insulated tools", "Voltage detectors", "Insulated gloves"]
    },
    bs7671References: ["BS 7671:2018+A3:2024 - Section 542"],
    category: "electrical",
    workType: ["installation", "testing"],
    environment: ["indoor", "outdoor"]
  },
  {
    id: "faulty-equipment-001",
    hazard: "Faulty electrical equipment",
    consequence: "Electric shock, fire, or explosion",
    severity: 4,
    likelihood: 3,
    riskRating: 12,
    controlMeasures: {
      elimination: ["Replace faulty equipment immediately"],
      engineering: ["Regular maintenance schedules", "Condition monitoring", "Protective devices"],
      administrative: ["Equipment inspection procedures", "Fault reporting systems", "Competent maintenance"],
      ppe: ["Insulated tools", "Arc flash protection", "Voltage detectors"]
    },
    category: "electrical",
    workType: ["maintenance", "inspection"],
    environment: ["indoor", "outdoor", "industrial"]
  },
  {
    id: "exposed-connections-001",
    hazard: "Exposed electrical connections",
    consequence: "Electric shock or arc flash from accidental contact",
    severity: 4,
    likelihood: 3,
    riskRating: 12,
    controlMeasures: {
      elimination: ["Complete installation before energising"],
      engineering: ["Proper enclosures", "IP-rated protection", "Barrier systems"],
      administrative: ["Warning signs", "Restricted access", "Competent person supervision"],
      ppe: ["Insulated gloves", "Safety glasses", "Arc flash protection"]
    },
    bs7671References: ["BS 7671:2018+A3:2024 - Section 416"],
    category: "electrical",
    workType: ["installation", "maintenance"],
    environment: ["indoor", "outdoor"]
  },
  {
    id: "overloaded-circuits-001",
    hazard: "Overloaded circuits",
    consequence: "Fire from overheating cables and connections",
    severity: 4,
    likelihood: 3,
    riskRating: 12,
    controlMeasures: {
      engineering: ["Proper circuit protection", "Load monitoring", "Cable sizing calculations"],
      administrative: ["Regular thermal imaging", "Load assessments", "Circuit modifications"],
      ppe: ["Fire extinguishers", "Thermal imaging equipment", "Insulated tools"]
    },
    bs7671References: ["BS 7671:2018+A3:2024 - Section 433"],
    category: "electrical",
    workType: ["design", "installation", "maintenance"],
    environment: ["indoor", "commercial", "industrial"]
  },
  {
    id: "arc-flash-001",
    hazard: "Arc flash",
    consequence: "Severe burns and blast injuries from electrical arc",
    severity: 5,
    likelihood: 1,
    riskRating: 5,
    controlMeasures: {
      elimination: ["De-energise equipment before work"],
      engineering: ["Arc flash detection", "Remote operation", "Proper equipment spacing"],
      administrative: ["Arc flash studies", "Hazard labelling", "Specialised training"],
      ppe: ["Arc flash suits", "Face shields", "Insulated tools"]
    },
    category: "electrical",
    workType: ["maintenance", "testing"],
    environment: ["industrial", "commercial"]
  },
  {
    id: "vehicle-movements-001",
    hazard: "Vehicle movements on site",
    consequence: "Crushing injuries or fatalities from vehicle strikes",
    severity: 5,
    likelihood: 2,
    riskRating: 10,
    controlMeasures: {
      elimination: ["Segregate pedestrians from vehicles"],
      engineering: ["Physical barriers", "Warning systems", "Reversing cameras"],
      administrative: ["Traffic management plans", "Banksman procedures", "High-visibility clothing"],
      ppe: ["High-visibility vests", "Hard hats", "Safety footwear"]
    },
    category: "site-safety",
    workType: ["installation", "maintenance"],
    environment: ["outdoor", "construction-site"]
  },
  {
    id: "poor-lighting-001",
    hazard: "Poor lighting conditions",
    consequence: "Trips, falls, cuts, or inability to identify hazards",
    severity: 3,
    likelihood: 4,
    riskRating: 12,
    controlMeasures: {
      engineering: ["Adequate temporary lighting", "Emergency lighting systems", "Task lighting"],
      administrative: ["Lighting assessments", "Work scheduling during daylight", "Regular bulb replacement"],
      ppe: ["Head torches", "High-visibility clothing", "Non-slip footwear"]
    },
    category: "environmental",
    workType: ["installation", "maintenance"],
    environment: ["indoor", "outdoor", "confined-space"]
  },
  {
    id: "defective-tools-001",
    hazard: "Defective tools",
    consequence: "Cuts, electric shock, or inability to work safely",
    severity: 3,
    likelihood: 3,
    riskRating: 9,
    controlMeasures: {
      elimination: ["Remove defective tools from service"],
      engineering: ["Regular maintenance", "Quality tools", "Proper storage"],
      administrative: ["Daily inspection procedures", "Tool replacement schedules", "User training"],
      ppe: ["Cut-resistant gloves", "Safety glasses", "Insulated tools"]
    },
    category: "tools",
    workType: ["installation", "maintenance"],
    environment: ["indoor", "outdoor"]
  },
  {
    id: "inadequate-training-001",
    hazard: "Inadequate training",
    consequence: "Increased likelihood of accidents and poor work quality",
    severity: 3,
    likelihood: 3,
    riskRating: 9,
    controlMeasures: {
      administrative: ["Competency assessments", "Formal training programmes", "Mentoring systems", "Regular refresher training"],
      ppe: ["Training in correct PPE use", "Supervision until competent"]
    },
    category: "human-factors",
    workType: ["all"],
    environment: ["all"]
  },
  {
    id: "hot-work-001",
    hazard: "Hot work operations",
    consequence: "Burns, fire, or explosion from welding/cutting operations",
    severity: 4,
    likelihood: 2,
    riskRating: 8,
    controlMeasures: {
      elimination: ["Use mechanical joining methods where possible"],
      engineering: ["Ventilation systems", "Fire suppression", "Spark arrestors"],
      administrative: ["Hot work permits", "Fire watch", "Area clearance procedures"],
      ppe: ["Welding masks", "Fire-resistant clothing", "Heat-resistant gloves"]
    },
    category: "fire",
    workType: ["installation", "maintenance"],
    environment: ["industrial", "commercial"]
  }
];

// Get workplace-specific hazards
export const getScenarioHazards = (scenarioId: string) => {
  // For backwards compatibility, return empty array
  return [];
};