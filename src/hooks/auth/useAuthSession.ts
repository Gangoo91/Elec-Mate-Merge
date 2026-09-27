import { useState, useEffect, useCallback, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { ProfileType } from './types';
import {
  isBiometricEnabled,
  authenticateAndGetCredentials,
  setBiometricEnabled,
  clearCredentials,
} from '@/utils/biometricAuth';

// Track Elec-ID generation attempts to avoid duplicate calls
const elecIdGenerationAttempted = new Set<string>();

/**
 * Users whose employer roster rows have already been claimed this session.
 *
 * 🔴 WHY THE CLAIM LIVES HERE AND NOT WHERE IT USED TO
 *
 * An employer adds a team member by email before that person has an account.
 * `claim_employee_records()` is what later attaches the waiting roster row to
 * the real account, matching on a CONFIRMED email — and until it runs, the
 * member has an `employer_employees` row with a null `user_id`, which every
 * employer-scoped query and RPC ignores. No assigned jobs, no clock-in, no
 * timesheets, no QS review: `submit_report_for_qs_review` requires
 * `auth.uid()` to match an active row, so an unclaimed member cannot submit a
 * certificate for sign-off at all.
 *
 * It was called from exactly two places: `useQsTeamContext` — which only runs
 * on the EICR / EIC / Minor Works forms and the QS screens — and location
 * resolution. So a member who signed up and used the Study Centre, a
 * calculator, or any specialist certificate was never linked. One account had
 * been sitting confirmed and unclaimed for 83 days against an employer's
 * roster, waiting for its owner to happen to open an EICR.
 *
 * Signing in is the moment we know who someone is, so it is the moment to ask.
 * Cleared on SIGNED_OUT with the Elec-ID set below.
 */
const rosterClaimAttempted = new Set<string>();

export function useAuthSession() {
  // Safe: App.tsx mounts QueryClientProvider OUTSIDE AuthProvider.
  const queryClient = useQueryClient();
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
        rosterClaimAttempted.clear();
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

        if (currentSession?.user) {
          setSession(currentSession);
          setUser(currentSession.user);
          fetchProfile(currentSession.user.id);
        } else {
          // No valid session — try biometric auto-login if enabled
          const biometricOn = await isBiometricEnabled();
          if (biometricOn) {
            // A lost Keychain entry (ELE-1677) is cleared inside the helper and
            // simply falls through to the sign-in page, where the user is told.
            const { credentials } = await authenticateAndGetCredentials();
            if (credentials && mounted) {
              const { data, error } = await supabase.auth.signInWithPassword({
                email: credentials.email,
                password: credentials.password,
              });

              if (!mounted) return;

              if (error) {
                // Stored password no longer valid — disable biometric silently
                await clearCredentials();
                await setBiometricEnabled(false);
                console.warn('[AUTH] Biometric auto-login failed, credentials cleared');
              } else if (data.session) {
                setSession(data.session);
                setUser(data.session.user);
                fetchProfile(data.session.user.id);
                return; // Skip the null fallthrough
              }
            }
          }

          // Fall through — no session, show sign-in page
          setSession(null);
          setUser(null);
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

  /*
   * Claim any employer roster rows waiting on this account's email.
   *
   * Keyed on the user id rather than bolted onto the three places that call
   * `fetchProfile`, so it runs exactly once per signed-in user however the
   * session arrived — fresh sign-in, restored session, or biometric unlock.
   *
   * Non-blocking and failure-tolerant by design: this is a convenience link,
   * and nothing about signing in should wait on it or break because of it.
   */
  useEffect(() => {
    const userId = user?.id;
    if (!userId) return;

    /*
     * ⚠️ The RPC matches on `email_confirmed_at is not null` and returns 0 for
     * anyone else. Checking it here rather than letting the RPC no-op means an
     * unconfirmed user does not burn their one attempt — otherwise someone who
     * confirmed their email mid-session would stay unlinked until they next
     * signed in.
     */
    if (!user?.email_confirmed_at) return;
    if (rosterClaimAttempted.has(userId)) return;
    rosterClaimAttempted.add(userId);

    /*
     * ⚠️ `supabase.rpc()` returns a PromiseLike, not a Promise — it has `.then`
     * but no `.catch`, so a `.then().catch()` chain does not compile and a
     * thrown error would have gone unhandled. try/catch around an await covers
     * both the returned `error` and a transport throw.
     */
    void (async () => {
      try {
        const { data, error } = await supabase.rpc('claim_employee_records');
        if (error) {
          // Let a later auth event try again — a transient failure here would
          // otherwise leave the member unlinked for the whole session.
          rosterClaimAttempted.delete(userId);
          console.warn('[AUTH] Employer roster claim failed:', error.message);
          return;
        }
        const claimed = typeof data === 'number' ? data : 0;
        if (claimed > 0) {
          console.log(`[AUTH] Linked ${claimed} employer roster record(s) to this account`);
          /*
           * The account is on a team as of a moment ago. Anything that asked
           * "am I on a team?" before now holds a stale no — `qs-team-context`
           * caches for ten minutes. Same two keys JoinTeamCard invalidates
           * after the invite-code route, for the same reason.
           */
          queryClient.invalidateQueries({ queryKey: ['qs-team-context'] });
          queryClient.invalidateQueries({ queryKey: ['my-employee-record'] });
        }
      } catch (err) {
        rosterClaimAttempted.delete(userId);
        console.warn('[AUTH] Employer roster claim threw:', err);
      }
    })();
  }, [user?.id, user?.email_confirmed_at, queryClient]);

  return {
    session,
    user,
    profile,
    isLoading,
    fetchProfile,
  };
}
