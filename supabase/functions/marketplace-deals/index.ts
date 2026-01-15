import { serve, corsHeaders, createClient } from '../_shared/deps.ts';

/**
 * Marketplace Deals
 * Returns active deals of the day from all suppliers
 */

interface DealsRequest {
  supplier?: string; // supplier slug
  dealType?: 'deal_of_day' | 'flash_sale' | 'clearance' | 'weekly_deal';
  limit?: number;
}

interface Deal {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  product_url: string;
  supplier_id: string;
  supplier_name: string;
  supplier_slug: string;
  deal_type: string;
  original_price: number;
  deal_price: number;
  discount_percentage: number;
  title: string;
  description: string;
  expires_at: string;
  time_remaining: string;
}

interface DealsResponse {
  deals: Deal[];
  total: number;
}

function formatTimeRemaining(expiresAt: string): string {
  const now = new Date();
  const expires = new Date(expiresAt);
  const diff = expires.getTime() - now.getTime();

  if (diff <= 0) return 'Expired';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} left`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m left`;
  }

  return `${minutes}m left`;
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

    const body: DealsRequest = await req.json().catch(() => ({}));
    const { supplier = null, dealType = null, limit = 10 } = body;

    // Use the helper function from migration
    const { data: deals, error } = await supabase.rpc(
      'get_active_marketplace_deals',
      {
        supplier_slug_filter: supplier,
        deal_type_filter: dealType,
        limit_count: limit
      }
    );

    if (error) {
      console.error('Deals fetch error:', error);
      throw new Error(`Failed to fetch deals: ${error.message}`);
    }

    const formattedDeals: Deal[] = (deals || []).map((d: any) => ({
      id: d.id,
      product_id: d.product_id,
      product_name: d.product_name ?? 'Unknown Product',
      product_image: d.product_image ?? '/placeholder-product.png',
      product_url: d.product_url ?? '#',
      supplier_id: d.supplier_id,
      supplier_name: d.supplier_name,
      supplier_slug: d.supplier_slug,
      deal_type: d.deal_type,
      original_price: d.original_price,
      deal_price: d.deal_price,
      discount_percentage: d.discount_percentage,
      title: d.title ?? `${d.discount_percentage}% Off`,
      description: d.description ?? '',
      expires_at: d.expires_at,
      time_remaining: formatTimeRemaining(d.expires_at),
    }));

    const response: DealsResponse = {
      deals: formattedDeals,
      total: formattedDeals.length,
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Marketplace deals error:', error);
    return new Response(
      JSON.stringify({
        deals: [],
        total: 0,
        error: error instanceof Error ? error.message : 'Failed to fetch deals'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
