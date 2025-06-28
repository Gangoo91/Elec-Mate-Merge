
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
  const [calculationType, setCalculationType] = useState<string>("voltage-current");
  const [primaryVoltage, setPrimaryVoltage] = useState<string>("");
  const [secondaryVoltage, setSecondaryVoltage] = useState<string>("");
  const [primaryCurrent, setPrimaryCurrent] = useState<string>("");
  const [secondaryCurrent, setSecondaryCurrent] = useState<string>("");
  const [power, setPower] = useState<string>("");
  const [turnsRatio, setTurnsRatio] = useState<string>("");
  const [result, setResult] = useState<{
    turnsRatio: number;
    primaryCurrent: number;
    secondaryCurrent: number;
    primaryVoltage: number;
    secondaryVoltage: number;
    apparentPower: number;
    impedanceRatio: number;
  } | null>(null);

  const calculateTransformer = () => {
    const Vp = parseFloat(primaryVoltage);
    const Vs = parseFloat(secondaryVoltage);
    const Ip = parseFloat(primaryCurrent);
    const Is = parseFloat(secondaryCurrent);
    const P = parseFloat(power);
    const TR = parseFloat(turnsRatio);

    let calculatedResult = {
      turnsRatio: 0,
      primaryCurrent: 0,
      secondaryCurrent: 0,
      primaryVoltage: 0,
      secondaryVoltage: 0,
      apparentPower: 0,
      impedanceRatio: 0
    };

    if (calculationType === "voltage-current") {
      if (Vp > 0 && Vs > 0) {
        const ratio = Vp / Vs;
        calculatedResult.turnsRatio = ratio;
        calculatedResult.primaryVoltage = Vp;
        calculatedResult.secondaryVoltage = Vs;
        calculatedResult.impedanceRatio = ratio * ratio;
        
        if (P > 0) {
          calculatedResult.primaryCurrent = (P * 1000) / Vp; // Assuming single phase
          calculatedResult.secondaryCurrent = (P * 1000) / Vs;
          calculatedResult.apparentPower = P;
        } else if (Is > 0) {
          calculatedResult.primaryCurrent = Is / ratio;
          calculatedResult.secondaryCurrent = Is;
          calculatedResult.apparentPower = (Vs * Is) / 1000;
        } else if (Ip > 0) {
          calculatedResult.secondaryCurrent = Ip * ratio;
          calculatedResult.primaryCurrent = Ip;
          calculatedResult.apparentPower = (Vp * Ip) / 1000;
        }
      }
    } else if (calculationType === "power-sizing") {
      if (P > 0 && Vp > 0 && Vs > 0) {
        const ratio = Vp / Vs;
        calculatedResult.turnsRatio = ratio;
        calculatedResult.primaryVoltage = Vp;
        calculatedResult.secondaryVoltage = Vs;
        calculatedResult.primaryCurrent = (P * 1000) / Vp;
        calculatedResult.secondaryCurrent = (P * 1000) / Vs;
        calculatedResult.apparentPower = P;
        calculatedResult.impedanceRatio = ratio * ratio;
      }
    }

    setResult(calculatedResult);
  };

  const reset = () => {
    setPrimaryVoltage("");
    setSecondaryVoltage("");
    setPrimaryCurrent("");
    setSecondaryCurrent("");
    setPower("");
    setTurnsRatio("");
    setCalculationType("voltage-current");
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
          Calculate transformer parameters including turns ratio, voltages, currents, and power ratings.
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
                  <SelectItem value="voltage-current">Voltage & Current</SelectItem>
                  <SelectItem value="power-sizing">Power & Sizing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="primary-voltage">Primary Voltage (V)</Label>
                <Input
                  id="primary-voltage"
                  type="number"
                  value={primaryVoltage}
                  onChange={(e) => setPrimaryVoltage(e.target.value)}
                  placeholder="e.g., 230"
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
                  placeholder="e.g., 12"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
            </div>

            {calculationType === "voltage-current" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primary-current">Primary Current (A)</Label>
                  <Input
                    id="primary-current"
                    type="number"
                    value={primaryCurrent}
                    onChange={(e) => setPrimaryCurrent(e.target.value)}
                    placeholder="Optional"
                    className="bg-elec-dark border-elec-yellow/20"
                  />
                </div>
                <div>
                  <Label htmlFor="secondary-current">Secondary Current (A)</Label>
                  <Input
                    id="secondary-current"
                    type="number"
                    value={secondaryCurrent}
                    onChange={(e) => setSecondaryCurrent(e.target.value)}
                    placeholder="Optional"
                    className="bg-elec-dark border-elec-yellow/20"
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="power">Power Rating (kVA)</Label>
              <Input
                id="power"
                type="number"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                placeholder="e.g., 5"
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

          {/* Result Section */}
          <div className="space-y-4">
            <div className="rounded-md bg-elec-dark p-6 min-h-[300px]">
              {result && result.turnsRatio > 0 ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Transformer Analysis</h3>
                    <Badge variant="secondary" className="mb-4">
                      {result.turnsRatio.toFixed(2)}:1 Ratio
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-muted-foreground">Primary Voltage:</span>
                        <div className="font-mono text-elec-yellow">{result.primaryVoltage} V</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Secondary Voltage:</span>
                        <div className="font-mono text-elec-yellow">{result.secondaryVoltage} V</div>
                      </div>
                    </div>
                    
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
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-muted-foreground">Power Rating:</span>
                        <div className="font-mono text-elec-yellow">{result.apparentPower.toFixed(2)} kVA</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Impedance Ratio:</span>
                        <div className="font-mono text-elec-yellow">{result.impedanceRatio.toFixed(2)}:1</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="text-xs text-muted-foreground">
                      <div>Vp/Vs = Np/Ns = Is/Ip = Turns Ratio</div>
                      <div>Power: Vp × Ip = Vs × Is</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter transformer parameters to calculate
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                Ideal transformer calculations assume 100% efficiency. Real transformers have losses typically 2-5%.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransformerCalculator;
