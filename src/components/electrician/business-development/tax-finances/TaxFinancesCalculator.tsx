import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { MobileInput } from "@/components/ui/mobile-input";
import { useToast } from "@/hooks/use-toast";
import {
  Calculator,
  PoundSterling,
  TrendingUp,
  AlertTriangle,
  Target,
  FileText,
  Lightbulb,
  Download,
  RefreshCw,
  CheckCircle,
  Receipt
} from "lucide-react";

interface TaxCalculations {
  grossProfit: number;
  netProfit: number;
  incomeTax: number;
  nationalInsurance: number;
  corporationTax: number;
  vatQuarterly: number;
  totalTaxes: number;
  takeHomePay: number;
  profitMargin: number;
  expenseRatio: number;
}

const TaxFinancesCalculator = () => {
  const { toast } = useToast();
  
  // Form state
  const [revenue, setRevenue] = useState<string>('');
  const [expenses, setExpenses] = useState<string>('');
  const [businessStructure, setBusinessStructure] = useState<'sole-trader' | 'limited-company'>('sole-trader');
  const [vatRegistered, setVatRegistered] = useState<boolean>(false);
  const [calculations, setCalculations] = useState<TaxCalculations | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  
  // Validation state
  const [revenueError, setRevenueError] = useState<string>('');
  const [expensesError, setExpensesError] = useState<string>('');

  // Preset values for quick setup
  const revenuePresets = [
    { label: 'New Electrician', value: 35000, description: 'First year electrical contractor' },
    { label: 'Established Solo', value: 55000, description: 'Experienced sole trader' },
    { label: 'Small Team', value: 120000, description: 'Business with apprentices' },
    { label: 'Growing Business', value: 250000, description: 'Multiple contracts' }
  ];

  // Expense ratio suggestions based on industry standards
  const getExpenseRatioSuggestion = (revenueValue: number) => {
    if (revenueValue < 50000) return { ratio: 0.35, description: 'New contractor typical expenses' };
    if (revenueValue < 100000) return { ratio: 0.32, description: 'Established business efficiency' };
    if (revenueValue < 200000) return { ratio: 0.30, description: 'Growing business economies' };
    return { ratio: 0.28, description: 'Mature business optimization' };
  };

  // Validation functions
  const validateRevenue = (value: string): string => {
    const numValue = parseFloat(value);
    if (!value) return 'Revenue is required';
    if (isNaN(numValue)) return 'Please enter a valid number';
    if (numValue < 0) return 'Revenue cannot be negative';
    if (numValue > 10000000) return 'Revenue seems unusually high';
    return '';
  };

  const validateExpenses = (value: string): string => {
    const numValue = parseFloat(value);
    const revenueValue = parseFloat(revenue);
    if (!value) return 'Expenses are required';
    if (isNaN(numValue)) return 'Please enter a valid number';
    if (numValue < 0) return 'Expenses cannot be negative';
    if (revenueValue && numValue > revenueValue) return 'Expenses cannot exceed revenue';
    return '';
  };

  // Real-time calculation function
  const calculateTaxes = (revenueValue: number, expensesValue: number): TaxCalculations => {
    const grossProfit = revenueValue - expensesValue;
    
    let incomeTax = 0;
    let nationalInsurance = 0;
    let corporationTax = 0;
    
    if (businessStructure === 'sole-trader') {
      // Sole trader calculations (2024/25 rates)
      const personalAllowance = 12570;
      const basicRateThreshold = 37700;
      const higherRateThreshold = 125140;
      
      // Income tax
      const taxableIncome = Math.max(0, grossProfit - personalAllowance);
      if (taxableIncome > 0) {
        if (taxableIncome <= basicRateThreshold) {
          incomeTax = taxableIncome * 0.20;
        } else if (taxableIncome <= higherRateThreshold) {
          incomeTax = (basicRateThreshold * 0.20) + ((taxableIncome - basicRateThreshold) * 0.40);
        } else {
          incomeTax = (basicRateThreshold * 0.20) + ((higherRateThreshold - basicRateThreshold) * 0.40) + ((taxableIncome - higherRateThreshold) * 0.45);
        }
      }
      
      // National Insurance (Class 2 and Class 4)
      const class2Threshold = 6515;
      const class4LowerThreshold = 12570;
      const class4UpperThreshold = 50270;
      
      if (grossProfit > class2Threshold) {
        nationalInsurance += 163.80; // Class 2 annual
      }
      
      if (grossProfit > class4LowerThreshold) {
        const class4Profit = Math.min(grossProfit, class4UpperThreshold) - class4LowerThreshold;
        nationalInsurance += class4Profit * 0.09;
        
        if (grossProfit > class4UpperThreshold) {
          nationalInsurance += (grossProfit - class4UpperThreshold) * 0.02;
        }
      }
    } else {
      // Limited company calculations
      const corporationTaxRate = 0.19; // Small companies rate for profits under £250k
      corporationTax = grossProfit * corporationTaxRate;
    }
    
    const vatQuarterly = vatRegistered ? (revenueValue * 0.20) / 4 : 0;
    const totalTaxes = incomeTax + nationalInsurance + corporationTax + (vatQuarterly * 4);
    const netProfit = grossProfit - totalTaxes;
    const takeHomePay = businessStructure === 'sole-trader' ? netProfit : netProfit * 0.8; // Rough dividend estimate
    const profitMargin = (grossProfit / revenueValue) * 100;
    const expenseRatio = (expensesValue / revenueValue) * 100;
    
    return {
      grossProfit,
      netProfit,
      incomeTax,
      nationalInsurance,
      corporationTax,
      vatQuarterly,
      totalTaxes,
      takeHomePay,
      profitMargin,
      expenseRatio
    };
  };

  // Real-time calculation effect
  useEffect(() => {
    const revenueValue = parseFloat(revenue);
    const expensesValue = parseFloat(expenses);
    
    if (!isNaN(revenueValue) && !isNaN(expensesValue) && revenueValue > 0) {
      setIsCalculating(true);
      
      // Simulate calculation delay for better UX
      const timer = setTimeout(() => {
        const results = calculateTaxes(revenueValue, expensesValue);
        setCalculations(results);
        setIsCalculating(false);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setCalculations(null);
    }
  }, [revenue, expenses, businessStructure, vatRegistered]);

  const handleRevenueChange = (value: string) => {
    setRevenue(value);
    const error = validateRevenue(value);
    setRevenueError(error);
  };

  const handleExpensesChange = (value: string) => {
    setExpenses(value);
    const error = validateExpenses(value);
    setExpensesError(error);
  };

  const applyRevenuePreset = (presetValue: number) => {
    setRevenue(presetValue.toString());
    setRevenueError('');
    
    // Auto-suggest expenses based on ratio
    const suggestion = getExpenseRatioSuggestion(presetValue);
    const suggestedExpenses = Math.round(presetValue * suggestion.ratio);
    setExpenses(suggestedExpenses.toString());
    setExpensesError('');
    
    toast({
      title: "Preset Applied",
      description: `Revenue set to £${presetValue.toLocaleString()} with suggested expenses`,
      variant: "success"
    });
  };

  const applyExpenseRatio = (ratio: number) => {
    const revenueValue = parseFloat(revenue);
    if (!isNaN(revenueValue)) {
      const suggestedExpenses = Math.round(revenueValue * ratio);
      setExpenses(suggestedExpenses.toString());
      setExpensesError('');
      
      toast({
        title: "Expense Ratio Applied",
        description: `Expenses set to ${(ratio * 100).toFixed(0)}% of revenue`,
        variant: "success"
      });
    }
  };

  const resetCalculator = () => {
    setRevenue('');
    setExpenses('');
    setRevenueError('');
    setExpensesError('');
    setCalculations(null);
    
    toast({
      title: "Calculator Reset",
      description: "All fields have been cleared",
      variant: "default"
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Main Calculator Container */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
            <Calculator className="h-6 w-6 text-primary" />
            Tax & Finances Calculator
          </CardTitle>
          <p className="text-muted-foreground text-sm md:text-base">
            Calculate taxes, profit margins, and take-home pay for UK electrical contractors
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Business Structure Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Business Structure</Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant={businessStructure === 'sole-trader' ? 'default' : 'outline'}
                onClick={() => setBusinessStructure('sole-trader')}
                className="flex-1"
              >
                Sole Trader
              </Button>
              <Button
                variant={businessStructure === 'limited-company' ? 'default' : 'outline'}
                onClick={() => setBusinessStructure('limited-company')}
                className="flex-1"
              >
                Limited Company
              </Button>
            </div>
          </div>

          {/* VAT Registration */}
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">VAT Registered</Label>
            <Button
              variant={vatRegistered ? 'default' : 'outline'}
              size="sm"
              onClick={() => setVatRegistered(!vatRegistered)}
            >
              {vatRegistered ? 'Yes' : 'No'}
            </Button>
          </div>

          {/* Revenue Input Section */}
          <Card className="border-green-500/30 bg-green-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Annual Revenue & Income
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MobileInput
                label="Total Annual Revenue (£)"
                type="number"
                value={revenue}
                onChange={(e) => handleRevenueChange(e.target.value)}
                placeholder="Enter your total annual revenue"
                error={revenueError}
                hint="Include all business income before expenses"
              />
              
              {/* Revenue Presets */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Quick Presets:</Label>
                <div className="grid grid-cols-2 gap-2">
                  {revenuePresets.map((preset) => (
                    <Button
                      key={preset.label}
                      variant="outline"
                      size="sm"
                      onClick={() => applyRevenuePreset(preset.value)}
                      className="text-xs h-auto py-2 px-3 flex flex-col items-start"
                    >
                      <span className="font-medium">{preset.label}</span>
                      <span className="text-green-600">{formatCurrency(preset.value)}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expenses Input Section */}
          <Card className="border-orange-500/30 bg-orange-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Receipt className="h-5 w-5 text-orange-500" />
                Annual Business Expenses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MobileInput
                label="Total Annual Expenses (£)"
                type="number"
                value={expenses}
                onChange={(e) => handleExpensesChange(e.target.value)}
                placeholder="Enter your total annual expenses"
                error={expensesError}
                hint="Include all legitimate business expenses"
              />
              
              {/* Expense Ratio Suggestions */}
              {revenue && !isNaN(parseFloat(revenue)) && (
                <div className="space-y-3">
                  <Label className="text-xs text-muted-foreground">
                    Expense Ratio Suggestions:
                  </Label>
                  {[0.25, 0.30, 0.35, 0.40].map((ratio) => {
                    const suggestion = getExpenseRatioSuggestion(parseFloat(revenue));
                    const suggestedAmount = Math.round(parseFloat(revenue) * ratio);
                    const isRecommended = Math.abs(ratio - suggestion.ratio) < 0.03;
                    
                    return (
                      <Button
                        key={ratio}
                        variant="outline"
                        size="sm"
                        onClick={() => applyExpenseRatio(ratio)}
                        className={`w-full justify-between text-xs h-auto py-2 ${
                          isRecommended ? 'border-orange-500/50 bg-orange-500/10' : ''
                        }`}
                      >
                        <span>{(ratio * 100).toFixed(0)}% of revenue</span>
                        <span className="text-orange-600">{formatCurrency(suggestedAmount)}</span>
                        {isRecommended && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            Recommended
                          </Badge>
                        )}
                      </Button>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Progress Indicator */}
          {(revenue || expenses) && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {isCalculating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Calculating...
                </>
              ) : calculations ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Calculations complete
                </>
              ) : (
                <>
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  Complete all fields to see results
                </>
              )}
            </div>
          )}

          {/* Reset Button */}
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={resetCalculator}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Calculator
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {calculations && (
        <Card className="border-blue-500/30 bg-blue-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Target className="h-6 w-6 text-blue-500" />
              Tax Calculations & Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {/* Key Metrics */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Key Financial Metrics</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Gross Profit:</span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(calculations.grossProfit)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Profit Margin:</span>
                    <span className="font-medium">
                      {calculations.profitMargin.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Expense Ratio:</span>
                    <span className="font-medium">
                      {calculations.expenseRatio.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Tax Breakdown */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Tax Breakdown</h3>
                <div className="space-y-2">
                  {businessStructure === 'sole-trader' ? (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Income Tax:</span>
                        <span className="font-medium text-red-600">
                          {formatCurrency(calculations.incomeTax)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">National Insurance:</span>
                        <span className="font-medium text-red-600">
                          {formatCurrency(calculations.nationalInsurance)}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Corporation Tax:</span>
                      <span className="font-medium text-red-600">
                        {formatCurrency(calculations.corporationTax)}
                      </span>
                    </div>
                  )}
                  {vatRegistered && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm">VAT (Quarterly):</span>
                      <span className="font-medium text-orange-600">
                        {formatCurrency(calculations.vatQuarterly)}
                      </span>
                    </div>
                  )}
                  <hr className="my-2" />
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Annual Taxes:</span>
                    <span className="font-bold text-red-600">
                      {formatCurrency(calculations.totalTaxes)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Take Home Pay */}
              <div className="md:col-span-2 mt-4">
                <Card className="border-green-500/50 bg-green-500/10">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">
                        Estimated Take-Home Pay:
                      </span>
                      <span className="text-2xl font-bold text-green-600">
                        {formatCurrency(calculations.takeHomePay)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {businessStructure === 'sole-trader' 
                        ? 'Net profit after all taxes and National Insurance'
                        : 'Estimated dividends after corporation tax (80% of net profit)'
                      }
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Professional Advice Notice */}
      <Card className="border-orange-500/50 bg-orange-500/10">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-orange-300 mb-2">Professional Advice Recommended</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                These calculations are estimates based on current UK tax rates and standard allowances. 
                Your actual tax liability may vary depending on personal circumstances, other income sources, 
                and specific business deductions. Always consult with a qualified accountant for accurate 
                tax planning and compliance advice.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxFinancesCalculator;