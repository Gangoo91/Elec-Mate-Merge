import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { IOSInput } from "@/components/ui/ios-input";
import {
  ChevronLeft,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  Wallet,
  Percent,
  Calendar,
  PoundSterling,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface MonthlyData {
  month: string;
  monthShort: string;
  income: number;
  expenses: number;
  cashFlow: number;
  cumulativeCash: number;
}

interface CashFlowInputs {
  averageMonthlyIncome: number;
  seasonalVariation: number;
  monthlyExpenses: number;
  startingCash: number;
  largeExpenseMonth: number;
  largeExpenseAmount: number;
}

const CashFlowProjector = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<CashFlowInputs>({
    averageMonthlyIncome: 8000,
    seasonalVariation: 20,
    monthlyExpenses: 6000,
    startingCash: 5000,
    largeExpenseMonth: 6,
    largeExpenseAmount: 3000
  });

  const updateInput = (field: keyof CashFlowInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const resetCalculator = () => {
    setInputs({
      averageMonthlyIncome: 8000,
      seasonalVariation: 20,
      monthlyExpenses: 6000,
      startingCash: 5000,
      largeExpenseMonth: 6,
      largeExpenseAmount: 3000
    });
  };

  const projections = useMemo((): MonthlyData[] => {
    const months = [
      { full: "January", short: "Jan" }, { full: "February", short: "Feb" },
      { full: "March", short: "Mar" }, { full: "April", short: "Apr" },
      { full: "May", short: "May" }, { full: "June", short: "Jun" },
      { full: "July", short: "Jul" }, { full: "August", short: "Aug" },
      { full: "September", short: "Sep" }, { full: "October", short: "Oct" },
      { full: "November", short: "Nov" }, { full: "December", short: "Dec" }
    ];
    const seasonalMultipliers = [0.8, 0.85, 0.95, 1.05, 1.1, 1.15, 1.2, 1.1, 1.05, 0.95, 0.85, 0.8];
    let cumulativeCash = inputs.startingCash;

    return months.map((month, index) => {
      const seasonalIncome = inputs.averageMonthlyIncome * seasonalMultipliers[index];
      let monthlyExpenses = inputs.monthlyExpenses;
      if (index + 1 === inputs.largeExpenseMonth) {
        monthlyExpenses += inputs.largeExpenseAmount;
      }
      const cashFlow = seasonalIncome - monthlyExpenses;
      cumulativeCash += cashFlow;

      return {
        month: month.full,
        monthShort: month.short,
        income: seasonalIncome,
        expenses: monthlyExpenses,
        cashFlow,
        cumulativeCash
      };
    });
  }, [inputs]);

  const minCashFlow = Math.min(...projections.map(p => p.cumulativeCash));
  const maxCashFlow = Math.max(...projections.map(p => p.cumulativeCash));
  const totalIncome = projections.reduce((sum, p) => sum + p.income, 0);
  const totalExpenses = projections.reduce((sum, p) => sum + p.expenses, 0);
  const netCashFlow = totalIncome - totalExpenses;
  const yearEndCash = projections[11].cumulativeCash;

  const getStatus = () => {
    if (minCashFlow < 0) return { color: "red", icon: AlertTriangle, text: "Cash goes negative" };
    if (minCashFlow < 2000) return { color: "amber", icon: AlertTriangle, text: "Low reserves" };
    return { color: "green", icon: CheckCircle2, text: "Healthy cash flow" };
  };
  const status = getStatus();

  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-dark to-black">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/10">
        <div className="px-4 py-3 flex items-center justify-between max-w-2xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white/70 hover:text-white hover:bg-white/10 active:scale-[0.98] touch-manipulation"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-ios-headline text-white font-semibold">Cash Flow</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={resetCalculator}
            className="text-white/70 hover:text-white hover:bg-white/10 active:scale-[0.98] touch-manipulation"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6 pb-32 sm:pb-6 max-w-2xl mx-auto">
        {/* Hero Result */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-elec-yellow/20 via-amber-500/15 to-orange-500/10
                     backdrop-blur-xl border border-elec-yellow/30 rounded-3xl p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/10 rounded-full blur-3xl" />
          <div className="relative space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-ios-caption-1 text-white/60 uppercase tracking-wide">Year-End Cash</p>
                <p className={`text-3xl sm:text-4xl font-bold mt-1 tabular-nums ${yearEndCash >= 0 ? "text-green-400" : "text-red-400"}`}>
                  £{yearEndCash.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className={`p-3 rounded-2xl bg-${status.color}-500/20 border border-${status.color}-500/30`}>
                <status.icon className={`h-6 w-6 text-${status.color}-400`} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {netCashFlow >= 0 ? (
                <ArrowUpRight className="h-4 w-4 text-green-400" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-400" />
              )}
              <span className={`text-ios-footnote ${netCashFlow >= 0 ? "text-green-400" : "text-red-400"}`}>
                £{Math.abs(netCashFlow).toLocaleString()} net {netCashFlow >= 0 ? "gain" : "loss"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Summary Stats */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <div className="flex-shrink-0 bg-green-500/10 border border-green-500/30 rounded-2xl p-4 min-w-[120px]">
            <p className="text-ios-caption-1 text-green-400">Income</p>
            <p className="text-ios-title-3 font-semibold text-white mt-1">£{(totalIncome/1000).toFixed(0)}k</p>
          </div>
          <div className="flex-shrink-0 bg-red-500/10 border border-red-500/30 rounded-2xl p-4 min-w-[120px]">
            <p className="text-ios-caption-1 text-red-400">Expenses</p>
            <p className="text-ios-title-3 font-semibold text-white mt-1">£{(totalExpenses/1000).toFixed(0)}k</p>
          </div>
          <div className="flex-shrink-0 bg-white/5 rounded-2xl p-4 min-w-[120px] border border-white/10">
            <p className="text-ios-caption-1 text-white/50">Lowest</p>
            <p className={`text-ios-title-3 font-semibold mt-1 ${minCashFlow < 0 ? "text-red-400" : "text-white"}`}>
              £{minCashFlow.toFixed(0)}
            </p>
          </div>
        </div>

        {/* Monthly Timeline - Horizontal Scroll */}
        <section>
          <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-3">
            12-Month Projection
          </p>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {projections.map((proj, i) => {
              const isLowest = proj.cumulativeCash === minCashFlow;
              const isLargeExpense = i + 1 === inputs.largeExpenseMonth;
              return (
                <motion.div
                  key={proj.monthShort}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`flex-shrink-0 w-[100px] rounded-2xl p-3 border ${
                    isLowest && minCashFlow < 2000
                      ? "bg-red-500/10 border-red-500/30"
                      : isLargeExpense
                      ? "bg-amber-500/10 border-amber-500/30"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <p className="text-ios-caption-1 text-white/60 font-medium">{proj.monthShort}</p>
                  <p className={`text-lg font-bold mt-1 tabular-nums ${
                    proj.cumulativeCash < 0 ? "text-red-400" :
                    proj.cumulativeCash < 2000 ? "text-amber-400" :
                    "text-white"
                  }`}>
                    £{(proj.cumulativeCash / 1000).toFixed(1)}k
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {proj.cashFlow >= 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-400" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-400" />
                    )}
                    <span className={`text-ios-caption-2 ${proj.cashFlow >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {proj.cashFlow >= 0 ? "+" : ""}£{(proj.cashFlow/1000).toFixed(1)}k
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Inputs */}
        <section>
          <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-3">
            Cash Flow Settings
          </p>
          <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 divide-y divide-white/10">
            <IOSInput
              label="Monthly Income"
              icon={<TrendingUp className="h-5 w-5" />}
              type="number"
              value={inputs.averageMonthlyIncome || ""}
              onChange={(e) => updateInput("averageMonthlyIncome", parseFloat(e.target.value) || 0)}
              hint="Average income"
            />
            <IOSInput
              label="Monthly Expenses"
              icon={<TrendingDown className="h-5 w-5" />}
              type="number"
              value={inputs.monthlyExpenses || ""}
              onChange={(e) => updateInput("monthlyExpenses", parseFloat(e.target.value) || 0)}
              hint="Regular costs"
            />
            <IOSInput
              label="Starting Cash"
              icon={<Wallet className="h-5 w-5" />}
              type="number"
              value={inputs.startingCash || ""}
              onChange={(e) => updateInput("startingCash", parseFloat(e.target.value) || 0)}
              hint="Current balance"
            />
            <IOSInput
              label="Seasonal Variation"
              icon={<Percent className="h-5 w-5" />}
              type="number"
              value={inputs.seasonalVariation || ""}
              onChange={(e) => updateInput("seasonalVariation", parseFloat(e.target.value) || 0)}
              hint="Income swing %"
            />
          </div>
        </section>

        {/* Large Expense */}
        <section>
          <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-3">
            Planned Large Expense
          </p>
          <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 divide-y divide-white/10">
            <IOSInput
              label="Month (1-12)"
              icon={<Calendar className="h-5 w-5" />}
              type="number"
              value={inputs.largeExpenseMonth || ""}
              onChange={(e) => updateInput("largeExpenseMonth", parseFloat(e.target.value) || 0)}
              hint="When expense occurs"
            />
            <IOSInput
              label="Amount"
              icon={<PoundSterling className="h-5 w-5" />}
              type="number"
              value={inputs.largeExpenseAmount || ""}
              onChange={(e) => updateInput("largeExpenseAmount", parseFloat(e.target.value) || 0)}
              hint="Additional cost"
            />
          </div>
        </section>

        {/* Analysis */}
        <div className={`rounded-2xl p-4 border ${
          status.color === "red" ? "bg-red-500/10 border-red-500/30" :
          status.color === "amber" ? "bg-amber-500/10 border-amber-500/30" :
          "bg-green-500/10 border-green-500/30"
        }`}>
          <div className="flex items-start gap-3">
            <status.icon className={`h-5 w-5 text-${status.color}-400 flex-shrink-0 mt-0.5`} />
            <div>
              <p className={`text-ios-subhead font-medium text-${status.color}-300`}>{status.text}</p>
              <p className={`text-ios-caption-1 text-${status.color}-200/70 mt-1`}>
                {minCashFlow < 0
                  ? "Consider credit facilities or improving payment terms."
                  : minCashFlow < 2000
                  ? "Build a larger cash buffer for security."
                  : "Projections show positive cash throughout the year."}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Reset */}
        <div className="hidden sm:block">
          <Button
            onClick={resetCalculator}
            variant="outline"
            className="w-full h-12 border-white/20 text-white hover:bg-white/10 active:scale-[0.98] touch-manipulation"
          >
            Reset Calculator
          </Button>
        </div>
      </main>

      {/* Bottom Action Bar - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 p-4 pb-safe">
        <Button
          onClick={resetCalculator}
          className="w-full h-14 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold text-ios-body active:scale-[0.98] touch-manipulation"
        >
          Reset Calculator
        </Button>
      </div>
    </div>
  );
};

export default CashFlowProjector;