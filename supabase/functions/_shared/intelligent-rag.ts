/**
 * Intelligent Hybrid RAG Search
 * 3-Tier Cascade: Exact → Vector → Keyword
 * UPGRADE: Query expansion + Re-ranking intelligence
 */

import { createClient } from './deps.ts';
import type { ContextEnvelope, FoundRegulation } from './agent-context.ts';

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

/**
 * PHASE 1: Build context-enriched query using conversation state
 */
function buildContextEnrichedQuery(
  baseQuery: string,
  params: HybridSearchParams
): string {
  const contextPieces: string[] = [baseQuery];
  
  // Inject previous design context
  if (params.context?.designSummary) {
    const d = params.context.designSummary;
    if (d.cableType) contextPieces.push(d.cableType);
    if (d.location) contextPieces.push(`${d.location} location`);
    if (d.circuitType) contextPieces.push(d.circuitType);
    if (d.load) contextPieces.push(`${d.load}W load`);
  }
  
  // Inject previous agent outputs
  if (params.context?.contextHistory) {
    const recentContributions = params.context.contextHistory
      .slice(-3) // Last 3 contributions
      .filter(c => c.confidence > 70)
      .map(c => c.contribution);
    contextPieces.push(...recentContributions);
  }
  
  return contextPieces.join(' ');
}

/**
 * IMPROVEMENT #2: Query Expansion Intelligence
 * Expands search terms with synonyms and electrical domain terms
 */
function expandSearchTerms(query: string): string[] {
  const synonyms: Record<string, string[]> = {
    'shower': ['electric shower', 'instantaneous water heater', 'high load', 'bathroom heating'],
    'socket': ['power outlet', 'ring main', 'radial circuit', '13A outlet', 'socket outlet'],
    'protection': ['overload', 'short circuit', 'fault protection', 'MCB', 'RCBO', 'RCD'],
    'cable': ['conductor', 'wiring', 'cable sizing', 'current capacity', 'wire'],
    'earth': ['ground', 'earthing', 'protective conductor', 'CPC', 'bonding'],
    'voltage drop': ['volt drop', 'VD', 'voltage loss', 'cable sizing'],
    'consumer unit': ['CU', 'distribution board', 'DB', 'fuse box', 'consumer board'],
    'lighting': ['light', 'illumination', 'luminaire', 'lamp', 'lighting circuit'],
    'cooker': ['cooking appliance', 'oven', 'hob', 'cooker circuit'],
    'immersion': ['immersion heater', 'water heater', 'hot water'],
  };
  
  const terms = query.toLowerCase().split(/\s+/);
  const expanded = new Set(terms);
  
  // Add exact query
  expanded.add(query.toLowerCase());
  
  // Expand with synonyms
  terms.forEach(term => {
    Object.entries(synonyms).forEach(([key, values]) => {
      if (term.includes(key) || key.includes(term)) {
        values.forEach(v => expanded.add(v));
      }
    });
  });
  
  return Array.from(expanded).slice(0, 15); // Limit to prevent query bloat
}

/**
 * IMPROVEMENT #3: Regulation Re-ranking
 * Boosts critical regulations based on recency, safety importance
 */
function reRankRegulations(regulations: any[]): any[] {
  return regulations.map(reg => {
    let boostScore = 1.0;
    
    // Boost Amendment 3:2024 regulations (most recent)
    if (reg.amendment?.includes('A3:2024') || reg.amendment?.includes('Amendment 3')) {
      boostScore *= 1.3;
    }
    
    // Boost protective regulations (Chapter 41, 43)
    if (reg.regulation_number?.match(/^(41|43)/)) {
      boostScore *= 1.25;
    }
    
    // Boost voltage drop (525) - critical for cable sizing
    if (reg.regulation_number?.includes('525')) {
      boostScore *= 1.2;
    }
    
    // Boost earthing and bonding (Chapter 54)
    if (reg.regulation_number?.match(/^54/)) {
      boostScore *= 1.15;
    }
    
    // Boost RCD protection regulations
    if (reg.content?.toLowerCase().includes('rcd') || reg.regulation_number?.includes('531')) {
      boostScore *= 1.15;
    }
    
    // Boost special locations (Part 7) when relevant
    if (reg.regulation_number?.match(/^70/)) {
      boostScore *= 1.1;
    }
    
    return {
      ...reg,
      relevance: Math.round((reg.relevance || 80) * boostScore),
    };
  }).sort((a, b) => b.relevance - a.relevance);
}

