import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, Clock, AlertCircle, ExternalLink } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Capacitor } from '@capacitor/core';

// Helper function to calculate days remaining in trial
const getDaysRemaining = (trialEndsAt: Date | null): number => {
  if (!trialEndsAt) return 0;
  const now = new Date();
  const diffTime = trialEndsAt.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

const SubscriptionStatus = () => {
  const { isTrialActive, trialEndsAt, isSubscribed, subscriptionTier } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const openCustomerPortal = async () => {
    try {
      setIsLoading(true);

      const isNative = Capacitor.isNativePlatform();

      if (isNative) {
        // Native: redirect to platform subscription settings
        const platform = Capacitor.getPlatform();
        const url =
          platform === 'ios'
            ? 'https://apps.apple.com/account/subscriptions'
            : 'https://play.google.com/store/account/subscriptions';
        window.open(url, '_blank');
        return;
      }

      // Web: open Stripe customer portal
      const { data, error } = await supabase.functions.invoke('customer-portal');

      if (error) throw new Error(error.message);

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No portal URL returned');
      }
    } catch (error) {
      console.error('Customer portal error:', error);
      toast({
        title: 'Error',
        description: 'Could not open subscription management. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const daysRemaining = getDaysRemaining(trialEndsAt);

  // Subscribed users: Compact green badge with plan name and single Manage button
  if (isSubscribed) {
    return (
      <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl py-2.5 px-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-400" />
          <span className="text-sm font-medium text-green-400">
            {subscriptionTier || 'Pro'} Plan
          </span>
        </div>

        <div className="h-4 w-px bg-green-500/20" />

        <Button
          onClick={openCustomerPortal}
          variant="ghost"
          size="sm"
          disabled={isLoading}
          className="h-10 px-3 text-sm text-white hover:text-white hover:bg-green-500/20 active:bg-green-500/30 touch-manipulation"
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
      </div>
    );
  }

  // Trial users: Subtle amber badge showing days remaining
  if (isTrialActive) {
    return (
      <div className="inline-flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl py-2.5 px-4">
        <Clock className="h-4 w-4 text-amber-400" />
        <span className="text-sm text-white">
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

      <span className="text-sm text-white">Choose a plan below</span>
    </div>
  );
};

export default SubscriptionStatus;
