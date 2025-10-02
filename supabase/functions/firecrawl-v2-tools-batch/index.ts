import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Define 3 batches of 6 URLs each (18 total)
const BATCH_URLS = {
  1: [
    { url: 'https://www.screwfix.com/search?search=screwdrivers+pliers+spanners+electrical+work&page_size=50', name: 'Hand Tools - Screwfix' },
    { url: 'https://www.toolstation.com/search?q=screwdrivers+pliers+spanners+electrical+work', name: 'Hand Tools - Toolstation' },
    { url: 'https://www.screwfix.com/search?search=testing+measurement+electrical+safety+compliance&page_size=50', name: 'Test Equipment - Screwfix' },
    { url: 'https://www.toolstation.com/search?q=testing+measurement+electrical+safety+compliance', name: 'Test Equipment - Toolstation' },
    { url: 'https://www.screwfix.com/search?search=electric+cordless+drilling+cutting+installation&page_size=50', name: 'Power Tools - Screwfix' },
    { url: 'https://www.toolstation.com/search?q=electric+cordless+drilling+cutting+installation', name: 'Power Tools - Toolstation' },
  ],
  2: [
    { url: 'https://www.screwfix.com/search?search=personal+protective+equipment+safe+working+practices&page_size=50', name: 'PPE - Screwfix' },
    { url: 'https://www.toolstation.com/search?q=personal+protective+equipment+safe+working+practices', name: 'PPE - Toolstation' },
    { url: 'https://www.screwfix.com/search?search=cable+stripper+fish+tape+electrical&page_size=50', name: 'Specialist Tools - Screwfix' },
    { url: 'https://www.toolstation.com/search?q=cable+stripper+fish+tape+electrical', name: 'Specialist Tools - Toolstation' },
    { url: 'https://www.toolstation.com/search?q=tool+bags+boxes+storage+solutions+organisation', name: 'Tool Storage - Screwfix' },
    { url: 'https://www.screwfix.com/search?search=hazard+identification+protection+safety+equipment', name: 'Tool Storage - Toolstation' },
  ],
  3: [
    { url: 'https://www.screwfix.com/search?search=Equipment+ladders+scaffolding+access+working+at+height&page_size=50', name: 'Safety Tools - Screwfix' },
    { url: 'https://www.screwfix.com/search?search=tool+bags+boxes+storage+solutions+organisation', name: 'Safety Tools - Toolstation' },
    { url: 'https://www.screwfix.com/search?search=specialist+electrical+tools+installation+tasks&page_size=50', name: 'Access Tools & Equipment - Screwfix' },
    { url: 'https://www.toolstation.com/search?q=hazard+identification+protection+safety+equipment', name: 'Access Tools & Equipment - Toolstation' },
    { url: 'https://www.toolstation.com/search?q=Equipment+ladders+scaffolding+access+working+at+height', name: 'Specialist Tools - Toolstation' },
    { url: 'https://www.toolstation.com/search?q=specialist+electrical+tools+installation+tasks', name: 'Safety Tools - Toolstation' },
  ]
};

