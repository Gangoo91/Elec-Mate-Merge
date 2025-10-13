/**
 * Citation Validation Layer
 * Eliminates hallucinated regulation numbers
 */

import type { RegulationResult } from './cross-encoder-reranker.ts';

export interface CitationValidationResult {
  isValid: boolean;
  hallucinations: string[]; // Regulation numbers cited but not in RAG
  missingCitations: string[]; // Top RAG results not cited
  citationConfidence: number; // 0-1 score
  correctedNarrative?: string;
}

/**
 * Extract regulation numbers from AI narrative
 */
export function extractCitations(narrative: string): string[] {
  // Regex to match regulation numbers (e.g., 433.1.1, Table 4D5, 701.512.3)
  const regexPatterns = [
    /\b\d{3}\.\d{1,2}(?:\.\d{1,2})?\b/g, // Standard format: 433.1.1
    /\bTable\s+\d+[A-Z]\d*\b/gi, // Table format: Table 4D5
    /\bAppendix\s+\d+\b/gi, // Appendix format
    /\bSection\s+\d{3}\b/gi // Section format: Section 701
  ];
  
  const citations = new Set<string>();
  
  for (const regex of regexPatterns) {
    const matches = narrative.match(regex);
    if (matches) {
      matches.forEach(m => citations.add(m.trim()));
    }
  }
  
  return Array.from(citations);
}

/**
 * Validate citations against RAG results
 */
export function validateCitations(
  narrative: string,
  ragResults: RegulationResult[]
): CitationValidationResult {
  const citedRegulations = extractCitations(narrative);
  const ragRegulations = ragResults.map(r => r.regulation_number);
  
  // Find hallucinations (cited but not in RAG)
  const hallucinations = citedRegulations.filter(cited => 
    !ragRegulations.some(rag => rag.includes(cited) || cited.includes(rag))
  );
  
  // Find missing citations (top 5 RAG results not cited)
  const topRagResults = ragResults.slice(0, 5).map(r => r.regulation_number);
  const missingCitations = topRagResults.filter(rag =>
    !citedRegulations.some(cited => cited.includes(rag) || rag.includes(cited))
  );
  
  // Calculate citation confidence
  const totalCitations = citedRegulations.length;
  const validCitations = totalCitations - hallucinations.length;
  const citationConfidence = totalCitations > 0 ? validCitations / totalCitations : 1.0;
  
  return {
    isValid: hallucinations.length === 0,
    hallucinations,
    missingCitations,
    citationConfidence
  };
}

/**
 * Auto-correct common AI mistakes
 */
export function correctCommonErrors(narrative: string): string {
  const corrections: Record<string, string> = {
    '433.1': '433.1.1',
    '411.3': '411.3.2',
    '525': '525.1',
    '533': '533.1.1',
    '543.1': '543.1.1'
  };
  
  let corrected = narrative;
  for (const [wrong, right] of Object.entries(corrections)) {
    corrected = corrected.replace(new RegExp(`\\b${wrong}\\b`, 'g'), right);
  }
  
  return corrected;
}

/**
 * Strip invalid citations and add disclaimer
 */
export function stripInvalidCitations(
  narrative: string,
  hallucinations: string[]
): string {
  let cleaned = narrative;
  
  for (const hallucination of hallucinations) {
    // Remove the regulation number and surrounding context
    const escapedReg = hallucination.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    cleaned = cleaned.replace(new RegExp(`\\b${escapedReg}\\b`, 'g'), '[citation removed]');
  }
  
  return cleaned;
}
