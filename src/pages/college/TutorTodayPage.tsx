import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  useTutorToday,
  type TodayLesson,
  type TodayAtRiskLearner,
  type TodayUpcomingDate,
  type TodayCohortStat,
} from '@/hooks/useTutorToday';
import { ShowMePanel } from '@/components/college/compliance/ShowMePanel';
import { LearnerQuickJump } from '@/components/college/sections/LearnerQuickJump';
import { useMarkingQueue } from '@/hooks/useMarkingQueue';
import { INBOX_KIND_LABEL, useUnifiedInbox, type InboxItem } from '@/hooks/useUnifiedInbox';
import { AddPastoralNoteDialog } from '@/components/college/dialogs/AddPastoralNoteDialog';
import { MarkAttendanceSheet } from '@/components/college/sheets/MarkAttendanceSheet';
import { cn } from '@/lib/utils';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  COLLEGE_LIST,
  COLLEGE_ROW,
  CollegePageHeader,
  CollegeSectionTitle,
} from '@/components/college/ui/CollegeUi';
import { useMyLearners } from '@/components/college/assessment/useMyLearners';
import {
  QueueRow,
  ScopeToggle,
  useScope,
  waitingLabel,
} from '@/components/college/assessment/AssessmentKit';

/* ==========================================================================
   TutorTodayPage — /college/today. The tutor's working view of the day.

   Redesigned 7 Oct 2026 on the College Hub kit so it reads like the tutor
   home and the inbox it sends people to:

     header (+ "?", scope; one sentence carries the figures) →
     classes + needs you (left) | at risk + your cohorts + this week (right)
     → look something up

   "Needs you" is the college inbox itself (get_college_inbox via
   useUnifiedInbox), in the inbox's row style with the inbox's verbs, so the
   two pages can never disagree and every row opens the exact item. It used
   to be three hand-built lists (hours, comments, IQA) that all opened the
   inbox's front page.

   Mine first (ELE-1886): classes, the inbox and at-risk learners default to
   the cohorts you lead; one switch shows everyone.

   At-risk rows keep their three in-place actions (register, note, evidence).
   Orange means waiting too long or critical; nothing else is coloured.
   ========================================================================== */

const HELP: PageHelpContent = {
  id: 'college-tutor-today',
  title: 'Your day',
  what: 'What today holds for you: your classes, everything waiting on you from the inbox, learners the risk check has flagged, and what is coming up this week.',
  steps: [
    {
      title: 'Check your classes',
      body: 'Today’s classes, yours first. Tap one to open the lesson and take the register.',
    },
    {
      title: 'Clear what needs you',
      body: 'Hours to verify, evidence to assess, replies, IQA and reviews, oldest first. The button says what to do and opens the exact item.',
    },
    {
      title: 'Look after flagged learners',
      body: 'Register, add a note or look at their evidence without leaving the page.',
    },
  ],
  legend: [
    {
      swatch: 'bg-orange-500',
      label: 'Waiting too long or critical',
      body: 'Hours or evidence over a week, a message over two days, a critical risk score.',
    },
    { swatch: 'bg-white', label: 'Yours', body: 'Learners in the cohorts you lead.' },
  ],
  notes: [
    {
      title: 'Mine, My cohorts or Whole college',
      body: 'The switch at the top picks whose work you see, for the whole College Hub. Pick Whole college to cover for a colleague.',
    },
    {
      title: 'Same list as the inbox',
      body: 'Needs you is the college inbox, so its count matches the bell and the inbox page.',
    },
  ],
};

