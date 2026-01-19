import { useState } from "react";
import { Helmet } from "react-helmet";
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Clock,
  Package,
  PoundSterling,
  ChevronDown,
  BookOpen,
  Info,
  FileText,
  CheckCircle,
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
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";

const currency = (n: number) => `£${n.toFixed(2)}`;

const QuoteVarianceTracker = () => {
  const config = CALCULATOR_CONFIG["business"];

  const [quotedHours, setQuotedHours] = useState("16");
  const [actualHours, setActualHours] = useState("18");
  const [hourlyRate, setHourlyRate] = useState("55");
  const [quotedMats, setQuotedMats] = useState("300");
  const [actualMats, setActualMats] = useState("380");
  const [notes, setNotes] = useState("");

  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  // Parse values
  const quotedHoursVal = parseFloat(quotedHours) || 0;
  const actualHoursVal = parseFloat(actualHours) || 0;
  const hourlyRateVal = parseFloat(hourlyRate) || 0;
  const quotedMatsVal = parseFloat(quotedMats) || 0;
  const actualMatsVal = parseFloat(actualMats) || 0;

  // Calculations
  const hoursVar = actualHoursVal - quotedHoursVal;
  const hoursVarCost = hoursVar * hourlyRateVal;
  const matsVar = actualMatsVal - quotedMatsVal;
  const totalVar = hoursVarCost + matsVar;

  // Percentage calculations
  const hoursVarPercent =
    quotedHoursVal > 0
      ? ((hoursVar / quotedHoursVal) * 100).toFixed(1)
      : "0";
  const matsVarPercent =
    quotedMatsVal > 0 ? ((matsVar / quotedMatsVal) * 100).toFixed(1) : "0";
  const quotedTotal = quotedHoursVal * hourlyRateVal + quotedMatsVal;
  const totalVarPercent =
    quotedTotal > 0 ? ((totalVar / quotedTotal) * 100).toFixed(1) : "0";

  // Variance indicators
  const getVarianceColor = (variance: number) => {
    if (Math.abs(variance) < 0.01) return "text-white";
    return variance > 0 ? "text-red-400" : "text-green-400";
  };

  const getVarianceIcon = (variance: number) => {
    if (Math.abs(variance) < 0.01) return <AlertCircle className="h-4 w-4" />;
    return variance > 0 ? (
      <TrendingUp className="h-4 w-4" />
    ) : (
      <TrendingDown className="h-4 w-4" />
    );
  };

  const getVarianceStatus = () => {
    const absPercent = Math.abs(parseFloat(totalVarPercent));
    if (absPercent < 5) {
      return {
        color: "text-green-400",
        label: "On Target",
        bg: "bg-green-500/10 border-green-500/30",
      };
    }
    if (totalVar > 0) {
      return {
        color: "text-red-400",
        label: "Over Budget",
        bg: "bg-red-500/10 border-red-500/30",
      };
    }
    return {
      color: "text-amber-400",
      label: "Under Budget",
      bg: "bg-amber-500/10 border-amber-500/30",
    };
  };

  const varianceStatus = getVarianceStatus();

  return (
    <div className="bg-gradient-to-b from-background via-background to-background">
      <Helmet>
        <title>Quote vs Actual Tracker for UK Electricians</title>
        <meta
          name="description"
          content="Track quote variances to refine your pricing and protect margin."
        />
        <link rel="canonical" href="/electrician/business-development/tools/quote-variance" />
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl border"
              style={{
                background: `linear-gradient(135deg, ${config.gradientFrom}20, ${config.gradientTo}20)`,
                borderColor: `${config.gradientFrom}30`,
              }}
            >
              <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7" style={{ color: config.gradientFrom }} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Quote vs Actual Tracker
              </h1>
              <p className="text-sm text-white/70">Capture variances to refine your pricing</p>
            </div>
          </div>
          <SmartBackButton />
        </header>

        <CalculatorCard
          category="business"
          title="Quote vs Actual Tracker"
          description="Capture variances to refine your pricing and protect margin"
          badge="Finance"
        >
        {/* Quote Details */}
        <div className="flex items-center gap-2 mb-3">
          <Clock className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white">
            Labour Hours
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Quoted Hours"
            type="text"
            inputMode="decimal"
            value={quotedHours}
            onChange={setQuotedHours}
            placeholder="e.g., 16"
            hint="In your quote"
          />

          <CalculatorInput
            label="Actual Hours"
            type="text"
            inputMode="decimal"
            value={actualHours}
            onChange={setActualHours}
            placeholder="e.g., 18"
            hint="Job took"
          />
        </div>

        <CalculatorInput
          label="Charge-Out Rate"
          unit="£/hr"
          type="text"
          inputMode="decimal"
          value={hourlyRate}
          onChange={setHourlyRate}
          placeholder="e.g., 55"
          hint="Your hourly rate"
        />

        {/* Materials */}
        <div className="flex items-center gap-2 mb-3 mt-4">
          <Package className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white">Materials</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Quoted Materials"
            unit="£"
            type="text"
            inputMode="decimal"
            value={quotedMats}
            onChange={setQuotedMats}
            placeholder="e.g., 300"
            hint="In your quote"
          />

          <CalculatorInput
            label="Actual Materials"
            unit="£"
            type="text"
            inputMode="decimal"
            value={actualMats}
            onChange={setActualMats}
            placeholder="e.g., 380"
            hint="Actually spent"
          />
        </div>

        {/* Notes */}
        <div className="flex items-center gap-2 mb-2 mt-4">
          <FileText className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white">
            Variance Notes
          </span>
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="E.g., Client changed sockets from 6 to 10 mid-job, extra materials needed..."
          className="w-full min-h-[100px] bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-[16px] placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
        />
        <p className="text-xs text-white mt-1">
          Document why the variance occurred to improve future estimates
        </p>
      </CalculatorCard>

      {/* Variance Status */}
      <div
        className={cn(
          "flex items-center gap-2 p-3 rounded-xl border",
          varianceStatus.bg
        )}
      >
        {Math.abs(parseFloat(totalVarPercent)) < 5 ? (
          <CheckCircle className={cn("h-5 w-5", varianceStatus.color)} />
        ) : (
          <AlertCircle className={cn("h-5 w-5", varianceStatus.color)} />
        )}
        <span className={cn("font-medium text-sm", varianceStatus.color)}>
          {varianceStatus.label} - {Math.abs(parseFloat(totalVarPercent)).toFixed(1)}%
          Variance
        </span>
      </div>

      {/* Results */}
      <CalculatorResult category="business">
        <div className="flex items-center gap-2 mb-4">
          <PoundSterling className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white">
            Variance Summary
          </span>
        </div>

        <div className="space-y-3">
          {/* Hours Variance */}
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <span className="text-sm text-white font-medium">
              Hours Variance
            </span>
            <div className="flex items-center gap-2">
              <span className={getVarianceColor(hoursVar)}>
                {getVarianceIcon(hoursVar)}
              </span>
              <strong className={cn("text-sm", getVarianceColor(hoursVar))}>
                {hoursVar > 0 ? "+" : ""}
                {hoursVar.toFixed(1)} hrs ({hoursVar > 0 ? "+" : ""}
                {hoursVarPercent}%)
              </strong>
            </div>
          </div>

          {/* Labour Variance */}
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <span className="text-sm text-white font-medium">
              Labour Cost Variance
            </span>
            <div className="flex items-center gap-2">
              <span className={getVarianceColor(hoursVarCost)}>
                {getVarianceIcon(hoursVarCost)}
              </span>
              <strong className={cn("text-sm", getVarianceColor(hoursVarCost))}>
                {hoursVarCost > 0 ? "+" : ""}
                {currency(hoursVarCost)}
              </strong>
            </div>
          </div>

          {/* Materials Variance */}
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <span className="text-sm text-white font-medium">
              Materials Variance
            </span>
            <div className="flex items-center gap-2">
              <span className={getVarianceColor(matsVar)}>
                {getVarianceIcon(matsVar)}
              </span>
              <strong className={cn("text-sm", getVarianceColor(matsVar))}>
                {matsVar > 0 ? "+" : ""}
                {currency(matsVar)} ({matsVar > 0 ? "+" : ""}
                {matsVarPercent}%)
              </strong>
            </div>
          </div>

          {/* Total Variance */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3 bg-white/5 px-3 rounded-lg mt-2">
            <span className="font-semibold text-white">Total Job Variance</span>
            <div className="flex items-center gap-2">
              <span className={getVarianceColor(totalVar)}>
                {getVarianceIcon(totalVar)}
              </span>
              <strong
                className="text-lg"
                style={{
                  backgroundImage:
                    totalVar <= 0
                      ? `linear-gradient(135deg, #22c55e, #10b981)`
                      : `linear-gradient(135deg, #ef4444, #dc2626)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {totalVar > 0 ? "+" : ""}
                {currency(totalVar)} ({totalVar > 0 ? "+" : ""}
                {totalVarPercent}%)
              </strong>
            </div>
          </div>

          {/* Interpretation */}
          <div className="mt-3 p-3 bg-white/5 rounded-lg border border-white/10">
            <p className="text-sm text-white">
              {Math.abs(parseFloat(totalVarPercent)) < 5 ? (
                <>
                  <strong className="text-green-400">On target!</strong> Your
                  quote was within 5% of actual costs - excellent estimating.
                </>
              ) : totalVar > 0 ? (
                <>
                  <strong className="text-red-400">Over budget.</strong> The job
                  cost {currency(Math.abs(totalVar))} more than quoted. Review
                  your notes to understand why.
                </>
              ) : (
                <>
                  <strong className="text-amber-400">Under budget.</strong> The
                  job cost {currency(Math.abs(totalVar))} less than quoted. Good
                  margin protection.
                </>
              )}
            </p>
          </div>
        </div>
      </CalculatorResult>

      {/* What This Means */}
      <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
        <div
          className="calculator-card overflow-hidden"
          style={{ borderColor: "#60a5fa15" }}
        >
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <Info className="h-4 w-4 text-blue-400" />
              <span className="text-sm sm:text-base font-medium text-blue-300">
                Why Track Variance?
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
            <ul className="space-y-2 text-sm text-blue-200/80">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <strong className="text-blue-300">Build feedback loop:</strong>{" "}
                Track where quotes differ from reality
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <strong className="text-blue-300">Spot patterns:</strong> Certain
                job types may always overrun
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <strong className="text-blue-300">Protect margins:</strong> Add
                contingency for risky work types
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <strong className="text-blue-300">Client discussions:</strong>{" "}
                Data helps justify price adjustments
              </li>
            </ul>
          </CollapsibleContent>
        </div>
      </Collapsible>

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
                Variance Analysis Tips
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
                <p className="text-amber-300 font-medium">Target Range</p>
                <p className="text-amber-200/70">Within ±5% = Good</p>
                <p className="text-amber-200/70">Within ±10% = Acceptable</p>
                <p className="text-amber-200/70">&gt;10% = Review process</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Common Causes</p>
                <p className="text-amber-200/70">Scope creep</p>
                <p className="text-amber-200/70">Material price changes</p>
                <p className="text-amber-200/70">Hidden work discovered</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Labour Overruns</p>
                <p className="text-amber-200/70">Access issues</p>
                <p className="text-amber-200/70">Customer delays</p>
                <p className="text-amber-200/70">Complexity underestimated</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Improvement</p>
                <p className="text-amber-200/70">Add contingency (10-15%)</p>
                <p className="text-amber-200/70">Site survey before quote</p>
                <p className="text-amber-200/70">Detailed spec upfront</p>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
      </main>
    </div>
  );
};

export default QuoteVarianceTracker;
