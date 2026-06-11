import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageFrame, itemVariants, containerVariants } from '@/components/college/primitives';
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

   The morning landing — single screen the tutor opens to start their day.
   Hero greeting + 5-stat KPI strip + the inspector "show me" search bar at
   the top. Below: today's classes / inbox (comments + OTJ + IQA queues) /
   at-risk learners / this-week upcoming dates.

   Every panel deep-links to the source surface so the tutor never has to
   hunt for what's actionable. ELE-939 / [M2].
   ========================================================================== */

const RISK_TONE: Record<'medium' | 'high' | 'critical', string> = {
  medium: 'border-amber-300/30 text-amber-200 bg-amber-500/[0.06]',
  high: 'border-orange-300/30 text-orange-200 bg-orange-500/[0.06]',
  critical: 'border-rose-300/30 text-rose-200 bg-rose-500/[0.06]',
};

function greeting(): string {
  const h = new Date().getHours();
  if (h < 5) return 'Good evening';
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
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
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export default function TutorTodayPage() {
  return (
    <PageFrame>
      <TutorTodayBody mode="page" />
    </PageFrame>
  );
}

/** TutorTodayBody — the actionable morning view, extracted so both the
    standalone /college/today route and the main /college overview can
    render the same content without duplication.

    `mode="page"` shows the full greeting + intro paragraph (standalone
    route). `mode="embed"` swaps to a tighter eyebrow heading.
    `mode="embed-bare"` suppresses greeting entirely — useful when the
    parent page already renders an editorial hero (College Hub overview
    sits above this with its own VerdictHero-style greeting). */
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

  const firstName = data?.core.staff_name?.split(' ')[0] ?? null;
  const todayLong = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <>
      {mode === 'page' && (
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={() => navigate('/college')}
            className="text-[11px] font-medium text-white hover:text-elec-yellow transition-colors touch-manipulation"
          >
            ← Back to College Hub
          </button>
          <div className="mt-4 text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow">
            Today · {todayLong}
          </div>
          <h1 className="mt-2 text-[28px] sm:text-[36px] font-semibold text-white tracking-tight leading-[1.1]">
            {greeting()}
            {firstName ? `, ${firstName}` : ''}.
          </h1>
          <p className="mt-2 text-[13px] sm:text-[14px] text-white/80 leading-snug max-w-2xl">
            Your day at a glance — classes, inbox, at-risk learners and what's due this week.
          </p>
        </motion.div>
      )}
      {mode === 'embed' && (
        <motion.div variants={itemVariants}>
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow">
                Today · {todayLong}
              </div>
              <h2 className="mt-1.5 text-[22px] sm:text-[28px] font-semibold text-white tracking-tight leading-tight">
                {greeting()}
                {firstName ? `, ${firstName}` : ''}.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigate('/college/today')}
              className="text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
            >
              Open full Today's view →
            </button>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-rose-300/30 bg-rose-500/[0.06] px-4 py-3 text-[13px] text-rose-200 flex items-center justify-between gap-3"
        >
          <span>{error}</span>
          <button
            onClick={refresh}
            className="text-[12px] font-medium text-rose-100 hover:text-white underline-offset-2 hover:underline"
          >
            Retry
          </button>
        </motion.div>
      )}

      {/* KPI strip — mobile 2-cols × 3 rows with the 5th card spanning the
          full last row so we never leave an awkward orphan beside an empty
          half-grid. lg gets all 5 in one row. */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3">
          <KpiCard
            label="Classes today"
            value={data?.counts.lessons_today ?? '—'}
            tone="blue"
            onClick={() => scrollTo('classes')}
          />
          <KpiCard
            label="OTJ awaiting"
            value={data?.counts.otj_awaiting ?? '—'}
            tone="emerald"
            onClick={() => scrollTo('inbox')}
          />
          <KpiCard
            label="Action comments"
            value={data?.counts.comments_action_required ?? '—'}
            tone="amber"
            onClick={() => scrollTo('inbox')}
          />
          <KpiCard
            label="IQA pending"
            value={data?.counts.iqa_awaiting ?? '—'}
            tone="purple"
            onClick={() => scrollTo('inbox')}
          />
          <KpiCard
            label="At risk"
            value={data?.counts.at_risk ?? '—'}
            tone="red"
            onClick={() => scrollTo('atrisk')}
            className="col-span-2 lg:col-span-1"
          />
        </div>
      </motion.div>

      {/* Jump to any learner — Student 360, one tap. Below the day's numbers
          so the headline stats lead. */}
      {mode === 'page' && (
        <motion.div variants={itemVariants}>
          <LearnerQuickJump />
        </motion.div>
      )}

      {/* Action callouts — Inbox + Marking when there's pending work.
          Side-by-side on desktop, stacked on mobile. */}
      {(inboxStats.total > 0 || markingStats.total_pending > 0) && (
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {inboxStats.total > 0 && (
              <button
                type="button"
                onClick={() => navigate('/college/inbox')}
                className="group text-left bg-[hsl(0_0%_10%)] hover:bg-[hsl(0_0%_12%)] active:bg-[hsl(0_0%_14%)] border border-white/[0.08] hover:border-elec-yellow/40 rounded-2xl px-4 sm:px-5 py-4 transition-colors touch-manipulation"
              >
                <div className="flex items-center gap-4">
                  <div className="shrink-0 h-11 w-11 rounded-full bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-white font-semibold text-[15px] tabular-nums">
                    {inboxStats.total}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-elec-yellow">
                      Inbox
                    </div>
                    <div className="mt-0.5 text-[15px] sm:text-[16px] font-semibold text-white tracking-tight leading-tight">
                      {inboxStats.total} item{inboxStats.total === 1 ? '' : 's'} need attention
                    </div>
                    <div className="mt-1 text-[11.5px] text-white">
                      {[
                        inboxStats.portfolio > 0 &&
                          `${inboxStats.portfolio} comment${inboxStats.portfolio === 1 ? '' : 's'}`,
                        inboxStats.otj > 0 && `${inboxStats.otj} OTJ`,
                        inboxStats.iqa > 0 && `${inboxStats.iqa} IQA`,
                        inboxStats.message > 0 &&
                          `${inboxStats.message} message${inboxStats.message === 1 ? '' : 's'}`,
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </div>
                  </div>
                </div>
              </button>
            )}
            {markingStats.total_pending > 0 && (
              <button
                type="button"
                onClick={() => navigate('/college/marking')}
                className="group text-left bg-[hsl(0_0%_10%)] hover:bg-[hsl(0_0%_12%)] active:bg-[hsl(0_0%_14%)] border border-white/[0.08] hover:border-elec-yellow/40 rounded-2xl px-4 sm:px-5 py-4 transition-colors touch-manipulation"
              >
                <div className="flex items-center gap-4">
                  <div className="shrink-0 h-11 w-11 rounded-full bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-white font-semibold text-[15px] tabular-nums">
                    {markingStats.total_pending}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-elec-yellow">
                      Marking copilot
                    </div>
                    <div className="mt-0.5 text-[15px] sm:text-[16px] font-semibold text-white tracking-tight leading-tight">
                      {markingStats.awaiting_review > 0
                        ? `${markingStats.awaiting_review} attempt${markingStats.awaiting_review === 1 ? '' : 's'} ready for sign-off`
                        : `${markingStats.awaiting_ai} attempt${markingStats.awaiting_ai === 1 ? '' : 's'} grading in progress`}
                    </div>
                    <div className="mt-1 text-[11.5px] text-white">
                      AI has pre-scored. Tap to review and approve.
                    </div>
                  </div>
                </div>
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Show-me search at the top — Ofsted-day saviour */}
      <motion.div variants={itemVariants}>
        <ShowMePanel />
      </motion.div>

      {loading && !data && (
        <motion.div variants={itemVariants} className="py-10 text-center text-[12.5px] text-white">
          Loading your day…
        </motion.div>
      )}

      {data && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5"
        >
          <Section
            id="classes"
            eyebrow="Today's classes"
            title={
              data.lessons.length === 0
                ? 'No classes scheduled today'
                : `${data.lessons.length} ${data.lessons.length === 1 ? 'lesson' : 'lessons'}`
            }
            emptyHint="No college lessons booked for today. Check 'This week' below for what's coming up."
            empty={data.lessons.length === 0}
          >
            {data.lessons.map((l) => (
              <LessonRow
                key={l.id}
                lesson={l}
                onOpen={() => navigate(`/college/lesson-plans/${l.id}`)}
              />
            ))}
          </Section>

          <GroupedSection
            id="inbox"
            eyebrow="Inbox"
            title={
              data.comments.length + data.otj.length + data.iqa.length === 0
                ? 'Inbox is clear'
                : `${data.comments.length + data.otj.length + data.iqa.length} pending`
            }
            empty={data.comments.length + data.otj.length + data.iqa.length === 0}
            emptyHint="Nothing waiting on you right now."
            groups={[
              {
                key: 'otj',
                label: 'OTJ awaiting verification',
                count: data.otj.length,
                items: data.otj.map((o) => (
                  <OtjRow key={o.id} otj={o} onOpen={() => navigate('/college/inbox?tab=otj')} />
                )),
              },
              {
                key: 'comments',
                label: 'Action-required comments',
                count: data.comments.length,
                items: data.comments.map((c) => (
                  <CommentRow
                    key={c.id}
                    comment={c}
                    onOpen={() => navigate('/college/inbox?tab=portfolio')}
                  />
                )),
              },
              {
                key: 'iqa',
                label: 'IQA samples awaiting verdict',
                count: data.iqa.length,
                items: data.iqa.map((s) => (
                  <IqaRow
                    key={s.id}
                    sample={s}
                    onOpen={() => navigate(`/college/iqa/sampling/${s.sampling_plan_id}`)}
                  />
                )),
              },
            ]}
          />

          <Section
            id="atrisk"
            eyebrow="At-risk learners"
            title={
              data.atRisk.length === 0
                ? 'No-one at high+ risk'
                : `${data.atRisk.length} need attention`
            }
            emptyHint="Cohort risk is currently low or medium across the board."
            empty={data.atRisk.length === 0}
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
          </Section>

          <Section
            id="week"
            eyebrow="This week"
            title={
              data.thisWeek.length === 0
                ? 'Nothing scheduled in the next 7 days'
                : `${data.thisWeek.length} upcoming`
            }
            emptyHint="No upcoming lessons, observations or EPA brief deadlines in the next 7 days."
            empty={data.thisWeek.length === 0}
          >
            {data.thisWeek.map((u, i) => (
              <UpcomingRow key={`${u.kind}-${i}`} upcoming={u} onOpen={() => navigate(u.href)} />
            ))}
          </Section>
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

/* ──────────────────────────────────────────────────────── */

type KpiTone = 'blue' | 'emerald' | 'amber' | 'purple' | 'red';

function KpiCard({
  label,
  value,
  onClick,
  className,
}: {
  label: string;
  value: number | string;
  /** Retained for call-site compatibility — all KPI cards render mono/grey
      to match the College Hub main-dash stat strip (no rainbow). */
  tone?: KpiTone;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_10%)] p-3 sm:p-4 text-left touch-manipulation transition-colors',
        'hover:bg-white/[0.04]',
        className
      )}
    >
      <div className="text-[9.5px] font-medium uppercase tracking-[0.22em] text-white/65">
        {label}
      </div>
      <div className="mt-1 text-[28px] sm:text-[32px] font-bold tabular-nums leading-none text-white">
        {value}
      </div>
    </motion.button>
  );
}

/* ──────────────────────────────────────────────────────── */

function GroupedSection({
  id,
  eyebrow,
  title,
  empty,
  emptyHint,
  groups,
}: {
  id: string;
  eyebrow: string;
  title: string;
  empty?: boolean;
  emptyHint?: string;
  groups: Array<{ key: string; label: string; count: number; items: React.ReactNode[] }>;
}) {
  return (
    <motion.section
      id={id}
      variants={itemVariants}
      className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden"
    >
      <div className="px-4 sm:px-5 py-3 border-b border-white/[0.06]">
        <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow">
          {eyebrow}
        </div>
        <h2 className="mt-1 text-[15px] sm:text-[16px] font-semibold text-white tracking-tight">
          {title}
        </h2>
      </div>
      {empty ? (
        <div className="px-4 sm:px-5 py-6 text-[12.5px] text-white leading-snug">
          {emptyHint ?? 'Nothing here right now.'}
        </div>
      ) : (
        <div className="divide-y divide-white/[0.06]">
          {groups
            .filter((g) => g.count > 0)
            .map((g) => (
              <div key={g.key}>
                <div className="px-4 sm:px-5 py-2 bg-white/[0.02] border-b border-white/[0.04] flex items-center gap-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white">
                    {g.label}
                  </span>
                  <span className="text-[10px] tabular-nums text-white">{g.count}</span>
                </div>
                <ul className="divide-y divide-white/[0.05]">{g.items}</ul>
              </div>
            ))}
        </div>
      )}
    </motion.section>
  );
}

function Section({
  id,
  eyebrow,
  title,
  empty,
  emptyHint,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  empty?: boolean;
  emptyHint?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      variants={itemVariants}
      className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden"
    >
      <div className="px-4 sm:px-5 py-3 border-b border-white/[0.06]">
        <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow">
          {eyebrow}
        </div>
        <h2 className="mt-1 text-[15px] sm:text-[16px] font-semibold text-white tracking-tight">
          {title}
        </h2>
      </div>
      {empty ? (
        <div className="px-4 sm:px-5 py-6 text-[12.5px] text-white leading-snug">
          {emptyHint ?? 'Nothing here right now.'}
        </div>
      ) : (
        <ul className="divide-y divide-white/[0.05]">{children}</ul>
      )}
    </motion.section>
  );
}

/* ──────────────────────────────────────────────────────── */

function LessonRow({ lesson, onOpen }: { lesson: TodayLesson; onOpen: () => void }) {
  const start = lesson.scheduled_start_time?.slice(0, 5) ?? '—';
  const dur = lesson.duration_minutes ? ` · ${lesson.duration_minutes}m` : '';
  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        className="w-full flex items-center gap-3 px-4 sm:px-5 py-3 hover:bg-white/[0.02] transition-colors touch-manipulation text-left"
      >
        <div className="shrink-0 w-12 sm:w-14 text-[14px] sm:text-[15px] font-semibold tabular-nums text-white">
          {start}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[13.5px] font-medium text-white truncate">{lesson.title}</div>
          <div className="mt-0.5 text-[11.5px] text-white tabular-nums">
            {lesson.cohort_name ?? '—'}
            {dur}
            {lesson.is_mine && ' · yours'}
            {lesson.status && lesson.status !== 'ready' && ` · ${lesson.status}`}
          </div>
        </div>
        <span className="text-white text-[14px] shrink-0">→</span>
      </button>
    </li>
  );
}

function OtjRow({ otj, onOpen }: { otj: TodayOtjPending; onOpen: () => void }) {
  const hours = otj.duration_minutes != null ? (otj.duration_minutes / 60).toFixed(1) : '—';
  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        className="w-full flex items-start gap-3 px-4 sm:px-5 py-3 hover:bg-white/[0.02] transition-colors touch-manipulation text-left"
      >
        <span className="inline-flex items-center h-5 px-1.5 rounded-md border border-emerald-300/30 bg-emerald-500/[0.06] text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200 shrink-0 mt-0.5">
          OTJ
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-medium text-white truncate">{otj.title}</div>
          <div className="mt-0.5 text-[11.5px] text-white tabular-nums">
            {otj.student_name ?? '—'}
            {otj.cohort_name ? ` · ${otj.cohort_name}` : ''}
            {' · '}
            {hours}h{' · '}
            {formatDate(otj.activity_date)}
          </div>
        </div>
        <span className="text-white text-[14px] shrink-0">→</span>
      </button>
    </li>
  );
}

function CommentRow({ comment, onOpen }: { comment: TodayPortfolioComment; onOpen: () => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        className="w-full flex items-start gap-3 px-4 sm:px-5 py-3 hover:bg-white/[0.02] transition-colors touch-manipulation text-left"
      >
        <span className="inline-flex items-center h-5 px-1.5 rounded-md border border-amber-300/30 bg-amber-500/[0.06] text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-200 shrink-0 mt-0.5">
          Action
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[12.5px] text-white leading-snug line-clamp-2">
            {comment.content}
          </div>
          <div className="mt-0.5 text-[11px] text-white tabular-nums">
            {comment.student_name ?? 'Apprentice'}
            {comment.cohort_name ? ` · ${comment.cohort_name}` : ''}
            {' · '}
            {comment.author_role ?? 'tutor'}
            {' · '}
            {formatRel(comment.created_at)}
          </div>
        </div>
        <span className="text-white text-[14px] shrink-0">→</span>
      </button>
    </li>
  );
}

function IqaRow({ sample, onOpen }: { sample: TodayIqaPending; onOpen: () => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        className="w-full flex items-start gap-3 px-4 sm:px-5 py-3 hover:bg-white/[0.02] transition-colors touch-manipulation text-left"
      >
        <span className="inline-flex items-center h-5 px-1.5 rounded-md border border-yellow-300/30 bg-yellow-500/[0.06] text-[10px] font-semibold uppercase tracking-[0.16em] text-yellow-200 shrink-0 mt-0.5">
          IQA
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-medium text-white truncate">{sample.target_title}</div>
          <div className="mt-0.5 text-[11px] text-white tabular-nums">
            {sample.target_kind === 'otj' ? 'OTJ entry' : 'Observation'} · sampled{' '}
            {formatRel(sample.sampled_at)}
            {sample.iqa_name_snapshot ? ` · ${sample.iqa_name_snapshot}` : ''}
          </div>
        </div>
        <span className="text-white text-[14px] shrink-0">→</span>
      </button>
    </li>
  );
}

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
  return (
    <li className="px-4 sm:px-5 py-3 hover:bg-white/[0.02] transition-colors">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={onOpenLearner}
              className="text-[14px] font-semibold text-white hover:text-elec-yellow transition-colors touch-manipulation"
            >
              {row.student_name}
            </button>
            <span
              className={cn(
                'inline-flex items-center h-5 px-1.5 rounded-md border text-[10.5px] font-semibold uppercase tracking-[0.16em]',
                RISK_TONE[row.level]
              )}
            >
              {row.level}
            </span>
            {row.cohort_name && <span className="text-[11px] text-white">· {row.cohort_name}</span>}
          </div>
          {row.top_factors.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {row.top_factors.map((f, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-md bg-white/[0.06] border border-white/[0.08] px-1.5 py-0.5 text-[10.5px] text-white/85 leading-snug"
                >
                  {f}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={onMarkAttendance}
            className="inline-flex items-center h-7 px-2.5 rounded-md text-[11px] font-semibold text-emerald-200 bg-emerald-500/[0.10] border border-emerald-300/30 hover:bg-emerald-500/[0.18] transition-colors touch-manipulation"
          >
            Register
          </button>
          <button
            type="button"
            onClick={onAddNote}
            className="inline-flex items-center h-7 px-2.5 rounded-md text-[11px] font-semibold text-amber-200 bg-amber-500/[0.10] border border-amber-300/30 hover:bg-amber-500/[0.18] transition-colors touch-manipulation"
          >
            + Note
          </button>
          <button
            type="button"
            onClick={onOpenEvidence}
            className="inline-flex items-center h-7 px-2.5 rounded-md text-[11px] font-semibold text-white bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.12] transition-colors touch-manipulation"
          >
            Evidence →
          </button>
        </div>
      </div>
    </li>
  );
}

function UpcomingRow({ upcoming, onOpen }: { upcoming: TodayUpcomingDate; onOpen: () => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        className="w-full flex items-center gap-3 px-4 sm:px-5 py-3 hover:bg-white/[0.02] transition-colors touch-manipulation text-left"
      >
        <div className="shrink-0 w-16 text-[12px] text-white tabular-nums">
          {formatDate(upcoming.date)}
        </div>
        <div className="min-w-0 flex-1 text-[13px] text-white truncate">{upcoming.title}</div>
        <span className="text-white text-[14px] shrink-0">→</span>
      </button>
    </li>
  );
}
