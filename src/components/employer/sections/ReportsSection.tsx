import { useMemo, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import {
  useBusinessMetrics,
  useMonthlyRevenue,
  useJobsByStatus,
  useComplianceData,
  useTopPerformers,
  usePaymentSummary,
} from '@/hooks/useBusinessMetrics';
import {
  useProfitabilitySummary,
  useCashFlowSummary,
  useExpensesByCategory,
  useJobProfitability,
  useMonthlyFinancials,
  useFinanceQuickStats,
} from '@/hooks/useFinanceReports';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
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
  Eyebrow,
  PrimaryButton,
} from '@/components/employer/editorial';
import { useToast } from '@/hooks/use-toast';

type RangeKey = '7d' | '30d' | '90d' | 'year';

const rangeTabs: { value: RangeKey; label: string }[] = [
  { value: '7d', label: '7d' },
  { value: '30d', label: '30d' },
  { value: '90d', label: '90d' },
  { value: 'year', label: 'Year' },
];

const ELEC_YELLOW = 'hsl(var(--elec-yellow))';
const WHITE_60 = 'rgba(255,255,255,0.6)';
const WHITE_20 = 'rgba(255,255,255,0.2)';
const WHITE_06 = 'rgba(255,255,255,0.06)';

const tooltipStyle = {
  backgroundColor: 'hsl(0 0% 10%)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '12px',
  color: '#ffffff',
  fontSize: '12px',
};

