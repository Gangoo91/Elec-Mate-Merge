
import { useState, useEffect, useCallback, useRef } from 'react';
import { ProfileType } from './types';
import { supabase } from '@/integrations/supabase/client';

// Combined state to prevent multiple re-renders
interface SubscriptionState {
  isTrialActive: boolean;
  trialEndsAt: Date | null;
  isSubscribed: boolean;
  subscriptionTier: string | null;
  isCheckingStatus: boolean;
  lastError: string | null;
  lastCheckedAt: Date | null;
}

const initialState: SubscriptionState = {
  isTrialActive: false,
  trialEndsAt: null,
  isSubscribed: false,
  subscriptionTier: null,
  isCheckingStatus: false,
  lastError: null,
  lastCheckedAt: null,
};

export function useSubscriptionStatus(profile: ProfileType | null) {
  const [state, setState] = useState<SubscriptionState>(initialState);
  const hasCheckedRef = useRef(false);
  const profileIdRef = useRef<string | null>(null);

  // Handle profile updates - calculate trial status from profile data
  // This runs synchronously and doesn't cause loading states
  useEffect(() => {
    if (profile) {
      const createdAt = new Date(profile.created_at || new Date());
      const trialEndDate = new Date(createdAt);
      trialEndDate.setDate(trialEndDate.getDate() + 7); // 7-day trial

      const now = new Date();
      const isActive = now < trialEndDate;
      const isUserSubscribed = profile.subscribed || false;

      // Single state update for profile data
      setState(prev => ({
        ...prev,
        isTrialActive: isUserSubscribed ? false : (isActive && !isUserSubscribed),
        trialEndsAt: trialEndDate,
        isSubscribed: isUserSubscribed,
        subscriptionTier: prev.subscriptionTier, // Keep existing tier until Stripe confirms
      }));
    } else {
      setState(prev => ({
        ...prev,
        isTrialActive: false,
        trialEndsAt: null,
        isSubscribed: false,
        subscriptionTier: null,
      }));
    }
  }, [profile]);

  // Function to check subscription status with Stripe
  const checkSubscriptionStatus = useCallback(async () => {
    if (!profile) return;

    // Prevent duplicate checks for same profile
    if (hasCheckedRef.current && profileIdRef.current === profile.id) {
      return;
    }

    try {
      setState(prev => ({ ...prev, isCheckingStatus: true, lastError: null }));

      const { data, error } = await supabase.functions.invoke('check-subscription');

      if (error) {
        console.error('Error checking subscription:', error);
        setState(prev => ({ ...prev, isCheckingStatus: false, lastError: error.message }));
        return;
      }

      if (data) {
        // Single batched state update with all Stripe data
        setState(prev => ({
          ...prev,
          isSubscribed: data.subscribed,
          subscriptionTier: data.subscription_tier,
          isTrialActive: data.subscribed ? false : prev.isTrialActive,
          lastCheckedAt: new Date(),
          isCheckingStatus: false,
          lastError: null,
        }));

        hasCheckedRef.current = true;
        profileIdRef.current = profile.id;
      } else {
        setState(prev => ({ ...prev, isCheckingStatus: false }));
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error('Error in checkSubscriptionStatus:', message);
      setState(prev => ({ ...prev, isCheckingStatus: false, lastError: message }));
    }
  }, [profile]);

  // Check subscription status once when profile becomes available
  // Uses ref to prevent duplicate API calls
  useEffect(() => {
    if (profile && !hasCheckedRef.current) {
      checkSubscriptionStatus();
    }
  }, [profile, checkSubscriptionStatus]);

  // Reset check flag when user changes
  useEffect(() => {
    if (profile?.id !== profileIdRef.current) {
      hasCheckedRef.current = false;
    }
  }, [profile?.id]);

  return {
    isTrialActive: state.isTrialActive,
    trialEndsAt: state.trialEndsAt,
    isSubscribed: state.isSubscribed,
    subscriptionTier: state.subscriptionTier,
    isCheckingStatus: state.isCheckingStatus,
    lastError: state.lastError,
    lastCheckedAt: state.lastCheckedAt,
    checkSubscriptionStatus
  };
}
