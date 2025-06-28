
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, RotateCcw, AlertTriangle, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PFCCalculator = () => {
  const [voltage, setVoltage] = useState("230");
  const [systemType, setSystemType] = useState("");
  const [zeValue, setZeValue] = useState("");
  const [r1r2Value, setR1r2Value] = useState("");
  const [calculationMethod, setCalculationMethod] = useState("impedance");
  const [result, setResult] = useState<{
    pfcValue: number;
    assessmentLevel: string;
    recommendations: string[];
    breakingCapacity: string;
  } | null>(null);

  const calculatePFC = () => {
    if (!voltage || !zeValue || !r1r2Value || !systemType) {
      return;
    }

    const supplyVoltage = parseFloat(voltage);
    const ze = parseFloat(zeValue);
    const r1r2 = parseFloat(r1r2Value);
    
    // Calculate fault loop impedance
    const zs = ze + r1r2;
    
    // Calculate PFC using Ohm's law
    let pfcValue: number;
    
    if (systemType === "single-phase") {
      pfcValue = supplyVoltage / zs;
    } else if (systemType === "three-phase") {
      // For 3-phase systems, use line voltage and account for √3 factor
      const lineVoltage = supplyVoltage * Math.sqrt(3);
      pfcValue = lineVoltage / zs;
    } else {
      pfcValue = supplyVoltage / zs;
    }

    // Assess the PFC level and provide recommendations
    let assessmentLevel: string;
    let recommendations: string[];
    let breakingCapacity: string;

    if (pfcValue < 1000) {
      assessmentLevel = "Low";
      recommendations = [
        "PFC is relatively low - standard MCBs should be adequate",
        "Check if protective device will operate within required time",
        "Consider cable sizing and length factors"
      ];
      breakingCapacity = "6kA MCBs typically adequate";
    } else if (pfcValue < 6000) {
      assessmentLevel = "Medium";
      recommendations = [
        "Moderate PFC - ensure MCBs have adequate breaking capacity",
        "Standard 6kA MCBs should be sufficient",
        "Check manufacturer specifications for exact requirements"
      ];
      breakingCapacity = "6kA MCBs recommended";
    } else if (pfcValue < 10000) {
      assessmentLevel = "High";
      recommendations = [
        "High PFC - use MCBs with higher breaking capacity",
        "Consider 10kA or higher rated protective devices",
        "Additional protection coordination may be required"
      ];
      breakingCapacity = "10kA MCBs required";
    } else {
      assessmentLevel = "Very High";
      recommendations = [
        "Very high PFC - specialist equipment required",
        "Use MCBs with 16kA or higher breaking capacity",
        "Consider current limiting devices",
        "Professional assessment recommended"
      ];
      breakingCapacity = "16kA or higher MCBs required";
    }

    setResult({
      pfcValue,
      assessmentLevel,
      recommendations,
      breakingCapacity
    });
  };

  const resetCalculator = () => {
    setVoltage("230");
    setSystemType("");
    setZeValue("");
    setR1r2Value("");
    setCalculationMethod("impedance");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Prospective Fault Current Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate prospective fault current and assess protective device requirements
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
                <h3 className="text-lg font-semibold">System Parameters</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="system-type">System Type</Label>
                  <Select value={systemType} onValueChange={setSystemType}>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                      <SelectValue placeholder="Select system type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single-phase">Single Phase (230V)</SelectItem>
                      <SelectItem value="three-phase">Three Phase (400V)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="voltage">Supply Voltage (V)</Label>
                  <Input
                    id="voltage"
                    type="number"
                    value={voltage}
                    onChange={(e) => setVoltage(e.target.value)}
                    className="bg-elec-dark border-elec-yellow/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ze-value">Ze - External Loop Impedance (Ω)</Label>
                  <Input
                    id="ze-value"
                    type="number"
                    step="0.001"
                    value={zeValue}
                    onChange={(e) => setZeValue(e.target.value)}
                    placeholder="e.g. 0.35"
                    className="bg-elec-dark border-elec-yellow/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="r1r2-value">R1+R2 - Circuit Impedance (Ω)</Label>
                  <Input
                    id="r1r2-value"
                    type="number"
                    step="0.001"
                    value={r1r2Value}
                    onChange={(e) => setR1r2Value(e.target.value)}
                    placeholder="e.g. 0.15"
                    className="bg-elec-dark border-elec-yellow/20"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={calculatePFC} className="flex-1">
                    Calculate PFC
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
                            <span className="text-green-200">Zs (Total Impedance):</span>
                            <span className="font-mono text-green-300">
                              {(parseFloat(zeValue) + parseFloat(r1r2Value)).toFixed(3)} Ω
                            </span>
                          </div>
                          <div className="flex justify-between border-t border-green-500/20 pt-2">
                            <span className="text-green-200 font-semibold">Prospective Fault Current:</span>
                            <span className="font-mono text-green-300 font-semibold text-lg">
                              {result.pfcValue.toFixed(0)} A
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-yellow-200">Assessment Level:</span>
                            <span className={`font-semibold ${
                              result.assessmentLevel === 'Low' ? 'text-green-300' :
                              result.assessmentLevel === 'Medium' ? 'text-yellow-300' :
                              result.assessmentLevel === 'High' ? 'text-orange-300' :
                              'text-red-300'
                            }`}>
                              {result.assessmentLevel}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-500/30 bg-blue-500/5">
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <h4 className="text-blue-300 font-semibold">Breaking Capacity Requirement</h4>
                          <p className="text-blue-200 text-sm">{result.breakingCapacity}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-amber-500/30 bg-amber-500/5">
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <h4 className="text-amber-300 font-semibold flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Recommendations
                          </h4>
                          <ul className="space-y-1 text-amber-200 text-sm">
                            {result.recommendations.map((rec, index) => (
                              <li key={index}>• {rec}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                    <CardContent className="pt-4">
                      <div className="text-center text-elec-yellow/80">
                        <Zap className="h-8 w-8 mx-auto mb-2" />
                        <p>Enter system parameters to calculate PFC</p>
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
                  <CardTitle className="text-blue-300">What is Prospective Fault Current?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-blue-200">
                  <p>
                    Prospective Fault Current (PFC) is the maximum current that would flow in the event 
                    of a fault with negligible impedance at any point in the circuit.
                  </p>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                    <h4 className="font-medium mb-2">Formula: PFC = U₀ / Zs</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• U₀ = Nominal voltage to earth</li>
                      <li>• Zs = Earth fault loop impedance</li>
                      <li>• For 3-phase: PFC = U / Zs (line voltage)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-500/30 bg-green-500/5">
                <CardHeader>
                  <CardTitle className="text-green-300">Why Calculate PFC?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-green-200">
                  <div className="space-y-3">
                    <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                      <h4 className="font-medium mb-2">Equipment Selection</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Ensures protective devices can safely interrupt fault currents</li>
                        <li>• Determines minimum breaking capacity requirements</li>
                        <li>• Prevents equipment damage during fault conditions</li>
                      </ul>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                      <h4 className="font-medium mb-2">Safety Requirements</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Required by BS 7671 for all installations</li>
                        <li>• Must be calculated at design stage</li>
                        <li>• Verified during initial verification</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-amber-500/30 bg-amber-500/5">
                <CardHeader>
                  <CardTitle className="text-amber-300">Breaking Capacity Guide</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-amber-200">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Up to 1kA:</span>
                      <span className="text-green-300">Standard MCBs (6kA)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1kA - 6kA:</span>
                      <span className="text-yellow-300">6kA MCBs</span>
                    </div>
                    <div className="flex justify-between">
                      <span>6kA - 10kA:</span>
                      <span className="text-orange-300">10kA MCBs</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Above 10kA:</span>
                      <span className="text-red-300">16kA+ MCBs</span>
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

export default PFCCalculator;
