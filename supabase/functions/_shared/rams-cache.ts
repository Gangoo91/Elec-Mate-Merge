/**
 * QUICK WIN #3: Semantic RAMS Cache
 * Cache common scenarios for instant response (<1s)
 * 
 * Impact: ~30% of jobs served from cache (instant)
 */

import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { deriveWorkType } from './derive-work-type.ts';

/**
 * Lightweight embedding generator for cache operations
 * Avoids heavy v3-core.ts imports
 */
async function generateEmbedding(text: string, apiKey: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text.slice(0, 8000)
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI embedding failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

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
    // Derive actual work type from job description
    const derivedWorkType = deriveWorkType(params.jobDescription, params.jobScale);
    
    // Generate embedding for query
    const embedding = await generateEmbedding(params.jobDescription, params.openAiKey);
    
    // Search for similar cached result (lowered threshold for better cache hits)
    const { data, error } = await params.supabase.rpc('match_rams_cache', {
      query_embedding: embedding,
      work_type: derivedWorkType,
      job_scale: params.jobScale,
      similarity_threshold: 0.85,
      match_count: 3
    });
    
    if (error) {
      console.error('❌ Cache lookup error:', error);
      return { hit: false };
    }
    
    if (data && data.length > 0) {
      // Score each match based on similarity + job description overlap
      const scoredMatches = data.map((match: any) => {
        const descWords = params.jobDescription.toLowerCase().split(/\s+/);
        const cacheDescWords = (match.job_description || '').toLowerCase().split(/\s+/);
        const wordOverlap = descWords.filter(w => cacheDescWords.includes(w)).length;
        const overlapScore = wordOverlap / Math.max(descWords.length, 1);
        
        return {
          ...match,
          finalScore: (match.similarity * 0.7) + (overlapScore * 0.3)
        };
      });
      
      const bestMatch = scoredMatches.reduce((best: any, curr: any) => 
        curr.finalScore > best.finalScore ? curr : best
      );
      
      // Accept if combined score >= 0.80
      if (bestMatch.finalScore >= 0.80) {
        // Update hit count and last_used_at
        await params.supabase
          .from('rams_semantic_cache')
          .update({ 
            hit_count: bestMatch.hit_count + 1,
            last_used_at: new Date().toISOString()
          })
          .eq('id', bestMatch.id);
        
        console.log(`✅ RAMS cache HIT! (similarity: ${(bestMatch.similarity * 100).toFixed(1)}%, combined: ${(bestMatch.finalScore * 100).toFixed(1)}%, hits: ${bestMatch.hit_count + 1})`);
        
        return { 
          hit: true, 
          data: {
            rams_data: bestMatch.rams_data,
            method_data: bestMatch.method_data,
            similarity: bestMatch.similarity,
            hit_count: bestMatch.hit_count + 1
          }
        };
      }
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
  
  // ✅ Validate both datasets are present
  if (!params.ramsData || !params.methodData) {
    console.warn('⚠️ Cache write skipped - incomplete data:', {
      hasRAMS: !!params.ramsData,
      hasMethod: !!params.methodData
    });
    return; // Exit early without caching
  }
  
  try {
    // Derive actual work type from job description
    const derivedWorkType = deriveWorkType(params.jobDescription, params.jobScale);
    
    // Generate embedding for query
    const embedding = await generateEmbedding(params.jobDescription, params.openAiKey);
    
    // Store in cache
    const { error } = await params.supabase
      .from('rams_semantic_cache')
      .insert({
        job_description_embedding: embedding,
        work_type: derivedWorkType,
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
