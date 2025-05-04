import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, Calendar, Tag, ExternalLink, X } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import CancelSubscriptionDialog from "./CancelSubscriptionDialog";

const SubscriptionStatus = () => {
  const { isTrialActive, trialEndsAt, isSubscribed, subscriptionTier, checkSubscriptionStatus } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  
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
        // Try to open in a new tab first
        const newWindow = window.open(data.url, '_blank');
        
        // If opening in a new window fails, redirect the current window
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          // Small delay to show the toast before redirecting
          setTimeout(() => {
            window.location.href = data.url;
          }, 500);
        }
      } else if (data?.directManagement) {
        // If we got back directManagement data, show cancellation option
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
        description: "Couldn't open subscription management portal. Please try the Cancel Subscription button instead.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Set background color based on subscription status
  const getBgColor = () => {
    if (isSubscribed) {
      return "bg-gradient-to-br from-green-900/30 to-green-800/10";
    } else if (isTrialActive) {
      return "bg-gradient-to-br from-amber-900/30 to-amber-800/10";
    } else {
      return "bg-gradient-to-br from-red-900/30 to-red-800/10";
    }
  };
  
  // Set border color based on subscription status
  const getBorderColor = () => {
    if (isSubscribed) {
      return "border-green-500/50";
    } else if (isTrialActive) {
      return "border-elec-yellow/50";
    } else {
      return "border-red-500/50";
    }
  };

  return (
    <>
      <Card className={`${getBgColor()} ${getBorderColor()} border-2 shadow-xl`}>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            {isSubscribed && <CheckCircle className="text-green-500" size={24} />}
            Your Current Plan
          </CardTitle>
          <CardDescription className="text-lg">
            {isSubscribed 
              ? `You're currently subscribed to the ${subscriptionTier || 'Standard'} plan.`
              : isTrialActive 
                ? `You're currently in the free trial period, ending in ${getDaysRemaining()} days.`
                : "Your free trial has expired. Please select a subscription plan to continue."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-6 sm:items-center justify-between">
            <div className="space-y-6">
              {isSubscribed && (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10">
                    <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                      <Tag size={14} /> Plan Type
                    </div>
                    <div className="text-xl font-bold text-green-400">
                      {subscriptionTier || 'Standard'} Plan
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10">
                    <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                      <Calendar size={14} /> Status
                    </div>
                    <div className="text-xl font-bold text-green-400">
                      Active
                    </div>
                  </div>
                </div>
              )}
              
              {isTrialActive && (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="p-4 rounded-lg border border-amber-500/30 bg-amber-500/10">
                    <div className="text-sm text-muted-foreground mb-1">Expires In</div>
                    <div className="text-xl font-bold text-amber-400">{getDaysRemaining()} days</div>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-amber-500/30 bg-amber-500/10">
                    <div className="text-sm text-muted-foreground mb-1">Trial Features</div>
                    <div className="text-xl font-bold text-amber-400">Full Platform Access</div>
                  </div>
                </div>
              )}
            </div>
            
            {isSubscribed && (
              <div className="flex flex-col gap-3">
                <Button
                  onClick={openCustomerPortal}
                  variant="outline"
                  disabled={isLoading}
                  className="border-green-500/50 hover:border-green-500 hover:bg-green-500/20 flex items-center gap-2"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ExternalLink size={18} />}
                  Manage Subscription
                </Button>
                
                <Button
                  onClick={() => setShowCancelDialog(true)}
                  variant="destructive"
                  disabled={isCanceling}
                  className="flex items-center gap-2"
                >
                  {isCanceling ? <Loader2 className="h-4 w-4 animate-spin" /> : <X size={18} />}
                  Cancel Subscription
                </Button>
              </div>
            )}
            
            {!isSubscribed && !isTrialActive && (
              <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10 w-full">
                <div className="text-sm text-muted-foreground mb-1">Status</div>
                <div className="text-xl font-bold text-red-400">Expired</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Cancellation Dialog */}
      <CancelSubscriptionDialog 
        isOpen={showCancelDialog} 
        setIsOpen={setShowCancelDialog}
        onCancelled={checkSubscriptionStatus}
      />
    </>
  );
};

export default SubscriptionStatus;
