import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface LifetimeBuyer {
  user_id: string | null;
  email: string | null;
  full_name: string | null;
  amount_pence: number;
  amount_is_exact: boolean;
  recorded_at: string;
  fulfilled: boolean;
  subscription_tier: string | null;
  reason: string | null;
}

export interface LifetimeCohort {
  buyers: LifetimeBuyer[];
  /** Banked cash in pounds. Mixes exact charges with reason-parsed estimates. */
  banked: number;
  /** Portion of `banked` backed by a real checkout record. */
  bankedExact: number;
  exactCount: number;
  /** Paid but never granted access, or paid with no account at all. */
  needsAttention: LifetimeBuyer[];
}

/**
 * The lifetime (£300-ish one-off) cohort.
 *
 * AdminRevenue previously rendered this as a bare count labelled
 * "Lifetime (£300 one-off)", which was wrong twice over: it could not say who
 * the buyers were, and not all of them paid £300 — one paid £499.99 for
 * Lifetime EVERYTHING. The RPC merges the two places this cohort is recorded
 * (see the migration) and flags which amounts are exact.
 */
export function useLifetimeBuyers() {
  return useQuery<LifetimeCohort>({
    queryKey: ['admin-lifetime-buyers'],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      // `as never` matches the house pattern for an RPC that is not yet in the
      // generated Database types (see useEmployerCoAdmin). LifetimeBuyer above
      // is the contract until types are regenerated.
      const { data, error } = await supabase.rpc('get_lifetime_buyers' as never);
      if (error) throw error;

      const buyers = (data ?? []) as unknown as LifetimeBuyer[];
      const sum = (rows: LifetimeBuyer[]) =>
        rows.reduce((t, b) => t + (b.amount_pence || 0), 0) / 100;

      return {
        buyers,
        banked: sum(buyers),
        bankedExact: sum(buyers.filter((b) => b.amount_is_exact)),
        exactCount: buyers.filter((b) => b.amount_is_exact).length,
        // Money taken with nothing delivered. Nobody is in this state today,
        // but it is the only thing on the revenue page that would need acting
        // on within the hour, so it is computed rather than eyeballed.
        needsAttention: buyers.filter((b) => !b.fulfilled || !b.user_id),
      };
    },
  });
}
