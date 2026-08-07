import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CableFamily {
  family: string;
  label: string;
  spec_count: number;
  supplier_count: number;
}

export interface CableSpec {
  spec_key: string;
  spec_label: string;
  csa_mm2: number;
  cores: number | null;
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
  pack_qty: number;
  sold_per_metre: boolean;
  product_url: string;
  image_url: string | null;
  scraped_at: string;
  is_cheapest: boolean;
  pct_above_cheapest: number;
}

/** Cable families with at least one spec three or more suppliers stock. */
export function useCableFamilies() {
  return useQuery({
    queryKey: ['cable-families'],
    staleTime: 10 * 60 * 1000,
    queryFn: async (): Promise<CableFamily[]> => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any).rpc('cable_families');
      if (error) throw error;
      return (data ?? []).map((r: Record<string, unknown>) => ({
        family: String(r.family),
        label: String(r.label),
        spec_count: Number(r.spec_count),
        supplier_count: Number(r.supplier_count),
      }));
    },
  });
}

/**
 * Comparable specs within a family.
 *
 * Only specs stocked by three or more suppliers come back — two is not a
 * market, and one bad scrape would swing the answer entirely.
 */
export function useCableSpecs(family: string | null) {
  return useQuery({
    queryKey: ['cable-comparison-specs', family],
    enabled: !!family,
    staleTime: 10 * 60 * 1000,
    queryFn: async (): Promise<CableSpec[]> => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any).rpc('cable_comparison_specs', {
        p_family: family,
      });
      if (error) throw error;
      return (data ?? []).map((r: Record<string, unknown>) => ({
        spec_key: String(r.spec_key),
        spec_label: String(r.spec_label),
        csa_mm2: Number(r.csa_mm2),
        cores: r.cores == null ? null : Number(r.cores),
        supplier_count: Number(r.supplier_count),
        offer_count: Number(r.offer_count),
        cheapest_per_metre: Number(r.cheapest_per_metre),
        dearest_per_metre: Number(r.dearest_per_metre),
        saving_per_100m: Number(r.saving_per_100m),
      }));
    },
  });
}

/** The cheapest offer from each supplier, for one spec. */
export function useCableComparison(family: string | null, specKey: string | null) {
  return useQuery({
    queryKey: ['cable-comparison', family, specKey],
    enabled: !!family && !!specKey,
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<CableOffer[]> => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any).rpc('compare_cable_prices', {
        p_family: family,
        p_spec_key: specKey,
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
        pack_qty: Number(r.pack_qty ?? 1),
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
