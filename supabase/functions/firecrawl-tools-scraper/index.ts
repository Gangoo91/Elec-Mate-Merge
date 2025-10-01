import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const productSchema = {
  type: "array",
  items: {
    type: "object",
    required: ["name", "price", "view_product_url"],
       properties: {
          name: {
            type: "string",
            description: "Full product name or title, including model number if applicable",
          },
          brand: {
            type: "string",
            description: "Brand or manufacturer name (e.g., Makita, DeWalt, Bosch, Hilti, Bahco, Wiha, Wera)",
          },
          category: {
            type: "string",
            description: "The product category (e.g., Drills, Screwdrivers, Power Tools, Cables) or type of cable",
          },
          productType: {
            type: "string",
            description: "Specific product type (e.g., SDS Drill, Combi Drill, Cordless, Corded)",
          },
          voltage: {
            type: "string",
            description: "Voltage rating if applicable (e.g., 18V, 240V)",
          },
          price: {
            type: "string",
            description: "The price of the product, including numeric value, currency, and VAT info if applicable",
          },
          inStock: {
            type: "boolean",
            description: "Whether the product is currently in stock",
          },
          description: {
            type: "string",
            description: "Key features, description, or important details of the product",
          },
          highlights: {
            type: "array",
            description: "Array of product highlights or key features",
          },
          reviews: {
            type: "string",
            description: "Number of reviews or rating summary",
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
          }
      }
  },
};

async function fetchElectricalTools() {
  const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
  
  if (!FIRECRAWL_API_KEY) {
    throw new Error('FIRECRAWL_API_KEY not found in environment variables');
  }

  const url = "https://api.firecrawl.dev/v2/scrape";

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: "https://www.screwfix.com/search?search=testers%2C+hand+tools+and+power+tools&page_size=100",
      onlyMainContent: true,
      maxAge: 0,
      timeout: 45000,
      formats: [
        {
          type: "json",
          schema: productSchema,
          prompt: `Extract all tool products visible on this page. For each product, include:  
                      - Full product names, including model numbers  
                      - Brand names (prioritize: Makita, Hilti, DeWalt, Bosch, Bahco, Wiha, Wera, MK, CK for hand tools)  
                      - Exact prices in GBP  
                      - Product codes or SKUs  
                      - Stock availability (in stock or not)  
                      - Product categories and specific types (e.g., SDS Drill, Combi Drill, Cordless, Corded, Screwdriver)  
                      - Voltage ratings for power tools (e.g., 18V, 240V)  
                      - Key features or highlights if available  
                      - Direct URLs to product pages  
                      - Product images  
    
                      Extract every product visible on the page, capturing all the details above.`
        },
      ],
    }),
  };

  try {
    console.log('🔧 Starting Firecrawl scrape for electrical tools...');
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`❌ API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Firecrawl scrape successful, processing results...');

    return data.data.json || [];
  } catch (error) {
    console.error(`⚠️ Error fetching electrical tools:`, error);
    return [];
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🚀 Firecrawl Tools Scraper function invoked');
    
    const tools = await fetchElectricalTools();
    
    console.log(`📊 Retrieved ${tools.length} electrical tools from Screwfix`);

    return new Response(JSON.stringify(tools), {
      headers: { 
        ...corsHeaders,
        'Content-Type': 'application/json' 
      },
    });

  } catch (error) {
    console.error('❌ Error in firecrawl-tools-scraper:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to scrape tools', 
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        },
      }
    );
  }
});