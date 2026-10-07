import { useJobProfit, type JobProfit } from '@/hooks/useJobProfit';
import { formatGBP } from '@/lib/financeDefinitions';
import { cn } from '@/lib/utils';

/**
 * ELE-1824 — the Profit block. One job's profit from the shared finance
 * model (get_job_profit): what was quoted and invoiced against labour
 * (approved hours × each person's cost rate), materials, expenses and other
 * costs, plus quoted vs actual hours. Recomputed server-side on every read,
 * refetched live as timesheets, expenses and invoices on the job change.
 *
 * Every figure says where it comes from, and nothing reads £0 unless it is a
 * real zero: an empty cost line reads "None yet", no costs at all reads
 * "No costs yet". Office managers get nulls from SQL and see hours only.
 */

const hrs = (n: number) =>
  `${n.toLocaleString('en-GB', { maximumFractionDigits: 1 })} hr${Math.abs(n - 1) < 0.05 ? '' : 's'}`;

const SEGMENTS = [
  { key: 'labour', label: 'Labour', bar: 'bg-sky-400', dot: 'bg-sky-400' },
  { key: 'materials', label: 'Materials', bar: 'bg-amber-400', dot: 'bg-amber-400' },
  { key: 'expenses', label: 'Expenses', bar: 'bg-violet-400', dot: 'bg-violet-400' },
  { key: 'otherCosts', label: 'Other', bar: 'bg-cyan-400', dot: 'bg-cyan-400' },
] as const;

function HoursMeter({ p, onSetQuotedHours }: { p: JobProfit; onSetQuotedHours?: () => void }) {
  const quoted = p.quotedHours;
  const used = p.approvedHours;
  const over = quoted !== null && quoted > 0 && used > quoted;
  const pct = quoted && quoted > 0 ? Math.min(100, (used / quoted) * 100) : 0;
  const pendingPct =
    quoted && quoted > 0 ? Math.min(100 - pct, (p.pendingHours / quoted) * 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[13px] font-medium text-white">Hours on this job</p>
        <p className={cn('text-[15px] font-semibold tabular-nums', over ? 'text-red-300' : 'text-white')}>
          {quoted !== null && quoted > 0 ? (
            <>
              {used.toLocaleString('en-GB', { maximumFractionDigits: 1 })}
              <span className="font-normal text-white"> of {hrs(quoted)} quoted</span>
            </>
          ) : (
            hrs(used)
          )}
        </p>
      </div>
      {quoted !== null && quoted > 0 && (
        <div
          className="h-2 rounded-full bg-white/[0.08] overflow-hidden flex"
          role="img"
          aria-label={`${used} of ${quoted} quoted hours used`}
        >
          <div
            className={cn('h-full', over ? 'bg-red-400' : pct >= 85 ? 'bg-orange-400' : 'bg-emerald-400')}
            style={{ width: `${pct}%` }}
          />
          {pendingPct > 0 && (
            <div className="h-full bg-white/30" style={{ width: `${pendingPct}%` }} />
          )}
        </div>
      )}
      <p className="text-[12px] text-white leading-snug">
        {used > 0 ? 'Approved timesheets' : 'No approved time yet'}
        {p.pendingHours > 0 && ` · ${hrs(p.pendingHours)} waiting for approval`}
        {over && quoted !== null && (
          <span className="text-red-300 font-medium"> · {hrs(used - quoted)} over the quote</span>
        )}
        {quoted === null && (
          <>
            {' · '}
            {onSetQuotedHours ? (
              <button
                type="button"
                onClick={onSetQuotedHours}
                className="underline underline-offset-2 font-medium text-elec-yellow touch-manipulation"
              >
                Add quoted hours
              </button>
            ) : (
              'no quoted hours set'
            )}
          </>
        )}
      </p>
    </div>
  );
}

