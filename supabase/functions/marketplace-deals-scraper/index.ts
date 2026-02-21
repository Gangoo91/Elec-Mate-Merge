import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// Supplier deal/clearance page URLs
const DEAL_SOURCES = [
  {
    name: 'Screwfix',
    slug: 'screwfix',
    supplierId: '0f053b93-2f2b-4c36-8f3a-164b448573ce',
    urls: [
      'https://www.screwfix.com/c/clearance/cat6830001',
      'https://www.screwfix.com/c/tools/power-tool-deals/cat14300001',
    ],
  },
  {
    name: 'Toolstation',
    slug: 'toolstation',
    supplierId: '8bf5c72e-31b6-42fa-81c3-8ed599e1b5ab',
    urls: ['https://www.toolstation.com/clearance', 'https://www.toolstation.com/deals'],
  },
  {
    name: 'FFX',
    slug: 'ffx',
    supplierId: '004ddaef-0a8c-46f9-a455-7bd99c449f07',
    urls: ['https://www.ffx.co.uk/offers'],
  },
  {
    name: 'Machine Mart',
    slug: 'machine-mart',
    supplierId: 'ff978448-cd20-4cfb-85e3-9cd650be5615',
    urls: ['https://www.machinemart.co.uk/offers/'],
  },
  {
    name: 'RS Components',
    slug: 'rs-components',
    supplierId: '9435c0a3-1c89-4372-becb-a92f75145aa9',
    urls: ['https://uk.rs-online.com/web/c/special-offers/'],
  },
];

// Tool-related keywords to filter deals (skip non-electrical items)
const TOOL_KEYWORDS = [
  'drill',
  'driver',
  'saw',
  'grinder',
  'sander',
  'plier',
  'screwdriver',
  'wrench',
  'spanner',
  'hammer',
  'chisel',
  'knife',
  'cutter',
  'stripper',
  'crimper',
  'tester',
  'meter',
  'multimeter',
  'voltage',
  'clamp',
  'insulated',
  'ratchet',
  'socket',
  'bit',
  'blade',
  'fluke',
  'megger',
  'kewtech',
  'milwaukee',
  'makita',
  'dewalt',
  'bosch',
  'stanley',
  'knipex',
  'wera',
  'bahco',
  'irwin',
  'ck tools',
  'wiha',
  'tool bag',
  'tool box',
  'tool case',
  'hard hat',
  'safety',
  'glove',
  'goggle',
  'boot',
  'hi-vis',
  'ppe',
  'tape measure',
  'level',
  'torch',
  'headlamp',
  'cable',
  'wire',
];

function isToolRelated(name: string): boolean {
  const lower = name.toLowerCase();
  return TOOL_KEYWORDS.some((kw) => lower.includes(kw));
}

