
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

const MotorStartingCurrentCalculator = () => {
  const [power, setPower] = useState<string>("");
  const [voltage, setVoltage] = useState<string>("415");
  const [efficiency, setEfficiency] = useState<string>("0.85");
  const [powerFactor, setPowerFactor] = useState<string>("0.85");
  const [startingMethod, setStartingMethod] = useState<string>("direct");
  const [result, setResult] = useState<{
    fullLoadCurrent: number;
    startingCurrent: number;
    startingMultiplier: number;
  } | null>(null);

  const calculateStartingCurrent = () => {
    const P = parseFloat(power);
    const V = parseFloat(voltage);
    const eff = parseFloat(efficiency);
    const pf = parseFloat(powerFactor);

    if (P > 0 && V > 0 && eff > 0 && pf > 0) {
      // Calculate full load current
      const fullLoadCurrent = (P * 1000) / (Math.sqrt(3) * V * eff * pf);
      
      // Starting current multipliers based on starting method
      const multipliers = {
        direct: 6,
        'star-delta': 2,
        'soft-starter': 3,
        'vfd': 1.5
      };
      
      const startingMultiplier = multipliers[startingMethod as keyof typeof multipliers] || 6;
      const startingCurrent = fullLoadCurrent * startingMultiplier;

      setResult({
        fullLoadCurrent,
        startingCurrent,
        startingMultiplier
      });
    }
  };

  const reset = () => {
    setPower("");
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
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Motor Starting Current Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate starting current for three-phase motors based on power, efficiency, and starting method.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="power">Motor Power (kW)</Label>
              <Input
                id="power"
                type="number"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                placeholder="e.g., 15"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="voltage">Supply Voltage (V)</Label>
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
              <Label htmlFor="efficiency">Motor Efficiency</Label>
              <Input
                id="efficiency"
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={efficiency}
                onChange={(e) => setEfficiency(e.target.value)}
                placeholder="e.g., 0.85"
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

            <div>
              <Label htmlFor="starting-method">Starting Method</Label>
              <Select value={startingMethod} onValueChange={setStartingMethod}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="direct">Direct On Line (DOL)</SelectItem>
                  <SelectItem value="star-delta">Star-Delta</SelectItem>
                  <SelectItem value="soft-starter">Soft Starter</SelectItem>
                  <SelectItem value="vfd">Variable Frequency Drive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculateStartingCurrent} className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
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
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Motor Current Results</h3>
                    <Badge variant="secondary" className="mb-4">
                      {startingMethod.replace('-', ' ').toUpperCase()} Starting
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Full Load Current:</span>
                      <div className="font-mono text-elec-yellow text-lg">{result.fullLoadCurrent.toFixed(2)} A</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Starting Current:</span>
                      <div className="font-mono text-elec-yellow text-lg">{result.startingCurrent.toFixed(2)} A</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Starting Multiplier:</span>
                      <div className="font-mono text-elec-yellow">{result.startingMultiplier}x FLC</div>
                    </div>
                    
                    <Separator />
                    
                    <div className="text-xs text-muted-foreground">
                      <div>I = P / (√3 × V × η × cos φ)</div>
                      <div>Starting Current = FLC × Multiplier</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter motor details to calculate starting current
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                Starting current multipliers: DOL (6x), Star-Delta (2x), Soft Starter (3x), VFD (1.5x)
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotorStartingCurrentCalculator;
