import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import FirecrawlApp from "https://esm.sh/@mendable/firecrawl-js@4.3.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ALL Tool categories - prioritized by importance
const TOOL_CATEGORIES = {
  'Electrical Hand Tools': {
    urls: [
      'https://www.screwfix.com/search?search=screwdrivers+pliers+spanners+electrical+work&page_size=50'
    ],
    priority: 1
  }
};

const productSchema = {
  type: "object",
  properties: {
    products: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { 
            type: "string", 
            description: "Product name with model number" 
          },
          price: { 
            type: "string", 
            description: "Product price with £ symbol" 
          },
          availability: { 
            type: "string", 
            description: "Stock status" 
          },
          image: { 
            type: "string", 
            description: "Product image URL" 
          },
          productUrl: { 
            type: "string", 
            description: "Product detail page URL" 
          },
          description: { 
            type: "string", 
            description: "Product description" 
          },
          supplier: { 
            type: "string", 
            description: "Supplier name" 
          },
          category: {
            type: "string",
            description: "Product category",
          },
          brand: {
            type: "string",
            description: "Brand name",
          },
        },
        required: ["name", "price"]
      }
    }
  }
};

const getSupplierFromUrl = (url: string): string => {
  if (url.includes('screwfix.com')) return 'Screwfix';
  if (url.includes('toolstation.com')) return 'Toolstation';
  if (url.includes('cef.co.uk')) return 'CEF';
  return 'Unknown';
};

const scrapeUrl = async (firecrawl: FirecrawlApp, url: string, category: string, timeout: number = 20000) => {
  const supplier = getSupplierFromUrl(url);
  console.log(`📡 Scraping: ${category} from ${supplier} - URL: ${url}`);
  
  try {
    console.log(`🔑 Using Firecrawl v4 extract API...`);
    
    const extractionPrompt = `Extract ALL products from this ${supplier} search page for ${category}.
      
      Extract:
      - Product name with model number
      - Price in GBP (£)
      - Brand (Makita, Hilti, DeWalt, Bosch, Bahco, Wiha, Wera, MK, CK, etc.)
      - Availability status
      - Product URL and image
      
      Set supplier to "${supplier}" for all products.
      Extract EVERY product visible on the page - aim for 20-50 products.`;

    // Firecrawl v4 extract API format - use 'url' (string) not 'urls' (array) when providing schema
    const extractResult = await firecrawl.extract({
      url: url,
      schema: productSchema,
      prompt: `Extract all electrical tools and products from this ${supplier} page. For each product: name, price (£), brand, stock status, product URL, image URL, and description. Extract every visible product on the page.`
    });

    console.log(`📊 Extract response for ${category}:`, JSON.stringify(extractResult, null, 2));

    if (extractResult.success && extractResult.data) {
      const extractedData = extractResult.data;
      
      if (extractedData.products && Array.isArray(extractedData.products)) {
        const products = extractedData.products.map((product: any) => ({
          ...product,
          category,
          supplier: supplier,
          lastUpdated: new Date().toISOString(),
          availability: product.availability || 'Check Availability',
          image: product.image || '/placeholder.svg',
          description: product.description || '',
          features: product.features || [],
          specifications: product.specifications || {}
        }));
        
        console.log(`✅ ${category}: ${products.length} products from ${supplier}`);
        return products;
      } else {
        console.warn(`⚠️ ${category}: No products array in extracted data`);
        console.log(`📋 Available data keys:`, Object.keys(extractedData));
      }
    } else {
      console.warn(`⚠️ ${category}: Extract unsuccessful or no data. Response:`, extractResult);
    }
    
    console.warn(`⚠️ ${category}: No products found`);
    return [];
    
  } catch (error) {
    console.error(`❌ ${category} failed:`, error);
    console.error(`❌ Error message:`, error.message);
    if (error.stack) {
      console.error(`❌ Error stack:`, error.stack);
    }
    return [];
  }
};

