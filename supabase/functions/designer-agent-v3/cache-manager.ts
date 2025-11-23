/**
 * Cache Manager
 * Single unified cache with deterministic key generation
 * Uses FNV-1a hash for fast, collision-resistant keys
 */

import { createClient } from '../_shared/deps.ts';
import type { NormalizedInputs, CachedDesign } from './types.ts';

export class CacheManager {
  private supabase: any;

  constructor(private logger: any) {
    this.supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
  }

  /**
   * Generate deterministic cache key from normalized form inputs
   * Same electrical parameters = same hash
   */
  generateKey(inputs: NormalizedInputs): string {
    // Build canonical representation
    const canonical = {
      supply: {
        voltage: inputs.supply.voltage,
        phases: inputs.supply.phases,
        ze: inputs.supply.ze,
        earthing: inputs.supply.earthing
      },
      circuits: inputs.circuits.map(c => ({
        type: c.loadType,
        power: Math.round(c.loadPower / 100) * 100, // Round to nearest 100W
        length: Math.round(c.cableLength / 5) * 5,   // Round to nearest 5m
        phases: c.phases,
        method: c.installMethod,
        location: c.specialLocation,
        protection: c.protectionType
      }))
      // Sort circuits for deterministic order
      .sort((a, b) => {
        const typeCompare = a.type.localeCompare(b.type);
        if (typeCompare !== 0) return typeCompare;
        return a.power - b.power;
      })
    };

    return this.hash(JSON.stringify(canonical));
  }

  /**
   * FNV-1a hash - fast, collision-resistant, non-cryptographic
   */
  private hash(str: string): string {
    let hash = 2166136261; // FNV offset basis
    
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 16777619); // FNV prime
    }
    
    // Convert to unsigned 32-bit integer, then base36 string
    return (hash >>> 0).toString(36);
  }

  /**
   * Get cached design by key
   * Returns null if not found or expired (>7 days)
   * Validates that cached design has valid circuits
   */
  async get(key: string): Promise<CachedDesign | null> {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    
    const { data, error } = await this.supabase
      .from('circuit_design_cache_v3')
      .select('*')
      .eq('cache_key', key)
      .gte('created_at', thirtyDaysAgo)
      .single();

    if (error || !data) {
      return null;
    }

    // Validate cached design has circuits
    if (!data.design || 
        !data.design.circuits || 
        !Array.isArray(data.design.circuits) || 
        data.design.circuits.length === 0) {
      this.logger.warn('Invalid cached design - circuits missing or empty', { 
        key: key.slice(0, 12),
        hasDesign: !!data.design,
        hasCircuits: !!data.design?.circuits,
        circuitCount: data.design?.circuits?.length || 0
      });
      
      // Delete corrupt cache entry (fire-and-forget)
      this.delete(key).catch(() => {});
      
      return null; // Force fresh generation
    }

    // Increment hit counter (fire-and-forget)
    this.incrementHitCount(key).catch(() => {
      // Ignore errors on hit counter update
    });

    const ageSeconds = Math.floor(
      (Date.now() - new Date(data.created_at).getTime()) / 1000
    );

    return {
      design: data.design,
      ageSeconds,
      hitCount: data.hit_count || 1
    };
  }

  /**
   * Store design in cache
   * Validates design before storing to prevent corrupt cache entries
   */
  async set(key: string, design: any): Promise<void> {
    // Validate design before caching
    if (!design || 
        !design.circuits || 
        !Array.isArray(design.circuits) || 
        design.circuits.length === 0) {
      this.logger.warn('Refusing to cache invalid design', { 
        key: key.slice(0, 12),
        hasDesign: !!design,
        hasCircuits: !!design?.circuits,
        circuitCount: design?.circuits?.length || 0
      });
      return; // Skip caching
    }

    const now = new Date().toISOString();
    
    await this.supabase
      .from('circuit_design_cache_v3')
      .upsert({
        cache_key: key,
        design: design,
        hit_count: 1,
        created_at: now,
        last_hit_at: now
      }, { 
        onConflict: 'cache_key' 
      });

    this.logger.info('Cache stored', { 
      key: key.slice(0, 12),
      circuits: design.circuits.length 
    });
  }

  /**
   * Delete cache entry by key
   * Used to clean up corrupt or invalid cache entries
   */
  async delete(key: string): Promise<void> {
    await this.supabase
      .from('circuit_design_cache_v3')
      .delete()
      .eq('cache_key', key);
    
    this.logger.info('Cache entry deleted', { key: key.slice(0, 12) });
  }

  /**
   * Increment hit counter for cache analytics
   */
  private async incrementHitCount(key: string): Promise<void> {
    const now = new Date().toISOString();
    
    await this.supabase.rpc('increment_cache_hit', {
      p_cache_key: key,
      p_last_hit_at: now
    });
  }
}
