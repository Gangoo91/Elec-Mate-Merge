import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Info, BookOpen, ChevronDown, AlertTriangle, CheckCircle, XCircle, Zap } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";

interface ThreePhaseResult {
  apparentPower: number;
  activePower: number;
  reactivePower: number;
  phaseVoltage: number;
  phaseCurrent: number;
  lineVoltage: number;
  lineCurrent: number;
  phaseAngle: number;
  pfQuality: "Good" | "Acceptable" | "Poor";
  protectiveDevice: string;
  unbalance?: number;
  correctionCapacitor?: number;
  perPhase: {
    voltage: number;
    current: number;
    power: number;
  };
}

const ThreePhasePowerCalculator = () => {
  const config = CALCULATOR_CONFIG['power'];

  const [voltage, setVoltage] = useState<string>("");
  const [current, setCurrent] = useState<string>("");
  const [powerFactor, setPowerFactor] = useState<string>("0.85");
  const [connection, setConnection] = useState<string>("star");
  const [voltageType, setVoltageType] = useState<string>("line-line");
  const [currentType, setCurrentType] = useState<string>("line");
  const [pfType, setPfType] = useState<string>("lagging");
  const [frequency, setFrequency] = useState<string>("50");
  const [mode, setMode] = useState<string>("power");
  const [solveFor, setSolveFor] = useState<string>("power");
  const [mechanicalPower, setMechanicalPower] = useState<string>("");
  const [mechanicalPowerUnit, setMechanicalPowerUnit] = useState<string>("kW");
  const [efficiency, setEfficiency] = useState<string>("85");
  const [targetPf, setTargetPf] = useState<string>("");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [currentA, setCurrentA] = useState<string>("");
  const [currentB, setCurrentB] = useState<string>("");
  const [currentC, setCurrentC] = useState<string>("");

  const [showGuidance, setShowGuidance] = useState(false);
  const [showBsRegs, setShowBsRegs] = useState(false);
  const [showCalculation, setShowCalculation] = useState(false);

  const [result, setResult] = useState<ThreePhaseResult | null>(null);

  const calculateThreePhasePower = () => {
    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const pf = parseFloat(powerFactor);
    const freq = parseFloat(frequency);
    const eff = parseFloat(efficiency) / 100;
    const mechPower = parseFloat(mechanicalPower);

    if (V <= 0 || I <= 0 || pf <= 0 || pf > 1) return;

    // Normalize inputs to line-to-line voltage and line current
    let VLL = V;
    let IL = I;

    // Convert voltage based on type and connection
    if (voltageType === "line-neutral" && connection === "star") {
      VLL = V * Math.sqrt(3);
    } else if (voltageType === "line-neutral" && connection === "delta") {
      VLL = V; // In delta, line-neutral doesn't apply
    }

    // Convert current based on type and connection
    if (currentType === "phase" && connection === "star") {
      IL = I; // In star, line current = phase current
    } else if (currentType === "phase" && connection === "delta") {
      IL = I * Math.sqrt(3); // In delta, line current = √3 × phase current
    }

    // Calculate power values
    const apparentPower = Math.sqrt(3) * VLL * IL / 1000; // kVA
    const activePower = apparentPower * pf; // kW
    const phaseAngle = Math.acos(pf) * (180 / Math.PI);
    const reactivePower = apparentPower * Math.sin(Math.acos(pf)) * (pfType === "lagging" ? 1 : -1); // kVAR

    // Calculate per-phase values
    const phaseVoltage = connection === "star" ? VLL / Math.sqrt(3) : VLL;
    const phaseCurrent = connection === "star" ? IL : IL / Math.sqrt(3);
    const phasePower = activePower / 3;

    // Power factor quality assessment
    let pfQuality: "Good" | "Acceptable" | "Poor";
    if (pf >= 0.95) pfQuality = "Good";
    else if (pf >= 0.85) pfQuality = "Acceptable";
    else pfQuality = "Poor";

    // Protective device sizing (indicative only)
    const ratedCurrent = IL;
    let protectiveDevice = "";
    if (ratedCurrent <= 6) protectiveDevice = "6A MCB/RCBO";
    else if (ratedCurrent <= 10) protectiveDevice = "10A MCB/RCBO";
    else if (ratedCurrent <= 16) protectiveDevice = "16A MCB/RCBO";
    else if (ratedCurrent <= 20) protectiveDevice = "20A MCB/RCBO";
    else if (ratedCurrent <= 25) protectiveDevice = "25A MCB/RCBO";
    else if (ratedCurrent <= 32) protectiveDevice = "32A MCB/RCBO";
    else if (ratedCurrent <= 40) protectiveDevice = "40A MCB/RCBO";
    else if (ratedCurrent <= 50) protectiveDevice = "50A MCB/RCBO";
    else if (ratedCurrent <= 63) protectiveDevice = "63A MCB/RCBO";
    else if (ratedCurrent <= 80) protectiveDevice = "80A MCCB";
    else if (ratedCurrent <= 100) protectiveDevice = "100A MCCB";
    else protectiveDevice = `${Math.ceil(ratedCurrent / 50) * 50}A MCCB`;

    // Calculate unbalance if all phase currents provided
    let unbalance = undefined;
    if (currentA && currentB && currentC) {
      const IA = parseFloat(currentA);
      const IB = parseFloat(currentB);
      const IC = parseFloat(currentC);
      const avgCurrent = (IA + IB + IC) / 3;
      const maxDeviation = Math.max(
        Math.abs(IA - avgCurrent),
        Math.abs(IB - avgCurrent),
        Math.abs(IC - avgCurrent)
      );
      unbalance = (maxDeviation / avgCurrent) * 100;
    }

    // Calculate power factor correction capacitor if target PF provided
    let correctionCapacitor = undefined;
    if (targetPf && parseFloat(targetPf) > pf) {
      const targetPfValue = parseFloat(targetPf);
      const targetAngle = Math.acos(targetPfValue);
      const currentAngle = Math.acos(pf);
      const Qc = activePower * (Math.tan(currentAngle) - Math.tan(targetAngle));
      correctionCapacitor = Qc; // kVAR
    }

    setResult({
      apparentPower,
      activePower,
      reactivePower,
      phaseVoltage,
      phaseCurrent,
      lineVoltage: VLL,
      lineCurrent: IL,
      phaseAngle,
      pfQuality,
      protectiveDevice,
      unbalance,
      correctionCapacitor,
      perPhase: {
        voltage: phaseVoltage,
        current: phaseCurrent,
        power: phasePower
      }
    });
  };

  const reset = () => {
    setVoltage("");
    setCurrent("");
    setPowerFactor("0.85");
    setConnection("star");
    setVoltageType("line-line");
    setCurrentType("line");
    setPfType("lagging");
    setFrequency("50");
    setMode("power");
    setSolveFor("power");
    setMechanicalPower("");
    setMechanicalPowerUnit("kW");
    setEfficiency("85");
    setTargetPf("");
    setCurrentA("");
    setCurrentB("");
    setCurrentC("");
    setAdvancedOpen(false);
    setResult(null);
  };

  const hasValidInputs = () => {
    return voltage && current && powerFactor;
  };

  const getPfBadgeStyle = () => {
    if (!result) return {};
    if (result.pfQuality === "Good") return { className: "text-green-400 border-green-400/50" };
    if (result.pfQuality === "Acceptable") return { className: "text-amber-400 border-amber-400/50" };
    return { className: "text-red-400 border-red-400/50" };
  };

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="power"
        title="Three Phase Power Calculator"
        description="Calculate power values for three-phase electrical systems including apparent, active, and reactive power"
        badge="3φ Power"
      >
        <CalculatorSelect
          label="Calculation Mode"
          value={mode}
          onChange={setMode}
          options={[
            { value: "power", label: "Power Calculation" },
            { value: "motor", label: "Motor Sizing" },
          ]}
        />

        {mode === "power" && (
          <CalculatorSelect
            label="Solve For"
            value={solveFor}
            onChange={setSolveFor}
            options={[
              { value: "power", label: "Power (from V & I)" },
              { value: "current", label: "Current (from V & P)" },
            ]}
          />
        )}

        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="Connection Type"
            value={connection}
            onChange={setConnection}
            options={[
              { value: "star", label: "Star (Y)" },
              { value: "delta", label: "Delta (Δ)" },
            ]}
          />
          <CalculatorSelect
            label="Voltage Type"
            value={voltageType}
            onChange={setVoltageType}
            options={[
              { value: "line-line", label: "Line-to-Line" },
              { value: "line-neutral", label: "Line-to-Neutral" },
            ]}
          />
        </CalculatorInputGrid>

        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label={voltageType === "line-line" ? "Line Voltage" : "Phase Voltage"}
            unit="V"
            type="text"
            inputMode="decimal"
            value={voltage}
            onChange={setVoltage}
            placeholder={voltageType === "line-line" ? "e.g., 400" : "e.g., 230"}
          />
          <CalculatorInput
            label={currentType === "line" ? "Line Current" : "Phase Current"}
            unit="A"
            type="text"
            inputMode="decimal"
            value={current}
            onChange={setCurrent}
            placeholder="e.g., 25"
          />
        </CalculatorInputGrid>

        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="Current Type"
            value={currentType}
            onChange={setCurrentType}
            options={[
              { value: "line", label: "Line Current" },
              { value: "phase", label: "Phase Current" },
            ]}
          />
          <CalculatorSelect
            label="Frequency"
            value={frequency}
            onChange={setFrequency}
            options={[
              { value: "50", label: "50 Hz (UK)" },
              { value: "60", label: "60 Hz" },
            ]}
          />
        </CalculatorInputGrid>

        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Power Factor"
            type="text"
            inputMode="decimal"
            value={powerFactor}
            onChange={setPowerFactor}
            placeholder="e.g., 0.85"
            hint="0 to 1"
          />
          <CalculatorSelect
            label="PF Type"
            value={pfType}
            onChange={setPfType}
            options={[
              { value: "lagging", label: "Lagging (Inductive)" },
              { value: "leading", label: "Leading (Capacitive)" },
            ]}
          />
        </CalculatorInputGrid>

        {mode === "motor" && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
            <h4 className="font-medium text-amber-400 flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Motor Sizing Parameters
            </h4>
            <CalculatorInputGrid columns={2}>
              <CalculatorInput
                label="Mechanical Power"
                unit={mechanicalPowerUnit}
                type="text"
                inputMode="decimal"
                value={mechanicalPower}
                onChange={setMechanicalPower}
                placeholder="e.g., 15"
              />
              <CalculatorSelect
                label="Power Unit"
                value={mechanicalPowerUnit}
                onChange={setMechanicalPowerUnit}
                options={[
                  { value: "kW", label: "kW" },
                  { value: "HP", label: "HP" },
                ]}
              />
            </CalculatorInputGrid>
            <CalculatorInput
              label="Efficiency"
              unit="%"
              type="text"
              inputMode="decimal"
              value={efficiency}
              onChange={setEfficiency}
              placeholder="85"
            />
          </div>
        )}

        <CalculatorInput
          label="Target Power Factor (optional)"
          type="text"
          inputMode="decimal"
          value={targetPf}
          onChange={setTargetPf}
          placeholder="e.g., 0.95"
          hint="For PF correction calculation"
        />

        {/* Advanced Options */}
        <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
          <CollapsibleTrigger className="w-full p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors">
            <span className="text-sm font-medium text-white">Advanced Options</span>
            <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform", advancedOpen && "rotate-180")} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
            <h5 className="text-sm font-medium text-amber-400">Current Unbalance Analysis</h5>
            <CalculatorInputGrid columns={3}>
              <CalculatorInput
                label="IA"
                unit="A"
                type="text"
                inputMode="decimal"
                value={currentA}
                onChange={setCurrentA}
                placeholder="25"
              />
              <CalculatorInput
                label="IB"
                unit="A"
                type="text"
                inputMode="decimal"
                value={currentB}
                onChange={setCurrentB}
                placeholder="24"
              />
              <CalculatorInput
                label="IC"
                unit="A"
                type="text"
                inputMode="decimal"
                value={currentC}
                onChange={setCurrentC}
                placeholder="26"
              />
            </CalculatorInputGrid>
          </CollapsibleContent>
        </Collapsible>

        <CalculatorActions
          category="power"
          onCalculate={calculateThreePhasePower}
          onReset={reset}
          isDisabled={!hasValidInputs()}
        />
      </CalculatorCard>

      {/* Results */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          <CalculatorResult category="power">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/60">Three Phase Power Results</span>
                <Badge variant="outline" className="text-white/60 border-white/30">
                  {connection === "star" ? "Star (Y)" : "Delta (Δ)"}
                </Badge>
              </div>
              <Badge variant="outline" {...getPfBadgeStyle()}>
                {result.pfQuality === "Good" && <CheckCircle className="h-3 w-3 mr-1" />}
                {result.pfQuality === "Acceptable" && <Info className="h-3 w-3 mr-1" />}
                {result.pfQuality === "Poor" && <XCircle className="h-3 w-3 mr-1" />}
                PF: {result.pfQuality}
              </Badge>
            </div>

            {/* Primary Result */}
            <div className="text-center py-4">
              <p className="text-sm text-white/60 mb-1">Apparent Power (S)</p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
              >
                {result.apparentPower.toFixed(2)} kVA
              </div>
              <p className="text-xs text-white/70 mt-1">φ = {result.phaseAngle.toFixed(1)}° • √3 = 1.732</p>
            </div>

            {/* Power Triangle */}
            <div className="p-3 rounded-lg bg-white/5">
              <h4 className="text-sm font-medium text-amber-400 mb-2">Power Triangle</h4>
              <ResultsGrid columns={2}>
                <ResultValue label="Active Power (P)" value={result.activePower.toFixed(2)} unit="kW" category="power" size="sm" />
                <ResultValue label="Reactive Power (Q)" value={`${Math.abs(result.reactivePower).toFixed(2)}`} unit={`kVAR ${pfType === "lagging" ? "(Ind)" : "(Cap)"}`} category="power" size="sm" />
              </ResultsGrid>
            </div>

            {/* Voltage & Current */}
            <div className="p-3 rounded-lg bg-white/5">
              <h4 className="text-sm font-medium text-amber-400 mb-2">Voltage & Current</h4>
              <ResultsGrid columns={2}>
                <ResultValue label="Line Voltage" value={result.lineVoltage.toFixed(1)} unit="V" category="power" size="sm" />
                <ResultValue label="Line Current" value={result.lineCurrent.toFixed(2)} unit="A" category="power" size="sm" />
                <ResultValue label="Phase Voltage" value={result.phaseVoltage.toFixed(1)} unit="V" category="power" size="sm" />
                <ResultValue label="Phase Current" value={result.phaseCurrent.toFixed(2)} unit="A" category="power" size="sm" />
              </ResultsGrid>
            </div>

            {/* Per-Phase Power */}
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Power per Phase:</span>
              <span className="text-amber-400 font-mono">{result.perPhase.power.toFixed(2)} kW</span>
            </div>

            {/* Unbalance Analysis */}
            {result.unbalance !== undefined && (
              <div className="p-3 rounded-lg bg-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">Current Unbalance:</span>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "font-mono",
                      result.unbalance > 5 ? "text-red-400" : "text-green-400"
                    )}>
                      {result.unbalance.toFixed(1)}%
                    </span>
                    {result.unbalance > 5 && (
                      <Badge variant="outline" className="text-red-400 border-red-400/50 text-xs">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        High
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Power Factor Correction */}
            {result.correctionCapacitor !== undefined && (
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                <h4 className="text-sm font-medium text-green-400 mb-2">Power Factor Correction</h4>
                <div className="flex justify-between">
                  <span className="text-sm text-green-200/80">Capacitor Required:</span>
                  <span className="text-green-400 font-mono">{result.correctionCapacitor.toFixed(2)} kVAR</span>
                </div>
              </div>
            )}

            {/* Protective Device */}
            <div className="pt-3 border-t border-white/10">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Suggested Protection:</span>
                <span className="text-amber-400 font-mono">{result.protectiveDevice}</span>
              </div>
              <p className="text-xs text-white/70 mt-1">*Indicative only - proper circuit design required per BS 7671</p>
            </div>
          </CalculatorResult>

          {/* How It Worked Out */}
          <Collapsible open={showCalculation} onOpenChange={setShowCalculation}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#a78bfa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Zap className="h-4 w-4 text-purple-400" />
                  <span className="text-sm sm:text-base font-medium text-purple-300">How It Worked Out</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform duration-200", showCalculation && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 space-y-3">
                <div className="space-y-2">
                  <p className="text-sm text-purple-200 font-medium">Step 1: Input Values</p>
                  <div className="p-3 rounded-lg bg-purple-500/10 font-mono text-xs text-purple-100 space-y-1">
                    <p>Connection: {connection === "star" ? "Star (Y)" : "Delta (Δ)"}</p>
                    <p>Voltage: {voltage}V ({voltageType === "line-line" ? "Line-to-Line" : "Line-to-Neutral"})</p>
                    <p>Current: {current}A ({currentType === "line" ? "Line" : "Phase"})</p>
                    <p>Power Factor: {powerFactor} {pfType}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-purple-200 font-medium">Step 2: Normalize to Line Values</p>
                  <div className="p-3 rounded-lg bg-purple-500/10 font-mono text-xs text-purple-100 space-y-1">
                    {voltageType === "line-neutral" ? (
                      <p>VLL = VLN × √3 = {voltage} × 1.732 = {result.lineVoltage.toFixed(1)}V</p>
                    ) : (
                      <p>VLL = {voltage}V (already line-to-line)</p>
                    )}
                    {currentType === "phase" && connection === "delta" ? (
                      <p>IL = IP × √3 = {current} × 1.732 = {result.lineCurrent.toFixed(2)}A</p>
                    ) : (
                      <p>IL = {current}A (line current)</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-purple-200 font-medium">Step 3: Apparent Power</p>
                  <div className="p-3 rounded-lg bg-purple-500/10 font-mono text-xs text-purple-100">
                    <p>S = √3 × VLL × IL</p>
                    <p>S = 1.732 × {result.lineVoltage.toFixed(1)} × {result.lineCurrent.toFixed(2)}</p>
                    <p className="text-purple-300">S = {(result.apparentPower * 1000).toFixed(0)}VA = {result.apparentPower.toFixed(2)} kVA</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-purple-200 font-medium">Step 4: Power Triangle</p>
                  <div className="p-3 rounded-lg bg-purple-500/10 font-mono text-xs text-purple-100 space-y-1">
                    <p>P = S × cos(φ) = {result.apparentPower.toFixed(2)} × {powerFactor}</p>
                    <p className="text-purple-300">P = {result.activePower.toFixed(2)} kW</p>
                    <p className="mt-1">Q = S × sin(φ) = {result.apparentPower.toFixed(2)} × sin({result.phaseAngle.toFixed(1)}°)</p>
                    <p className="text-purple-300">Q = {Math.abs(result.reactivePower).toFixed(2)} kVAR</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-purple-200 font-medium">Step 5: Per-Phase Values ({connection === "star" ? "Star" : "Delta"})</p>
                  <div className="p-3 rounded-lg bg-purple-500/10 font-mono text-xs text-purple-100 space-y-1">
                    {connection === "star" ? (
                      <>
                        <p>VP = VLL / √3 = {result.lineVoltage.toFixed(1)} / 1.732 = {result.phaseVoltage.toFixed(1)}V</p>
                        <p>IP = IL = {result.phaseCurrent.toFixed(2)}A</p>
                      </>
                    ) : (
                      <>
                        <p>VP = VLL = {result.phaseVoltage.toFixed(1)}V</p>
                        <p>IP = IL / √3 = {result.lineCurrent.toFixed(2)} / 1.732 = {result.phaseCurrent.toFixed(2)}A</p>
                      </>
                    )}
                    <p className="text-purple-300 mt-1">Power per phase = {result.perPhase.power.toFixed(2)} kW</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <p className="text-sm text-purple-200 font-medium mb-2">Power Triangle Verification:</p>
                  <p className="font-mono text-xs text-purple-100">
                    S² = P² + Q² → {result.apparentPower.toFixed(2)}² = {result.activePower.toFixed(2)}² + {Math.abs(result.reactivePower).toFixed(2)}²
                  </p>
                  <p className="font-mono text-xs text-purple-100">
                    {(result.apparentPower * result.apparentPower).toFixed(2)} ≈ {(result.activePower * result.activePower + result.reactivePower * result.reactivePower).toFixed(2)} ✓
                  </p>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* What This Means */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">What This Means</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform duration-200", showGuidance && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 space-y-2">
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">Power Factor:</strong> {result.pfQuality === "Poor" ? "Values below 0.85 may require correction per supply authority requirements. Poor power factor increases current draw and cable sizing." : result.pfQuality === "Acceptable" ? "Acceptable for most applications. Consider correction for improved efficiency." : "Excellent efficiency - minimal reactive power losses."}
                </p>
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">Star vs Delta:</strong> Star connection provides neutral for single-phase loads. Delta connection is common for motors and balanced loads.
                </p>
                {result.unbalance !== undefined && (
                  <p className="text-sm text-blue-200/80">
                    <strong className="text-blue-300">Current Unbalance:</strong> {result.unbalance > 5 ? ">5% unbalance causes neutral current in star systems and reduces motor efficiency. >10% requires investigation." : "Unbalance within acceptable limits."}
                  </p>
                )}
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* BS 7671 Regs at a Glance */}
          <Collapsible open={showBsRegs} onOpenChange={setShowBsRegs}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">BS 7671 Regs at a Glance</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform duration-200", showBsRegs && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-2 text-sm text-amber-200/80">
                  <p><strong className="text-amber-300">Protection:</strong> Final circuit protection must account for motor starting currents (typically 6-8× full load). Use BS EN 60947-4-1 rated devices.</p>
                  <p><strong className="text-amber-300">Cable Sizing:</strong> Consider voltage drop (Section 525), current-carrying capacity with grouping/temperature factors.</p>
                  <p><strong className="text-amber-300">Section 512.1.2:</strong> Equipment selection must consider power factor and efficiency.</p>
                  <p><strong className="text-amber-300">Section 523:</strong> Conductor sizing based on design current, not reduced current from poor PF.</p>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Formula Reference */}
      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-200">
            <strong>UK Standard:</strong> Three-phase supply is 400V line-to-line, 230V line-to-neutral, 50Hz (BS 7671:2018+A3:2024)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThreePhasePowerCalculator;
