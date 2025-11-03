/**
 * Practical Work Intelligence RAG Module
 * Primary data source for hands-on installation, commissioning, and maintenance guidance
 */

export interface PracticalWorkResult {
  content: string;
  primary_topic?: string;
  keywords?: string[];
  equipment_category?: string;
  tools_required?: string[];
  bs7671_regulations?: string[];
  practical_work_id?: string;
  hybrid_score?: number;
  confidence_score?: number;
  source_table: string;
  applies_to?: string[];
  location_types?: string[];
  power_ratings?: string[];
  cable_sizes?: string[];
  expected_results?: string;
  maintenance_interval?: string;
}

export interface PracticalWorkSearchParams {
  query: string;
  tradeFilter?: 'installer' | 'maintenance' | 'commissioning';
  matchCount?: number;
}

export interface PracticalWorkSearchResult {
  results: PracticalWorkResult[];
  searchTimeMs: number;
  qualityScore: number; // 0-100
  meetsThreshold: boolean; // true if quality is sufficient
}

/**
 * Search Practical Work Intelligence with quality scoring
 */
export async function searchPracticalWorkIntelligence(
  supabase: any,
  params: PracticalWorkSearchParams
): Promise<PracticalWorkSearchResult> {
  const startTime = Date.now();
  const { query, tradeFilter, matchCount = 15 } = params;

  console.log(`🔍 Searching Practical Work Intelligence`, {
    query: query.substring(0, 50),
    tradeFilter,
    matchCount
  });

  try {
    // Call hybrid search RPC
    const { data, error } = await supabase.rpc(
      'search_practical_work_intelligence_hybrid',
      {
        query_text: query,
        match_count: matchCount,
        filter_trade: tradeFilter || null
      }
    );

    if (error) {
      console.error('Practical Work search error:', error);
      return {
        results: [],
        searchTimeMs: Date.now() - startTime,
        qualityScore: 0,
        meetsThreshold: false
      };
    }

    // Transform to PracticalWorkResult format
    const results: PracticalWorkResult[] = (data || []).map((row: any) => ({
      content: row.content || '',
      primary_topic: row.primary_topic,
      keywords: row.keywords,
      equipment_category: row.equipment_category,
      tools_required: row.tools_required,
      bs7671_regulations: row.bs7671_regulations,
      practical_work_id: row.practical_work_id,
      hybrid_score: row.hybrid_score / 10, // Normalize to 0-1 range
      confidence_score: row.confidence_score,
      source_table: 'practical_work_intelligence',
      applies_to: row.applies_to,
      location_types: row.location_types,
      power_ratings: row.power_ratings,
      cable_sizes: row.cable_sizes,
      expected_results: row.expected_results,
      maintenance_interval: row.maintenance_interval
    }));

    // Calculate quality metrics
    const avgHybridScore = results.length > 0
      ? results.reduce((sum, r) => sum + (r.hybrid_score || 0), 0) / results.length
      : 0;

    const avgConfidenceScore = results.length > 0
      ? results.reduce((sum, r) => sum + (r.confidence_score || 0), 0) / results.length
      : 0;

    // Quality score: combination of result count, hybrid score, and confidence
    const countScore = Math.min(results.length / matchCount, 1) * 40; // Max 40 points
    const hybridScore = avgHybridScore * 30; // Max 30 points
    const confidenceScore = avgConfidenceScore * 30; // Max 30 points
    const qualityScore = countScore + hybridScore + confidenceScore;

    // Threshold: need at least 50/100 quality score
    const meetsThreshold = qualityScore >= 50 && results.length >= 3;

    const searchTimeMs = Date.now() - startTime;

    console.log(`✅ Practical Work search complete`, {
      resultCount: results.length,
      avgHybridScore: avgHybridScore.toFixed(2),
      avgConfidence: avgConfidenceScore.toFixed(2),
      qualityScore: qualityScore.toFixed(1),
      meetsThreshold,
      durationMs: searchTimeMs
    });

    return {
      results,
      searchTimeMs,
      qualityScore,
      meetsThreshold
    };

  } catch (error) {
    console.error('Practical Work search exception:', error);
    return {
      results: [],
      searchTimeMs: Date.now() - startTime,
      qualityScore: 0,
      meetsThreshold: false
    };
  }
}

/**
 * Filter results by confidence score threshold
 */
export function filterByConfidence(
  results: PracticalWorkResult[],
  minConfidence: number = 0.75
): PracticalWorkResult[] {
  return results.filter(r => (r.confidence_score || 0) >= minConfidence);
}

/**
 * Format results for AI context
 */
export function formatForAIContext(results: PracticalWorkResult[]): string {
  return results.map(pw => {
    let formatted = `**${pw.primary_topic || 'Practical Guidance'}**`;
    
    if (pw.equipment_category) {
      formatted += ` (${pw.equipment_category})`;
    }
    
    formatted += `\n${pw.content}\n`;
    
    if (pw.tools_required && pw.tools_required.length > 0) {
      formatted += `\nTools Required: ${pw.tools_required.join(', ')}`;
    }
    
    if (pw.bs7671_regulations && pw.bs7671_regulations.length > 0) {
      formatted += `\nBS 7671: ${pw.bs7671_regulations.join(', ')}`;
    }
    
    if (pw.expected_results) {
      formatted += `\nExpected Results: ${pw.expected_results}`;
    }
    
    if (pw.maintenance_interval) {
      formatted += `\nMaintenance Interval: ${pw.maintenance_interval}`;
    }
    
    return formatted;
  }).join('\n\n---\n\n');
}
