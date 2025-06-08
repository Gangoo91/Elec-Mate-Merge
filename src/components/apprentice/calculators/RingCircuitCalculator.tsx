
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RotateCw, AlertCircle, CheckCircle } from "lucide-react";

interface RingTestResult {
  r1PlusR2: number;
  endToEnd: number;
  valid: boolean;
  recommendations: string[];
  issues: string[];
}

const RingCircuitCalculator = () => {
  const [cableSize, setCableSize] = useState<string>("");
  const [r1, setR1] = useState<string>("");
  const [rn, setRn] = useState<string>("");
  const [r2, setR2] = useState<string>("");
  const [testMethod, setTestMethod] = useState<string>("");
  const [result, setResult] = useState<RingTestResult | null>(null);

  // Resistance values per meter for common cable sizes (mΩ/m at 20°C)
  const cableResistances = {
    "1.5": 12.1,
    "2.5": 7.41,
    "4.0": 4.61,
    "6.0": 3.08,
    "10.0": 1.83,
    "16.0": 1.15,
  };

  const calculateRingCircuit = (): RingTestResult | null => {
    const r1Value = parseFloat(r1);
    const rnValue = parseFloat(rn);
    const r2Value = parseFloat(r2);

    if (!r1Value || !rnValue || !r2Value || !testMethod) return null;

    // Calculate R1 + R2 at the midpoint
    const r1PlusR2 = (r1Value + r2Value) / 4;
    
    // Calculate end-to-end resistance
    const endToEnd = (r1Value + r2Value) / 2;
    
    // Validation checks for ring circuit
    const recommendations: string[] = [];
    const issues: string[] = [];
    let valid = true;

    // Check if readings are within acceptable ranges
    const ratio = Math.max(r1Value, r2Value) / Math.min(r1Value, r2Value);
    if (ratio > 1.67) { // More than 67% difference
      issues.push("High resistance difference between legs - check for poor connections");
      valid = false;
    }

    // Check for opens in neutral
    if (rnValue > r1Value * 1.5 || rnValue > r2Value * 1.5) {
      issues.push("High neutral resistance - check neutral connections");
      valid = false;
    }

    // Check overall resistance is reasonable for cable size
    if (cableSize) {
      const expectedResistance = cableResistances[cableSize as keyof typeof cableResistances];
      if (expectedResistance && r1PlusR2 > expectedResistance * 0.1) { // Assuming 100m max ring
        issues.push("Resistance higher than expected for cable size - check installation");
      }
    }

    if (valid) {
      recommendations.push("Ring circuit test results are within acceptable limits");
      recommendations.push("Ensure test measurements are taken at room temperature");
      recommendations.push("Document all readings on installation certificate");
    }

    return {
      r1PlusR2: Math.round(r1PlusR2 * 1000) / 1000,
      endToEnd: Math.round(endToEnd * 1000) / 1000,
      valid,
      recommendations,
      issues
    };
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    if (r1 && rn && r2 && testMethod) {
      const newResult = calculateRingCircuit();
      setResult(newResult);
    } else {
      setResult(null);
    }
  }, [r1, rn, r2, testMethod, cableSize]);

  const resetCalculator = () => {
    setCableSize("");
    setR1("");
    setRn("");
    setR2("");
    setTestMethod("");
    setResult(null);
  };

  const isFormValid = r1 && rn && r2 && testMethod;

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <RotateCw className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Ring Final Circuit Calculator</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-elec-yellow">Test Parameters</h3>
            
            <div className="space-y-2">
              <Label htmlFor="cable-size">Cable Size (mm²)</Label>
              <Select value={cableSize} onValueChange={setCableSize}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-white">
                  <SelectValue placeholder="Select cable size" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
                  <SelectItem value="1.5" className="text-white hover:bg-elec-yellow/10">1.5mm²</SelectItem>
                  <SelectItem value="2.5" className="text-white hover:bg-elec-yellow/10">2.5mm²</SelectItem>
                  <SelectItem value="4.0" className="text-white hover:bg-elec-yellow/10">4.0mm²</SelectItem>
                  <SelectItem value="6.0" className="text-white hover:bg-elec-yellow/10">6.0mm²</SelectItem>
                  <SelectItem value="10.0" className="text-white hover:bg-elec-yellow/10">10.0mm²</SelectItem>
                  <SelectItem value="16.0" className="text-white hover:bg-elec-yellow/10">16.0mm²</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="test-method">Test Method</Label>
              <Select value={testMethod} onValueChange={setTestMethod}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-white">
                  <SelectValue placeholder="Select test method" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
                  <SelectItem value="live-live" className="text-white hover:bg-elec-yellow/10">Live to Live</SelectItem>
                  <SelectItem value="live-neutral" className="text-white hover:bg-elec-yellow/10">Live to Neutral</SelectItem>
                  <SelectItem value="live-earth" className="text-white hover:bg-elec-yellow/10">Live to Earth</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="r1">R1 - Phase Conductor (Ω)</Label>
              <Input
                id="r1"
                type="number"
                step="0.001"
                value={r1}
                onChange={(e) => setR1(e.target.value)}
                placeholder="Enter R1 reading"
                className="bg-elec-dark border-elec-yellow/20 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rn">Rn - Neutral Conductor (Ω)</Label>
              <Input
                id="rn"
                type="number"
                step="0.001"
                value={rn}
                onChange={(e) => setRn(e.target.value)}
                placeholder="Enter Rn reading"
                className="bg-elec-dark border-elec-yellow/20 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="r2">R2 - Earth/CPC Conductor (Ω)</Label>
              <Input
                id="r2"
                type="number"
                step="0.001"
                value={r2}
                onChange={(e) => setR2(e.target.value)}
                placeholder="Enter R2 reading"
                className="bg-elec-dark border-elec-yellow/20 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                onClick={() => setResult(calculateRingCircuit())} 
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex-1"
                disabled={!isFormValid}
              >
                <RotateCw className="mr-2 h-4 w-4" />
                Recalculate
              </Button>
              <Button variant="outline" onClick={resetCalculator} className="border-elec-yellow/50 text-elec-yellow hover:bg-elec-yellow/10">
                Reset
              </Button>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-elec-dark/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-elec-yellow mb-4">Test Results</h3>
            {result ? (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-elec-light/80">R1 + R2 (midpoint):</span>
                    <span className="text-xl font-bold text-white">{result.r1PlusR2}Ω</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-elec-light/80">End-to-End:</span>
                    <span className="text-lg font-semibold text-white">{result.endToEnd}Ω</span>
                  </div>
                </div>

                <div className={`p-3 rounded-lg border flex items-center gap-2 ${
                  result.valid 
                    ? 'bg-green-500/10 border-green-500/30' 
                    : 'bg-red-500/10 border-red-500/30'
                }`}>
                  {result.valid ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  )}
                  <p className={`text-sm font-medium ${
                    result.valid ? 'text-green-300' : 'text-red-300'
                  }`}>
                    {result.valid ? 'Test Results Valid' : 'Issues Detected'}
                  </p>
                </div>

                {result.issues.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-red-300">Issues:</h4>
                    {result.issues.map((issue, index) => (
                      <p key={index} className="text-xs text-red-200 flex items-start gap-1">
                        <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        {issue}
                      </p>
                    ))}
                  </div>
                )}

                {result.recommendations.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-green-300">Recommendations:</h4>
                    {result.recommendations.map((rec, index) => (
                      <p key={index} className="text-xs text-elec-light/80 flex items-start gap-1">
                        <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0 text-green-400" />
                        {rec}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <RotateCw className="h-12 w-12 text-elec-light/20 mx-auto mb-4" />
                <p className="text-elec-light/60">Enter test readings to calculate ring circuit values</p>
                <p className="text-xs text-elec-light/40 mt-2">Results will update automatically as you type</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-300 mb-2">Ring Final Circuit Testing</h4>
          <p className="text-xs text-elec-light/80">
            Ring final circuits must be tested to verify continuity and proper installation. 
            The resistance of each leg should be similar, and R1 + R2 is measured at the midpoint 
            to ensure proper earthing arrangements. Results update automatically as you enter values.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RingCircuitCalculator;
