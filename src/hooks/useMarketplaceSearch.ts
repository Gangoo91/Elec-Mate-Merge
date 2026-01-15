import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/**
 * Marketplace Search Types
 */
export interface MarketplaceProduct {
  id: string;
  supplier_id: string;
  supplier_name: string;
  supplier_slug: string;
  sku: string;
  name: string;
  brand: string | null;
  category: string;
  subcategory: string | null;
  current_price: number;
  regular_price: number | null;
  is_on_sale: boolean;
  discount_percentage: number | null;
  description: string | null;
  highlights: string[];
  image_url: string | null;
  product_url: string;
  stock_status: string;
  search_rank?: number;
}

export type ProductType = 'tools' | 'materials';

export interface SearchFilters {
  category?: string;
  suppliers?: string[];
  minPrice?: number;
  maxPrice?: number;
  dealsOnly?: boolean;
  productType?: ProductType;
}

export interface SearchFacets {
  categories: { name: string; count: number }[];
  suppliers: { slug: string; name: string; count: number }[];
  priceRange: { min: number; max: number };
}

export interface SearchResponse {
  products: MarketplaceProduct[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  facets: SearchFacets;
}

export type SortOption = 'relevance' | 'price-low' | 'price-high' | 'discount';

/**
 * Full marketplace search hook
 * For the main search results page
 */
export function useMarketplaceSearch(
  query: string,
  filters: SearchFilters = {},
  sort: SortOption = 'relevance',
  page: number = 1,
  pageSize: number = 20
) {
  return useQuery<SearchResponse>({
    queryKey: ['marketplace-search', query, filters, sort, page, pageSize],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('marketplace-search', {
        body: {
          query: query || '',
          category: filters.category || null,
          suppliers: filters.suppliers || null,
          minPrice: filters.minPrice ?? null,
          maxPrice: filters.maxPrice ?? null,
          dealsOnly: filters.dealsOnly ?? false,
          productType: filters.productType || null,
          sort,
          page,
          pageSize,
        },
      });

      if (error) {
        console.error('Search error:', error);
        throw new Error('Search failed');
      }

      return data as SearchResponse;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - products don't change often
    gcTime: 30 * 60 * 1000, // 30 minutes - keep in cache when navigating away
    placeholderData: (previousData) => previousData,
    retry: 2,
    retryDelay: 1000,
  });
}

/**
 * Hook to get available suppliers
 */
export function useMarketplaceSuppliers() {
  return useQuery({
    queryKey: ['marketplace-suppliers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketplace_suppliers')
        .select('id, name, slug, logo_url, website_url')
        .eq('scrape_enabled', true)
        .order('name');

      if (error) {
        console.error('Suppliers fetch error:', error);
        return [];
      }

      return data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to get categories
 */
export function useMarketplaceCategories() {
  return useQuery({
    queryKey: ['marketplace-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('marketplace_products')
        .select('category')
        .not('category', 'is', null);

      if (error) {
        console.error('Categories fetch error:', error);
        return [];
      }

      // Count occurrences
      const counts: Record<string, number> = {};
      data?.forEach((p) => {
        if (p.category) {
          counts[p.category] = (counts[p.category] || 0) + 1;
        }
      });

      return Object.entries(counts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
    },
    staleTime: 5 * 60 * 1000,
  });
}
