/**
 * TutorWorkloadSection — the head of department's "who is overloaded?" view,
 * on the shared hub language. Content only.
 *
 * The four SummaryTiles with coloured dots and `bg-white/5` became a KPI row;
 * the per-tutor tiles with a 2x2 grid of boxed metrics became one list card.
 * Red is kept where it encodes a real problem (an overloaded tutor, no
 * observation on record); heavy load is volt; balanced is quiet.
 *
 * Bands come from `useTutorWorkload` unchanged:
 *   red   — more than 6 cohorts or more than 10 pieces of marking waiting
 *   amber — more than 4 cohorts or more than 3 waiting
 */
import { motion } from 'framer-motion';
import { useTutorWorkload, type WorkloadBand } from '@/hooks/useTutorWorkload';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubKpi, HubKpiRow, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { containerVariants, itemVariants } from '@/components/college/primitives';

const LIST_CARD = cn(
  '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
  CARD_SURFACE
);

const BAND_LABEL: Record<WorkloadBand, string> = {
  red: 'Overloaded',
  amber: 'Heavy',
  green: 'Balanced',
};

const BAND_ORDER: Record<WorkloadBand, number> = { red: 0, amber: 1, green: 2 };

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

export function TutorWorkloadSection() {
  const { rows, loading, error } = useTutorWorkload();

  const counts = rows.reduce(
    (acc, r) => {
      acc[r.load_band] += 1;
      return acc;
    },
    { red: 0, amber: 0, green: 0 } as Record<WorkloadBand, number>
  );

  const overdueObsCount = rows.filter(
    (r) => r.last_observed_days_ago === null || r.last_observed_days_ago > 365
  ).length;

  const sorted = [...rows].sort((a, b) => {
    const band = BAND_ORDER[a.load_band] - BAND_ORDER[b.load_band];
    if (band !== 0) return band;
    return b.pending_grading - a.pending_grading;
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 sm:space-y-8"
    >
      <HubKpiRow>
        <HubKpi
          accent
          label="Overloaded"
          value={String(counts.red)}
          verdict={counts.red > 0 ? 'Move work off them this week' : 'Nobody overloaded'}
          context="More than 6 cohorts or more than 10 to mark"
          sentiment={counts.red > 0 ? 'bad' : 'neutral'}
        />
        <HubKpi
          label="Heavy"
          value={String(counts.amber)}
          verdict={counts.amber > 0 ? 'Watch before it tips over' : 'No one running heavy'}
          context="More than 4 cohorts or more than 3 to mark"
        />
        <HubKpi
          label="Balanced"
          value={String(counts.green)}
          verdict={counts.green > 0 ? 'Room to take on more' : 'Nobody with headroom'}
        />
        <HubKpi
          label="No observation in a year"
          value={String(overdueObsCount)}
          verdict={
            overdueObsCount > 0 ? 'Book an observation — Ofsted will ask' : 'Every tutor observed'
          }
          sentiment={overdueObsCount > 0 ? 'bad' : 'neutral'}
        />
      </HubKpiRow>

      <motion.section variants={itemVariants} className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <HubSectionHeading>By load</HubSectionHeading>
          {!loading && rows.length > 0 && (
            <span className="text-[11px] font-semibold tabular-nums text-white">
              {plural(rows.length, 'tutor')}
            </span>
          )}
        </div>

        <div className={LIST_CARD}>
          {loading ? (
            <div className="flex items-center gap-3 px-4 py-5 sm:px-5">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
              <span className="text-[12.5px] text-white">Working out each tutor’s load…</span>
            </div>
          ) : error ? (
            <div className="px-4 py-5 sm:px-5">
              <p className="text-[14px] font-semibold text-red-300">Couldn’t load workload</p>
              <p className="mt-1 text-[12.5px] leading-snug text-white">{error}</p>
            </div>
          ) : rows.length === 0 ? (
            <div className="px-4 py-5 sm:px-5">
              <p className="text-[14px] font-semibold text-white">No active tutors</p>
              <p className="mt-1 text-[12.5px] leading-snug text-white">
                Add tutors under People and their load appears here.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-white/[0.10]">
              {sorted.map((r) => {
                const obs =
                  r.last_observed_days_ago === null
                    ? 'No observation on record'
                    : `Observed ${r.last_observed_days_ago}d ago`;
                const obsProblem =
                  r.last_observed_days_ago === null || r.last_observed_days_ago > 365;
                const reason = [
                  r.role.replace(/_/g, ' '),
                  plural(r.active_cohorts, 'cohort'),
                  `${plural(r.lessons_this_week, 'lesson')} this week`,
                  `${r.pending_grading} to mark`,
                  `${r.comments_last_7d} comments in 7d`,
                ].join(' · ');
                return (
                  <li key={r.tutor_staff_id} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
                    <span
                      aria-hidden
                      className={cn(
                        'h-8 w-[3px] shrink-0 rounded-full',
                        r.load_band === 'red'
                          ? 'bg-red-400'
                          : r.load_band === 'amber'
                            ? 'bg-elec-yellow'
                            : 'bg-white/[0.25]'
                      )}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                        {r.name}
                      </span>
                      <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                        {reason}
                        {' · '}
                        <span className={cn(obsProblem && 'font-semibold text-red-300')}>{obs}</span>
                      </span>
                    </span>
                    <span
                      className={cn(
                        'shrink-0 text-[13px] font-semibold',
                        r.load_band === 'red'
                          ? 'text-red-300'
                          : r.load_band === 'amber'
                            ? 'text-elec-yellow'
                            : 'text-white'
                      )}
                    >
                      {BAND_LABEL[r.load_band]}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </motion.section>
    </motion.div>
  );
}
