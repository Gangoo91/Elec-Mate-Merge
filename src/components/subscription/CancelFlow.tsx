/**
 * CancelFlow
 * ────────────────────────────────────────────────────────────────────────
 * Multi-step cancel-prevention modal. Designed in the spirit of Stripe /
 * Linear / Notion cancellation flows — fast, honest, never adversarial.
 *
 * Flow
 *   1. Pick a reason (six radio cards). Reason is saved immediately so we
 *      capture intent even if the user closes the modal.
 *   2. Intervention chosen BY REASON — see `interventionFor`:
 *        - discount: 40% for 3 months (too expensive, found something better)
 *        - pause:    1-3 months, billing voided (not using it, something else)
 *        - founder:  a real reply from a person (bug, missing feature)
 *      No prices are hardcoded here; see the note above `RETENTION_PERCENT`.
 *   3. Final cancel confirmation. Last-chance copy, no dark patterns.
 *
 * Backend
 *   - cancel_survey_responses row inserted on step 1
 *   - apply-retention-offer edge fn for "stay" path
 *   - cancel-subscription edge fn for "really cancel" path
 *
 * Used from /subscriptions in the "your subscription" card.
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { Loader2, X, ArrowLeft, ArrowRight, Check } from 'lucide-react';

import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import {
  trackCancelFlowOpened,
  trackRetentionOfferShown,
  trackRetentionOfferAccepted,
  trackCancelConfirmed,
} from '@/lib/analytics-events';

// ─── Types ──────────────────────────────────────────────────────────────
type Reason = 'too_expensive' | 'not_using' | 'missing_feature' | 'switching' | 'bug' | 'other';

type Tier = 'apprentice' | 'electrician' | 'employer' | 'business_ai' | string;

interface CancelFlowProps {
  isOpen: boolean;
  onClose: () => void;
  /** Stripe subscription id — required to actually cancel. */
  subscriptionId: string | null;
  /** Current tier — recorded on the survey row; no longer picks the offer. */
  tier: Tier | null;
  /** What Stripe is actually billing, in pence. Null if it couldn't be read. */
  currentAmount?: number | null;
  /** Billing interval, so the copy says "/month" or "/year" correctly. */
  interval?: 'month' | 'year' | null;
  /** Stripe allows one discount per subscription — don't pitch a second. */
  alreadyDiscounted?: boolean;
  /** Already paused — a second pause is refused, so don't pitch that either. */
  alreadyPaused?: boolean;
  /**
   * The live coupon's terms, read off Stripe by get-billing-context. Passed in
   * rather than assumed, so the percentage on screen is the one that will
   * actually be applied. Falls back to the constants below if Stripe couldn't
   * be reached — see the note on RETENTION_PERCENT.
   */
  offerPercentOff?: number | null;
  offerDurationMonths?: number | null;
  /** Friendly first name for the copy. */
  firstName?: string | null;
  /** Called when the user successfully stays (offer accepted or backed out). */
  onStayed?: () => void;
  /** Called after the subscription has actually been cancelled. */
  onCancelled?: () => void;
  /** Admin design preview: walk every step, write nothing, call nothing. */
  preview?: boolean;
}

// ─── Copy / data ────────────────────────────────────────────────────────

/** Structured follow-ups per reason — chips beat free text for analysis.
    The chosen chip is prefixed into reason_detail so downstream analysis
    (weekly churn digest) can aggregate without NLP. */
const REASON_CHIPS: Record<string, { prompt: string; options: string[] }> = {
  switching: {
    prompt: 'Which app are you moving to?',
    options: [
      'iCertifi',
      'TradeCert',
      'CertSuite (Tysoft)',
      'NAPIT EasyCert',
      'NICEIC online certs',
      'iCert Mobile',
      'Clik Cert',
      'Paper certs',
      'Other',
    ],
  },
  too_expensive: {
    prompt: 'What would feel fair?',
    options: [
      'About half the price',
      'Pay per certificate',
      'Free tier + paid extras',
      "Wouldn't pay at any price",
      'Other',
    ],
  },
  not_using: {
    prompt: 'What got in the way?',
    options: [
      'Work changed / less certs',
      'Never got set up properly',
      'Only needed it once',
      'Too complicated',
      'Other',
    ],
  },
};
const REASONS: { id: Reason; label: string; hint: string }[] = [
  {
    id: 'too_expensive',
    label: 'Too expensive',
    hint: 'Cash is tight or the price is more than the value I get',
  },
  {
    id: 'not_using',
    label: 'Not using it enough',
    hint: "Haven't built it into the routine yet",
  },
  {
    id: 'missing_feature',
    label: 'Missing a feature I need',
    hint: 'Something specific is stopping me using it properly',
  },
  {
    id: 'switching',
    label: 'Found something better',
    hint: "I've moved to another tool",
  },
  {
    id: 'bug',
    label: 'Bug or it broke for me',
    hint: 'Something went wrong and I gave up',
  },
  {
    id: 'other',
    label: 'Something else',
    hint: "I'll tell you in a line",
  },
];

