import { Button } from "@/components/ui/button";
import { Calculator, AlertCircle, CheckCircle2, Info, TrendingDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { cableSizes } from "@/components/apprentice/calculators/cable-sizing/cableSizeData"; 

const VoltageDropCalculator = () => {
  const [cableLength, setCableLength] = useState<string>("");
  const [cableSize, setCableSize] = useState<string>("");
  const [cableType, setCableType] = useState<string>("twin-and-earth");
  const [cableMaterial, setCableMaterial] = useState<string>("copper");
  const [insulationType, setInsulationType] = useState<string>("pvc");
  const [loadCurrent, setLoadCurrent] = useState<string>("");
  const [powerFactor, setPowerFactor] = useState<string>("1.0");
  const [supplyVoltage, setSupplyVoltage] = useState<string>("230");
  const [result, setResult] = useState<{
    voltageDrop: number;
    voltageDropPercentage: number;
    voltageAtLoad: number;
    maxPermissibleLength: number;
    compliant: boolean;
    warnings: string[];
  } | null>(null);

  const calculateVoltageDrop = () => {
    if (!cableLength || !cableSize || !loadCurrent) return;
    
    const length = parseFloat(cableLength);
    const current = parseFloat(loadCurrent);
    const pf = parseFloat(powerFactor);
    const voltage = parseFloat(supplyVoltage);
    
    if (isNaN(length) || isNaN(current) || isNaN(pf) || isNaN(voltage)) return;
    
    // Find the selected cable in our data
    const selectedCable = cableSizes.find(cable => cable.value === cableSize && cable.cableType === cableType);
    
    if (!selectedCable) return;
    
    // Enhanced voltage drop calculation including power factor
    let voltageDropFactor = selectedCable.voltageDropPerAmpereMeter;
    
    // Adjust for power factor (reactance component)
    if (pf < 1.0) {
      const reactanceComponent = voltageDropFactor * 0.1; // Approximate reactance
      voltageDropFactor = Math.sqrt(Math.pow(voltageDropFactor * pf, 2) + Math.pow(reactanceComponent * Math.sqrt(1 - pf * pf), 2));
    }
    
    // Material adjustment (copper vs aluminium)
    if (cableMaterial === "aluminium") {
      voltageDropFactor *= 1.64; // Aluminium has higher resistance
    }
    
    const voltageDrop = voltageDropFactor * length * current;
    const voltageDropPercentage = (voltageDrop / voltage) * 100;
    const voltageAtLoad = voltage - voltageDrop;
    
    // Calculate maximum permissible length for 3% and 5% limits
    const maxLength3Percent = (voltage * 0.03) / (voltageDropFactor * current);
    const maxLength5Percent = (voltage * 0.05) / (voltageDropFactor * current);
    const maxPermissibleLength = cableType.includes('lighting') ? maxLength3Percent : maxLength5Percent;
    
    // Compliance check
    const voltageDropLimit = cableType.includes('lighting') ? 3.0 : 5.0;
    const compliant = voltageDropPercentage <= voltageDropLimit;
    
    // Generate warnings
    const warnings: string[] = [];
    if (voltageDropPercentage > voltageDropLimit) {
      warnings.push(`Voltage drop exceeds ${voltageDropLimit}% limit for this circuit type`);
    }
    if (voltageDropPercentage > 2.5 && voltageDropPercentage <= voltageDropLimit) {
      warnings.push("Voltage drop approaching limit - consider larger cable size");
    }
    if (length > maxPermissibleLength) {
      warnings.push("Cable length exceeds maximum recommended for this size");
    }
    if (voltageAtLoad < 216.2) { // 230V -6%
      warnings.push("Terminal voltage may be too low for proper equipment operation");
    }
    
    setResult({
      voltageDrop: Math.round(voltageDrop * 100) / 100,
      voltageDropPercentage: Math.round(voltageDropPercentage * 100) / 100,
      voltageAtLoad: Math.round(voltageAtLoad * 100) / 100,
      maxPermissibleLength: Math.round(maxPermissibleLength * 10) / 10,
      compliant,
      warnings
    });
  };

  const resetCalculator = () => {
    setCableLength("");
    setCableSize("");
    setCableType("twin-and-earth");
    setCableMaterial("copper");
    setInsulationType("pvc");
    setLoadCurrent("");
    setPowerFactor("1.0");
    setSupplyVoltage("230");
    setResult(null);
  };

  // Get cable options for the selected type
  const getCableOptionsForType = () => {
    return cableSizes
      .filter(cable => cable.cableType === cableType)
      .map(cable => ({
        value: cable.value,
        label: cable.size
      }));
  };

  const cableOptions = getCableOptionsForType();

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-elec-yellow" />
          <div>
            <CardTitle>Voltage Drop Calculator</CardTitle>
            <CardDescription className="mt-1">
              Calculate voltage drop with BS 7671 compliance checks and practical guidance.
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-auto">
            BS 7671
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supply-voltage">Supply Voltage (V)</Label>
                <Select value={supplyVoltage} onValueChange={setSupplyVoltage}>
                  <SelectTrigger className="bg-card border border-muted/40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-muted/40 z-50">
                    <SelectItem value="230">230V (Single Phase)</SelectItem>
                    <SelectItem value="400">400V (Three Phase)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cable-length">Cable Length (m)</Label>
                <Input 
                  id="cable-length" 
                  type="number" 
                  placeholder="Enter length" 
                  className="bg-card border border-muted/40"
                  value={cableLength}
                  onChange={(e) => setCableLength(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cable-material">Conductor Material</Label>
                <Select value={cableMaterial} onValueChange={setCableMaterial}>
                  <SelectTrigger className="bg-card border border-muted/40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-muted/40 z-50">
                    <SelectItem value="copper">Copper</SelectItem>
                    <SelectItem value="aluminium">Aluminium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="insulation-type">Insulation Type</Label>
                <Select value={insulationType} onValueChange={setInsulationType}>
                  <SelectTrigger className="bg-card border border-muted/40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-muted/40 z-50">
                    <SelectItem value="pvc">PVC (70°C)</SelectItem>
                    <SelectItem value="xlpe">XLPE (90°C)</SelectItem>
                    <SelectItem value="lsf">LSF (70°C)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cable-type">Cable Type</Label>
              <Select value={cableType} onValueChange={setCableType}>
                <SelectTrigger className="bg-card border border-muted/40">
                  <SelectValue placeholder="Select cable type" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-muted/40 z-50">
                  <SelectItem value="single">Single Core</SelectItem>
                  <SelectItem value="twin-and-earth">Twin and Earth</SelectItem>
                  <SelectItem value="swa">Steel Wire Armored (SWA)</SelectItem>
                  <SelectItem value="lsf">Low Smoke and Fume (LSF)</SelectItem>
                  <SelectItem value="armored">Armored</SelectItem>
                  <SelectItem value="heat-resistant">Heat Resistant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cable-size">Cable Size</Label>
              <Select value={cableSize} onValueChange={setCableSize}>
                <SelectTrigger className="bg-card border border-muted/40">
                  <SelectValue placeholder="Select cable size" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-muted/40 z-50">
                  {cableOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="load-current">Load Current (A)</Label>
                <Input 
                  id="load-current" 
                  type="number" 
                  placeholder="Enter current" 
                  className="bg-card border border-muted/40"
                  value={loadCurrent}
                  onChange={(e) => setLoadCurrent(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="power-factor">Power Factor</Label>
                <Select value={powerFactor} onValueChange={setPowerFactor}>
                  <SelectTrigger className="bg-card border border-muted/40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-muted/40 z-50">
                    <SelectItem value="1.0">1.0 (Resistive)</SelectItem>
                    <SelectItem value="0.95">0.95 (Good PF)</SelectItem>
                    <SelectItem value="0.85">0.85 (Average PF)</SelectItem>
                    <SelectItem value="0.7">0.7 (Poor PF)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button className="flex-1" onClick={calculateVoltageDrop}>
                <Calculator className="h-4 w-4 mr-2" />
                Calculate
              </Button>
              <Button variant="outline" onClick={resetCalculator}>
                Reset
              </Button>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <div className="rounded-md bg-muted/50 p-6 min-h-[300px]">
              {result ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    {result.compliant ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                    <h3 className="text-lg font-semibold">
                      {result.compliant ? "Compliant" : "Non-Compliant"}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Voltage Drop</p>
                      <p className="text-xl font-bold text-elec-yellow">{result.voltageDrop} V</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Percentage</p>
                      <p className="text-xl font-bold text-elec-yellow">{result.voltageDropPercentage}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Voltage at Load</p>
                      <p className="text-lg font-semibold">{result.voltageAtLoad} V</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Max Length</p>
                      <p className="text-lg font-semibold">{result.maxPermissibleLength} m</p>
                    </div>
                  </div>

                  {result.warnings.length > 0 && (
                    <Alert className="border-orange-500/20 bg-orange-500/10">
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                      <AlertDescription className="text-orange-200">
                        <div className="space-y-1">
                          {result.warnings.map((warning, index) => (
                            <div key={index}>• {warning}</div>
                          ))}
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <Calculator className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Enter parameters to calculate voltage drop</p>
                  </div>
                </div>
              )}
            </div>

            {/* What This Means Panel */}
            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                <div className="space-y-2">
                  <p className="font-medium">What This Means:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Voltage drop affects equipment performance and efficiency</li>
                    <li>• High voltage drop causes poor motor starting and lamp dimming</li>
                    <li>• Use larger cables or shorter runs to reduce voltage drop</li>
                    <li>• Consider power factor correction for inductive loads</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>

            {/* BS 7671 Guidance */}
            <Alert className="border-green-500/20 bg-green-500/10">
              <Info className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-200">
                <div className="space-y-2">
                  <p className="font-medium">BS 7671 Regulations:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Maximum 3% drop for lighting circuits (Appendix 4)</li>
                    <li>• Maximum 5% drop for other circuits (Appendix 4)</li>
                    <li>• Voltage at terminals must not fall below -6% of nominal</li>
                    <li>• Consider voltage drop over complete installation</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoltageDropCalculator;