import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Supplier IDs from marketplace_suppliers table
const SUPPLIERS = {
  screwfix: '0f053b93-2f2b-4c36-8f3a-164b448573ce',
  toolstation: '8bf5c72e-31b6-42fa-81c3-8ed599e1b5ab',
  ffx: '004ddaef-0a8c-46f9-a455-7bd99c449f07',
  machineMart: 'ff978448-cd20-4cfb-85e3-9cd650be5615',
  rsComponents: '9435c0a3-1c89-4372-becb-a92f75145aa9',
};

// ========================================
// CATEGORY CONFIGURATION - FOCUSED ON MAIN UK SUPPLIERS
// Screwfix & Toolstation are the largest UK electrical tool suppliers
// Reduced config to complete within edge function timeout (150s)
// ========================================

const SCRAPE_CONFIGS = [
  // ========== SCREWFIX (UK's #1 trade supplier) ==========
  {
    supplier: 'screwfix',
    skuPrefix: 'SF',
    category: 'hand-tools',
    displayName: 'Screwfix Hand Tools',
    url: 'https://www.screwfix.com/c/tools/hand-tools/cat830582?page_size=100',
  },
  {
    supplier: 'screwfix',
    skuPrefix: 'SF',
    category: 'power-tools',
    displayName: 'Screwfix Power Tools',
    url: 'https://www.screwfix.com/c/tools/power-tools/cat830583?page_size=100',
  },
  {
    supplier: 'screwfix',
    skuPrefix: 'SF',
    category: 'test-equipment',
    displayName: 'Screwfix Test Equipment',
    url: 'https://www.screwfix.com/c/electrical-lighting/electrical-testers/cat6270007?page_size=100',
  },
  {
    supplier: 'screwfix',
    skuPrefix: 'SF',
    category: 'ppe',
    displayName: 'Screwfix PPE',
    url: 'https://www.screwfix.com/c/safety-workwear/ppe/cat830605?page_size=100',
  },
  {
    supplier: 'screwfix',
    skuPrefix: 'SF',
    category: 'tool-storage',
    displayName: 'Screwfix Tool Storage',
    url: 'https://www.screwfix.com/c/tools/tool-storage/cat830586?page_size=100',
  },

  // ========== TOOLSTATION (UK's #2 trade supplier) ==========
  {
    supplier: 'toolstation',
    skuPrefix: 'TS',
    category: 'hand-tools',
    displayName: 'Toolstation Hand Tools',
    url: 'https://www.toolstation.com/hand-tools/c795',
  },
  {
    supplier: 'toolstation',
    skuPrefix: 'TS',
    category: 'power-tools',
    displayName: 'Toolstation Power Tools',
    url: 'https://www.toolstation.com/power-tools/c790',
  },
  {
    supplier: 'toolstation',
    skuPrefix: 'TS',
    category: 'test-equipment',
    displayName: 'Toolstation Test Equipment',
    url: 'https://www.toolstation.com/electrical-testers/c1515',
  },
  {
    supplier: 'toolstation',
    skuPrefix: 'TS',
    category: 'ppe',
    displayName: 'Toolstation PPE',
    url: 'https://www.toolstation.com/ppe/c645',
  },
  {
    supplier: 'toolstation',
    skuPrefix: 'TS',
    category: 'tool-storage',
    displayName: 'Toolstation Tool Storage',
    url: 'https://www.toolstation.com/tool-storage/c800',
  },

  // ========== FFX (UK tool specialist) ==========
  {
    supplier: 'ffx',
    skuPrefix: 'FFX',
    category: 'hand-tools',
    displayName: 'FFX Hand Tools',
    url: 'https://www.ffx.co.uk/tools/hand-tools',
  },
  {
    supplier: 'ffx',
    skuPrefix: 'FFX',
    category: 'power-tools',
    displayName: 'FFX Power Tools',
    url: 'https://www.ffx.co.uk/tools/power-tools',
  },
  {
    supplier: 'ffx',
    skuPrefix: 'FFX',
    category: 'test-equipment',
    displayName: 'FFX Test Equipment',
    url: 'https://www.ffx.co.uk/tools/test-measure',
  },

  // ========== MACHINE MART (UK tool specialist) ==========
  {
    supplier: 'machineMart',
    skuPrefix: 'MM',
    category: 'hand-tools',
    displayName: 'Machine Mart Hand Tools',
    url: 'https://www.machinemart.co.uk/c/hand-tools/',
  },
  {
    supplier: 'machineMart',
    skuPrefix: 'MM',
    category: 'power-tools',
    displayName: 'Machine Mart Power Tools',
    url: 'https://www.machinemart.co.uk/c/power-tools/',
  },
  {
    supplier: 'machineMart',
    skuPrefix: 'MM',
    category: 'test-equipment',
    displayName: 'Machine Mart Test Equipment',
    url: 'https://www.machinemart.co.uk/c/test-and-measure/',
  },

  // ========== RS COMPONENTS (Professional test equipment) ==========
  {
    supplier: 'rsComponents',
    skuPrefix: 'RS',
    category: 'test-equipment',
    displayName: 'RS Components Test Equipment',
    url: 'https://uk.rs-online.com/web/c/test-measurement/',
  },
  {
    supplier: 'rsComponents',
    skuPrefix: 'RS',
    category: 'hand-tools',
    displayName: 'RS Components Hand Tools',
    url: 'https://uk.rs-online.com/web/c/tools/',
  },
];

