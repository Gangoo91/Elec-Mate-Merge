/**
 * BS 7671:2018+A2:2022 Appendix 4
 * Cable Rating Correction Factors
 * 
 * Temperature, Grouping, and Thermal Insulation Derating Factors
 */

export interface CorrectionFactor {
  condition: string;
  factor: number;
  regulation: string;
}

/**
 * Table 4B1 - Temperature Correction Factors (Ca)
 * For ambient AIR temperatures other than 30°C
 * 
 * Reference ambient: 30°C for cables in air
 * Insulation types: 70°C PVC and 90°C XLPE
 */
export const TEMPERATURE_FACTORS_AIR: Record<number, { pvc70: number; xlpe90: number }> = {
  10: { pvc70: 1.22, xlpe90: 1.15 },
  15: { pvc70: 1.17, xlpe90: 1.12 },
  20: { pvc70: 1.12, xlpe90: 1.08 },
  25: { pvc70: 1.06, xlpe90: 1.04 },
  30: { pvc70: 1.00, xlpe90: 1.00 }, // Reference temperature
  35: { pvc70: 0.94, xlpe90: 0.96 },
  40: { pvc70: 0.87, xlpe90: 0.91 },
  45: { pvc70: 0.79, xlpe90: 0.87 },
  50: { pvc70: 0.71, xlpe90: 0.82 },
  55: { pvc70: 0.61, xlpe90: 0.76 },
  60: { pvc70: 0.50, xlpe90: 0.71 },
  65: { pvc70: 0.35, xlpe90: 0.65 },
  70: { pvc70: 0.00, xlpe90: 0.58 },
  75: { pvc70: 0.00, xlpe90: 0.50 },
  80: { pvc70: 0.00, xlpe90: 0.41 },
  85: { pvc70: 0.00, xlpe90: 0.29 },
  90: { pvc70: 0.00, xlpe90: 0.00 },
};

/**
 * Table 4B2 - Temperature Correction Factors (Ca)
 * For ambient GROUND temperatures other than 20°C
 * 
 * Reference ambient: 20°C for buried cables
 */
export const TEMPERATURE_FACTORS_GROUND: Record<number, { pvc70: number; xlpe90: number }> = {
  10: { pvc70: 1.10, xlpe90: 1.07 },
  15: { pvc70: 1.05, xlpe90: 1.04 },
  20: { pvc70: 1.00, xlpe90: 1.00 }, // Reference temperature
  25: { pvc70: 0.95, xlpe90: 0.96 },
  30: { pvc70: 0.89, xlpe90: 0.93 },
  35: { pvc70: 0.84, xlpe90: 0.89 },
  40: { pvc70: 0.77, xlpe90: 0.85 },
  45: { pvc70: 0.71, xlpe90: 0.80 },
  50: { pvc70: 0.63, xlpe90: 0.76 },
  55: { pvc70: 0.55, xlpe90: 0.71 },
  60: { pvc70: 0.45, xlpe90: 0.65 },
  65: { pvc70: 0.32, xlpe90: 0.60 },
  70: { pvc70: 0.00, xlpe90: 0.53 },
  75: { pvc70: 0.00, xlpe90: 0.46 },
  80: { pvc70: 0.00, xlpe90: 0.38 },
};

/**
 * Get temperature correction factor
 * 
 * @param ambientTemp - Ambient temperature in °C
 * @param insulationType - Cable insulation type
 * @param location - 'air' or 'ground'
 * @returns Correction factor Ca
 */
export function getTemperatureFactor(
  ambientTemp: number,
  insulationType: '70°C PVC' | '90°C XLPE',
  location: 'air' | 'ground'
): { factor: number; regulation: string } {
  const table = location === 'air' ? TEMPERATURE_FACTORS_AIR : TEMPERATURE_FACTORS_GROUND;
  const tempKey = Math.round(ambientTemp / 5) * 5; // Round to nearest 5°C
  
  const data = table[tempKey];
  if (!data) {
    // Return conservative value for out-of-range temps
    return { 
      factor: 0.5, 
      regulation: location === 'air' ? 'Table 4B1' : 'Table 4B2' 
    };
  }
  
  const factor = insulationType === '70°C PVC' ? data.pvc70 : data.xlpe90;
  return { 
    factor, 
    regulation: location === 'air' ? 'Table 4B1' : 'Table 4B2' 
  };
}

/**
 * Table 4C1 - Grouping Factors (Cg)
 * For circuits in conduit, trunking, or clipped direct
 * 
 * Reference Method: A, B, C
 */
export interface GroupingFactorData {
  numberOfCircuits: number;
  arrangementCategory: 'enclosed' | 'clipped-direct-touching' | 'clipped-direct-spaced' | 'single-layer-on-wall' | 'single-layer-ceiling';
  factor: number;
}

