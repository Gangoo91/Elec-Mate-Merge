import { ArrowLeft, ArrowRight, Zap, Book, CheckCircle2, Settings, AlertTriangle, Brain, Target, SignalHigh, Battery, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import InstrumentationQuiz from '@/components/upskilling/quiz/InstrumentationQuiz';

const InstrumentationModule7Section1 = () => {
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
              <Zap className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  What Is a 4–20mA Loop and Why It's Used
                </h1>
                <p className="text-xl text-gray-400">
                  Module 7, Section 1
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 7.1
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
                Explore the fundamentals of the 4–20mA current loop — the industry standard for analog 
                signal transmission in instrumentation systems. This robust signalling method has been 
                the backbone of industrial control systems for decades.
              </p>
              <p>
                Understanding 4–20mA loops is essential for anyone working with process control instruments, 
                as they provide reliable, noise-resistant signal transmission across long distances in 
                industrial environments.
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
                  <span>Understand what a 4–20mA loop is and its fundamental principles</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Identify the advantages of using 4–20mA over voltage signals</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Recognise typical components involved in a loop configuration</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Understand signal integrity and noise resistance characteristics</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Definition and Purpose */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <SignalHigh className="h-5 w-5 text-yellow-400" />
                Definition and Purpose of 4–20mA Loops
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">What is a 4–20mA Loop?</h4>
              
              <p>
                A 4–20mA current loop is an analog signalling standard where process variables are 
                represented by current levels between 4 and 20 milliamps. The current is directly 
                proportional to the measured parameter value.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Signal Range Representation</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>4mA:</strong> Represents 0% of measurement range</li>
                    <li>• <strong>20mA:</strong> Represents 100% of measurement range</li>
                    <li>• <strong>Linear Scale:</strong> Current proportional to measured value</li>
                    <li>• <strong>Live Zero:</strong> 4mA indicates functioning loop</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Key Characteristics</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Analog Signal:</strong> Continuous current representation</li>
                    <li>• <strong>Two-Wire:</strong> Single pair for signal and power</li>
                    <li>• <strong>Industry Standard:</strong> Widely adopted globally</li>
                    <li>• <strong>Fault Detection:</strong> Below 4mA indicates failure</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="text-white font-semibold mb-2">Example: Pressure Transmitter</h5>
                <div className="bg-card p-3 rounded border border-gray-600">
                  <p className="text-sm">
                    A pressure transmitter measuring 0-100 PSI would output:
                  </p>
                  <ul className="text-sm mt-2 space-y-1">
                    <li>• <strong>0 PSI:</strong> 4.0mA output</li>
                    <li>• <strong>50 PSI:</strong> 12.0mA output (50% = 4 + (16 × 0.5))</li>
                    <li>• <strong>100 PSI:</strong> 20.0mA output</li>
                    <li>• <strong>Below 4mA:</strong> Transmitter fault or power loss</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Signal Integrity and Noise Resistance */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-yellow-400" />
                Signal Integrity and Noise Resistance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Why Current Signals Excel</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Current Loop Advantages</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Noise Immunity:</strong> Current unaffected by cable resistance</li>
                    <li>• <strong>Long Distance:</strong> Minimal signal degradation over distance</li>
                    <li>• <strong>Simple Wiring:</strong> Two-wire configuration reduces complexity</li>
                    <li>• <strong>Ground Independence:</strong> No common ground reference needed</li>
                    <li>• <strong>Power Efficiency:</strong> Low power consumption in loop</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Voltage Signal Disadvantages</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Voltage Drop:</strong> Cable resistance affects signal accuracy</li>
                    <li>• <strong>Noise Susceptible:</strong> Electromagnetic interference issues</li>
                    <li>• <strong>Ground Loops:</strong> Common mode voltage problems</li>
                    <li>• <strong>Distance Limited:</strong> Signal degradation over long runs</li>
                    <li>• <strong>More Wiring:</strong> Separate signal and power conductors</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="text-white font-semibold mb-2">Electromagnetic Compatibility (EMC)</h5>
                <p className="text-sm mb-2">
                  Current loops provide excellent electromagnetic compatibility in industrial environments:
                </p>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Low Impedance:</strong> Current loops present low impedance to noise</li>
                  <li>• <strong>Twisted Pair:</strong> Differential signal cancels common mode noise</li>
                  <li>• <strong>Shielding:</strong> Cable shields can be effectively grounded</li>
                  <li>• <strong>Isolation:</strong> Galvanic isolation prevents ground loops</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Common Loop Configurations */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-yellow-400" />
                Common Loop Configurations
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Standard Loop Arrangements</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Basic Two-Wire Loop</h5>
                  <p className="mb-2">
                    The most common configuration using two conductors for both power and signal.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Transmitter:</strong> Loop-powered device generates 4-20mA</li>
                    <li>• <strong>Receiver:</strong> Input card or indicator measures current</li>
                    <li>• <strong>Power Supply:</strong> Provides loop excitation voltage</li>
                    <li>• <strong>Series Circuit:</strong> All components in series path</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Multi-Drop Configuration</h5>
                  <p className="mb-2">
                    Multiple receivers can monitor the same 4-20mA signal in parallel.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Parallel Connection:</strong> Receivers connected in parallel</li>
                    <li>• <strong>High Impedance:</strong> Input cards must be high impedance</li>
                    <li>• <strong>Isolation:</strong> Receivers should be isolated</li>
                    <li>• <strong>Load Calculation:</strong> Total loop resistance must be managed</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Isolated Loop Systems</h5>
                  <p className="mb-2">
                    Galvanically isolated loops prevent ground loops and electrical interference.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Signal Isolation:</strong> No electrical connection between loops</li>
                    <li>• <strong>Power Isolation:</strong> Isolated power supplies for each loop</li>
                    <li>• <strong>Safety:</strong> Personnel protection from electrical hazards</li>
                    <li>• <strong>Noise Elimination:</strong> Prevents ground loop currents</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Devices in a Loop */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Battery className="h-5 w-5 text-yellow-400" />
                Devices in a Loop: Transmitter, Receiver, Power Supply
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Essential Loop Components</h4>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h5 className="text-white font-semibold mb-2">Transmitters</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Function:</strong> Convert physical parameter to 4-20mA</li>
                    <li>• <strong>Types:</strong> Pressure, temperature, flow, level</li>
                    <li>• <strong>Power:</strong> Loop-powered or externally powered</li>
                    <li>• <strong>Accuracy:</strong> Typically ±0.1% to ±0.5% full scale</li>
                    <li>• <strong>Output:</strong> Current sink or source operation</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Receivers</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Function:</strong> Measure loop current and convert to digital</li>
                    <li>• <strong>Types:</strong> Analog input cards, indicators, controllers</li>
                    <li>• <strong>Impedance:</strong> High input impedance (&gt;10MΩ)</li>
                    <li>• <strong>Resolution:</strong> 12-bit to 16-bit analog-to-digital conversion</li>
                    <li>• <strong>Isolation:</strong> Often galvanically isolated</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-white font-semibold mb-2">Power Supplies</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Voltage:</strong> Typically 24VDC nominal</li>
                    <li>• <strong>Current:</strong> Minimum 25mA capability</li>
                    <li>• <strong>Regulation:</strong> Good voltage regulation required</li>
                    <li>• <strong>Isolation:</strong> Often isolated from ground</li>
                    <li>• <strong>Protection:</strong> Short circuit and overload protection</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4">
                <h5 className="text-white font-semibold mb-2">Loop Resistance Calculations</h5>
                <div className="bg-card p-3 rounded border border-gray-600">
                  <p className="text-sm mb-2">
                    Total loop resistance = Transmitter + Cable + Receiver resistances:
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Maximum Loop Resistance:</strong> (Supply Voltage - Transmitter Drop) / 0.02A</li>
                    <li>• <strong>Example:</strong> (24V - 10V) / 0.02A = 700Ω maximum</li>
                    <li>• <strong>Cable Resistance:</strong> 2 × length × resistance per metre</li>
                    <li>• <strong>Safety Margin:</strong> Design for 75% of maximum calculated value</li>
                  </ul>
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
                Chemical Plant Pressure Transmitter Installation
              </p>
              <p>
                A technician is installing a pressure transmitter in a chemical plant to monitor 
                reactor vessel pressure. The transmitter must be located 300 metres from the control 
                room due to safety requirements and potential hazardous atmosphere considerations.
              </p>
              <div className="bg-card p-3 rounded border border-gray-600">
                <h5 className="text-yellow-400 font-semibold text-sm mb-2">Installation Challenges:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Long cable run through multiple electrical conduits</li>
                  <li>• High electromagnetic interference from nearby motors</li>
                  <li>• Temperature variations from -10°C to +60°C</li>
                  <li>• Requirement for hazardous area certification</li>
                  <li>• Need for reliable fault detection capability</li>
                </ul>
              </div>
              <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                <h5 className="text-green-400 font-semibold text-sm mb-2">Why 4-20mA Loop is Ideal:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Current signal unaffected by 300m cable voltage drop</li>
                  <li>• Excellent noise immunity against motor interference</li>
                  <li>• Two-wire installation reduces cable costs and complexity</li>
                  <li>• 4mA live zero provides immediate fault detection</li>
                  <li>• Loop-powered transmitter eliminates hazardous area wiring</li>
                  <li>• Temperature compensation in transmitter maintains accuracy</li>
                </ul>
              </div>
              <p className="text-sm italic text-green-400">
                Result: Reliable, accurate pressure monitoring with minimal installation complexity 
                and excellent long-term stability in challenging industrial environment.
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
                4–20mA loops offer reliability, simplicity, and wide compatibility — making them ideal 
                for industrial environments with electrical noise. The current-based signalling provides 
                excellent noise immunity, long-distance capability, and fault detection through the live 
                zero concept, establishing it as the industry standard for analog instrumentation.
              </p>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <InstrumentationQuiz 
            questions={[
              {
                id: 1,
                question: "What does the 4–20mA range represent in instrumentation?",
                options: [
                  "4mA represents maximum value, 20mA represents minimum value",
                  "4mA represents 0% of measurement range, 20mA represents 100% of measurement range",
                  "4mA is for power, 20mA is for signal",
                  "The range is arbitrary and can be changed"
                ],
                correctAnswer: 1,
                explanation: "In a 4-20mA loop, 4mA represents 0% (minimum) of the measurement range and 20mA represents 100% (maximum) of the measurement range, with current linearly proportional to the measured parameter."
              },
              {
                id: 2,
                question: "Why is 4mA used as the 'live zero'?",
                options: [
                  "It saves power consumption",
                  "It provides fault detection capability - any current below 4mA indicates a loop fault or transmitter failure",
                  "It makes the signal stronger",
                  "It reduces electromagnetic interference"
                ],
                correctAnswer: 1,
                explanation: "4mA serves as 'live zero' because it allows fault detection. Any current below 4mA (including 0mA) indicates a broken wire, failed transmitter, or power loss, distinguishing between a true zero reading and a fault condition."
              },
              {
                id: 3,
                question: "What component supplies power in a loop-powered system?",
                options: [
                  "The transmitter generates its own power",
                  "Power comes from the process being measured",
                  "An external power supply (typically 24VDC) provides loop excitation voltage",
                  "The receiver provides power to the loop"
                ],
                correctAnswer: 2,
                explanation: "In a loop-powered system, an external power supply (typically 24VDC) provides the excitation voltage for the loop. The transmitter is powered by the loop current flowing through it."
              },
              {
                id: 4,
                question: "What makes current loops more robust than voltage signals?",
                options: [
                  "They use higher voltage levels",
                  "Current is unaffected by cable resistance and provides excellent noise immunity over long distances",
                  "They require more expensive cables",
                  "They operate at higher frequencies"
                ],
                correctAnswer: 1,
                explanation: "Current loops are more robust because current remains constant regardless of cable resistance (within limits), and they have excellent immunity to electromagnetic noise, making them ideal for long-distance transmission in industrial environments."
              },
              {
                id: 5,
                question: "Name two typical devices found in a 4–20mA loop.",
                options: [
                  "Voltage regulator and frequency converter",
                  "Transmitter (converts physical parameter to current) and receiver (measures loop current)",
                  "Oscilloscope and function generator",
                  "Relay and contactor"
                ],
                correctAnswer: 1,
                explanation: "A typical 4-20mA loop contains a transmitter (which converts a physical parameter like pressure or temperature into a 4-20mA current signal) and a receiver (such as an analog input card that measures the loop current)."
            }
            ]}
            title="Section 1 Knowledge Check"
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <div></div>
            <Link to="/study-centre/upskilling/instrumentation-module-7-section-2">
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

export default InstrumentationModule7Section1;