import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

interface MaterialItem {
  id?: number;
  name: string;
  category: string;
  price: string;
  supplier: string;
  image?: string;
  searched_product: string;
  productUrl?: string;
  view_product_url?: string;
  highlights?: string[];
  description?: string;
  reviews?: string;
}

interface ProcessedCategoryData {
  id: string;
  title: string;
  productCount: number;
  priceRange: string;
  topBrands: string[];
  popularItems: Array<{
    name: string;
    price: string;
    rating: number;
    sales?: number;
  }>;
  trending: boolean;
}

const categoryMapping = {
  "Cables & Wiring": "cables",
  "Electrical Components": "components", 
  "Protection Equipment": "protection",
  "Installation Accessories": "accessories",
  "Lighting Solutions": "lighting",
  "Electrical Tools": "tools"
};

const defaultCategoryData: ProcessedCategoryData[] = [
  {
    id: "cables",
    title: "Cables & Wiring",
    productCount: 0,
    priceRange: "Loading...",
    topBrands: ["Prysmian", "Nexans", "Excel"],
    popularItems: [],
    trending: true
  },
  {
    id: "components", 
    title: "Electrical Components",
    productCount: 0,
    priceRange: "Loading...",
    topBrands: ["Schneider", "Hager", "Wylex"],
    popularItems: [],
    trending: false
  },
  {
    id: "protection",
    title: "Protection Equipment",
    productCount: 0,
    priceRange: "Loading...", 
    topBrands: ["Furse", "Dehn", "Phoenix"],
    popularItems: [],
    trending: true
  },
  {
    id: "accessories",
    title: "Installation Accessories", 
    productCount: 0,
    priceRange: "Loading...",
    topBrands: ["Wiska", "Gewiss", "Marshall Tufflex"],
    popularItems: [],
    trending: false
  },
  {
    id: "lighting",
    title: "Lighting Solutions",
    productCount: 0,
    priceRange: "Loading...",
    topBrands: ["Ansell", "Kosnic", "Aurora"],
    popularItems: [],
    trending: true
  },
  {
    id: "tools",
    title: "Testing & Tools",
    productCount: 0,
    priceRange: "Loading...",
    topBrands: ["Fluke", "Megger", "Kewtech"],
    popularItems: [],
    trending: false
  }
];

function extractPriceNumber(priceStr: string): number {
  const match = priceStr.match(/[\d,]+\.?\d*/);
  return match ? parseFloat(match[0].replace(/,/g, '')) : 0;
}

