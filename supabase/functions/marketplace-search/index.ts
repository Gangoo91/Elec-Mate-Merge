import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const body = await req.json().catch(() => ({}));

    const {
      query = '',
      category = null,
      suppliers = null,
      minPrice = null,
      maxPrice = null,
      dealsOnly = false,
      productType = null, // 'tools' | 'materials' | null
      sort = 'relevance',
      page = 1,
      pageSize = 24,
    } = body;

    // Define category groups for filtering
    const TOOL_CATEGORIES = [
      'hand-tools', 'power-tools', 'test-equipment', 'ppe', 'tool-storage'
    ];
    const MATERIAL_CATEGORIES = [
      'cables', 'consumer-units', 'circuit-protection', 'wiring-accessories',
      'lighting', 'containment', 'earthing', 'fire-security', 'ev-charging',
      'data-networking', 'fixings', 'hvac'
    ];

    // Build the query
    let productsQuery = supabase
      .from('marketplace_products')
      .select(`
        id,
        sku,
        name,
        brand,
        category,
        subcategory,
        current_price,
        regular_price,
        is_on_sale,
        discount_percentage,
        description,
        highlights,
        image_url,
        product_url,
        stock_status,
        supplier_id,
        marketplace_suppliers (
          id,
          name,
          slug
        )
      `);

    // Apply filters
    if (query && query.length > 0) {
      productsQuery = productsQuery.ilike('name', `%${query}%`);
    }

    if (category) {
      productsQuery = productsQuery.eq('category', category);
    }

    if (suppliers && suppliers.length > 0) {
      // Get supplier IDs from slugs
      const { data: supplierData } = await supabase
        .from('marketplace_suppliers')
        .select('id')
        .in('slug', suppliers);

      if (supplierData && supplierData.length > 0) {
        const supplierIds = supplierData.map((s: { id: string }) => s.id);
        productsQuery = productsQuery.in('supplier_id', supplierIds);
      }
    }

    if (minPrice !== null) {
      productsQuery = productsQuery.gte('current_price', minPrice);
    }

    if (maxPrice !== null) {
      productsQuery = productsQuery.lte('current_price', maxPrice);
    }

    if (dealsOnly) {
      productsQuery = productsQuery.eq('is_on_sale', true);
    }

    // Filter by product type (tools vs materials)
    if (productType === 'tools') {
      productsQuery = productsQuery.in('category', TOOL_CATEGORIES);
    } else if (productType === 'materials') {
      productsQuery = productsQuery.in('category', MATERIAL_CATEGORIES);
    }

    // Apply sorting
    switch (sort) {
      case 'price-low':
        productsQuery = productsQuery.order('current_price', { ascending: true });
        break;
      case 'price-high':
        productsQuery = productsQuery.order('current_price', { ascending: false });
        break;
      case 'discount':
        productsQuery = productsQuery.order('discount_percentage', { ascending: false, nullsFirst: false });
        break;
      default:
        productsQuery = productsQuery.order('is_on_sale', { ascending: false }).order('name', { ascending: true });
    }

    // Get total count with same filters
    let countQuery = supabase
      .from('marketplace_products')
      .select('*', { count: 'exact', head: true });

    // Apply same filters to count query
    if (query && query.length > 0) {
      countQuery = countQuery.ilike('name', `%${query}%`);
    }
    if (category) {
      countQuery = countQuery.eq('category', category);
    }
    if (dealsOnly) {
      countQuery = countQuery.eq('is_on_sale', true);
    }
    if (productType === 'tools') {
      countQuery = countQuery.in('category', TOOL_CATEGORIES);
    } else if (productType === 'materials') {
      countQuery = countQuery.in('category', MATERIAL_CATEGORIES);
    }

    const { count: total } = await countQuery;

    // Apply pagination
    const offset = (page - 1) * pageSize;
    productsQuery = productsQuery.range(offset, offset + pageSize - 1);

    // Execute query
    const { data: products, error } = await productsQuery;

    if (error) {
      console.error('Query error:', error);
      throw error;
    }

    // Transform products to include supplier info
    const transformedProducts = (products || []).map((p: any) => ({
      id: p.id,
      supplier_id: p.supplier_id,
      supplier_name: p.marketplace_suppliers?.name || 'Unknown',
      supplier_slug: p.marketplace_suppliers?.slug || 'unknown',
      sku: p.sku,
      name: p.name,
      brand: p.brand,
      category: p.category,
      subcategory: p.subcategory,
      current_price: p.current_price,
      regular_price: p.regular_price,
      is_on_sale: p.is_on_sale,
      discount_percentage: p.discount_percentage,
      description: p.description,
      highlights: p.highlights || [],
      image_url: p.image_url,
      product_url: p.product_url,
      stock_status: p.stock_status,
    }));

    const totalCount = total || 0;
    const totalPages = Math.ceil(totalCount / pageSize);

    // Get facets
    const [categoryFacets, supplierFacets] = await Promise.all([
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

      supabase
        .from('marketplace_suppliers')
        .select('id, name, slug')
        .eq('scrape_enabled', true)
        .then(({ data }) => {
          return (data || []).map((s: any) => ({
            slug: s.slug,
            name: s.name,
            count: 0
          }));
        }),
    ]);

    // Get last scraped timestamp
    const { data: lastScrapedData } = await supabase
      .from('marketplace_suppliers')
      .select('last_scraped_at')
      .eq('scrape_enabled', true)
      .order('last_scraped_at', { ascending: false })
      .limit(1)
      .single();

    const response = {
      products: transformedProducts,
      total: totalCount,
      page,
      pageSize,
      totalPages,
      lastUpdated: lastScrapedData?.last_scraped_at || null,
      facets: {
        categories: categoryFacets,
        suppliers: supplierFacets,
        priceRange: { min: 0, max: 1000 },
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
        pageSize: 24,
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
