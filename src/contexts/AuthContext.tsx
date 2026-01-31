
import { createContext, useContext, ReactNode, useEffect, useRef, useMemo } from 'react';
import { useAuthSession } from '@/hooks/auth/useAuthSession';
import { useSubscriptionStatus } from '@/hooks/auth/useSubscriptionStatus';
import { useDevelopmentMode } from '@/hooks/auth/useDevelopmentMode';
import { useAuthentication } from '@/hooks/auth/useAuthentication';
import { AuthContextType } from '@/hooks/auth/types';
import { PresenceManager } from '@/services/presenceService';
import { identifySentryUser, clearSentryUser } from '@/lib/sentry';
import { logger } from '@/utils/logger';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Combine all our authentication hooks
  const { session, user, profile, isLoading, fetchProfile } = useAuthSession();

  // Presence heartbeat - track user online status
  const presenceManagerRef = useRef<PresenceManager | null>(null);

  useEffect(() => {
    if (user?.id) {
      logger.info('User authenticated', { userId: user.id, email: user.email, role: profile?.role });
      logger.action('User session started', 'auth', { userId: user.id });

      // Start presence tracking when user logs in
      presenceManagerRef.current = new PresenceManager(user.id);
      presenceManagerRef.current.start();

      // Identify user in Sentry for error tracking
      identifySentryUser({
        id: user.id,
        email: user.email,
        role: profile?.role,
      });
    } else {
      logger.info('User session ended');
      logger.action('User session ended', 'auth');
      // Clear Sentry user on logout
      clearSentryUser();
    }

    return () => {
      // Stop presence tracking when user logs out or component unmounts
      if (presenceManagerRef.current) {
        presenceManagerRef.current.stop();
        presenceManagerRef.current = null;
      }
    };
  }, [user?.id, user?.email, profile?.role]);
  const {
    isTrialActive,
    trialEndsAt,
    isSubscribed,
    subscriptionTier,
    isCheckingStatus,
    hasCompletedInitialCheck,
    lastError,
    lastCheckedAt,
    checkSubscriptionStatus
  } = useSubscriptionStatus(profile);
  const { isDevelopmentMode, toggleDevelopmentMode } = useDevelopmentMode();
  const { signIn, signUp, signOut, resetPassword, updatePassword, resendConfirmationEmail, updateProfile } = useAuthentication();


  const value: AuthContextType = useMemo(() => ({
    session,
    user,
    profile,
    isLoading,
    isTrialActive,
    trialEndsAt,
    isSubscribed,
    subscriptionTier,
    isCheckingStatus,
    hasCompletedInitialCheck,
    lastError,
    lastCheckedAt,
    checkSubscriptionStatus,
    isDevelopmentMode,
    toggleDevelopmentMode,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    resendConfirmationEmail,
    updateProfile,
    fetchProfile,
  }), [
    session,
    user,
    profile,
    isLoading,
    isTrialActive,
    trialEndsAt,
    isSubscribed,
    subscriptionTier,
    isCheckingStatus,
    hasCompletedInitialCheck,
    lastError,
    lastCheckedAt,
    checkSubscriptionStatus,
    isDevelopmentMode,
    toggleDevelopmentMode,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    resendConfirmationEmail,
    updateProfile,
    fetchProfile,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Selector hooks for auth context
 * These allow components to subscribe to specific parts of the auth state
 * without re-rendering when other parts change.
 *
 * Usage:
 *   const user = useAuthUser(); // Only re-renders when user changes
 *   const isSubscribed = useIsSubscribed(); // Only re-renders when subscription status changes
 */

/** Get the current user object */
export const useAuthUser = () => useAuth().user;

/** Get the current user's profile */
export const useAuthProfile = () => useAuth().profile;

/** Get the current session */
export const useSession = () => useAuth().session;

/** Get subscription status */
export const useIsSubscribed = () => useAuth().isSubscribed;

/** Get subscription tier */
export const useSubscriptionTier = () => useAuth().subscriptionTier;

/** Get trial status */
export const useIsTrialActive = () => useAuth().isTrialActive;

/** Get loading state */
export const useAuthLoading = () => useAuth().isLoading;

/** Get development mode status */
export const useIsDevelopmentMode = () => useAuth().isDevelopmentMode;
