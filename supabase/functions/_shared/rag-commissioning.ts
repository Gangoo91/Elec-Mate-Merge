/**
 * RAG Module for Commissioning Agent
 * Hybrid search for testing & inspection knowledge
 * - Query expansion for testing terms
 * - Semantic caching (dynamic TTL based on confidence)
 * - Cross-encoder reranking
 * - Confidence scoring
 * Uses BS7671 hybrid search as primary source
 */

import { createClient } from './deps.ts';
import { generateEmbeddingWithRetry } from './v3-core.ts';
import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { rerankWithCrossEncoder, type RegulationResult } from './cross-encoder-reranker.ts';
import { calculateConfidence } from './confidence-scorer.ts';

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
  results: CommissioningResult[],
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
        agent_name: 'commissioning',
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
    // 1. Search GN3 Inspection & Testing Knowledge (PRIMARY SOURCE for practical procedures)
    logger.debug('Searching GN3 inspection_testing_knowledge...');
    const { data: gn3Data, error: gn3Error } = await supabase.rpc('search_inspection_testing_hybrid', {
      query_text: expandedQuery,
      query_embedding: embedding,
      match_count: 15  // Higher count for GN3 - we want comprehensive procedural details
    });

    if (gn3Error) {
      logger.warn('GN3 search failed, falling back to BS7671', { error: gn3Error.message });
    }

    const gn3Results = gn3Data || [];
    logger.info('GN3 search complete', { 
      resultsCount: gn3Results.length,
      source: 'inspection_testing_knowledge'
    });

    // 2. Search BS7671 Regulations (SECONDARY SOURCE for regulatory context)
    logger.debug('Searching BS7671 regulations...');
    const { data: bs7671Data, error: bs7671Error } = await supabase.rpc('search_bs7671_hybrid', {
      query_text: expandedQuery,
      query_embedding: embedding,
      match_count: 8  // Lower count for regulations - just need key compliance points
    });

    if (bs7671Error) {
      logger.warn('BS7671 search failed', { error: bs7671Error.message });
    }

    const bs7671Results = bs7671Data || [];
    logger.info('BS7671 search complete', { 
      resultsCount: bs7671Results.length,
      source: 'bs7671_intelligence'
    });

    // 3. Merge results with GN3 prioritized (GN3 first, then BS7671)
    let results = [
      ...gn3Results.map(r => ({ ...r, source: 'GN3', sourceType: 'practical' })),
      ...bs7671Results.map(r => ({ ...r, source: 'BS7671', sourceType: 'regulatory' }))
    ];

    logger.info('Merged RAG results', {
      total: results.length,
      gn3Count: gn3Results.length,
      bs7671Count: bs7671Results.length
    });

    // Cross-encoder reranking
    if (results.length > 0) {
      logger.debug('Reranking commissioning knowledge with cross-encoder');
      const rerankStart = Date.now();
      
      // Convert to RegulationResult format
      const asRegulations: RegulationResult[] = results.map(r => ({
        id: r.id,
        regulation_number: r.regulation_number || r.topic || 'GN3',
        section: r.section || 'Testing Guidance',
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
        regulation_number: r.regulation_number || r.topic || 'GN3',
        section: r.section || 'Testing',
        content: r.content
      };
      const baseConfidence = calculateConfidence(asReg, query, { testType });
      
      // Boost GN3 practical procedures by 15% (they're gold standard for testing)
      const confidenceBoost = r.sourceType === 'practical' ? 0.15 : 0;
      
      return {
        ...r,
        confidence: {
          ...baseConfidence,
          overall: Math.min(1.0, (baseConfidence.overall || 0.7) + confidenceBoost)
        }
      };
    });

    // Calculate average confidence
    const avgConfidence = resultsWithConfidence.length > 0
      ? resultsWithConfidence.reduce((sum, r) => sum + (r.confidence?.overall || 0.7), 0) / resultsWithConfidence.length
      : 0.7;

    logger.info('Hybrid commissioning search complete', {
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

  const gn3Count = results.filter(r => r.sourceType === 'practical').length;
  const bs7671Count = results.filter(r => r.sourceType === 'regulatory').length;

  return `TESTING & INSPECTION GUIDANCE (${results.length} items: ${gn3Count} GN3 practical procedures, ${bs7671Count} BS7671 regulations):\n\n` +
    results
      .slice(0, 12)  // Increased from 10 to accommodate more GN3 procedures
      .map((r, idx) => {
        const sourceTag = r.sourceType === 'practical' ? '[GN3 PROCEDURE]' : '[BS7671 REG]';
        const prefix = r.regulation_number 
          ? `${sourceTag} [${r.regulation_number}]` 
          : r.topic 
            ? `${sourceTag} ${r.topic}:` 
            : sourceTag;
        return `${idx + 1}. ${prefix} ${r.content.substring(0, 200)}...`;
      })
      .join('\n\n');
}
