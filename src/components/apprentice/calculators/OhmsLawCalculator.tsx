
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Zap, Info, Calculator, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const OhmsLawCalculator = () => {
  const [voltage, setVoltage] = useState<string>("");
  const [current, setCurrent] = useState<string>("");
  const [resistance, setResistance] = useState<string>("");
  const [power, setPower] = useState<string>("");
  const [result, setResult] = useState<{
    voltage?: number;
    current?: number;
    resistance?: number;
    power?: number;
    calculation: string;
  } | null>(null);

  const calculateOhmsLaw = () => {
    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const R = parseFloat(resistance);
    const P = parseFloat(power);

    let calculation = "";
    let calculatedResult: any = {};

    // Determine what to calculate based on available inputs
    if (!isNaN(V) && !isNaN(I)) {
      // Calculate R and P
      calculatedResult.resistance = V / I;
      calculatedResult.power = V * I;
      calculation = "R = V/I, P = V×I";
    } else if (!isNaN(V) && !isNaN(R)) {
      // Calculate I and P
      calculatedResult.current = V / R;
      calculatedResult.power = (V * V) / R;
      calculation = "I = V/R, P = V²/R";
    } else if (!isNaN(I) && !isNaN(R)) {
      // Calculate V and P
      calculatedResult.voltage = I * R;
      calculatedResult.power = I * I * R;
      calculation = "V = I×R, P = I²×R";
    } else if (!isNaN(P) && !isNaN(V)) {
      // Calculate I and R
      calculatedResult.current = P / V;
      calculatedResult.resistance = (V * V) / P;
      calculation = "I = P/V, R = V²/P";
    } else if (!isNaN(P) && !isNaN(I)) {
      // Calculate V and R
      calculatedResult.voltage = P / I;
      calculatedResult.resistance = P / (I * I);
      calculation = "V = P/I, R = P/I²";
    }

    if (Object.keys(calculatedResult).length > 0) {
      setResult({
        ...calculatedResult,
        calculation
      });
    }
  };

  const reset = () => {
    setVoltage("");
    setCurrent("");
    setResistance("");
    setPower("");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Ohm's Law Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate voltage, current, resistance, or power using Ohm's Law. Enter any two values.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <MobileInput
              label="Voltage (V)"
              type="number"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              placeholder="e.g., 230"
              unit="V"
            />

            <MobileInput
              label="Current (A)"
              type="number"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="e.g., 10"
              unit="A"
            />

            <MobileInput
              label="Resistance (Ω)"
              type="number"
              value={resistance}
              onChange={(e) => setResistance(e.target.value)}
              placeholder="e.g., 23"
              unit="Ω"
            />

            <MobileInput
              label="Power (W)"
              type="number"
              value={power}
              onChange={(e) => setPower(e.target.value)}
              placeholder="e.g., 2300"
              unit="W"
            />

            <div className="flex gap-2">
              <MobileButton onClick={calculateOhmsLaw} className="flex-1" variant="elec" icon={<Calculator className="h-4 w-4" />}>
                Calculate
              </MobileButton>
              <MobileButton variant="elec-outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
              </MobileButton>
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-4">
            <div className="rounded-md bg-elec-dark p-6 min-h-[200px]">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Calculated Values</h3>
                    <Badge variant="secondary" className="mb-4">
                      {result.calculation}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {result.voltage && (
                      <div>
                        <span className="text-muted-foreground">Voltage:</span>
                        <div className="font-mono text-elec-yellow">{result.voltage.toFixed(2)} V</div>
                      </div>
                    )}
                    {result.current && (
                      <div>
                        <span className="text-muted-foreground">Current:</span>
                        <div className="font-mono text-elec-yellow">{result.current.toFixed(2)} A</div>
                      </div>
                    )}
                    {result.resistance && (
                      <div>
                        <span className="text-muted-foreground">Resistance:</span>
                        <div className="font-mono text-elec-yellow">{result.resistance.toFixed(2)} Ω</div>
                      </div>
                    )}
                    {result.power && (
                      <div>
                        <span className="text-muted-foreground">Power:</span>
                        <div className="font-mono text-elec-yellow">{result.power.toFixed(2)} W</div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter any two values to calculate the others
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                Ohm's Law: V = I×R, P = V×I. Enter any two known values to calculate the rest.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OhmsLawCalculator;