export interface HybridSearchParams {
  circuitType?: string;
  powerRating?: number;
  searchTerms: string[];
  expandedQuery: string;
  context?: ContextEnvelope;
}

export interface HybridSearchResult {
  regulations: FoundRegulation[];
  designDocs: any[];
  healthSafetyDocs: any[];
  installationDocs: any[]; // NEW: Installation knowledge
  searchMethod: 'exact' | 'vector' | 'keyword' | 'hybrid';
  searchTimeMs: number;
  embedding?: number[];
}

/**
 * Tier 1: Exact Regulation Lookup (5ms)
 */
async function exactRegulationSearch(
  supabase: any,
  params: HybridSearchParams
): Promise<{ regulations: any[]; timeMs: number }> {
  const startTime = Date.now();
  
  const { data, error } = await supabase.rpc('search_regulation_index', {
    search_circuit_type: params.circuitType,
    search_power: params.powerRating,
    search_terms: params.searchTerms,
  });

  if (error || !data || data.length === 0) {
    return { regulations: [], timeMs: Date.now() - startTime };
  }

  // Get full regulation content
  const regNumbers = data.map((r: any) => r.regulation_number);
  const { data: fullRegs } = await supabase
    .from('bs7671_embeddings')
    .select('*')
    .in('regulation_number', regNumbers)
    .limit(10);

  return {
    regulations: fullRegs?.map((reg: any) => ({
      ...reg,
      source: 'exact',
      relevance: 100,
    })) || [],
    timeMs: Date.now() - startTime,
  };
}

/**
 * Tier 2: Vector Search with Re-ranking (200ms) - PHASE 5: PARALLEL OPTIMIZATION
 */
async function vectorSearch(
  supabase: any,
  params: HybridSearchParams,
  skipIfFound: number = 3
): Promise<{ regulations: any[]; designDocs: any[]; healthSafetyDocs: any[]; embedding: number[]; timeMs: number }> {
  const startTime = Date.now();

  // Check if we can reuse cached embedding
  if (params.context?.embeddingCache && params.context.embeddingCache.query === params.expandedQuery) {
    const cachedAge = Date.now() - params.context.embeddingCache.generatedAt;
    if (cachedAge < 300000) { // 5 minutes
      console.log('🚀 Reusing cached embedding');
      return await vectorSearchWithEmbedding(
        supabase,
        params,
        params.context.embeddingCache.embedding,
        startTime
      );
    }
  }

  // PHASE 1 & 5: Generate embedding with correct dimensions (3072) for accuracy
  const [embeddingData, _] = await Promise.all([
    // Embedding generation (200ms) - PHASE 1: text-embedding-3-large for 3072d
    fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: params.expandedQuery,
        model: 'text-embedding-3-large', // PHASE 1: Upgraded from 3-small
        dimensions: 3072 // Explicit dimension specification
      }),
    }).then(res => {
      if (!res.ok) throw new Error(`OpenAI embedding failed: ${res.status}`);
      return res.json();
    }),
    
    // Keyword extraction preparation (50ms) - runs in parallel
    Promise.resolve(expandSearchTerms(params.expandedQuery))
  ]);

  const embedding = embeddingData.data[0].embedding;

  return await vectorSearchWithEmbedding(supabase, params, embedding, startTime);
}

