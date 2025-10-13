/**
 * Health & Safety RAG Retrieval - Hybrid Search Strategy
 * Optimized for ultra-fast H&S knowledge retrieval with query caching
 */

import { createClient } from './deps.ts';
import { generateEmbeddingWithRetry } from './v3-core.ts';

export interface HSKnowledgeResult {
  id: string;
  topic: string;
  content: string;
  source: string;
  metadata?: any;
  similarity?: number;
}

/**
 * Generate cache key from query + work type
 */
function generateCacheKey(query: string, workType?: string): string {
  const normalized = `${query.toLowerCase().trim()}_${workType || 'general'}`;
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

/**
 * Expand query with electrical safety synonyms
 */
function expandQuery(query: string, workType?: string): string[] {
  const keywords = query.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  const expansions: string[] = [...keywords];
  
  // Electrical safety synonyms
  const synonymMap: Record<string, string[]> = {
    'shock': ['electrocution', 'live', 'voltage', 'isolation'],
    'height': ['ladder', 'scaffold', 'fall', 'WAHR'],
    'fire': ['arc fault', 'overload', 'combustion'],
    'isolation': ['lockout', 'LOTO', 'safe isolation', 'proving'],
    'ppe': ['protective equipment', 'gloves', 'boots', 'EN60903'],
    'permit': ['permit to work', 'safe system', 'hot work'],
    'testing': ['proving', 'voltage indicator', 'GS38'],
    'emergency': ['first aid', 'shock treatment', 'INDG231']
  };
  
  keywords.forEach(kw => {
    if (synonymMap[kw]) {
      expansions.push(...synonymMap[kw]);
    }
  });
  
  // Work type specific expansions
  if (workType) {
    if (workType.includes('commercial')) {
      expansions.push('industrial', 'workplace', 'HASAWA');
    }
    if (workType.includes('domestic')) {
      expansions.push('residential', 'occupied', 'tenant');
    }
    if (workType.includes('rewire')) {
      expansions.push('isolation', 'live work', 'testing', 'certification');
    }
  }
  
  return [...new Set(expansions)]; // Deduplicate
}

/**
 * Check query cache (60-min TTL)
 */
async function checkCache(
  supabase: any,
  queryHash: string
): Promise<HSKnowledgeResult[] | null> {
  try {
    const { data, error } = await supabase
      .from('hs_query_cache')
      .select('results, hit_count')
      .eq('query_hash', queryHash)
      .gt('expires_at', new Date().toISOString())
      .maybeSingle();
    
    if (error || !data) return null;
    
    // Increment hit counter
    await supabase
      .from('hs_query_cache')
      .update({ hit_count: (data.hit_count || 0) + 1 })
      .eq('query_hash', queryHash);
    
    console.log(`✅ Cache HIT (${data.hit_count + 1} hits): ${queryHash}`);
    return data.results as HSKnowledgeResult[];
  } catch (err) {
    console.error('Cache check failed:', err);
    return null;
  }
}

/**
 * Store results in cache
 */
async function storeCache(
  supabase: any,
  queryHash: string,
  query: string,
  results: HSKnowledgeResult[],
  workType?: string
): Promise<void> {
  try {
    await supabase
      .from('hs_query_cache')
      .upsert({
        query_hash: queryHash,
        query: query.slice(0, 500),
        results,
        work_type: workType || null,
        hit_count: 1,
        expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString() // 60 min
      });
    
    console.log(`💾 Cached H&S results: ${queryHash}`);
  } catch (err) {
    console.error('Cache store failed:', err);
  }
}

/**
 * Retrieve H&S knowledge using hybrid search
 * 1. Check cache (instant if hit)
 * 2. Keyword search via full-text search (0.3s)
 * 3. Vector search with lower threshold (0.7s)
 * 4. Merge and deduplicate
 */
export async function retrieveHealthSafetyKnowledge(
  query: string,
  workType?: string,
  limit = 12,
  openAiKey?: string
): Promise<HSKnowledgeResult[]> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Step 1: Check cache (instant if hit)
  const cacheKey = generateCacheKey(query, workType);
  const cached = await checkCache(supabase, cacheKey);
  if (cached && cached.length > 0) {
    return cached;
  }
  
  console.log('🔍 Cache MISS - performing hybrid search');
  
  // Step 2: Expand query with synonyms
  const expandedTerms = expandQuery(query, workType);
  const searchQuery = expandedTerms.slice(0, 8).join(' | '); // Take top 8 terms
  
  // Step 3: Keyword search (FAST - no embedding needed)
  const { data: keywordResults } = await supabase
    .from('health_safety_knowledge')
    .select('*')
    .textSearch('content', searchQuery, {
      type: 'websearch',
      config: 'english'
    })
    .limit(8);
  
  console.log(`📝 Keyword search: ${keywordResults?.length || 0} results`);
  
  // Step 4: Vector search (if keyword results < threshold)
  let vectorResults: any[] = [];
  if ((keywordResults?.length || 0) < 6) {
    if (!openAiKey) {
      openAiKey = Deno.env.get('OPENAI_API_KEY');
    }
    if (!openAiKey) {
      throw new Error('OpenAI API key required for vector search');
    }
    
    const embedding = await generateEmbeddingWithRetry(
      `${query} ${workType || ''} electrical hazards safety`,
      openAiKey
    );
    
    const { data: vecData } = await supabase.rpc('search_health_safety', {
      query_embedding: embedding,
      scale_filter: workType || null,
      source_filter: null,
      match_threshold: 0.5,  // Lower threshold for better recall
      match_count: limit
    });
    
    vectorResults = vecData || [];
    console.log(`🎯 Vector search: ${vectorResults.length} results`);
  }
  
  // Step 5: Merge, deduplicate, and rank
  const combined = [...(keywordResults || []), ...vectorResults];
  const unique = Array.from(new Map(combined.map(r => [r.id, r])).values());
  
  // Step 6: Prioritize based on work type and source
  const ranked = unique
    .map(r => ({
      ...r,
      relevanceScore: calculateRelevance(r, query, workType)
    }))
    .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
    .slice(0, limit);
  
  console.log(`✅ Hybrid search complete: ${ranked.length} total results`);
  
  // Step 7: Store in cache for future queries
  await storeCache(supabase, cacheKey, query, ranked, workType);
  
  return ranked;
}

/**
 * Calculate relevance score for ranking
 */
function calculateRelevance(
  result: any,
  query: string,
  workType?: string
): number {
  let score = result.similarity || 0.5;
  
  // Boost HSE official guidance
  if (result.source?.includes('HSE')) {
    score += 0.2;
  }
  
  // Boost BS 7671 references
  if (result.content?.includes('BS 7671') || result.content?.includes('Section 4')) {
    score += 0.15;
  }
  
  // Boost if topic matches query keywords
  const queryLower = query.toLowerCase();
  if (result.topic && queryLower.includes(result.topic.toLowerCase())) {
    score += 0.15;
  }
  
  // Boost work type matches
  if (workType && result.metadata?.scale === workType) {
    score += 0.1;
  }
  
  // Critical hazards always relevant
  const criticalTopics = ['electric shock', 'live work', 'isolation', 'working at height'];
  if (criticalTopics.some(t => result.topic?.toLowerCase().includes(t))) {
    score += 0.1;
  }
  
  return Math.min(score, 1.0);
}

/**
 * Extract safety keywords from query for keyword search
 */
export function extractSafetyKeywords(query: string): string[] {
  const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'for', 'with', 'what', 'how', 'when'];
  
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.includes(word));
}
