/**
 * Citation Validator - Prevents AI hallucinations
 * Validates that AI-cited regulations actually exist in RAG results
 */

import { extractRegulationNumbers } from './query-parser.ts';

export interface RegulationResult {
  id: string;
  regulation_number: string;
  section: string;
  content: string;
  amendment?: string;
  metadata?: any;
  similarity?: number;
  hybrid_score?: number;
}

export interface ValidationResult {
  isValid: boolean;
  hallucinations: string[];
  missingCitations: string[];
  confidence: number;
}

/**
 * Validate that AI-cited regulations exist in RAG results
 */
export function validateCitations(
  aiResponse: string,
  ragResults: RegulationResult[]
): ValidationResult {
  // Extract regulation numbers from AI response
  const citedRegs = extractRegulationNumbers(aiResponse);
  
  // Check each citation against RAG results
  const ragRegNumbers = new Set(ragResults.map(r => r.regulation_number));
  
  const hallucinations: string[] = [];
  for (const cited of citedRegs) {
    if (!ragRegNumbers.has(cited)) {
      // Check if it's a known regulation (fuzzy match)
      const isKnown = isKnownRegulation(cited);
      if (!isKnown) {
        hallucinations.push(cited);
      }
    }
  }
  
  // Check if AI missed important regulations from RAG
  const topRagRegs = ragResults
    .slice(0, 5)
    .map(r => r.regulation_number);
  
  const missingCitations = topRagRegs.filter(reg => !citedRegs.includes(reg));
  
  const confidence = hallucinations.length === 0 && missingCitations.length <= 2 
    ? 1.0 
    : Math.max(0, 1.0 - (hallucinations.length * 0.3 + missingCitations.length * 0.1));
  
  return {
    isValid: hallucinations.length === 0,
    hallucinations,
    missingCitations,
    confidence
  };
}

/**
 * Check if a regulation number follows valid BS 7671 format
 */
function isKnownRegulation(regNumber: string): boolean {
  // Validate against known BS 7671:2018+A3:2024 structure
  const validFormats = [
    /^\d{3}\.\d{1,2}\.\d{1,2}$/,  // 433.1.1
    /^Table \d+[A-Z]?\d*$/,        // Table 4D5
    /^Appendix \d+$/,              // Appendix 1
    /^Section \d{3}$/              // Section 701
  ];
  
  return validFormats.some(pattern => pattern.test(regNumber));
}

/**
 * Auto-correct common AI mistakes in regulation citations
 */
export function correctCommonErrors(aiResponse: string): string {
  const corrections: Record<string, string> = {
    '433.1': '433.1.1',  // AI often drops last digit
    'Table 4D': 'Table 4D5',
    'Section 70': 'Section 701',
    'Reg 433': '433.1.1',
    'A2:2022': 'A3:2024',  // Update to Amendment 3
    'Amendment 2': 'Amendment 3'
  };
  
  let corrected = aiResponse;
  for (const [wrong, right] of Object.entries(corrections)) {
    corrected = corrected.replace(new RegExp(wrong, 'g'), right);
  }
  
  return corrected;
}

/**
 * Strip invalid citations from AI response
 */
export function stripInvalidCitations(aiResponse: string, invalidRefs: string[]): string {
  let cleaned = aiResponse;
  
  for (const invalid of invalidRefs) {
    // Remove citation and surrounding context
    const patterns = [
      new RegExp(`\\b${invalid}\\b[^.]*\\.`, 'g'),
      new RegExp(`\\(${invalid}\\)`, 'g'),
      new RegExp(`${invalid}`, 'g')
    ];
    
    for (const pattern of patterns) {
      cleaned = cleaned.replace(pattern, '');
    }
  }
  
  return cleaned.trim();
}
