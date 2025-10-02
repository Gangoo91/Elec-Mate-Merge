import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SEARCH_URLS = [
  // Hand Tools (both suppliers)
  "https://www.screwfix.com/search?search=screwdrivers+pliers+spanners+electrical+work&page_size=50",
  "https://www.toolstation.com/search?q=screwdrivers+pliers+spanners+electrical+work&page_size=50",
  // Test Equipment
  "https://www.screwfix.com/search?search=testing+measurement+electrical+safety+compliance&page_size=50",
  "https://www.toolstation.com/search?q=testing+measurement+electrical+safety+compliance&page_size=50",
  // Power Tools
  "https://www.screwfix.com/search?search=electric+cordless+drilling+cutting+installation&page_size=50",
  "https://www.toolstation.com/search?q=electric+cordless+drilling+cutting+installation&page_size=50",
  // PPE
  "https://www.screwfix.com/search?search=personal+protective+equipment+safe+working+practices&page_size=50",
  "https://www.toolstation.com/search?q=personal+protective+equipment+safe+working+practices&page_size=50",
  // Specialist Tools
  "https://www.screwfix.com/search?search=cable+stripper+fish+tape+electrical&page_size=50",
  "https://www.toolstation.com/search?q=cable+stripper+fish+tape+electrical&page_size=50",
  // Tool Storage
  "https://www.screwfix.com/search?search=tool+bags+boxes+storage+solutions+organisation&page_size=50",
  "https://www.toolstation.com/search?q=tool+bags+boxes+storage+solutions+organisation&page_size=50",
  // Safety Tools
  "https://www.screwfix.com/search?search=hazard+identification+protection+safety+equipment&page_size=50",
  "https://www.toolstation.com/search?q=hazard+identification+protection+safety+equipment&page_size=50",
  // Access Tools & Equipment
  "https://www.screwfix.com/search?search=Equipment+ladders+scaffolding+access+working+at+height&page_size=50",
  "https://www.toolstation.com/search?q=Equipment+ladders+scaffolding+access+working+at+height&page_size=50",
  // Specialist Electrical Tools
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
          stockStatus: {
            type: "string",
            description: "Stock availability (In Stock, Out of Stock, Low Stock)",
          },
          productCode: {
            type: "string",
            description: "SKU or product code",
          },
          voltage: {
            type: "string",
            description: "Voltage rating for power tools (e.g., 18V, 240V)",
          },
          keyFeatures: {
            type: "array",
            items: { type: "string" },
            description: "Key features or highlights",
          },
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

async function getToolsWithBatchAPI(apiKey: string) {
  const url = "https://api.firecrawl.dev/v2/batch/scrape";
  
  console.log('🚀 Starting batch scrape job with Firecrawl V2...');
  console.log(`📋 Scraping ${SEARCH_URLS.length} URLs across 8 categories from 2 suppliers`);
  
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      urls: SEARCH_URLS,
      onlyMainContent: true,
      maxAge: 0,
      formats: [
        {
          type: "json",
          prompt: `Extract all tool products visible on this page. For each product, include:  
                - Full product names, including model numbers  
                - Brand names (prioritize: Makita, Hilti, DeWalt, Bosch, Bahco, Wiha, Wera, MK, CK)  
                - Exact prices in GBP  
                - Product codes or SKUs  
                - Stock availability (in stock or not)  
                - Product categories and specific types (e.g. Hand Tools, Power Tools, Test Equipment, PPE, Safety Tools, Access Tools & Equipment, Tool Storage, Specialist Tools)  
                - Voltage ratings for power tools (e.g., 18V, 240V)  
                - Key features or highlights if available  
                - Direct URLs to product pages  
                - Product images  
    
                Extract every product visible on the page, capturing all the details above.`,
          schema: schema,
        },
      ],
    }),
  };

  const response = await fetch(url, options);
  const job = await response.json();
  
  if (!job.success || !job.url) {
    throw new Error(`Failed to create batch job: ${JSON.stringify(job)}`);
  }
  
  console.log(`✅ Batch job created with ID: ${job.id}`);
  console.log(`🔗 Status URL: ${job.url}`);

  let status: any;
  let pollCount = 0;
  const maxPolls = 120; // 10 minutes max (5s * 120)

  do {
    await new Promise((r) => setTimeout(r, 5000)); // Poll every 5 seconds
    pollCount++;
    
    const statusResponse = await fetch(job.url, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    status = await statusResponse.json();
    
    console.log(`⏳ Poll ${pollCount}: Status = ${status.status}, Completed = ${status.completed || 0}/${status.total || 0}`);
    
    if (pollCount >= maxPolls) {
      throw new Error('Batch job timeout - exceeded maximum polling time');
    }
  } while (status.status !== "completed" && status.status !== "failed");

  if (status.status === "failed") {
    throw new Error(`Batch job failed: ${JSON.stringify(status)}`);
  }

  console.log(`✅ Batch job completed! Processing ${status.data?.length || 0} results...`);

  // Extract and flatten all products from all URLs
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

  return allProducts;
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

    // Get all tools using batch API
    const allTools = await getToolsWithBatchAPI(apiKey);
    
    console.log(`\n📊 TOTAL TOOLS FOUND: ${allTools.length}`);

    // Group tools by category for storage
    const toolsByCategory: Record<string, any[]> = {};
    
    allTools.forEach(tool => {
      if (!toolsByCategory[tool.category]) {
        toolsByCategory[tool.category] = [];
      }
      toolsByCategory[tool.category].push(tool);
    });

    // Store each category in database
    const categoryResults = [];
    
    for (const [category, tools] of Object.entries(toolsByCategory)) {
      console.log(`💾 Storing ${tools.length} tools for ${category}...`);
      
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 day expiry

      const { error: storeError } = await supabase
        .from('tools_weekly_cache')
        .insert({
          category: category,
          tools_data: tools,
          total_products: tools.length,
          expires_at: expiresAt.toISOString(),
          created_at: new Date().toISOString(),
          update_status: 'completed'
        });

      if (storeError) {
        console.error(`⚠️ [${category}] Error storing in cache:`, storeError);
        categoryResults.push({
          category,
          success: false,
          toolsFound: tools.length,
          error: storeError.message
        });
      } else {
        console.log(`✅ [${category}] Stored ${tools.length} tools in cache`);
        categoryResults.push({
          category,
          success: true,
          toolsFound: tools.length
        });
      }
    }

    console.log('\n✅ Batch scraping completed successfully');
    console.log(`📊 Summary: ${allTools.length} total tools across ${Object.keys(toolsByCategory).length} categories`);

    return new Response(
      JSON.stringify({
        success: true,
        totalToolsFound: allTools.length,
        categoriesProcessed: Object.keys(toolsByCategory).length,
        categoriesSuccessful: categoryResults.filter(r => r.success).length,
        breakdown: categoryResults,
        summary: categoryResults.map(r => ({
          category: r.category,
          success: r.success,
          toolsFound: r.toolsFound,
          error: r.error
        }))
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('❌ Batch scraper error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error instanceof Error ? error.stack : undefined
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
