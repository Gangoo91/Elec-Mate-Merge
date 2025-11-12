/**
 * Intelligent Hybrid RAG Search
 * 3-Tier Cascade: Exact → Vector → Keyword
 * UPGRADE: Query expansion + Re-ranking intelligence
 */

import { createClient } from './deps.ts';
import type { ContextEnvelope, FoundRegulation } from './agent-context.ts';

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
function expandSearchTerms(
  query: string,
  installationType?: 'domestic' | 'commercial' | 'industrial'
): string[] {
  const baseExpansion: Record<string, string[]> = {
    'shower': ['electric shower', 'instantaneous water heater', 'high load', 'bathroom heating'],
    'socket': ['power outlet', 'ring main', 'radial circuit', '13A outlet', 'socket outlet'],
    'protection': ['overload', 'short circuit', 'fault protection', 'MCB', 'RCBO', 'RCD'],
    'cable': ['conductor', 'wiring', 'cable sizing', 'current capacity', 'wire'],
    'earth': ['ground', 'earthing', 'protective conductor', 'CPC', 'bonding'],
    'consumer unit': ['CU', 'distribution board', 'DB', 'fuse box', 'consumer board'],
    'lighting': ['light', 'illumination', 'luminaire', 'lamp', 'lighting circuit'],
    'cooker': ['cooking appliance', 'oven', 'hob', 'cooker circuit'],
    'immersion': ['immersion heater', 'water heater', 'hot water']
  };
  
  // Context-specific expansions
  const contextExpansion: Record<string, Record<string, string[]>> = {
    domestic: {
      'socket': ['ring final', '433.1.204', 'rcd protection', '32a'],
      'shower': ['electric shower', 'high load', 'isolator', 'pull cord'],
      'lighting': ['lighting circuit', '3% voltage drop', '6a mcb'],
      'ring': ['ring final', 'ring circuit', 'ring main', 'parallel paths', 'divide by 4', '÷4'],
      'cpc': ['protective conductor', 'earth conductor', 'table 54.7', 'cpc sizing'],
      'voltage drop': ['volt drop', 'VD', 'voltage loss', 'cable sizing', 'mV/A/m', 'appendix 4'],
      'zs': ['earth fault loop', 'fault loop impedance', 'r1+r2', 'max zs'],
      'calculation': ['formula', 'method', 'design', 'sizing', 'appendix']
    },
    commercial: {
      'socket': ['radial circuit', 'diversity', 'three-phase'],
      'lighting': ['emergency lighting', 'maintained', 'non-maintained', '560.'],
      'fire': ['fire alarm', 'fire detection', '560.7'],
      'emergency': ['emergency lighting', 'safety lighting', 'escape route'],
      'diversity': ['maximum demand', 'load assessment', 'diversity factors']
    },
    industrial: {
      'motor': ['motor circuit', '552.', 'dol starter', 'soft start'],
      'socket': ['industrial socket', 'bs en 60309', '553.1.6'],
      'power': ['high power', 'busbar', 'distribution', 'harmonics'],
      'three-phase': ['3-phase', '400v', 'line voltage', 'balanced load'],
      'harmonics': ['harmonic distortion', 'power factor', 'thd']
    }
  };
  
  const type = installationType || 'domestic';
  const relevantExpansion = { ...baseExpansion, ...contextExpansion[type] };
  
  const terms = query.toLowerCase().split(/\s+/);
  const expanded = new Set(terms);
  
  // Add exact query
  expanded.add(query.toLowerCase());
  
  // Expand with synonyms
  terms.forEach(term => {
    Object.entries(relevantExpansion).forEach(([key, values]) => {
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
function applyContextualBoosts(
  regulations: any[], 
  installationType: 'domestic' | 'commercial' | 'industrial'
): any[] {
  
  return regulations.map(reg => {
    let boostScore = 1.0;
    const regNumber = reg.regulation_number?.toLowerCase() || '';
    const content = reg.content?.toLowerCase() || '';
    const topic = reg.topic?.toLowerCase() || '';
    
    // BASE BOOSTS (apply to all installation types)
    if (regNumber.includes('appendix 4') || content.includes('mv/a/m')) {
      boostScore *= 1.38; // Voltage drop tables needed everywhere
    }
    
    // DOMESTIC-SPECIFIC BOOSTS
    if (installationType === 'domestic') {
      if (regNumber.includes('433.1.204') || content.includes('ring final')) {
        boostScore *= 1.50;
      }
      if (regNumber.includes('appendix 15') || topic.includes('ring final')) {
        boostScore *= 1.55;
      }
      if (regNumber.includes('54.7') || content.includes('table 54.7')) {
        boostScore *= 1.45;
      }
      if (regNumber.includes('411.3.3') || content.includes('socket-outlet')) {
        boostScore *= 1.40;
      }
      if (regNumber.includes('701.') || regNumber.includes('702.')) {
        boostScore *= 1.35;
      }
    }
    
    // COMMERCIAL-SPECIFIC BOOSTS
    if (installationType === 'commercial') {
      if (regNumber.includes('560.') || content.includes('emergency lighting')) {
        boostScore *= 1.50;
      }
      if (regNumber.includes('560.7') || content.includes('fire alarm')) {
        boostScore *= 1.48;
      }
      if (content.includes('diversity') || topic.includes('demand')) {
        boostScore *= 1.42;
      }
      if (content.includes('three-phase') || content.includes('3-phase')) {
        boostScore *= 1.38;
      }
      if (content.includes('discrimination') || content.includes('selectivity')) {
        boostScore *= 1.35;
      }
    }
    
    // INDUSTRIAL-SPECIFIC BOOSTS
    if (installationType === 'industrial') {
      if (regNumber.includes('552.') || content.includes('motor')) {
        boostScore *= 1.55;
      }
      if (content.includes('busbar') || content.includes('high power')) {
        boostScore *= 1.50;
      }
      if (regNumber.includes('553.1.6') || content.includes('industrial socket')) {
        boostScore *= 1.48;
      }
      if (content.includes('three-phase') || content.includes('400v')) {
        boostScore *= 1.45;
      }
      if (content.includes('harmonic') || content.includes('power factor')) {
        boostScore *= 1.40;
      }
      if (content.includes('ip rating') || content.includes('ingress protection')) {
        boostScore *= 1.38;
      }
    }
    
    // Content-based boosts for design knowledge
    if (content.includes('÷ 4') || content.includes('divide by 4')) boostScore *= 1.50;
    if (content.includes('ring final') && content.includes('calculation')) boostScore *= 1.45;
    if (content.includes('table 54.7') || topic.includes('cpc')) boostScore *= 1.40;
    if (content.includes('mv/a/m') || content.includes('voltage drop table')) boostScore *= 1.38;
    if (content.includes('zs =') || content.includes('r1+r2')) boostScore *= 1.35;
    
    // Amendment 3 boost
    if (reg.amendment?.includes('A3:2024') || reg.amendment?.includes('Amendment 3')) {
      boostScore *= 1.3;
    }
    
    // Protective regulations
    if (reg.regulation_number?.match(/^(41|43)/)) {
      boostScore *= 1.25;
    }
    
    // Voltage drop regulations
    if (reg.regulation_number?.includes('525')) {
      boostScore *= 1.2;
    }
    
    // Earthing and bonding
    if (reg.regulation_number?.match(/^54/)) {
      boostScore *= 1.15;
    }
    
    // RCD protection
    if (reg.content?.toLowerCase().includes('rcd') || reg.regulation_number?.includes('531')) {
      boostScore *= 1.15;
    }
    
    // Special locations
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
  installationType?: 'domestic' | 'commercial' | 'industrial';
}

export interface HybridSearchResult {
  regulations: FoundRegulation[];
  designDocs: any[];
  healthSafetyDocs: any[];
  installationDocs: any[];
  maintenanceDocs: any[];
  practicalWorkDocs: any[]; // Practical Work Intelligence
  gn3InspectionDocs: any[]; // NEW - GN3 Inspection & Testing knowledge
  searchMethod: 'exact' | 'vector' | 'keyword' | 'hybrid' | 'cached';
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
  openAiKey: string,
  skipIfFound: number = 3
): Promise<{ regulations: any[]; designDocs: any[]; healthSafetyDocs: any[]; installationDocs: any[]; maintenanceDocs: any[]; embedding: number[]; timeMs: number }> {
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
        openAiKey,
        startTime
      );
    }
  }

  // CONDITIONAL EMBEDDING: Only generate if vector search needed
  const priority = params.context?.ragPriority;
  const skipEmbedding = params.context?.skipEmbedding === true;
  
  // Check if ANY search requires vector embeddings
  const needsEmbedding = !skipEmbedding && (
    (!priority || priority.health_safety > 50) ||  // health_safety needs vector
    (!priority || priority.design > 50) ||         // design needs vector
    (!priority || priority.installation >= 50) ||  // installation needs vector
    (!priority || priority.inspection > 50) ||     // inspection needs vector (GN3)
    (!priority || priority.practical_work > 50)    // practical_work may need vector
  );

  let embedding: number[] | null = null;

  if (needsEmbedding) {
    console.log('🔄 Generating embedding for vector searches...');
    const [embeddingData, _] = await Promise.all([
      // Embedding generation (200ms)
      fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: params.expandedQuery,
          model: 'text-embedding-3-small', // 1536D to match database schema
        }),
      }).then(res => {
        if (!res.ok) throw new Error(`OpenAI embedding failed: ${res.status}`);
        return res.json();
      }),
      
      // Keyword extraction preparation (50ms) - runs in parallel
      Promise.resolve(expandSearchTerms(params.expandedQuery, params.installationType))
    ]);

    embedding = embeddingData.data[0].embedding;
  } else {
    console.log('⚡ Skipping embedding - all searches use keyword-only');
  }

  return await vectorSearchWithEmbedding(supabase, params, embedding, openAiKey, startTime);
}

