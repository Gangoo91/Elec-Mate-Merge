// BS 7671 Table 4C6 - Grouping Factors for Cables in Infloor Concrete Troughs
// Installation Methods 118, 119, 120

export interface ConcreteFloorGroupingFactor {
  conductorSize: number; // mm²
  // Method 118: Cables touching in centre of trough
  // Method 119: Cables spaced in centre of trough  
  // Method 120: Cables touching at edge of trough
  method118: { [numberOfCables: number]: number }; // touching centre
  method119: { [numberOfCables: number]: number }; // spaced centre
  method120: { [numberOfCables: number]: number }; // touching edge
}

// Table 4C6 - Reduction factors for single-core cables in infloor concrete troughs
// From BS 7671:2018+A3:2024 Table 4C6
// Columns: Number of circuits 2, 3, 4, 5, 6, 7, 8, 9, 10
export const concreteFloorGroupingFactors: ConcreteFloorGroupingFactor[] = [
  { 
    conductorSize: 4,
    method118: { 2: 0.93, 3: 0.90, 4: 0.87, 5: 0.82, 6: 0.86, 7: 0.83, 8: 0.76, 9: 0.81, 10: 0.74 },
    method119: { 2: 0.94, 3: 0.91, 4: 0.88, 5: 0.84, 6: 0.88, 7: 0.85, 8: 0.79, 9: 0.84, 10: 0.77 },
    method120: { 2: 0.95, 3: 0.92, 4: 0.89, 5: 0.86, 6: 0.90, 7: 0.87, 8: 0.82, 9: 0.86, 10: 0.80 }
  },
  { 
    conductorSize: 6,
    method118: { 2: 0.92, 3: 0.89, 4: 0.86, 5: 0.80, 6: 0.84, 7: 0.81, 8: 0.73, 9: 0.79, 10: 0.72 },
    method119: { 2: 0.93, 3: 0.90, 4: 0.87, 5: 0.83, 6: 0.87, 7: 0.84, 8: 0.77, 9: 0.82, 10: 0.75 },
    method120: { 2: 0.94, 3: 0.91, 4: 0.88, 5: 0.85, 6: 0.89, 7: 0.86, 8: 0.80, 9: 0.85, 10: 0.78 }
  },
  { 
    conductorSize: 10,
    method118: { 2: 0.90, 3: 0.87, 4: 0.84, 5: 0.77, 6: 0.81, 7: 0.78, 8: 0.70, 9: 0.76, 10: 0.69 },
    method119: { 2: 0.92, 3: 0.89, 4: 0.86, 5: 0.81, 6: 0.85, 7: 0.82, 8: 0.74, 9: 0.80, 10: 0.73 },
    method120: { 2: 0.93, 3: 0.90, 4: 0.87, 5: 0.83, 6: 0.87, 7: 0.84, 8: 0.78, 9: 0.83, 10: 0.76 }
  },
  { 
    conductorSize: 16,
    method118: { 2: 0.88, 3: 0.84, 4: 0.81, 5: 0.74, 6: 0.78, 7: 0.74, 8: 0.66, 9: 0.72, 10: 0.65 },
    method119: { 2: 0.90, 3: 0.87, 4: 0.84, 5: 0.78, 6: 0.82, 7: 0.79, 8: 0.71, 9: 0.77, 10: 0.70 },
    method120: { 2: 0.92, 3: 0.89, 4: 0.86, 5: 0.81, 6: 0.85, 7: 0.82, 8: 0.75, 9: 0.81, 10: 0.74 }
  },
  { 
    conductorSize: 25,
    method118: { 2: 0.86, 3: 0.82, 4: 0.78, 5: 0.71, 6: 0.74, 7: 0.71, 8: 0.63, 9: 0.68, 10: 0.62 },
    method119: { 2: 0.89, 3: 0.85, 4: 0.82, 5: 0.76, 6: 0.80, 7: 0.76, 8: 0.68, 9: 0.74, 10: 0.67 },
    method120: { 2: 0.91, 3: 0.88, 4: 0.84, 5: 0.79, 6: 0.83, 7: 0.80, 8: 0.72, 9: 0.78, 10: 0.71 }
  },
  { 
    conductorSize: 35,
    method118: { 2: 0.84, 3: 0.79, 4: 0.76, 5: 0.68, 6: 0.71, 7: 0.68, 8: 0.59, 9: 0.65, 10: 0.59 },
    method119: { 2: 0.87, 3: 0.83, 4: 0.80, 5: 0.73, 6: 0.77, 7: 0.73, 8: 0.65, 9: 0.71, 10: 0.64 },
    method120: { 2: 0.90, 3: 0.86, 4: 0.83, 5: 0.77, 6: 0.81, 7: 0.77, 8: 0.70, 9: 0.76, 10: 0.69 }
  },
  { 
    conductorSize: 50,
    method118: { 2: 0.82, 3: 0.77, 4: 0.73, 5: 0.65, 6: 0.68, 7: 0.64, 8: 0.56, 9: 0.61, 10: 0.55 },
    method119: { 2: 0.86, 3: 0.81, 4: 0.77, 5: 0.70, 6: 0.74, 7: 0.70, 8: 0.62, 9: 0.67, 10: 0.61 },
    method120: { 2: 0.89, 3: 0.84, 4: 0.81, 5: 0.74, 6: 0.78, 7: 0.74, 8: 0.67, 9: 0.73, 10: 0.66 }
  },
  { 
    conductorSize: 70,
    method118: { 2: 0.80, 3: 0.74, 4: 0.71, 5: 0.63, 6: 0.65, 7: 0.61, 8: 0.53, 9: 0.58, 10: 0.52 },
    method119: { 2: 0.84, 3: 0.79, 4: 0.75, 5: 0.68, 6: 0.71, 7: 0.67, 8: 0.59, 9: 0.64, 10: 0.58 },
    method120: { 2: 0.87, 3: 0.83, 4: 0.79, 5: 0.72, 6: 0.76, 7: 0.72, 8: 0.64, 9: 0.70, 10: 0.63 }
  },
  { 
    conductorSize: 95,
    method118: { 2: 0.78, 3: 0.72, 4: 0.68, 5: 0.60, 6: 0.62, 7: 0.58, 8: 0.50, 9: 0.55, 10: 0.49 },
    method119: { 2: 0.83, 3: 0.77, 4: 0.73, 5: 0.65, 6: 0.68, 7: 0.64, 8: 0.56, 9: 0.61, 10: 0.55 },
    method120: { 2: 0.86, 3: 0.81, 4: 0.77, 5: 0.70, 6: 0.73, 7: 0.69, 8: 0.61, 9: 0.67, 10: 0.60 }
  },
  { 
    conductorSize: 120,
    method118: { 2: 0.76, 3: 0.70, 4: 0.66, 5: 0.58, 6: 0.60, 7: 0.56, 8: 0.47, 9: 0.52, 10: 0.47 },
    method119: { 2: 0.81, 3: 0.76, 4: 0.71, 5: 0.63, 6: 0.66, 7: 0.62, 8: 0.53, 9: 0.58, 10: 0.53 },
    method120: { 2: 0.85, 3: 0.80, 4: 0.75, 5: 0.68, 6: 0.71, 7: 0.67, 8: 0.59, 9: 0.64, 10: 0.58 }
  },
  { 
    conductorSize: 150,
    method118: { 2: 0.75, 3: 0.68, 4: 0.64, 5: 0.56, 6: 0.58, 7: 0.53, 8: 0.45, 9: 0.50, 10: 0.44 },
    method119: { 2: 0.80, 3: 0.74, 4: 0.69, 5: 0.61, 6: 0.64, 7: 0.59, 8: 0.51, 9: 0.56, 10: 0.50 },
    method120: { 2: 0.84, 3: 0.78, 4: 0.74, 5: 0.66, 6: 0.69, 7: 0.65, 8: 0.56, 9: 0.62, 10: 0.56 }
  },
  { 
    conductorSize: 185,
    method118: { 2: 0.73, 3: 0.66, 4: 0.62, 5: 0.54, 6: 0.55, 7: 0.51, 8: 0.43, 9: 0.47, 10: 0.42 },
    method119: { 2: 0.79, 3: 0.72, 4: 0.68, 5: 0.59, 6: 0.62, 7: 0.57, 8: 0.49, 9: 0.54, 10: 0.48 },
    method120: { 2: 0.83, 3: 0.77, 4: 0.72, 5: 0.64, 6: 0.67, 7: 0.63, 8: 0.54, 9: 0.60, 10: 0.54 }
  },
  { 
    conductorSize: 240,
    method118: { 2: 0.71, 3: 0.64, 4: 0.60, 5: 0.51, 6: 0.53, 7: 0.49, 8: 0.40, 9: 0.45, 10: 0.39 },
    method119: { 2: 0.77, 3: 0.70, 4: 0.66, 5: 0.57, 6: 0.60, 7: 0.55, 8: 0.46, 9: 0.51, 10: 0.46 },
    method120: { 2: 0.82, 3: 0.75, 4: 0.71, 5: 0.62, 6: 0.65, 7: 0.61, 8: 0.52, 9: 0.57, 10: 0.52 }
  },
  { 
    conductorSize: 300,
    method118: { 2: 0.69, 3: 0.62, 4: 0.58, 5: 0.49, 6: 0.51, 7: 0.46, 8: 0.38, 9: 0.42, 10: 0.37 },
    method119: { 2: 0.76, 3: 0.69, 4: 0.64, 5: 0.55, 6: 0.57, 7: 0.53, 8: 0.44, 9: 0.49, 10: 0.43 },
    method120: { 2: 0.81, 3: 0.74, 4: 0.69, 5: 0.60, 6: 0.63, 7: 0.59, 8: 0.50, 9: 0.55, 10: 0.49 }
  },
  { 
    conductorSize: 400,
    method118: { 2: 0.67, 3: 0.60, 4: 0.55, 5: 0.47, 6: 0.48, 7: 0.44, 8: 0.36, 9: 0.40, 10: 0.35 },
    method119: { 2: 0.74, 3: 0.67, 4: 0.62, 5: 0.53, 6: 0.55, 7: 0.51, 8: 0.42, 9: 0.46, 10: 0.41 },
    method120: { 2: 0.79, 3: 0.72, 4: 0.67, 5: 0.58, 6: 0.61, 7: 0.56, 8: 0.47, 9: 0.52, 10: 0.47 }
  },
];

