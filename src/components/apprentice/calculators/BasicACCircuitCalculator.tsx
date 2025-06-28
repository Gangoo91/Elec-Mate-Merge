
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, RotateCcw, Info } from "lucide-react";

const BasicACCircuitCalculator = () => {
  const [circuitType, setCircuitType] = useState("");
  const [voltage, setVoltage] = useState("");
  const [resistance, setResistance] = useState("");
  const [reactance, setReactance] = useState("");
  const [frequency, setFrequency] = useState("50");
  const [inductance, setInductance] = useState("");
  const [capacitance, setCapacitance] = useState("");
  const [results, setResults] = useState<{
    impedance?: number;
    current?: number;
    phaseAngle?: number;
    activePower?: number;
    reactivePower?: number;
    apparentPower?: number;
    powerFactor?: number;
  } | null>(null);

  const calculateCircuit = () => {
    const V = parseFloat(voltage);
    const R = parseFloat(resistance) || 0;
    const f = parseFloat(frequency);
    let X = parseFloat(reactance) || 0;

    // Calculate reactance from component values if provided
    if (inductance && !reactance) {
      const L = parseFloat(inductance) / 1000; // Convert mH to H
      X = 2 * Math.PI * f * L; // Inductive reactance
    } else if (capacitance && !reactance) {
      const C = parseFloat(capacitance) / 1000000; // Convert µF to F
      X = -1 / (2 * Math.PI * f * C); // Capacitive reactance (negative)
    }

    if (!isNaN(V) && (!isNaN(R) || !isNaN(X))) {
      // Calculate impedance
      const Z = Math.sqrt(R * R + X * X);
      
      // Calculate current
      const I = V / Z;
      
      // Calculate phase angle
      const phaseAngle = Math.atan2(X, R) * (180 / Math.PI);
      
      // Calculate powers
      const activePower = I * I * R;
      const reactivePower = I * I * X;
      const apparentPower = V * I;
      const powerFactor = Math.cos(phaseAngle * Math.PI / 180);

      setResults({
        impedance: Z,
        current: I,
        phaseAngle: phaseAngle,
        activePower: activePower,
        reactivePower: Math.abs(reactivePower),
        apparentPower: apparentPower,
        powerFactor: Math.abs(powerFactor)
      });
    }
  };

  const resetCalculator = () => {
    setCircuitType("");
    setVoltage("");
    setResistance("");
    setReactance("");
    setFrequency("50");
    setInductance("");
    setCapacitance("");
    setResults(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Basic AC Circuit Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate impedance, current, and power in basic AC circuits
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="circuitType">Circuit Type</Label>
            <Select value={circuitType} onValueChange={setCircuitType}>
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                <SelectValue placeholder="Select circuit type" />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20">
                <SelectItem value="resistive">Pure Resistive</SelectItem>
                <SelectItem value="inductive">Resistive-Inductive (RL)</SelectItem>
                <SelectItem value="capacitive">Resistive-Capacitive (RC)</SelectItem>
                <SelectItem value="rlc">RLC Circuit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="voltage">Voltage (V RMS)</Label>
              <Input
                id="voltage"
                type="number"
                placeholder="230"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency (Hz)</Label>
              <Input
                id="frequency"
                type="number"
                placeholder="50"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="resistance">Resistance (Ω)</Label>
              <Input
                id="resistance"
                type="number"
                placeholder="10"
                value={resistance}
                onChange={(e) => setResistance(e.target.value)}
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reactance">Reactance (Ω) - Optional</Label>
              <Input
                id="reactance"
                type="number"
                placeholder="Enter directly or use L/C below"
                value={reactance}
                onChange={(e) => setReactance(e.target.value)}
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
          </div>

          {(circuitType === "inductive" || circuitType === "rlc") && (
            <div className="space-y-2">
              <Label htmlFor="inductance">Inductance (mH) - Optional</Label>
              <Input
                id="inductance"
                type="number"
                placeholder="100"
                value={inductance}
                onChange={(e) => setInductance(e.target.value)}
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
          )}

          {(circuitType === "capacitive" || circuitType === "rlc") && (
            <div className="space-y-2">
              <Label htmlFor="capacitance">Capacitance (µF) - Optional</Label>
              <Input
                id="capacitance"
                type="number"
                placeholder="100"
                value={capacitance}
                onChange={(e) => setCapacitance(e.target.value)}
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={calculateCircuit} className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
              Calculate Circuit
            </Button>
            <Button onClick={resetCalculator} variant="outline" size="icon">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {results && (
          <Card className="border-green-500/30 bg-green-500/5">
            <CardHeader>
              <CardTitle className="text-green-300">Circuit Results</CardTitle>
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
            </CardContent>
          </Card>
        )}

        <Card className="border-blue-500/30 bg-blue-500/5">
          <CardHeader>
            <CardTitle className="text-blue-300 flex items-center gap-2">
              <Info className="h-4 w-4" />
              AC Circuit Fundamentals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-blue-200">
              <h4 className="font-medium mb-2">Key Formulas:</h4>
              <ul className="space-y-1 text-blue-200/80">
                <li>• <strong>Impedance:</strong> Z = √(R² + X²)</li>
                <li>• <strong>Current:</strong> I = V / Z</li>
                <li>• <strong>Phase Angle:</strong> φ = arctan(X/R)</li>
                <li>• <strong>Inductive Reactance:</strong> XL = 2πfL</li>
                <li>• <strong>Capacitive Reactance:</strong> XC = 1/(2πfC)</li>
                <li>• <strong>Power Factor:</strong> cos(φ) = R/Z</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default BasicACCircuitCalculator;
