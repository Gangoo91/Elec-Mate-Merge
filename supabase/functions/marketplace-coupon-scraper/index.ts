import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// Map supplier names to their IDs and the search terms used on aggregation sites
const SUPPLIER_COUPON_CONFIG = [
  {
    name: 'Screwfix',
    supplierId: '0f053b93-2f2b-4c36-8f3a-164b448573ce',
    searchTerms: ['screwfix'],
    voucherCodesSlug: 'screwfix',
    hotUkDealsSearch: 'screwfix voucher code',
  },
  {
    name: 'Toolstation',
    supplierId: '8bf5c72e-31b6-42fa-81c3-8ed599e1b5ab',
    searchTerms: ['toolstation'],
    voucherCodesSlug: 'toolstation',
    hotUkDealsSearch: 'toolstation voucher code',
  },
  {
    name: 'CEF',
    supplierId: 'b73e4b5b-942f-4cf4-9c08-d406e50afb3e',
    searchTerms: ['cef', 'city electrical factors'],
    voucherCodesSlug: null, // CEF not on VoucherCodes
    hotUkDealsSearch: 'CEF electrical voucher',
  },
  {
    name: 'FFX',
    supplierId: '004ddaef-0a8c-46f9-a455-7bd99c449f07',
    searchTerms: ['ffx'],
    voucherCodesSlug: 'ffx',
    hotUkDealsSearch: 'FFX tools voucher code',
  },
  {
    name: 'Machine Mart',
    supplierId: 'ff978448-cd20-4cfb-85e3-9cd650be5615',
    searchTerms: ['machine mart', 'machinemart'],
    voucherCodesSlug: 'machine-mart',
    hotUkDealsSearch: 'machine mart voucher code',
  },
  {
    name: 'RS Components',
    supplierId: '9435c0a3-1c89-4372-becb-a92f75145aa9',
    searchTerms: ['rs components', 'rs online'],
    voucherCodesSlug: 'rs-components',
    hotUkDealsSearch: 'RS components discount code',
  },
  {
    name: 'TLC Electrical',
    supplierId: '1a86fc99-d6ae-4430-9838-fbe991a49e43',
    searchTerms: ['tlc electrical', 'tlc direct'],
    voucherCodesSlug: 'tlc-direct',
    hotUkDealsSearch: 'TLC direct electrical voucher',
  },
  {
    name: 'ElectricalDirect',
    supplierId: 'b4ebae44-4584-4bae-89e9-4804e8107b42',
    searchTerms: ['electrical direct', 'electricaldirect'],
    voucherCodesSlug: 'electricaldirect',
    hotUkDealsSearch: 'electrical direct voucher code',
  },
];

