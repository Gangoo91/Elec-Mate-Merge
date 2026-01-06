import { useState } from "react";
import {
  Calculator,
  TrendingUp,
  AlertCircle,
  RotateCcw,
  Info,
  ChevronDown,
  BookOpen,
  PoundSterling,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";

const BusinessCalculator = () => {
  const config = CALCULATOR_CONFIG["business"];

  const [inputs, setInputs] = useState({
    hourlyRate: "45",
    hoursPerWeek: "35",
    weeksPerYear: "48",
    monthlyExpenses: "3000",
    materialMarkup: "20",
  });

  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [calculated, setCalculated] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
    setCalculated(false);
  };

  const hourlyRate = parseFloat(inputs.hourlyRate) || 0;
  const hoursPerWeek = parseFloat(inputs.hoursPerWeek) || 0;
  const weeksPerYear = parseFloat(inputs.weeksPerYear) || 0;
  const monthlyExpenses = parseFloat(inputs.monthlyExpenses) || 0;

  const annualHours = hoursPerWeek * weeksPerYear;
  const annualRevenue = annualHours * hourlyRate;
  const monthlyRevenue = annualRevenue / 12;
  const annualExpenses = monthlyExpenses * 12;
  const annualProfit = annualRevenue - annualExpenses;
  const monthlyProfit = annualProfit / 12;
  const breakEvenHours = monthlyExpenses / hourlyRate;
  const profitMargin = annualRevenue > 0 ? (annualProfit / annualRevenue) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getMarginStatus = () => {
    if (profitMargin > 25) return { color: "text-green-400", label: "Excellent", bg: "bg-green-500/10 border-green-500/30" };
    if (profitMargin > 15) return { color: "text-amber-400", label: "Good", bg: "bg-amber-500/10 border-amber-500/30" };
    return { color: "text-red-400", label: "Needs Improvement", bg: "bg-red-500/10 border-red-500/30" };
  };

  const calculate = () => {
    setCalculated(true);
  };

  const reset = () => {
    setInputs({
      hourlyRate: "45",
      hoursPerWeek: "35",
      weeksPerYear: "48",
      monthlyExpenses: "3000",
      materialMarkup: "20",
    });
    setCalculated(false);
  };

  const isValid = hourlyRate > 0 && hoursPerWeek > 0 && weeksPerYear > 0;
  const marginStatus = getMarginStatus();

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="business"
        title="Business Finance Calculator"
        description="Calculate revenue, profit, and break-even for your electrical business"
        badge="Finance"
      >
        {/* Input Section */}
        <div className="flex items-center gap-2 mb-3">
          <PoundSterling className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white/80">Business Parameters</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Hourly Rate"
            unit="£"
            type="text"
            inputMode="decimal"
            value={inputs.hourlyRate}
            onChange={(val) => handleInputChange("hourlyRate", val)}
            placeholder="e.g., 45"
            hint="Your charge-out rate"
          />

          <CalculatorInput
            label="Billable Hours/Week"
            type="text"
            inputMode="decimal"
            value={inputs.hoursPerWeek}
            onChange={(val) => handleInputChange("hoursPerWeek", val)}
            placeholder="e.g., 35"
            hint="Hours you can bill"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Working Weeks/Year"
            type="text"
            inputMode="decimal"
            value={inputs.weeksPerYear}
            onChange={(val) => handleInputChange("weeksPerYear", val)}
            placeholder="e.g., 48"
            hint="After holidays"
          />

          <CalculatorInput
            label="Monthly Expenses"
            unit="£"
            type="text"
            inputMode="decimal"
            value={inputs.monthlyExpenses}
            onChange={(val) => handleInputChange("monthlyExpenses", val)}
            placeholder="e.g., 3000"
            hint="Total monthly costs"
          />
        </div>

        <CalculatorInput
          label="Material Markup"
          unit="%"
          type="text"
          inputMode="decimal"
          value={inputs.materialMarkup}
          onChange={(val) => handleInputChange("materialMarkup", val)}
          placeholder="e.g., 20"
          hint="Markup on materials"
        />

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={calculate}
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
            onClick={reset}
            className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-colors touch-manipulation"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
      </CalculatorCard>

      {/* Results Section */}
      {calculated && isValid && (
        <div className="space-y-4 animate-fade-in">
          {/* Profit Margin Status */}
          <div className={cn("flex items-center gap-2 p-3 rounded-xl border", marginStatus.bg)}>
            {profitMargin > 15 ? (
              <TrendingUp className={cn("h-5 w-5", marginStatus.color)} />
            ) : (
              <AlertCircle className={cn("h-5 w-5", marginStatus.color)} />
            )}
            <span className={cn("font-medium text-sm", marginStatus.color)}>
              {marginStatus.label} - {profitMargin.toFixed(1)}% Profit Margin
            </span>
          </div>

          <CalculatorResult category="business">
            <div className="text-center pb-4 border-b border-white/10">
              <p className="text-sm text-white/60 mb-1">Annual Profit</p>
              <div
                className={cn("text-4xl font-bold", annualProfit >= 0 ? "" : "text-red-400")}
                style={
                  annualProfit >= 0
                    ? {
                        backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }
                    : undefined
                }
              >
                {formatCurrency(annualProfit)}
              </div>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue
                label="Annual Revenue"
                value={formatCurrency(annualRevenue)}
                category="business"
                size="sm"
              />
              <ResultValue
                label="Monthly Revenue"
                value={formatCurrency(monthlyRevenue)}
                category="business"
                size="sm"
              />
              <ResultValue
                label="Monthly Profit"
                value={formatCurrency(monthlyProfit)}
                category="business"
                size="sm"
              />
              <ResultValue
                label="Break-even Hours"
                value={`${breakEvenHours.toFixed(1)}h`}
                category="business"
                size="sm"
              />
            </ResultsGrid>
          </CalculatorResult>

          {/* Low Margin Suggestions */}
          {profitMargin < 15 && (
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-400">Improvement Suggestions</span>
              </div>
              <ul className="space-y-1 text-xs text-amber-200">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">•</span>
                  Consider increasing your hourly rate
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">•</span>
                  Look for ways to reduce monthly expenses
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">•</span>
                  Increase billable hours per week
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">•</span>
                  Add higher-margin specialisation services
                </li>
              </ul>
            </div>
          )}

          {/* What This Means */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: "#60a5fa15" }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">
                    What This Means
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-white/40 transition-transform duration-200",
                    showGuidance && "rotate-180"
                  )}
                />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <ul className="space-y-2 text-sm text-blue-200/80">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <strong className="text-blue-300">Break-even hours:</strong> Minimum billable
                    hours/month to cover expenses
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <strong className="text-blue-300">Profit margin {">"} 25%:</strong> Healthy
                    buffer for growth and emergencies
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <strong className="text-blue-300">15-25% margin:</strong> Sustainable but
                    limited room for investment
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <strong className="text-blue-300">{"<"} 15% margin:</strong> Risk of cash flow
                    issues during slow periods
                  </li>
                </ul>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Quick Reference */}
      <Collapsible open={showReference} onOpenChange={setShowReference}>
        <div className="calculator-card overflow-hidden" style={{ borderColor: "#fbbf2415" }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-amber-400" />
              <span className="text-sm sm:text-base font-medium text-amber-300">
                Business Reference
              </span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-white/40 transition-transform duration-200",
                showReference && "rotate-180"
              )}
            />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 pt-0">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Typical Rates (UK)</p>
                <p className="text-amber-200/70">Electrician: £40-60/hr</p>
                <p className="text-amber-200/70">Emergency: £80-120/hr</p>
                <p className="text-amber-200/70">Specialist: £60-100/hr</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Expenses Guide</p>
                <p className="text-amber-200/70">Van: £300-500/mo</p>
                <p className="text-amber-200/70">Insurance: £100-200/mo</p>
                <p className="text-amber-200/70">Tools/kit: £100-200/mo</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Utilisation</p>
                <p className="text-amber-200/70">Target: 70-80%</p>
                <p className="text-amber-200/70">Admin time: 20-30%</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Margins</p>
                <p className="text-amber-200/70">Materials: 15-25%</p>
                <p className="text-amber-200/70">Overall: 20-30%</p>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default BusinessCalculator;
