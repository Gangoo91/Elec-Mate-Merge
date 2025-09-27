import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertTriangle, Calculator, Copy, Lightbulb, Shield, Info } from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/lib/calc-utils";
import WhyThisMatters from "@/components/common/WhyThisMatters";

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

  const getComplianceStatus = () => {
    if (!calculatedZs || !result) return null;
    
    const testValue = get80PercentValue();
    const tabulated = result;
    
    return {
      passesTest: calculatedZs <= testValue,
      passesTabulated: calculatedZs <= tabulated,
      headroom80: ((testValue - calculatedZs) / testValue * 100),
      headroom100: ((tabulated - calculatedZs) / tabulated * 100)
    };
  };

  const handleCopyResults = async () => {
    const deviceDesc = getDeviceDescription();
    const testValue = get80PercentValue().toFixed(2);
    
    let copyText = `Zs Calculator Results\n`;
    copyText += `Device: ${deviceDesc}\n`;
    copyText += `Maximum Zs (BS 7671): ${result.toFixed(2)} Ω\n`;
    copyText += `80% Test Value: ${testValue} Ω\n`;
    
    if (calculatedZs !== null) {
      const compliance = getComplianceStatus();
      copyText += `Calculated Zs: ${calculatedZs.toFixed(2)} Ω\n`;
      copyText += `Status: ${compliance?.passesTest ? 'Compliant' : 'Non-compliant'}\n`;
    }
    
    const success = await copyToClipboard(copyText);
    if (success) {
      toast.success("Results copied to clipboard");
    } else {
      toast.error("Failed to copy results");
    }
  };

  const compliance = getComplianceStatus();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Results Summary</h3>
        <button
          onClick={handleCopyResults}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-elec-yellow/10 hover:bg-elec-yellow/20 border border-elec-yellow/30 rounded transition-colors"
        >
          <Copy className="h-4 w-4" />
          Copy Results
        </button>
      </div>

      {/* Device Selection Summary */}
      <Card className="border-elec-yellow/30 bg-elec-yellow/5">
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-4 w-4 text-elec-yellow" />
            <span className="font-medium text-elec-yellow">Selected Device</span>
          </div>
          <p className="text-elec-yellow/80">{getDeviceDescription()}</p>
        </CardContent>
      </Card>
      
      {/* Main Results */}
      <Card className="border-green-500/30 bg-green-500/5">
        <CardHeader>
          <CardTitle className="text-green-300 text-lg flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Maximum Zs Values
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-green-200 text-sm">100% Tabulated (BS 7671):</span>
                  <span className="text-green-300 font-mono text-lg font-bold">
                    {result.toFixed(2)} Ω
                  </span>
                </div>
                <p className="text-green-200/70 text-xs">At normal operating temperature</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-yellow-200 text-sm">80% Test Value:</span>
                  <span className="text-yellow-300 font-mono text-lg font-bold">
                    {get80PercentValue().toFixed(2)} Ω
                  </span>
                </div>
                <p className="text-yellow-200/70 text-xs">For testing at ambient temperature</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calculated Circuit Zs */}
      {calculatedZs !== null && (
        <Card className={`border-2 ${
          compliance?.passesTest 
            ? 'border-green-500/50 bg-green-500/10' 
            : 'border-red-500/50 bg-red-500/10'
        }`}>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-amber-300" />
                <h4 className="text-amber-300 font-semibold">Your Calculated Circuit Zs</h4>
              </div>
              
              <div className="bg-amber-500/10 border border-amber-500/20 rounded p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-amber-200">Ze + (R1 + R2):</span>
                  <span className="text-amber-300 font-mono text-xl font-bold">
                    {calculatedZs.toFixed(2)} Ω
                  </span>
                </div>
              </div>

              {/* Compliance Check */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`border rounded p-3 ${
                  compliance?.passesTest 
                    ? 'border-green-500/30 bg-green-500/10' 
                    : 'border-red-500/30 bg-red-500/10'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {compliance?.passesTest ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400" />
                    )}
                    <span className={`font-medium ${
                      compliance?.passesTest ? 'text-green-300' : 'text-red-300'
                    }`}>
                      80% Test Compliance
                    </span>
                  </div>
                  <p className={`text-sm ${
                    compliance?.passesTest ? 'text-green-200' : 'text-red-200'
                  }`}>
                    {compliance?.passesTest 
                      ? `✓ Passes (${compliance.headroom80.toFixed(1)}% headroom)` 
                      : `✗ Fails (${Math.abs(compliance?.headroom80 || 0).toFixed(1)}% over limit)`
                    }
                  </p>
                </div>

                <div className={`border rounded p-3 ${
                  compliance?.passesTabulated 
                    ? 'border-green-500/30 bg-green-500/10' 
                    : 'border-orange-500/30 bg-orange-500/10'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {compliance?.passesTabulated ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-orange-400" />
                    )}
                    <span className={`font-medium ${
                      compliance?.passesTabulated ? 'text-green-300' : 'text-orange-300'
                    }`}>
                      100% Tabulated Compliance
                    </span>
                  </div>
                  <p className={`text-sm ${
                    compliance?.passesTabulated ? 'text-green-200' : 'text-orange-200'
                  }`}>
                    {compliance?.passesTabulated 
                      ? `✓ Passes (${compliance.headroom100.toFixed(1)}% headroom)` 
                      : `⚠ Exceeds tabulated value`
                    }
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Why This Matters */}
      <WhyThisMatters
        title="Why Zs values matter"
        points={[
          "Ensures protective devices operate within required disconnection times (0.4s for final circuits ≤32A)",
          "Prevents dangerous touch voltages during earth faults that could cause electric shock",
          "Reduces fire risk by ensuring rapid fault clearance",
          "BS 7671 legal requirement for electrical safety compliance",
          "80% test value accounts for temperature rise during normal operation"
        ]}
      />

      {/* Assumptions */}
      <Card className="border-purple-500/30 bg-purple-500/5">
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-4 w-4 text-purple-400" />
            <h4 className="text-purple-300 font-semibold">Calculation Assumptions</h4>
          </div>
          <ul className="space-y-1 text-purple-200 text-sm">
            <li>• Values based on BS 7671:2018+A3:2024 regulations</li>
            <li>• Assumes TN system earthing arrangement</li>
            <li>• Nominal voltage 230V (Uo) single-phase to earth</li>
            <li>• Temperature correction factor applied for PVC cables at 70°C</li>
            <li>• Final circuits with 0.4s maximum disconnection time</li>
          </ul>
        </CardContent>
      </Card>

      {/* Testing Guidelines */}
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardContent className="pt-4">
          <div className="space-y-3">
            <h4 className="text-blue-300 font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Testing Guidelines
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="text-blue-200 font-medium text-sm">Before Testing:</h5>
                <ul className="space-y-1 text-blue-200/80 text-sm">
                  <li>• Isolate circuit and prove dead</li>
                  <li>• Remove or bridge RCDs</li>
                  <li>• Check test equipment calibration</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="text-blue-200 font-medium text-sm">During Testing:</h5>
                <ul className="space-y-1 text-blue-200/80 text-sm">
                  <li>• Test at furthest point of circuit</li>
                  <li>• Measured Zs ≤ {get80PercentValue().toFixed(2)} Ω</li>
                  <li>• Record ambient temperature</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZsCalculatorResult;