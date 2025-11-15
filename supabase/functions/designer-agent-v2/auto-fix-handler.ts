/**
 * Auto-Fix Handler for Validation Errors
 * Provides suggestions for fixing validation issues instead of failing the job
 */

export interface AutoFixSuggestion {
  warnings: string[];
  status: 'needs_review' | 'ok';
}

const CABLE_SIZES = [1.0, 1.5, 2.5, 4.0, 6.0, 10.0, 16.0, 25.0, 35.0, 50.0, 70.0, 95.0, 120.0];

/**
 * Suggests cable size increase for high voltage drop
 */
export function suggestVoltageDropFix(
  circuitName: string,
  currentVD: number,
  limit: number,
  currentCableSize: string | undefined,
  cableLength: number
): AutoFixSuggestion {
  // FIX #1: Add null/undefined checks to prevent .toFixed() crashes
  if (currentVD == null || limit == null || currentCableSize == null || cableLength == null) {
    return {
      warnings: [`⚠️ AUTO-FIX REQUIRED: Voltage drop validation failed - missing calculation data for ${circuitName}`],
      status: 'needs_review'
    };
  }
  
  const currentSize = parseFloat(currentCableSize);
  const nextSize = CABLE_SIZES.find(s => s > currentSize);
  
  const warning = `⚠️ AUTO-FIX REQUIRED: Voltage drop ${currentVD.toFixed(2)}% exceeds ${limit.toFixed(1)}% limit. ` +
    `Increase cable size from ${currentSize}mm² to ${nextSize || 'larger'}mm² OR reduce cable length from ${cableLength}m.`;
  
  return {
    warnings: [warning],
    status: 'needs_review'
  };
}

/**
 * Suggests cable size increase for high Zs
 */
export function suggestZsFix(
  circuitName: string,
  currentZs: number,
  maxZs: number,
  currentCableSize: string | undefined,
  cableLength: number
): AutoFixSuggestion {
  // FIX #1: Add null/undefined checks to prevent .toFixed() crashes
  if (currentZs == null || maxZs == null || currentCableSize == null || cableLength == null) {
    return {
      warnings: [`⚠️ AUTO-FIX REQUIRED: Zs validation failed - missing calculation data for ${circuitName}`],
      status: 'needs_review'
    };
  }
  
  const currentSize = parseFloat(currentCableSize);
  const nextSize = CABLE_SIZES.find(s => s > currentSize);
  
  const warning = `⚠️ AUTO-FIX REQUIRED: Zs ${currentZs.toFixed(2)}Ω exceeds max ${maxZs.toFixed(2)}Ω. ` +
    `Increase cable size from ${currentSize}mm² to ${nextSize || 'larger'}mm² OR reduce cable length from ${cableLength}m.`;
  
  return {
    warnings: [warning],
    status: 'needs_review'
  };
}
