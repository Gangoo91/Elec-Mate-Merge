import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { Loader2, Lock } from 'lucide-react';

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
    priceId: 'price_1TKlA12RKw5t5RAmdhZyhX1I',
    label: 'Electrician',
    price: '£12.99',
  },
  apprentice: {
    planId: 'apprentice-monthly',
    priceId: 'price_1TKlA22RKw5t5RAmpvhojy0b',
    label: 'Apprentice',
    price: '£5.99',
  },
};

const FEATURES = [
  'Certificates, quotes and invoices',
  '5 AI specialists trained on BS 7671',
  '50+ electrical calculators',
  'Study Centre, 46+ courses and mock exams',
  'RAMS, method statements and reports',
  'Branded client-ready output',
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
      if (!data?.url) throw new Error('No checkout URL returned');

      const checkoutValue = priceInfo.planId.startsWith('apprentice') ? 5.99 : 12.99;
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
    <div className="relative min-h-[100svh] overflow-hidden bg-[#0a0a0a]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[8%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.18),transparent_60%)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[520px] flex-col px-5 pb-[calc(env(safe-area-inset-bottom)+24px)] pt-[calc(env(safe-area-inset-top)+24px)] sm:px-6">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Elec-Mate" className="h-10 w-10 rounded-xl" />
            <span className="text-[20px] font-bold tracking-[-0.02em] text-white">
              Elec-<span className="text-yellow-400">Mate</span>
            </span>
          </div>
        </div>

        {/* Hero card — price-first */}
        <div className="mt-8 rounded-[2rem] border border-yellow-400/25 bg-gradient-to-b from-yellow-500/[0.06] via-white/[0.03] to-white/[0.01] p-6 text-center sm:p-8 shadow-[0_10px_40px_-12px_rgba(250,204,21,0.18)]">
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

          {/* Primary CTA */}
          <div className="mt-7">
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

        {/* What you get back */}
        <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 text-left">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-yellow-400">
            What you unlock
          </p>
          <div className="mt-4 space-y-2.5">
            {FEATURES.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-2.5 text-[14px] leading-[1.5] text-white"
              >
                <div className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-yellow-400" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Plan switcher + Sign out */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            onClick={() => navigate('/subscriptions')}
            className="text-[13px] font-medium text-white underline underline-offset-4 decoration-white/40 hover:decoration-white touch-manipulation"
          >
            See all plans
          </button>
          <button
            onClick={async () => {
              await signOut();
              window.location.replace('/');
            }}
            className="text-[13px] font-medium text-white touch-manipulation"
          >
            Sign out
          </button>
        </div>

        <p className="mt-5 text-center text-[11px] text-white">
          Secure checkout by Stripe · You won't be charged during your trial
        </p>
      </div>
    </div>
  );
};

export default TrialExpiredPaywall;
