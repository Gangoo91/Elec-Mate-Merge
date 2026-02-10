import { useState, useEffect, useCallback, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { Purchases } from '@revenuecat/purchases-capacitor';
import { ProfileType } from './types';
import { supabase } from '@/integrations/supabase/client';
import { capturePaymentError, captureEdgeFunctionError, addBreadcrumb } from '@/lib/sentry';

const RC_ENTITLEMENT_ID = 'Elec-Mate Pro';

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

  // Handle profile updates - subscription status comes from Stripe via webhook
  // Trial is now Stripe-managed: webhook sets subscribed=true for both 'active' and 'trialing'
  // IMPORTANT: Don't reset state when profile is null to prevent flash
  useEffect(() => {
    if (profile) {
      // Check both subscribed AND free_access_granted for beta testers
      const isUserSubscribed = profile.subscribed || profile.free_access_granted || false;

      // Skip update if isSubscribed value hasn't actually changed
      // This prevents unnecessary re-renders during scroll events
      if (previousStateRef.current?.isSubscribed === isUserSubscribed) {
        return;
      }

      // Use functional setState to get latest state and avoid stale closures
      setState((prev) => {
        const newState: SubscriptionState = {
          ...prev,
          isTrialActive: false, // Trial is now Stripe-managed (shows as subscribed)
          trialEndsAt: profile.subscription_end ? new Date(profile.subscription_end) : null,
          isSubscribed: isUserSubscribed,
          subscriptionTier: profile.subscription_tier || prev.subscriptionTier,
        };

        // Store the new state for future comparison
        previousStateRef.current = newState;

        return newState;
      });
    }
    // When profile is null (during refresh/navigation), keep previous state
    // This prevents the "free trial has ended" flash
  }, [profile]);

  // Function to check subscription status
  // On native: checks RevenueCat entitlements (handles Apple/Google receipt validation)
  // On web: calls check-subscription edge function (Stripe)
  const checkSubscriptionStatus = useCallback(async () => {
    if (!profile) return;

    // Prevent duplicate checks for same profile
    if (hasCheckedRef.current && profileIdRef.current === profile.id) {
      return;
    }

    // On native platforms, check RevenueCat entitlements instead of Stripe
    if (Capacitor.isNativePlatform()) {
      setState((prev) => ({ ...prev, isCheckingStatus: true, lastError: null }));
      try {
        const { customerInfo } = await Purchases.getCustomerInfo();
        const isEntitled = customerInfo.entitlements.active[RC_ENTITLEMENT_ID] !== undefined;

        hasCheckedRef.current = true;
        profileIdRef.current = profile.id;

        setState((prev) => ({
          ...prev,
          isSubscribed: isEntitled || prev.isSubscribed,
          subscriptionTier: isEntitled
            ? Capacitor.getPlatform() === 'ios'
              ? 'Pro (iOS)'
              : 'Pro (Android)'
            : prev.subscriptionTier,
          isCheckingStatus: false,
          hasCompletedInitialCheck: true,
          lastError: null,
          lastCheckedAt: new Date(),
        }));
        return;
      } catch (err) {
        console.error('RevenueCat entitlement check error:', err);
        // Fall through to profile-based check — don't block the user
        setState((prev) => ({ ...prev, isCheckingStatus: false, hasCompletedInitialCheck: true }));
        hasCheckedRef.current = true;
        profileIdRef.current = profile.id;
        return;
      }
    }

    setState((prev) => ({ ...prev, isCheckingStatus: true, lastError: null }));

    const MAX_RETRIES = 2;
    let lastError: string | null = null;

    // Ensure we have a valid session before calling the edge function
    // This prevents the "missing sub claim" error when auth isn't ready
    let session = (await supabase.auth.getSession()).data.session;

    // If no session or token is about to expire (within 60 seconds), try to refresh
    if (
      !session?.access_token ||
      (session.expires_at && session.expires_at * 1000 < Date.now() + 60000)
    ) {
      const { data: refreshData } = await supabase.auth.refreshSession();
      session = refreshData.session;
    }

    if (!session?.access_token) {
      // No valid session - skip the Stripe check but keep trial logic working
      // Trial status is calculated from profile.created_at, not from this edge function
      setState((prev) => ({ ...prev, isCheckingStatus: false, hasCompletedInitialCheck: true }));
      return;
    }

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        if (attempt > 0) {
          // Brief delay before retry (500ms, then 1000ms)
          await new Promise((resolve) => setTimeout(resolve, attempt * 500));
          addBreadcrumb('subscription', `Retrying subscription check (attempt ${attempt + 1})`);
        }

        const fetchPromise = supabase.functions.invoke('check-subscription', {
          body: {},
        });
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Subscription check timed out')), 5000)
        );
        const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);

        if (error) {
          lastError = error.message;
          // Retry on fetch/network errors, not on auth or server logic errors
          if (
            attempt < MAX_RETRIES &&
            /failed to send|fetch|network|timed out/i.test(error.message)
          ) {
            continue;
          }
          console.error('Error checking subscription:', error);
          captureEdgeFunctionError(
            new Error(`Subscription check failed: ${error.message}`),
            'check-subscription',
            { userId: profile?.id, attempt: attempt + 1 }
          );
          setState((prev) => ({
            ...prev,
            isCheckingStatus: false,
            hasCompletedInitialCheck: true,
            lastError: error.message,
          }));
          return;
        }

        if (data) {
          setState((prev) => ({
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
          setState((prev) => ({
            ...prev,
            isCheckingStatus: false,
            hasCompletedInitialCheck: true,
          }));
        }
        return; // Success — exit retry loop
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        lastError = message;
        // Retry on network/timeout errors
        if (attempt < MAX_RETRIES && /failed to send|fetch|network|timed out/i.test(message)) {
          continue;
        }
        console.error('Error in checkSubscriptionStatus:', message);
        capturePaymentError(error instanceof Error ? error : new Error(message), {
          userId: profile?.id,
          context: 'checkSubscriptionStatus',
          attempt: attempt + 1,
        });
        setState((prev) => ({
          ...prev,
          isCheckingStatus: false,
          hasCompletedInitialCheck: true,
          lastError: message,
        }));
        return;
      }
    }

    // All retries exhausted
    if (lastError) {
      captureEdgeFunctionError(
        new Error(`Subscription check failed after ${MAX_RETRIES + 1} attempts: ${lastError}`),
        'check-subscription',
        { userId: profile?.id, attempts: MAX_RETRIES + 1 }
      );
      setState((prev) => ({
        ...prev,
        isCheckingStatus: false,
        hasCompletedInitialCheck: true,
        lastError,
      }));
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
    checkSubscriptionStatus,
  };
}
