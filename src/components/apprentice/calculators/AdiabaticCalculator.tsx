
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Shield, Info, Calculator, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AdiabaticCalculator = () => {
  const [faultCurrent, setFaultCurrent] = useState<string>("");
  const [disconnectionTime, setDisconnectionTime] = useState<string>("");
  const [cableType, setCableType] = useState<string>("copper");
  const [temperature, setTemperature] = useState<string>("70");
  const [result, setResult] = useState<{
    minimumCsa: number;
    k: number;
    isAdequate: boolean;
    actualCsa?: number;
  } | null>(null);

  const calculateAdiabatic = () => {
    const I = parseFloat(faultCurrent);
    const t = parseFloat(disconnectionTime);
    const temp = parseFloat(temperature);

    if (I > 0 && t > 0) {
      // K factors for different cable types and temperatures
      const kFactors = {
        copper: { 70: 115, 90: 143 },
        aluminium: { 70: 76, 90: 94 }
      };

      const k = kFactors[cableType as keyof typeof kFactors][temp as keyof typeof kFactors.copper] || 115;
      
      // Adiabatic equation: S = I√t/k
      const minimumCsa = (I * Math.sqrt(t)) / k;

      setResult({
        minimumCsa,
        k,
        isAdequate: true
      });
    }
  };

  const reset = () => {
    setFaultCurrent("");
    setDisconnectionTime("");
    setCableType("copper");
    setTemperature("70");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Adiabatic Equation Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate minimum cable cross-sectional area to withstand fault current using the adiabatic equation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <MobileInput
              label="Prospective Fault Current (A)"
              type="number"
              value={faultCurrent}
              onChange={(e) => setFaultCurrent(e.target.value)}
              placeholder="e.g., 1000"
              unit="A"
            />

            <MobileInput
              label="Disconnection Time (s)"
              type="number"
              step="0.01"
              value={disconnectionTime}
              onChange={(e) => setDisconnectionTime(e.target.value)}
              placeholder="e.g., 0.4"
              unit="s"
            />

            <MobileSelect value={cableType} onValueChange={setCableType}>
              <MobileSelectTrigger label="Cable Material">
                <MobileSelectValue />
              </MobileSelectTrigger>
              <MobileSelectContent>
                <MobileSelectItem value="copper">Copper</MobileSelectItem>
                <MobileSelectItem value="aluminium">Aluminium</MobileSelectItem>
              </MobileSelectContent>
            </MobileSelect>

            <MobileSelect value={temperature} onValueChange={setTemperature}>
              <MobileSelectTrigger label="Maximum Operating Temperature (°C)">
                <MobileSelectValue />
              </MobileSelectTrigger>
              <MobileSelectContent>
                <MobileSelectItem value="70">70°C (PVC)</MobileSelectItem>
                <MobileSelectItem value="90">90°C (XLPE)</MobileSelectItem>
              </MobileSelectContent>
            </MobileSelect>

            <div className="flex gap-2">
              <MobileButton onClick={calculateAdiabatic} className="flex-1" variant="elec" icon={<Calculator className="h-4 w-4" />}>
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
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Adiabatic Calculation</h3>
                    <Badge variant="secondary" className="mb-4">
                      {cableType.charAt(0).toUpperCase() + cableType.slice(1)} @ {temperature}°C
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Minimum CSA Required:</span>
                      <div className="font-mono text-elec-yellow text-lg">{result.minimumCsa.toFixed(2)} mm²</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">K Factor Used:</span>
                      <div className="font-mono text-elec-yellow">{result.k}</div>
                    </div>
                    
                    <Separator />
                    
                    <div className="text-xs text-muted-foreground">
                      <div>Formula: S = I√t / k</div>
                      <div>Where S = minimum CSA (mm²)</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter fault current and time to calculate minimum cable size
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                This calculation assumes adiabatic conditions (no heat loss during fault).
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdiabaticCalculator;
