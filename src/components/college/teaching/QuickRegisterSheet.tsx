import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { FormSheet } from '@/components/forms/FormSheet';
import { supabase } from '@/integrations/supabase/client';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useMyCollegeContext } from '@/hooks/useMyCollegeContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Under18Badge } from '@/components/college/people/Under18Badge';
import { COLLEGE_BTN, COLLEGE_BTN_PRIMARY, chipCn } from '@/components/college/ui/CollegeUi';
import { CreateQuizSheet } from '@/components/college/sheets/CreateQuizSheet';
import {
  cacheRoster,
  cachedRoster,
  dismissRefused,
  flushOutbox,
  getOutboxState,
  outboxKey,
  queueMarks,
  subscribeOutbox,
  type OutboxState,
} from '@/lib/college/registerOutbox';
import {
  ATTENDANCE_CONFLICT,
  REGISTER_SESSIONS,
  SESSION_LABEL,
  currentSession,
  sessionOfTime,
  type RegisterSession,
} from '@/lib/college/attendanceSession';

/* ==========================================================================
   QuickRegisterSheet — a register in two taps (ELE-1887, ELE-1890).

   Tap 1 opens it with everything already chosen: the cohort (the lesson's,
   else the class you teach today, else your first cohort), today's date and
   you as the person taking it. Tap 2 is "Everyone here", then tap only the
   exceptions. Every tap saves straight away, so a locked phone loses nothing,
   and the last change can be undone from the footer.

   Offline (ELE-1887): every tap is written to this device first and sent by
   registerOutbox, so a classroom with no signal still takes a register. A
   mark not yet sent reads "Saved, will sync"; it goes up when
   the signal comes back. The class list is cached per cohort, so a register
   opened with no signal still shows the learners.

   After the register (ELE-1890): taking a lesson's register marks the lesson
   taught, and a database trigger records it per learner for the ones marked
   present or late. Once everyone is marked, the sheet offers to set the
   lesson's quiz for the class.

   Writes an upsert on college_attendance (student_id, date, session),
   recorded_by = the signed-in user. One mark per learner per SESSION
   (Andrew, 7 Oct 2026): the register is for the morning or the afternoon,
   chosen by the chips, defaulting to the lesson's start time (before 12:30 =
   morning) or, with no lesson, the time now.
   ========================================================================== */

type Status = 'Present' | 'Late' | 'Absent' | 'Authorised';

const STATUSES: Array<{ value: Status; label: string; short: string; on: string }> = [
  {
    value: 'Present',
    label: 'Present',
    short: 'P',
    on: 'border-emerald-400 bg-emerald-400 text-black',
  },
  { value: 'Late', label: 'Late', short: 'L', on: 'border-elec-yellow bg-elec-yellow text-black' },
  {
    value: 'Absent',
    label: 'Absent',
    short: 'A',
    on: 'border-orange-400 bg-orange-400 text-black',
  },
  { value: 'Authorised', label: 'Authorised', short: 'Au', on: 'border-white bg-white text-black' },
];

interface Row {
  student_id: string;
  name: string;
  status: Status | null;
  existing_id: string | null;
  notes: string;
  /** The session's mark was taken under another cohort (one mark per learner per session). */
  other_cohort: string | null;
  /** ELE-1911: for the under-18 flag. */
  dob?: string | null;
}

interface UndoStep {
  label: string;
  before: Array<{ student_id: string; status: Status | null; existing_id: string | null }>;
}

