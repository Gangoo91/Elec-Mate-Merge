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

    // Calculate missing values based on what we have
    if (V > 0 && I > 0) {
      calculatedR = V / I;
      calculatedP = V * I;
      formula = "Using V and I: R = V/I, P = V×I";
    } else if (V > 0 && R > 0) {
      calculatedI = V / R;
      calculatedP = (V * V) / R;
      formula = "Using V and R: I = V/R, P = V²/R";
    } else if (V > 0 && P > 0) {
      calculatedI = P / V;
      calculatedR = (V * V) / P;
      formula = "Using V and P: I = P/V, R = V²/P";
    } else if (I > 0 && R > 0) {
      calculatedV = I * R;
      calculatedP = I * I * R;
      formula = "Using I and R: V = I×R, P = I²×R";
    } else if (I > 0 && P > 0) {
      calculatedV = P / I;
      calculatedR = P / (I * I);
      formula = "Using I and P: V = P/I, R = P/I²";
    } else if (R > 0 && P > 0) {
      calculatedI = Math.sqrt(P / R);
      calculatedV = Math.sqrt(P * R);
      formula = "Using R and P: I = √(P/R), V = √(P×R)";
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
      protectionGuidance: protectionGuidance
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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

          <div className="flex gap-2">
            <MobileButton onClick={calculateOhmsLaw} variant="elec" className="flex-1">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate
            </MobileButton>
            <MobileButton onClick={reset} variant="elec-outline">
              <RotateCcw className="h-4 w-4" />
            </MobileButton>
          </div>
        </div>

        {result && (
          <div className="space-y-4">
            <Card className="border-green-500/30 bg-green-500/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-green-300">Calculated Values</CardTitle>
                  <Badge className={getCurrentStatus().color}>
                    {getCurrentStatus().text}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-green-200 mb-4">
                  <strong>Formula used:</strong> {result.formula}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-green-200">Voltage:</span>
                    <span className="text-green-300 font-mono text-lg">{result.voltage?.toFixed(2)} V</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-200">Current:</span>
                    <span className="text-green-300 font-mono text-lg">{result.current?.toFixed(3)} A</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-200">Resistance:</span>
                    <span className="text-green-300 font-mono text-lg">{result.resistance?.toFixed(2)} Ω</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-200">Power:</span>
                    <span className="text-green-300 font-mono text-lg">{result.power?.toFixed(2)} W</span>
                  </div>
                </div>
                
                {result.currentAt230V && result.currentAt230V > 0 && (
                  <div className="pt-3 border-t border-green-500/30">
                    <div className="flex justify-between items-center">
                      <span className="text-green-200">Current at 230V:</span>
                      <span className="text-green-300 font-mono">{result.currentAt230V.toFixed(2)} A</span>
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
            
            {/* What this means panel */}
            <Card className="border-blue-500/30 bg-blue-500/5">
              <CardHeader>
                <CardTitle className="text-blue-300 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  What This Means
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-blue-200 space-y-2">
                  <p>• <strong>Current Rating:</strong> Cable and protection must handle {result.current?.toFixed(1)}A continuously</p>
                  <p>• <strong>Voltage Drop:</strong> Check cable length vs current for BS 7671 compliance (&lt;3% lighting, &lt;5% power)</p>
                  <p>• <strong>Protection:</strong> {result.protectionGuidance}</p>
                  {result.current && result.current > 16 && (
                    <p>• <strong>High Current Warning:</strong> Consider cable heating effects and derating factors</p>
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