// AI Installation Designer Types
// BS 7671:2018+A3:2024 Compliant Circuit Design

// Extended load types for different installation types
export type DomesticLoadType = 'socket' | 'lighting' | 'cooker' | 'shower' | 'ev-charger' | 'immersion' | 'heating' | 'smoke-alarm' | 'garage' | 'outdoor';

export type CommercialLoadType = 'office-sockets' | 'emergency-lighting' | 'hvac' | 'server-room' | 'kitchen-equipment' | 'signage' | 'fire-alarm' | 'access-control' | 'cctv' | 'data-cabinet';

export type IndustrialLoadType = 'three-phase-motor' | 'machine-tool' | 'welding' | 'conveyor' | 'extraction' | 'control-panel' | 'overhead-lighting' | 'workshop-sockets' | 'compressor' | 'production-line';

export type LoadType = DomesticLoadType | CommercialLoadType | IndustrialLoadType | 'motor' | 'other';

export interface CircuitInput {
  id: string;
  name: string;
  loadType: LoadType;
  loadPower?: number; // Optional - AI can infer
  cableLength?: number; // Optional - AI can infer
  phases: 'single' | 'three';
  specialLocation?: 'bathroom' | 'outdoor' | 'underground' | 'kitchen' | 'none';
  notes?: string;
  
  // NEW: Step 4 - Installation Details (per circuit)
  installMethod?: 'method_a' | 'method_b' | 'method_c' | 'method_d' | 'method_e' | 'method_f' | 'auto';
  protectionType?: 'auto' | 'MCB' | 'RCBO' | 'RCBO-TypeA' | 'RCBO-TypeB';
  rcdProtection?: boolean;
  bathroomZone?: 'zone_0' | 'zone_1' | 'zone_2' | 'outside_zones';
  outdoorInstall?: 'buried' | 'overhead' | 'wall_mounted' | 'other';
  diversityOverride?: number; // Manual override for experienced users
  
  // NEW: Step 5 - Pre-calculated values (frontend calculations)
  calculatedIb?: number; // Design current
  suggestedMCB?: number; // Suggested MCB rating
  calculatedDiversity?: number; // Auto-calculated diversity factor
  estimatedCableSize?: number; // Rough cable size estimate
}

export interface CircuitDesign {
  circuitNumber: number;
  name: string;
  loadType: string;
  loadPower: number;
  socketCount?: number; // Number of sockets/outlets (if applicable)
  designCurrent: number;
  voltage: number;
  phases: 'single' | 'three';
  cableSize: number;
  cpcSize: number;
  cableType?: string; // Full cable description
  cableLength: number;
  installationMethod: string;
  protectionDevice: {
    type: 'MCB' | 'RCBO';
    rating: number;
    curve: 'B' | 'C' | 'D';
    kaRating: number;
  };
  rcdProtected: boolean;
  afddRequired?: boolean;
  calculations: {
    Ib: number;
    In: number;
    Iz: number;
    voltageDrop: {
      volts: number;
      percent: number;
      compliant: boolean;
      limit: number;
    };
    zs: number;
    maxZs: number;
    deratedCapacity: number;
    safetyMargin: number;
  };
  justifications: {
    cableSize: string;
    protection: string;
    rcd?: string;
  };
  diversityFactor?: number;
  diversityJustification?: string;
  faultCurrentAnalysis?: {
    psccAtCircuit: number;
    deviceBreakingCapacity: number;
    compliant: boolean;
    marginOfSafety: string;
    regulation: string;
  };
  earthingRequirements?: {
    cpcSize: string;
    supplementaryBonding: boolean;
    bondingConductorSize?: string;
    justification: string;
    regulation: string;
  };
  deratingFactors?: {
    Ca: number;
    Cg: number;
    Ci: number;
    overall: number;
    explanation: string;
    tableReferences: string;
  };
  installationGuidance?: {
    referenceMethod: string;
    description: string;
    clipSpacing: string;
    practicalTips: string[];
    regulation: string;
  };
  specialLocationCompliance?: {
    isSpecialLocation: boolean;
    locationType: string;
    requirements: string[];
    zonesApplicable?: string;
    regulation: string;
  };
  expectedTestResults?: {
    r1r2: {
      at20C: string;
      at70C: string;
      calculation: string;
    };
    zs: {
      calculated: string;
      maxPermitted: string;
      compliant: boolean;
    };
    insulationResistance: {
      testVoltage: string;
      minResistance: string;
    };
    polarity: string;
    rcdTest: {
      at1x: string;
      at5x: string;
      regulation: string;
    };
  };
  warnings: string[];
}

export interface ConsumerUnit {
  type: 'split-load' | 'high-integrity' | 'main-switch';
  mainSwitchRating: number;
  incomingSupply: {
    voltage: number;
    phases: 'single' | 'three';
    incomingPFC: number;
    Ze: number;
    earthingSystem: 'TN-S' | 'TN-C-S' | 'TT';
  };
}

export interface MaterialItem {
  name: string;
  specification: string;
  quantity: string;
  unit: string;
  unitCost?: number;
  totalCost?: number;
}

export interface InstallationDesign {
  projectName: string;
  location: string;
  clientName?: string;
  electricianName?: string;
  installationType: 'domestic' | 'commercial' | 'industrial';
  totalLoad: number;
  diversityApplied: boolean;
  diversityFactor?: number;
  circuits?: CircuitDesign[]; // Optional - may be undefined in error states
  consumerUnit: ConsumerUnit;
  materials: MaterialItem[];
  costEstimate?: {
    materials: number;
    labour: number;
    total: number;
  };
  diversityBreakdown?: {
    totalConnectedLoad: number;
    diversifiedLoad: number;
    overallDiversityFactor: number;
    reasoning: string;
    bs7671Reference: string;
    circuitDiversity?: Array<{
      circuitName: string;
      connectedLoad: number;
      diversityFactorApplied: number;
      diversifiedLoad: number;
      justification: string;
    }>;
  };
  practicalGuidance: string[];
  // PHASE 4: Design Reasoning
  reasoning?: {
    voltageContext: string;
    cableSelectionLogic: string;
    protectionLogic: string;
    complianceChecks: string;
    correctionsApplied?: string;
  };
  // PHASE 2: Self-Correction Tracking
  correctionApplied?: boolean;
  correctionAttempts?: number;
}

export interface DesignInputs {
  projectName: string;
  location: string;
  clientName?: string;
  electricianName?: string;
  propertyType: 'domestic' | 'commercial' | 'industrial';
  voltage: number;
  phases: 'single' | 'three';
  ze: number;
  earthingSystem: 'TN-S' | 'TN-C-S' | 'TT';
  pscc?: number;
  mainSwitchRating?: number;
  ambientTemp?: number;
  installationMethod?: 'clipped-direct' | 'in-conduit' | 'in-trunking' | 'buried-direct' | 'in-insulation';
  groupingFactor?: number;
  propertyAge?: 'new-build' | 'modern' | 'older' | 'very-old';
  existingInstallation?: boolean;
  budgetLevel?: 'basic' | 'standard' | 'premium';
  circuits: CircuitInput[];
  additionalPrompt?: string;
  motorStartingFactor?: number; // For industrial (typically 6-8x)
  faultLevel?: number; // kA rating for industrial
  diversityFactor?: number; // Manual override for diversity
}

// Template definitions
export interface CircuitPreset {
  id: string;
  name: string;
  description: string;
  circuits: Omit<CircuitInput, 'id'>[];
}
