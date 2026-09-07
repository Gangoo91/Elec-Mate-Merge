import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
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
import { chipBase, chipOff, inputCn } from '@/components/forms/fieldStyles';
import {
  useCollegeOtjOverview,
  type OtjLearnerSummary,
  type OtjStatus,
} from '@/hooks/useCollegeOtjOverview';

/* ==========================================================================
   CollegeOtjPage — /college/otj

   College-wide off-the-job training. The 6h/week minimum is the target
   band; learners below it come first.

   Rebuilt on the shared hub shell. What went: the hero (eyebrow, 32px
   headline, a paragraph explaining the ESFA rule), four tinted stat tiles,
   a progress ring per row and an amber verification button. The
   verification inbox is the one solid volt control; export is neutral.

   Status stays a colour only where it is a real problem: at risk is red
   text, behind is volt, on track and no data are plain white.

   Ids: `row.student_id` is the college row id (college_students.id) — the
   hook keys the hours on the learner's auth uid internally and hands back
   the college id for linking, which is what Student 360 takes.
   ========================================================================== */

const STATUS_LABEL: Record<OtjStatus, string> = {
  on_track: 'On track',
  behind: 'Behind',
  at_risk: 'At risk',
  no_data: 'No hours logged',
};

const FILTER_DEFS: { key: OtjStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'at_risk', label: 'At risk' },
  { key: 'behind', label: 'Behind' },
  { key: 'on_track', label: 'On track' },
  { key: 'no_data', label: 'No hours' },
];

const neutralButtonCn =
  'inline-flex h-11 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:bg-white/[0.10] active:scale-[0.98] disabled:bg-white/[0.03] disabled:opacity-60';

function fmtMins(m: number): string {
  if (m < 60) return `${Math.round(m)}m`;
  const h = m / 60;
  return h < 10 ? `${h.toFixed(1)}h` : `${Math.round(h)}h`;
}

function formatRelative(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  const now = new Date();
  const days = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' });
}

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

