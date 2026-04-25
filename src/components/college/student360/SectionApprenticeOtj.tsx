import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { Pill, type Tone } from '@/components/college/primitives';
import { useApprenticeOtj, type OtjEntry, type OtjSource } from '@/hooks/useApprenticeOtj';

/* ==========================================================================
   SectionApprenticeOtj — cross-hub Off-the-Job training panel.
   Surfaces apprentice-side activity (videos, study sessions, learning log)
   alongside college-recorded entries (workshops, 1-2-1s, mentoring).
   Built for ESFA-defensible reporting against the 6hr/week minimum.
   ========================================================================== */

const SOURCE_LABEL: Record<OtjSource, string> = {
  learning_activity: 'In-app learning',
  study_session: 'Study session',
  video_watch: 'Video',
  college: 'College-led',
};

const SOURCE_TONE: Record<OtjSource, Tone> = {
  learning_activity: 'blue',
  study_session: 'purple',
  video_watch: 'cyan',
  college: 'amber',
};

const SOURCE_DOT: Record<OtjSource, string> = {
  learning_activity: 'bg-blue-400/85',
  study_session: 'bg-purple-400/85',
  video_watch: 'bg-white/40',
  college: 'bg-elec-yellow/85',
};

function formatRelativeOrDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days < 0) return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' });
}

function fmtMins(m: number): string {
  if (m < 60) return `${Math.round(m)}m`;
  const h = m / 60;
  return h < 10 ? `${h.toFixed(1)}h` : `${Math.round(h)}h`;
}

