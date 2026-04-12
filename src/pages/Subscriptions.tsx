import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Lock,
  RotateCcw,
  Zap,
  Loader2,
  Crown,
  CalendarClock,
  ExternalLink,
  Shield,
  AlertTriangle,
  RefreshCw,
  GraduationCap,
  Building2,
  Bot,
  Check,
  X,
  Star,
  Sparkles,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FeatureComparison from '@/components/subscriptions/FeatureComparison';
import SubscriptionFAQ from '@/components/subscriptions/SubscriptionFAQ';
import SupportSection from '@/components/subscriptions/SupportSection';
import { useRevenueCat } from '@/hooks/useRevenueCat';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Capacitor } from '@capacitor/core';
import { supabase } from '@/integrations/supabase/client';
import { stripePriceData, nativePriceData, PlanDetails } from '@/data/stripePrices';
import { cn } from '@/lib/utils';
import { capturePaymentError, trackMilestone, addBreadcrumb } from '@/lib/sentry';
import { trackFeatureUse } from '@/components/ActivityTracker';
import { openExternalUrl } from '@/utils/open-external-url';
import { storageGetSync, storageRemoveSync } from '@/utils/storage';

// ─── Plan name mapping ────────────────────────────────────────────────────────
const PLAN_DISPLAY_NAMES: Record<string, string> = {
  business_ai: 'Mate Plan',
  mate: 'Mate Plan',
  electrician: 'Electrician Pro',
  elecmate_electrician_monthly: 'Electrician Pro',
  apprentice: 'Apprentice',
  elecmate_apprentice_monthly: 'Apprentice',
  employer: 'Employer',
};

const PLAN_COLOURS: Record<string, { border: string; glow: string; badge: string }> = {
  'Mate Plan': {
    border: 'border-amber-500/50',
    glow: 'shadow-[0_0_24px_-4px_rgba(245,158,11,0.25)]',
    badge: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
  },
  'Electrician Pro': {
    border: 'border-elec-yellow/50',
    glow: 'shadow-[0_0_24px_-4px_rgba(250,204,21,0.25)]',
    badge: 'bg-elec-yellow text-black',
  },
  Apprentice: {
    border: 'border-blue-500/50',
    glow: 'shadow-[0_0_24px_-4px_rgba(59,130,246,0.25)]',
    badge: 'bg-blue-500 text-white',
  },
  Employer: {
    border: 'border-purple-500/50',
    glow: 'shadow-[0_0_24px_-4px_rgba(168,85,247,0.25)]',
    badge: 'bg-purple-500 text-white',
  },
};

const getPlanDisplayName = (tier: string | null): string => {
  if (!tier) return 'Free';
  return PLAN_DISPLAY_NAMES[tier] || PLAN_DISPLAY_NAMES[tier.toLowerCase()] || tier;
};

const getPlanIcon = (displayName: string) => {
  switch (displayName) {
    case 'Apprentice':
      return GraduationCap;
    case 'Electrician Pro':
      return Zap;
    case 'Mate Plan':
      return Bot;
    case 'Employer':
      return Building2;
    default:
      return Crown;
  }
};

// ─── Component ────────────────────────────────────────────────────────────────

