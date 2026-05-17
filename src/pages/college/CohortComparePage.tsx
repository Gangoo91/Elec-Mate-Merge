import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, X, GitCompareArrows } from 'lucide-react';
import {
  PageFrame,
  PageHero,
  SectionHeader,
  Pill,
  itemVariants,
  type Tone,
} from '@/components/college/primitives';
import {
  useAvailableCohorts,
  useCohortComparison,
  type CohortStats,
} from '@/hooks/useCohortComparison';
import { cn } from '@/lib/utils';

/* ==========================================================================
   CohortComparePage — /college/compare
   HoD picks 2-3 cohorts → side-by-side stats: apprentice count, avg
   progress %, avg attendance %, OTJ hours, EPA verdict counts, at-risk.
   Each metric also shows a relative tone (green/amber/red) by ranking
   among the selected cohorts so outliers pop.
   ========================================================================== */

const MAX_COHORTS = 3;

export default function CohortComparePage() {
  const navigate = useNavigate();
  const { cohorts: available, loading: cohortsLoading } = useAvailableCohorts();
  const [selected, setSelected] = useState<string[]>([]);
  const { rows, loading } = useCohortComparison(selected);

  const canAddMore = selected.length < MAX_COHORTS;

  const toggle = (id: string) => {
    setSelected((cur) => {
      if (cur.includes(id)) return cur.filter((x) => x !== id);
      if (cur.length >= MAX_COHORTS) return cur;
      return [...cur, id];
    });
  };

  // Rank each metric across selected cohorts so the UI can colour outliers
  const rankings = useMemo(() => computeRankings(rows), [rows]);

  return (
    <PageFrame className="max-w-[1280px]">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-[12.5px] text-white/70 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back
      </button>

      <motion.div variants={itemVariants} initial="hidden" animate="visible">
        <PageHero
          eyebrow="Cohort comparison"
          title="Compare cohorts side-by-side"
          description={`Pick up to ${MAX_COHORTS} cohorts. Each metric shows the best, middle and worst of the selection in green / amber / red so outliers surface immediately.`}
          tone="blue"
        />
      </motion.div>

      {/* Cohort picker */}
      <motion.section
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="px-4 mt-2 space-y-3"
      >
        <SectionHeader eyebrow="Step 1" title="Choose cohorts" />

        {cohortsLoading && (
          <div className="text-[12.5px] text-white/55">Loading cohorts…</div>
        )}

        {!cohortsLoading && available.length === 0 && (
          <div className="rounded-xl border border-dashed border-white/10 px-4 py-8 text-center text-[12.5px] text-white/45">
            No cohorts found in this college.
          </div>
        )}

        {available.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {available.map((c) => {
              const isSelected = selected.includes(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggle(c.id)}
                  disabled={!isSelected && !canAddMore}
                  className={cn(
                    'inline-flex items-center gap-1.5 h-9 px-3 rounded-full border text-[12.5px] font-semibold transition-colors touch-manipulation',
                    isSelected
                      ? 'bg-elec-yellow/[0.12] border-elec-yellow/50 text-elec-yellow'
                      : 'bg-white/[0.04] border-white/[0.10] text-white/75 hover:bg-white/[0.08]',
                    !isSelected && !canAddMore && 'opacity-30 cursor-not-allowed'
                  )}
                >
                  {c.name}
                  {isSelected && <X className="h-3 w-3" />}
                </button>
              );
            })}
          </div>
        )}

        <div className="text-[10.5px] uppercase tracking-[0.16em] text-white/45">
          {selected.length}/{MAX_COHORTS} selected
        </div>
      </motion.section>

      {/* Comparison grid */}
      {selected.length > 0 && (
        <motion.section
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="px-4 mt-6 pb-16 space-y-4"
        >
          <SectionHeader eyebrow="Step 2" title="Side-by-side" />

          {loading && (
            <div className="text-[12.5px] text-white/55">Crunching stats…</div>
          )}

          {!loading && rows.length > 0 && (
            <div
              className={cn(
                'grid gap-3',
                // 1 column on phones (stack), 2 from sm, then match cohort count up to 3
                rows.length === 1
                  ? 'grid-cols-1'
                  : rows.length === 2
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              )}
            >
              {rows.map((r) => (
                <CohortColumn key={r.cohort_id} stats={r} rankings={rankings} />
              ))}
            </div>
          )}
        </motion.section>
      )}
    </PageFrame>
  );
}

interface Rankings {
  // For each metric, ordered list of cohort_ids from best → worst
  progress: Record<string, Tone>;
  attendance: Record<string, Tone>;
  otj: Record<string, Tone>;
  epa_ready_pct: Record<string, Tone>;
  at_risk_pct: Record<string, Tone>;
}

function rankTone(values: Array<{ id: string; v: number | null }>, lowerIsBetter = false): Record<string, Tone> {
  // 3-way bucket: best green, middle amber, worst red. With 2 cohorts, just best vs worst.
  const valid = values.filter((x) => x.v !== null) as Array<{ id: string; v: number }>;
  if (valid.length === 0) return {};
  const sorted = [...valid].sort((a, b) => (lowerIsBetter ? a.v - b.v : b.v - a.v));
  const result: Record<string, Tone> = {};
  if (sorted.length === 1) {
    result[sorted[0].id] = 'blue';
    return result;
  }
  if (sorted.length === 2) {
    result[sorted[0].id] = 'green';
    result[sorted[1].id] = 'red';
    return result;
  }
  result[sorted[0].id] = 'green';
  result[sorted[1].id] = 'amber';
  result[sorted[2].id] = 'red';
  return result;
}

