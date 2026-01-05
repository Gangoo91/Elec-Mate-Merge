import { Copy, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { copyToClipboard } from "@/lib/calc-utils";
import { useToast } from "@/hooks/use-toast";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import InfoBox from "@/components/common/InfoBox";
import { Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

// Resistance values at 20°C (mΩ/m) - needed for "How It Worked Out"
const copperResistance20C: { [key: string]: number } = {
  "1.0": 18.1, "1.5": 12.1, "2.5": 7.41, "4.0": 4.61, "6.0": 3.08,
  "10.0": 1.83, "16.0": 1.15, "25.0": 0.727, "35.0": 0.524, "50.0": 0.387,
  "70.0": 0.268, "95.0": 0.193, "120.0": 0.153, "150.0": 0.124, "185.0": 0.0991,
  "240.0": 0.0754, "300.0": 0.0601
};

const aluminiumResistance20C: { [key: string]: number } = {
  "16.0": 1.91, "25.0": 1.20, "35.0": 0.868, "50.0": 0.641, "70.0": 0.443,
  "95.0": 0.320, "120.0": 0.253, "150.0": 0.206, "185.0": 0.164, "240.0": 0.125,
  "300.0": 0.100
};

interface R1R2ResultProps {
  result: {
    r1: number;
    r2: number;
    r1r2: number;
    continuityLimit: number;
    testAcceptable: boolean;
    cableLength: number;
    lineConductorCSA: string;
    cpcConductorCSA: string;
    conductorMaterial: string;
    temperature: number;
  } | null;
  measuredValue?: string;
}

const R1R2Result = ({ result, measuredValue }: R1R2ResultProps) => {
  const { toast } = useToast();

  const copyResults = async () => {
    if (!result) return;
    
    let text = `R1+R2 Calculation Results\n\n`;
    text += `Cable Details:\n`;
    text += `• Length: ${result.cableLength}m\n`;
    text += `• Line conductor: ${result.lineConductorCSA}mm² ${result.conductorMaterial}\n`;
    text += `• CPC conductor: ${result.cpcConductorCSA}mm² ${result.conductorMaterial}\n`;
    text += `• Operating temperature: ${result.temperature}°C\n\n`;
    text += `Calculated Values:\n`;
    text += `• R1 (Line): ${result.r1.toFixed(4)}Ω\n`;
    text += `• R2 (CPC): ${result.r2.toFixed(4)}Ω\n`;
    text += `• R1+R2 Total: ${result.r1r2.toFixed(4)}Ω\n`;
    text += `• Test Limit (×1.67): ${result.continuityLimit.toFixed(4)}Ω\n`;
    
    if (measuredValue) {
      const measured = parseFloat(measuredValue);
      const status = measured <= result.continuityLimit ? "PASS" : "FAIL";
      text += `\nTest Results:\n`;
      text += `• Measured value: ${measured.toFixed(4)}Ω\n`;
      text += `• Status: ${status}\n`;
      text += `• Margin: ${(result.continuityLimit - measured).toFixed(4)}Ω\n`;
    }
    
    const success = await copyToClipboard(text);
    toast({
      title: success ? "Results copied!" : "Copy failed",
      description: success ? "R1+R2 calculation results copied to clipboard" : "Please try again",
      variant: success ? "success" : "destructive"
    });
  };

  const getTestStatus = () => {
    if (!measuredValue || !result) return null;
    
    const measured = parseFloat(measuredValue);
    if (isNaN(measured)) return null;
    
    const margin = result.continuityLimit - measured;
    const marginPercent = (margin / result.continuityLimit) * 100;
    
    if (measured <= result.continuityLimit) {
      let status = "Pass";
      let color = "bg-green-500/20 text-green-300";
      let description = "Test acceptable";
      
      if (marginPercent < 10) {
        status = "Pass (Close)";
        color = "bg-yellow-500/20 text-yellow-300";
        description = "Pass but close to limit - check connections";
      }
      
      return {
        status,
        color,
        description,
        margin: margin.toFixed(4),
        marginPercent: marginPercent.toFixed(1)
      };
    } else {
      return {
        status: "Fail",
        color: "bg-red-500/20 text-red-300",
        description: "Exceeds test limit - check circuit",
        margin: (-margin).toFixed(4),
        marginPercent: marginPercent.toFixed(1)
      };
    }
  };

  const getConductorRatio = () => {
    if (!result) return null;
    
    const lineCSA = parseFloat(result.lineConductorCSA);
    const cpcCSA = parseFloat(result.cpcConductorCSA);
    const ratio = lineCSA / cpcCSA;
    
    let status = "Standard";
    let color = "bg-blue-500/20 text-blue-300";
    let note = "Conductor sizing as per BS7671 Table 54.7";
    
    if (ratio > 16) {
      status = "CPC Undersized";
      color = "bg-red-500/20 text-red-300";
      note = "CPC may be undersized - check Table 54.7";
    } else if (ratio < 1) {
      status = "CPC Oversized";
      color = "bg-green-500/20 text-green-300";
      note = "CPC larger than line conductor - excellent earth path";
    }
    
    return { ratio: ratio.toFixed(1), status, color, note };
  };

  const getTemperatureNote = () => {
    if (!result) return null;
    
    const temp = result.temperature;
    if (temp === 70) {
      return "Standard 70°C operating temperature for PVC cables";
    } else if (temp === 90) {
      return "90°C operating temperature for XLPE or LSF cables";
    } else if (temp < 70) {
      return "Lower temperature - more conservative calculation";
    } else {
      return "High temperature operation - ensure cable rating is adequate";
    }
  };

  if (!result) return null;

  const testStatus = getTestStatus();
  const conductorRatio = getConductorRatio();

  return (
    <div className="space-y-6">
      {/* Circuit Summary */}
      <Card className="bg-elec-card border-elec-yellow/20">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-elec-light">Circuit Summary</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={copyResults}
              className="text-xs"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy Results
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-elec-light">Cable length:</span>
              <span className="font-mono">{result.cableLength}m</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-elec-light">Line conductor:</span>
              <span className="font-mono">{result.lineConductorCSA}mm² {result.conductorMaterial}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-elec-light">CPC conductor:</span>
              <span className="font-mono">{result.cpcConductorCSA}mm² {result.conductorMaterial}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-elec-light">Operating temp:</span>
              <span className="font-mono">{result.temperature}°C</span>
            </div>
            {conductorRatio && (
              <div className="flex justify-between text-sm">
                <span className="text-elec-light">CSA ratio:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono">{conductorRatio.ratio}:1</span>
                  <Badge className={`text-xs ${conductorRatio.color}`}>
                    {conductorRatio.status}
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Calculated Values */}
      <Card className="bg-elec-card border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-elec-light">Calculated R1+R2 Values</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                <span className="text-blue-200">R1 (Line resistance):</span>
                <span className="font-mono text-blue-300 font-semibold">{result.r1.toFixed(4)} Ω</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-500/10 border border-purple-500/30 rounded">
                <span className="text-purple-200">R2 (CPC resistance):</span>
                <span className="font-mono text-purple-300 font-semibold">{result.r2.toFixed(4)} Ω</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-500/10 border border-green-500/30 rounded">
                <span className="text-green-200 font-medium">R1+R2 Total:</span>
                <span className="font-mono text-green-300 font-bold text-lg">{result.r1r2.toFixed(4)} Ω</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                <span className="text-yellow-200">Test Limit (×1.67):</span>
                <span className="font-mono text-yellow-300 font-semibold">{result.continuityLimit.toFixed(4)} Ω</span>
              </div>
            </div>
          </div>

          {/* Test Comparison */}
          {measuredValue && testStatus && (
            <div className={`p-4 border rounded ${testStatus.color.includes('red') ? 'border-red-500/30' : testStatus.color.includes('yellow') ? 'border-yellow-500/30' : 'border-green-500/30'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Test Result:</span>
                <Badge className={`${testStatus.color}`}>
                  {testStatus.status}
                </Badge>
              </div>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span>Measured value:</span>
                  <span className="font-mono">{parseFloat(measuredValue).toFixed(4)} Ω</span>
                </div>
                <div className="flex justify-between">
                  <span>Margin:</span>
                  <span className="font-mono">{testStatus.margin} Ω ({testStatus.marginPercent}%)</span>
                </div>
                <p className="text-xs mt-2">{testStatus.description}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* How It Worked Out - Step-by-step calculation breakdown */}
      <Card className="border-purple-500/30 bg-purple-500/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-purple-300 text-base flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            How It Worked Out
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          {(() => {
            const resistanceData = result.conductorMaterial === "copper" ? copperResistance20C : aluminiumResistance20C;
            const r20Line = resistanceData[result.lineConductorCSA];
            const r20CPC = resistanceData[result.cpcConductorCSA];
            const tempConstant = result.conductorMaterial === "copper" ? 234.5 : 228;
            const tempCorrection = (tempConstant + result.temperature) / (tempConstant + 20);

            return (
              <>
                {/* Step 1: Look up base resistance values */}
                <div className="space-y-2">
                  <p className="text-purple-200 font-medium">Step 1: Look up base resistance values from BS EN 60228</p>
                  <div className="font-mono text-xs bg-purple-500/10 rounded-lg p-3 border border-purple-500/20 space-y-1">
                    <p className="text-purple-200">
                      <span className="text-purple-400">Line conductor ({result.lineConductorCSA}mm² {result.conductorMaterial}):</span> r₁₂₀ = {r20Line} mΩ/m
                    </p>
                    <p className="text-purple-200">
                      <span className="text-purple-400">CPC ({result.cpcConductorCSA}mm² {result.conductorMaterial}):</span> r₂₂₀ = {r20CPC} mΩ/m
                    </p>
                  </div>
                </div>

                {/* Step 2: Calculate temperature correction factor */}
                <div className="space-y-2">
                  <p className="text-purple-200 font-medium">Step 2: Calculate temperature correction factor</p>
                  <div className="font-mono text-xs bg-purple-500/10 rounded-lg p-3 border border-purple-500/20 space-y-1">
                    <p className="text-purple-200">
                      <span className="text-purple-400">Formula ({result.conductorMaterial}):</span> Ct = ({tempConstant} + T) ÷ ({tempConstant} + 20)
                    </p>
                    <p className="text-purple-200">
                      <span className="text-purple-400">Calculation:</span> Ct = ({tempConstant} + {result.temperature}) ÷ ({tempConstant} + 20)
                    </p>
                    <p className="text-purple-200">
                      <span className="text-purple-400">Result:</span> Ct = {(tempConstant + result.temperature).toFixed(1)} ÷ {(tempConstant + 20).toFixed(1)} = <span className="text-green-300">{tempCorrection.toFixed(4)}</span>
                    </p>
                  </div>
                </div>

                {/* Step 3: Calculate R1 */}
                <div className="space-y-2">
                  <p className="text-purple-200 font-medium">Step 3: Calculate R1 (line conductor resistance)</p>
                  <div className="font-mono text-xs bg-purple-500/10 rounded-lg p-3 border border-purple-500/20 space-y-1">
                    <p className="text-purple-200">
                      <span className="text-purple-400">Formula:</span> R1 = (r₁₂₀ × L × Ct) ÷ 1000
                    </p>
                    <p className="text-purple-200">
                      <span className="text-purple-400">Calculation:</span> R1 = ({r20Line} × {result.cableLength} × {tempCorrection.toFixed(4)}) ÷ 1000
                    </p>
                    <p className="text-purple-200">
                      <span className="text-purple-400">Result:</span> R1 = {(r20Line * result.cableLength * tempCorrection).toFixed(4)} ÷ 1000 = <span className="text-blue-300">{result.r1.toFixed(4)} Ω</span>
                    </p>
                  </div>
                </div>

                {/* Step 4: Calculate R2 */}
                <div className="space-y-2">
                  <p className="text-purple-200 font-medium">Step 4: Calculate R2 (CPC resistance)</p>
                  <div className="font-mono text-xs bg-purple-500/10 rounded-lg p-3 border border-purple-500/20 space-y-1">
                    <p className="text-purple-200">
                      <span className="text-purple-400">Formula:</span> R2 = (r₂₂₀ × L × Ct) ÷ 1000
                    </p>
                    <p className="text-purple-200">
                      <span className="text-purple-400">Calculation:</span> R2 = ({r20CPC} × {result.cableLength} × {tempCorrection.toFixed(4)}) ÷ 1000
                    </p>
                    <p className="text-purple-200">
                      <span className="text-purple-400">Result:</span> R2 = {(r20CPC * result.cableLength * tempCorrection).toFixed(4)} ÷ 1000 = <span className="text-purple-300">{result.r2.toFixed(4)} Ω</span>
                    </p>
                  </div>
                </div>

                {/* Step 5: Calculate R1+R2 */}
                <div className="space-y-2">
                  <p className="text-purple-200 font-medium">Step 5: Calculate R1+R2 total</p>
                  <div className="font-mono text-xs bg-green-500/10 rounded-lg p-3 border border-green-500/20 space-y-1">
                    <p className="text-green-200">
                      <span className="text-green-400">Formula:</span> R1+R2 = R1 + R2
                    </p>
                    <p className="text-green-200">
                      <span className="text-green-400">Calculation:</span> R1+R2 = {result.r1.toFixed(4)} + {result.r2.toFixed(4)}
                    </p>
                    <p className="text-green-200">
                      <span className="text-green-400">Result:</span> R1+R2 = <span className="text-green-300 font-bold">{result.r1r2.toFixed(4)} Ω</span>
                    </p>
                  </div>
                </div>

                {/* Step 6: Calculate test limit */}
                <div className="space-y-2">
                  <p className="text-purple-200 font-medium">Step 6: Calculate test limit (for ambient temperature testing)</p>
                  <div className="font-mono text-xs bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20 space-y-1">
                    <p className="text-yellow-200">
                      <span className="text-yellow-400">Why 1.67?</span> When testing at ~20°C ambient, multiply by 1.67 to get the maximum acceptable value at operating temperature
                    </p>
                    <p className="text-yellow-200">
                      <span className="text-yellow-400">Formula:</span> Test limit = R1+R2 × 1.67
                    </p>
                    <p className="text-yellow-200">
                      <span className="text-yellow-400">Calculation:</span> Test limit = {result.r1r2.toFixed(4)} × 1.67
                    </p>
                    <p className="text-yellow-200">
                      <span className="text-yellow-400">Result:</span> Test limit = <span className="text-yellow-300 font-bold">{result.continuityLimit.toFixed(4)} Ω</span>
                    </p>
                  </div>
                </div>

                {/* Test comparison if provided */}
                {measuredValue && testStatus && (
                  <div className="space-y-2">
                    <p className="text-purple-200 font-medium">Step 7: Compare with measured value</p>
                    <div className={`font-mono text-xs rounded-lg p-3 border space-y-1 ${testStatus.status.includes('Fail') ? 'bg-red-500/10 border-red-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
                      <p className={testStatus.status.includes('Fail') ? 'text-red-200' : 'text-green-200'}>
                        <span className={testStatus.status.includes('Fail') ? 'text-red-400' : 'text-green-400'}>Measured:</span> {parseFloat(measuredValue).toFixed(4)} Ω
                      </p>
                      <p className={testStatus.status.includes('Fail') ? 'text-red-200' : 'text-green-200'}>
                        <span className={testStatus.status.includes('Fail') ? 'text-red-400' : 'text-green-400'}>Limit:</span> {result.continuityLimit.toFixed(4)} Ω
                      </p>
                      <p className={testStatus.status.includes('Fail') ? 'text-red-200' : 'text-green-200'}>
                        <span className={testStatus.status.includes('Fail') ? 'text-red-400' : 'text-green-400'}>Check:</span> {parseFloat(measuredValue).toFixed(4)} {parseFloat(measuredValue) <= result.continuityLimit ? '≤' : '>'} {result.continuityLimit.toFixed(4)}
                      </p>
                      <p className={`font-bold ${testStatus.status.includes('Fail') ? 'text-red-300' : 'text-green-300'}`}>
                        Result: {testStatus.status.toUpperCase()}
                      </p>
                    </div>
                  </div>
                )}
              </>
            );
          })()}

          {/* Key for symbols */}
          <div className="border-t border-purple-500/20 pt-3 mt-3">
            <p className="text-xs text-purple-300/70">
              <strong>Key:</strong> r₁₂₀ = Line conductor resistance at 20°C (mΩ/m) | r₂₂₀ = CPC resistance at 20°C (mΩ/m) | L = Cable length (m) | Ct = Temperature correction factor | T = Operating temperature (°C)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <div className="grid gap-4 sm:grid-cols-2">
        <InfoBox
          title="Temperature Effects"
          icon={<Info className="h-5 w-5 text-blue-400" />}
          as="div"
        >
          <div className="space-y-2 text-elec-light text-sm">
            <p>{getTemperatureNote()}</p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
              <p className="text-xs text-blue-200">
                <strong>Note:</strong> Test is performed at ambient temperature (~20°C). 
                The ×1.67 factor accounts for resistance increase at operating temperature.
              </p>
            </div>
          </div>
        </InfoBox>

        {conductorRatio && (
          <InfoBox
            title="Conductor Sizing"
            icon={<AlertTriangle className="h-5 w-5 text-yellow-400" />}
            as="div"
          >
            <div className="space-y-2 text-elec-light text-sm">
              <p>{conductorRatio.note}</p>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-2">
                <p className="text-xs text-yellow-200">
                  <strong>BS7671 Requirement:</strong> CPC minimum size per Table 54.7. 
                  Line/CPC ratio should not exceed 16:1 for compliance.
                </p>
              </div>
            </div>
          </InfoBox>
        )}
      </div>

      {/* Why This Matters */}
      <WhyThisMatters
        title="Why this matters"
        points={[
          "R1+R2 testing verifies the continuity of the protective conductor throughout the circuit",
          "Essential for ensuring adequate earth fault loop impedance (Zs = Ze + R1+R2)",
          "Required for initial verification and periodic inspection per BS7671 Part 6",
          "Helps identify loose connections, damaged conductors, or incorrect terminations"
        ]}
      />

      {/* Key Assumptions */}
      <InfoBox
        title="Calculation Assumptions"
        icon={<Info className="h-5 w-5 text-blue-400" />}
        as="section"
        points={[
          "Resistance values based on BS EN 60228 standard conductor resistivity",
          "Temperature coefficient: Copper (0.004/°C), Aluminium (0.004/°C)",
          "Test factor of 1.67 accounts for temperature rise under load",
          "Values assume good connections throughout the circuit"
        ]}
      />
    </div>
  );
};

export default R1R2Result;