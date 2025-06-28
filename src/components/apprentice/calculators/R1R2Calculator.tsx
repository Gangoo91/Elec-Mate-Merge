
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

const R1R2Calculator = () => {
  const [cableLength, setCableLength] = useState<string>("");
  const [liveConductorCsa, setLiveConductorCsa] = useState<string>("2.5");
  const [cpcCsa, setCpcCsa] = useState<string>("1.5");
  const [temperature, setTemperature] = useState<string>("70");
  const [cableType, setCableType] = useState<string>("copper");
  const [result, setResult] = useState<{
    r1: number;
    r2: number;
    r1r2: number;
    maxZs: number;
    isCompliant: boolean;
  } | null>(null);

  const calculateR1R2 = () => {
    const length = parseFloat(cableLength);
    const liveCsa = parseFloat(liveConductorCsa);
    const cpcCsaVal = parseFloat(cpcCsa);

    if (length > 0 && liveCsa > 0 && cpcCsaVal > 0) {
      // Resistivity values at 20°C (mΩ·m)
      const resistivity = cableType === "copper" ? 17.241 : 28.264; // Copper or Aluminium
      
      // Temperature correction factor
      const tempCorrectionFactor = temperature === "70" ? 1.2 : 1.28;
      
      // Calculate resistances (mΩ/m)
      const r1PerMeter = (resistivity / liveCsa) * tempCorrectionFactor;
      const r2PerMeter = (resistivity / cpcCsaVal) * tempCorrectionFactor;
      
      // Total resistances for the cable run
      const r1 = (r1PerMeter * length) / 1000; // Convert to Ω
      const r2 = (r2PerMeter * length) / 1000; // Convert to Ω
      const r1r2 = r1 + r2;
      
      // Maximum Zs for B32 MCB (common circuit breaker)
      const maxZs = 1.44; // Ω for B32 at 70°C
      const isCompliant = r1r2 <= maxZs;

      setResult({
        r1,
        r2,
        r1r2,
        maxZs,
        isCompliant
      });
    }
  };

  const reset = () => {
    setCableLength("");
    setLiveConductorCsa("2.5");
    setCpcCsa("1.5");
    setTemperature("70");
    setCableType("copper");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>R1+R2 Calculation</CardTitle>
        </div>
        <CardDescription>
          Calculate R1+R2 values for circuit protective conductor continuity testing.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="cable-length">Cable Length (m)</Label>
              <Input
                id="cable-length"
                type="number"
                value={cableLength}
                onChange={(e) => setCableLength(e.target.value)}
                placeholder="e.g., 25"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="live-csa">Live Conductor CSA (mm²)</Label>
              <Select value={liveConductorCsa} onValueChange={setLiveConductorCsa}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="1.0">1.0</SelectItem>
                  <SelectItem value="1.5">1.5</SelectItem>
                  <SelectItem value="2.5">2.5</SelectItem>
                  <SelectItem value="4.0">4.0</SelectItem>
                  <SelectItem value="6.0">6.0</SelectItem>
                  <SelectItem value="10.0">10.0</SelectItem>
                  <SelectItem value="16.0">16.0</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="cpc-csa">CPC CSA (mm²)</Label>
              <Select value={cpcCsa} onValueChange={setCpcCsa}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="1.0">1.0</SelectItem>
                  <SelectItem value="1.5">1.5</SelectItem>
                  <SelectItem value="2.5">2.5</SelectItem>
                  <SelectItem value="4.0">4.0</SelectItem>
                  <SelectItem value="6.0">6.0</SelectItem>
                  <SelectItem value="10.0">10.0</SelectItem>
                  <SelectItem value="16.0">16.0</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="cable-type">Cable Material</Label>
              <Select value={cableType} onValueChange={setCableType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="copper">Copper</SelectItem>
                  <SelectItem value="aluminium">Aluminium</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="temperature">Operating Temperature (°C)</Label>
              <Select value={temperature} onValueChange={setTemperature}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="70">70°C (PVC)</SelectItem>
                  <SelectItem value="90">90°C (XLPE)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculateR1R2} className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
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
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">R1+R2 Results</h3>
                    <Badge 
                      variant={result.isCompliant ? "default" : "destructive"} 
                      className="mb-4"
                    >
                      {result.isCompliant ? "Compliant" : "Non-Compliant"}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-muted-foreground">R1 (Live):</span>
                        <div className="font-mono text-elec-yellow">{result.r1.toFixed(4)} Ω</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">R2 (CPC):</span>
                        <div className="font-mono text-elec-yellow">{result.r2.toFixed(4)} Ω</div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">R1+R2 Total:</span>
                      <div className="font-mono text-elec-yellow text-lg">{result.r1r2.toFixed(4)} Ω</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Max Zs (B32):</span>
                      <div className="font-mono text-elec-yellow">{result.maxZs} Ω</div>
                    </div>
                    
                    <Separator />
                    
                    <div className="text-xs text-muted-foreground">
                      <div>R = ρl/A (at operating temperature)</div>
                      <div>CPC = Circuit Protective Conductor</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter cable details to calculate R1+R2 values
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                Values shown are at operating temperature. For testing, measure at ambient temperature.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default R1R2Calculator;
