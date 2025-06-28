
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RotateCw, AlertTriangle, CheckCircle, XCircle, Lightbulb } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PhaseRotationCalculator = () => {
  const [l1Reading, setL1Reading] = useState("");
  const [l2Reading, setL2Reading] = useState("");
  const [l3Reading, setL3Reading] = useState("");
  const [testMethod, setTestMethod] = useState("");
  const [result, setResult] = useState<{
    sequence: string;
    isCorrect: boolean;
    motorDirection: string;
    recommendation: string;
  } | null>(null);

  const calculateRotation = () => {
    if (!l1Reading || !l2Reading || !l3Reading || !testMethod) return;

    const readings = [parseFloat(l1Reading), parseFloat(l2Reading), parseFloat(l3Reading)];
    
    // Simulate phase sequence determination based on readings
    // In real applications, this would be based on actual phase rotation measurement
    const isClockwise = readings[0] > readings[1] && readings[1] > readings[2];
    const sequence = isClockwise ? "L1-L2-L3 (Clockwise)" : "L1-L3-L2 (Anti-clockwise)";
    
    setResult({
      sequence,
      isCorrect: isClockwise,
      motorDirection: isClockwise ? "Forward (as designed)" : "Reverse (incorrect)",
      recommendation: isClockwise ? 
        "Phase sequence is correct for standard motor operation" : 
        "Swap any two phases to correct the rotation"
    });
  };

  const resetCalculator = () => {
    setL1Reading("");
    setL2Reading("");
    setL3Reading("");
    setTestMethod("");
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
          Determine correct phase sequence for 3-phase motor connections and installations
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="guidance">Guidance</TabsTrigger>
            <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="test-method">Test Method</Label>
                  <Select value={testMethod} onValueChange={setTestMethod}>
                    <SelectTrigger id="test-method">
                      <SelectValue placeholder="Select test method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phase-indicator">Phase Rotation Indicator</SelectItem>
                      <SelectItem value="multimeter">Digital Multimeter</SelectItem>
                      <SelectItem value="oscilloscope">Oscilloscope</SelectItem>
                      <SelectItem value="motor-test">Motor Test Run</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="l1-reading">L1 Reading (V)</Label>
                    <input
                      id="l1-reading"
                      type="number"
                      value={l1Reading}
                      onChange={(e) => setL1Reading(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="230"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="l2-reading">L2 Reading (V)</Label>
                    <input
                      id="l2-reading"
                      type="number"
                      value={l2Reading}
                      onChange={(e) => setL2Reading(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="230"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="l3-reading">L3 Reading (V)</Label>
                    <input
                      id="l3-reading"
                      type="number"
                      value={l3Reading}
                      onChange={(e) => setL3Reading(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="230"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={calculateRotation} className="flex-1">
                    Determine Rotation
                  </Button>
                  <Button variant="outline" onClick={resetCalculator}>
                    Reset
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {result ? (
                  <Card className={`${result.isCorrect ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center gap-2 ${result.isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                        {result.isCorrect ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                        Phase Sequence Result
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <span className="font-medium">Sequence: </span>
                        <span className={result.isCorrect ? 'text-green-300' : 'text-red-300'}>
                          {result.sequence}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Motor Direction: </span>
                        <span className={result.isCorrect ? 'text-green-300' : 'text-red-300'}>
                          {result.motorDirection}
                        </span>
                      </div>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                        <p className="text-blue-200 text-sm">{result.recommendation}</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                    <CardContent className="pt-4">
                      <div className="text-center text-elec-yellow/80">
                        <RotateCw className="h-8 w-8 mx-auto mb-2" />
                        <p>Enter readings to determine phase rotation</p>
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
                    <Lightbulb className="h-5 w-5" />
                    Understanding Phase Rotation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-blue-200 text-sm">
                  <p>Phase rotation determines the direction of rotation for 3-phase motors and the proper operation of 3-phase equipment.</p>
                  <div className="space-y-2">
                    <h4 className="font-medium">Standard UK Phase Sequence:</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• L1 → L2 → L3 (120° apart)</li>
                      <li>• Clockwise rotation when viewed from motor shaft</li>
                      <li>• Brown → Black → Grey wire colours</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-amber-500/30 bg-amber-500/5">
                <CardHeader>
                  <CardTitle className="text-amber-300">Testing Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-amber-200 text-sm">
                  <div className="space-y-2">
                    <h4 className="font-medium">1. Phase Rotation Indicator</h4>
                    <p>Most accurate method - connects to all three phases and shows rotation direction</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">2. Motor Test Run</h4>
                    <p>Connect motor and observe rotation direction (ensure safe test conditions)</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">3. Oscilloscope Method</h4>
                    <p>View phase relationships graphically to determine sequence</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="troubleshooting">
            <div className="space-y-4">
              <Card className="border-red-500/30 bg-red-500/5">
                <CardHeader>
                  <CardTitle className="text-red-300 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Common Issues & Solutions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-red-200 text-sm">
                  <div className="space-y-2">
                    <h4 className="font-medium">Motor Running Backwards:</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• Swap any two phases at the motor terminal</li>
                      <li>• Check phase sequence at supply</li>
                      <li>• Verify motor connection diagram</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Inconsistent Readings:</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• Check for loose connections</li>
                      <li>• Verify supply voltage balance</li>
                      <li>• Test with different measuring equipment</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">No Clear Indication:</h4>
                    <ul className="space-y-1 ml-4">
                      <li>• Use dedicated phase rotation meter</li>
                      <li>• Check all three phases are present</li>
                      <li>• Verify equipment is functioning correctly</li>
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
