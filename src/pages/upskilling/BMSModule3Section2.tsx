import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Gauge, CheckCircle, AlertTriangle, Target, Settings, Activity, Thermometer, Droplets, TrendingUp, Zap, Wind, BarChart3, Cog, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule3Section2QuizData } from '@/data/upskilling/bmsModule3Section2QuizData';
import { useIsMobile } from '@/hooks/use-mobile';

const BMSModule3Section2 = () => {
  const isMobile = useIsMobile();
  const [inlineChecks, setInlineChecks] = useState<Record<string, number | null>>({
    check1: null,
    check2: null,
    check3: null,
    check4: null,
    check5: null,
    check6: null,
    check7: null,
    check8: null,
  });

  useEffect(() => {
    document.title = 'Control Strategies | BMS Module 3 Section 2';
    const desc = 'Master advanced BMS control strategies including PID control, system commissioning, and troubleshooting. Learn temperature, pressure, and flow control with practical examples and real-world case studies.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;
  }, []);

  const handleInlineCheck = (checkId: string, selectedAnswer: number) => {
    setInlineChecks(prev => ({ ...prev, [checkId]: selectedAnswer }));
  };

  const InlineCheckComponent = ({ 
    checkId, 
    question, 
    options, 
    correctAnswer, 
    explanation 
  }: { 
    checkId: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }) => {
    const selectedAnswer = inlineChecks[checkId];
    const isAnswered = selectedAnswer !== null;

    return (
      <Card className="bg-card border-gray-700 mt-4">
        <CardContent className="p-4">
          <p className="text-white font-medium mb-3">{question}</p>
          <div className="space-y-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleInlineCheck(checkId, index)}
                disabled={isAnswered}
                className="w-full text-left p-3 rounded-lg border border-gray-600 bg-gray-800 text-white hover:border-gray-500"
              >
                <span className="text-sm">{option}</span>
              </button>
            ))}
          </div>
          {isAnswered && (
            <div className="mt-3 p-3 bg-blue-900/30 border border-blue-700/50 rounded-lg">
              <p className="text-blue-200 text-sm">{explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12">
        <Link to="../bms-module-3">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-6 sm:mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
          {/* Header */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <Gauge className="h-8 w-8 text-yellow-400 flex-shrink-0" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Control Strategies
                </h1>
                <p className="text-base text-white mt-2">
                  Temperature, Pressure, and Flow Control
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                Section 2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                28 min read
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
                A Building Management System (BMS) doesn't just switch equipment on and off — it applies control strategies to maintain stable and efficient building operation. These strategies regulate key variables such as temperature, pressure, and flow. Without proper control, HVAC systems would run inefficiently, causing wasted energy, occupant discomfort, and increased wear on equipment.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                Electricians may not be the ones writing control algorithms, but their wiring, sensor placement, and understanding of these strategies are essential to make the BMS operate as intended.
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
                  "Explain the purpose and implementation of control strategies in BMS",
                  "Compare on/off, proportional, and PID control methods with practical applications",
                  "Understand advanced control algorithms and their real-world benefits",
                  "Describe temperature, pressure, and flow control strategies with specific examples",
                  "Identify system commissioning requirements and testing procedures",
                  "Diagnose control issues and implement effective troubleshooting strategies",
                  "Apply BS 7671 and manufacturer requirements to maintain system performance",
                  "Recognise how proper installation and commissioning affect long-term control accuracy"
                ].map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 1: Temperature Control */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Thermometer className="h-6 w-6 text-yellow-400" />
                1. Temperature Control
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Temperature control is the foundation of HVAC automation, with different control strategies offering varying levels of 
                precision, comfort, and energy efficiency. Understanding these methods is essential for proper system design and commissioning.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Control Method Comparison:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-2 text-white">Method</th>
                        <th className="text-left py-2 text-white">Accuracy</th>
                        <th className="text-left py-2 text-white">Comfort</th>
                        <th className="text-left py-2 text-white">Energy Efficiency</th>
                        <th className="text-left py-2 text-white">Implementation</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      <tr className="border-b border-gray-700">
                        <td className="py-2 font-medium">On/Off</td>
                        <td className="py-2">±2-3°C</td>
                        <td className="py-2">Poor</td>
                        <td className="py-2">Fair</td>
                        <td className="py-2">Simple</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 font-medium">Proportional</td>
                        <td className="py-2">±1°C</td>
                        <td className="py-2">Good</td>
                        <td className="py-2">Good</td>
                        <td className="py-2">Moderate</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">PID</td>
                        <td className="py-2">±0.5°C</td>
                        <td className="py-2">Excellent</td>
                        <td className="py-2">Excellent</td>
                        <td className="py-2">Complex</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">On/Off Control (Digital):</h4>
                <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-red-200 mb-2">Characteristics and Limitations</h5>
                  <div className="space-y-2 text-red-100 text-sm">
                    <p><strong>Operation:</strong> Equipment switches on at set point + deadband, off at set point - deadband</p>
                    <p><strong>Example:</strong> Fan coil switches on at 23°C, off at 21°C (2°C deadband)</p>
                    <p><strong>Problems:</strong> Temperature oscillation, occupant discomfort, equipment cycling stress</p>
                    <p><strong>Energy Impact:</strong> Overshooting wastes energy, undershooting reduces comfort</p>
                  </div>
                </div>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Advantages:</strong> Simple wiring, low cost, reliable for basic applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Applications:</strong> Frost protection, basic ventilation, simple heating systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Limitations:</strong> Wide temperature swings (±2-3°C), equipment wear from cycling</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Proportional Control (Analog):</h4>
                <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-blue-200 mb-2">How Proportional Control Works</h5>
                  <div className="space-y-2 text-blue-100 text-sm">
                    <p><strong>Principle:</strong> Output varies linearly with temperature deviation from set point</p>
                    <p><strong>Formula:</strong> Output = Kp × (Set Point - Actual Temperature)</p>
                    <p><strong>Example:</strong> 21°C set point, valve opens 50% at 20°C, 100% at 19°C</p>
                    <p><strong>Proportional Band:</strong> Temperature range over which output varies from 0-100%</p>
                  </div>
                </div>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Better Control:</strong> Gradual adjustment prevents overshooting and oscillation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Applications:</strong> Motorised valves, VFD fan control, modulating dampers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Limitation:</strong> Offset error - may not reach exact set point under varying loads</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">PID Control (Advanced):</h4>
                <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-amber-200 mb-2">PID Components Explained</h5>
                  <div className="space-y-3 text-amber-100 text-sm">
                    <div>
                      <p><strong>Proportional (P):</strong> Responds to current error magnitude</p>
                      <p>Higher gain = faster response but potential for oscillation</p>
                    </div>
                    <div>
                      <p><strong>Integral (I):</strong> Eliminates steady-state offset error</p>
                      <p>Accumulates error over time to reach exact set point</p>
                    </div>
                    <div>
                      <p><strong>Derivative (D):</strong> Responds to rate of change</p>
                      <p>Provides stability and reduces overshoot</p>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Precision:</strong> Maintains set point within ±0.5°C under varying conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Applications:</strong> Critical environments, pharmaceutical facilities, data centres</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Tuning Required:</strong> P, I, D parameters must be adjusted for optimal performance</span>
                  </li>
                </ul>
              </div>

              <InlineCheckComponent
                checkId="check1"
                question="What is the main advantage of PID control over simple proportional control?"
                options={[
                  "PID control uses less electrical power",
                  "PID control is easier to install and commission",
                  "PID control eliminates steady-state offset error and provides better stability",
                  "PID control works without any sensors"
                ]}
                correctAnswer={2}
                explanation="PID control combines proportional, integral, and derivative actions. The integral component eliminates steady-state offset error (reaching exact set point), while the derivative component improves stability and reduces overshoot, providing superior control accuracy."
              />

              <InlineCheckComponent
                checkId="check5"
                question="In a proportional control system, what happens when the proportional band is too narrow?"
                options={[
                  "The system becomes more energy efficient",
                  "The system may oscillate and become unstable",
                  "The system responds more slowly",
                  "The system requires less maintenance"
                ]}
                correctAnswer={1}
                explanation="A narrow proportional band means high gain, causing the output to change dramatically for small temperature deviations. This can lead to oscillation and instability. A wider proportional band provides smoother, more stable control."
              />
            </CardContent>
          </Card>

          {/* Section 2: Pressure Control */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-yellow-400" />
                2. Pressure Control Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Pressure control ensures optimal system performance by maintaining correct static and differential pressures. 
                Poor pressure control leads to energy waste, inadequate airflow/water flow, and system imbalances.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Pressure Control Applications:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-2 text-white">System Type</th>
                        <th className="text-left py-2 text-white">Pressure Control</th>
                        <th className="text-left py-2 text-white">Sensor Location</th>
                        <th className="text-left py-2 text-white">Control Device</th>
                        <th className="text-left py-2 text-white">Typical Set Point</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      <tr className="border-b border-gray-700">
                        <td className="py-2">Supply Air Duct</td>
                        <td className="py-2">Static Pressure</td>
                        <td className="py-2">2/3 down main duct</td>
                        <td className="py-2">VFD on Supply Fan</td>
                        <td className="py-2">250-500 Pa</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2">Extract/Return Duct</td>
                        <td className="py-2">Static Pressure</td>
                        <td className="py-2">Main return duct</td>
                        <td className="py-2">VFD on Extract Fan</td>
                        <td className="py-2">-25 to -50 Pa</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2">Chilled Water</td>
                        <td className="py-2">Differential Pressure</td>
                        <td className="py-2">Pump discharge</td>
                        <td className="py-2">VFD on Pump</td>
                        <td className="py-2">200-400 kPa</td>
                      </tr>
                      <tr>
                        <td className="py-2">Heating Water</td>
                        <td className="py-2">Differential Pressure</td>
                        <td className="py-2">Primary circuit</td>
                        <td className="py-2">VFD on Circulator</td>
                        <td className="py-2">100-300 kPa</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Static Pressure Control (Air Systems):</h4>
                <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-blue-200 mb-2">Principle and Operation</h5>
                  <div className="space-y-2 text-blue-100 text-sm">
                    <p><strong>Purpose:</strong> Maintains constant pressure in ductwork regardless of system demand changes</p>
                    <p><strong>Sensor Placement:</strong> Located 2/3 along main duct run for representative reading</p>
                    <p><strong>Control Response:</strong> As dampers open (increased demand), pressure drops, fan speed increases</p>
                    <p><strong>Energy Benefit:</strong> Fan speed reduces during low demand periods, saving significant energy</p>
                  </div>
                </div>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>VAV Systems:</strong> Essential for maintaining airflow to all zones as VAV boxes modulate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Energy Savings:</strong> Fan power reduces as cube of speed (50% speed = 12.5% power)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Commissioning:</strong> Reset schedules can optimise pressure set points based on demand</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Differential Pressure Control (Water Systems):</h4>
                <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-amber-200 mb-2">System Applications and Benefits</h5>
                  <div className="space-y-3 text-amber-100 text-sm">
                    <div>
                      <p><strong>Chilled Water Systems:</strong> Maintains pressure difference across coils for proper heat transfer</p>
                      <p>Prevents starvation of remote coils during high cooling demand</p>
                    </div>
                    <div>
                      <p><strong>Heating Systems:</strong> Ensures adequate flow through radiators and fan coil units</p>
                      <p>Prevents pump cavitation and excessive noise</p>
                    </div>
                    <div>
                      <p><strong>Primary/Secondary Systems:</strong> Maintains hydraulic separation between circuits</p>
                      <p>Allows different zones to operate independently</p>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Pump Modulation:</strong> VFD controls maintain constant differential pressure as valves modulate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Energy Efficiency:</strong> Pump power reduces during partial load conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>System Protection:</strong> Prevents over-pressurisation and equipment damage</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Advanced Pressure Control Strategies:</h4>
                <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-red-200 mb-2">Reset Strategies and Optimisation</h5>
                  <div className="space-y-2 text-red-100 text-sm">
                    <p><strong>Supply Air Reset:</strong> Reduce duct static pressure when all VAV boxes are satisfied</p>
                    <p><strong>Water Temperature Reset:</strong> Adjust chilled/hot water temperatures based on outdoor conditions</p>
                    <p><strong>Demand-Based Control:</strong> Modulate pressure set points based on actual system demand</p>
                    <p><strong>Trim and Respond:</strong> Continuously optimise set points to minimise energy while maintaining comfort</p>
                  </div>
                </div>
              </div>

              <InlineCheckComponent
                checkId="check2"
                question="Why is differential pressure control essential in chilled water systems?"
                options={[
                  "It reduces the cost of installation",
                  "It prevents pump cavitation and ensures proper flow to all coils",
                  "It eliminates the need for temperature sensors",
                  "It makes the system run quieter"
                ]}
                correctAnswer={1}
                explanation="Differential pressure control maintains the pressure difference needed for proper water flow through all coils, preventing pump cavitation, ensuring remote coils receive adequate flow, and maintaining efficient heat transfer throughout the system."
              />

              <InlineCheckComponent
                checkId="check6"
                question="What is the energy benefit of using supply air reset strategies?"
                options={[
                  "Fans run at constant speed for reliability",
                  "Static pressure set points are reduced when system demand is low, reducing fan energy",
                  "More sensors are used to monitor the system",
                  "Ductwork can be made smaller"
                ]}
                correctAnswer={1}
                explanation="Supply air reset reduces duct static pressure set points when VAV boxes are satisfied (low demand), allowing fans to run at lower speeds. Since fan power varies as the cube of speed, this provides significant energy savings."
              />
            </CardContent>
          </Card>

          {/* Section 3: Flow Control */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Wind className="h-6 w-6 text-yellow-400" />
                3. Flow Control and Management
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Flow control optimises energy delivery by managing air and water flow based on actual demand. Proper flow 
                control prevents energy waste while maintaining comfort and indoor air quality standards.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Flow Control Device Specifications:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-2 text-white">Device Type</th>
                        <th className="text-left py-2 text-white">Control Range</th>
                        <th className="text-left py-2 text-white">Response Time</th>
                        <th className="text-left py-2 text-white">Accuracy</th>
                        <th className="text-left py-2 text-white">Applications</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      <tr className="border-b border-gray-700">
                        <td className="py-2">VAV Box Damper</td>
                        <td className="py-2">10-100% airflow</td>
                        <td className="py-2">15-30 seconds</td>
                        <td className="py-2">±5% flow</td>
                        <td className="py-2">Zone air control</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2">Motorised Water Valve</td>
                        <td className="py-2">0-100% flow</td>
                        <td className="py-2">30-90 seconds</td>
                        <td className="py-2">±2% position</td>
                        <td className="py-2">Coil water control</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2">Fire/Smoke Damper</td>
                        <td className="py-2">Open/Closed</td>
                        <td className="py-2">10-15 seconds</td>
                        <td className="py-2">±1% position</td>
                        <td className="py-2">Life safety systems</td>
                      </tr>
                      <tr>
                        <td className="py-2">Balancing Valve</td>
                        <td className="py-2">Fixed restriction</td>
                        <td className="py-2">N/A - Manual</td>
                        <td className="py-2">±0.5% flow</td>
                        <td className="py-2">System commissioning</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Variable Air Volume (VAV) Control:</h4>
                <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-blue-200 mb-2">VAV System Operation and Benefits</h5>
                  <div className="space-y-3 text-blue-100 text-sm">
                    <div>
                      <p><strong>Zone Control:</strong> Each VAV box serves one zone, modulating airflow based on space temperature</p>
                      <p>Minimum airflow maintained for ventilation requirements (typically 30% of maximum)</p>
                    </div>
                    <div>
                      <p><strong>Pressure Independence:</strong> VAV boxes maintain accurate flow control regardless of duct pressure variations</p>
                      <p>Flow sensors provide feedback for precise control</p>
                    </div>
                    <div>
                      <p><strong>Energy Efficiency:</strong> Reduces fan energy by 40-60% compared to constant volume systems</p>
                      <p>Eliminates energy waste from simultaneous heating and cooling</p>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Terminal Units:</strong> Pressure-independent VAV boxes with integral controllers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Reheat Coils:</strong> Optional electric or water coils for heating when airflow is at minimum</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Fan-Powered Units:</strong> Include integral fans for better air mixing and heating performance</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Water Flow Control Strategies:</h4>
                <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-amber-200 mb-2">Control Valve Selection and Sizing</h5>
                  <div className="space-y-2 text-amber-100 text-sm">
                    <p><strong>Valve Authority:</strong> Pressure drop across valve should be 25-50% of total circuit pressure drop</p>
                    <p><strong>Valve Characteristics:</strong> Linear valves for constant pressure systems, equal percentage for variable pressure</p>
                    <p><strong>Actuator Sizing:</strong> Must overcome valve spring return force plus system pressure differential</p>
                    <p><strong>Fail-Safe Operation:</strong> Valves fail to safe position (typically closed for cooling, open for heating)</p>
                  </div>
                </div>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Two-Way Valves:</strong> Variable flow systems - valve modulates, pump speed varies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Three-Way Valves:</strong> Constant flow systems - valve diverts flow, pump speed constant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Smart Actuators:</strong> Include position feedback and diagnostic capabilities</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Demand-Based Flow Optimisation:</h4>
                <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-red-200 mb-2">Advanced Flow Management Strategies</h5>
                  <div className="space-y-3 text-red-100 text-sm">
                    <div>
                      <p><strong>Occupancy-Based Control:</strong> Reduce ventilation airflow during unoccupied periods</p>
                      <p>CO₂ sensors provide demand-controlled ventilation based on actual occupancy</p>
                    </div>
                    <div>
                      <p><strong>Load-Based Optimisation:</strong> Adjust system flow rates based on actual heating/cooling loads</p>
                      <p>Outside air economiser reduces mechanical cooling when conditions permit</p>
                    </div>
                    <div>
                      <p><strong>Seasonal Adjustments:</strong> Flow rates optimised for seasonal conditions and usage patterns</p>
                      <p>Night setback reduces flows to minimum levels while maintaining building protection</p>
                    </div>
                  </div>
                </div>
              </div>

              <InlineCheckComponent
                checkId="check3"
                question="What is the key advantage of pressure-independent VAV boxes over simple dampers?"
                options={[
                  "They are less expensive to install",
                  "They maintain accurate airflow control regardless of duct pressure variations",
                  "They require less maintenance",
                  "They use less electrical power"
                ]}
                correctAnswer={1}
                explanation="Pressure-independent VAV boxes include integral flow sensors and controllers that maintain accurate airflow regardless of duct pressure variations, ensuring consistent zone control even as other zones' demands change."
              />

              <InlineCheckComponent
                checkId="check7"
                question="Why is valve authority important in water control valve selection?"
                options={[
                  "It determines the valve's electrical power requirements",
                  "It ensures the valve can provide proper flow control across its operating range",
                  "It affects the valve's colour and appearance",
                  "It determines how fast the valve opens and closes"
                ]}
                correctAnswer={1}
                explanation="Valve authority (pressure drop across valve as percentage of total circuit pressure drop) should be 25-50% to ensure the valve can provide proper flow control. Too low authority results in poor control at partial loads."
              />
            </CardContent>
          </Card>

          {/* Section 4: System Commissioning and Testing */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Settings className="h-6 w-6 text-yellow-400" />
                4. System Commissioning and Testing
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Proper commissioning ensures control strategies operate as designed. Without systematic testing, even correctly 
                installed systems may not deliver expected performance, comfort, or energy efficiency.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Commissioning Phase Activities:</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-white mb-2">Pre-Functional Testing</h5>
                    <ul className="space-y-1 text-sm text-white">
                      <li>• Sensor calibration verification</li>
                      <li>• Actuator stroke testing</li>
                      <li>• Control loop configuration</li>
                      <li>• Safety system testing</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-2">Functional Testing</h5>
                    <ul className="space-y-1 text-sm text-white">
                      <li>• End-to-end control verification</li>
                      <li>• Load response testing</li>
                      <li>• Sequence of operations</li>
                      <li>• Energy performance validation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Control Loop Testing Procedures:</h4>
                <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-blue-200 mb-2">Systematic Testing Approach</h5>
                  <div className="space-y-3 text-blue-100 text-sm">
                    <div>
                      <p><strong>Step 1 - Sensor Verification:</strong> Verify sensor readings against calibrated instruments</p>
                      <p>Check temperature sensors with thermometer, pressure sensors with manometer</p>
                    </div>
                    <div>
                      <p><strong>Step 2 - Actuator Testing:</strong> Command actuators through full range, verify position feedback</p>
                      <p>Test fail-safe operation by removing control signals</p>
                    </div>
                    <div>
                      <p><strong>Step 3 - Control Response:</strong> Introduce set point changes, verify appropriate system response</p>
                      <p>Monitor control stability and response time</p>
                    </div>
                    <div>
                      <p><strong>Step 4 - Integration Testing:</strong> Test interactions between interconnected control loops</p>
                      <p>Verify no conflicts or hunting between competing control strategies</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Performance Optimisation:</h4>
                <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-amber-200 mb-2">Tuning and Optimisation Methods</h5>
                  <div className="space-y-2 text-amber-100 text-sm">
                    <p><strong>PID Tuning:</strong> Adjust proportional, integral, and derivative parameters for optimal response</p>
                    <p><strong>Dead Band Adjustment:</strong> Set appropriate dead bands to prevent hunting and excessive cycling</p>
                    <p><strong>Time Delay Settings:</strong> Configure delays to prevent short cycling and allow system stabilisation</p>
                    <p><strong>Reset Schedules:</strong> Program optimal set point adjustments based on operating conditions</p>
                  </div>
                </div>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Trend Logging:</strong> Record system performance data to identify optimisation opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Seasonal Commissioning:</strong> Re-verify performance during different operating conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Continuous Monitoring:</strong> Implement ongoing monitoring to detect performance degradation</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Documentation and Handover:</h4>
                <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                  <h5 className="font-semibold text-red-200 mb-2">Essential Documentation Requirements</h5>
                  <div className="grid sm:grid-cols-2 gap-4 text-red-100 text-sm">
                    <div>
                      <h6 className="font-medium text-red-300 mb-2">Technical Documentation</h6>
                      <p className="mb-2">Control loop diagrams and P&IDs</p>
                      <p className="mb-2">Sensor and actuator schedules</p>
                      <p className="mb-2">Control parameters and set points</p>
                      <p>Commissioning test results</p>
                    </div>
                    <div>
                      <h6 className="font-medium text-red-300 mb-2">Operational Information</h6>
                      <p className="mb-2">Operating procedures and sequences</p>
                      <p className="mb-2">Maintenance schedules and requirements</p>
                      <p className="mb-2">Troubleshooting guides</p>
                      <p>Training materials for operators</p>
                    </div>
                  </div>
                </div>
              </div>

              <InlineCheckComponent
                checkId="check4"
                question="What is the primary purpose of functional testing during BMS commissioning?"
                options={[
                  "To verify the system meets aesthetic requirements",
                  "It causes false readings leading to inefficient operation",
                  "It has no significant impact on performance",
                  "It only affects system startup time"
                ]}
                correctAnswer={1}
                explanation="Poor wiring or sensor placement causes the BMS to receive false readings, leading to inefficient operation. For example, a miswired pressure sensor may cause pumps to run at full speed unnecessarily, wasting energy."
              />
            </CardContent>
          </Card>

          {/* Practical Guidance */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Practical Guidance</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 leading-relaxed">
              <p className="font-semibold">As an electrician:</p>
              
              <ul className="space-y-3 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Always check whether outputs are digital (on/off) or analog (0–10V, 4–20mA) before wiring.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Confirm sensors are correctly located and calibrated — accuracy is key.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Test actuator movement (valves, dampers) to ensure smooth modulation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Work closely with commissioning engineers to verify that temperature, pressure, and flow respond as intended.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Real World Example */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Real World Example</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 leading-relaxed">
              <p>
                In a university campus, a chilled water system was wasting energy because pumps ran continuously at full speed. On investigation, electricians found that the differential pressure sensor was installed in the wrong part of the pipework, giving false readings. After repositioning and rewiring the sensor correctly, the BMS could modulate pump speed properly, reducing energy use by 30% without affecting comfort.
              </p>
              
              <div className="bg-card border border-green-500/30 rounded-lg p-4">
                <p className="text-green-200">
                  <strong>Key Learning:</strong> Correct sensor installation and wiring by electricians are vital for effective BMS control strategies. Poor installation can waste significant energy and compromise system performance.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-3">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Control strategies ensure stable and efficient operation of HVAC systems.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Temperature control: on/off vs proportional (modulating) strategies.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Pressure control: fans (air) and pumps (water) are adjusted to maintain setpoints.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Flow control: dampers and valves regulate airflow and water flow.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Correct wiring and sensor installation by electricians are vital for reliable control.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Knowledge Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-4">
                Test your understanding of BMS control strategies. This quiz covers temperature, pressure, and flow control methods and their practical applications.
              </p>
              <SingleQuestionQuiz 
                questions={bmsModule3Section2QuizData} 
                title="Control Strategies Quiz"
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className={`flex ${isMobile ? 'flex-col gap-3' : 'justify-between'} pt-8`}>
            <Link to="../bms-module-3-section-1" className={isMobile ? 'w-full' : ''}>
              <Button variant="outline" className={`border-gray-600 text-white hover:bg-card ${isMobile ? 'w-full py-3' : ''}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bms-module-3-section-3" className={isMobile ? 'w-full' : ''}>
              <Button className={`bg-yellow-400 text-black hover:bg-yellow-600 ${isMobile ? 'w-full py-3' : ''}`}>
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

export default BMSModule3Section2;