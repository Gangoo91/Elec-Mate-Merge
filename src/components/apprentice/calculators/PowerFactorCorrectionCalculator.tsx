import { useState, useMemo } from "react";
import { Zap, Info, BookOpen, ChevronDown, PoundSterling, AlertTriangle, CheckCircle } from "lucide-react";
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
  CalculatorActions,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";

interface CorrectionResult {
  currentPF: number;
  targetPF: number;
  currentKW: number;
  currentKVA: number;
  currentKVAR: number;
  targetKVA: number;
  targetKVAR: number;
  requiredKVAR: number;
  currentSaved: number;
  percentageReduction: number;
  annualSavings: number;
  capacitorBankSize: number;
  stagesRecommended: number;
  warnings: string[];
}

// Standard capacitor bank sizes (kVAr)
const standardCapacitorSizes = [5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 100, 125, 150, 200, 250, 300, 400, 500];

const PowerFactorCorrectionCalculator = () => {
  const config = CALCULATOR_CONFIG['power'];

  // Inputs
  const [inputMethod, setInputMethod] = useState<"kw-pf" | "kva-kvar">("kw-pf");
  const [realPower, setRealPower] = useState<string>("");
  const [currentPowerFactor, setCurrentPowerFactor] = useState<string>("0.75");
  const [currentKVA, setCurrentKVA] = useState<string>("");
  const [currentKVAR, setCurrentKVAR] = useState<string>("");
  const [targetPowerFactor, setTargetPowerFactor] = useState<string>("0.95");
  const [supplyVoltage, setSupplyVoltage] = useState<string>("400");
  const [phases, setPhases] = useState<string>("3");
  const [electricityRate, setElectricityRate] = useState<string>("0.30");
  const [reactiveCharge, setReactiveCharge] = useState<string>("0.005");
  const [operatingHours, setOperatingHours] = useState<string>("2000");

  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const result = useMemo((): CorrectionResult | null => {
    let kW: number;
    let pfCurrent: number;
    let kVACurrent: number;
    let kVARCurrent: number;

    if (inputMethod === "kw-pf") {
      kW = parseFloat(realPower);
      pfCurrent = parseFloat(currentPowerFactor);
      if (!kW || !pfCurrent || pfCurrent <= 0 || pfCurrent > 1) return null;

      kVACurrent = kW / pfCurrent;
      kVARCurrent = Math.sqrt(Math.pow(kVACurrent, 2) - Math.pow(kW, 2));
    } else {
      kVACurrent = parseFloat(currentKVA);
      kVARCurrent = parseFloat(currentKVAR);
      if (!kVACurrent || !kVARCurrent) return null;

      kW = Math.sqrt(Math.pow(kVACurrent, 2) - Math.pow(kVARCurrent, 2));
      pfCurrent = kW / kVACurrent;
    }

    const pfTarget = parseFloat(targetPowerFactor);
    const voltage = parseFloat(supplyVoltage);
    const rate = parseFloat(electricityRate);
    const reactiveRate = parseFloat(reactiveCharge);
    const hours = parseFloat(operatingHours);

    if (!pfTarget || pfTarget <= pfCurrent || pfTarget > 1) return null;

    // Calculate target values
    const kVATarget = kW / pfTarget;
    const kVARTarget = Math.sqrt(Math.pow(kVATarget, 2) - Math.pow(kW, 2));

    // Required correction
    const kVARRequired = kVARCurrent - kVARTarget;

    // Current reduction (kVA reduction means current reduction at same voltage)
    const currentCurrent = kVACurrent * 1000 / (Math.sqrt(3) * voltage);
    const currentTarget = kVATarget * 1000 / (Math.sqrt(3) * voltage);
    const currentSaved = currentCurrent - currentTarget;
    const percentageReduction = ((kVACurrent - kVATarget) / kVACurrent) * 100;

    // Annual savings (simplified - reactive power charges)
    const reactiveEnergySaved = kVARRequired * hours;
    const annualSavings = reactiveEnergySaved * reactiveRate;

    // Select next standard capacitor size up
    const capacitorBankSize = standardCapacitorSizes.find(size => size >= kVARRequired) ||
      Math.ceil(kVARRequired / 50) * 50;

    // Recommend stages for large banks (typically 4-6 stages)
    let stagesRecommended = 1;
    if (capacitorBankSize > 100) stagesRecommended = Math.ceil(capacitorBankSize / 50);
    if (stagesRecommended > 6) stagesRecommended = 6;

    // Warnings
    const warnings: string[] = [];
    if (kVARRequired > 500) {
      warnings.push("Large correction required - consider staged automatic switching");
    }
    if (pfTarget > 0.98) {
      warnings.push("Very high target PF may cause leading power factor at light loads");
    }
    if (kW < 50 && kVARRequired > 20) {
      warnings.push("For small loads, verify cost-benefit of correction equipment");
    }

    return {
      currentPF: pfCurrent,
      targetPF: pfTarget,
      currentKW: kW,
      currentKVA: kVACurrent,
      currentKVAR: kVARCurrent,
      targetKVA: kVATarget,
      targetKVAR: kVARTarget,
      requiredKVAR: kVARRequired,
      currentSaved,
      percentageReduction,
      annualSavings,
      capacitorBankSize,
      stagesRecommended,
      warnings,
    };
  }, [inputMethod, realPower, currentPowerFactor, currentKVA, currentKVAR, targetPowerFactor, supplyVoltage, electricityRate, reactiveCharge, operatingHours]);

  const reset = () => {
    setInputMethod("kw-pf");
    setRealPower("");
    setCurrentPowerFactor("0.75");
    setCurrentKVA("");
    setCurrentKVAR("");
    setTargetPowerFactor("0.95");
    setSupplyVoltage("400");
    setPhases("3");
    setElectricityRate("0.30");
    setReactiveCharge("0.005");
    setOperatingHours("2000");
  };

  const hasValidInputs = () => {
    if (inputMethod === "kw-pf") {
      return realPower && currentPowerFactor && targetPowerFactor;
    }
    return currentKVA && currentKVAR && targetPowerFactor;
  };

  const inputMethodOptions = [
    { value: "kw-pf", label: "kW and Power Factor" },
    { value: "kva-kvar", label: "kVA and kVAR readings" },
  ];

  const targetPFOptions = [
    { value: "0.90", label: "0.90 (Minimum acceptable)" },
    { value: "0.92", label: "0.92 (Typical target)" },
    { value: "0.95", label: "0.95 (Recommended)" },
    { value: "0.97", label: "0.97 (Excellent)" },
    { value: "0.98", label: "0.98 (Near unity)" },
    { value: "1.00", label: "1.00 (Unity - theoretical)" },
  ];

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="power"
        title="Power Factor Correction"
        description="Calculate capacitor bank sizing for power factor improvement"
        badge="kVAr"
      >
        {/* Input Method */}
        <CalculatorSelect
          label="Input Method"
          value={inputMethod}
          onChange={(v) => setInputMethod(v as "kw-pf" | "kva-kvar")}
          options={inputMethodOptions}
        />

        {/* Inputs based on method */}
        {inputMethod === "kw-pf" ? (
          <>
            <CalculatorInput
              label="Real Power (kW)"
              unit="kW"
              type="text"
              inputMode="decimal"
              value={realPower}
              onChange={setRealPower}
              placeholder="e.g., 100"
              hint="From energy meter or load calculation"
            />
            <CalculatorInput
              label="Current Power Factor"
              type="text"
              inputMode="decimal"
              value={currentPowerFactor}
              onChange={setCurrentPowerFactor}
              placeholder="e.g., 0.75"
              hint="Lagging (typical industrial: 0.7-0.85)"
            />
          </>
        ) : (
          <>
            <CalculatorInput
              label="Apparent Power (kVA)"
              unit="kVA"
              type="text"
              inputMode="decimal"
              value={currentKVA}
              onChange={setCurrentKVA}
              placeholder="e.g., 133"
            />
            <CalculatorInput
              label="Reactive Power (kVAR)"
              unit="kVAR"
              type="text"
              inputMode="decimal"
              value={currentKVAR}
              onChange={setCurrentKVAR}
              placeholder="e.g., 88"
            />
          </>
        )}

        {/* Target PF */}
        <CalculatorSelect
          label="Target Power Factor"
          value={targetPowerFactor}
          onChange={setTargetPowerFactor}
          options={targetPFOptions}
        />

        {/* Optional: Cost analysis inputs */}
        <Collapsible>
          <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors touch-manipulation">
            <div className="flex items-center gap-2">
              <PoundSterling className="h-4 w-4 text-amber-400" />
              <span className="text-sm text-white/80">Cost Analysis (Optional)</span>
            </div>
            <ChevronDown className="h-4 w-4 text-white/70" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 p-3 mt-2 rounded-xl bg-white/5 border border-white/10">
            <div className="grid grid-cols-2 gap-3">
              <CalculatorInput
                label="Supply Voltage"
                unit="V"
                type="text"
                inputMode="decimal"
                value={supplyVoltage}
                onChange={setSupplyVoltage}
                placeholder="400"
              />
              <CalculatorInput
                label="Operating Hours"
                unit="hrs/yr"
                type="text"
                inputMode="numeric"
                value={operatingHours}
                onChange={setOperatingHours}
                placeholder="2000"
              />
            </div>
            <CalculatorInput
              label="Reactive Power Charge"
              unit="£/kVARh"
              type="text"
              inputMode="decimal"
              value={reactiveCharge}
              onChange={setReactiveCharge}
              placeholder="0.005"
              hint="Check your electricity bill for reactive charges"
            />
          </CollapsibleContent>
        </Collapsible>

        <CalculatorActions
          category="power"
          onCalculate={() => {}}
          onReset={reset}
          isDisabled={!hasValidInputs()}
          calculateLabel="Live Results Below"
        />
      </CalculatorCard>

      {/* Results */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          <CalculatorResult category="power">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-sm text-white/60">Capacitor Bank Required</span>
              <span className="text-sm font-medium text-green-400">
                {result.stagesRecommended > 1 ? `${result.stagesRecommended} stages` : "Fixed"}
              </span>
            </div>

            <div className="text-center py-4">
              <p className="text-sm text-white/60 mb-1">Required Correction</p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
              >
                {result.requiredKVAR.toFixed(1)} kVAR
              </div>
              <p className="text-sm text-white/80 mt-1">
                Nearest standard: {result.capacitorBankSize} kVAR
              </p>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue
                label="Current PF"
                value={result.currentPF.toFixed(2)}
                category="power"
                size="sm"
              />
              <ResultValue
                label="Target PF"
                value={result.targetPF.toFixed(2)}
                category="power"
                size="sm"
              />
              <ResultValue
                label="Current kVA"
                value={result.currentKVA.toFixed(1)}
                unit="kVA"
                category="power"
                size="sm"
              />
              <ResultValue
                label="Target kVA"
                value={result.targetKVA.toFixed(1)}
                unit="kVA"
                category="power"
                size="sm"
              />
            </ResultsGrid>

            {/* Savings */}
            <div className="pt-3 mt-3 border-t border-white/10">
              <p className="text-xs text-white/80 mb-2">Benefits</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-xs text-green-400/70">kVA Reduction</p>
                  <p className="text-sm font-semibold text-green-400">
                    {result.percentageReduction.toFixed(1)}%
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-xs text-green-400/70">Current Saved</p>
                  <p className="text-sm font-semibold text-green-400">
                    {result.currentSaved.toFixed(1)} A
                  </p>
                </div>
              </div>
              {result.annualSavings > 0 && (
                <div className="mt-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="text-xs text-amber-400/70">Estimated Annual Savings</p>
                  <p className="text-lg font-semibold text-amber-400">
                    £{result.annualSavings.toFixed(0)}/year
                  </p>
                </div>
              )}
            </div>
          </CalculatorResult>

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  {result.warnings.map((warning, idx) => (
                    <p key={idx} className="text-sm text-orange-200/80">{warning}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Specification */}
          <div className="calculator-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium text-white/80">Capacitor Bank Specification</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 rounded-lg bg-white/5">
                <span className="text-white/60">Total kVAR</span>
                <span className="text-white font-medium">{result.capacitorBankSize} kVAR</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-white/5">
                <span className="text-white/60">System Voltage</span>
                <span className="text-white font-medium">{supplyVoltage}V {phases === "3" ? "3-phase" : "1-phase"}</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-white/5">
                <span className="text-white/60">Switching</span>
                <span className="text-white font-medium">
                  {result.stagesRecommended === 1 ? "Fixed" : `Automatic ${result.stagesRecommended}-stage`}
                </span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-white/5">
                <span className="text-white/60">Detuning</span>
                <span className="text-white font-medium">7% reactor recommended</span>
              </div>
            </div>
          </div>

          {/* How It Worked Out */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">How It Worked Out</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/70 transition-transform duration-200",
                  showGuidance && "rotate-180"
                )} />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-3 text-sm">
                  <div className="p-3 rounded-lg bg-white/5">
                    <p className="text-white/60 mb-1">Power triangle relationship</p>
                    <p className="text-white font-mono text-xs">
                      kVA² = kW² + kVAR²
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <p className="text-white/60 mb-1">Required correction</p>
                    <p className="text-white font-mono text-xs">
                      kVAR correction = kVAR current - kVAR target
                    </p>
                    <p className="text-white/80 text-xs mt-1">
                      = {result.currentKVAR.toFixed(1)} - {result.targetKVAR.toFixed(1)} = {result.requiredKVAR.toFixed(1)} kVAR
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <p className="text-white/60 mb-1">kVAR at target PF</p>
                    <p className="text-white/80 text-xs">
                      tan(arccos({result.targetPF})) × {result.currentKW.toFixed(1)} kW = {result.targetKVAR.toFixed(1)} kVAR
                    </p>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Reference */}
      <Collapsible open={showReference} onOpenChange={setShowReference}>
        <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-amber-400" />
              <span className="text-sm sm:text-base font-medium text-amber-300">PFC Guidance</span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 text-white/70 transition-transform duration-200",
              showReference && "rotate-180"
            )} />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 pt-0">
            <div className="space-y-3 text-sm text-amber-200/80">
              <p><strong className="text-amber-300">Why Correct Power Factor?</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Avoid reactive power charges (typically £0.003-0.01/kVARh)</li>
                <li>• Reduce cable losses (I²R)</li>
                <li>• Free up transformer capacity</li>
                <li>• Improve voltage regulation</li>
              </ul>
              <p><strong className="text-amber-300">Typical Power Factors:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Motors (part load): 0.5-0.7</li>
                <li>• Motors (full load): 0.8-0.9</li>
                <li>• Fluorescent lighting: 0.5-0.6</li>
                <li>• LED lighting: 0.9-0.95</li>
                <li>• Welders: 0.5-0.7</li>
              </ul>

              <p className="pt-2 border-t border-white/10"><strong className="text-amber-300">BS 7671 / IET Guidance:</strong></p>
              <ul className="space-y-1 ml-4 text-xs">
                <li>• <strong>Section 331:</strong> Consider power factor when sizing cables</li>
                <li>• <strong>Section 555:</strong> PFC equipment must be rated for harmonics</li>
                <li>• Target PF of 0.95+ avoids most utility penalties</li>
                <li>• Over-correction (leading PF) can cause voltage rise</li>
              </ul>

              <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-xs text-red-300">
                  <strong>Warning:</strong> Always install detuned reactors (5% or 7%) with capacitors to avoid harmonic resonance with VFDs, LED drivers, and switch-mode power supplies.
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default PowerFactorCorrectionCalculator;
