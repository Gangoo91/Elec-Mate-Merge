import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { getActingCollegeId } from '@/hooks/college/useCollegeAccess';

/* ==========================================================================
   useCollegeScope — the ONE "whose work" setting for the College Hub
   (ELE-1886, 7 Oct 2026).

   Three states, chosen once in the masthead and used by every screen that
   lists learners or their work (both inboxes, home figures, marking, OTJ,
   People, assessment):

     mine     Learners I am personally on: tutor, assessor or IQA in
              college_student_assignments. A tutor with no assignments who
              leads a cohort gets that cohort's learners here instead, so
              "Mine" is never an empty screen for a class tutor.
     cohorts  Everyone in a cohort I lead (college_cohorts.tutor_id = my
              college_staff.id) or that holds one of my learners.
     college  Everyone at the college.

   Who is mine is decided by the data, never by a role name.

   Stored per USER in user_settings (key `college_scope`, owner-only RLS), so
   it follows the tutor from laptop to phone, and mirrored in localStorage
   under the key the released app already reads ('college-people-scope'),
   so the first paint is right and older builds keep working: they only
   understand 'mine' and 'college', and 'cohorts' reads as unset there,
   which falls back to their own default.
   ========================================================================== */

export type CollegeScopeLevel = 'mine' | 'cohorts' | 'college';

export const SCOPE_LABEL: Record<CollegeScopeLevel, string> = {
  mine: 'Mine',
  cohorts: 'My cohorts',
  college: 'Whole college',
};

export const SCOPE_HINT: Record<CollegeScopeLevel, string> = {
  mine: 'Learners you tutor, assess or IQA',
  cohorts: 'Everyone in the cohorts you teach',
  college: 'Every learner at the college',
};

const LOCAL_KEY = 'college-people-scope';
const EVT = 'college-people-scope-change';
const SERVER_KEY = 'college_scope';

const isLevel = (v: unknown): v is CollegeScopeLevel => v === 'mine' || v === 'cohorts' || v === 'college';

function readLocal(): CollegeScopeLevel | null {
  try {
    const v = window.localStorage.getItem(LOCAL_KEY);
    if (v === 'all') return 'college';
    return isLevel(v) ? v : null;
  } catch {
    return null;
  }
}

/**
 * Narrow to "Mine" only if the stored choice is the whole college. Reads the
 * store at call time, so a page toggle that runs after the shared tabs have
 * already picked "My cohorts" does not undo it.
 */
export function narrowIfCollege(setLevel: (v: CollegeScopeLevel) => void, current: CollegeScopeLevel) {
  const stored = readLocal() ?? current;
  if (stored === 'college') setLevel('mine');
}

function writeLocal(v: CollegeScopeLevel) {
  try {
    window.localStorage.setItem(LOCAL_KEY, v);
  } catch {
    /* private mode: the choice still holds for this visit */
  }
  window.dispatchEvent(new Event(EVT));
}

/* One server read per signed-in user per page load, shared by every hook. */
const serverLoaded = new Set<string>();

/** The stored choice (null = never chosen) and its setter. */
export function useCollegeScopeChoice(): [CollegeScopeLevel | null, (v: CollegeScopeLevel) => void] {
  const { user } = useAuth();
  const uid = user?.id ?? null;
  const [chosen, setChosen] = useState<CollegeScopeLevel | null>(() => readLocal());

  useEffect(() => {
    const on = () => setChosen(readLocal());
    window.addEventListener(EVT, on);
    window.addEventListener('storage', on);
    return () => {
      window.removeEventListener(EVT, on);
      window.removeEventListener('storage', on);
    };
  }, []);

  // The saved choice on the server wins over this device's copy.
  useEffect(() => {
    if (!uid || serverLoaded.has(uid)) return;
    serverLoaded.add(uid);
    void (async () => {
      const { data, error } = await supabase
        .from('user_settings')
        .select('value')
        .eq('user_id', uid)
        .eq('key', SERVER_KEY)
        .maybeSingle();
      if (error) {
        serverLoaded.delete(uid);
        return;
      }
      const v = (data?.value as { level?: unknown } | null)?.level;
      if (isLevel(v) && v !== readLocal()) writeLocal(v);
    })();
  }, [uid]);

  const set = useCallback(
    (v: CollegeScopeLevel) => {
      writeLocal(v);
      setChosen(v);
      if (!uid) return;
      void supabase
        .from('user_settings')
        .upsert(
          { user_id: uid, key: SERVER_KEY, value: { level: v } as never, updated_at: new Date().toISOString() },
          { onConflict: 'user_id,key' }
        )
        .then(({ error }) => {
          if (error) console.warn('[college-scope] not saved to your account', error.message);
        });
    },
    [uid]
  );

  return [chosen, set];
}

