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

export interface SiteInfo {
  propertyAddress?: string;
  postcode?: string;
  clientName?: string;
  contactNumber?: string;
}

export interface ProjectInfo {
  planReference?: string;
  plannedStartDate?: string;
  estimatedDuration?: string;
  leadElectrician?: string;
  registrationNumber?: string;
}

// Multi-Circuit Design Support
export interface MultiCircuitDesign {
  installationId: string;
  circuits: FullCircuitDesign[];
  consumerUnit: {
    type: 'split-load' | 'high-integrity' | 'main-switch';
    mainSwitchRating: number;
    incomingSupply: {
      voltage: number;
      phases: 'single' | 'three';
      incomingPFC: number;
      Ze: number;
      earthingSystem: 'TN-S' | 'TN-C-S' | 'TT';
    };
  };
}

export interface FullCircuitDesign {
  circuitNumber: number;
  name: string;
  loadType: string;
  phases: string;
  loadPower: number;
  designCurrent: number;
  voltage: number;
  cableSize: number;
  cpcSize: number;
  cableLength: number;
  installationMethod?: string;
  protectionDevice: {
    type: string;
    curve?: string;
    rating: number;
    kaRating: number;
  };
  rcdProtected: boolean;
  afddRequired?: boolean;
  calculationResults?: {
    zs: number;
    maxZs: number;
    installationMethod?: string;
    deratedCapacity?: number;
    safetyMargin?: number;
  };
}

export interface InstallPlanDataV2 {
  // Mode
  mode: 'express' | 'professional' | 'multi' | 'ai-guided';
  
  // Agent Selection (for ai-guided mode)
  selectedAgents?: string[];
  
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
  
  // Site & Project Information
  siteInfo?: SiteInfo;
  projectInfo?: ProjectInfo;
  
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
  unitCost?: number;
  totalCost?: number;
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
