
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, AlertTriangle, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FaultCurrentCalculator = () => {
  const [voltage, setVoltage] = useState("");
  const [impedance, setImpedance] = useState("");
  const [faultType, setFaultType] = useState("");
  const [result, setResult] = useState<{
    faultCurrent: number;
    energyLet: number;
    arcFlashRisk: string;
    recommendations: string[];
  } | null>(null);

  const calculateFaultCurrent = () => {
    if (!voltage || !impedance || !faultType) return;

    const V = parseFloat(voltage);
    const Z = parseFloat(impedance);
    
    let adjustmentFactor = 1;
    if (faultType === "earth-fault") adjustmentFactor = 0.8; // 0.8 × Uo for earth faults
    if (faultType === "phase-phase") adjustmentFactor = Math.sqrt(3); // √3 × V for phase-phase
    
    const faultCurrent = (V * adjustmentFactor) / Z;
    const energyLet = Math.pow(faultCurrent, 2) * Z * 0.1; // Assuming 0.1s disconnection
    
    let arcFlashRisk = "Low";
    if (faultCurrent > 1000) arcFlashRisk = "Medium";
    if (faultCurrent > 5000) arcFlashRisk = "High";
    if (faultCurrent > 15000) arcFlashRisk = "Very High";

    const recommendations = [];
    if (faultCurrent > 10000) {
      recommendations.push("Consider current limiting devices");
      recommendations.push("Ensure adequate short-circuit rating of equipment");
    }
    if (faultCurrent > 25000) {
      recommendations.push("High energy arc flash risk - implement safety procedures");
      recommendations.push("Consider remote switching/operation");
    }

    setResult({
      faultCurrent,
      energyLet,
      arcFlashRisk,
      recommendations
    });
  };

  const resetCalculator = () => {
    setVoltage("");
    setImpedance("");
    setFaultType("");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Fault Current Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate prospective fault current and assess arc flash risks
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="guidance">Standards & Guidance</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fault-type">Fault Type</Label>
                  <Select value={faultType} onValueChange={setFaultType}>
                    <SelectTrigger id="fault-type">
                      <SelectValue placeholder="Select fault type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phase-neutral">Phase to Neutral</SelectItem>
                      <SelectItem value="phase-phase">Phase to Phase</SelectItem>
                      <SelectItem value="earth-fault">Earth Fault</SelectItem>
                      <SelectItem value="three-phase">Three Phase Fault</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="voltage">System Voltage (V)</Label>
                  <Select value={voltage} onValueChange={setVoltage}>
                    <SelectTrigger id="voltage">
                      <SelectValue placeholder="Select voltage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="230">230V (Single Phase)</SelectItem>
                      <SelectItem value="400">400V (Three Phase)</SelectItem>
                      <SelectItem value="11000">11kV (HV)</SelectItem>
                      <SelectItem value="33000">33kV (HV)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="impedance">Total Impedance (Ω)</Label>
                  <input
                    id="impedance"
                    type="number"
                    step="0.001"
                    value={impedance}
                    onChange={(e) => setImpedance(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g. 0.15"
                  />
                  <p className="text-xs text-muted-foreground">Include source impedance + cable impedance</p>
                </div>

                <div className="flex gap-2">
                  <Button onClick={calculateFaultCurrent} className="flex-1">
                    Calculate Fault Current
                  </Button>
                  <Button variant="outline" onClick={resetCalculator}>
                    Reset
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {result ? (
                  <div className="space-y-3">
                    <Card className="border-red-500/30 bg-red-500/5">
                      <CardHeader>
                        <CardTitle className="text-red-300 text-lg">Fault Current Analysis</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-red-200 text-sm">Prospective Fault Current</div>
                            <div className="text-red-300 font-mono text-xl font-bold">
                              {result.faultCurrent.toFixed(0)} A
                            </div>
                          </div>
                          <div>
                            <div className="text-red-200 text-sm">Energy Let-through</div>
                            <div className="text-red-300 font-mono text-xl font-bold">
                              {result.energyLet.toFixed(1)} kJ
                            </div>
                          </div>
                        </div>
                        <div className={`p-3 rounded border ${
                          result.arcFlashRisk === 'Low' ? 'bg-green-500/10 border-green-500/20' :
                          result.arcFlashRisk === 'Medium' ? 'bg-yellow-500/10 border-yellow-500/20' :
                          result.arcFlashRisk === 'High' ? 'bg-orange-500/10 border-orange-500/20' :
                          'bg-red-500/10 border-red-500/20'
                        }`}>
                          <div className="text-sm font-medium">Arc Flash Risk: {result.arcFlashRisk}</div>
                        </div>
                      </CardContent>
                    </Card>

                    {result.recommendations.length > 0 && (
                      <Card className="border-amber-500/30 bg-amber-500/5">
                        <CardHeader>
                          <CardTitle className="text-amber-300 text-sm flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Recommendations
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-1 text-amber-200 text-sm">
                            {result.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-amber-400 mt-1">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ) : (
                  <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                    <CardContent className="pt-4">
                      <div className="text-center text-elec-yellow/80">
                        <Zap className="h-8 w-8 mx-auto mb-2" />
                        <p>Enter parameters to calculate fault current</p>
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
                    BS 7671 Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-blue-200 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">Regulation 434.5.1</h4>
                    <p>Protective devices must be capable of breaking the prospective fault current at their point of installation.</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Short-Circuit Current Calculation</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• Phase-Neutral: If = Uo / Zs</li>
                      <li>• Phase-Phase: If = √3 × U / Z</li>
                      <li>• Earth Fault: If = 0.8 × Uo / Zs</li>
                    </ul>
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

export default FaultCurrentCalculator;
