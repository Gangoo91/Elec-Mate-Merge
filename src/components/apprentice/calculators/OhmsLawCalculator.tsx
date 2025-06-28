
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Zap } from "lucide-react";

const OhmsLawCalculator = () => {
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("");
  const [calculationType, setCalculationType] = useState<"find-voltage" | "find-current" | "find-resistance">("find-voltage");
  const [result, setResult] = useState<{
    value: number;
    unit: string;
    formula: string;
  } | null>(null);

  const calculateOhmsLaw = () => {
    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const R = parseFloat(resistance);

    let calculatedValue: number;
    let unit: string;
    let formula: string;

    switch (calculationType) {
      case "find-voltage":
        if (!current || !resistance) return;
        calculatedValue = I * R;
        unit = "V";
        formula = `V = I × R = ${I} × ${R}`;
        break;
      case "find-current":
        if (!voltage || !resistance) return;
        calculatedValue = V / R;
        unit = "A";
        formula = `I = V ÷ R = ${V} ÷ ${R}`;
        break;
      case "find-resistance":
        if (!voltage || !current) return;
        calculatedValue = V / I;
        unit = "Ω";
        formula = `R = V ÷ I = ${V} ÷ ${I}`;
        break;
      default:
        return;
    }

    setResult({
      value: calculatedValue,
      unit,
      formula
    });
  };

  const clearInputs = () => {
    setVoltage("");
    setCurrent("");
    setResistance("");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Ohm's Law Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate voltage, current, or resistance using Ohm's Law (V = I × R)
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>What do you want to find?</Label>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant={calculationType === "find-voltage" ? "default" : "outline"}
                  onClick={() => {
                    setCalculationType("find-voltage");
                    clearInputs();
                  }}
                  className="text-left justify-start"
                >
                  Find Voltage (V = I × R)
                </Button>
                <Button
                  variant={calculationType === "find-current" ? "default" : "outline"}
                  onClick={() => {
                    setCalculationType("find-current");
                    clearInputs();
                  }}
                  className="text-left justify-start"
                >
                  Find Current (I = V ÷ R)
                </Button>
                <Button
                  variant={calculationType === "find-resistance" ? "default" : "outline"}
                  onClick={() => {
                    setCalculationType("find-resistance");
                    clearInputs();
                  }}
                  className="text-left justify-start"
                >
                  Find Resistance (R = V ÷ I)
                </Button>
              </div>
            </div>

            {calculationType !== "find-voltage" && (
              <div className="space-y-2">
                <Label htmlFor="voltage">Voltage (V)</Label>
                <Input
                  id="voltage"
                  type="number"
                  value={voltage}
                  onChange={(e) => setVoltage(e.target.value)}
                  placeholder="e.g. 230"
                />
              </div>
            )}

            {calculationType !== "find-current" && (
              <div className="space-y-2">
                <Label htmlFor="current">Current (A)</Label>
                <Input
                  id="current"
                  type="number"
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  placeholder="e.g. 10"
                />
              </div>
            )}

            {calculationType !== "find-resistance" && (
              <div className="space-y-2">
                <Label htmlFor="resistance">Resistance (Ω)</Label>
                <Input
                  id="resistance"
                  type="number"
                  value={resistance}
                  onChange={(e) => setResistance(e.target.value)}
                  placeholder="e.g. 23"
                />
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculateOhmsLaw} className="flex-1">
                Calculate
              </Button>
              <Button onClick={clearInputs} variant="outline">
                Clear
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {result ? (
              <Card className="border-green-500/30 bg-green-500/5">
                <CardHeader>
                  <CardTitle className="text-green-300 text-lg">Result</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center">
                    <div className="text-green-300 font-mono text-3xl font-bold">
                      {result.value.toFixed(2)} {result.unit}
                    </div>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                    <div className="text-blue-300 text-sm font-medium">Formula Used</div>
                    <div className="text-blue-200 text-sm mt-1 font-mono">{result.formula}</div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                <CardContent className="pt-6">
                  <div className="text-center text-elec-yellow/80">
                    <Zap className="h-8 w-8 mx-auto mb-2" />
                    <p>Enter values to calculate</p>
                    <div className="mt-4 text-xs space-y-1">
                      <p><strong>Ohm's Law:</strong> V = I × R</p>
                      <p>Where V = Voltage, I = Current, R = Resistance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardHeader>
                <CardTitle className="text-blue-300 text-sm">Quick Reference</CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2">
                <div><strong>V (Voltage):</strong> Measured in Volts (V)</div>
                <div><strong>I (Current):</strong> Measured in Amperes (A)</div>
                <div><strong>R (Resistance):</strong> Measured in Ohms (Ω)</div>
                <div className="pt-2 border-t border-blue-500/20">
                  <strong>Common UK Values:</strong>
                  <div>• Domestic supply: 230V</div>
                  <div>• 3-phase supply: 400V</div>
                  <div>• Socket outlet: 13A max</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OhmsLawCalculator;
