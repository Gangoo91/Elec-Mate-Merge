import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Check,
  X,
  ChevronRight,
  Loader2,
  Zap,
  Building2,
  GraduationCap,
  Star,
  Sparkles,
  Clock,
  Bot,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { storageGetSync, storageRemoveSync } from '@/utils/storage';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { stripePriceData, PlanDetails } from '@/data/stripePrices';
import { cn } from '@/lib/utils';
import { capturePaymentError, trackMilestone, addBreadcrumb } from '@/lib/sentry';
import { Capacitor } from '@capacitor/core';
import { useRevenueCat } from '@/hooks/useRevenueCat';
import { Link } from 'react-router-dom';

interface PlansListProps {
  billing: 'monthly' | 'yearly';
}

const PlansList = ({ billing }: PlansListProps) => {
  const { isSubscribed, subscriptionTier, user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1); // Start on popular plan
  const { isNative, availablePackages, isPurchasing, purchasePackage, getPackageForPlan } =
    useRevenueCat(user?.id);

  const plans = stripePriceData[billing];

  // Track scroll position for pagination dots
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const cardWidth = el.scrollWidth / plans.length;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(index);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [plans.length]);

  const handleSubscribe = async (planId: string, priceId: string) => {
    try {
      setIsLoading((prev) => ({ ...prev, [planId]: true }));
      addBreadcrumb('Checkout started', 'payment', { planId, priceId });

      // Check for stored offer code from signup
      const offerCode = storageGetSync('elec-mate-offer-code');

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId, mode: 'subscription', planId, offerCode },
      });

      if (error) throw new Error(error.message);

      if (data?.url) {
        // Clear offer code after successful checkout creation
        if (offerCode) {
          storageRemoveSync('elec-mate-offer-code');
        }

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
    } catch (error) {
      console.error('Checkout error:', error);
      // Payment errors are critical - track with high priority
      capturePaymentError(error instanceof Error ? error : new Error(String(error)), {
        planId,
        priceId,
        context: 'create-checkout',
      });
      toast({
        title: 'Checkout Error',
        description: error instanceof Error ? error.message : 'Failed to start checkout',
        variant: 'destructive',
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, [planId]: false }));
    }
  };

  // Native IAP purchase handler — selects the correct package for the chosen plan
  const handleNativePurchase = async (planId: string, planName: string) => {
    // Try to find matching package for this specific plan
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

  const getPlanIcon = (planName: string) => {
    switch (planName) {
      case 'Apprentice':
        return <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />;
      case 'Electrician':
        return <Zap className="h-5 w-5 sm:h-6 sm:w-6" />;
      case 'Business AI':
        return <Bot className="h-5 w-5 sm:h-6 sm:w-6" />;
      case 'Employer':
        return <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />;
      default:
        return <Zap className="h-5 w-5 sm:h-6 sm:w-6" />;
    }
  };

  // Find max feature count so we can pad shorter lists for alignment
  const maxFeatures = Math.max(...plans.map((p) => p.features.length + p.notIncluded.length));

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Pricing Cards - Horizontal carousel on mobile, grid on desktop */}
      <div
        ref={scrollRef}
        className={cn(
          // Mobile: horizontal scroll carousel
          'flex gap-3 overflow-x-auto pb-2 -mx-4 px-4',
          'snap-x snap-mandatory scroll-smooth',
          'scrollbar-hide momentum-scroll-x touch-manipulation',
          // Tablet: 2-col grid
          'md:grid md:grid-cols-2 md:gap-4',
          'md:overflow-visible md:mx-0 md:px-0 md:pb-0',
          // Desktop: 4-col grid
          'lg:grid-cols-4'
        )}
      >
        {plans.map((plan: PlanDetails) => {
          const isCurrentPlan = subscriptionTier === plan.name && isSubscribed;
          const isPremium = plan.name === 'Business AI';

          // On native, try to get the store price from RevenueCat
          const nativePackage = isNative ? getPackageForPlan(plan.id) : null;
          const nativePrice = nativePackage?.product?.priceString ?? null;
          const displayPrice = nativePrice || plan.price;

          return (
            <Card
              key={plan.id}
              className={cn(
                'relative overflow-hidden transition-all duration-300',
                'bg-white/[0.02] backdrop-blur-xl',
                'border rounded-2xl',
                // Mobile: carousel card sizing with snap
                'flex-shrink-0 w-[78vw] max-w-[300px] snap-center',
                // Desktop: equal width columns, always flex-col for alignment
                'md:w-full md:max-w-none md:flex-shrink md:snap-align-none',
                'flex flex-col',
                // Popular plan styling
                plan.popular &&
                  !isCurrentPlan && [
                    'ring-2 ring-elec-yellow/60 shadow-lg shadow-elec-yellow/15',
                    'border-elec-yellow/40',
                  ],
                // Premium (Business AI) styling
                isPremium &&
                  !isCurrentPlan && [
                    'ring-1 ring-amber-500/40 shadow-lg shadow-amber-500/10',
                    'border-amber-500/30',
                  ],
                // Regular plan styling
                !plan.popular &&
                  !isPremium &&
                  !isCurrentPlan &&
                  !plan.coming && ['border-white/10', 'hover:border-white/20'],
                // Current plan styling
                isCurrentPlan && [
                  'ring-2 ring-green-500/60 shadow-lg shadow-green-500/15',
                  'border-green-500/40',
                ],
                // Coming soon styling
                plan.coming &&
                  !isCurrentPlan && ['border-purple-500/30', 'ring-1 ring-purple-500/30']
              )}
            >
              {/* Current Plan Banner */}
              {isCurrentPlan && (
                <div className="bg-green-500 text-white text-[10px] sm:text-xs font-bold py-1.5 px-3 text-center flex items-center justify-center gap-1.5">
                  <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  YOUR CURRENT PLAN
                </div>
              )}

              {/* Popular Badge */}
              {plan.popular && !isCurrentPlan && !plan.coming && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2 z-10">
                  <div className="px-3 py-1 rounded-b-lg bg-gradient-to-r from-elec-yellow to-yellow-500 text-elec-dark text-[10px] font-bold tracking-wide flex items-center gap-1 shadow-lg shadow-elec-yellow/30">
                    <Star className="h-2.5 w-2.5 fill-current" />
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Premium Badge (Business AI) */}
              {isPremium && !isCurrentPlan && !plan.coming && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2 z-10">
                  <div className="px-3 py-1 rounded-b-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold tracking-wide flex items-center gap-1 shadow-lg shadow-amber-500/30">
                    <Sparkles className="h-2.5 w-2.5" />
                    PREMIUM
                  </div>
                </div>
              )}

              {/* Coming Soon Badge */}
              {plan.coming && !isCurrentPlan && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2 z-10">
                  <div className="px-3 py-1 rounded-b-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white text-[10px] font-bold tracking-wide flex items-center gap-1 shadow-lg shadow-purple-500/30">
                    <Clock className="h-2.5 w-2.5" />
                    COMING SOON
                  </div>
                </div>
              )}

              <CardHeader
                className={cn(
                  'px-4 sm:px-5 pb-3',
                  isCurrentPlan && 'pt-3',
                  (plan.popular || plan.coming || isPremium) && !isCurrentPlan && 'pt-7 sm:pt-8'
                )}
              >
                {/* Plan Icon & Name */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={cn(
                      'w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center',
                      plan.popular
                        ? 'bg-gradient-to-br from-elec-yellow to-yellow-500 text-elec-dark shadow-md shadow-elec-yellow/25'
                        : isPremium
                          ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/20'
                          : 'bg-white/[0.06] text-elec-yellow border border-white/10'
                    )}
                  >
                    {getPlanIcon(plan.name)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                      {plan.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-white mt-0.5 leading-snug">
                      {plan.description}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    {displayPrice}
                  </span>
                  {plan.period && <span className="text-sm text-white">{plan.period}</span>}
                </div>
                {plan.savings && (
                  <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/25">
                    <Sparkles className="h-2.5 w-2.5 text-green-400" />
                    <span className="text-[11px] font-medium text-green-400">{plan.savings}</span>
                  </div>
                )}
              </CardHeader>

              <CardContent className="px-4 sm:px-5 pb-3 flex-1 flex flex-col">
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-3" />

                {/* Features List */}
                <div className="space-y-1.5 flex-1">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-2.5 w-2.5 text-elec-yellow" />
                      </div>
                      <span className="text-[13px] text-white leading-snug">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.length > 0 && <div className="h-px bg-white/5 my-2" />}
                  {plan.notIncluded.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="h-2.5 w-2.5 text-white" />
                      </div>
                      <span className="text-[13px] text-white leading-snug line-through decoration-white/30">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="px-4 sm:px-5 pt-1 pb-4">
                <Button
                  className={cn(
                    'w-full h-11 text-sm font-semibold rounded-xl transition-all duration-300 relative overflow-hidden',
                    'active:scale-[0.98] touch-manipulation',
                    plan.popular && !isCurrentPlan && !plan.coming
                      ? 'bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark shadow-md shadow-elec-yellow/20'
                      : isPremium && !isCurrentPlan && !plan.coming
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-md shadow-amber-500/20'
                        : 'bg-white/10 hover:bg-white/15 text-white border border-white/20',
                    isCurrentPlan &&
                      'bg-green-500/20 text-green-400 border-green-500/30 cursor-default shadow-none hover:bg-green-500/20',
                    plan.coming &&
                      'bg-purple-500/20 text-purple-300 border-purple-500/30 cursor-default shadow-none hover:bg-purple-500/20',
                    // Shimmer effect for popular button
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
                  {isLoading[plan.id] ? (
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
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Pagination dots - mobile only */}
      <div className="flex justify-center gap-2 mt-3 md:hidden">
        {plans.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const el = scrollRef.current;
              if (el) {
                const cardWidth = el.scrollWidth / plans.length;
                el.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
              }
            }}
            className={cn(
              'transition-all duration-200 touch-manipulation rounded-full',
              i === activeIndex ? 'w-6 h-2 bg-elec-yellow' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
            )}
            aria-label={`View plan ${i + 1}`}
          />
        ))}
      </div>

      {/* Native IAP disclosure text — required by Apple & Google */}
      {isNative && (
        <div className="text-center space-y-2">
          <p className="text-[11px] text-white leading-relaxed max-w-md mx-auto">
            Payment will be charged to your{' '}
            {Capacitor.getPlatform() === 'ios' ? 'Apple ID' : 'Google account'} at confirmation of
            purchase. Subscription automatically renews unless cancelled at least 24 hours before
            the end of the current period. 7-day free trial. Cancel anytime.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              to="/terms"
              className="text-[11px] text-elec-yellow hover:text-elec-yellow hover:underline touch-manipulation py-1 px-2"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="text-[11px] text-elec-yellow hover:text-elec-yellow hover:underline touch-manipulation py-1 px-2"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlansList;
