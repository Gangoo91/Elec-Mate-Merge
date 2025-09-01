
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";  
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, RotateCcw, Settings, BookOpen, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import R1R2Result from "./r1r2/R1R2Result";
import R1R2Guidance from "./r1r2/R1R2Guidance";
import R1R2Standards from "./r1r2/R1R2Standards";

const R1R2Calculator = () => {
  const [cableLength, setCableLength] = useState("");
  const [lineConductorCSA, setLineConductorCSA] = useState("");
  const [cpcConductorCSA, setCpcConductorCSA] = useState("");
  const [conductorMaterial, setConductorMaterial] = useState("");
  const [temperature, setTemperature] = useState("70");
  const [measuredValue, setMeasuredValue] = useState("");
  const [result, setResult] = useState<{
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
  } | null>(null);

  // Resistance values at 20°C (mΩ/m)
  const copperResistance20C: { [key: string]: number } = {
    "1.0": 18.1,
    "1.5": 12.1,
    "2.5": 7.41,
    "4.0": 4.61,
    "6.0": 3.08,
    "10.0": 1.83,
    "16.0": 1.15,
    "25.0": 0.727,
    "35.0": 0.524,
    "50.0": 0.387,
    "70.0": 0.268,
    "95.0": 0.193,
    "120.0": 0.153,
    "150.0": 0.124,
    "185.0": 0.0991,
    "240.0": 0.0754,
    "300.0": 0.0601
  };

  const aluminiumResistance20C: { [key: string]: number } = {
    "16.0": 1.91,
    "25.0": 1.20,
    "35.0": 0.868,
    "50.0": 0.641,
    "70.0": 0.443,
    "95.0": 0.320,
    "120.0": 0.253,
    "150.0": 0.206,
    "185.0": 0.164,
    "240.0": 0.125,
    "300.0": 0.100
  };

  const calculateR1R2 = () => {
    if (!cableLength || !lineConductorCSA || !cpcConductorCSA || !conductorMaterial) {
      return;
    }

    const length = parseFloat(cableLength);
    const resistanceData = conductorMaterial === "copper" ? copperResistance20C : aluminiumResistance20C;
    
    const r20Line = resistanceData[lineConductorCSA];
    const r20CPC = resistanceData[cpcConductorCSA];
    
    if (!r20Line || !r20CPC) {
      return;
    }

    // Temperature correction factor
    const tempCorrection = conductorMaterial === "copper" 
      ? (234.5 + parseInt(temperature)) / (234.5 + 20)
      : (228 + parseInt(temperature)) / (228 + 20);

    // Calculate R1 and R2 at operating temperature
    const r1 = (r20Line * length * tempCorrection) / 1000; // Convert to Ω
    const r2 = (r20CPC * length * tempCorrection) / 1000; // Convert to Ω
    const r1r2 = r1 + r2;

    // Continuity test limit (typically R1+R2 × 1.67 for temperature correction during testing)
    const continuityLimit = r1r2 * 1.67;
    
    // Test is acceptable if measured value is within ±20% of calculated value
    const testAcceptable = true; // This would be compared with actual test readings

    setResult({
      r1,
      r2,
      r1r2,
      continuityLimit,
      testAcceptable,
      cableLength: length,
      lineConductorCSA,
      cpcConductorCSA,
      conductorMaterial,
      temperature: parseInt(temperature)
    });
  };

  const resetCalculator = () => {
    setCableLength("");
    setLineConductorCSA("");
    setCpcConductorCSA("");
    setConductorMaterial("");
    setTemperature("70");
    setMeasuredValue("");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-card w-full max-w-none">
      <CardHeader className="px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-elec-yellow" />
          <CardTitle className="text-elec-light mobile-heading">R1+R2 Calculator</CardTitle>
        </div>
        <p className="mobile-text text-muted-foreground">
          Calculate R1+R2 values for continuity testing according to BS 7671
        </p>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-elec-dark h-11">
            <TabsTrigger value="calculator" className="text-elec-light text-sm">Calculator</TabsTrigger>
            <TabsTrigger value="guidance" className="text-elec-light text-sm">Guidance</TabsTrigger>
            <TabsTrigger value="standards" className="text-elec-light text-sm">Standards</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-elec-light">Circuit Parameters</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cable-length" className="text-sm font-medium text-elec-light">Cable Length (m)</Label>
                    <Input
                      id="cable-length"
                      type="number"
                      value={cableLength}
                      onChange={(e) => setCableLength(e.target.value)}
                      placeholder="Enter cable length"
                      className="mt-2 h-11 bg-elec-dark border-elec-yellow/20 text-elec-light"
                    />
                  </div>

                  <div>
                    <Label htmlFor="conductor-material" className="text-sm font-medium text-elec-light">Conductor Material</Label>
                    <Select value={conductorMaterial} onValueChange={setConductorMaterial}>
                      <SelectTrigger className="mt-2 h-11 bg-elec-dark border-elec-yellow/20">
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="copper">Copper</SelectItem>
                        <SelectItem value="aluminium">Aluminium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="line-csa" className="text-sm font-medium text-elec-light">Line Conductor CSA (mm²)</Label>
                    <Select value={lineConductorCSA} onValueChange={setLineConductorCSA}>
                      <SelectTrigger className="mt-2 h-11 bg-elec-dark border-elec-yellow/20">
                        <SelectValue placeholder="Select CSA" />
                      </SelectTrigger>
                      <SelectContent className="max-h-48">
                        <SelectItem value="1.0">1.0</SelectItem>
                        <SelectItem value="1.5">1.5</SelectItem>
                        <SelectItem value="2.5">2.5</SelectItem>
                        <SelectItem value="4.0">4.0</SelectItem>
                        <SelectItem value="6.0">6.0</SelectItem>
                        <SelectItem value="10.0">10.0</SelectItem>
                        <SelectItem value="16.0">16.0</SelectItem>
                        <SelectItem value="25.0">25.0</SelectItem>
                        <SelectItem value="35.0">35.0</SelectItem>
                        <SelectItem value="50.0">50.0</SelectItem>
                        <SelectItem value="70.0">70.0</SelectItem>
                        <SelectItem value="95.0">95.0</SelectItem>
                        <SelectItem value="120.0">120.0</SelectItem>
                        <SelectItem value="150.0">150.0</SelectItem>
                        <SelectItem value="185.0">185.0</SelectItem>
                        <SelectItem value="240.0">240.0</SelectItem>
                        <SelectItem value="300.0">300.0</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="cpc-csa" className="text-sm font-medium text-elec-light">CPC Conductor CSA (mm²)</Label>
                    <Select value={cpcConductorCSA} onValueChange={setCpcConductorCSA}>
                      <SelectTrigger className="mt-2 h-11 bg-elec-dark border-elec-yellow/20">
                        <SelectValue placeholder="Select CSA" />
                      </SelectTrigger>
                      <SelectContent className="max-h-48">
                        <SelectItem value="1.0">1.0</SelectItem>
                        <SelectItem value="1.5">1.5</SelectItem>
                        <SelectItem value="2.5">2.5</SelectItem>
                        <SelectItem value="4.0">4.0</SelectItem>
                        <SelectItem value="6.0">6.0</SelectItem>
                        <SelectItem value="10.0">10.0</SelectItem>
                        <SelectItem value="16.0">16.0</SelectItem>
                        <SelectItem value="25.0">25.0</SelectItem>
                        <SelectItem value="35.0">35.0</SelectItem>
                        <SelectItem value="50.0">50.0</SelectItem>
                        <SelectItem value="70.0">70.0</SelectItem>
                        <SelectItem value="95.0">95.0</SelectItem>
                        <SelectItem value="120.0">120.0</SelectItem>
                        <SelectItem value="150.0">150.0</SelectItem>
                        <SelectItem value="185.0">185.0</SelectItem>
                        <SelectItem value="240.0">240.0</SelectItem>
                        <SelectItem value="300.0">300.0</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="temperature" className="text-sm font-medium text-elec-light">Operating Temperature (°C)</Label>
                    <Input
                      id="temperature"
                      type="number"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      className="mt-2 h-11 bg-elec-dark border-elec-yellow/20 text-elec-light"
                    />
                  </div>

                  <div>
                    <Label htmlFor="measured-value" className="text-sm font-medium text-elec-light">Measured R1+R2 Value (Ω) - Optional</Label>
                    <Input
                      id="measured-value"
                      type="number"
                      step="0.0001"
                      value={measuredValue}
                      onChange={(e) => setMeasuredValue(e.target.value)}
                      placeholder="Enter test result for comparison"
                      className="mt-2 h-11 bg-elec-dark border-elec-yellow/20 text-elec-light"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button 
                      onClick={calculateR1R2} 
                      className="flex-1 h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-medium"
                      disabled={!cableLength || !lineConductorCSA || !cpcConductorCSA || !conductorMaterial}
                    >
                      Calculate R1+R2
                    </Button>
                    <Button onClick={resetCalculator} variant="outline" className="h-11 touch-target">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Result Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-elec-light">Results</h3>
                
                {result ? (
                  <div className="space-y-4">
                    <Card className="border-green-500/30 bg-green-500/5">
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-green-200">R1 (Line resistance):</span>
                            <span className="font-mono text-green-300">{result.r1.toFixed(4)} Ω</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-200">R2 (CPC resistance):</span>
                            <span className="font-mono text-green-300">{result.r2.toFixed(4)} Ω</span>
                          </div>
                          <div className="flex justify-between border-t border-green-500/20 pt-2">
                            <span className="text-green-200 font-semibold">R1+R2 Total:</span>
                            <span className="font-mono text-green-300 font-semibold">{result.r1r2.toFixed(4)} Ω</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-yellow-200">Test Limit (×1.67):</span>
                            <span className="font-mono text-yellow-300">{result.continuityLimit.toFixed(4)} Ω</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                    <CardContent className="pt-4">
                      <div className="text-center text-elec-yellow/80">
                        <Calculator className="h-8 w-8 mx-auto mb-2" />
                        <p className="mobile-text">Enter circuit parameters to calculate R1+R2 values</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {result && (
              <R1R2Result result={result} measuredValue={measuredValue} />
            )}
          </TabsContent>

          <TabsContent value="guidance">
            <R1R2Guidance />
          </TabsContent>

          <TabsContent value="standards">
            <R1R2Standards />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default R1R2Calculator;
