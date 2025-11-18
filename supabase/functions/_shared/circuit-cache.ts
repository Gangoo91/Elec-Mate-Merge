/**
 * Circuit-Level Cache (Phase 2.2)
 * Caches standard circuits to skip AI generation for common designs
 */

import { createClient } from './deps.ts';

export interface CircuitCacheKey {
  loadType: string;
  loadPower: number;
  cableLength: number;
  voltage: number;
  phases: string;
}

export class CircuitCache {
  private supabase: any;
  
  constructor(private logger: any) {
    this.supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
  }

  /**
   * Generate cache key for a circuit
   */
  generateKey(circuit: CircuitCacheKey): string {
    // Normalize to nearest standard values for better cache hits
    const normalizedPower = Math.round(circuit.loadPower / 100) * 100;
    const normalizedLength = Math.round(circuit.cableLength / 5) * 5;
    
    return `${circuit.loadType}_${normalizedPower}W_${normalizedLength}m_${circuit.voltage}V_${circuit.phases}`;
  }

  /**
   * Get cached circuit design
   */
  async get(key: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('circuit_level_cache')
      .select('design')
      .eq('circuit_hash', key)
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()) // 30 day TTL
      .single();

    if (error || !data) {
      return null;
    }

    // Increment hit counter (fire-and-forget)
    this.incrementHitCount(key).catch(() => {});

    return data.design;
  }

  /**
   * Store circuit design in cache
   */
  async set(key: string, design: any, circuit: CircuitCacheKey): Promise<void> {
    await this.supabase
      .from('circuit_level_cache')
      .upsert({
        circuit_hash: key,
        circuit_type: circuit.loadType,
        load_power: circuit.loadPower,
        cable_length: circuit.cableLength,
        voltage: circuit.voltage,
        design: design,
        hit_count: 1,
        created_at: new Date().toISOString(),
        last_hit_at: new Date().toISOString()
      }, {
        onConflict: 'circuit_hash'
      });

    this.logger.info('Circuit cached', { key });
  }

  /**
   * Increment hit counter
   */
  private async incrementHitCount(key: string): Promise<void> {
    await this.supabase
      .from('circuit_level_cache')
      .update({
        hit_count: this.supabase.raw('hit_count + 1'),
        last_hit_at: new Date().toISOString()
      })
      .eq('circuit_hash', key);
  }
}