/* ── Membership: who is mine, who is in my cohorts ─────────────────────── */

export interface ScopeSet {
  /** college_students.id */
  studentIds: Set<string>;
  /** college_students.user_id (auth uid) */
  userIds: Set<string>;
  /** college_cohorts.id */
  cohortIds: Set<string>;
  /** cohort names, for rows that only carry a name */
  cohortNames: Set<string>;
}

export interface CollegeMembership {
  loading: boolean;
  staffId: string | null;
  collegeId: string | null;
  mine: ScopeSet;
  cohorts: ScopeSet;
  /** I have any learners or cohorts at all, so the narrower views mean something. */
  hasAny: boolean;
  /** I have an ACTIVE learner or cohort: "Mine" is the sensible default. */
  hasActive: boolean;
}

const emptySet = (): ScopeSet => ({
  studentIds: new Set(),
  userIds: new Set(),
  cohortIds: new Set(),
  cohortNames: new Set(),
});

type StudentRow = { id: string; user_id: string | null; cohort_id: string | null; status: string | null };
type CohortRow = { id: string; name: string | null; status: string | null };

async function loadMembership(uid: string) {
  const { data: staff } = await supabase
    .from('college_staff')
    .select('id, college_id')
    .eq('user_id', uid)
    .is('archived_at', null)
    .maybeSingle();
  const staffId = (staff as { id?: string } | null)?.id ?? null;
  // White-glove: acting for a college scopes to THAT college.
  const collegeId = getActingCollegeId() ?? (staff as { college_id?: string } | null)?.college_id ?? null;

  const [{ data: led }, { data: assigned }] = await Promise.all([
    staffId
      ? supabase.from('college_cohorts').select('id, name, status').eq('tutor_id', staffId)
      : Promise.resolve({ data: [] as CohortRow[] }),
    supabase
      .from('college_student_assignments')
      .select('student_id')
      .or(`tutor_id.eq.${uid},assessor_id.eq.${uid},iqa_id.eq.${uid}`),
  ]);
  const ledCohorts = (led ?? []) as CohortRow[];
  // college_student_assignments.student_id is the learner's AUTH uid.
  const assignedUids = Array.from(
    new Set(((assigned ?? []) as Array<{ student_id: string | null }>).map((r) => r.student_id).filter((x): x is string => !!x))
  );

  const ledIds = ledCohorts.map((c) => c.id);
  const ors = [
    ledIds.length ? `cohort_id.in.(${ledIds.join(',')})` : null,
    assignedUids.length ? `user_id.in.(${assignedUids.join(',')})` : null,
  ].filter(Boolean);
  let students: StudentRow[] = [];
  if (ors.length) {
    const { data } = await supabase.from('college_students').select('id, user_id, cohort_id, status').or(ors.join(','));
    students = (data ?? []) as StudentRow[];
  }
  // Cohorts that hold one of my assigned learners are my cohorts too: fetch
  // their other learners and their names.
  const extraCohortIds = Array.from(
    new Set(students.map((s) => s.cohort_id).filter((c): c is string => !!c && !ledIds.includes(c)))
  );
  let extraCohorts: CohortRow[] = [];
  if (extraCohortIds.length) {
    const [{ data: cs }, { data: st }] = await Promise.all([
      supabase.from('college_cohorts').select('id, name, status').in('id', extraCohortIds),
      supabase.from('college_students').select('id, user_id, cohort_id, status').in('cohort_id', extraCohortIds),
    ]);
    extraCohorts = (cs ?? []) as CohortRow[];
    const seen = new Set(students.map((s) => s.id));
    for (const s of (st ?? []) as StudentRow[]) if (!seen.has(s.id)) students.push(s);
  }
  return { staffId, collegeId, ledCohorts, extraCohorts, assignedUids, students };
}

