
import { TestResult } from '@/types/testResult';

// Cable resistance values (mΩ/m at 20°C) - from BS 7671 Table 9A
const CABLE_RESISTANCE_DATA = {
  '1.0mm': { live: 18.1, cpc: 18.1 },
  '1.5mm': { live: 12.1, cpc: 12.1 },
  '2.5mm': { live: 7.41, cpc: 7.41 },
  '4.0mm': { live: 4.61, cpc: 4.61 },
  '6.0mm': { live: 3.08, cpc: 3.08 },
  '10mm': { live: 1.83, cpc: 1.83 },
  '16mm': { live: 1.15, cpc: 1.15 },
  '25mm': { live: 0.727, cpc: 0.727 },
  // Common CPC size variations
  '1.0mm-1.5mm': { live: 18.1, cpc: 12.1 }, // 1.0mm live, 1.5mm CPC
  '2.5mm-1.5mm': { live: 7.41, cpc: 12.1 }, // 2.5mm live, 1.5mm CPC
  '4.0mm-2.5mm': { live: 4.61, cpc: 7.41 }, // 4.0mm live, 2.5mm CPC
  '6.0mm-4.0mm': { live: 3.08, cpc: 4.61 }, // 6.0mm live, 4.0mm CPC
  '10mm-6.0mm': { live: 1.83, cpc: 3.08 }, // 10mm live, 6.0mm CPC
};

export interface R1R2Calculation {
  expectedR1R2: number;
  actualR1R2: number | null;
  difference: number | null;
  isWithinTolerance: boolean;
  tolerancePercentage: number;
  warnings: string[];
  recommendations: string[];
}

// Calculate expected R1+R2 based on cable type and length
export const calculateExpectedR1R2 = (
  liveSize: string, 
  cpcSize: string | null, 
  lengthMeters: number,
  temperatureCorrection: number = 1.2 // Default 20% increase for operating temperature
): number => {
  const cableKey = cpcSize && cpcSize !== liveSize 
    ? `${liveSize}-${cpcSize}` 
    : liveSize;
  
  const resistance = CABLE_RESISTANCE_DATA[cableKey as keyof typeof CABLE_RESISTANCE_DATA];
  
  if (!resistance) {
    console.warn(`Cable resistance data not found for ${cableKey}`);
    return 0;
  }
  
  // R1+R2 = (R1 + R2) × length × temperature correction
  const r1r2PerMeter = (resistance.live + resistance.cpc) / 1000; // Convert mΩ to Ω
  return r1r2PerMeter * lengthMeters * temperatureCorrection;
};

// Comprehensive R1+R2 analysis
export const analyseR1R2 = (
  result: TestResult, 
  cableLength: number,
  temperatureCorrection: number = 1.2
): R1R2Calculation => {
  const expectedR1R2 = calculateExpectedR1R2(
    result.liveSize, 
    result.cpcSize, 
    cableLength, 
    temperatureCorrection
  );
  
  const actualR1R2 = result.r1r2 ? parseFloat(result.r1r2) : null;
  const difference = actualR1R2 ? actualR1R2 - expectedR1R2 : null;
  const tolerancePercentage = difference && expectedR1R2 > 0 ? (difference / expectedR1R2) * 100 : 0;
  
  const warnings: string[] = [];
  const recommendations: string[] = [];
  
  // Check if within acceptable tolerance (±20%)
  const isWithinTolerance = Math.abs(tolerancePercentage) <= 20;
  
  if (actualR1R2 && !isWithinTolerance) {
    if (tolerancePercentage > 20) {
      warnings.push(`R1+R2 reading is ${tolerancePercentage.toFixed(1)}% higher than expected`);
      recommendations.push('Check for loose connections or damaged conductors');
      recommendations.push('Verify cable length measurement');
      recommendations.push('Consider cable condition and joint resistance');
    } else if (tolerancePercentage < -20) {
      warnings.push(`R1+R2 reading is ${Math.abs(tolerancePercentage).toFixed(1)}% lower than expected`);
      recommendations.push('Verify test instrument calibration');
      recommendations.push('Check for parallel paths or incorrect cable identification');
    }
  }
  
  // Ring circuit specific checks
  if (result.circuitDescription?.toLowerCase().includes('ring') || result.type?.toLowerCase().includes('ring')) {
    if (actualR1R2 && actualR1R2 > 1.67) {
      warnings.push('R1+R2 exceeds 1.67Ω limit for ring final circuits');
      recommendations.push('Check ring continuity - may be wired as radial');
    }
  }
  
  return {
    expectedR1R2: Number(expectedR1R2.toFixed(3)),
    actualR1R2,
    difference: difference ? Number(difference.toFixed(3)) : null,
    isWithinTolerance,
    tolerancePercentage: Number(tolerancePercentage.toFixed(1)),
    warnings,
    recommendations
  };
};

// Get cable resistance for a specific size combination
export const getCableResistance = (liveSize: string, cpcSize?: string) => {
  const cableKey = cpcSize && cpcSize !== liveSize 
    ? `${liveSize}-${cpcSize}` 
    : liveSize;
  
  return CABLE_RESISTANCE_DATA[cableKey as keyof typeof CABLE_RESISTANCE_DATA] || null;
};
