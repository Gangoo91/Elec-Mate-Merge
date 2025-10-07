import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { cache_id, supplier, worker, resume_from, job_id: existingJobId } = await req.json();

    console.log('🔄 Starting pricing embeddings population...', { cache_id, supplier, worker, resume_from });

    let jobId = existingJobId;

    // If NOT in worker mode, create job and return immediately
    if (!worker) {
      const { data: job, error: jobError } = await supabase
        .from('batch_jobs')
        .insert({
          job_type: 'pricing_embeddings',
          status: 'processing',
          total_batches: 1,
          completed_batches: 0,
          failed_batches: 0,
          current_batch: 0,
          progress_percentage: 0,
          metadata: { cache_id, supplier }
        })
        .select()
        .single();

      if (jobError || !job) {
        console.error('Failed to create job:', jobError);
        throw new Error('Failed to create tracking job');
      }

      jobId = job.id;
      console.log(`📋 Created job ${jobId}, starting background worker...`);

      // Start background worker immediately
      // @ts-ignore - EdgeRuntime available in Deno Deploy
      EdgeRuntime.waitUntil(
        fetch(req.url, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'authorization': req.headers.get('authorization') || '',
            'apikey': req.headers.get('apikey') || ''
          },
          body: JSON.stringify({ 
            cache_id, 
            supplier, 
            worker: true, 
            resume_from: 0,
            job_id: jobId 
          })
        }).catch(err => console.error('Background worker failed to start:', err))
      );

      // Return immediately with 200 OK
      return new Response(JSON.stringify({
        success: true,
        job_id: jobId,
        message: 'Embeddings generation started in background'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ========== WORKER MODE ==========
    console.log(`👷 Worker mode - job ${jobId}, resume_from: ${resume_from || 0}`);

    // Fetch materials from cache
    let query = supabase.from('materials_weekly_cache').select('*');
    
    if (cache_id) {
      query = query.eq('id', cache_id);
    } else if (supplier) {
      query = query.ilike('source', `%${supplier}%`);
    }
    
    const { data: materials, error: fetchError } = await query.order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Error fetching materials:', fetchError);
      await supabase.from('batch_jobs').update({
        status: 'failed',
        error_message: fetchError.message
      }).eq('id', jobId);
      throw fetchError;
    }

    if (!materials || materials.length === 0) {
      console.log('⚠️ No materials found');
      await supabase.from('batch_jobs').update({
        status: 'completed',
        progress_percentage: 100
      }).eq('id', jobId);
      
      return new Response(JSON.stringify({ 
        success: false,
        message: 'No materials found',
        job_id: jobId,
        processed: 0
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`📦 Found ${materials.length} material cache entries`);

    // Count total items
    let totalItems = 0;
    for (const material of materials) {
      const items = Array.isArray(material.materials_data) ? material.materials_data : [material.materials_data];
      totalItems += items.length;
    }

    console.log(`📊 Total items to process: ${totalItems}`);

    // Create batch progress tracker
    const { error: batchError } = await supabase.from('batch_progress').insert({
      job_id: jobId,
      batch_number: 1,
      status: 'processing',
      items_processed: 0,
      total_items: totalItems
    });

    if (batchError) {
      console.error('Failed to create batch progress:', batchError);
    }

    let processedCount = 0;
    let errorCount = 0;
    let skippedCount = 0;

    // Helper function for chunking arrays into batches
    const chunkArray = <T,>(array: T[], size: number): T[][] => {
      const chunks: T[][] = [];
      for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
      }
      return chunks;
    };

    // Process with exponential backoff for rate limits
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    let consecutiveErrors = 0;

    // Collect all items from all materials with their metadata
    const allItems: Array<{ item: any; material: any }> = [];
    for (const material of materials) {
      const items = Array.isArray(material.materials_data) ? material.materials_data : [material.materials_data];
      for (const item of items) {
        if (!item.name && !item.title) {
          skippedCount++;
          continue;
        }
        allItems.push({ item, material });
      }
    }

    console.log(`📦 Collected ${allItems.length} items, de-duplicating...`);

    // De-duplicate by content string to avoid "ON CONFLICT DO UPDATE" errors
    const uniqueItems = new Map<string, { item: any; material: any }>();
    let duplicatesFound = 0;

    for (const itemData of allItems) {
      const { item, material } = itemData;
      
      // Build content string (same logic used for embeddings)
      const contentStr = [
        item.name || item.title,
        material.category,
        item.brand,
        item.specifications,
        item.supplier || material.source,
        `£${item.price}`,
        item.price_per_unit,
        item.in_stock ? 'in stock' : 'out of stock'
      ].filter(Boolean).join(' ');
      
      if (uniqueItems.has(contentStr)) {
        duplicatesFound++;
      } else {
        uniqueItems.set(contentStr, itemData);
      }
    }

    const deduplicatedItems = Array.from(uniqueItems.values());
    console.log(`🔍 De-duplication: ${allItems.length} → ${deduplicatedItems.length} (removed ${duplicatesFound} duplicates)`);

    // Update totalItems to reflect deduplicated count
    totalItems = deduplicatedItems.length;

    // Update batch progress with correct total
    await supabase.from('batch_progress').update({
      total_items: totalItems
    }).eq('job_id', jobId).eq('batch_number', 1);

    // Worker safety limits to prevent CPU exhaustion
    const BATCH_SIZE = 100;
    const MAX_BATCHES_PER_RUN = 20; // Process max 2,000 items per worker run
    const startIndex = resume_from || 0;
    const endIndex = Math.min(startIndex + (BATCH_SIZE * MAX_BATCHES_PER_RUN), deduplicatedItems.length);
    
    const itemsThisRun = deduplicatedItems.slice(startIndex, endIndex);
    const batches = chunkArray(itemsThisRun, BATCH_SIZE);
    
    console.log(`📦 Worker processing items ${startIndex}-${endIndex} (${itemsThisRun.length} items, ${batches.length} batches)`);

    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex];
      
      try {
        // Prepare batch input for OpenAI
        const batchInputs = batch.map(({ item, material }) => {
          return [
            item.name || item.title,
            material.category,
            item.brand,
            item.specifications,
            item.supplier || material.source,
            `£${item.price}`,
            item.price_per_unit,
            item.in_stock ? 'in stock' : 'out of stock'
          ].filter(Boolean).join(' ');
        });

        // Generate embeddings for entire batch with retry logic
        let embeddingResponse;
        let retryCount = 0;
        const maxRetries = 3;

        while (retryCount < maxRetries) {
          try {
            embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${openAIApiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                model: 'text-embedding-3-small',
                input: batchInputs, // Send array of inputs
              }),
            });

            if (embeddingResponse.ok) {
              consecutiveErrors = 0;
              break;
            }

            // Handle rate limits
            if (embeddingResponse.status === 429) {
              const backoffTime = Math.min(1000 * Math.pow(2, retryCount), 10000);
              console.log(`⏳ Rate limited on batch ${batchIndex + 1}, waiting ${backoffTime}ms...`);
              await sleep(backoffTime);
              retryCount++;
              consecutiveErrors++;
            } else {
              const errorText = await embeddingResponse.text();
              throw new Error(`OpenAI API error ${embeddingResponse.status}: ${errorText}`);
            }
          } catch (err) {
            console.error(`Retry ${retryCount + 1} failed for batch ${batchIndex + 1}:`, err);
            retryCount++;
            if (retryCount >= maxRetries) throw err;
            await sleep(1000 * retryCount);
          }
        }

        if (!embeddingResponse || !embeddingResponse.ok) {
          console.error(`❌ Failed batch ${batchIndex + 1} after ${maxRetries} retries`);
          errorCount += batch.length;
          continue;
        }

        const embeddingData = await embeddingResponse.json();
        const embeddings = embeddingData.data; // Array of embeddings

        // Prepare bulk insert data
        const insertData = batch.map(({ item, material }, index) => ({
          content: batchInputs[index],
          embedding: JSON.stringify(embeddings[index].embedding),
          item_name: item.name || item.title || 'Unknown Item',
          category: material.category || 'Electrical Components',
          base_cost: parseFloat(item.price) || 0,
          wholesaler: item.supplier || material.source || 'Unknown',
          price_per_unit: item.price_per_unit || `£${item.price || 0}`,
          in_stock: Boolean(item.in_stock),
          product_url: item.url || null,
          last_scraped: new Date().toISOString(),
          metadata: {
            brand: item.brand,
            supplier: item.supplier || material.source,
            specifications: item.specifications,
            sku: item.sku,
            pack_qty: item.pack_qty
          }
        }));

        // Bulk insert into pricing_embeddings
        const { error: insertError } = await supabase
          .from('pricing_embeddings')
          .upsert(insertData, {
            onConflict: 'content'
          });

        if (insertError) {
          console.error(`Insert error for batch ${batchIndex + 1}:`, insertError);
          errorCount += batch.length;
        } else {
          processedCount += batch.length;
        }

        // Update progress after each batch
        const progress = Math.floor((processedCount / totalItems) * 100);
        await supabase.from('batch_progress').update({
          items_processed: processedCount,
          data: { 
            errors: errorCount, 
            skipped: skippedCount,
            batches_completed: batchIndex + 1,
            total_batches: batches.length
          }
        }).eq('job_id', jobId).eq('batch_number', 1);

        await supabase.from('batch_jobs').update({
          progress_percentage: progress
        }).eq('id', jobId);

        console.log(`📈 Progress: ${processedCount}/${totalItems} (${progress}%) - Batch ${batchIndex + 1}/${batches.length}`);

        // Small delay between batches to avoid rate limits
        if (consecutiveErrors > 0) {
          await sleep(500);
        } else {
          await sleep(100); // Small delay even on success
        }

      } catch (error) {
        console.error(`Error processing batch ${batchIndex + 1}:`, error);
        errorCount += batch.length;
        consecutiveErrors++;
        
        // If too many consecutive errors, pause longer
        if (consecutiveErrors > 3) {
          console.log('⚠️ Too many batch errors, pausing for 10 seconds...');
          await sleep(10000);
          consecutiveErrors = 0;
        }
      }
    }

    // Check if there are more items to process
    const remainingItems = totalItems - endIndex;
    
    if (remainingItems > 0) {
      console.log(`🔄 ${remainingItems} items remaining, scheduling next worker run...`);
      
      // Update progress
      const currentProgress = Math.floor((endIndex / totalItems) * 100);
      await supabase.from('batch_progress').update({
        items_processed: endIndex,
        data: { 
          errors: errorCount, 
          skipped: skippedCount,
          batches_completed: batches.length,
          resume_from: endIndex
        }
      }).eq('job_id', jobId).eq('batch_number', 1);

      await supabase.from('batch_jobs').update({
        progress_percentage: currentProgress
      }).eq('id', jobId);

      // Schedule next worker run
      // @ts-ignore - EdgeRuntime available
      EdgeRuntime.waitUntil(
        fetch(req.url, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'authorization': req.headers.get('authorization') || '',
            'apikey': req.headers.get('apikey') || ''
          },
          body: JSON.stringify({ 
            cache_id, 
            supplier, 
            worker: true, 
            resume_from: endIndex,
            job_id: jobId 
          })
        }).catch(err => console.error('Next worker failed to start:', err))
      );

      return new Response(JSON.stringify({
        success: true,
        job_id: jobId,
        processed: endIndex,
        total: totalItems,
        continuing: true
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Final update - all items processed
    const finalProgress = Math.floor((processedCount / totalItems) * 100);
    await supabase.from('batch_progress').update({
      items_processed: processedCount,
      status: 'completed',
      completed_at: new Date().toISOString(),
      data: { errors: errorCount, skipped: skippedCount }
    }).eq('job_id', jobId).eq('batch_number', 1);

    await supabase.from('batch_jobs').update({
      status: 'completed',
      completed_batches: 1,
      progress_percentage: 100,
      completed_at: new Date().toISOString()
    }).eq('id', jobId);

    console.log(`✅ All items processed! Total: ${processedCount}, Errors: ${errorCount}, Skipped: ${skippedCount}`);

    return new Response(JSON.stringify({
      success: true,
      job_id: jobId,
      processed: processedCount,
      errors: errorCount,
      skipped: skippedCount,
      total: totalItems
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in populate-pricing-embeddings:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to populate embeddings',
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
