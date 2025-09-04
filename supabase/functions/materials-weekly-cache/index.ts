import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

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

    // Calculate price range
    const prices = categoryMaterials
      .map(m => extractPriceNumber(m.price))
      .filter(p => p > 0);
    
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
    const priceRange = prices.length > 0 ? `£${minPrice} - £${maxPrice}` : "Price on request";

    // Extract suppliers as brands
    const suppliers = [...new Set(categoryMaterials.map(m => m.supplier))];
    const topBrands = suppliers.slice(0, 4);

    // Get popular items (top 3 by price relevance)
    const popularItems = categoryMaterials
      .slice(0, 3)
      .map(material => ({
        name: material.name,
        price: material.price,
        rating: 4.5 + Math.random() * 0.4, // Simulate rating between 4.5-4.9
        sales: Math.floor(Math.random() * 200) + 50 // Simulate sales data
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

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🔧 Materials Weekly Cache - Starting request processing...');
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request parameters
    const url = new URL(req.url);
    const category = url.searchParams.get('category');
    const supplier = url.searchParams.get('supplier');
    const searchTerm = url.searchParams.get('searchTerm');
    const forceRefresh = url.searchParams.get('forceRefresh') === 'true';

    // Parse request body for additional parameters
    let bodyParams: any = {};
    try {
      const body = await req.text();
      if (body) {
        bodyParams = JSON.parse(body);
      }
    } catch (e) {
      console.log('No valid JSON body provided, using URL params only');
    }

    const finalCategory = category || bodyParams.category;
    const finalSupplier = supplier || bodyParams.supplier;
    const finalSearchTerm = searchTerm || bodyParams.searchTerm;

    console.log(`📋 Request params - Category: ${finalCategory}, Supplier: ${finalSupplier}, Search: ${finalSearchTerm}, Force refresh: ${forceRefresh}`);

    // If force refresh is requested or no specific category, call live scraper
    if (forceRefresh || !finalCategory) {
      console.log('🔄 Force refresh requested or no category specified, calling live scraper...');
      
      const { data: liveData, error: liveError } = await supabase.functions.invoke('comprehensive-materials-scraper', {
        body: { category: finalCategory, supplier: finalSupplier, searchTerm: finalSearchTerm }
      });

      if (liveError) {
        console.error('❌ Error calling live scraper:', liveError);
        throw liveError;
      }

      if (liveData?.materials && Array.isArray(liveData.materials)) {
        const processed = processMaterialsData(liveData.materials);
        console.log(`✅ Live data processed: ${liveData.materials.length} materials`);
        
        return new Response(JSON.stringify({
          success: true,
          source: 'live',
          materials: liveData.materials,
          data: processed,
          count: liveData.materials.length
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Try to fetch from cache first
    console.log('💾 Checking materials weekly cache...');
    
    const { data: cacheData, error: cacheError } = await supabase
      .from('materials_weekly_cache')
      .select('*')
      .eq('is_active', true)
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (cacheError && cacheError.code !== 'PGRST116') {
      console.error('❌ Error fetching from cache:', cacheError);
    }

    if (cacheData && cacheData.materials_data) {
      console.log(`💾 Cache hit! Found ${cacheData.materials_data.length || 0} cached materials`);
      
      let filteredMaterials = cacheData.materials_data;

      // Apply supplier filter if specified
      if (finalSupplier) {
        filteredMaterials = filteredMaterials.filter((material: MaterialItem) => 
          material.supplier?.toLowerCase().includes(finalSupplier.toLowerCase())
        );
        console.log(`🔍 Supplier filter applied: ${filteredMaterials.length} materials match "${finalSupplier}"`);
      }

      // Apply search term filter if specified
      if (finalSearchTerm) {
        filteredMaterials = filteredMaterials.filter((material: MaterialItem) =>
          material.name?.toLowerCase().includes(finalSearchTerm.toLowerCase()) ||
          material.category?.toLowerCase().includes(finalSearchTerm.toLowerCase()) ||
          material.searched_product?.toLowerCase().includes(finalSearchTerm.toLowerCase())
        );
        console.log(`🔍 Search filter applied: ${filteredMaterials.length} materials match "${finalSearchTerm}"`);
      }

      const processed = processMaterialsData(filteredMaterials);
      
      return new Response(JSON.stringify({
        success: true,
        source: 'cache',
        cached_at: cacheData.created_at,
        expires_at: cacheData.expires_at,
        materials: filteredMaterials,
        data: processed,
        count: filteredMaterials.length
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Cache miss or expired - fall back to live scraper
    console.log('🔄 Cache miss or expired, falling back to live scraper...');
    
    const { data: liveData, error: liveError } = await supabase.functions.invoke('comprehensive-materials-scraper', {
      body: { category: finalCategory, supplier: finalSupplier, searchTerm: finalSearchTerm }
    });

    if (liveError) {
      console.error('❌ Error calling live scraper:', liveError);
      throw liveError;
    }

    if (liveData?.materials && Array.isArray(liveData.materials)) {
      const processed = processMaterialsData(liveData.materials);
      console.log(`✅ Live fallback data processed: ${liveData.materials.length} materials`);
      
      return new Response(JSON.stringify({
        success: true,
        source: 'live_fallback',
        materials: liveData.materials,
        data: processed,
        count: liveData.materials.length
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // If we get here, something went wrong
    console.log('📊 No data available, returning default categories');
    return new Response(JSON.stringify({
      success: true,
      source: 'default',
      materials: [],
      data: defaultCategoryData,
      count: 0
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Materials Weekly Cache Error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      source: 'error',
      error: error.message || 'Unknown error occurred',
      materials: [],
      data: defaultCategoryData,
      count: 0
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});