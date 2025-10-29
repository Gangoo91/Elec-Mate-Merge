/**
 * Offline Regulation Enrichment Pipeline - UPGRADED with GPT-5 Mini
 * 
 * Extracts structured hazards from raw BS 7671 regulations
 * Now includes: checkpoints, quality validation, incremental enrichment
 * 
 * Cost: ~£4 one-time (2,557 regs × £0.0017), ~£1/quarter for updates
 */

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';

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
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { batchSize = 50, startFrom = 0, jobId } = await req.json().catch(() => ({}));
    
    console.log(`🚀 Starting enrichment: batch=${batchSize}, startFrom=${startFrom}, jobId=${jobId}`);
    
    // Fetch batch of regulations
    const { data: regulations, error: fetchError } = await supabase
      .from('bs7671_embeddings')
      .select('*')
      .order('created_at', { ascending: true })
      .range(startFrom, startFrom + batchSize - 1);
    
    if (fetchError) throw fetchError;
    
    if (!regulations || regulations.length === 0) {
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'No regulations to process',
        processed: 0
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Check for checkpoint to resume from
    const { data: checkpoint } = await supabase
      .from('batch_progress')
      .select('last_checkpoint')
      .eq('job_id', jobId)
      .eq('batch_number', Math.floor(startFrom / batchSize))
      .maybeSingle();
    
    const resumeFromId = checkpoint?.last_checkpoint?.last_processed_id;
    let startIndex = resumeFromId ? regulations.findIndex(r => r.id === resumeFromId) + 1 : 0;
    
    console.log(resumeFromId ? `▶️ Resuming from checkpoint at reg ${startIndex}` : '🆕 Starting fresh batch');
    
    let processed = 0, failed = 0, qualityPassed = 0, qualityFailed = 0, skipped = 0;
    let totalProcessingTime = 0;
    
    for (let i = startIndex; i < regulations.length; i++) {
      const reg = regulations[i];
      const regStartTime = Date.now();
      
      console.log(`\n📖 [${i + 1}/${regulations.length}] Processing: ${reg.regulation_number}`);
      
      try {
        // Check if already enriched with current version
        const contentHash = await hashContent(reg.content);
        const { data: existing } = await supabase
          .from('regulation_hazards_extracted')
          .select('enrichment_version, source_hash')
          .eq('regulation_id', reg.id)
          .limit(1);
        
        if (existing && existing.length > 0) {
          const first = existing[0];
          if (first.enrichment_version === ENRICHMENT_VERSION && first.source_hash === contentHash) {
            console.log(`⏭️ Skipping ${reg.regulation_number} - already enriched`);
            skipped++;
            continue;
          }
        }
        
        // Extract hazards using GPT-5 Mini
        const extraction = await extractHazardsWithGPT5Mini(reg, OPENAI_API_KEY);
        
        if (!extraction || !extraction.hazards || extraction.hazards.length === 0) {
          console.log(`⚠️ No hazards extracted from ${reg.regulation_number}`);
          qualityFailed++;
          failed++;
          continue;
        }
        
        // Quality validation
        if (!validateRegulationQuality(extraction.hazards)) {
          console.warn(`⚠️ Quality check failed for ${reg.regulation_number}`);
          qualityFailed++;
          failed++;
          continue;
        }
        qualityPassed++;
        
        console.log(`✅ Extracted ${extraction.hazards.length} hazards (quality passed)`);
        
        // Delete old enrichments if updating
        if (existing && existing.length > 0) {
          await supabase
            .from('regulation_hazards_extracted')
            .delete()
            .eq('regulation_id', reg.id);
        }
        
        // Insert each hazard
        for (const hazard of extraction.hazards) {
          const embedding = await generateEmbedding(hazard.description, OPENAI_API_KEY);
          
          const { error: insertError } = await supabase
            .from('regulation_hazards_extracted')
            .insert({
              regulation_id: reg.id,
              hazard_description: hazard.description,
              hazard_category: hazard.category,
              likelihood: hazard.likelihood,
              severity: hazard.severity,
              control_measures: hazard.controls || [],
              control_hierarchy: hazard.controlHierarchy || 'engineering',
              required_ppe: hazard.ppe || [],
              applies_to_work_types: hazard.workTypes || ['domestic', 'commercial'],
              applies_to_locations: hazard.locations || ['general'],
              applies_to_equipment: hazard.equipment || [],
              applies_to_installation_phases: hazard.phases || ['installation'],
              regulation_number: reg.regulation_number,
              regulation_section: reg.section,
              regulation_excerpt: extractExcerpt(reg.content, hazard.description),
              hazard_embedding: embedding,
              confidence_score: 0.95,
              enrichment_version: ENRICHMENT_VERSION,
              source_hash: contentHash
            });
          
          if (insertError) {
            console.error(`❌ Insert error for hazard:`, insertError);
            failed++;
          }
        }
        
        processed++;
        const regProcessingTime = Date.now() - regStartTime;
        totalProcessingTime += regProcessingTime;
        
        // Save checkpoint every 25 docs
        if ((i + 1) % 25 === 0 || i === regulations.length - 1) {
          await supabase.from('batch_progress').update({
            last_checkpoint: {
              last_processed_id: reg.id,
              processed_count: i + 1,
              timestamp: new Date().toISOString()
            },
            items_processed: startFrom + i + 1,
            data: {
              quality_passed: qualityPassed,
              quality_failed: qualityFailed,
              avg_processing_time_ms: totalProcessingTime / (i - startIndex + 1),
              api_cost_gbp: (i - startIndex + 1) * 0.0017,
              last_updated: new Date().toISOString()
            }
          }).eq('job_id', jobId).eq('batch_number', Math.floor(startFrom / batchSize));
        }
        
      } catch (error) {
        console.error(`❌ Error processing ${reg.regulation_number}:`, error);
        failed++;
      }
    }
    
    console.log(`\n✅ Batch complete: ${processed} processed, ${failed} failed, ${skipped} skipped, ${qualityPassed} quality passed`);
    
    return new Response(JSON.stringify({
      success: true,
      processed,
      failed,
      skipped,
      qualityPassed,
      qualityFailed,
      total: regulations.length,
      nextStartFrom: startFrom + batchSize,
      hasMore: regulations.length === batchSize
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('❌ Enrichment pipeline error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

/**
 * Extract hazards using GPT-5 Mini via direct OpenAI API
 */
async function extractHazardsWithGPT5Mini(regulation: any, apiKey: string) {
  const prompt = `Analyze this electrical regulation and extract ALL potential hazards:

${regulation.regulation_number}: ${regulation.section}
${regulation.content}

For EACH hazard, provide:
1. Hazard description (specific, actionable, 10-20 words)
2. Category (electrical, physical, chemical, environmental, human_factors)
3. Likelihood (1-5 scale)
4. Severity (1-5 scale)
5. Control measures (array of specific actions, BS 7671 compliant)
6. Control hierarchy (engineering, administrative, ppe)
7. Required PPE with standards (array of objects: {type, standard, mandatory, purpose})
8. Work types this applies to (domestic, commercial, industrial)
9. Locations this applies to (bathroom, kitchen, outdoor, garage, general)
10. Equipment this applies to (consumer_unit, shower, ev_charger, socket, lighting, cooker, heating)
11. Installation phases this applies to (site_survey, isolation, installation, testing, commissioning)

Return as JSON: { hazards: [{ description, category, likelihood, severity, controls, controlHierarchy, ppe, workTypes, locations, equipment, phases }] }

Be exhaustive. Extract 3-8 hazards per regulation. Focus on electrical safety hazards.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-5-mini-2025-08-07',
      messages: [{ role: 'user', content: prompt }],
      max_completion_tokens: 4000,
      response_format: { type: 'json_object' }
    })
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GPT-5 Mini API error: ${response.status} - ${error}`);
  }
  
  const data = await response.json();
  const content = data.choices[0].message.content;
  
  try {
    return JSON.parse(content);
  } catch {
    console.error('Failed to parse GPT-5 Mini response:', content);
    return { hazards: [] };
  }
}

/**
 * Validate quality of extracted hazards
 */
function validateRegulationQuality(hazards: any[]): boolean {
  if (!hazards || hazards.length === 0) return false;
  const first = hazards[0];
  return first.description?.length > 20 &&
         ['electrical', 'physical', 'chemical', 'environmental', 'human_factors'].includes(first.category) &&
         Array.isArray(first.controls) && first.controls.length > 0;
}

/**
 * Generate embedding for text
 */
async function generateEmbedding(text: string, apiKey: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'text-embedding-ada-002',
      input: text
    })
  });
  
  if (!response.ok) {
    throw new Error(`Embedding API error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.data[0].embedding;
}

/**
 * Hash content for change detection
 */
async function hashContent(content: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Extract relevant excerpt from regulation content
 */
function extractExcerpt(content: string, hazardDesc: string): string {
  return content.substring(0, 500);
}