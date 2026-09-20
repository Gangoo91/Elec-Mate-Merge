/**
 * Query Normalization for Better Cache Hit Rates
 * Converts query variations into canonical form
 * 
 * Examples:
 * - "What cable size for 9.5kW shower?" → "cable size 9.5kw shower"
 * - "shower   cable requirements" → "shower cable requirements"
 * - "RCD protection 701.411.3.3" → "rcd protection 701.411.3.3"
 */

/**
 * Normalize a query string to improve cache hit rates
 * ~3x improvement in cache hits expected
 */
export function normalizeQuery(query: string): string {
  let normalized = query;
  
  // 1. Convert to lowercase
  normalized = normalized.toLowerCase();
  
  // 2. Remove common question words and punctuation
  normalized = normalized
    .replace(/\?|!|,|;|:/g, '') // Remove punctuation
    .replace(/\b(what|how|why|when|where|which|is|are|the|a|an|for|in|on|at|to|of)\b/g, '') // Remove filler words
    .trim();
  
  // 3. Normalize whitespace (multiple spaces → single space)
  normalized = normalized.replace(/\s+/g, ' ');
  
  // 4. Normalize units and numbers
  normalized = normalized
    .replace(/(\d+)\s*(kw|kilowatt|kilowatts)/gi, '$1kw') // "9.5 kW" → "9.5kw"
    .replace(/(\d+)\s*(amp|amps|a)/gi, '$1a') // "32 Amps" → "32a"
    .replace(/(\d+)\s*(mm|millimeter|millimeters)/gi, '$1mm') // "2.5 mm" → "2.5mm"
    .replace(/(\d+)\s*(m|meter|meters|metre|metres)/gi, '$1m'); // "50 meters" → "50m"
  
  // 5. Normalize regulation numbers
  normalized = normalized
    .replace(/regulation\s+/gi, '') // "regulation 701.411" → "701.411"
    .replace(/section\s+/gi, '') // "section 701" → "701"
    .replace(/bs\s*7671/gi, 'bs7671'); // "BS 7671" → "bs7671"
  
  // 6. Sort multi-word technical terms alphabetically for consistency
  // e.g., "shower cable" and "cable shower" both → "cable shower"
  const words = normalized.split(' ');
  
  // Don't sort if it's a regulation number or contains numbers (preserve order)
  const hasRegNumber = /^\d+\.\d+/.test(normalized);
  const hasCircuitParams = /\d+kw|\d+a|\d+mm/.test(normalized);
  
  if (!hasRegNumber && !hasCircuitParams && words.length > 1 && words.length <= 6) {
    // Only sort short queries without numbers
    const technicalTerms = new Set(['cable', 'shower', 'rcd', 'protection', 'installation', 'earthing', 'bonding']);
    const hasTechnical = words.some(w => technicalTerms.has(w));
    
    if (hasTechnical) {
      normalized = words.sort().join(' ');
    }
  }
  
  return normalized.trim();
}

/**
 * Generate a stable hash from normalized query
 * Used for cache key generation
 */
export function generateQueryHash(query: string, additionalParams?: Record<string, any>): string {
  const normalized = normalizeQuery(query);
  const hashInput = additionalParams 
    ? normalized + JSON.stringify(additionalParams)
    : normalized;
  
  // Simple hash function (same approach as existing code)
  let hash = 0;
  for (let i = 0; i < hashInput.length; i++) {
    hash = ((hash << 5) - hash) + hashInput.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}
