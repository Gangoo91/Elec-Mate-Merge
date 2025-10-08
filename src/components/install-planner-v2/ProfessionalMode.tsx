import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RotateCcw, Calculator } from "lucide-react";
import { InstallPlanDataV2 } from "./types";
import { calculateSimplifiedCableSize } from "@/lib/calculators/engines/simplifiedCableSizingEngine";
import { calculateVoltageDrop } from "@/lib/calculators/engines/voltageDropEngine";
import { calculateEarthFaultLoop } from "@/lib/calculators/engines/earthFaultLoopEngine";
import { getTemperatureFactor, getGroupingFactor } from "@/lib/calculators/bs7671-data/temperatureFactors";

interface ProfessionalModeProps {
  planData: InstallPlanDataV2;
  updatePlanData: (data: InstallPlanDataV2) => void;
  onReset: () => void;
}

export const ProfessionalMode = ({ planData, updatePlanData, onReset }: ProfessionalModeProps) => {
  const [designCurrent, setDesignCurrent] = useState<number>(32);
  const [cableLength, setCableLength] = useState<number>(25);
  const [ambientTemp, setAmbientTemp] = useState<number>(30);
  const [groupingCircuits, setGroupingCircuits] = useState<number>(1);
  const [installationType, setInstallationType] = useState<string>("clipped-direct");
  const [cableType, setCableType] = useState<"pvc-twin-earth" | "swa">("pvc-twin-earth");
  const [voltage, setVoltage] = useState<number>(230);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    const result = calculateSimplifiedCableSize({
      current: designCurrent,
      installationType,
      ambientTemp,
      groupingCircuits,
      length: cableLength,
      voltage,
      cableType,
      voltageDropLimit: 5
    });

    if (result) {
      const voltageDropCalc = calculateVoltageDrop({
        cableType,
        cableSize: result.recommendedSize,
        length: cableLength,
        current: designCurrent,
        voltage,
        powerFactor: 0.95,
        phaseConfig: "single",
        temperature: ambientTemp
      });

      const earthFaultCalc = calculateEarthFaultLoop({
        externalLoopImpedance: 0.35,
        cableResistance: 0,
        cableLength,
        cableSize: result.recommendedSize,
        cableType: 'pvc',
        conductorMaterial: 'copper',
        protectiveDevice: {
          type: 'mcb-b',
          rating: Math.ceil(designCurrent * 1.25)
        }
      });

      setResults({
        cableSizing: result,
        voltageDrop: voltageDropCalc,
        earthFault: earthFaultCalc,
        compliance: {
          overloadProtection: result.compliant,
          voltageDrop: voltageDropCalc.compliance.isCompliant,
          earthFault: earthFaultCalc.compliance === 'pass'
        }
      });

      updatePlanData({
        ...planData,
        totalLoad: designCurrent * voltage,
        cableLength,
        environmentalProfile: {
          ...planData.environmentalProfile,
          finalApplied: {
            ambientTemp,
            grouping: groupingCircuits,
            conditions: "Indoor dry locations",
            earthing: "TN-S",
            ze: 0.35
          }
        }
      });

      setShowResults(true);
    }
  };

  if (showResults && results) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Professional Calculation Results</h2>
          <Button onClick={() => setShowResults(false)} variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" /> Back to Inputs
          </Button>
        </div>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Cable Sizing Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Recommended Cable Size</p>
                  <p className="text-2xl font-bold text-foreground">{results.cableSizing.recommendedSize}mm²</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Derated Capacity (Iz)</p>
                  <p className="text-2xl font-bold text-foreground">{results.cableSizing.deratedCapacity.toFixed(1)}A</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Safety Margin</p>
                  <p className="text-2xl font-bold text-foreground">{results.cableSizing.safetyMargin.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Correction Factors</p>
                  <p className="text-sm text-foreground">Ca={results.cableSizing.factors.temperature}, Cg={results.cableSizing.factors.grouping}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Voltage Drop Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Voltage Drop</p>
                  <p className="text-2xl font-bold text-foreground">{results.voltageDrop.voltageDrop.toFixed(2)}V ({results.voltageDrop.voltageDropPercent.toFixed(2)}%)</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Compliance</p>
                  <p className={`text-2xl font-bold ${results.voltageDrop.compliance.isCompliant ? 'text-green-500' : 'text-red-500'}`}>
                    {results.voltageDrop.compliance.isCompliant ? 'PASS' : 'FAIL'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Earth Fault Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Calculated Zs</p>
                  <p className="text-2xl font-bold text-foreground">{results.earthFault.calculatedZs}Ω</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Max Permitted Zs</p>
                  <p className="text-2xl font-bold text-foreground">{results.earthFault.maxPermittedZs}Ω</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Compliance</p>
                  <p className={`text-2xl font-bold ${results.earthFault.compliance === 'pass' ? 'text-green-500' : 'text-red-500'}`}>
                    {results.earthFault.compliance.toUpperCase()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Professional BS 7671 Calculation Mode
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="circuit" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="circuit">Circuit Data</TabsTrigger>
              <TabsTrigger value="environment">Environment</TabsTrigger>
              <TabsTrigger value="cable">Cable Selection</TabsTrigger>
            </TabsList>

            <TabsContent value="circuit" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current">Design Current (Ib) - Amps</Label>
                  <Input
                    id="current"
                    type="number"
                    value={designCurrent}
                    onChange={(e) => setDesignCurrent(parseFloat(e.target.value))}
                    min="1"
                    max="1000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="length">Cable Length - Metres</Label>
                  <Input
                    id="length"
                    type="number"
                    value={cableLength}
                    onChange={(e) => setCableLength(parseFloat(e.target.value))}
                    min="1"
                    max="200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="voltage">Supply Voltage</Label>
                  <Select value={voltage.toString()} onValueChange={(v) => setVoltage(parseInt(v))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="230">230V Single Phase</SelectItem>
                      <SelectItem value="400">400V Three Phase</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="environment" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ambient">Ambient Temperature (°C)</Label>
                  <Input
                    id="ambient"
                    type="number"
                    value={ambientTemp}
                    onChange={(e) => setAmbientTemp(parseFloat(e.target.value))}
                    min="10"
                    max="50"
                  />
                  <p className="text-xs text-muted-foreground">
                    Ca = {getTemperatureFactor(ambientTemp, "70C")}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grouping">Grouped Circuits</Label>
                  <Input
                    id="grouping"
                    type="number"
                    value={groupingCircuits}
                    onChange={(e) => setGroupingCircuits(parseInt(e.target.value))}
                    min="1"
                    max="20"
                  />
                  <p className="text-xs text-muted-foreground">
                    Cg = {getGroupingFactor(groupingCircuits)}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cable" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="installation">Installation Method</Label>
                  <Select value={installationType} onValueChange={setInstallationType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clipped-direct">Method C - Clipped Direct</SelectItem>
                      <SelectItem value="in-conduit">Method A - Enclosed in Conduit</SelectItem>
                      <SelectItem value="in-trunking">Method B - Enclosed in Trunking</SelectItem>
                      <SelectItem value="underground">Method D - Underground</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cableType">Cable Type</Label>
                  <Select value={cableType} onValueChange={(v: any) => setCableType(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pvc-twin-earth">PVC Twin & Earth (70°C)</SelectItem>
                      <SelectItem value="swa">SWA Armoured (90°C)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Separator />

          <div className="flex gap-3">
            <Button onClick={handleCalculate} className="gap-2 flex-1">
              <Calculator className="h-4 w-4" /> Calculate
            </Button>
            <Button onClick={onReset} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
