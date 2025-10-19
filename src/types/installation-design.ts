// AI Installation Designer Types
// BS 7671:2018+A2:2022 Compliant Circuit Design

export interface CircuitInput {
  id: string;
  name: string;
  loadType: 'socket' | 'lighting' | 'cooker' | 'shower' | 'ev-charger' | 'immersion' | 'heating' | 'motor' | 'other';
  loadPower?: number; // Optional - AI can infer
  cableLength?: number; // Optional - AI can infer
  phases: 'single' | 'three';
  specialLocation?: 'bathroom' | 'outdoor' | 'underground' | 'kitchen' | 'none';
  notes?: string;
}

export interface CircuitDesign {
  circuitNumber: number;
  name: string;
  loadType: string;
  loadPower: number;
  designCurrent: number;
  voltage: number;
  phases: 'single' | 'three';
  cableSize: number;
  cpcSize: number;
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
  circuits: CircuitDesign[];
  consumerUnit: ConsumerUnit;
  materials: MaterialItem[];
  costEstimate: {
    materials: number;
    labour: number;
    total: number;
  };
  practicalGuidance: string[];
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
}
