/**
 * Finance → Accounting (ELE-1825).
 *
 * Lisa, last working day of the month: invoices already in Xero, then one tap
 * sends approved hours, expenses and mileage for the pay period to payroll,
 * and every worker sees "sent to payroll".
 *
 *  - Connection: the firm's connection IS the owner's Electrical Hub
 *    connection (one set of tokens, one Xero organisation). Owner and admin
 *    managers can connect or reconnect it; office managers see the state only.
 *  - Invoices: a LIVE sync. Each invoice shows whether it is in the package,
 *    and a failure is written on the invoice in plain words, with Sync now.
 *  - Payroll: a FILE. The connection has no payroll permission, so nothing is
 *    posted to a payroll API; the file is laid out for the firm's package. The
 *    run is stamped on every row it takes, so nothing is ever sent twice.
 *
 * Money: owner/admin only (can_see_firm_money, enforced in SQL). Office
 * managers send hours-only files and never see a rate, a £ or a claim.
 */
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  differenceInCalendarDays,
  endOfMonth,
  format,
  formatDistanceToNow,
  parseISO,
  startOfMonth,
  subMonths,
} from 'date-fns';
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  FileSpreadsheet,
  Loader2,
  Plug,
  RefreshCw,
  RotateCcw,
  Send,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  PageFrame,
  PageHero,
  StatStrip,
  IconButton,
  PrimaryButton,
  SecondaryButton,
  LoadingBlocks,
  Eyebrow,
} from '@/components/employer/editorial';
import {
  PageHelpButton,
  HowItWorks,
  type PageHelpContent,
  type HelpBlocker,
} from '@/components/hub/PageHelp';
import { FormSheet } from '@/components/forms/FormSheet';
import { chipBase, chipOn, chipOff } from '@/components/forms/fieldStyles';
import { Switch } from '@/components/ui/switch';
import { PayPeriodSheet } from '@/components/employer/timesheets/PayPeriodSheet';
import { useOfficeFirmId, useFirmPaySettings } from '@/hooks/useFirmPaySettings';
import {
  PROVIDER_NAME,
  connectFirmAccounting,
  fetchPayrollExport,
  payrollErrorMessage,
  plainSyncError,
  syncFirmInvoice,
  useFirmAccounting,
  useFirmInvoiceSync,
  usePayrollRun,
  useSendPayrollRun,
  useSetFirmAutoSync,
  useUndoPayrollExport,
  type AccountingProviderId,
  type FirmAccounting,
  type FirmConnection,
  type InvoiceSyncRow,
} from '@/hooks/useFirmAccounting';
import {
  PAYROLL_FILE_LABEL,
  buildPayrollLines,
  payrollCsv,
  payrollFilename,
  runTotals,
  sendableLines,
  type PayrollFileKind,
  type PayrollLine,
  type PayrollRunExport,
} from '@/services/payrollRun';
import { saveCSVFile } from '@/services/accountingService';
import {
  formatPeriodRange,
  payPeriodContaining,
  previousPayPeriod,
  isPaySettingsComplete,
} from '@/utils/payPeriods';
import { shortPayday } from '@/utils/expensePayroll';

const HELP: PageHelpContent = {
  id: 'employer-accounting',
  title: 'Accounting',
  what: (
    <>
      Your firm&apos;s Xero, QuickBooks or Sage connection in one place. Invoices go across to your
      books by themselves, and at the end of each pay period one tap sends approved hours, expenses and
      mileage to payroll.
    </>
  ),
  steps: [
    {
      title: 'Connect once',
      body: 'The owner or an admin connects the firm’s accounting package. It is the same connection the Electrical Hub uses, so there is only ever one.',
    },
    {
      title: 'Invoices sync by themselves',
      body: 'When an invoice is emailed it goes to your package. If one fails, it says why on the invoice, with Sync now to try again.',
    },
    {
      title: 'Send to payroll',
      body: 'Pick the pay period and tap Send to payroll. You get the file for your package, and everyone’s hours are marked as sent so nothing goes twice.',
    },
    {
      title: 'Workers can see it',
      body: 'Each worker’s Timesheet and My pay pages say when their hours went to payroll, so nobody has to ask.',
    },
  ],
  notes: [
    {
      title: 'Live sync or a file?',
      body: (
        <>
          Invoices are a <strong>live sync</strong>: they are posted straight into your package. Payroll is
          a <strong>file</strong>: the connection cannot post into payroll, so you get a spreadsheet laid
          out for Xero, QuickBooks or Sage to import or key in.
        </>
      ),
    },
    {
      title: 'Nothing goes twice',
      body: 'Every approved entry and claim that goes to payroll is marked with the run that took it. Approve more later and only the new ones go next time. Sent by mistake? Put the run back within 48 hours.',
    },
    {
      title: 'Expenses are paid on payday',
      body: 'Expenses in a run show as In payroll until the run’s payday. Early that morning they are marked Paid with payday as the date, and each worker gets one message with their total. No payday set? The period end date is used, and the review says so. A run with expenses cannot be put back once payday has come.',
    },
    {
      title: 'Who sees what',
      body: 'Owners and admins see pay, expenses and invoices. Office managers see the connection and can send an hours-only file, but never see a rate or a £ figure.',
    },
  ],
  tasks: [
    {
      title: 'Connect Xero, QuickBooks or Sage',
      steps: [
        'Under Connection, tap Xero, QuickBooks or Sage.',
        'Sign in on the package’s own page and allow access. Elec-Mate never sees your password.',
        'You come back here with a note saying it is connected.',
        'Leave Send invoices to … when they are emailed switched on so each invoice goes across by itself.',
      ],
      who: 'Owner and admins. Others see Ask the owner or an admin to connect it.',
      tour: [
        {
          target: 'accounting.connect',
          caption: 'Tap your package and sign in on its page. Already connected? Reconnect it here if it stops working.',
        },
      ],
    },
    {
      title: 'Get an invoice into your books',
      steps: [
        'Invoices go across when they are emailed, if the switch is on.',
        'Under Invoices, any that failed or are waiting show Sync now or Try again, with the reason.',
        'Tap Sync now on one, or Sync … now at the top for all of them.',
      ],
      who: 'Owner and admins. Office managers see the counts only.',
      tour: [
        { target: 'accounting.sync-all', caption: 'Tap Sync now to send every waiting invoice.', optional: true },
        { target: 'accounting.sync-one', caption: 'Or Sync now on a single invoice.', optional: true },
      ],
    },
    {
      title: 'Run payroll for the pay period',
      steps: [
        'Approve the period’s timesheets first. Only approved hours go.',
        'Under Send to payroll, pick Last period or This period (calendar months until a pay period is set).',
        'Pick the file: Xero, QuickBooks, Sage or CSV. Switch expenses and mileage on or off.',
        'Tap Send to payroll, check the list, then tap Send and save the file.',
      ],
      after:
        'Everything in the file is marked as sent, and each person sees it on their Timesheet and My pay. Expenses show In payroll and are marked Paid on payday by themselves. Sent by mistake? Tap Undo within 48 hours, and before payday if it has expenses. Workers with no pay rate block a file with pay until a rate is set.',
      who: 'Owner and admins get pay, expenses and mileage. Office managers get an hours-only file.',
      tour: [
        { target: 'accounting.periods', caption: 'Pick the pay period to send.' },
        { target: 'accounting.send', caption: 'Tap Send to payroll, check it, then Send and save the file.' },
      ],
    },
    {
      title: 'Set the pay period',
      steps: [
        'Under Send to payroll, tap Set pay period (or Change pay period).',
        'Choose how often you pay, when the period runs and the payday, then tap Save.',
      ],
      after: 'Workers then see their payday on My pay, and payroll offers your real periods instead of calendar months.',
      who: 'Owner and admins.',
      tour: [{ target: 'accounting.pay-period', caption: 'Tap Set pay period.' }],
    },
  ],
};

