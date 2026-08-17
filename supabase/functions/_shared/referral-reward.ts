/**
 * referral-reward
 *
 * Shared sizing logic for "you both get a month free". Used by the two paths
 * that pay a referrer:
 *   - stripe-subscription-webhook  (web / Stripe subscriptions)
 *   - process-referral-reward      (native / App Store / Play)
 *
 * Both used to size the credit off `profiles.subscription_tier` alone, which
 * is wrong twice over:
 *
 *  1. The tier string lies. Founders on £3.99/mo carry tier 'employer', so a
 *     single referral credited them £49.99 — twelve months free. Legacy rows
 *     ('Electrician', 'founder', 'unknown', null) missed the map entirely and
 *     fell through to a flat £19.99 regardless of what the person pays.
 *
 *  2. It ignored what the referral is actually worth. An employer referring an
 *     apprentice earned £6.99 of new MRR and was credited £49.99 for it.
 *
 * The rule is now min(referrer's month, referee's month): never more than one
 * month of what the referrer actually pays, and never more than the MRR the
 * referral brought in.
 */

// Fallback only — the live subscription is the source of truth. Keep in step
// with src/data/stripePrices.ts.
const TIER_MONTHLY_PENCE: Record<string, number> = {
  apprentice: 699, // £6.99
  apprentice_yearly: 583, // £69.99/yr ÷ 12
  electrician: 1999, // £19.99
  electrician_yearly: 1667, // £199.99/yr ÷ 12
  business_ai: 3999, // £39.99
  business_ai_yearly: 3999,
  employer: 4999, // £49.99
  employer_yearly: 4999,
};

/** Last-resort figure when neither Stripe nor the tier map can answer. */
export const DEFAULT_MONTHLY_PENCE = 1999;

/** Tier lookup, tolerant of the capitalised legacy values ('Electrician'). */
export function tierMonthlyPence(tier: string | null | undefined): number | null {
  if (!tier) return null;
  return TIER_MONTHLY_PENCE[tier.trim().toLowerCase()] ?? null;
}

/** Monthly-equivalent pence for a Stripe price, annualised plans divided down. */
export async function priceMonthlyPence(
  // deno-lint-ignore no-explicit-any
  stripe: any,
  priceId: string
): Promise<number | null> {
  try {
    const price = await stripe.prices.retrieve(priceId);
    if (!price?.unit_amount) return null;
    const interval = price.recurring?.interval;
    const count = price.recurring?.interval_count || 1;
    if (interval === 'year') return Math.round(price.unit_amount / (12 * count));
    if (interval === 'week') return Math.round((price.unit_amount * 52) / (12 * count));
    if (interval === 'day') return Math.round((price.unit_amount * 365) / (12 * count));
    return Math.round(price.unit_amount / count);
  } catch {
    return null;
  }
}

/**
 * What this customer actually pays per month, from their live Stripe
 * subscription. Returns null when they have no chargeable recurring
 * subscription — lifetime buyers, cancelled accounts, and anyone billed by
 * Apple or Google. That is not a number to guess at: a balance credit against
 * a customer with no future invoice is never consumed, so the caller needs to
 * know the difference rather than be handed a plausible figure.
 */
export async function liveMonthlyPence(
  // deno-lint-ignore no-explicit-any
  stripe: any,
  stripeCustomerId: string | null | undefined
): Promise<number | null> {
  if (!stripeCustomerId) return null;
  try {
    const subs = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      status: 'all',
      limit: 10,
    });
    // deno-lint-ignore no-explicit-any
    const chargeable = (subs?.data || []).filter((s: any) =>
      ['active', 'trialing', 'past_due'].includes(s.status)
    );
    if (!chargeable.length) return null;

    let best: number | null = null;
    for (const sub of chargeable) {
      for (const item of sub.items?.data || []) {
        const price = item.price;
        if (!price?.unit_amount) continue;
        const interval = price.recurring?.interval;
        const count = price.recurring?.interval_count || 1;
        const qty = item.quantity || 1;
        let monthly = price.unit_amount * qty;
        if (interval === 'year') monthly = Math.round(monthly / (12 * count));
        else if (interval === 'week') monthly = Math.round((monthly * 52) / (12 * count));
        else if (interval === 'day') monthly = Math.round((monthly * 365) / (12 * count));
        else monthly = Math.round(monthly / count);
        // Their main plan, not a £0 add-on line.
        if (monthly > 0 && (best === null || monthly > best)) best = monthly;
      }
    }
    return best;
  } catch {
    return null;
  }
}

/**
 * The credit to give the referrer: one month free, capped at the value the
 * referral actually brought in.
 *
 * Pass the best figure available for each side; nulls fall back to the tier
 * map and then to DEFAULT_MONTHLY_PENCE, so the credit is never zero and never
 * an accident.
 */
export function referralCreditPence(
  referrerMonthly: number | null,
  refereeMonthly: number | null
): number {
  const referrer = referrerMonthly ?? DEFAULT_MONTHLY_PENCE;
  const referee = refereeMonthly ?? DEFAULT_MONTHLY_PENCE;
  return Math.max(0, Math.min(referrer, referee));
}
