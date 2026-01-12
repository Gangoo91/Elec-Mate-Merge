import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Plus, Wallet, PiggyBank, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCashFlow } from "@/hooks/use-cash-flow";

// Layout components
import { CashFlowDashboardLayout } from "@/components/electrician/business-development/enhanced-cash-flow/layout/CashFlowDashboardLayout";
import { CashFlowHeader } from "@/components/electrician/business-development/enhanced-cash-flow/layout/CashFlowHeader";
import { CashFlowTabs, CashFlowTabId } from "@/components/electrician/business-development/enhanced-cash-flow/layout/CashFlowTabs";
import { CashFlowSidebar } from "@/components/electrician/business-development/enhanced-cash-flow/layout/CashFlowSidebar";

// Mobile components
import { CashFlowMobileStats } from "@/components/electrician/business-development/enhanced-cash-flow/mobile/CashFlowMobileStats";

// Item components
import { CashFlowIncomeCard } from "@/components/electrician/business-development/enhanced-cash-flow/items/CashFlowIncomeCard";
import { CashFlowExpenseCard } from "@/components/electrician/business-development/enhanced-cash-flow/items/CashFlowExpenseCard";
import { CashFlowAddSheet } from "@/components/electrician/business-development/enhanced-cash-flow/items/CashFlowAddSheet";
import { CashFlowSettings } from "@/components/electrician/business-development/enhanced-cash-flow/items/CashFlowSettings";

// Feature components
import { CashFlowChartCard } from "@/components/electrician/business-development/enhanced-cash-flow/CashFlowChartCard";
import { CashFlowProjectionsView } from "@/components/electrician/business-development/enhanced-cash-flow/CashFlowProjectionsView";
import { ScenarioPlanner } from "@/components/electrician/business-development/enhanced-cash-flow/ScenarioPlanner";
import { FinancialInsights } from "@/components/electrician/business-development/enhanced-cash-flow/FinancialInsights";
import { QuickStartTemplates } from "@/components/electrician/business-development/enhanced-cash-flow/QuickStartTemplates";