/* ── small pieces ─────────────────────────────────────────────────────────── */

type TagTone = 'green' | 'amber' | 'red' | 'neutral' | 'blue';
const tagDot: Record<TagTone, string> = {
  green: 'bg-emerald-400',
  amber: 'bg-amber-400',
  red: 'bg-red-500',
  neutral: 'bg-white/60',
  blue: 'bg-sky-400',
};
function Tag({ tone, children }: { tone: TagTone; children: ReactNode }) {
  return (
    <span className="inline-flex h-7 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/[0.14] bg-white/[0.04] px-2.5 text-[12px] font-semibold text-white">
      <span aria-hidden className={cn('h-2 w-2 rounded-full', tagDot[tone])} />
      {children}
    </span>
  );
}

/** Edge to edge on a phone, a rounded card from sm up. */
function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={cn(
        '-mx-4 border-y border-white/[0.08] bg-white/[0.03] sm:mx-0 sm:rounded-2xl sm:border-x',
        className
      )}
    >
      {children}
    </section>
  );
}

function PanelHead({
  eyebrow,
  title,
  right,
}: {
  eyebrow: string;
  title: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.08] px-4 py-4 sm:px-6">
      <div className="min-w-0">
        <Eyebrow className="text-elec-yellow">{eyebrow}</Eyebrow>
        <h2 className="mt-1 text-[18px] font-semibold leading-tight text-white sm:text-[20px]">{title}</h2>
      </div>
      {right}
    </div>
  );
}

