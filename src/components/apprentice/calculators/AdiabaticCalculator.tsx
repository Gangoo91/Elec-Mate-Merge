import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Shield, Info, CheckCircle, AlertTriangle, BookOpen, Lightbulb, ChevronDown, Zap, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorResult,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const STANDARD_SIZES = [1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400];

const K_FACTORS: Record<string, Record<number, number>> = {
  copper: { 60: 103, 70: 115, 90: 143 },
  aluminium: { 60: 65, 70: 76, 90: 94 },
  steel: { 60: 46, 70: 50, 90: 50 },
};

const modeOptions = [
  { value: "current", label: "Enter Fault Current (I)" },
  { value: "zs", label: "Calculate I from Zs" },
];

const timePresetOptions = [
  { value: "0.1", label: "0.1 s" },
  { value: "0.2", label: "0.2 s" },
  { value: "0.4", label: "0.4 s" },
  { value: "1", label: "1 s" },
  { value: "5", label: "5 s" },
  { value: "custom", label: "Custom" },
];

const materialOptions = [
  { value: "copper", label: "Copper" },
  { value: "aluminium", label: "Aluminium" },
  { value: "steel", label: "Steel" },
];

const tempOptions = [
  { value: "60", label: "60°C (Rubber/EPR)" },
  { value: "70", label: "70°C (PVC)" },
  { value: "90", label: "90°C (XLPE)" },
];

