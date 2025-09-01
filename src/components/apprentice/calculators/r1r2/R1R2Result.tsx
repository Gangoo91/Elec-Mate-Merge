import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { copyToClipboard } from "@/lib/calc-utils";
import { useToast } from "@/hooks/use-toast";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import InfoBox from "@/components/common/InfoBox";
import { Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

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