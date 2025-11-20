/**
 * LAYER 3: Partial Circuit Agent Cache
 * Cache individual agent outputs (designer or installer)
 * Mirrors rams-partial-cache.ts pattern
 * 
 * Use Case: If one agent completes but other times out,
 *           we can reuse the completed agent's work
 * 
 * Cache Structure:
 * - Key: Hash of (job_inputs + agent_type)
 * - TTL: 30 days
 * - Storage: Supabase table `circuit_partial_cache`
 */

import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

export interface PartialCacheResult {
  hit: boolean;
  data?: any;
  cached_at?: string;
  hit_count?: number;
}

/**
 * Generate cache key for partial agent result
 */
async function generateCacheKey(
  jobInputs: any,
  agentType: 'circuit_designer' | 'installation_method',
  openAiKey: string
): Promise<string> {
  const normalizedInputs = JSON.stringify({
    circuits: jobInputs.circuits?.length || 0,
    voltage: jobInputs.supply?.voltage || 230,
    phases: jobInputs.supply?.phases || 'single',
    loadTypes: jobInputs.circuits?.map((c: any) => c.loadType).sort() || [],
    agentType
  });
  
  const hash = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(normalizedInputs + openAiKey)
  );
  
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 32);
}

/**
 * Check partial cache for agent output
 */
export async function checkPartialCache(params: {
  supabase: SupabaseClient;
  jobInputs: any;
  agentType: 'circuit_designer' | 'installation_method';
  openAiKey: string;
}): Promise<PartialCacheResult> {
  
  console.log(`🔍 Checking partial cache for ${params.agentType}...`);
  
  try {
    const cacheKey = await generateCacheKey(
      params.jobInputs,
      params.agentType,
      params.openAiKey
    );
    
    const { data, error } = await params.supabase
      .from('circuit_partial_cache')
      .select('*')
      .eq('cache_key', cacheKey)
      .eq('agent_type', params.agentType)
      .gt('expires_at', new Date().toISOString())
      .single();
    
    if (error || !data) {
      console.log(`❌ Partial cache miss for ${params.agentType}`);
      return { hit: false };
    }
    
    // Update hit count
    await params.supabase
      .from('circuit_partial_cache')
      .update({ 
        hit_count: data.hit_count + 1,
        last_used_at: new Date().toISOString()
      })
      .eq('id', data.id);
    
    console.log(`✅ Partial cache HIT for ${params.agentType}! (hits: ${data.hit_count + 1})`);
    
    return { 
      hit: true, 
      data: data.agent_output,
      cached_at: data.created_at,
      hit_count: data.hit_count + 1
    };
    
  } catch (error) {
    console.error(`❌ Partial cache check failed:`, error);
    return { hit: false };
  }
}

/**
 * Store agent output in partial cache
 */
export async function storePartialCache(params: {
  supabase: SupabaseClient;
  jobInputs: any;
  agentType: 'circuit_designer' | 'installation_method';
  agentOutput: any;
  openAiKey: string;
}): Promise<void> {
  
  console.log(`💾 Storing partial cache for ${params.agentType}...`);
  
  try {
    const cacheKey = await generateCacheKey(
      params.jobInputs,
      params.agentType,
      params.openAiKey
    );
    
    const { error } = await params.supabase
      .from('circuit_partial_cache')
      .insert({
        cache_key: cacheKey,
        agent_type: params.agentType,
        job_inputs: params.jobInputs,
        agent_output: params.agentOutput,
        hit_count: 0,
        created_at: new Date().toISOString(),
        last_used_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      });
    
    if (error) {
      console.error(`❌ Failed to cache partial result:`, error);
      return;
    }
    
    console.log(`✅ Partial result cached for ${params.agentType}`);
    
  } catch (error) {
    console.error(`❌ Partial cache storage failed:`, error);
  }
}
