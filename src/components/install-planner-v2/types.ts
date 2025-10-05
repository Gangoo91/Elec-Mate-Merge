export interface EnvironmentConditions {
  ambientTemp: number;
  conditions: string;
  earthing: string;
  ze: number;
  grouping: number;
}

export interface EnvironmentalProfile {
  autoDetected: EnvironmentConditions;
  userOverrides: Partial<EnvironmentConditions>;
  finalApplied: EnvironmentConditions;
}

export interface InstallPlanDataV2 {
  // Mode
  mode: 'express' | 'professional' | 'multi';
  
  // Core Required
  installationType: 'domestic' | 'commercial' | 'industrial';
  loadType: string;
  totalLoad: number;
  voltage: number;
  phases: 'single' | 'three';
  
  // Cable Required
  cableLength: number;
  cableType: string;
  installationMethod: string;
  
  // Installation Context (NEW)
  location?: 'inside' | 'outside' | 'underground' | 'loft' | 'plant-room' | 'data-center';
  cableRun?: string; // Installation method detail
  mechanicalProtection?: boolean;
  fireProtection?: 'none' | 'fire-alarm' | 'escape-route' | 'fire-compartment';
  
  // Environment
  environmentalProfile: EnvironmentalProfile;
  
  // Optional fields
  powerFactor?: number;
  circuits?: CircuitV2[];
  
  // State Management
  savedAt?: Date;
  resumeToken?: string;
}

export interface CircuitV2 {
  id: string;
  name: string;
  loadType: string;
  totalLoad: number;
  voltage: number;
  phases: 'single' | 'three';
  cableLength: number;
  enabled: boolean;
  environmentOverrides?: Partial<EnvironmentConditions>;
}

export interface CalculationResult {
  recommendedCableSize: number;
  capacity: number;
  deratedCapacity: number;
  protectiveDevice: string;
  voltageDrop: number;
  voltageDropPercent: number;
  zs: number;
  compliant: boolean;
  factors: {
    temperature: number;
    grouping: number;
    overall: number;
  };
  safetyMargin: number;
  warnings: string[];
  recommendations: string[];
  materials: MaterialItem[];
  practicalGuidance: GuidanceSection[];
  costEstimate: CostEstimate;
}

export interface MaterialItem {
  name: string;
  quantity: string;
  specification: string;
}

export interface GuidanceSection {
  title: string;
  points: string[];
}

export interface CostEstimate {
  materials: number;
  labour: number;
  total: number;
  breakdown: { item: string; cost: number }[];
}
