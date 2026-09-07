import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import {
  HubPage,
  HubBody,
  HubMasthead,
  HubKpi,
  HubKpiRow,
  HubSectionHeading,
} from '@/components/hub/HubPrimitives';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import {
  useTutorToday,
  type TodayLesson,
  type TodayPortfolioComment,
  type TodayOtjPending,
  type TodayIqaPending,
  type TodayAtRiskLearner,
  type TodayUpcomingDate,
} from '@/hooks/useTutorToday';
import { ShowMePanel } from '@/components/college/compliance/ShowMePanel';
import { LearnerQuickJump } from '@/components/college/sections/LearnerQuickJump';
import { useMarkingQueue } from '@/hooks/useMarkingQueue';
import { useUnifiedInbox } from '@/hooks/useUnifiedInbox';
import { AddPastoralNoteDialog } from '@/components/college/dialogs/AddPastoralNoteDialog';
import { MarkAttendanceSheet } from '@/components/college/sheets/MarkAttendanceSheet';
import { cn } from '@/lib/utils';

/* ==========================================================================
   TutorTodayPage — /college/today

   The tutor's working view of the day, rebuilt on the shared hub shell
   (`@/components/hub/HubPrimitives`) so it reads as a continuation of the
   College dashboard that sends people here.

     masthead → KPI row → classes → inbox → at risk → this week → look up

   What went, and why:

   The HERO. A greeting, a date eyebrow, a 36px headline and a paragraph
   restating the strip beneath it — roughly 200px before a tutor reached a
   single row they could act on.

   The FIVE-CELL STRIP. Classes / OTJ / comments / IQA / at risk, each a bare
   number with no verdict. Now four KPIs (the cap) with a line of judgement
   each — the three inbox counts fold into "Waiting on you", which is also
   what the dashboard calls it, so the two pages agree.

   The two CALLOUT CARDS (inbox, marking). Both were a third copy of a number
   already on the strip. Marking is now the third KPI; the inbox is the second,
   and the inbox section below carries the rows themselves.

   Every list is now one card in the work-list language — rule, title,
   reason, trailing figure, chevron — and every row is the tap target. The
   at-risk rows keep their three in-place actions (register, note, evidence)
   because that is the whole point of surfacing them here.

   Everything is `text-white`. Off-system colours (blue, purple, orange,
   amber pills) are gone; red survives only for a critical risk level.
   ========================================================================== */

const DAY_MS = 86_400_000;

function daysAgo(iso: string | null | undefined): number | null {
  if (!iso) return null;
  const t = new Date(iso).getTime();
  if (!Number.isFinite(t)) return null;
  return Math.max(0, Math.floor((Date.now() - t) / DAY_MS));
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
}

function formatRel(iso: string | null | undefined): string {
  if (!iso) return '—';
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / DAY_MS);
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

export default function TutorTodayPage() {
  return (
    <HubPage>
      <HubMasthead section="College" title="Today" backTo="/college" />
      <HubBody pushContext="Get notified about marking, off-the-job hours and learners who need you">
        <TutorTodayBody mode="page" />
      </HubBody>
    </HubPage>
  );
}

/** TutorTodayBody — the day's content, exported so it can be embedded.

    `mode="page"` is the standalone route: the page shell (masthead, body)
    is provided by TutorTodayPage, and this adds the learner lookup and the
    inspector search at the foot. `mode="embed"` adds a compact heading with a
    link to the full page; `mode="embed-bare"` renders the content only. The
    dashboard no longer embeds this, but the modes still work. */
