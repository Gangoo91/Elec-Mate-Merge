import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MobileInput } from '@/components/ui/mobile-input';
import { MobileSelectWrapper } from '@/components/ui/mobile-select-wrapper';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BackButton from '@/components/common/BackButton';
import { useToast } from '@/hooks/use-toast';
import { Calculator, PoundSterling, HelpCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet';
import WhyThisMatters from '@/components/common/WhyThisMatters';
import {
  calculateSelfEmployedTax,
  ratesFor,
  CURRENT_TAX_YEAR,
  TAX_YEAR_KEYS,
  isRateTableStale,
} from '@/data/uk-tax-rates';

interface TaxInputs {
  annualRevenue: number;
  businessExpenses: number;
  pensionContributions: number;
  businessStructure: 'sole-trader' | 'limited-company' | 'partnership';
  vatRegistered: boolean;
  /** VAT-bearing purchases, excluding VAT. */
  vatPurchases: number;
}

const TaxEstimator = () => {
  const { toast } = useToast();
  const [inputs, setInputs] = useState<TaxInputs>({
    annualRevenue: 45000,
    businessExpenses: 12000,
    pensionContributions: 0,
    businessStructure: 'sole-trader',
    vatRegistered: false,
    vatPurchases: 0,
  });

  const [taxYear, setTaxYear] = useState<string>(CURRENT_TAX_YEAR);
  // Results are LIVE. This was `useState(false)`, so a calculator with every
  // input already populated refused to answer until you pressed a button,
  // showing a dead "Ready to Calculate" panel in the meantime. Every value
  // needed is in state on first render, so there is nothing to wait for.
  // The `isValid` guards downstream still hold results back when the inputs
  // genuinely do not make sense.
  const [calculated, setCalculated] = useState(true);
  const rateTableStale = isRateTableStale();
  const rates = ratesFor(taxYear);

  const updateInput = (field: keyof TaxInputs, value: number | string | boolean) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const calculateTax = () => {
    setCalculated(true);
    toast({
      title: 'Tax Estimation Complete',
      description: `Your ${taxYear} tax calculation is ready.`,
      variant: 'success',
    });
  };

  // Every rate and every step of the maths comes from src/data/uk-tax-rates.ts.
  const taxableProfit = Math.max(0, inputs.annualRevenue - inputs.businessExpenses);
  const result = calculateSelfEmployedTax(
    {
      profit: taxableProfit,
      grossPensionContributions: inputs.pensionContributions,
    },
    taxYear
  );

  const totalIncomeTax = result.incomeTax;
  const class2NI = result.class2;
  const class4NI = result.class4;
  const totalNI = result.nationalInsurance;

  // VAT — output less input. This is money collected from customers and passed
  // to HMRC, so it is reported separately and never folded into the tax bill.
  const outputVat = inputs.vatRegistered ? inputs.annualRevenue * rates.vatStandardRate : 0;
  const inputVat = inputs.vatRegistered ? inputs.vatPurchases * rates.vatStandardRate : 0;
  const netVATDue = outputVat - inputVat;

  const totalTax = result.totalTaxAndNI;
  const takeHomePay = result.takeHome;
  const effectiveTaxRate = result.effectiveRate;

  const businessStructureOptions = [
    { value: 'sole-trader', label: 'Sole Trader' },
    { value: 'limited-company', label: 'Limited Company' },
    { value: 'partnership', label: 'Partnership' },
  ];

  const taxYearOptions = TAX_YEAR_KEYS.map((year) => ({ value: year, label: year }));

  const getTaxEfficiencyStatus = () => {
    if (effectiveTaxRate < 15) {
      return {
        status: 'excellent',
        color: 'text-green-300',
        bgColor: 'bg-green-500/20 border-green-500/30',
        icon: <CheckCircle className="h-4 w-4" />,
        message: 'Excellent tax efficiency',
      };
    } else if (effectiveTaxRate < 25) {
      return {
        status: 'good',
        color: 'text-yellow-300',
        bgColor: 'bg-yellow-500/20 border-yellow-500/30',
        icon: <HelpCircle className="h-4 w-4" />,
        message: 'Good tax efficiency',
      };
    } else {
      return {
        status: 'high',
        color: 'text-red-300',
        bgColor: 'bg-red-500/20 border-red-500/30',
        icon: <AlertTriangle className="h-4 w-4" />,
        message: 'High tax rate - consider planning',
      };
    }
  };

  const taxStatus = getTaxEfficiencyStatus();

  return (
    <div className="bg-background  ">
      <div className="container mx-auto px-4 py-8 max-w-6xl animate-fade-in">
        <Helmet>
          <title>Tax &amp; NI Estimator {taxYear} | UK Electrician Calculator</title>
          <meta
            name="description"
            content="Estimate Income Tax, Class 4 National Insurance, your net VAT position and take-home pay as a self-employed electrician in England, Wales and Northern Ireland."
          />
          <link rel="canonical" href="/electrician/business-development/tools/tax-estimator" />
        </Helmet>

        <div className="flex flex-col items-center justify-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
            <PoundSterling className="h-8 w-8 text-elec-yellow" />
            Tax &amp; NI Estimator {taxYear}
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl mb-6">
            Estimate your Income Tax, National Insurance and net VAT position for the {taxYear} tax
            year.
          </p>
          <BackButton
            customUrl="/electrician/business-development/tools"
            label="Back to Calculators"
          />
        </div>

        {rateTableStale && (
          <div className="mb-6 p-4 rounded-lg border border-red-500/30 bg-red-500/10">
            <div className="flex items-start gap-2 text-red-300">
              <AlertTriangle className="h-4 w-4 mt-0.5" />
              <p className="text-sm">
                We do not yet hold rates for the current tax year ({CURRENT_TAX_YEAR}), so the newest
                figures here are from an earlier year. Check the current HMRC rates before relying on
                them.
              </p>
            </div>
          </div>
        )}

        <div className="mb-6 p-4 rounded-lg border border-amber-500/30 bg-amber-500/10">
          <div className="flex items-start gap-2 text-amber-300">
            <AlertTriangle className="h-4 w-4 mt-0.5" />
            <p className="text-sm">
              These figures cover <strong>England, Wales and Northern Ireland only</strong>. Scottish
              income tax has different rates and bands and is not modelled — a Scottish taxpayer will
              get the wrong income tax figure. National Insurance and VAT are the same UK-wide. Only
              the sole trader position is calculated; limited company and partnership tax are not
              modelled.
            </p>
          </div>
        </div>

        <WhyThisMatters
          points={[
            'Plan cash flow by knowing your payments on account in advance.',
            'See what the next £1 of profit actually costs you in tax and NI.',
            'Keep VAT separate — it is collected for HMRC, not income.',
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
                label="Tax Year"
                value={taxYear}
                onValueChange={(value) => {
                  setTaxYear(value);
                }}
                options={taxYearOptions}
                hint="Rates and thresholds for the year selected"
              />

              <MobileSelectWrapper
                label="Business Structure"
                value={inputs.businessStructure}
                onValueChange={(value) => updateInput('businessStructure', value)}
                options={businessStructureOptions}
                hint="Only the sole trader position is calculated"
              />

              {inputs.businessStructure !== 'sole-trader' && (
                <div className="flex items-start gap-2 text-amber-300 text-xs">
                  <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>
                    Limited company and partnership tax are not modelled. The figures below are the
                    sole trader position.
                  </span>
                </div>
              )}

              <MobileInput
                label="Annual Revenue"
                type="number"
                value={inputs.annualRevenue || ''}
                onChange={(e) => updateInput('annualRevenue', parseFloat(e.target.value) || 0)}
                unit="£"
                hint="Gross income before expenses"
              />

              <MobileInput
                label="Business Expenses"
                type="number"
                value={inputs.businessExpenses || ''}
                onChange={(e) => updateInput('businessExpenses', parseFloat(e.target.value) || 0)}
                unit="£"
                hint="Allowable business expenses (ex VAT)"
              />

              <MobileInput
                label="Pension Contributions"
                type="number"
                value={inputs.pensionContributions || ''}
                onChange={(e) => updateInput('pensionContributions', parseFloat(e.target.value) || 0)}
                unit="£"
                hint="Gross, including basic-rate relief. Widens your basic-rate band."
              />

              <div className="text-xs text-muted-foreground">
                Personal allowance is worked out for you: £
                {rates.personalAllowance.toLocaleString('en-GB')} for {taxYear}, tapering above £
                {rates.personalAllowanceTaperFrom.toLocaleString('en-GB')}.
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">VAT Registered?</span>
                  <div className="inline-flex rounded-xl overflow-hidden border border-elec-yellow/30">
                    <Button
                      variant={inputs.vatRegistered ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateInput('vatRegistered', true)}
                      className={
                        (inputs.vatRegistered
                          ? 'bg-elec-yellow text-black'
                          : 'text-elec-yellow hover:bg-elec-yellow/10') +
                        ' h-12 rounded-none border-0 flex-1'
                      }
                    >
                      Yes
                    </Button>
                    <Button
                      variant={!inputs.vatRegistered ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateInput('vatRegistered', false)}
                      className={
                        (!inputs.vatRegistered
                          ? 'bg-elec-yellow text-black'
                          : 'text-elec-yellow hover:bg-elec-yellow/10') +
                        ' h-12 rounded-none border-0 flex-1'
                      }
                    >
                      No
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  VAT registration threshold {taxYear}: £
                  {rates.vatRegistrationThreshold.toLocaleString('en-GB')}
                </div>
              </div>

              {inputs.vatRegistered && (
                <MobileInput
                  label="VAT-bearing Purchases"
                  type="number"
                  value={inputs.vatPurchases || ''}
                  onChange={(e) => updateInput('vatPurchases', parseFloat(e.target.value) || 0)}
                  unit="£"
                  hint="Materials, fuel and other standard-rated costs, excluding VAT. The VAT on these is reclaimable."
                />
              )}

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
              <CardTitle className="text-foreground">{taxYear} Tax Calculation</CardTitle>
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
                      <span className="font-medium">£{Math.round(taxableProfit).toLocaleString('en-GB')}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Personal Allowance</span>
                      <span className="font-medium">
                        £{Math.round(result.personalAllowance).toLocaleString('en-GB')}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Income Tax</span>
                      <span className="font-medium">£{Math.round(totalIncomeTax).toLocaleString('en-GB')}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Class 4 NI</span>
                      <span className="font-medium">£{Math.round(class4NI).toLocaleString('en-GB')}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Class 2 NI</span>
                      <span className="font-medium">£{Math.round(class2NI).toLocaleString('en-GB')}</span>
                    </div>

                    <div className="border-t pt-3">
                      <div className="flex justify-between font-semibold">
                        <span>Total Tax &amp; NI</span>
                        <span className="text-elec-yellow">£{Math.round(totalTax).toLocaleString('en-GB')}</span>
                      </div>
                    </div>

                    <div className="flex justify-between font-semibold text-lg">
                      <span>Take-Home Pay</span>
                      <span className="text-green-400">£{Math.round(takeHomePay).toLocaleString('en-GB')}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Marginal rate on the next £1</span>
                      <span className="font-medium">{result.marginalRate.toFixed(0)}%</span>
                    </div>
                  </div>

                  {/* VAT — reported separately, deliberately outside the tax total */}
                  {inputs.vatRegistered && (
                    <div className="bg-muted/10 p-4 rounded-lg space-y-2">
                      <h4 className="font-semibold text-elec-yellow">
                        VAT — collected on behalf of HMRC
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        VAT is charged to your customers and passed on. It is not a cost to your
                        business and is not included in the Total Tax &amp; NI above.
                      </p>
                      <div className="flex justify-between text-sm">
                        <span>Output VAT charged</span>
                        <span className="font-medium">£{Math.round(outputVat).toLocaleString('en-GB')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Input VAT reclaimed</span>
                        <span className="font-medium">-£{Math.round(inputVat).toLocaleString('en-GB')}</span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold border-t pt-2">
                        <span>{netVATDue < 0 ? 'Net reclaim from HMRC' : 'Net VAT payable'}</span>
                        <span>£{Math.round(Math.abs(netVATDue)).toLocaleString('en-GB')}</span>
                      </div>
                    </div>
                  )}

                  {/* Notes raised by the calculation itself */}
                  {result.notes.length > 0 && (
                    <div className="bg-muted/10 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-elec-yellow">Worth knowing</h4>
                      <div className="text-sm space-y-1 text-muted-foreground">
                        {result.notes.map((note) => (
                          <div key={note}>• {note}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Dates Reminder */}
                  <div className="bg-muted/10 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-elec-yellow">Key Dates</h4>
                    <div className="text-sm space-y-1 text-muted-foreground">
                      <div>• Self Assessment deadline: 31 January after the tax year ends</div>
                      <div>• Payments on account: 31 January and 31 July</div>
                      <div>• VAT returns: quarterly, if registered</div>
                      <div>• Making Tax Digital for Income Tax: phased in from April 2026</div>
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
                <p>
                  • This is an estimate based on {taxYear} rates for England, Wales and Northern
                  Ireland, and may not account for all personal circumstances. Scottish income tax is
                  not modelled.
                </p>
                <p>
                  • Consider professional tax advice for complex situations or significant business
                  changes.
                </p>
                <p>
                  • Making Tax Digital (MTD) for Income Tax becomes mandatory from April 2026 for
                  eligible businesses.
                </p>
                <p>
                  • Keep detailed records of all business income and expenses for HMRC compliance.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TaxEstimator;
