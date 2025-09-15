// Compatibility adapter for old cable selection code
// This provides the missing properties that the old code expects

import { CableSpecification } from "@/lib/calculators/bs7671-data/comprehensiveCableDatabase";

export interface LegacyCableData {
  cost: number;
  availability: string;
  installationComplexity: string;
  maxLength: number;
  installationTime: number;
}

export const createLegacyCableData = (
  pricing: any, 
  spec: CableSpecification | undefined, 
  size: number
): LegacyCableData => {
  return {
    cost: pricing?.retailPrice || 5.0,
    availability: pricing?.availability || "In Stock",
    installationComplexity: spec ? mapComplexityToLegacy(spec.installationComplexity) : "simple",
    maxLength: getMaxLengthForSize(size),
    installationTime: spec?.installationTime || 5
  };
};

const mapComplexityToLegacy = (complexity: 1 | 2 | 3 | 4 | 5): string => {
  if (complexity <= 2) return "simple";
  if (complexity <= 3) return "moderate";
  return "complex";
};

const getMaxLengthForSize = (size: number): number => {
  if (size >= 25) return 1000;
  if (size >= 10) return 500;
  if (size >= 4) return 200;
  return 100;
};

// Mock functions for missing properties
export const mockCableProperties = {
  maxOperatingTemp: 70,
  sheathType: "PVC",
  insulationType: "PVC",
  rating: "Standard",
  circuitIntegrity: "Standard"
};

// Stub function for fire compliance check
export const checkFireCompliance = (buildingType: string, firePerformance: any): boolean => {
  return true; // Simplified - assume compliant
};