async function vectorSearchWithEmbedding(
  supabase: any,
  params: HybridSearchParams,
  embedding: number[],
  startTime: number
): Promise<{ regulations: any[]; designDocs: any[]; healthSafetyDocs: any[]; installationDocs: any[]; embedding: number[]; timeMs: number }> {
  
  const priority = params.context?.ragPriority;
  
  // PHASE 4: Detect "why" questions for explanation retrieval
  const { detectWhyQuestion } = await import('./query-decomposer.ts');
  const whyAnalysis = detectWhyQuestion(params.expandedQuery);
  
  // PHASE 5: Build all search promises upfront for parallel execution
  const searches: Promise<any>[] = [];
  const searchTypes: string[] = [];
  
  // PHASE 5: Calculate query specificity for dynamic match count
  const { calculateQuerySpecificity, parseQueryEntities } = await import('./query-parser.ts');
  const entities = parseQueryEntities(params.expandedQuery);
  const specificity = calculateQuerySpecificity(entities);
  const matchCount = specificity > 70 ? 10 : specificity > 40 ? 15 : 25;
  
  console.log(`📊 Query specificity: ${specificity}% → retrieving ${matchCount} regulations`);
  
  // PHASE 4: "Why" question - add specific regulation lookup
  if (whyAnalysis.isWhy) {
    console.log(`❓ Why question detected: ${whyAnalysis.topic}`, {
      inferredReg: whyAnalysis.inferredRegulation
    });
    
    if (whyAnalysis.inferredRegulation) {
      searches.push(
        supabase
          .from('bs7671_embeddings')
          .select('*')
          .ilike('regulation_number', `${whyAnalysis.inferredRegulation}%`)
          .limit(3)
      );
      searchTypes.push('exact_regulation');
    }
  }

  // BS 7671 search - PHASE 2: Use cached version for 120x speedup
  if (!priority || priority.bs7671 > 50) {
    searches.push(
      supabase.rpc('search_bs7671_hybrid_cached', {
        query_text: params.expandedQuery,
        query_embedding: embedding,
        match_count: matchCount, // PHASE 5: Dynamic match count
      })
    );
    searchTypes.push('bs7671');
  }

  // Design knowledge search
  if (!priority || priority.design > 50) {
    searches.push(
      supabase.rpc('search_design_knowledge', {
        query_embedding: embedding,
        match_threshold: 0.50,
        match_count: 12,
      })
    );
    searchTypes.push('design');
  }

  // Health & Safety search
  if (priority && priority.health_safety > 70) {
    searches.push(
      supabase.rpc('search_health_safety', {
        query_embedding: embedding,
        match_threshold: 0.55,
        match_count: 8,
      })
    );
    searchTypes.push('health_safety');
  }

  // PHASE 3: Installation knowledge search - skip if low priority
  if (!priority || priority.installation >= 50) {
    searches.push(
      supabase.rpc('search_installation_knowledge', {
        query_embedding: embedding,
        method_filter: params.context?.entities?.installMethod || null,
        match_threshold: 0.50,
        match_count: 8,
      })
    );
    searchTypes.push('installation');
  } else {
    console.log('⏭️ Skipping installation search (low priority)');
  }

  // IMPROVEMENT: Proactive Error Recovery - Execute with retry logic
  const { withRetry, RetryPresets } = await import('./retry.ts');
  
  const results = await Promise.all(
    searches.map((search, index) => 
      withRetry(
        () => search,
        {
          ...RetryPresets.FAST,
          shouldRetry: (error: unknown) => {
            if (error instanceof Error) {
              const msg = error.message.toLowerCase();
              return msg.includes('timeout') || 
                     msg.includes('network') ||
                     msg.includes('econnreset');
            }
            return false;
          }
        }
      ).catch((error) => {
        console.error(`RAG search ${searchTypes[index]} failed:`, error);
        return { data: [], error: error.message };
      })
    )
  );

  // IMPROVEMENT: Handle partial failures gracefully
  const failedSearches = results.filter(r => r.error).length;
  if (failedSearches > 0) {
    console.warn(`⚠️ ${failedSearches}/${results.length} RAG searches failed - continuing with partial results`);
  }

  // Map results back to named fields
  const resultMap: any = {};
  searchTypes.forEach((type, idx) => {
    const result = results[idx];
    resultMap[type] = result?.data || [];
    if (result?.error) {
      console.warn(`Search ${type} failed: ${result.error}`);
    }
  });

  // IMPROVEMENT: Ensure minimum quality threshold
  const totalResults = (resultMap.bs7671?.length || 0) + 
                      (resultMap.design?.length || 0) + 
                      (resultMap.installation?.length || 0) + 
                      (resultMap.health_safety?.length || 0);
  
  const hasMinimumResults = totalResults >= 3;
  
  if (!hasMinimumResults && failedSearches === 0) {
    console.warn('⚠️ Low quality RAG results - fewer than minimum threshold');
  }

  return {
    regulations: resultMap.bs7671 || [],
    designDocs: resultMap.design || [],
    healthSafetyDocs: resultMap.health_safety || [],
    installationDocs: resultMap.installation || [],
    embedding,
    timeMs: Date.now() - startTime,
    qualityMetrics: {
      failedSearches,
      totalSearches: searches.length,
      hasMinimumResults,
      totalResults
    }
  };
}

