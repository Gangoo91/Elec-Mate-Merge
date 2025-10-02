import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SEARCH_URLS = [
  "https://www.screwfix.com/search?search=screwdrivers+pliers+spanners+electrical+work&page_size=50",
  "https://www.toolstation.com/search?q=screwdrivers+pliers+spanners+electrical+work&page_size=50",
  "https://www.screwfix.com/search?search=testing+measurement+electrical+safety+compliance&page_size=50",
  "https://www.toolstation.com/search?q=testing+measurement+electrical+safety+compliance&page_size=50",
  "https://www.screwfix.com/search?search=electric+cordless+drilling+cutting+installation&page_size=50",
  "https://www.toolstation.com/search?q=electric+cordless+drilling+cutting+installation&page_size=50",
  "https://www.screwfix.com/search?search=personal+protective+equipment+safe+working+practices&page_size=50",
  "https://www.toolstation.com/search?q=personal+protective+equipment+safe+working+practices&page_size=50",
  "https://www.screwfix.com/search?search=cable+stripper+fish+tape+electrical&page_size=50",
  "https://www.toolstation.com/search?q=cable+stripper+fish+tape+electrical&page_size=50",
  "https://www.screwfix.com/search?search=tool+bags+boxes+storage+solutions+organisation&page_size=50",
  "https://www.toolstation.com/search?q=tool+bags+boxes+storage+solutions+organisation&page_size=50",
  "https://www.screwfix.com/search?search=hazard+identification+protection+safety+equipment&page_size=50",
  "https://www.toolstation.com/search?q=hazard+identification+protection+safety+equipment&page_size=50",
  "https://www.screwfix.com/search?search=Equipment+ladders+scaffolding+access+working+at+height&page_size=50",
  "https://www.toolstation.com/search?q=Equipment+ladders+scaffolding+access+working+at+height&page_size=50",
  "https://www.screwfix.com/search?search=specialist+electrical+tools+installation+tasks&page_size=50",
  "https://www.toolstation.com/search?q=specialist+electrical+tools+installation+tasks&page_size=50",
];

const schema = {
  type: "object",
  properties: {
    products: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string", description: "Full product name including model number" },
          brand: { type: "string", description: "Brand/manufacturer name" },
          price: { type: "string", description: "Current price in GBP" },
          description: { type: "string", description: "Brief product description" },
          category: { type: "string", description: "Product category" },
          productType: { type: "string", description: "Specific type" },
          image: { type: "string", format: "uri", description: "Product image URL" },
          view_product_url: { type: "string", format: "uri", description: "Product page URL" },
          stockStatus: { type: "string", description: "Stock availability" },
          productCode: { type: "string", description: "SKU or product code" },
          voltage: { type: "string", description: "Voltage rating for power tools" },
          keyFeatures: { type: "array", items: { type: "string" }, description: "Key features" },
        },
        required: ["name", "brand", "price"],
      },
    },
  },
  required: ["products"],
};

function mapUrlToCategory(url: string): string {
  if (url.includes('screwdrivers+pliers+spanners')) return 'Hand Tools';
  if (url.includes('testing+measurement')) return 'Test Equipment';
  if (url.includes('electric+cordless+drilling')) return 'Power Tools';
  if (url.includes('personal+protective+equipment')) return 'PPE';
  if (url.includes('cable+stripper+fish+tape')) return 'Specialist Tools';
  if (url.includes('tool+bags+boxes+storage')) return 'Tool Storage';
  if (url.includes('hazard+identification')) return 'Safety Tools';
  if (url.includes('ladders+scaffolding')) return 'Access Tools & Equipment';
  if (url.includes('specialist+electrical+tools')) return 'Specialist Tools';
  return 'Hand Tools';
}

function extractSupplier(url: string): string {
  if (url.includes('screwfix.com')) return 'Screwfix';
  if (url.includes('toolstation.com')) return 'Toolstation';
  return 'Unknown';
}

