import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// Supplier deal/clearance page URLs — organised by batch to stay within timeout
const DEAL_SOURCES = [
  {
    name: 'Screwfix',
    slug: 'screwfix',
    supplierId: '0f053b93-2f2b-4c36-8f3a-164b448573ce',
    urls: [
      'https://www.screwfix.com/c/clearance/cat6830001',
      'https://www.screwfix.com/c/tools/power-tool-deals/cat14300001',
      'https://www.screwfix.com/c/tools/hand-tools/cat14290001?price_range=sale',
      'https://www.screwfix.com/c/electrical-lighting/test-measurement/cat14210002?price_range=sale',
    ],
  },
  {
    name: 'Toolstation',
    slug: 'toolstation',
    supplierId: '8bf5c72e-31b6-42fa-81c3-8ed599e1b5ab',
    urls: [
      'https://www.toolstation.com/clearance',
      'https://www.toolstation.com/deals',
      'https://www.toolstation.com/power-tools/c150?sort=price_low&filter=deals',
      'https://www.toolstation.com/hand-tools/c100?sort=price_low&filter=deals',
    ],
  },
  {
    name: 'FFX',
    slug: 'ffx',
    supplierId: '004ddaef-0a8c-46f9-a455-7bd99c449f07',
    urls: [
      'https://www.ffx.co.uk/offers',
      'https://www.ffx.co.uk/offers/power-tools',
      'https://www.ffx.co.uk/offers/hand-tools',
    ],
  },
  {
    name: 'Machine Mart',
    slug: 'machine-mart',
    supplierId: 'ff978448-cd20-4cfb-85e3-9cd650be5615',
    urls: [
      'https://www.machinemart.co.uk/offers/',
      'https://www.machinemart.co.uk/c/power-tools/?sort=price_low&show=offers',
      'https://www.machinemart.co.uk/c/hand-tools/?sort=price_low&show=offers',
    ],
  },
  {
    name: 'RS Components',
    slug: 'rs-components',
    supplierId: '9435c0a3-1c89-4372-becb-a92f75145aa9',
    urls: [
      'https://uk.rs-online.com/web/c/special-offers/',
      'https://uk.rs-online.com/web/c/tools/hand-tools/?applied-dimensions=4294510846',
    ],
  },
  {
    name: 'CEF',
    slug: 'cef',
    supplierId: 'b73e4b5b-942f-4cf4-9c08-d406e50afb3e',
    urls: [
      'https://www.cef.co.uk/catalogue/special-offers',
      'https://www.cef.co.uk/catalogue/tools-instruments',
    ],
  },
  {
    name: 'TLC Electrical',
    slug: 'tlc-electrical',
    supplierId: '1a86fc99-d6ae-4430-9838-fbe991a49e43',
    urls: [
      'https://www.tlc-direct.co.uk/Main_Index/Tools/index.html',
      'https://www.tlc-direct.co.uk/Main_Index/Clearance/index.html',
    ],
  },
  {
    name: 'ElectricalDirect',
    slug: 'electrical-direct',
    supplierId: 'b4ebae44-4584-4bae-89e9-4804e8107b42',
    urls: ['https://www.electricaldirect.co.uk/special-offers'],
  },
];

// Tool-related keywords to filter deals (skip non-electrical items)
// Expanded to catch more electrician-relevant products
const TOOL_KEYWORDS = [
  // Power tools
  'drill',
  'driver',
  'saw',
  'grinder',
  'sander',
  'planer',
  'router',
  'jigsaw',
  'reciprocating',
  'sds',
  'impact',
  'rotary',
  'combi drill',
  'angle grinder',
  'circular saw',
  'mitre saw',
  'chop saw',
  'multi-tool',
  'oscillating',
  'heat gun',
  'hot air gun',
  'nail gun',
  'brad nailer',
  // Hand tools
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
  'ratchet',
  'socket',
  'hex key',
  'allen key',
  'tin snips',
  'pipe cutter',
  'wire cutter',
  'side cutter',
  'long nose',
  'combination plier',
  'adjustable',
  'punch',
  'file',
  'rasp',
  'hacksaw',
  'junior hacksaw',
  // Test equipment
  'tester',
  'meter',
  'multimeter',
  'voltage',
  'clamp meter',
  'insulation',
  'continuity',
  'rcd tester',
  'loop impedance',
  'pat tester',
  'earth resistance',
  'thermal imag',
  'inspection camera',
  'voltage indicator',
  'proving unit',
  'socket tester',
  // Brands — electrician favourites
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
  'wiha',
  'ck tools',
  'c.k.',
  'hikoki',
  'metabo',
  'festool',
  'hilti',
  'ryobi',
  'einhell',
  'trend',
  'faithfull',
  'draper',
  'sealey',
  'martindale',
  'di-log',
  'robin',
  'seaward',
  // Storage / carry
  'tool bag',
  'tool box',
  'tool case',
  'tool roll',
  'tool belt',
  'packout',
  'tstak',
  'makpac',
  'l-boxx',
  'sortimo',
  'systainer',
  'tool chest',
  'tool pouch',
  'holster',
  // PPE and safety
  'hard hat',
  'safety',
  'glove',
  'goggle',
  'boot',
  'hi-vis',
  'ppe',
  'ear defender',
  'ear plug',
  'knee pad',
  'face shield',
  'respirator',
  'dust mask',
  'safety glass',
  // Measuring / layout
  'tape measure',
  'level',
  'spirit level',
  'laser level',
  'laser measure',
  'stud finder',
  'detector',
  'pipe detector',
  // Lighting / access
  'torch',
  'headlamp',
  'work light',
  'inspection lamp',
  'flood light',
  'step ladder',
  'platform',
  // Electrician consumables
  'cable',
  'wire',
  'conduit',
  'trunking',
  'gland',
  'terminal',
  'heat shrink',
  'insulating tape',
  'pvc tape',
  // Fixings / access
  'fish tape',
  'draw wire',
  'cable rod',
  'wago',
  'connector',
  // Battery / charger
  'battery',
  'charger',
  '18v',
  '12v',
  '36v',
  '40v',
  '54v',
  'flexvolt',
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

            // Determine category from keywords (broader matching)
            let category = 'hand-tools';
            const nameLower = product.name.toLowerCase();
            if (
              nameLower.match(
                /drill|driver|saw|grinder|sander|planer|router|jigsaw|sds|impact|rotary|combi|reciprocat|oscillat|multi-tool|heat gun|nail gun|brad nailer/
              )
            )
              category = 'power-tools';
            else if (
              nameLower.match(
                /tester|meter|multimeter|voltage|clamp meter|insulation|continuity|rcd|loop impedance|pat test|earth resist|thermal|inspection camera|proving unit|socket tester|fluke|megger|kewtech|martindale|di-log|robin|seaward/
              )
            )
              category = 'test-equipment';
            else if (
              nameLower.match(
                /hard hat|safety|glove|goggle|boot|hi-vis|ppe|ear defend|ear plug|knee pad|face shield|respirator|dust mask|safety glass/
              )
            )
              category = 'ppe';
            else if (
              nameLower.match(
                /tool bag|tool box|tool case|tool roll|tool belt|tool chest|tool pouch|holster|packout|tstak|makpac|l-boxx|sortimo|systainer/
              )
            )
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
