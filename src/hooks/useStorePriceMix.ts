import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/**
 * What App Store and Play Store subscribers are on.
 *
 * Apple and Google do not expose a per-subscriber price the way Stripe does, so
 * there is no store equivalent of the web price ladder available from the
 * billing side. What exists is our own `billing_events`, which the RevenueCat
 * webhook fills with a store and product id for every event.
 *
 * 🔴 Coverage is partial. `billing_events` starts 1 Aug 2026, so anyone who
 * subscribed on a store before then has no product recorded — about 79 of 130
 * paying store subscribers are covered. The counts are real; the denominator is
 * not the whole store base, and the UI says so rather than implying a full mix.
 */

export interface StoreMixRow {
  store: string;
  product_id: string;
  subscribers: number;
}

export interface StorePriceMix {
  rows: StoreMixRow[];
  /** Store subscribers we can name a product for. */
  covered: number;
  /** All paying store subscribers, trials excluded. */
  store_paying: number;
  events_from: string | null;
  generated_at: string;
}

/**
 * Store product catalogue.
 *
 * Product ids and periods confirmed against App Store Connect (subscription
 * group 21925569) on 10 Sep 2026; Play ids come from the webhook payloads,
 * where Google appends the base plan after a colon. Amounts are the UK list
 * prices — neither store returns the price a given subscriber pays, so this is
 * a lookup in the same spirit as PRICE_TIER_MAP in admin-stripe-stats.
 *
 * The page cross-checks the total these imply against RevenueCat's own MRR, so
 * a wrong or stale amount here shows up as a visible divergence rather than
 * quietly misreporting.
 */
export const STORE_PRODUCTS: Record<
  string,
  { label: string; tier: string; monthly: number; interval: 'month' | 'year'; promo?: boolean }
> = {
  elecmate_apprentice_monthly: {
    label: 'Apprentice monthly',
    tier: 'apprentice',
    monthly: 6.99,
    interval: 'month',
  },
  elecmate_electrician_monthly: {
    label: 'Electrician monthly',
    tier: 'electrician',
    monthly: 19.99,
    interval: 'month',
  },
  elecmate_apprentice_yearly: {
    label: 'Apprentice yearly',
    tier: 'apprentice',
    monthly: 69.99 / 12,
    interval: 'year',
  },
  elecmate_electrician_yearly: {
    label: 'Electrician yearly',
    tier: 'electrician',
    monthly: 199.99 / 12,
    interval: 'year',
  },
  'apprentice_monthly:apprentice-monthly': {
    label: 'Apprentice monthly',
    tier: 'apprentice',
    monthly: 6.99,
    interval: 'month',
  },
  'electrician_monthly:electrician-monthly': {
    label: 'Electrician monthly',
    tier: 'electrician',
    monthly: 19.99,
    interval: 'month',
  },
  rc_promo_apprentice_custom: {
    label: 'Apprentice — comped',
    tier: 'apprentice',
    // A RevenueCat promotional grant. Real access, no money.
    monthly: 0,
    interval: 'month',
    promo: true,
  },
};

export const storeLabel = (s: string) =>
  s === 'APP_STORE' ? 'App Store' : s === 'PLAY_STORE' ? 'Play Store' : 'Promotional';

export function useStorePriceMix() {
  return useQuery<StorePriceMix | null>({
    queryKey: ['admin-store-price-mix'],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_store_price_mix' as never);
      if (error) throw error;
      return (data ?? null) as StorePriceMix | null;
    },
  });
}
