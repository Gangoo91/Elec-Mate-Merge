import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import {
  Bell,
  Bot,
  Calculator,
  CreditCard,
  FileCheck,
  GraduationCap,
  Loader2,
  Lock,
  ReceiptText,
  Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { storageGetSync, storageRemoveSync } from '@/utils/storage';
import { trackInitiateCheckout } from '@/lib/marketing-pixels';
import { fireServerCapi } from '@/lib/attribution';

type PriceInfo = {
  planId: string;
  priceId: string;
  label: string;
  price: string;
};

const ROLE_TO_PRICE: Record<string, PriceInfo> = {
  electrician: {
    planId: 'electrician-monthly',
    priceId: 'price_1TnbOh2RKw5t5RAmsf2KcHT6',
    label: 'Electrician',
    price: '£19.99',
  },
  apprentice: {
    planId: 'apprentice-monthly',
    priceId: 'price_1TnbOk2RKw5t5RAmiOCTkqS3',
    label: 'Apprentice',
    price: '£6.99',
  },
};

const FEATURES = [
  {
    icon: FileCheck,
    title: 'Every BS 7671 certificate',
    detail: 'EICR, EIC, Minor Works and 16 more — signed on site, A4:2026 ready.',
  },
  {
    icon: ReceiptText,
    title: 'Quotes and invoices',
    detail: 'Branded, tracked and chased automatically — paid by card or Apple Pay.',
  },
  {
    icon: Bot,
    title: '5 AI specialists',
    detail: 'Cost engineer, circuit designer, RAMS and more — trained on BS 7671.',
  },
  {
    icon: Calculator,
    title: '70+ electrical calculators',
    detail: 'Cable sizing, volt drop, Zs, fault current — all BS 7671 compliant.',
  },
  {
    icon: GraduationCap,
    title: 'Full Study Centre',
    detail: '46+ courses, mock exams and CPD tracking.',
  },
];

const TrialExpiredPaywall = () => {
  const navigate = useNavigate();
  const { user, profile, trialEndsAt, signOut } = useAuth();
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const role = profile?.role || storageGetSync('elec-mate-profile-role') || 'electrician';
  const priceInfo = ROLE_TO_PRICE[role] || ROLE_TO_PRICE.electrician;
  const isNative = Capacitor.isNativePlatform();

  const trialEndedRecently = trialEndsAt && new Date(trialEndsAt).getTime() < Date.now();
  const formattedTrialEnd = trialEndsAt
    ? new Date(trialEndsAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  const startCheckout = useCallback(async () => {
    if (isStarting) return;

    // Native devices must use StoreKit via RevenueCat — Stripe Checkout isn't
    // allowed on iOS/Android. Bounce through the trial interstitial which
    // knows how to trigger the in-app purchase flow.
    if (isNative) {
      navigate('/checkout-trial');
      return;
    }

    setIsStarting(true);
    setError(null);

    try {
      const offerCode = storageGetSync('elec-mate-offer-code');
      const referralCode = storageGetSync('elec-mate-referral-code');

      const { data, error: fnErr } = await supabase.functions.invoke('create-checkout', {
        body: {
          priceId: priceInfo.priceId,
          mode: 'subscription',
          planId: priceInfo.planId,
          offerCode,
          referralCode,
        },
      });

      if (fnErr) throw new Error(fnErr.message);
      // Payment already went through (webhook still syncing) — go straight in
      if (data?.already_subscribed) {
        window.location.assign('/dashboard');
        return;
      }
      if (!data?.url) throw new Error('No checkout URL returned');

      const checkoutValue = priceInfo.planId.startsWith('apprentice') ? 6.99 : 19.99;
      const eventId = trackInitiateCheckout({
        value: checkoutValue,
        currency: 'GBP',
        contentName: priceInfo.label,
        contentIds: [priceInfo.priceId],
      });
      fireServerCapi({
        event_name: 'InitiateCheckout',
        event_id: eventId,
        email: user?.email || undefined,
        user_id: user?.id,
        value: checkoutValue,
        currency: 'GBP',
        content_name: priceInfo.label,
      });

      if (offerCode) storageRemoveSync('elec-mate-offer-code');
      if (referralCode) storageRemoveSync('elec-mate-referral-code');
      window.location.replace(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not start checkout. Please try again.');
      setIsStarting(false);
    }
  }, [isStarting, isNative, navigate, priceInfo, user?.email, user?.id]);

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-black">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[8%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.16),transparent_60%)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[520px] flex-col px-5 pb-[calc(env(safe-area-inset-bottom)+24px)] pt-[calc(env(safe-area-inset-top)+24px)] sm:px-6 lg:max-w-[1040px] lg:justify-center lg:px-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Elec-Mate" className="h-10 w-10 rounded-xl" />
            <span className="text-[20px] font-bold tracking-[-0.02em] text-white">
              Elec-<span className="text-yellow-400">Mate</span>
            </span>
          </div>
        </div>

        <div className="lg:mt-10 lg:grid lg:grid-cols-[1fr_460px] lg:items-center lg:gap-14">
          {/* Desktop pitch column — everything they get, with detail */}
          <div className="hidden lg:block">
            <h1 className="text-[2.6rem] font-bold leading-[1.06] tracking-[-0.04em] text-white">
              {trialEndedRecently ? (
                <>
                  Pick up <span className="text-yellow-400">where you left off.</span>
                </>
              ) : (
                <>
                  Everything's ready <span className="text-yellow-400">when you are.</span>
                </>
              )}
            </h1>
            <p className="mt-4 max-w-[28rem] text-[15px] leading-[1.7] text-white/70">
              Your account and everything in it are exactly as you left them. Start the free week
              and it all unlocks — £0 today, nothing charged for 7 days.
            </p>

            <div className="mt-8 space-y-4">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-yellow-500/25 bg-yellow-500/[0.12]">
                    <feature.icon className="h-[18px] w-[18px] text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-[14.5px] font-semibold leading-tight text-white">
                      {feature.title}
                    </p>
                    <p className="mt-0.5 text-[13px] leading-[1.55] text-white/65">
                      {feature.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
        {/* Hero card — price-first */}
        <div className="mt-8 rounded-[2rem] border border-yellow-400/25 bg-gradient-to-b from-yellow-500/[0.06] via-white/[0.03] to-white/[0.01] p-6 text-center sm:p-8 shadow-[0_10px_40px_-12px_rgba(250,204,21,0.18)] lg:mt-0">
          {/* Trial pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-yellow-400">
              7-day free trial
            </span>
          </div>

          {/* Big zero price */}
          <div className="mt-6 flex items-baseline justify-center gap-2">
            <span className="text-[72px] font-extrabold leading-none tracking-[-0.04em] text-white sm:text-[88px]">
              £0
            </span>
            <span className="text-lg font-medium text-white">today</span>
          </div>

          {/* Price after trial */}
          <p className="mt-3 text-[15px] text-white">
            Then <span className="font-bold text-white">{priceInfo.price}/month</span> —{' '}
            <span className="text-white">cancel in two clicks</span>
          </p>

          {/* Reassurance line */}
          <p className="mt-2 text-[12px] text-white">
            {trialEndedRecently && formattedTrialEnd
              ? `Your trial ended on ${formattedTrialEnd}. Restart below.`
              : 'No charge for 7 days · No surprises · Cancel anytime'}
          </p>

          {/* What happens when — makes "no charge for 7 days" concrete */}
          <div className="mt-6 space-y-3 rounded-2xl border border-white/[0.08] bg-black/30 p-4 text-left">
            {[
              {
                icon: Zap,
                title: 'Today — everything unlocks',
                detail: 'Full access. £0 charged.',
              },
              {
                icon: Bell,
                title: 'Before your trial ends',
                detail: 'We remind you — no surprises.',
              },
              {
                icon: CreditCard,
                title: 'Day 8 — first payment',
                detail: `${priceInfo.price}/month, only if you keep it.`,
              },
            ].map((step) => (
              <div key={step.title} className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-yellow-500/25 bg-yellow-500/[0.12]">
                  <step.icon className="h-3.5 w-3.5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-[12.5px] font-semibold leading-tight text-white">
                    {step.title}
                  </p>
                  <p className="mt-0.5 text-[11.5px] leading-snug text-white/65">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <div className="mt-6">
            <Button
              onClick={startCheckout}
              disabled={isStarting}
              className="h-14 w-full touch-manipulation rounded-2xl bg-yellow-400 text-[15px] font-bold text-black hover:bg-yellow-300 active:scale-[0.98] transition-all shadow-[0_10px_28px_-8px_rgba(250,204,21,0.55)] disabled:opacity-60"
            >
              {isStarting ? <Loader2 className="h-5 w-5 animate-spin" /> : `Start 7-day free trial`}
            </Button>
          </div>

          {/* Payment methods — Stripe handles Apple Pay / Google Pay / cards */}
          <div className="mt-5 flex items-center justify-center gap-2.5">
            <Lock className="h-3.5 w-3.5 text-white" />
            <span className="text-[11.5px] text-white">
              {isNative
                ? 'Pay with Apple Pay or your App Store account'
                : 'Pay with Apple Pay, Google Pay, or any card'}
            </span>
          </div>

          {/* Payment-method badges */}
          {!isNative && (
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="inline-flex h-7 items-center rounded-md border border-white/[0.12] bg-white/[0.04] px-2.5 text-[10.5px] font-semibold tracking-wide text-white">
                Apple&nbsp;Pay
              </span>
              <span className="inline-flex h-7 items-center rounded-md border border-white/[0.12] bg-white/[0.04] px-2.5 text-[10.5px] font-semibold tracking-wide text-white">
                Google&nbsp;Pay
              </span>
              <span className="inline-flex h-7 items-center rounded-md border border-white/[0.12] bg-white/[0.04] px-2.5 text-[10.5px] font-semibold tracking-wide text-white">
                Visa
              </span>
              <span className="inline-flex h-7 items-center rounded-md border border-white/[0.12] bg-white/[0.04] px-2.5 text-[10.5px] font-semibold tracking-wide text-white">
                Mastercard
              </span>
            </div>
          )}

          {error && (
            <p className="mt-4 rounded-xl border border-red-500/25 bg-red-500/[0.08] px-4 py-2.5 text-[12px] text-red-400">
              {error}
            </p>
          )}
        </div>

        {/* What you get back — mobile only; desktop shows it in the left column */}
        <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 text-left lg:hidden">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-yellow-400">
            What you unlock
          </p>
          <div className="mt-4 space-y-3.5">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="flex items-start gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-yellow-500/25 bg-yellow-500/[0.12]">
                  <feature.icon className="h-4 w-4 text-yellow-400" />
                </div>
                <div>
                  <p className="text-[13.5px] font-semibold leading-tight text-white">
                    {feature.title}
                  </p>
                  <p className="mt-0.5 text-[12px] leading-[1.55] text-white/65">
                    {feature.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sign out is the only exit — /subscriptions was a side door into the
            app without a card, so no plan-switcher link here */}
        <div className="mt-5 text-center">
          <button
            onClick={async () => {
              await signOut();
              window.location.replace('/');
            }}
            className="-m-2 touch-manipulation p-2 text-[13px] font-medium text-white/70 transition-colors hover:text-white"
          >
            Sign out
          </button>
        </div>

        <p className="mt-4 text-center text-[11px] text-white">
          Secure checkout by Stripe · You won't be charged during your trial
        </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialExpiredPaywall;