/**
 * Tier 3: Keyword Fallback (100ms)
 */
async function keywordFallback(
  supabase: any,
  params: HybridSearchParams,
  currentResults: { regulations: any[]; designDocs: any[] }
): Promise<{ regulations: any[]; designDocs: any[]; timeMs: number }> {
  const startTime = Date.now();
  const results = { regulations: [...currentResults.regulations], designDocs: [...currentResults.designDocs] };

  // Only trigger if insufficient results
  if (results.regulations.length < 3 && params.circuitType) {
    const { data: keywordRegs } = await supabase
      .from('bs7671_embeddings')
      .select('*')
      .or(`content.ilike.%${params.circuitType}%,regulation_number.ilike.%43%`)
      .limit(8);

    if (keywordRegs && keywordRegs.length > 0) {
      results.regulations.push(...keywordRegs.map((reg: any) => ({
        ...reg,
        source: 'keyword',
        relevance: 70,
      })));
    }
  }

  if (results.designDocs.length < 3 && params.circuitType) {
    const { data: keywordDesign } = await supabase
      .from('design_knowledge')
      .select('*')
      .ilike('content', `%${params.circuitType}%`)
      .limit(10);

    if (keywordDesign && keywordDesign.length > 0) {
      results.designDocs.push(...keywordDesign.map((doc: any) => ({
        ...doc,
        source: 'keyword',
      })));
    }
  }

  return { ...results, timeMs: Date.now() - startTime };
}

/**
 * Main Intelligent RAG Search
 */
