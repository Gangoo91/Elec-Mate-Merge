/**
 * CollegeOverviewSection — the College Hub home.
 *
 * One screen that answers a tutor's three questions in order:
 *
 *   1. What is happening today?        → the next class, with the register
 *   2. What needs me, and how do I      → one short list, a button on every
 *      deal with it?                      row, nothing without an action
 *   3. Who are my learners and how      → one card per cohort: attendance,
 *      are they doing?                    who needs a check-in, next class
 *
 * Everything else — marking, lesson plans, resources, people, quality,
 * settings — is a row of plain links, and the analytics widgets sit behind
 * a single "More detail" toggle. The previous version put the same "today"
 * information on the page five times (quick-start card, KPI, work list,
 * tool card, momentum widget) and a new tutor could not tell which to tap.
 *
 * Nothing on this page is a statistic without an action attached to it.
 * All text is `text-white`; the only volt is on the one primary button, the
 * urgent rule on a work row, and a figure that is genuinely costing someone.
 */

import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';

import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubSectionHeading, HubAlertLine } from '@/components/hub/HubPrimitives';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import PushNotificationPrompt from '@/components/notifications/PushNotificationPrompt';
import { CreateInviteSheet } from '@/components/college/sheets/CreateInviteSheet';
import { useMyCollegeContext } from '@/hooks/useMyCollegeContext';
import { useRecomputeRisk } from '@/hooks/useStudentRisk';
import { AtRiskPredictor } from '@/components/college/widgets/AtRiskPredictor';
import { EPACountdown } from '@/components/college/widgets/EPACountdown';
import { ActivityFeed } from '@/components/college/widgets/ActivityFeed';
import { MyComplianceWidget } from '@/components/college/widgets/MyComplianceWidget';
import { ComplianceLeadsWidget } from '@/components/college/widgets/ComplianceLeadsWidget';
import { SafeguardingReadinessBanner } from '@/components/college/widgets/SafeguardingReadinessBanner';
import { VerifierInboxWidget } from '@/components/college/widgets/VerifierInboxWidget';
import { MyAcknowledgementsWidget } from '@/components/college/widgets/MyAcknowledgementsWidget';
import { TopExpiringWidget } from '@/components/college/widgets/TopExpiringWidget';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useTutorToday, type TodayNextLesson } from '@/hooks/useTutorToday';
import { INBOX_KIND_LABEL, useUnifiedInbox, type InboxKind } from '@/hooks/useUnifiedInbox';

interface CollegeOverviewSectionProps {
  onNavigate: (section: CollegeSection) => void;
  /** Opens the learner search (⌘K palette). Falls back to the Students list. */
  onFindLearner?: () => void;
}

const DAY_MS = 86_400_000;
const MORE_KEY = 'college-overview-more-open';

function daysAgo(iso: string | null | undefined): number | null {
  if (!iso) return null;
  const t = new Date(iso).getTime();
  if (!Number.isFinite(t)) return null;
  return Math.max(0, Math.floor((Date.now() - t) / DAY_MS));
}

function ago(iso: string | null | undefined): string | undefined {
  const d = daysAgo(iso);
  if (d === null) return undefined;
  if (d === 0) return 'today';
  if (d === 1) return 'yesterday';
  return `${d}d`;
}

function fmtMinutes(min: number | null | undefined): string | null {
  if (!min || min <= 0) return null;
  if (min < 60) return `${Math.round(min)} min`;
  const h = min / 60;
  return Number.isInteger(h) ? `${h}h` : `${h.toFixed(1)}h`;
}

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