export function ReportsSection() {
  const [range, setRange] = useState<RangeKey>('30d');
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: metrics, isLoading: metricsLoading } = useBusinessMetrics();
  const { data: monthlyData = [], isLoading: monthlyLoading } = useMonthlyRevenue();
  const { data: jobsByStatus = [], isLoading: jobsLoading } = useJobsByStatus();
  const { data: complianceData = [], isLoading: complianceLoading } = useComplianceData();
  const { data: topPerformers = [], isLoading: performersLoading } = useTopPerformers();
  const { data: paymentSummary, isLoading: paymentsLoading } = usePaymentSummary();

  const { data: profitability, isLoading: profitLoading } = useProfitabilitySummary();
  const { data: cashFlow, isLoading: cashFlowLoading } = useCashFlowSummary();
  const { data: expensesByCategory = [], isLoading: expensesLoading } = useExpensesByCategory();
  const { data: jobProfitability = [], isLoading: jobProfitLoading } = useJobProfitability();
  const { data: monthlyFinancials = [], isLoading: monthlyFinLoading } = useMonthlyFinancials();
  const { data: quickStats, isLoading: quickStatsLoading } = useFinanceQuickStats();

  const isLoading =
    metricsLoading ||
    monthlyLoading ||
    jobsLoading ||
    complianceLoading ||
    performersLoading ||
    paymentsLoading ||
    profitLoading ||
    cashFlowLoading ||
    expensesLoading ||
    jobProfitLoading ||
    monthlyFinLoading ||
    quickStatsLoading;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  const formatCompactCurrency = (amount: number) => {
    if (amount >= 1_000_000) return `£${(amount / 1_000_000).toFixed(1)}m`;
    if (amount >= 1_000) return `£${(amount / 1_000).toFixed(0)}k`;
    return `£${amount.toFixed(0)}`;
  };

  const refresh = () => {
    queryClient.invalidateQueries();
    toast({ title: 'Refreshing reports', description: 'Pulling the latest figures.' });
  };

  const exportCsv = () => {
    const rows: string[] = [];
    rows.push('Metric,Value');
    rows.push(`Revenue,${profitability?.totalRevenue ?? 0}`);
    rows.push(`Costs,${profitability?.totalCosts ?? 0}`);
    rows.push(`Net profit,${profitability?.netProfit ?? 0}`);
    rows.push(`Profit margin %,${(profitability?.profitMargin ?? 0).toFixed(2)}`);
    rows.push(`Compliance %,${metrics?.complianceRate ?? 0}`);
    rows.push(`Collection rate %,${(cashFlow?.collectionRate ?? 0).toFixed(2)}`);
    rows.push('');
    rows.push('Month,Revenue,Costs,Profit');
    monthlyFinancials.forEach((m) => {
      rows.push(`${m.month},${m.revenue},${m.costs},${m.profit}`);
    });
    rows.push('');
    rows.push('Debtor,Bucket,Amount');
    rows.push(`Paid 30d,Current,${paymentSummary?.paidLast30Days ?? 0}`);
    rows.push(`Pending,1-30 days,${paymentSummary?.pending ?? 0}`);
    rows.push(`Overdue,30+ days,${paymentSummary?.overdue ?? 0}`);

    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reports-${range}-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: 'CSV exported', description: 'Your report has downloaded.' });
  };

  const expensePieData = useMemo(
    () =>
      expensesByCategory.map((cat) => ({
        name: cat.category.charAt(0).toUpperCase() + cat.category.slice(1),
        value: cat.total,
        percentage: cat.percentage,
      })),
    [expensesByCategory]
  );

  const expenseColours = ['#facc15', 'rgba(255,255,255,0.85)', 'rgba(255,255,255,0.55)', 'rgba(255,255,255,0.35)', 'rgba(255,255,255,0.22)', 'rgba(255,255,255,0.12)'];

  const debtorRows = useMemo(() => {
    return [
      {
        label: 'Paid (last 30 days)',
        bucket: 'Current',
        amount: paymentSummary?.paidLast30Days ?? 0,
        tone: 'emerald' as const,
      },
      {
        label: 'Pending invoices',
        bucket: '1-30 days',
        amount: paymentSummary?.pending ?? 0,
        tone: 'amber' as const,
      },
      {
        label: 'Overdue invoices',
        bucket: '30+ days',
        amount: paymentSummary?.overdue ?? 0,
        tone: 'red' as const,
      },
    ];
  }, [paymentSummary]);

  const totalRevenueK = metrics?.revenue.current
    ? `£${(metrics.revenue.current / 1000).toFixed(0)}k`
    : '£0';
  const totalProfitK = metrics?.profit.current
    ? `£${(metrics.profit.current / 1000).toFixed(0)}k`
    : '£0';
  const profitMarginValue = `${(profitability?.profitMargin ?? 0).toFixed(1)}%`;
  const utilisationValue = `${metrics?.complianceRate ?? 0}%`;

  if (isLoading) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="Money"
          title="Reports"
          description="Revenue, profitability, utilisation and debtor aging."
          tone="blue"
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <PageHero
        eyebrow="Money"
        title="Reports"
        description="Revenue, profitability, utilisation and debtor aging."
        tone="blue"
        actions={
          <>
            <PrimaryButton onClick={exportCsv}>Export CSV</PrimaryButton>
            <IconButton onClick={refresh} aria-label="Refresh reports">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          </>
        }
      />

      <FilterBar
        tabs={rangeTabs}
        activeTab={range}
        onTabChange={(v) => setRange(v as RangeKey)}
      />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Revenue £', value: totalRevenueK, tone: 'emerald' },
          { label: 'Profit £', value: totalProfitK, accent: true },
          { label: 'Margin %', value: profitMarginValue, tone: 'emerald' },
          { label: 'Utilisation %', value: utilisationValue, tone: 'blue' },
        ]}
      />

      <ListCard>
        <ListCardHeader
          tone="blue"
          title="Revenue 30d"
          meta={<Pill tone="yellow">Revenue vs Target</Pill>}
        />
        <div className="p-4 sm:p-5">
          <div className="h-64 w-full">
            {monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid stroke={WHITE_06} vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: '#ffffff', fontSize: 11 }}
                    axisLine={{ stroke: WHITE_20 }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#ffffff', fontSize: 11 }}
                    axisLine={{ stroke: WHITE_20 }}
                    tickLine={false}
                    tickFormatter={(value) => `£${value}k`}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                    formatter={(value) => [`£${value}k`, '']}
                  />
                  <Legend wrapperStyle={{ color: '#ffffff', fontSize: 12 }} />
                  <Bar dataKey="revenue" name="Revenue" fill={ELEC_YELLOW} radius={[6, 6, 0, 0]} />
                  <Bar dataKey="target" name="Target" fill={WHITE_20} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyState
                title="No revenue data yet"
                description="Start tracking invoices to see monthly revenue trends."
              />
            )}
          </div>
        </div>
      </ListCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ListCard>
          <ListCardHeader tone="emerald" title="Revenue vs Costs" meta={<Pill tone="emerald">6 months</Pill>} />
          <div className="p-4 sm:p-5">
            <div className="h-64 w-full">
              {monthlyFinancials.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyFinancials}
                    margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                  >
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
                      dataKey="month"
                      tick={{ fill: '#ffffff', fontSize: 11 }}
                      axisLine={{ stroke: WHITE_20 }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: '#ffffff', fontSize: 11 }}
                      axisLine={{ stroke: WHITE_20 }}
                      tickLine={false}
                      tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      cursor={{ stroke: WHITE_20 }}
                      formatter={(value: number) => [formatCurrency(value), '']}
                    />
                    <Legend wrapperStyle={{ color: '#ffffff', fontSize: 12 }} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue"
                      stroke={ELEC_YELLOW}
                      strokeWidth={2}
                      fill="url(#revGrad)"
                    />
                    <Area
                      type="monotone"
                      dataKey="costs"
                      name="Costs"
                      stroke="#ffffff"
                      strokeOpacity={0.7}
                      strokeWidth={2}
                      fill="url(#costGrad)"
                    />
                    <Area
                      type="monotone"
                      dataKey="profit"
                      name="Profit"
                      stroke={ELEC_YELLOW}
                      strokeOpacity={0.6}
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                      fill="none"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <EmptyState title="No financial data yet" />
              )}
            </div>
          </div>
        </ListCard>

        <ListCard>
          <ListCardHeader tone="blue" title="Job completion trend" />
          <div className="p-4 sm:p-5">
            <div className="h-64 w-full">
              {monthlyData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid stroke={WHITE_06} vertical={false} />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: '#ffffff', fontSize: 11 }}
                      axisLine={{ stroke: WHITE_20 }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: '#ffffff', fontSize: 11 }}
                      axisLine={{ stroke: WHITE_20 }}
                      tickLine={false}
                    />
                    <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: WHITE_20 }} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke={ELEC_YELLOW}
                      strokeWidth={2}
                      dot={{ fill: ELEC_YELLOW, strokeWidth: 0, r: 3 }}
                      activeDot={{ r: 5, fill: ELEC_YELLOW }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <EmptyState title="No trend data yet" />
              )}
            </div>
          </div>
        </ListCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ListCard>
          <ListCardHeader tone="purple" title="Compliance status" />
          <div className="p-4 sm:p-5">
            <div className="h-64 w-full">
              {complianceData.length > 0 && complianceData.some((d) => d.value > 0) ? (
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
                  <div key={idx} className="flex items-center gap-2">
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
            tone="amber"
            title="Expenses by category"
            meta={<Pill tone="amber">{expensePieData.length}</Pill>}
          />
          <div className="p-4 sm:p-5">
            <div className="h-64 w-full">
              {expensePieData.length > 0 && expensePieData.some((d) => d.value > 0) ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expensePieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="hsl(0 0% 12%)"
                      strokeWidth={2}
                    >
                      {expensePieData.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={expenseColours[index % expenseColours.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={tooltipStyle}
                      formatter={(value: number) => [formatCurrency(value), '']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <EmptyState title="No expense data yet" />
              )}
            </div>
            {expensePieData.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-3 border-t border-white/[0.06]">
                {expensePieData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: expenseColours[idx % expenseColours.length] }}
                    />
                    <span className="text-[11px] text-white">{item.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ListCard>
      </div>

      <ListCard>
        <ListCardHeader
          tone="red"
          title="Debtor aging"
          meta={
            <Pill tone="red">
              {formatCompactCurrency(
                (paymentSummary?.pending ?? 0) + (paymentSummary?.overdue ?? 0)
              )}{' '}
              outstanding
            </Pill>
          }
        />
        {debtorRows.every((r) => r.amount === 0) ? (
          <div className="p-4 sm:p-5">
            <EmptyState
              title="No outstanding debtors"
              description="When invoices age, their bucket and value will show here."
            />
          </div>
        ) : (
          <ListBody>
            {debtorRows.map((row, idx) => (
              <ListRow
                key={idx}
                accent={row.tone}
                title={row.label}
                subtitle={`Bucket · ${row.bucket}`}
                trailing={
                  <span className="text-[15px] font-semibold tabular-nums text-white">
                    {formatCompactCurrency(row.amount)}
                  </span>
                }
              />
            ))}
          </ListBody>
        )}
      </ListCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ListCard>
          <ListCardHeader
            tone="emerald"
            title="Top performers"
            meta={<Pill tone="emerald">{topPerformers.length}</Pill>}
          />
          {topPerformers.length > 0 ? (
            <ListBody>
              {topPerformers.map((performer, idx) => (
                <ListRow
                  key={idx}
                  title={performer.name}
                  subtitle={`${performer.jobs} jobs`}
                  lead={
                    <span className="h-9 w-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[12px] font-semibold tabular-nums text-white">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  }
                  trailing={
                    <span className="text-[14px] font-semibold tabular-nums text-elec-yellow">
                      £{(performer.revenue / 1000).toFixed(0)}k
                    </span>
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
              {jobsByStatus.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
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
          tone="yellow"
          title="Job profitability"
          meta={<Pill tone="yellow">Top {Math.min(jobProfitability.length, 10)}</Pill>}
        />
        {jobProfitability.length > 0 ? (
          <ListBody>
            {jobProfitability.slice(0, 10).map((job, idx) => {
              const marginTone =
                job.margin >= 20 ? 'emerald' : job.margin >= 10 ? 'amber' : 'red';
              return (
                <ListRow
                  key={job.jobId}
                  title={job.title}
                  subtitle={`${formatCurrency(job.revenue)} revenue`}
                  lead={
                    <span className="h-9 w-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[12px] font-semibold tabular-nums text-white">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  }
                  trailing={
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-semibold tabular-nums text-white">
                        {formatCurrency(job.profit)}
                      </span>
                      <Pill tone={marginTone}>{job.margin.toFixed(1)}%</Pill>
                    </div>
                  }
                />
              );
            })}
          </ListBody>
        ) : (
          <div className="p-4 sm:p-5">
            <EmptyState title="No job profitability data yet" />
          </div>
        )}
      </ListCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ListCard>
          <ListCardHeader tone="emerald" title="This month" />
          <ListBody>
            <ListRow
              title="Invoiced"
              trailing={
                <span className="text-[14px] font-semibold tabular-nums text-white">
                  {formatCurrency(quickStats?.monthlyInvoiced || 0)}
                </span>
              }
            />
            <ListRow
              title="Expenses"
              trailing={
                <span className="text-[14px] font-semibold tabular-nums text-white">
                  {formatCurrency(quickStats?.monthlyExpenses || 0)}
                </span>
              }
            />
            <ListRow
              title="Net"
              trailing={
                <span
                  className={`text-[14px] font-semibold tabular-nums ${
                    (quickStats?.monthlyInvoiced || 0) - (quickStats?.monthlyExpenses || 0) >= 0
                      ? 'text-elec-yellow'
                      : 'text-white'
                  }`}
                >
                  {formatCurrency(
                    (quickStats?.monthlyInvoiced || 0) - (quickStats?.monthlyExpenses || 0)
                  )}
                </span>
              }
            />
          </ListBody>
        </ListCard>

        <ListCard>
          <ListCardHeader tone="amber" title="Pending expenses" />
          <ListBody>
            <ListRow
              title="Awaiting approval"
              trailing={<Pill tone="amber">{quickStats?.pendingExpenses || 0} claims</Pill>}
            />
            <ListRow
              title="Pending amount"
              trailing={
                <span className="text-[14px] font-semibold tabular-nums text-white">
                  {formatCurrency(quickStats?.pendingExpenseAmount || 0)}
                </span>
              }
            />
            <ListRow
              title="Approved unpaid"
              trailing={
                <span className="text-[14px] font-semibold tabular-nums text-white">
                  {formatCurrency(quickStats?.approvedUnpaidExpenses || 0)}
                </span>
              }
            />
          </ListBody>
        </ListCard>
      </div>

      <ListCard>
        <ListCardHeader
          tone="cyan"
          title="Cash flow snapshot"
          meta={
            <Pill tone="cyan">
              {(cashFlow?.collectionRate || 0).toFixed(0)}% collected
            </Pill>
          }
        />
        <div className="p-4 sm:p-5 space-y-5">
          <div>
            <div className="flex items-center justify-between text-[12px] mb-2">
              <Eyebrow>Invoice collection</Eyebrow>
              <span className="tabular-nums text-white">
                {formatCurrency(cashFlow?.totalPaid || 0)} /{' '}
                {formatCurrency((cashFlow?.totalPaid || 0) + (cashFlow?.totalOutstanding || 0))}
              </span>
            </div>
            <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-elec-yellow"
                style={{ width: `${Math.min(cashFlow?.collectionRate || 0, 100)}%` }}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="bg-[hsl(0_0%_10%)] px-4 py-4 text-center">
              <div className="text-[24px] font-semibold tabular-nums text-white">
                {cashFlow?.invoicesPaid || 0}
              </div>
              <div className="mt-1.5 text-[10px] text-white uppercase tracking-[0.14em]">Paid</div>
            </div>
            <div className="bg-[hsl(0_0%_10%)] px-4 py-4 text-center">
              <div className="text-[24px] font-semibold tabular-nums text-white">
                {cashFlow?.invoicesOutstanding || 0}
              </div>
              <div className="mt-1.5 text-[10px] text-white uppercase tracking-[0.14em]">Pending</div>
            </div>
            <div className="bg-[hsl(0_0%_10%)] px-4 py-4 text-center">
              <div className="text-[24px] font-semibold tabular-nums text-white">
                {cashFlow?.invoicesOverdue || 0}
              </div>
              <div className="mt-1.5 text-[10px] text-white uppercase tracking-[0.14em]">Overdue</div>
            </div>
          </div>
        </div>
      </ListCard>
    </PageFrame>
  );
}
