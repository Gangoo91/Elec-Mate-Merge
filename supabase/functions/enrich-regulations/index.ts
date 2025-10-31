/**
 * Universal Regulation Intelligence Enrichment
 * Extracts RAG metadata from BS 7671 regulations for ALL agents
 * Target table: regulations_intelligence (not hazards!)
 */

/// <reference lib="deno.unstable" />
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { withTimeout, Timeouts, TimeoutError } from '../_shared/timeout.ts';

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
    
    // ✅ REMOVED: Ghost batch creation - let atomic claim in processInBackground handle it
    
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
  // ✅ CRITICAL: Log immediately to prove function started
  console.log(`🚀 processInBackground STARTED: jobId=${jobId}, batch=${batchNumber}, startFrom=${startFrom}`);
  
  let claimedBatch: any = null; // Declare outside try for error handler access
  
  try {
    console.log(`🔄 Background processing started: batch ${batchNumber}`);
  
    // ✅ STEP 1: Fetch job metadata to check for scoped list
    const { data: job } = await supabase
      .from('batch_jobs')
      .select('metadata')
      .eq('id', jobId)
      .single();
    
    const metaList = job?.metadata?.missingRegulations || job?.metadata?.regulationNumbers || null;
    
    // ✅ STEP 2: Atomically claim next pending batch (prevents race conditions)
    const { data: pendingBatches } = await supabase
      .from('batch_progress')
      .select('id, batch_number, data')
      .eq('job_id', jobId)
      .eq('status', 'pending')
      .order('batch_number', { ascending: true })
      .limit(1);
    
    if (!pendingBatches || pendingBatches.length === 0) {
      console.log('✅ No more pending batches for this job');
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'No pending batches',
        processed: 0
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    claimedBatch = pendingBatches[0]; // Assign to outer scope variable
    
    // Claim the batch atomically
    const { data: claimRows, error: claimError } = await supabase
      .from('batch_progress')
      .update({ status: 'processing', started_at: new Date().toISOString() })
      .eq('id', claimedBatch.id)
      .eq('status', 'pending')
      .select('id');
    
    if (claimError) throw claimError;
    if (!claimRows || claimRows.length === 0) {
      console.log('⚠️ Batch already claimed by another worker, looking for next...');
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Batch claimed by another worker',
        processed: 0
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    console.log(`✅ Claimed batch ${claimedBatch.batch_number} (${claimedBatch.id})`);
    
    // ✅ STEP 3: Determine fetch mode and load regulations
    let regulations;
    let fetchMode;
    
    // Priority 1: Use batch-scoped list from data.regulations (set by scheduler)
    if (claimedBatch.data?.regulations && Array.isArray(claimedBatch.data.regulations)) {
      fetchMode = 'BATCH_LIST';
      const batchList = claimedBatch.data.regulations;
      
      const { data, error: fetchError } = await supabase
        .from('bs7671_embeddings')
        .select('*')
        .in('regulation_number', batchList)
        .neq('regulation_number', 'General');
      
      if (fetchError) throw fetchError;
      regulations = data;
      
      console.log(`🎯 COMPLETION MODE (batch list): ${batchList.length} regs → fetched ${regulations?.length || 0}`);
      
    // Priority 2: Use job metadata list
    } else if (metaList && Array.isArray(metaList) && metaList.length > 0) {
      fetchMode = 'METADATA_LIST';
      
      const { data, error: fetchError } = await supabase
        .from('bs7671_embeddings')
        .select('*')
        .in('regulation_number', metaList)
        .neq('regulation_number', 'General')
        .order('created_at', { ascending: true })
        .range(startFrom, startFrom + batchSize - 1);
      
      if (fetchError) throw fetchError;
      regulations = data;
      
      console.log(`🎯 COMPLETION MODE (metadata list): ${metaList.length} regs → fetched ${regulations?.length || 0}`);
      
    // Priority 3: Fall back to global fetch (legacy)
    } else {
      fetchMode = 'GLOBAL';
      
      const { data, error: fetchError } = await supabase
        .from('bs7671_embeddings')
        .select('*')
        .neq('regulation_number', 'General')
        .order('created_at', { ascending: true })
        .range(startFrom, startFrom + batchSize - 1);
      
      if (fetchError) throw fetchError;
      regulations = data;
      
      console.log(`⚙️ GLOBAL MODE (no filter): fetched ${regulations?.length || 0} regs from range ${startFrom}-${startFrom + batchSize - 1}`);
      }
    
    if (!regulations || regulations.length === 0) {
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'No regulations to process',
        processed: 0
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log(`📦 Batch ${claimedBatch.batch_number} (${fetchMode}): ${regulations?.length || 0} regulations`);

    // Update batch with mode info
    await supabase.from('batch_progress').update({
      data: { 
        ...(claimedBatch.data || {}),
        fetch_mode: fetchMode,
        total_items: regulations?.length || 0,
        started_at: new Date().toISOString()
      }
    }).eq('id', claimedBatch.id);

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
    
    let processed = 0, failed = 0, qualityPassed = 0, qualityFailed = 0, skipped = 0, newCount = 0;
    let totalProcessingTime = 0;
    let currentRegIndex = startIndex; // Track current regulation for heartbeat
    
    // Enhanced heartbeat with console logging every 15s
    const heartbeat = setInterval(async () => {
      try {
        const currentReg = currentRegIndex < regulations.length ? regulations[currentRegIndex].regulation_number : 'complete';
        console.log(`💓 HEARTBEAT: batch ${claimedBatch.batch_number} - processing ${currentReg} (${processed}/${regulations.length})`);
        
        await supabase.from('batch_progress').update({
          data: { 
            ...(claimedBatch.data || {}),  // Preserve scheduler metadata
            fetch_mode: fetchMode,
            processed, 
            failed, 
            skipped,
            new_count: newCount,
            skipped_count: skipped,
            quality_passed: qualityPassed,
            quality_failed: qualityFailed,
            current_regulation: currentReg,
            last_heartbeat: new Date().toISOString()
          }
        }).eq('id', claimedBatch.id);
      } catch (e) {
        console.error('❌ Heartbeat failed:', e);
      }
    }, 15000); // Every 15 seconds for faster visibility
    
    for (let i = startIndex; i < regulations.length; i++) {
      const reg = regulations[i];
      currentRegIndex = i; // Update for heartbeat logging
      
      // Skip any remaining non-regulation content
      if (!reg.regulation_number || reg.regulation_number === 'General' || reg.regulation_number.trim().length === 0) {
        console.log(`⏭️ Skipping non-regulation: ${reg.section}`);
        skipped++;
        continue;
      }
      
      const regStartTime = Date.now();
      console.log(`\n📖 [${i + 1}/${regulations.length}] Processing: ${reg.regulation_number}`);
      
      try {
        // Process regulation with timeout protection
        const result = await withTimeout(
          processRegulation(reg, supabase, openAIKey, fetchMode, i, regulations.length, claimedBatch, jobId, batchNumber, regStartTime),
          60000, // 60 seconds max per regulation
          `Processing ${reg.regulation_number}`
        );
        
        // Update counters based on result
        if (result.status === 'success') {
          processed++;
          newCount += result.newCount || 0;
          qualityPassed += result.recordsCreated || 0;
          totalProcessingTime += result.processingTime || 0;
        } else if (result.status === 'skipped') {
          skipped++;
          processed++;
        } else if (result.status === 'failed') {
          failed++;
          qualityFailed += result.qualityFailed || 0;
        }
        
        // Update progress every 5 items (reduce DB writes)
        if ((i + 1) % 5 === 0 || i === regulations.length - 1) {
          await supabase.from('batch_progress').update({
            items_processed: processed,
            data: { 
              ...(claimedBatch.data || {}),
              fetch_mode: fetchMode,
              processed, 
              failed, 
              skipped,
              new_count: newCount,
              skipped_count: skipped,
              quality_passed: qualityPassed,
              quality_failed: qualityFailed,
              last_regulation: reg.regulation_number,
              avg_processing_time_ms: totalProcessingTime / (i - startIndex + 1),
              last_updated: new Date().toISOString()
            }
          }).eq('id', claimedBatch.id);
        }
        
      } catch (error) {
        if (error instanceof TimeoutError) {
          console.error(`⏱️ TIMEOUT: ${reg.regulation_number} exceeded 60s - marking as failed`);
          failed++;
        } else {
          console.error(`❌ Error processing ${reg.regulation_number}:`, error);
          failed++;
        }
      }
    }
    
    // Clear heartbeat timer
    clearInterval(heartbeat);
    
    console.log(`✅ Batch ${claimedBatch.batch_number} (${fetchMode}) complete: ${processed} processed, ${failed} failed, ${skipped} skipped, ${newCount} new, ${qualityPassed} quality passed`);
    
    // Mark as completed
    await supabase
      .from('batch_progress')
      .update({ 
        status: 'completed',
        items_processed: startFrom + (regulations?.length || 0),
        data: { 
          ...(claimedBatch.data || {}),
          fetch_mode: fetchMode,
          processed, 
          failed, 
          skipped,
          new_count: newCount,
          skipped_count: skipped,
          qualityPassed, 
          qualityFailed,
          avg_processing_time_ms: totalProcessingTime / (processed || 1),
          completed_at: new Date().toISOString()
        }
      })
      .eq('id', claimedBatch.id);
    
    console.log(`✅ Background processing completed: batch ${claimedBatch.batch_number} (${fetchMode})`);
    
  } catch (error) {
    // ✅ Enhanced error logging
    console.error(`❌ CRITICAL ERROR in processInBackground:`, {
      jobId,
      batchNumber,
      startFrom,
      errorName: error.name,
      errorMessage: error.message,
      errorStack: error.stack?.substring(0, 500)
    });
    
    // Clear heartbeat on error
    if (typeof heartbeat !== 'undefined') clearInterval(heartbeat);
    
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
    } else {
      console.error('❌ No claimedBatch available to mark as failed');
    }
    
    // Re-throw to ensure Deno logs it
    throw error;
  }
}

/**
 * Process a single regulation - returns status instead of using continue
 */
async function processRegulation(
  reg: any,
  supabase: any,
  openAIKey: string,
  fetchMode: string,
  index: number,
  totalRegs: number,
  claimedBatch: any,
  jobId: string,
  batchNumber: number,
  regStartTime: number
): Promise<{
  status: 'success' | 'skipped' | 'failed';
  newCount?: number;
  recordsCreated?: number;
  qualityFailed?: number;
  processingTime?: number;
}> {
  
  // Check if already enriched
  const { data: existingRecords } = await supabase
    .from('regulations_intelligence')
    .select('id')
    .eq('regulation_id', reg.id)
    .eq('enrichment_version', ENRICHMENT_VERSION)
    .limit(1);
  
  if (existingRecords && existingRecords.length > 0) {
    console.log(`⏭️ Already enriched: ${reg.regulation_number} - skipping`);
    return { status: 'skipped' };
  }
  
  // Extract intelligence with retry logic
  const intelligenceArray = await extractWithRetry(reg, openAIKey, 3);
  
  if (!intelligenceArray || !Array.isArray(intelligenceArray) || intelligenceArray.length === 0) {
    console.log(`⚠️ Failed to extract intelligence for ${reg.regulation_number} after retries`);
    return { status: 'failed', qualityFailed: 1 };
  }
  
  // Validate and build batch insert
  let recordsCreated = 0;
  let qualityFailedCount = 0;
  const validRecords = [];
  const seenFacets = new Set<string>();
  
  for (const intelligence of intelligenceArray) {
    if (!validateIntelligence(intelligence)) {
      console.log(`⚠️ Failed quality check for ${reg.regulation_number} facet - intelligence:`, JSON.stringify(intelligence).substring(0, 200));
      qualityFailedCount++;
      continue; // This continue is fine - it's within the for loop
    }
    
    const facetHash = computeFacetHash(intelligence);
    
    // De-duplicate by facet_hash within this regulation
    if (seenFacets.has(facetHash)) {
      console.log(`🔄 Skipping duplicate facet_hash ${facetHash} for ${reg.regulation_number}`);
      continue; // This continue is fine - it's within the for loop
    }
    seenFacets.add(facetHash);
    
    validRecords.push({
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
      source_hash: facetHash,
      facet_hash: facetHash,
      created_at: new Date().toISOString()
    });
  }
  
  // Bulk upsert with facet-aware conflict handling
  if (validRecords.length > 0) {
    const { error: insertError } = await supabase
      .from('regulations_intelligence')
      .upsert(validRecords, {
        onConflict: 'regulation_id,enrichment_version,facet_hash',
        ignoreDuplicates: false
      });
    
    if (insertError) {
      console.error(`❌ Bulk insert error for ${reg.regulation_number}:`, insertError);
      return { status: 'failed', qualityFailed: validRecords.length };
    } else {
      recordsCreated = validRecords.length;
    }
  }
  
  if (recordsCreated === 0) {
    console.log(`❌ No valid intelligence records created for ${reg.regulation_number}`);
    return { status: 'failed', qualityFailed: qualityFailedCount };
  }
  
  console.log(`✅ Created ${recordsCreated} intelligence records for ${reg.regulation_number}`);
  
  const regProcessingTime = Date.now() - regStartTime;
  
  // Checkpoints are saved every 25 docs in main loop
  if ((index + 1) % 25 === 0 || index === totalRegs - 1) {
    await supabase.from('batch_progress').update({
      last_checkpoint: {
        last_processed_id: reg.id,
        processed_count: index + 1,
        timestamp: new Date().toISOString()
      }
    }).eq('job_id', jobId).eq('batch_number', batchNumber);
    
    console.log(`💾 Checkpoint saved at regulation ${index + 1}`);
  }
  
  return {
    status: 'success',
    newCount: 1,
    recordsCreated,
    processingTime: regProcessingTime
  };
}

/**
 * Retry wrapper for GPT-5 with exponential backoff
 */
async function extractWithRetry(regulation: any, apiKey: string, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await extractRegulationIntelligence(regulation, apiKey);
      
      if (result && Array.isArray(result) && result.length > 0) {
        return result;
      }
      
      console.warn(`⚠️ Attempt ${attempt}/${maxRetries} returned empty for ${regulation.regulation_number}`);
      
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
        console.log(`⏳ Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    } catch (error) {
      console.error(`❌ Attempt ${attempt}/${maxRetries} failed for ${regulation.regulation_number}:`, error.message);
      
      if (attempt === maxRetries) {
        console.error(`❌ All retries exhausted for ${regulation.regulation_number}`);
        return null;
      }
      
      const delay = Math.pow(2, attempt) * 1000;
      console.log(`⏳ Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  return null;
}

/**
 * Extract multi-faceted RAG intelligence from regulation
 * Returns ARRAY of intelligence records for different aspects/meanings
 */
async function extractRegulationIntelligence(regulation: any, apiKey: string) {
  const prompt = `Extract ALL distinct aspects of this UK electrical regulation. Return a JSON object with a "records" array where each item represents ONE specific facet/application/interpretation. Use UK English exclusively.

REGULATION:
${regulation.regulation_number}: ${regulation.section}
${regulation.content}

FACET QUANTITY GUIDANCE:
- COMPLEX regulations (protection, installation methods, circuits, medical locations): Generate 15-35 distinct facets
- MEDIUM regulations (equipment, earthing, testing): Generate 8-15 facets
- SIMPLE regulations (definitions, basic requirements): Generate 5-10 facets

CRITICAL: Each facet MUST be genuinely distinct:
- Different trade application (domestic vs commercial vs industrial vs agricultural)
- Different circuit type (lighting vs power vs heating vs motor vs data)
- Different installation context (buried vs surface vs overhead vs concealed vs exposed)
- Different protection scenario (fault, overload, earth loop, RCD, bonding)
- Different building type (residential, office, factory, hospital, school)

EXAMPLES:
- 710.415.2.1 (Medical): 20+ facets covering patient areas, surgical, ICU, RCD types, earthing, IT systems, etc.
- 433.1.1 (Cable sizing): 12+ facets covering load types, installation methods, grouping, derating, protection coordination
- 522.8.10 (Buried cables): 10+ facets covering depth requirements, warning tape, mechanical protection, soil types, duct systems

Return JSON object with "records" key:
{
  "records": [
    {
      "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
      "category": "Protection | Installation | Testing | Design | Equipment | Safety | Earthing | Cables | Circuits",
      "subcategory": "Specific narrow topic",
      "technical_level": 1-5,
      "primary_topic": "ONE clear aspect with sufficient detail (20-50 words) - be specific about the scenario/application/context",
      "related_regulations": ["522.8", "433.1.1"],
      "applies_to": ["domestic", "commercial", "industrial"]
    }
  ]
}

CRITICAL: Generate MULTIPLE facets per regulation to capture all distinct use cases. Return ONLY valid JSON with "records" array. Use UK English spelling throughout.`;

  let response: Response | null = null;
  
  try {
    // Wrap GPT call with explicit 30s timeout protection
    response = await withTimeout(
      fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        messages: [
          { 
            role: 'system', 
            content: 'You are a strict JSON formatter specialising in UK English. Output ONLY a valid JSON object with "records" array. No markdown, no code fences, no explanations. Use UK English spelling and terminology exclusively.'
          },
          { role: 'user', content: prompt }
        ],
        max_completion_tokens: 6000 // Increased for more comprehensive facets per regulation
        // NOTE: temperature not supported by gpt-5-mini (defaults to 1.0)
        // NOTE: max_reasoning_tokens only exists for O-series models (o1/o3/o4), not GPT-5
      })
    }),
    Timeouts.AI_CALL, // 30 seconds
    `GPT-5 enrichment for ${regulation.regulation_number}`
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ OpenAI API error (${response.status}):`, errorText.substring(0, 200));
      throw new Error(`GPT-5 Mini API error: ${response.status} - ${errorText.substring(0, 200)}`);
    }
  } catch (error: any) {
    if (error instanceof TimeoutError) {
      console.error(`⏱️ TIMEOUT: GPT call exceeded 30s for ${regulation.regulation_number}`);
      throw new Error('GPT-5 Mini request timed out after 30 seconds');
    }
    throw error;
  }
  
  // ✅ Verify response exists before using
  if (!response) {
    throw new Error('No response received from GPT-5');
  }
  
  const data = await response.json();
  const content = data.choices[0].message.content;
  const finishReason = data.choices[0].finish_reason;
  
  // Enhanced validation with finish_reason checking
  if (!content || content.trim().length === 0) {
    console.error('❌ GPT-5 Mini returned empty content');
    console.error('📋 Finish reason:', finishReason);
    console.error('📋 Usage stats:', JSON.stringify(data.usage));
    console.error('📋 Full API response (first 800 chars):', JSON.stringify(data).substring(0, 800));
    
    // If hit token limit, this is a configuration issue
    if (finishReason === 'length') {
      throw new Error('Token budget exceeded - response truncated. Consider reducing max_completion_tokens further.');
    }
    
    throw new Error(`Empty response from GPT-5 Mini (finish_reason: ${finishReason})`);
  }
  
  // Log successful response details
  console.log(`✅ GPT-5 response received: ${content.length} chars, finish_reason: ${finishReason}`);
  if (data.usage) {
    console.log(`📊 Token usage: prompt=${data.usage.prompt_tokens}, completion=${data.usage.completion_tokens}, total=${data.usage.total_tokens}`);
  }
  
  try {
    // Strip markdown code fences if present
    let cleanContent = content.trim();
    if (cleanContent.startsWith('```')) {
      cleanContent = cleanContent.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
    }
    
    const parsed = JSON.parse(cleanContent);
    
    // Handle both array and object responses
    if (Array.isArray(parsed)) {
      console.log(`✅ Parsed ${parsed.length} intelligence records`);
      return parsed;
    } else if (parsed.intelligence || parsed.records || parsed.aspects) {
      // Handle wrapped array responses
      const records = parsed.intelligence || parsed.records || parsed.aspects;
      console.log(`✅ Parsed ${records.length} intelligence records (from wrapped object)`);
      return records;
    } else {
      // Single object response - wrap in array
      console.log(`⚠️ Single object returned, wrapping in array`);
      return [parsed];
    }
  } catch (error) {
    console.error('❌ Failed to parse GPT-5 response:', error.message);
    console.error('Response content (first 500 chars):', content?.substring(0, 500));
    throw new Error(`JSON parse failed: ${error.message}`);
  }
}

/**
 * Compute facet hash for uniqueness
 */
function computeFacetHash(intelligence: any): string {
  const canonical = [
    intelligence.category?.toLowerCase() || '',
    intelligence.subcategory?.toLowerCase() || '',
    intelligence.primary_topic?.toLowerCase() || '',
    (intelligence.keywords || []).sort().join(',').toLowerCase()
  ].join('|');
  return hashString(canonical);
}

/**
 * Hash string for facet uniqueness
 */
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * Validate intelligence quality (RELAXED: accept concise topics)
 */
function validateIntelligence(intelligence: any): boolean {
  if (!intelligence) return false;
  return intelligence.keywords?.length >= 3 &&
         intelligence.category?.length > 0 &&
         intelligence.primary_topic?.length > 10 && // Changed from 20 to 10
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