function parsePrice(priceStr: string | number | null | undefined): number | null {
  if (priceStr === null || priceStr === undefined) return null;
  if (typeof priceStr === 'number') return priceStr;
  const cleaned = String(priceStr).replace(/[£$€,\s]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? null : parsed;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Firecrawl dynamic response
async function scrapeDealsPage(url: string): Promise<any[]> {
  const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
  if (!FIRECRAWL_API_KEY) {
    console.error('FIRECRAWL_API_KEY not set');
    return [];
  }

  try {
    console.log(`Scraping deals from: ${url}`);

    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        formats: ['extract'],
        extract: {
          prompt: `Extract ALL deal/clearance/offer products from this page. For each product extract:
- name: Full product name including brand
- brand: Brand name if shown
- current_price: The sale/deal price in GBP
- original_price: The original/RRP/was price in GBP
- discount_percentage: The percentage discount if shown
- image_url: Product image URL (full URL, not relative)
- product_url: Direct link to the product page (full URL)
- deal_type: One of "clearance", "flash_sale", "deal_of_day", "weekly_deal"
- coupon_code: Any discount/promo code shown (null if none)
- stock_status: "In Stock", "Low Stock", or "Out of Stock"

Focus on electrician tools, power tools, hand tools, test equipment, and PPE.
Skip home furnishings, garden items, plumbing, and non-tool items.`,
          schema: {
            type: 'object',
            properties: {
              products: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    brand: { type: 'string' },
                    current_price: { type: 'string' },
                    original_price: { type: 'string' },
                    discount_percentage: { type: 'number' },
                    image_url: { type: 'string' },
                    product_url: { type: 'string' },
                    deal_type: { type: 'string' },
                    coupon_code: { type: 'string' },
                    stock_status: { type: 'string' },
                  },
                },
              },
              coupon_codes: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    code: { type: 'string' },
                    description: { type: 'string' },
                    discount_type: { type: 'string' },
                    discount_value: { type: 'number' },
                    minimum_spend: { type: 'number' },
                    valid_until: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      }),
    });

    const data = await response.json();

    if (!data.success || !data.data?.extract) {
      console.error(`Scrape failed for ${url}:`, data);
      return [];
    }

    const products = data.data.extract.products || [];
    const coupons = data.data.extract.coupon_codes || [];

    console.log(`Found ${products.length} deal products and ${coupons.length} coupons from ${url}`);

    return [{ products, coupons, url }];
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return [];
  }
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const body = await req.json().catch(() => ({}));
    const targetSupplier = body.supplier as string | undefined;

    // Filter suppliers if specific one requested
    const sources = targetSupplier
      ? DEAL_SOURCES.filter((s) => s.slug === targetSupplier)
      : DEAL_SOURCES;

    let totalDeals = 0;
    let totalCoupons = 0;
    const results: { supplier: string; deals: number; coupons: number }[] = [];

    for (const source of sources) {
      console.log(`\nProcessing ${source.name} deals...`);
      let supplierDeals = 0;
      let supplierCoupons = 0;

      for (const url of source.urls) {
        const scraped = await scrapeDealsPage(url);

        for (const result of scraped) {
          // Filter to tool-related products only
          const toolProducts = result.products.filter(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Firecrawl response
            (p: any) => p.name && (isToolRelated(p.name) || isToolRelated(p.brand || ''))
          );

          // Upsert deal products to marketplace_products
          for (const product of toolProducts) {
            const currentPrice = parsePrice(product.current_price);
            const originalPrice = parsePrice(product.original_price);

            if (!currentPrice || currentPrice <= 0) continue;
            if (!product.name || product.name.length < 5) continue;

            const isOnSale = originalPrice !== null && originalPrice > currentPrice;
            const discountPct = isOnSale
              ? Math.round(((originalPrice! - currentPrice) / originalPrice!) * 100)
              : product.discount_percentage || null;

            // Determine category from keywords
            let category = 'hand-tools';
            const nameLower = product.name.toLowerCase();
            if (nameLower.match(/drill|driver|saw|grinder|sander|impact/)) category = 'power-tools';
            else if (nameLower.match(/tester|meter|multimeter|voltage|clamp|fluke|megger|kewtech/))
              category = 'test-equipment';
            else if (nameLower.match(/hard hat|safety|glove|goggle|boot|hi-vis|ppe/))
              category = 'ppe';
            else if (nameLower.match(/tool bag|tool box|tool case|packout|tstak|makpac/))
              category = 'tool-storage';

            const sku = `DEAL-${source.slug}-${product.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .slice(0, 40)}`;

            const { error: upsertError } = await supabase.from('marketplace_products').upsert(
              {
                supplier_id: source.supplierId,
                sku,
                name: product.name.trim(),
                brand: product.brand || null,
                category,
                current_price: currentPrice,
                regular_price: originalPrice,
                is_on_sale: isOnSale,
                discount_percentage: discountPct,
                image_url: product.image_url || null,
                product_url: product.product_url || url,
                stock_status: product.stock_status || 'In Stock',
                highlights: [],
                description: null,
                scraped_at: new Date().toISOString(),
                expires_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days for deals
              },
              { onConflict: 'supplier_id,sku', ignoreDuplicates: false }
            );

            if (upsertError) {
              console.error(`Upsert error for ${product.name}:`, upsertError.message);
            } else {
              supplierDeals++;
            }
          }

          // Insert coupon codes
           
          for (const coupon of result.coupons || []) {
            if (!coupon.code) continue;

            const { error: couponError } = await supabase.from('marketplace_coupon_codes').upsert(
              {
                supplier_id: source.supplierId,
                code: coupon.code.toUpperCase().trim(),
                description: coupon.description || `${source.name} discount code`,
                discount_type: coupon.discount_type || 'percentage',
                discount_value: coupon.discount_value || null,
                minimum_spend: coupon.minimum_spend || null,
                valid_until: coupon.valid_until
                  ? new Date(coupon.valid_until).toISOString()
                  : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                is_verified: false,
                source_url: url,
                scraped_at: new Date().toISOString(),
              },
              { onConflict: 'supplier_id,code', ignoreDuplicates: false }
            );

            if (couponError) {
              console.error(`Coupon upsert error for ${coupon.code}:`, couponError.message);
            } else {
              supplierCoupons++;
            }
          }
        }

        // Rate limiting between URLs
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      results.push({ supplier: source.name, deals: supplierDeals, coupons: supplierCoupons });
      totalDeals += supplierDeals;
      totalCoupons += supplierCoupons;

      console.log(`${source.name}: ${supplierDeals} deals, ${supplierCoupons} coupons`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        totalDeals,
        totalCoupons,
        results,
        message: `Scraped ${totalDeals} deals and ${totalCoupons} coupons from ${results.length} suppliers`,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Deals scraper error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Deals scraper failed',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
