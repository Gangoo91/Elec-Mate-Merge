import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { YELLOW_HEX, WHITE_HEX, chartTick, moneyTick } from '@/components/employer/finance/chartStyle';
import type { Section } from '@/pages/employer/EmployerDashboard';
import { cn } from '@/lib/utils';
import { useExpenseClaims, useMaterialOrders } from '@/hooks/useFinance';
import { useFirmPriceBook } from '@/hooks/useFirmPriceBook';
import { useOfficeFirmId } from '@/hooks/useFirmPaySettings';
import { useFirmAccounting, PROVIDER_NAME } from '@/hooks/useFirmAccounting';
import {
  useEmployerHubCounts,
  useFinanceMonthly,
  useFinanceSummary,
} from '@/hooks/useFinanceModel';
import { useFirmDebtors } from '@/hooks/useGetPaid';
import { financePeriod, formatGBPCompact } from '@/lib/financeDefinitions';
import { lowPointLine, useCashForecast } from '@/hooks/useCashForecast';
import { PageHelpButton, HowItWorks } from '@/components/hub/PageHelp';
import { FINANCE_HUB_HELP } from '@/components/employer/help/finance';
import { PageFrame, PageHero, LoadingBlocks } from '@/components/employer/editorial';
import {
  StatCards,
  SectionHead,
  ListPanel,
  PageTiles,
  areaCard,
  type IndexLink,
} from '@/components/employer/hubs/AreaPage';
import {
  frameClass,
  HeroActions,
  HeroPrimary,
  HeroSecondary,
  plural,
} from '@/components/employer/pageParts/PageParts';
import { matePad, daysFromToday, relDays } from '@/components/employer/hubs/HubPanels';

interface FinanceHubProps {
  onNavigate: (section: Section) => void;
}

// Solid, as SVG fill attributes can't read CSS variables (--elec-yellow 47 100% 50%).

/**
 * Finance landing, on the area page template (10 Oct). Every money figure
 * comes from the shared finance model (get_finance_summary / _monthly), so
 * Owed to you here equals Outstanding on Quotes & Invoices, Clients, Reports
 * and Accounts. Money shows to owner and admins only; office sees counts.
 *
 * Opens on four figures, six months of money in against costs with the cash
 * forecast's low point, who owes most beside what is coming in, then every
 * Finance page as tiles.
 */
