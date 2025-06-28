
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Thermometer } from "lucide-react";

const CableTemperatureDeratingCalculator = () => {
  const [cableType, setCableType] = useState("");
  const [operatingTemp, setOperatingTemp] = useState("");
  const [ambientTemp, setAmbientTemp] = useState("");
  const [result, setResult] = useState<{
    deratingFactor: number;
    adjustedCurrent: number;
    temperatureDifference: number;
    recommendation: string;
  } | null>(null);

  const calculateDerating = () => {
    if (!cableType || !operatingTemp || !ambientTemp) return;

    const opTemp = parseFloat(operatingTemp);
    const ambTemp = parseFloat(ambientTemp);
    
    // Reference temperatures for different cable types
    const referenceTemps: { [key: string]: number } = {
      'pvc-70': 70,
      'pvc-90': 90,
      'xlpe-90': 90,
      'epr-90': 90
    };
    
    const refTemp = referenceTemps[cableType] || 70;
    const tempDiff = opTemp - ambTemp;
    
    // Simplified derating calculation
    let deratingFactor = 1.0;
    if (opTemp > refTemp) {
      deratingFactor = Math.sqrt((refTemp + 273) / (opTemp + 273));
    } else if (ambTemp > 30) {
      // Ambient temperature correction
      deratingFactor = Math.sqrt((30 + 273) / (ambTemp + 273));
    }
    
    const adjustedCurrent = 100 * deratingFactor; // Assuming 100A base current
    
    let recommendation = "";
    if (deratingFactor < 0.8) {
      recommendation = "Significant derating required - consider larger cable or alternative installation method";
    } else if (deratingFactor < 0.9) {
      recommendation = "Moderate derating - check if acceptable for application";
    } else {
      recommendation = "Minimal derating - acceptable for most applications";
    }

    setResult({
      deratingFactor,
      adjustedCurrent,
      temperatureDifference: tempDiff,
      recommendation
    });
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Cable Temperature Derating Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate temperature derating factors for cable current capacity
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cable-type">Cable Type</Label>
              <Select value={cableType} onValueChange={setCableType}>
                <SelectTrigger id="cable-type">
                  <SelectValue placeholder="Select cable type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pvc-70">PVC 70°C</SelectItem>
                  <SelectItem value="pvc-90">PVC 90°C</SelectItem>
                  <SelectItem value="xlpe-90">XLPE 90°C</SelectItem>
                  <SelectItem value="epr-90">EPR 90°C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="operating-temp">Operating Temperature (°C)</Label>
              <input
                id="operating-temp"
                type="number"
                value={operatingTemp}
                onChange={(e) => setOperatingTemp(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. 60"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ambient-temp">Ambient Temperature (°C)</Label>
              <input
                id="ambient-temp"
                type="number"
                value={ambientTemp}
                onChange={(e) => setAmbientTemp(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. 30"
              />
            </div>

            <Button onClick={calculateDerating} className="w-full">
              Calculate Derating Factor
            </Button>
          </div>

          <div className="space-y-4">
            {result ? (
              <Card className="border-orange-500/30 bg-orange-500/5">
                <CardHeader>
                  <CardTitle className="text-orange-300 text-lg">Temperature Derating Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center">
                    <div className="text-orange-200 text-sm">Derating Factor</div>
                    <div className={`font-mono text-3xl font-bold ${
                      result.deratingFactor >= 0.9 ? 'text-green-300' :
                      result.deratingFactor >= 0.8 ? 'text-yellow-300' : 'text-red-300'
                    }`}>
                      {result.deratingFactor.toFixed(3)}
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Adjusted Current:</span>
                      <span>{result.adjustedCurrent.toFixed(1)}A</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Temperature Diff:</span>
                      <span>{result.temperatureDifference.toFixed(1)}°C</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                    <div className="text-blue-300 text-sm font-medium">Recommendation</div>
                    <div className="text-blue-200 text-xs mt-1">{result.recommendation}</div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                <CardContent className="pt-4">
                  <div className="text-center text-elec-yellow/80">
                    <Thermometer className="h-8 w-8 mx-auto mb-2" />
                    <p>Enter temperature parameters to calculate derating</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CableTemperatureDeratingCalculator;
