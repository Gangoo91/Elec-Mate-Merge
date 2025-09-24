import { EnhancedRiskConsequence, enhancedRiskConsequences, hazardCategories } from "./hazards";

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
    applicableHazards: ["Live electrical circuits", "Working in wet conditions near electricity"],
    inspectionFrequency: "Every 3 months",
    testingRequired: true
  },
  {
    section: "514.1.1",
    title: "General requirements for identification",
    description: "Every circuit must be identified to show protective device and circuits served",
    applicableHazards: ["Live electrical circuits", "Inadequate earthing"],
    inspectionFrequency: "Initial + 5 yearly",
    testingRequired: false
  },
  {
    section: "537.2.1.1",
    title: "General requirements for isolation",
    description: "Means of isolation required for every circuit",
    applicableHazards: ["Live electrical circuits", "Exposed electrical connections"],
    inspectionFrequency: "Annual",
    testingRequired: true
  },
  {
    section: "704.410.3.10",
    title: "Construction sites - additional protection",
    description: "All socket outlets must have 30mA RCD protection",
    applicableHazards: ["Working in wet conditions near electricity", "Power tool malfunction"],
    inspectionFrequency: "Daily",
    testingRequired: true
  }
];

// Enhanced hazard categorization with realistic workplace scenarios
export interface WorkplaceScenario {
  id: string;
  name: string;
  description: string;
  commonHazards: string[];
  specificRequirements: string[];
  bs7671Sections: string[];
}

export const workplaceScenarios: WorkplaceScenario[] = [
  {
    id: "domestic_rewire",
    name: "Domestic Property Rewire",
    description: "Complete rewiring of residential property including consumer unit upgrade",
    commonHazards: [
      "Live electrical circuits",
      "Working at height",
      "Disturbing asbestos-containing materials",
      "Heavy lifting of equipment",
      "Poor lighting conditions"
    ],
    specificRequirements: [
      "Asbestos survey for properties built before 1980",
      "Temporary supply arrangements",
      "Customer liaison and property protection",
      "Building control notification"
    ],
    bs7671Sections: ["Part 1", "Part 4", "Part 5", "Part 6", "Section 704"]
  },
  {
    id: "commercial_fit_out",
    name: "Commercial Office Fit-out",
    description: "Electrical installation for new commercial office space",
    commonHazards: [
      "Live electrical circuits", 
      "Working at height",
      "Manual handling of heavy equipment",
      "Coordination with other trades",
      "Fire safety system integration"
    ],
    specificRequirements: [
      "Emergency lighting compliance",
      "Fire alarm integration",
      "Data cabling coordination",
      "CDM regulations compliance"
    ],
    bs7671Sections: ["Part 4", "Part 5", "Section 528", "Section 560"]
  },
  {
    id: "industrial_maintenance",
    name: "Industrial Plant Maintenance",
    description: "Maintenance and repair work on industrial electrical systems",
    commonHazards: [
      "Live electrical circuits",
      "Confined spaces",
      "Chemical vapours",
      "Hot work near flammable materials",
      "High voltage equipment"
    ],
    specificRequirements: [
      "LOTO procedures",
      "Hot work permits",
      "Confined space entry permits",
      "DSEAR compliance"
    ],
    bs7671Sections: ["Part 4", "Part 6", "Section 729"]
  },
  {
    id: "outdoor_installation",
    name: "Outdoor Electrical Installation",
    description: "External electrical work including street lighting and supplies",
    commonHazards: [
      "Adverse weather conditions",
      "Working at height", 
      "Vehicle movements on site",
      "Underground services",
      "Public interaction"
    ],
    specificRequirements: [
      "Traffic management",
      "Underground service location",
      "Weather monitoring",
      "Public safety barriers"
    ],
    bs7671Sections: ["Part 4", "Section 714", "Section 559"]
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

// Control measure hierarchy helper
export const getControlMeasuresByHierarchy = (riskId: string) => {
  const risk = enhancedRiskConsequences.find(r => r.id === riskId);
  if (!risk) return [];

  const hierarchy = [];
  if (risk.controlMeasures.elimination?.length) {
    hierarchy.push({ type: "Elimination", measures: risk.controlMeasures.elimination });
  }
  if (risk.controlMeasures.substitution?.length) {
    hierarchy.push({ type: "Substitution", measures: risk.controlMeasures.substitution });
  }
  if (risk.controlMeasures.engineering?.length) {
    hierarchy.push({ type: "Engineering Controls", measures: risk.controlMeasures.engineering });
  }
  if (risk.controlMeasures.administrative?.length) {
    hierarchy.push({ type: "Administrative Controls", measures: risk.controlMeasures.administrative });
  }
  if (risk.controlMeasures.ppe?.length) {
    hierarchy.push({ type: "Personal Protective Equipment", measures: risk.controlMeasures.ppe });
  }

  return hierarchy;
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

  return enhancedRiskConsequences.filter(risk => 
    scenario.commonHazards.includes(risk.hazardId)
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