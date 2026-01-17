import { ArrowLeft, ArrowRight, Calculator, Book, CheckCircle2, Zap, AlertTriangle, Brain, Target, TrendingUp, Settings, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import InstrumentationQuiz from '@/components/upskilling/quiz/InstrumentationQuiz';

const InstrumentationModule7Section3 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div className="px-8 pt-8 pb-12">
        <Link to="/study-centre/upskilling/instrumentation-module-7">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        
        <div className="space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Calculator className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Loop Design and Load Calculations
                </h1>
                <p className="text-xl text-gray-400">
                  Module 7, Section 3
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 7.3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                20 minutes
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
                Designing an instrumentation loop requires understanding power supply characteristics, 
                voltage drops, and load calculations. Proper loop design ensures reliable signal 
                transmission and prevents operational failures due to insufficient power or excessive resistance.
              </p>
              <p>
                This section provides the mathematical foundation and practical guidelines for designing 
                4-20mA loops that operate reliably across their full range, considering all components 
                and environmental factors that affect loop performance.
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
                  <span>Learn how to calculate loop loads and voltage drops</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Understand the role of loop resistance in system design</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Apply design rules to ensure functional loops</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Master power supply requirements and compliance voltage calculations</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Calculating Voltage Drop */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Calculating Voltage Drop Across Loop Devices
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Fundamental Voltage Drop Calculations</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Basic Loop Circuit Analysis</h5>
                  <p className="text-sm mb-2">
                    Using Ohm's Law (V = I × R) to calculate voltage drops across each loop component:
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Transmitter Drop:</strong> V_tx = I_loop × R_transmitter</li>
                    <li>• <strong>Cable Drop:</strong> V_cable = I_loop × R_cable</li>
                    <li>• <strong>Receiver Drop:</strong> V_rx = I_loop × R_receiver</li>
                    <li>• <strong>Total Drop:</strong> V_total = V_tx + V_cable + V_rx</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Current-Dependent Calculations</h5>
                  <p className="text-sm mb-2">
                    Voltage drops vary with loop current (4-20mA range):
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>At 4mA:</strong> V_drop = 0.004A × R_total</li>
                    <li>• <strong>At 12mA:</strong> V_drop = 0.012A × R_total</li>
                    <li>• <strong>At 20mA:</strong> V_drop = 0.020A × R_total</li>
                    <li>• <strong>Worst Case:</strong> Maximum current (20mA) determines design</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="text-white font-semibold mb-2">Practical Calculation Example</h5>
                <div className="bg-card p-4 rounded border border-gray-600">
                  <p className="text-sm mb-2">
                    <strong>Example Loop Components:</strong>
                  </p>
                  <ul className="text-sm space-y-1 mb-3">
                    <li>• Transmitter resistance: 250Ω</li>
                    <li>• Cable resistance (300m × 2 × 0.017Ω/m): 10.2Ω</li>
                    <li>• Receiver resistance: 250Ω</li>
                    <li>• Total loop resistance: 510.2Ω</li>
                  </ul>
                  <p className="text-sm mb-2">
                    <strong>Voltage drops at 20mA:</strong>
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Transmitter: 20mA × 250Ω = 5.0V</li>
                    <li>• Cable: 20mA × 10.2Ω = 0.204V</li>
                    <li>• Receiver: 20mA × 250Ω = 5.0V</li>
                    <li>• <strong>Total voltage drop: 10.204V</strong></li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Maximum Loop Resistance */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-yellow-400" />
                Maximum Loop Resistance and Compliance Voltage
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Understanding Compliance Voltage</h4>
              
              <p className="mb-4">
                Compliance voltage is the minimum voltage required across a transmitter for proper 
                operation. This determines the maximum allowable loop resistance.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Compliance Voltage Calculation</h5>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <p className="text-sm mb-2">
                      <strong>Formula:</strong> R_max = (V_supply - V_compliance) / I_max
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>V_supply:</strong> Power supply voltage (typically 24VDC)</li>
                      <li>• <strong>V_compliance:</strong> Minimum transmitter operating voltage</li>
                      <li>• <strong>I_max:</strong> Maximum loop current (20mA)</li>
                      <li>• <strong>R_max:</strong> Maximum total loop resistance</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Typical Compliance Voltages</h5>
                  <div className="grid md:grid-cols-3 gap-4">
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Basic Transmitters:</strong> 8-12V</li>
                      <li>• <strong>Smart Transmitters:</strong> 10.5-16V</li>
                      <li>• <strong>HART Devices:</strong> 11-16V</li>
                    </ul>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Display Units:</strong> 12-18V</li>
                      <li>• <strong>Isolators:</strong> 8-12V</li>
                      <li>• <strong>Barriers:</strong> 7-9V</li>
                    </ul>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Safety Factor:</strong> Add 2-3V margin</li>
                      <li>• <strong>Temperature Effects:</strong> Consider drift</li>
                      <li>• <strong>Aging Components:</strong> Allow degradation</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Design Examples</h5>
                  <div className="space-y-3">
                    <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                      <h6 className="text-green-400 font-semibold text-sm mb-1">Example 1: Basic Loop</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Supply: 24VDC, Compliance: 12V</li>
                        <li>• R_max = (24V - 12V) / 0.02A = 600Ω</li>
                        <li>• Available for cable and receiver: 600Ω - 250Ω = 350Ω</li>
                      </ul>
                    </div>
                    
                    <div className="bg-yellow-900/20 p-3 rounded border border-yellow-600/30">
                      <h6 className="text-yellow-400 font-semibold text-sm mb-1">Example 2: Smart Transmitter</h6>
                      <ul className="text-xs space-y-1">
                        <li>• Supply: 24VDC, Compliance: 16V</li>
                        <li>• R_max = (24V - 16V) / 0.02A = 400Ω</li>
                        <li>• Reduced capacity due to higher compliance requirement</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Power Supply Requirements */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-yellow-400" />
                Power Supply Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Power Supply Selection and Sizing</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-white font-semibold mb-2">Voltage Requirements</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Standard Voltage:</strong> 24VDC ±10%</li>
                      <li>• <strong>Minimum Operating:</strong> 21.6VDC</li>
                      <li>• <strong>Maximum Operating:</strong> 26.4VDC</li>
                      <li>• <strong>Regulation:</strong> ±0.1% line and load regulation</li>
                      <li>• <strong>Ripple:</strong> &lt;50mV peak-to-peak</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-2">Current Capability</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Per Loop:</strong> Minimum 25mA continuous</li>
                      <li>• <strong>Safety Margin:</strong> 125% of maximum current</li>
                      <li>• <strong>Multiple Loops:</strong> Sum of all loop currents</li>
                      <li>• <strong>Startup Current:</strong> Consider inrush requirements</li>
                      <li>• <strong>Short Circuit:</strong> Current limiting protection</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-white font-semibold mb-2">Protection Features</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Overcurrent:</strong> Electronic current limiting</li>
                      <li>• <strong>Overvoltage:</strong> Crowbar or clamp protection</li>
                      <li>• <strong>Reverse Polarity:</strong> Diode or electronic protection</li>
                      <li>• <strong>Isolation:</strong> 1500VAC minimum input/output</li>
                      <li>• <strong>EMC Compliance:</strong> EN 61000 standards</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-2">Environmental Considerations</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Temperature Range:</strong> -20°C to +60°C operation</li>
                      <li>• <strong>Humidity:</strong> 5-95% RH non-condensing</li>
                      <li>• <strong>Altitude:</strong> Up to 2000m standard</li>
                      <li>• <strong>Vibration:</strong> IEC 60068-2-6 compliance</li>
                      <li>• <strong>Enclosure Rating:</strong> IP20 minimum for panels</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="text-white font-semibold mb-2">Power Budget Calculation</h5>
                <div className="bg-card p-3 rounded border border-gray-600">
                  <p className="text-sm mb-2">
                    <strong>Total Power Requirement:</strong>
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• P_total = V_supply × (Number of loops × I_max)</li>
                    <li>• Example: 24V × (8 loops × 25mA) = 24V × 0.2A = 4.8W</li>
                    <li>• Safety factor: 4.8W × 1.25 = 6W minimum supply rating</li>
                    <li>• Consider efficiency: 6W / 0.85 = 7.1W input power required</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Design Examples */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-yellow-400" />
                Design Examples with Load Resistors and Instrumentation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Comprehensive Design Examples</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Example 1: Simple Pressure Loop</h5>
                  <div className="bg-card p-4 rounded border border-gray-600">
                    <p className="text-sm mb-2"><strong>Requirements:</strong></p>
                    <ul className="text-sm space-y-1 mb-3">
                      <li>• Pressure transmitter: 0-10 bar, 4-20mA output</li>
                      <li>• Cable run: 150 metres</li>
                      <li>• PLC analog input: 250Ω load</li>
                      <li>• Power supply: 24VDC</li>
                    </ul>
                    
                    <p className="text-sm mb-2"><strong>Calculations:</strong></p>
                    <ul className="text-sm space-y-1 mb-3">
                      <li>• Transmitter compliance: 12V</li>
                      <li>• Cable resistance: 150m × 2 × 0.017Ω/m = 5.1Ω</li>
                      <li>• PLC input resistance: 250Ω</li>
                      <li>• Total external resistance: 5.1Ω + 250Ω = 255.1Ω</li>
                    </ul>
                    
                    <p className="text-sm mb-2"><strong>Verification:</strong></p>
                    <ul className="text-sm space-y-1">
                      <li>• Voltage available for loop: 24V - 12V = 12V</li>
                      <li>• Maximum resistance: 12V / 0.02A = 600Ω</li>
                      <li>• Actual resistance: 255.1Ω ✓ (Well within limits)</li>
                      <li>• Safety margin: (600 - 255.1) / 600 = 57.5% ✓</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Example 2: Multi-Drop Configuration</h5>
                  <div className="bg-card p-4 rounded border border-gray-600">
                    <p className="text-sm mb-2"><strong>Requirements:</strong></p>
                    <ul className="text-sm space-y-1 mb-3">
                      <li>• Temperature transmitter with HART capability</li>
                      <li>• Three receivers: PLC (250Ω), Indicator (500Ω), Recorder (1kΩ)</li>
                      <li>• Cable run: 200 metres</li>
                      <li>• All receivers in parallel</li>
                    </ul>
                    
                    <p className="text-sm mb-2"><strong>Calculations:</strong></p>
                    <ul className="text-sm space-y-1 mb-3">
                      <li>• Transmitter compliance: 16V (HART device)</li>
                      <li>• Cable resistance: 200m × 2 × 0.017Ω/m = 6.8Ω</li>
                      <li>• Parallel receiver resistance: 1/(1/250 + 1/500 + 1/1000) = 142.9Ω</li>
                      <li>• Total external resistance: 6.8Ω + 142.9Ω = 149.7Ω</li>
                    </ul>
                    
                    <p className="text-sm mb-2"><strong>Verification:</strong></p>
                    <ul className="text-sm space-y-1">
                      <li>• Voltage available: 24V - 16V = 8V</li>
                      <li>• Maximum resistance: 8V / 0.02A = 400Ω</li>
                      <li>• Actual resistance: 149.7Ω ✓</li>
                      <li>• Safety margin: (400 - 149.7) / 400 = 62.6% ✓</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Example 3: Load Resistor Application</h5>
                  <div className="bg-card p-4 rounded border border-gray-600">
                    <p className="text-sm mb-2"><strong>Scenario:</strong></p>
                    <ul className="text-sm space-y-1 mb-3">
                      <li>• Externally powered transmitter (4-wire)</li>
                      <li>• High impedance voltmeter input (&gt;1MΩ)</li>
                      <li>• Need current-to-voltage conversion</li>
                      <li>• Require 1-5V output for data logger</li>
                    </ul>
                    
                    <p className="text-sm mb-2"><strong>Load Resistor Calculation:</strong></p>
                    <ul className="text-sm space-y-1">
                      <li>• Required voltage range: 1-5V</li>
                      <li>• Current range: 4-20mA</li>
                      <li>• Load resistance: R = ΔV / ΔI = (5V-1V) / (20mA-4mA) = 250Ω</li>
                      <li>• Standard value: 250Ω, 0.1% precision resistor</li>
                      <li>• Power rating: P = I²R = (0.02A)² × 250Ω = 0.1W (use 0.25W)</li>
                    </ul>
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
                Control Engineer Adds New Transmitter to Existing Loop
              </p>
              <p>
                A control engineer needs to add a new flow transmitter to an existing process control 
                system. The existing loop already has a temperature transmitter and pressure transmitter 
                on separate loops, but space in the control panel is limited, requiring the new transmitter 
                to share an existing power supply.
              </p>
              <div className="bg-card p-3 rounded border border-gray-600">
                <h5 className="text-yellow-400 font-semibold text-sm mb-2">Existing System:</h5>
                <ul className="text-sm space-y-1">
                  <li>• 24VDC power supply: 100W capacity, currently loaded to 60W</li>
                  <li>• Temperature loop: 250m cable run, drawing 15mA</li>
                  <li>• Pressure loop: 180m cable run, drawing 18mA</li>
                  <li>• Available supply capacity: 40W remaining</li>
                </ul>
              </div>
              <div className="bg-yellow-900/20 p-3 rounded border border-yellow-600/30">
                <h5 className="text-yellow-400 font-semibold text-sm mb-2">New Transmitter Requirements:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Smart flow transmitter with HART: 16V compliance voltage</li>
                  <li>• Cable run required: 320m to remote location</li>
                  <li>• PLC input load: 250Ω resistance</li>
                  <li>• Cable specification: 1.5mm² copper conductors</li>
                </ul>
              </div>
              <div className="bg-red-900/20 p-3 rounded border border-red-600/30">
                <h5 className="text-red-400 font-semibold text-sm mb-2">Initial Calculation Problem:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Cable resistance: 320m × 2 × 0.011Ω/m = 7.04Ω (1.5mm² cable)</li>
                  <li>• Total resistance: 7.04Ω + 250Ω = 257.04Ω</li>
                  <li>• Available voltage: 24V - 16V = 8V</li>
                  <li>• Maximum resistance: 8V / 0.02A = 400Ω ✓</li>
                  <li>• <strong>Power budget check: 24V × 0.02A = 0.48W ✓</strong></li>
                </ul>
              </div>
              <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                <h5 className="text-green-400 font-semibold text-sm mb-2">Successful Implementation:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Loop resistance within acceptable limits (257Ω &lt; 400Ω)</li>
                  <li>• Power budget adequate (0.48W available from 40W remaining)</li>
                  <li>• Safety margin: (400 - 257) / 400 = 35.7% ✓</li>
                  <li>• System operates reliably across full 4-20mA range</li>
                  <li>• HART communication functions properly</li>
                </ul>
              </div>
              <p className="text-sm italic text-green-400">
                Result: Proper load calculations prevented system failure and ensured reliable operation 
                of the new transmitter without compromising existing loops or requiring additional power supplies.
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
                Good loop design involves matching power supply capability with total loop load to avoid 
                signal loss. Understanding voltage drops, compliance voltages, and resistance calculations 
                ensures reliable operation across the full 4-20mA range whilst maintaining adequate safety 
                margins for long-term system reliability.
              </p>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <InstrumentationQuiz 
            questions={[
              {
                id: 1,
                question: "What is the formula for calculating voltage drop in a loop?",
                options: [
                  "V = I × R (Ohm's Law) - voltage drop equals current times resistance",
                  "V = P / I",
                  "V = R / I",
                  "V = I / R"
                ],
                correctAnswer: 0,
                explanation: "Voltage drop is calculated using Ohm's Law: V = I × R, where voltage drop equals the loop current multiplied by the resistance of the component."
              },
              {
                id: 2,
                question: "Why is it important to know the compliance voltage?",
                options: [
                  "It determines the cable color",
                  "It determines the maximum allowable loop resistance - the transmitter needs minimum voltage to operate properly",
                  "It sets the current range",
                  "It affects the signal accuracy only"
                ],
                correctAnswer: 1,
                explanation: "Compliance voltage is the minimum voltage required across a transmitter for proper operation. It determines the maximum allowable loop resistance using the formula R_max = (V_supply - V_compliance) / I_max."
              },
              {
                id: 3,
                question: "What happens when total loop resistance is too high?",
                options: [
                  "The signal becomes stronger",
                  "Nothing significant occurs",
                  "The transmitter cannot reach full scale (20mA), causing signal loss and potential measurement errors",
                  "The loop automatically compensates"
                ],
                correctAnswer: 2,
                explanation: "When total loop resistance exceeds the maximum allowable value, the transmitter cannot reach full scale output (20mA) because insufficient voltage remains for proper operation, resulting in signal loss and measurement errors."
              },
              {
                id: 4,
                question: "How can you reduce loop load without losing signal?",
                options: [
                  "Increase the current",
                  "Use shorter cables, larger cable cross-section, or high-impedance receivers in parallel configurations",
                  "Decrease the voltage",
                  "Use more transmitters"
                ],
                correctAnswer: 1,
                explanation: "Loop load can be reduced by using shorter cable runs, larger cable cross-sections (lower resistance), or connecting high-impedance receivers in parallel rather than series to minimize total resistance."
              },
              {
                id: 5,
                question: "What's a typical power supply voltage for a 4–20mA loop?",
                options: [
                  "12VDC",
                  "24VDC ±10% with good regulation and low ripple",
                  "48VDC",
                  "5VDC"
                ],
                correctAnswer: 1,
                explanation: "The industry standard power supply voltage for 4-20mA loops is 24VDC ±10% (21.6V to 26.4V) with good voltage regulation and low ripple to ensure reliable transmitter operation."
            }
            ]}
            title="Section 3 Knowledge Check"
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="/study-centre/upskilling/instrumentation-module-7-section-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/study-centre/upskilling/instrumentation-module-7-section-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 touch-manipulation active:scale-[0.98]">
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

export default InstrumentationModule7Section3;