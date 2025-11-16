/**
 * RAG Module for Designer Agent
 * Hybrid search (BM25 + Vector RRF) for BS7671 regulations + design knowledge
 * - Query expansion for electrical terms
 * - Semantic caching (dynamic TTL based on confidence)
 * - Parallel BS7671 + Design Knowledge searches
 * - Cross-encoder reranking
 * - Confidence scoring
 */

import { createClient } from './deps.ts';
import { generateEmbeddingWithRetry } from './v3-core.ts';
import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { rerankWithCrossEncoder, type RegulationResult as CrossEncoderRegulation } from './cross-encoder-reranker.ts';
import { calculateConfidence } from './confidence-scorer.ts';

interface RegulationResult {
  id: string;
  regulation_number: string;
  section: string;
  content: string;
  amendment?: string;
  metadata?: any;
  hybrid_score?: number;
}

interface DesignKnowledgeResult {
  id: string;
  topic: string;
  content: string;
  source: string;
  metadata?: any;
  hybrid_score?: number;
}

interface CachedQuery {
  query_hash: string;
  results: any[];
  hit_count: number;
  created_at: string;
  expires_at: string;
}

/**
 * Query expansion for electrical terms
 */
function expandDesignQuery(query: string): string {
  const expansions: Record<string, string[]> = {
    'shower': ['electric shower', 'instantaneous water heater', 'high load bathroom'],
    'cooker': ['electric cooker', 'cooking appliance', 'diversity'],
    'ev': ['electric vehicle', 'EV charger', 'charging point', 'Section 722'],
    'rcd': ['residual current device', 'earth leakage', '30mA protection'],
    'rcbo': ['residual current circuit breaker', 'combined protection'],
    'bathroom': ['Section 701', 'zones', 'IP rating', 'special location'],
    'outdoor': ['SWA', 'buried cable', 'weatherproof', 'external installation'],
    'fire': ['FP200', 'fire-rated', 'BS 5839', 'enhanced fire performance'],
    'cable': ['conductor', 'wiring', 'current carrying capacity'],
    'earth': ['earthing', 'protective conductor', 'CPC', 'bonding'],
    'loop': ['earth fault loop impedance', 'Zs', 'fault current'],
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
 * Generate cache key from query
 */
function generateCacheKey(query: string, circuitType?: string): string {
  const normalized = query.toLowerCase().trim();
  const key = circuitType ? `${normalized}:${circuitType}` : normalized;
  return btoa(key).substring(0, 32);
}

/**
 * Check semantic cache
 */
async function checkSemanticCache(
  supabase: SupabaseClient,
  queryHash: string,
  logger: any
): Promise<any[] | null> {
  try {
    const { data, error } = await supabase
      .from('rag_cache')
      .select('*')
      .eq('query_hash', queryHash)
      .eq('agent_name', 'designer')
      .gt('expires_at', new Date().toISOString())
      .single();

    if (error || !data) {
      logger.debug('Cache miss', { queryHash });
      return null;
    }

    // Update hit count
    await supabase
      .from('rag_cache')
      .update({ hit_count: (data.hit_count || 0) + 1 })
      .eq('query_hash', queryHash);

    logger.info('Cache hit', { queryHash, hitCount: data.hit_count + 1 });
    return data.results as any[];
  } catch (err) {
    logger.warn('Cache check failed', { error: err instanceof Error ? err.message : String(err) });
    return null;
  }
}

/**
 * Calculate dynamic cache TTL based on confidence
 */
function calculateCacheTTL(avgConfidence: number): number {
  if (avgConfidence > 0.9) return 24 * 60 * 60 * 1000; // 24h
  if (avgConfidence > 0.75) return 12 * 60 * 60 * 1000; // 12h
  if (avgConfidence > 0.6) return 4 * 60 * 60 * 1000; // 4h
  return 60 * 60 * 1000; // 1h (default)
}

/**
 * Store results in semantic cache with confidence-based TTL
 */
async function storeSemanticCache(
  supabase: SupabaseClient,
  queryHash: string,
  query: string,
  results: any[],
  avgConfidence: number,
  logger: any
): Promise<void> {
  try {
    const ttlMs = calculateCacheTTL(avgConfidence);
    const expiresAt = new Date(Date.now() + ttlMs);
    
    await supabase
      .from('rag_cache')
      .upsert({
        query_hash: queryHash,
        query_text: query,
        agent_name: 'designer',
        results,
        hit_count: 0,
        cache_confidence: avgConfidence,
        created_at: new Date().toISOString(),
        expires_at: expiresAt.toISOString()
      });

    logger.debug('Stored in cache', { 
      queryHash, 
      resultCount: results.length,
      confidence: avgConfidence.toFixed(2),
      ttlHours: (ttlMs / (60 * 60 * 1000)).toFixed(1)
    });
  } catch (err) {
    logger.warn('Cache store failed', { error: err instanceof Error ? err.message : String(err) });
  }
}

/**
 * Hybrid BS7671 + Design Knowledge search
 */
export async function retrieveDesignKnowledge(
  query: string,
  openAiKey: string,
  supabase: SupabaseClient,
  logger: any,
  circuitType?: string
): Promise<{ regulations: RegulationResult[]; designKnowledge: DesignKnowledgeResult[] }> {
  const searchStart = Date.now();
  
  // Check cache first
  const cacheKey = generateCacheKey(query, circuitType);
  const cached = await checkSemanticCache(supabase, cacheKey, logger);
  if (cached) {
    logger.info('RAG cache hit', { duration: Date.now() - searchStart });
    return cached as any;
  }

  logger.debug('Starting hybrid design search', { query, circuitType });

  // Expand query for better recall
  const expandedQuery = expandDesignQuery(query);

  try {
    // Parallel searches: Regulations Intelligence + Design Knowledge (no embeddings!)
    const [bs7671Results, designResults] = await Promise.all([
      // Regulations Intelligence hybrid search
      supabase.rpc('search_regulations_intelligence_hybrid', {
        query_text: expandedQuery,
        match_count: 15
      }),
      
      // Design knowledge hybrid search
      supabase.rpc('search_design_hybrid', {
        query_text: expandedQuery,
        match_count: 12
      })
    ]);

    let regulations = bs7671Results.data || [];
    const designKnowledge = designResults.data || [];

    // Cross-encoder reranking for regulations
    if (regulations.length > 0) {
      logger.debug('Reranking regulations with cross-encoder');
      const rerankStart = Date.now();
      
      regulations = await rerankWithCrossEncoder(
        query,
        regulations as CrossEncoderRegulation[],
        openAiKey,
        logger
      );
      
      logger.info('Cross-encoder reranking complete', {
        duration: Date.now() - rerankStart,
        topScore: regulations[0]?.finalScore?.toFixed(3),
        bottomScore: regulations[regulations.length - 1]?.finalScore?.toFixed(3)
      });
    }

    // Calculate confidence scores for each regulation
    const regulationsWithConfidence = regulations.map(reg => ({
      ...reg,
      confidence: calculateConfidence(reg as any, query, { circuitType })
    }));

    // Calculate average confidence for cache TTL
    const avgConfidence = regulationsWithConfidence.length > 0
      ? regulationsWithConfidence.reduce((sum, r) => sum + (r.confidence?.overall || 0.7), 0) / regulationsWithConfidence.length
      : 0.7;

    logger.info('Hybrid design search complete', {
      duration: Date.now() - searchStart,
      regulationsCount: regulations.length,
      designKnowledgeCount: designKnowledge.length,
      avgConfidence: avgConfidence.toFixed(2),
      avgRegScore: regulations.length > 0 
        ? (regulations.reduce((sum: number, r: any) => sum + (r.hybrid_score || 0), 0) / regulations.length).toFixed(3)
        : 0
    });

    const results = { 
      regulations: regulationsWithConfidence, 
      designKnowledge 
    };

    // Store in cache with dynamic TTL
    await storeSemanticCache(supabase, cacheKey, query, results, avgConfidence, logger);

    return results;
  } catch (error) {
    logger.error('Hybrid design search failed', {
      error: error instanceof Error ? error.message : String(error),
      duration: Date.now() - searchStart
    });
    throw error;
  }
}

/**
 * Format design context for LLM
 */
export function formatDesignContext(
  regulations: RegulationResult[],
  designKnowledge: DesignKnowledgeResult[]
): string {
  let context = '';

  if (regulations.length > 0) {
    context += `BS7671 REGULATIONS (${regulations.length} items):\n`;
    context += regulations
      .slice(0, 10) // Top 10 most relevant
      .map(r => `[${r.regulation_number}] ${r.content.substring(0, 200)}...`)
      .join('\n\n');
    context += '\n\n';
  }

  if (designKnowledge.length > 0) {
    context += `DESIGN GUIDANCE (${designKnowledge.length} items):\n`;
    context += designKnowledge
      .slice(0, 8) // Top 8 most relevant
      .map(d => `${d.topic}: ${d.content.substring(0, 180)}...`)
      .join('\n\n');
  }

  if (!context) {
    context = 'No specific regulations or design guidance found. Use general electrical design principles.';
  }

  return context;
}
