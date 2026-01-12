import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Briefcase,
  PoundSterling,
  Target,
  Calendar,
  Loader2,
  Receipt,
  Wallet,
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Package,
  Truck,
  Wrench,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/employer/SectionHeader";
import {
  useBusinessMetrics,
  useMonthlyRevenue,
  useJobsByStatus,
  useComplianceData,
  useTopPerformers,
  usePaymentSummary,
} from "@/hooks/useBusinessMetrics";
import {
  useProfitabilitySummary,
  useCashFlowSummary,
  useExpensesByCategory,
  useJobProfitability,
  useMonthlyFinancials,
  useFinanceQuickStats,
} from "@/hooks/useFinanceReports";
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
} from "recharts";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, any> = {
  labour: Wrench,
  materials: Package,
  equipment: Truck,
  overheads: Building2,
  travel: Truck,
  other: Receipt,
};

const categoryColors: Record<string, string> = {
  labour: "#3b82f6",
  materials: "#22c55e",
  equipment: "#a855f7",
  overheads: "#f97316",
  travel: "#06b6d4",
  other: "#6b7280",
};

export function ReportsSection() {
  const [activeTab, setActiveTab] = useState("overview");

  // Business metrics hooks
  const { data: metrics, isLoading: metricsLoading } = useBusinessMetrics();
  const { data: monthlyData = [], isLoading: monthlyLoading } = useMonthlyRevenue();
  const { data: jobsByStatus = [], isLoading: jobsLoading } = useJobsByStatus();
  const { data: complianceData = [], isLoading: complianceLoading } = useComplianceData();
  const { data: topPerformers = [], isLoading: performersLoading } = useTopPerformers();
  const { data: paymentSummary, isLoading: paymentsLoading } = usePaymentSummary();

  // Finance report hooks
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
    paymentsLoading;

  const isFinanceLoading =
    profitLoading ||
    cashFlowLoading ||
    expensesLoading ||
    jobProfitLoading ||
    monthlyFinLoading ||
    quickStatsLoading;

  // Calculate growth percentages
  const revenueGrowth = metrics?.revenue.previous
    ? ((metrics.revenue.current - metrics.revenue.previous) / metrics.revenue.previous) * 100
    : 0;
  const profitGrowth = metrics?.profit.previous
    ? ((metrics.profit.current - metrics.profit.previous) / metrics.profit.previous) * 100
    : 0;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  const formatCompactCurrency = (amount: number) => {
    if (amount >= 1000000) return `£${(amount / 1000000).toFixed(1)}m`;
    if (amount >= 1000) return `£${(amount / 1000).toFixed(0)}k`;
    return `£${amount.toFixed(0)}`;
  };

  // Prepare expense category data for pie chart
  const expensePieData = expensesByCategory.map((cat) => ({
    name: cat.category.charAt(0).toUpperCase() + cat.category.slice(1),
    value: cat.total,
    color: categoryColors[cat.category.toLowerCase()] || categoryColors.other,
    percentage: cat.percentage,
  }));

  if (isLoading && activeTab === "overview") {
    return (
      <div className="space-y-6 animate-fade-in">
        <SectionHeader title="Reports & Analytics" />
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeader
        title="Reports & Analytics"
        description="Financial insights and business performance"
      />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full h-auto p-1 bg-muted/50">
          <TabsTrigger
            value="overview"
            className="text-xs sm:text-sm py-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-black"
          >
            <BarChart3 className="h-4 w-4 mr-1 hidden sm:inline" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="profitability"
            className="text-xs sm:text-sm py-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-black"
          >
            <TrendingUp className="h-4 w-4 mr-1 hidden sm:inline" />
            Profit
          </TabsTrigger>
          <TabsTrigger
            value="cashflow"
            className="text-xs sm:text-sm py-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-black"
          >
            <Wallet className="h-4 w-4 mr-1 hidden sm:inline" />
            Cash Flow
          </TabsTrigger>
          <TabsTrigger
            value="expenses"
            className="text-xs sm:text-sm py-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-black"
          >
            <Receipt className="h-4 w-4 mr-1 hidden sm:inline" />
            Expenses
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card className="card-hover border-elec-yellow/20">
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <div className="p-2 rounded-lg bg-elec-yellow/10 mb-2">
                    <PoundSterling className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <p className="text-xl font-bold">
                    £{metrics?.revenue.current ? (metrics.revenue.current / 1000).toFixed(0) : 0}k
                  </p>
                  <p className="text-xs text-muted-foreground">Revenue</p>
                  <div className="flex items-center gap-1 mt-1">
                    {revenueGrowth >= 0 ? (
                      <TrendingUp className="h-3 w-3 text-success" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-destructive" />
                    )}
                    <span
                      className={`text-xs ${revenueGrowth >= 0 ? "text-success" : "text-destructive"}`}
                    >
                      {revenueGrowth >= 0 ? "+" : ""}
                      {revenueGrowth.toFixed(0)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover border-elec-yellow/20">
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <div className="p-2 rounded-lg bg-success/10 mb-2">
                    <TrendingUp className="h-5 w-5 text-success" />
                  </div>
                  <p className="text-xl font-bold">
                    £{metrics?.profit.current ? (metrics.profit.current / 1000).toFixed(0) : 0}k
                  </p>
                  <p className="text-xs text-muted-foreground">Profit</p>
                  <div className="flex items-center gap-1 mt-1">
                    {profitGrowth >= 0 ? (
                      <TrendingUp className="h-3 w-3 text-success" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-destructive" />
                    )}
                    <span
                      className={`text-xs ${profitGrowth >= 0 ? "text-success" : "text-destructive"}`}
                    >
                      {profitGrowth >= 0 ? "+" : ""}
                      {profitGrowth.toFixed(0)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover border-elec-yellow/20">
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <div className="p-2 rounded-lg bg-elec-yellow/10 mb-2">
                    <Briefcase className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <p className="text-xl font-bold">{metrics?.completedJobs || 0}</p>
                  <p className="text-xs text-muted-foreground">Jobs Done</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {metrics?.activeJobs || 0} active
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover border-elec-yellow/20">
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <div className="p-2 rounded-lg bg-elec-yellow/10 mb-2">
                    <Users className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <p className="text-xl font-bold">{metrics?.complianceRate || 0}%</p>
                  <p className="text-xs text-muted-foreground">Compliance</p>
                  <p className="text-xs text-success mt-1">{metrics?.employees || 0} staff</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card className="card-hover border-elec-yellow/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-elec-yellow" />
                Revenue vs Target (6 Months)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                {monthlyData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <XAxis
                        dataKey="month"
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                        axisLine={{ stroke: "hsl(var(--border))" }}
                      />
                      <YAxis
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                        axisLine={{ stroke: "hsl(var(--border))" }}
                        tickFormatter={(value) => `£${value}k`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          color: "hsl(var(--foreground))",
                        }}
                        formatter={(value) => [`£${value}k`, ""]}
                      />
                      <Legend />
                      <Bar
                        dataKey="revenue"
                        name="Revenue"
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="target"
                        name="Target"
                        fill="hsl(var(--muted))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No revenue data available yet. Start tracking invoices to see trends.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Job Completion Trend */}
            <Card className="card-hover border-elec-yellow/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Target className="h-5 w-5 text-elec-yellow" />
                  Job Completion Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 w-full">
                  {monthlyData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={monthlyData}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      >
                        <XAxis
                          dataKey="month"
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                          axisLine={{ stroke: "hsl(var(--border))" }}
                        />
                        <YAxis
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                          axisLine={{ stroke: "hsl(var(--border))" }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            color: "hsl(var(--foreground))",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                      No trend data available yet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Compliance Status Pie */}
            <Card className="card-hover border-elec-yellow/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Target className="h-5 w-5 text-elec-yellow" />
                  Compliance Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 w-full flex items-center justify-center">
                  {complianceData.length > 0 && complianceData.some((d) => d.value > 0) ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={complianceData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {complianceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            color: "hsl(var(--foreground))",
                          }}
                          formatter={(value) => [`${value}%`, ""]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="text-muted-foreground text-sm text-center">
                      No certifications tracked yet
                    </div>
                  )}
                </div>
                <div className="flex justify-center gap-4 mt-2">
                  {complianceData.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {item.name} {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers & Jobs by Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="card-hover border-elec-yellow/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5 text-elec-yellow" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPerformers.length > 0 ? (
                    topPerformers.map((performer, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-elec-yellow/10 flex items-center justify-center text-sm font-medium text-elec-yellow">
                            {idx + 1}
                          </span>
                          <div>
                            <p className="font-medium text-sm">{performer.name}</p>
                            <p className="text-xs text-muted-foreground">{performer.jobs} jobs</p>
                          </div>
                        </div>
                        <span className="font-semibold text-elec-yellow text-sm">
                          £{(performer.revenue / 1000).toFixed(0)}k
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground text-sm">
                      No job assignments tracked yet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover border-elec-yellow/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-elec-yellow" />
                  Jobs by Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {jobsByStatus.length > 0 ? (
                    jobsByStatus.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{item.status}</span>
                          <span className="text-muted-foreground">
                            {item.count} ({item.percentage}%)
                          </span>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground text-sm">
                      No jobs tracked yet
                    </div>
                  )}
                </div>
                <div className="mt-4 pt-3 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Jobs</span>
                    <span className="font-semibold">
                      {metrics?.totalJobs || jobsByStatus.reduce((acc, j) => acc + j.count, 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Outstanding Payments */}
          <Card className="card-hover border-elec-yellow/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-elec-yellow" />
                Outstanding Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-lg bg-success/10 border border-success/20 text-center">
                  <p className="text-xs text-muted-foreground">Paid (30 days)</p>
                  <p className="text-xl font-bold text-success">
                    £{paymentSummary ? (paymentSummary.paidLast30Days / 1000).toFixed(0) : 0}k
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20 text-center">
                  <p className="text-xs text-muted-foreground">Pending</p>
                  <p className="text-xl font-bold text-warning">
                    £{paymentSummary ? (paymentSummary.pending / 1000).toFixed(0) : 0}k
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-center">
                  <p className="text-xs text-muted-foreground">Overdue</p>
                  <p className="text-xl font-bold text-destructive">
                    £{paymentSummary ? (paymentSummary.overdue / 1000).toFixed(0) : 0}k
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profitability Tab */}
        <TabsContent value="profitability" className="space-y-6 mt-6">
          {isFinanceLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              {/* Profitability Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card className="border-elec-yellow/20">
                  <CardContent className="p-4">
                    <div className="flex flex-col">
                      <p className="text-xs text-muted-foreground">Total Revenue</p>
                      <p className="text-xl font-bold text-elec-yellow">
                        {formatCompactCurrency(profitability?.totalRevenue || 0)}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-elec-yellow/20">
                  <CardContent className="p-4">
                    <div className="flex flex-col">
                      <p className="text-xs text-muted-foreground">Total Costs</p>
                      <p className="text-xl font-bold text-orange-500">
                        {formatCompactCurrency(profitability?.totalCosts || 0)}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-elec-yellow/20">
                  <CardContent className="p-4">
                    <div className="flex flex-col">
                      <p className="text-xs text-muted-foreground">Net Profit</p>
                      <p
                        className={cn(
                          "text-xl font-bold",
                          (profitability?.netProfit || 0) >= 0 ? "text-green-500" : "text-red-500"
                        )}
                      >
                        {formatCompactCurrency(profitability?.netProfit || 0)}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-elec-yellow/20">
                  <CardContent className="p-4">
                    <div className="flex flex-col">
                      <p className="text-xs text-muted-foreground">Profit Margin</p>
                      <p
                        className={cn(
                          "text-xl font-bold flex items-center gap-1",
                          (profitability?.profitMargin || 0) >= 0 ? "text-green-500" : "text-red-500"
                        )}
                      >
                        {(profitability?.profitMargin || 0).toFixed(1)}%
                        {(profitability?.profitMargin || 0) >= 0 ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Monthly Profit Trend */}
              <Card className="border-elec-yellow/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-elec-yellow" />
                    Revenue vs Costs (6 Months)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 w-full">
                    {monthlyFinancials.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={monthlyFinancials}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <XAxis
                            dataKey="month"
                            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                            axisLine={{ stroke: "hsl(var(--border))" }}
                          />
                          <YAxis
                            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                            axisLine={{ stroke: "hsl(var(--border))" }}
                            tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                              color: "hsl(var(--foreground))",
                            }}
                            formatter={(value: number) => [formatCurrency(value), ""]}
                          />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="revenue"
                            name="Revenue"
                            stroke="#facc15"
                            fill="#facc15"
                            fillOpacity={0.2}
                          />
                          <Area
                            type="monotone"
                            dataKey="costs"
                            name="Costs"
                            stroke="#f97316"
                            fill="#f97316"
                            fillOpacity={0.2}
                          />
                          <Area
                            type="monotone"
                            dataKey="profit"
                            name="Profit"
                            stroke="#22c55e"
                            fill="#22c55e"
                            fillOpacity={0.2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        No financial data available yet
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Job Profitability Ranking */}
              <Card className="border-elec-yellow/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-elec-yellow" />
                    Job Profitability Ranking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {jobProfitability.length > 0 ? (
                      jobProfitability.slice(0, 10).map((job, idx) => (
                        <div
                          key={job.jobId}
                          className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <span
                              className={cn(
                                "w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium shrink-0",
                                idx < 3
                                  ? "bg-elec-yellow/20 text-elec-yellow"
                                  : "bg-muted text-muted-foreground"
                              )}
                            >
                              {idx + 1}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-sm truncate">{job.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatCurrency(job.revenue)} revenue
                              </p>
                            </div>
                          </div>
                          <div className="text-right shrink-0 ml-2">
                            <p
                              className={cn(
                                "font-semibold text-sm",
                                job.profit >= 0 ? "text-green-500" : "text-red-500"
                              )}
                            >
                              {formatCurrency(job.profit)}
                            </p>
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs",
                                job.margin >= 20
                                  ? "border-green-500/30 text-green-500"
                                  : job.margin >= 10
                                    ? "border-amber-500/30 text-amber-500"
                                    : "border-red-500/30 text-red-500"
                              )}
                            >
                              {job.margin.toFixed(1)}%
                            </Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-muted-foreground text-sm">
                        No job profitability data available yet
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {/* Cash Flow Tab */}
        <TabsContent value="cashflow" className="space-y-6 mt-6">
          {isFinanceLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              {/* Cash Flow Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card className="border-green-500/30 bg-green-500/5">
                  <CardContent className="p-4">
                    <div className="flex flex-col">
                      <p className="text-xs text-muted-foreground">Cash In</p>
                      <p className="text-xl font-bold text-green-500">
                        {formatCompactCurrency(cashFlow?.totalPaid || 0)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {cashFlow?.invoicesPaid || 0} invoices
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-amber-500/30 bg-amber-500/5">
                  <CardContent className="p-4">
                    <div className="flex flex-col">
                      <p className="text-xs text-muted-foreground">Pending</p>
                      <p className="text-xl font-bold text-amber-500">
                        {formatCompactCurrency(cashFlow?.totalOutstanding || 0)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {cashFlow?.invoicesOutstanding || 0} invoices
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-500/30 bg-red-500/5">
                  <CardContent className="p-4">
                    <div className="flex flex-col">
                      <p className="text-xs text-muted-foreground">Overdue</p>
                      <p className="text-xl font-bold text-red-500">
                        {formatCompactCurrency(cashFlow?.totalOverdue || 0)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {cashFlow?.invoicesOverdue || 0} invoices
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-elec-yellow/30 bg-elec-yellow/5">
                  <CardContent className="p-4">
                    <div className="flex flex-col">
                      <p className="text-xs text-muted-foreground">Collection Rate</p>
                      <p className="text-xl font-bold text-elec-yellow">
                        {(cashFlow?.collectionRate || 0).toFixed(0)}%
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Avg {cashFlow?.averageDaysToPayment || 0} days
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Cash Flow Visual */}
              <Card className="border-elec-yellow/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-elec-yellow" />
                    Cash Flow Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Collection Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Invoice Collection</span>
                        <span className="font-medium">
                          {formatCurrency(cashFlow?.totalPaid || 0)} /{" "}
                          {formatCurrency(
                            (cashFlow?.totalPaid || 0) + (cashFlow?.totalOutstanding || 0)
                          )}
                        </span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all"
                          style={{ width: `${cashFlow?.collectionRate || 0}%` }}
                        />
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-500">
                          {cashFlow?.invoicesPaid || 0}
                        </p>
                        <p className="text-xs text-muted-foreground">Paid</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-amber-500">
                          {cashFlow?.invoicesOutstanding || 0}
                        </p>
                        <p className="text-xs text-muted-foreground">Pending</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-500">
                          {cashFlow?.invoicesOverdue || 0}
                        </p>
                        <p className="text-xs text-muted-foreground">Overdue</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-elec-yellow/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold">This Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="text-sm text-muted-foreground">Invoiced</span>
                        <span className="font-semibold">
                          {formatCurrency(quickStats?.monthlyInvoiced || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="text-sm text-muted-foreground">Expenses</span>
                        <span className="font-semibold text-orange-500">
                          {formatCurrency(quickStats?.monthlyExpenses || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-muted-foreground">Net</span>
                        <span
                          className={cn(
                            "font-bold",
                            (quickStats?.monthlyInvoiced || 0) - (quickStats?.monthlyExpenses || 0) >=
                              0
                              ? "text-green-500"
                              : "text-red-500"
                          )}
                        >
                          {formatCurrency(
                            (quickStats?.monthlyInvoiced || 0) - (quickStats?.monthlyExpenses || 0)
                          )}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-elec-yellow/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold">Pending Expenses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="text-sm text-muted-foreground">Awaiting Approval</span>
                        <Badge variant="outline" className="border-amber-500/30 text-amber-500">
                          {quickStats?.pendingExpenses || 0} claims
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="text-sm text-muted-foreground">Amount</span>
                        <span className="font-semibold">
                          {formatCurrency(quickStats?.pendingExpenseAmount || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-muted-foreground">Approved Unpaid</span>
                        <span className="font-semibold text-amber-500">
                          {formatCurrency(quickStats?.approvedUnpaidExpenses || 0)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>

        {/* Expenses Tab */}
        <TabsContent value="expenses" className="space-y-6 mt-6">
          {isFinanceLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              {/* Expense Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card className="border-elec-yellow/20">
                  <CardContent className="p-4">
                    <div className="flex flex-col">
                      <p className="text-xs text-muted-foreground">Total Expenses</p>
                      <p className="text-xl font-bold">
                        {formatCompactCurrency(
                          expensesByCategory.reduce((sum, cat) => sum + cat.total, 0)
                        )}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-elec-yellow/20">
                  <CardContent className="p-4">
                    <div className="flex flex-col">
                      <p className="text-xs text-muted-foreground">Categories</p>
                      <p className="text-xl font-bold">{expensesByCategory.length}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-elec-yellow/20">
                  <CardContent className="p-4">
                    <div className="flex flex-col">
                      <p className="text-xs text-muted-foreground">Pending Claims</p>
                      <p className="text-xl font-bold text-amber-500">
                        {quickStats?.pendingExpenses || 0}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-elec-yellow/20">
                  <CardContent className="p-4">
                    <div className="flex flex-col">
                      <p className="text-xs text-muted-foreground">This Month</p>
                      <p className="text-xl font-bold">
                        {formatCompactCurrency(quickStats?.monthlyExpenses || 0)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Expense Category Pie Chart */}
                <Card className="border-elec-yellow/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      <PieChartIcon className="h-5 w-5 text-elec-yellow" />
                      Expenses by Category
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full flex items-center justify-center">
                      {expensePieData.length > 0 && expensePieData.some((d) => d.value > 0) ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={expensePieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={85}
                              paddingAngle={2}
                              dataKey="value"
                            >
                              {expensePieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                                color: "hsl(var(--foreground))",
                              }}
                              formatter={(value: number) => [formatCurrency(value), ""]}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="text-muted-foreground text-sm text-center">
                          No expense data available yet
                        </div>
                      )}
                    </div>
                    {/* Legend */}
                    <div className="flex flex-wrap justify-center gap-3 mt-2">
                      {expensePieData.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-xs text-muted-foreground">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Category Breakdown List */}
                <Card className="border-elec-yellow/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      <Receipt className="h-5 w-5 text-elec-yellow" />
                      Category Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {expensesByCategory.length > 0 ? (
                        expensesByCategory.map((category, idx) => {
                          const Icon =
                            categoryIcons[category.category.toLowerCase()] || Receipt;
                          const color =
                            categoryColors[category.category.toLowerCase()] || categoryColors.other;
                          return (
                            <div
                              key={idx}
                              className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="p-2 rounded-lg"
                                  style={{ backgroundColor: `${color}20` }}
                                >
                                  <Icon className="h-4 w-4" style={{ color }} />
                                </div>
                                <div>
                                  <p className="font-medium text-sm capitalize">
                                    {category.category}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {category.count} expense{category.count !== 1 ? "s" : ""}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-sm">
                                  {formatCurrency(category.total)}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {category.percentage.toFixed(1)}%
                                </p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center py-4 text-muted-foreground text-sm">
                          No expense categories tracked yet
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
