import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MaterialItem {
  id: number;
  name: string;
  category: string;
  price: string;
  supplier: string;
  image?: string;
  stockStatus?: "In Stock" | "Low Stock" | "Out of Stock";
  highlights?: string[];
  productUrl?: string;
  description?: string;
  reviews?: string;
}

interface ProcessedCategoryData {
  title: string;
  productCount: number;
  priceRange: { min: number; max: number };
  topBrands: string[];
  popularItems: MaterialItem[];
  trending: boolean;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🔍 Fetching materials from weekly cache...');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const url = new URL(req.url);
    const category = url.searchParams.get('category');
    const supplier = url.searchParams.get('supplier');
    const searchTerm = url.searchParams.get('searchTerm');
    const forceRefresh = url.searchParams.get('forceRefresh') === 'true';

    console.log('📋 Request filters:', { category, supplier, searchTerm, forceRefresh });

    // If force refresh or no category specified, fall back to comprehensive scraper
    if (forceRefresh || !category || category === 'all') {
      console.log('🔄 Falling back to comprehensive scraper...');
      const { data, error } = await supabase.functions.invoke('comprehensive-materials-scraper', {
        body: { category, supplier, searchTerm }
      });
      
      if (error) {
        console.error('❌ Error from comprehensive scraper:', error);
        throw error;
      }
      
      return new Response(
        JSON.stringify(data),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    }

    // Try to get from cache first
    const { data: cachedData, error: cacheError } = await supabase
      .from('materials_weekly_cache')
      .select('*')
      .eq('category', category)
      .gte('expires_at', new Date().toISOString())
      .eq('update_status', 'completed')
      .single();

    if (cacheError && cacheError.code !== 'PGRST116') {
      console.error('❌ Error reading from cache:', cacheError);
      throw cacheError;
    }

    if (cachedData) {
      console.log(`✅ Cache hit for category: ${category} with ${cachedData.cache_data?.length || 0} items`);
      
      let filteredMaterials = cachedData.cache_data || [];
      
      // Apply supplier filter if specified
      if (supplier && supplier !== 'all') {
        filteredMaterials = filteredMaterials.filter((item: MaterialItem) => 
          item.supplier?.toLowerCase().includes(supplier.toLowerCase())
        );
      }
      
      // Apply search term filter if specified
      if (searchTerm && searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        filteredMaterials = filteredMaterials.filter((item: MaterialItem) => 
          item.name?.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower) ||
          item.highlights?.some(h => h.toLowerCase().includes(searchLower))
        );
      }

      // Transform cached data to match expected response format
      const processedData: ProcessedCategoryData = {
        title: cachedData.category.charAt(0).toUpperCase() + cachedData.category.slice(1),
        productCount: filteredMaterials.length,
        priceRange: cachedData.price_range || { min: 0, max: 0 },
        topBrands: cachedData.top_brands || [],
        popularItems: cachedData.popular_items || [],
        trending: Math.random() > 0.5
      };

      return new Response(
        JSON.stringify({
          success: true,
          source: 'cache',
          materials: filteredMaterials,
          processedData: { [category]: processedData },
          cacheInfo: {
            lastUpdated: cachedData.last_updated,
            expiresAt: cachedData.expires_at,
            totalProducts: cachedData.total_products
          }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    }

    // Cache miss - fall back to comprehensive scraper
    console.log(`❌ Cache miss for category: ${category}, falling back to comprehensive scraper`);
    
    const { data: liveData, error: liveError } = await supabase.functions.invoke('comprehensive-materials-scraper', {
      body: { category, supplier, searchTerm }
    });
    
    if (liveError) {
      console.error('❌ Error from comprehensive scraper fallback:', liveError);
      throw liveError;
    }

    // Add cache source indicator
    const responseData = {
      ...liveData,
      source: 'live',
      cacheInfo: {
        status: 'miss',
        message: 'Data fetched live due to cache miss'
      }
    };

    return new Response(
      JSON.stringify(responseData),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('❌ Materials cache fetch failed:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        source: 'error',
        error: error.message,
        materials: [],
        processedData: {}
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});