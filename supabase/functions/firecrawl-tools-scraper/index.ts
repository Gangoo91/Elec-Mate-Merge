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
      name: { type: "string", description: "The name or title of the product" },
      category: { type: "string", description: "The category or cable type of the product" },
      highlights: { type: "array", description: "The highlight or cable highlight of the product" },
      price: { type: "string", description: "The price of the product, including currency and VAT info" },
      description: { type: "string", description: "Key features or details of the product" },
      reviews: { type: "string", description: "The number of reviews or rating summary" },
      image: { type: "string", format: "uri", description: "URL of the product image" },
      view_product_url: { type: "string", format: "uri", description: "Direct URL to the product page" },
    },
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
      parsers: [],
      formats: [
        {
          type: "json",
          prompt: "Extract the name and description from the page.",
          schema: productSchema,
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
        details: error.message 
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