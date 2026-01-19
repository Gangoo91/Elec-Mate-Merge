import * as React from "react";
import { Helmet } from "react-helmet";
import {
  Users,
  Calendar,
  Receipt,
  Truck,
  Wrench,
  Shield,
  GraduationCap,
  Target,
  TrendingUp,
  Calculator,
  RotateCcw,
  ChevronDown,
  BookOpen,
  Info,
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
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";

const currency = (n: number) => `£${n.toFixed(2)}`;

const StaffCostCalculator: React.FC = () => {
  const config = CALCULATOR_CONFIG["business"];

  const [basePayHr, setBasePayHr] = React.useState("26");
  const [weeklyHours, setWeeklyHours] = React.useState("40");
  const [paidWeeks, setPaidWeeks] = React.useState("52");
  const [holidaysDays, setHolidaysDays] = React.useState("28");
  const [sickDays, setSickDays] = React.useState("3");
  const [niRate, setNiRate] = React.useState("13.8");
  const [pensionRate, setPensionRate] = React.useState("3");
  const [vanYear, setVanYear] = React.useState("4200");
  const [toolsYear, setToolsYear] = React.useState("1000");
  const [insuranceYear, setInsuranceYear] = React.useState("1500");
  const [trainingYear, setTrainingYear] = React.useState("600");
  const [utilisation, setUtilisation] = React.useState("65");
  const [targetMargin, setTargetMargin] = React.useState("20");

  const [calculated, setCalculated] = React.useState(false);
  const [showBreakdown, setShowBreakdown] = React.useState(false);
  const [showReference, setShowReference] = React.useState(false);

  const basePayHrNum = parseFloat(basePayHr) || 0;
  const weeklyHoursNum = parseFloat(weeklyHours) || 0;
  const paidWeeksNum = parseFloat(paidWeeks) || 0;
  const niRateNum = parseFloat(niRate) || 0;
  const pensionRateNum = parseFloat(pensionRate) || 0;
  const vanYearNum = parseFloat(vanYear) || 0;
  const toolsYearNum = parseFloat(toolsYear) || 0;
  const insuranceYearNum = parseFloat(insuranceYear) || 0;
  const trainingYearNum = parseFloat(trainingYear) || 0;
  const utilisationNum = parseFloat(utilisation) || 0;
  const targetMarginNum = parseFloat(targetMargin) || 0;

  const annualBase = basePayHrNum * weeklyHoursNum * paidWeeksNum;
  const oncostNI = annualBase * (niRateNum / 100);
  const pension = annualBase * (pensionRateNum / 100);
  const annualOnCosts = vanYearNum + toolsYearNum + insuranceYearNum + trainingYearNum + oncostNI + pension;

  const totalAnnualCost = annualBase + annualOnCosts;
  const effectiveHours = weeklyHoursNum * paidWeeksNum * (utilisationNum / 100);
  const loadedHourlyCost = effectiveHours > 0 ? totalAnnualCost / effectiveHours : 0;
  const recommendedChargeOut = targetMarginNum > 0 ? loadedHourlyCost / (1 - targetMarginNum / 100) : loadedHourlyCost;

  const handleCalculate = () => {
    setCalculated(true);
  };

  const handleReset = () => {
    setBasePayHr("26");
    setWeeklyHours("40");
    setPaidWeeks("52");
    setHolidaysDays("28");
    setSickDays("3");
    setNiRate("13.8");
    setPensionRate("3");
    setVanYear("4200");
    setToolsYear("1000");
    setInsuranceYear("1500");
    setTrainingYear("600");
    setUtilisation("65");
    setTargetMargin("20");
    setCalculated(false);
  };

  const isValid = basePayHrNum > 0 && weeklyHoursNum > 0;

  return (
    <div className="bg-gradient-to-b from-background via-background to-background">
      <Helmet>
        <title>Fully Loaded Staff Cost Calculator UK</title>
        <meta
          name="description"
          content="Calculate fully loaded electrician staff cost: wages, NI, pension, holidays, van, tools and overheads."
        />
        <link rel="canonical" href="/electrician/business-development/tools/staff-cost" />
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
              <Users className="h-6 w-6 sm:h-7 sm:w-7" style={{ color: config.gradientFrom }} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Staff Cost Calculator
              </h1>
              <p className="text-sm text-white/70">Calculate true employment costs</p>
            </div>
          </div>
          <SmartBackButton />
        </header>

        <CalculatorCard
        category="business"
        title="Staff Cost Calculator"
        description="Calculate the true hourly cost of employing staff including all overheads"
        badge="Employment"
      >
        {/* Basic Pay Section */}
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white/80">Basic Pay Details</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <CalculatorInput
            label="Base Pay"
            unit="£/hr"
            type="text"
            inputMode="decimal"
            value={basePayHr}
            onChange={(val) => {
              setBasePayHr(val);
              setCalculated(false);
            }}
            placeholder="e.g., 26"
            hint="Hourly wage"
          />

          <CalculatorInput
            label="Weekly Hours"
            unit="hrs"
            type="text"
            inputMode="numeric"
            value={weeklyHours}
            onChange={(val) => {
              setWeeklyHours(val);
              setCalculated(false);
            }}
            placeholder="e.g., 40"
            hint="Per week"
          />

          <CalculatorInput
            label="Paid Weeks"
            unit="wks"
            type="text"
            inputMode="numeric"
            value={paidWeeks}
            onChange={(val) => {
              setPaidWeeks(val);
              setCalculated(false);
            }}
            placeholder="e.g., 52"
            hint="Per year"
          />
        </div>

        {/* Employment Costs Section */}
        <div className="flex items-center gap-2 mb-3 mt-6 pt-4 border-t border-white/10">
          <Receipt className="h-4 w-4 text-purple-400" />
          <span className="text-sm font-medium text-white/80">Employment Costs</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Holiday Days"
            unit="days"
            type="text"
            inputMode="numeric"
            value={holidaysDays}
            onChange={(val) => {
              setHolidaysDays(val);
              setCalculated(false);
            }}
            placeholder="e.g., 28"
            hint="UK min: 28 days"
          />

          <CalculatorInput
            label="Sick Days"
            unit="days"
            type="text"
            inputMode="numeric"
            value={sickDays}
            onChange={(val) => {
              setSickDays(val);
              setCalculated(false);
            }}
            placeholder="e.g., 3"
            hint="Average/year"
          />

          <CalculatorInput
            label="Employer NI"
            unit="%"
            type="text"
            inputMode="decimal"
            value={niRate}
            onChange={(val) => {
              setNiRate(val);
              setCalculated(false);
            }}
            placeholder="e.g., 13.8"
            hint="UK: 13.8%"
          />

          <CalculatorInput
            label="Pension"
            unit="%"
            type="text"
            inputMode="decimal"
            value={pensionRate}
            onChange={(val) => {
              setPensionRate(val);
              setCalculated(false);
            }}
            placeholder="e.g., 3"
            hint="UK min: 3%"
          />
        </div>

        {/* Equipment Section */}
        <div className="flex items-center gap-2 mb-3 mt-6 pt-4 border-t border-white/10">
          <Wrench className="h-4 w-4 text-orange-400" />
          <span className="text-sm font-medium text-white/80">Equipment & Overheads</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Van Costs"
            unit="£/yr"
            type="text"
            inputMode="numeric"
            value={vanYear}
            onChange={(val) => {
              setVanYear(val);
              setCalculated(false);
            }}
            placeholder="e.g., 4200"
            hint="Lease, fuel, insurance"
          />

          <CalculatorInput
            label="Tools & Equipment"
            unit="£/yr"
            type="text"
            inputMode="numeric"
            value={toolsYear}
            onChange={(val) => {
              setToolsYear(val);
              setCalculated(false);
            }}
            placeholder="e.g., 1000"
            hint="Replacements"
          />

          <CalculatorInput
            label="Insurance"
            unit="£/yr"
            type="text"
            inputMode="numeric"
            value={insuranceYear}
            onChange={(val) => {
              setInsuranceYear(val);
              setCalculated(false);
            }}
            placeholder="e.g., 1500"
            hint="Public liability"
          />

          <CalculatorInput
            label="Training"
            unit="£/yr"
            type="text"
            inputMode="numeric"
            value={trainingYear}
            onChange={(val) => {
              setTrainingYear(val);
              setCalculated(false);
            }}
            placeholder="e.g., 600"
            hint="Courses, certs"
          />
        </div>

        {/* Efficiency Section */}
        <div className="flex items-center gap-2 mb-3 mt-6 pt-4 border-t border-white/10">
          <Target className="h-4 w-4 text-green-400" />
          <span className="text-sm font-medium text-white/80">Efficiency & Margins</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Utilisation"
            unit="%"
            type="text"
            inputMode="decimal"
            value={utilisation}
            onChange={(val) => {
              setUtilisation(val);
              setCalculated(false);
            }}
            placeholder="e.g., 65"
            hint="Billable % of time"
          />

          <CalculatorInput
            label="Target Margin"
            unit="%"
            type="text"
            inputMode="decimal"
            value={targetMargin}
            onChange={(val) => {
              setTargetMargin(val);
              setCalculated(false);
            }}
            placeholder="e.g., 20"
            hint="Profit target"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <button
            onClick={handleCalculate}
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
            Calculate Cost
          </button>
          <button
            onClick={handleReset}
            className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 transition-colors touch-manipulation"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
      </CalculatorCard>

      {/* Results Section */}
      {calculated && isValid && (
        <div className="space-y-4 animate-fade-in">
          {/* Key Results */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CalculatorResult category="business">
              <div className="text-center">
                <p className="text-sm text-white mb-1">True Hourly Cost</p>
                <div
                  className="text-3xl font-bold"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {currency(loadedHourlyCost)}/hr
                </div>
                <p className="text-xs text-white mt-1">Fully loaded cost</p>
              </div>
            </CalculatorResult>

            <CalculatorResult category="business">
              <div className="text-center">
                <p className="text-sm text-white mb-1">Charge-Out Rate</p>
                <div className="text-3xl font-bold text-green-400">
                  {currency(recommendedChargeOut)}/hr
                </div>
                <p className="text-xs text-white mt-1">At {targetMarginNum}% margin</p>
              </div>
            </CalculatorResult>
          </div>

          {/* Annual Summary */}
          <CalculatorResult category="business">
            <ResultsGrid columns={2}>
              <ResultValue
                label="Annual Base Pay"
                value={currency(annualBase)}
                category="business"
                size="sm"
              />
              <ResultValue
                label="Total On-costs"
                value={currency(annualOnCosts)}
                category="business"
                size="sm"
              />
              <ResultValue
                label="Total Annual Cost"
                value={currency(totalAnnualCost)}
                category="business"
                size="sm"
              />
              <ResultValue
                label="Billable Hours"
                value={`${effectiveHours.toFixed(0)} hrs/yr`}
                category="business"
                size="sm"
              />
            </ResultsGrid>
          </CalculatorResult>

          {/* Cost Breakdown */}
          <Collapsible open={showBreakdown} onOpenChange={setShowBreakdown}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: "#60a5fa15" }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">
                    Cost Breakdown
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-white/80 transition-transform duration-200",
                    showBreakdown && "rotate-180"
                  )}
                />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-2 text-sm">
                  <h4 className="text-xs font-medium text-white uppercase tracking-wide mb-2">
                    Annual Costs
                  </h4>
                  <div className="flex justify-between items-center py-2 border-b border-white/10 min-w-0 gap-2">
                    <span className="text-white/80 truncate min-w-0">Base Pay ({basePayHrNum}/hr × {weeklyHoursNum}hrs × {paidWeeksNum}wks)</span>
                    <span className="text-white font-mono shrink-0">{currency(annualBase)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/80">Employer NI ({niRateNum}%)</span>
                    <span className="text-white font-mono">+ {currency(oncostNI)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/80">Pension ({pensionRateNum}%)</span>
                    <span className="text-white font-mono">+ {currency(pension)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/80">Van costs</span>
                    <span className="text-white font-mono">+ {currency(vanYearNum)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/80">Tools & equipment</span>
                    <span className="text-white font-mono">+ {currency(toolsYearNum)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/80">Insurance</span>
                    <span className="text-white font-mono">+ {currency(insuranceYearNum)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/80">Training</span>
                    <span className="text-white font-mono">+ {currency(trainingYearNum)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 font-medium bg-white/5 px-2 rounded">
                    <span className="text-white">= Total Annual Cost</span>
                    <span className="text-white font-mono">{currency(totalAnnualCost)}</span>
                  </div>

                  <h4 className="text-xs font-medium text-white uppercase tracking-wide mb-2 mt-6 pt-4 border-t border-white/10">
                    Hourly Calculation
                  </h4>
                  <div className="flex justify-between items-center py-2 border-b border-white/10 min-w-0 gap-2">
                    <span className="text-white/80 truncate min-w-0">Total Hours ({weeklyHoursNum}hrs × {paidWeeksNum}wks)</span>
                    <span className="text-white font-mono shrink-0">{(weeklyHoursNum * paidWeeksNum).toFixed(0)} hrs</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/80">Billable at {utilisationNum}%</span>
                    <span className="text-white font-mono">{effectiveHours.toFixed(0)} hrs</span>
                  </div>
                  <div className="flex justify-between items-center py-2 font-medium bg-blue-500/10 px-2 rounded">
                    <span className="text-blue-300">= True Hourly Cost</span>
                    <span className="text-blue-400 font-mono text-base">{currency(loadedHourlyCost)}/hr</span>
                  </div>
                  <div className="flex justify-between items-center py-2 font-medium bg-green-500/10 px-2 rounded">
                    <span className="text-green-300">+ {targetMarginNum}% margin</span>
                    <span className="text-green-400 font-mono text-base">{currency(recommendedChargeOut)}/hr</span>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Prompt to Calculate */}
      {!calculated && (
        <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center">
          <Info className="h-10 w-10 text-blue-400 mx-auto mb-3 opacity-50" />
          <h3 className="text-white text-lg font-semibold mb-2">Ready to Calculate</h3>
          <p className="text-white text-sm">
            Enter your staff costs and overheads above, then click "Calculate Cost" to see the true
            hourly cost of employing someone.
          </p>
        </div>
      )}

      {/* Quick Reference */}
      <Collapsible open={showReference} onOpenChange={setShowReference}>
        <div className="calculator-card overflow-hidden" style={{ borderColor: "#fbbf2415" }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-amber-400" />
              <span className="text-sm sm:text-base font-medium text-amber-300">
                Employment Costs Reference
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
                <p className="text-amber-300 font-medium">UK Wage Rates (2025)</p>
                <p className="text-amber-200/70">NMW 21+: £12.21/hr</p>
                <p className="text-amber-200/70">Spark: £18-30/hr</p>
                <p className="text-amber-200/70">Mate: £12-18/hr</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Employer Costs</p>
                <p className="text-amber-200/70">Employer NI: 13.8%</p>
                <p className="text-amber-200/70">Pension min: 3%</p>
                <p className="text-amber-200/70">Holidays: 28 days</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Typical Overheads</p>
                <p className="text-amber-200/70">Van: £3-5k/yr</p>
                <p className="text-amber-200/70">Tools: £800-1.5k/yr</p>
                <p className="text-amber-200/70">Insurance: £1-2k/yr</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Utilisation</p>
                <p className="text-amber-200/70">Target: 65-75%</p>
                <p className="text-amber-200/70">Includes: admin, travel</p>
                <p className="text-amber-200/70">Non-billable: 25-35%</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-500/20">
              <p className="text-xs text-amber-200/60">
                <Info className="h-3 w-3 inline mr-1" />
                True hourly cost is typically 50-80% higher than base pay once all on-costs are included.
                Use this to price jobs accurately and avoid undercharging for labour.
              </p>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
      </main>
    </div>
  );
};

export default StaffCostCalculator;
