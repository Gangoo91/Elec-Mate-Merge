import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/**
 * Deal Types
 */
export interface MarketplaceDeal {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  product_url: string;
  supplier_id: string;
  supplier_name: string;
  supplier_slug: string;
  deal_type: 'deal_of_day' | 'flash_sale' | 'clearance' | 'weekly_deal';
  original_price: number;
  deal_price: number;
  discount_percentage: number;
  title: string;
  description: string | null;
  expires_at: string;
  time_remaining: string;
}

export interface DealsResponse {
  deals: MarketplaceDeal[];
  total: number;
}

/**
 * Hook to fetch active deals
 */
export function useMarketplaceDeals(
  supplier?: string,
  dealType?: MarketplaceDeal['deal_type'],
  limit: number = 10
) {
  return useQuery<DealsResponse>({
    queryKey: ['marketplace-deals', supplier, dealType, limit],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('marketplace-deals', {
        body: {
          supplier: supplier || null,
          dealType: dealType || null,
          limit,
        },
      });

      if (error) {
        console.error('Deals fetch error:', error);
        return { deals: [], total: 0 };
      }

      return data as DealsResponse;
    },
    staleTime: 60000, // 1 minute - deals change frequently
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
}

/**
 * Coupon Types
 */
export interface MarketplaceCoupon {
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

export interface CouponsResponse {
  coupons: MarketplaceCoupon[];
  total: number;
}

/**
 * Hook to fetch valid coupons
 */
export function useMarketplaceCoupons(supplier?: string) {
  return useQuery<CouponsResponse>({
    queryKey: ['marketplace-coupons', supplier],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('marketplace-coupons', {
        body: {
          supplier: supplier || null,
        },
      });

      if (error) {
        console.error('Coupons fetch error:', error);
        return { coupons: [], total: 0 };
      }

      return data as CouponsResponse;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