const AdiabaticCalculator = () => {
  const config = CALCULATOR_CONFIG['protection'];

  const [mode, setMode] = useState<"current" | "zs">("current");
  const [disconnectionTime, setDisconnectionTime] = useState<string>("");
  const [timePreset, setTimePreset] = useState<string>("custom");
  const [material, setMaterial] = useState<string>("copper");
  const [maxTemp, setMaxTemp] = useState<string>("70");
  const [customK, setCustomK] = useState<string>("");
  const [faultCurrent, setFaultCurrent] = useState<string>("");
  const [zs, setZs] = useState<string>("");
  const [voltage, setVoltage] = useState<string>("230");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [result, setResult] = useState<{
    minimumCsa: number;
    roundedCsa: number;
    k: number;
    usedFaultCurrent: number;
    disconnectionTime: number;
    material: string;
    maxTemp: string;
    isCompliant: boolean;
    complianceNotes: string[];
  } | null>(null);

  // Collapsible states
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showRegs, setShowRegs] = useState(false);

  const effectiveK = useMemo(() => {
    const kFromMap = K_FACTORS[material]?.[parseFloat(maxTemp)] ?? 115;
    const kCustom = parseFloat(customK);
    return Number.isFinite(kCustom) && kCustom > 0 ? kCustom : kFromMap;
  }, [material, maxTemp, customK]);

  const effectiveTime = useMemo(() => {
    if (timePreset !== "custom") return parseFloat(timePreset);
    const t = parseFloat(disconnectionTime);
    return Number.isFinite(t) && t > 0 ? t : NaN;
  }, [timePreset, disconnectionTime]);

  const computeFaultCurrent = useMemo(() => {
    if (mode === "current") {
      const I = parseFloat(faultCurrent);
      return Number.isFinite(I) && I > 0 ? I : NaN;
    }
    const z = parseFloat(zs);
    const v = parseFloat(voltage);
    if (!Number.isFinite(z) || z <= 0 || !Number.isFinite(v) || v <= 0) return NaN;
    return v / z;
  }, [mode, faultCurrent, zs, voltage]);

  function roundUpToStandard(size: number) {
    for (const s of STANDARD_SIZES) {
      if (size <= s) return s;
    }
    return STANDARD_SIZES[STANDARD_SIZES.length - 1];
  }

  const validateInputs = () => {
    const newErrors: Record<string, string> = {};

    if (mode === "current") {
      if (!faultCurrent || parseFloat(faultCurrent) <= 0) {
        newErrors.faultCurrent = "Fault current must be > 0";
      }
    } else {
      if (!zs || parseFloat(zs) <= 0) {
        newErrors.zs = "Zs must be > 0";
      }
      if (!voltage || parseFloat(voltage) <= 0) {
        newErrors.voltage = "Voltage must be > 0";
      }
    }

    if (timePreset === "custom" && (!disconnectionTime || parseFloat(disconnectionTime) <= 0)) {
      newErrors.disconnectionTime = "Time must be > 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateAdiabatic = () => {
    if (!validateInputs()) return;

    const I = computeFaultCurrent;
    const t = effectiveTime;
    const k = effectiveK;

    if (!Number.isFinite(I) || I <= 0 || !Number.isFinite(t) || t <= 0 || !Number.isFinite(k) || k <= 0) {
      setResult(null);
      return;
    }

    const minimumCsa = (I * Math.sqrt(t)) / k;
    const roundedCsa = roundUpToStandard(minimumCsa);

    const complianceNotes: string[] = [];
    let isCompliant = true;

    if (t > 5) {
      complianceNotes.push("Disconnection time >5s may require additional considerations per BS 7671");
      isCompliant = false;
    }

    if (I > 10000) {
      complianceNotes.push("Very high fault current - verify calculation method and protection coordination");
    }

    if (roundedCsa < 1.5) {
      complianceNotes.push("Minimum 1.5mm² generally required for fixed wiring per BS 7671");
    }

    setResult({
      minimumCsa,
      roundedCsa,
      k,
      usedFaultCurrent: I,
      disconnectionTime: t,
      material,
      maxTemp,
      isCompliant,
      complianceNotes
    });
  };

  const reset = () => {
    setMode("current");
    setFaultCurrent("");
    setZs("");
    setVoltage("230");
    setDisconnectionTime("");
    setTimePreset("custom");
    setMaterial("copper");
    setMaxTemp("70");
    setCustomK("");
    setResult(null);
    setErrors({});
  };

  const canCalculate = mode === "current" ? !!faultCurrent : (!!zs && !!voltage);

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="protection"
        title="Adiabatic Equation Calculator"
        description="Calculate minimum cable CSA to withstand fault current per BS 7671"
      >
        <CalculatorSelect
          label="Input Mode"
          value={mode}
          onChange={(v) => setMode(v as "current" | "zs")}
          options={modeOptions}
        />

        {mode === "current" ? (
          <CalculatorInput
            label="Prospective Fault Current (I)"
            unit="A"
            type="text"
            inputMode="decimal"
            value={faultCurrent}
            onChange={setFaultCurrent}
            placeholder="e.g., 1000"
            error={errors.faultCurrent}
            hint="Prospective fault current at connection point"
          />
        ) : (
          <div className="space-y-4">
            <CalculatorInputGrid columns={2}>
              <CalculatorInput
                label="Earth Fault Loop Impedance (Zs)"
                unit="Ω"
                type="text"
                inputMode="decimal"
                value={zs}
                onChange={setZs}
                placeholder="e.g., 0.35"
                error={errors.zs}
              />
              <CalculatorInput
                label="Supply Voltage (Uo)"
                unit="V"
                type="text"
                inputMode="decimal"
                value={voltage}
                onChange={setVoltage}
                placeholder="230"
                error={errors.voltage}
              />
            </CalculatorInputGrid>

            {Number.isFinite(computeFaultCurrent) && computeFaultCurrent > 0 && (
              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4 text-orange-400" />
                  <span className="text-white/70">Calculated fault current:</span>
                  <span className="font-mono font-bold text-orange-400">{computeFaultCurrent.toFixed(0)} A</span>
                </div>
              </div>
            )}
          </div>
        )}

        <CalculatorSelect
          label="Disconnection Time"
          value={timePreset}
          onChange={setTimePreset}
          options={timePresetOptions}
        />

        {timePreset === "custom" && (
          <CalculatorInput
            label="Custom Time (t)"
            unit="s"
            type="text"
            inputMode="decimal"
            value={disconnectionTime}
            onChange={setDisconnectionTime}
            placeholder="e.g., 0.4"
            error={errors.disconnectionTime}
          />
        )}

        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="Conductor Material"
            value={material}
            onChange={setMaterial}
            options={materialOptions}
          />
          <CalculatorSelect
            label="Insulation / Max Temp"
            value={maxTemp}
            onChange={setMaxTemp}
            options={tempOptions}
          />
        </CalculatorInputGrid>

        {/* Advanced Options */}
        <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
          <div
            className="rounded-xl border overflow-hidden"
            style={{ borderColor: `${config.gradientFrom}30`, background: `${config.gradientFrom}08` }}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4">
              <span className="text-sm font-medium text-white">Advanced Options</span>
              <ChevronDown className={cn(
                "h-4 w-4 text-white/40 transition-transform duration-200",
                showAdvanced && "rotate-180"
              )} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <CalculatorInput
                label="Custom k Factor (optional)"
                type="text"
                inputMode="decimal"
                value={customK}
                onChange={setCustomK}
                placeholder={`Default: ${effectiveK}`}
                hint="Override material-based k factor from BS 7671 Table 54.3"
              />
            </CollapsibleContent>
          </div>
        </Collapsible>

        <CalculatorActions
          category="protection"
          onCalculate={calculateAdiabatic}
          onReset={reset}
          isDisabled={!canCalculate}
        />
      </CalculatorCard>

      {/* Results */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          <CalculatorResult category="protection">
            <div className="text-center pb-3 border-b border-white/10">
              <div className="flex items-center justify-center gap-2 mb-2">
                {result.isCompliant ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                )}
                <p className="text-sm text-white/60">Adiabatic Calculation Results</p>
              </div>
              <Badge
                variant="outline"
                className="mb-2"
                style={{ borderColor: `${config.gradientFrom}50`, color: config.gradientFrom }}
              >
                {result.material.charAt(0).toUpperCase() + result.material.slice(1)} @ {result.maxTemp}°C (k={result.k})
              </Badge>
            </div>

            <ResultsGrid columns={2}>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-xs text-white/60 mb-1">Minimum CSA Required</p>
                <p className="text-2xl font-bold font-mono" style={{ color: config.gradientFrom }}>
                  {result.minimumCsa.toFixed(2)} mm²
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-xs text-white/60 mb-1">Standard Cable Size</p>
                <p className="text-2xl font-bold font-mono" style={{ color: config.gradientFrom }}>
                  {result.roundedCsa} mm²
                </p>
              </div>
            </ResultsGrid>

            <div className="pt-3 border-t border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4" style={{ color: config.gradientFrom }} />
                <span className="font-medium text-white text-sm">Calculation Details</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-white/60">Fault Current:</span>
                  <p className="font-mono" style={{ color: config.gradientFrom }}>{result.usedFaultCurrent.toFixed(0)} A</p>
                </div>
                <div>
                  <span className="text-white/60">Disconnection Time:</span>
                  <p className="font-mono" style={{ color: config.gradientFrom }}>{result.disconnectionTime} s</p>
                </div>
              </div>
              <div className="mt-3 p-2 rounded-lg bg-white/5 text-xs text-white/60">
                <span className="font-mono">S = I × √t / k = {result.usedFaultCurrent.toFixed(0)} × √{result.disconnectionTime} / {result.k} = {result.minimumCsa.toFixed(2)} mm²</span>
              </div>
            </div>

            {result.complianceNotes.length > 0 && (
              <div className={cn(
                "p-3 rounded-xl border",
                result.isCompliant ? "bg-amber-500/10 border-amber-500/30" : "bg-red-500/10 border-red-500/30"
              )}>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className={cn("h-4 w-4", result.isCompliant ? "text-amber-400" : "text-red-400")} />
                  <span className={cn("font-medium text-sm", result.isCompliant ? "text-amber-300" : "text-red-300")}>
                    Compliance Notes
                  </span>
                </div>
                <ul className="space-y-1">
                  {result.complianceNotes.map((note, index) => (
                    <li key={index} className={cn("text-xs flex items-start gap-2", result.isCompliant ? "text-amber-200" : "text-red-200")}>
                      <span className="w-1 h-1 rounded-full bg-current mt-1.5 shrink-0" />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.roundedCsa !== result.minimumCsa && (
              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium text-green-300">Safety Margin</span>
                </div>
                <p className="text-xs text-green-200">
                  The {result.roundedCsa}mm² cable provides a {((result.roundedCsa / result.minimumCsa - 1) * 100).toFixed(1)}% margin above minimum.
                </p>
              </div>
            )}
          </CalculatorResult>
        </div>
      )}

      {/* Why This Matters */}
      <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
        <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <Lightbulb className="h-4 w-4 text-blue-400" />
              <span className="text-sm sm:text-base font-medium text-blue-300">Why Adiabatic Calculations Matter</span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 text-white/40 transition-transform duration-200",
              showGuidance && "rotate-180"
            )} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-0 space-y-2 text-sm text-blue-200/80">
            <p>• Ensures cables can withstand fault currents without dangerous overheating</p>
            <p>• BS 7671 requires protective devices to operate within specific time limits</p>
            <p>• Undersized cables during fault conditions can cause fires</p>
            <p>• Mandatory for earthing conductor sizing and short-circuit protection</p>
            <p>• Proper sizing ensures compliance with UK electrical regulations</p>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* BS 7671 Requirements */}
      <Collapsible open={showRegs} onOpenChange={setShowRegs}>
        <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-amber-400" />
              <span className="text-sm sm:text-base font-medium text-amber-300">BS 7671 Requirements</span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 text-white/40 transition-transform duration-200",
              showRegs && "rotate-180"
            )} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-0 space-y-2 text-sm text-amber-200/80">
            <p><strong className="text-amber-300">Section 543:</strong> Earthing conductors must be sized using adiabatic equation</p>
            <p><strong className="text-amber-300">Table 54.3:</strong> k factors for different conductor materials and insulation</p>
            <p><strong className="text-amber-300">Regulation 411.3.2:</strong> Maximum disconnection times for automatic disconnection</p>
            <p><strong className="text-amber-300">Section 434:</strong> Protection against overcurrent in case of short-circuit</p>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Formula Reference */}
      <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
          <div className="text-sm text-orange-200">
            <p><strong>Adiabatic Equation:</strong> S = I × √t / k</p>
            <p className="text-xs mt-1">Where S = CSA (mm²), I = fault current (A), t = time (s), k = material factor</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdiabaticCalculator;
