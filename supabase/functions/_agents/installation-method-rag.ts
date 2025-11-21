/**
 * Installation Method RAG Module
 * ISOLATED from AI RAMS - Used ONLY by Installation Method Agent
 * NOW USES FAST INTELLIGENCE SEARCHES (mirrors designer-v2)
 */

import { 
  searchRegulationsIntelligence 
} from '../_shared/intelligence-search.ts';

import { 
  searchPracticalWorkIntelligence,
  PracticalWorkSearchResult
} from '../_shared/rag-practical-work.ts';

export interface InstallationMethodRAGResult {
  regulations: any[];
  practicalWork: any[];
  totalCount: number;
  searchTimeMs: number;
  qualityScore: number;
}

/**
 * Search installation knowledge using FAST intelligence searches
 * Performance: 150-400ms (vs 1-3s for old vector approach)
 */
export async function searchInstallationMethodRAG(
  supabase: any,
  keywords: string[],
  workType?: string,
  circuitTypes?: string[],
  limit: number = 15
): Promise<InstallationMethodRAGResult> {
  
  const startTime = Date.now();
  
  console.log('⚡ Installation Method RAG (fast intelligence search)', {
    keywords: keywords.slice(0, 5),
    workType,
    circuitTypes: circuitTypes?.slice(0, 3)
  });
  
  // QUERY 1: Regulations Intelligence (FAST - GIN keyword indexes)
  const regulationsPromise = searchRegulationsIntelligence(supabase, {
    keywords,
    appliesTo: workType ? [workType, 'all installations'] : ['all installations'],
    categories: ['installation', 'testing', 'inspection', 'earthing', 'protection'],
    limit
  });
  
  // QUERY 2: Practical Work Intelligence (hybrid RPC - still fast)
  const practicalWorkPromise = searchPracticalWorkIntelligence(supabase, {
    query: keywords.join(' '),
    tradeFilter: 'installer',
    matchCount: limit
  });
  
  // Run both in parallel
  const [regulations, practicalWorkResult] = await Promise.all([
    regulationsPromise,
    practicalWorkPromise
  ]);
  
  const searchTimeMs = Date.now() - startTime;
  
  // Calculate combined quality score
  const regQuality = regulations.length > 0 ? 50 : 0;
  const pwQuality = practicalWorkResult.qualityScore / 2; // Scale to 0-50
  const qualityScore = regQuality + pwQuality;
  
  console.log(`✅ Installation Method RAG complete in ${searchTimeMs}ms:`, {
    regulations: regulations.length,
    practicalWork: practicalWorkResult.results.length,
    practicalQuality: practicalWorkResult.qualityScore.toFixed(1),
    combinedQuality: qualityScore.toFixed(1)
  });
  
  return {
    regulations,
    practicalWork: practicalWorkResult.results,
    totalCount: regulations.length + practicalWorkResult.results.length,
    searchTimeMs,
    qualityScore
  };
}
