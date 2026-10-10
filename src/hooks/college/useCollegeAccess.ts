/* ==========================================================================
   useCollegeAccess — the college pilot access model, client side (7 Oct 2026).

   - useMyCollegeAccess(): the signed-in person's college and its access
     (pilot / contracted / lapsed, phase, end date, grace) from
     get_my_college_access. Drives the pilot banner, the "access has ended"
     page and the "Access provided by <College>" line.
   - useActingCollege(): the college a platform admin is acting for
     (white-glove set-up), from get_my_acting_college. The server decides:
     every write is checked by RLS and logged; this only steers the UI.
   - startActing / stopActing: open and close the server-side session.
   - getActingCollegeId(): read outside React (collegeRoster sends it as the
     x-acting-college header).
   ========================================================================== */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type CollegeAccessPhase = 'none' | 'upcoming' | 'active' | 'ending_soon' | 'grace' | 'ended';

export interface MyCollegeAccess {
  role: 'staff' | 'learner';
  college_id: string;
  college_name: string;
  access_status: 'none' | 'pilot' | 'contracted' | 'lapsed';
  phase: CollegeAccessPhase;
  starts_on: string | null;
  ends_on: string | null;
  grace_until: string | null;
  days_left: number | null;
  has_access: boolean;
  is_lead: boolean;
  roll_status: string | null;
  provided_by_college: boolean;
}

export interface ActingCollege {
  college_id: string;
  college_name: string;
  college_code: string;
  expires_at: string;
  started_at: string;
  /** 'setup' = white-glove (writes allowed, logged); 'view_as' = support, read-only (ELE-1966). */
  mode?: 'setup' | 'view_as';
  as_user_id?: string | null;
  as_name?: string | null;
  as_role?: string | null;
}

/** "Thursday 19 November" style, UK. */
export function accessDate(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(`${iso.slice(0, 10)}T12:00:00`);
  return d.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function useMyCollegeAccess() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['my-college-access', user?.id],
    enabled: !!user?.id,
    staleTime: 5 * 60_000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_my_college_access' as never);
      if (error) throw error;
      return (data ?? null) as MyCollegeAccess | null;
    },
  });
}

let actingCollegeId: string | null = null;
/** The college a platform admin is acting for right now, or null. */
export const getActingCollegeId = () => actingCollegeId;

export function useActingCollege() {
  const { user, profile } = useAuth();
  const isPlatformAdmin = !!(profile as { admin_role?: string | null } | null)?.admin_role;
  return useQuery({
    queryKey: ['my-acting-college', user?.id],
    enabled: !!user?.id && isPlatformAdmin,
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_my_acting_college' as never);
      if (error) throw error;
      const acting = (data ?? null) as ActingCollege | null;
      actingCollegeId = acting?.college_id ?? null;
      return acting;
    },
  });
}

export function useActingControls() {
  const qc = useQueryClient();
  const refresh = useCallback(async () => {
    await qc.invalidateQueries({ queryKey: ['my-acting-college'] });
    // Everything in the hub is keyed off the college; start clean.
    await qc.invalidateQueries();
  }, [qc]);

  const startActing = useCallback(
    async (collegeId: string, reason?: string) => {
      const { data, error } = await supabase.rpc(
        'admin_start_acting' as never,
        {
          p_college: collegeId,
          p_reason: reason ?? null,
        } as never
      );
      if (error) throw error;
      actingCollegeId = collegeId;
      await refresh();
      return data as { college_id: string; college_name: string; expires_at: string };
    },
    [refresh]
  );

  /**
   * ELE-1966: Elec-Mate support views the hub AS a named staff member, with
   * the college's consent, read-only (the server refuses every write while
   * the session is open), for one hour. The reason is written to the
   * college's own activity log.
   */
  const startViewAs = useCallback(
    async (collegeId: string, userId: string, reason: string) => {
      const { data, error } = await supabase.rpc(
        'admin_start_view_as' as never,
        { p_college: collegeId, p_user: userId, p_reason: reason } as never
      );
      if (error) throw error;
      actingCollegeId = collegeId;
      await refresh();
      return data as { college_id: string; college_name: string; expires_at: string; as_name: string };
    },
    [refresh]
  );

  const stopActing = useCallback(async () => {
    const { error } = await supabase.rpc('admin_stop_acting' as never);
    if (error) throw error;
    actingCollegeId = null;
    await refresh();
  }, [refresh]);

  return { startActing, startViewAs, stopActing };
}
