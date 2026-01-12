import * as React from "react";
import { Helmet } from "react-helmet";
import {
  Percent,
  TrendingDown,
  PoundSterling,
  Calculator,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  BookOpen,
  Info,
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

const VATSchemeComparison: React.FC = () => {
  const config = CALCULATOR_CONFIG["business"];

  const [annualRevenue, setAnnualRevenue] = React.useState("120000");
  const [labourShare, setLabourShare] = React.useState("60");
  const [flatRate, setFlatRate] = React.useState("14.5");
  const [vatRate, setVatRate] = React.useState("20");
  const [vatRegistered, setVatRegistered] = React.useState(true);

  const [calculated, setCalculated] = React.useState(false);
  const [showBreakdown, setShowBreakdown] = React.useState(false);
  const [showReference, setShowReference] = React.useState(false);

  const annualRevenueNum = parseFloat(annualRevenue) || 0;
  const labourShareNum = parseFloat(labourShare) || 0;
  const materialsShareNum = Math.max(0, 100 - labourShareNum);
  const flatRateNum = parseFloat(flatRate) || 0;
  const vatRateNum = parseFloat(vatRate) || 0;

  const labour = annualRevenueNum * (labourShareNum / 100);
  const materials = annualRevenueNum * (materialsShareNum / 100);

  // Standard scheme
  const standardOutputVat = vatRegistered ? annualRevenueNum * (vatRateNum / 100) : 0;
  const standardInputVat = vatRegistered ? materials * (vatRateNum / 100) : 0;
  const standardVatPayable = Math.max(0, standardOutputVat - standardInputVat);

  // Flat Rate scheme
  const vatInclusiveTurnover = annualRevenueNum * (1 + vatRateNum / 100);
  const frsVatPayable = vatRegistered ? vatInclusiveTurnover * (flatRateNum / 100) : 0;

  const diff = frsVatPayable - standardVatPayable;
  const betterScheme = diff > 0 ? "Standard VAT" : "Flat Rate VAT";
  const annualSaving = Math.abs(diff);

  const handleCalculate = () => {
    setCalculated(true);
  };

  const handleReset = () => {
    setAnnualRevenue("120000");
    setLabourShare("60");
    setFlatRate("14.5");
    setVatRate("20");
    setVatRegistered(true);
    setCalculated(false);
  };

  const isValid = annualRevenueNum > 0;

  return (
    <div className="min-h-screen bg-background pt-safe pb-safe">
      <div className="space-y-4 px-4 py-6 animate-fade-in">
        <Helmet>
          <title>VAT Scheme Comparison for Electricians UK</title>
        <meta
          name="description"
          content="Compare Flat Rate vs Standard VAT schemes for UK electricians to see net take-home impact."
        />
        <link rel="canonical" href="/electrician/business-development/tools/vat-scheme" />
      </Helmet>

      <CalculatorCard
        category="business"
        title="VAT Scheme Comparison"
        description="Compare Standard vs Flat Rate VAT schemes for your business"
        badge="VAT"
      >
        {/* Business Details Section */}
        <div className="flex items-center gap-2 mb-3">
          <PoundSterling className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white">Business Details</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Annual Revenue"
            unit="£"
            type="text"
            inputMode="decimal"
            value={annualRevenue}
            onChange={(val) => {
              setAnnualRevenue(val);
              setCalculated(false);
            }}
            placeholder="e.g., 120000"
            hint="Revenue ex VAT"
          />

          <CalculatorInput
            label="Labour Share"
            unit="%"
            type="text"
            inputMode="decimal"
            value={labourShare}
            onChange={(val) => {
              setLabourShare(val);
              setCalculated(false);
            }}
            placeholder="e.g., 60"
            hint={`Materials: ${materialsShareNum}%`}
          />
        </div>

        {/* VAT Settings Section */}
        <div className="flex items-center gap-2 mb-3 mt-6 pt-4 border-t border-white/10">
          <Percent className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-white">VAT Settings</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Flat Rate"
            unit="%"
            type="text"
            inputMode="decimal"
            value={flatRate}
            onChange={(val) => {
              setFlatRate(val);
              setCalculated(false);
            }}
            placeholder="e.g., 14.5"
            hint="Electrical: 14.5% (12.5% after year 1)"
          />

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
            hint="Standard 20%, Reduced 5%"
          />
        </div>

        {/* VAT Registered Toggle */}
        <div className="space-y-2 mt-3">
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

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <button
            onClick={handleCalculate}
            disabled={!isValid || !vatRegistered}
            className={cn(
              "flex-1 h-14 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all touch-manipulation",
              isValid && vatRegistered ? "text-black" : "bg-white/10 text-white/30 cursor-not-allowed"
            )}
            style={
              isValid && vatRegistered
                ? {
                    background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }
                : undefined
            }
          >
            <Calculator className="h-5 w-5" />
            Compare Schemes
          </button>
          <button
            onClick={handleReset}
            className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors touch-manipulation"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
      </CalculatorCard>

      {/* Not VAT Registered Message */}
      {!vatRegistered && (
        <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10">
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-400">Not VAT Registered</span>
          </div>
          <p className="text-sm text-amber-200/80">
            VAT scheme comparison only applies if you're VAT registered. The VAT registration threshold
            is £90,000 annual turnover. Below this, you can voluntarily register or remain
            non-VAT registered.
          </p>
        </div>
      )}

      {/* Results Section */}
      {calculated && isValid && vatRegistered && (
        <div className="space-y-4 animate-fade-in">
          {/* Recommendation Banner */}
          <div
            className={cn(
              "flex items-center gap-2 p-3 rounded-xl border",
              diff > 0 ? "bg-green-500/10 border-green-500/30" : "bg-blue-500/10 border-blue-500/30"
            )}
          >
            {diff > 0 ? (
              <CheckCircle className="h-5 w-5 text-green-400" />
            ) : (
              <CheckCircle className="h-5 w-5 text-blue-400" />
            )}
            <span className={cn("font-medium text-sm", diff > 0 ? "text-green-400" : "text-blue-400")}>
              {betterScheme} saves you {currency(annualSaving)}/year
            </span>
          </div>

          {/* Scheme Comparison Cards */}
          <div className="grid grid-cols-2 gap-4">
            <CalculatorResult category="business">
              <div className="text-center">
                <p className="text-sm text-white mb-1">Standard VAT</p>
                <div
                  className={cn(
                    "text-2xl font-bold",
                    diff > 0 ? "text-green-400" : "text-white"
                  )}
                >
                  {currency(standardVatPayable)}
                </div>
                <p className="text-xs text-white mt-1">Annual VAT payable</p>
              </div>
            </CalculatorResult>

            <CalculatorResult category="business">
              <div className="text-center">
                <p className="text-sm text-white mb-1">Flat Rate VAT</p>
                <div
                  className={cn(
                    "text-2xl font-bold",
                    diff <= 0 ? "text-blue-400" : "text-white"
                  )}
                >
                  {currency(frsVatPayable)}
                </div>
                <p className="text-xs text-white mt-1">Annual VAT payable</p>
              </div>
            </CalculatorResult>
          </div>

          {/* Main Result */}
          <CalculatorResult category="business">
            <div className="text-center pb-4 border-b border-white/10">
              <p className="text-sm text-white mb-1">Recommended Scheme</p>
              <div
                className="text-3xl font-bold"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {betterScheme}
              </div>
              <p className="text-xs text-white mt-1">
                Annual saving: {currency(annualSaving)}
              </p>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue
                label="Labour Revenue"
                value={currency(labour)}
                category="business"
                size="sm"
              />
              <ResultValue
                label="Materials Revenue"
                value={currency(materials)}
                category="business"
                size="sm"
              />
              <ResultValue
                label="Input VAT Reclaimable"
                value={currency(standardInputVat)}
                category="business"
                size="sm"
              />
              <ResultValue
                label="Difference"
                value={`${diff > 0 ? "+" : ""}${currency(diff)}`}
                category="business"
                size="sm"
              />
            </ResultsGrid>
          </CalculatorResult>

          {/* Detailed Breakdown */}
          <Collapsible open={showBreakdown} onOpenChange={setShowBreakdown}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: "#60a5fa15" }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">
                    Detailed Breakdown
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
                <div className="grid grid-cols-2 gap-6">
                  {/* Standard VAT Breakdown */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-green-400 mb-3">Standard VAT Scheme</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center py-1 border-b border-white/10">
                        <span className="text-white/80">Output VAT charged</span>
                        <span className="text-white font-mono">{currency(standardOutputVat)}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-white/10">
                        <span className="text-white/80">Input VAT reclaimable</span>
                        <span className="text-green-400 font-mono">-{currency(standardInputVat)}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 font-medium">
                        <span className="text-white">= Net VAT payable</span>
                        <span className="text-white font-mono">{currency(standardVatPayable)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Flat Rate Breakdown */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-blue-400 mb-3">Flat Rate VAT Scheme</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center py-1 border-b border-white/10">
                        <span className="text-white/80">VAT-inc turnover</span>
                        <span className="text-white font-mono">{currency(vatInclusiveTurnover)}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-white/10">
                        <span className="text-white/80">Flat rate ({flatRateNum}%)</span>
                        <span className="text-white font-mono">×{flatRateNum}%</span>
                      </div>
                      <div className="flex justify-between items-center py-1 font-medium">
                        <span className="text-white">= VAT payable</span>
                        <span className="text-white font-mono">{currency(frsVatPayable)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="p-3 rounded-lg bg-white/5">
                    {diff > 0 ? (
                      <p className="text-sm text-white/80">
                        <strong className="text-green-400">Standard VAT</strong> is better because you can
                        reclaim {currency(standardInputVat)} in input VAT on materials, saving you{" "}
                        {currency(annualSaving)} annually compared to Flat Rate.
                      </p>
                    ) : (
                      <p className="text-sm text-white/80">
                        <strong className="text-blue-400">Flat Rate VAT</strong> is better because despite
                        not reclaiming input VAT, you save {currency(annualSaving)} annually with simplified
                        accounting and the lower flat rate percentage.
                      </p>
                    )}
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Prompt to Calculate */}
      {!calculated && vatRegistered && (
        <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center">
          <Info className="h-10 w-10 text-blue-400 mx-auto mb-3 opacity-50" />
          <h3 className="text-white text-lg font-semibold mb-2">Ready to Compare</h3>
          <p className="text-white text-sm">
            Enter your annual revenue and labour/materials split above, then click "Compare Schemes" to
            see which VAT scheme is best for your business.
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
                VAT Scheme Reference Guide
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
                <p className="text-amber-300 font-medium">Standard VAT</p>
                <p className="text-amber-200/70">Charge 20% on sales</p>
                <p className="text-amber-200/70">Reclaim VAT on purchases</p>
                <p className="text-amber-200/70">Best for: Materials-heavy</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Flat Rate VAT</p>
                <p className="text-amber-200/70">Pay fixed % of turnover</p>
                <p className="text-amber-200/70">No input VAT reclaim</p>
                <p className="text-amber-200/70">Best for: Labour-heavy</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Electrical Flat Rates</p>
                <p className="text-amber-200/70">First year: 14.5%</p>
                <p className="text-amber-200/70">After year 1: 12.5%</p>
                <p className="text-amber-200/70">Category: Building services</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Key Thresholds</p>
                <p className="text-amber-200/70">Registration: £90,000</p>
                <p className="text-amber-200/70">FRS limit: £150,000</p>
                <p className="text-amber-200/70">Quarterly returns</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-500/20">
              <p className="text-xs text-amber-200/60">
                <Info className="h-3 w-3 inline mr-1" />
                The Flat Rate Scheme is simpler to administer but may not suit businesses with high
                material costs. Standard VAT allows full input VAT recovery. Consult an accountant for
                specific advice.
              </p>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
      </div>
    </div>
  );
};

export default VATSchemeComparison;
