
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertTriangle, Calculator, Thermometer } from "lucide-react";

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
  if (!result) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-yellow/5">
        <CardContent className="pt-4">
          <div className="text-center text-elec-yellow/80">
            <Calculator className="h-8 w-8 mx-auto mb-2" />
            <p>Select protection device to view maximum Zs values</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getDeviceDescription = () => {
    if (protectionType === "mcb") {
      return `${mcbRating}A ${mcbCurve}-curve MCB`;
    } else if (protectionType === "rcbo") {
      return `${rcboRating}A ${rcboCurve}-curve RCBO`;
    } else if (protectionType === "fuse") {
      return `${fusRating}A ${fuseType}`;
    }
    return "Unknown device";
  };

  const get80PercentValue = () => {
    return result * 0.8;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Maximum Zs Values</h3>
      
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-300 text-lg flex items-center gap-2">
            <Thermometer className="h-5 w-5" />
            {getDeviceDescription()}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tabulated Value */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded p-4">
              <div className="text-center">
                <div className="text-blue-200 text-sm mb-1">BS 7671 Tabulated Value</div>
                <div className="text-blue-300 font-mono text-2xl font-bold">
                  {result.toFixed(2)} Ω
                </div>
                <div className="text-blue-200/80 text-xs mt-1">
                  (At 70°C conductor temperature)
                </div>
              </div>
            </div>

            {/* 80% Test Value */}
            <div className="bg-green-500/10 border border-green-500/20 rounded p-4">
              <div className="text-center">
                <div className="text-green-200 text-sm mb-1">Maximum Test Value</div>
                <div className="text-green-300 font-mono text-2xl font-bold">
                  {get80PercentValue().toFixed(2)} Ω
                </div>
                <div className="text-green-200/80 text-xs mt-1">
                  (80% rule for ambient testing)
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded p-3">
            <h4 className="text-amber-300 font-medium text-sm mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Why Use 80% Values?
            </h4>
            <div className="text-amber-200/90 text-xs space-y-1">
              <p>• Tabulated values assume conductors at 70°C (normal operating temperature)</p>
              <p>• Testing is typically done at 20°C (ambient temperature)</p>
              <p>• Conductor resistance increases with temperature (~0.4% per °C for copper)</p>
              <p>• 80% provides safety margin for temperature coefficient</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/30 bg-green-500/5">
        <CardContent className="pt-4">
          <div className="space-y-3">
            <h4 className="text-green-300 font-semibold">Compliance Assessment</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-green-300">
                  Measured Zs ≤ {get80PercentValue().toFixed(2)} Ω = <strong>COMPLIANT</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-400" />
                <span className="text-red-300">
                  Measured Zs {">"} {get80PercentValue().toFixed(2)} Ω = <strong>NON-COMPLIANT</strong>
                </span>
              </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
              <h5 className="text-green-300 font-medium text-sm mb-1">Important Note:</h5>
              <p className="text-green-200/90 text-xs">
                All compliance checks should be made against the 80% value ({get80PercentValue().toFixed(2)} Ω) 
                when testing at ambient temperature, not the tabulated value.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardContent className="pt-4">
          <div className="space-y-3">
            <h4 className="text-blue-300 font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Testing Guidelines
            </h4>
            <ul className="space-y-1 text-blue-200 text-sm">
              <li>• Test at the furthest point of each circuit</li>
              <li>• Ensure RCDs are bridged during testing</li>
              <li>• Record ambient temperature if significantly different from 20°C</li>
              <li>• Use high current (15-25A) for accurate low impedance readings</li>
              <li>• Include all circuit components in the measurement path</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZsCalculatorResult;
