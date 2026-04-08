import { TestResult } from '@/types/testResult';
import { RegulationCheckResult, RegulationWarning } from './types';
import { checkCableProtectiveDeviceMatch } from './cableProtectiveDeviceValidator';
import { checkCircuitTypeConsistency } from './circuitTypeValidator';
import { checkEarthingRequirements } from './earthingValidator';
import { checkTestValues } from './testValueValidator';
import { checkZsCompliance } from './zsValidator';
import { checkDeviceDirectionality } from './deviceDirectionalityValidator';

// Main regulation checker function with enhanced Zs validation
// Optional earthingArrangement — pass 'TT' to use RCD-based Zs limits
export const checkRegulationCompliance = (result: TestResult, earthingArrangement?: string): RegulationCheckResult => {
  const allWarnings: RegulationWarning[] = [
    ...checkCableProtectiveDeviceMatch(result),
    ...checkCircuitTypeConsistency(result),
    ...checkEarthingRequirements(result),
    ...checkTestValues(result),
    ...checkZsCompliance(result, earthingArrangement),
    ...checkDeviceDirectionality(result), // Amendment 3:2024 compliance
  ];

  const hasCriticalIssues = allWarnings.some((warning) => warning.severity === 'critical');

  return {
    isCompliant: !hasCriticalIssues,
    warnings: allWarnings,
  };
};

// Batch check multiple results
export const checkAllResultsCompliance = (
  results: TestResult[],
  earthingArrangement?: string
): Map<string, RegulationCheckResult> => {
  const complianceMap = new Map<string, RegulationCheckResult>();

  results.forEach((result) => {
    complianceMap.set(result.id, checkRegulationCompliance(result, earthingArrangement));
  });

  return complianceMap;
};

// Re-export types for convenience
export type { RegulationWarning, RegulationCheckResult } from './types';
