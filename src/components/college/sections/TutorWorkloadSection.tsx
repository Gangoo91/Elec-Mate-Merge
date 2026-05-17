import { motion } from 'framer-motion';
import { useTutorWorkload, type WorkloadBand } from '@/hooks/useTutorWorkload';
import {
  PageFrame,
  PageHero,
  Pill,
  SectionHeader,
  itemVariants,
  toneDot,
  type Tone,
} from '@/components/college/primitives';
import { cn } from '@/lib/utils';

/* ==========================================================================
   TutorWorkloadSection — HoD heatmap of every active tutor's current load.

   Tutors sorted red → amber → green so overloaded staff surface first.
   Each tile shows: cohorts, lessons this week, pending marking, days
   since last observation, recent comment activity.
   ========================================================================== */

const BAND_TONE: Record<WorkloadBand, Tone> = {
  red: 'red',
  amber: 'amber',
  green: 'emerald',
};

const BAND_LABEL: Record<WorkloadBand, string> = {
  red: 'Overloaded',
  amber: 'Heavy',
  green: 'Balanced',
};

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

  return (
    <PageFrame>
      <motion.div variants={itemVariants} initial="hidden" animate="visible">
        <PageHero
          eyebrow="Workload heatmap"
          title="Tutor load across the college"
          description="Cohorts, lessons this week, marking backlog and recency of observation per tutor. Red rows first — overloaded staff need help before week-end."
          tone="amber"
        />
      </motion.div>

      {/* Top-line summary */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="px-4 mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        <SummaryTile
          label="Overloaded"
          value={counts.red}
          tone="red"
          note=">6 cohorts or >10 pending"
        />
        <SummaryTile
          label="Heavy"
          value={counts.amber}
          tone="amber"
          note=">4 cohorts or >3 pending"
        />
        <SummaryTile label="Balanced" value={counts.green} tone="emerald" note="" />
        <SummaryTile
          label="Obs > 12 mo"
          value={overdueObsCount}
          tone={overdueObsCount > 0 ? 'red' : 'emerald'}
          note="Ofsted-critical"
        />
      </motion.div>

      <div className="px-4 mt-5 pb-16 space-y-4">
        {loading && <div className="text-sm text-white/60">Loading workload…</div>}
        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {!loading && rows.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 px-4 py-10 text-center text-sm text-white/40">
            No active tutors found in this college.
          </div>
        )}

        {!loading && rows.length > 0 && (
          <>
            <SectionHeader eyebrow="Per tutor" title="By load band" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {rows.map((r) => (
                <div
                  key={r.tutor_staff_id}
                  className={cn(
                    'rounded-2xl border bg-white/5 p-4 space-y-3',
                    r.load_band === 'red'
                      ? 'border-red-400/30'
                      : r.load_band === 'amber'
                        ? 'border-amber-400/30'
                        : 'border-white/10'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium text-white">{r.name}</div>
                      <div className="text-[10px] uppercase tracking-wider text-white/50">
                        {r.role.replace(/_/g, ' ')}
                      </div>
                    </div>
                    <Pill tone={BAND_TONE[r.load_band]}>{BAND_LABEL[r.load_band]}</Pill>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[12px]">
                    <Metric label="Cohorts" value={r.active_cohorts} />
                    <Metric label="Lessons this wk" value={r.lessons_this_week} />
                    <Metric label="Pending marking" value={r.pending_grading} accent={r.pending_grading > 3 ? 'amber' : undefined} />
                    <Metric
                      label="Comments 7d"
                      value={r.comments_last_7d}
                    />
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-white/60">
                    <span
                      className={cn(
                        'inline-block h-1.5 w-1.5 rounded-full',
                        r.last_observed_days_ago === null
                          ? toneDot.red
                          : r.last_observed_days_ago > 365
                            ? toneDot.red
                            : r.last_observed_days_ago > 180
                              ? toneDot.amber
                              : toneDot.emerald
                      )}
                    />
                    {r.last_observed_days_ago === null
                      ? 'No observation recorded'
                      : `Last observed ${r.last_observed_days_ago}d ago`}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </PageFrame>
  );
}

function SummaryTile({
  label,
  value,
  tone,
  note,
}: {
  label: string;
  value: number;
  tone: Tone;
  note: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/50">
        <span className={cn('inline-block h-1.5 w-1.5 rounded-full', toneDot[tone])} />
        {label}
      </div>
      <div className="mt-1 text-2xl font-semibold text-white">{value}</div>
      {note && <div className="text-[10px] text-white/40 mt-0.5">{note}</div>}
    </div>
  );
}

function Metric({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: 'amber' | 'red';
}) {
  return (
    <div
      className={cn(
        'rounded-lg border border-white/10 bg-black/20 px-2.5 py-2',
        accent === 'amber' && 'border-amber-400/40 bg-amber-500/10'
      )}
    >
      <div className="text-[10px] uppercase tracking-wider text-white/50">{label}</div>
      <div className="mt-0.5 text-base font-semibold text-white">{value}</div>
    </div>
  );
}
