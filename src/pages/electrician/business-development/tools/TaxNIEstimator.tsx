import { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  PoundSterling,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  Calculator,
  ChevronDown,
  BookOpen,
  Info,
  RotateCcw,
  Calendar,
  Percent,
  Receipt,
} from 'lucide-react';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { useToast } from '@/hooks/use-toast';
import {
  calculateSelfEmployedTax,
  ratesFor,
  CURRENT_TAX_YEAR,
  TAX_YEAR_KEYS,
  isRateTableStale,
} from '@/data/uk-tax-rates';

interface TaxInputs {
  annualIncome: number;
  businessExpenses: number;
  capitalAllowances: number;
  pensionContributions: number;
  charitableDonations: number;
  receivesMarriageAllowance: boolean;
  transfersMarriageAllowance: boolean;
  vatRegistered: boolean;
  vatTurnover: number;
  /** VAT-bearing purchases, excluding VAT — drives the input VAT you reclaim. */
  vatPurchases: number;
}

const TaxNIEstimator = () => {
  const config = CALCULATOR_CONFIG['business'];
  const { toast } = useToast();

  const [inputs, setInputs] = useState<TaxInputs>({
    annualIncome: 0,
    businessExpenses: 0,
    capitalAllowances: 0,
    pensionContributions: 0,
    charitableDonations: 0,
    receivesMarriageAllowance: false,
    transfersMarriageAllowance: false,
    vatRegistered: false,
    vatTurnover: 0,
    vatPurchases: 0,
  });

  const [calculated, setCalculated] = useState(false);
  const [taxYear, setTaxYear] = useState<string>(CURRENT_TAX_YEAR);
  const rateTableStale = isRateTableStale();

  // UI state
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const updateInput = (field: keyof TaxInputs, value: number | boolean) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
    setCalculated(false);
  };

  const calculateTax = () => {
    setCalculated(true);
    toast({
      title: 'Tax Estimation Complete',
      description: 'Your tax and National Insurance calculations have been updated.',
      variant: 'success',
    });
  };

  const resetCalculator = () => {
    setInputs({
      annualIncome: 0,
      businessExpenses: 0,
      capitalAllowances: 0,
      pensionContributions: 0,
      charitableDonations: 0,
      receivesMarriageAllowance: false,
      transfersMarriageAllowance: false,
      vatRegistered: false,
      vatTurnover: 0,
      vatPurchases: 0,
    });
    setCalculated(false);
    toast({
      title: 'Calculator Reset',
      description: 'All fields have been cleared.',
      variant: 'default',
    });
  };

  const loadExample = () => {
    setInputs({
      annualIncome: 55000,
      businessExpenses: 8500,
      capitalAllowances: 3000,
      pensionContributions: 4000,
      charitableDonations: 500,
      receivesMarriageAllowance: false,
      transfersMarriageAllowance: false,
      vatRegistered: true,
      vatTurnover: 65000,
      vatPurchases: 18000,
    });
    setCalculated(false);
  };

  // Rates and the maths both come from the single source of truth in
  // src/data/uk-tax-rates.ts. Nothing tax-related is computed inline here.
  const TAX_RATES = ratesFor(taxYear);

  const calculateEstimates = () => {
    const grossProfit = Math.max(
      0,
      inputs.annualIncome - inputs.businessExpenses - inputs.capitalAllowances
    );

    if (!calculated) {
      return {
        taxableIncome: 0,
        personalAllowance: TAX_RATES.personalAllowance,
        incomeTax: 0,
        nationalInsurance: 0,
        class2: 0,
        class4: 0,
        totalTaxNI: 0,
        netIncome: 0,
        effectiveRate: 0,
        marginalRate: 0,
        notes: [] as string[],
        outputVat: 0,
        inputVat: 0,
        netVat: 0,
        monthlyTaxNI: 0,
        quarterlyTaxNI: 0,
        grossProfit: 0,
      };
    }

    // VAT is deliberately kept OUT of the tax total — it is collected from
    // customers for HMRC, not a cost to the business. See the VAT panel below.
    const outputVat =
      inputs.vatRegistered && inputs.vatTurnover > 0
        ? inputs.vatTurnover * TAX_RATES.vatStandardRate
        : 0;
    const inputVat =
      inputs.vatRegistered && inputs.vatPurchases > 0
        ? inputs.vatPurchases * TAX_RATES.vatStandardRate
        : 0;
    const netVat = outputVat - inputVat;

    const result = calculateSelfEmployedTax(
      {
        profit: grossProfit,
        grossPensionContributions: inputs.pensionContributions,
        grossGiftAid: inputs.charitableDonations,
        receivesMarriageAllowance: inputs.receivesMarriageAllowance,
        transfersMarriageAllowance: inputs.transfersMarriageAllowance,
      },
      taxYear
    );

    return {
      taxableIncome: result.taxableIncome,
      personalAllowance: result.personalAllowance,
      incomeTax: result.incomeTax,
      nationalInsurance: result.nationalInsurance,
      class2: result.class2,
      class4: result.class4,
      totalTaxNI: result.totalTaxAndNI,
      netIncome: result.takeHome,
      effectiveRate: result.effectiveRate,
      marginalRate: result.marginalRate,
      notes: result.notes,
      outputVat,
      inputVat,
      netVat,
      monthlyTaxNI: result.totalTaxAndNI / 12,
      quarterlyTaxNI: result.totalTaxAndNI / 4,
      grossProfit: result.profit,
    };
  };

  const estimates = calculateEstimates();

  const getTaxStatus = () => {
    if (!calculated) return null;
    if (estimates.effectiveRate <= 15) {
      return {
        label: 'Efficient',
        color: 'text-green-400',
        bg: 'bg-green-500/10 border-green-500/30',
        message: 'Low effective rate - good tax planning',
      };
    } else if (estimates.effectiveRate <= 25) {
      return {
        label: 'Moderate',
        color: 'text-amber-400',
        bg: 'bg-amber-500/10 border-amber-500/30',
        message: 'Consider additional tax planning opportunities',
      };
    }
    return {
      label: 'High',
      color: 'text-red-400',
      bg: 'bg-red-500/10 border-red-500/30',
      message: 'Seek professional advice for tax optimisation',
    };
  };

  const taxStatus = getTaxStatus();
  const isValid = inputs.annualIncome > 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="bg-gradient-to-b from-background via-background to-background">
      <Helmet>
        <title>UK Tax &amp; NI Estimator for Electricians | {taxYear}</title>
        <meta
          name="description"
          content="Estimate Income Tax, National Insurance and your net VAT position for self-employed electricians in England, Wales and Northern Ireland."
        />
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl border"
              style={{
                background: `linear-gradient(135deg, ${config.gradientFrom}20, ${config.gradientTo}20)`,
                borderColor: `${config.gradientFrom}30`,
              }}
            >
              <PoundSterling
                className="h-6 w-6 sm:h-7 sm:w-7"
                style={{ color: config.gradientFrom }}
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Tax & NI Estimator
              </h1>
              <p className="text-sm text-white">Estimate your UK tax liabilities</p>
            </div>
          </div>
          <SmartBackButton />
        </header>

        {/* Rate table has fallen behind the live tax year */}
        {rateTableStale && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
              <div>
                <span className="text-red-300 font-medium">Rates may be out of date</span>
                <p className="text-sm text-red-200 mt-1">
                  We do not yet hold rates for the current tax year ({CURRENT_TAX_YEAR}), so the
                  newest figures shown are from an earlier year. Check the current HMRC rates before
                  relying on these numbers.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Important Notice */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5" />
            <div>
              <span className="text-amber-300 font-medium">Important Notice</span>
              <p className="text-sm text-amber-200 mt-1">
                This calculator uses {taxYear} rates for a self-employed sole trader in{' '}
                <strong>England, Wales and Northern Ireland only</strong>. Scottish income tax has
                different rates and bands and is not modelled here — if you are a Scottish taxpayer
                the income tax figure will be wrong. National Insurance and VAT are the same UK-wide.
                Always consult a qualified accountant for accurate tax advice and compliance.
              </p>
            </div>
          </div>
        </div>

        <CalculatorCard
          category="business"
          title="Tax & NI Estimator"
          description="Estimate your Income Tax and National Insurance liabilities for financial planning"
          badge="UK Tax"
        >
          {/* Tax Year Selection */}
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-white">Tax Year</span>
          </div>

          <div className="flex gap-2 mb-4">
            {TAX_YEAR_KEYS.map((year) => (
              <button
                key={year}
                onClick={() => {
                  setTaxYear(year);
                  setCalculated(false);
                }}
                className={cn(
                  'flex-1 h-12 rounded-xl font-medium text-sm transition-all touch-manipulation',
                  taxYear === year ? 'text-black' : 'bg-white/5 border border-white/10 text-white'
                )}
                style={
                  taxYear === year
                    ? {
                        background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                      }
                    : undefined
                }
              >
                {year}
              </button>
            ))}
          </div>

          {/* Business Income */}
          <div className="flex items-center gap-2 mb-3">
            <PoundSterling className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-white">Business Income</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CalculatorInput
              label="Annual Income"
              unit="£"
              type="text"
              inputMode="decimal"
              value={inputs.annualIncome || ''}
              onChange={(val) => updateInput('annualIncome', parseFloat(val) || 0)}
              placeholder="e.g., 55000"
              hint="Total revenue before expenses"
            />

            <CalculatorInput
              label="Business Expenses"
              unit="£"
              type="text"
              inputMode="decimal"
              value={inputs.businessExpenses || ''}
              onChange={(val) => updateInput('businessExpenses', parseFloat(val) || 0)}
              placeholder="e.g., 8500"
              hint="Deductible business costs"
            />
          </div>

          <CalculatorInput
            label="Capital Allowances"
            unit="£"
            type="text"
            inputMode="decimal"
            value={inputs.capitalAllowances || ''}
            onChange={(val) => updateInput('capitalAllowances', parseFloat(val) || 0)}
            placeholder="e.g., 3000"
            hint="Equipment and vehicle allowances"
          />

          {/* Additional Deductions */}
          <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
            <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-2">
                <Receipt className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-white">Additional Deductions & VAT</span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showAdvanced && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="pt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <CalculatorInput
                  label="Pension Contributions"
                  unit="£"
                  type="text"
                  inputMode="decimal"
                  value={inputs.pensionContributions || ''}
                  onChange={(val) => updateInput('pensionContributions', parseFloat(val) || 0)}
                  placeholder="e.g., 4000"
                  hint="Gross, including basic-rate relief. Widens your basic-rate band."
                />

                <CalculatorInput
                  label="Charitable Donations"
                  unit="£"
                  type="text"
                  inputMode="decimal"
                  value={inputs.charitableDonations || ''}
                  onChange={(val) => updateInput('charitableDonations', parseFloat(val) || 0)}
                  placeholder="e.g., 500"
                  hint="Gross Gift Aid. Also widens the basic-rate band."
                />
              </div>

              <div className="pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Percent className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium text-white">VAT Configuration</span>
                </div>

                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => updateInput('vatRegistered', true)}
                    className={cn(
                      'flex-1 h-10 rounded-xl font-medium text-sm transition-all',
                      inputs.vatRegistered
                        ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
                        : 'bg-white/5 border border-white/10 text-white'
                    )}
                  >
                    VAT Registered
                  </button>
                  <button
                    onClick={() => updateInput('vatRegistered', false)}
                    className={cn(
                      'flex-1 h-10 rounded-xl font-medium text-sm transition-all',
                      !inputs.vatRegistered
                        ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
                        : 'bg-white/5 border border-white/10 text-white'
                    )}
                  >
                    Not Registered
                  </button>
                </div>

                {inputs.vatRegistered && (
                  <div className="space-y-3">
                    <CalculatorInput
                      label="VAT Taxable Turnover"
                      unit="£"
                      type="text"
                      inputMode="decimal"
                      value={inputs.vatTurnover || ''}
                      onChange={(val) => updateInput('vatTurnover', parseFloat(val) || 0)}
                      placeholder="e.g., 65000"
                      hint="Annual VAT taxable sales, excluding VAT"
                    />

                    <CalculatorInput
                      label="VAT-bearing Purchases"
                      unit="£"
                      type="text"
                      inputMode="decimal"
                      value={inputs.vatPurchases || ''}
                      onChange={(val) => updateInput('vatPurchases', parseFloat(val) || 0)}
                      placeholder="e.g., 18000"
                      hint="Materials, fuel and other standard-rated costs, excluding VAT. The VAT on these is reclaimable."
                    />

                    <p className="text-xs text-white">
                      VAT is charged to your customers and passed on to HMRC. It is not a cost to
                      your business, so it is shown separately and is never added to your Tax &amp;
                      NI total.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2">
                <span className="text-sm font-medium text-white">Marriage Allowance</span>
                <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 active:bg-white/15 transition-all touch-manipulation">
                  <input
                    type="checkbox"
                    checked={inputs.receivesMarriageAllowance}
                    onChange={(e) => {
                      updateInput('receivesMarriageAllowance', e.target.checked);
                      if (e.target.checked) updateInput('transfersMarriageAllowance', false);
                    }}
                    className="h-4 w-4 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500/50"
                  />
                  <div>
                    <span className="text-sm text-white">Receiving from my spouse</span>
                    <p className="text-xs text-white">
                      Worth £{(TAX_RATES.marriageAllowance * TAX_RATES.basicRate).toFixed(0)} off
                      your tax bill. Basic-rate taxpayers only.
                    </p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 active:bg-white/15 transition-all touch-manipulation">
                  <input
                    type="checkbox"
                    checked={inputs.transfersMarriageAllowance}
                    onChange={(e) => {
                      updateInput('transfersMarriageAllowance', e.target.checked);
                      if (e.target.checked) updateInput('receivesMarriageAllowance', false);
                    }}
                    className="h-4 w-4 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500/50"
                  />
                  <div>
                    <span className="text-sm text-white">Transferring to my spouse</span>
                    <p className="text-xs text-white">
                      Cuts your personal allowance by £
                      {TAX_RATES.marriageAllowance.toLocaleString('en-GB')}.
                    </p>
                  </div>
                </label>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={calculateTax}
              disabled={!isValid}
              className={cn(
                'flex-1 h-14 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all touch-manipulation',
                isValid ? 'text-black' : 'bg-white/10 text-white cursor-not-allowed'
              )}
              style={
                isValid
                  ? {
                      background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                    }
                  : undefined
              }
            >
              <Calculator className="h-5 w-5" />
              Calculate
            </button>
            <button
              onClick={loadExample}
              className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors touch-manipulation"
            >
              <Lightbulb className="h-5 w-5" />
            </button>
            <button
              onClick={resetCalculator}
              className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors touch-manipulation"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </CalculatorCard>

        {/* Results Section */}
        {calculated && (
          <div className="space-y-4 animate-fade-in">
            {/* Tax Status */}
            {taxStatus && (
              <div className={cn('flex items-center gap-3 p-4 rounded-xl border', taxStatus.bg)}>
                <div className={taxStatus.color}>
                  {taxStatus.label === 'Efficient' ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <AlertCircle className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <span className={cn('font-medium', taxStatus.color)}>
                    {taxStatus.label} Tax Burden ({estimates.effectiveRate.toFixed(1)}%)
                  </span>
                  <p className="text-sm text-white">{taxStatus.message}</p>
                </div>
              </div>
            )}

            <CalculatorResult category="business">
              <div className="text-center pb-4 border-b border-white/10">
                <p className="text-sm text-white mb-1">Total Tax & NI</p>
                <div
                  className="text-4xl font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }}
                >
                  {formatCurrency(estimates.totalTaxNI)}
                </div>
                <p className="text-sm text-white mt-1">per year</p>
              </div>

              <ResultsGrid columns={2}>
                <ResultValue
                  label="Income Tax"
                  value={formatCurrency(estimates.incomeTax)}
                  category="business"
                  size="sm"
                />
                <ResultValue
                  label="National Insurance"
                  value={formatCurrency(estimates.nationalInsurance)}
                  category="business"
                  size="sm"
                />
                <ResultValue
                  label="Effective Rate"
                  value={`${estimates.effectiveRate.toFixed(1)}%`}
                  category="business"
                  size="sm"
                />
                <ResultValue
                  label="Net Income"
                  value={formatCurrency(estimates.netIncome)}
                  category="business"
                  size="sm"
                />
              </ResultsGrid>

              {/* Payment Schedule */}
              <div className="pt-4 mt-4 border-t border-white/10">
                <p className="text-xs text-white mb-3">Payment Schedule</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-xs text-blue-400 mb-1">Monthly Reserve</div>
                    <div className="text-white font-medium">
                      {formatCurrency(estimates.monthlyTaxNI)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-amber-400 mb-1">Jan 31st</div>
                    <div className="text-white font-medium">
                      {formatCurrency(estimates.totalTaxNI / 2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-green-400 mb-1">Jul 31st</div>
                    <div className="text-white font-medium">
                      {formatCurrency(estimates.totalTaxNI / 2)}
                    </div>
                  </div>
                </div>
              </div>

              {/* VAT — shown separately, never inside the Tax & NI total */}
              {inputs.vatRegistered && (estimates.outputVat > 0 || estimates.inputVat > 0) && (
                <div className="pt-4 mt-4 border-t border-white/10">
                  <p className="text-xs text-white mb-1">
                    VAT — collected on behalf of HMRC, not a cost to you
                  </p>
                  <p className="text-xs text-white mb-3">
                    Excluded from the Tax &amp; NI figure above. You charge output VAT to customers,
                    reclaim input VAT on purchases, and pay HMRC the difference.
                  </p>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-xs text-purple-400 mb-1">Output VAT charged</div>
                      <div className="text-white font-medium">
                        {formatCurrency(estimates.outputVat)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-purple-400 mb-1">Input VAT reclaimed</div>
                      <div className="text-white font-medium">
                        -{formatCurrency(estimates.inputVat)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-purple-400 mb-1">
                        {estimates.netVat < 0 ? 'Net reclaim from HMRC' : 'Net VAT payable'}
                      </div>
                      <div className="text-white font-medium">
                        {formatCurrency(Math.abs(estimates.netVat))}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-white mt-3 text-center">
                    Roughly {formatCurrency(Math.abs(estimates.netVat) / 4)} per quarterly return
                    {estimates.netVat < 0 ? ' repaid to you' : ''}.
                  </p>
                </div>
              )}

              {/* Notes the engine raised about this particular calculation */}
              {estimates.notes.length > 0 && (
                <div className="pt-4 mt-4 border-t border-white/10">
                  <p className="text-xs text-white mb-2">Worth knowing</p>
                  <ul className="space-y-1">
                    {estimates.notes.map((note) => (
                      <li key={note} className="text-xs text-white">
                        • {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CalculatorResult>

            {/* Income Breakdown */}
            <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
              <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
                <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                  <div className="flex items-center gap-3">
                    <Info className="h-4 w-4 text-blue-400" />
                    <span className="text-sm sm:text-base font-medium text-blue-300">
                      Income Breakdown
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-white transition-transform duration-200',
                      showGuidance && 'rotate-180'
                    )}
                  />
                </CollapsibleTrigger>

                <CollapsibleContent className="p-4 pt-0">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-white">
                      <span>Business Income:</span>
                      <span className="text-white">{formatCurrency(inputs.annualIncome)}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Business Expenses:</span>
                      <span className="text-red-400">
                        -{formatCurrency(inputs.businessExpenses)}
                      </span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Capital Allowances:</span>
                      <span className="text-red-400">
                        -{formatCurrency(inputs.capitalAllowances)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-white/10 font-medium">
                      <span className="text-white">Gross Profit:</span>
                      <span className="text-blue-400">{formatCurrency(estimates.grossProfit)}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Personal Allowance:</span>
                      <span className="text-green-400">
                        -{formatCurrency(estimates.personalAllowance)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-white/10 font-medium">
                      <span className="text-white">Taxable Income:</span>
                      <span className="text-blue-400">
                        {formatCurrency(estimates.taxableIncome)}
                      </span>
                    </div>
                    {inputs.pensionContributions + inputs.charitableDonations > 0 && (
                      <div className="flex justify-between text-white">
                        <span>Basic-rate band widened by:</span>
                        <span className="text-green-400">
                          +
                          {formatCurrency(
                            inputs.pensionContributions + inputs.charitableDonations
                          )}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-white/10 text-white">
                      <span>Income Tax:</span>
                      <span className="text-white">{formatCurrency(estimates.incomeTax)}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Class 4 NI:</span>
                      <span className="text-white">{formatCurrency(estimates.class4)}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Class 2 NI:</span>
                      <span className="text-white">{formatCurrency(estimates.class2)}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Marginal rate on the next £1:</span>
                      <span className="text-blue-400">
                        {estimates.marginalRate.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </div>
        )}

        {/* Quick Reference */}
        <Collapsible open={showReference} onOpenChange={setShowReference}>
          <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
            <CollapsibleTrigger className="agent-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-amber-400" />
                <span className="text-sm sm:text-base font-medium text-amber-300">
                  Tax Reference ({taxYear})
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showReference && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">Income Tax Bands</p>
                  <p className="text-amber-200">
                    Personal allowance: £{TAX_RATES.personalAllowance.toLocaleString('en-GB')}
                  </p>
                  <p className="text-amber-200">
                    Basic ({(TAX_RATES.basicRate * 100).toFixed(0)}%): first £
                    {TAX_RATES.basicRateBand.toLocaleString('en-GB')} of taxable income
                  </p>
                  <p className="text-amber-200">
                    Higher ({(TAX_RATES.higherRate * 100).toFixed(0)}%): above that, to £
                    {TAX_RATES.additionalRateThreshold.toLocaleString('en-GB')}
                  </p>
                  <p className="text-amber-200">
                    Additional ({(TAX_RATES.additionalRate * 100).toFixed(0)}%): above £
                    {TAX_RATES.additionalRateThreshold.toLocaleString('en-GB')}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">National Insurance</p>
                  <p className="text-amber-200">
                    Class 4: {(TAX_RATES.class4MainRate * 100).toFixed(0)}% (£
                    {TAX_RATES.class4LowerProfitsLimit.toLocaleString('en-GB')}–
                    {TAX_RATES.class4UpperProfitsLimit.toLocaleString('en-GB')})
                  </p>
                  <p className="text-amber-200">
                    Above £{TAX_RATES.class4UpperProfitsLimit.toLocaleString('en-GB')}:{' '}
                    {(TAX_RATES.class4AdditionalRate * 100).toFixed(0)}%
                  </p>
                  <p className="text-amber-200">
                    Class 2: not payable above the £
                    {TAX_RATES.smallProfitsThreshold.toLocaleString('en-GB')} Small Profits
                    Threshold; voluntary below it at £
                    {TAX_RATES.class2VoluntaryWeeklyRate.toFixed(2)}/week
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">VAT</p>
                  <p className="text-amber-200">
                    Registration threshold: £
                    {TAX_RATES.vatRegistrationThreshold.toLocaleString('en-GB')}
                  </p>
                  <p className="text-amber-200">
                    Standard rate: {(TAX_RATES.vatStandardRate * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">Payment Dates</p>
                  <p className="text-amber-200">31st January</p>
                  <p className="text-amber-200">31st July (on account)</p>
                </div>
              </div>
              <p className="text-xs text-amber-200 mt-3">
                England, Wales and Northern Ireland. Source: {TAX_RATES.source} — checked{' '}
                {TAX_RATES.verifiedOn}.
              </p>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Tax Tips */}
        <div className="calculator-card p-4" style={{ borderColor: '#22c55e20' }}>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-5 w-5 text-green-400" />
            <span className="text-sm font-medium text-green-300">Tax Planning Tips</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-green-200/70">
            <div>
              <p className="text-green-300 font-medium mb-1">Expenses</p>
              <p>Keep records of van costs, tools, insurance, and training - all deductible.</p>
            </div>
            <div>
              <p className="text-green-300 font-medium mb-1">Capital Allowances</p>
              <p>Claim AIA on equipment. Testing equipment and tools often qualify.</p>
            </div>
            <div>
              <p className="text-green-300 font-medium mb-1">Payment Planning</p>
              <p>Set aside money monthly. Late payment penalties can be costly.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaxNIEstimator;
