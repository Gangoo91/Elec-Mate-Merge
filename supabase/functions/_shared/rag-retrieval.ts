/**
 * Unified RAG Retrieval - Hybrid Search Strategy
 * Combines explicit regulation lookup, vector search, and keyword fallback
 */

import { createClient } from './deps.ts';
import { extractRegulationNumbers, ParsedEntities } from './query-parser.ts';
import { generateEmbeddingWithRetry } from './v3-core.ts';

export interface RegulationResult {
  id: string;
  regulation_number: string;
  section: string;
  content: string;
  amendment?: string;
  metadata?: any;
  similarity?: number;
}

/**
 * Retrieve relevant BS 7671 regulations using hybrid search
 * 1. Check for explicit regulation numbers → keyword search
 * 2. Vector search with reasonable threshold (0.5)
 * 3. Keyword fallback if needed
 */
export async function retrieveRegulations(
  query: string, 
  limit = 8,
  openAiKey?: string,
  entities?: ParsedEntities
): Promise<RegulationResult[]> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // 1. Extract explicit regulation numbers
  const regNumbers = extractRegulationNumbers(query);
  
  // 2. If specific reg mentioned → keyword search first (fast path)
  if (regNumbers.length > 0) {
    const { data } = await supabase
      .from('bs7671_embeddings')
      .select('*')
      .or(regNumbers.map(n => `regulation_number.ilike.%${n}%`).join(','))
      .limit(limit);
    
    if (data && data.length > 0) {
      console.log(`✅ Explicit regulation lookup: ${data.length} results`);
      return data.map(d => ({ ...d, similarity: 0.95 })); // High confidence for exact matches
    }
  }
  
  // 3. Generate embedding for vector search
  if (!openAiKey) {
    openAiKey = Deno.env.get('OPENAI_API_KEY');
  }
  if (!openAiKey) {
    throw new Error('OpenAI API key required for vector search');
  }

  const embedding = await generateEmbeddingWithRetry(query, openAiKey);
  
  // 4. Vector search with cached hybrid function
  const { data: vectorResults } = await supabase.rpc('search_bs7671_hybrid_cached', {
    query_text: query,
    query_embedding: embedding,
    match_count: limit
  });
  
  if (vectorResults && vectorResults.length >= 3) {
    console.log(`✅ Vector search: ${vectorResults.length} results`);
    return vectorResults;
  }
  
  // 5. Keyword fallback for low/no vector results
  const keywords = query
    .split(/\s+/)
    .filter(w => w.length > 3 && !['what', 'does', 'mean', 'this', 'that'].includes(w.toLowerCase()));
  
  if (keywords.length > 0) {
    const { data: keywordResults } = await supabase
      .from('bs7671_embeddings')
      .select('*')
      .or(keywords.map(k => `content.ilike.%${k}%`).join(','))
      .limit(limit);
    
    if (keywordResults && keywordResults.length > 0) {
      console.log(`✅ Keyword fallback: ${keywordResults.length} results`);
      // Merge with vector results and deduplicate
      const combined = [...(vectorResults || []), ...keywordResults];
      const unique = Array.from(new Map(combined.map(r => [r.id, r])).values());
      return unique.slice(0, limit).map(r => ({ ...r, similarity: r.similarity || 0.5 }));
    }
  }
  
  // 6. Rerank results for better relevance
  const results = vectorResults || [];
  const reranked = entities 
    ? rerankRegulations(results, entities, query)
    : results;
  
  console.log(`✅ Returning ${reranked.length} reranked regulations with FULL content`);
  return reranked;
}

/**
 * Rerank regulations based on contextual relevance
 */
function rerankRegulations(
  regulations: RegulationResult[],
  entities: any,
  query: string
): RegulationResult[] {
  return regulations.map(reg => ({
    ...reg,
    relevanceScore: calculateRelevance(reg, entities, query)
  }))
  .sort((a, b) => (b.relevanceScore || b.similarity || 0) - (a.relevanceScore || a.similarity || 0));
}

function calculateRelevance(
  reg: RegulationResult,
  entities: any,
  query: string
): number {
  let score = reg.similarity || 0.5;
  
  // Boost if regulation number mentioned in query
  if (query.includes(reg.regulation_number)) {
    score += 0.3;
  }
  
  // Context-aware boosts based on load type
  if (entities.loadType === 'shower' && reg.regulation_number.startsWith('701')) {
    score += 0.2; // Section 701 = bathrooms
  }
  
  if (entities.loadType === 'ev_charger' && reg.regulation_number.startsWith('722')) {
    score += 0.2; // Section 722 = EV charging
  }
  
  // Core design regulations always relevant
  const coreRegs = ['433.1.1', '525', '533.1', '411.3.2', '543.1.1'];
  if (coreRegs.includes(reg.regulation_number)) {
    score += 0.1;
  }
  
  // Cable sizing tables
  if (reg.regulation_number.startsWith('Table 4') && entities.power) {
    score += 0.15;
  }
  
  return score;
}
