import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Loader2, CreditCard, Shield, Zap, Check, LogOut, ArrowRight, RefreshCw, Mail } from 'lucide-react';
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
  const packagesLoading = isNative && (!isInitialised || (isInitialised && !availablePackages.length && retryCount < MAX_PACKAGE_RETRIES));

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

  // Auto-retry loading packages on native if they don't arrive within 3s
  useEffect(() => {
    if (!isNative || packagesReady || !isInitialised) return;
    if (retryCount >= MAX_PACKAGE_RETRIES) return;

    retryTimerRef.current = setTimeout(async () => {
      console.log(`[CheckoutTrial] Auto-retrying loadOfferings (attempt ${retryCount + 1})`);
      setIsRetrying(true);
      await loadOfferings();
      setRetryCount((c) => c + 1);
      setIsRetrying(false);
    }, 3000);

    return () => {
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
    };
  }, [isNative, packagesReady, isInitialised, retryCount, loadOfferings]);

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
      setError('Payment options are still loading. Please wait a moment and try again.');
      return;
    }

    setError(null);

    // Pick the package matching the user's plan (electrician vs apprentice)
    const pkg = getPackageForPlan(priceInfo.planId) ?? availablePackages[0];
    if (!pkg) {
      setError('Could not find your subscription plan. Please contact support.');
      return;
    }

    const success = await purchasePackage(pkg);
    if (success) {
      // Navigate with actual plan ID so payment-success shows correct tier
      navigate(`/payment-success?plan=${priceInfo.planId}&trial=true`);
    }
  }, [packagesReady, getPackageForPlan, priceInfo.planId, availablePackages, purchasePackage, navigate]);

  // Auth / subscription guard
  useEffect(() => {
    if (!user) { navigate('/auth/signin'); return; }
    if (!profile) return;
    if (profile?.subscribed || profile?.free_access_granted) { navigate('/dashboard'); return; }

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
    navigate('/');
  };

  const trialEndDate = new Date(Date.now() + 7 * 86400000).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  // Web: show full-screen loading while auto-redirecting to Stripe
  if (isRedirecting && !error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black flex flex-col items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-elec-yellow/20 flex items-center justify-center mx-auto mb-5">
            <Loader2 className="h-8 w-8 text-elec-yellow animate-spin" />
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Setting up your trial...</h1>
          <p className="text-white text-[14px]">Redirecting to secure checkout</p>
        </motion.div>
      </div>
    );
  }

  // Derive CTA state for native
  const persistentError = isNative && !packagesReady && retryCount >= MAX_PACKAGE_RETRIES && !isRetrying;
  const ctaLoading = isRedirecting || isPurchasing || (isNative && packagesLoading && !error) || isRetrying;

  const benefits = isNative
    ? [
        'Full access to all features for 7 days',
        'No charge until your trial ends',
        'Cancel anytime before the trial ends',
        'Automatic subscription after trial',
      ]
    : [
        'Full access to all features for 7 days',
        'Card held securely — not charged today',
        'Cancel anytime before the trial ends',
        'Automatic subscription after trial',
      ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black flex flex-col overflow-auto pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]">
      {/* Animated background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-elec-yellow/20 blur-[150px]"
        />
      </div>

      <main className="relative flex-1 flex flex-col items-center justify-center px-5 py-10 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-elec-yellow/30 to-amber-500/20 border border-elec-yellow/30 flex items-center justify-center">
                <CreditCard className="h-9 w-9 text-elec-yellow" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center"
              >
                <Shield className="h-4 w-4 text-green-400" />
              </motion.div>
            </div>
          </div>

          {/* Headline — native and web have distinct copy */}
          <div className="text-center mb-6">
            <h1 className="text-[24px] font-bold text-white tracking-tight mb-2">
              {isNative ? 'Start your free trial' : 'Complete your free trial setup'}
            </h1>
            <p className="text-[15px] text-white leading-relaxed">
              {isNative
                ? `Get 7 days of full access — payment handled securely by ${Capacitor.getPlatform() === 'ios' ? 'Apple' : 'Google'}. You won't be charged until `
                : "Enter your card details to start your 7-day free trial. You won't be charged until "}
              <span className="text-white font-medium">{trialEndDate}</span>.
            </p>
          </div>

          {/* Error state */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 space-y-3"
            >
              <p className="text-[14px] text-red-400 text-center">{error}</p>
              {isNative && (
                <button
                  onClick={handleManualRetry}
                  className="w-full flex items-center justify-center gap-2 text-[13px] text-white font-medium py-2 rounded-xl bg-white/10 hover:bg-white/15 touch-manipulation"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Try again
                </button>
              )}
            </motion.div>
          )}

          {/* Persistent failure — support link */}
          {persistentError && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-5 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3"
            >
              <p className="text-[13px] text-amber-300 text-center">
                Payment options couldn't be loaded. This may be a temporary issue.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleManualRetry}
                  className="flex-1 flex items-center justify-center gap-1.5 text-[12px] text-white font-medium py-2 rounded-xl bg-white/10 hover:bg-white/15 touch-manipulation"
                >
                  <RefreshCw className="h-3 w-3" /> Retry
                </button>
                <a
                  href="mailto:support@elec-mate.com"
                  className="flex-1 flex items-center justify-center gap-1.5 text-[12px] text-white font-medium py-2 rounded-xl bg-white/10 hover:bg-white/15 touch-manipulation"
                >
                  <Mail className="h-3 w-3" /> Contact support
                </a>
              </div>
            </motion.div>
          )}

          {/* Benefits */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-elec-yellow" />
              <span className="text-[13px] font-semibold text-white">What you get</span>
            </div>
            <div className="space-y-2.5">
              {benefits.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-green-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-green-400" />
                  </div>
                  <span className="text-[14px] text-white leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA — 3 visual states: loading / error / ready */}
          <Button
            onClick={isNative ? startNativePurchase : startCheckout}
            disabled={ctaLoading || persistentError}
            className={cn(
              'w-full h-14 rounded-2xl text-[16px] font-semibold transition-all duration-200 touch-manipulation',
              ctaLoading
                ? 'bg-white/20 text-white/60 cursor-not-allowed'
                : error
                  ? 'bg-red-500/80 hover:bg-red-500 text-white shadow-lg shadow-red-500/20'
                  : 'bg-elec-yellow hover:bg-elec-yellow/90 text-black shadow-lg shadow-elec-yellow/25'
            )}
          >
            {ctaLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {isPurchasing ? 'Processing...' : isRedirecting ? 'Redirecting...' : 'Loading plans...'}
              </>
            ) : error ? (
              <>
                <RefreshCw className="mr-2 h-5 w-5" />
                Try again
              </>
            ) : (
              <>
                {isNative ? 'Start Free Trial' : 'Continue to Checkout'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>

          {/* Loading hint while packages fetch */}
          {isNative && packagesLoading && !error && (
            <p className="text-center text-[11px] text-white/50 mt-2">
              Loading payment options...
            </p>
          )}

          {/* Trust signals */}
          <div className="flex items-center justify-center gap-4 mt-4 text-[11px] text-white">
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-green-500/60" />
              {isNative ? `Secured by ${Capacitor.getPlatform() === 'ios' ? 'Apple' : 'Google'}` : 'Secured by Stripe'}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Cancel anytime</span>
          </div>

          {/* Native IAP disclosure (required by Apple/Google) */}
          {isNative && (
            <p className="text-[10px] text-white text-center mt-3 leading-relaxed">
              Payment will be charged to your{' '}
              {Capacitor.getPlatform() === 'ios' ? 'Apple ID' : 'Google account'} at confirmation of
              purchase. Subscription automatically renews unless cancelled at least 24 hours before
              the end of the current period. 7-day free trial. Cancel anytime.
            </p>
          )}

          {/* Sign out — clearer label so users know what it does */}
          <div className="mt-8 text-center">
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 text-[13px] text-white/60 hover:text-white transition-colors touch-manipulation py-2 px-3 rounded-xl"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out and return to welcome screen
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default CheckoutTrial;
