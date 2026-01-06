import { useState } from "react";
import {
  Zap,
  RotateCcw,
  AlertTriangle,
  Info,
  Shield,
  BookOpen,
  CheckCircle,
  XCircle,
  Calculator,
  Target,
  ChevronDown,
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

const PFCCalculator = () => {
  const config = CALCULATOR_CONFIG["protection"];

  const [activeTab, setActiveTab] = useState<"calculator" | "guidance">("calculator");
  const [voltage, setVoltage] = useState("230");
  const [systemType, setSystemType] = useState("");
  const [zeValue, setZeValue] = useState("");
  const [r1r2Value, setR1r2Value] = useState("");
  const [showGuidance, setShowGuidance] = useState(false);
  const [showStandards, setShowStandards] = useState(false);
  const [result, setResult] = useState<{
    pfcValue: number;
    assessmentLevel: string;
    recommendations: string[];
    breakingCapacity: string;
    zsTotal: number;
  } | null>(null);

  const systemTypeOptions = [
    { value: "single-phase", label: "Single Phase (230V)" },
    { value: "three-phase", label: "Three Phase (400V)" },
  ];

  const calculatePFC = () => {
    if (!voltage || !zeValue || !r1r2Value || !systemType) {
      return;
    }

    const supplyVoltage = parseFloat(voltage);
    const ze = parseFloat(zeValue);
    const r1r2 = parseFloat(r1r2Value);

    // Calculate fault loop impedance
    const zs = ze + r1r2;

    // Calculate PFC using Ohm's law
    // For earth fault loop impedance, we use phase voltage (Uo = 230V)
    // regardless of single-phase or three-phase, as the fault path is phase-to-earth
    const phaseVoltage = systemType === "three-phase" ? 230 : supplyVoltage;
    const pfcValue = phaseVoltage / zs;

    // Assess the PFC level and provide recommendations
    let assessmentLevel: string;
    let recommendations: string[];
    let breakingCapacity: string;

    if (pfcValue < 1000) {
      assessmentLevel = "Low";
      recommendations = [
        "PFC is relatively low - standard MCBs should be adequate",
        "Check if protective device will operate within required time",
        "Consider cable sizing and length factors",
      ];
      breakingCapacity = "6kA MCBs typically adequate";
    } else if (pfcValue < 6000) {
      assessmentLevel = "Medium";
      recommendations = [
        "Moderate PFC - ensure MCBs have adequate breaking capacity",
        "Standard 6kA MCBs should be sufficient",
        "Check manufacturer specifications for exact requirements",
      ];
      breakingCapacity = "6kA MCBs recommended";
    } else if (pfcValue < 10000) {
      assessmentLevel = "High";
      recommendations = [
        "High PFC - use MCBs with higher breaking capacity",
        "Consider 10kA or higher rated protective devices",
        "Additional protection coordination may be required",
      ];
      breakingCapacity = "10kA MCBs required";
    } else {
      assessmentLevel = "Very High";
      recommendations = [
        "Very high PFC - specialist equipment required",
        "Use MCBs with 16kA or higher breaking capacity",
        "Consider current limiting devices",
        "Professional assessment recommended",
      ];
      breakingCapacity = "16kA or higher MCBs required";
    }

    setResult({
      pfcValue,
      assessmentLevel,
      recommendations,
      breakingCapacity,
      zsTotal: zs,
    });
  };

  const resetCalculator = () => {
    setVoltage("230");
    setSystemType("");
    setZeValue("");
    setR1r2Value("");
    setResult(null);
  };

  const isValid = systemType && zeValue && r1r2Value;

  const getAssessmentColor = (level: string) => {
    switch (level) {
      case "Low":
        return "text-green-400 border-green-500/30 bg-green-500/10";
      case "Medium":
        return "text-blue-400 border-blue-500/30 bg-blue-500/10";
      case "High":
        return "text-orange-400 border-orange-500/30 bg-orange-500/10";
      case "Very High":
        return "text-red-400 border-red-500/30 bg-red-500/10";
      default:
        return "text-white/60 border-white/10 bg-white/5";
    }
  };

  const tabs = [
    { key: "calculator" as const, label: "Calculator" },
    { key: "guidance" as const, label: "Guidance" },
  ];

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="protection"
        title="Prospective Fault Current Calculator"
        description="Calculate prospective fault current and assess protective device requirements"
        badge="BS 7671"
      >
        {/* Tab Navigation */}
        <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex-1 h-10 rounded-lg text-sm font-medium transition-all touch-manipulation",
                activeTab === tab.key
                  ? "text-black"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              )}
              style={
                activeTab === tab.key
                  ? {
                      background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                    }
                  : undefined
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Calculator Tab */}
        {activeTab === "calculator" && (
          <div className="space-y-4">
            {/* System Parameters Header */}
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-orange-400" />
              <span className="text-sm font-medium text-white/80">System Parameters</span>
            </div>

            <CalculatorSelect
              label="System Type"
              value={systemType}
              onChange={setSystemType}
              options={systemTypeOptions}
              placeholder="Select system type"
            />

            <CalculatorInput
              label="Supply Voltage"
              unit="V"
              type="text"
              inputMode="decimal"
              value={voltage}
              onChange={setVoltage}
              placeholder="e.g., 230"
            />

            <CalculatorInput
              label="Ze - External Loop Impedance"
              unit="Ω"
              type="text"
              inputMode="decimal"
              value={zeValue}
              onChange={setZeValue}
              placeholder="e.g., 0.35"
              hint="External earth loop impedance (supply authority)"
            />

            <CalculatorInput
              label="R1+R2 - Circuit Impedance"
              unit="Ω"
              type="text"
              inputMode="decimal"
              value={r1r2Value}
              onChange={setR1r2Value}
              placeholder="e.g., 0.15"
              hint="Circuit conductor resistance (line + protective)"
            />

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={calculatePFC}
                disabled={!isValid}
                className={cn(
                  "flex-1 h-14 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all touch-manipulation",
                  isValid
                    ? "text-black"
                    : "bg-white/10 text-white/30 cursor-not-allowed"
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
                Calculate PFC
              </button>
              <button
                onClick={resetCalculator}
                className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-colors touch-manipulation"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Guidance Tab */}
        {activeTab === "guidance" && (
          <div className="space-y-4">
            {/* Understanding PFC */}
            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-4 w-4 text-orange-400" />
                <span className="font-medium text-orange-300">Understanding PFC</span>
              </div>
              <p className="text-sm text-orange-200/80 mb-3">
                Prospective Fault Current is the maximum current that would flow during a fault
                with negligible impedance. It's essential for determining protective device
                ratings.
              </p>
              <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 font-mono text-sm">
                <p className="text-orange-300 font-bold text-center">PFC = U₀ / Zs</p>
                <div className="mt-2 space-y-1 text-xs text-orange-200/70">
                  <p>U₀ = Nominal voltage to earth (230V)</p>
                  <p>Zs = Earth fault loop impedance (Ze + R1 + R2)</p>
                </div>
              </div>
            </div>

            {/* Measurement Guide */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-blue-400" />
                  <span className="font-medium text-blue-300 text-sm">Ze Measurement</span>
                </div>
                <ul className="space-y-1 text-xs text-blue-200/80">
                  <li>• At main earthing terminal</li>
                  <li>• Installation isolated</li>
                  <li>• Use loop tester</li>
                  <li>• Record highest value</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-purple-400" />
                  <span className="font-medium text-purple-300 text-sm">R1+R2 Measurement</span>
                </div>
                <ul className="space-y-1 text-xs text-purple-200/80">
                  <li>• End-to-end during dead test</li>
                  <li>• Link at furthest point</li>
                  <li>• Test between line & cpc</li>
                  <li>• Apply temp correction</li>
                </ul>
              </div>
            </div>

            {/* Breaking Capacity Guide */}
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-4 w-4 text-blue-400" />
                <span className="font-medium text-blue-300">Breaking Capacity Requirements</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-green-300 font-medium text-xs">Up to 1kA</p>
                  <p className="text-green-200/70 text-xs">3-6kA MCB • Domestic</p>
                </div>
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p className="text-blue-300 font-medium text-xs">1kA - 6kA</p>
                  <p className="text-blue-200/70 text-xs">6kA MCB • Most installations</p>
                </div>
                <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <p className="text-orange-300 font-medium text-xs">6kA - 10kA</p>
                  <p className="text-orange-200/70 text-xs">10kA MCB • Industrial</p>
                </div>
                <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-red-300 font-medium text-xs">Above 10kA</p>
                  <p className="text-red-200/70 text-xs">16kA+ • High fault areas</p>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <span className="font-medium text-amber-300">Important Considerations</span>
              </div>
              <ul className="space-y-1 text-sm text-amber-200/80">
                <li>• Account for voltage tolerance (±6% in UK)</li>
                <li>• Consider temperature effects on conductor resistance</li>
                <li>• Parallel earth paths may reduce actual fault current</li>
                <li>• Supply impedance can vary with network conditions</li>
              </ul>
            </div>

            {/* BS 7671 References */}
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-4 w-4 text-blue-400" />
                <span className="font-medium text-blue-300">BS 7671 Requirements</span>
              </div>
              <div className="space-y-2 text-sm text-blue-200/80">
                <p>
                  <strong className="text-blue-300">Reg 434.5.2:</strong> PFC must be determined
                  at every relevant point
                </p>
                <p>
                  <strong className="text-blue-300">Reg 411.3.2:</strong> Maximum disconnection
                  times must be verified
                </p>
                <p>
                  <strong className="text-blue-300">Section 612:</strong> Initial verification
                  must include PFC verification
                </p>
              </div>
            </div>
          </div>
        )}
      </CalculatorCard>

      {/* Results Section */}
      {result && activeTab === "calculator" && (
        <div className="space-y-4 animate-fade-in">
          <CalculatorResult category="protection">
            {/* Assessment Badge */}
            <div className="flex items-center justify-center gap-3 pb-4 border-b border-white/10">
              <div
                className={cn(
                  "px-3 py-1 rounded-full border font-medium text-sm",
                  getAssessmentColor(result.assessmentLevel)
                )}
              >
                {result.assessmentLevel} PFC Level
              </div>
              {result.assessmentLevel === "Low" ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : result.assessmentLevel === "Very High" ? (
                <XCircle className="h-5 w-5 text-red-400" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-400" />
              )}
            </div>

            {/* Main Results */}
            <div className="py-4 border-b border-white/10">
              <ResultsGrid columns={2}>
                <ResultValue
                  label="Zs (Total Impedance)"
                  value={result.zsTotal.toFixed(3)}
                  unit="Ω"
                  category="protection"
                  size="sm"
                />
                <ResultValue
                  label="Breaking Capacity"
                  value={result.breakingCapacity.replace(" MCBs required", "").replace(" MCBs recommended", "").replace(" MCBs typically adequate", "")}
                  category="protection"
                  size="sm"
                />
              </ResultsGrid>

              <div className="text-center mt-4">
                <p className="text-sm text-white/60 mb-1">Prospective Fault Current</p>
                <div
                  className="text-4xl font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }}
                >
                  {result.pfcValue.toFixed(0)} A
                </div>
                <p className="text-sm text-white/80 mt-1">
                  ({(result.pfcValue / 1000).toFixed(2)} kA)
                </p>
              </div>
            </div>

            {/* Safety Margin */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-orange-400" />
                <span className="font-medium text-white/80 text-sm">Safety Margin Analysis</span>
              </div>
              <p className="text-sm text-white/60">
                {result.pfcValue < 6000
                  ? "Adequate safety margin with standard equipment."
                  : result.pfcValue < 10000
                  ? "Moderate margin - ensure correct equipment specification."
                  : "High current level - specialist assessment recommended."}
              </p>
            </div>

            {/* Recommendations */}
            <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
              <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/15 transition-colors mt-4">
                <div className="flex items-center gap-3">
                  <Target className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-300">
                    Recommendations ({result.recommendations.length})
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-white/70 transition-transform duration-200",
                    showGuidance && "rotate-180"
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3">
                <div className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20"
                    >
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span className="text-sm text-blue-200/80">{rec}</span>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CalculatorResult>

          {/* Why This Matters */}
          <Collapsible open={showStandards} onOpenChange={setShowStandards}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: "#fbbf2415" }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">
                    Why PFC Matters
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-white/70 transition-transform duration-200",
                    showStandards && "rotate-180"
                  )}
                />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <ul className="space-y-2 text-sm text-amber-200/80">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    Ensures protective devices can safely interrupt fault currents without damage
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    Prevents dangerous arcing and fire risk during fault conditions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    Critical for person protection - affects automatic disconnection times
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    Required for equipment specification and installation compliance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    Determines earthing and bonding arrangement adequacy
                  </li>
                </ul>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Quick Reference */}
      {!result && activeTab === "calculator" && (
        <Collapsible>
          <div className="calculator-card overflow-hidden" style={{ borderColor: "#fbbf2415" }}>
            <CollapsibleTrigger className="agent-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-amber-400" />
                <span className="text-sm sm:text-base font-medium text-amber-300">
                  Quick Reference
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-white/70 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>

            <CollapsibleContent className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">Typical Ze Values</p>
                  <p className="text-amber-200/70">TN-C-S: 0.35Ω max</p>
                  <p className="text-amber-200/70">TN-S: 0.8Ω max</p>
                  <p className="text-amber-200/70">TT: Check with DNO</p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">Common Breaking Caps</p>
                  <p className="text-amber-200/70">Domestic: 6kA</p>
                  <p className="text-amber-200/70">Commercial: 10kA</p>
                  <p className="text-amber-200/70">Industrial: 16kA+</p>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      )}
    </div>
  );
};

export default PFCCalculator;
