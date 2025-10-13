/**
 * Confidence Scoring System
 * Multi-factor confidence scoring for RAG results
 */

import type { RegulationResult } from './cross-encoder-reranker.ts';

export interface ConfidenceMetrics {
  overall: number; // 0-1
  factors: {
    vectorSimilarity: number;
    keywordMatch: number;
    crossEncoderScore: number;
    temporalRelevance: number; // Amendment 3 boost
    regulationImportance: number; // Core regs vs. supporting
  };
  reasoning: string;
  level: 'high' | 'medium' | 'low';
}

const CORE_REGULATIONS = ['433.1.1', '525.1', '533.1.1', '411.3.2', '543.1.1', 'Table 4D5', 'Table 41.3'];

/**
 * Calculate keyword overlap between regulation content and query
 */
function calculateKeywordOverlap(content: string, query: string): number {
  const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'is', 'are'];
  
  const queryWords = query.toLowerCase()
    .split(/\s+/)
    .filter(w => w.length > 3 && !stopWords.includes(w));
  
  const contentLower = content.toLowerCase();
  const matches = queryWords.filter(word => contentLower.includes(word));
  
  return queryWords.length > 0 ? matches.length / queryWords.length : 0;
}

/**
 * Calculate multi-factor confidence score for a regulation
 */
export function calculateConfidence(
  regulation: RegulationResult,
  query: string,
  queryEntities?: any
): ConfidenceMetrics {
  const factors = {
    vectorSimilarity: regulation.similarity || 0.5,
    keywordMatch: calculateKeywordOverlap(regulation.content, query),
    crossEncoderScore: regulation.crossEncoderScore || 0.5,
    temporalRelevance: regulation.amendment === 'Amendment 3:2024' ? 1.0 : 0.8,
    regulationImportance: CORE_REGULATIONS.includes(regulation.regulation_number) ? 1.0 : 0.7
  };
  
  // Weighted combination
  const overall = (
    factors.vectorSimilarity * 0.25 +
    factors.keywordMatch * 0.20 +
    factors.crossEncoderScore * 0.35 + // Highest weight
    factors.temporalRelevance * 0.10 +
    factors.regulationImportance * 0.10
  );
  
  let reasoning = '';
  let level: 'high' | 'medium' | 'low';
  
  if (overall > 0.85) {
    reasoning = 'Highly relevant - directly addresses your query';
    level = 'high';
  } else if (overall > 0.7) {
    reasoning = 'Very relevant - important supporting information';
    level = 'high';
  } else if (overall > 0.55) {
    reasoning = 'Moderately relevant - contextual information';
    level = 'medium';
  } else {
    reasoning = 'Supporting information - may be useful';
    level = 'low';
  }
  
  return { overall, factors, reasoning, level };
}

/**
 * Calculate average confidence across all regulations
 */
export function calculateAverageConfidence(confidenceMetrics: ConfidenceMetrics[]): number {
  if (confidenceMetrics.length === 0) return 0.5;
  
  const sum = confidenceMetrics.reduce((acc, m) => acc + m.overall, 0);
  return sum / confidenceMetrics.length;
}
