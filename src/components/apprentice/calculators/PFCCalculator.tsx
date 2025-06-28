
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

const PFCCalculator = () => {
  const [supplyVoltage, setSupplyVoltage] = useState<string>("230");
  const [ze, setZe] = useState<string>(""); // External earth fault loop impedance
  const [r1r2, setR1R2] = useState<string>(""); // Circuit resistance
  const [calculationType, setCalculationType] = useState<string>("pfc");
  const [result, setResult] = useState<{
    pfc: number;
    zs: number;
    isAdequate: boolean;
    protectionRating: string;
  } | null>(null);

  const calculatePFC = () => {
    const voltage = parseFloat(supplyVoltage);
    const zeVal = parseFloat(ze);
    const r1r2Val = parseFloat(r1r2);

    if (voltage > 0 && zeVal > 0 && r1r2Val >= 0) {
      // Calculate Zs (total earth fault loop impedance)
      const zs = zeVal + r1r2Val;
      
      // Calculate PFC using Ohm's law
      const pfc = voltage / zs;
      
      // Determine if adequate for common protection devices
      let isAdequate = false;
      let protectionRating = "Unknown";
      
      if (pfc >= 160) { // Adequate for most MCBs
        isAdequate = true;
        protectionRating = "Adequate for MCB/RCBO";
      } else if (pfc >= 50) {
        isAdequate = true;
        protectionRating = "Adequate for RCD protection";
      } else {
        isAdequate = false;
        protectionRating = "Inadequate - review installation";
      }

      setResult({
        pfc,
        zs,
        isAdequate,
        protectionRating
      });
    }
  };

  const reset = () => {
    setSupplyVoltage("230");
    setZe("");
    setR1R2("");
    setCalculationType("pfc");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Prospective Fault Current Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate prospective fault current (PFC) and assess protection adequacy.
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
                  <SelectItem value="pfc">Prospective Fault Current</SelectItem>
                  <SelectItem value="pscc">Prospective Short Circuit Current</SelectItem>
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
                placeholder="e.g., 230"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="ze">Ze - External Earth Fault Loop Impedance (Ω)</Label>
              <Input
                id="ze"
                type="number"
                step="0.01"
                value={ze}
                onChange={(e) => setZe(e.target.value)}
                placeholder="e.g., 0.35"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="r1r2">R1+R2 - Circuit Resistance (Ω)</Label>
              <Input
                id="r1r2"
                type="number"
                step="0.01"
                value={r1r2}
                onChange={(e) => setR1R2(e.target.value)}
                placeholder="e.g., 0.5"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculatePFC} className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
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
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">PFC Results</h3>
                    <Badge 
                      variant={result.isAdequate ? "default" : "destructive"} 
                      className="mb-4"
                    >
                      {result.isAdequate ? "Adequate" : "Inadequate"}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Zs (Total Loop Impedance):</span>
                      <div className="font-mono text-elec-yellow">{result.zs.toFixed(3)} Ω</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Prospective Fault Current:</span>
                      <div className="font-mono text-elec-yellow text-lg">{result.pfc.toFixed(0)} A</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Protection Assessment:</span>
                      <div className="font-mono text-elec-yellow text-sm">{result.protectionRating}</div>
                    </div>
                    
                    <Separator />
                    
                    <div className="text-xs text-muted-foreground">
                      <div>Formula: PFC = U₀ / Zs</div>
                      <div>Zs = Ze + (R1 + R2)</div>
                      <div>Minimum PFC: 160A for MCB operation</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter impedance values to calculate prospective fault current
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                PFC must be sufficient to operate protective devices within required disconnection times.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PFCCalculator;
