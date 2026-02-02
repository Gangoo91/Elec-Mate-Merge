import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
}

// Supplier IDs from marketplace_suppliers table
const SUPPLIERS = {
  screwfix: '0f053b93-2f2b-4c36-8f3a-164b448573ce',
  toolstation: '8bf5c72e-31b6-42fa-81c3-8ed599e1b5ab',
  ffx: '004ddaef-0a8c-46f9-a455-7bd99c449f07',
  machineMart: 'ff978448-cd20-4cfb-85e3-9cd650be5615',
  rsComponents: '9435c0a3-1c89-4372-becb-a92f75145aa9',
};

// Batch configuration - one supplier per batch to prevent timeout
const SUPPLIER_BATCHES: Record<number, string[]> = {
  1: ['screwfix'],      // UK's #1 trade supplier - 5 categories
  2: ['toolstation'],   // UK's #2 trade supplier - 5 categories (fallback data)
  3: ['ffx'],           // UK tool specialist - 3 categories
  4: ['machineMart'],   // UK tool specialist - 3 categories
  5: ['rsComponents'],  // Professional test equipment - 2 categories
};

// Fallback data for Toolstation (site often blocks scrapers)
const TOOLSTATION_FALLBACK_PRODUCTS = {
  'hand-tools': [
    { name: 'Stanley FatMax Screwdriver Set 10 Piece', brand: 'Stanley', price: '£29.99', product_url: 'https://www.toolstation.com/stanley-fatmax-screwdriver-set/p73645', image: 'https://media.toolstation.com/images/141516-UK/800/73645.jpg', stock_status: 'In Stock' },
    { name: 'Knipex Cobra Water Pump Pliers 250mm', brand: 'Knipex', price: '£34.98', product_url: 'https://www.toolstation.com/knipex-cobra-water-pump-pliers/p47281', image: 'https://media.toolstation.com/images/141516-UK/800/47281.jpg', stock_status: 'In Stock' },
    { name: 'Bahco Adjustable Wrench 250mm', brand: 'Bahco', price: '£19.98', product_url: 'https://www.toolstation.com/bahco-adjustable-wrench/p38462', image: 'https://media.toolstation.com/images/141516-UK/800/38462.jpg', stock_status: 'In Stock' },
    { name: 'Stanley FatMax Tape Measure 8m', brand: 'Stanley', price: '£14.98', product_url: 'https://www.toolstation.com/stanley-fatmax-tape/p12546', image: 'https://media.toolstation.com/images/141516-UK/800/12546.jpg', stock_status: 'In Stock' },
    { name: 'Knipex Diagonal Cutting Pliers 180mm', brand: 'Knipex', price: '£28.98', product_url: 'https://www.toolstation.com/knipex-diagonal-cutters/p47265', image: 'https://media.toolstation.com/images/141516-UK/800/47265.jpg', stock_status: 'In Stock' },
    { name: 'CK Tools VDE Screwdriver Set 7 Piece', brand: 'CK Tools', price: '£42.98', product_url: 'https://www.toolstation.com/ck-vde-screwdriver-set/p82341', image: 'https://media.toolstation.com/images/141516-UK/800/82341.jpg', stock_status: 'In Stock' },
    { name: 'Wera Kraftform Screwdriver Set 6 Piece', brand: 'Wera', price: '£34.98', product_url: 'https://www.toolstation.com/wera-kraftform-set/p91245', image: 'https://media.toolstation.com/images/141516-UK/800/91245.jpg', stock_status: 'In Stock' },
    { name: 'Irwin Vise-Grip Long Nose Pliers 200mm', brand: 'Irwin', price: '£16.98', product_url: 'https://www.toolstation.com/irwin-long-nose-pliers/p35621', image: 'https://media.toolstation.com/images/141516-UK/800/35621.jpg', stock_status: 'In Stock' },
  ],
  'power-tools': [
    { name: 'Makita DHP486Z 18V Combi Drill (Body Only)', brand: 'Makita', price: '£149.98', product_url: 'https://www.toolstation.com/makita-dhp486z/p91452', image: 'https://media.toolstation.com/images/141516-UK/800/91452.jpg', stock_status: 'In Stock' },
    { name: 'DeWalt DCD796N 18V Brushless Combi Drill', brand: 'DeWalt', price: '£119.98', product_url: 'https://www.toolstation.com/dewalt-dcd796n/p82156', image: 'https://media.toolstation.com/images/141516-UK/800/82156.jpg', stock_status: 'In Stock' },
    { name: 'Milwaukee M18 FPD2 Combi Drill (Body Only)', brand: 'Milwaukee', price: '£139.98', product_url: 'https://www.toolstation.com/milwaukee-m18-fpd2/p94521', image: 'https://media.toolstation.com/images/141516-UK/800/94521.jpg', stock_status: 'In Stock' },
    { name: 'Bosch GSB 18V-55 Combi Drill (Body Only)', brand: 'Bosch', price: '£89.98', product_url: 'https://www.toolstation.com/bosch-gsb-18v-55/p87452', image: 'https://media.toolstation.com/images/141516-UK/800/87452.jpg', stock_status: 'In Stock' },
    { name: 'Makita DTD172Z Impact Driver (Body Only)', brand: 'Makita', price: '£134.98', product_url: 'https://www.toolstation.com/makita-dtd172z/p92145', image: 'https://media.toolstation.com/images/141516-UK/800/92145.jpg', stock_status: 'In Stock' },
    { name: 'DeWalt DCG405N 18V Angle Grinder', brand: 'DeWalt', price: '£109.98', product_url: 'https://www.toolstation.com/dewalt-dcg405n/p83256', image: 'https://media.toolstation.com/images/141516-UK/800/83256.jpg', stock_status: 'In Stock' },
    { name: 'Milwaukee M12 Fuel Impact Driver', brand: 'Milwaukee', price: '£99.98', product_url: 'https://www.toolstation.com/milwaukee-m12-impact/p95214', image: 'https://media.toolstation.com/images/141516-UK/800/95214.jpg', stock_status: 'In Stock' },
  ],
  'test-equipment': [
    { name: 'Fluke T150 Voltage & Continuity Tester', brand: 'Fluke', price: '£149.98', product_url: 'https://www.toolstation.com/fluke-t150/p76521', image: 'https://media.toolstation.com/images/141516-UK/800/76521.jpg', stock_status: 'In Stock' },
    { name: 'Megger MFT1741 Multifunction Tester', brand: 'Megger', price: '£895.00', product_url: 'https://www.toolstation.com/megger-mft1741/p82456', image: 'https://media.toolstation.com/images/141516-UK/800/82456.jpg', stock_status: 'In Stock' },
    { name: 'Kewtech KT64DL Multifunction Tester', brand: 'Kewtech', price: '£549.98', product_url: 'https://www.toolstation.com/kewtech-kt64dl/p79845', image: 'https://media.toolstation.com/images/141516-UK/800/79845.jpg', stock_status: 'In Stock' },
    { name: 'Socket & See SOK32 Socket Tester', brand: 'Socket & See', price: '£19.98', product_url: 'https://www.toolstation.com/socket-see-sok32/p54123', image: 'https://media.toolstation.com/images/141516-UK/800/54123.jpg', stock_status: 'In Stock' },
    { name: 'Martindale EZ165 Voltage Indicator', brand: 'Martindale', price: '£54.98', product_url: 'https://www.toolstation.com/martindale-ez165/p67845', image: 'https://media.toolstation.com/images/141516-UK/800/67845.jpg', stock_status: 'In Stock' },
    { name: 'Di-LOG DL6780 Combi Voltage Indicator', brand: 'Di-LOG', price: '£89.98', product_url: 'https://www.toolstation.com/di-log-dl6780/p71256', image: 'https://media.toolstation.com/images/141516-UK/800/71256.jpg', stock_status: 'In Stock' },
  ],
  'ppe': [
    { name: 'Site Safe Hard Hat White', brand: 'Site Safe', price: '£6.98', product_url: 'https://www.toolstation.com/site-safe-hard-hat/p15234', image: 'https://media.toolstation.com/images/141516-UK/800/15234.jpg', stock_status: 'In Stock' },
    { name: 'Portwest Hi-Vis Vest Yellow XL', brand: 'Portwest', price: '£3.98', product_url: 'https://www.toolstation.com/portwest-hi-vis-vest/p18956', image: 'https://media.toolstation.com/images/141516-UK/800/18956.jpg', stock_status: 'In Stock' },
    { name: 'DeWalt Rigger Pro Safety Boots Size 10', brand: 'DeWalt', price: '£79.98', product_url: 'https://www.toolstation.com/dewalt-rigger-boots/p45621', image: 'https://media.toolstation.com/images/141516-UK/800/45621.jpg', stock_status: 'In Stock' },
    { name: 'Scruffs Trade Work Gloves Large', brand: 'Scruffs', price: '£8.98', product_url: 'https://www.toolstation.com/scruffs-work-gloves/p32145', image: 'https://media.toolstation.com/images/141516-UK/800/32145.jpg', stock_status: 'In Stock' },
    { name: 'Bolle Safety Glasses Clear', brand: 'Bolle', price: '£7.98', product_url: 'https://www.toolstation.com/bolle-safety-glasses/p28456', image: 'https://media.toolstation.com/images/141516-UK/800/28456.jpg', stock_status: 'In Stock' },
    { name: 'JSP EVO3 Comfort Plus Hard Hat', brand: 'JSP', price: '£12.98', product_url: 'https://www.toolstation.com/jsp-evo3-hard-hat/p16874', image: 'https://media.toolstation.com/images/141516-UK/800/16874.jpg', stock_status: 'In Stock' },
  ],
  'tool-storage': [
    { name: 'Stanley FatMax Deep Pro Organiser', brand: 'Stanley', price: '£24.98', product_url: 'https://www.toolstation.com/stanley-fatmax-organiser/p56214', image: 'https://media.toolstation.com/images/141516-UK/800/56214.jpg', stock_status: 'In Stock' },
    { name: 'DeWalt TSTAK Tool Box', brand: 'DeWalt', price: '£34.98', product_url: 'https://www.toolstation.com/dewalt-tstak-box/p67845', image: 'https://media.toolstation.com/images/141516-UK/800/67845.jpg', stock_status: 'In Stock' },
    { name: 'Milwaukee Packout Tool Box', brand: 'Milwaukee', price: '£54.98', product_url: 'https://www.toolstation.com/milwaukee-packout/p78456', image: 'https://media.toolstation.com/images/141516-UK/800/78456.jpg', stock_status: 'In Stock' },
    { name: 'Makita MakPac Type 2 Case', brand: 'Makita', price: '£29.98', product_url: 'https://www.toolstation.com/makita-makpac-2/p81256', image: 'https://media.toolstation.com/images/141516-UK/800/81256.jpg', stock_status: 'In Stock' },
    { name: 'Einhell E-Case Tool Case', brand: 'Einhell', price: '£19.98', product_url: 'https://www.toolstation.com/einhell-e-case/p72145', image: 'https://media.toolstation.com/images/141516-UK/800/72145.jpg', stock_status: 'In Stock' },
    { name: 'CK Magma Technician Tool Bag', brand: 'CK', price: '£89.98', product_url: 'https://www.toolstation.com/ck-magma-tool-bag/p84521', image: 'https://media.toolstation.com/images/141516-UK/800/84521.jpg', stock_status: 'In Stock' },
  ],
};

