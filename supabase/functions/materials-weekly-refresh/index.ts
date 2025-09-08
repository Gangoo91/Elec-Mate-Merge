import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MaterialItem {
  id: string;
  name: string;
  category: string;
  price: string;
  supplier: string;
  image?: string;
  stockStatus: 'In Stock' | 'Out of Stock' | 'Low Stock';
  isOnSale?: boolean;
  salePrice?: string;
  highlights?: string[];
  productUrl?: string;
  description?: string;
}

interface ProcessedCategoryData {
  id: string;
  title: string;
  productCount: number;
  priceRange: string;
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
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { forceRefresh = false } = await req.json().catch(() => ({}));
    
    console.log('Starting materials weekly refresh...');
    
    // Check if cache is still valid (less than 6 days old)
    if (!forceRefresh) {
      const { data: existingCache } = await supabase
        .from('materials_weekly_cache')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
        
      if (existingCache && 
          new Date(existingCache.created_at) > new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)) {
        console.log('Cache is still valid, skipping refresh');
        return new Response(
          JSON.stringify({
            success: true,
            message: 'Cache is still valid',
            cacheAge: new Date(existingCache.created_at),
            materialsCount: existingCache.total_products
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }
    
    // Clear old cache entries
    await supabase
      .from('materials_weekly_cache')
      .delete()
      .lt('expires_at', new Date().toISOString());
    
    console.log('Invoking firecrawl-materials-scraper...');
    
    // Call the Firecrawl materials scraper for all categories
    const scraperResponse = await supabase.functions.invoke('firecrawl-materials-scraper', {
      body: { category: 'all', forceRefresh: true }
    });
    
    if (scraperResponse.error) {
      throw new Error(`Scraper failed: ${scraperResponse.error.message}`);
    }
    
    const { materials, totalCount } = scraperResponse.data;
    console.log(`Received ${totalCount} materials from scraper`);
    
    if (!materials || materials.length === 0) {
      throw new Error('No materials data received from scraper');
    }
    
    // Process materials data by category
    const categoryMap = new Map<string, MaterialItem[]>();
    materials.forEach((material: MaterialItem) => {
      const category = material.category;
      if (!categoryMap.has(category)) {
        categoryMap.set(category, []);
      }
      categoryMap.get(category)!.push(material);
    });
    
    // Create processed category data
    const processedCategories: ProcessedCategoryData[] = [];
    
    categoryMap.forEach((categoryMaterials, categoryName) => {
      const prices = categoryMaterials
        .map(m => parseFloat(m.price.replace(/[£,]/g, '')))
        .filter(p => !isNaN(p))
        .sort((a, b) => a - b);
        
      const minPrice = prices[0] || 0;
      const maxPrice = prices[prices.length - 1] || 0;
      
      const supplierCounts = new Map<string, number>();
      categoryMaterials.forEach(m => {
        supplierCounts.set(m.supplier, (supplierCounts.get(m.supplier) || 0) + 1);
      });
      
      const topBrands = Array.from(supplierCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([supplier]) => supplier);
      
      const popularItems = categoryMaterials
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);
      
      processedCategories.push({
        id: categoryName.toLowerCase().replace(/\s+/g, '-'),
        title: categoryName,
        productCount: categoryMaterials.length,
        priceRange: minPrice === maxPrice ? `£${minPrice}` : `£${minPrice} - £${maxPrice}`,
        topBrands,
        popularItems,
        trending: Math.random() > 0.7 // Random trending flag
      });
    });
    
    // Store in materials_weekly_cache
    const cacheEntry = {
      materials_data: materials,
      processed_data: processedCategories,
      total_products: totalCount,
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      last_updated: new Date().toISOString(),
      category: 'all',
      update_status: 'completed'
    };
    
    const { error: insertError } = await supabase
      .from('materials_weekly_cache')
      .insert(cacheEntry);
    
    if (insertError) {
      throw new Error(`Failed to store cache: ${insertError.message}`);
    }
    
    console.log('Materials cache updated successfully');
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Materials cache updated successfully',
        materialsCount: totalCount,
        categoriesCount: processedCategories.length,
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error in materials-weekly-refresh:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});