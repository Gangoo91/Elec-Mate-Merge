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

// Comprehensive scraping for all electrical tool categories with consistent naming
const optimizedCategories = [
  {
    name: "Hand Tools",
    suppliers: [
      { name: "Screwfix", url: "https://www.screwfix.com/search?search=electrical+hand+tools&page_size=50" }
    ]
  },
  {
    name: "Power Tools", 
    suppliers: [
      { name: "Screwfix", url: "https://www.screwfix.com/search?search=electrical+power+tools&page_size=50" }
    ]
  },
  {
    name: "Test Equipment",
    suppliers: [
      { name: "Screwfix", url: "https://www.screwfix.com/search?search=electrical+testers+multimeter&page_size=50" }
    ]
  },
  {
    name: "Safety Tools",
    suppliers: [
      { name: "Screwfix", url: "https://www.screwfix.com/search?search=electrical+safety+equipment+PPE&page_size=50" }
    ]
  },
  {
    name: "Specialist Tools",
    suppliers: [
      { name: "Screwfix", url: "https://www.screwfix.com/search?search=electrical+cables+wiring+tools&page_size=50" }
    ]
  },
  {
    name: "Access Tools & Equipment",
    suppliers: [
      { name: "Screwfix", url: "https://www.screwfix.com/search?search=ladders+steps+access+equipment&page_size=50" }
    ]
  },
  {
    name: "Tool Storage",
    suppliers: [
      { name: "Screwfix", url: "https://www.screwfix.com/search?search=tool+storage+bags+cases&page_size=50" }
    ]
  }
];

const productSchema = {
  type: "array",
  items: {
    type: "object",
    required: ["name", "price"],
    properties: {
      name: { type: "string", description: "Complete product name" },
      category: { type: "string", description: "Product category" },
      price: { type: "string", description: "Price with currency" },
      description: { type: "string", description: "Product description" },
      highlights: { type: "array", items: { type: "string" }, description: "Key features" },
      reviews: { type: "string", description: "Review information" },
      image: { type: "string", description: "Product image URL" },
      view_product_url: { type: "string", description: "Product page URL" },
      stockStatus: { type: "string", description: "Stock availability" }
    }
  }
};

async function scrapeToolsFromSupplier(supplierUrl: string, supplierName: string, category: string): Promise<ToolProduct[]> {
  const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
  
  if (!FIRECRAWL_API_KEY) {
    console.error('❌ FIRECRAWL_API_KEY not found');
    return [];
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
          prompt: `Extract electrical ${category.toLowerCase()} products from this page. Include name, price, description, and any other available details.`,
          schema: productSchema,
        },
      ],
    }),
  };

  try {
    console.log(`🔧 Scraping ${category} from ${supplierName} at ${supplierUrl}`);
    const response = await fetch("https://api.firecrawl.dev/v2/scrape", options);

    if (!response.ok) {
      console.error(`❌ API request failed for ${supplierName}: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error(`Error details: ${errorText}`);
      return [];
    }

    const data = await response.json();
    console.log(`📊 Raw Firecrawl response for ${supplierName}:`, JSON.stringify(data, null, 2));
    
    const products = data.data?.json || [];
    console.log(`📦 Extracted ${products.length} raw products from ${supplierName}`);
    
    // Process and validate products
    const processedProducts = products
      .filter((product: any) => product.name && product.price) // Only keep products with required fields
      .map((product: any) => ({
        name: product.name,
        category: category,
        price: product.price,
        supplier: supplierName,
        description: product.description || '',
        highlights: Array.isArray(product.highlights) ? product.highlights : [],
        reviews: product.reviews || '',
        image: product.image || '',
        view_product_url: product.view_product_url || '',
        stockStatus: product.stockStatus || 'In Stock'
      }));

    console.log(`✅ Processed ${processedProducts.length} valid ${category} products from ${supplierName}`);
    return processedProducts;
  } catch (error) {
    console.error(`⚠️ Error scraping ${category} from ${supplierName}:`, error);
    return [];
  }
}

async function scrapeOptimizedTools(): Promise<ToolProduct[]> {
  const allProducts: ToolProduct[] = [];
  
  console.log(`🚀 Starting optimized scraping for ${optimizedCategories.length} categories`);
  
  for (const category of optimizedCategories) {
    console.log(`📂 Processing category: ${category.name}`);
    
    for (const supplier of category.suppliers) {
      // Add delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const products = await scrapeToolsFromSupplier(supplier.url, supplier.name, category.name);
      allProducts.push(...products);
      
      console.log(`📈 Total products so far: ${allProducts.length}`);
    }
  }
  
  console.log(`🎯 Optimized scraping completed. Total products: ${allProducts.length}`);
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
    console.log('🚀 Optimized Tools Scraper started');
    
    // Scrape optimized tool categories
    const allTools = await scrapeOptimizedTools();
    
    console.log(`📊 Scraping completed. Found ${allTools.length} total tools`);
    
    if (allTools.length === 0) {
      console.log('⚠️ No tools were scraped from any source');
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'No tools found from any supplier',
          toolsCount: 0,
          details: 'All Firecrawl requests may have failed or returned empty results'
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Save to database
    await saveToolsToDatabase(allTools);
    
    console.log(`🎉 Successfully processed and saved ${allTools.length} tools`);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully scraped and saved ${allTools.length} tools`,
        toolsCount: allTools.length,
        categoriesProcessed: optimizedCategories.length
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('❌ Error in optimized-tools-scraper:', error);
    
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