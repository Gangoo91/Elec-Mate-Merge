/**
 * Installation Method Semantic Cache
 * 30-day TTL with 85% similarity threshold
 * Used ONLY by Installation Specialist agent
 */

import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { generateEmbedding } from './ai-providers.ts';

export interface InstallationCacheResult {
  hit: boolean;
  data?: any;
  similarity?: number;
  hitCount?: number;
}

/**
 * Check installation method semantic cache (85% similarity threshold)
 * Returns cached result if a similar query exists within 30 days
 */
export async function checkInstallationMethodCache(params: {
  supabase: SupabaseClient;
  query: string;
  openAiKey: string;
}): Promise<InstallationCacheResult> {
  
  console.log('🔍 Checking installation method semantic cache...');
  
  try {
    // Generate embedding for semantic matching
    const embedding = await generateEmbedding(params.query, params.openAiKey);
    
    // Search for similar cached results (85% threshold)
    const { data, error } = await params.supabase.rpc('match_installation_method_cache', {
      query_embedding: embedding,
      similarity_threshold: 0.85,
      match_count: 1
    });
    
    if (error) {
      console.error('❌ Cache lookup error:', error);
      return { hit: false };
    }
    
    if (!data || data.length === 0) {
      console.log('❌ Installation method cache miss');
      return { hit: false };
    }
    
    const match = data[0];
    
    // Update hit count
    await params.supabase
      .from('installation_method_cache')
      .update({ 
        hit_count: match.hit_count + 1,
        last_used_at: new Date().toISOString()
      })
      .eq('id', match.id);
    
    console.log(`✅ Installation method CACHE HIT! (${(match.similarity * 100).toFixed(1)}% similar, hits: ${match.hit_count + 1})`);
    
    return { 
      hit: true, 
      data: match.installation_method,
      similarity: match.similarity,
      hitCount: match.hit_count + 1
    };
    
  } catch (error) {
    console.error('❌ Installation method cache check failed:', error);
    return { hit: false };
  }
}

/**
 * Store installation method result in semantic cache (30-day TTL)
 */
export async function storeInstallationMethodCache(params: {
  supabase: SupabaseClient;
  query: string;
  installationMethod: any;
  openAiKey: string;
}): Promise<void> {
  
  console.log('💾 Storing installation method in semantic cache...');
  
  try {
    const embedding = await generateEmbedding(params.query, params.openAiKey);
    
    const { error } = await params.supabase
      .from('installation_method_cache')
      .insert({
        query_text: params.query,
        query_embedding: embedding,
        installation_method: params.installationMethod,
        hit_count: 0,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
      });
    
    if (error) {
      console.error('❌ Failed to cache installation method:', error);
    } else {
      console.log('✅ Installation method cached (30-day TTL)');
    }
    
  } catch (error) {
    console.error('❌ Failed to cache installation method:', error);
  }
}
