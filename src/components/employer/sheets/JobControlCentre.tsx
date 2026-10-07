import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useJobHubSummary } from '@/hooks/useJobHubSummary';
import { CreateQuoteDialog } from '@/components/employer/dialogs/CreateQuoteDialog';
import { CreateInvoiceDialog } from '@/components/employer/dialogs/CreateInvoiceDialog';
import { cn } from '@/lib/utils';
import { JobProfitBlock } from '@/components/employer/jobs/JobProfitBlock';
import {
  Receipt,
  FileText,
  Wallet,
  ShieldCheck,
  AlertTriangle,
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
      <p className="text-[10.5px] uppercase tracking-wider text-white font-medium">{label}</p>
      <p
        className={cn(
          'mt-0.5 text-[16px] font-semibold tabular-nums truncate',
          muted ? 'text-white' : 'text-white',
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
        tone === 'default' && 'border-white/[0.08] bg-white/[0.03] text-white',
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

function DocRow({
  Icon,
  number,
  status,
  amount,
  paid,
  kind,
}: {
  Icon: typeof FileText;
  number: string | null;
  status: string | null;
  amount: number;
  paid?: boolean;
  kind: string;
}) {
  const label = (paid ? 'Paid' : status || 'Draft').toString();
  const low = label.toLowerCase();
  const known = ['paid', 'overdue', 'unpaid', 'sent', 'draft'];
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
      <Icon className="h-3.5 w-3.5 text-white shrink-0" />
      <span className="text-[12.5px] text-white truncate min-w-0 flex-1">{number || kind}</span>
      <span
        className={cn(
          'rounded-md px-1.5 py-0.5 text-[10px] font-medium capitalize shrink-0',
          low.includes('paid') && 'bg-emerald-500/12 text-emerald-300',
          (low.includes('overdue') || low.includes('unpaid')) && 'bg-red-500/12 text-red-300',
          low.includes('sent') && 'bg-blue-500/12 text-blue-300',
          low.includes('draft') && 'bg-white/[0.06] text-white',
          !known.some((s) => low.includes(s)) && 'bg-white/[0.06] text-white'
        )}
      >
        {label}
      </span>
      <span className="text-[12.5px] font-semibold text-white tabular-nums shrink-0">
        {fmt(amount)}
      </span>
    </div>
  );
}

export function JobControlCentre({
  jobId,
  jobTitle,
  jobClient,
  onOpenFinancials,
  onSetQuotedHours,
}: {
  jobId: string | undefined;
  jobTitle?: string;
  /** Opens this job in Job financials (the full per-job P&L). */
  onOpenFinancials?: () => void;
  /** Opens the job's edit form at quoted hours (ELE-1824). */
  onSetQuotedHours?: () => void;
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
  // Job value is money: owner and admins only (ELE-1831). The server marks
  // an office manager's summary money_hidden; quotes/invoices stay visible.
  const moneyHidden = !!data.finance?.money_hidden;
  const value = moneyHidden ? 0 : Number(data.job_value ?? 0);
  const invoiced = Number(data.invoiced ?? 0);
  const paid = Number(data.paid ?? 0);
  const outstanding = Math.max(0, invoiced - paid);
  const headline = Math.max(value, quoted, invoiced, 1);
  return (
    <>
      <div className="-mx-5 rounded-none border-y sm:mx-0 sm:rounded-2xl sm:border border-white/[0.1] bg-[hsl(0_0%_9%)] p-4 sm:p-5 space-y-4">
        {/* Money flow */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Wallet className="h-3.5 w-3.5 text-elec-yellow" />
            <p className="text-[10.5px] uppercase tracking-[0.16em] text-elec-yellow font-semibold">
              Money flow
            </p>
          </div>
          <div
            className={cn(
              'grid grid-cols-2 gap-3',
              moneyHidden ? 'sm:grid-cols-3' : 'sm:grid-cols-4'
            )}
          >
            <MoneyStat label="Quoted" value={data.quote ? fmt(quoted) : '—'} muted={!data.quote} />
            {!moneyHidden && (
              <MoneyStat label="Job value" value={value ? fmt(value) : '—'} muted={!value} />
            )}
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
              className="h-full bg-elec-yellow"
              style={{
                width: `${Math.min(100, (Math.max(0, invoiced - paid) / headline) * 100)}%`,
              }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[11.5px]">
            <span className="text-white">
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

        {/* Linked documents — exactly which quotes/invoices belong to this job */}
        {((data.quotes?.length ?? 0) > 0 || (data.invoices?.length ?? 0) > 0) && (
          <div>
            <p className="text-[10.5px] uppercase tracking-[0.16em] text-white font-semibold mb-2">
              Linked documents
            </p>
            <div className="space-y-1.5">
              {(data.quotes ?? []).map((q) => (
                <DocRow
                  key={q.id}
                  Icon={FileText}
                  number={q.quote_number}
                  status={q.status}
                  amount={q.value}
                  kind="Quote"
                />
              ))}
              {(data.invoices ?? []).map((inv) => (
                <DocRow
                  key={inv.id}
                  Icon={Receipt}
                  number={inv.invoice_number}
                  status={inv.status}
                  amount={inv.amount}
                  paid={inv.paid}
                  kind="Invoice"
                />
              ))}
            </div>
          </div>
        )}

        {/* ELE-1824 — profit per job: quoted · invoiced · labour · materials ·
            expenses, running or final, quoted vs actual hours. Office managers
            get hours only (SQL returns nulls for every cost/profit field). */}
        <div className="border-t border-white/[0.08] pt-4">
          <JobProfitBlock
            jobId={jobId}
            onSetQuotedHours={onSetQuotedHours}
            onOpenFinancials={onOpenFinancials}
          />
        </div>

        {/* Signals */}
        <div className="flex flex-wrap gap-2 pt-1">
          {data.tests_total > 0 ? (
            <SignalPill
              Icon={ShieldCheck}
              label={`Certs ${data.tests_passed}/${data.tests_total} QS approved${data.tests_failed > 0 ? ` · ${data.tests_failed} returned` : ''}`}
              tone={data.tests_failed > 0 ? 'red' : 'emerald'}
            />
          ) : (
            <SignalPill Icon={ShieldCheck} label="No certificates" />
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
              className="inline-flex items-center justify-center sm:justify-start gap-1.5 h-11 rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 text-[12.5px] font-medium text-white hover:bg-white/[0.06] active:scale-[0.98] transition touch-manipulation"
            >
              <FileText className="h-4 w-4" /> Raise quote
            </button>
          )}
          <button
            onClick={() => setShowInvoice(true)}
            className="inline-flex items-center justify-center sm:justify-start gap-1.5 h-11 rounded-xl border border-elec-yellow/25 bg-white/[0.06] px-4 text-[12.5px] font-semibold text-elec-yellow hover:bg-white/[0.06] active:scale-[0.98] transition touch-manipulation"
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
