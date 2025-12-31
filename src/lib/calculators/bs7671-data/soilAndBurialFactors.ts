// BS 7671 Appendix 4 - Soil and Burial Correction Factors

// Table 4B3 - Correction factors for soil thermal resistivity (Cs)
// Standard assumed resistivity is 2.5 K.m/W
export interface SoilResistivityFactor {
  resistivity: number; // K.m/W
  directBuried: number; // Factor for direct burial
  inDuct: number; // Factor for cables in ducts
}

// BS 7671 Table 4B3 - Corrected values from official tables
// Column 1 = Rating factor for cables in buried ducts
// Column 2 = Rating factor for direct buried cables
export const soilResistivityFactors: SoilResistivityFactor[] = [
  { resistivity: 0.5, directBuried: 1.88, inDuct: 1.28 },
  { resistivity: 0.7, directBuried: 1.62, inDuct: 1.20 },
  { resistivity: 1.0, directBuried: 1.50, inDuct: 1.18 },
  { resistivity: 1.5, directBuried: 1.28, inDuct: 1.10 },
  { resistivity: 2.0, directBuried: 1.12, inDuct: 1.05 },
  { resistivity: 2.5, directBuried: 1.00, inDuct: 1.00 }, // Reference value
  { resistivity: 3.0, directBuried: 0.90, inDuct: 0.96 },
];

// Table 4B4 - Correction factors for depth of laying (Cd)
// Standard depth is 0.7m for cables and 0.5m for ducts
export interface DepthFactor {
  depth: number; // metres
  directBuried: number;
  inDuct: number;
}

// BS 7671 Table 4B4 - Corrected values from official tables
export const depthOfLayingFactors: DepthFactor[] = [
  { depth: 0.5, directBuried: 1.03, inDuct: 1.02 },
  { depth: 0.7, directBuried: 1.00, inDuct: 1.00 }, // Reference
  { depth: 1.0, directBuried: 0.97, inDuct: 0.98 },
  { depth: 1.25, directBuried: 0.95, inDuct: 0.96 },
  { depth: 1.5, directBuried: 0.94, inDuct: 0.95 },
  { depth: 1.75, directBuried: 0.93, inDuct: 0.94 },
  { depth: 2.0, directBuried: 0.92, inDuct: 0.93 },
  { depth: 2.5, directBuried: 0.90, inDuct: 0.92 },
  { depth: 3.0, directBuried: 0.89, inDuct: 0.91 },
];

// Helper function to get soil resistivity factor with interpolation
export const getSoilResistivityFactor = (
  resistivity: number,
  installationType: 'direct' | 'duct'
): number => {
  const factors = soilResistivityFactors;
  const key = installationType === 'direct' ? 'directBuried' : 'inDuct';
  
  // Find exact match
  const exactMatch = factors.find(f => f.resistivity === resistivity);
  if (exactMatch) return exactMatch[key];
  
  // Find interpolation points
  const lowerPoint = factors
    .filter(f => f.resistivity <= resistivity)
    .sort((a, b) => b.resistivity - a.resistivity)[0];
    
  const upperPoint = factors
    .filter(f => f.resistivity >= resistivity)
    .sort((a, b) => a.resistivity - b.resistivity)[0];
  
  if (!lowerPoint) return factors[0][key];
  if (!upperPoint) return factors[factors.length - 1][key];
  if (lowerPoint === upperPoint) return lowerPoint[key];
  
  // Linear interpolation
  const ratio = (resistivity - lowerPoint.resistivity) / 
                (upperPoint.resistivity - lowerPoint.resistivity);
  
  return lowerPoint[key] + ratio * (upperPoint[key] - lowerPoint[key]);
};

// Helper function to get depth of laying factor with interpolation
export const getDepthOfLayingFactor = (
  depth: number,
  installationType: 'direct' | 'duct'
): number => {
  const factors = depthOfLayingFactors;
  const key = installationType === 'direct' ? 'directBuried' : 'inDuct';
  
  // Find exact match
  const exactMatch = factors.find(f => f.depth === depth);
  if (exactMatch) return exactMatch[key];
  
  // Find interpolation points
  const lowerPoint = factors
    .filter(f => f.depth <= depth)
    .sort((a, b) => b.depth - a.depth)[0];
    
  const upperPoint = factors
    .filter(f => f.depth >= depth)
    .sort((a, b) => a.depth - b.depth)[0];
  
  if (!lowerPoint) return factors[0][key];
  if (!upperPoint) return factors[factors.length - 1][key];
  if (lowerPoint === upperPoint) return lowerPoint[key];
  
  // Linear interpolation
  const ratio = (depth - lowerPoint.depth) / 
                (upperPoint.depth - lowerPoint.depth);
  
  return lowerPoint[key] + ratio * (upperPoint[key] - lowerPoint[key]);
};

// BS 7671 Thermal insulation factors for domestic installations (Table 52.2)
export interface ThermalInsulationFactor {
  code: string;
  description: string;
  factor: number;
  lengthCondition: string;
}

export const thermalInsulationFactors: ThermalInsulationFactor[] = [
  {
    code: '100',
    description: 'Cable in contact with thermal insulation for less than 0.5m',
    factor: 0.89,
    lengthCondition: '<0.5m'
  },
  {
    code: '101', 
    description: 'Cable surrounded by thermal insulation - 50mm depth',
    factor: 0.55,
    lengthCondition: 'Any length'
  },
  {
    code: '102',
    description: 'Cable surrounded by thermal insulation - 100mm depth',
    factor: 0.50,
    lengthCondition: 'Any length'
  },
  {
    code: '103',
    description: 'Cable surrounded by thermal insulation - 200mm+ depth',
    factor: 0.44,
    lengthCondition: 'Any length'
  }
];
