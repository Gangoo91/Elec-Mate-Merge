import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// Supplier search terms for HotUKDeals
const SUPPLIER_SEARCHES = [
  {
    name: 'Screwfix',
    supplierId: '0f053b93-2f2b-4c36-8f3a-164b448573ce',
    slug: 'screwfix',
    searches: ['screwfix tools', 'screwfix power tools', 'screwfix electrical'],
  },
  {
    name: 'Toolstation',
    supplierId: '8bf5c72e-31b6-42fa-81c3-8ed599e1b5ab',
    slug: 'toolstation',
    searches: ['toolstation tools', 'toolstation deals'],
  },
  {
    name: 'FFX',
    supplierId: '004ddaef-0a8c-46f9-a455-7bd99c449f07',
    slug: 'ffx',
    searches: ['ffx tools deals'],
  },
  {
    name: 'Machine Mart',
    supplierId: 'ff978448-cd20-4cfb-85e3-9cd650be5615',
    slug: 'machine-mart',
    searches: ['machine mart tools'],
  },
  {
    name: 'RS Components',
    supplierId: '9435c0a3-1c89-4372-becb-a92f75145aa9',
    slug: 'rs-components',
    searches: ['rs components tools electrical'],
  },
  {
    name: 'CEF',
    supplierId: 'b73e4b5b-942f-4cf4-9c08-d406e50afb3e',
    slug: 'cef',
    searches: ['cef electrical deals', 'city electrical factors'],
  },
  {
    name: 'Milwaukee',
    supplierId: null, // brand deals, not supplier-specific
    slug: 'milwaukee',
    searches: ['milwaukee tool deals uk'],
  },
  {
    name: 'Makita',
    supplierId: null,
    slug: 'makita',
    searches: ['makita deals uk'],
  },
  {
    name: 'DeWalt',
    supplierId: null,
    slug: 'dewalt',
    searches: ['dewalt deals uk'],
  },
];

// Tool keywords — must match at least one to be included
const TOOL_KEYWORDS = [
  'drill',
  'driver',
  'saw',
  'grinder',
  'sander',
  'planer',
  'router',
  'jigsaw',
  'sds',
  'impact',
  'combi',
  'multi-tool',
  'oscillat',
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
  'tester',
  'meter',
  'multimeter',
  'voltage',
  'clamp meter',
  'insulation',
  'fluke',
  'megger',
  'kewtech',
  'martindale',
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
  'hikoki',
  'metabo',
  'festool',
  'hilti',
  'ryobi',
  'sealey',
  'draper',
  'tool bag',
  'tool box',
  'tool case',
  'packout',
  'tstak',
  'hard hat',
  'glove',
  'goggle',
  'boot',
  'hi-vis',
  'ppe',
  'tape measure',
  'level',
  'laser',
  'torch',
  'headlamp',
  'battery',
  'charger',
  '18v',
  '12v',
  '36v',
  'cable',
  'wire',
  'conduit',
  'wago',
];

function isToolRelated(text: string): boolean {
  const lower = text.toLowerCase();
  return TOOL_KEYWORDS.some((kw) => lower.includes(kw));
}

