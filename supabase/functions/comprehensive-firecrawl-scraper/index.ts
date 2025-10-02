import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import FirecrawlApp from 'https://esm.sh/@mendable/firecrawl-js@1.9.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Split into 3 batches - each batch will be scraped in a separate function call
const BATCH_1_CATEGORIES = {
  'Electrical Hand Tools': {
    urls: ['https://www.screwfix.com/search?search=screwdrivers+pliers+spanners+electrical+work&page_size=50']
  },
  'Test Equipment': {
    urls: ['https://www.screwfix.com/search?search=testing+measurement+electrical+safety+compliance&page_size=50']
  },
  'Power Tools': {
    urls: ['https://www.screwfix.com/search?search=electric+cordless+drilling+cutting+installation&page_size=50']
  }
};

const BATCH_2_CATEGORIES = {
  'PPE': {
    urls: ['https://www.screwfix.com/search?search=personal+protective+equipment+safe+working+practices&page_size=50']
  },
  'Cable Installation': {
    urls: ['https://www.screwfix.com/search?search=cable+stripper+fish+tape+electrical&page_size=50']
  },
  'Electrical Safety': {
    urls: ['https://www.screwfix.com/search?search=hazard+identification+protection+safety+equipment&page_size=50']
  }
};

const BATCH_3_CATEGORIES = {
  'Access Tools': {
    urls: ['https://www.screwfix.com/search?search=Equipment+ladders+scaffolding+access+working+at+height&page_size=50']
  },
  'Tool Storage': {
    urls: ['https://www.screwfix.com/search?search=tool+bags+boxes+storage+solutions+organisation&page_size=50']
  },
  'Specialist Tools': {
    urls: ['https://www.screwfix.com/search?search=specialist+electrical+tools+installation+tasks&page_size=50']
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

const getBatchCategories = (batchNumber: number) => {
  switch(batchNumber) {
    case 1: return BATCH_1_CATEGORIES;
    case 2: return BATCH_2_CATEGORIES;
    case 3: return BATCH_3_CATEGORIES;
    default: return BATCH_1_CATEGORIES;
  }
};

const scrapeUrl = async (firecrawl: FirecrawlApp, url: string, category: string, maxAttempts = 2) => {
  const supplier = getSupplierFromUrl(url);
  let lastError;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`📡 [${category}] Attempt ${attempt}/${maxAttempts} - Scraping from ${supplier}...`);
      
      const crawlResponse = await firecrawl.scrapeUrl(url, {
        formats: ['extract'],
        timeout: 90000,
        extract: {
          schema: productSchema,
          prompt: `Extract products from this ${supplier} search page for ${category}.
          
          IMPORTANT - Extract products you see:
          - Full product name with model number
          - Exact price in GBP (£)
          - Brand name (Makita, Hilti, DeWalt, Bosch, Bahco, Wiha, Wera, MK, CK, Milwaukee, Ryobi, etc.)
          - Stock availability status
          - Complete product URL
          - Product image URL
          - Brief description if available
          
          Set supplier field to "${supplier}" for ALL products.
          Extract 15-20 products from this page.`
        }
      });

      if (crawlResponse.success && (crawlResponse as any).data?.extract) {
        const extractedData = (crawlResponse as any).data.extract;
        
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
          
          console.log(`✅ [${category}] Extracted ${products.length} products`);
          return { category, products, success: true };
        }
      }
      
      console.warn(`⚠️ [${category}] Attempt ${attempt}: No products found`);
      lastError = new Error('No products found');
      
      if (attempt < maxAttempts) {
        const delay = 3000 * attempt;
        console.log(`⏳ [${category}] Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
    } catch (error) {
      lastError = error;
      console.error(`❌ [${category}] Attempt ${attempt} failed:`, error.message);
      
      if (attempt < maxAttempts) {
        const delay = 3000 * attempt;
        console.log(`⏳ [${category}] Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  console.error(`❌ [${category}] All ${maxAttempts} attempts failed`);
  return { category, products: [], success: false, error: lastError?.message };
};

const checkExistingBatch = async (supabase: any, batchNumber: number) => {
  const { data, error } = await supabase
    .from('tools_weekly_cache')
    .select('*')
    .eq('category', `batch_${batchNumber}`)
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (!error && data) {
    console.log(`✅ Found cached batch ${batchNumber} (${data.total_products} products)`);
    return data;
  }
  
  return null;
};

const mergeAllBatches = async (supabase: any) => {
  console.log('🔄 Merging all batches...');
  
  const batches = await Promise.all([
    supabase.from('tools_weekly_cache')
      .select('*')
      .eq('category', 'batch_1')
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single(),
    supabase.from('tools_weekly_cache')
      .select('*')
      .eq('category', 'batch_2')
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single(),
    supabase.from('tools_weekly_cache')
      .select('*')
      .eq('category', 'batch_3')
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
  ]);

  const allTools = [];
  let batchesFound = 0;

  batches.forEach((result, index) => {
    if (!result.error && result.data) {
      allTools.push(...(result.data.tools_data || []));
      batchesFound++;
      console.log(`✅ Batch ${index + 1}: ${result.data.total_products} products`);
    } else {
      console.log(`⚠️ Batch ${index + 1}: Not found or expired`);
    }
  });

  return {
    tools: allTools,
    totalProducts: allTools.length,
    batchesFound,
    allBatchesComplete: batchesFound === 3
  };
};

serve(async (req) => {
  console.log('🔧 [BATCH-SCRAPER] Request received');

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { batch, forceRefresh, mergeAll } = body;
    
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!firecrawlApiKey) {
      throw new Error('FIRECRAWL_API_KEY missing');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Handle merge request
    if (mergeAll) {
      console.log('📦 Merge request - combining all batches...');
      const merged = await mergeAllBatches(supabase);
      
      return new Response(JSON.stringify({
        success: true,
        tools: merged.tools,
        totalFound: merged.totalProducts,
        batchesFound: merged.batchesFound,
        allBatchesComplete: merged.allBatchesComplete,
        message: `Merged ${merged.batchesFound}/3 batches (${merged.totalProducts} total products)`,
        mode: 'merge'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate batch number
    const batchNumber = batch || 1;
    if (![1, 2, 3].includes(batchNumber)) {
      throw new Error('Batch must be 1, 2, or 3');
    }

    console.log(`📊 Processing Batch ${batchNumber}`);

    // Check cache unless force refresh
    if (!forceRefresh) {
      const cachedBatch = await checkExistingBatch(supabase, batchNumber);
      if (cachedBatch) {
        return new Response(JSON.stringify({
          success: true,
          tools: cachedBatch.tools_data,
          totalFound: cachedBatch.total_products,
          batch: batchNumber,
          cached: true,
          message: `Returned cached batch ${batchNumber}`,
          expiresAt: cachedBatch.expires_at
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Scrape batch
    const firecrawl = new FirecrawlApp({ apiKey: firecrawlApiKey });
    const batchCategories = getBatchCategories(batchNumber);
    
    console.log(`🚀 Scraping ${Object.keys(batchCategories).length} categories in parallel...`);
    const startTime = Date.now();

    // Parallel scraping within batch
    const scrapingPromises = Object.entries(batchCategories).flatMap(([categoryName, config]) =>
      config.urls.map(url => scrapeUrl(firecrawl, url, categoryName))
    );

    const results = await Promise.allSettled(scrapingPromises);

    const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`⏱️ Batch ${batchNumber} completed in ${elapsedTime}s`);

    // Collect results
    const allProducts = [];
    const categoryStats = {};
    
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        const { category, products, success } = result.value;
        if (success && products.length > 0) {
          allProducts.push(...products);
          categoryStats[category] = products.length;
        } else {
          categoryStats[category] = 0;
        }
      }
    });

    const totalProducts = allProducts.length;
    console.log(`📦 Batch ${batchNumber}: ${totalProducts} products`);
    console.log(`📊 Categories:`, categoryStats);

    if (totalProducts === 0) {
      console.warn(`⚠️ Batch ${batchNumber} returned no products`);
      
      return new Response(JSON.stringify({
        success: false,
        tools: [],
        totalFound: 0,
        batch: batchNumber,
        categoryStats,
        message: `Batch ${batchNumber} found no products`,
        elapsedTime: `${elapsedTime}s`
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Store batch results
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Delete old batch data first
    await supabase
      .from('tools_weekly_cache')
      .delete()
      .eq('category', `batch_${batchNumber}`);

    const { error: storeError } = await supabase
      .from('tools_weekly_cache')
      .insert({
        tools_data: allProducts,
        total_products: totalProducts,
        category: `batch_${batchNumber}`,
        expires_at: expiresAt.toISOString(),
        update_status: 'completed'
      });

    if (storeError) {
      console.error('❌ Storage error:', storeError);
    } else {
      console.log(`✅ Batch ${batchNumber} cached successfully`);
    }

    return new Response(JSON.stringify({
      success: true,
      tools: allProducts,
      totalFound: totalProducts,
      batch: batchNumber,
      categoryStats,
      categoriesScraped: Object.keys(batchCategories),
      message: `Batch ${batchNumber}: ${totalProducts} products scraped`,
      elapsedTime: `${elapsedTime}s`,
      cached: false
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