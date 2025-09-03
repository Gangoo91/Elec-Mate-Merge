import { getTemperatureFactor, getGroupingFactor } from '../bs7671-data/temperatureFactors';
import { getCableCapacity, CableType } from '../bs7671-data/cableCapacities';

export interface SimplifiedCableSizingInputs {
  current: number;
  installationType: string;
  ambientTemp?: number;
  groupingCircuits?: number;
  length?: number;
  cableType?: CableType;
}

export interface SimplifiedCableSizingResult {
  recommendedSize: number;
  capacity: number;
  deratedCapacity: number;
  factors: {
    temperature: number;
    grouping: number;
    overall: number;
  };
  safetyMargin: number;
  compliant: boolean;
}

// Simplified cable sizing using proper BS 7671 derating factors
export const calculateSimplifiedCableSize = (inputs: SimplifiedCableSizingInputs): SimplifiedCableSizingResult | null => {
  const {
    current,
    installationType,
    ambientTemp = 30,
    groupingCircuits = 1,
    cableType = 'pvc-single'
  } = inputs;

  // Standard cable sizes to check
  const standardSizes = [1.0, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300];
  
  for (const size of standardSizes) {
    const cableData = getCableCapacity(cableType, size);
    if (!cableData) continue;

    // Get base capacity for installation method
    const baseCapacity = (cableData as any)[installationType];
    if (!baseCapacity) continue;

    // Determine temperature rating
    const temperatureRating = cableType.includes('xlpe') || cableType.includes('aluminium') ? '90C' : '70C';
    
    // Get derating factors using BS 7671 tables
    const tempFactor = getTemperatureFactor(ambientTemp, temperatureRating);
    const groupingFactor = getGroupingFactor(groupingCircuits);
    const overallFactor = tempFactor * groupingFactor;
    
    // Calculate derated capacity
    const deratedCapacity = baseCapacity * overallFactor;
    
    // Check if this size is sufficient
    if (deratedCapacity >= current) {
      const safetyMargin = ((deratedCapacity - current) / current) * 100;
      
      return {
        recommendedSize: size,
        capacity: baseCapacity,
        deratedCapacity: Math.round(deratedCapacity * 10) / 10,
        factors: {
          temperature: tempFactor,
          grouping: groupingFactor,
          overall: overallFactor
        },
        safetyMargin: Math.round(safetyMargin * 10) / 10,
        compliant: deratedCapacity >= current
      };
    }
  }

  return null; // No suitable cable size found
};