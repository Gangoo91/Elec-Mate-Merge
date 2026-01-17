import { ArrowLeft, ArrowRight, AlertTriangle, Activity, CheckCircle2, Book, Brain, Zap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import InstrumentationQuiz from '@/components/upskilling/quiz/InstrumentationQuiz';

const InstrumentationModule8Section2 = () => {
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
              <Activity className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Symptoms of Sensor, Loop, or Signal Failure
                </h1>
                <p className="text-xl text-gray-400">
                  Module 8, Section 2
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 8.2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                25 minutes
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
                Instrumentation failures often show up as signals that are incorrect, inconsistent, 
                or missing altogether. This section breaks down how to recognise and interpret these 
                symptoms, linking observable behaviours to their likely root causes.
              </p>
              <p>
                Understanding signal symptoms enables rapid diagnosis and prevents unnecessary downtime. 
                Each type of failure produces characteristic patterns that, when properly interpreted, 
                point directly to the underlying problem and guide effective repair strategies.
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
                  <span>Identify common symptoms of signal failure and their characteristics</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Link symptoms to their likely root causes for efficient diagnosis</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Learn what values (or lack thereof) suggest different issues</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Content - Signal Failure Types */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Common Signal Failure Symptoms
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Symptom Analysis and Root Causes</h4>
              
              <div className="space-y-4">
                <div className="bg-red-900/20 p-4 rounded border border-red-600/30">
                  <h5 className="text-red-400 font-semibold mb-2">Dead Signal (0mA): Open Circuit or No Power</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Symptoms</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Current reading shows 0.00mA consistently</li>
                        <li>• Receiver displays minimum scale or fault condition</li>
                        <li>• No response to process changes</li>
                        <li>• Power supply shows high voltage, minimal current</li>
                        <li>• Loop resistance appears infinite</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Probable Causes</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Power Supply Failure:</strong> No 24V supply voltage</li>
                        <li>• <strong>Open Circuit:</strong> Broken wire or connection</li>
                        <li>• <strong>Transmitter Failure:</strong> Internal electronics failed</li>
                        <li>• <strong>Fuse Blown:</strong> Protection device operated</li>
                        <li>• <strong>Terminal Disconnection:</strong> Loose or corroded connection</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-900/20 p-4 rounded border border-yellow-600/30">
                  <h5 className="text-yellow-400 font-semibold mb-2">Fixed 4mA: Healthy Loop, Faulty Sensor</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Symptoms</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Signal locked at exactly 4.00mA</li>
                        <li>• No response to process variable changes</li>
                        <li>• Power supply and wiring test normal</li>
                        <li>• Loop resistance within expected range</li>
                        <li>• Communication may still function (HART/digital)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Probable Causes</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Sensor Element Failure:</strong> Primary element damaged</li>
                        <li>• <strong>Transmitter Electronics:</strong> A/D converter failure</li>
                        <li>• <strong>Calibration Lost:</strong> Internal reference drift</li>
                        <li>• <strong>Configuration Error:</strong> Wrong range or units</li>
                        <li>• <strong>Process Connection:</strong> Blocked impulse lines</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-900/20 p-4 rounded border border-orange-600/30">
                  <h5 className="text-orange-400 font-semibold mb-2">Erratic Signals: Noise, Grounding Issues, Moisture</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Symptoms</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Signal fluctuates rapidly and unpredictably</li>
                        <li>• Random spikes or dropouts in reading</li>
                        <li>• High frequency noise superimposed on signal</li>
                        <li>• Pattern may correlate with nearby equipment</li>
                        <li>• Worse during specific weather conditions</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Probable Causes</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>EMI/RFI Interference:</strong> Nearby electrical equipment</li>
                        <li>• <strong>Ground Loops:</strong> Multiple earth paths</li>
                        <li>• <strong>Poor Shielding:</strong> Damaged or incorrect cable shield</li>
                        <li>• <strong>Moisture Ingress:</strong> Water in junction boxes</li>
                        <li>• <strong>Vibration:</strong> Mechanical stress on connections</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-900/20 p-4 rounded border border-blue-600/30">
                  <h5 className="text-yellow-400 font-semibold mb-2">Signal Drift: Aging or Overheating Sensor</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Symptoms</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Gradual change in signal over time</li>
                        <li>• Reading offset from known reference</li>
                        <li>• Drift rate may accelerate over time</li>
                        <li>• Temperature-dependent behaviour</li>
                        <li>• Similar instruments show different readings</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Probable Causes</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Component Aging:</strong> Electronic component degradation</li>
                        <li>• <strong>Temperature Effects:</strong> Thermal stress on sensor</li>
                        <li>• <strong>Calibration Drift:</strong> Reference standards changing</li>
                        <li>• <strong>Process Fouling:</strong> Material buildup on sensor</li>
                        <li>• <strong>Mechanical Wear:</strong> Moving parts degradation</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-900/20 p-4 rounded border border-purple-600/30">
                  <h5 className="text-purple-400 font-semibold mb-2">Intermittent Faults: Connector or Mechanical Issue</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Symptoms</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Signal appears and disappears unpredictably</li>
                        <li>• Fault may correlate with vibration or movement</li>
                        <li>• Environmental conditions affect reliability</li>
                        <li>• Difficult to reproduce during testing</li>
                        <li>• May work perfectly for extended periods</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="text-white font-medium mb-2">Probable Causes</h6>
                      <ul className="text-sm space-y-1">
                        <li>• <strong>Loose Connections:</strong> Terminal screws not tight</li>
                        <li>• <strong>Corroded Contacts:</strong> Oxidation creating resistance</li>
                        <li>• <strong>Cable Flexing:</strong> Wire fatigue in moving applications</li>
                        <li>• <strong>Thermal Cycling:</strong> Expansion/contraction effects</li>
                        <li>• <strong>Vibration Damage:</strong> Mechanical stress on joints</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* EMI Effects */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Electromagnetic Interference (EMI) Effects
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">How EMI Affects Sensor Outputs</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card p-3 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">Common EMI Sources</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Variable Frequency Drives (VFDs):</strong> High-frequency switching</li>
                    <li>• <strong>Welding Equipment:</strong> High current transients</li>
                    <li>• <strong>Radio Transmitters:</strong> High-power RF fields</li>
                    <li>• <strong>Motor Starters:</strong> Contact arcing and switching</li>
                    <li>• <strong>Power Lines:</strong> 50/60Hz and harmonics</li>
                  </ul>
                </div>
                
                <div className="bg-card p-3 rounded border border-gray-600">
                  <h5 className="text-white font-semibold mb-2">EMI Symptoms in Signals</h5>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Noise Spikes:</strong> Sharp peaks in signal</li>
                    <li>• <strong>AC Coupling:</strong> Sinusoidal variations</li>
                    <li>• <strong>Signal Offset:</strong> DC bias changes</li>
                    <li>• <strong>Loss of Resolution:</strong> Reduced measurement precision</li>
                    <li>• <strong>False Alarms:</strong> Spurious high/low signals</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-card p-3 rounded border border-gray-600">
                <h5 className="text-white font-semibold mb-2">EMI Diagnosis Techniques</h5>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Correlation Testing:</strong> Check if interference correlates with nearby equipment operation</li>
                  <li>• <strong>Shield Effectiveness:</strong> Test signal quality with and without cable shielding</li>
                  <li>• <strong>Frequency Analysis:</strong> Use spectrum analyser to identify interference frequencies</li>
                  <li>• <strong>Isolation Testing:</strong> Temporarily relocate or power down suspected sources</li>
                  <li>• <strong>Time Domain:</strong> Capture interference patterns using oscilloscope</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Diagnostic Guide */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-yellow-400" />
                Signal Symptom Diagnostic Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <h4 className="text-yellow-400 font-semibold mb-3">Quick Reference for Signal Interpretation</h4>
              
              <div className="bg-card p-4 rounded border border-gray-600">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-white font-semibold mb-3">Signal Value Analysis</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-red-400">0.00mA</span>
                        <span className="text-sm">→ Open circuit/no power</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-yellow-400">4.00mA (fixed)</span>
                        <span className="text-sm">→ Sensor failure</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-orange-400">4-20mA (noisy)</span>
                        <span className="text-sm">→ EMI/grounding</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-yellow-400">Drifting slowly</span>
                        <span className="text-sm">→ Component aging</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-purple-400">On/off randomly</span>
                        <span className="text-sm">→ Loose connection</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-3">First Test Actions</h5>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-red-400">0mA:</span> Check power, then continuity
                      </div>
                      <div className="text-sm">
                        <span className="text-yellow-400">Fixed 4mA:</span> Calibrate or replace sensor
                      </div>
                      <div className="text-sm">
                        <span className="text-orange-400">Noisy:</span> Check shielding and earthing
                      </div>
                      <div className="text-sm">
                        <span className="text-yellow-400">Drifting:</span> Check calibration and temperature
                      </div>
                      <div className="text-sm">
                        <span className="text-purple-400">Intermittent:</span> Check all connections
                      </div>
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
                Tank Level Signal Showing Sudden Jumps
              </p>
              <p>
                A tank level signal shows sudden jumps every few hours, making process control 
                difficult. The pattern suggests electromagnetic interference, leading to a 
                systematic investigation of potential sources.
              </p>
              <div className="bg-card p-3 rounded border border-gray-600">
                <h5 className="text-yellow-400 font-semibold text-sm mb-2">Symptom Analysis:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Signal jumps 2-3mA suddenly then returns to normal</li>
                  <li>• Occurs every 2-4 hours with no process correlation</li>
                  <li>• Other nearby instruments unaffected</li>
                  <li>• Jumps always upward, never downward</li>
                  <li>• Duration of each spike approximately 5-10 seconds</li>
                </ul>
              </div>
              <div className="bg-yellow-900/20 p-3 rounded border border-yellow-600/30">
                <h5 className="text-yellow-400 font-semibold text-sm mb-2">Investigation Process:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Correlated timing with nearby equipment schedules</li>
                  <li>• Discovered large pump motor starts matched spike timing</li>
                  <li>• Found loose shield connection on transmitter cable</li>
                  <li>• EMI from motor starter coupling into unshielded portion</li>
                </ul>
              </div>
              <div className="bg-green-900/20 p-3 rounded border border-green-600/30">
                <h5 className="text-green-400 font-semibold text-sm mb-2">Resolution:</h5>
                <p className="text-sm">
                  Eventually traced to a loose shield on the loop cable picking up EMI from a 
                  nearby pump motor starter. Repairing the shield connection eliminated the 
                  interference, demonstrating how symptom analysis guides effective diagnosis.
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
                Symptoms often tell the full story. Learn to interpret them properly and trace 
                faults quickly. Understanding characteristic signal patterns for different failure 
                modes enables rapid diagnosis and prevents unnecessary component replacement, 
                reducing downtime and maintenance costs.
              </p>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <InstrumentationQuiz 
            questions={[
              {
                id: 1,
                question: "What might a flat 0mA signal indicate?",
                options: [
                  "Normal operation at minimum scale",
                  "Open circuit or power supply failure preventing current flow",
                  "Sensor reading exactly zero",
                  "Calibration is perfect"
                ],
                correctAnswer: 1,
                explanation: "A 0mA signal indicates no current flow, typically caused by open circuits, power supply failure, blown fuses, or broken connections."
              },
              {
                id: 2,
                question: "What does signal drift usually suggest?",
                options: [
                  "Perfect calibration",
                  "Component aging, temperature effects, or calibration degradation over time",
                  "Intermittent connection",
                  "EMI interference"
                ],
                correctAnswer: 1,
                explanation: "Signal drift indicates gradual changes over time, typically caused by component aging, temperature effects, calibration degradation, or process fouling."
              },
              {
                id: 3,
                question: "How can EMI affect sensor outputs?",
                options: [
                  "It improves signal quality",
                  "It causes noise spikes, signal offset, AC coupling, and false alarms",
                  "It has no effect on sensors",
                  "It only affects digital signals"
                ],
                correctAnswer: 1,
                explanation: "EMI creates various signal disturbances including noise spikes, sinusoidal variations, DC bias changes, and can trigger false alarms in measurement systems."
              },
              {
                id: 4,
                question: "What's a likely cause of intermittent failure?",
                options: [
                  "Perfect wiring",
                  "Loose connections, corroded contacts, cable flexing, or vibration damage",
                  "Stable power supply",
                  "Good calibration"
                ],
                correctAnswer: 1,
                explanation: "Intermittent failures are typically caused by mechanical issues like loose connections, corroded contacts, cable fatigue, thermal cycling, or vibration damage."
              },
              {
                id: 5,
                question: "What does a stable 4mA with no response to change suggest?",
                options: [
                  "Perfect operation",
                  "Power supply failure",
                  "Sensor element failure or transmitter electronics fault with healthy loop wiring",
                  "Open circuit"
                ],
                correctAnswer: 2,
                explanation: "A fixed 4mA signal indicates the loop wiring and power are healthy, but the sensor element or transmitter electronics have failed, preventing response to process changes."
            }
            ]}
            title="Section 2 Knowledge Check"
          />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="/study-centre/upskilling/instrumentation-module-8-section-1">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/study-centre/upskilling/instrumentation-module-8-section-3">
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

export default InstrumentationModule8Section2;