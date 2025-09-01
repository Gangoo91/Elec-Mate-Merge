
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
                title="Prospective Fault Current (PFC) Overview"
                icon={<Zap className="h-6 w-6 text-primary" />}
                className="mb-6"
                as="section"
              >
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Prospective Fault Current is the maximum current that would flow during a fault with negligible impedance. 
                    It's essential for determining protective device ratings and ensuring safe fault clearance.
                  </p>
                  
                  <div className="bg-muted/20 border border-border rounded-lg p-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Calculator className="h-4 w-4 text-primary" />
                      Calculation Formula
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="font-mono bg-accent/10 p-2 rounded border border-accent/20">
                        PFC = U₀ / Zs
                      </div>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• <strong>U₀</strong> = Nominal voltage to earth (230V single phase, 400V three phase)</li>
                        <li>• <strong>Zs</strong> = Earth fault loop impedance (Ze + R1 + R2)</li>
                        <li>• <strong>Ze</strong> = External earth loop impedance (supply authority)</li>
                        <li>• <strong>R1+R2</strong> = Circuit conductor resistance (line + protective conductor)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-warning flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Important Considerations
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Account for voltage tolerance (±6% in UK)</li>
                      <li>• Consider temperature effects on conductor resistance</li>
                      <li>• Parallel earth paths may reduce actual fault current</li>
                      <li>• Supply impedance can vary with network conditions</li>
                    </ul>
                  </div>
                </div>
              </InfoBox>

              {/* Measurement and Testing */}
              <InfoBox
                title="Measurement and Testing Requirements"
                icon={<Target className="h-6 w-6 text-accent" />}
                className="mb-6"
                as="section"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted/20 border border-border rounded-lg p-4">
                      <h4 className="font-semibold mb-3 text-primary">Ze Measurement</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Measured at main earthing terminal</li>
                        <li>• Installation isolated from supply</li>
                        <li>• Use appropriate earth loop impedance tester</li>
                        <li>• Test between line and earth conductors</li>
                        <li>• Record highest reading if multiple phases</li>
                      </ul>
                    </div>
                    
                    <div className="bg-muted/20 border border-border rounded-lg p-4">
                      <h4 className="font-semibold mb-3 text-accent">R1+R2 Measurement</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Measured end-to-end during dead testing</li>
                        <li>• Test between line and cpc at distribution board</li>
                        <li>• Link line and cpc at furthest point</li>
                        <li>• Apply temperature correction if necessary</li>
                        <li>• Include all circuit conductors in measurement</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-success">Best Practice Tips</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Always verify test equipment calibration before use</li>
                      <li>• Record ambient temperature during testing</li>
                      <li>• Check all connections are secure before testing</li>
                      <li>• Consider parallel earth paths in fault current calculations</li>
                      <li>• Document all readings and calculation methods used</li>
                    </ul>
                  </div>
                </div>
              </InfoBox>

              {/* Device Selection Guide */}
              <InfoBox
                title="Protective Device Selection"
                icon={<Shield className="h-6 w-6 text-warning" />}
                className="mb-6"
                as="section"
              >
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-border rounded-lg">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left p-3 border-b border-border font-semibold">PFC Range</th>
                          <th className="text-left p-3 border-b border-border font-semibold">Min. Breaking Capacity</th>
                          <th className="text-left p-3 border-b border-border font-semibold">Device Type</th>
                          <th className="text-left p-3 border-b border-border font-semibold">Application</th>
                        </tr>
                      </thead>
                      <tbody className="text-muted-foreground">
                        <tr>
                          <td className="p-3 border-b border-border">Up to 1kA</td>
                          <td className="p-3 border-b border-border text-success">3kA - 6kA</td>
                          <td className="p-3 border-b border-border">Standard MCB</td>
                          <td className="p-3 border-b border-border">Domestic, small commercial</td>
                        </tr>
                        <tr>
                          <td className="p-3 border-b border-border">1kA - 6kA</td>
                          <td className="p-3 border-b border-border text-primary">6kA</td>
                          <td className="p-3 border-b border-border">Standard MCB</td>
                          <td className="p-3 border-b border-border">Most installations</td>
                        </tr>
                        <tr>
                          <td className="p-3 border-b border-border">6kA - 10kA</td>
                          <td className="p-3 border-b border-border text-warning">10kA</td>
                          <td className="p-3 border-b border-border">Enhanced MCB</td>
                          <td className="p-3 border-b border-border">Industrial, large commercial</td>
                        </tr>
                        <tr>
                          <td className="p-3">Above 10kA</td>
                          <td className="p-3 text-destructive">16kA+</td>
                          <td className="p-3">Specialist MCB/MCCB</td>
                          <td className="p-3">High fault current locations</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                      <h4 className="font-semibold mb-3 text-accent">Selection Factors</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Breaking capacity must exceed calculated PFC</li>
                        <li>• Consider safety margin (typically 25-50%)</li>
                        <li>• Account for network changes and load growth</li>
                        <li>• Verify manufacturer specifications and certifications</li>
                        <li>• Consider discrimination with upstream devices</li>
                      </ul>
                    </div>

                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                      <h4 className="font-semibold mb-3 text-destructive">Common Pitfalls</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Using outdated Ze values from suppliers</li>
                        <li>• Ignoring cable temperature effects</li>
                        <li>• Inadequate breaking capacity margins</li>
                        <li>• Not considering parallel earth paths</li>
                        <li>• Mixing different calculation methods</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </InfoBox>

              {/* Regulatory Compliance */}
              <InfoBox
                title="BS 7671 Compliance Requirements"
                icon={<BookOpen className="h-6 w-6 text-primary" />}
                className="mb-6"
                as="section"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-primary">Design Stage Requirements</h4>
                      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li><strong>Regulation 434.5.2:</strong> PFC must be determined at every relevant point in the installation</li>
                          <li><strong>Regulation 411.3.2:</strong> Maximum disconnection times must be achieved</li>
                          <li><strong>Section 312:</strong> Protective device coordination requirements</li>
                          <li><strong>Appendix 4:</strong> Current-carrying capacity and voltage drop considerations</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-accent">Verification Requirements</h4>
                      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li><strong>Section 612:</strong> Initial verification must include PFC verification</li>
                          <li><strong>Table 61:</strong> Minimum test requirements and acceptance criteria</li>
                          <li><strong>Regulation 612.11:</strong> Earth fault loop impedance testing requirements</li>
                          <li><strong>Part 6:</strong> Documentation and certification requirements</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                    <h4 className="font-semibold mb-3 text-warning">Documentation Requirements</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium mb-2">Design Records</h5>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• PFC calculations</li>
                          <li>• Device specifications</li>
                          <li>• Safety margins applied</li>
                          <li>• Assumption documented</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Test Results</h5>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Ze measurements</li>
                          <li>• R1+R2 values</li>
                          <li>• PFC verification</li>
                          <li>• Test conditions</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Certificates</h5>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• EIC compliance</li>
                          <li>• Device certifications</li>
                          <li>• Test certificates</li>
                          <li>• Design validation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </InfoBox>

              {/* Practical Examples */}
              <InfoBox
                title="Worked Examples and Common Scenarios"
                icon={<Calculator className="h-6 w-6 text-success" />}
                as="section"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-muted/20 border border-border rounded-lg p-4">
                      <h4 className="font-semibold mb-3 text-success">Example 1: Domestic Installation</h4>
                      <div className="space-y-2 text-sm">
                        <div className="bg-accent/10 p-3 rounded border border-accent/20">
                          <p><strong>Given:</strong></p>
                          <ul className="mt-1 space-y-1 text-muted-foreground">
                            <li>• Single phase 230V supply</li>
                            <li>• Ze = 0.35Ω (TN-S system)</li>
                            <li>• 32A ring final circuit</li>
                            <li>• 2.5mm² T&E cable, R1+R2 = 0.31Ω</li>
                          </ul>
                        </div>
                        <div className="bg-success/10 p-3 rounded border border-success/20">
                          <p><strong>Calculation:</strong></p>
                          <ul className="mt-1 space-y-1 text-muted-foreground font-mono text-xs">
                            <li>Zs = Ze + R1+R2 = 0.35 + 0.31 = 0.66Ω</li>
                            <li>PFC = 230V ÷ 0.66Ω = 348A</li>
                            <li>Assessment: Low PFC - 6kA MCB adequate</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/20 border border-border rounded-lg p-4">
                      <h4 className="font-semibold mb-3 text-warning">Example 2: Commercial Installation</h4>
                      <div className="space-y-2 text-sm">
                        <div className="bg-accent/10 p-3 rounded border border-accent/20">
                          <p><strong>Given:</strong></p>
                          <ul className="mt-1 space-y-1 text-muted-foreground">
                            <li>• Three phase 400V supply</li>
                            <li>• Ze = 0.15Ω (TN-C-S system)</li>
                            <li>• 63A distribution circuit</li>
                            <li>• 16mm² SWA cable, R1+R2 = 0.08Ω</li>
                          </ul>
                        </div>
                        <div className="bg-warning/10 p-3 rounded border border-warning/20">
                          <p><strong>Calculation:</strong></p>
                          <ul className="mt-1 space-y-1 text-muted-foreground font-mono text-xs">
                            <li>Zs = Ze + R1+R2 = 0.15 + 0.08 = 0.23Ω</li>
                            <li>PFC = 400V ÷ 0.23Ω = 1,739A</li>
                            <li>Assessment: Medium PFC - 6kA MCB adequate</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                    <h4 className="font-semibold mb-3 text-destructive">High PFC Scenario Considerations</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium mb-2">When PFC exceeds 10kA:</h5>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Review supply arrangement with DNO</li>
                          <li>• Consider current limiting reactors</li>
                          <li>• Specify enhanced breaking capacity devices</li>
                          <li>• Implement additional discrimination measures</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Risk Mitigation:</h5>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Increase cable sizing to reduce R1+R2</li>
                          <li>• Split large circuits into smaller sections</li>
                          <li>• Use diversity factors appropriately</li>
                          <li>• Consider alternative earthing arrangements</li>
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
