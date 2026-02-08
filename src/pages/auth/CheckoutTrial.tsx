import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Loader2,
  CreditCard,
  Shield,
  Zap,
  Check,
  LogOut,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Role → Stripe price mapping
const ROLE_TO_PRICE: Record<string, { planId: string; priceId: string }> = {
  electrician: { planId: 'electrician-monthly', priceId: 'price_1SqJVr2RKw5t5RAmaiTGelLN' },
  apprentice: { planId: 'apprentice-monthly', priceId: 'price_1SmUef2RKw5t5RAmRIMTWTqU' },
};

const CheckoutTrial = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasAttempted, setHasAttempted] = useState(false);

  // Determine plan from profile role or localStorage fallback
  const role = profile?.role || localStorage.getItem('elec-mate-profile-role') || 'electrician';
  const priceInfo = ROLE_TO_PRICE[role] || ROLE_TO_PRICE.electrician;

  const startCheckout = useCallback(async () => {
    if (isRedirecting) return;

    setIsRedirecting(true);
    setError(null);

    try {
      const offerCode = localStorage.getItem('elec-mate-offer-code');

      const { data, error: fnError } = await supabase.functions.invoke('create-checkout', {
        body: {
          priceId: priceInfo.priceId,
          mode: 'subscription',
          planId: priceInfo.planId,
          offerCode,
        },
      });

      if (fnError) throw new Error(fnError.message);

      if (data?.url) {
        if (offerCode) {
          localStorage.removeItem('elec-mate-offer-code');
        }
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Failed to start checkout. Please try again.');
      setIsRedirecting(false);
    }
  }, [isRedirecting, priceInfo]);

  // Auto-trigger checkout on first mount if user is authenticated
  useEffect(() => {
    if (!user) {
      navigate('/auth/signin');
      return;
    }

    // If user already has an active subscription, skip checkout
    if (profile?.subscribed || profile?.free_access_granted) {
      navigate('/dashboard');
      return;
    }

    // Auto-trigger checkout once
    if (!hasAttempted) {
      setHasAttempted(true);
      startCheckout();
    }
  }, [user, profile, hasAttempted, navigate, startCheckout]);

  const handleSignOut = async () => {
    localStorage.removeItem('elec-mate-checkout-planId');
    localStorage.removeItem('elec-mate-checkout-priceId');
    localStorage.removeItem('elec-mate-profile-role');
    await signOut();
    navigate('/');
  };

  const trialEndDate = new Date(Date.now() + 7 * 86400000).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Show loading while auto-redirecting
  if (isRedirecting && !error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-elec-yellow/20 flex items-center justify-center mx-auto mb-5">
            <Loader2 className="h-8 w-8 text-elec-yellow animate-spin" />
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Setting up your trial...</h1>
          <p className="text-white/50 text-[14px]">Redirecting to secure checkout</p>
        </motion.div>
      </div>
    );
  }

  // Fallback UI when user returns from Stripe (cancelled) or checkout fails
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black flex flex-col overflow-auto">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-elec-yellow/20 blur-[150px]"
        />
      </div>

      {/* Main content */}
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

          {/* Text */}
          <div className="text-center mb-6">
            <h1 className="text-[24px] font-bold text-white tracking-tight mb-2">
              Complete your free trial setup
            </h1>
            <p className="text-[15px] text-white/50 leading-relaxed">
              Enter your card details to start your 7-day free trial.
              You won't be charged until <span className="text-white/70 font-medium">{trialEndDate}</span>.
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-4 rounded-2xl bg-red-500/10 border border-red-500/20"
            >
              <p className="text-[14px] text-red-400 text-center">{error}</p>
            </motion.div>
          )}

          {/* Benefits card */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-elec-yellow" />
              <span className="text-[13px] font-semibold text-white/70">What you get</span>
            </div>
            <div className="space-y-2.5">
              {[
                'Full access to all features for 7 days',
                'Card held securely — not charged today',
                'Cancel anytime before the trial ends',
                'Automatic subscription after trial',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-green-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-green-400" />
                  </div>
                  <span className="text-[14px] text-white/70 leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={startCheckout}
            disabled={isRedirecting}
            className={cn(
              "w-full h-14 rounded-2xl text-[16px] font-semibold",
              "bg-elec-yellow hover:bg-elec-yellow/90 text-black",
              "shadow-lg shadow-elec-yellow/25 transition-all duration-200",
              "touch-manipulation disabled:opacity-50"
            )}
          >
            {isRedirecting ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Redirecting...</>
            ) : (
              <>Continue to Checkout <ArrowRight className="ml-2 h-5 w-5" /></>
            )}
          </Button>

          {/* Trust signals */}
          <div className="flex items-center justify-center gap-4 mt-4 text-[11px] text-white/30">
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-green-500/60" />
              Secured by Stripe
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Cancel anytime</span>
          </div>

          {/* Sign out */}
          <div className="mt-8 text-center">
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 text-[13px] text-white/30 hover:text-white/50 transition-colors touch-manipulation py-2 px-3 rounded-xl"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default CheckoutTrial;
