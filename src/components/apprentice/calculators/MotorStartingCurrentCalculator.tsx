
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, Info, Calculator, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const MotorStartingCurrentCalculator = () => {
  const [power, setPower] = useState<string>("");
  const [voltage, setVoltage] = useState<string>("400");
  const [efficiency, setEfficiency] = useState<string>("0.85");
  const [powerFactor, setPowerFactor] = useState<string>("0.85");
  const [startingMethod, setStartingMethod] = useState<string>("direct");
  const [phases, setPhases] = useState<string>("3");
  const [loadType, setLoadType] = useState<string>("standard");
  const [serviceTemperature, setServiceTemperature] = useState<string>("40");
  const [result, setResult] = useState<{
    fullLoadCurrent: number;
    startingCurrent: number;
    startingMultiplier: number;
    startingKva: number;
    thermalStress: number;
    protectionRecommendation: string;
    voltageDropEstimate: number;
    efficiencyAtStart: number;
    recommendations: string[];
  } | null>(null);

  const calculateStartingCurrent = () => {
    const P = parseFloat(power);
    const V = parseFloat(voltage);
    const eff = parseFloat(efficiency);
    const pf = parseFloat(powerFactor);
    const temp = parseFloat(serviceTemperature);

    if (P > 0 && V > 0 && eff > 0 && pf > 0) {
      // Calculate full load current based on phases
      const isThreePhase = phases === "3";
      const fullLoadCurrent = isThreePhase 
        ? (P * 1000) / (Math.sqrt(3) * V * eff * pf)
        : (P * 1000) / (V * eff * pf);
      
      // Enhanced starting current multipliers with load type consideration
      const baseMultipliers = {
        direct: 6.5,
        'star-delta': 2.1,
        'soft-starter': 3.2,
        'vfd': 1.5,
        'autotransformer': 4.0
      };

      // Load type factors
      const loadFactors = {
        standard: 1.0,
        'high-torque': 1.2,
        'low-torque': 0.9,
        centrifugal: 0.85
      };

      // Temperature correction (higher temp = lower efficiency)
      const tempFactor = temp > 40 ? 1 + (temp - 40) * 0.005 : 1;
      
      const baseMultiplier = baseMultipliers[startingMethod as keyof typeof baseMultipliers] || 6.5;
      const loadFactor = loadFactors[loadType as keyof typeof loadFactors] || 1.0;
      const startingMultiplier = baseMultiplier * loadFactor * tempFactor;
      const startingCurrent = fullLoadCurrent * startingMultiplier;

      // Calculate additional parameters
      const startingKva = isThreePhase 
        ? (Math.sqrt(3) * V * startingCurrent) / 1000
        : (V * startingCurrent) / 1000;

      // I²t thermal stress (simplified calculation)
      const thermalStress = Math.pow(startingCurrent, 2) * 2; // Assuming 2 second start time

      // Efficiency at starting (reduced due to slip)
      const efficiencyAtStart = eff * 0.3; // Typical starting efficiency

      // Voltage drop estimate (simplified)
      const voltageDropEstimate = (startingCurrent * 0.1 * 100) / V; // Assuming 0.1Ω line impedance

      // Protection recommendation
      let protectionRecommendation = "";
      if (startingCurrent > fullLoadCurrent * 8) {
        protectionRecommendation = "Consider MPCB or thermal overload protection";
      } else if (startingCurrent > fullLoadCurrent * 5) {
        protectionRecommendation = "Standard MCB with time delay suitable";
      } else {
        protectionRecommendation = "Standard MCB protection adequate";
      }

      // Generate recommendations
      const recommendations: string[] = [];
      
      if (voltageDropEstimate > 3) {
        recommendations.push("High voltage drop expected - consider larger cable or reduced starting method");
      }
      
      if (startingMethod === "direct" && P > 11) {
        recommendations.push("Consider soft starting for motors > 11kW to reduce supply impact");
      }
      
      if (temp > 50) {
        recommendations.push("High service temperature - ensure adequate ventilation and consider higher IP rating");
      }
      
      if (loadType === "high-torque") {
        recommendations.push("High torque load may require extended starting time - verify thermal capability");
      }

      if (recommendations.length === 0) {
        recommendations.push("Motor starting parameters within normal operating ranges");
      }

      setResult({
        fullLoadCurrent,
        startingCurrent,
        startingMultiplier,
        startingKva,
        thermalStress,
        protectionRecommendation,
        voltageDropEstimate,
        efficiencyAtStart,
        recommendations
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
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Motor Starting Current Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate starting current for three-phase motors based on power, efficiency, and starting method.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="power">Motor Power (kW)</Label>
              <Input
                id="power"
                type="number"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                placeholder="e.g., 15"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="voltage">Supply Voltage (V)</Label>
                <Select value={voltage} onValueChange={setVoltage}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/20">
                    <SelectItem value="230">230V (Single Phase)</SelectItem>
                    <SelectItem value="400">400V (3-Phase)</SelectItem>
                    <SelectItem value="415">415V (3-Phase)</SelectItem>
                    <SelectItem value="690">690V (3-Phase)</SelectItem>
                    <SelectItem value="1000">1000V (3-Phase)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="phases">Phases</Label>
                <Select value={phases} onValueChange={setPhases}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/20">
                    <SelectItem value="1">Single Phase</SelectItem>
                    <SelectItem value="3">Three Phase</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="efficiency">Motor Efficiency</Label>
              <Input
                id="efficiency"
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={efficiency}
                onChange={(e) => setEfficiency(e.target.value)}
                placeholder="e.g., 0.85"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="power-factor">Power Factor</Label>
              <Input
                id="power-factor"
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={powerFactor}
                onChange={(e) => setPowerFactor(e.target.value)}
                placeholder="e.g., 0.85"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="starting-method">Starting Method</Label>
              <Select value={startingMethod} onValueChange={setStartingMethod}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="direct">Direct On Line (DOL)</SelectItem>
                  <SelectItem value="star-delta">Star-Delta</SelectItem>
                  <SelectItem value="soft-starter">Soft Starter</SelectItem>
                  <SelectItem value="vfd">Variable Frequency Drive</SelectItem>
                  <SelectItem value="autotransformer">Auto-transformer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="load-type">Load Type</Label>
              <Select value={loadType} onValueChange={setLoadType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="standard">Standard Load</SelectItem>
                  <SelectItem value="high-torque">High Torque (Conveyors)</SelectItem>
                  <SelectItem value="low-torque">Low Torque (Fans)</SelectItem>
                  <SelectItem value="centrifugal">Centrifugal Pumps</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="service-temperature">Service Temperature (°C)</Label>
              <Input
                id="service-temperature"
                type="number"
                value={serviceTemperature}
                onChange={(e) => setServiceTemperature(e.target.value)}
                placeholder="e.g., 40"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculateStartingCurrent} className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate
              </Button>
              <Button variant="outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-4">
            <div className="rounded-md bg-elec-dark p-6 min-h-[400px]">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Motor Starting Analysis</h3>
                    <Badge variant="secondary" className="mb-4">
                      {phases === "3" ? "3-Phase" : "Single Phase"} • {startingMethod.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 text-sm">
                    <div className="bg-elec-gray/50 p-3 rounded-lg">
                      <span className="text-muted-foreground text-xs block mb-1">Full Load Current:</span>
                      <div className="font-mono text-elec-yellow text-xl sm:text-lg">{result.fullLoadCurrent.toFixed(2)} A</div>
                    </div>
                    
                    <div className="bg-elec-gray/50 p-3 rounded-lg">
                      <span className="text-muted-foreground text-xs block mb-1">Starting Current:</span>
                      <div className="font-mono text-elec-yellow text-xl sm:text-lg">{result.startingCurrent.toFixed(2)} A</div>
                    </div>
                    
                    <div className="bg-elec-gray/50 p-3 rounded-lg">
                      <span className="text-muted-foreground text-xs block mb-1">Starting kVA:</span>
                      <div className="font-mono text-elec-yellow text-lg">{result.startingKva.toFixed(1)} kVA</div>
                    </div>
                    
                    <div className="bg-elec-gray/50 p-3 rounded-lg">
                      <span className="text-muted-foreground text-xs block mb-1">Multiplier:</span>
                      <div className="font-mono text-elec-yellow text-lg">{result.startingMultiplier.toFixed(1)}x</div>
                    </div>

                    <div className="bg-elec-gray/50 p-3 rounded-lg">
                      <span className="text-muted-foreground text-xs block mb-1">Voltage Drop Est.:</span>
                      <div className={`font-mono text-lg ${result.voltageDropEstimate > 3 ? 'text-red-400' : 'text-green-400'}`}>
                        {result.voltageDropEstimate.toFixed(1)}%
                      </div>
                    </div>

                    <div className="bg-elec-gray/50 p-3 rounded-lg">
                      <span className="text-muted-foreground text-xs block mb-1">I²t Thermal:</span>
                      <div className="font-mono text-elec-yellow text-lg">{(result.thermalStress / 1000).toFixed(1)}k A²s</div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2 bg-elec-gray/30 p-3 rounded-lg">
                    <div className="text-sm">
                      <span className="text-muted-foreground text-xs block mb-1">Protection Recommendation:</span>
                      <div className="text-elec-yellow text-sm">{result.protectionRecommendation}</div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2 bg-elec-gray/30 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-elec-yellow">Recommendations:</h4>
                    <ul className="text-xs text-muted-foreground space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-elec-yellow mr-2 mt-0.5">•</span>
                          <span className="flex-1">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="text-xs text-muted-foreground mt-4 border-t border-elec-yellow/20 pt-3 space-y-1">
                    <div>Calculation: I = P / ({phases === "3" ? "√3 × " : ""}V × η × cos φ)</div>
                    <div>Starting factors include load type and temperature corrections</div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-6 text-center">
                  <Zap className="h-12 w-12 text-elec-yellow/30 mb-3" />
                  <p>Enter motor details to calculate starting current and analysis</p>
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                Enhanced calculation includes load type, temperature, and supply impact considerations for BS 7671 compliance.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotorStartingCurrentCalculator;
