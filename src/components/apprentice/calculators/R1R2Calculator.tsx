
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";  
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, RotateCcw, Info, AlertTriangle, BookOpen, Settings } from "lucide-react";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";

const R1R2Calculator = () => {
  const [cableLength, setCableLength] = useState("");
  const [lineConductorCSA, setLineConductorCSA] = useState("");
  const [cpcConductorCSA, setCpcConductorCSA] = useState("");
  const [conductorMaterial, setConductorMaterial] = useState("");
  const [temperature, setTemperature] = useState("70");
  const [result, setResult] = useState<{
    r1: number;
    r2: number;
    r1r2: number;
    continuityLimit: number;
    testAcceptable: boolean;
  } | null>(null);

  // Resistance values at 20°C (mΩ/m)
  const copperResistance20C: { [key: string]: number } = {
    "1.0": 18.1,
    "1.5": 12.1,
    "2.5": 7.41,
    "4.0": 4.61,
    "6.0": 3.08,
    "10.0": 1.83,
    "16.0": 1.15,
    "25.0": 0.727,
    "35.0": 0.524,
    "50.0": 0.387,
    "70.0": 0.268,
    "95.0": 0.193,
    "120.0": 0.153,
    "150.0": 0.124,
    "185.0": 0.0991,
    "240.0": 0.0754,
    "300.0": 0.0601
  };

  const aluminiumResistance20C: { [key: string]: number } = {
    "16.0": 1.91,
    "25.0": 1.20,
    "35.0": 0.868,
    "50.0": 0.641,
    "70.0": 0.443,
    "95.0": 0.320,
    "120.0": 0.253,
    "150.0": 0.206,
    "185.0": 0.164,
    "240.0": 0.125,
    "300.0": 0.100
  };

  const calculateR1R2 = () => {
    if (!cableLength || !lineConductorCSA || !cpcConductorCSA || !conductorMaterial) {
      return;
    }

    const length = parseFloat(cableLength);
    const resistanceData = conductorMaterial === "copper" ? copperResistance20C : aluminiumResistance20C;
    
    const r20Line = resistanceData[lineConductorCSA];
    const r20CPC = resistanceData[cpcConductorCSA];
    
    if (!r20Line || !r20CPC) {
      return;
    }

    // Temperature correction factor
    const tempCorrection = conductorMaterial === "copper" 
      ? (234.5 + parseInt(temperature)) / (234.5 + 20)
      : (228 + parseInt(temperature)) / (228 + 20);

    // Calculate R1 and R2 at operating temperature
    const r1 = (r20Line * length * tempCorrection) / 1000; // Convert to Ω
    const r2 = (r20CPC * length * tempCorrection) / 1000; // Convert to Ω
    const r1r2 = r1 + r2;

    // Continuity test limit (typically R1+R2 × 1.67 for temperature correction during testing)
    const continuityLimit = r1r2 * 1.67;
    
    // Test is acceptable if measured value is within ±20% of calculated value
    const testAcceptable = true; // This would be compared with actual test readings

    setResult({
      r1,
      r2,
      r1r2,
      continuityLimit,
      testAcceptable
    });
  };

  const resetCalculator = () => {
    setCableLength("");
    setLineConductorCSA("");
    setCpcConductorCSA("");
    setConductorMaterial("");
    setTemperature("70");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-elec-yellow" />
          <CardTitle>R1+R2 Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate R1+R2 values for continuity testing according to BS 7671
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <DropdownTabs
          placeholder="Select section"
          tabs={[
            {
              value: "calculator",
              label: "Calculator", 
              icon: Settings,
              content: (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Input Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Circuit Parameters</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cable-length">Cable Length (m)</Label>
                      <Input
                        id="cable-length"
                        type="number"
                        value={cableLength}
                        onChange={(e) => setCableLength(e.target.value)}
                        placeholder="Enter cable length"
                        className="bg-elec-dark border-elec-yellow/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="conductor-material">Conductor Material</Label>
                      <Select value={conductorMaterial} onValueChange={setConductorMaterial}>
                        <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                          <SelectValue placeholder="Select material" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="copper">Copper</SelectItem>
                          <SelectItem value="aluminium">Aluminium</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="line-csa">Line Conductor CSA (mm²)</Label>
                      <Select value={lineConductorCSA} onValueChange={setLineConductorCSA}>
                        <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                          <SelectValue placeholder="Select CSA" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1.0">1.0</SelectItem>
                          <SelectItem value="1.5">1.5</SelectItem>
                          <SelectItem value="2.5">2.5</SelectItem>
                          <SelectItem value="4.0">4.0</SelectItem>
                          <SelectItem value="6.0">6.0</SelectItem>
                          <SelectItem value="10.0">10.0</SelectItem>
                          <SelectItem value="16.0">16.0</SelectItem>
                          <SelectItem value="25.0">25.0</SelectItem>
                          <SelectItem value="35.0">35.0</SelectItem>
                          <SelectItem value="50.0">50.0</SelectItem>
                          <SelectItem value="70.0">70.0</SelectItem>
                          <SelectItem value="95.0">95.0</SelectItem>
                          <SelectItem value="120.0">120.0</SelectItem>
                          <SelectItem value="150.0">150.0</SelectItem>
                          <SelectItem value="185.0">185.0</SelectItem>
                          <SelectItem value="240.0">240.0</SelectItem>
                          <SelectItem value="300.0">300.0</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cpc-csa">CPC Conductor CSA (mm²)</Label>
                      <Select value={cpcConductorCSA} onValueChange={setCpcConductorCSA}>
                        <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                          <SelectValue placeholder="Select CSA" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1.0">1.0</SelectItem>
                          <SelectItem value="1.5">1.5</SelectItem>
                          <SelectItem value="2.5">2.5</SelectItem>
                          <SelectItem value="4.0">4.0</SelectItem>
                          <SelectItem value="6.0">6.0</SelectItem>
                          <SelectItem value="10.0">10.0</SelectItem>
                          <SelectItem value="16.0">16.0</SelectItem>
                          <SelectItem value="25.0">25.0</SelectItem>
                          <SelectItem value="35.0">35.0</SelectItem>
                          <SelectItem value="50.0">50.0</SelectItem>
                          <SelectItem value="70.0">70.0</SelectItem>
                          <SelectItem value="95.0">95.0</SelectItem>
                          <SelectItem value="120.0">120.0</SelectItem>
                          <SelectItem value="150.0">150.0</SelectItem>
                          <SelectItem value="185.0">185.0</SelectItem>
                          <SelectItem value="240.0">240.0</SelectItem>
                          <SelectItem value="300.0">300.0</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="temperature">Operating Temperature (°C)</Label>
                      <Input
                        id="temperature"
                        type="number"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        className="bg-elec-dark border-elec-yellow/20"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={calculateR1R2} className="flex-1">
                        Calculate R1+R2
                      </Button>
                      <Button onClick={resetCalculator} variant="outline">
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Result Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Results</h3>
                    
                    {result ? (
                      <div className="space-y-4">
                        <Card className="border-green-500/30 bg-green-500/5">
                          <CardContent className="pt-4">
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-green-200">R1 (Line resistance):</span>
                                <span className="font-mono text-green-300">{result.r1.toFixed(4)} Ω</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-green-200">R2 (CPC resistance):</span>
                                <span className="font-mono text-green-300">{result.r2.toFixed(4)} Ω</span>
                              </div>
                              <div className="flex justify-between border-t border-green-500/20 pt-2">
                                <span className="text-green-200 font-semibold">R1+R2 Total:</span>
                                <span className="font-mono text-green-300 font-semibold">{result.r1r2.toFixed(4)} Ω</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-yellow-200">Test Limit (×1.67):</span>
                                <span className="font-mono text-yellow-300">{result.continuityLimit.toFixed(4)} Ω</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-blue-500/30 bg-blue-500/5">
                          <CardContent className="pt-4">
                            <div className="flex items-start gap-2">
                              <Info className="h-4 w-4 text-blue-400 mt-0.5" />
                              <div className="text-sm text-blue-200">
                                <p className="font-medium mb-1">Testing Notes:</p>
                                <ul className="space-y-1 text-blue-200/80">
                                  <li>• Test at ambient temperature (typically 20°C)</li>
                                  <li>• Measured value should be ≤ {result.continuityLimit.toFixed(4)} Ω</li>
                                  <li>• Calculated value assumes {temperature}°C operating temperature</li>
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                        <CardContent className="pt-4">
                          <div className="text-center text-elec-yellow/80">
                            <Calculator className="h-8 w-8 mx-auto mb-2" />
                            <p>Enter circuit parameters to calculate R1+R2 values</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              )
            },
            {
              value: "guidance",
              label: "Guidance",
              icon: BookOpen,
              content: (
                <div className="space-y-4">
                  <Card className="border-blue-500/30 bg-blue-500/5">
                    <CardHeader>
                      <CardTitle className="text-blue-300">What is R1+R2?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-blue-200">
                      <p>
                        R1+R2 is the resistance of the line conductor (R1) plus the resistance of the 
                        circuit protective conductor (R2, typically the earth wire).
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                        <h4 className="font-medium mb-2">Why is R1+R2 Important?</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Ensures adequate earth fault loop impedance</li>
                          <li>• Verifies continuity of protective conductors</li>
                          <li>• Required for initial verification and periodic inspection</li>
                          <li>• Critical for calculating Zs values</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-amber-500/30 bg-amber-500/5">
                    <CardHeader>
                      <CardTitle className="text-amber-300">Testing Procedure</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-amber-200">
                      <div className="space-y-3">
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded p-3">
                          <h4 className="font-medium mb-2">Step 1: Preparation</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• Isolate the circuit and prove dead</li>
                            <li>• Remove or bridge any RCDs</li>
                            <li>• Link line and CPC at the distribution board</li>
                          </ul>
                        </div>
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded p-3">
                          <h4 className="font-medium mb-2">Step 2: Testing</h4>
                          <ul className="space-y-1 text-sm">
                            <li>• Test between line and CPC at the furthest point</li>
                            <li>• Record the reading in ohms</li>
                            <li>• Test should be performed at low voltage (4-24V DC)</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            }
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default R1R2Calculator;
