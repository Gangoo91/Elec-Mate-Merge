
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
  const [cableType, setCableType] = useState<string>("pvc");
  const [installationMethod, setInstallationMethod] = useState<string>("clipped-direct");
  const [ambientTemp, setAmbientTemp] = useState<string>("30");
  const [groupingFactor, setGroupingFactor] = useState<string>("1");
  const [thermalInsulation, setThermalInsulation] = useState<string>("none");
  const [baseRating, setBaseRating] = useState<string>("");
  const [result, setResult] = useState<{
    deratedCurrent: number;
    derateFactor: number;
    tempFactor: number;
    groupFactor: number;
    thermalFactor: number;
  } | null>(null);

  const calculateDerating = () => {
    const baseCurrentRating = parseFloat(baseRating);
    const ambient = parseFloat(ambientTemp);
    const grouping = parseFloat(groupingFactor);

    if (baseCurrentRating > 0) {
      // Temperature derating factors for different cable types
      const tempFactors = {
        pvc: {
          20: 1.22,
          25: 1.12,
          30: 1.00,
          35: 0.87,
          40: 0.71,
          45: 0.50,
          50: 0.00
        },
        xlpe: {
          20: 1.15,
          25: 1.08,
          30: 1.00,
          35: 0.91,
          40: 0.82,
          45: 0.71,
          50: 0.58,
          55: 0.41,
          60: 0.00
        }
      };

      // Get temperature factor
      const tempFactorData = tempFactors[cableType as keyof typeof tempFactors];
      const tempKeys = Object.keys(tempFactorData).map(Number).sort((a, b) => a - b);
      let tempFactor = 1.0;

      // Find appropriate temperature factor
      for (let i = 0; i < tempKeys.length - 1; i++) {
        if (ambient >= tempKeys[i] && ambient <= tempKeys[i + 1]) {
          const lowerTemp = tempKeys[i];
          const upperTemp = tempKeys[i + 1];
          const lowerFactor = tempFactorData[lowerTemp as keyof typeof tempFactorData];
          const upperFactor = tempFactorData[upperTemp as keyof typeof tempFactorData];
          
          // Linear interpolation
          tempFactor = lowerFactor + (upperFactor - lowerFactor) * 
                      (ambient - lowerTemp) / (upperTemp - lowerTemp);
          break;
        }
      }

      // Installation method factors
      const installationFactors = {
        "clipped-direct": 1.0,
        "enclosed-conduit": 0.8,
        "trunking": 0.85,
        "buried-direct": 1.0,
        "ducted": 0.9
      };

      const installationFactor = installationFactors[installationMethod as keyof typeof installationFactors] || 1.0;

      // Thermal insulation factors
      const thermalFactors = {
        "none": 1.0,
        "100mm": 0.89,
        "200mm": 0.81,
        "300mm": 0.77
      };

      const thermalFactor = thermalFactors[thermalInsulation as keyof typeof thermalFactors] || 1.0;

      // Calculate overall derating factor
      const overallDerateFactor = tempFactor * grouping * installationFactor * thermalFactor;
      const deratedCurrent = baseCurrentRating * overallDerateFactor;

      setResult({
        deratedCurrent,
        derateFactor: overallDerateFactor,
        tempFactor,
        groupFactor: grouping,
        thermalFactor
      });
    }
  };

  const reset = () => {
    setCableType("pvc");
    setInstallationMethod("clipped-direct");
    setAmbientTemp("30");
    setGroupingFactor("1");
    setThermalInsulation("none");
    setBaseRating("");
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
          Calculate cable current-carrying capacity with derating factors for temperature, grouping, and installation conditions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="base-rating">Base Current Rating (A)</Label>
              <Input
                id="base-rating"
                type="number"
                value={baseRating}
                onChange={(e) => setBaseRating(e.target.value)}
                placeholder="e.g., 32"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="cable-type">Cable Type</Label>
              <Select value={cableType} onValueChange={setCableType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="pvc">PVC (70°C)</SelectItem>
                  <SelectItem value="xlpe">XLPE (90°C)</SelectItem>
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
                  <SelectItem value="clipped-direct">Clipped Direct</SelectItem>
                  <SelectItem value="enclosed-conduit">Enclosed in Conduit</SelectItem>
                  <SelectItem value="trunking">In Trunking</SelectItem>
                  <SelectItem value="buried-direct">Buried Direct</SelectItem>
                  <SelectItem value="ducted">In Ducts</SelectItem>
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
                placeholder="e.g., 35"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="grouping-factor">Grouping Factor</Label>
              <Select value={groupingFactor} onValueChange={setGroupingFactor}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="1">1 (Single Cable)</SelectItem>
                  <SelectItem value="0.8">0.8 (2-3 Cables)</SelectItem>
                  <SelectItem value="0.7">0.7 (4-6 Cables)</SelectItem>
                  <SelectItem value="0.65">0.65 (7-9 Cables)</SelectItem>
                  <SelectItem value="0.6">0.6 (10+ Cables)</SelectItem>
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
                  <SelectItem value="100mm">100mm</SelectItem>
                  <SelectItem value="200mm">200mm</SelectItem>
                  <SelectItem value="300mm">300mm</SelectItem>
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
            <div className="rounded-md bg-elec-dark p-6 min-h-[400px]">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Derating Results</h3>
                    <Badge variant="secondary" className="mb-4">
                      {cableType.toUpperCase()} Cable
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Base Rating:</span>
                      <div className="font-mono text-elec-yellow">{baseRating} A</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Derated Current:</span>
                      <div className="font-mono text-elec-yellow text-lg">{result.deratedCurrent.toFixed(2)} A</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Overall Derating Factor:</span>
                      <div className="font-mono text-elec-yellow">{result.derateFactor.toFixed(3)}</div>
                    </div>
                    
                    <Separator />
                    
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Temperature Factor:</span>
                        <span className="font-mono text-elec-yellow">{result.tempFactor.toFixed(3)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Grouping Factor:</span>
                        <span className="font-mono text-elec-yellow">{result.groupFactor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Thermal Insulation:</span>
                        <span className="font-mono text-elec-yellow">{result.thermalFactor}</span>
                      </div>
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
                Derating factors applied: temperature, grouping, installation method, and thermal insulation.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CableDeratingCalculator;
