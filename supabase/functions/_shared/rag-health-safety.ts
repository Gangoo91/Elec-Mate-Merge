/**
 * RAG Module for Health & Safety
 * Hybrid search (BM25 + Vector RRF) for health_safety_knowledge
 * - Query expansion for safety terms
 * - Semantic caching (60min TTL)
 * - Parallel vector + keyword search
 */

import { createClient } from './deps.ts';
import { generateEmbeddingWithRetry } from './v3-core.ts';
import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

interface HealthSafetyResult {
  id: string;
  topic: string;
  content: string;
  source: string;
  scale?: string;
  metadata?: any;
  hybrid_score?: number;
}

export type HSKnowledgeResult = HealthSafetyResult;

/**
 * Query expansion for safety terms
 */
function expandSafetyQuery(query: string): string {
  const expansions: Record<string, string[]> = {
    'bathroom': ['wet areas', 'Section 701', 'zones', 'IP rating', 'moisture'],
    'outdoor': ['external', 'weatherproof', 'IP65', 'buried', 'underground'],
    'height': ['working at height', 'WAHR', 'scaffolding', 'fall protection', 'ladders'],
    'excavation': ['digging', 'trenching', 'underground services', 'shoring'],
    'isolation': ['LOTO', 'lock off tag out', 'safe isolation', 'permit to work'],
    'ppe': ['personal protective equipment', 'safety gear', 'protection'],
    'risk': ['risk assessment', 'RAMS', 'hazard', 'mitigation'],
    'fire': ['fire safety', 'fire extinguisher', 'emergency procedures'],
    'first aid': ['medical emergency', 'injury', 'accident response'],
    'asbestos': ['ACM', 'asbestos containing materials', 'R&D survey'],
    'shock': ['electrocution', 'live', 'voltage', 'current'],
    'testing': ['proving', 'voltage indicator', 'GS38'],
    'emergency': ['shock treatment', 'INDG231'],
  };

  let expanded = query.toLowerCase();
  for (const [key, synonyms] of Object.entries(expansions)) {
    if (expanded.includes(key)) {
      expanded += ' ' + synonyms.join(' ');
    }
  }
  return expanded;
}

/**
 * Generate cache key
 */
function generateCacheKey(query: string, scale?: string): string {
  const normalized = query.toLowerCase().trim();
  const key = scale ? `${normalized}:${scale}` : normalized;
  return btoa(key).substring(0, 32);
}

/**
 * Check semantic cache
 */
async function checkSemanticCache(
  supabase: SupabaseClient,
  queryHash: string,
  logger: any
): Promise<HealthSafetyResult[] | null> {
  try {
    const { data, error } = await supabase
      .from('rag_cache')
      .select('*')
      .eq('query_hash', queryHash)
      .eq('agent_name', 'health-safety')
      .gt('expires_at', new Date().toISOString())
      .single();

    if (error || !data) {
      logger.debug('Cache miss', { queryHash });
      return null;
    }

    await supabase
      .from('rag_cache')
      .update({ hit_count: (data.hit_count || 0) + 1 })
      .eq('query_hash', queryHash);

    logger.info('Cache hit', { queryHash, hitCount: data.hit_count + 1 });
    return data.results as HealthSafetyResult[];
  } catch (err) {
    logger.warn('Cache check failed', { error: err instanceof Error ? err.message : String(err) });
    return null;
  }
}

/**
 * Store in semantic cache
 */
async function storeSemanticCache(
  supabase: SupabaseClient,
  queryHash: string,
  query: string,
  results: HealthSafetyResult[],
  logger: any
): Promise<void> {
  try {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    
    await supabase
      .from('rag_cache')
      .upsert({
        query_hash: queryHash,
        query_text: query,
        agent_name: 'health-safety',
        results,
        hit_count: 0,
        created_at: new Date().toISOString(),
        expires_at: expiresAt.toISOString()
      });

    logger.debug('Stored in cache', { queryHash, resultCount: results.length });
  } catch (err) {
    logger.warn('Cache store failed', { error: err instanceof Error ? err.message : String(err) });
  }
}

/**
 * Hybrid H&S knowledge search
 */
export async function searchHealthSafetyKnowledge(
  query: string,
  openAiKey: string,
  supabase: SupabaseClient,
  logger: any,
  scale?: string
): Promise<HealthSafetyResult[]> {
  const searchStart = Date.now();
  
  // Check cache
  const cacheKey = generateCacheKey(query, scale);
  const cached = await checkSemanticCache(supabase, cacheKey, logger);
  if (cached) {
    logger.info('RAG cache hit', { duration: Date.now() - searchStart });
    return cached;
  }

  logger.debug('Starting hybrid H&S search', { query, scale });

  // Expand query
  const expandedQuery = expandSafetyQuery(query);
  
  // Generate embedding
  const embedding = await generateEmbeddingWithRetry(expandedQuery, openAiKey);

  try {
    // Hybrid search
    const { data, error } = await supabase.rpc('search_health_safety_hybrid', {
      query_text: expandedQuery,
      query_embedding: embedding,
      scale_filter: scale || null,
      match_count: 12
    });

    if (error) throw error;

    const results = data || [];

    logger.info('Hybrid H&S search complete', {
      duration: Date.now() - searchStart,
      resultsCount: results.length,
      avgScore: results.length > 0 
        ? (results.reduce((sum: number, r: any) => sum + (r.hybrid_score || 0), 0) / results.length).toFixed(3)
        : 0
    });

    // Store in cache
    await storeSemanticCache(supabase, cacheKey, query, results, logger);

    return results;
  } catch (error) {
    logger.error('Hybrid H&S search failed', {
      error: error instanceof Error ? error.message : String(error),
      duration: Date.now() - searchStart
    });
    throw error;
  }
}

/**
 * Legacy wrapper for backwards compatibility
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
  
  const logger = {
    debug: (msg: string, data?: any) => console.log(`[DEBUG] ${msg}`, data),
    info: (msg: string, data?: any) => console.log(`[INFO] ${msg}`, data),
    warn: (msg: string, data?: any) => console.warn(`[WARN] ${msg}`, data),
    error: (msg: string, data?: any) => console.error(`[ERROR] ${msg}`, data),
  };
  
  if (!openAiKey) {
    openAiKey = Deno.env.get('OPENAI_API_KEY');
  }
  if (!openAiKey) {
    throw new Error('OpenAI API key required');
  }
  
  return searchHealthSafetyKnowledge(query, openAiKey, supabase, logger, workType);
}

/**
 * Format H&S context for LLM
 */
export function formatHealthSafetyContext(results: HealthSafetyResult[]): string {
  if (!results || results.length === 0) {
    return 'No database H&S guidance found. Use standard safety principles.';
  }

  return `HEALTH & SAFETY GUIDANCE (${results.length} items):\n` +
    results
      .slice(0, 10)
      .map(h => `- ${h.topic}: ${h.content.substring(0, 150)}...`)
      .join('\n');
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
