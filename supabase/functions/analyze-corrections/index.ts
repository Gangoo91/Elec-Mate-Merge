import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// ============================================================================
// TYPES
// ============================================================================

interface TrainingCorrection {
  id: string;
  board_brand: string | null;
  circuit_position: number;
  ai_device_type: string | null;
  ai_rating: string | null;
  ai_curve: string | null;
  ai_label: string | null;
  ai_confidence: string | null;
  correct_device_type: string | null;
  correct_rating: string | null;
  correct_curve: string | null;
  correct_label: string | null;
  created_at: string;
  used_for_training: boolean;
}

interface CorrectionPattern {
  type: 'device_type' | 'rating' | 'curve' | 'label_abbreviation';
  original: string;
  corrected: string;
  count: number;
  board_brand: string | null;
}

interface AnalysisResult {
  correctionsAnalyzed: number;
  patterns: CorrectionPattern[];
  deviceAccuracyRate: number;
  ratingAccuracyRate: number;
  updatesApplied: number;
  newAbbreviations: Array<{ abbr: string; full: string; brand: string }>;
}

// ============================================================================
// PATTERN ANALYSIS
// ============================================================================

function analyzeDeviceCorrections(corrections: TrainingCorrection[]): CorrectionPattern[] {
  const patterns: Map<string, CorrectionPattern> = new Map();

  for (const c of corrections) {
    if (c.ai_device_type && c.correct_device_type && c.ai_device_type !== c.correct_device_type) {
      const key = `device:${c.ai_device_type}:${c.correct_device_type}:${c.board_brand || 'any'}`;
      const existing = patterns.get(key);
      if (existing) {
        existing.count++;
      } else {
        patterns.set(key, {
          type: 'device_type',
          original: c.ai_device_type,
          corrected: c.correct_device_type,
          count: 1,
          board_brand: c.board_brand,
        });
      }
    }
  }

  return Array.from(patterns.values()).filter(p => p.count >= 3);
}

function analyzeRatingCorrections(corrections: TrainingCorrection[]): CorrectionPattern[] {
  const patterns: Map<string, CorrectionPattern> = new Map();

  for (const c of corrections) {
    if (c.ai_rating && c.correct_rating && c.ai_rating !== c.correct_rating) {
      const key = `rating:${c.ai_rating}:${c.correct_rating}:${c.board_brand || 'any'}`;
      const existing = patterns.get(key);
      if (existing) {
        existing.count++;
      } else {
        patterns.set(key, {
          type: 'rating',
          original: c.ai_rating,
          corrected: c.correct_rating,
          count: 1,
          board_brand: c.board_brand,
        });
      }
    }
  }

  return Array.from(patterns.values()).filter(p => p.count >= 3);
}

function analyzeLabelAbbreviations(corrections: TrainingCorrection[]): CorrectionPattern[] {
  const patterns: Map<string, CorrectionPattern> = new Map();

  for (const c of corrections) {
    if (c.ai_label && c.correct_label) {
      const aiLabel = c.ai_label.trim().toLowerCase();
      const correctLabel = c.correct_label.trim().toLowerCase();

      // Check if AI label is shorter (abbreviation was not expanded)
      if (aiLabel !== correctLabel && aiLabel.length < correctLabel.length) {
        const key = `abbr:${aiLabel}:${correctLabel}:${c.board_brand || 'any'}`;
        const existing = patterns.get(key);
        if (existing) {
          existing.count++;
        } else {
          patterns.set(key, {
            type: 'label_abbreviation',
            original: c.ai_label,
            corrected: c.correct_label,
            count: 1,
            board_brand: c.board_brand,
          });
        }
      }
    }
  }

  return Array.from(patterns.values()).filter(p => p.count >= 2);
}

// ============================================================================
// KNOWLEDGE BASE UPDATES
// ============================================================================

async function updateManufacturerAbbreviations(
  patterns: CorrectionPattern[]
): Promise<Array<{ abbr: string; full: string; brand: string }>> {
  const newAbbreviations: Array<{ abbr: string; full: string; brand: string }> = [];

  // Group patterns by brand
  const brandPatterns = new Map<string, CorrectionPattern[]>();
  for (const pattern of patterns.filter(p => p.type === 'label_abbreviation' && p.board_brand)) {
    const brand = pattern.board_brand!;
    if (!brandPatterns.has(brand)) {
      brandPatterns.set(brand, []);
    }
    brandPatterns.get(brand)!.push(pattern);
  }

  // Update each brand's abbreviations
  for (const [brand, abbrevPatterns] of brandPatterns) {
    try {
      // Fetch current knowledge
      const { data: knowledge, error: fetchError } = await supabase
        .from('board_manufacturer_knowledge')
        .select('id, abbreviations')
        .ilike('manufacturer', `%${brand}%`)
        .limit(1)
        .single();

      if (fetchError || !knowledge) {
        console.log(`No knowledge base entry for brand: ${brand}`);
        continue;
      }

      // Merge new abbreviations
      const currentAbbreviations = knowledge.abbreviations || {};
      let updated = false;

      for (const pattern of abbrevPatterns) {
        const abbr = pattern.original.toUpperCase();
        if (!currentAbbreviations[abbr]) {
          currentAbbreviations[abbr] = pattern.corrected;
          newAbbreviations.push({
            abbr,
            full: pattern.corrected,
            brand,
          });
          updated = true;
        }
      }

      if (updated) {
        const { error: updateError } = await supabase
          .from('board_manufacturer_knowledge')
          .update({ abbreviations: currentAbbreviations })
          .eq('id', knowledge.id);

        if (updateError) {
          console.error(`Failed to update abbreviations for ${brand}:`, updateError);
        } else {
          console.log(`Updated abbreviations for ${brand}:`, newAbbreviations.filter(a => a.brand === brand));
        }
      }
    } catch (error) {
      console.error(`Error updating abbreviations for ${brand}:`, error);
    }
  }

  return newAbbreviations;
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    // Parse request for optional limit
    let limit = 100;
    try {
      const body = await req.json();
      if (body?.limit) limit = Math.min(body.limit, 500);
    } catch {
      // Use default limit
    }

    console.log(`Analyzing up to ${limit} corrections...`);

    // Fetch unprocessed corrections
    const { data: corrections, error: fetchError } = await supabase
      .from('board_scanner_training')
      .select('*')
      .eq('used_for_training', false)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (fetchError) {
      throw new Error(`Failed to fetch corrections: ${fetchError.message}`);
    }

    if (!corrections || corrections.length === 0) {
      return new Response(
        JSON.stringify({
          correctionsAnalyzed: 0,
          patterns: [],
          deviceAccuracyRate: 1,
          ratingAccuracyRate: 1,
          updatesApplied: 0,
          newAbbreviations: [],
          message: 'No unprocessed corrections found',
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${corrections.length} unprocessed corrections`);

    // Analyze patterns
    const devicePatterns = analyzeDeviceCorrections(corrections as TrainingCorrection[]);
    const ratingPatterns = analyzeRatingCorrections(corrections as TrainingCorrection[]);
    const labelPatterns = analyzeLabelAbbreviations(corrections as TrainingCorrection[]);

    const allPatterns = [...devicePatterns, ...ratingPatterns, ...labelPatterns];

    // Calculate accuracy rates
    const deviceTotal = corrections.filter(c => c.ai_device_type).length;
    const deviceCorrect = corrections.filter(
      c => c.ai_device_type && c.correct_device_type && c.ai_device_type === c.correct_device_type
    ).length;
    const deviceAccuracyRate = deviceTotal > 0 ? deviceCorrect / deviceTotal : 1;

    const ratingTotal = corrections.filter(c => c.ai_rating).length;
    const ratingCorrect = corrections.filter(
      c => c.ai_rating && c.correct_rating && c.ai_rating === c.correct_rating
    ).length;
    const ratingAccuracyRate = ratingTotal > 0 ? ratingCorrect / ratingTotal : 1;

    console.log(`Accuracy rates - Device: ${(deviceAccuracyRate * 100).toFixed(1)}%, Rating: ${(ratingAccuracyRate * 100).toFixed(1)}%`);

    // Apply updates to knowledge base
    const newAbbreviations = await updateManufacturerAbbreviations(labelPatterns);

    // Mark corrections as processed
    const correctionIds = corrections.map(c => c.id);
    const { error: markError } = await supabase
      .from('board_scanner_training')
      .update({ used_for_training: true })
      .in('id', correctionIds);

    if (markError) {
      console.error('Failed to mark corrections as processed:', markError);
    }

    // Log analysis results
    const { error: logError } = await supabase
      .from('ai_analysis_logs')
      .insert({
        analysis_type: 'correction_analysis',
        model_name: 'board-scanner-training',
        input_summary: `Analyzed ${corrections.length} corrections`,
        output_summary: JSON.stringify({
          patterns: allPatterns.length,
          deviceAccuracy: `${(deviceAccuracyRate * 100).toFixed(1)}%`,
          ratingAccuracy: `${(ratingAccuracyRate * 100).toFixed(1)}%`,
          newAbbreviations: newAbbreviations.length,
        }),
        confidence_score: (deviceAccuracyRate + ratingAccuracyRate) / 2,
        processing_time_ms: Date.now() - startTime,
        metadata: {
          correctionIds,
          patterns: allPatterns,
          newAbbreviations,
        },
      });

    if (logError) {
      console.error('Failed to log analysis:', logError);
    }

    const result: AnalysisResult = {
      correctionsAnalyzed: corrections.length,
      patterns: allPatterns,
      deviceAccuracyRate,
      ratingAccuracyRate,
      updatesApplied: newAbbreviations.length,
      newAbbreviations,
    };

    console.log(`Analysis complete in ${Date.now() - startTime}ms:`, {
      correctionsAnalyzed: result.correctionsAnalyzed,
      patternsFound: result.patterns.length,
      abbreviationsAdded: result.newAbbreviations.length,
    });

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Analysis error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
        correctionsAnalyzed: 0,
        patterns: [],
        deviceAccuracyRate: 0,
        ratingAccuracyRate: 0,
        updatesApplied: 0,
        newAbbreviations: [],
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
