import { useState } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, BarChart3, ChevronLeft, ChevronRight } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { MonthlyProjection } from "@/hooks/use-cash-flow";

interface CashFlowChartCardProps {
  projections: MonthlyProjection[];
  selectedScenario: string;
  className?: string;
}

type ChartType = "line" | "bar";

export const CashFlowChartCard = ({
  projections,
  selectedScenario,
  className,
}: CashFlowChartCardProps) => {
  const [chartType, setChartType] = useState<ChartType>("line");

  const lineChartData = projections.map((p) => ({
    month: p.monthName.slice(0, 3),
    income: p.income,
    expenses: p.expenses,
    balance: p.cumulativeBalance,
  }));

  const barChartData = projections.map((p) => ({
    month: p.monthName.slice(0, 3),
    value: p.netFlow,
    isPositive: p.netFlow >= 0,
  }));

  return (
    <div
      className={cn(
        "p-4 rounded-2xl bg-white/5 border border-white/10",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {chartType === "line" ? (
            <TrendingUp className="h-5 w-5 text-blue-400" />
          ) : (
            <BarChart3 className="h-5 w-5 text-blue-400" />
          )}
          <h3 className="font-semibold text-white text-sm sm:text-base">
            {chartType === "line" ? "Cash Flow Trends" : "Monthly Net Flow"}
          </h3>
        </div>

        {/* Chart Type Toggle */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10">
          <button
            onClick={() => setChartType("line")}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              chartType === "line"
                ? "bg-blue-500/20 text-blue-400"
                : "text-white/40 hover:text-white/60"
            )}
          >
            <TrendingUp className="h-4 w-4" />
          </button>
          <button
            onClick={() => setChartType("bar")}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              chartType === "bar"
                ? "bg-blue-500/20 text-blue-400"
                : "text-white/40 hover:text-white/60"
            )}
          >
            <BarChart3 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="aspect-[16/10] sm:aspect-[2/1] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "line" ? (
            <LineChart
              data={lineChartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis
                dataKey="month"
                stroke="rgba(255,255,255,0.5)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="rgba(255,255,255,0.5)"
                fontSize={11}
                width={45}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "white",
                  fontSize: "12px",
                }}
                formatter={(value: number, name: string) => [
                  `£${value.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}`,
                  name === "income"
                    ? "Income"
                    : name === "expenses"
                    ? "Expenses"
                    : "Balance",
                ]}
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "#10b981" }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "#ef4444" }}
              />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#fbbf24"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "#fbbf24" }}
              />
            </LineChart>
          ) : (
            <BarChart
              data={barChartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis
                dataKey="month"
                stroke="rgba(255,255,255,0.5)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="rgba(255,255,255,0.5)"
                fontSize={11}
                width={45}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "white",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [
                  `£${value.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}`,
                  "Net Flow",
                ]}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {barChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isPositive ? "#10b981" : "#ef4444"}
                  />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      {chartType === "line" && (
        <div className="flex items-center justify-center gap-4 mt-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-green-500 rounded-full" />
            <span className="text-white/60">Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-red-500 rounded-full" />
            <span className="text-white/60">Expenses</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-yellow-500 rounded-full" />
            <span className="text-white/60">Balance</span>
          </div>
        </div>
      )}
    </div>
  );
};