/**
 * Get the grouping factor for cables in infloor concrete troughs (Table 4C6)
 * @param conductorSize - Conductor cross-sectional area in mm²
 * @param numberOfCircuits - Number of circuits (2-10)
 * @param method - Installation method: 118 (touching centre), 119 (spaced centre), 120 (touching edge)
 * @returns Grouping factor (between 0 and 1)
 */
export const getConcreteFloorGroupingFactor = (
  conductorSize: number,
  numberOfCircuits: number,
  method: 118 | 119 | 120 = 118
): number => {
  // Default to 1.0 if inputs invalid
  if (numberOfCircuits <= 1) return 1.0;
  if (numberOfCircuits > 10) numberOfCircuits = 10;
  
  // Find exact conductor size match or nearest larger
  const sizeData = concreteFloorGroupingFactors.find(f => f.conductorSize >= conductorSize) 
    || concreteFloorGroupingFactors[concreteFloorGroupingFactors.length - 1];
  
  // Get the correct method factors
  const methodFactors = method === 118 ? sizeData.method118 
    : method === 119 ? sizeData.method119 
    : sizeData.method120;
  
  // Find exact circuit count match
  const factor = methodFactors[numberOfCircuits];
  
  return factor ?? 1.0;
};

// Legacy function for backward compatibility
export const getConcreteFloorGroupingFactorLegacy = (
  conductorSize: number,
  numberOfCables: number
): number => {
  return getConcreteFloorGroupingFactor(conductorSize, numberOfCables, 118);
};