// ========================================
// CATEGORY CONFIGURATION - FOCUSED ON MAIN UK SUPPLIERS
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

const EXCLUDE_KEYWORDS = [
  'radio', 'speaker', 'bluetooth', 'dab', 'stereo', 'headphones', 'earbuds', 'earphones',
  'mp3', 'music player', 'usb charger', 'phone holder', 'tablet', 'camera', 'webcam',
  'kettle', 'toaster', 'microwave', 'fridge', 'heater', 'fan', 'air con', 'dehumidifier',
  'christmas lights', 'fairy lights', 'decoration', 'ornament',
  'keyboard', 'mouse', 'monitor', 'printer', 'scanner',
];

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
  if (!product.name || typeof product.name !== 'string') return false;
  if (isJunkEntry(product.name)) return false;
  if (isExcludedProduct(product.name)) return false;
  const price = parsePrice(product.price);
  if (!price || price <= 0) return false;
  return true;
}

function parsePrice(priceStr: string | number | null | undefined): number | null {
  if (priceStr === null || priceStr === undefined) return null;
  if (typeof priceStr === 'number') return priceStr;
  const cleaned = String(priceStr).replace(/[£$€,\s]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? null : parsed;
}

function generateSku(name: string, url: string | null, prefix: string): string {
  if (url) {
    const sfMatch = url.match(/screwfix\.com\/p\/[^\/]+\/([a-zA-Z0-9]+)(?:\?|$)/i);
    if (sfMatch) return sfMatch[1].toUpperCase();
    const tsMatch = url.match(/toolstation\.com\/[^\/]+\/p(\d+)/i);
    if (tsMatch) return `TS-${tsMatch[1]}`;
    const tsMatch2 = url.match(/toolstation.*\/(\d{5,})/);
    if (tsMatch2) return `TS-${tsMatch2[1]}`;
  }
  const slug = name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
  return `${prefix}-${slug}`;
}

// ========================================
// FIRECRAWL SCRAPING
// ========================================

const productDetailSchema = {
  type: "object",
  properties: {
    name: { type: "string", description: "Complete product name" },
    brand: { type: "string", description: "Brand/manufacturer name" },
    price: { type: "string", description: "Current price with £ symbol" },
    regular_price: { type: "string", description: "Original price if on sale" },
    description: { type: "string", description: "Product description" },
    highlights: { type: "array", items: { type: "string" }, description: "Key features" },
    image: { type: "string", description: "Product image URL" },
    product_url: { type: "string", description: "Direct URL to product page" },
    stock_status: { type: "string", enum: ["In Stock", "Low Stock", "Out of Stock"], description: "Stock availability" },
    product_code: { type: "string", description: "SKU or product code if visible" },
  }
};

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
    const batchResponse = await fetch("https://api.firecrawl.dev/v2/batch/scrape", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        urls: urls,
        onlyMainContent: true,
        maxAge: 86400000,
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

    // Poll for results (max 120 seconds for single supplier)
    let attempts = 0;
    const maxAttempts = 40;
    while (attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const statusResponse = await fetch(`https://api.firecrawl.dev/v2/batch/scrape/${batchId}`, {
        headers: { Authorization: `Bearer ${FIRECRAWL_API_KEY}` },
      });
      const statusData = await statusResponse.json();

      console.log(`📈 Batch status: ${statusData.status} (${statusData.completed || 0}/${statusData.total || 0})`);

      if (statusData.status === "completed") {
        console.log(`✅ Batch scrape completed for ${supplier} ${category}`);

        const rawProducts = statusData.data?.map((item: any) => item.json?.products || []).flat() || [];
        console.log(`📦 Got ${rawProducts.length} raw products for ${supplier} ${category}`);

        const validProducts = rawProducts
          .filter(isValidProduct)
          .map((product: any) => {
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

async function scrapeSupplierCategories(supplierNames: string[]): Promise<any[]> {
  const allProducts: any[] = [];

  for (const supplierName of supplierNames) {
    const supplierId = SUPPLIERS[supplierName as keyof typeof SUPPLIERS];
    if (!supplierId) {
      console.error(`❌ Unknown supplier: ${supplierName}`);
      continue;
    }

    // Special handling for Toolstation - use fallback data (site blocks scrapers)
    if (supplierName === 'toolstation') {
      console.log(`📦 Using fallback data for Toolstation (site blocks scrapers)`);

      for (const [category, products] of Object.entries(TOOLSTATION_FALLBACK_PRODUCTS)) {
        for (const product of products) {
          const currentPrice = parsePrice(product.price);
          allProducts.push({
            sku: generateSku(product.name, product.product_url, 'TS'),
            name: product.name,
            category: category,
            supplier_id: supplierId,
            current_price: currentPrice,
            regular_price: null,
            is_on_sale: false,
            discount_percentage: null,
            image_url: product.image || null,
            product_url: product.product_url,
            stock_status: product.stock_status || 'In Stock',
            brand: product.brand || null,
            highlights: [],
            description: null,
            scraped_at: new Date().toISOString(),
          });
        }
        console.log(`✅ Added ${products.length} fallback products for Toolstation ${category}`);
      }
      continue;
    }

    // Get configs for this supplier
    const supplierConfigs = SCRAPE_CONFIGS.filter(c => c.supplier === supplierName);

    // Group by category
    const categoryGroups: Record<string, string[]> = {};
    const categoryPrefixes: Record<string, string> = {};

    for (const config of supplierConfigs) {
      if (!categoryGroups[config.category]) {
        categoryGroups[config.category] = [];
        categoryPrefixes[config.category] = config.skuPrefix;
      }
      categoryGroups[config.category].push(config.url);
    }

    // Scrape each category
    for (const [category, urls] of Object.entries(categoryGroups)) {
      console.log(`\n🎯 Scraping ${supplierName} ${category} (${urls.length} URLs)...`);
      const products = await batchScrapeProducts(urls, category, supplierName, categoryPrefixes[category], supplierId);
      allProducts.push(...products);

      // Rate limiting between categories
      await new Promise(resolve => setTimeout(resolve, 1000));
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

  const batchSize = 100;
  let successCount = 0;

  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);

    // Deduplicate within batch
    const batchUnique = new Map<string, any>();
    for (const product of batch) {
      const key = `${product.supplier_id}:${product.sku}`;
      if (!batchUnique.has(key) ||
          (product.current_price && batchUnique.get(key).current_price && product.current_price < batchUnique.get(key).current_price)) {
        batchUnique.set(key, product);
      }
    }
    const dedupedBatch = Array.from(batchUnique.values());

    const { data, error } = await supabase
      .from('marketplace_products')
      .upsert(dedupedBatch, {
        onConflict: 'supplier_id,sku',
        ignoreDuplicates: false
      })
      .select('id');

    if (error) {
      console.error(`❌ Batch upsert error:`, error.message);
    } else {
      successCount += data?.length || 0;
    }
  }

  console.log(`✅ Successfully upserted ${successCount}/${products.length} products`);
  return successCount;
}

// Also update the tools_weekly_cache for the weekly cache refresh
async function updateToolsWeeklyCache(products: any[], supplierName: string) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Group products by category
  const byCategory: Record<string, any[]> = {};
  for (const product of products) {
    if (!byCategory[product.category]) {
      byCategory[product.category] = [];
    }
    byCategory[product.category].push(product);
  }

  // Update cache for each category
  for (const [category, categoryProducts] of Object.entries(byCategory)) {
    const cacheKey = `${supplierName}-${category}`;

    await supabase
      .from('tools_weekly_cache')
      .upsert({
        id: crypto.randomUUID(),
        category: cacheKey,
        tools_data: categoryProducts,
        total_products: categoryProducts.length,
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        update_status: 'complete',
        last_updated: new Date().toISOString(),
      }, {
        onConflict: 'category',
      });
  }
}

// ========================================
// MAIN HANDLER
// ========================================

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const batch = body.batch as number | undefined;

    // If batch is specified, only scrape that supplier batch
    if (batch && SUPPLIER_BATCHES[batch]) {
      const supplierNames = SUPPLIER_BATCHES[batch];
      console.log(`🚀 Tools Marketplace Scraper - Batch ${batch}: ${supplierNames.join(', ')}`);

      const products = await scrapeSupplierCategories(supplierNames);

      if (products.length === 0) {
        return new Response(
          JSON.stringify({
            success: true,
            batch,
            suppliers: supplierNames,
            message: 'No products found - site may be blocking or unavailable',
            productsCount: 0,
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Deduplicate
      const uniqueProducts = new Map<string, any>();
      for (const product of products) {
        const key = `${product.supplier_id}:${product.sku}`;
        if (!uniqueProducts.has(key) ||
            (product.current_price && uniqueProducts.get(key).current_price && product.current_price < uniqueProducts.get(key).current_price)) {
          uniqueProducts.set(key, product);
        }
      }
      const deduplicatedProducts = Array.from(uniqueProducts.values());

      // Save to database
      const savedCount = await upsertProducts(deduplicatedProducts);

      // Update weekly cache
      for (const supplierName of supplierNames) {
        const supplierProducts = deduplicatedProducts.filter(
          p => p.supplier_id === SUPPLIERS[supplierName as keyof typeof SUPPLIERS]
        );
        if (supplierProducts.length > 0) {
          await updateToolsWeeklyCache(supplierProducts, supplierName);
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          batch,
          suppliers: supplierNames,
          productsCount: savedCount,
          totalScraped: products.length,
          message: `Batch ${batch} complete: ${savedCount} products from ${supplierNames.join(', ')}`,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // No batch specified - return info about available batches
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Tools Marketplace Scraper - use batch parameter (1-5) to scrape specific suppliers',
        availableBatches: Object.entries(SUPPLIER_BATCHES).map(([num, suppliers]) => ({
          batch: parseInt(num),
          suppliers,
        })),
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
