
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lightbulb, Info, Calculator, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LEDDriverCalculator = () => {
  const [calculationType, setCalculationType] = useState<string>("driver-sizing");
  const [ledVoltage, setLedVoltage] = useState<string>("");
  const [ledCurrent, setLedCurrent] = useState<string>("");
  const [numLeds, setNumLeds] = useState<string>("1");
  const [connectionType, setConnectionType] = useState<string>("series");
  const [supplyVoltage, setSupplyVoltage] = useState<string>("12");
  const [efficiency, setEfficiency] = useState<string>("0.85");
  const [result, setResult] = useState<{
    totalVoltage: number;
    totalCurrent: number;
    totalPower: number;
    driverPower: number;
    driverCurrent: number;
    connectionConfig: string;
    powerLoss: number;
  } | null>(null);

  const calculateLEDDriver = () => {
    const vLed = parseFloat(ledVoltage);
    const iLed = parseFloat(ledCurrent) / 1000; // Convert mA to A
    const count = parseInt(numLeds);
    const vSupply = parseFloat(supplyVoltage);
    const eff = parseFloat(efficiency);

    if (vLed > 0 && iLed > 0 && count > 0 && vSupply > 0 && eff > 0) {
      let totalVoltage, totalCurrent, totalPower;
      
      if (connectionType === "series") {
        totalVoltage = vLed * count;
        totalCurrent = iLed;
        totalPower = totalVoltage * totalCurrent;
      } else { // parallel
        totalVoltage = vLed;
        totalCurrent = iLed * count;
        totalPower = totalVoltage * totalCurrent;
      }

      const driverPower = totalPower / eff;
      const driverCurrent = driverPower / vSupply;
      const powerLoss = driverPower - totalPower;

      setResult({
        totalVoltage,
        totalCurrent: totalCurrent * 1000, // Convert back to mA for display
        totalPower,
        driverPower,
        driverCurrent,
        connectionConfig: connectionType,
        powerLoss
      });
    }
  };

  const reset = () => {
    setLedVoltage("");
    setLedCurrent("");
    setNumLeds("1");
    setConnectionType("series");
    setSupplyVoltage("12");
    setEfficiency("0.85");
    setCalculationType("driver-sizing");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          <CardTitle>LED Driver Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate LED driver requirements for single LEDs or LED arrays in series/parallel configurations.
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
                  <SelectItem value="driver-sizing">Driver Sizing</SelectItem>
                  <SelectItem value="array-design">Array Design</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="led-voltage">LED Forward Voltage (V)</Label>
              <Input
                id="led-voltage"
                type="number"
                step="0.1"
                value={ledVoltage}
                onChange={(e) => setLedVoltage(e.target.value)}
                placeholder="e.g., 3.2"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="led-current">LED Forward Current (mA)</Label>
              <Input
                id="led-current"
                type="number"
                value={ledCurrent}
                onChange={(e) => setLedCurrent(e.target.value)}
                placeholder="e.g., 350"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="num-leds">Number of LEDs</Label>
              <Input
                id="num-leds"
                type="number"
                value={numLeds}
                onChange={(e) => setNumLeds(e.target.value)}
                placeholder="e.g., 10"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="connection-type">Connection Type</Label>
              <Select value={connectionType} onValueChange={setConnectionType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="series">Series</SelectItem>
                  <SelectItem value="parallel">Parallel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="supply-voltage">Supply Voltage (V)</Label>
              <Input
                id="supply-voltage"
                type="number"
                value={supplyVoltage}
                onChange={(e) => setSupplyVoltage(e.target.value)}
                placeholder="e.g., 12"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="efficiency">Driver Efficiency</Label>
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

            <div className="flex gap-2">
              <Button onClick={calculateLEDDriver} className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
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
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">LED Driver Results</h3>
                    <Badge variant="secondary" className="mb-4">
                      {result.connectionConfig.toUpperCase()} Connection
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-muted-foreground">Total Voltage:</span>
                        <div className="font-mono text-elec-yellow">{result.totalVoltage.toFixed(1)} V</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total Current:</span>
                        <div className="font-mono text-elec-yellow">{result.totalCurrent.toFixed(0)} mA</div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">LED Array Power:</span>
                      <div className="font-mono text-elec-yellow">{result.totalPower.toFixed(2)} W</div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-muted-foreground">Driver Power:</span>
                        <div className="font-mono text-elec-yellow">{result.driverPower.toFixed(2)} W</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Driver Current:</span>
                        <div className="font-mono text-elec-yellow">{result.driverCurrent.toFixed(2)} A</div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Power Loss:</span>
                      <div className="font-mono text-elec-yellow">{result.powerLoss.toFixed(2)} W</div>
                    </div>
                    
                    <Separator />
                    
                    <div className="text-xs text-muted-foreground">
                      <div>Series: V_total = V_led × n</div>
                      <div>Parallel: I_total = I_led × n</div>
                      <div>Driver Power = LED Power ÷ Efficiency</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter LED specifications to calculate driver requirements
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                Consider voltage headroom for constant current drivers. Series connection requires higher voltage.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LEDDriverCalculator;
