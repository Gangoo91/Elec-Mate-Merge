import { ArrowLeft, ArrowRight, Wrench, Gauge, Activity, Book, CheckCircle2, Brain, Target, Zap, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import InstrumentationQuiz from '@/components/upskilling/quiz/InstrumentationQuiz';

const InstrumentationModule7Section6 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
        <Link to="../instrumentation-module-7">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        
        <div className="space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Wrench className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Loop Testing Tools (Loop Calibrators, Simulators, Multimeters)
                </h1>
                <p className="text-xl text-gray-400">
                  Module 7, Section 6
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 7.6
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                30 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Book className="h-5 w-5 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Testing ensures loops function as intended before and during operation. Proper testing validates 
                signal accuracy, loop integrity, and system performance whilst providing confidence in measurement 
                reliability. This section covers the essential tools and techniques used to commission, maintain, 
                and troubleshoot 4-20mA current loops.
              </p>
              <p>
                Understanding how to use loop calibrators, signal simulators, and multimeters effectively enables 
                rapid fault diagnosis and system verification, reducing downtime and ensuring accurate process 
                measurements throughout the system lifecycle.
              </p>
            </CardContent>
          </Card>

          {/* Learning Objectives */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Identify tools for testing 4-20mA loops and their specific applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Understand how to simulate and measure signals accurately</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Learn how to validate loop functionality during commissioning</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Master best practices for zero checks, span checks, and integrity testing</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Loop Calibrators */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Gauge className="h-5 w-5 text-yellow-400" />
                Loop Calibrators and Process Signal Testing
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Understanding Loop Calibrator Functions</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Source Functions (Simulate Transmitter)</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Current Output:</strong> Generate precise 4-20mA signals</li>
                    <li>• <strong>Voltage Output:</strong> 1-5V, 0-10V, and custom ranges</li>
                    <li>• <strong>Resistance Simulation:</strong> RTD and thermocouple values</li>
                    <li>• <strong>Pressure Simulation:</strong> Generate calibrated pressure steps</li>
                    <li>• <strong>Process Units:</strong> Display in engineering units</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Measure Functions (Test Receivers)</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Current Measurement:</strong> 4-20mA with high accuracy</li>
                    <li>• <strong>Voltage Measurement:</strong> Loop supply and signal voltages</li>
                    <li>• <strong>24V Loop Supply:</strong> Power externally powered devices</li>
                    <li>• <strong>Pressure Measurement:</strong> Direct pressure input capability</li>
                    <li>• <strong>Frequency/Pulse:</strong> Digital signal testing</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="text-white font-semibold mb-2">Advanced Calibrator Features</h5>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h6 className="text-yellow-400 font-semibold text-sm mb-2">Automated Testing</h6>
                    <ul className="text-xs space-y-1">
                      <li>• Automatic step testing sequences</li>
                      <li>• As-found and as-left documentation</li>
                      <li>• Pass/fail criteria and tolerance checking</li>
                      <li>• Data logging and certificate generation</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h6 className="text-yellow-400 font-semibold text-sm mb-2">Communication Protocols</h6>
                    <ul className="text-xs space-y-1">
                      <li>• HART communication capability</li>
                      <li>• Foundation Fieldbus testing</li>
                      <li>• Profibus PA diagnostics</li>
                      <li>• Device configuration and setup</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <h6 className="text-yellow-400 font-semibold text-sm mb-2">Safety Features</h6>
                    <ul className="text-xs space-y-1">
                      <li>• Intrinsically safe rated versions</li>
                      <li>• Overload protection on all inputs</li>
                      <li>• Isolation between measurement circuits</li>
                      <li>• Low battery indicators and warnings</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="text-white font-semibold mb-2">Typical Calibrator Specifications</h5>
                <div className="bg-card p-3 rounded border border-gray-600">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Accuracy Specifications</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Current:</strong> ±0.02% of reading + 2μA</li>
                        <li>• <strong>Voltage:</strong> ±0.01% of reading + 10μV</li>
                        <li>• <strong>Pressure:</strong> ±0.05% of full scale</li>
                        <li>• <strong>Temperature:</strong> ±0.5°C typical</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Operating Parameters</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Temperature Range:</strong> -10°C to +50°C</li>
                        <li>• <strong>Battery Life:</strong> 8-16 hours continuous use</li>
                        <li>• <strong>Display Resolution:</strong> 5-6 digit display</li>
                        <li>• <strong>Update Rate:</strong> 2-4 readings per second</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Multimeters and Signal Measurement */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-yellow-400" />
                Multimeters and Signal Measurement Techniques
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Using Multimeters for Loop Testing</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Current Measurement Techniques</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Series Current Measurement</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Break Loop:</strong> Insert meter in series with signal</li>
                        <li>• <strong>Burden Voltage:</strong> Consider meter voltage drop</li>
                        <li>• <strong>Range Selection:</strong> Use 20mA or 200mA range</li>
                        <li>• <strong>Auto-ranging:</strong> Be aware of range switching delays</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Clamp-on Current Measurement</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Non-intrusive:</strong> No loop interruption required</li>
                        <li>• <strong>Single Conductor:</strong> Separate supply and return wires</li>
                        <li>• <strong>AC/DC Capability:</strong> Use true RMS clamp meters</li>
                        <li>• <strong>Resolution Limits:</strong> Typically ±0.1mA best case</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Voltage and Resistance Measurements</h5>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Supply Voltage</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Measure across power supply terminals</li>
                        <li>• Check under load conditions</li>
                        <li>• Verify polarity and stability</li>
                        <li>• Monitor for ripple content</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Loop Resistance</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Power down before resistance tests</li>
                        <li>• Measure total loop resistance</li>
                        <li>• Check individual cable sections</li>
                        <li>• Verify termination integrity</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Insulation Testing</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Use dedicated insulation tester</li>
                        <li>• Test at 500V or 1000V DC</li>
                        <li>• Check core-to-core and core-to-earth</li>
                        <li>• Document readings and trends</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Signal Simulators */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Signal Simulators and Loop Validation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Creating Known Current Values for Testing</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Signal Simulator Applications</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Receiver Testing</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Accuracy Verification:</strong> Test input scaling and linearisation</li>
                        <li>• <strong>Alarm Testing:</strong> Verify high/low alarm setpoints</li>
                        <li>• <strong>Display Calibration:</strong> Check indication accuracy</li>
                        <li>• <strong>Recording Verification:</strong> Validate data logging systems</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Control System Testing</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>PLC/DCS Inputs:</strong> Test analog input modules</li>
                        <li>• <strong>Control Algorithm:</strong> Verify control loop response</li>
                        <li>• <strong>Safety System:</strong> Test safety logic and interlocks</li>
                        <li>• <strong>HMI Verification:</strong> Check operator interface displays</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Testing Procedures and Best Practices</h5>
                  <div className="bg-card p-4 rounded border border-gray-600">
                    <h6 className="text-yellow-400 font-semibold text-sm mb-2">Standard Test Sequence</h6>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-1">1. Zero Check (4mA Test)</p>
                        <ul className="text-xs space-y-1 ml-4">
                          <li>• Apply exactly 4.000mA signal</li>
                          <li>• Verify receiver shows minimum scale value</li>
                          <li>• Record as-found and as-left readings</li>
                          <li>• Adjust zero if outside tolerance (typically ±0.25%)</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-1">2. Span Check (20mA Test)</p>
                        <ul className="text-xs space-y-1 ml-4">
                          <li>• Apply exactly 20.000mA signal</li>
                          <li>• Verify receiver shows maximum scale value</li>
                          <li>• Calculate span error percentage</li>
                          <li>• Adjust span if outside tolerance</li>
                        </ul>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-1">3. Mid-Scale Verification (12mA Test)</p>
                        <ul className="text-xs space-y-1 ml-4">
                          <li>• Apply exactly 12.000mA signal (50% of span)</li>
                          <li>• Verify receiver shows mid-scale value</li>
                          <li>• Check linearity across the range</li>
                          <li>• Document any non-linearity issues</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Advanced Testing Techniques</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Dynamic Response Testing</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Step Response:</strong> Apply step changes and measure response time</li>
                        <li>• <strong>Ramp Testing:</strong> Slow continuous changes to test hysteresis</li>
                        <li>• <strong>Repeatability:</strong> Multiple measurements at same point</li>
                        <li>• <strong>Drift Testing:</strong> Long-term stability measurements</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Environmental Testing</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Temperature Effects:</strong> Test at operating temperature extremes</li>
                        <li>• <strong>Vibration Testing:</strong> Check performance under mechanical stress</li>
                        <li>• <strong>EMI Susceptibility:</strong> Test near high-power electrical equipment</li>
                        <li>• <strong>Power Supply Variation:</strong> Test at voltage limits</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loop Troubleshooting */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-yellow-400" />
                Loop Troubleshooting and Validation Procedures
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Systematic Approach to Loop Testing</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Pre-Testing Verification</h5>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Documentation Review:</strong> Check loop drawings and device specifications</li>
                      <li>• <strong>Safety Assessment:</strong> Verify safe isolation and permit requirements</li>
                      <li>• <strong>Visual Inspection:</strong> Check connections, cable condition, and terminations</li>
                      <li>• <strong>Power Supply Check:</strong> Verify correct voltage and polarity</li>
                      <li>• <strong>Continuity Test:</strong> Confirm complete circuit before applying power</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Functional Testing Sequence</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Transmitter Testing</h6>
                      <ol className="text-sm space-y-1 list-decimal list-inside">
                        <li>Apply known input (pressure, temperature, etc.)</li>
                        <li>Measure output current with calibrator</li>
                        <li>Verify current matches expected value</li>
                        <li>Test at 0%, 25%, 50%, 75%, 100% of range</li>
                        <li>Check response time and stability</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Receiver Testing</h6>
                      <ol className="text-sm space-y-1 list-decimal list-inside">
                        <li>Inject known current with simulator</li>
                        <li>Read displayed/recorded value</li>
                        <li>Calculate accuracy percentage</li>
                        <li>Test alarm setpoints and functions</li>
                        <li>Verify data communication if applicable</li>
                      </ol>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Wiring Integrity Verification</h5>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h6 className="text-yellow-400 font-semibold text-sm mb-2">Continuity Testing</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Test with power removed</li>
                        <li>• Check end-to-end continuity</li>
                        <li>• Verify no short circuits</li>
                        <li>• Test shield continuity and isolation</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h6 className="text-yellow-400 font-semibold text-sm mb-2">Insulation Testing</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Use 500V or 1000V DC tester</li>
                        <li>• Test core-to-core resistance</li>
                        <li>• Test core-to-shield/earth</li>
                        <li>• Minimum 1MΩ resistance required</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card p-3 rounded border border-gray-600">
                      <h6 className="text-yellow-400 font-semibold text-sm mb-2">Voltage Drop Testing</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Measure at 20mA current</li>
                        <li>• Check cable voltage drop</li>
                        <li>• Verify adequate compliance voltage</li>
                        <li>• Document actual vs. calculated values</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Scenario */}
          <Card className="bg-gradient-to-r from-elec-gray to-elec-dark border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-yellow-400" />
                Real World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <p className="font-semibold text-yellow-400">
                Commissioning Engineer Validates Control System Before Startup
              </p>
              <p>
                A site engineer uses a loop calibrator to inject a 12mA signal and verify that a controller 
                displays the correct value before commissioning a new reactor temperature control loop. 
                The system must pass functional testing before being released to operations.
              </p>
              <div className="bg-card p-3 rounded border border-gray-600">
                <h5 className="text-yellow-400 font-semibold text-sm mb-2">Test Setup:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Temperature transmitter: RTD input, 0-200°C range, 4-20mA output</li>
                  <li>• DCS analog input: 250Ω load, 0.1% accuracy specification</li>
                  <li>• Cable run: 150m multicore with shield</li>
                  <li>• Expected reading at 12mA: 100°C (mid-scale)</li>
                </ul>
              </div>
              <div className="bg-yellow-900/20 p-3 rounded border border-yellow-600/30">
                <h5 className="text-yellow-400 font-semibold text-sm mb-2">Testing Procedure:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Disconnect transmitter and connect loop calibrator</li>
                  <li>• Set calibrator to source exactly 12.000mA</li>
                  <li>• Read DCS display: shows 100.2°C (within ±0.25% tolerance)</li>
                  <li>• Test full range: 4mA = 0.1°C, 20mA = 199.8°C ✓</li>
                  <li>• Test alarms: HH at 180°C, LL at 10°C - both trigger correctly</li>
                </ul>
              </div>
              <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                <h5 className="text-green-400 font-semibold text-sm mb-2">Results and Benefits:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Loop accuracy confirmed within specification limits</li>
                  <li>• Control algorithm and safety interlocks validated</li>
                  <li>• Documentation completed with calibration certificate</li>
                  <li>• Confident handover to operations team</li>
                  <li>• No measurement issues since commissioning 6 months ago</li>
                </ul>
              </div>
              <p className="text-sm italic text-green-400">
                Result: Systematic testing with proper tools ensures reliable operation and prevents 
                costly startup delays. The loop calibrator provided confidence in system accuracy 
                before the critical reactor was put into service.
              </p>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Testing with the right tools ensures reliability, accuracy, and faster fault diagnosis 
                during setup or maintenance. Loop calibrators, signal simulators, and multimeters provide 
                the foundation for systematic testing that validates loop performance and builds confidence 
                in measurement systems throughout their operational life.
              </p>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <InstrumentationQuiz 
            questions={[
              {
                id: 1,
                question: "What current should a loop simulator generate to simulate 50% signal?",
                options: [
                  "10.000mA",
                  "12.000mA - midway between 4mA (0%) and 20mA (100%)",
                  "16.000mA",
                  "8.000mA"
                ],
                correctAnswer: 1,
                explanation: "For 50% of a 4-20mA signal: 50% of (20-4) = 8mA, plus the 4mA offset = 12mA. This represents the exact midpoint of the measurement range."
              },
              {
                id: 2,
                question: "What's one key benefit of using a loop calibrator?",
                options: [
                  "It reduces cable costs",
                  "Provides precise current source and measurement capability for accurate loop testing and commissioning",
                  "It increases signal strength automatically",
                  "It eliminates the need for documentation"
                ],
                correctAnswer: 1,
                explanation: "Loop calibrators provide precise current sources and measurement capabilities, enabling accurate testing, commissioning, and troubleshooting of 4-20mA loops with traceable accuracy."
              },
              {
                id: 3,
                question: "How can you test a transmitter with a multimeter?",
                options: [
                  "Only by checking the power supply voltage",
                  "Measure the output current in series with the loop while applying a known input to the transmitter",
                  "Test the cable resistance only",
                  "Check the device nameplate information"
                ],
                correctAnswer: 1,
                explanation: "To test a transmitter with a multimeter, measure the output current by connecting the meter in series with the loop while applying a known input (pressure, temperature, etc.) to verify proper current output."
              },
              {
                id: 4,
                question: "What's the typical voltage range for a powered 4-20mA loop?",
                options: [
                  "12VDC",
                  "24VDC ±10% (21.6V to 26.4V) for reliable transmitter operation",
                  "48VDC",
                  "5VDC"
                ],
                correctAnswer: 1,
                explanation: "The industry standard for 4-20mA loops is 24VDC ±10%, providing a range of 21.6V to 26.4V to ensure adequate compliance voltage for proper transmitter operation across the full current range."
              },
              {
                id: 5,
                question: "Why is signal simulation useful during commissioning?",
                options: [
                  "It reduces equipment costs",
                  "Allows testing of receivers and control systems with known, precise signals before connecting actual transmitters",
                  "It eliminates the need for calibration",
                  "It automatically configures all devices"
                ],
                correctAnswer: 1,
                explanation: "Signal simulation allows systematic testing of receivers and control systems with known, precise current values, enabling verification of accuracy, scaling, and alarm functions before connecting actual transmitters."
              }
            ]}
            title="Section 6 Knowledge Check"
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../instrumentation-module-7-section-5">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../instrumentation-module-7-section-7">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule7Section6;