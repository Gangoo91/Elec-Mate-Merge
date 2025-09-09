import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const suppliers = [
  { name: "Screwfix", url: "https://www.screwfix.com/search?search=" },
  { name: "Toolstation", url: "https://www.toolstation.com/search?q=" },
  { name: "RS Components", url: "https://uk.rs-online.com/web/c/?searchTerm=" },
  { name: "CEF - City Electrical Factors", url: "https://www.cef.co.uk/catalogue/products/search?q=" },
];

// Electrical Materials Categories - BS7671 Compliant
const materialCategories = [
  {
    category: "Cables & Wiring",
    items: ["twin earth cable", "SWA cable", "armoured cable", "coaxial cable", "cat6 cable", "fire rated cable", "flex cable"],
  },
  {
    category: "Electrical Components", 
    items: ["consumer unit", "MCB", "RCD", "RCBO", "distribution board", "switch", "socket outlet", "junction box"],
  },
  {
    category: "Protection Equipment",
    items: ["earth rod", "surge protector", "RCD protection", "SPD", "electrical enclosure", "weatherproof box"],
  },
  {
    category: "Installation Accessories",
    items: ["cable gland", "cable tray", "conduit", "trunking", "back box", "mounting plate", "cable clip"],
  },
  {
    category: "Lighting Solutions",
    items: ["LED downlight", "emergency lighting", "LED batten", "outdoor lighting", "PIR sensor", "dimmer switch"]
  }
];

// Firecrawl Schema for Materials
const materialSchema = {
  type: "array",
  items: {
    type: "object",
    required: ["name", "price", "view_product_url"],
    properties: {
      name: { type: "string" },
      category: { type: "string" },
      brand: { type: "string" },
      price: { type: "string" },
      description: { type: "string" },
      specifications: { type: "string" },
      image: { type: "string", format: "uri" },
      view_product_url: { type: "string", format: "uri" },
      stock_status: { type: "string" },
      ratings: { type: "string" }
    },
  },
};

async function fetchMaterialsFromSupplier(supplier: any, query: string, category: string, FIRECRAWL_API_KEY: string) {
  console.log(`🔍 Fetching ${query} from ${supplier.name} for category: ${category}`);

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
          prompt: `Extract electrical material product details for ${query} in category ${category}. Focus on electrical installation materials, cables, components, and equipment.`,
          schema: materialSchema,
        },
      ],
    }),
  };

  try {
    const response = await fetch(firecrawl_url, options);
    if (!response.ok) {
      console.error(`❌ API request failed: ${response.status} ${response.statusText}`);
      return [];
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
      return [];
    }

    const products = data.data?.json || [];
    
    // Filter to ensure we only get electrical materials
    const filteredProducts = products.filter((item: any) => {
      const name = (item.name || '').toLowerCase();
      const description = (item.description || '').toLowerCase();
      
      // Exclude non-electrical items
      const exclusions = ['furniture', 'clothing', 'food', 'garden', 'automotive', 'plumbing only'];
      if (exclusions.some(exc => name.includes(exc) || description.includes(exc))) {
        return false;
      }
      
      // Include electrical materials
      const inclusions = ['electrical', 'electric', 'cable', 'wire', 'mcb', 'rcd', 'consumer unit', 
                         'switch', 'socket', 'led', 'lighting', 'protection', 'earth', 'surge'];
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
      brand: item.brand,
      description: item.description,
      specifications: item.specifications,
      stock_status: item.stock_status || 'In Stock',
      ratings: item.ratings,
      stockStatus: 'In Stock' as const,
      isOnSale: false
    }));
  } catch (error) {
    console.error(`⚠️ Error fetching ${query} from ${supplier.name}:`, error);
    return [];
  }
}

async function getMaterials(FIRECRAWL_API_KEY: string) {
  console.log('🚀 Starting comprehensive materials weekly scraping...');
  
  const jobs = [];
  
  for (const categoryGroup of materialCategories) {
    for (const material of categoryGroup.items) {
      for (const supplier of suppliers) {
        jobs.push(fetchMaterialsFromSupplier(supplier, material, categoryGroup.category, FIRECRAWL_API_KEY));
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

async function saveMaterialsToCache(materials: any[]) {
  console.log(`💾 Saving ${materials.length} materials to cache...`);
  
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Clear existing cache
  const { error: deleteError } = await supabase
    .from('materials_weekly_cache')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows

  if (deleteError) {
    console.error('❌ Error clearing cache:', deleteError);
    throw new Error('Failed to clear existing cache');
  }

  // Group materials by category
  const groupedMaterials = materials.reduce((acc, material) => {
    const category = material.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(material);
    return acc;
  }, {} as Record<string, any[]>);

  // Insert new cache entries
  const cacheEntries = Object.entries(groupedMaterials).map(([category, categoryMaterials]) => ({
    category: category.toLowerCase().replace(/\s+/g, '_').replace(/&/g, 'and'),
    materials_data: categoryMaterials,
    total_products: categoryMaterials.length,
    last_updated: new Date().toISOString(),
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    update_status: 'completed'
  }));

  const { error: insertError } = await supabase
    .from('materials_weekly_cache')
    .insert(cacheEntries);

  if (insertError) {
    console.error('❌ Error saving to cache:', insertError);
    throw new Error('Failed to save materials to cache');
  }

  console.log(`✅ Saved ${cacheEntries.length} categories to materials cache`);
  return cacheEntries;
}

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
    console.log('🔧 [MATERIALS-WEEKLY-SCRAPER] Starting weekly materials scraping...');
    
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

    const materials = await getMaterials(FIRECRAWL_API_KEY);
    const cacheEntries = await saveMaterialsToCache(materials);
    await savePricesToHistory(materials);

    const response = {
      success: true,
      count: materials.length,
      categories_updated: cacheEntries.length,
      materials: materials,
      cache_entries: cacheEntries,
      timestamp: new Date().toISOString()
    };

    return new Response(
      JSON.stringify(response),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('❌ [MATERIALS-WEEKLY-SCRAPER] Error:', error);
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