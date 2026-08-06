import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CableSize {
  csa_mm2: number;
  supplier_count: number;
  offer_count: number;
  cheapest_per_metre: number;
  dearest_per_metre: number;
  /** What you save buying 100m from the cheapest rather than the dearest. */
  saving_per_100m: number;
}

export interface CableOffer {
  supplier_name: string;
  supplier_slug: string;
  product_name: string;
  brand: string | null;
  price_per_metre: number;
  current_price: number;
  length_m: number | null;
  sold_per_metre: boolean;
  product_url: string;
  image_url: string | null;
  scraped_at: string;
  is_cheapest: boolean;
  pct_above_cheapest: number;
}

/**
 * Conductor sizes that can actually be compared.
 *
 * Only sizes stocked by more than one supplier come back — a size only one
 * merchant sells has nothing to compare against, and offering it would be a
 * dead end.
 */
export function useCableSizes() {
  return useQuery({
    queryKey: ['cable-comparison-sizes'],
    staleTime: 10 * 60 * 1000,
    queryFn: async (): Promise<CableSize[]> => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any).rpc('cable_comparison_sizes');
      if (error) throw error;
      return (data ?? []).map((r: Record<string, unknown>) => ({
        csa_mm2: Number(r.csa_mm2),
        supplier_count: Number(r.supplier_count),
        offer_count: Number(r.offer_count),
        cheapest_per_metre: Number(r.cheapest_per_metre),
        dearest_per_metre: Number(r.dearest_per_metre),
        saving_per_100m: Number(r.saving_per_100m),
      }));
    },
  });
}

/** The cheapest offer from each supplier for one conductor size. */
export function useCableComparison(csa: number | null) {
  return useQuery({
    queryKey: ['cable-comparison', csa],
    enabled: csa != null,
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<CableOffer[]> => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any).rpc('compare_cable_prices', {
        p_csa: csa,
      });
      if (error) throw error;
      return (data ?? []).map((r: Record<string, unknown>) => ({
        supplier_name: String(r.supplier_name),
        supplier_slug: String(r.supplier_slug),
        product_name: String(r.product_name),
        brand: (r.brand as string | null) ?? null,
        price_per_metre: Number(r.price_per_metre),
        current_price: Number(r.current_price),
        length_m: r.length_m == null ? null : Number(r.length_m),
        sold_per_metre: Boolean(r.sold_per_metre),
        product_url: String(r.product_url),
        image_url: (r.image_url as string | null) ?? null,
        scraped_at: String(r.scraped_at),
        is_cheapest: Boolean(r.is_cheapest),
        pct_above_cheapest: Number(r.pct_above_cheapest),
      }));
    },
  });
}
