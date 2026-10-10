import { useMemo, useState, type ReactNode } from 'react';
import { duplicateLessonPlan } from '@/lib/lessons/duplicateLessonPlan';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import {
  CalendarPlus,
  CheckCheck,
  ChevronRight,
  MonitorPlay,
  MoreHorizontal,
  Presentation,
  type LucideIcon,
} from 'lucide-react';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useToast } from '@/hooks/use-toast';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { itemVariants } from '@/components/college/primitives';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import { TeachMenu, TeachingScreen } from '@/components/college/teaching/TeachingKit';
import { QuickRegisterSheet } from '@/components/college/teaching/QuickRegisterSheet';
import { StartLessonPlanSheet } from '@/components/college/sheets/StartLessonPlanSheet';
import { ScheduleLessonDialog } from '@/components/college/dialogs/ScheduleLessonDialog';
import { useMyCollegeContext } from '@/hooks/useMyCollegeContext';
import type { CollegeLessonPlan } from '@/services/college/collegeLessonPlanService';
import { cn } from '@/lib/utils';

/**
 * Lesson plans — every plan in the college, grouped by when it is taught,
 * with the status vocabulary the database actually uses.
 *
 * `college_lesson_plans.status` is CHECK-constrained to lowercase
 * draft / ready / published / delivered / archived. This section used to
 * filter on 'Draft' / 'Published' / 'Approved' / 'Delivered' — none of which
 * ever matched a live row, so every tab but "All" counted 0 — and its
 * "Mark as delivered" wrote 'Delivered', which the constraint rejects.
 * Everything here now compares case-insensitively and writes the lowercase
 * value. ('Approved' / 'Published' are still READ as ready, because older
 * code wrote them before the constraint landed.)
 *
 * `scheduled_date` is a DATE column. Comparing it as a timestamp against
 * "now" made this morning's lesson read as overdue by lunchtime; everything
 * here compares calendar days.
 *
 * Redesign 7 Oct 2026, in the College Hub home's layout (Andrew: "the same
 * design as the dashboard"): a greeting-style header whose sentence carries
 * the counts, a strip of action tiles, then two columns — the next lesson to
 * teach on the left, the plans as cards on the right. "New plan" opens
 * StartLessonPlanSheet (cohort, unit, criteria in one sheet) instead of the
 * qualifications catalogue. A past plan nobody closed off says exactly that,
 * "Not marked delivered", with the action on its card.
 */

type LessonRow = CollegeLessonPlan & { scheduled_start_time?: string | null };

type LessonState = 'draft' | 'ready' | 'delivered' | 'archived';
/** What a card shows: the stored state, plus "past and never closed off". */
type DisplayStatus = LessonState | 'unmarked';
type Filter = DisplayStatus | 'all' | 'unscheduled';

const STATUS_LABEL: Record<DisplayStatus, string> = {
  draft: 'Draft',
  ready: 'Ready to teach',
  delivered: 'Delivered',
  archived: 'Archived',
  unmarked: 'Not marked delivered',
};

function lessonState(status: string | null): LessonState {
  const s = (status ?? 'draft').trim().toLowerCase();
  if (s === 'ready' || s === 'published' || s === 'approved') return 'ready';
  if (s === 'delivered') return 'delivered';
  if (s === 'archived') return 'archived';
  return 'draft';
}

interface ParsedObjective {
  text: string;
  acCodes: string[];
}

/**
 * Parse the `objectives` column on college_lesson_plans. The AI generator
 * writes a JSON array of { text, ac_codes[] } objects; legacy seed rows
 * contain plain strings split by newlines or commas. Handle both.
 */
function parseObjectives(objectives: string | null): ParsedObjective[] {
  if (!objectives) return [];
  const trimmed = objectives.trim();

  // Try JSON first
  if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed
          .map((o: unknown): ParsedObjective | null => {
            if (typeof o === 'string') return { text: o, acCodes: [] };
            if (o && typeof o === 'object') {
              const obj = o as { text?: unknown; ac_codes?: unknown };
              const text = typeof obj.text === 'string' ? obj.text : null;
              const acCodes = Array.isArray(obj.ac_codes)
                ? (obj.ac_codes as unknown[]).filter((v): v is string => typeof v === 'string')
                : [];
              return text ? { text, acCodes } : null;
            }
            return null;
          })
          .filter((o): o is ParsedObjective => o !== null);
      }
    } catch {
      /* fall through to legacy parsing */
    }
  }

  // Legacy: newline-separated
  const byNewline = trimmed
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  if (byNewline.length > 1) return byNewline.map((t) => ({ text: t, acCodes: [] }));

  // Legacy: comma-separated
  return trimmed
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((t) => ({ text: t, acCodes: [] }));
}

