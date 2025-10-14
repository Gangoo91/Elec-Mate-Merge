import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Category configuration with specific category listing pages
const BATCH_1_CATEGORIES = [
  {
    name: "Cables & Wiring",
    urls: [
      "https://www.screwfix.com/c/electrical-lighting/cable/cat8960001?page_size=100",
      "https://www.toolstation.com/electrical-supplies-accessories/cables-flexes/c1118",
      "https://www.toolstation.com/electrical-supplies-accessories/cables-flexes/c1118?page=2",
      "https://www.toolstation.com/electrical-supplies-accessories/cables-flexes/c1118?page=3",
    ],
  },
];

const BATCH_2_CATEGORIES = [
  {
    name: "Fixings & Consumables",
    urls: [
      "https://www.toolstation.com/search?q=Fixings+&+Consumables=null",
      "https://www.screwfix.com/c/electrical-lighting/consumer-unit-accessories/cat8030002?page_size=100",
    ],
  },
];

const BATCH_3_CATEGORIES = [
  {
    name: "Electrical Components",
    urls: [
      "https://www.screwfix.com/c/electrical-lighting/consumer-units/cat7230028?page_size=100",
      "https://www.screwfix.com/c/electrical-lighting/mcbs/cat7230022?page_size=100",
      "https://www.screwfix.com/c/electrical-lighting/rcds-rccbs/cat7230026?page_size=100",
      "https://www.screwfix.com/c/electrical-lighting/isolation-switches/cat1930006?page_size=100",
      "https://www.toolstation.com/electrical-supplies-accessories/power-distribution/c662",
      "https://www.toolstation.com/electrical-supplies-accessories/power-distribution/c662?page=2",
    ],
  },
];

const BATCH_4_CATEGORIES = [
  {
    name: "Installation Accessories",
    urls: [
      "https://www.screwfix.com/c/electrical-lighting/junction-boxes/cat830522?page_size=100",
      "https://www.screwfix.com/c/electrical-lighting/glands-grommets/cat830484?page_size=100",
      "https://www.screwfix.com/c/electrical-lighting/cable-trunking/cat1910006?page_size=100",
      "https://www.toolstation.com/electrical-supplies-accessories/junction-boxes/c338",
      "https://www.toolstation.com/electrical-supplies-accessories/mini-trunking/c974",
      "https://www.toolstation.com/search?q=glands",
    ],
  },
];

const BATCH_5_CATEGORIES = [
  {
    name: "Cable Management & Conduit",
    urls: [
      "https://www.screwfix.com/search?search=Trunking%2C+conduit%2C+cable+trays+and+management+systems&page_size=100",
      "https://www.toolstation.com/search?q=Trunking%2C+conduit%2C+cable+trays+and+management+systems",
    ],
  },
];

const BATCH_6_CATEGORIES = [
  {
    name: "Protection Equipment",
    urls: [
      "https://www.screwfix.com/search?search=Earth+rods%2C+surge+protectors+and+circuit+breakers&page_size=100",
      "https://www.toolstation.com/search?q=Earth+rods%2C+surge+protectors+and+circuit+breakers",
    ],
  },
];

const BATCH_7_CATEGORIES = [
  {
    name: "Lighting Solutions",
    urls: [
      "https://www.screwfix.com/search?search=LED+downlights%2C+battens+and+emergency+lighting&page_size=100",
      "https://www.toolstation.com/search?q=LED+downlights%2C+battens+and+emergency+lighting",
    ],
  },
];

const BATCH_8_CATEGORIES = [
  {
    name: "Smart Home & Controls",
    urls: [
      "https://www.toolstation.com/search?q=Smart+switches%2C+dimmers%2C+automation+and+control+systems",
      "https://www.screwfix.com/search?search=Smart+switches%2C+dimmers%2C+automation+and+control+systems&page_size=100",
    ],
  },
];

// No longer using extraction schema - using markdown + regex instead

// Schema for product details (for Firecrawl batch)
const productDetailSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    brand: {
      type: "string",
      description: "Brand/manufacturer name (e.g., Makita, DeWalt, Bosch, Hilti, Bahco, Wiha, Wera)",
    },
    price: {
      type: "string",
      description: "Current price in GBP",
    },
    description: {
      type: "string",
    },
    category: {
      type: "string",
      description: "Product category (e.g., Hand Tools, Power Tools, PPE etc...)",
    },
    supplier: {
      type: "string",
      description: "Supplier name (Screwfix or Toolstation)",
    },
    productType: {
      type: "string",
    },
    image: {
      type: "string",
      description: "URL of the product image",
    },
    view_product_url: {
      type: "string",
      description: "Direct URL to the product page",
    },
    highlights: {
      type: "array",
      items: { type: "string" },
      description: "Key features or highlights",
    },
    stockStatus: {
      type: "string",
      enum: ["In Stock", "Low Stock", "Out of Stock"],
      description: "Stock availability status",
    },
  },
};

