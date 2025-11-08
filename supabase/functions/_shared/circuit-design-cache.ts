/**
 * PHASE 3: Semantic Circuit Design Cache
 * Provides <2s responses for common circuit designs
 * Based on AI RAMS success pattern
 */

export interface CircuitCacheKey {
  loadType: string;
  loadPower: number; // Rounded to nearest 500W
  cableLength: number; // Rounded to nearest 5m
  voltage: number;
  phases: 'single' | 'three';
}

/**
 * Generate semantic cache key from circuit parameters
 * Normalizes to canonical form for better cache hit rate
 */
export function generateCircuitCacheKey(
  circuits: CircuitCacheKey[],
  supplyDetails: any
): string {
  // Normalize circuits to canonical form
  const normalized = circuits.map(c => ({
    type: c.loadType.toLowerCase().trim(),
    power: Math.round(c.loadPower / 500) * 500, // Round to nearest 500W
    length: Math.round(c.cableLength / 5) * 5, // Round to nearest 5m
    voltage: c.voltage,
    phases: c.phases
  })).sort((a, b) => {
    // Sort by type first, then power, for consistent keys
    if (a.type !== b.type) return a.type.localeCompare(b.type);
    return a.power - b.power;
  });
  
  // Include critical supply parameters
  const supply = {
    voltage: supplyDetails.voltage || 230,
    phases: supplyDetails.phases || 'single',
    ze: Math.round((supplyDetails.ze || 0.35) * 100) / 100, // Round to 2 decimal places
    earthing: supplyDetails.earthingSystem || 'TN-C-S'
  };
  
  return JSON.stringify({ circuits: normalized, supply });
}

/**
 * Generate hash for cache lookup
 */
export function generateCacheHash(cacheKey: string): string {
  // Simple hash function for cache key
  let hash = 0;
  for (let i = 0; i < cacheKey.length; i++) {
    const char = cacheKey.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * Check circuit design cache for existing design
 */
export async function checkCircuitDesignCache(
  supabase: any,
  circuits: CircuitCacheKey[],
  supplyDetails: any
): Promise<{ hit: boolean; data?: any }> {
  try {
    const cacheKey = generateCircuitCacheKey(circuits, supplyDetails);
    const cacheHash = generateCacheHash(cacheKey);
    
    console.log('🔍 Checking circuit design cache:', { hash: cacheHash });
    
    // Search cache table (7-day TTL)
    const { data, error } = await supabase
      .from('circuit_design_cache')
      .select('*')
      .eq('cache_hash', cacheHash)
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .single();
      
    if (error || !data) {
      console.log('❌ Cache miss');
      return { hit: false };
    }
    
    console.log('✅ Cache hit!', { hitCount: data.hit_count + 1 });
    
    // Increment hit counter asynchronously (fire-and-forget)
    supabase
      .from('circuit_design_cache')
      .update({ 
        hit_count: (data.hit_count || 0) + 1,
        last_hit_at: new Date().toISOString()
      })
      .eq('id', data.id)
      .then(() => {})
      .catch((err: any) => console.error('Failed to update hit count:', err));
      
    return { hit: true, data: data.design };
  } catch (error) {
    console.error('Cache check error:', error);
    return { hit: false };
  }
}

/**
 * Store successful circuit design in cache
 */
export async function storeCircuitDesign(
  supabase: any,
  circuits: CircuitCacheKey[],
  supplyDetails: any,
  design: any
): Promise<void> {
  try {
    const cacheKey = generateCircuitCacheKey(circuits, supplyDetails);
    const cacheHash = generateCacheHash(cacheKey);
    
    console.log('💾 Storing circuit design in cache');
    
    await supabase
      .from('circuit_design_cache')
      .upsert({
        cache_hash: cacheHash,
        circuits: circuits,
        supply: supplyDetails,
        design: design,
        hit_count: 1,
        created_at: new Date().toISOString(),
        last_hit_at: new Date().toISOString()
      }, {
        onConflict: 'cache_hash'
      });
      
    console.log('✅ Design cached successfully');
  } catch (error) {
    console.error('Failed to cache design:', error);
    // Non-critical - don't throw, just log
  }
}