const gbp = (n: number | null | undefined) =>
  n == null
    ? 'None'
    : `£${n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const hrs = (n: number) => `${n.toLocaleString('en-GB', { maximumFractionDigits: 2 })} h`;
const ago = (iso: string | null | undefined) =>
  iso ? `${formatDistanceToNow(parseISO(iso))} ago` : 'Never';
const iso = (d: Date) => format(d, 'yyyy-MM-dd');

const STATE_COPY: Record<
  FirmConnection['state'],
  { tone: TagTone; label: string; body: (p: string) => string }
> = {
  connected: { tone: 'green', label: 'Live sync on', body: () => '' },
  stale: {
    tone: 'amber',
    label: 'May need reconnecting',
    body: (p) =>
      `${p} has not been used for a while, and it signs you out after a long gap. If the next invoice fails, reconnect.`,
  },
  expired: {
    tone: 'red',
    label: 'Signed out',
    body: (p) => `${p} has signed this connection out. Reconnect it so invoices keep going across.`,
  },
  missing: {
    tone: 'red',
    label: 'Needs reconnecting',
    body: (p) => `The sign-in for ${p} is missing. Reconnect it so invoices keep going across.`,
  },
  error: {
    tone: 'red',
    label: 'Not working',
    body: (p) => `The connection to ${p} reported a problem. Reconnect it.`,
  },
};

/* ── page ─────────────────────────────────────────────────────────────────── */

export function AccountingSection() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { data: firmId } = useOfficeFirmId();
  const acct = useFirmAccounting(firmId);
  const data = acct.data;
  const money = !!data?.money_visible;
  const invoices = useFirmInvoiceSync(firmId, money);

  // Back from the provider's sign-in page.
  useEffect(() => {
    const ok = params.get('accounting');
    const err = params.get('accounting_error');
    if (!ok && !err) return;
    if (ok && params.get('success') === 'true') {
      const name = PROVIDER_NAME[ok as AccountingProviderId] ?? 'Your package';
      toast.success(`${name} connected`, { description: 'New invoices will go across when they are sent.' });
    } else if (err) {
      toast.error('The connection did not finish', {
        description: err.toLowerCase().includes('access_denied')
          ? 'It was cancelled on the sign-in page. Try again when ready.'
          : err.slice(0, 160),
      });
    }
    const next = new URLSearchParams(params);
    ['accounting', 'accounting_error', 'success'].forEach((k) => next.delete(k));
    setParams(next, { replace: true });
    qc.invalidateQueries({ queryKey: ['firm-accounting'] });
  }, [params, setParams, qc]);

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ['firm-accounting'] });
    qc.invalidateQueries({ queryKey: ['firm-invoice-sync'] });
    qc.invalidateQueries({ queryKey: ['payroll-run'] });
  };

  const primary = data?.connections.find((c) => c.state === 'connected') ?? data?.connections[0] ?? null;

  // Live "Before you start" lines for the help (ELE-1980). Pay settings are
  // the same cached query the payroll panel reads.
  const { data: paySettings } = useFirmPaySettings(firmId);
  const tapHelp = (target: string) =>
    document.querySelector<HTMLElement>(`[data-help="${target}"]`)?.click();
  const scrollHelp = (target: string) =>
    document
      .querySelector<HTMLElement>(`[data-help="${target}"]`)
      ?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  const helpBlockers: HelpBlocker[] = [];
  if (data?.can_manage && !primary) {
    helpBlockers.push({
      text: 'No accounting package is connected, so invoices are not going into your books.',
      fixLabel: 'Connect it',
      onFix: () => scrollHelp('accounting.connect'),
    });
  } else if (data?.can_manage && primary && primary.state !== 'connected' && primary.state !== 'stale') {
    helpBlockers.push({
      text: `${PROVIDER_NAME[primary.provider]} needs reconnecting before invoices can go across.`,
      fixLabel: 'Reconnect',
      onFix: () => scrollHelp('accounting.reconnect'),
    });
  }
  if (data?.can_manage && paySettings !== undefined && !isPaySettingsComplete(paySettings)) {
    helpBlockers.push({
      text: 'No pay period set, so payroll uses calendar months and workers see no payday.',
      fixLabel: 'Set the pay period',
      onFix: () => tapHelp('accounting.pay-period'),
    });
  }

  return (
    <PageFrame>
      <PageHero
        eyebrow="Money"
        title="Accounting"
        description="Your accounting package, invoices in your books, and month-end payroll in one tap."
        tone="emerald"
        actions={
          <>
            <PageHelpButton help={HELP} blockers={helpBlockers} askContext={{ page: 'accounting' }} />
            <IconButton onClick={refresh} aria-label="Refresh">
              <RefreshCw className={cn('h-4 w-4', acct.isFetching && 'animate-spin')} />
            </IconButton>
          </>
        }
      />

      <HowItWorks help={HELP} blockers={helpBlockers} askContext={{ page: 'accounting' }} />

      {acct.isLoading ? (
        <LoadingBlocks />
      ) : acct.error || !data || !firmId ? (
        <Panel className="px-4 py-6 sm:px-6">
          <p className="text-[15px] font-semibold text-white">Accounting did not load</p>
          <p className="mt-1 text-[13.5px] text-white">
            Check your connection and tap refresh. If it keeps happening, ask the owner to check your access.
          </p>
        </Panel>
      ) : (
        <>
          <StatStrip
            columns={4}
            stats={[
              {
                label: 'Connection',
                value: !primary ? 'None' : primary.state === 'connected' ? 'Live' : 'Fix',
                sub: primary ? `${PROVIDER_NAME[primary.provider]} · ${STATE_COPY[primary.state].label}` : 'Not connected',
                tone: primary?.state === 'connected' ? 'emerald' : primary ? 'red' : 'blue',
              },
              {
                label: 'Invoices in your books',
                value: data.invoices.synced.toLocaleString(),
                tone: 'emerald',
              },
              {
                label: 'Need attention',
                value: (data.invoices.failed + data.invoices.waiting).toLocaleString(),
                sub: data.invoices.failed > 0 ? `${data.invoices.failed} failed` : undefined,
                tone: data.invoices.failed > 0 ? 'red' : data.invoices.waiting > 0 ? 'amber' : 'emerald',
              },
              {
                label: 'Last payroll',
                value: data.last_payroll
                  ? format(parseISO(data.last_payroll.exported_at), 'd MMM')
                  : 'Not yet',
                sub: data.last_payroll
                  ? formatPeriodRange(
                      parseISO(data.last_payroll.period_start),
                      parseISO(data.last_payroll.period_end)
                    )
                  : undefined,
                tone: 'blue',
              },
            ]}
          />

          <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-start lg:gap-8">
            <ConnectionPanel firmId={firmId} data={data} onOpenSettings={() => navigate('/settings?tab=business')} />
            {money ? (
              <InvoicesPanel
                rows={invoices.data ?? []}
                loading={invoices.isLoading}
                provider={primary?.state === 'connected' ? primary.provider : null}
                connectionBroken={!!primary && primary.state !== 'connected' && primary.state !== 'stale'}
              />
            ) : (
              <Panel>
                <PanelHead eyebrow="Invoices" title="Invoices in your books" />
                <div className="space-y-2 px-4 py-5 sm:px-6">
                  <p className="text-[14px] leading-relaxed text-white">
                    {data.invoices.synced} invoice{data.invoices.synced === 1 ? ' is' : 's are'} in{' '}
                    {primary ? PROVIDER_NAME[primary.provider] : 'the accounting package'}.
                    {data.invoices.failed + data.invoices.waiting > 0 &&
                      ` ${data.invoices.failed + data.invoices.waiting} need an owner or admin to look at them.`}
                  </p>
                  <p className="text-[13px] text-white">Invoice amounts are for the owner and admins only.</p>
                </div>
              </Panel>
            )}
          </div>

          <PayrollPanel firmId={firmId} data={data} />
        </>
      )}
    </PageFrame>
  );
}

/* ── connection ───────────────────────────────────────────────────────────── */

function ConnectionPanel({
  firmId,
  data,
  onOpenSettings,
}: {
  firmId: string;
  data: FirmAccounting;
  onOpenSettings: () => void;
}) {
  const [busy, setBusy] = useState<AccountingProviderId | null>(null);
  const autoSync = useSetFirmAutoSync();
  const conn = data.connections.find((c) => c.state === 'connected') ?? data.connections[0] ?? null;

  const connect = async (p: AccountingProviderId) => {
    setBusy(p);
    try {
      await connectFirmAccounting(firmId, p);
    } catch (e) {
      toast.error('Could not open the sign-in page', {
        description: e instanceof Error ? e.message : 'Try again in a minute.',
      });
    } finally {
      setBusy(null);
    }
  };

  if (!conn) {
    return (
      <Panel>
        <PanelHead eyebrow="Connection" title="Not connected" right={<Tag tone="neutral">No package</Tag>} />
        <div className="space-y-4 px-4 py-5 sm:px-6">
          <p className="text-[14px] leading-relaxed text-white">
            Connect the firm&apos;s accounting package and invoices go into your books when they are sent,
            with no re-keying.
          </p>
          {data.can_manage ? (
            <div
              className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3"
              data-help="accounting.connect"
            >
              {(['xero', 'quickbooks', 'sage'] as AccountingProviderId[]).map((p) => (
                <SecondaryButton
                  key={p}
                  onClick={() => connect(p)}
                  disabled={!!busy}
                  className="h-12 w-full"
                >
                  {busy === p ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plug className="mr-2 h-4 w-4" />}
                  {PROVIDER_NAME[p]}
                </SecondaryButton>
              ))}
            </div>
          ) : (
            <p className="text-[13.5px] text-white">Ask the owner or an admin to connect it.</p>
          )}
          <p className="text-[12.5px] leading-relaxed text-white">
            You sign in on the package&apos;s own page. Elec-Mate never sees your password.
          </p>
        </div>
      </Panel>
    );
  }

  const name = PROVIDER_NAME[conn.provider];
  const copy = STATE_COPY[conn.state];
  const healthy = conn.state === 'connected';

  return (
    <Panel>
      <PanelHead
        eyebrow="Connection"
        title={`Connected to ${name}`}
        right={<Tag tone={copy.tone}>{copy.label}</Tag>}
      />
      <div className="space-y-4 px-4 py-5 sm:px-6">
        {conn.tenant_name && (
          <p className="text-[14px] text-white">
            Organisation <span className="font-semibold">{conn.tenant_name}</span>
          </p>
        )}
        {!healthy && (
          <div className="flex gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-3.5">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" aria-hidden />
            <p className="text-[13.5px] leading-relaxed text-white">{copy.body(name)}</p>
          </div>
        )}
        {data.last_error && healthy && (
          <div className="flex gap-3 rounded-xl border border-amber-500/40 bg-white/[0.04] p-3.5">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" aria-hidden />
            <p className="text-[13.5px] leading-relaxed text-white">
              Last problem
              {data.last_error.invoice_number ? ` (invoice ${data.last_error.invoice_number})` : ''}:{' '}
              {plainSyncError(data.last_error.error, conn.provider)}
            </p>
          </div>
        )}

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-white">
          <div>
            <dt className="text-[11.5px] uppercase tracking-[0.14em] text-white">Invoices</dt>
            <dd className="mt-0.5 text-[14px] font-semibold">Live sync</dd>
          </div>
          <div>
            <dt className="text-[11.5px] uppercase tracking-[0.14em] text-white">Payroll</dt>
            <dd className="mt-0.5 text-[14px] font-semibold">File for {name}</dd>
          </div>
          <div>
            <dt className="text-[11.5px] uppercase tracking-[0.14em] text-white">Last invoice sent</dt>
            <dd className="mt-0.5 text-[14px] font-semibold">{ago(conn.last_sync_at)}</dd>
          </div>
          <div>
            <dt className="text-[11.5px] uppercase tracking-[0.14em] text-white">Connected</dt>
            <dd className="mt-0.5 text-[14px] font-semibold">
              {conn.connected_at ? format(parseISO(conn.connected_at), 'd MMM yyyy') : 'Unknown'}
            </dd>
          </div>
        </dl>

        {data.can_manage && (
          <label className="flex min-h-11 items-center justify-between gap-4 rounded-xl border border-white/[0.1] bg-white/[0.03] px-3.5 py-2.5">
            <span className="text-[13.5px] leading-snug text-white">
              Send invoices to {name} when they are emailed
            </span>
            <Switch
              checked={conn.auto_sync}
              disabled={autoSync.isPending}
              onCheckedChange={(v) =>
                autoSync.mutate(
                  { firmId, provider: conn.provider, enabled: v },
                  {
                    onSuccess: () =>
                      toast.success(v ? `Invoices will go to ${name} when sent` : 'Invoices will only go across when you tap Sync now'),
                    onError: () => toast.error('Could not change that. Try again.'),
                  }
                )
              }
              aria-label={`Send invoices to ${name} automatically`}
            />
          </label>
        )}

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap" data-help="accounting.connect">
          {data.can_manage && (
            <SecondaryButton
              data-help="accounting.reconnect"
              onClick={() => connect(conn.provider)}
              disabled={!!busy}
              className="h-11"
            >
              {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RotateCcw className="mr-2 h-4 w-4" />}
              Reconnect {name}
            </SecondaryButton>
          )}
          {data.is_owner && (
            <SecondaryButton onClick={onOpenSettings} className="h-11">
              Account codes and disconnect
            </SecondaryButton>
          )}
        </div>
        <p className="text-[12.5px] leading-relaxed text-white">
          {data.is_owner
            ? 'This is the same connection as your Electrical Hub, so both send to the same books.'
            : `This is the owner's connection, shared with their Electrical Hub.${data.can_manage ? ' Only the owner can disconnect it.' : ' The owner or an admin can reconnect it.'}`}
        </p>
      </div>
    </Panel>
  );
}

