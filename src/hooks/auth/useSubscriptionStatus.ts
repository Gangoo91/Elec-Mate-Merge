
import { useState, useEffect, useCallback } from 'react';
import { ProfileType } from './types';
import { supabase } from '@/integrations/supabase/client';

export function useSubscriptionStatus(profile: ProfileType | null) {
  const [isTrialActive, setIsTrialActive] = useState(false);
  const [trialEndsAt, setTrialEndsAt] = useState<Date | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [lastCheckedAt, setLastCheckedAt] = useState<Date | null>(null);

  // Handle profile updates - calculate trial status
  useEffect(() => {
    if (profile) {
      // Check trial status
      const createdAt = new Date(profile.created_at || new Date());
      const trialEndDate = new Date(createdAt);
      trialEndDate.setDate(trialEndDate.getDate() + 7); // 7-day trial
      
      const now = new Date();
      const isActive = now < trialEndDate;
      const isUserSubscribed = profile.subscribed || false;
      
      console.log('Profile subscription status:', {
        profileId: profile.id,
        createdAt,
        trialEndDate,
        isUserSubscribed,
        subscriptionFromProfile: profile.subscribed
      });
      
      setIsTrialActive(isActive && !isUserSubscribed);
      setTrialEndsAt(trialEndDate);
      setIsSubscribed(isUserSubscribed);
    } else {
      setIsTrialActive(false);
      setTrialEndsAt(null);
      setIsSubscribed(false);
      
      console.log('No profile available for subscription status check');
    }
  }, [profile]);

  // Function to check subscription status with Stripe
  const checkSubscriptionStatus = useCallback(async () => {
    if (!profile) {
      console.log('No profile available, skipping subscription check');
      return;
    }
    
    try {
      setIsCheckingStatus(true);
      setLastError(null);
      
      console.log('Checking subscription status for user:', profile.id);
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        console.error('Error checking subscription:', error);
        setLastError(error.message);
      } else if (data) {
        console.log('Subscription check result:', data);
        
        // Make sure to update state with the latest subscription data
        setIsSubscribed(data.subscribed);
        setSubscriptionTier(data.subscription_tier);
        
        // Check if the subscription status differs from the profile
        if (data.subscribed !== profile.subscribed) {
          console.warn('Subscription status mismatch between Stripe and profile:', {
            stripeSubscribed: data.subscribed,
            profileSubscribed: profile.subscribed
          });
        }
      }
      
      setLastCheckedAt(new Date());
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error('Error in checkSubscriptionStatus:', message);
      setLastError(message);
    } finally {
      setIsCheckingStatus(false);
    }
  }, [profile]);

  // Check subscription status immediately when profile changes
  useEffect(() => {
    if (profile) {
      checkSubscriptionStatus();
    }
  }, [profile, checkSubscriptionStatus]);

  return {
    isTrialActive,
    trialEndsAt,
    isSubscribed,
    subscriptionTier,
    isCheckingStatus,
    lastError,
    lastCheckedAt,
    checkSubscriptionStatus
  };
}
