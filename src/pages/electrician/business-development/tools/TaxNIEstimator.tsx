import { useState } from "react";
import { Helmet } from "react-helmet";
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
} from "lucide-react";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorSelect,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";
import { useToast } from "@/hooks/use-toast";

interface TaxInputs {
  annualIncome: number;
  businessExpenses: number;
  capitalAllowances: number;
  pensionContributions: number;
  charitableDonations: number;
  marriageAllowanceTransfer: boolean;
  vatRegistered: boolean;
  vatTurnover: number;
  dividendIncome: number;
}

const TaxNIEstimator = () => {
  const config = CALCULATOR_CONFIG["business"];
  const { toast } = useToast();

  const [inputs, setInputs] = useState<TaxInputs>({
    annualIncome: 0,
    businessExpenses: 0,
    capitalAllowances: 0,
    pensionContributions: 0,
    charitableDonations: 0,
    marriageAllowanceTransfer: false,
    vatRegistered: false,
    vatTurnover: 0,
    dividendIncome: 0,
  });

  const [calculated, setCalculated] = useState(false);
  const [taxYear, setTaxYear] = useState<"2025/26" | "2024/25">("2025/26");

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
      title: "Tax Estimation Complete",
      description: "Your tax and National Insurance calculations have been updated.",
      variant: "success",
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
      vatRegistered: false,
      vatTurnover: 0,
      dividendIncome: 0,
    });
    setCalculated(false);
    toast({
      title: "Calculator Reset",
      description: "All fields have been cleared.",
      variant: "default",
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
      vatRegistered: true,
      vatTurnover: 65000,
      dividendIncome: 0,
    });
    setCalculated(false);
  };

  // UK Tax rates and thresholds
  const getRates = (year: "2025/26" | "2024/25") => {
    if (year === "2025/26") {
      return {
        personalAllowance: 12570,
        basicRateThreshold: 37700,
        higherRateThreshold: 125140,
        basicRate: 0.2,
        higherRate: 0.4,
        additionalRate: 0.45,
        class2WeeklyRate: 0,
        class2SPT: 6725,
        class4LowerRate: 0.06,
        class4HigherRate: 0.02,
        class4LowerProfitsLimit: 12570,
        class4UpperProfitsLimit: 50270,
        marriageAllowance: 1260,
        vatThreshold: 90000,
        vatRate: 0.2,
      };
    }
    return {
      personalAllowance: 12570,
      basicRateThreshold: 37700,
      higherRateThreshold: 125140,
      basicRate: 0.2,
      higherRate: 0.4,
      additionalRate: 0.45,
      class2WeeklyRate: 3.45,
      class2SPT: 6725,
      class4LowerRate: 0.06,
      class4HigherRate: 0.02,
      class4LowerProfitsLimit: 12570,
      class4UpperProfitsLimit: 50270,
      marriageAllowance: 1260,
      vatThreshold: 90000,
      vatRate: 0.2,
    };
  };

  const TAX_RATES = getRates(taxYear);

  const calculateEstimates = () => {
    if (!calculated)
      return {
        taxableIncome: 0,
        incomeTax: 0,
        nationalInsurance: 0,
        totalTaxNI: 0,
        netIncome: 0,
        effectiveRate: 0,
        vat: 0,
        totalLiabilities: 0,
        monthlyTaxNI: 0,
        quarterlyTaxNI: 0,
        grossProfit: 0,
      };

    const grossProfit =
      inputs.annualIncome - inputs.businessExpenses - inputs.capitalAllowances;
    let personalAllowance = TAX_RATES.personalAllowance;

    if (grossProfit > 100000) {
      const reduction = Math.min(personalAllowance, (grossProfit - 100000) / 2);
      personalAllowance -= reduction;
    }

    if (inputs.marriageAllowanceTransfer) {
      personalAllowance += TAX_RATES.marriageAllowance;
    }

    const taxableIncome = Math.max(
      0,
      grossProfit -
        personalAllowance -
        inputs.pensionContributions -
        inputs.charitableDonations
    );

    let incomeTax = 0;
    if (taxableIncome > 0) {
      if (taxableIncome <= TAX_RATES.basicRateThreshold) {
        incomeTax = taxableIncome * TAX_RATES.basicRate;
      } else if (taxableIncome <= TAX_RATES.higherRateThreshold) {
        incomeTax =
          TAX_RATES.basicRateThreshold * TAX_RATES.basicRate +
          (taxableIncome - TAX_RATES.basicRateThreshold) * TAX_RATES.higherRate;
      } else {
        incomeTax =
          TAX_RATES.basicRateThreshold * TAX_RATES.basicRate +
          (TAX_RATES.higherRateThreshold - TAX_RATES.basicRateThreshold) *
            TAX_RATES.higherRate +
          (taxableIncome - TAX_RATES.higherRateThreshold) *
            TAX_RATES.additionalRate;
      }
    }

    let nationalInsurance = 0;
    if (TAX_RATES.class2WeeklyRate > 0 && grossProfit >= TAX_RATES.class2SPT) {
      nationalInsurance += TAX_RATES.class2WeeklyRate * 52;
    }

    if (grossProfit > TAX_RATES.class4LowerProfitsLimit) {
      const class4AtLowerBand = Math.max(
        0,
        Math.min(grossProfit, TAX_RATES.class4UpperProfitsLimit) -
          TAX_RATES.class4LowerProfitsLimit
      );
      nationalInsurance += class4AtLowerBand * TAX_RATES.class4LowerRate;

      if (grossProfit > TAX_RATES.class4UpperProfitsLimit) {
        nationalInsurance +=
          (grossProfit - TAX_RATES.class4UpperProfitsLimit) *
          TAX_RATES.class4HigherRate;
      }
    }

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
      grossProfit,
    };
  };

  const estimates = calculateEstimates();

  const getTaxStatus = () => {
    if (!calculated) return null;
    if (estimates.effectiveRate <= 15) {
      return {
        label: "Efficient",
        color: "text-green-400",
        bg: "bg-green-500/10 border-green-500/30",
        message: "Low effective rate - good tax planning",
      };
    } else if (estimates.effectiveRate <= 25) {
      return {
        label: "Moderate",
        color: "text-amber-400",
        bg: "bg-amber-500/10 border-amber-500/30",
        message: "Consider additional tax planning opportunities",
      };
    }
    return {
      label: "High",
      color: "text-red-400",
      bg: "bg-red-500/10 border-red-500/30",
      message: "Seek professional advice for tax optimization",
    };
  };

  const taxStatus = getTaxStatus();
  const isValid = inputs.annualIncome > 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="bg-gradient-to-b from-background via-background to-background">
      <Helmet>
        <title>UK Tax & NI Estimator for Electricians | 2025/26</title>
        <meta
          name="description"
          content="Estimate UK Income Tax, National Insurance and VAT impacts for electricians."
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
              <PoundSterling className="h-6 w-6 sm:h-7 sm:w-7" style={{ color: config.gradientFrom }} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Tax & NI Estimator
              </h1>
              <p className="text-sm text-white/70">Estimate your UK tax liabilities</p>
            </div>
          </div>
          <SmartBackButton />
        </header>

        {/* Important Notice */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5" />
            <div>
              <span className="text-amber-300 font-medium">Important Notice</span>
              <p className="text-sm text-amber-200/80 mt-1">
                This calculator uses {taxYear} UK rates. Always consult a qualified
                accountant for accurate tax advice and compliance.
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
            <button
              onClick={() => setTaxYear("2025/26")}
              className={cn(
                "flex-1 h-12 rounded-xl font-medium text-sm transition-all",
                taxYear === "2025/26"
                  ? "text-black"
                  : "bg-white/5 border border-white/10 text-white"
              )}
              style={
                taxYear === "2025/26"
                  ? {
                      background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                    }
                  : undefined
              }
            >
              2025/26
            </button>
            <button
              onClick={() => setTaxYear("2024/25")}
              className={cn(
                "flex-1 h-12 rounded-xl font-medium text-sm transition-all",
                taxYear === "2024/25"
                  ? "text-black"
                  : "bg-white/5 border border-white/10 text-white"
              )}
              style={
                taxYear === "2024/25"
                  ? {
                      background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                    }
                  : undefined
              }
            >
              2024/25
            </button>
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
              value={inputs.annualIncome || ""}
              onChange={(val) => updateInput("annualIncome", parseFloat(val) || 0)}
              placeholder="e.g., 55000"
              hint="Total revenue before expenses"
            />

            <CalculatorInput
              label="Business Expenses"
              unit="£"
              type="text"
              inputMode="decimal"
              value={inputs.businessExpenses || ""}
              onChange={(val) => updateInput("businessExpenses", parseFloat(val) || 0)}
              placeholder="e.g., 8500"
              hint="Deductible business costs"
            />
          </div>

          <CalculatorInput
            label="Capital Allowances"
            unit="£"
            type="text"
            inputMode="decimal"
            value={inputs.capitalAllowances || ""}
            onChange={(val) => updateInput("capitalAllowances", parseFloat(val) || 0)}
            placeholder="e.g., 3000"
            hint="Equipment and vehicle allowances"
          />

          {/* Additional Deductions */}
          <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
            <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-2">
                <Receipt className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-white">
                  Additional Deductions & VAT
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-white/80 transition-transform duration-200",
                  showAdvanced && "rotate-180"
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
                  value={inputs.pensionContributions || ""}
                  onChange={(val) =>
                    updateInput("pensionContributions", parseFloat(val) || 0)
                  }
                  placeholder="e.g., 4000"
                />

                <CalculatorInput
                  label="Charitable Donations"
                  unit="£"
                  type="text"
                  inputMode="decimal"
                  value={inputs.charitableDonations || ""}
                  onChange={(val) =>
                    updateInput("charitableDonations", parseFloat(val) || 0)
                  }
                  placeholder="e.g., 500"
                />
              </div>

              <div className="pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Percent className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium text-white">
                    VAT Configuration
                  </span>
                </div>

                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => updateInput("vatRegistered", true)}
                    className={cn(
                      "flex-1 h-10 rounded-xl font-medium text-sm transition-all",
                      inputs.vatRegistered
                        ? "bg-blue-500/20 border border-blue-500/30 text-blue-300"
                        : "bg-white/5 border border-white/10 text-white"
                    )}
                  >
                    VAT Registered
                  </button>
                  <button
                    onClick={() => updateInput("vatRegistered", false)}
                    className={cn(
                      "flex-1 h-10 rounded-xl font-medium text-sm transition-all",
                      !inputs.vatRegistered
                        ? "bg-blue-500/20 border border-blue-500/30 text-blue-300"
                        : "bg-white/5 border border-white/10 text-white"
                    )}
                  >
                    Not Registered
                  </button>
                </div>

                {inputs.vatRegistered && (
                  <CalculatorInput
                    label="VAT Taxable Turnover"
                    unit="£"
                    type="text"
                    inputMode="decimal"
                    value={inputs.vatTurnover || ""}
                    onChange={(val) => updateInput("vatTurnover", parseFloat(val) || 0)}
                    placeholder="e.g., 65000"
                    hint="Annual VAT taxable sales"
                  />
                )}
              </div>

              <div className="pt-3 border-t border-white/10">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 active:bg-white/15 transition-all touch-manipulation">
                  <input
                    type="checkbox"
                    checked={inputs.marriageAllowanceTransfer}
                    onChange={(e) =>
                      updateInput("marriageAllowanceTransfer", e.target.checked)
                    }
                    className="h-4 w-4 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500/50"
                  />
                  <div>
                    <span className="text-sm text-white/80">Marriage Allowance</span>
                    <p className="text-xs text-white">
                      Receiving unused allowance from spouse
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
                "flex-1 h-14 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all touch-manipulation",
                isValid ? "text-black" : "bg-white/10 text-white/30 cursor-not-allowed"
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
              <div className={cn("flex items-center gap-3 p-4 rounded-xl border", taxStatus.bg)}>
                <div className={taxStatus.color}>
                  {taxStatus.label === "Efficient" ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <AlertCircle className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <span className={cn("font-medium", taxStatus.color)}>
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

              {/* VAT if registered */}
              {inputs.vatRegistered && estimates.vat > 0 && (
                <div className="pt-4 mt-4 border-t border-white/10">
                  <p className="text-xs text-white mb-3">VAT Liability</p>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div>
                      <div className="text-xs text-purple-400 mb-1">Annual VAT</div>
                      <div className="text-white font-medium">
                        {formatCurrency(estimates.vat)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-purple-400 mb-1">Quarterly VAT</div>
                      <div className="text-white font-medium">
                        {formatCurrency(estimates.vat / 4)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CalculatorResult>

            {/* Income Breakdown */}
            <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
              <div
                className="calculator-card overflow-hidden"
                style={{ borderColor: "#60a5fa15" }}
              >
                <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                  <div className="flex items-center gap-3">
                    <Info className="h-4 w-4 text-blue-400" />
                    <span className="text-sm sm:text-base font-medium text-blue-300">
                      Income Breakdown
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-white/80 transition-transform duration-200",
                      showGuidance && "rotate-180"
                    )}
                  />
                </CollapsibleTrigger>

                <CollapsibleContent className="p-4 pt-0">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-white">
                      <span>Business Income:</span>
                      <span className="text-white">
                        {formatCurrency(inputs.annualIncome)}
                      </span>
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
                      <span className="text-blue-400">
                        {formatCurrency(estimates.grossProfit)}
                      </span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Personal Allowance:</span>
                      <span className="text-green-400">
                        -{formatCurrency(TAX_RATES.personalAllowance)}
                      </span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Pension & Donations:</span>
                      <span className="text-green-400">
                        -
                        {formatCurrency(
                          inputs.pensionContributions + inputs.charitableDonations
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-white/10 font-medium">
                      <span className="text-white">Taxable Income:</span>
                      <span className="text-blue-400">
                        {formatCurrency(estimates.taxableIncome)}
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
          <div
            className="calculator-card overflow-hidden"
            style={{ borderColor: "#fbbf2415" }}
          >
            <CollapsibleTrigger className="agent-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-amber-400" />
                <span className="text-sm sm:text-base font-medium text-amber-300">
                  Tax Reference ({taxYear})
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-white/80 transition-transform duration-200",
                  showReference && "rotate-180"
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">Income Tax Bands</p>
                  <p className="text-amber-200/70">
                    Personal: £{TAX_RATES.personalAllowance.toLocaleString()}
                  </p>
                  <p className="text-amber-200/70">
                    Basic (20%): £0-{TAX_RATES.basicRateThreshold.toLocaleString()}
                  </p>
                  <p className="text-amber-200/70">
                    Higher (40%): £{TAX_RATES.basicRateThreshold.toLocaleString()}+
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">National Insurance</p>
                  <p className="text-amber-200/70">
                    Class 4: {(TAX_RATES.class4LowerRate * 100).toFixed(0)}% (£
                    {TAX_RATES.class4LowerProfitsLimit.toLocaleString()}-
                    {TAX_RATES.class4UpperProfitsLimit.toLocaleString()})
                  </p>
                  <p className="text-amber-200/70">
                    Above £{TAX_RATES.class4UpperProfitsLimit.toLocaleString()}:{" "}
                    {(TAX_RATES.class4HigherRate * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">VAT</p>
                  <p className="text-amber-200/70">
                    Threshold: £{TAX_RATES.vatThreshold.toLocaleString()}
                  </p>
                  <p className="text-amber-200/70">Standard Rate: 20%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">Payment Dates</p>
                  <p className="text-amber-200/70">31st January</p>
                  <p className="text-amber-200/70">31st July (on account)</p>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Tax Tips */}
        <div className="calculator-card p-4" style={{ borderColor: "#22c55e20" }}>
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
