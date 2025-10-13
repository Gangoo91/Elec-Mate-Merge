/**
 * RAG Module for Project Management Agent
 * Hybrid search (BM25 + Vector RRF) for PM knowledge
 * - Query expansion for PM terms
 * - Semantic caching (60min TTL)
 */

import { createClient } from './deps.ts';
import { generateEmbeddingWithRetry } from './v3-core.ts';
import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

interface PMKnowledgeResult {
  id: string;
  topic: string;
  content: string;
  source: string;
  metadata?: any;
  hybrid_score?: number;
}

/**
 * Query expansion for PM terms
 */
function expandPMQuery(query: string): string {
  const expansions: Record<string, string[]> = {
    'timeline': ['critical path', 'gantt', 'schedule', 'program', 'milestones'],
    'cost': ['budget', 'pricing', 'estimate', 'quote', 'commercial'],
    'scope': ['work breakdown', 'deliverables', 'requirements', 'specifications'],
    'risk': ['hazard', 'mitigation', 'contingency', 'safety', 'RAMS'],
    'team': ['resources', 'labour', 'staffing', 'workforce'],
    'quality': ['standards', 'compliance', 'BS7671', 'Part P', 'testing'],
    'procurement': ['materials', 'supply chain', 'ordering', 'delivery'],
    'client': ['customer', 'stakeholder', 'communication', 'handover'],
    'rewire': ['full rewire', 'complete rewire', 'first fix', 'second fix'],
    'board': ['consumer unit', 'CU change', 'distribution board', 'DB upgrade'],
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
function generateCacheKey(query: string, projectType?: string): string {
  const normalized = query.toLowerCase().trim();
  const key = projectType ? `${normalized}:${projectType}` : normalized;
  return btoa(key).substring(0, 32);
}

/**
 * Check semantic cache
 */
async function checkSemanticCache(
  supabase: SupabaseClient,
  queryHash: string,
  logger: any
): Promise<PMKnowledgeResult[] | null> {
  try {
    const { data, error } = await supabase
      .from('rag_cache')
      .select('*')
      .eq('query_hash', queryHash)
      .eq('agent_name', 'project-mgmt')
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
    return data.results as PMKnowledgeResult[];
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
  results: PMKnowledgeResult[],
  logger: any
): Promise<void> {
  try {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    
    await supabase
      .from('rag_cache')
      .upsert({
        query_hash: queryHash,
        query_text: query,
        agent_name: 'project-mgmt',
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
 * Hybrid PM knowledge search
 */
export async function retrievePMKnowledge(
  query: string,
  openAiKey: string,
  supabase: SupabaseClient,
  logger: any,
  projectType?: string
): Promise<PMKnowledgeResult[]> {
  const searchStart = Date.now();
  
  // Check cache
  const cacheKey = generateCacheKey(query, projectType);
  const cached = await checkSemanticCache(supabase, cacheKey, logger);
  if (cached) {
    logger.info('RAG cache hit', { duration: Date.now() - searchStart });
    return cached;
  }

  logger.debug('Starting hybrid PM search', { query, projectType });

  // Expand query
  const expandedQuery = expandPMQuery(query);
  
  // Generate embedding
  const embedding = await generateEmbeddingWithRetry(expandedQuery, openAiKey);

  try {
    // Hybrid search
    const { data, error } = await supabase.rpc('search_project_mgmt_hybrid', {
      query_text: expandedQuery,
      query_embedding: embedding,
      match_count: 10
    });

    if (error) throw error;

    const results = data || [];

    logger.info('Hybrid PM search complete', {
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
    logger.error('Hybrid PM search failed', {
      error: error instanceof Error ? error.message : String(error),
      duration: Date.now() - searchStart
    });
    throw error;
  }
}

/**
 * Format PM context for LLM
 */
export function formatPMContext(results: PMKnowledgeResult[]): string {
  if (!results || results.length === 0) {
    return 'No specific PM guidance found. Use general project management principles.';
  }

  return `PROJECT MANAGEMENT GUIDANCE (${results.length} items):\n` +
    results
      .slice(0, 8)
      .map(r => `${r.topic}: ${r.content.substring(0, 160)}...`)
      .join('\n\n');
}