export const GROUPING_FACTORS_ENCLOSED: GroupingFactorData[] = [
  { numberOfCircuits: 1, arrangementCategory: 'enclosed', factor: 1.00 },
  { numberOfCircuits: 2, arrangementCategory: 'enclosed', factor: 0.80 },
  { numberOfCircuits: 3, arrangementCategory: 'enclosed', factor: 0.70 },
  { numberOfCircuits: 4, arrangementCategory: 'enclosed', factor: 0.65 },
  { numberOfCircuits: 5, arrangementCategory: 'enclosed', factor: 0.60 },
  { numberOfCircuits: 6, arrangementCategory: 'enclosed', factor: 0.57 },
  { numberOfCircuits: 7, arrangementCategory: 'enclosed', factor: 0.54 },
  { numberOfCircuits: 8, arrangementCategory: 'enclosed', factor: 0.52 },
  { numberOfCircuits: 9, arrangementCategory: 'enclosed', factor: 0.50 },
  { numberOfCircuits: 10, arrangementCategory: 'enclosed', factor: 0.48 },
  { numberOfCircuits: 12, arrangementCategory: 'enclosed', factor: 0.45 },
  { numberOfCircuits: 14, arrangementCategory: 'enclosed', factor: 0.43 },
  { numberOfCircuits: 16, arrangementCategory: 'enclosed', factor: 0.41 },
  { numberOfCircuits: 18, arrangementCategory: 'enclosed', factor: 0.39 },
  { numberOfCircuits: 20, arrangementCategory: 'enclosed', factor: 0.38 },
];

export const GROUPING_FACTORS_CLIPPED_TOUCHING: GroupingFactorData[] = [
  { numberOfCircuits: 1, arrangementCategory: 'clipped-direct-touching', factor: 1.00 },
  { numberOfCircuits: 2, arrangementCategory: 'clipped-direct-touching', factor: 0.85 },
  { numberOfCircuits: 3, arrangementCategory: 'clipped-direct-touching', factor: 0.79 },
  { numberOfCircuits: 4, arrangementCategory: 'clipped-direct-touching', factor: 0.75 },
  { numberOfCircuits: 5, arrangementCategory: 'clipped-direct-touching', factor: 0.73 },
  { numberOfCircuits: 6, arrangementCategory: 'clipped-direct-touching', factor: 0.72 },
  { numberOfCircuits: 7, arrangementCategory: 'clipped-direct-touching', factor: 0.72 },
  { numberOfCircuits: 8, arrangementCategory: 'clipped-direct-touching', factor: 0.71 },
  { numberOfCircuits: 9, arrangementCategory: 'clipped-direct-touching', factor: 0.70 },
];

/**
 * Get grouping correction factor
 * 
 * @param numberOfCircuits - Number of circuits or cables in group
 * @param arrangementCategory - Installation arrangement
 * @returns Correction factor Cg
 */
export function getGroupingFactor(
  numberOfCircuits: number,
  arrangementCategory: 'enclosed' | 'clipped-direct-touching' | 'single-layer'
): { factor: number; regulation: string } {
  const table = arrangementCategory === 'enclosed' 
    ? GROUPING_FACTORS_ENCLOSED 
    : GROUPING_FACTORS_CLIPPED_TOUCHING;
  
  // Find exact match or next higher value
  const match = table.find(g => g.numberOfCircuits >= numberOfCircuits);
  
  if (!match) {
    // For very large groups, use most conservative factor
    return { factor: 0.35, regulation: 'Table 4C1' };
  }
  
  return { factor: match.factor, regulation: 'Table 4C1' };
}

/**
 * Calculate overall correction factor
 * Overall Factor = Ca × Cg × Ci (if applicable)
 * 
 * where:
 * - Ca = Temperature correction factor
 * - Cg = Grouping correction factor
 * - Ci = Thermal insulation factor (if applicable)
 * 
 * Then: Iz (derated capacity) = It (tabulated capacity) × Overall Factor
 */
export function calculateOverallCorrectionFactor(params: {
  ambientTemp: number;
  numberOfCircuits: number;
  insulationType: '70°C PVC' | '90°C XLPE';
  location: 'air' | 'ground';
  arrangementCategory: 'enclosed' | 'clipped-direct-touching' | 'single-layer';
  thermalInsulation?: 'none' | 'touching-one-side' | 'surrounded' | 'totally-surrounded';
}): {
  temperatureFactor: number;
  groupingFactor: number;
  thermalInsulationFactor: number;
  overallFactor: number;
  regulations: string[];
} {
  const tempResult = getTemperatureFactor(params.ambientTemp, params.insulationType, params.location);
  const groupResult = getGroupingFactor(params.numberOfCircuits, params.arrangementCategory);
  
  // Thermal insulation factors (simplified)
  let thermalInsulationFactor = 1.0;
  let thermalReg = '';
  
  if (params.thermalInsulation) {
    switch (params.thermalInsulation) {
      case 'touching-one-side':
        thermalInsulationFactor = 0.75;
        thermalReg = 'Reg 523.7';
        break;
      case 'surrounded':
        thermalInsulationFactor = 0.50;
        thermalReg = 'Reg 523.7';
        break;
      case 'totally-surrounded':
        thermalInsulationFactor = 0.50;
        thermalReg = 'Reg 523.7';
        break;
      default:
        thermalInsulationFactor = 1.0;
    }
  }
  
  const overallFactor = tempResult.factor * groupResult.factor * thermalInsulationFactor;
  
  const regulations = [tempResult.regulation, groupResult.regulation];
  if (thermalReg) regulations.push(thermalReg);
  
  return {
    temperatureFactor: Math.round(tempResult.factor * 100) / 100,
    groupingFactor: Math.round(groupResult.factor * 100) / 100,
    thermalInsulationFactor: Math.round(thermalInsulationFactor * 100) / 100,
    overallFactor: Math.round(overallFactor * 100) / 100,
    regulations
  };
}
