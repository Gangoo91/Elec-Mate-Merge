import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useJobHubSummary } from '@/hooks/useJobHubSummary';
import { CreateQuoteDialog } from '@/components/employer/dialogs/CreateQuoteDialog';
import { CreateInvoiceDialog } from '@/components/employer/dialogs/CreateInvoiceDialog';
import { cn } from '@/lib/utils';
import {
  Receipt,
  FileText,
  Clock,
  Wallet,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';

/**
 * JobControlCentre — the "job at a glance" money-flow + signals panel that turns
 * the job detail into a control centre. Reads the get_job_hub_summary rollup
 * (quote → value → invoiced → paid, labour from real timesheets, budget vs
 * actual, tests, issues). Display-only for now; honest empty states, no fake
 * numbers — a job with nothing linked reads as "not connected yet", not broken.
 */

const fmt = (n: number | null | undefined) => {
  const v = Number(n ?? 0);
  return '£' + v.toLocaleString('en-GB', { maximumFractionDigits: 0 });
};

function MoneyStat({
  label,
  value,
  muted,
  tone,
}: {
  label: string;
  value: string;
  muted?: boolean;
  tone?: 'emerald' | 'yellow';
}) {
  return (
    <div className="min-w-0">
      <p className="text-[10.5px] uppercase tracking-wider text-white/40 font-medium">{label}</p>
      <p
        className={cn(
          'mt-0.5 text-[16px] font-semibold tabular-nums truncate',
          muted ? 'text-white/40' : 'text-white',
          tone === 'emerald' && 'text-emerald-400',
          tone === 'yellow' && 'text-elec-yellow'
        )}
      >
        {value}
      </p>
    </div>
  );
}

function SignalPill({
  Icon,
  label,
  tone = 'default',
}: {
  Icon: typeof ShieldCheck;
  label: string;
  tone?: 'default' | 'emerald' | 'orange' | 'red';
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11.5px] font-medium',
        tone === 'default' && 'border-white/[0.08] bg-white/[0.03] text-white/70',
        tone === 'emerald' && 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
        tone === 'orange' && 'border-orange-500/20 bg-orange-500/10 text-orange-300',
        tone === 'red' && 'border-red-500/25 bg-red-500/10 text-red-300'
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {label}
    </div>
  );
}

