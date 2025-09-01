
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
              <InfoBox
                title="Understanding Prospective Fault Current (PFC)"
                icon={<Zap className="h-5 w-5 text-elec-yellow" />}
                as="section"
              >
                <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
                  <p className="text-elec-light">
                    Prospective Fault Current is the maximum current that would flow during a fault with negligible impedance. 
                    It's essential for determining protective device ratings and ensuring safe fault clearance.
                  </p>
                  
                  <div className="bg-elec-card border border-elec-grey/30 rounded-lg p-4">
                    <h4 className="font-semibold mb-4 flex items-center gap-2 text-elec-light text-base">
                      <Calculator className="h-5 w-5 text-elec-yellow" />
                      Calculation Formula
                    </h4>
                    <div className="space-y-4">
                      <div className="font-mono bg-elec-grey/20 p-3 rounded border border-elec-grey/40 text-elec-light text-center font-bold">
                        PFC = U₀ / Zs
                      </div>
                      <div className="space-y-2 text-elec-light text-sm">
                        <div className="flex items-start gap-3">
                          <span className="text-elec-yellow font-bold min-w-fit">U₀</span>
                          <span>=</span>
                          <span>Nominal voltage to earth (230V single phase, 400V three phase)</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-elec-yellow font-bold min-w-fit">Zs</span>
                          <span>=</span>
                          <span>Earth fault loop impedance (Ze + R1 + R2)</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-elec-yellow font-bold min-w-fit">Ze</span>
                          <span>=</span>
                          <span>External earth loop impedance (supply authority)</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-elec-yellow font-bold min-w-fit">R1+R2</span>
                          <span>=</span>
                          <span>Circuit conductor resistance (line + protective conductor)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-warning/10 border border-warning/30 rounded p-3">
                    <h5 className="text-warning font-medium text-sm mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Important Considerations
                    </h5>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-start gap-3">
                        <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                        <span>Account for voltage tolerance (±6% in UK)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                        <span>Consider temperature effects on conductor resistance</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                        <span>Parallel earth paths may reduce actual fault current</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                        <span>Supply impedance can vary with network conditions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </InfoBox>

              {/* Measurement and Testing */}
              <InfoBox
                title="Measurement and Testing Requirements"
                icon={<Target className="h-5 w-5 text-elec-yellow" />}
                as="section"
              >
                <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-elec-card border border-primary/30 rounded p-4">
                      <h4 className="font-semibold mb-3 text-elec-light text-sm">Ze Measurement</h4>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-start gap-3">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                          <span>Measured at main earthing terminal</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                          <span>Installation isolated from supply</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                          <span>Use appropriate earth loop impedance tester</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                          <span>Test between line and earth conductors</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                          <span>Record highest reading if multiple phases</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-elec-card border border-accent/30 rounded p-4">
                      <h4 className="font-semibold mb-3 text-elec-light text-sm">R1+R2 Measurement</h4>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-start gap-3">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                          <span>Measured end-to-end during dead testing</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                          <span>Test between line and cpc at distribution board</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                          <span>Link line and cpc at furthest point</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                          <span>Apply temperature correction if necessary</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-success/10 border border-success/30 rounded p-3">
                    <h5 className="text-success font-medium text-sm mb-2">Best Practice Tips</h5>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-start gap-3">
                        <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                        <span>Always verify test equipment calibration before use</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                        <span>Record ambient temperature during testing</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                        <span>Check all connections are secure before testing</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                        <span>Consider parallel earth paths in fault current calculations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                        <span>Document all readings and calculation methods used</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </InfoBox>

              {/* Device Selection Guide */}
              <InfoBox
                title="Protective Device Selection"
                icon={<Shield className="h-5 w-5 text-elec-yellow" />}
                as="section"
              >
                <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
                  <div className="overflow-x-auto">
                    <div className="bg-elec-card border border-elec-grey/30 rounded-lg p-4">
                      <h4 className="font-semibold mb-3 text-elec-light text-sm">Breaking Capacity Requirements</h4>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="bg-success/10 border border-success/30 rounded p-3">
                          <h5 className="text-success font-medium text-xs mb-1">Up to 1kA</h5>
                          <p className="text-xs">3kA - 6kA MCB</p>
                          <p className="text-xs text-muted-foreground">Domestic/small commercial</p>
                        </div>
                        <div className="bg-primary/10 border border-primary/30 rounded p-3">
                          <h5 className="text-primary font-medium text-xs mb-1">1kA - 6kA</h5>
                          <p className="text-xs">6kA MCB</p>
                          <p className="text-xs text-muted-foreground">Most installations</p>
                        </div>
                        <div className="bg-warning/10 border border-warning/30 rounded p-3">
                          <h5 className="text-warning font-medium text-xs mb-1">6kA - 10kA</h5>
                          <p className="text-xs">10kA MCB</p>
                          <p className="text-xs text-muted-foreground">Industrial/large commercial</p>
                        </div>
                        <div className="bg-destructive/10 border border-destructive/30 rounded p-3">
                          <h5 className="text-destructive font-medium text-xs mb-1">Above 10kA</h5>
                          <p className="text-xs">16kA+ MCB/MCCB</p>
                          <p className="text-xs text-muted-foreground">High fault current locations</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-accent/10 border border-accent/30 rounded p-3">
                      <h5 className="text-accent font-medium text-sm mb-2">Selection Factors</h5>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-start gap-3">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                          <span>Breaking capacity must exceed calculated PFC</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                          <span>Consider safety margin (typically 25-50%)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                          <span>Account for network changes and load growth</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                          <span>Verify manufacturer specifications</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-destructive/10 border border-destructive/30 rounded p-3">
                      <h5 className="text-destructive font-medium text-sm mb-2">Common Pitfalls</h5>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-start gap-3">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                          <span>Using outdated Ze values from suppliers</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                          <span>Ignoring cable temperature effects</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                          <span>Inadequate breaking capacity margins</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                          <span>Not considering parallel earth paths</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </InfoBox>

              {/* Regulatory Compliance */}
              <InfoBox
                title="BS 7671 Compliance Requirements"
                icon={<BookOpen className="h-5 w-5 text-elec-yellow" />}
                as="section"
              >
                <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-primary/10 border border-primary/30 rounded p-3">
                      <h5 className="text-primary font-medium text-sm mb-2">Design Stage Requirements</h5>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-start gap-3">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                          <span><strong>Regulation 434.5.2:</strong> PFC must be determined at every relevant point</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                          <span><strong>Regulation 411.3.2:</strong> Maximum disconnection times must be achieved</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                          <span><strong>Section 312:</strong> Protective device coordination requirements</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-accent/10 border border-accent/30 rounded p-3">
                      <h5 className="text-accent font-medium text-sm mb-2">Verification Requirements</h5>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-start gap-3">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                          <span><strong>Section 612:</strong> Initial verification must include PFC verification</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                          <span><strong>Table 61:</strong> Minimum test requirements and acceptance criteria</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                          <span><strong>Regulation 612.11:</strong> Earth fault loop impedance testing requirements</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-warning/10 border border-warning/30 rounded p-3">
                    <h5 className="text-warning font-medium text-sm mb-2">Documentation Requirements</h5>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div>
                        <h6 className="text-elec-yellow font-medium text-xs mb-1">Design Records</h6>
                        <ul className="text-xs space-y-0.5">
                          <li className="flex items-start gap-2">
                            <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                            <span>PFC calculations</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                            <span>Device specifications</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                            <span>Safety margins applied</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-elec-yellow font-medium text-xs mb-1">Test Results</h6>
                        <ul className="text-xs space-y-0.5">
                          <li className="flex items-start gap-2">
                            <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                            <span>Ze measurements</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                            <span>R1+R2 values</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                            <span>PFC verification</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="text-elec-yellow font-medium text-xs mb-1">Certificates</h6>
                        <ul className="text-xs space-y-0.5">
                          <li className="flex items-start gap-2">
                            <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                            <span>EIC compliance</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                            <span>Device certifications</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                            <span>Test certificates</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </InfoBox>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PFCCalculator;
