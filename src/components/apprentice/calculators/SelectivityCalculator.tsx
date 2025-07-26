import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelectWrapper as MobileSelect } from "@/components/ui/mobile-select-wrapper";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Zap, Calculator, RotateCcw, ArrowDownUp, Target } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SelectivityCalculator = () => {
  const [upstreamDevice, setUpstreamDevice] = useState<string>("mccb");
  const [upstreamRating, setUpstreamRating] = useState<string>("");
  const [upstreamCurve, setUpstreamCurve] = useState<string>("");
  const [downstreamDevice, setDownstreamDevice] = useState<string>("mcb");
  const [downstreamRating, setDownstreamRating] = useState<string>("");
  const [downstreamCurve, setDownstreamCurve] = useState<string>("B");
  const [faultCurrent, setFaultCurrent] = useState<string>("");
  const [result, setResult] = useState<{
    selectivityRatio: number;
    isSelective: boolean;
    selectivityLimit: number;
    recommendations: string[];
    operatingTimes: {
      upstream: number;
      downstream: number;
    };
  } | null>(null);

  const deviceTypes = {
    mcb: "MCB (Miniature Circuit Breaker)",
    mccb: "MCCB (Moulded Case Circuit Breaker)",
    fuse: "Fuse (BS 88/1361)",
    rcbo: "RCBO (Residual Current Breaker)"
  };

  const mcbCurves = {
    B: "B Curve (3-5 x In)",
    C: "C Curve (5-10 x In)", 
    D: "D Curve (10-20 x In)"
  };

  const calculateSelectivity = () => {
    const upRating = parseFloat(upstreamRating);
    const downRating = parseFloat(downstreamRating);
    const faultI = parseFloat(faultCurrent);

    if (upRating > 0 && downRating > 0 && faultI > 0) {
      // Basic selectivity ratio
      const selectivityRatio = upRating / downRating;

      // Calculate magnetic trip levels
      let downstreamMagnetic = 0;
      let upstreamMagnetic = 0;

      if (downstreamDevice === "mcb") {
        switch (downstreamCurve) {
          case "B": downstreamMagnetic = downRating * 5; break;
          case "C": downstreamMagnetic = downRating * 10; break;
          case "D": downstreamMagnetic = downRating * 20; break;
        }
      } else {
        downstreamMagnetic = downRating * 10; // Default for MCCB/others
      }

      if (upstreamDevice === "mcb") {
        switch (upstreamCurve) {
          case "B": upstreamMagnetic = upRating * 5; break;
          case "C": upstreamMagnetic = upRating * 10; break;
          case "D": upstreamMagnetic = upRating * 20; break;
        }
      } else {
        upstreamMagnetic = upRating * 8; // Typical MCCB magnetic setting
      }

      // Selectivity limit (current at which selectivity is lost)
      const selectivityLimit = Math.min(upstreamMagnetic, downstreamMagnetic * 1.6);

      // Estimate operating times (simplified)
      const downstreamTime = faultI > downstreamMagnetic ? 0.01 : 0.1; // 10ms magnetic, 100ms thermal
      const upstreamTime = faultI > upstreamMagnetic ? 0.02 : 0.4; // Delayed

      // Check if selective
      const isSelective = (faultI < selectivityLimit) && (upstreamTime > downstreamTime * 2);

      // Generate recommendations
      const recommendations = [];
      
      if (!isSelective) {
        recommendations.push("Selectivity not achieved at fault current level");
        recommendations.push("Consider increasing upstream device rating");
        recommendations.push("Review downstream device curve type");
      } else {
        recommendations.push("Selectivity achieved up to " + selectivityLimit.toFixed(0) + "A");
      }

      if (selectivityRatio < 1.6) {
        recommendations.push("Selectivity ratio too low - increase to minimum 1.6:1");
      }

      if (upstreamDevice === downstreamDevice && upstreamCurve === downstreamCurve) {
        recommendations.push("Same device types may not provide selectivity");
        recommendations.push("Consider time-delayed upstream protection");
      }

      recommendations.push("Verify with manufacturer's selectivity tables");
      recommendations.push("Test coordination under actual fault conditions");

      setResult({
        selectivityRatio,
        isSelective,
        selectivityLimit,
        recommendations,
        operatingTimes: {
          upstream: upstreamTime,
          downstream: downstreamTime
        }
      });
    }
  };

  const reset = () => {
    setUpstreamDevice("mccb");
    setUpstreamRating("");
    setUpstreamCurve("");
    setDownstreamDevice("mcb");
    setDownstreamRating("");
    setDownstreamCurve("B");
    setFaultCurrent("");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ArrowDownUp className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Selectivity/Discrimination Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate protection device selectivity and discrimination for proper fault current coordination.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-elec-yellow">Upstream Protection</h3>
            
            <MobileSelect
              label="Upstream Device Type"
              placeholder="Select upstream device"
              value={upstreamDevice}
              onValueChange={setUpstreamDevice}
              options={Object.entries(deviceTypes).map(([key, type]) => ({ value: key, label: type }))}
            />

            <MobileInput
              label="Upstream Rating (A)"
              type="number"
              value={upstreamRating}
              onChange={(e) => setUpstreamRating(e.target.value)}
              placeholder="e.g., 100"
              unit="A"
            />

            {upstreamDevice === "mcb" && (
              <MobileSelect
                label="Upstream Curve"
                placeholder="Select curve type"
                value={upstreamCurve}
                onValueChange={setUpstreamCurve}
                options={Object.entries(mcbCurves).map(([key, curve]) => ({ value: key, label: curve }))}
              />
            )}

            <Separator />

            <h3 className="text-lg font-medium text-elec-yellow">Downstream Protection</h3>

            <MobileSelect
              label="Downstream Device Type"
              placeholder="Select downstream device"
              value={downstreamDevice}
              onValueChange={setDownstreamDevice}
              options={Object.entries(deviceTypes).map(([key, type]) => ({ value: key, label: type }))}
            />

            <MobileInput
              label="Downstream Rating (A)"
              type="number"
              value={downstreamRating}
              onChange={(e) => setDownstreamRating(e.target.value)}
              placeholder="e.g., 32"
              unit="A"
            />

            {downstreamDevice === "mcb" && (
              <MobileSelect
                label="Downstream Curve"
                placeholder="Select curve type"
                value={downstreamCurve}
                onValueChange={setDownstreamCurve}
                options={Object.entries(mcbCurves).map(([key, curve]) => ({ value: key, label: curve }))}
              />
            )}

            <MobileInput
              label="Fault Current (A)"
              type="number"
              value={faultCurrent}
              onChange={(e) => setFaultCurrent(e.target.value)}
              placeholder="e.g., 1000"
              unit="A"
            />

            <div className="flex flex-col sm:flex-row gap-2">
              <MobileButton 
                onClick={calculateSelectivity}
                variant="elec"
                size="wide"
                disabled={!upstreamRating || !downstreamRating || !faultCurrent}
                className="sm:flex-1"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Selectivity
              </MobileButton>
              <MobileButton 
                onClick={reset} 
                variant="outline" 
                size="default"
                className="sm:w-auto"
              >
                <RotateCcw className="h-4 w-4" />
              </MobileButton>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <div className="rounded-md bg-elec-dark p-6 min-h-[400px]">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Selectivity Analysis</h3>
                    <Badge 
                      variant={result.isSelective ? "default" : "destructive"}
                      className="mb-4"
                    >
                      {result.isSelective ? "✓ Selective" : "✗ Not Selective"}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Selectivity Ratio:</span>
                      <div className="font-mono text-elec-yellow text-lg">{result.selectivityRatio.toFixed(2)}:1</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Selectivity Limit:</span>
                      <div className="font-mono text-elec-yellow">{result.selectivityLimit.toFixed(0)} A</div>
                    </div>

                    <Separator />

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-blue-400" />
                        <span className="font-medium">Operating Times:</span>
                      </div>
                      <div className="pl-6 space-y-1">
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">Downstream:</span>
                          <span className="text-elec-yellow">{(result.operatingTimes.downstream * 1000).toFixed(0)}ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">Upstream:</span>
                          <span className="text-elec-yellow">{(result.operatingTimes.upstream * 1000).toFixed(0)}ms</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-orange-400" />
                        <span className="font-medium">Recommendations:</span>
                      </div>
                      <ul className="space-y-1 pl-6">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="text-xs text-muted-foreground">• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Configure protection devices to analyze selectivity
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <ArrowDownUp className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                This is a simplified selectivity analysis. Always verify with manufacturer's 
                selectivity tables and consider fault current asymmetry factors.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SelectivityCalculator;