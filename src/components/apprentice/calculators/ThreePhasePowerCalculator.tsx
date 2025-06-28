
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

const ThreePhasePowerCalculator = () => {
  const [voltage, setVoltage] = useState<string>("");
  const [current, setCurrent] = useState<string>("");
  const [powerFactor, setPowerFactor] = useState<string>("0.85");
  const [calculationType, setCalculationType] = useState<string>("power");
  const [result, setResult] = useState<{
    apparentPower: number;
    activePower: number;
    reactivePower: number;
    phaseVoltage: number;
    phaseCurrent: number;
  } | null>(null);

  const calculateThreePhasePower = () => {
    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const pf = parseFloat(powerFactor);

    if (V > 0 && I > 0 && pf > 0 && pf <= 1) {
      const apparentPower = Math.sqrt(3) * V * I / 1000; // kVA
      const activePower = apparentPower * pf; // kW
      const reactivePower = apparentPower * Math.sin(Math.acos(pf)); // kVAR
      const phaseVoltage = V / Math.sqrt(3);
      const phaseCurrent = I;

      setResult({
        apparentPower,
        activePower,
        reactivePower,
        phaseVoltage,
        phaseCurrent
      });
    }
  };

  const reset = () => {
    setVoltage("");
    setCurrent("");
    setPowerFactor("0.85");
    setCalculationType("power");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Three Phase Power Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate power values for three-phase electrical systems including apparent, active, and reactive power.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="calculation-type">Calculation Type</Label>
              <Select value={calculationType} onValueChange={setCalculationType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="power">Power Calculation</SelectItem>
                  <SelectItem value="sizing">Motor Sizing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="voltage">Line Voltage (V)</Label>
              <Input
                id="voltage"
                type="number"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                placeholder="e.g., 415"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="current">Line Current (A)</Label>
              <Input
                id="current"
                type="number"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                placeholder="e.g., 25"
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

            <div className="flex gap-2">
              <Button onClick={calculateThreePhasePower} className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
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
            <div className="rounded-md bg-elec-dark p-6 min-h-[300px]">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Three Phase Power Results</h3>
                    <Badge variant="secondary" className="mb-4">
                      √3 = 1.732
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-muted-foreground">Apparent Power:</span>
                        <div className="font-mono text-elec-yellow">{result.apparentPower.toFixed(2)} kVA</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Active Power:</span>
                        <div className="font-mono text-elec-yellow">{result.activePower.toFixed(2)} kW</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-muted-foreground">Reactive Power:</span>
                        <div className="font-mono text-elec-yellow">{result.reactivePower.toFixed(2)} kVAR</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Phase Voltage:</span>
                        <div className="font-mono text-elec-yellow">{result.phaseVoltage.toFixed(2)} V</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="text-xs text-muted-foreground">
                      <div>Formula: S = √3 × VL × IL</div>
                      <div>P = S × cos(φ), Q = S × sin(φ)</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter values to calculate three-phase power
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                Standard UK three-phase supply is 415V line-to-line, 240V line-to-neutral.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreePhasePowerCalculator;