const CATEGORY_MAPPING: Record<string, string> = {
  'Hand Tools - Screwfix': 'Hand Tools',
  'Hand Tools - Toolstation': 'Hand Tools',
  'Test Equipment - Screwfix': 'Test Equipment',
  'Test Equipment - Toolstation': 'Test Equipment',
  'Power Tools - Screwfix': 'Power Tools',
  'Power Tools - Toolstation': 'Power Tools',
  'PPE - Screwfix': 'PPE',
  'PPE - Toolstation': 'PPE',
  'Specialist Tools - Screwfix': 'Specialist Tools',
  'Specialist Tools - Toolstation': 'Specialist Tools',
  'Tool Storage - Screwfix': 'Tool Storage',
  'Tool Storage - Toolstation': 'Tool Storage',
  'Safety Tools - Screwfix': 'Safety Tools',
  'Safety Tools - Toolstation': 'Safety Tools',
  'Access Tools & Equipment - Screwfix': 'Access Tools & Equipment',
  'Access Tools & Equipment - Toolstation': 'Access Tools & Equipment',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { batchNumber } = await req.json();

    console.log(`🚀 Starting batch ${batchNumber || 1}...`);

    // Check current queue status
    const { data: queueData } = await supabase
      .from('tools_scrape_queue')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);

    // If a batch is currently processing, return its status
    const processingBatch = queueData?.find(q => q.status === 'processing');
    if (processingBatch && !batchNumber) {
      return new Response(
        JSON.stringify({
          success: true,
          status: 'in_progress',
          currentBatch: processingBatch.batch_number,
          message: `Batch ${processingBatch.batch_number}/3 is processing...`
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Determine which batch to run
    const targetBatch = batchNumber || 1;
    const urls = BATCH_URLS[targetBatch as keyof typeof BATCH_URLS];

    if (!urls) {
      throw new Error(`Invalid batch number: ${targetBatch}`);
    }

    console.log(`📋 Processing batch ${targetBatch} with ${urls.length} URLs`);

    // Create Firecrawl batch job
    const batchResponse = await fetch('https://api.firecrawl.dev/v1/batch/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        urls: urls.map(u => u.url),
        formats: ['extract'],
        extract: {
          schema: {
            type: 'object',
            properties: {
              products: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: {
                      type: "string",
                      description: "Full product name including model number",
                    },
                    brand: {
                      type: "string",
                      description: "Brand/manufacturer name (e.g., Makita, DeWalt, Bosch, Hilti, Bahco, Wiha, Wera)",
                    },
                    price: {
                      type: "string",
                      description: "Current price in GBP",
                    },
                    description: {
                      type: "string",
                      description: "Brief product description or key features",
                    },
                    category: {
                      type: "string",
                      description: "Product category (e.g., Drills, Screwdrivers, Power Tools)",
                    },
                    productType: {
                      type: "string",
                      description: "Specific type (e.g., SDS Drill, Combi Drill, Cordless, Corded)",
                    },
                    image: {
                      type: "string",
                      format: "uri",
                      description: "URL of the product image",
                    },
                    view_product_url: {
                      type: "string",
                      format: "uri",
                      description: "Direct URL to the product page",
                    },
                  }
                }
              }
            }
          }
        }
      })
    });

    if (!batchResponse.ok) {
      throw new Error(`Firecrawl API error: ${batchResponse.statusText}`);
    }

    const batchData = await batchResponse.json();
    console.log(`✅ Firecrawl batch job created:`, batchData.id);

    // Store in queue
    await supabase.from('tools_scrape_queue').insert({
      batch_number: targetBatch,
      status: 'processing',
      firecrawl_job_id: batchData.id,
      firecrawl_job_url: batchData.url,
      urls: urls,
      started_at: new Date().toISOString()
    });

    // Start polling and storing results (max 2 minutes = 24 polls)
    pollAndStoreResults(batchData.id, targetBatch, urls, supabase);

    return new Response(
      JSON.stringify({
        success: true,
        status: 'in_progress',
        batchNumber: targetBatch,
        totalBatches: 3,
        message: `Batch ${targetBatch}/3 started. Results will be available in 2-3 minutes.`,
        firecrawlJobId: batchData.id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function pollAndStoreResults(jobId: string, batchNumber: number, urls: any[], supabase: any) {
  const maxPolls = 24; // 2 minutes max  
  let pollCount = 0;

  const pollInterval = setInterval(async () => {
    pollCount++;
    console.log(`🔄 Poll ${pollCount}: Checking batch ${batchNumber} status...`);

    try {
      const statusResponse = await fetch(`https://api.firecrawl.dev/v1/batch/scrape/${jobId}`, {
        headers: { 'Authorization': `Bearer ${FIRECRAWL_API_KEY}` }
      });

      if (!statusResponse.ok) {
        throw new Error('Failed to check Firecrawl status');
      }

      const statusData = await statusResponse.json();

      if (statusData.status === 'completed') {
        clearInterval(pollInterval);
        console.log(`✅ Batch ${batchNumber} completed!`);

        // Group tools by category
        const toolsByCategory: Record<string, any[]> = {};
        
        statusData.data?.forEach((result: any, index: number) => {
          const urlName = urls[index]?.name || 'Unknown';
          const category = CATEGORY_MAPPING[urlName] || urlName;
          const products = result.extract?.products || [];

          console.log(`📦 URL ${index + 1} (${urlName}): ${products.length} products`);

          if (!toolsByCategory[category]) {
            toolsByCategory[category] = [];
          }

          products.forEach((product: any) => {
            toolsByCategory[category].push({
              ...product,
              category,
              supplier: urlName.includes('Screwfix') ? 'Screwfix' : 'Toolstation',
              view_product_url: product.productUrl,
              id: Math.floor(Math.random() * 1000000)
            });
          });
        });

        // Store each category in tools_weekly_cache
        let totalTools = 0;
        const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();

        for (const [category, tools] of Object.entries(toolsByCategory)) {
          await supabase.from('tools_weekly_cache').upsert({
            category,
            tools_data: tools,
            total_products: tools.length,
            expires_at: expiresAt,
            update_status: 'completed',
            last_updated: new Date().toISOString()
          }, { onConflict: 'category' });

          totalTools += tools.length;
          console.log(`💾 Stored ${tools.length} tools for ${category}`);
        }

        // Update queue status
        await supabase.from('tools_scrape_queue')
          .update({
            status: 'completed',
            tools_found: totalTools,
            completed_at: new Date().toISOString()
          })
          .eq('firecrawl_job_id', jobId);

        console.log(`✅ Batch ${batchNumber} complete: ${totalTools} tools stored`);

        // Auto-trigger next batch if not the last one
        if (batchNumber < 3) {
          console.log(`🚀 Auto-triggering batch ${batchNumber + 1}...`);
          
          fetch(`${SUPABASE_URL}/functions/v1/firecrawl-v2-tools-batch`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ batchNumber: batchNumber + 1 })
          });
        }

      } else if (pollCount >= maxPolls) {
        clearInterval(pollInterval);
        console.error(`⏱️ Batch ${batchNumber} timeout after ${maxPolls} polls`);
        
        await supabase.from('tools_scrape_queue')
          .update({
            status: 'failed',
            error_message: 'Timeout: exceeded maximum polling time',
            completed_at: new Date().toISOString()
          })
          .eq('firecrawl_job_id', jobId);
      } else {
        console.log(`⏳ Batch ${batchNumber} status: ${statusData.status} - ${statusData.completed}/${statusData.total}`);
      }

    } catch (error) {
      clearInterval(pollInterval);
      console.error(`❌ Error polling batch ${batchNumber}:`, error);
      
      await supabase.from('tools_scrape_queue')
        .update({
          status: 'failed',
          error_message: error.message,
          completed_at: new Date().toISOString()
        })
        .eq('firecrawl_job_id', jobId);
    }
  }, 5000); // Poll every 5 seconds
}