// ========================================
// EXCLUSION FILTERS
// ========================================

// Products containing these keywords are NOT electrician tools
const EXCLUDE_KEYWORDS = [
  // Electronics/Entertainment
  'radio', 'speaker', 'bluetooth', 'dab', 'stereo', 'headphones', 'earbuds', 'earphones',
  'mp3', 'music player', 'usb charger', 'phone holder', 'tablet', 'camera', 'webcam',
  // Appliances
  'kettle', 'toaster', 'microwave', 'fridge', 'heater', 'fan', 'air con', 'dehumidifier',
  // Decorative
  'christmas lights', 'fairy lights', 'decoration', 'ornament',
  // Office
  'keyboard', 'mouse', 'monitor', 'printer', 'scanner',
];

// Navigation/junk text patterns
const JUNK_NAME_PATTERNS = [
  'all categories', 'a-z', 'browse', 'menu', 'navigation',
  'click here', 'see more', 'view all', 'load more', 'show more',
  'filter', 'sort by', 'results'
];

// ========================================
// VALIDATION FUNCTIONS
// ========================================

function isExcludedProduct(name: string): boolean {
  const nameLower = name.toLowerCase();
  return EXCLUDE_KEYWORDS.some(keyword => nameLower.includes(keyword.toLowerCase()));
}

function isJunkEntry(name: string): boolean {
  if (!name || name.length < 5) return true;
  const nameLower = name.toLowerCase();
  return JUNK_NAME_PATTERNS.some(pattern => nameLower.includes(pattern.toLowerCase()));
}

function isValidProduct(product: any): boolean {
  // Must have a name
  if (!product.name || typeof product.name !== 'string') return false;

  // Filter out junk navigation text
  if (isJunkEntry(product.name)) return false;

  // Filter out non-tool products
  if (isExcludedProduct(product.name)) return false;

  // Must have a valid price
  const price = parsePrice(product.price);
  if (!price || price <= 0) return false;

  return true;
}

function parsePrice(priceStr: string | number | null | undefined): number | null {
  if (priceStr === null || priceStr === undefined) return null;
  if (typeof priceStr === 'number') return priceStr;

  // Remove currency symbols and parse
  const cleaned = String(priceStr).replace(/[£$€,\s]/g, '');
  const parsed = parseFloat(cleaned);

  return isNaN(parsed) ? null : parsed;
}

function generateSku(name: string, url: string | null, prefix: string): string {
  if (url) {
    // Screwfix: /p/product-name/CODE (code is last segment, alphanumeric)
    // e.g., https://www.screwfix.com/p/milwaukee-tri-lobe-mixed-screwdriver-set-12-pieces/956jj
    const sfMatch = url.match(/screwfix\.com\/p\/[^\/]+\/([a-zA-Z0-9]+)(?:\?|$)/i);
    if (sfMatch) return sfMatch[1].toUpperCase(); // Return just the code, no prefix

    // Toolstation: /product-name/CODE
    // e.g., https://www.toolstation.com/stanley-fatmax-screwdriver-set/p12345
    const tsMatch = url.match(/toolstation\.com\/[^\/]+\/p(\d+)/i);
    if (tsMatch) return `TS-${tsMatch[1]}`;

    // Alternative Toolstation format
    const tsMatch2 = url.match(/toolstation.*\/(\d{5,})/);
    if (tsMatch2) return `TS-${tsMatch2[1]}`;
  }

  // Fallback: generate from name with prefix
  const slug = name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
  return `${prefix}-${slug}`;
}