/**
 * The offer is a PERCENTAGE, not a tier→price lookup.
 *
 * There used to be a map here: apprentice £5.99→£3.99, electrician
 * £12.99→£9.99, keyed on an exact lowercase tier string. Three things were
 * wrong with it. The prices went stale at the 29 June 2026 rise and quoted
 * figures Stripe would never charge. Annual plans and capitalised tiers
 * (`electrician_yearly`, `Electrician`) missed the map entirely and were sent
 * to the founder route instead of an offer. And the numbers were duplicated in
 * the edge function, so fixing one place fixed nothing.
 *
 * A percentage needs none of that. It is correct for every tier, every
 * interval and every future price, and the pounds shown are derived from the
 * live subscription amount that `get-billing-context` reads off Stripe.
 *
 * The two constants below are FALLBACKS ONLY. The real percentage and duration
 * also come from Stripe — read off the coupon itself by get-billing-context and
 * passed in as `offerPercentOff` / `offerDurationMonths` — because hardcoding
 * "40" here would have been the same drift bug one level up: change the coupon
 * and the modal would quote a discount nobody was getting. These are used only
 * when that read fails, so the modal shows a sensible number rather than a
 * blank. Keep them roughly in step with the coupon.
 */
// 20 Sep 2026: the coupon is ELECMATE_STAY_35 — 35% off for 12 months, i.e.
// £12.99 on the £19.99 electrician price. A null duration anywhere below
// means "for as long as you stay", never "for null months", so a future
// forever coupon renders correctly too.
const RETENTION_PERCENT = 35;
const RETENTION_MONTHS: number | null = 12;
const PAUSE_CHOICES = [1, 2, 3] as const;

type Intervention = 'discount' | 'pause' | 'founder';

/**
 * Which way out to offer, by why they are going.
 *
 * The split matters more than the generosity. 41% of leavers say "not using
 * it" and the single most common thing they write is "only needed it once" or
 * "I passed the exam I used it for". Those people do not want a cheaper
 * subscription — they want to stop paying for the months they have nothing to
 * use it on. Discounting them is answering a question nobody asked, and the
 * numbers agree: one flat discount for everyone saved 12 of 193.
 */
function interventionFor(
  reason: Reason | null,
  alreadyDiscounted: boolean,
  alreadyPaused: boolean
): Intervention {
  // A bug report needs a person, not a price. This is also the only route that
  // has ever demonstrably saved someone on its own, so it stays exactly as is.
  if (reason === 'bug') return 'founder';
  // We cannot act on "missing feature" without knowing which feature, and a
  // discount does not conjure one. Straight to Andrew with the detail attached.
  if (reason === 'missing_feature') return 'founder';
  // Both of these are refused by the server, so offering them would be a
  // button that always fails. One discount per subscription is Stripe's rule;
  // refusing a second pause is ours, so a pause cannot be rolled over forever.
  const wantsPause = reason === 'not_using' || reason === 'other';
  if (alreadyPaused) return 'founder';
  if (alreadyDiscounted) return wantsPause ? 'pause' : 'founder';
  if (wantsPause) return 'pause';
  // too_expensive and switching are both value-for-money judgements.
  return 'discount';
}

/** Pence → "£6.99". Amounts come from Stripe, so they are always in pence. */
function formatPence(pence: number, currency = 'gbp'): string {
  // Intl rather than a '£' literal: the amount and its currency both come from
  // Stripe, and the old version printed a bare "5.99" with no symbol at all for
  // anything that wasn't GBP.
  try {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(pence / 100);
  } catch {
    return `£${(pence / 100).toFixed(2)}`;
  }
}

/**
 * What the discount comes to on this specific subscription. Returns null when
 * the live amount is unknown, and the UI then leads with the percentage alone
 * rather than inventing a figure — the exact amount is confirmed by Stripe on
 * the way back regardless.
 */
function discountedPrice(
  currentAmount: number | null,
  interval: 'month' | 'year' | null,
  percentOff: number
): { was: string; now: string; per: string } | null {
  if (!currentAmount || currentAmount <= 0) return null;
  const now = Math.round(currentAmount * (1 - percentOff / 100));
  return {
    was: formatPence(currentAmount),
    now: formatPence(now),
    per: interval === 'year' ? 'year' : 'month',
  };
}

const DONE_FOUNDER = {
  title: 'Sent to Andrew.',
  lead: 'He reads it himself and replies personally, usually the same day.',
  items: [
    'Your plan carries on as it was, nothing has changed',
    'The reply comes to the email on your account',
    'If it needs fixing, it goes straight on the list',
  ],
};
const doneForPause = (resumes: Date) => ({
  title: 'Paused. See you soon.',
  lead: `Nothing to pay until ${formatMonthDay(resumes)}`,
  items: [
    'Everything you’ve made is kept exactly as you left it',
    'Billing and access come back on together that day',
    'Come back sooner any time from Subscriptions',
  ],
});
const doneForDiscount = (amount: string, months: number | null) => ({
  title: `${amount} a month it is.`,
  lead:
    months === null
      ? `${amount} from your next bill, for as long as you stay`
      : `${amount} from your next bill, for the next ${months} months`,
  items: [
    'Same access, nothing to re-sign',
    'It shows on your next Stripe receipt',
    'Cancel any time, this doesn’t tie you in',
  ],
});