export default function CollegeOtjPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState<OtjStatus | 'all'>('all');
  const [search, setSearch] = useState('');
  const { rows, rollUp, loading, exportCsv } = useCollegeOtjOverview();

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    let list = statusFilter === 'all' ? rows : rows.filter((r) => r.status === statusFilter);
    if (needle) {
      list = list.filter((r) =>
        [r.name, r.cohort_name, r.course_name, r.employer_name]
          .filter(Boolean)
          .some((s) => (s as string).toLowerCase().includes(needle))
      );
    }
    return list;
  }, [rows, statusFilter, search]);

  const filterCount = (key: OtjStatus | 'all') =>
    key === 'all' ? rows.length : rows.filter((r) => r.status === key).length;

  const handleExport = () => {
    try {
      const csv = exportCsv();
      // BOM so Excel on Windows opens it as UTF-8 and renders £, é, etc.
      const blob = new Blob(['﻿', csv], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const stamp = new Date().toISOString().slice(0, 10);
      a.download = `otj-overview-${stamp}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({ title: 'CSV exported', description: `${rows.length} learners` });
    } catch (e) {
      toast({
        title: 'Export failed',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    }
  };

  const belowTarget = rollUp.at_risk + rollUp.behind;

  return (
    <HubPage>
      <HubMasthead
        section="College"
        title="Off-the-job training"
        backTo="/college?section=assessmenthub"
      />
      <HubBody pushContext="Get notified about marking, off-the-job hours and learners who need you">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-2.5 sm:flex-row sm:items-center"
        >
          <button
            type="button"
            onClick={() => navigate('/college/otj/inbox')}
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90 sm:w-auto"
          >
            Verification inbox
          </button>
          <button
            type="button"
            onClick={handleExport}
            disabled={loading || rows.length === 0}
            className={cn(neutralButtonCn, 'w-full sm:w-auto')}
          >
            Export ESFA CSV
          </button>
        </motion.div>

        <HubKpiRow>
          <HubKpi
            accent
            label="Learners"
            value={loading ? '—' : String(rollUp.total_learners)}
            verdict={
              loading
                ? undefined
                : rollUp.total_learners === 0
                  ? 'No learners in your college view'
                  : `${rollUp.no_data} with no hours logged`
            }
            onClick={() => setStatusFilter('all')}
          />
          <HubKpi
            label="On track"
            value={loading ? '—' : String(rollUp.on_track)}
            verdict={loading ? undefined : 'Meeting 6 hours this week'}
            sentiment={rollUp.on_track > 0 ? 'good' : 'neutral'}
            onClick={() => setStatusFilter('on_track')}
          />
          <HubKpi
            label="Below target"
            value={loading ? '—' : String(belowTarget)}
            verdict={
              loading
                ? undefined
                : rollUp.at_risk > 0
                  ? `${rollUp.at_risk} at risk — check in this week`
                  : belowTarget > 0
                    ? 'Behind but recoverable'
                    : 'Nobody below target'
            }
            context={loading ? undefined : `${rollUp.behind} behind · ${rollUp.at_risk} at risk`}
            sentiment={belowTarget > 0 ? 'bad' : 'neutral'}
            onClick={() => setStatusFilter(rollUp.at_risk > 0 ? 'at_risk' : 'behind')}
          />
          <HubKpi
            label="Average this week"
            value={loading ? '—' : `${rollUp.avg_weekly_hours}h`}
            verdict={loading ? undefined : `${rollUp.total_hours_this_week}h logged across the college`}
          />
        </HubKpiRow>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
            <HubSectionHeading>Learners</HubSectionHeading>
            <span
              className={cn(
                'text-[11px] font-semibold tabular-nums',
                filtered.some((r) => r.status === 'at_risk') ? 'text-elec-yellow' : 'text-white'
              )}
            >
              {plural(filtered.length, 'learner')}
            </span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {FILTER_DEFS.map((f) => {
              const active = statusFilter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setStatusFilter(f.key)}
                  aria-pressed={active}
                  className={cn(
                    chipBase,
                    'inline-flex shrink-0 snap-start items-center gap-2 px-3.5 text-[12.5px]',
                    active ? 'border-white bg-white font-semibold text-black' : chipOff
                  )}
                >
                  {f.label}
                  <span className="tabular-nums">{filterCount(f.key)}</span>
                </button>
              );
            })}
          </motion.div>

          <motion.div variants={itemVariants}>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by learner, cohort, course or employer"
              aria-label="Filter learners"
              className={inputCn}
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={cn(
              '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
              CARD_SURFACE
            )}
          >
            {loading && rows.length === 0 ? (
              <div className="space-y-px animate-pulse">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 bg-white/[0.04]" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <p className="px-4 py-8 text-center text-[13px] text-white sm:px-5">
                {rows.length === 0
                  ? 'No learners in your college view yet.'
                  : 'No learners match this filter.'}
              </p>
            ) : (
              <ul className="divide-y divide-white/[0.10]">
                {filtered.map((r) => (
                  <li key={r.student_id}>
                    <LearnerRow
                      row={r}
                      onClick={() =>
                        navigate(
                          `/college?section=student360&studentId=${encodeURIComponent(r.student_id)}#otj`
                        )
                      }
                    />
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </motion.section>
      </HubBody>
    </HubPage>
  );
}

/* ──────────────────────────────────────────────────────── */

function LearnerRow({ row, onClick }: { row: OtjLearnerSummary; onClick: () => void }) {
  const atRisk = row.status === 'at_risk';
  const behind = row.status === 'behind';

  const reason = [
    STATUS_LABEL[row.status],
    row.status !== 'no_data' ? `${row.weekly_progress_percent}% of this week's target` : null,
    row.cohort_name,
    row.course_name,
    row.employer_name,
    row.last_activity_at ? `last ${formatRelative(row.last_activity_at)}` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
    >
      <span
        aria-hidden="true"
        className={cn(
          'h-8 w-[3px] shrink-0 rounded-full',
          atRisk ? 'bg-red-400' : behind ? 'bg-elec-yellow' : 'bg-white/[0.25]'
        )}
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-semibold leading-tight text-white">
          {row.name}
        </span>
        <span
          className={cn(
            'mt-0.5 block truncate text-[12px] leading-tight',
            atRisk ? 'text-red-300' : behind ? 'text-elec-yellow' : 'text-white'
          )}
        >
          {reason}
        </span>
      </span>
      <span className="shrink-0 text-right">
        <span
          className={cn(
            'block text-[13px] font-semibold tabular-nums',
            atRisk ? 'text-red-300' : behind ? 'text-elec-yellow' : 'text-white'
          )}
        >
          {fmtMins(row.this_week_minutes)}
        </span>
        <span className="mt-0.5 block text-[11px] tabular-nums text-white">
          {fmtMins(row.last_4_weeks_minutes)} in 4w
        </span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
    </button>
  );
}
