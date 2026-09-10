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
import { Loader2, X, ArrowLeft, ArrowRight, Heart, MessageCircleHeart } from 'lucide-react';

import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Button } from '@/components/ui/button';
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
}

// ─── Copy / data ────────────────────────────────────────────────────────

/** Structured follow-ups per reason — chips beat free text for analysis.
    The chosen chip is prefixed into reason_detail so downstream analysis
    (weekly churn digest) can aggregate without NLP. */
const REASON_CHIPS: Record<string, { prompt: string; options: string[] }> = {
  switching: {
    prompt: 'Which app are you moving to?',
    options: ['iCertifi', 'CertSuite (Tysoft)', 'NAPIT EasyCert', 'iCert Mobile', 'Paper certs', 'Other'],
  },
  too_expensive: {
    prompt: 'What would feel fair?',
    options: ['About half the price', 'Pay per certificate', 'Free tier + paid extras', "Wouldn't pay at any price", 'Other'],
  },
  not_using: {
    prompt: 'What got in the way?',
    options: ['Work changed / less certs', 'Never got set up properly', 'Only needed it once', 'Too complicated', 'Other'],
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
const RETENTION_PERCENT = 40;
const RETENTION_MONTHS = 3;
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

  const safeName = firstName?.trim() || 'mate';
  const intervention = interventionFor(reason, alreadyDiscounted, alreadyPaused);
  // Stripe's numbers win over ours whenever we have them.
  const percentOff = offerPercentOff ?? RETENTION_PERCENT;
  const durationMonths = offerDurationMonths ?? RETENTION_MONTHS;
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
          reason_detail:
            [reasonChip, detail.trim()].filter(Boolean).join(' — ') || null,
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
        const resumes = data?.resumes_at ? new Date(data.resumes_at) : null;
        toast({
          title: `Paused until ${resumes ? formatMonthDay(resumes) : 'you’re back'}`,
          description:
            'Nothing to pay and nothing to do — everything you’ve made is kept, and it switches itself back on that day.',
        });
      } else {
        const amount =
          typeof data?.next_amount === 'number'
            ? formatPence(data.next_amount, data?.next_currency ?? 'gbp')
            : null;
        toast({
          title: `${data?.percent_off ?? percentOff}% off — sorted`,
          description: amount
            ? `${amount} on your next bill, then for ${data?.duration_in_months ?? durationMonths} months.`
            : 'Applied to your next bill.',
        });
      }

      trackRetentionOfferAccepted({
        offer: action === 'pause' ? 'retention_pause' : 'retention_discount',
      });
      onStayed?.();
      resetAndClose();
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

      toast({
        title: 'Sent to Andrew',
        description: 'He replies personally, usually the same day.',
      });
      trackRetentionOfferAccepted({ offer: 'founder_message' });
      onStayed?.();
      resetAndClose();
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
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('cancel-subscription', {
        body: { subscriptionId },
      });
      if (error) throw new Error(error.message);
      if (!data?.success) throw new Error(data?.message || 'Cancellation failed');

      if (surveyId) {
        await supabase
          .from('cancel_survey_responses')
          .update({ outcome: 'cancelled', outcome_at: new Date().toISOString() })
          .eq('id', surveyId);
      }

      toast({
        title: 'Subscription cancelled',
        description: 'Your data is safe for 90 days if you change your mind.',
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
  const renderStep = () => {
    if (step === 1) {
      return (
        <StepShell
          eyebrow="Before you go"
          title={`What's not working, ${safeName}?`}
          subtitle="Pick the closest one. Takes 5 seconds and helps us actually fix it."
        >
          <div className="space-y-2">
            {REASONS.map((r) => {
              const active = reason === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setReason(r.id);
                    setReasonChip(null);
                  }}
                  className={cn(
                    'w-full touch-manipulation rounded-2xl border p-4 text-left transition-all',
                    active
                      ? 'border-yellow-400/70 bg-yellow-400/[0.06]'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/25'
                  )}
                >
                  <p
                    className={cn(
                      'text-[15px] font-semibold leading-tight',
                      active ? 'text-yellow-300' : 'text-white'
                    )}
                  >
                    {r.label}
                  </p>
                  <p className="mt-1 text-[13px] leading-snug text-white">{r.hint}</p>
                </button>
              );
            })}
          </div>

          {reason && REASON_CHIPS[reason] && (
            <div className="mt-4">
              <p className="mb-2 text-[13px] font-medium text-white">
                {REASON_CHIPS[reason].prompt}
              </p>
              <div className="flex flex-wrap gap-2">
                {REASON_CHIPS[reason].options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setReasonChip(reasonChip === opt ? null : opt)}
                    className={cn(
                      'h-11 px-3.5 rounded-xl text-[13px] font-medium touch-manipulation transition-colors border',
                      reasonChip === opt
                        ? 'bg-yellow-400/[0.12] text-yellow-300 border-yellow-400/60'
                        : 'bg-white/[0.04] text-white border-white/[0.12] hover:border-white/25'
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {(reason === 'missing_feature' ||
            reason === 'switching' ||
            reason === 'bug' ||
            reason === 'other' ||
            (reason && reasonChip === 'Other')) && (
            <div className="mt-4">
              <label
                htmlFor="cancel-detail"
                className="mb-2 block text-[13px] font-medium text-white"
              >
                {reason === 'missing_feature'
                  ? "What's the missing feature?"
                  : reason === 'switching'
                    ? 'Which tool did you switch to?'
                    : reason === 'bug'
                      ? 'What broke?'
                      : 'What happened?'}
              </label>
              <textarea
                id="cancel-detail"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                rows={3}
                maxLength={500}
                placeholder="One line is plenty — it goes straight to Andrew."
                className="w-full touch-manipulation rounded-2xl border border-white/[0.12] bg-white/[0.04] px-4 py-3 text-[15px] leading-[1.5] text-white placeholder:text-white/35 outline-none focus:border-yellow-400/70 focus:bg-white/[0.06] focus:ring-2 focus:ring-yellow-400/20"
              />
            </div>
          )}
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
                ? "Send Andrew a message — he'll personally sort it."
                : reason === 'missing_feature'
                  ? `${safeName}, this one goes on the build list.`
                  : `${safeName}, mind giving Andrew a minute first?`
            }
            subtitle={
              reason === 'bug'
                ? "Most bugs get fixed the same day. It's a small team — replies come from the founder, not a queue."
                : reason === 'missing_feature'
                  ? 'Andrew reads these himself and they genuinely decide what gets built next. He’ll tell you straight whether it’s coming.'
                  : "He reads every cancel email personally. If there's anything he can do, he will."
            }
          >
            <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/[0.06] p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-yellow-400/20 p-2">
                  <MessageCircleHeart className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-semibold text-white">Message the founder</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-white">
                    Goes straight to Andrew — replies come from him, not a queue.
                  </p>
                </div>
              </div>
              <textarea
                value={founderMsg}
                onChange={(e) => setFounderMsg(e.target.value)}
                placeholder={
                  reason === 'bug'
                    ? 'What broke? Where were you in the app when it happened?'
                    : "What's on your mind?"
                }
                className="mt-4 w-full min-h-[110px] rounded-xl bg-white/[0.08] border border-white/[0.16] px-4 py-3 text-[15px] text-white placeholder:text-white/45 outline-none focus:border-yellow-500/60 touch-manipulation"
              />
              <p className="mt-2 text-[11.5px] text-white">
                Or email founder@elec-mate.com directly if you prefer.
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
            title={`Want to just pause it instead, ${safeName}?`}
            subtitle="Stop paying now, pick up where you left off later. Your certificates, quotes and progress are all kept — the subscription just goes quiet and starts itself back up on the date you choose."
          >
            <div className="rounded-3xl border border-yellow-400/40 bg-gradient-to-br from-yellow-400/[0.10] via-yellow-400/[0.04] to-transparent p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-yellow-300">
                Pause for
              </p>
              <div className="mt-3 flex gap-2">
                {PAUSE_CHOICES.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPauseMonths(m)}
                    className={cn(
                      'h-11 flex-1 touch-manipulation rounded-xl border text-[14px] font-semibold transition-colors',
                      pauseMonths === m
                        ? 'border-yellow-400 bg-elec-yellow text-black'
                        : 'border-white/[0.12] bg-white/[0.04] text-white hover:border-white/25'
                    )}
                  >
                    {m} {m === 1 ? 'month' : 'months'}
                  </button>
                ))}
              </div>
              {/* Says plainly that access stops too. A "pause" that quietly
                  left the product switched on would be a pleasant surprise for
                  about a week and a betrayal the first time someone noticed
                  they'd been locked out without being told. */}
              <p className="mt-4 text-[13px] leading-relaxed text-white">
                Nothing to pay until {formatMonthDay(addMonths(new Date(), pauseMonths))}. The app
                goes on hold until then — your work is all still here waiting, and billing and
                access both switch back on together. Come back sooner any time.
              </p>
            </div>

            <p className="mt-4 text-center text-[12px] text-white">
              Rather talk to someone?{' '}
              <button
                type="button"
                onClick={handleMessageFounder}
                className="touch-manipulation underline decoration-white/35 underline-offset-4"
              >
                Message Andrew
              </button>{' '}
              — he replies same day.
            </p>
          </StepShell>
        );
      }

      // ── Discount ─────────────────────────────────────────────────────
      // `priced` is derived from the live Stripe amount. When it is missing we
      // lead with the percentage rather than printing a price we cannot stand
      // behind — Stripe confirms the exact figure on the way back either way.
      return (
        <StepShell
          eyebrow="Stay on for less"
          title={
            priced
              ? `How about ${priced.now}/${priced.per}, ${safeName}?`
              : `How about ${percentOff}% off, ${safeName}?`
          }
          subtitle={
            priced?.per === 'year'
              ? `Same access, ${percentOff}% off your next renewal. No catch and no re-signing — it just comes off the bill.`
              : `Same access, ${percentOff}% off for your next ${durationMonths} months. No catch and no re-signing — it just comes off your next bill.`
          }
        >
          <div className="rounded-3xl border border-yellow-400/40 bg-gradient-to-br from-yellow-400/[0.10] via-yellow-400/[0.04] to-transparent p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-yellow-300">
                  {priced ? 'Your new price' : 'Your discount'}
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold leading-none tracking-tight text-white">
                    {priced ? priced.now : `${percentOff}%`}
                  </span>
                  <span className="text-base text-white">
                    {priced ? `/${priced.per}` : 'off'}
                  </span>
                </div>
                {priced && (
                  <p className="mt-2 text-[13px] text-white">
                    Was <span className="line-through decoration-white/40">{priced.was}</span> ·
                    Save {percentOff}%{' '}
                    {priced.per === 'year' ? 'on your next renewal' : `for ${durationMonths} months`}
                  </p>
                )}
              </div>
              <div className="hidden sm:block">
                <Heart className="h-10 w-10 text-yellow-400/30" strokeWidth={1.5} />
              </div>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-white">
              Applied to your next bill. Cancel any time — this doesn't tie you in.
            </p>
          </div>

          <p className="mt-4 text-center text-[12px] text-white">
            Or{' '}
            <button
              type="button"
              onClick={handleMessageFounder}
              className="touch-manipulation underline decoration-white/35 underline-offset-4"
            >
              message Andrew directly
            </button>{' '}
            — he replies same day.
          </p>
        </StepShell>
      );
    }

    // Step 3 — final confirm
    return (
      <StepShell
        eyebrow="Last check"
        title={`Cancel for sure, ${safeName}?`}
        subtitle="Your subscription ends now, but your data and account stay safe for 90 days — you can resubscribe any time without losing anything."
      >
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <Row label="Plan" value={(tier ?? 'Subscription').toString()} />
          <div className="h-px bg-white/5" />
          <Row label="What happens now" value="Access ends immediately. No further charges." />
          <div className="h-px bg-white/5" />
          <Row label="Your data" value="Saved for 90 days. Resubscribe and it's all back." />
        </div>
      </StepShell>
    );
  };

  // ── Footer (varies by step) ──────────────────────────────────────────
  const renderFooter = () => {
    if (step === 1) {
      return (
        <FooterRow>
          <Button
            variant="ghost"
            onClick={resetAndClose}
            disabled={isSubmitting}
            className="h-11 touch-manipulation rounded-xl px-4 text-[13px] font-medium text-white hover:bg-white/[0.06]"
          >
            Keep my plan
          </Button>
          {/* One tap on the follow-up is required where one exists. Optional,
              it was never used: reason_detail fill fell 50% (May, free text) →
              12% (Jul) → 0 of 18 this week, because the 31 Jul chip rework also
              removed the free-text box for `not_using` and `too_expensive` —
              63% of all cancellations — leaving a skippable chip as the only
              way to say anything. This is one tap, and it never blocks the
              cancellation itself, only advancing without answering. */}
          <Button
            onClick={handleSubmitReason}
            disabled={
              !reason || Boolean(REASON_CHIPS[reason] && !reasonChip) || isSubmitting
            }
            className="h-12 touch-manipulation rounded-2xl bg-yellow-500 px-6 text-[14px] font-bold text-black hover:bg-yellow-400 disabled:opacity-40"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </FooterRow>
      );
    }

    if (step === 2) {
      return (
        <FooterRow
          left={
            <Button
              variant="ghost"
              onClick={() => setStep(1)}
              disabled={isSubmitting}
              className="h-11 touch-manipulation rounded-xl px-3 text-[13px] font-medium text-white hover:bg-white/[0.06]"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </Button>
          }
        >
          <Button
            variant="ghost"
            onClick={() => setStep(3)}
            disabled={isSubmitting}
            className="h-11 touch-manipulation rounded-xl px-4 text-[13px] font-medium text-white hover:bg-white/[0.06]"
          >
            No thanks, cancel
          </Button>
          {intervention === 'founder' ? (
            <Button
              onClick={handleMessageFounder}
              disabled={isSubmitting}
              className="h-12 touch-manipulation rounded-2xl bg-yellow-500 px-6 text-[14px] font-bold text-black hover:bg-yellow-400 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send to Andrew'}
            </Button>
          ) : intervention === 'pause' ? (
            <Button
              onClick={() => handleAcceptOffer('pause')}
              disabled={isSubmitting}
              className="h-12 touch-manipulation rounded-2xl bg-yellow-500 px-6 text-[14px] font-bold text-black hover:bg-yellow-400 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>Pause for {pauseMonths} {pauseMonths === 1 ? 'month' : 'months'}</>
              )}
            </Button>
          ) : (
            <Button
              onClick={() => handleAcceptOffer('discount')}
              disabled={isSubmitting}
              className="h-12 touch-manipulation rounded-2xl bg-yellow-500 px-6 text-[14px] font-bold text-black hover:bg-yellow-400 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : priced ? (
                <>Yes, {priced.now}/{priced.per === 'year' ? 'yr' : 'mo'} it is</>
              ) : (
                <>Yes, {percentOff}% off it is</>
              )}
            </Button>
          )}
        </FooterRow>
      );
    }

    return (
      <FooterRow
        left={
          <Button
            variant="ghost"
            onClick={() => setStep(2)}
            disabled={isSubmitting}
            className="h-11 touch-manipulation rounded-xl px-3 text-[13px] font-medium text-white hover:bg-white/[0.06]"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
        }
      >
        <Button
          variant="ghost"
          onClick={resetAndClose}
          disabled={isSubmitting}
          className="h-11 touch-manipulation rounded-xl px-4 text-[13px] font-semibold text-white hover:bg-white/[0.06]"
        >
          Keep my plan
        </Button>
        <Button
          onClick={handleConfirmCancel}
          disabled={isSubmitting}
          variant="destructive"
          className="h-12 touch-manipulation rounded-2xl bg-red-500/90 px-6 text-[14px] font-bold text-white hover:bg-red-500"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Cancel subscription'}
        </Button>
      </FooterRow>
    );
  };

  const content = (
    <div className="flex h-full min-h-0 flex-col bg-[#0a0a0a]">
      {/* Close X */}
      <div className="flex items-center justify-end px-5 pt-5">
        <button
          type="button"
          onClick={resetAndClose}
          disabled={isSubmitting}
          className="touch-manipulation rounded-full p-2 text-white/55 hover:bg-white/[0.06] hover:text-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Body */}
      <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-2 sm:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
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
      <div className="border-t border-white/[0.06] bg-black/40 px-6 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-8">
        {renderFooter()}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={(open) => !open && resetAndClose()}>
        <SheetContent
          side="bottom"
          className="h-[85vh] overflow-hidden rounded-t-[2rem] border-white/[0.08] p-0"
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
      <DialogContent className="flex max-h-[85dvh] w-full max-w-lg flex-col overflow-hidden rounded-[2rem] border-white/[0.08] bg-[#0a0a0a] p-0 shadow-[0_30px_120px_rgba(0,0,0,0.6)]">
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
    <div className="space-y-6 py-4">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-yellow-400">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-[1.5rem] font-bold leading-[1.15] tracking-[-0.01em] text-white sm:text-[1.75rem]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-[14px] leading-[1.6] text-white sm:text-[15px]">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}

function FooterRow({ children, left }: { children: React.ReactNode; left?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex-shrink-0">{left ?? <span className="w-0" />}</div>
      <div className="flex flex-1 items-center justify-end gap-2">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-[12px] uppercase tracking-wider text-white">{label}</span>
      <span className="text-right text-[13px] font-medium text-white">{value}</span>
    </div>
  );
}
