import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getMyCollegeId } from '@/lib/myCollege';

/* ==========================================================================
   useAuditLog — reader for the college_activity audit log (Audit log section).

   The section used to import `useCollegeActivity` from '@/hooks/useCollegeActivity',
   but that file was reused for the admin College scheme hook, so the section
   crashed on open ("Cannot read properties of undefined (reading 'map')").
   This is the original filtered reader, kept beside the screen that uses it.

   Who can read: admins, heads of department, IQAs and quality nominees
   (_college_quality_reader, the same test as the RLS read policy). Anyone
   else gets canRead false and no rows. The table is append-only: no UPDATE or
   DELETE policy exists.
   ========================================================================== */

export interface AuditRow {
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

export interface AuditFilters {
  action?: string | null;
  entityType?: string | null;
  startDate?: string | null;
  endDate?: string | null;
}

interface RawRow {
  id: string;
  college_id: string;
  actor_id: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  details: Record<string, unknown> | null;
  created_at: string;
}

export function useAuditLog(filters: AuditFilters = {}) {
  const [rows, setRows] = useState<AuditRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canRead, setCanRead] = useState<boolean | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes.user?.id;
      if (!userId) {
        setRows([]);
        return;
      }
      const collegeId = await getMyCollegeId(userId);
      if (!collegeId) {
        setRows([]);
        setCanRead(false);
        return;
      }
      const { data: allowed } = await supabase.rpc(
        '_college_quality_reader' as never,
        { p_college: collegeId } as never
      );
      if (allowed !== true) {
        setRows([]);
        setCanRead(false);
        return;
      }
      setCanRead(true);

      let q = supabase
        .from('college_activity')
        .select('id, college_id, actor_id, action, entity_type, entity_id, details, created_at')
        .eq('college_id', collegeId)
        .order('created_at', { ascending: false })
        .limit(500);
      if (filters.action) q = q.eq('action', filters.action);
      if (filters.entityType) q = q.eq('entity_type', filters.entityType);
      if (filters.startDate) q = q.gte('created_at', filters.startDate);
      if (filters.endDate) q = q.lte('created_at', filters.endDate);

      const { data, error: aErr } = await q;
      if (aErr) throw aErr;
      const raw = (data ?? []) as unknown as RawRow[];

      // Names: college staff first, then profiles for anyone else.
      const ids = Array.from(new Set(raw.map((a) => a.actor_id).filter((x): x is string => !!x)));
      const names = new Map<string, string>();
      if (ids.length > 0) {
        // actor_id holds an auth user id from some writers and a
        // college_staff id from others (the seeded history), so match both.
        const [{ data: byUser }, { data: byStaff }] = await Promise.all([
          supabase.from('college_staff').select('user_id, name').in('user_id', ids),
          supabase.from('college_staff').select('id, name').in('id', ids),
        ]);
        for (const s of (byUser ?? []) as Array<{ user_id: string | null; name: string | null }>) {
          if (s.user_id && s.name) names.set(s.user_id, s.name);
        }
        for (const s of (byStaff ?? []) as Array<{ id: string; name: string | null }>) {
          if (s.name && !names.has(s.id)) names.set(s.id, s.name);
        }
        const missing = ids.filter((id) => !names.has(id));
        if (missing.length > 0) {
          const { data: profs } = await supabase
            .from('profiles')
            .select('id, full_name')
            .in('id', missing);
          for (const p of (profs ?? []) as Array<{ id: string; full_name: string | null }>) {
            if (p.full_name) names.set(p.id, p.full_name);
          }
        }
      }

      setRows(
        raw.map((a) => ({ ...a, actor_name: a.actor_id ? (names.get(a.actor_id) ?? null) : null }))
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [filters.action, filters.entityType, filters.startDate, filters.endDate]);

  useEffect(() => {
    void load();
  }, [load]);

  return { rows, loading, error, canRead, refetch: load };
}
