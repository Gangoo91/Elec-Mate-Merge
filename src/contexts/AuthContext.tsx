
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/use-toast';

// Define a type for our profile data that includes the new fields
type ProfileType = {
  id: string;
  username?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  updated_at?: string | null;
  created_at?: string | null;
  subscribed?: boolean | null;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: ProfileType | null;
  isLoading: boolean;
  isTrialActive: boolean;
  trialEndsAt: Date | null;
  isSubscribed: boolean;
  isDevelopmentMode: boolean;
  toggleDevelopmentMode: () => void;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTrialActive, setIsTrialActive] = useState(false);
  const [trialEndsAt, setTrialEndsAt] = useState<Date | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  // Add development mode state
  const [isDevelopmentMode, setIsDevelopmentMode] = useState(() => {
    const savedMode = localStorage.getItem('elecmate-dev-mode');
    return savedMode === 'true';
  });
  const { toast } = useToast();

  // Toggle development mode function
  const toggleDevelopmentMode = () => {
    const newMode = !isDevelopmentMode;
    setIsDevelopmentMode(newMode);
    localStorage.setItem('elecmate-dev-mode', newMode.toString());
    toast({
      title: newMode ? "Development Mode Enabled" : "Development Mode Disabled",
      description: newMode 
        ? "Subscription restrictions have been bypassed for development." 
        : "Subscription restrictions are now active.",
    });
  };

  // Initial session check and listener setup
  useEffect(() => {
    setIsLoading(true);
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // If user session changes, fetch profile data
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
          setIsTrialActive(false);
          setTrialEndsAt(null);
          setIsSubscribed(false);
        }
      }
    );
    
    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      
      setIsLoading(false);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Fetch user profile from profiles table
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Error fetching profile:', error);
      } else if (data) {
        setProfile(data);
        
        // Check trial status
        // Use optional chaining to safely access created_at
        const createdAt = new Date(data.created_at || new Date());
        const trialEndDate = new Date(createdAt);
        trialEndDate.setDate(trialEndDate.getDate() + 7); // 7-day trial
        
        const now = new Date();
        const isActive = now < trialEndDate;
        const isUserSubscribed = data.subscribed || false;
        
        setIsTrialActive(isActive && !isUserSubscribed);
        setTrialEndsAt(trialEndDate);
        setIsSubscribed(isUserSubscribed);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast({
          title: 'Login Failed',
          description: error.message,
          variant: 'destructive',
        });
        return { error };
      }
      
      // Success toast
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });
      
      return { error: null };
    } catch (error: any) {
      toast({
        title: 'Login Error',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
      return { error };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      
      if (error) {
        toast({
          title: 'Signup Failed',
          description: error.message,
          variant: 'destructive',
        });
        return { error };
      }
      
      // Success toast
      toast({
        title: 'Signup Successful',
        description: 'Your account has been created successfully. You now have a 7-day free trial!',
      });
      
      return { error: null };
    } catch (error: any) {
      toast({
        title: 'Signup Error',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  };

  const value = {
    session,
    user,
    profile,
    isLoading,
    isTrialActive,
    trialEndsAt,
    isSubscribed,
    isDevelopmentMode,
    toggleDevelopmentMode,
    signIn,
    signUp,
    signOut,
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
