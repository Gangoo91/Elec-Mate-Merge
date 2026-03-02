/**
 * RAG Knowledge tools — lookup_regulation, lookup_practical_method, lookup_health_safety,
 *                       lookup_pricing_guidance, lookup_design_guidance, lookup_training_content
 *
 * These tools query verified Supabase knowledge bases to give accurate, referenced answers.
 * The agent MUST use these for electrical content rather than relying on its own training data.
 *
 * Each tool tries Supabase RPC first (semantic search), then falls back to edge function.
 */

import type { UserContext } from '../auth.js';
import { callEdgeFunction } from '../lib/edge-function.js';

export async function lookupRegulation(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.query !== 'string' || args.query.trim().length === 0) {
    throw new Error('Search query is required');
  }

  const result = await callEdgeFunction('bs7671-rag-search', user.jwt, {
    query: args.query.trim(),
    match_threshold: typeof args.match_threshold === 'number' ? args.match_threshold : 0.7,
    match_count:
      typeof args.match_count === 'number' && args.match_count > 0
        ? Math.min(args.match_count, 20)
        : 5,
  });

  if (result.error) throw new Error(result.error);
  return result.data;
}

export async function lookupPracticalMethod(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.query !== 'string' || args.query.trim().length === 0) {
    throw new Error('Search query is required');
  }

  // search_practical_work_fast — GIN keyword search, <1s (vs 2-5s vector)
  const supabase = user.supabase;
  const { data, error } = await supabase.rpc('search_practical_work_fast', {
    search_query: args.query.trim(),
    result_limit: 5,
    category_filter: typeof args.category === 'string' ? args.category : null,
  });

  if (error) {
    // Fall back to edge function if RPC not available
    const result = await callEdgeFunction('multi-source-rag-search', user.jwt, {
      query: args.query.trim(),
      sources: ['practical_work_intelligence'],
      category: typeof args.category === 'string' ? args.category : undefined,
    });
    if (result.error) throw new Error(result.error);
    return result.data;
  }

  return { results: data || [] };
}

export async function lookupHealthSafety(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.query !== 'string' || args.query.trim().length === 0) {
    throw new Error('Search query is required');
  }

  // search_health_safety_hybrid — fast hybrid search
  const supabase = user.supabase;
  const { data, error } = await supabase.rpc('search_health_safety_hybrid', {
    search_query: args.query.trim(),
    result_limit: 5,
  });

  if (error) {
    const result = await callEdgeFunction('multi-source-rag-search', user.jwt, {
      query: args.query.trim(),
      sources: ['health_safety_intelligence', 'safety_knowledge'],
    });
    if (result.error) throw new Error(result.error);
    return result.data;
  }

  return { results: data || [] };
}

export async function lookupPricingGuidance(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.query !== 'string' || args.query.trim().length === 0) {
    throw new Error('Search query is required');
  }

  // Use search-pricing-rag edge function for pricing lookups
  const result = await callEdgeFunction('search-pricing-rag', user.jwt, {
    query: args.query.trim(),
    region: typeof args.region === 'string' ? args.region : undefined,
    match_count: 5,
  });

  if (result.error) throw new Error(result.error);
  return result.data;
}

export async function lookupDesignGuidance(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.query !== 'string' || args.query.trim().length === 0) {
    throw new Error('Search query is required');
  }

  // search_design_knowledge_intelligence_hybrid — <200ms hybrid search
  const supabase = user.supabase;
  const { data, error } = await supabase.rpc('search_design_knowledge_intelligence_hybrid', {
    search_query: args.query.trim(),
    result_limit: 5,
  });

  if (error) {
    const result = await callEdgeFunction('multi-source-rag-search', user.jwt, {
      query: args.query.trim(),
      sources: ['design_knowledge'],
    });
    if (result.error) throw new Error(result.error);
    return result.data;
  }

  return { results: data || [] };
}

export async function lookupTrainingContent(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.query !== 'string' || args.query.trim().length === 0) {
    throw new Error('Search query is required');
  }

  const supabase = user.supabase;
  const { data, error } = await supabase.rpc('match_training_content', {
    query_text: args.query.trim(),
    match_threshold: 0.7,
    match_count: 5,
    filter_level: typeof args.level === 'string' ? args.level : null,
  });

  if (error) {
    const result = await callEdgeFunction('multi-source-rag-search', user.jwt, {
      query: args.query.trim(),
      sources: ['training_content'],
      level: typeof args.level === 'string' ? args.level : undefined,
    });
    if (result.error) throw new Error(result.error);
    return result.data;
  }

  return { results: data || [] };
}
