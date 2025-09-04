import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Categories to process for materials caching
const MATERIAL_CATEGORIES = [
  'cables',
  'components', 
  'protection',
  'accessories',
  'lighting',
  'tools'
];

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

function extractPriceNumber(priceString: string): number {
  const cleanPrice = priceString.replace(/[£,]/g, '');
  return parseFloat(cleanPrice) || 0;
}

function processMaterialsData(materials: MaterialItem[]): Record<string, ProcessedCategoryData> {
  const categoryMap: Record<string, string> = {
    'cables': 'cables',
    'components': 'components',
    'protection': 'protection',
    'accessories': 'accessories',
    'lighting': 'lighting',
    'tools': 'tools'
  };

  const processed: Record<string, ProcessedCategoryData> = {};

  for (const [key, category] of Object.entries(categoryMap)) {
    const categoryMaterials = materials.filter(m => 
      m.category?.toLowerCase().includes(category) || 
      m.name?.toLowerCase().includes(category)
    );

    const prices = categoryMaterials
      .map(m => extractPriceNumber(m.price))
      .filter(p => p > 0);

    const suppliers = [...new Set(categoryMaterials.map(m => m.supplier).filter(Boolean))];
    
    // Get popular items (first 6 items)
    const popularItems = categoryMaterials.slice(0, 6);

    processed[category] = {
      title: category.charAt(0).toUpperCase() + category.slice(1),
      productCount: categoryMaterials.length,
      priceRange: {
        min: prices.length > 0 ? Math.min(...prices) : 0,
        max: prices.length > 0 ? Math.max(...prices) : 0
      },
      topBrands: suppliers.slice(0, 5),
      popularItems,
      trending: Math.random() > 0.5 // Random trending flag
    };
  }

  return processed;
}

async function fetchMaterialsFromComprehensiveSource(supabase: any) {
  console.log('🔄 Fetching materials from comprehensive scraper...');
  
  try {
    const { data, error } = await supabase.functions.invoke('comprehensive-materials-scraper');
    
    if (error) {
      console.error('❌ Error from comprehensive scraper:', error);
      throw error;
    }

    if (data?.success && Array.isArray(data.materials)) {
      console.log(`✅ Fetched ${data.materials.length} materials from comprehensive scraper`);
      return data.materials;
    }

    console.log('⚠️ No materials returned from comprehensive scraper');
    return [];
  } catch (error) {
    console.error('❌ Failed to fetch from comprehensive scraper:', error);
    throw error;
  }
}

async function updateCacheForCategory(
  supabase: any,
  category: string,
  materials: MaterialItem[],
  processedData: ProcessedCategoryData
) {
  console.log(`💾 Updating cache for category: ${category}`);
  
  try {
    const { error } = await supabase
      .from('materials_weekly_cache')
      .upsert({
        category,
        cache_data: materials,
        total_products: processedData.productCount,
        price_range: processedData.priceRange,
        top_brands: processedData.topBrands,
        popular_items: processedData.popularItems,
        update_status: 'completed',
        error_message: null,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      }, {
        onConflict: 'category'
      });

    if (error) {
      console.error(`❌ Error updating cache for ${category}:`, error);
      throw error;
    }

    console.log(`✅ Successfully updated cache for ${category} with ${materials.length} items`);
  } catch (error) {
    // Update cache with error status
    await supabase
      .from('materials_weekly_cache')
      .upsert({
        category,
        cache_data: [],
        total_products: 0,
        price_range: { min: 0, max: 0 },
        top_brands: [],
        popular_items: [],
        update_status: 'error',
        error_message: error.message,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      }, {
        onConflict: 'category'
      });
    
    throw error;
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🚀 Starting materials cache update process...');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Cleanup expired cache first
    console.log('🧹 Cleaning up expired cache...');
    await supabase.rpc('cleanup_expired_materials_weekly_cache');

    // Fetch fresh materials data
    const allMaterials = await fetchMaterialsFromComprehensiveSource(supabase);
    
    if (allMaterials.length === 0) {
      console.log('⚠️ No materials data available, skipping cache update');
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'No materials data available',
          categoriesUpdated: 0
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

    // Process the materials into categories
    const processedData = processMaterialsData(allMaterials);
    
    // Update cache for each category
    const updatePromises = MATERIAL_CATEGORIES.map(async (category) => {
      try {
        const categoryMaterials = allMaterials.filter(m => 
          m.category?.toLowerCase().includes(category) || 
          m.name?.toLowerCase().includes(category)
        );
        
        const processed = processedData[category];
        if (processed) {
          await updateCacheForCategory(supabase, category, categoryMaterials, processed);
          return { category, success: true, count: categoryMaterials.length };
        }
        
        return { category, success: false, error: 'No processed data' };
      } catch (error) {
        console.error(`❌ Error updating ${category}:`, error);
        return { category, success: false, error: error.message };
      }
    });

    const results = await Promise.allSettled(updatePromises);
    const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
    
    console.log(`✅ Cache update completed. ${successful}/${MATERIAL_CATEGORIES.length} categories updated successfully`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Cache updated successfully for ${successful} categories`,
        categoriesUpdated: successful,
        totalCategories: MATERIAL_CATEGORIES.length,
        totalMaterials: allMaterials.length,
        results: results.map(r => r.status === 'fulfilled' ? r.value : { error: 'Promise rejected' })
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('❌ Cache update failed:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        categoriesUpdated: 0
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});