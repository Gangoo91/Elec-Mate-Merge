import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Category configuration with search URLs
const BATCH_1_CATEGORIES = [
  {
    name: 'Hand Tools',
    searchTerm: 'Screwdrivers, pliers, strippers and manual tools',
    urls: [
      'https://www.screwfix.com/search?search=Screwdrivers%2C+pliers%2C+strippers+and+manual+tools&page_size=100',
      'https://www.toolstation.com/search?q=Screwdrivers%2C+pliers%2C+strippers+and+manual+tools'
    ]
  },
  {
    name: 'Power Tools',
    searchTerm: 'Drills, saws, grinders and cordless tool systems',
    urls: [
      'https://www.screwfix.com/search?search=Drills%2C+saws%2C+grinders+and+cordless+tool+systems&page_size=100',
      'https://www.toolstation.com/search?q=Drills%2C+saws%2C+grinders+and+cordless+tool+systems'
    ]
  }
];

const BATCH_2_CATEGORIES = [
  {
    name: 'PPE',
    searchTerm: 'Personal Protective Equipment',
    urls: [
      'https://www.screwfix.com/search?search=ppe&page_size=100',
      'https://www.toolstation.com/search?q=ppe'
    ]
  },
  {
    name: 'Specialist Tools',
    searchTerm: 'Cable tools, crimpers, benders and specialised equipment',
    urls: [
      'https://www.screwfix.com/search?search=Cable+tools%2C+crimpers%2C+benders+and+specialised+equipment',
      'https://www.toolstation.com/search?q=Cable+tools%2C+crimpers%2C+benders+and+specialised+equipment'
    ]
  }
];

const BATCH_3_CATEGORIES = [
  {
    name: 'Test Equipment',
    searchTerm: 'Multimeters, socket testers, insulation testers and PAT equipment',
    urls: [
      'https://www.screwfix.com/search?search=Multimeters%2C+socket+testers%2C+insulation+testers+and+PAT+equipment&sort_by=-brand',
      'https://www.toolstation.com/search?q=Multimeters%2C+socket+testers%2C+insulation+testers+and+PAT+equipment'
    ]
  },
  {
    name: 'Safety Tools',
    searchTerm: 'Safety equipment and protective devices',
    urls: [
      'https://www.screwfix.com/search?search=safety+equipment+and+protective+devices&page_size=100',
      'https://www.toolstation.com/search?q=safety+equipment+and+protective+devices'
    ]
  }
];

const BATCH_4_CATEGORIES = [
  {
    name: 'Access Tools & Equipment',
    searchTerm: 'Ladders, scaffolding and access equipment for working at height',
    urls: [
      'https://www.screwfix.com/search?search=Ladders%2C+scaffolding+and+access+equipment+for+working+at+height&page_size=100',
      'https://www.toolstation.com/search?q=Ladders%2C+scaffolding+and+access+equipment+for+working+at+height'
    ]
  },
  {
    name: 'Tool Storage',
    searchTerm: 'Tool bags, boxes and storage solutions for organisation',
    urls: [
      'https://www.screwfix.com/search?search=Tool+bags%2C+boxes+and+storage+solutions+for+organisation&page_size=100',
      'https://www.toolstation.com/search?q=ool+bags%2C+boxes+and+storage+solutions+for+organisation'
    ]
  }
];

// No longer using extraction schema - using markdown + regex instead

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
    case 4: return BATCH_4_CATEGORIES;
    default: return BATCH_1_CATEGORIES;
  }
};

// Phase 1: Extract product URLs from category page using markdown + regex
async function extractProductUrls(
  url: string,
  firecrawlApiKey: string
): Promise<string[]> {
  console.log(`📋 Extracting product URLs from: ${url}`);
  
  try {
    // Use markdown format to get raw HTML content
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        formats: ['markdown'],
        timeout: 30000
      }),
    });

    const data = await response.json();
    
    if (!data.success || !data.markdown) {
      console.log(`⚠️ No content extracted from ${url}`);
      return [];
    }

    // Extract Toolstation product URLs using regex
    // Toolstation product URLs: https://www.toolstation.com/product-name/pXXXXX
    const urlRegex = /https:\/\/www\.toolstation\.com\/[^\/\s"']+\/p\d+/g;
    const urls = data.markdown.match(urlRegex) || [];
    
    // Remove duplicates
    const uniqueUrls = [...new Set(urls)];
    
    console.log(`✅ Found ${uniqueUrls.length} unique product URLs`);
    return uniqueUrls.slice(0, 20); // Limit to 20 products per category
  } catch (error) {
    console.error(`❌ Error extracting URLs:`, error);
    return [];
  }
}

