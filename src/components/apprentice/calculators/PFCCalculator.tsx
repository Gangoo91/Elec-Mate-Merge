
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, RotateCcw, AlertTriangle, Info, Shield, BookOpen, CheckCircle, XCircle, Calculator, Target } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import InfoBox from "@/components/common/InfoBox";

const PFCCalculator = () => {
  const [voltage, setVoltage] = useState("230");
  const [systemType, setSystemType] = useState("");
  const [zeValue, setZeValue] = useState("");
  const [r1r2Value, setR1r2Value] = useState("");
  const [calculationMethod, setCalculationMethod] = useState("impedance");
  const [result, setResult] = useState<{
    pfcValue: number;
    assessmentLevel: string;
    recommendations: string[];
    breakingCapacity: string;
  } | null>(null);

  const calculatePFC = () => {
    if (!voltage || !zeValue || !r1r2Value || !systemType) {
      return;
    }

    const supplyVoltage = parseFloat(voltage);
    const ze = parseFloat(zeValue);
    const r1r2 = parseFloat(r1r2Value);
    
    // Calculate fault loop impedance
    const zs = ze + r1r2;
    
    // Calculate PFC using Ohm's law
    let pfcValue: number;
    
    if (systemType === "single-phase") {
      pfcValue = supplyVoltage / zs;
    } else if (systemType === "three-phase") {
      // For 3-phase systems, use line voltage and account for √3 factor
      const lineVoltage = supplyVoltage * Math.sqrt(3);
      pfcValue = lineVoltage / zs;
    } else {
      pfcValue = supplyVoltage / zs;
    }

    // Assess the PFC level and provide recommendations
    let assessmentLevel: string;
    let recommendations: string[];
    let breakingCapacity: string;

    if (pfcValue < 1000) {
      assessmentLevel = "Low";
      recommendations = [
        "PFC is relatively low - standard MCBs should be adequate",
        "Check if protective device will operate within required time",
        "Consider cable sizing and length factors"
      ];
      breakingCapacity = "6kA MCBs typically adequate";
    } else if (pfcValue < 6000) {
      assessmentLevel = "Medium";
      recommendations = [
        "Moderate PFC - ensure MCBs have adequate breaking capacity",
        "Standard 6kA MCBs should be sufficient",
        "Check manufacturer specifications for exact requirements"
      ];
      breakingCapacity = "6kA MCBs recommended";
    } else if (pfcValue < 10000) {
      assessmentLevel = "High";
      recommendations = [
        "High PFC - use MCBs with higher breaking capacity",
        "Consider 10kA or higher rated protective devices",
        "Additional protection coordination may be required"
      ];
      breakingCapacity = "10kA MCBs required";
    } else {
      assessmentLevel = "Very High";
      recommendations = [
        "Very high PFC - specialist equipment required",
        "Use MCBs with 16kA or higher breaking capacity",
        "Consider current limiting devices",
        "Professional assessment recommended"
      ];
      breakingCapacity = "16kA or higher MCBs required";
    }

    setResult({
      pfcValue,
      assessmentLevel,
      recommendations,
      breakingCapacity
    });
  };

  const resetCalculator = () => {
    setVoltage("230");
    setSystemType("");
    setZeValue("");
    setR1r2Value("");
    setCalculationMethod("impedance");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Prospective Fault Current Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate prospective fault current and assess protective device requirements
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="guidance">Guidance</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">System Parameters</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="system-type">System Type</Label>
                  <Select value={systemType} onValueChange={setSystemType}>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                      <SelectValue placeholder="Select system type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single-phase">Single Phase (230V)</SelectItem>
                      <SelectItem value="three-phase">Three Phase (400V)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="voltage">Supply Voltage (V)</Label>
                  <Input
                    id="voltage"
                    type="number"
                    value={voltage}
                    onChange={(e) => setVoltage(e.target.value)}
                    className="bg-elec-dark border-elec-yellow/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ze-value">Ze - External Loop Impedance (Ω)</Label>
                  <Input
                    id="ze-value"
                    type="number"
                    step="0.001"
                    value={zeValue}
                    onChange={(e) => setZeValue(e.target.value)}
                    placeholder="e.g. 0.35"
                    className="bg-elec-dark border-elec-yellow/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="r1r2-value">R1+R2 - Circuit Impedance (Ω)</Label>
                  <Input
                    id="r1r2-value"
                    type="number"
                    step="0.001"
                    value={r1r2Value}
                    onChange={(e) => setR1r2Value(e.target.value)}
                    placeholder="e.g. 0.15"
                    className="bg-elec-dark border-elec-yellow/20"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={calculatePFC} className="flex-1">
                    Calculate PFC
                  </Button>
                  <Button onClick={resetCalculator} variant="outline">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Result Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Results</h3>
                
                {result ? (
                  <div className="space-y-4 sm:space-y-6">
                    {/* Primary Results */}
                    <Card className="border-success/30 bg-success/5">
                      <CardContent className="pt-4 sm:pt-6">
                        <div className="space-y-4 sm:space-y-6">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                            <Badge 
                              variant={
                                result.assessmentLevel === 'Low' ? 'default' :
                                result.assessmentLevel === 'Medium' ? 'secondary' :
                                result.assessmentLevel === 'High' ? 'outline' :
                                'destructive'
                              } 
                              className="text-sm font-medium w-fit"
                            >
                              {result.assessmentLevel} PFC Level
                            </Badge>
                            {result.assessmentLevel === 'Low' ? (
                              <CheckCircle className="h-5 w-5 text-success" />
                            ) : result.assessmentLevel === 'Very High' ? (
                              <XCircle className="h-5 w-5 text-destructive" />
                            ) : (
                              <AlertTriangle className="h-5 w-5 text-warning" />
                            )}
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                              <span className="text-white text-sm sm:text-base">Zs (Total Impedance):</span>
                              <span className="font-mono text-white font-medium text-lg">
                                {(parseFloat(zeValue) + parseFloat(r1r2Value)).toFixed(3)} Ω
                              </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-t border-border pt-4">
                              <span className="text-white font-semibold text-sm sm:text-base">Prospective Fault Current:</span>
                              <span className="font-mono text-white font-bold text-2xl sm:text-3xl">
                                {result.pfcValue.toFixed(0)} A
                              </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                              <span className="text-white text-sm sm:text-base">Required Breaking Capacity:</span>
                              <span className="font-medium text-elec-yellow text-sm sm:text-base">{result.breakingCapacity}</span>
                            </div>
                          </div>

                          {/* Safety Margin Assessment */}
                          <div className="mt-6 p-4 bg-muted/10 rounded-lg border border-border">
                            <div className="flex items-center gap-2 mb-3">
                              <Shield className="h-4 w-4 text-elec-yellow" />
                              <span className="font-medium text-white text-sm sm:text-base">Safety Margin Analysis</span>
                            </div>
                            <p className="text-white text-sm leading-relaxed">
                              {result.pfcValue < 6000 
                                ? "Adequate safety margin with standard equipment." 
                                : result.pfcValue < 10000 
                                ? "Moderate margin - ensure correct equipment specification."
                                : "High current level - specialist assessment recommended."}
                            </p>
                          </div>

                          {/* Key Assumptions */}
                          <div className="mt-4 p-4 bg-muted/10 rounded-lg border border-border">
                            <div className="flex items-center gap-2 mb-3">
                              <Info className="h-4 w-4 text-elec-yellow" />
                              <span className="font-medium text-white text-sm sm:text-base">Calculation Assumptions</span>
                            </div>
                            <ul className="text-white text-xs sm:text-sm space-y-1 leading-relaxed">
                              <li>• Temperature factor: 20°C ambient</li>
                              <li>• Voltage tolerance: ±6% (BS 7671)</li>
                              <li>• Worst-case fault scenario considered</li>
                              <li>• Supply impedance remains constant</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Installation Guidance */}
                    <Card className="border-primary/30 bg-primary/5">
                      <CardContent className="pt-4 sm:pt-6">
                        <div className="space-y-4">
                          <h4 className="text-white font-semibold flex items-center gap-2 text-sm sm:text-base">
                            <Target className="h-4 w-4" />
                            Next Steps & Recommendations
                          </h4>
                          <div className="space-y-3">
                            {result.recommendations.map((rec, index) => (
                              <div key={index} className="flex items-start gap-2 text-sm leading-relaxed">
                                <span className="text-elec-yellow mt-1 flex-shrink-0">•</span>
                                <span className="text-white">{rec}</span>
                              </div>
                            ))}
                          </div>
                          
                          {/* Practical guidance based on PFC level */}
                          <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                            <p className="text-sm font-medium text-white mb-3">Practical Guidance:</p>
                            <p className="text-sm text-white leading-relaxed">
                              {result.pfcValue < 1000 
                                ? "Standard installation practices apply. Verify protective device coordination and ensure adequate cable sizing for expected loads."
                                : result.pfcValue < 6000
                                ? "Standard MCBs adequate. Consider future load increases and ensure all downstream equipment is compatible with calculated fault levels."
                                : result.pfcValue < 10000
                                ? "Enhanced coordination required. Check manufacturer compliance certificates and consider discrimination studies for complex installations."
                                : "Specialist assessment essential. May require current-limiting devices, enhanced earthing arrangements, or supply modification."}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Educational Content - Responsive Layout */}
                    <div className="grid grid-cols-1 gap-4 sm:gap-6">
                      <WhyThisMatters
                        points={[
                          "Ensures protective devices can safely interrupt fault currents without damage",
                          "Prevents dangerous arcing and fire risk during fault conditions",
                          "Critical for person protection - affects automatic disconnection times",
                          "Required for equipment specification and installation compliance",
                          "Determines earthing and bonding arrangement adequacy"
                        ]}
                        className="mb-0"
                      />

                      <InfoBox
                        title="BS 7671 Requirements"
                        icon={<BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />}
                        points={[
                          "Regulation 434.5.2: PFC must be determined at every relevant point",
                          "Regulation 411.3.2: Maximum disconnection times must be verified",
                          "Table 41.1: Maximum earth fault loop impedance values",
                          "Section 612: Initial verification requirements include PFC measurement",
                          "Appendix 3: Provides guidance on calculation methods and considerations"
                        ]}
                        className="mb-0"
                        as="section"
                      />

                      <InfoBox
                        title="Practical Guidance"
                        icon={<Calculator className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />}
                        points={[
                          "Measure Ze at origin using appropriate test equipment during dead tests",
                          "Calculate R1+R2 from cable data or measure during continuity testing",
                          "Apply correction factors for temperature and cable grouping where applicable",
                          "Consider voltage variation (±6%) for worst-case scenarios",
                          "Document all measurements and calculations for compliance records",
                          "Review calculations when circuit modifications are made"
                        ]}
                        className="mb-0"
                        as="section"
                      />
                    </div>
                  </div>
                ) : (
                  <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                    <CardContent className="pt-4">
                      <div className="text-center text-elec-yellow/80">
                        <Zap className="h-8 w-8 mx-auto mb-2" />
                        <p>Enter system parameters to calculate PFC</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="guidance">
            <div className="space-y-6">
              {/* Overview Section */}
              <Card className="border-primary/40 bg-primary/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3 text-lg sm:text-xl">
                    <Zap className="h-6 w-6 text-elec-grey" />
                    Prospective Fault Current (PFC) Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <p className="text-white text-base sm:text-lg leading-relaxed">
                      Prospective Fault Current is the maximum current that would flow during a fault with negligible impedance. 
                      It's essential for determining protective device ratings and ensuring safe fault clearance.
                    </p>
                    
                    <div className="bg-elec-card border border-elec-grey/30 rounded-lg p-4 sm:p-6">
                      <h4 className="font-semibold mb-4 flex items-center gap-2 text-white text-base sm:text-lg">
                        <Calculator className="h-5 w-5 text-elec-grey" />
                        Calculation Formula
                      </h4>
                      <div className="space-y-4 text-base sm:text-lg">
                        <div className="font-mono bg-elec-grey/20 p-3 sm:p-4 rounded border border-elec-grey/40 text-white text-center font-bold">
                          PFC = U₀ / Zs
                        </div>
                        <div className="space-y-3 text-white">
                          <div className="flex items-start gap-3">
                            <span className="text-elec-grey font-bold min-w-fit">U₀</span>
                            <span>=</span>
                            <span>Nominal voltage to earth (230V single phase, 400V three phase)</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-elec-grey font-bold min-w-fit">Zs</span>
                            <span>=</span>
                            <span>Earth fault loop impedance (Ze + R1 + R2)</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-elec-grey font-bold min-w-fit">Ze</span>
                            <span>=</span>
                            <span>External earth loop impedance (supply authority)</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-elec-grey font-bold min-w-fit">R1+R2</span>
                            <span>=</span>
                            <span>Circuit conductor resistance (line + protective conductor)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-warning/20 border border-warning/40 rounded-lg p-4 sm:p-6">
                      <h4 className="font-semibold mb-3 text-white flex items-center gap-2 text-base sm:text-lg">
                        <AlertTriangle className="h-5 w-5 text-warning" />
                        Important Considerations
                      </h4>
                      <div className="space-y-3 text-base text-white">
                        <div className="flex items-start gap-3">
                          <span className="text-elec-grey mt-1 text-lg">•</span>
                          <span>Account for voltage tolerance (±6% in UK)</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-elec-grey mt-1 text-lg">•</span>
                          <span>Consider temperature effects on conductor resistance</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-elec-grey mt-1 text-lg">•</span>
                          <span>Parallel earth paths may reduce actual fault current</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-elec-grey mt-1 text-lg">•</span>
                          <span>Supply impedance can vary with network conditions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Measurement and Testing */}
              <Card className="border-accent/40 bg-accent/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3 text-lg sm:text-xl">
                    <Target className="h-6 w-6 text-elec-grey" />
                    Measurement and Testing Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-elec-card border border-primary/40 rounded-lg p-4 sm:p-6">
                        <h4 className="font-semibold mb-4 text-white text-base sm:text-lg">Ze Measurement</h4>
                        <div className="space-y-3 text-base text-white">
                          <div className="flex items-start gap-3">
                            <span className="text-elec-grey mt-1 text-lg">•</span>
                            <span>Measured at main earthing terminal</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-elec-grey mt-1 text-lg">•</span>
                            <span>Installation isolated from supply</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-elec-grey mt-1 text-lg">•</span>
                            <span>Use appropriate earth loop impedance tester</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-elec-grey mt-1 text-lg">•</span>
                            <span>Test between line and earth conductors</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-elec-grey mt-1 text-lg">•</span>
                            <span>Record highest reading if multiple phases</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-elec-card border border-accent/40 rounded-lg p-4 sm:p-6">
                        <h4 className="font-semibold mb-4 text-white text-base sm:text-lg">R1+R2 Measurement</h4>
                        <div className="space-y-3 text-base text-white">
                          <div className="flex items-start gap-3">
                            <span className="text-elec-grey mt-1 text-lg">•</span>
                            <span>Measured end-to-end during dead testing</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-elec-grey mt-1 text-lg">•</span>
                            <span>Test between line and cpc at distribution board</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-elec-grey mt-1 text-lg">•</span>
                            <span>Link line and cpc at furthest point</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-elec-grey mt-1 text-lg">•</span>
                            <span>Apply temperature correction if necessary</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-elec-grey mt-1 text-lg">•</span>
                            <span>Include all circuit conductors in measurement</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-success/20 border border-success/40 rounded-lg p-4 sm:p-6">
                      <h4 className="font-semibold mb-3 text-white text-base sm:text-lg">Best Practice Tips</h4>
                      <div className="space-y-3 text-base text-white">
                        <div className="flex items-start gap-3">
                          <span className="text-elec-grey mt-1 text-lg">•</span>
                          <span>Always verify test equipment calibration before use</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-elec-grey mt-1 text-lg">•</span>
                          <span>Record ambient temperature during testing</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-elec-grey mt-1 text-lg">•</span>
                          <span>Check all connections are secure before testing</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-elec-grey mt-1 text-lg">•</span>
                          <span>Consider parallel earth paths in fault current calculations</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-elec-grey mt-1 text-lg">•</span>
                          <span>Document all readings and calculation methods used</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Device Selection Guide */}
              <Card className="border-warning/40 bg-warning/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3 text-lg sm:text-xl">
                    <Shield className="h-6 w-6 text-elec-grey" />
                    Protective Device Selection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="overflow-x-auto">
                      <table className="w-full text-base border border-elec-grey/30 rounded-lg bg-elec-card">
                        <thead>
                          <tr className="bg-elec-grey/20">
                            <th className="text-left p-4 border-b border-elec-grey/30 font-semibold text-white">PFC Range</th>
                            <th className="text-left p-4 border-b border-elec-grey/30 font-semibold text-white">Min. Breaking Capacity</th>
                            <th className="text-left p-4 border-b border-elec-grey/30 font-semibold text-white">Device Type</th>
                            <th className="text-left p-4 border-b border-elec-grey/30 font-semibold text-white">Application</th>
                          </tr>
                        </thead>
                        <tbody className="text-white">
                          <tr>
                            <td className="p-4 border-b border-elec-grey/20">Up to 1kA</td>
                            <td className="p-4 border-b border-elec-grey/20 text-success font-medium">3kA - 6kA</td>
                            <td className="p-4 border-b border-elec-grey/20">Standard MCB</td>
                            <td className="p-4 border-b border-elec-grey/20">Domestic, small commercial</td>
                          </tr>
                          <tr>
                            <td className="p-4 border-b border-elec-grey/20">1kA - 6kA</td>
                            <td className="p-4 border-b border-elec-grey/20 text-primary font-medium">6kA</td>
                            <td className="p-4 border-b border-elec-grey/20">Standard MCB</td>
                            <td className="p-4 border-b border-elec-grey/20">Most installations</td>
                          </tr>
                          <tr>
                            <td className="p-4 border-b border-elec-grey/20">6kA - 10kA</td>
                            <td className="p-4 border-b border-elec-grey/20 text-warning font-medium">10kA</td>
                            <td className="p-4 border-b border-elec-grey/20">Enhanced MCB</td>
                            <td className="p-4 border-b border-elec-grey/20">Industrial, large commercial</td>
                          </tr>
                          <tr>
                            <td className="p-4">Above 10kA</td>
                            <td className="p-4 text-destructive font-medium">16kA+</td>
                            <td className="p-4">Specialist MCB/MCCB</td>
                            <td className="p-4">High fault current locations</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-accent/20 border border-accent/40 rounded-lg p-4 sm:p-6">
                        <h4 className="font-semibold mb-4 text-white text-base sm:text-lg">Selection Factors</h4>
                        <div className="space-y-3 text-base text-white">
                          <div className="flex items-start gap-3">
                            <span className="text-elec-grey mt-1 text-lg">•</span>
                            <span>Breaking capacity must exceed calculated PFC</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-elec-grey mt-1 text-lg">•</span>
                            <span>Consider safety margin (typically 25-50%)</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-elec-grey mt-1 text-lg">•</span>
                            <span>Account for network changes and load growth</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-elec-grey mt-1 text-lg">•</span>
                            <span>Verify manufacturer specifications and certifications</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-elec-grey mt-1 text-lg">•</span>
                            <span>Consider discrimination with upstream devices</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-destructive/20 border border-destructive/40 rounded-lg p-4 sm:p-6">
                        <h4 className="font-semibold mb-4 text-white text-base sm:text-lg">Common Pitfalls</h4>
                        <div className="space-y-3 text-base text-white">
                          <div className="flex items-start gap-3">
                            <span className="text-elec-grey mt-1 text-lg">•</span>
                            <span>Using outdated Ze values from suppliers</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-elec-grey mt-1 text-lg">•</span>
                            <span>Ignoring cable temperature effects</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-elec-grey mt-1 text-lg">•</span>
                            <span>Inadequate breaking capacity margins</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-elec-grey mt-1 text-lg">•</span>
                            <span>Not considering parallel earth paths</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-elec-grey mt-1 text-lg">•</span>
                            <span>Mixing different calculation methods</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Regulatory Compliance */}
              <Card className="border-primary/40 bg-primary/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3 text-lg sm:text-xl">
                    <BookOpen className="h-6 w-6 text-elec-grey" />
                    BS 7671 Compliance Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-white text-base sm:text-lg">Design Stage Requirements</h4>
                        <div className="bg-primary/20 border border-primary/40 rounded-lg p-4 sm:p-6">
                          <div className="space-y-3 text-base text-white">
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey font-bold min-w-fit">Regulation 434.5.2:</span>
                              <span>PFC must be determined at every relevant point in the installation</span>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey font-bold min-w-fit">Regulation 411.3.2:</span>
                              <span>Maximum disconnection times must be achieved</span>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey font-bold min-w-fit">Section 312:</span>
                              <span>Protective device coordination requirements</span>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey font-bold min-w-fit">Appendix 4:</span>
                              <span>Current-carrying capacity and voltage drop considerations</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-white text-base sm:text-lg">Verification Requirements</h4>
                        <div className="bg-accent/20 border border-accent/40 rounded-lg p-4 sm:p-6">
                          <div className="space-y-3 text-base text-white">
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey font-bold min-w-fit">Section 612:</span>
                              <span>Initial verification must include PFC verification</span>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey font-bold min-w-fit">Table 61:</span>
                              <span>Minimum test requirements and acceptance criteria</span>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey font-bold min-w-fit">Regulation 612.11:</span>
                              <span>Earth fault loop impedance testing requirements</span>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey font-bold min-w-fit">Part 6:</span>
                              <span>Documentation and certification requirements</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-warning/20 border border-warning/40 rounded-lg p-4 sm:p-6">
                      <h4 className="font-semibold mb-4 text-white text-base sm:text-lg">Documentation Requirements</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-base">
                        <div>
                          <h5 className="font-medium mb-3 text-elec-grey">Design Records</h5>
                          <div className="space-y-2 text-white">
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey mt-1 text-lg">•</span>
                              <span>PFC calculations</span>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey mt-1 text-lg">•</span>
                              <span>Device specifications</span>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey mt-1 text-lg">•</span>
                              <span>Safety margins applied</span>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey mt-1 text-lg">•</span>
                              <span>Assumption documented</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium mb-3 text-elec-grey">Test Results</h5>
                          <div className="space-y-2 text-white">
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey mt-1 text-lg">•</span>
                              <span>Ze measurements</span>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey mt-1 text-lg">•</span>
                              <span>R1+R2 values</span>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey mt-1 text-lg">•</span>
                              <span>PFC verification</span>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey mt-1 text-lg">•</span>
                              <span>Test conditions</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium mb-3 text-elec-grey">Certificates</h5>
                          <div className="space-y-2 text-white">
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey mt-1 text-lg">•</span>
                              <span>EIC compliance</span>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey mt-1 text-lg">•</span>
                              <span>Device certifications</span>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey mt-1 text-lg">•</span>
                              <span>Test certificates</span>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey mt-1 text-lg">•</span>
                              <span>Design validation</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Practical Examples */}
              <Card className="border-success/40 bg-success/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3 text-lg sm:text-xl">
                    <Calculator className="h-6 w-6 text-elec-grey" />
                    Worked Examples and Common Scenarios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-elec-card border border-success/40 rounded-lg p-4 sm:p-6">
                        <h4 className="font-semibold mb-4 text-white text-base sm:text-lg">Example 1: Domestic Installation</h4>
                        <div className="space-y-4 text-base">
                          <div className="bg-accent/20 p-4 rounded border border-accent/40">
                            <p className="font-semibold text-white mb-3">Given:</p>
                            <div className="space-y-2 text-white">
                              <div className="flex items-start gap-3">
                                <span className="text-elec-grey mt-1 text-lg">•</span>
                                <span>Single phase 230V supply</span>
                              </div>
                              <div className="flex items-start gap-3">
                                <span className="text-elec-grey mt-1 text-lg">•</span>
                                <span>Ze = 0.35Ω (TN-S system)</span>
                              </div>
                              <div className="flex items-start gap-3">
                                <span className="text-elec-grey mt-1 text-lg">•</span>
                                <span>32A ring final circuit</span>
                              </div>
                              <div className="flex items-start gap-3">
                                <span className="text-elec-grey mt-1 text-lg">•</span>
                                <span>2.5mm² T&E cable, R1+R2 = 0.31Ω</span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-success/20 p-4 rounded border border-success/40">
                            <p className="font-semibold text-white mb-3">Calculation:</p>
                            <div className="space-y-2 text-white font-mono text-sm">
                              <div>Zs = Ze + R1+R2 = 0.35 + 0.31 = 0.66Ω</div>
                              <div>PFC = 230V ÷ 0.66Ω = 348A</div>
                              <div className="text-elec-grey font-bold">Assessment: Low PFC - 6kA MCB adequate</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-elec-card border border-warning/40 rounded-lg p-4 sm:p-6">
                        <h4 className="font-semibold mb-4 text-white text-base sm:text-lg">Example 2: Commercial Installation</h4>
                        <div className="space-y-4 text-base">
                          <div className="bg-accent/20 p-4 rounded border border-accent/40">
                            <p className="font-semibold text-white mb-3">Given:</p>
                            <div className="space-y-2 text-white">
                              <div className="flex items-start gap-3">
                                <span className="text-elec-grey mt-1 text-lg">•</span>
                                <span>Three phase 400V supply</span>
                              </div>
                              <div className="flex items-start gap-3">
                                <span className="text-elec-grey mt-1 text-lg">•</span>
                                <span>Ze = 0.15Ω (TN-C-S system)</span>
                              </div>
                              <div className="flex items-start gap-3">
                                <span className="text-elec-grey mt-1 text-lg">•</span>
                                <span>63A distribution circuit</span>
                              </div>
                              <div className="flex items-start gap-3">
                                <span className="text-elec-grey mt-1 text-lg">•</span>
                                <span>16mm² SWA cable, R1+R2 = 0.08Ω</span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-warning/20 p-4 rounded border border-warning/40">
                            <p className="font-semibold text-white mb-3">Calculation:</p>
                            <div className="space-y-2 text-white font-mono text-sm">
                              <div>Zs = Ze + R1+R2 = 0.15 + 0.08 = 0.23Ω</div>
                              <div>PFC = 400V ÷ 0.23Ω = 1,739A</div>
                              <div className="text-elec-grey font-bold">Assessment: Medium PFC - 6kA MCB adequate</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-destructive/20 border border-destructive/40 rounded-lg p-4 sm:p-6">
                      <h4 className="font-semibold mb-4 text-white text-base sm:text-lg">High PFC Scenario Considerations</h4>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-base">
                        <div>
                          <h5 className="font-medium mb-3 text-elec-grey">When PFC exceeds 10kA:</h5>
                          <div className="space-y-2 text-white">
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey mt-1 text-lg">•</span>
                              <span>Review supply arrangement with DNO</span>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey mt-1 text-lg">•</span>
                              <span>Consider current limiting reactors</span>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey mt-1 text-lg">•</span>
                              <span>Specify enhanced breaking capacity devices</span>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey mt-1 text-lg">•</span>
                              <span>Implement additional discrimination measures</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium mb-3 text-elec-grey">Risk Mitigation:</h5>
                          <div className="space-y-2 text-white">
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey mt-1 text-lg">•</span>
                              <span>Increase cable sizing to reduce R1+R2</span>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey mt-1 text-lg">•</span>
                              <span>Split large circuits into smaller sections</span>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey mt-1 text-lg">•</span>
                              <span>Use diversity factors appropriately</span>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-elec-grey mt-1 text-lg">•</span>
                              <span>Consider alternative earthing arrangements</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PFCCalculator;
