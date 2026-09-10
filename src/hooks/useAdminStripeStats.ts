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

/** One Stripe price and everyone sitting on it. */
export interface PriceLadderRow {
  priceId: string;
  nickname: string | null;
  unitAmount: number;
  interval: string | null;
  tier: string;
  /** Why somebody is on this price, not just what it costs. */
  kind: 'current' | 'winback' | 'founder' | 'legacy';
  count: number;
  mrr: number;
  /** Monthly shortfall against today's list price for the tier. Never negative. */
  belowCurrent: number;
}

export interface DiscountRow {
  subscriptionId: string;
  customerId: string | null;
  email: string | null;
  tier: string;
  couponId: string | null;
  couponName: string | null;
  promotionCode: string | null;
  percentOff: number | null;
  amountOff: number | null;
  listMrr: number;
  actualMrr: number;
  forgoneMrr: number;
  duration: string | null;
  endsAt: string | null;
}

export interface RenewalRow {
  subscriptionId: string;
  email: string | null;
  tier: string;
  /** The lump they get charged, not the monthly twelfth. */
  amount: number;
  renewsAt: string;
  daysAway: number;
  willCancel: boolean;
}

export interface AtRiskRow {
  subscriptionId: string;
  customerId: string | null;
  email: string | null;
  tier: string;
  status: string;
  monthlyAmount: number;
  /** When they became a customer, not when the payment started failing. */
  customerSince: string;
  /** Start of the billing period they have failed to pay for, if Stripe gave one. */
  periodStart: string | null;
}

/** Which scheme an offer belongs to, read from the coupon name we set. */
export type OfferScheme =
  | 'college'
  | 'employer'
  | 'winback'
  | 'referral'
  | 'retention'
  | 'founder'
  | 'other';

export interface OfferRow {
  couponId: string;
  name: string | null;
  scheme: OfferScheme;
  percentOff: number | null;
  amountOff: number | null;
  duration: string | null;
  durationMonths: number | null;
  valid: boolean;
  /** Coupon-level redemptions — includes discounts applied without a code. */
  timesRedeemed: number;
  maxRedemptions: number | null;
  codesIssued: number;
  /** Redemptions that came through a promotion code specifically. */
  codesRedeemed: number;
  activeSubs: number;
  activeForgoneMrr: number;
}

export interface OfferSchemeRow {
  scheme: OfferScheme;
  coupons: number;
  codesIssued: number;
  redeemed: number;
  activeSubs: number;
  activeForgoneMrr: number;
}

export const OFFER_SCHEME_LABELS: Record<OfferScheme, string> = {
  college: 'College 50% scheme',
  employer: 'Employer 50% scheme',
  winback: 'Win-back offers',
  referral: 'Referral — free first month',
  retention: 'Retention offer',
  founder: 'Founder',
  other: 'Other',
};

export interface AdminStripeStats {
  stripe: {
    activeSubscriptions: number;
    trialingSubscriptions?: number;
    tierCounts: Record<string, number>;
    mrr: number;
    /** The same subscribers after their coupons — `mrr` is gross of discounts. */
    mrrNetOfDiscounts?: number;
  };
  /** Like-for-like starts and cancellations, Stripe only. */
  movement?: {
    started14: number;
    started30: number;
    canceled14: number;
    canceled30: number;
    canceledNeverPaid14: number;
    canceledNeverPaid30: number;
    startsLast14: Array<{ created: string; monthlyAmount: number; stillActive: boolean }>;
  };
  /** Every price in use, richest first. Read this, not `subscriptionsByPrice`. */
  priceLadder?: PriceLadderRow[];
  discounts?: { rows: DiscountRow[]; count: number; forgoneMrr: number };
  renewals?: {
    rows: RenewalRow[];
    count: number;
    next90: number;
    next90Amount: number;
    yearAmount: number;
    willCancel: number;
  };
  atRisk?: { rows: AtRiskRow[]; count: number; mrr: number };
  /**
   * Real cash in, from a full walk of Stripe charges — not MRR extrapolated.
   * Refunds subtracted. Cached six hours; `asOf` says when it was counted.
   */
  gross?: {
    allTime: number;
    refunded: number;
    charges: number;
    firstChargeAt: string | null;
    daily: Array<{ day: string; amount: number }>;
    asOf: string;
  };
  /** Every coupon we run, its codes, and its take-up. */
  offers?: {
    rows: OfferRow[];
    schemes: OfferSchemeRow[];
    totalCoupons: number;
    totalCodes: number;
    /** Per-code take-up for the college scheme — Stripe is the only truth here. */
    collegeCodes?: Array<{ code: string; redeemed: number; active: boolean }>;
  };
  supabase?: {
    subscribedUsers: number;
    tierCounts?: Record<string, number>;
  };
  /** Stripe vs Supabase reconciliation, for the integrity checks. */
  discrepancies?: {
    inStripeNotSupabase: number;
    inSupabaseNotStripe: number;
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
