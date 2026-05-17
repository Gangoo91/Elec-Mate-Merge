import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useCollegeActivity — reader for the college_activity audit log.

   Every sensitive write across the College Hub records here (cohort
   broadcast sent, SAR approved, IQA verdicts recorded, etc.). HoDs read
   it for Ofsted "prove it" — who did what, when, on which entity.
   ========================================================================== */

export interface ActivityRow {
  id: string;
  college_id: string;
  actor_id: string | null;
  actor_name: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  details: Record<string, unknown> | null;
  created_at: string;
}

export interface ActivityFilters {
  actorId?: string | null;
  action?: string | null;
  entityType?: string | null;
  startDate?: string | null;
  endDate?: string | null;
}

export function useCollegeActivity(filters: ActivityFilters = {}) {
  const [rows, setRows] = useState<ActivityRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes.user?.id;
      if (!userId) {
        setRows([]);
        return;
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('college_id')
        .eq('id', userId)
        .maybeSingle();
      const collegeId = (profile as { college_id?: string | null } | null)?.college_id;
      if (!collegeId) {
        setRows([]);
        return;
      }

      let q = supabase
        .from('college_activity')
        .select('*')
        .eq('college_id', collegeId)
        .order('created_at', { ascending: false })
        .limit(500);
      if (filters.actorId) q = q.eq('actor_id', filters.actorId);
      if (filters.action) q = q.eq('action', filters.action);
      if (filters.entityType) q = q.eq('entity_type', filters.entityType);
      if (filters.startDate) q = q.gte('created_at', filters.startDate);
      if (filters.endDate) q = q.lte('created_at', filters.endDate);

      const { data: activityRows, error: aErr } = await q;
      if (aErr) throw aErr;

      // Resolve actor names from college_staff (most actors are staff in
      // this college) — fall back to profile full_name for any non-staff.
      const actorIds = Array.from(
        new Set(
          (activityRows ?? [])
            .map((a: any) => a.actor_id as string | null)
            .filter((id): id is string => !!id)
        )
      );
      const nameMap = new Map<string, string>();
      if (actorIds.length > 0) {
        const { data: staffRows } = await supabase
          .from('college_staff')
          .select('user_id, name')
          .in('user_id', actorIds);
        for (const s of (staffRows ?? []) as Array<{ user_id: string; name: string }>) {
          nameMap.set(s.user_id, s.name);
        }
        const missing = actorIds.filter((id) => !nameMap.has(id));
        if (missing.length > 0) {
          const { data: profileRows } = await supabase
            .from('profiles')
            .select('id, full_name')
            .in('id', missing);
          for (const p of (profileRows ?? []) as Array<{
            id: string;
            full_name: string | null;
          }>) {
            if (p.full_name) nameMap.set(p.id, p.full_name);
          }
        }
      }

      setRows(
        ((activityRows ?? []) as Array<any>).map((a) => ({
          id: a.id,
          college_id: a.college_id,
          actor_id: a.actor_id,
          actor_name: a.actor_id ? (nameMap.get(a.actor_id) ?? null) : null,
          action: a.action,
          entity_type: a.entity_type,
          entity_id: a.entity_id,
          details: a.details,
          created_at: a.created_at,
        }))
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [
    filters.actorId,
    filters.action,
    filters.entityType,
    filters.startDate,
    filters.endDate,
  ]);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  return { rows, loading, error, refetch: fetch };
}
