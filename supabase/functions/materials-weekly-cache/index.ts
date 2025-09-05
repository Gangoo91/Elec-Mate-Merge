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
      console.log('✅ Found valid cache data, processing...');
      
      // Combine all cache data
      rawMaterials = cacheData.flatMap(cache => cache.cache_data as MaterialItem[]);
      fromCache = true;

      // Apply filters if provided
      if (category) {
        const targetCategory = Object.keys(categoryMapping).find(
          key => categoryMapping[key as keyof typeof categoryMapping] === category
        );
        if (targetCategory) {
          rawMaterials = rawMaterials.filter(material => material.category === targetCategory);
        }
      }

      if (supplier) {
        rawMaterials = rawMaterials.filter(material => 
          material.supplier.toLowerCase().includes(supplier.toLowerCase())
        );
      }

      if (search) {
        const searchLower = search.toLowerCase();
        rawMaterials = rawMaterials.filter(material => 
          material.name.toLowerCase().includes(searchLower) ||
          material.description?.toLowerCase().includes(searchLower) ||
          material.searched_product.toLowerCase().includes(searchLower)
        );
      }

      console.log(`📊 Serving ${rawMaterials.length} materials from cache`);
    } else {
      console.log('🔄 No valid cache found, starting background scraper...');
      
      // Start comprehensive scraper in background without blocking response
      const backgroundScraping = async () => {
        try {
          console.log('🔍 Background: Fetching from comprehensive scraper...');
          const { data: scraperData, error: scraperError } = await supabase.functions.invoke(
            'comprehensive-materials-scraper',
            { body: { category, supplier, search } }
          );

          if (scraperError) {
            console.error('Background scraper error:', scraperError);
            return;
          }

          const materials = scraperData?.materials || [];
          console.log(`📊 Background: Fetched ${materials.length} materials`);
          
          // Store fetched data in cache
          if (materials.length > 0) {
            console.log('💾 Background: Storing materials in cache...');
            
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now
            
            // Group materials by category for more efficient storage
            const materialsByCategory = materials.reduce((acc, material) => {
              const mappedCategory = categoryMapping[material.category as keyof typeof categoryMapping] || 'general';
              if (!acc[mappedCategory]) acc[mappedCategory] = [];
              acc[mappedCategory].push(material);
              return acc;
            }, {} as Record<string, MaterialItem[]>);
            
            // Insert cache entries for each category
            for (const [categoryId, categoryMaterials] of Object.entries(materialsByCategory)) {
              const prices = categoryMaterials
                .map(m => extractPriceNumber(m.price))
                .filter(p => p > 0);
              
              const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
              const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
              const suppliers = [...new Set(categoryMaterials.map(m => m.supplier))];
              
              const { error: insertError } = await supabase
                .from('materials_weekly_cache')
                .insert({
                  category: categoryId,
                  total_products: categoryMaterials.length,
                  cache_data: categoryMaterials,
                  price_range: { min: minPrice, max: maxPrice },
                  top_suppliers: suppliers.slice(0, 5),
                  expires_at: expiresAt.toISOString(),
                  update_status: 'completed'
                });
                
              if (insertError) {
                console.error(`Background: Error inserting cache for ${categoryId}:`, insertError);
              } else {
                console.log(`✅ Background: Cached ${categoryMaterials.length} materials for ${categoryId}`);
              }
            }
          }
        } catch (error) {
          console.error('Background scraping failed:', error);
        }
      };

      // Start background task without awaiting
      EdgeRuntime.waitUntil(backgroundScraping());
      
      // Return default data immediately
      rawMaterials = [];
      fromCache = false;
      console.log('⚡ Returning immediately while cache builds in background');
    }

    // Process the materials data
    const processedData = processMaterialsData(rawMaterials);

    const response = {
      data: processedData,
      rawMaterials,
      fromCache,
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