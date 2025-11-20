/**
 * LAYER 2: Circuit RAG Result Cache
 * Cache expensive RAG searches (30-45s → <1s on cache hit)
 * Mirrors rams-rag-cache.ts pattern
 * 
 * Cache Structure:
 * - Key: Hash of (query + knowledge_base_type)
 * - TTL: 7 days (knowledge bases rarely change)
 * - Storage: Supabase table `circuit_rag_cache`
 */

import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

export interface RAGCacheResult {
  hit: boolean;
  data?: any[];
  cached_at?: string;
}

/**
 * Generate cache key from query and knowledge base
 */
function generateCacheKey(query: string, kbType: string): string {
  const queryHash = query.toLowerCase().slice(0, 100).replace(/\s+/g, '_');
  return `${kbType}_${queryHash}`;
}

/**
 * Check RAG cache before expensive search
 */
export async function checkRAGCache(params: {
  supabase: SupabaseClient;
  query: string;
  knowledgeBaseType: 'circuit_regulations' | 'installation_practices' | 'bs7671';
}): Promise<RAGCacheResult> {
  
  console.log(`🔍 Checking RAG cache for ${params.knowledgeBaseType}...`);
  
  try {
    const cacheKey = generateCacheKey(params.query, params.knowledgeBaseType);
    
    const { data, error } = await params.supabase
      .from('circuit_rag_cache')
      .select('*')
      .eq('cache_key', cacheKey)
      .eq('knowledge_base_type', params.knowledgeBaseType)
      .gt('expires_at', new Date().toISOString())
      .single();
    
    if (error || !data) {
      console.log(`❌ RAG cache miss for ${params.knowledgeBaseType}`);
      return { hit: false };
    }
    
    // Update hit count
    await params.supabase
      .from('circuit_rag_cache')
      .update({ 
        hit_count: data.hit_count + 1,
        last_used_at: new Date().toISOString()
      })
      .eq('id', data.id);
    
    console.log(`✅ RAG cache HIT for ${params.knowledgeBaseType}! (hits: ${data.hit_count + 1})`);
    
    return { 
      hit: true, 
      data: data.rag_results,
      cached_at: data.created_at
    };
    
  } catch (error) {
    console.error(`❌ RAG cache check failed:`, error);
    return { hit: false };
  }
}

/**
 * Store RAG results in cache
 */
export async function storeRAGCache(params: {
  supabase: SupabaseClient;
  query: string;
  knowledgeBaseType: 'circuit_regulations' | 'installation_practices' | 'bs7671';
  ragResults: any[];
}): Promise<void> {
  
  console.log(`💾 Storing RAG cache for ${params.knowledgeBaseType}...`);
  
  try {
    const cacheKey = generateCacheKey(params.query, params.knowledgeBaseType);
    
    const { error } = await params.supabase
      .from('circuit_rag_cache')
      .insert({
        cache_key: cacheKey,
        knowledge_base_type: params.knowledgeBaseType,
        query_text: params.query.slice(0, 500),
        rag_results: params.ragResults,
        hit_count: 0,
        created_at: new Date().toISOString(),
        last_used_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      });
    
    if (error) {
      console.error(`❌ Failed to cache RAG results:`, error);
      return;
    }
    
    console.log(`✅ RAG results cached for ${params.knowledgeBaseType}`);
    
  } catch (error) {
    console.error(`❌ RAG cache storage failed:`, error);
  }
}
