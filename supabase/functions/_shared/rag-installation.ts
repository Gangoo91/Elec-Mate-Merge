/**
 * RAG Module for Installation Agent
 * Hybrid search (BM25 + Vector RRF) for installation knowledge
 * - Query expansion for installation-specific terms
 * - Semantic caching (dynamic TTL based on confidence)
 * - Cross-encoder reranking
 * - Confidence scoring
 */

import { createClient } from './deps.ts';
import { generateEmbeddingWithRetry } from './v3-core.ts';
import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { rerankWithCrossEncoder, type RegulationResult } from './cross-encoder-reranker.ts';
import { calculateConfidence } from './confidence-scorer.ts';

/**
 * Query expansion for installation-specific terms
 */
function expandInstallationQuery(query: string): string {
  const expansions: Record<string, string[]> = {
    'clip': ['fixing', 'support', 'saddle', 'bracket', 'spacing', 'Table 4A2'],
    'conduit': ['trunking', 'enclosed', 'protected run', 'bending radius'],
    'notch': ['joisting', 'structural', 'building regs', 'floor joists'],
    'buried': ['direct burial', 'SWA', 'protection', 'warning tape', '600mm depth'],
    'bathroom': ['zones', 'Section 701', 'IP rating', 'supplementary bonding'],
    'shower': ['high current', 'pull cord', 'double pole isolation', 'bathroom'],
    'socket': ['ring final', 'radial', 'spurs', '2.5mm²', '32A'],
    'light': ['lighting circuit', 'switch drops', '1.5mm²', '6A'],
    'ev': ['EV charging', 'Section 722', 'outdoor socket', 'RCD protection'],
    'trunking': ['segregation', 'capacity factor', 'cable management'],
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
function generateCacheKey(query: string, method?: string): string {
  const normalized = query.toLowerCase().trim();
  const key = method ? `${normalized}:${method}` : normalized;
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
      .eq('agent_name', 'installer-v3')
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
        query_text: query.substring(0, 500),
        agent_name: 'installer-v3',
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
 * Retrieve installation knowledge with hybrid search + cross-encoder reranking
 */
export async function retrieveInstallationKnowledge(
  query: string,
  matchCount: number,
  openAiKey: string,
  entities: any,
  logger: any
): Promise<any[]> {
  const searchStart = Date.now();
  
  // Create supabase client
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Parallel: cache check + query expansion
  const cacheKey = generateCacheKey(query, entities.installationMethod);
  const [cached, expandedQuery] = await Promise.all([
    checkSemanticCache(supabase, cacheKey, logger),
    Promise.resolve(expandInstallationQuery(query))
  ]);

  // Early exit if cache hit with high confidence
  if (cached && Array.isArray(cached) && cached[0]?.confidence?.overall > 0.9) {
    logger.info('RAG cache hit (high confidence, skipping rerank)', { 
      duration: Date.now() - searchStart,
      confidence: cached[0].confidence.overall
    });
    return cached;
  }

  if (cached) {
    logger.info('RAG cache hit', { duration: Date.now() - searchStart });
    return cached;
  }

  logger.debug('Starting hybrid installation search', { query, method: entities.installationMethod });
  
  // Generate embedding
  const embedding = await generateEmbeddingWithRetry(expandedQuery, openAiKey);

  try {
    // Dual RAG search: Practical work + BS 7671 regulations
    logger.debug('Starting dual RAG search', { 
      practicalCount: Math.floor(matchCount * 0.6), 
      regulationsCount: Math.floor(matchCount * 0.4) 
    });
    
    const [practicalWorkResults, regulationsResults] = await Promise.all([
      // Practical work intelligence (tools, materials, procedures)
      supabase.rpc('search_practical_work_intelligence_hybrid', {
        query_text: expandedQuery,
        match_count: Math.floor(matchCount * 0.6), // 60% for practical work
        filter_trade: null // Installation methods apply to all trades
      }).catch(err => {
        logger.error('Practical work search failed', { error: err instanceof Error ? err.message : String(err) });
        return { data: [], error: err };
      }),
      
      // BS 7671 regulations (regulation numbers, compliance)
      supabase.rpc('search_bs7671_intelligence_hybrid', {
        query_text: expandedQuery,
        match_count: Math.floor(matchCount * 0.4) // 40% for regulations
      }).catch(err => {
        logger.error('Regulations search failed', { error: err instanceof Error ? err.message : String(err) });
        return { data: [], error: err };
      })
    ]);

    logger.info('Dual RAG search complete', { 
      practicalWork: practicalWorkResults.data?.length || 0,
      regulations: regulationsResults.data?.length || 0
    });

    // Combine results
    let knowledge = [
      ...(practicalWorkResults.data || []),
      ...(regulationsResults.data || [])
    ];

    // Normalize field names for consistent consumption by AI
    knowledge = knowledge.map(item => ({
      ...item,
      // Map 'topic' or 'primary_topic' to 'regulation_number' for consistency
      regulation_number: item.regulation_number || item.primary_topic || item.topic || 'N/A',
      // Ensure content exists
      content: item.content || item.primary_topic || '',
      // Preserve rich fields from practical work intelligence
      tools: item.tools_required || [],
      materials: item.materials_needed || [],
      regulations: item.bs7671_regulations || [],
      // Keep source for debugging
      source: item.source || 'unknown'
    }));

    logger.info('Field normalization complete', { 
      totalItems: knowledge.length,
      sampleRegNumber: knowledge[0]?.regulation_number,
      sampleToolsCount: knowledge[0]?.tools?.length || 0
    });

    // Graceful degradation: if both RAG searches failed, use minimal fallback
    if (knowledge.length === 0) {
      logger.warn('No RAG results from dual search, using fallback data');
      knowledge = [
        {
          regulation_number: '134.1.1',
          content: 'Good workmanship and proper materials shall be used in electrical installations.',
          source: 'fallback',
          tools: [],
          materials: [],
          regulations: ['134.1.1']
        },
        {
          regulation_number: '411.3.1.1',
          content: 'Automatic disconnection of supply is required for protection against electric shock.',
          source: 'fallback',
          tools: [],
          materials: [],
          regulations: ['411.3.1.1']
        }
      ];
    }

    // Cross-encoder reranking
    if (knowledge.length > 0) {
      logger.debug('Reranking installation guides with cross-encoder');
      const rerankStart = Date.now();
      
      knowledge = await rerankWithCrossEncoder(
        query,
        knowledge as RegulationResult[],
        openAiKey,
        logger
      );
      
      logger.info('Cross-encoder reranking complete', {
        duration: Date.now() - rerankStart,
        topScore: knowledge[0]?.finalScore?.toFixed(3),
        bottomScore: knowledge[knowledge.length - 1]?.finalScore?.toFixed(3)
      });
    }

    // Calculate confidence scores
    const knowledgeWithConfidence = knowledge.map(item => ({
      ...item,
      confidence: calculateConfidence(item as any, query, entities)
    }));

    // Calculate average confidence for cache TTL
    const avgConfidence = knowledgeWithConfidence.length > 0
      ? knowledgeWithConfidence.reduce((sum, k) => sum + (k.confidence?.overall || 0.7), 0) / knowledgeWithConfidence.length
      : 0.7;

    logger.info('Hybrid installation search complete', {
      duration: Date.now() - searchStart,
      knowledgeCount: knowledge.length,
      avgConfidence: avgConfidence.toFixed(2),
      avgScore: knowledge.length > 0 
        ? (knowledge.reduce((sum: number, k: any) => sum + (k.hybrid_score || 0), 0) / knowledge.length).toFixed(3)
        : 0
    });

    // Store in cache with dynamic TTL
    await storeSemanticCache(supabase, cacheKey, query, knowledgeWithConfidence, avgConfidence, logger);

    return knowledgeWithConfidence;
  } catch (error) {
    logger.error('Hybrid installation search failed', {
      error: error instanceof Error ? error.message : String(error),
      duration: Date.now() - searchStart
    });
    throw error;
  }
}
