import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import FirecrawlApp from 'https://esm.sh/@mendable/firecrawl-js@1.29.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Supplier configurations for tools scraping
const SUPPLIER_CONFIGS = [
  {
    name: 'Screwfix',
    baseUrl: 'https://www.screwfix.com',
    searchPaths: [
      '/c/electrical-plumbing/electrical/electrical-accessories/cat3100001',
      '/c/electrical-plumbing/electrical/electrical-tools/cat3100006',
      '/c/electrical-plumbing/electrical/testing-measurement/cat3100007'
    ]
  },
  {
    name: 'Toolstation',
    baseUrl: 'https://www.toolstation.com',
    searchPaths: [
      '/electrical/electrical-tools/c402',
      '/electrical/electrical-accessories/c403',
      '/electrical/electrical-safety/c404'
    ]
  },
  {
    name: 'CEF Online',
    baseUrl: 'https://www.cef.co.uk',
    searchPaths: [
      '/catalogue/electrical-tools',
      '/catalogue/test-equipment',
      '/catalogue/electrical-accessories'
    ]
  }
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🔧 Tools Batch Processor started');
    
    const body = await req.json().catch(() => ({}));
    const { forceRefresh = false } = body;
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    
    if (!firecrawlApiKey) {
      throw new Error('FIRECRAWL_API_KEY environment variable is required');
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const firecrawl = new FirecrawlApp({ apiKey: firecrawlApiKey });
    
    // Check if we need to refresh (cache expired or force refresh)
    if (!forceRefresh) {
      console.log('📊 Checking existing cache...');
      const { data: existingCache } = await supabase
        .from('tools_weekly_cache')
        .select('expires_at')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (existingCache?.expires_at && new Date(existingCache.expires_at) > new Date()) {
        console.log('✅ Cache is still fresh, skipping refresh');
        return new Response(JSON.stringify({
          success: true,
          message: 'Cache is still fresh',
          cached: true
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }
    
    // Create batch job
    console.log('📋 Creating batch job...');
    const { data: job, error: jobError } = await supabase
      .from('batch_jobs')
      .insert({
        job_type: 'tools_scraping',
        status: 'processing',
        total_batches: SUPPLIER_CONFIGS.length,
        progress_percentage: 0
      })
      .select()
      .single();
    
    if (jobError) {
      console.error('❌ Error creating batch job:', jobError);
      throw jobError;
    }
    
    console.log(`🆔 Created batch job: ${job.id}`);
    
    // Process each supplier as a batch
    const allToolsData: any[] = [];
    let successfulBatches = 0;
    
    for (let i = 0; i < SUPPLIER_CONFIGS.length; i++) {
      const supplier = SUPPLIER_CONFIGS[i];
      const batchNumber = i + 1;
      
      try {
        console.log(`🔄 Processing batch ${batchNumber}/${SUPPLIER_CONFIGS.length}: ${supplier.name}`);
        
        // Create batch progress entry
        const { data: batchProgress, error: progressError } = await supabase
          .from('batch_progress')
          .insert({
            job_id: job.id,
            batch_number: batchNumber,
            status: 'processing',
            started_at: new Date().toISOString(),
            total_items: supplier.searchPaths.length
          })
          .select()
          .single();
        
        if (progressError) {
          console.error(`❌ Error creating batch progress for ${supplier.name}:`, progressError);
          continue;
        }
        
        const batchData: any[] = [];
        let processedItems = 0;
        
        // Process each search path for this supplier
        for (const searchPath of supplier.searchPaths) {
          try {
            const url = `${supplier.baseUrl}${searchPath}`;
            console.log(`🔍 Scraping: ${url}`);
            
            const scrapeResult = await firecrawl.scrapeUrl(url, {
              formats: ['extract'],
              extract: {
                schema: {
                  type: 'object',
                  properties: {
                    tools: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          name: { type: 'string' },
                          price: { type: 'string' },
                          image: { type: 'string' },
                          description: { type: 'string' },
                          stockStatus: { type: 'string' },
                          productUrl: { type: 'string' },
                          category: { type: 'string' }
                        }
                      }
                    }
                  }
                }
              }
            });
            
            if (scrapeResult.success && scrapeResult.extract?.tools) {
              const tools = Array.isArray(scrapeResult.extract.tools) ? scrapeResult.extract.tools : [];
              const processedTools = tools.map((tool: any) => ({
                ...tool,
                supplier: supplier.name,
                sourceUrl: url,
                scrapedAt: new Date().toISOString()
              }));
              
              batchData.push(...processedTools);
              console.log(`✅ Scraped ${processedTools.length} tools from ${url}`);
            }
            
            processedItems++;
            
            // Update batch progress
            await supabase
              .from('batch_progress')
              .update({
                items_processed: processedItems,
                data: { tools_found: batchData.length }
              })
              .eq('id', batchProgress.id);
            
            // Rate limiting delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
          } catch (pathError) {
            console.error(`❌ Error scraping ${searchPath}:`, pathError);
            processedItems++;
            
            await supabase
              .from('batch_progress')
              .update({
                items_processed: processedItems,
                error_message: `Failed to scrape ${searchPath}: ${pathError.message}`
              })
              .eq('id', batchProgress.id);
          }
        }
        
        // Complete batch
        await supabase
          .from('batch_progress')
          .update({
            status: 'completed',
            completed_at: new Date().toISOString(),
            data: { tools_found: batchData.length, final_data: batchData }
          })
          .eq('id', batchProgress.id);
        
        allToolsData.push(...batchData);
        successfulBatches++;
        
        console.log(`✅ Completed batch ${batchNumber}: ${batchData.length} tools from ${supplier.name}`);
        
        // Update job progress
        const progressPercentage = Math.round((batchNumber / SUPPLIER_CONFIGS.length) * 100);
        await supabase
          .from('batch_jobs')
          .update({
            completed_batches: successfulBatches,
            progress_percentage: progressPercentage
          })
          .eq('id', job.id);
        
        // Delay between suppliers
        if (i < SUPPLIER_CONFIGS.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
        
      } catch (batchError) {
        console.error(`❌ Error processing batch ${batchNumber} (${supplier.name}):`, batchError);
        
        await supabase
          .from('batch_progress')
          .update({
            status: 'failed',
            completed_at: new Date().toISOString(),
            error_message: batchError.message
          })
          .eq('job_id', job.id)
          .eq('batch_number', batchNumber);
      }
    }
    
    // Complete the job
    const jobStatus = successfulBatches > 0 ? 'completed' : 'failed';
    await supabase
      .from('batch_jobs')
      .update({
        status: jobStatus,
        completed_at: new Date().toISOString(),
        progress_percentage: 100
      })
      .eq('id', job.id);
    
    if (allToolsData.length > 0) {
      // Store the scraped data in cache
      console.log(`💾 Storing ${allToolsData.length} tools in cache...`);
      
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 14); // 14 days from now
      
      const { error: cacheError } = await supabase
        .from('tools_weekly_cache')
        .insert({
          tools_data: allToolsData,
          total_products: allToolsData.length,
          expires_at: expiresAt.toISOString(),
          category: 'all_tools',
          update_status: 'completed'
        });
      
      if (cacheError) {
        console.error('❌ Error storing cache:', cacheError);
        throw cacheError;
      }
      
      // Cleanup old cache entries
      const { data: oldEntries } = await supabase
        .from('tools_weekly_cache')
        .select('id')
        .order('created_at', { ascending: false })
        .range(3, 100);
      
      if (oldEntries && oldEntries.length > 0) {
        await supabase
          .from('tools_weekly_cache')
          .delete()
          .in('id', oldEntries.map(e => e.id));
      }
    }
    
    const result = {
      success: true,
      message: `Tools batch processing completed`,
      jobId: job.id,
      totalTools: allToolsData.length,
      successfulBatches,
      totalBatches: SUPPLIER_CONFIGS.length,
      timestamp: new Date().toISOString()
    };
    
    console.log('🎉 Tools batch processing completed:', result);
    
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('❌ Error in tools-batch-processor:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});