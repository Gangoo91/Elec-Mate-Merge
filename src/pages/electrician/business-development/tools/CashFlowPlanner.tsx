import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BackButton from "@/components/common/BackButton";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, Calculator, BarChart3, Target, Settings, Plus, Minus } from "lucide-react";
import { useCashFlow } from "@/hooks/use-cash-flow";
import { CashFlowCharts } from "@/components/electrician/business-development/enhanced-cash-flow/CashFlowCharts";
import { ScenarioPlanner } from "@/components/electrician/business-development/enhanced-cash-flow/ScenarioPlanner";
import { FinancialInsights } from "@/components/electrician/business-development/enhanced-cash-flow/FinancialInsights";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import { useState } from "react";
import { Helmet } from "react-helmet";

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
    updateSettings
  } = useCashFlow();

  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newIncomeForm, setNewIncomeForm] = useState({
    name: '',
    amount: 0,
    frequency: 'monthly' as const,
    paymentDelayDays: 14,
    growth: 0.05
  });
  const [newExpenseForm, setNewExpenseForm] = useState({
    name: '',
    amount: 0,
    frequency: 'monthly' as const,
    variable: true,
    growth: 0.03
  });

  const handleAddIncome = () => {
    if (newIncomeForm.name && newIncomeForm.amount > 0) {
      addIncomeStream(newIncomeForm);
      setNewIncomeForm({
        name: '',
        amount: 0,
        frequency: 'monthly',
        paymentDelayDays: 14,
        growth: 0.05
      });
      setShowAddIncome(false);
      toast({
        title: "Income Stream Added",
        description: `${newIncomeForm.name} has been added to your cash flow model.`,
        variant: "success"
      });
    }
  };

  const handleAddExpense = () => {
    if (newExpenseForm.name && newExpenseForm.amount > 0) {
      addExpenseCategory(newExpenseForm);
      setNewExpenseForm({
        name: '',
        amount: 0,
        frequency: 'monthly',
        variable: true,
        growth: 0.03
      });
      setShowAddExpense(false);
      toast({
        title: "Expense Category Added",
        description: `${newExpenseForm.name} has been added to your cash flow model.`,
        variant: "success"
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Helmet>
        <title>Cash Flow Planner UK for Electricians | Forecast & Scenarios</title>
        <meta name="description" content="Plan electrician cash flow with projections, VAT quarters, scenarios and insights. Mobile-first." />
        <link rel="canonical" href="/electrician/business-development/tools/cash-flow" />
      </Helmet>
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-elec-yellow" />
          Advanced Cash Flow Planner
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-6">
          Professional cash flow forecasting with scenario planning, industry-specific insights, and BS7671 compliance tracking.
        </p>
        <BackButton customUrl="/electrician/business-development/tools" label="Back to Calculators" />
      </div>

      <WhyThisMatters
        points={[
          "Forecasts peaks/troughs so VAT quarters, tax and payroll never surprise you.",
          "Prevents cash crunches by planning deposits, delays and emergency buffers.",
          "Enables confident decisions on hiring, vehicles and marketing."
        ]}
      />

      <Tabs defaultValue="setup" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="setup" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Setup
          </TabsTrigger>
          <TabsTrigger value="projections" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Projections
          </TabsTrigger>
          <TabsTrigger value="charts" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Charts
          </TabsTrigger>
          <TabsTrigger value="scenarios" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Scenarios
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Income Streams */}
            <Card className="border-elec-yellow/20 bg-elec-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Income Streams
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowAddIncome(!showAddIncome)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Stream
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.incomeStreams.map((stream) => (
                  <div key={stream.id} className="p-4 rounded-lg bg-secondary/20 border border-secondary/40">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-white">{stream.name}</h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeIncomeStream(stream.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid gap-3 md:grid-cols-2">
                      <MobileInput
                        label="Amount"
                        value={stream.amount.toString()}
                        onChange={(e) => updateIncomeStream(stream.id, { amount: parseFloat(e.target.value) || 0 })}
                        type="number"
                        unit="£"
                      />
                      <MobileSelectWrapper
                        label="Frequency"
                        value={stream.frequency}
                        onValueChange={(value) => updateIncomeStream(stream.id, { frequency: value as any })}
                        options={[
                          { value: 'monthly', label: 'Monthly' },
                          { value: 'quarterly', label: 'Quarterly' },
                          { value: 'seasonal', label: 'Seasonal' }
                        ]}
                      />
                      <MobileInput
                        label="Payment Delay"
                        value={stream.paymentDelayDays.toString()}
                        onChange={(e) => updateIncomeStream(stream.id, { paymentDelayDays: parseInt(e.target.value) || 0 })}
                        type="number"
                        unit="days"
                        hint="Days between invoice and payment"
                      />
                      <MobileInput
                        label="Annual Growth"
                        value={(stream.growth * 100).toString()}
                        onChange={(e) => updateIncomeStream(stream.id, { growth: (parseFloat(e.target.value) || 0) / 100 })}
                        type="number"
                        unit="%"
                        hint="Expected annual growth rate"
                      />
                    </div>
                  </div>
                ))}

                {showAddIncome && (
                  <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
                    <h4 className="font-medium text-white mb-3">Add New Income Stream</h4>
                    <div className="grid gap-3 md:grid-cols-2">
                      <MobileInput
                        label="Name"
                        value={newIncomeForm.name}
                        onChange={(e) => setNewIncomeForm(prev => ({ ...prev, name: e.target.value }))}
                        hint="e.g., Regular Contracts, Emergency Callouts"
                      />
                      <MobileInput
                        label="Amount"
                        value={newIncomeForm.amount.toString()}
                        onChange={(e) => setNewIncomeForm(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                        type="number"
                        unit="£"
                      />
                      <MobileSelectWrapper
                        label="Frequency"
                        value={newIncomeForm.frequency}
                        onValueChange={(value) => setNewIncomeForm(prev => ({ ...prev, frequency: value as any }))}
                        options={[
                          { value: 'monthly', label: 'Monthly' },
                          { value: 'quarterly', label: 'Quarterly' },
                          { value: 'seasonal', label: 'Seasonal' }
                        ]}
                      />
                      <MobileInput
                        label="Payment Delay"
                        value={newIncomeForm.paymentDelayDays.toString()}
                        onChange={(e) => setNewIncomeForm(prev => ({ ...prev, paymentDelayDays: parseInt(e.target.value) || 0 }))}
                        type="number"
                        unit="days"
                      />
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button onClick={handleAddIncome} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                        Add Income Stream
                      </Button>
                      <Button variant="outline" onClick={() => setShowAddIncome(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Expense Categories */}
            <Card className="border-elec-yellow/20 bg-elec-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Expense Categories
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowAddExpense(!showAddExpense)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Category
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.expenseCategories.map((category) => (
                  <div key={category.id} className="p-4 rounded-lg bg-secondary/20 border border-secondary/40">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-white">{category.name}</h4>
                      <div className="flex items-center gap-2">
                        {category.variable && <Badge variant="yellow">Variable</Badge>}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeExpenseCategory(category.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid gap-3 md:grid-cols-2">
                      <MobileInput
                        label="Amount"
                        value={category.amount.toString()}
                        onChange={(e) => updateExpenseCategory(category.id, { amount: parseFloat(e.target.value) || 0 })}
                        type="number"
                        unit="£"
                      />
                      <MobileSelectWrapper
                        label="Frequency"
                        value={category.frequency}
                        onValueChange={(value) => updateExpenseCategory(category.id, { frequency: value as any })}
                        options={[
                          { value: 'monthly', label: 'Monthly' },
                          { value: 'quarterly', label: 'Quarterly' },
                          { value: 'annual', label: 'Annual' }
                        ]}
                      />
                      <MobileInput
                        label="Annual Growth"
                        value={(category.growth * 100).toString()}
                        onChange={(e) => updateExpenseCategory(category.id, { growth: (parseFloat(e.target.value) || 0) / 100 })}
                        type="number"
                        unit="%"
                        hint="Expected annual growth rate"
                      />
                      {(category.frequency === 'quarterly' || category.frequency === 'annual') && (
                        <MobileInput
                          label="Timing (Month)"
                          value={(category.timing || 1).toString()}
                          onChange={(e) => updateExpenseCategory(category.id, { timing: parseInt(e.target.value) || 1 })}
                          type="number"
                          hint="Month when expense occurs"
                        />
                      )}
                    </div>
                  </div>
                ))}

                {showAddExpense && (
                  <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
                    <h4 className="font-medium text-white mb-3">Add New Expense Category</h4>
                    <div className="grid gap-3 md:grid-cols-2">
                      <MobileInput
                        label="Name"
                        value={newExpenseForm.name}
                        onChange={(e) => setNewExpenseForm(prev => ({ ...prev, name: e.target.value }))}
                        hint="e.g., Tools & Equipment, Van Insurance"
                      />
                      <MobileInput
                        label="Amount"
                        value={newExpenseForm.amount.toString()}
                        onChange={(e) => setNewExpenseForm(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                        type="number"
                        unit="£"
                      />
                      <MobileSelectWrapper
                        label="Frequency"
                        value={newExpenseForm.frequency}
                        onValueChange={(value) => setNewExpenseForm(prev => ({ ...prev, frequency: value as any }))}
                        options={[
                          { value: 'monthly', label: 'Monthly' },
                          { value: 'quarterly', label: 'Quarterly' },
                          { value: 'annual', label: 'Annual' }
                        ]}
                      />
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button onClick={handleAddExpense} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                        Add Expense Category
                      </Button>
                      <Button variant="outline" onClick={() => setShowAddExpense(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Settings */}
          <Card className="border-elec-yellow/20 bg-elec-card">
            <CardHeader>
              <CardTitle className="text-white">Settings & Assumptions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-4">
              <MobileInput
                label="Starting Cash Balance"
                value={state.startingBalance.toString()}
                onChange={(e) => updateSettings({ startingBalance: parseFloat(e.target.value) || 0 })}
                type="number"
                unit="£"
                hint="Current cash on hand"
              />
              <MobileInput
                label="Emergency Fund Target"
                value={state.emergencyFundTarget.toString()}
                onChange={(e) => updateSettings({ emergencyFundTarget: parseFloat(e.target.value) || 0 })}
                type="number"
                unit="£"
                hint="Target emergency reserve"
              />
              <MobileSelectWrapper
                label="VAT Quarter"
                value={state.vatQuarter.toString()}
                onValueChange={(value) => updateSettings({ vatQuarter: parseInt(value) })}
                options={[
                  { value: '1', label: 'Jan/Apr/Jul/Oct' },
                  { value: '2', label: 'Feb/May/Aug/Nov' },
                  { value: '3', label: 'Mar/Jun/Sep/Dec' }
                ]}
              />
              <MobileSelectWrapper
                label="Active Scenario"
                value={state.selectedScenario}
                onValueChange={(value) => updateSettings({ selectedScenario: value })}
                options={state.scenarios.map(scenario => ({
                  value: scenario.id,
                  label: scenario.name
                }))}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projections" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                12-Month Cash Flow Projection
                <Badge variant="success">
                  {state.scenarios.find(s => s.id === state.selectedScenario)?.name} Scenario
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {monthlyProjections.map((month, index) => (
                  <div key={index} className="p-4 rounded-lg bg-secondary/20 border border-secondary/40">
                    <h4 className="font-semibold text-white mb-3">{month.monthName}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Income:</span>
                        <span className="text-green-400 font-medium">£{month.income.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Expenses:</span>
                        <span className="text-red-400 font-medium">£{month.expenses.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between border-t border-secondary/40 pt-2">
                        <span className="text-muted-foreground">Net Flow:</span>
                        <span className={`font-medium ${month.netFlow >= 0 ? "text-green-400" : "text-red-400"}`}>
                          £{month.netFlow.toFixed(0)}
                        </span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-white">Balance:</span>
                        <span className={`${month.cumulativeBalance >= 0 ? "text-green-400" : "text-red-400"}`}>
                          £{month.cumulativeBalance.toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Annual Summary */}
          <Card className="border-elec-yellow/20 bg-elec-card">
            <CardHeader>
              <CardTitle className="text-white">Annual Financial Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <h4 className="font-medium text-green-400 mb-2">Total Income</h4>
                <p className="text-2xl font-bold text-white">£{financialMetrics.totalIncome.toFixed(0)}</p>
                <p className="text-sm text-muted-foreground">Avg: £{financialMetrics.avgMonthlyIncome.toFixed(0)}/month</p>
              </div>
              
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <h4 className="font-medium text-red-400 mb-2">Total Expenses</h4>
                <p className="text-2xl font-bold text-white">£{financialMetrics.totalExpenses.toFixed(0)}</p>
                <p className="text-sm text-muted-foreground">Avg: £{financialMetrics.avgMonthlyExpenses.toFixed(0)}/month</p>
              </div>
              
              <div className={`p-4 rounded-lg border ${
                financialMetrics.netProfit >= 0 
                  ? 'bg-green-500/10 border-green-500/30' 
                  : 'bg-red-500/10 border-red-500/30'
              }`}>
                <h4 className={`font-medium mb-2 ${
                  financialMetrics.netProfit >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  Net Profit
                </h4>
                <p className="text-2xl font-bold text-white">£{financialMetrics.netProfit.toFixed(0)}</p>
                <p className="text-sm text-muted-foreground">Margin: {financialMetrics.profitMargin.toFixed(1)}%</p>
              </div>
              
              <div className={`p-4 rounded-lg border ${
                financialMetrics.minBalance >= 0 
                  ? 'bg-green-500/10 border-green-500/30' 
                  : 'bg-red-500/10 border-red-500/30'
              }`}>
                <h4 className={`font-medium mb-2 ${
                  financialMetrics.minBalance >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  Minimum Balance
                </h4>
                <p className="text-2xl font-bold text-white">£{financialMetrics.minBalance.toFixed(0)}</p>
                <p className="text-sm text-muted-foreground">Runway: {financialMetrics.cashRunway} months</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts">
          <CashFlowCharts 
            projections={monthlyProjections} 
            selectedScenario={state.scenarios.find(s => s.id === state.selectedScenario)?.name || 'Realistic'}
          />
        </TabsContent>

        <TabsContent value="scenarios">
          <ScenarioPlanner
            scenarios={state.scenarios}
            selectedScenario={state.selectedScenario}
            onScenarioChange={(scenarioId) => updateSettings({ selectedScenario: scenarioId })}
            monthlyProjections={monthlyProjections}
            financialMetrics={financialMetrics}
          />
        </TabsContent>

        <TabsContent value="insights">
          <FinancialInsights
            insights={insights}
            financialMetrics={financialMetrics}
            emergencyFundTarget={state.emergencyFundTarget}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CashFlowPlanner;