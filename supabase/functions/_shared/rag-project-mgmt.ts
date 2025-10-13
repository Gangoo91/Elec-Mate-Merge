/**
 * RAG Module for Project Management Agent
 * Hybrid search (BM25 + Vector RRF) for PM knowledge
 * - Query expansion for PM terms
 * - Semantic caching (dynamic TTL based on confidence)
 * - Cross-encoder reranking
 * - Confidence scoring
 */

import { createClient } from './deps.ts';
import { generateEmbeddingWithRetry } from './v3-core.ts';
import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { rerankWithCrossEncoder, type RegulationResult } from './cross-encoder-reranker.ts';
import { calculateConfidence } from './confidence-scorer.ts';

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
 * Calculate dynamic cache TTL
 */
function calculateCacheTTL(avgConfidence: number): number {
  if (avgConfidence > 0.9) return 24 * 60 * 60 * 1000;
  if (avgConfidence > 0.75) return 12 * 60 * 60 * 1000;
  if (avgConfidence > 0.6) return 4 * 60 * 60 * 1000;
  return 60 * 60 * 1000;
}

/**
 * Store in semantic cache with confidence-based TTL
 */
async function storeSemanticCache(
  supabase: SupabaseClient,
  queryHash: string,
  query: string,
  results: PMKnowledgeResult[],
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
        agent_name: 'project-mgmt',
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

    let results = data || [];

    // Cross-encoder reranking
    if (results.length > 0) {
      logger.debug('Reranking PM knowledge with cross-encoder');
      const rerankStart = Date.now();
      
      // Convert to RegulationResult format
      const asRegulations: RegulationResult[] = results.map(r => ({
        id: r.id,
        regulation_number: r.topic,
        section: r.source,
        content: r.content,
        metadata: r.metadata
      }));
      
      const reranked = await rerankWithCrossEncoder(
        query,
        asRegulations,
        openAiKey,
        logger
      );
      
      // Merge scores back
      results = results.map((r, idx) => ({
        ...r,
        finalScore: reranked[idx].finalScore,
        crossEncoderScore: reranked[idx].crossEncoderScore
      }));
      
      logger.info('Cross-encoder reranking complete', {
        duration: Date.now() - rerankStart
      });
    }

    // Calculate confidence scores
    const resultsWithConfidence = results.map(r => {
      const asReg: RegulationResult = {
        id: r.id,
        regulation_number: r.topic,
        section: r.source,
        content: r.content
      };
      return {
        ...r,
        confidence: calculateConfidence(asReg, query, { projectType })
      };
    });

    // Calculate average confidence
    const avgConfidence = resultsWithConfidence.length > 0
      ? resultsWithConfidence.reduce((sum, r) => sum + (r.confidence?.overall || 0.7), 0) / resultsWithConfidence.length
      : 0.7;

    logger.info('Hybrid PM search complete', {
      duration: Date.now() - searchStart,
      resultsCount: results.length,
      avgConfidence: avgConfidence.toFixed(2),
      avgScore: results.length > 0 
        ? (results.reduce((sum: number, r: any) => sum + (r.hybrid_score || 0), 0) / results.length).toFixed(3)
        : 0
    });

    // Store in cache with dynamic TTL
    await storeSemanticCache(supabase, cacheKey, query, resultsWithConfidence, avgConfidence, logger);

    return resultsWithConfidence;
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
