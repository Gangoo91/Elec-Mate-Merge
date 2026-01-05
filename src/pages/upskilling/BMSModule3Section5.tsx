import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Power, CheckCircle, AlertTriangle, Target, Settings, Activity, RefreshCw, Calendar, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule3Section5QuizData } from '@/data/upskilling/bmsModule3Section5QuizData';
import { useIsMobile } from '@/hooks/use-mobile';

const BMSModule3Section5 = () => {
  const isMobile = useIsMobile();
  const [inlineChecks, setInlineChecks] = useState<Record<string, number | null>>({
    check1: null,
    check2: null,
    check3: null,
    check4: null,
  });

  useEffect(() => {
    document.title = 'Override Functions and Seasonal Settings | BMS Module 3 Section 5';
    const desc = 'Master BMS override functions and seasonal control strategies. Learn manual override implementation, seasonal programming, safety protocols, and commissioning procedures for optimal building performance.';
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
              <Power className="h-8 w-8 text-yellow-400 flex-shrink-0" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Override Functions and Seasonal Settings
                </h1>
                <p className="text-base text-white mt-2">
                  Manual control systems and adaptive seasonal operation strategies
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                Section 5
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                26 min read
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-sm sm:text-base leading-relaxed">
                Even the most sophisticated automation cannot predict every situation. Building operators need manual control 
                capabilities for maintenance, emergencies, special events, and operational flexibility. This is where override 
                functions become essential. Additionally, buildings must adapt to seasonal changes—switching from heating to 
                cooling, adjusting ventilation strategies, and optimising energy consumption patterns.
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                A well-designed BMS provides these functions in a structured, safe, and efficient manner. <strong>Override functions</strong> 
                allow temporary manual control while maintaining safety protocols. <strong>Seasonal settings</strong> automatically 
                adapt system operation to changing environmental conditions and occupancy patterns throughout the year.
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                For electricians, understanding how overrides and seasonal settings are implemented is essential, as these 
                features depend on correct wiring of switches, relays, sensors, and safety interlocks. Poor implementation 
                can compromise both system safety and energy efficiency.
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
                  "Explain the purpose and types of override functions in BMS operation",
                  "Understand seasonal control strategies and their impact on energy efficiency",
                  "Identify safety considerations and risks associated with uncontrolled overrides",
                  "Describe proper wiring and installation practices for override systems",
                  "Implement seasonal programming and changeover procedures",
                  "Apply override governance and time-limiting strategies",
                  "Commission and test override and seasonal control systems safely",
                  "Recognise the electrician's role in enabling flexible building operation"
                ].map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 1: Override Functions and Safety Protocols */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-400" />
                1. Override Functions and Safety Protocols
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Override functions provide essential manual control capabilities while maintaining system safety and operational 
                integrity. Different types of overrides serve different purposes and have varying levels of authority and safety implications.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Override Types and Authority Levels:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-2 text-white">Override Type</th>
                        <th className="text-left py-2 text-white">Authority Level</th>
                        <th className="text-left py-2 text-white">Time Limit</th>
                        <th className="text-left py-2 text-white">Access Control</th>
                        <th className="text-left py-2 text-white">Example Applications</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      <tr className="border-b border-gray-700">
                        <td className="py-2 font-medium text-red-300">Emergency</td>
                        <td className="py-2">Highest</td>
                        <td className="py-2">Manual reset only</td>
                        <td className="py-2">Any user</td>
                        <td className="py-2">Fire override, emergency stop</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 font-medium text-orange-300">Safety</td>
                        <td className="py-2">Very High</td>
                        <td className="py-2">Manual reset</td>
                        <td className="py-2">Authorised personnel</td>
                        <td className="py-2">Lockout/tagout, maintenance mode</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 font-medium text-yellow-300">Operator</td>
                        <td className="py-2">High</td>
                        <td className="py-2">2-8 hours</td>
                        <td className="py-2">BMS operators</td>
                        <td className="py-2">Equipment testing, commissioning</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 font-medium text-blue-300">Local</td>
                        <td className="py-2">Medium</td>
                        <td className="py-2">30 min-2 hours</td>
                        <td className="py-2">Local users</td>
                        <td className="py-2">Room comfort override, fan boost</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium text-gray-300">Scheduled</td>
                        <td className="py-2">Low</td>
                        <td className="py-2">Pre-programmed</td>
                        <td className="py-2">System automatic</td>
                        <td className="py-2">Extended hours, special events</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Local Override Implementation:</h4>
                <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-blue-200 mb-2">Physical Override Controls</h5>
                  <div className="space-y-3 text-blue-100 text-sm">
                    <div>
                      <p><strong>Room Override Switches:</strong> Wall-mounted switches allowing occupants to extend HVAC operation</p>
                      <p>Example: Meeting room switch extends air conditioning for 2 hours outside normal schedule</p>
                    </div>
                    <div>
                      <p><strong>Equipment Override Buttons:</strong> Local control panels on major equipment</p>
                      <p>Example: Boiler manual start button for maintenance testing and emergency operation</p>
                    </div>
                    <div>
                      <p><strong>Zone Control Panels:</strong> Local temperature adjustment and fan speed control</p>
                      <p>Example: Reception area panel allowing ±2°C temperature adjustment</p>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Auto-Expiry:</strong> Local overrides automatically expire after preset time periods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Status Indication:</strong> LED indicators show when override is active</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>BMS Integration:</strong> All local overrides logged and monitored by central system</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Operator Override Functions:</h4>
                <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-amber-200 mb-2">Software-Based Control</h5>
                  <div className="space-y-2 text-amber-100 text-sm">
                    <p><strong>Force Commands:</strong> Operators can force equipment into specific states (ON/OFF/AUTO)</p>
                    <p><strong>Setpoint Override:</strong> Temporary adjustment of temperature, pressure, or flow setpoints</p>
                    <p><strong>Schedule Override:</strong> Modify operating schedules for special events or maintenance</p>
                    <p><strong>Sequence Override:</strong> Bypass normal operational sequences for testing or emergency response</p>
                  </div>
                </div>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Time Limiting:</strong> Automatic expiry prevents forgotten overrides from persisting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Audit Trail:</strong> Complete logging of who applied overrides, when, and why</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Priority Management:</strong> Safety overrides cannot be superseded by operator commands</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Safety Considerations and Risk Management:</h4>
                <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                  <h5 className="font-semibold text-red-200 mb-2">Critical Safety Requirements</h5>
                  <div className="space-y-2 text-red-100 text-sm">
                    <p><strong>Safety Interlocks:</strong> Life safety systems cannot be overridden by comfort control functions</p>
                    <p><strong>Fail-Safe Design:</strong> Override failures must default to safe operating states</p>
                    <p><strong>Documentation Requirements:</strong> All overrides must be logged with reason and expected duration</p>
                    <p><strong>Regular Review:</strong> Active overrides reviewed weekly to identify and clear unnecessary holds</p>
                  </div>
                </div>
              </div>

              <InlineCheckComponent
                checkId="check1"
                question="Why is it important for overrides to be time-limited or logged?"
                options={[
                  "To reduce the cost of system operation",
                  "To prevent energy waste and ensure overrides don't disable safety functions permanently",
                  "To make the system easier to install",
                  "To reduce the number of sensors needed"
                ]}
                correctAnswer={1}
                explanation="Time-limited and logged overrides prevent energy waste from forgotten manual settings and ensure safety functions aren't permanently disabled. Documentation also provides accountability and helps identify system operation patterns."
              />
            </CardContent>
          </Card>

          {/* Section 2: Seasonal Control Strategies */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Calendar className="h-6 w-6 text-yellow-400" />
                2. Seasonal Control Strategies and Programming
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Buildings have dramatically different operational requirements throughout the year. Seasonal control strategies 
                automatically adapt system operation to changing environmental conditions, occupancy patterns, and energy costs, 
                ensuring optimal comfort while minimising energy consumption.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Seasonal Operating Parameters:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-2 text-white">Season</th>
                        <th className="text-left py-2 text-white">Heating Setpoint</th>
                        <th className="text-left py-2 text-white">Cooling Setpoint</th>
                        <th className="text-left py-2 text-white">Ventilation Strategy</th>
                        <th className="text-left py-2 text-white">Primary Equipment</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      <tr className="border-b border-gray-700">
                        <td className="py-2 font-medium text-blue-300">Winter</td>
                        <td className="py-2">20-21°C</td>
                        <td className="py-2">Disabled (&gt;25°C)</td>
                        <td className="py-2">Heat recovery active</td>
                        <td className="py-2">Boilers, heating coils</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 font-medium text-orange-300">Spring</td>
                        <td className="py-2">19-20°C</td>
                        <td className="py-2">24-25°C</td>
                        <td className="py-2">Free cooling priority</td>
                        <td className="py-2">Economisers, natural ventilation</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 font-medium text-green-300">Summer</td>
                        <td className="py-2">Disabled (&lt;18°C)</td>
                        <td className="py-2">23-24°C</td>
                        <td className="py-2">Maximum fresh air</td>
                        <td className="py-2">Chillers, cooling coils</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium text-amber-300">Autumn</td>
                        <td className="py-2">20-21°C</td>
                        <td className="py-2">24-25°C</td>
                        <td className="py-2">Mixed mode operation</td>
                        <td className="py-2">Variable based on conditions</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Winter Operation Strategies:</h4>
                <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-blue-200 mb-2">Cold Weather Optimisation</h5>
                  <div className="space-y-3 text-blue-100 text-sm">
                    <div>
                      <p><strong>Boiler Staging:</strong> Multiple boilers fire in sequence based on outdoor temperatures and load</p>
                      <p>Lead/lag rotation prevents uneven wear and maintains efficiency across the plant</p>
                    </div>
                    <div>
                      <p><strong>Heat Recovery Systems:</strong> Maximum heat recovery from exhaust air to preheat incoming fresh air</p>
                      <p>Reduces heating load by 30-50% in well-designed systems</p>
                    </div>
                    <div>
                      <p><strong>Frost Protection:</strong> Coil and pipe freeze protection through temperature monitoring and circulation</p>
                      <p>Automatic glycol circulation and heating coil protection during extreme cold</p>
                    </div>
                    <div>
                      <p><strong>Warm-Up Optimisation:</strong> Building pre-heating calculated based on thermal mass and outdoor conditions</p>
                      <p>Start times automatically adjusted to achieve comfort at occupancy</p>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Heating Water Reset:</strong> Supply temperatures adjust based on outdoor temperature</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Ventilation Reduction:</strong> Minimum fresh air rates to reduce heating loads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Zone Control:</strong> Individual zone heating based on occupancy and solar gains</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Summer Operation Strategies:</h4>
                <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-amber-200 mb-2">Hot Weather Optimisation</h5>
                  <div className="space-y-3 text-amber-100 text-sm">
                    <div>
                      <p><strong>Chiller Sequencing:</strong> Multiple chillers operate to match cooling load efficiently</p>
                      <p>Lead/lag operation and capacity staging maintain optimal efficiency</p>
                    </div>
                    <div>
                      <p><strong>Free Cooling:</strong> Use cooler outdoor air when conditions permit</p>
                      <p>Economiser cycles can provide 100% cooling when outdoor conditions are suitable</p>
                    </div>
                    <div>
                      <p><strong>Pre-Cooling:</strong> Building thermal mass cooled during off-peak hours</p>
                      <p>Reduces peak electrical demand and takes advantage of lower night-time temperatures</p>
                    </div>
                    <div>
                      <p><strong>Humidity Control:</strong> Dehumidification strategies to maintain comfort during high humidity periods</p>
                      <p>Prevents comfort issues and potential mould growth problems</p>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Chilled Water Reset:</strong> Supply temperatures adjust for optimal efficiency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Ventilation Increase:</strong> Maximum fresh air for natural cooling when appropriate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Solar Control:</strong> Automated blinds and window management to reduce solar gains</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Transition Period Management:</h4>
                <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                  <h5 className="font-semibold text-red-200 mb-2">Spring and Autumn Strategies</h5>
                  <div className="space-y-2 text-red-100 text-sm">
                    <p><strong>Mixed Mode Operation:</strong> Simultaneous heating and cooling availability with proper deadbands</p>
                    <p><strong>Natural Ventilation:</strong> Maximum use of outdoor air for free heating and cooling</p>
                    <p><strong>Equipment Changeover:</strong> Systematic switching between heating and cooling dominant operation</p>
                    <p><strong>Energy Balance:</strong> Optimise between heating, cooling, and ventilation strategies for efficiency</p>
                  </div>
                </div>
              </div>

              <InlineCheckComponent
                checkId="check2"
                question="Why would a building waste energy if seasonal settings were not programmed correctly?"
                options={[
                  "The building would use more sensors",
                  "Systems might heat and cool simultaneously or operate at inappropriate setpoints year-round",
                  "More maintenance would be required",
                  "The BMS would stop working completely"
                ]}
                correctAnswer={1}
                explanation="Without proper seasonal settings, systems might heat and cool simultaneously (fighting each other), or operate at inappropriate setpoints year-round. This wastes significant energy and reduces occupant comfort."
              />
            </CardContent>
          </Card>

          {/* Section 3: Electrician's Role in Override and Seasonal Systems */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Settings className="h-6 w-6 text-yellow-400" />
                3. Electrician's Role in Override and Seasonal Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Electricians enable override and seasonal control strategies through proper installation, wiring, and testing 
                of control devices, sensors, and safety systems. Their work ensures these critical functions operate safely 
                and reliably throughout the building's lifecycle.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Override System Installation Requirements:</h4>
                <div className="space-y-3 text-white">
                  <div>
                    <h5 className="font-medium text-white mb-1">Physical Override Switches</h5>
                    <p className="text-sm text-white">Install and wire wall-mounted override switches with appropriate rating and clear labelling. Include status indication LEDs and ensure proper integration with BMS inputs.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Outdoor Temperature Sensors</h5>
                    <p className="text-sm text-white">Install sensors for seasonal changeover detection, positioned for representative readings away from heat sources, direct sunlight, and thermal effects from building equipment.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Safety Override Segregation</h5>
                    <p className="text-sm text-white">Maintain clear separation between life safety overrides (fire, emergency) and comfort overrides (temperature, ventilation) using separate circuits and protection.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Override Circuit Testing</h5>
                    <p className="text-sm text-white">Commission all override circuits to verify BMS recognition of manual commands and proper fail-safe operation during system faults.</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Wiring and Installation Best Practices:</h4>
                <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-blue-200 mb-2">Critical Installation Standards</h5>
                  <div className="space-y-3 text-blue-100 text-sm">
                    <div>
                      <p><strong>Override Switch Specifications:</strong> Use switches rated for actual connected loads with appropriate contact ratings</p>
                      <p>Momentary action for safety functions, maintained contact for comfort overrides</p>
                    </div>
                    <div>
                      <p><strong>Sensor Installation:</strong> Outdoor temperature sensors require weather-resistant enclosures</p>
                      <p>Mount at representative height (3-4m) with appropriate cable types and terminations</p>
                    </div>
                    <div>
                      <p><strong>Safety Interlocks:</strong> Fire and emergency override circuits use dedicated conduits and cabling</p>
                      <p>Independent of comfort control systems with hard-wired override capability</p>
                    </div>
                    <div>
                      <p><strong>Status Indication:</strong> Provide visual indication of override status at local and central locations</p>
                      <p>LED indicators, dashboard displays, and alarm annunciation for active overrides</p>
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Clear Labelling:</strong> All override switches and sensors clearly labelled with function and limitations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Circuit Documentation:</strong> Comprehensive circuit schedules and as-built drawings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Testing Procedures:</strong> Systematic testing of all override functions during commissioning</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Seasonal Sensor Installation:</h4>
                <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-amber-200 mb-2">Environmental Monitoring Requirements</h5>
                  <div className="space-y-2 text-amber-100 text-sm">
                    <p><strong>Outdoor Temperature Sensors:</strong> Primary input for seasonal changeover and reset strategies</p>
                    <p><strong>Humidity Sensors:</strong> Support dehumidification and comfort control during transition periods</p>
                    <p><strong>Solar Radiation Sensors:</strong> Enable solar-responsive control and natural lighting optimisation</p>
                    <p><strong>Wind Speed/Direction:</strong> Support natural ventilation and economiser control strategies</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Safety and Compliance Requirements:</h4>
                <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                  <h5 className="font-semibold text-red-200 mb-2">Critical Safety Considerations</h5>
                  <div className="space-y-2 text-red-100 text-sm">
                    <p><strong>Life Safety Overrides:</strong> Fire systems, smoke extract, and emergency lighting must have hardwired overrides</p>
                    <p><strong>Fail-Safe Design:</strong> Override systems must fail to safe states during power or communication failures</p>
                    <p><strong>Access Control:</strong> Restrict access to critical override functions through physical and software controls</p>
                    <p><strong>Emergency Procedures:</strong> Provide manual procedures for override operation during system failures</p>
                  </div>
                </div>
              </div>

              <InlineCheckComponent
                checkId="check3"
                question="Why must electricians separate safety overrides from comfort overrides?"
                options={[
                  "To reduce installation costs",
                  "To prevent safety systems from being compromised by comfort control failures",
                  "To make the system easier to operate",
                  "To comply with manufacturer warranties"
                ]}
                correctAnswer={1}
                explanation="Safety overrides (fire, emergency) must be separated from comfort overrides to prevent life safety systems from being compromised by comfort control failures. This ensures emergency systems remain operational even if HVAC controls fail."
              />
            </CardContent>
          </Card>

          {/* Section 4: Implementation and Commissioning */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Activity className="h-6 w-6 text-yellow-400" />
                4. Implementation and Commissioning Procedures
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Proper commissioning of override and seasonal control systems ensures safe, reliable operation throughout 
                all operating conditions. Testing must verify both automatic seasonal operation and manual override capabilities 
                under various scenarios.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Commissioning Test Procedures:</h4>
                <div className="space-y-3 text-white">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</div>
                    <div>
                      <h5 className="font-medium text-white mb-1">Override Function Testing</h5>
                      <p className="text-sm text-white">Test each override switch and software function to verify proper BMS response and system behaviour</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</div>
                    <div>
                      <h5 className="font-medium text-white mb-1">Seasonal Changeover Simulation</h5>
                      <p className="text-sm text-white">Simulate seasonal conditions by adjusting outdoor sensor readings to verify automatic changeover</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</div>
                    <div>
                      <h5 className="font-medium text-white mb-1">Time Limit Verification</h5>
                      <p className="text-sm text-white">Verify automatic expiry of time-limited overrides and proper return to scheduled operation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">4</div>
                    <div>
                      <h5 className="font-medium text-white mb-1">Safety Interlock Testing</h5>
                      <p className="text-sm text-white">Test safety override priority and verify comfort overrides cannot compromise safety functions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">5</div>
                    <div>
                      <h5 className="font-medium text-white mb-1">Documentation Verification</h5>
                      <p className="text-sm text-white">Verify all override and seasonal functions are properly documented and logged by the system</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Seasonal Programming Implementation:</h4>
                <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-blue-200 mb-2">Seasonal Transition Management</h5>
                  <div className="space-y-2 text-blue-100 text-sm">
                    <p><strong>Trigger Conditions:</strong> Define outdoor temperature trends, calendar dates, and manual confirmation requirements</p>
                    <p><strong>Setpoint Adjustment:</strong> Program heating/cooling setpoints, economiser thresholds, and humidity control bands</p>
                    <p><strong>Schedule Rebalancing:</strong> Adjust occupancy schedules, setback periods, and warm-up/cool-down optimisation</p>
                    <p><strong>Performance Monitoring:</strong> Track comfort and energy KPIs before and after seasonal changes</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Override Governance Implementation:</h4>
                <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-amber-200 mb-2">Control and Monitoring Systems</h5>
                  <div className="space-y-2 text-amber-100 text-sm">
                    <p><strong>Time-Limited Controls:</strong> Implement automatic expiry for all non-emergency overrides</p>
                    <p><strong>Access Management:</strong> Role-based access controls for different override authority levels</p>
                    <p><strong>Audit Logging:</strong> Complete trail of override actions including user, time, reason, and duration</p>
                    <p><strong>Active Override Dashboard:</strong> Real-time monitoring of all active overrides with expiry information</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Performance Validation:</h4>
                <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                  <h5 className="font-semibold text-red-200 mb-2">System Performance Metrics</h5>
                  <div className="space-y-2 text-red-100 text-sm">
                    <p><strong>Energy Efficiency:</strong> Compare energy consumption before and after seasonal changeovers</p>
                    <p><strong>Comfort Metrics:</strong> Monitor temperature stability and occupant feedback during transitions</p>
                    <p><strong>Override Usage:</strong> Track frequency and duration of override usage to identify training needs</p>
                    <p><strong>System Reliability:</strong> Monitor override and seasonal functions for proper operation over time</p>
                  </div>
                </div>
              </div>

              <InlineCheckComponent
                checkId="check4"
                question="What is a key commissioning requirement when testing seasonal changeover functions?"
                options={[
                  "Test only during actual seasonal changes",
                  "Simulate seasonal conditions by adjusting outdoor sensor readings to verify automatic operation",
                  "Skip testing and rely on manufacturer settings", 
                  "Only test manual override functions"
                ]}
                correctAnswer={1}
                explanation="Commissioning must simulate seasonal conditions by adjusting outdoor sensor readings to verify that automatic changeover functions work correctly at the programmed thresholds, without waiting for actual seasonal changes."
              />
            </CardContent>
          </Card>

          {/* Real-world Case Study */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Clock className="h-6 w-6 text-yellow-400" />
                Real-world Case Study: Commercial Office Override Misuse
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">The Problem</h4>
                <p className="text-amber-100 text-sm">
                  A 15-storey commercial office building experienced consistently high energy bills despite having a modern BMS. 
                  Energy audits revealed chillers running continuously even during mild weather and low occupancy periods. 
                  Investigation found operators routinely left the BMS in "manual override" mode after equipment testing and maintenance.
                </p>
              </div>
              
              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2">Investigation Findings</h4>
                <div className="space-y-2 text-blue-100 text-sm">
                  <p><strong>Override Abuse:</strong> 12 of 15 major plant items had active manual overrides, some lasting weeks</p>
                  <p><strong>Lack of Training:</strong> Maintenance staff unaware of proper override procedures and time limits</p>
                  <p><strong>Poor Documentation:</strong> No log of why overrides were applied or when they should expire</p>
                  <p><strong>System Limitations:</strong> Original BMS programming lacked automatic override expiry functions</p>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-200 mb-2">Energy Impact Analysis</h4>
                <div className="space-y-2 text-red-100 text-sm">
                  <p><strong>Chiller Energy:</strong> Continuous operation increased cooling energy by 65% above design</p>
                  <p><strong>Pump Energy:</strong> Chilled water pumps ran 24/7 instead of following occupancy schedules</p>
                  <p><strong>Fan Energy:</strong> Air handling units operated at full capacity regardless of actual demand</p>
                  <p><strong>Annual Cost:</strong> Override misuse added £85,000 to annual energy costs</p>
                </div>
              </div>

              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-2">Solution Implementation</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-white text-sm">
                  <div>
                    <h5 className="font-medium text-white mb-2">Technical Improvements</h5>
                    <p className="mb-2">• Automatic override time limits (2-8 hours maximum)</p>
                    <p className="mb-2">• Override dashboard with expiry countdown</p>
                    <p className="mb-2">• Email alerts for overrides exceeding 4 hours</p>
                    <p>• Mandatory reason codes for all overrides</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-2">Procedural Changes</h5>
                    <p className="mb-2">• Staff training on proper override procedures</p>
                    <p className="mb-2">• Weekly override review meetings</p>
                    <p className="mb-2">• Clear documentation requirements</p>
                    <p>• Supervisor approval for extended overrides</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-2">Results and Benefits</h4>
                <div className="space-y-2 text-green-100 text-sm">
                  <p><strong>Energy Reduction:</strong> 15% reduction in overall building energy consumption achieved within 3 months</p>
                  <p><strong>Cost Savings:</strong> Annual energy costs reduced by £63,000 (74% improvement)</p>
                  <p><strong>Operational Benefits:</strong> Improved equipment reliability and reduced maintenance calls</p>
                  <p><strong>Staff Compliance:</strong> 95% reduction in inappropriate override usage within 6 months</p>
                  <p><strong>System Performance:</strong> Automatic seasonal changeovers working properly for first time</p>
                </div>
              </div>

              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-2">Key Lessons Learned</h4>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Override Governance:</strong> Technical controls must be combined with proper procedures and training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Time Limits Essential:</strong> Automatic expiry prevents forgotten overrides from persisting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Monitoring Required:</strong> Regular review of active overrides essential for energy management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Training Critical:</strong> Staff must understand the energy and cost implications of override misuse</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Documentation Matters:</strong> Clear procedures and reason codes improve accountability</span>
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
                Override functions and seasonal settings provide essential flexibility for building operation while maintaining 
                safety and energy efficiency. Proper implementation requires careful attention to authority levels, time limits, 
                safety interlocks, and seasonal programming strategies.
              </p>
              <p className="text-base sm:text-lg">
                For electricians, the key responsibilities include proper wiring of override switches, environmental sensors, 
                and safety systems. Clear separation between safety and comfort overrides is critical to maintaining life safety 
                system integrity while providing operational flexibility.
              </p>
              <p className="text-base sm:text-lg">
                The commercial office case study demonstrates how override misuse can dramatically increase energy costs and 
                compromise system performance. Proper governance, training, and technical controls are essential for realising 
                the benefits of flexible building control systems.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4 mt-6">
                <h4 className="font-semibold text-yellow-400 mb-3">Key Takeaways for Electricians:</h4>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Override functions must be time-limited and logged to prevent energy waste and safety issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Seasonal control strategies can reduce energy consumption by 15-30% when properly implemented</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Safety overrides must be physically separated from comfort control overrides</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Proper sensor installation enables automatic seasonal changeover and optimisation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Comprehensive commissioning and testing are essential for reliable system operation</span>
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
                Test your understanding of override functions and seasonal control systems. This quiz covers manual override implementation, seasonal programming, safety protocols, and commissioning procedures.
              </p>
              <SingleQuestionQuiz 
                questions={bmsModule3Section5QuizData} 
                title="Override Functions and Seasonal Settings Quiz"
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between mt-12 max-w-4xl mx-auto">
          <Link to="../bms-module-3-section-4" className={isMobile ? 'w-full mr-2' : ''}>
            <Button variant="outline" className={`border-gray-600 text-white hover:bg-card ${isMobile ? 'w-full py-3' : ''}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Section
            </Button>
          </Link>
          <Link to="../bms-module-3-section-6" className={isMobile ? 'w-full ml-2' : ''}>
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

export default BMSModule3Section5;