export function TutorTodayBody({ mode = 'page' }: { mode?: 'page' | 'embed' | 'embed-bare' } = {}) {
  const { data, loading, error, refresh } = useTutorToday();
  const { stats: markingStats } = useMarkingQueue();
  const { stats: inboxStats } = useUnifiedInbox();
  const navigate = useNavigate();

  // Quick actions — open inline sheets pre-filled with the chosen learner so
  // the tutor never has to navigate away to add a pastoral note or take a
  // single-learner register entry.
  const [pastoralNoteFor, setPastoralNoteFor] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [attendanceFor, setAttendanceFor] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const counts = data?.counts;
  const lessonsToday = counts?.lessons_today ?? 0;
  const mineToday = data?.lessons.filter((l) => l.is_mine).length ?? 0;
  const atRiskCount = counts?.at_risk ?? 0;
  const criticalCount = data?.atRisk.filter((l) => l.level === 'critical').length ?? 0;
  const inboxHere =
    (data?.comments.length ?? 0) + (data?.otj.length ?? 0) + (data?.iqa.length ?? 0);

  // Oldest unverified off-the-job entry — a week unverified starts to cost
  // the learner their hours record, so it is the inbox KPI's verdict.
  const oldestOtjDays = useMemo(() => {
    const ages = (data?.otj ?? [])
      .map((o) => daysAgo(o.created_at ?? o.activity_date))
      .filter((d): d is number => d !== null);
    return ages.length ? Math.max(...ages) : null;
  }, [data?.otj]);

  const inboxBreakdown =
    [
      inboxStats.otj > 0 ? `${inboxStats.otj} off-the-job` : null,
      inboxStats.portfolio > 0 ? plural(inboxStats.portfolio, 'comment') : null,
      inboxStats.iqa > 0 ? `${inboxStats.iqa} IQA` : null,
      inboxStats.message > 0 ? plural(inboxStats.message, 'message') : null,
    ]
      .filter(Boolean)
      .join(' · ') || undefined;

  const nextLesson = data?.lessons.find((l) => l.scheduled_start_time) ?? null;

  return (
    <>
      {mode === 'embed' && (
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="flex items-end justify-between gap-4"
        >
          <HubSectionHeading>Today</HubSectionHeading>
          <button
            type="button"
            onClick={() => navigate('/college/today')}
            className="-my-2 flex h-11 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation"
          >
            Open full view
          </button>
        </motion.div>
      )}

      {error && (
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className={cn(
            'flex min-h-11 items-center justify-between gap-3 rounded-2xl border border-red-400/40 px-4 py-3',
            CARD_SURFACE
          )}
        >
          <span className="text-[13px] font-medium text-white">Could not load today — {error}</span>
          <button
            type="button"
            onClick={refresh}
            className="-my-2 flex h-11 shrink-0 items-center px-2 text-[12px] font-bold text-elec-yellow touch-manipulation"
          >
            Retry
          </button>
        </motion.div>
      )}

      {/* Four KPIs, capped at four on purpose, each with a verdict. The
          first is the accent; the others earn colour only through
          sentiment. Figures show a dash until the data lands rather than a
          fabricated zero. */}
      <HubKpiRow>
        <HubKpi
          accent
          label="Classes today"
          value={data ? String(lessonsToday) : '—'}
          verdict={
            !data
              ? undefined
              : lessonsToday === 0
                ? 'No classes booked'
                : nextLesson?.scheduled_start_time
                  ? `First at ${nextLesson.scheduled_start_time.slice(0, 5)}`
                  : 'Times not set'
          }
          context={
            data && lessonsToday > 0
              ? mineToday > 0
                ? `${mineToday} of them yours`
                : 'None assigned to you'
              : undefined
          }
          onClick={() => scrollTo('classes')}
        />
        <HubKpi
          label="Waiting on you"
          value={String(inboxStats.total)}
          verdict={
            oldestOtjDays !== null && oldestOtjDays >= 7
              ? `Oldest has sat ${oldestOtjDays} days`
              : inboxStats.total > 0
                ? 'Clear the inbox before it grows'
                : 'Inbox clear'
          }
          context={inboxBreakdown}
          sentiment={oldestOtjDays !== null && oldestOtjDays >= 7 ? 'bad' : 'neutral'}
          onClick={() => navigate('/college/inbox')}
        />
        <HubKpi
          label="To sign off"
          value={String(markingStats.total_pending)}
          verdict={
            markingStats.awaiting_review > 0
              ? `${plural(markingStats.awaiting_review, 'attempt')} ready to sign off`
              : markingStats.awaiting_ai > 0
                ? `${plural(markingStats.awaiting_ai, 'attempt')} still grading`
                : 'All caught up'
          }
          context={
            markingStats.awaiting_review > 0 && markingStats.awaiting_ai > 0
              ? `${markingStats.awaiting_ai} still grading`
              : undefined
          }
          sentiment={markingStats.awaiting_review > 0 ? 'bad' : 'neutral'}
          onClick={() => navigate('/college/marking')}
        />
        <HubKpi
          label="At risk"
          value={data ? String(atRiskCount) : '—'}
          verdict={
            !data
              ? undefined
              : criticalCount > 0
                ? `${criticalCount} critical — check in today`
                : atRiskCount > 0
                  ? 'Worth a check-in this week'
                  : 'Nothing flagged'
          }
          context={
            atRiskCount > 0 && data?.atRisk[0]?.top_factor
              ? `Top factor: ${data.atRisk[0].top_factor}`
              : undefined
          }
          sentiment={atRiskCount > 0 ? 'bad' : 'neutral'}
          onClick={() => scrollTo('atrisk')}
        />
      </HubKpiRow>

      {loading && !data && (
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="py-10 text-center text-[12.5px] font-medium text-white"
        >
          Loading your day…
        </motion.div>
      )}

      {data && (
        <>
          <ListSection
            id="classes"
            heading="Today's classes"
            count={data.lessons.length > 0 ? plural(data.lessons.length, 'lesson') : undefined}
            empty={data.lessons.length === 0}
            emptyText="No classes scheduled today. This week's are listed below."
          >
            {data.lessons.map((l) => (
              <LessonRow
                key={l.id}
                lesson={l}
                onOpen={() => navigate(`/college/lessons/${l.id}`)}
              />
            ))}
          </ListSection>

          <ListSection
            id="inbox"
            heading="Inbox"
            count={inboxHere > 0 ? `${inboxHere} pending` : undefined}
            urgent={oldestOtjDays !== null && oldestOtjDays >= 7}
            action={{ label: 'Open inbox', onClick: () => navigate('/college/inbox') }}
            empty={inboxHere === 0}
            emptyText="Nothing waiting on you right now."
          >
            {data.otj.length > 0 && (
              <GroupLabel label="Off-the-job to verify" count={data.otj.length} />
            )}
            {data.otj.map((o) => (
              <OtjRow key={o.id} otj={o} onOpen={() => navigate('/college/inbox?tab=otj')} />
            ))}
            {data.comments.length > 0 && (
              <GroupLabel label="Comments needing a reply" count={data.comments.length} />
            )}
            {data.comments.map((c) => (
              <CommentRow
                key={c.id}
                comment={c}
                onOpen={() => navigate('/college/inbox?tab=portfolio')}
              />
            ))}
            {data.iqa.length > 0 && (
              <GroupLabel label="IQA samples awaiting a verdict" count={data.iqa.length} />
            )}
            {data.iqa.map((s) => (
              <IqaRow
                key={s.id}
                sample={s}
                onOpen={() => navigate(`/college/iqa/sampling/${s.sampling_plan_id}`)}
              />
            ))}
          </ListSection>

          <ListSection
            id="atrisk"
            heading="At-risk learners"
            count={data.atRisk.length > 0 ? `${data.atRisk.length} need attention` : undefined}
            urgent={data.atRisk.length > 0}
            empty={data.atRisk.length === 0}
            emptyText="No-one at high or critical risk. Cohort risk is low or medium across the board."
          >
            {data.atRisk.map((r) => (
              <AtRiskRow
                key={r.student_id}
                row={r}
                onOpenLearner={() => navigate(`/college/students/${r.student_id}`)}
                onOpenEvidence={() => navigate(`/college/students/${r.student_id}/evidence`)}
                onAddNote={() => setPastoralNoteFor({ id: r.student_id, name: r.student_name })}
                onMarkAttendance={() =>
                  setAttendanceFor({ id: r.student_id, name: r.student_name })
                }
              />
            ))}
          </ListSection>

          <ListSection
            id="week"
            heading="This week"
            count={data.thisWeek.length > 0 ? `${data.thisWeek.length} upcoming` : undefined}
            empty={data.thisWeek.length === 0}
            emptyText="No lessons or observation follow-ups in the next 7 days."
          >
            {data.thisWeek.map((u, i) => (
              <UpcomingRow key={`${u.kind}-${i}`} upcoming={u} onOpen={() => navigate(u.href)} />
            ))}
          </ListSection>
        </>
      )}

      {/* Look something up — Student 360 by name, then the inspector-day
          "show me" search. Below the day's work, not above it: a tutor
          between classes is here for the rows, and the search is a scroll
          away when Ofsted is in the building. */}
      {mode === 'page' && (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <HubSectionHeading>Look something up</HubSectionHeading>
          <motion.div variants={itemVariants}>
            <LearnerQuickJump />
          </motion.div>
          <motion.div variants={itemVariants}>
            <ShowMePanel />
          </motion.div>
        </motion.section>
      )}
      {mode !== 'page' && (
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <ShowMePanel />
        </motion.div>
      )}

      {/* Quick-action sheets — pre-filled with the chosen learner */}
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

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ──────────────────────────────────────────────────────────
   Section — heading row + one card in the work-list language.
   ────────────────────────────────────────────────────────── */

/** The work-list row: rule, words, trailing figure, chevron. Whole row taps. */
const ROW_BUTTON =
  'flex w-full min-h-11 items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5';

function Rule({ urgent }: { urgent?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'h-8 w-[3px] shrink-0 rounded-full',
        urgent ? 'bg-elec-yellow' : 'bg-white/[0.25]'
      )}
    />
  );
}

