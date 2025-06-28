
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cable, RotateCcw, Thermometer, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CableDeratingCalculator = () => {
  const [baseRating, setBaseRating] = useState("");
  const [ambientTemp, setAmbientTemp] = useState("30");
  const [installationMethod, setInstallationMethod] = useState("");
  const [groupingFactor, setGroupingFactor] = useState("1");
  const [numberOfCables, setNumberOfCables] = useState("1");
  const [thermalInsulation, setThermalInsulation] = useState("none");
  const [result, setResult] = useState<{
    temperatureFactor: number;
    groupingFactorValue: number;
    thermalInsulationFactor: number;
    finalRating: number;
    deratingFactors: string[];
  } | null>(null);

  // Derating factors from BS 7671
  const temperatureFactors = {
    "25": 1.03,
    "30": 1.00,
    "35": 0.94,
    "40": 0.87,
    "45": 0.79,
    "50": 0.71,
    "55": 0.61,
    "60": 0.50
  };

  const groupingFactors = {
    "1": 1.00,
    "2": 0.80,
    "3": 0.70,
    "4": 0.65,
    "5": 0.60,
    "6": 0.57,
    "7": 0.54,
    "8": 0.52,
    "9": 0.50,
    "12": 0.45,
    "16": 0.41,
    "20": 0.38
  };

  const thermalInsulationFactors = {
    "none": 1.00,
    "partial": 0.89,  // Touching one side
    "complete": 0.50, // Surrounded by thermal insulation over 100mm
    "conduit": 0.77   // In conduit surrounded by thermal insulation
  };

  const calculateDerating = () => {
    if (!baseRating || !installationMethod) {
      return;
    }

    const baseRatingValue = parseFloat(baseRating);
    const tempFactor = temperatureFactors[ambientTemp as keyof typeof temperatureFactors] || 1.00;
    const groupFactor = groupingFactors[numberOfCables as keyof typeof groupingFactors] || 1.00;
    const thermalFactor = thermalInsulationFactors[thermalInsulation as keyof typeof thermalInsulationFactors] || 1.00;

    // Calculate final current rating
    const finalRating = baseRatingValue * tempFactor * groupFactor * thermalFactor;

    // Identify applied derating factors
    const deratingFactors: string[] = [];
    
    if (tempFactor !== 1.00) {
      deratingFactors.push(`Temperature correction: ${tempFactor.toFixed(2)} (${ambientTemp}°C)`);
    }
    
    if (groupFactor !== 1.00) {
      deratingFactors.push(`Grouping factor: ${groupFactor.toFixed(2)} (${numberOfCables} cables)`);
    }
    
    if (thermalFactor !== 1.00) {
      const thermalDesc = {
        "partial": "partial thermal insulation",
        "complete": "complete thermal insulation",
        "conduit": "conduit in thermal insulation"
      };
      deratingFactors.push(`Thermal insulation: ${thermalFactor.toFixed(2)} (${thermalDesc[thermalInsulation as keyof typeof thermalDesc]})`);
    }

    if (deratingFactors.length === 0) {
      deratingFactors.push("No derating factors applied");
    }

    setResult({
      temperatureFactor: tempFactor,
      groupingFactorValue: groupFactor,
      thermalInsulationFactor: thermalFactor,
      finalRating,
      deratingFactors
    });
  };

  const resetCalculator = () => {
    setBaseRating("");
    setAmbientTemp("30");
    setInstallationMethod("");
    setGroupingFactor("1");
    setNumberOfCables("1");
    setThermalInsulation("none");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Cable className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Cable Derating Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate cable current carrying capacity with derating factors according to BS 7671
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="guidance">Guidance</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Cable Parameters</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="base-rating">Base Current Rating (A)</Label>
                  <Input
                    id="base-rating"
                    type="number"
                    value={baseRating}
                    onChange={(e) => setBaseRating(e.target.value)}
                    placeholder="e.g. 32"
                    className="bg-elec-dark border-elec-yellow/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="installation-method">Installation Method</Label>
                  <Select value={installationMethod} onValueChange={setInstallationMethod}>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="method-1">Method 1 - Enclosed in conduit</SelectItem>
                      <SelectItem value="method-3">Method 3 - Fixed direct on/under non-metallic surface</SelectItem>
                      <SelectItem value="method-4">Method 4 - Multicore cable in conduit</SelectItem>
                      <SelectItem value="method-11">Method 11 - Multicore cable direct buried</SelectItem>
                      <SelectItem value="method-12">Method 12 - Single core cables direct buried</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ambient-temp">Ambient Temperature (°C)</Label>
                  <Select value={ambientTemp} onValueChange={setAmbientTemp}>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25">25°C</SelectItem>
                      <SelectItem value="30">30°C (Reference)</SelectItem>
                      <SelectItem value="35">35°C</SelectItem>
                      <SelectItem value="40">40°C</SelectItem>
                      <SelectItem value="45">45°C</SelectItem>
                      <SelectItem value="50">50°C</SelectItem>
                      <SelectItem value="55">55°C</SelectItem>
                      <SelectItem value="60">60°C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="number-cables">Number of Cables in Group</Label>
                  <Select value={numberOfCables} onValueChange={setNumberOfCables}>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 (No grouping)</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="9">9</SelectItem>
                      <SelectItem value="12">12</SelectItem>
                      <SelectItem value="16">16</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thermal-insulation">Thermal Insulation</Label>
                  <Select value={thermalInsulation} onValueChange={setThermalInsulation}>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="partial">Partial contact (one side)</SelectItem>
                      <SelectItem value="complete">Completely surrounded</SelectItem>
                      <SelectItem value="conduit">Conduit in insulation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button onClick={calculateDerating} className="flex-1">
                    Calculate Derating
                  </Button>
                  <Button onClick={resetCalculator} variant="outline">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Result Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Derating Results</h3>
                
                {result ? (
                  <div className="space-y-4">
                    <Card className="border-green-500/30 bg-green-500/5">
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-green-200">Base Rating:</span>
                            <span className="font-mono text-green-300">{baseRating} A</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-200">Temperature Factor:</span>
                            <span className="font-mono text-green-300">{result.temperatureFactor.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-200">Grouping Factor:</span>
                            <span className="font-mono text-green-300">{result.groupingFactorValue.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-200">Thermal Insulation Factor:</span>
                            <span className="font-mono text-green-300">{result.thermalInsulationFactor.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between border-t border-green-500/20 pt-2">
                            <span className="text-green-200 font-semibold">Final Current Rating:</span>
                            <span className="font-mono text-green-300 font-semibold text-lg">
                              {result.finalRating.toFixed(1)} A
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-500/30 bg-blue-500/5">
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <h4 className="text-blue-300 font-semibold flex items-center gap-2">
                            <Thermometer className="h-4 w-4" />
                            Applied Derating Factors
                          </h4>
                          <ul className="space-y-1 text-blue-200 text-sm">
                            {result.deratingFactors.map((factor, index) => (
                              <li key={index}>• {factor}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    {result.finalRating < parseFloat(baseRating) * 0.5 && (
                      <Card className="border-amber-500/30 bg-amber-500/5">
                        <CardContent className="pt-4">
                          <div className="flex items-start gap-2">
                            <Info className="h-4 w-4 text-amber-400 mt-0.5" />
                            <div className="text-sm text-amber-200">
                              <p className="font-medium mb-1">Significant Derating Detected</p>
                              <p>Consider larger cable size or alternative installation method to maintain adequate current carrying capacity.</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ) : (
                  <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                    <CardContent className="pt-4">
                      <div className="text-center text-elec-yellow/80">
                        <Cable className="h-8 w-8 mx-auto mb-2" />
                        <p>Enter cable parameters to calculate derating</p>
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
                  <CardTitle className="text-blue-300">What is Cable Derating?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-blue-200">
                  <p>
                    Cable derating reduces the current carrying capacity of cables when installed 
                    in conditions that increase their operating temperature above the reference conditions.
                  </p>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                    <h4 className="font-medium mb-2">Formula: It = Iz × Ca × Cg × Ci</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• It = Tabulated current rating</li>
                      <li>• Ca = Ambient temperature correction factor</li>
                      <li>• Cg = Grouping correction factor</li>
                      <li>• Ci = Thermal insulation correction factor</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-500/30 bg-green-500/5">
                <CardHeader>
                  <CardTitle className="text-green-300">Derating Factors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-green-200">
                  <div className="space-y-3">
                    <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                      <h4 className="font-medium mb-2">Temperature Correction</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Reference temperature: 30°C for air, 20°C for ground</li>
                        <li>• Higher temperatures reduce current capacity</li>
                        <li>• Lower temperatures can increase capacity</li>
                      </ul>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                      <h4 className="font-medium mb-2">Grouping Effects</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Multiple cables generate additional heat</li>
                        <li>• More cables = greater derating required</li>
                        <li>• Spacing can reduce grouping effects</li>
                      </ul>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                      <h4 className="font-medium mb-2">Thermal Insulation</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Insulation prevents heat dissipation</li>
                        <li>• Complete surround has greatest effect</li>
                        <li>• Consider alternative routing if possible</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-amber-500/30 bg-amber-500/5">
                <CardHeader>
                  <CardTitle className="text-amber-300">Design Considerations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-amber-200">
                  <div className="space-y-3 text-sm">
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded p-3">
                      <h4 className="font-medium mb-2">When to Apply Derating</h4>
                      <ul className="space-y-1">
                        <li>• Ambient temperature above 30°C</li>
                        <li>• Multiple cables grouped together</li>
                        <li>• Cables in contact with thermal insulation</li>
                        <li>• Special installation conditions</li>
                      </ul>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded p-3">
                      <h4 className="font-medium mb-2">Mitigation Strategies</h4>
                      <ul className="space-y-1">
                        <li>• Increase cable size</li>
                        <li>• Improve ventilation</li>
                        <li>• Space cables apart</li>
                        <li>• Use alternative installation methods</li>
                      </ul>
                    </div>
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

export default CableDeratingCalculator;
