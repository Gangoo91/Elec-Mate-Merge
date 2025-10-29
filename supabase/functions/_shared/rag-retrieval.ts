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
  
  // ✅ QUICK WIN #2: Filter out low-relevance results
  const filteredResults = reranked.filter(reg => {
    // Keep high-similarity results (strong semantic match)
    if (reg.similarity && reg.similarity > 0.80) return true;
    
    // Keep core safety regulations (always relevant)
    if (isCoreRegulation(reg.regulation_number)) return true;
    
    // Keep if explicitly mentioned in query
    if (query.toLowerCase().includes(reg.regulation_number.toLowerCase())) return true;
    
    // Keep if matches job context
    if (entities && matchesJobContext(reg, entities)) return true;
    
    // Otherwise, drop it (not relevant enough)
    return false;
  });
  
  // Limit to top 8 most relevant (down from 12) for faster AI processing
  const topResults = filteredResults.slice(0, 8);
  
  console.log(`✅ Returning ${topResults.length} highly relevant regulations (filtered from ${reranked.length})`);
  return topResults;
}

/**
 * QUICK WIN #2: Check if regulation is a core safety regulation
 */
function isCoreRegulation(regNumber: string): boolean {
  const coreRegs = [
    '411.3', '411.4', '411.5', // Protection against electric shock
    '701', '702', '703', '704', '705', '706', // Special locations
    '722', // EV charging
    '537.2', // Isolation and switching
    '514', // Earthing and bonding
    '433', '434', // Overcurrent protection
    '543', '544', // Earthing arrangements
  ];
  
  return coreRegs.some(core => regNumber.startsWith(core));
}

/**
 * QUICK WIN #2: Check if regulation matches job context
 */
function matchesJobContext(reg: RegulationResult, entities: any): boolean {
  const regNumber = reg.regulation_number;
  const content = reg.content.toLowerCase();
  
  // Bathroom/shower jobs → Section 701
  if ((entities.loadType === 'shower' || entities.location === 'bathroom') && regNumber.startsWith('701')) {
    return true;
  }
  
  // EV charger jobs → Section 722
  if (entities.loadType === 'ev_charger' && regNumber.startsWith('722')) {
    return true;
  }
  
  // Consumer unit/distribution → Sections 530-537
  if (entities.equipment?.includes('consumer_unit') && regNumber.startsWith('53')) {
    return true;
  }
  
  // Cable sizing → Table 4 series
  if (entities.power && regNumber.startsWith('Table 4')) {
    return true;
  }
  
  // Earthing jobs → Section 540s
  if (content.includes('earth') && regNumber.startsWith('54')) {
    return true;
  }
  
  return false;
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