export function useCollegeMembership(): CollegeMembership {
  const { user } = useAuth();
  const uid = user?.id ?? null;
  const { data, isLoading } = useQuery({
    queryKey: ['college-scope-membership', uid],
    enabled: !!uid,
    staleTime: 60_000,
    queryFn: () => loadMembership(uid as string),
  });

  return useMemo(() => {
    const mine = emptySet();
    const cohorts = emptySet();
    if (!data) {
      return { loading: !!uid && isLoading, staffId: null, collegeId: null, mine, cohorts, hasAny: false, hasActive: false };
    }
    const assigned = new Set(data.assignedUids);
    const ledIds = new Set(data.ledCohorts.map((c) => c.id));
    const allCohorts = [...data.ledCohorts, ...data.extraCohorts];
    const nameOf = new Map(allCohorts.map((c) => [c.id, c.name ?? '']));
    const hasAssignments = data.students.some((s) => s.user_id && assigned.has(s.user_id));

    for (const s of data.students) {
      const isAssigned = !!s.user_id && assigned.has(s.user_id);
      const inLed = !!s.cohort_id && ledIds.has(s.cohort_id);
      // Mine: my assigned learners; a class tutor with none gets their cohorts.
      if (isAssigned || (!hasAssignments && inLed)) {
        mine.studentIds.add(s.id);
        if (s.user_id) mine.userIds.add(s.user_id);
        if (s.cohort_id) {
          mine.cohortIds.add(s.cohort_id);
          const n = nameOf.get(s.cohort_id);
          if (n) mine.cohortNames.add(n);
        }
      }
      cohorts.studentIds.add(s.id);
      if (s.user_id) cohorts.userIds.add(s.user_id);
    }
    for (const c of allCohorts) {
      cohorts.cohortIds.add(c.id);
      if (c.name) cohorts.cohortNames.add(c.name);
    }
    if (!hasAssignments) for (const c of data.ledCohorts) {
      mine.cohortIds.add(c.id);
      if (c.name) mine.cohortNames.add(c.name);
    }
    const active = (v: string | null) => (v ?? '').trim().toLowerCase() === 'active';
    const hasActive =
      data.students.some((s) => mine.studentIds.has(s.id) && active(s.status)) ||
      data.ledCohorts.some((c) => active(c.status));
    return {
      loading: false,
      staffId: data.staffId,
      collegeId: data.collegeId,
      mine,
      cohorts,
      hasAny: cohorts.studentIds.size > 0 || cohorts.cohortIds.size > 0,
      hasActive,
    };
  }, [data, isLoading, uid]);
}

/** Does a row fall inside a scope set? Learner ids decide; a cohort only when the row has no learner. */
export function inScopeSet(
  set: ScopeSet,
  row: { studentId?: string | null; userId?: string | null; cohortId?: string | null; cohortName?: string | null }
) {
  if (row.studentId || row.userId) {
    return (!!row.studentId && set.studentIds.has(row.studentId)) || (!!row.userId && set.userIds.has(row.userId));
  }
  return (!!row.cohortId && set.cohortIds.has(row.cohortId)) || (!!row.cohortName && set.cohortNames.has(row.cohortName));
}

export interface CollegeScope {
  /** What the screens show: the stored choice, or the default, or "college" when I have no learners. */
  level: CollegeScopeLevel;
  setLevel: (v: CollegeScopeLevel) => void;
  /** Membership has answered; render a skeleton until then so the view does not jump. */
  ready: boolean;
  membership: CollegeMembership;
  /** The set for the current level (mine or cohorts); null for the whole college. */
  set: ScopeSet | null;
  /** Is this row in the current view? Always true for the whole college. */
  inScope: (row: Parameters<typeof inScopeSet>[1]) => boolean;
  /** Is this row one of MY learners (the "Yours" badge)? */
  isMine: (row: Parameters<typeof inScopeSet>[1]) => boolean;
}

export function useCollegeScope(): CollegeScope {
  const membership = useCollegeMembership();
  const [chosen, setLevel] = useCollegeScopeChoice();
  const ready = !membership.loading;
  const level: CollegeScopeLevel = !membership.hasAny
    ? 'college'
    : (chosen ?? (membership.hasActive ? 'mine' : 'college'));
  const set = level === 'mine' ? membership.mine : level === 'cohorts' ? membership.cohorts : null;
  return useMemo(
    () => ({
      level,
      setLevel,
      ready,
      membership,
      set,
      inScope: (row) => (set ? inScopeSet(set, row) : true),
      isMine: (row) => inScopeSet(membership.mine, row),
    }),
    [level, setLevel, ready, membership, set]
  );
}
