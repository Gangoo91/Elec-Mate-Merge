
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const SubscriptionStatus = () => {
  const { isTrialActive, trialEndsAt, isSubscribed, subscriptionTier } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Calculate days remaining in trial
  const getDaysRemaining = () => {
    if (!trialEndsAt) return 0;
    
    const now = new Date();
    const diffTime = trialEndsAt.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  // Handle opening customer portal for subscription management
  const openCustomerPortal = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No portal URL returned');
      }
    } catch (error) {
      console.error('Customer portal error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to open subscription management",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={`border-${isSubscribed ? 'green-500' : isTrialActive ? 'elec-yellow' : 'red-500'}/20 bg-elec-gray`}>
      <CardHeader>
        <CardTitle>Your Current Plan</CardTitle>
        <CardDescription>
          {isSubscribed 
            ? `You're currently subscribed to the ${subscriptionTier || 'Standard'} plan.`
            : isTrialActive 
              ? `You're currently in the free trial period, ending in ${getDaysRemaining()} days.`
              : "Your free trial has expired. Please select a subscription plan to continue."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Subscription Status</div>
            <div className="text-lg font-medium">
              {isSubscribed ? "Active Subscription" : isTrialActive ? "Free Trial" : "Expired"}
            </div>
          </div>
          {isTrialActive && (
            <>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Expires In</div>
                <div className="text-lg font-medium">{getDaysRemaining()} days</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Trial Features</div>
                <div className="text-lg font-medium">Full Platform Access</div>
              </div>
            </>
          )}
          {isSubscribed && (
            <Button
              onClick={openCustomerPortal}
              variant="outline"
              disabled={isLoading}
              className="ml-auto"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Manage Subscription
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionStatus;
