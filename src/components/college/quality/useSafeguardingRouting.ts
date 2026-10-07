import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/* ==========================================================================
   useSafeguardingRouting (ELE-1911) — where a safeguarding concern goes.

   Mirrors tg_notify_safeguarding and _safeguarding_reader: a concern
   notifies every active, non-archived DSL and deputy with an account. When
   the college has none, admins and heads of department with an account are
   told instead, and they can then read and act on the concern until a lead
   is set. If neither exists the concern is still saved, but nobody is told.
   The safeguarding screen shows this so a college can see, before it
   matters, whether its routing actually reaches a person.

   Also counts active learners under 18, who need the extra safeguarding
   duties that come with a minor (the queue flags them per concern). A
   learner with no date of birth on file can't be checked, so they are
   counted separately rather than treated as adults.
   ========================================================================== */

export interface SafeguardingLead {
  id: string;
  name: string;
  kind: 'dsl' | 'deputy';
  role: string | null;
  hasAccount: boolean;
}

export interface SafeguardingRouting {
  leads: SafeguardingLead[];
  /** Leads who will actually be notified (they have an account). */
  reachableLeads: number;
  /** Admins / heads of department with an account (the fallback). */
  fallback: Array<{ id: string; name: string; role: string | null }>;
  /** True when no lead can be reached, so the fallback reads and acts. */
  fallbackActive: boolean;
  /** People a new concern would alert right now (leads, else the fallback). */
  alerted: number;
  /** Nobody at all would be alerted. */
  nobodyAlerted: boolean;
  under18: number;
  /** Active learners with a date of birth on file (the only ones checkable). */
  withDob: number;
  /** Active learners with no date of birth, so under-18 can't be checked. */
  withoutDob: number;
  activeLearners: number;
}

export function ageOn(dob: string | null | undefined, at = new Date()): number | null {
  if (!dob) return null;
  const d = new Date(`${dob.slice(0, 10)}T12:00`);
  if (!Number.isFinite(d.getTime())) return null;
  let age = at.getFullYear() - d.getFullYear();
  const m = at.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && at.getDate() < d.getDate())) age -= 1;
  return age;
}

export function useSafeguardingRouting() {
  const { user, profile } = useAuth();
  const collegeId = profile?.college_id ?? null;

  return useQuery<SafeguardingRouting>({
    queryKey: ['safeguarding-routing', collegeId, user?.id],
    enabled: !!collegeId,
    staleTime: 60_000,
    queryFn: async () => {
      const [{ data: staff }, { data: learners }] = await Promise.all([
        supabase
          .from('college_staff')
          .select('id, name, role, status, is_dsl, is_deputy_dsl, user_id')
          .eq('college_id', collegeId!)
          .is('archived_at', null),
        supabase.from('college_students').select('id, status, date_of_birth').eq('college_id', collegeId!),
      ]);

      // Same test as the database: archived rows are already excluded, and a
      // member of staff on leave or archived by status is not reachable.
      const rows = (
        (staff ?? []) as Array<{
          id: string;
          name: string | null;
          role: string | null;
          status: string | null;
          is_dsl: boolean | null;
          is_deputy_dsl: boolean | null;
          user_id: string | null;
        }>
      ).filter((s) => (s.status ?? 'active').trim().toLowerCase() === 'active');
      const leads: SafeguardingLead[] = rows
        .filter((s) => s.is_dsl || s.is_deputy_dsl)
        .map((s): SafeguardingLead => ({
          id: s.id,
          name: s.name ?? 'Unnamed',
          kind: s.is_dsl ? 'dsl' : 'deputy',
          role: s.role,
          hasAccount: !!s.user_id,
        }))
        .sort((a, b) => (a.kind === b.kind ? a.name.localeCompare(b.name) : a.kind === 'dsl' ? -1 : 1));
      const fallback = rows
        .filter((s) => (s.role === 'admin' || s.role === 'head_of_department') && !!s.user_id)
        .map((s) => ({ id: s.id, name: s.name ?? 'Unnamed', role: s.role }));

      const active = ((learners ?? []) as unknown as Array<{ status: string | null; date_of_birth: string | null }>).filter(
        (l) => (l.status ?? '').toLowerCase() === 'active'
      );
      const withDob = active.filter((l) => ageOn(l.date_of_birth) != null);
      const under18 = withDob.filter((l) => (ageOn(l.date_of_birth) ?? 99) < 18).length;

      const reachableLeads = leads.filter((l) => l.hasAccount).length;
      const fallbackActive = reachableLeads === 0;
      const alerted = fallbackActive ? fallback.length : reachableLeads;

      return {
        leads,
        reachableLeads,
        fallback,
        fallbackActive,
        alerted,
        nobodyAlerted: alerted === 0,
        under18,
        withDob: withDob.length,
        withoutDob: active.length - withDob.length,
        activeLearners: active.length,
      };
    },
  });
}
