import { ArrowLeft, ArrowRight, Power, Book, CheckCircle2, Zap, AlertTriangle, Brain, Cable, Wrench, Battery } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import InstrumentationQuiz from '@/components/upskilling/quiz/InstrumentationQuiz';

const InstrumentationModule7Section2 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div className="px-8 pt-8 pb-12">
        <Link to="../instrumentation-module-7">
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
              <Power className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Loop-Powered vs Externally Powered Devices
                </h1>
                <p className="text-xl text-gray-400">
                  Module 7, Section 2
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 7.2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                15 minutes
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
                Different devices in instrumentation loops are powered in different ways, each with 
                distinct advantages and limitations. This section breaks down loop-powered and externally 
                powered configurations to help you choose the right approach for your applications.
              </p>
              <p>
                Understanding these power methods is crucial for proper system design, installation 
                efficiency, and long-term reliability. The choice affects wiring complexity, power 
                consumption, safety considerations, and overall system performance.
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
                  <span>Distinguish between loop-powered and externally powered devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Identify the pros and cons of each power configuration</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Learn when to use each configuration in different applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Understand fault risks with incorrect configurations</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Definitions of Power Methods */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Battery className="h-5 w-5 text-yellow-400" />
                Definitions of Both Power Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Understanding Power Configurations</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Loop-Powered Devices (2-Wire)</h5>
                  <p className="text-sm mb-2">
                    Devices that derive their operating power directly from the 4-20mA current loop itself.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Power Source:</strong> Loop current provides operating power</li>
                    <li>• <strong>Wiring:</strong> Only two wires required (signal + power)</li>
                    <li>• <strong>Current Draw:</strong> Device operates on loop current (4-20mA)</li>
                    <li>• <strong>Power Limitation:</strong> Limited by available loop power</li>
                    <li>• <strong>Examples:</strong> Basic transmitters, simple indicators</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Externally Powered Devices (4-Wire)</h5>
                  <p className="text-sm mb-2">
                    Devices that have separate power supply connections independent of the signal loop.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Power Source:</strong> Separate power supply connection</li>
                    <li>• <strong>Wiring:</strong> Four wires minimum (2 for power, 2 for signal)</li>
                    <li>• <strong>Current Output:</strong> Device sources current to loop</li>
                    <li>• <strong>Power Availability:</strong> Full power supply capability</li>
                    <li>• <strong>Examples:</strong> Smart transmitters, powered indicators</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="text-white font-semibold mb-2">Power Circuit Analysis</h5>
                <div className="bg-card p-3 rounded border border-gray-600">
                  <p className="text-sm mb-2">
                    Loop-powered device power calculation:
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Available Power:</strong> P = I × V_device (where I = loop current, V_device = voltage drop across device)</li>
                    <li>• <strong>Typical Values:</strong> At 4mA: 4mA × 10V = 40mW, At 20mA: 20mA × 10V = 200mW</li>
                    <li>• <strong>Design Constraint:</strong> Device must operate reliably at minimum power (4mA condition)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wiring Diagrams */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Cable className="h-5 w-5 text-yellow-400" />
                Wiring Diagrams: 2-Wire vs 4-Wire Devices
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Wiring Configuration Comparison</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">2-Wire Loop-Powered Configuration</h5>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <p className="text-sm mb-2">
                      <strong>Signal Path:</strong> Power Supply (+) → Transmitter → Cable → Receiver → Power Supply (-)
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Terminal 1:</strong> Loop positive connection</li>
                      <li>• <strong>Terminal 2:</strong> Loop negative connection</li>
                      <li>• <strong>Current Flow:</strong> Same current through all loop components</li>
                      <li>• <strong>Installation:</strong> Simple two-conductor cable installation</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">4-Wire Externally Powered Configuration</h5>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <p className="text-sm mb-2">
                      <strong>Power Circuit:</strong> Power Supply → Device Power Terminals (separate from signal)
                    </p>
                    <p className="text-sm mb-2">
                      <strong>Signal Circuit:</strong> Device Signal Output → Cable → Receiver Input
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Terminals 1&2:</strong> Power supply connections (typically 24VDC)</li>
                      <li>• <strong>Terminals 3&4:</strong> Signal output connections (4-20mA)</li>
                      <li>• <strong>Isolation:</strong> Power and signal circuits can be isolated</li>
                      <li>• <strong>Installation:</strong> Requires separate power and signal cables</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Hybrid Configurations</h5>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <p className="text-sm mb-2">
                      Some devices can operate in both modes depending on application requirements:
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Configurable Power:</strong> Jumper or software selectable power mode</li>
                      <li>• <strong>Smart Transmitters:</strong> Often capable of both 2-wire and 4-wire operation</li>
                      <li>• <strong>HART Capability:</strong> Digital communication overlay on 4-20mA signal</li>
                      <li>• <strong>Diagnostic Features:</strong> Enhanced capabilities with external power</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Applications and Limitations */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-yellow-400" />
                Applications and Limitations
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">When to Use Each Configuration</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-white font-semibold mb-2">Loop-Powered Applications</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Remote Locations:</strong> Minimal wiring infrastructure</li>
                      <li>• <strong>Hazardous Areas:</strong> Reduced intrinsic safety barriers</li>
                      <li>• <strong>Cost-Sensitive Projects:</strong> Lower installation costs</li>
                      <li>• <strong>Basic Measurements:</strong> Simple process variables</li>
                      <li>• <strong>Battery-Powered Systems:</strong> Low power consumption critical</li>
                    </ul>
                    
                    <h5 className="text-white font-semibold mb-2 mt-3">Loop-Powered Limitations</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Power Constraint:</strong> Limited processing capability</li>
                      <li>• <strong>Feature Limitations:</strong> Fewer diagnostic features</li>
                      <li>• <strong>Display Restrictions:</strong> No backlit displays possible</li>
                      <li>• <strong>Communication:</strong> Limited digital communication</li>
                      <li>• <strong>Response Time:</strong> May be slower due to power limits</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-white font-semibold mb-2">Externally Powered Applications</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Complex Processes:</strong> Advanced signal processing required</li>
                      <li>• <strong>High Accuracy:</strong> Precision measurements needed</li>
                      <li>• <strong>Smart Features:</strong> Diagnostics, configuration, communication</li>
                      <li>• <strong>Multiple Outputs:</strong> Several signal outputs required</li>
                      <li>• <strong>Local Display:</strong> Backlit LCD displays and keypads</li>
                    </ul>
                    
                    <h5 className="text-white font-semibold mb-2 mt-3">Externally Powered Limitations</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Wiring Complexity:</strong> More conductors required</li>
                      <li>• <strong>Installation Cost:</strong> Higher cable and labour costs</li>
                      <li>• <strong>Power Infrastructure:</strong> Local power distribution needed</li>
                      <li>• <strong>Failure Points:</strong> Additional power supply failure modes</li>
                      <li>• <strong>Hazardous Areas:</strong> More complex intrinsic safety design</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="text-white font-semibold mb-2">Application Decision Matrix</h5>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border border-gray-600">
                    <thead>
                      <tr className="bg-yellow-400/10">
                        <th className="border border-gray-600 p-2 text-left">Factor</th>
                        <th className="border border-gray-600 p-2 text-left">Loop-Powered</th>
                        <th className="border border-gray-600 p-2 text-left">Externally Powered</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-600 p-2">Installation Cost</td>
                        <td className="border border-gray-600 p-2">Lower</td>
                        <td className="border border-gray-600 p-2">Higher</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 p-2">Power Consumption</td>
                        <td className="border border-gray-600 p-2">Very Low</td>
                        <td className="border border-gray-600 p-2">Higher</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 p-2">Feature Capability</td>
                        <td className="border border-gray-600 p-2">Basic</td>
                        <td className="border border-gray-600 p-2">Advanced</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 p-2">Hazardous Areas</td>
                        <td className="border border-gray-600 p-2">Simpler</td>
                        <td className="border border-gray-600 p-2">More Complex</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fault Risks */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Fault Risks with Incorrect Configurations
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Common Configuration Errors and Consequences</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Excessive Loop Loading</h5>
                  <p className="text-sm mb-2">
                    Adding too many devices or loads to a loop-powered system can cause voltage insufficiency.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Symptoms:</strong> Transmitter operates erratically or fails to reach 20mA</li>
                    <li>• <strong>Causes:</strong> Multiple receivers, long cable runs, high resistance connections</li>
                    <li>• <strong>Consequences:</strong> Inaccurate readings, transmitter damage, system failure</li>
                    <li>• <strong>Prevention:</strong> Calculate total loop resistance before installation</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Power Supply Mismatch</h5>
                  <p className="text-sm mb-2">
                    Using incorrect power supply voltage or current capability for the loop configuration.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Under-Voltage:</strong> Transmitter cannot reach full scale output</li>
                    <li>• <strong>Over-Voltage:</strong> Risk of device damage from excessive voltage</li>
                    <li>• <strong>Insufficient Current:</strong> Power supply cannot maintain loop current</li>
                    <li>• <strong>Poor Regulation:</strong> Supply voltage varies affecting accuracy</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Incorrect Wiring Configuration</h5>
                  <p className="text-sm mb-2">
                    Wiring externally powered devices as loop-powered or vice versa.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>No Output:</strong> Device fails to operate or produce signal</li>
                    <li>• <strong>Damage Risk:</strong> Over-voltage or incorrect polarity damage</li>
                    <li>• <strong>Ground Loops:</strong> Multiple ground references cause noise</li>
                    <li>• <strong>Safety Issues:</strong> Incorrect grounding in hazardous areas</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Load Resistance Calculation Errors</h5>
                  <div className="bg-red-900/20 p-3 rounded border border-red-600/30">
                    <h6 className="text-red-400 font-semibold text-sm mb-1">Critical Calculation:</h6>
                    <p className="text-sm mb-2">
                      R_total = R_transmitter + R_cable + R_receiver ≤ (V_supply - V_transmitter_min) / I_max
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Example Failure:</strong> 24V supply, 10V transmitter drop, 20mA max current</li>
                      <li>• <strong>Maximum R_loop:</strong> (24V - 10V) / 0.02A = 700Ω</li>
                      <li>• <strong>Risk:</strong> Exceeding 700Ω prevents full-scale operation</li>
                      <li>• <strong>Safety Factor:</strong> Design for 75% of calculated maximum (525Ω)</li>
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
                Remote Field Installation: Temperature Transmitter Selection
              </p>
              <p>
                In a remote field installation, a loop-powered temperature transmitter needs to be 
                installed 500 metres from the control room. The location has no local power infrastructure, 
                making a loop-powered solution attractive for cost and simplicity.
              </p>
              <div className="bg-card p-3 rounded border border-gray-600">
                <h5 className="text-yellow-400 font-semibold text-sm mb-2">Initial Installation:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Loop-powered temperature transmitter installed successfully</li>
                  <li>• Single 2-wire cable run saves significant installation cost</li>
                  <li>• System operates reliably with basic temperature measurement</li>
                  <li>• No local power supply required reduces complexity</li>
                </ul>
              </div>
              <div className="bg-yellow-900/20 p-3 rounded border border-yellow-600/30">
                <h5 className="text-yellow-400 font-semibold text-sm mb-2">Additional Requirements:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Customer requests local digital display for field operators</li>
                  <li>• HART communication capability needed for diagnostics</li>
                  <li>• Data logging function required for maintenance trending</li>
                  <li>• Alarm relay output requested for high temperature warning</li>
                </ul>
              </div>
              <div className="bg-red-900/20 p-3 rounded border border-red-600/30">
                <h5 className="text-red-400 font-semibold text-sm mb-2">Problem Encountered:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Loop-powered device cannot support backlit display</li>
                  <li>• Insufficient power for HART communication at 4mA</li>
                  <li>• No power available for relay output operation</li>
                  <li>• Data logging requires more processing power than available</li>
                </ul>
              </div>
              <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                <h5 className="text-green-400 font-semibold text-sm mb-2">Solution: Upgrade to Externally Powered</h5>
                <ul className="text-sm space-y-1">
                  <li>• Install 4-wire externally powered smart transmitter</li>
                  <li>• Add local 24VDC power supply with solar panel backup</li>
                  <li>• Enable all requested features with adequate power budget</li>
                  <li>• Maintain 4-20mA signal for existing control system compatibility</li>
                </ul>
              </div>
              <p className="text-sm italic text-green-400">
                Result: Enhanced functionality achieved through proper power configuration selection, 
                demonstrating the importance of considering all system requirements during design phase.
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
                Choosing the right power configuration ensures reliable data transmission and system efficiency. 
                Loop-powered devices offer simplicity and cost savings for basic applications, while externally 
                powered devices provide enhanced capabilities for complex requirements. Understanding the 
                trade-offs helps optimise system design and prevent configuration-related failures.
              </p>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <InstrumentationQuiz 
            questions={[
              {
                id: 1,
                question: "What is the main difference between loop-powered and externally powered devices?",
                options: [
                  "Loop-powered devices are more accurate",
                  "Loop-powered devices get their operating power from the 4-20mA loop current, while externally powered devices have separate power supply connections",
                  "Externally powered devices use AC power",
                  "There is no significant difference"
                ],
                correctAnswer: 1,
                explanation: "Loop-powered devices derive their operating power directly from the 4-20mA loop current using only two wires, while externally powered devices have separate power supply connections independent of the signal loop."
              },
              {
                id: 2,
                question: "Which uses fewer wires: loop-powered or externally powered?",
                options: [
                  "Externally powered uses fewer wires",
                  "Loop-powered uses fewer wires (2-wire vs 4-wire configuration)",
                  "Both use the same number of wires",
                  "It depends on the manufacturer"
                ],
                correctAnswer: 1,
                explanation: "Loop-powered devices use a 2-wire configuration where the same two wires carry both power and signal, while externally powered devices typically require 4 wires (2 for power, 2 for signal)."
              },
              {
                id: 3,
                question: "Why might externally powered devices be used in hazardous areas?",
                options: [
                  "They are always safer than loop-powered devices",
                  "They provide more power for enhanced safety features, diagnostics, and can support complex intrinsic safety designs when needed",
                  "They use lower voltage",
                  "They cannot be used in hazardous areas"
                ],
                correctAnswer: 1,
                explanation: "Externally powered devices can provide more power for enhanced safety features, advanced diagnostics, and sophisticated intrinsic safety designs, though they do require more complex safety barrier configurations."
              },
              {
                id: 4,
                question: "Name one advantage of loop-powered setups.",
                options: [
                  "They always provide more features",
                  "Simple 2-wire installation reduces wiring costs and complexity, especially for remote locations",
                  "They use more power",
                  "They are always more accurate"
                ],
                correctAnswer: 1,
                explanation: "Loop-powered setups offer significant advantages in installation simplicity and cost reduction, requiring only two wires for both power and signal, making them ideal for remote locations and cost-sensitive applications."
              },
              {
                id: 5,
                question: "What happens if a loop has too many loads?",
                options: [
                  "The signal becomes stronger",
                  "Nothing happens",
                  "Voltage insufficiency occurs - the transmitter may operate erratically, fail to reach full scale (20mA), or stop working entirely",
                  "The loop automatically compensates"
                ],
                correctAnswer: 2,
                explanation: "Excessive loop loading causes voltage insufficiency where the power supply cannot maintain adequate voltage for proper transmitter operation, resulting in erratic operation, inability to reach 20mA full scale, or complete failure."
            }
            ]}
            title="Section 2 Knowledge Check"
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../instrumentation-module-7-section-1">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../instrumentation-module-7-section-3">
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

export default InstrumentationModule7Section2;