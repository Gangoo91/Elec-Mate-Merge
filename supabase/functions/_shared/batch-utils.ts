/**
 * Batch Processing Utilities
 * Shared helpers for all enrichment functions with checkpointing, retry, and error handling
 */

export interface CheckpointData {
  last_processed_id: string;
  processed_count: number;
  timestamp: string;
}

export interface BatchResult {
  processed: number;
  failed: number;
  skipped: number;
  qualityPassed?: number;
  qualityFailed?: number;
  totalProcessingTime: number;
}

/**
 * Save checkpoint every N items
 */
export async function saveCheckpoint(
  supabase: any,
  jobId: string,
  batchNumber: number,
  lastProcessedId: string,
  processedCount: number,
  additionalData?: any
) {
  await supabase.from('batch_progress').update({
    last_checkpoint: {
      last_processed_id: lastProcessedId,
      processed_count: processedCount,
      timestamp: new Date().toISOString()
    },
    items_processed: processedCount,
    data: {
      ...additionalData,
      last_updated: new Date().toISOString()
    }
  }).eq('job_id', jobId).eq('batch_number', batchNumber);
}

/**
 * Get checkpoint to resume from
 */
export async function getCheckpoint(
  supabase: any,
  jobId: string,
  batchNumber: number
): Promise<string | null> {
  const { data: checkpoint } = await supabase
    .from('batch_progress')
    .select('last_checkpoint')
    .eq('job_id', jobId)
    .eq('batch_number', batchNumber)
    .maybeSingle();
  
  return checkpoint?.last_checkpoint?.last_processed_id || null;
}

/**
 * Call OpenAI with exponential backoff retry (3 attempts)
 */
export async function callOpenAIWithRetry(
  prompt: string,
  apiKey: string,
  model: string,
  itemId: string,
  maxTokens: number = 1000,
  attempt: number = 1
): Promise<any> {
  const MAX_RETRIES = 3;
  const TIMEOUT_MS = 120000; // 120s per item (increased for dense BS 7671 chapters)
  
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
        model,
        messages: [{
          role: 'system',
          content: 'You are an expert in electrical regulations and safety. Extract structured metadata. Return valid JSON only.'
        }, {
          role: 'user',
          content: prompt
        }],
        response_format: { type: "json_object" },
        max_completion_tokens: maxTokens,
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      
      // Exponential backoff for rate limits
      if (response.status === 429 && attempt < MAX_RETRIES) {
        const delay = 1000 * Math.pow(2, attempt);
        console.warn(`⚠️ Rate limit hit, retry ${attempt}/${MAX_RETRIES} after ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return callOpenAIWithRetry(prompt, apiKey, model, itemId, maxTokens, attempt + 1);
      }
      
      throw new Error(`OpenAI API error ${response.status}: ${errorText}`);
    }

    const aiData = await response.json();
    const content = aiData.choices[0].message.content;
    
    try {
      return JSON.parse(content);
    } catch (parseError) {
      if (attempt < MAX_RETRIES) {
        const delay = 1000 * Math.pow(2, attempt - 1);
        console.warn(`⚠️ Parse error for ${itemId}, retry ${attempt}/${MAX_RETRIES} after ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return callOpenAIWithRetry(prompt, apiKey, model, itemId, maxTokens, attempt + 1);
      }
      throw new Error(`JSON parse failed after ${MAX_RETRIES} attempts`);
    }
    
  } catch (error: any) {
    clearTimeout(timeoutId);
    
    // Retry on timeout or network errors
    if (attempt < MAX_RETRIES && (
      error.name === 'AbortError' || 
      error.message.includes('timeout') ||
      error.message.includes('network') ||
      error.message.includes('ECONNRESET')
    )) {
      const delay = 1000 * Math.pow(2, attempt);
      console.warn(`⚠️ Retry ${attempt}/${MAX_RETRIES} for ${itemId} after ${delay}ms (${error.message})`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return callOpenAIWithRetry(prompt, apiKey, model, itemId, maxTokens, attempt + 1);
    }
    
    throw error;
  }
}

/**
 * Hash content for deduplication
 */
export async function hashContent(content: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Wrap batch processing with comprehensive error handling
 */
export async function processBatchWithErrorHandling(
  supabase: any,
  jobId: string,
  batchNumber: number,
  items: any[],
  processItem: (item: any, index: number) => Promise<{ success: boolean; data?: any }>,
  checkpointInterval: number = 5
): Promise<BatchResult> {
  let processed = 0, failed = 0, skipped = 0, totalProcessingTime = 0;
  
  // Get checkpoint
  const resumeFromId = await getCheckpoint(supabase, jobId, batchNumber);
  const startIndex = resumeFromId ? items.findIndex(i => i.id === resumeFromId) + 1 : 0;
  
  console.log(resumeFromId ? `▶️ Resuming from checkpoint at item ${startIndex}` : '🆕 Starting fresh batch');
  
  for (let i = startIndex; i < items.length; i++) {
    const item = items[i];
    const itemStartTime = Date.now();
    
    try {
      const result = await processItem(item, i);
      
      if (result.success) {
        processed++;
      } else {
        failed++;
      }
      
      const itemProcessingTime = Date.now() - itemStartTime;
      totalProcessingTime += itemProcessingTime;
      
      // Save checkpoint every N items
      if ((i + 1) % checkpointInterval === 0 || i === items.length - 1) {
        await saveCheckpoint(
          supabase,
          jobId,
          batchNumber,
          item.id,
          i + 1,
          {
            processed,
            failed,
            skipped,
            avg_processing_time_ms: totalProcessingTime / (i - startIndex + 1)
          }
        );
      }
      
    } catch (error) {
      console.error(`❌ Error processing item ${item.id}:`, error);
      failed++;
      
      // Save error checkpoint
      await saveCheckpoint(
        supabase,
        jobId,
        batchNumber,
        item.id,
        i + 1,
        {
          processed,
          failed,
          last_error: error instanceof Error ? error.message : String(error)
        }
      );
    }
  }
  
  return { processed, failed, skipped, totalProcessingTime };
}
