import { useState } from "react";
import {
  Wrench,
  Info,
  CheckCircle2,
  RotateCcw,
  Zap,
  Plus,
  BarChart3,
  Calculator,
  Lightbulb,
  TrendingDown,
  ChevronDown,
  BookOpen,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  CalculatorCard,
  CalculatorSelect,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";
import { useMultiLoadDiversityCalculator } from "./diversity-factor/useMultiLoadDiversityCalculator";
import { LoadEntry } from "./diversity-factor/LoadEntry";

const DiversityFactorCalculator = () => {
  const config = CALCULATOR_CONFIG["power"];

  const {
    loads,
    location,
    supplyVoltage,
    inputMode,
    result,
    errors,
    showResults,
    addLoad,
    removeLoad,
    updateLoad,
    setLocation,
    setSupplyVoltage,
    toggleInputMode,
    calculateDemand,
    resetCalculator,
    clearError,
    loadTypes,
  } = useMultiLoadDiversityCalculator();

  const [supplyType, setSupplyType] = useState<string>("single-phase");
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [showPractical, setShowPractical] = useState(false);

  const calculateEstimatedCurrent = () => {
    if (!result) return 0;
    return result.diversifiedCurrent;
  };

  const getMainDeviceRecommendation = () => {
    const current = calculateEstimatedCurrent();

    if (current <= 6) return "6A MCB/RCBO";
    if (current <= 10) return "10A MCB/RCBO";
    if (current <= 16) return "16A MCB/RCBO";
    if (current <= 20) return "20A MCB/RCBO";
    if (current <= 25) return "25A MCB/RCBO";
    if (current <= 32) return "32A MCB/RCBO";
    if (current <= 40) return "40A MCB/RCBO";
    if (current <= 50) return "50A MCB/RCBO";
    if (current <= 63) return "63A MCB/RCBO";
    if (current <= 80) return "80A Switch Disconnector";
    if (current <= 100) return "100A Switch Disconnector";
    return "125A+ Switch Disconnector";
  };

  const locationOptions = [
    { value: "domestic", label: "Domestic Installation" },
    { value: "commercial", label: "Commercial Installation" },
    { value: "industrial", label: "Industrial Installation" },
  ];

  const voltageOptions = [
    { value: "230", label: "230V" },
    { value: "400", label: "400V" },
  ];

  const supplyTypeOptions = [
    { value: "single-phase", label: "Single Phase" },
    { value: "three-phase", label: "Three Phase" },
  ];

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="power"
        title="Diversity Factor Calculator"
        description="Calculate electrical demand after applying BS 7671 diversity factors"
        badge="BS 7671"
      >
        {/* Input Mode Toggle */}
        <div className="space-y-2">
          <p className="text-sm text-white/60">Input Mode</p>
          <div className="flex gap-2">
            <button
              onClick={() => toggleInputMode("amperage")}
              className={cn(
                "flex-1 h-12 rounded-xl font-medium text-sm transition-all touch-manipulation",
                inputMode === "amperage"
                  ? "text-black"
                  : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
              )}
              style={
                inputMode === "amperage"
                  ? {
                      background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                    }
                  : undefined
              }
            >
              <div className="flex flex-col items-center">
                <span className="font-semibold">Amperage</span>
                <span className="text-xs opacity-80">(A)</span>
              </div>
            </button>
            <button
              onClick={() => toggleInputMode("kw")}
              className={cn(
                "flex-1 h-12 rounded-xl font-medium text-sm transition-all touch-manipulation",
                inputMode === "kw"
                  ? "text-black"
                  : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
              )}
              style={
                inputMode === "kw"
                  ? {
                      background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                    }
                  : undefined
              }
            >
              <div className="flex flex-col items-center">
                <span className="font-semibold">Power</span>
                <span className="text-xs opacity-80">(kW)</span>
              </div>
            </button>
          </div>
        </div>

        {/* Configuration */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <CalculatorSelect
            label="Installation Type"
            value={location}
            onChange={setLocation}
            options={locationOptions}
          />
          <CalculatorSelect
            label="Supply Type"
            value={supplyType}
            onChange={setSupplyType}
            options={supplyTypeOptions}
          />
          <CalculatorSelect
            label="Supply Voltage"
            value={supplyVoltage}
            onChange={setSupplyVoltage}
            options={voltageOptions}
          />
        </div>
      </CalculatorCard>

      {/* Loads Section */}
      <div className="calculator-card p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-400" />
              Circuit Loads
            </h3>
            <p className="text-xs text-white/50 mt-1">
              Add loads for comprehensive diversity calculation
            </p>
          </div>
          <button
            onClick={addLoad}
            className="h-10 px-3 flex items-center gap-2 rounded-lg bg-amber-400/20 border border-amber-400/30 text-amber-300 text-sm font-medium hover:bg-amber-400/30 transition-colors touch-manipulation"
          >
            <Plus className="h-4 w-4" />
            Add Load
          </button>
        </div>

        <div className="space-y-3">
          {loads.map((load, index) => (
            <LoadEntry
              key={load.id}
              load={load}
              index={index}
              canRemove={loads.length > 1}
              loadTypes={loadTypes}
              errors={errors}
              inputMode={inputMode}
              supplyVoltage={supplyVoltage}
              onUpdate={updateLoad}
              onRemove={removeLoad}
              onClearError={clearError}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={calculateDemand}
            disabled={loads.some((load) => !load.type || !load.connectedLoad)}
            className={cn(
              "flex-1 h-14 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all touch-manipulation",
              !loads.some((load) => !load.type || !load.connectedLoad)
                ? "text-black"
                : "bg-white/10 text-white/30 cursor-not-allowed"
            )}
            style={
              !loads.some((load) => !load.type || !load.connectedLoad)
                ? {
                    background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }
                : undefined
            }
          >
            <Calculator className="h-5 w-5" />
            Calculate Diversity
          </button>
          <button
            onClick={resetCalculator}
            className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-colors touch-manipulation"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Results Section */}
      {showResults && result ? (
        <div className="space-y-4 animate-fade-in">
          <CalculatorResult category="power">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <span className="font-semibold text-white">Diversity Results</span>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue
                label="Total Installed Load"
                value={`${result.totalInstalledLoad.toFixed(2)} kW`}
                category="power"
                size="sm"
              />
              <ResultValue
                label="Diversified Load"
                value={`${result.diversifiedLoad.toFixed(2)} kW`}
                category="power"
                size="lg"
              />
              <ResultValue
                label="Design Current"
                value={`${result.totalDesignCurrent.toFixed(1)} A`}
                category="power"
                size="sm"
              />
              <ResultValue
                label="Diversified Current"
                value={`${result.diversifiedCurrent.toFixed(1)} A`}
                category="power"
                size="lg"
              />
            </ResultsGrid>

            {/* Diversity Factor Badge */}
            <div className="mt-4 p-3 rounded-xl bg-amber-400/10 border border-amber-400/20">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-white/80">
                  Overall Diversity Factor:
                </span>
                <span
                  className="text-2xl font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }}
                >
                  {(result.overallDiversityFactor * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            {/* Load Breakdown */}
            {result.breakdownByType.length > 0 && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-white/60" />
                  <span className="text-sm font-medium text-white/80">Load Breakdown</span>
                </div>
                <div className="space-y-2">
                  {result.breakdownByType.map((breakdown, index) => (
                    <div key={index} className="p-2 rounded-lg bg-white/5">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-white capitalize">
                          {breakdown.type.replace("-", " ")}
                        </span>
                        <span className="text-sm font-semibold text-amber-400">
                          {(breakdown.diversityFactor * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-white/50">
                        <span>
                          {breakdown.installedLoad.toFixed(2)} kW →{" "}
                          {breakdown.diversifiedLoad.toFixed(2)} kW
                        </span>
                        <span>
                          -{(breakdown.installedLoad - breakdown.diversifiedLoad).toFixed(2)} kW
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Protection Recommendation */}
            <div className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-green-300">Protection Device:</span>
                <span className="text-sm text-green-200">{getMainDeviceRecommendation()}</span>
              </div>
            </div>

            {/* Load Reduction Summary */}
            <div className="mt-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <p className="text-sm text-blue-300">
                <span className="font-medium">Total Load Reduction:</span>{" "}
                {(result.totalInstalledLoad - result.diversifiedLoad).toFixed(2)} kW (
                {(
                  ((result.totalInstalledLoad - result.diversifiedLoad) /
                    result.totalInstalledLoad) *
                  100
                ).toFixed(1)}
                % reduction)
              </p>
            </div>
          </CalculatorResult>

          {/* What This Means */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: "#60a5fa15" }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Lightbulb className="h-4 w-4 text-blue-400" />
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
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-300">Practical Impact:</h4>
                    <ul className="space-y-1 text-blue-200/80">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>
                          <strong>Cable Savings:</strong> Use smaller cables than total load suggests
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>
                          <strong>Protection:</strong> {getMainDeviceRecommendation()} recommended
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>
                          <strong>Cost Reduction:</strong>{" "}
                          {(
                            ((result.totalInstalledLoad - result.diversifiedLoad) /
                              result.totalInstalledLoad) *
                            100
                          ).toFixed(1)}
                          % load reduction saves on installation
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-300">Engineering Basis:</h4>
                    <ul className="space-y-1 text-blue-200/80">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>
                          <strong>Diversity Factor:</strong> Not all loads operate simultaneously
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>
                          <strong>BS 7671 Compliance:</strong> Based on Table 311 diversity factors
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>
                          <strong>Real Usage:</strong> Reflects actual electrical demand patterns
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Practical Recommendations */}
          <Collapsible open={showPractical} onOpenChange={setShowPractical}>
            <div
              className="calculator-card overflow-hidden"
              style={{ borderColor: "#22c55e15" }}
            >
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <TrendingDown className="h-4 w-4 text-green-400" />
                  <span className="text-sm sm:text-base font-medium text-green-300">
                    Next Steps & Recommendations
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-white/40 transition-transform duration-200",
                    showPractical && "rotate-180"
                  )}
                />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <h4 className="font-medium text-green-300">Cable Sizing:</h4>
                    <ul className="space-y-1 text-green-200/80">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        <span>
                          Design for {result.diversifiedCurrent.toFixed(1)}A, not{" "}
                          {result.totalDesignCurrent.toFixed(1)}A
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        Consider voltage drop at diversified current
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        Apply derating factors for installation method
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-green-300">Future Considerations:</h4>
                    <ul className="space-y-1 text-green-200/80">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        Plan for 20-30% future load growth
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        Review diversity if load patterns change
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        Document assumptions for future reference
                      </li>
                    </ul>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Compliance Notes */}
          {result.complianceNotes.length > 0 && (
            <div className="calculator-card p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-white/60" />
                <span className="text-sm font-medium text-white/80">Compliance Notes</span>
              </div>
              <div className="space-y-1">
                {result.complianceNotes.map((note, index) => (
                  <p key={index} className="text-xs text-white/50 flex items-start gap-2">
                    <span className="text-white/30">•</span>
                    {note}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="calculator-card p-8 text-center">
          <Calculator className="h-12 w-12 mx-auto mb-3 text-white/20" />
          <p className="text-lg font-medium text-white/60 mb-2">Ready to Calculate</p>
          <p className="text-sm text-white/40">
            Add your circuit loads and click "Calculate Diversity" to see results
          </p>
          <div className="mt-4 text-xs text-white/30 space-y-1">
            <p>• Configure installation type and voltage</p>
            <p>• Add circuit loads with their types</p>
            <p>• Choose between kW or Amperage input</p>
            <p>• Get BS 7671 compliant diversity calculations</p>
          </div>
        </div>
      )}

      {/* Quick Reference */}
      <Collapsible open={showReference} onOpenChange={setShowReference}>
        <div className="calculator-card overflow-hidden" style={{ borderColor: "#fbbf2415" }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-amber-400" />
              <span className="text-sm sm:text-base font-medium text-amber-300">
                BS 7671 Diversity Reference
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
            <div className="space-y-3 text-sm text-amber-200/80">
              <p>
                <strong className="text-amber-300">Diversity factors from Table 311:</strong> Applied
                based on installation type
              </p>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  Consider simultaneity and load patterns
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  Apply to final circuits and distribution boards
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  Document diversity assumptions for future reference
                </li>
              </ul>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default DiversityFactorCalculator;
