
import { useEffect, useState } from "react";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/components/ui/use-toast";
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import SubscriptionStatus from "@/components/subscriptions/SubscriptionStatus";
import DevelopmentModeCard from "@/components/subscriptions/DevelopmentModeCard";
import PlanSelection from "@/components/subscriptions/PlanSelection";
import SubscriptionFAQ from "@/components/subscriptions/SubscriptionFAQ";
import SupportSection from "@/components/subscriptions/SupportSection";

const Subscriptions = () => {
  // Get auth context values for subscription status
  const { checkSubscriptionStatus, isCheckingStatus, isSubscribed, subscriptionTier, profile } = useAuth();
  const { toast } = useToast();
  const [lastAutoCheck, setLastAutoCheck] = useState<Date | null>(null);
  const [checkCount, setCheckCount] = useState(0);
  
  // Auto-check subscription status on page load and periodically
  useEffect(() => {
    const checkStatus = async () => {
      await checkSubscriptionStatus();
      
      // Log the current subscription status
      console.log('Current subscription status:', { 
        isSubscribed, 
        subscriptionTier,
        profileId: profile?.id,
        profileSubscribed: profile?.subscribed,
        timestamp: new Date().toISOString(),
        checkCount: checkCount + 1
      });
      
      setCheckCount(prev => prev + 1);
      setLastAutoCheck(new Date());
    };
    
    // Initial check - check multiple times to ensure we get the latest data
    checkStatus();
    
    // Extra initial checks to ensure we have the correct status
    const initialChecks = [
      setTimeout(() => checkStatus(), 1000),
      setTimeout(() => checkStatus(), 3000)
    ];
    
    // Set up periodic check for subscription status
    // Use a shorter interval for more frequent checks
    const intervalId = setInterval(() => {
      checkStatus();
    }, 3000); // Check every 3 seconds while on this page
    
    return () => {
      clearInterval(intervalId);
      initialChecks.forEach(clearTimeout);
    };
  }, []);

  // Handle manual refresh click
  const handleManualRefresh = async () => {
    try {
      toast({
        title: "Refreshing Status",
        description: "Checking your current subscription status...",
      });
      
      await checkSubscriptionStatus();
      
      toast({
        title: "Status Refreshed",
        description: isSubscribed 
          ? `Your ${subscriptionTier || 'active'} subscription is confirmed.` 
          : "No active subscription found.",
      });
      
      console.log('Manual subscription status check:', { 
        isSubscribed, 
        subscriptionTier,
        timestamp: new Date().toISOString(),
        checkCount: checkCount + 1
      });
      
      setCheckCount(prev => prev + 1);
    } catch (error) {
      console.error('Error during manual refresh:', error);
      toast({
        title: "Refresh Error",
        description: "There was a problem checking your subscription status.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
          <p className="text-muted-foreground">
            Choose the plan that's right for your electrical career stage.
          </p>
        </div>
        
        {/* Refresh button */}
        <Button 
          variant="outline" 
          className="flex items-center gap-2" 
          onClick={handleManualRefresh}
          disabled={isCheckingStatus}
        >
          {isCheckingStatus ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="h-4 w-4" />
          )}
          Refresh Status
        </Button>
      </div>

      {/* Current Subscription Status */}
      <SubscriptionStatus />

      {/* Development Mode Card */}
      <DevelopmentModeCard />

      {/* Only show Plan Selection if not subscribed */}
      {!isSubscribed && <PlanSelection />}

      {/* Frequently Asked Questions */}
      <SubscriptionFAQ />

      {/* Support Section */}
      <SupportSection />
      
      {/* Debug info for subscription status */}
      <div className="text-xs text-muted-foreground mt-4 p-4 border border-border rounded-md bg-muted/20">
        <p>Last automatic check: {lastAutoCheck?.toLocaleTimeString() || 'None'}</p>
        <p>Total checks: {checkCount}</p>
        <p>Profile subscription status: {profile?.subscribed ? 'Subscribed' : 'Not subscribed'}</p>
        <p>Auth context subscription status: {isSubscribed ? 'Subscribed' : 'Not subscribed'}</p>
        <p>Subscription tier: {subscriptionTier || 'None'}</p>
      </div>
    </div>
  );
};

export default Subscriptions;