/** Display-only echo of the server's resume date, so the two never disagree. */
function addMonths(d: Date, months: number): Date {
  const out = new Date(d);
  out.setMonth(out.getMonth() + months);
  return out;
}

/** "14 November" — a date someone can hold in their head, no year clutter. */
function formatMonthDay(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
}

/**
 * The server's error codes are for us, not for a person who is halfway out of
 * the door. Anything unrecognised falls through to its own text rather than
 * being swallowed — an unfamiliar message beats a wrong one.
 */
function friendlyOfferError(code?: string): string {
  switch (code) {
    case 'not_your_subscription':
      return 'That subscription is not on this account. Email founder@elec-mate.com and Andrew will sort it.';
    case 'already_discounted':
      return 'You already have a discount on this plan — a second one can’t be added on top.';
    case 'already_paused':
      return 'This subscription is already paused. It’ll start itself back up on the date we gave you.';
    case 'offer_unavailable':
      return 'That offer has just expired. Email founder@elec-mate.com and Andrew will honour it.';
    default:
      return code || 'Could not apply your offer';
  }
}

// ─── Component ──────────────────────────────────────────────────────────
export function CancelFlow({
  isOpen,
  onClose,
  subscriptionId,
  tier,
  currentAmount = null,
  interval = null,
  alreadyDiscounted = false,
  alreadyPaused = false,
  offerPercentOff = null,
  offerDurationMonths = null,
  firstName,
  onStayed,
  onCancelled,
  preview = false,
}: CancelFlowProps) {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const { toast } = useToast();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [reason, setReason] = useState<Reason | null>(null);
  const [detail, setDetail] = useState('');
  const [reasonChip, setReasonChip] = useState<string | null>(null);
  const [founderMsg, setFounderMsg] = useState('');
  const [surveyId, setSurveyId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pauseMonths, setPauseMonths] = useState<number>(2);
  // The screen after a yes. A toast and a page reload felt like being thrown
  // out; this says what changed, in the same place, and hands back control.
  const [done, setDone] = useState<{ title: string; lead: string; items: string[] } | null>(null);
  const followUpRef = useRef<HTMLDivElement | null>(null);

  // On a phone the follow-up to a reason can land below the fold; bring it up.
  useEffect(() => {
    if (!reason) return;
    const t = setTimeout(
      () => followUpRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }),
      60
    );
    return () => clearTimeout(t);
  }, [reason]);

  const safeName = firstName?.trim() || 'mate';
  const intervention = interventionFor(reason, alreadyDiscounted, alreadyPaused);
  // Stripe's numbers win over ours whenever we have them.
  const percentOff = offerPercentOff ?? RETENTION_PERCENT;
  // `null` from get-billing-context means the coupon runs forever; only an
  // absent value falls back to the constant. `??` would swallow the null.
  const durationMonths: number | null =
    offerDurationMonths !== undefined ? offerDurationMonths : RETENTION_MONTHS;
  const forLife = durationMonths === null;
  const priced = discountedPrice(currentAmount, interval, percentOff);

  const INTERVENTION_EVENT: Record<Intervention, string> = {
    discount: 'retention_discount',
    pause: 'retention_pause',
    founder: 'founder_message',
  };

  // Funnel: pairs with cancel_survey_responses so intervention visibility
  // (shown vs accepted) is finally measurable.
  useEffect(() => {
    if (isOpen) trackCancelFlowOpened({ tier });
  }, [isOpen, tier]);
  useEffect(() => {
    if (step !== 2) return;
    trackRetentionOfferShown({ offer: INTERVENTION_EVENT[intervention] });
    // INTERVENTION_EVENT is a module-stable lookup; intervention is the signal.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, intervention]);

  const resetAndClose = () => {
    onClose();
    // Give the close animation a beat before resetting internal state.
    setTimeout(() => {
      setStep(1);
      setReason(null);
      setDetail('');
      setSurveyId(null);
      setIsSubmitting(false);
      // These three were left behind on close, so reopening the modal showed
      // the previous attempt's chip and founder message still filled in — and
      // a stale chip would have been re-saved against the new reason.
      setReasonChip(null);
      setFounderMsg('');
      setPauseMonths(2);
      setDone(null);
    }, 250);
  };

  // ── Step 1 → 2: save the reason, then route to intervention ──────────
  const handleSubmitReason = async () => {
    if (!reason) return;
    // 'Other' with nothing written is the one answer we can do nothing with —
    // it was 36 of the first 163 responses and only 10 said what "other" was.
    if (reason === 'other' && detail.trim().length < 3) {
      toast({
        title: 'A word or two helps',
        description: 'What happened? One line is plenty — it goes straight to Andrew.',
      });
      document.getElementById('cancel-detail')?.focus();
      return;
    }
    // Same problem, worse: every "missing feature" answer in the fortnight to
    // 10 Sep 2026 left this blank, so four people told us a feature was missing
    // and not one told us which. The whole route is "send it to Andrew" — with
    // nothing written there is nothing to send.
    if (reason === 'missing_feature' && detail.trim().length < 3) {
      toast({
        title: 'Which feature?',
        description: "Name it in a few words — that's what decides whether it gets built.",
      });
      document.getElementById('cancel-detail')?.focus();
      return;
    }
    if (preview) {
      setFounderMsg(detail.trim());
      setStep(2);
      return;
    }
    setIsSubmitting(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Decide the intervention we will offer at step 2 so it gets logged
      // alongside the reason (clean analytics — one row per cancel intent).
      const offered = INTERVENTION_EVENT[interventionFor(reason, alreadyDiscounted, alreadyPaused)];

      const { data: inserted, error } = await supabase
        .from('cancel_survey_responses')
        .insert({
          user_id: user.id,
          reason,
          reason_detail: [reasonChip, detail.trim()].filter(Boolean).join(' — ') || null,
          offered_intervention: offered,
          subscription_tier: tier ?? null,
          subscription_id: subscriptionId,
        })
        .select('id')
        .single();
      if (error) throw error;

      setSurveyId(inserted?.id ?? null);
      setFounderMsg(detail.trim());
      setStep(2);
    } catch (err) {
      console.error('[CancelFlow] reason save failed', err);
      toast({
        title: 'Could not save that',
        description: err instanceof Error ? err.message : 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Step 2 action A: accept the offer (discount or pause) ────────────
  // The confirmation quotes figures returned BY STRIPE, not the ones rendered
  // in the modal. If the two ever disagree the user is told the truth, which
  // is the whole failure of the previous version: it promised "£9.99/month"
  // from a constant while Stripe billed £16.99.
  const handleAcceptOffer = async (action: 'discount' | 'pause') => {
    // A bare `return` here meant the button did nothing at all, with no
    // spinner and no message — indistinguishable from a dead tap.
    if (!subscriptionId) {
      toast({
        title: 'Could not find your subscription',
        description: 'Email founder@elec-mate.com and Andrew will sort it personally.',
        variant: 'destructive',
      });
      return;
    }
    if (preview) {
      setDone(
        action === 'pause'
          ? doneForPause(addMonths(new Date(), pauseMonths))
          : doneForDiscount(priced?.now ?? `${percentOff}% off`, durationMonths)
      );
      return;
    }
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('apply-retention-offer', {
        body: {
          subscriptionId,
          surveyId,
          action,
          ...(action === 'pause' ? { pauseMonths } : {}),
        },
      });
      if (error) throw new Error(error.message);
      if (!data?.success) throw new Error(friendlyOfferError(data?.error));

      if (action === 'pause') {
        const resumes = data?.resumes_at
          ? new Date(data.resumes_at)
          : addMonths(new Date(), pauseMonths);
        setDone(doneForPause(resumes));
      } else {
        const amount =
          typeof data?.next_amount === 'number'
            ? formatPence(data.next_amount, data?.next_currency ?? 'gbp')
            : (priced?.now ?? `${data?.percent_off ?? percentOff}% off`);
        const months: number | null = data?.duration_in_months ?? durationMonths;
        setDone(doneForDiscount(amount, months));
      }

      trackRetentionOfferAccepted({
        offer: action === 'pause' ? 'retention_pause' : 'retention_discount',
      });
    } catch (err) {
      console.error('[CancelFlow] offer accept failed', err);
      toast({
        title: action === 'pause' ? 'Could not pause' : 'Could not apply your offer',
        description: err instanceof Error ? err.message : 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Step 2 action B: message founder ─────────────────────────────────
  // In-app send, not mailto: the message is saved to the survey row FIRST so
  // it can never be lost (mailto silently no-ops without a mail client — we
  // lost a paying customer's bug report that way, July 2026).
  const handleMessageFounder = async () => {
    const message = founderMsg.trim();
    if (reason === 'bug' && message.length < 5) {
      toast({
        title: 'Tell us what broke',
        description: 'A sentence is enough — it goes straight to Andrew.',
        variant: 'destructive',
      });
      return;
    }
    if (preview) {
      setDone(DONE_FOUNDER);
      return;
    }
    setIsSubmitting(true);
    try {
      // 1. The message lives in the database whatever happens next.
      //
      // Merged into reason_detail rather than replacing it. The old version
      // assigned `message || null` straight over the top, so the chip the user
      // had already tapped ("Only needed it once", "About half the price") was
      // destroyed the moment they typed anything — and wiped to NULL entirely
      // if they cleared the box. That chip is the only structured signal on
      // most rows, and the digest aggregates on it.
      if (surveyId) {
        const existing = [reasonChip, detail.trim()].filter(Boolean).join(' — ');
        const merged = [existing, message].filter(Boolean).join(' — ');
        await supabase
          .from('cancel_survey_responses')
          .update({
            reason_detail: merged || null,
            outcome: 'stayed',
            outcome_at: new Date().toISOString(),
            intervention_applied: { kind: 'founder_message' },
          })
          .eq('id', surveyId);
      }
      // 2. Email Andrew — reply-to is the user, so replies just work
      const { error } = await supabase.functions.invoke('send-certificate-resend', {
        body: { founderContactMode: true, message, reason: reason ?? 'unknown', tier: tier ?? '' },
      });
      if (error) throw new Error(error.message);

      trackRetentionOfferAccepted({ offer: 'founder_message' });
      setDone(DONE_FOUNDER);
    } catch (err) {
      console.error('[CancelFlow] founder message failed', err);
      toast({
        title: 'Could not send',
        description: 'Email founder@elec-mate.com directly and Andrew will pick it up.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Step 3: actually cancel ──────────────────────────────────────────
  const handleConfirmCancel = async () => {
    if (!subscriptionId) {
      toast({
        title: 'No subscription to cancel',
        description: 'Please email info@elec-mate.com and we will sort it.',
        variant: 'destructive',
      });
      return;
    }
    if (preview) {
      toast({ title: 'Preview only', description: 'Nothing was cancelled.' });
      return;
    }
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('cancel-subscription', {
        body: {
          subscriptionId,
          reason,
          detail: [reasonChip, detail.trim()].filter(Boolean).join(' / '),
        },
      });
      if (error) throw new Error(error.message);
      if (!data?.success) throw new Error(data?.message || 'Cancellation failed');

      if (surveyId) {
        await supabase
          .from('cancel_survey_responses')
          .update({ outcome: 'cancelled', outcome_at: new Date().toISOString() })
          .eq('id', surveyId);
      }

      const accessUntil: string | null = data?.access_until ?? null;
      toast({
        title: 'Subscription cancelled',
        description: accessUntil
          ? `You keep full access until ${formatMonthDay(new Date(accessUntil))}. Everything you’ve made stays in your account after that.`
          : 'Your data is safe for 90 days if you change your mind.',
      });

      trackCancelConfirmed({ reason: reason ?? undefined });
      onCancelled?.();
      resetAndClose();
    } catch (err) {
      console.error('[CancelFlow] cancel failed', err);
      toast({
        title: 'Could not cancel',
        description: err instanceof Error ? err.message : 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Step renderers ───────────────────────────────────────────────────
  // The app's form language throughout: a hairline list instead of boxed
  // cards, chips for the one-tap follow-up, underline fields, and the price
  // as a figure on the page rather than inside a coloured box.
  const detailLabel =
    reason === 'missing_feature'
      ? "What's the missing feature?"
      : reason === 'switching'
        ? 'Which tool did you switch to?'
        : reason === 'bug'
          ? 'What broke?'
          : 'What happened?';
  // Switching already asks "which app" with chips, so the box only appears
  // for "Other"; the other free-text reasons need the box to mean anything.
  const wantsDetail =
    reason === 'missing_feature' ||
    reason === 'bug' ||
    reason === 'other' ||
    (reason !== null && reasonChip === 'Other');

  const renderStep = () => {
    if (done) {
      return (
        <StepShell eyebrow="All done" title={done.title}>
          <Facts lead={done.lead} items={done.items} />
        </StepShell>
      );
    }

    if (step === 1) {
      return (
        <StepShell
          eyebrow="Before you go"
          title={`What's not working, ${safeName}?`}
          subtitle="Pick the closest one. It takes five seconds and it decides what gets fixed."
        >
          <div role="radiogroup" className="border-t border-white/[0.08]">
            {REASONS.map((r) => {
              const active = reason === r.id;
              const chips = REASON_CHIPS[r.id];
              return (
                <div key={r.id} className="border-b border-white/[0.08]">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => {
                      setReason(r.id);
                      setReasonChip(null);
                    }}
                    className="flex min-h-[60px] w-full touch-manipulation items-center gap-3.5 py-3 text-left transition-colors hover:bg-white/[0.03] active:bg-white/[0.06]"
                  >
                    <RadioMark on={active} />
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          'block text-[15px] font-semibold leading-5',
                          active ? 'text-elec-yellow' : 'text-white'
                        )}
                      >
                        {r.label}
                      </span>
                      <span className="mt-0.5 block text-[13px] leading-[18px] text-white">
                        {r.hint}
                      </span>
                    </span>
                  </button>

                  {/* The follow-up sits under the answer it belongs to, not at
                      the bottom of the list. */}
                  {active && (chips || wantsDetail) && (
                    <div ref={followUpRef} className="pb-4 pl-[34px]">
                      {chips && (
                        <>
                          <p className="mt-1 text-[13px] font-medium text-white">{chips.prompt}</p>
                          <div className="mt-2.5 grid grid-cols-2 gap-2">
                            {chips.options.map((opt, idx) => {
                              const on = reasonChip === opt;
                              const lastOdd =
                                idx === chips.options.length - 1 && chips.options.length % 2 === 1;
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  aria-pressed={on}
                                  onClick={() => setReasonChip(on ? null : opt)}
                                  className={cn(
                                    'h-11 touch-manipulation rounded-full border px-3 text-[13px] leading-tight transition-colors',
                                    lastOdd && 'col-span-2',
                                    on
                                      ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                                      : 'border-white/[0.14] bg-white/[0.04] font-medium text-white hover:border-white/30'
                                  )}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </>
                      )}
                      {wantsDetail && (
                        <div className={cn(chips && 'mt-4')}>
                          <label
                            htmlFor="cancel-detail"
                            className="block text-[13px] font-medium text-white"
                          >
                            {detailLabel}
                          </label>
                          <textarea
                            id="cancel-detail"
                            value={detail}
                            onChange={(e) => setDetail(e.target.value)}
                            rows={2}
                            maxLength={500}
                            placeholder="A line is enough"
                            className={UNDERLINE_FIELD}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </StepShell>
      );
    }

    if (step === 2) {
      if (intervention === 'founder') {
        return (
          <StepShell
            eyebrow={reason === 'bug' ? "Let's fix this" : 'One last thing'}
            title={
              reason === 'bug'
                ? 'Tell Andrew what broke.'
                : reason === 'missing_feature'
                  ? `${safeName}, this one goes on the build list.`
                  : `${safeName}, give Andrew a minute first?`
            }
            subtitle={
              reason === 'bug'
                ? 'Most bugs are fixed the same day. Replies come from the founder, not a queue.'
                : reason === 'missing_feature'
                  ? 'Andrew reads these himself and they decide what gets built next. He’ll tell you straight whether it’s coming.'
                  : 'He reads every one of these personally. If there’s anything he can do, he will.'
            }
          >
            <div className="border-t border-white/[0.08] pt-4">
              <label htmlFor="cancel-founder" className="block text-[13px] font-medium text-white">
                Your message
              </label>
              <textarea
                id="cancel-founder"
                value={founderMsg}
                onChange={(e) => setFounderMsg(e.target.value)}
                rows={4}
                placeholder={
                  reason === 'bug' ? 'What broke, and where in the app?' : 'A line is enough'
                }
                className={UNDERLINE_FIELD}
              />
              <p className="mt-3 text-[12px] leading-[18px] text-white">
                Or email founder@elec-mate.com if you’d rather.
              </p>
            </div>
          </StepShell>
        );
      }

      // ── Pause ────────────────────────────────────────────────────────
      // For the people who say "only needed it once" or "I passed the exam I
      // used it for". Nothing to sell them this month; everything to keep.
      if (intervention === 'pause') {
        return (
          <StepShell
            eyebrow="Come back when you need it"
            title={`Pause it instead, ${safeName}?`}
            subtitle="Stop paying now and pick up where you left off later. Certificates, quotes and progress all stay exactly where they are."
          >
            <div className="grid grid-cols-3 gap-2">
              {PAUSE_CHOICES.map((m) => {
                const on = pauseMonths === m;
                return (
                  <button
                    key={m}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setPauseMonths(m)}
                    className={cn(
                      'h-12 touch-manipulation rounded-full border text-[14px] transition-colors',
                      on
                        ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                        : 'border-white/[0.14] bg-white/[0.04] font-medium text-white hover:border-white/30'
                    )}
                  >
                    {m} {m === 1 ? 'month' : 'months'}
                  </button>
                );
              })}
            </div>
            {/* Says plainly that access stops too. A "pause" that quietly left
                the product switched on would be a betrayal the first time
                someone noticed they'd been locked out without being told. */}
            <Facts
              lead={`Nothing to pay until ${formatMonthDay(addMonths(new Date(), pauseMonths))}`}
              items={[
                'Everything you’ve made is kept exactly as you left it',
                'Access goes on hold with the billing, and both come back on that day',
                'Come back sooner any time, one tap',
              ]}
            />
            <FounderLine onClick={handleMessageFounder} />
          </StepShell>
        );
      }

      // ── Discount ─────────────────────────────────────────────────────
      // `priced` is derived from the live Stripe amount. When it is missing we
      // lead with the percentage rather than printing a price we cannot stand
      // behind — Stripe confirms the exact figure on the way back either way.
      const forCopy = forLife
        ? 'for as long as you stay'
        : priced?.per === 'year'
          ? 'on your next renewal'
          : `for ${durationMonths} months`;
      // What it adds up to: the monthly saving times the months it runs.
      const saving =
        currentAmount && !forLife && durationMonths && priced?.per === 'month'
          ? `${formatPence(Math.round(currentAmount * (percentOff / 100)) * durationMonths)} over ${durationMonths} months`
          : currentAmount && priced?.per === 'year'
            ? `${formatPence(Math.round(currentAmount * (percentOff / 100)))} on your next renewal`
            : null;
      return (
        <StepShell
          eyebrow="Stay on for less"
          title={
            priced
              ? `${priced.now} a ${priced.per}, ${safeName}?`
              : `${percentOff}% off, ${safeName}?`
          }
          subtitle="Same access, nothing to re-sign. It comes off your next bill."
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-white">
            <span className="text-[52px] font-semibold leading-none tracking-[-0.03em] tabular-nums">
              {priced ? priced.now : `${percentOff}%`}
            </span>
            <span className="text-[15px]">{priced ? `a ${priced.per}` : 'off'}</span>
            {priced && (
              <span className="text-[15px]">
                usually <span className="line-through decoration-white/50">{priced.was}</span>
              </span>
            )}
          </div>
          <Facts
            items={[
              `${percentOff}% off every bill, ${forCopy}`,
              ...(saving ? [`You save ${saving}`] : []),
              'Starts on your next bill, nothing to re-sign',
              'No tie-in, cancel any time',
            ]}
          />
          <FounderLine onClick={handleMessageFounder} />
        </StepShell>
      );
    }

    // Step 3 — final confirm
    return (
      <StepShell
        eyebrow="Last check"
        title={`Cancel for sure, ${safeName}?`}
        subtitle="Renewal switches off. You keep everything until the end of the period you’ve already paid for."
      >
        <Facts
          lead={`${tierName(tier)} plan stops renewing`}
          items={[
            'No further charges',
            'Access runs to the end of the period you’ve paid for',
            'Your data is safe for 90 days after that. Resubscribe and it’s all back',
          ]}
        />
      </StepShell>
    );
  };

  // ── Footer (varies by step) ──────────────────────────────────────────
  const busy = isSubmitting;
  const spinner = <Loader2 className="h-4 w-4 animate-spin" />;
  const renderFooter = () => {
    if (done) {
      return (
        <FooterRow>
          <button
            type="button"
            onClick={() => {
              onStayed?.();
              resetAndClose();
            }}
            className={PRIMARY_BTN}
          >
            Back to my account
          </button>
        </FooterRow>
      );
    }

    if (step === 1) {
      return (
        <FooterRow>
          <button type="button" onClick={resetAndClose} disabled={busy} className={GHOST_BTN}>
            Keep my plan
          </button>
          {/* One tap on the follow-up is required where one exists. Optional,
              it was never used: reason_detail fill fell 50% → 12% → 0 of 18
              in a week once the chip became skippable. This never blocks the
              cancellation itself, only advancing without answering. */}
          <button
            type="button"
            onClick={handleSubmitReason}
            disabled={!reason || Boolean(REASON_CHIPS[reason] && !reasonChip) || busy}
            className={PRIMARY_BTN}
          >
            {busy ? (
              spinner
            ) : (
              <>
                Continue
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </>
            )}
          </button>
        </FooterRow>
      );
    }

    if (step === 2) {
      return (
        <FooterRow left={<BackButton onClick={() => setStep(1)} disabled={busy} />}>
          <button type="button" onClick={() => setStep(3)} disabled={busy} className={GHOST_BTN}>
            No thanks, cancel
          </button>
          {intervention === 'founder' ? (
            <button
              type="button"
              onClick={handleMessageFounder}
              disabled={busy}
              className={PRIMARY_BTN}
            >
              {busy ? spinner : 'Send to Andrew'}
            </button>
          ) : intervention === 'pause' ? (
            <button
              type="button"
              onClick={() => handleAcceptOffer('pause')}
              disabled={busy}
              className={PRIMARY_BTN}
            >
              {busy
                ? spinner
                : `Pause for ${pauseMonths} ${pauseMonths === 1 ? 'month' : 'months'}`}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleAcceptOffer('discount')}
              disabled={busy}
              className={PRIMARY_BTN}
            >
              {busy
                ? spinner
                : priced
                  ? `Yes, ${priced.now} a ${priced.per}`
                  : `Yes, ${percentOff}% off`}
            </button>
          )}
        </FooterRow>
      );
    }

    return (
      <FooterRow left={<BackButton onClick={() => setStep(2)} disabled={busy} />}>
        <button type="button" onClick={resetAndClose} disabled={busy} className={GHOST_BTN}>
          Keep my plan
        </button>
        <button
          type="button"
          onClick={handleConfirmCancel}
          disabled={busy}
          className={cn(PRIMARY_BTN, 'bg-[#d9483b] text-white hover:bg-[#c53f33]')}
        >
          {busy ? spinner : 'Cancel subscription'}
        </button>
      </FooterRow>
    );
  };

  const content = (
    <div className="flex h-full min-h-0 flex-col bg-background bg-gradient-to-b from-white/[0.08] to-white/[0.04]">
      {/* Where you are, and the way out */}
      <div className="flex items-center justify-between px-6 pt-5 sm:px-8">
        <div className="flex items-center gap-1.5" aria-label={`Step ${step} of 3`}>
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn(
                'h-1 w-7 rounded-full transition-colors',
                done || i <= step ? 'bg-elec-yellow' : 'bg-white/[0.14]'
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={resetAndClose}
          disabled={isSubmitting}
          className="-mr-2 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full text-white transition-colors hover:bg-white/[0.06]"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Body */}
      <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-2 sm:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={done ? 'done' : step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="border-t border-white/[0.1] px-6 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-8">
        {renderFooter()}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={(open) => !open && resetAndClose()}>
        <SheetContent
          side="bottom"
          hideCloseButton
          className="h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.14] p-0"
        >
          <VisuallyHidden>
            <DialogTitle>Cancel subscription</DialogTitle>
            <DialogDescription>
              We&apos;ll ask a quick question and offer a way to stay before we cancel.
            </DialogDescription>
          </VisuallyHidden>
          {content}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && resetAndClose()} modal>
      {/* max-h + flex-col so the footer (with the Cancel button) can never be
          pushed below the viewport on short laptop screens — the body scrolls
          instead. A user reported physically not being able to cancel. */}
      <DialogContent
        hideCloseButton
        className="flex max-h-[85dvh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/[0.14] bg-background p-0 shadow-[0_30px_120px_rgba(0,0,0,0.6)] outline-none focus:outline-none focus-visible:outline-none"
      >
        <VisuallyHidden>
          <DialogTitle>Cancel subscription</DialogTitle>
          <DialogDescription>
            We&apos;ll ask a quick question and offer a way to stay before we cancel.
          </DialogDescription>
        </VisuallyHidden>
        {content}
      </DialogContent>
    </Dialog>
  );
}

// ─── Small visual primitives ────────────────────────────────────────────
// The same shapes as the rest of the app: underline fields, chips, hairline
// rows, one yellow. Nothing here is boxed.

const UNDERLINE_FIELD =
  'textarea-soft mt-1 w-full resize-none rounded-none border-0 border-b border-white/[0.15] bg-transparent px-0 py-2 text-[15px] leading-[1.5] text-white caret-elec-yellow placeholder:text-white/35 outline-none transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 touch-manipulation';
const GHOST_BTN =
  'inline-flex h-11 touch-manipulation items-center rounded-full px-4 text-[14px] font-medium text-white transition-colors hover:bg-white/[0.06] disabled:opacity-40';
const PRIMARY_BTN =
  'inline-flex h-12 touch-manipulation items-center justify-center rounded-full bg-elec-yellow px-6 text-[14px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 disabled:opacity-40';

function tierName(tier: Tier | null): string {
  const t = (tier ?? 'Subscription')
    .toString()
    .toLowerCase()
    .replace('_yearly', '')
    .replace('_', ' ');
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function StepShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-5 pb-4 pt-3">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
          {eyebrow}
        </p>
        <h2 className="mt-1.5 text-[24px] font-semibold leading-[28px] tracking-[-0.02em] text-white sm:text-[26px] sm:leading-[30px]">
          {title}
        </h2>
        {subtitle && <p className="mt-2 text-[14px] leading-[21px] text-white">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function RadioMark({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors',
        on ? 'border-elec-yellow bg-elec-yellow' : 'border-white/[0.3]'
      )}
    >
      {on && <span className="h-2 w-2 rounded-full bg-black" />}
    </span>
  );
}

/** Label on the left, the fact on the right, a hairline between each. */
function Facts({ lead, items }: { lead?: React.ReactNode; items: string[] }) {
  return (
    <div className="border-t border-white/[0.08] pt-4 text-white">
      {lead && <p className="text-[17px] font-semibold leading-6">{lead}</p>}
      <ul className={cn('space-y-2.5', lead && 'mt-3')}>
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2.5 text-[14px] leading-5">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-elec-yellow"
              strokeWidth={2.5}
              aria-hidden
            />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FounderLine({ onClick }: { onClick: () => void }) {
  return (
    <p className="text-[13px] leading-[18px] text-white">
      Rather talk to someone?{' '}
      <button
        type="button"
        onClick={onClick}
        className="touch-manipulation font-semibold text-elec-yellow"
      >
        Message Andrew
      </button>
      . He replies the same day.
    </p>
  );
}

function BackButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="-ml-2 inline-flex h-11 touch-manipulation items-center gap-1 rounded-full px-2 text-[14px] font-medium text-white transition-colors hover:bg-white/[0.06] disabled:opacity-40"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </button>
  );
}

function FooterRow({ children, left }: { children: React.ReactNode; left?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="shrink-0">{left ?? <span className="w-0" />}</div>
      <div className="flex flex-1 items-center justify-end gap-2">{children}</div>
    </div>
  );
}