export function FinanceHub({ onNavigate }: FinanceHubProps) {
  const navigate = useNavigate();
  const thisMonth = useMemo(() => financePeriod('this_month'), []);
  const allTime = useFinanceSummary(null, null);
  const month = useFinanceSummary(thisMonth.from, thisMonth.to);
  const { data: hub } = useEmployerHubCounts();
  const { data: expenseClaims = [] } = useExpenseClaims();
  const { data: materialOrders = [] } = useMaterialOrders();
  const { data: priceBook } = useFirmPriceBook();

  const pendingClaims = expenseClaims
    .filter((e) => e.status === 'Pending')
    .sort((a, b) => (a.submitted_date < b.submitted_date ? -1 : 1));
  const pendingExpenses = pendingClaims.length;
  const openOrders = materialOrders.filter(
    (o) => !['Draft', 'Received', 'Cancelled'].includes(o.status)
  ).length;

  // ELE-1825: the firm's accounting connection (the owner's), counts only.
  const { data: firmId } = useOfficeFirmId();
  const { data: acct } = useFirmAccounting(firmId);
  const acctConn = acct?.connections.find((c) => c.state === 'connected') ?? acct?.connections[0];
  const accountingProblem =
    !!acct &&
    (!acctConn ||
      (acctConn.state !== 'connected' && acctConn.state !== 'stale') ||
      acct.invoices.failed > 0);
  const accountingMeta = !acct
    ? undefined
    : !acctConn
      ? 'Not connected'
      : acctConn.state !== 'connected' && acctConn.state !== 'stale'
        ? `${PROVIDER_NAME[acctConn.provider]} needs reconnecting`
        : acct.invoices.failed > 0
          ? `${PROVIDER_NAME[acctConn.provider]}, ${plural(acct.invoices.failed, 'invoice')} failed`
          : `Connected to ${PROVIDER_NAME[acctConn.provider]}`;

  const s = allTime.data;
  const m = month.data;
  const moneyVisible = !!m?.moneyVisible;
  // ELE-2074: the 8-week cash forecast, owner and admins only.
  const cash = useCashForecast(firmId, moneyVisible);
  const monthly = useFinanceMonthly(6);
  const debtors = useFirmDebtors(moneyVisible);
  const gbp = (v: number | undefined) => (v === undefined ? '-' : formatGBPCompact(v));

  // Who owes most: one row per customer, their total and their latest invoice.
  const topDebtors = useMemo(() => {
    const by = new Map<
      string,
      { key: string; name: string; balance: number; late: number; count: number; first: string }
    >();
    for (const r of debtors.data?.rows ?? []) {
      if (r.balance <= 0) continue;
      const k = r.customer_key || r.client;
      const cur = by.get(k) ?? {
        key: k,
        name: r.company_name || r.client || 'Customer',
        balance: 0,
        late: 0,
        count: 0,
        first: r.invoice_id,
      };
      cur.balance += r.balance;
      cur.count += 1;
      if (r.days_overdue > cur.late) {
        cur.late = r.days_overdue;
        cur.first = r.invoice_id;
      }
      by.set(k, cur);
    }
    return [...by.values()].sort((a, b) => b.balance - a.balance);
  }, [debtors.data]);

  // Coming in: unpaid invoices not yet late, soonest first.
  const dueNext = useMemo(
    () =>
      (debtors.data?.rows ?? [])
        .filter((r) => r.balance > 0 && r.due_on && r.days_overdue <= 0)
        .sort((a, b) => (a.due_on! < b.due_on! ? -1 : 1)),
    [debtors.data]
  );

  const chartData = useMemo(
    () =>
      (monthly.data ?? []).map((r) => {
        const d = new Date(`${r.monthStart}T12:00:00`);
        return {
          key: r.monthStart,
          // date-fns "Sep", as everywhere else in the app (en-GB gives "Sept").
          label: format(d, 'MMM'),
          long: format(d, 'MMMM yyyy'),
          paidIn: r.paidIn,
          costs: r.totalCosts,
        };
      }),
    [monthly.data]
  );
  const chartIn = chartData.reduce((t, d) => t + d.paidIn, 0);
  const chartOut = chartData.reduce((t, d) => t + d.costs, 0);
  const chartEmpty = chartIn === 0 && chartOut === 0;
  const hasChart = !monthly.isLoading && !monthly.error && chartData.length > 0 && !chartEmpty;
  // Last month's paid in, from the same monthly series (no extra query).
  const lastMonthIn = chartData.length >= 2 ? chartData[chartData.length - 2] : undefined;

  const owedView = () => navigate('/employer?section=quotes&view=owed');

  /* ── The one live line ───────────────────────────────────────── */

  const claimsLine =
    pendingExpenses > 0 ? ` ${plural(pendingExpenses, 'expense claim')} to approve.` : '';
  const statusLine = !s
    ? 'Quotes, invoices, costs and reporting.'
    : s.outstandingCount > 0
      ? `${moneyVisible ? `${formatGBPCompact(s.outstanding)} owed` : plural(s.outstandingCount, 'unpaid invoice')}${
          s.overdueCount > 0 ? `, ${plural(s.overdueCount, 'invoice')} overdue` : ', nothing late'
        }.${claimsLine}`
      : `Nothing owed to you.${claimsLine}${
          moneyVisible && m && m.paidIn > 0
            ? ` ${formatGBPCompact(m.paidIn)} paid in this month.`
            : ''
        }`;

  const help = <PageHelpButton help={FINANCE_HUB_HELP} askContext={{ page: 'financehub' }} />;

  if (allTime.isLoading) {
    return (
      <PageFrame className={frameClass}>
        <PageHero title="Finance" description="Loading your money." />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  const lowLine = lowPointLine(cash.data);
  const cashProblem =
    !!cash.data &&
    (cash.data.has_balance
      ? (cash.data.low?.balance ?? 0) < 0
      : cash.data.weeks.reduce((t, w) => t + w.net, 0) < 0);

  /* ── The four figures ────────────────────────────────────────── */

  const paidThis = m?.paidIn ?? 0;
  const paidLast = lastMonthIn?.paidIn ?? 0;
  const paidStat = moneyVisible
    ? {
        label: 'Paid in this month',
        value: gbp(m?.paidIn),
        sub:
          paidLast > 0
            ? `Against ${formatGBPCompact(paidLast)} in ${lastMonthIn!.long.split(' ')[0]}`
            : m
              ? m.paidCount > 0
                ? `${plural(m.paidCount, 'invoice')} paid`
                : 'Nothing paid in yet'
              : undefined,
        progress: paidLast > 0 ? paidThis / paidLast : undefined,
        onOpen: () => onNavigate('accounts'),
      }
    : {
        label: 'Paid this month',
        value: m ? m.paidCount : '-',
        sub: 'Invoices paid',
        onOpen: () => navigate('/employer?section=quotes&tab=invoices'),
      };

  /* ── Every page in Finance, each with its figure ─────────────── */

  const moneyIn: IndexLink[] = [
    {
      title: 'Quotes & invoices',
      detail: 'Create, send and chase quotes and invoices',
      value:
        s && s.outstandingCount > 0
          ? moneyVisible
            ? `${formatGBPCompact(s.outstanding)} owed`
            : `${s.outstandingCount} unpaid`
          : undefined,
      onClick: () => onNavigate('quotes'),
    },
    // ELE-2065: aged debt, next chase, promise-to-pay (owner/admin).
    ...(moneyVisible
      ? [
          {
            title: 'Who owes me',
            detail:
              s && s.overdue > 0
                ? `${formatGBPCompact(s.overdue)} overdue`
                : 'Aged debt, the next chase and promises to pay',
            problem: !!s && s.overdue > 0,
            value: s && s.outstandingCount > 0 ? plural(s.outstandingCount, 'invoice') : undefined,
            onClick: owedView,
          },
        ]
      : []),
    {
      title: 'Clients',
      detail: 'Every customer with their quotes, invoices, jobs and balance',
      onClick: () => onNavigate('clients'),
    },
    ...(moneyVisible
      ? [
          {
            title: 'Cash forecast',
            detail: 'Money in and out for the next 8 weeks, an estimate',
            onClick: () => onNavigate('cashforecast'),
          },
        ]
      : []),
  ];

  const profit: IndexLink[] = [
    {
      title: 'Job financials',
      detail: !hub
        ? 'Profit per job from invoices, time, orders and expenses'
        : hub.jobs.jobs_gross_profit === null
          ? 'Owner and admins only'
          : hub.jobs.jobs_invoiced > 0
            ? `Gross profit on ${plural(hub.jobs.jobs_invoiced, 'invoiced job')}`
            : 'No jobs invoiced yet',
      problem: !!hub && (hub.jobs.jobs_gross_profit ?? 0) < 0,
      value:
        hub && hub.jobs.jobs_gross_profit !== null && hub.jobs.jobs_invoiced > 0
          ? formatGBPCompact(hub.jobs.jobs_gross_profit)
          : undefined,
      onClick: () => onNavigate('financials'),
    },
    {
      title: 'Reports',
      detail:
        moneyVisible && m ? 'Invoiced this month' : 'Invoiced, costs, gross profit, debtor aging',
      value: moneyVisible && m ? formatGBPCompact(m.invoiced) : undefined,
      onClick: () => onNavigate('reports'),
    },
    {
      title: 'Accounts',
      detail: moneyVisible
        ? m && m.grossProfit < 0
          ? 'Loss this month'
          : 'Gross profit this month'
        : m
          ? 'Owner and admins only'
          : 'Profit and loss and a ledger, with CSV and PDF export',
      problem: moneyVisible && !!m && m.grossProfit < 0,
      value: moneyVisible && m ? formatGBPCompact(m.grossProfit) : undefined,
      onClick: () => onNavigate('accounts'),
    },
  ];

  const moneyOut: IndexLink[] = [
    {
      title: 'Expenses',
      detail: pendingExpenses > 0 ? 'Claims from the team to approve' : 'None awaiting approval',
      value: pendingExpenses > 0 ? `${pendingExpenses} to approve` : undefined,
      onClick: () => onNavigate('expenses'),
    },
    {
      title: 'Purchase orders',
      detail: openOrders > 0 ? 'Open with suppliers' : 'No open orders',
      value: openOrders > 0 ? `${openOrders} open` : undefined,
      onClick: () => onNavigate('procurement'),
    },
    {
      title: 'Price book',
      // The firm price book is the owner's Electrical Hub price book (ELE-1991).
      detail: !priceBook
        ? 'One price list for quotes and orders'
        : priceBook.length === 0
          ? 'No items yet'
          : 'Shared with the Electrical Hub',
      value:
        priceBook && priceBook.length > 0
          ? `${priceBook.length.toLocaleString('en-GB')} ${priceBook.length === 1 ? 'item' : 'items'}`
          : undefined,
      onClick: () => onNavigate('pricebook'),
    },
  ];

  const books: IndexLink[] = [
    {
      title: 'Accounting',
      detail: accountingMeta ?? 'Xero, QuickBooks or Sage, and month-end payroll',
      problem: accountingProblem,
      // By URL: the dashboard's section map sends the word 'accounting' to
      // Accounts, so onNavigate never got here.
      onClick: () => navigate('/employer?section=accounting'),
    },
    {
      title: 'Signatures',
      detail: 'Digital signatures on quotes and certificates',
      onClick: () => onNavigate('signatures'),
    },
  ];

  /* ── Panels ───────────────────────────────────────────────────── */

  const claimsPanel = (
    <section className="flex flex-col">
      <SectionHead
        title="Expenses to approve"
        meta={pendingExpenses > 0 ? `${pendingExpenses}` : undefined}
        action="Expenses"
        onAction={() => onNavigate('expenses')}
      />
      <ListPanel
        className="flex-1"
        items={pendingClaims.slice(0, 5).map((c) => {
          const who = c.employee?.name ?? c.employees?.name ?? 'Team member';
          return {
            key: c.id,
            title: who,
            detail: `${c.category}${c.description ? `, ${c.description}` : ''}`,
            status: moneyVisible ? formatGBPCompact(Number(c.amount) || 0) : 'To approve',
            tone: 'yellow' as const,
            onOpen: () => navigate(`/employer?section=expenses&expense=${c.id}`),
          };
        })}
        empty="No claims waiting. Receipts the team claim for show here for you to approve or send back."
        footer={
          pendingExpenses > 5 ? (
            <button
              type="button"
              onClick={() => onNavigate('expenses')}
              className="text-[13.5px] font-semibold text-elec-yellow touch-manipulation"
            >
              {plural(pendingExpenses - 5, 'more claim')} waiting
            </button>
          ) : undefined
        }
      />
    </section>
  );

  const owedTotal = debtors.data?.totals.owed ?? 0;
  const debtorMore = Math.max(0, topDebtors.length - 5);
  const dueMore = Math.max(0, dueNext.length - 5);

  return (
    <PageFrame className={cn(frameClass, matePad)}>
      <PageHero
        title="Finance"
        description={statusLine}
        actions={
          <HeroActions>
            <HeroPrimary onClick={() => navigate('/employer?section=quotes&new=quote')}>
              New quote
            </HeroPrimary>
            <HeroSecondary onClick={() => onNavigate('quotes')}>Quotes & invoices</HeroSecondary>
            {help}
          </HeroActions>
        }
      />

      <HowItWorks help={FINANCE_HUB_HELP} askContext={{ page: 'financehub' }} />

      {allTime.error && (
        <p className="text-[13px] text-white">
          Money figures didn't load, so they show as a dash rather than £0. Pull to refresh or try
          again shortly.
        </p>
      )}

      <StatCards
        stats={[
          {
            label: 'Owed to you',
            value: moneyVisible ? gbp(s?.outstanding) : (s?.outstandingCount ?? '-'),
            sub: s
              ? s.outstandingCount > 0
                ? moneyVisible
                  ? plural(s.outstandingCount, 'unpaid invoice')
                  : s.outstandingCount === 1
                    ? 'Unpaid invoice'
                    : 'Unpaid invoices'
                : 'Nothing unpaid'
              : undefined,
            onOpen: () => navigate('/employer?section=quotes&tab=invoices'),
          },
          {
            label: 'Overdue',
            value: moneyVisible ? gbp(s?.overdue) : (s?.overdueCount ?? '-'),
            sub: s
              ? s.overdueCount > 0
                ? moneyVisible
                  ? `${plural(s.overdueCount, 'invoice')} past due`
                  : 'Past their due date'
                : 'Nothing late'
              : undefined,
            tone: s && s.overdueCount > 0 ? 'red' : undefined,
            onOpen: moneyVisible
              ? owedView
              : () => navigate('/employer?section=quotes&tab=overdue'),
          },
          paidStat,
          {
            label: 'Open quotes',
            value: moneyVisible ? gbp(s?.openQuoteValue) : (s?.openQuoteCount ?? '-'),
            sub: s
              ? s.openQuoteCount > 0
                ? moneyVisible
                  ? `${plural(s.openQuoteCount, 'quote')} waiting on an answer`
                  : 'Waiting on an answer'
                : 'None waiting'
              : undefined,
            onOpen: () => navigate('/employer?section=quotes&tab=quotes'),
          },
        ]}
      />

      {moneyVisible && (
        <section>
          <SectionHead
            title="Money in and out"
            meta="Last 6 months"
            action="Reports"
            onAction={() => onNavigate('reports')}
          />
          <div className={cn(areaCard, 'overflow-hidden')}>
            {hasChart && (
              <div className="flex flex-wrap gap-x-10 gap-y-3 px-4 pt-4 sm:px-5 sm:pt-5">
                <ChartTotal
                  swatch="bg-elec-yellow"
                  label="Paid in"
                  value={formatGBPCompact(chartIn)}
                />
                <ChartTotal swatch="bg-white" label="Costs" value={formatGBPCompact(chartOut)} />
                <ChartTotal
                  label={chartIn - chartOut < 0 ? 'More out than in' : 'More in than out'}
                  value={formatGBPCompact(Math.abs(chartIn - chartOut))}
                  red={chartIn - chartOut < 0}
                />
              </div>
            )}
            {monthly.isLoading ? (
              <div className="h-[220px]" aria-busy />
            ) : monthly.error || chartData.length === 0 || chartEmpty ? (
              <p className="px-4 py-4 text-[14px] leading-relaxed text-white sm:px-5">
                Nothing paid in or spent in the last 6 months. Each month's money paid in and costs
                show here as invoices are paid and costs come in.
              </p>
            ) : (
              <MoneyChart data={chartData} />
            )}
            {(lowLine || cash.isLoading) && (
              <div className="flex items-center justify-between gap-3 border-t border-white/[0.08] px-4 py-3 sm:px-5">
                <p
                  className={cn(
                    'min-w-0 text-[13.5px] leading-snug',
                    cashProblem ? 'font-semibold text-red-400' : 'text-white'
                  )}
                >
                  {lowLine ?? 'Working out the next 8 weeks'}
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('cashforecast')}
                  className="-my-3 h-11 shrink-0 text-[13.5px] font-semibold text-elec-yellow touch-manipulation hover:underline underline-offset-4"
                >
                  Cash forecast
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {moneyVisible ? (
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <section className="flex flex-col">
            <SectionHead
              title="Who owes most"
              meta={owedTotal > 0 ? `${formatGBPCompact(owedTotal)} owed` : undefined}
              action="Who owes me"
              onAction={owedView}
            />
            <ListPanel
              className="flex-1"
              items={
                debtors.isLoading
                  ? []
                  : topDebtors.slice(0, 5).map((d) => ({
                      key: d.key,
                      title: d.name,
                      detail: `${formatGBPCompact(d.balance)} on ${plural(d.count, 'invoice')}`,
                      status: d.late > 0 ? `${plural(d.late, 'day')} late` : 'Not due yet',
                      tone: d.late > 0 ? ('red' as const) : undefined,
                      onOpen: () =>
                        navigate(`/employer?section=quotes&view=owed&invoice=${d.first}`),
                    }))
              }
              empty={
                debtors.isLoading
                  ? 'Loading who owes you.'
                  : 'Nobody owes you anything. Unpaid invoices show here, biggest first, with how late each one is.'
              }
              footer={
                debtorMore > 0 ? (
                  <button
                    type="button"
                    onClick={owedView}
                    className="text-[13.5px] font-semibold text-elec-yellow touch-manipulation"
                  >
                    {plural(debtorMore, 'more customer')} owing
                  </button>
                ) : undefined
              }
            />
          </section>
          <section className="flex flex-col">
            <SectionHead title="Coming in" meta="Invoices not yet due" />
            <ListPanel
              className="flex-1"
              items={
                debtors.isLoading
                  ? []
                  : dueNext.slice(0, 5).map((r) => ({
                      key: r.invoice_id,
                      date: r.due_on!.slice(0, 10),
                      title: r.company_name || r.client,
                      detail: `${r.invoice_number ? `${r.invoice_number}, ` : ''}${formatGBPCompact(r.balance)} due ${relDays(r.due_on!)}`,
                      status: r.promise_date
                        ? 'Promised'
                        : daysFromToday(r.due_on!) <= 7
                          ? 'This week'
                          : undefined,
                      onOpen: () => navigate(`/employer?section=quotes&invoice=${r.invoice_id}`),
                    }))
              }
              empty={
                debtors.isLoading
                  ? 'Loading what is due in.'
                  : topDebtors.length > 0
                    ? 'Nothing else falling due. Every unpaid invoice is already past its due date.'
                    : 'Nothing due in. Sent invoices show here with the date they fall due.'
              }
              footer={
                dueMore > 0 ? (
                  <button
                    type="button"
                    onClick={owedView}
                    className="text-[13.5px] font-semibold text-elec-yellow touch-manipulation"
                  >
                    {plural(dueMore, 'more invoice')} due later
                  </button>
                ) : undefined
              }
            />
          </section>
        </div>
      ) : (
        claimsPanel
      )}

      {moneyVisible && pendingExpenses > 0 && claimsPanel}

      <section>
        <SectionHead title="Everything in Finance" />
        <PageTiles
          groups={[
            { title: 'Money in', links: moneyIn },
            { title: 'Profit and reports', links: profit },
            { title: 'Money out', links: moneyOut },
            { title: 'Books and sign-off', links: books },
          ]}
        />
      </section>

    </PageFrame>
  );
}

/* ── Chart parts (local: the template has no chart) ────────────────── */

function ChartTotal({
  swatch,
  label,
  value,
  red,
}: {
  swatch?: string;
  label: string;
  value: string;
  red?: boolean;
}) {
  return (
    <div className="min-w-0">
      <span className="flex items-center gap-2 text-[13px] font-medium text-white">
        {swatch && <span className={cn('h-2.5 w-2.5 rounded-[3px]', swatch)} />}
        {label}
      </span>
      <span
        className={cn(
          'mt-1 block text-[22px] font-semibold leading-none tracking-tight tabular-nums',
          red ? 'text-red-400' : 'text-white'
        )}
      >
        {value}
      </span>
    </div>
  );
}

interface ChartRow {
  key: string;
  label: string;
  long: string;
  paidIn: number;
  costs: number;
}

function ChartTip({ active, payload }: { active?: boolean; payload?: { payload: ChartRow }[] }) {
  const row = active && payload?.[0]?.payload;
  if (!row) return null;
  const net = row.paidIn - row.costs;
  return (
    <div className="min-w-[170px] rounded-xl border border-white/[0.12] bg-[hsl(0_0%_11%)] px-3.5 py-3 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.8)]">
      <p className="text-[12.5px] font-semibold text-white">{row.long}</p>
      <div className="mt-2 space-y-1 text-[12.5px] tabular-nums text-white">
        <p className="flex justify-between gap-4">
          <span>Paid in</span>
          <span>{formatGBPCompact(row.paidIn)}</span>
        </p>
        <p className="flex justify-between gap-4">
          <span>Costs</span>
          <span>{formatGBPCompact(row.costs)}</span>
        </p>
        <p className={cn('flex justify-between gap-4 border-t border-white/[0.1] pt-1 font-semibold', net < 0 && 'text-red-400')}>
          <span>{net >= 0 ? 'More in' : 'More out'}</span>
          <span>{formatGBPCompact(Math.abs(net))}</span>
        </p>
      </div>
    </div>
  );
}

/**
 * Six months, paid in (yellow) beside costs (white): rounded bars sitting in
 * pairs, faint dashed gridlines, a small stub for a month with nothing so every
 * month is visibly there. Solid colour only: a faded yellow reads as brown.
 */
function MoneyChart({ data }: { data: ChartRow[] }) {
  return (
    <div className="h-[240px] px-1 pb-2 pt-5 sm:h-[280px] sm:px-3">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barGap={4} barCategoryGap="28%">
          <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.07)" strokeDasharray="3 4" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={chartTick} tickMargin={10} />
          <YAxis width={52} tickLine={false} axisLine={false} tick={chartTick} tickCount={5} tickFormatter={moneyTick} />
          <Tooltip content={<ChartTip />} cursor={{ fill: 'rgba(255,255,255,0.05)', radius: 8 }} />
          <Bar dataKey="paidIn" name="Paid in" radius={[6, 6, 0, 0]} maxBarSize={34} minPointSize={3} isAnimationActive={false}>
            {data.map((d) => (
              <Cell key={d.key} fill={YELLOW_HEX} />
            ))}
          </Bar>
          <Bar dataKey="costs" name="Costs" radius={[6, 6, 0, 0]} maxBarSize={34} minPointSize={3} isAnimationActive={false}>
            {data.map((d) => (
              <Cell key={d.key} fill={WHITE_HEX} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