// ========================================
// FIRECRAWL SCRAPING (Using Batch API like working materials scraper)
// ========================================

const productDetailSchema = {
  type: "object",
  properties: {
    name: { type: "string", description: "Complete product name" },
    brand: { type: "string", description: "Brand/manufacturer name (e.g., Makita, DeWalt, Bosch)" },
    price: { type: "string", description: "Current price with £ symbol" },
    regular_price: { type: "string", description: "Original price if on sale" },
    description: { type: "string", description: "Product description" },
    highlights: { type: "array", items: { type: "string" }, description: "Key features" },
    image: { type: "string", description: "Product image URL - prefer high resolution (400px+ wide), avoid thumbnail/small images. Look for data-src, data-zoom, or srcset attributes for larger versions" },
    product_url: { type: "string", description: "Direct URL to product page" },
    stock_status: { type: "string", enum: ["In Stock", "Low Stock", "Out of Stock"], description: "Stock availability" },
    product_code: { type: "string", description: "SKU or product code if visible" },
  }
};

// Batch scrape products from multiple URLs
async function batchScrapeProducts(urls: string[], category: string, supplier: string, skuPrefix: string, supplierId: string): Promise<any[]> {
  const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');

  if (!FIRECRAWL_API_KEY) {
    console.error('❌ FIRECRAWL_API_KEY not found');
    return [];
  }

  if (!urls || urls.length === 0) {
    console.log(`⚠️ No URLs to scrape for ${category}`);
    return [];
  }

  console.log(`🚀 Starting batch scrape for ${supplier} ${category} from ${urls.length} URLs`);

  try {
    // Use batch scrape API like the working materials scraper
    const batchResponse = await fetch("https://api.firecrawl.dev/v2/batch/scrape", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        urls: urls,
        onlyMainContent: true,  // Focus on product content - reduces processing
        maxAge: 86400000,       // 24hr cache - up to 5x faster for unchanged pages
        formats: [{
          type: "json",
          prompt: `Extract ALL product listings from this trade supplier page.
For each product extract:
- Product name (exact title, including brand and model)
- Current price in GBP (the main selling price shown)
- Original/regular price if on sale (RRP or crossed-out price)
- Product URL (direct link to product page)
- Image URL (main product image, prefer high resolution)
- Product code/SKU if visible
- Stock status (in stock, out of stock, available)
- Brand name if shown
- Key specifications/features

Focus on electrician tools and equipment:
- Test meters, multimeters, voltage testers, socket testers
- Hand tools (screwdrivers, pliers, cutters, strippers)
- Power tools (drills, grinders, saws)
- PPE (gloves, goggles, hard hats, hi-vis)
- Tool bags, cases, and storage

Skip unrelated products like home appliances, decorations, or entertainment items.`,
          schema: {
            type: "object",
            properties: {
              products: {
                type: "array",
                items: productDetailSchema,
              },
            },
          },
        }],
      }),
    });

    const batchData = await batchResponse.json();

    if (!batchData.success || !batchData.id) {
      console.error(`❌ Failed to start batch job for ${supplier} ${category}:`, batchData);
      return [];
    }

    const batchId = batchData.id;
    console.log(`📊 Batch job started: ${batchId}`);

    // Poll for results (max 180 seconds)
    let attempts = 0;
    const maxAttempts = 60;
    while (attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const statusResponse = await fetch(`https://api.firecrawl.dev/v2/batch/scrape/${batchId}`, {
        headers: { Authorization: `Bearer ${FIRECRAWL_API_KEY}` },
      });
      const statusData = await statusResponse.json();

      console.log(`📈 Batch status: ${statusData.status} (${statusData.completed || 0}/${statusData.total || 0})`);

      if (statusData.status === "completed") {
        console.log(`✅ Batch scrape completed for ${supplier} ${category}`);

        // Extract products from v2 API response format (same as working materials scraper)
        const rawProducts = statusData.data?.map((item: any) => item.json?.products || []).flat() || [];

        console.log(`📦 Got ${rawProducts.length} raw products for ${supplier} ${category}`);

        // Filter and transform products
        const validProducts = rawProducts
          .filter(isValidProduct)
          .map((product: any, index: number) => {
            const currentPrice = parsePrice(product.price);
            const regularPrice = parsePrice(product.regular_price);
            const isOnSale = regularPrice !== null && currentPrice !== null && regularPrice > currentPrice;
            const discountPercentage = isOnSale
              ? Math.round(((regularPrice! - currentPrice!) / regularPrice!) * 100)
              : null;

            const productUrl = product.product_url || urls[0];
            return {
              sku: generateSku(product.name, productUrl, skuPrefix),
              name: product.name.trim(),
              category: category,
              supplier_id: supplierId,
              current_price: currentPrice,
              regular_price: regularPrice,
              is_on_sale: isOnSale,
              discount_percentage: discountPercentage,
              image_url: product.image || null,
              product_url: productUrl,
              stock_status: product.stock_status || 'In Stock',
              brand: product.brand || null,
              highlights: Array.isArray(product.highlights) ? product.highlights : [],
              description: product.description || null,
              scraped_at: new Date().toISOString(),
            };
          });

        console.log(`✅ ${validProducts.length} valid products after filtering for ${supplier} ${category}`);
        return validProducts;
      }

      if (statusData.status === "failed") {
        console.error(`❌ Batch job failed for ${supplier} ${category}`);
        return [];
      }

      attempts++;
    }

    console.log(`⏱️ Batch job timed out for ${supplier} ${category}`);
    return [];

  } catch (error) {
    console.error(`⚠️ Error in batch scrape for ${supplier} ${category}:`, error);
    return [];
  }
}