const CashFlowPlanner = () => {
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

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get("tab") as CashFlowTabId) || "setup";
  const setActiveTab = (tab: CashFlowTabId) => setSearchParams({ tab }, { replace: false });
  const [showTemplates, setShowTemplates] = useState(state.incomeStreams.length === 0);
  const [addSheetOpen, setAddSheetOpen] = useState(false);
  const [addSheetType, setAddSheetType] = useState<"income" | "expense">("income");

  const hasData = state.incomeStreams.length > 0;
  const monthWithNegativeBalance = monthlyProjections.findIndex((p) => p.cumulativeBalance < 0) + 1;
  const isHealthy = financialMetrics.minBalance >= 0;
  const healthMessage = isHealthy
    ? `Healthy - ${financialMetrics.cashRunway} months runway`
    : `Warning - Issues in month ${monthWithNegativeBalance}`;

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

  const handleAddIncome = (item: any) => {
    addIncomeStream(item);
    toast({
      title: "Income Stream Added",
      description: `${item.name} has been added to your cash flow model.`,
      variant: "success",
    });
  };

  const handleAddExpense = (item: any) => {
    addExpenseCategory(item);
    toast({
      title: "Expense Category Added",
      description: `${item.name} has been added to your cash flow model.`,
      variant: "success",
    });
  };

  const openAddSheet = (type: "income" | "expense") => {
    setAddSheetType(type);
    setAddSheetOpen(true);
  };

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "setup":
        return (
          <div className="space-y-6">
            {/* Templates */}
            {showTemplates && (
              <QuickStartTemplates onLoadTemplate={handleLoadTemplate} />
            )}

            {/* Income Streams */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium text-white/80">Income Streams</span>
                </div>
                <button
                  onClick={() => openAddSheet("income")}
                  className="h-10 px-3 flex items-center gap-2 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm hover:bg-green-500/20 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add</span>
                </button>
              </div>
              {state.incomeStreams.length > 0 ? (
                <div className="space-y-3">
                  {state.incomeStreams.map((stream) => (
                    <CashFlowIncomeCard
                      key={stream.id}
                      stream={stream}
                      onUpdate={updateIncomeStream}
                      onRemove={removeIncomeStream}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <p className="text-white/50 text-sm">No income streams added yet</p>
                </div>
              )}
            </div>

            {/* Expense Categories */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PiggyBank className="h-4 w-4 text-red-400" />
                  <span className="text-sm font-medium text-white/80">Expense Categories</span>
                </div>
                <button
                  onClick={() => openAddSheet("expense")}
                  className="h-10 px-3 flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm hover:bg-red-500/20 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add</span>
                </button>
              </div>
              {state.expenseCategories.length > 0 ? (
                <div className="space-y-3">
                  {state.expenseCategories.map((category) => (
                    <CashFlowExpenseCard
                      key={category.id}
                      category={category}
                      onUpdate={updateExpenseCategory}
                      onRemove={removeExpenseCategory}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <p className="text-white/50 text-sm">No expenses added yet</p>
                </div>
              )}
            </div>

            {/* Settings */}
            <div className="pt-4 border-t border-white/10">
              <CashFlowSettings
                startingBalance={state.startingBalance}
                emergencyFundTarget={state.emergencyFundTarget}
                vatQuarter={state.vatQuarter}
                selectedScenario={state.selectedScenario}
                vatScheme={state.vatScheme}
                badDebtPercent={state.badDebtPercent}
                cardFeesPercent={state.cardFeesPercent}
                monthlyLoanRepayments={state.monthlyLoanRepayments}
                flatRatePercent={state.flatRatePercent}
                scenarios={state.scenarios}
                onUpdate={updateSettings}
              />
            </div>
          </div>
        );

      case "scenarios":
        return hasData ? (
          <ScenarioPlanner
            scenarios={state.scenarios}
            selectedScenario={state.selectedScenario}
            onScenarioChange={(scenarioId) => updateSettings({ selectedScenario: scenarioId })}
            monthlyProjections={monthlyProjections}
            financialMetrics={financialMetrics}
          />
        ) : (
          <EmptyState onShowTemplates={() => setShowTemplates(true)} />
        );

      case "projections":
        return hasData ? (
          <CashFlowProjectionsView
            projections={monthlyProjections}
            financialMetrics={financialMetrics}
            scenarioName={state.scenarios.find((s) => s.id === state.selectedScenario)?.name || "Realistic"}
          />
        ) : (
          <EmptyState onShowTemplates={() => setShowTemplates(true)} />
        );

      case "insights":
        return hasData ? (
          <FinancialInsights
            insights={insights}
            financialMetrics={financialMetrics}
            emergencyFundTarget={state.emergencyFundTarget}
          />
        ) : (
          <EmptyState onShowTemplates={() => setShowTemplates(true)} />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Cash Flow Planner UK for Electricians | Forecast & Scenarios</title>
        <meta
          name="description"
          content="Plan electrician cash flow with projections, VAT quarters, scenarios and insights. Mobile-first."
        />
        <link rel="canonical" href="/electrician/business-development/tools/cash-flow" />
      </Helmet>

      <CashFlowDashboardLayout
        header={
          <CashFlowHeader
            isHealthy={isHealthy}
            healthMessage={healthMessage}
            onExportCSV={handleExportCSV}
            onCopySummary={handleCopySummary}
            onLoadTemplates={() => {
              setShowTemplates(true);
              setActiveTab("setup");
            }}
            hasData={hasData}
          />
        }
        mobileStats={
          hasData ? <CashFlowMobileStats financialMetrics={financialMetrics} /> : undefined
        }
        chart={
          hasData ? (
            <CashFlowChartCard
              projections={monthlyProjections}
              selectedScenario={state.scenarios.find((s) => s.id === state.selectedScenario)?.name || "Realistic"}
            />
          ) : (
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
              <Info className="h-10 w-10 text-blue-400 mx-auto mb-3 opacity-50" />
              <h3 className="text-white font-semibold mb-2">No Data Yet</h3>
              <p className="text-white/50 text-sm">Add income and expenses to see your cash flow chart</p>
            </div>
          )
        }
        tabs={<CashFlowTabs activeTab={activeTab} onTabChange={setActiveTab} />}
        tabContent={renderTabContent()}
        sidebar={
          hasData ? (
            <CashFlowSidebar
              financialMetrics={financialMetrics}
              scenarios={state.scenarios}
              selectedScenario={state.selectedScenario}
              onScenarioChange={(scenarioId) => updateSettings({ selectedScenario: scenarioId })}
              insights={insights}
              onExportCSV={handleExportCSV}
              onCopySummary={handleCopySummary}
              onLoadTemplates={() => {
                setShowTemplates(true);
                setActiveTab("setup");
              }}
            />
          ) : (
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <Info className="h-8 w-8 text-blue-400 mx-auto mb-2 opacity-50" />
              <h3 className="text-white font-medium text-sm mb-1">Get Started</h3>
              <p className="text-white/50 text-xs">
                Add income streams and expenses to see your financial health summary
              </p>
            </div>
          )
        }
      />

      {/* Add Sheet */}
      <CashFlowAddSheet
        open={addSheetOpen}
        onOpenChange={setAddSheetOpen}
        type={addSheetType}
        onAdd={addSheetType === "income" ? handleAddIncome : handleAddExpense}
      />
    </>
  );
};

// Empty state component
const EmptyState = ({ onShowTemplates }: { onShowTemplates: () => void }) => (
  <div className="p-8 rounded-xl border border-white/10 bg-white/5 text-center">
    <Info className="h-10 w-10 text-blue-400 mx-auto mb-3 opacity-50" />
    <h3 className="text-white text-lg font-semibold mb-2">No Data Yet</h3>
    <p className="text-white/50 text-sm mb-4">
      Add income streams and expenses to see your projections.
    </p>
    <button
      onClick={onShowTemplates}
      className="h-10 px-4 rounded-xl font-medium text-sm bg-blue-500 text-white hover:bg-blue-600 transition-colors"
    >
      Use a Template
    </button>
  </div>
);

export default CashFlowPlanner;
