import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import FirecrawlApp from 'https://esm.sh/@mendable/firecrawl-js@1.29.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const productSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    price: { type: "string" },
    supplier: { type: "string" },
    image: { type: "string" },
    description: { type: "string" },
    view_product_url: { type: "string" },
    stockStatus: { type: "string" },
    highlights: { type: "array", items: { type: "string" } }
  },
  required: ["name", "price"]
}

const CATEGORIES = [
  'Hand Tools',
  'Power Tools', 
  'Testing Equipment',
  'Safety Equipment'
];

const fetchCategoryTools = async (app: FirecrawlApp, category: string, maxItems = 12) => {
  console.log(`🔧 Scraping ${category} (max ${maxItems} items)...`);
  
  const tools = [];
  
  // Screwfix search
  try {
    const screwfixUrl = `https://www.screwfix.com/c/electrical-lighting/cat830118?search=${encodeURIComponent(category)}`;
    const screwfixResult = await app.scrapeUrl(screwfixUrl, {
      formats: ['extract'],
      extract: {
        schema: {
          type: "object",
          properties: {
            products: {
              type: "array", 
              items: productSchema
            }
          }
        }
      }
    });
    
    if (screwfixResult.success && screwfixResult.data?.extract?.products) {
      const products = screwfixResult.data.extract.products
        .slice(0, Math.ceil(maxItems / 2))
        .map((p: any) => ({
          ...p,
          supplier: 'Screwfix',
          category
        }));
      tools.push(...products);
      console.log(`✅ Retrieved ${products.length} ${category} products from Screwfix`);
    }
  } catch (error) {
    console.warn(`⚠️ Screwfix scraping failed for ${category}:`, error);
  }
  
  // Toolstation search  
  try {
    const toolstationUrl = `https://www.toolstation.com/search?q=${encodeURIComponent(category)}`;
    const toolstationResult = await app.scrapeUrl(toolstationUrl, {
      formats: ['extract'],
      extract: {
        schema: {
          type: "object",
          properties: {
            products: {
              type: "array",
              items: productSchema
            }
          }
        }
      }
    });
    
    if (toolstationResult.success && toolstationResult.data?.extract?.products) {
      const products = toolstationResult.data.extract.products
        .slice(0, Math.floor(maxItems / 2))
        .map((p: any) => ({
          ...p,
          supplier: 'Toolstation',
          category
        }));
      tools.push(...products);
      console.log(`✅ Retrieved ${products.length} ${category} products from Toolstation`);
    }
  } catch (error) {
    console.warn(`⚠️ Toolstation scraping failed for ${category}:`, error);
  }
  
  return tools;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🚀 Optimized Tools Scraper started');
    
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!firecrawlApiKey) {
      throw new Error('FIRECRAWL_API_KEY not found');
    }
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const app = new FirecrawlApp({ apiKey: firecrawlApiKey });
    
    const allTools = [];
    
    // Process categories in parallel for speed
    const categoryPromises = CATEGORIES.map(category => 
      fetchCategoryTools(app, category, 12)
    );
    
    const categoryResults = await Promise.allSettled(categoryPromises);
    
    categoryResults.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        allTools.push(...result.value);
      } else {
        console.error(`❌ Failed to scrape ${CATEGORIES[index]}:`, result.reason);
      }
    });
    
    console.log(`📊 Total tools scraped: ${allTools.length}`);
    
    if (allTools.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'No tools data scraped',
          count: 0 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Save to cache with 7-day expiry
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    
    const { error: cacheError } = await supabase
      .from('materials_weekly_cache')
      .insert({
        materials_data: allTools,
        expires_at: expiresAt.toISOString(),
        last_updated: new Date().toISOString()
      });
    
    if (cacheError) {
      console.error('❌ Failed to save to cache:', cacheError);
      throw cacheError;
    }
    
    console.log('✅ Tools data cached successfully');
    
    // Clean up old cache entries (keep latest 3)
    const { data: allCache } = await supabase
      .from('materials_weekly_cache')
      .select('id')
      .order('created_at', { ascending: false });
    
    if (allCache && allCache.length > 3) {
      const idsToDelete = allCache.slice(3).map(item => item.id);
      await supabase
        .from('materials_weekly_cache')
        .delete()
        .in('id', idsToDelete);
      console.log(`🧹 Cleaned up ${idsToDelete.length} old cache entries`);
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Tools data updated successfully',
        count: allTools.length,
        categories: CATEGORIES
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('❌ Error in optimized-tools-scraper:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to scrape tools data',
        details: error.toString()
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
