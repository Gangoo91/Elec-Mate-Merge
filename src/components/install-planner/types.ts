
export interface InstallPlanData {
  // Installation Type
  installationType: string;
  installationPurpose?: string;
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
  
  // Environment - Enhanced for multi-circuit
  environmentalSettings: EnvironmentalSettings;
  
  // Multi-circuit fields
  circuits?: Circuit[];
  designMode?: "single" | "multi";
  
  // Legacy single-circuit environment fields (for backward compatibility)
  ambientTemperature?: number;
  groupingFactor?: number;
  derating?: number;
  protectiveDevice?: string;
  earthingSystem?: string;
  ze?: number;
  environmentalConditions?: string;
  specialRequirements?: string[];
  hazardousArea?: string;
  fireRating?: string;
  mechanicalProtection?: string;
}

export interface EnvironmentalSettings {
  // Global environmental conditions
  ambientTemperature: number;
  environmentalConditions: string;
  earthingSystem: string;
  ze: number;
  
  // Circuit-specific overrides
  circuitEnvironments?: { [circuitId: string]: CircuitEnvironmentalOverride };
  
  // System-wide settings
  globalGroupingFactor: number;
  specialRequirements: string[];
  hazardousArea?: string;
  fireRating?: string;
  mechanicalProtection?: string;
  
  // Installation-specific environmental factors
  installationZones?: InstallationZone[];
  corrosionCategory?: string;
  seismicRequirements?: boolean;
  floodRiskArea?: boolean;
}

export interface CircuitEnvironmentalOverride {
  ambientTemperature?: number;
  environmentalConditions?: string;
  groupingFactor?: number;
  specialRequirements?: string[];
  installationZone?: string;
  notes?: string;
}

export interface InstallationZone {
  id: string;
  name: string;
  description: string;
  ambientTemperature: number;
  environmentalConditions: string;
  specialRequirements: string[];
  circuitIds: string[];
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
  
  // Environmental context
  environmentalOverride?: CircuitEnvironmentalOverride;
  installationZone?: string;
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
  
  // Environmental considerations
  temperatureDerating?: number;
  groupingDerating?: number;
  environmentalSuitability?: string;
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
  
  // Environmental analysis
  environmentalAnalysis?: EnvironmentalAnalysis;
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
  
  // Enhanced environmental analysis
  environmentalAnalysis: MultiCircuitEnvironmentalAnalysis;
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
  
  // Environmental factors applied
  appliedEnvironmentalFactors: AppliedEnvironmentalFactors;
}

export interface EnvironmentalAnalysis {
  temperatureDerating: number;
  groupingFactor: number;
  overallDerating: number;
  environmentalWarnings: string[];
  recommendedMitigations: string[];
  complianceNotes: string[];
}

export interface MultiCircuitEnvironmentalAnalysis {
  globalFactors: EnvironmentalAnalysis;
  circuitSpecificFactors: { [circuitId: string]: EnvironmentalAnalysis };
  zoneAnalysis: ZoneEnvironmentalAnalysis[];
  systemWideRecommendations: string[];
  environmentalCompliance: EnvironmentalComplianceCheck[];
}

export interface AppliedEnvironmentalFactors {
  ambientTemperature: number;
  temperatureDerating: number;
  groupingFactor: number;
  overallDerating: number;
  environmentalConditions: string;
  specialRequirements: string[];
  mitigationMeasures: string[];
}

export interface ZoneEnvironmentalAnalysis {
  zone: InstallationZone;
  circuitCount: number;
  totalLoad: number;
  averageDerating: number;
  criticalFactors: string[];
  recommendations: string[];
}

export interface EnvironmentalComplianceCheck {
  requirement: string;
  standard: string;
  status: "compliant" | "non-compliant" | "requires-attention";
  details: string;
  affectedCircuits: string[];
  recommendedActions: string[];
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
