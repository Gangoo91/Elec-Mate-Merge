import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ToolProduct {
  name: string;
  category: string;
  price: string;
  supplier: string;
  image?: string;
  description?: string;
  stockStatus?: string;
  highlights?: string[];
  view_product_url?: string;
  reviews?: string;
}

// Reduced categories to prevent timeout - focus on most essential tools
const toolCategories = [
  {
    name: "Hand Tools",
    searchTerms: ["screwdrivers", "hammers", "pliers", "spanners", "hand tools"],
    suppliers: [
      { name: "Screwfix", url: "https://www.screwfix.com/search?search=hand+tools+electrical&page_size=50" },
      { name: "Toolstation", url: "https://www.toolstation.com/search?q=hand+tools+electrical" }
    ]
  },
  {
    name: "Power Tools",
    searchTerms: ["drills", "saws", "grinders", "power tools", "cordless"],
    suppliers: [
      { name: "Screwfix", url: "https://www.screwfix.com/search?search=power+tools+electrical&page_size=50" },
      { name: "Toolstation", url: "https://www.toolstation.com/search?q=power+tools+electrical" }
    ]
  },
  {
    name: "Testing Equipment",
    searchTerms: ["multimeters", "testers", "RCD testers", "insulation testers", "testing equipment"],
    suppliers: [
      { name: "Screwfix", url: "https://www.screwfix.com/search?search=electrical+testers&page_size=50" },
      { name: "Toolstation", url: "https://www.toolstation.com/search?q=electrical+testing+equipment" }
    ]
  }
];

const productSchema = {
  type: "array",
  items: {
    type: "object",
    required: ["name", "price"],
    properties: {
      name: { type: "string", description: "The complete product name or title" },
      category: { type: "string", description: "The product category or type" },
      price: { type: "string", description: "The price including currency (£) and any VAT info" },
      description: { type: "string", description: "Key product features and specifications" },
      highlights: { type: "array", items: { type: "string" }, description: "Key selling points or features" },
      reviews: { type: "string", description: "Customer rating and review count" },
      image: { type: "string", description: "Product image URL" },
      view_product_url: { type: "string", description: "Direct link to the full product page" },
      stockStatus: { type: "string", description: "Stock availability (In Stock, Out of Stock, Low Stock)" }
    }
  }
};

async function scrapeToolsFromSupplier(supplierUrl: string, supplierName: string, category: string): Promise<ToolProduct[]> {
  const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
  
  if (!FIRECRAWL_API_KEY) {
    throw new Error('FIRECRAWL_API_KEY not found');
  }

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: supplierUrl,
      onlyMainContent: true,
      maxAge: 0,
      formats: [
        {
          type: "json",
          prompt: `Extract electrical ${category.toLowerCase()} products from this page. Focus on products relevant to electricians and electrical work.`,
          schema: productSchema,
        },
      ],
    }),
  };

  try {
    console.log(`🔧 Scraping ${category} from ${supplierName}...`);
    
    // Add timeout handling for individual requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 second timeout per request
    
    const response = await fetch("https://api.firecrawl.dev/v2/scrape", {
      ...options,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`❌ API request failed for ${supplierName}: ${response.status}`);
      return [];
    }

    const data = await response.json();
    const products = data.data?.json || [];
    
    // Add supplier and category info to each product
    const processedProducts = products.map((product: any) => ({
      ...product,
      supplier: supplierName,
      category: category,
      stockStatus: product.stockStatus || 'In Stock'
    }));

    console.log(`✅ Retrieved ${processedProducts.length} ${category} products from ${supplierName}`);
    return processedProducts;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error(`⏰ Timeout scraping ${category} from ${supplierName}`);
    } else {
      console.error(`⚠️ Error scraping ${category} from ${supplierName}:`, error);
    }
    return [];
  }
}

async function scrapeAllToolCategories(): Promise<ToolProduct[]> {
  const allProducts: ToolProduct[] = [];
  
  // Process all categories and suppliers in parallel for speed
  const scrapePromises: Promise<ToolProduct[]>[] = [];
  
  for (const category of toolCategories) {
    console.log(`📂 Processing category: ${category.name}`);
    
    for (const supplier of category.suppliers) {
      scrapePromises.push(
        scrapeToolsFromSupplier(supplier.url, supplier.name, category.name)
      );
    }
  }
  
  // Wait for all scraping operations to complete
  console.log(`⚡ Starting ${scrapePromises.length} parallel scraping operations...`);
  const results = await Promise.allSettled(scrapePromises);
  
  // Collect all successful results
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      allProducts.push(...result.value);
    } else {
      console.error(`❌ Scraping operation ${index + 1} failed:`, result.reason);
    }
  });
  
  return allProducts;
}

async function saveToolsToDatabase(tools: ToolProduct[]) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  try {
    console.log(`💾 Saving ${tools.length} tools to database...`);
    
    // Calculate expiry date (1 week from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    
    // Save to materials_weekly_cache table
    const { error } = await supabase
      .from('materials_weekly_cache')
      .upsert({
        materials_data: tools,
        expires_at: expiresAt.toISOString(),
        last_updated: new Date().toISOString()
      });
    
    if (error) {
      console.error('❌ Error saving to database:', error);
      throw error;
    }
    
    console.log('✅ Tools successfully saved to database');
    return true;
  } catch (error) {
    console.error('❌ Failed to save tools to database:', error);
    throw error;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🚀 Comprehensive Tools Scraper started');
    
    // Scrape all tool categories from multiple suppliers
    const allTools = await scrapeAllToolCategories();
    
    if (allTools.length === 0) {
      console.log('⚠️ No tools were scraped from any source');
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'No tools found',
          toolsCount: 0 
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Save to database
    await saveToolsToDatabase(allTools);
    
    console.log(`🎉 Successfully processed ${allTools.length} tools across all categories`);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully scraped and saved ${allTools.length} tools`,
        toolsCount: allTools.length,
        categoriesProcessed: toolCategories.length
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('❌ Error in comprehensive-tools-scraper:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: 'Failed to scrape tools', 
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});