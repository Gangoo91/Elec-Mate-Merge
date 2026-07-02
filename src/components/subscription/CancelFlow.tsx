/**
 * CancelFlow
 * ────────────────────────────────────────────────────────────────────────
 * Multi-step cancel-prevention modal. Designed in the spirit of Stripe /
 * Linear / Notion cancellation flows — fast, honest, never adversarial.
 *
 * Flow
 *   1. Pick a reason (six radio cards). Reason is saved immediately so we
 *      capture intent even if the user closes the modal.
 *   2. Personalised intervention based on reason:
 *        - retention offer (£3.99/mo apprentice, £9.99/mo electrician forever)
 *        - direct line to the founder
 *        - escape hatch back to keep subscription
 *   3. Final cancel confirmation. Last-chance copy, no dark patterns.
 *
 * Backend
 *   - cancel_survey_responses row inserted on step 1
 *   - apply-retention-offer edge fn for "stay" path
 *   - cancel-subscription edge fn for "really cancel" path
 *
 * Used from /subscriptions in the "your subscription" card.
 */

import { useState } from 'react';
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

// ─── Types ──────────────────────────────────────────────────────────────
type Reason =
  | 'too_expensive'
  | 'not_using'
  | 'missing_feature'
  | 'switching'
  | 'bug'
  | 'other';

type Tier = 'apprentice' | 'electrician' | 'employer' | 'business_ai' | string;

interface CancelFlowProps {
  isOpen: boolean;
  onClose: () => void;
  /** Stripe subscription id — required to actually cancel. */
  subscriptionId: string | null;
  /** Current tier so we offer the right retention price. */
  tier: Tier | null;
  /** Friendly first name for the copy. */
  firstName?: string | null;
  /** Called when the user successfully stays (offer accepted or backed out). */
  onStayed?: () => void;
  /** Called after the subscription has actually been cancelled. */
  onCancelled?: () => void;
}

// ─── Copy / data ────────────────────────────────────────────────────────
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

// Retention-offer prices map to Stripe coupons created 2026-05-23:
//   YhLPdvFl → £2 off forever (apprentice £5.99 → £3.99)
//   SSmqkZGn → £3 off forever (electrician £12.99 → £9.99)
function offerForTier(tier: Tier | null): {
  available: boolean;
  newPrice: string;
  oldPrice: string;
  saving: string;
  blurb: string;
} {
  if (tier === 'apprentice') {
    return {
      available: true,
      oldPrice: '£5.99',
      newPrice: '£3.99',
      saving: '£2/month, forever',
      blurb: 'Locked in for as long as you stay subscribed. Cancel anytime.',
    };
  }
  if (tier === 'electrician') {
    return {
      available: true,
      oldPrice: '£12.99',
      newPrice: '£9.99',
      saving: '£3/month, forever',
      blurb: 'Locked in for as long as you stay subscribed. Cancel anytime.',
    };
  }
  // Mate / Employer / unknown — no automated offer, send to founder.
  return {
    available: false,
    oldPrice: '',
    newPrice: '',
    saving: '',
    blurb: '',
  };
}

