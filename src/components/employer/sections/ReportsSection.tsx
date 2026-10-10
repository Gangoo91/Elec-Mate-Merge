import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useBusinessMetrics, useJobsByStatus, useTopPerformers } from '@/hooks/useBusinessMetrics';
import { fetchTeamHeldCredentialRows } from '@/services/credentialsService';
import { useExpensesByCategory, useExpensePipeline } from '@/hooks/useFinanceReports';
import {
  useFinanceMonthly,
  useFinanceSummary,
  useJobFinanceList,
  FINANCE_MODEL_KEY,
} from '@/hooks/useFinanceModel';
import { useInvoices } from '@/hooks/useFinance';
import { useFirmDebtors } from '@/hooks/useGetPaid';
import { MarginBreakdownCard } from '@/components/employer/jobs/MarginBreakdownCard';
import {
  FINANCE_LABELS,
  FINANCE_PERIODS,
  financePeriod,
  formatGBP,
  formatGBPCompact,
  formatMargin,
  invoiceBalance,
  moneyState,
  todayUk,
  type FinancePeriodKey,
} from '@/lib/financeDefinitions';
import { exportPnlCsv } from '@/utils/accountsExport';
import { PageHelpButton, HowItWorks } from '@/components/hub/PageHelp';
import { REPORTS_HELP } from '@/components/employer/help/finance-ops';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts';
import { PageHero, LoadingBlocks } from '@/components/employer/editorial';
import {
  PageColumn,
  TwoColumn,
  FigureStrip,
  Segments,
  HeroActions,
  HeroPrimary,
  RefreshIcon,
  Rows,
  Row,
  StatusPill,
  PlainEmpty,
  panel,
  PanelTitle,
  type PillTone,
} from '@/components/employer/pageParts/PageParts';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const ELEC_YELLOW = 'hsl(var(--elec-yellow))';
const WHITE_20 = 'rgba(255,255,255,0.2)';
const WHITE_06 = 'rgba(255,255,255,0.06)';

const tooltipStyle = {
  backgroundColor: 'hsl(0 0% 10%)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '12px',
  color: '#ffffff',
  fontSize: '12px',
};

const axisTick = { fill: '#ffffff', fontSize: 11 };

/**
 * The team's held credentials counted once, so the panel's figure and its
 * donut can't disagree (the old meta read a different query and fell back
 * to 0% while the donut said 100%). No credentials means no percentage.
 */
function useTeamCredentialHealth() {
  return useQuery({
    queryKey: ['reports-team-credential-health'],
    queryFn: async () => {
      const { data, error } = await fetchTeamHeldCredentialRows();
      if (error) throw error;
      const now = Date.now();
      const in30 = now + 30 * 86400000;
      let valid = 0;
      let expiring = 0;
      let expired = 0;
      for (const c of data ?? []) {
        const exp = c.expiry_date ? new Date(c.expiry_date).getTime() : null;
        if (c.status === 'Expired' || (exp != null && exp < now)) expired++;
        else if (exp != null && exp < in30) expiring++;
        else valid++;
      }
      return { valid, expiring, expired, total: valid + expiring + expired };
    },
  });
}

const pct = (n: number, total: number) => (total ? Math.round((n / total) * 100) : 0);

/**
 * Reports — every money figure comes from the shared finance model
 * (get_finance_summary / get_finance_monthly / get_job_finance), the same
 * calls Accounts and Job financials use, so the pages agree for a period.
 */
