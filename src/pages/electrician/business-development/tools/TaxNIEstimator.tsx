import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/common/BackButton";
import { useToast } from "@/hooks/use-toast";
import { PoundSterling, HelpCircle, TrendingUp, AlertCircle, CheckCircle, Download, Lightbulb, Calculator } from "lucide-react";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import { Helmet } from "react-helmet";

interface TaxInputs {
  annualIncome: number;
  businessExpenses: number;
  capitalAllowances: number;
  pensionContributions: number;
  charitableDonations: number;
  marriageAllowanceTransfer: boolean;
  hasBusinessPartner: boolean;
  vatRegistered: boolean;
  vatTurnover: number;
  corporationTax: boolean;
  dividendIncome: number;
}

const TaxNIEstimator = () => {
  const { toast } = useToast();
  const [inputs, setInputs] = useState<TaxInputs>({
    annualIncome: 0,
    businessExpenses: 0,
    capitalAllowances: 0,
    pensionContributions: 0,
    charitableDonations: 0,
    marriageAllowanceTransfer: false,
    hasBusinessPartner: false,
    vatRegistered: false,
    vatTurnover: 0,
    corporationTax: false,
    dividendIncome: 0,
  });

  const [calculated, setCalculated] = useState(false);

  const updateInput = (field: keyof TaxInputs, value: number | boolean) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
    setCalculated(false);
  };

  const calculateTax = () => {
    setCalculated(true);
    toast({
      title: "Tax Estimation Complete",
      description: "Your tax and National Insurance calculations have been updated.",
      variant: "success"
    });
  };

  const resetCalculator = () => {
    setInputs({
      annualIncome: 0,
      businessExpenses: 0,
      capitalAllowances: 0,
      pensionContributions: 0,
      charitableDonations: 0,
      marriageAllowanceTransfer: false,
      hasBusinessPartner: false,
      vatRegistered: false,
      vatTurnover: 0,
      corporationTax: false,
      dividendIncome: 0,
    });
    setCalculated(false);
    toast({
      title: "Calculator Reset",
      description: "All fields have been cleared.",
      variant: "default"
    });
  };

  const loadExample = () => {
    setInputs({
      annualIncome: 55000,
      businessExpenses: 8500,
      capitalAllowances: 3000,
      pensionContributions: 4000,
      charitableDonations: 500,
      marriageAllowanceTransfer: false,
      hasBusinessPartner: false,
      vatRegistered: true,
      vatTurnover: 65000,
      corporationTax: false,
      dividendIncome: 0,
    });
    setCalculated(false);
  };

  // UK Tax Year 2024/25 rates and thresholds
  const TAX_RATES = {
    personalAllowance: 12570,
    basicRateThreshold: 37700,
    higherRateThreshold: 125140,
    basicRate: 0.20,
    higherRate: 0.40,
    additionalRate: 0.45,
    niLowerEarningsLimit: 6396,
    niUpperEarningsLimit: 50270,
    niClass2Rate: 3.45,
    niClass4LowerRate: 0.09,
    niClass4HigherRate: 0.02,
    marriageAllowance: 1260,
    vatThreshold: 85000,
    vatRate: 0.20
  };

  // Calculate tax and NI
  const calculateEstimates = () => {
    if (!calculated) return {
      taxableIncome: 0,
      incomeTax: 0,
      nationalInsurance: 0,
      totalTaxNI: 0,
      netIncome: 0,
      effectiveRate: 0,
      vat: 0,
      totalLiabilities: 0,
      monthlyTaxNI: 0,
      quarterlyTaxNI: 0
    };

    // Calculate taxable income
    const grossProfit = inputs.annualIncome - inputs.businessExpenses - inputs.capitalAllowances;
    let personalAllowance = TAX_RATES.personalAllowance;
    
    // Reduce personal allowance for high earners
    if (grossProfit > 100000) {
      const reduction = Math.min(personalAllowance, (grossProfit - 100000) / 2);
      personalAllowance -= reduction;
    }

    // Marriage allowance transfer
    if (inputs.marriageAllowanceTransfer) {
      personalAllowance += TAX_RATES.marriageAllowance;
    }

    const taxableIncome = Math.max(0, grossProfit - personalAllowance - inputs.pensionContributions - inputs.charitableDonations);

    // Calculate income tax
    let incomeTax = 0;
    if (taxableIncome > 0) {
      if (taxableIncome <= TAX_RATES.basicRateThreshold) {
        incomeTax = taxableIncome * TAX_RATES.basicRate;
      } else if (taxableIncome <= TAX_RATES.higherRateThreshold) {
        incomeTax = (TAX_RATES.basicRateThreshold * TAX_RATES.basicRate) + 
                   ((taxableIncome - TAX_RATES.basicRateThreshold) * TAX_RATES.higherRate);
      } else {
        incomeTax = (TAX_RATES.basicRateThreshold * TAX_RATES.basicRate) + 
                   ((TAX_RATES.higherRateThreshold - TAX_RATES.basicRateThreshold) * TAX_RATES.higherRate) +
                   ((taxableIncome - TAX_RATES.higherRateThreshold) * TAX_RATES.additionalRate);
      }
    }

    // Calculate National Insurance (Self-employed)
    let nationalInsurance = 0;
    
    // Class 2 NI (if profit > £6,396)
    if (grossProfit > TAX_RATES.niLowerEarningsLimit) {
      nationalInsurance += TAX_RATES.niClass2Rate * 52; // Weekly rate
    }

    // Class 4 NI
    if (grossProfit > TAX_RATES.niLowerEarningsLimit) {
      const class4Profit = Math.min(grossProfit, TAX_RATES.niUpperEarningsLimit) - TAX_RATES.niLowerEarningsLimit;
      nationalInsurance += class4Profit * TAX_RATES.niClass4LowerRate;
      
      if (grossProfit > TAX_RATES.niUpperEarningsLimit) {
        nationalInsurance += (grossProfit - TAX_RATES.niUpperEarningsLimit) * TAX_RATES.niClass4HigherRate;
      }
    }

    // Calculate VAT liability
    let vat = 0;
    if (inputs.vatRegistered && inputs.vatTurnover > 0) {
      vat = inputs.vatTurnover * TAX_RATES.vatRate;
    }

    const totalTaxNI = incomeTax + nationalInsurance;
    const totalLiabilities = totalTaxNI + vat;
    const netIncome = grossProfit - totalTaxNI;
    const effectiveRate = grossProfit > 0 ? (totalTaxNI / grossProfit) * 100 : 0;
    const monthlyTaxNI = totalTaxNI / 12;
    const quarterlyTaxNI = totalTaxNI / 4;

    return {
      taxableIncome,
      incomeTax,
      nationalInsurance,
      totalTaxNI,
      netIncome,
      effectiveRate,
      vat,
      totalLiabilities,
      monthlyTaxNI,
      quarterlyTaxNI,
      grossProfit
    };
  };

  const estimates = calculateEstimates();

  const getTaxEfficiencyAssessment = () => {
    if (!calculated) return null;
    
    if (estimates.effectiveRate <= 15) {
      return {
        status: "efficient",
        icon: <CheckCircle className="h-5 w-5" />,
        title: "Tax Efficient",
        message: `Low effective rate of ${estimates.effectiveRate.toFixed(1)}% - good tax planning`,
        color: "text-green-300",
        bgColor: "bg-green-500/20 border-green-500/30"
      };
    } else if (estimates.effectiveRate <= 25) {
      return {
        status: "moderate",
        icon: <AlertCircle className="h-5 w-5" />,
        title: "Moderate Tax Burden",
        message: `Effective rate of ${estimates.effectiveRate.toFixed(1)}% - consider tax planning`,
        color: "text-yellow-300",
        bgColor: "bg-yellow-500/20 border-yellow-500/30"
      };
    } else {
      return {
        status: "high",
        icon: <AlertCircle className="h-5 w-5" />,
        title: "High Tax Burden",
        message: `High effective rate of ${estimates.effectiveRate.toFixed(1)}% - seek professional advice`,
        color: "text-red-300",
        bgColor: "bg-red-500/20 border-red-500/30"
      };
    }
  };

  const taxAssessment = getTaxEfficiencyAssessment();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Helmet>
        <title>UK Tax & NI Estimator for Electricians | 2024/25</title>
        <meta name="description" content="Estimate UK Income Tax, National Insurance and VAT impacts for electricians. Mobile-first and BS 7671 aligned." />
        <link rel="canonical" href="/electrician/business-development/tools/tax-estimator" />
      </Helmet>
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <PoundSterling className="h-8 w-8 text-elec-yellow" />
          Tax & NI Estimator
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-6">
          Estimate your Income Tax and National Insurance liabilities for accurate financial planning.
          Essential for BS7671 18th Edition compliant electrical contractors managing business finances.
        </p>
        <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4 mt-4 max-w-2xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-orange-300 mt-0.5" />
            <div>
              <h4 className="text-orange-300 font-medium mb-2">Important Notice</h4>
              <p className="text-sm text-orange-200">
                This calculator provides estimates based on 2024/25 tax year rates. 
                Always consult a qualified accountant for accurate tax advice and compliance.
              </p>
            </div>
          </div>
        </div>
        <BackButton customUrl="/electrician/business-development/tools" label="Back to Calculators" />
      </div>

      <WhyThisMatters
        points={[
          "Shows likely tax/NI so you can plan payments and avoid surprises.",
          "Explores impacts of VAT registration and allowances on net income.",
          "Converts annual liabilities into monthly/quarterly figures for cash flow."
        ]}
      />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calculator className="h-5 w-5 text-elec-yellow" />
              Income & Deductions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Business Income</h4>
              
              <MobileInput
                label="Annual Business Income"
                type="number"
                value={inputs.annualIncome || ""}
                onChange={(e) => updateInput('annualIncome', parseFloat(e.target.value) || 0)}
                unit="£"
                hint="Total revenue before expenses"
              />

              <MobileInput
                label="Business Expenses"
                type="number"
                value={inputs.businessExpenses || ""}
                onChange={(e) => updateInput('businessExpenses', parseFloat(e.target.value) || 0)}
                unit="£"
                hint="Deductible business costs"
              />

              <MobileInput
                label="Capital Allowances"
                type="number"
                value={inputs.capitalAllowances || ""}
                onChange={(e) => updateInput('capitalAllowances', parseFloat(e.target.value) || 0)}
                unit="£"
                hint="Equipment and vehicle allowances"
              />
            </div>

            <Separator className="bg-elec-yellow/20" />

            <div className="space-y-4">
              <h4 className="text-white font-semibold">Additional Deductions</h4>
              
              <MobileInput
                label="Pension Contributions"
                type="number"
                value={inputs.pensionContributions || ""}
                onChange={(e) => updateInput('pensionContributions', parseFloat(e.target.value) || 0)}
                unit="£"
                hint="Annual pension payments"
              />

              <MobileInput
                label="Charitable Donations"
                type="number"
                value={inputs.charitableDonations || ""}
                onChange={(e) => updateInput('charitableDonations', parseFloat(e.target.value) || 0)}
                unit="£"
                hint="Gift Aid eligible donations"
              />

              <MobileInput
                label="Dividend Income"
                type="number"
                value={inputs.dividendIncome || ""}
                onChange={(e) => updateInput('dividendIncome', parseFloat(e.target.value) || 0)}
                unit="£"
                hint="If operating as a limited company"
              />
            </div>

            <Separator className="bg-elec-yellow/20" />

            <div className="space-y-4">
              <h4 className="text-white font-semibold">VAT Registration</h4>
              
              <div className="space-y-2">
                <label className="text-white text-sm font-medium">VAT Registered?</label>
                <div className="flex gap-2">
                  <Button
                    variant={inputs.vatRegistered ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateInput('vatRegistered', true)}
                    className={inputs.vatRegistered 
                      ? "bg-elec-yellow text-black" 
                      : "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                    }
                  >
                    Yes
                  </Button>
                  <Button
                    variant={!inputs.vatRegistered ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateInput('vatRegistered', false)}
                    className={!inputs.vatRegistered 
                      ? "bg-elec-yellow text-black" 
                      : "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                    }
                  >
                    No
                  </Button>
                </div>
              </div>

              {inputs.vatRegistered && (
                <MobileInput
                  label="VAT Taxable Turnover"
                  type="number"
                  value={inputs.vatTurnover || ""}
                  onChange={(e) => updateInput('vatTurnover', parseFloat(e.target.value) || 0)}
                  unit="£"
                  hint="Annual VAT taxable sales"
                />
              )}
            </div>

            <Separator className="bg-elec-yellow/20" />

            <div className="space-y-4">
              <h4 className="text-white font-semibold">Personal Circumstances</h4>
              
              <div className="space-y-2">
                <label className="text-white text-sm font-medium">Marriage Allowance Transfer?</label>
                <div className="flex gap-2">
                  <Button
                    variant={inputs.marriageAllowanceTransfer ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateInput('marriageAllowanceTransfer', true)}
                    className={inputs.marriageAllowanceTransfer 
                      ? "bg-elec-yellow text-black" 
                      : "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                    }
                  >
                    Yes
                  </Button>
                  <Button
                    variant={!inputs.marriageAllowanceTransfer ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateInput('marriageAllowanceTransfer', false)}
                    className={!inputs.marriageAllowanceTransfer 
                      ? "bg-elec-yellow text-black" 
                      : "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                    }
                  >
                    No
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Receiving unused allowance from spouse</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={calculateTax}
                className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                <PoundSterling className="h-4 w-4 mr-2" />
                Calculate
              </Button>
              <Button 
                onClick={loadExample}
                variant="outline"
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
              >
                Example
              </Button>
            </div>

            <Button 
              onClick={resetCalculator}
              variant="outline"
              className="w-full border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
            >
              Reset All
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="border-elec-yellow/20 bg-elec-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-elec-yellow" />
              Tax & NI Estimation
              {calculated && (
                <Badge variant="success" className="ml-auto">
                  Calculated
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!calculated ? (
              <div className="text-center py-12">
                <PoundSterling className="h-16 w-16 text-elec-yellow/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Ready to Calculate</h3>
                <p className="text-muted-foreground">
                  Enter your income and expense details, then click "Calculate" to see your tax estimation.
                </p>
              </div>
            ) : (
              <>
                {/* Summary Cards */}
                <div className="grid md:grid-cols-4 gap-4">
                  <Card className="border-elec-yellow/10 bg-elec-gray">
                    <CardContent className="pt-6 text-center">
                      <h4 className="text-white font-semibold mb-2">Income Tax</h4>
                      <p className="text-2xl font-bold text-red-400">£{estimates.incomeTax.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground mt-2">Annual</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-elec-yellow/10 bg-elec-gray">
                    <CardContent className="pt-6 text-center">
                      <h4 className="text-white font-semibold mb-2">National Insurance</h4>
                      <p className="text-2xl font-bold text-orange-400">£{estimates.nationalInsurance.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground mt-2">Annual</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-elec-yellow/10 bg-elec-gray">
                    <CardContent className="pt-6 text-center">
                      <h4 className="text-white font-semibold mb-2">Total Tax & NI</h4>
                      <p className="text-2xl font-bold text-elec-yellow">£{estimates.totalTaxNI.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground mt-2">Annual</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-elec-yellow/10 bg-elec-gray">
                    <CardContent className="pt-6 text-center">
                      <h4 className="text-white font-semibold mb-2">Effective Rate</h4>
                      <p className={`text-2xl font-bold ${estimates.effectiveRate <= 20 ? 'text-green-400' : estimates.effectiveRate <= 30 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {estimates.effectiveRate.toFixed(1)}%
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">Of profit</p>
                    </CardContent>
                  </Card>
                </div>

                <Separator className="bg-elec-yellow/30" />

                {/* Detailed Breakdown */}
                <div className="space-y-4">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <PoundSterling className="h-4 w-4 text-elec-yellow" />
                    Income Breakdown
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Business Income:</span>
                          <span className="text-white">£{inputs.annualIncome.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Business Expenses:</span>
                          <span className="text-red-400">-£{inputs.businessExpenses.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Capital Allowances:</span>
                          <span className="text-red-400">-£{inputs.capitalAllowances.toFixed(2)}</span>
                        </div>
                        <Separator className="bg-elec-yellow/20" />
                        <div className="flex justify-between font-semibold">
                          <span className="text-white">Gross Profit:</span>
                          <span className="text-elec-yellow">£{estimates.grossProfit.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Personal Allowance:</span>
                          <span className="text-green-400">-£{TAX_RATES.personalAllowance.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Pension Contributions:</span>
                          <span className="text-green-400">-£{inputs.pensionContributions.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Charitable Donations:</span>
                          <span className="text-green-400">-£{inputs.charitableDonations.toFixed(2)}</span>
                        </div>
                        <Separator className="bg-elec-yellow/20" />
                        <div className="flex justify-between font-semibold">
                          <span className="text-white">Taxable Income:</span>
                          <span className="text-elec-yellow">£{estimates.taxableIncome.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-elec-yellow/30" />

                {/* Payment Schedule */}
                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Payment Schedule</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm">Monthly Reserve</p>
                      <p className="text-2xl font-bold text-blue-400">£{estimates.monthlyTaxNI.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground mt-1">Save monthly for tax</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm">Self Assessment</p>
                      <p className="text-2xl font-bold text-orange-400">£{(estimates.totalTaxNI / 2).toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground mt-1">31st Jan payment</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm">Payment on Account</p>
                      <p className="text-2xl font-bold text-yellow-400">£{(estimates.totalTaxNI / 2).toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground mt-1">31st July payment</p>
                    </div>
                  </div>
                </div>

                {inputs.vatRegistered && (
                  <>
                    <Separator className="bg-elec-yellow/30" />
                    <div className="space-y-4">
                      <h4 className="text-white font-semibold">VAT Liability</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-muted-foreground text-sm">Annual VAT</p>
                          <p className="text-2xl font-bold text-purple-400">£{estimates.vat.toFixed(2)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground text-sm">Quarterly VAT</p>
                          <p className="text-2xl font-bold text-purple-300">£{(estimates.vat / 4).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Tax Efficiency Assessment */}
                {taxAssessment && (
                  <>
                    <Separator className="bg-elec-yellow/30" />
                    <div className={`p-6 rounded-lg border ${taxAssessment.bgColor}`}>
                      <div className={`flex items-center gap-3 mb-3 ${taxAssessment.color}`}>
                        {taxAssessment.icon}
                        <h3 className="font-semibold text-lg">{taxAssessment.title}</h3>
                      </div>
                      <p className={`${taxAssessment.color.replace('300', '200')} mb-4`}>
                        {taxAssessment.message}
                      </p>
                      
                      <div className="bg-background/10 rounded-lg p-4 mt-4">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="h-5 w-5 text-elec-yellow mt-0.5" />
                          <div>
                            <h4 className="text-white font-medium mb-2">Tax Planning Insight</h4>
                            <p className="text-sm text-muted-foreground">
                              {taxAssessment.status === "efficient"
                                ? "You're managing your tax efficiently. Continue maximising allowable expenses and consider additional pension contributions for further savings."
                                : taxAssessment.status === "moderate"
                                ? "Consider reviewing your expense claims, capital allowances, and pension contributions. A qualified accountant could help optimize your tax position."
                                : "Your tax burden is quite high. Professional tax advice is recommended to explore incorporation, expense optimization, and other tax-efficient strategies."
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Export Button */}
                <div className="flex justify-end pt-4">
                  <Button 
                    variant="outline"
                    className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                    onClick={() => {
                      toast({
                        title: "Export Feature",
                        description: "Tax estimation export functionality coming soon!",
                        variant: "default"
                      });
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Estimates
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tips */}
      <Card className="border-elec-yellow/20 bg-elec-card mt-8">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            Tax Planning Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="text-elec-yellow font-semibold">Expense Management</h4>
              <p className="text-sm text-muted-foreground">
                Keep detailed records of all business expenses. Van costs, tools, insurance, and training are all deductible for electrical contractors.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-elec-yellow font-semibold">Capital Allowances</h4>
              <p className="text-sm text-muted-foreground">
                Claim Annual Investment Allowance on equipment purchases. BS7671 testing equipment and tools often qualify for immediate relief.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-elec-yellow font-semibold">Payment Planning</h4>
              <p className="text-sm text-muted-foreground">
                Set aside money monthly for tax payments. Self Assessment deadlines are strict, and late payment penalties can be costly.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxNIEstimator;