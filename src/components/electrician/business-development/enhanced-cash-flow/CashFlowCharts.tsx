import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { MonthlyProjection } from "@/hooks/use-cash-flow";
import { TrendingUp, BarChart3, PieChart as PieChartIcon } from "lucide-react";

interface CashFlowChartsProps {
  projections: MonthlyProjection[];
  selectedScenario: string;
}

export const CashFlowCharts = ({ projections, selectedScenario }: CashFlowChartsProps) => {
  const lineChartData = projections.map(p => ({
    month: p.monthName,
    income: p.income,
    expenses: p.expenses,
    balance: p.cumulativeBalance,
    netFlow: p.netFlow
  }));

  const waterfallData = projections.map((p, index) => ({
    month: p.monthName,
    value: p.netFlow,
    cumulative: p.cumulativeBalance,
    isPositive: p.netFlow >= 0
  }));

  // Aggregate income breakdown for pie chart
  const incomeBreakdown = projections.reduce((acc, month) => {
    Object.entries(month.incomeBreakdown).forEach(([key, value]) => {
      acc[key] = (acc[key] || 0) + value;
    });
    return acc;
  }, {} as { [key: string]: number });

  const expenseBreakdown = projections.reduce((acc, month) => {
    Object.entries(month.expenseBreakdown).forEach(([key, value]) => {
      acc[key] = (acc[key] || 0) + value;
    });
    return acc;
  }, {} as { [key: string]: number });

  const incomeColors = ['#10b981', '#06b6d4', '#8b5cf6', '#f59e0b', '#ef4444'];
  const expenseColors = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#06b6d4'];

  const incomePieData = Object.entries(incomeBreakdown).map(([name, value], index) => ({
    name,
    value,
    color: incomeColors[index % incomeColors.length]
  }));

  const expensePieData = Object.entries(expenseBreakdown).map(([name, value], index) => ({
    name,
    value,
    color: expenseColors[index % expenseColors.length]
  }));

  return (
    <div className="space-y-6">
      {/* Monthly Trend Line Chart */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Monthly Cash Flow Trends ({selectedScenario} scenario)
          </CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="month" 
                stroke="#9ca3af"
                fontSize={12}
              />
              <YAxis 
                stroke="#9ca3af"
                fontSize={12}
                tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: number, name: string) => [
                  `£${value.toFixed(0)}`,
                  name === 'income' ? 'Income' :
                  name === 'expenses' ? 'Expenses' :
                  name === 'balance' ? 'Balance' : 'Net Flow'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="#fbbf24" 
                strokeWidth={3}
                dot={{ fill: '#fbbf24', strokeWidth: 2, r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Net Flow Waterfall */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-elec-yellow" />
            Monthly Net Cash Flow
          </CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waterfallData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="month" 
                stroke="#9ca3af"
                fontSize={12}
              />
              <YAxis 
                stroke="#9ca3af"
                fontSize={12}
                tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: number) => [`£${value.toFixed(0)}`, 'Net Flow']}
              />
              <Bar 
                dataKey="value" 
                fill={(entry: any) => entry.isPositive ? '#10b981' : '#ef4444'}
              >
                {waterfallData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.isPositive ? '#10b981' : '#ef4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Income and Expense Breakdown */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-elec-yellow" />
              Annual Income Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incomePieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {incomePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => [`£${value.toFixed(0)}`, 'Annual Total']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {incomePieData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-white font-medium">£{item.value.toFixed(0)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-elec-yellow" />
              Annual Expense Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensePieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expensePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => [`£${value.toFixed(0)}`, 'Annual Total']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {expensePieData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-white font-medium">£{item.value.toFixed(0)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};