function formatDate(iso: string): string {
  return new Date(`${iso.slice(0, 10)}T12:00:00`).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

export default function TutorTodayPage() {
  return (
    <HubPage ground="landing">
      <HubMasthead section="College" title="Today" backTo="/college" />
      <HubBody pushContext="Get notified about marking, off-the-job hours and learners who need you">
        <TutorTodayBody mode="page" />
      </HubBody>
    </HubPage>
  );
}

/** TutorTodayBody — the day's content, exported so it can be embedded.

    `mode="page"` is the standalone route and adds the learner lookup and the
    inspector search at the foot. `mode="embed"` adds a compact heading with a
    link to the full page; `mode="embed-bare"` renders the content only. */
export function TutorTodayBody({ mode = 'page' }: { mode?: 'page' | 'embed' | 'embed-bare' } = {}) {
  const { data, loading, error, refresh } = useTutorToday();
  const { stats: markingStats } = useMarkingQueue();
  const { items: inboxItems, loading: inboxLoading } = useUnifiedInbox();
  const navigate = useNavigate();
  const my = useMyLearners();
  const [scope, setScope] = useScope('tutor-today', my);
  const mine = scope === 'mine';

  const [pastoralNoteFor, setPastoralNoteFor] = useState<{ id: string; name: string } | null>(null);
  const [attendanceFor, setAttendanceFor] = useState<{ id: string; name: string } | null>(null);

  const lessons = useMemo(() => {
    const all = [...(data?.lessons ?? [])].sort(
      (a, b) =>
        Number(b.is_mine) - Number(a.is_mine) ||
        (a.scheduled_start_time ?? '').localeCompare(b.scheduled_start_time ?? '')
    );
    return mine ? all.filter((l) => l.is_mine) : all;
  }, [data?.lessons, mine]);
  const lessonsAll = data?.lessons.length ?? 0;

  // useUnifiedInbox already follows the College Hub scope, so this is the
  // inbox's own list and count. Filtering again by `mine` here made Today
  // say 89 while the inbox said 90.
  const needs = useMemo(() => {
    return [...inboxItems].sort(
      (a, b) => Number(b.urgent) - Number(a.urgent) || b.waitingDays - a.waitingDays
    );
  }, [inboxItems]);
  const needsShown = needs.slice(0, 8);
  const urgentCount = needs.filter((i) => i.urgent).length;

  const atRisk = useMemo(() => {
    const all = data?.atRisk ?? [];
    return mine
      ? all.filter((r) => my.isMine({ studentId: r.student_id, cohortName: r.cohort_name }))
      : all;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.atRisk, mine, my.loading]);
  const criticalCount = atRisk.filter((l) => l.level === 'critical').length;

  const cohorts = useMemo(() => {
    const all = data?.cohortStats ?? [];
    return mine ? all.filter((c) => c.is_mine) : all;
  }, [data?.cohortStats, mine]);

  const nextLesson = lessons.find((l) => l.scheduled_start_time) ?? null;
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const headline =
    loading && !data
      ? 'Gathering your day…'
      : [
          lessons.length ? plural(lessons.length, 'class', 'classes') : 'No classes',
          needs.length ? `${needs.length} waiting on you` : 'nothing waiting',
        ].join(', ');

  // The one sentence under the title carries the day's figures (the four
  // figure tiles that repeated them are gone, as on the home page).
  const summary = !data
    ? mine
      ? 'Your classes, what is waiting on you and your flagged learners, for the cohorts you lead.'
      : 'Every class, everything waiting and every flagged learner across the college.'
    : [
        lessons.length === 0
          ? mine && lessonsAll > 0
            ? `${plural(lessonsAll, 'class', 'classes')} at the college today, none yours`
            : 'Nothing on the timetable today'
          : nextLesson?.scheduled_start_time
            ? `First class at ${nextLesson.scheduled_start_time.slice(0, 5)}`
            : `${plural(lessons.length, 'class', 'classes')} today`,
        urgentCount > 0
          ? `${urgentCount} waiting over a week`
          : needs.length
            ? 'nothing overdue'
            : null,
        markingStats.awaiting_review > 0
          ? `${plural(markingStats.awaiting_review, 'quiz attempt')} to sign off`
          : null,
        atRisk.length > 0
          ? criticalCount > 0
            ? `${criticalCount} critical on the risk check`
            : `${plural(atRisk.length, 'learner')} flagged`
          : null,
      ]
        .filter(Boolean)
        .join(' · ') + '.';

  const open = (i: InboxItem) => navigate(i.href);

  return (
    <>
      {mode === 'embed' && (
        <CollegeSectionTitle
          title="Today"
          action={
            <button
              type="button"
              onClick={() => navigate('/college/today')}
              className="inline-flex h-11 items-center px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
            >
              Open full view
            </button>
          }
        />
      )}

      {mode === 'page' && (
        <CollegePageHeader
          eyebrow={today}
          title={headline}
          description={summary}
          help={HELP}
          actions={
            <>
              <ScopeToggle scope={scope} onChange={setScope} my={my} />
              <button
                type="button"
                onClick={() => navigate('/college/inbox')}
                className={COLLEGE_BTN_PRIMARY}
              >
                Open the inbox
              </button>
            </>
          }
        />
      )}

      {error && (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-orange-500/40 px-4 py-3">
          <p className="text-[13.5px] text-white">Couldn’t load today: {error}</p>
          <button
            type="button"
            onClick={() => void refresh()}
            className="h-11 px-3 text-[13px] font-semibold text-elec-yellow touch-manipulation"
          >
            Try again
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_400px]">
        {/* Left: classes, then the work */}
        <div className="min-w-0 space-y-6">
          <section id="classes" className="scroll-mt-20 space-y-3">
            <CollegeSectionTitle
              title="Today’s classes"
              sub={
                mine
                  ? 'Classes for the cohorts you lead'
                  : 'Every class at the college, yours first'
              }
              action={
                <button
                  type="button"
                  onClick={() => navigate('/college?section=attendance')}
                  className="inline-flex h-11 items-center px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                >
                  Take a register
                </button>
              }
            />
            {loading && !data ? (
              <div className="h-[120px] animate-pulse rounded-3xl bg-white/[0.04]" />
            ) : lessons.length === 0 ? (
              <div className={cn(COLLEGE_CARD, 'py-5')}>
                <p className="text-[14.5px] font-semibold text-white">No classes today</p>
                <p className="mt-1 text-[13px] text-white">
                  {mine && lessonsAll > 0
                    ? `${plural(lessonsAll, 'class', 'classes')} at the college today, none in your cohorts. Pick Whole college at the top to see them.`
                    : 'This week’s classes are listed on the right.'}
                </p>
              </div>
            ) : (
              <ul className={COLLEGE_LIST}>
                {lessons.map((l) => (
                  <LessonRow
                    key={l.id}
                    lesson={l}
                    onOpen={() => navigate(`/college/lessons/${l.id}`)}
                  />
                ))}
              </ul>
            )}
          </section>

          <section id="needs" className="scroll-mt-20 space-y-3">
            <CollegeSectionTitle
              title="Needs you"
              sub="From the inbox, waiting too long first"
              action={
                <button
                  type="button"
                  onClick={() => navigate('/college/inbox')}
                  className="inline-flex h-11 items-center gap-1 px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                >
                  Open the inbox <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              }
            />
            {inboxLoading ? (
              <div className="space-y-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-[84px] animate-pulse rounded-2xl bg-white/[0.04]" />
                ))}
              </div>
            ) : needs.length === 0 ? (
              <div className={cn(COLLEGE_CARD, 'py-5')}>
                <p className="text-[14.5px] font-semibold text-white">Nothing waiting on you</p>
                <p className="mt-1 text-[13px] text-white">
                  Hours, evidence, replies, IQA and reviews land here as they arrive.
                  {mine && inboxItems.length > 0
                    ? ` ${inboxItems.length} waiting across the college.`
                    : ''}
                </p>
              </div>
            ) : (
              <ul className="-mx-4 divide-y divide-white/[0.06] overflow-hidden border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] sm:mx-0 sm:rounded-3xl sm:border-x">
                {needsShown.map((i) => (
                  <li key={i.key}>
                    <QueueRow
                      name={i.learner ?? i.title}
                      avatar={i.kind === 'marking' ? 'Q' : i.kind === 'iqa' ? 'IQ' : undefined}
                      kind={INBOX_KIND_LABEL[i.kind]}
                      mine={i.mine && !mine}
                      title={i.learner ? i.title : undefined}
                      body={i.body}
                      urgent={i.urgent}
                      meta={
                        <>
                          <b className="font-semibold">
                            {i.kind === 'review'
                              ? i.waitingDays > 0
                                ? `${i.waitingDays} days overdue`
                                : 'Coming up'
                              : i.kind === 'checkin'
                                ? 'Flagged today'
                                : waitingLabel(i.waitingDays)}
                          </b>
                          {i.cohort ? ` · ${i.cohort}` : ''}
                        </>
                      }
                      action={i.action}
                      onOpen={() => open(i)}
                    />
                  </li>
                ))}
                {needs.length > needsShown.length && (
                  <li>
                    <button
                      type="button"
                      onClick={() => navigate('/college/inbox')}
                      className="flex h-12 w-full items-center justify-center gap-1 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.04]"
                    >
                      {needs.length - needsShown.length} more in the inbox{' '}
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </li>
                )}
              </ul>
            )}
          </section>
        </div>

        {/* Right: who needs a check-in, cohorts, the week */}
        <aside className="min-w-0 space-y-6">
          <section id="atrisk" className="scroll-mt-20 space-y-3">
            <CollegeSectionTitle
              title="Flagged learners"
              sub="High or critical on the risk check"
            />
            {loading && !data ? (
              <div className="h-[120px] animate-pulse rounded-3xl bg-white/[0.04]" />
            ) : atRisk.length === 0 ? (
              <div className={cn(COLLEGE_CARD, 'py-5')}>
                <p className="text-[14.5px] font-semibold text-white">Nobody flagged</p>
                <p className="mt-1 text-[13px] text-white">
                  No-one at high or critical risk{mine ? ' in your cohorts' : ''}.
                </p>
              </div>
            ) : (
              <ul className={COLLEGE_LIST}>
                {atRisk.map((r) => (
                  <AtRiskRow
                    key={r.student_id}
                    row={r}
                    onOpenLearner={() =>
                      navigate(`/college?section=student360&studentId=${r.student_id}`)
                    }
                    onOpenEvidence={() => navigate(`/college/students/${r.student_id}/evidence`)}
                    onAddNote={() => setPastoralNoteFor({ id: r.student_id, name: r.student_name })}
                    onMarkAttendance={() =>
                      setAttendanceFor({ id: r.student_id, name: r.student_name })
                    }
                  />
                ))}
              </ul>
            )}
          </section>

          {cohorts.length > 0 && (
            <CohortsCard
              cohorts={cohorts}
              onOpen={(id) =>
                navigate(`/college?section=students&cohort=${encodeURIComponent(id)}`)
              }
            />
          )}

          <section id="week" className="scroll-mt-20 space-y-3">
            <CollegeSectionTitle
              title="This week"
              sub="Classes, observations, IQA actions and EPA briefs"
            />
            {!data || data.thisWeek.length === 0 ? (
              <div className={cn(COLLEGE_CARD, 'py-5')}>
                <p className="text-[13.5px] text-white">Nothing in the next 7 days.</p>
              </div>
            ) : (
              <ul className={COLLEGE_LIST}>
                {data.thisWeek.map((u, i) => (
                  <UpcomingRow
                    key={`${u.kind}-${i}`}
                    upcoming={u}
                    onOpen={() => navigate(u.href)}
                  />
                ))}
              </ul>
            )}
          </section>
        </aside>
      </div>

      {/* Look something up — Student 360 by name, then the inspector-day
          "show me" search. Below the day's work, not above it. */}
      {mode === 'page' && (
        <section className="space-y-3">
          <CollegeSectionTitle
            title="Look something up"
            sub="Find a learner, or answer an inspector’s question"
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="min-w-0 lg:[&>*]:h-full"
            >
              <LearnerQuickJump />
            </motion.div>
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="min-w-0 lg:[&>*]:h-full"
            >
              <ShowMePanel />
            </motion.div>
          </div>
        </section>
      )}
      {mode !== 'page' && (
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <ShowMePanel />
        </motion.div>
      )}

      <AddPastoralNoteDialog
        open={pastoralNoteFor !== null}
        onOpenChange={(o) => {
          if (!o) setPastoralNoteFor(null);
        }}
        studentId={pastoralNoteFor?.id ?? ''}
        studentName={pastoralNoteFor?.name ?? ''}
        onSaved={() => {
          setPastoralNoteFor(null);
          void refresh();
        }}
      />
      <MarkAttendanceSheet
        open={attendanceFor !== null}
        onOpenChange={(o) => {
          if (!o) setAttendanceFor(null);
        }}
        studentId={attendanceFor?.id ?? ''}
        studentName={attendanceFor?.name ?? ''}
        onSaved={() => {
          setAttendanceFor(null);
          void refresh();
        }}
      />
    </>
  );
}

