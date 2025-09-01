import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Zap, RotateCcw, Info, AlertTriangle, BookOpen, Activity } from "lucide-react";

const BasicACCircuitCalculator = () => {
  const [circuitType, setCircuitType] = useState("");
  const [voltage, setVoltage] = useState("");
  const [resistance, setResistance] = useState("");
  const [reactance, setReactance] = useState("");
  const [frequency, setFrequency] = useState("50");
  const [inductance, setInductance] = useState("");
  const [capacitance, setCapacitance] = useState("");
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [results, setResults] = useState<{
    impedance?: number;
    current?: number;
    phaseAngle?: number;
    activePower?: number;
    reactivePower?: number;
    apparentPower?: number;
    powerFactor?: number;
    leadLag?: string;
    xrRatio?: number;
    resonantFreq?: number;
    qFactor?: number;
    protectiveDeviceRange?: string;
  } | null>(null);

  const validateInputs = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!voltage || parseFloat(voltage) <= 0) {
      newErrors.voltage = "Valid voltage required";
    }
    if (!resistance && !reactance && !inductance && !capacitance) {
      newErrors.general = "Enter at least one circuit parameter (R, X, L, or C)";
    }
    if (frequency && (parseFloat(frequency) <= 0 || parseFloat(frequency) > 1000)) {
      newErrors.frequency = "Frequency must be between 0 and 1000 Hz";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateCircuit = () => {
    if (!validateInputs()) return;
    
    const V = parseFloat(voltage);
    const R = parseFloat(resistance) || 0;
    const f = parseFloat(frequency);
    let X = parseFloat(reactance) || 0;
    let XL = 0, XC = 0;

    // Calculate reactance from component values if provided
    if (inductance && !reactance) {
      const L = parseFloat(inductance) / 1000; // Convert mH to H
      XL = 2 * Math.PI * f * L; // Inductive reactance
      X = XL;
    }
    if (capacitance && !reactance) {
      const C = parseFloat(capacitance) / 1000000; // Convert µF to F
      XC = 1 / (2 * Math.PI * f * C); // Capacitive reactance
      X = -XC; // Negative for capacitive
    }
    
    // For RLC circuits, combine both
    if (inductance && capacitance) {
      const L = parseFloat(inductance) / 1000;
      const C = parseFloat(capacitance) / 1000000;
      XL = 2 * Math.PI * f * L;
      XC = 1 / (2 * Math.PI * f * C);
      X = XL - XC; // Net reactance
    }

    // Calculate impedance
    const Z = Math.sqrt(R * R + X * X);
    
    // Calculate current
    const I = V / Z;
    
    // Calculate phase angle
    const phaseAngle = Math.atan2(X, R) * (180 / Math.PI);
    
    // Determine lead/lag
    const leadLag = X > 0 ? "Current lags voltage (Inductive)" : 
                   X < 0 ? "Current leads voltage (Capacitive)" : 
                   "Resistive (In phase)";
    
    // Calculate X/R ratio
    const xrRatio = R > 0 ? Math.abs(X) / R : Infinity;
    
    // Calculate powers
    const activePower = I * I * R;
    const reactivePower = I * I * Math.abs(X);
    const apparentPower = V * I;
    const powerFactor = Math.abs(Math.cos(phaseAngle * Math.PI / 180));
    
    // Calculate resonant frequency for RLC
    let resonantFreq = 0;
    let qFactor = 0;
    if (inductance && capacitance) {
      const L = parseFloat(inductance) / 1000;
      const C = parseFloat(capacitance) / 1000000;
      resonantFreq = 1 / (2 * Math.PI * Math.sqrt(L * C));
      qFactor = R > 0 ? (1 / R) * Math.sqrt(L / C) : 0;
    }
    
    // Protective device range (advisory)
    const protectiveDeviceRange = I <= 6 ? "6A MCB" : 
                                 I <= 10 ? "10A MCB" : 
                                 I <= 16 ? "16A MCB" : 
                                 I <= 32 ? "32A MCB" : "Consider larger protection";

    setResults({
      impedance: Z,
      current: I,
      phaseAngle: phaseAngle,
      activePower: activePower,
      reactivePower: reactivePower,
      apparentPower: apparentPower,
      powerFactor: powerFactor,
      leadLag: leadLag,
      xrRatio: xrRatio,
      resonantFreq: resonantFreq,
      qFactor: qFactor,
      protectiveDeviceRange: protectiveDeviceRange
    });
    setErrors({});
  };

  const resetCalculator = () => {
    setCircuitType("");
    setVoltage("");
    setResistance("");
    setReactance("");
    setFrequency("50");
    setInductance("");
    setCapacitance("");
    setErrors({});
    setResults(null);
  };

  const getCircuitStatus = () => {
    if (!results) return { text: "Enter values", color: "text-muted-foreground" };
    if (results.resonantFreq && Math.abs(parseFloat(frequency) - results.resonantFreq) < 5) {
      return { text: "Near Resonance", color: "text-red-400" };
    }
    if (results.xrRatio && results.xrRatio > 10) {
      return { text: "Highly Reactive", color: "text-yellow-400" };
    }
    if (results.powerFactor && results.powerFactor > 0.9) {
      return { text: "Good PF", color: "text-green-400" };
    }
    return { text: "Standard Circuit", color: "text-blue-400" };
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Basic AC Circuit Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate impedance, current, and power in AC circuits with reactive components
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MobileSelect value={circuitType} onValueChange={setCircuitType}>
              <MobileSelectTrigger label="Circuit Type">
                <MobileSelectValue placeholder="Select circuit type" />
              </MobileSelectTrigger>
              <MobileSelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
                <MobileSelectItem value="resistive">Pure Resistive</MobileSelectItem>
                <MobileSelectItem value="inductive">Resistive-Inductive (RL)</MobileSelectItem>
                <MobileSelectItem value="capacitive">Resistive-Capacitive (RC)</MobileSelectItem>
                <MobileSelectItem value="rlc">RLC Circuit</MobileSelectItem>
              </MobileSelectContent>
            </MobileSelect>
            
            <MobileSelect value={frequency} onValueChange={setFrequency}>
              <MobileSelectTrigger label="Frequency">
                <MobileSelectValue />
              </MobileSelectTrigger>
              <MobileSelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
                <MobileSelectItem value="50">50 Hz (UK Standard)</MobileSelectItem>
                <MobileSelectItem value="60">60 Hz</MobileSelectItem>
                <MobileSelectItem value="400">400 Hz (Aircraft)</MobileSelectItem>
              </MobileSelectContent>
            </MobileSelect>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MobileInput
              label="Voltage (V RMS)"
              type="number"
              placeholder="230"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              unit="V"
              error={errors.voltage}
              clearError={() => setErrors(prev => ({ ...prev, voltage: "" }))}
              hint="UK domestic: 230V"
            />
            <MobileInput
              label="Resistance (Ω)"
              type="number"
              placeholder="10"
              value={resistance}
              onChange={(e) => setResistance(e.target.value)}
              unit="Ω"
              hint="Real component"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MobileInput
              label="Reactance (Ω) - Optional"
              type="number"
              placeholder="Enter directly or use L/C below"
              value={reactance}
              onChange={(e) => setReactance(e.target.value)}
              unit="Ω"
              hint="+ for inductive, - for capacitive"
            />
          </div>

          {(circuitType === "inductive" || circuitType === "rlc") && (
            <MobileInput
              label="Inductance (mH)"
              type="number"
              placeholder="100"
              value={inductance}
              onChange={(e) => setInductance(e.target.value)}
              unit="mH"
              hint="Will calculate XL = 2πfL"
            />
          )}

          {(circuitType === "capacitive" || circuitType === "rlc") && (
            <MobileInput
              label="Capacitance (µF)"
              type="number"
              placeholder="100"
              value={capacitance}
              onChange={(e) => setCapacitance(e.target.value)}
              unit="µF"
              hint="Will calculate XC = 1/(2πfC)"
            />
          )}
          
          {errors.general && (
            <Alert className="border-red-500/30 bg-red-500/10">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-200">{errors.general}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            <MobileButton onClick={calculateCircuit} variant="elec" className="flex-1">
              <Activity className="h-4 w-4 mr-2" />
              Calculate Circuit
            </MobileButton>
            <MobileButton onClick={resetCalculator} variant="elec-outline">
              <RotateCcw className="h-4 w-4" />
            </MobileButton>
          </div>
        </div>

        {results && (
          <div className="space-y-4">
            <Card className="border-green-500/30 bg-green-500/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-green-300">Circuit Results</CardTitle>
                  <Badge className={getCircuitStatus().color}>
                    {getCircuitStatus().text}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-green-200">Impedance (Z):</span>
                    <span className="text-green-300 font-mono">{results.impedance?.toFixed(2)} Ω</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-200">Current (I):</span>
                    <span className="text-green-300 font-mono">{results.current?.toFixed(3)} A</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-200">Phase Angle:</span>
                    <span className="text-green-300 font-mono">{results.phaseAngle?.toFixed(1)}°</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-200">Power Factor:</span>
                    <span className="text-green-300 font-mono">{results.powerFactor?.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-200">Active Power:</span>
                    <span className="text-green-300 font-mono">{results.activePower?.toFixed(2)} W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-200">Reactive Power:</span>
                    <span className="text-green-300 font-mono">{results.reactivePower?.toFixed(2)} VAr</span>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-green-500/30 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-green-200">Circuit Type:</span>
                    <span className="text-green-300">{results.leadLag}</span>
                  </div>
                  {results.xrRatio !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-green-200">X/R Ratio:</span>
                      <span className="text-green-300 font-mono">{results.xrRatio.toFixed(2)}</span>
                    </div>
                  )}
                  {results.resonantFreq && results.resonantFreq > 0 && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-green-200">Resonant Freq:</span>
                        <span className="text-green-300 font-mono">{results.resonantFreq.toFixed(1)} Hz</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-200">Q Factor:</span>
                        <span className="text-green-300 font-mono">{results.qFactor?.toFixed(1)}</span>
                      </div>
                    </>
                  )}
                </div>
                
                {results.resonantFreq && Math.abs(parseFloat(frequency) - results.resonantFreq) < 10 && (
                  <Alert className="border-red-500/30 bg-red-500/10">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <AlertDescription className="text-red-200">
                      Warning: Operating near resonant frequency ({results.resonantFreq.toFixed(1)} Hz) - High currents possible!
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="pt-2 border-t border-green-500/30">
                  <p className="text-xs text-green-200">
                    <strong>Indicative Protection:</strong> {results.protectiveDeviceRange} (advisory only)
                  </p>
                </div>
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
                  <p>• <strong>Circuit Behaviour:</strong> {results.leadLag}</p>
                  <p>• <strong>X/R Ratio:</strong> {results.xrRatio && results.xrRatio > 5 ? "Highly reactive - consider power factor correction" : "Reasonable reactive component"}</p>
                  {results.resonantFreq && (
                    <p>• <strong>Resonance:</strong> Avoid operating at {results.resonantFreq.toFixed(1)} Hz - can cause excessive currents and voltage stress</p>
                  )}
                  <p>• <strong>Power Factor:</strong> {results.powerFactor && results.powerFactor < 0.8 ? "Poor PF may increase energy costs" : "Acceptable power factor"}</p>
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
                  <p>• <strong>512.1.2:</strong> Equipment selection must consider voltage, current, frequency and power factor</p>
                  <p>• <strong>525:</strong> Voltage drop calculations must include reactive components</p>
                  <p>• <strong>331:</strong> Equipment suitability for AC circuits and harmonic distortion</p>
                  <p>• <strong>534:</strong> Transient overvoltages - consider resonance effects in reactive circuits</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BasicACCircuitCalculator;