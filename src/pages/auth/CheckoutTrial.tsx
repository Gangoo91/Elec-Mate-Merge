import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Loader2,
  CreditCard,
  Shield,
  Zap,
  Check,
  LogOut,
  ArrowRight,
  RefreshCw,
  Mail,
  Clock,
  Ban,
  Sparkles,
  Star,
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
  const role = profile?.role || localStorage.getItem('elec-mate-profile-role') || 'electrician';
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

    // First retry fires quickly (1.5s), subsequent retries back off (3s each)
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

  // Reset retry count when packages finally arrive (e.g. after logIn attach)
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
      const offerCode = localStorage.getItem('elec-mate-offer-code');
      const referralCode = localStorage.getItem('elec-mate-referral-code');

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
        if (offerCode) localStorage.removeItem('elec-mate-offer-code');
        if (referralCode) localStorage.removeItem('elec-mate-referral-code');
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

  // Native IAP purchase handler — uses role-matched package, not just availablePackages[0]
  const startNativePurchase = useCallback(async () => {
    if (!packagesReady) {
      // Trigger a manual retry rather than just showing an error
      setIsRetrying(true);
      await loadOfferings();
      setIsRetrying(false);

      // Check again after the retry
      if (!availablePackages.length) {
        setError(
          'Subscription plans are taking longer than usual to load. Please check your internet connection and try again.'
        );
        return;
      }
    }

    setError(null);

    // Pick the package matching the user's plan (electrician vs apprentice)
    const pkg = getPackageForPlan(priceInfo.planId) ?? availablePackages[0];
    if (!pkg) {
      setError(
        'Could not find your subscription plan. Please try again or contact support@elec-mate.com.'
      );
      return;
    }

    const success = await purchasePackage(pkg);
    if (success) {
      // Navigate with actual plan ID so payment-success shows correct tier
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
    localStorage.removeItem('elec-mate-checkout-planId');
    localStorage.removeItem('elec-mate-checkout-priceId');
    localStorage.removeItem('elec-mate-profile-role');
    await signOut();
    window.location.replace('/');
  };

  const trialEndDate = new Date(Date.now() + 7 * 86400000).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const platform = Capacitor.getPlatform();

  // Web: show full-screen loading while auto-redirecting to Stripe
  if (isRedirecting && !error) {
    return (
      <div className="min-h-[100svh] bg-black flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <div className="w-12 h-12 rounded-xl bg-white/[0.10] ring-1 ring-white/20 flex items-center justify-center mx-auto mb-5">
            <Loader2 className="h-6 w-6 text-elec-yellow animate-spin" />
          </div>
          <h1 className="text-[17px] font-semibold text-white mb-1">Setting up your trial...</h1>
          <p className="text-[13px] text-white">Redirecting to secure checkout</p>
        </motion.div>
      </div>
    );
  }

  // Derive CTA state for native
  const persistentError =
    isNative && !packagesReady && retryCount >= MAX_PACKAGE_RETRIES && !isRetrying;
  const ctaLoading =
    isRedirecting || isPurchasing || (isNative && packagesLoading && !error) || isRetrying;

  return (
    <div className="min-h-[100svh] bg-black flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6 py-10 pt-[calc(env(safe-area-inset-top)+40px)] pb-[calc(env(safe-area-inset-bottom)+24px)]">
        <div className="w-full max-w-[380px] mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2.5 mb-8"
          >
            <img src="/logo.jpg" alt="" className="w-8 h-8 rounded-lg object-cover" />
            <span className="text-[16px] font-bold tracking-tight">
              <span className="text-elec-yellow">Elec-</span>
              <span className="text-white">Mate</span>
            </span>
          </motion.div>

          {/* Free trial badge */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="flex justify-center mb-4"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/8 ring-1 ring-green-500/15 text-[12px] font-semibold text-green-400">
              <Clock className="h-3.5 w-3.5" /> 7 days free
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-6"
          >
            <h1 className="text-[24px] font-semibold text-white tracking-tight mb-1.5">
              Start your free trial
            </h1>
            <p className="text-[13px] text-white leading-relaxed">
              {isNative
                ? `Full access — payment secured by ${platform === 'ios' ? 'Apple' : 'Google'}`
                : 'Full access for 7 days. Card details at checkout.'}
            </p>
          </motion.div>

          {/* Not charged callout */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="p-3.5 rounded-xl bg-elec-yellow/[0.04] ring-1 ring-elec-yellow/10 mb-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-elec-yellow/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-4 w-4 text-elec-yellow" />
              </div>
              <div>
                <p className="text-[13px] font-medium text-white">No charge until {trialEndDate}</p>
                <p className="text-[11px] text-white mt-0.5">
                  Cancel anytime in Settings → Subscriptions
                </p>
              </div>
            </div>
          </motion.div>

          {/* Errors */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-5 overflow-hidden"
              >
                <div className="p-3 rounded-lg bg-red-500/8 ring-1 ring-red-500/15 space-y-2">
                  <p className="text-[13px] text-red-400 text-center">{error}</p>
                  {isNative && (
                    <button
                      onClick={handleManualRetry}
                      className="w-full flex items-center justify-center gap-1.5 text-[12px] text-white font-medium py-2 rounded-lg bg-white/[0.10] hover:bg-white/[0.08] touch-manipulation"
                    >
                      <RefreshCw className="h-3 w-3" /> Try again
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
              className="mb-5 p-3 rounded-lg bg-amber-500/8 ring-1 ring-amber-500/15 space-y-2"
            >
              <p className="text-[12px] text-amber-400 text-center">
                Payment options couldn't be loaded.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleManualRetry}
                  className="flex-1 flex items-center justify-center gap-1 text-[11px] text-white font-medium py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] touch-manipulation"
                >
                  <RefreshCw className="h-3 w-3" /> Retry
                </button>
                <a
                  href="mailto:support@elec-mate.com"
                  className="flex-1 flex items-center justify-center gap-1 text-[11px] text-white font-medium py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] touch-manipulation"
                >
                  <Mail className="h-3 w-3" /> Support
                </a>
              </div>
            </motion.div>
          )}

          {/* What's included */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="space-y-2.5">
              {[
                { icon: Zap, text: 'Every feature unlocked', accent: true },
                { icon: CreditCard, text: 'Card held securely — not charged today', accent: false },
                { icon: Star, text: 'Cancel anytime — no lock-in', accent: false },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0',
                      item.accent ? 'bg-elec-yellow/10' : 'bg-white/[0.10]'
                    )}
                  >
                    <item.icon
                      className={cn(
                        'h-3.5 w-3.5',
                        item.accent ? 'text-elec-yellow/70' : 'text-white'
                      )}
                    />
                  </div>
                  <span className="text-[13px] text-white">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Button
              onClick={isNative ? startNativePurchase : startCheckout}
              disabled={ctaLoading || persistentError}
              className={cn(
                'w-full h-12 rounded-xl text-[15px] font-semibold transition-all duration-150 touch-manipulation',
                ctaLoading
                  ? 'bg-white/10 text-white cursor-not-allowed'
                  : error
                    ? 'bg-red-500/80 hover:bg-red-500 text-white'
                    : 'bg-elec-yellow hover:bg-elec-yellow/90 text-black shadow-[0_1px_20px_rgba(250,204,21,0.15)] active:scale-[0.98]'
              )}
            >
              {ctaLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isPurchasing ? 'Processing...' : isRedirecting ? 'Redirecting...' : 'Loading...'}
                </>
              ) : error ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" /> Try again
                </>
              ) : (
                <>
                  {isNative ? 'Start Free Trial' : 'Continue to Checkout'}{' '}
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </>
              )}
            </Button>
          </motion.div>

          {isNative && packagesLoading && !error && (
            <p className="text-center text-[10px] text-white mt-2">Loading payment options...</p>
          )}

          {/* Trust line */}
          <div className="flex items-center justify-center gap-3 mt-5 text-[11px] text-white">
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-green-500/40" />
              {isNative
                ? `Secured by ${platform === 'ios' ? 'Apple' : 'Google'}`
                : 'Secured by Stripe'}
            </span>
            <span className="w-0.5 h-0.5 rounded-full bg-white/10" />
            <span>Cancel anytime</span>
          </div>

          {isNative && (
            <p className="text-[9px] text-white text-center mt-3 leading-relaxed max-w-xs mx-auto">
              Payment charged to your {platform === 'ios' ? 'Apple ID' : 'Google account'} at
              confirmation. Auto-renews unless cancelled 24h before period ends. 7-day free trial.
            </p>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1 text-[11px] text-white hover:text-white transition-colors touch-manipulation py-2 px-3 rounded-lg"
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