function ListSection({
  id,
  heading,
  count,
  urgent,
  action,
  empty,
  emptyText,
  children,
}: {
  id: string;
  heading: string;
  /** Right-hand count in the heading row — volt when `urgent`. */
  count?: string;
  urgent?: boolean;
  /** A quiet volt text action beside the heading (never a second button). */
  action?: { label: string; onClick: () => void };
  empty: boolean;
  /** Empty states say what they are — a card that vanishes looks broken. */
  emptyText: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="scroll-mt-16 space-y-3"
    >
      <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
        <HubSectionHeading>{heading}</HubSectionHeading>
        <div className="flex shrink-0 items-center gap-3">
          {count && (
            <span
              className={cn(
                'text-[11px] font-semibold tabular-nums',
                urgent ? 'text-elec-yellow' : 'text-white'
              )}
            >
              {count}
            </span>
          )}
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className="-my-2 -mr-2 flex h-11 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation"
            >
              {action.label}
            </button>
          )}
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className={cn(
          '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
          CARD_SURFACE
        )}
      >
        {empty ? (
          <p className="px-4 py-5 text-[13px] leading-snug text-white sm:px-5">{emptyText}</p>
        ) : (
          <ul className="divide-y divide-white/[0.10]">{children}</ul>
        )}
      </motion.div>
    </motion.section>
  );
}

