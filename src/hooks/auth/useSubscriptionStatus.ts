
import { useState, useEffect, useCallback, useRef } from 'react';
import { ProfileType } from './types';
import { supabase } from '@/integrations/supabase/client';
import { capturePaymentError, captureEdgeFunctionError, addBreadcrumb } from '@/lib/sentry';

// Combined state to prevent multiple re-renders
interface SubscriptionState {
  isTrialActive: boolean;
  trialEndsAt: Date | null;
  isSubscribed: boolean;
  subscriptionTier: string | null;
  isCheckingStatus: boolean;
  hasCompletedInitialCheck: boolean;
  lastError: string | null;
  lastCheckedAt: Date | null;
}

const initialState: SubscriptionState = {
  isTrialActive: false,
  trialEndsAt: null,
  isSubscribed: false,
  subscriptionTier: null,
  isCheckingStatus: false,
  hasCompletedInitialCheck: false,
  lastError: null,
  lastCheckedAt: null,
};

export function useSubscriptionStatus(profile: ProfileType | null) {
  const [state, setState] = useState<SubscriptionState>(initialState);
  const hasCheckedRef = useRef(false);
  const profileIdRef = useRef<string | null>(null);
  // Track previous state to prevent unnecessary re-renders during scroll
  const previousStateRef = useRef<SubscriptionState | null>(null);

  // Handle profile updates - calculate trial status from profile data
  // This runs synchronously and doesn't cause loading states
  // IMPORTANT: Don't reset state when profile is null to prevent "trial ended" flash
  useEffect(() => {
    if (profile) {
      const createdAt = new Date(profile.created_at || new Date());
      const trialEndDate = new Date(createdAt);
      trialEndDate.setDate(trialEndDate.getDate() + 7); // 7-day trial

      const now = new Date();
      const isActive = now < trialEndDate;
      // Check both subscribed AND free_access_granted for beta testers
      const isUserSubscribed = profile.subscribed || profile.free_access_granted || false;

      // Skip update if isSubscribed value hasn't actually changed
      // This prevents unnecessary re-renders during scroll events
      if (previousStateRef.current?.isSubscribed === isUserSubscribed) {
        return;
      }

      // Use functional setState to get latest state and avoid stale closures
      setState(prev => {
        const newState: SubscriptionState = {
          ...prev,
          isTrialActive: isUserSubscribed ? false : (isActive && !isUserSubscribed),
          trialEndsAt: trialEndDate,
          isSubscribed: isUserSubscribed,
          subscriptionTier: profile.subscription_tier || prev.subscriptionTier, // Use profile tier if available
        };

        // Store the new state for future comparison
        previousStateRef.current = newState;

        return newState;
      });
    }
    // When profile is null (during refresh/navigation), keep previous state
    // This prevents the "free trial has ended" flash
  }, [profile]);

  // Function to check subscription status with Stripe
  // Includes timeout to prevent hanging on slow mobile networks
  const checkSubscriptionStatus = useCallback(async () => {
    if (!profile) return;

    // Prevent duplicate checks for same profile
    if (hasCheckedRef.current && profileIdRef.current === profile.id) {
      return;
    }

    try {
      setState(prev => ({ ...prev, isCheckingStatus: true, lastError: null }));

      // 5 second timeout — uses Promise.race so the timeout actually fires
      // (previous AbortController was never connected to the fetch)
      const fetchPromise = supabase.functions.invoke('check-subscription', {
        body: {},
      });
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Subscription check timed out')), 5000)
      );
      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);

      if (error) {
        console.error('Error checking subscription:', error);
        captureEdgeFunctionError(
          new Error(`Subscription check failed: ${error.message}`),
          'check-subscription',
          { userId: profile?.id }
        );
        setState(prev => ({ ...prev, isCheckingStatus: false, hasCompletedInitialCheck: true, lastError: error.message }));
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
          hasCompletedInitialCheck: true,
          lastError: null,
        }));

        hasCheckedRef.current = true;
        profileIdRef.current = profile.id;
      } else {
        setState(prev => ({ ...prev, isCheckingStatus: false, hasCompletedInitialCheck: true }));
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error('Error in checkSubscriptionStatus:', message);
      capturePaymentError(
        error instanceof Error ? error : new Error(message),
        { userId: profile?.id, context: 'checkSubscriptionStatus' }
      );
      setState(prev => ({ ...prev, isCheckingStatus: false, hasCompletedInitialCheck: true, lastError: message }));
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
    hasCompletedInitialCheck: state.hasCompletedInitialCheck,
    lastError: state.lastError,
    lastCheckedAt: state.lastCheckedAt,
    checkSubscriptionStatus
  };
}
