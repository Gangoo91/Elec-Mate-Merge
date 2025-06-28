
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertTriangle, Calculator, Thermometer } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EnhancedZsCalculatorResultProps {
  result: number | null;
  protectionType: string;
  mcbRating: string;
  rcboRating: string;
  fusRating: string;
  fuseType: string;
  mcbCurve: string;
  rcboCurve: string;
}

const EnhancedZsCalculatorResult = ({
  result,
  protectionType,
  mcbRating,
  rcboRating,
  fusRating,
  fuseType,
  mcbCurve,
  rcboCurve
}: EnhancedZsCalculatorResultProps) => {
  const [testTemperature, setTestTemperature] = useState('20');
  const [operatingTemperature, setOperatingTemperature] = useState('70');

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

  // Temperature correction calculations
  const testTemp = parseFloat(testTemperature);
  const opTemp = parseFloat(operatingTemperature);
  const tempCorrectionFactor = (234.5 + opTemp) / (234.5 + testTemp);
  const get80PercentValue = () => result * 0.8;
  const getTemperatureCorrectedLimit = () => get80PercentValue() / tempCorrectionFactor;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Enhanced Zs Analysis</h3>
      
      {/* Temperature Input Controls */}
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-300 text-sm flex items-center gap-2">
            <Thermometer className="h-4 w-4" />
            Temperature Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="test-temp" className="text-xs">Test Temperature (°C)</Label>
              <Input
                id="test-temp"
                type="number"
                value={testTemperature}
                onChange={(e) => setTestTemperature(e.target.value)}
                className="bg-blue-500/10 border-blue-500/20 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="op-temp" className="text-xs">Operating Temperature (°C)</Label>
              <Input
                id="op-temp"
                type="number"
                value={operatingTemperature}
                onChange={(e) => setOperatingTemperature(e.target.value)}
                className="bg-blue-500/10 border-blue-500/20 text-sm"
              />
            </div>
          </div>
          <p className="text-xs text-blue-200/80">
            Correction factor: {tempCorrectionFactor.toFixed(3)}
          </p>
        </CardContent>
      </Card>
      
      {/* Device and Limits */}
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
                <span className="text-yellow-200">80% Test Value (20°C):</span>
                <span className="text-yellow-300 font-mono text-lg font-semibold">
                  {get80PercentValue().toFixed(2)} Ω
                </span>
              </div>
            </div>

            <div className="border-t border-orange-500/20 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-orange-200">Test Limit at {testTemp}°C:</span>
                <span className="text-orange-300 font-mono text-lg font-semibold">
                  {getTemperatureCorrectedLimit().toFixed(3)} Ω
                </span>
              </div>
              <p className="text-orange-200/80 text-sm mt-1">
                Temperature-corrected test limit for actual conditions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safety Analysis */}
      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardContent className="pt-4">
          <div className="space-y-3">
            <h4 className="text-amber-300 font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Safety Analysis
            </h4>
            
            {/* Temperature Effect Warning */}
            {Math.abs(testTemp - 20) > 5 && (
              <div className="bg-amber-500/20 border border-amber-500/30 rounded p-3">
                <p className="text-amber-200 text-sm font-medium">
                  ⚠️ Non-standard test temperature detected
                </p>
                <p className="text-amber-200/80 text-xs mt-1">
                  Test temperature of {testTemp}°C differs significantly from standard 20°C. 
                  Use temperature-corrected limit: {getTemperatureCorrectedLimit().toFixed(3)} Ω
                </p>
              </div>
            )}

            {/* High Temperature Warning */}
            {opTemp > 70 && (
              <div className="bg-red-500/20 border border-red-500/30 rounded p-3">
                <p className="text-red-200 text-sm font-medium">
                  🔥 High Operating Temperature Alert
                </p>
                <p className="text-red-200/80 text-xs mt-1">
                  Operating temperature of {opTemp}°C exceeds standard 70°C. 
                  Consider cable derating and installation method review.
                </p>
              </div>
            )}

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-green-300">Measured Zs ≤ {getTemperatureCorrectedLimit().toFixed(3)} Ω = Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-400" />
                <span className="text-red-300">Measured Zs {">"} {getTemperatureCorrectedLimit().toFixed(3)} Ω = Non-compliant</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Testing Guidelines */}
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardContent className="pt-4">
          <div className="space-y-3">
            <h4 className="text-blue-300 font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Professional Testing Guidelines
            </h4>
            <ul className="space-y-1 text-blue-200 text-sm">
              <li>• Record actual test temperature for accurate assessment</li>
              <li>• Use temperature-corrected limits: {getTemperatureCorrectedLimit().toFixed(3)} Ω at {testTemp}°C</li>
              <li>• Test at furthest point of circuit under normal conditions</li>
              <li>• Consider parallel earth paths and bonding connections</li>
              <li>• Verify RCD isolation during testing to avoid nuisance tripping</li>
              <li>• Check for loose connections if results approach limits</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedZsCalculatorResult;
