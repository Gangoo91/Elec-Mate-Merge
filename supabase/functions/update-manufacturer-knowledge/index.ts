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

interface TrainingAnalysis {
  id: string;
  manufacturer: string;
  model_series: string | null;
  main_switch_position: string | null;
  is_three_phase: boolean;
  phase_layout: string | null;
  label_abbreviations: Record<string, string> | null;
  pictogram_types: string[] | null;
  ratings_distribution: Record<string, number> | null;
  circuits: Array<{
    device_type: string;
    rating_amps: number;
    curve: string;
    label_text: string | null;
    pictogram: string | null;
  }> | null;
}

interface AggregatedKnowledge {
  main_switch_position: string | null;
  abbreviations: Record<string, string>;
  pictogram_types: string[];
  common_ratings: string[];
  typical_devices: Record<string, number>;
  three_phase_info: {
    frequency: number;
    layout_preference: string | null;
  };
}

// ============================================================================
// AGGREGATION FUNCTIONS
// ============================================================================

function findCommonAbbreviations(analyses: TrainingAnalysis[]): Record<string, string> {
  const abbreviationCounts: Record<string, Record<string, number>> = {};

  for (const analysis of analyses) {
    if (!analysis.label_abbreviations) continue;

    for (const [abbr, full] of Object.entries(analysis.label_abbreviations)) {
      if (!abbreviationCounts[abbr]) {
        abbreviationCounts[abbr] = {};
      }
      abbreviationCounts[abbr][full] = (abbreviationCounts[abbr][full] || 0) + 1;
    }
  }

  // Take the most common expansion for each abbreviation
  const result: Record<string, string> = {};
  for (const [abbr, expansions] of Object.entries(abbreviationCounts)) {
    const sortedExpansions = Object.entries(expansions).sort((a, b) => b[1] - a[1]);
    if (sortedExpansions.length > 0) {
      result[abbr] = sortedExpansions[0][0];
    }
  }

  return result;
}

function aggregatePictogramTypes(analyses: TrainingAnalysis[]): string[] {
  const allTypes = new Set<string>();

  for (const analysis of analyses) {
    if (analysis.pictogram_types) {
      for (const type of analysis.pictogram_types) {
        allTypes.add(type);
      }
    }
  }

  return Array.from(allTypes).sort();
}

function findMostCommonMainSwitchPosition(analyses: TrainingAnalysis[]): string | null {
  const positionCounts: Record<string, number> = {};

  for (const analysis of analyses) {
    if (analysis.main_switch_position) {
      positionCounts[analysis.main_switch_position] =
        (positionCounts[analysis.main_switch_position] || 0) + 1;
    }
  }

  const sorted = Object.entries(positionCounts).sort((a, b) => b[1] - a[1]);
  return sorted.length > 0 ? sorted[0][0] : null;
}

function analyzeThreePhasePatterns(analyses: TrainingAnalysis[]): {
  frequency: number;
  layout_preference: string | null;
} {
  const threePhaseAnalyses = analyses.filter(a => a.is_three_phase);
  const frequency = threePhaseAnalyses.length / analyses.length;

  if (threePhaseAnalyses.length === 0) {
    return { frequency: 0, layout_preference: null };
  }

  const layoutCounts: Record<string, number> = {};
  for (const analysis of threePhaseAnalyses) {
    if (analysis.phase_layout) {
      layoutCounts[analysis.phase_layout] = (layoutCounts[analysis.phase_layout] || 0) + 1;
    }
  }

  const sorted = Object.entries(layoutCounts).sort((a, b) => b[1] - a[1]);
  return {
    frequency,
    layout_preference: sorted.length > 0 ? sorted[0][0] : null,
  };
}

function aggregateRatings(analyses: TrainingAnalysis[]): string[] {
  const ratingCounts: Record<string, number> = {};

  for (const analysis of analyses) {
    if (analysis.ratings_distribution) {
      for (const [rating, count] of Object.entries(analysis.ratings_distribution)) {
        if (count > 0) {
          ratingCounts[rating] = (ratingCounts[rating] || 0) + count;
        }
      }
    }
  }

  // Sort by total count and return top ratings
  return Object.entries(ratingCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([rating]) => rating);
}

function aggregateDeviceTypes(analyses: TrainingAnalysis[]): Record<string, number> {
  const deviceCounts: Record<string, number> = {};

  for (const analysis of analyses) {
    if (analysis.circuits) {
      for (const circuit of analysis.circuits) {
        if (circuit.device_type) {
          deviceCounts[circuit.device_type] = (deviceCounts[circuit.device_type] || 0) + 1;
        }
      }
    }
  }

  return deviceCounts;
}

