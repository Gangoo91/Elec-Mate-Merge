
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Zap } from "lucide-react";

const BasicWattageCalculator = () => {
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [power, setPower] = useState("");
  const [calculationType, setCalculationType] = useState<"find-power" | "find-voltage" | "find-current">("find-power");
  const [result, setResult] = useState<{
    value: number;
    unit: string;
    formula: string;
  } | null>(null);

  const calculateWattage = () => {
    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const P = parseFloat(power);

    let calculatedValue: number;
    let unit: string;
    let formula: string;

    switch (calculationType) {
      case "find-power":
        if (!voltage || !current) return;
        calculatedValue = V * I;
        unit = "W";
        formula = `P = V × I = ${V} × ${I}`;
        break;
      case "find-voltage":
        if (!power || !current) return;
        calculatedValue = P / I;
        unit = "V";
        formula = `V = P ÷ I = ${P} ÷ ${I}`;
        break;
      case "find-current":
        if (!power || !voltage) return;
        calculatedValue = P / V;
        unit = "A";
        formula = `I = P ÷ V = ${P} ÷ ${V}`;
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

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Basic Wattage Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate power, voltage, or current using basic electrical relationships
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>What do you want to find?</Label>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant={calculationType === "find-power" ? "default" : "outline"}
                  onClick={() => setCalculationType("find-power")}
                  className="text-left justify-start"
                >
                  Find Power (P = V × I)
                </Button>
                <Button
                  variant={calculationType === "find-voltage" ? "default" : "outline"}
                  onClick={() => setCalculationType("find-voltage")}
                  className="text-left justify-start"
                >
                  Find Voltage (V = P ÷ I)
                </Button>
                <Button
                  variant={calculationType === "find-current" ? "default" : "outline"}
                  onClick={() => setCalculationType("find-current")}
                  className="text-left justify-start"
                >
                  Find Current (I = P ÷ V)
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
                  placeholder="e.g. 13"
                />
              </div>
            )}

            {calculationType !== "find-power" && (
              <div className="space-y-2">
                <Label htmlFor="power">Power (W)</Label>
                <Input
                  id="power"
                  type="number"
                  value={power}
                  onChange={(e) => setPower(e.target.value)}
                  placeholder="e.g. 3000"
                />
              </div>
            )}

            <Button onClick={calculateWattage} className="w-full">
              Calculate
            </Button>
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
                <CardContent className="pt-4">
                  <div className="text-center text-elec-yellow/80">
                    <Zap className="h-8 w-8 mx-auto mb-2" />
                    <p>Enter values to calculate</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicWattageCalculator;
