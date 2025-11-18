/**
 * Installation Method RAG Module
 * ISOLATED from AI RAMS - Used ONLY by Installation Method Agent
 * Direct copy of installer RAG functionality
 */

import { 
  searchPracticalWorkIntelligence, 
  searchBS7671Intelligence,
  searchRegulationsIntelligence
} from '../_shared/rams-rag.ts';

export async function searchInstallationMethodRAG(query: string, limit: number = 5) {
  const results = await Promise.all([
    searchPracticalWorkIntelligence(query, limit),
    searchBS7671Intelligence(query, limit),
    searchRegulationsIntelligence(query, limit)
  ]);

  return results.flat();
}
