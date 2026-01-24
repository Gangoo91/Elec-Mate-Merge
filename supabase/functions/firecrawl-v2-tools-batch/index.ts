import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// Define 4 batches of 4-5 URLs each
const BATCH_URLS = {
  1: [
    { url: 'https://www.screwfix.com/search?search=screwdrivers+pliers+spanners+electrical+work&page_size=50', name: 'Hand Tools - Screwfix' },
    { url: 'https://www.toolstation.com/search?q=screwdrivers+pliers+spanners+electrical+work', name: 'Hand Tools - Toolstation' },
    { url: 'https://www.screwfix.com/search?search=testing+measurement+electrical+safety+compliance&page_size=50', name: 'Test Equipment - Screwfix' },
    { url: 'https://www.toolstation.com/search?q=testing+measurement+electrical+safety+compliance', name: 'Test Equipment - Toolstation' },
    { url: 'https://www.screwfix.com/search?search=Drills, saws, grinders and cordless tool systems', name: 'Power Tools - Screwfix' },
  ],
  2: [
    { url: 'https://www.toolstation.com/search?q=Drills, saws, grinders and cordless tool systems', name: 'Power Tools - Toolstation' },
    { url: 'https://www.screwfix.com/search?search=personal protective equipment&page_size=50', name: 'PPE - Screwfix' },
    { url: 'https://www.toolstation.com/search?q=personal protective equipment', name: 'PPE - Toolstation' },
    { url: 'https://www.screwfix.com/search?search=cable+stripper+fish+tape+electrical&page_size=50', name: 'Specialist Tools - Screwfix' },
  ],
  3: [
    { url: 'https://www.toolstation.com/search?q=cable+stripper+fish+tape+electrical', name: 'Specialist Tools - Toolstation' },
    { url: 'https://www.toolstation.com/search?q=tool+bags+boxes+storage+solutions+organisation&page_size=50', name: 'Tool Storage - Screwfix' },
    { url: 'https://www.screwfix.com/search?search=hazard+identification+protection+safety+equipment', name: 'Tool Storage - Toolstation' },
    { url: 'https://www.screwfix.com/search?search=Equipment+ladders+scaffolding+access+working+at+height&page_size=50', name: 'Safety Tools - Screwfix' },
  ],
  4: [
    { url: 'https://www.screwfix.com/search?search=tool+bags+boxes+storage+solutions+organisation', name: 'Safety Tools - Toolstation' },
    { url: 'https://www.screwfix.com/search?search=specialist+electrical+tools+installation+tasks&page_size=50', name: 'Access Tools & Equipment - Screwfix' },
    { url: 'https://www.toolstation.com/search?q=hazard+identification+protection+safety+equipment', name: 'Access Tools & Equipment - Toolstation' },
    { url: 'https://www.toolstation.com/search?q=Equipment+ladders+scaffolding+access+working+at+height&page_size=50', name: 'Specialist Tools - Toolstation' },
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

function intelligentlyCategorize(toolName: string, toolDescription: string, category: string, batchCategory: string): string {
  const name = toolName.toLowerCase();
  const cat = category.toLowerCase();
  const desc = (toolDescription || '').toLowerCase();
  
  // Test Equipment keywords
  if (cat.includes("test")) {
    return 'Test Equipment';
  }
  
  // Hand Tools keywords
  if (cat.includes("hand")) {
    return 'Hand Tools';
  }
  
  // Power Tools keywords
  if (cat.includes("power")) {
    return 'Power Tools';
  }
  
  // Tool Storage keywords
  if (cat.includes("storage")) {
    return 'Tool Storage';
  }
  
  // Safety Tools
  if (cat.includes("safety")) {
    return 'Safety Tools';
  }

  // PPE keywords
  if (cat.includes("PPE")) {
    return 'Safety Tools';
  }
  
  // Access Tools keywords
  if (cat.includes("access")) {
    return 'Access Tools & Equipment';
  }
  
  // Specialist Tools keywords
  if (cat.includes("specialist")) {
    return 'Specialist Tools';
  }
  
  // If no match found, use the batch category as fallback
  return batchCategory;
}

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

    // Create Firecrawl batch job with webhook
    const webhookUrl = `${SUPABASE_URL}/functions/v1/firecrawl-tools-webhook`;
    
    const batchResponse = await fetch('https://api.firecrawl.dev/v2/batch/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        urls: urls.map(u => u.url),
        formats: ['extract'],
        webhook: {
          url: `${webhookUrl}`,
        },
        events: ["page"],
        extract: {
          prompt: "Extract all tools and equipment products from this page with their names, brands, prices, and product URLs.",
          schema: {
            type: "object",
            properties: {
              products: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      description: "Full product name including model number"
                    },
                    brand: {
                      type: "string",
                      description: "Brand/manufacturer name"
                    },
                    price: {
                      type: "string",
                      description: "Current price in GBP"
                    },
                    description: {
                      type: "string",
                      description: "Brief product description or key features"
                    },
                    category: {
                      type: "string",
                      description: "Product category"
                    },
                    productType: {
                      type: "string",
                      description: "Specific product type"
                    },
                    image: {
                      type: "string",
                      description: "URL of the product image"
                    },
                    view_product_url: {
                      type: "string",
                      description: "Direct URL to the product page"
                    }
                  },
                  required: ["name", "price", "view_product_url"]
                }
              }
            },
            required: ["products"]
          }
        }
      })
    });

    if (!batchResponse.ok) {
      throw new Error(`Firecrawl API error: ${batchResponse.statusText}`);
    }

    const batchData = await batchResponse.json();
    console.log(`✅ Firecrawl batch job created with webhook:`, batchData.id);

    // Store in queue
    await supabase.from('tools_scrape_queue').insert({
      batch_number: targetBatch,
      status: 'processing',
      firecrawl_job_id: batchData.id,
      firecrawl_job_url: batchData.url,
      urls: urls,
      started_at: new Date().toISOString()
    });

    // Return immediately - webhook will handle completion
    return new Response(
      JSON.stringify({
        success: true,
        status: 'processing',
        batchNumber: targetBatch,
        totalBatches: 4,
        message: `Batch ${targetBatch}/4 started. Webhook will process results when complete.`,
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