/** "12 Jun" */
function fmtDay(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (!Number.isFinite(d.getTime())) return null;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

/** "Thu 8 Oct" for a yyyy-mm-dd date, interpreted locally. */
function fmtLessonDay(ymd: string): string {
  const [y, m, d] = ymd.split('-').map(Number);
  const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
  return dt.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

function lessonWhen(l: TodayNextLesson): string {
  const time = l.scheduled_start_time?.slice(0, 5) ?? null;
  const day = l.is_today ? 'Today' : fmtLessonDay(l.scheduled_date);
  return [day, time].filter(Boolean).join(' · ');
}

type NeedKind = InboxKind;
const KIND_LABEL = INBOX_KIND_LABEL;

interface NeedRow {
  id: string;
  kind: NeedKind;
  /** Days it has been waiting, for "waiting 12 days". */
  waitingDays?: number | null;
  title: string;
  reason: string;
  /** Short verb on the button — "Verify", "Reply", "Review". */
  action: string;
  trailing?: string;
  urgent?: boolean;
  go: () => void;
}

const HOME_HELP: PageHelpContent = {
  id: 'college-home',
  title: 'Your college home',
  what: 'Your day in one place: the class you are teaching next, everything waiting on you, your learners by cohort, and every other part of the College Hub.',
  steps: [
    { title: 'Start with today', body: 'Open the lesson to teach from it, or take the register in two taps.' },
    { title: 'Clear what needs you', body: 'Hours to verify, evidence to review, messages and marking, oldest and most urgent first. Filter by type at the top.' },
    { title: 'Check on your learners', body: 'Each cohort shows attendance, who could do with a check-in, and the next class.' },
    { title: 'Find everything else', body: 'Assess, Teach, Apprenticeship rules and College group every other page, each with a line on what it is for.' },
  ],
  legend: [
    { swatch: 'bg-orange-500', label: 'Waiting a week or more', body: 'Hours and evidence that have sat this long start to cost the learner.' },
    { swatch: 'bg-elec-yellow', label: 'Do this first', body: 'The button is filled when it is urgent.' },
  ],
};

const WEEK_KIND: Record<'lesson' | 'observation_due' | 'iqa_action' | 'epa_brief', string> = {
  lesson: 'Class',
  observation_due: 'Observation due',
  iqa_action: 'IQA action',
  epa_brief: 'EPA brief',
};

const btnPrimary =
  'inline-flex h-11 items-center justify-center rounded-xl bg-elec-yellow px-5 text-[13px] font-bold text-black transition-transform touch-manipulation active:scale-[0.98]';
const btnSecondary =
  'inline-flex h-11 items-center justify-center rounded-xl border border-white/[0.18] px-5 text-[13px] font-semibold text-white transition-colors touch-manipulation hover:border-elec-yellow/50 active:scale-[0.98]';
const chip =
  'inline-flex h-10 items-center gap-1.5 rounded-full border border-white/[0.14] px-3.5 text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:border-elec-yellow/50 active:scale-[0.98]';

export function CollegeOverviewSection({ onNavigate, onFindLearner }: CollegeOverviewSectionProps) {
  const navigate = useNavigate();
  const { students, getPendingGradesData, isLoading } = useCollegeSupabase();
  const {
    data: today,
    loading: todayLoading,
    error: todayError,
    refresh: refreshToday,
  } = useTutorToday();
  const { staff: me } = useMyCollegeContext();
  const { recompute, running: recomputing } = useRecomputeRisk();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem(MORE_KEY) === '1';
    } catch {
      return false;
    }
  });
  const toggleMore = () => {
    setMoreOpen((v) => {
      try {
        localStorage.setItem(MORE_KEY, v ? '0' : '1');
      } catch {
        /* storage may be blocked */
      }
      return !v;
    });
  };

  const todayPending = todayLoading && !today;
  const pendingAssessments = getPendingGradesData().length;
  const collegeHasLearners = students.length > 0 || (me?.learner_count ?? 0) > 0;

  const riskUpdated = useMemo(() => {
    const ts = (today?.atRisk ?? [])
      .map((l) => (l.computed_at ? new Date(l.computed_at).getTime() : NaN))
      .filter((t) => Number.isFinite(t));
    return ts.length ? fmtDay(new Date(Math.max(...ts)).toISOString()) : null;
  }, [today?.atRisk]);

  const handleRecompute = async () => {
    const ids = students.filter((s) => s.status?.toLowerCase() === 'active').map((s) => s.id);
    try {
      await recompute({ student_ids: ids });
      await refreshToday();
    } catch {
      /* useRecomputeRisk has toasted */
    }
  };

  const student360 = useCallback(
    (csId: string, hash = '') =>
      navigate(`/college?section=student360&studentId=${encodeURIComponent(csId)}${hash}`),
    [navigate]
  );

  /*
   * ── Needs you ────────────────────────────────────────────────────────
   * Ordered by cost of delay. Hours that have sat a week are costing a
   * learner their record; evidence waiting on a decision blocks their
   * progress; a message unanswered is a learner left hanging; marking and
   * IQA are the college's own queues; a learner flagged at risk closes the
   * list because a check-in is a judgement call, not a queue item.
   */
  // The same list as the inbox (get_college_inbox + marking), so the two
  // always agree. Before, this was built from different queries and showed
  // an assessor's own comment as a learner reply.
  const { items: inboxItems, loading: inboxLoading } = useUnifiedInbox();
  const needs: NeedRow[] = useMemo(
    () =>
      inboxItems.map((i) => ({
        id: i.key,
        kind: i.kind,
        waitingDays: i.waitingDays,
        title: i.learner ?? i.title,
        reason: i.learner ? [i.title, i.body].filter(Boolean).join(' · ') : i.body,
        action: i.action,
        urgent: i.urgent,
        go: () => navigate(i.href),
      })),
    [inboxItems, navigate]
  );

  const needsTotal = needs.length;
  const [needFilter, setNeedFilter] = useState<NeedKind | 'all'>('all');
  const needKinds = useMemo(() => {
    const m = new Map<NeedKind, number>();
    for (const n of needs) m.set(n.kind, (m.get(n.kind) ?? 0) + 1);
    return [...m.entries()];
  }, [needs]);
  const filteredNeeds = needFilter === 'all' ? needs : needs.filter((n) => n.kind === needFilter);
  const shown = filteredNeeds.slice(0, 7);
  const hidden = filteredNeeds.length - shown.length;
  // Attendance across the cohorts with a register, weighted by learners.
  const attendanceAll = (() => {
    const withReg = (today?.cohortStats ?? []).filter((c) => c.attendance_pct !== null && c.learners > 0);
    const n = withReg.reduce((t, c) => t + c.learners, 0);
    return n ? Math.round(withReg.reduce((t, c) => t + (c.attendance_pct as number) * c.learners, 0) / n) : null;
  })();
  const firstName = (me?.name ?? '').trim().split(/\s+/)[0] || null;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const next = today?.nextLesson ?? null;
  const cohorts = today?.cohortStats ?? [];
  const todayLabel = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  // Everything else, grouped by the job it belongs to (Andrew, 6 Oct: the
  // flat row of fifteen pills "needs to be better designed").
  const groups: {
    title: string;
    items: { label: string; hint: string; count?: number; go: () => void }[];
  }[] = [
    {
      title: 'Assess',
      items: [
        { label: 'Marking', hint: 'Submissions waiting for a decision', count: pendingAssessments || undefined, go: () => onNavigate('grading') },
        { label: 'Inbox', hint: 'Comments, hours and sign-offs for you', count: needsTotal || undefined, go: () => navigate('/college/inbox') },
        { label: 'Portfolios', hint: 'Every learner’s evidence and criteria', go: () => onNavigate('portfolio') },
      ],
    },
    {
      title: 'Teach',
      items: [
        { label: 'Attendance', hint: 'Registers and patterns', go: () => onNavigate('attendance') },
        { label: 'Lesson plans', hint: 'Plans, slides and what was taught', go: () => onNavigate('lessonplans') },
        { label: 'Quizzes', hint: 'Set, mark and see results', go: () => navigate('/college/quizzes') },
        { label: 'Resources', hint: 'Teaching materials', go: () => onNavigate('teachingresources') },
        { label: 'Teaching', hint: 'Curriculum and schemes of work', go: () => onNavigate('curriculumhub') },
      ],
    },
    {
      title: 'Apprenticeship rules',
      items: [
        { label: 'Off-the-job hours', hint: 'Approve learning, check every month', go: () => navigate('/college/otj') },
        { label: 'Progress reviews', hint: 'Three-way, every 3 months', go: () => navigate('/college/reviews') },
        { label: 'Evidence pack', hint: 'What is missing before an audit', go: () => navigate('/college/evidence-pack') },
        { label: 'Quality & compliance', hint: 'IQA, SAR, inspection rehearsal', go: () => onNavigate('qualityhub') },
      ],
    },
    {
      title: 'College',
      items: [
        { label: 'People', hint: 'Learners, staff and employers', go: () => onNavigate('peoplehub') },
        { label: 'Reports', hint: 'Ready-made reports and exports', go: () => navigate('/college/reports') },
        { label: 'Settings', hint: 'College, courses and cohorts', go: () => onNavigate('collegesettings') },
      ],
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      {/* ── 0. Greeting and the day in four figures ─────────────────── */}
      <motion.header
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 items-end gap-6 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
      >
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">{todayLabel}</p>
            <PageHelpButton help={HOME_HELP} className="-mt-2 xl:hidden" />
          </div>
          <h1 className="mt-2 text-[28px] font-bold leading-[1.1] tracking-tight text-white sm:text-[36px]">
            {greeting}
            {firstName ? `, ${firstName}` : ''}
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-white">
            {todayPending
              ? 'Getting your day ready…'
              : next?.is_today
                ? `Your class starts at ${next.scheduled_start_time?.slice(0, 5) ?? 'today'}.`
                : next
                  ? `Next class ${lessonWhen(next)}.`
                  : 'No class in the timetable.'}{' '}
            {needsTotal === 0 ? 'Nothing is waiting on you.' : `${plural(needsTotal, 'thing')} need${needsTotal === 1 ? 's' : ''} you.`}
          </p>
        </div>
        <div className="flex items-stretch gap-3">
          <dl className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Needs you', value: todayPending ? '—' : String(needsTotal), hint: 'to act on', warn: false },
              { label: 'Over a week', value: todayPending ? '—' : String(needs.filter((n) => n.urgent).length), hint: 'costing a learner', warn: needs.some((n) => n.urgent) },
              { label: 'Learners', value: String(students.length), hint: plural(cohorts.length, 'cohort'), warn: false },
              { label: 'Attendance', value: attendanceAll == null ? '—' : `${attendanceAll}%`, hint: 'last 4 weeks', warn: attendanceAll != null && attendanceAll < 85 },
            ].map((k) => (
              <div key={k.label} className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] px-4 py-3">
                <dt className="text-[12px] font-medium text-white">{k.label}</dt>
                <dd className={cn('mt-1 text-[26px] font-bold leading-none tabular-nums', k.warn ? 'text-orange-400' : 'text-white')}>{k.value}</dd>
                <dd className="mt-1.5 truncate text-[11.5px] text-white">{k.hint}</dd>
              </div>
            ))}
          </dl>
          <PageHelpButton help={HOME_HELP} className="hidden xl:inline-flex" />
        </div>
      </motion.header>

      {/* ── 1. Two columns: the day on the left, the work on the right ── */}
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="min-w-0 space-y-6 xl:col-start-1 xl:row-start-1">
          {/* Today */}
          <motion.section variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
            <motion.div variants={itemVariants} className="flex h-9 items-end">
              <HubSectionHeading>Today</HubSectionHeading>
            </motion.div>
            <motion.div variants={itemVariants} className="-mx-4 border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] sm:mx-0 sm:rounded-3xl sm:border-x p-5 sm:p-6">
          {todayPending ? (
            <div className="space-y-2">
              <div className="h-3 w-24 rounded bg-white/[0.08]" />
              <div className="h-6 w-2/3 rounded bg-white/[0.08]" />
              <div className="h-3 w-1/2 rounded bg-white/[0.08]" />
            </div>
          ) : next ? (
            <div className="flex h-full flex-col gap-5">
              <div className="flex items-start gap-5">
                <div className="shrink-0 rounded-2xl border border-white/[0.1] bg-background px-4 py-3 text-center">
                  <p className="text-[26px] font-bold leading-none tabular-nums text-white">
                    {next.scheduled_start_time?.slice(0, 5) ?? '—'}
                  </p>
                  <p className="mt-1.5 text-[12px] font-medium text-white">
                    {next.is_today ? 'Today' : fmtLessonDay(next.scheduled_date)}
                  </p>
                </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
                  {next.is_today
                    ? next.is_mine
                      ? 'Your class today'
                      : 'Class today'
                    : next.is_mine
                      ? 'Your next class'
                      : 'Next class'}
                </p>
                <h3 className="mt-1 text-[19px] font-semibold leading-tight tracking-tight text-white sm:text-[22px]">
                  {next.title}
                </h3>
                <p className="mt-1.5 text-[13px] font-medium text-white">
                  {[fmtMinutes(next.duration_minutes), next.room, next.cohort_name].filter(Boolean).join(' · ')}
                </p>
              </div>
              </div>
              <div className="mt-auto grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => navigate(`/college/lessons/${next.id}`)}
                  className={btnPrimary}
                >
                  Open lesson
                </button>
                <button type="button" onClick={() => onNavigate('attendance')} className={btnSecondary}>
                  Take register
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
                  No class scheduled
                </p>
                <h3 className="mt-1 text-[19px] font-semibold leading-tight tracking-tight text-white sm:text-[22px]">
                  Nothing in the timetable yet
                </h3>
                <p className="mt-1.5 text-[13px] font-medium text-white">
                  Schedule a lesson for a cohort and it appears here, and on every learner's phone.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('lessonplans')}
                className={cn(btnPrimary, 'shrink-0')}
              >
                Schedule a lesson
              </button>
            </div>
          )}
            </motion.div>
          </motion.section>

        </div>

        {/* Phones: Needs you comes straight after Today (order); desktop: right column. */}
        <div className="order-last min-w-0 space-y-6 xl:order-none xl:col-start-1 xl:row-start-2">
          {/* This week */}
          {!todayPending && (today?.thisWeek?.length ?? 0) > 0 && (
            <motion.section variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
              <motion.div variants={itemVariants}>
                <HubSectionHeading>This week</HubSectionHeading>
              </motion.div>
              <motion.ol variants={itemVariants} className="-mx-4 border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] sm:mx-0 sm:rounded-3xl sm:border-x divide-y divide-white/[0.06] overflow-hidden">
                {(today?.thisWeek ?? []).slice(0, 6).map((w, i) => (
                  <li key={`${w.date}-${i}`}>
                    <button
                      type="button"
                      onClick={() => navigate(w.href)}
                      className="flex min-h-[56px] w-full items-center gap-4 px-5 py-2.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04]"
                    >
                      <span className="w-14 shrink-0 text-[12px] font-semibold leading-tight text-white">
                        {fmtLessonDay(w.date)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-semibold text-white">{w.title}</span>
                        <span className="block text-[12px] text-white">{WEEK_KIND[w.kind]}</span>
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                    </button>
                  </li>
                ))}
              </motion.ol>
            </motion.section>
          )}

          {/* Your learners */}
          <motion.section variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
            <motion.div variants={itemVariants} className="flex items-end justify-between gap-3">
              <HubSectionHeading>Your learners</HubSectionHeading>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => (onFindLearner ? onFindLearner() : onNavigate('students'))}
                  className="inline-flex h-11 items-center gap-1.5 rounded-xl px-2.5 text-[12.5px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
                >
                  <Search className="h-3.5 w-3.5" aria-hidden /> Find
                </button>
                <button
                  type="button"
                  onClick={() => setInviteOpen(true)}
                  className="inline-flex h-11 items-center rounded-xl px-2.5 text-[12.5px] font-semibold text-elec-yellow touch-manipulation hover:bg-white/[0.06]"
                >
                  Share a join code
                </button>
              </div>
            </motion.div>
        {!collegeHasLearners ? (
          <motion.div
            variants={itemVariants}
            className={cn(CARD_SURFACE, 'rounded-2xl border border-elec-yellow/35 p-5 sm:p-6')}
          >
            <p className="text-[17px] font-semibold tracking-tight text-white">No learners yet.</p>
            <p className="mt-1 text-[13.5px] font-medium leading-snug text-white">
              Create a cohort, then share its join code. Learners who join appear here with their
              attendance, hours and evidence.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <button type="button" onClick={() => onNavigate('cohorts')} className={btnPrimary}>
                Create a cohort
              </button>
              <button type="button" onClick={() => setInviteOpen(true)} className={btnSecondary}>
                Share a join code
              </button>
            </div>
          </motion.div>
        ) : cohorts.length === 0 && !todayPending ? (
          <motion.div
            variants={itemVariants}
            className={cn(CARD_SURFACE, 'rounded-2xl border border-white/[0.14] p-5')}
          >
            <p className="text-[15px] font-semibold text-white">
              {plural(students.length, 'learner')} on the roll, no cohorts yet.
            </p>
            <p className="mt-1 text-[13px] font-medium text-white">
              Put learners into cohorts so registers, lessons and quizzes go to the right group.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('cohorts')}
              className={cn(btnSecondary, 'mt-4')}
            >
              Set up cohorts
            </button>
          </motion.div>
        ) : (
              <motion.ul variants={itemVariants} className="-mx-4 border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] sm:mx-0 sm:rounded-3xl sm:border-x divide-y divide-white/[0.06] overflow-hidden">
                {(todayPending ? [] : cohorts).map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => navigate(`/college?section=students&cohort=${encodeURIComponent(c.id)}`)}
                      className="flex w-full items-center gap-4 px-5 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04]"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="text-[14.5px] font-semibold leading-snug text-white">{c.name}</span>
                          {c.is_mine && (
                            <span className="shrink-0 rounded-full bg-elec-yellow px-2 py-0.5 text-[10.5px] font-bold text-black">Yours</span>
                          )}
                        </span>
                        <span className="mt-0.5 block truncate text-[12.5px] text-white">
                          {[
                            plural(c.learners, 'learner'),
                            c.next_lesson ? `next ${lessonWhen(c.next_lesson)}` : 'no class booked',
                          ].join(' · ')}
                        </span>
                      </span>
                      <span className="shrink-0 text-right">
                        <span className="block text-[15px] font-bold tabular-nums text-white">
                          {c.attendance_pct === null ? '—' : `${c.attendance_pct}%`}
                        </span>
                        <span className="block text-[11px] text-white">attendance</span>
                      </span>
                      <span
                        className={cn(
                          'w-[76px] shrink-0 rounded-full px-2 py-1 text-center text-[11px] font-semibold',
                          c.at_risk > 0 ? 'bg-orange-500 text-black' : 'border border-white/[0.16] text-white'
                        )}
                      >
                        {c.at_risk > 0 ? `${c.at_risk} check-in` : 'All fine'}
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                    </button>
                  </li>
                ))}
                {todayPending && [0, 1, 2].map((i) => <li key={i} className="h-[68px]" />)}
              </motion.ul>
            )}

            {today && !todayPending && collegeHasLearners && (
              <div className="flex items-center justify-between gap-3 px-1">
                <span className="text-[12px] font-medium text-white">
                  {riskUpdated ? `Check-in flags updated ${riskUpdated}` : 'Check-in flags: none computed yet'}
                </span>
                <button
                  type="button"
                  onClick={() => void handleRecompute()}
                  disabled={recomputing}
                  className="-my-2 flex h-11 items-center px-2 text-[12px] font-bold text-elec-yellow touch-manipulation disabled:opacity-60"
                >
                  {recomputing ? 'Recomputing…' : 'Recompute'}
                </button>
              </div>
            )}
          </motion.section>
        </div>

        {/* Needs you */}
        <motion.section variants={containerVariants} initial="hidden" animate="visible" className="min-w-0 space-y-3 xl:col-start-2 xl:row-span-2 xl:row-start-1">
          <motion.div variants={itemVariants} className="flex h-9 items-end justify-between gap-3">
            <HubSectionHeading>Needs you</HubSectionHeading>
            <span className="text-[12px] font-semibold tabular-nums text-white">
              {todayPending ? 'Loading…' : needsTotal === 0 ? 'Nothing waiting' : `${plural(needsTotal, 'thing')}, oldest first`}
            </span>
          </motion.div>

          {todayError && !todayLoading && (
            <HubAlertLine text={`Couldn't load your queue: ${todayError}`} action="Retry" onClick={() => void refreshToday()} />
          )}

          <motion.div variants={itemVariants} className="-mx-4 border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] sm:mx-0 sm:rounded-3xl sm:border-x overflow-hidden">
            {needKinds.length > 1 && (
              <div className="flex gap-1.5 overflow-x-auto border-b border-white/[0.06] px-4 py-3 sm:px-5">
                {([['all', needsTotal] as [NeedKind | 'all', number], ...needKinds]).map(([k, n]) => (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={needFilter === k}
                    onClick={() => setNeedFilter(k)}
                    className={cn(
                      'inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 text-[12px] font-semibold touch-manipulation',
                      needFilter === k ? 'border-white bg-white text-black' : 'border-white/[0.14] text-white'
                    )}
                  >
                    {k === 'all' ? 'All' : KIND_LABEL[k]}
                    <span className="tabular-nums">{n}</span>
                  </button>
                ))}
              </div>
            )}
          {todayPending ? (
            <ul className="divide-y divide-white/[0.06]">
              {[0, 1, 2].map((i) => (
                <li key={i} className="flex items-center gap-3 px-5 py-4">
                  <span className="h-10 w-10 rounded-full bg-white/[0.08]" />
                  <span className="flex-1 space-y-1.5">
                    <span className="block h-3 w-1/3 rounded bg-white/[0.08]" />
                    <span className="block h-3 w-2/3 rounded bg-white/[0.06]" />
                  </span>
                </li>
              ))}
            </ul>
          ) : shown.length === 0 ? (
            <div className="px-5 py-6">
              <p className="text-[15px] font-semibold text-white">Nothing needs you right now.</p>
              <p className="mt-1 text-[13px] font-medium leading-snug text-white">
                Hours to verify, evidence to review, messages and marking land here as learners send them.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-white/[0.06]">
              {shown.map((row) => {
                const initials = row.kind === 'marking' ? 'M' : row.kind === 'iqa' ? 'IQ' : row.title
                  .replace(/\(.*?\)/g, '')
                  .split(/\s+/)
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((w) => w[0]?.toUpperCase())
                  .join('');
                const waiting =
                  row.waitingDays == null
                    ? null
                    : row.waitingDays === 0
                      ? 'today'
                      : `waiting ${plural(row.waitingDays, 'day')}`;
                return (
                  <li key={row.id}>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={row.go}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          row.go();
                        }
                      }}
                      className="flex w-full cursor-pointer items-center gap-3.5 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04] sm:px-5"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-bold',
                          row.urgent ? 'bg-orange-500 text-black' : 'bg-white/[0.1] text-white'
                        )}
                      >
                        {initials || '•'}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="truncate text-[14.5px] font-semibold leading-tight text-white">{row.title}</span>
                          <span className="shrink-0 rounded-full border border-white/[0.16] px-2 py-0.5 text-[10.5px] font-semibold text-white">
                            {KIND_LABEL[row.kind]}
                          </span>
                        </span>
                        <span className="mt-1 block truncate text-[12.5px] leading-tight text-white">{row.reason}</span>
                        {waiting && (
                          <span
                            className={cn(
                              'mt-1 block text-[11.5px] font-semibold',
                              row.urgent ? 'text-orange-300' : 'text-white'
                            )}
                          >
                            {waiting}
                          </span>
                        )}
                      </span>
                      <span
                        className={cn(
                          'inline-flex h-10 w-[88px] shrink-0 items-center justify-center rounded-xl text-[13px] font-bold',
                          row.urgent ? 'bg-elec-yellow text-black' : 'border border-white/[0.18] text-white'
                        )}
                      >
                        {row.action}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {hidden > 0 && (
            <button
              type="button"
              onClick={() => navigate('/college/inbox')}
              className="flex h-12 w-full items-center justify-center gap-1 border-t border-white/[0.08] text-[13px] font-semibold text-white transition-colors touch-manipulation hover:bg-white/[0.04]"
            >
              {hidden} more in your inbox <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          )}
          </motion.div>
        </motion.section>
      </div>

      {/* Statutory, so it stays on the front page, after the work. */}
      <SafeguardingReadinessBanner />

      {/* Below the lists it is read as a tool, not as a wall in front of the page. */}
      <PushNotificationPrompt context="Get a nudge when a learner sends hours, evidence or a message" />

      {/* ── 4. Everything else ───────────────────────────────────────── */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <HubSectionHeading>Everything else</HubSectionHeading>
        <motion.div variants={itemVariants} className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {groups.map((g) => (
            <div
              key={g.title}
              className="-mx-4 overflow-hidden border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] sm:mx-0 sm:rounded-3xl sm:border-x"
            >
              <p className="px-5 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
                {g.title}
              </p>
              <ul className="divide-y divide-white/[0.06]">
                {g.items.map((m) => (
                  <li key={m.label}>
                    <button
                      type="button"
                      onClick={m.go}
                      className="flex min-h-[60px] w-full items-center gap-3 px-5 py-2.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04]"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14.5px] font-semibold text-white">{m.label}</span>
                        <span className="block text-[12.5px] leading-snug text-white">{m.hint}</span>
                      </span>
                      {m.count ? (
                        <span className="shrink-0 rounded-full bg-elec-yellow px-2 py-0.5 text-[11.5px] font-bold tabular-nums text-black">
                          {m.count}
                        </span>
                      ) : null}
                      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* ── 5. More detail (collapsed) ───────────────────────────────── */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={toggleMore}
            aria-expanded={moreOpen}
            className="flex min-h-[64px] w-full items-center justify-between gap-4 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] px-5 py-3 text-left text-white transition-colors touch-manipulation hover:border-white/[0.18]"
          >
            <span className="min-w-0">
              <span className="block text-[14.5px] font-semibold">{moreOpen ? 'Hide the detail' : 'More detail'}</span>
              <span className="block truncate text-[12.5px]">Risk, EPA gateway countdown, activity and your compliance</span>
            </span>
            <ChevronRight
              className={cn('h-4 w-4 transition-transform', moreOpen && 'rotate-90')}
              aria-hidden
            />
          </button>
        </motion.div>

        {moreOpen && (
          <>
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2"
            >
              <AtRiskPredictor onNavigate={onNavigate} compact />
              <EPACountdown onNavigate={onNavigate} compact />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ActivityFeed maxItems={6} iconless />
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-end justify-between gap-4 pt-2">
              <HubSectionHeading>Compliance</HubSectionHeading>
              <button
                type="button"
                onClick={() => onNavigate('compliancedocs')}
                className="text-[12px] font-bold text-elec-yellow touch-manipulation"
              >
                Open hub
              </button>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-3">
              <MyAcknowledgementsWidget />
              <VerifierInboxWidget />
              <TopExpiringWidget />
              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                <MyComplianceWidget />
                <ComplianceLeadsWidget />
              </div>
            </motion.div>
          </>
        )}
      </motion.section>

      <CreateInviteSheet open={inviteOpen} onOpenChange={setInviteOpen} />
    </>
  );
}
