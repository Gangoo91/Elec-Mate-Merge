import { ArrowLeft, ArrowRight, Settings2, CheckCircle2, Book, Brain, Gauge, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import InstrumentationQuiz from '@/components/upskilling/quiz/InstrumentationQuiz';

const InstrumentationModule8Section3 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="/study-centre/upskilling/instrumentation-module-8">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 8
          </Button>
        </Link>
        
        <div className="space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Settings2 className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Using Loop Calibrators and Simulators for Diagnostics
                </h1>
                <p className="text-xl text-gray-400">
                  Module 8, Section 3
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 8.3
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
                Loop calibrators and signal simulators are essential tools when it comes to 
                identifying where a fault exists within a 4–20mA loop. These instruments allow 
                technicians to inject known signals into the system and verify the response, 
                effectively isolating the problem to either the sensor side or the controller side.
              </p>
              <p>
                By using calibrators strategically, you can eliminate guesswork and pinpoint 
                exactly where a fault lies, saving valuable time and preventing unnecessary 
                component replacement.
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
                  <span>Learn how to simulate sensor signals using a calibrator</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Verify whether the issue lies in the sensor or controller</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Use signal injection to isolate sections of the loop</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Content */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Gauge className="h-5 w-5 text-yellow-400" />
                Loop Calibrator Diagnostic Process
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Step-by-Step Calibrator Testing</h4>
              
              <div className="space-y-4">
                <div className="bg-card p-4 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Step 1: Connect Calibrator in Place of Transmitter</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Isolate the Transmitter:</strong> Safely disconnect the field transmitter from the loop</li>
                    <li>• <strong>Connect Calibrator:</strong> Wire the calibrator to simulate the transmitter output</li>
                    <li>• <strong>Verify Polarity:</strong> Ensure correct positive and negative connections</li>
                    <li>• <strong>Check Loop Power:</strong> Confirm 24V loop power supply is active</li>
                    <li>• <strong>Set Initial Output:</strong> Start with a known reference signal (e.g., 4mA)</li>
                  </ul>
                </div>
                
                <div className="bg-card p-4 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Step 2: Inject Known Signal (e.g., 12mA = 50%)</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-yellow-400 font-medium mb-2">Signal Values to Test</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>4.00mA:</strong> 0% scale (minimum)</li>
                        <li>• <strong>12.00mA:</strong> 50% scale (mid-range)</li>
                        <li>• <strong>20.00mA:</strong> 100% scale (maximum)</li>
                        <li>• <strong>8.00mA:</strong> 25% scale</li>
                        <li>• <strong>16.00mA:</strong> 75% scale</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-yellow-400 font-medium mb-2">Testing Sequence</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Start with 4mA and verify minimum display</li>
                        <li>• Step through 25%, 50%, 75% values</li>
                        <li>• End with 20mA maximum scale test</li>
                        <li>• Record actual vs expected readings</li>
                        <li>• Note any non-linear responses</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card p-4 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Step 3: Observe Output Response on Control System</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Display Response:</strong> Check that controller displays match calibrator output</li>
                    <li>• <strong>Alarm Functions:</strong> Verify high/low alarms trigger correctly</li>
                    <li>• <strong>Control Response:</strong> Observe any control action based on simulated signal</li>
                    <li>• <strong>Data Logging:</strong> Confirm historian captures correct values</li>
                    <li>• <strong>Response Time:</strong> Note lag between calibrator change and system response</li>
                  </ul>
                </div>
                
                <div className="bg-card p-4 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Step 4: Interpret Results</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-green-400 font-medium mb-2">If Controller Responds Correctly</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Loop wiring is intact</li>
                        <li>• Controller input card functioning</li>
                        <li>• Problem likely in transmitter/sensor</li>
                        <li>• Consider sensor calibration issues</li>
                        <li>• Check transmitter power supply</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-red-400 font-medium mb-2">If Controller Doesn't Respond</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Check loop wiring continuity</li>
                        <li>• Verify controller input card</li>
                        <li>• Test loop power supply voltage</li>
                        <li>• Check for grounding issues</li>
                        <li>• Inspect cable shield integrity</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card p-4 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Step 5: Compare Real Signal to Simulated Values</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Reconnect Transmitter:</strong> Restore original field device connection</li>
                    <li>• <strong>Side-by-Side Comparison:</strong> Use portable meter to read actual signal</li>
                    <li>• <strong>Process Correlation:</strong> Verify transmitter reading matches known process conditions</li>
                    <li>• <strong>Calibration Check:</strong> Compare field reading to reference standards</li>
                    <li>• <strong>Document Findings:</strong> Record differences between simulated and actual signals</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Techniques */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-yellow-400" />
                Advanced Calibrator Techniques
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Specialised Testing Methods</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card p-3 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Loop-Back Testing</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Connect calibrator output to input</li>
                    <li>• Verify end-to-end loop integrity</li>
                    <li>• Test complete signal path</li>
                    <li>• Isolate cable vs controller issues</li>
                  </ul>
                </div>
                
                <div className="bg-card p-3 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Dynamic Response Testing</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Step signal changes (4mA to 20mA)</li>
                    <li>• Measure controller response time</li>
                    <li>• Test system damping characteristics</li>
                    <li>• Verify control loop stability</li>
                  </ul>
                </div>
                
                <div className="bg-card p-3 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Multi-Point Calibration</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Test 5-point linearity check</li>
                    <li>• Identify non-linear responses</li>
                    <li>• Validate scaling accuracy</li>
                    <li>• Detect drift patterns</li>
                  </ul>
                </div>
                
                <div className="bg-card p-3 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">HART Communication Testing</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Test digital communication integrity</li>
                    <li>• Verify device identification</li>
                    <li>• Check diagnostic information</li>
                    <li>• Validate configuration parameters</li>
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
                Faulty pH Transmitter Investigation
              </p>
              <p>
                A technician suspects a faulty pH transmitter after receiving reports of erratic 
                readings that don't correlate with process conditions. Using a loop calibrator, 
                he systematically isolates the problem.
              </p>
              <div className="bg-card p-3 rounded border border-gray-600">
                <h5 className="text-yellow-400 font-semibold text-sm mb-2">Diagnostic Process:</h5>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Step 1:</strong> Disconnected pH transmitter and connected calibrator</li>
                  <li>• <strong>Step 2:</strong> Injected 12mA signal (7.0 pH equivalent)</li>
                  <li>• <strong>Step 3:</strong> Control system displayed exactly 7.0 pH</li>
                  <li>• <strong>Step 4:</strong> Tested full range from 4-20mA with perfect response</li>
                  <li>• <strong>Step 5:</strong> Reconnected transmitter - erratic readings returned</li>
                </ul>
              </div>
              <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                <h5 className="text-green-400 font-semibold text-sm mb-2">Result:</h5>
                <p className="text-sm">
                  The calibrator test confirmed the transmitter failure. When the simulator 
                  produced accurate system responses, it proved the loop wiring and controller 
                  were functioning correctly. This eliminated hours of unnecessary troubleshooting 
                  and confirmed the need for transmitter replacement.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Loop simulators take guesswork out of troubleshooting — they quickly pinpoint 
                whether the fault is input or output side. By systematically testing with known 
                signals, technicians can efficiently isolate problems and avoid unnecessary 
                component replacement.
              </p>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <InstrumentationQuiz 
            questions={[
              {
                id: 1,
                question: "What tool would you use to simulate a 12mA signal?",
                options: [
                  "A multimeter",
                  "A loop calibrator or process calibrator",
                  "An oscilloscope",
                  "A power supply"
                ],
                correctAnswer: 1,
                explanation: "A loop calibrator or process calibrator can generate precise current signals like 12mA to simulate transmitter outputs for testing purposes."
              },
              {
                id: 2,
                question: "Why is simulation useful during loop testing?",
                options: [
                  "It's cheaper than using real sensors",
                  "It provides known, controllable signals to isolate faults between sensor and controller sides",
                  "It's faster than other methods",
                  "It doesn't require any tools"
                ],
                correctAnswer: 1,
                explanation: "Simulation provides known, controllable signals that help isolate whether faults are on the sensor side or controller side, eliminating guesswork in diagnostics."
              },
              {
                id: 3,
                question: "What does it mean if a simulated signal works but the real signal doesn't?",
                options: [
                  "The controller is faulty",
                  "The wiring is damaged",
                  "The sensor/transmitter is likely faulty since the loop and controller respond correctly to known signals",
                  "The power supply is wrong"
                ],
                correctAnswer: 2,
                explanation: "If the simulated signal works correctly, it proves the loop wiring and controller are functioning properly, indicating the fault lies in the sensor or transmitter."
              },
              {
                id: 4,
                question: "When would you use a multimeter vs a calibrator?",
                options: [
                  "Always use a multimeter first",
                  "Multimeter to measure existing signals; calibrator to generate known test signals",
                  "They do the same thing",
                  "Calibrators are only for digital signals"
                ],
                correctAnswer: 1,
                explanation: "Use a multimeter to measure existing signals and verify readings; use a calibrator to generate known test signals for systematic troubleshooting and isolation testing."
              },
              {
                id: 5,
                question: "What's the benefit of using loop-back testing?",
                options: [
                  "It tests only the sensor",
                  "It verifies the complete signal path from output back to input, testing end-to-end loop integrity",
                  "It's the cheapest method",
                  "It only works with digital signals"
                ],
                correctAnswer: 1,
                explanation: "Loop-back testing connects the calibrator output to the system input, verifying the complete signal path and end-to-end loop integrity including cables and controller."
            }
            ]}
            title="Section 3 Knowledge Check"
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="/study-centre/upskilling/instrumentation-module-8-section-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/study-centre/upskilling/instrumentation-module-8-section-4">
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

export default InstrumentationModule8Section3;