
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Zap, RotateCcw, Info, Calculator, Battery, AlertTriangle, ChevronDown, BookOpen } from "lucide-react";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";

const ACPowerCalculator = () => {
  const [phaseSystem, setPhaseSystem] = useState("single");
  const [voltage, setVoltage] = useState("");
  const [voltageType, setVoltageType] = useState("L-N");
  const [current, setCurrent] = useState("");
  const [currentType, setCurrentType] = useState("line");
  const [powerFactor, setPowerFactor] = useState("");
  const [pfType, setPfType] = useState("lagging");
  const [frequency, setFrequency] = useState("50");
  const [efficiency, setEfficiency] = useState("");
  const [activePower, setActivePower] = useState("");
  const [reactivePower, setReactivePower] = useState("");
  const [apparentPower, setApparentPower] = useState("");
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [results, setResults] = useState<{
    activePower?: number;
    reactivePower?: number;
    apparentPower?: number;
    powerFactor?: number;
    phaseAngle?: number;
    current?: number;
    currentAtUnity?: number;
    efficiency?: number;
    protectiveDeviceRange?: string;
  } | null>(null);

  const validateInputs = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!voltage || parseFloat(voltage) <= 0) {
      newErrors.voltage = "Valid voltage required";
    }
    if (!current || parseFloat(current) <= 0) {
      newErrors.current = "Valid current required";
    }
    if (powerFactor && (parseFloat(powerFactor) <= 0 || parseFloat(powerFactor) > 1)) {
      newErrors.powerFactor = "Power factor must be between 0 and 1";
    }
    if (efficiency && (parseFloat(efficiency) <= 0 || parseFloat(efficiency) > 100)) {
      newErrors.efficiency = "Efficiency must be between 0 and 100%";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePower = () => {
    if (!validateInputs()) return;
    
    let V = parseFloat(voltage);
    let I = parseFloat(current);
    const pf = parseFloat(powerFactor) || 1;
    const eff = parseFloat(efficiency) || 100;
    const f = parseFloat(frequency);
    
    // Normalize voltage to line-to-neutral for single phase or line-to-line for 3-phase
    if (phaseSystem === "single" && voltageType === "L-L") {
      V = V / Math.sqrt(3); // Convert L-L to L-N for single phase equivalent
    }
    if (phaseSystem === "three" && voltageType === "L-N") {
      V = V * Math.sqrt(3); // Convert L-N to L-L for 3-phase
    }
    
    // Calculate power values
    let S, P, Q, phaseAngle;
    
    if (phaseSystem === "single") {
      S = V * I;
      P = S * pf;
      phaseAngle = Math.acos(pf) * (180 / Math.PI);
      Q = S * Math.sin(Math.acos(pf));
      if (pfType === "leading") Q = -Q;
    } else {
      // Three-phase calculations
      S = Math.sqrt(3) * V * I;
      P = S * pf;
      phaseAngle = Math.acos(pf) * (180 / Math.PI);
      Q = S * Math.sin(Math.acos(pf));
      if (pfType === "leading") Q = -Q;
    }
    
    // Calculate current at unity power factor for comparison
    const currentAtUnity = P / (phaseSystem === "single" ? V : Math.sqrt(3) * V);
    
    // Estimate protective device range (advisory only)
    const protectiveDeviceRange = I <= 6 ? "6A MCB" : 
                                 I <= 10 ? "10A MCB" : 
                                 I <= 16 ? "16A MCB" : 
                                 I <= 32 ? "32A MCB" : 
                                 I <= 63 ? "63A MCB" : "Consider larger protection";
    
    setResults({
      activePower: P,
      reactivePower: Math.abs(Q),
      apparentPower: S,
      powerFactor: pf,
      phaseAngle: phaseAngle,
      current: I,
      currentAtUnity: currentAtUnity,
      efficiency: eff,
      protectiveDeviceRange: protectiveDeviceRange
    });
  };

  const calculateFromPowers = () => {
    const P = parseFloat(activePower);
    const Q = parseFloat(reactivePower);

    if (!isNaN(P) && !isNaN(Q)) {
      const S = Math.sqrt(P * P + Q * Q);
      const pf = P / S;
      const phaseAngle = Math.atan(Q / P) * (180 / Math.PI);

      setResults({
        activePower: P,
        reactivePower: Q,
        apparentPower: S,
        powerFactor: pf,
        phaseAngle: phaseAngle
      });
    } else if (!isNaN(P)) {
      const S = parseFloat(apparentPower);
      if (!isNaN(S)) {
        const pf = P / S;
        const Q = Math.sqrt(S * S - P * P);
        const phaseAngle = Math.acos(pf) * (180 / Math.PI);

        setResults({
          activePower: P,
          reactivePower: Q,
          apparentPower: S,
          powerFactor: pf,
          phaseAngle: phaseAngle
        });
      }
    }
  };

  const resetCalculator = () => {
    setPhaseSystem("single");
    setVoltage("");
    setVoltageType("L-N");
    setCurrent("");
    setCurrentType("line");
    setPowerFactor("");
    setPfType("lagging");
    setFrequency("50");
    setEfficiency("");
    setActivePower("");
    setReactivePower("");
    setApparentPower("");
    setErrors({});
    setResults(null);
  };

  const getPowerFactorStatus = () => {
    if (!results?.powerFactor) return { text: "Unknown", color: "text-muted-foreground" };
    const pf = results.powerFactor;
    if (pf >= 0.95) return { text: "Excellent", color: "text-green-400" };
    if (pf >= 0.85) return { text: "Good", color: "text-yellow-400" };
    return { text: "Poor - Correction needed", color: "text-red-400" };
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>AC Power Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate AC power relationships: Active (P), Reactive (Q), and Apparent (S) power
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MobileSelect value={phaseSystem} onValueChange={setPhaseSystem}>
              <MobileSelectTrigger label="System Type">
                <MobileSelectValue placeholder="Select system" />
              </MobileSelectTrigger>
              <MobileSelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
                <MobileSelectItem value="single">Single Phase</MobileSelectItem>
                <MobileSelectItem value="three">Three Phase</MobileSelectItem>
              </MobileSelectContent>
            </MobileSelect>
            
            <MobileSelect value={frequency} onValueChange={setFrequency}>
              <MobileSelectTrigger label="Frequency">
                <MobileSelectValue placeholder="Select frequency" />
              </MobileSelectTrigger>
              <MobileSelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
                <MobileSelectItem value="50">50 Hz (UK Standard)</MobileSelectItem>
                <MobileSelectItem value="60">60 Hz</MobileSelectItem>
              </MobileSelectContent>
            </MobileSelect>
          </div>
        </div>

        <DropdownTabs
          placeholder="Select calculation method"
          tabs={[
            {
              value: "voltage-current",
              label: "From V & I",
              icon: Calculator,
              content: (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MobileInput
                      label={`Voltage (${voltageType})`}
                      type="number"
                      placeholder={phaseSystem === "single" ? "230" : "400"}
                      value={voltage}
                      onChange={(e) => setVoltage(e.target.value)}
                      unit="V"
                      error={errors.voltage}
                      clearError={() => setErrors(prev => ({ ...prev, voltage: "" }))}
                    />
                    <MobileSelect value={voltageType} onValueChange={setVoltageType}>
                      <MobileSelectTrigger label="Voltage Type">
                        <MobileSelectValue />
                      </MobileSelectTrigger>
                      <MobileSelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
                        <MobileSelectItem value="L-N">Line to Neutral</MobileSelectItem>
                        {phaseSystem === "three" && <MobileSelectItem value="L-L">Line to Line</MobileSelectItem>}
                      </MobileSelectContent>
                    </MobileSelect>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MobileInput
                      label={`Current (${currentType})`}
                      type="number"
                      placeholder="10"
                      value={current}
                      onChange={(e) => setCurrent(e.target.value)}
                      unit="A"
                      error={errors.current}
                      clearError={() => setErrors(prev => ({ ...prev, current: "" }))}
                    />
                    <MobileSelect value={currentType} onValueChange={setCurrentType}>
                      <MobileSelectTrigger label="Current Type">
                        <MobileSelectValue />
                      </MobileSelectTrigger>
                      <MobileSelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
                        <MobileSelectItem value="line">Line Current</MobileSelectItem>
                        {phaseSystem === "three" && <MobileSelectItem value="phase">Phase Current</MobileSelectItem>}
                      </MobileSelectContent>
                    </MobileSelect>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MobileInput
                      label="Power Factor"
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      placeholder="0.85"
                      value={powerFactor}
                      onChange={(e) => setPowerFactor(e.target.value)}
                      error={errors.powerFactor}
                      clearError={() => setErrors(prev => ({ ...prev, powerFactor: "" }))}
                    />
                    <MobileSelect value={pfType} onValueChange={setPfType}>
                      <MobileSelectTrigger label="PF Type">
                        <MobileSelectValue />
                      </MobileSelectTrigger>
                      <MobileSelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
                        <MobileSelectItem value="lagging">Lagging (Inductive)</MobileSelectItem>
                        <MobileSelectItem value="leading">Leading (Capacitive)</MobileSelectItem>
                      </MobileSelectContent>
                    </MobileSelect>
                  </div>
                  
                  <MobileInput
                    label="Efficiency (%) - Optional"
                    type="number"
                    placeholder="90"
                    value={efficiency}
                    onChange={(e) => setEfficiency(e.target.value)}
                    unit="%"
                    error={errors.efficiency}
                    clearError={() => setErrors(prev => ({ ...prev, efficiency: "" }))}
                  />
                  
                  <div className="flex gap-2">
                    <MobileButton onClick={calculatePower} variant="elec" className="flex-1">
                      Calculate Power
                    </MobileButton>
                    <MobileButton onClick={resetCalculator} variant="elec-outline">
                      <RotateCcw className="h-4 w-4" />
                    </MobileButton>
                  </div>
                </div>
              )
            },
            {
              value: "power-components",
              label: "From Power Components",
              icon: Battery,
              content: (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <MobileInput
                      label="Active Power (W)"
                      type="number"
                      placeholder="1000"
                      value={activePower}
                      onChange={(e) => setActivePower(e.target.value)}
                      unit="W"
                    />
                    <MobileInput
                      label="Reactive Power (VAr)"
                      type="number"
                      placeholder="750"
                      value={reactivePower}
                      onChange={(e) => setReactivePower(e.target.value)}
                      unit="VAr"
                    />
                    <MobileInput
                      label="Apparent Power (VA)"
                      type="number"
                      placeholder="1250"
                      value={apparentPower}
                      onChange={(e) => setApparentPower(e.target.value)}
                      unit="VA"
                    />
                  </div>
                  <div className="flex gap-2">
                    <MobileButton onClick={calculateFromPowers} variant="elec" className="flex-1">
                      Calculate from Powers
                    </MobileButton>
                    <MobileButton onClick={resetCalculator} variant="elec-outline">
                      <RotateCcw className="h-4 w-4" />
                    </MobileButton>
                  </div>
                </div>
              )
            }
          ]}
        />

        {results && (
          <div className="space-y-4">
            <Card className="border-green-500/30 bg-green-500/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-green-300">Power Results</CardTitle>
                  <Badge className={getPowerFactorStatus().color}>
                    {getPowerFactorStatus().text}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-green-500/20 pb-2">
                    <span className="text-green-200 text-sm">Active Power (P):</span>
                    <span className="text-green-300 font-mono text-lg font-bold">{results.activePower?.toFixed(2)} W</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-green-500/20 pb-2">
                    <span className="text-green-200 text-sm">Reactive Power (Q):</span>
                    <span className="text-green-300 font-mono text-lg font-bold">{results.reactivePower?.toFixed(2)} VAr</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-green-500/20 pb-2">
                    <span className="text-green-200 text-sm">Apparent Power (S):</span>
                    <span className="text-green-300 font-mono text-lg font-bold">{results.apparentPower?.toFixed(2)} VA</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-green-500/20 pb-2">
                    <span className="text-green-200 text-sm">Power Factor:</span>
                    <span className="text-green-300 font-mono text-lg font-bold">{results.powerFactor?.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-green-500/20 pb-2">
                    <span className="text-green-200 text-sm">Phase Angle:</span>
                    <span className="text-green-300 font-mono text-lg font-bold">{results.phaseAngle?.toFixed(1)}°</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-200 text-sm">Current at Unity PF:</span>
                    <span className="text-green-300 font-mono text-lg font-bold">{results.currentAtUnity?.toFixed(2)} A</span>
                  </div>
                </div>
                
                {results.currentAtUnity && results.current && (
                  <Alert className="border-yellow-500/30 bg-yellow-500/10">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <AlertDescription className="text-yellow-200">
                      Current reduction with unity PF: {((results.current - results.currentAtUnity) / results.current * 100).toFixed(1)}% lower
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="pt-2 border-t border-green-500/30">
                  <p className="text-xs text-green-200">
                    <strong>Indicative Protection:</strong> {results.protectiveDeviceRange} (advisory only - verify with design calculations)
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
                  <p>• <strong>Power Factor Impact:</strong> Lower PF means higher current for same power output, increasing energy costs and cable losses</p>
                  <p>• <strong>Current Difference:</strong> At unity PF, current would be {results.currentAtUnity?.toFixed(1)}A vs actual {results.current?.toFixed(1)}A</p>
                  <p>• <strong>Energy Efficiency:</strong> {results.powerFactor && results.powerFactor >= 0.95 ? "Excellent efficiency - minimal reactive power" : "Consider power factor correction to reduce kVA demand"}</p>
                  {phaseSystem === "three" && <p>• <strong>Three-Phase:</strong> Balanced loading assumed - check individual phases for unbalance</p>}
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
                  <p>• <strong>Part 5 (Selection):</strong> Equipment rated for actual kVA, not just kW</p>
                  <p>• <strong>Voltage Drop:</strong> Calculate using apparent power and actual current</p>
                  <p>• <strong>Protection:</strong> Overcurrent devices sized for line current, not reduced current</p>
                  <p>• <strong>Thermal Effects:</strong> Conductor sizing based on design current including power factor</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Card className="border-blue-500/30 bg-blue-500/5">
          <CardHeader>
            <CardTitle className="text-blue-300 flex items-center gap-2">
              <Info className="h-4 w-4" />
              AC Power Relationships
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-blue-200">
              <h4 className="font-medium mb-2">Power Triangle:</h4>
              <ul className="space-y-1 text-blue-200/80">
                <li>• <strong>Active Power (P)</strong> - Real power that does work (Watts)</li>
                <li>• <strong>Reactive Power (Q)</strong> - Power stored/returned by reactive components (VAr)</li>
                <li>• <strong>Apparent Power (S)</strong> - Total power supplied by source (VA)</li>
                <li>• <strong>S² = P² + Q²</strong> (Pythagorean relationship)</li>
                <li>• <strong>Power Factor = P/S = cos(φ)</strong></li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default ACPowerCalculator;