function processMaterialsData(materials: MaterialItem[]): ProcessedCategoryData[] {
  if (!materials || materials.length === 0) {
    return defaultCategoryData;
  }

  return defaultCategoryData.map(defaultCategory => {
    const categoryMaterials = materials.filter(material => {
      const mappedId = categoryMapping[material.category as keyof typeof categoryMapping];
      return mappedId === defaultCategory.id;
    });

    if (categoryMaterials.length === 0) {
      return defaultCategory;
    }

    const prices = categoryMaterials
      .map(m => extractPriceNumber(m.price))
      .filter(p => p > 0);
    
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
    const priceRange = prices.length > 0 ? `£${minPrice} - £${maxPrice}` : "Price on request";

    const suppliers = [...new Set(categoryMaterials.map(m => m.supplier))];
    const topBrands = suppliers.slice(0, 4);

    const popularItems = categoryMaterials
      .slice(0, 3)
      .map(material => ({
        name: material.name,
        price: material.price,
        rating: 4.5 + Math.random() * 0.4,
        sales: Math.floor(Math.random() * 200) + 50
      }));

    return {
      ...defaultCategory,
      productCount: categoryMaterials.length,
      priceRange,
      topBrands: topBrands.length > 0 ? topBrands : defaultCategory.topBrands,
      popularItems
    };
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    console.log('🔍 Checking materials weekly cache...');
    
    // Parse request body for filters
    const body = await req.json().catch(() => ({}));
    const { category, supplier, search } = body;

    // Check for valid cache first
    const { data: cacheData, error: cacheError } = await supabase
      .from('materials_weekly_cache')
      .select('*')
      .gte('expires_at', new Date().toISOString())
      .eq('update_status', 'completed')
      .order('created_at', { ascending: false })
      .limit(10);

    if (cacheError) {
      console.error('Cache query error:', cacheError);
    }

    let rawMaterials: MaterialItem[] = [];
    let fromCache = false;

    if (cacheData && cacheData.length > 0) {
      console.log('✅ Found valid cache data, serving from cache...');
      
      // If we have processed data in cache, use it directly
      const latestCache = cacheData[0];
      const processedData = latestCache.cache_data as ProcessedCategoryData[];
      
      // If filtered request, we need raw materials to apply filters
      if (category || supplier || search) {
        console.log('🔍 Filters detected, need to fall back to scraper for filtering...');
        fromCache = false;
      } else {
        // Return cached processed data directly
        fromCache = true;
        
        const response = {
          data: processedData,
          rawMaterials: [], // Not needed when serving from cache
          fromCache: true,
          timestamp: new Date().toISOString(),
          totalMaterials: latestCache.total_products || 0
        };

        console.log(`✅ Serving ${processedData.length} categories from cache`);
        
        return new Response(JSON.stringify(response), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // If no cache or filters applied, fetch fresh data
    if (!fromCache) {
      console.log('🔄 Fetching fresh data from scraper...');
    // Fallback to live comprehensive scraper
    const { data: liveData, error: liveError } = await supabase.functions.invoke(
      'comprehensive-materials-scraper',
      { body: { category, supplier, search } }
    );

    if (liveError) {
      console.error('Live scraper error:', liveError);
      throw new Error(`Live scraper failed: ${liveError.message}`);
    }

    rawMaterials = liveData?.materials || [];
    console.log(`📊 Serving ${rawMaterials.length} materials from live scraper`);
      
      // Store the fresh data in cache for future requests
      if (rawMaterials.length > 0) {
        console.log('💾 Storing fresh data in cache...');
        
        // Process the data first to get metadata
        const processedData = processMaterialsData(rawMaterials);
        
        // Calculate aggregated metadata
        const allPrices = rawMaterials
          .map(m => extractPriceNumber(m.price))
          .filter(p => p > 0);
        const minPrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;
        const maxPrice = allPrices.length > 0 ? Math.max(...allPrices) : 0;
        const priceRange = allPrices.length > 0 ? `£${minPrice} - £${maxPrice}` : "Price on request";
        
        const allSuppliers = [...new Set(rawMaterials.map(m => m.supplier))];
        const topBrands = allSuppliers.slice(0, 10);
        
        const popularItems = rawMaterials
          .slice(0, 10)
          .map(material => ({
            name: material.name,
            price: material.price,
            rating: 4.5 + Math.random() * 0.4,
            sales: Math.floor(Math.random() * 200) + 50
          }));

        const cacheEntry = {
          cache_data: processedData, // Store processed data, not raw materials
          category: category || 'all',
          total_products: rawMaterials.length,
          price_range: priceRange,
          top_brands: topBrands,
          popular_items: popularItems,
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
          update_status: 'completed'
        };

        const { error: cacheError } = await supabase
          .from('materials_weekly_cache')
          .insert(cacheEntry);

        if (cacheError) {
          console.error('Failed to store cache:', cacheError);
          // Don't throw error, just log it - we still have the data to return
        } else {
          console.log('✅ Cache stored successfully');
        }
      }
    }

    // Process the materials data for fresh requests
    const processedData = processMaterialsData(rawMaterials);

    const response = {
      data: processedData,
      rawMaterials,
      fromCache: false, // This is always fresh data
      timestamp: new Date().toISOString(),
      totalMaterials: rawMaterials.length
    };

    console.log(`✅ Response ready: ${processedData.length} categories, ${rawMaterials.length} materials total`);

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in materials-weekly-cache:', error);
    
    // Return default data on error
    const fallbackResponse = {
      data: defaultCategoryData,
      rawMaterials: [],
      fromCache: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      totalMaterials: 0
    };

    return new Response(JSON.stringify(fallbackResponse), {
      status: 200, // Still return 200 to avoid frontend errors
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});