serve(async (req) => {
  console.log('🔧 [ALL-CATEGORIES-SCRAPER] Starting...');

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { categories, batch } = await req.json().catch(() => ({ 
      categories: null, 
      batch: null 
    }));
    
    console.log('🔑 Checking for FIRECRAWL_API_KEY...');
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!firecrawlApiKey) {
      console.error('❌ FIRECRAWL_API_KEY is missing!');
      throw new Error('FIRECRAWL_API_KEY missing - please add it in Supabase Edge Function Secrets');
    }
    console.log('✅ FIRECRAWL_API_KEY found');

    console.log('🔧 Initializing Firecrawl client...');
    const firecrawl = new FirecrawlApp({ apiKey: firecrawlApiKey });
    console.log('✅ Firecrawl client initialized');

    console.log('🔧 Initializing Supabase client...');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase client initialized');

    // Determine which categories to scrape
    let categoriesToScrape = Object.entries(TOOL_CATEGORIES);
    
    if (categories) {
      categoriesToScrape = categoriesToScrape.filter(([cat]) => categories.includes(cat));
    } else if (batch) {
      // Support batch processing: batch 1, 2, or 3
      categoriesToScrape = categoriesToScrape.filter(([_, config]) => config.priority === batch);
    }

    console.log(`📊 Scraping ${categoriesToScrape.length} categories (Batch: ${batch || 'all'})`);

    // Process ALL categories in parallel
    const scrapingPromises = categoriesToScrape.flatMap(([categoryName, categoryConfig]) =>
      categoryConfig.urls.map(url => 
        scrapeUrl(firecrawl, url, categoryName, 18000)
          .then(products => ({ categoryName, products, success: true }))
          .catch(error => ({ categoryName, products: [], success: false, error: error.message }))
      )
    );

    console.log(`🚀 Launching ${scrapingPromises.length} parallel scrapes...`);
    const startTime = Date.now();
    
    // Execute all in parallel with timeout safety
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Function timeout approaching')), 50000)
    );
    
    let results;
    try {
      results = await Promise.race([
        Promise.allSettled(scrapingPromises),
        timeoutPromise
      ]);
    } catch (timeoutError) {
      console.error('⏱️ Timeout reached, returning partial results');
      results = [];
    }

    const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`⏱️ Scraping completed in ${elapsedTime}s`);

    // Collect results
    const allScrapedTools = [];
    const categoryStats = {};
    
    if (Array.isArray(results)) {
      results.forEach((result) => {
        if (result.status === 'fulfilled' && result.value.success) {
          const { categoryName, products } = result.value;
          allScrapedTools.push(...products);
          categoryStats[categoryName] = products.length;
        } else if (result.status === 'fulfilled' && !result.value.success) {
          categoryStats[result.value.categoryName] = 0;
        }
      });
    }

    const totalProductsFound = allScrapedTools.length;
    console.log(`🎉 Total: ${totalProductsFound} products`);
    console.log(`📊 By category:`, categoryStats);

    if (totalProductsFound === 0) {
      console.warn('⚠️ No products found across all categories');
      
      return new Response(JSON.stringify({
        success: false,
        tools: [],
        totalFound: 0,
        categoryStats,
        message: 'No products found - check Firecrawl or website availability',
        batch: batch || 'all',
        elapsedTime: `${elapsedTime}s`
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Store results in cache
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const { error: storeError } = await supabase
      .from('tools_weekly_cache')
      .insert({
        tools_data: allScrapedTools,
        total_products: totalProductsFound,
        category: batch ? `batch_${batch}` : 'all_categories',
        expires_at: expiresAt.toISOString(),
        update_status: 'completed'
      });

    if (storeError) {
      console.error('❌ Storage error:', storeError);
    } else {
      console.log('✅ Data cached successfully');
    }

    return new Response(JSON.stringify({
      success: true,
      tools: allScrapedTools,
      totalFound: totalProductsFound,
      categoriesScraped: categoriesToScrape.map(([name]) => name),
      categoryStats,
      message: `Scraped ${totalProductsFound} tools from ${categoriesToScrape.length} categories`,
      batch: batch || 'all',
      elapsedTime: `${elapsedTime}s`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Fatal error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      tools: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});