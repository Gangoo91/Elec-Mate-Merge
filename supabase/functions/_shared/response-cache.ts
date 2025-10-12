// Phase 8: Response Caching for Performance Optimization
// Caches common queries to speed up responses by 10x

import { createClient } from './deps.ts';

export interface CacheEntry {
  query: string;
  response: string;
  citations: any[];
  confidence: number;
  timestamp: string;
  hits: number;
}

export class ResponseCache {
  private supabase;
  private cacheTable = 'ai_response_cache';
  private maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

  constructor() {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  // Generate semantic cache key from entities
  private generateKey(query: string, context?: any): string {
    // Try to extract semantic entities for better cache hits
    const canonical = this.extractCanonicalEntities(query, context);
    return this.hashString(JSON.stringify(canonical));
  }

  // Extract canonical entities for semantic caching
  private extractCanonicalEntities(query: string, context?: any): any {
    const entities: any = {
      type: 'general',
      voltage: context?.voltage || 230
    };

    // Extract load type
    if (/shower/i.test(query)) entities.type = 'shower';
    if (/cooker|oven/i.test(query)) entities.type = 'cooker';
    if (/socket/i.test(query)) entities.type = 'socket';
    if (/light/i.test(query)) entities.type = 'lighting';
    if (/ev charger/i.test(query)) entities.type = 'ev_charger';

    // Extract power (round to nearest 100W for caching)
    const powerMatch = query.match(/(\d+\.?\d*)\s*(kW|kw|W|w)/i);
    if (powerMatch) {
      const power = powerMatch[2].toLowerCase().includes('k') 
        ? parseFloat(powerMatch[1]) * 1000 
        : parseFloat(powerMatch[1]);
      entities.power = Math.round(power / 100) * 100; // Round to nearest 100W
    } else if (context?.power) {
      entities.power = Math.round(context.power / 100) * 100;
    }

    // Extract distance (round to nearest meter)
    const distanceMatch = query.match(/(\d+\.?\d*)\s*(m|meters?|metres?)/i);
    if (distanceMatch) {
      entities.distance = Math.round(parseFloat(distanceMatch[1]));
    } else if (context?.cableLength) {
      entities.distance = Math.round(context.cableLength);
    }

    return entities;
  }

  // Simple hash function
  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  // Check if query matches cached patterns
  async get(query: string, context?: any): Promise<CacheEntry | null> {
    const key = this.generateKey(query, context);
    
    try {
      const { data, error } = await this.supabase
        .from(this.cacheTable)
        .select('*')
        .eq('cache_key', key)
        .gte('timestamp', new Date(Date.now() - this.maxAge).toISOString())
        .single();

      if (error || !data) {
        // Try fuzzy match for similar queries
        return await this.fuzzyMatch(query);
      }

      // Increment hit counter
      await this.supabase
        .from(this.cacheTable)
        .update({ hits: (data.hits || 0) + 1 })
        .eq('cache_key', key);

      console.log('✅ Cache hit for query:', query.slice(0, 50));
      return data as CacheEntry;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  // Fuzzy match for similar queries
  private async fuzzyMatch(query: string): Promise<CacheEntry | null> {
    const keywords = this.extractKeywords(query);
    if (keywords.length === 0) return null;

    try {
      const { data } = await this.supabase
        .from(this.cacheTable)
        .select('*')
        .gte('timestamp', new Date(Date.now() - this.maxAge).toISOString())
        .order('hits', { ascending: false })
        .limit(10);

      if (!data) return null;

      // Find best match based on keyword overlap
      for (const entry of data) {
        const entryKeywords = this.extractKeywords(entry.query);
        const overlap = keywords.filter(k => entryKeywords.includes(k)).length;
        const similarity = overlap / Math.max(keywords.length, entryKeywords.length);

        if (similarity > 0.7) {
          console.log('✅ Fuzzy cache hit (similarity:', similarity, '):', query.slice(0, 50));
          return entry as CacheEntry;
        }
      }
    } catch (error) {
      console.error('Fuzzy match error:', error);
    }

    return null;
  }

  private extractKeywords(text: string): string[] {
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'what', 'how', 'why', 'when', 'where', 'can', 'could', 'should', 'would'];
    return text
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 3 && !stopWords.includes(word));
  }

  // Store response in cache
  async set(query: string, response: string, citations: any[], confidence: number, context?: any): Promise<void> {
    const key = this.generateKey(query, context);

    try {
      await this.supabase
        .from(this.cacheTable)
        .upsert({
          cache_key: key,
          query: query.slice(0, 500), // Store truncated query
          response,
          citations: JSON.stringify(citations),
          confidence,
          timestamp: new Date().toISOString(),
          hits: 1
        });

      console.log('💾 Cached response for:', query.slice(0, 50));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  // Clean up old cache entries
  async cleanup(): Promise<void> {
    try {
      await this.supabase
        .from(this.cacheTable)
        .delete()
        .lt('timestamp', new Date(Date.now() - this.maxAge).toISOString());

      console.log('🧹 Cache cleanup complete');
    } catch (error) {
      console.error('Cache cleanup error:', error);
    }
  }
}

// Common query patterns that should always be cached
export const CACHEABLE_PATTERNS = [
  /what size cable.*shower/i,
  /voltage drop.*calculation/i,
  /mcb.*rating/i,
  /3-bed house.*circuit/i,
  /cooker.*cable.*size/i,
  /ev charger.*installation/i,
  /insulation resistance.*test/i,
  /earth fault loop/i,
];

export function isCacheable(query: string): boolean {
  return CACHEABLE_PATTERNS.some(pattern => pattern.test(query));
}
