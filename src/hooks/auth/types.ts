
import { Session, User } from '@supabase/supabase-js';

export type ProfileType = {
  id: string;
  username?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  updated_at?: string | null;
  created_at?: string | null;
  subscribed?: boolean | null;
};

export type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: ProfileType | null;
  isLoading: boolean;
  isTrialActive: boolean;
  trialEndsAt: Date | null;
  isSubscribed: boolean;
  subscriptionTier?: string | null;
  isCheckingStatus: boolean;
  lastError?: string | null;
  lastCheckedAt?: Date | null;
  checkSubscriptionStatus: () => Promise<void>;
  fetchProfile?: (userId: string) => Promise<ProfileType | null>;
  isDevelopmentMode: boolean;
  toggleDevelopmentMode: () => void;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
};
