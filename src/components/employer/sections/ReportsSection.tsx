import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import {
  useBusinessMetrics,
  useJobsByStatus,
  useComplianceData,
  useTopPerformers,
} from '@/hooks/useBusinessMetrics';
import { useExpensesByCategory, useExpensePipeline } from '@/hooks/useFinanceReports';
import {
  useFinanceMonthly,
  useFinanceSummary,
  useJobFinanceList,
  FINANCE_MODEL_KEY,
} from '@/hooks/useFinanceModel';
import { useInvoices } from '@/hooks/useFinance';
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
import {
  PageFrame,
  PageHero,
  StatStrip,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  FilterBar,
  IconButton,
  EmptyState,
  LoadingBlocks,
  Pill,
  PrimaryButton,
} from '@/components/employer/editorial';
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
  const { data: complianceData = [] } = useComplianceData();
  const { data: topPerformers = [] } = useTopPerformers();
  const { data: expensesByCategory = [] } = useExpensesByCategory(period.from, period.to);
  const { data: expensePipeline } = useExpensePipeline();

  const summary = summaryQuery.data;
  // Office managers (ELE-1831) get invoice-side figures only; the server
  // returns costs/profit as null for them, so those blocks are hidden.
  const showMoney = summary?.moneyVisible ?? true;
  const monthly = useMemo(() => monthlyQuery.data ?? [], [monthlyQuery.data]);
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
    toast({ title: 'CSV exported', description: `${period.label} profit and loss has downloaded.` });
  };

  // Debtor aging over the invoices that make up Outstanding (sent + overdue,
  // unpaid balance) — so the buckets add up to the Outstanding figure.
  const debtorRows = useMemo(() => {
    const today = new Date(`${todayUk()}T12:00:00`).getTime();
    const open = (invoicesQuery.data ?? [])
      .map((inv) => ({
        client: inv.client,
        balance: invoiceBalance({
          status: inv.status,
          paid_date: inv.paid_date,
          due_date: inv.due_date,
          amount: inv.amount,
          total_paid: (inv as { total_paid?: number | null }).total_paid,
        }),
        overdueDays:
          moneyState(inv) === 'overdue' && inv.due_date
            ? Math.max(
                1,
                Math.floor((today - new Date(`${inv.due_date.slice(0, 10)}T12:00:00`).getTime()) / 86400000)
              )
            : 0,
      }))
      .filter((r) => r.balance > 0);
    const buckets = [
      { label: 'Not yet due', test: (d: number) => d === 0, tone: 'emerald' as const },
      { label: '1–30 days overdue', test: (d: number) => d >= 1 && d <= 30, tone: 'amber' as const },
      { label: '31–60 days overdue', test: (d: number) => d >= 31 && d <= 60, tone: 'orange' as const },
      { label: '61+ days overdue', test: (d: number) => d >= 61, tone: 'red' as const },
    ];
    return buckets.map((b) => {
      const rows = open.filter((r) => b.test(r.overdueDays));
      const clients = [...new Set(rows.map((r) => r.client).filter(Boolean))];
      return {
        label: b.label,
        clients:
          clients.length > 0
            ? clients.slice(0, 3).join(', ') + (clients.length > 3 ? ` +${clients.length - 3}` : '')
            : '—',
        amount: rows.reduce((s, r) => s + r.balance, 0),
        tone: b.tone,
      };
    });
  }, [invoicesQuery.data]);

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

  const hero = (
    <PageHero
      eyebrow="Money"
      title="Reports"
      description="Invoiced, costs and gross profit for a period. The same figures as Accounts and Job financials."
      tone="blue"
      actions={
        <>
          <PrimaryButton data-help="reports.export" onClick={exportCsv} disabled={!summary || !showMoney}>
            Export CSV
          </PrimaryButton>
          <IconButton onClick={refresh} aria-label="Refresh reports">
            <RefreshCw className="h-4 w-4" />
          </IconButton>
          <PageHelpButton help={REPORTS_HELP} askContext={{ page: 'reports', tab: periodKey }} />
        </>
      }
    />
  );

  return (
    <PageFrame>
      {hero}
      <HowItWorks help={REPORTS_HELP} askContext={{ page: 'reports', tab: periodKey }} />

      <div data-help="reports.periods">
        <FilterBar
          tabs={FINANCE_PERIODS}
          activeTab={periodKey}
          onTabChange={(v) => setPeriodKey(v as FinancePeriodKey)}
        />
      </div>

      {moneyError ? (
        <EmptyState
          title="Couldn't load your figures"
          description={`Nothing is shown rather than a misleading £0. ${
            moneyError instanceof Error ? moneyError.message : ''
          }`}
          action="Try again"
          onAction={refresh}
        />
      ) : summaryQuery.isLoading || !summary ? (
        <LoadingBlocks />
      ) : (
        <>
          {showMoney && (
          <StatStrip
            columns={4}
            stats={[
              {
                label: FINANCE_LABELS.invoiced,
                value: formatGBPCompact(summary.invoiced),
                sub: `${summary.invoiceCount} invoices · drafts excluded`,
                tone: 'blue',
              },
              {
                label: `${FINANCE_LABELS.grossProfit} · invoiced less costs`,
                value: formatGBPCompact(summary.grossProfit),
                sub: `Costs ${formatGBPCompact(summary.totalCosts)}`,
                accent: true,
                tone: summary.grossProfit >= 0 ? 'emerald' : 'red',
              },
              {
                label: FINANCE_LABELS.margin,
                value: formatMargin(summary.marginPct),
                sub: 'Gross profit ÷ invoiced',
                tone: 'emerald',
              },
              {
                label: FINANCE_LABELS.paidIn,
                value: formatGBPCompact(summary.paidIn),
                sub: 'Invoices paid in the period',
                tone: 'cyan',
              },
            ]}
          />
          )}
          {!showMoney && (
            <StatStrip
              columns={4}
              stats={[
                { label: FINANCE_LABELS.invoiced, value: formatGBPCompact(summary.invoiced), tone: 'blue' },
                { label: FINANCE_LABELS.paidIn, value: formatGBPCompact(summary.paidIn), tone: 'cyan' },
                { label: FINANCE_LABELS.outstanding, value: formatGBPCompact(summary.outstanding), tone: 'amber' },
                { label: FINANCE_LABELS.overdue, value: formatGBPCompact(summary.overdue), tone: 'red' },
              ]}
            />
          )}
          {!showMoney && (
            <p className="text-[12.5px] text-white">
              Costs, labour and profit are for the owner and admins.
            </p>
          )}

          <ListCard>
            <ListCardHeader
              tone="blue"
              title="Invoiced and cash in"
              meta={<Pill tone="yellow">Last 6 months</Pill>}
            />
            <div className="p-4 sm:p-5">
              <div className="h-64 w-full">
                {monthly.some((m) => m.invoiced > 0 || m.paidIn > 0) ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthly} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid stroke={WHITE_06} vertical={false} />
                      <XAxis dataKey="label" tick={axisTick} axisLine={{ stroke: WHITE_20 }} tickLine={false} />
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
                      <Bar dataKey="invoiced" name="Invoiced" fill={ELEC_YELLOW} radius={[6, 6, 0, 0]} />
                      <Bar dataKey="paidIn" name="Cash in" fill="rgba(255,255,255,0.7)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <EmptyState
                    title="No invoices in the last 6 months"
                    description="Sent and paid invoices appear here month by month."
                  />
                )}
              </div>
            </div>
          </ListCard>

          {showMoney && (
          <ListCard>
            <ListCardHeader
              tone="emerald"
              title="Invoiced vs costs"
              meta={<Pill tone="emerald">Gross profit by month</Pill>}
            />
            <div className="p-4 sm:p-5">
              <div className="h-64 w-full">
                {monthly.some((m) => m.invoiced > 0 || m.totalCosts > 0) ? (
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
                      <XAxis dataKey="label" tick={axisTick} axisLine={{ stroke: WHITE_20 }} tickLine={false} />
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
                      <Area type="monotone" dataKey="invoiced" name="Invoiced" stroke={ELEC_YELLOW} strokeWidth={2} fill="url(#revGrad)" />
                      <Area type="monotone" dataKey="totalCosts" name="Costs" stroke="#ffffff" strokeOpacity={0.7} strokeWidth={2} fill="url(#costGrad)" />
                      <Area type="monotone" dataKey="grossProfit" name="Gross profit" stroke={ELEC_YELLOW} strokeOpacity={0.6} strokeWidth={1.5} strokeDasharray="4 4" fill="none" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <EmptyState title="Nothing invoiced or spent yet" />
                )}
              </div>
            </div>
          </ListCard>
          )}

          {showMoney && (
          <div data-help="reports.pnl">
          <ListCard>
            <ListCardHeader tone="emerald" title="Profit & loss" meta={<Pill tone="blue">{period.label}</Pill>} />
            <ListBody>
              <ListRow title="Invoiced" subtitle={FINANCE_LABELS.invoicedHint} trailing={formatGBP(summary.invoiced)} />
              <ListRow title="Materials" trailing={formatGBP(summary.materials)} />
              {summary.supplierInvoices !== 0 && (
                <ListRow title="Supplier invoices" trailing={formatGBP(summary.supplierInvoices)} />
              )}
              <ListRow title="Expenses" trailing={formatGBP(summary.expenses)} />
              <ListRow title="Labour" subtitle="Approved timesheets, overtime included" trailing={formatGBP(summary.labour)} />
              {summary.otherCosts !== 0 && <ListRow title="Other job costs" trailing={formatGBP(summary.otherCosts)} />}
              <ListRow
                title="Gross profit"
                subtitle={summary.marginPct === null ? 'Invoiced less costs · no margin until something is invoiced' : `Invoiced less costs · ${formatMargin(summary.marginPct)} margin`}
                trailing={<Pill tone={summary.grossProfit >= 0 ? 'emerald' : 'red'}>{formatGBP(summary.grossProfit)}</Pill>}
                onClick={() => navigate('/employer?section=accounts')}
              />
            </ListBody>
          </ListCard>
          </div>
          )}

          <div data-help="reports.debtors">
          <ListCard>
            <ListCardHeader
              tone="red"
              title="Debtor aging"
              meta={<Pill tone="red">{formatGBPCompact(summary.outstanding)} outstanding</Pill>}
            />
            {summary.outstanding <= 0 ? (
              <div className="p-4 sm:p-5">
                <EmptyState
                  title="Nobody owes you anything"
                  description="Sent invoices that aren't paid yet appear here, bucketed by how late they are."
                />
              </div>
            ) : (
              <ListBody>
                {debtorRows.map((row) => (
                  <ListRow
                    key={row.label}
                    accent={row.tone}
                    title={row.label}
                    subtitle={row.clients}
                    trailing={
                      <span className="text-[15px] font-semibold tabular-nums text-white">
                        {formatGBP(row.amount)}
                      </span>
                    }
                    onClick={row.amount > 0 ? () => navigate('/employer?section=quotes&tab=overdue') : undefined}
                  />
                ))}
              </ListBody>
            )}
          </ListCard>
          </div>

          {showMoney && (
          <div data-help="reports.jobs">
          <ListCard>
            <ListCardHeader
              tone="yellow"
              title="Job profitability"
              meta={<Pill tone="yellow">Top {jobRows.length}</Pill>}
            />
            {jobRows.length > 0 ? (
              <ListBody>
                {jobRows.map((job, idx) => {
                  const tone =
                    job.marginPct === null ? 'blue' : job.marginPct >= 20 ? 'emerald' : job.marginPct >= 10 ? 'amber' : 'red';
                  return (
                    <ListRow
                      key={job.jobId}
                      title={job.title}
                      subtitle={
                        job.invoiced > 0
                          ? `${formatGBP(job.invoiced)} invoiced · ${formatGBP(job.totalCosts)} costs`
                          : `Not invoiced yet · ${formatGBP(job.totalCosts)} costs`
                      }
                      lead={
                        <span className="h-9 w-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[12px] font-semibold tabular-nums text-white">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      }
                      trailing={
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-semibold tabular-nums text-white">
                            {formatGBPCompact(job.grossProfit)}
                          </span>
                          <Pill tone={tone}>{formatMargin(job.marginPct)}</Pill>
                        </div>
                      }
                      onClick={() => navigate(`/employer?section=financials&job=${job.jobId}`)}
                    />
                  );
                })}
              </ListBody>
            ) : (
              <div className="p-4 sm:p-5">
                <EmptyState
                  title="No job money yet"
                  description="Link invoices, timesheets, purchase orders or expenses to a job to see its profit."
                />
              </div>
            )}
          </ListCard>
          </div>
          )}

          {summary && showMoney && (
            <MarginBreakdownCard from={period.from} to={period.to} periodLabel={period.label} />
          )}
        </>
      )}

      {showMoney && (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ListCard>
          <ListCardHeader
            tone="amber"
            title="Expenses by category"
            meta={<Pill tone="amber">{period.label}</Pill>}
          />
          <div className="p-4 sm:p-5">
            <div className="h-64 w-full">
              {expensesByCategory.some((d) => d.total > 0) ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expensesByCategory.map((c) => ({ name: c.category, value: c.total }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="hsl(0 0% 12%)"
                      strokeWidth={2}
                    >
                      {expensesByCategory.map((_e, i) => (
                        <Cell key={`cell-${i}`} fill={expenseColours[i % expenseColours.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => formatGBP(v)} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <EmptyState title="No approved expenses in this period" />
              )}
            </div>
            {expensesByCategory.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-3 border-t border-white/[0.06]">
                {expensesByCategory.map((item, idx) => (
                  <div key={item.category} className="flex items-center gap-2">
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: expenseColours[idx % expenseColours.length] }}
                    />
                    <span className="text-[11px] text-white">
                      {item.category} {formatGBPCompact(item.total)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ListCard>

        <ListCard>
          <ListCardHeader tone="amber" title="Expense claims waiting" />
          <ListBody>
            <ListRow
              title="Awaiting approval"
              subtitle="Not a cost until approved"
              trailing={<Pill tone="amber">{expensePipeline?.pendingCount ?? 0} claims</Pill>}
            />
            <ListRow title="Pending amount" trailing={formatGBP(expensePipeline?.pendingAmount ?? 0)} />
            <ListRow
              title="Approved, not reimbursed"
              subtitle="Already in costs"
              trailing={formatGBP(expensePipeline?.approvedUnpaid ?? 0)}
            />
          </ListBody>
        </ListCard>
      </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ListCard>
          <ListCardHeader
            tone="purple"
            title="Compliance status"
            meta={<Pill tone="purple">{metrics?.complianceRate ?? 0}% compliant</Pill>}
          />
          <div className="p-4 sm:p-5">
            <div className="h-64 w-full">
              {complianceData.some((d) => d.value > 0) ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={complianceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="hsl(0 0% 12%)"
                      strokeWidth={2}
                    >
                      {complianceData.map((_entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 0 ? ELEC_YELLOW : `rgba(255,255,255,${0.7 - index * 0.18})`}
                        />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}%`, '']} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <EmptyState title="No certifications tracked yet" />
              )}
            </div>
            {complianceData.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-3 border-t border-white/[0.06]">
                {complianceData.map((item, idx) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{
                        background: idx === 0 ? ELEC_YELLOW : `rgba(255,255,255,${0.7 - idx * 0.18})`,
                      }}
                    />
                    <span className="text-[11px] text-white">
                      {item.name} {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ListCard>

        <ListCard>
          <ListCardHeader
            tone="blue"
            title="Jobs by status"
            meta={
              <Pill tone="blue">
                {metrics?.totalJobs ?? jobsByStatus.reduce((acc, j) => acc + j.count, 0)} total
              </Pill>
            }
          />
          {jobsByStatus.length > 0 ? (
            <div className="p-4 sm:p-5 space-y-4">
              {jobsByStatus.map((item) => (
                <div key={item.status} className="space-y-1.5">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="font-medium text-white">{item.status}</span>
                    <span className="tabular-nums text-white">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-elec-yellow"
                      style={{ width: `${Math.min(item.percentage, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 sm:p-5">
              <EmptyState title="No jobs tracked yet" />
            </div>
          )}
        </ListCard>
      </div>

      <ListCard>
        <ListCardHeader
          tone="emerald"
          title="Busiest team members"
          meta={<Pill tone="emerald">{topPerformers.length}</Pill>}
        />
        {topPerformers.length > 0 ? (
          <ListBody>
            {topPerformers.map((performer, idx) => (
              <ListRow
                key={performer.name}
                title={performer.name}
                subtitle={`${performer.jobs} job${performer.jobs === 1 ? '' : 's'} assigned${showMoney ? ' · combined job value' : ''}`}
                lead={
                  <span className="h-9 w-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[12px] font-semibold tabular-nums text-white">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                }
                trailing={
                  showMoney ? (
                    <span className="text-[14px] font-semibold tabular-nums text-elec-yellow">
                      {formatGBPCompact(performer.revenue)}
                    </span>
                  ) : undefined
                }
              />
            ))}
          </ListBody>
        ) : (
          <div className="p-4 sm:p-5">
            <EmptyState title="No job assignments tracked yet" />
          </div>
        )}
      </ListCard>
    </PageFrame>
  );
}
