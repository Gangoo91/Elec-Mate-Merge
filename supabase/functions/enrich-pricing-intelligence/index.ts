/**
 * Pricing Intelligence Enrichment
 * 
 * Extracts structured metadata from 43,371 pricing documents using GPT-5 Mini
 * 
 * Cost: ~£130 (43,371 docs × £0.003)
 * Time: 16-20 hours (434 batches × 2-3 min/batch)
 */

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // Check for checkpoint
    const { data: checkpoint } = await supabase
      .from('batch_progress')
      .select('last_checkpoint')
      .eq('job_id', jobId)
      .eq('batch_number', Math.floor(startFrom / batchSize))
      .maybeSingle();
    
    const resumeFromId = checkpoint?.last_checkpoint?.last_processed_id;
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
  "bs_standards_compliance": ["BS 7671:2018+A2:2022", etc.],
  "required_for_compliance": ["Part P", "Building Regs", etc.],
  "quality_rating": "budget | standard | premium",
  "common_failure_modes": ["connection_loose", etc.],
  "maintenance_requirements": "description"
}

Return valid JSON only.`;

        // Call GPT-5 Mini with retry + timeout
        let enriched;
        try {
          enriched = await callOpenAIWithRetry(enrichmentPrompt, openaiApiKey, doc.id);
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
        
        // Save checkpoint every 25 docs
        if ((i + 1) % 25 === 0 || i === pricingDocs.length - 1) {
          await supabase.from('batch_progress').update({
            last_checkpoint: {
              last_processed_id: doc.id,
              processed_count: i + 1,
              timestamp: new Date().toISOString()
            },
            items_processed: startFrom + i + 1,
            data: {
              quality_passed: qualityPassed,
              quality_failed: qualityFailed,
              avg_processing_time_ms: totalProcessingTime / (i - startIndex + 1),
              api_cost_gbp: (i - startIndex + 1) * 0.003,
              last_updated: new Date().toISOString()
            }
          }).eq('job_id', jobId).eq('batch_number', Math.floor(startFrom / batchSize));
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

/**
 * Call OpenAI with timeout (60s) and retry (3 attempts)
 */
async function callOpenAIWithRetry(prompt: string, apiKey: string, docId: string, attempt = 1): Promise<any> {
  const MAX_RETRIES = 3;
  const TIMEOUT_MS = 60000; // 60s per item
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        messages: [{
          role: 'system',
          content: 'You are an electrical product expert. Extract structured metadata from product descriptions. Return valid JSON only.'
        }, {
          role: 'user',
          content: prompt
        }],
        response_format: { type: "json_object" },
        max_completion_tokens: 1000,
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error ${response.status}: ${errorText}`);
    }

    const aiData = await response.json();
    const content = aiData.choices[0].message.content;
    
    try {
      return JSON.parse(content);
    } catch (parseError) {
      if (attempt < MAX_RETRIES) {
        console.warn(`⚠️ Parse error for ${docId}, retry ${attempt}/${MAX_RETRIES}`);
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)));
        return callOpenAIWithRetry(prompt, apiKey, docId, attempt + 1);
      }
      throw new Error(`JSON parse failed after ${MAX_RETRIES} attempts`);
    }
    
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (attempt < MAX_RETRIES && (error.name === 'AbortError' || error.message.includes('rate limit') || error.message.includes('timeout'))) {
      const delay = 1000 * Math.pow(2, attempt - 1);
      console.warn(`⚠️ Retry ${attempt}/${MAX_RETRIES} for ${docId} after ${delay}ms (${error.message})`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return callOpenAIWithRetry(prompt, apiKey, docId, attempt + 1);
    }
    
    throw error;
  }
}

async function hashContent(content: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function validatePricingQuality(enriched: any): boolean {
  return enriched.product_category?.length > 0 &&
         ['cables', 'consumer_units', 'lighting', 'switches', 'accessories', 'tools', 'safety_equipment', 'testing_equipment'].includes(enriched.product_category) &&
         enriched.installation_complexity &&
         ['simple', 'medium', 'complex'].includes(enriched.installation_complexity);
}