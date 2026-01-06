import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, Clock, AlertCircle, ExternalLink, X } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import CancelSubscriptionDialog from "./CancelSubscriptionDialog";

// Helper function to calculate days remaining in trial
const getDaysRemaining = (trialEndsAt: Date | null): number => {
  if (!trialEndsAt) return 0;
  const now = new Date();
  const diffTime = trialEndsAt.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

const SubscriptionStatus = () => {
  const { isTrialActive, trialEndsAt, isSubscribed, subscriptionTier, checkSubscriptionStatus } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const openCustomerPortal = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke('customer-portal');

      if (error) throw new Error(error.message);

      if (data?.url) {
        const newWindow = window.open(data.url, '_blank');
        if (!newWindow || newWindow.closed) {
          setTimeout(() => { window.location.href = data.url; }, 500);
        }
      } else if (data?.directManagement) {
        toast({
          title: "Direct Management Mode",
          description: "Please use the Cancel Subscription button.",
        });
      } else {
        throw new Error('No portal URL returned');
      }
    } catch (error) {
      console.error('Customer portal error:', error);
      toast({
        title: "Error",
        description: "Could not open portal. Please use the Cancel button instead.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const daysRemaining = getDaysRemaining(trialEndsAt);

  // Subscribed users: Compact green badge with plan name and manage button
  if (isSubscribed) {
    return (
      <>
        <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl py-2.5 px-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <span className="text-sm font-medium text-green-400">
              {subscriptionTier || "Pro"} Plan
            </span>
          </div>

          <div className="h-4 w-px bg-green-500/20" />

          <div className="flex items-center gap-2">
            <Button
              onClick={openCustomerPortal}
              variant="ghost"
              size="sm"
              disabled={isLoading}
              className="h-7 px-2.5 text-xs text-white/70 hover:text-white hover:bg-green-500/20"
            >
              {isLoading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <>
                  <ExternalLink className="h-3 w-3 mr-1.5" />
                  Manage
                </>
              )}
            </Button>

            <Button
              onClick={() => setShowCancelDialog(true)}
              variant="ghost"
              size="sm"
              disabled={isCanceling}
              className="h-7 px-2 text-xs text-white/40 hover:text-red-400 hover:bg-red-500/10"
            >
              {isCanceling ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <X className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>

        <CancelSubscriptionDialog
          isOpen={showCancelDialog}
          setIsOpen={setShowCancelDialog}
          onCancelled={checkSubscriptionStatus}
        />
      </>
    );
  }

  // Trial users: Subtle amber badge showing days remaining
  if (isTrialActive) {
    return (
      <div className="inline-flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl py-2.5 px-4">
        <Clock className="h-4 w-4 text-amber-400" />
        <span className="text-sm text-white/70">
          Trial: <span className="font-medium text-amber-400">{daysRemaining} days left</span>
        </span>
      </div>
    );
  }

  // Expired users: Small alert with CTA
  return (
    <div className="inline-flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl py-2.5 px-4">
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4 text-red-400" />
        <span className="text-sm text-red-400">Trial expired</span>
      </div>

      <div className="h-4 w-px bg-red-500/20" />

      <span className="text-sm text-white/70">Choose a plan below</span>
    </div>
  );
};

export default SubscriptionStatus;
