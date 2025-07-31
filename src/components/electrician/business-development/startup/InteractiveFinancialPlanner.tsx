import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import { Calculator, TrendingUp, AlertTriangle, Target, PoundSterling } from "lucide-react";

const InteractiveFinancialPlanner = () => {
  const [startupCosts, setStartupCosts] = useState({
    tools: 3500,
    vehicle: 12000,
    insurance: 1500,
    certifications: 800,
    marketing: 1000,
    workingCapital: 7500,
    other: 2000
  });

  const [monthlyExpenses, setMonthlyExpenses] = useState({
    fuel: 400,
    insurance: 125,
    phoneInternet: 100,
    accountancy: 150,
    van_maintenance: 200,
    tools_replacement: 100,
    software: 50,
    marketing: 200
  });

  const [revenueProjections, setRevenueProjections] = useState({
    dailyRate: 250,
    workingDaysPerWeek: 4,
    weeksPerYear: 48,
    utilizationRate: 80
  });

  const [growthTargets, setGrowthTargets] = useState({
    yearTwoGrowth: 25,
    yearThreeGrowth: 40,
    targetProfitMargin: 35
  });

  const totalStartupCosts = Object.values(startupCosts).reduce((sum, cost) => sum + cost, 0);
  const totalMonthlyExpenses = Object.values(monthlyExpenses).reduce((sum, cost) => sum + cost, 0);
  const annualExpenses = totalMonthlyExpenses * 12;

  const potentialAnnualRevenue = 
    revenueProjections.dailyRate * 
    revenueProjections.workingDaysPerWeek * 
    revenueProjections.weeksPerYear * 
    (revenueProjections.utilizationRate / 100);

  const grossProfit = potentialAnnualRevenue - annualExpenses;
  const profitMargin = potentialAnnualRevenue > 0 ? (grossProfit / potentialAnnualRevenue) * 100 : 0;
  const breakEvenMonths = grossProfit > 0 ? (totalStartupCosts / (grossProfit / 12)) : 0;

  const updateStartupCost = (field: string, value: string) => {
    setStartupCosts(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const updateMonthlyExpense = (field: string, value: string) => {
    setMonthlyExpenses(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const updateRevenue = (field: string, value: string) => {
    setRevenueProjections(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const updateGrowth = (field: string, value: string) => {
    setGrowthTargets(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const yearTwoRevenue = potentialAnnualRevenue * (1 + growthTargets.yearTwoGrowth / 100);
  const yearThreeRevenue = yearTwoRevenue * (1 + growthTargets.yearThreeGrowth / 100);

  return (
    <Card className="border-emerald-500/50 bg-emerald-500/10">
      <CardHeader>
        <CardTitle className="text-emerald-300 flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Interactive Financial Planning Dashboard
        </CardTitle>
        <p className="text-emerald-200 text-sm">
          Plan your electrical business finances with real-time calculations and projections
        </p>
      </CardHeader>
      <CardContent>
        <DropdownTabs
          defaultValue="startup"
          placeholder="Select financial planning section"
          tabs={[
            {
              value: "startup",
              label: "Startup Costs",
              icon: PoundSterling,
              content: (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries({
                      tools: "Professional Tools & Equipment",
                      vehicle: "Van Purchase/Lease Deposit",
                      insurance: "Annual Insurance Premiums",
                      certifications: "Qualifications & Registrations",
                      marketing: "Initial Marketing & Website",
                      workingCapital: "Working Capital (6 months)",
                      other: "Other Setup Costs"
                    }).map(([key, label]) => (
                      <div key={key} className="space-y-1">
                        <Label className="text-emerald-200">{label}</Label>
                        <Input
                          type="number"
                          value={startupCosts[key as keyof typeof startupCosts]}
                          onChange={(e) => updateStartupCost(key, e.target.value)}
                          className="bg-emerald-500/20 border-emerald-400/30"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-center p-6 bg-emerald-500/20 rounded-lg border border-emerald-400/30">
                    <h4 className="font-semibold text-emerald-200 mb-3">Total Startup Investment</h4>
                    <p className="text-3xl font-bold text-emerald-100">£{totalStartupCosts.toLocaleString()}</p>
                  </div>
                </div>
              )
            },
            {
              value: "expenses",
              label: "Monthly Expenses",
              icon: Calculator,
              content: (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries({
                      fuel: "Vehicle Fuel",
                      insurance: "Monthly Insurance",
                      phoneInternet: "Phone & Internet",
                      accountancy: "Accountancy Fees",
                      van_maintenance: "Van Maintenance",
                      tools_replacement: "Tool Replacement Fund",
                      software: "Software Subscriptions",
                      marketing: "Ongoing Marketing"
                    }).map(([key, label]) => (
                      <div key={key} className="space-y-1">
                        <Label className="text-emerald-200">{label}</Label>
                        <Input
                          type="number"
                          value={monthlyExpenses[key as keyof typeof monthlyExpenses]}
                          onChange={(e) => updateMonthlyExpense(key, e.target.value)}
                          className="bg-emerald-500/20 border-emerald-400/30"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-emerald-500/20 rounded-lg">
                      <h4 className="font-semibold text-emerald-200">Monthly Expenses</h4>
                      <p className="text-2xl font-bold text-emerald-100">£{totalMonthlyExpenses.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-4 bg-emerald-500/20 rounded-lg">
                      <h4 className="font-semibold text-emerald-200">Annual Expenses</h4>
                      <p className="text-2xl font-bold text-emerald-100">£{annualExpenses.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )
            },
            {
              value: "revenue",
              label: "Revenue Planning",
              icon: TrendingUp,
              content: (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-emerald-200">Daily Rate (£)</Label>
                      <Input
                        type="number"
                        value={revenueProjections.dailyRate}
                        onChange={(e) => updateRevenue("dailyRate", e.target.value)}
                        className="bg-emerald-500/20 border-emerald-400/30"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-emerald-200">Working Days per Week</Label>
                      <Input
                        type="number"
                        value={revenueProjections.workingDaysPerWeek}
                        onChange={(e) => updateRevenue("workingDaysPerWeek", e.target.value)}
                        className="bg-emerald-500/20 border-emerald-400/30"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-emerald-200">Working Weeks per Year</Label>
                      <Input
                        type="number"
                        value={revenueProjections.weeksPerYear}
                        onChange={(e) => updateRevenue("weeksPerYear", e.target.value)}
                        className="bg-emerald-500/20 border-emerald-400/30"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-emerald-200">Utilization Rate (%)</Label>
                      <Input
                        type="number"
                        value={revenueProjections.utilizationRate}
                        onChange={(e) => updateRevenue("utilizationRate", e.target.value)}
                        className="bg-emerald-500/20 border-emerald-400/30"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-emerald-500/20 rounded-lg">
                      <h4 className="font-semibold text-emerald-200">Annual Revenue</h4>
                      <p className="text-2xl font-bold text-emerald-100">£{potentialAnnualRevenue.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-4 bg-emerald-500/20 rounded-lg">
                      <h4 className="font-semibold text-emerald-200">Gross Profit</h4>
                      <p className="text-2xl font-bold text-emerald-100">£{grossProfit.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-4 bg-emerald-500/20 rounded-lg">
                      <h4 className="font-semibold text-emerald-200">Profit Margin</h4>
                      <p className="text-2xl font-bold text-emerald-100">{profitMargin.toFixed(1)}%</p>
                    </div>
                  </div>

                  {breakEvenMonths > 0 && (
                    <div className="p-4 bg-emerald-500/20 rounded-lg text-center">
                      <h4 className="font-semibold text-emerald-200 mb-2">Break-Even Analysis</h4>
                      <p className="text-emerald-100">
                        You'll break even in approximately <span className="font-bold text-emerald-50">{breakEvenMonths.toFixed(1)} months</span>
                      </p>
                    </div>
                  )}
                </div>
              )
            },
            {
              value: "projections",
              label: "Growth Projections",
              icon: Target,
              content: (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label className="text-emerald-200">Year 2 Growth (%)</Label>
                      <Input
                        type="number"
                        value={growthTargets.yearTwoGrowth}
                        onChange={(e) => updateGrowth("yearTwoGrowth", e.target.value)}
                        className="bg-emerald-500/20 border-emerald-400/30"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-emerald-200">Year 3 Growth (%)</Label>
                      <Input
                        type="number"
                        value={growthTargets.yearThreeGrowth}
                        onChange={(e) => updateGrowth("yearThreeGrowth", e.target.value)}
                        className="bg-emerald-500/20 border-emerald-400/30"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-emerald-200">Target Profit Margin (%)</Label>
                      <Input
                        type="number"
                        value={growthTargets.targetProfitMargin}
                        onChange={(e) => updateGrowth("targetProfitMargin", e.target.value)}
                        className="bg-emerald-500/20 border-emerald-400/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-emerald-500/20 rounded-lg">
                      <h4 className="font-semibold text-emerald-200">Year 1 Revenue</h4>
                      <p className="text-xl font-bold text-emerald-100">£{potentialAnnualRevenue.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-4 bg-emerald-500/20 rounded-lg">
                      <h4 className="font-semibold text-emerald-200">Year 2 Revenue</h4>
                      <p className="text-xl font-bold text-emerald-100">£{yearTwoRevenue.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-4 bg-emerald-500/20 rounded-lg">
                      <h4 className="font-semibold text-emerald-200">Year 3 Revenue</h4>
                      <p className="text-xl font-bold text-emerald-100">£{yearThreeRevenue.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-emerald-200">Financial Health Indicators</h4>
                    <div className="space-y-2">
                      <div className="flex flex-col gap-2 p-4 bg-emerald-500/20 rounded">
                        <Badge 
                          variant="outline" 
                          className={`self-start ${profitMargin >= growthTargets.targetProfitMargin ? 'border-green-400 text-green-300' : 'border-orange-400 text-orange-300'}`}
                        >
                          {profitMargin.toFixed(1)}% 
                          {profitMargin >= growthTargets.targetProfitMargin ? ' ✓' : ' ⚠️'}
                        </Badge>
                        <span className="text-emerald-200">Current Profit Margin</span>
                      </div>
                      <div className="flex flex-col gap-2 p-4 bg-emerald-500/20 rounded">
                        <Badge 
                          variant="outline" 
                          className={`self-start ${breakEvenMonths <= 12 ? 'border-green-400 text-green-300' : 'border-orange-400 text-orange-300'}`}
                        >
                          {breakEvenMonths.toFixed(1)} months
                          {breakEvenMonths <= 12 ? ' ✓' : ' ⚠️'}
                        </Badge>
                        <span className="text-emerald-200">Break-Even Period</span>
                      </div>
                      <div className="flex flex-col gap-2 p-4 bg-emerald-500/20 rounded">
                        <Badge 
                          variant="outline" 
                          className="self-start border-emerald-400 text-emerald-300"
                        >
                          {startupCosts.workingCapital > 0 ? `${(startupCosts.workingCapital / totalMonthlyExpenses).toFixed(1)} months` : 'Not set'}
                        </Badge>
                        <span className="text-emerald-200">Cash Flow Runway</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default InteractiveFinancialPlanner;