function parsePrice(str: string | number | null | undefined): number | null {
  if (str === null || str === undefined) return null;
  if (typeof str === 'number') return str;
  const cleaned = String(str).replace(/[£$€,\s]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? null : parsed;
}

// Determine which supplier a deal belongs to based on the deal URL or merchant
function matchSupplier(
  dealUrl: string,
  merchant: string
): { supplierId: string; slug: string } | null {
  const text = `${dealUrl} ${merchant}`.toLowerCase();

  const suppliers: { match: string[]; id: string; slug: string }[] = [
    {
      match: ['screwfix'],
      id: '0f053b93-2f2b-4c36-8f3a-164b448573ce',
      slug: 'screwfix',
    },
    {
      match: ['toolstation'],
      id: '8bf5c72e-31b6-42fa-81c3-8ed599e1b5ab',
      slug: 'toolstation',
    },
    {
      match: ['ffx.co.uk', 'ffx tools'],
      id: '004ddaef-0a8c-46f9-a455-7bd99c449f07',
      slug: 'ffx',
    },
    {
      match: ['machinemart', 'machine mart'],
      id: 'ff978448-cd20-4cfb-85e3-9cd650be5615',
      slug: 'machine-mart',
    },
    {
      match: ['rs-online', 'rs components', 'rs-components'],
      id: '9435c0a3-1c89-4372-becb-a92f75145aa9',
      slug: 'rs-components',
    },
    {
      match: ['cef.co.uk', 'city electrical'],
      id: 'b73e4b5b-942f-4cf4-9c08-d406e50afb3e',
      slug: 'cef',
    },
    {
      match: ['amazon.co.uk', 'amazon'],
      id: null as unknown as string, // skip Amazon
      slug: 'amazon',
    },
  ];

  for (const s of suppliers) {
    if (s.match.some((m) => text.includes(m))) {
      if (!s.id) return null; // skip non-suppliers like Amazon
      return { supplierId: s.id, slug: s.slug };
    }
  }
  return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Firecrawl dynamic response
async function scrapeHotUKDeals(searchUrl: string): Promise<any[]> {
  const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
  if (!FIRECRAWL_API_KEY) {
    console.error('FIRECRAWL_API_KEY not set');
    return [];
  }

  try {
    console.log(`Scraping HotUKDeals: ${searchUrl}`);

    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: searchUrl,
        formats: ['extract'],
        extract: {
          prompt: `Extract ALL deals from this HotUKDeals page. For each deal extract:
- title: The full deal title
- price: The deal price in GBP (current/sale price)
- original_price: The original/was price if shown
- discount_percentage: The percentage discount if shown
- merchant: The retailer/merchant name (e.g. Screwfix, Toolstation)
- deal_url: The direct link to the deal on the merchant's site (NOT the HotUKDeals link)
- image_url: Product image URL
- coupon_code: Any voucher/promo code mentioned (null if none)
- temperature: The deal temperature/votes (number, higher = more popular)
- posted_date: When the deal was posted
- is_expired: Whether the deal is marked as expired

Focus on deals for tools, power tools, hand tools, test equipment, PPE and electrical supplies.
Skip expired deals. Skip deals with negative temperature.`,
          schema: {
            type: 'object',
            properties: {
              deals: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    price: { type: 'string' },
                    original_price: { type: 'string' },
                    discount_percentage: { type: 'number' },
                    merchant: { type: 'string' },
                    deal_url: { type: 'string' },
                    image_url: { type: 'string' },
                    coupon_code: { type: 'string' },
                    temperature: { type: 'number' },
                    posted_date: { type: 'string' },
                    is_expired: { type: 'boolean' },
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
      console.error(`HotUKDeals scrape failed for ${searchUrl}:`, data);
      return [];
    }

    return data.data.extract.deals || [];
  } catch (error) {
    console.error(`Error scraping HotUKDeals ${searchUrl}:`, error);
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
    const targetSearch = body.search as string | undefined;

    // Build search URLs
    const searches = targetSearch
      ? SUPPLIER_SEARCHES.filter((s) => s.slug === targetSearch)
      : SUPPLIER_SEARCHES;

    let totalDeals = 0;
    let totalCoupons = 0;
    const results: { search: string; deals: number; coupons: number }[] = [];

    for (const supplier of searches) {
      let searchDeals = 0;
      let searchCoupons = 0;

      for (const query of supplier.searches) {
        const encodedQuery = encodeURIComponent(query);
        const searchUrl = `https://www.hotukdeals.com/search?q=${encodedQuery}&sort=new`;

        const deals = await scrapeHotUKDeals(searchUrl);
        console.log(`Found ${deals.length} deals for "${query}"`);

        for (const deal of deals) {
          // Skip expired deals
          if (deal.is_expired) continue;

          // Skip low-quality deals (negative temperature)
          if (deal.temperature !== undefined && deal.temperature < 0) continue;

          // Must be tool-related
          if (!deal.title || !isToolRelated(deal.title)) continue;

          const currentPrice = parsePrice(deal.price);
          const originalPrice = parsePrice(deal.original_price);

          // Must have a valid price
          if (!currentPrice || currentPrice <= 0) continue;

          // Try to match to a known supplier
          const matched = matchSupplier(deal.deal_url || '', deal.merchant || '');
          const supplierId = matched?.supplierId || supplier.supplierId;
          const supplierSlug = matched?.slug || supplier.slug;

          // Skip if we can't match to a supplier
          if (!supplierId) continue;

          const isOnSale = originalPrice !== null && originalPrice > currentPrice;
          const discountPct = isOnSale
            ? Math.round(((originalPrice! - currentPrice) / originalPrice!) * 100)
            : deal.discount_percentage || null;

          // Categorise
          let category = 'hand-tools';
          const titleLower = deal.title.toLowerCase();
          if (
            titleLower.match(
              /drill|driver|saw|grinder|sander|impact|sds|jigsaw|combi|rotary|oscillat|multi-tool/
            )
          )
            category = 'power-tools';
          else if (
            titleLower.match(
              /tester|meter|multimeter|voltage|clamp|fluke|megger|kewtech|martindale|insulation/
            )
          )
            category = 'test-equipment';
          else if (
            titleLower.match(/hard hat|safety|glove|goggle|boot|hi-vis|ppe|ear defend|knee pad/)
          )
            category = 'ppe';
          else if (titleLower.match(/tool bag|tool box|tool case|packout|tstak|makpac|systainer/))
            category = 'tool-storage';

          const sku = `HUKD-${supplierSlug}-${deal.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .slice(0, 40)}`;

          // Deal score: higher temperature = better deal
          const dealScore = Math.max(0, deal.temperature || 0);

          const { error: upsertError } = await supabase.from('marketplace_products').upsert(
            {
              supplier_id: supplierId,
              sku,
              name: deal.title.trim(),
              brand: null, // extracted from title by keyword matching later
              category,
              current_price: currentPrice,
              regular_price: originalPrice,
              is_on_sale: isOnSale || (discountPct !== null && discountPct > 0),
              discount_percentage: discountPct,
              image_url: deal.image_url || null,
              product_url: deal.deal_url || null,
              stock_status: 'In Stock',
              highlights: dealScore > 100 ? ['Hot Deal - Community Verified'] : [],
              description: `Community deal (${dealScore} votes)`,
              scraped_at: new Date().toISOString(),
              expires_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days for HUKD deals
            },
            { onConflict: 'supplier_id,sku', ignoreDuplicates: false }
          );

          if (upsertError) {
            console.error(`HUKD upsert error for "${deal.title}":`, upsertError.message);
          } else {
            searchDeals++;
          }

          // Extract coupon codes if present
          if (deal.coupon_code && deal.coupon_code.length >= 3) {
            const code = deal.coupon_code.toUpperCase().trim().replace(/\s+/g, '');
            // Skip generic non-codes
            if (!code.includes('NO CODE') && !code.includes('N/A') && !code.includes('DEAL')) {
              const { error: couponError } = await supabase.from('marketplace_coupon_codes').upsert(
                {
                  supplier_id: supplierId,
                  code,
                  description: `${deal.title} — via HotUKDeals (${dealScore} votes)`,
                  discount_type: discountPct ? 'percentage' : 'fixed_amount',
                  discount_value: discountPct || null,
                  minimum_spend: null,
                  valid_until: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
                  is_verified: dealScore > 50, // community-verified if popular
                  source_url: `https://www.hotukdeals.com/search?q=${encodedQuery}`,
                  scraped_at: new Date().toISOString(),
                },
                { onConflict: 'supplier_id,code', ignoreDuplicates: false }
              );

              if (couponError) {
                console.error(`HUKD coupon error for ${code}:`, couponError.message);
              } else {
                searchCoupons++;
              }
            }
          }
        }

        // Rate limit between search queries
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      results.push({ search: supplier.name, deals: searchDeals, coupons: searchCoupons });
      totalDeals += searchDeals;
      totalCoupons += searchCoupons;

      console.log(`${supplier.name}: ${searchDeals} deals, ${searchCoupons} coupons`);

      // Rate limit between suppliers
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return new Response(
      JSON.stringify({
        success: true,
        totalDeals,
        totalCoupons,
        results,
        message: `Scraped ${totalDeals} deals and ${totalCoupons} coupons from HotUKDeals`,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('HotUKDeals scraper error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'HotUKDeals scraper failed',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
