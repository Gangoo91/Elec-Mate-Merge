import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { storageGetSync, storageRemoveSync } from '@/utils/storage';
import { cn } from '@/lib/utils';
import { useRevenueCat } from '@/hooks/useRevenueCat';
import { useUserCount } from '@/hooks/useUserCount';
import { useCookieConsent } from '@/components/CookieConsent';
import { trackInitiateCheckout } from '@/lib/marketing-pixels';
import {
  trackCheckoutStarted,
  trackPlanSelected,
  trackPostSignupStepViewed,
} from '@/lib/analytics-events';
import { fireServerCapi } from '@/lib/attribution';
import { useSignupOffer, offerForPlan, offerDuration } from '@/hooks/useSignupOffer';
import { Section, PlanRows, ShellFooter } from '@/components/auth/SignupShell';
import { AuthFrame, AuthHeading } from '@/components/auth/AuthFrame';
import {
  PLANS,
  JOURNEY,
  offerLabel,
  dayMonth,
  trialEndDate,
  type Plan,
} from '@/components/auth/signupPlans';
import { buttonPrimaryCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';

const ROLE_TO_PRICE: Record<
  string,
  { planId: string; priceId: string; label: string; monthly: string }
> = {
  electrician: {
    planId: 'electrician-monthly',
    priceId: 'price_1TnbOh2RKw5t5RAmsf2KcHT6',
    label: 'Electrician',
    monthly: '£19.99',
  },
  apprentice: {
    planId: 'apprentice-monthly',
    priceId: 'price_1TnbOk2RKw5t5RAmiOCTkqS3',
    label: 'Apprentice',
    monthly: '£6.99',
  },
};

const MAX_PACKAGE_RETRIES = 3;

const FEATURES = [
  'Certificates, quotes and invoices',
  'AI tools built around electrical work',
  'The full Study Centre',
  'Every calculator and specialist tool',
];

const CheckoutTrial = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userCount = useUserCount();
  // Cookie banner clearance — see container className below
  const { hasConsented } = useCookieConsent();

  const {
    isNative,
    isInitialised,
    availablePackages,
    isPurchasing,
    purchasePackage,
    restorePurchases,
    loadOfferings,
    getPackageForPlan,
    error: revenueCatError,
  } = useRevenueCat(user?.id);

  const [isRestoring, setIsRestoring] = useState(false);

  // Merge the hook's error (purchase cancelled, SDK failure) with the local
  // error (Stripe flow, package loading) so the UI shows whichever is active.
  const displayError = error || revenueCatError;

  const role = profile?.role || storageGetSync('elec-mate-profile-role') || 'electrician';
  const priceInfo = ROLE_TO_PRICE[role] || ROLE_TO_PRICE.electrician;

  // The offer the sign-up page promised (stored there as the code that fits
  // this plan). This page used to say "Then £19.99/month" even with a 25% link
  // — the last thing read before the card form contradicted the offer.
  const { offer } = useSignupOffer(storageGetSync('elec-mate-offer-code'));
  const terms = offerForPlan(offer, priceInfo.planId.replace('-monthly', ''));
  const payMonthly = terms?.price ? `£${terms.price}` : priceInfo.monthly;
  const offerLine = terms
    ? `${terms.percentOff}% off ${offerDuration(terms.months)}${terms.months ? `, then ${priceInfo.monthly}` : ''}`
    : null;

  // Funnel: fires once per visit so the dashboard can distinguish "never saw
  // the trial page" from "saw it and bailed" after signup.
  const trackedViewRef = useRef(false);
  useEffect(() => {
    if (trackedViewRef.current) return;
    trackedViewRef.current = true;
    trackPostSignupStepViewed({ step: 'checkout_trial', tier: priceInfo.planId });
  }, [priceInfo.planId]);

  const packagesReady = isInitialised && availablePackages.length > 0;
  const packagesLoading =
    isNative &&
    !packagesReady &&
    (!isInitialised || retryCount < MAX_PACKAGE_RETRIES || isRetrying);

  useEffect(() => {
    if (user?.id && profile && !profile.role) {
      supabase
        .from('profiles')
        .update({ role, updated_at: new Date().toISOString() })
        .eq('id', user.id)
        .then(({ error: updateError }) => {
          if (updateError) console.warn('Failed to backfill role:', updateError);
        });
    }
  }, [user?.id, profile, role]);

  useEffect(() => {
    if (!isNative || packagesReady || !isInitialised) return;
    if (retryCount >= MAX_PACKAGE_RETRIES) return;

    const delay = retryCount === 0 ? 1500 : 3000;
    retryTimerRef.current = setTimeout(async () => {
      setIsRetrying(true);
      await loadOfferings();
      setRetryCount((count) => count + 1);
      setIsRetrying(false);
    }, delay);

    return () => {
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
    };
  }, [isInitialised, isNative, loadOfferings, packagesReady, retryCount]);

  useEffect(() => {
    if (packagesReady && retryCount > 0) {
      setRetryCount(0);
      setError(null);
    }
  }, [packagesReady, retryCount]);

  const handleManualRetry = useCallback(async () => {
    setError(null);
    setIsRetrying(true);
    setRetryCount(0);
    await loadOfferings();
    setIsRetrying(false);
  }, [loadOfferings]);

  const startCheckout = useCallback(async () => {
    if (isRedirecting) return;
    setIsRedirecting(true);
    setError(null);

    try {
      const offerCode = storageGetSync('elec-mate-offer-code');
      const referralCode = storageGetSync('elec-mate-referral-code');

      const { data, error: fnError } = await supabase.functions.invoke('create-checkout', {
        body: {
          priceId: priceInfo.priceId,
          mode: 'subscription',
          planId: priceInfo.planId,
          offerCode,
          referralCode,
        },
      });

      if (fnError) throw new Error(fnError.message);

      // Payment already went through (webhook still syncing) — go straight in
      if (data?.already_subscribed) {
        navigate('/dashboard');
        return;
      }

      if (data?.url) {
        if (offerCode) storageRemoveSync('elec-mate-offer-code');
        if (referralCode) storageRemoveSync('elec-mate-referral-code');
        // Fire InitiateCheckout on both Pixel and server CAPI before redirect
        const listValue = priceInfo.planId.startsWith('apprentice') ? 6.99 : 19.99;
        const checkoutValue = terms?.price ? parseFloat(terms.price) || listValue : listValue;
        // Cookieless funnel events — consent-independent counts for the Vercel dashboard.
        // plan_selected also fires here: most people reach checkout via this page rather
        // than Subscriptions.tsx, so tracking it only there made the step read as a cliff.
        trackPlanSelected({ tier: priceInfo.planId });
        trackCheckoutStarted({ tier: priceInfo.planId });
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
        // Use replace() so browser-back from Stripe skips this page
        // and jumps straight to /auth/signup instead of sitting idle here.
        window.location.replace(data.url);
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to start checkout. Please try again.');
      setIsRedirecting(false);
    }
  }, [
    isRedirecting,
    navigate,
    priceInfo.planId,
    priceInfo.priceId,
    priceInfo.label,
    terms?.price,
    user?.email,
    user?.id,
  ]);

  const startNativePurchase = useCallback(async () => {
    if (!packagesReady) {
      setIsRetrying(true);
      await loadOfferings();
      setIsRetrying(false);

      if (!availablePackages.length) {
        setError(
          'Subscription plans are taking longer than usual to load. Please check your connection and try again.'
        );
        return;
      }
    }

    setError(null);

    const packageToBuy = getPackageForPlan(priceInfo.planId) ?? availablePackages[0];
    if (!packageToBuy) {
      setError('Could not find your subscription plan. Please try again or contact support.');
      return;
    }

    const success = await purchasePackage(packageToBuy);
    if (success) {
      try {
        const tier = priceInfo.planId.replace(/-monthly|-yearly/, '');
        await supabase
          .from('profiles')
          .update({
            subscribed: true,
            subscription_tier: tier,
            // Platform-correct source — this was hardcoded 'app_store' for BOTH
            // platforms, which mislabelled every Android subscriber and made
            // the admin platform split show Android = 0 (found 2026-07-05:
            // RevenueCat had 5 active play_store subs, the DB had none).
            subscription_source: Capacitor.getPlatform() === 'android' ? 'play_store' : 'app_store',
            updated_at: new Date().toISOString(),
          })
          .eq('id', user?.id);

        if (user?.id) {
          sessionStorage.removeItem(`elecmate_sub_cache_${user.id}`);
        }

        if (user?.id) {
          supabase.functions.invoke('process-referral-reward', {
            body: { referred_user_id: user.id },
          });
        }
      } catch (updateError) {
        console.warn('Profile update after purchase failed:', updateError);
      }

      navigate(`/payment-success?plan=${priceInfo.planId}&trial=true`);
    }
  }, [
    availablePackages,
    getPackageForPlan,
    loadOfferings,
    navigate,
    packagesReady,
    priceInfo.planId,
    purchasePackage,
    user?.id,
  ]);

  // Restore an existing store subscription that the app isn't recognising —
  // e.g. a Google Play / Apple purchase made before sign-in that landed on an
  // anonymous RevenueCat user. Returning subscribers hit the paywall otherwise
  // (ELE-1231 / ELE-1230). Required by Apple for all subscription apps.
  const handleRestore = useCallback(async () => {
    if (isRestoring || isPurchasing) return;
    setError(null);
    setIsRestoring(true);
    const ok = await restorePurchases();
    setIsRestoring(false);
    if (ok) {
      if (user?.id) {
        try {
          await supabase
            .from('profiles')
            .update({ subscribed: true, updated_at: new Date().toISOString() })
            .eq('id', user.id);
          sessionStorage.removeItem(`elecmate_sub_cache_${user.id}`);
        } catch (updateError) {
          console.warn('Profile update after restore failed:', updateError);
        }
      }
      navigate('/dashboard');
    } else {
      setError(
        'We could not find an active subscription to restore on this account. If you have just paid, wait a minute and try again, or contact info@elec-mate.com.'
      );
    }
  }, [isRestoring, isPurchasing, restorePurchases, navigate, user?.id]);

  // Auth / subscription guards only. The redirect to Stripe no longer fires
  // on mount — users now have to click the CTA to continue, so they see the
  // plan summary, trial terms and price on our side first. (ELE-804 follow-up:
  // web users were being auto-bounced to Stripe and bouncing at card entry
  // because the price landed cold.)
  useEffect(() => {
    if (!user) {
      navigate('/auth/signin');
      return;
    }
    if (!profile) return;
    if (profile.subscribed || profile.free_access_granted) {
      navigate('/dashboard');
    }
  }, [navigate, profile, user]);

  const handleSignOut = async () => {
    if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
    storageRemoveSync('elec-mate-checkout-planId');
    storageRemoveSync('elec-mate-checkout-priceId');
    storageRemoveSync('elec-mate-profile-role');
    await signOut();
    window.location.replace('/');
  };

  const platform = Capacitor.getPlatform();
  const persistentError =
    isNative && !packagesReady && retryCount >= MAX_PACKAGE_RETRIES && !isRetrying;
  const ctaLoading =
    isRedirecting || isPurchasing || (isNative && packagesLoading && !displayError) || isRetrying;

  const plan: Plan = priceInfo.planId.startsWith('apprentice') ? 'apprentice' : 'electrician';
  const trialEnd = dayMonth(trialEndDate());
  const store = platform === 'ios' ? 'Apple' : 'Google';

  if (isRedirecting && !displayError) {
    return (
      <div className="flex min-h-[100svh] items-center justify-center bg-background p-6 text-white">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <Loader2 className="mx-auto h-7 w-7 animate-spin text-elec-yellow" />
          <h1 className="mt-5 text-[18px] font-semibold text-white">Setting up your free week</h1>
          <p className="mt-1 text-[14px] text-white">Taking you to secure checkout</p>
        </motion.div>
      </div>
    );
  }

  const primaryLabel = ctaLoading
    ? isPurchasing
      ? 'Processing'
      : isRedirecting
        ? 'Redirecting'
        : 'Loading plans'
    : displayError
      ? 'Try again'
      : isNative
        ? 'Start free trial'
        : 'Continue to secure checkout';

  return (
    <AuthFrame
      step={{ current: 2, total: JOURNEY.length }}
      panel={{
        headline: (
          <>
            Seven days free. <span className="text-elec-yellow">£0 today.</span>
          </>
        ),
        sub: `${userCount} electricians and apprentices run their work on Elec-Mate.`,
      }}
      footer={
        <ShellFooter>
          <button
            type="button"
            onClick={isNative ? startNativePurchase : startCheckout}
            disabled={ctaLoading || persistentError}
            className={cn(buttonPrimaryCn, 'flex w-full items-center justify-center')}
          >
            {ctaLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {primaryLabel}
          </button>
        </ShellFooter>
      }
    >
      <div className="space-y-6">
        <AuthHeading
          title="Start your free week"
          sub={
            <>
              <span className="font-semibold text-elec-yellow">£0 today</span>, then {payMonthly}
              /mo. Cancel any time.
            </>
          }
        />
        <Section title="Your plan">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[19px] font-bold tracking-tight text-white">{PLANS[plan].label}</p>
            {terms && (
              <span className="text-right text-[13px] font-semibold text-elec-yellow">
                {offerLabel(terms)}
              </span>
            )}
          </div>
          <PlanRows plan={plan} terms={terms} />
          <p className="text-[13px] text-white">
            {isNative
              ? `Secured by ${store}. Cancel any time from your ${store} subscription settings.`
              : 'Card taken at secure checkout by Stripe. Cancel any time from Settings → Subscription — two clicks, no phone calls.'}
          </p>
          {isNative && (
            <p className="text-[11px] leading-relaxed text-white">
              Payment is charged to your {platform === 'ios' ? 'Apple ID' : 'Google account'} at
              confirmation and auto-renews unless cancelled 24h before the period ends.
            </p>
          )}
        </Section>

        <Section title="What happens next">
          <dl className="divide-y divide-white/[0.08] border-t border-white/[0.08]">
            {[
              {
                k: 'Today',
                v: 'Full access to every tool, certificate and course. Nothing charged.',
              },
              { k: 'Before it ends', v: 'We remind you, so there are no surprises.' },
              {
                k: trialEnd,
                v: `First payment of ${payMonthly}/month${offerLine ? ` (${offerLine})` : ''}, only if you keep it.`,
              },
            ].map((r) => (
              <div key={r.k} className="grid grid-cols-[110px_1fr] gap-3 py-2.5">
                <dt className="text-[13px] font-semibold text-elec-yellow">{r.k}</dt>
                <dd className="text-[13.5px] leading-snug text-white">{r.v}</dd>
              </div>
            ))}
          </dl>
          <div className="border-t border-white/[0.08] pt-3">
            <p className="text-[13px] font-semibold text-white">Included</p>
            <ul className="mt-1.5 space-y-1">
              {FEATURES.map((f) => (
                <li key={f} className="text-[13.5px] text-white">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {(displayError || persistentError) && (
          <div
            role="alert"
            className="space-y-3 rounded-xl border border-red-400/40 bg-red-500/[0.10] px-4 py-3"
          >
            <p className="text-[13.5px] font-medium text-red-200">
              {displayError || 'Payment options could not be loaded.'}
            </p>
            {isNative && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleManualRetry}
                  className={cn(buttonSecondaryCn, 'flex-1')}
                >
                  Retry
                </button>
                <a
                  href="mailto:info@elec-mate.com"
                  className={cn(buttonSecondaryCn, 'flex flex-1 items-center justify-center')}
                >
                  Contact support
                </a>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-x-4">
          {isNative && (
            <button
              type="button"
              onClick={handleRestore}
              disabled={isRestoring || isPurchasing}
              className="h-11 text-[13px] font-semibold text-elec-yellow touch-manipulation disabled:opacity-50"
            >
              {isRestoring ? 'Restoring…' : 'Already subscribed? Restore purchase'}
            </button>
          )}
          <button
            type="button"
            onClick={handleSignOut}
            className="h-11 text-[13px] font-semibold text-white touch-manipulation"
          >
            Not you? Sign out
          </button>
        </div>
      </div>
    </AuthFrame>
  );
};

export default CheckoutTrial;
