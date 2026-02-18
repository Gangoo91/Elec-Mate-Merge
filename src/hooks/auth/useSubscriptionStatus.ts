import { useState, useEffect, useCallback, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { Purchases } from '@revenuecat/purchases-capacitor';
import { ProfileType } from './types';
import { supabase } from '@/integrations/supabase/client';
import { capturePaymentError, captureEdgeFunctionError, addBreadcrumb } from '@/lib/sentry';

const RC_ENTITLEMENT_ID = 'Elec-Mate Pro';

// Cache TTLs in milliseconds
const CACHE_TTL_SUBSCRIBED = 30 * 60 * 1000; // 30 minutes
const CACHE_TTL_UNSUBSCRIBED = 5 * 60 * 1000; // 5 minutes

// --- sessionStorage cache helpers ---

interface SubCacheEntry {
  isSubscribed: boolean;
  subscriptionTier: string | null;
  cachedAt: number;
  userId: string;
}

function cacheKey(userId: string): string {
  return `elecmate_sub_cache_${userId}`;
}

function readCache(userId: string): SubCacheEntry | null {
  try {
    const raw = sessionStorage.getItem(cacheKey(userId));
    if (!raw) return null;
    const entry: SubCacheEntry = JSON.parse(raw);
    // Validate shape
    if (
      typeof entry.isSubscribed !== 'boolean' ||
      typeof entry.cachedAt !== 'number' ||
      entry.userId !== userId
    ) {
      return null;
    }
    // Check TTL
    const ttl = entry.isSubscribed ? CACHE_TTL_SUBSCRIBED : CACHE_TTL_UNSUBSCRIBED;
    if (Date.now() - entry.cachedAt > ttl) {
      return null; // Expired
    }
    return entry;
  } catch {
    // sessionStorage may be unavailable (private browsing, quota exceeded)
    return null;
  }
}

function writeCache(data: {
  isSubscribed: boolean;
  subscriptionTier: string | null;
  userId: string;
}): void {
  try {
    const entry: SubCacheEntry = {
      isSubscribed: data.isSubscribed,
      subscriptionTier: data.subscriptionTier,
      cachedAt: Date.now(),
      userId: data.userId,
    };
    sessionStorage.setItem(cacheKey(data.userId), JSON.stringify(entry));
  } catch {
    // Silently fail — cache is a UI optimisation only
  }
}

function clearCache(userId?: string): void {
  try {
    if (userId) {
      sessionStorage.removeItem(cacheKey(userId));
    } else {
      // Clear all subscription caches
      const keysToRemove: string[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith('elecmate_sub_cache_')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => sessionStorage.removeItem(k));
    }
  } catch {
    // Silently fail
  }
}

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
  // Track whether a background refresh is already in flight
  const bgRefreshInFlightRef = useRef(false);

  // Handle profile updates - subscription status comes from Stripe via webhook
  // Trial is now Stripe-managed: webhook sets subscribed=true for both 'active' and 'trialing'
  // IMPORTANT: Don't reset state when profile is null to prevent flash
  useEffect(() => {
    if (profile) {
      // If subscribed but no Stripe customer and subscription_end is past, treat as expired
      const isExpiredWithoutStripe =
        profile.subscribed &&
        !profile.stripe_customer_id &&
        profile.subscription_end &&
        new Date(profile.subscription_end) < new Date();

      // Check both subscribed AND free_access_granted for beta testers
      const isUserSubscribed =
        (profile.subscribed && !isExpiredWithoutStripe) || profile.free_access_granted || false;

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

  // Background refresh: calls edge function silently, updates cache + state only if changed
  const backgroundRefresh = useCallback(async () => {
    if (!profile || bgRefreshInFlightRef.current) return;
    bgRefreshInFlightRef.current = true;

    try {
      let session = (await supabase.auth.getSession()).data.session;
      if (
        !session?.access_token ||
        (session.expires_at && session.expires_at * 1000 < Date.now() + 60000)
      ) {
        const { data: refreshData } = await supabase.auth.refreshSession();
        session = refreshData.session;
      }
      if (!session?.access_token) return;

      const fetchPromise = supabase.functions.invoke('check-subscription', { body: {} });
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Background subscription check timed out')), 10000)
      );
      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);

      if (error || !data) return; // Fail silently — cached data is already serving the user

      // Write fresh result to cache
      writeCache({
        isSubscribed: data.subscribed,
        subscriptionTier: data.subscription_tier,
        userId: profile.id,
      });

      // Only update React state if result actually differs
      setState((prev) => {
        if (
          prev.isSubscribed === data.subscribed &&
          prev.subscriptionTier === data.subscription_tier
        ) {
          return prev; // No change — prevent re-render
        }
        const newState: SubscriptionState = {
          ...prev,
          isSubscribed: data.subscribed,
          subscriptionTier: data.subscription_tier,
          isTrialActive: data.subscribed ? false : prev.isTrialActive,
          lastCheckedAt: new Date(),
          lastError: null,
        };
        previousStateRef.current = newState;
        return newState;
      });
    } catch {
      // Background refresh fails silently — cached data is still valid
    } finally {
      bgRefreshInFlightRef.current = false;
    }
  }, [profile]);

  // Function to check subscription status
  // On native: checks RevenueCat entitlements (handles Apple/Google receipt validation)
  // On web: calls check-subscription edge function (Stripe)
  const checkSubscriptionStatus = useCallback(
    async (options?: { forceRefresh?: boolean }) => {
      if (!profile) return;

      const forceRefresh = options?.forceRefresh ?? false;

      if (forceRefresh) {
        clearCache(profile.id);
        hasCheckedRef.current = false;
      }

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

          setState((prev) => {
            const resolvedSubscribed = isEntitled || prev.isSubscribed;
            const resolvedTier = isEntitled
              ? Capacitor.getPlatform() === 'ios'
                ? 'Pro (iOS)'
                : 'Pro (Android)'
              : prev.subscriptionTier;

            // Write to cache after RevenueCat success (using resolved values from prev state)
            writeCache({
              isSubscribed: resolvedSubscribed,
              subscriptionTier: resolvedTier,
              userId: profile.id,
            });

            return {
              ...prev,
              isSubscribed: resolvedSubscribed,
              subscriptionTier: resolvedTier,
              isCheckingStatus: false,
              hasCompletedInitialCheck: true,
              lastError: null,
              lastCheckedAt: new Date(),
            };
          });
          return;
        } catch (err) {
          console.error('RevenueCat entitlement check error:', err);
          // Fall through to profile-based check — don't block the user
          setState((prev) => ({
            ...prev,
            isCheckingStatus: false,
            hasCompletedInitialCheck: true,
          }));
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
        setState((prev) => ({
          ...prev,
          isCheckingStatus: false,
          hasCompletedInitialCheck: true,
        }));
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
            setTimeout(() => reject(new Error('Subscription check timed out')), 10000)
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
            // Write to cache after successful edge function response
            writeCache({
              isSubscribed: data.subscribed,
              subscriptionTier: data.subscription_tier,
              userId: profile.id,
            });

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
          if (
            attempt < MAX_RETRIES &&
            /failed to send|fetch|network|timed out/i.test(message)
          ) {
            continue;
          }
          console.error('Error in checkSubscriptionStatus:', message);
          // Timeout/network errors are transient — don't escalate to fatal payment error
          if (/timed out|fetch|network/i.test(message)) {
            captureEdgeFunctionError(
              error instanceof Error ? error : new Error(message),
              'check-subscription',
              {
                userId: profile?.id,
                attempt: attempt + 1,
              }
            );
          } else {
            capturePaymentError(error instanceof Error ? error : new Error(message), {
              userId: profile?.id,
              context: 'checkSubscriptionStatus',
              attempt: attempt + 1,
            });
          }
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
          new Error(
            `Subscription check failed after ${MAX_RETRIES + 1} attempts: ${lastError}`
          ),
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
    },
    [profile]
  );

  // Check subscription status once when profile becomes available
  // Uses ref to prevent duplicate API calls
  // Cache-first: if valid cache exists, apply it immediately and background-refresh
  useEffect(() => {
    if (profile && !hasCheckedRef.current) {
      const cached = readCache(profile.id);

      if (cached) {
        // Derive profile's subscription status for cross-check
        const isExpiredWithoutStripe =
          profile.subscribed &&
          !profile.stripe_customer_id &&
          profile.subscription_end &&
          new Date(profile.subscription_end) < new Date();
        const profileSubscribed =
          (profile.subscribed && !isExpiredWithoutStripe) || profile.free_access_granted || false;

        // If cache and profile disagree, force a foreground refresh
        if (cached.isSubscribed !== profileSubscribed) {
          addBreadcrumb('subscription', 'Cache/profile mismatch — foreground refresh');
          checkSubscriptionStatus({ forceRefresh: true });
          return;
        }

        // Cache hit + matches profile → apply cached state immediately
        hasCheckedRef.current = true;
        profileIdRef.current = profile.id;

        setState((prev) => {
          const newState: SubscriptionState = {
            ...prev,
            isSubscribed: cached.isSubscribed,
            subscriptionTier: cached.subscriptionTier ?? prev.subscriptionTier,
            hasCompletedInitialCheck: true,
            isCheckingStatus: false,
            lastError: null,
          };
          previousStateRef.current = newState;
          return newState;
        });

        // Fire background refresh to keep cache fresh
        setTimeout(() => backgroundRefresh(), 0);
      } else {
        // No valid cache — foreground check as before
        checkSubscriptionStatus();
      }
    }
  }, [profile, checkSubscriptionStatus, backgroundRefresh]);

  // Reset check flag and clear old cache when user changes
  useEffect(() => {
    if (profile?.id !== profileIdRef.current) {
      // Clear previous user's cache
      if (profileIdRef.current) {
        clearCache(profileIdRef.current);
      }
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
