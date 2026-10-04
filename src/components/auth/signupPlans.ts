/**
 * Plans, prices and wording for the sign-up journey — kept out of
 * SignupShell.tsx so that file exports only components (fast refresh).
 */
import { offerDuration, type OfferTerms } from '@/hooks/useSignupOffer';

export type Plan = 'electrician' | 'apprentice';

export const PLANS: Record<
  Plan,
  { label: string; blurb: string; list: number; planId: string; priceId: string }
> = {
  electrician: {
    label: 'Electrician',
    blurb: 'Certificates, quotes, invoices and every tool.',
    list: 19.99,
    planId: 'electrician-monthly',
    priceId: 'price_1TnbOh2RKw5t5RAmsf2KcHT6',
  },
  apprentice: {
    label: 'Apprentice',
    blurb: 'Training, AM2 prep, portfolio and revision.',
    list: 6.99,
    planId: 'apprentice-monthly',
    priceId: 'price_1TnbOk2RKw5t5RAmiOCTkqS3',
  },
};
export const PLAN_ORDER: Plan[] = ['electrician', 'apprentice'];

export const gbp = (n: number) => `£${n.toFixed(2)}`;

/** Discounted monthly price — the row's stored price, else worked out from the %. */
export const offerPrice = (plan: Plan, terms: OfferTerms) =>
  terms.price ? `£${terms.price}` : gbp(PLANS[plan].list * (1 - terms.percentOff / 100));

export const dayMonth = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });

export const trialEndDate = () => new Date(Date.now() + 7 * 86400000);

/** The whole journey, so every screen shows where it sits in it. */
export const JOURNEY = ['Your details', 'Confirm', 'Free week'] as const;

/** "FIRSTGO25 · 25% off for 6 months" — volt text, never a tinted panel. */
export const offerLabel = (terms: OfferTerms) =>
  `${terms.code} · ${terms.percentOff}% off ${offerDuration(terms.months)}`;

