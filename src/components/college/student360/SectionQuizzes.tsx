import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubSectionHeading } from '@/components/hub/HubPrimitives';
import {
  useStudentQuizzes,
  type AssessmentEntry,
  type AssessmentSource,
} from '@/hooks/useStudentQuizzes';
import { QuizAttemptReviewSheet } from '@/components/college/sheets/QuizAttemptReviewSheet';
import { CreateQuizSheet } from '@/components/college/sheets/CreateQuizSheet';
import { UploadAssessmentDocSheet } from '@/components/college/sheets/UploadAssessmentDocSheet';

/* ==========================================================================
   SectionQuizzes — assessment + quiz history.

   Hub language: heading with two quiet volt text actions (New quiz, From
   doc), a four-figure strip, and ONE card of divided rows. The four source
   colours (blue/cyan/purple/amber) went — the source is a word on the row.
   Pass is emerald, fail is red, everything else is white.
   ========================================================================== */

const SOURCE_LABEL: Record<AssessmentSource, string> = {
  quiz_attempt: 'Auto-quiz',
  quiz_result: 'Assessment',
  tutor_quiz: 'Tutor quiz',
  ojt_assessment: 'OJT assessment',
};

const ACTION_BTN =
  '-my-2 flex h-11 shrink-0 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation';

const CHIP =
  'inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-semibold tabular-nums';
const CHIP_NEUTRAL = 'border-white/[0.14] bg-white/[0.06] text-white';
const CHIP_RED = 'border-red-400/30 bg-red-500/[0.08] text-red-300';
const CHIP_GOOD = 'border-emerald-400/30 bg-emerald-500/[0.08] text-emerald-300';
const CHIP_VOLT = 'border-elec-yellow/35 text-elec-yellow';

const CARD = cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE);

function formatRelative(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  const now = new Date();
  const days = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' });
}

function fmtSecs(s: number | null): string {
  if (!s) return '—';
  if (s < 60) return `${s}s`;
  const m = Math.round(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  const remM = m % 60;
  return remM === 0 ? `${h}h` : `${h}h ${remM}m`;
}

export function SectionQuizzes({
  id,
  studentName,
  userId,
  collegeStudentId,
}: {
  id: string;
  studentName: string;
  userId: string | null;
  collegeStudentId?: string;
}) {
  const navigate = useNavigate();
  const { attempts, rollUp, loading } = useStudentQuizzes(userId);
  const [expanded, setExpanded] = useState(false);
  const [reviewAttemptId, setReviewAttemptId] = useState<string | null>(null);
  const [createQuiz, setCreateQuiz] = useState(false);
  const [uploadDoc, setUploadDoc] = useState(false);
  const first = studentName.split(' ')[0];

  const visible = useMemo(
    () => (expanded ? attempts : attempts.slice(0, 8)),
    [attempts, expanded]
  );

  const heading = (
    <div className="flex items-end justify-between gap-4">
      <HubSectionHeading>Quizzes &amp; assessments</HubSectionHeading>
      {collegeStudentId && (
        <div className="flex items-center gap-1 no-print">
          <button type="button" onClick={() => setCreateQuiz(true)} className={ACTION_BTN}>
            New quiz
          </button>
          <button type="button" onClick={() => setUploadDoc(true)} className={ACTION_BTN}>
            From doc
          </button>
        </div>
      )}
    </div>
  );

  const sheets = collegeStudentId ? (
    <>
      <CreateQuizSheet
        open={createQuiz}
        onOpenChange={setCreateQuiz}
        collegeStudentId={collegeStudentId}
        studentName={studentName}
      />
      <UploadAssessmentDocSheet
        open={uploadDoc}
        onOpenChange={setUploadDoc}
        collegeStudentId={collegeStudentId}
        studentName={studentName}
      />
    </>
  ) : null;

  if (!userId) {
    return (
      <section id={id} className="scroll-mt-20 space-y-3">
        {heading}
        <div className={cn(CARD, 'px-4 py-5 sm:px-5')}>
          <p className="text-[12.5px] leading-relaxed text-white">
            No linked apprentice account — connect this learner's app sign-in to see quiz and
            assessment results. You can still send a quiz from here.
          </p>
        </div>
        {sheets}
      </section>
    );
  }

  const sources = (Object.keys(rollUp.by_source) as AssessmentSource[]).filter(
    (s) => rollUp.by_source[s].count > 0
  );

  return (
    <section id={id} className="scroll-mt-20 space-y-3">
      {heading}

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
        <StatCell
          label="Attempts"
          value={String(rollUp.total_attempts)}
          sub={rollUp.last_attempt_at ? `Last ${formatRelative(rollUp.last_attempt_at)}` : 'None yet'}
        />
        <StatCell
          label="Pass rate"
          value={rollUp.total_attempts > 0 ? `${rollUp.pass_rate_percent}%` : '—'}
          bad={rollUp.total_attempts > 0 && rollUp.pass_rate_percent < 50}
        />
        <StatCell label="Average score" value={rollUp.avg_percent != null ? `${rollUp.avg_percent}%` : '—'} />
        <StatCell
          label="Streak"
          value={String(rollUp.recent_streak)}
          sub="passes in a row"
          good={rollUp.recent_streak >= 3}
        />
      </div>

      {sources.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {sources.map((s) => {
            const stat = rollUp.by_source[s];
            return (
              <span key={s} className={cn(CHIP, CHIP_NEUTRAL, 'py-1')}>
                {SOURCE_LABEL[s]} · {stat.count}
                {stat.avg_percent != null ? ` · ${stat.avg_percent}% avg` : ''}
              </span>
            );
          })}
        </div>
      )}

      {loading && attempts.length === 0 ? (
        <Skeleton />
      ) : attempts.length === 0 ? (
        <div className={cn(CARD, 'px-4 py-5 sm:px-5')}>
          <p className="text-[12.5px] leading-relaxed text-white">
            No quiz or assessment history for {first} yet.
          </p>
        </div>
      ) : (
        <div className={CARD}>
          <ul className="divide-y divide-white/[0.10]">
            {visible.map((a) => {
              // Tutor-authored attempts → open the review sheet (use the raw
              // attempt_id, NOT the namespaced `tq_` id).
              // Tutor-authored "Sent" entries (no attempt yet) → jump to the
              // per-quiz detail page so the tutor can preview / unpublish.
              let onClick: (() => void) | undefined;
              if (a.source === 'tutor_quiz') {
                if (a.attempt_id) {
                  onClick = () => setReviewAttemptId(a.attempt_id ?? null);
                } else if (a.quiz_id) {
                  onClick = () => navigate(`/college/quizzes/${a.quiz_id}`);
                }
              }
              return <AttemptRow key={a.id} attempt={a} onClick={onClick} />;
            })}
          </ul>
          {attempts.length > 8 && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="flex h-11 w-full items-center justify-center border-t border-white/[0.10] text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09]"
            >
              {expanded ? 'Show fewer' : `Show all ${attempts.length} attempts`}
            </button>
          )}
        </div>
      )}

      <QuizAttemptReviewSheet
        open={reviewAttemptId !== null}
        onOpenChange={(o) => {
          if (!o) setReviewAttemptId(null);
        }}
        attemptId={reviewAttemptId}
        studentName={studentName}
      />

      {sheets}
    </section>
  );
}

