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
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { PayRunPanel, SubbiesPanel } from '@/components/employer/payroll/PayRunPanel';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Plug,
  RefreshCw,
  RotateCcw,
  Send,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  PageHero,
  StatStrip,
  PrimaryButton,
  SecondaryButton,
  LoadingBlocks,
} from '@/components/employer/editorial';
import {
  PageColumn,
  HeroActions,
  RefreshIcon,
  panel,
  twoColClass,
  colClass,
} from '@/components/employer/pageParts/PageParts';
import {
  PageHelpButton,
  HowItWorks,
  type PageHelpContent,
  type HelpBlocker,
} from '@/components/hub/PageHelp';
import { chipBase, chipOn, chipOff } from '@/components/forms/fieldStyles';
import { Switch } from '@/components/ui/switch';
import { useOfficeFirmId, useFirmPaySettings } from '@/hooks/useFirmPaySettings';
import {
  PROVIDER_NAME,
  connectFirmAccounting,
  plainSyncError,
  syncFirmInvoice,
  useFirmAccounting,
  useFirmInvoiceSync,
  useSetFirmAutoSync,
  type AccountingProviderId,
  type FirmAccounting,
  type FirmConnection,
  type InvoiceSyncRow,
} from '@/hooks/useFirmAccounting';
import { formatPeriodRange, isPaySettingsComplete } from '@/utils/payPeriods';

const HELP: PageHelpContent = {
  id: 'employer-accounting',
  title: 'Accounting',
  what: (
    <>
      Your firm&apos;s Xero, QuickBooks or Sage connection in one place. Invoices go across to your
      books by themselves, and at the end of each pay period one tap sends approved hours, expenses
      and mileage to payroll, with holiday, sick pay and the minimum wage checked.
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
      body: 'Pick the pay period and your payroll software, then tap Check and send. You see the minimum wage check, holiday and sick pay for each person, then get the file. Everyone’s hours are marked as sent so nothing goes twice.',
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
          Invoices are a <strong>live sync</strong>: they are posted straight into your package.
          Payroll is a <strong>file</strong>: the connection cannot post into payroll, so you get a
          spreadsheet laid out for BrightPay, QuickBooks, Sage, Moneysoft or Xero, or a general one
          for anything else. Each choice says whether it matches that product&apos;s published
          import or is set out to match or type in.
        </>
      ),
    },
    {
      title: 'One pay run',
      body: 'This is the only payroll file. The Timesheets Payroll file button opens it. It carries hours, overtime, holiday hours and pay (12.07% built up for irregular-hours workers, or rolled-up holiday pay where set), SSP days and pay, and expenses and mileage to repay.',
    },
    {
      title: 'Minimum wage and apprentice rate',
      body: 'Each person’s hourly rate is checked against the minimum for their age, or the apprentice rate, on every day they worked. Anyone below it stops the run until the rate is fixed, or the owner or an admin gives a reason, which is kept with the run.',
    },
    {
      title: 'The holiday record',
      body: 'Each run writes holiday built up, holiday pay and rolled-up pay to the holiday record, kept for 6 years. You see it on each person’s sheet.',
    },
    {
      title: 'Subcontractors',
      body: 'Subcontractors are never in the payroll file. They are paid by self-bill statement with CIS, shown in their own panel with a CIS file.',
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
          caption:
            'Tap your package and sign in on its page. Already connected? Reconnect it here if it stops working.',
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
        {
          target: 'accounting.sync-all',
          caption: 'Tap Sync now to send every waiting invoice.',
          optional: true,
        },
        {
          target: 'accounting.sync-one',
          caption: 'Or Sync now on a single invoice.',
          optional: true,
        },
      ],
    },
    {
      title: 'Run payroll for the pay period',
      steps: [
        'Approve the period’s timesheets first. Only approved hours go.',
        'Under Send to payroll, pick Last period or This period (calendar months until a pay period is set).',
        'Pick your payroll software: BrightPay, QuickBooks, Sage, Moneysoft, Xero or Other. Switch expenses and mileage on or off.',
        'Tap Check and send. Read the minimum wage and holiday checks, then tap Send and save the file.',
      ],
      after:
        'Everything in the file is marked as sent, and each person sees it on their Timesheet and My pay. Expenses show In payroll and are marked Paid on payday by themselves. Sent by mistake? Tap Undo within 48 hours, and before payday if it has expenses. Workers with no pay rate block a file with pay until a rate is set.',
      who: 'Owner and admins get pay, expenses and mileage. Office managers get an hours-only file.',
      tour: [
        { target: 'accounting.periods', caption: 'Pick the pay period to send.' },
        {
          target: 'accounting.send',
          caption: 'Tap Check and send, read the checks, then Send and save the file.',
        },
      ],
    },
    {
      title: 'Set the pay period',
      steps: [
        'Under Send to payroll, tap Set pay period (or Change pay period).',
        'Choose how often you pay, when the period runs and the payday, then tap Save.',
      ],
      after:
        'Workers then see their payday on My pay, and payroll offers your real periods instead of calendar months.',
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
  return <section className={cn(panel, className)}>{children}</section>;
}

