
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

const CableCurrentCapacityCalculator = () => {
  const [cableSize, setCableSize] = useState<string>("");
  const [cableType, setCableType] = useState<string>("single-core-pvc");
  const [installationMethod, setInstallationMethod] = useState<string>("clipped-direct");
  const [ambientTemp, setAmbientTemp] = useState<string>("30");
  const [groupingFactor, setGroupingFactor] = useState<string>("1.0");
  const [result, setResult] = useState<{
    referenceMethod: string;
    baseCapacity: number;
    correctionFactor: number;
    finalCapacity: number;
    voltageRating: string;
  } | null>(null);

  // Cable capacity data based on BS 7671
  const cableCapacities = {
    "single-core-pvc": {
      "1.0": { clipped: 15, enclosed: 13, buried: 18 },
      "1.5": { clipped: 20, enclosed: 17, buried: 23 },
      "2.5": { clipped: 27, enclosed: 23, buried: 31 },
      "4.0": { clipped: 37, enclosed: 31, buried: 42 },
      "6.0": { clipped: 47, enclosed: 39, buried: 54 },
      "10.0": { clipped: 65, enclosed: 54, buried: 75 },
      "16.0": { clipped: 87, enclosed: 73, buried: 101 },
      "25.0": { clipped: 114, enclosed: 96, buried: 133 },
      "35.0": { clipped: 141, enclosed: 119, buried: 164 },
      "50.0": { clipped: 182, enclosed: 154, buried: 213 },
    },
    "twin-and-earth": {
      "1.0": { clipped: 13, enclosed: 11, buried: 15 },
      "1.5": { clipped: 17, enclosed: 14, buried: 19 },
      "2.5": { clipped: 23, enclosed: 19, buried: 26 },
      "4.0": { clipped: 31, enclosed: 26, buried: 35 },
      "6.0": { clipped: 39, enclosed: 33, buried: 45 },
      "10.0": { clipped: 54, enclosed: 45, buried: 62 },
      "16.0": { clipped: 73, enclosed: 61, buried: 85 },
    }
  };

  const calculateCapacity = () => {
    const size = parseFloat(cableSize);
    const ambient = parseFloat(ambientTemp);
    const grouping = parseFloat(groupingFactor);

    if (size > 0 && ambient > 0 && grouping > 0) {
      const capacityData = cableCapacities[cableType as keyof typeof cableCapacities];
      const sizeKey = size.toFixed(1);
      
      if (capacityData && capacityData[sizeKey as keyof typeof capacityData]) {
        const installMethod = installationMethod.split('-')[0] as 'clipped' | 'enclosed' | 'buried';
        const baseCapacity = capacityData[sizeKey as keyof typeof capacityData][installMethod] || 0;
        
        // Temperature correction factor (simplified)
        let tempFactor = 1.0;
        if (ambient > 30) {
          tempFactor = 0.94 - ((ambient - 30) * 0.02);
        } else if (ambient < 30) {
          tempFactor = 1.0 + ((30 - ambient) * 0.01);
        }
        
        const correctionFactor = tempFactor * grouping;
        const finalCapacity = baseCapacity * correctionFactor;
        
        setResult({
          referenceMethod: installationMethod.replace('-', ' ').toUpperCase(),
          baseCapacity,
          correctionFactor,
          finalCapacity,
          voltageRating: "600/1000V"
        });
      }
    }
  };

  const reset = () => {
    setCableSize("");
    setCableType("single-core-pvc");
    setInstallationMethod("clipped-direct");
    setAmbientTemp("30");
    setGroupingFactor("1.0");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Cable Current Capacity Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate current carrying capacity of cables based on BS 7671 installation methods.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="cable-type">Cable Type</Label>
              <Select value={cableType} onValueChange={setCableType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="single-core-pvc">Single Core PVC</SelectItem>
                  <SelectItem value="twin-and-earth">Twin & Earth</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="cable-size">Cable Size (mm²)</Label>
              <Input
                id="cable-size"
                type="number"
                value={cableSize}
                onChange={(e) => setCableSize(e.target.value)}
                placeholder="e.g., 2.5"
                className="bg-elec-dark border-elec-yellow/20"
              />
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
                  <SelectItem value="buried-direct">Buried Direct</SelectItem>
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
                placeholder="e.g., 30"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="grouping-factor">Grouping Factor</Label>
              <Input
                id="grouping-factor"
                type="number"
                step="0.1"
                value={groupingFactor}
                onChange={(e) => setGroupingFactor(e.target.value)}
                placeholder="e.g., 0.8"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculateCapacity} className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate
              </Button>
              <Button variant="outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-md bg-elec-dark p-6 min-h-[300px]">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Current Capacity Results</h3>
                    <Badge variant="secondary" className="mb-4">
                      {result.referenceMethod}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Base Capacity:</span>
                      <div className="font-mono text-elec-yellow text-lg">{result.baseCapacity} A</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Correction Factor:</span>
                      <div className="font-mono text-elec-yellow">{result.correctionFactor.toFixed(3)}</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Final Capacity:</span>
                      <div className="font-mono text-elec-yellow text-lg">{result.finalCapacity.toFixed(1)} A</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Voltage Rating:</span>
                      <div className="font-mono text-elec-yellow">{result.voltageRating}</div>
                    </div>
                    
                    <Separator />
                    
                    <div className="text-xs text-muted-foreground">
                      <div>Final = Base × Temperature × Grouping</div>
                      <div>Based on BS 7671 Table 4D5A</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Select cable parameters to calculate capacity
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                Current capacity calculations are based on BS 7671 standards. Always consult latest regulations.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CableCurrentCapacityCalculator;
