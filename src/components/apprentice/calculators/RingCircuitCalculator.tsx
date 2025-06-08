
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import RingCircuitEducation from "./ring-circuit/RingCircuitEducation";

interface RingCircuitResult {
  r1: number;
  r2: number;
  rn: number;
  r1PlusR2: number;
  isValid: boolean;
  continuityStatus: string;
  recommendations: string[];
}

const RingCircuitCalculator = () => {
  const [readings, setReadings] = useState({
    endToEndLive: "",
    endToEndNeutral: "", 
    endToEndCpc: "",
    liveToNeutral: "",
    liveToCpc: "",
    neutralToCpc: ""
  });
  const [cableType, setCableType] = useState("");
  const [result, setResult] = useState<RingCircuitResult | null>(null);

  const calculateValues = () => {
    const endToEndLive = parseFloat(readings.endToEndLive) || 0;
    const endToEndNeutral = parseFloat(readings.endToEndNeutral) || 0;
    const endToEndCpc = parseFloat(readings.endToEndCpc) || 0;
    const liveToNeutral = parseFloat(readings.liveToNeutral) || 0;
    const liveToCpc = parseFloat(readings.liveToCpc) || 0;
    const neutralToCpc = parseFloat(readings.neutralToCpc) || 0;

    // Calculate R1, R2, and Rn values
    const r1 = endToEndLive / 4;
    const r2 = endToEndCpc / 4;
    const rn = endToEndNeutral / 4;
    const r1PlusR2 = r1 + r2;

    // Validation checks
    const isR1R2Valid = Math.abs(liveToNeutral - (r1 + rn)) < 0.05;
    const isR1RcpcValid = Math.abs(liveToCpc - r1PlusR2) < 0.05;
    const isRnRcpcValid = Math.abs(neutralToCpc - (rn + r2)) < 0.05;

    const isValid = isR1R2Valid && isR1RcpcValid && isRnRcpcValid;

    let continuityStatus = "";
    const recommendations: string[] = [];

    if (isValid) {
      continuityStatus = "Ring circuit continuity confirmed";
      recommendations.push("Circuit is properly connected and within acceptable limits");
    } else {
      continuityStatus = "Ring circuit continuity issues detected";
      if (!isR1R2Valid) recommendations.push("Check live to neutral connections");
      if (!isR1RcpcValid) recommendations.push("Check live to CPC connections");
      if (!isRnRcpcValid) recommendations.push("Check neutral to CPC connections");
    }

    const calculatedResult: RingCircuitResult = {
      r1,
      r2,
      rn,
      r1PlusR2,
      isValid,
      continuityStatus,
      recommendations
    };

    setResult(calculatedResult);
  };

  const handleInputChange = (field: string, value: string) => {
    const newReadings = { ...readings, [field]: value };
    setReadings(newReadings);
    
    // Auto-calculate if all required fields are filled
    const hasAllValues = Object.values(newReadings).every(val => val !== "");
    if (hasAllValues) {
      // Use setTimeout to ensure state is updated before calculation
      setTimeout(calculateValues, 0);
    }
  };

  const resetCalculator = () => {
    setReadings({
      endToEndLive: "",
      endToEndNeutral: "",
      endToEndCpc: "",
      liveToNeutral: "",
      liveToCpc: "",
      neutralToCpc: ""
    });
    setCableType("");
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Educational Content - Now Above Calculator */}
      <RingCircuitEducation />

      {/* Calculator */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-elec-yellow" />
            Ring Final Circuit Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Cable Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="cable-type">Cable Type</Label>
            <Select value={cableType} onValueChange={setCableType}>
              <SelectTrigger className="bg-elec-dark border-elec-yellow/30">
                <SelectValue placeholder="Select cable type" />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/30 z-50">
                <SelectItem value="2.5mm-twin">2.5mm² Twin & Earth</SelectItem>
                <SelectItem value="4mm-twin">4.0mm² Twin & Earth</SelectItem>
                <SelectItem value="6mm-twin">6.0mm² Twin & Earth</SelectItem>
                <SelectItem value="10mm-twin">10.0mm² Twin & Earth</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* End-to-End Readings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-elec-yellow">End-to-End Readings (Ω)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="end-to-end-live">Live Conductor</Label>
                <Input
                  id="end-to-end-live"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 1.20"
                  value={readings.endToEndLive}
                  onChange={(e) => handleInputChange("endToEndLive", e.target.value)}
                  className="bg-elec-dark border-elec-yellow/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-to-end-neutral">Neutral Conductor</Label>
                <Input
                  id="end-to-end-neutral"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 1.20"
                  value={readings.endToEndNeutral}
                  onChange={(e) => handleInputChange("endToEndNeutral", e.target.value)}
                  className="bg-elec-dark border-elec-yellow/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-to-end-cpc">CPC (Earth)</Label>
                <Input
                  id="end-to-end-cpc"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 1.92"
                  value={readings.endToEndCpc}
                  onChange={(e) => handleInputChange("endToEndCpc", e.target.value)}
                  className="bg-elec-dark border-elec-yellow/30"
                />
              </div>
            </div>
          </div>

          {/* Cross-Connected Readings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-elec-yellow">Cross-Connected Readings (Ω)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="live-to-neutral">Live to Neutral</Label>
                <Input
                  id="live-to-neutral"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 0.60"
                  value={readings.liveToNeutral}
                  onChange={(e) => handleInputChange("liveToNeutral", e.target.value)}
                  className="bg-elec-dark border-elec-yellow/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="live-to-cpc">Live to CPC</Label>
                <Input
                  id="live-to-cpc"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 1.56"
                  value={readings.liveToCpc}
                  onChange={(e) => handleInputChange("liveToCpc", e.target.value)}
                  className="bg-elec-dark border-elec-yellow/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="neutral-to-cpc">Neutral to CPC</Label>
                <Input
                  id="neutral-to-cpc"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 1.56"
                  value={readings.neutralToCpc}
                  onChange={(e) => handleInputChange("neutralToCpc", e.target.value)}
                  className="bg-elec-dark border-elec-yellow/30"
                />
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={calculateValues} className="flex-1">
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Ring Circuit
            </Button>
            <Button onClick={resetCalculator} variant="outline" className="flex-1">
              Reset Calculator
            </Button>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-4 pt-4 border-t border-elec-yellow/20">
              <h3 className="text-lg font-semibold text-elec-yellow">Results</h3>
              
              {/* Status Alert */}
              <Alert className={`border ${result.isValid ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'}`}>
                {result.isValid ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                )}
                <AlertDescription className={result.isValid ? 'text-green-400' : 'text-red-400'}>
                  {result.continuityStatus}
                </AlertDescription>
              </Alert>

              {/* Calculated Values */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-3 rounded-lg bg-elec-dark/30">
                  <div className="text-sm text-elec-light/70">R1 (Live)</div>
                  <div className="text-lg font-semibold text-elec-yellow">{result.r1.toFixed(3)} Ω</div>
                </div>
                <div className="p-3 rounded-lg bg-elec-dark/30">
                  <div className="text-sm text-elec-light/70">R2 (CPC)</div>
                  <div className="text-lg font-semibold text-elec-yellow">{result.r2.toFixed(3)} Ω</div>
                </div>
                <div className="p-3 rounded-lg bg-elec-dark/30">
                  <div className="text-sm text-elec-light/70">Rn (Neutral)</div>
                  <div className="text-lg font-semibold text-elec-yellow">{result.rn.toFixed(3)} Ω</div>
                </div>
                <div className="p-3 rounded-lg bg-elec-dark/30">
                  <div className="text-sm text-elec-light/70">R1 + R2</div>
                  <div className="text-lg font-semibold text-elec-yellow">{result.r1PlusR2.toFixed(3)} Ω</div>
                </div>
              </div>

              {/* Recommendations */}
              {result.recommendations.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-400" />
                    Recommendations
                  </h4>
                  <ul className="space-y-1">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-elec-light/80 pl-4 border-l-2 border-blue-400/30">
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RingCircuitCalculator;