function PanelHead({
  title,
  right,
}: {
  /** Kept for callers; the title says enough, so it is not drawn. */
  eyebrow?: string;
  title: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3.5 sm:px-6">
      <div className="min-w-0">
        <h2 className="text-[16px] font-semibold leading-tight tracking-tight text-white">
          {title}
        </h2>
      </div>
      {right}
    </div>
  );
}

const gbp = (n: number | null | undefined) =>
  n == null
    ? 'None'
    : `£${n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const ago = (iso: string | null | undefined) =>
  iso ? `${formatDistanceToNow(parseISO(iso))} ago` : 'Never';

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
  // The pay run's period, so the subcontractor panel shows the same one.
  const [runPeriod, setRunPeriod] = useState<{ start: string; end: string } | null>(null);
  const onPeriodChange = useCallback(
    (start: string, end: string) =>
      setRunPeriod((p) => (p && p.start === start && p.end === end ? p : { start, end })),
    []
  );

  // Back from the provider's sign-in page.
  useEffect(() => {
    const ok = params.get('accounting');
    const err = params.get('accounting_error');
    if (!ok && !err) return;
    if (ok && params.get('success') === 'true') {
      const name = PROVIDER_NAME[ok as AccountingProviderId] ?? 'Your package';
      toast.success(`${name} connected`, {
        description: 'New invoices will go across when they are sent.',
      });
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

  // ?focus=payrun (the Timesheets "Pay run" button): bring Send to payroll
  // into view once the page has drawn, then drop the param.
  const focus = params.get('focus');
  const loaded = !!data;
  useEffect(() => {
    if (focus !== 'payrun' || !loaded) return;
    const t = window.setTimeout(() => {
      document
        .querySelector<HTMLElement>('[data-help="accounting.payrun"]')
        ?.scrollIntoView({ block: 'start', behavior: 'smooth' });
      const next = new URLSearchParams(params);
      next.delete('focus');
      setParams(next, { replace: true });
    }, 150);
    return () => window.clearTimeout(t);
  }, [focus, loaded, params, setParams]);

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ['firm-accounting'] });
    qc.invalidateQueries({ queryKey: ['firm-invoice-sync'] });
    qc.invalidateQueries({ queryKey: ['payroll-run'] });
  };

  const primary =
    data?.connections.find((c) => c.state === 'connected') ?? data?.connections[0] ?? null;

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
  } else if (
    data?.can_manage &&
    primary &&
    primary.state !== 'connected' &&
    primary.state !== 'stale'
  ) {
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

  const attention = data ? data.invoices.failed + data.invoices.waiting : 0;
  const statusLine = !data
    ? 'Your accounting package, invoices in your books, and month-end payroll in one tap.'
    : !primary
      ? 'No accounting package connected, so invoices are not going into your books.'
      : primary.state !== 'connected' && primary.state !== 'stale'
        ? `${PROVIDER_NAME[primary.provider]} needs reconnecting before invoices can go across.`
        : `Connected to ${PROVIDER_NAME[primary.provider]}. ${data.invoices.synced.toLocaleString()} invoice${
            data.invoices.synced === 1 ? '' : 's'
          } in your books${attention > 0 ? `, ${attention} need attention` : ''}.`;

  return (
    <PageColumn>
      <PageHero
        title="Accounting"
        description={statusLine}
        actions={
          <HeroActions>
            <RefreshIcon onClick={refresh} spinning={acct.isFetching} />
            <PageHelpButton
              help={HELP}
              blockers={helpBlockers}
              askContext={{ page: 'accounting' }}
            />
          </HeroActions>
        }
      />

      <HowItWorks help={HELP} blockers={helpBlockers} askContext={{ page: 'accounting' }} />

      {acct.isLoading ? (
        <LoadingBlocks />
      ) : acct.error || !data || !firmId ? (
        <Panel className="px-4 py-6 sm:px-6">
          <p className="text-[15px] font-semibold text-white">Accounting did not load</p>
          <p className="mt-1 text-[13.5px] text-white">
            Check your connection and tap refresh. If it keeps happening, ask the owner to check
            your access.
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
                sub: primary
                  ? `${PROVIDER_NAME[primary.provider]} · ${STATE_COPY[primary.state].label}`
                  : 'Not connected',
                tone: primary && primary.state !== 'connected' ? 'red' : undefined,
              },
              {
                label: 'Invoices in your books',
                value: data.invoices.synced.toLocaleString(),
              },
              {
                label: 'Need attention',
                value: (data.invoices.failed + data.invoices.waiting).toLocaleString(),
                sub: data.invoices.failed > 0 ? `${data.invoices.failed} failed` : undefined,
                tone:
                  data.invoices.failed > 0
                    ? 'red'
                    : data.invoices.waiting > 0
                      ? 'yellow'
                      : undefined,
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
              },
            ]}
          />

          {/* Payroll and invoices are the work; the connection supports them. */}
          <div className={twoColClass}>
            <div className={colClass}>
              <PayRunPanel firmId={firmId} data={data} onPeriodChange={onPeriodChange} />
              {money ? (
                <InvoicesPanel
                  rows={invoices.data ?? []}
                  loading={invoices.isLoading}
                  provider={primary?.state === 'connected' ? primary.provider : null}
                  connectionBroken={
                    !!primary && primary.state !== 'connected' && primary.state !== 'stale'
                  }
                />
              ) : (
                <Panel>
                  <PanelHead eyebrow="Invoices" title="Invoices in your books" />
                  <div className="space-y-2 px-4 py-5 sm:px-6">
                    <p className="text-[14px] leading-relaxed text-white">
                      {data.invoices.synced} invoice{data.invoices.synced === 1 ? ' is' : 's are'}{' '}
                      in {primary ? PROVIDER_NAME[primary.provider] : 'the accounting package'}.
                      {data.invoices.failed + data.invoices.waiting > 0 &&
                        ` ${data.invoices.failed + data.invoices.waiting} need an owner or admin to look at them.`}
                    </p>
                    <p className="text-[13px] text-white">
                      Invoice amounts are for the owner and admins only.
                    </p>
                  </div>
                </Panel>
              )}
            </div>
            <div className={colClass}>
              {runPeriod && (
                <SubbiesPanel start={runPeriod.start} end={runPeriod.end} money={money} />
              )}
              <ConnectionPanel
                firmId={firmId}
                data={data}
                onOpenSettings={() => navigate('/settings?tab=business')}
              />
            </div>
          </div>
        </>
      )}
    </PageColumn>
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
        <PanelHead
          eyebrow="Connection"
          title="Not connected"
          right={<Tag tone="neutral">No package</Tag>}
        />
        <div className="space-y-4 px-4 py-5 sm:px-6">
          <p className="text-[14px] leading-relaxed text-white">
            Connect the firm&apos;s accounting package and invoices go into your books when they are
            sent, with no re-keying.
          </p>
          {data.can_manage ? (
            <div
              className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1"
              data-help="accounting.connect"
            >
              {/* ELE-2077: FreeAgent shows once its app keys are set (VITE_FREEAGENT_ENABLED). */}
              {(
                [
                  'xero',
                  'quickbooks',
                  'sage',
                  ...(import.meta.env.VITE_FREEAGENT_ENABLED === 'true' ? ['freeagent'] : []),
                ] as AccountingProviderId[]
              ).map((p) => (
                <SecondaryButton
                  key={p}
                  onClick={() => connect(p)}
                  disabled={!!busy}
                  className="h-12 w-full"
                >
                  {busy === p ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Plug className="mr-2 h-4 w-4" />
                  )}
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
              {data.last_error.invoice_number ? ` (invoice ${data.last_error.invoice_number})` : ''}
              : {plainSyncError(data.last_error.error, conn.provider)}
            </p>
          </div>
        )}

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-white">
          <div>
            <dt className="text-[12.5px] text-white">Invoices</dt>
            <dd className="mt-0.5 text-[14px] font-semibold">Live sync</dd>
          </div>
          <div>
            <dt className="text-[12.5px] text-white">Payroll</dt>
            <dd className="mt-0.5 text-[14px] font-semibold">File for {name}</dd>
          </div>
          <div>
            <dt className="text-[12.5px] text-white">Last invoice sent</dt>
            <dd className="mt-0.5 text-[14px] font-semibold">{ago(conn.last_sync_at)}</dd>
          </div>
          <div>
            <dt className="text-[12.5px] text-white">Connected</dt>
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
                      toast.success(
                        v
                          ? `Invoices will go to ${name} when sent`
                          : 'Invoices will only go across when you tap Sync now'
                      ),
                    onError: () => toast.error('Could not change that. Try again.'),
                  }
                )
              }
              aria-label={`Send invoices to ${name} automatically`}
            />
          </label>
        )}

        <div
          className="flex flex-col gap-2 sm:flex-row sm:flex-wrap"
          data-help="accounting.connect"
        >
          {data.can_manage && (
            <SecondaryButton
              data-help="accounting.reconnect"
              onClick={() => connect(conn.provider)}
              disabled={!!busy}
              className="h-11"
            >
              {busy ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RotateCcw className="mr-2 h-4 w-4" />
              )}
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

const INVOICE_TAG: Record<
  InvoiceSyncRow['sync_state'],
  { tone: TagTone; label: (p: string) => string }
> = {
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
    else
      toast.error(`${r.invoice_number ?? 'Invoice'} did not go across`, {
        description: res.message,
      });
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
    if (failed === 0)
      toast.success(
        `${attention.length} invoice${attention.length === 1 ? '' : 's'} sent to ${providerName}`
      );
    else
      toast.error(`${failed} of ${attention.length} did not go across`, {
        description: 'Each one now says why.',
      });
  };

  return (
    <Panel>
      <PanelHead
        eyebrow="Invoices · live sync"
        title={provider ? `Invoices in ${providerName}` : 'Invoices'}
        right={
          provider && attention.length > 0 && !connectionBroken ? (
            <PrimaryButton
              data-help="accounting.sync-all"
              onClick={syncAll}
              disabled={!!bulk}
              className="h-11"
            >
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
            className={cn(
              chipBase,
              'rounded-full px-4 text-[13px]',
              filter === v ? chipOn : chipOff
            )}
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
                        r.sync_state === 'synced' && r.synced_at
                          ? `sent across ${ago(r.synced_at)}`
                          : null,
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  </div>
                  <Tag tone={tag.tone}>
                    {tag.label(r.provider ? PROVIDER_NAME[r.provider] : providerName)}
                  </Tag>
                  {canSync && (
                    <SecondaryButton
                      data-help="accounting.sync-one"
                      onClick={() => syncOne(r)}
                      disabled={busy || !!bulk}
                      className="h-11 px-4"
                    >
                      {busy ? (
                        <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="mr-1.5 h-4 w-4" />
                      )}
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