// ─── Component ──────────────────────────────────────────────────────────
export function CancelFlow({
  isOpen,
  onClose,
  subscriptionId,
  tier,
  firstName,
  onStayed,
  onCancelled,
}: CancelFlowProps) {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const { toast } = useToast();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [reason, setReason] = useState<Reason | null>(null);
  const [detail, setDetail] = useState('');
  const [surveyId, setSurveyId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const safeName = firstName?.trim() || 'mate';
  const offer = offerForTier(tier);

  const resetAndClose = () => {
    onClose();
    // Give the close animation a beat before resetting internal state.
    setTimeout(() => {
      setStep(1);
      setReason(null);
      setDetail('');
      setSurveyId(null);
      setIsSubmitting(false);
    }, 250);
  };

  // ── Step 1 → 2: save the reason, then route to intervention ──────────
  const handleSubmitReason = async () => {
    if (!reason) return;
    setIsSubmitting(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Decide the intervention we will offer at step 2 so it gets logged
      // alongside the reason (clean analytics — one row per cancel intent).
      const offered =
        reason === 'bug'
          ? 'founder_message'
          : offer.available
            ? 'retention_discount'
            : 'founder_message';

      const { data: inserted, error } = await supabase
        .from('cancel_survey_responses')
        .insert({
          user_id: user.id,
          reason,
          reason_detail: detail.trim() || null,
          offered_intervention: offered,
          subscription_tier: tier ?? null,
          subscription_id: subscriptionId,
        })
        .select('id')
        .single();
      if (error) throw error;

      setSurveyId(inserted?.id ?? null);
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

  // ── Step 2 action A: accept retention offer ──────────────────────────
  const handleAcceptOffer = async () => {
    if (!subscriptionId) return;
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('apply-retention-offer', {
        body: { subscriptionId, surveyId },
      });
      if (error) throw new Error(error.message);
      if (!data?.success) throw new Error(data?.error || 'Could not apply your offer');

      toast({
        title: 'Sorted — your new price is locked in',
        description: `${data?.new_price ?? offer.newPrice}/month from your next bill.`,
      });

      onStayed?.();
      resetAndClose();
    } catch (err) {
      console.error('[CancelFlow] offer accept failed', err);
      toast({
        title: 'Could not apply your offer',
        description: err instanceof Error ? err.message : 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Step 2 action B: message founder ─────────────────────────────────
  const handleMessageFounder = () => {
    const subject = encodeURIComponent(
      reason === 'bug' ? "I'm hitting a bug" : "Quick one before I cancel"
    );
    const body = encodeURIComponent(
      `Hi Andrew,\n\n${detail ? detail + '\n\n' : ''}—\nSent from the Elec-Mate cancel flow.`
    );
    window.location.href = `mailto:founder@elec-mate.com?subject=${subject}&body=${body}`;

    // Mark the survey as a "stayed via founder message" so we can follow up.
    if (surveyId) {
      void supabase
        .from('cancel_survey_responses')
        .update({ outcome: 'stayed', outcome_at: new Date().toISOString() })
        .eq('id', surveyId);
    }
    onStayed?.();
    resetAndClose();
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
                  onClick={() => setReason(r.id)}
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
                  <p className="mt-1 text-[13px] leading-snug text-white/55">{r.hint}</p>
                </button>
              );
            })}
          </div>

          {(reason === 'missing_feature' ||
            reason === 'switching' ||
            reason === 'bug' ||
            reason === 'other') && (
            <div className="mt-4">
              <label
                htmlFor="cancel-detail"
                className="mb-2 block text-[13px] font-medium text-white/80"
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
      const isFounderRoute =
        reason === 'bug' || !offer.available;

      if (isFounderRoute) {
        return (
          <StepShell
            eyebrow={reason === 'bug' ? "Let's fix this" : 'One last thing'}
            title={
              reason === 'bug'
                ? "Send Andrew a message — he'll personally sort it."
                : `${safeName}, mind giving Andrew a minute first?`
            }
            subtitle={
              reason === 'bug'
                ? "Most bugs get fixed the same day. It's a small team — replies come from the founder, not a queue."
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
                  <p className="mt-1 text-[13px] leading-relaxed text-white/65">
                    Opens your email app with a pre-filled note to founder@elec-mate.com.
                  </p>
                </div>
              </div>
            </div>
          </StepShell>
        );
      }

      return (
        <StepShell
          eyebrow="Stay on for less"
          title={`How about ${offer.newPrice}/month, ${safeName}?`}
          subtitle="Same access, lower price, locked in for as long as you stay subscribed. It's the lowest price we can do."
        >
          <div className="rounded-3xl border border-yellow-400/40 bg-gradient-to-br from-yellow-400/[0.10] via-yellow-400/[0.04] to-transparent p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-yellow-300">
                  Your new price
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold leading-none tracking-tight text-white">
                    {offer.newPrice}
                  </span>
                  <span className="text-base text-white/70">/month</span>
                </div>
                <p className="mt-2 text-[13px] text-white/55">
                  Was{' '}
                  <span className="line-through decoration-white/40">{offer.oldPrice}</span> ·
                  Save {offer.saving}
                </p>
              </div>
              <div className="hidden sm:block">
                <Heart className="h-10 w-10 text-yellow-400/30" strokeWidth={1.5} />
              </div>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-white/65">{offer.blurb}</p>
          </div>

          <p className="mt-4 text-center text-[12px] text-white/45">
            Or{' '}
            <button
              type="button"
              onClick={handleMessageFounder}
              className="touch-manipulation underline decoration-white/35 underline-offset-4 hover:text-white/70"
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
            className="h-11 touch-manipulation rounded-xl px-4 text-[13px] font-medium text-white/70 hover:bg-white/[0.06] hover:text-white"
          >
            Keep my plan
          </Button>
          <Button
            onClick={handleSubmitReason}
            disabled={!reason || isSubmitting}
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
      const isFounderRoute = reason === 'bug' || !offer.available;
      return (
        <FooterRow
          left={
            <Button
              variant="ghost"
              onClick={() => setStep(1)}
              disabled={isSubmitting}
              className="h-11 touch-manipulation rounded-xl px-3 text-[13px] font-medium text-white/60 hover:bg-white/[0.06] hover:text-white"
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
            className="h-11 touch-manipulation rounded-xl px-4 text-[13px] font-medium text-white/55 hover:bg-white/[0.06] hover:text-white"
          >
            No thanks, cancel
          </Button>
          {isFounderRoute ? (
            <Button
              onClick={handleMessageFounder}
              disabled={isSubmitting}
              className="h-12 touch-manipulation rounded-2xl bg-yellow-500 px-6 text-[14px] font-bold text-black hover:bg-yellow-400"
            >
              Message Andrew
            </Button>
          ) : (
            <Button
              onClick={handleAcceptOffer}
              disabled={isSubmitting}
              className="h-12 touch-manipulation rounded-2xl bg-yellow-500 px-6 text-[14px] font-bold text-black hover:bg-yellow-400 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>Yes, {offer.newPrice}/mo it is</>
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
            className="h-11 touch-manipulation rounded-xl px-3 text-[13px] font-medium text-white/60 hover:bg-white/[0.06] hover:text-white"
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
          className="h-[92dvh] overflow-hidden rounded-t-[2rem] border-white/[0.08] p-0"
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
          <p className="mt-2 text-[14px] leading-[1.6] text-white/65 sm:text-[15px]">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

function FooterRow({
  children,
  left,
}: {
  children: React.ReactNode;
  left?: React.ReactNode;
}) {
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
      <span className="text-[12px] uppercase tracking-wider text-white/45">{label}</span>
      <span className="text-right text-[13px] font-medium text-white/85">{value}</span>
    </div>
  );
}
