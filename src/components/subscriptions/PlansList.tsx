
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, ChevronRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { stripePriceData, PlanDetails } from "@/data/stripePrices";

interface PlansListProps {
  billing: 'monthly' | 'yearly';
}

const PlansList = ({ billing }: PlansListProps) => {
  const { isSubscribed, subscriptionTier } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<{[key: string]: boolean}>({});
  
  // Handle subscription checkout
  const handleSubscribe = async (planId: string, priceId: string, mode: 'subscription') => {
    try {
      // Set loading state for this specific plan
      setIsLoading(prev => ({ ...prev, [planId]: true }));
      
      console.log("Starting checkout process for:", { planId, priceId, mode });
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          priceId, 
          mode, 
          planId
        }
      });
      
      if (error) {
        console.error("Checkout error:", error);
        throw new Error(error.message);
      }
      
      console.log("Checkout response:", data);
      
      if (data?.url) {
        toast({
          title: "Redirecting to checkout",
          description: "You'll be redirected to the secure Stripe checkout page.",
        });
        
        // Small delay to show the toast before redirecting
        setTimeout(() => {
          // Try opening in same window first
          window.location.href = data.url;
        }, 500);
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout Error",
        description: error instanceof Error ? error.message : "Failed to start checkout process",
        variant: "destructive",
      });
    } finally {
      setIsLoading(prev => ({ ...prev, [planId]: false }));
    }
  };

  const plans = stripePriceData[billing];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {plans.map((plan: PlanDetails) => (
        <Card 
          key={plan.id} 
          className={`border overflow-hidden relative ${
            plan.popular ? "border-elec-yellow" : "border-elec-yellow/20"
          } ${plan.color} ${(subscriptionTier === plan.name && isSubscribed) ? "ring-2 ring-green-500" : ""}`}
        >
          {(subscriptionTier === plan.name && isSubscribed) && (
            <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-bl-lg">
              YOUR PLAN
            </div>
          )}
          {plan.popular && subscriptionTier !== plan.name && (
            <div className="absolute top-0 right-0 bg-elec-yellow text-elec-dark text-xs font-bold py-1 px-3 rounded-bl-lg">
              POPULAR
            </div>
          )}
          {plan.coming && (
            <div className="absolute top-0 right-0 bg-elec-yellow/50 text-elec-dark text-xs font-bold py-1 px-3 rounded-bl-lg">
              COMING SOON
            </div>
          )}
          
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground">{plan.period}</span>
              {plan.savings && (
                <div className="mt-1 text-xs text-elec-yellow">{plan.savings}</div>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-elec-yellow mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
              {plan.notIncluded.map((feature, i) => (
                <div key={i} className="flex items-start gap-2 text-muted-foreground">
                  <X className="h-4 w-4 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              className="w-full" 
              variant={(subscriptionTier === plan.name && isSubscribed) ? "outline" : plan.popular ? "default" : "outline"}
              disabled={plan.coming || (subscriptionTier === plan.name && isSubscribed) || isLoading[plan.id]}
              onClick={() => handleSubscribe(plan.id, plan.priceId, 'subscription')}
            >
              {isLoading[plan.id] ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (subscriptionTier === plan.name && isSubscribed) 
                ? "Current Plan" 
                : plan.coming 
                  ? "Coming Soon" 
                  : (
                    <>
                      Choose Plan
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </>
                  )
              }
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PlansList;