/** A quiet label between groups inside one card — words, not a coloured band. */
function GroupLabel({ label, count }: { label: string; count: number }) {
  return (
    <li className="flex items-baseline justify-between gap-3 px-4 pb-1.5 pt-3 sm:px-5">
      <span className="text-[11.5px] font-semibold text-white">{label}</span>
      <span className="text-[11px] font-semibold tabular-nums text-white">{count}</span>
    </li>
  );
}

/* ──────────────────────────────────────────────────────────
   Rows
   ────────────────────────────────────────────────────────── */

function LessonRow({ lesson, onOpen }: { lesson: TodayLesson; onOpen: () => void }) {
  const start = lesson.scheduled_start_time?.slice(0, 5) ?? null;
  const reason = [
    lesson.cohort_name,
    lesson.duration_minutes ? `${lesson.duration_minutes} min` : null,
    lesson.is_mine ? 'Your class' : null,
    lesson.status && lesson.status !== 'ready' ? lesson.status : null,
  ]
    .filter(Boolean)
    .join(' · ');
  return (
    <li>
      <button type="button" onClick={onOpen} className={ROW_BUTTON}>
        <Rule urgent={lesson.is_mine} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold leading-tight text-white">
            {lesson.title}
          </span>
          <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
            {reason || 'Class today'}
          </span>
        </span>
        {start && (
          <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
            {start}
          </span>
        )}
        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
      </button>
    </li>
  );
}

function OtjRow({ otj, onOpen }: { otj: TodayOtjPending; onOpen: () => void }) {
  const hours = otj.duration_minutes != null ? `${(otj.duration_minutes / 60).toFixed(1)}h` : null;
  const age = daysAgo(otj.created_at ?? otj.activity_date);
  const urgent = age !== null && age >= 7;
  return (
    <li>
      <button type="button" onClick={onOpen} className={ROW_BUTTON}>
        <Rule urgent={urgent} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold leading-tight text-white">
            {otj.student_name ?? 'Learner'}
          </span>
          <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
            {[otj.title, otj.cohort_name, formatDate(otj.activity_date)]
              .filter(Boolean)
              .join(' · ')}
          </span>
        </span>
        {hours && (
          <span
            className={cn(
              'shrink-0 text-[13px] font-semibold tabular-nums',
              urgent ? 'text-elec-yellow' : 'text-white'
            )}
          >
            {hours}
          </span>
        )}
        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
      </button>
    </li>
  );
}

