/**
 * Unified RAG Retrieval - Hybrid Search Strategy
 * Combines explicit regulation lookup, vector search, and keyword fallback
 */

import { createClient } from './deps.ts';
import { extractRegulationNumbers } from './query-parser.ts';
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
  openAiKey?: string
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
  
  // 4. Vector search with single reasonable threshold
  const { data: vectorResults } = await supabase.rpc('search_bs7671', {
    query_embedding: embedding,
    match_threshold: 0.5, // Balanced threshold
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
  
  // 6. Return whatever we found (even if empty)
  console.log(`⚠️ Limited results: ${vectorResults?.length || 0} regulations`);
  return vectorResults || [];
}
