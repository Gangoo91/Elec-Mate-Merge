import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/common/BackButton";
import { useToast } from "@/hooks/use-toast";
import { Calculator, PoundSterling, HelpCircle, AlertTriangle, CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import { MARKET_RATES_2025 } from "@/lib/constants/pricing-2025";

interface TaxInputs {
  annualRevenue: number;
  businessExpenses: number;
  personalAllowanceUsed: number;
  businessStructure: 'sole-trader' | 'limited-company' | 'partnership';
  vatRegistered: boolean;
  nationalInsuranceClass: '2-and-4' | 'employed' | 'both';
}

const TaxEstimator = () => {
  const { toast } = useToast();
  const [inputs, setInputs] = useState<TaxInputs>({
    annualRevenue: 45000,
    businessExpenses: 12000,
    personalAllowanceUsed: 12570, // 2025/26 personal allowance
    businessStructure: 'sole-trader',
    vatRegistered: false,
    nationalInsuranceClass: '2-and-4'
  });
  
  const [calculated, setCalculated] = useState(false);

  const updateInput = (field: keyof TaxInputs, value: number | string | boolean) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setCalculated(false);
  };

  const calculateTax = () => {
    setCalculated(true);
    toast({
      title: "Tax Estimation Complete",
      description: "Your 2025/26 tax calculation is ready.",
      variant: "success"
    });
  };

  // Tax calculations using 2025/26 rates
  const taxableProfit = Math.max(0, inputs.annualRevenue - inputs.businessExpenses);
  const personalTaxableIncome = Math.max(0, taxableProfit - inputs.personalAllowanceUsed);
  
  // Income Tax calculation
  const basicRateIncome = Math.min(personalTaxableIncome, MARKET_RATES_2025.taxRates.basicRateThreshold);
  const higherRateIncome = Math.max(0, personalTaxableIncome - MARKET_RATES_2025.taxRates.basicRateThreshold);
  
  const basicRateTax = basicRateIncome * (MARKET_RATES_2025.taxRates.basicRate / 100);
  const higherRateTax = higherRateIncome * (MARKET_RATES_2025.taxRates.higherRate / 100);
  const totalIncomeTax = basicRateTax + higherRateTax;

  // National Insurance calculation (Class 2 & 4 for sole traders)
  const class2NI = taxableProfit > 6515 ? 183.60 : 0; // 2025/26 Class 2 NI
  const class4NIableProfit = Math.max(0, taxableProfit - MARKET_RATES_2025.taxRates.niThreshold);
  const class4NI = class4NIableProfit * (MARKET_RATES_2025.taxRates.niRate / 100);
  const totalNI = class2NI + class4NI;

  // VAT calculation
  const vatDue = inputs.vatRegistered ? (inputs.annualRevenue * (MARKET_RATES_2025.taxRates.vatRate / 100)) : 0;
  const vatOnExpenses = inputs.vatRegistered ? (inputs.businessExpenses * (MARKET_RATES_2025.taxRates.vatRate / 100)) : 0;
  const netVATDue = Math.max(0, vatDue - vatOnExpenses);

  // Total tax liability
  const totalTax = totalIncomeTax + totalNI + netVATDue;
  const takeHomePay = Math.max(0, inputs.annualRevenue - inputs.businessExpenses - totalTax);
  const effectiveTaxRate = inputs.annualRevenue > 0 ? (totalTax / inputs.annualRevenue) * 100 : 0;

  const businessStructureOptions = [
    { value: 'sole-trader', label: 'Sole Trader' },
    { value: 'limited-company', label: 'Limited Company' },
    { value: 'partnership', label: 'Partnership' }
  ];

  const niClassOptions = [
    { value: '2-and-4', label: 'Class 2 & 4 (Self-employed)' },
    { value: 'employed', label: 'Class 1 (Employed)' },
    { value: 'both', label: 'Both (Mixed employment)' }
  ];

  const getTaxEfficiencyStatus = () => {
    if (effectiveTaxRate < 15) {
      return {
        status: 'excellent',
        color: 'text-green-300',
        bgColor: 'bg-green-500/20 border-green-500/30',
        icon: <CheckCircle className="h-4 w-4" />,
        message: 'Excellent tax efficiency'
      };
    } else if (effectiveTaxRate < 25) {
      return {
        status: 'good',
        color: 'text-yellow-300',
        bgColor: 'bg-yellow-500/20 border-yellow-500/30',
        icon: <HelpCircle className="h-4 w-4" />,
        message: 'Good tax efficiency'
      };
    } else {
      return {
        status: 'high',
        color: 'text-red-300',
        bgColor: 'bg-red-500/20 border-red-500/30',
        icon: <AlertTriangle className="h-4 w-4" />,
        message: 'High tax rate - consider planning'
      };
    }
  };

  const taxStatus = getTaxEfficiencyStatus();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Helmet>
        <title>Tax & NI Estimator 2025/26 | UK Electrician Calculator</title>
        <meta name="description" content="Calculate UK electrician tax and National Insurance for 2025/26. Income tax, Class 2/4 NI, VAT and take-home pay calculator." />
        <link rel="canonical" href="/electrician/business-development/tools/tax-estimator" />
      </Helmet>
      
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <PoundSterling className="h-8 w-8 text-elec-yellow" />
          Tax & NI Estimator 2025/26
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-6">
          Calculate your Income Tax, National Insurance, and VAT liability for the 2025/26 tax year.
          Updated with latest HMRC rates and thresholds.
        </p>
        <BackButton customUrl="/electrician/business-development/tools" label="Back to Calculators" />
      </div>

      <WhyThisMatters
        points={[
          "Plan cash flow by knowing quarterly tax payments in advance.",
          "Compare sole trader vs limited company tax efficiency.",
          "Ensure compliance with 2025/26 HMRC rates and Making Tax Digital."
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-foreground">Tax Calculation Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <MobileSelectWrapper
              label="Business Structure"
              value={inputs.businessStructure}
              onValueChange={(value) => updateInput('businessStructure', value)}
              options={businessStructureOptions}
              hint="Affects tax rates and allowances"
            />

            <MobileInput
              label="Annual Revenue"
              type="number"
              value={inputs.annualRevenue || ""}
              onChange={(e) => updateInput('annualRevenue', parseFloat(e.target.value) || 0)}
              unit="£"
              hint="Gross income before expenses"
            />

            <MobileInput
              label="Business Expenses"
              type="number"
              value={inputs.businessExpenses || ""}
              onChange={(e) => updateInput('businessExpenses', parseFloat(e.target.value) || 0)}
              unit="£"
              hint="Allowable business expenses (ex VAT)"
            />

            <MobileInput
              label="Personal Allowance Used"
              type="number"
              value={inputs.personalAllowanceUsed || ""}
              onChange={(e) => updateInput('personalAllowanceUsed', parseFloat(e.target.value) || 0)}
              unit="£"
              hint={`2025/26 full allowance: £${MARKET_RATES_2025.taxRates.personalAllowance.toLocaleString()}`}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">VAT Registered?</span>
                <div className="inline-flex rounded-xl overflow-hidden border border-elec-yellow/30">
                  <Button
                    variant={inputs.vatRegistered ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateInput('vatRegistered', true)}
                    className={
                      (inputs.vatRegistered ? "bg-elec-yellow text-black" : "text-elec-yellow hover:bg-elec-yellow/10") +
                      " h-12 rounded-none border-0 flex-1"
                    }
                  >
                    Yes
                  </Button>
                  <Button
                    variant={!inputs.vatRegistered ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateInput('vatRegistered', false)}
                    className={
                      (!inputs.vatRegistered ? "bg-elec-yellow text-black" : "text-elec-yellow hover:bg-elec-yellow/10") +
                      " h-12 rounded-none border-0 flex-1"
                    }
                  >
                    No
                  </Button>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                VAT threshold 2025/26: £{MARKET_RATES_2025.taxRates.vatThreshold.toLocaleString()}
              </div>
            </div>

            <MobileSelectWrapper
              label="National Insurance Class"
              value={inputs.nationalInsuranceClass}
              onValueChange={(value) => updateInput('nationalInsuranceClass', value)}
              options={niClassOptions}
              hint="Determines NI calculation method"
            />

            <Button 
              onClick={calculateTax} 
              className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Tax & NI
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-foreground">2025/26 Tax Calculation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {calculated && (
              <>
                {/* Tax Status Indicator */}
                {taxStatus && (
                  <div className={`p-4 rounded-lg border ${taxStatus.bgColor}`}>
                    <div className={`flex items-center gap-2 ${taxStatus.color}`}>
                      {taxStatus.icon}
                      <span className="font-medium">{taxStatus.message}</span>
                      <Badge variant="secondary" className="ml-auto">
                        {effectiveTaxRate.toFixed(1)}% effective rate
                      </Badge>
                    </div>
                  </div>
                )}

                {/* Detailed Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Taxable Profit</span>
                    <span className="font-medium">£{taxableProfit.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Income Tax</span>
                    <span className="font-medium">£{totalIncomeTax.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>National Insurance</span>
                    <span className="font-medium">£{totalNI.toLocaleString()}</span>
                  </div>
                  
                  {inputs.vatRegistered && (
                    <div className="flex justify-between text-sm">
                      <span>Net VAT Due</span>
                      <span className="font-medium">£{netVATDue.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total Tax Liability</span>
                      <span className="text-elec-yellow">£{totalTax.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Take-Home Pay</span>
                    <span className="text-green-400">£{takeHomePay.toLocaleString()}</span>
                  </div>
                </div>

                {/* Key Dates Reminder */}
                <div className="bg-muted/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-elec-yellow">Key 2025/26 Dates</h4>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <div>• Self Assessment deadline: 31 Jan 2026</div>
                    <div>• Payment on account: 31 Jul 2025 & 31 Jan 2026</div>
                    <div>• VAT returns: Quarterly (if registered)</div>
                    <div>• Making Tax Digital: Mandatory for ITSA from April 2026</div>
                  </div>
                </div>
              </>
            )}

            {!calculated && (
              <div className="text-center text-muted-foreground py-8">
                <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter your details and click Calculate to see your tax estimation</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {calculated && (
        <Card className="border-elec-yellow/20 bg-elec-card mt-8">
          <CardHeader>
            <CardTitle className="text-foreground">Important Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>• This is an estimate based on 2025/26 tax rates and may not account for all personal circumstances.</p>
              <p>• Consider professional tax advice for complex situations or significant business changes.</p>
              <p>• Making Tax Digital (MTD) for Income Tax becomes mandatory from April 2026 for eligible businesses.</p>
              <p>• Keep detailed records of all business income and expenses for HMRC compliance.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaxEstimator;