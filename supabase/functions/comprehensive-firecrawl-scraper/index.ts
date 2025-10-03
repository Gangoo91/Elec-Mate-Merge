import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Category configuration with direct category URLs (easier to scrape than search)
const BATCH_1_CATEGORIES = {
  'Hand Tools': {
    urls: ['https://www.screwfix.com/c/tools/hand-tools/cat830030']
  },
  'Test Equipment': {
    urls: ['https://www.screwfix.com/c/electrical-lighting/testers-detectors/cat840012']
  },
  'Power Tools': {
    urls: ['https://www.screwfix.com/c/tools/power-tools/cat831247']
  }
};

const BATCH_2_CATEGORIES = {
  'PPE': {
    urls: ['https://www.screwfix.com/c/safety-workwear/safety-workwear/cat840007']
  },
  'Specialist Tools': {
    urls: ['https://www.screwfix.com/c/electrical-lighting/electrical-tools/cat840011']
  },
  'Safety Tools': {
    urls: ['https://www.screwfix.com/c/safety-workwear/safety-signs-equipment/cat840008']
  }
};

const BATCH_3_CATEGORIES = {
  'Access Tools & Equipment': {
    urls: ['https://www.screwfix.com/c/ladders-steps/ladders-steps/cat850005']
  },
  'Tool Storage': {
    urls: ['https://www.screwfix.com/c/tools/tool-storage/cat830032']
  }
};

// Schema for extracting product URLs from category pages
const urlExtractionSchema = {
  type: "object",
  properties: {
    product_urls: {
      type: "array",
      items: { type: "string" },
      description: "Array of full product detail page URLs found on this page"
    }
  }
};

// Schema for extracting product details from individual product pages
const productDetailSchema = {
  type: "object",
  properties: {
    name: { type: "string", description: "Product name or title" },
    price: { type: "string", description: "Current price (e.g., £29.99)" },
    category: { type: "string", description: "Product category" },
    supplier: { type: "string", description: "Supplier name (Screwfix or Toolstation)" },
    image: { type: "string", description: "Main product image URL" },
    description: { type: "string", description: "Product description" },
    stockStatus: { 
      type: "string", 
      enum: ["In Stock", "Low Stock", "Out of Stock"],
      description: "Stock availability status"
    },
    isOnSale: { type: "boolean", description: "Whether product is on sale" },
    salePrice: { type: "string", description: "Sale price if applicable" },
    highlights: { 
      type: "array", 
      items: { type: "string" },
      description: "Key features or highlights"
    },
    productUrl: { type: "string", description: "Product detail page URL" }
  }
};

const getBatchCategories = (batchNumber: number) => {
  switch(batchNumber) {
    case 1: return BATCH_1_CATEGORIES;
    case 2: return BATCH_2_CATEGORIES;
    case 3: return BATCH_3_CATEGORIES;
    default: return BATCH_1_CATEGORIES;
  }
};

// Phase 1: Extract product URLs from category page
async function extractProductUrls(
  url: string,
  firecrawlApiKey: string
): Promise<string[]> {
  console.log(`📋 Extracting product URLs from: ${url}`);
  
  try {
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        formats: ['extract'],
        extract: {
          schema: urlExtractionSchema,
          prompt: `Extract all product detail page URLs from this category page. 
                   Look for links to individual product pages (not category pages, not filters).
                   Return only the full URLs to product detail pages.
                   Product URLs typically contain '/p/' in the path.`
        },
        timeout: 45000
      }),
    });

    const data = await response.json();
    
    if (!data.success || !data.extract?.product_urls) {
      console.log(`⚠️ No URLs extracted from ${url}`);
      return [];
    }

    const urls = data.extract.product_urls.filter((url: string) => 
      url && (url.includes('/p/') || url.includes('/product/'))
    );
    
    console.log(`✅ Found ${urls.length} product URLs`);
    return urls.slice(0, 20); // Limit to 20 products per category
  } catch (error) {
    console.error(`❌ Error extracting URLs:`, error);
    return [];
  }
}

// Phase 2: Batch scrape product details from individual product pages
async function batchScrapeProducts(
  urls: string[],
  category: string,
  firecrawlApiKey: string
): Promise<any[]> {
  if (!urls || urls.length === 0) {
    console.log(`⚠️ No URLs to scrape for ${category}`);
    return [];
  }

  console.log(`🚀 Starting batch scrape for ${urls.length} products in ${category}`);
  
  try {
    // Start batch scrape job
    const batchResponse = await fetch('https://api.firecrawl.dev/v1/batch/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        urls: urls,
        formats: ['extract'],
        extract: {
          schema: productDetailSchema,
          prompt: `Extract all product details from this product page. 
                   Include the name, price, category, description, stock status, and any highlights or features.
                   If there's a sale price, mark isOnSale as true.
                   Make sure to capture the product image URL and product page URL.`
        }
      }),
    });

    const batchData = await batchResponse.json();
    
    if (!batchData.success || !batchData.id) {
      console.error(`❌ Failed to start batch job:`, batchData);
      return [];
    }

    const batchId = batchData.id;
    console.log(`📊 Batch job started: ${batchId}`);

    // Poll for results (max 60 seconds)
    let attempts = 0;
    const maxAttempts = 20;
    
    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds
      
      const statusResponse = await fetch(`https://api.firecrawl.dev/v1/batch/scrape/${batchId}`, {
        headers: {
          'Authorization': `Bearer ${firecrawlApiKey}`,
        },
      });

      const statusData = await statusResponse.json();
      console.log(`📈 Batch status: ${statusData.status} (${statusData.completed}/${statusData.total})`);

      if (statusData.status === 'completed') {
        console.log(`✅ Batch scrape completed for ${category}`);
        
        // Transform results
        const products = statusData.data
          .filter((item: any) => item.extract && item.extract.name)
          .map((item: any, index: number) => {
            const extract = item.extract;
            return {
              id: Date.now() + index,
              name: extract.name || 'Unknown Product',
              category: extract.category || category,
              price: extract.price || '£0.00',
              supplier: extract.supplier || (item.url?.includes('screwfix') ? 'Screwfix' : 'Toolstation'),
              image: extract.image || '/placeholder.svg',
              stockStatus: extract.stockStatus || 'In Stock',
              isOnSale: extract.isOnSale || false,
              salePrice: extract.salePrice,
              highlights: extract.highlights || [],
              productUrl: extract.productUrl || item.url,
              description: extract.description,
              view_product_url: extract.productUrl || item.url
            };
          });

        console.log(`📦 Transformed ${products.length} products for ${category}`);
        return products;
      }

      if (statusData.status === 'failed') {
        console.error(`❌ Batch job failed for ${category}`);
        return [];
      }

      attempts++;
    }

    console.log(`⏱️ Batch job timed out for ${category}`);
    return [];
  } catch (error) {
    console.error(`❌ Error in batch scrape:`, error);
    return [];
  }
}

// Scrape tools from a specific category using two-phase batch approach
async function scrapeCategory(
  category: string,
  url: string,
  firecrawlApiKey: string
): Promise<{ category: string; products: any[]; success: boolean }> {
  console.log(`\n🎯 Starting category: ${category}`);
  
  // Phase 1: Extract product URLs
  const productUrls = await extractProductUrls(url, firecrawlApiKey);
  
  if (productUrls.length === 0) {
    console.log(`⚠️ No product URLs found for ${category}`);
    return { category, products: [], success: false };
  }

  // Phase 2: Batch scrape product details
  const products = await batchScrapeProducts(productUrls, category, firecrawlApiKey);
  
  console.log(`✅ ${category}: ${products.length} products scraped`);
  return { category, products, success: products.length > 0 };
}

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
  
  const allCategoryNames = [
    ...Object.keys(BATCH_1_CATEGORIES),
    ...Object.keys(BATCH_2_CATEGORIES),
    ...Object.keys(BATCH_3_CATEGORIES)
  ];
  
  console.log(`📦 [MERGE] Looking for ${allCategoryNames.length} categories:`, allCategoryNames);
  
  const allTools = [];
  const successfulCategories = [];
  const failedCategories = [];
  
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

    // Scrape batch using two-phase batch approach
    const batchCategories = getBatchCategories(batchNumber);
    
    console.log(`🚀 Scraping ${Object.keys(batchCategories).length} categories using batch scrape...`);
    const startTime = Date.now();

    // Process each category sequentially (batch scrape handles parallelism internally)
    const allProducts = [];
    const categoryStats = {};
    
    for (const [categoryName, config] of Object.entries(batchCategories)) {
      const result = await scrapeCategory(categoryName, config.urls[0], firecrawlApiKey);
      
      if (result.success && result.products.length > 0) {
        allProducts.push(...result.products);
        categoryStats[categoryName] = result.products.length;
      } else {
        categoryStats[categoryName] = 0;
      }
    }

    const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`⏱️ Batch ${batchNumber} completed in ${elapsedTime}s`);

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

    // Store batch results by category name
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    
    const categoryNames = Object.keys(batchCategories);
    
    console.log(`💾 [BATCH-${batchNumber}] Storing products by category...`);
    
    // Group products by category
    const productsByCategory = {};
    allProducts.forEach(product => {
      if (!productsByCategory[product.category]) {
        productsByCategory[product.category] = [];
      }
      productsByCategory[product.category].push(product);
    });
    
    // Store each category separately
    for (const categoryName of categoryNames) {
      const categoryProducts = productsByCategory[categoryName] || [];
      
      if (categoryProducts.length === 0) {
        console.warn(`⚠️ [BATCH-${batchNumber}] No products found for category: ${categoryName}`);
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
      message: `Batch ${batchNumber}: ${totalProducts} products scraped and stored by category using batch scrape method`,
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
