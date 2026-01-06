import { useState } from "react";
import {
  Activity,
  Calculator,
  RotateCcw,
  TrendingUp,
  AlertCircle,
  Zap,
  Shield,
  BookOpen,
  Target,
  ChevronDown,
  CheckCircle,
  XCircle,
  Info,
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
  CalculatorSelect,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";
import {
  calculatePowerQuality,
  type PowerQualityInputs,
  type PowerQualityResults,
} from "@/lib/powerquality";

const PowerQualityCalculator = () => {
  const config = CALCULATOR_CONFIG["power"];

  const [fundamentalCurrent, setFundamentalCurrent] = useState<string>("");
  const [fundamentalVoltage, setFundamentalVoltage] = useState<string>("230");
  const [systemType, setSystemType] = useState<"single-phase" | "three-phase">("single-phase");
  const [loadType, setLoadType] = useState<"linear" | "non-linear" | "mixed">("non-linear");
  const [frequency, setFrequency] = useState<string>("50");

  // Individual harmonic inputs
  const [harmonic3, setHarmonic3] = useState<string>("");
  const [harmonic5, setHarmonic5] = useState<string>("");
  const [harmonic7, setHarmonic7] = useState<string>("");
  const [harmonic9, setHarmonic9] = useState<string>("");
  const [harmonic11, setHarmonic11] = useState<string>("");
  const [harmonic13, setHarmonic13] = useState<string>("");
  const [harmonic15, setHarmonic15] = useState<string>("");
  const [harmonic17, setHarmonic17] = useState<string>("");

  const [result, setResult] = useState<PowerQualityResults | null>(null);
  const [showHarmonics, setShowHarmonics] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const systemTypeOptions = [
    { value: "single-phase", label: "Single Phase" },
    { value: "three-phase", label: "Three Phase" },
  ];

  const loadTypeOptions = [
    { value: "linear", label: "Linear Loads" },
    { value: "non-linear", label: "Non-Linear Loads" },
    { value: "mixed", label: "Mixed Loads" },
  ];

  const calculatePQ = () => {
    if (!fundamentalCurrent || parseFloat(fundamentalCurrent) <= 0) return;

    const I1 = parseFloat(fundamentalCurrent);
    const V1 = parseFloat(fundamentalVoltage) || 230;
    const freq = parseFloat(frequency) || 50;

    // Build harmonics array from inputs
    const harmonics = [
      { order: 3, current: parseFloat(harmonic3) || 0 },
      { order: 5, current: parseFloat(harmonic5) || 0 },
      { order: 7, current: parseFloat(harmonic7) || 0 },
      { order: 9, current: parseFloat(harmonic9) || 0 },
      { order: 11, current: parseFloat(harmonic11) || 0 },
      { order: 13, current: parseFloat(harmonic13) || 0 },
      { order: 15, current: parseFloat(harmonic15) || 0 },
      { order: 17, current: parseFloat(harmonic17) || 0 },
    ].filter((h) => h.current > 0);

    const inputs: PowerQualityInputs = {
      fundamentalCurrent: I1,
      fundamentalVoltage: V1,
      harmonics,
      systemType,
      frequency: freq,
      loadType,
    };

    const results = calculatePowerQuality(inputs);
    setResult(results);
  };

  const reset = () => {
    setFundamentalCurrent("");
    setFundamentalVoltage("230");
    setSystemType("single-phase");
    setLoadType("non-linear");
    setFrequency("50");
    setHarmonic3("");
    setHarmonic5("");
    setHarmonic7("");
    setHarmonic9("");
    setHarmonic11("");
    setHarmonic13("");
    setHarmonic15("");
    setHarmonic17("");
    setResult(null);
  };

  const isValid = fundamentalCurrent && parseFloat(fundamentalCurrent) > 0;

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "excellent":
        return "text-green-400 border-green-500/30 bg-green-500/10";
      case "good":
        return "text-blue-400 border-blue-500/30 bg-blue-500/10";
      case "fair":
        return "text-yellow-400 border-yellow-500/30 bg-yellow-500/10";
      case "poor":
        return "text-orange-400 border-orange-500/30 bg-orange-500/10";
      case "critical":
        return "text-red-400 border-red-500/30 bg-red-500/10";
      default:
        return "text-white/60 border-white/10 bg-white/5";
    }
  };

  const getOrdinal = (num: number) => {
    if (num === 1) return "1st";
    if (num === 2) return "2nd";
    if (num === 3) return "3rd";
    return `${num}th`;
  };

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="power"
        title="Power Quality & THD Calculator"
        description="Comprehensive harmonic analysis for BS 7671 18th Edition compliance"
        badge="THD"
      >
        {/* System Configuration */}
        <div className="flex items-center gap-2 mb-3">
          <Activity className="h-4 w-4 text-amber-400" />
          <span className="text-sm font-medium text-white/80">System Configuration</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorSelect
            label="System Type"
            value={systemType}
            onChange={(v) => setSystemType(v as "single-phase" | "three-phase")}
            options={systemTypeOptions}
          />

          <CalculatorSelect
            label="Load Type"
            value={loadType}
            onChange={(v) => setLoadType(v as "linear" | "non-linear" | "mixed")}
            options={loadTypeOptions}
          />
        </div>

        {/* Fundamental Values */}
        <div className="flex items-center gap-2 mb-3 mt-4">
          <Zap className="h-4 w-4 text-amber-400" />
          <span className="text-sm font-medium text-white/80">Fundamental Values</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <CalculatorInput
            label="Current (I₁)"
            unit="A"
            type="text"
            inputMode="decimal"
            value={fundamentalCurrent}
            onChange={setFundamentalCurrent}
            placeholder="e.g., 10"
          />

          <CalculatorInput
            label="Voltage (V₁)"
            unit="V"
            type="text"
            inputMode="decimal"
            value={fundamentalVoltage}
            onChange={setFundamentalVoltage}
            placeholder="230"
          />

          <CalculatorInput
            label="Frequency"
            unit="Hz"
            type="text"
            inputMode="decimal"
            value={frequency}
            onChange={setFrequency}
            placeholder="50"
          />
        </div>

        {/* Harmonic Components */}
        <div className="flex items-center gap-2 mb-3 mt-4">
          <TrendingUp className="h-4 w-4 text-amber-400" />
          <span className="text-sm font-medium text-white/80">Harmonic Currents</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <CalculatorInput
            label="3rd"
            unit="A"
            type="text"
            inputMode="decimal"
            value={harmonic3}
            onChange={setHarmonic3}
            placeholder="0"
          />
          <CalculatorInput
            label="5th"
            unit="A"
            type="text"
            inputMode="decimal"
            value={harmonic5}
            onChange={setHarmonic5}
            placeholder="0"
          />
          <CalculatorInput
            label="7th"
            unit="A"
            type="text"
            inputMode="decimal"
            value={harmonic7}
            onChange={setHarmonic7}
            placeholder="0"
          />
          <CalculatorInput
            label="9th"
            unit="A"
            type="text"
            inputMode="decimal"
            value={harmonic9}
            onChange={setHarmonic9}
            placeholder="0"
          />
          <CalculatorInput
            label="11th"
            unit="A"
            type="text"
            inputMode="decimal"
            value={harmonic11}
            onChange={setHarmonic11}
            placeholder="0"
          />
          <CalculatorInput
            label="13th"
            unit="A"
            type="text"
            inputMode="decimal"
            value={harmonic13}
            onChange={setHarmonic13}
            placeholder="0"
          />
          <CalculatorInput
            label="15th"
            unit="A"
            type="text"
            inputMode="decimal"
            value={harmonic15}
            onChange={setHarmonic15}
            placeholder="0"
          />
          <CalculatorInput
            label="17th"
            unit="A"
            type="text"
            inputMode="decimal"
            value={harmonic17}
            onChange={setHarmonic17}
            placeholder="0"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={calculatePQ}
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
            Analyse Power Quality
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
      {result && (
        <div className="space-y-4 animate-fade-in">
          <CalculatorResult category="power">
            {/* Assessment Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pb-4 border-b border-white/10">
              <div
                className={cn(
                  "px-3 py-1 rounded-full border font-medium text-sm",
                  getRatingColor(result.powerQualityRating)
                )}
              >
                {result.powerQualityRating.toUpperCase()}
              </div>
              <div
                className={cn(
                  "px-3 py-1 rounded-full border font-medium text-sm",
                  result.riskLevel === "low"
                    ? "text-green-400 border-green-500/30 bg-green-500/10"
                    : result.riskLevel === "medium"
                    ? "text-yellow-400 border-yellow-500/30 bg-yellow-500/10"
                    : result.riskLevel === "high"
                    ? "text-orange-400 border-orange-500/30 bg-orange-500/10"
                    : "text-red-400 border-red-500/30 bg-red-500/10"
                )}
              >
                {result.riskLevel.toUpperCase()} RISK
              </div>
              <div
                className={cn(
                  "px-3 py-1 rounded-full border font-medium text-sm",
                  result.complianceStatus === "compliant"
                    ? "text-green-400 border-green-500/30 bg-green-500/10"
                    : result.complianceStatus === "borderline"
                    ? "text-yellow-400 border-yellow-500/30 bg-yellow-500/10"
                    : "text-red-400 border-red-500/30 bg-red-500/10"
                )}
              >
                {result.complianceStatus.toUpperCase()}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3 py-4">
              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-white/50 mb-1">THDi Current</p>
                <div
                  className={cn(
                    "text-2xl font-bold",
                    result.thdiCurrent > 15
                      ? "text-red-400"
                      : result.thdiCurrent > 10
                      ? "text-orange-400"
                      : result.thdiCurrent > 5
                      ? "text-yellow-400"
                      : "text-green-400"
                  )}
                >
                  {result.thdiCurrent.toFixed(2)}%
                </div>
                <p className="text-xs text-white/40">Limit: 5%</p>
              </div>

              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-white/50 mb-1">RMS Current</p>
                <div
                  className="text-2xl font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }}
                >
                  {result.rmsCurrentTotal.toFixed(2)}A
                </div>
                <p className="text-xs text-white/40">Total RMS</p>
              </div>

              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-white/50 mb-1">Crest Factor</p>
                <div
                  className={cn(
                    "text-2xl font-bold",
                    result.crestFactorCurrent > 2.5
                      ? "text-orange-400"
                      : result.crestFactorCurrent > 2.0
                      ? "text-yellow-400"
                      : "text-green-400"
                  )}
                >
                  {result.crestFactorCurrent.toFixed(2)}
                </div>
                <p className="text-xs text-white/40">Typical: 1.41</p>
              </div>

              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-white/50 mb-1">K-Factor</p>
                <div
                  className={cn(
                    "text-2xl font-bold",
                    result.kFactor > 13
                      ? "text-red-400"
                      : result.kFactor > 9
                      ? "text-orange-400"
                      : result.kFactor > 4
                      ? "text-yellow-400"
                      : "text-green-400"
                  )}
                >
                  {result.kFactor.toFixed(1)}
                </div>
                <p className="text-xs text-white/40">Transformer</p>
              </div>
            </div>

            {/* Critical Violations */}
            {result.harmonicSpectrum.filter((h) => h.compliance === "fail").length > 0 && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <span className="font-medium text-red-300 text-sm">Critical Harmonic Violations</span>
                </div>
                <div className="space-y-1">
                  {result.harmonicSpectrum
                    .filter((h) => h.compliance === "fail")
                    .sort((a, b) => b.currentPercentage / b.limit - a.currentPercentage / a.limit)
                    .slice(0, 3)
                    .map((harmonic) => {
                      const violation = (harmonic.currentPercentage / harmonic.limit - 1) * 100;
                      return (
                        <div key={harmonic.order} className="text-sm">
                          <span className="font-medium text-red-200">
                            {getOrdinal(harmonic.order)} harmonic:
                          </span>
                          <span className="text-red-300 ml-2">
                            {harmonic.currentPercentage.toFixed(2)}% ({violation.toFixed(0)}% over limit)
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Neutral Current Warning */}
            {systemType === "three-phase" && result.neutralCurrent > 0 && (
              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-orange-400" />
                  <span className="font-medium text-orange-300 text-sm">Neutral Current Analysis</span>
                </div>
                <div className="text-sm text-orange-200/80">
                  Neutral Current: <span className="font-mono">{result.neutralCurrent.toFixed(2)}A</span>
                  {result.neutralCurrent > parseFloat(fundamentalCurrent) && (
                    <span className="text-orange-400 ml-2">Exceeds line current</span>
                  )}
                </div>
              </div>
            )}

            {/* Regulatory Compliance */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div
                className={cn(
                  "p-2 rounded-lg border text-center",
                  result.bs7671Compliance
                    ? "border-green-500/30 bg-green-500/10"
                    : "border-red-500/30 bg-red-500/10"
                )}
              >
                <p className="font-medium text-xs text-white/80">BS 7671</p>
                <p className={cn("text-xs", result.bs7671Compliance ? "text-green-400" : "text-red-400")}>
                  {result.bs7671Compliance ? "Compliant" : "Non-compliant"}
                </p>
              </div>
              <div
                className={cn(
                  "p-2 rounded-lg border text-center",
                  result.ieeeCompliance
                    ? "border-green-500/30 bg-green-500/10"
                    : "border-red-500/30 bg-red-500/10"
                )}
              >
                <p className="font-medium text-xs text-white/80">IEEE 519</p>
                <p className={cn("text-xs", result.ieeeCompliance ? "text-green-400" : "text-red-400")}>
                  {result.ieeeCompliance ? "Compliant" : "Non-compliant"}
                </p>
              </div>
              <div
                className={cn(
                  "p-2 rounded-lg border text-center",
                  result.gCode5Compliance
                    ? "border-green-500/30 bg-green-500/10"
                    : "border-red-500/30 bg-red-500/10"
                )}
              >
                <p className="font-medium text-xs text-white/80">G5/5 Code</p>
                <p className={cn("text-xs", result.gCode5Compliance ? "text-green-400" : "text-red-400")}>
                  {result.gCode5Compliance ? "Compliant" : "Non-compliant"}
                </p>
              </div>
            </div>

            {/* Harmonic Spectrum */}
            {result.harmonicSpectrum.length > 0 && (
              <Collapsible open={showHarmonics} onOpenChange={setShowHarmonics}>
                <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/15 transition-colors">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-300">
                      Individual Harmonics ({result.harmonicSpectrum.length})
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-white/40 transition-transform duration-200",
                      showHarmonics && "rotate-180"
                    )}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-3">
                  <div className="space-y-2">
                    {result.harmonicSpectrum.map((harmonic) => (
                      <div
                        key={harmonic.order}
                        className="flex items-center justify-between p-2 rounded-lg bg-white/5"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-white/80">{getOrdinal(harmonic.order)}</span>
                          <div
                            className={cn(
                              "w-2.5 h-2.5 rounded-full",
                              harmonic.compliance === "pass"
                                ? "bg-green-500"
                                : harmonic.compliance === "warning"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            )}
                          />
                        </div>
                        <div className="text-right">
                          <p className="font-mono text-sm text-white/80">
                            {harmonic.currentPercentage.toFixed(2)}%
                          </p>
                          <p className="text-xs text-white/40">Limit: {harmonic.limit}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Recommendations */}
            {result.recommendations.length > 0 && (
              <Collapsible open={showRecommendations} onOpenChange={setShowRecommendations}>
                <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/15 transition-colors mt-3">
                  <div className="flex items-center gap-3">
                    <Target className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium text-purple-300">
                      Technical Solutions ({result.recommendations.length})
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-white/40 transition-transform duration-200",
                      showRecommendations && "rotate-180"
                    )}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-3">
                  <div className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20"
                      >
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span className="text-sm text-purple-200/80">{rec}</span>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Equipment Impact */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 mt-4">
              <p className="font-medium text-white/80 mb-3 text-sm">Equipment Impact Assessment</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-white/50 text-xs mb-1">Transformers</p>
                  <p
                    className={cn(
                      "text-xs",
                      result.kFactor > 13
                        ? "text-red-400"
                        : result.kFactor > 9
                        ? "text-orange-400"
                        : "text-green-400"
                    )}
                  >
                    {result.kFactor > 13
                      ? "Critical overheating risk"
                      : result.kFactor > 9
                      ? "Elevated temperature"
                      : "Normal operation"}
                  </p>
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-1">Neutral Conductor</p>
                  <p
                    className={cn(
                      "text-xs",
                      systemType === "three-phase" && result.neutralCurrent > parseFloat(fundamentalCurrent)
                        ? "text-orange-400"
                        : "text-green-400"
                    )}
                  >
                    {systemType === "three-phase" && result.neutralCurrent > parseFloat(fundamentalCurrent)
                      ? "Oversizing required"
                      : "Standard sizing adequate"}
                  </p>
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-1">Protection Devices</p>
                  <p
                    className={cn("text-xs", result.crestFactorCurrent > 2.5 ? "text-orange-400" : "text-green-400")}
                  >
                    {result.crestFactorCurrent > 2.5 ? "RMS-sensing recommended" : "Standard devices suitable"}
                  </p>
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-1">PFC Capacitors</p>
                  <p className={cn("text-xs", result.thdiCurrent > 8 ? "text-orange-400" : "text-green-400")}>
                    {result.thdiCurrent > 8 ? "Detuned capacitors required" : "Standard capacitors OK"}
                  </p>
                </div>
              </div>
            </div>
          </CalculatorResult>

          {/* Why This Matters */}
          <Collapsible open={showReference} onOpenChange={setShowReference}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: "#fbbf2415" }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">
                    Why Power Quality Matters
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
                <ul className="space-y-2 text-sm text-amber-200/80">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    Prevents costly equipment failures and reduces maintenance costs
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    Harmonics cause 15-25% increase in energy consumption
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    Non-compliance with BS 7671 18th Edition creates legal liability
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    Poor power quality reduces equipment lifespan by up to 50%
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    Harmonic currents cause neutral conductor overheating in 3-phase systems
                  </li>
                </ul>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Quick Reference */}
      {!result && (
        <Collapsible>
          <div className="calculator-card overflow-hidden" style={{ borderColor: "#fbbf2415" }}>
            <CollapsibleTrigger className="agent-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-amber-400" />
                <span className="text-sm sm:text-base font-medium text-amber-300">Quick Reference</span>
              </div>
              <ChevronDown className="h-4 w-4 text-white/40 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>

            <CollapsibleContent className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">THD Limits</p>
                  <p className="text-amber-200/70">Excellent: &lt;5%</p>
                  <p className="text-amber-200/70">Good: 5-10%</p>
                  <p className="text-amber-200/70">Critical: &gt;15%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">K-Factor Ratings</p>
                  <p className="text-amber-200/70">K-4: Office equipment</p>
                  <p className="text-amber-200/70">K-13: Industrial</p>
                  <p className="text-amber-200/70">K-20: Data centre</p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">Common Sources</p>
                  <p className="text-amber-200/70">VFDs, LED drivers</p>
                  <p className="text-amber-200/70">SMPS, UPS systems</p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">Standards</p>
                  <p className="text-amber-200/70">BS 7671 Section 331</p>
                  <p className="text-amber-200/70">IEEE 519, G5/5</p>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      )}
    </div>
  );
};

export default PowerQualityCalculator;
