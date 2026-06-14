import { useState } from 'react';
import { TrendingDown, TrendingUp, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAssessorDrift, type AssessorDriftRow } from '@/hooks/useAssessorDrift';

/* ==========================================================================
   AssessorDriftPanel — IQA Dashboard hero widget that surfaces assessors
   whose agreement rate is slipping. Collapses when nothing is red/amber.
   ========================================================================== */

export function AssessorDriftPanel() {
  const { rows, loading } = useAssessorDrift({ windowDays: 90 });
  const [expanded, setExpanded] = useState(false);

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-5 py-4 animate-pulse">
        <div className="h-3 w-32 rounded bg-white/[0.06]" />
        <div className="mt-2 h-4 w-48 rounded bg-white/[0.04]" />
      </div>
    );
  }

  const reds = rows.filter((r) => r.drift_level === 'red');
  const ambers = rows.filter((r) => r.drift_level === 'amber');

  // Nothing to flag → render an "all clear" pill so the absence of the
  // panel doesn't get misread as "data not loaded".
  if (reds.length === 0 && ambers.length === 0) {
    if (rows.length === 0) return null;
    return (
      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.04] px-4 py-3 flex items-center gap-3">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/[0.15] text-emerald-300">
          ✓
        </span>
        <div className="text-[12.5px] text-emerald-100">
          <span className="font-semibold">No assessor drift</span>{' '}
          <span className="text-emerald-100/70">— {rows.length} assessor{rows.length === 1 ? '' : 's'} tracked, all steady.</span>
        </div>
      </div>
    );
  }

  const visible = expanded ? rows : [...reds, ...ambers];

  return (
    <div className="rounded-2xl border border-amber-400/30 bg-amber-500/[0.04] overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full px-4 py-3 flex items-center justify-between gap-3 text-left hover:bg-amber-500/[0.06] transition-colors touch-manipulation"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <AlertTriangle className="h-4 w-4 text-amber-300 flex-shrink-0" />
          <div className="min-w-0">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-200/85">
              Assessor drift · 90 days
            </div>
            <div className="text-[13px] text-white font-semibold mt-0.5">
              {reds.length > 0 && (
                <>
                  <span className="text-red-300">{reds.length}</span> needs intervention
                </>
              )}
              {reds.length > 0 && ambers.length > 0 && <span className="text-white/70"> · </span>}
              {ambers.length > 0 && (
                <>
                  <span className="text-amber-300">{ambers.length}</span> to watch
                </>
              )}
            </div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] text-amber-200/70 flex-shrink-0">
          {expanded ? 'Hide all' : 'Show'} {rows.length}
          {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </span>
      </button>

      <ul className="divide-y divide-white/[0.04] border-t border-white/[0.04]">
        {visible.map((r) => (
          <li key={r.assessor_id}>
            <DriftRow row={r} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function DriftRow({ row }: { row: AssessorDriftRow }) {
  const tone =
    row.drift_level === 'red'
      ? 'text-red-200'
      : row.drift_level === 'amber'
        ? 'text-amber-200'
        : row.drift_level === 'green'
          ? 'text-emerald-200'
          : 'text-white/55';

  const pctBg =
    row.drift_level === 'red'
      ? 'bg-red-500/[0.10] border-red-400/30'
      : row.drift_level === 'amber'
        ? 'bg-amber-500/[0.10] border-amber-400/30'
        : row.drift_level === 'green'
          ? 'bg-emerald-500/[0.10] border-emerald-400/30'
          : 'bg-white/[0.04] border-white/[0.10]';

  const TrendIcon =
    row.delta_pp === null
      ? null
      : row.delta_pp >= 0
        ? TrendingUp
        : TrendingDown;

  return (
    <div className="px-4 py-3 flex items-center gap-3 flex-wrap">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[13.5px] font-semibold text-white">{row.assessor_name}</span>
          <span className="text-[10.5px] text-white/55 tabular-nums">
            {row.recent_samples} verdict{row.recent_samples === 1 ? '' : 's'}
          </span>
        </div>
        <div className={cn('mt-0.5 text-[11.5px] leading-snug', tone)}>{row.drift_reason}</div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {row.delta_pp !== null && TrendIcon && (
          <span
            className={cn(
              'inline-flex items-center gap-0.5 text-[11px] tabular-nums',
              row.delta_pp > 0
                ? 'text-emerald-300'
                : row.delta_pp < 0
                  ? 'text-red-300'
                  : 'text-white/55'
            )}
          >
            <TrendIcon className="h-3 w-3" />
            {row.delta_pp > 0 ? '+' : ''}
            {row.delta_pp}pp
          </span>
        )}
        <span
          className={cn(
            'inline-flex items-center justify-center min-w-[3.5rem] h-7 px-2 rounded-md border text-[12px] font-semibold tabular-nums',
            pctBg,
            tone
          )}
        >
          {row.agreement_pct === null ? '—' : `${row.agreement_pct}%`}
        </span>
      </div>
    </div>
  );
}
