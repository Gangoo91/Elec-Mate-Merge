/**
 * Intelligent Hybrid RAG Search
 * 3-Tier Cascade: Exact → Vector → Keyword
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import type { ContextEnvelope, FoundRegulation } from './agent-context.ts';

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

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

  // Tier 2: Vector search (if needed)
  let vectorResults = { regulations: [], designDocs: [], healthSafetyDocs: [], embedding: [], timeMs: 0 };
  if (exactResults.regulations.length < 5) {
    vectorResults = await vectorSearch(supabase, params);
    console.log(`✅ Tier 2 (Vector): ${vectorResults.regulations.length} regs, ${vectorResults.designDocs.length} design docs in ${vectorResults.timeMs}ms`);
    searchMethod = exactResults.regulations.length > 0 ? 'hybrid' : 'vector';
    embedding = vectorResults.embedding;
  }

  // Merge results
  let allRegulations = [...exactResults.regulations, ...vectorResults.regulations];
  let allDesignDocs = vectorResults.designDocs;
  let allHealthSafetyDocs = vectorResults.healthSafetyDocs;

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
