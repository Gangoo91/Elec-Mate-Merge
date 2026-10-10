import { useState } from 'react';
import {
  panel,
  PanelTitle,
  Rows,
  Row,
  StatusPill,
  PlainEmpty,
  Segments,
  type PillTone,
} from '@/components/employer/pageParts/PageParts';
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

const tone = (pct: number | null): PillTone =>
  pct === null ? 'neutral' : pct >= 20 ? 'green' : pct < 10 ? 'red' : 'neutral';

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
    <section>
      <PanelTitle title="Margin by job type and worker" meta={periodLabel} />
      <div className={cn(panel, 'overflow-hidden')}>
        <div className="px-4 pt-3 sm:px-5">
          <Segments
            items={[
              { value: 'job_type' as const, label: 'By job type' },
              { value: 'worker' as const, label: 'By worker' },
            ]}
            value={view}
            onChange={setView}
          />
        </div>
        {isLoading ? (
          <div className="space-y-2 p-4 sm:p-5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-12 animate-pulse rounded-lg bg-white/[0.06]" />
            ))}
          </div>
        ) : error ? (
          <p className="p-4 text-[13px] text-red-300 sm:p-5">
            Couldn’t load margins: {(error as Error).message}
          </p>
        ) : rows.length === 0 ? (
          <PlainEmpty
            bare
            text={
              view === 'job_type'
                ? 'No invoiced jobs in this period. Margins show once a job with a job type is invoiced.'
                : 'No invoiced jobs in this period. Margins by worker show once invoiced jobs have approved timesheets.'
            }
          />
        ) : (
          <Rows className="mt-3 border-t border-white/[0.07]">
            {rows.map((r) => (
              <Row
                key={`${r.dimension}-${r.key}`}
                title={r.label}
                detail={`${subtitle(r)} · of ${formatGBPCompact(r.invoiced)}`}
                amount={
                  <span className={r.grossProfit < 0 ? 'text-red-400' : undefined}>
                    {formatGBPCompact(r.grossProfit)}
                  </span>
                }
                status={
                  <StatusPill tone={tone(r.marginPct)}>{formatMargin(r.marginPct)}</StatusPill>
                }
              />
            ))}
          </Rows>
        )}
        <p className="border-t border-white/[0.07] px-4 py-3 text-[13px] leading-relaxed text-white sm:px-5">
          Jobs with an invoice dated in the period, each counted whole (all invoices and costs to
          date).{' '}
          {view === 'worker'
            ? 'By worker: each job’s invoiced amount and its non-labour costs are shared by that person’s share of approved hours; their own labour cost is theirs.'
            : 'Gross profit is invoiced less costs, the same maths as Job financials.'}
        </p>
      </div>
    </section>
  );
}