const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export function QuickRegisterSheet({
  open,
  onOpenChange,
  cohortId: cohortProp,
  lessonTitle,
  lessonPlanId,
  date: dateProp,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The lesson's cohort. When absent the sheet picks the most likely one. */
  cohortId?: string | null;
  lessonTitle?: string | null;
  /** ELE-1890: the lesson this register is for. Marks carry it, and the lesson is recorded as taught. */
  lessonPlanId?: string | null;
  date?: string | null;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  /** Bumped on every load; a response whose token is stale is dropped. */
  const loadSeq = useRef(0);
  const { cohorts, lessonPlans } = useCollegeSupabase();
  const { staff: me } = useMyCollegeContext();

  const activeCohorts = useMemo(
    () => cohorts.filter((c) => (c.status ?? '').toLowerCase() === 'active'),
    [cohorts]
  );

  /** Lesson's cohort → the class I teach today → my first cohort → first active cohort. */
  const defaultCohort = useMemo(() => {
    if (cohortProp) return cohortProp;
    const today = todayIso();
    const mineToday = lessonPlans.find(
      (lp) =>
        lp.scheduled_date === today &&
        !!lp.cohort_id &&
        !!me?.staff_id &&
        lp.tutor_id === me.staff_id
    );
    if (mineToday?.cohort_id) return mineToday.cohort_id;
    const firstMine = me?.my_cohorts?.find((c) => activeCohorts.some((a) => a.id === c.id));
    if (firstMine) return firstMine.id;
    return activeCohorts[0]?.id ?? '';
  }, [cohortProp, lessonPlans, me, activeCohorts]);

  /** The lesson's half of the day, else the half it is now. */
  const defaultSession = useMemo<RegisterSession>(() => {
    const lp = lessonPlanId ? lessonPlans.find((l) => l.id === lessonPlanId) : null;
    return sessionOfTime(lp?.scheduled_start_time) ?? currentSession();
  }, [lessonPlanId, lessonPlans]);

  const [cohortId, setCohortId] = useState(defaultCohort);
  const [date, setDate] = useState(dateProp ?? todayIso());
  const [session, setSession] = useState<RegisterSession>(defaultSession);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [undo, setUndo] = useState<UndoStep[]>([]);
  const [dirty, setDirty] = useState(false);
  const [noteFor, setNoteFor] = useState<string | null>(null);
  /** False until the open-time choices are seeded, so nothing loads for a stale cohort. */
  const [seeded, setSeeded] = useState(false);
  /** Opened from a lesson: marks carry the lesson until the tutor chooses "Change class". */
  const [linked, setLinked] = useState(!!lessonPlanId);
  /** Marks waiting on this device, and whether we are online (ELE-1887). */
  const [outbox, setOutbox] = useState<OutboxState>(() => getOutboxState());
  /** The class list came from this device's copy because the network failed. */
  const [fromCache, setFromCache] = useState<string | null>(null);
  /** The lesson's quiz, for the after-register offer (ELE-1890). */
  const [quiz, setQuiz] = useState<{
    id: string;
    title: string;
    is_published: boolean;
    cohort_id: string | null;
  } | null>(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const [quizBusy, setQuizBusy] = useState(false);
  const [quizDismissed, setQuizDismissed] = useState(false);
  const [quizSheetOpen, setQuizSheetOpen] = useState(false);

  useEffect(() => subscribeOutbox(setOutbox), []);

  // Re-seed the choices every time the sheet opens.
  useEffect(() => {
    if (!open) {
      setSeeded(false);
      return;
    }
    setCohortId(defaultCohort);
    setDate(dateProp ?? todayIso());
    setSession(defaultSession);
    setLinked(!!lessonPlanId);
    setUndo([]);
    setQuizDismissed(false);
    setSeeded(true);
    // Anything left from an earlier register goes up now.
    void flushOutbox();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // The lesson is not in the college context (e.g. opened from the lesson
  // page before the context loaded): read its start time, so a 10:00 lesson
  // registered at 3pm still defaults to the morning.
  useEffect(() => {
    if (!open || !lessonPlanId || lessonPlans.some((l) => l.id === lessonPlanId)) return;
    let cancelled = false;
    void supabase
      .from('college_lesson_plans')
      .select('scheduled_start_time')
      .eq('id', lessonPlanId)
      .maybeSingle()
      .then(({ data }) => {
        const s = sessionOfTime(
          (data as { scheduled_start_time?: string | null } | null)?.scheduled_start_time
        );
        if (!cancelled && s) setSession(s);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, lessonPlanId]);

  /** The lesson these marks are for, only while the register is still that lesson's class. */
  const activeLesson =
    linked && lessonPlanId && (!cohortProp || cohortId === cohortProp) ? lessonPlanId : null;

  // The lesson's quiz: one set for this class, else a draft that can be set.
  useEffect(() => {
    if (!open || !activeLesson) {
      setQuiz(null);
      setQuizChecked(false);
      return;
    }
    let cancelled = false;
    void supabase
      .from('tutor_quizzes')
      .select('id, title, is_published, cohort_id, published_at, created_at')
      .eq('lesson_plan_id', activeLesson)
      .order('created_at', { ascending: false })
      .limit(10)
      .then(({ data }) => {
        if (cancelled) return;
        const list = (data ?? []) as Array<{
          id: string;
          title: string;
          is_published: boolean | null;
          cohort_id: string | null;
        }>;
        const set = list.find((q) => q.is_published && q.cohort_id === cohortId);
        const draft = list.find(
          (q) => !q.is_published && (!q.cohort_id || q.cohort_id === cohortId)
        );
        const pick = set ?? draft ?? null;
        setQuiz(
          pick
            ? {
                id: pick.id,
                title: pick.title,
                is_published: !!pick.is_published,
                cohort_id: pick.cohort_id,
              }
            : null
        );
        setQuizChecked(true);
      });
    return () => {
      cancelled = true;
    };
  }, [open, activeLesson, cohortId]);

  // A default that arrives after open (context still loading) fills an empty pick.
  useEffect(() => {
    if (open && !cohortId && defaultCohort) setCohortId(defaultCohort);
  }, [open, cohortId, defaultCohort]);

  const load = useCallback(async () => {
    const token = ++loadSeq.current;
    if (!cohortId) {
      setRows([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // getSession reads this device, so it works with no signal.
      const { data: sessionRes } = await supabase.auth.getSession();
      if (token !== loadSeq.current) return;
      setUid(sessionRes?.session?.user?.id ?? null);
      const inactive = new Set(['withdrawn', 'completed', 'archived']);
      let students: Array<{ id: string; name: string | null; status: string | null; date_of_birth?: string | null }> = [];
      let marksData: Array<{
        id: string;
        student_id: string | null;
        status: string | null;
        notes: string | null;
        cohort_id: string | null;
      }> = [];
      let cacheNote: string | null = null;
      const studentsRes = await supabase
        .from('college_students')
        .select('id, name, status, date_of_birth')
        .eq('cohort_id', cohortId)
        .order('name');
      if (token !== loadSeq.current) return;
      if (studentsRes.error) {
        // No signal: use this device's copy of the class list.
        const cached = cachedRoster(cohortId);
        if (!cached) throw studentsRes.error;
        students = cached.students;
        cacheNote = cached.saved_at;
      } else {
        students = (studentsRes.data ?? []) as unknown as typeof students;
        cacheRoster(cohortId, students);
        // One mark per learner per session, whichever cohort it was taken under.
        const ids = students.map((s) => s.id);
        const marksRes = ids.length
          ? await supabase
              .from('college_attendance')
              .select('id, student_id, status, notes, cohort_id')
              .in('student_id', ids)
              .eq('date', date)
              .eq('session', session)
          : { data: [], error: null };
        if (token !== loadSeq.current) return;
        if (marksRes.error) cacheNote = new Date().toISOString();
        else marksData = (marksRes.data ?? []) as typeof marksData;
      }
      students = students.filter((s) => !inactive.has((s.status ?? '').toLowerCase()));
      setFromCache(cacheNote);
      const marks = new Map(
        marksData.filter((m) => m.student_id).map((m) => [m.student_id as string, m])
      );
      // Marks still waiting on this device win over what the server has.
      const waiting = new Map(getOutboxState().pending.map((e) => [e.key, e]));
      setRows(
        students.map((s) => {
          const m = marks.get(s.id);
          const w = waiting.get(outboxKey(s.id, date, session));
          return {
            student_id: s.id,
            name: s.name ?? 'Learner',
            dob: s.date_of_birth ?? null,
            status: w ? (w.status as Status | null) : ((m?.status as Status | undefined) ?? null),
            existing_id: m?.id ?? null,
            notes: w ? (w.notes ?? '') : (m?.notes ?? ''),
            other_cohort:
              !w && m?.cohort_id && m.cohort_id !== cohortId ? (m.cohort_id as string) : null,
          };
        })
      );
    } catch (e) {
      if (token !== loadSeq.current) return;
      setError(
        typeof navigator !== 'undefined' && navigator.onLine === false
          ? 'No signal, and this class has not been opened on this device before. Open it once with a signal and it will work offline after that.'
          : (e as Error).message || 'Could not load the register'
      );
      setRows([]);
    } finally {
      if (token === loadSeq.current) setLoading(false);
    }
  }, [cohortId, date, session]);

  useEffect(() => {
    if (open && seeded) {
      setUndo([]);
      void load();
    }
  }, [open, seeded, load]);

  /**
   * Save a set of marks; null removes the mark. Written to this device first
   * (registerOutbox) and sent straight after, so it cannot fail and lose a
   * tap: with no signal the mark waits and syncs later.
   */
  const apply = (
    changes: Array<{ student_id: string; status: Status | null }>,
    label: string,
    recordUndo = true
  ): boolean => {
    const before = changes.map((c) => {
      const r = rows.find((x) => x.student_id === c.student_id)!;
      return { student_id: r.student_id, status: r.status, existing_id: r.existing_id };
    });
    queueMarks(
      changes.map((c) => ({
        student_id: c.student_id,
        cohort_id: cohortId,
        date,
        session,
        status: c.status,
        notes: c.status
          ? rows.find((r) => r.student_id === c.student_id)?.notes.trim() || null
          : null,
        lesson_plan_id: activeLesson,
        recorded_by: uid,
      }))
    );
    setRows((rs) =>
      rs.map((r) => {
        const c = changes.find((x) => x.student_id === r.student_id);
        return c ? { ...r, status: c.status, other_cohort: c.status ? null : r.other_cohort } : r;
      })
    );
    if (recordUndo) setUndo((u) => [...u.slice(-19), { label, before }]);
    setDirty(true);
    return true;
  };

  const mark = (r: Row, status: Status) => {
    if (r.status === status) return;
    void apply(
      [{ student_id: r.student_id, status }],
      `${r.name.split(' ')[0]} marked ${status.toLowerCase()}`
    );
  };

  /** Notes save on blur, with the learner's mark for the session (through the outbox). */
  const saveNote = (r: Row) => {
    if (!r.status) return;
    queueMarks([
      {
        student_id: r.student_id,
        cohort_id: cohortId,
        date,
        session,
        status: r.status,
        notes: r.notes.trim() || null,
        lesson_plan_id: activeLesson,
        recorded_by: uid,
      },
    ]);
    setDirty(true);
  };

  const everyoneHere = () => {
    const unmarked = rows.filter((r) => r.status === null);
    if (unmarked.length === 0) return;
    void apply(
      unmarked.map((r) => ({ student_id: r.student_id, status: 'Present' as Status })),
      `${unmarked.length} marked present`
    );
  };

  const undoLast = () => {
    const step = undo[undo.length - 1];
    if (!step) return;
    if (
      apply(
        step.before.map((b) => ({ student_id: b.student_id, status: b.status })),
        'undo',
        false
      )
    ) {
      setUndo((u) => (u[u.length - 1] === step ? u.slice(0, -1) : u));
    }
  };

  const close = (o: boolean) => {
    if (!o && dirty) {
      queryClient.invalidateQueries({ queryKey: ['college-attendance'] });
      queryClient.invalidateQueries({ queryKey: ['college-lesson-plans'] });
      setDirty(false);
    }
    onOpenChange(o);
  };

  /** Publish the lesson's draft quiz to this class (ELE-1890). */
  const setLessonQuiz = async () => {
    if (!quiz || quiz.is_published || quizBusy) return;
    setQuizBusy(true);
    const { error: e } = await supabase
      .from('tutor_quizzes')
      .update({
        is_published: true,
        published_at: new Date().toISOString(),
        ...(quiz.cohort_id ? {} : { cohort_id: cohortId }),
      })
      .eq('id', quiz.id);
    setQuizBusy(false);
    if (e) {
      toast({ title: 'Could not set the quiz', description: e.message, variant: 'destructive' });
      return;
    }
    setQuiz({ ...quiz, is_published: true, cohort_id: quiz.cohort_id ?? cohortId });
    toast({
      title: 'Quiz set',
      description: `${quiz.title} is now with ${cohortName ?? 'the class'}.`,
    });
  };

  /** Marks for this register still waiting on this device. */
  const waitingHere = useMemo(() => {
    const keys = new Set<string>();
    for (const e of outbox.pending)
      if (e.date === date && e.session === session) keys.add(e.student_id);
    return keys;
  }, [outbox.pending, date, session]);
  const refusedHere = outbox.refused.filter((e) => e.date === date && e.session === session);

  const counts = useMemo(() => {
    const c = { Present: 0, Late: 0, Absent: 0, Authorised: 0, none: 0 };
    for (const r of rows) {
      if (r.status) c[r.status] += 1;
      else c.none += 1;
    }
    return c;
  }, [rows]);

  const cohortName = cohorts.find((c) => c.id === cohortId)?.name;
  const dateLabel = new Date(`${date}T12:00:00`).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  const lastUndo = undo[undo.length - 1];
  /** After "Change class" the sheet is a plain cohort register, not the lesson's. */
  const showLesson = !lessonPlanId || !!activeLesson;

  return (
    <>
      <FormSheet
        open={open}
        onOpenChange={close}
        width="wide"
        eyebrow="Register"
        title={(showLesson && lessonTitle) || cohortName || 'Take a register'}
        description={`${cohortName && showLesson && lessonTitle ? `${cohortName} · ` : ''}${dateLabel}, ${SESSION_LABEL[session].toLowerCase()} · taken by ${me?.name ?? 'you'}. Every tap saves.`}
        subheader={
          <div className="space-y-3 py-3">
            {(waitingHere.size > 0 || fromCache) && (
              <div
                role="status"
                className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-2xl border border-elec-yellow/40 px-4 py-2.5 text-[13px] text-white"
              >
                <span className="min-w-0 flex-1">
                  {waitingHere.size > 0 ? (
                    outbox.online ? (
                      outbox.pending.some((e) => e.attempts > 0) ? (
                        <>
                          Still sending {waitingHere.size}{' '}
                          {waitingHere.size === 1 ? 'mark' : 'marks'}. They are saved on this device
                          and will keep trying.
                        </>
                      ) : (
                        <>
                          Sending {waitingHere.size} {waitingHere.size === 1 ? 'mark' : 'marks'}…
                        </>
                      )
                    ) : (
                      <>
                        <span className="font-semibold">No signal.</span> {waitingHere.size}{' '}
                        {waitingHere.size === 1 ? 'mark is' : 'marks are'} saved on this device and
                        will sync when the signal comes back. Carry on marking.
                      </>
                    )
                  ) : null}
                  {fromCache && (
                    <span className="block">
                      Class list from this device, saved{' '}
                      {new Date(fromCache).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                      })}
                      .
                    </span>
                  )}
                </span>
                {waitingHere.size > 0 && outbox.online && (
                  <button
                    type="button"
                    onClick={() => void flushOutbox()}
                    disabled={outbox.syncing}
                    className="-my-2 h-11 font-semibold text-elec-yellow touch-manipulation disabled:opacity-60"
                  >
                    {outbox.syncing ? 'Sending…' : 'Try now'}
                  </button>
                )}
              </div>
            )}
            {refusedHere.length > 0 && (
              <div
                role="alert"
                className="flex flex-wrap items-center gap-x-4 rounded-2xl border border-orange-400/50 px-4 py-2.5 text-[13px] text-white"
              >
                <span className="min-w-0 flex-1">
                  {refusedHere.length} {refusedHere.length === 1 ? 'mark was' : 'marks were'} not
                  accepted ({refusedHere[refusedHere.length - 1].reason}). Mark{' '}
                  {refusedHere
                    .map((e) => rows.find((r) => r.student_id === e.student_id)?.name.split(' ')[0])
                    .filter(Boolean)
                    .join(', ') || 'them'}{' '}
                  again.
                </span>
                <button
                  type="button"
                  onClick={() => {
                    dismissRefused();
                    void load();
                  }}
                  className="-my-2 h-11 font-semibold text-elec-yellow touch-manipulation"
                >
                  Dismiss
                </button>
              </div>
            )}
            {activeLesson ? (
              <p className="flex flex-wrap items-center gap-x-3 text-[12.5px] text-white">
                <span>
                  Register for this lesson{cohortName ? ` with ${cohortName}` : ''}. Taking it marks
                  the lesson taught.
                </span>
                {activeCohorts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setLinked(false)}
                    className="-my-2 h-11 font-semibold text-elec-yellow touch-manipulation"
                  >
                    Change class
                  </button>
                )}
              </p>
            ) : (
              activeCohorts.length > 1 && (
                <div className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
                  {activeCohorts.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className={chipCn(c.id === cohortId)}
                      onClick={() => setCohortId(c.id)}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              )
            )}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div role="radiogroup" aria-label="Session" className="flex gap-2">
                {REGISTER_SESSIONS.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    role="radio"
                    aria-checked={session === s.value}
                    className={chipCn(session === s.value)}
                    onClick={() => setSession(s.value)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 text-[12.5px] font-medium text-white">
                Date
                <input
                  type="date"
                  value={date}
                  onChange={(e) => e.target.value && setDate(e.target.value)}
                  className="h-11 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-[14px] text-white [color-scheme:dark] focus:border-elec-yellow focus:outline-none"
                />
              </label>
              <p className="text-[12.5px] text-white tabular-nums">
                <span className="font-semibold">{counts.Present}</span> present ·{' '}
                <span className="font-semibold">{counts.Late}</span> late ·{' '}
                <span className={cn('font-semibold', counts.Absent > 0 && 'text-orange-400')}>
                  {counts.Absent}
                </span>{' '}
                absent · <span className="font-semibold">{counts.Authorised}</span> authorised
                {counts.none > 0 && (
                  <>
                    {' '}
                    · <span className="font-semibold">{counts.none}</span> not marked
                  </>
                )}
              </p>
            </div>
          </div>
        }
        footer={
          <div className="flex w-full items-center gap-2">
            <button
              type="button"
              onClick={undoLast}
              disabled={!lastUndo}
              className={cn(COLLEGE_BTN, 'min-w-0 flex-1 justify-start truncate')}
              aria-label={lastUndo ? `Undo: ${lastUndo.label}` : 'Nothing to undo'}
            >
              <span className="truncate">
                {lastUndo ? `Undo: ${lastUndo.label}` : 'Nothing to undo'}
              </span>
            </button>
            {counts.none > 0 ? (
              <button
                type="button"
                onClick={everyoneHere}
                className={cn(COLLEGE_BTN_PRIMARY, 'shrink-0')}
              >
                Everyone else here
              </button>
            ) : (
              <button
                type="button"
                onClick={() => close(false)}
                className={cn(COLLEGE_BTN_PRIMARY, 'shrink-0')}
              >
                Done
              </button>
            )}
          </div>
        }
      >
        {activeLesson &&
          rows.length > 0 &&
          counts.none === 0 &&
          quizChecked &&
          !quizDismissed &&
          outbox.online && (
            <div className="mb-3 flex flex-col gap-3 rounded-2xl border border-white/[0.14] bg-white/[0.04] px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-white">
                  {quiz?.is_published ? 'Quiz set for this lesson' : "Set the lesson's quiz?"}
                </p>
                <p className="text-[12.5px] text-white">
                  {quiz?.is_published
                    ? `${quiz.title} is with ${cohortName ?? 'the class'}.`
                    : quiz
                      ? `${quiz.title} is ready as a draft. Set it for ${cohortName ?? 'the class'} and each learner gets it.`
                      : `Everyone is marked. Make a short quiz on this lesson and send it to ${cohortName ?? 'the class'}.`}
                </p>
              </div>
              {!quiz?.is_published && (
                <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuizDismissed(true)}
                    className={COLLEGE_BTN}
                  >
                    Not now
                  </button>
                  {quiz ? (
                    <button
                      type="button"
                      onClick={() => void setLessonQuiz()}
                      disabled={quizBusy}
                      className={COLLEGE_BTN_PRIMARY}
                    >
                      {quizBusy ? 'Setting…' : 'Set the quiz'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setQuizSheetOpen(true)}
                      className={COLLEGE_BTN_PRIMARY}
                    >
                      Make the quiz
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        {error && (
          <p className="rounded-2xl border border-orange-400/40 px-4 py-3 text-[13px] text-white">
            {error}
          </p>
        )}
        {!cohortId && !loading && (
          <p className="py-8 text-[14px] text-white">Pick a cohort above to take its register.</p>
        )}
        {loading && <p className="py-8 text-[13.5px] text-white">Loading the register…</p>}
        {!loading && cohortId && rows.length === 0 && !error && (
          <p className="py-8 text-[14px] text-white">
            No active learners in this cohort. Add learners to it from Cohorts, or pick another
            cohort.
          </p>
        )}
        {!loading && rows.length > 0 && (
          <ul className="grid grid-cols-1 gap-x-8 lg:grid-cols-2">
            {rows.map((r) => (
              <li
                key={r.student_id}
                className="flex items-start gap-3 border-b border-white/[0.06] py-2.5"
              >
                <span className="min-w-0 flex-1">
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="truncate text-[14.5px] font-semibold text-white">{r.name}</span>
                    <Under18Badge dob={r.dob} />
                  </span>
                  <span className="flex flex-wrap items-center gap-x-2">
                    <span
                      className={cn(
                        'text-[12px] text-white',
                        r.status === 'Absent' && 'text-orange-400'
                      )}
                    >
                      {r.status ?? 'Not marked'}
                      {r.other_cohort && r.status
                        ? ` (with ${cohorts.find((c) => c.id === r.other_cohort)?.name ?? 'another class'})`
                        : ''}
                      {waitingHere.has(r.student_id) && (
                        <span className="text-elec-yellow">
                          {' '}
                          · {outbox.online ? 'Saving…' : 'Saved, will sync'}
                        </span>
                      )}
                    </span>
                    {r.status && (
                      <button
                        type="button"
                        onClick={() => setNoteFor(noteFor === r.student_id ? null : r.student_id)}
                        className="-my-2 h-9 px-1 text-[12px] font-semibold text-elec-yellow touch-manipulation"
                      >
                        {r.notes ? 'Edit note' : 'Add note'}
                      </button>
                    )}
                  </span>
                  {noteFor === r.student_id && r.status ? (
                    <input
                      type="text"
                      autoFocus
                      value={r.notes}
                      onChange={(e) =>
                        setRows((rs) =>
                          rs.map((x) =>
                            x.student_id === r.student_id ? { ...x, notes: e.target.value } : x
                          )
                        )
                      }
                      onBlur={() => saveNote(r)}
                      placeholder="e.g. arrived 10 minutes late"
                      aria-label={`Note for ${r.name}`}
                      className="mt-1 h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-[14px] text-white placeholder:text-white/25 caret-elec-yellow focus:border-elec-yellow focus:outline-none"
                    />
                  ) : r.notes ? (
                    <span className="block truncate text-[12px] text-white">Note: {r.notes}</span>
                  ) : null}
                </span>
                <span className="grid shrink-0 grid-cols-4 gap-1.5">
                  {STATUSES.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => mark(r, s.value)}
                      aria-pressed={r.status === s.value}
                      aria-label={`${r.name}: ${s.label}`}
                      className={cn(
                        'h-11 min-w-[44px] rounded-xl border px-2 text-[12.5px] font-semibold transition-colors touch-manipulation sm:min-w-[72px]',
                        r.status === s.value
                          ? s.on
                          : 'border-white/[0.12] text-white hover:border-white/[0.3]'
                      )}
                    >
                      <span className="sm:hidden">{s.short}</span>
                      <span className="hidden sm:inline">{s.label}</span>
                    </button>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        )}
      </FormSheet>
      {activeLesson && (
        <CreateQuizSheet
          open={quizSheetOpen}
          onOpenChange={setQuizSheetOpen}
          cohortId={cohortId}
          lessonPlanId={activeLesson}
          initialTopic={lessonTitle ?? undefined}
          onSaved={(id) => {
            setQuiz({ id, title: 'The quiz', is_published: true, cohort_id: cohortId });
            void supabase
              .from('tutor_quizzes')
              .select('title')
              .eq('id', id)
              .maybeSingle()
              .then(({ data }) => {
                if (data?.title)
                  setQuiz((q) => (q && q.id === id ? { ...q, title: data.title as string } : q));
              });
          }}
        />
      )}
    </>
  );
}
