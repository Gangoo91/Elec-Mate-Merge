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

    // Process categories in smaller batches to reduce server load
    const BATCH_SIZE = 2; // Process 2 categories at a time
    const BATCH_DELAY = 5000; // 5 second delay between batches
    
    for (let i = 0; i < categories.length; i += BATCH_SIZE) {
      const batch = categories.slice(i, i + BATCH_SIZE);
      console.log(`📦 Processing category batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(categories.length / BATCH_SIZE)}`);
      
      const batchPromises = batch.map(async (category) => {
        try {
          console.log(`🔍 Fetching ${category} data...`);

          const { data: categoryData, error: fetchError } = await supabase.functions.invoke(
            'comprehensive-materials-scraper',
            { body: { category } }
          );

          if (fetchError) {
            console.error(`Error fetching ${category}:`, fetchError);
            return {
              category,
              materialsCount: 0,
              status: 'error',
              error: fetchError.message
            };
          }

          const materials = categoryData?.materials || [];

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

            // Insert into cache
            const { error: insertError } = await supabase
              .from('materials_weekly_cache')
              .insert({
                category,
                cache_data: materials,
                total_products: materials.length,
                price_range: { min: minPrice, max: maxPrice },
                top_brands: topBrands,
                popular_items: popularItems,
                update_status: 'completed',
                expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
              });

            if (insertError) {
              console.error(`Error inserting ${category} cache:`, insertError);
              return {
                category,
                materialsCount: materials.length,
                status: 'cache_error',
                error: insertError.message
              };
            } else {
              console.log(`✅ Cached ${materials.length} ${category} materials`);
              return {
                category,
                materialsCount: materials.length,
                status: 'success'
              };
            }
          } else {
            console.log(`⚠️ No materials found for ${category}`);
            return {
              category,
              materialsCount: 0,
              status: 'no_data'
            };
          }

        } catch (error) {
          console.error(`Error processing ${category}:`, error);
          return {
            category,
            materialsCount: 0,
            status: 'error',
            error: error.message
          };
        }
      });

      // Wait for batch to complete
      const batchResults = await Promise.allSettled(batchPromises);
      
      // Process results
      for (const result of batchResults) {
        if (result.status === 'fulfilled') {
          const categoryResult = result.value;
          results.push(categoryResult);
          if (categoryResult.materialsCount > 0) {
            totalMaterials += categoryResult.materialsCount;
          }
        } else {
          console.error('Batch promise rejected:', result.reason);
        }
      }

      // Add delay between batches unless it's the last batch
      if (i + BATCH_SIZE < categories.length) {
        console.log(`⏳ Waiting ${BATCH_DELAY/1000}s before next batch...`);
        await new Promise(resolve => setTimeout(resolve, BATCH_DELAY));
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