
import { useEffect } from "react";
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
  const { checkSubscriptionStatus, isCheckingStatus } = useAuth();
  
  // Auto-check subscription status on page load
  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

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
          onClick={checkSubscriptionStatus}
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

      {/* Plan Selection */}
      <PlanSelection />

      {/* Frequently Asked Questions */}
      <SubscriptionFAQ />

      {/* Support Section */}
      <SupportSection />
    </div>
  );
};

export default Subscriptions;