function AttemptRow({ attempt, onClick }: { attempt: AssessmentEntry; onClick?: () => void }) {
  const isSent = attempt.status === 'sent';
  const isInProgress = attempt.status === 'in_progress';
  const verdict = isSent
    ? { label: 'Sent', chip: CHIP_VOLT }
    : isInProgress
      ? { label: 'In progress', chip: CHIP_NEUTRAL }
      : attempt.passed === true
        ? { label: 'Pass', chip: CHIP_GOOD }
        : attempt.passed === false
          ? { label: 'Fail', chip: CHIP_RED }
          : null;

  const inner = (
    <>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-1.5">
          <span className="truncate text-[13.5px] font-semibold leading-tight text-white">{attempt.title}</span>
          {attempt.kind === 'assessment' && <span className={cn(CHIP, CHIP_NEUTRAL)}>Assessment</span>}
          {attempt.kind === 'mock_exam' && <span className={cn(CHIP, CHIP_NEUTRAL)}>Mock exam</span>}
          {verdict && <span className={cn(CHIP, verdict.chip)}>{verdict.label}</span>}
          {attempt.grade && (
            <span className="text-[11px] font-semibold tabular-nums text-white">{attempt.grade}</span>
          )}
        </span>
        <span className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[11px] tabular-nums text-white">
          <span>{formatRelative(attempt.taken_at)}</span>
          <span>{SOURCE_LABEL[attempt.source]}</span>
          {attempt.unit_code && <span className="font-mono">{attempt.unit_code}</span>}
          {attempt.time_seconds != null && <span>{fmtSecs(attempt.time_seconds)}</span>}
        </span>
      </span>
      <span className="shrink-0 text-right">
        {attempt.percentage != null ? (
          <>
            <span className="block text-[14px] font-semibold leading-none tabular-nums text-white">
              {attempt.percentage}%
            </span>
            {attempt.score != null && attempt.total != null && (
              <span className="mt-0.5 block text-[11px] tabular-nums text-white">
                {attempt.score}/{attempt.total}
              </span>
            )}
          </>
        ) : attempt.status ? (
          <span className="block text-[11px] capitalize text-white">
            {attempt.status.replace(/_/g, ' ')}
          </span>
        ) : (
          <span className="block text-[11px] text-white">—</span>
        )}
      </span>
      {onClick && <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />}
    </>
  );

  const rowCn = 'flex w-full items-center gap-3 px-4 py-3.5 text-left sm:px-5';

  return (
    <li>
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          className={cn(rowCn, 'transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09]')}
        >
          {inner}
        </button>
      ) : (
        <div className={rowCn}>{inner}</div>
      )}
    </li>
  );
}

function StatCell({
  label,
  value,
  sub,
  bad,
  good,
}: {
  label: string;
  value: string;
  sub?: string;
  bad?: boolean;
  good?: boolean;
}) {
  return (
    <div className={cn(CARD, 'px-4 py-3.5')}>
      <div className="text-[12px] font-medium text-white">{label}</div>
      <div
        className={cn(
          'mt-1 text-[22px] font-semibold leading-none tabular-nums tracking-tight',
          bad ? 'text-red-300' : good ? 'text-emerald-300' : 'text-white'
        )}
      >
        {value}
      </div>
      {sub && <div className="mt-1 text-[11px] tabular-nums text-white">{sub}</div>}
    </div>
  );
}

function Skeleton() {
  return (
    <div className={cn(CARD, 'space-y-3 px-4 py-4 animate-pulse sm:px-5')}>
      {[0, 1, 2].map((i) => (
        <div key={i}>
          <div className="h-3 w-2/3 rounded bg-white/[0.08]" />
          <div className="mt-2 h-2 w-1/3 rounded bg-white/[0.05]" />
        </div>
      ))}
    </div>
  );
}
