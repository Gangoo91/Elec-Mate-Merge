
import { Session, User } from '@supabase/supabase-js';

export type ProfileType = {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  role?: 'admin' | 'electrician' | 'apprentice' | 'visitor' | 'employer'; // Added role field
  created_at?: string;
  updated_at?: string;
  bio?: string;
  location?: string;
  website?: string;
  subscribed?: boolean; // Add missing property for subscription status
};

export type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: ProfileType | null;
  isLoading: boolean;
  isTrialActive: boolean;
  trialEndsAt: Date | null;
  isSubscribed: boolean;
  subscriptionTier: string | null;
  isCheckingStatus: boolean;
  lastError: string | null;
  lastCheckedAt: Date | null;
  checkSubscriptionStatus: () => Promise<void>;
  isDevelopmentMode: boolean;
  toggleDevelopmentMode: () => void;
  signIn: (email: string, password: string) => Promise<{ error: any; user?: User | undefined }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  fetchProfile?: (userId: string) => Promise<ProfileType | null>; // Add optional fetchProfile method
};
