import { cn } from "@/lib/utils";
import { MonthlyProjection, FinancialMetrics } from "@/hooks/use-cash-flow";

interface CashFlowProjectionsViewProps {
  projections: MonthlyProjection[];
  financialMetrics: FinancialMetrics;
  scenarioName: string;
}

const formatCurrency = (n: number) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
};

export const CashFlowProjectionsView = ({
  projections,
  financialMetrics,
  scenarioName,
}: CashFlowProjectionsViewProps) => {
  return (
    <div className="space-y-6">
      {/* Monthly Grid */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projections.map((month, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-white">{month.monthName}</h4>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                {scenarioName}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Income</span>
                <span className="text-green-400 font-medium">
                  {formatCurrency(month.income)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Expenses</span>
                <span className="text-red-400 font-medium">
                  {formatCurrency(month.expenses)}
                </span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2">
                <span className="text-white/60">Net</span>
                <span
                  className={cn(
                    "font-medium",
                    month.netFlow >= 0 ? "text-green-400" : "text-red-400"
                  )}
                >
                  {formatCurrency(month.netFlow)}
                </span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-white">Balance</span>
                <span
                  className={cn(
                    month.cumulativeBalance >= 0 ? "text-green-400" : "text-red-400"
                  )}
                >
                  {formatCurrency(month.cumulativeBalance)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Annual Summary */}
      <div className="pt-4 border-t border-white/10">
        <h4 className="text-white font-medium mb-4">Annual Financial Summary</h4>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
            <h5 className="text-green-400 text-xs font-medium mb-1">Total Income</h5>
            <p className="text-xl font-bold text-white">
              {formatCurrency(financialMetrics.totalIncome)}
            </p>
            <p className="text-xs text-white/60 mt-1">
              Avg: {formatCurrency(financialMetrics.avgMonthlyIncome)}/mo
            </p>
          </div>

          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
            <h5 className="text-red-400 text-xs font-medium mb-1">Total Expenses</h5>
            <p className="text-xl font-bold text-white">
              {formatCurrency(financialMetrics.totalExpenses)}
            </p>
            <p className="text-xs text-white/60 mt-1">
              Avg: {formatCurrency(financialMetrics.avgMonthlyExpenses)}/mo
            </p>
          </div>

          <div
            className={cn(
              "p-4 rounded-xl border",
              financialMetrics.netProfit >= 0
                ? "bg-green-500/10 border-green-500/30"
                : "bg-red-500/10 border-red-500/30"
            )}
          >
            <h5
              className={cn(
                "text-xs font-medium mb-1",
                financialMetrics.netProfit >= 0 ? "text-green-400" : "text-red-400"
              )}
            >
              Net Profit
            </h5>
            <p className="text-xl font-bold text-white">
              {formatCurrency(financialMetrics.netProfit)}
            </p>
            <p className="text-xs text-white/60 mt-1">
              Margin: {financialMetrics.profitMargin.toFixed(1)}%
            </p>
          </div>

          <div
            className={cn(
              "p-4 rounded-xl border",
              financialMetrics.minBalance >= 0
                ? "bg-green-500/10 border-green-500/30"
                : "bg-red-500/10 border-red-500/30"
            )}
          >
            <h5
              className={cn(
                "text-xs font-medium mb-1",
                financialMetrics.minBalance >= 0 ? "text-green-400" : "text-red-400"
              )}
            >
              Min Balance
            </h5>
            <p className="text-xl font-bold text-white">
              {formatCurrency(financialMetrics.minBalance)}
            </p>
            <p className="text-xs text-white/60 mt-1">
              Runway: {financialMetrics.cashRunway} months
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
