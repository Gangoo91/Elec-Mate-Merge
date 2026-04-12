import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  Clock,
  FileCheck,
  GraduationCap,
  Loader2,
  LogOut,
  Mail,
  RefreshCw,
  Shield,
  Wrench,
  Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { storageGetSync, storageRemoveSync } from '@/utils/storage';
import { cn } from '@/lib/utils';
import { useRevenueCat } from '@/hooks/useRevenueCat';
import { useUserCount } from '@/hooks/useUserCount';

const ROLE_TO_PRICE: Record<string, { planId: string; priceId: string; label: string }> = {
  electrician: {
    planId: 'electrician-monthly',
    priceId: 'price_1TKlA12RKw5t5RAmdhZyhX1I',
    label: 'Electrician',
  },
  apprentice: {
    planId: 'apprentice-monthly',
    priceId: 'price_1TKlA22RKw5t5RAmpvhojy0b',
    label: 'Apprentice',
  },
};

const MAX_PACKAGE_RETRIES = 3;

const FEATURES = [
  { icon: FileCheck, label: 'Certificates, quotes and invoices' },
  { icon: Bot, label: 'AI tools built around electrical work' },
  { icon: GraduationCap, label: 'Full Study Centre access' },
  { icon: Wrench, label: 'Every calculator and specialist tool' },
  { icon: Zap, label: 'Unlimited usage during your trial' },
];

