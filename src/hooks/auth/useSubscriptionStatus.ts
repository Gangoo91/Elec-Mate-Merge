
import { useState, useEffect } from 'react';
import { ProfileType } from './types';
import { supabase } from '@/integrations/supabase/client';

export function useSubscriptionStatus(profile: ProfileType | null) {
  const [isTrialActive, setIsTrialActive] = useState(false);
  const [trialEndsAt, setTrialEndsAt] = useState<Date | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  useEffect(() => {
    if (profile) {
      // Check trial status
      const createdAt = new Date(profile.created_at || new Date());
      const trialEndDate = new Date(createdAt);
      trialEndDate.setDate(trialEndDate.getDate() + 7); // 7-day trial
      
      const now = new Date();
      const isActive = now < trialEndDate;
      const isUserSubscribed = profile.subscribed || false;
      
      setIsTrialActive(isActive && !isUserSubscribed);
      setTrialEndsAt(trialEndDate);
      setIsSubscribed(isUserSubscribed);
    } else {
      setIsTrialActive(false);
      setTrialEndsAt(null);
      setIsSubscribed(false);
    }
  }, [profile]);

  // Function to check subscription status with Stripe
  const checkSubscriptionStatus = async () => {
    if (!profile) return;
    
    try {
      setIsCheckingStatus(true);
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        console.error('Error checking subscription:', error);
      } else if (data) {
        // Make sure to update state with the latest subscription data
        setIsSubscribed(data.subscribed);
        setSubscriptionTier(data.subscription_tier);
        
        console.log('Subscription check result:', data);
      }
    } catch (error) {
      console.error('Error in checkSubscriptionStatus:', error);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  return {
    isTrialActive,
    trialEndsAt,
    isSubscribed,
    subscriptionTier,
    isCheckingStatus,
    checkSubscriptionStatus
  };
}
