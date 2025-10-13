/**
 * RAG Module for Commissioning Agent
 * Hybrid search for testing & inspection knowledge
 * - Query expansion for testing terms
 * - Semantic caching (60min TTL)
 * Uses BS7671 hybrid search as primary source
 */

import { createClient } from './deps.ts';
import { generateEmbeddingWithRetry } from './v3-core.ts';
import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

interface CommissioningResult {
  id: string;
  regulation_number?: string;
  section?: string;
  topic?: string;
  content: string;
  source?: string;
  metadata?: any;
  hybrid_score?: number;
}

/**
 * Query expansion for testing/inspection terms
 */
function expandCommissioningQuery(query: string): string {
  const expansions: Record<string, string[]> = {
    'test': ['testing', 'inspection', 'verification', 'commissioning', 'GN3'],
    'earth': ['earth fault loop impedance', 'Zs', 'PEFC', 'fault loop', 'protective conductor'],
    'insulation': ['IR test', 'insulation resistance', 'megger', 'continuity'],
    'rcd': ['residual current device', 'RCD test', '30mA', 'earth leakage', 'trip time'],
    'polarity': ['polarity test', 'correct connections', 'phase rotation'],
    'continuity': ['bonding test', 'CPC continuity', 'protective conductor'],
    'eic': ['electrical installation certificate', 'certification', 'schedule'],
    'psc': ['prospective short circuit current', 'fault level', 'PSCC'],
    'visual': ['visual inspection', 'initial verification', 'dead testing'],
    'live': ['live testing', 'energised tests', 'functional testing'],
    'chapter 64': ['BS7671 Chapter 64', 'initial verification', 'testing requirements'],
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
function generateCacheKey(query: string, testType?: string): string {
  const normalized = query.toLowerCase().trim();
  const key = testType ? `${normalized}:${testType}` : normalized;
  return btoa(key).substring(0, 32);
}

/**
 * Check semantic cache
 */
async function checkSemanticCache(
  supabase: SupabaseClient,
  queryHash: string,
  logger: any
): Promise<CommissioningResult[] | null> {
  try {
    const { data, error } = await supabase
      .from('rag_cache')
      .select('*')
      .eq('query_hash', queryHash)
      .eq('agent_name', 'commissioning')
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
    return data.results as CommissioningResult[];
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
  results: CommissioningResult[],
  logger: any
): Promise<void> {
  try {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    
    await supabase
      .from('rag_cache')
      .upsert({
        query_hash: queryHash,
        query_text: query,
        agent_name: 'commissioning',
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
 * Hybrid commissioning knowledge search (uses BS7671 as primary source)
 */
export async function retrieveCommissioningKnowledge(
  query: string,
  openAiKey: string,
  supabase: SupabaseClient,
  logger: any,
  testType?: string
): Promise<CommissioningResult[]> {
  const searchStart = Date.now();
  
  // Check cache
  const cacheKey = generateCacheKey(query, testType);
  const cached = await checkSemanticCache(supabase, cacheKey, logger);
  if (cached) {
    logger.info('RAG cache hit', { duration: Date.now() - searchStart });
    return cached;
  }

  logger.debug('Starting hybrid commissioning search', { query, testType });

  // Expand query for testing terminology
  const expandedQuery = expandCommissioningQuery(query);
  
  // Generate embedding
  const embedding = await generateEmbeddingWithRetry(expandedQuery, openAiKey);

  try {
    // Use BS7671 hybrid search (primary source for testing/inspection)
    const { data, error } = await supabase.rpc('search_bs7671_hybrid', {
      query_text: expandedQuery,
      query_embedding: embedding,
      match_count: 12
    });

    if (error) throw error;

    const results = data || [];

    logger.info('Hybrid commissioning search complete', {
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
    logger.error('Hybrid commissioning search failed', {
      error: error instanceof Error ? error.message : String(error),
      duration: Date.now() - searchStart
    });
    throw error;
  }
}

/**
 * Format commissioning context for LLM
 */
export function formatCommissioningContext(results: CommissioningResult[]): string {
  if (!results || results.length === 0) {
    return 'No specific testing/inspection guidance found. Use general BS7671 Chapter 64 principles.';
  }

  return `TESTING & INSPECTION GUIDANCE (${results.length} items):\n` +
    results
      .slice(0, 10)
      .map(r => {
        const prefix = r.regulation_number 
          ? `[${r.regulation_number}]` 
          : r.topic 
            ? `${r.topic}:` 
            : '';
        return `${prefix} ${r.content.substring(0, 180)}...`;
      })
      .join('\n\n');
}
