import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, ChevronRight, Loader2, Zap, Building2, Sparkles, Mail, Users, CheckCircle, GraduationCap, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { stripePriceData, PlanDetails } from "@/data/stripePrices";
import { cn } from "@/lib/utils";

interface PlansListProps {
  billing: 'monthly' | 'yearly';
}

const PlansList = ({ billing }: PlansListProps) => {
  const { isSubscribed, subscriptionTier, checkSubscriptionStatus } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    checkSubscriptionStatus();
  }, [billing]);

  const handleSubscribe = async (planId: string, priceId: string) => {
    try {
      setIsLoading(prev => ({ ...prev, [planId]: true }));

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId, mode: 'subscription', planId }
      });

      if (error) throw new Error(error.message);

      if (data?.url) {
        toast({
          title: "Redirecting to checkout",
          description: "Opening secure Stripe checkout page.",
        });

        const newWindow = window.open(data.url, '_blank');
        if (!newWindow || newWindow.closed) {
          setTimeout(() => { window.location.href = data.url; }, 1000);
        }
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout Error",
        description: error instanceof Error ? error.message : "Failed to start checkout",
        variant: "destructive",
      });
    } finally {
      setIsLoading(prev => ({ ...prev, [planId]: false }));
    }
  };

  const handleContactEnterprise = (email: string) => {
    window.location.href = `mailto:${email}?subject=Enterprise%20Subscription%20Inquiry`;
  };

  const getPlanIcon = (planName: string) => {
    switch (planName) {
      case 'Apprentice':
        return <GraduationCap className="h-8 w-8" />;
      case 'Electrician':
        return <Zap className="h-8 w-8" />;
      case 'Employer':
        return <Building2 className="h-8 w-8" />;
      case 'Enterprise':
        return <Sparkles className="h-8 w-8" />;
      default:
        return <Zap className="h-8 w-8" />;
    }
  };

  const plans = stripePriceData[billing];

  return (
    <div className="space-y-8">
      {/* Pricing Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {plans.map((plan: PlanDetails) => {
          const isCurrentPlan = subscriptionTier === plan.name && isSubscribed;
          const isEnterprise = plan.enterprise;

          return (
            <Card
              key={plan.id}
              className={cn(
                "relative overflow-hidden transition-all duration-300",
                "bg-white/[0.02] backdrop-blur-xl",
                "border border-white/10 rounded-2xl",
                "hover:-translate-y-2 hover:shadow-2xl hover:shadow-elec-yellow/15",
                "active:scale-[0.98]",
                plan.popular && !isCurrentPlan && "ring-2 ring-elec-yellow/50 shadow-lg shadow-elec-yellow/25 border-elec-yellow/30",
                !plan.popular && !isCurrentPlan && "hover:border-elec-yellow/40 hover:ring-1 hover:ring-elec-yellow/20",
                isCurrentPlan && "ring-2 ring-green-500/50 shadow-lg shadow-green-500/20 border-green-500/30"
              )}
            >
              {/* Current Plan Banner */}
              {isCurrentPlan && (
                <div className="absolute top-0 left-0 right-0 bg-green-500 text-foreground text-sm font-bold py-2 px-4 text-center flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  YOUR CURRENT PLAN
                </div>
              )}

              {/* Popular Badge */}
              {plan.popular && !isCurrentPlan && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2 z-10">
                  <div className="px-4 py-1.5 rounded-b-xl bg-gradient-to-r from-elec-yellow to-yellow-500 text-elec-dark text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-lg shadow-elec-yellow/30">
                    <Star className="h-3 w-3 fill-current" />
                    MOST POPULAR
                  </div>
                </div>
              )}

              <CardHeader className={cn("pb-6", isCurrentPlan && "pt-14", plan.popular && !isCurrentPlan && "pt-10")}>
                {/* Plan Icon */}
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center mb-5",
                  "transition-all duration-300",
                  plan.popular
                    ? "bg-gradient-to-br from-elec-yellow to-yellow-500 text-elec-dark shadow-lg shadow-elec-yellow/30"
                    : "bg-gradient-to-br from-white/10 to-white/5 text-elec-yellow"
                )}>
                  {getPlanIcon(plan.name)}
                </div>

                {/* Plan Name & Description */}
                <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{plan.description}</p>

                {/* Price */}
                <div className="mt-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold tracking-tight text-foreground">{plan.price}</span>
                    {plan.period && (
                      <span className="text-lg text-muted-foreground">{plan.period}</span>
                    )}
                  </div>
                  {plan.savings && (
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                      <span className="text-sm font-medium text-green-400">{plan.savings}</span>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pb-6">
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                {/* Features List */}
                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 py-0.5">
                      <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-elec-yellow" />
                      </div>
                      <span className="text-sm text-foreground/90 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.length > 0 && (
                    <div className="h-px bg-white/5 my-4" />
                  )}
                  {plan.notIncluded.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 py-0.5 opacity-50">
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                        <X className="h-4 w-4 text-foreground/30" />
                      </div>
                      <span className="text-sm text-foreground/40 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="pt-2">
                {isEnterprise ? (
                  <Button
                    className="w-full h-14 text-base font-semibold rounded-xl bg-white/10 hover:bg-white/20 text-foreground border border-white/20 transition-all duration-300 active:scale-[0.98]"
                    onClick={() => handleContactEnterprise(plan.contactEmail || 'info@elec-mate.com')}
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Contact Us
                  </Button>
                ) : (
                  <Button
                    className={cn(
                      "w-full h-14 text-base font-semibold rounded-xl transition-all duration-300 relative overflow-hidden active:scale-[0.98]",
                      plan.popular
                        ? "bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark shadow-lg shadow-elec-yellow/20 hover:shadow-xl hover:shadow-elec-yellow/30"
                        : "bg-white/10 hover:bg-white/20 text-foreground border border-white/20",
                      isCurrentPlan && "bg-green-500/20 text-green-400 border-green-500/30 cursor-default shadow-none",
                      plan.popular && !isCurrentPlan && "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700"
                    )}
                    disabled={isCurrentPlan || isLoading[plan.id]}
                    onClick={() => handleSubscribe(plan.id, plan.priceId)}
                  >
                    {isLoading[plan.id] ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : isCurrentPlan ? (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Current Plan
                      </>
                    ) : (
                      <>
                        Get Started
                        <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Team Discount Callout */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/20 p-6 md:p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div className="w-14 h-14 rounded-2xl bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
            <Users className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground mb-1">Team Discount for Employers</h3>
            <p className="text-foreground/70">
              Subscribe to Employer or Enterprise and your electricians get Desktop Price access at a discounted rate.
              Contact us at <a href="mailto:info@elec-mate.com" className="text-elec-yellow hover:underline">info@elec-mate.com</a> for team pricing options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansList;
