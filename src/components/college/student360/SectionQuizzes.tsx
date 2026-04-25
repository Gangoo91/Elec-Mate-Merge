import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { Pill, type Tone } from '@/components/college/primitives';
import {
  useStudentQuizzes,
  type AssessmentEntry,
  type AssessmentSource,
} from '@/hooks/useStudentQuizzes';

/* ==========================================================================
   SectionQuizzes — assessment + quiz history with pass-rate sparkline.
   ========================================================================== */

const SOURCE_TONE: Record<AssessmentSource, Tone> = {
  quiz_attempt: 'blue',
  quiz_result: 'cyan',
  tutor_quiz: 'purple',
  ojt_assessment: 'amber',
};

const SOURCE_LABEL: Record<AssessmentSource, string> = {
  quiz_attempt: 'Auto-quiz',
  quiz_result: 'Assessment',
  tutor_quiz: 'Tutor quiz',
  ojt_assessment: 'OJT assessment',
};

const SOURCE_DOT: Record<AssessmentSource, string> = {
  quiz_attempt: 'bg-blue-400/85',
  quiz_result: 'bg-cyan-400/85',
  tutor_quiz: 'bg-purple-400/85',
  ojt_assessment: 'bg-amber-400/85',
};

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
}: {
  id: string;
  studentName: string;
  userId: string | null;
}) {
  const { attempts, rollUp, loading } = useStudentQuizzes(userId);
  const [expanded, setExpanded] = useState(false);

  const visible = useMemo(
    () => (expanded ? attempts : attempts.slice(0, 8)),
    [attempts, expanded]
  );

  if (!userId) {
    return (
      <section id={id} className="scroll-mt-6">
        <Header />
        <div className="mt-5 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-8 text-center">
          <p className="text-[12.5px] text-white/65 max-w-md mx-auto leading-relaxed">
            No linked apprentice account — connect this learner's app sign-in to see quiz
            and assessment results.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="scroll-mt-6">
      <Header />

      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <StatCard
          label="Attempts"
          value={String(rollUp.total_attempts)}
          sub={rollUp.last_attempt_at ? `Last ${formatRelative(rollUp.last_attempt_at)}` : '—'}
        />
        <StatCard
          label="Pass rate"
          value={`${rollUp.pass_rate_percent}%`}
          tone={rollUp.pass_rate_percent >= 80 ? 'emerald' : rollUp.pass_rate_percent >= 50 ? 'amber' : 'red'}
        />
        <StatCard
          label="Avg score"
          value={rollUp.avg_percent != null ? `${rollUp.avg_percent}%` : '—'}
          tone={
            rollUp.avg_percent != null && rollUp.avg_percent >= 75
              ? 'emerald'
              : rollUp.avg_percent != null && rollUp.avg_percent >= 50
                ? 'amber'
                : undefined
          }
        />
        <StatCard
          label="Streak"
          value={String(rollUp.recent_streak)}
          sub="passes in a row"
          tone={rollUp.recent_streak >= 3 ? 'emerald' : undefined}
        />
      </div>

      {/* Source breakdown */}
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {(Object.keys(rollUp.by_source) as AssessmentSource[]).map((s) => {
          const stat = rollUp.by_source[s];
          if (stat.count === 0) return null;
          return (
            <div key={s} className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-2">
                <span className={cn('inline-block h-1.5 w-1.5 rounded-full', SOURCE_DOT[s])} />
                <span className="text-[10.5px] font-medium text-white/85">
                  {SOURCE_LABEL[s]}
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-[15px] font-semibold text-white tabular-nums leading-none">
                  {stat.count}
                </span>
                {stat.avg_percent != null && (
                  <span className="text-[10.5px] text-white/55 tabular-nums">
                    {stat.avg_percent}% avg
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5">
        {loading && attempts.length === 0 ? (
          <Skeleton />
        ) : attempts.length === 0 ? (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-8 text-center">
            <p className="text-[12.5px] text-white/65 max-w-md mx-auto leading-relaxed">
              No quiz or assessment history for {studentName.split(' ')[0]} yet.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {visible.map((a) => (
              <AttemptRow key={a.id} attempt={a} />
            ))}
            {attempts.length > 8 && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="w-full h-11 rounded-xl border border-white/[0.08] text-[12px] font-medium text-white/75 hover:text-white hover:border-white/[0.18] transition-colors touch-manipulation"
              >
                {expanded ? 'Show fewer' : `Show all ${attempts.length} attempts`}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Knowledge checks
        </div>
        <h2 className="mt-1.5 text-xl sm:text-[26px] font-semibold text-white tracking-tight leading-tight">
          Quizzes &amp; assessments
        </h2>
      </div>
    </div>
  );
}

function AttemptRow({ attempt }: { attempt: AssessmentEntry }) {
  const verdict =
    attempt.passed === true
      ? { label: 'Pass', class: 'text-emerald-300', dot: 'bg-emerald-400' }
      : attempt.passed === false
        ? { label: 'Fail', class: 'text-red-300', dot: 'bg-red-400' }
        : null;

  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-4 sm:px-5 py-3.5 flex items-start gap-3">
      <span
        aria-hidden
        className={cn('mt-1.5 inline-block h-2 w-2 rounded-full flex-shrink-0', SOURCE_DOT[attempt.source])}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-[13.5px] font-medium text-white leading-tight truncate">
                {attempt.title}
              </h3>
              {verdict && (
                <span
                  className={cn(
                    'inline-flex items-center h-5 px-1.5 rounded-md border text-[10px] font-semibold tracking-[0.06em] uppercase',
                    verdict.label === 'Pass'
                      ? 'border-emerald-500/30 bg-emerald-500/[0.1] text-emerald-200'
                      : 'border-red-500/30 bg-red-500/[0.1] text-red-200'
                  )}
                >
                  {verdict.label}
                </span>
              )}
              {attempt.grade && (
                <span className="text-[11px] font-medium text-elec-yellow/85 tabular-nums">
                  {attempt.grade}
                </span>
              )}
            </div>
            <div className="mt-0.5 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[10.5px] text-white/55 tabular-nums">
              <span>{formatRelative(attempt.taken_at)}</span>
              <span className="text-white/25">·</span>
              <Pill tone={SOURCE_TONE[attempt.source]}>{SOURCE_LABEL[attempt.source]}</Pill>
              {attempt.unit_code && (
                <>
                  <span className="text-white/25">·</span>
                  <span className="font-mono">{attempt.unit_code}</span>
                </>
              )}
              {attempt.time_seconds != null && (
                <>
                  <span className="text-white/25">·</span>
                  <span>{fmtSecs(attempt.time_seconds)}</span>
                </>
              )}
            </div>
          </div>
          <div className="flex-shrink-0 text-right">
            {attempt.percentage != null ? (
              <>
                <div className="text-[14px] font-semibold text-white tabular-nums leading-none">
                  {attempt.percentage}%
                </div>
                {attempt.score != null && attempt.total != null && (
                  <div className="mt-0.5 text-[10px] text-white/55 tabular-nums">
                    {attempt.score}/{attempt.total}
                  </div>
                )}
              </>
            ) : attempt.status ? (
              <div className="text-[10.5px] text-white/65 capitalize">{attempt.status.replace(/_/g, ' ')}</div>
            ) : (
              <div className="text-[10.5px] text-white/45">—</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: 'emerald' | 'amber' | 'red';
}) {
  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-4 py-3.5">
      <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
        {label}
      </div>
      <div
        className={cn(
          'mt-1 text-[18px] font-semibold tabular-nums leading-none',
          tone === 'emerald' ? 'text-emerald-300' :
          tone === 'amber' ? 'text-amber-300' :
          tone === 'red' ? 'text-red-300' :
          'text-white'
        )}
      >
        {value}
      </div>
      {sub && <div className="mt-1 text-[10.5px] text-white/55 tabular-nums">{sub}</div>}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-2.5 animate-pulse">
      {[0, 1, 2].map((i) => (
        <div key={i} className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-3.5">
          <div className="h-3 w-2/3 rounded bg-white/[0.06]" />
          <div className="mt-2 h-2 w-1/3 rounded bg-white/[0.04]" />
        </div>
      ))}
    </div>
  );
}
