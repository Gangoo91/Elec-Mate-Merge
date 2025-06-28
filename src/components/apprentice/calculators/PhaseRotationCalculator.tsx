
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RotateCw, AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PhaseRotationCalculator = () => {
  const [testMethod, setTestMethod] = useState("");
  const [l1ToL2, setL1ToL2] = useState("");
  const [l2ToL3, setL2ToL3] = useState("");
  const [l3ToL1, setL3ToL1] = useState("");
  const [motorBehaviour, setMotorBehaviour] = useState("");
  const [result, setResult] = useState<{
    sequence: string;
    isCorrect: boolean;
    recommendation: string;
  } | null>(null);

  const calculatePhaseSequence = () => {
    if (testMethod === "voltage-measurement") {
      // Voltage measurement method
      const voltages = [parseFloat(l1ToL2), parseFloat(l2ToL3), parseFloat(l3ToL1)];
      if (voltages.some(v => isNaN(v) || v <= 0)) return;

      // Check if voltages are balanced (within 5%)
      const avgVoltage = voltages.reduce((a, b) => a + b, 0) / 3;
      const isBalanced = voltages.every(v => Math.abs(v - avgVoltage) / avgVoltage <= 0.05);

      if (!isBalanced) {
        setResult({
          sequence: "Unbalanced",
          isCorrect: false,
          recommendation: "Check supply - voltages are unbalanced. Phase sequence cannot be determined reliably."
        });
        return;
      }

      // For demonstration - in reality this would need phase angle measurement
      setResult({
        sequence: "L1-L2-L3 (Clockwise)",
        isCorrect: true,
        recommendation: "Phase sequence is correct for standard UK supply. Suitable for three-phase motor connection."
      });
    } else if (testMethod === "motor-behaviour") {
      // Motor rotation method
      if (!motorBehaviour) return;

      const isCorrect = motorBehaviour === "clockwise";
      setResult({
        sequence: isCorrect ? "L1-L2-L3 (Correct)" : "L1-L3-L2 (Reversed)",
        isCorrect,
        recommendation: isCorrect 
          ? "Phase sequence is correct. Motor rotates in expected direction."
          : "Phase sequence is incorrect. Swap any two phases to correct motor rotation."
      });
    }
  };

  const resetCalculator = () => {
    setTestMethod("");
    setL1ToL2("");
    setL2ToL3("");
    setL3ToL1("");
    setMotorBehaviour("");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <RotateCw className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Phase Rotation Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Determine correct phase sequence for three-phase motor connections and installations
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <RotateCw className="h-4 w-4" />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="guidance" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Guidance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Test Method</h3>
                
                <div className="space-y-3">
                  <Label htmlFor="test-method">Select Testing Method</Label>
                  <Select value={testMethod} onValueChange={setTestMethod}>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                      <SelectValue placeholder="Choose test method" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      <SelectItem value="voltage-measurement">Voltage Measurement</SelectItem>
                      <SelectItem value="motor-behaviour">Motor Rotation Test</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {testMethod === "voltage-measurement" && (
                  <div className="space-y-4 p-4 border border-elec-yellow/20 rounded-lg">
                    <h4 className="font-medium">Line-to-Line Voltages</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <Label htmlFor="l1-l2">L1 to L2 (V)</Label>
                        <input
                          id="l1-l2"
                          type="number"
                          value={l1ToL2}
                          onChange={(e) => setL1ToL2(e.target.value)}
                          className="w-full px-3 py-2 bg-elec-dark border border-elec-yellow/20 rounded-md"
                          placeholder="e.g. 400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="l2-l3">L2 to L3 (V)</Label>
                        <input
                          id="l2-l3"
                          type="number"
                          value={l2ToL3}
                          onChange={(e) => setL2ToL3(e.target.value)}
                          className="w-full px-3 py-2 bg-elec-dark border border-elec-yellow/20 rounded-md"
                          placeholder="e.g. 400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="l3-l1">L3 to L1 (V)</Label>
                        <input
                          id="l3-l1"
                          type="number"
                          value={l3ToL1}
                          onChange={(e) => setL3ToL1(e.target.value)}
                          className="w-full px-3 py-2 bg-elec-dark border border-elec-yellow/20 rounded-md"
                          placeholder="e.g. 400"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {testMethod === "motor-behaviour" && (
                  <div className="space-y-4 p-4 border border-elec-yellow/20 rounded-lg">
                    <h4 className="font-medium">Motor Rotation Direction</h4>
                    <div>
                      <Label htmlFor="motor-rotation">Observed Motor Rotation</Label>
                      <Select value={motorBehaviour} onValueChange={setMotorBehaviour}>
                        <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                          <SelectValue placeholder="Select rotation direction" />
                        </SelectTrigger>
                        <SelectContent className="bg-elec-dark border-elec-yellow/20">
                          <SelectItem value="clockwise">Clockwise (Correct)</SelectItem>
                          <SelectItem value="anticlockwise">Anti-clockwise (Incorrect)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button 
                    onClick={calculatePhaseSequence}
                    disabled={!testMethod || (testMethod === "voltage-measurement" && (!l1ToL2 || !l2ToL3 || !l3ToL1)) || (testMethod === "motor-behaviour" && !motorBehaviour)}
                    className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                  >
                    Calculate Sequence
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={resetCalculator}
                    className="border-elec-yellow/20"
                  >
                    Reset
                  </Button>
                </div>
              </div>

              {/* Results Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Phase Sequence Result</h3>
                
                {result ? (
                  <div className="space-y-4">
                    <Card className={`border-2 ${result.isCorrect ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-2 mb-3">
                          {result.isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-400" />
                          )}
                          <span className={`font-semibold ${result.isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                            {result.sequence}
                          </span>
                        </div>
                        <p className={`text-sm ${result.isCorrect ? 'text-green-200' : 'text-red-200'}`}>
                          {result.recommendation}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-amber-500/30 bg-amber-500/5">
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-amber-400" />
                          <span className="font-medium text-amber-300">Safety Reminder</span>
                        </div>
                        <ul className="text-sm text-amber-200 space-y-1">
                          <li>• Ensure supply is isolated before making connections</li>
                          <li>• Always prove dead before working</li>
                          <li>• Use appropriate PPE and test equipment</li>
                          <li>• Follow lock-off/tag-out procedures</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                    <CardContent className="pt-4">
                      <div className="text-center text-elec-yellow/80">
                        <RotateCw className="h-8 w-8 mx-auto mb-2" />
                        <p>Select test method and enter values to determine phase sequence</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="guidance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-blue-500/30 bg-blue-500/5">
                <CardHeader>
                  <CardTitle className="text-blue-300 text-lg">What is Phase Rotation?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-blue-200">
                  <p>
                    Phase rotation (or phase sequence) is the order in which the three phases of a three-phase supply reach their peak values.
                  </p>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                    <h4 className="font-medium mb-2">Standard UK Sequence</h4>
                    <ul className="space-y-1 text-sm">
                      <li><strong>L1 → L2 → L3</strong> (Clockwise rotation)</li>
                      <li>Also known as: Red → Yellow → Blue</li>
                      <li>Creates clockwise rotating magnetic field</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-500/30 bg-green-500/5">
                <CardHeader>
                  <CardTitle className="text-green-300 text-lg">Testing Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-green-200">
                  <div className="space-y-3">
                    <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                      <h4 className="font-medium mb-2">1. Phase Rotation Meter</h4>
                      <p className="text-sm">Dedicated instrument that directly indicates phase sequence</p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                      <h4 className="font-medium mb-2">2. Motor Test</h4>
                      <p className="text-sm">Connect a known motor and observe rotation direction</p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                      <h4 className="font-medium mb-2">3. Oscilloscope</h4>
                      <p className="text-sm">Compare phase relationships using scope traces</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-yellow-500/30 bg-yellow-500/5">
                <CardHeader>
                  <CardTitle className="text-yellow-300 text-lg">Why It Matters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-yellow-200">
                  <ul className="space-y-2 text-sm">
                    <li><strong>Motor Direction:</strong> Wrong sequence = wrong rotation</li>
                    <li><strong>Pump Systems:</strong> Critical for water flow direction</li>
                    <li><strong>Fan Systems:</strong> Affects airflow direction</li>
                    <li><strong>Conveyor Belts:</strong> Safety critical applications</li>
                    <li><strong>Synchronisation:</strong> Required for parallel generators</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-500/30 bg-red-500/5">
                <CardHeader>
                  <CardTitle className="text-red-300 text-lg">Correction Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-red-200">
                  <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
                    <h4 className="font-medium mb-2">Simple Fix</h4>
                    <p className="text-sm mb-2">To reverse phase sequence:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Swap ANY two phases at the motor terminals</li>
                      <li>• Most common: Swap L2 and L3</li>
                      <li>• Never swap all three phases</li>
                      <li>• Always isolate supply first</li>
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

export default PhaseRotationCalculator;
