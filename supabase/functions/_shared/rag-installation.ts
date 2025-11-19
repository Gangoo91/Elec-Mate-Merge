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
    // FIX 3: Enhanced EV term expansion
    'ev': ['electric vehicle', 'EV charging', 'EVCP', 'Section 722', 'Mode 3', 'Type 2', 'dedicated circuit', 'charging point'],
    'charger': ['charging point', 'EVCP', 'socket-outlet', 'dedicated circuit', 'Mode 3', 'Type 2'],
    'charging': ['EV charging', 'Section 722', 'charging point', 'Mode 3', 'dedicated supply'],
    '722': ['Section 722', 'EV charging', 'electric vehicle', 'charging installation'],
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
    // Direct SQL RAG (Solution 4 - proven in installer-v3)
    logger.debug('Starting direct SQL RAG search');
    
    // FIX 1: Improved keyword extraction with stop-word filtering and technical term prioritization
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'install', 'fit', 'connect', 'need'];
    const technicalTerms = ['ev', 'charger', 'charging', '722', 'rcbo', 'rcd', 'swa', 'shower', 'bathroom', 'socket'];
    
    // Extract all potential keywords
    const allKeywords = query
      .toLowerCase()
      .split(/\s+/)
      .filter(w => w.length > 2 && !stopWords.includes(w)) // Allow 3+ chars, remove stop words
      .slice(0, 8); // Top 8 keywords
    
    // Prioritize technical terms first
    const priorityKeywords = allKeywords.filter(k => technicalTerms.some(t => k.includes(t)));
    const finalKeywords = [...new Set([...priorityKeywords, ...allKeywords])].slice(0, 5);
    
    const keyword1 = finalKeywords[0] || 'installation';
    const keyword2 = finalKeywords[1] || 'cable';
    const keyword3 = finalKeywords[2] || 'circuit';
    
    // FIX 4: Dynamic result limits based on query complexity
    const isComplexQuery = finalKeywords.length > 3 || query.length > 50;
    const practicalLimit = isComplexQuery ? 25 : 15;
    const regulationsLimit = isComplexQuery ? 15 : 10;
    
    logger.debug('Keywords extracted', { 
      keywords: finalKeywords, 
      isComplex: isComplexQuery,
      limits: { practical: practicalLimit, regulations: regulationsLimit }
    });
    
    // Use RPC function for Practical Work Intelligence with retry logic
    let practicalData: any[] = [];
    let practicalError: any = null;
    
    try {
      const { data, error } = await supabase.rpc(
        'search_practical_work_intelligence_hybrid',
        {
          query_text: query, // Use FULL query for better context
          match_count: practicalLimit,
          filter_trade: null
        }
      );
      
      practicalData = data || [];
      practicalError = error;
      
      // Retry with simpler query if failed or zero results
      if ((practicalError || practicalData.length === 0) && practicalLimit > 10) {
        logger.warn('Practical work RPC failed/empty, retrying with simpler query', { 
          originalError: practicalError?.message,
          originalLimit: practicalLimit 
        });
        
        const { data: retryData, error: retryError } = await supabase.rpc(
          'search_practical_work_intelligence_hybrid',
          {
            query_text: keyword1 + ' ' + keyword2, // Simpler query with just top keywords
            match_count: 10, // Reduced limit
            filter_trade: null
          }
        );
        
        if (!retryError && retryData && retryData.length > 0) {
          practicalData = retryData;
          practicalError = null;
          logger.info('Retry successful', { resultsCount: retryData.length });
        } else {
          logger.warn('Retry also failed, proceeding with regulations-only', { retryError });
        }
      }
    } catch (err) {
      practicalError = err;
      logger.error('Practical work RPC exception', { error: err });
    }
    
    if (practicalError && practicalData.length === 0) {
      logger.warn('⚠️ Graceful degradation: Proceeding with regulations-only (no practical work data)');
    }
    
    logger.info('Practical work RPC complete', {
      resultsCount: practicalData?.length || 0,
      avgScore: practicalData?.length > 0 
        ? (practicalData.reduce((sum: number, r: any) => sum + (r.hybrid_score || 0), 0) / practicalData.length).toFixed(2)
        : 0,
      usedRetry: practicalLimit > 10 && (practicalError || practicalData.length === 0)
    });
    
    // Use RPC function for Regulations Intelligence
    const { data: regulationsData, error: regulationsError } = await supabase.rpc(
      'search_regulations_intelligence_hybrid',
      {
        query_text: query, // Use FULL query
        match_count: regulationsLimit
      }
    );
    
    if (regulationsError) {
      logger.error('Regulations RPC failed', { error: regulationsError });
    }
    
    logger.info('Regulations RPC complete', {
      resultsCount: regulationsData?.length || 0
    });
    
    if (regulationsError) {
      logger.error('Regulations SQL query failed', { error: regulationsError });
    }
    
    const initialResultCount = (practicalData?.length || 0) + (regulationsData?.length || 0);
    
    logger.info('RPC RAG complete', {
      practical: practicalData?.length || 0,
      regulations: regulationsData?.length || 0,
      total: initialResultCount
    });

    // Zero-result fallback - trigger broader RPC search if results are too low
    let shouldUseFallback = initialResultCount < 5;
    let fallbackPractical: any[] = [];
    let fallbackRegulations: any[] = [];
    
    if (shouldUseFallback) {
      logger.warn('Low RAG results, triggering broader RPC fallback', { 
        currentCount: initialResultCount,
        threshold: 5
      });
      
      // Broader practical work RPC search
      const { data: fbPractical } = await supabase.rpc(
        'search_practical_work_intelligence_hybrid',
        {
          query_text: expandedQuery.join(' '), // Use expanded query for broader context
          match_count: 15,
          filter_trade: null
        }
      );
      
      // Broader regulations RPC search
      const { data: fbRegulations } = await supabase.rpc(
        'search_regulations_intelligence_hybrid',
        {
          query_text: expandedQuery.join(' '),
          match_count: 10
        }
      );
      
      fallbackPractical = fbPractical || [];
      fallbackRegulations = fbRegulations || [];
      
      logger.info('Fallback RPC search complete', { 
        practicalCount: fallbackPractical.length,
        regulationsCount: fallbackRegulations.length
      });
    }

    // Essential practical fallback data
    const practicalFallback = [
      { 
        regulation_number: 'Safe Isolation',
        content: 'Safely isolate the electrical supply before commencing any work. Verify isolation using an approved voltage tester.',
        tools_required: ['Voltage tester', 'Lock-off kit', 'Warning notices'],
        materials_needed: ['Isolation locks', 'Warning tags'],
        source: 'practical_fallback'
      },
      { 
        regulation_number: 'Cable Installation',
        content: 'Install cables using appropriate fixing methods. Ensure cables are properly supported and protected from mechanical damage.',
        tools_required: ['Cable clips', 'Conduit cutters', 'Crimping tool', 'Wire strippers'],
        materials_needed: ['Cable', 'Fixings', 'Conduit', 'Accessories'],
        source: 'practical_fallback'
      },
      { 
        regulation_number: 'Terminations',
        content: 'Make all terminations securely using appropriate torque settings. Ensure correct conductor identification.',
        tools_required: ['Torque screwdriver', 'Wire strippers', 'Side cutters'],
        materials_needed: ['Terminal blocks', 'Ferrules', 'Cable markers'],
        source: 'practical_fallback'
      },
      { 
        regulation_number: 'Testing & Verification',
        content: 'Carry out all required tests including continuity, insulation resistance, and polarity. Record all results.',
        tools_required: ['Multifunction tester', 'Test leads', 'Test probes'],
        materials_needed: ['Test certificates', 'Labels'],
        source: 'practical_fallback'
      }
    ];

    // Combine results: practical + regulations + broader fallback (if triggered) + essential fallback
    let knowledge = [
      ...(practicalData || []),
      ...(regulationsData || []),
      ...fallbackPractical,
      ...fallbackRegulations,
      ...practicalFallback
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

    // Graceful degradation: if BS 7671 search failed, fallback data still available
    if (knowledge.length === 0) {
      logger.warn('No RAG results, using minimal fallback data');
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
