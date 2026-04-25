import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import {
  PageFrame,
  itemVariants,
  Pill,
  type Tone,
} from '@/components/college/primitives';
import {
  useCollegeOtjOverview,
  type OtjLearnerSummary,
  type OtjStatus,
} from '@/hooks/useCollegeOtjOverview';

/* ==========================================================================
   CollegeOtjPage — /college/otj
   College-wide off-the-job training dashboard. ESFA-aligned: 6h/week
   minimum is the target band; we surface at-risk learners first.
   ========================================================================== */

const STATUS_TONE: Record<OtjStatus, Tone> = {
  on_track: 'emerald',
  behind: 'amber',
  at_risk: 'red',
  no_data: 'cyan',
};

const STATUS_LABEL: Record<OtjStatus, string> = {
  on_track: 'On track',
  behind: 'Behind',
  at_risk: 'At risk',
  no_data: 'No data',
};

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
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' });
}

export default function CollegeOtjPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState<OtjStatus | 'all'>('all');
  const { rows, rollUp, loading, exportCsv } = useCollegeOtjOverview();

  const filtered = useMemo(
    () => (statusFilter === 'all' ? rows : rows.filter((r) => r.status === statusFilter)),
    [rows, statusFilter]
  );

  const handleExport = () => {
    try {
      const csv = exportCsv();
      // BOM so Excel on Windows opens it as UTF-8 and renders £, é, etc.
      const blob = new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' });
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

  return (
    <PageFrame className="max-w-[1280px] pb-28 lg:pb-8">
      <motion.div variants={itemVariants} className="no-print">
        <button
          onClick={() => navigate(-1)}
          className="text-[12px] font-medium text-white/65 hover:text-white transition-colors touch-manipulation"
        >
          ← Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-4">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Off-the-job training
        </div>
        <div className="mt-1 flex items-end justify-between gap-4 flex-wrap">
          <h1 className="text-2xl sm:text-[32px] font-semibold text-white tracking-tight leading-tight">
            OTJ overview
          </h1>
          <button
            type="button"
            onClick={handleExport}
            className="h-10 px-4 rounded-full text-[12.5px] font-medium border border-white/[0.12] text-white hover:bg-white/[0.06] transition-colors touch-manipulation"
          >
            Export ESFA CSV
          </button>
        </div>
        <p className="mt-2 text-[12.5px] text-white/65 leading-relaxed max-w-2xl">
          ESFA expects 6 hours per week off-the-job training. Banding shows whether
          each learner is meeting the threshold this week. Tap a row to open Student
          360.
        </p>
      </motion.div>

      {/* Roll-up stats */}
      <motion.div variants={itemVariants} className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <StatCard label="Learners" value={String(rollUp.total_learners)} />
        <StatCard
          label="On track"
          value={String(rollUp.on_track)}
          sub="meeting weekly target"
          tone="emerald"
        />
        <StatCard
          label="At risk"
          value={String(rollUp.at_risk + rollUp.behind)}
          sub={`${rollUp.at_risk} critical`}
          tone={rollUp.at_risk > 0 ? 'red' : 'amber'}
        />
        <StatCard
          label="Avg this week"
          value={`${rollUp.avg_weekly_hours}h`}
          sub={`${rollUp.total_hours_this_week}h total`}
        />
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="mt-5 flex items-center gap-2 flex-wrap no-print">
        <FilterChip active={statusFilter === 'all'} onClick={() => setStatusFilter('all')}>
          All <span className="text-white/45 ml-1">{rows.length}</span>
        </FilterChip>
        <FilterChip
          active={statusFilter === 'at_risk'}
          tone="red"
          onClick={() => setStatusFilter('at_risk')}
        >
          At risk <span className="text-white/45 ml-1">{rollUp.at_risk}</span>
        </FilterChip>
        <FilterChip
          active={statusFilter === 'behind'}
          tone="amber"
          onClick={() => setStatusFilter('behind')}
        >
          Behind <span className="text-white/45 ml-1">{rollUp.behind}</span>
        </FilterChip>
        <FilterChip
          active={statusFilter === 'on_track'}
          tone="emerald"
          onClick={() => setStatusFilter('on_track')}
        >
          On track <span className="text-white/45 ml-1">{rollUp.on_track}</span>
        </FilterChip>
        <FilterChip
          active={statusFilter === 'no_data'}
          onClick={() => setStatusFilter('no_data')}
        >
          No data <span className="text-white/45 ml-1">{rollUp.no_data}</span>
        </FilterChip>
      </motion.div>

      {/* Table / list */}
      <motion.div variants={itemVariants} className="mt-4">
        {loading && filtered.length === 0 ? (
          <Skeleton />
        ) : filtered.length === 0 ? (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-10 text-center">
            <p className="text-[12.5px] text-white/65">
              {statusFilter === 'all'
                ? 'No learners in your college view yet.'
                : `No learners in this band right now.`}
            </p>
          </div>
        ) : (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
            <ul className="divide-y divide-white/[0.04]">
              {filtered.map((r) => (
                <LearnerRow
                  key={r.student_id}
                  row={r}
                  onClick={() => navigate(`/college/students/${r.student_id}`)}
                />
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </PageFrame>
  );
}

/* ──────────────────────────────────────────────────────── */

function LearnerRow({
  row,
  onClick,
}: {
  row: OtjLearnerSummary;
  onClick: () => void;
}) {
  const pct = row.weekly_progress_percent;
  const ringColour =
    row.status === 'on_track'
      ? 'stroke-emerald-400'
      : row.status === 'behind'
        ? 'stroke-amber-400'
        : row.status === 'at_risk'
          ? 'stroke-red-400'
          : 'stroke-white/30';

  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="w-full px-4 sm:px-5 py-3.5 flex items-center gap-3 text-left hover:bg-white/[0.02] transition-colors touch-manipulation"
      >
        {/* Mini ring */}
        <div className="relative h-10 w-10 flex-shrink-0">
          <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
            <circle cx="18" cy="18" r="15.5" fill="none" strokeWidth="3" className="stroke-white/[0.08]" />
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${(pct / 100) * 97.4} 97.4`}
              className={cn('transition-all duration-500', ringColour)}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[9px] font-semibold text-white tabular-nums">
            {pct}%
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[13.5px] font-medium text-white truncate">{row.name}</span>
            <Pill tone={STATUS_TONE[row.status]}>{STATUS_LABEL[row.status]}</Pill>
          </div>
          <div className="mt-0.5 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[10.5px] text-white/55 tabular-nums">
            {row.cohort_name && <span>{row.cohort_name}</span>}
            {row.cohort_name && row.course_name && <span className="text-white/25">·</span>}
            {row.course_name && <span>{row.course_name}</span>}
            {row.employer_name && (
              <>
                <span className="text-white/25">·</span>
                <span>{row.employer_name}</span>
              </>
            )}
            {row.last_activity_at && (
              <>
                <span className="text-white/25">·</span>
                <span>Last {formatRelative(row.last_activity_at)}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 text-right">
          <div className="text-[13px] font-semibold text-white tabular-nums leading-none">
            {fmtMins(row.this_week_minutes)}
          </div>
          <div className="mt-0.5 text-[10px] text-white/55 tabular-nums">
            this week · {fmtMins(row.last_4_weeks_minutes)} 4w
          </div>
        </div>
      </button>
    </li>
  );
}

/* ──────────────────────────────────────────────────────── */

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
          'mt-1 text-[20px] font-semibold tabular-nums leading-none',
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

function FilterChip({
  active,
  onClick,
  tone,
  children,
}: {
  active: boolean;
  onClick: () => void;
  tone?: 'emerald' | 'amber' | 'red';
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'h-8 px-3 rounded-full text-[11.5px] font-medium border transition-colors touch-manipulation',
        active
          ? tone === 'emerald'
            ? 'border-emerald-500/40 bg-emerald-500/[0.1] text-emerald-200'
            : tone === 'amber'
              ? 'border-amber-500/40 bg-amber-500/[0.1] text-amber-200'
              : tone === 'red'
                ? 'border-red-500/40 bg-red-500/[0.1] text-red-200'
                : 'border-white/30 bg-white/[0.08] text-white'
          : 'border-white/[0.1] bg-white/[0.03] text-white/65 hover:text-white hover:border-white/[0.22]'
      )}
    >
      {children}
    </button>
  );
}

function Skeleton() {
  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.04] animate-pulse">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="px-5 py-3.5 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white/[0.06] flex-shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 w-1/3 rounded bg-white/[0.06]" />
            <div className="h-2 w-1/2 rounded bg-white/[0.04]" />
          </div>
        </div>
      ))}
    </div>
  );
}
