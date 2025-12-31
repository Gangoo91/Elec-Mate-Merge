// BS 7671 Appendix 4 Temperature Rating Factors
// Table 4B1 - Rating factors for ambient air temperature (Ca)

export interface TemperatureFactor {
  ambientTemp: number;
  factor70C: number; // Thermoplastic insulation
  factor90C: number; // Thermosetting insulation
}

// BS 7671 Table 4B1 - Ambient air temperature rating factors
export const ambientTemperatureFactors: TemperatureFactor[] = [
  { ambientTemp: 25, factor70C: 1.04, factor90C: 1.02 }, // Fixed from 1.06/1.04
  { ambientTemp: 30, factor70C: 1.00, factor90C: 1.00 },
  { ambientTemp: 35, factor70C: 0.94, factor90C: 0.96 },
  { ambientTemp: 40, factor70C: 0.87, factor90C: 0.91 },
  { ambientTemp: 45, factor70C: 0.79, factor90C: 0.87 },
  { ambientTemp: 50, factor70C: 0.71, factor90C: 0.82 },
  { ambientTemp: 55, factor70C: 0.61, factor90C: 0.76 },
  { ambientTemp: 60, factor70C: 0.50, factor90C: 0.71 },
  { ambientTemp: 65, factor70C: 0.35, factor90C: 0.65 },
  { ambientTemp: 70, factor70C: 0.00, factor90C: 0.58 },
  { ambientTemp: 75, factor70C: 0.00, factor90C: 0.50 },
  { ambientTemp: 80, factor70C: 0.00, factor90C: 0.41 },
];

// BS 7671 Table 4B2 - Soil temperature rating factors
export interface SoilTemperatureFactor {
  soilTemp: number;
  factor70C: number;
  factor90C: number;
}

export const soilTemperatureFactors: SoilTemperatureFactor[] = [
  { soilTemp: 10, factor70C: 1.10, factor90C: 1.07 },
  { soilTemp: 15, factor70C: 1.05, factor90C: 1.04 },
  { soilTemp: 20, factor70C: 1.00, factor90C: 1.00 },
  { soilTemp: 25, factor70C: 0.95, factor90C: 0.96 },
  { soilTemp: 30, factor70C: 0.89, factor90C: 0.93 },
  { soilTemp: 35, factor70C: 0.84, factor90C: 0.89 },
  { soilTemp: 40, factor70C: 0.77, factor90C: 0.85 },
  { soilTemp: 45, factor70C: 0.71, factor90C: 0.80 },
  { soilTemp: 50, factor70C: 0.63, factor90C: 0.76 },
  { soilTemp: 55, factor70C: 0.55, factor90C: 0.71 },
  { soilTemp: 60, factor70C: 0.45, factor90C: 0.65 },
  { soilTemp: 65, factor70C: 0.32, factor90C: 0.60 },
];

// BS 7671 Table 4C1 - Grouping factors (Cg)
// Now with arrangement-specific factors
export type GroupingArrangement = 
  | 'bunched'           // Item 1 - Bunched in air, on surface, embedded, enclosed
  | 'single-layer-wall' // Item 2 - Single layer on wall, floor or in trunking
  | 'single-layer-tray' // Item 3 - Single layer multicore on perforated tray
  | 'single-layer-ladder'; // Item 4 - Single layer on ladder/cleats

export interface GroupingFactorEntry {
  circuitsOrCables: number;
  bunched: number;
  singleLayerWall: number;
  singleLayerTray: number;
  singleLayerLadder: number;
}

// BS 7671 Table 4C1 - Complete grouping factors by arrangement
export const groupingFactorsTable4C1: GroupingFactorEntry[] = [
  { circuitsOrCables: 1, bunched: 1.00, singleLayerWall: 1.00, singleLayerTray: 1.00, singleLayerLadder: 1.00 },
  { circuitsOrCables: 2, bunched: 0.80, singleLayerWall: 0.85, singleLayerTray: 0.88, singleLayerLadder: 0.87 },
  { circuitsOrCables: 3, bunched: 0.70, singleLayerWall: 0.79, singleLayerTray: 0.82, singleLayerLadder: 0.82 },
  { circuitsOrCables: 4, bunched: 0.65, singleLayerWall: 0.75, singleLayerTray: 0.77, singleLayerLadder: 0.80 },
  { circuitsOrCables: 5, bunched: 0.60, singleLayerWall: 0.73, singleLayerTray: 0.75, singleLayerLadder: 0.80 },
  { circuitsOrCables: 6, bunched: 0.57, singleLayerWall: 0.72, singleLayerTray: 0.73, singleLayerLadder: 0.79 },
  { circuitsOrCables: 7, bunched: 0.54, singleLayerWall: 0.72, singleLayerTray: 0.73, singleLayerLadder: 0.79 },
  { circuitsOrCables: 8, bunched: 0.52, singleLayerWall: 0.71, singleLayerTray: 0.72, singleLayerLadder: 0.78 },
  { circuitsOrCables: 9, bunched: 0.50, singleLayerWall: 0.70, singleLayerTray: 0.72, singleLayerLadder: 0.78 },
  { circuitsOrCables: 12, bunched: 0.45, singleLayerWall: 0.70, singleLayerTray: 0.72, singleLayerLadder: 0.78 },
  { circuitsOrCables: 16, bunched: 0.41, singleLayerWall: 0.70, singleLayerTray: 0.72, singleLayerLadder: 0.78 },
  { circuitsOrCables: 20, bunched: 0.38, singleLayerWall: 0.70, singleLayerTray: 0.72, singleLayerLadder: 0.78 },
];

