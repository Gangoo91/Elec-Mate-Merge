import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Battery, CheckCircle, AlertTriangle, Target, Settings, Activity, Zap, TrendingDown, Shield, Users, Database, Power } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule3Section4QuizData } from '@/data/upskilling/bmsModule3Section4QuizData';
import { useIsMobile } from '@/hooks/use-mobile';

const BMSModule3Section4 = () => {
  const isMobile = useIsMobile();
  const [inlineChecks, setInlineChecks] = useState<Record<string, number | null>>({
    check1: null,
    check2: null,
    check3: null,
    check4: null,
  });

  useEffect(() => {
    document.title = 'Demand-Based Control and Load Shedding | BMS Module 3 Section 4';
    const desc = 'Master demand-based control and load shedding strategies in BMS. Learn peak load management, energy optimisation, load prioritisation, and real-time demand response for maximum efficiency.';
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
                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                  isAnswered
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
                    isAnswered
                      ? index === correctAnswer
                        ? 'border-green-500 bg-green-500'
                        : selectedAnswer === index
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-500'
                      : selectedAnswer === index
                      ? 'border-yellow-400 bg-yellow-400'
                      : 'border-gray-500'
                  }`}>
                    {isAnswered && index === correctAnswer && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                    {isAnswered && selectedAnswer === index && index !== correctAnswer && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                    {!isAnswered && selectedAnswer === index && (
                      <div className="w-2 h-2 rounded-full bg-black"></div>
                    )}
                  </div>
                  <span className="text-sm">{option}</span>
                </div>
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
              <Battery className="h-8 w-8 text-yellow-400 flex-shrink-0" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Demand-Based Control and Load Shedding
                </h1>
                <p className="text-base text-white mt-2">
                  Advanced energy optimisation and peak load management strategies
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                Section 4
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                25 min read
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
                Even well-scheduled buildings can face times when demand for heating, cooling, or electricity is higher than expected. 
                If left unchecked, this results in energy waste, higher costs, and strain on equipment. A Building Management System (BMS) 
                tackles this through advanced demand-based control and intelligent load shedding strategies.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                <strong>Demand-based control</strong> means the BMS monitors conditions in real time and only supplies as much heating, 
                cooling, or ventilation as is needed. <strong>Load shedding</strong> means reducing or temporarily switching off 
                non-critical loads when demand is high, protecting critical systems and avoiding peak energy charges.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                For electricians, these strategies matter because they rely on correctly installed sensors, actuators, and relays. 
                If devices are not wired or labelled properly, the BMS cannot make the right decisions, potentially causing safety 
                issues or significant financial penalties.
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
                  "Explain demand-based control principles and their importance for energy optimisation",
                  "Describe load shedding strategies and their implementation in different building types",
                  "Identify critical vs non-critical loads and understand prioritisation strategies",
                  "Understand peak demand management and utility demand charges",
                  "Apply proper wiring and labelling practices for load shedding systems",
                  "Implement demand response strategies and automated load management",
                  "Commission and test demand control systems safely and effectively",
                  "Recognise the electrician's role in enabling intelligent energy management"
                ].map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 1: Demand-Based Control Strategies */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <TrendingDown className="h-6 w-6 text-yellow-400" />
                1. Demand-Based Control Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Demand-based control represents a fundamental shift from fixed-schedule operation to intelligent, responsive 
                energy management. The system continuously monitors actual demand and adjusts equipment output accordingly.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Demand Control Implementation Methods:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-2 text-white">Control Method</th>
                        <th className="text-left py-2 text-white">Monitoring Input</th>
                        <th className="text-left py-2 text-white">Response Time</th>
                        <th className="text-left py-2 text-white">Energy Savings</th>
                        <th className="text-left py-2 text-white">Applications</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      <tr className="border-b border-gray-700">
                        <td className="py-2">Occupancy-Based</td>
                        <td className="py-2">PIR/CO₂ sensors</td>
                        <td className="py-2">1-5 minutes</td>
                        <td className="py-2">20-40%</td>
                        <td className="py-2">Offices, meeting rooms</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2">Temperature Reset</td>
                        <td className="py-2">External temp sensors</td>
                        <td className="py-2">5-15 minutes</td>
                        <td className="py-2">15-25%</td>
                        <td className="py-2">Water systems, air handling</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2">Load-Based</td>
                        <td className="py-2">Flow/pressure sensors</td>
                        <td className="py-2">30 seconds-2 min</td>
                        <td className="py-2">25-45%</td>
                        <td className="py-2">Pumps, fans, chillers</td>
                      </tr>
                      <tr>
                        <td className="py-2">Predictive</td>
                        <td className="py-2">Weather/schedule data</td>
                        <td className="py-2">1-4 hours</td>
                        <td className="py-2">30-50%</td>
                        <td className="py-2">Thermal mass systems</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Real-Time Demand Monitoring:</h4>
                <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-blue-200 mb-2">Continuous System Adjustment Examples</h5>
                  <div className="space-y-3 text-blue-100 text-sm">
                    <div>
                      <p><strong>HVAC Load Adjustment:</strong> Outside air temperature is mild (15°C), BMS reduces chilled water demand by 30%</p>
                      <p>Chiller capacity automatically modulates from 100% to 70%, saving significant energy</p>
                    </div>
                    <div>
                      <p><strong>Occupancy-Based Ventilation:</strong> Room shows 40% occupancy via CO₂ sensors</p>
                      <p>Ventilation airflow reduces to 60% of maximum, maintaining air quality while reducing fan energy</p>
                    </div>
                    <div>
                      <p><strong>Staged Boiler Control:</strong> Heating demand requires only 200kW of 600kW total capacity</p>
                      <p>Two of three boilers shut down automatically, third modulates to meet exact demand</p>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Continuous Monitoring:</strong> Systems monitor actual conditions every 15-60 seconds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Predictive Algorithms:</strong> Advanced systems use weather forecasts and occupancy patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Equipment Protection:</strong> Demand reductions respect minimum equipment operating limits</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Advanced Demand Control Strategies:</h4>
                <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-amber-200 mb-2">Intelligent Load Management Techniques</h5>
                  <div className="space-y-2 text-amber-100 text-sm">
                    <p><strong>Trim and Respond:</strong> System continuously reduces set points until a zone calls for more capacity</p>
                    <p><strong>Optimal Start/Stop:</strong> Equipment starts at calculated time to reach comfort just before occupancy</p>
                    <p><strong>Adaptive Control:</strong> System learns building characteristics and optimises performance automatically</p>
                    <p><strong>Multi-Zone Optimisation:</strong> Balances competing demands across multiple zones for overall efficiency</p>
                  </div>
                </div>
              </div>

              <InlineCheckComponent
                checkId="check1"
                question="How does demand-based control reduce unnecessary energy use?"
                options={[
                  "By running all equipment at maximum capacity for reliability",
                  "By monitoring actual conditions and supplying only what is needed in real time",
                  "By turning off all non-essential systems during the day",
                  "By using more sensors throughout the building"
                ]}
                correctAnswer={1}
                explanation="Demand-based control monitors actual conditions (occupancy, temperature, load) in real time and adjusts system output to supply only what is needed, avoiding waste from over-supply while maintaining comfort and performance."
              />
            </CardContent>
          </Card>

          {/* Section 2: Load Shedding Strategies */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Power className="h-6 w-6 text-yellow-400" />
                2. Load Shedding Strategies and Implementation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Load shedding activates when overall demand threatens to exceed limits—either the building's design capacity 
                or thresholds where electricity costs rise sharply. Strategic load shedding protects critical systems while 
                minimising operational disruption.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Load Classification and Priority Levels:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-2 text-white">Priority Level</th>
                        <th className="text-left py-2 text-white">Load Type</th>
                        <th className="text-left py-2 text-white">Shed Order</th>
                        <th className="text-left py-2 text-white">Max Shed Time</th>
                        <th className="text-left py-2 text-white">Examples</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      <tr className="border-b border-gray-700">
                        <td className="py-2 font-medium text-red-300">Critical</td>
                        <td className="py-2">Life Safety</td>
                        <td className="py-2">Never</td>
                        <td className="py-2">N/A</td>
                        <td className="py-2">Fire systems, emergency lighting</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 font-medium text-orange-300">Essential</td>
                        <td className="py-2">Core HVAC</td>
                        <td className="py-2">Never</td>
                        <td className="py-2">N/A</td>
                        <td className="py-2">Main chillers, primary pumps</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 font-medium text-yellow-300">Important</td>
                        <td className="py-2">Comfort Systems</td>
                        <td className="py-2">3rd</td>
                        <td className="py-2">2-4 hours</td>
                        <td className="py-2">Office HVAC, general lighting</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 font-medium text-blue-300">Discretionary</td>
                        <td className="py-2">Non-Essential</td>
                        <td className="py-2">2nd</td>
                        <td className="py-2">8+ hours</td>
                        <td className="py-2">Electric heating, some ventilation</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium text-gray-400">Deferrable</td>
                        <td className="py-2">Aesthetic/Ancillary</td>
                        <td className="py-2">1st</td>
                        <td className="py-2">Indefinite</td>
                        <td className="py-2">Decorative lighting, irrigation</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Automatic Load Shedding Triggers:</h4>
                <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-red-200 mb-2">Load Shedding Activation Conditions</h5>
                  <div className="grid sm:grid-cols-2 gap-4 text-red-100 text-sm">
                    <div>
                      <h6 className="font-medium text-red-300 mb-2">Demand Thresholds</h6>
                      <p className="mb-2">• Peak demand approaching contracted maximum (typically 90-95%)</p>
                      <p className="mb-2">• Power factor penalties imminent</p>
                      <p className="mb-2">• Utility demand response events</p>
                      <p>• Emergency supply capacity limits</p>
                    </div>
                    <div>
                      <h6 className="font-medium text-red-300 mb-2">System Conditions</h6>
                      <p className="mb-2">• Generator operation during power outages</p>
                      <p className="mb-2">• Equipment failures requiring load reduction</p>
                      <p className="mb-2">• Extreme weather conditions</p>
                      <p>• Maintenance periods with reduced capacity</p>
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Peak Tariff Avoidance:</strong> Shed loads before demand charges trigger (typically 15-30 minute windows)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Grid Stability Support:</strong> Participate in utility demand response programmes for grid support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Equipment Protection:</strong> Prevent transformer or generator overload during critical periods</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Common Non-Critical Loads for Shedding:</h4>
                <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-blue-200 mb-2">Typical Load Shedding Categories</h5>
                  <div className="grid sm:grid-cols-3 gap-4 text-blue-100 text-sm">
                    <div>
                      <h6 className="font-medium text-blue-300 mb-2">Lighting Systems</h6>
                      <p className="mb-1">• Decorative and façade lighting</p>
                      <p className="mb-1">• Car park lighting (partial)</p>
                      <p className="mb-1">• Corridor lighting (alternate fixtures)</p>
                      <p>• External area lighting</p>
                    </div>
                    <div>
                      <h6 className="font-medium text-blue-300 mb-2">HVAC Components</h6>
                      <p className="mb-1">• Electric reheat in secondary areas</p>
                      <p className="mb-1">• Toilet extract fans</p>
                      <p className="mb-1">• Car park ventilation</p>
                      <p>• Some fresh air intake fans</p>
                    </div>
                    <div>
                      <h6 className="font-medium text-blue-300 mb-2">Ancillary Equipment</h6>
                      <p className="mb-1">• Hot water circulation pumps</p>
                      <p className="mb-1">• Irrigation systems</p>
                      <p className="mb-1">• Non-critical motors</p>
                      <p>• Battery chargers (non-emergency)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Advanced Load Shed Strategies:</h4>
                <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                  <h5 className="font-semibold text-amber-200 mb-2">Intelligent Shed Management</h5>
                  <div className="space-y-2 text-amber-100 text-sm">
                    <p><strong>Rotational Shedding:</strong> Cycle loads on/off to maintain some service while reducing average demand</p>
                    <p><strong>Stepped Shedding:</strong> Progressively shed loads in stages as demand increases</p>
                    <p><strong>Time-Based Recovery:</strong> Automatically restore loads after preset time periods</p>
                    <p><strong>Condition-Based Recovery:</strong> Restore loads when demand falls below threshold levels</p>
                  </div>
                </div>
              </div>

              <InlineCheckComponent
                checkId="check2"
                question="What is one example of a non-critical load that could be shed by a BMS?"
                options={[
                  "Emergency lighting systems",
                  "Decorative and façade lighting",
                  "Fire detection systems",
                  "Primary chilled water pumps"
                ]}
                correctAnswer={1}
                explanation="Decorative and façade lighting is a typical non-critical load that can be safely shed during peak demand periods without affecting safety, comfort, or essential building operations."
              />
            </CardContent>
          </Card>

          {/* Section 3: Electrician's Role in Implementation */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Settings className="h-6 w-6 text-yellow-400" />
                3. Electrician's Role in Demand Control Implementation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Electricians are fundamental to enabling demand-based strategies through proper installation, wiring, and labelling 
                of control systems. Their work directly impacts system safety, reliability, and effectiveness.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Key Installation Responsibilities:</h4>
                <div className="space-y-3 text-white">
                  <div>
                    <h5 className="font-medium text-white mb-1">Sensor Installation and Wiring</h5>
                    <p className="text-sm text-white">Install and wire sensors for temperature, flow, power monitoring, and occupancy detection with appropriate cable types and shielding</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Load Control Device Installation</h5>
                    <p className="text-sm text-white">Install relays, contactors, and smart switches that allow BMS to control individual loads and load groups</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Circuit Segregation and Protection</h5>
                    <p className="text-sm text-white">Ensure clear separation between safety-critical circuits and those available for load shedding</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Documentation and Labelling</h5>
                    <p className="text-sm text-white">Provide clear labelling and as-built drawings showing which loads can be shed safely and their priority levels</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Critical Wiring and Safety Requirements:</h4>
                <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-red-200 mb-2">Safety-Critical Installation Practices</h5>
                  <div className="space-y-3 text-red-100 text-sm">
                    <div>
                      <p><strong>Life Safety Isolation:</strong> Emergency lighting, fire alarms, and smoke extract systems must be on dedicated circuits</p>
                      <p>These circuits should be physically separated and clearly marked as "NO LOAD SHED"</p>
                    </div>
                    <div>
                      <p><strong>Essential Services Protection:</strong> Server rooms, critical process equipment, and security systems require protection</p>
                      <p>Use separate distribution boards or clearly marked essential circuits</p>
                    </div>
                    <div>
                      <p><strong>Manual Override Capability:</strong> Install manual override switches for critical load shedding circuits</p>
                      <p>Facilities staff must be able to bypass BMS control during emergencies</p>
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Circuit Identification:</strong> Use colour-coded labels and comprehensive circuit schedules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Load Rating Verification:</strong> Ensure contactors and relays are rated for actual connected loads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Fail-Safe Design:</strong> System should fail to safe state if BMS communication is lost</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Load Monitoring and Control Devices:</h4>
                <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-blue-200 mb-2">Installation Requirements for Control Equipment</h5>
                  <div className="grid sm:grid-cols-2 gap-4 text-blue-100 text-sm">
                    <div>
                      <h6 className="font-medium text-blue-300 mb-2">Power Monitoring</h6>
                      <p className="mb-2">• Current transformers for main and sub-circuit monitoring</p>
                      <p className="mb-2">• Power quality meters for demand tracking</p>
                      <p className="mb-2">• Smart meters with communication capabilities</p>
                      <p>• Voltage and frequency monitoring devices</p>
                    </div>
                    <div>
                      <h6 className="font-medium text-blue-300 mb-2">Load Control Devices</h6>
                      <p className="mb-2">• Modular contactors for individual circuit control</p>
                      <p className="mb-2">• Smart relays with built-in logic capabilities</p>
                      <p className="mb-2">• Motor control centres with load shed functionality</p>
                      <p>• Lighting control modules for dimming and switching</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Documentation and Commissioning Support:</h4>
                <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                  <h5 className="font-semibold text-amber-200 mb-2">Essential Documentation Requirements</h5>
                  <div className="space-y-2 text-amber-100 text-sm">
                    <p><strong>Load Shedding Schedule:</strong> Detailed list of all loads available for shedding with priority levels</p>
                    <p><strong>Circuit Identification:</strong> Clear mapping between circuit numbers, load descriptions, and BMS control points</p>
                    <p><strong>Safety Exclusions:</strong> Documented list of circuits that must never be shed with physical safeguards</p>
                    <p><strong>Test Procedures:</strong> Step-by-step commissioning and testing procedures for all load shed functions</p>
                  </div>
                </div>
              </div>

              <InlineCheckComponent
                checkId="check3"
                question="Why is accurate labelling critical when setting up load shedding circuits?"
                options={[
                  "It makes the installation look more professional",
                  "It prevents the BMS from shedding the wrong loads, which could cause safety risks or complaints",
                  "It reduces the cost of installation",
                  "It helps identify which cables are the most expensive"
                ]}
                correctAnswer={1}
                explanation="Accurate labelling is critical because it prevents the BMS from shedding the wrong loads. Mistakenly shedding critical circuits could cause safety risks, equipment damage, or serious complaints, while poor labelling makes troubleshooting and maintenance extremely difficult."
              />
            </CardContent>
          </Card>

          {/* Section 4: Commissioning and Testing */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Activity className="h-6 w-6 text-yellow-400" />
                4. Commissioning and Testing Demand Control Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Proper commissioning ensures demand control and load shedding systems operate safely and effectively. 
                Testing must verify both automatic operation and manual override capabilities under various scenarios.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Systematic Testing Procedures:</h4>
                <div className="space-y-3 text-white">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</div>
                    <div>
                      <h5 className="font-medium text-white mb-1">Pre-Testing Verification</h5>
                      <p className="text-sm text-white">Verify all wiring, labelling, and protection devices before energising load shed circuits</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</div>
                    <div>
                      <h5 className="font-medium text-white mb-1">Individual Circuit Testing</h5>
                      <p className="text-sm text-white">Test each load shed circuit independently to verify correct operation and no interference with critical loads</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</div>
                    <div>
                      <h5 className="font-medium text-white mb-1">Demand Threshold Testing</h5>
                      <p className="text-sm text-white">Simulate high load conditions to verify automatic shedding triggers at correct thresholds</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">4</div>
                    <div>
                      <h5 className="font-medium text-white mb-1">Sequence and Priority Testing</h5>
                      <p className="text-sm text-white">Verify loads shed in correct priority order and restore in reverse sequence</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">5</div>
                    <div>
                      <h5 className="font-medium text-white mb-1">Manual Override Testing</h5>
                      <p className="text-sm text-white">Test all manual override switches and emergency restoration procedures</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Safety Testing Requirements:</h4>
                <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-red-200 mb-2">Critical Safety Verification Points</h5>
                  <div className="space-y-2 text-red-100 text-sm">
                    <p><strong>Life Safety Isolation:</strong> Verify emergency lighting, fire systems cannot be shed under any circumstances</p>
                    <p><strong>Communication Failure Mode:</strong> Test system behaviour when BMS communication is lost - should fail safe</p>
                    <p><strong>Manual Override Function:</strong> All override switches must immediately restore loads regardless of BMS state</p>
                    <p><strong>Critical Load Protection:</strong> Essential systems must continue operation during all shed scenarios</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Performance Verification:</h4>
                <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-blue-200 mb-2">Measurement and Documentation</h5>
                  <div className="space-y-2 text-blue-100 text-sm">
                    <p><strong>Demand Reduction Verification:</strong> Measure actual kW reduction when loads are shed to verify savings</p>
                    <p><strong>Response Time Testing:</strong> Time from shed command to actual load disconnection (should be &lt;30 seconds)</p>
                    <p><strong>Load Recovery Testing:</strong> Verify smooth restoration without causing inrush current problems</p>
                    <p><strong>Long-Term Testing:</strong> Monitor system over several weeks to verify reliable operation</p>
                  </div>
                </div>
              </div>

              <InlineCheckComponent
                checkId="check4"
                question="What commissioning step should be taken to test load shedding strategies?"
                options={[
                  "Test only during normal working hours",
                  "Simulate high load conditions to verify automatic shedding triggers work correctly",
                  "Skip testing and rely on manufacturer specifications",
                  "Only test manual controls, not automatic functions"
                ]}
                correctAnswer={1}
                explanation="Commissioning must include simulating high load conditions to verify that automatic shedding triggers work at the correct thresholds, loads shed in proper priority order, and the system responds within acceptable time limits."
              />
            </CardContent>
          </Card>

          {/* Real-world Case Study */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Database className="h-6 w-6 text-yellow-400" />
                Real-world Case Study: Data Centre Load Shedding Implementation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2">Project Background</h4>
                <p className="text-blue-100 text-sm">
                  A 500-rack data centre was experiencing utility demand charges of £40,000/month due to peak loads 
                  exceeding contracted capacity during summer cooling periods. The facility needed load shedding 
                  capability while maintaining 100% uptime for critical IT equipment.
                </p>
              </div>
              
              <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">Implementation Strategy</h4>
                <div className="space-y-2 text-amber-100 text-sm">
                  <p><strong>Critical Load Identification:</strong> All server cooling, UPS systems, and fire protection classified as never-shed</p>
                  <p><strong>Sheddable Loads Identified:</strong> Office HVAC (30kW), non-essential lighting (15kW), car park systems (12kW)</p>
                  <p><strong>Electrical Installation:</strong> Separate contactors installed for each sheddable load group</p>
                  <p><strong>Control Integration:</strong> BMS monitors total facility demand in real-time via power meters</p>
                </div>
              </div>

              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-2">Electrical Implementation Details</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-white text-sm">
                  <div>
                    <h5 className="font-medium text-white mb-2">Load Shed Circuits</h5>
                    <p className="mb-2">• Office HVAC: 3 x 125A contactors</p>
                    <p className="mb-2">• Lighting: 6 x 63A modular contactors</p>
                    <p className="mb-2">• Car park: 2 x 32A contactors</p>
                    <p>• Manual override: Emergency stop buttons</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-2">Protection Measures</h5>
                    <p className="mb-2">• Critical circuits on separate DB boards</p>
                    <p className="mb-2">• Physical locks on critical circuit breakers</p>
                    <p className="mb-2">• Red warning labels on never-shed circuits</p>
                    <p>• Independent UPS for fire and security systems</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-200 mb-2">Testing and Commissioning Process</h4>
                <div className="space-y-2 text-red-100 text-sm">
                  <p><strong>Phase 1:</strong> Individual circuit testing during planned maintenance windows</p>
                  <p><strong>Phase 2:</strong> Demand threshold testing with temporary load banks to simulate peak conditions</p>
                  <p><strong>Phase 3:</strong> Live testing during actual peak periods with full monitoring and emergency procedures</p>
                  <p><strong>Documentation:</strong> Complete circuit schedules, operating procedures, and emergency contact lists</p>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-2">Results and Benefits</h4>
                <div className="space-y-2 text-green-100 text-sm">
                  <p><strong>Demand Reduction:</strong> Peak demand reduced by 57kW (12% of total facility load)</p>
                  <p><strong>Cost Savings:</strong> Demand charges reduced by £35,000/month (87.5% reduction)</p>
                  <p><strong>Reliability:</strong> Zero critical system interruptions during 18-month operational period</p>
                  <p><strong>Operational Benefits:</strong> Automatic operation with no staff intervention required</p>
                  <p><strong>ROI:</strong> Installation costs recovered in 3.2 months through avoided demand charges</p>
                </div>
              </div>

              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-2">Key Lessons Learned</h4>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Early Planning:</strong> Load classification and circuit design must be planned from the beginning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Clear Documentation:</strong> Comprehensive labelling prevented errors and enabled quick commissioning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Safety First:</strong> Physical separation of critical and non-critical circuits essential for safe operation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Testing Critical:</strong> Thorough testing revealed and resolved several potential issues before go-live</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>ROI Validation:</strong> Proper metering and monitoring validated actual savings versus projections</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 leading-relaxed">
              <p className="text-base sm:text-lg">
                Demand-based control and load shedding represent sophisticated energy management strategies that can deliver 
                substantial cost savings while maintaining comfort and safety. These systems require careful planning, proper 
                installation, and thorough testing to operate effectively.
              </p>
              <p className="text-base sm:text-lg">
                For electricians, the key responsibilities include proper circuit segregation, accurate labelling, and ensuring 
                fail-safe operation. The installation work directly impacts system safety and performance, making attention to 
                detail absolutely critical.
              </p>
              <p className="text-base sm:text-lg">
                The data centre case study demonstrates the significant financial benefits possible through proper implementation, 
                but also highlights the importance of comprehensive testing and clear documentation to ensure reliable, safe operation.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4 mt-6">
                <h4 className="font-semibold text-yellow-400 mb-3">Key Takeaways for Electricians:</h4>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Demand control and load shedding can provide 20-50% energy savings when properly implemented</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Safety-critical circuits must be physically separated and clearly identified</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Comprehensive testing and commissioning are essential for safe, reliable operation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Accurate documentation and labelling prevent operational errors and safety risks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Manual override capabilities must be provided for emergency situations</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl">Test Your Knowledge</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-4">
                Test your understanding of demand-based control and load shedding strategies. This quiz covers energy management principles, load classification, implementation requirements, and safety considerations.
              </p>
              <SingleQuestionQuiz 
                questions={bmsModule3Section4QuizData} 
                title="Demand Control and Load Shedding Quiz"
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between mt-12 max-w-4xl mx-auto">
          <Link to="../bms-module-3-section-3" className={isMobile ? 'w-full mr-2' : ''}>
            <Button variant="outline" className={`border-gray-600 text-white hover:bg-card ${isMobile ? 'w-full py-3' : ''}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Section
            </Button>
          </Link>
          <Link to="../bms-module-3-section-5" className={isMobile ? 'w-full ml-2' : ''}>
            <Button className={`bg-yellow-400 text-black hover:bg-yellow-600 ${isMobile ? 'w-full py-3' : ''}`}>
              Next Section
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BMSModule3Section4;