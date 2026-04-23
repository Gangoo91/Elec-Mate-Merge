import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
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

// ─── Plan name display ────────────────────────────────────────────────────────
const PLAN_DISPLAY_NAMES: Record<string, string> = {
  business_ai: 'Mate',
  mate: 'Mate',
  electrician: 'Electrician',
  elecmate_electrician_monthly: 'Electrician',
  apprentice: 'Apprentice',
  elecmate_apprentice_monthly: 'Apprentice',
  employer: 'Employer',
  college: 'College',
};

const getPlanDisplayName = (tier: string | null): string => {
  if (!tier) return 'Free';
  return PLAN_DISPLAY_NAMES[tier] || PLAN_DISPLAY_NAMES[tier.toLowerCase()] || tier;
};

type WaitlistPlan = 'mate' | 'employer' | 'college';

const PLAN_TO_WAITLIST: Record<string, WaitlistPlan | null> = {
  'business-ai-monthly': 'mate',
  'business-ai-yearly': 'mate',
  'employer-monthly': 'employer',
  'employer-yearly': 'employer',
  'college-monthly': 'college',
  'college-yearly': 'college',
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

  const [searchParams] = useSearchParams();
  const wasCancelled = searchParams.get('cancelled') === '1';

  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [isPortalLoading, setIsPortalLoading] = useState(false);
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [waitlistJoined, setWaitlistJoined] = useState<Record<WaitlistPlan, boolean>>({
    mate: false,
    employer: false,
    college: false,
  });
  const [waitlistLoading, setWaitlistLoading] = useState<Record<WaitlistPlan, boolean>>({
    mate: false,
    employer: false,
    college: false,
  });
  const [matePhoneSheetOpen, setMatePhoneSheetOpen] = useState(false);
  const [matePhoneInput, setMatePhoneInput] = useState('');
  const [matePhoneError, setMatePhoneError] = useState<string | null>(null);

  const plans = isNative ? nativePriceData[billing] : stripePriceData[billing];
  const planDisplayName = getPlanDisplayName(subscriptionTier);

  useEffect(() => {
    trackFeatureUse(user?.id || '', 'viewed_pricing', {});
  }, [user?.id]);

  // ── Load existing waitlist entries so buttons reflect state ───────────────
  useEffect(() => {
    if (!user?.id) return;
    (async () => {
      const { data } = await supabase
        .from('business_ai_waitlist')
        .select('plan')
        .eq('user_id', user.id);
      if (!data) return;
      const next = { mate: false, employer: false, college: false };
      for (const row of data) {
        if (row.plan === 'mate' || row.plan === 'employer' || row.plan === 'college') {
          next[row.plan as WaitlistPlan] = true;
        }
      }
      setWaitlistJoined(next);
    })();
  }, [user?.id]);

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
      if (data?.url) openExternalUrl(data.url);
      else throw new Error('No portal URL returned');
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
        window.location.replace(data.url);
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
      try {
        await supabase.functions.invoke('check-subscription');
      } catch (syncErr) {
        console.warn('[Subscriptions] post-purchase sync failed:', syncErr);
      }
      toast({
        title: 'Subscription active',
        description: `Welcome to Elec-Mate ${planName}! All features are now unlocked.`,
      });
    }
  };

  // ── Join waitlist ─────────────────────────────────────────────────────────
  // Normalises UK mobile input (07.../7.../+447...) to E.164 (+447XXXXXXXXX).
  const normaliseUkMobile = (raw: string): string | null => {
    const digits = raw.replace(/\D/g, '');
    let core: string;
    if (digits.startsWith('44')) core = digits.slice(2);
    else if (digits.startsWith('0')) core = digits.slice(1);
    else core = digits;
    if (!/^7[0-9]{9}$/.test(core)) return null;
    return `+44${core}`;
  };

  const submitWaitlist = useCallback(
    async (plan: WaitlistPlan, phoneNumber?: string) => {
      try {
        setWaitlistLoading((prev) => ({ ...prev, [plan]: true }));
        const { error } = await supabase.functions.invoke('join-waitlist', {
          body: phoneNumber ? { plan, phone_number: phoneNumber } : { plan },
        });
        if (error) throw new Error(error.message);
        setWaitlistJoined((prev) => ({ ...prev, [plan]: true }));
        if (plan === 'mate') setMatePhoneSheetOpen(false);
        toast({
          title: "You're on the list",
          description:
            plan === 'mate'
              ? "We'll WhatsApp you the moment early access opens."
              : "We'll email you the moment early access opens.",
        });
        return true;
      } catch (err) {
        console.error('[Subscriptions] waitlist error:', err);
        if (plan === 'mate') {
          setMatePhoneError(err instanceof Error ? err.message : 'Please try again.');
        } else {
          toast({
            title: 'Could not join waitlist',
            description: err instanceof Error ? err.message : 'Please try again.',
            variant: 'destructive',
          });
        }
        return false;
      } finally {
        setWaitlistLoading((prev) => ({ ...prev, [plan]: false }));
      }
    },
    [toast]
  );

  const handleJoinWaitlist = useCallback(
    async (plan: WaitlistPlan) => {
      if (!user?.id) {
        window.location.href = `/auth?redirect=${encodeURIComponent('/subscriptions')}`;
        return;
      }
      // Mate needs a mobile number for WhatsApp provisioning — open the sheet.
      if (plan === 'mate') {
        setMatePhoneInput('');
        setMatePhoneError(null);
        setMatePhoneSheetOpen(true);
        return;
      }
      await submitWaitlist(plan);
    },
    [user?.id, submitWaitlist]
  );

  const handleConfirmMatePhone = useCallback(async () => {
    const phone = normaliseUkMobile(matePhoneInput);
    if (!phone) {
      setMatePhoneError('Enter a valid UK mobile (e.g. 07700 900123)');
      return;
    }
    setMatePhoneError(null);
    await submitWaitlist('mate', phone);
  }, [matePhoneInput, submitWaitlist]);

  const handleCollegeContact = (email: string) => {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      'Elec-Mate College — pricing enquiry'
    )}`;
  };

  const errorMessage = rcError || null;

  // ── Split plans into row 1 (3-up) and row 2 (2-up) ────────────────────────
  const ROW_1_IDS = new Set([
    'apprentice-monthly',
    'apprentice-yearly',
    'electrician-monthly',
    'electrician-yearly',
    'business-ai-monthly',
    'business-ai-yearly',
  ]);
  const rowOne = plans.filter((p) => ROW_1_IDS.has(p.id));
  const rowTwo = plans.filter((p) => !ROW_1_IDS.has(p.id));

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="animate-fade-in min-h-screen bg-background">
      <div className="pt-[env(safe-area-inset-top)]" />

      {/* Back */}
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

      <div className="px-4 sm:px-6 max-w-6xl mx-auto pb-24 space-y-10 sm:space-y-14">
        {/* Cancelled return */}
        {wasCancelled && (
          <p className="text-[13px] text-white border-l-2 border-yellow-500/60 pl-3 py-1">
            No worries — your trial is still here. Pick a plan below when you're ready.
          </p>
        )}

        {/* Current subscription — proper billing card */}
        {isSubscribed && (
          <section className="relative rounded-3xl border border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(250,204,21,0.08),transparent_55%)] pointer-events-none" />
            <div className="relative p-6 sm:p-7">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                  Your subscription
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-green-400">
                    Active
                  </span>
                </span>
              </div>

              <div className="flex flex-wrap items-end justify-between gap-6">
                <div className="min-w-0 space-y-1.5">
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                    {planDisplayName}
                  </h2>
                  {getRenewalDate() && (
                    <p className="text-sm text-white">
                      Next billing{' '}
                      <span className="text-white font-medium">{getRenewalDate()}</span>
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={openCustomerPortal}
                    disabled={isPortalLoading}
                    variant="outline"
                    className="h-11 px-5 text-sm font-semibold rounded-xl border-white/15 bg-white/[0.03] hover:bg-white/[0.08] text-white touch-manipulation active:scale-[0.98] transition-all"
                  >
                    {isPortalLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Manage billing'
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="h-11 px-5 text-sm font-semibold rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black touch-manipulation active:scale-[0.98] transition-all"
                  >
                    Change plan
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Trial / expired pills */}
        {!isSubscribed && isTrialActive && (
          <p className="text-[13px] text-white border-l-2 border-amber-500/60 pl-3 py-1">
            Trial — {getDaysRemaining()} days left. Choose a plan to keep your access.
          </p>
        )}
        {!isSubscribed && !isTrialActive && trialEndsAt && (
          <p className="text-[13px] text-white border-l-2 border-red-500/60 pl-3 py-1">
            Trial expired. Subscribe below to unlock all features.
          </p>
        )}

        {/* Hero */}
        <header className="text-center space-y-4 pt-4 sm:pt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">
            <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
              Pricing
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
            Built for every stage
            <br />
            <span className="bg-gradient-to-r from-elec-yellow via-amber-300 to-elec-yellow bg-clip-text text-transparent">
              of your trade.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-white max-w-xl mx-auto">
            From first-year apprentice to running the whole firm. Free 7-day trial on every plan —
            no card required.
          </p>
        </header>

        {/* Error (RevenueCat) */}
        {errorMessage && (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
            <p className="text-sm text-white">
              {errorMessage.includes('cancelled') ? 'Purchase cancelled.' : 'Unable to load plans.'}
            </p>
            <Button
              onClick={() => loadOfferings()}
              size="sm"
              variant="ghost"
              className="h-9 px-3 text-sm text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation"
            >
              Retry
            </Button>
          </div>
        )}

        {/* Billing toggle — clean, non-sticky */}
        <div className="flex flex-col items-center gap-3">
          <div className="inline-flex items-center p-1 rounded-full border border-white/10 bg-white/[0.03]">
            <button
              onClick={() => setBilling('monthly')}
              className={cn(
                'px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200',
                'min-h-[40px] touch-manipulation active:scale-[0.98]',
                billing === 'monthly'
                  ? 'bg-elec-yellow text-black shadow-sm'
                  : 'text-white hover:text-white'
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={cn(
                'flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200',
                'min-h-[40px] touch-manipulation active:scale-[0.98]',
                billing === 'yearly'
                  ? 'bg-elec-yellow text-black shadow-sm'
                  : 'text-white hover:text-white'
              )}
            >
              Annual
              <span
                className={cn(
                  'text-[10px] font-bold px-1.5 py-0.5 rounded',
                  billing === 'yearly'
                    ? 'bg-green-500/20 text-green-700'
                    : 'bg-green-500/15 text-green-400'
                )}
              >
                −17%
              </span>
            </button>
          </div>
        </div>

        {/* Row 1: Apprentice · Electrician · Mate */}
        <section
          id="plans"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch scroll-mt-16"
        >
          {rowOne.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isNative={isNative}
              isCurrentPlan={!isNative && subscriptionTier === plan.name && isSubscribed}
              isLoading={!!isLoading[plan.id] || isPurchasing}
              waitlistJoined={waitlistJoined}
              waitlistLoading={waitlistLoading}
              onSubscribe={handleSubscribe}
              onNativePurchase={handleNativePurchase}
              onJoinWaitlist={handleJoinWaitlist}
              onCollegeContact={handleCollegeContact}
            />
          ))}
        </section>

        {/* Row 2: Employer · College (skipped on native where plans aren't offered) */}
        {rowTwo.length > 0 && (
          <section className="grid gap-4 sm:grid-cols-2 items-stretch">
            {rowTwo.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isNative={isNative}
                isCurrentPlan={!isNative && subscriptionTier === plan.name && isSubscribed}
                isLoading={!!isLoading[plan.id] || isPurchasing}
                waitlistJoined={waitlistJoined}
                waitlistLoading={waitlistLoading}
                onSubscribe={handleSubscribe}
                onNativePurchase={handleNativePurchase}
                onJoinWaitlist={handleJoinWaitlist}
                onCollegeContact={handleCollegeContact}
              />
            ))}
          </section>
        )}

        {/* Native IAP disclosure */}
        {isNative && (
          <section className="text-center space-y-2">
            <p className="text-[11px] text-white leading-relaxed max-w-md mx-auto">
              Payment will be charged to your{' '}
              {Capacitor.getPlatform() === 'ios' ? 'Apple ID' : 'Google account'} at confirmation of
              purchase. Subscription automatically renews unless cancelled at least 24 hours before
              the end of the current period. 7-day free trial. Cancel anytime.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/terms"
                className="text-[11px] text-elec-yellow hover:underline touch-manipulation py-1 px-2"
              >
                Terms
              </Link>
              <Link
                to="/privacy"
                className="text-[11px] text-elec-yellow hover:underline touch-manipulation py-1 px-2"
              >
                Privacy
              </Link>
            </div>
          </section>
        )}

        {/* Compare-all link between rows and matrix */}
        <div className="flex justify-center">
          <a
            href="#compare"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-elec-yellow hover:text-elec-yellow/80 transition-colors touch-manipulation py-2"
          >
            Compare all features
            <span aria-hidden>↓</span>
          </a>
        </div>

        {/* Trust strip */}
        <div className="grid grid-cols-3 gap-px rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <div className="bg-background p-4 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white mb-1">
              Secure
            </p>
            <p className="text-[13px] font-medium text-white leading-tight">
              {isNative
                ? Capacitor.getPlatform() === 'ios'
                  ? 'Apple Pay'
                  : 'Google Play'
                : 'Stripe'}
            </p>
          </div>
          <div className="bg-background p-4 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white mb-1">
              Try it
            </p>
            <p className="text-[13px] font-medium text-white leading-tight">7-day free trial</p>
          </div>
          <div className="bg-background p-4 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white mb-1">
              Flexible
            </p>
            <p className="text-[13px] font-medium text-white leading-tight">Cancel anytime</p>
          </div>
        </div>

        {/* Restore purchases (native only) */}
        {isNative && (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              onClick={handleRestore}
              disabled={isPurchasing}
              className="text-sm text-white hover:text-white hover:bg-white/5 h-11 touch-manipulation"
            >
              {isPurchasing ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Restore purchases'}
            </Button>
          </div>
        )}

        {/* Retained: comparison / FAQ / support (untouched this pass) */}
        <FeatureComparison />
        <SubscriptionFAQ />
        <SupportSection />
      </div>

      {/* ═════════ MATE PHONE-CAPTURE SHEET ═══════════════════════ */}
      <Sheet open={matePhoneSheetOpen} onOpenChange={setMatePhoneSheetOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-[28px] border-white/10 bg-background p-0 sm:max-w-lg sm:mx-auto"
        >
          <div
            className="px-6 pt-8 pb-8"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 32px)' }}
          >
            <SheetHeader className="text-left space-y-3 mb-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-elec-yellow">
                One more thing
              </p>
              <SheetTitle className="text-3xl font-bold tracking-[-0.02em] text-white leading-tight">
                Your mobile number.
              </SheetTitle>
              <SheetDescription className="text-white text-base leading-relaxed">
                Mate lives on WhatsApp, so we need your number to set up your account when your
                invite lands.
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="subs-mate-phone"
                  className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white mb-2"
                >
                  UK mobile
                </label>
                <div
                  className={cn(
                    'flex items-center gap-3 h-14 rounded-2xl border bg-white/[0.04] px-4 transition-colors',
                    matePhoneError
                      ? 'border-red-500/60 focus-within:border-red-500/80'
                      : 'border-white/15 focus-within:border-elec-yellow'
                  )}
                >
                  <span className="text-white font-semibold">+44</span>
                  <div className="h-5 w-px bg-white/15" />
                  <input
                    id="subs-mate-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    value={matePhoneInput}
                    onChange={(e) => {
                      setMatePhoneInput(e.target.value);
                      if (matePhoneError) setMatePhoneError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleConfirmMatePhone();
                    }}
                    placeholder="7700 900123"
                    className="flex-1 bg-transparent outline-none text-white text-base placeholder:text-white/35"
                  />
                </div>
                {matePhoneError && (
                  <p className="text-[13px] text-red-400 mt-2 leading-snug">{matePhoneError}</p>
                )}
              </div>

              <Button
                onClick={handleConfirmMatePhone}
                disabled={waitlistLoading.mate}
                className="w-full h-14 rounded-full bg-elec-yellow text-black hover:bg-elec-yellow/90 font-bold text-base shadow-[0_20px_60px_-20px_rgba(250,204,21,0.5)] touch-manipulation active:scale-[0.98] transition-all"
              >
                {waitlistLoading.mate ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Confirm &amp; join waitlist
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <p className="text-[12px] text-white text-center leading-relaxed">
                We&apos;ll only use this to activate Mate on WhatsApp. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

// ─── Plan card ────────────────────────────────────────────────────────────────
interface PlanCardProps {
  plan: PlanDetails;
  isNative: boolean;
  isCurrentPlan: boolean;
  isLoading: boolean;
  waitlistJoined: Record<WaitlistPlan, boolean>;
  waitlistLoading: Record<WaitlistPlan, boolean>;
  onSubscribe: (planId: string, priceId: string) => void;
  onNativePurchase: (planId: string, planName: string) => void;
  onJoinWaitlist: (plan: WaitlistPlan) => void;
  onCollegeContact: (email: string) => void;
}

const PlanCard = ({
  plan,
  isNative,
  isCurrentPlan,
  isLoading,
  waitlistJoined,
  waitlistLoading,
  onSubscribe,
  onNativePurchase,
  onJoinWaitlist,
  onCollegeContact,
}: PlanCardProps) => {
  const waitlistKey = PLAN_TO_WAITLIST[plan.id];
  const joined = waitlistKey ? waitlistJoined[waitlistKey] : false;
  const joining = waitlistKey ? waitlistLoading[waitlistKey] : false;

  const cardClasses = cn(
    'group relative rounded-3xl border overflow-hidden flex flex-col h-full',
    'bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-transparent',
    'transition-all duration-300 hover:border-white/20',
    isCurrentPlan
      ? 'border-green-500/50 shadow-[0_0_0_1px_rgba(34,197,94,0.15)]'
      : plan.popular
        ? 'border-elec-yellow/50 shadow-[0_0_40px_-12px_rgba(250,204,21,0.35),0_0_0_1px_rgba(250,204,21,0.2)]'
        : plan.earlyAccess
          ? 'border-amber-500/30'
          : 'border-white/10'
  );

  // Parse price into main + period halves for big display
  const priceMain = plan.pricingOnRequest ? plan.price : plan.price;
  const showBigPrice = !plan.pricingOnRequest;

  return (
    <div className={cardClasses}>
      {/* Top accent bar on popular */}
      {plan.popular && !isCurrentPlan && (
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-elec-yellow to-transparent" />
      )}

      <div className="p-6 sm:p-7 flex-1 flex flex-col">
        {/* Badge row */}
        <div className="flex items-center justify-between mb-5 min-h-[22px]">
          <h3 className="text-xl font-bold tracking-tight text-white">{plan.name}</h3>
          {isCurrentPlan ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/15 border border-green-500/30">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-green-400">
                Your plan
              </span>
            </span>
          ) : plan.popular ? (
            <span className="px-2.5 py-1 rounded-full bg-elec-yellow text-black text-[10px] font-bold uppercase tracking-wider">
              Most popular
            </span>
          ) : plan.earlyAccess ? (
            <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-[10px] font-bold uppercase tracking-wider text-amber-400">
              Early access
            </span>
          ) : null}
        </div>

        {/* Price — fixed height so all cards align regardless of whether
            the tier shows a numeric price or "Pricing on request" */}
        <div className="mb-2 flex items-end min-h-[3.75rem] sm:min-h-[4.25rem]">
          {showBigPrice ? (
            <div className="flex items-baseline gap-1.5">
              <span className="text-5xl sm:text-[56px] font-extrabold tracking-tight text-white leading-none">
                {priceMain}
              </span>
              {plan.period && (
                <span className="text-base text-white font-medium">{plan.period}</span>
              )}
            </div>
          ) : (
            <div className="text-3xl sm:text-[40px] font-extrabold tracking-tight text-white leading-none">
              {plan.price}
            </div>
          )}
        </div>

        {/* Savings line — reserve a constant row even when blank */}
        <p className="text-xs font-semibold text-green-400 mb-4 min-h-[1rem]">
          {plan.savings ?? '\u00A0'}
        </p>

        {/* Description — fixed height so CTA aligns across cards */}
        <p className="text-sm text-white leading-relaxed mb-6 min-h-[3.25rem] sm:min-h-[3.5rem]">
          {plan.description}
        </p>

        {/* CTA — placed before feature list so buyers see it first */}
        <div className="mb-6">
          {isCurrentPlan ? (
            <Button
              disabled
              className="w-full h-12 text-sm font-semibold rounded-xl bg-green-500/10 text-green-400 border border-green-500/30 cursor-default shadow-none hover:bg-green-500/10"
            >
              Current plan
            </Button>
          ) : plan.pricingOnRequest ? (
            <Button
              onClick={() => onCollegeContact(plan.contactEmail || 'founder@elec-mate.com')}
              className="w-full h-12 text-sm font-bold rounded-xl bg-elec-yellow text-black hover:bg-elec-yellow/90 active:scale-[0.98] touch-manipulation shadow-[0_8px_24px_-8px_rgba(250,204,21,0.5)]"
            >
              {plan.ctaLabel || 'Get in touch'}
            </Button>
          ) : plan.earlyAccess && waitlistKey ? (
            <Button
              onClick={() => onJoinWaitlist(waitlistKey)}
              disabled={joined || joining}
              className={cn(
                'w-full h-12 text-sm font-bold rounded-xl active:scale-[0.98] touch-manipulation transition-all',
                joined
                  ? 'bg-amber-500/10 text-amber-300 border border-amber-500/35 cursor-default hover:bg-amber-500/10'
                  : 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-white shadow-[0_8px_24px_-8px_rgba(245,158,11,0.5)]'
              )}
            >
              {joining ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : joined ? (
                "You're on the list ✓"
              ) : (
                'Join early access'
              )}
            </Button>
          ) : (
            <Button
              onClick={() =>
                isNative ? onNativePurchase(plan.id, plan.name) : onSubscribe(plan.id, plan.priceId)
              }
              disabled={isLoading}
              className={cn(
                'w-full h-12 text-sm font-bold rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black active:scale-[0.98] touch-manipulation transition-all',
                plan.popular
                  ? 'shadow-[0_10px_28px_-8px_rgba(250,204,21,0.7)]'
                  : 'shadow-[0_8px_24px_-8px_rgba(250,204,21,0.45)]'
              )}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isNative ? (
                'Subscribe'
              ) : (
                'Start 7-day trial'
              )}
            </Button>
          )}
        </div>

        {/* Inheritance hint */}
        {plan.inheritsFrom && (
          <p className="text-xs font-semibold text-white mb-3 flex items-center gap-2">
            <span className="h-px flex-1 bg-white/10" />
            Everything in {plan.inheritsFrom}, plus
            <span className="h-px flex-1 bg-white/10" />
          </p>
        )}
        {!plan.inheritsFrom && (
          <p className="text-xs font-semibold text-white mb-3 flex items-center gap-2">
            <span className="h-px flex-1 bg-white/10" />
            What's included
            <span className="h-px flex-1 bg-white/10" />
          </p>
        )}

        {/* Feature groups */}
        <div className="space-y-5 flex-1">
          {plan.featureGroups && plan.featureGroups.length > 0 ? (
            plan.featureGroups.map((group, gi) => (
              <div key={gi} className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white">
                  {group.heading}
                </p>
                <ul className="space-y-1.5">
                  {group.items.map((item, ii) => (
                    <li key={ii} className="text-[13px] text-white leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <ul className="space-y-1.5">
              {plan.features.map((item, i) => (
                <li key={i} className="text-[13px] text-white leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
