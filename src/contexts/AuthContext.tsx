
import { createContext, useContext, ReactNode, useEffect, useRef } from 'react';
import { useAuthSession } from '@/hooks/auth/useAuthSession';
import { useSubscriptionStatus } from '@/hooks/auth/useSubscriptionStatus';
import { useDevelopmentMode } from '@/hooks/auth/useDevelopmentMode';
import { useAuthentication } from '@/hooks/auth/useAuthentication';
import { AuthContextType } from '@/hooks/auth/types';
import { PresenceManager } from '@/services/presenceService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Combine all our authentication hooks
  const { session, user, profile, isLoading, fetchProfile } = useAuthSession();

  // Presence heartbeat - track user online status
  const presenceManagerRef = useRef<PresenceManager | null>(null);

  useEffect(() => {
    if (user?.id) {
      // Start presence tracking when user logs in
      presenceManagerRef.current = new PresenceManager(user.id);
      presenceManagerRef.current.start();
    }

    return () => {
      // Stop presence tracking when user logs out or component unmounts
      if (presenceManagerRef.current) {
        presenceManagerRef.current.stop();
        presenceManagerRef.current = null;
      }
    };
  }, [user?.id]);
  const { 
    isTrialActive, 
    trialEndsAt, 
    isSubscribed, 
    subscriptionTier, 
    isCheckingStatus, 
    lastError,
    lastCheckedAt,
    checkSubscriptionStatus 
  } = useSubscriptionStatus(profile);
  const { isDevelopmentMode, toggleDevelopmentMode } = useDevelopmentMode();
  const { signIn, signUp, signOut, resetPassword, updatePassword, resendConfirmationEmail, updateProfile } = useAuthentication();


  const value: AuthContextType = {
    session,
    user,
    profile,
    isLoading,
    isTrialActive,
    trialEndsAt,
    isSubscribed,
    subscriptionTier,
    isCheckingStatus,
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
