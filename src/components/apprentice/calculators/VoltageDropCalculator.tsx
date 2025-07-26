
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Activity, Info, Calculator, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const VoltageDropCalculator = () => {
  const [current, setCurrent] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [cableSize, setCableSize] = useState<string>("");
  const [voltage, setVoltage] = useState<string>("230");
  const [result, setResult] = useState<{
    voltageDrop: number;
    percentageDrop: number;
    acceptable: boolean;
  } | null>(null);

  // Cable resistance values (mΩ/m for copper T&E at 70°C)
  const cableResistance = {
    "1.0": 19.5,
    "1.5": 13.3,
    "2.5": 7.98,
    "4.0": 4.95,
    "6.0": 3.30,
    "10.0": 1.95,
    "16.0": 1.21,
    "25.0": 0.795,
    "35.0": 0.565
  };

  const calculateVoltageDrop = () => {
    const I = parseFloat(current);
    const L = parseFloat(length);
    const V = parseFloat(voltage);
    const R = cableResistance[cableSize as keyof typeof cableResistance];

    if (I > 0 && L > 0 && R && V > 0) {
      // Voltage drop = 2 × I × L × R / 1000 (factor of 2 for line and neutral)
      const voltageDrop = (2 * I * L * R) / 1000;
      const percentageDrop = (voltageDrop / V) * 100;
      const acceptable = percentageDrop <= 3; // BS 7671 limit for lighting, 5% for other circuits

      setResult({
        voltageDrop,
        percentageDrop,
        acceptable
      });
    }
  };

  const reset = () => {
    setCurrent("");
    setLength("");
    setCableSize("");
    setVoltage("230");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Voltage Drop Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate voltage drop across cable runs according to BS 7671 requirements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <MobileInput
              label="Supply Voltage (V)"
              type="number"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              placeholder="e.g., 230"
              unit="V"
            />

            <MobileInput
              label="Load Current (A)"
              type="number"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="e.g., 20"
              unit="A"
            />

            <MobileInput
              label="Cable Length (m)"
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="e.g., 50"
              unit="m"
            />

            <MobileSelect value={cableSize} onValueChange={setCableSize}>
              <MobileSelectTrigger label="Cable Size (mm²)">
                <MobileSelectValue placeholder="Select cable size" />
              </MobileSelectTrigger>
              <MobileSelectContent>
                <MobileSelectItem value="1.0">1.0mm²</MobileSelectItem>
                <MobileSelectItem value="1.5">1.5mm²</MobileSelectItem>
                <MobileSelectItem value="2.5">2.5mm²</MobileSelectItem>
                <MobileSelectItem value="4.0">4.0mm²</MobileSelectItem>
                <MobileSelectItem value="6.0">6.0mm²</MobileSelectItem>
                <MobileSelectItem value="10.0">10.0mm²</MobileSelectItem>
                <MobileSelectItem value="16.0">16.0mm²</MobileSelectItem>
                <MobileSelectItem value="25.0">25.0mm²</MobileSelectItem>
                <MobileSelectItem value="35.0">35.0mm²</MobileSelectItem>
              </MobileSelectContent>
            </MobileSelect>

            <div className="flex gap-2">
              <MobileButton onClick={calculateVoltageDrop} className="flex-1" variant="elec" icon={<Calculator className="h-4 w-4" />}>
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
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Voltage Drop Analysis</h3>
                    <Badge 
                      variant={result.acceptable ? "default" : "destructive"}
                      className="mb-4"
                    >
                      {result.acceptable ? "✓ Acceptable" : "✗ Exceeds limits"}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Voltage Drop:</span>
                      <div className="font-mono text-elec-yellow text-lg">{result.voltageDrop.toFixed(2)} V</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Percentage Drop:</span>
                      <div className="font-mono text-elec-yellow text-lg">{result.percentageDrop.toFixed(2)}%</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Terminal Voltage:</span>
                      <div className="font-mono text-elec-yellow">{(parseFloat(voltage) - result.voltageDrop).toFixed(2)} V</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter all values to calculate voltage drop
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                BS 7671 limits: 3% for lighting circuits, 5% for other circuits from origin to furthest point.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoltageDropCalculator;