export function JobControlCentre({
  jobId,
  jobTitle,
  jobClient,
}: {
  jobId: string | undefined;
  jobTitle?: string;
  jobClient?: string;
}) {
  const { data, isLoading } = useJobHubSummary(jobId);
  const queryClient = useQueryClient();
  const [showQuote, setShowQuote] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);

  const refreshOnClose = (open: boolean, setter: (v: boolean) => void) => {
    setter(open);
    if (!open) queryClient.invalidateQueries({ queryKey: ['job-hub-summary', jobId] });
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_9%)] p-4 sm:p-5">
        <div className="h-3 w-24 rounded bg-white/5 animate-pulse" />
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-12 rounded-lg bg-white/5 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }
  if (!data) return null;

  const quoted = data.quote?.value ?? 0;
  const value = Number(data.job_value ?? 0);
  const invoiced = Number(data.invoiced ?? 0);
  const paid = Number(data.paid ?? 0);
  const outstanding = Math.max(0, invoiced - paid);
  const headline = Math.max(value, quoted, invoiced, 1);
  const budget = Number(data.budget_total ?? 0);
  const actual = Number(data.actual_total ?? 0);
  const overBudget = budget > 0 && actual > budget;

  return (
    <>
      <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_9%)] p-4 sm:p-5 space-y-4">
        {/* Money flow */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Wallet className="h-3.5 w-3.5 text-elec-yellow" />
            <p className="text-[10.5px] uppercase tracking-[0.16em] text-elec-yellow font-semibold">
              Money flow
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <MoneyStat label="Quoted" value={data.quote ? fmt(quoted) : '—'} muted={!data.quote} />
            <MoneyStat label="Job value" value={value ? fmt(value) : '—'} muted={!value} />
            <MoneyStat
              label="Invoiced"
              value={data.invoice_count > 0 ? fmt(invoiced) : '—'}
              muted={data.invoice_count === 0}
            />
            <MoneyStat
              label="Paid"
              value={paid ? fmt(paid) : '—'}
              tone={paid > 0 ? 'emerald' : undefined}
              muted={paid === 0}
            />
          </div>

          {/* progression bar: paid within invoiced within headline */}
          <div className="mt-3 h-2 rounded-full bg-white/[0.06] overflow-hidden flex">
            <div
              className="h-full bg-emerald-400"
              style={{ width: `${Math.min(100, (paid / headline) * 100)}%` }}
            />
            <div
              className="h-full bg-elec-yellow/70"
              style={{
                width: `${Math.min(100, (Math.max(0, invoiced - paid) / headline) * 100)}%`,
              }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[11.5px]">
            <span className="text-white/45">
              {data.invoice_count > 0
                ? `${data.invoice_count} invoice${data.invoice_count === 1 ? '' : 's'}`
                : 'Not invoiced yet'}
            </span>
            {outstanding > 0 && (
              <span className="text-orange-300 font-medium tabular-nums">
                {fmt(outstanding)} outstanding
              </span>
            )}
            {invoiced > 0 && outstanding === 0 && (
              <span className="text-emerald-400 font-medium">Fully paid</span>
            )}
          </div>
        </div>

        {/* Labour + budget */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3">
            <div className="flex items-center gap-1.5 text-white/40 text-[10.5px] uppercase tracking-wider font-medium">
              <Clock className="h-3.5 w-3.5" /> Labour
            </div>
            {data.labour_hours > 0 ? (
              <p className="mt-1 text-[15px] font-semibold text-white tabular-nums">
                {data.labour_hours.toLocaleString('en-GB', { maximumFractionDigits: 1 })} hrs
                <span className="text-white/45 font-normal"> · {fmt(data.labour_cost)}</span>
              </p>
            ) : (
              <p className="mt-1 text-[13px] text-white/40">No time logged yet</p>
            )}
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3">
            <div className="flex items-center gap-1.5 text-white/40 text-[10.5px] uppercase tracking-wider font-medium">
              <TrendingUp className="h-3.5 w-3.5" /> Budget
            </div>
            {budget > 0 ? (
              <p
                className={cn(
                  'mt-1 text-[15px] font-semibold tabular-nums',
                  overBudget ? 'text-red-300' : 'text-white'
                )}
              >
                {fmt(actual)}
                <span className="text-white/45 font-normal"> / {fmt(budget)}</span>
              </p>
            ) : (
              <p className="mt-1 text-[13px] text-white/40">No budget set</p>
            )}
          </div>
        </div>

        {/* Signals */}
        <div className="flex flex-wrap gap-2 pt-1">
          {data.tests_total > 0 ? (
            <SignalPill
              Icon={ShieldCheck}
              label={`Tests ${data.tests_passed}/${data.tests_total}${data.tests_failed > 0 ? ` · ${data.tests_failed} fail` : ''}`}
              tone={data.tests_failed > 0 ? 'red' : 'emerald'}
            />
          ) : (
            <SignalPill Icon={ShieldCheck} label="No tests" />
          )}
          {data.issues_open > 0 ? (
            <SignalPill
              Icon={AlertTriangle}
              label={`${data.issues_open} open issue${data.issues_open === 1 ? '' : 's'}${data.issues_critical > 0 ? ` · ${data.issues_critical} critical` : ''}`}
              tone={data.issues_critical > 0 ? 'red' : 'orange'}
            />
          ) : (
            <SignalPill Icon={ShieldCheck} label="No open issues" tone="emerald" />
          )}
          {data.quote && (
            <SignalPill
              Icon={FileText}
              label={`Quote ${data.quote.quote_number || ''} ${data.quote.status || ''}`.trim()}
            />
          )}
          {data.invoice_count > 0 && (
            <SignalPill Icon={Receipt} label={`${data.invoice_count} invoice`} />
          )}
        </div>

        {/* Connect actions — the job is the entry point for the money flow.
          Full-width stacked on mobile (comfortable tap targets), inline on desktop. */}
        <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2 pt-1">
          {!data.quote && (
            <button
              onClick={() => setShowQuote(true)}
              className="inline-flex items-center justify-center sm:justify-start gap-1.5 h-11 rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 text-[12.5px] font-medium text-white/85 hover:bg-white/[0.06] active:scale-[0.98] transition touch-manipulation"
            >
              <FileText className="h-4 w-4" /> Raise quote
            </button>
          )}
          <button
            onClick={() => setShowInvoice(true)}
            className="inline-flex items-center justify-center sm:justify-start gap-1.5 h-11 rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.08] px-4 text-[12.5px] font-semibold text-elec-yellow hover:bg-elec-yellow/[0.14] active:scale-[0.98] transition touch-manipulation"
          >
            <Receipt className="h-4 w-4" /> Invoice this job
          </button>
        </div>
      </div>

      <CreateQuoteDialog
        open={showQuote}
        onOpenChange={(o) => refreshOnClose(o, setShowQuote)}
        jobId={jobId}
        prefillClient={jobClient}
      />
      <CreateInvoiceDialog
        open={showInvoice}
        onOpenChange={(o) => refreshOnClose(o, setShowInvoice)}
        jobId={jobId}
        jobTitle={jobTitle}
        prefillClient={jobClient}
      />
    </>
  );
}