export function ReportsSection() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [periodKey, setPeriodKey] = useState<FinancePeriodKey>('this_year');
  const period = useMemo(() => financePeriod(periodKey), [periodKey]);

  const summaryQuery = useFinanceSummary(period.from, period.to);
  const monthlyQuery = useFinanceMonthly(6);
  const jobsQuery = useJobFinanceList();
  const invoicesQuery = useInvoices();

  const { data: metrics } = useBusinessMetrics();
  const { data: jobsByStatus = [] } = useJobsByStatus();
  const { data: credHealth } = useTeamCredentialHealth();
  const credTotal = credHealth?.total ?? 0;
  const complianceData = credHealth
    ? [
        { name: 'Valid', value: pct(credHealth.valid, credTotal) },
        { name: 'Expiring', value: pct(credHealth.expiring, credTotal) },
        { name: 'Expired', value: pct(credHealth.expired, credTotal) },
      ]
    : [];
  const { data: topPerformers = [] } = useTopPerformers();
  const { data: expensesByCategory = [] } = useExpensesByCategory(period.from, period.to);
  const { data: expensePipeline } = useExpensePipeline();

  const summary = summaryQuery.data;
  // Office managers (ELE-1831) get invoice-side figures only; the server
  // returns costs/profit as null for them, so those blocks are hidden.
  const showMoney = summary?.moneyVisible ?? true;
  // en-GB short months print "Sept"; the rest of the app writes "Sep".
  const monthly = useMemo(
    () => (monthlyQuery.data ?? []).map((m) => ({ ...m, label: m.label.replace('Sept', 'Sep') })),
    [monthlyQuery.data]
  );
  const moneyError = summaryQuery.error || monthlyQuery.error || jobsQuery.error;

  const refresh = () => {
    [
      FINANCE_MODEL_KEY,
      ['invoices'],
      ['business-metrics'],
      ['jobs-by-status'],
      ['compliance-data'],
      ['top-performers'],
      ['finance-reports'],
    ].forEach((queryKey) => queryClient.invalidateQueries({ queryKey: [...queryKey] }));
    toast({ title: 'Refreshing reports', description: 'Pulling the latest figures.' });
  };

  const exportCsv = () => {
    if (!summary || !summary.moneyVisible) return;
    exportPnlCsv(summary, period);
    toast({
      title: 'CSV exported',
      description: `${period.label} profit and loss has downloaded.`,
    });
  };

  // Gap §4.8: debtor aging uses Get paid's buckets (get_firm_debtors), so the
  // two screens never disagree. Owners and admins read the RPC itself; office
  // managers (who can't call it) get the same rule worked out here: days late
  // come from the due date only, never the status, so an "overdue" invoice
  // with a future due date is not yet due, exactly as in Get paid.
  const debtorsQuery = useFirmDebtors(showMoney);
  const debtorRows = useMemo(() => {
    const today = todayUk();
    const DAY = 86400000;
    const rows: { client: string | null; balance: number; days: number }[] =
      showMoney && debtorsQuery.data
        ? debtorsQuery.data.rows.map((r) => ({
            client: r.client,
            balance: r.balance,
            days: r.days_overdue,
          }))
        : (invoicesQuery.data ?? [])
            .filter((inv) => ['sent', 'overdue'].includes(moneyState(inv)))
            .map((inv) => {
              const due = inv.due_date ? inv.due_date.slice(0, 10) : null;
              return {
                client: inv.client,
                balance: invoiceBalance({
                  status: inv.status,
                  paid_date: inv.paid_date,
                  due_date: inv.due_date,
                  amount: inv.amount,
                  total_paid: (inv as { total_paid?: number | null }).total_paid,
                }),
                days:
                  due && due < today
                    ? Math.round(
                        (new Date(`${today}T12:00:00Z`).getTime() -
                          new Date(`${due}T12:00:00Z`).getTime()) /
                          DAY
                      )
                    : 0,
              };
            })
            .filter((r) => r.balance > 0);
    const buckets = [
      { label: 'Not yet due', test: (d: number) => d === 0 },
      { label: '1 to 30 days overdue', test: (d: number) => d >= 1 && d <= 30 },
      { label: '31 to 60 days overdue', test: (d: number) => d >= 31 && d <= 60 },
      { label: '61 to 90 days overdue', test: (d: number) => d >= 61 && d <= 90 },
      { label: 'Over 90 days overdue', test: (d: number) => d > 90 },
    ];
    return buckets.map((b) => {
      const inBucket = rows.filter((r) => b.test(r.days));
      const clients = [...new Set(inBucket.map((r) => r.client).filter(Boolean))];
      return {
        label: b.label,
        clients:
          clients.length > 0
            ? clients.slice(0, 3).join(', ') + (clients.length > 3 ? ` +${clients.length - 3}` : '')
            : '—',
        amount: inBucket.reduce((s, r) => s + r.balance, 0),
        late: b.label !== 'Not yet due',
      };
    });
  }, [invoicesQuery.data, debtorsQuery.data, showMoney]);
  const debtorTotal = debtorRows.reduce((s, r) => s + r.amount, 0);

  const jobRows = useMemo(
    () =>
      (jobsQuery.data ?? [])
        .filter((j) => j.invoiced > 0 || j.totalCosts > 0)
        .sort((a, b) => b.grossProfit - a.grossProfit)
        .slice(0, 10),
    [jobsQuery.data]
  );

  const expenseColours = [
    '#facc15',
    'rgba(255,255,255,0.85)',
    'rgba(255,255,255,0.55)',
    'rgba(255,255,255,0.35)',
    'rgba(255,255,255,0.22)',
    'rgba(255,255,255,0.12)',
  ];

  const statusLine =
    !summary || moneyError
      ? 'Invoiced, costs and gross profit for a period, the same figures as Accounts and Job financials.'
      : showMoney
        ? `${period.label}: ${formatGBPCompact(summary.invoiced)} invoiced, ${
            summary.grossProfit < 0
              ? `${formatGBPCompact(Math.abs(summary.grossProfit))} loss`
              : `${formatGBPCompact(summary.grossProfit)} gross profit`
          }${summary.marginPct !== null ? `, ${formatMargin(summary.marginPct)} margin` : ''}.`
        : `${period.label}: ${formatGBPCompact(summary.invoiced)} invoiced, ${formatGBPCompact(summary.paidIn)} paid in.`;

  const hero = (
    <PageHero
      title="Reports"
      description={statusLine}
      actions={
        <HeroActions>
          <HeroPrimary
            data-help="reports.export"
            onClick={exportCsv}
            disabled={!summary || !showMoney}
          >
            Export CSV
          </HeroPrimary>
          <RefreshIcon onClick={refresh} />
          <PageHelpButton help={REPORTS_HELP} askContext={{ page: 'reports', tab: periodKey }} />
        </HeroActions>
      }
    />
  );

  const chartBox = 'h-64 w-full px-2 py-4 sm:px-4';

  const moneyCharts = summary && (
    <>
      <section>
        <PanelTitle title="Invoiced and paid in" meta="Last 6 months" />
        <div className={cn(panel, 'overflow-hidden')}>
          {monthly.some((m) => m.invoiced > 0 || m.paidIn > 0) ? (
            <div className={chartBox}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthly} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid stroke={WHITE_06} vertical={false} />
                  <XAxis
                    dataKey="label"
                    tick={axisTick}
                    axisLine={{ stroke: WHITE_20 }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={axisTick}
                    axisLine={{ stroke: WHITE_20 }}
                    tickLine={false}
                    tickFormatter={(v: number) => formatGBPCompact(v)}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                    formatter={(v: number) => formatGBP(v)}
                  />
                  <Legend wrapperStyle={{ color: '#ffffff', fontSize: 12 }} />
                  <Bar
                    dataKey="invoiced"
                    name="Invoiced"
                    fill={ELEC_YELLOW}
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="paidIn"
                    name="Cash in"
                    fill="rgba(255,255,255,0.7)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <PlainEmpty
              bare
              text="No invoices in the last 6 months. Sent and paid invoices show here month by month."
            />
          )}
        </div>
      </section>

      {showMoney && (
        <section>
          <PanelTitle title="Invoiced and costs" meta="Gross profit by month" />
          <div className={cn(panel, 'overflow-hidden')}>
            {monthly.some((m) => m.invoiced > 0 || m.totalCosts > 0) ? (
              <div className={chartBox}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthly} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={ELEC_YELLOW} stopOpacity={0.45} />
                        <stop offset="100%" stopColor={ELEC_YELLOW} stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke={WHITE_06} vertical={false} />
                    <XAxis
                      dataKey="label"
                      tick={axisTick}
                      axisLine={{ stroke: WHITE_20 }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={axisTick}
                      axisLine={{ stroke: WHITE_20 }}
                      tickLine={false}
                      tickFormatter={(v: number) => formatGBPCompact(v)}
                    />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      cursor={{ stroke: WHITE_20 }}
                      formatter={(v: number) => formatGBP(v)}
                    />
                    <Legend wrapperStyle={{ color: '#ffffff', fontSize: 12 }} />
                    <Area
                      type="monotone"
                      dataKey="invoiced"
                      name="Invoiced"
                      stroke={ELEC_YELLOW}
                      strokeWidth={2}
                      fill="url(#revGrad)"
                    />
                    <Area
                      type="monotone"
                      dataKey="totalCosts"
                      name="Costs"
                      stroke="#ffffff"
                      strokeOpacity={0.7}
                      strokeWidth={2}
                      fill="url(#costGrad)"
                    />
                    <Area
                      type="monotone"
                      dataKey="grossProfit"
                      name="Gross profit"
                      stroke={ELEC_YELLOW}
                      strokeOpacity={0.6}
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                      fill="none"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <PlainEmpty bare text="Nothing invoiced or spent yet." />
            )}
          </div>
        </section>
      )}
    </>
  );

  const moneyJobs = summary && (
    <>
      {showMoney && (
        <section data-help="reports.jobs">
          <PanelTitle
            title="Job profitability"
            meta={jobRows.length ? `Top ${jobRows.length}` : undefined}
          />
          <div className={cn(panel, 'overflow-hidden')}>
            {jobRows.length > 0 ? (
              <Rows>
                {jobRows.map((job) => (
                  <Row
                    chevron={false}
                    key={job.jobId}
                    title={job.title}
                    detail={
                      job.invoiced > 0
                        ? `${formatGBP(job.invoiced)} invoiced · ${formatGBP(job.totalCosts)} costs`
                        : `Not invoiced yet · ${formatGBP(job.totalCosts)} costs`
                    }
                    amount={
                      <span className={job.grossProfit < 0 ? 'text-red-400' : undefined}>
                        {formatGBPCompact(job.grossProfit)}
                      </span>
                    }
                    status={
                      job.marginPct === null ? undefined : (
                        <StatusPill tone={marginTone(job.marginPct)}>
                          {formatMargin(job.marginPct)}
                        </StatusPill>
                      )
                    }
                    onClick={() => navigate(`/employer?section=financials&job=${job.jobId}`)}
                  />
                ))}
              </Rows>
            ) : (
              <PlainEmpty
                bare
                text="No job money yet. Link invoices, timesheets, purchase orders or expenses to a job to see its profit."
              />
            )}
          </div>
        </section>
      )}

      {showMoney && (
        <MarginBreakdownCard from={period.from} to={period.to} periodLabel={period.label} />
      )}
    </>
  );

  const moneySide = summary && (
    <>
      {showMoney && (
        <section data-help="reports.pnl">
          <PanelTitle
            title="Profit and loss"
            meta={period.label}
            action="Accounts"
            onAction={() => navigate('/employer?section=accounts')}
          />
          <div className={cn(panel, 'overflow-hidden')}>
            <Rows>
              <Row
                title="Invoiced"
                detail={FINANCE_LABELS.invoicedHint}
                amount={formatGBP(summary.invoiced)}
              />
              <Row title="Materials" amount={formatGBP(summary.materials)} />
              {summary.supplierInvoices !== 0 && (
                <Row title="Supplier invoices" amount={formatGBP(summary.supplierInvoices)} />
              )}
              <Row title="Expenses" amount={formatGBP(summary.expenses)} />
              <Row
                title="Labour"
                detail="Approved timesheets, overtime included"
                amount={formatGBP(summary.labour)}
              />
              {summary.otherCosts !== 0 && (
                <Row title="Other job costs" amount={formatGBP(summary.otherCosts)} />
              )}
              <Row
                chevron={false}
                title="Gross profit"
                detail={
                  summary.marginPct === null
                    ? 'No margin until something is invoiced'
                    : `${formatMargin(summary.marginPct)} margin`
                }
                amount={
                  <span className={summary.grossProfit < 0 ? 'text-red-400' : undefined}>
                    {formatGBP(summary.grossProfit)}
                  </span>
                }
                onClick={() => navigate('/employer?section=accounts')}
              />
            </Rows>
          </div>
        </section>
      )}

      <section data-help="reports.debtors">
        <PanelTitle
          title="Debtor aging"
          meta={debtorTotal > 0 ? `${formatGBPCompact(debtorTotal)} owed` : undefined}
        />
        <div className={cn(panel, 'overflow-hidden')}>
          {debtorTotal <= 0 ? (
            <PlainEmpty
              bare
              text="Nobody owes you anything. Unpaid invoices show here by how late they are."
            />
          ) : (
            <Rows>
              {debtorRows.map((row) => (
                <Row
                  chevron={false}
                  key={row.label}
                  title={row.label}
                  detail={row.clients}
                  amount={
                    <span className={row.late && row.amount > 0 ? 'text-red-400' : undefined}>
                      {formatGBP(row.amount)}
                    </span>
                  }
                  onClick={
                    row.amount > 0
                      ? () =>
                          navigate(
                            showMoney
                              ? '/employer?section=quotes&view=owed'
                              : '/employer?section=quotes&tab=overdue'
                          )
                      : undefined
                  }
                />
              ))}
            </Rows>
          )}
        </div>
      </section>
    </>
  );

  const expensesSide = showMoney && (
    <>
      <section>
        <PanelTitle title="Expense claims waiting" />
        <div className={cn(panel, 'overflow-hidden')}>
          <Rows>
            <Row
              chevron={false}
              title="Awaiting approval"
              detail="Not a cost until approved"
              amount={formatGBP(expensePipeline?.pendingAmount ?? 0)}
              status={
                (expensePipeline?.pendingCount ?? 0) > 0 ? (
                  <StatusPill tone="volt">{expensePipeline?.pendingCount} to approve</StatusPill>
                ) : undefined
              }
              onClick={() => navigate('/employer?section=expenses')}
            />
            <Row
              title="Approved, not reimbursed"
              detail="Already in costs"
              amount={formatGBP(expensePipeline?.approvedUnpaid ?? 0)}
            />
          </Rows>
        </div>
      </section>

      <section>
        <PanelTitle title="Expenses by category" meta={period.label} />
        <div className={cn(panel, 'overflow-hidden')}>
          {expensesByCategory.some((d) => d.total > 0) ? (
            <div className="px-4 py-4 sm:px-5">
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expensesByCategory.map((c) => ({ name: c.category, value: c.total }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={
                        expensesByCategory.filter((c) => c.total > 0).length > 1 ? 2 : 0
                      }
                      dataKey="value"
                      stroke="hsl(0 0% 12%)"
                      strokeWidth={expensesByCategory.filter((c) => c.total > 0).length > 1 ? 2 : 0}
                    >
                      {expensesByCategory.map((_e, i) => (
                        <Cell key={`cell-${i}`} fill={expenseColours[i % expenseColours.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => formatGBP(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/[0.07] pt-3">
                {expensesByCategory.map((item, idx) => (
                  <div key={item.category} className="flex items-center gap-2">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: expenseColours[idx % expenseColours.length] }}
                    />
                    <span className="text-[12.5px] text-white">
                      {item.category} {formatGBPCompact(item.total)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <PlainEmpty bare text="No approved expenses in this period." />
          )}
        </div>
      </section>
    </>
  );

  const teamMain = (
    <section>
      <PanelTitle
        title="Busiest team members"
        meta={topPerformers.length ? `${topPerformers.length}` : undefined}
      />
      <div className={cn(panel, 'overflow-hidden')}>
        {topPerformers.length > 0 ? (
          <Rows>
            {topPerformers.map((performer) => (
              <Row
                key={performer.name}
                title={performer.name}
                detail={`${performer.jobs} job${performer.jobs === 1 ? '' : 's'} assigned${showMoney ? ' · combined job value' : ''}`}
                amount={showMoney ? formatGBPCompact(performer.revenue) : undefined}
              />
            ))}
          </Rows>
        ) : (
          <PlainEmpty bare text="No job assignments tracked yet." />
        )}
      </div>
    </section>
  );

  const opsSide = (
    <>
      <section>
        <PanelTitle
          title="Jobs by status"
          meta={`${metrics?.totalJobs ?? jobsByStatus.reduce((acc, j) => acc + j.count, 0)} total`}
        />
        <div className={cn(panel, 'overflow-hidden')}>
          {jobsByStatus.length > 0 ? (
            <div className="space-y-4 px-4 py-4 sm:px-5">
              {jobsByStatus.map((item) => (
                <div key={item.status} className="space-y-1.5">
                  <div className="flex items-center justify-between text-[14px]">
                    <span className="font-medium text-white">{item.status}</span>
                    <span className="tabular-nums text-white">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
                    <div
                      className="h-full rounded-full bg-elec-yellow"
                      style={{ width: `${Math.min(item.percentage, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <PlainEmpty bare text="No jobs tracked yet." />
          )}
        </div>
      </section>

      <section>
        <PanelTitle
          title="Compliance"
          meta={
            credTotal
              ? `${complianceData[0].value}% of ${credTotal} credential${credTotal === 1 ? '' : 's'} valid`
              : undefined
          }
        />
        <div className={cn(panel, 'overflow-hidden')}>
          {credTotal > 0 ? (
            <div className="px-4 py-4 sm:px-5">
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={complianceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={complianceData.filter((d) => d.value > 0).length > 1 ? 2 : 0}
                      dataKey="value"
                      stroke="hsl(0 0% 12%)"
                      strokeWidth={complianceData.filter((d) => d.value > 0).length > 1 ? 2 : 0}
                    >
                      {complianceData.map((_entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            index === 0 ? ELEC_YELLOW : `rgba(255,255,255,${0.7 - index * 0.18})`
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}%`, '']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/[0.07] pt-3">
                {complianceData.map((item, idx) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{
                        background:
                          idx === 0 ? ELEC_YELLOW : `rgba(255,255,255,${0.7 - idx * 0.18})`,
                      }}
                    />
                    <span className="text-[12.5px] text-white">
                      {item.name} {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <PlainEmpty bare text="No certifications tracked yet." />
          )}
        </div>
      </section>
    </>
  );

  return (
    <PageColumn>
      {hero}
      <HowItWorks help={REPORTS_HELP} askContext={{ page: 'reports', tab: periodKey }} />

      <div data-help="reports.periods">
        <Segments
          items={FINANCE_PERIODS}
          value={periodKey}
          onChange={(v) => setPeriodKey(v as FinancePeriodKey)}
        />
      </div>

      {moneyError ? (
        <div className={panel}>
          <PlainEmpty
            bare
            text={`Your figures didn't load, so nothing is shown rather than a misleading £0. ${
              moneyError instanceof Error ? moneyError.message : ''
            }`}
            action="Try again"
            onAction={refresh}
          />
        </div>
      ) : summaryQuery.isLoading || !summary ? (
        <LoadingBlocks />
      ) : (
        <>
          {showMoney ? (
            <FigureStrip
              figures={[
                {
                  label: FINANCE_LABELS.invoiced,
                  value: formatGBPCompact(summary.invoiced),
                  sub: `${summary.invoiceCount} invoices, drafts excluded`,
                },
                {
                  label: FINANCE_LABELS.grossProfit,
                  value: formatGBPCompact(summary.grossProfit),
                  sub: `Costs ${formatGBPCompact(summary.totalCosts)}`,
                  tone: summary.grossProfit < 0 ? 'red' : undefined,
                },
                {
                  label: FINANCE_LABELS.margin,
                  value: formatMargin(summary.marginPct),
                  sub: 'Gross profit ÷ invoiced',
                },
                {
                  label: FINANCE_LABELS.paidIn,
                  value: formatGBPCompact(summary.paidIn),
                  sub: 'Invoices paid in the period',
                },
              ]}
            />
          ) : (
            <>
              <FigureStrip
                figures={[
                  { label: FINANCE_LABELS.invoiced, value: formatGBPCompact(summary.invoiced) },
                  { label: FINANCE_LABELS.paidIn, value: formatGBPCompact(summary.paidIn) },
                  {
                    label: FINANCE_LABELS.outstanding,
                    value: formatGBPCompact(summary.outstanding),
                  },
                  {
                    label: FINANCE_LABELS.overdue,
                    value: formatGBPCompact(summary.overdue),
                    tone: summary.overdue > 0 ? 'red' : undefined,
                  },
                ]}
              />
              <p className="text-[13px] text-white">
                Costs, labour and profit are for the owner and admins.
              </p>
            </>
          )}

          <TwoColumn
            main={
              <>
                {moneySide}
                {moneyJobs}
                {teamMain}
              </>
            }
            side={
              <>
                {moneyCharts}
                {expensesSide}
                {opsSide}
              </>
            }
          />
        </>
      )}

      {(moneyError || summaryQuery.isLoading || !summary) && (
        <TwoColumn
          main={teamMain}
          side={
            <>
              {expensesSide}
              {opsSide}
            </>
          }
        />
      )}
    </PageColumn>
  );
}

const marginTone = (pct: number | null): PillTone =>
  pct === null ? 'neutral' : pct >= 20 ? 'green' : pct < 10 ? 'red' : 'neutral';
