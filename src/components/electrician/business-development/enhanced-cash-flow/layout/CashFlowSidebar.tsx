import { cn } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  FileText,
  Copy,
  Download,
} from "lucide-react";
import { FinancialMetrics } from "@/hooks/use-cash-flow";

interface Scenario {
  id: string;
  name: string;
}

interface Insight {
  type: "warning" | "info" | "success";
  message: string;
  priority: number;
}

interface CashFlowSidebarProps {
  financialMetrics: FinancialMetrics;
  scenarios: Scenario[];
  selectedScenario: string;
  onScenarioChange: (scenarioId: string) => void;
  insights: Insight[];
  onExportCSV: () => void;
  onCopySummary: () => void;
  onLoadTemplates: () => void;
  className?: string;
}

const formatCurrency = (n: number) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
};

export const CashFlowSidebar = ({
  financialMetrics,
  scenarios,
  selectedScenario,
  onScenarioChange,
  insights,
  onExportCSV,
  onCopySummary,
  onLoadTemplates,
  className,
}: CashFlowSidebarProps) => {
  const topInsights = insights.slice(0, 3);
  const isHealthy = financialMetrics.minBalance >= 0;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Financial Health Summary */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <div className="flex items-center gap-2">
          {isHealthy ? (
            <CheckCircle className="h-5 w-5 text-green-400" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-red-400" />
          )}
          <h3 className="font-semibold text-white">
            {isHealthy ? "Healthy Cash Flow" : "Cash Flow Warning"}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp className="h-3.5 w-3.5 text-green-400" />
              <span className="text-xs text-green-400">Income</span>
            </div>
            <p className="text-lg font-bold text-white">
              {formatCurrency(financialMetrics.totalIncome)}
            </p>
            <p className="text-xs text-white/50">
              {formatCurrency(financialMetrics.avgMonthlyIncome)}/mo
            </p>
          </div>

          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingDown className="h-3.5 w-3.5 text-red-400" />
              <span className="text-xs text-red-400">Expenses</span>
            </div>
            <p className="text-lg font-bold text-white">
              {formatCurrency(financialMetrics.totalExpenses)}
            </p>
            <p className="text-xs text-white/50">
              {formatCurrency(financialMetrics.avgMonthlyExpenses)}/mo
            </p>
          </div>

          <div
            className={cn(
              "p-3 rounded-xl border",
              financialMetrics.netProfit >= 0
                ? "bg-green-500/10 border-green-500/20"
                : "bg-red-500/10 border-red-500/20"
            )}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Wallet className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs text-blue-400">Net Profit</span>
            </div>
            <p className="text-lg font-bold text-white">
              {formatCurrency(financialMetrics.netProfit)}
            </p>
            <p className="text-xs text-white/50">
              {financialMetrics.profitMargin.toFixed(1)}% margin
            </p>
          </div>

          <div
            className={cn(
              "p-3 rounded-xl border",
              financialMetrics.minBalance >= 0
                ? "bg-blue-500/10 border-blue-500/20"
                : "bg-red-500/10 border-red-500/20"
            )}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <PiggyBank className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-xs text-amber-400">Cash Runway</span>
            </div>
            <p className="text-lg font-bold text-white">
              {financialMetrics.cashRunway} mo
            </p>
            <p className="text-xs text-white/50">
              Min: {formatCurrency(financialMetrics.minBalance)}
            </p>
          </div>
        </div>
      </div>

      {/* Scenario Switcher */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
        <h3 className="font-semibold text-white text-sm">Active Scenario</h3>
        <div className="flex flex-wrap gap-2">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => onScenarioChange(scenario.id)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                selectedScenario === scenario.id
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
              )}
            >
              {scenario.name}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
        <h3 className="font-semibold text-white text-sm">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={onLoadTemplates}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/20 transition-colors"
          >
            <FileText className="h-4 w-4" />
            <span>Load Template</span>
          </button>
          <button
            onClick={onExportCSV}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={onCopySummary}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 transition-colors"
          >
            <Copy className="h-4 w-4" />
            <span>Copy Summary</span>
          </button>
        </div>
      </div>

      {/* Top Insights */}
      {topInsights.length > 0 && (
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-400" />
            <h3 className="font-semibold text-white text-sm">Top Insights</h3>
          </div>
          <div className="space-y-2">
            {topInsights.map((insight, index) => (
              <div
                key={index}
                className={cn(
                  "p-2.5 rounded-lg text-xs border",
                  insight.type === "warning" &&
                    "bg-amber-500/10 border-amber-500/20 text-amber-300",
                  insight.type === "success" &&
                    "bg-green-500/10 border-green-500/20 text-green-300",
                  insight.type === "info" &&
                    "bg-blue-500/10 border-blue-500/20 text-blue-300"
                )}
              >
                {insight.message}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
