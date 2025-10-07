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
    const { cache_id, supplier } = await req.json();

    console.log('🔄 Starting pricing embeddings population...', { cache_id, supplier });

    // Create batch job for tracking
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

    const jobId = job.id;
    console.log(`📋 Created job ${jobId}`);

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

    // Process with exponential backoff for rate limits
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    let consecutiveErrors = 0;

    for (const material of materials) {
      const items = Array.isArray(material.materials_data) ? material.materials_data : [material.materials_data];
      
      for (const item of items) {
        try {
          // Skip if missing essential data
          if (!item.name && !item.title) {
            skippedCount++;
            continue;
          }

          // Construct searchable text
          const searchableText = [
            item.name || item.title,
            material.category,
            item.brand,
            item.specifications,
            item.supplier || material.source,
            `£${item.price}`,
            item.price_per_unit,
            item.in_stock ? 'in stock' : 'out of stock'
          ].filter(Boolean).join(' ');

          // Generate embedding with retry logic
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
                  input: searchableText,
                }),
              });

              if (embeddingResponse.ok) {
                consecutiveErrors = 0;
                break;
              }

              // Handle rate limits
              if (embeddingResponse.status === 429) {
                const backoffTime = Math.min(1000 * Math.pow(2, retryCount), 10000);
                console.log(`⏳ Rate limited, waiting ${backoffTime}ms...`);
                await sleep(backoffTime);
                retryCount++;
                consecutiveErrors++;
              } else {
                throw new Error(`OpenAI API error: ${embeddingResponse.status}`);
              }
            } catch (err) {
              console.error(`Retry ${retryCount + 1} failed:`, err);
              retryCount++;
              if (retryCount >= maxRetries) throw err;
              await sleep(1000 * retryCount);
            }
          }

          if (!embeddingResponse || !embeddingResponse.ok) {
            errorCount++;
            continue;
          }

          const embeddingData = await embeddingResponse.json();
          const embedding = embeddingData.data[0].embedding;

          // Insert into pricing_embeddings
          const { error: insertError } = await supabase
            .from('pricing_embeddings')
            .upsert({
              content: searchableText,
              embedding: JSON.stringify(embedding),
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
            }, {
              onConflict: 'content'
            });

          if (insertError) {
            console.error('Insert error:', insertError);
            errorCount++;
          } else {
            processedCount++;
          }

          // Update progress every 50 items
          if (processedCount % 50 === 0) {
            const progress = Math.floor((processedCount / totalItems) * 100);
            await supabase.from('batch_progress').update({
              items_processed: processedCount,
              data: { errors: errorCount, skipped: skippedCount }
            }).eq('job_id', jobId).eq('batch_number', 1);

            await supabase.from('batch_jobs').update({
              progress_percentage: progress
            }).eq('id', jobId);

            console.log(`📈 Progress: ${processedCount}/${totalItems} (${progress}%)`);
          }

          // Add small delay to avoid rate limits
          if (consecutiveErrors > 0) {
            await sleep(200);
          }

        } catch (error) {
          console.error('Error processing item:', error);
          errorCount++;
          
          // If too many consecutive errors, pause longer
          if (consecutiveErrors > 5) {
            console.log('⚠️ Too many errors, pausing for 5 seconds...');
            await sleep(5000);
            consecutiveErrors = 0;
          }
        }
      }
    }

    // Final update
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

    console.log(`✅ Completed! Processed: ${processedCount}, Errors: ${errorCount}, Skipped: ${skippedCount}`);

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
