// BS 7671 Appendix 4 Temperature Rating Factors
// Table 4B1 - Rating factors for ambient air temperature (Ca)

export interface TemperatureFactor {
  ambientTemp: number;
  factor70C: number; // Thermoplastic insulation
  factor90C: number; // Thermosetting insulation
  /** Table 4B1 "Mineral — thermoplastic covered or bare and exposed to touch, 70 °C sheath" column */
  factorMineralExposed?: number;
}

// BS 7671 Table 4B1 - Ambient air temperature rating factors
export const ambientTemperatureFactors: TemperatureFactor[] = [
  // 25 °C row read off the printed Table 4B1 (BS7671_ocr.pdf), 2026-08-06. The
  // row runs 1.02 / 1.03 / 1.04 across the 60 °C thermosetting, 70 °C
  // thermoplastic and 90 °C thermosetting columns. factor90C was 1.02 here —
  // the 60 °C thermosetting value, one column to the left. Every other cell of
  // this column matches the printed 90 °C series, so it was a single-cell slip.
  { ambientTemp: 25, factor70C: 1.03, factor90C: 1.04, factorMineralExposed: 1.07 },
  { ambientTemp: 30, factor70C: 1.0, factor90C: 1.0, factorMineralExposed: 1.0 },
  { ambientTemp: 35, factor70C: 0.94, factor90C: 0.96, factorMineralExposed: 0.93 },
  { ambientTemp: 40, factor70C: 0.87, factor90C: 0.91, factorMineralExposed: 0.85 },
  { ambientTemp: 45, factor70C: 0.79, factor90C: 0.87, factorMineralExposed: 0.78 },
  { ambientTemp: 50, factor70C: 0.71, factor90C: 0.82, factorMineralExposed: 0.67 },
  { ambientTemp: 55, factor70C: 0.61, factor90C: 0.76, factorMineralExposed: 0.57 },
  { ambientTemp: 60, factor70C: 0.5, factor90C: 0.71, factorMineralExposed: 0.45 },
  // 4B1 tabulates nothing beyond 60 °C for 70 °C insulation — zeros act as a hard stop
  // Table 4B1 prints a dash for 70 °C thermoplastic above 60 °C — there is no
  // published factor. 0.35 was invented here, contradicting the note above; 0
  // makes it a hard stop like the rows below.
  { ambientTemp: 65, factor70C: 0.0, factor90C: 0.65 },
  { ambientTemp: 70, factor70C: 0.0, factor90C: 0.58 },
  { ambientTemp: 75, factor70C: 0.0, factor90C: 0.5 },
  { ambientTemp: 80, factor70C: 0.0, factor90C: 0.41 },
];

// BS 7671 Table 4B2 - Soil temperature rating factors
export interface SoilTemperatureFactor {
  soilTemp: number;
  factor70C: number;
  factor90C: number;
}

export const soilTemperatureFactors: SoilTemperatureFactor[] = [
  { soilTemp: 10, factor70C: 1.1, factor90C: 1.07 },
  { soilTemp: 15, factor70C: 1.05, factor90C: 1.04 },
  { soilTemp: 20, factor70C: 1.0, factor90C: 1.0 },
  { soilTemp: 25, factor70C: 0.95, factor90C: 0.96 },
  { soilTemp: 30, factor70C: 0.89, factor90C: 0.93 },
  { soilTemp: 35, factor70C: 0.84, factor90C: 0.89 },
  { soilTemp: 40, factor70C: 0.77, factor90C: 0.85 },
  { soilTemp: 45, factor70C: 0.71, factor90C: 0.8 },
  { soilTemp: 50, factor70C: 0.63, factor90C: 0.76 },
  { soilTemp: 55, factor70C: 0.55, factor90C: 0.71 },
  { soilTemp: 60, factor70C: 0.45, factor90C: 0.65 },
  { soilTemp: 65, factor70C: 0.32, factor90C: 0.6 },
];

// BS 7671 Table 4C1 - Grouping factors (Cg)
// Now with arrangement-specific factors
export type GroupingArrangement =
  | 'bunched' // Item 1 - Bunched in air, on surface, embedded, enclosed
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
  {
    circuitsOrCables: 1,
    bunched: 1.0,
    singleLayerWall: 1.0,
    singleLayerTray: 1.0,
    singleLayerLadder: 1.0,
  },
  {
    circuitsOrCables: 2,
    bunched: 0.8,
    singleLayerWall: 0.85,
    singleLayerTray: 0.88,
    singleLayerLadder: 0.87,
  },
  {
    circuitsOrCables: 3,
    bunched: 0.7,
    singleLayerWall: 0.79,
    singleLayerTray: 0.82,
    singleLayerLadder: 0.82,
  },
  {
    circuitsOrCables: 4,
    bunched: 0.65,
    singleLayerWall: 0.75,
    singleLayerTray: 0.77,
    singleLayerLadder: 0.8,
  },
  {
    circuitsOrCables: 5,
    bunched: 0.6,
    singleLayerWall: 0.73,
    singleLayerTray: 0.75,
    singleLayerLadder: 0.8,
  },
  {
    circuitsOrCables: 6,
    bunched: 0.57,
    singleLayerWall: 0.72,
    singleLayerTray: 0.73,
    singleLayerLadder: 0.79,
  },
  {
    circuitsOrCables: 7,
    bunched: 0.54,
    singleLayerWall: 0.72,
    singleLayerTray: 0.73,
    singleLayerLadder: 0.79,
  },
  {
    circuitsOrCables: 8,
    bunched: 0.52,
    singleLayerWall: 0.71,
    singleLayerTray: 0.72,
    singleLayerLadder: 0.78,
  },
  {
    circuitsOrCables: 9,
    bunched: 0.5,
    singleLayerWall: 0.7,
    singleLayerTray: 0.72,
    singleLayerLadder: 0.78,
  },
  {
    circuitsOrCables: 12,
    bunched: 0.45,
    singleLayerWall: 0.7,
    singleLayerTray: 0.72,
    singleLayerLadder: 0.78,
  },
  {
    circuitsOrCables: 16,
    bunched: 0.41,
    singleLayerWall: 0.7,
    singleLayerTray: 0.72,
    singleLayerLadder: 0.78,
  },
  {
    circuitsOrCables: 20,
    bunched: 0.38,
    singleLayerWall: 0.7,
    singleLayerTray: 0.72,
    singleLayerLadder: 0.78,
  },
];