/* ── invoices ─────────────────────────────────────────────────────────────── */

const INVOICE_TAG: Record<InvoiceSyncRow['sync_state'], { tone: TagTone; label: (p: string) => string }> = {
  synced: { tone: 'green', label: (p) => `In ${p}` },
  failed: { tone: 'red', label: () => 'Failed' },
  waiting: { tone: 'amber', label: () => 'Not sent yet' },
  before: { tone: 'neutral', label: () => 'From before connecting' },
};

function InvoicesPanel({
  rows,
  loading,
  provider,
  connectionBroken,
}: {
  rows: InvoiceSyncRow[];
  loading: boolean;
  provider: AccountingProviderId | null;
  connectionBroken: boolean;
}) {
  const qc = useQueryClient();
  const [filter, setFilter] = useState<'attention' | 'all'>('attention');
  const [syncing, setSyncing] = useState<Set<string>>(new Set());
  const [bulk, setBulk] = useState<{ done: number; total: number } | null>(null);
  const providerName = provider ? PROVIDER_NAME[provider] : 'your package';

  const attention = rows.filter((r) => r.sync_state === 'failed' || r.sync_state === 'waiting');
  const shown = filter === 'attention' ? attention : rows;

  const refreshAll = () => {
    qc.invalidateQueries({ queryKey: ['firm-invoice-sync'] });
    qc.invalidateQueries({ queryKey: ['firm-accounting'] });
  };

  const syncOne = async (r: InvoiceSyncRow) => {
    if (!provider) return;
    setSyncing((s) => new Set(s).add(r.id));
    const res = await syncFirmInvoice(r.id, provider);
    setSyncing((s) => {
      const n = new Set(s);
      n.delete(r.id);
      return n;
    });
    if (res.ok) toast.success(`${r.invoice_number ?? 'Invoice'} is in ${providerName}`);
    else toast.error(`${r.invoice_number ?? 'Invoice'} did not go across`, { description: res.message });
    refreshAll();
  };

  const syncAll = async () => {
    if (!provider || attention.length === 0) return;
    let failed = 0;
    setBulk({ done: 0, total: attention.length });
    for (const [i, r] of attention.entries()) {
      // One at a time: the providers rate-limit, and a duplicate contact race
      // is worse than a slower button.
      const res = await syncFirmInvoice(r.id, provider);
      if (!res.ok) failed += 1;
      setBulk({ done: i + 1, total: attention.length });
    }
    setBulk(null);
    refreshAll();
    if (failed === 0) toast.success(`${attention.length} invoice${attention.length === 1 ? '' : 's'} sent to ${providerName}`);
    else toast.error(`${failed} of ${attention.length} did not go across`, { description: 'Each one now says why.' });
  };

  return (
    <Panel>
      <PanelHead
        eyebrow="Invoices · live sync"
        title={provider ? `Invoices in ${providerName}` : 'Invoices'}
        right={
          provider && attention.length > 0 && !connectionBroken ? (
            <PrimaryButton data-help="accounting.sync-all" onClick={syncAll} disabled={!!bulk} className="h-11">
              {bulk ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {bulk.done} of {bulk.total}
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sync {attention.length} now
                </>
              )}
            </PrimaryButton>
          ) : undefined
        }
      />
      <div className="flex gap-2 px-4 pt-4 sm:px-6" role="tablist" aria-label="Which invoices">
        {(
          [
            ['attention', `Need attention (${attention.length})`],
            ['all', `All sent (${rows.length})`],
          ] as const
        ).map(([v, label]) => (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={filter === v}
            onClick={() => setFilter(v)}
            className={cn(chipBase, 'rounded-full px-4 text-[13px]', filter === v ? chipOn : chipOff)}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="px-4 py-8 sm:px-6">
          <Loader2 className="h-5 w-5 animate-spin text-white" />
        </div>
      ) : shown.length === 0 ? (
        <div className="flex items-start gap-3 px-4 py-6 sm:px-6">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
          <p className="text-[14px] leading-relaxed text-white">
            {filter === 'attention'
              ? provider
                ? `Every sent invoice is in ${providerName}.`
                : 'Connect a package to send invoices to your books.'
              : 'No invoices have been sent yet.'}
          </p>
        </div>
      ) : (
        <ul className="mt-3 divide-y divide-white/[0.07] border-t border-white/[0.07]">
          {shown.slice(0, 60).map((r) => {
            const tag = INVOICE_TAG[r.sync_state];
            const busy = syncing.has(r.id);
            const canSync = !!provider && !connectionBroken && r.sync_state !== 'synced';
            return (
              <li key={r.id} className="px-4 py-3.5 sm:px-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <div className="min-w-0 flex-1 basis-[60%]">
                    <p className="truncate text-[14.5px] font-semibold text-white">
                      {r.invoice_number ?? 'Invoice'} · {r.client}
                    </p>
                    <p className="mt-0.5 text-[12.5px] text-white">
                      {[
                        r.issued_on ? format(parseISO(r.issued_on), 'd MMM yyyy') : null,
                        gbp(r.amount),
                        r.sync_state === 'synced' && r.synced_at ? `sent across ${ago(r.synced_at)}` : null,
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  </div>
                  <Tag tone={tag.tone}>{tag.label(r.provider ? PROVIDER_NAME[r.provider] : providerName)}</Tag>
                  {canSync && (
                    <SecondaryButton
                      data-help="accounting.sync-one"
                      onClick={() => syncOne(r)}
                      disabled={busy || !!bulk}
                      className="h-11 px-4"
                    >
                      {busy ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Send className="mr-1.5 h-4 w-4" />}
                      {r.sync_state === 'failed' ? 'Try again' : 'Sync now'}
                    </SecondaryButton>
                  )}
                  {r.sync_state === 'synced' && r.external_url && (
                    <a
                      href={r.external_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-11 items-center gap-1.5 px-2 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                    >
                      Open <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  )}
                </div>
                {r.sync_state === 'failed' && (
                  <p className="mt-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-[13px] leading-snug text-white">
                    {plainSyncError(r.sync_error, r.provider ?? provider)}
                    {r.failed_at ? ` (${ago(r.failed_at)})` : ''}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
      {shown.length > 60 && (
        <p className="px-4 pb-4 pt-2 text-[12.5px] text-white sm:px-6">Showing the latest 60.</p>
      )}
    </Panel>
  );
}

/* ── payroll ──────────────────────────────────────────────────────────────── */

type PeriodChoice = 'this' | 'last';

function PayrollPanel({ firmId, data }: { firmId: string; data: FirmAccounting }) {
  const qc = useQueryClient();
  const money = data.money_visible;
  const { data: settings } = useFirmPaySettings(firmId);
  const [periodOpen, setPeriodOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  const today = useMemo(() => new Date(), []);
  const periods = useMemo(() => {
    if (isPaySettingsComplete(settings)) {
      const cur = payPeriodContaining(settings, today)!;
      const prev = previousPayPeriod(settings, cur)!;
      return { this: { start: cur.start, end: cur.end }, last: { start: prev.start, end: prev.end }, firm: true };
    }
    const lastMonth = subMonths(today, 1);
    return {
      this: { start: startOfMonth(today), end: endOfMonth(today) },
      last: { start: startOfMonth(lastMonth), end: endOfMonth(lastMonth) },
      firm: false,
    };
  }, [settings, today]);
  // Early in a period, the one to send is the one that just ended.
  const [choice, setChoice] = useState<PeriodChoice | null>(null);
  const effective: PeriodChoice =
    choice ?? (differenceInCalendarDays(today, periods.this.start) < 7 ? 'last' : 'this');
  const period = periods[effective];
  const start = iso(period.start);
  const end = iso(period.end);

  const run = usePayrollRun(firmId, start, end);
  const connected = data.connections.find((c) => c.state === 'connected')?.provider;
  const defaultKind: PayrollFileKind =
    connected === 'xero' || connected === 'quickbooks' || connected === 'sage' ? connected : 'csv';
  const [kindChoice, setKindChoice] = useState<PayrollFileKind | null>(null);
  const kind: PayrollFileKind = money ? (kindChoice ?? defaultKind) : 'hours';
  const [includeExpenses, setIncludeExpenses] = useState(true);
  const withExpenses = money && includeExpenses;

  const lines = useMemo(() => (run.data ? buildPayrollLines(run.data) : []), [run.data]);
  const totals = useMemo(() => runTotals(lines, withExpenses, money), [lines, withExpenses, money]);
  const live = useMemo(() => sendableLines(lines, withExpenses), [lines, withExpenses]);
  const nothingNew = totals.timesheets + totals.expenses === 0;
  const blockedByRate = kind !== 'hours' && totals.noRate.length > 0;

  const send = useSendPayrollRun();
  const undo = useUndoPayrollExport();
  const [sentId, setSentId] = useState<string | null>(null);

  const saveExportFile = async (x: { id: string; kind: PayrollFileKind }) => {
    const past = await fetchPayrollExport(firmId, x.id);
    const k: PayrollFileKind = past.money_visible ? x.kind : 'hours';
    const withExp = past.money_visible && k !== 'hours';
    const pastLines = sendableLines(buildPayrollLines(past), withExp);
    const csv = payrollCsv(k, pastLines, past.period_start, past.period_end, withExp);
    return saveCSVFile(csv, payrollFilename(k, past.period_start, past.period_end));
  };

  const doSend = async () => {
    if (nothingNew || blockedByRate) return;
    try {
      const r = await send.mutateAsync({
        firmId,
        start,
        end,
        kind,
        timesheetIds: live.flatMap((l) => l.timesheetIds),
        expenseIds: withExpenses ? live.flatMap((l) => l.expenseIds) : [],
      });
      setReviewOpen(false);
      setSentId(r.export_id);
      // The file is rebuilt from exactly the rows the run stamped.
      try {
        const saved = await saveExportFile({ id: r.export_id, kind });
        toast.success('Sent to payroll', {
          description: saved.cancelled
            ? 'Logged. Tap Save the file below when you are ready.'
            : `${saved.filename} ${saved.method === 'share-sheet' ? 'is ready to share' : 'is in your downloads'}. Everyone's hours are marked as sent.`,
        });
      } catch {
        toast.success('Sent to payroll', { description: 'Logged. Tap Save the file below to get it.' });
      }
    } catch (e) {
      toast.error('Not sent', { description: payrollErrorMessage(e) });
      qc.invalidateQueries({ queryKey: ['payroll-run'] });
    }
  };

  const doUndo = (x: PayrollRunExport) =>
    undo.mutate(x.id, {
      onSuccess: (r) => {
        if (sentId === x.id) setSentId(null);
        toast.success('Run put back', {
          description: `${r.timesheets} entr${r.timesheets === 1 ? 'y' : 'ies'}${r.expenses ? ` and ${r.expenses} claim${r.expenses === 1 ? '' : 's'}` : ''} can be sent again.`,
        });
      },
      onError: (e) => toast.error('Could not put it back', { description: payrollErrorMessage(e) }),
    });

  const exportsHere = run.data?.exports ?? [];
  const justSent = sentId ? exportsHere.find((x) => x.id === sentId) : undefined;

  return (
    <Panel>
      <PanelHead
        eyebrow="Payroll · file"
        title="Send to payroll"
        right={
          <span className="text-[12.5px] text-white">
            {money ? 'Hours, expenses and mileage' : 'Hours only'}
          </span>
        }
      />

      <div className="space-y-5 px-4 py-5 sm:px-6">
        {/* Period */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Pay period" data-help="accounting.periods">
            {(['last', 'this'] as const).map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={effective === c}
                onClick={() => setChoice(c)}
                className={cn(chipBase, 'rounded-full px-4 text-[13.5px]', effective === c ? chipOn : chipOff)}
              >
                {c === 'last' ? (periods.firm ? 'Last period' : 'Last month') : periods.firm ? 'This period' : 'This month'}
                <span className="ml-1.5 font-normal">{formatPeriodRange(periods[c].start, periods[c].end)}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-3">
            <p className="text-[12.5px] leading-relaxed text-white">
              {periods.firm
                ? 'Your firm’s pay period.'
                : 'Your firm has not set a pay period, so this uses calendar months.'}
            </p>
            <p className="w-full text-[12.5px] leading-relaxed text-white">
              Subcontractors are paid by self-bill statement, see People, Subcontractors.
            </p>
            {data.can_manage && (
              <button
                type="button"
                data-help="accounting.pay-period"
                onClick={() => setPeriodOpen(true)}
                className="inline-flex h-11 items-center text-[13px] font-semibold text-elec-yellow touch-manipulation"
              >
                {periods.firm ? 'Change pay period' : 'Set pay period'}
              </button>
            )}
          </div>
        </div>

        {run.isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin text-white" />
        ) : run.error ? (
          <p className="text-[14px] text-white">{payrollErrorMessage(run.error)}</p>
        ) : (
          <>
            <StatStrip
              columns={4}
              stats={[
                { label: 'People', value: totals.people, tone: 'blue' },
                {
                  label: 'Hours to send',
                  value: hrs(totals.hours),
                  sub: totals.overtime > 0 ? `${hrs(totals.overtime)} overtime` : undefined,
                  tone: 'emerald',
                },
                money
                  ? { label: 'Gross pay', value: nothingNew ? 'None' : gbp(totals.gross), tone: 'emerald' }
                  : {
                      label: 'Waiting for approval',
                      value: totals.awaiting,
                      tone: totals.awaiting > 0 ? 'amber' : 'emerald',
                    },
                money
                  ? {
                      label: 'Expenses and mileage',
                      value: !withExpenses ? 'Left out' : totals.expenses === 0 ? 'None' : gbp(totals.reimbursement),
                      sub: withExpenses && totals.miles > 0 ? `${totals.miles.toLocaleString('en-GB', { maximumFractionDigits: 1 })} miles` : undefined,
                      tone: 'amber',
                    }
                  : { label: 'Entries', value: totals.timesheets, tone: 'blue' },
              ]}
            />

            <Warnings
              totalsAwaiting={totals.awaiting}
              noRate={kind !== 'hours' ? totals.noRate : []}
              lines={lines}
              hiddenExpenses={run.data?.hidden_expense_count ?? 0}
              exports={exportsHere}
            />

            {justSent && (
              <SentBanner
                x={justSent}
                onSave={() =>
                  saveExportFile(justSent).catch(() => toast.error('Could not save the file. Try again.'))
                }
                onUndo={() => doUndo(justSent)}
                undoing={undo.isPending}
              />
            )}

            {/* Format + expenses */}
            {money ? (
              <div className="grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                <div>
                  <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-white">File for</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {(['xero', 'quickbooks', 'sage', 'csv'] as PayrollFileKind[]).map((k) => (
                      <button
                        key={k}
                        type="button"
                        aria-pressed={kind === k}
                        onClick={() => setKindChoice(k)}
                        className={cn(chipBase, 'px-3 text-[13.5px]', kind === k ? chipOn : chipOff)}
                      >
                        {PAYROLL_FILE_LABEL[k]}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="flex min-h-11 items-center justify-between gap-4 self-end rounded-xl border border-white/[0.1] bg-white/[0.03] px-3.5 py-2.5">
                  <span className="text-[13.5px] leading-snug text-white">
                    Include approved expenses and mileage
                  </span>
                  <Switch
                    checked={includeExpenses}
                    onCheckedChange={setIncludeExpenses}
                    aria-label="Include approved expenses and mileage"
                  />
                </label>
              </div>
            ) : (
              <p className="text-[13px] leading-relaxed text-white">
                You will get an hours-only file. Pay, expenses and mileage are sent by the owner or an admin.
              </p>
            )}

            {/* People */}
            {lines.length > 0 && <PeopleList lines={lines} money={money} withExpenses={withExpenses} />}

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <PrimaryButton
                size="lg"
                data-help="accounting.send"
                onClick={() => setReviewOpen(true)}
                disabled={nothingNew || blockedByRate || send.isPending}
                className="h-12 w-full sm:w-auto"
              >
                <Send className="mr-2 h-4 w-4" />
                {nothingNew ? 'Nothing new to send' : `Send to payroll · ${totals.people} ${totals.people === 1 ? 'person' : 'people'}`}
              </PrimaryButton>
              <p className="text-[12.5px] leading-relaxed text-white sm:ml-3">
                {kind === 'hours'
                  ? 'Makes an hours-only file'
                  : kind === 'csv'
                    ? 'Makes a spreadsheet (CSV) payroll file'
                    : `Makes a payroll file set out for ${PAYROLL_FILE_LABEL[kind]}`}{' '}
                and marks it all as sent.
              </p>
            </div>

            {exportsHere.length > 0 && (
              <ExportsList
                exports={exportsHere}
                onSave={(x) => saveExportFile(x).catch(() => toast.error('Could not save the file. Try again.'))}
                onUndo={doUndo}
                undoing={undo.isPending}
              />
            )}
          </>
        )}
      </div>

      <FormSheet
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        width="wide"
        eyebrow="Send to payroll"
        title={formatPeriodRange(period.start, period.end)}
        description={`${kind === 'hours' ? 'Hours-only file' : kind === 'csv' ? 'Spreadsheet file' : `Payroll file set out for ${PAYROLL_FILE_LABEL[kind]}`}. Everything below is marked as sent, and each person sees it on their Timesheet.`}
        footer={
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <SecondaryButton onClick={() => setReviewOpen(false)} className="h-12">
              Cancel
            </SecondaryButton>
            <PrimaryButton onClick={doSend} disabled={send.isPending} className="h-12">
              {send.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileSpreadsheet className="mr-2 h-4 w-4" />}
              Send and save the file
            </PrimaryButton>
          </div>
        }
      >
        <StatStrip
          columns={4}
          stats={[
            { label: 'People', value: totals.people, tone: 'blue' },
            { label: 'Hours', value: hrs(totals.hours), sub: `${totals.timesheets} entries`, tone: 'emerald' },
            money
              ? { label: 'Gross pay', value: gbp(totals.gross), tone: 'emerald' }
              : { label: 'Overtime', value: hrs(totals.overtime), tone: 'amber' },
            money
              ? {
                  label: 'Repaid',
                  value: withExpenses ? gbp(totals.reimbursement) : 'Left out',
                  sub: withExpenses ? `${totals.expenses} claim${totals.expenses === 1 ? '' : 's'}` : undefined,
                  tone: 'amber',
                }
              : { label: 'Leave days', value: live.reduce((s, l) => s + l.leaveDays, 0), tone: 'blue' },
          ]}
        />
        {totals.awaiting > 0 && (
          <p className="text-[13.5px] leading-relaxed text-white">
            {totals.awaiting} entr{totals.awaiting === 1 ? 'y is' : 'ies are'} still waiting for approval.
            They are not in this run and will go in the next one once approved.
          </p>
        )}
        {withExpenses && totals.expenses > 0 && run.data?.payday ? (
          <PaydayNote
            payday={run.data.payday}
            fromSettings={run.data.payday_source === 'settings'}
            canSet={data.can_manage}
            onSet={() => {
              setReviewOpen(false);
              setPeriodOpen(true);
            }}
          />
        ) : null}
        <PeopleList lines={live} money={money} withExpenses={withExpenses} />
      </FormSheet>

      <PayPeriodSheet open={periodOpen} onOpenChange={setPeriodOpen} />
    </Panel>
  );
}

function PaydayNote({
  payday,
  fromSettings,
  canSet,
  onSet,
}: {
  payday: string;
  fromSettings: boolean;
  canSet: boolean;
  onSet: () => void;
}) {
  const when = format(parseISO(payday), 'EEE d MMM');
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] p-3.5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[13.5px] leading-relaxed text-white">
        {fromSettings ? (
          <>
            Expenses are repaid with pay on <strong>{when}</strong>. They show as In payroll until then, and
            are marked paid on payday by themselves.
          </>
        ) : (
          <>
            Your firm has no payday set, so expenses count as repaid on the period end,{' '}
            <strong>{when}</strong>. Set a payday to use your real one.
          </>
        )}
      </p>
      {!fromSettings && canSet ? (
        <button
          type="button"
          onClick={onSet}
          className="inline-flex h-11 shrink-0 items-center text-[13px] font-semibold text-elec-yellow touch-manipulation"
        >
          Set payday
        </button>
      ) : null}
    </div>
  );
}

function Warnings({
  totalsAwaiting,
  noRate,
  lines,
  hiddenExpenses,
  exports,
}: {
  totalsAwaiting: number;
  noRate: string[];
  lines: PayrollLine[];
  hiddenExpenses: number;
  exports: PayrollRunExport[];
}) {
  const navigate = useNavigate();
  const sentHours = lines.reduce((s, l) => s + l.sentHours, 0);
  const late = lines.reduce((s, l) => s + l.earlierHours, 0);
  const items: Array<{ tone: 'red' | 'amber' | 'neutral'; body: ReactNode; action?: { label: string; go: () => void } }> = [];
  if (noRate.length > 0)
    items.push({
      tone: 'red',
      body: `${noRate.join(', ')} ${noRate.length === 1 ? 'has' : 'have'} no hourly rate, so the pay file cannot be priced. Add the rate in Team, or send an hours-only file.`,
      action: { label: 'Open Team', go: () => navigate('/employer?section=team') },
    });
  if (totalsAwaiting > 0)
    items.push({
      tone: 'amber',
      body: `${totalsAwaiting} entr${totalsAwaiting === 1 ? 'y is' : 'ies are'} waiting for approval in this period. Approve them first, or they go in the next run.`,
      action: { label: 'Approve hours', go: () => navigate('/employer?section=timesheets&tab=pending') },
    });
  if (sentHours > 0 && exports.length > 0)
    items.push({
      tone: 'neutral',
      body: `${hrs(sentHours)} in this period already went to payroll and are not sent again.`,
    });
  if (late > 0)
    items.push({
      tone: 'neutral',
      body: `${hrs(late)} were approved late from before this period. They are included so they get paid.`,
    });
  if (hiddenExpenses > 0)
    items.push({
      tone: 'neutral',
      body: `${hiddenExpenses} approved expense claim${hiddenExpenses === 1 ? ' is' : 's are'} left for the owner or an admin to send.`,
    });
  if (items.length === 0) return null;
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li
          key={i}
          className={cn(
            'flex flex-col gap-2 rounded-xl border p-3.5 sm:flex-row sm:items-center sm:justify-between',
            it.tone === 'red'
              ? 'border-red-500/40 bg-red-500/10'
              : it.tone === 'amber'
                ? 'border-amber-500/40 bg-white/[0.04]'
                : 'border-white/[0.1] bg-white/[0.03]'
          )}
        >
          <p className="text-[13.5px] leading-relaxed text-white">{it.body}</p>
          {it.action && (
            <button
              type="button"
              onClick={it.action.go}
              className="inline-flex h-11 shrink-0 items-center text-[13px] font-semibold text-elec-yellow touch-manipulation"
            >
              {it.action.label}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

function PeopleList({
  lines,
  money,
  withExpenses,
}: {
  lines: PayrollLine[];
  money: boolean;
  withExpenses: boolean;
}) {
  return (
    <ul className="grid grid-cols-1 gap-2 lg:grid-cols-2">
      {lines.map((l) => {
        const bits = [
          l.totalHours > 0 ? `${hrs(l.totalHours)}${l.overtimeHours > 0 ? ` (${hrs(l.overtimeHours)} overtime)` : ''}` : 'No new hours',
          l.leaveDays > 0 ? `${l.leaveDays} leave day${l.leaveDays === 1 ? '' : 's'}` : null,
          withExpenses && l.mileageMiles > 0
            ? `${l.mileageMiles.toLocaleString('en-GB', { maximumFractionDigits: 1 })} miles`
            : null,
        ].filter(Boolean);
        return (
          <li
            key={l.employeeId}
            className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="min-w-0 truncate text-[14.5px] font-semibold text-white">{l.name}</p>
              {money && (
                <p className="shrink-0 text-[14.5px] font-semibold tabular-nums text-white">
                  {l.noRate ? 'No rate' : gbp((l.gross ?? 0) + (withExpenses ? (l.reimbursement ?? 0) : 0))}
                </p>
              )}
            </div>
            <p className="mt-0.5 text-[12.5px] text-white">{bits.join(' · ')}</p>
            {money && (
              <p className="mt-0.5 text-[12.5px] text-white">
                {l.rate != null ? `${gbp(l.rate)} an hour, gross ${gbp(l.gross)}` : 'No hourly rate on the team record'}
                {withExpenses && (l.reimbursement ?? 0) > 0 ? ` · repaid ${gbp(l.reimbursement)}` : ''}
              </p>
            )}
            {withExpenses && l.expenseDetail && (
              <p className="mt-1 line-clamp-2 text-[12px] text-white">{l.expenseDetail}</p>
            )}
            {l.awaitingCount > 0 && (
              <p className="mt-1 text-[12px] text-white">
                {l.awaitingCount} more waiting for approval ({hrs(l.awaitingHours)})
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function SentBanner({
  x,
  onSave,
  onUndo,
  undoing,
}: {
  x: PayrollRunExport;
  onSave: () => void;
  onUndo: () => void;
  undoing: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-3">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
        <p className="text-[14px] leading-relaxed text-white">
          Sent to payroll. {x.timesheet_count} entr{x.timesheet_count === 1 ? 'y' : 'ies'}
          {x.expense_count ? ` and ${x.expense_count} claim${x.expense_count === 1 ? '' : 's'}` : ''} for{' '}
          {x.people} {x.people === 1 ? 'person' : 'people'}. Each of them now sees it on their Timesheet.
          {x.expense_count > 0 && x.payday ? (
            <>
              {' '}
              {x.expenses_paid
                ? `Expenses paid on ${shortPayday(x.payday)}.`
                : `Expenses are in payroll and will be marked paid on ${shortPayday(x.payday)}.`}
            </>
          ) : null}
        </p>
      </div>
      <div className="flex gap-2">
        <SecondaryButton onClick={onSave} className="h-11 flex-1 sm:flex-none">
          Save the file
        </SecondaryButton>
        {x.can_undo && (
          <SecondaryButton onClick={onUndo} disabled={undoing} className="h-11 flex-1 sm:flex-none">
            Undo
          </SecondaryButton>
        )}
      </div>
    </div>
  );
}

function ExportsList({
  exports,
  onSave,
  onUndo,
  undoing,
}: {
  exports: PayrollRunExport[];
  onSave: (x: PayrollRunExport) => void;
  onUndo: (x: PayrollRunExport) => void;
  undoing: boolean;
}) {
  return (
    <div>
      <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-white">
        Already sent for this period
      </p>
      <ul className="divide-y divide-white/[0.07] rounded-xl border border-white/[0.08]">
        {exports.map((x) => (
          <li key={x.id} className="flex flex-col gap-2 px-3.5 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-white">
                {format(parseISO(x.exported_at), 'EEE d MMM, HH:mm')} by {x.mine ? 'you' : x.by_name}
              </p>
              {x.expense_count > 0 && x.payday ? (
                <p className="mt-1">
                  <span
                    className={cn(
                      'inline-flex min-h-[24px] items-center rounded-full border px-2.5 text-[12px] font-semibold text-white',
                      x.expenses_paid ? 'border-emerald-500/50 bg-emerald-500/15' : 'border-sky-500/50 bg-sky-500/15'
                    )}
                  >
                    {x.expenses_paid
                      ? `Expenses paid on ${shortPayday(x.payday)}`
                      : `Expenses in payroll · paid on ${shortPayday(x.payday)}`}
                  </span>
                </p>
              ) : null}
              <p className="mt-0.5 text-[12.5px] text-white">
                {[
                  formatPeriodRange(parseISO(x.period_start), parseISO(x.period_end)),
                  `${x.timesheet_count} entr${x.timesheet_count === 1 ? 'y' : 'ies'}`,
                  x.expense_count ? `${x.expense_count} claim${x.expense_count === 1 ? '' : 's'}` : null,
                  Number(x.total_hours) > 0 ? hrs(Number(x.total_hours)) : null,
                  `${PAYROLL_FILE_LABEL[x.kind] ?? x.kind} file`,
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              {x.timesheet_count + x.expense_count > 0 && (
                <SecondaryButton onClick={() => onSave(x)} className="h-11 flex-1 px-4 sm:flex-none">
                  Save again
                </SecondaryButton>
              )}
              {x.can_undo && (
                <SecondaryButton onClick={() => onUndo(x)} disabled={undoing} className="h-11 flex-1 px-4 sm:flex-none">
                  Undo
                </SecondaryButton>
              )}
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[12px] leading-relaxed text-white">
        Undo is open for 48 hours, and only before payday for a run with expenses. It puts the
        entries back so they can be sent again.
      </p>
    </div>
  );
}