async function aggregateKnowledge(manufacturer: string): Promise<AggregatedKnowledge> {
  // Fetch all verified analyses for this manufacturer
  const { data: analyses, error } = await supabase
    .from('board_training_analysis')
    .select('*')
    .ilike('manufacturer', `%${manufacturer}%`)
    .eq('human_verified', true);

  if (error || !analyses || analyses.length === 0) {
    console.log(`No verified analyses found for ${manufacturer}`);
    return {
      main_switch_position: null,
      abbreviations: {},
      pictogram_types: [],
      common_ratings: [],
      typical_devices: {},
      three_phase_info: { frequency: 0, layout_preference: null },
    };
  }

  console.log(`Aggregating ${analyses.length} verified analyses for ${manufacturer}`);

  return {
    main_switch_position: findMostCommonMainSwitchPosition(analyses),
    abbreviations: findCommonAbbreviations(analyses),
    pictogram_types: aggregatePictogramTypes(analyses),
    common_ratings: aggregateRatings(analyses),
    typical_devices: aggregateDeviceTypes(analyses),
    three_phase_info: analyzeThreePhasePatterns(analyses),
  };
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

serve(async (req) => {
  console.log('update-manufacturer-knowledge | ' + new Date().toISOString());

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { manufacturer, analysis_id } = await req.json();

    if (!manufacturer) {
      throw new Error('manufacturer is required');
    }

    console.log(`Updating knowledge for: ${manufacturer}`);

    // Aggregate all verified training data for this manufacturer
    const aggregated = await aggregateKnowledge(manufacturer);

    // Check if manufacturer exists in knowledge base
    const { data: existing } = await supabase
      .from('board_manufacturer_knowledge')
      .select('id, abbreviations, pictogram_guide, three_phase_layout')
      .ilike('manufacturer', `%${manufacturer}%`)
      .limit(1)
      .single();

    if (existing) {
      // Merge with existing knowledge
      const mergedAbbreviations = {
        ...(existing.abbreviations || {}),
        ...aggregated.abbreviations,
      };

      const mergedPictogramGuide = {
        ...(existing.pictogram_guide || {}),
        types_seen: aggregated.pictogram_types,
      };

      const mergedThreePhase = {
        ...(existing.three_phase_layout || {}),
        frequency_in_training: aggregated.three_phase_info.frequency,
        layout_preference: aggregated.three_phase_info.layout_preference ||
          (existing.three_phase_layout as any)?.vertical_layout ? '3P-vertical' : null,
      };

      // Update existing record
      const { error: updateError } = await supabase
        .from('board_manufacturer_knowledge')
        .update({
          abbreviations: mergedAbbreviations,
          pictogram_guide: mergedPictogramGuide,
          three_phase_layout: mergedThreePhase,
          main_switch_position: aggregated.main_switch_position || existing.main_switch_position,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id);

      if (updateError) {
        throw new Error(`Failed to update knowledge: ${updateError.message}`);
      }

      console.log(`Updated knowledge for ${manufacturer}`);

      return new Response(JSON.stringify({
        success: true,
        action: 'updated',
        manufacturer,
        stats: {
          abbreviations_count: Object.keys(mergedAbbreviations).length,
          pictogram_types_count: aggregated.pictogram_types.length,
          common_ratings: aggregated.common_ratings,
        },
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } else {
      // Create new knowledge record
      const newContent = `${manufacturer} board identification patterns learned from training photos. ` +
        `Common ratings: ${aggregated.common_ratings.join(', ')}. ` +
        `Main switch typically on ${aggregated.main_switch_position || 'unknown'} side.`;

      const { error: insertError } = await supabase
        .from('board_manufacturer_knowledge')
        .insert({
          manufacturer,
          main_switch_position: aggregated.main_switch_position,
          abbreviations: aggregated.abbreviations,
          pictogram_guide: { types_seen: aggregated.pictogram_types },
          three_phase_layout: {
            frequency_in_training: aggregated.three_phase_info.frequency,
            layout_preference: aggregated.three_phase_info.layout_preference,
          },
          content: newContent,
          circuit_numbering: 'left-to-right', // Default
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (insertError) {
        throw new Error(`Failed to create knowledge: ${insertError.message}`);
      }

      console.log(`Created new knowledge entry for ${manufacturer}`);

      return new Response(JSON.stringify({
        success: true,
        action: 'created',
        manufacturer,
        stats: {
          abbreviations_count: Object.keys(aggregated.abbreviations).length,
          pictogram_types_count: aggregated.pictogram_types.length,
          common_ratings: aggregated.common_ratings,
        },
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error:', error);

    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
