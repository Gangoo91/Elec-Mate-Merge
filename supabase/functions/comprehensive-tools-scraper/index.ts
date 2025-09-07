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
  },
  {
    name: "Safety Equipment",
    searchTerms: ["hard hats", "safety boots", "gloves", "high vis", "PPE"],
    suppliers: [
      { name: "Screwfix", url: "https://www.screwfix.com/search?search=electrical+safety+PPE&page_size=50" },
      { name: "Toolstation", url: "https://www.toolstation.com/search?q=electrical+safety+equipment" }
    ]
  },
  {
    name: "Measuring & Marking",
    searchTerms: ["tape measures", "levels", "markers", "measuring tools"],
    suppliers: [
      { name: "Screwfix", url: "https://www.screwfix.com/search?search=measuring+marking+tools&page_size=50" },
      { name: "Toolstation", url: "https://www.toolstation.com/search?q=measuring+marking+tools" }
    ]
  },
  {
    name: "Cutting Tools",
    searchTerms: ["wire cutters", "strippers", "cable knives", "hole saws"],
    suppliers: [
      { name: "Screwfix", url: "https://www.screwfix.com/search?search=electrical+cutting+tools&page_size=50" },
      { name: "Toolstation", url: "https://www.toolstation.com/search?q=electrical+cutting+tools" }
    ]
  },
  {
    name: "Installation Tools",
    searchTerms: ["cable pullers", "conduit benders", "fish tapes", "installation accessories"],
    suppliers: [
      { name: "Screwfix", url: "https://www.screwfix.com/search?search=electrical+installation+tools&page_size=50" },
      { name: "Toolstation", url: "https://www.toolstation.com/search?q=electrical+installation+tools" }
    ]
  },
  {
    name: "Ladder & Access",
    searchTerms: ["ladders", "steps", "platforms", "access equipment"],
    suppliers: [
      { name: "Screwfix", url: "https://www.screwfix.com/search?search=ladders+access+equipment&page_size=50" },
      { name: "Toolstation", url: "https://www.toolstation.com/search?q=ladders+access+equipment" }
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
    const response = await fetch("https://api.firecrawl.dev/v2/scrape", options);

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
    console.error(`⚠️ Error scraping ${category} from ${supplierName}:`, error);
    return [];
  }
}

async function scrapeAllToolCategories(): Promise<ToolProduct[]> {
  const allProducts: ToolProduct[] = [];
  
  for (const category of toolCategories) {
    console.log(`📂 Processing category: ${category.name}`);
    
    for (const supplier of category.suppliers) {
      // Add delay between requests to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const products = await scrapeToolsFromSupplier(supplier.url, supplier.name, category.name);
      allProducts.push(...products);
    }
  }
  
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