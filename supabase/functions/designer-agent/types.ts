/**
 * Type Definitions for Designer Agent
 * Ensures consistent data contracts across all modules
 */

export interface VoltageDropCalculation {
  voltageDropVolts: number;
  voltageDropPercent: number;
  compliant: boolean;
  limit: number;
}

export interface EarthFaultCalculation {
  calculated: number;
  max: number;
  compliant: boolean;
}

export interface CorrectionFactors {
  temperatureFactor: number;
  groupingFactor: number;
  overallFactor: number;
}

export interface CableCapacity {
  Ib: number;
  In: number;
  Iz: number;
  IzTabulated: number;
  factors: CorrectionFactors;
}

export interface CircuitCalculations {
  Ib: number;
  In: number;
  Iz: number;
  voltageDrop: VoltageDropCalculation;
  zs: EarthFaultCalculation;
}

export interface CalculationResults {
  cableCapacity: CableCapacity;
  voltageDrop: VoltageDropCalculation;
  zs: number;
  maxZs?: {
    maxZs: number;
    deviceType: string;
    deviceRating: number;
  };
  pscc: number;
  rcdRequirements?: {
    required: boolean;
    reason: string;
  };
  motorData?: {
    fullLoadCurrent: number;
    startingCurrent: number;
    startingMethod: string;
  };
  earthFault?: EarthFaultCalculation;
}

export interface CircuitDesign {
  circuitNumber: number;
  name: string;
  voltage: number;
  cableSize: number;
  cpcSize: number;
  cableLength: number;
  loadType: string;
  loadPower: number;
  protectionDevice: {
    type: string;
    rating: number;
    curve: string;
    kaRating: number;
  };
  rcdProtected: boolean;
  rcdRating?: number;
  ze: number;
  calculations: CircuitCalculations;
  status?: 'complete' | 'incomplete';
  warnings?: string[];
}

export interface MultiCircuitResponse {
  totalLoad: number;
  totalLoadKW: number;
  diversityFactor?: number;
  diversifiedLoad?: number;
  circuits: CircuitDesign[];
}
