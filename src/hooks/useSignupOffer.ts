import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { supabase } from '@/integrations/supabase/client';

/**
 * What an offer code is actually worth, from the live Stripe coupon via the
 * `describe-offer` edge function — never hard-coded copy (see that function's
 * header for why). Works signed out, so the sign-up page can show
 * "25% off for 6 months — £14.99/mo" before an account exists.
 *
 * `sibling` is the same offer for the other plan (FIRSTGO25 ↔ FIRSTGO25APP),
 * so choosing the plan the link wasn't for keeps the discount.
 *
 * Returns null on native: App Store / Play purchases can't take these codes,
 * so the app must not promise a discount it won't apply.
 */
export type OfferPlan = 'electrician' | 'apprentice';

export interface OfferTerms {
  code: string;
  planId: OfferPlan;
  /** Discounted monthly price, e.g. "14.99" — null if the row has none */
  price: string | null;
  percentOff: number;
  /** null = forever */
  months: number | null;
}

export interface SignupOffer {
  main: OfferTerms;
  sibling: OfferTerms | null;
}

type Raw = {
  valid?: boolean;
  code?: string;
  plan_id?: string;
  price?: string | number | null;
  percent_off?: number;
  duration_in_months?: number | null;
};

const toTerms = (r: Raw | null | undefined): OfferTerms | null =>
  r && r.code && (r.plan_id === 'electrician' || r.plan_id === 'apprentice') && r.percent_off
    ? {
        code: r.code,
        planId: r.plan_id,
        // promo_offers.price is numeric — 5.2 must read £5.20, not £5.2.
        price:
          r.price === null || r.price === undefined || r.price === ''
            ? null
            : Number(r.price).toFixed(2),
        percentOff: r.percent_off,
        months: r.duration_in_months ?? null,
      }
    : null;

export function useSignupOffer(code: string | null | undefined) {
  const [offer, setOffer] = useState<SignupOffer | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!code || Capacitor.isNativePlatform()) {
      setOffer(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    supabase.functions
      .invoke('describe-offer', { body: { code } })
      .then(({ data }) => {
        if (cancelled) return;
        const d = data as (Raw & { sibling?: Raw | null }) | null;
        const main = d?.valid ? toTerms(d) : null;
        setOffer(main ? { main, sibling: toTerms(d?.sibling) } : null);
      })
      .catch(() => {
        if (!cancelled) setOffer(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [code]);

  return { offer, loading };
}

/** The terms that apply to a plan, if the offer (or its partner) covers it. */
export function offerForPlan(offer: SignupOffer | null, plan: string | null | undefined) {
  if (!offer || !plan) return null;
  if (offer.main.planId === plan) return offer.main;
  if (offer.sibling?.planId === plan) return offer.sibling;
  return null;
}

/** "for 6 months" / "for your first month" / "for as long as you're subscribed" */
export function offerDuration(months: number | null) {
  if (months === null) return "for as long as you're subscribed";
  if (months === 1) return 'for your first month';
  return `for ${months} months`;
}
