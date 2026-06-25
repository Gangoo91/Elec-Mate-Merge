import { TestResult } from '@/types/testResult';

// Single-conductor DC resistance (mΩ/m at 20°C), copper — BS 7671 Table 9A.
// Verified against bs7671_facets. Keyed by NUMERIC conductor CSA so the lookup
// works regardless of how the circuit stored the size: '2.5', '2.5mm' and
// '2.5 mm²' all parse to 2.5 (the old string-keyed map silently returned 0 when
// the stored value lacked the 'mm' suffix — ELE-1181).
const RESISTANCE_BY_CSA: Record<string, number> = {
  '1': 18.1,
  '1.5': 12.1,
  '2.5': 7.41,
  '4': 4.61,
  '6': 3.08,
  '10': 1.83,
  '16': 1.15,
  '25': 0.727,
};

// Resistance (mΩ/m at 20°C) for a stored size string, or null if unknown.
const resistanceForSize = (size: string | null | undefined): number | null => {
  const csa = parseFloat(size ?? '');
  if (!isFinite(csa) || csa <= 0) return null;
  // Normalise the parsed number to its key form (2.5 → '2.5', 4 → '4').
  return RESISTANCE_BY_CSA[String(csa)] ?? null;
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
  // Ambient test-temperature correction (GN3: 1 + 0.004×(ambient−20)); 1.0 at
  // 20°C. R1+R2 continuity is recorded at AMBIENT — NOT the operating-temperature
  // (~1.20) factor, which applies only to Zs, not the recorded R1+R2.
  temperatureCorrection: number = 1.0
): number => {
  const rLive = resistanceForSize(liveSize);
  // CPC defaults to the line size if not separately specified.
  const rCpc = resistanceForSize(cpcSize || liveSize) ?? rLive;

  if (rLive == null || rCpc == null) {
    console.warn(`Cable resistance not found for live "${liveSize}" / cpc "${cpcSize}"`);
    return 0;
  }

  // R1+R2 = (r_line + r_cpc) per metre × length × temperature correction
  const r1r2PerMeter = (rLive + rCpc) / 1000; // mΩ/m → Ω/m
  return r1r2PerMeter * lengthMeters * temperatureCorrection;
};

// Comprehensive R1+R2 analysis
export const analyseR1R2 = (
  result: TestResult,
  cableLength: number,
  temperatureCorrection: number = 1.0
): R1R2Calculation => {
  const expectedR1R2 = calculateExpectedR1R2(
    result.liveSize,
    result.cpcSize,
    cableLength,
    temperatureCorrection
  );

  const actualR1R2 = result.r1r2 ? parseFloat(result.r1r2) : null;
  const difference = actualR1R2 ? actualR1R2 - expectedR1R2 : null;
  const tolerancePercentage =
    difference && expectedR1R2 > 0 ? (difference / expectedR1R2) * 100 : 0;

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
      warnings.push(
        `R1+R2 reading is ${Math.abs(tolerancePercentage).toFixed(1)}% lower than expected`
      );
      recommendations.push('Verify test instrument calibration');
      recommendations.push('Check for parallel paths or incorrect cable identification');
    }
  }

  // Ring circuit specific checks
  if (
    result.circuitDescription?.toLowerCase().includes('ring') ||
    result.type?.toLowerCase().includes('ring')
  ) {
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
    recommendations,
  };
};

// Get single-conductor resistance (mΩ/m at 20°C) for a live/cpc combination.
export const getCableResistance = (liveSize: string, cpcSize?: string) => {
  const live = resistanceForSize(liveSize);
  const cpc = resistanceForSize(cpcSize || liveSize) ?? live;
  if (live == null || cpc == null) return null;
  return { live, cpc };
};