export function SectionApprenticeOtj({
  id,
  studentName,
  userId,
  weeklyTargetMinutes,
  onAdd,
}: {
  id: string;
  studentName: string;
  userId: string | null;
  weeklyTargetMinutes?: number;
  onAdd: () => void;
}) {
  const { entries, breakdown, loading } = useApprenticeOtj(userId, weeklyTargetMinutes);
  const [expanded, setExpanded] = useState(false);

  const visible = useMemo(
    () => (expanded ? entries : entries.slice(0, 6)),
    [entries, expanded]
  );

  const noLink = !userId;

  return (
    <section id={id} className="scroll-mt-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Off-the-job training
          </div>
          <h2 className="mt-1.5 text-xl sm:text-[26px] font-semibold text-white tracking-tight leading-tight">
            OTJ activity
          </h2>
        </div>
        <button
          onClick={onAdd}
          disabled={noLink}
          className="text-[12px] font-medium text-elec-yellow/85 hover:text-elec-yellow transition-colors touch-manipulation no-print disabled:opacity-40"
        >
          Log college activity →
        </button>
      </div>

      {noLink ? (
        <div className="mt-5 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-8 text-center">
          <p className="text-[12.5px] text-white/65 max-w-md mx-auto leading-relaxed">
            This learner has no linked apprentice account yet, so we can't pull cross-hub
            activity. Once they sign in to the app with the same email, OTJ will appear here.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)] gap-4">
            <ProgressCard breakdown={breakdown} loading={loading} />
            <BreakdownCard breakdown={breakdown} />
          </div>

          <div className="mt-5">
            {loading && entries.length === 0 ? (
              <Skeleton />
            ) : entries.length === 0 ? (
              <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-8 text-center">
                <p className="text-[12.5px] text-white/65 max-w-md mx-auto leading-relaxed">
                  No off-the-job activity logged for {studentName.split(' ')[0]} yet. Activity
                  in the app and college-led sessions will appear here as they happen.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {visible.map((e) => (
                  <EntryRow key={e.id} entry={e} />
                ))}
                {entries.length > 6 && (
                  <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    className="w-full h-11 rounded-xl border border-white/[0.08] text-[12px] font-medium text-white/75 hover:text-white hover:border-white/[0.18] transition-colors touch-manipulation"
                  >
                    {expanded ? 'Show fewer' : `Show all ${entries.length} entries`}
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

/* ──────────────────────────────────────────────────────── */

function ProgressCard({
  breakdown,
  loading,
}: {
  breakdown: ReturnType<typeof useApprenticeOtj>['breakdown'];
  loading: boolean;
}) {
  const pct = breakdown.weekly_progress_percent;
  const ringColour =
    pct >= 100
      ? 'stroke-emerald-400'
      : pct >= 60
        ? 'stroke-elec-yellow'
        : pct >= 30
          ? 'stroke-amber-400'
          : 'stroke-red-400';

  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-5">
      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        This week
      </div>
      <div className="mt-3 flex items-center gap-4">
        <div className="relative h-[88px] w-[88px] flex-shrink-0">
          <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              strokeWidth="2.5"
              className="stroke-white/[0.08]"
            />
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={`${(pct / 100) * 97.4} 97.4`}
              className={cn('transition-all duration-500', ringColour)}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-[18px] font-semibold text-white tabular-nums leading-none">
              {pct}
              <span className="text-[11px] text-white/65">%</span>
            </div>
            <div className="text-[9.5px] uppercase tracking-[0.14em] text-white/50 mt-0.5">
              of target
            </div>
          </div>
        </div>
        <div className="min-w-0">
          <div className="text-[15px] font-semibold text-white tabular-nums">
            {fmtMins(breakdown.this_week_minutes)}
            <span className="text-[11px] text-white/55 ml-1">
              / {fmtMins(breakdown.weekly_target_minutes)}
            </span>
          </div>
          <div className="mt-1 text-[11px] text-white/55 leading-tight">
            ESFA expects 6h/week minimum off-the-job for apprenticeships.
          </div>
          {!loading && pct < 100 && (
            <div className="mt-2 inline-flex items-center h-5 px-1.5 rounded-md bg-amber-500/[0.08] border border-amber-500/25 text-[10px] font-semibold tracking-[0.06em] uppercase text-amber-200">
              {fmtMins(breakdown.weekly_target_minutes - breakdown.this_week_minutes)} short
            </div>
          )}
          {!loading && pct >= 100 && (
            <div className="mt-2 inline-flex items-center h-5 px-1.5 rounded-md bg-emerald-500/[0.08] border border-emerald-500/25 text-[10px] font-semibold tracking-[0.06em] uppercase text-emerald-200">
              On track
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function BreakdownCard({
  breakdown,
}: {
  breakdown: ReturnType<typeof useApprenticeOtj>['breakdown'];
}) {
  const sources: OtjSource[] = ['college', 'learning_activity', 'study_session', 'video_watch'];
  const total = breakdown.total_minutes;

  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-5">
      <div className="flex items-baseline justify-between gap-3">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          All time
        </div>
        <div className="text-[15px] font-semibold text-white tabular-nums">
          {fmtMins(total)}
        </div>
      </div>
      <div className="mt-3 space-y-2.5">
        {sources.map((s) => {
          const stat = breakdown.by_source[s];
          const widthPct = total > 0 ? (stat.minutes / total) * 100 : 0;
          return (
            <div key={s}>
              <div className="flex items-center justify-between text-[11.5px]">
                <div className="flex items-center gap-2">
                  <span className={cn('inline-block h-1.5 w-1.5 rounded-full', SOURCE_DOT[s])} />
                  <span className="text-white/85">{SOURCE_LABEL[s]}</span>
                  <span className="text-white/40 tabular-nums">{stat.entries}</span>
                </div>
                <span className="text-white/85 tabular-nums">{fmtMins(stat.minutes)}</span>
              </div>
              <div className="mt-1 h-1 rounded-full bg-white/[0.04] overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all duration-500', SOURCE_DOT[s])}
                  style={{ width: `${widthPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-white/55">
        <div>
          Last 7 days
          <span className="ml-1.5 text-white/85 tabular-nums">
            {fmtMins(breakdown.last_7_days_minutes)}
          </span>
        </div>
        <div>
          Last 30 days
          <span className="ml-1.5 text-white/85 tabular-nums">
            {fmtMins(breakdown.last_30_days_minutes)}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function EntryRow({ entry }: { entry: OtjEntry }) {
  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-4 sm:px-5 py-3.5 flex items-start gap-3">
      <span
        aria-hidden
        className={cn('mt-1.5 inline-block h-2 w-2 rounded-full flex-shrink-0', SOURCE_DOT[entry.source])}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="min-w-0 flex-1">
            <h3 className="text-[13.5px] font-medium text-white leading-tight truncate">
              {entry.title}
            </h3>
            <div className="mt-0.5 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[10.5px] text-white/55 tabular-nums">
              <span>{formatRelativeOrDate(entry.occurred_at)}</span>
              <span className="text-white/25">·</span>
              <Pill tone={SOURCE_TONE[entry.source]}>{SOURCE_LABEL[entry.source]}</Pill>
              {entry.category && entry.source === 'college' && (
                <>
                  <span className="text-white/25">·</span>
                  <span className="capitalize">{entry.category.replace(/_/g, ' ')}</span>
                </>
              )}
              {entry.recorded_by_name && (
                <>
                  <span className="text-white/25">·</span>
                  <span className="text-white/65">by {entry.recorded_by_name}</span>
                </>
              )}
              {entry.verified_at && (
                <>
                  <span className="text-white/25">·</span>
                  <span className="text-emerald-300/85">Verified</span>
                </>
              )}
            </div>
            {entry.unit_codes.length > 0 && (
              <div className="mt-1.5 flex items-center flex-wrap gap-1">
                {entry.unit_codes.slice(0, 4).map((u) => (
                  <span
                    key={u}
                    className="inline-flex items-center h-4 px-1.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono tabular-nums text-white/85"
                  >
                    {u}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="text-[13px] font-semibold text-white tabular-nums flex-shrink-0">
            {entry.duration_minutes > 0 ? fmtMins(entry.duration_minutes) : '—'}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function Skeleton() {
  return (
    <div className="space-y-2.5 animate-pulse">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-3.5"
        >
          <div className="h-3 w-2/3 rounded bg-white/[0.06]" />
          <div className="mt-2 h-2 w-1/3 rounded bg-white/[0.04]" />
        </div>
      ))}
    </div>
  );
}
