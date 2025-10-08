// BS 7671:2018+A3:2024 - Thermal Insulation Correction Factors
// Table 52.2 and Regulation 523.9

export interface ThermalInsulationFactor {
  scenario: string;
  description: string;
  lengthInInsulation: number; // mm
  correctionFactor: number;
  regulation: string;
}

// BS 7671 Table 52.2 - Correction factors for cables in thermal insulation
export const THERMAL_INSULATION_FACTORS = {
  touchingOneSide: {
    description: "Cable touching one side of thermal insulation",
    factors: {
      100: 0.88,  // 100mm in insulation
      200: 0.81,  // 200mm in insulation
      400: 0.68,  // 400mm in insulation
      500: 0.63   // 500mm in insulation
    }
  },
  totallyEnclosed: {
    description: "Cable totally enclosed in thermal insulation",
    factors: {
      100: 0.81,
      200: 0.68,
      400: 0.55,
      500: 0.50
    }
  },
  betweenJoists: {
    description: "Cable between joists with insulation above",
    factors: {
      100: 0.94,
      200: 0.89,
      400: 0.81,
      500: 0.78
    }
  }
};

export function getThermalInsulationFactor(
  scenario: 'touchingOneSide' | 'totallyEnclosed' | 'betweenJoists',
  lengthInInsulation: number
): number {
  const factorTable = THERMAL_INSULATION_FACTORS[scenario].factors;
  
  // Find the appropriate factor for the length
  if (lengthInInsulation <= 100) return factorTable[100];
  if (lengthInInsulation <= 200) return factorTable[200];
  if (lengthInInsulation <= 400) return factorTable[400];
  return factorTable[500];
}

// Regulation 523.9 - Grouped cables in thermal insulation
export const GROUPED_IN_INSULATION_FACTORS = {
  1: 0.50,  // Single cable
  2: 0.45,  // Two cables
  3: 0.41,  // Three cables
  4: 0.38   // Four or more cables
};

export function getGroupedInsulationFactor(numberOfCables: number): number {
  if (numberOfCables === 1) return GROUPED_IN_INSULATION_FACTORS[1];
  if (numberOfCables === 2) return GROUPED_IN_INSULATION_FACTORS[2];
  if (numberOfCables === 3) return GROUPED_IN_INSULATION_FACTORS[3];
  return GROUPED_IN_INSULATION_FACTORS[4];
}
