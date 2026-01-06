import { useState } from "react";
import { Helmet } from "react-helmet";
import {
  TrendingUp,
  Download,
  FileSpreadsheet,
  Copy,
  Plus,
  Minus,
  ChevronDown,
  Info,
  Wallet,
  PiggyBank,
  Calendar,
  Settings,
  BarChart3,
  Lightbulb,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useCashFlow } from "@/hooks/use-cash-flow";
import { CashFlowCharts } from "@/components/electrician/business-development/enhanced-cash-flow/CashFlowCharts";
import { ScenarioPlanner } from "@/components/electrician/business-development/enhanced-cash-flow/ScenarioPlanner";
import { FinancialInsights } from "@/components/electrician/business-development/enhanced-cash-flow/FinancialInsights";
import { FinancialHealthSummary } from "@/components/electrician/business-development/enhanced-cash-flow/FinancialHealthSummary";
import { QuickStartTemplates } from "@/components/electrician/business-development/enhanced-cash-flow/QuickStartTemplates";
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorSelect,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";

const CashFlowPlanner = () => {
  const config = CALCULATOR_CONFIG["business"];
  const { toast } = useToast();
  const {
    state,
    monthlyProjections,
    insights,
    financialMetrics,
    updateIncomeStream,
    addIncomeStream,
    removeIncomeStream,
    updateExpenseCategory,
    addExpenseCategory,
    removeExpenseCategory,
    updateSettings,
    loadTemplate,
    exportToCSV,
    copySummaryToClipboard,
  } = useCashFlow();

  const [showTemplates, setShowTemplates] = useState(state.incomeStreams.length === 0);
  const [showSetup, setShowSetup] = useState(true);
  const [showCharts, setShowCharts] = useState(false);
  const [showScenarios, setShowScenarios] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [showProjections, setShowProjections] = useState(false);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);

  const [newIncomeForm, setNewIncomeForm] = useState({
    name: "",
    amount: 0,
    frequency: "monthly" as const,
    paymentDelayDays: 14,
    growth: 0.05,
  });
  const [newExpenseForm, setNewExpenseForm] = useState({
    name: "",
    amount: 0,
    frequency: "monthly" as const,
    variable: true,
    growth: 0.03,
  });

  const handleAddIncome = () => {
    if (newIncomeForm.name && newIncomeForm.amount > 0) {
      addIncomeStream(newIncomeForm);
      setNewIncomeForm({
        name: "",
        amount: 0,
        frequency: "monthly",
        paymentDelayDays: 14,
        growth: 0.05,
      });
      setShowAddIncome(false);
      toast({
        title: "Income Stream Added",
        description: `${newIncomeForm.name} has been added to your cash flow model.`,
        variant: "success",
      });
    }
  };

  const handleAddExpense = () => {
    if (newExpenseForm.name && newExpenseForm.amount > 0) {
      addExpenseCategory(newExpenseForm);
      setNewExpenseForm({
        name: "",
        amount: 0,
        frequency: "monthly",
        variable: true,
        growth: 0.03,
      });
      setShowAddExpense(false);
      toast({
        title: "Expense Category Added",
        description: `${newExpenseForm.name} has been added to your cash flow model.`,
        variant: "success",
      });
    }
  };

  const handleLoadTemplate = (incomeStreams: any[], expenseCategories: any[]) => {
    loadTemplate(incomeStreams, expenseCategories);
    setShowTemplates(false);
    toast({
      title: "Template Loaded",
      description: "Your cash flow template has been loaded. Review and adjust as needed.",
      variant: "success",
    });
  };

  const handleExportCSV = () => {
    exportToCSV();
    toast({
      title: "Exported",
      description: "Cash flow data exported to CSV",
      variant: "success",
    });
  };

  const handleCopySummary = () => {
    copySummaryToClipboard();
    toast({
      title: "Copied",
      description: "Cash flow summary copied to clipboard",
      variant: "success",
    });
  };

  const formatCurrency = (n: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(n);
  };

  const monthWithNegativeBalance = monthlyProjections.findIndex((p) => p.cumulativeBalance < 0) + 1;

  const frequencyOptions = [
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "seasonal", label: "Seasonal" },
  ];

  const expenseFrequencyOptions = [
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "annual", label: "Annual" },
  ];

  const vatQuarterOptions = [
    { value: "1", label: "Jan/Apr/Jul/Oct" },
    { value: "2", label: "Feb/May/Aug/Nov" },
    { value: "3", label: "Mar/Jun/Sep/Dec" },
  ];

  const vatSchemeOptions = [
    { value: "standard", label: "Standard" },
    { value: "flat-rate", label: "Flat Rate" },
  ];

  return (
    <div className="space-y-4">
      <Helmet>
        <title>Cash Flow Planner UK for Electricians | Forecast & Scenarios</title>
        <meta
          name="description"
          content="Plan electrician cash flow with projections, VAT quarters, scenarios and insights. Mobile-first."
        />
        <link rel="canonical" href="/electrician/business-development/tools/cash-flow" />
      </Helmet>

      {/* Header Card */}
      <CalculatorCard
        category="business"
        title="Advanced Cash Flow Planner"
        description="Professional cash flow forecasting with scenario planning and insights"
        badge="Planning"
      >
        {/* Export Options */}
        <div className="flex justify-end mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-10 px-4 flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-white/10 w-48">
              <DropdownMenuItem
                onClick={handleExportCSV}
                className="text-white py-3 cursor-pointer focus:bg-white/10"
              >
                <FileSpreadsheet className="h-5 w-5 mr-3" />
                <span>Export to CSV</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleCopySummary}
                className="text-white py-3 cursor-pointer focus:bg-white/10"
              >
                <Copy className="h-5 w-5 mr-3" />
                <span>Copy Summary</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Quick Health Summary */}
        {state.incomeStreams.length > 0 && (
          <div className="mb-4">
            <div
              className={cn(
                "flex items-center gap-2 p-3 rounded-xl border",
                financialMetrics.minBalance >= 0
                  ? "bg-green-500/10 border-green-500/30"
                  : "bg-red-500/10 border-red-500/30"
              )}
            >
              {financialMetrics.minBalance >= 0 ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-400" />
              )}
              <span
                className={cn(
                  "font-medium text-sm",
                  financialMetrics.minBalance >= 0 ? "text-green-400" : "text-red-400"
                )}
              >
                {financialMetrics.minBalance >= 0
                  ? `Healthy - ${financialMetrics.cashRunway} months runway`
                  : `Warning - Cash flow issues in month ${monthWithNegativeBalance}`}
              </span>
            </div>
          </div>
        )}

        {/* Quick Stats Grid */}
        {state.incomeStreams.length > 0 && (
          <ResultsGrid columns={2}>
            <ResultValue
              label="Annual Income"
              value={formatCurrency(financialMetrics.totalIncome)}
              category="business"
              size="sm"
            />
            <ResultValue
              label="Annual Expenses"
              value={formatCurrency(financialMetrics.totalExpenses)}
              category="business"
              size="sm"
            />
            <ResultValue
              label="Net Profit"
              value={formatCurrency(financialMetrics.netProfit)}
              category="business"
              size="sm"
            />
            <ResultValue
              label="Profit Margin"
              value={`${financialMetrics.profitMargin.toFixed(1)}%`}
              category="business"
              size="sm"
            />
          </ResultsGrid>
        )}
      </CalculatorCard>

      {/* Quick Start Templates */}
      {showTemplates && (
        <div className="mb-4">
          <QuickStartTemplates onLoadTemplate={handleLoadTemplate} />
        </div>
      )}

      {/* Financial Health Summary */}
      {state.incomeStreams.length > 0 && (
        <div className="mb-4">
          <FinancialHealthSummary
            financialMetrics={financialMetrics}
            emergencyFundTarget={state.emergencyFundTarget}
            monthWithNegativeBalance={monthWithNegativeBalance > 0 ? monthWithNegativeBalance : undefined}
          />
        </div>
      )}

      {/* Setup Section */}
      <Collapsible open={showSetup} onOpenChange={setShowSetup}>
        <div className="calculator-card overflow-hidden" style={{ borderColor: "#60a5fa15" }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <Plus className="h-4 w-4 text-blue-400" />
              <span className="text-sm sm:text-base font-medium text-blue-300">
                Setup Your Business
              </span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-white/80 transition-transform duration-200",
                showSetup && "rotate-180"
              )}
            />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 pt-0 space-y-6">
            {/* Income Streams */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium text-white/80">Income Streams</span>
                </div>
                <button
                  onClick={() => setShowAddIncome(!showAddIncome)}
                  className="h-10 px-3 flex items-center gap-2 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm hover:bg-green-500/20 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add</span>
                </button>
              </div>

              {state.incomeStreams.map((stream) => (
                <div
                  key={stream.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-white text-sm truncate flex-1 mr-2">
                      {stream.name}
                    </h4>
                    <button
                      onClick={() => removeIncomeStream(stream.id)}
                      className="h-8 w-8 flex items-center justify-center rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <CalculatorInput
                      label="Amount"
                      unit="£"
                      type="text"
                      inputMode="decimal"
                      value={stream.amount.toString()}
                      onChange={(val) =>
                        updateIncomeStream(stream.id, { amount: parseFloat(val) || 0 })
                      }
                    />
                    <CalculatorSelect
                      label="Frequency"
                      value={stream.frequency}
                      onChange={(val) => updateIncomeStream(stream.id, { frequency: val as any })}
                      options={frequencyOptions}
                    />
                    <CalculatorInput
                      label="Payment Delay"
                      unit="days"
                      type="text"
                      inputMode="numeric"
                      value={stream.paymentDelayDays.toString()}
                      onChange={(val) =>
                        updateIncomeStream(stream.id, { paymentDelayDays: parseInt(val) || 0 })
                      }
                    />
                    <CalculatorInput
                      label="Annual Growth"
                      unit="%"
                      type="text"
                      inputMode="decimal"
                      value={(stream.growth * 100).toString()}
                      onChange={(val) =>
                        updateIncomeStream(stream.id, { growth: (parseFloat(val) || 0) / 100 })
                      }
                    />
                  </div>
                </div>
              ))}

              {showAddIncome && (
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-3">
                  <h4 className="font-medium text-blue-300 text-sm">Add New Income Stream</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <CalculatorInput
                      label="Name"
                      type="text"
                      value={newIncomeForm.name}
                      onChange={(val) => setNewIncomeForm((prev) => ({ ...prev, name: val }))}
                      placeholder="e.g., Regular Contracts"
                    />
                    <CalculatorInput
                      label="Amount"
                      unit="£"
                      type="text"
                      inputMode="decimal"
                      value={newIncomeForm.amount.toString()}
                      onChange={(val) =>
                        setNewIncomeForm((prev) => ({ ...prev, amount: parseFloat(val) || 0 }))
                      }
                    />
                    <CalculatorSelect
                      label="Frequency"
                      value={newIncomeForm.frequency}
                      onChange={(val) =>
                        setNewIncomeForm((prev) => ({ ...prev, frequency: val as any }))
                      }
                      options={frequencyOptions}
                    />
                    <CalculatorInput
                      label="Payment Delay"
                      unit="days"
                      type="text"
                      inputMode="numeric"
                      value={newIncomeForm.paymentDelayDays.toString()}
                      onChange={(val) =>
                        setNewIncomeForm((prev) => ({ ...prev, paymentDelayDays: parseInt(val) || 0 }))
                      }
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleAddIncome}
                      className="h-10 px-4 rounded-xl font-medium text-sm text-black"
                      style={{
                        background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                      }}
                    >
                      Add Income
                    </button>
                    <button
                      onClick={() => setShowAddIncome(false)}
                      className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-white/70"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Expense Categories */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PiggyBank className="h-4 w-4 text-red-400" />
                  <span className="text-sm font-medium text-white/80">Expense Categories</span>
                </div>
                <button
                  onClick={() => setShowAddExpense(!showAddExpense)}
                  className="h-10 px-3 flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm hover:bg-red-500/20 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add</span>
                </button>
              </div>

              {state.expenseCategories.map((category) => (
                <div
                  key={category.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-white text-sm truncate">{category.name}</h4>
                      {category.variable && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                          Variable
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => removeExpenseCategory(category.id)}
                      className="h-8 w-8 flex items-center justify-center rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <CalculatorInput
                      label="Amount"
                      unit="£"
                      type="text"
                      inputMode="decimal"
                      value={category.amount.toString()}
                      onChange={(val) =>
                        updateExpenseCategory(category.id, { amount: parseFloat(val) || 0 })
                      }
                    />
                    <CalculatorSelect
                      label="Frequency"
                      value={category.frequency}
                      onChange={(val) =>
                        updateExpenseCategory(category.id, { frequency: val as any })
                      }
                      options={expenseFrequencyOptions}
                    />
                    <CalculatorInput
                      label="Annual Growth"
                      unit="%"
                      type="text"
                      inputMode="decimal"
                      value={(category.growth * 100).toString()}
                      onChange={(val) =>
                        updateExpenseCategory(category.id, { growth: (parseFloat(val) || 0) / 100 })
                      }
                    />
                    {(category.frequency === "quarterly" || category.frequency === "annual") && (
                      <CalculatorInput
                        label="Timing (Month)"
                        type="text"
                        inputMode="numeric"
                        value={(category.timing || 1).toString()}
                        onChange={(val) =>
                          updateExpenseCategory(category.id, { timing: parseInt(val) || 1 })
                        }
                      />
                    )}
                  </div>
                </div>
              ))}

              {showAddExpense && (
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-3">
                  <h4 className="font-medium text-blue-300 text-sm">Add New Expense Category</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <CalculatorInput
                      label="Name"
                      type="text"
                      value={newExpenseForm.name}
                      onChange={(val) => setNewExpenseForm((prev) => ({ ...prev, name: val }))}
                      placeholder="e.g., Van Insurance"
                    />
                    <CalculatorInput
                      label="Amount"
                      unit="£"
                      type="text"
                      inputMode="decimal"
                      value={newExpenseForm.amount.toString()}
                      onChange={(val) =>
                        setNewExpenseForm((prev) => ({ ...prev, amount: parseFloat(val) || 0 }))
                      }
                    />
                    <CalculatorSelect
                      label="Frequency"
                      value={newExpenseForm.frequency}
                      onChange={(val) =>
                        setNewExpenseForm((prev) => ({ ...prev, frequency: val as any }))
                      }
                      options={expenseFrequencyOptions}
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleAddExpense}
                      className="h-10 px-4 rounded-xl font-medium text-sm text-black"
                      style={{
                        background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                      }}
                    >
                      Add Expense
                    </button>
                    <button
                      onClick={() => setShowAddExpense(false)}
                      className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-white/70"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-white/80">Settings & Assumptions</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <CalculatorInput
                  label="Starting Balance"
                  unit="£"
                  type="text"
                  inputMode="decimal"
                  value={state.startingBalance.toString()}
                  onChange={(val) => updateSettings({ startingBalance: parseFloat(val) || 0 })}
                  hint="Current cash on hand"
                />
                <CalculatorInput
                  label="Emergency Fund Target"
                  unit="£"
                  type="text"
                  inputMode="decimal"
                  value={state.emergencyFundTarget.toString()}
                  onChange={(val) => updateSettings({ emergencyFundTarget: parseFloat(val) || 0 })}
                  hint="Target emergency reserve"
                />
                <CalculatorSelect
                  label="VAT Quarter"
                  value={state.vatQuarter.toString()}
                  onChange={(val) => updateSettings({ vatQuarter: parseInt(val) })}
                  options={vatQuarterOptions}
                />
                <CalculatorSelect
                  label="Active Scenario"
                  value={state.selectedScenario}
                  onChange={(val) => updateSettings({ selectedScenario: val })}
                  options={state.scenarios.map((s) => ({ value: s.id, label: s.name }))}
                />
                <CalculatorSelect
                  label="VAT Scheme"
                  value={state.vatScheme}
                  onChange={(val) => updateSettings({ vatScheme: val as any })}
                  options={vatSchemeOptions}
                />
                <CalculatorInput
                  label="Bad Debt %"
                  unit="%"
                  type="text"
                  inputMode="decimal"
                  value={state.badDebtPercent.toString()}
                  onChange={(val) => updateSettings({ badDebtPercent: parseFloat(val) || 0 })}
                  hint="Allowance for non-payment"
                />
                <CalculatorInput
                  label="Card Fees %"
                  unit="%"
                  type="text"
                  inputMode="decimal"
                  value={state.cardFeesPercent.toString()}
                  onChange={(val) => updateSettings({ cardFeesPercent: parseFloat(val) || 0 })}
                  hint="Payment processing fees"
                />
                <CalculatorInput
                  label="Monthly Loan Repayments"
                  unit="£"
                  type="text"
                  inputMode="decimal"
                  value={state.monthlyLoanRepayments.toString()}
                  onChange={(val) => updateSettings({ monthlyLoanRepayments: parseFloat(val) || 0 })}
                />
                {state.vatScheme === "flat-rate" && (
                  <CalculatorInput
                    label="Flat Rate %"
                    unit="%"
                    type="text"
                    inputMode="decimal"
                    value={state.flatRatePercent.toString()}
                    onChange={(val) => updateSettings({ flatRatePercent: parseFloat(val) || 0 })}
                    hint="Typical 12.5% for services"
                  />
                )}
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Charts Section */}
      <Collapsible open={showCharts} onOpenChange={setShowCharts}>
        <div className="calculator-card overflow-hidden" style={{ borderColor: "#60a5fa15" }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-4 w-4 text-blue-400" />
              <span className="text-sm sm:text-base font-medium text-blue-300">
                Charts & Visualizations
              </span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-white/80 transition-transform duration-200",
                showCharts && "rotate-180"
              )}
            />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 pt-0">
            <CashFlowCharts
              projections={monthlyProjections}
              selectedScenario={
                state.scenarios.find((s) => s.id === state.selectedScenario)?.name || "Realistic"
              }
            />
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Scenarios Section */}
      <Collapsible open={showScenarios} onOpenChange={setShowScenarios}>
        <div className="calculator-card overflow-hidden" style={{ borderColor: "#60a5fa15" }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-4 w-4 text-blue-400" />
              <span className="text-sm sm:text-base font-medium text-blue-300">
                Scenarios & What-If
              </span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-white/80 transition-transform duration-200",
                showScenarios && "rotate-180"
              )}
            />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 pt-0">
            <ScenarioPlanner
              scenarios={state.scenarios}
              selectedScenario={state.selectedScenario}
              onScenarioChange={(scenarioId) => updateSettings({ selectedScenario: scenarioId })}
              monthlyProjections={monthlyProjections}
              financialMetrics={financialMetrics}
            />
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Insights Section */}
      <Collapsible open={showInsights} onOpenChange={setShowInsights}>
        <div className="calculator-card overflow-hidden" style={{ borderColor: "#60a5fa15" }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <Lightbulb className="h-4 w-4 text-amber-400" />
              <span className="text-sm sm:text-base font-medium text-amber-300">
                Insights & Recommendations
              </span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-white/80 transition-transform duration-200",
                showInsights && "rotate-180"
              )}
            />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 pt-0">
            <FinancialInsights
              insights={insights}
              financialMetrics={financialMetrics}
              emergencyFundTarget={state.emergencyFundTarget}
            />
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Monthly Projections */}
      {state.incomeStreams.length > 0 && (
        <Collapsible open={showProjections} onOpenChange={setShowProjections}>
          <div className="calculator-card overflow-hidden" style={{ borderColor: "#60a5fa15" }}>
            <CollapsibleTrigger className="agent-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-blue-400" />
                <span className="text-sm sm:text-base font-medium text-blue-300">
                  12-Month Cash Flow Projection
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                  {state.scenarios.find((s) => s.id === state.selectedScenario)?.name}
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-white/80 transition-transform duration-200",
                  showProjections && "rotate-180"
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="p-4 pt-0">
              <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {monthlyProjections.map((month, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2"
                  >
                    <h4 className="font-semibold text-white text-sm">{month.monthName}</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-white">Income:</span>
                        <span className="text-green-400 font-medium">
                          {formatCurrency(month.income)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white">Expenses:</span>
                        <span className="text-red-400 font-medium">
                          {formatCurrency(month.expenses)}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-white/10 pt-1">
                        <span className="text-white">Net:</span>
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
                        <span className="text-white">Balance:</span>
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
              <div className="mt-6 pt-4 border-t border-white/10">
                <h4 className="text-white font-medium mb-4">Annual Financial Summary</h4>
                <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
                  <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30">
                    <h5 className="text-green-400 text-xs font-medium mb-1">Total Income</h5>
                    <p className="text-xl font-bold text-white">
                      {formatCurrency(financialMetrics.totalIncome)}
                    </p>
                    <p className="text-xs text-white">
                      Avg: {formatCurrency(financialMetrics.avgMonthlyIncome)}/mo
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
                    <h5 className="text-red-400 text-xs font-medium mb-1">Total Expenses</h5>
                    <p className="text-xl font-bold text-white">
                      {formatCurrency(financialMetrics.totalExpenses)}
                    </p>
                    <p className="text-xs text-white">
                      Avg: {formatCurrency(financialMetrics.avgMonthlyExpenses)}/mo
                    </p>
                  </div>

                  <div
                    className={cn(
                      "p-3 rounded-xl border",
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
                    <p className="text-xs text-white">
                      Margin: {financialMetrics.profitMargin.toFixed(1)}%
                    </p>
                  </div>

                  <div
                    className={cn(
                      "p-3 rounded-xl border",
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
                    <p className="text-xs text-white">
                      Runway: {financialMetrics.cashRunway} months
                    </p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      )}

      {/* Empty State */}
      {state.incomeStreams.length === 0 && !showTemplates && (
        <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center">
          <Info className="h-10 w-10 text-blue-400 mx-auto mb-3 opacity-50" />
          <h3 className="text-white text-lg font-semibold mb-2">No Income Streams</h3>
          <p className="text-white text-sm mb-4">
            Add income streams and expenses above to see your cash flow projections.
          </p>
          <button
            onClick={() => setShowTemplates(true)}
            className="h-10 px-4 rounded-xl font-medium text-sm text-black"
            style={{
              background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
            }}
          >
            Use a Template
          </button>
        </div>
      )}
    </div>
  );
};

export default CashFlowPlanner;
