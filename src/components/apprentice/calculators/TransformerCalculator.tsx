
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

const TransformerCalculator = () => {
  const [calculationType, setCalculationType] = useState<string>("turns-ratio");
  const [primaryVoltage, setPrimaryVoltage] = useState<string>("");
  const [secondaryVoltage, setSecondaryVoltage] = useState<string>("");
  const [primaryTurns, setPrimaryTurns] = useState<string>("");
  const [secondaryTurns, setSecondaryTurns] = useState<string>("");
  const [power, setPower] = useState<string>("");
  const [efficiency, setEfficiency] = useState<string>("0.95");
  const [result, setResult] = useState<{
    turnsRatio: number;
    voltageRatio: number;
    currentRatio: number;
    primaryCurrent?: number;
    secondaryCurrent?: number;
    efficiency?: number;
    powerLoss?: number;
  } | null>(null);

  const calculateTransformer = () => {
    const vp = parseFloat(primaryVoltage);
    const vs = parseFloat(secondaryVoltage);
    const np = parseFloat(primaryTurns);
    const ns = parseFloat(secondaryTurns);
    const p = parseFloat(power);
    const eff = parseFloat(efficiency);

    if (calculationType === "turns-ratio" && vp > 0 && vs > 0) {
      const voltageRatio = vp / vs;
      const turnsRatio = np > 0 && ns > 0 ? np / ns : voltageRatio;
      const currentRatio = 1 / voltageRatio; // Inverse of voltage ratio

      let primaryCurrent, secondaryCurrent, powerLoss;
      
      if (p > 0) {
        secondaryCurrent = (p * 1000) / vs; // Convert kW to W
        primaryCurrent = (p * 1000) / (vp * eff);
        powerLoss = (p * 1000) * (1 - eff);
      }

      setResult({
        turnsRatio,
        voltageRatio,
        currentRatio,
        primaryCurrent,
        secondaryCurrent,
        efficiency: eff,
        powerLoss
      });
    }
  };

  const reset = () => {
    setPrimaryVoltage("");
    setSecondaryVoltage("");
    setPrimaryTurns("");
    setSecondaryTurns("");
    setPower("");
    setEfficiency("0.95");
    setCalculationType("turns-ratio");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Transformer Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate transformer ratios, currents, and efficiency for step-up/step-down transformers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="calculation-type">Calculation Type</Label>
              <Select value={calculationType} onValueChange={setCalculationType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="turns-ratio">Turns & Voltage Ratio</SelectItem>
                  <SelectItem value="current-calc">Current Calculation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="primary-voltage">Primary Voltage (V)</Label>
              <Input
                id="primary-voltage"
                type="number"
                value={primaryVoltage}
                onChange={(e) => setPrimaryVoltage(e.target.value)}
                placeholder="e.g., 11000"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="secondary-voltage">Secondary Voltage (V)</Label>
              <Input
                id="secondary-voltage"
                type="number"
                value={secondaryVoltage}
                onChange={(e) => setSecondaryVoltage(e.target.value)}
                placeholder="e.g., 415"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="primary-turns">Primary Turns</Label>
                <Input
                  id="primary-turns"
                  type="number"
                  value={primaryTurns}
                  onChange={(e) => setPrimaryTurns(e.target.value)}
                  placeholder="Np"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
              <div>
                <Label htmlFor="secondary-turns">Secondary Turns</Label>
                <Input
                  id="secondary-turns"
                  type="number"
                  value={secondaryTurns}
                  onChange={(e) => setSecondaryTurns(e.target.value)}
                  placeholder="Ns"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="power">Power Rating (kW)</Label>
              <Input
                id="power"
                type="number"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                placeholder="e.g., 100"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="efficiency">Efficiency</Label>
              <Input
                id="efficiency"
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={efficiency}
                onChange={(e) => setEfficiency(e.target.value)}
                placeholder="e.g., 0.95"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculateTransformer} className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate
              </Button>
              <Button variant="outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-md bg-elec-dark p-6 min-h-[350px]">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Transformer Results</h3>
                    <Badge variant="secondary" className="mb-4">
                      {result.voltageRatio > 1 ? 'Step Down' : 'Step Up'}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-muted-foreground">Turns Ratio:</span>
                        <div className="font-mono text-elec-yellow">{result.turnsRatio.toFixed(2)}:1</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Voltage Ratio:</span>
                        <div className="font-mono text-elec-yellow">{result.voltageRatio.toFixed(2)}:1</div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Current Ratio:</span>
                      <div className="font-mono text-elec-yellow">1:{result.currentRatio.toFixed(2)}</div>
                    </div>
                    
                    {result.primaryCurrent && result.secondaryCurrent && (
                      <>
                        <Separator />
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-muted-foreground">Primary Current:</span>
                            <div className="font-mono text-elec-yellow">{result.primaryCurrent.toFixed(2)} A</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Secondary Current:</span>
                            <div className="font-mono text-elec-yellow">{result.secondaryCurrent.toFixed(2)} A</div>
                          </div>
                        </div>
                        
                        {result.powerLoss && (
                          <div>
                            <span className="text-muted-foreground">Power Loss:</span>
                            <div className="font-mono text-elec-yellow">{(result.powerLoss / 1000).toFixed(2)} kW</div>
                          </div>
                        )}
                      </>
                    )}
                    
                    <Separator />
                    
                    <div className="text-xs text-muted-foreground">
                      <div>Vp/Vs = Np/Ns = Ip/Is</div>
                      <div>P = V × I × cos(φ)</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter transformer parameters to calculate ratios
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                Transformer calculations assume ideal conditions. Real transformers have losses and impedance.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransformerCalculator;
