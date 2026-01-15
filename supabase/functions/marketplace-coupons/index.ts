import { serve, corsHeaders, createClient } from '../_shared/deps.ts';

/**
 * Marketplace Coupons
 * Returns valid coupon codes from all suppliers
 */

interface CouponsRequest {
  supplier?: string; // supplier slug
}

interface Coupon {
  id: string;
  supplier_id: string;
  supplier_name: string;
  supplier_slug: string;
  code: string;
  description: string;
  discount_type: 'percentage' | 'fixed' | 'free_delivery';
  discount_value: number;
  minimum_spend: number | null;
  valid_until: string | null;
  is_verified: boolean;
  formatted_discount: string;
}

interface CouponsResponse {
  coupons: Coupon[];
  total: number;
}

function formatDiscount(type: string, value: number): string {
  switch (type) {
    case 'percentage':
      return `${value}% off`;
    case 'fixed':
      return `£${value.toFixed(2)} off`;
    case 'free_delivery':
      return 'Free delivery';
    default:
      return `${value}% off`;
  }
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const body: CouponsRequest = await req.json().catch(() => ({}));
    const { supplier = null } = body;

    // Use the helper function from migration
    const { data: coupons, error } = await supabase.rpc(
      'get_valid_marketplace_coupons',
      {
        supplier_slug_filter: supplier
      }
    );

    if (error) {
      console.error('Coupons fetch error:', error);
      throw new Error(`Failed to fetch coupons: ${error.message}`);
    }

    const formattedCoupons: Coupon[] = (coupons || []).map((c: any) => ({
      id: c.id,
      supplier_id: c.supplier_id,
      supplier_name: c.supplier_name,
      supplier_slug: c.supplier_slug,
      code: c.code,
      description: c.description ?? '',
      discount_type: c.discount_type ?? 'percentage',
      discount_value: c.discount_value ?? 0,
      minimum_spend: c.minimum_spend,
      valid_until: c.valid_until,
      is_verified: c.is_verified ?? false,
      formatted_discount: formatDiscount(c.discount_type ?? 'percentage', c.discount_value ?? 0),
    }));

    const response: CouponsResponse = {
      coupons: formattedCoupons,
      total: formattedCoupons.length,
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Marketplace coupons error:', error);
    return new Response(
      JSON.stringify({
        coupons: [],
        total: 0,
        error: error instanceof Error ? error.message : 'Failed to fetch coupons'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