/* ── Rows ───────────────────────────────────────────────────────────── */

function LessonRow({ lesson, onOpen }: { lesson: TodayLesson; onOpen: () => void }) {
  const start = lesson.scheduled_start_time?.slice(0, 5) ?? null;
  const reason = [
    lesson.cohort_name,
    lesson.duration_minutes ? `${lesson.duration_minutes} min` : null,
    lesson.status && lesson.status !== 'ready' ? lesson.status : null,
  ]
    .filter(Boolean)
    .join(' · ');
  return (
    <li>
      <button type="button" onClick={onOpen} className={COLLEGE_ROW}>
        <span className="flex w-14 shrink-0 flex-col items-start">
          <span className="text-[17px] font-bold tabular-nums leading-none text-white">
            {start ?? '—'}
          </span>
          {lesson.duration_minutes ? (
            <span className="mt-1 text-[12px] text-white">{lesson.duration_minutes} min</span>
          ) : null}
        </span>
        <span className="min-w-0 flex-1">
          <span className="line-clamp-2 block text-[14.5px] font-semibold leading-snug text-white">
            {lesson.title}
          </span>
          <span className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] text-white">
            <span>{reason || 'Class today'}</span>
            {lesson.is_mine && (
              <span className="shrink-0 rounded-full border border-white/[0.4] px-2 py-px text-[12px] font-semibold">
                Yours
              </span>
            )}
          </span>
        </span>
        <span className="hidden h-11 min-w-[96px] shrink-0 items-center justify-center rounded-xl border border-white/[0.18] px-3 text-[13px] font-semibold text-white sm:inline-flex">
          Open
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-white sm:hidden" aria-hidden="true" />
      </button>
    </li>
  );
}

