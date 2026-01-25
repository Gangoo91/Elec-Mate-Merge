
import { Session, User } from '@supabase/supabase-js';

export type ProfileType = {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  role?: 'admin' | 'electrician' | 'apprentice' | 'visitor' | 'employer';
  admin_role?: 'super_admin' | 'admin' | null;
  created_at?: string;
  updated_at?: string;
  bio?: string;
  location?: string;
  website?: string;
  subscribed?: boolean;
  subscription_tier?: string | null;
  free_access_granted?: boolean;
  onboarding_completed?: boolean;
  ecs_card_type?: string;
  elec_id_enabled?: boolean;

  // Apprentice-specific fields
  apprentice_year?: number;
  apprentice_level?: string; // 'Level 2', 'Level 3'
  training_provider?: string;
  ecs_card_status?: 'not_applied' | 'applied' | 'received';
  supervisor_name?: string;

  // Electrician-specific fields
  job_title?: string;
  specialisation?: 'domestic' | 'commercial' | 'industrial' | 'solar' | 'ev';
  years_experience?: number;

  // Employer-specific fields
  business_position?: string;
  company_size?: '1-5' | '6-20' | '21-50' | '50+';
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
  hasCompletedInitialCheck: boolean;
  lastError: string | null;
  lastCheckedAt: Date | null;
  checkSubscriptionStatus: () => Promise<void>;
  isDevelopmentMode: boolean;
  toggleDevelopmentMode: () => void;
  signIn: (email: string, password: string) => Promise<{ error: any; user?: User | undefined }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updatePassword: (newPassword: string) => Promise<{ error: any }>;
  resendConfirmationEmail: (email: string) => Promise<{ error: any }>;
  updateProfile: (userId: string, profileData: {
    role?: string;
    ecs_card_type?: string;
    elec_id_enabled?: boolean;
    onboarding_completed?: boolean;
    // Apprentice fields
    apprentice_year?: number;
    apprentice_level?: string;
    training_provider?: string;
    ecs_card_status?: string;
    supervisor_name?: string;
    // Electrician fields
    job_title?: string;
    specialisation?: string;
    years_experience?: number;
    // Employer fields
    business_position?: string;
    company_size?: string;
  }) => Promise<{ error: any }>;
  fetchProfile?: (userId: string) => Promise<ProfileType | null>;
};
