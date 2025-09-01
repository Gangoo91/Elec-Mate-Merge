
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Calculator, RotateCcw, Shield, Info, AlertTriangle, CheckCircle, XCircle, Zap, BookOpen } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import InfoBox from "@/components/common/InfoBox";

const RCDTripTimeCalculator = () => {
  const [rcdType, setRcdType] = useState("");
  const [rcdRating, setRcdRating] = useState("");
  const [testCurrent, setTestCurrent] = useState("");
  const [maxTripTime, setMaxTripTime] = useState<number | null>(null);
  const [actualTripTime, setActualTripTime] = useState("");
  const [isCompliant, setIsCompliant] = useState<boolean | null>(null);
  const [testDescription, setTestDescription] = useState("");

  // RCD trip time requirements (in milliseconds)
  const tripTimeRequirements = {
    "30mA": {
      "1x": 300,
      "5x": 40
    },
    "100mA": {
      "1x": 300,
      "5x": 40
    },
    "300mA": {
      "1x": 300,
      "5x": 150
    }
  };

  const rcdTypeDescriptions = {
    "general": "General Purpose RCD - Standard protection for final circuits",
    "socket": "Socket Outlet RCD - Built-in protection for individual socket outlets",
    "rcbo": "RCBO - Combined overcurrent and residual current protection",
    "main": "Main Switch RCD - Whole installation protection at consumer unit"
  };

  const getTestDescription = (rating: string, current: string) => {
    const descriptions: Record<string, Record<string, string>> = {
      "30mA": {
        "1x": "Testing at 30mA - Verifies RCD operates at its rated sensitivity",
        "5x": "Testing at 150mA - Verifies rapid disconnection for fault currents"
      },
      "100mA": {
        "1x": "Testing at 100mA - Verifies RCD operates at its rated sensitivity", 
        "5x": "Testing at 500mA - Verifies rapid disconnection for fault currents"
      },
      "300mA": {
        "1x": "Testing at 300mA - Verifies RCD operates at its rated sensitivity",
        "5x": "Testing at 1500mA - Verifies rapid disconnection for fault currents"
      }
    };
    return descriptions[rating]?.[current] || "";
  };

  const calculateTripTime = () => {
    if (!rcdRating || !testCurrent) return;

    const rating = rcdRating as keyof typeof tripTimeRequirements;
    const current = testCurrent as keyof typeof tripTimeRequirements[typeof rating];
    
    const maxTime = tripTimeRequirements[rating]?.[current];
    setMaxTripTime(maxTime || null);
    setTestDescription(getTestDescription(rcdRating, testCurrent));

    // Check compliance if actual trip time is provided
    if (actualTripTime && maxTime) {
      const actualTime = parseFloat(actualTripTime);
      setIsCompliant(actualTime <= maxTime);
    } else {
      setIsCompliant(null);
    }
  };

  const resetCalculator = () => {
    setRcdType("");
    setRcdRating("");
    setTestCurrent("");
    setMaxTripTime(null);
    setActualTripTime("");
    setIsCompliant(null);
    setTestDescription("");
  };

  const getRiskLevel = () => {
    if (!actualTripTime || !maxTripTime) return null;
    const actual = parseFloat(actualTripTime);
    const max = maxTripTime;
    
    if (actual <= max * 0.5) return "low";
    if (actual <= max * 0.8) return "medium";
    if (actual <= max) return "high";
    return "critical";
  };

  const riskLevel = getRiskLevel();

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-elec-yellow" />
          <CardTitle className="text-elec-light">RCD Trip Time Chart Helper</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate RCD trip time requirements and verify compliance with BS 7671 standards
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
                <h3 className="text-lg font-semibold text-elec-light">RCD Parameters</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="rcd-type" className="text-elec-light">RCD Type</Label>
                  <Select value={rcdType} onValueChange={setRcdType}>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20 h-11">
                      <SelectValue placeholder="Select RCD type" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      <SelectItem value="general">General Purpose RCD</SelectItem>
                      <SelectItem value="socket">Socket Outlet RCD</SelectItem>
                      <SelectItem value="rcbo">RCBO</SelectItem>
                      <SelectItem value="main">Main Switch RCD</SelectItem>
                    </SelectContent>
                  </Select>
                  {rcdType && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {rcdTypeDescriptions[rcdType as keyof typeof rcdTypeDescriptions]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rcd-rating" className="text-elec-light">RCD Rating (IΔn)</Label>
                  <Select value={rcdRating} onValueChange={setRcdRating}>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20 h-11">
                      <SelectValue placeholder="Select RCD sensitivity rating" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      <SelectItem value="30mA">30mA - Personal Protection</SelectItem>
                      <SelectItem value="100mA">100mA - Fire Protection</SelectItem>
                      <SelectItem value="300mA">300mA - Fire Protection (Industrial)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="test-current" className="text-elec-light">Test Current</Label>
                  <Select value={testCurrent} onValueChange={setTestCurrent}>
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20 h-11">
                      <SelectValue placeholder="Select test current multiplier" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      <SelectItem value="1x">1× Rated Current (IΔn) - Sensitivity Test</SelectItem>
                      <SelectItem value="5x">5× Rated Current (5×IΔn) - Fast Trip Test</SelectItem>
                    </SelectContent>
                  </Select>
                  {testCurrent && rcdRating && (
                    <p className="text-xs text-elec-yellow mt-1">
                      {getTestDescription(rcdRating, testCurrent)}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="actual-trip-time" className="text-elec-light">Actual Trip Time (ms) - Optional</Label>
                  <Input
                    id="actual-trip-time"
                    type="number"
                    value={actualTripTime}
                    onChange={(e) => setActualTripTime(e.target.value)}
                    placeholder="Enter measured trip time (e.g., 25)"
                    className="bg-elec-dark border-elec-yellow/20 h-11"
                    min="0"
                    max="1000"
                    step="0.1"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the measured trip time from your RCD tester for compliance verification
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    onClick={calculateTripTime}
                    className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90 h-11"
                    disabled={!rcdRating || !testCurrent}
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Get Requirements
                  </Button>
                  <Button variant="outline" onClick={resetCalculator} className="h-11">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Results Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-elec-light">Results</h3>
                
                {maxTripTime !== null ? (
                  <div className="space-y-4">
                    {/* Primary Results */}
                    <Card className="border-success/30 bg-success/5">
                      <CardContent className="pt-4">
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                            <Badge variant="outline" className="text-sm font-medium w-fit">
                              {rcdRating} RCD - {testCurrent} Test
                            </Badge>
                            <Clock className="h-5 w-5 text-elec-yellow" />
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                              <span className="text-elec-light text-sm">Maximum Trip Time:</span>
                              <span className="font-mono text-elec-light font-bold text-2xl">
                                {maxTripTime}ms
                              </span>
                            </div>
                            
                            {testDescription && (
                              <div className="bg-elec-dark/30 p-3 rounded border border-elec-yellow/20">
                                <p className="text-xs text-elec-light">{testDescription}</p>
                              </div>
                            )}

                            {actualTripTime && isCompliant !== null && (
                              <>
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-t border-border pt-3">
                                  <span className="text-elec-light text-sm">Your Measured Time:</span>
                                  <span className="font-mono text-elec-light font-bold text-xl">
                                    {actualTripTime}ms
                                  </span>
                                </div>

                                <div className={`p-3 rounded border ${
                                  isCompliant 
                                    ? 'bg-green-500/20 border-green-500/40' 
                                    : 'bg-red-500/20 border-red-500/40'
                                }`}>
                                  <div className="flex items-center gap-2 mb-2">
                                    {isCompliant ? (
                                      <CheckCircle className="h-5 w-5 text-green-400" />
                                    ) : (
                                      <XCircle className="h-5 w-5 text-red-400" />
                                    )}
                                    <p className={`font-bold ${isCompliant ? 'text-green-300' : 'text-red-300'}`}>
                                      {isCompliant ? 'COMPLIANT' : 'NON-COMPLIANT'}
                                    </p>
                                  </div>
                                  <p className="text-xs text-elec-light">
                                    {isCompliant ? 
                                      'RCD trip time meets BS 7671 requirements' : 
                                      'RCD trip time exceeds maximum allowed time - investigation required'
                                    }
                                  </p>
                                  
                                  {riskLevel && (
                                    <div className="mt-3 pt-2 border-t border-border/50">
                                      <div className="flex items-center gap-2">
                                        <AlertTriangle className={`h-4 w-4 ${
                                          riskLevel === 'low' ? 'text-green-400' :
                                          riskLevel === 'medium' ? 'text-yellow-400' :
                                          riskLevel === 'high' ? 'text-orange-400' :
                                          'text-red-400'
                                        }`} />
                                        <span className="text-xs font-medium text-elec-light">
                                          Safety Margin: {
                                            riskLevel === 'low' ? 'Excellent' :
                                            riskLevel === 'medium' ? 'Good' :
                                            riskLevel === 'high' ? 'Minimal' :
                                            'Critical'
                                          }
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Standards Reference */}
                    <Card className="border-primary/30 bg-primary/5">
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <h4 className="text-elec-light font-semibold flex items-center gap-2 text-sm">
                            <BookOpen className="h-4 w-4" />
                            BS 7671 Testing Standards
                          </h4>
                          <div className="grid gap-2 text-xs">
                            <div className="bg-elec-dark/50 p-2 rounded">
                              <span className="text-blue-300 font-medium">30mA RCD:</span>
                              <span className="text-elec-light ml-2">1×IΔn ≤ 300ms, 5×IΔn ≤ 40ms</span>
                            </div>
                            <div className="bg-elec-dark/50 p-2 rounded">
                              <span className="text-blue-300 font-medium">100mA RCD:</span>
                              <span className="text-elec-light ml-2">1×IΔn ≤ 300ms, 5×IΔn ≤ 40ms</span>
                            </div>
                            <div className="bg-elec-dark/50 p-2 rounded">
                              <span className="text-blue-300 font-medium">300mA RCD:</span>
                              <span className="text-elec-light ml-2">1×IΔn ≤ 300ms, 5×IΔn ≤ 150ms</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Testing Note */}
                    <Card className="border-warning/30 bg-warning/5">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-warning mt-0.5" />
                          <div className="space-y-1">
                            <p className="text-warning font-medium text-sm">Testing Requirements</p>
                            <p className="text-xs text-elec-light">
                              Test at 1×IΔn and 5×IΔn. RCD should NOT trip at 0.5×IΔn. 
                              All tests must be conducted per BS 7671 requirements using calibrated test equipment.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Why This Matters */}
                    <WhyThisMatters
                      points={[
                        "Ensures RCD provides adequate protection against electric shock",
                        "Verifies automatic disconnection times meet safety requirements",
                        "Critical for compliance with BS 7671 and building regulations",
                        "Protects against fire caused by earth fault currents",
                        "Required for initial verification and periodic inspection"
                      ]}
                      className="mb-0"
                    />
                  </div>
                ) : (
                  <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                    <CardContent className="pt-4">
                      <div className="text-center text-elec-yellow/80">
                        <Clock className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm">Select RCD rating and test current to see trip time requirements</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="guidance">
            <div className="space-y-6">
              {/* Understanding RCD Testing */}
              <InfoBox
                title="Understanding RCD Trip Time Testing"
                icon={<Shield className="h-5 w-5 text-elec-yellow" />}
                as="section"
              >
                <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
                  <p>
                    RCD trip time testing verifies that residual current devices operate within the time limits 
                    specified in BS 7671, ensuring adequate protection against electric shock and fire.
                  </p>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                      <h5 className="text-blue-300 font-medium text-sm mb-2">1× Rated Current Test</h5>
                      <ul className="text-xs space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                          <span>Tests sensitivity at rated current</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                          <span>Maximum 300ms for all RCD ratings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                          <span>Ensures protection operates reliably</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                      <h5 className="text-green-300 font-medium text-sm mb-2">5× Rated Current Test</h5>
                      <ul className="text-xs space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                          <span>Tests fast disconnection capability</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                          <span>40ms for 30mA/100mA, 150ms for 300mA</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                          <span>Critical for shock protection</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-warning/10 border border-warning/30 rounded p-3">
                    <h5 className="text-warning font-medium text-sm mb-2">0.5× Rated Current Test</h5>
                    <p className="text-xs">
                      RCD must NOT trip at half rated current. This ensures the device doesn't 
                      cause nuisance tripping while maintaining adequate sensitivity.
                    </p>
                  </div>
                </div>
              </InfoBox>

              {/* Testing Procedures */}
              <InfoBox
                title="Testing Procedures & Best Practices"
                icon={<Zap className="h-5 w-5 text-elec-yellow" />}
                as="section"
              >
                <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
                  <div className="grid gap-4 lg:grid-cols-2">
                    <div>
                      <h5 className="text-elec-yellow font-medium mb-2">Equipment Required</h5>
                      <ul className="text-xs space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                          <span>Calibrated RCD tester (not test button)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                          <span>Proved voltage indicator</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                          <span>Appropriate PPE</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                          <span>Installation certificates/drawings</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-elec-yellow font-medium mb-2">Testing Sequence</h5>
                      <ol className="text-xs space-y-1 list-decimal list-inside">
                        <li>Verify RCD is energised and functional</li>
                        <li>Test at 0.5× rated current (should NOT trip)</li>
                        <li>Test at 1× rated current (record trip time)</li>
                        <li>Test at 5× rated current (record trip time)</li>
                        <li>Test mechanical operation using test button</li>
                        <li>Record all results on test certificate</li>
                      </ol>
                    </div>
                  </div>
                  
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                      <h6 className="text-green-300 font-medium text-xs mb-1">✓ Good Practice</h6>
                      <ul className="text-xs space-y-0.5">
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-0.5 h-0.5 bg-elec-yellow rounded-full"></span>
                          <span>Test during installation commissioning</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-0.5 h-0.5 bg-elec-yellow rounded-full"></span>
                          <span>Use calibrated test equipment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-0.5 h-0.5 bg-elec-yellow rounded-full"></span>
                          <span>Record environmental conditions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-0.5 h-0.5 bg-elec-yellow rounded-full"></span>
                          <span>Test both Line-Earth and Neutral-Earth</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                      <h6 className="text-red-300 font-medium text-xs mb-1">❌ Common Errors</h6>
                      <ul className="text-xs space-y-0.5">
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-0.5 h-0.5 bg-elec-yellow rounded-full"></span>
                          <span>Using RCD test button for formal testing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-0.5 h-0.5 bg-elec-yellow rounded-full"></span>
                          <span>Not testing at all required currents</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-0.5 h-0.5 bg-elec-yellow rounded-full"></span>
                          <span>Testing with uncalibrated equipment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-0.5 h-0.5 bg-elec-yellow rounded-full"></span>
                          <span>Ignoring failed test results</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </InfoBox>

              {/* Troubleshooting */}
              <InfoBox
                title="Troubleshooting RCD Test Failures"
                icon={<AlertTriangle className="h-5 w-5 text-elec-yellow" />}
                as="section"
              >
                <div className="space-y-4 text-elec-light text-sm sm:text-[0.95rem]">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <h5 className="text-red-300 font-medium mb-2">Trip Time Too Slow</h5>
                      <ul className="text-xs space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                          <span>Internal contacts may be deteriorating</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                          <span>Magnetic core may be contaminated</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                          <span>Temperature effects on electronics</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                          <span>RCD approaching end of service life</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-orange-300 font-medium mb-2">RCD Won't Trip</h5>
                      <ul className="text-xs space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                          <span>Check supply voltage is present</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                          <span>Verify correct test current selection</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                          <span>Internal mechanism may have failed</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                          <span>RCD requires immediate replacement</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-destructive/10 border border-destructive/30 rounded p-3">
                    <h6 className="text-destructive font-medium text-sm mb-2">Action Required for Failed Tests</h6>
                    <ul className="text-xs space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                        <span>Do not energise circuits protected by failed RCD</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                        <span>Replace RCD immediately if it fails to trip</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                        <span>Investigate cause before re-energising</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow mt-1 flex-shrink-0 w-1 h-1 bg-elec-yellow rounded-full"></span>
                        <span>Complete retest after replacement</span>
                      </li>
                    </ul>
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

export default RCDTripTimeCalculator;
