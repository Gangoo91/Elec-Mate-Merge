/// <reference lib="deno.unstable" />
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

    const { data: documents, error: fetchError} = await supabase
      .from('health_safety_knowledge')
      .select('*')
      .range(startFrom, startFrom + batchSize - 1)
      .order('created_at', { ascending: true });

    if (fetchError) throw fetchError;
    if (!documents || documents.length === 0) {
      return new Response(JSON.stringify({ 
        success: true, 
        processed: 0, 
        message: 'No more documents' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log(`📄 Processing ${documents.length} health & safety documents`);

    // Check for checkpoint
    const { data: checkpoint } = await supabase
      .from('batch_progress')
      .select('last_checkpoint')
      .eq('job_id', jobId)
      .eq('batch_number', Math.floor(startFrom / batchSize))
      .maybeSingle();
    
    const resumeFromId = checkpoint?.last_checkpoint?.last_processed_id;
    let startIndex = resumeFromId ? documents.findIndex(d => d.id === resumeFromId) + 1 : 0;
    
    console.log(resumeFromId ? `▶️ Resuming from checkpoint at doc ${startIndex}` : '🆕 Starting fresh batch');

    let processed = 0, failed = 0, qualityPassed = 0, qualityFailed = 0, skipped = 0, totalProcessingTime = 0;

    for (let i = startIndex; i < documents.length; i++) {
      const doc = documents[i];
      const docStartTime = Date.now();
      
      try {
        // Check if already enriched
        const contentHash = await hashContent(doc.content);
        const { data: existing } = await supabase
          .from('regulation_hazards_extracted')
          .select('enrichment_version, source_hash')
          .eq('source_id', doc.id)
          .eq('source_document', 'health_safety_knowledge')
          .maybeSingle();
        
        if (existing?.enrichment_version === ENRICHMENT_VERSION && existing?.source_hash === contentHash) {
          console.log(`⏭️ Skipping ${doc.id} - already enriched`);
          skipped++;
          continue;
        }

        const extractionPrompt = `Extract all electrical safety hazards from this document.

DOCUMENT:
${doc.content}

Return JSON array:
[{
  "hazard_type": "electrical_shock | arc_flash | mechanical | chemical",
  "hazard_description": "Clear description",
  "severity": "low | medium | high | critical",
  "likelihood": "rare | unlikely | possible | likely",
  "control_measures": ["control1"],
  "ppe_required": ["ppe1"],
  "regulations_cited": ["regulation1"]
}]`;

        const response = await callOpenAIWithRetry(openAIKey, extractionPrompt, 'You are a health & safety expert. Extract structured hazard data. Return valid JSON only.');

        if (!response.ok) {
          console.error(`❌ OpenAI error for doc ${doc.id}`);
          failed++;
          continue;
        }

        const aiData = await response.json();
        const content = aiData.choices[0].message.content;
        let hazards;
        
        try {
          const parsed = JSON.parse(content);
          hazards = Array.isArray(parsed) ? parsed : (parsed.hazards || []);
        } catch {
          hazards = [];
        }

        // Validate quality
        if (!validateQuality(hazards)) {
          console.warn(`⚠️ Quality check failed for ${doc.id}`);
          qualityFailed++;
          failed++;
          continue;
        }
        qualityPassed++;

        for (const hazard of hazards) {
          await supabase
            .from('regulation_hazards_extracted')
            .upsert({
              regulation_number: 'H&S-' + doc.id.substring(0, 8),
              section: doc.topic || 'Health & Safety',
              hazard_type: hazard.hazard_type || 'general',
              hazard_description: hazard.hazard_description || '',
              severity: hazard.severity || 'medium',
              likelihood: hazard.likelihood || 'possible',
              control_measures: hazard.control_measures || [],
              ppe_required: hazard.ppe_required || [],
              regulations_cited: hazard.regulations_cited || [],
              confidence_score: 0.85,
              source_document: 'health_safety_knowledge',
              source_id: doc.id,
              enrichment_version: ENRICHMENT_VERSION,
              source_hash: contentHash
            }, {
              onConflict: 'regulation_number,hazard_description'
            });
        }

        processed++;
        const docProcessingTime = Date.now() - docStartTime;
        totalProcessingTime += docProcessingTime;
        
        // Save checkpoint every 25 docs
        if ((i + 1) % 25 === 0 || i === documents.length - 1) {
          await supabase
            .from('batch_progress')
            .update({
              last_checkpoint: {
                last_processed_id: doc.id,
                processed_count: i + 1,
                timestamp: new Date().toISOString()
              },
              items_processed: startFrom + i + 1,
              status: 'processing',
              data: {
                quality_passed: qualityPassed,
                quality_failed: qualityFailed,
                skipped,
                avg_processing_time_ms: totalProcessingTime / processed,
                api_cost_gbp: processed * 0.004,
                last_updated: new Date().toISOString()
              }
            })
            .eq('job_id', jobId)
            .eq('batch_number', Math.floor(startFrom / batchSize));
        }

        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error) {
        console.error(`❌ Error processing doc ${doc.id}:`, error);
        failed++;
      }
    }

    console.log(`✅ Batch ${batchNumber} complete: ${processed}/${documents.length} (${failed} failed, ${skipped} skipped, ${qualityPassed} quality passed)`);

    // Mark as completed
    await supabase
      .from('batch_progress')
      .update({ 
        status: 'completed',
        items_processed: startFrom + documents.length,
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

async function hashContent(content: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function validateQuality(hazards: any[]): boolean {
  if (!hazards || hazards.length === 0) return false;
  const first = hazards[0];
  return first.hazard_description?.length > 20 && 
         first.control_measures?.length > 0;
}

async function callOpenAIWithRetry(apiKey: string, userPrompt: string, systemPrompt: string, maxRetries = 3) {
  const TIMEOUT_MS = 60000; // 60s per item (increased from 30s)
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
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
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          max_completion_tokens: 1000,
          response_format: { type: "json_object" }
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response;
      
    } catch (error) {
      clearTimeout(timeoutId);
      console.warn(`⚠️ OpenAI call attempt ${attempt + 1}/${maxRetries} failed:`, error.message);
      
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
      } else {
        throw error;
      }
    }
  }
}
