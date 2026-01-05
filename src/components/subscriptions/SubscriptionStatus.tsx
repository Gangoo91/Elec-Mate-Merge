import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, Calendar, Tag, ExternalLink, X, Crown } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import CancelSubscriptionDialog from "./CancelSubscriptionDialog";
import { cn } from "@/lib/utils";

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

  return (
    <>
      <div className={cn(
        "relative overflow-hidden rounded-2xl p-6 md:p-8 border-2",
        isSubscribed 
          ? "bg-gradient-to-br from-green-900/30 to-green-800/10 border-green-500/50" 
          : isTrialActive
            ? "bg-gradient-to-br from-amber-900/30 to-amber-800/10 border-amber-500/50"
            : "bg-gradient-to-br from-red-900/30 to-red-800/10 border-red-500/50"
      )}>
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              {isSubscribed ? (
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Crown className="h-6 w-6 text-green-400" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-amber-400" />
                </div>
              )}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
                  {isSubscribed && <CheckCircle className="h-5 w-5 text-green-400" />}
                  Your Current Plan
                </h2>
                <p className="text-sm text-muted-foreground">
                  {isSubscribed
                    ? "Active " + (subscriptionTier || "Standard") + " subscription"
                    : isTrialActive
                      ? "Trial ends in " + daysRemaining + " days"
                      : "Trial expired"}
                </p>
              </div>
            </div>

            {/* Action Buttons - Desktop */}
            {isSubscribed && (
              <div className="hidden sm:flex items-center gap-3">
                <Button
                  onClick={openCustomerPortal}
                  variant="outline"
                  disabled={isLoading}
                  className="border-green-500/50 hover:border-green-500 hover:bg-green-500/20"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ExternalLink className="h-4 w-4 mr-2" />}
                  Manage
                </Button>
                <Button
                  onClick={() => setShowCancelDialog(true)}
                  variant="ghost"
                  disabled={isCanceling}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  {isCanceling ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <X className="h-4 w-4 mr-2" />}
                  Cancel
                </Button>
              </div>
            )}
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-2 gap-4">
            {isSubscribed && (
              <>
                <div className="p-4 rounded-xl border border-green-500/30 bg-green-500/10">
                  <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <Tag className="h-3 w-3" /> Plan Type
                  </div>
                  <div className="text-lg font-bold text-green-400">
                    {subscriptionTier || "Standard"}
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-green-500/30 bg-green-500/10">
                  <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Status
                  </div>
                  <div className="text-lg font-bold text-green-400">Active</div>
                </div>
              </>
            )}

            {!isSubscribed && isTrialActive && (
              <>
                <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10">
                  <div className="text-xs text-muted-foreground mb-1">Expires In</div>
                  <div className="text-lg font-bold text-amber-400">{daysRemaining} days</div>
                </div>
                <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10">
                  <div className="text-xs text-muted-foreground mb-1">Access</div>
                  <div className="text-lg font-bold text-amber-400">Full Features</div>
                </div>
              </>
            )}

            {!isSubscribed && !isTrialActive && (
              <div className="col-span-2 p-4 rounded-xl border border-red-500/30 bg-red-500/10">
                <div className="text-xs text-muted-foreground mb-1">Status</div>
                <div className="text-lg font-bold text-red-400">Trial Expired - Choose a plan below</div>
              </div>
            )}
          </div>

          {/* Mobile Action Buttons */}
          {isSubscribed && (
            <div className="flex sm:hidden gap-3 mt-4">
              <Button
                onClick={openCustomerPortal}
                variant="outline"
                disabled={isLoading}
                className="flex-1 border-green-500/50 hover:border-green-500 hover:bg-green-500/20"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ExternalLink className="h-4 w-4 mr-2" />}
                Manage
              </Button>
              <Button
                onClick={() => setShowCancelDialog(true)}
                variant="ghost"
                disabled={isCanceling}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <CancelSubscriptionDialog
        isOpen={showCancelDialog}
        setIsOpen={setShowCancelDialog}
        onCancelled={checkSubscriptionStatus}
      />
    </>
  );
};

export default SubscriptionStatus;
