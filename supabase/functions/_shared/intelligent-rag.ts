/**
 * Intelligent Hybrid RAG Search
 * 3-Tier Cascade: Exact → Vector → Keyword
 * UPGRADE: Query expansion + Re-ranking intelligence
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import type { ContextEnvelope, FoundRegulation } from './agent-context.ts';

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

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
 * Tier 2: Vector Search with Re-ranking (300ms)
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

  // Generate new embedding
  const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: params.expandedQuery,
      model: 'text-embedding-3-small',
    }),
  });

  if (!embeddingResponse.ok) {
    throw new Error(`OpenAI embedding failed: ${embeddingResponse.status}`);
  }

  const embeddingData = await embeddingResponse.json();
  const embedding = embeddingData.data[0].embedding;

  return await vectorSearchWithEmbedding(supabase, params, embedding, startTime);
}

async function vectorSearchWithEmbedding(
  supabase: any,
  params: HybridSearchParams,
  embedding: number[],
  startTime: number
): Promise<{ regulations: any[]; designDocs: any[]; healthSafetyDocs: any[]; embedding: number[]; timeMs: number }> {
  
  const priority = params.context?.ragPriority;
  const searches: Promise<any>[] = [];

  // BS 7671 search
  if (!priority || priority.bs7671 > 50) {
    searches.push(
      supabase.rpc('search_bs7671', {
        query_embedding: embedding,
        match_threshold: 0.55,
        match_count: 10,
      })
    );
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
  }

  const results = await Promise.all(searches);

  return {
    regulations: results[0]?.data || [],
    designDocs: results[1]?.data || [],
    healthSafetyDocs: results[2]?.data || [],
    embedding,
    timeMs: Date.now() - startTime,
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
  const enrichedQuery = expandedTerms.join(' ');
  console.log(`🔍 Query expanded: "${params.expandedQuery}" → ${expandedTerms.length} terms`);

  // Tier 2: Vector search (if needed)
  let vectorResults = { regulations: [], designDocs: [], healthSafetyDocs: [], embedding: [], timeMs: 0 };
  if (exactResults.regulations.length < 5) {
    // Use enriched query for better vector matching
    const enrichedParams = { ...params, expandedQuery: enrichedQuery };
    vectorResults = await vectorSearch(supabase, enrichedParams);
    console.log(`✅ Tier 2 (Vector): ${vectorResults.regulations.length} regs, ${vectorResults.designDocs.length} design docs in ${vectorResults.timeMs}ms`);
    searchMethod = exactResults.regulations.length > 0 ? 'hybrid' : 'vector';
    embedding = vectorResults.embedding;
  }

  // Merge results
  let allRegulations = [...exactResults.regulations, ...vectorResults.regulations];
  let allDesignDocs = vectorResults.designDocs;
  let allHealthSafetyDocs = vectorResults.healthSafetyDocs;
  
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

  // Deduplicate and sort
  const uniqueRegulations = Array.from(
    new Map(allRegulations.map(r => [r.regulation_number || r.id, r])).values()
  ).slice(0, 15);

  const uniqueDesignDocs = Array.from(
    new Map(allDesignDocs.map(d => [d.id, d])).values()
  ).slice(0, 12);

  const totalTime = Date.now() - totalStartTime;

  console.log(`📊 Total RAG Results: ${uniqueRegulations.length} regs, ${uniqueDesignDocs.length} design, ${allHealthSafetyDocs.length} H&S in ${totalTime}ms via ${searchMethod}`);

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
    searchMethod,
    searchTimeMs: totalTime,
    embedding,
  };
}