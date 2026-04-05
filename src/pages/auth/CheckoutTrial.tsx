import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageGetSync, storageRemoveSync } from '@/utils/storage';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Loader2,
  Shield,
  Zap,
  LogOut,
  ArrowRight,
  RefreshCw,
  Mail,
  Clock,
  FileCheck,
  GraduationCap,
  Bot,
  Wrench,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Capacitor } from '@capacitor/core';
import { useRevenueCat } from '@/hooks/useRevenueCat';

// Role → Stripe price mapping
const ROLE_TO_PRICE: Record<string, { planId: string; priceId: string }> = {
  electrician: { planId: 'electrician-monthly', priceId: 'price_1SqJVr2RKw5t5RAmaiTGelLN' },
  apprentice: { planId: 'apprentice-monthly', priceId: 'price_1SmUef2RKw5t5RAmRIMTWTqU' },
};

const MAX_PACKAGE_RETRIES = 3;

const FEATURES = [
  { icon: FileCheck, label: 'Certificates, quotes & invoices' },
  { icon: Bot, label: 'AI design consultations' },
  { icon: GraduationCap, label: 'Full study centre access' },
  { icon: Wrench, label: 'Every calculator & tool' },
  { icon: Zap, label: 'Unlimited usage — no caps' },
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

  const {
    isNative,
    isInitialised,
    availablePackages,
    isPurchasing,
    purchasePackage,
    loadOfferings,
    getPackageForPlan,
  } = useRevenueCat(user?.id);

  // Determine plan from profile role or localStorage fallback
  const role = profile?.role || storageGetSync('elec-mate-profile-role') || 'electrician';
  const priceInfo = ROLE_TO_PRICE[role] || ROLE_TO_PRICE.electrician;

  // Whether native payment options are ready
  const packagesReady = isInitialised && availablePackages.length > 0;
  // Stay in loading state while: not yet initialised, OR initialised but no packages and still retrying
  const packagesLoading =
    isNative &&
    !packagesReady &&
    (!isInitialised || retryCount < MAX_PACKAGE_RETRIES || isRetrying);

  // Backfill role to profile if missing (handles race condition from signup)
  useEffect(() => {
    if (user?.id && profile && !profile.role) {
      supabase
        .from('profiles')
        .update({ role, updated_at: new Date().toISOString() })
        .eq('id', user.id)
        .then(({ error }) => {
          if (error) console.warn('Failed to backfill role:', error);
        });
    }
  }, [user?.id, profile, role]);

  // Auto-retry loading packages on native if they don't arrive after init
  useEffect(() => {
    if (!isNative || packagesReady || !isInitialised) return;
    if (retryCount >= MAX_PACKAGE_RETRIES) return;

    const delay = retryCount === 0 ? 1500 : 3000;

    retryTimerRef.current = setTimeout(async () => {
      console.log(
        `[CheckoutTrial] Auto-retrying loadOfferings (attempt ${retryCount + 1}/${MAX_PACKAGE_RETRIES})`
      );
      setIsRetrying(true);
      await loadOfferings();
      setRetryCount((c) => c + 1);
      setIsRetrying(false);
    }, delay);

    return () => {
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
    };
  }, [isNative, packagesReady, isInitialised, retryCount, loadOfferings]);

  // Reset retry count when packages finally arrive
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
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err: unknown) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'Failed to start checkout. Please try again.');
      setIsRedirecting(false);
    }
  }, [isRedirecting, priceInfo]);

  // Native IAP purchase handler
  const startNativePurchase = useCallback(async () => {
    if (!packagesReady) {
      setIsRetrying(true);
      await loadOfferings();
      setIsRetrying(false);

      if (!availablePackages.length) {
        setError(
          'Subscription plans are taking longer than usual to load. Please check your internet connection and try again.'
        );
        return;
      }
    }

    setError(null);

    const pkg = getPackageForPlan(priceInfo.planId) ?? availablePackages[0];
    if (!pkg) {
      setError(
        'Could not find your subscription plan. Please try again or contact support@elec-mate.com.'
      );
      return;
    }

    const success = await purchasePackage(pkg);
    if (success) {
      // ELE-509: Immediately update Supabase profile so ProtectedRoute doesn't loop
      // Don't wait for RC webhook — set subscribed=true now
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

        // Clear subscription status cache so ProtectedRoute gets fresh data
        if (user?.id) {
          sessionStorage.removeItem(`elecmate_sub_cache_${user.id}`);
        }
      } catch (updateErr) {
        console.warn('Profile update after purchase failed (webhook will handle):', updateErr);
      }

      navigate(`/payment-success?plan=${priceInfo.planId}&trial=true`);
    }
  }, [
    packagesReady,
    getPackageForPlan,
    priceInfo.planId,
    availablePackages,
    purchasePackage,
    navigate,
    loadOfferings,
  ]);

  // Auth / subscription guard
  useEffect(() => {
    if (!user) {
      navigate('/auth/signin');
      return;
    }
    if (!profile) return;
    if (profile?.subscribed || profile?.free_access_granted) {
      navigate('/dashboard');
      return;
    }

    if (!hasAttempted) {
      setHasAttempted(true);
      if (!isNative && !profile?.stripe_customer_id) {
        startCheckout();
      }
    }
  }, [user, profile, hasAttempted, navigate, startCheckout, isNative]);

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

  // Derive CTA state for native
  const persistentError =
    isNative && !packagesReady && retryCount >= MAX_PACKAGE_RETRIES && !isRetrying;
  const ctaLoading =
    isRedirecting || isPurchasing || (isNative && packagesLoading && !error) || isRetrying;

  // Web: full-screen loading while auto-redirecting to Stripe
  if (isRedirecting && !error) {
    return (
      <div className="min-h-[100svh] bg-[#0a0a0a] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-elec-yellow/10 ring-1 ring-elec-yellow/20 flex items-center justify-center mx-auto mb-6">
            <Loader2 className="h-7 w-7 text-elec-yellow animate-spin" />
          </div>
          <h1 className="text-[18px] font-semibold text-white mb-2">Setting up your trial...</h1>
          <p className="text-[14px] text-white">Redirecting to secure checkout</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-[100svh] flex flex-col relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(250,204,21,0.06) 0%, transparent 60%), #0a0a0a',
      }}
    >
      <div className="flex-1 flex flex-col justify-center px-5 py-10 pt-[calc(env(safe-area-inset-top)+48px)] pb-[calc(env(safe-area-inset-bottom)+24px)]">
        <div className="w-full max-w-[400px] mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-10"
          >
            <img
              src="/logo.jpg"
              alt=""
              className="w-11 h-11 rounded-xl object-cover ring-1 ring-white/10"
            />
            <span className="text-[20px] font-bold tracking-tight">
              <span className="text-elec-yellow">Elec-</span>
              <span className="text-white">Mate</span>
            </span>
          </motion.div>

          {/* Trial badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 }}
            className="flex justify-center mb-5"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-elec-yellow/8 ring-1 ring-elec-yellow/15 text-[13px] font-semibold text-elec-yellow tracking-wide">
              <Clock className="h-4 w-4" />7 DAYS FREE
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-7"
          >
            <h1 className="text-[28px] font-bold text-white tracking-tight leading-tight mb-2">
              Start your free trial
            </h1>
            <p className="text-[14px] text-white leading-relaxed">
              {isNative
                ? `Full access to every feature — payment secured by ${platform === 'ios' ? 'Apple' : 'Google'}`
                : 'Full access for 7 days. Card details at checkout.'}
            </p>
          </motion.div>

          {/* No charge callout */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="p-4 rounded-2xl bg-white/[0.04] ring-1 ring-white/[0.08] mb-6"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-elec-yellow/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-white">
                  Not charged until {trialEndDate}
                </p>
                <p className="text-[12px] text-white mt-0.5">
                  Cancel anytime — no commitment, no lock-in
                </p>
              </div>
            </div>
          </motion.div>

          {/* Error states */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden"
              >
                <div className="p-4 rounded-2xl bg-red-500/8 ring-1 ring-red-500/20 space-y-3">
                  <p className="text-[14px] text-white text-center font-medium">{error}</p>
                  {isNative && (
                    <button
                      onClick={handleManualRetry}
                      className="w-full flex items-center justify-center gap-2 text-[14px] text-white font-semibold h-11 rounded-xl bg-white/[0.08] active:bg-white/[0.12] touch-manipulation transition-colors"
                    >
                      <RefreshCw className="h-4 w-4" /> Try again
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {persistentError && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 rounded-2xl bg-white/[0.04] ring-1 ring-white/[0.08] space-y-3"
            >
              <p className="text-[14px] text-white text-center font-medium">
                Payment options couldn't be loaded
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleManualRetry}
                  className="flex-1 flex items-center justify-center gap-2 text-[13px] text-white font-semibold h-11 rounded-xl bg-elec-yellow/10 ring-1 ring-elec-yellow/20 active:bg-elec-yellow/15 touch-manipulation transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5" /> Retry
                </button>
                <a
                  href="mailto:support@elec-mate.com"
                  className="flex-1 flex items-center justify-center gap-2 text-[13px] text-white font-semibold h-11 rounded-xl bg-white/[0.06] ring-1 ring-white/[0.08] active:bg-white/[0.10] touch-manipulation transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" /> Contact support
                </a>
              </div>
            </motion.div>
          )}

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="space-y-3">
              {FEATURES.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.04 }}
                  className="flex items-center gap-3.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/[0.06] ring-1 ring-white/[0.08] flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-4 w-4 text-elec-yellow" />
                  </div>
                  <span className="text-[14px] text-white font-medium">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Button
              onClick={isNative ? startNativePurchase : startCheckout}
              disabled={ctaLoading || persistentError}
              className={cn(
                'w-full h-14 rounded-2xl text-[16px] font-bold transition-all duration-150 touch-manipulation',
                ctaLoading
                  ? 'bg-white/10 text-white cursor-not-allowed'
                  : error
                    ? 'bg-white/10 hover:bg-white/15 text-white ring-1 ring-white/10'
                    : 'bg-[#FFD700] hover:bg-[#FFD700]/90 text-black shadow-[0_2px_24px_rgba(255,215,0,0.2)] active:scale-[0.98]'
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
              ) : error ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" /> Try again
                </>
              ) : (
                <>
                  {isNative ? 'Start Free Trial' : 'Continue to Checkout'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </motion.div>

          {isNative && packagesLoading && !error && (
            <p className="text-center text-[12px] text-white mt-3">Loading payment options...</p>
          )}

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <div className="flex items-center justify-center gap-4 text-[12px] text-white">
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-elec-yellow/50" />
                {isNative
                  ? `Secured by ${platform === 'ios' ? 'Apple' : 'Google'}`
                  : 'Secured by Stripe'}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/15" />
              <span>Cancel anytime</span>
            </div>

            {isNative && (
              <p className="text-[10px] text-white/60 text-center mt-3 leading-relaxed max-w-[320px] mx-auto">
                Payment charged to your {platform === 'ios' ? 'Apple ID' : 'Google account'} at
                confirmation. Auto-renews unless cancelled 24h before period ends.
              </p>
            )}
          </motion.div>

          {/* Sign out */}
          <div className="mt-10 text-center">
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/60 transition-colors touch-manipulation py-2 px-4 rounded-xl"
            >
              <LogOut className="h-3 w-3" /> Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutTrial;