// Aggregation sites to scrape for coupon codes
const AGGREGATION_SOURCES = [
  {
    name: 'VoucherCodes',
    urlTemplate: (slug: string) => `https://www.vouchercodes.co.uk/${slug}`,
    extractPrompt: `Extract ALL voucher/discount/promo codes from this page. For each code extract:
- code: The actual promo/voucher/discount code (the text users enter at checkout). If it says "no code needed" or "deal" skip it.
- description: What the discount is for
- discount_type: "percentage", "fixed_amount", or "free_delivery"
- discount_value: The numeric value (e.g. 10 for 10% or £10)
- minimum_spend: Minimum order value if mentioned (null if none)
- valid_until: Expiry date if shown (ISO format)
- is_verified: true if marked as "verified" or "tested"

Only extract entries that have an actual CODE (alphanumeric string). Skip "deal" or "offer" entries without codes.`,
  },
  {
    name: 'MyVoucherCodes',
    urlTemplate: (slug: string) => `https://www.myvouchercodes.co.uk/${slug}`,
    extractPrompt: `Extract ALL voucher/discount/promo codes from this page. For each code extract:
- code: The actual promo/voucher/discount code (the text users enter at checkout). Skip entries without actual codes.
- description: What the discount is for
- discount_type: "percentage", "fixed_amount", or "free_delivery"
- discount_value: The numeric value
- minimum_spend: Minimum order value if mentioned
- valid_until: Expiry date if shown (ISO format)
- is_verified: true if marked as verified/tested

Only extract entries with actual alphanumeric codes. Skip "no code needed" entries.`,
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Firecrawl dynamic response
async function scrapeCouponsFromPage(url: string, prompt: string): Promise<any[]> {
  const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
  if (!FIRECRAWL_API_KEY) {
    console.error('FIRECRAWL_API_KEY not set');
    return [];
  }

  try {
    console.log(`Scraping coupons from: ${url}`);

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
          prompt,
          schema: {
            type: 'object',
            properties: {
              coupons: {
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
                    is_verified: { type: 'boolean' },
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

    const coupons = data.data.extract.coupons || [];
    console.log(`Found ${coupons.length} coupons from ${url}`);
    return coupons;
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

    const suppliers = targetSupplier
      ? SUPPLIER_COUPON_CONFIG.filter((s) => s.name.toLowerCase() === targetSupplier.toLowerCase())
      : SUPPLIER_COUPON_CONFIG;

    let totalCoupons = 0;
    const results: { supplier: string; coupons: number; sources: string[] }[] = [];

    for (const supplier of suppliers) {
      console.log(`\nScraping coupons for ${supplier.name}...`);
      let supplierCoupons = 0;
      const sourcesUsed: string[] = [];

      for (const source of AGGREGATION_SOURCES) {
        const slug =
          source.name === 'VoucherCodes' ? supplier.voucherCodesSlug : supplier.voucherCodesSlug; // MyVoucherCodes uses same slug pattern

        if (!slug) continue;

        const url = source.urlTemplate(slug);
        const coupons = await scrapeCouponsFromPage(url, source.extractPrompt);

        for (const coupon of coupons) {
          // Skip entries without actual codes
          if (!coupon.code || coupon.code.length < 3) continue;
          // Skip generic "no code" entries
          if (coupon.code.toLowerCase().includes('no code')) continue;
          if (coupon.code.toLowerCase().includes('deal')) continue;
          if (coupon.code.toLowerCase().includes('n/a')) continue;

          const code = coupon.code.toUpperCase().trim().replace(/\s+/g, '');

          // Determine discount type
          let discountType = coupon.discount_type || 'percentage';
          if (discountType === 'free_delivery') discountType = 'free_shipping';
          if (!['percentage', 'fixed_amount', 'free_shipping'].includes(discountType)) {
            discountType = 'percentage';
          }

          // Parse valid_until date
          let validUntil: string | null = null;
          if (coupon.valid_until) {
            try {
              const parsed = new Date(coupon.valid_until);
              if (!isNaN(parsed.getTime()) && parsed > new Date()) {
                validUntil = parsed.toISOString();
              }
            } catch {
              // Invalid date — use default
            }
          }
          // Default: 30 days from now
          if (!validUntil) {
            validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
          }

          const { error: upsertError } = await supabase.from('marketplace_coupon_codes').upsert(
            {
              supplier_id: supplier.supplierId,
              code,
              description: coupon.description || `${supplier.name} discount code`,
              discount_type: discountType,
              discount_value: coupon.discount_value || null,
              minimum_spend: coupon.minimum_spend || null,
              valid_until: validUntil,
              is_verified: coupon.is_verified ?? false,
              source_url: url,
              scraped_at: new Date().toISOString(),
            },
            { onConflict: 'supplier_id,code', ignoreDuplicates: false }
          );

          if (upsertError) {
            console.error(`Coupon upsert error for ${code}:`, upsertError.message);
          } else {
            supplierCoupons++;
          }
        }

        sourcesUsed.push(source.name);

        // Rate limit between sources
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      results.push({
        supplier: supplier.name,
        coupons: supplierCoupons,
        sources: sourcesUsed,
      });
      totalCoupons += supplierCoupons;

      console.log(`${supplier.name}: ${supplierCoupons} coupons from ${sourcesUsed.join(', ')}`);

      // Rate limit between suppliers
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return new Response(
      JSON.stringify({
        success: true,
        totalCoupons,
        results,
        message: `Scraped ${totalCoupons} coupon codes from ${results.length} suppliers`,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Coupon scraper error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Coupon scraper failed',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
