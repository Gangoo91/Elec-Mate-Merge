
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RotateCw, AlertTriangle, CheckCircle, XCircle, Info, Zap, Eye, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { usePhaseRotationCalculator } from "./phase-rotation/usePhaseRotationCalculator";

const PhaseRotationCalculator = () => {
  const {
    testMethod,
    l1ToL2,
    l2ToL3,
    l3ToL1,
    motorBehaviour,
    phaseRotationMeter,
    result,
    errors,
    setTestMethod,
    setL1ToL2,
    setL2ToL3,
    setL3ToL1,
    setMotorBehaviour,
    setPhaseRotationMeter,
    calculatePhaseSequence,
    resetCalculator,
    clearError
  } = usePhaseRotationCalculator();

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RotateCw className="h-5 w-5 text-elec-yellow" />
            <CardTitle>Enhanced Phase Rotation Calculator</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            BS 7671
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Determine correct phase sequence for three-phase motor connections and installations
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-elec-dark">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="guidance">Guidance</TabsTrigger>
            <TabsTrigger value="reference">Cable Colors</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-elec-yellow" />
                  <h3 className="text-lg font-semibold text-elec-yellow">Test Configuration</h3>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="test-method" className="flex items-center gap-2">
                    Select Testing Method
                    {errors.testMethod && <AlertCircle className="h-3 w-3 text-destructive" />}
                  </Label>
                  <Select 
                    value={testMethod} 
                    onValueChange={(value) => {
                      setTestMethod(value);
                      clearError('testMethod');
                    }}
                  >
                    <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                      <SelectValue placeholder="Choose test method" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
                      <SelectItem value="phase-rotation-meter">Phase Rotation Meter</SelectItem>
                      <SelectItem value="voltage-measurement">Voltage Measurement</SelectItem>
                      <SelectItem value="motor-behaviour">Motor Rotation Test</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.testMethod && (
                    <p className="text-xs text-destructive">{errors.testMethod}</p>
                  )}
                </div>

                {testMethod === "phase-rotation-meter" && (
                  <div className="space-y-4 p-4 border border-elec-yellow/20 rounded-lg">
                    <h4 className="font-medium text-elec-yellow">Phase Rotation Meter Reading</h4>
                    <div>
                      <Label htmlFor="phase-meter" className="flex items-center gap-2">
                        Meter Indication
                        {errors.phaseRotationMeter && <AlertCircle className="h-3 w-3 text-destructive" />}
                      </Label>
                      <Select 
                        value={phaseRotationMeter} 
                        onValueChange={(value) => {
                          setPhaseRotationMeter(value);
                          clearError('phaseRotationMeter');
                        }}
                      >
                        <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                          <SelectValue placeholder="Select meter reading" />
                        </SelectTrigger>
                        <SelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
                          <SelectItem value="l1-l2-l3">L1-L2-L3 (Clockwise)</SelectItem>
                          <SelectItem value="l1-l3-l2">L1-L3-L2 (Anti-clockwise)</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.phaseRotationMeter && (
                        <p className="text-xs text-destructive">{errors.phaseRotationMeter}</p>
                      )}
                    </div>
                  </div>
                )}

                {testMethod === "voltage-measurement" && (
                  <div className="space-y-4 p-4 border border-elec-yellow/20 rounded-lg">
                    <h4 className="font-medium text-elec-yellow">Line-to-Line Voltages</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <Label htmlFor="l1-l2" className="flex items-center gap-2">
                          L1 to L2 (V) - Brown to Black
                          {errors.voltage0 && <AlertCircle className="h-3 w-3 text-destructive" />}
                        </Label>
                        <Input
                          id="l1-l2"
                          type="number"
                          step="0.1"
                          value={l1ToL2}
                          onChange={(e) => {
                            setL1ToL2(e.target.value);
                            clearError('voltage0');
                          }}
                          className="bg-elec-dark border-elec-yellow/20"
                          placeholder="e.g. 400"
                        />
                        {errors.voltage0 && (
                          <p className="text-xs text-destructive mt-1">{errors.voltage0}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="l2-l3" className="flex items-center gap-2">
                          L2 to L3 (V) - Black to Grey
                          {errors.voltage1 && <AlertCircle className="h-3 w-3 text-destructive" />}
                        </Label>
                        <Input
                          id="l2-l3"
                          type="number"
                          step="0.1"
                          value={l2ToL3}
                          onChange={(e) => {
                            setL2ToL3(e.target.value);
                            clearError('voltage1');
                          }}
                          className="bg-elec-dark border-elec-yellow/20"
                          placeholder="e.g. 400"
                        />
                        {errors.voltage1 && (
                          <p className="text-xs text-destructive mt-1">{errors.voltage1}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="l3-l1" className="flex items-center gap-2">
                          L3 to L1 (V) - Grey to Brown
                          {errors.voltage2 && <AlertCircle className="h-3 w-3 text-destructive" />}
                        </Label>
                        <Input
                          id="l3-l1"
                          type="number"
                          step="0.1"
                          value={l3ToL1}
                          onChange={(e) => {
                            setL3ToL1(e.target.value);
                            clearError('voltage2');
                          }}
                          className="bg-elec-dark border-elec-yellow/20"
                          placeholder="e.g. 400"
                        />
                        {errors.voltage2 && (
                          <p className="text-xs text-destructive mt-1">{errors.voltage2}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {testMethod === "motor-behaviour" && (
                  <div className="space-y-4 p-4 border border-elec-yellow/20 rounded-lg">
                    <h4 className="font-medium text-elec-yellow">Motor Rotation Test</h4>
                    <div>
                      <Label htmlFor="motor-rotation" className="flex items-center gap-2">
                        Observed Motor Rotation
                        {errors.motorBehaviour && <AlertCircle className="h-3 w-3 text-destructive" />}
                      </Label>
                      <Select 
                        value={motorBehaviour} 
                        onValueChange={(value) => {
                          setMotorBehaviour(value);
                          clearError('motorBehaviour');
                        }}
                      >
                        <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                          <SelectValue placeholder="Select rotation direction" />
                        </SelectTrigger>
                        <SelectContent className="bg-elec-dark border-elec-yellow/20 z-50">
                          <SelectItem value="clockwise">Clockwise (Expected for standard motors)</SelectItem>
                          <SelectItem value="anticlockwise">Anti-clockwise (Reversed sequence)</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.motorBehaviour && (
                        <p className="text-xs text-destructive mt-1">{errors.motorBehaviour}</p>
                      )}
                    </div>
                    <Alert className="bg-amber-500/10 border-amber-500/30">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-amber-300">
                        <strong>Safety:</strong> Only use this method with a small test motor. Ensure proper isolation and PPE.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button 
                    onClick={calculatePhaseSequence}
                    className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                  >
                    <RotateCw className="h-4 w-4 mr-2" />
                    Analyse Phase Sequence
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={resetCalculator}
                    className="border-elec-yellow/20"
                  >
                    Reset
                  </Button>
                </div>
              </div>

              {/* Results Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-elec-yellow" />
                  <h3 className="text-lg font-semibold text-elec-yellow">Analysis Results</h3>
                </div>
                
                {result ? (
                  <div className="space-y-4">
                    {/* Main Result */}
                    <Card className={`border-2 ${result.isCorrect ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-2 mb-3">
                          {result.isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-400" />
                          )}
                          <span className={`font-semibold text-lg ${result.isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                            {result.sequence}
                          </span>
                        </div>
                        <p className={`text-sm mb-2 ${result.isCorrect ? 'text-green-200' : 'text-red-200'}`}>
                          {result.recommendation}
                        </p>
                        {result.balanceStatus && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            <strong>Balance Status:</strong> {result.balanceStatus}
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Detailed Analysis */}
                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-elec-dark/30 rounded-lg p-4">
                        <h4 className="font-medium text-elec-yellow mb-2">Motor Direction</h4>
                        <p className="text-sm text-muted-foreground">{result.motorDirection}</p>
                      </div>
                      
                      <div className="bg-elec-dark/30 rounded-lg p-4">
                        <h4 className="font-medium text-elec-yellow mb-2">Correction Method</h4>
                        <p className="text-sm text-muted-foreground">{result.correctionMethod}</p>
                      </div>
                    </div>

                    {/* Visual Representation */}
                    {result.visualRepresentation && (
                      <div className="bg-elec-dark/30 rounded-lg p-4">
                        <h4 className="font-medium text-elec-yellow mb-3">Phase Diagram</h4>
                        <div className="flex items-center justify-center">
                          <div className="relative w-32 h-32 border-2 border-elec-yellow/30 rounded-full">
                            {/* Phase vectors */}
                            <div 
                              className="absolute w-16 h-0.5 bg-amber-400 origin-left"
                              style={{ 
                                left: '50%', 
                                top: '50%',
                                transform: `rotate(${result.visualRepresentation.l1Phase}deg)`,
                                transformOrigin: '0 50%'
                              }}
                            />
                            <div 
                              className="absolute w-16 h-0.5 bg-slate-400 origin-left"
                              style={{ 
                                left: '50%', 
                                top: '50%',
                                transform: `rotate(${result.visualRepresentation.l2Phase}deg)`,
                                transformOrigin: '0 50%'
                              }}
                            />
                            <div 
                              className="absolute w-16 h-0.5 bg-gray-600 origin-left"
                              style={{ 
                                left: '50%', 
                                top: '50%',
                                transform: `rotate(${result.visualRepresentation.l3Phase}deg)`,
                                transformOrigin: '0 50%'
                              }}
                            />
                            
                            {/* Center dot */}
                            <div className="absolute w-2 h-2 bg-elec-yellow rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                            
                            {/* Rotation indicator */}
                            <div className={`absolute top-2 right-2 text-xs ${result.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                              {result.visualRepresentation.rotationDirection === 'clockwise' ? '↻' : '↺'}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 text-xs text-center space-y-1">
                          <div className="flex justify-center gap-4">
                            <span className="flex items-center gap-1">
                              <div className="w-3 h-0.5 bg-amber-400"></div>
                              L1 (Brown)
                            </span>
                            <span className="flex items-center gap-1">
                              <div className="w-3 h-0.5 bg-slate-400"></div>
                              L2 (Black)
                            </span>
                            <span className="flex items-center gap-1">
                              <div className="w-3 h-0.5 bg-gray-600"></div>
                              L3 (Grey)
                            </span>
                          </div>
                          <p className="text-muted-foreground">
                            Rotation: {result.visualRepresentation.rotationDirection}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Safety Information */}
                    <Alert className="bg-amber-500/10 border-amber-500/30">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-amber-300">
                        <div className="font-medium mb-2">Safety Checklist:</div>
                        <ul className="space-y-1 text-sm">
                          <li>• Isolate supply and prove dead before changes</li>
                          <li>• Use appropriate PPE and test equipment</li>
                          <li>• Follow lock-off/tag-out procedures</li>
                          <li>• Verify motor nameplate data before connection</li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </div>
                ) : (
                  <Card className="border-elec-yellow/20 bg-elec-dark/30">
                    <CardContent className="pt-6">
                      <div className="text-center text-muted-foreground">
                        <RotateCw className="h-12 w-12 mx-auto mb-3" />
                        <p>Select a test method and enter values to analyse phase sequence</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="guidance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-blue-500/30 bg-blue-500/5">
                <CardHeader>
                  <CardTitle className="text-blue-300 text-lg">What is Phase Rotation?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-blue-200">
                  <p>
                    Phase rotation (or phase sequence) is the order in which the three phases of a three-phase supply reach their peak values.
                  </p>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                    <h4 className="font-medium mb-2">Standard UK Sequence (Current)</h4>
                    <ul className="space-y-1 text-sm">
                      <li><strong>L1 → L2 → L3</strong> (Clockwise rotation)</li>
                      <li><strong>Brown → Black → Grey</strong> (Cable colours since 2004)</li>
                      <li>Creates clockwise rotating magnetic field</li>
                      <li>120° electrical separation between phases</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-500/30 bg-green-500/5">
                <CardHeader>
                  <CardTitle className="text-green-300 text-lg">Testing Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-green-200">
                  <div className="space-y-3">
                    <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                      <h4 className="font-medium mb-2">1. Phase Rotation Meter (Best)</h4>
                      <p className="text-sm">Dedicated instrument that directly indicates phase sequence. Most accurate method.</p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                      <h4 className="font-medium mb-2">2. Motor Test (Practical)</h4>
                      <p className="text-sm">Connect a small test motor and observe rotation direction. Simple but effective.</p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                      <h4 className="font-medium mb-2">3. Oscilloscope (Technical)</h4>
                      <p className="text-sm">Compare phase relationships using scope traces. Requires technical expertise.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-yellow-500/30 bg-yellow-500/5">
                <CardHeader>
                  <CardTitle className="text-yellow-300 text-lg">Critical Applications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-yellow-200">
                  <ul className="space-y-2 text-sm">
                    <li><strong>Water Pumps:</strong> Wrong direction = no flow or damage</li>
                    <li><strong>HVAC Fans:</strong> Affects airflow and system efficiency</li>
                    <li><strong>Conveyor Systems:</strong> Safety critical - wrong direction dangerous</li>
                    <li><strong>Elevators:</strong> Direction control essential for safety</li>
                    <li><strong>Industrial Mixers:</strong> Process quality depends on rotation</li>
                    <li><strong>Generator Synchronization:</strong> Must match grid sequence</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-500/30 bg-red-500/5">
                <CardHeader>
                  <CardTitle className="text-red-300 text-lg">Correction Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-red-200">
                  <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
                    <h4 className="font-medium mb-2">Simple Fix</h4>
                    <p className="text-sm mb-2">To reverse phase sequence:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Isolate the supply</strong> and prove dead</li>
                      <li>• Swap ANY two phases (commonly L2 and L3)</li>
                      <li>• Most accessible at motor terminal box</li>
                      <li>• Never swap all three phases</li>
                      <li>• Re-energize and test rotation</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reference" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-green-500/30 bg-green-500/5">
                <CardHeader>
                  <CardTitle className="text-green-300 text-lg">Current UK Cable Colours (2004-Present)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 bg-green-500/10 rounded">
                      <div className="w-4 h-4 bg-amber-600 rounded"></div>
                      <span className="font-medium">L1 - Brown</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-green-500/10 rounded">
                      <div className="w-4 h-4 bg-gray-900 rounded"></div>
                      <span className="font-medium">L2 - Black</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-green-500/10 rounded">
                      <div className="w-4 h-4 bg-gray-500 rounded"></div>
                      <span className="font-medium">L3 - Grey</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-green-500/10 rounded">
                      <div className="w-4 h-4 bg-blue-600 rounded"></div>
                      <span className="font-medium">N - Blue</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-green-500/10 rounded">
                      <div className="w-4 h-4 bg-yellow-400 border border-green-600 rounded"></div>
                      <span className="font-medium">E - Green/Yellow</span>
                    </div>
                  </div>
                  <Alert className="bg-green-500/10 border-green-500/30">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription className="text-green-300">
                      <strong>Current Standard:</strong> BS 7671:2018 harmonized European colours. Used since 31st March 2004.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card className="border-amber-500/30 bg-amber-500/5">
                <CardHeader>
                  <CardTitle className="text-amber-300 text-lg">Old UK Cable Colours (Pre-2004)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 bg-amber-500/10 rounded">
                      <div className="w-4 h-4 bg-red-600 rounded"></div>
                      <span className="font-medium">L1 - Red</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-amber-500/10 rounded">
                      <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                      <span className="font-medium">L2 - Yellow</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-amber-500/10 rounded">
                      <div className="w-4 h-4 bg-blue-600 rounded"></div>
                      <span className="font-medium">L3 - Blue</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-amber-500/10 rounded">
                      <div className="w-4 h-4 bg-gray-900 rounded"></div>
                      <span className="font-medium">N - Black</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-amber-500/10 rounded">
                      <div className="w-4 h-4 bg-green-600 rounded"></div>
                      <span className="font-medium">E - Green</span>
                    </div>
                  </div>
                  <Alert className="bg-amber-500/10 border-amber-500/30">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-amber-300">
                      <strong>Discontinued:</strong> Old colours may still be found in installations predating March 2004. Check carefully!
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card className="border-blue-500/30 bg-blue-500/5 md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-blue-300 text-lg">Important Transition Notes</CardTitle>
                </CardHeader>
                <CardContent className="text-blue-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-blue-300">Changeover Period (2004-2006)</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Both colour systems coexisted</li>
                        <li>• Mixing of colours was prohibited</li>
                        <li>• Clear labelling was mandatory</li>
                        <li>• Phase rotation remained L1-L2-L3</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-blue-300">Testing Considerations</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Always verify colours before assuming sequence</li>
                        <li>• Old installations may not match expectations</li>
                        <li>• Use proper phase rotation testing methods</li>
                        <li>• Document any non-standard arrangements</li>
                      </ul>
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

export default PhaseRotationCalculator;
