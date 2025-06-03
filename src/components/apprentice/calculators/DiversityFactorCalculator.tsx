
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wrench } from "lucide-react";

const DiversityFactorCalculator = () => {
  const [loadType, setLoadType] = useState("");
  const [connectedLoad, setConnectedLoad] = useState("");
  const [numberOfUnits, setNumberOfUnits] = useState("");
  const [result, setResult] = useState<{
    diversityFactor: number;
    demandAfterDiversity: number;
    totalConnectedLoad: number;
  } | null>(null);

  // BS 7671 Table 311 - Assumed current demand
  const diversityFactors = {
    "lighting": {
      factor: 0.66,
      description: "Lighting circuits: 66% of total connected load"
    },
    "socket-outlets": {
      factor: 0.4,
      description: "Socket outlets: 40% of connected load or 10A + 50% remainder"
    },
    "cooking": {
      factor: 0.6,
      description: "Cooking appliances: First 10A + 30% remainder + 5A if socket on cooker"
    },
    "water-heating": {
      factor: 1.0,
      description: "Water heating: 100% of connected load"
    },
    "space-heating": {
      factor: 1.0,
      description: "Space heating: 100% of connected load"
    },
    "motors": {
      factor: 0.75,
      description: "Motors: 75% of total connected load"
    },
    "mixed-domestic": {
      factor: 0.45,
      description: "Mixed domestic loads: 45% of total connected load"
    }
  };

  const calculateDemand = () => {
    const connected = parseFloat(connectedLoad);
    const units = parseInt(numberOfUnits) || 1;
    
    if (!connected || !loadType) return;

    const totalConnected = connected * units;
    let demandAfterDiversity: number;
    let diversityFactor: number;

    const loadConfig = diversityFactors[loadType as keyof typeof diversityFactors];
    
    if (loadType === "socket-outlets" && totalConnected > 10) {
      // Special calculation for socket outlets: 10A + 50% of remainder
      demandAfterDiversity = 10 + (totalConnected - 10) * 0.5;
      diversityFactor = demandAfterDiversity / totalConnected;
    } else if (loadType === "cooking" && totalConnected > 10) {
      // Special calculation for cooking: 10A + 30% of remainder + 5A if socket
      demandAfterDiversity = 10 + (totalConnected - 10) * 0.3;
      diversityFactor = demandAfterDiversity / totalConnected;
    } else {
      // Standard percentage calculation
      diversityFactor = loadConfig.factor;
      demandAfterDiversity = totalConnected * diversityFactor;
    }

    setResult({
      diversityFactor: Math.round(diversityFactor * 100) / 100,
      demandAfterDiversity: Math.round(demandAfterDiversity * 100) / 100,
      totalConnectedLoad: totalConnected
    });
  };

  const resetCalculator = () => {
    setLoadType("");
    setConnectedLoad("");
    setNumberOfUnits("");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Diversity Factor Calculator</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="load-type">Load Type</Label>
              <Select value={loadType} onValueChange={setLoadType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select load type" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="lighting">Lighting Circuits</SelectItem>
                  <SelectItem value="socket-outlets">Socket Outlets</SelectItem>
                  <SelectItem value="cooking">Cooking Appliances</SelectItem>
                  <SelectItem value="water-heating">Water Heating</SelectItem>
                  <SelectItem value="space-heating">Space Heating</SelectItem>
                  <SelectItem value="motors">Motors</SelectItem>
                  <SelectItem value="mixed-domestic">Mixed Domestic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="connected-load">Connected Load per Unit (A)</Label>
              <Input
                id="connected-load"
                type="number"
                step="0.1"
                value={connectedLoad}
                onChange={(e) => setConnectedLoad(e.target.value)}
                placeholder="Enter connected load in amperes"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="number-units">Number of Units/Circuits</Label>
              <Input
                id="number-units"
                type="number"
                min="1"
                value={numberOfUnits}
                onChange={(e) => setNumberOfUnits(e.target.value)}
                placeholder="Enter number of units (default: 1)"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={calculateDemand} 
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                disabled={!loadType || !connectedLoad}
              >
                <Wrench className="mr-2 h-4 w-4" />
                Calculate
              </Button>
              <Button variant="outline" onClick={resetCalculator}>
                Reset
              </Button>
            </div>
          </div>

          <div className="bg-elec-dark/50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-elec-yellow mb-4">Demand Calculation</h3>
            {result ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    Total Connected Load: {result.totalConnectedLoad}A
                  </div>
                  <div className="text-lg font-semibold text-white">
                    Demand After Diversity: {result.demandAfterDiversity}A
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Diversity Factor: {(result.diversityFactor * 100).toFixed(1)}%
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                  <p className="text-xs text-green-300">
                    <strong>Load Reduction:</strong> {(result.totalConnectedLoad - result.demandAfterDiversity).toFixed(1)}A saved
                  </p>
                </div>

                {loadType && (
                  <div className="text-xs text-muted-foreground">
                    <strong>Basis:</strong> {diversityFactors[loadType as keyof typeof diversityFactors]?.description}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">Select load type and enter connected load to calculate demand</p>
            )}
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-300 mb-2">Diversity in Electrical Design</h4>
          <p className="text-xs text-muted-foreground">
            Diversity factors account for the fact that not all electrical loads operate simultaneously 
            at full capacity. This allows for more economical cable sizing and distribution equipment 
            selection while maintaining safety standards per BS 7671.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiversityFactorCalculator;
