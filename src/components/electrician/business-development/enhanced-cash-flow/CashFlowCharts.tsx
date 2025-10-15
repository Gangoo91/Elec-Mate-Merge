import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      {/* Monthly Trend Line Chart - Taller on mobile */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg md:text-xl text-elec-light flex flex-col sm:flex-row sm:items-center gap-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-elec-yellow" />
              <span>Monthly Cash Flow Trends</span>
            </div>
            <Badge variant="outline" className="w-fit text-xs sm:text-sm">
              {selectedScenario.charAt(0).toUpperCase() + selectedScenario.slice(1)}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] sm:h-80 pb-3 sm:pb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineChartData} margin={{ top: 20, right: 10, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="month" 
                stroke="rgba(255,255,255,0.8)"
                fontSize={10}
                angle={-60}
                textAnchor="end"
                height={100}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.8)"
                fontSize={10}
                width={50}
                tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--elec-card))', 
                  border: '1px solid rgba(247, 209, 84, 0.3)',
                  borderRadius: '8px',
                  color: 'hsl(var(--elec-light))'
                }}
                formatter={(value: number, name: string) => [
                  `£${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
                  name === 'income' ? 'Income' :
                  name === 'expenses' ? 'Expenses' :
                  name === 'balance' ? 'Balance' : 'Net Flow'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="#fbbf24" 
                strokeWidth={3}
                dot={{ fill: '#fbbf24', strokeWidth: 2, r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
        
        {/* Mobile-friendly summary cards below chart */}
        <CardContent className="pt-0 pb-4 sm:pb-6">
          <div className="overflow-x-auto -mx-3 sm:-mx-6 px-3 sm:px-6 pb-2">
            <div className="flex gap-2 sm:gap-3 min-w-max sm:min-w-0 sm:grid sm:grid-cols-3 md:grid-cols-6">
              {projections.slice(0, 6).map(month => (
                <Card key={month.month} className="min-w-[100px] sm:min-w-0 p-2 sm:p-3 bg-elec-dark/50 border-elec-yellow/10">
                  <p className="text-xs text-elec-light/60 text-center mb-1">{month.monthName}</p>
                  <p className={`text-sm sm:text-base font-bold text-center ${
                    month.cumulativeBalance >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    £{(month.cumulativeBalance / 1000).toFixed(1)}k
                  </p>
                  <p className="text-xs text-elec-light/60 text-center mt-1">
                    {month.netFlow >= 0 ? '+' : ''}{(month.netFlow / 1000).toFixed(1)}k
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Net Flow Waterfall */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg md:text-xl text-elec-light flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-elec-yellow" />
            Monthly Net Cash Flow
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[350px] sm:h-64 pb-4 sm:pb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waterfallData} margin={{ top: 20, right: 10, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="month" 
                stroke="rgba(255,255,255,0.8)"
                fontSize={10}
                angle={-60}
                textAnchor="end"
                height={100}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.8)"
                fontSize={10}
                width={50}
                tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--elec-card))', 
                  border: '1px solid rgba(247, 209, 84, 0.3)',
                  borderRadius: '8px',
                  color: 'hsl(var(--elec-light))'
                }}
                formatter={(value: number) => [`£${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, 'Net Flow']}
              />
              <Bar 
                dataKey="value" 
                fill="#10b981"
                radius={[4, 4, 0, 0]}
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
            <CardTitle className="text-elec-light flex items-center gap-2">
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
                     <span className="text-elec-light/80">{item.name}</span>
                  </div>
                  <span className="text-elec-light font-medium">£{item.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-elec-light flex items-center gap-2">
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
                     <span className="text-elec-light/80">{item.name}</span>
                  </div>
                  <span className="text-elec-light font-medium">£{item.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};