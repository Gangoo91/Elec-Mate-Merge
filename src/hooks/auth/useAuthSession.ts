
import { useState, useEffect, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { ProfileType } from './types';

export function useAuthSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user profile with retry logic for reliability
  const fetchProfile = useCallback(async (userId: string, retryCount = 0): Promise<ProfileType | null> => {
    const MAX_RETRIES = 2;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.warn(`Profile fetch attempt ${retryCount + 1} failed:`, error.message);

        // Retry on transient errors
        if (retryCount < MAX_RETRIES && (error.message.includes('network') || error.code === 'PGRST301')) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
          return fetchProfile(userId, retryCount + 1);
        }

        // Profile not found is ok - user can still proceed
        // Profile will be created on first use
        setProfile(null);
        return null;
      }

      if (data) {
        setProfile(data);
        return data;
      }

      return null;
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      setProfile(null);
      return null;
    }
  }, []);

  // Initial session check and listener setup
  useEffect(() => {
    let mounted = true;
    setIsLoading(true);

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, currentSession) => {
        if (!mounted) return;

        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // If user session changes, fetch profile data (properly async)
        if (currentSession?.user) {
          // Don't block on profile fetch - user can proceed
          fetchProfile(currentSession.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session with timeout for slow mobile networks
    const initSession = async () => {
      // Timeout to prevent infinite loading on slow mobile connections
      const timeoutId = setTimeout(() => {
        if (mounted) {
          console.warn('Auth session check timed out after 8s');
          setIsLoading(false);
        }
      }, 8000);

      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();

        if (!mounted) return;

        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          // Fetch profile but don't block loading state
          fetchProfile(currentSession.user.id);
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        clearTimeout(timeoutId);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  return {
    session,
    user,
    profile,
    isLoading,
    fetchProfile,
  };
}
