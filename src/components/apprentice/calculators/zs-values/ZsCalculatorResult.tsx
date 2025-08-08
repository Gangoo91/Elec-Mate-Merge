
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertTriangle, Calculator } from "lucide-react";

interface ZsCalculatorResultProps {
  result: number | null;
  calculatedZs: number | null;
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
  calculatedZs,
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
            <p>Select protection device to view maximum Zs value</p>
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
      <h3 className="text-lg font-semibold">Maximum Zs Value</h3>
      
      <Card className="border-green-500/30 bg-green-500/5">
        <CardHeader>
          <CardTitle className="text-green-300 text-lg">
            {getDeviceDescription()}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-green-200">Maximum Zs (BS 7671):</span>
              <span className="text-green-300 font-mono text-xl font-bold">
                {result.toFixed(2)} Ω
              </span>
            </div>
            
            <div className="border-t border-green-500/20 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-yellow-200">80% Test Value:</span>
                <span className="text-yellow-300 font-mono text-lg font-semibold">
                  {get80PercentValue().toFixed(2)} Ω
                </span>
              </div>
              <p className="text-yellow-200/80 text-sm mt-2">
                Use this value during testing to account for temperature effects
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {calculatedZs !== null && (
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="pt-4">
            <div className="space-y-3">
              <h4 className="text-amber-300 font-semibold">Calculated Circuit Zs</h4>
              <div className="flex justify-between items-center">
                <span className="text-amber-200">Ze + (R1 + R2):</span>
                <span className="text-amber-300 font-mono text-lg">{calculatedZs.toFixed(2)} Ω</span>
              </div>
              <div className={`mt-2 text-sm ${calculatedZs <= get80PercentValue() ? 'text-green-300' : 'text-red-300'}`}>
                {calculatedZs <= get80PercentValue() ? '✓ Compliant (≤ 80% test value)' : '✗ Non-compliant (> 80% test value)'}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardContent className="pt-4">
          <div className="space-y-3">
            <h4 className="text-blue-300 font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Testing Guidelines
            </h4>
            <ul className="space-y-1 text-blue-200 text-sm">
              <li>• Test at ambient temperature (typically 20°C)</li>
              <li>• Measured Zs should not exceed {get80PercentValue().toFixed(2)} Ω</li>
              <li>• Include all circuit components in measurement</li>
              <li>• Test at the furthest point of the circuit</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardContent className="pt-4">
          <div className="space-y-3">
            <h4 className="text-amber-300 font-semibold">Compliance Check</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-green-300">Measured Zs ≤ {get80PercentValue().toFixed(2)} Ω = Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-400" />
                <span className="text-red-300">Measured Zs {">"} {get80PercentValue().toFixed(2)} Ω = Non-compliant</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZsCalculatorResult;
