import { TestResult } from '@/types/testResult';

// Keep only the basic interface for backwards compatibility
export interface AutoFillSuggestion {
  field: keyof TestResult;
  value: string;
  confidence: 'high' | 'medium' | 'low';
  reason: string;
}

// Empty implementation - auto-fill functionality removed for compliance
export const getAutoFillSuggestions = (
  result: TestResult, 
  allResults: TestResult[]
): AutoFillSuggestion[] => {
  return [];
};

// Empty implementation - auto-fill functionality removed for compliance
export const applyAutoFillSuggestions = (
  result: TestResult,
  suggestions: AutoFillSuggestion[],
  onlyHighConfidence: boolean = false
): TestResult => {
  return result;
};
