import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const suppliers = [
  { name: "Screwfix", url: "https://www.screwfix.com/search?search=" },
  { name: "Toolstation", url: "https://www.toolstation.com/search?q=" },
  { name: "RS Components", url: "https://uk.rs-online.com/web/c/?searchTerm=" },
  { name: "CEF - City Electrical Factors", url: "https://www.cef.co.uk/catalogue/products/search?q=" },
];

// --- Product Categories ---
const productList = [
  {
    category: "Cables & Wiring",
    items: ["Twin & Earth cable", "SWA cable", "Flex cable", "Data cable"],
  },
  {
    category: "Electrical Components",
    items: ["Consumer unit", "MCB", "RCD", "Isolator", "Surge protector", "Circuit breaker"],
  },
  {
    category: "Protection Equipment",
    items: ["Earth rod", "surge protectors", "circuit breakers"],
  },
  {
    category: "Installation Accessories",
    items: ["Junction box", "Cable gland", "Trunking"],
  },
  {
    category: "Lighting Solutions",
    items: ["LED downlight", "Lighting batten", "Emergency lighting"],
  },
  {
    category: "Electrical Tools",
    items: ["Testing equipment", "Hand tools", "Power tools"],
  },
];

// --- Firecrawl Schema ---
const productSchema = {
  type: "array",
  items: {
    type: "object",
    required: ["name", "price", "view_product_url"],
    properties: {
      name: { type: "string" },
      category: { type: "string" },
      highlights: { type: "array" },
      price: { type: "string" },
      description: { type: "string" },
      reviews: { type: "string" },
      image: { type: "string", format: "uri" },
      view_product_url: { type: "string", format: "uri" },
    },
  },
};

// --- Scraper Function ---
async function fetchProductsFromSupplier(supplier: any, query: string, category: string, FIRECRAWL_API_KEY: string) {
  console.log(`🔍 Fetching ${query} from ${supplier.name}`);

  // Test a simple request first
  const testUrl = `${supplier.url}${encodeURIComponent(query)}`;
  console.log(`🔗 Target URL: ${testUrl}`);

  const firecrawl_url = "https://api.firecrawl.dev/v2/scrape";

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: testUrl,
      onlyMainContent: true,
      maxAge: 0,
      formats: ["markdown"] // Simplified to just markdown first
    }),
  };

  try {
    console.log(`🔄 Making request to ${supplier.name}...`);
    const response = await fetch(firecrawl_url, options);
    
    console.log(`📊 HTTP Status: ${response.status}`);
    console.log(`📊 Content-Type: ${response.headers.get('content-type')}`);
    
    if (!response.ok) {
      console.error(`❌ HTTP ${response.status}: ${response.statusText} for ${supplier.name}`);
      const errorText = await response.text();
      console.error(`❌ Error response preview: ${errorText.substring(0, 300)}`);
      return [];
    }
    
    const responseText = await response.text();
    console.log(`📥 Response length from ${supplier.name}: ${responseText.length} characters`);
    
    if (!responseText.trim()) {
      console.warn(`⚠️ Empty response from ${supplier.name} for ${query}`);
      return [];
    }

    // Validate JSON before parsing
    let data;
    try {
      data = JSON.parse(responseText);
      console.log(`✅ JSON parsing successful for ${supplier.name}`);
      console.log(`📊 Response structure keys: ${Object.keys(data).join(', ')}`);
    } catch (parseError) {
      console.error(`❌ JSON Parse Error for ${supplier.name}:`, parseError);
      console.error(`📄 Response preview: ${responseText.substring(0, 200)}...`);
      return [];
    }

    if (!data || typeof data !== 'object') {
      console.warn(`⚠️ Invalid data structure from ${supplier.name}`);
      return [];
    }

    // For now, just return basic info since we're testing with markdown
    if (data.success && data.data) {
      console.log(`✅ Successfully scraped ${supplier.name}, processing data...`);
      return [{
        id: Date.now() + Math.random() * 1000,
        name: `Test Product from ${supplier.name}`,
        category: category,
        price: '£Test.Price',
        supplier: supplier.name,
        image: '/placeholder.svg',
        searched_product: query,
        productUrl: testUrl,
        highlights: [],
        description: `Test description for ${query}`,
        reviews: '',
        stockStatus: 'In Stock' as const,
      }];
    }

    console.warn(`⚠️ No valid data found for ${supplier.name}`);
    return [];
    
  } catch (error) {
    console.error(`⚠️ Error fetching ${query} from ${supplier.name}:`, error);
    return [];
  }
}

// --- Main Function with Grouped Output ---
async function getMaterials(FIRECRAWL_API_KEY: string, categoryFilter?: string, supplierFilter?: string, searchTerm?: string) {
  console.log('🚀 Starting comprehensive materials scraping...');
  
  // Test with just one supplier and one simple query for debugging
  const testSupplier = suppliers[0]; // Screwfix
  const testQuery = searchTerm || "cable";
  
  console.log(`🧪 Testing with ${testSupplier.name} for query: ${testQuery}`);
  
  try {
    const result = await fetchProductsFromSupplier(testSupplier, testQuery, 'test', FIRECRAWL_API_KEY);
    console.log(`✅ Test completed, got ${result.length} results`);
    return result;
  } catch (error) {
    console.error('❌ Test failed:', error);
    return [];
  }
}

// --- Save Prices to Historical Database ---
async function savePricesToHistory(materials: any[]) {
  console.log(`💾 Saving ${materials.length} prices to historical database...`);
  
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const historicalEntries = materials
    .filter(material => material.price && material.price !== '£0.00')
    .map(material => ({
      product_name: material.name,
      supplier: material.supplier,
      price: parseFloat(material.price.replace('£', '').replace(',', '')),
      currency: 'GBP',
      source_url: material.productUrl,
      category: material.category,
      date_scraped: new Date().toISOString()
    }));

  if (historicalEntries.length > 0) {
    const { error } = await supabase
      .from('historical_prices')
      .insert(historicalEntries);

    if (error) {
      console.error('❌ Error saving prices to history:', error);
    } else {
      console.log(`✅ Saved ${historicalEntries.length} prices to historical database`);
    }
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🔧 [COMPREHENSIVE-MATERIALS-SCRAPER] Starting request...');
    
    const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
    if (!FIRECRAWL_API_KEY) {
      console.error('❌ FIRECRAWL_API_KEY not found in environment variables');
      return new Response(
        JSON.stringify({ error: 'Firecrawl API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse request body for filters
    let categoryFilter: string | undefined;
    let supplierFilter: string | undefined;
    let searchTerm: string | undefined;
    
    if (req.method === 'POST') {
      const body = await req.json();
      categoryFilter = body.category;
      supplierFilter = body.supplier;
      searchTerm = body.searchTerm;
    }

    console.log(`📋 Request filters - Category: ${categoryFilter || 'all'}, Supplier: ${supplierFilter || 'all'}, SearchTerm: ${searchTerm || 'none'}`);

    const materials = await getMaterials(FIRECRAWL_API_KEY, categoryFilter, supplierFilter, searchTerm);

    // Save prices to historical database
    await savePricesToHistory(materials);

    const response = {
      success: true,
      count: materials.length,
      materials: materials,
      categories: productList.map(p => p.category),
      suppliers: suppliers.map(s => s.name),
      timestamp: new Date().toISOString()
    };

    return new Response(
      JSON.stringify(response),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('❌ [COMPREHENSIVE-MATERIALS-SCRAPER] Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        success: false 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});