const getBatchCategories = (batchNumber: number) => {
  switch (batchNumber) {
    case 1:
      return BATCH_1_CATEGORIES;
    case 2:
      return BATCH_2_CATEGORIES;
    case 3:
      return BATCH_3_CATEGORIES;
    case 4:
      return BATCH_4_CATEGORIES;
    case 5:
      return BATCH_5_CATEGORIES;
    case 6:
      return BATCH_6_CATEGORIES;
    case 7:
      return BATCH_7_CATEGORIES;
    case 8:
      return BATCH_8_CATEGORIES;
    default:
      return BATCH_1_CATEGORIES;
  }
};

// Batch scrape products from category listing URLs
async function batchScrapeProducts(categoryUrls: string[], category: string, firecrawlApiKey: string): Promise<any[]> {
  if (!categoryUrls || categoryUrls.length === 0) {
    console.log(`⚠️ No category URLs to scrape for ${category}`);
    return [];
  }

  console.log(`🚀 Starting batch scrape for ${category} from ${categoryUrls.length} listing URLs`);

  try {
    const batchResponse = await fetch("https://api.firecrawl.dev/v2/batch/scrape", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${firecrawlApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        urls: categoryUrls,
        formats: [
          {
            type: "json",
            schema: {
              type: "object",
              properties: {
                products: {
                  type: "array",
                  items: productDetailSchema,
                },
              },
            },
          },
        ],
      }),
    });

    const batchData = await batchResponse.json();

    if (!batchData.success || !batchData.id) {
      console.error("❌ Failed to start batch job:", batchData);
      return [];
    }

    const batchId = batchData.id;
    console.log(`📊 Batch job started: ${batchId}`);

    // Poll results (max 180 seconds for slower batches)
    let attempts = 0;
    const maxAttempts = 60;
    while (attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const statusResponse = await fetch(`https://api.firecrawl.dev/v2/batch/scrape/${batchId}`, {
        headers: { Authorization: `Bearer ${firecrawlApiKey}` },
      });
      const statusData = await statusResponse.json();

      console.log(`📈 Batch status: ${statusData.status} (${statusData.completed || 0}/${statusData.total || 0})`);

      if (statusData.status === "completed") {
        console.log(`✅ Batch scrape completed for ${category}`);

        // Extract products from v2 API response format
        const allProducts = statusData.data?.map((item: any) => item.json?.products || []).flat() || [];

        // Transform products to match expected format
        const transformedProducts = allProducts.map((product: any, index: number) => ({
          id: Date.now() + index,
          name: product.name || "Unknown Product",
          brand: product.brand,
          category: category, // Always use configured category (e.g., "Hand Tools") not scraped subcategory
          price: product.price || "£0.00",
          supplier: product.supplier || "Unknown",
          image: product.image || "/placeholder.svg",
          stockStatus: product.stockStatus || "In Stock",
          highlights: product.highlights || [],
          productUrl: product.view_product_url,
          view_product_url: product.view_product_url,
          description: product.description,
          productType: product.productType,
        }));

        console.log(`📦 Extracted ${transformedProducts.length} total products for ${category}`);
        return transformedProducts;
      }

      if (statusData.status === "failed") {
        console.error(`❌ Batch job failed for ${category}`);
        return [];
      }

      attempts++;
    }

    console.log(`⏱️ Batch job timed out for ${category}`);
    return [];
  } catch (error) {
    console.error("❌ Error in batch scrape:", error);
    return [];
  }
}

// Scrape one category
async function scrapeCategory(
  categoryConfig: { name: string; urls: string[] },
  firecrawlApiKey: string,
): Promise<{ category: string; products: any[]; success: boolean }> {
  console.log(`\n🎯 Starting category: ${categoryConfig.name}`);
  console.log(`🔗 Using ${categoryConfig.urls.length} listing URLs`);

  const products = await batchScrapeProducts(categoryConfig.urls, categoryConfig.name, firecrawlApiKey);

  console.log(`✅ ${categoryConfig.name}: ${products.length} products scraped`);
  return { category: categoryConfig.name, products: products || [], success: products.length > 0 };
}

const checkExistingBatch = async (supabase: any, batchNumber: number) => {
  const { data, error } = await supabase
    .from("tools_weekly_cache")
    .select("*")
    .eq("category", `batch_${batchNumber}`)
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (!error && data) {
    console.log(`✅ Found cached batch ${batchNumber} (${data.total_products} products)`);
    return data;
  }

  return null;
};

