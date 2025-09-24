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
      "Asbestos in ceiling tiles",
      "Asbestos in pipe lagging",
      "Asbestos in electrical panels",
      "Fibreglass insulation",
      "Lead paint",
      "Mineral wool",
      "Chemical vapours",
      "Dust inhalation",
      "Contaminated surfaces"
    ]
  },
  {
    id: "manual",
    name: "Manual Handling",
    icon: Hammer,
    color: "text-green-400",
    hazards: [
      "Heavy lifting of equipment",
      "Awkward lifting positions",
      "Repetitive movements",
      "Pulling cables through conduits",
      "Moving electrical panels",
      "Carrying tools up stairs",
      "Working in confined spaces",
      "Prolonged kneeling or crouching",
      "Overhead cable installation",
      "Team lifting coordination"
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
      "UV exposure",
      "Slippery surfaces",
      "Confined spaces",
      "Poor ventilation",
      "Flooding or water ingress",
      "Unstable ground conditions"
    ]
  },
  {
    id: "equipment",
    name: "Tools & Equipment",
    icon: Building2,
    color: "text-purple-400",
    hazards: [
      "Defective hand tools",
      "Power tool malfunction",
      "Inadequate PPE",
      "Incorrect tool selection",
      "Electrical testing equipment faults",
      "Cutting and drilling operations",
      "Compressed air equipment",
      "Vehicle and plant movements",
      "Lifting equipment failure",
      "Calibration issues with test equipment"
    ]
  },
  {
    id: "human",
    name: "Human Factors",
    icon: Users,
    color: "text-pink-400",
    hazards: [
      "Inadequate training",
      "Communication failures",
      "Fatigue and stress",
      "Rushing to meet deadlines",
      "Working alone",
      "Language barriers",
      "Inexperienced personnel",
      "Health conditions affecting work",
      "Distraction and complacency",
      "Poor supervision"
    ]
  }
];

