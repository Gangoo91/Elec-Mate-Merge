/**
 * Post-Response Calculation Validation
 * Validates AI-generated calculations against ground truth
 */

export interface CalculationValidation {
  isValid: boolean;
  errors: CalculationError[];
  warnings: CalculationWarning[];
  confidence: number;
}

export interface CalculationError {
  field: string;
  expected: number;
  actual: number;
  deviation: number;
  message: string;
}

export interface CalculationWarning {
  field: string;
  message: string;
}

/**
 * Extract calculations from AI response text
 */
export function parseCalculationsFromResponse(responseText: string): any {
  const calculations: any = {};
  
  // Extract design current (Ib)
  const ibMatch = responseText.match(/design current.*?(\d+(?:\.\d+)?)\s*A/i);
  if (ibMatch) {
    calculations.designCurrent = parseFloat(ibMatch[1]);
  }
  
  // Extract MCB rating (In)
  const inMatch = responseText.match(/(?:MCB|RCBO).*?(\d+)\s*A/i);
  if (inMatch) {
    calculations.mcbRating = parseInt(inMatch[1]);
  }
  
  // Extract cable size
  const cableSizeMatch = responseText.match(/(\d+(?:\.\d+)?)\s*mm²/i);
  if (cableSizeMatch) {
    calculations.cableSize = parseFloat(cableSizeMatch[1]);
  }
  
  // Extract voltage drop
  const vdMatch = responseText.match(/voltage drop.*?(\d+(?:\.\d+)?)\s*%/i);
  if (vdMatch) {
    calculations.voltageDrop = parseFloat(vdMatch[1]);
  }
  
  // Extract tabulated current (Iz)
  const izMatch = responseText.match(/(?:Iz|tabulated|rating).*?(\d+)\s*A/i);
  if (izMatch) {
    calculations.tabulatedCurrent = parseInt(izMatch[1]);
  }
  
  return calculations;
}

/**
 * Validate extracted calculations against expected values
 */
export function validateCalculations(
  extractedCalcs: any,
  circuitParams: any
): CalculationValidation {
  const errors: CalculationError[] = [];
  const warnings: CalculationWarning[] = [];
  
  // === VALIDATE DESIGN CURRENT (Ib) ===
  if (extractedCalcs.designCurrent && circuitParams.power && circuitParams.voltage) {
    const expectedIb = circuitParams.power / circuitParams.voltage;
    const deviation = Math.abs(extractedCalcs.designCurrent - expectedIb) / expectedIb;
    
    if (deviation > 0.15) { // 15% tolerance
      errors.push({
        field: 'designCurrent',
        expected: expectedIb,
        actual: extractedCalcs.designCurrent,
        deviation: deviation * 100,
        message: `Design current (Ib) mismatch: Expected ${expectedIb.toFixed(1)}A, got ${extractedCalcs.designCurrent}A (${(deviation * 100).toFixed(1)}% deviation)`
      });
    } else if (deviation > 0.05) { // 5% tolerance for warning
      warnings.push({
        field: 'designCurrent',
        message: `Design current slightly off: ${extractedCalcs.designCurrent}A vs expected ${expectedIb.toFixed(1)}A`
      });
    }
  }
  
  // === VALIDATE Ib ≤ In RELATIONSHIP ===
  if (extractedCalcs.designCurrent && extractedCalcs.mcbRating) {
    if (extractedCalcs.designCurrent > extractedCalcs.mcbRating) {
      errors.push({
        field: 'mcbRating',
        expected: extractedCalcs.designCurrent,
        actual: extractedCalcs.mcbRating,
        deviation: 0,
        message: `Regulation 433.1.1 violation: Ib (${extractedCalcs.designCurrent}A) must be ≤ In (${extractedCalcs.mcbRating}A)`
      });
    }
  }
  
  // === VALIDATE In ≤ Iz RELATIONSHIP ===
  if (extractedCalcs.mcbRating && extractedCalcs.tabulatedCurrent) {
    if (extractedCalcs.mcbRating > extractedCalcs.tabulatedCurrent) {
      errors.push({
        field: 'cableSize',
        expected: extractedCalcs.mcbRating,
        actual: extractedCalcs.tabulatedCurrent,
        deviation: 0,
        message: `Regulation 433.1.1 violation: In (${extractedCalcs.mcbRating}A) must be ≤ Iz (${extractedCalcs.tabulatedCurrent}A)`
      });
    }
  }
  
  // === VALIDATE VOLTAGE DROP ===
  if (extractedCalcs.voltageDrop !== undefined) {
    const limit = circuitParams.loadType === 'lighting' ? 3 : 5;
    
    if (extractedCalcs.voltageDrop > limit) {
      warnings.push({
        field: 'voltageDrop',
        message: `Voltage drop ${extractedCalcs.voltageDrop}% exceeds ${limit}% limit (Regulation 525) - should flag or upsize`
      });
    }
  }
  
  // Calculate confidence score
  const totalChecks = 4; // Design current, Ib≤In, In≤Iz, VD
  const passedChecks = totalChecks - errors.length;
  const confidence = (passedChecks / totalChecks) * 100;
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    confidence
  };
}

/**
 * Generate fix instructions for calculation errors
 */
export function generateFixInstructions(validation: CalculationValidation): string {
  if (validation.isValid) {
    return '';
  }
  
  const fixes = validation.errors.map(err => {
    switch (err.field) {
      case 'designCurrent':
        return `Recalculate design current: Ib = ${err.expected.toFixed(1)}A (P/V)`;
      case 'mcbRating':
        return `MCB rating must be ≥ Ib (${err.expected.toFixed(1)}A). Use next standard size: ${Math.ceil(err.expected / 10) * 10}A`;
      case 'cableSize':
        return `Cable undersized: Iz (${err.actual}A) must be ≥ In (${err.expected}A). Increase cable size.`;
      default:
        return err.message;
    }
  });
  
  return `CALCULATION ERRORS DETECTED:\n${fixes.join('\n')}\n\nRegenerate response with corrected values.`;
}