// Legacy interface for backward compatibility
export interface GroupingFactor {
  circuitsOrCables: number;
  factor: number;
}

// Legacy array for backward compatibility (bunched values)
export const groupingFactors: GroupingFactor[] = groupingFactorsTable4C1.map((g) => ({
  circuitsOrCables: g.circuitsOrCables,
  factor: g.bunched,
}));

// Helper functions to get factors by interpolation or lookup
export const getTemperatureFactor = (
  ambientTemp: number,
  cableType: '70C' | '90C' | '70C-mineral'
): number => {
  const factors = ambientTemperatureFactors.filter(
    (f) => cableType !== '70C-mineral' || f.factorMineralExposed !== undefined
  );
  const factorKey =
    cableType === '70C-mineral'
      ? ('factorMineralExposed' as const)
      : cableType === '70C'
        ? ('factor70C' as const)
        : ('factor90C' as const);

  // Find exact match first
  const exactMatch = factors.find((f) => f.ambientTemp === ambientTemp);
  if (exactMatch) {
    return exactMatch[factorKey] ?? 0;
  }

  // Find interpolation points
  const lowerPoint = factors
    .filter((f) => f.ambientTemp <= ambientTemp)
    .sort((a, b) => b.ambientTemp - a.ambientTemp)[0];

  const upperPoint = factors
    .filter((f) => f.ambientTemp >= ambientTemp)
    .sort((a, b) => a.ambientTemp - b.ambientTemp)[0];

  // Below the bottom of the table. Table 4B1 tabulates nothing under 25 C, so
  // there is no published bonus to grant: returning factors[0] handed out the
  // 25 C figure (1.03 for 70 C thermoplastic) at any ambient down to 0 C.
  // Clamp to the 30 C reference instead — the conservative reading, and the
  // only one the standard supports.
  if (!lowerPoint) return 1.0;
  if (!upperPoint) return factors[factors.length - 1][factorKey] ?? 0;
  if (lowerPoint === upperPoint) return lowerPoint[factorKey] ?? 0;

  // Linear interpolation
  const ratio =
    (ambientTemp - lowerPoint.ambientTemp) / (upperPoint.ambientTemp - lowerPoint.ambientTemp);

  return (lowerPoint[factorKey] ?? 0) + ratio * ((upperPoint[factorKey] ?? 0) - (lowerPoint[factorKey] ?? 0));
};

export const getSoilTemperatureFactor = (soilTemp: number, cableType: '70C' | '90C'): number => {
  const factors = soilTemperatureFactors;
  const factorKey = cableType === '70C' ? 'factor70C' : 'factor90C';

  // Find exact match first
  const exactMatch = factors.find((f) => f.soilTemp === soilTemp);
  if (exactMatch) {
    return exactMatch[factorKey];
  }

  // Find interpolation points
  const lowerPoint = factors
    .filter((f) => f.soilTemp <= soilTemp)
    .sort((a, b) => b.soilTemp - a.soilTemp)[0];

  const upperPoint = factors
    .filter((f) => f.soilTemp >= soilTemp)
    .sort((a, b) => a.soilTemp - b.soilTemp)[0];

  if (!lowerPoint) return factors[0][factorKey];
  if (!upperPoint) return factors[factors.length - 1][factorKey];
  if (lowerPoint === upperPoint) return lowerPoint[factorKey];

  // Linear interpolation
  const ratio = (soilTemp - lowerPoint.soilTemp) / (upperPoint.soilTemp - lowerPoint.soilTemp);

  return lowerPoint[factorKey] + ratio * (upperPoint[factorKey] - lowerPoint[factorKey]);
};

// Enhanced grouping factor function with arrangement support
export const getGroupingFactor = (
  circuitsOrCables: number,
  arrangement: GroupingArrangement = 'bunched'
): number => {
  if (circuitsOrCables <= 1) return 1.0;

  const keyMap: Record<GroupingArrangement, keyof GroupingFactorEntry> = {
    bunched: 'bunched',
    'single-layer-wall': 'singleLayerWall',
    'single-layer-tray': 'singleLayerTray',
    'single-layer-ladder': 'singleLayerLadder',
  };

  const key = keyMap[arrangement];

  const exactMatch = groupingFactorsTable4C1.find((g) => g.circuitsOrCables === circuitsOrCables);
  if (exactMatch) return exactMatch[key] as number;

  // Find the next highest value for conservative approach
  const higherFactor = groupingFactorsTable4C1
    .filter((g) => g.circuitsOrCables > circuitsOrCables)
    .sort((a, b) => a.circuitsOrCables - b.circuitsOrCables)[0];

  if (higherFactor) return higherFactor[key] as number;
  return groupingFactorsTable4C1[groupingFactorsTable4C1.length - 1][key] as number;
};
