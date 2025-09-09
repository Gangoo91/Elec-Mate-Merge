import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const suppliers = [
  { name: "Screwfix", url: "https://www.screwfix.com/search?search=" },
  { name: "Toolstation", url: "https://www.toolstation.com/search?q=" },
  { name: "RS Components", url: "https://uk.rs-online.com/web/c/?searchTerm=" },
  { name: "CEF - City Electrical Factors", url: "https://www.cef.co.uk/catalogue/products/search?q=" },
];

// --- Electrical Tools Categories (BS7671 Compliant) ---
const productList = [
  {
    category: "Power Tools",
    items: ["cordless drill", "impact driver", "SDS drill", "angle grinder", "circular saw", "reciprocating saw", "multi-tool"],
  },
  {
    category: "Hand Tools", 
    items: ["electrician pliers", "wire strippers", "screwdriver set", "side cutters", "long nose pliers", "combination pliers", "electrical knife"],
  },
  {
    category: "Test Equipment",
    items: ["multimeter", "voltage tester", "insulation tester", "RCD tester", "PAT tester", "socket tester", "phase rotation tester", "earth loop tester"],
  },
  {
    category: "Measuring Tools",
    items: ["cable detector", "pipe detector", "stud finder", "laser level", "spirit level", "measuring tape", "digital caliper"],
  },
  {
    category: "Safety Equipment",
    items: ["safety helmet", "safety glasses", "work gloves", "high vis vest", "knee pads", "safety boots", "ear protection"],
  },
  {
    category: "Specialist Tools",
    items: ["cable pulling system", "fish tape", "conduit bender", "cable cutter", "crimping tool", "torque wrench", "hole saw kit"],
  },
  {
    category: "Access Tools & Equipment",
    items: ["step ladder", "extension ladder", "platform steps", "scaffold tower", "mobile platform", "roof ladder"],
  },
  {
    category: "Tool Storage",
    items: ["tool bag", "tool box", "tool belt", "tool case", "tool trolley", "tool vest", "storage cabinet"],
  }
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

  try {
    const response = await fetch(firecrawl_url, options);
    if (!response.ok) {
      console.error(`❌ API request failed: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error(`❌ Error response: ${errorText}`);
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const responseText = await response.text();
    if (!responseText || responseText.trim() === '') {
      console.error(`❌ Empty response from Firecrawl API for ${supplier.name}`);
      return [];
    }
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error(`❌ JSON parse error for ${supplier.name}:`, parseError);
      console.error(`❌ Response text: ${responseText.substring(0, 500)}...`);
      return [];
    }

    const products = data.data?.json || [];
    
    // Filter to ensure we only get electrical tools
    const filteredProducts = products.filter((item: any) => {
      const name = (item.name || '').toLowerCase();
      const description = (item.description || '').toLowerCase();
      
      // Exclude non-electrical items
      const exclusions = ['sealant', 'adhesive', 'glue', 'foam', 'tape measure', 'spirit level', 
                         'general purpose', 'masonry', 'building', 'construction only'];
      if (exclusions.some(exc => name.includes(exc) || description.includes(exc))) {
        return false;
      }
      
      // Include electrical tools
      const inclusions = ['electrical', 'electric', 'voltage', 'current', 'wire', 'cable', 'circuit',
                         'multimeter', 'tester', 'drill', 'driver', 'saw', 'grinder', 'pliers', 
                         'screwdriver', 'cutter', 'stripper', 'tool', 'safety', 'protection'];
      return inclusions.some(inc => name.includes(inc) || description.includes(inc) || query.toLowerCase().includes(inc));
    });
    
    return filteredProducts.map((item: any, index: number) => ({
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
      isOnSale: false
    }));
  } catch (error) {
    console.error(`⚠️ Error fetching ${query} from ${supplier.name}:`, error);
    return [];
  }
}

// --- Main Function with Grouped Output ---
async function getMaterials(FIRECRAWL_API_KEY: string, categoryFilter?: string, supplierFilter?: string, searchTerm?: string) {
  console.log('🚀 Starting comprehensive materials scraping...');
  
  const jobs = [];
  const filteredSuppliers = supplierFilter
    ? suppliers.filter(supplier => supplier.name === supplierFilter)
    : suppliers;

  // If searchTerm is provided, use it directly instead of predefined queries
  if (searchTerm && searchTerm.trim()) {
    for (const supplier of filteredSuppliers) {
      jobs.push(fetchProductsFromSupplier(supplier, searchTerm.trim(), 'search', FIRECRAWL_API_KEY));
    }
  } else {
    // Use predefined product queries
    const filteredProductList = categoryFilter 
      ? productList.filter(group => group.category === categoryFilter)
      : productList;

    for (const group of filteredProductList) {
      for (const product of group.items) {
        for (const supplier of filteredSuppliers) {
          jobs.push(fetchProductsFromSupplier(supplier, product, group.category, FIRECRAWL_API_KEY));
        }
      }
    }
  }

  console.log(`📋 Processing ${jobs.length} scraping jobs...`);
  const results = await Promise.allSettled(jobs);
  const materials = results
    .map((material) => (material.status === "fulfilled" ? material.value : []))
    .flat();
  
  console.log(`✅ Successfully fetched ${materials.length} products`);
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
      try {
        const body = await req.json();
        categoryFilter = body.category;
        supplierFilter = body.supplier;
        searchTerm = body.searchTerm || body.search; // Handle both naming conventions
      } catch (jsonError) {
        console.warn('⚠️ Failed to parse request body, using defaults');
      }
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