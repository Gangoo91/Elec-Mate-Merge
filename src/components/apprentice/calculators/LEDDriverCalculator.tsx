
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
  const [ledVoltage, setLedVoltage] = useState<string>("");
  const [ledCurrent, setLedCurrent] = useState<string>("");
  const [numLeds, setNumLeds] = useState<string>("1");
  const [connectionType, setConnectionType] = useState<string>("series");
  const [supplyVoltage, setSupplyVoltage] = useState<string>("12");
  const [driverType, setDriverType] = useState<string>("constant-current");
  const [result, setResult] = useState<{
    totalVoltage: number;
    totalCurrent: number;
    totalPower: number;
    resistorValue: number;
    resistorPower: number;
    driverVoltage: number;
    driverCurrent: number;
    efficiency: number;
  } | null>(null);

  const calculateLEDDriver = () => {
    const Vled = parseFloat(ledVoltage);
    const Iled = parseFloat(ledCurrent) / 1000; // Convert mA to A
    const qty = parseInt(numLeds);
    const Vsupply = parseFloat(supplyVoltage);

    if (Vled > 0 && Iled > 0 && qty > 0 && Vsupply > 0) {
      let totalVoltage: number;
      let totalCurrent: number;
      let resistorValue = 0;
      let resistorPower = 0;

      if (connectionType === "series") {
        totalVoltage = Vled * qty;
        totalCurrent = Iled;
        
        // Calculate current limiting resistor if needed
        if (Vsupply > totalVoltage) {
          resistorValue = (Vsupply - totalVoltage) / Iled;
          resistorPower = (Vsupply - totalVoltage) * Iled;
        }
      } else { // parallel
        totalVoltage = Vled;
        totalCurrent = Iled * qty;
        
        // Each LED needs its own resistor in parallel
        if (Vsupply > totalVoltage) {
          resistorValue = (Vsupply - totalVoltage) / Iled;
          resistorPower = (Vsupply - totalVoltage) * Iled;
        }
      }

      const totalPower = totalVoltage * totalCurrent;
      const driverVoltage = driverType === "constant-voltage" ? totalVoltage : Vsupply;
      const driverCurrent = driverType === "constant-current" ? totalCurrent : totalCurrent;
      const efficiency = (totalPower / (Vsupply * totalCurrent)) * 100;

      setResult({
        totalVoltage,
        totalCurrent: totalCurrent * 1000, // Convert back to mA for display
        totalPower,
        resistorValue,
        resistorPower,
        driverVoltage,
        driverCurrent: driverCurrent * 1000, // Convert to mA
        efficiency
      });
    }
  };

  const reset = () => {
    setLedVoltage("");
    setLedCurrent("");
    setNumLeds("1");
    setConnectionType("series");
    setSupplyVoltage("12");
    setDriverType("constant-current");
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
          Calculate LED driver requirements, current limiting resistors, and power consumption.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="led-voltage">LED Voltage (V)</Label>
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
                <Label htmlFor="led-current">LED Current (mA)</Label>
                <Input
                  id="led-current"
                  type="number"
                  value={ledCurrent}
                  onChange={(e) => setLedCurrent(e.target.value)}
                  placeholder="e.g., 20"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="num-leds">Number of LEDs</Label>
                <Input
                  id="num-leds"
                  type="number"
                  min="1"
                  value={numLeds}
                  onChange={(e) => setNumLeds(e.target.value)}
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>
              <div>
                <Label htmlFor="supply-voltage">Supply Voltage (V)</Label>
                <Select value={supplyVoltage} onValueChange={setSupplyVoltage}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/20">
                    <SelectItem value="5">5V</SelectItem>
                    <SelectItem value="12">12V</SelectItem>
                    <SelectItem value="24">24V</SelectItem>
                    <SelectItem value="230">230V AC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="connection-type">Connection Type</Label>
              <Select value={connectionType} onValueChange={setConnectionType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="series">Series Connection</SelectItem>
                  <SelectItem value="parallel">Parallel Connection</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="driver-type">Driver Type</Label>
              <Select value={driverType} onValueChange={setDriverType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="constant-current">Constant Current</SelectItem>
                  <SelectItem value="constant-voltage">Constant Voltage</SelectItem>
                </SelectContent>
              </Select>
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

          {/* Result Section */}
          <div className="space-y-4">
            <div className="rounded-md bg-elec-dark p-6 min-h-[300px]">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">LED Driver Requirements</h3>
                    <Badge variant="secondary" className="mb-4">
                      {connectionType === "series" ? "Series" : "Parallel"} Configuration
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
                        <div className="font-mono text-elec-yellow">{result.totalCurrent.toFixed(1)} mA</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-muted-foreground">Total Power:</span>
                        <div className="font-mono text-elec-yellow">{result.totalPower.toFixed(2)} W</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Driver Current:</span>
                        <div className="font-mono text-elec-yellow">{result.driverCurrent.toFixed(1)} mA</div>
                      </div>
                    </div>
                    
                    {result.resistorValue > 0 && (
                      <>
                        <Separator />
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-muted-foreground">Resistor Value:</span>
                            <div className="font-mono text-elec-yellow">{result.resistorValue.toFixed(0)} Ω</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Resistor Power:</span>
                            <div className="font-mono text-elec-yellow">{result.resistorPower.toFixed(2)} W</div>
                          </div>
                        </div>
                      </>
                    )}
                    
                    <Separator />
                    
                    <div className="text-xs text-muted-foreground">
                      <div>Series: Vtotal = Vled × n, Itotal = Iled</div>
                      <div>Parallel: Vtotal = Vled, Itotal = Iled × n</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter LED specifications to calculate driver requirements
                </div>
              )}
            </div>

            <Alert className="border-green-500/20 bg-green-500/10">
              <Info className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-200">
                Always use appropriate heatsinking and consider LED thermal characteristics for optimal performance.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LEDDriverCalculator;