// Batch scrape products directly from category search URLs
async function batchScrapeProducts(
  categoryUrls: string[],
  category: string,
  firecrawlApiKey: string
): Promise<any[]> {
  if (!categoryUrls || categoryUrls.length === 0) {
    console.log(`⚠️ No category URLs to scrape for ${category}`);
    return [];
  }

  console.log(`🚀 Starting batch scrape for ${category} from ${categoryUrls.length} search URLs`);
  
  try {
    // Start batch scrape job
    const batchResponse = await fetch('https://api.firecrawl.dev/v2/batch/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        urls: categoryUrls,
        formats: [{
          type: 'json',
          extract: {
            schema: {
              type: "object",
              properties: {
                products: {
                  type: "array",
                  items: productDetailSchema
                }
              }
            },
            systemPrompt: `Extract ALL products from this search/listing page. For each product, extract: name, price, category, supplier, image URL, description, stock status, sale information, highlights, and product URL. Return an array of all products found on the page.`
          }
        }]
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
        
        // Transform results - flatten products from multiple search pages
        const allProducts: any[] = [];
        
        statusData.data.forEach((item: any) => {
          if (item.extract && item.extract.products && Array.isArray(item.extract.products)) {
            const pageProducts = item.extract.products.map((product: any, index: number) => ({
              id: Date.now() + index + allProducts.length,
              name: product.name || 'Unknown Product',
              category: product.category || category,
              price: product.price || '£0.00',
              supplier: product.supplier || (item.url?.includes('screwfix') ? 'Screwfix' : 'Toolstation'),
              image: product.image || '/placeholder.svg',
              stockStatus: product.stockStatus || 'In Stock',
              isOnSale: product.isOnSale || false,
              salePrice: product.salePrice,
              highlights: product.highlights || [],
              productUrl: product.productUrl || item.url,
              description: product.description,
              view_product_url: product.productUrl || item.url
            }));
            allProducts.push(...pageProducts);
          }
        });

        console.log(`📦 Extracted ${allProducts.length} total products from ${statusData.data.length} search pages for ${category}`);
        return allProducts;
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

// Scrape tools from category search URLs directly
async function scrapeCategory(
  categoryConfig: { name: string; searchTerm: string; urls: string[] },
  firecrawlApiKey: string
): Promise<{ category: string; products: any[]; success: boolean }> {
  console.log(`\n🎯 Starting category: ${categoryConfig.name}`);
  console.log(`🔗 Using ${categoryConfig.urls.length} search URLs`);
  
  // Direct batch scrape from category search URLs
  const products = await batchScrapeProducts(categoryConfig.urls, categoryConfig.name, firecrawlApiKey);
  
  console.log(`✅ ${categoryConfig.name}: ${products.length} products scraped`);
  return { category: categoryConfig.name, products, success: products.length > 0 };
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
    ...BATCH_1_CATEGORIES.map(c => c.name),
    ...BATCH_2_CATEGORIES.map(c => c.name),
    ...BATCH_3_CATEGORIES.map(c => c.name),
    ...BATCH_4_CATEGORIES.map(c => c.name)
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
    if (![1, 2, 3, 4].includes(batchNumber)) {
      throw new Error('Batch must be 1, 2, 3 or 4');
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

    // Process all categories in parallel for faster execution
    const allProducts = [];
    const categoryStats = {};
    
    const results = await Promise.all(
      batchCategories.map(config => scrapeCategory(config, firecrawlApiKey))
    );
    
    results.forEach(result => {
      if (result.success && result.products.length > 0) {
        allProducts.push(...result.products);
        categoryStats[result.category] = result.products.length;
      } else {
        categoryStats[result.category] = 0;
      }
    });

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
    
    const categoryNames = batchCategories.map(c => c.name);
    
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
