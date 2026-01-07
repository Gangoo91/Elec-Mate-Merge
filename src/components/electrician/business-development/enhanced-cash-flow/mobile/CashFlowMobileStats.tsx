import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react";
import { FinancialMetrics } from "@/hooks/use-cash-flow";

interface CashFlowMobileStatsProps {
  financialMetrics: FinancialMetrics;
  className?: string;
}

const formatCurrency = (n: number) => {
  if (Math.abs(n) >= 1000) {
    return `£${(n / 1000).toFixed(1)}k`;
  }
  return `£${n.toFixed(0)}`;
};

export const CashFlowMobileStats = ({
  financialMetrics,
  className,
}: CashFlowMobileStatsProps) => {
  const stats = [
    {
      label: "Income",
      value: formatCurrency(financialMetrics.totalIncome),
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
    },
    {
      label: "Expenses",
      value: formatCurrency(financialMetrics.totalExpenses),
      icon: TrendingDown,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
    },
    {
      label: "Profit",
      value: formatCurrency(financialMetrics.netProfit),
      icon: Wallet,
      color: financialMetrics.netProfit >= 0 ? "text-green-400" : "text-red-400",
      bgColor: financialMetrics.netProfit >= 0 ? "bg-green-500/10" : "bg-red-500/10",
      borderColor: financialMetrics.netProfit >= 0 ? "border-green-500/20" : "border-red-500/20",
    },
    {
      label: "Runway",
      value: `${financialMetrics.cashRunway}mo`,
      icon: PiggyBank,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
  ];

  return (
    <div className={cn("px-4 py-3 bg-white/5 border-b border-white/10", className)}>
      <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex gap-3 min-w-max">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-xl border min-w-[100px]",
                  stat.bgColor,
                  stat.borderColor
                )}
              >
                <Icon className={cn("h-4 w-4", stat.color)} />
                <div>
                  <p className="text-xs text-white/50">{stat.label}</p>
                  <p className={cn("text-sm font-bold", stat.color)}>{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
