
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RotateCw } from "lucide-react";

const RingCircuitCalculator = () => {
  const [cableSize, setCableSize] = useState("");
  const [r1, setR1] = useState("");
  const [rn, setRn] = useState("");
  const [r2, setR2] = useState("");
  const [testMethod, setTestMethod] = useState("");
  const [result, setResult] = useState<{
    r1PlusR2: number;
    endToEnd: number;
    valid: boolean;
    recommendations: string[];
  } | null>(null);

  // Resistance values per meter for common cable sizes (mΩ/m at 20°C)
  const cableResistances = {
    "1.5": 12.1,
    "2.5": 7.41,
    "4.0": 4.61,
    "6.0": 3.08,
    "10.0": 1.83,
    "16.0": 1.15,
  };

  const calculateRingCircuit = () => {
    const r1Value = parseFloat(r1);
    const rnValue = parseFloat(rn);
    const r2Value = parseFloat(r2);

    if (!r1Value || !rnValue || !r2Value || !testMethod) return;

    // Calculate R1 + R2 at the midpoint
    const r1PlusR2 = (r1Value + r2Value) / 4;
    
    // Calculate end-to-end resistance
    const endToEnd = (r1Value + r2Value) / 2;
    
    // Validation checks for ring circuit
    const recommendations: string[] = [];
    let valid = true;

    // Check if readings are within acceptable ranges
    const ratio = Math.max(r1Value, r2Value) / Math.min(r1Value, r2Value);
    if (ratio > 1.67) { // More than 67% difference
      recommendations.push("High resistance difference between legs - check for poor connections");
      valid = false;
    }

    // Check for opens in neutral
    if (rnValue > r1Value * 1.5 || rnValue > r2Value * 1.5) {
      recommendations.push("High neutral resistance - check neutral connections");
      valid = false;
    }

    // Check overall resistance is reasonable for cable size
    if (cableSize) {
      const expectedResistance = cableResistances[cableSize as keyof typeof cableResistances];
      if (expectedResistance && r1PlusR2 > expectedResistance * 0.1) { // Assuming 100m max ring
        recommendations.push("Resistance higher than expected for cable size - check installation");
      }
    }

    if (valid) {
      recommendations.push("Ring circuit test results are within acceptable limits");
    }

    setResult({
      r1PlusR2: Math.round(r1PlusR2 * 1000) / 1000,
      endToEnd: Math.round(endToEnd * 1000) / 1000,
      valid,
      recommendations
    });
  };

  const resetCalculator = () => {
    setCableSize("");
    setR1("");
    setRn("");
    setR2("");
    setTestMethod("");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <RotateCw className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Ring Final Circuit Calculator</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="cable-size">Cable Size (mm²)</Label>
              <Select value={cableSize} onValueChange={setCableSize}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select cable size" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="1.5">1.5mm²</SelectItem>
                  <SelectItem value="2.5">2.5mm²</SelectItem>
                  <SelectItem value="4.0">4.0mm²</SelectItem>
                  <SelectItem value="6.0">6.0mm²</SelectItem>
                  <SelectItem value="10.0">10.0mm²</SelectItem>
                  <SelectItem value="16.0">16.0mm²</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="test-method">Test Method</Label>
              <Select value={testMethod} onValueChange={setTestMethod}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select test method" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="live-live">Live to Live</SelectItem>
                  <SelectItem value="live-neutral">Live to Neutral</SelectItem>
                  <SelectItem value="live-earth">Live to Earth</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="r1">R1 - Phase Conductor (Ω)</Label>
              <Input
                id="r1"
                type="number"
                step="0.001"
                value={r1}
                onChange={(e) => setR1(e.target.value)}
                placeholder="Enter R1 reading"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="rn">Rn - Neutral Conductor (Ω)</Label>
              <Input
                id="rn"
                type="number"
                step="0.001"
                value={rn}
                onChange={(e) => setRn(e.target.value)}
                placeholder="Enter Rn reading"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="r2">R2 - Earth/CPC Conductor (Ω)</Label>
              <Input
                id="r2"
                type="number"
                step="0.001"
                value={r2}
                onChange={(e) => setR2(e.target.value)}
                placeholder="Enter R2 reading"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={calculateRingCircuit} 
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                disabled={!r1 || !rn || !r2 || !testMethod}
              >
                <RotateCw className="mr-2 h-4 w-4" />
                Calculate
              </Button>
              <Button variant="outline" onClick={resetCalculator}>
                Reset
              </Button>
            </div>
          </div>

          <div className="bg-elec-dark/50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-elec-yellow mb-4">Test Results</h3>
            {result ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-lg font-semibold text-white">
                    R1 + R2: {result.r1PlusR2}Ω
                  </div>
                  <div className="text-sm text-muted-foreground">
                    End-to-End: {result.endToEnd}Ω
                  </div>
                </div>

                <div className={`p-3 rounded border ${
                  result.valid 
                    ? 'bg-green-500/10 border-green-500/30' 
                    : 'bg-red-500/10 border-red-500/30'
                }`}>
                  <p className={`text-sm font-medium ${
                    result.valid ? 'text-green-300' : 'text-red-300'
                  }`}>
                    {result.valid ? '✓ Test Results Valid' : '⚠ Check Required'}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white">Recommendations:</h4>
                  {result.recommendations.map((rec, index) => (
                    <p key={index} className="text-xs text-muted-foreground">
                      • {rec}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">Enter test readings to calculate ring circuit values</p>
            )}
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-300 mb-2">Ring Final Circuit Testing</h4>
          <p className="text-xs text-muted-foreground">
            Ring final circuits must be tested to verify continuity and proper installation. 
            The resistance of each leg should be similar, and R1 + R2 is measured at the midpoint 
            to ensure proper earthing arrangements.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RingCircuitCalculator;
