import { useState, useEffect, useCallback, useRef } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { ProfileType } from './types';

// Track Elec-ID generation attempts to avoid duplicate calls
const elecIdGenerationAttempted = new Set<string>();

export function useAuthSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user profile with retry logic for reliability
  const fetchProfile = useCallback(
    async (userId: string, retryCount = 0): Promise<ProfileType | null> => {
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
          if (
            retryCount < MAX_RETRIES &&
            (error.message.includes('network') || error.code === 'PGRST301')
          ) {
            await new Promise((resolve) => setTimeout(resolve, 1000 * (retryCount + 1)));
            return fetchProfile(userId, retryCount + 1);
          }

          // Profile not found is ok - user can still proceed
          // Profile will be created on first use
          setProfile(null);
          return null;
        }

        if (data) {
          setProfile(data);

          // Check if user opted for Elec-ID but doesn't have one yet
          // This handles cases where email was confirmed on a different device
          if (
            data.elec_id_enabled &&
            !data.elec_id_number &&
            !elecIdGenerationAttempted.has(userId)
          ) {
            elecIdGenerationAttempted.add(userId);
            console.log('User opted for Elec-ID but none exists - generating now...');

            // Generate Elec-ID in background (non-blocking)
            supabase.functions
              .invoke('generate-elec-id', {
                body: { user_id: userId, ecs_card_type: data.ecs_card_type || null },
              })
              .then(({ data: elecIdResult, error: elecIdError }) => {
                if (elecIdError) {
                  console.error('Failed to generate Elec-ID on login:', elecIdError);
                  // Remove from attempted set so it can retry on next login
                  elecIdGenerationAttempted.delete(userId);
                } else if (elecIdResult?.elec_id_number) {
                  console.log('Elec-ID generated on login:', elecIdResult.elec_id_number);
                  // Update local profile state with the new Elec-ID
                  setProfile((prev) =>
                    prev ? { ...prev, elec_id_number: elecIdResult.elec_id_number } : prev
                  );
                }
              })
              .catch((err) => {
                console.error('Exception generating Elec-ID on login:', err);
                elecIdGenerationAttempted.delete(userId);
              });
          }

          return data;
        }

        return null;
      } catch (error) {
        console.error('Error in fetchProfile:', error);
        setProfile(null);
        return null;
      }
    },
    []
  );

  // Initial session check and listener setup
  useEffect(() => {
    let mounted = true;
    setIsLoading(true);

    // Set up auth state listener FIRST
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (!mounted) return;

      // Clear stale Elec-ID generation tracking on logout or user switch
      // This prevents blocking generation after logout/login cycle
      if (event === 'SIGNED_OUT') {
        elecIdGenerationAttempted.clear();
      }

      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      // If user session changes, fetch profile data (properly async)
      if (currentSession?.user) {
        // Don't block on profile fetch - user can proceed
        fetchProfile(currentSession.user.id);
      } else {
        setProfile(null);
      }
    });

    // THEN check for existing session
    // CRITICAL: Never set isLoading=false until getSession() has actually resolved.
    // On slow mobile networks (e.g. electricians on-site), a premature timeout
    // caused ProtectedRoute to redirect to /auth/signin before the session loaded,
    // creating a signin→dashboard bounce loop.
    const initSession = async () => {
      try {
        const {
          data: { session: currentSession },
        } = await supabase.auth.getSession();

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