/** Local calendar day as YYYY-MM-DD — the shape `scheduled_date` arrives in. */
function localIso(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function fmtDay(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

function fmtMinutes(min: number | null | undefined): string | null {
  if (!min || min <= 0) return null;
  if (min < 60 || min % 30 !== 0) return `${Math.round(min)} min`;
  const h = min / 60;
  return Number.isInteger(h) ? `${h} hours`.replace(/^1 hours$/, '1 hour') : `${h} hours`;
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/* ── Surfaces (the landing page's card language, per Andrew 7 Oct) ───── */

/** A plan card: the landing HubCard surface with its thin top line. */
const CARD =
  'group relative flex h-full flex-col overflow-hidden card-surface-interactive rounded-2xl !border-white/[0.08] transition-colors hover:!border-white/[0.16] focus-within:!border-white/[0.16]';
/** The landing HubCard's top line, on hover and focus only: at rest it reads muddy on this ground. */
const TOP_LINE =
  'pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-orange-400 opacity-0 transition-opacity duration-200 group-hover:opacity-80 group-focus-within:opacity-80';
const BTN_PRIMARY =
  'inline-flex h-11 items-center justify-center rounded-xl bg-elec-yellow px-5 text-[13.5px] font-bold text-black transition-transform touch-manipulation active:scale-[0.98] disabled:opacity-60';
const BTN =
  'inline-flex h-11 items-center justify-center rounded-xl border border-white/[0.18] px-4 text-[13px] font-semibold text-white transition-colors touch-manipulation hover:border-white/[0.4] active:scale-[0.98] disabled:opacity-60';

const SEARCH =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white placeholder:opacity-40 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus:outline-none touch-manipulation';
const SELECT =
  'input-underline h-11 w-full appearance-none rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';

const HELP: PageHelpContent = {
  id: 'college-lesson-plans',
  title: 'Lesson plans',
  what: 'Every lesson plan you and the college have written, with when it is taught and whether it is ready.',
  steps: [
    {
      title: 'Start a plan',
      body: 'New plan asks who it is for and which unit, then drafts the plan from the unit assessment criteria.',
    },
    {
      title: 'Finish and mark ready',
      body: 'Open a draft, check the objectives, timings and activities, then mark it ready to teach. Build the slides from the same screen.',
    },
    {
      title: 'Teach it',
      body: 'Next to teach shows the next lesson in the timetable. Deliver opens the presenter view. Mark it delivered afterwards.',
    },
  ],
  notes: [
    {
      title: 'Mine and Everyone',
      body: 'The list opens on your own plans. Tap Everyone to see the whole college.',
    },
    {
      title: 'Not marked delivered',
      body: 'The lesson date has passed but nobody marked it delivered. Taking its register on or after the lesson date marks it delivered. Otherwise tap Mark delivered on the card, or open it and re-date it.',
    },
  ],
};

const FILTER_ORDER: Array<DisplayStatus | 'unscheduled'> = [
  'draft',
  'ready',
  'unmarked',
  'unscheduled',
  'delivered',
  'archived',
];
const FILTER_LABEL: Record<DisplayStatus | 'unscheduled', string> = {
  draft: 'Drafts',
  ready: 'Ready to teach',
  unmarked: 'Not marked delivered',
  unscheduled: 'Not scheduled',
  delivered: 'Delivered',
  archived: 'Archived',
};

const DELIVERED_PREVIEW = 4;

export function LessonPlansSection() {
  const { lessonPlans, cohorts, staff, updateLessonPlan } = useCollegeSupabase();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [filterCohort, setFilterCohort] = useState<string>('all');
  const { staff: me } = useMyCollegeContext();
  const myStaffId = me?.staff_id ?? null;
  const [scopeChoice, setScopeChoice] = useState<'mine' | 'all' | null>(null);
  const [register, setRegister] = useState<{
    open: boolean;
    cohortId?: string | null;
    title?: string | null;
    date?: string | null;
    lessonId?: string | null;
  }>({ open: false });
  const [startOpen, setStartOpen] = useState(false);
  const [showAllDelivered, setShowAllDelivered] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<LessonRow | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toSchedule, setToSchedule] = useState<LessonRow | null>(null);

  // When each lesson was last taught (its register taken). Keyed under
  // 'college-lesson-plans' so closing the register sheet refreshes it.
  const { data: taughtOn } = useQuery({
    queryKey: ['college-lesson-plans', 'deliveries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('college_lesson_deliveries' as never)
        .select('lesson_plan_id, delivered_on')
        .order('delivered_on', { ascending: false });
      if (error) throw error;
      const map = new Map<string, string>();
      for (const d of (data ?? []) as Array<{ lesson_plan_id: string; delivered_on: string }>) {
        if (!map.has(d.lesson_plan_id)) map.set(d.lesson_plan_id, d.delivered_on);
      }
      return map;
    },
    staleTime: 60_000,
  });

  const todayIso = localIso(new Date());
  const weekAheadIso = useMemo(() => {
    const d = new Date();
    // Next 7 days = today and the six days after it.
    d.setDate(d.getDate() + 6);
    return localIso(d);
  }, []);

  const allPlans = lessonPlans as LessonRow[];
  const hasMine = !!myStaffId && allPlans.some((l) => l.tutor_id === myStaffId);
  // Mine first (ELE-1886): open on my own plans when I have any.
  const scope = scopeChoice ?? (hasMine ? 'mine' : 'all');
  const plans = useMemo(
    () =>
      scope === 'mine' && myStaffId ? allPlans.filter((l) => l.tutor_id === myStaffId) : allPlans,
    [allPlans, scope, myStaffId]
  );

  /** A plan dated before today that was never marked delivered. */
  const displayStatus = (l: LessonRow): DisplayStatus => {
    const state = lessonState(l.status);
    if (state === 'delivered' || state === 'archived') return state;
    if (l.scheduled_date && l.scheduled_date < todayIso) return 'unmarked';
    return state;
  };
  const isOpen = (l: LessonRow) => {
    const s = displayStatus(l);
    return s === 'draft' || s === 'ready';
  };

  const counts = useMemo(() => {
    const c: Record<DisplayStatus | 'unscheduled', number> = {
      draft: 0,
      ready: 0,
      delivered: 0,
      archived: 0,
      unmarked: 0,
      unscheduled: 0,
    };
    for (const l of plans) {
      c[displayStatus(l)] += 1;
      if (!l.scheduled_date && isOpen(l)) c.unscheduled += 1;
    }
    return c;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plans, todayIso]);

  const isThisWeek = (l: LessonRow) =>
    !!l.scheduled_date && l.scheduled_date >= todayIso && l.scheduled_date <= weekAheadIso;
  const upcomingCount = plans.filter((l) => isThisWeek(l) && isOpen(l)).length;

  const byDateAsc = (a: LessonRow, b: LessonRow) => {
    if (!a.scheduled_date) return 1;
    if (!b.scheduled_date) return -1;
    return (
      a.scheduled_date.localeCompare(b.scheduled_date) ||
      (a.scheduled_start_time ?? '').localeCompare(b.scheduled_start_time ?? '')
    );
  };
  const byDateDesc = (a: LessonRow, b: LessonRow) => byDateAsc(b, a);

  /** The next open lesson in the timetable, today or later. */
  const next = useMemo(
    () =>
      plans
        .filter((l) => isOpen(l) && !!l.scheduled_date && l.scheduled_date >= todayIso)
        .sort(byDateAsc)[0] ?? null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [plans, todayIso]
  );
  const nextReady = useMemo(
    () =>
      plans
        .filter(
          (l) => displayStatus(l) === 'ready' && !!l.scheduled_date && l.scheduled_date >= todayIso
        )
        .sort(byDateAsc)[0] ?? null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [plans, todayIso]
  );

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return plans.filter((lesson) => {
      if (query) {
        const objectivesText = parseObjectives(lesson.objectives)
          .map((o) => o.text)
          .join(' ');
        if (
          !lesson.title.toLowerCase().includes(query) &&
          !objectivesText.toLowerCase().includes(query)
        )
          return false;
      }
      if (filter === 'unscheduled') {
        if (lesson.scheduled_date || !isOpen(lesson)) return false;
      } else if (filter !== 'all' && displayStatus(lesson) !== filter) return false;
      if (filterCohort !== 'all' && lesson.cohort_id !== filterCohort) return false;
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plans, searchQuery, filter, filterCohort, todayIso]);

  /*
   * Unfiltered, the list reads in the order a tutor works: what needs
   * closing off, this week, later, not yet dated, then what is done (most
   * recent first, the first few only). Any filter or search flattens it.
   */
  const grouped = filter === 'all' && !searchQuery.trim();
  const groups = useMemo(() => {
    const unmarked: LessonRow[] = [];
    const week: LessonRow[] = [];
    const later: LessonRow[] = [];
    const unscheduled: LessonRow[] = [];
    const done: LessonRow[] = [];
    for (const l of filtered) {
      const s = displayStatus(l);
      if (s === 'delivered' || s === 'archived') done.push(l);
      else if (s === 'unmarked') unmarked.push(l);
      else if (!l.scheduled_date) unscheduled.push(l);
      else if (isThisWeek(l)) week.push(l);
      else later.push(l);
    }
    return [
      {
        id: 'unmarked',
        title: 'Not marked delivered',
        sub: 'The date has passed. Mark each one delivered, or open it and re-date it.',
        rows: unmarked.sort(byDateDesc),
      },
      {
        id: 'week',
        title: 'This week',
        sub: 'Today and the next six days.',
        rows: week.sort(byDateAsc),
      },
      { id: 'later', title: 'Later', sub: null, rows: later.sort(byDateAsc) },
      {
        id: 'unscheduled',
        title: 'Not scheduled',
        sub: 'Give each one a cohort, date and room.',
        rows: unscheduled,
      },
      {
        id: 'delivered',
        title: 'Delivered',
        sub: 'Most recent first.',
        rows: done.sort(byDateDesc),
      },
    ].filter((g) => g.rows.length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, todayIso, weekAheadIso]);

  const flat = useMemo(() => {
    const rank = (l: LessonRow) => (displayStatus(l) === 'unmarked' ? 0 : 1);
    return [...filtered].sort((a, b) => rank(a) - rank(b) || byDateAsc(a, b));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, todayIso]);

  const getCohortName = (cohortId: string | null) => {
    if (!cohortId) return null;
    return cohorts.find((c) => c.id === cohortId)?.name || 'Cohort missing';
  };
  // college_lesson_plans.tutor_id → college_staff.id (the college row, not the
  // auth uid) — checked against the FK.
  const getTutorName = (tutorId: string | null) => {
    if (!tutorId) return null;
    return staff.find((s) => s.id === tutorId)?.name || null;
  };

  const activeCohorts = cohorts.filter((c) => (c.status ?? '').toLowerCase() === 'active');

  /* ── Actions ─────────────────────────────────────────────────────── */

  const setStatus = async (lesson: LessonRow, status: 'ready' | 'delivered' | 'draft') => {
    setBusyId(lesson.id);
    try {
      // Lowercase — the DB CHECK constraint rejects 'Delivered' / 'Approved'.
      await updateLessonPlan(lesson.id, { status });
      toast({
        title:
          status === 'delivered'
            ? 'Marked as delivered'
            : status === 'ready'
              ? 'Marked ready to teach'
              : 'Back in drafts',
        description: lesson.title,
      });
    } catch (e) {
      toast({
        title: 'Could not update',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setBusyId(null);
    }
  };

  const duplicate = async (lesson: LessonRow) => {
    // One copy path everywhere (duplicateLessonPlan): criteria mappings and
    // regulation references come with it, the copy is the caller's own draft
    // with no date and no slide deck. Opens the copy.
    try {
      const newId = await duplicateLessonPlan(lesson.id, {
        title: `${lesson.title} (copy)`,
        scheduled_date: null,
        scheduled_start_time: null,
        scheduled_room: null,
      });
      await queryClient.invalidateQueries({ queryKey: ['college-lesson-plans'] });
      toast({
        title: 'Plan duplicated',
        description: 'Opening the copy. It is a draft with no date yet.',
      });
      navigate(`/college/lessons/${newId}`);
    } catch (e) {
      toast({
        title: 'Duplicate failed',
        description: (e as Error).message,
        variant: 'destructive',
      });
    }
  };

  // Same order as the plan page: children first in case cascade isn't set.
  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await supabase.from('lesson_plan_ac_mapping').delete().eq('lesson_plan_id', toDelete.id);
      await supabase.from('lesson_regulation_refs').delete().eq('lesson_plan_id', toDelete.id);
      const { error } = await supabase.from('college_lesson_plans').delete().eq('id', toDelete.id);
      if (error) throw error;
      await queryClient.invalidateQueries({ queryKey: ['college-lesson-plans'] });
      toast({ title: 'Plan deleted', description: toDelete.title });
      setToDelete(null);
    } catch (e) {
      toast({ title: 'Delete failed', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setDeleting(false);
    }
  };

  const openRegister = (lesson: LessonRow) =>
    setRegister({
      open: true,
      cohortId: lesson.cohort_id,
      title: lesson.title,
      lessonId: lesson.id,
      date:
        lesson.scheduled_date && lesson.scheduled_date <= todayIso
          ? lesson.scheduled_date
          : todayIso,
    });

  const pickFilter = (f: Filter) => {
    setFilter(f);
    // Bring the list into view on a phone, where it sits under the hero.
    requestAnimationFrame(() =>
      document
        .getElementById('lesson-plan-list')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );
  };

  /* ── Header sentence ─────────────────────────────────────────────── */

  const summary = (() => {
    if (plans.length === 0) return 'Write a plan, mark it ready, teach it, then mark it delivered.';
    const bits = [
      `${counts.ready} ready to teach`,
      counts.draft === 0 ? 'no drafts' : plural(counts.draft, 'draft', 'drafts'),
    ];
    if (counts.unmarked > 0)
      bits.push(
        `${counts.unmarked} past ${counts.unmarked === 1 ? 'its date' : 'their dates'} and not marked delivered`
      );
    const first =
      bits.length === 2
        ? `${bits[0]} and ${bits[1]}`
        : `${bits.slice(0, -1).join(', ')} and ${bits[bits.length - 1]}`;
    return `${first.charAt(0).toUpperCase()}${first.slice(1)}.`;
  })();
  const weekLine =
    plans.length === 0
      ? null
      : upcomingCount === 0
        ? 'Nothing scheduled in the next 7 days.'
        : `${plural(upcomingCount, 'lesson', 'lessons')} in the next 7 days.`;

  /* ── Action tiles ────────────────────────────────────────────────── */

  const tiles: Array<{
    key: string;
    label: string;
    hint: string;
    Icon: LucideIcon;
    onClick: () => void;
    disabled?: boolean;
  }> = [
    {
      key: 'teach',
      label: 'Teach next',
      hint: nextReady
        ? `${nextReady.scheduled_date === todayIso ? 'Today' : fmtDay(nextReady.scheduled_date as string)}: ${nextReady.title}`
        : 'Nothing ready yet',
      Icon: MonitorPlay,
      onClick: () => nextReady && navigate(`/college/lessons/${nextReady.id}/deliver`),
      disabled: !nextReady,
    },
    {
      key: 'slides',
      label: 'Build slides',
      hint: next ? `For ${next.title}` : 'Open a plan first',
      Icon: Presentation,
      onClick: () => next && navigate(`/college/lessons/${next.id}/slides`),
      disabled: !next,
    },
    {
      key: 'schedule',
      label: 'Schedule a plan',
      hint:
        counts.unscheduled > 0
          ? `${plural(counts.unscheduled, 'plan', 'plans')} with no date`
          : 'Every plan has a date',
      Icon: CalendarPlus,
      onClick: () => pickFilter('unscheduled'),
      disabled: counts.unscheduled === 0,
    },
    {
      key: 'close',
      label: 'Close off',
      hint:
        counts.unmarked > 0
          ? `${plural(counts.unmarked, 'lesson', 'lessons')} not marked delivered`
          : 'All lessons closed off',
      Icon: CheckCheck,
      onClick: () => pickFilter('unmarked'),
      disabled: counts.unmarked === 0,
    },
  ];

  /* ── Plan card ───────────────────────────────────────────────────── */

  const renderCard = (lesson: LessonRow) => {
    const objectives = parseObjectives(lesson.objectives);
    const status = displayStatus(lesson);
    const openPlan = () => navigate(`/college/lessons/${lesson.id}`);
    const taught = taughtOn?.get(lesson.id) ?? null;
    const busy = busyId === lesson.id;

    const when = lesson.scheduled_date
      ? [
          lesson.scheduled_date === todayIso ? 'Today' : fmtDay(lesson.scheduled_date),
          lesson.scheduled_start_time?.slice(0, 5) ?? null,
        ]
          .filter(Boolean)
          .join(' · ')
      : 'Not scheduled';
    const meta = [
      getCohortName(lesson.cohort_id) ?? 'No cohort',
      fmtMinutes(lesson.duration_minutes),
      objectives.length > 0 ? plural(objectives.length, 'objective', 'objectives') : null,
      scope === 'all' ? getTutorName(lesson.tutor_id) : null,
    ]
      .filter(Boolean)
      .join(' · ');

    // The one action this plan needs next.
    let action: { label: string; onClick: () => void } | null = null;
    if (status === 'unmarked')
      action = { label: 'Mark delivered', onClick: () => void setStatus(lesson, 'delivered') };
    else if (status === 'draft' || status === 'ready') {
      if (!lesson.scheduled_date)
        action = { label: 'Schedule', onClick: () => setToSchedule(lesson) };
      else if (status === 'draft')
        action = { label: 'Mark ready', onClick: () => void setStatus(lesson, 'ready') };
      else
        action = {
          label: 'Deliver',
          onClick: () => navigate(`/college/lessons/${lesson.id}/deliver`),
        };
    }

    return (
      <motion.li key={lesson.id} variants={itemVariants} className="min-w-0">
        <div className={CARD}>
          <span aria-hidden className={TOP_LINE} />
          {/* The whole card opens the plan; the controls sit above this. */}
          <button
            type="button"
            onClick={openPlan}
            className="absolute inset-0 z-0 touch-manipulation"
            aria-label={`Open ${lesson.title}`}
          />
          <div className="pointer-events-none relative z-10 flex flex-1 flex-col px-4 pb-3.5 pt-4 sm:px-5 sm:pt-5">
            <div className="flex items-start justify-between gap-3">
              <StatusWord status={status} />
              <p
                className={cn(
                  'pt-1 text-right text-[12.5px] font-semibold tabular-nums',
                  status === 'unmarked' ? 'text-orange-300' : 'text-white'
                )}
              >
                {status === 'delivered' && taught ? `Taught ${fmtDay(taught)}` : when}
              </p>
            </div>
            <h3 className="mt-3 line-clamp-2 text-[16px] font-semibold leading-snug tracking-tight text-white">
              {lesson.title}
            </h3>
            <div className="flex-1" />
            <p className="mt-1.5 text-[13px] leading-snug text-white">{meta}</p>
          </div>
          <div className="relative z-10 flex items-center gap-1 border-t border-white/[0.08] px-3 py-1 sm:px-3.5">
            {action ? (
              <button
                type="button"
                onClick={action.onClick}
                disabled={busy}
                className={cn(BTN, 'h-11 px-3.5 text-[12.5px]')}
              >
                {busy ? 'Saving…' : action.label}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate(`/college/lessons/${lesson.id}/slides`)}
                className={cn(BTN, 'h-11 px-3.5 text-[12.5px]')}
              >
                Slides
              </button>
            )}
            <button
              type="button"
              onClick={openPlan}
              className="ml-auto inline-flex h-11 items-center gap-1 px-2 text-[12.5px] font-semibold text-white touch-manipulation"
            >
              Open
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
            <TeachMenu
              title={lesson.title}
              items={[
                {
                  label: 'Slides',
                  onClick: () => navigate(`/college/lessons/${lesson.id}/slides`),
                },
                ...(status === 'draft' || status === 'ready' || status === 'unmarked'
                  ? [
                      {
                        label: lesson.scheduled_date ? 'Reschedule' : 'Schedule',
                        onClick: () => setToSchedule(lesson),
                      },
                    ]
                  : []),
                ...(lesson.cohort_id
                  ? [{ label: 'Take the register', onClick: () => openRegister(lesson) }]
                  : []),
                ...(status !== 'delivered' &&
                status !== 'archived' &&
                action?.label !== 'Mark delivered'
                  ? [
                      {
                        label: 'Mark delivered',
                        onClick: () => void setStatus(lesson, 'delivered'),
                      },
                    ]
                  : []),
                { label: 'Duplicate', onClick: () => void duplicate(lesson) },
                { label: 'Delete', onClick: () => setToDelete(lesson), destructive: true },
              ]}
              trigger={(p) => (
                <button
                  type="button"
                  {...p}
                  className="-mr-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.1]"
                  aria-label={`More for ${lesson.title}`}
                >
                  <MoreHorizontal className="h-5 w-5" aria-hidden />
                </button>
              )}
            />
          </div>
        </div>
      </motion.li>
    );
  };

  const cardGrid = (rows: LessonRow[]) => (
    <motion.ul
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-3 md:grid-cols-[repeat(auto-fit,minmax(380px,1fr))]"
    >
      {rows.map(renderCard)}
    </motion.ul>
  );

  /* ── Next to teach ───────────────────────────────────────────────── */

  const nextCard = next ? (
    <section className="space-y-3" aria-labelledby="next-to-teach">
      <h2 id="next-to-teach" className="text-[17px] font-semibold tracking-tight text-white">
        Next to teach
      </h2>
      <div className={cn(CARD, 'p-4 sm:p-5')}>
        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
          <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-5">
            <div className="shrink-0 rounded-2xl border border-white/[0.1] bg-background px-4 py-3 text-center">
              <p className="text-[24px] font-bold leading-none tabular-nums text-white sm:text-[26px]">
                {next.scheduled_start_time?.slice(0, 5) ?? 'Day'}
              </p>
              <p className="mt-1.5 text-[12px] font-medium text-white">
                {next.scheduled_date === todayIso ? 'Today' : fmtDay(next.scheduled_date as string)}
              </p>
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <StatusWord status={displayStatus(next)} />
                {displayStatus(next) === 'draft' && (
                  <span className="text-[12.5px] text-white">Mark it ready before the class.</span>
                )}
              </div>
              <h3 className="mt-1.5 line-clamp-3 text-[18px] sm:line-clamp-2 font-semibold leading-tight tracking-tight text-white sm:text-[21px]">
                {next.title}
              </h3>
              <p className="mt-1 text-[13px] font-medium text-white">
                {[
                  getCohortName(next.cohort_id) ?? 'No cohort',
                  next.scheduled_room,
                  fmtMinutes(next.duration_minutes),
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            </div>
          </div>
          <div className="grid shrink-0 grid-cols-2 gap-2.5 lg:flex">
            {displayStatus(next) === 'draft' ? (
              <button
                type="button"
                onClick={() => void setStatus(next, 'ready')}
                disabled={busyId === next.id}
                className={cn(BTN_PRIMARY, 'lg:min-w-[140px]')}
              >
                {busyId === next.id ? 'Saving…' : 'Mark ready'}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate(`/college/lessons/${next.id}/deliver`)}
                className={cn(BTN_PRIMARY, 'lg:min-w-[140px]')}
              >
                Deliver
              </button>
            )}
            <button
              type="button"
              onClick={() => navigate(`/college/lessons/${next.id}`)}
              className={cn(BTN, 'lg:min-w-[120px]')}
            >
              Open plan
            </button>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div
      className={cn(
        CARD,
        'flex-row flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5'
      )}
    >
      <span aria-hidden className={TOP_LINE} />
      <p className="min-w-0 text-[14px] text-white">
        <span className="font-semibold">Nothing scheduled to teach.</span> Give a plan a cohort,
        date and room and it shows here.
      </p>
      <button
        type="button"
        onClick={() => (counts.unscheduled > 0 ? pickFilter('unscheduled') : setStartOpen(true))}
        className={BTN}
      >
        {counts.unscheduled > 0 ? 'Schedule one' : 'Start a plan'}
      </button>
    </div>
  );

  /* ── Toolbar + list ──────────────────────────────────────────────── */

  const SEG = (on: boolean) =>
    cn(
      'h-11 shrink-0 px-3.5 text-[13px] transition-colors touch-manipulation',
      on
        ? 'bg-white/[0.12] font-semibold text-white'
        : 'font-medium text-white hover:bg-white/[0.05]'
    );
  const statusTabs: Array<{ id: Filter; label: string; count: number }> = [
    { id: 'all', label: 'All', count: plans.length },
    ...FILTER_ORDER.filter((f) => counts[f] > 0 || f === 'draft' || f === 'ready').map((f) => ({
      id: f as Filter,
      label: FILTER_LABEL[f],
      count: counts[f],
    })),
  ];

  const toolbar = allPlans.length > 0 && (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <div className="min-w-0 flex-1">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title or objectives"
            aria-label="Search lesson plans"
            className={SEARCH}
          />
        </div>
        <div className="flex items-end gap-3">
          {activeCohorts.length > 0 && (
            <select
              value={filterCohort}
              onChange={(e) => setFilterCohort(e.target.value)}
              aria-label="Filter by cohort"
              className={cn(SELECT, 'min-w-0 flex-1 md:w-60 md:flex-none')}
            >
              <option value="all">All cohorts</option>
              {activeCohorts.map((cohort) => (
                <option key={cohort.id} value={cohort.id}>
                  {cohort.name}
                </option>
              ))}
            </select>
          )}
          {hasMine && (
            <div
              role="group"
              aria-label="Whose plans"
              className="flex shrink-0 overflow-hidden rounded-xl border border-white/[0.14]"
            >
              <button
                type="button"
                onClick={() => setScopeChoice('mine')}
                aria-pressed={scope === 'mine'}
                className={SEG(scope === 'mine')}
              >
                Mine
              </button>
              <button
                type="button"
                onClick={() => setScopeChoice('all')}
                aria-pressed={scope === 'all'}
                className={cn(SEG(scope === 'all'), 'border-l border-white/[0.14]')}
              >
                Everyone
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        role="group"
        aria-label="Filter by status"
        className="-mx-4 flex overflow-x-auto border-b border-white/[0.08] px-4 hide-scrollbar sm:mx-0 sm:px-0"
      >
        {statusTabs.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={filter === t.id}
            onClick={() => setFilter(t.id)}
            className={cn(
              '-mb-px h-11 shrink-0 whitespace-nowrap border-b-2 px-3 text-[13px] transition-colors touch-manipulation',
              filter === t.id
                ? 'border-white font-semibold text-white'
                : 'border-transparent font-medium text-white hover:border-white/[0.3]'
            )}
          >
            {t.label}
            <span className="ml-1.5 tabular-nums">{t.count}</span>
          </button>
        ))}
      </div>
    </div>
  );

  let list: ReactNode;
  if (plans.length === 0) {
    list = (
      <div className={cn(CARD, 'items-start gap-3 p-6')}>
        <span aria-hidden className={TOP_LINE} />
        <p className="text-[16px] font-semibold text-white">
          {scope === 'mine' ? 'You have no lesson plans yet' : 'No lesson plans yet'}
        </p>
        <p className="max-w-xl text-[13.5px] leading-relaxed text-white">
          Pick a cohort and a unit, and the first plan is drafted from its assessment criteria.
        </p>
        <button type="button" onClick={() => setStartOpen(true)} className={BTN_PRIMARY}>
          New plan
        </button>
      </div>
    );
  } else if (filtered.length === 0) {
    list = (
      <div className={cn(CARD, 'p-6')}>
        <p className="text-[14px] text-white">Nothing matches. Clear the search or filters.</p>
      </div>
    );
  } else if (grouped) {
    list = (
      <div className="space-y-8">
        {groups.map((g) => {
          const isDone = g.id === 'delivered';
          const rows = isDone && !showAllDelivered ? g.rows.slice(0, DELIVERED_PREVIEW) : g.rows;
          return (
            <section key={g.id} className="space-y-3">
              <div className="flex flex-col gap-0.5 md:flex-row md:items-baseline md:gap-3">
                <h3 className="shrink-0 text-[15px] font-semibold tracking-tight text-white">
                  {g.title} <span className="font-normal">· {g.rows.length}</span>
                </h3>
                {g.sub && <p className="min-w-0 text-[13px] text-white">{g.sub}</p>}
              </div>
              {cardGrid(rows)}
              {isDone && g.rows.length > DELIVERED_PREVIEW && (
                <button
                  type="button"
                  onClick={() => setShowAllDelivered((v) => !v)}
                  className={BTN}
                >
                  {showAllDelivered ? 'Show fewer' : `Show all ${g.rows.length} delivered`}
                </button>
              )}
            </section>
          );
        })}
      </div>
    );
  } else {
    list = (
      <section className="space-y-3">
        <h3 className="text-[15px] font-semibold tracking-tight text-white">
          {filter === 'all' ? 'Matching plans' : FILTER_LABEL[filter]}{' '}
          <span className="font-normal">
            · {filtered.length} of {plans.length}
          </span>
        </h3>
        {cardGrid(flat)}
      </section>
    );
  }

  return (
    <TeachingScreen>
      {/* ── Header: the College Hub home's greeting shape ── */}
      <motion.header
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="grid min-w-0 grid-cols-1 gap-x-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end"
      >
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-elec-yellow">Teaching</p>
              <h1 className="mt-2 text-[28px] font-bold leading-[1.1] tracking-tight text-white sm:text-[36px]">
                Lesson plans
              </h1>
            </div>
            <PageHelpButton help={HELP} className="shrink-0 sm:hidden" />
          </div>
          <p className="mt-2 max-w-3xl text-[16px] leading-relaxed text-white">{summary}</p>
          {weekLine && <p className="mt-1 text-[13px] text-white">{weekLine}</p>}
        </div>
        {/* One New plan button for both layouts: full width under the
            sentence on a phone, beside the header (with the help) from sm: up. */}
        <div className="mt-4 flex items-center gap-2 sm:mt-0">
          <PageHelpButton help={HELP} className="hidden shrink-0 sm:inline-flex" />
          <button
            type="button"
            onClick={() => setStartOpen(true)}
            className={cn(BTN_PRIMARY, 'w-full sm:w-auto')}
          >
            New plan
          </button>
        </div>
      </motion.header>

      {/* ── Action tiles: the home's Act strip shape ── */}
      {plans.length > 0 && (
        <motion.section
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          aria-label="Quick actions"
        >
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-3">
            {tiles.map(({ key, label, hint, Icon, onClick, disabled }) => (
              <button
                key={key}
                type="button"
                onClick={onClick}
                disabled={disabled}
                className={cn(
                  CARD,
                  'items-start p-4 text-left touch-manipulation active:bg-white/[0.04] disabled:cursor-default sm:p-5'
                )}
              >
                <span aria-hidden className={TOP_LINE} />
                <span className="w-full min-w-0 flex-1">
                  <span className="flex items-center gap-2 text-[14px] font-semibold leading-tight text-white">
                    <Icon
                      className="h-[18px] w-[18px] shrink-0 text-white"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    {label}
                  </span>
                  <span className="mt-1.5 line-clamp-2 text-[12.5px] leading-snug text-white">
                    {hint}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </motion.section>
      )}

      {/* ── Next to teach: one full-width band ── */}
      {plans.length > 0 && nextCard}

      {/* ── The plans, full width ── */}
      <section id="lesson-plan-list" className="min-w-0 scroll-mt-16 space-y-5">
        <h2 className="text-[17px] font-semibold tracking-tight text-white">
          {scope === 'mine' ? 'Your plans' : 'All plans'}
        </h2>
        {toolbar}
        {list}
      </section>

      <StartLessonPlanSheet
        open={startOpen}
        onOpenChange={setStartOpen}
        initialCohortId={filterCohort !== 'all' ? filterCohort : null}
      />

      {toSchedule && (
        <ScheduleLessonDialog
          open={Boolean(toSchedule)}
          onOpenChange={(o) => !o && setToSchedule(null)}
          lessonId={toSchedule.id}
          planTitle={toSchedule.title}
          defaultDurationMins={toSchedule.duration_minutes ?? 90}
          initialCohortId={toSchedule.cohort_id}
          onScheduled={() =>
            void queryClient.invalidateQueries({ queryKey: ['college-lesson-plans'] })
          }
        />
      )}

      <QuickRegisterSheet
        open={register.open}
        onOpenChange={(o) => setRegister((r) => ({ ...r, open: o }))}
        cohortId={register.cohortId}
        lessonTitle={register.title}
        lessonPlanId={register.lessonId}
        date={register.date}
      />

      <ConfirmationDialog
        open={Boolean(toDelete)}
        onOpenChange={(o) => !o && setToDelete(null)}
        title="Delete this lesson plan?"
        description={`"${toDelete?.title ?? ''}" and its criteria mappings and regulation references are removed. This cannot be undone.`}
        confirmText="Delete plan"
        variant="destructive"
        loading={deleting}
        onConfirm={() => void confirmDelete()}
      />
    </TeachingScreen>
  );
}

/** Status as a word. Orange is behind; green is ready; the rest stay neutral. */
function StatusWord({ status, className }: { status: DisplayStatus; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-6 shrink-0 items-center whitespace-nowrap rounded-full border px-2.5 text-[12px] font-semibold',
        status === 'unmarked'
          ? 'border-orange-400/50 text-orange-300'
          : status === 'ready'
            ? 'border-emerald-400/50 text-emerald-300'
            : 'border-white/[0.16] text-white',
        className
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
