
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap } from "lucide-react";

const SinglePhasePowerCalculator = () => {
  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [powerFactor, setPowerFactor] = useState("");
  const [calculationType, setCalculationType] = useState("real-power");
  const [result, setResult] = useState<{
    realPower: number;
    apparentPower: number;
    reactivePower: number;
    powerFactor: number;
    phaseAngle: number;
  } | null>(null);

  const calculateSinglePhasePower = () => {
    if (!voltage || !current) return;

    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const pf = parseFloat(powerFactor) || 1.0; // Default to unity power factor

    const apparentPower = V * I; // VA
    const realPower = V * I * pf; // W
    const reactivePower = V * I * Math.sin(Math.acos(pf)); // VAR
    const phaseAngle = Math.acos(pf) * (180 / Math.PI); // degrees

    setResult({
      realPower,
      apparentPower,
      reactivePower,
      powerFactor: pf,
      phaseAngle
    });
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Single Phase Power Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate real, apparent, and reactive power for single-phase AC circuits
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="voltage">RMS Voltage (V)</Label>
              <Input
                id="voltage"
                type="number"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                placeholder="e.g. 230"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="current">RMS Current (A)</Label>
              <Input
                id="current"
                type="number"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                placeholder="e.g. 13"
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
                placeholder="e.g. 0.8 (leave blank for 1.0)"
              />
            </div>

            <div className="space-y-2">
              <Label>Calculation Type</Label>
              <Select value={calculationType} onValueChange={setCalculationType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="real-power">Real Power (P = VIcosφ)</SelectItem>
                  <SelectItem value="apparent-power">Apparent Power (S = VI)</SelectItem>
                  <SelectItem value="reactive-power">Reactive Power (Q = VIsinφ)</SelectItem>
                  <SelectItem value="all-powers">All Power Types</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={calculateSinglePhasePower} className="w-full">
              Calculate Single Phase Power
            </Button>
          </div>

          <div className="space-y-4">
            {result ? (
              <Card className="border-purple-500/30 bg-purple-500/5">
                <CardHeader>
                  <CardTitle className="text-purple-300 text-lg">Single Phase Power Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-purple-200">Real Power (P):</span>
                      <span className="text-purple-300 font-mono font-bold">{result.realPower.toFixed(1)} W</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-200">Apparent Power (S):</span>
                      <span className="text-purple-300 font-mono font-bold">{result.apparentPower.toFixed(1)} VA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-200">Reactive Power (Q):</span>
                      <span className="text-purple-300 font-mono font-bold">{result.reactivePower.toFixed(1)} VAR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-200">Power Factor:</span>
                      <span className="text-purple-300 font-mono font-bold">{result.powerFactor.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-200">Phase Angle:</span>
                      <span className="text-purple-300 font-mono font-bold">{result.phaseAngle.toFixed(1)}°</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                    <div className="text-blue-300 text-sm font-medium">Formula</div>
                    <div className="text-blue-200 text-xs mt-1">
                      P = V × I × cos(φ)<br/>
                      S = V × I<br/>
                      Q = V × I × sin(φ)
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                <CardContent className="pt-4">
                  <div className="text-center text-elec-yellow/80">
                    <Zap className="h-8 w-8 mx-auto mb-2" />
                    <p>Enter voltage and current to calculate single phase power</p>
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

export default SinglePhasePowerCalculator;