function computeRankings(rows: CohortStats[]): Rankings {
  return {
    progress: rankTone(rows.map((r) => ({ id: r.cohort_id, v: r.avg_progress_pct }))),
    attendance: rankTone(rows.map((r) => ({ id: r.cohort_id, v: r.avg_attendance_pct }))),
    otj: rankTone(rows.map((r) => ({ id: r.cohort_id, v: r.otj_total_hours }))),
    epa_ready_pct: rankTone(
      rows.map((r) => ({
        id: r.cohort_id,
        v: r.apprentice_count > 0 ? (r.epa_ready / r.apprentice_count) * 100 : null,
      }))
    ),
    at_risk_pct: rankTone(
      rows.map((r) => ({
        id: r.cohort_id,
        v: r.apprentice_count > 0 ? (r.at_risk / r.apprentice_count) * 100 : null,
      })),
      true // lower is better
    ),
  };
}

function CohortColumn({
  stats,
  rankings,
}: {
  stats: CohortStats;
  rankings: Rankings;
}) {
  const epaReadyPct =
    stats.apprentice_count > 0
      ? Math.round((stats.epa_ready / stats.apprentice_count) * 100)
      : null;
  const atRiskPct =
    stats.apprentice_count > 0
      ? Math.round((stats.at_risk / stats.apprentice_count) * 100)
      : null;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 space-y-3 min-w-0">
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="min-w-0 flex-1">
          <div className="text-[10px] uppercase tracking-[0.16em] text-white/45 inline-flex items-center gap-1">
            <GitCompareArrows className="h-3 w-3" />
            Cohort
          </div>
          <h3 className="mt-0.5 text-[14px] font-semibold text-white truncate">
            {stats.cohort_name ?? 'Untitled'}
          </h3>
        </div>
        <Pill tone="blue">{stats.apprentice_count}</Pill>
      </div>

      <Metric
        label="Avg progress"
        value={stats.avg_progress_pct != null ? `${stats.avg_progress_pct}%` : '—'}
        tone={rankings.progress[stats.cohort_id]}
      />
      <Metric
        label="Avg attendance"
        value={stats.avg_attendance_pct != null ? `${stats.avg_attendance_pct}%` : '—'}
        tone={rankings.attendance[stats.cohort_id]}
      />
      <Metric
        label="OTJ total"
        value={`${stats.otj_total_hours}h`}
        sub={stats.otj_verified_hours > 0 ? `${stats.otj_verified_hours}h verified` : undefined}
        tone={rankings.otj[stats.cohort_id]}
      />

      <div className="pt-2 border-t border-white/[0.06]">
        <div className="text-[10px] uppercase tracking-[0.16em] text-white/45 mb-1.5">EPA</div>
        <div className="grid grid-cols-4 gap-1 text-[11.5px] tabular-nums">
          <VerdictCell label="Ready" value={stats.epa_ready} tone="emerald" />
          <VerdictCell label="Almost" value={stats.epa_almost} tone="amber" />
          <VerdictCell label="Not yet" value={stats.epa_not_yet} tone="red" />
          <VerdictCell label="None" value={stats.epa_no_verdict} tone="grey" />
        </div>
        {epaReadyPct != null && (
          <div className="mt-1 text-[10.5px] text-white/55">
            {epaReadyPct}% gateway-ready
          </div>
        )}
      </div>

      <Metric
        label="At risk"
        value={`${stats.at_risk}${atRiskPct != null ? ` (${atRiskPct}%)` : ''}`}
        tone={rankings.at_risk_pct[stats.cohort_id]}
      />
    </div>
  );
}

function Metric({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: Tone;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[10px] uppercase tracking-[0.16em] text-white/55">{label}</span>
        {tone && <span className={cn('h-1.5 w-1.5 rounded-full', toneDot(tone))} />}
      </div>
      <div className="mt-0.5 text-[16px] font-semibold tabular-nums text-white">{value}</div>
      {sub && <div className="text-[10.5px] text-white/45">{sub}</div>}
    </div>
  );
}

function VerdictCell({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: 'emerald' | 'amber' | 'red' | 'grey';
}) {
  return (
    <div
      className={cn(
        'rounded-md px-1.5 py-1 text-center',
        tone === 'emerald' && 'bg-emerald-500/[0.10] text-emerald-200',
        tone === 'amber' && 'bg-amber-500/[0.10] text-amber-200',
        tone === 'red' && 'bg-red-500/[0.10] text-red-200',
        tone === 'grey' && 'bg-white/[0.04] text-white/55'
      )}
    >
      <div className="text-[14px] font-semibold tabular-nums">{value}</div>
      <div className="text-[9px] uppercase tracking-[0.10em]">{label}</div>
    </div>
  );
}

function toneDot(tone: Tone): string {
  switch (tone) {
    case 'green':
    case 'emerald':
      return 'bg-emerald-400';
    case 'amber':
      return 'bg-amber-400';
    case 'red':
      return 'bg-red-400';
    case 'blue':
      return 'bg-blue-400';
    case 'yellow':
      return 'bg-yellow-400';
    case 'purple':
      return 'bg-purple-400';
    case 'cyan':
      return 'bg-cyan-400';
    case 'orange':
      return 'bg-orange-400';
    default:
      return 'bg-white/40';
  }
}
