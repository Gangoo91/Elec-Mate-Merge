import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import FirecrawlApp from 'npm:@mendable/firecrawl-js@1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Tool categories mapped to actual Screwfix category pages
const TOOL_CATEGORIES = {
  'Hand Tools': {
    url: 'https://www.screwfix.com/c/tools/hand-tools/cat830011',
    description: 'Essential hand tools for electrical work including screwdrivers, pliers, and spanners',
    expectedCount: 90
  },
  'Power Tools': {
    url: 'https://www.screwfix.com/c/tools/power-tools/cat830083',
    description: 'Electric and cordless power tools for drilling, cutting, and installation work',
    expectedCount: 37
  },
  'Test Equipment': {
    url: 'https://www.screwfix.com/c/electrical-lighting/electrical-testing-tools/cat850042',
    description: 'Testing and measurement equipment for electrical safety and compliance',
    expectedCount: 50
  },
  'PPE': {
    url: 'https://www.screwfix.com/c/safety-workwear/safety-clothing/cat870054',
    description: 'Personal protective equipment for safe working practices',
    expectedCount: 33
  },
  'Safety Tools': {
    url: 'https://www.screwfix.com/c/safety-workwear/safety-equipment/cat870164',
    description: 'Safety tools and equipment for hazard identification and protection',
    expectedCount: 6
  },
  'Access Tools & Equipment': {
    url: 'https://www.screwfix.com/c/tools/ladders-steps/cat850011',
    description: 'Ladders, scaffolding and access equipment for working at height',
    expectedCount: 34
  },
  'Tool Storage': {
    url: 'https://www.screwfix.com/c/tools/tool-storage/cat830006',
    description: 'Tool bags, boxes and storage solutions for organisation',
    expectedCount: 69
  },
  'Specialist Tools': {
    url: 'https://www.screwfix.com/c/electrical-lighting/electrical-hand-tools/cat850016',
    description: 'Specialist electrical tools for installation tasks',
    expectedCount: 27
  }
};

// Product schema optimized for electrical tools
const productSchema = {
  type: "object",
  properties: {
    tools: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string", description: "Full product name with model number" },
          price: { type: "string", description: "Price with £ symbol (e.g., £24.99)" },
          brand: { type: "string", description: "Manufacturer or brand name" },
          image: { type: "string", description: "Product image URL" },
          productUrl: { type: "string", description: "Direct product page URL" },
          stockStatus: { type: "string", description: "Stock availability (In Stock, Low Stock, Out of Stock)" },
          description: { type: "string", description: "Brief product description" },
          specifications: { 
            type: "object", 
            description: "Technical specifications like voltage, power, dimensions" 
          },
          category: { type: "string", description: "Product category or subcategory" }
        },
        required: ["name", "price"]
      }
    }
  }
};

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

    const firecrawl = new FirecrawlApp({ apiKey });

    // Array to track progress
    const categoryResults: Array<{
      category: string;
      success: boolean;
      toolsFound: number;
      tools: any[];
      error?: string;
    }> = [];

    console.log('📋 Starting sequential category scraping...');
    let totalToolsFound = 0;

    // Process each category sequentially to avoid overwhelming Firecrawl
    for (const [categoryName, categoryData] of Object.entries(TOOL_CATEGORIES)) {
      console.log(`\n🔍 [${categoryName}] Scraping from: ${categoryData.url}`);

      try {
        // Use scrapeUrl with markdown format for better reliability
        const scrapeResult = await firecrawl.scrapeUrl(categoryData.url, {
          formats: ['markdown'],
          onlyMainContent: true,
          timeout: 90000 // 90 seconds
        });

        console.log(`📄 [${categoryName}] Scrape response received`);

        if (!scrapeResult.success || !scrapeResult.markdown) {
          console.error(`❌ [${categoryName}] Scrape failed or no markdown returned`);
          categoryResults.push({
            category: categoryName,
            success: false,
            toolsFound: 0,
            tools: [],
            error: 'No markdown content returned'
          });
          continue;
        }

        // Parse tools from markdown
        const tools = parseToolsFromMarkdown(scrapeResult.markdown, categoryName, categoryData.url);
        
        console.log(`✅ [${categoryName}] Found ${tools.length} tools`);
        totalToolsFound += tools.length;

        categoryResults.push({
          category: categoryName,
          success: true,
          toolsFound: tools.length,
          tools: tools
        });

        // Store in database immediately
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7 day expiry

        const { error: storeError } = await supabase
          .from('tools_weekly_cache')
          .insert({
            category: categoryName,
            tools_data: tools,
            total_products: tools.length,
            expires_at: expiresAt.toISOString(),
            created_at: new Date().toISOString(),
            update_status: 'completed'
          });

        if (storeError) {
          console.error(`⚠️ [${categoryName}] Error storing in cache:`, storeError);
        } else {
          console.log(`💾 [${categoryName}] Stored ${tools.length} tools in cache`);
        }

        // Small delay between categories to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));

      } catch (error) {
        console.error(`❌ [${categoryName}] Scraping error:`, error);
        categoryResults.push({
          category: categoryName,
          success: false,
          toolsFound: 0,
          tools: [],
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    console.log('\n✅ Batch scraping completed');
    console.log(`📊 Total tools found: ${totalToolsFound} across ${categoryResults.filter(r => r.success).length}/${Object.keys(TOOL_CATEGORIES).length} categories`);

    return new Response(
      JSON.stringify({
        success: true,
        totalToolsFound,
        categoriesProcessed: categoryResults.length,
        categoriesSuccessful: categoryResults.filter(r => r.success).length,
        results: categoryResults,
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

// Parse tools from markdown content
function parseToolsFromMarkdown(markdown: string, category: string, baseUrl: string): any[] {
  const tools: any[] = [];
  const lines = markdown.split('\n');
  
  let currentTool: any = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Look for product names (usually in headings or bold)
    const productMatch = line.match(/^#{1,4}\s+(.+)$|^\*\*(.+)\*\*$/);
    if (productMatch) {
      // Save previous tool if exists
      if (currentTool && currentTool.name && currentTool.price) {
        tools.push({ ...currentTool, category });
      }
      
      // Start new tool
      currentTool = {
        name: (productMatch[1] || productMatch[2]).trim(),
        category: category,
        supplier: 'Screwfix'
      };
    }
    
    // Look for prices (£XX.XX format)
    const priceMatch = line.match(/£(\d+\.?\d*)/);
    if (priceMatch && currentTool) {
      currentTool.price = `£${priceMatch[1]}`;
    }
    
    // Look for URLs
    const urlMatch = line.match(/\[.+?\]\((https?:\/\/.+?)\)/);
    if (urlMatch && currentTool) {
      const url = urlMatch[1];
      if (url.includes('screwfix.com') && url.includes('/p/')) {
        currentTool.productUrl = url;
      } else if (url.match(/\.(jpg|jpeg|png|webp)/i)) {
        currentTool.image = url;
      }
    }
    
    // Look for stock status
    if (line.toLowerCase().includes('in stock')) {
      if (currentTool) currentTool.stockStatus = 'In Stock';
    } else if (line.toLowerCase().includes('low stock')) {
      if (currentTool) currentTool.stockStatus = 'Low Stock';
    } else if (line.toLowerCase().includes('out of stock')) {
      if (currentTool) currentTool.stockStatus = 'Out of Stock';
    }
  }
  
  // Don't forget the last tool
  if (currentTool && currentTool.name && currentTool.price) {
    tools.push({ ...currentTool, category });
  }
  
  // Add default values for missing fields
  return tools.map((tool, index) => ({
    id: index + 1,
    name: tool.name,
    price: tool.price,
    supplier: 'Screwfix',
    category: category,
    image: tool.image || '/placeholder.svg',
    productUrl: tool.productUrl || baseUrl,
    stockStatus: tool.stockStatus || 'In Stock',
    description: tool.description || '',
    brand: tool.brand || extractBrand(tool.name),
    specifications: tool.specifications || {}
  }));
}

// Extract brand from product name
function extractBrand(name: string): string {
  const commonBrands = ['DeWalt', 'Makita', 'Milwaukee', 'Bosch', 'Stanley', 'Draper', 'Fluke', 'Megger', 'Kewtech', 'Klein'];
  for (const brand of commonBrands) {
    if (name.toLowerCase().includes(brand.toLowerCase())) {
      return brand;
    }
  }
  return 'Generic';
}