const mergeAllBatches = async (supabase: any) => {
  console.log("🔄 [MERGE] Starting merge of all category batches...");

  const allCategoryNames = [
    ...BATCH_1_CATEGORIES.map((c) => c.name),
    ...BATCH_2_CATEGORIES.map((c) => c.name),
    ...BATCH_3_CATEGORIES.map((c) => c.name),
    ...BATCH_4_CATEGORIES.map((c) => c.name),
    ...BATCH_5_CATEGORIES.map((c) => c.name),
    ...BATCH_6_CATEGORIES.map((c) => c.name),
    ...BATCH_7_CATEGORIES.map((c) => c.name),
    ...BATCH_8_CATEGORIES.map((c) => c.name),
  ];

  console.log(`📦 [MERGE] Looking for ${allCategoryNames.length} categories:`, allCategoryNames);

  const allTools = [];
  const successfulCategories = [];
  const failedCategories = [];

  for (const categoryName of allCategoryNames) {
    const { data, error } = await supabase
      .from("tools_weekly_cache")
      .select("*")
      .eq("category", categoryName)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
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
  console.log(
    `📊 [MERGE] Complete: ${totalProducts} total products from ${successfulCategories.length}/${allCategoryNames.length} categories`,
  );

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
    allCategoriesComplete: failedCategories.length === 0,
  };
};

serve(async (req) => {
  console.log("🔧 [BATCH-SCRAPER] Request received");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { batch, forceRefresh, mergeAll } = body;

    const firecrawlApiKey = Deno.env.get("FIRECRAWL_API_KEY");
    if (!firecrawlApiKey) {
      throw new Error("FIRECRAWL_API_KEY missing");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Handle merge request
    if (mergeAll) {
      console.log("📦 [MERGE-REQUEST] Combining all category batches...");
      const merged = await mergeAllBatches(supabase);

      return new Response(
        JSON.stringify({
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
            : "No categories found - data may not be scraped yet",
          mode: "merge",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Validate batch number
    const batchNumber = batch || 1;
    if (![1, 2, 3, 4, 5, 6, 7, 8].includes(batchNumber)) {
      throw new Error("Batch must be 1, 2, 3, 4, 5, 6, 7 or 8");
    }

    console.log(`📊 Processing Batch ${batchNumber}`);

    // Check cache unless force refresh
    if (!forceRefresh) {
      const cachedBatch = await checkExistingBatch(supabase, batchNumber);
      if (cachedBatch) {
        return new Response(
          JSON.stringify({
            success: true,
            tools: cachedBatch.tools_data,
            totalFound: cachedBatch.total_products,
            batch: batchNumber,
            cached: true,
            message: `Returned cached batch ${batchNumber}`,
            expiresAt: cachedBatch.expires_at,
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
    }

    // Scrape batch using two-phase batch approach
    const batchCategories = getBatchCategories(batchNumber);

    console.log(`🚀 Scraping ${Object.keys(batchCategories).length} categories using batch scrape...`);
    const startTime = Date.now();

    // Process all categories in parallel for faster execution
    const allProducts = [];
    const categoryStats = {};

    const results = await Promise.all(batchCategories.map((config) => scrapeCategory(config, firecrawlApiKey)));

    results.forEach((result) => {
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

      return new Response(
        JSON.stringify({
          success: false,
          tools: [],
          totalFound: 0,
          batch: batchNumber,
          categoryStats,
          message: `Batch ${batchNumber} found no products`,
          elapsedTime: `${elapsedTime}s`,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Store batch results by category name
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const categoryNames = batchCategories.map((c) => c.name);

    console.log(`💾 [BATCH-${batchNumber}] Storing products by category...`);

    // Group products by their configured category name (not extracted category)
    const productsByConfigCategory = {};

    results.forEach((result) => {
      if (result.success && result.products.length > 0) {
        productsByConfigCategory[result.category] = result.products;
      }
    });

    // Store each category separately
    for (const categoryName of categoryNames) {
      const categoryProducts = productsByConfigCategory[categoryName] || [];

      if (categoryProducts.length === 0) {
        console.warn(`⚠️ [BATCH-${batchNumber}] No products found for category: ${categoryName}`);
        continue;
      }

      // Delete old category data
      await supabase.from("materials_weekly_cache").delete().eq("category", categoryName);

      // Insert new category data
      const { error: storeError } = await supabase.from("materials_weekly_cache").insert({
        materials_data: categoryProducts,
        total_products: categoryProducts.length,
        category: categoryName,
        source: "comprehensive-scraper",
        expires_at: expiresAt.toISOString(),
        update_status: "completed",
      });

      if (storeError) {
        console.error(`❌ [BATCH-${batchNumber}] Storage error for ${categoryName}:`, storeError);
      } else {
        console.log(
          `✅ [BATCH-${batchNumber}] Stored ${categoryProducts.length} products in category: ${categoryName}`,
        );
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        tools: allProducts,
        totalFound: totalProducts,
        batch: batchNumber,
        categoryStats,
        categoriesScraped: categoryNames,
        productsByCategory: productsByConfigCategory,
        message: `Batch ${batchNumber}: ${totalProducts} products scraped and stored by category using batch scrape method`,
        elapsedTime: `${elapsedTime}s`,
        cached: false,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("❌ Fatal error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        tools: [],
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
