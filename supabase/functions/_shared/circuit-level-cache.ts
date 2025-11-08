/**
 * PHASE 4: Circuit-Level Caching
 * Cache individual circuits (not whole installations) for better hit rate
 */

/**
 * Generate hash for circuit cache lookup
 * Normalizes values to increase cache hit rate
 */
export async function generateCircuitHash(
  loadType: string,
  loadPower: number,
  cableLength: number,
  voltage: number
): Promise<string> {
  // Normalize to reduce cache misses
  const normalizedPower = Math.round(loadPower / 100) * 100; // Round to nearest 100W
  const normalizedLength = Math.round(cableLength / 5) * 5; // Round to nearest 5m
  
  const key = `${loadType.toLowerCase()}_${normalizedPower}W_${normalizedLength}m_${voltage}V`;
  
  // Simple hash (not cryptographic - just for cache key)
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 16);
}

/**
 * Check circuit-level cache for existing design
 * Returns design if found, null otherwise
 */
export async function checkCircuitCache(
  supabase: any,
  circuit: any,
  voltage: number
): Promise<any | null> {
  try {
    const hash = await generateCircuitHash(
      circuit.loadType || 'other',
      circuit.loadPower || 1000,
      circuit.cableLength || 10,
      voltage
    );
    
    console.log('🔍 Checking circuit cache:', { hash, type: circuit.loadType });
    
    const { data, error } = await supabase
      .from('circuit_level_cache')
      .select('*')
      .eq('circuit_hash', hash)
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()) // 30-day TTL
      .single();
    
    if (error || !data) {
      console.log('❌ Circuit cache miss');
      return null;
    }
    
    console.log('✅ Circuit cache hit!', { hitCount: data.hit_count + 1 });
    
    // Increment hit counter (fire-and-forget)
    supabase
      .from('circuit_level_cache')
      .update({ 
        hit_count: (data.hit_count || 0) + 1,
        last_hit_at: new Date().toISOString()
      })
      .eq('id', data.id)
      .then(() => {})
      .catch((err: any) => console.error('Failed to update hit count:', err));
    
    return data.design;
  } catch (error) {
    console.error('Circuit cache check error:', error);
    return null;
  }
}

/**
 * Store successful circuit design in cache
 */
export async function storeCircuitCache(
  supabase: any,
  circuit: any,
  voltage: number,
  design: any
): Promise<void> {
  try {
    const hash = await generateCircuitHash(
      circuit.loadType || 'other',
      circuit.loadPower || 1000,
      circuit.cableLength || 10,
      voltage
    );
    
    console.log('💾 Storing circuit in cache');
    
    await supabase
      .from('circuit_level_cache')
      .upsert({
        circuit_hash: hash,
        circuit_type: circuit.loadType || 'other',
        load_power: circuit.loadPower || 1000,
        cable_length: circuit.cableLength || 10,
        voltage: voltage,
        design: design,
        hit_count: 1,
        created_at: new Date().toISOString(),
        last_hit_at: new Date().toISOString()
      }, {
        onConflict: 'circuit_hash'
      });
    
    console.log('✅ Circuit cached successfully');
  } catch (error) {
    console.error('Failed to cache circuit:', error);
    // Non-critical - don't throw, just log
  }
}
