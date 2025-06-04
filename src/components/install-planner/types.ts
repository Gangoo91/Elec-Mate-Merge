
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

export interface InstallationSuggestion {
  type: "cable-upgrade" | "installation-method" | "protective-device" | "cost-optimization" | "safety";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  cost?: "low" | "medium" | "high";
}

export interface ComplianceCheck {
  regulation: string;
  requirement: string;
  status: "pass" | "fail" | "warning";
  reference: string;
  details?: string;
}
