
import { fuseTypes, curveTypes } from "./ZsValuesData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Calculator, Info } from "lucide-react";

interface ZsCalculatorResultProps {
  result: number | null;
  protectionType: string;
  mcbRating: string;
  rcboRating: string;
  fusRating: string;
  fuseType: string;
  mcbCurve: string;
  rcboCurve: string;
}

const ZsCalculatorResult = ({
  result,
  protectionType,
  mcbRating,
  rcboRating,
  fusRating,
  fuseType,
  mcbCurve,
  rcboCurve
}: ZsCalculatorResultProps) => {
  const getDeviceDescription = () => {
    if (protectionType === "mcb" && mcbRating && mcbCurve) {
      const curveDescription = curveTypes[mcbCurve as keyof typeof curveTypes];
      return `MCB ${mcbRating}A ${curveDescription}`;
    }
    if (protectionType === "rcbo" && rcboRating && rcboCurve) {
      const curveDescription = curveTypes[rcboCurve as keyof typeof curveTypes];
      return `RCBO ${rcboRating}A ${curveDescription}`;
    }
    if (protectionType === "fuse" && fuseType && fusRating) {
      return `${fuseTypes[fuseType as keyof typeof fuseTypes]} ${fusRating}A`;
    }
    return "";
  };

  const get80PercentValue = () => {
    if (result === null) return null;
    return (result * 0.8).toFixed(2);
  };

  const getNoteText = () => {
    if (protectionType === "mcb" && mcbCurve) {
      const curveDescription = curveTypes[mcbCurve as keyof typeof curveTypes];
      return `${curveDescription} MCBs`;
    }
    if (protectionType === "rcbo" && rcboCurve) {
      const curveDescription = curveTypes[rcboCurve as keyof typeof curveTypes];
      return `${curveDescription} RCBOs`;
    }
    if (protectionType === "fuse" && fuseType === "bs3036") {
      return "rewirable fuses";
    }
    if (protectionType === "fuse" && fuseType === "bs1362") {
      return "plug fuses in 13A sockets";
    }
    if (protectionType === "fuse" && (fuseType?.includes("iec") || fuseType?.includes("din") || fuseType?.includes("neozed") || fuseType?.includes("diazed"))) {
      return "European/industrial fuses";
    }
    if (protectionType === "fuse" && fuseType === "bs88-6") {
      return "motor circuit HRC fuses";
    }
    return "cartridge fuses";
  };

  const getCurveExplanation = () => {
    if (protectionType === "mcb" && mcbCurve) {
      switch (mcbCurve) {
        case "type-a":
          return "Type A: Most sensitive, trips at 2-3 times rated current. Used for semiconductor protection.";
        case "type-b":
          return "Type B: Standard domestic use, trips at 3-5 times rated current. Most common in UK homes.";
        case "type-c":
          return "Type C: Industrial use, trips at 5-10 times rated current. Used for motor circuits.";
        case "type-d":
          return "Type D: High inrush loads, trips at 10-20 times rated current. Used for transformers and welding equipment.";
        default:
          return "";
      }
    }
    if (protectionType === "rcbo" && rcboCurve) {
      switch (rcboCurve) {
        case "type-a":
          return "Type A: Most sensitive, trips at 2-3 times rated current with RCD protection.";
        case "type-b":
          return "Type B: Standard domestic use, trips at 3-5 times rated current with RCD protection.";
        case "type-c":
          return "Type C: Industrial use, trips at 5-10 times rated current with RCD protection.";
        case "type-d":
          return "Type D: High inrush loads, trips at 10-20 times rated current with RCD protection.";
        default:
          return "";
      }
    }
    return "";
  };

  if (result === null) {
    return (
      <div className="bg-elec-dark/50 rounded-lg p-4">
        <h3 className="text-lg font-medium text-elec-yellow mb-4">Maximum Zs Values</h3>
        <p className="text-muted-foreground">
          Select protection device type{protectionType === "fuse" ? ", fuse type," : protectionType === "mcb" || protectionType === "rcbo" ? ", curve type," : ""} and rating to calculate maximum Zs values
        </p>
      </div>
    );
  }

  const workingValue = get80PercentValue();

  return (
    <div className="space-y-4">
      {/* Main Results Card */}
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-yellow">
            <Calculator className="h-5 w-5" />
            Zs Values for {getDeviceDescription()}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tabulated Value */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-blue-300">BS 7671 Tabulated Value</h4>
              <Badge variant="outline" className="text-blue-300 border-blue-400/30">
                Table 41.3
              </Badge>
            </div>
            <div className="text-3xl font-bold text-blue-200 mb-2">{result}Ω</div>
            <p className="text-sm text-blue-200/80">
              Maximum earth fault loop impedance from BS 7671 tables
            </p>
          </div>

          {/* Working Value */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-green-300">Practical Working Value (80%)</h4>
              <Badge variant="outline" className="text-green-300 border-green-400/30">
                Recommended
              </Badge>
            </div>
            <div className="text-3xl font-bold text-green-200 mb-2">{workingValue}Ω</div>
            <p className="text-sm text-green-200/80">
              Recommended maximum for testing to account for temperature variations
            </p>
          </div>

          {/* Calculation Breakdown */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-4 w-4 text-amber-400" />
              <h4 className="font-medium text-amber-300">Calculation Breakdown</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-amber-200">BS 7671 Tabulated Value:</span>
                <span className="text-amber-100 font-mono">{result}Ω</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-200">Temperature Correction (80%):</span>
                <span className="text-amber-100 font-mono">{result} × 0.8 = {workingValue}Ω</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testing Guidance */}
      <Card className="border-purple-500/30 bg-purple-500/5">
        <CardHeader>
          <CardTitle className="text-purple-300 text-lg">Testing Guidance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-white font-medium">Pass Condition</p>
              <p className="text-xs text-muted-foreground">
                Measured Zs ≤ {workingValue}Ω (working value recommended for testing)
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-white font-medium">Investigation Required</p>
              <p className="text-xs text-muted-foreground">
                If measured Zs is between {workingValue}Ω and {result}Ω, consider temperature effects
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Device Information */}
      {getCurveExplanation() && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
          <p className="text-xs text-blue-300">
            <strong>Device Info:</strong> {getCurveExplanation()}
          </p>
        </div>
      )}

      {/* Standards Note */}
      <div className="bg-gray-500/10 border border-gray-500/30 rounded p-3">
        <p className="text-xs text-gray-300">
          <strong>Note:</strong> These values are for {getNoteText()} at 230V according to BS 7671. 
          The 80% working value accounts for conductor temperature rise during normal operation.
        </p>
      </div>

      {/* Earth Fault Current Calculation */}
      <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
        <h4 className="font-medium text-red-300 mb-2">Earth Fault Current Calculation</h4>
        <div className="text-xs text-red-200 space-y-1">
          <div>If = 0.8 × Uo / Zs</div>
          <div className="text-red-100">
            At tabulated value: If = 0.8 × 230V / {result}Ω = {(0.8 * 230 / result).toFixed(1)}A
          </div>
          <div className="text-red-100">
            At working value: If = 0.8 × 230V / {workingValue}Ω = {(0.8 * 230 / parseFloat(workingValue!)).toFixed(1)}A
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZsCalculatorResult;
