/// <reference lib="deno.unstable" />
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
  console.log(`🚀 processInBackground STARTED: jobId=${jobId}, batch=${batchNumber}, startFrom=${startFrom}`);
  
  let claimedBatch: any = null;
  
  try {
    console.log(`🔄 Background processing started: batch ${batchNumber}`);
  
    // Atomically claim next pending batch
    const { data: pendingBatches } = await supabase
      .from('batch_progress')
      .select('id, batch_number, data')
      .eq('job_id', jobId)
      .eq('status', 'pending')
      .order('batch_number', { ascending: true })
      .limit(1);
    
    if (!pendingBatches || pendingBatches.length === 0) {
      console.log('✅ No more pending batches for this job');
      return;
    }
    
    claimedBatch = pendingBatches[0];
    
    // Claim the batch atomically
    const { data: claimRows, error: claimError } = await supabase
      .from('batch_progress')
      .update({ status: 'processing', started_at: new Date().toISOString() })
      .eq('id', claimedBatch.id)
      .eq('status', 'pending')
      .select('id');
    
    if (claimError) throw claimError;
    if (!claimRows || claimRows.length === 0) {
      console.log('⚠️ Batch already claimed by another worker');
      return;
    }
    
    console.log(`✅ Claimed batch ${claimedBatch.batch_number} (${claimedBatch.id})`);
    
    // Fetch practical work records
    const { data: items, error: fetchError } = await supabase
      .from('practical_work')
      .select('*')
      .eq('is_canonical', true)
      .range(startFrom, startFrom + batchSize - 1);
    
    if (fetchError) throw fetchError;
    
    if (!items || items.length === 0) {
      console.log('✅ No items to process');
      await supabase.from('batch_progress').update({
        status: 'completed',
        items_processed: 0,
        completed_at: new Date().toISOString()
      }).eq('id', claimedBatch.id);
      return;
    }

    console.log(`📦 Batch ${claimedBatch.batch_number}: ${items.length} practical work items`);
    
    let processed = 0, failed = 0;
    
    // Enhanced heartbeat with console logging every 15s
    const heartbeat = setInterval(async () => {
      try {
        const currentItem = processed < items.length ? items[processed].id : 'complete';
        console.log(`💓 HEARTBEAT: batch ${claimedBatch.batch_number} - processing ${currentItem} (${processed}/${items.length})`);
        
        await supabase.from('batch_progress').update({
          items_processed: processed,
          data: { 
            processed, 
            failed,
            last_heartbeat: new Date().toISOString()
          }
        }).eq('id', claimedBatch.id);
      } catch (e) {
        console.error('❌ Heartbeat failed:', e);
      }
    }, 15000);
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      console.log(`\n📖 [${i + 1}/${items.length}] Processing: ${item.id}`);
      
      try {
        await enrichPracticalWorkPrimary(supabase, item, openAIKey);
        processed++;
        
        // Update progress every 5 items
        if ((i + 1) % 5 === 0 || i === items.length - 1) {
          await supabase.from('batch_progress').update({
            items_processed: processed,
            data: { 
              processed, 
              failed,
              last_updated: new Date().toISOString()
            }
          }).eq('id', claimedBatch.id);
        }
        
      } catch (error) {
        console.error(`❌ Error processing ${item.id}:`, error.message);
        failed++;
      }
    }
    
    // Clear heartbeat timer
    clearInterval(heartbeat);
    
    console.log(`✅ Batch ${claimedBatch.batch_number} complete: ${processed} processed, ${failed} failed`);
    
    // Mark as completed
    await supabase
      .from('batch_progress')
      .update({ 
        status: 'completed',
        items_processed: processed,
        data: { 
          processed, 
          failed,
          completed_at: new Date().toISOString()
        }
      })
      .eq('id', claimedBatch.id);
    
    console.log(`✅ Background processing completed: batch ${claimedBatch.batch_number}`);
    
  } catch (error) {
    console.error(`❌ CRITICAL ERROR in processInBackground:`, {
      jobId,
      batchNumber,
      startFrom,
      errorName: error.name,
      errorMessage: error.message,
      errorStack: error.stack?.substring(0, 500)
    });
    
    // Mark as failed with detailed error info
    if (claimedBatch?.id) {
      await supabase
        .from('batch_progress')
        .update({ 
          status: 'failed',
          data: { 
            error: error.message,
            error_type: error.name,
            failed_at: new Date().toISOString(),
            stack_trace: error.stack?.substring(0, 500)
          }
        })
        .eq('id', claimedBatch.id);
    }
    
    throw error;
  }
}

/**
 * Enrich a single practical work item
 */
async function enrichPracticalWorkPrimary(supabase: any, item: any, openAIKey: string) {
  const { id, content, description, cluster_id, source_tables } = item;
  
  // Check if already enriched
  const { data: existing } = await supabase
    .from('practical_work_intelligence')
    .select('id')
    .eq('practical_work_id', id)
    .eq('facet_type', 'primary')
    .limit(1);
  
  if (existing && existing.length > 0) {
    console.log(`⏭️ Already enriched: ${id} - skipping`);
    return;
  }

  // Build enrichment prompt (UK English)
  const prompt = `You are a BS 7671 electrical installation expert. Analyse this practical work procedure and extract structured intelligence using UK English.

PROCEDURE:
${content || description}

Extract the following fields:
1. activity_types: Array of applicable types ["installation", "maintenance", "testing", "inspection", "fault_diagnosis"]
2. equipment_category: Main category (e.g., "Consumer Units", "Cables", "Socket Outlets")
3. equipment_subcategory: Specific type
4. bs7671_zones: Array of applicable zones ["Zone 0", "Zone 1", "Zone 2", "Outside Zones"]
5. technical_complexity: 1-5 scale
6. risk_level: "low" | "medium" | "high" | "critical"
7. common_tools: Array of tools required
8. ppe_required: Array of PPE items

Return ONLY valid JSON with these exact fields.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-5-mini-2025-08-07',
      messages: [{ role: 'user', content: prompt }],
      max_completion_tokens: 800,
      response_format: { type: 'json_object' }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const enrichmentData = JSON.parse(data.choices[0].message.content);

  // Insert PRIMARY facet
  const { error } = await supabase.from('practical_work_intelligence').upsert({
    practical_work_id: id,
    facet_type: 'primary',
    cluster_id,
    canonical_id: id,
    source_tables,
    
    // Primary facet fields
    activity_types: enrichmentData.activity_types || [],
    equipment_category: enrichmentData.equipment_category,
    equipment_subcategory: enrichmentData.equipment_subcategory,
    bs7671_zones: enrichmentData.bs7671_zones || [],
    technical_complexity: enrichmentData.technical_complexity || 3,
    risk_level: enrichmentData.risk_level || 'medium',
    common_tools: enrichmentData.common_tools || [],
    ppe_required: enrichmentData.ppe_required || [],
    
    enrichment_metadata: {
      stage: 'primary',
      confidence: 0.85
    }
  }, {
    onConflict: 'practical_work_id,facet_type'
  });

  if (error) throw error;

  console.log(`✅ Enriched ${id}: ${enrichmentData.activity_types?.join(', ')}`);
}
