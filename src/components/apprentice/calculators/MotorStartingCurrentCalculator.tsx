
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Motor, Info, Calculator, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const MotorStartingCurrentCalculator = () => {
  const [motorPower, setMotorPower] = useState<string>("");
  const [voltage, setVoltage] = useState<string>("415");
  const [efficiency, setEfficiency] = useState<string>("0.85");
  const [powerFactor, setPowerFactor] = useState<string>("0.85");
  const [startingMethod, setStartingMethod] = useState<string>("direct");
  const [result, setResult] = useState<{
    fullLoadCurrent: number;
    startingCurrent: number;
    startingMultiplier: number;
    recommendedFuseRating: number;
    cableSize: string;
  } | null>(null);

  const startingMultipliers = {
    direct: 6,
    starDelta: 2,
    softstarter: 3,
    vfd: 1.5
  };

  const calculateMotorCurrent = () => {
    const P = parseFloat(motorPower) * 1000; // Convert kW to W
    const V = parseFloat(voltage);
    const eff = parseFloat(efficiency);
    const pf = parseFloat(powerFactor);
    const multiplier = startingMultipliers[startingMethod as keyof typeof startingMultipliers];

    if (P > 0 && V > 0 && eff > 0 && pf > 0) {
      // Full load current for 3-phase motor
      const fullLoadCurrent = P / (Math.sqrt(3) * V * eff * pf);
      const startingCurrent = fullLoadCurrent * multiplier;
      
      // Recommended fuse rating (typically 1.5-2x FLC)
      const recommendedFuseRating = Math.ceil(fullLoadCurrent * 1.6);
      
      // Basic cable size recommendation
      let cableSize = "";
      if (fullLoadCurrent <= 16) cableSize = "2.5mm²";
      else if (fullLoadCurrent <= 25) cableSize = "4mm²";
      else if (fullLoadCurrent <= 32) cableSize = "6mm²";
      else if (fullLoadCurrent <= 45) cableSize = "10mm²";
      else if (fullLoadCurrent <= 63) cableSize = "16mm²";
      else cableSize = "≥25mm²";

      setResult({
        fullLoadCurrent,
        startingCurrent,
        startingMultiplier: multiplier,
        recommendedFuseRating,
        cableSize
      });
    }
  };

  const reset = () => {
    setMotorPower("");
    setVoltage("415");
    setEfficiency("0.85");
    setPowerFactor("0.85");
    setStartingMethod("direct");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Motor className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Motor Starting Current Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate motor starting current, full load current, and recommended protection ratings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="motor-power">Motor Power (kW)</Label>
              <Input
                id="motor-power"
                type="number"
                value={motorPower}
                onChange={(e) => setMotorPower(e.target.value)}
                placeholder="e.g., 5.5"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="voltage">Supply Voltage (V)</Label>
              <Select value={voltage} onValueChange={setVoltage}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="230">230V (Single Phase)</SelectItem>
                  <SelectItem value="415">415V (Three Phase)</SelectItem>
                  <SelectItem value="690">690V (Three Phase)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="starting-method">Starting Method</Label>
              <Select value={startingMethod} onValueChange={setStartingMethod}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="direct">Direct On Line (6x)</SelectItem>
                  <SelectItem value="starDelta">Star-Delta (2x)</SelectItem>
                  <SelectItem value="softstarter">Soft Starter (3x)</SelectItem>
                  <SelectItem value="vfd">Variable Frequency Drive (1.5x)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculateMotorCurrent} className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
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
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Motor Current Analysis</h3>
                    <Badge variant="secondary" className="mb-4">
                      {result.startingMultiplier}x Starting Current
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-muted-foreground">Full Load Current:</span>
                        <div className="font-mono text-elec-yellow">{result.fullLoadCurrent.toFixed(2)} A</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Starting Current:</span>
                        <div className="font-mono text-elec-yellow">{result.startingCurrent.toFixed(2)} A</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-muted-foreground">Recommended Fuse:</span>
                        <div className="font-mono text-elec-yellow">{result.recommendedFuseRating} A</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Min. Cable Size:</span>
                        <div className="font-mono text-elec-yellow">{result.cableSize}</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="text-xs text-muted-foreground">
                      <div>FLC = P / (√3 × V × η × cos φ)</div>
                      <div>Starting = FLC × multiplier</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter motor details to calculate currents
                </div>
              )}
            </div>

            <Alert className="border-amber-500/20 bg-amber-500/10">
              <Info className="h-4 w-4 text-amber-500" />
              <AlertDescription className="text-amber-200">
                Always verify motor nameplate data and consult BS 7671 for final cable sizing and protection requirements.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotorStartingCurrentCalculator;
