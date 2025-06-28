
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Zap } from "lucide-react";

const PowerLossCalculator = () => {
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("");
  const [result, setResult] = useState<{
    powerLoss: number;
    formula: string;
  } | null>(null);

  const calculatePowerLoss = () => {
    if (!current || !resistance) return;

    const I = parseFloat(current);
    const R = parseFloat(resistance);
    const powerLoss = I * I * R; // P = I²R

    setResult({
      powerLoss,
      formula: `P = I² × R = ${I}² × ${R}`
    });
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Power Loss (I²R) Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate power loss in electrical conductors using I²R formula
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
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

            <div className="space-y-2">
              <Label htmlFor="resistance">Resistance (Ω)</Label>
              <Input
                id="resistance"
                type="number"
                step="0.001"
                value={resistance}
                onChange={(e) => setResistance(e.target.value)}
                placeholder="e.g. 0.5"
              />
            </div>

            <Button onClick={calculatePowerLoss} className="w-full">
              Calculate Power Loss
            </Button>
          </div>

          <div className="space-y-4">
            {result ? (
              <Card className="border-red-500/30 bg-red-500/5">
                <CardHeader>
                  <CardTitle className="text-red-300 text-lg">Power Loss Result</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center">
                    <div className="text-red-300 font-mono text-3xl font-bold">
                      {result.powerLoss.toFixed(2)} W
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
                    <p>Enter current and resistance to calculate power loss</p>
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

export default PowerLossCalculator;
