/**
 * PHASE 2 - LAYER 3: Partial Generation Cache
 * Cache completed agent outputs (H&S or Installer) separately
 * 
 * Benefit: If one agent completes but the other fails/times out,
 *          we can reuse the completed agent's work
 * 
 * Cache Structure:
 * - Key: Hash of (job_description + work_type + job_scale + agent_type)
 * - TTL: 30 days
 * - Storage: Supabase table `rams_partial_cache`
 */

import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { generateEmbedding } from './rams-rag.ts';

export interface PartialCacheResult {
  hit: boolean;
  data?: any;
  cached_at?: string;
  hit_count?: number;
}

/**
 * Check if a specific agent's output is cached
 */
export async function checkPartialCache(params: {
  supabase: SupabaseClient;
  jobDescription: string;
  workType: string;
  jobScale: string;
  agentType: 'health_safety' | 'installer';
  openAiKey: string;
}): Promise<PartialCacheResult> {
  
  console.log(`🔍 Checking partial cache for ${params.agentType} agent...`);
  
  try {
    // Generate embedding for semantic matching
    const embedding = await generateEmbedding(params.jobDescription, params.openAiKey);
    
    // Search for cached agent output with semantic similarity
    const { data, error } = await params.supabase.rpc('match_rams_partial_cache', {
      query_embedding: embedding,
      work_type: params.workType,
      job_scale: params.jobScale,
      agent_type: params.agentType,
      similarity_threshold: 0.88, // Slightly higher than full RAMS cache
      match_count: 1
    });
    
    if (error) {
      console.error(`❌ Partial cache lookup error:`, error);
      return { hit: false };
    }
    
    if (data && data.length > 0) {
      const match = data[0];
      
      // Update hit count
      await params.supabase
        .from('rams_partial_cache')
        .update({ 
          hit_count: match.hit_count + 1,
          last_used_at: new Date().toISOString()
        })
        .eq('id', match.id);
      
      console.log(`✅ Partial cache HIT for ${params.agentType}! (similarity: ${(match.similarity * 100).toFixed(1)}%, hits: ${match.hit_count + 1})`);
      
      return { 
        hit: true, 
        data: match.agent_output,
        cached_at: match.created_at,
        hit_count: match.hit_count + 1
      };
    }
    
    console.log(`❌ Partial cache miss for ${params.agentType}`);
    return { hit: false };
    
  } catch (error) {
    console.error(`❌ Partial cache check failed:`, error);
    return { hit: false };
  }
}

/**
 * Store a completed agent's output in partial cache
 */
export async function storePartialCache(params: {
  supabase: SupabaseClient;
  jobDescription: string;
  workType: string;
  jobScale: string;
  agentType: 'health_safety' | 'installer';
  agentOutput: any;
  openAiKey: string;
}): Promise<void> {
  
  console.log(`💾 Storing partial cache for ${params.agentType} agent...`);
  
  if (!params.agentOutput) {
    console.warn(`⚠️ Partial cache write skipped - no output for ${params.agentType}`);
    return;
  }
  
  try {
    // Generate embedding
    const embedding = await generateEmbedding(params.jobDescription, params.openAiKey);
    
    const { error } = await params.supabase
      .from('rams_partial_cache')
      .insert({
        job_description_embedding: embedding,
        work_type: params.workType,
        job_scale: params.jobScale,
        agent_type: params.agentType,
        agent_output: params.agentOutput,
        hit_count: 0,
        created_at: new Date().toISOString(),
        last_used_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
      });
    
    if (error) {
      console.error(`❌ Failed to cache ${params.agentType} output:`, error);
      return;
    }
    
    console.log(`✅ ${params.agentType} output cached successfully`);
    
  } catch (error) {
    console.error(`❌ Partial cache storage failed:`, error);
  }
}
