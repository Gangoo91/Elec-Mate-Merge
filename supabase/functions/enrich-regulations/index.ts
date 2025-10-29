/**
 * Universal Regulation Intelligence Enrichment
 * Extracts RAG metadata from BS 7671 regulations for ALL agents
 * Target table: regulations_intelligence (not hazards!)
 */

/// <reference lib="deno.unstable" />
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
    const { batchSize = 50, startFrom = 0, jobId } = await req.json();
    const batchNumber = Math.floor(startFrom / batchSize);
    
    console.log(`🚀 Starting background job: ${jobId}, batch ${batchNumber}`);
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openAIKey = Deno.env.get('OPENAI_API_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Create initial progress record
    await supabase
      .from('batch_progress')
      .upsert({
        job_id: jobId,
        batch_number: batchNumber,
        status: 'processing',
        items_processed: startFrom,
        data: { message: 'Job started in background' }
      });
    
    // Start background processing (fire-and-forget)
    EdgeRuntime.waitUntil(
      processInBackground(supabase, openAIKey, jobId, batchSize, startFrom, batchNumber)
    );
    
    // Return immediately
    return new Response(JSON.stringify({ 
      success: true,
      message: 'Job started in background',
      jobId,
      batchNumber,
      startFrom
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('❌ Failed to start job:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

// Background worker function
async function processInBackground(
  supabase: any,
  openAIKey: string,
  jobId: string,
  batchSize: number,
  startFrom: number,
  batchNumber: number
) {
  console.log(`🔄 Background processing started: batch ${batchNumber}`);
  
  try {
    
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

    // Check for checkpoint
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
        // Check if already enriched
        const contentHash = await hashContent(reg.content);
        const { data: existing } = await supabase
          .from('regulations_intelligence')
          .select('enrichment_version, source_hash')
          .eq('regulation_id', reg.id)
          .maybeSingle();
        
        if (existing?.enrichment_version === ENRICHMENT_VERSION && existing?.source_hash === contentHash) {
          console.log(`⏭️ Skipping ${reg.regulation_number} - already enriched`);
          skipped++;
          continue;
        }
        
        // Extract intelligence using GPT-5 Mini
        const intelligence = await extractRegulationIntelligence(reg, OPENAI_API_KEY);
        
        if (!intelligence || !validateIntelligence(intelligence)) {
          console.log(`⚠️ Failed quality check for ${reg.regulation_number}`);
          qualityFailed++;
          failed++;
          continue;
        }
        
        qualityPassed++;
        console.log(`✅ Extracted intelligence for ${reg.regulation_number} (quality passed)`);
        
        // Upsert intelligence
        const { error: insertError } = await supabase
          .from('regulations_intelligence')
          .upsert({
            regulation_id: reg.id,
            regulation_number: reg.regulation_number,
            keywords: intelligence.keywords || [],
            category: intelligence.category,
            subcategory: intelligence.subcategory,
            technical_level: intelligence.technical_level,
            primary_topic: intelligence.primary_topic,
            related_regulations: intelligence.related_regulations || [],
            applies_to: intelligence.applies_to || [],
            confidence_score: 0.90,
            enrichment_version: ENRICHMENT_VERSION,
            source_hash: contentHash,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'regulation_id,enrichment_version'
          });
        
        if (insertError) {
          console.error(`❌ Insert error:`, insertError);
          failed++;
          continue;
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
              api_cost_gbp: (i - startIndex + 1) * 0.0015,
              last_updated: new Date().toISOString()
            }
          }).eq('job_id', jobId).eq('batch_number', Math.floor(startFrom / batchSize));
        }
        
      } catch (error) {
        console.error(`❌ Error processing ${reg.regulation_number}:`, error);
        failed++;
      }
    }
    
    console.log(`✅ Batch ${batchNumber} complete: ${processed} processed, ${failed} failed, ${skipped} skipped, ${qualityPassed} quality passed`);
    
    // Mark as completed
    await supabase
      .from('batch_progress')
      .update({ 
        status: 'completed',
        items_processed: startFrom + regulations.length,
        data: { 
          processed, 
          failed, 
          skipped, 
          qualityPassed, 
          qualityFailed,
          avg_processing_time_ms: totalProcessingTime / processed,
          completed_at: new Date().toISOString()
        }
      })
      .eq('job_id', jobId)
      .eq('batch_number', batchNumber);
    
    console.log(`✅ Background processing completed: batch ${batchNumber}`);
    
  } catch (error) {
    console.error(`❌ Background processing failed: batch ${batchNumber}`, error);
    
    // Mark as failed
    await supabase
      .from('batch_progress')
      .update({ 
        status: 'failed',
        data: { error: error.message, failed_at: new Date().toISOString() }
      })
      .eq('job_id', jobId)
      .eq('batch_number', batchNumber);
  }
}

/**
 * Extract universal RAG intelligence from regulation
 */
async function extractRegulationIntelligence(regulation: any, apiKey: string) {
  const prompt = `Extract RAG metadata from this electrical regulation for intelligent search.

REGULATION:
${regulation.regulation_number}: ${regulation.section}
${regulation.content}

Return JSON:
{
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "category": "Protection | Installation | Testing | Design | Equipment | Safety | Earthing | Cables | Circuits",
  "subcategory": "Specific topic within category",
  "technical_level": 1-5,
  "primary_topic": "One sentence summary of what this regulation covers",
  "related_regulations": ["522.8", "433.1.1"],
  "applies_to": ["domestic", "commercial", "industrial"]
}

Return ONLY valid JSON.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-5-mini-2025-08-07',
      messages: [{ role: 'user', content: prompt }],
      max_completion_tokens: 1000,
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
    return null;
  }
}

/**
 * Validate intelligence quality
 */
function validateIntelligence(intelligence: any): boolean {
  if (!intelligence) return false;
  return intelligence.keywords?.length >= 3 &&
         intelligence.category?.length > 0 &&
         intelligence.primary_topic?.length > 20 &&
         intelligence.technical_level >= 1 &&
         intelligence.technical_level <= 5;
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
