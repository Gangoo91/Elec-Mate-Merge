
export interface InstallPlanData {
  // Installation Type
  installationType: string;
  loadType: string;
  
  // Load Details
  totalLoad: number;
  voltage: number;
  phases: "single" | "three";
  powerFactor?: number;
  
  // Cable Run
  cableLength: number;
  installationMethod: string;
  cableType: string;
  
  // Environment
  ambientTemperature: number;
  groupingFactor: number;
  derating: number;
  protectiveDevice: string;
  earthingSystem: string;
  ze: number;
  
  // New specialized fields
  environmentalConditions?: string;
  specialRequirements?: string[];
  hazardousArea?: string;
  fireRating?: string;
  mechanicalProtection?: string;
  
  // Multi-circuit fields
  circuits?: Circuit[];
  designMode?: "single" | "multi";
}

export interface Circuit {
  id: string;
  name: string;
  loadType: string;
  totalLoad: number;
  voltage: number;
  phases: "single" | "three";
  powerFactor?: number;
  cableLength: number;
  installationMethod: string;
  cableType: string;
  protectiveDevice: string;
  enabled: boolean;
  notes?: string;
}

export interface CableRecommendation {
  size: string;
  type: string;
  currentCarryingCapacity: number;
  voltageDropPercentage: number;
  ratedCurrent: number;
  suitability: "suitable" | "marginal" | "unsuitable";
  notes: string[];
  cost?: "low" | "medium" | "high";
  availability?: "common" | "limited" | "special-order";
  installationComplexity?: "simple" | "moderate" | "complex";
  specialConsiderations?: string[];
}

export interface InstallPlanResult {
  recommendedCable: CableRecommendation;
  alternativeCables: CableRecommendation[];
  protectiveDeviceRating: number;
  maximumDemand: number;
  zsValue: number;
  zsCompliance: boolean;
  diversityFactor: number;
  totalSystemLoad: number;
  warnings: string[];
  recommendations: string[];
  suggestions: InstallationSuggestion[];
  complianceChecks: ComplianceCheck[];
}

export interface MultiCircuitResult {
  circuits: CircuitResult[];
  totalSystemLoad: number;
  mainSupplyRequirements: {
    totalDemand: number;
    recommendedSupplyRating: number;
    mainSwitchRating: number;
    earthingRequirements: string[];
  };
  diversityCalculations: {
    totalConnectedLoad: number;
    diversifiedLoad: number;
    diversityFactor: number;
  };
  complianceChecks: ComplianceCheck[];
  warnings: string[];
  recommendations: string[];
}

export interface CircuitResult {
  circuit: Circuit;
  recommendedCable: CableRecommendation;
  alternativeCables: CableRecommendation[];
  designCurrent: number;
  protectiveDeviceRating: number;
  zsValue: number;
  zsCompliance: boolean;
  voltageDropCompliance: boolean;
  warnings: string[];
}

export interface InstallationSuggestion {
  type: "cable-upgrade" | "installation-method" | "protective-device" | "cost-optimization" | "safety" | "environmental" | "regulatory";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  cost?: "low" | "medium" | "high";
  regulation?: string;
}

export interface ComplianceCheck {
  regulation: string;
  requirement: string;
  status: "pass" | "fail" | "warning";
  reference: string;
  details?: string;
}