async function vectorSearchWithEmbedding(
  supabase: any,
  params: HybridSearchParams,
  embedding: number[] | null,
  openAiKey: string,
  startTime: number
): Promise<{ regulations: any[]; designDocs: any[]; healthSafetyDocs: any[]; installationDocs: any[]; maintenanceDocs: any[]; embedding?: number[]; timeMs: number }> {
  
  const priority = params.context?.ragPriority;
  
  // PHASE 4: Detect "why" questions for explanation retrieval
  const { detectWhyQuestion } = await import('./query-decomposer.ts');
  const whyAnalysis = detectWhyQuestion(params.expandedQuery);
  
  // PHASE 5: Build all search promises upfront for parallel execution
  const searches: Promise<any>[] = [];
  const searchTypes: string[] = [];
  
  // ============= PHASE 5: DYNAMIC MATCH COUNT OPTIMIZATION =============
  // Calculate query specificity and circuit count to optimize retrieval
  const { calculateQuerySpecificity, parseQueryEntities } = await import('./query-parser.ts');
  const entities = parseQueryEntities(params.expandedQuery);
  const specificity = calculateQuerySpecificity(entities);
  
  // Extract circuit count from search terms or context
  const circuitCountMatch = params.expandedQuery.match(/(\d+)\s*(circuit|circuits)/i);
  const circuitCount = circuitCountMatch ? parseInt(circuitCountMatch[1]) : 
                       (params.searchTerms?.length > 5 ? params.searchTerms.length : 5);
  
  // Dynamic match count based on specificity AND circuit count
  let designMatchCount = 15;
  let regulationMatchCount = 18;
  
  if (circuitCount <= 3 && specificity > 70) {
    // High specificity, few circuits: minimal docs needed
    designMatchCount = 6;
    regulationMatchCount = 8;
  } else if (circuitCount <= 8 && specificity > 40) {
    // Medium complexity: moderate docs
    designMatchCount = 10;
    regulationMatchCount = 12;
  } else {
    // Complex multi-circuit design: more docs needed
    designMatchCount = 15;
    regulationMatchCount = 18;
  }
  
  console.log(`📊 Query specificity: ${specificity}%, circuits: ${circuitCount} → design: ${designMatchCount}, regs: ${regulationMatchCount}`);
  
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

  // ============= PHASE 1: PARALLEL RAG EXECUTION =============
  // Execute ALL searches in parallel using Promise.all() - 50% faster
  // Design, BS7671, Health&Safety, Installation all run concurrently
  
  // PRIORITY 1: Design knowledge search (requires embedding) - SEARCH FIRST
  if (embedding && (!priority || priority.design > 50)) {
    searches.push(
      supabase.rpc('search_design_knowledge', {
        query_embedding: embedding,
        match_threshold: 0.50,
        match_count: designMatchCount, // PHASE 5: Dynamic based on query complexity
      })
    );
    searchTypes.push('design');
  }

  // PRIORITY 2: BS 7671 regulations - Keyword search at 85% priority
  if (!priority || priority.bs7671 > 50) {
    searches.push(
      supabase
        .from('regulations_intelligence')
        .select('*')
        .textSearch('fts', params.expandedQuery, { 
          type: 'websearch',
          config: 'english'
        })
        .limit(regulationMatchCount) // PHASE 5: Dynamic based on query complexity
        .then((result: any) => {
          if (result?.data) {
            // Apply 85% base score to keyword search results
            const withScores = result.data.map((reg: any) => ({
              ...reg,
              hybrid_score: 0.85, // 85% base score for keyword search
              search_method: 'keyword'
            }));
            return { data: withScores, error: null };
          }
          return result;
        })
    );
    searchTypes.push('bs7671');
  }

  // Health & Safety search (requires embedding)
  if (embedding && (!priority || priority.health_safety > 50)) {
    searches.push(
      supabase.rpc('search_health_safety', {
        query_embedding: embedding,
        scale_filter: null,
        source_filter: null,
        match_threshold: 0.50,
        match_count: 10, // Kept at 10 (critical for safety)
      })
    );
    searchTypes.push('health_safety');
  }

  // PRIORITY 0: GN3 Inspection & Testing (PRIMARY for commissioning)
  if (!priority || priority.inspection > 50) {
    if (embedding) {
      // Vector + Hybrid search (PREFERRED)
      console.log('✅ GN3 hybrid search (vector + keyword)');
      searches.push(
        supabase.rpc('search_inspection_testing_hybrid', {
          query_text: `${params.expandedQuery} GN3 testing procedures instrument setup`,
          query_embedding: embedding,
          match_count: 15
        }).then((result: any) => {
          console.log('🔍 RAW GN3 RPC response:', {
            hasData: !!result?.data,
            count: result?.data?.length || 0,
            hasError: !!result?.error,
            errorMsg: result?.error?.message || result?.error
          });
          
          if (result?.data) {
            return { data: result.data.map((doc: any) => ({
              ...doc,
              source_table: 'inspection_testing_knowledge',
              hybrid_score: doc.hybrid_score || doc.similarity || 0.90,
              search_method: 'hybrid'
            })), error: null };
          }
          return result;
        })
      );
      searchTypes.push('gn3_inspection');
    } else {
      // Keyword-only fallback (when no embedding)
      console.log('⚠️ GN3 keyword-only fallback (no embedding)');
      searches.push(
        supabase
          .from('inspection_testing_knowledge')
          .select('*')
          .textSearch('fts', `${params.expandedQuery} testing procedure instrument`, {
            type: 'websearch',
            config: 'english'
          })
          .limit(12)
          .then((result: any) => {
            if (result?.data) {
              return { data: result.data.map((doc: any) => ({
                ...doc,
                source_table: 'inspection_testing_knowledge',
                hybrid_score: 0.80, // 80% score for keyword-only
                search_method: 'keyword'
              })), error: null };
            }
            return result;
          })
      );
      searchTypes.push('gn3_inspection');
    }
  }

  // PRACTICAL WORK INTELLIGENCE - PHASE 1.2: Use cached batch search
  if (!priority || priority.practical_work > 50) {
    console.log('✅ Practical work search triggered:', {
      priority: priority?.practical_work || 'default',
      agentType: params.context?.agentType,
      keywordsCount: params.searchTerms.length
    });
    
    // PHASE 1.2: Import batch loader with caching
    const { searchPracticalWorkBatch } = await import('./rag-batch-loader.ts');
    
    searches.push(
      searchPracticalWorkBatch(supabase, {
        keywords: params.searchTerms,
        limit: 15,
        activity_filter: params.context?.agentType ? [params.context.agentType] : undefined
      }).then(results => {
        console.log('🔍 RAW Practical Work RPC response:', {
          count: results?.length || 0,
          sampleTopic: results?.[0]?.primary_topic || 'N/A',
          hasHybridScore: !!results?.[0]?.hybrid_score
        });
        return { data: results, error: null };
      })
    );
    searchTypes.push('practical_work');
  } else {
    console.warn('⚠️ Practical work search SKIPPED:', {
      priorityPracticalWork: priority?.practical_work,
      reason: 'Priority too low'
    });
  }

  // PHASE 3: Installation knowledge search - skip if low priority or no embedding
  if (embedding && (!priority || priority.installation >= 50)) {
    searches.push(
      supabase.rpc('search_installation_knowledge', {
        query_embedding: embedding,
        method_filter: params.context?.entities?.installMethod || null,
        match_threshold: 0.50,
        match_count: 7, // Reduced from 8
      })
    );
    searchTypes.push('installation');
  } else {
    console.log('⏭️ Skipping installation search (low priority or no embedding)');
  }

  // PHASE 4: Maintenance knowledge search - skip entirely (not needed for RAMS)
  console.log('⏭️ Skipping maintenance search (not needed for H&S RAMS)');
  // Removed maintenance search to reduce token usage
  
  // ============= PHASE 1: EXECUTE ALL SEARCHES IN PARALLEL =============
  console.log(`🚀 Executing ${searches.length} RAG searches in parallel...`);

  const parallelStartTime = Date.now();
  
  // IMPROVEMENT: Proactive Error Recovery - Execute ALL searches in parallel with retry logic
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
    
    // 🔍 DEBUG: Log each search result
    if (type === 'gn3_inspection' || type === 'practical_work') {
      console.log(`🔍 RAG DEBUG [${type}]:`, {
        hasData: !!result?.data,
        count: result?.data?.length || 0,
        hasError: !!result?.error,
        error: result?.error,
        sampleTopic: result?.data?.[0]?.topic || result?.data?.[0]?.primary_topic || 'N/A'
      });
    }
    
    if (result?.error) {
      console.warn(`Search ${type} failed: ${result.error}`);
    }
  });

  // Transform Practical Work results to include hybrid_score normalization
  if (resultMap.practical_work && resultMap.practical_work.length > 0) {
    resultMap.practical_work = resultMap.practical_work.map((pw: any) => ({
      ...pw,
      similarity: pw.hybrid_score ? pw.hybrid_score / 10 : 0 // Normalize to 0-1
    }));
  }

  // IMPROVEMENT: Ensure minimum quality threshold
  const totalResults = (resultMap.bs7671?.length || 0) + 
                      (resultMap.design?.length || 0) + 
                      (resultMap.installation?.length || 0) + 
                      (resultMap.health_safety?.length || 0) +
                      (resultMap.maintenance?.length || 0);
  
  const hasMinimumResults = totalResults >= 3;
  
  if (!hasMinimumResults && failedSearches === 0) {
    console.warn('⚠️ Low quality RAG results - fewer than minimum threshold');
  }

  // PHASE 4: Conditional Cross-Encoder (skip if high confidence)
  const bs7671Results = resultMap.bs7671 || [];
  if (bs7671Results.length > 0) {
    const topResultConfidence = bs7671Results[0]?.hybrid_score || 0;
    const searchMethod = bs7671Results[0]?.search_method || 'hybrid';
    
    // Only run cross-encoder if confidence is below threshold
    if (topResultConfidence > 0.75 || searchMethod === 'exact') {
      console.log('⚡ Skipping cross-encoder (high confidence)', { 
        topResultConfidence, 
        searchMethod 
      });
      
      // Assign final scores without reranking
      resultMap.bs7671 = bs7671Results.map((reg: any, idx: number) => ({
        ...reg,
        crossEncoderScore: topResultConfidence,
        finalScore: reg.hybrid_score,
        rank: idx + 1
      }));
    } else if (openAiKey) {
      // Only rerank if we have API key
      console.log('🔍 Running cross-encoder reranking');
      const { rerankWithCrossEncoder } = await import('./cross-encoder-reranker.ts');
      const logger = { info: console.log, warn: console.warn, error: console.error, debug: console.debug };
      
      try {
        resultMap.bs7671 = await rerankWithCrossEncoder(
          query,
          bs7671Results,
          openAiKey,
          logger
        );
      } catch (error) {
        console.warn('Cross-encoder failed, using hybrid scores', { error });
        resultMap.bs7671 = bs7671Results;
      }
    }
  }

  // Apply contextual boosts to all results
  const boostedRegs = applyContextualBoosts(resultMap.bs7671 || [], params.installationType || 'domestic');
  const boostedDesign = applyContextualBoosts(resultMap.design || [], params.installationType || 'domestic');

  return {
    regulations: boostedRegs,
    designDocs: boostedDesign,
    healthSafetyDocs: resultMap.health_safety || [],
    installationDocs: resultMap.installation || [],
    maintenanceDocs: resultMap.maintenance || [],
    practicalWorkDocs: resultMap.practical_work || [],
    gn3InspectionDocs: resultMap.gn3_inspection || [], // NEW - GN3 data
    embedding: embedding || undefined,
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
 * PHASE 7C: Added RAG result caching for 3x faster repeat queries
 */
export async function intelligentRAGSearch(
  params: HybridSearchParams,
  openAiKey: string,
  supabase: any,
  logger: any
): Promise<HybridSearchResult> {
  // Supabase and logger are now passed as parameters

  // 🆕 PHASE 7C: Check RAG cache FIRST
  const { getCachedQuery, cacheQuery, hashQuery } = await import('./query-cache.ts');
  const cacheKey = hashQuery(params.expandedQuery, {
    circuitType: params.circuitType,
    powerRating: params.powerRating
  });
  
  const cachedResult = await getCachedQuery(supabase, cacheKey);
  
  if (cachedResult && cachedResult.regulations) {
    console.log('⚡ RAG cache HIT - instant retrieval', {
      cacheKey,
      regulations: cachedResult.regulations.length,
      age: Date.now() - cachedResult.timestamp
    });
    
    return {
      regulations: cachedResult.regulations,
      designDocs: cachedResult.structured_data?.designDocs || [],
      healthSafetyDocs: cachedResult.structured_data?.healthSafetyDocs || [],
      installationDocs: cachedResult.structured_data?.installationDocs || [],
      maintenanceDocs: cachedResult.structured_data?.maintenanceDocs || [],
      practicalWorkDocs: cachedResult.structured_data?.practicalWorkDocs || [],
      gn3InspectionDocs: cachedResult.structured_data?.gn3InspectionDocs || [],
      searchMethod: 'cached' as any,
      searchTimeMs: 0,
      embedding: cachedResult.structured_data?.embedding
    };
  }
  
  console.log('❌ RAG cache MISS - performing full search');

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
  let vectorResults = { 
    regulations: [], 
    designDocs: [], 
    healthSafetyDocs: [], 
    installationDocs: [], 
    maintenanceDocs: [], 
    practicalWorkDocs: [], 
    gn3InspectionDocs: [], 
    embedding: [], 
    timeMs: 0 
  };
  if (exactResults.regulations.length < 5) {
    // Use enriched query for better vector matching
    const enrichedParams = { ...params, expandedQuery: enrichedQuery };
    vectorResults = await vectorSearch(supabase, enrichedParams, openAiKey);
    
    // 🔍 DEBUG: Log what vectorSearch returned
    console.log(`✅ Tier 2 (Vector): ${vectorResults.regulations.length} regs, ${vectorResults.designDocs.length} design, ${vectorResults.installationDocs.length} installation, ${vectorResults.maintenanceDocs.length} maintenance, ${vectorResults.practicalWorkDocs?.length || 0} practical work, ${vectorResults.gn3InspectionDocs?.length || 0} GN3 docs in ${vectorResults.timeMs}ms`);
    
    searchMethod = exactResults.regulations.length > 0 ? 'hybrid' : 'vector';
    embedding = vectorResults.embedding;
  }

  // PHASE 2: Merge and fuse ALL results for unified re-ranking
  const allResults = [
    ...exactResults.regulations.map(r => ({ ...r, source: 'regulation', sourceType: 'exact', baseScore: r.relevance || 100 })),
    ...vectorResults.regulations.map(r => ({ ...r, source: 'regulation', sourceType: 'vector', baseScore: r.similarity || 0.7 })),
    ...vectorResults.designDocs.map(d => ({ ...d, source: 'design', sourceType: 'vector', baseScore: (d.similarity || 0.7) * 1.95 })), // +95% for design knowledge (PRIORITY 1)
    ...vectorResults.healthSafetyDocs.map(h => ({ ...h, source: 'health_safety', sourceType: 'vector', baseScore: h.similarity || 0.7 })),
    ...vectorResults.installationDocs.map(i => ({ ...i, source: 'installation', sourceType: 'vector', baseScore: i.similarity || 0.7 })),
    ...vectorResults.maintenanceDocs.map(m => ({ ...m, source: 'maintenance', sourceType: 'vector', baseScore: m.similarity || 0.7 })),
  ];
  
  // PHASE 2: Apply content-based boosts across ALL sources
  const reranked = allResults.map(result => {
    let boostScore = result.baseScore;
    const content = (result.content || '').toLowerCase();
    const topic = (result.topic || result.regulation_number || '').toLowerCase();
    
    // CRITICAL BOOSTS for calculation guidance
    if (content.includes('÷ 4') || content.includes('divide by 4')) boostScore *= 1.50;
    if (content.includes('ring final') && content.includes('calculation')) boostScore *= 1.45;
    if (content.includes('table 54.7') || topic.includes('cpc')) boostScore *= 1.40;
    if (content.includes('mv/a/m') || content.includes('voltage drop table')) boostScore *= 1.38;
    if (content.includes('zs =') || content.includes('r1+r2')) boostScore *= 1.35;
    
    return { ...result, finalScore: boostScore };
  }).sort((a, b) => b.finalScore - a.finalScore);
  
  // Separate back into typed arrays - DESIGN DOCS DOMINATE TOP 10
  let allRegulations = reranked.filter(r => r.source === 'regulation');
  let allDesignDocs = reranked.filter(r => r.source === 'design');
  let allHealthSafetyDocs = reranked.filter(r => r.source === 'health_safety');
  let allInstallationDocs = reranked.filter(r => r.source === 'installation');
  let allMaintenanceDocs = reranked.filter(r => r.source === 'maintenance');
  
  // PRIORITY FUSION: Ensure design docs dominate top results
  const topDesignDocs = allDesignDocs.slice(0, 10);
  const topRegulations = allRegulations.slice(0, 10);
  const merged = [...topDesignDocs, ...topRegulations].sort((a, b) => b.finalScore - a.finalScore);
  
  // Reassign to ensure design-first ordering
  allDesignDocs = merged.filter(r => r.source === 'design');
  allRegulations = merged.filter(r => r.source === 'regulation');

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
  const logger2 = { info: console.log, warn: console.warn, error: console.error, debug: console.log };
  
  let finalRegulations: any[];
  if (openAiKey && dedupedRegulations.length > 0) {
    console.log(`🎯 Applying cross-encoder reranking to ${dedupedRegulations.length} regulations`);
    finalRegulations = await rerankWithCrossEncoder(
      params.expandedQuery,
      dedupedRegulations,
      openAiKey,
      logger2
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

  const uniqueMaintenanceDocs = Array.from(
    new Map(allMaintenanceDocs.map(d => [d.id, d])).values()
  ).slice(0, 8);

  const totalTime = Date.now() - totalStartTime;

  console.log(`📊 Total RAG Results (DESIGN-FIRST): ${uniqueDesignDocs.length} design (PRIORITY 1), ${uniqueRegulations.length} regs (PRIORITY 2), ${allHealthSafetyDocs.length} H&S, ${uniqueInstallationDocs.length} installation, ${uniqueMaintenanceDocs.length} maintenance in ${totalTime}ms via ${searchMethod}`);

  // 🔍 Extract practical work and GN3 docs from vectorResults
  const practicalWorkDocs = vectorResults.practicalWorkDocs || [];
  const gn3InspectionDocs = vectorResults.gn3InspectionDocs || [];
  
  console.log(`📦 Final RAG package includes: ${practicalWorkDocs.length} practical work docs, ${gn3InspectionDocs.length} GN3 docs`);
  
  const finalResult = {
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
    maintenanceDocs: uniqueMaintenanceDocs,
    practicalWorkDocs: practicalWorkDocs,
    gn3InspectionDocs: gn3InspectionDocs,
    searchMethod,
    searchTimeMs: totalTime,
    embedding,
  };
  
  // 🆕 PHASE 7C: Store result in cache for future queries
  await cacheQuery(supabase, {
    queryHash: cacheKey,
    regulations: finalResult.regulations,
    response: '', // Will be filled by caller
    structuredData: {
      designDocs: finalResult.designDocs,
      healthSafetyDocs: finalResult.healthSafetyDocs,
      installationDocs: finalResult.installationDocs,
      maintenanceDocs: finalResult.maintenanceDocs,
      practicalWorkDocs: finalResult.practicalWorkDocs,
      gn3InspectionDocs: finalResult.gn3InspectionDocs,
      embedding: finalResult.embedding
    },
    enrichment: {},
    citations: [],
    rendering: {},
    timestamp: Date.now()
  });
  
  console.log('💾 RAG results cached for future queries');
  
  return finalResult;
}