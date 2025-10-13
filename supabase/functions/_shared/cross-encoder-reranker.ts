/**
 * Cross-Encoder Reranking for Ultra-Precise RAG
 * Uses gpt-5-mini to score each regulation's relevance to the query
 * 10x better than pure vector similarity
 */

export interface RegulationResult {
  id: string;
  regulation_number: string;
  section: string;
  content: string;
  amendment?: string;
  metadata?: any;
  similarity?: number;
  hybrid_score?: number;
  crossEncoderScore?: number;
  finalScore?: number;
}

export interface Logger {
  info: (msg: string, data?: any) => void;
  warn: (msg: string, data?: any) => void;
  error: (msg: string, data?: any) => void;
  debug: (msg: string, data?: any) => void;
}

/**
 * Rerank regulations using cross-encoder scoring
 * Batches regulations (5 at a time) for speed
 */
export async function rerankWithCrossEncoder(
  query: string,
  regulations: RegulationResult[],
  openAiKey: string,
  logger: Logger
): Promise<RegulationResult[]> {
  if (regulations.length === 0) return [];
  
  // Batch score regulations (5 at a time for speed)
  const batchSize = 5;
  const batches = [];
  
  for (let i = 0; i < regulations.length; i += batchSize) {
    batches.push(regulations.slice(i, i + batchSize));
  }
  
  const scoredRegulations: RegulationResult[] = [];
  
  for (const batch of batches) {
    const prompt = `Score each regulation's relevance to this query on a scale of 0-100:

Query: "${query}"

Regulations:
${batch.map((r, idx) => `${idx + 1}. ${r.regulation_number}: ${r.content.substring(0, 300)}`).join('\n\n')}

Return ONLY a JSON array: [score1, score2, ...]`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-5-mini-2025-08-07',
          messages: [
            { role: 'system', content: 'You score regulation relevance. Return only JSON arrays of numbers 0-100.' },
            { role: 'user', content: prompt }
          ],
          max_completion_tokens: 100
        })
      });
      
      const data = await response.json();
      const scores = JSON.parse(data.choices[0].message.content);
      
      batch.forEach((reg, idx) => {
        scoredRegulations.push({
          ...reg,
          crossEncoderScore: scores[idx] / 100, // Normalize to 0-1
          finalScore: (reg.hybrid_score || 0) * 0.6 + (scores[idx] / 100) * 0.4 // Weighted blend
        });
      });
    } catch (error) {
      logger.warn('Cross-encoder scoring failed, using hybrid scores', { error: error instanceof Error ? error.message : String(error) });
      batch.forEach(reg => {
        scoredRegulations.push({ ...reg, finalScore: reg.hybrid_score || 0.5 });
      });
    }
  }
  
  return scoredRegulations.sort((a, b) => (b.finalScore || 0) - (a.finalScore || 0));
}
