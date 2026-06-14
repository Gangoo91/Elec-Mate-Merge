import { useMemo, useState } from 'react';
import { Shuffle, GitBranch, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import {
  useIqaCoverageMatrix,
  pickRandomSample,
  type CoverageCell,
} from '@/hooks/useIqaCoverageMatrix';
import { Pill } from '@/components/college/primitives';

/* ==========================================================================
   CoverageMatrixTab — Standards-Verifier × Cohort coverage grid.

   Rows: IQA/verifier; columns: cohort. Each cell shows sampled/total +
   coverage %. Cells under target glow red; on-target glow green. "Random
   sample" button per cell picks N unsampled learners from that cohort.
   ========================================================================== */

interface Props {
  /** Coverage benchmark % — Ofsted "rule of thumb" is 20% per IQA per cohort. */
  targetPct?: number;
  /** Optional time-window for "recent" sampling — defaults to all-time. */
  sinceDays?: number | null;
}

export function CoverageMatrixTab({ targetPct = 20, sinceDays = null }: Props) {
  const { toast } = useToast();
  const [window, setWindow] = useState<number | null>(sinceDays);
  const { cells, loading } = useIqaCoverageMatrix({
    targetPct,
    sinceDays: window ?? undefined,
  });

  const { samplers, cohorts, cellMap } = useMemo(() => {
    const sampMap = new Map<string, string>();
    const cohMap = new Map<string, string>();
    const cellMap = new Map<string, CoverageCell>();
    for (const c of cells) {
      sampMap.set(c.sampler_id, c.sampler_name);
      cohMap.set(c.cohort_id, c.cohort_name);
      cellMap.set(`${c.sampler_id}::${c.cohort_id}`, c);
    }
    return {
      samplers: Array.from(sampMap.entries()).sort((a, b) => a[1].localeCompare(b[1])),
      cohorts: Array.from(cohMap.entries()).sort((a, b) => a[1].localeCompare(b[1])),
      cellMap,
    };
  }, [cells]);

  const handlePick = async (samplerId: string, samplerName: string, cohortId: string, cohortName: string) => {
    try {
      const picks = await pickRandomSample({ samplerId, cohortId, n: 5 });
      if (picks.length === 0) {
        toast({
          title: 'No fresh learners to sample',
          description: `${samplerName} has already sampled every active learner in ${cohortName}.`,
        });
        return;
      }
      toast({
        title: `Random sample for ${cohortName}`,
        description: picks.map((p) => p.name).join(', '),
      });
    } catch (e) {
      toast({
        title: 'Could not generate sample',
        description: (e as Error).message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold text-white tracking-tight flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-elec-yellow" />
            Standards-Verifier coverage
          </h2>
          <p className="mt-1 text-[12px] text-white/70 max-w-2xl leading-snug">
            One row per IQA, one column per cohort they've sampled. Cells show how many
            distinct learners they've reached, vs the cohort's active size. Anything below
            <span className="text-elec-yellow font-semibold"> {targetPct}%</span> is flagged —
            this is the proof Ofsted look for.
          </p>
        </div>
        <div className="flex gap-2">
          {(
            [
              { value: null, label: 'All time' },
              { value: 365, label: '12 months' },
              { value: 180, label: '6 months' },
              { value: 90, label: '90 days' },
            ] as Array<{ value: number | null; label: string }>
          ).map((w) => (
            <button
              key={w.label}
              type="button"
              onClick={() => setWindow(w.value)}
              className={cn(
                'h-8 px-3 rounded-full border text-[11.5px] font-semibold transition-colors touch-manipulation',
                window === w.value
                  ? 'bg-elec-yellow/[0.12] border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/[0.04] border-white/[0.10] text-white/70 hover:bg-white/[0.08]'
              )}
            >
              {w.label}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="text-[12.5px] text-white/70">Crunching coverage…</div>
      )}

      {!loading && cells.length === 0 && (
        <div className="rounded-xl border border-dashed border-white/[0.10] px-4 py-10 text-center text-[12.5px] text-white/70">
          No IQA samples logged in this window. Once samples are recorded against learners,
          the coverage grid populates automatically.
        </div>
      )}

      {/* Mobile: one card per IQA, listing each cohort cell (no horizontal-scroll table) */}
      {!loading && cells.length > 0 && (
        <div className="space-y-3 sm:hidden">
          {samplers.map(([samplerId, samplerName]) => {
            const samplerCells = cohorts
              .map(([cohortId, cohortName]) => ({
                cohortId,
                cohortName,
                cell: cellMap.get(`${samplerId}::${cohortId}`),
              }))
              .filter((c) => c.cell);
            if (samplerCells.length === 0) return null;
            return (
              <div
                key={samplerId}
                className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden"
              >
                <div className="px-4 py-2.5 border-b border-white/[0.06] text-[13px] font-semibold text-white">
                  {samplerName}
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {samplerCells.map(({ cohortId, cohortName, cell }) => (
                    <div
                      key={cohortId}
                      className="flex items-center justify-between gap-3 px-4 py-3"
                    >
                      <span className="text-[12.5px] text-white/90 min-w-0 truncate">
                        {cohortName}
                      </span>
                      <CoverageCellView
                        cell={cell!}
                        target={targetPct}
                        onPick={() =>
                          handlePick(samplerId, samplerName, cohortId, cohortName)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* sm+: full matrix table */}
      {!loading && cells.length > 0 && (
        <div className="hidden sm:block rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-x-auto">
          <table className="min-w-full border-collapse text-[12px]">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="sticky left-0 z-10 bg-[hsl(0_0%_10%)] px-3 py-2.5 text-left text-[10px] uppercase tracking-[0.16em] text-white/70 whitespace-nowrap">
                  IQA / Verifier
                </th>
                {cohorts.map(([id, name]) => (
                  <th
                    key={id}
                    className="px-3 py-2.5 text-center text-[10px] uppercase tracking-[0.16em] text-white/70 whitespace-nowrap"
                  >
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {samplers.map(([samplerId, samplerName]) => (
                <tr key={samplerId} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                  <td className="sticky left-0 z-10 bg-[hsl(0_0%_10%)] px-3 py-3 text-white whitespace-nowrap font-medium">
                    {samplerName}
                  </td>
                  {cohorts.map(([cohortId, cohortName]) => {
                    const cell = cellMap.get(`${samplerId}::${cohortId}`);
                    if (!cell) {
                      return (
                        <td key={cohortId} className="px-3 py-3 text-center text-white/60">
                          —
                        </td>
                      );
                    }
                    return (
                      <td key={cohortId} className="px-3 py-3 text-center">
                        <CoverageCellView
                          cell={cell}
                          target={targetPct}
                          onPick={() =>
                            handlePick(samplerId, samplerName, cohortId, cohortName)
                          }
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function CoverageCellView({
  cell,
  target,
  onPick,
}: {
  cell: CoverageCell;
  target: number;
  onPick: () => void;
}) {
  const tone =
    cell.coverage_pct >= target
      ? 'bg-emerald-500/[0.08] border-emerald-400/30 text-emerald-200'
      : cell.coverage_pct >= target * 0.5
        ? 'bg-amber-500/[0.08] border-amber-400/30 text-amber-200'
        : 'bg-red-500/[0.08] border-red-400/30 text-red-200';
  return (
    <div className={cn('inline-flex flex-col items-center gap-1 rounded-lg border px-2 py-1.5', tone)}>
      <div className="text-[14px] font-semibold tabular-nums leading-none">
        {cell.coverage_pct}%
      </div>
      <div className="text-[10px] tabular-nums opacity-75">
        {cell.sampled_students}/{cell.total_students}
      </div>
      <button
        type="button"
        onClick={onPick}
        className="mt-0.5 inline-flex items-center gap-1 h-5 px-1.5 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-[9.5px] text-white touch-manipulation"
        title="Pick 5 random unsampled learners"
      >
        <Shuffle className="h-2.5 w-2.5" />
        Sample
      </button>
    </div>
  );
}

export function CoverageMatrixHeaderPill({ on, total }: { on: number; total: number }) {
  if (total === 0) return null;
  const pct = Math.round((on / total) * 100);
  const tone: 'green' | 'amber' | 'red' = pct >= 80 ? 'green' : pct >= 50 ? 'amber' : 'red';
  return (
    <Pill tone={tone}>
      <Target className="h-3 w-3 mr-1" /> {pct}% on-target
    </Pill>
  );
}
