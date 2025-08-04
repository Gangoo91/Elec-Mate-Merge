import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface MonthlyData {
  month: string;
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

  // Generate monthly projections
  const generateProjections = (): MonthlyData[] => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    // Seasonal multipliers (winter typically lower for electrical work)
    const seasonalMultipliers = [0.8, 0.85, 0.95, 1.05, 1.1, 1.15, 1.2, 1.1, 1.05, 0.95, 0.85, 0.8];
    
    let cumulativeCash = inputs.startingCash;
    
    return months.map((month, index) => {
      const seasonalIncome = inputs.averageMonthlyIncome * seasonalMultipliers[index];
      const variationRange = seasonalIncome * (inputs.seasonalVariation / 100);
      const monthlyIncome = seasonalIncome + (Math.random() - 0.5) * variationRange;
      
      let monthlyExpenses = inputs.monthlyExpenses;
      if (index + 1 === inputs.largeExpenseMonth) {
        monthlyExpenses += inputs.largeExpenseAmount;
      }
      
      const cashFlow = monthlyIncome - monthlyExpenses;
      cumulativeCash += cashFlow;
      
      return {
        month,
        income: monthlyIncome,
        expenses: monthlyExpenses,
        cashFlow,
        cumulativeCash
      };
    });
  };

  const projections = generateProjections();
  const minCashFlow = Math.min(...projections.map(p => p.cumulativeCash));
  const totalAnnualIncome = projections.reduce((sum, p) => sum + p.income, 0);
  const totalAnnualExpenses = projections.reduce((sum, p) => sum + p.expenses, 0);
  const netAnnualCashFlow = totalAnnualIncome - totalAnnualExpenses;
  
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Cash Flow Projector</h1>
        <p className="text-muted-foreground">
          Project your business cash flow for the next 12 months and identify potential issues
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Cash Flow Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="averageMonthlyIncome">Average Monthly Income (£)</Label>
              <Input
                id="averageMonthlyIncome"
                type="number"
                value={inputs.averageMonthlyIncome || ""}
                onChange={(e) => updateInput("averageMonthlyIncome", parseFloat(e.target.value) || 0)}
                placeholder="Expected monthly income"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seasonalVariation">Seasonal Variation (%)</Label>
              <Input
                id="seasonalVariation"
                type="number"
                value={inputs.seasonalVariation || ""}
                onChange={(e) => updateInput("seasonalVariation", parseFloat(e.target.value) || 0)}
                placeholder="Income variation percentage"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyExpenses">Monthly Expenses (£)</Label>
              <Input
                id="monthlyExpenses"
                type="number"
                value={inputs.monthlyExpenses || ""}
                onChange={(e) => updateInput("monthlyExpenses", parseFloat(e.target.value) || 0)}
                placeholder="Regular monthly expenses"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startingCash">Starting Cash (£)</Label>
              <Input
                id="startingCash"
                type="number"
                value={inputs.startingCash || ""}
                onChange={(e) => updateInput("startingCash", parseFloat(e.target.value) || 0)}
                placeholder="Current cash balance"
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="largeExpenseMonth">Large Expense Month</Label>
              <Input
                id="largeExpenseMonth"
                type="number"
                min="1"
                max="12"
                value={inputs.largeExpenseMonth || ""}
                onChange={(e) => updateInput("largeExpenseMonth", parseFloat(e.target.value) || 0)}
                placeholder="Month number (1-12)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="largeExpenseAmount">Large Expense Amount (£)</Label>
              <Input
                id="largeExpenseAmount"
                type="number"
                value={inputs.largeExpenseAmount || ""}
                onChange={(e) => updateInput("largeExpenseAmount", parseFloat(e.target.value) || 0)}
                placeholder="Additional expense amount"
              />
            </div>

            <Button onClick={resetCalculator} variant="outline" className="w-full">
              Reset Calculator
            </Button>
          </CardContent>
        </Card>

        {/* Monthly Projections */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Projections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {projections.map((projection, index) => (
                <div key={projection.month} className="grid grid-cols-4 gap-2 text-sm p-2 rounded bg-muted/30">
                  <div className="font-medium">{projection.month}</div>
                  <div className="text-green-600">£{projection.income.toFixed(0)}</div>
                  <div className="text-red-600">£{projection.expenses.toFixed(0)}</div>
                  <div className={`font-medium ${projection.cumulativeCash < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    £{projection.cumulativeCash.toFixed(0)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-xs text-muted-foreground">
              <div className="grid grid-cols-4 gap-2 font-medium">
                <div>Month</div>
                <div>Income</div>
                <div>Expenses</div>
                <div>Cash</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary & Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Annual Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Income:</span>
                <span className="font-medium text-green-600">£{totalAnnualIncome.toFixed(0)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Expenses:</span>
                <span className="font-medium text-red-600">£{totalAnnualExpenses.toFixed(0)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-semibold">
                <span>Net Cash Flow:</span>
                <span className={netAnnualCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}>
                  £{netAnnualCashFlow.toFixed(0)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lowest Cash Position:</span>
                <span className={`font-medium ${minCashFlow < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  £{minCashFlow.toFixed(0)}
                </span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Cash Flow Analysis</h3>
              
              {minCashFlow < 0 && (
                <div className="p-3 rounded-lg bg-red-50 text-red-800 border border-red-200">
                  ⚠️ Warning: Cash flow goes negative. Consider:
                  <ul className="list-disc list-inside text-xs mt-2">
                    <li>Increasing credit facilities</li>
                    <li>Improving payment terms</li>
                    <li>Building cash reserves</li>
                  </ul>
                </div>
              )}
              
              {minCashFlow >= 0 && minCashFlow < 2000 && (
                <div className="p-3 rounded-lg bg-yellow-50 text-yellow-800 border border-yellow-200">
                  ⚠️ Caution: Low cash reserves. Consider building a larger cash buffer.
                </div>
              )}
              
              {minCashFlow >= 2000 && (
                <div className="p-3 rounded-lg bg-green-50 text-green-800 border border-green-200">
                  ✅ Good: Healthy cash flow maintained throughout the year.
                </div>
              )}
            </div>

            <div className="text-xs text-muted-foreground">
              * Projections include seasonal variations typical for electrical work.
              Actual results may vary based on market conditions.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CashFlowProjector;