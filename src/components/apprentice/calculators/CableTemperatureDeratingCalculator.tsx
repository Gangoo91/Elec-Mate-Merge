
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Thermometer, AlertTriangle, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CableTemperatureDeratingCalculator = () => {
  const [cableType, setCableType] = useState("");
  const [ambientTemp, setAmbientTemp] = useState("");
  const [installationMethod, setInstallationMethod] = useState("");
  const [grouping, setGrouping] = useState("");
  const [result, setResult] = useState<{
    temperatureFactor: number;
    groupingFactor: number;
    overallFactor: number;
    deratedCurrentCapacity: number;
    recommendations: string[];
  } | null>(null);

  const calculateDerating = () => {
    if (!cableType || !ambientTemp || !installationMethod || !grouping) return;

    const temp = parseFloat(ambientTemp);
    
    // Temperature derating factors (simplified)
    let tempFactor = 1.0;
    const baseTemp = cableType.includes('pvc') ? 30 : 20; // Base temperature for derating
    
    if (temp > baseTemp) {
      const tempDiff = temp - baseTemp;
      if (cableType.includes('pvc')) {
        tempFactor = 1 - (tempDiff * 0.005); // PVC cables
      } else {
        tempFactor = 1 - (tempDiff * 0.004); // XLPE cables
      }
    }
    
    // Grouping factors (BS 7671 Table 4C1)
    const groupingFactors: { [key: string]: number } = {
      '1': 1.0,
      '2': 0.8,
      '3': 0.7,
      '4': 0.65,
      '5': 0.6,
      '6': 0.57,
      '9': 0.5,
      '12': 0.45,
      '16': 0.41,
      '20': 0.38
    };
    
    const groupingFactor = groupingFactors[grouping] || 0.35;
    const overallFactor = tempFactor * groupingFactor;
    
    // Base current capacity (example values)
    const baseCurrent = installationMethod.includes('clipped') ? 25 : 
                       installationMethod.includes('enclosed') ? 22 : 20;
    
    const deratedCurrent = baseCurrent * overallFactor;

    const recommendations = [];
    if (overallFactor < 0.7) {
      recommendations.push("Consider using larger cable size");
      recommendations.push("Review installation method to improve heat dissipation");
    }
    if (tempFactor < 0.9) {
      recommendations.push("High ambient temperature requires significant derating");
      recommendations.push("Consider ventilation or different cable route");
    }
    if (groupingFactor < 0.8) {
      recommendations.push("Cable grouping significantly reduces capacity");
      recommendations.push("Consider separating cables or using multiple routes");
    }

    setResult({
      temperatureFactor: tempFactor,
      groupingFactor,
      overallFactor,
      derated CurrentCapacity: deratedCurrent,
      recommendations
    });
  };

  const resetCalculator = () => {
    setCableType("");
    setAmbientTemp("");
    setInstallationMethod("");
    setGrouping("");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Cable Temperature Derating Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate cable current capacity with temperature and grouping derating factors
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="guidance">BS 7671 Reference</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cable-type">Cable Type</Label>
                  <Select value={cableType} onValueChange={setCableType}>
                    <SelectTrigger id="cable-type">
                      <SelectValue placeholder="Select cable type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pvc-copper">PVC/Copper (70°C)</SelectItem>
                      <SelectItem value="xlpe-copper">XLPE/Copper (90°C)</SelectItem>
                      <SelectItem value="pvc-aluminium">PVC/Aluminium (70°C)</SelectItem>
                      <SelectItem value="xlpe-aluminium">XLPE/Aluminium (90°C)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ambient-temp">Ambient Temperature (°C)</Label>
                  <input
                    id="ambient-temp"
                    type="number"
                    value={ambientTemp}
                    onChange={(e) => setAmbientTemp(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g. 40"
                  />
                  <p className="text-xs text-muted-foreground">Standard reference: 30°C for PVC, 20°C for XLPE</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="installation-method">Installation Method</Label>
                  <Select value={installationMethod} onValueChange={setInstallationMethod}>
                    <SelectTrigger id="installation-method">
                      <SelectValue placeholder="Select installation method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clipped-direct">Clipped Direct (Method C)</SelectItem>
                      <SelectItem value="enclosed-conduit">Enclosed in Conduit (Method B)</SelectItem>
                      <SelectItem value="buried-direct">Direct Buried (Method D)</SelectItem>
                      <SelectItem value="free-air">Free Air (Method E)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grouping">Number of Circuits/Cables</Label>
                  <Select value={grouping} onValueChange={setGrouping}>
                    <SelectTrigger id="grouping">
                      <SelectValue placeholder="Select grouping" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 (No grouping)</SelectItem>
                      <SelectItem value="2">2 circuits</SelectItem>
                      <SelectItem value="3">3 circuits</SelectItem>
                      <SelectItem value="4">4 circuits</SelectItem>
                      <SelectItem value="5">5 circuits</SelectItem>
                      <SelectItem value="6">6 circuits</SelectItem>
                      <SelectItem value="9">7-9 circuits</SelectItem>
                      <SelectItem value="12">10-12 circuits</SelectItem>
                      <SelectItem value="16">13-16 circuits</SelectItem>
                      <SelectItem value="20">17-20 circuits</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button onClick={calculateDerating} className="flex-1">
                    Calculate Derating
                  </Button>
                  <Button variant="outline" onClick={resetCalculator}>
                    Reset
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {result ? (
                  <Card className="border-blue-500/30 bg-blue-500/5">
                    <CardHeader>
                      <CardTitle className="text-blue-300 text-lg">Derating Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-blue-200">Temperature Factor (Ca)</div>
                          <div className="text-blue-300 font-mono text-lg">{result.temperatureFactor.toFixed(3)}</div>
                        </div>
                        <div>
                          <div className="text-blue-200">Grouping Factor (Cg)</div>
                          <div className="text-blue-300 font-mono text-lg">{result.groupingFactor.toFixed(3)}</div>
                        </div>
                      </div>
                      
                      <div className="border-t border-blue-500/20 pt-3">
                        <div className="text-blue-200 text-sm">Overall Derating Factor</div>
                        <div className="text-blue-300 font-mono text-2xl font-bold">
                          {result.overallFactor.toFixed(3)}
                        </div>
                        <div className="text-blue-200/80 text-xs">Ca × Cg</div>
                      </div>

                      <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                        <div className="text-green-300 text-sm font-medium">Derated Current Capacity</div>
                        <div className="text-green-300 font-mono text-xl">
                          {result.deratedCurrentCapacity.toFixed(1)} A
                        </div>
                      </div>

                      {result.recommendations.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-amber-300 font-medium text-sm flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Recommendations
                          </h4>
                          <ul className="space-y-1 text-amber-200 text-xs">
                            {result.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-amber-400 mt-1">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                    <CardContent className="pt-4">
                      <div className="text-center text-elec-yellow/80">
                        <Thermometer className="h-8 w-8 mx-auto mb-2" />
                        <p>Enter cable parameters to calculate derating factors</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="guidance">
            <div className="space-y-4">
              <Card className="border-blue-500/30 bg-blue-500/5">
                <CardHeader>
                  <CardTitle className="text-blue-300 flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    BS 7671 Derating Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-blue-200 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">Regulation 523.1</h4>
                    <p>Current-carrying capacity must be determined for the most onerous combination of ambient temperature and cable grouping.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Derating Factors (Appendix 4):</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• <strong>Ca:</strong> Ambient temperature correction factor (Table 4B1/4B2)</li>
                      <li>• <strong>Cg:</strong> Grouping correction factor (Table 4C1-4C5)</li>
                      <li>• <strong>Ci:</strong> Thermal insulation factor (Regulation 523.9)</li>
                      <li>• <strong>Cs:</strong> Semi-enclosed fuse factor (1.45 for BS 1361)</li>
                    </ul>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                    <h4 className="font-medium mb-2">Final Calculation:</h4>
                    <p className="font-mono">It = Iz / (Ca × Cg × Ci × Cs)</p>
                    <p className="text-xs mt-1">It = Required current-carrying capacity from tables</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CableTemperatureDeratingCalculator;
