import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Calculator, FileText, PiggyBank, TrendingUp, AlertTriangle, RefreshCw } from "lucide-react";

interface TaxInputs {
  // Income & Revenue
  annualRevenue: number;
  monthlyRevenue: number;
  materialCosts: number;
  vehicleExpenses: number;
  toolsEquipment: number;
  insuranceCosts: number;
  professionalFees: number;
  
  // Business Structure
  businessType: string; // 'sole_trader' | 'limited_company' | 'partnership'
  vatRegistered: boolean;
  
  // Personal Finances
  personalAllowance: number;
  pensionContributions: number;
  dividendAllowance: number;
  savingsGoal: number;
}

const TaxFinancesCalculator = () => {
  const [inputs, setInputs] = useState<TaxInputs>({
    annualRevenue: 180000,
    monthlyRevenue: 15000,
    materialCosts: 36000,
    vehicleExpenses: 8400,
    toolsEquipment: 3600,
    insuranceCosts: 2400,
    professionalFees: 1800,
    businessType: 'sole_trader',
    vatRegistered: true,
    personalAllowance: 12570,
    pensionContributions: 0,
    dividendAllowance: 1000,
    savingsGoal: 10000
  });

  const updateInput = (field: keyof TaxInputs, value: number | string | boolean) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const resetCalculator = () => {
    setInputs({
      annualRevenue: 180000,
      monthlyRevenue: 15000,
      materialCosts: 36000,
      vehicleExpenses: 8400,
      toolsEquipment: 3600,
      insuranceCosts: 2400,
      professionalFees: 1800,
      businessType: 'sole_trader',
      vatRegistered: true,
      personalAllowance: 12570,
      pensionContributions: 0,
      dividendAllowance: 1000,
      savingsGoal: 10000
    });
  };

  // Tax Calculations
  const totalExpenses = inputs.materialCosts + inputs.vehicleExpenses + inputs.toolsEquipment + inputs.insuranceCosts + inputs.professionalFees;
  const taxableProfit = inputs.annualRevenue - totalExpenses;
  
  // Income Tax calculation (2024/25 rates)
  const calculateIncomeTax = () => {
    const taxableIncome = Math.max(0, taxableProfit - inputs.personalAllowance);
    let incomeTax = 0;
    
    if (taxableIncome > 50270) {
      incomeTax += (taxableIncome - 50270) * 0.40; // Higher rate
      incomeTax += (50270 - inputs.personalAllowance) * 0.20; // Basic rate
    } else if (taxableIncome > 0) {
      incomeTax += taxableIncome * 0.20; // Basic rate
    }
    
    return incomeTax;
  };

  // National Insurance calculation
  const calculateNationalInsurance = () => {
    const niableProfit = Math.max(0, taxableProfit - 6515); // Class 2 threshold
    let nationalInsurance = 0;
    
    // Class 2 NI
    if (taxableProfit > 6515) {
      nationalInsurance += 180; // Annual Class 2 NI
    }
    
    // Class 4 NI
    if (niableProfit > 12570) {
      const class4Profit = Math.min(niableProfit - 12570, 50270 - 12570);
      nationalInsurance += class4Profit * 0.09;
      
      if (niableProfit > 50270) {
        nationalInsurance += (niableProfit - 50270) * 0.02;
      }
    }
    
    return nationalInsurance;
  };

  // VAT calculation
  const vatDue = inputs.vatRegistered ? (inputs.annualRevenue * 0.20) - (totalExpenses * 0.20) : 0;
  
  const incomeTax = calculateIncomeTax();
  const nationalInsurance = calculateNationalInsurance();
  const totalTaxLiability = incomeTax + nationalInsurance + (inputs.vatRegistered ? vatDue : 0);
  const netIncome = taxableProfit - totalTaxLiability;
  
  // Savings calculations
  const monthlyNetIncome = netIncome / 12;
  const monthlySavingsRate = (inputs.savingsGoal / 12);
  const savingsPercentage = (monthlySavingsRate / monthlyNetIncome) * 100;

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <div className="container mx-auto p-6 space-y-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Calculator className="h-8 w-8 text-elec-yellow" />
            <h1 className="text-3xl font-bold">Tax & Finances Calculator</h1>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Calculate your tax liabilities, plan your finances, and optimise your business structure for maximum efficiency.
          </p>
        </div>

        <Tabs defaultValue="income" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-elec-gray">
            <TabsTrigger value="income">Income & Expenses</TabsTrigger>
            <TabsTrigger value="structure">Business Structure</TabsTrigger>
            <TabsTrigger value="tax">Tax Calculations</TabsTrigger>
            <TabsTrigger value="planning">Financial Planning</TabsTrigger>
          </TabsList>

          <TabsContent value="income" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-elec-yellow" />
                    Revenue & Income
                  </CardTitle>
                  <CardDescription>Your business income streams</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="annualRevenue">Annual Revenue (£)</Label>
                    <Input
                      id="annualRevenue"
                      type="number"
                      value={inputs.annualRevenue}
                      onChange={(e) => updateInput('annualRevenue', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="monthlyRevenue">Monthly Revenue (£)</Label>
                    <Input
                      id="monthlyRevenue"
                      type="number"
                      value={inputs.monthlyRevenue}
                      onChange={(e) => updateInput('monthlyRevenue', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-elec-yellow" />
                    Business Expenses
                  </CardTitle>
                  <CardDescription>Annual allowable business expenses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="materialCosts">Materials & Stock (£)</Label>
                    <Input
                      id="materialCosts"
                      type="number"
                      value={inputs.materialCosts}
                      onChange={(e) => updateInput('materialCosts', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="vehicleExpenses">Vehicle Expenses (£)</Label>
                    <Input
                      id="vehicleExpenses"
                      type="number"
                      value={inputs.vehicleExpenses}
                      onChange={(e) => updateInput('vehicleExpenses', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="toolsEquipment">Tools & Equipment (£)</Label>
                    <Input
                      id="toolsEquipment"
                      type="number"
                      value={inputs.toolsEquipment}
                      onChange={(e) => updateInput('toolsEquipment', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="insuranceCosts">Insurance (£)</Label>
                    <Input
                      id="insuranceCosts"
                      type="number"
                      value={inputs.insuranceCosts}
                      onChange={(e) => updateInput('insuranceCosts', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="professionalFees">Professional Fees (£)</Label>
                    <Input
                      id="professionalFees"
                      type="number"
                      value={inputs.professionalFees}
                      onChange={(e) => updateInput('professionalFees', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="structure" className="space-y-6">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle>Business Structure & Registration</CardTitle>
                <CardDescription>Configure your business setup for tax calculations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="businessType">Business Type</Label>
                  <select
                    id="businessType"
                    value={inputs.businessType}
                    onChange={(e) => updateInput('businessType', e.target.value)}
                    className="w-full mt-1 p-2 bg-elec-dark border border-elec-yellow/30 rounded-md text-white"
                  >
                    <option value="sole_trader">Sole Trader</option>
                    <option value="limited_company">Limited Company</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    id="vatRegistered"
                    type="checkbox"
                    checked={inputs.vatRegistered}
                    onChange={(e) => updateInput('vatRegistered', e.target.checked)}
                    className="rounded border-elec-yellow/30"
                  />
                  <Label htmlFor="vatRegistered">VAT Registered</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tax" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-elec-yellow" />
                    Tax Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Annual Revenue:</span>
                    <span className="font-medium">£{inputs.annualRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Expenses:</span>
                    <span className="font-medium">£{totalExpenses.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxable Profit:</span>
                    <span className="font-medium">£{taxableProfit.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Income Tax:</span>
                    <span className="font-medium">£{incomeTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">National Insurance:</span>
                    <span className="font-medium">£{nationalInsurance.toFixed(2)}</span>
                  </div>
                  {inputs.vatRegistered && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">VAT Due:</span>
                      <span className="font-medium">£{vatDue.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total Tax Liability:</span>
                    <span className="text-red-400">£{totalTaxLiability.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Net Income:</span>
                    <span className="text-green-400">£{netIncome.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                    Tax Planning Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <h4 className="font-medium text-elec-yellow mb-2">Key Reminders:</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Self-assessment deadline: 31 January</li>
                      <li>• Payment on account dates: 31 Jan & 31 Jul</li>
                      <li>• VAT returns due quarterly</li>
                      <li>• Keep records for 6 years minimum</li>
                    </ul>
                  </div>
                  
                  <div className="text-sm">
                    <h4 className="font-medium text-elec-yellow mb-2">Tax Efficiency:</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Consider pension contributions</li>
                      <li>• Claim all allowable expenses</li>
                      <li>• Review business structure annually</li>
                      <li>• Plan major purchases for tax relief</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="planning" className="space-y-6">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-elec-yellow" />
                  Financial Planning & Savings
                </CardTitle>
                <CardDescription>Plan your savings and financial goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="savingsGoal">Annual Savings Goal (£)</Label>
                    <Input
                      id="savingsGoal"
                      type="number"
                      value={inputs.savingsGoal}
                      onChange={(e) => updateInput('savingsGoal', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="pensionContributions">Annual Pension Contributions (£)</Label>
                    <Input
                      id="pensionContributions"
                      type="number"
                      value={inputs.pensionContributions}
                      onChange={(e) => updateInput('pensionContributions', Number(e.target.value))}
                      className="bg-elec-dark border-elec-yellow/30"
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-elec-dark rounded">
                    <div className="text-sm text-muted-foreground">Monthly Net Income</div>
                    <div className="text-xl font-bold text-green-400">£{monthlyNetIncome.toFixed(0)}</div>
                  </div>
                  
                  <div className="p-4 bg-elec-dark rounded">
                    <div className="text-sm text-muted-foreground">Monthly Savings Needed</div>
                    <div className="text-xl font-bold text-blue-400">£{monthlySavingsRate.toFixed(0)}</div>
                  </div>
                  
                  <div className="p-4 bg-elec-dark rounded">
                    <div className="text-sm text-muted-foreground">Savings Rate</div>
                    <div className={`text-xl font-bold ${savingsPercentage > 20 ? 'text-green-400' : savingsPercentage > 10 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {savingsPercentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center">
          <Button
            onClick={resetCalculator}
            variant="outline"
            className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-elec-dark"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset Calculator
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaxFinancesCalculator;