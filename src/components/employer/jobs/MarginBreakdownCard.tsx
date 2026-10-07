import { useState } from 'react';
import { ListCard, ListCardHeader, ListBody, ListRow, Pill, EmptyState } from '@/components/employer/editorial';
import { useMarginBreakdown, type MarginRow } from '@/hooks/useJobProfit';
import { formatGBPCompact, formatMargin } from '@/lib/financeDefinitions';
import { cn } from '@/lib/utils';

/**
 * ELE-1824 — Reports: margin by job type and by worker for a period, so the
 * next quote starts from reality ("EICRs 38%, consumer units 22%"). Real data
 * only (ELE-558): jobs with a sent, overdue or paid invoice dated in the
 * period, each counted with its whole-job invoiced and costs. Owner/admin
 * only — get_margin_breakdown refuses office managers.
 */

const tone = (pct: number | null) =>
  pct === null ? 'blue' : pct >= 20 ? 'emerald' : pct >= 10 ? 'amber' : 'red';

const hrs = (n: number) => n.toLocaleString('en-GB', { maximumFractionDigits: 1 });

function subtitle(r: MarginRow): string {
  const parts = [`${r.jobs} job${r.jobs === 1 ? '' : 's'}`];
  if (r.hours > 0) parts.push(`${hrs(r.hours)} hrs`);
  if (r.quotedHours && r.quotedHours > 0 && r.actualHoursOnQuoted !== null) {
    const diff = ((r.actualHoursOnQuoted - r.quotedHours) / r.quotedHours) * 100;
    parts.push(
      Math.abs(diff) < 1
        ? 'on quote'
        : `${Math.abs(diff).toFixed(0)}% ${diff > 0 ? 'over' : 'under'} quote`
    );
  }
  return parts.join(' · ');
}

export function MarginBreakdownCard({
  from,
  to,
  periodLabel,
}: {
  from: string | null;
  to: string | null;
  periodLabel: string;
}) {
  const [view, setView] = useState<'job_type' | 'worker'>('job_type');
  const { data = [], isLoading, error } = useMarginBreakdown(from, to);
  const rows = data.filter((r) => r.dimension === view);

  return (
    <ListCard>
      <ListCardHeader tone="emerald" title="Margin by job type and worker" meta={<Pill tone="blue">{periodLabel}</Pill>} />
      <div className="px-4 sm:px-5 pt-3 flex gap-2" role="tablist">
        {(
          [
            ['job_type', 'By job type'],
            ['worker', 'By worker'],
          ] as const
        ).map(([v, label]) => (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={view === v}
            onClick={() => setView(v)}
            className={cn(
              'h-11 px-4 rounded-full border text-[13px] touch-manipulation transition',
              view === v
                ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
                : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
            )}
          >
            {label}
          </button>
        ))}
      </div>
      {isLoading ? (
        <div className="p-4 sm:p-5 space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-12 rounded-lg bg-white/[0.06] animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <p className="p-4 sm:p-5 text-[13px] text-red-300">
          Couldn’t load margins: {(error as Error).message}
        </p>
      ) : rows.length === 0 ? (
        <div className="p-4 sm:p-5">
          <EmptyState
            title="No invoiced jobs in this period"
            description={
              view === 'job_type'
                ? 'Margins appear once a job with a job type is invoiced. Set the job type on each job.'
                : 'Margins by worker appear once invoiced jobs have approved timesheets.'
            }
          />
        </div>
      ) : (
        <ListBody>
          {rows.map((r) => (
            <ListRow
              key={`${r.dimension}-${r.key}`}
              title={r.label}
              subtitle={subtitle(r)}
              trailing={
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'text-[14px] font-semibold tabular-nums',
                      r.grossProfit < 0 ? 'text-red-300' : 'text-white'
                    )}
                  >
                    {formatGBPCompact(r.grossProfit)}
                    <span className="block text-[11px] font-normal text-white text-right">
                      of {formatGBPCompact(r.invoiced)}
                    </span>
                  </span>
                  <Pill tone={tone(r.marginPct)}>{formatMargin(r.marginPct)}</Pill>
                </div>
              }
            />
          ))}
        </ListBody>
      )}
      <p className="px-4 sm:px-5 pb-4 pt-1 text-[12px] text-white leading-relaxed">
        Jobs with an invoice dated in the period, each counted whole (all invoices and costs to
        date). {view === 'worker'
          ? 'By worker: each job’s invoiced amount and its non-labour costs are shared by that person’s share of approved hours; their own labour cost is theirs.'
          : 'Gross profit is invoiced less costs, the same maths as Job financials.'}
      </p>
    </ListCard>
  );
}