export const commonHazards = [
  "Live electrical circuits",
  "Working at height",
  "Asbestos-containing materials", 
  "Manual handling of heavy equipment",
  "Hot work operations",
  "Confined spaces",
  "Poor lighting conditions",
  "Defective tools",
  "Inadequate training",
  "Vehicle movements on site"
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
export interface RiskConsequence {
  id: string;
  hazardId: string;
  consequence: string;
  defaultControlMeasures: string[];
}

export const enhancedRiskConsequences: EnhancedRiskConsequence[] = [
  // ============= ELECTRICAL HAZARDS =============
  {
    id: "elec_shock_circuits",
    hazardId: "Live electrical circuits",
    consequence: "Electric shock leading to injury or death",
    severity: 5,
    likelihood: 3,
    riskRating: 15,
    controlMeasures: {
      elimination: ["Work on de-energised circuits wherever possible"],
      engineering: [
        "Install permanent isolation switches",
        "Use voltage indicator to prove dead",
        "Apply locks and tags to isolation points"
      ],
      administrative: [
        "Follow permit to work procedures",
        "Implement safe system of work",
        "Ensure competent person supervision"
      ],
      ppe: [
        "Insulated gloves rated for voltage",
        "Arc flash protection suit",
        "Safety footwear with electrical protection"
      ]
    },
    bs7671References: ["Section 514 - Identification", "Section 537 - Isolation and switching"],
    inspectionRequirements: ["Visual inspection of isolation", "Voltage testing before work"]
  },
  {
    id: "elec_shock_exposed",
    hazardId: "Exposed electrical connections",
    consequence: "Electrical burns from arc flash or direct contact",
    severity: 4,
    likelihood: 2,
    riskRating: 8,
    controlMeasures: {
      engineering: [
        "Install appropriate barriers and enclosures",
        "Use IP-rated equipment for environment",
        "Maintain minimum approach distances"
      ],
      administrative: [
        "Regular inspection and maintenance",
        "Warning signs and labels",
        "Restricted access procedures"
      ],
      ppe: [
        "Arc flash rated clothing",
        "Face shields and safety glasses",
        "Insulated tools rated for voltage"
      ]
    },
    bs7671References: ["Section 416 - Provisions for basic protection", "Section 521 - Selection and erection of wiring systems"],
    inspectionRequirements: ["Initial verification", "Periodic inspection every 5 years"]
  },
  {
    id: "elec_overload",
    hazardId: "Overloaded circuits",
    consequence: "Electrical fire causing property damage and potential injury",
    severity: 4,
    likelihood: 3,
    riskRating: 12,
    controlMeasures: {
      elimination: ["Design circuits for maximum expected load plus 25% margin"],
      engineering: [
        "Install appropriate protective devices (MCBs/RCBOs)",
        "Use correctly rated cables for load",
        "Provide adequate ventilation for equipment"
      ],
      administrative: [
        "Load calculations before installation",
        "Regular thermal imaging inspections",
        "Load monitoring systems"
      ]
    },
    bs7671References: ["Section 433 - Protection against overcurrent", "Section 523 - Current-carrying capacity"],
    inspectionRequirements: ["Thermal imaging annual", "Load testing during commissioning"]
  },
  {
    id: "elec_wet_conditions",
    hazardId: "Working in wet conditions near electricity",
    consequence: "Increased risk of electrocution due to reduced body resistance",
    severity: 5,
    likelihood: 2,
    riskRating: 10,
    controlMeasures: {
      elimination: ["Postpone work until dry conditions where possible"],
      engineering: [
        "Use 110V or battery tools only",
        "Install temporary weatherproof enclosures",
        "Ensure all circuits have 30mA RCD protection"
      ],
      administrative: [
        "Weather monitoring procedures",
        "Stop work protocols for severe weather",
        "Emergency procedures for electrical incidents"
      ],
      ppe: [
        "Waterproof insulated gloves",
        "Non-slip safety footwear",
        "Waterproof arc flash protection"
      ]
    },
    bs7671References: ["Section 704 - Construction and demolition sites", "Section 411.3.3 - Additional protection"],
    inspectionRequirements: ["Daily RCD testing", "Equipment inspection before use"]
  },

  // ============= WORKING AT HEIGHT =============
  {
    id: "height_fall_ladder",
    hazardId: "Falls from ladders",
    consequence: "Fall from height causing serious injury or death",
    severity: 5,
    likelihood: 3,
    riskRating: 15,
    controlMeasures: {
      elimination: ["Use mobile elevated work platforms instead of ladders where possible"],
      substitution: ["Use scaffold towers for extended work"],
      engineering: [
        "Ladder stabilisers and foot spreaders",
        "Roof ladder hooks and crawling boards",
        "Fall arrest systems for ladder work over 2m"
      ],
      administrative: [
        "Pre-use ladder inspection checklist",
        "3:1 angle ratio setup",
        "Competent person supervision",
        "Weather conditions assessment"
      ],
      ppe: [
        "Full body harness with shock absorbing lanyard",
        "Non-slip safety footwear",
        "Hard hat with chin strap"
      ]
    },
    bs7671References: ["HSE Working at Height Regulations 2005"],
    additionalGuidance: "Ladder work should be limited to light work of short duration (30 minutes maximum)",
    inspectionRequirements: ["Daily ladder inspection", "Weekly formal inspection", "Annual thorough examination"]
  },
  {
    id: "height_fall_scaffold",
    hazardId: "Falls from scaffolding",
    consequence: "Severe injury or death from uncontrolled fall",
    severity: 5,
    likelihood: 2,
    riskRating: 10,
    controlMeasures: {
      engineering: [
        "Guardrails at 950mm height minimum",
        "Intermediate rails and toe boards",
        "Scaffold boarding to prevent gaps",
        "Scaffold tags and inspection records"
      ],
      administrative: [
        "Competent scaffolder erection/inspection",
        "Daily scaffold inspection by competent person",
        "Green tag system before use",
        "Weather-related access restrictions"
      ],
      ppe: [
        "Fall arrest harness when working near edges",
        "Safety footwear with good grip",
        "Hard hat protection"
      ]
    },
    inspectionRequirements: ["Daily visual inspection", "Weekly competent person inspection", "After adverse weather"]
  },
  {
    id: "height_objects",
    hazardId: "Equipment falling from height",
    consequence: "Injury to personnel below from falling objects",
    severity: 4,
    likelihood: 3,
    riskRating: 12,
    controlMeasures: {
      engineering: [
        "Tool lanyards for all hand tools",
        "Secure storage containers with lids",
        "Debris netting installation",
        "Exclusion zones marked below work"
      ],
      administrative: [
        "Dropped object prevention procedures",
        "Coordination with other trades",
        "Regular housekeeping inspections",
        "Emergency procedures for dropped objects"
      ],
      ppe: [
        "Hard hats for all personnel in area",
        "High visibility clothing",
        "Safety footwear with metatarsal protection"
      ]
    },
    inspectionRequirements: ["Daily tool and equipment inspection", "Exclusion zone monitoring"]
  },

  // ============= ASBESTOS & HAZARDOUS MATERIALS =============
  {
    id: "asbestos_disturbance",
    hazardId: "Disturbing asbestos-containing materials",
    consequence: "Lung disease from asbestos fibre inhalation (mesothelioma, asbestosis)",
    severity: 5,
    likelihood: 2,
    riskRating: 10,
    controlMeasures: {
      elimination: ["Asbestos survey and register before work", "Use licensed contractors for removal"],
      engineering: [
        "Wet cutting methods to suppress fibres",
        "Local exhaust ventilation",
        "Controlled waste disposal procedures"
      ],
      administrative: [
        "Asbestos awareness training for all staff",
        "Work method statements for asbestos work",
        "Health surveillance programme",
        "Record keeping for exposure"
      ],
      ppe: [
        "Type 5 disposable coveralls",
        "P3 respiratory protection",
        "Disposable gloves and overshoes"
      ]
    },
    bs7671References: ["HSE Control of Asbestos Regulations 2012"],
    additionalGuidance: "Stop work immediately if suspected asbestos discovered",
    inspectionRequirements: ["Air monitoring during work", "Clearance testing after completion"]
  },
  {
    id: "chemical_vapours",
    hazardId: "Chemical vapours",
    consequence: "Respiratory problems from chemical inhalation",
    severity: 3,
    likelihood: 3,
    riskRating: 9,
    controlMeasures: {
      substitution: ["Use water-based alternatives where possible"],
      engineering: [
        "Adequate natural or mechanical ventilation",
        "Local exhaust ventilation for confined spaces",
        "Gas detection equipment"
      ],
      administrative: [
        "COSHH assessments for all chemicals",
        "Safety data sheet review",
        "Limited exposure time procedures",
        "Emergency procedures for exposure"
      ],
      ppe: [
        "Appropriate respiratory protection (A1P2 filters minimum)",
        "Chemical resistant gloves",
        "Eye protection"
      ]
    },
    inspectionRequirements: ["Air quality monitoring", "PPE inspection before use"]
  },

  // ============= MANUAL HANDLING =============
  {
    id: "manual_heavy_lifting",
    hazardId: "Heavy lifting of equipment",
    consequence: "Musculoskeletal injury from manual handling",
    severity: 3,
    likelihood: 4,
    riskRating: 12,
    controlMeasures: {
      elimination: ["Use mechanical lifting aids wherever possible"],
      substitution: ["Break down loads into smaller components"],
      engineering: [
        "Trolleys, sack trucks, and lifting equipment",
        "Height-adjustable work surfaces",
        "Good lighting for lifting areas"
      ],
      administrative: [
        "Manual handling assessments",
        "Team lifting procedures for loads over 25kg",
        "Training in safe lifting techniques",
        "Job rotation to prevent repetitive strain"
      ],
      ppe: [
        "Back support belts where assessed as necessary",
        "Non-slip safety footwear",
        "Cut-resistant gloves for sharp-edged loads"
      ]
    },
    additionalGuidance: "Maximum individual lift 25kg, team lift for anything heavier",
    inspectionRequirements: ["Regular review of lifting procedures", "Equipment inspection"]
  },

  // ============= FIRE & EXPLOSION =============
  {
    id: "fire_hot_work",
    hazardId: "Hot work near flammable materials",
    consequence: "Fire or explosion causing serious injury and property damage",
    severity: 5,
    likelihood: 2,
    riskRating: 10,
    controlMeasures: {
      elimination: ["Remove all flammable materials from 10m radius"],
      engineering: [
        "Fire blankets and barriers",
        "Spark arrestors on equipment",
        "Automatic fire suppression systems"
      ],
      administrative: [
        "Hot work permit system",
        "Fire watch during and 2 hours after work",
        "Emergency procedures and evacuation routes",
        "Coordination with site fire marshal"
      ],
      ppe: [
        "Fire-resistant clothing",
        "Safety glasses or face shields",
        "Heat-resistant gloves"
      ]
    },
    inspectionRequirements: ["Pre-work fire risk assessment", "Continuous monitoring during work", "Post-work inspection"]
  },

  // ============= ENVIRONMENTAL =============
  {
    id: "env_weather",
    hazardId: "Adverse weather conditions",
    consequence: "Exposure-related illness, hypothermia, heat stroke, or weather-related accidents",
    severity: 3,
    likelihood: 3,
    riskRating: 9,
    controlMeasures: {
      administrative: [
        "Weather monitoring and forecasting",
        "Work suspension procedures for severe weather",
        "Hydration and rest break schedules",
        "Emergency procedures for weather incidents"
      ],
      ppe: [
        "Weather-appropriate clothing layers",
        "High-visibility waterproof clothing",
        "Sun protection (hat, sunscreen, glasses)",
        "Insulated gloves for cold conditions"
      ]
    },
    additionalGuidance: "Stop outdoor work in winds over 39mph or lightning within 10 miles",
    inspectionRequirements: ["Regular weather monitoring", "PPE condition checks"]
  },
  {
    id: "env_confined_space",
    hazardId: "Confined spaces",
    consequence: "Asphyxiation, toxic gas exposure, or inability to escape in emergency",
    severity: 5,
    likelihood: 2,
    riskRating: 10,
    controlMeasures: {
      elimination: ["Work from outside confined space where possible"],
      engineering: [
        "Continuous forced air ventilation",
        "Gas detection and monitoring equipment",
        "Emergency retrieval systems",
        "Communication systems"
      ],
      administrative: [
        "Confined space entry permits",
        "Standby person at entrance at all times",
        "Emergency rescue procedures",
        "Regular atmospheric monitoring"
      ],
      ppe: [
        "Self-contained breathing apparatus if required",
        "Full body harness with retrieval line",
        "Intrinsically safe equipment only"
      ]
    },
    bs7671References: ["Section 729 - Operating and maintenance gangways"],
    inspectionRequirements: ["Continuous atmospheric monitoring", "Equipment checks before entry"]
  },

  // ============= TOOLS & EQUIPMENT =============
  {
    id: "tool_defective",
    hazardId: "Defective hand tools",
    consequence: "Injury from tool failure or misuse",
    severity: 3,
    likelihood: 3,
    riskRating: 9,
    controlMeasures: {
      engineering: [
        "Quality tools from reputable suppliers",
        "Tool inspection tags and systems",
        "Proper tool storage systems"
      ],
      administrative: [
        "Daily tool inspection procedures",
        "Tool maintenance schedules",
        "Training on correct tool use",
        "Defective tool removal procedures"
      ],
      ppe: [
        "Cut-resistant gloves where appropriate",
        "Safety glasses for cutting/drilling",
        "Steel toe cap safety boots"
      ]
    },
    inspectionRequirements: ["Daily visual inspection", "Weekly formal inspection", "Annual thorough examination"]
  },
  {
    id: "tool_power_malfunction",
    hazardId: "Power tool malfunction",
    consequence: "Serious injury from electrical shock, cuts, or impact",
    severity: 4,
    likelihood: 2,
    riskRating: 8,
    controlMeasures: {
      engineering: [
        "110V or battery tools for construction sites",
        "RCD protection for all 230V tools",
        "Guards and safety devices maintained",
        "PAT testing programme"
      ],
      administrative: [
        "Tool inspection before each use",
        "Competency training for power tool use",
        "Maintenance schedules and records",
        "Incident reporting procedures"
      ],
      ppe: [
        "Hearing protection for noisy tools",
        "Eye protection for cutting/grinding",
        "Respiratory protection for dusty operations",
        "Cut-resistant gloves where appropriate"
      ]
    },
    bs7671References: ["BS 7909 - Code of practice for temporary electrical systems"],
    inspectionRequirements: ["Daily visual inspection", "3-monthly PAT testing", "Annual formal inspection"]
  },

  // ============= HUMAN FACTORS =============
  {
    id: "human_training",
    hazardId: "Inadequate training",
    consequence: "Injury due to lack of competence or knowledge",
    severity: 4,
    likelihood: 3,
    riskRating: 12,
    controlMeasures: {
      administrative: [
        "Comprehensive induction training programme",
        "Competency assessments and records",
        "Ongoing skills development and refresher training",
        "Mentoring and supervision systems",
        "Training needs analysis"
      ]
    },
    additionalGuidance: "All electrical work must be carried out by competent persons",
    inspectionRequirements: ["Regular competency assessments", "Training record reviews"]
  },
  {
    id: "human_communication",
    hazardId: "Communication failures",
    consequence: "Injury due to miscommunication or lack of coordination",
    severity: 3,
    likelihood: 3,
    riskRating: 9,
    controlMeasures: {
      administrative: [
        "Clear communication protocols and procedures",
        "Regular toolbox talks and briefings",
        "Standardised hand signals and terminology",
        "Language barriers assessment and support",
        "Emergency communication procedures"
      ]
    },
    inspectionRequirements: ["Regular communication effectiveness reviews"]
  },
  {
    id: "human_fatigue",
    hazardId: "Fatigue and stress",
    consequence: "Increased risk of accidents due to reduced concentration",
    severity: 3,
    likelihood: 4,
    riskRating: 12,
    controlMeasures: {
      administrative: [
        "Maximum working hours policies",
        "Regular rest breaks and meal breaks",
        "Workload monitoring and management",
        "Employee assistance programmes",
        "Stress risk assessments"
      ]
    },
    additionalGuidance: "Maximum 10 hours work per day, minimum 11 hours rest between shifts",
    inspectionRequirements: ["Regular welfare checks", "Working time monitoring"]
  }
];

// Backwards compatibility - convert enhanced to simple format
export const riskConsequences: RiskConsequence[] = enhancedRiskConsequences.map(enhanced => ({
  id: enhanced.id,
  hazardId: enhanced.hazardId,
  consequence: enhanced.consequence,
  defaultControlMeasures: [
    ...(enhanced.controlMeasures.elimination || []),
    ...(enhanced.controlMeasures.substitution || []),
    ...(enhanced.controlMeasures.engineering || []),
    ...(enhanced.controlMeasures.administrative || []),
    ...(enhanced.controlMeasures.ppe || [])
  ].slice(0, 4) // Limit to 4 most important controls
}));