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
} from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
  const { isNative, availablePackages, isPurchasing, purchasePackage } = useRevenueCat(user?.id);

  // Track scroll position for pagination dots
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const cardWidth = el.scrollWidth / 3;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(index);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = async (planId: string, priceId: string) => {
    try {
      setIsLoading((prev) => ({ ...prev, [planId]: true }));
      addBreadcrumb('Checkout started', 'payment', { planId, priceId });

      // Check for stored offer code from signup
      const offerCode = localStorage.getItem('elec-mate-offer-code');

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId, mode: 'subscription', planId, offerCode },
      });

      if (error) throw new Error(error.message);

      if (data?.url) {
        // Clear offer code after successful checkout creation
        if (offerCode) {
          localStorage.removeItem('elec-mate-offer-code');
        }

        trackMilestone('Checkout Session Created', { planId, hasOfferCode: !!offerCode });

        toast({
          title: 'Redirecting to checkout',
          description: offerCode
            ? 'Your discount will be applied automatically.'
            : 'Opening secure Stripe checkout page.',
        });

        const newWindow = window.open(data.url, '_blank');
        if (!newWindow || newWindow.closed) {
          setTimeout(() => {
            window.location.href = data.url;
          }, 1000);
        }
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

  // Native IAP purchase handler
  const handleNativePurchase = async () => {
    if (!availablePackages.length) {
      toast({
        title: 'No packages available',
        description: 'Unable to load subscription packages. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    // Use the first available package (monthly)
    const pkg = availablePackages[0];
    const success = await purchasePackage(pkg);

    if (success) {
      toast({
        title: 'Subscription active',
        description: 'Welcome to Elec-Mate Pro! All features are now unlocked.',
      });
    }
  };

  const getPlanIcon = (planName: string) => {
    switch (planName) {
      case 'Apprentice':
        return <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7" />;
      case 'Electrician':
        return <Zap className="h-6 w-6 sm:h-7 sm:w-7" />;
      case 'Employer':
        return <Building2 className="h-6 w-6 sm:h-7 sm:w-7" />;
      default:
        return <Zap className="h-6 w-6 sm:h-7 sm:w-7" />;
    }
  };

  const plans = stripePriceData[billing];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Pricing Cards - Horizontal carousel on mobile, grid on desktop */}
      <div
        ref={scrollRef}
        className={cn(
          // Mobile: horizontal scroll carousel
          'flex gap-4 overflow-x-auto pb-2 -mx-4 px-4',
          'snap-x snap-mandatory scroll-smooth',
          'scrollbar-hide momentum-scroll-x touch-manipulation',
          // Desktop: grid layout
          'md:grid md:grid-cols-3 md:gap-6',
          'md:overflow-visible md:mx-0 md:px-0 md:pb-0'
        )}
      >
        {plans.map((plan: PlanDetails, index: number) => {
          const isCurrentPlan = subscriptionTier === plan.name && isSubscribed;

          return (
            <Card
              key={plan.id}
              className={cn(
                'relative overflow-hidden transition-all duration-300',
                'bg-white/[0.02] backdrop-blur-xl',
                'border rounded-2xl sm:rounded-3xl',
                // Mobile: carousel card sizing with snap
                'flex-shrink-0 w-[85vw] max-w-[320px] snap-center',
                // Desktop: equal width columns
                'md:w-full md:max-w-none md:flex-shrink md:snap-align-none',
                'md:flex md:flex-col',
                // Popular plan styling
                plan.popular &&
                  !isCurrentPlan && [
                    'ring-2 ring-elec-yellow/60 shadow-xl shadow-elec-yellow/20',
                    'border-elec-yellow/40',
                    'md:scale-[1.02]',
                  ],
                // Regular plan styling
                !plan.popular &&
                  !isCurrentPlan && [
                    'border-white/10',
                    'hover:border-white/20 hover:bg-white/[0.03]',
                  ],
                // Current plan styling
                isCurrentPlan && [
                  'ring-2 ring-green-500/60 shadow-lg shadow-green-500/15',
                  'border-green-500/40',
                ],
                // Coming soon styling
                plan.coming && ['border-purple-500/30', 'ring-1 ring-purple-500/30']
              )}
            >
              {/* Current Plan Banner */}
              {isCurrentPlan && (
                <div className="bg-green-500 text-foreground text-xs sm:text-sm font-bold py-2 px-4 text-center flex items-center justify-center gap-2">
                  <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  YOUR CURRENT PLAN
                </div>
              )}

              {/* Popular Badge */}
              {plan.popular && !isCurrentPlan && !plan.coming && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2 z-10">
                  <div className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-b-xl bg-gradient-to-r from-elec-yellow to-yellow-500 text-elec-dark text-[10px] sm:text-xs font-bold tracking-wide flex items-center gap-1 sm:gap-1.5 shadow-lg shadow-elec-yellow/30">
                    <Star className="h-3 w-3 fill-current" />
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Coming Soon Badge */}
              {plan.coming && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2 z-10">
                  <div className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-b-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white text-[10px] sm:text-xs font-bold tracking-wide flex items-center gap-1 sm:gap-1.5 shadow-lg shadow-purple-500/30">
                    <Clock className="h-3 w-3" />
                    COMING SOON
                  </div>
                </div>
              )}

              <CardHeader
                className={cn(
                  'pb-4 sm:pb-5',
                  isCurrentPlan && 'pt-4',
                  (plan.popular || plan.coming) && !isCurrentPlan && 'pt-8 sm:pt-10'
                )}
              >
                {/* Plan Icon & Name Row */}
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div
                    className={cn(
                      'w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all',
                      plan.popular
                        ? 'bg-gradient-to-br from-elec-yellow to-yellow-500 text-elec-dark shadow-lg shadow-elec-yellow/25'
                        : 'bg-gradient-to-br from-white/10 to-white/5 text-elec-yellow border border-white/10'
                    )}
                  >
                    {getPlanIcon(plan.name)}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">{plan.name}</h3>
                    <p className="text-xs sm:text-sm text-white/60 mt-0.5">{plan.description}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-base sm:text-lg text-white/60">{plan.period}</span>
                  )}
                </div>
                {plan.savings && (
                  <div className="mt-2 sm:mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/15 border border-green-500/25">
                    <Sparkles className="h-3 w-3 text-green-400" />
                    <span className="text-xs sm:text-sm font-medium text-green-400">
                      {plan.savings}
                    </span>
                  </div>
                )}
              </CardHeader>

              <CardContent className="pb-4 sm:pb-5 flex-1">
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4 sm:mb-5" />

                {/* Features List - Compact on mobile */}
                <div className="space-y-2 sm:space-y-2.5">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 sm:gap-3">
                      <div className="w-5 h-5 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-elec-yellow" />
                      </div>
                      <span className="text-sm text-foreground/90 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.length > 0 && <div className="h-px bg-white/5 my-3 sm:my-4" />}
                  {plan.notIncluded.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 sm:gap-3 opacity-40">
                      <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="h-3 w-3 text-foreground/30" />
                      </div>
                      <span className="text-sm text-foreground/40 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="pt-2 pb-5 sm:pb-6">
                <Button
                  className={cn(
                    'w-full h-12 sm:h-14 text-sm sm:text-base font-semibold rounded-xl transition-all duration-300 relative overflow-hidden',
                    'active:scale-[0.98] touch-manipulation',
                    plan.popular && !isCurrentPlan && !plan.coming
                      ? 'bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark shadow-lg shadow-elec-yellow/20 hover:shadow-xl hover:shadow-elec-yellow/30'
                      : 'bg-white/10 hover:bg-white/15 text-foreground border border-white/20',
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
                    isNative ? handleNativePurchase() : handleSubscribe(plan.id, plan.priceId)
                  }
                >
                  {isLoading[plan.id] ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      Processing...
                    </>
                  ) : isCurrentPlan ? (
                    <>
                      <Check className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Current Plan
                    </>
                  ) : plan.coming ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Coming Soon
                    </>
                  ) : (
                    <>
                      Get Started
                      <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
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

      {/* Enterprise CTA - Simplified */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/10 p-5 sm:p-6 md:p-8">
        <div className="absolute top-0 right-0 w-48 h-48 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/10 flex items-center justify-center flex-shrink-0 border border-elec-yellow/20">
            <Building2 className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow" />
          </div>
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
              Need Enterprise or Team Pricing?
            </h3>
            <p className="text-sm text-white/70">
              For larger teams, custom integrations, or volume discounts, contact us at{' '}
              <a
                href="mailto:info@elec-mate.com"
                className="text-elec-yellow hover:underline font-medium"
              >
                info@elec-mate.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Native IAP disclosure text — required by Apple & Google */}
      {isNative && (
        <div className="text-center space-y-2">
          <p className="text-[11px] text-white/30 leading-relaxed max-w-md mx-auto">
            Payment will be charged to your{' '}
            {Capacitor.getPlatform() === 'ios' ? 'Apple ID' : 'Google account'} at confirmation of
            purchase. Subscription automatically renews unless cancelled at least 24 hours before
            the end of the current period. 7-day free trial. Cancel anytime.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              to="/terms"
              className="text-[11px] text-elec-yellow/60 hover:text-elec-yellow touch-manipulation py-1 px-2"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="text-[11px] text-elec-yellow/60 hover:text-elec-yellow touch-manipulation py-1 px-2"
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
