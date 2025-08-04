import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, Target, BarChart3, DollarSign } from "lucide-react";

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

  const totalStartup = Object.values(startupInputs).reduce((sum: number, value: number) => sum + (value || 0), 0);
  const totalMonthly = Object.values(monthlyInputs).reduce((sum: number, value: number) => sum + (value || 0), 0);

  // Prepare startup cost breakdown data
  const startupData = Object.entries(startupInputs)
    .filter(([_, value]) => value > 0)
    .map(([key, value]: [string, number]) => ({
      name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      value: value,
      percentage: ((value / totalStartup) * 100).toFixed(1)
    }));

  // Prepare monthly cost breakdown data
  const monthlyData = Object.entries(monthlyInputs)
    .filter(([_, value]) => value > 0)
    .map(([key, value]: [string, number]) => ({
      name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      value: value,
      percentage: ((value / totalMonthly) * 100).toFixed(1)
    }));

  // Three-year projection data
  const projectionData = [
    { year: 'Year 1', startup: totalStartup, monthly: totalMonthly * 12, total: totalStartup + (totalMonthly * 12) },
    { year: 'Year 2', startup: 0, monthly: totalMonthly * 12, total: totalMonthly * 12 },
    { year: 'Year 3', startup: 0, monthly: totalMonthly * 12, total: totalMonthly * 12 },
  ];

  // Break-even analysis
  const monthlyRevenueTarget = totalMonthly * 1.8; // 80% markup
  const dailyRevenueTarget = monthlyRevenueTarget / 22;
  const breakEvenMonths = totalStartup > 0 ? Math.ceil(totalStartup / (monthlyRevenueTarget - totalMonthly)) : 0;

  const COLORS = ['#F7931E', '#FFB366', '#FF8C42', '#FF6B1A', '#E65100', '#D84315', '#BF360C', '#A6642A'];

  return (
    <div className="space-y-6">
      {/* ROI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Investment</p>
                <p className="text-2xl font-bold text-elec-yellow">£{totalStartup.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-elec-yellow/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Target</p>
                <p className="text-2xl font-bold text-elec-yellow">£{monthlyRevenueTarget.toLocaleString()}</p>
              </div>
              <Target className="h-8 w-8 text-elec-yellow/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Daily Target</p>
                <p className="text-2xl font-bold text-elec-yellow">£{dailyRevenueTarget.toFixed(0)}</p>
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
                <p className="text-2xl font-bold text-elec-yellow">{breakEvenMonths}mo</p>
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
                  label={({ name, percentage }) => `${percentage}%`}
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
              <span className="text-elec-yellow font-semibold">{breakEvenMonths} months</span>
            </div>
            <Progress value={Math.min((12 / breakEvenMonths) * 100, 100)} className="h-3" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-elec-gray rounded-lg">
                <h4 className="font-medium mb-2">Required Monthly Revenue</h4>
                <p className="text-2xl font-bold text-elec-yellow">£{monthlyRevenueTarget.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">To cover costs + profit</p>
              </div>
              <div className="text-center p-4 bg-elec-gray rounded-lg">
                <h4 className="font-medium mb-2">Jobs Per Month</h4>
                <p className="text-2xl font-bold text-elec-yellow">{Math.ceil(monthlyRevenueTarget / 500)}</p>
                <p className="text-sm text-muted-foreground">Assuming £500 average job</p>
              </div>
              <div className="text-center p-4 bg-elec-gray rounded-lg">
                <h4 className="font-medium mb-2">Profit Margin</h4>
                <p className="text-2xl font-bold text-elec-yellow">44%</p>
                <p className="text-sm text-muted-foreground">After covering all costs</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessAnalytics;