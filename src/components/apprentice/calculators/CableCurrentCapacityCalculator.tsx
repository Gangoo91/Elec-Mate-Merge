
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cable, Info, Calculator, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CableCurrentCapacityCalculator = () => {
  const [cableSize, setCableSize] = useState<string>("");
  const [installationMethod, setInstallationMethod] = useState<string>("method-c");
  const [ambientTemp, setAmbientTemp] = useState<string>("30");
  const [groupingFactor, setGroupingFactor] = useState<string>("1");
  const [thermalInsulationFactor, setThermalInsulationFactor] = useState<string>("1");
  const [result, setResult] = useState<{
    baseCurrentCapacity: number;
    correctedCurrentCapacity: number;
    tempCorrectionFactor: number;
    overallCorrectionFactor: number;
    voltageDropLimit: number;
  } | null>(null);

  // Simplified current carrying capacities for common cable sizes (BS 7671 Table 4D5A - Method C)
  const cableCapacities = {
    "1": 13.5,
    "1.5": 17.5,
    "2.5": 24,
    "4": 32,
    "6": 41,
    "10": 57,
    "16": 76,
    "25": 101,
    "35": 125,
    "50": 151,
    "70": 192,
    "95": 232,
    "120": 269,
    "150": 309,
  };

  const installationFactors = {
    "method-a": 0.8,   // Enclosed in conduit in thermally insulating wall
    "method-b": 0.85,  // In trunking
    "method-c": 1.0,   // Clipped direct
    "method-d": 0.95,  // In free air
  };

  const calculateCurrentCapacity = () => {
    const baseCapacity = cableCapacities[cableSize as keyof typeof cableCapacities];
    const installationFactor = installationFactors[installationMethod as keyof typeof installationFactors];
    const grouping = parseFloat(groupingFactor);
    const thermalInsulation = parseFloat(thermalInsulationFactor);
    const ambientTemperature = parseFloat(ambientTemp);

    if (baseCapacity && installationFactor && grouping > 0 && thermalInsulation > 0) {
      // Temperature correction factor (simplified)
      let tempCorrectionFactor = 1.0;
      if (ambientTemperature > 30) {
        tempCorrectionFactor = 1 - ((ambientTemperature - 30) * 0.015);
      } else if (ambientTemperature < 30) {
        tempCorrectionFactor = 1 + ((30 - ambientTemperature) * 0.01);
      }

      const overallCorrectionFactor = installationFactor * grouping * thermalInsulation * tempCorrectionFactor;
      const correctedCurrentCapacity = baseCapacity * overallCorrectionFactor;
      
      // Voltage drop limit (simplified - 3% for lighting, 5% for other uses)
      const voltageDropLimit = parseFloat(cableSize) * 4; // Simplified calculation

      setResult({
        baseCurrentCapacity: baseCapacity,
        correctedCurrentCapacity,
        tempCorrectionFactor,
        overallCorrectionFactor,
        voltageDropLimit
      });
    }
  };

  const reset = () => {
    setCableSize("");
    setInstallationMethod("method-c");
    setAmbientTemp("30");
    setGroupingFactor("1");
    setThermalInsulationFactor("1");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Cable className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Cable Current Capacity Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate cable current carrying capacity with correction factors per BS 7671.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="cable-size">Cable Size (mm²)</Label>
              <Select value={cableSize} onValueChange={setCableSize}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select cable size" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="1">1.0 mm²</SelectItem>
                  <SelectItem value="1.5">1.5 mm²</SelectItem>
                  <SelectItem value="2.5">2.5 mm²</SelectItem>
                  <SelectItem value="4">4.0 mm²</SelectItem>
                  <SelectItem value="6">6.0 mm²</SelectItem>
                  <SelectItem value="10">10 mm²</SelectItem>
                  <SelectItem value="16">16 mm²</SelectItem>
                  <SelectItem value="25">25 mm²</SelectItem>
                  <SelectItem value="35">35 mm²</SelectItem>
                  <SelectItem value="50">50 mm²</SelectItem>
                  <SelectItem value="70">70 mm²</SelectItem>
                  <SelectItem value="95">95 mm²</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="installation-method">Installation Method</Label>
              <Select value={installationMethod} onValueChange={setInstallationMethod}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="method-a">Method A - Enclosed/Conduit</SelectItem>
                  <SelectItem value="method-b">Method B - Trunking</SelectItem>
                  <SelectItem value="method-c">Method C - Clipped Direct</SelectItem>
                  <SelectItem value="method-d">Method D - Free Air</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="ambient-temp">Ambient Temperature (°C)</Label>
              <Input
                id="ambient-temp"
                type="number"
                value={ambientTemp}
                onChange={(e) => setAmbientTemp(e.target.value)}
                placeholder="30"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="grouping-factor">Grouping Factor</Label>
                <Select value={groupingFactor} onValueChange={setGroupingFactor}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/20">
                    <SelectItem value="1">1.0 (Single cable)</SelectItem>
                    <SelectItem value="0.8">0.8 (2-3 cables)</SelectItem>
                    <SelectItem value="0.7">0.7 (4-6 cables)</SelectItem>
                    <SelectItem value="0.65">0.65 (7-12 cables)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="thermal-insulation">Thermal Insulation</Label>
                <Select value={thermalInsulationFactor} onValueChange={setThermalInsulationFactor}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/20">
                    <SelectItem value="1">1.0 (No insulation)</SelectItem>
                    <SelectItem value="0.88">0.88 (Surrounded by insulation)</SelectItem>
                    <SelectItem value="0.77">0.77 (Totally surrounded)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculateCurrentCapacity} className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
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
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Cable Capacity Analysis</h3>
                    <Badge variant="secondary" className="mb-4">
                      {cableSize}mm² Cable
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-muted-foreground">Base Capacity:</span>
                        <div className="font-mono text-elec-yellow">{result.baseCurrentCapacity} A</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Corrected Capacity:</span>
                        <div className="font-mono text-elec-yellow">{result.correctedCurrentCapacity.toFixed(1)} A</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-muted-foreground">Temp. Correction:</span>
                        <div className="font-mono text-elec-yellow">{result.tempCorrectionFactor.toFixed(3)}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Overall Factor:</span>
                        <div className="font-mono text-elec-yellow">{result.overallCorrectionFactor.toFixed(3)}</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="text-xs text-muted-foreground">
                      <div>Iz = It × Ca × Cg × Ci × Ct</div>
                      <div>Where Ca=installation, Cg=grouping, Ci=insulation, Ct=temperature</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Select cable parameters to calculate capacity
                </div>
              )}
            </div>

            <Alert className="border-red-500/20 bg-red-500/10">
              <Info className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-200">
                Always verify calculations against current BS 7671 tables. This is a simplified calculator for guidance only.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CableCurrentCapacityCalculator;
