import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calculator, AlertTriangle, PiggyBank, TrendingUp, RefreshCw, Lightbulb } from "lucide-react";

interface TaxInputs {
  // Income & Revenue
  annualRevenue: number;
  materialCosts: number;
  vehicleExpenses: number;
  toolsEquipment: number;
  insuranceCosts: number;
  professionalFees: number;
  
  // Business Structure
  businessType: string;
  vatRegistered: boolean;
  
  // Personal Finances
  personalAllowance: number;
  pensionContributions: number;
  savingsGoal: number;
}

const TaxFinancesCalculator = () => {
  const [inputs, setInputs] = useState<TaxInputs>({
    annualRevenue: 180000,
    materialCosts: 36000,
    vehicleExpenses: 8400,
    toolsEquipment: 3600,
    insuranceCosts: 2400,
    professionalFees: 1800,
    businessType: "sole_trader",
    vatRegistered: true,
    personalAllowance: 12570,
    pensionContributions: 0,
    savingsGoal: 10000
  });

  const [showResults, setShowResults] = useState(false);

  const updateInput = (field: keyof TaxInputs, value: number | string | boolean) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateTax = () => {
    setShowResults(true);
  };

  const resetCalculator = () => {
    setInputs({
      annualRevenue: 180000,
      materialCosts: 36000,
      vehicleExpenses: 8400,
      toolsEquipment: 3600,
      insuranceCosts: 2400,
      professionalFees: 1800,
      businessType: "sole_trader",
      vatRegistered: true,
      personalAllowance: 12570,
      pensionContributions: 0,
      savingsGoal: 10000
    });
    setShowResults(false);
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
    const niableProfit = Math.max(0, taxableProfit - 6515);
    let nationalInsurance = 0;
    
    if (taxableProfit > 6515) {
      nationalInsurance += 180; // Annual Class 2 NI
    }
    
    if (niableProfit > 12570) {
      const class4Profit = Math.min(niableProfit - 12570, 50270 - 12570);
      nationalInsurance += class4Profit * 0.09;
      
      if (niableProfit > 50270) {
        nationalInsurance += (niableProfit - 50270) * 0.02;
      }
    }
    
    return nationalInsurance;
  };

  const vatDue = inputs.vatRegistered ? (inputs.annualRevenue * 0.20) - (totalExpenses * 0.20) : 0;
  const incomeTax = calculateIncomeTax();
  const nationalInsurance = calculateNationalInsurance();
  const totalTaxLiability = incomeTax + nationalInsurance + (inputs.vatRegistered ? vatDue : 0);
  const netIncome = taxableProfit - totalTaxLiability;
  const monthlyNetIncome = netIncome / 12;
  const monthlySavingsRate = inputs.savingsGoal / 12;
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
            Enter your business details below to calculate your tax liabilities and plan your finances effectively.
          </p>
        </div>

        {/* Input Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-elec-yellow" />
                Revenue & Income
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="annualRevenue">Annual Revenue (£)</Label>
                <Input
                  id="annualRevenue"
                  type="number"
                  value={inputs.annualRevenue}
                  onChange={(e) => updateInput("annualRevenue", Number(e.target.value))}
                  className="bg-elec-dark border-elec-yellow/30"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Business Expenses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="materialCosts">Materials & Stock (£)</Label>
                <Input
                  id="materialCosts"
                  type="number"
                  value={inputs.materialCosts}
                  onChange={(e) => updateInput("materialCosts", Number(e.target.value))}
                  className="bg-elec-dark border-elec-yellow/30"
                />
              </div>
              
              <div>
                <Label htmlFor="vehicleExpenses">Vehicle Expenses (£)</Label>
                <Input
                  id="vehicleExpenses"
                  type="number"
                  value={inputs.vehicleExpenses}
                  onChange={(e) => updateInput("vehicleExpenses", Number(e.target.value))}
                  className="bg-elec-dark border-elec-yellow/30"
                />
              </div>
              
              <div>
                <Label htmlFor="toolsEquipment">Tools & Equipment (£)</Label>
                <Input
                  id="toolsEquipment"
                  type="number"
                  value={inputs.toolsEquipment}
                  onChange={(e) => updateInput("toolsEquipment", Number(e.target.value))}
                  className="bg-elec-dark border-elec-yellow/30"
                />
              </div>
              
              <div>
                <Label htmlFor="insuranceCosts">Insurance (£)</Label>
                <Input
                  id="insuranceCosts"
                  type="number"
                  value={inputs.insuranceCosts}
                  onChange={(e) => updateInput("insuranceCosts", Number(e.target.value))}
                  className="bg-elec-dark border-elec-yellow/30"
                />
              </div>
              
              <div>
                <Label htmlFor="professionalFees">Professional Fees (£)</Label>
                <Input
                  id="professionalFees"
                  type="number"
                  value={inputs.professionalFees}
                  onChange={(e) => updateInput("professionalFees", Number(e.target.value))}
                  className="bg-elec-dark border-elec-yellow/30"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Business Setup & Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="businessType">Business Type</Label>
                <select
                  id="businessType"
                  value={inputs.businessType}
                  onChange={(e) => updateInput("businessType", e.target.value)}
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
                  onChange={(e) => updateInput("vatRegistered", e.target.checked)}
                  className="rounded border-elec-yellow/30"
                />
                <Label htmlFor="vatRegistered">VAT Registered</Label>
              </div>

              <div>
                <Label htmlFor="pensionContributions">Annual Pension Contributions (£)</Label>
                <Input
                  id="pensionContributions"
                  type="number"
                  value={inputs.pensionContributions}
                  onChange={(e) => updateInput("pensionContributions", Number(e.target.value))}
                  className="bg-elec-dark border-elec-yellow/30"
                />
              </div>

              <div>
                <Label htmlFor="savingsGoal">Annual Savings Goal (£)</Label>
                <Input
                  id="savingsGoal"
                  type="number"
                  value={inputs.savingsGoal}
                  onChange={(e) => updateInput("savingsGoal", Number(e.target.value))}
                  className="bg-elec-dark border-elec-yellow/30"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calculate Button */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={calculateTax}
            className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 px-8 py-3 text-lg font-medium"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Tax & Finances
          </Button>
          
          <Button
            onClick={resetCalculator}
            variant="outline"
            className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-elec-dark"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Results Section */}
        {showResults && (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-elec-yellow" />
                    Your Tax Breakdown
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
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Tax Liability:</span>
                    <span className="text-red-400">£{totalTaxLiability.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Net Income:</span>
                    <span className="text-green-400">£{netIncome.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PiggyBank className="h-5 w-5 text-elec-yellow" />
                    Financial Planning
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-elec-dark rounded">
                      <div className="text-sm text-muted-foreground">Monthly Net Income</div>
                      <div className="text-xl font-bold text-green-400">£{monthlyNetIncome.toFixed(0)}</div>
                    </div>
                    
                    <div className="p-3 bg-elec-dark rounded">
                      <div className="text-sm text-muted-foreground">Monthly Savings Needed</div>
                      <div className="text-xl font-bold text-blue-400">£{monthlySavingsRate.toFixed(0)}</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-elec-dark rounded text-center">
                    <div className="text-sm text-muted-foreground">Savings Rate</div>
                    <div className={`text-2xl font-bold ${savingsPercentage > 20 ? "text-green-400" : savingsPercentage > 10 ? "text-yellow-400" : "text-red-400"}`}>
                      {savingsPercentage.toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {savingsPercentage > 20 ? "Excellent savings rate!" : 
                       savingsPercentage > 10 ? "Good savings rate" : 
                       "Consider increasing savings"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Learning & Scenarios Section */}
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-elec-yellow" />
                  Real-World Insights & Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-elec-yellow mb-3">Tax Efficiency Tips</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• <strong>Pension Contributions:</strong> You could save £{(incomeTax * 0.2).toFixed(0)} in tax by contributing more to pension</li>
                      <li>• <strong>Equipment Purchases:</strong> Buy tools before tax year end for immediate relief</li>
                      <li>• <strong>Business Structure:</strong> {inputs.businessType === "sole_trader" && taxableProfit > 100000 ? "Consider limited company structure for tax efficiency" : "Current structure looks appropriate"}</li>
                      <li>• <strong>VAT Planning:</strong> {inputs.vatRegistered ? "Monitor VAT threshold if revenue decreases" : taxableProfit > 85000 ? "Consider VAT registration - you may be close to threshold" : "VAT registration not required yet"}</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-elec-yellow mb-3">Scenario Planning</h4>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-elec-dark rounded">
                        <div className="font-medium text-blue-400">If Revenue Increases 20%:</div>
                        <div>Net Income: £{((taxableProfit * 1.2) - (totalTaxLiability * 1.3)).toFixed(0)}</div>
                        <div className="text-xs text-muted-foreground">Higher rate tax may apply</div>
                      </div>
                      
                      <div className="p-3 bg-elec-dark rounded">
                        <div className="font-medium text-yellow-400">Emergency Fund Needed:</div>
                        <div>3 months expenses: £{(monthlyNetIncome * 3).toFixed(0)}</div>
                        <div className="text-xs text-muted-foreground">Recommended business safety net</div>
                      </div>
                      
                      <div className="p-3 bg-elec-dark rounded">
                        <div className="font-medium text-green-400">Retirement Planning:</div>
                        <div>Annual pension target: £{(netIncome * 0.15).toFixed(0)}</div>
                        <div className="text-xs text-muted-foreground">15% of net income recommended</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Card className="border-yellow-500/20 bg-yellow-500/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-yellow-400">
                      <AlertTriangle className="h-5 w-5" />
                      Important Reminders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium mb-2">Key Dates:</h5>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Self-assessment deadline: 31 January</li>
                          <li>• Payment on account: 31 Jan & 31 Jul</li>
                          <li>• VAT returns: Quarterly deadlines</li>
                          <li>• Corporation tax: 9 months after year end</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Record Keeping:</h5>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Keep receipts for 6 years minimum</li>
                          <li>• Digital records are acceptable</li>
                          <li>• Separate business and personal expenses</li>
                          <li>• Consider cloud-based accounting software</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default TaxFinancesCalculator;