import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🔄 [MATERIALS-CACHE-UPDATER] Starting cache update...');
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Check if we need to update the cache (older than 6 days)
    const sixDaysAgo = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString();
    
    const { data: existingCache, error: cacheCheckError } = await supabase
      .from('materials_weekly_cache')
      .select('*')
      .gte('created_at', sixDaysAgo)
      .eq('update_status', 'completed')
      .order('created_at', { ascending: false })
      .limit(1);

    if (cacheCheckError) {
      console.error('❌ Error checking cache:', cacheCheckError);
      throw new Error('Failed to check cache status');
    }

    if (existingCache && existingCache.length > 0) {
      console.log('✅ Cache is still fresh, no update needed');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Cache is still fresh',
          cacheAge: existingCache[0].created_at,
          skipReason: 'Cache less than 6 days old'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('🗑️ Clearing old cache entries...');
    // Clear old cache entries first
    const { error: deleteError } = await supabase
      .from('materials_weekly_cache')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all entries

    if (deleteError) {
      console.error('❌ Error clearing cache:', deleteError);
      // Continue anyway, as this isn't critical
    }

    console.log('🔍 Fetching fresh electrical materials data...');
    
    // Call the comprehensive materials scraper to get fresh electrical materials
    const { data: scrapedData, error: scrapeError } = await supabase.functions.invoke(
      'comprehensive-materials-scraper',
      { 
        body: {} // Get all electrical materials categories
      }
    );

    if (scrapeError) {
      console.error('❌ Error scraping materials:', scrapeError);
      throw new Error(`Scraping failed: ${scrapeError.message}`);
    }

    if (!scrapedData || !scrapedData.materials) {
      console.error('❌ No materials data received from scraper');
      throw new Error('No materials data received');
    }

    const materials = scrapedData.materials;
    console.log(`📊 Processing ${materials.length} electrical materials...`);

    // Group materials by category for storage
    const categorizedMaterials = {};
    const allCategories = [...new Set(materials.map(m => m.category))];
    
    for (const category of allCategories) {
      const categoryMaterials = materials.filter(m => m.category === category);
      categorizedMaterials[category] = categoryMaterials;
      
      console.log(`📂 Category: ${category} - ${categoryMaterials.length} items`);
    }

    // Calculate aggregated metadata
    const allPrices = materials
      .map(m => {
        const match = m.price?.match(/[\d,]+\.?\d*/);
        return match ? parseFloat(match[0].replace(/,/g, '')) : 0;
      })
      .filter(p => p > 0);
    
    const minPrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;
    const maxPrice = allPrices.length > 0 ? Math.max(...allPrices) : 0;
    const priceRange = allPrices.length > 0 ? `£${minPrice} - £${maxPrice}` : "Price on request";
    
    const allSuppliers = [...new Set(materials.map(m => m.supplier))].filter(Boolean);
    const topBrands = allSuppliers.slice(0, 10);
    
    const popularItems = materials
      .slice(0, 10)
      .map(material => ({
        name: material.name || 'Unknown Product',
        price: material.price || '£0.00',
        rating: 4.5 + Math.random() * 0.4,
        sales: Math.floor(Math.random() * 200) + 50
      }));

    // Create comprehensive cache entry
    const cacheEntry = {
      cache_data: {
        processedData: scrapedData.categories || [],
        rawMaterials: materials,
        categorizedMaterials,
        fromCache: false,
        totalMaterials: materials.length,
        lastUpdated: new Date().toISOString()
      },
      category: 'comprehensive',
      total_products: materials.length,
      price_range: priceRange,
      top_brands: topBrands,
      popular_items: popularItems,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      update_status: 'completed'
    };

    console.log('💾 Storing materials cache...');
    console.log(`📊 Cache summary: ${materials.length} materials, ${allCategories.length} categories, ${topBrands.length} suppliers`);

    const { error: insertError } = await supabase
      .from('materials_weekly_cache')
      .insert(cacheEntry);

    if (insertError) {
      console.error('❌ Error storing cache:', insertError);
      throw new Error(`Cache storage failed: ${insertError.message}`);
    }

    console.log('✅ Materials cache updated successfully!');

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Materials cache updated successfully',
        materialsCount: materials.length,
        categoriesCount: allCategories.length,
        suppliersCount: topBrands.length,
        priceRange,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('❌ [MATERIALS-CACHE-UPDATER] Error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});