const CheckoutTrial = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userCount = useUserCount();

  const {
    isNative,
    isInitialised,
    availablePackages,
    isPurchasing,
    purchasePackage,
    loadOfferings,
    getPackageForPlan,
    error: revenueCatError,
  } = useRevenueCat(user?.id);

  // Merge the hook's error (purchase cancelled, SDK failure) with the local
  // error (Stripe flow, package loading) so the UI shows whichever is active.
  const displayError = error || revenueCatError;

  const role = profile?.role || storageGetSync('elec-mate-profile-role') || 'electrician';
  const priceInfo = ROLE_TO_PRICE[role] || ROLE_TO_PRICE.electrician;

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

      if (data?.url) {
        if (offerCode) storageRemoveSync('elec-mate-offer-code');
        if (referralCode) storageRemoveSync('elec-mate-referral-code');
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
  }, [isRedirecting, priceInfo.planId, priceInfo.priceId]);

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
            subscription_source: 'app_store',
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

  useEffect(() => {
    if (!user) {
      navigate('/auth/signin');
      return;
    }
    if (!profile) return;
    if (profile.subscribed || profile.free_access_granted) {
      navigate('/dashboard');
      return;
    }

    if (!hasAttempted) {
      setHasAttempted(true);
      if (!isNative && !profile.stripe_customer_id) {
        startCheckout();
      }
    }
  }, [hasAttempted, isNative, navigate, profile, startCheckout, user]);

  const handleSignOut = async () => {
    if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
    storageRemoveSync('elec-mate-checkout-planId');
    storageRemoveSync('elec-mate-checkout-priceId');
    storageRemoveSync('elec-mate-profile-role');
    await signOut();
    window.location.replace('/');
  };

  const trialEndDate = new Date(Date.now() + 7 * 86400000).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const platform = Capacitor.getPlatform();
  const persistentError =
    isNative && !packagesReady && retryCount >= MAX_PACKAGE_RETRIES && !isRetrying;
  const ctaLoading =
    isRedirecting ||
    isPurchasing ||
    (isNative && packagesLoading && !displayError) ||
    isRetrying;

  if (isRedirecting && !displayError) {
    return (
      <div className="flex min-h-[100svh] items-center justify-center bg-[#0a0a0a] p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-500/25 bg-yellow-500/[0.12]">
            <Loader2 className="h-7 w-7 animate-spin text-yellow-400" />
          </div>
          <h1 className="mb-2 text-[18px] font-semibold text-white">Setting up your trial...</h1>
          <p className="text-[14px] text-white">Redirecting to secure checkout</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-[100svh] bg-[#0a0a0a]"
      style={{
        background:
          'radial-gradient(ellipse 90% 55% at 50% 0%, rgba(250,204,21,0.07) 0%, transparent 58%), #0a0a0a',
      }}
    >
      <div className="mx-auto grid min-h-[100svh] max-w-[1120px] items-stretch px-5 pb-[calc(env(safe-area-inset-bottom)+24px)] pt-[calc(env(safe-area-inset-top)+24px)] lg:grid-cols-[0.92fr_1.08fr] lg:gap-10 lg:px-8">
        <div className="hidden lg:flex lg:flex-col lg:justify-between lg:py-10">
          <div>
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="Elec-Mate" className="h-11 w-11 rounded-xl object-cover" />
              <span className="text-[22px] font-bold tracking-tight text-white">
                Elec-<span className="text-yellow-400">Mate</span>
              </span>
            </div>

            <div className="mt-14 max-w-[30rem]">
              <h1 className="text-[4rem] font-bold leading-[1.02] tracking-[-0.045em] text-white">
                Your trial.
                <br />
                <span className="text-yellow-400">Zero risk.</span>
              </h1>
              <p className="mt-6 max-w-[26rem] text-lg leading-[1.65] text-white">
                Full access from the moment you start. No charge for 7 days. Cancel in a couple
                of clicks if it is not for you.
              </p>
            </div>
          </div>

          <div className="grid gap-4 text-[14px] leading-[1.7] text-white">
            <div>Plan selected: {priceInfo.label}</div>
            <div>Trial ends on {trialEndDate}</div>
            <div>
              {isNative ? `Secured by ${platform === 'ios' ? 'Apple' : 'Google'}` : 'Secured by Stripe'}
            </div>
            <div>{userCount} UK electricians already live on Elec-Mate.</div>
          </div>
        </div>

        <div className="flex flex-col justify-center py-8 lg:py-10">
          <div className="mx-auto w-full max-w-[440px]">
            <div className="mb-10 flex items-center justify-center gap-3 lg:hidden">
              <img src="/logo.jpg" alt="" className="h-10 w-10 rounded-xl object-cover" />
              <span className="text-[20px] font-bold tracking-tight text-white">
                Elec-<span className="text-yellow-400">Mate</span>
              </span>
            </div>

            <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:p-8">
              <div className="mb-5 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-yellow-500/25 bg-yellow-500/[0.08] px-4 py-2 text-[13px] font-semibold text-yellow-400">
                  <Clock className="h-4 w-4" />
                  7 days free
                </span>
              </div>

              <div className="text-center">
                <h2 className="text-[1.75rem] font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-[2rem]">
                  Start your{' '}
                  <span className="text-yellow-400">{priceInfo.label.toLowerCase()}</span> trial.
                </h2>
                <p className="mx-auto mt-4 max-w-[26rem] text-[15px] leading-[1.7] text-white">
                  {isNative
                    ? `Full access to every feature. Payment is secured by ${platform === 'ios' ? 'Apple' : 'Google'}.`
                    : 'Full access for 7 days. Your card is collected securely at checkout.'}
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-yellow-500/25 bg-yellow-500/[0.12]">
                    <Shield className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-white">
                      You will not be charged for 7 days
                    </p>
                    <p className="mt-0.5 text-[12px] text-white">
                      Trial ends on {trialEndDate}. Cancel in a couple of clicks before then.
                    </p>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {displayError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-5 overflow-hidden"
                  >
                    <div className="space-y-3 rounded-2xl border border-red-500/25 bg-red-500/[0.08] p-4">
                      <p className="text-center text-[14px] font-medium text-white">
                        {displayError}
                      </p>
                      {isNative && (
                        <button
                          onClick={handleManualRetry}
                          className="flex h-11 w-full touch-manipulation items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.06] text-[14px] font-semibold text-white transition-colors hover:bg-white/[0.12]"
                        >
                          <RefreshCw className="h-4 w-4" />
                          Try again
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {persistentError && !displayError && (
                <div className="mt-5 space-y-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4">
                  <p className="text-center text-[14px] font-medium text-white">
                    Payment options could not be loaded
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleManualRetry}
                      className="flex h-11 flex-1 touch-manipulation items-center justify-center gap-2 rounded-xl border border-yellow-500/25 bg-yellow-500/[0.1] text-[13px] font-semibold text-white transition-colors hover:bg-yellow-500/[0.15]"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Retry
                    </button>
                    <a
                      href="mailto:support@elec-mate.com"
                      className="flex h-11 flex-1 touch-manipulation items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.06] text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.10]"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      Support
                    </a>
                  </div>
                </div>
              )}

              <div className="mt-7 space-y-3">
                {FEATURES.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + index * 0.04 }}
                    className="flex items-center gap-3.5"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-yellow-500/25 bg-yellow-500/[0.12]">
                      <item.icon className="h-4 w-4 text-yellow-400" />
                    </div>
                    <span className="text-[14px] font-medium text-white">{item.label}</span>
                  </motion.div>
                ))}
              </div>

              <Button
                onClick={isNative ? startNativePurchase : startCheckout}
                disabled={ctaLoading || persistentError}
                className={cn(
                  'mt-8 h-14 w-full touch-manipulation rounded-2xl text-[16px] font-bold transition-all duration-150',
                  ctaLoading
                    ? 'cursor-not-allowed bg-white/[0.08] text-white'
                    : displayError
                      ? 'border border-white/[0.12] bg-white/[0.06] text-white hover:bg-white/[0.12]'
                      : 'bg-yellow-500 text-black hover:bg-yellow-400'
                )}
              >
                {ctaLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {isPurchasing
                      ? 'Processing...'
                      : isRedirecting
                        ? 'Redirecting...'
                        : 'Loading plans...'}
                  </>
                ) : displayError ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try again
                  </>
                ) : (
                  <>
                    {isNative ? 'Start free trial' : 'Continue to secure checkout'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              {isNative && packagesLoading && !displayError && (
                <p className="mt-3 text-center text-[12px] text-white">Loading payment options...</p>
              )}

              <div className="mt-6 border-t border-white/[0.08] pt-5">
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12px] text-white">
                  <span className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-yellow-400" />
                    {isNative
                      ? `Secured by ${platform === 'ios' ? 'Apple' : 'Google'}`
                      : 'Secured by Stripe'}
                  </span>
                  <span>Cancel anytime</span>
                  <span>No charge until {trialEndDate}</span>
                </div>

                <p className="mt-3 text-center text-[12px] text-white">
                  Joining{' '}
                  <span className="font-semibold text-yellow-400">{userCount}</span> UK
                  electricians already live.
                </p>

                {isNative && (
                  <p className="mx-auto mt-3 max-w-[320px] text-center text-[10px] leading-relaxed text-white">
                    Payment is charged to your{' '}
                    {platform === 'ios' ? 'Apple ID' : 'Google account'} at confirmation and
                    auto-renews unless cancelled 24h before the period ends.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={handleSignOut}
                className="inline-flex touch-manipulation items-center gap-1.5 rounded-xl px-4 py-2 text-[12px] text-white transition-colors hover:text-yellow-400"
              >
                <LogOut className="h-3 w-3" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutTrial;
