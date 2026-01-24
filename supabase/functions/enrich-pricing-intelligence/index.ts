/**
 * Pricing Intelligence Enrichment
 * 
 * Extracts structured metadata from 43,371 pricing documents using GPT-5 Mini
 * 
 * Cost: ~£130 (43,371 docs × £0.003)
 * Time: 16-20 hours (434 batches × 2-3 min/batch)
 */

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from '../_shared/deps.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { callOpenAIWithRetry, hashContent, getCheckpoint, saveCheckpoint } from '../_shared/batch-utils.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

const ENRICHMENT_VERSION = 'v1';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { batchSize = 100, startFrom = 0, jobId } = await req.json();
    
    console.log(`💷 Starting pricing enrichment batch from ${startFrom}, size ${batchSize}`);
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (!openaiApiKey) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    // Fetch pricing documents (ordered by last_scraped with stable ID tie-breaker)
    const { data: pricingDocs, error: fetchError } = await supabase
      .from('pricing_embeddings')
      .select('*')
      .order('last_scraped', { ascending: true, nullsFirst: false })
      .order('id', { ascending: true })
      .range(startFrom, startFrom + batchSize - 1);

    if (fetchError) throw fetchError;
    
    if (!pricingDocs || pricingDocs.length === 0) {
      return new Response(JSON.stringify({ 
        success: true, 
        processed: 0, 
        message: 'No more pricing documents' 
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    console.log(`📦 Processing ${pricingDocs.length} pricing documents`);

    // Check for checkpoint  using shared utility
    const resumeFromId = await getCheckpoint(supabase, jobId, Math.floor(startFrom / batchSize));
    let startIndex = resumeFromId ? pricingDocs.findIndex(d => d.id === resumeFromId) + 1 : 0;
    
    console.log(resumeFromId ? `▶️ Resuming from checkpoint at doc ${startIndex}` : '🆕 Starting fresh batch');

    let processed = 0, failed = 0, qualityPassed = 0, qualityFailed = 0, skipped = 0, totalProcessingTime = 0;

    for (let i = startIndex; i < pricingDocs.length; i++) {
      const doc = pricingDocs[i];
      const docStartTime = Date.now();
      
      try {
        // Check if already enriched
        const contentHash = await hashContent(doc.item_name + doc.category + doc.base_cost);
        const { data: existing } = await supabase
          .from('pricing_intelligence')
          .select('enrichment_version, source_hash')
          .eq('pricing_id', doc.id)
          .maybeSingle();
        
        if (existing?.enrichment_version === ENRICHMENT_VERSION && existing?.source_hash === contentHash) {
          console.log(`⏭️ Skipping ${doc.id} - already enriched`);
          skipped++;
          continue;
        }

        // Enrichment prompt for GPT-5 Mini
        const enrichmentPrompt = `Analyze this electrical product and extract structured metadata:

PRODUCT: ${doc.item_name}
CATEGORY: ${doc.category}
PRICE: £${doc.base_cost}
WHOLESALER: ${doc.wholesaler}
ADDITIONAL INFO: ${doc.content || 'N/A'}

Extract:
{
  "product_category": "cables | consumer_units | lighting | switches | accessories | tools | safety_equipment | testing_equipment",
  "product_subcategory": "specific type (e.g., twin_earth, rcbo, led)",
  "typical_use_cases": ["residential_rewire", "commercial_fit_out", etc.],
  "compatibility_notes": "What it works with/replaces",
  "installation_complexity": "simple | medium | complex",
  "installation_time_estimate_mins": estimated minutes,
  "regional_availability": ["london", "nationwide", etc.],
  "typical_lead_time_days": estimated days,
  "bulk_discount_available": true/false,
  "bulk_discount_threshold": minimum quantity,
  "bs_standards_compliance": ["BS 7671:2018+A3:2024", etc.],
  "required_for_compliance": ["Part P", "Building Regs", etc.],
  "quality_rating": "budget | standard | premium",
  "common_failure_modes": ["connection_loose", etc.],
  "maintenance_requirements": "description"
}

Return valid JSON only.`;

        // Call GPT-5 Mini with retry + timeout using shared utility
        let enriched;
        try {
          enriched = await callOpenAIWithRetry(
            enrichmentPrompt,
            openaiApiKey,
            'gpt-5-mini-2025-08-07',
            doc.id,
            1000
          );
        } catch (aiError) {
          console.error(`❌ AI call failed for ${doc.id} after retries:`, aiError);
          failed++;
          continue;
        }

        // Validate quality
        if (!validatePricingQuality(enriched)) {
          console.warn(`⚠️ Quality check failed for ${doc.id}`);
          qualityFailed++;
          failed++;
          continue;
        }
        qualityPassed++;

        // Insert enriched data
        const { error: insertError } = await supabase
          .from('pricing_intelligence')
          .upsert({
            pricing_id: doc.id,
            product_category: enriched.product_category,
            product_subcategory: enriched.product_subcategory,
            typical_use_cases: enriched.typical_use_cases || [],
            compatibility_notes: enriched.compatibility_notes,
            installation_complexity: enriched.installation_complexity,
            installation_time_estimate_mins: enriched.installation_time_estimate_mins,
            regional_availability: enriched.regional_availability || [],
            typical_lead_time_days: enriched.typical_lead_time_days,
            bulk_discount_available: enriched.bulk_discount_available || false,
            bulk_discount_threshold: enriched.bulk_discount_threshold,
            bs_standards_compliance: enriched.bs_standards_compliance || [],
            required_for_compliance: enriched.required_for_compliance || [],
            quality_rating: enriched.quality_rating,
            common_failure_modes: enriched.common_failure_modes || [],
            maintenance_requirements: enriched.maintenance_requirements,
            enrichment_version: ENRICHMENT_VERSION,
            source_hash: contentHash,
            confidence_score: 0.85
          }, {
            onConflict: 'pricing_id'
          });

        if (insertError) {
          console.error(`❌ Insert error for ${doc.id}:`, insertError);
          failed++;
          continue;
        }

        processed++;
        const docProcessingTime = Date.now() - docStartTime;
        totalProcessingTime += docProcessingTime;
        
        // Save checkpoint every 5 docs using shared utility
        if ((i + 1) % 5 === 0 || i === pricingDocs.length - 1) {
          await saveCheckpoint(
            supabase,
            jobId,
            Math.floor(startFrom / batchSize),
            doc.id,
            startFrom + i + 1,
            {
              quality_passed: qualityPassed,
              quality_failed: qualityFailed,
              avg_processing_time_ms: totalProcessingTime / (i - startIndex + 1),
              api_cost_gbp: (i - startIndex + 1) * 0.003
            }
          );
        }
        
      } catch (error) {
        console.error(`❌ Error processing ${doc.id}:`, error);
        failed++;
      }
    }

    console.log(`✅ Processed ${processed}/${pricingDocs.length} (${failed} failed, ${skipped} skipped, ${qualityPassed} quality passed)`);

    return new Response(JSON.stringify({ 
      success: true,
      processed,
      failed,
      skipped,
      qualityPassed,
      qualityFailed,
      nextStartFrom: startFrom + batchSize,
      hasMore: pricingDocs.length === batchSize
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ Fatal error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

// Removed - using shared utility from batch-utils.ts

function validatePricingQuality(enriched: any): boolean {
  return enriched.product_category?.length > 0 &&
         ['cables', 'consumer_units', 'lighting', 'switches', 'accessories', 'tools', 'safety_equipment', 'testing_equipment'].includes(enriched.product_category) &&
         enriched.installation_complexity &&
         ['simple', 'medium', 'complex'].includes(enriched.installation_complexity);
}