const RISK_LABEL: Record<TodayAtRiskLearner['level'], string> = {
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

function AtRiskRow({
  row,
  onOpenLearner,
  onOpenEvidence,
  onAddNote,
  onMarkAttendance,
}: {
  row: TodayAtRiskLearner;
  onOpenLearner: () => void;
  onOpenEvidence: () => void;
  onAddNote: () => void;
  onMarkAttendance: () => void;
}) {
  const critical = row.level === 'critical';
  const reason = row.top_factors.filter(Boolean).join(' · ');
  const initials = row.student_name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
  return (
    <li className="px-5 py-4 sm:px-6">
      <button
        type="button"
        onClick={onOpenLearner}
        className="flex w-full min-h-11 items-center gap-3 text-left touch-manipulation"
      >
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.1] text-[13px] font-bold text-white"
        >
          {initials}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block break-words text-[15px] font-semibold leading-snug text-white">
            {row.student_name}
          </span>
          <span className="mt-0.5 block text-[13px] leading-snug">
            <span className={cn('font-semibold', critical ? 'text-orange-300' : 'text-white')}>
              {RISK_LABEL[row.level]} risk
            </span>
            {row.cohort_name ? <span className="text-white"> · {row.cohort_name}</span> : null}
          </span>
          <span className="mt-0.5 line-clamp-3 block text-[12.5px] leading-snug text-white">
            {reason || 'Flagged by the risk check'}
          </span>
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
      </button>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <button type="button" onClick={onMarkAttendance} className={cn(COLLEGE_BTN, 'px-2')}>
          Register
        </button>
        <button type="button" onClick={onAddNote} className={cn(COLLEGE_BTN, 'px-2')}>
          Add note
        </button>
        <button type="button" onClick={onOpenEvidence} className={cn(COLLEGE_BTN, 'px-2')}>
          Evidence
        </button>
      </div>
    </li>
  );
}

