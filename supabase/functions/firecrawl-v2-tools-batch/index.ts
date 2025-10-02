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

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('📋 Starting batch scrape with Firecrawl V2...');
    console.log(`🔍 Scraping ${SEARCH_URLS.length} URLs`);

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

    // Poll with timeout protection (max 2 minutes)
    let status: any;
    let pollCount = 0;
    const maxPolls = 20; // 100 seconds (5s * 20)

    do {
      await new Promise((r) => setTimeout(r, 5000));
      pollCount++;

      const statusRes = await fetch(job.url, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      status = await statusRes.json();

      console.log(`⏳ Poll ${pollCount}: ${status.status} - ${status.completed || 0}/${status.total || 0}`);

      // If job is still running after timeout, return early with job info
      if (pollCount >= maxPolls && status.status === 'scraping') {
        console.log('⚠️ Job timeout - returning job info for manual check');
        
        return new Response(
          JSON.stringify({
            success: false,
            status: 'timeout',
            message: 'Batch job is taking longer than expected. The scraping will continue in the background. Please try refreshing in a few minutes, or reduce the number of URLs.',
            jobId: job.id,
            jobUrl: job.url,
            progress: `${status.completed || 0}/${status.total || 0}`,
          }),
          {
            status: 202, // Accepted but not completed
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

    } while (status.status !== 'completed' && status.status !== 'failed' && pollCount < maxPolls);

    if (status.status === 'failed') {
      throw new Error(`Batch job failed: ${JSON.stringify(status)}`);
    }

    if (status.status !== 'completed') {
      throw new Error('Batch job timeout');
    }

    console.log(`✅ Job completed! Processing ${status.data?.length || 0} results...`);

    // Process results
    const allProducts = status.data
      ?.map((item: any, urlIndex: number) => {
        const url = SEARCH_URLS[urlIndex];
        const category = mapUrlToCategory(url);
        const supplier = extractSupplier(url);

        const products = item?.json?.products || [];
        console.log(`📦 URL ${urlIndex + 1} (${category} - ${supplier}): ${products.length} products`);

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

    console.log(`📊 TOTAL: ${allProducts.length} tools`);

    // Group by category
    const toolsByCategory: Record<string, any[]> = {};
    allProducts.forEach(tool => {
      if (!toolsByCategory[tool.category]) {
        toolsByCategory[tool.category] = [];
      }
      toolsByCategory[tool.category].push(tool);
    });

    // Store in database
    const categoryResults = [];
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    for (const [category, tools] of Object.entries(toolsByCategory)) {
      console.log(`💾 Storing ${tools.length} tools for ${category}`);

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

      categoryResults.push({
        category,
        success: !error,
        toolsFound: tools.length,
        error: error?.message
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        totalToolsFound: allProducts.length,
        categoriesProcessed: Object.keys(toolsByCategory).length,
        categoriesSuccessful: categoryResults.filter(r => r.success).length,
        breakdown: categoryResults,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
