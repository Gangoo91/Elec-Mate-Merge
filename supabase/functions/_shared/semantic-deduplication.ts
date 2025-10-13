/**
 * Semantic Deduplication for RAG Results
 * Uses cosine similarity to detect duplicate regulations
 */

import type { RegulationResult } from './cross-encoder-reranker.ts';

/**
 * Calculate cosine similarity between two embeddings
 */
function cosineSimilarity(a: number[], b: number[]): number {
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
 * Simple text similarity for content comparison (fallback)
 */
function textSimilarity(a: string, b: string): number {
  const wordsA = new Set(a.toLowerCase().split(/\s+/));
  const wordsB = new Set(b.toLowerCase().split(/\s+/));
  
  const intersection = new Set([...wordsA].filter(w => wordsB.has(w)));
  const union = new Set([...wordsA, ...wordsB]);
  
  return intersection.size / union.size; // Jaccard similarity
}

export interface DeduplicationOptions {
  similarityThreshold?: number; // 0.9 default (90% similarity = duplicate)
  useEmbeddings?: boolean;      // Use vector similarity if available
  keepHighestScore?: boolean;   // Keep regulation with highest score
}

/**
 * Deduplicate regulations using semantic similarity
 * Returns unique regulations, removing near-duplicates
 */
export function deduplicateRegulations(
  regulations: RegulationResult[],
  options: DeduplicationOptions = {}
): RegulationResult[] {
  const {
    similarityThreshold = 0.9,
    useEmbeddings = false,
    keepHighestScore = true
  } = options;
  
  if (regulations.length === 0) return [];
  
  const unique: RegulationResult[] = [];
  const seen = new Set<string>();
  
  for (const reg of regulations) {
    // Quick check: exact regulation number match
    const regKey = `${reg.regulation_number}_${reg.section?.substring(0, 30)}`;
    
    if (seen.has(regKey)) {
      console.log(`⏭️ Skipping exact duplicate: ${reg.regulation_number}`);
      continue;
    }
    
    // Semantic similarity check against existing unique regulations
    let isDuplicate = false;
    let duplicateIndex = -1;
    
    for (let i = 0; i < unique.length; i++) {
      const existing = unique[i];
      
      // Check if regulation numbers are similar
      if (existing.regulation_number === reg.regulation_number) {
        // Same regulation number - check content similarity
        const contentSim = textSimilarity(
          existing.content || '',
          reg.content || ''
        );
        
        if (contentSim > similarityThreshold) {
          isDuplicate = true;
          duplicateIndex = i;
          console.log(`🔄 Semantic duplicate found: ${reg.regulation_number} (${Math.round(contentSim * 100)}% similar)`);
          break;
        }
      }
      
      // Vector-based similarity (if embeddings available)
      if (useEmbeddings && existing.embedding && reg.embedding) {
        const embeddingSim = cosineSimilarity(existing.embedding, reg.embedding);
        
        if (embeddingSim > similarityThreshold) {
          isDuplicate = true;
          duplicateIndex = i;
          console.log(`🔄 Vector duplicate found: ${reg.regulation_number} vs ${existing.regulation_number} (${Math.round(embeddingSim * 100)}% similar)`);
          break;
        }
      }
    }
    
    if (isDuplicate && duplicateIndex >= 0) {
      // Replace if new one has higher score
      const existing = unique[duplicateIndex];
      const newScore = reg.finalScore || reg.crossEncoderScore || reg.hybrid_score || 0;
      const existingScore = existing.finalScore || existing.crossEncoderScore || existing.hybrid_score || 0;
      
      if (keepHighestScore && newScore > existingScore) {
        console.log(`⬆️ Replacing with higher-scored version: ${newScore.toFixed(2)} > ${existingScore.toFixed(2)}`);
        unique[duplicateIndex] = reg;
      }
    } else {
      // Add new unique regulation
      unique.push(reg);
      seen.add(regKey);
    }
  }
  
  console.log(`✅ Deduplication: ${regulations.length} → ${unique.length} regulations (${regulations.length - unique.length} duplicates removed)`);
  
  return unique;
}

/**
 * Deduplicate by regulation number only (faster, simpler)
 */
export function deduplicateByRegNumber(
  regulations: RegulationResult[]
): RegulationResult[] {
  const seen = new Map<string, RegulationResult>();
  
  for (const reg of regulations) {
    const key = reg.regulation_number;
    
    if (!seen.has(key)) {
      seen.set(key, reg);
    } else {
      // Keep higher scored version
      const existing = seen.get(key)!;
      const newScore = reg.finalScore || reg.hybrid_score || 0;
      const existingScore = existing.finalScore || existing.hybrid_score || 0;
      
      if (newScore > existingScore) {
        seen.set(key, reg);
      }
    }
  }
  
  return Array.from(seen.values());
}
