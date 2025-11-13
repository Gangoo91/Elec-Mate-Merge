/**
 * Handle semantic cache operations
 */

import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { checkRAMSCache, storeRAMSCache } from '../../_shared/rams-cache.ts';

export async function checkCache(
  supabase: SupabaseClient,
  jobId: string,
  job: any,
  openAiKey: string
) {
  console.log('🔍 Checking semantic cache...');
  
  const cacheResult = await checkRAMSCache({
    supabase,
    jobDescription: job.job_description,
    workType: job.job_scale,
    jobScale: job.job_scale,
    openAiKey
  });
  
  if (cacheResult.hit && cacheResult.data) {
    console.log('🎉 Cache HIT - serving instant result');
    
    await supabase
      .from('rams_generation_jobs')
      .update({
        status: 'complete',
        progress: 100,
        current_step: 'Completed (served from cache)',
        rams_data: cacheResult.data.rams_data,
        method_data: cacheResult.data.method_data,
        completed_at: new Date().toISOString(),
        generation_metadata: { 
          cache_hit: true,
          similarity: cacheResult.data.similarity,
          cache_hit_count: cacheResult.data.hit_count
        }
      })
      .eq('id', jobId);
    
    return {
      hit: true,
      similarity: cacheResult.data.similarity
    };
  }
  
  console.log('❌ Cache miss - proceeding with full generation');
  return { hit: false };
}

export async function storeCacheIfValid(
  supabase: SupabaseClient,
  job: any,
  ramsData: any,
  methodData: any,
  openAiKey: string
) {
  // Only cache if both outputs are valid and complete
  if (ramsData && methodData) {
    console.log('💾 Storing result in semantic cache...');
    await storeRAMSCache({
      supabase,
      jobDescription: job.job_description,
      workType: job.job_scale,
      jobScale: job.job_scale,
      ramsData,
      methodData,
      openAiKey
    });
  } else {
    console.warn('⚠️ Skipping cache write - incomplete data');
  }
}
