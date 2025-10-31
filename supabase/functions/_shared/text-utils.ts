/**
 * Text Normalization and Similarity Utilities
 * Used for content deduplication
 */

/**
 * Normalize text for comparison
 * Lowercase, trim, collapse whitespace
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s]/g, ''); // Remove punctuation
}

/**
 * Generate MD5 hash of text
 */
export async function hashText(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('MD5', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Calculate Jaccard similarity between two texts
 * Based on word-level token overlap
 */
export function jaccardSimilarity(text1: string, text2: string): number {
  const tokens1 = new Set(text1.toLowerCase().split(/\s+/).filter(t => t.length > 2));
  const tokens2 = new Set(text2.toLowerCase().split(/\s+/).filter(t => t.length > 2));
  
  const intersection = new Set([...tokens1].filter(t => tokens2.has(t)));
  const union = new Set([...tokens1, ...tokens2]);
  
  if (union.size === 0) return 0;
  return intersection.size / union.size;
}

/**
 * Calculate cosine similarity between two embeddings
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (!a || !b || a.length !== b.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  if (normA === 0 || normB === 0) return 0;
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Determine if two pieces of content are near-duplicates
 * Using combined semantic + lexical similarity
 */
export function isNearDuplicate(
  cosine: number,
  jaccard: number,
  thresholds = { cosine: 0.93, combined: { cosine: 0.90, jaccard: 0.80 } }
): boolean {
  // High semantic similarity alone
  if (cosine >= thresholds.cosine) return true;
  
  // Combined semantic + lexical similarity
  if (cosine >= thresholds.combined.cosine && jaccard >= thresholds.combined.jaccard) {
    return true;
  }
  
  return false;
}
