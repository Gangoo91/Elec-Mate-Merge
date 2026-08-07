import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface PriceMove {
  product_id: string;
  name: string;
  brand: string | null;
  category: string | null;
  supplier_name: string;
  supplier_slug: string;
  image_url: string | null;
  product_url: string;
  old_price: number;
  new_price: number;
  current_price: number;
  /** Negative for a drop, positive for a rise. */
  change_percentage: number;
  recorded_at: string;
}

/**
 * Products whose price has actually moved.
 *
 * Deliberately not `is_on_sale` — that flag is set on ONE of 2,089 tools, which
 * is why Deal of the Day, the Deals section and the Deals filter are all empty
 * on that page. Price history does not need a supplier to flag a sale; it sees
 * the price change. That gives Tools 33 drops and 38 rises in a month instead
 * of one.
 */
export function usePriceMoves(
  productType: 'tools' | 'materials',
  direction: 'down' | 'up',
  { days = 30, minPct = 5, limit = 8 }: { days?: number; minPct?: number; limit?: number } = {}
) {
  return useQuery({
    queryKey: ['price-moves', productType, direction, days, minPct, limit],
    staleTime: 10 * 60 * 1000,
    queryFn: async (): Promise<PriceMove[]> => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any).rpc('marketplace_price_moves', {
        p_product_type: productType,
        p_direction: direction,
        p_days: days,
        p_min_pct: minPct,
        p_limit: limit,
      });
      if (error) throw error;
      return (data ?? []).map((r: Record<string, unknown>) => ({
        product_id: String(r.product_id),
        name: String(r.name),
        brand: (r.brand as string | null) ?? null,
        category: (r.category as string | null) ?? null,
        supplier_name: String(r.supplier_name),
        supplier_slug: String(r.supplier_slug),
        image_url: (r.image_url as string | null) ?? null,
        product_url: String(r.product_url),
        old_price: Number(r.old_price),
        new_price: Number(r.new_price),
        current_price: Number(r.current_price),
        change_percentage: Number(r.change_percentage),
        recorded_at: String(r.recorded_at),
      }));
    },
  });
}
