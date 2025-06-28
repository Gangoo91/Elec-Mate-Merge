
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Triangle } from "lucide-react";

const PowerTriangleCalculator = () => {
  const [activePower, setActivePower] = useState("");
  const [reactivePower, setReactivePower] = useState("");
  const [apparentPower, setApparentPower] = useState("");
  const [powerFactor, setPowerFactor] = useState("");
  const [result, setResult] = useState<{
    activePower: number;
    reactivePower: number;
    apparentPower: number;
    powerFactor: number;
    phaseAngle: number;
  } | null>(null);

  const calculatePowerTriangle = () => {
    const P = parseFloat(activePower) || 0;
    const Q = parseFloat(reactivePower) || 0;
    const S = parseFloat(apparentPower) || 0;
    const pf = parseFloat(powerFactor) || 0;

    let calculatedP = P;
    let calculatedQ = Q;
    let calculatedS = S;
    let calculatedPF = pf;

    // Calculate missing values based on available inputs
    if (P && Q) {
      calculatedS = Math.sqrt(P * P + Q * Q);
      calculatedPF = P / calculatedS;
    } else if (P && S) {
      calculatedQ = Math.sqrt(S * S - P * P);
      calculatedPF = P / S;
    } else if (Q && S) {
      calculatedP = Math.sqrt(S * S - Q * Q);
      calculatedPF = calculatedP / S;
    } else if (P && pf) {
      calculatedS = P / pf;
      calculatedQ = Math.sqrt(calculatedS * calculatedS - P * P);
    } else if (S && pf) {
      calculatedP = S * pf;
      calculatedQ = Math.sqrt(S * S - calculatedP * calculatedP);
    } else {
      return; // Need at least two values
    }

    const phaseAngle = Math.acos(calculatedPF) * (180 / Math.PI);

    setResult({
      activePower: calculatedP,
      reactivePower: calculatedQ,
      apparentPower: calculatedS,
      powerFactor: calculatedPF,
      phaseAngle
    });
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Triangle className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Power Triangle Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate AC power relationships using the power triangle
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="active-power">Active Power (P) - Watts</Label>
              <Input
                id="active-power"
                type="number"
                value={activePower}
                onChange={(e) => setActivePower(e.target.value)}
                placeholder="e.g. 3000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reactive-power">Reactive Power (Q) - VAR</Label>
              <Input
                id="reactive-power"
                type="number"
                value={reactivePower}
                onChange={(e) => setReactivePower(e.target.value)}
                placeholder="e.g. 4000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apparent-power">Apparent Power (S) - VA</Label>
              <Input
                id="apparent-power"
                type="number"
                value={apparentPower}
                onChange={(e) => setApparentPower(e.target.value)}
                placeholder="e.g. 5000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="power-factor">Power Factor (cosφ)</Label>
              <Input
                id="power-factor"
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={powerFactor}
                onChange={(e) => setPowerFactor(e.target.value)}
                placeholder="e.g. 0.8"
              />
            </div>

            <Button onClick={calculatePowerTriangle} className="w-full">
              Calculate Power Triangle
            </Button>
          </div>

          <div className="space-y-4">
            {result ? (
              <Card className="border-blue-500/30 bg-blue-500/5">
                <CardHeader>
                  <CardTitle className="text-blue-300 text-lg">Power Triangle Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-blue-200">Active Power (P)</div>
                      <div className="text-blue-300 font-mono text-lg font-bold">{result.activePower.toFixed(0)} W</div>
                    </div>
                    <div>
                      <div className="text-blue-200">Reactive Power (Q)</div>
                      <div className="text-blue-300 font-mono text-lg font-bold">{result.reactivePower.toFixed(0)} VAR</div>
                    </div>
                    <div>
                      <div className="text-blue-200">Apparent Power (S)</div>
                      <div className="text-blue-300 font-mono text-lg font-bold">{result.apparentPower.toFixed(0)} VA</div>
                    </div>
                    <div>
                      <div className="text-blue-200">Power Factor</div>
                      <div className="text-blue-300 font-mono text-lg font-bold">{result.powerFactor.toFixed(3)}</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-200 text-sm">Phase Angle</div>
                    <div className="text-blue-300 font-mono text-xl font-bold">{result.phaseAngle.toFixed(1)}°</div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                <CardContent className="pt-4">
                  <div className="text-center text-elec-yellow/80">
                    <Triangle className="h-8 w-8 mx-auto mb-2" />
                    <p>Enter at least two values to calculate the power triangle</p>
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

export default PowerTriangleCalculator;
