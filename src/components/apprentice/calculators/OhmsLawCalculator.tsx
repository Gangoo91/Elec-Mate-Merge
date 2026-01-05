import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Zap, RotateCcw, Calculator, Info, AlertTriangle, BookOpen } from "lucide-react";

const OhmsLawCalculator = () => {
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("");
  const [power, setPower] = useState("");
  const [solveFor, setSolveFor] = useState("auto");
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [result, setResult] = useState<{
    voltage?: number;
    current?: number;
    resistance?: number;
    power?: number;
    formula?: string;
    currentAt230V?: number;
    protectionGuidance?: string;
    // For "How It Worked Out" section
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
    
    // Check for negative values
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

    // Calculate missing values based on what we have
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

    // Calculate current at 230V for reference
    const currentAt230V = calculatedR > 0 ? 230 / calculatedR : 0;

    // Protection guidance
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

  const getCurrentStatus = () => {
    if (!result?.current) return { text: "Unknown", color: "text-muted-foreground" };
    const I = result.current;
    if (I > 32) return { text: "High Current", color: "text-red-400" };
    if (I > 16) return { text: "High Power Circuit", color: "text-yellow-400" };
    if (I > 6) return { text: "Standard Circuit", color: "text-green-400" };
    return { text: "Low Current", color: "text-blue-400" };
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Ohm's Law Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Enter any two values to calculate the remaining electrical parameters
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <MobileSelect value={solveFor} onValueChange={setSolveFor}>
            <MobileSelectTrigger label="Solve For (Optional)">
              <MobileSelectValue placeholder="What are you trying to find?" />
            </MobileSelectTrigger>
            <MobileSelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
              <MobileSelectItem value="auto">Auto-detect from inputs</MobileSelectItem>
              <MobileSelectItem value="voltage">Voltage (V)</MobileSelectItem>
              <MobileSelectItem value="current">Current (I)</MobileSelectItem>
              <MobileSelectItem value="resistance">Resistance (R)</MobileSelectItem>
              <MobileSelectItem value="power">Power (P)</MobileSelectItem>
            </MobileSelectContent>
          </MobileSelect>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MobileInput
              label="Voltage (V)"
              type="text"
              inputMode="decimal"
              step="0.1"
              placeholder="230"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              unit="V"
              error={errors.voltage}
              clearError={() => setErrors(prev => ({ ...prev, voltage: "" }))}
              hint="UK domestic: 230V"
            />
            <MobileInput
              label="Current (A)"
              type="text"
              inputMode="decimal"
              step="0.01"
              placeholder="10"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              unit="A"
              error={errors.current}
              clearError={() => setErrors(prev => ({ ...prev, current: "" }))}
              hint="Measured or design current"
            />
            <MobileInput
              label="Resistance (Ω)"
              type="text"
              inputMode="decimal"
              step="0.1"
              placeholder="23"
              value={resistance}
              onChange={(e) => setResistance(e.target.value)}
              unit="Ω"
              error={errors.resistance}
              clearError={() => setErrors(prev => ({ ...prev, resistance: "" }))}
              hint="Load resistance"
            />
            <MobileInput
              label="Power (W)"
              type="text"
              inputMode="decimal"
              step="0.1"
              placeholder="2300"
              value={power}
              onChange={(e) => setPower(e.target.value)}
              unit="W"
              error={errors.power}
              clearError={() => setErrors(prev => ({ ...prev, power: "" }))}
              hint="Active power consumption"
            />
          </div>
          
          {errors.general && (
            <Alert className="border-red-500/30 bg-red-500/10">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-200">{errors.general}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <MobileButton onClick={calculateOhmsLaw} variant="elec" className="flex-1 min-h-[48px]">
              <Calculator className="h-5 w-5 mr-2" />
              Calculate
            </MobileButton>
            <MobileButton onClick={reset} variant="elec-outline" className="min-h-[48px]">
              <RotateCcw className="h-5 w-5" />
            </MobileButton>
          </div>
        </div>

        {result && (
          <div className="space-y-4">
            <Card className="border-green-500/30 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-green-300">Calculated Values</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-green-200 mb-4">
                  <strong>Formula used:</strong> {result.formula}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 p-3 bg-green-500/5 rounded-lg">
                    <span className="text-green-200 text-sm">Voltage:</span>
                    <span className="text-green-300 font-mono text-lg">{result.voltage?.toFixed(2)} V</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 p-3 bg-green-500/5 rounded-lg">
                    <span className="text-green-200 text-sm">Current:</span>
                    <span className="text-green-300 font-mono text-lg">{result.current?.toFixed(3)} A</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 p-3 bg-green-500/5 rounded-lg">
                    <span className="text-green-200 text-sm">Resistance:</span>
                    <span className="text-green-300 font-mono text-lg">{result.resistance?.toFixed(2)} Ω</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 p-3 bg-green-500/5 rounded-lg">
                    <span className="text-green-200 text-sm">Power:</span>
                    <span className="text-green-300 font-mono text-lg">{result.power?.toFixed(2)} W</span>
                  </div>
                </div>
                
                {result.currentAt230V && result.currentAt230V > 0 && (
                  <div className="pt-3 border-t border-green-500/30">
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span className="text-green-200">Current at 230V (per phase):</span>
                        <span className="text-green-300 font-mono text-lg">{result.currentAt230V.toFixed(2)} A</span>
                      </div>
                      <div className="text-xs text-green-300/70">
                        For 3-phase systems: Total power ÷ 3 phases ÷ 230V line-to-neutral voltage
                      </div>
                    </div>
                  </div>
                )}
                
                {result.protectionGuidance && (
                  <Alert className="border-blue-500/30 bg-blue-500/10">
                    <Info className="h-4 w-4 text-blue-500" />
                    <AlertDescription className="text-blue-200">
                      {result.protectionGuidance}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* How It Worked Out - Step-by-step calculation breakdown */}
            {result.calculationSteps && result.calculationSteps.length > 0 && (
              <Card className="border-purple-500/30 bg-purple-500/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-purple-300 text-base flex items-center gap-2">
                    <Calculator className="h-4 w-4" />
                    How It Worked Out
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  {/* Input Values Summary */}
                  <div className="space-y-2">
                    <p className="text-purple-200 font-medium">Your input values:</p>
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
                        <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
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

                  {/* Calculation Steps */}
                  <div className="font-mono text-xs bg-purple-500/10 rounded-lg p-4 border border-purple-500/20 space-y-1">
                    {result.calculationSteps.map((step, index) => (
                      <p
                        key={index}
                        className={`text-purple-200 ${
                          step.startsWith('Step') ? 'text-purple-300 font-semibold mt-2' :
                          step.includes('=') && !step.includes('÷') && !step.includes('×') && !step.includes('√') && step.split('=').length === 2 && index === result.calculationSteps!.length - 1 || (step.includes('Ω') || step.includes('V') || step.includes('A') || step.includes('W')) && step.includes('=') && !step.includes('÷') && !step.includes('×') && step.split('=')[1].trim().match(/^[\d.]+\s*[ΩVAW]$/)
                            ? 'text-green-300 font-bold' : ''
                        }`}
                      >
                        {step === '' ? <br /> : step}
                      </p>
                    ))}
                  </div>

                  {/* Ohm's Law Triangle Reference */}
                  <div className="border-t border-purple-500/20 pt-3 mt-3">
                    <p className="text-xs text-purple-300/70 mb-2">
                      <strong>Ohm's Law Triangle:</strong> Cover the value you want to find
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-purple-200">
                      <div className="p-2 bg-purple-500/10 rounded border border-purple-500/20">
                        <span className="font-mono">V = I × R</span> (Voltage)
                      </div>
                      <div className="p-2 bg-purple-500/10 rounded border border-purple-500/20">
                        <span className="font-mono">I = V ÷ R</span> (Current)
                      </div>
                      <div className="p-2 bg-purple-500/10 rounded border border-purple-500/20">
                        <span className="font-mono">R = V ÷ I</span> (Resistance)
                      </div>
                      <div className="p-2 bg-purple-500/10 rounded border border-purple-500/20">
                        <span className="font-mono">P = V × I</span> (Power)
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* What this means panel */}
            <Card className="border-blue-500/30 bg-blue-500/5">
              <CardHeader>
                <CardTitle className="text-blue-300 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  What This Means
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-blue-200 space-y-3">
                  <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
                    <p className="font-medium text-blue-300 mb-1">Current Rating Requirements</p>
                    <p>Cables and protective devices must be rated for at least {result.current?.toFixed(1)}A continuously. Consider derating factors for ambient temperature, cable grouping, and thermal insulation per BS 7671 Table 4D5.</p>
                  </div>
                  
                  <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
                    <p className="font-medium text-blue-300 mb-1">Voltage Drop Compliance</p>
                    <p>BS 7671 limits voltage drop to 3% for lighting circuits and 5% for power circuits. For this current ({result.current?.toFixed(1)}A), calculate cable length carefully to ensure compliance. Higher currents require larger cables or shorter runs.</p>
                  </div>
                  
                  <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
                    <p className="font-medium text-blue-300 mb-1">Protection Coordination</p>
                    <p>Protective device rating (In) must coordinate with cable capacity (Iz) where Ib ≤ In ≤ Iz. {result.protectionGuidance}</p>
                  </div>
                  
                  {result.current && result.current > 16 && (
                    <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                      <p className="font-medium text-yellow-300 mb-1">High Current Considerations</p>
                      <p className="text-yellow-200">Currents above 16A generate significant heat. Consider cable heating effects, installation method derating factors, and ensure adequate ventilation. Distribution board protection becomes critical for safe operation.</p>
                    </div>
                  )}
                  
                  {result.currentAt230V && result.currentAt230V > 0 && (
                    <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                      <p className="font-medium text-purple-300 mb-1">Three-Phase Current Distribution</p>
                      <p className="text-purple-200">The 230V current ({result.currentAt230V.toFixed(2)}A) represents current per phase in a balanced 3-phase system. Total power is distributed equally across three phases, reducing current per conductor compared to single-phase equivalent.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* BS 7671 Guidance */}
            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardHeader>
                <CardTitle className="text-amber-300 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  BS 7671 Regs at a Glance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm text-amber-200 space-y-1">
                  <p>• <strong>433.1:</strong> Overcurrent protection must not exceed conductor current-carrying capacity</p>
                  <p>• <strong>525:</strong> Voltage drop limits - 3% for lighting, 5% for other circuits</p>
                  <p>• <strong>523:</strong> Current-carrying capacity includes grouping and temperature derating</p>
                  <p>• <strong>434.5.2:</strong> ADS (Automatic Disconnection of Supply) fault protection requirements</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Alert className="border-blue-500/20 bg-blue-500/10">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-200">
            <strong>Ohm's Law Formulas:</strong> V = I×R, I = V/R, R = V/I, P = V×I = I²×R = V²/R
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default OhmsLawCalculator;