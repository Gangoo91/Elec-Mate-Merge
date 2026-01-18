/**
 * Voice Tool Validation
 *
 * Validates voice tool calls to prevent production failures.
 * Ensures field names and values are valid before updating state.
 */

import { TestResult } from '@/types/testResult';
import { resolveFieldName, getAllFieldNames } from './voiceFieldAliases';
import { resolveDropdownValue, isDropdownField } from './voiceDropdownResolver';

// All valid TestResult field names (must match TestResult type exactly)
export const VALID_TEST_RESULT_FIELDS: (keyof TestResult)[] = [
  'id',
  'circuitNumber',
  'circuitDesignation',
  'circuitDescription',
  'circuitType',
  'type',
  'typeOfWiring',
  'referenceMethod',
  'pointsServed',
  'liveSize',
  'cpcSize',
  'bsStandard',
  'protectiveDeviceType',
  'protectiveDeviceCurve',
  'protectiveDeviceRating',
  'protectiveDeviceKaRating',
  'protectiveDeviceLocation',
  'protectiveDevice',
  'cableSize',
  'maxZs',
  'rcdBsStandard',
  'rcdType',
  'rcdRating',
  'rcdRatingA',
  'ringR1',
  'ringRn',
  'ringR2',
  'ringContinuityLive',
  'ringContinuityNeutral',
  'r1r2',
  'r2',
  'insulationTestVoltage',
  'insulationResistance',
  'insulationLiveNeutral',
  'insulationLiveEarth',
  'insulationNeutralEarth',
  'polarity',
  'zs',
  'rcdOneX',
  'rcdFiveX',
  'rcdTestButton',
  'afddTest',
  'pfc',
  'pfcLiveNeutral',
  'pfcLiveEarth',
  'functionalTesting',
  'notes',
  'phaseType',
  'phaseRotation',
  'phaseBalanceL1',
  'phaseBalanceL2',
  'phaseBalanceL3',
  'lineToLineVoltage',
];

export interface ValidationResult {
  valid: boolean;
  resolvedField: string | null;
  resolvedValue: string;
  error: string | null;
  warning: string | null;
}

/**
 * Validates and resolves a field name for voice tool calls
 */
export function validateField(spokenField: string): { valid: boolean; resolvedField: string | null; error: string | null } {
  // First try to resolve using aliases
  const resolved = resolveFieldName(spokenField);

  if (resolved && VALID_TEST_RESULT_FIELDS.includes(resolved as keyof TestResult)) {
    return { valid: true, resolvedField: resolved, error: null };
  }

  // Check if the spoken field is already a valid field name (case-insensitive)
  const directMatch = VALID_TEST_RESULT_FIELDS.find(
    f => f.toLowerCase() === spokenField.toLowerCase()
  );

  if (directMatch) {
    return { valid: true, resolvedField: directMatch, error: null };
  }

  // Field not found - provide helpful error message
  const suggestions = findSimilarFields(spokenField);
  const suggestionText = suggestions.length > 0
    ? ` Did you mean: ${suggestions.join(', ')}?`
    : '';

  console.warn(`[Voice Validation] Unknown field: "${spokenField}"${suggestionText}`);

  return {
    valid: false,
    resolvedField: null,
    error: `Unknown field "${spokenField}".${suggestionText}`
  };
}

/**
 * Validates a complete field update (field + value)
 */
export function validateFieldUpdate(
  spokenField: string,
  value: string,
  circuit?: TestResult
): ValidationResult {
  // Validate field
  const fieldResult = validateField(spokenField);

  if (!fieldResult.valid || !fieldResult.resolvedField) {
    return {
      valid: false,
      resolvedField: null,
      resolvedValue: value,
      error: fieldResult.error,
      warning: null,
    };
  }

  const resolvedField = fieldResult.resolvedField;

  // Resolve dropdown value if applicable
  const resolvedValue = resolveDropdownValue(resolvedField, value);

  // Check for warnings (out-of-spec readings)
  let warning: string | null = null;

  if (resolvedField === 'zs' && resolvedValue && circuit?.maxZs) {
    const zsValue = parseFloat(resolvedValue);
    const maxZs = parseFloat(circuit.maxZs);
    if (!isNaN(zsValue) && !isNaN(maxZs) && maxZs > 0 && zsValue > maxZs) {
      warning = `Zs ${zsValue}Ω exceeds maximum ${maxZs}Ω - circuit may not disconnect in time!`;
    }
  }

  if ((resolvedField === 'insulationLiveEarth' || resolvedField === 'insulationLiveNeutral') && resolvedValue) {
    const irValue = parseFloat(resolvedValue.replace('>', '').replace('<', ''));
    if (!isNaN(irValue) && irValue < 1) {
      warning = `Insulation resistance ${irValue}MΩ is below minimum 1MΩ - FAIL!`;
    }
  }

  if (resolvedField === 'rcdOneX' && resolvedValue) {
    const tripTime = parseFloat(resolvedValue);
    if (!isNaN(tripTime) && tripTime > 300) {
      warning = `RCD trip time ${tripTime}ms exceeds 300ms maximum!`;
    }
  }

  if (resolvedField === 'r1r2' && resolvedValue) {
    const r1r2Value = parseFloat(resolvedValue);
    if (!isNaN(r1r2Value) && r1r2Value > 1.5) {
      warning = `R1+R2 ${r1r2Value}Ω is high - check connections`;
    }
  }

  return {
    valid: true,
    resolvedField,
    resolvedValue,
    error: null,
    warning,
  };
}

/**
 * Find similar field names for suggestions
 */
function findSimilarFields(input: string): string[] {
  const normalised = input.toLowerCase();
  const suggestions: string[] = [];

  // Check all field aliases
  const allAliases = getAllFieldNames();

  for (const fieldName of allAliases) {
    // Check if input is contained in field name or vice versa
    if (fieldName.toLowerCase().includes(normalised) ||
        normalised.includes(fieldName.toLowerCase())) {
      suggestions.push(fieldName);
    }
  }

  // Also check valid TestResult fields directly
  for (const field of VALID_TEST_RESULT_FIELDS) {
    if (field.toLowerCase().includes(normalised) ||
        normalised.includes(field.toLowerCase())) {
      if (!suggestions.includes(field)) {
        suggestions.push(field);
      }
    }
  }

  return suggestions.slice(0, 3); // Return max 3 suggestions
}

/**
 * Log voice tool call for debugging (safe for production)
 */
export function logVoiceToolCall(
  toolName: string,
  params: Record<string, unknown>,
  result: string,
  success: boolean
): void {
  const logData = {
    timestamp: new Date().toISOString(),
    tool: toolName,
    params,
    result,
    success,
  };

  if (success) {
    console.log('[Voice Tool]', logData);
  } else {
    console.warn('[Voice Tool] FAILED:', logData);
  }
}

/**
 * Builds a response message for the agent with any warnings
 */
export function buildAgentResponse(message: string, warning: string | null): string {
  if (warning) {
    return `${message}. WARNING: ${warning}`;
  }
  return message;
}