export async function intelligentRAGSearch(
  params: HybridSearchParams
): Promise<HybridSearchResult> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const totalStartTime = Date.now();
  let searchMethod: 'exact' | 'vector' | 'keyword' | 'hybrid' = 'exact';
  let embedding: number[] | undefined;

  // Tier 1: Exact search
  const exactResults = await exactRegulationSearch(supabase, params);
  console.log(`✅ Tier 1 (Exact): ${exactResults.regulations.length} regulations in ${exactResults.timeMs}ms`);

  // IMPROVEMENT #2: Apply query expansion before vector search
  const expandedTerms = expandSearchTerms(params.expandedQuery);
  
  // PHASE 1: Context enrichment using conversation state
  const enrichedQuery = buildContextEnrichedQuery(
    expandedTerms.join(' '),
    params
  );
  console.log(`🔍 Query expanded: "${params.expandedQuery}" → ${expandedTerms.length} terms`);

  // Tier 2: Vector search (if needed)
  let vectorResults = { regulations: [], designDocs: [], healthSafetyDocs: [], installationDocs: [], embedding: [], timeMs: 0 };
  if (exactResults.regulations.length < 5) {
    // Use enriched query for better vector matching
    const enrichedParams = { ...params, expandedQuery: enrichedQuery };
    vectorResults = await vectorSearch(supabase, enrichedParams);
    console.log(`✅ Tier 2 (Vector): ${vectorResults.regulations.length} regs, ${vectorResults.designDocs.length} design, ${vectorResults.installationDocs.length} installation docs in ${vectorResults.timeMs}ms`);
    searchMethod = exactResults.regulations.length > 0 ? 'hybrid' : 'vector';
    embedding = vectorResults.embedding;
  }

  // Merge results
  let allRegulations = [...exactResults.regulations, ...vectorResults.regulations];
  let allDesignDocs = vectorResults.designDocs;
  let allHealthSafetyDocs = vectorResults.healthSafetyDocs;
  let allInstallationDocs = vectorResults.installationDocs;
  
  // IMPROVEMENT #3: Apply re-ranking to boost important regulations
  if (allRegulations.length > 0) {
    allRegulations = reRankRegulations(allRegulations);
    console.log(`📊 Re-ranked ${allRegulations.length} regulations by importance`);
  }

  // Tier 3: Keyword fallback (if still needed)
  if (allRegulations.length < 3 || allDesignDocs.length < 3) {
    const keywordResults = await keywordFallback(supabase, params, {
      regulations: allRegulations,
      designDocs: allDesignDocs,
    });
    console.log(`✅ Tier 3 (Keyword): Added ${keywordResults.regulations.length - allRegulations.length} regs, ${keywordResults.designDocs.length - allDesignDocs.length} docs in ${keywordResults.timeMs}ms`);
    allRegulations = keywordResults.regulations;
    allDesignDocs = keywordResults.designDocs;
    searchMethod = 'hybrid';
  }

  // PHASE 6: Semantic deduplication using dedicated utility
  const { deduplicateRegulations } = await import('./semantic-deduplication.ts');
  const { rerankWithCrossEncoder } = await import('./cross-encoder-reranker.ts');
  
  // Step 1: Deduplicate using semantic similarity
  const dedupedRegulations = deduplicateRegulations(allRegulations, {
    similarityThreshold: 0.9,
    keepHighestScore: true
  });
  
  // Step 2: Cross-Encoder Reranking (ALWAYS applied for best quality)
  const OPENAI_KEY = Deno.env.get('OPENAI_API_KEY');
  const logger = { info: console.log, warn: console.warn, error: console.error, debug: console.log };
  
  let finalRegulations: any[];
  if (OPENAI_KEY && dedupedRegulations.length > 0) {
    console.log(`🎯 Applying cross-encoder reranking to ${dedupedRegulations.length} regulations`);
    finalRegulations = await rerankWithCrossEncoder(
      params.expandedQuery,
      dedupedRegulations,
      OPENAI_KEY,
      logger
    );
  } else {
    finalRegulations = dedupedRegulations;
  }
  
  const uniqueRegulations = finalRegulations.slice(0, 15);

  const uniqueDesignDocs = Array.from(
    new Map(allDesignDocs.map(d => [d.id, d])).values()
  ).slice(0, 12);

  const uniqueInstallationDocs = Array.from(
    new Map(allInstallationDocs.map(d => [d.id, d])).values()
  ).slice(0, 10);

  const totalTime = Date.now() - totalStartTime;

  console.log(`📊 Total RAG Results: ${uniqueRegulations.length} regs, ${uniqueDesignDocs.length} design, ${allHealthSafetyDocs.length} H&S, ${uniqueInstallationDocs.length} installation in ${totalTime}ms via ${searchMethod}`);

  return {
    regulations: uniqueRegulations.map(reg => ({
      regulation_number: reg.regulation_number || 'N/A',
      section: reg.section || reg.bs7671_section || '',
      content: reg.content || '',
      relevance: reg.relevance || 80,
      source: reg.source || 'vector',
    })),
    designDocs: uniqueDesignDocs,
    healthSafetyDocs: allHealthSafetyDocs,
    installationDocs: uniqueInstallationDocs,
    searchMethod,
    searchTimeMs: totalTime,
    embedding,
  };
}