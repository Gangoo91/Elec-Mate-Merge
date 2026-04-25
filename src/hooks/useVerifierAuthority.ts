import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useVerifierAuthority — does the current user have authority to sign off
   compliance records? Verifiers are: DSL, Deputy DSL, Quality Nominee, or
   anyone with role in ('admin', 'head_of_department').
   ========================================================================== */

export interface VerifierAuthority {
  isVerifier: boolean;
  /** The current user's college_staff row (if linked). */
  staffId: string | null;
  loading: boolean;
}

export function useVerifierAuthority(): VerifierAuthority {
  const [state, setState] = useState<VerifierAuthority>({
    isVerifier: false,
    staffId: null,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      if (!userId) {
        if (!cancelled) setState({ isVerifier: false, staffId: null, loading: false });
        return;
      }

      const { data } = await supabase
        .from('college_staff')
        .select('id, role, is_dsl, is_deputy_dsl, is_quality_nominee')
        .eq('user_id', userId)
        .is('archived_at', null)
        .maybeSingle();

      if (cancelled) return;

      if (!data) {
        // No staff link — could still be an admin profile, but for now we
        // gate verifier authority on the college_staff row + role flags.
        setState({ isVerifier: false, staffId: null, loading: false });
        return;
      }

      const role = (data.role ?? '').toLowerCase();
      const isVerifier =
        Boolean(data.is_dsl) ||
        Boolean(data.is_deputy_dsl) ||
        Boolean(data.is_quality_nominee) ||
        role === 'admin' ||
        role === 'head_of_department';

      setState({ isVerifier, staffId: data.id, loading: false });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