// Group configs by supplier and scrape
async function scrapeSupplierCategories(supplierConfigs: typeof SCRAPE_CONFIGS): Promise<any[]> {
  const allProducts: any[] = [];

  // Group configs by supplier
  const supplierGroups: Record<string, typeof SCRAPE_CONFIGS> = {};
  for (const config of supplierConfigs) {
    if (!supplierGroups[config.supplier]) {
      supplierGroups[config.supplier] = [];
    }
    supplierGroups[config.supplier].push(config);
  }

  // Process each supplier
  for (const [supplier, configs] of Object.entries(supplierGroups)) {
    const supplierId = SUPPLIERS[supplier as keyof typeof SUPPLIERS];
    if (!supplierId) {
      console.error(`❌ Unknown supplier: ${supplier}`);
      continue;
    }

    // Group by category for this supplier
    const categoryGroups: Record<string, string[]> = {};
    const categoryPrefixes: Record<string, string> = {};

    for (const config of configs) {
      if (!categoryGroups[config.category]) {
        categoryGroups[config.category] = [];
        categoryPrefixes[config.category] = config.skuPrefix;
      }
      categoryGroups[config.category].push(config.url);
    }

    // Scrape each category for this supplier
    for (const [category, urls] of Object.entries(categoryGroups)) {
      console.log(`\n🎯 Scraping ${supplier} ${category} (${urls.length} URLs)...`);
      const products = await batchScrapeProducts(urls, category, supplier, categoryPrefixes[category], supplierId);
      allProducts.push(...products);

      // Rate limiting between supplier categories
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  return allProducts;
}

// ========================================
// DATABASE OPERATIONS
// ========================================

async function upsertProducts(products: any[]) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log(`💾 Upserting ${products.length} products to marketplace_products...`);

  // Log first product for debugging
  if (products.length > 0) {
    console.log(`📝 Sample product being upserted:`, JSON.stringify(products[0], null, 2));
  }

  // Upsert in batches of 100
  const batchSize = 100;
  let successCount = 0;
  let errors: string[] = [];

  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    console.log(`📦 Upserting batch ${i / batchSize + 1}: ${batch.length} products`);

    const { data, error } = await supabase
      .from('marketplace_products')
      .upsert(batch, {
        onConflict: 'supplier_id,sku',
        ignoreDuplicates: false
      })
      .select('id');

    if (error) {
      console.error(`❌ Batch upsert error:`, JSON.stringify(error));
      console.error(`❌ Error code: ${error.code}, message: ${error.message}, details: ${error.details}`);
      errors.push(`Batch ${i / batchSize + 1}: ${error.message}`);
    } else {
      const insertedCount = data?.length || 0;
      successCount += insertedCount;
      console.log(`✅ Batch ${i / batchSize + 1} success: ${insertedCount} rows affected`);
    }
  }

  if (errors.length > 0) {
    console.error(`⚠️ Total errors: ${errors.length}`, errors.join('; '));
  }

  console.log(`✅ Successfully upserted ${successCount}/${products.length} products`);
  return successCount;
}