function CommentRow({ comment, onOpen }: { comment: TodayPortfolioComment; onOpen: () => void }) {
  return (
    <li>
      <button type="button" onClick={onOpen} className={ROW_BUTTON}>
        <Rule />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold leading-tight text-white">
            {comment.student_name ?? 'Apprentice'}
            {comment.cohort_name ? (
              <span className="font-medium"> · {comment.cohort_name}</span>
            ) : null}
          </span>
          <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
            {comment.content.replace(/\s+/g, ' ').trim()}
          </span>
        </span>
        <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
          {formatRel(comment.created_at)}
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
      </button>
    </li>
  );
}

function IqaRow({ sample, onOpen }: { sample: TodayIqaPending; onOpen: () => void }) {
  return (
    <li>
      <button type="button" onClick={onOpen} className={ROW_BUTTON}>
        <Rule />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold leading-tight text-white">
            {sample.target_title}
          </span>
          <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
            {[
              sample.target_kind === 'otj' ? 'Off-the-job sample' : 'Observation sample',
              sample.iqa_name_snapshot,
            ]
              .filter(Boolean)
              .join(' · ')}
          </span>
        </span>
        <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
          {formatRel(sample.sampled_at)}
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
      </button>
    </li>
  );
}

const RISK_LABEL: Record<TodayAtRiskLearner['level'], string> = {
  medium: 'Medium risk',
  high: 'High risk',
  critical: 'Critical risk',
};

/** In-row action — neutral, 44px, never volt (three per row would be a rainbow). */
const ROW_ACTION =
  'inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.06] px-2 text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:bg-white/[0.10] active:scale-[0.98]';

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
  // Red only for a critical level — a genuine problem. High is volt text,
  // medium is plain. The rule follows the same reading.
  const critical = row.level === 'critical';
  const reason = [row.cohort_name, ...row.top_factors].filter(Boolean).join(' · ');
  return (
    <li className="px-4 py-3 sm:px-5">
      <button
        type="button"
        onClick={onOpenLearner}
        className="-mx-1 flex w-full min-h-11 items-center gap-3 rounded-lg px-1 text-left transition-colors touch-manipulation hover:bg-white/[0.06]"
      >
        <Rule urgent={row.level !== 'medium'} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold leading-tight text-white">
            {row.student_name}
          </span>
          <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
            {reason || 'Flagged by the risk engine'}
          </span>
        </span>
        <span
          className={cn(
            'shrink-0 text-[12px] font-semibold',
            critical ? 'text-red-300' : row.level === 'high' ? 'text-elec-yellow' : 'text-white'
          )}
        >
          {RISK_LABEL[row.level]}
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
      </button>

      {/* The three things a tutor does about a flagged learner, in place. */}
      <div className="mt-2 flex items-center gap-2 pl-4">
        <button type="button" onClick={onMarkAttendance} className={ROW_ACTION}>
          Register
        </button>
        <button type="button" onClick={onAddNote} className={ROW_ACTION}>
          Add note
        </button>
        <button type="button" onClick={onOpenEvidence} className={ROW_ACTION}>
          Evidence
        </button>
      </div>
    </li>
  );
}

const UPCOMING_KIND: Record<TodayUpcomingDate['kind'], string> = {
  lesson: 'Lesson',
  observation_due: 'Observation follow-up',
  iqa_action: 'IQA action',
  epa_brief: 'EPA brief',
};

function UpcomingRow({ upcoming, onOpen }: { upcoming: TodayUpcomingDate; onOpen: () => void }) {
  return (
    <li>
      <button type="button" onClick={onOpen} className={ROW_BUTTON}>
        <Rule />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold leading-tight text-white">
            {upcoming.title}
          </span>
          <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
            {UPCOMING_KIND[upcoming.kind]}
          </span>
        </span>
        <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
          {formatDate(upcoming.date)}
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
      </button>
    </li>
  );
}
