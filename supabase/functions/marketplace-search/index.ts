import { serve, corsHeaders, createClient } from '../_shared/deps.ts';

interface SearchRequest {
  query?: string;
  category?: string;
  suppliers?: string[]; // supplier slugs
  minPrice?: number;
  maxPrice?: number;
  dealsOnly?: boolean;
  sort?: 'relevance' | 'price-low' | 'price-high' | 'discount';
  page?: number;
  pageSize?: number;
}

interface SearchResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  facets: {
    categories: { name: string; count: number }[];
    suppliers: { slug: string; name: string; count: number }[];
    priceRange: { min: number; max: number };
  };
}

interface Product {
  id: string;
  supplier_id: string;
  supplier_name: string;
  supplier_slug: string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  current_price: number;
  regular_price: number;
  is_on_sale: boolean;
  discount_percentage: number;
  description: string;
  highlights: string[];
  image_url: string;
  product_url: string;
  stock_status: string;
  search_rank?: number;
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

    const body: SearchRequest = await req.json().catch(() => ({}));

    const {
      query = '',
      category = null,
      suppliers = null,
      minPrice = null,
      maxPrice = null,
      dealsOnly = false,
      sort = 'relevance',
      page = 1,
      pageSize = 20,
    } = body;

    // Get supplier IDs from slugs if provided
    let supplierIds: string[] | null = null;
    if (suppliers && suppliers.length > 0) {
      const { data: supplierData } = await supabase
        .from('marketplace_suppliers')
        .select('id')
        .in('slug', suppliers);

      if (supplierData && supplierData.length > 0) {
        supplierIds = supplierData.map((s: { id: string }) => s.id);
      }
    }

    // Use the search function we created in the migration
    const { data: results, error: searchError } = await supabase.rpc(
      'search_marketplace_products',
      {
        search_query: query || null,
        category_filter: category || null,
        supplier_ids: supplierIds,
        min_price: minPrice,
        max_price: maxPrice,
        deals_only: dealsOnly,
        sort_by: sort,
        page_num: page,
        page_size: pageSize,
      }
    );

    if (searchError) {
      console.error('Search error:', searchError);
      throw new Error(`Search failed: ${searchError.message}`);
    }

    // Get total count from first result
    const total = results && results.length > 0 ? Number(results[0].total_count) : 0;
    const totalPages = Math.ceil(total / pageSize);

    // Get facets (category and supplier counts)
    const [categoryFacets, supplierFacets, priceRange] = await Promise.all([
      // Category counts
      supabase
        .from('marketplace_products')
        .select('category')
        .not('category', 'is', null)
        .then(({ data }) => {
          if (!data) return [];
          const counts: Record<string, number> = {};
          data.forEach((p: { category: string }) => {
            counts[p.category] = (counts[p.category] || 0) + 1;
          });
          return Object.entries(counts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);
        }),

      // Supplier counts
      supabase
        .from('marketplace_products')
        .select('supplier_id, marketplace_suppliers(name, slug)')
        .then(({ data }) => {
          if (!data) return [];
          const counts: Record<string, { name: string; slug: string; count: number }> = {};
          data.forEach((p: any) => {
            const supplier = p.marketplace_suppliers;
            if (supplier) {
              if (!counts[supplier.slug]) {
                counts[supplier.slug] = { name: supplier.name, slug: supplier.slug, count: 0 };
              }
              counts[supplier.slug].count++;
            }
          });
          return Object.values(counts).sort((a, b) => b.count - a.count);
        }),

      // Price range
      supabase
        .from('marketplace_products')
        .select('current_price')
        .not('current_price', 'is', null)
        .order('current_price', { ascending: true })
        .limit(1)
        .single()
        .then(async ({ data: minData }) => {
          const { data: maxData } = await supabase
            .from('marketplace_products')
            .select('current_price')
            .not('current_price', 'is', null)
            .order('current_price', { ascending: false })
            .limit(1)
            .single();

          return {
            min: minData?.current_price ?? 0,
            max: maxData?.current_price ?? 1000,
          };
        }),
    ]);

    const response: SearchResponse = {
      products: results?.map((r: any) => ({
        id: r.id,
        supplier_id: r.supplier_id,
        supplier_name: r.supplier_name,
        supplier_slug: r.supplier_slug,
        sku: r.sku,
        name: r.name,
        brand: r.brand,
        category: r.category,
        subcategory: r.subcategory,
        current_price: r.current_price,
        regular_price: r.regular_price,
        is_on_sale: r.is_on_sale,
        discount_percentage: r.discount_percentage,
        description: r.description,
        highlights: r.highlights,
        image_url: r.image_url,
        product_url: r.product_url,
        stock_status: r.stock_status,
        search_rank: r.search_rank,
      })) ?? [],
      total,
      page,
      pageSize,
      totalPages,
      facets: {
        categories: categoryFacets,
        suppliers: supplierFacets,
        priceRange,
      },
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Marketplace search error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Search failed',
        products: [],
        total: 0,
        page: 1,
        pageSize: 20,
        totalPages: 0,
        facets: { categories: [], suppliers: [], priceRange: { min: 0, max: 1000 } }
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
