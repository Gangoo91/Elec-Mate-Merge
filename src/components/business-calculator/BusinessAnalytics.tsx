import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { TrendingUp, Target, BarChart3, PoundSterling } from 'lucide-react';
import { businessCostTotals, OVERHEAD_COVER_MARKUP_PERCENT } from '@/data/job-costing';

interface BusinessAnalyticsProps {
  startupInputs: Record<string, number>;
  monthlyInputs: Record<string, number>;
  businessType: string;
  calculated: boolean;
}

const BusinessAnalytics: React.FC<BusinessAnalyticsProps> = ({
  startupInputs,
  monthlyInputs,
  businessType,
  calculated,
}) => {
  if (!calculated) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardContent className="py-12 text-center">
          <BarChart3 className="h-16 w-16 text-elec-yellow/50 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
          <p className="text-muted-foreground">
            Complete your calculation to see detailed analytics and projections
          </p>
        </CardContent>
      </Card>
    );
  }

  const totals = businessCostTotals(startupInputs, monthlyInputs);
  const { totalStartup, totalMonthly } = totals;

  // Prepare startup cost breakdown data
  const startupData = Object.entries(startupInputs)
    .filter(([_, value]) => value > 0)
    .map(([key, value]: [string, number]) => ({
      name: key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
      value: value,
      percentage: ((value / totalStartup) * 100).toFixed(1),
    }));

  // Prepare monthly cost breakdown data
  const monthlyData = Object.entries(monthlyInputs)
    .filter(([_, value]) => value > 0)
    .map(([key, value]: [string, number]) => ({
      name: key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
      value: value,
      percentage: ((value / totalMonthly) * 100).toFixed(1),
    }));

  // Three-year projection data
  const projectionData = [
    {
      year: 'Year 1',
      startup: totalStartup,
      monthly: totalMonthly * 12,
      total: totalStartup + totalMonthly * 12,
    },
    { year: 'Year 2', startup: 0, monthly: totalMonthly * 12, total: totalMonthly * 12 },
    { year: 'Year 3', startup: 0, monthly: totalMonthly * 12, total: totalMonthly * 12 },
  ];

  /**
   * Break-even.
   *
   * Was `totalMonthly * 1.8` with the comment "80% markup", divided by
   * `(monthlyRevenueTarget - totalMonthly)`. Two defects:
   *
   * 1. That denominator is `totalMonthly * 0.8`, so a user with set-up costs
   *    but no monthly overheads divided by zero and the card rendered
   *    "Infinitymo". Reachable — Generate Analysis only requires ONE of the two
   *    totals to be non-zero.
   * 2. The 80% was a MARKUP on cost, while the card beside it announced a
   *    hardcoded "Profit Margin 44%". They happen to agree (80/180 = 44.4%) but
   *    neither was derived from the other, so editing one would have silently
   *    desynchronised them. The margin is now computed from the markup.
   */
  const monthlyCoverTarget = totals.monthlyCoverTarget;
  const dailyCoverTarget = totals.dailyCoverTarget;
  const breakEvenMonths = totals.breakEvenMonths;
  const breakEvenLabel = breakEvenMonths === null ? '—' : `${breakEvenMonths}mo`;

  const COLORS = [
    '#F7931E',
    '#FFB366',
    '#FF8C42',
    '#FF6B1A',
    '#E65100',
    '#D84315',
    '#BF360C',
    '#A6642A',
  ];

  return (
    <div className="space-y-6">
      {/* ROI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Investment</p>
                <p className="text-2xl font-bold text-elec-yellow">
                  £{totalStartup.toLocaleString()}
                </p>
              </div>
              {/* A UK cost calculator was showing a dollar sign. */}
              <PoundSterling className="h-8 w-8 text-elec-yellow/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Cover Target</p>
                <p className="text-2xl font-bold text-elec-yellow">
                  £{Math.round(monthlyCoverTarget).toLocaleString()}
                </p>
              </div>
              <Target className="h-8 w-8 text-elec-yellow/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Daily Cover Target</p>
                <p className="text-2xl font-bold text-elec-yellow">
                  £{dailyCoverTarget.toFixed(0)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-elec-yellow/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Break-even</p>
                <p className="text-2xl font-bold text-elec-yellow">{breakEvenLabel}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-elec-yellow/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Startup Cost Breakdown */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-lg">Startup Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={startupData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  // Was `({ name, percentage })` — `percentage` is our own data
                  // field, not part of recharts' label props, so it never
                  // type-checked. `percent` is recharts' own share of the pie
                  // and gives the same number.
                  label={({ percent }) => `${((percent ?? 0) * 100).toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {startupData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`£${value.toLocaleString()}`, 'Cost']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {startupData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">£{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Cost Breakdown */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-lg">Monthly Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value: number) => [`£${value}`, 'Monthly Cost']} />
                <Bar dataKey="value" fill="#F7931E" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Three-Year Projection */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="text-lg">Three-Year Financial Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="year" />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value: number) => [`£${value.toLocaleString()}`, 'Cost']} />
              <Line type="monotone" dataKey="total" stroke="#F7931E" strokeWidth={3} />
              <Line type="monotone" dataKey="startup" stroke="#FFB366" strokeWidth={2} />
              <Line type="monotone" dataKey="monthly" stroke="#FF8C42" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Break-even Analysis */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="text-lg">Break-even Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Progress to Break-even</span>
              <span className="text-elec-yellow font-semibold">
                {breakEvenMonths === null ? 'Not reached' : `${breakEvenMonths} months`}
              </span>
            </div>
            {/* `12 / breakEvenMonths` divided by zero whenever break-even was 0
                and produced Infinity; Math.min then clamped it to a confident
                100%. Guarded at the source instead. */}
            <Progress
              value={
                breakEvenMonths === null ? 0 : Math.min((12 / Math.max(breakEvenMonths, 12)) * 100, 100)
              }
              className="h-3"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-elec-gray rounded-lg">
                <h4 className="font-medium mb-2">Monthly Cover Target</h4>
                <p className="text-2xl font-bold text-elec-yellow">
                  £{Math.round(monthlyCoverTarget).toLocaleString()}
                </p>
                {/* Was "Required Monthly Revenue · To cover costs + profit".
                    It is neither: it covers OVERHEADS plus an owner's margin,
                    and takes no account of the materials and labour inside each
                    job. Calling it revenue overstated how much of a job's price
                    was available to pay the overheads. */}
                <p className="text-sm text-muted-foreground">
                  Gross profit needed each month to cover overheads + your drawings. Not turnover -
                  materials and labour on each job come out before this.
                </p>
              </div>
              <div className="text-center p-4 bg-elec-gray rounded-lg">
                <h4 className="font-medium mb-2">Jobs Per Month</h4>
                <p className="text-2xl font-bold text-elec-yellow">
                  {Math.ceil(monthlyCoverTarget / 500)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Assuming £500 gross profit per job, after its own materials and labour
                </p>
              </div>
              <div className="text-center p-4 bg-elec-gray rounded-lg">
                <h4 className="font-medium mb-2">Implied Margin</h4>
                {/* Was a hardcoded "44%" sitting beside a hardcoded "* 1.8".
                    Derived now, so the two can never drift apart. */}
                <p className="text-2xl font-bold text-elec-yellow">
                  {totals.impliedMarginPercent.toFixed(1)}%
                </p>
                <p className="text-sm text-muted-foreground">
                  A {OVERHEAD_COVER_MARKUP_PERCENT}% mark-up on overheads is a{' '}
                  {totals.impliedMarginPercent.toFixed(1)}% margin - not {
                    OVERHEAD_COVER_MARKUP_PERCENT
                  }
                  %
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessAnalytics;
