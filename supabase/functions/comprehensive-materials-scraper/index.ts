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

// --- Enhanced Scraper Function with Retry Logic ---
async function fetchProductsFromSupplier(supplier: any, query: string, category: string, FIRECRAWL_API_KEY: string, retries = 3) {
  console.log(`🔍 Fetching ${query} from ${supplier.name}`);

  const firecrawl_url = "https://api.firecrawl.dev/v2/scrape";

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: `${supplier.url}${encodeURIComponent(query)}`,
      onlyMainContent: true,
      maxAge: 0,
      formats: [
        {
          type: "json",
          prompt: `Extract product details for ${query} in category ${category}`,
          schema: productSchema,
        },
      ],
    }),
  };

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(firecrawl_url, options);
      
      if (!response.ok) {
        if (response.status >= 500 && attempt < retries) {
          console.log(`⚠️ Server error ${response.status} for ${query} from ${supplier.name}, retrying (${attempt}/${retries})...`);
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
          continue;
        }
        throw new Error(`❌ API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      const products = data.data?.json || [];
      
      if (products.length === 0) {
        console.log(`📭 No products found for ${query} from ${supplier.name}`);
        return [];
      }
      
      const processedProducts = products.map((item: any, index: number) => ({
        id: Date.now() + Math.random() * 1000 + index,
        name: item.name || 'Unknown Product',
        category: category,
        price: item.price || '£0.00',
        supplier: supplier.name,
        image: item.image || '/placeholder.svg',
        searched_product: query,
        productUrl: item.view_product_url,
        highlights: item.highlights || [],
        description: item.description,
        reviews: item.reviews,
        stockStatus: 'In Stock' as const,
      }));
      
      console.log(`✅ Found ${processedProducts.length} products for ${query} from ${supplier.name}`);
      return processedProducts;
      
    } catch (error) {
      if (attempt === retries) {
        console.error(`⚠️ Error fetching ${query} from ${supplier.name} after ${retries} attempts:`, error);
        return [];
      } else {
        console.log(`⚠️ Attempt ${attempt} failed for ${query} from ${supplier.name}, retrying...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  }
  
  return [];
}

// --- Rate limited batch processing ---
async function processBatch<T>(items: T[], batchSize: number, delayMs: number, processor: (item: T) => Promise<any>) {
  const results = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    console.log(`📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(items.length / batchSize)} (${batch.length} items)`);
    
    const batchResults = await Promise.allSettled(
      batch.map(item => processor(item))
    );
    
    results.push(...batchResults);
    
    // Add delay between batches to avoid rate limiting
    if (i + batchSize < items.length) {
      console.log(`⏳ Waiting ${delayMs}ms before next batch...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  return results;
}

// --- Main Function with Optimized Batching ---
async function getMaterials(FIRECRAWL_API_KEY: string, categoryFilter?: string, supplierFilter?: string, searchTerm?: string) {
  console.log('🚀 Starting comprehensive materials scraping...');
  
  const filteredSuppliers = supplierFilter
    ? suppliers.filter(supplier => supplier.name === supplierFilter)
    : suppliers;

  let jobParams: Array<{supplier: any, query: string, category: string}> = [];

  // If searchTerm is provided, use it directly instead of predefined queries
  if (searchTerm && searchTerm.trim()) {
    for (const supplier of filteredSuppliers) {
      jobParams.push({
        supplier,
        query: searchTerm.trim(),
        category: 'search'
      });
    }
  } else {
    // Use predefined product queries
    const filteredProductList = categoryFilter 
      ? productList.filter(group => group.category === categoryFilter)
      : productList;

    for (const group of filteredProductList) {
      for (const product of group.items) {
        for (const supplier of filteredSuppliers) {
          jobParams.push({
            supplier,
            query: product,
            category: group.category
          });
        }
      }
    }
  }

  console.log(`📋 Processing ${jobParams.length} scraping jobs in optimized batches...`);
  
  // Process in smaller batches with delays to avoid overwhelming the API
  const BATCH_SIZE = 8; // Reduced from 88 concurrent requests
  const BATCH_DELAY = 2000; // 2 second delay between batches
  
  const results = await processBatch(
    jobParams,
    BATCH_SIZE,
    BATCH_DELAY,
    (params) => fetchProductsFromSupplier(params.supplier, params.query, params.category, FIRECRAWL_API_KEY)
  );
  
  const materials = results
    .map((result) => (result.status === "fulfilled" ? result.value : []))
    .flat();
  
  const successfulJobs = results.filter(r => r.status === "fulfilled").length;
  const failedJobs = results.filter(r => r.status === "rejected").length;
  
  console.log(`✅ Successfully fetched ${materials.length} products (${successfulJobs} successful, ${failedJobs} failed jobs)`);
  return materials;
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