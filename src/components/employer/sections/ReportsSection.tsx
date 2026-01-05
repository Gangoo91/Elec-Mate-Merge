import { BarChart3, TrendingUp, TrendingDown, Users, Briefcase, PoundSterling, Target, Calendar, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SectionHeader } from "@/components/employer/SectionHeader";
import {
  useBusinessMetrics,
  useMonthlyRevenue,
  useJobsByStatus,
  useComplianceData,
  useTopPerformers,
  usePaymentSummary,
} from "@/hooks/useBusinessMetrics";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Tooltip, Legend } from "recharts";

export function ReportsSection() {
  const { data: metrics, isLoading: metricsLoading } = useBusinessMetrics();
  const { data: monthlyData = [], isLoading: monthlyLoading } = useMonthlyRevenue();
  const { data: jobsByStatus = [], isLoading: jobsLoading } = useJobsByStatus();
  const { data: complianceData = [], isLoading: complianceLoading } = useComplianceData();
  const { data: topPerformers = [], isLoading: performersLoading } = useTopPerformers();
  const { data: paymentSummary, isLoading: paymentsLoading } = usePaymentSummary();

  const isLoading = metricsLoading || monthlyLoading || jobsLoading || complianceLoading || performersLoading || paymentsLoading;

  // Calculate growth percentages
  const revenueGrowth = metrics?.revenue.previous
    ? ((metrics.revenue.current - metrics.revenue.previous) / metrics.revenue.previous) * 100
    : 0;
  const profitGrowth = metrics?.profit.previous
    ? ((metrics.profit.current - metrics.profit.previous) / metrics.profit.previous) * 100
    : 0;

  if (isLoading) {
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
      <SectionHeader title="Reports & Analytics" />

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
                <span className={`text-xs ${revenueGrowth >= 0 ? "text-success" : "text-destructive"}`}>
                  {revenueGrowth >= 0 ? "+" : ""}{revenueGrowth.toFixed(0)}%
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
                <span className={`text-xs ${profitGrowth >= 0 ? "text-success" : "text-destructive"}`}>
                  {profitGrowth >= 0 ? "+" : ""}{profitGrowth.toFixed(0)}%
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
              <p className="text-xs text-success mt-1">
                {metrics?.employees || 0} staff
              </p>
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
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis
                    dataKey="month"
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                  />
                  <YAxis
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                    tickFormatter={(value) => `£${value}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                    formatter={(value) => [`£${value}k`, '']}
                  />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" name="Target" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
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
                  <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis
                      dataKey="month"
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                    />
                    <YAxis
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
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
              {complianceData.length > 0 && complianceData.some(d => d.value > 0) ? (
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
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))'
                      }}
                      formatter={(value) => [`${value}%`, '']}
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
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name} {item.value}%</span>
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
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
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
                      <span className="text-muted-foreground">{item.count} ({item.percentage}%)</span>
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
    </div>
  );
}
