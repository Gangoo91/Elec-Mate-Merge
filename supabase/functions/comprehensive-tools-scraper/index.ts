import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('🔧 [COMPREHENSIVE-TOOLS-SCRAPER] Starting request...');

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { searchTerm, categoryFilter, supplierFilter } = await req.json();
    
    console.log(`🔍 Searching for tools: "${searchTerm}" | Category: ${categoryFilter || 'all'} | Supplier: ${supplierFilter || 'all'}`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get cached tools from materials_weekly_cache
    const { data: cacheData, error: cacheError } = await supabase
      .from('materials_weekly_cache')
      .select('materials_data')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (cacheError) {
      console.error('❌ Cache error:', cacheError);
      throw new Error('Failed to fetch cached tool data');
    }

    let allTools = [];

    if (cacheData?.materials_data && Array.isArray(cacheData.materials_data)) {
      allTools = cacheData.materials_data.map((item, index) => ({
        id: item.id || index + 1000,
        name: item.name || 'Unknown Tool',
        category: item.category || 'Tools',
        price: item.price || '£0.00',
        supplier: item.supplier || 'Screwfix',
        image: item.image || '/placeholder.svg',
        stockStatus: item.stockStatus || 'In Stock',
        isOnSale: item.isOnSale || false,
        salePrice: item.salePrice,
        highlights: item.highlights || [],
        productUrl: item.view_product_url || item.productUrl,
        description: item.description,
        reviews: item.reviews
      }));

      console.log(`📊 Loaded ${allTools.length} tools from cache`);
    }

    // Apply filters
    let filteredTools = allTools;

    if (categoryFilter && categoryFilter !== 'all') {
      filteredTools = filteredTools.filter(tool => 
        tool.category.toLowerCase().includes(categoryFilter.toLowerCase())
      );
    }

    if (supplierFilter && supplierFilter !== 'all') {
      filteredTools = filteredTools.filter(tool => 
        tool.supplier.toLowerCase().includes(supplierFilter.toLowerCase())
      );
    }

    if (searchTerm && searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filteredTools = filteredTools.filter(tool => 
        tool.name.toLowerCase().includes(searchLower)
      );
    }

    // Sort by price
    filteredTools.sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[£,]/g, ''));
      const priceB = parseFloat(b.price.replace(/[£,]/g, ''));
      return priceA - priceB;
    });

    // Limit results
    if (filteredTools.length > 50) {
      filteredTools = filteredTools.slice(0, 50);
    }

    console.log(`✅ Returning ${filteredTools.length} filtered tools`);

    return new Response(JSON.stringify({
      success: true,
      tools: filteredTools,
      searchTerm,
      total: filteredTools.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in comprehensive-tools-scraper:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      tools: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});