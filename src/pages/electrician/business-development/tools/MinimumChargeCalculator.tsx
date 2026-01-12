import * as React from "react";
import { Helmet } from "react-helmet";
import {
  Clock,
  PoundSterling,
  Target,
  Calculator,
  RotateCcw,
  ChevronDown,
  BookOpen,
  Info,
  Lightbulb,
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

const currency = (n: number) => `£${n.toFixed(2)}`;
const roundTo = (n: number, step: number) => Math.round(n / step) * step;
const validateInput = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value));
};

const MinimumChargeCalculator: React.FC = () => {
  const config = CALCULATOR_CONFIG["business"];

  const [travelMins, setTravelMins] = React.useState("30");
  const [adminMins, setAdminMins] = React.useState("15");
  const [hourlyCost, setHourlyCost] = React.useState("30");
  const [overheadHr, setOverheadHr] = React.useState("10");
  const [firstHourPremium, setFirstHourPremium] = React.useState("25");
  const [vatRegistered, setVatRegistered] = React.useState(true);
  const [vatRate, setVatRate] = React.useState("20");
  const [rounding, setRounding] = React.useState("5");

  const [calculated, setCalculated] = React.useState(false);
  const [showBreakdown, setShowBreakdown] = React.useState(false);
  const [showReference, setShowReference] = React.useState(false);

  const travelMinsNum = validateInput(parseFloat(travelMins) || 0, 0, 180);
  const adminMinsNum = validateInput(parseFloat(adminMins) || 0, 0, 120);
  const hourlyCostNum = validateInput(parseFloat(hourlyCost) || 0, 0, 200);
  const overheadHrNum = validateInput(parseFloat(overheadHr) || 0, 0, 100);
  const firstHourPremiumNum = validateInput(parseFloat(firstHourPremium) || 0, 0, 100);
  const vatRateNum = validateInput(parseFloat(vatRate) || 0, 0, 20);
  const roundingNum = validateInput(parseFloat(rounding) || 1, 1, 50);

  const timeCost = ((travelMinsNum + adminMinsNum) / 60) * (hourlyCostNum + overheadHrNum);
  const firstHourBase = hourlyCostNum + overheadHrNum + timeCost;
  const firstHourUplift = firstHourBase * (1 + firstHourPremiumNum / 100);
  const firstHourRounded = roundTo(firstHourUplift, roundingNum);
  const firstHourIncVat = vatRegistered ? firstHourRounded * (1 + vatRateNum / 100) : firstHourRounded;

  const subsequentHourBase = hourlyCostNum + overheadHrNum;
  const subsequentHourRounded = roundTo(subsequentHourBase, roundingNum);
  const subsequentIncVat = vatRegistered ? subsequentHourRounded * (1 + vatRateNum / 100) : subsequentHourRounded;

  const exampleJobHours = 3;
  const exampleTotal = firstHourIncVat + subsequentIncVat * (exampleJobHours - 1);

  const handleCalculate = () => {
    setCalculated(true);
  };

  const handleReset = () => {
    setTravelMins("30");
    setAdminMins("15");
    setHourlyCost("30");
    setOverheadHr("10");
    setFirstHourPremium("25");
    setVatRegistered(true);
    setVatRate("20");
    setRounding("5");
    setCalculated(false);
  };

  const isValid = hourlyCostNum > 0;

  return (
    <div className="min-h-screen bg-background pt-safe pb-safe">
      <div className="space-y-4 px-4 py-6 animate-fade-in">
        <Helmet>
        <title>Minimum Charge & First Hour Pricing UK</title>
        <meta
          name="description"
          content="Set profitable minimum call-out and first-hour pricing for domestic and commercial electrical work in the UK."
        />
        <link rel="canonical" href="/electrician/business-development/tools/minimum-charge" />
      </Helmet>

      <CalculatorCard
        category="business"
        title="Minimum Charge Calculator"
        description="Calculate profitable call-out pricing that covers travel, admin and setup costs"
        badge="Pricing"
      >
        {/* Time Costs Section */}
        <div className="flex items-center gap-2 mb-3">
          <Clock className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white">Time Costs</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Travel Time"
            unit="mins"
            type="text"
            inputMode="numeric"
            value={travelMins}
            onChange={(val) => {
              setTravelMins(val);
              setCalculated(false);
            }}
            placeholder="e.g., 30"
            hint="Average one-way travel"
          />

          <CalculatorInput
            label="Admin Time"
            unit="mins"
            type="text"
            inputMode="numeric"
            value={adminMins}
            onChange={(val) => {
              setAdminMins(val);
              setCalculated(false);
            }}
            placeholder="e.g., 15"
            hint="Quotes, invoicing, calls"
          />
        </div>

        {/* Costs Section */}
        <div className="flex items-center gap-2 mb-3 mt-6 pt-4 border-t border-white/10">
          <PoundSterling className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white">Your Costs & Overheads</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Hourly Cost"
            unit="£/hr"
            type="text"
            inputMode="decimal"
            value={hourlyCost}
            onChange={(val) => {
              setHourlyCost(val);
              setCalculated(false);
            }}
            placeholder="e.g., 30"
            hint="Wages, NI, pension, van"
          />

          <CalculatorInput
            label="Business Overhead"
            unit="£/hr"
            type="text"
            inputMode="decimal"
            value={overheadHr}
            onChange={(val) => {
              setOverheadHr(val);
              setCalculated(false);
            }}
            placeholder="e.g., 10"
            hint="Insurance, tools, office"
          />
        </div>

        {/* Pricing Strategy Section */}
        <div className="flex items-center gap-2 mb-3 mt-6 pt-4 border-t border-white/10">
          <Target className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white">Pricing Strategy</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="First Hour Premium"
            unit="%"
            type="text"
            inputMode="numeric"
            value={firstHourPremium}
            onChange={(val) => {
              setFirstHourPremium(val);
              setCalculated(false);
            }}
            placeholder="e.g., 25"
            hint="Extra margin for short jobs"
          />

          <CalculatorInput
            label="Round Prices To"
            unit="£"
            type="text"
            inputMode="numeric"
            value={rounding}
            onChange={(val) => {
              setRounding(val);
              setCalculated(false);
            }}
            placeholder="e.g., 5"
            hint="Nearest £5 or £10"
          />
        </div>

        {/* VAT Section */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="space-y-2">
            <label className="text-sm text-white">VAT Registered</label>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setVatRegistered(true);
                  setCalculated(false);
                }}
                className={cn(
                  "flex-1 h-10 rounded-xl font-medium text-sm transition-all",
                  vatRegistered ? "text-black" : "bg-white/5 border border-white/10 text-white"
                )}
                style={
                  vatRegistered
                    ? { background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }
                    : undefined
                }
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setVatRegistered(false);
                  setCalculated(false);
                }}
                className={cn(
                  "flex-1 h-10 rounded-xl font-medium text-sm transition-all",
                  !vatRegistered ? "text-black" : "bg-white/5 border border-white/10 text-white"
                )}
                style={
                  !vatRegistered
                    ? { background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }
                    : undefined
                }
              >
                No
              </button>
            </div>
          </div>

          {vatRegistered && (
            <CalculatorInput
              label="VAT Rate"
              unit="%"
              type="text"
              inputMode="decimal"
              value={vatRate}
              onChange={(val) => {
                setVatRate(val);
                setCalculated(false);
              }}
              placeholder="e.g., 20"
              hint="20% standard, 5% reduced"
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <button
            onClick={handleCalculate}
            disabled={!isValid}
            className={cn(
              "flex-1 h-14 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all touch-manipulation",
              isValid ? "text-black" : "bg-white/10 text-white/60 cursor-not-allowed"
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
            Calculate Pricing
          </button>
          <button
            onClick={handleReset}
            className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors touch-manipulation"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
      </CalculatorCard>

      {/* Results Section */}
      {calculated && isValid && (
        <div className="space-y-4 animate-fade-in">
          {/* First Hour Pricing */}
          <CalculatorResult category="business">
            <div className="text-center pb-4 border-b border-white/10">
              <p className="text-sm text-white mb-1">First Hour Price</p>
              <div
                className="text-4xl font-bold"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {currency(vatRegistered ? firstHourIncVat : firstHourRounded)}
              </div>
              <p className="text-xs text-white mt-1">
                {vatRegistered ? "inc VAT" : "ex VAT"} - Your minimum call-out charge
              </p>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue
                label="First Hour (ex VAT)"
                value={currency(firstHourRounded)}
                category="business"
                size="sm"
              />
              <ResultValue
                label="Subsequent Hours"
                value={currency(vatRegistered ? subsequentIncVat : subsequentHourRounded)}
                category="business"
                size="sm"
              />
            </ResultsGrid>
          </CalculatorResult>

          {/* Example Quote */}
          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-400">Example Quote</span>
            </div>
            <p className="text-sm text-amber-200/80">
              <strong className="text-amber-300">{exampleJobHours}-hour job:</strong>
              <br />
              {currency(firstHourIncVat)} (1st hour) + {currency(subsequentIncVat)} × {exampleJobHours - 1}{" "}
              (additional hours) ={" "}
              <strong
                className="text-lg"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {currency(exampleTotal)}
              </strong>{" "}
              total
            </p>
          </div>

          {/* Calculation Breakdown */}
          <Collapsible open={showBreakdown} onOpenChange={setShowBreakdown}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: "#60a5fa15" }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">
                    Calculation Breakdown
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
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white">Base labour (1 hour)</span>
                    <span className="text-white font-mono font-semibold">
                      {currency(hourlyCostNum + overheadHrNum)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white">Travel & admin time cost</span>
                    <span className="text-white font-mono font-semibold">+ {currency(timeCost)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white">First hour premium ({firstHourPremiumNum}%)</span>
                    <span className="text-white font-mono font-semibold">
                      + {currency(firstHourUplift - firstHourBase)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 font-medium bg-white/5 px-2 rounded">
                    <span className="text-white">= First Hour (ex VAT)</span>
                    <span className="text-white font-mono">{currency(firstHourRounded)}</span>
                  </div>
                  {vatRegistered && (
                    <>
                      <div className="flex justify-between items-center py-2 border-b border-white/10">
                        <span className="text-white">VAT ({vatRateNum}%)</span>
                        <span className="text-white font-mono font-semibold">
                          + {currency(firstHourIncVat - firstHourRounded)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 font-medium bg-blue-500/10 px-2 rounded">
                        <span className="text-blue-300">= First Hour (inc VAT)</span>
                        <span className="text-blue-400 font-mono text-base">
                          {currency(firstHourIncVat)}
                        </span>
                      </div>
                    </>
                  )}
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
            Enter your time costs and business overheads above, then click "Calculate Pricing" to see
            your first hour and minimum charge rates.
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
                Pricing Reference Guide
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
                <p className="text-amber-300 font-medium">Why First Hour Premium?</p>
                <p className="text-amber-200/70">Covers fixed costs: travel, setup, admin</p>
                <p className="text-amber-200/70">Small jobs stay profitable</p>
                <p className="text-amber-200/70">Typical: 20-35% premium</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">UK Typical Rates</p>
                <p className="text-amber-200/70">Call-out: £60-100</p>
                <p className="text-amber-200/70">Hourly rate: £40-65</p>
                <p className="text-amber-200/70">Emergency: £80-150</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">VAT Considerations</p>
                <p className="text-amber-200/70">Standard: 20%</p>
                <p className="text-amber-200/70">Reduced 5%: Energy saving</p>
                <p className="text-amber-200/70">Threshold: £90,000</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Price Rounding</p>
                <p className="text-amber-200/70">£5 increments: Most common</p>
                <p className="text-amber-200/70">£10 increments: Easier quotes</p>
                <p className="text-amber-200/70">Builds trust with customers</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-500/20">
              <p className="text-xs text-amber-200/60">
                <Info className="h-3 w-3 inline mr-1" />
                Your first hour price should cover travel, admin, and setup so even 30-minute jobs are
                profitable. After the first hour, charge your standard hourly rate.
              </p>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
      </div>
    </div>
  );
};

export default MinimumChargeCalculator;
