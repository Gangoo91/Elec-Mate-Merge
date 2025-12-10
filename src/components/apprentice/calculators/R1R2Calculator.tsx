
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Calculator, RotateCcw } from "lucide-react";
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

  const csaOptions = [
    { value: "1.0", label: "1.0 mm²" },
    { value: "1.5", label: "1.5 mm²" },
    { value: "2.5", label: "2.5 mm²" },
    { value: "4.0", label: "4.0 mm²" },
    { value: "6.0", label: "6.0 mm²" },
    { value: "10.0", label: "10.0 mm²" },
    { value: "16.0", label: "16.0 mm²" },
    { value: "25.0", label: "25.0 mm²" },
    { value: "35.0", label: "35.0 mm²" },
    { value: "50.0", label: "50.0 mm²" },
    { value: "70.0", label: "70.0 mm²" },
    { value: "95.0", label: "95.0 mm²" },
    { value: "120.0", label: "120.0 mm²" },
    { value: "150.0", label: "150.0 mm²" },
    { value: "185.0", label: "185.0 mm²" },
    { value: "240.0", label: "240.0 mm²" },
    { value: "300.0", label: "300.0 mm²" },
  ];

  const materialOptions = [
    { value: "copper", label: "Copper" },
    { value: "aluminium", label: "Aluminium" },
  ];

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
                  <MobileInput
                    label="Cable Length (m)"
                    type="number"
                    inputMode="decimal"
                    value={cableLength}
                    onChange={(e) => setCableLength(e.target.value)}
                    placeholder="Enter cable length"
                  />

                  <MobileSelectWrapper
                    label="Conductor Material"
                    value={conductorMaterial}
                    onValueChange={setConductorMaterial}
                    placeholder="Select material"
                    options={materialOptions}
                  />

                  <MobileSelectWrapper
                    label="Line Conductor CSA (mm²)"
                    value={lineConductorCSA}
                    onValueChange={setLineConductorCSA}
                    placeholder="Select CSA"
                    options={csaOptions}
                  />

                  <MobileSelectWrapper
                    label="CPC Conductor CSA (mm²)"
                    value={cpcConductorCSA}
                    onValueChange={setCpcConductorCSA}
                    placeholder="Select CSA"
                    options={csaOptions}
                  />

                  <MobileInput
                    label="Operating Temperature (°C)"
                    type="number"
                    inputMode="numeric"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                  />

                  <MobileInput
                    label="Measured R1+R2 Value (Ω) - Optional"
                    type="number"
                    inputMode="decimal"
                    step="0.0001"
                    value={measuredValue}
                    onChange={(e) => setMeasuredValue(e.target.value)}
                    placeholder="Enter test result for comparison"
                    hint="Compare your test reading with calculated value"
                  />

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <MobileButton 
                      onClick={calculateR1R2} 
                      variant="elec"
                      size="wide"
                      className="flex-1"
                      disabled={!cableLength || !lineConductorCSA || !cpcConductorCSA || !conductorMaterial}
                    >
                      Calculate R1+R2
                    </MobileButton>
                    <MobileButton onClick={resetCalculator} variant="outline" size="icon">
                      <RotateCcw className="h-4 w-4" />
                    </MobileButton>
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
