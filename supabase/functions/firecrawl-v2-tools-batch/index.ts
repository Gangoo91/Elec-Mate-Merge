import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Reduced to 6 URLs to stay within timeout
const SEARCH_URLS = [
  "https://www.screwfix.com/search?search=screwdrivers+pliers+spanners+electrical+work&page_size=50",
  "https://www.screwfix.com/search?search=testing+measurement+electrical+safety+compliance&page_size=50",
  "https://www.screwfix.com/search?search=electric+cordless+drilling+cutting+installation&page_size=50",
  "https://www.toolstation.com/search?q=screwdrivers+pliers+spanners+electrical+work&page_size=50",
  "https://www.toolstation.com/search?q=testing+measurement+electrical+safety+compliance&page_size=50",
  "https://www.toolstation.com/search?q=electric+cordless+drilling+cutting+installation&page_size=50",
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
          image: { type: "string", format: "uri" },
          view_product_url: { type: "string", format: "uri" },
          stockStatus: { type: "string" },
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
    console.log('🚀 Starting Firecrawl batch scrape (6 URLs)');

    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      throw new Error('FIRECRAWL_API_KEY not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Create batch job
    console.log('📋 Creating batch job...');
    const batchResponse = await fetch('https://api.firecrawl.dev/v2/batch/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        urls: SEARCH_URLS,
        onlyMainContent: true,
        formats: [{
          type: 'json',
          prompt: `Extract all electrical tool products. For each: name, brand (Makita, DeWalt, Bosch, Hilti, etc.), price in GBP, image URL, product page URL, stock status.`,
          schema: schema,
        }],
      }),
    });

    const job = await batchResponse.json();

    if (!job.success || !job.url) {
      throw new Error(`Failed to create batch job: ${JSON.stringify(job)}`);
    }

    console.log(`✅ Job created: ${job.id}`);

    // Poll with 2 minute limit (24 polls × 5s)
    let status: any;
    let pollCount = 0;
    const maxPolls = 24;

    do {
      await new Promise((r) => setTimeout(r, 5000));
      pollCount++;

      const statusRes = await fetch(job.url, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      status = await statusRes.json();

      console.log(`⏳ Poll ${pollCount}/${maxPolls}: ${status.status} - ${status.completed || 0}/${status.total || 0}`);

    } while (status.status !== 'completed' && status.status !== 'failed' && pollCount < maxPolls);

    if (status.status === 'failed') {
      throw new Error(`Batch job failed: ${JSON.stringify(status)}`);
    }

    if (status.status !== 'completed') {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Job is taking longer than expected. Please try again in a few minutes.',
          timeout: true
        }),
        {
          status: 408,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log(`✅ Job completed! Processing results...`);

    // Process results
    const allProducts = status.data
      ?.map((item: any, urlIndex: number) => {
        const url = SEARCH_URLS[urlIndex];
        const category = mapUrlToCategory(url);
        const supplier = extractSupplier(url);
        const products = item?.json?.products || [];
        
        console.log(`📦 ${category} (${supplier}): ${products.length} products`);

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
        }));
      })
      .flat() || [];

    console.log(`📊 Total: ${allProducts.length} tools`);

    // Group by category
    const toolsByCategory: Record<string, any[]> = {};
    allProducts.forEach(tool => {
      if (!toolsByCategory[tool.category]) toolsByCategory[tool.category] = [];
      toolsByCategory[tool.category].push(tool);
    });

    // Clear old data
    await supabase.from('tools_weekly_cache').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // Store in database
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const results = [];
    for (const [category, tools] of Object.entries(toolsByCategory)) {
      console.log(`💾 Storing ${tools.length} tools for ${category}`);

      const { error } = await supabase
        .from('tools_weekly_cache')
        .insert({
          category,
          tools_data: tools,
          total_products: tools.length,
          expires_at: expiresAt.toISOString(),
          update_status: 'completed'
        });

      results.push({
        category,
        success: !error,
        toolsFound: tools.length,
        error: error?.message
      });

      if (error) console.error(`⚠️ Error storing ${category}:`, error);
    }

    console.log('✅ All done!');

    return new Response(
      JSON.stringify({
        success: true,
        totalToolsFound: allProducts.length,
        categoriesProcessed: Object.keys(toolsByCategory).length,
        breakdown: results,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
