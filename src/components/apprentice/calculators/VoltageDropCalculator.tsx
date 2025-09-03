
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
  const [phase, setPhase] = useState<"single" | "three">("single");
  const [circuitType, setCircuitType] = useState<"lighting" | "other">("lighting");
  const [result, setResult] = useState<{
    voltageDrop: number;
    percentageDrop: number;
    acceptable: boolean;
    limitPercent: number;
  } | null>(null);

  const [cableType, setCableType] = useState<string>("copper-70");

  // Extended cable resistance values (mΩ/m) covering different materials and temperatures
  const cableResistance = {
    "copper-70": {
      "1.0": 19.5, "1.5": 13.3, "2.5": 7.98, "4.0": 4.95, "6.0": 3.30, 
      "10.0": 1.95, "16.0": 1.21, "25.0": 0.795, "35.0": 0.565, "50.0": 0.387,
      "70.0": 0.278, "95.0": 0.206, "120.0": 0.164, "150.0": 0.132, 
      "185.0": 0.107, "240.0": 0.0822
    },
    "copper-90": {
      "1.0": 21.8, "1.5": 14.8, "2.5": 8.91, "4.0": 5.53, "6.0": 3.69,
      "10.0": 2.18, "16.0": 1.35, "25.0": 0.888, "35.0": 0.631, "50.0": 0.432,
      "70.0": 0.311, "95.0": 0.230, "120.0": 0.183, "150.0": 0.147,
      "185.0": 0.119, "240.0": 0.0918
    },
    "aluminium-70": {
      "16.0": 1.99, "25.0": 1.31, "35.0": 0.929, "50.0": 0.636, "70.0": 0.456,
      "95.0": 0.338, "120.0": 0.269, "150.0": 0.216, "185.0": 0.175, "240.0": 0.135
    },
    "aluminium-90": {
      "16.0": 2.22, "25.0": 1.46, "35.0": 1.04, "50.0": 0.711, "70.0": 0.509,
      "95.0": 0.377, "120.0": 0.301, "150.0": 0.241, "185.0": 0.196, "240.0": 0.151
    }
  };

const calculateVoltageDrop = () => {
    const I = parseFloat(current);
    const L = parseFloat(length);
    const V = parseFloat(voltage);
    const resistanceData = cableResistance[cableType as keyof typeof cableResistance];
    const R = resistanceData?.[cableSize as keyof typeof resistanceData];

    if (I > 0 && L > 0 && R && V > 0) {
      const limit = circuitType === "lighting" ? 3 : 5; // BS 7671 design limits
      const vdVolts =
        phase === "single"
          ? (2 * I * L * R) / 1000 // line and neutral return path
          : (Math.sqrt(3) * I * L * R) / 1000; // three-phase
      const percentageDrop = (vdVolts / V) * 100;
      const acceptable = percentageDrop <= limit;

      setResult({
        voltageDrop: vdVolts,
        percentageDrop,
        acceptable,
        limitPercent: limit
      });
    }
  };

const reset = () => {
    setCurrent("");
    setLength("");
    setCableSize("");
    setVoltage("230");
    setPhase("single");
    setCircuitType("lighting");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Voltage Drop Calculator</CardTitle>
            <CardDescription className="mt-1">
              Calculate voltage drop across cable runs according to BS 7671 requirements with practical guidance.
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-auto">
            BS 7671
          </Badge>
        </div>
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

            <MobileSelect value={cableType} onValueChange={setCableType}>
              <MobileSelectTrigger label="Cable Type & Temperature">
                <MobileSelectValue placeholder="Select cable type" />
              </MobileSelectTrigger>
              <MobileSelectContent>
                <MobileSelectItem value="copper-70">Copper PVC (70°C)</MobileSelectItem>
                <MobileSelectItem value="copper-90">Copper XLPE (90°C)</MobileSelectItem>
                <MobileSelectItem value="aluminium-70">Aluminium PVC (70°C)</MobileSelectItem>
                <MobileSelectItem value="aluminium-90">Aluminium XLPE (90°C)</MobileSelectItem>
              </MobileSelectContent>
            </MobileSelect>

            <MobileSelect value={cableSize} onValueChange={setCableSize}>
              <MobileSelectTrigger label="Cable Size (mm²)">
                <MobileSelectValue placeholder="Select cable size" />
              </MobileSelectTrigger>
              <MobileSelectContent>
                {cableType && Object.keys(cableResistance[cableType as keyof typeof cableResistance] || {}).map(size => (
                  <MobileSelectItem key={size} value={size}>{size}mm²</MobileSelectItem>
                ))}
              </MobileSelectContent>
            </MobileSelect>

            <MobileSelect value={phase} onValueChange={(v: "single" | "three") => setPhase(v)}>
              <MobileSelectTrigger label="System Phase">
                <MobileSelectValue placeholder="Select phase" />
              </MobileSelectTrigger>
              <MobileSelectContent>
                <MobileSelectItem value="single">Single-phase (1φ)</MobileSelectItem>
                <MobileSelectItem value="three">Three-phase (3φ)</MobileSelectItem>
              </MobileSelectContent>
            </MobileSelect>

            <MobileSelect value={circuitType} onValueChange={(v: "lighting" | "other") => setCircuitType(v)}>
              <MobileSelectTrigger label="Circuit Type (BS 7671 limit)">
                <MobileSelectValue placeholder="Select circuit type" />
              </MobileSelectTrigger>
              <MobileSelectContent>
                <MobileSelectItem value="lighting">Lighting (3%)</MobileSelectItem>
                <MobileSelectItem value="other">Other final circuits (5%)</MobileSelectItem>
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
                      <span className="text-muted-foreground">Design Limit ({circuitType === "lighting" ? "Lighting" : "Other"}):</span>
                      <div className="font-mono text-elec-yellow">{result.limitPercent.toFixed(0)}%</div>
                    </div>

                    <div>
                      <span className="text-muted-foreground">System Phase:</span>
                      <div className="font-mono text-elec-yellow">{phase === "single" ? "Single-phase (1φ)" : "Three-phase (3φ)"}</div>
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

            {/* What This Means Panel */}
            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                <div className="space-y-2">
                  <p className="font-medium">What This Means:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Voltage drop affects equipment performance and efficiency</li>
                    <li>• Excessive drop causes lights to dim and motors to overheat</li>
                    <li>• Cable size increase reduces voltage drop but costs more</li>
                    <li>• Consider load distribution to minimise cable runs</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>

            {/* Regs at a Glance */}
            <Alert className="border-green-500/20 bg-green-500/10">
              <Info className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-200">
                <div className="space-y-2">
                  <p className="font-medium">Regs at a Glance:</p>
                  <ul className="text-sm space-y-1">
                    <li>• BS 7671 Section 525: Voltage drop limits</li>
                    <li>• 3% max for lighting circuits from origin</li>
                    <li>• 5% max for other final circuits from origin</li>
                    <li>• Use copper conductor resistance at 70°C</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoltageDropCalculator;
