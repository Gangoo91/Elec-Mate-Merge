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
import { cn } from '@/lib/utils';
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

  const timeline = [
    { icon: Zap, title: 'Today — everything unlocks', detail: 'Full access. £0 charged.' },
    { icon: Bell, title: 'Before your trial ends', detail: 'We remind you — no surprises.' },
    {
      icon: CreditCard,
      title: 'Day 8 — first payment',
      detail: `${priceInfo.price}/month, only if you keep it.`,
    },
  ];

  return (
    // bg-background, not bg-black — the app's page root is #0a0a0a everywhere
    // else, and pure black made this screen read as a different product.
    <div className="relative min-h-[100svh] overflow-hidden bg-background">
      {/* Single ambient wash, toned well down from the original. On a
          conversion screen the price should be the brightest thing, not the
          backdrop. */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[6%] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.10),transparent_62%)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[520px] flex-col px-5 pb-[calc(env(safe-area-inset-bottom)+24px)] pt-[calc(env(safe-area-inset-top)+24px)] sm:px-6 lg:max-w-[1040px] lg:justify-center lg:px-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Elec-Mate" className="h-10 w-10 rounded-xl" />
            <span className="text-[20px] font-bold tracking-[-0.02em] text-white">
              Elec-<span className="text-elec-yellow">Mate</span>
            </span>
          </div>
        </div>

        <div className="lg:mt-10 lg:grid lg:grid-cols-[1fr_460px] lg:items-center lg:gap-14">
          {/* Desktop pitch column — everything they get, with detail */}
          <div className="hidden lg:block">
            <h1 className="text-[2.6rem] font-bold leading-[1.06] tracking-[-0.04em] text-white">
              {trialEndedRecently ? (
                <>
                  Pick up <span className="text-elec-yellow">where you left off.</span>
                </>
              ) : (
                <>
                  Everything's ready <span className="text-elec-yellow">when you are.</span>
                </>
              )}
            </h1>
            <p className="mt-4 max-w-[28rem] text-[15px] leading-[1.7] text-white">
              Your account and everything in it are exactly as you left them. Start the free week
              and it all unlocks — £0 today, nothing charged for 7 days.
            </p>

            <div className="mt-8 space-y-4">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.06]">
                    <feature.icon className="h-[18px] w-[18px] text-elec-yellow" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14.5px] font-semibold leading-tight text-white">
                      {feature.title}
                    </p>
                    {/* Hierarchy comes from size and weight, not opacity — the
                        app forbids low-opacity white, which renders as grey. */}
                    <p className="mt-0.5 text-[13px] leading-[1.55] text-white">{feature.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            {/* Hero card — price-first. House card recipe: rounded-3xl, hairline
                white border, subtle top-down gradient. The yellow-tinted border
                and heavy glow were a one-off that existed nowhere else. */}
            <div className="mt-8 rounded-3xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-6 text-center sm:p-8 lg:mt-0">
              {/* Trial pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-elec-yellow/30 bg-elec-yellow/[0.12] px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
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
                Then <span className="font-bold">{priceInfo.price}/month</span> — cancel in two
                clicks
              </p>

              {/* Reassurance line */}
              <p className="mt-2 text-[12px] text-white">
                {trialEndedRecently && formattedTrialEnd
                  ? `Your trial ended on ${formattedTrialEnd}. Restart below.`
                  : 'No charge for 7 days · No surprises · Cancel anytime'}
              </p>

              {/* What happens when — makes "no charge for 7 days" concrete.
                  Now a proper connected timeline rather than three loose rows. */}
              <div className="mt-6 rounded-2xl border border-white/[0.1] bg-white/[0.04] p-4 text-left">
                {timeline.map((step, i) => (
                  <div key={step.title} className="relative flex items-start gap-3">
                    {/* Rail joining the steps. Not drawn under the last one, so
                        the sequence visibly terminates at first payment. */}
                    {i < timeline.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute left-4 top-9 h-[calc(100%-1.25rem)] w-px bg-white/[0.12]"
                      />
                    )}
                    <div className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.06]">
                      <step.icon className="h-3.5 w-3.5 text-elec-yellow" />
                    </div>
                    <div className={cn('min-w-0', i < timeline.length - 1 && 'pb-4')}>
                      <p className="text-[12.5px] font-semibold leading-tight text-white">
                        {step.title}
                      </p>
                      <p className="mt-0.5 text-[11.5px] leading-snug text-white">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Primary CTA */}
              <div className="mt-6">
                <Button
                  onClick={startCheckout}
                  disabled={isStarting}
                  className="h-14 w-full touch-manipulation rounded-2xl bg-elec-yellow text-[15px] font-bold text-black transition-all hover:bg-elec-yellow/90 active:scale-[0.98] disabled:bg-white/[0.08] disabled:text-white/70"
                >
                  {isStarting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    'Start 7-day free trial'
                  )}
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
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                  {['Apple Pay', 'Google Pay', 'Visa', 'Mastercard'].map((m) => (
                    <span
                      key={m}
                      className="inline-flex h-7 items-center rounded-md border border-white/[0.12] bg-white/[0.04] px-2.5 text-[10.5px] font-semibold tracking-wide text-white"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}

              {error && (
                <p className="mt-4 rounded-xl border border-red-500/25 bg-red-500/[0.08] px-4 py-2.5 text-[12px] text-red-300">
                  {error}
                </p>
              )}
            </div>

            {/* What you get back — mobile only; desktop shows it in the left column */}
            <div className="mt-6 rounded-2xl border border-white/[0.1] bg-white/[0.04] p-5 text-left lg:hidden">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
                What you unlock
              </p>
              <div className="mt-4 space-y-3.5">
                {FEATURES.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.06]">
                      <feature.icon className="h-4 w-4 text-elec-yellow" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13.5px] font-semibold leading-tight text-white">
                        {feature.title}
                      </p>
                      <p className="mt-0.5 text-[12px] leading-[1.55] text-white">
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
                className="inline-flex h-11 touch-manipulation items-center px-4 text-[13px] font-medium text-white transition-colors hover:text-elec-yellow"
              >
                Sign out
              </button>
            </div>

            <p className="mt-2 text-center text-[11px] text-white">
              Secure checkout by Stripe · You won't be charged during your trial
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialExpiredPaywall;
