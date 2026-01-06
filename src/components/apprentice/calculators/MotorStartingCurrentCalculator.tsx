import { useState } from "react";
import {
  Zap,
  Calculator,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Info,
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
  CalculatorInput,
  CalculatorSelect,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";
import {
  calculateMotorStarting,
  MotorStartingInputs,
} from "@/lib/calculators/engines/motorStartingEngine";

const MotorStartingCurrentCalculator = () => {
  const config = CALCULATOR_CONFIG["power"];

  const [power, setPower] = useState<string>("");
  const [voltage, setVoltage] = useState<string>("400");
  const [efficiency, setEfficiency] = useState<string>("0.85");
  const [powerFactor, setPowerFactor] = useState<string>("0.85");
  const [startingMethod, setStartingMethod] = useState<string>("direct");
  const [phases, setPhases] = useState<string>("3");
  const [loadType, setLoadType] = useState<string>("standard");
  const [serviceTemperature, setServiceTemperature] = useState<string>("40");
  const [ratedCurrent, setRatedCurrent] = useState<string>("");
  const [startingTime, setStartingTime] = useState<string>("2");
  const [cableLength, setCableLength] = useState<string>("50");
  const [cableSize, setCableSize] = useState<string>("2.5");
  const [breakerRating, setBreakerRating] = useState<string>("");
  const [supplyImpedance, setSupplyImpedance] = useState<string>("0.1");
  const [installationMethod, setInstallationMethod] = useState<string>("clipped");
  const [groupingFactor, setGroupingFactor] = useState<string>("1.0");

  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [showInstallation, setShowInstallation] = useState(false);

  const [result, setResult] = useState<{
    fullLoadCurrent: number;
    startingCurrent: number;
    startingMultiplier: number;
    startingKva: number;
    thermalStress: number;
    protectionRecommendation: string;
    voltageDropRunning: number;
    voltageDropStarting: number;
    complianceStatus: string;
    recommendedCableSize: string;
    minimumCableSize: number;
    cableAnalysis: string;
    currentCapacityCheck: string;
    protectionAnalysis: string;
    whatThisMeans: string[];
    practicalGuidance: string[];
    recommendations: string[];
    warnings: string[];
    bs7671Compliant: boolean;
  } | null>(null);

  const calculateStartingCurrent = () => {
    const P = parseFloat(power);
    const V = parseFloat(voltage);
    const eff = parseFloat(efficiency);
    const pf = parseFloat(powerFactor);
    const temp = parseFloat(serviceTemperature);
    const cableLen = parseFloat(cableLength);
    const cableCsa = parseFloat(cableSize);
    const startTime = parseFloat(startingTime);
    const impedance = parseFloat(supplyImpedance);
    const grouping = parseFloat(groupingFactor);

    if (P > 0 && V > 0 && eff > 0 && pf > 0) {
      const inputs: MotorStartingInputs = {
        powerKw: P,
        voltage: V,
        phases: phases === "3" ? 3 : 1,
        efficiency: eff,
        powerFactor: pf,
        startingMethod: startingMethod as any,
        loadType: loadType as any,
        ambientTemp: temp,
        cableLength: cableLen,
        installationMethod: installationMethod as any,
        groupingFactor: grouping,
        ratedCurrent: ratedCurrent ? parseFloat(ratedCurrent) : undefined,
        startingTime: startTime,
        supplyImpedance: impedance,
      };

      const engineResult = calculateMotorStarting(inputs);

      const fullLoadCurrent = engineResult.fullLoadCurrent;
      const startingCurrent = engineResult.startingCurrent;
      const startingMultiplier = engineResult.startingMultiplier;
      const startingKva = engineResult.startingKva;
      const thermalStress = engineResult.thermalStress;

      const recommendedCableSize = `${engineResult.recommendedCableSize}mm²`;
      const minimumCableSize = engineResult.minimumCableSize;

      let cableAnalysis = "Cable sizing meets BS 7671 requirements";
      if (engineResult.recommendedCableSize > engineResult.minimumCableSize) {
        cableAnalysis = `Upgrade from ${minimumCableSize}mm² to ${engineResult.recommendedCableSize}mm² required for voltage drop compliance`;
      } else if (
        engineResult.voltageDropRunning < 1.5 &&
        engineResult.minimumCableSize > 2.5
      ) {
        cableAnalysis = `Current cable size is adequate with ${engineResult.voltageDropRunning.toFixed(1)}% voltage drop`;
      }

      const currentCapacityCheck = engineResult.currentCarryingCheck.suitable
        ? `Cable capacity: ${engineResult.currentCarryingCheck.capacity.toFixed(0)}A (Required: ${engineResult.currentCarryingCheck.required.toFixed(0)}A) ✓`
        : `Cable capacity insufficient: ${engineResult.currentCarryingCheck.capacity.toFixed(0)}A < ${engineResult.currentCarryingCheck.required.toFixed(0)}A`;

      const protectionAnalysis = engineResult.protectionSuitable
        ? `${engineResult.recommendedMcbRating}A ${engineResult.protectionType.toUpperCase()} suitable for motor protection`
        : `${engineResult.recommendedMcbRating}A protection may be unsuitable - verify coordination`;

      let complianceStatus = "BS 7671 Compliant";
      if (!engineResult.bs7671Compliant) {
        if (!engineResult.voltageDropCompliant) {
          complianceStatus = "Non-compliant - voltage drop exceeds limits";
        } else if (!engineResult.currentCarryingCheck.suitable) {
          complianceStatus = "Non-compliant - cable undersized";
        } else {
          complianceStatus = "Review required for full compliance";
        }
      }

      if (startingMethod === "direct" && P > 11) {
        complianceStatus = "Consider reduced starting method (BS 7671 recommendation)";
      }

      const whatThisMeans: string[] = [
        `Full load current: ${fullLoadCurrent.toFixed(1)}A (normal running current per BS 7671)`,
        `Starting current: ${startingCurrent.toFixed(0)}A (${startingMultiplier.toFixed(1)}x full load current)`,
        `Supply demand: ${startingKva.toFixed(1)}kVA during motor starting`,
        `Running voltage drop: ${engineResult.voltageDropRunning.toFixed(1)}% (limit: 3%)`,
        `Starting voltage drop: ${engineResult.voltageDropStarting.toFixed(1)}% (limit: 10%)`,
      ];

      const practicalGuidance: string[] = [
        "Install motor starter close to distribution board to minimise cable runs",
        "Use thermally protected motor starter for overload protection",
        startingMethod === "direct"
          ? "Direct starting suitable for motors <11kW only"
          : "Reduced starting method reduces supply impact",
        "Regular testing of motor protection devices is required",
        `Use ${engineResult.protectionType.includes("c") ? "Type C" : "Type D"} MCB for motor loads`,
      ];

      const allRecommendations = [
        ...engineResult.recommendations,
        ...engineResult.notes,
      ];

      setResult({
        fullLoadCurrent,
        startingCurrent,
        startingMultiplier,
        startingKva,
        thermalStress,
        protectionRecommendation: protectionAnalysis,
        voltageDropRunning: engineResult.voltageDropRunning,
        voltageDropStarting: engineResult.voltageDropStarting,
        complianceStatus,
        recommendedCableSize,
        minimumCableSize,
        cableAnalysis,
        currentCapacityCheck,
        protectionAnalysis,
        whatThisMeans,
        practicalGuidance,
        recommendations:
          allRecommendations.length > 0
            ? allRecommendations
            : ["Motor installation meets BS 7671 requirements"],
        warnings: engineResult.warnings,
        bs7671Compliant: engineResult.bs7671Compliant,
      });
    }
  };

  const reset = () => {
    setPower("");
    setVoltage("400");
    setEfficiency("0.85");
    setPowerFactor("0.85");
    setStartingMethod("direct");
    setPhases("3");
    setLoadType("standard");
    setServiceTemperature("40");
    setRatedCurrent("");
    setStartingTime("2");
    setCableLength("50");
    setCableSize("2.5");
    setBreakerRating("");
    setSupplyImpedance("0.1");
    setInstallationMethod("clipped");
    setGroupingFactor("1.0");
    setResult(null);
  };

  const isValid = parseFloat(power) > 0;

  const voltageOptions = [
    { value: "230", label: "230V (Single Phase)" },
    { value: "400", label: "400V (3-Phase)" },
    { value: "415", label: "415V (3-Phase)" },
    { value: "690", label: "690V (3-Phase)" },
  ];

  const phaseOptions = [
    { value: "1", label: "Single Phase" },
    { value: "3", label: "Three Phase" },
  ];

  const startingMethodOptions = [
    { value: "direct", label: "Direct On Line (DOL)" },
    { value: "star-delta", label: "Star-Delta" },
    { value: "soft-starter", label: "Soft Starter" },
    { value: "vfd", label: "Variable Frequency Drive" },
    { value: "autotransformer", label: "Auto-transformer" },
  ];

  const loadTypeOptions = [
    { value: "standard", label: "Standard Load" },
    { value: "high-torque", label: "High Torque (Conveyors)" },
    { value: "low-torque", label: "Low Torque (Fans)" },
    { value: "centrifugal", label: "Centrifugal Pumps" },
  ];

  const installationMethodOptions = [
    { value: "clipped", label: "Clipped Direct" },
    { value: "conduit", label: "In Conduit" },
    { value: "trunking", label: "In Trunking" },
    { value: "underground", label: "Underground" },
    { value: "tray", label: "Cable Tray" },
  ];

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="power"
        title="Motor Starting Current Calculator"
        description="Calculate starting current, cable sizing, and protection for motors per BS 7671"
        badge="Motors"
      >
        {/* Motor Details Section */}
        <div className="flex items-center gap-2 mb-3">
          <Zap className="h-4 w-4 text-amber-400" />
          <span className="text-sm font-medium text-white/80">Motor Details</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Motor Power"
            unit="kW"
            type="text"
            inputMode="decimal"
            value={power}
            onChange={setPower}
            placeholder="e.g., 15"
            hint="Rated motor power from nameplate"
          />

          <CalculatorInput
            label="Rated Current"
            unit="A"
            type="text"
            inputMode="decimal"
            value={ratedCurrent}
            onChange={setRatedCurrent}
            placeholder="Optional"
            hint="Nameplate current if known"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorSelect
            label="Supply Voltage"
            value={voltage}
            onChange={setVoltage}
            options={voltageOptions}
          />

          <CalculatorSelect
            label="Phases"
            value={phases}
            onChange={setPhases}
            options={phaseOptions}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Efficiency"
            type="text"
            inputMode="decimal"
            value={efficiency}
            onChange={setEfficiency}
            placeholder="e.g., 0.85"
            hint="IE3: 0.85, IE4: 0.90"
          />

          <CalculatorInput
            label="Power Factor"
            type="text"
            inputMode="decimal"
            value={powerFactor}
            onChange={setPowerFactor}
            placeholder="e.g., 0.85"
            hint="Typical: 0.8-0.9"
          />
        </div>

        {/* Starting & Protection Section */}
        <div className="h-px bg-white/10 my-4" />
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="h-4 w-4 text-amber-400" />
          <span className="text-sm font-medium text-white/80">Starting & Protection</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorSelect
            label="Starting Method"
            value={startingMethod}
            onChange={setStartingMethod}
            options={startingMethodOptions}
          />

          <CalculatorSelect
            label="Load Type"
            value={loadType}
            onChange={setLoadType}
            options={loadTypeOptions}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Starting Time"
            unit="sec"
            type="text"
            inputMode="decimal"
            value={startingTime}
            onChange={setStartingTime}
            placeholder="e.g., 2"
            hint="Time to reach full speed"
          />

          <CalculatorInput
            label="MCB Rating"
            unit="A"
            type="text"
            inputMode="decimal"
            value={breakerRating}
            onChange={setBreakerRating}
            placeholder="Optional"
            hint="Proposed breaker rating"
          />
        </div>

        {/* Installation Details - Collapsible */}
        <Collapsible open={showInstallation} onOpenChange={setShowInstallation}>
          <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium text-white/80">Installation Details</span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-white/70 transition-transform duration-200",
                showInstallation && "rotate-180"
              )}
            />
          </CollapsibleTrigger>

          <CollapsibleContent className="pt-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <CalculatorInput
                label="Cable Length"
                unit="m"
                type="text"
                inputMode="decimal"
                value={cableLength}
                onChange={setCableLength}
                placeholder="e.g., 50"
                hint="Distance from DB"
              />

              <CalculatorInput
                label="Cable Size"
                unit="mm²"
                type="text"
                inputMode="decimal"
                value={cableSize}
                onChange={setCableSize}
                placeholder="e.g., 2.5"
                hint="Proposed cable CSA"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <CalculatorInput
                label="Ambient Temp"
                unit="°C"
                type="text"
                inputMode="decimal"
                value={serviceTemperature}
                onChange={setServiceTemperature}
                placeholder="e.g., 40"
              />

              <CalculatorInput
                label="Supply Impedance"
                unit="Ω"
                type="text"
                inputMode="decimal"
                value={supplyImpedance}
                onChange={setSupplyImpedance}
                placeholder="e.g., 0.1"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <CalculatorSelect
                label="Installation Method"
                value={installationMethod}
                onChange={setInstallationMethod}
                options={installationMethodOptions}
              />

              <CalculatorInput
                label="Grouping Factor"
                type="text"
                inputMode="decimal"
                value={groupingFactor}
                onChange={setGroupingFactor}
                placeholder="e.g., 1.0"
                hint="Derating for grouped cables"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={calculateStartingCurrent}
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
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Compliance Status */}
          <div
            className={cn(
              "flex items-center gap-2 p-3 rounded-xl border",
              result.bs7671Compliant
                ? "border-green-500/30 bg-green-500/10"
                : "border-amber-500/30 bg-amber-500/10"
            )}
          >
            {result.bs7671Compliant ? (
              <CheckCircle2 className="h-5 w-5 text-green-400" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-amber-400" />
            )}
            <span
              className={cn(
                "font-medium text-sm",
                result.bs7671Compliant ? "text-green-400" : "text-amber-400"
              )}
            >
              {result.complianceStatus}
            </span>
          </div>

          {/* Key Results */}
          <CalculatorResult category="power">
            <div className="text-center pb-4 border-b border-white/10">
              <p className="text-sm text-white/60 mb-1">Full Load Current</p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {result.fullLoadCurrent.toFixed(1)} A
              </div>
            </div>

            <ResultsGrid columns={3}>
              <ResultValue
                label="Starting Current"
                value={result.startingCurrent.toFixed(0)}
                unit="A"
                category="power"
                size="sm"
              />
              <ResultValue
                label="Start Multiplier"
                value={`${result.startingMultiplier.toFixed(1)}x`}
                category="power"
                size="sm"
              />
              <ResultValue
                label="Running VD"
                value={result.voltageDropRunning.toFixed(1)}
                unit="%"
                category="power"
                size="sm"
              />
            </ResultsGrid>

            <div className="h-px bg-white/10 my-4" />

            <ResultsGrid columns={2}>
              <ResultValue
                label="Starting kVA"
                value={result.startingKva.toFixed(1)}
                unit="kVA"
                category="power"
                size="sm"
              />
              <ResultValue
                label="Starting VD"
                value={result.voltageDropStarting.toFixed(1)}
                unit="%"
                category="power"
                size="sm"
              />
              <ResultValue
                label="I²t Thermal"
                value={(result.thermalStress / 1000).toFixed(1)}
                unit="kA²s"
                category="power"
                size="sm"
              />
              <ResultValue
                label="Min Cable"
                value={result.minimumCableSize.toString()}
                unit="mm²"
                category="power"
                size="sm"
              />
            </ResultsGrid>
          </CalculatorResult>

          {/* Cable Recommendation */}
          <div className="p-4 rounded-xl border border-amber-400/20 bg-amber-400/5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-amber-400 rounded-full" />
              <span className="font-medium text-amber-300">Cable Size Recommendation</span>
            </div>
            <div className="text-center mb-3">
              <div
                className="text-3xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {result.recommendedCableSize}
              </div>
              <p className="text-sm text-white/80 mt-1">Recommended Cable Size</p>
            </div>
            <p className="text-sm text-white/60 text-center">{result.cableAnalysis}</p>
          </div>

          {/* Analysis Cards */}
          <div className="grid grid-cols-1 gap-3">
            <div className="p-3 rounded-xl border border-blue-400/20 bg-blue-400/5">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-300">Current Carrying Capacity</p>
                  <p className="text-sm text-blue-200/70 mt-1">{result.currentCapacityCheck}</p>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-purple-400/20 bg-purple-400/5">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-purple-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-purple-300">Protection Device</p>
                  <p className="text-sm text-purple-200/70 mt-1">{result.protectionAnalysis}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <div className="p-3 rounded-xl border border-red-400/20 bg-red-400/5">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-300">Warnings</p>
                  <ul className="mt-2 space-y-1">
                    {result.warnings.map((warning, index) => (
                      <li key={index} className="text-sm text-red-200/70 flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

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
                    What This Means
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-white/70 transition-transform duration-200",
                    showGuidance && "rotate-180"
                  )}
                />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <ul className="space-y-2">
                  {result.whatThisMeans.map((point, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-blue-200/80 flex items-start gap-2"
                    >
                      <span className="text-blue-400 mt-1">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Practical Guidance */}
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-4 w-4 text-amber-400" />
              <span className="font-medium text-amber-300">Practical Guidance</span>
            </div>
            <ul className="space-y-2">
              {result.practicalGuidance.map((guidance, index) => (
                <li key={index} className="text-sm text-white/70 flex items-start gap-2">
                  <span className="text-amber-400 mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>{guidance}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-4 w-4 text-amber-400" />
              <span className="font-medium text-amber-300">BS 7671 Recommendations</span>
            </div>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-white/70 flex items-start gap-2">
                  <span className="text-amber-400 mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Calculation Notes */}
          <div className="text-xs text-white/70 pt-2 space-y-1">
            <p>
              <strong className="text-white/80">Calculation:</strong> I = P / (
              {phases === "3" ? "√3 × " : ""}V × η × cos φ)
            </p>
            <p>
              <strong className="text-white/80">Voltage Drop:</strong> VD = I × Z × 100 / V
            </p>
            <p>
              <strong className="text-white/80">I²t:</strong> Thermal stress = I² × t
            </p>
          </div>
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
                Motor Starting Reference
              </span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-white/70 transition-transform duration-200",
                showReference && "rotate-180"
              )}
            />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 pt-0">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Starting Multipliers</p>
                <p className="text-amber-200/70">DOL: 6-8× FLC</p>
                <p className="text-amber-200/70">Star-Delta: 2-3× FLC</p>
                <p className="text-amber-200/70">Soft Start: 2-4× FLC</p>
                <p className="text-amber-200/70">VFD: 1-2× FLC</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Protection Types</p>
                <p className="text-amber-200/70">Type C: 5-10× In</p>
                <p className="text-amber-200/70">Type D: 10-20× In</p>
                <p className="text-amber-200/70">Contactor + OL: Best</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Voltage Drop Limits</p>
                <p className="text-amber-200/70">Running: 3% max</p>
                <p className="text-amber-200/70">Starting: 10% max</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">BS 7671 Notes</p>
                <p className="text-amber-200/70">DOL: ≤11kW recommended</p>
                <p className="text-amber-200/70">Type D MCB for motors</p>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default MotorStartingCurrentCalculator;
