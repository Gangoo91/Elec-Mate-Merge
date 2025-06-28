
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Thermometer, Info, Calculator, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CableDeratingCalculator = () => {
  const [baseCurrentRating, setBaseCurrentRating] = useState<string>("");
  const [ambientTemp, setAmbientTemp] = useState<string>("30");
  const [installationMethod, setInstallationMethod] = useState<string>("clipped");
  const [groupingFactor, setGroupingFactor] = useState<string>("1.0");
  const [thermalInsulation, setThermalInsulation] = useState<string>("none");
  const [result, setResult] = useState<{
    temperatureFactor: number;
    groupingFactorVal: number;
    thermalFactor: number;
    overallFactor: number;
    deratedCurrent: number;
  } | null>(null);

  const calculateDerating = () => {
    const baseCurrent = parseFloat(baseCurrentRating);
    const temp = parseFloat(ambientTemp);
    const grouping = parseFloat(groupingFactor);

    if (baseCurrent > 0) {
      // Temperature derating factors for PVC cables
      const getTemperatureFactor = (ambientTemp: number) => {
        if (ambientTemp <= 25) return 1.03;
        if (ambientTemp <= 30) return 1.0;
        if (ambientTemp <= 35) return 0.94;
        if (ambientTemp <= 40) return 0.87;
        if (ambientTemp <= 45) return 0.79;
        if (ambientTemp <= 50) return 0.71;
        return 0.6; // > 50°C
      };

      // Installation method factors
      const installationFactors = {
        "clipped": 1.0,
        "enclosed": 0.8,
        "ducting": 0.85,
        "buried": 0.9,
        "trunking": 0.75
      };

      // Thermal insulation factors
      const thermalFactors = {
        "none": 1.0,
        "partial": 0.8,
        "full": 0.6,
        "touching": 0.5
      };

      const temperatureFactor = getTemperatureFactor(temp);
      const installationFactor = installationFactors[installationMethod as keyof typeof installationFactors] || 1.0;
      const thermalFactor = thermalFactors[thermalInsulation as keyof typeof thermalFactors] || 1.0;
      
      const overallFactor = temperatureFactor * grouping * installationFactor * thermalFactor;
      const deratedCurrent = baseCurrent * overallFactor;

      setResult({
        temperatureFactor,
        groupingFactorVal: grouping,
        thermalFactor,
        overallFactor,
        deratedCurrent
      });
    }
  };

  const reset = () => {
    setBaseCurrentRating("");
    setAmbientTemp("30");
    setInstallationMethod("clipped");
    setGroupingFactor("1.0");
    setThermalInsulation("none");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Cable Derating Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate cable current rating considering ambient temperature, grouping, and installation factors.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="base-current">Base Current Rating (A)</Label>
              <Input
                id="base-current"
                type="number"
                value={baseCurrentRating}
                onChange={(e) => setBaseCurrentRating(e.target.value)}
                placeholder="e.g., 32"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="ambient-temp">Ambient Temperature (°C)</Label>
              <Select value={ambientTemp} onValueChange={setAmbientTemp}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="25">25°C</SelectItem>
                  <SelectItem value="30">30°C</SelectItem>
                  <SelectItem value="35">35°C</SelectItem>
                  <SelectItem value="40">40°C</SelectItem>
                  <SelectItem value="45">45°C</SelectItem>
                  <SelectItem value="50">50°C</SelectItem>
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
                  <SelectItem value="clipped">Clipped Direct</SelectItem>
                  <SelectItem value="enclosed">Enclosed in Conduit</SelectItem>
                  <SelectItem value="ducting">In Ducting</SelectItem>
                  <SelectItem value="buried">Direct Buried</SelectItem>
                  <SelectItem value="trunking">In Trunking</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="grouping-factor">Grouping Factor</Label>
              <Select value={groupingFactor} onValueChange={setGroupingFactor}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="1.0">1.0 (Single circuit)</SelectItem>
                  <SelectItem value="0.8">0.8 (2-3 circuits)</SelectItem>
                  <SelectItem value="0.7">0.7 (4-6 circuits)</SelectItem>
                  <SelectItem value="0.6">0.6 (7-9 circuits)</SelectItem>
                  <SelectItem value="0.5">0.5 (10+ circuits)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="thermal-insulation">Thermal Insulation</Label>
              <Select value={thermalInsulation} onValueChange={setThermalInsulation}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="partial">Partial (< 0.5m)</SelectItem>
                  <SelectItem value="full">Fully Surrounded</SelectItem>
                  <SelectItem value="touching">Touching Insulation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculateDerating} className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
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
            <div className="rounded-md bg-elec-dark p-6 min-h-[350px]">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Derating Results</h3>
                    <Badge variant="secondary" className="mb-4">
                      Overall Factor: {result.overallFactor.toFixed(3)}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-muted-foreground text-xs">Temperature:</span>
                        <div className="font-mono text-elec-yellow">{result.temperatureFactor.toFixed(3)}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-xs">Grouping:</span>
                        <div className="font-mono text-elec-yellow">{result.groupingFactorVal.toFixed(1)}</div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Thermal Factor:</span>
                      <div className="font-mono text-elec-yellow">{result.thermalFactor.toFixed(1)}</div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <span className="text-muted-foreground">Derated Current Rating:</span>
                      <div className="font-mono text-elec-yellow text-lg">{result.deratedCurrent.toFixed(1)} A</div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground mt-4">
                      <div>Derated = Base × Temperature × Grouping × Installation × Thermal</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter cable details to calculate derating factors
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                All derating factors are cumulative. Use the derated value for circuit protection sizing.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CableDeratingCalculator;
