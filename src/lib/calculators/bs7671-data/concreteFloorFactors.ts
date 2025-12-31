// BS 7671 Table 4C6 - Grouping Factors for Cables in Infloor Concrete Troughs
// Installation Methods 118-120

export interface ConcreteFloorGroupingFactor {
  conductorSize: number; // mm²
  factors: {
    [numberOfCables: number]: number;
  };
}

// Table 4C6 - Reduction factors for single-core cables installed in infloor concrete troughs
// Column headers: Number of single-core cables 2, 3, 4, 6, 8, 9, 12, 16, 24
export const concreteFloorGroupingFactors: ConcreteFloorGroupingFactor[] = [
  { 
    conductorSize: 4, 
    factors: { 2: 0.93, 3: 0.90, 4: 0.87, 6: 0.82, 8: 0.78, 9: 0.77, 12: 0.74, 16: 0.70, 24: 0.66 }
  },
  { 
    conductorSize: 6, 
    factors: { 2: 0.93, 3: 0.89, 4: 0.86, 6: 0.81, 8: 0.78, 9: 0.76, 12: 0.73, 16: 0.69, 24: 0.65 }
  },
  { 
    conductorSize: 10, 
    factors: { 2: 0.92, 3: 0.88, 4: 0.85, 6: 0.80, 8: 0.76, 9: 0.75, 12: 0.72, 16: 0.68, 24: 0.63 }
  },
  { 
    conductorSize: 16, 
    factors: { 2: 0.91, 3: 0.87, 4: 0.84, 6: 0.79, 8: 0.75, 9: 0.73, 12: 0.70, 16: 0.66, 24: 0.61 }
  },
  { 
    conductorSize: 25, 
    factors: { 2: 0.90, 3: 0.86, 4: 0.83, 6: 0.78, 8: 0.74, 9: 0.72, 12: 0.69, 16: 0.65, 24: 0.60 }
  },
  { 
    conductorSize: 35, 
    factors: { 2: 0.89, 3: 0.85, 4: 0.82, 6: 0.77, 8: 0.73, 9: 0.71, 12: 0.68, 16: 0.64, 24: 0.59 }
  },
  { 
    conductorSize: 50, 
    factors: { 2: 0.88, 3: 0.84, 4: 0.81, 6: 0.76, 8: 0.72, 9: 0.70, 12: 0.67, 16: 0.63, 24: 0.58 }
  },
  { 
    conductorSize: 70, 
    factors: { 2: 0.87, 3: 0.83, 4: 0.80, 6: 0.75, 8: 0.71, 9: 0.69, 12: 0.66, 16: 0.62, 24: 0.57 }
  },
  { 
    conductorSize: 95, 
    factors: { 2: 0.86, 3: 0.82, 4: 0.79, 6: 0.74, 8: 0.70, 9: 0.68, 12: 0.65, 16: 0.61, 24: 0.56 }
  },
  { 
    conductorSize: 120, 
    factors: { 2: 0.85, 3: 0.81, 4: 0.78, 6: 0.73, 8: 0.69, 9: 0.67, 12: 0.64, 16: 0.60, 24: 0.55 }
  },
  { 
    conductorSize: 150, 
    factors: { 2: 0.84, 3: 0.80, 4: 0.77, 6: 0.72, 8: 0.68, 9: 0.66, 12: 0.63, 16: 0.59, 24: 0.54 }
  },
  { 
    conductorSize: 185, 
    factors: { 2: 0.83, 3: 0.79, 4: 0.76, 6: 0.71, 8: 0.67, 9: 0.65, 12: 0.62, 16: 0.58, 24: 0.53 }
  },
  { 
    conductorSize: 240, 
    factors: { 2: 0.82, 3: 0.78, 4: 0.75, 6: 0.70, 8: 0.66, 9: 0.64, 12: 0.61, 16: 0.57, 24: 0.52 }
  },
  { 
    conductorSize: 300, 
    factors: { 2: 0.81, 3: 0.77, 4: 0.74, 6: 0.69, 8: 0.65, 9: 0.63, 12: 0.60, 16: 0.56, 24: 0.51 }
  },
  { 
    conductorSize: 400, 
    factors: { 2: 0.80, 3: 0.76, 4: 0.73, 6: 0.68, 8: 0.64, 9: 0.62, 12: 0.59, 16: 0.55, 24: 0.50 }
  },
  { 
    conductorSize: 500, 
    factors: { 2: 0.79, 3: 0.75, 4: 0.72, 6: 0.67, 8: 0.63, 9: 0.61, 12: 0.58, 16: 0.54, 24: 0.49 }
  },
  { 
    conductorSize: 630, 
    factors: { 2: 0.78, 3: 0.74, 4: 0.71, 6: 0.66, 8: 0.62, 9: 0.60, 12: 0.57, 16: 0.53, 24: 0.48 }
  },
];

/**
 * Get the grouping factor for cables in infloor concrete troughs (Table 4C6)
 * @param conductorSize - Conductor cross-sectional area in mm²
 * @param numberOfCables - Number of single-core cables
 * @returns Grouping factor (between 0 and 1)
 */
export const getConcreteFloorGroupingFactor = (
  conductorSize: number,
  numberOfCables: number
): number => {
  // Default to 1.0 if inputs invalid
  if (numberOfCables <= 1) return 1.0;
  
  // Find exact conductor size match or nearest larger
  const sizeData = concreteFloorGroupingFactors.find(f => f.conductorSize >= conductorSize) 
    || concreteFloorGroupingFactors[concreteFloorGroupingFactors.length - 1];
  
  // Find exact cable count match or nearest larger
  const availableCounts = Object.keys(sizeData.factors).map(Number).sort((a, b) => a - b);
  const cableCount = availableCounts.find(c => c >= numberOfCables) 
    || availableCounts[availableCounts.length - 1];
  
  return sizeData.factors[cableCount] || 1.0;
};
