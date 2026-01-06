import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, AlertTriangle, BookOpen, ChevronDown } from "lucide-react";
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  ResultDetails,
  CalculatorFormula,
  FormulaReference,
} from "@/components/calculators/shared";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const OhmsLawCalculator = () => {
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("");
  const [power, setPower] = useState("");
  const [solveFor, setSolveFor] = useState("auto");
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showGuidance, setShowGuidance] = useState(false);
  const [showBsRegs, setShowBsRegs] = useState(false);
  const [result, setResult] = useState<{
    voltage?: number;
    current?: number;
    resistance?: number;
    power?: number;
    formula?: string;
    currentAt230V?: number;
    protectionGuidance?: string;
    inputValues?: { V?: number; I?: number; R?: number; P?: number };
    calculationSteps?: string[];
    formulaType?: string;
  } | null>(null);

  const validateInputs = () => {
    const newErrors: {[key: string]: string} = {};
    const values = [voltage, current, resistance, power].filter(val => val && parseFloat(val) > 0);

    if (values.length < 2) {
      newErrors.general = "Please enter at least two values";
    }

    [voltage, current, resistance, power].forEach((val, idx) => {
      const fieldNames = ['voltage', 'current', 'resistance', 'power'];
      if (val && parseFloat(val) < 0) {
        newErrors[fieldNames[idx]] = "Value must be positive";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateOhmsLaw = () => {
    if (!validateInputs()) return;

    const V = parseFloat(voltage) || 0;
    const I = parseFloat(current) || 0;
    const R = parseFloat(resistance) || 0;
    const P = parseFloat(power) || 0;

    let calculatedV = V;
    let calculatedI = I;
    let calculatedR = R;
    let calculatedP = P;
    let formula = "";
    let formulaType = "";
    const calculationSteps: string[] = [];
    const inputValues: { V?: number; I?: number; R?: number; P?: number } = {};

    if (V > 0 && I > 0) {
      inputValues.V = V;
      inputValues.I = I;
      calculatedR = V / I;
      calculatedP = V * I;
      formula = "Using V and I: R = V/I, P = V×I";
      formulaType = "V_I";
      calculationSteps.push(
        `Step 1: Calculate Resistance (R)`,
        `R = V ÷ I`,
        `R = ${V} ÷ ${I}`,
        `R = ${calculatedR.toFixed(4)} Ω`,
        ``,
        `Step 2: Calculate Power (P)`,
        `P = V × I`,
        `P = ${V} × ${I}`,
        `P = ${calculatedP.toFixed(2)} W`
      );
    } else if (V > 0 && R > 0) {
      inputValues.V = V;
      inputValues.R = R;
      calculatedI = V / R;
      calculatedP = (V * V) / R;
      formula = "Using V and R: I = V/R, P = V²/R";
      formulaType = "V_R";
      calculationSteps.push(
        `Step 1: Calculate Current (I)`,
        `I = V ÷ R`,
        `I = ${V} ÷ ${R}`,
        `I = ${calculatedI.toFixed(4)} A`,
        ``,
        `Step 2: Calculate Power (P)`,
        `P = V² ÷ R`,
        `P = ${V}² ÷ ${R}`,
        `P = ${(V * V).toFixed(2)} ÷ ${R}`,
        `P = ${calculatedP.toFixed(2)} W`
      );
    } else if (V > 0 && P > 0) {
      inputValues.V = V;
      inputValues.P = P;
      calculatedI = P / V;
      calculatedR = (V * V) / P;
      formula = "Using V and P: I = P/V, R = V²/P";
      formulaType = "V_P";
      calculationSteps.push(
        `Step 1: Calculate Current (I)`,
        `I = P ÷ V`,
        `I = ${P} ÷ ${V}`,
        `I = ${calculatedI.toFixed(4)} A`,
        ``,
        `Step 2: Calculate Resistance (R)`,
        `R = V² ÷ P`,
        `R = ${V}² ÷ ${P}`,
        `R = ${(V * V).toFixed(2)} ÷ ${P}`,
        `R = ${calculatedR.toFixed(4)} Ω`
      );
    } else if (I > 0 && R > 0) {
      inputValues.I = I;
      inputValues.R = R;
      calculatedV = I * R;
      calculatedP = I * I * R;
      formula = "Using I and R: V = I×R, P = I²×R";
      formulaType = "I_R";
      calculationSteps.push(
        `Step 1: Calculate Voltage (V)`,
        `V = I × R`,
        `V = ${I} × ${R}`,
        `V = ${calculatedV.toFixed(2)} V`,
        ``,
        `Step 2: Calculate Power (P)`,
        `P = I² × R`,
        `P = ${I}² × ${R}`,
        `P = ${(I * I).toFixed(4)} × ${R}`,
        `P = ${calculatedP.toFixed(2)} W`
      );
    } else if (I > 0 && P > 0) {
      inputValues.I = I;
      inputValues.P = P;
      calculatedV = P / I;
      calculatedR = P / (I * I);
      formula = "Using I and P: V = P/I, R = P/I²";
      formulaType = "I_P";
      calculationSteps.push(
        `Step 1: Calculate Voltage (V)`,
        `V = P ÷ I`,
        `V = ${P} ÷ ${I}`,
        `V = ${calculatedV.toFixed(2)} V`,
        ``,
        `Step 2: Calculate Resistance (R)`,
        `R = P ÷ I²`,
        `R = ${P} ÷ ${I}²`,
        `R = ${P} ÷ ${(I * I).toFixed(4)}`,
        `R = ${calculatedR.toFixed(4)} Ω`
      );
    } else if (R > 0 && P > 0) {
      inputValues.R = R;
      inputValues.P = P;
      calculatedI = Math.sqrt(P / R);
      calculatedV = Math.sqrt(P * R);
      formula = "Using R and P: I = √(P/R), V = √(P×R)";
      formulaType = "R_P";
      calculationSteps.push(
        `Step 1: Calculate Current (I)`,
        `I = √(P ÷ R)`,
        `I = √(${P} ÷ ${R})`,
        `I = √${(P / R).toFixed(4)}`,
        `I = ${calculatedI.toFixed(4)} A`,
        ``,
        `Step 2: Calculate Voltage (V)`,
        `V = √(P × R)`,
        `V = √(${P} × ${R})`,
        `V = √${(P * R).toFixed(2)}`,
        `V = ${calculatedV.toFixed(2)} V`
      );
    }

    const currentAt230V = calculatedR > 0 ? 230 / calculatedR : 0;

    let protectionGuidance = "";
    if (calculatedI > 32) {
      protectionGuidance = "High current - consider distribution board protection";
    } else if (calculatedI > 16) {
      protectionGuidance = "Typical for high-power circuits (cookers, showers)";
    } else if (calculatedI > 6) {
      protectionGuidance = "Standard for socket outlets and lighting circuits";
    } else if (calculatedI > 0) {
      protectionGuidance = "Low current - typical for control circuits";
    }

    setResult({
      voltage: calculatedV,
      current: calculatedI,
      resistance: calculatedR,
      power: calculatedP,
      formula: formula,
      currentAt230V: currentAt230V,
      protectionGuidance: protectionGuidance,
      inputValues,
      calculationSteps,
      formulaType
    });
    setErrors({});
  };

  const reset = () => {
    setVoltage("");
    setCurrent("");
    setResistance("");
    setPower("");
    setSolveFor("auto");
    setErrors({});
    setResult(null);
  };

  const hasValidInputs = [voltage, current, resistance, power].filter(val => val && parseFloat(val) > 0).length >= 2;

  // Convert calculation steps to formula steps format
  const getFormulaSteps = () => {
    if (!result?.calculationSteps) return [];

    const steps: { label: string; formula?: string; value?: string }[] = [];
    let currentStep: { label: string; formula?: string; value?: string } | null = null;

    result.calculationSteps.forEach(line => {
      if (line.startsWith('Step')) {
        if (currentStep) steps.push(currentStep);
        currentStep = { label: line.replace(/Step \d+: /, '') };
      } else if (line && currentStep) {
        if (line.includes('=') && (line.includes('Ω') || line.includes('V') || line.includes('A') || line.includes('W')) && !line.includes('÷') && !line.includes('×') && !line.includes('√')) {
          currentStep.value = line;
        } else if (!currentStep.formula) {
          currentStep.formula = line;
        } else {
          currentStep.formula += ' → ' + line;
        }
      }
    });

    if (currentStep) steps.push(currentStep);
    return steps;
  };

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="power"
        title="Ohm's Law Calculator"
        description="Enter any two values to calculate the remaining electrical parameters"
      >
        {/* Solve For Selector */}
        <CalculatorSelect
          label="Solve For (Optional)"
          value={solveFor}
          onChange={setSolveFor}
          placeholder="What are you trying to find?"
          options={[
            { value: "auto", label: "Auto-detect from inputs" },
            { value: "voltage", label: "Voltage (V)" },
            { value: "current", label: "Current (I)" },
            { value: "resistance", label: "Resistance (R)" },
            { value: "power", label: "Power (P)" },
          ]}
        />

        {/* Input Grid */}
        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Voltage"
            unit="V"
            type="text"
            inputMode="decimal"
            placeholder="230"
            value={voltage}
            onChange={setVoltage}
            hint="UK domestic: 230V"
            error={errors.voltage}
          />
          <CalculatorInput
            label="Current"
            unit="A"
            type="text"
            inputMode="decimal"
            placeholder="10"
            value={current}
            onChange={setCurrent}
            hint="Measured or design current"
            error={errors.current}
          />
          <CalculatorInput
            label="Resistance"
            unit="Ω"
            type="text"
            inputMode="decimal"
            placeholder="23"
            value={resistance}
            onChange={setResistance}
            hint="Load resistance"
            error={errors.resistance}
          />
          <CalculatorInput
            label="Power"
            unit="W"
            type="text"
            inputMode="decimal"
            placeholder="2300"
            value={power}
            onChange={setPower}
            hint="Active power consumption"
            error={errors.power}
          />
        </CalculatorInputGrid>

        {errors.general && (
          <Alert className="border-red-500/30 bg-red-500/10">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-200">{errors.general}</AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <CalculatorActions
          category="power"
          onCalculate={calculateOhmsLaw}
          onReset={reset}
          isDisabled={!hasValidInputs}
        />
      </CalculatorCard>

      {/* Results */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Calculated Values */}
          <CalculatorResult category="power">
            <p className="text-sm text-white/60 mb-3">
              <span className="font-medium">Formula used:</span> {result.formula}
            </p>

            <ResultsGrid columns={2}>
              <ResultValue
                label="Voltage"
                value={result.voltage?.toFixed(2) || "0"}
                unit="V"
                category="power"
              />
              <ResultValue
                label="Current"
                value={result.current?.toFixed(3) || "0"}
                unit="A"
                category="power"
              />
              <ResultValue
                label="Resistance"
                value={result.resistance?.toFixed(2) || "0"}
                unit="Ω"
                category="power"
              />
              <ResultValue
                label="Power"
                value={result.power?.toFixed(2) || "0"}
                unit="W"
                category="power"
              />
            </ResultsGrid>

            {result.currentAt230V && result.currentAt230V > 0 && (
              <div className="pt-3 mt-3 border-t border-white/10">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="text-white/60 text-sm">Current at 230V (per phase):</span>
                  <span className="text-amber-400 font-mono text-lg font-bold">{result.currentAt230V.toFixed(2)} A</span>
                </div>
                <p className="text-xs text-white/70 mt-1">
                  For 3-phase systems: Total power ÷ 3 phases ÷ 230V line-to-neutral voltage
                </p>
              </div>
            )}

            {result.protectionGuidance && (
              <div className="mt-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-blue-200">{result.protectionGuidance}</p>
                </div>
              </div>
            )}
          </CalculatorResult>

          {/* How It Worked Out */}
          {result.calculationSteps && result.calculationSteps.length > 0 && (
            <div className="calculator-card p-4" style={{ borderColor: '#a78bfa15' }}>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-purple-500/20">
                    <BookOpen className="h-4 w-4 text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-purple-300">How It Worked Out</h3>
                </div>

                {/* Input Values Summary */}
                <div className="space-y-2">
                  <p className="text-sm text-white/60">Your input values:</p>
                  <div className="flex flex-wrap gap-2">
                    {result.inputValues?.V && (
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        V = {result.inputValues.V} V
                      </Badge>
                    )}
                    {result.inputValues?.I && (
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        I = {result.inputValues.I} A
                      </Badge>
                    )}
                    {result.inputValues?.R && (
                      <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                        R = {result.inputValues.R} Ω
                      </Badge>
                    )}
                    {result.inputValues?.P && (
                      <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                        P = {result.inputValues.P} W
                      </Badge>
                    )}
                  </div>
                </div>

                <CalculatorFormula
                  category="power"
                  steps={getFormulaSteps()}
                  title="Calculation Steps"
                  defaultOpen={true}
                />

                {/* Ohm's Law Triangle Reference */}
                <FormulaReference
                  category="power"
                  name="Ohm's Law Formulas"
                  formula="V = I × R"
                  variables={[
                    { symbol: "V", description: "Voltage in Volts" },
                    { symbol: "I", description: "Current in Amps" },
                    { symbol: "R", description: "Resistance in Ohms" },
                    { symbol: "P", description: "Power in Watts" },
                  ]}
                />
              </div>
            </div>
          )}

          {/* What This Means - Collapsible */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">What This Means</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/70 transition-transform duration-200",
                  showGuidance && "rotate-180"
                )} />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0 space-y-3">
                <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
                  <p className="font-medium text-blue-300 text-sm mb-1">Current Rating Requirements</p>
                  <p className="text-sm text-blue-200/80">Cables and protective devices must be rated for at least {result.current?.toFixed(1)}A continuously. Consider derating factors per BS 7671 Table 4D5.</p>
                </div>

                <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
                  <p className="font-medium text-blue-300 text-sm mb-1">Voltage Drop Compliance</p>
                  <p className="text-sm text-blue-200/80">BS 7671 limits: 3% for lighting, 5% for power circuits. For {result.current?.toFixed(1)}A, calculate cable length carefully.</p>
                </div>

                <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
                  <p className="font-medium text-blue-300 text-sm mb-1">Protection Coordination</p>
                  <p className="text-sm text-blue-200/80">Protective device rating (In) must coordinate: Ib ≤ In ≤ Iz. {result.protectionGuidance}</p>
                </div>

                {result.current && result.current > 16 && (
                  <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/30">
                    <p className="font-medium text-amber-300 text-sm mb-1">High Current Considerations</p>
                    <p className="text-sm text-amber-200/80">Currents above 16A generate significant heat. Consider cable heating effects and installation method derating factors.</p>
                  </div>
                )}
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* BS 7671 Guidance - Collapsible */}
          <Collapsible open={showBsRegs} onOpenChange={setShowBsRegs}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">BS 7671 Regs at a Glance</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/70 transition-transform duration-200",
                  showBsRegs && "rotate-180"
                )} />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-2 text-sm text-amber-200/80">
                  <p>• <strong className="text-amber-300">433.1:</strong> Overcurrent protection must not exceed conductor current-carrying capacity</p>
                  <p>• <strong className="text-amber-300">525:</strong> Voltage drop limits - 3% for lighting, 5% for other circuits</p>
                  <p>• <strong className="text-amber-300">523:</strong> Current-carrying capacity includes grouping and temperature derating</p>
                  <p>• <strong className="text-amber-300">434.5.2:</strong> ADS fault protection requirements</p>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Formula Reference (always visible) */}
      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-200">
            <strong>Ohm's Law:</strong> V = I×R, I = V/R, R = V/I, P = V×I = I²×R = V²/R
          </p>
        </div>
      </div>
    </div>
  );
};

export default OhmsLawCalculator;
