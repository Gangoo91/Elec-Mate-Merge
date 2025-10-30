/// <reference lib="deno.unstable" />
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { generateEmbeddingWithRetry } from '../_shared/v3-core.ts';

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
          .from('health_safety_intelligence')
          .select('enrichment_version, source_hash')
          .eq('source_id', doc.id)
          .maybeSingle();
        
        if (existing?.enrichment_version === ENRICHMENT_VERSION && existing?.source_hash === contentHash) {
          console.log(`⏭️ Skipping ${doc.id} - already enriched`);
          skipped++;
          continue;
        }

        const extractionPrompt = `Extract practical hazards from this health & safety document for electrical contractors.

DOCUMENT:
${doc.content}

Return JSON object with "hazards" array. Wrap response in {"hazards": [...]}.

RESPONSE FORMAT:
{
  "hazards": [
    {
      "hazard_description": "Clear 20-100 word description",
      "control_measures": ["specific control 1", "specific control 2"],
      "required_ppe": {"type": "specification"}
    }
  ]
}`;

        const response = await callOpenAIWithRetry(openAIKey, extractionPrompt, 'You are a health & safety expert. Extract structured hazard data. Return valid JSON only.');

        if (!response.ok) {
          console.error(`❌ OpenAI error for doc ${doc.id}`);
          failed++;
          continue;
        }

        const aiData = await response.json();
        
        // 📦 FULL RESPONSE DEBUGGING
        console.log(`📦 Full OpenAI response structure for ${doc.id}:`, JSON.stringify(aiData).substring(0, 500));
        console.log(`📊 Response keys:`, Object.keys(aiData));
        
        // Check response structure
        if (!aiData.choices || aiData.choices.length === 0) {
          console.error(`❌ No choices in OpenAI response for ${doc.id}:`, JSON.stringify(aiData));
          failed++;
          continue;
        }
        
        console.log(`📊 Choice[0] keys:`, Object.keys(aiData.choices[0]));
        
        if (!aiData.choices[0].message) {
          console.error(`❌ No message in OpenAI choice for ${doc.id}:`, JSON.stringify(aiData.choices[0]));
          failed++;
          continue;
        }
        
        console.log(`📊 Message keys:`, Object.keys(aiData.choices[0].message));
        
        const message = aiData.choices[0].message;
        
        // Check for refusal (GPT-5 safety feature)
        if (message.refusal) {
          console.error(`❌ OpenAI refused to process doc ${doc.id}:`, message.refusal);
          failed++;
          continue;
        }
        
        const content = message.content;
        
        // Validate content exists and is not empty
        if (!content || content.trim() === '') {
          console.error(`❌ Empty content from OpenAI for ${doc.id}`, {
            finish_reason: aiData.choices[0].finish_reason,
            has_content: !!content,
            content_length: content?.length || 0,
            full_message: JSON.stringify(message)
          });
          failed++;
          continue;
        }
        
        // Debug: Log raw OpenAI response
        console.log(`📋 Raw OpenAI content for ${doc.id} (${content.length} chars):`, content.substring(0, 200));
        
        let hazards;
        
        try {
          const parsed = JSON.parse(content);
          hazards = Array.isArray(parsed) ? parsed : (parsed.hazards || []);
          console.log(`✅ Parsed ${hazards.length} hazards from doc ${doc.id}`);
        } catch (parseError) {
          console.error(`❌ JSON parse error for ${doc.id}:`, parseError.message);
          hazards = [];
        }

        // Validate quality with detailed logging
        const qualityResult = validateQuality(hazards);
        if (!qualityResult.valid) {
          console.warn(`⚠️ Quality check failed for ${doc.id} - ${qualityResult.reason}`);
          qualityFailed++;
          failed++;
          continue;
        }
        console.log(`✅ Quality passed for ${doc.id} - ${hazards.length} hazards extracted`);
        qualityPassed++;

        for (const hazard of hazards) {
          // Generate embedding for hazard description + controls
          const embeddingText = `${hazard.hazard_description} ${hazard.control_measures?.join(' ') || ''}`;
          
          let embedding;
          try {
            embedding = await generateEmbeddingWithRetry(embeddingText, openAIKey);
            
            if (!embedding || embedding.length !== 1536) {
              console.error(`❌ Invalid embedding for hazard: ${hazard.hazard_description.substring(0, 50)}`);
              failed++;
              continue;
            }
          } catch (embError) {
            console.error(`❌ Embedding generation failed for hazard: ${embError}`);
            failed++;
            continue;
          }
          
          await supabase
            .from('health_safety_intelligence')
            .upsert({
              source_id: doc.id,
              hazard_description: hazard.hazard_description || '',
              control_measures: hazard.control_measures || [],
              required_ppe: hazard.required_ppe || {},
              embedding: embedding,
              confidence_score: 0.85,
              enrichment_version: ENRICHMENT_VERSION,
              source_hash: contentHash,
              updated_at: new Date().toISOString()
            }, {
              onConflict: 'source_id,hazard_description'
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
                api_cost_gbp: processed * 0.005,
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

function validateQuality(hazards: any[]): { valid: boolean; reason?: string } {
  if (!hazards || hazards.length === 0) {
    return { valid: false, reason: 'No hazards extracted' };
  }
  
  const first = hazards[0];
  
  // Relaxed validation: Accept if ANY of these conditions are met
  const hasDescription = first.hazard_description?.length >= 5;
  const hasControls = Array.isArray(first.control_measures) && first.control_measures.length >= 1;
  const hasPPE = first.required_ppe && Object.keys(first.required_ppe).length > 0;
  
  if (hasDescription || hasControls || hasPPE) {
    return { valid: true };
  }
  
  return { 
    valid: false, 
    reason: `Insufficient data - desc: ${first.hazard_description?.length || 0} chars, controls: ${first.control_measures?.length || 0}, ppe: ${Object.keys(first.required_ppe || {}).length}`
  };
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
