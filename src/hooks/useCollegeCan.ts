import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/* ==========================================================================
   useCollegeCan — what the signed-in staff member may do at their college.

   ELE-1898. The permissions matrix lives ONCE, in the database:
   `college_role_capabilities` (role → capability) plus the duty flags on
   college_staff, answered by `college_can(action, college, learner)`. RLS
   asks that function; this hook asks it too, through one RPC
   (`get_my_college_capabilities`), so a button is shown exactly when the
   database will accept what it does.

   Never test a role string in a screen (`role === 'admin'`). Ask for the
   capability: `const { can } = useCollegeCan(); can('staff.manage')`.

   While loading, `can()` answers false: actions appear when we know they
   will work rather than vanish after a tap fails.
   ========================================================================== */

export type CollegeCapability =
  | 'learners.view_mine'
  | 'learners.view_all'
  | 'learners.edit'
  | 'register.take'
  | 'assess.decide'
  | 'iqa.sample'
  | 'iqa.verdict'
  | 'pastoral.read'
  | 'notes.restricted'
  | 'safeguarding.raise'
  | 'safeguarding.read'
  | 'safeguarding.manage'
  | 'messages.send'
  | 'observations.record'
  | 'reviews.write'
  | 'exports'
  | 'quality.view'
  | 'quality.edit'
  | 'cohorts.manage'
  | 'settings.manage'
  | 'staff.manage'
  | 'staff.grant_roles'
  | 'learner.view_as'
  | 'read_only';

export type CollegeStaffRoleKey =
  | 'tutor'
  | 'assessor'
  | 'iqa'
  | 'eqa'
  | 'head_of_department'
  | 'admin'
  | 'support';

export interface CollegeCapabilities {
  college_id: string | null;
  staff_id: string | null;
  role: CollegeStaffRoleKey | null;
  name: string | null;
  flags: {
    dsl: boolean;
    deputy_dsl: boolean;
    prevent_lead: boolean;
    h_and_s_lead: boolean;
    quality_nominee: boolean;
    mental_health_lead: boolean;
  } | null;
  /** The college has a signed-in admin or head of department. */
  has_manager: boolean;
  /** The same person is also a learner (the two-role person). */
  also_learner: boolean;
  platform_admin: boolean;
  can: Partial<Record<CollegeCapability, boolean>>;
}

export const COLLEGE_CAPS_QUERY_KEY = 'college-capabilities';

async function fetchCaps(collegeId: string | null): Promise<CollegeCapabilities | null> {
  const { data, error } = await (
    supabase.rpc as unknown as (
      fn: string,
      args: Record<string, unknown>
    ) => Promise<{ data: unknown; error: { message: string } | null }>
  )('get_my_college_capabilities', collegeId ? { p_college: collegeId } : {});
  if (error) throw new Error(error.message);
  const row = data as (CollegeCapabilities & { error?: string }) | null;
  if (!row || row.error) return null;
  return row;
}

export function useCollegeCan(collegeId?: string | null) {
  const { user } = useAuth();
  const uid = user?.id ?? null;
  const query = useQuery({
    queryKey: [COLLEGE_CAPS_QUERY_KEY, uid, collegeId ?? null],
    queryFn: () => fetchCaps(collegeId ?? null),
    enabled: !!uid,
    staleTime: 5 * 60 * 1000,
  });

  const caps = query.data ?? null;
  const can = useCallback(
    (capability: CollegeCapability) => Boolean(caps?.can?.[capability]),
    [caps]
  );

  return useMemo(
    () => ({
      loading: query.isLoading,
      caps,
      can,
      role: caps?.role ?? null,
      staffId: caps?.staff_id ?? null,
      collegeId: caps?.college_id ?? null,
      readOnly: Boolean(caps?.can?.read_only),
      hasManager: Boolean(caps?.has_manager),
      alsoLearner: Boolean(caps?.also_learner),
      refetch: query.refetch,
    }),
    [query.isLoading, query.refetch, caps, can]
  );
}

/* --------------------------------------------------------------------------
   The matrix itself, for the staff screen's "what this role can do".
   -------------------------------------------------------------------------- */

export interface CollegeRoleMatrix {
  capabilities: { key: CollegeCapability; label: string; description: string }[];
  roles: Partial<Record<CollegeStaffRoleKey, CollegeCapability[]>>;
}

export function useCollegeRoleMatrix() {
  return useQuery({
    queryKey: ['college-role-matrix'],
    queryFn: async (): Promise<CollegeRoleMatrix> => {
      const { data, error } = await (
        supabase.rpc as unknown as (
          fn: string
        ) => Promise<{ data: unknown; error: { message: string } | null }>
      )('get_college_role_matrix');
      if (error) throw new Error(error.message);
      return data as CollegeRoleMatrix;
    },
    staleTime: 60 * 60 * 1000,
  });
}

/** Plain-English names for the roles, used wherever a role is shown or picked. */
export const COLLEGE_ROLE_LABELS: Record<CollegeStaffRoleKey, string> = {
  tutor: 'Tutor',
  assessor: 'Assessor',
  iqa: 'IQA',
  head_of_department: 'Head of department',
  admin: 'College admin',
  support: 'Support staff',
  eqa: 'EQA (external)',
};

/** Roles only a manager can hand out (the database refuses anyone else). */
export const PRIVILEGED_COLLEGE_ROLES: ReadonlyArray<CollegeStaffRoleKey> = [
  'admin',
  'head_of_department',
];