// Legacy interface for backward compatibility
export interface GroupingFactor {
  circuitsOrCables: number;
  factor: number;
}

// Legacy array for backward compatibility (bunched values)
export const groupingFactors: GroupingFactor[] = groupingFactorsTable4C1.map(g => ({
  circuitsOrCables: g.circuitsOrCables,
  factor: g.bunched
}));

// Helper functions to get factors by interpolation or lookup
export const getTemperatureFactor = (
  ambientTemp: number,
  cableType: '70C' | '90C'
): number => {
  const factors = ambientTemperatureFactors;
  const factorKey = cableType === '70C' ? 'factor70C' : 'factor90C';
  
  // Find exact match first
  const exactMatch = factors.find(f => f.ambientTemp === ambientTemp);
  if (exactMatch) {
    return exactMatch[factorKey];
  }
  
  // Find interpolation points
  const lowerPoint = factors
    .filter(f => f.ambientTemp <= ambientTemp)
    .sort((a, b) => b.ambientTemp - a.ambientTemp)[0];
    
  const upperPoint = factors
    .filter(f => f.ambientTemp >= ambientTemp)
    .sort((a, b) => a.ambientTemp - b.ambientTemp)[0];
  
  if (!lowerPoint) return factors[0][factorKey];
  if (!upperPoint) return factors[factors.length - 1][factorKey];
  if (lowerPoint === upperPoint) return lowerPoint[factorKey];
  
  // Linear interpolation
  const ratio = (ambientTemp - lowerPoint.ambientTemp) / 
                (upperPoint.ambientTemp - lowerPoint.ambientTemp);
  
  return lowerPoint[factorKey] + 
         ratio * (upperPoint[factorKey] - lowerPoint[factorKey]);
};

export const getSoilTemperatureFactor = (
  soilTemp: number,
  cableType: '70C' | '90C'
): number => {
  const factors = soilTemperatureFactors;
  const factorKey = cableType === '70C' ? 'factor70C' : 'factor90C';
  
  // Find exact match first
  const exactMatch = factors.find(f => f.soilTemp === soilTemp);
  if (exactMatch) {
    return exactMatch[factorKey];
  }
  
  // Find interpolation points
  const lowerPoint = factors
    .filter(f => f.soilTemp <= soilTemp)
    .sort((a, b) => b.soilTemp - a.soilTemp)[0];
    
  const upperPoint = factors
    .filter(f => f.soilTemp >= soilTemp)
    .sort((a, b) => a.soilTemp - b.soilTemp)[0];
  
  if (!lowerPoint) return factors[0][factorKey];
  if (!upperPoint) return factors[factors.length - 1][factorKey];
  if (lowerPoint === upperPoint) return lowerPoint[factorKey];
  
  // Linear interpolation
  const ratio = (soilTemp - lowerPoint.soilTemp) / 
                (upperPoint.soilTemp - lowerPoint.soilTemp);
  
  return lowerPoint[factorKey] + 
         ratio * (upperPoint[factorKey] - lowerPoint[factorKey]);
};

// Enhanced grouping factor function with arrangement support
export const getGroupingFactor = (
  circuitsOrCables: number,
  arrangement: GroupingArrangement = 'bunched'
): number => {
  if (circuitsOrCables <= 1) return 1.00;
  
  const keyMap: Record<GroupingArrangement, keyof GroupingFactorEntry> = {
    'bunched': 'bunched',
    'single-layer-wall': 'singleLayerWall',
    'single-layer-tray': 'singleLayerTray',
    'single-layer-ladder': 'singleLayerLadder'
  };
  
  const key = keyMap[arrangement];
  
  const exactMatch = groupingFactorsTable4C1.find(g => g.circuitsOrCables === circuitsOrCables);
  if (exactMatch) return exactMatch[key] as number;
  
  // Find the next highest value for conservative approach
  const higherFactor = groupingFactorsTable4C1
    .filter(g => g.circuitsOrCables > circuitsOrCables)
    .sort((a, b) => a.circuitsOrCables - b.circuitsOrCables)[0];
  
  if (higherFactor) return higherFactor[key] as number;
  return groupingFactorsTable4C1[groupingFactorsTable4C1.length - 1][key] as number;
};