import * as React from "react";
import { Helmet } from "react-helmet";
import {
  Calculator,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Info,
  Zap,
  PoundSterling,
  Clock,
  Wrench,
  ChevronDown,
  BookOpen,
  RotateCcw,
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

const BreakEvenCalculator: React.FC = () => {
  const config = CALCULATOR_CONFIG["business"];

  // Business settings
  const [annualOverheads, setAnnualOverheads] = React.useState<string>("32000");
  const [chargeableHours, setChargeableHours] = React.useState<string>("1200");
  const [labourCostHr, setLabourCostHr] = React.useState<string>("28");
  const [materialShare, setMaterialShare] = React.useState<string>("30");
  const [materialMarkup, setMaterialMarkup] = React.useState<string>("18");
  const [targetMargin, setTargetMargin] = React.useState<string>("20");
  const [vatRegistered, setVatRegistered] = React.useState(true);
  const [vatRate, setVatRate] = React.useState<string>("20");

  // Example job
  const [exampleHours, setExampleHours] = React.useState<string>("4");
  const [exampleMats, setExampleMats] = React.useState<string>("130");

  // UI state
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [showGuidance, setShowGuidance] = React.useState(false);
  const [showReference, setShowReference] = React.useState(false);

  // Parse values
  const overheadsNum = parseFloat(annualOverheads) || 0;
  const hoursNum = parseFloat(chargeableHours) || 1;
  const labourNum = parseFloat(labourCostHr) || 0;
  const markupNum = parseFloat(materialMarkup) || 0;
  const marginNum = parseFloat(targetMargin) || 0;
  const vatNum = parseFloat(vatRate) || 0;
  const exHoursNum = parseFloat(exampleHours) || 0;
  const exMatsNum = parseFloat(exampleMats) || 0;

  // Calculations
  const overheadPerHour = overheadsNum / Math.max(1, hoursNum);
  const breakEvenHr = labourNum + overheadPerHour;
  const breakEvenDay = breakEvenHr * 8;

  // Example job pricing
  const exLabourCost = breakEvenHr * exHoursNum;
  const exMatsSell = exMatsNum * (1 + markupNum / 100);
  const basePrice = exLabourCost + exMatsSell;
  const targetUplift = marginNum > 0 ? basePrice / (1 - marginNum / 100) : basePrice;
  const priceExVat = targetUplift;
  const priceIncVat = vatRegistered ? priceExVat * (1 + vatNum / 100) : priceExVat;

  // Health checks
  const utilisationRate = (hoursNum / 2080) * 100;

  const getMarginHealth = () => {
    if (marginNum >= 20) return { label: "Excellent", color: "text-green-400", bg: "bg-green-500/10 border-green-500/30" };
    if (marginNum >= 15) return { label: "Good", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30" };
    if (marginNum >= 10) return { label: "Fair", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" };
    return { label: "Low", color: "text-red-400", bg: "bg-red-500/10 border-red-500/30" };
  };

  const getUtilisationHealth = () => {
    if (utilisationRate >= 60) return { label: "Excellent", color: "text-green-400", bg: "bg-green-500/10 border-green-500/30" };
    if (utilisationRate >= 50) return { label: "Good", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30" };
    if (utilisationRate >= 40) return { label: "Fair", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" };
    return { label: "Low", color: "text-red-400", bg: "bg-red-500/10 border-red-500/30" };
  };

  const getMarkupHealth = () => {
    if (markupNum >= 25) return { label: "Excellent", color: "text-green-400", bg: "bg-green-500/10 border-green-500/30" };
    if (markupNum >= 18) return { label: "Good", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30" };
    if (markupNum >= 10) return { label: "Fair", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" };
    return { label: "Low", color: "text-red-400", bg: "bg-red-500/10 border-red-500/30" };
  };

  const marginHealth = getMarginHealth();
  const utilisationHealth = getUtilisationHealth();
  const markupHealth = getMarkupHealth();

  const reset = () => {
    setAnnualOverheads("32000");
    setChargeableHours("1200");
    setLabourCostHr("28");
    setMaterialShare("30");
    setMaterialMarkup("18");
    setTargetMargin("20");
    setVatRegistered(true);
    setVatRate("20");
    setExampleHours("4");
    setExampleMats("130");
  };

  const isValid = overheadsNum > 0 && hoursNum > 0 && labourNum > 0;

  return (
    <div className="min-h-screen px-4 py-8">
      <Helmet>
        <title>Break-even & Margin Guard | Electrician UK</title>
        <meta
          name="description"
          content="Work out your break-even point and minimum margin to protect profit on electrical jobs in the UK."
        />
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-4">
        {/* Business Health Snapshot */}
        <div className="calculator-card p-4" style={{ borderColor: "#60a5fa20" }}>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-medium text-white">Business Health Snapshot</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Margin Health */}
            <div className={cn("p-3 rounded-xl border", marginHealth.bg)}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-white">Target Margin</span>
                <span className={cn("text-xs font-medium", marginHealth.color)}>
                  {marginHealth.label}
                </span>
              </div>
              <div className="text-2xl font-bold text-white">{marginNum}%</div>
              <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-blue-400 transition-all"
                  style={{ width: `${Math.min(marginNum * 4, 100)}%` }}
                />
              </div>
            </div>

            {/* Utilisation */}
            <div className={cn("p-3 rounded-xl border", utilisationHealth.bg)}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-white">Utilisation</span>
                <span className={cn("text-xs font-medium", utilisationHealth.color)}>
                  {utilisationHealth.label}
                </span>
              </div>
              <div className="text-2xl font-bold text-white">{utilisationRate.toFixed(0)}%</div>
              <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-blue-400 transition-all"
                  style={{ width: `${Math.min(utilisationRate, 100)}%` }}
                />
              </div>
            </div>

            {/* Material Markup */}
            <div className={cn("p-3 rounded-xl border", markupHealth.bg)}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-white">Mat. Markup</span>
                <span className={cn("text-xs font-medium", markupHealth.color)}>
                  {markupHealth.label}
                </span>
              </div>
              <div className="text-2xl font-bold text-white">{markupNum}%</div>
              <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-blue-400 transition-all"
                  style={{ width: `${Math.min(markupNum * 3, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <CalculatorCard
          category="business"
          title="Break-Even Calculator"
          description="Calculate your minimum hourly rate to cover all costs before profit"
          badge="Finance"
        >
          {/* Business Settings */}
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-white">Business Settings</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CalculatorInput
              label="Annual Overheads"
              unit="£"
              type="text"
              inputMode="decimal"
              value={annualOverheads}
              onChange={setAnnualOverheads}
              placeholder="e.g., 32000"
              hint="Insurance, van, tools, etc."
            />

            <CalculatorInput
              label="Chargeable Hours/Year"
              type="text"
              inputMode="numeric"
              value={chargeableHours}
              onChange={setChargeableHours}
              placeholder="e.g., 1200"
              hint={`Utilisation: ${utilisationRate.toFixed(0)}%`}
            />
          </div>

          {/* Labour & Materials */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-white">Labour & Materials</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <CalculatorInput
                label="Labour Cost/Hour"
                unit="£"
                type="text"
                inputMode="decimal"
                value={labourCostHr}
                onChange={setLabourCostHr}
                placeholder="e.g., 28"
                hint="Inc. NI, pension"
              />

              <CalculatorInput
                label="Materials Share"
                unit="%"
                type="text"
                inputMode="decimal"
                value={materialShare}
                onChange={setMaterialShare}
                placeholder="e.g., 30"
              />

              <CalculatorInput
                label="Material Markup"
                unit="%"
                type="text"
                inputMode="decimal"
                value={materialMarkup}
                onChange={setMaterialMarkup}
                placeholder="e.g., 18"
              />
            </div>

            {markupNum < 15 && markupNum > 0 && (
              <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <div className="flex items-center gap-2 text-amber-400 text-sm">
                  <AlertTriangle className="h-4 w-4" />
                  <span>
                    Markup below 15% may not cover procurement time and wastage
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Margin & VAT */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <PoundSterling className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-white">Margin & VAT</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <CalculatorInput
                label="Target Margin"
                unit="%"
                type="text"
                inputMode="decimal"
                value={targetMargin}
                onChange={setTargetMargin}
                placeholder="e.g., 20"
                hint="Aim for 15-25%"
              />

              <CalculatorInput
                label="VAT Rate"
                unit="%"
                type="text"
                inputMode="decimal"
                value={vatRate}
                onChange={setVatRate}
                placeholder="e.g., 20"
              />
            </div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setVatRegistered(true)}
                className={cn(
                  "flex-1 h-12 rounded-xl font-medium text-sm transition-all",
                  vatRegistered
                    ? "text-black"
                    : "bg-white/5 border border-white/10 text-white"
                )}
                style={
                  vatRegistered
                    ? {
                        background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                      }
                    : undefined
                }
              >
                VAT Registered
              </button>
              <button
                onClick={() => setVatRegistered(false)}
                className={cn(
                  "flex-1 h-12 rounded-xl font-medium text-sm transition-all",
                  !vatRegistered
                    ? "text-black"
                    : "bg-white/5 border border-white/10 text-white"
                )}
                style={
                  !vatRegistered
                    ? {
                        background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                      }
                    : undefined
                }
              >
                Not Registered
              </button>
            </div>

            {marginNum < 10 && marginNum > 0 && (
              <div className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/30">
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertTriangle className="h-4 w-4" />
                  <span>
                    Margin below 10% leaves little room for unexpected costs
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Reset Button */}
          <button
            onClick={reset}
            className="w-full h-12 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset to Defaults
          </button>
        </CalculatorCard>

        {/* Break-Even Results */}
        {isValid && (
          <div className="space-y-4 animate-fade-in">
            <CalculatorResult category="business">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium text-white">Your Break-Even Rates</span>
              </div>

              <ResultsGrid columns={3}>
                <ResultValue
                  label="Overhead/Hour"
                  value={currency(overheadPerHour)}
                  category="business"
                  size="sm"
                />
                <div className="text-center">
                  <p className="text-xs text-white mb-1">Break-Even/Hour</p>
                  <div
                    className="text-2xl font-bold bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                    }}
                  >
                    {currency(breakEvenHr)}
                  </div>
                </div>
                <ResultValue
                  label="Break-Even Day (8h)"
                  value={currency(breakEvenDay)}
                  category="business"
                  size="sm"
                />
              </ResultsGrid>

              <div className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/30">
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5" />
                  <span className="text-green-200/80">
                    Any quote below {currency(breakEvenHr)}/hour will lose money. Add your{" "}
                    {marginNum}% margin to hit{" "}
                    <strong className="text-green-400">
                      {currency(breakEvenHr * (1 + marginNum / 100))}/hour
                    </strong>
                  </span>
                </div>
              </div>
            </CalculatorResult>

            {/* Example Job Calculator */}
            <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
              <div className="calculator-card overflow-hidden" style={{ borderColor: "#60a5fa15" }}>
                <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span className="text-sm sm:text-base font-medium text-blue-300">
                      Example Job Pricing
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-white/80 transition-transform duration-200",
                      showAdvanced && "rotate-180"
                    )}
                  />
                </CollapsibleTrigger>

                <CollapsibleContent className="p-4 pt-0 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <CalculatorInput
                      label="Labour Hours"
                      type="text"
                      inputMode="decimal"
                      value={exampleHours}
                      onChange={setExampleHours}
                      placeholder="e.g., 4"
                      hint="Time on-site + travel"
                    />
                    <CalculatorInput
                      label="Materials Cost"
                      unit="£"
                      type="text"
                      inputMode="decimal"
                      value={exampleMats}
                      onChange={setExampleMats}
                      placeholder="e.g., 130"
                      hint="Your cost, not selling"
                    />
                  </div>

                  {/* Price Breakdown */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-medium text-white">Price Breakdown</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between text-white">
                        <span>Labour ({exHoursNum}h × {currency(breakEvenHr)})</span>
                        <span className="text-white">{currency(exLabourCost)}</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Materials ({currency(exMatsNum)} + {markupNum}%)</span>
                        <span className="text-white">{currency(exMatsSell)}</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Base price (before margin)</span>
                        <span className="text-white">{currency(basePrice)}</span>
                      </div>
                      <div className="flex justify-between text-white pt-2 border-t border-white/10">
                        <span>Margin uplift ({marginNum}%)</span>
                        <span className="text-green-400">+{currency(targetUplift - basePrice)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Final Prices */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-center">
                      <p className="text-xs text-green-300/80 mb-1">Quote (ex VAT)</p>
                      <div className="text-3xl font-bold text-green-400">
                        {currency(priceExVat)}
                      </div>
                      <p className="text-xs text-green-300/60 mt-1">
                        Includes {marginNum}% margin
                      </p>
                    </div>
                    <div className="p-4 rounded-xl border text-center" style={{ borderColor: `${config.gradientFrom}30`, background: `linear-gradient(135deg, ${config.gradientFrom}10, ${config.gradientTo}10)` }}>
                      <p className="text-xs text-white mb-1">
                        Total {vatRegistered ? "(inc VAT)" : ""}
                      </p>
                      <div
                        className="text-3xl font-bold bg-clip-text text-transparent"
                        style={{
                          backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                        }}
                      >
                        {currency(priceIncVat)}
                      </div>
                      {vatRegistered && (
                        <p className="text-xs text-white mt-1">
                          VAT: {currency(priceIncVat - priceExVat)}
                        </p>
                      )}
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>

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
                      "h-4 w-4 text-white/80 transition-transform duration-200",
                      showGuidance && "rotate-180"
                    )}
                  />
                </CollapsibleTrigger>

                <CollapsibleContent className="p-4 pt-0">
                  <ul className="space-y-2 text-sm text-blue-200/80">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>
                        <strong className="text-blue-300">Break-even rate:</strong> The minimum
                        you must charge per hour just to cover your costs with zero profit
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>
                        <strong className="text-blue-300">Overhead/hour:</strong> Your fixed
                        costs (van, insurance, tools) spread across billable hours
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>
                        <strong className="text-blue-300">Utilisation:</strong> Percentage of
                        working time you can actually bill (target 50-60%)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>
                        <strong className="text-blue-300">Target margin:</strong> Your profit
                        buffer for growth, emergencies, and investment
                      </span>
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
                  Break-Even Reference
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
                  <p className="text-amber-300 font-medium">Typical Overheads</p>
                  <p className="text-amber-200/70">Sole trader: £15-25k/yr</p>
                  <p className="text-amber-200/70">Small firm: £30-50k/yr</p>
                  <p className="text-amber-200/70">With premises: £50k+/yr</p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">Utilisation Targets</p>
                  <p className="text-amber-200/70">Excellent: 60%+ (1,248h)</p>
                  <p className="text-amber-200/70">Good: 50-60% (1,040h)</p>
                  <p className="text-amber-200/70">Low: &lt;40% (832h)</p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">Material Markup</p>
                  <p className="text-amber-200/70">Standard: 15-25%</p>
                  <p className="text-amber-200/70">Specialist: 25-40%</p>
                  <p className="text-amber-200/70">Emergency: 30-50%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">Target Margins</p>
                  <p className="text-amber-200/70">Minimum: 10-15%</p>
                  <p className="text-amber-200/70">Target: 15-25%</p>
                  <p className="text-amber-200/70">Premium: 25-35%</p>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </div>
    </div>
  );
};

export default BreakEvenCalculator;
