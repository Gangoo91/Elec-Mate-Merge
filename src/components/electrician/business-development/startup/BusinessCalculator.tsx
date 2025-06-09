
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BusinessCalculator = () => {
  const [inputs, setInputs] = useState({
    hourlyRate: 45,
    hoursPerWeek: 35,
    weeksPerYear: 48,
    monthlyExpenses: 3000,
    materialMarkup: 20
  });

  const [results, setResults] = useState({
    annualRevenue: 0,
    monthlyRevenue: 0,
    annualProfit: 0,
    monthlyProfit: 0,
    breakEvenHours: 0,
    profitMargin: 0
  });

  const calculateResults = () => {
    const annualHours = inputs.hoursPerWeek * inputs.weeksPerYear;
    const annualRevenue = annualHours * inputs.hourlyRate;
    const monthlyRevenue = annualRevenue / 12;
    const annualExpenses = inputs.monthlyExpenses * 12;
    const annualProfit = annualRevenue - annualExpenses;
    const monthlyProfit = annualProfit / 12;
    const breakEvenHours = inputs.monthlyExpenses / inputs.hourlyRate;
    const profitMargin = (annualProfit / annualRevenue) * 100;

    setResults({
      annualRevenue,
      monthlyRevenue,
      annualProfit,
      monthlyProfit,
      breakEvenHours,
      profitMargin
    });
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getResultColor = (value: number, type: 'profit' | 'margin') => {
    if (type === 'profit') {
      return value > 0 ? 'text-green-400' : 'text-red-400';
    }
    if (type === 'margin') {
      if (value > 25) return 'text-green-400';
      if (value > 15) return 'text-amber-400';
      return 'text-red-400';
    }
    return 'text-white';
  };

  return (
    <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
      <CardHeader>
        <CardTitle className="text-blue-400 flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Business Finance Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white mb-3">Your Business Parameters</h4>
            
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate (£)</Label>
              <Input
                id="hourlyRate"
                type="number"
                value={inputs.hourlyRate}
                onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                className="bg-elec-dark"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hoursPerWeek">Billable Hours per Week</Label>
              <Input
                id="hoursPerWeek"
                type="number"
                value={inputs.hoursPerWeek}
                onChange={(e) => handleInputChange('hoursPerWeek', e.target.value)}
                className="bg-elec-dark"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weeksPerYear">Working Weeks per Year</Label>
              <Input
                id="weeksPerYear"
                type="number"
                value={inputs.weeksPerYear}
                onChange={(e) => handleInputChange('weeksPerYear', e.target.value)}
                className="bg-elec-dark"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyExpenses">Monthly Expenses (£)</Label>
              <Input
                id="monthlyExpenses"
                type="number"
                value={inputs.monthlyExpenses}
                onChange={(e) => handleInputChange('monthlyExpenses', e.target.value)}
                className="bg-elec-dark"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="materialMarkup">Material Markup (%)</Label>
              <Input
                id="materialMarkup"
                type="number"
                value={inputs.materialMarkup}
                onChange={(e) => handleInputChange('materialMarkup', e.target.value)}
                className="bg-elec-dark"
              />
            </div>

            <Button onClick={calculateResults} className="w-full">
              Calculate Results
            </Button>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white mb-3">Financial Projections</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-elec-dark p-4 rounded-lg border border-blue-500/20">
                <div className="text-sm text-muted-foreground">Annual Revenue</div>
                <div className="text-xl font-bold text-blue-400">
                  {formatCurrency(results.annualRevenue)}
                </div>
              </div>
              
              <div className="bg-elec-dark p-4 rounded-lg border border-green-500/20">
                <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                <div className="text-xl font-bold text-green-400">
                  {formatCurrency(results.monthlyRevenue)}
                </div>
              </div>
              
              <div className="bg-elec-dark p-4 rounded-lg border border-purple-500/20">
                <div className="text-sm text-muted-foreground">Annual Profit</div>
                <div className={`text-xl font-bold ${getResultColor(results.annualProfit, 'profit')}`}>
                  {formatCurrency(results.annualProfit)}
                </div>
              </div>
              
              <div className="bg-elec-dark p-4 rounded-lg border border-amber-500/20">
                <div className="text-sm text-muted-foreground">Monthly Profit</div>
                <div className={`text-xl font-bold ${getResultColor(results.monthlyProfit, 'profit')}`}>
                  {formatCurrency(results.monthlyProfit)}
                </div>
              </div>
            </div>

            <div className="bg-elec-dark p-4 rounded-lg border border-elec-yellow/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Break-even Hours/Month</span>
                <span className="text-lg font-bold text-elec-yellow">
                  {results.breakEvenHours.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Profit Margin</span>
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-bold ${getResultColor(results.profitMargin, 'margin')}`}>
                    {results.profitMargin.toFixed(1)}%
                  </span>
                  <Badge className={
                    results.profitMargin > 25 ? "bg-green-500/20 text-green-400" :
                    results.profitMargin > 15 ? "bg-amber-500/20 text-amber-400" :
                    "bg-red-500/20 text-red-400"
                  }>
                    {results.profitMargin > 25 ? "Excellent" :
                     results.profitMargin > 15 ? "Good" : "Needs Improvement"}
                  </Badge>
                </div>
              </div>
            </div>

            {results.profitMargin < 15 && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-amber-400" />
                  <span className="text-sm font-medium text-amber-400">Improvement Suggestions</span>
                </div>
                <ul className="text-xs space-y-1 text-amber-200">
                  <li>• Consider increasing your hourly rate</li>
                  <li>• Look for ways to reduce monthly expenses</li>
                  <li>• Increase billable hours per week</li>
                  <li>• Add higher-margin specialisation services</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCalculator;
