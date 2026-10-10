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
import { HubAlertLine } from '@/components/hub/HubPrimitives';
import { CollegeHeading } from '@/components/college/ui/CollegeUi';
import { CollegeActStrip, type ActMeta } from '@/components/college/CollegeActSheet';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import PushNotificationPrompt from '@/components/notifications/PushNotificationPrompt';
import { CreateInviteSheet } from '@/components/college/sheets/CreateInviteSheet';
import { CollegeSetupHomeCard } from '@/components/college/setup/CollegeSetupHomeCard';
import { useMyCollegeContext } from '@/hooks/useMyCollegeContext';
import { useDemoMode } from '@/lib/demoMode';
import { useRecomputeRisk } from '@/hooks/useStudentRisk';
import { AtRiskPredictor } from '@/components/college/widgets/AtRiskPredictor';
import {
  HomeActivityCard,
  HomeComplianceCard,
  HomeGatewayCard,
} from '@/components/college/widgets/HomeDetailCards';
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
import { SCOPE_LABEL, useCollegeScope } from '@/components/college/scope/useCollegeScope';

interface CollegeOverviewSectionProps {
  onNavigate: (section: CollegeSection) => void;
  /** Opens the learner search (⌘K palette). Falls back to the Students list. */
  onFindLearner?: () => void;
  /** Open the register in place (the dashboard hosts it). */
  onRegister?: () => void;
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
    {
      title: 'Start with today',
      body: 'Open the lesson to teach from it, or take the register in two taps.',
    },
    {
      title: 'Clear what needs you',
      body: 'Hours to verify, evidence to review, messages and marking, oldest and most urgent first. Filter by type at the top.',
    },
    {
      title: 'Check on your learners',
      body: 'Each cohort shows attendance, who could do with a check-in, and the next class.',
    },
    {
      title: 'Find everything else',
      body: 'Assess, Teach, Apprenticeship rules and College group every other page, each with a line on what it is for.',
    },
  ],
  legend: [
    {
      swatch: 'bg-orange-500',
      label: 'Waiting a week or more',
      body: 'Hours and evidence that have sat this long start to cost the learner.',
    },
    {
      swatch: 'bg-elec-yellow',
      label: 'Do this first',
      body: 'The button is filled when it is urgent.',
    },
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

export function CollegeOverviewSection({
  onNavigate,
  onFindLearner,
  onRegister,
}: CollegeOverviewSectionProps) {
  const navigate = useNavigate();
  const demoCollege = useDemoMode();
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
        // App learning rows all carry the same explanation; the hours say it.
        reason:
          i.kind === 'app_learning'
            ? i.title
            : i.learner
              ? [i.title, i.body].filter(Boolean).join(' · ')
              : i.body,
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
  const oldestDays = needs.reduce((m, n) => Math.max(m, n.waitingDays ?? 0), 0);
  // Age bands (showcase pass, 10 Oct): one orange header per band instead of
  // "Waiting 59 days" in orange on every row.
  const bandOf = (d: number | null | undefined) =>
    d == null || d < 7 ? 'recent' : d >= 28 ? 'month' : 'week';
  const bandCount = (b: string) => filteredNeeds.filter((n) => bandOf(n.waitingDays) === b).length;
  const hidden = filteredNeeds.length - shown.length;
  // ELE-1886: the home figures follow the one College Hub scope (masthead
  // switch). Needs you is already scoped by useUnifiedInbox.
  const scope = useCollegeScope();
  const allCohortStats = today?.cohortStats ?? [];
  const cohorts = scope.set
    ? allCohortStats.filter((c) => scope.inScope({ cohortId: c.id }))
    : allCohortStats;
  const scopedStudents = scope.set
    ? students.filter((s) => scope.inScope({ studentId: s.id }))
    : students;
  // Attendance across the cohorts with a register, weighted by learners.
  const attendanceAll = (() => {
    const withReg = cohorts.filter((c) => c.attendance_pct !== null && c.learners > 0);
    const n = withReg.reduce((t, c) => t + c.learners, 0);
    return n
      ? Math.round(withReg.reduce((t, c) => t + (c.attendance_pct as number) * c.learners, 0) / n)
      : null;
  })();
  const firstName = (me?.name ?? '').trim().split(/\s+/)[0] || null;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const next = today?.nextLesson ?? null;
  // This week without the class already shown in the Today card.
  const laterThisWeek = useMemo(
    () =>
      (today?.thisWeek ?? [])
        .filter((w) => !(next && w.href === `/college/lessons/${next.id}`))
        .slice(0, 6),
    [today, next]
  );

  // What is waiting behind each action on the strip, from the same inbox and
  // week the page already reads. Orange only when something is overdue.
  const actMeta = useMemo<ActMeta>(() => {
    const count = (kinds: InboxKind[]) => {
      const rows = inboxItems.filter((i) => kinds.includes(i.kind));
      return { n: rows.length, late: rows.some((i) => i.urgent) };
    };
    const waiting = (
      c: { n: number; late: boolean },
      word = 'waiting',
      none = 'Nothing waiting'
    ) => (c.n > 0 ? { text: `${c.n} ${word}`, warn: c.late } : { text: none });
    const observeDue = (today?.thisWeek ?? []).filter((w) => w.kind === 'observation_due').length;
    const meta: ActMeta = {
      decide: waiting(count(['evidence', 'marking']), 'to mark'),
      hours: waiting(count(['hours', 'app_learning'])),
      message: waiting(count(['message']), 'unread', 'None new'),
      observe: { text: observeDue > 0 ? `${observeDue} due this week` : 'None due' },
      discussion: { text: 'Record one' },
    };
    if (next) {
      // Short enough for a phone: "Today 09:30", "Tue 09:30", or the date
      // when the class is more than a week away.
      const time = next.scheduled_start_time?.slice(0, 5) ?? '';
      const [y, mo, d] = next.scheduled_date.split('-').map(Number);
      const days = Math.round(
        (new Date(y, (mo ?? 1) - 1, d ?? 1).getTime() -
          new Date(new Date().toDateString()).getTime()) /
          86_400_000
      );
      const day = next.is_today
        ? 'Today'
        : days === 1
          ? 'Tomorrow'
          : days < 7
            ? new Date(y, (mo ?? 1) - 1, d ?? 1).toLocaleDateString('en-GB', { weekday: 'short' })
            : fmtLessonDay(next.scheduled_date);
      meta.register = { text: `${day}${time ? ` ${time}` : ''}` };
    } else if (today) {
      meta.register = { text: 'No class booked' };
    }
    return meta;
  }, [inboxItems, today, next]);
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
        {
          // "Marking" is the inbox's word for quiz answers; this is grading.
          label: 'Grading',
          hint: 'Grades waiting to be recorded',
          count: pendingAssessments || undefined,
          go: () => onNavigate('grading'),
        },
        {
          label: 'Inbox',
          hint: 'Comments, hours and sign-offs for you',
          count: needsTotal || undefined,
          go: () => navigate('/college/inbox'),
        },
        {
          label: 'Portfolios',
          hint: 'Every learner’s evidence and criteria',
          go: () => onNavigate('portfolio'),
        },
      ],
    },
    {
      title: 'Teach',
      items: [
        { label: 'Attendance', hint: 'Registers and patterns', go: () => onNavigate('attendance') },
        {
          label: 'Lesson plans',
          hint: 'Plans, slides and what was taught',
          go: () => onNavigate('lessonplans'),
        },
        {
          label: 'Quizzes',
          hint: 'Set, mark and see results',
          go: () => navigate('/college/quizzes'),
        },
        {
          label: 'Resources',
          hint: 'Teaching materials',
          go: () => onNavigate('teachingresources'),
        },
        {
          label: 'Teaching',
          hint: 'Curriculum and schemes of work',
          go: () => onNavigate('curriculumhub'),
        },
      ],
    },
    {
      title: 'Apprenticeship rules',
      items: [
        {
          label: 'Off-the-job hours',
          hint: 'Approve learning, check every month',
          go: () => navigate('/college/otj'),
        },
        {
          label: 'Progress reviews',
          hint: 'Three-way, every 3 months',
          go: () => navigate('/college/reviews'),
        },
        {
          label: 'Evidence pack',
          hint: 'What is missing before an audit',
          go: () => navigate('/college/evidence-pack'),
        },
        {
          label: 'Quality & compliance',
          hint: 'IQA, SAR, inspection rehearsal',
          go: () => onNavigate('qualityhub'),
        },
      ],
    },
    {
      title: 'College',
      items: [
        {
          label: 'People',
          hint: 'Learners, staff and employers',
          go: () => onNavigate('peoplehub'),
        },
        {
          label: 'Reports',
          hint: 'Ready-made reports and exports',
          go: () => navigate('/college/reports'),
        },
        {
          label: 'Month in numbers',
          hint: 'What Elec-Mate did for you this month',
          go: () => navigate('/college/value'),
        },
        {
          label: 'Help and support',
          hint: 'Answers, and a message to Elec-Mate',
          go: () => navigate('/college/help'),
        },
        // ELE-1854: the presenter's QR, only in the demo college.
        ...(demoCollege
          ? [
              {
                label: 'Try it on your phone',
                hint: 'A QR that gives a visitor a demo learner',
                go: () => navigate('/college/try-on-phone'),
              },
            ]
          : []),
        {
          label: 'Settings',
          hint: 'College, courses and cohorts',
          go: () => onNavigate('collegesettings'),
        },
      ],
    },
  ];

  const urgentCount = needs.filter((n) => n.urgent).length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      {/* ── 0. Greeting: the day in two sentences ────────────────────────
          The four figure tiles that sat top right repeated what the greeting
          and "Needs you" below already say (Andrew, 7 Oct: "a lot going on
          here"). The two figures that matter are in the sentence; learners
          and attendance are one quiet line. */}
      <motion.header variants={itemVariants} initial="hidden" animate="visible" className="min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-white">{todayLabel}</p>
            <h1 className="mt-1.5 text-[28px] font-bold leading-[1.1] tracking-tight text-white sm:text-[32px]">
              {greeting}
              {firstName ? `, ${firstName}` : ''}
            </h1>
          </div>
          <PageHelpButton help={HOME_HELP} className="shrink-0" />
        </div>
        <p className="mt-2 max-w-3xl text-[16px] leading-relaxed text-white">
          {todayPending
            ? 'Getting your day ready…'
            : next?.is_today
              ? `Your class starts at ${next.scheduled_start_time?.slice(0, 5) ?? 'today'}.`
              : next
                ? `Next class ${lessonWhen(next)}.`
                : 'No class in the timetable.'}
        </p>
        {/* One status line of figures: bold number, plain word, hairline
            between. Orange only where something is overdue (10 Oct: the
            sentence version shouted the overdue count mid-paragraph). */}
        {!todayPending && (
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[13.5px] text-white sm:flex sm:flex-wrap sm:items-center sm:gap-x-5">
            {(
              [
                needsTotal === 0
                  ? { n: null, label: 'Nothing waiting on you' }
                  : { n: needsTotal, label: 'waiting on you' },
                urgentCount > 0 ? { n: urgentCount, label: 'over a week', warn: true } : null,
                {
                  n: scopedStudents.length,
                  label: `${scopedStudents.length === 1 ? 'learner' : 'learners'} in ${plural(cohorts.length, 'cohort')}${
                    scope.level === 'college' ? '' : ` (${SCOPE_LABEL[scope.level]})`
                  }`,
                },
                attendanceAll != null
                  ? {
                      n: `${attendanceAll}%`,
                      label: 'attendance',
                      more: ', last 4 weeks',
                      warn: attendanceAll < 85,
                    }
                  : null,
              ].filter(Boolean) as {
                n: number | string | null;
                label: string;
                more?: string;
                warn?: boolean;
              }[]
            ).map((f, i) => (
              <div key={f.label} className="flex min-w-0 items-baseline gap-1.5">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="mr-3.5 hidden h-3.5 w-px self-center bg-white/[0.18] sm:block"
                  />
                )}
                {f.n != null && (
                  <dt
                    className={cn(
                      'text-[15px] font-semibold tabular-nums',
                      f.warn ? 'text-orange-300' : 'text-white'
                    )}
                  >
                    {f.n}
                  </dt>
                )}
                <dd className={cn(f.warn && 'text-orange-300')}>
                  {f.label}
                  {f.more && <span className="hidden sm:inline">{f.more}</span>}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </motion.header>

      {/* ── Quick actions: the Act tiles, one tap each. No bottom bar in the
          College Hub, so these sit near the top of home (and Act is in the
          masthead on every other page). ── */}
      <motion.section
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        aria-labelledby="college-quick-actions"
        className="space-y-3"
      >
        <h2 id="college-quick-actions" className="sr-only">
          Quick actions
        </h2>
        <CollegeActStrip onRegister={onRegister} meta={inboxLoading ? undefined : actMeta} />
      </motion.section>

      {/* ── New college: the set-up checklist until it is done (ELE-1855) ── */}
      <CollegeSetupHomeCard />

      {/* ── 1. Two columns: the day on the left, the work on the right ── */}
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:grid-rows-[auto_1fr_auto]">
        <div className="min-w-0 space-y-6 xl:col-start-1 xl:row-start-1">
          {/* Today */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            <motion.div variants={itemVariants} className="flex h-9 items-end">
              <CollegeHeading>{next && !next.is_today ? 'Coming up' : 'Today'}</CollegeHeading>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="-mx-4 border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] sm:mx-0 sm:rounded-3xl sm:border-x p-5 sm:p-6"
            >
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
                      <p className="text-[13px] font-semibold text-elec-yellow">
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
                        {[fmtMinutes(next.duration_minutes), next.room, next.cohort_name]
                          .filter(Boolean)
                          .join(' · ')}
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
                    <button
                      type="button"
                      onClick={() => onNavigate('attendance')}
                      className={btnSecondary}
                    >
                      Take register
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[13px] font-semibold text-elec-yellow">No class scheduled</p>
                    <h3 className="mt-1 text-[19px] font-semibold leading-tight tracking-tight text-white sm:text-[22px]">
                      Nothing in the timetable yet
                    </h3>
                    <p className="mt-1.5 text-[13px] font-medium text-white">
                      Schedule a lesson for a cohort and it appears here, and on every learner's
                      phone.
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
          {!todayPending && laterThisWeek.length > 0 && (
            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              <motion.div variants={itemVariants}>
                <CollegeHeading>Later this week</CollegeHeading>
              </motion.div>
              <motion.ol
                variants={itemVariants}
                className="-mx-4 border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] sm:mx-0 sm:rounded-3xl sm:border-x divide-y divide-white/[0.06] overflow-hidden"
              >
                {laterThisWeek.map((w, i) => {
                  const firstOfDay = i === 0 || laterThisWeek[i - 1].date !== w.date;
                  const [y, mo, d] = w.date.split('-').map(Number);
                  const day = new Date(y, (mo ?? 1) - 1, d ?? 1);
                  // "Cable selection · 09:30" and "Follow-up · Task (Learner)"
                  // become a title and a plain second line.
                  let title = w.title;
                  let sub: string = WEEK_KIND[w.kind];
                  const time =
                    w.kind === 'lesson' ? title.match(/ · (\d{2}:\d{2})$/)?.[1] : undefined;
                  if (time) {
                    title = title.slice(0, -` · ${time}`.length);
                    sub = `${time} · Class`;
                  }
                  if (w.kind === 'observation_due') {
                    const m = title.match(/^Follow-up · (.*?)(?: \((.*)\))?$/);
                    if (m) {
                      title = m[1];
                      sub = m[2] ? `Observation due · ${m[2]}` : 'Observation due';
                    }
                  }
                  return (
                    <li key={`${w.date}-${i}`}>
                      <button
                        type="button"
                        onClick={() => navigate(w.href)}
                        className="flex min-h-[60px] w-full items-center gap-4 px-5 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07]"
                      >
                        {/* A calendar day block on the first row of each day. */}
                        <span className="w-10 shrink-0 text-center" aria-hidden={!firstOfDay}>
                          {firstOfDay && (
                            <>
                              <span className="block text-[12px] font-medium leading-none text-white">
                                {day.toLocaleDateString('en-GB', { weekday: 'short' })}
                              </span>
                              <span className="mt-1 block text-[19px] font-bold leading-none tabular-nums text-white">
                                {d}
                              </span>
                            </>
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="line-clamp-2 text-[14px] font-semibold leading-snug text-white">
                            {title}
                          </span>
                          <span className="mt-0.5 line-clamp-2 block text-[12.5px] text-white">
                            {sub}
                          </span>
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                      </button>
                    </li>
                  );
                })}
              </motion.ol>
            </motion.section>
          )}
        </div>

        {/* Needs you */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="min-w-0 space-y-3 xl:col-start-2 xl:row-span-2 xl:row-start-1"
        >
          <motion.div variants={itemVariants} className="flex h-9 items-end justify-between gap-3">
            <CollegeHeading>Needs you</CollegeHeading>
            <span className="text-[12px] font-semibold tabular-nums text-white">
              {todayPending
                ? 'Loading…'
                : needsTotal === 0
                  ? 'Nothing waiting'
                  : oldestDays && oldestDays > 1
                    ? `${plural(needsTotal, 'thing')}, oldest ${oldestDays} days`
                    : `${plural(needsTotal, 'thing')}, oldest first`}
            </span>
          </motion.div>

          {todayError && !todayLoading && (
            <HubAlertLine
              text={`Couldn't load your queue: ${todayError}`}
              action="Retry"
              onClick={() => void refreshToday()}
            />
          )}

          <motion.div
            variants={itemVariants}
            className="-mx-4 border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] sm:mx-0 sm:rounded-3xl sm:border-x overflow-hidden"
          >
            {needKinds.length > 1 && (
              // Quiet text tabs with counts, underlined like the area navigation.
              <div className="flex overflow-x-auto border-b border-white/[0.06] px-2 [scrollbar-width:none] sm:px-3 [&::-webkit-scrollbar]:hidden">
                {[['all', needsTotal] as [NeedKind | 'all', number], ...needKinds].map(([k, n]) => {
                  const on = needFilter === k;
                  return (
                    <button
                      key={k}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setNeedFilter(k)}
                      className={cn(
                        'relative inline-flex h-12 shrink-0 items-center gap-1.5 whitespace-nowrap px-3 text-[13px] touch-manipulation transition-colors',
                        on
                          ? 'font-semibold text-white'
                          : 'font-medium text-white hover:text-elec-yellow'
                      )}
                    >
                      {k === 'all' ? 'All' : KIND_LABEL[k]}
                      <span className="tabular-nums">{n}</span>
                      <span
                        aria-hidden
                        className={cn(
                          'absolute inset-x-3 bottom-0 h-[2px] rounded-full',
                          on ? 'bg-elec-yellow' : 'bg-transparent'
                        )}
                      />
                    </button>
                  );
                })}
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
                  Hours to verify, evidence to review, messages and marking land here as learners
                  send them.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-white/[0.06]">
                {shown.map((row, idx) => {
                  const band = bandOf(row.waitingDays);
                  const bandStart = idx === 0 || bandOf(shown[idx - 1].waitingDays) !== band;
                  const initials =
                    row.kind === 'marking'
                      ? 'Q'
                      : row.kind === 'iqa'
                        ? 'IQ'
                        : row.title
                            .replace(/\(.*?\)/g, '')
                            .split(/\s+/)
                            .filter(Boolean)
                            .slice(0, 2)
                            .map((w) => w[0]?.toUpperCase())
                            .join('');
                  const waiting =
                    row.waitingDays == null
                      ? null
                      : row.waitingDays <= 0
                        ? 'Today'
                        : row.waitingDays === 1
                          ? 'Yesterday'
                          : `${row.waitingDays} days`;
                  const showKind = needFilter === 'all';
                  return (
                    <li key={row.id}>
                      {bandStart && (
                        <div className="flex items-center justify-between gap-3 bg-white/[0.025] px-4 py-2 sm:px-5">
                          <span
                            className={cn(
                              'flex items-center gap-2 text-[12.5px] font-semibold',
                              band === 'recent' ? 'text-white' : 'text-orange-300'
                            )}
                          >
                            <span
                              aria-hidden
                              className={cn(
                                'h-1.5 w-1.5 rounded-full',
                                band === 'recent' ? 'bg-emerald-400' : 'bg-orange-400'
                              )}
                            />
                            {band === 'month'
                              ? 'Waiting over 4 weeks'
                              : band === 'week'
                                ? 'Waiting over a week'
                                : 'This week'}
                          </span>
                          <span className="text-[12.5px] font-semibold tabular-nums text-white">
                            {bandCount(band)}
                          </span>
                        </div>
                      )}
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
                        className="flex w-full cursor-pointer items-center gap-3.5 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:px-5"
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-bold',
                            'bg-white/[0.1] text-white'
                          )}
                        >
                          {initials || '•'}
                        </span>
                        {/* Same row as the inbox bell: the name gets its own
                            line, the reason wraps, the kind sits with the wait. */}
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[15px] font-semibold leading-snug text-white">
                            {row.title}
                          </span>
                          <span className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-white">
                            {row.reason}
                          </span>
                          <span className="mt-1 block text-[12.5px] font-medium text-white lg:hidden">
                            {[showKind ? KIND_LABEL[row.kind] : null, waiting]
                              .filter(Boolean)
                              .join(' · ')}
                          </span>
                        </span>
                        {/* Wide screens: how long and what kind, in their own
                            right-aligned column, so the waits line up to scan. */}
                        <span className="hidden w-[112px] shrink-0 flex-col items-end gap-0.5 text-right lg:flex">
                          {showKind && (
                            <span className="text-[12.5px] font-medium text-white">
                              {KIND_LABEL[row.kind]}
                            </span>
                          )}
                          {waiting && (
                            <span className="text-[13px] font-semibold tabular-nums text-white">
                              {waiting}
                            </span>
                          )}
                        </span>
                        {/* The inbox's verb, outlined: orange already marks what
                            is overdue, so no row is painted solid yellow. */}
                        <span className="hidden h-11 min-w-[96px] shrink-0 items-center justify-center rounded-xl border border-white/[0.18] px-3 text-[13px] font-semibold text-white sm:inline-flex">
                          {row.action}
                        </span>
                        <ChevronRight
                          className="h-4 w-4 shrink-0 text-white sm:hidden"
                          aria-hidden
                        />
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

        {/* Your learners: full width under both columns, the cohorts as cards
            side by side on a wide screen (10 Oct: as a list down the left
            column it ran far below Needs you and left the right half empty). */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="order-last min-w-0 space-y-3 xl:order-none xl:col-span-2 xl:row-start-3"
        >
          <motion.div variants={itemVariants} className="flex items-end justify-between gap-3">
            <CollegeHeading>Your learners</CollegeHeading>
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
              className={cn(CARD_SURFACE, 'rounded-3xl border border-white/[0.08] p-5 sm:p-6')}
            >
              <p className="text-[17px] font-semibold tracking-tight text-white">
                No learners yet.
              </p>
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
          ) : allCohortStats.length === 0 && !todayPending ? (
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
            <motion.ul
              variants={itemVariants}
              className="-mx-4 divide-y divide-white/[0.06] overflow-hidden border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-3 sm:divide-y-0 sm:overflow-visible sm:border-0 sm:bg-none xl:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]"
            >
              {(todayPending ? [] : cohorts).map((c) => (
                <li
                  key={c.id}
                  className="sm:overflow-hidden sm:rounded-2xl sm:border sm:border-white/[0.08] sm:bg-gradient-to-b sm:from-white/[0.07] sm:to-white/[0.025]"
                >
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/college?section=students&cohort=${encodeURIComponent(c.id)}`)
                    }
                    className="flex w-full items-center gap-4 px-5 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07]"
                  >
                    {/* Three plain lines: the cohort, its week, how it is
                        doing. The figure and two pills that sat beside the
                        name squeezed it to two lines on a phone. */}
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold leading-snug text-white">
                        {c.name}
                        {c.is_mine && (
                          <span className="ml-2 text-[12.5px] font-medium text-white">Yours</span>
                        )}
                      </span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-white">
                        {[
                          plural(c.learners, 'learner'),
                          c.next_lesson ? `next ${lessonWhen(c.next_lesson)}` : 'no class booked',
                        ].join(' · ')}
                      </span>
                      <span className="mt-1 block text-[13px] font-semibold leading-snug">
                        <span className="text-white">
                          {c.attendance_pct === null
                            ? 'No attendance yet'
                            : `${c.attendance_pct}% attendance`}
                        </span>
                        <span className="text-white"> · </span>
                        <span className={c.at_risk > 0 ? 'text-orange-300' : 'text-white'}>
                          {c.at_risk > 0 ? `${c.at_risk} to check in with` : 'all fine'}
                        </span>
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                  </button>
                </li>
              ))}
              {todayPending && [0, 1, 2].map((i) => <li key={i} className="h-[68px]" />)}
              {!todayPending && cohorts.length === 0 && (
                <li className="px-5 py-4 text-[13px] text-white">
                  None of {scope.level === 'mine' ? 'your learners’' : 'your'} cohorts here. Pick
                  Whole college at the top to see every cohort.
                </li>
              )}
            </motion.ul>
          )}

          {today && !todayPending && collegeHasLearners && (
            <div className="flex items-center justify-between gap-3 px-1">
              <span className="text-[12px] font-medium text-white">
                {riskUpdated
                  ? `Check-in flags updated ${riskUpdated}`
                  : 'Check-in flags: none computed yet'}
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
        <CollegeHeading>All areas</CollegeHeading>
        {/* One even grid of equal cards, one per area, in the order of the
            work (assess, teach, apprenticeship rules, college). Andrew, 10 Oct:
            "make all these the same size cards". Grouped columns of 3, 5, 4
            and 6 rows could never line up. On a phone it is one list. */}
        <motion.ul
          variants={itemVariants}
          className="-mx-4 divide-y divide-white/[0.06] overflow-hidden border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-3 sm:divide-y-0 sm:overflow-visible sm:border-0 sm:bg-none lg:grid-cols-3 xl:grid-cols-4"
        >
          {groups
            .flatMap((g) => g.items)
            // Settings is in the area navigation on every page, and the demo
            // QR sits beside More detail, so the grid is an even 16.
            .filter((m) => m.label !== 'Settings' && m.label !== 'Try it on your phone')
            .map((m) => (
              <li
                key={m.label}
                className="sm:overflow-hidden sm:rounded-2xl sm:border sm:border-white/[0.08] sm:bg-gradient-to-b sm:from-white/[0.07] sm:to-white/[0.025]"
              >
                <button
                  type="button"
                  onClick={m.go}
                  className="flex min-h-[64px] w-full items-center gap-3 px-5 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:h-[84px]"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-semibold leading-tight text-white">
                      {m.label}
                    </span>
                    <span className="mt-1 line-clamp-2 text-[13px] leading-snug text-white">
                      {m.hint}
                    </span>
                  </span>
                  {m.count ? (
                    <span className="shrink-0 rounded-full bg-elec-yellow px-2 py-0.5 text-[12px] font-bold tabular-nums text-black">
                      {m.count}
                    </span>
                  ) : null}
                  <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                </button>
              </li>
            ))}
        </motion.ul>
      </motion.section>

      {/* ── 5. More detail (collapsed) ───────────────────────────────── */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div
          variants={itemVariants}
          className={cn(
            // minmax(0,…): an implicit track grew to the truncated line's full
            // width and pushed both cards past a phone's right edge.
            'grid grid-cols-[minmax(0,1fr)] gap-3',
            demoCollege && 'sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]'
          )}
        >
          <button
            type="button"
            onClick={toggleMore}
            aria-expanded={moreOpen}
            className="flex min-h-[64px] w-full items-center justify-between gap-4 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] px-5 py-3 text-left text-white transition-colors touch-manipulation hover:border-white/[0.18]"
          >
            <span className="min-w-0">
              <span className="block text-[14.5px] font-semibold">
                {moreOpen ? 'Hide the detail' : 'More detail'}
              </span>
              <span className="block truncate text-[12.5px]">
                Who is at risk, who is heading to EPA, recent activity and compliance
              </span>
            </span>
            <ChevronRight
              className={cn('h-4 w-4 transition-transform', moreOpen && 'rotate-90')}
              aria-hidden
            />
          </button>
          {/* ELE-1854: the presenter's QR, demo college only. */}
          {demoCollege && (
            <button
              type="button"
              onClick={() => navigate('/college/try-on-phone')}
              className="flex min-h-[64px] w-full items-center justify-between gap-4 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] px-5 py-3 text-left text-white transition-colors touch-manipulation hover:border-white/[0.18]"
            >
              <span className="min-w-0">
                <span className="block text-[14.5px] font-semibold">Try it on your phone</span>
                <span className="block truncate text-[12.5px]">
                  A QR that gives a visitor a demo learner
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
            </button>
          )}
        </motion.div>

        {moreOpen && (
          <>
            {/* Redesigned 7 Oct (Andrew: "all these in the dash need to be
                updated and designed better"): one card style, words not
                scores, the real gateway, compliance in one card. */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 items-stretch gap-3 sm:gap-4 lg:grid-cols-3"
            >
              <AtRiskPredictor onNavigate={onNavigate} compact />
              <HomeGatewayCard onNavigate={onNavigate} />
              <HomeActivityCard />
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-3">
              <VerifierInboxWidget />
              <TopExpiringWidget />
              <HomeComplianceCard onNavigate={onNavigate} />
            </motion.div>
          </>
        )}
      </motion.section>

      <CreateInviteSheet open={inviteOpen} onOpenChange={setInviteOpen} />
    </>
  );
}
