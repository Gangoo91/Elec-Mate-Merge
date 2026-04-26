import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useStaffRole — resolves the current user's staff role + flags so the UI
   can present a role-aware Student 360 / college dashboard.

   Roles seen in college_staff.role: head_of_department, tutor, assessor,
   iqa, admin (plus is_dsl/is_prevent_lead etc. boolean flags).
   ========================================================================== */

export type StaffRole = 'tutor' | 'assessor' | 'iqa' | 'head_of_department' | 'admin' | 'unknown';

export interface StaffRoleData {
  loading: boolean;
  /** Primary role string from college_staff.role (lowercased). */
  role: StaffRole;
  /** Convenience booleans for the most common buckets. */
  isAssessor: boolean;
  isIqa: boolean;
  isTutor: boolean;
  isAdmin: boolean;
  /** Safeguarding lead — orthogonal to role (boolean column on college_staff). */
  isDsl: boolean;
  /** Mental health lead — orthogonal too. */
  isMentalHealthLead: boolean;
  staffName: string | null;
}

const TUTOR_ROLES: ReadonlyArray<StaffRole> = ['tutor', 'head_of_department'];
const ADMIN_ROLES: ReadonlyArray<StaffRole> = ['admin', 'head_of_department'];

const CACHE_KEY = 'staff_role_v1';

function readCache(): Partial<StaffRoleData> | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Partial<StaffRoleData>;
  } catch {
    return null;
  }
}

function writeCache(data: StaffRoleData) {
  try {
    const { loading: _loading, ...persistable } = data;
    localStorage.setItem(CACHE_KEY, JSON.stringify(persistable));
  } catch {
    /* ignore */
  }
}

export function useStaffRole(): StaffRoleData {
  // Hydrate from cache so the action rail doesn't flash from tutor → assessor
  // on first paint. Cache is per-browser; refreshes silently in the background.
  const [data, setData] = useState<StaffRoleData>(() => {
    const cached = readCache();
    if (cached?.role) {
      return {
        loading: true, // still refresh in background
        role: cached.role as StaffRole,
        isAssessor: !!cached.isAssessor,
        isIqa: !!cached.isIqa,
        isTutor: !!cached.isTutor,
        isAdmin: !!cached.isAdmin,
        isDsl: !!cached.isDsl,
        isMentalHealthLead: !!cached.isMentalHealthLead,
        staffName: cached.staffName ?? null,
      };
    }
    return {
      loading: true,
      role: 'unknown',
      isAssessor: false,
      isIqa: false,
      isTutor: false,
      isAdmin: false,
      isDsl: false,
      isMentalHealthLead: false,
      staffName: null,
    };
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        if (!cancelled) setData((s) => ({ ...s, loading: false }));
        return;
      }
      const { data: staff } = await supabase
        .from('college_staff')
        .select('name, role, is_dsl, is_deputy_dsl, is_mental_health_lead')
        .eq('user_id', user.id)
        .maybeSingle();
      if (cancelled) return;
      const row = staff as
        | {
            name: string | null;
            role: string | null;
            is_dsl: boolean | null;
            is_deputy_dsl: boolean | null;
            is_mental_health_lead: boolean | null;
          }
        | null;
      const rawRole = (row?.role ?? '').toLowerCase() as StaffRole | string;
      const role: StaffRole = (() => {
        if (rawRole === 'tutor') return 'tutor';
        if (rawRole === 'assessor') return 'assessor';
        if (rawRole === 'iqa') return 'iqa';
        if (rawRole === 'head_of_department') return 'head_of_department';
        if (rawRole === 'admin') return 'admin';
        return 'unknown';
      })();
      const fresh: StaffRoleData = {
        loading: false,
        role,
        isAssessor: role === 'assessor',
        isIqa: role === 'iqa',
        isTutor: TUTOR_ROLES.includes(role),
        isAdmin: ADMIN_ROLES.includes(role),
        isDsl: Boolean(row?.is_dsl) || Boolean(row?.is_deputy_dsl),
        isMentalHealthLead: Boolean(row?.is_mental_health_lead),
        staffName: row?.name ?? null,
      };
      setData(fresh);
      writeCache(fresh);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}