const Subscriptions = () => {
  const { user, isSubscribed, subscriptionTier, isTrialActive, trialEndsAt, profile } = useAuth();
  const {
    isNative,
    restorePurchases,
    isPurchasing,
    availablePackages,
    purchasePackage,
    getPackageForPlan,
    error: rcError,
    loadOfferings,
  } = useRevenueCat(user?.id);
  const { toast } = useToast();

  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [isPortalLoading, setIsPortalLoading] = useState(false);
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [showError, setShowError] = useState(true);

  const plans = isNative ? nativePriceData[billing] : stripePriceData[billing];
  const planDisplayName = getPlanDisplayName(subscriptionTier);
  const planColours = PLAN_COLOURS[planDisplayName] || PLAN_COLOURS['Electrician Pro'];
  const PlanIconComponent = getPlanIcon(planDisplayName);

  // Track viewing pricing page
  useEffect(() => {
    trackFeatureUse(user?.id || '', 'viewed_pricing', {});
  }, []);

  // ── Trial helpers ─────────────────────────────────────────────────────────
  const getDaysRemaining = (): number => {
    if (!trialEndsAt) return 0;
    const diff = trialEndsAt.getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / 86_400_000));
  };

  const getRenewalDate = (): string | null => {
    if (profile?.subscription_end) {
      return new Date(profile.subscription_end).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }
    return null;
  };

  // ── Stripe portal ─────────────────────────────────────────────────────────
  const openCustomerPortal = async () => {
    try {
      setIsPortalLoading(true);

      if (isNative) {
        const platform = Capacitor.getPlatform();
        const url =
          platform === 'ios'
            ? 'https://apps.apple.com/account/subscriptions'
            : 'https://play.google.com/store/account/subscriptions';
        openExternalUrl(url);
        return;
      }

      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error) throw new Error(error.message);

      if (data?.noStripeCustomer) {
        toast({
          title: 'Subscription managed elsewhere',
          description:
            'Your subscription is managed via the App Store or was granted directly. Contact support if you need help.',
        });
        return;
      }

      if (data?.url) {
        openExternalUrl(data.url);
      } else {
        throw new Error('No portal URL returned');
      }
    } catch (err) {
      console.error('Customer portal error:', err);
      toast({
        title: 'Error',
        description: 'Could not open subscription management. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsPortalLoading(false);
    }
  };

  // ── Restore purchases ─────────────────────────────────────────────────────
  const handleRestore = async () => {
    const restored = await restorePurchases();
    toast({
      title: restored ? 'Purchases restored' : 'No purchases found',
      description: restored
        ? 'Your subscription has been restored successfully.'
        : "We couldn't find any previous purchases for this account.",
      variant: restored ? 'default' : 'destructive',
    });
  };

  // ── Stripe checkout ───────────────────────────────────────────────────────
  const handleSubscribe = async (planId: string, priceId: string) => {
    try {
      setIsLoading((prev) => ({ ...prev, [planId]: true }));
      addBreadcrumb('Checkout started', 'payment', { planId, priceId });

      const offerCode = storageGetSync('elec-mate-offer-code');
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId, mode: 'subscription', planId, offerCode },
      });

      if (error) throw new Error(error.message);

      if (data?.url) {
        if (offerCode) storageRemoveSync('elec-mate-offer-code');
        trackMilestone('Checkout Session Created', { planId, hasOfferCode: !!offerCode });
        toast({
          title: 'Redirecting to checkout',
          description: offerCode
            ? 'Your discount will be applied automatically.'
            : 'Opening secure Stripe checkout page.',
        });
        openExternalUrl(data.url);
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      capturePaymentError(err instanceof Error ? err : new Error(String(err)), {
        planId,
        priceId,
        context: 'create-checkout',
      });
      toast({
        title: 'Checkout Error',
        description: err instanceof Error ? err.message : 'Failed to start checkout',
        variant: 'destructive',
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, [planId]: false }));
    }
  };

  // ── Native IAP ────────────────────────────────────────────────────────────
  const handleNativePurchase = async (planId: string, planName: string) => {
    const pkg = getPackageForPlan(planId) || availablePackages[0];
    if (!pkg) {
      toast({
        title: 'No packages available',
        description: 'Unable to load subscription packages. Please try again.',
        variant: 'destructive',
      });
      return;
    }
    const success = await purchasePackage(pkg);
    if (success) {
      toast({
        title: 'Subscription active',
        description: `Welcome to Elec-Mate ${planName}! All features are now unlocked.`,
      });
    }
  };

  // ── Trust items ───────────────────────────────────────────────────────────
  const trustItems = [
    {
      icon: Lock,
      text: isNative
        ? `Secure payment via ${Capacitor.getPlatform() === 'ios' ? 'Apple' : 'Google Play'}`
        : 'Secure payment via Stripe',
    },
    { icon: Shield, text: '7-day free trial' },
    { icon: RotateCcw, text: 'Cancel anytime' },
  ];

  // ── Error state ───────────────────────────────────────────────────────────
  const errorMessage = rcError && showError ? rcError : null;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="animate-fade-in min-h-screen bg-background">
      {/* iOS safe area */}
      <div className="pt-[env(safe-area-inset-top)]" />

      {/* Back button */}
      <div className="px-4 pt-3 pb-1">
        <Link to="/dashboard">
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] active:scale-[0.98] -ml-2 h-11 touch-manipulation transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>
      </div>

      <div className="px-4 max-w-2xl mx-auto pb-24 space-y-8">
        {/* ── Current Plan Card ──────────────────────────────────────────── */}
        {isSubscribed && (
          <section
            className={cn(
              'relative rounded-2xl border p-5 overflow-hidden',
              'bg-white/[0.03] backdrop-blur-sm',
              planColours.border,
              planColours.glow
            )}
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />

            <div className="relative space-y-4">
              {/* Plan header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-11 h-11 rounded-xl flex items-center justify-center',
                      planColours.badge
                    )}
                  >
                    <PlanIconComponent className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-white">{planDisplayName}</h2>
                      <div className="px-2 py-0.5 rounded-full bg-green-500/20 border border-green-500/30">
                        <span className="text-[10px] font-bold text-green-400 uppercase tracking-wide">
                          Active
                        </span>
                      </div>
                    </div>
                    {getRenewalDate() && (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <CalendarClock className="h-3 w-3 text-white/70" />
                        <span className="text-xs text-white/70">Renews {getRenewalDate()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Manage button */}
              <Button
                onClick={openCustomerPortal}
                disabled={isPortalLoading}
                className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold rounded-xl touch-manipulation active:scale-[0.98] transition-all"
              >
                {isPortalLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Opening...
                  </>
                ) : (
                  <>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Manage Subscription
                  </>
                )}
              </Button>
            </div>
          </section>
        )}

        {/* ── Trial banner ────────────────────────────────────────────── */}
        {!isSubscribed && isTrialActive && (
          <section className="relative rounded-2xl border border-amber-500/30 bg-amber-500/[0.06] p-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.06] to-transparent pointer-events-none" />
            <div className="relative flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Trial: <span className="text-amber-400">{getDaysRemaining()} days left</span>
                </p>
                <p className="text-xs text-white/70 mt-0.5">Choose a plan to keep your access</p>
              </div>
            </div>
          </section>
        )}

        {/* ── Expired banner (only if they actually HAD a trial) ────── */}
        {!isSubscribed && !isTrialActive && trialEndsAt && (
          <section className="relative rounded-2xl border border-red-500/30 bg-red-500/[0.06] p-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.06] to-transparent pointer-events-none" />
            <div className="relative flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-red-400">Trial expired</p>
                <p className="text-xs text-white mt-0.5">
                  Subscribe below to unlock all features
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ── Header ─────────────────────────────────────────────────── */}
        <section className="text-center space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-white">Choose your plan</h1>
          <p className="text-sm text-white/70">7-day free trial on all plans. Cancel anytime.</p>
        </section>

        {/* ── Error state ────────────────────────────────────────────── */}
        {errorMessage && (
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-500/15 flex items-center justify-center shrink-0">
                <RefreshCw className="h-4 w-4 text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">
                  {errorMessage.includes('cancelled')
                    ? 'Purchase cancelled'
                    : 'Unable to load plans'}
                </p>
                <p className="text-xs text-white/50 mt-0.5">Tap retry to try again</p>
              </div>
              <Button
                onClick={() => loadOfferings()}
                size="sm"
                className="h-9 px-4 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold rounded-xl touch-manipulation active:scale-[0.98]"
              >
                Retry
              </Button>
            </div>
          </section>
        )}

        {/* ── Monthly/Annual Toggle ──────────────────────────────────── */}
        <section className="flex flex-col items-center gap-3">
          <div className="relative inline-flex items-center p-1 rounded-full bg-white/[0.06] border border-white/[0.08]">
            {/* Animated indicator */}
            <div
              className={cn(
                'absolute h-[calc(100%-8px)] rounded-full transition-all duration-300 ease-out',
                'bg-elec-yellow shadow-md shadow-elec-yellow/30',
                billing === 'monthly'
                  ? 'left-1 w-[calc(50%-4px)]'
                  : 'left-[calc(50%+3px)] w-[calc(50%-4px)]'
              )}
            />
            <button
              onClick={() => setBilling('monthly')}
              className={cn(
                'relative z-10 px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300',
                'min-w-[120px] min-h-[44px] touch-manipulation active:scale-[0.98]',
                billing === 'monthly' ? 'text-black' : 'text-white'
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={cn(
                'relative z-10 px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300',
                'min-w-[120px] min-h-[44px] touch-manipulation active:scale-[0.98]',
                billing === 'yearly' ? 'text-black' : 'text-white'
              )}
            >
              Annual
            </button>
          </div>

          {/* Annual savings badge */}
          {billing === 'yearly' && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/15 border border-green-500/25 animate-fade-in">
              <Sparkles className="h-3 w-3 text-green-400" />
              <span className="text-xs font-semibold text-green-400">Save up to 17%</span>
            </div>
          )}
        </section>

        {/* ── Plan Cards — vertical stack ─────────────────────────────── */}
        <section className="space-y-4">
          {plans.map((plan: PlanDetails) => {
            // On native, don't disable any plan — Apple handles upgrades/downgrades
            // and shows the appropriate sheet (upgrade, downgrade, or "already subscribed")
            const isCurrentPlan = isNative ? false : subscriptionTier === plan.name && isSubscribed;
            const isPremium = plan.name === 'Business AI';

            // Native: use hardcoded GBP prices (StoreKit returns USD on TestFlight)
            // Apple's payment sheet always shows the correct local price at checkout
            const nativePackage = isNative ? getPackageForPlan(plan.id) : null;
            const displayPrice = plan.price;

            const cardPlanName =
              plan.name === 'Business AI'
                ? 'Mate Plan'
                : plan.name === 'Electrician'
                  ? 'Electrician Pro'
                  : plan.name;

            const cardIcon = getPlanIcon(cardPlanName);
            const CardIcon = cardIcon;

            return (
              <div
                key={plan.id}
                className={cn(
                  'relative rounded-2xl border overflow-hidden transition-all duration-300',
                  'bg-white/[0.02] backdrop-blur-sm',
                  // Current plan
                  isCurrentPlan && [
                    'ring-2 ring-green-500/60 border-green-500/40',
                    'shadow-[0_0_20px_-4px_rgba(34,197,94,0.2)]',
                  ],
                  // Popular
                  plan.popular &&
                    !isCurrentPlan &&
                    !plan.coming && [
                      'ring-2 ring-elec-yellow/60 border-elec-yellow/40',
                      'shadow-[0_0_24px_-4px_rgba(250,204,21,0.2)]',
                    ],
                  // Premium (Business AI)
                  isPremium &&
                    !isCurrentPlan &&
                    !plan.coming && [
                      'ring-1 ring-amber-500/40 border-amber-500/30',
                      'shadow-[0_0_20px_-4px_rgba(245,158,11,0.15)]',
                    ],
                  // Coming soon
                  plan.coming &&
                    !isCurrentPlan && ['border-purple-500/30 ring-1 ring-purple-500/30'],
                  // Default
                  !plan.popular &&
                    !isPremium &&
                    !isCurrentPlan &&
                    !plan.coming && ['border-white/10']
                )}
              >
                {/* Top badges */}
                {isCurrentPlan && (
                  <div className="bg-green-500 text-white text-[11px] font-bold py-1.5 text-center flex items-center justify-center gap-1.5">
                    <Check className="h-3.5 w-3.5" />
                    YOUR CURRENT PLAN
                  </div>
                )}
                {plan.popular && !isCurrentPlan && !plan.coming && (
                  <div className="bg-gradient-to-r from-elec-yellow to-yellow-500 text-black text-[11px] font-bold py-1.5 text-center flex items-center justify-center gap-1.5">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    MOST POPULAR
                  </div>
                )}
                {isPremium && !isCurrentPlan && !plan.coming && (
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-bold py-1.5 text-center flex items-center justify-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    PREMIUM
                  </div>
                )}
                {plan.coming && !isCurrentPlan && (
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-[11px] font-bold py-1.5 text-center flex items-center justify-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    COMING SOON
                  </div>
                )}

                <div className="p-5 space-y-4">
                  {/* Plan name + icon + price row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'w-11 h-11 rounded-xl flex items-center justify-center',
                          plan.popular
                            ? 'bg-gradient-to-br from-elec-yellow to-yellow-500 text-black shadow-md shadow-elec-yellow/25'
                            : isPremium
                              ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/20'
                              : plan.coming
                                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20'
                                : 'bg-white/[0.06] text-elec-yellow border border-white/10'
                        )}
                      >
                        <CardIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">{cardPlanName}</h3>
                        <p className="text-xs text-white/70 leading-snug mt-0.5">
                          {plan.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price — large and bold */}
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold tracking-tight text-white">
                      {displayPrice}
                    </span>
                    {plan.period && (
                      <span className="text-sm text-white/70 font-medium">{plan.period}</span>
                    )}
                    {plan.savings && (
                      <div className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/25">
                        <Sparkles className="h-2.5 w-2.5 text-green-400" />
                        <span className="text-[11px] font-medium text-green-400">
                          {plan.savings}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  {/* Features */}
                  <div className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-elec-yellow/20 flex items-center justify-center shrink-0 mt-px">
                          <Check className="h-3 w-3 text-elec-yellow" />
                        </div>
                        <span className="text-sm text-white leading-snug">{feature}</span>
                      </div>
                    ))}

                    {plan.notIncluded.length > 0 && <div className="h-px bg-white/[0.04] my-1" />}

                    {plan.notIncluded.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-white/[0.04] flex items-center justify-center shrink-0 mt-px">
                          <X className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-sm text-white line-through decoration-white/20 leading-snug">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA button — full-width */}
                  <Button
                    className={cn(
                      'w-full h-12 text-sm font-bold rounded-xl transition-all duration-300 relative overflow-hidden',
                      'active:scale-[0.98] touch-manipulation',
                      // Popular plan
                      plan.popular &&
                        !isCurrentPlan &&
                        !plan.coming &&
                        'bg-elec-yellow hover:bg-elec-yellow/90 text-black shadow-lg shadow-elec-yellow/20',
                      // Premium plan
                      isPremium &&
                        !isCurrentPlan &&
                        !plan.coming &&
                        'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-lg shadow-amber-500/20',
                      // Coming soon
                      plan.coming &&
                        !isCurrentPlan &&
                        'bg-purple-500/20 text-purple-300 border border-purple-500/30 cursor-default shadow-none hover:bg-purple-500/20',
                      // Current plan
                      isCurrentPlan &&
                        'bg-green-500/20 text-green-400 border border-green-500/30 cursor-default shadow-none hover:bg-green-500/20',
                      // Default
                      !plan.popular &&
                        !isPremium &&
                        !isCurrentPlan &&
                        !plan.coming &&
                        'bg-white/10 hover:bg-white/15 text-white border border-white/20',
                      // Shimmer on popular
                      plan.popular &&
                        !isCurrentPlan &&
                        !plan.coming &&
                        'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700'
                    )}
                    disabled={isCurrentPlan || isLoading[plan.id] || plan.coming || isPurchasing}
                    onClick={() =>
                      isNative
                        ? handleNativePurchase(plan.id, plan.name)
                        : handleSubscribe(plan.id, plan.priceId)
                    }
                  >
                    {isLoading[plan.id] || isPurchasing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : isCurrentPlan ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Current Plan
                      </>
                    ) : plan.coming ? (
                      <>
                        <Clock className="mr-2 h-4 w-4" />
                        Coming Soon
                      </>
                    ) : (
                      <>
                        {isNative ? 'Subscribe' : 'Get Started'}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </section>

        {/* ── Native IAP disclosure ────────────────────────────────────── */}
        {isNative && (
          <section className="text-center space-y-2">
            <p className="text-[11px] text-white/70 leading-relaxed max-w-md mx-auto">
              Payment will be charged to your{' '}
              {Capacitor.getPlatform() === 'ios' ? 'Apple ID' : 'Google account'} at confirmation of
              purchase. Subscription automatically renews unless cancelled at least 24 hours before
              the end of the current period. 7-day free trial. Cancel anytime.
            </p>
            <div className="flex justify-center gap-3">
              <Link
                to="/terms"
                className="text-[11px] text-elec-yellow hover:underline touch-manipulation py-1 px-2"
              >
                Terms of Service
              </Link>
              <Link
                to="/privacy"
                className="text-[11px] text-elec-yellow hover:underline touch-manipulation py-1 px-2"
              >
                Privacy Policy
              </Link>
            </div>
          </section>
        )}

        {/* ── Trust footer ─────────────────────────────────────────────── */}
        <section className="py-4 border-t border-white/[0.06]">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/70">
                <item.icon className="h-4 w-4" />
                <span className="text-xs font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Restore Purchases — native only ──────────────────────────── */}
        {isNative && (
          <section className="flex justify-center -mt-4">
            <Button
              variant="ghost"
              onClick={handleRestore}
              disabled={isPurchasing}
              className="text-sm text-white hover:text-white hover:bg-white/5 h-11 touch-manipulation"
            >
              {isPurchasing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Restoring...
                </>
              ) : (
                <>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Restore Purchases
                </>
              )}
            </Button>
          </section>
        )}

        {/* ── Feature comparison ───────────────────────────────────────── */}
        <section>
          <FeatureComparison />
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section>
          <SubscriptionFAQ />
        </section>

        {/* ── Support ──────────────────────────────────────────────────── */}
        <section>
          <SupportSection />
        </section>
      </div>
    </div>
  );
};

export default Subscriptions;
