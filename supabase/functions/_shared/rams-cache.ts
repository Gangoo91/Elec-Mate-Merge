/**
 * QUICK WIN #3: Semantic RAMS Cache
 * Cache common scenarios for instant response (<1s)
 * 
 * Impact: ~30% of jobs served from cache (instant)
 */

import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { generateEmbeddingWithRetry } from './v3-core.ts';

export interface RAMSCacheResult {
  hit: boolean;
  data?: {
    rams_data: any;
    method_data: any;
    similarity?: number;
    hit_count?: number;
  };
}

/**
 * Check if a similar RAMS has been generated before
 * Uses semantic search with high threshold (0.95) for near-identical jobs
 */
export async function checkRAMSCache(params: {
  supabase: SupabaseClient;
  jobDescription: string;
  workType: string;
  jobScale: string;
  openAiKey: string;
}): Promise<RAMSCacheResult> {
  
  console.log('🔍 Checking RAMS cache...');
  
  try {
    // Generate embedding for query
    const embedding = await generateEmbeddingWithRetry(params.jobDescription, params.openAiKey);
    
    // Search for similar cached result
    const { data, error } = await params.supabase.rpc('match_rams_cache', {
      query_embedding: embedding,
      work_type: params.workType,
      job_scale: params.jobScale,
      similarity_threshold: 0.95, // Very high threshold (near-identical jobs)
      match_count: 1
    });
    
    if (error) {
      console.error('❌ Cache lookup error:', error);
      return { hit: false };
    }
    
    if (data && data.length > 0) {
      const cacheEntry = data[0];
      
      // Update hit count and last_used_at
      await params.supabase
        .from('rams_semantic_cache')
        .update({ 
          hit_count: cacheEntry.hit_count + 1,
          last_used_at: new Date().toISOString()
        })
        .eq('id', cacheEntry.id);
      
      console.log(`✅ RAMS cache HIT! (similarity: ${(cacheEntry.similarity * 100).toFixed(1)}%, hits: ${cacheEntry.hit_count + 1})`);
      
      return { 
        hit: true, 
        data: {
          rams_data: cacheEntry.rams_data,
          method_data: cacheEntry.method_data,
          similarity: cacheEntry.similarity,
          hit_count: cacheEntry.hit_count + 1
        }
      };
    }
    
    console.log('❌ Cache miss - generating new RAMS');
    return { hit: false };
    
  } catch (error) {
    console.error('❌ Cache check failed:', error);
    return { hit: false }; // Fail gracefully - proceed with generation
  }
}

/**
 * Store a newly generated RAMS in cache for future reuse
 */
export async function storeRAMSCache(params: {
  supabase: SupabaseClient;
  jobDescription: string;
  workType: string;
  jobScale: string;
  ramsData: any;
  methodData: any;
  openAiKey: string;
}): Promise<void> {
  
  console.log('💾 Storing RAMS in cache...');
  
  try {
    // Generate embedding for query
    const embedding = await generateEmbeddingWithRetry(params.jobDescription, params.openAiKey);
    
    // Store in cache
    const { error } = await params.supabase
      .from('rams_semantic_cache')
      .insert({
        job_description_embedding: embedding,
        work_type: params.workType,
        job_scale: params.jobScale,
        rams_data: params.ramsData,
        method_data: params.methodData,
        hit_count: 0,
        created_at: new Date().toISOString(),
        last_used_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
      });
    
    if (error) {
      console.error('❌ Failed to cache RAMS:', error);
      // Don't throw - caching is non-critical
      return;
    }
    
    console.log('✅ RAMS cached successfully');
    
  } catch (error) {
    console.error('❌ Cache storage failed:', error);
    // Don't throw - caching is non-critical
  }
}
