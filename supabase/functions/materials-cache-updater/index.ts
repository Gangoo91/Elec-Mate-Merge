import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const categories = [
  'cables',
  'components', 
  'protection',
  'accessories',
  'lighting',
  'tools'
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    console.log('🔄 Starting materials cache update...');

    // Clear expired cache entries first
    const { error: cleanupError } = await supabase
      .from('materials_weekly_cache')
      .delete()
      .lt('expires_at', new Date().toISOString());

    if (cleanupError) {
      console.error('Cleanup error:', cleanupError);
    } else {
      console.log('🧹 Cleaned up expired cache entries');
    }

    const results = [];
    let totalMaterials = 0;

    // Fetch fresh data for each category
    for (const category of categories) {
      try {
        console.log(`🔍 Fetching ${category} data...`);

        const { data: categoryData, error: fetchError } = await supabase.functions.invoke(
          'comprehensive-materials-scraper',
          { body: { category } }
        );

        if (fetchError) {
          console.error(`Error fetching ${category}:`, fetchError);
          continue;
        }

        const materials = categoryData?.materials || [];
        totalMaterials += materials.length;

        if (materials.length > 0) {
          // Calculate category stats
          const prices = materials
            .map((m: any) => {
              const match = m.price?.match(/[\d,]+\.?\d*/);
              return match ? parseFloat(match[0].replace(/,/g, '')) : 0;
            })
            .filter((p: number) => p > 0);

          const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
          const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

          const suppliers = [...new Set(materials.map((m: any) => m.supplier))];
          const topBrands = suppliers.slice(0, 4);

          const popularItems = materials
            .slice(0, 3)
            .map((material: any) => ({
              name: material.name,
              price: material.price,
              rating: 4.5 + Math.random() * 0.4,
              sales: Math.floor(Math.random() * 200) + 50
            }));

          // Insert into cache with fixed data types
          const priceRangeText = `£${minPrice.toFixed(0)} - £${maxPrice.toFixed(0)}`;
          
          const { error: insertError } = await supabase
            .from('materials_weekly_cache')
            .insert({
              category,
              cache_data: materials,
              total_products: materials.length,
              price_range: priceRangeText, // Store as plain text
              top_brands: topBrands, // Store as array directly
              popular_items: popularItems, // Store as JSONB directly
              update_status: 'completed',
              expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
            });

          if (insertError) {
            console.error(`Error inserting ${category} cache:`, insertError);
          } else {
            console.log(`✅ Cached ${materials.length} ${category} materials`);
            results.push({
              category,
              materialsCount: materials.length,
              status: 'success'
            });
          }
        } else {
          console.log(`⚠️ No materials found for ${category}`);
          results.push({
            category,
            materialsCount: 0,
            status: 'no_data'
          });
        }

        // Small delay to avoid overwhelming the scraper
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error) {
        console.error(`Error processing ${category}:`, error);
        results.push({
          category,
          materialsCount: 0,
          status: 'error',
          error: error.message
        });
      }
    }

    console.log(`🎉 Cache update completed! Total materials: ${totalMaterials}`);

    return new Response(JSON.stringify({
      success: true,
      totalMaterials,
      results,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error in materials-cache-updater:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});