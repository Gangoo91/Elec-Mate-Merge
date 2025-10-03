import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import FirecrawlApp from 'https://esm.sh/@mendable/firecrawl-js@1.9.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Split into 3 batches - each batch will be scraped in a separate function call
// IMPORTANT: Category names MUST match frontend categories in useToolCategories.ts
const BATCH_1_CATEGORIES = {
  'Hand Tools': {
    urls: ['https://www.screwfix.com/search?search=screwdrivers+pliers+spanners+electrical+hand+tools&page_size=50']
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
  'Specialist Tools': {
    urls: ['https://www.screwfix.com/search?search=cable+stripper+fish+tape+wire+tools+electrical&page_size=50']
  },
  'Safety Tools': {
    urls: ['https://www.screwfix.com/search?search=safety+equipment+lockout+signs+barriers+electrical&page_size=50']
  }
};

const BATCH_3_CATEGORIES = {
  'Access Tools & Equipment': {
    urls: ['https://www.screwfix.com/search?search=ladders+scaffolding+access+working+height&page_size=50']
  },
  'Tool Storage': {
    urls: ['https://www.screwfix.com/search?search=tool+bags+boxes+storage+solutions+organisation&page_size=50']
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
      console.log(`🔍 [${category}] Using Extract format with AI-powered schema extraction`);
      
      // Use extract format with product schema for AI-powered structured data extraction
      const crawlResponse = await firecrawl.scrapeUrl(url, {
        formats: ['extract'],
        extract: {
          schema: productSchema,
          prompt: `Extract all electrical tools/products from this page. For each product include: name, price, availability/stock status, image URL, product page URL, description, supplier name, category, and brand if available.`
        },
        timeout: 90000,
        onlyMainContent: true
      });

      console.log(`📋 [${category}] Response:`, JSON.stringify(crawlResponse).substring(0, 200));

      if (crawlResponse.success && (crawlResponse as any).data?.extract?.products) {
        const extractedProducts = (crawlResponse as any).data.extract.products;
        console.log(`✅ [${category}] Extracted ${extractedProducts.length} products using AI schema`);
        
        // Transform extracted products to match our format
        const products = extractedProducts.map((p: any, idx: number) => ({
          id: Date.now() + idx,
          name: p.name || 'Unknown Product',
          price: p.price || '£0.00',
          category: category,
          supplier: p.supplier || supplier,
          image: p.image || '/placeholder.svg',
          stockStatus: p.availability || p.stockStatus || 'Check Availability',
          productUrl: p.productUrl || url,
          description: p.description || '',
          brand: p.brand || supplier,
          isOnSale: false,
          salePrice: '',
          view_product_url: p.productUrl || url
        })).slice(0, 15); // Limit to 15 products per category
        
        if (products.length > 0) {
          console.log(`✅ [${category}] Successfully processed ${products.length} products`);
          return { category, products, success: true };
        }
        
        console.warn(`⚠️ [${category}] Attempt ${attempt}: Products extracted but none valid`);
      } else {
        console.warn(`⚠️ [${category}] Attempt ${attempt}: No products in extract response`);
      }
      
      lastError = new Error('No products found in extract response');
      
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

// Legacy markdown parser - no longer used with extract format
// Kept for reference only

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
  console.log('🔄 [MERGE] Starting merge of all category batches...');
  
  // Get all category names from all batches
  const allCategoryNames = [
    ...Object.keys(BATCH_1_CATEGORIES),
    ...Object.keys(BATCH_2_CATEGORIES),
    ...Object.keys(BATCH_3_CATEGORIES)
  ];
  
  console.log(`📦 [MERGE] Looking for ${allCategoryNames.length} categories:`, allCategoryNames);
  
  const allTools = [];
  const successfulCategories = [];
  const failedCategories = [];
  
  // Query each category individually
  for (const categoryName of allCategoryNames) {
    const { data, error } = await supabase
      .from('tools_weekly_cache')
      .select('*')
      .eq('category', categoryName)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    if (!error && data && data.tools_data) {
      const productCount = data.tools_data.length;
      allTools.push(...data.tools_data);
      successfulCategories.push(categoryName);
      console.log(`✅ [MERGE] ${categoryName}: ${productCount} products`);
    } else {
      failedCategories.push(categoryName);
      console.warn(`⚠️ [MERGE] ${categoryName}: Not found or expired`);
    }
  }

  const totalProducts = allTools.length;
  console.log(`📊 [MERGE] Complete: ${totalProducts} total products from ${successfulCategories.length}/${allCategoryNames.length} categories`);
  
  if (failedCategories.length > 0) {
    console.warn(`⚠️ [MERGE] Missing categories:`, failedCategories);
  }

  return {
    success: successfulCategories.length > 0,
    tools: allTools,
    totalProducts,
    categoriesFound: successfulCategories.length,
    totalCategories: allCategoryNames.length,
    successfulCategories,
    failedCategories,
    allCategoriesComplete: failedCategories.length === 0
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
      console.log('📦 [MERGE-REQUEST] Combining all category batches...');
      const merged = await mergeAllBatches(supabase);
      
      return new Response(JSON.stringify({
        success: merged.success,
        tools: merged.tools,
        totalFound: merged.totalProducts,
        categoriesFound: merged.categoriesFound,
        totalCategories: merged.totalCategories,
        successfulCategories: merged.successfulCategories,
        failedCategories: merged.failedCategories,
        allCategoriesComplete: merged.allCategoriesComplete,
        message: merged.success 
          ? `Merged ${merged.categoriesFound}/${merged.totalCategories} categories (${merged.totalProducts} total products)`
          : 'No categories found - data may not be scraped yet',
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

    // Store batch results by category name instead of batch number
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    
    const categoryNames = Object.keys(batchCategories);
    
    console.log(`💾 [BATCH-${batchNumber}] Storing products by category...`);
    console.log(`📋 [BATCH-${batchNumber}] Expected categories:`, categoryNames);
    
    // Group products by category
    const productsByCategory = {};
    allProducts.forEach(product => {
      if (!productsByCategory[product.category]) {
        productsByCategory[product.category] = [];
      }
      productsByCategory[product.category].push(product);
    });
    
    console.log(`📦 [BATCH-${batchNumber}] Products grouped by:`, Object.keys(productsByCategory));
    
    // Store each category separately
    for (const categoryName of categoryNames) {
      const categoryProducts = productsByCategory[categoryName] || [];
      
      if (categoryProducts.length === 0) {
        console.warn(`⚠️ [BATCH-${batchNumber}] No products found for category: ${categoryName}`);
        console.warn(`   Searched for products with category="${categoryName}"`);
        console.warn(`   Available categories in scraped data:`, Object.keys(productsByCategory));
        continue;
      }
      
      // Delete old category data
      await supabase
        .from('tools_weekly_cache')
        .delete()
        .eq('category', categoryName);
      
      // Insert new category data
      const { error: storeError } = await supabase
        .from('tools_weekly_cache')
        .insert({
          tools_data: categoryProducts,
          total_products: categoryProducts.length,
          category: categoryName,
          expires_at: expiresAt.toISOString(),
          update_status: 'completed'
        });
      
      if (storeError) {
        console.error(`❌ [BATCH-${batchNumber}] Storage error for ${categoryName}:`, storeError);
      } else {
        console.log(`✅ [BATCH-${batchNumber}] Stored ${categoryProducts.length} products in category: ${categoryName}`);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      tools: allProducts,
      totalFound: totalProducts,
      batch: batchNumber,
      categoryStats,
      categoriesScraped: Object.keys(batchCategories),
      productsByCategory,
      message: `Batch ${batchNumber}: ${totalProducts} products scraped and stored by category`,
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