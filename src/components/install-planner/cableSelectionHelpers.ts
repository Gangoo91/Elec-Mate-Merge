// Helper functions for cable selection with enhanced database compatibility

import { CableSpecification, CompleteCableData, ENHANCED_CABLE_DATABASE } from "@/lib/calculators/bs7671-data/comprehensiveCableDatabase";

export const mapComplexityToString = (complexity: 1 | 2 | 3 | 4 | 5): "simple" | "moderate" | "complex" => {
  if (complexity <= 2) return "simple";
  if (complexity <= 3) return "moderate";
  return "complex";
};

export const calculateTotalCost = (pricing: any, length: number): number => {
  if (!pricing) return 0;
  const materialCost = pricing.retailPrice * length;
  const installationCost = pricing.installationCostPerMetre * length;
  const terminationCost = pricing.terminationCostPer * 2; // Assume 2 terminations
  return materialCost + installationCost + terminationCost;
};

export const assessFireCompliance = (buildingType: string, firePerformance: string): boolean => {
  switch (buildingType) {
    case 'residential_high_rise':
    case 'commercial':
    case 'industrial':
      return firePerformance === 'Fire Resistant' || firePerformance === 'LSOH';
    case 'domestic':
    default:
      return true; // Standard cables acceptable for domestic
  }
};

export const checkEnvironmentalSuitability = (planData: any, cableSpec: CableSpecification | undefined): boolean => {
  if (!cableSpec) return false;
  
  // Check direct burial requirements
  if (planData.installationMethod === 'direct_burial' && !cableSpec.directBurial) {
    return false;
  }
  
  // Check UV resistance for outdoor installations
  if (planData.installationMethod === 'outdoor' && !cableSpec.uvResistant) {
    return false;
  }
  
  return true;
};

export const checkApplicationSuitability = (circuit: any, cableSpec: CableSpecification): boolean => {
  const cableData = Object.values(ENHANCED_CABLE_DATABASE).find(
    data => data.specification.type === cableSpec.type
  );
  
  if (!cableData) return false;
  
  // Check if cable is suitable for the load type
  const applications = cableData.applications;
  const loadType = circuit.loadType?.toLowerCase() || '';
  
  return applications.some(app => 
    app.toLowerCase().includes(loadType) || 
    loadType.includes(app.toLowerCase().split(' ')[0])
  );
};

export const checkInstallationSuitability = (circuit: any, cableSpec: CableSpecification): boolean => {
  const installationMethod = circuit.installationMethod || 'C';
  return cableSpec.installationMethods.includes(installationMethod);
};

export const getMaxLengthForCable = (cableType: string, size: number): number => {
  // Default maximum practical lengths based on cable type and size
  const baseLengths: Record<string, number> = {
    'pvc-twin-earth': 100,
    'swa-xlpe': 500,
    'pvc-single': 200,
    'lsoh-cable': 300,
    'micc-cable': 150,
    'h07rn-f': 100,
    'nyy-j': 1000,
    'fire-resistant': 200
  };
  
  const baseLength = baseLengths[cableType] || 100;
  
  // Larger cables can typically be run longer distances
  const sizeMultiplier = size >= 10 ? 2 : size >= 4 ? 1.5 : 1;
  
  return baseLength * sizeMultiplier;
};