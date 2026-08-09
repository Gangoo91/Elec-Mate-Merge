import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/**
 * Live Stripe subscription stats for the admin surfaces.
 *
 * AdminRevenue already owned this query inline under the key
 * `['admin-stripe-live-stats']`. AdminFounders needed the same payload and was
 * issuing a SECOND `admin-stripe-stats` invocation under its own key
 * (`['admin-stripe-founder-count']`), which walks every active and trialing
 * subscription in Stripe with `expand: ['data.customer', ...]` — a multi-second
 * paginated call — twice per admin session, and let the two pages disagree
 * whenever one refetched and the other did not.
 *
 * Keeping the SAME key here means the two pages share one cache entry and one
 * network call, and can never show different founder counts at the same moment.
 */

export interface AdminStripeSubscription {
  subscriptionId: string;
  customerId: string;
  /**
   * Null, not the string 'N/A'. `admin-stripe-stats` used to bake 'N/A' in,
   * which left the UI no way to fall back to a name we already knew.
   */
  customerEmail: string | null;
  customerName: string | null;
  /** Tier resolved from PRICE_TIER_MAP in the edge function, never guessed from
   *  the amount. `'unknown'` means the price id is unmapped, not "no tier". */
  tier: string;
  /** Needed to separate the live £3.99 founder price from the legacy test
   *  prices that also classify as `founder` (£6.99 and £5.99). */
  priceId: string;
  /** What the customer is actually billed per interval. */
  priceAmount: number;
  /** Normalised to a month, so yearly plans can be summed with monthly ones. */
  monthlyAmount: number;
  interval: string;
  status?: string;
  created: string;
}

export interface AdminStripeStats {
  stripe: {
    activeSubscriptions: number;
    trialingSubscriptions?: number;
    tierCounts: Record<string, number>;
    mrr: number;
  };
  supabase?: {
    subscribedUsers: number;
    tierCounts?: Record<string, number>;
  };
  subscriptions: AdminStripeSubscription[];
  generatedAt: string;
}

export const ADMIN_STRIPE_STATS_QUERY_KEY = ['admin-stripe-live-stats'];

export function useAdminStripeStats() {
  return useQuery<AdminStripeStats>({
    queryKey: ADMIN_STRIPE_STATS_QUERY_KEY,
    refetchInterval: 60000,
    refetchOnWindowFocus: true,
    staleTime: 30000,
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      // The function verifies admin_role from this bearer token. Without it the
      // call 401s and react-query caches the rejection, so fail loudly here.
      if (!session) throw new Error('Not authenticated');

      const { data, error } = await supabase.functions.invoke('admin-stripe-stats', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (error) throw error;
      return data as AdminStripeStats;
    },
  });
}
