import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/* ==========================================================================
   useCollegeSafeguardingReadiness — can this college actually ROUTE a
   safeguarding concern to a designated person?

   A safeguarding feature is only safe if a Designated Safeguarding Lead (or
   deputy) exists AND has a linked account that can receive the alert. A DSL
   flag on a staff member with no account is still a dead end — so "ready" is
   deliberately strict:

     canRoute = at least one (is_dsl OR is_deputy_dsl) staff WITH a user_id.

   The admin/head-of-department fallback in tg_notify_safeguarding is a degraded
   "no DSL set" path, NOT proper routing — so it does not count here. This drives
   the config-health warning that makes the silent-loss failure impossible to
   miss.
   ========================================================================== */

export interface SafeguardingReadiness {
  loading: boolean;
  /** A DSL/deputy with a linked account exists — alerts can reach a designated person. */
  canRoute: boolean;
  /** Designated leads that CAN receive alerts (have an account). */
  routableLeads: string[];
  /** Designated as DSL/deputy but with no linked account — flag set, can't receive. */
  unlinkedLeads: string[];
}

interface StaffRow {
  name: string | null;
  user_id: string | null;
  is_dsl: boolean | null;
  is_deputy_dsl: boolean | null;
}

export function useCollegeSafeguardingReadiness(): SafeguardingReadiness {
  const { profile } = useAuth();
  const collegeId = profile?.college_id ?? undefined;

  const { data, isLoading } = useQuery({
    queryKey: ['safeguarding-readiness', collegeId],
    enabled: !!collegeId,
    queryFn: async () => {
      const { data: rows } = await supabase
        .from('college_staff')
        .select('name, user_id, is_dsl, is_deputy_dsl')
        .eq('college_id', collegeId!)
        .is('archived_at', null)
        .or('is_dsl.eq.true,is_deputy_dsl.eq.true');
      return (rows ?? []) as StaffRow[];
    },
  });

  const leads = data ?? [];
  const routableLeads = leads.filter((s) => s.user_id).map((s) => s.name ?? 'Unnamed lead');
  const unlinkedLeads = leads.filter((s) => !s.user_id).map((s) => s.name ?? 'Unnamed lead');

  return {
    loading: isLoading,
    canRoute: routableLeads.length > 0,
    routableLeads,
    unlinkedLeads,
  };
}
