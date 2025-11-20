/**
 * LAYER 1: Full Circuit Design Cache
 * Cache complete circuit + installation designs for instant retrieval
 * Mirrors rams-cache.ts pattern
 * 
 * Cache Structure:
 * - Key: Semantic hash of job inputs + OpenAI key
 * - TTL: 30 days
 * - Storage: Supabase table `circuit_design_cache_v4`
 */

import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

export interface FullCacheResult {
  hit: boolean;
  data?: any;
  similarity?: number;
  ageSeconds?: number;
}

/**
 * Generate semantic cache key
 */
async function generateCacheKey(jobInputs: any, openAiKey: string): Promise<string> {
  const normalized = {
    circuits: jobInputs.circuits?.map((c: any) => ({
      loadType: c.loadType,
      loadPower: Math.round(c.loadPower / 100) * 100,
      cableLength: Math.round(c.cableLength / 5) * 5,
      phases: c.phases
    })).sort((a: any, b: any) => a.loadPower - b.loadPower) || [],
    supply: {
      voltage: jobInputs.supply?.voltage || 230,
      phases: jobInputs.supply?.phases || 'single',
      ze: Math.round((jobInputs.supply?.ze || 0.35) * 100) / 100,
      earthing: jobInputs.supply?.earthingSystem || 'TN-C-S'
    }
  };
  
  const hash = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(JSON.stringify(normalized) + openAiKey)
  );
  
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 32);
}

/**
 * Check full design cache
 */
export async function checkCircuitDesignCache(params: {
  supabase: SupabaseClient;
  jobInputs: any;
  openAiKey: string;
}): Promise<FullCacheResult> {
  
  console.log('🔍 Checking full circuit design cache...');
  
  try {
    const cacheKey = await generateCacheKey(params.jobInputs, params.openAiKey);
    
    const { data, error } = await params.supabase
      .from('circuit_design_cache_v4')
      .select('*')
      .eq('cache_key', cacheKey)
      .gt('expires_at', new Date().toISOString())
      .single();
    
    if (error || !data) {
      console.log('❌ Full design cache miss');
      return { hit: false };
    }
    
    // Update hit count
    await params.supabase
      .from('circuit_design_cache_v4')
      .update({ 
        hit_count: data.hit_count + 1,
        last_used_at: new Date().toISOString()
      })
      .eq('id', data.id);
    
    const ageSeconds = Math.floor(
      (Date.now() - new Date(data.created_at).getTime()) / 1000
    );
    
    console.log(`✅ Full design cache HIT! (hits: ${data.hit_count + 1}, age: ${ageSeconds}s)`);
    
    return { 
      hit: true, 
      data: data.design,
      similarity: 1.0,
      ageSeconds
    };
    
  } catch (error) {
    console.error('❌ Full design cache check failed:', error);
    return { hit: false };
  }
}

/**
 * Store complete design in cache
 */
export async function storeCircuitDesignCache(params: {
  supabase: SupabaseClient;
  jobInputs: any;
  design: any;
  openAiKey: string;
}): Promise<void> {
  
  console.log('💾 Storing full circuit design in cache...');
  
  try {
    const cacheKey = await generateCacheKey(params.jobInputs, params.openAiKey);
    
    const { error } = await params.supabase
      .from('circuit_design_cache_v4')
      .insert({
        cache_key: cacheKey,
        job_inputs: params.jobInputs,
        design: params.design,
        hit_count: 0,
        created_at: new Date().toISOString(),
        last_used_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      });
    
    if (error) {
      console.error('❌ Failed to cache full design:', error);
      return;
    }
    
    console.log('✅ Full circuit design cached');
    
  } catch (error) {
    console.error('❌ Full design cache storage failed:', error);
  }
}