/** Each cohort: attendance over 28 days as a bar, learners and flagged. */
function CohortsCard({
  cohorts,
  onOpen,
}: {
  cohorts: TodayCohortStat[];
  onOpen: (id: string) => void;
}) {
  return (
    <section className="space-y-3">
      <CollegeSectionTitle title="Cohorts" sub="Attendance over the last 28 days" />
      <ul className={COLLEGE_LIST}>
        {cohorts.slice(0, 6).map((c) => {
          const low = c.attendance_pct !== null && c.attendance_pct < 85;
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => onOpen(c.id)}
                className={cn(COLLEGE_ROW, 'flex-col items-stretch gap-2 py-3.5')}
              >
                <span className="flex items-baseline justify-between gap-3">
                  <span className="min-w-0 break-words text-[14px] font-semibold text-white">
                    {c.name}
                  </span>
                  <span
                    className={cn(
                      'shrink-0 text-[15px] font-bold tabular-nums',
                      low ? 'text-orange-400' : 'text-white'
                    )}
                  >
                    {c.attendance_pct === null ? '—' : `${c.attendance_pct}%`}
                  </span>
                </span>
                <span className="block h-2 overflow-hidden rounded-full bg-white/[0.08]">
                  <motion.span
                    className={cn('block h-full rounded-full', low ? 'bg-orange-500' : 'bg-white')}
                    initial={{ width: 0 }}
                    animate={{ width: `${c.attendance_pct ?? 0}%` }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                  />
                </span>
                <span className="text-[12px] text-white">
                  {plural(c.learners, 'learner')}
                  {c.at_risk > 0 ? ` · ${c.at_risk} flagged` : ''}
                  {c.attendance_pct === null ? ' · no register yet' : ''}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

const UPCOMING_KIND: Record<TodayUpcomingDate['kind'], string> = {
  lesson: 'Class',
  observation_due: 'Observation follow-up',
  iqa_action: 'IQA action',
  epa_brief: 'EPA brief',
};

function UpcomingRow({ upcoming, onOpen }: { upcoming: TodayUpcomingDate; onOpen: () => void }) {
  const d = new Date(`${upcoming.date.slice(0, 10)}T12:00:00`);
  return (
    <li>
      <button type="button" onClick={onOpen} className={cn(COLLEGE_ROW, 'gap-4')}>
        {/* A small day block ("Tue / 13") reads at a glance; the title gets the width. */}
        <span
          aria-label={formatDate(upcoming.date)}
          className="flex w-11 shrink-0 flex-col items-center rounded-xl border border-white/[0.12] py-1.5"
        >
          <span className="text-[12px] font-semibold text-white">
            {d.toLocaleDateString('en-GB', { weekday: 'short' })}
          </span>
          <span className="text-[17px] font-bold leading-none tabular-nums text-white">
            {d.getDate()}
          </span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="line-clamp-2 block text-[14px] font-semibold leading-snug text-white">
            {upcoming.title}
          </span>
          <span className="mt-0.5 block text-[12.5px] text-white">
            {UPCOMING_KIND[upcoming.kind]}
          </span>
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
      </button>
    </li>
  );
}