// Background task to poll Firecrawl and store results
async function pollAndStoreResults(jobUrl: string, jobId: string, apiKey: string) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  console.log(`🔄 [Background] Starting polling for job ${jobId}`);

  let status: any;
  let pollCount = 0;
  const maxPolls = 120; // 10 minutes max

  try {
    do {
      await new Promise((r) => setTimeout(r, 5000));
      pollCount++;

      const statusRes = await fetch(jobUrl, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      status = await statusRes.json();

      console.log(`🔄 [Background] Poll ${pollCount}: ${status.status} - ${status.completed || 0}/${status.total || 0}`);

      if (pollCount >= maxPolls) {
        console.error('❌ [Background] Job timeout after 10 minutes');
        return;
      }
    } while (status.status !== 'completed' && status.status !== 'failed');

    if (status.status === 'failed') {
      console.error('❌ [Background] Job failed:', status);
      return;
    }

    console.log(`✅ [Background] Job completed! Processing ${status.data?.length || 0} results...`);

    // Process results
    const allProducts = status.data
      ?.map((item: any, urlIndex: number) => {
        const url = SEARCH_URLS[urlIndex];
        const category = mapUrlToCategory(url);
        const supplier = extractSupplier(url);

        const products = item?.json?.products || [];
        console.log(`📦 [Background] URL ${urlIndex + 1} (${category} - ${supplier}): ${products.length} products`);

        return products.map((product: any, idx: number) => ({
          id: Date.now() + urlIndex * 1000 + idx,
          name: product.name || 'Unknown Product',
          brand: product.brand || 'Generic',
          price: product.price || '£0.00',
          supplier: supplier,
          category: category,
          image: product.image || '/placeholder.svg',
          productUrl: product.view_product_url || url,
          stockStatus: product.stockStatus || 'In Stock',
          description: product.description || '',
          productCode: product.productCode || '',
          voltage: product.voltage || '',
          keyFeatures: product.keyFeatures || [],
          productType: product.productType || ''
        }));
      })
      .flat() || [];

    console.log(`📊 [Background] TOTAL: ${allProducts.length} tools`);

    // Group by category
    const toolsByCategory: Record<string, any[]> = {};
    allProducts.forEach(tool => {
      if (!toolsByCategory[tool.category]) {
        toolsByCategory[tool.category] = [];
      }
      toolsByCategory[tool.category].push(tool);
    });

    // Store in database
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    for (const [category, tools] of Object.entries(toolsByCategory)) {
      console.log(`💾 [Background] Storing ${tools.length} tools for ${category}`);

      const { error } = await supabase
        .from('tools_weekly_cache')
        .insert({
          category: category,
          tools_data: tools,
          total_products: tools.length,
          expires_at: expiresAt.toISOString(),
          created_at: new Date().toISOString(),
          update_status: 'completed'
        });

      if (error) {
        console.error(`⚠️ [Background] Error storing ${category}:`, error);
      } else {
        console.log(`✅ [Background] Stored ${category} successfully`);
      }
    }

    console.log('✅ [Background] All results stored successfully!');
  } catch (error) {
    console.error('❌ [Background] Error:', error);
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🚀 Firecrawl V2 Batch Tools Scraper started');

    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      throw new Error('FIRECRAWL_API_KEY not configured');
    }

    console.log('📋 Starting batch scrape job...');
    console.log(`🔍 Scraping ${SEARCH_URLS.length} URLs across 8 categories from 2 suppliers`);

    // Create batch job
    const batchResponse = await fetch('https://api.firecrawl.dev/v2/batch/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        urls: SEARCH_URLS,
        onlyMainContent: true,
        maxAge: 0,
        formats: [{
          type: 'json',
          prompt: `Extract all tool products visible on this page. For each product, include: full product names with model numbers, brand names (prioritize: Makita, Hilti, DeWalt, Bosch, Bahco, Wiha, Wera, MK, CK), exact prices in GBP, product codes/SKUs, stock availability, categories, voltage ratings for power tools, key features, direct URLs to product pages, and product images. Extract every product visible.`,
          schema: schema,
        }],
      }),
    });

    const job = await batchResponse.json();

    if (!job.success || !job.url) {
      throw new Error(`Failed to create batch job: ${JSON.stringify(job)}`);
    }

    console.log(`✅ Batch job created: ${job.id}`);
    console.log(`🔗 Job URL: ${job.url}`);

    // Start background polling task (won't block response)
    EdgeRuntime.waitUntil(pollAndStoreResults(job.url, job.id, apiKey));

    // Return immediately
    return new Response(
      JSON.stringify({
        success: true,
        status: 'started',
        message: 'Batch scraping job started successfully! Results will be available in 3-5 minutes. The page will auto-refresh to show new tools.',
        jobId: job.id,
        estimatedTime: '3-5 minutes',
        urls: SEARCH_URLS.length,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('❌ Error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error instanceof Error ? error.stack : undefined
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