function Line({
  label,
  source,
  value,
  dot,
  tone,
}: {
  label: string;
  source: string;
  value: string;
  dot?: string;
  tone?: 'red' | 'emerald';
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-2.5">
      <div className="min-w-0 flex items-start gap-2">
        {dot && <span className={cn('mt-1.5 h-2 w-2 shrink-0 rounded-full', dot)} aria-hidden />}
        <div className="min-w-0">
          <p className="text-[13.5px] font-medium text-white">{label}</p>
          <p className="text-[11.5px] text-white leading-snug">{source}</p>
        </div>
      </div>
      <p
        className={cn(
          'shrink-0 text-[14px] font-semibold tabular-nums text-right',
          tone === 'red' ? 'text-red-300' : tone === 'emerald' ? 'text-emerald-400' : 'text-white'
        )}
      >
        {value}
      </p>
    </div>
  );
}

export function JobProfitView({
  p,
  onSetQuotedHours,
  onOpenFinancials,
}: {
  p: JobProfit;
  onSetQuotedHours?: () => void;
  onOpenFinancials?: () => void;
}) {
  const money = p.moneyVisible && p.totalCosts !== null;
  const costs = p.totalCosts ?? 0;
  const noCosts = (p.costLines ?? 0) === 0;
  const invoiced = p.invoiced;
  const profit = p.grossProfit ?? 0;
  const base = Math.max(invoiced, costs, p.contractValue, 1);
  const val = (k: (typeof SEGMENTS)[number]['key']) => Math.max(0, Number(p[k] ?? 0));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[15px] font-semibold tracking-tight text-white">
          {money ? 'Profit' : 'Time'}
        </p>
        <span
          className={cn(
            'rounded-full border px-2.5 py-1 text-[11px] font-semibold',
            p.stage === 'final'
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              : 'border-white/[0.14] bg-white/[0.06] text-white'
          )}
        >
          {p.stage === 'final' ? 'Final · job closed' : 'Running · job open'}
        </span>
      </div>

      <HoursMeter p={p} onSetQuotedHours={onSetQuotedHours} />

      {money && (
        <>
          <div className="border-t border-white/[0.1] pt-4 space-y-3">
            {noCosts && invoiced === 0 ? (
              <p className="text-[13px] text-white">
                No costs or invoices on this job yet. Profit appears here as time is approved,
                expenses and materials are booked, and invoices go out.
              </p>
            ) : (
              <>
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-white">
                      Gross profit · invoiced less costs
                    </p>
                    <p
                      className={cn(
                        'mt-0.5 text-[24px] font-bold tabular-nums leading-none',
                        invoiced > 0 && profit < 0 ? 'text-red-300' : 'text-white'
                      )}
                    >
                      {invoiced > 0 ? formatGBP(profit) : 'Not invoiced yet'}
                    </p>
                  </div>
                  {invoiced > 0 && p.marginPct !== null && (
                    <p
                      className={cn(
                        'text-[15px] font-semibold tabular-nums',
                        p.marginPct < 0 ? 'text-red-300' : p.marginPct < 15 ? 'text-orange-300' : 'text-emerald-400'
                      )}
                    >
                      {p.marginPct.toFixed(1)}% margin
                    </p>
                  )}
                </div>

                {/* The bar: costs by kind, then what is left of the invoiced
                    amount. Scaled to the larger of invoiced, quoted or costs. */}
                <div
                  className="h-3 rounded-full bg-white/[0.08] overflow-hidden flex"
                  role="img"
                  aria-label={`Costs ${formatGBP(costs)} against ${formatGBP(invoiced)} invoiced`}
                >
                  {SEGMENTS.map((s) => (
                    <div key={s.key} className={cn('h-full', s.bar)} style={{ width: `${(val(s.key) / base) * 100}%` }} />
                  ))}
                  {invoiced > costs && (
                    <div className="h-full bg-emerald-400" style={{ width: `${((invoiced - costs) / base) * 100}%` }} />
                  )}
                </div>
                {invoiced > 0 && costs > invoiced && (
                  <p className="text-[12px] font-medium text-red-300">
                    Costs are {formatGBP(costs - invoiced)} more than has been invoiced.
                  </p>
                )}
                {invoiced === 0 && p.contractValue > 0 && p.forecastProfit !== null && (
                  <p className="text-[12px] text-white">
                    On the {formatGBP(p.contractValue)} quoted, the job would make{' '}
                    <span className={cn('font-semibold', p.forecastProfit < 0 ? 'text-red-300' : 'text-white')}>
                      {formatGBP(p.forecastProfit)}
                    </span>{' '}
                    at today’s costs.
                  </p>
                )}
              </>
            )}
          </div>

          <div className="divide-y divide-white/[0.08]">
            <Line
              label="Quoted"
              source={p.contractValue > 0 ? 'Accepted quotes, else job value or open quotes, plus approved variations' : 'No quote or job value yet'}
              value={p.contractValue > 0 ? formatGBP(p.contractValue) : '—'}
            />
            <Line
              label="Invoiced"
              source={
                p.invoiceCount > 0
                  ? `${p.invoiceCount} invoice${p.invoiceCount === 1 ? '' : 's'} sent, overdue or paid · ${formatGBP(p.paid)} paid`
                  : 'Not invoiced yet (drafts never count)'
              }
              value={p.invoiceCount > 0 ? formatGBP(invoiced) : '—'}
            />
            <Line
              label="Labour"
              dot={SEGMENTS[0].dot}
              source={
                p.approvedHours > 0
                  ? `${hrs(p.approvedHours)} approved × each person’s cost rate, overtime included${p.labourAdjusted ? ' · changed by hand' : ''}`
                  : 'No approved time yet'
              }
              value={p.approvedHours > 0 || (p.labour ?? 0) !== 0 ? formatGBP(p.labour ?? 0) : 'None yet'}
            />
            {(p.uncostedHours ?? 0) > 0 && (
              <p className="py-2 text-[12px] font-medium text-orange-300">
                {hrs(p.uncostedHours ?? 0)} counted at £0: no cost rate or pay rate for that person. Set
                one in Team, or a firm default in Job financials → Cost rates.
              </p>
            )}
            <Line
              label="Materials"
              dot={SEGMENTS[1].dot}
              source={
                (p.materialsCommitted ?? 0) > 0
                  ? `Purchase orders and recorded materials · ${formatGBP(p.materialsCommitted ?? 0)} ordered, not yet received`
                  : 'Purchase orders and materials recorded on the job'
              }
              value={(p.materials ?? 0) !== 0 ? formatGBP(p.materials ?? 0) : 'None yet'}
            />
            <Line
              label="Expenses"
              dot={SEGMENTS[2].dot}
              source="Approved and paid expense claims on this job"
              value={(p.expenses ?? 0) !== 0 ? formatGBP(p.expenses ?? 0) : 'None yet'}
            />
            {(p.otherCosts ?? 0) !== 0 && (
              <Line
                label="Other"
                dot={SEGMENTS[3].dot}
                source="Equipment, overheads, supplier bills and other recorded costs"
                value={formatGBP(p.otherCosts ?? 0)}
              />
            )}
            <Line
              label="Total costs"
              source={noCosts ? 'Nothing booked against this job yet' : 'Everything above'}
              value={noCosts ? 'No costs yet' : formatGBP(costs)}
            />
          </div>

          {onOpenFinancials && (
            <button
              type="button"
              onClick={onOpenFinancials}
              className="w-full h-11 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[13px] font-semibold text-elec-yellow touch-manipulation hover:bg-white/[0.08] transition"
            >
              Open job financials →
            </button>
          )}
        </>
      )}
    </div>
  );
}

/** Self-loading wrapper for a job id. */
export function JobProfitBlock({
  jobId,
  onSetQuotedHours,
  onOpenFinancials,
  className,
}: {
  jobId: string | undefined;
  onSetQuotedHours?: () => void;
  onOpenFinancials?: () => void;
  className?: string;
}) {
  const { data, isLoading, error } = useJobProfit(jobId);

  if (isLoading) {
    return (
      <div className={cn('space-y-3', className)}>
        <div className="h-4 w-24 rounded bg-white/[0.08] animate-pulse" />
        <div className="h-3 rounded-full bg-white/[0.08] animate-pulse" />
        <div className="h-10 rounded-lg bg-white/[0.06] animate-pulse" />
      </div>
    );
  }
  if (error) {
    return (
      <p className={cn('text-[13px] text-red-300', className)}>
        Couldn’t load this job’s profit. Nothing is shown rather than a misleading £0.
      </p>
    );
  }
  if (!data) return null;
  return (
    <div className={className}>
      <JobProfitView p={data} onSetQuotedHours={onSetQuotedHours} onOpenFinancials={onOpenFinancials} />
    </div>
  );
}
