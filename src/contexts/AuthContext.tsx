
import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useAuthSession } from '@/hooks/auth/useAuthSession';
import { useSubscriptionStatus } from '@/hooks/auth/useSubscriptionStatus';
import { useDevelopmentMode } from '@/hooks/auth/useDevelopmentMode';
import { useAuthentication } from '@/hooks/auth/useAuthentication';
import { AuthContextType } from '@/hooks/auth/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Combine all our authentication hooks
  const { session, user, profile, isLoading, fetchProfile } = useAuthSession();
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
  const { signIn, signUp, signOut } = useAuthentication();

  // Log auth state for debugging
  useEffect(() => {
    console.log('AuthContext state updated:', {
      isAuthenticated: !!user,
      userEmail: user?.email,
      isLoading,
      isSubscribed,
      subscriptionTier,
    });
  }, [user, isLoading, isSubscribed, subscriptionTier]);

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
