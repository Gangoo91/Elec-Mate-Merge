/// <reference lib="deno.unstable" />
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from '../_shared/deps.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { generateEmbeddingWithRetry } from '../_shared/v3-core.ts';

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

        const extractionPrompt = `Analyze this health & safety document and extract searchable metadata.

DOCUMENT CONTENT:
${doc.content}

SOURCE INFO:
- Topic: ${doc.topic || 'General H&S'}
- Source: ${doc.source || 'Training material'}

Extract comprehensive metadata to make this content searchable and useful. Return ONLY valid JSON with this exact structure:

{
  "document_type": "workbook|guide|procedure|checklist|regulation|training",
  "primary_topic": "brief topic (e.g., 'PPE Requirements', 'Electrical Safety', 'Risk Assessment')",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "content_summary": "2-3 sentence summary of main content",
  "hazards_mentioned": ["hazard1", "hazard2"] or null if none,
  "control_measures": ["control1", "control2"] or [],
  "required_ppe": {"type": "spec"} or null,
  "search_tags": ["tag1", "tag2", "tag3"]
}

Focus on making this content findable via search. Extract 5-10 keywords and 3-5 search tags.`;

        const response = await callOpenAIWithRetry(openAIKey, extractionPrompt);

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
        
        let intelligence;
        
        try {
          intelligence = JSON.parse(content);
          
          // Validate we got the expected structure
          if (!intelligence.document_type || !intelligence.primary_topic) {
            console.error(`❌ Missing required fields for ${doc.id}:`, {
              has_type: !!intelligence.document_type,
              has_topic: !!intelligence.primary_topic,
              keys: Object.keys(intelligence)
            });
            failed++;
            continue;
          }
          
          console.log(`✅ Extracted intelligence for ${doc.id}: ${intelligence.document_type} - ${intelligence.primary_topic}`);
        } catch (parseError) {
          console.error(`❌ JSON parse error for ${doc.id}:`, parseError.message, content.substring(0, 200));
          failed++;
          continue;
        }

        // Validate quality
        const qualityResult = validateQuality(intelligence);
        if (!qualityResult.valid) {
          console.warn(`⚠️ Quality check failed for ${doc.id} - ${qualityResult.reason}`);
          qualityFailed++;
          failed++;
          continue;
        }
        console.log(`✅ Quality passed for ${doc.id}`);
        qualityPassed++;

        // Generate embedding from combined metadata
        const embeddingText = `${intelligence.document_type} ${intelligence.primary_topic} ${intelligence.keywords?.join(' ') || ''} ${intelligence.content_summary || ''}`;
        
        let embedding;
        try {
          embedding = await generateEmbeddingWithRetry(embeddingText, openAIKey);
          
          if (!embedding || embedding.length !== 1536) {
            console.error(`❌ Invalid embedding for ${doc.id}`);
            failed++;
            continue;
          }
        } catch (embError) {
          console.error(`❌ Embedding generation failed for ${doc.id}: ${embError}`);
          failed++;
          continue;
        }

        // Insert single intelligence record per document
        await supabase
          .from('health_safety_intelligence')
          .upsert({
            source_id: doc.id,
            document_type: intelligence.document_type,
            primary_topic: intelligence.primary_topic,
            keywords: intelligence.keywords || [],
            content_summary: intelligence.content_summary,
            hazards_mentioned: intelligence.hazards_mentioned || [],
            hazard_description: intelligence.hazards_mentioned?.[0] || null,
            control_measures: intelligence.control_measures || [],
            required_ppe: intelligence.required_ppe || null,
            search_tags: intelligence.search_tags || [],
            relevance_score: 0.85,
            embedding: embedding,
            confidence_score: 0.85,
            enrichment_version: ENRICHMENT_VERSION,
            source_hash: contentHash,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'source_id'
          });

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

function validateQuality(intelligence: any): { valid: boolean; reason?: string } {
  if (!intelligence) {
    return { valid: false, reason: 'No data extracted' };
  }
  
  // Check for minimum required metadata
  const hasType = !!intelligence.document_type;
  const hasTopic = !!intelligence.primary_topic;
  const hasKeywords = Array.isArray(intelligence.keywords) && intelligence.keywords.length >= 3;
  const hasSummary = intelligence.content_summary?.length >= 20;
  
  // Must have at least 3 of these 4 core fields
  const score = [hasType, hasTopic, hasKeywords, hasSummary].filter(Boolean).length;
  
  if (score >= 3) {
    return { valid: true };
  }
  
  return { 
    valid: false, 
    reason: `Insufficient metadata - type: ${hasType}, topic: ${hasTopic}, keywords: ${intelligence.keywords?.length || 0}, summary: ${intelligence.content_summary?.length || 0} chars`
  };
}

async function callOpenAIWithRetry(apiKey: string, userPrompt: string, maxRetries = 3) {
  const TIMEOUT_MS = 60000; // 60s per item
  
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
            { role: 'user', content: userPrompt }
          ],
          max_completion_tokens: 800,
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