// ========================================
// MAIN HANDLER
// ========================================

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🚀 Tools Marketplace Scraper started');
    console.log(`📋 Scraping ${SCRAPE_CONFIGS.length} categories from ${Object.keys(SUPPLIERS).length} suppliers`);

    // Use batch scrape like the working materials scraper
    const allProducts = await scrapeSupplierCategories(SCRAPE_CONFIGS);

    console.log(`📊 Total products scraped: ${allProducts.length}`);

    if (allProducts.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'No valid tools found from any source - batch scrape may have failed or sites may be blocking',
          productsCount: 0,
          suppliersAttempted: Object.keys(SUPPLIERS).length,
          categoriesAttempted: SCRAPE_CONFIGS.length
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Smart deduplication: supplier_id + sku, plus name normalization
    const uniqueProducts = new Map<string, any>();
    const normalizedNames = new Map<string, string>(); // Track normalized names to detect near-duplicates

    // Helper to normalize product names for comparison
    const normalizeName = (name: string): string => {
      return name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '') // Remove non-alphanumeric
        .replace(/\b(mm|cm|m|kg|g|ml|l|pcs|pc|pk|pack|set)\b/g, '') // Remove units
        .trim();
    };

    for (const product of allProducts) {
      const key = `${product.supplier_id}:${product.sku}`;
      const normalizedName = normalizeName(product.name);

      // Check if we already have this exact product
      if (uniqueProducts.has(key)) {
        const existing = uniqueProducts.get(key);
        // Keep the one with the lower price (better deal)
        if (product.current_price && existing.current_price && product.current_price < existing.current_price) {
          uniqueProducts.set(key, product);
          console.log(`💰 Keeping better price for ${product.name}: £${product.current_price} vs £${existing.current_price}`);
        }
        continue;
      }

      // Check for near-duplicate names within same supplier and category
      const categoryKey = `${product.supplier_id}:${product.category}:${normalizedName}`;
      if (normalizedNames.has(categoryKey)) {
        const existingKey = normalizedNames.get(categoryKey)!;
        const existing = uniqueProducts.get(existingKey);
        if (existing) {
          // Keep the one with better price
          if (product.current_price && existing.current_price && product.current_price < existing.current_price) {
            uniqueProducts.delete(existingKey);
            uniqueProducts.set(key, product);
            normalizedNames.set(categoryKey, key);
            console.log(`🔄 Replaced near-duplicate: ${existing.name} with ${product.name} (better price)`);
          }
          continue;
        }
      }

      uniqueProducts.set(key, product);
      normalizedNames.set(categoryKey, key);
    }

    const deduplicatedProducts = Array.from(uniqueProducts.values());
    console.log(`📊 After smart deduplication: ${deduplicatedProducts.length} unique products (removed ${allProducts.length - deduplicatedProducts.length} duplicates)`);

    // Save to database
    const savedCount = await upsertProducts(deduplicatedProducts);

    // Summary by supplier
    const supplierSummary = Object.keys(SUPPLIERS).map(supplier => ({
      supplier,
      count: allProducts.filter(p => p.supplier_id === SUPPLIERS[supplier as keyof typeof SUPPLIERS]).length
    }));

    // Summary by category
    const categorySummary = ['hand-tools', 'power-tools', 'test-equipment', 'ppe', 'tool-storage'].map(cat => ({
      category: cat,
      count: allProducts.filter(p => p.category === cat).length
    }));

    console.log('📈 Supplier breakdown:', supplierSummary);
    console.log('📈 Category breakdown:', categorySummary);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully scraped and saved ${savedCount} tools from ${Object.keys(SUPPLIERS).length} suppliers`,
        productsCount: savedCount,
        totalScraped: allProducts.length,
        suppliers: supplierSummary,
        categories: categorySummary
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Error in tools-marketplace-scraper:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to scrape tools',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
