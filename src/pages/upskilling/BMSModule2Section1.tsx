import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ToggleLeft, Target, CheckCircle, AlertTriangle, Zap, Settings, Activity, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule2Section1QuizData } from '@/data/upskilling/bmsModule2Section1QuizData';

const BMSModule2Section1 = () => {
  const [inlineChecks, setInlineChecks] = useState<Record<string, number | null>>({
    check1: null,
    check2: null,
    check3: null,
    check4: null
  });

  // SEO
  useEffect(() => {
    const title = 'Digital vs Analog Inputs and Outputs | BMS Module 2 Section 1';
    document.title = title;
    const desc = 'Learn the differences between digital and analog signals in Building Management Systems. Understand DI, DO, AI, AO signal types for proper BMS installation and wiring.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

  const handleInlineAnswer = (checkId: string, answerIndex: number) => {
    setInlineChecks(prev => ({ ...prev, [checkId]: answerIndex }));
  };

  const InlineCheck = ({ 
    id, 
    question, 
    options, 
    correctAnswer, 
    explanation 
  }: { 
    id: string; 
    question: string; 
    options: string[]; 
    correctAnswer: number; 
    explanation: string; 
  }) => {
    const selectedAnswer = inlineChecks[id];
    const showFeedback = selectedAnswer !== null;

    return (
      <Card className="bg-card border-gray-700 mt-4">
        <CardContent className="p-4">
          <p className="text-white font-medium mb-3">{question}</p>
          <div className="space-y-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleInlineAnswer(id, index)}
                disabled={showFeedback}
                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                  showFeedback
                    ? index === correctAnswer
                      ? 'border-green-500 bg-green-500/20 text-white'
                      : selectedAnswer === index
                      ? 'border-red-500 bg-red-500/20 text-white'
                      : 'border-gray-600 bg-gray-800 text-white'
                    : selectedAnswer === index
                    ? 'border-yellow-400 bg-yellow-600/20 text-white'
                    : 'border-gray-600 bg-gray-800 text-white hover:border-gray-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    showFeedback
                      ? index === correctAnswer
                        ? 'border-green-500 bg-green-500'
                        : selectedAnswer === index
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-500'
                      : selectedAnswer === index
                      ? 'border-yellow-400 bg-yellow-400'
                      : 'border-gray-500'
                  }`}>
                    {showFeedback && index === correctAnswer && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                    {showFeedback && selectedAnswer === index && index !== correctAnswer && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                    {!showFeedback && selectedAnswer === index && (
                      <div className="w-2 h-2 rounded-full bg-black"></div>
                    )}
                  </div>
                  <span className="text-sm">{option}</span>
                </div>
              </button>
            ))}
          </div>
          {showFeedback && (
            <div className="mt-3 p-3 bg-blue-900/30 border border-blue-700/50 rounded-lg">
              <p className="text-blue-200 text-sm">{explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12">
        <Link to="../bms-module-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-6 sm:mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
          {/* Header */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <ToggleLeft className="h-8 w-8 text-yellow-400 flex-shrink-0" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Digital vs Analog Inputs and Outputs
                </h1>
                <p className="text-base text-white mt-2">
                  Signal types and processing methods
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                Section 1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                20 min read
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base sm:text-lg leading-relaxed">
                Building Management Systems (BMS) rely on inputs and outputs (I/O) to monitor conditions and control equipment. 
                These signals are either <strong>digital</strong> (on/off, open/closed) or <strong>analog</strong> (variable values 
                such as temperature or speed). 
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                Electricians must understand the difference, as wiring, testing, and troubleshooting depend on recognising 
                the correct type of signal. Incorrect installation can lead to system failures and safety hazards.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="mb-4 text-base sm:text-lg">By the end of this section, you should be able to:</p>
              <div className="grid gap-3 sm:gap-4">
                {[
                  "Explain the difference between digital and analog signals",
                  "Identify examples of digital inputs/outputs in a BMS", 
                  "Identify examples of analog inputs/outputs in a BMS",
                  "Understand how signal types affect installation and testing"
                ].map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 1: Digital Inputs */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                1. Digital Inputs (DI)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Digital inputs represent two states: <strong>on/off</strong>, <strong>open/closed</strong>, <strong>true/false</strong>.
                These binary signals are the foundation of BMS monitoring, providing essential status information about building systems.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Common Examples:</h4>
                <ul className="space-y-2 text-white">
                  <li>• <strong>Door contact sensors</strong> (open/closed)</li>
                  <li>• <strong>Flow switches</strong> (water flow/no flow)</li>
                  <li>• <strong>Alarm contacts</strong> (triggered/not triggered)</li>
                  <li>• <strong>Pressure switches</strong> (high/low pressure)</li>
                  <li>• <strong>Window contacts</strong> (security monitoring)</li>
                  <li>• <strong>Filter status switches</strong> (clean/dirty indication)</li>
                  <li>• <strong>Smoke detector contacts</strong> (normal/alarm state)</li>
                </ul>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-200 mb-2">Wiring and Installation Details</h4>
                    <p className="text-blue-100 text-sm sm:text-base mb-3">
                      Digital inputs typically use low-voltage signals (24V DC/AC) and require clean, dry contacts. 
                      Always check polarity requirements in manufacturer specifications.
                    </p>
                    <div className="space-y-2 text-blue-100 text-sm">
                      <p><strong>Terminal Connections:</strong> Use dedicated DI terminals, typically numbered sequentially (DI1, DI2, etc.)</p>
                      <p><strong>Voltage Levels:</strong> Most systems accept 24V DC, some 12V or 48V depending on equipment</p>
                      <p><strong>Contact Types:</strong> Normally open (NO), normally closed (NC), or changeover contacts acceptable</p>
                      <p><strong>Pull-up Resistors:</strong> Many BMS controllers include internal pull-up resistors for clean switching</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-200 mb-2">Signal Processing & Conditioning</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-purple-100 text-sm">
                  <div>
                    <h5 className="font-medium text-purple-300 mb-2">Debouncing</h5>
                    <p>Eliminates contact bounce when switches operate, preventing false multiple triggers</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300 mb-2">Isolation</h5>
                    <p>Optical isolation protects BMS controller from voltage spikes and ground loops</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-2">Troubleshooting Common Issues</h4>
                <div className="space-y-3 text-green-100 text-sm">
                  <div>
                    <h5 className="font-medium text-green-300">Contact Bounce</h5>
                    <p>Symptoms: Multiple rapid on/off readings. Solution: Check debouncing settings in BMS software</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Voltage Drop</h5>
                    <p>Symptoms: Intermittent readings. Solution: Check cable length, use appropriate wire gauge, verify supply voltage</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">False Triggers</h5>
                    <p>Symptoms: Unwanted switching. Solution: Check for electrical interference, improve cable routing, use screened cables</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">BS 7671 Compliance Requirements</h4>
                <div className="space-y-2 text-amber-100 text-sm">
                  <p><strong>Voltage Classification:</strong> SELV (Safety Extra Low Voltage) systems under 50V AC/120V DC</p>
                  <p><strong>Isolation:</strong> Maintain separation from mains circuits - minimum 3mm clearance</p>
                  <p><strong>Cable Selection:</strong> Use appropriate insulation rating, typically 300/500V minimum</p>
                  <p><strong>Earthing:</strong> Functional earth connections for screen termination where required</p>
                </div>
              </div>

              <InlineCheck
                id="check1"
                question="Give one example of a digital input in a BMS."
                options={[
                  "Temperature sensor reading 22°C",
                  "Variable fan speed control at 60%", 
                  "Door contact sensor showing open/closed",
                  "Humidity sensor at 45% RH"
                ]}
                correctAnswer={2}
                explanation="Door contact sensors are digital inputs as they provide only two states - open or closed. Temperature and humidity sensors provide variable analog readings."
              />
            </CardContent>
          </Card>

          {/* Section 2: Digital Outputs */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Settings className="h-6 w-6 text-yellow-400" />
                2. Digital Outputs (DO)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Digital outputs control devices in binary form: <strong>on/off</strong> switching only.
                They provide the interface between BMS logic and building equipment, enabling automated control of systems.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Common Examples:</h4>
                <ul className="space-y-2 text-white">
                  <li>• <strong>Switching a fan on or off</strong></li>
                  <li>• <strong>Operating lighting relays</strong></li>
                  <li>• <strong>Triggering alarms or status indicators</strong></li>
                  <li>• <strong>Starting/stopping pumps</strong></li>
                  <li>• <strong>Motorised damper open/closed control</strong></li>
                  <li>• <strong>Boiler/chiller enable signals</strong></li>
                  <li>• <strong>Emergency stop activation</strong></li>
                  <li>• <strong>Access control door locks</strong></li>
                </ul>
              </div>

              <div className="bg-orange-900/20 border border-orange-700/50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-orange-200 mb-2">Load Switching and Electrical Protection</h4>
                    <p className="text-orange-100 text-sm sm:text-base mb-3">
                      Digital outputs are often linked to relays or contactors to handle larger loads. 
                      The BMS controller typically provides low-voltage switching that operates higher-voltage equipment.
                    </p>
                    <div className="space-y-2 text-orange-100 text-sm">
                      <p><strong>Relay Sizing:</strong> Calculate coil voltage/current requirements - typically 24V DC, 10-50mA</p>
                      <p><strong>Contact Ratings:</strong> Ensure relay contacts can handle switched load (current and voltage)</p>
                      <p><strong>Load Calculations:</strong> Factor in inrush current for motors, transformers, and fluorescent lighting</p>
                      <p><strong>Arc Suppression:</strong> Use snubber circuits or spark quench diodes for inductive loads</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-200 mb-2">Control Logic and Safety Interlocking</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-red-100 text-sm">
                  <div>
                    <h5 className="font-medium text-red-300 mb-2">Interlocking Systems</h5>
                    <p>Prevent unsafe equipment combinations - e.g., heating and cooling simultaneously operating</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300 mb-2">Sequencing Control</h5>
                    <p>Time delays between start sequences to prevent excessive electrical demand</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300 mb-2">Safety Shutoffs</h5>
                    <p>Emergency stop functions that override normal BMS control when activated</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300 mb-2">Fail-Safe Operation</h5>
                    <p>Define default states during power loss or communication failure</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2">Installation Practices and Testing</h4>
                <div className="space-y-3 text-blue-100 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-300">Cable Sizing</h5>
                    <p>Use BS 7671 current carrying capacity tables. Consider voltage drop over long runs, minimum 1.5mm² for relay coils</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Termination Methods</h5>
                    <p>Use appropriate terminals - typically screw terminals for field connections, crimp terminals for panel work</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Testing Procedures</h5>
                    <p>Verify correct operation under load conditions, check switching times, confirm interlock functions work correctly</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-200 mb-2">Voltage Compatibility and Isolation</h4>
                <div className="space-y-2 text-purple-100 text-sm">
                  <p><strong>24V Systems:</strong> Most common for BMS digital outputs, SELV classification</p>
                  <p><strong>48V Systems:</strong> Used in larger installations, still SELV but higher power capability</p>
                  <p><strong>230V Switching:</strong> Via contactors/relays only, never direct from BMS controller</p>
                  <p><strong>Isolation Requirements:</strong> Maintain separation between SELV and LV circuits per BS 7671</p>
                </div>
              </div>

              <InlineCheck
                id="check2"
                question="What type of BMS output would switch a fan on or off?"
                options={[
                  "Analog output providing variable speed",
                  "Digital output providing on/off control", 
                  "Pulse width modulated signal",
                  "Variable frequency drive output"
                ]}
                correctAnswer={1}
                explanation="A digital output provides on/off control for switching a fan. For variable speed control, you would need an analog output to a variable frequency drive."
              />
            </CardContent>
          </Card>

          {/* Section 3: Analog Inputs */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Activity className="h-6 w-6 text-yellow-400" />
                3. Analog Inputs (AI)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Analog inputs provide <strong>variable data</strong> to the BMS, representing continuous measurements.
                These signals enable precise monitoring and control of building environmental conditions.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Common Examples:</h4>
                <ul className="space-y-2 text-white">
                  <li>• <strong>Temperature sensors</strong> (0–50°C)</li>
                  <li>• <strong>Humidity sensors</strong> (0–100% RH)</li>
                  <li>• <strong>CO₂ concentration</strong> (0-2000 ppm)</li>
                  <li>• <strong>Pressure transmitters</strong> (0-10 bar)</li>
                  <li>• <strong>Light level sensors</strong> (0-1000 lux)</li>
                  <li>• <strong>Air velocity sensors</strong> (0-30 m/s)</li>
                  <li>• <strong>Power meters</strong> (kW, kVA, power factor)</li>
                  <li>• <strong>Water flow meters</strong> (litres/minute)</li>
                </ul>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-2">Signal Ranges and Types</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-green-300 mb-2">Voltage Signals</h5>
                    <ul className="text-sm space-y-1 text-green-100">
                      <li>• 0–10V DC (most common)</li>
                      <li>• 0–5V DC</li>
                      <li>• 2–10V DC</li>
                      <li>• ±10V (bipolar signals)</li>
                      <li>• 1–5V DC (some sensors)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300 mb-2">Current Signals</h5>
                    <ul className="text-sm space-y-1 text-green-100">
                      <li>• 4–20mA (industry standard)</li>
                      <li>• 0–20mA</li>
                      <li>• Better noise immunity than voltage</li>
                      <li>• Self-diagnosing (below 4mA = fault)</li>
                      <li>• Suitable for long cable runs</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2">Signal Conditioning and Processing</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-blue-100 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-300 mb-2">Amplification</h5>
                    <p>Weak sensor signals boosted to standard ranges for accurate BMS processing</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300 mb-2">Filtering</h5>
                    <p>Remove electrical noise and smooth rapid fluctuations for stable readings</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300 mb-2">Linearisation</h5>
                    <p>Convert non-linear sensor outputs to linear scales for easier programming</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300 mb-2">Calibration</h5>
                    <p>Adjust zero and span settings to match known reference standards</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">Wiring Best Practices and EMC</h4>
                <div className="space-y-3 text-amber-100 text-sm">
                  <div>
                    <h5 className="font-medium text-amber-300">Screened Cables</h5>
                    <p>Use individually screened pairs for each analog signal. Terminate screens at one end only to prevent ground loops</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">Star Earthing</h5>
                    <p>Connect all analog signal screens to a single earth point to minimise noise pickup</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">Cable Separation</h5>
                    <p>Keep analog signal cables separate from power cables. Minimum 300mm spacing, cross at 90° if necessary</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">EMC Considerations</h5>
                    <p>Use twisted pair construction, avoid running parallel to fluorescent lighting or switch mode power supplies</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-200 mb-2">Calibration and Testing Procedures</h4>
                <div className="space-y-3 text-purple-100 text-sm">
                  <div>
                    <h5 className="font-medium text-purple-300">Zero and Span Adjustments</h5>
                    <p>Set minimum reading (zero) and maximum reading (span) to match sensor specifications using calibrated test equipment</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300">Range Setting</h5>
                    <p>Configure BMS input ranges to match sensor output - e.g., 0-10V = 0-50°C for temperature sensor</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300">Accuracy Verification</h5>
                    <p>Compare BMS readings with calibrated reference instruments at multiple points across the range</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300">Loop Testing</h5>
                    <p>Test complete signal path from sensor through to BMS display, including any signal conditioning equipment</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-200 mb-2">Environmental Factors and Drift Management</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-red-100 text-sm">
                  <div>
                    <h5 className="font-medium text-red-300 mb-2">Temperature Compensation</h5>
                    <p>Account for ambient temperature effects on sensor accuracy, especially for precision applications</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300 mb-2">Humidity Effects</h5>
                    <p>Protect connections from moisture ingress, use IP-rated enclosures in damp locations</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300 mb-2">Long-term Drift</h5>
                    <p>Schedule regular calibration checks, monitor for gradual changes in sensor performance</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300 mb-2">Fault Diagnosis</h5>
                    <p>Use signal injection techniques to isolate sensor, wiring, or controller faults</p>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="check3"
                question="What signal range might a temperature sensor send to a BMS?"
                options={[
                  "230V AC mains voltage",
                  "0-10V DC or 4-20mA signal", 
                  "High frequency digital pulses",
                  "24V AC on/off switching"
                ]}
                correctAnswer={1}
                explanation="Temperature sensors typically send analog signals in the range of 0-10V DC or 4-20mA to represent variable temperature readings. These are standard analog signal ranges for BMS applications."
              />
            </CardContent>
          </Card>

          {/* Section 4: Analog Outputs */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Gauge className="h-6 w-6 text-yellow-400" />
                4. Analog Outputs (AO)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Analog outputs allow the BMS to control devices with <strong>variable outputs</strong>, providing smooth, 
                continuous control instead of binary switching. They form the control interface for precise equipment modulation.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Common Examples:</h4>
                <ul className="space-y-2 text-white">
                  <li>• <strong>Variable frequency drives</strong> (controlling fan/pump speed 0-100%)</li>
                  <li>• <strong>Motorised valve actuators</strong> (adjusting to 40% open)</li>
                  <li>• <strong>Lighting dimming systems</strong> (10–100% brightness)</li>
                  <li>• <strong>Damper actuators</strong> (precise airflow control)</li>
                  <li>• <strong>Electric heating elements</strong> (modulated power control)</li>
                  <li>• <strong>Cooling coil valves</strong> (chilled water flow control)</li>
                  <li>• <strong>Heat recovery wheels</strong> (variable speed control)</li>
                  <li>• <strong>Economiser dampers</strong> (fresh air mixing control)</li>
                </ul>
              </div>

              <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-purple-200 mb-2">Control Algorithms and Modulation</h4>
                    <p className="text-purple-100 text-sm sm:text-base mb-3">
                      Analog outputs enable precise control and energy efficiency. For example, a fan can run at 
                      60% speed when only partial cooling is needed, rather than just on/off operation.
                    </p>
                    <div className="space-y-2 text-purple-100 text-sm">
                      <p><strong>PID Control Basics:</strong> Proportional, Integral, Derivative control for stable, accurate response</p>
                      <p><strong>Modulation Techniques:</strong> PWM (Pulse Width Modulation) for efficient power control</p>
                      <p><strong>Response Tuning:</strong> Adjust controller gains to prevent oscillation and overshoot</p>
                      <p><strong>Setpoint Tracking:</strong> Smooth transitions prevent equipment stress and energy waste</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-2">Load Matching and Drive Capabilities</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-green-100 text-sm">
                  <div>
                    <h5 className="font-medium text-green-300 mb-2">Output Impedance</h5>
                    <p>Match controller output impedance to load input impedance for maximum power transfer and accuracy</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300 mb-2">Current Sourcing/Sinking</h5>
                    <p>Voltage outputs source current, current outputs sink current. Check compatibility with connected devices</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300 mb-2">Drive Capabilities</h5>
                    <p>Typical: 0-10V up to 10mA, 4-20mA up to 500Ω load resistance maximum</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300 mb-2">Signal Isolation</h5>
                    <p>Galvanic isolation prevents ground loops and protects sensitive BMS electronics</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2">Actuator Integration and Feedback</h4>
                <div className="space-y-3 text-blue-100 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-300">Valve Positioning Feedback</h5>
                    <p>Use position feedback signals (often 0-10V or 4-20mA) to verify actual valve position matches commanded position</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Motor Speed Control</h5>
                    <p>VFD speed reference typically 0-10V or 4-20mA, with actual speed feedback for closed-loop control</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Positioning Accuracy</h5>
                    <p>±1% accuracy typical for quality actuators, ±2-3% acceptable for less critical applications</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Response Time</h5>
                    <p>Consider actuator stroke time - typically 60-180 seconds for full travel on HVAC applications</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-900/20 border border-orange-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-orange-200 mb-2">Performance Optimisation</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-orange-100 text-sm">
                  <div>
                    <h5 className="font-medium text-orange-300 mb-2">Response Times</h5>
                    <p>Fast response needed for critical control loops, slower for comfort applications to prevent hunting</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-orange-300 mb-2">Resolution</h5>
                    <p>12-bit (0.025%) to 16-bit (0.0015%) resolution available, choose based on application requirements</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-orange-300 mb-2">Stability</h5>
                    <p>Temperature drift typically ±0.1%/°C, calibrate in operating environment for best accuracy</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-orange-300 mb-2">Linearisation</h5>
                    <p>Square root extraction for flow control, characterised curves for valve applications</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-200 mb-2">Commissioning and Performance Testing</h4>
                <div className="space-y-3 text-red-100 text-sm">
                  <div>
                    <h5 className="font-medium text-red-300">Signal Verification</h5>
                    <p>Use calibrated multimeter to verify output signals at multiple setpoints - 0%, 25%, 50%, 75%, 100%</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">Loop Tuning</h5>
                    <p>Adjust PID parameters systematically: start with P-only control, add integral, then derivative if needed</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">Performance Testing</h5>
                    <p>Step response tests to verify settling time, overshoot, and steady-state accuracy meet specifications</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">Load Testing</h5>
                    <p>Test under actual operating conditions with real loads to identify any performance issues</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">Installation Standards and Safety</h4>
                <div className="space-y-2 text-amber-100 text-sm">
                  <p><strong>Signal Isolation:</strong> Maintain galvanic isolation between BMS and field devices where specified</p>
                  <p><strong>Earth-Free Signals:</strong> Many analog outputs are earth-free; check earthing requirements carefully</p>
                  <p><strong>Overload Protection:</strong> Install appropriate fusing/protection for output circuits per manufacturer specification</p>
                  <p><strong>EMC Compliance:</strong> Use appropriate cable types and installation methods to meet EMC regulations</p>
                  <p><strong>Environmental Protection:</strong> IP ratings appropriate for installation environment, consider temperature extremes</p>
                </div>
              </div>

              <InlineCheck
                id="check4"
                question="What kind of device would an analog output control that requires variable positioning?"
                options={[
                  "A simple on/off relay for lighting",
                  "A motorised valve actuator that can be positioned anywhere from 0-100% open", 
                  "An alarm beacon with fixed brightness",
                  "A door contact sensor for monitoring"
                ]}
                correctAnswer={1}
                explanation="Motorised valve actuators require analog outputs because they need precise positioning control (e.g., 40% open, 75% open). This variable control allows for accurate flow regulation and energy efficiency."
              />
            </CardContent>
          </Card>

          {/* Practical Guidance */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                Practical Guidance for Electricians
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-200 mb-3">Essential Best Practices</h4>
                <ul className="space-y-2 text-yellow-100">
                  <li>• <strong>Always confirm</strong> whether a point is digital or analog before wiring</li>
                  <li>• <strong>Label terminations clearly</strong> (DI, DO, AI, AO) to avoid confusion during commissioning</li>
                  <li>• <strong>Be careful with analog wiring</strong> — poor connections cause inaccurate readings</li>
                  <li>• <strong>Use a multimeter</strong> to check 0–10V or 4–20mA signals when commissioning</li>
                  <li>• <strong>Follow cable segregation</strong> — keep analog signals away from mains power cables</li>
                  <li>• <strong>Use screened cables</strong> for analog signals in electrically noisy environments</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Real World Example */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                Real World Example
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-200 mb-3">The Temperature Sensor Mistake</h4>
                <p className="text-red-100 text-sm sm:text-base leading-relaxed mb-3">
                  On a commercial project, an electrician wired a temperature sensor (analog input) into a 
                  digital input terminal by mistake. The BMS only read the signal as "on/off" instead of 
                  a variable temperature, leading to incorrect HVAC control.
                </p>
                <p className="text-red-100 text-sm sm:text-base leading-relaxed mb-3">
                  The system either ran heating at full blast or turned it off completely, causing 
                  uncomfortable conditions and energy waste.
                </p>
                <div className="bg-green-900/30 border border-green-700/50 rounded p-3">
                  <h5 className="font-medium text-green-200 mb-1">Resolution:</h5>
                  <p className="text-green-100 text-sm">
                    The issue was resolved by rewiring the temperature sensor into the correct analog input 
                    terminal — but it caused delays during commissioning and frustrated the client.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <div className="grid gap-3 sm:gap-4">
                {[
                  "Digital signals = on/off, open/closed states only",
                  "Analog signals = variable values (e.g., 0–10V, 4–20mA)",
                  "Digital inputs/outputs control binary states; analog inputs/outputs provide or adjust continuous values", 
                  "Correct wiring and labelling are critical to avoid faults and system failures",
                  "Always verify signal type before termination to prevent commissioning delays"
                ].map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{point}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <SingleQuestionQuiz 
            questions={bmsModule2Section1QuizData}
            title="Digital vs Analog I/O Quiz"
          />

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <Link to="../bms-module-2">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card/80 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Module 2
              </Button>
            </Link>
            <Link to="../bms-module-2-section-2">
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

export default BMSModule2Section1;