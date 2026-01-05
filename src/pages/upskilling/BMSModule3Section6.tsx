import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, Shield, Target, Settings, Activity, Siren, Flame, Zap, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule3Section6QuizData } from '@/data/upskilling/bmsModule3Section6QuizData';
import { useIsMobile } from '@/hooks/use-mobile';

const BMSModule3Section6 = () => {
  const isMobile = useIsMobile();
  const [inlineChecks, setInlineChecks] = useState<Record<string, number | null>>({
    check1: null,
    check2: null,
    check3: null,
    check4: null,
  });

  useEffect(() => {
    document.title = 'Alarm Responses and Safety Shutdowns | BMS Module 3 Section 6';
    const desc = 'Master BMS alarm management and safety shutdown procedures. Learn fire system integration, equipment protection sequences, emergency protocols, and critical safety system commissioning.';
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
              <AlertTriangle className="h-8 w-8 text-yellow-400 flex-shrink-0" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Alarm Responses and Safety Shutdowns
                </h1>
                <p className="text-base text-white mt-2">
                  Critical safety systems and emergency response procedures
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                Section 6
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                27 min read
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
                No matter how efficient a building operates, safety always comes first. A Building Management System must 
                respond quickly and correctly to alarms such as fire, equipment failure, or hazardous conditions. It achieves 
                this through sophisticated alarm response systems and safety shutdown procedures that override normal control 
                to protect both people and property.
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                <strong>Alarm responses</strong> are triggered when monitored conditions exceed safe limits, providing early 
                warning and corrective actions. <strong>Safety shutdowns</strong> are emergency procedures that override normal 
                operation to prevent injury, equipment damage, or system failures from escalating into catastrophic events.
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                For electricians, this means ensuring all alarm circuits, interlocks, and emergency relays are wired and tested 
                properly. A single wiring error can prevent a shutdown sequence from operating—with potentially life-threatening 
                consequences. Understanding these critical safety functions is essential for proper BMS installation and commissioning.
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
                  "Explain the purpose and types of alarm responses in BMS operation",
                  "Describe safety shutdown procedures and their critical importance",
                  "Identify common alarm and shutdown scenarios in building systems",
                  "Understand fire system integration and life safety requirements",
                  "Apply proper wiring techniques for alarm and safety circuits",
                  "Implement equipment protection and emergency response sequences",
                  "Commission and test safety systems using proper procedures",
                  "Recognise electrician responsibilities in safety-critical system installation"
                ].map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 1: Alarm Response Systems */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Siren className="h-6 w-6 text-yellow-400" />
                1. Alarm Response Systems and Classifications
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Alarm response systems continuously monitor building conditions and equipment status, triggering appropriate 
                actions when parameters exceed safe operating limits. Effective alarm management prevents minor issues from 
                developing into major problems while ensuring critical alarms receive immediate attention.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Alarm Classification and Priority Levels:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-2 text-white">Priority Level</th>
                        <th className="text-left py-2 text-white">Response Time</th>
                        <th className="text-left py-2 text-white">Action Required</th>
                        <th className="text-left py-2 text-white">Notification Method</th>
                        <th className="text-left py-2 text-white">Examples</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      <tr className="border-b border-gray-700">
                        <td className="py-2 font-medium text-red-300">Critical</td>
                        <td className="py-2">Immediate</td>
                        <td className="py-2">Emergency shutdown</td>
                        <td className="py-2">Audible + SMS + Email</td>
                        <td className="py-2">Fire alarm, gas leak, equipment failure</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 font-medium text-orange-300">High</td>
                        <td className="py-2">&lt; 15 minutes</td>
                        <td className="py-2">Operator intervention</td>
                        <td className="py-2">BMS alert + Email</td>
                        <td className="py-2">High temperature, equipment fault</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 font-medium text-yellow-300">Medium</td>
                        <td className="py-2">&lt; 1 hour</td>
                        <td className="py-2">Investigation needed</td>
                        <td className="py-2">BMS notification</td>
                        <td className="py-2">Filter change due, maintenance required</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium text-blue-300">Low</td>
                        <td className="py-2">&lt; 24 hours</td>
                        <td className="py-2">Monitor trend</td>
                        <td className="py-2">Log entry only</td>
                        <td className="py-2">Minor parameter deviation, informational</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Environmental Alarm Types:</h4>
                <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-blue-200 mb-2">Atmospheric Monitoring Alarms</h5>
                  <div className="space-y-3 text-blue-100 text-sm">
                    <div>
                      <p><strong>CO₂ Level Alarms:</strong> High CO₂ triggers increased ventilation or occupancy warnings</p>
                      <p>Typical thresholds: 1000ppm (warning), 1500ppm (action), 5000ppm (danger)</p>
                    </div>
                    <div>
                      <p><strong>Temperature Extremes:</strong> Space temperatures outside comfort or safety limits</p>
                      <p>Freeze protection: &lt;5°C, High temperature: &gt;35°C in occupied spaces</p>
                    </div>
                    <div>
                      <p><strong>Humidity Control:</strong> Excessive humidity can cause condensation and mould issues</p>
                      <p>Typical limits: &lt;30% RH (too dry), &gt;70% RH (condensation risk)</p>
                    </div>
                    <div>
                      <p><strong>Air Quality Monitoring:</strong> Volatile organic compounds (VOCs) and particulate matter</p>
                      <p>Triggers enhanced filtration or increased fresh air supply</p>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Automatic Responses:</strong> Increase ventilation rates, activate air cleaning systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Trend Monitoring:</strong> Track gradual changes that indicate developing problems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Occupant Notification:</strong> Display systems warn of poor air quality conditions</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Equipment Status Alarms:</h4>
                <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-amber-200 mb-2">Critical Equipment Monitoring</h5>
                  <div className="space-y-3 text-amber-100 text-sm">
                    <div>
                      <p><strong>Fan and Pump Failures:</strong> Status monitoring via current sensors or auxiliary contacts</p>
                      <p>Automatic switchover to standby equipment where available</p>
                    </div>
                    <div>
                      <p><strong>Filter Condition Alarms:</strong> Differential pressure monitoring across filters</p>
                      <p>Graduated alerts: maintenance due, change required, system bypass needed</p>
                    </div>
                    <div>
                      <p><strong>Motor and Drive Faults:</strong> Overload, overheating, and communication failures</p>
                      <p>Immediate shutdown to prevent damage, with restart inhibit until fault cleared</p>
                    </div>
                    <div>
                      <p><strong>Valve and Actuator Position:</strong> Feedback monitoring for critical control devices</p>
                      <p>Alerts when commanded position doesn't match actual position feedback</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Electrical and Power Alarms:</h4>
                <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                  <h5 className="font-semibold text-red-200 mb-2">Power System Monitoring</h5>
                  <div className="space-y-2 text-red-100 text-sm">
                    <p><strong>Power Loss Alarms:</strong> Monitoring of critical circuit power status and UPS operation</p>
                    <p><strong>Circuit Breaker Status:</strong> Monitoring of motor control centre and distribution board breakers</p>
                    <p><strong>Phase Loss Detection:</strong> Three-phase supply monitoring for motor protection</p>
                    <p><strong>Power Quality Issues:</strong> Voltage fluctuations, harmonics, and power factor monitoring</p>
                  </div>
                </div>
              </div>

              <InlineCheckComponent
                checkId="check1"
                question="Give one example of an environmental alarm that a BMS might detect."
                options={[
                  "A motor running at normal speed",
                  "High CO₂ levels in an occupied space",
                  "Normal room temperature",
                  "Proper filter condition"
                ]}
                correctAnswer={1}
                explanation="High CO₂ levels in an occupied space is a common environmental alarm that triggers increased ventilation to maintain acceptable indoor air quality and occupant comfort."
              />
            </CardContent>
          </Card>

          {/* Section 2: Safety Shutdown Procedures */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-400" />
                2. Safety Shutdown Procedures and Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Safety shutdowns override normal BMS operation to protect life, property, and equipment when hazardous 
                conditions are detected. These procedures must be fast, reliable, and thoroughly tested to ensure they 
                operate correctly during actual emergencies.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Fire System Integration Responses:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-2 text-white">Fire Zone</th>
                        <th className="text-left py-2 text-white">HVAC Action</th>
                        <th className="text-left py-2 text-white">Damper Control</th>
                        <th className="text-left py-2 text-white">Extract Fans</th>
                        <th className="text-left py-2 text-white">Access Control</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      <tr className="border-b border-gray-700">
                        <td className="py-2">General Alarm</td>
                        <td className="py-2">Shut down supply fans</td>
                        <td className="py-2">Close fire dampers</td>
                        <td className="py-2">Maintain operation</td>
                        <td className="py-2">Release magnetic locks</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2">Smoke Detection</td>
                        <td className="py-2">Stop all AHUs in zone</td>
                        <td className="py-2">Close supply, open extract</td>
                        <td className="py-2">Start smoke extract</td>
                        <td className="py-2">Override to fire evacuation</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2">Stairwell</td>
                        <td className="py-2">Pressurisation mode</td>
                        <td className="py-2">Open stair supply</td>
                        <td className="py-2">Extract from lobby</td>
                        <td className="py-2">Enable all exits</td>
                      </tr>
                      <tr>
                        <td className="py-2">Plant Room</td>
                        <td className="py-2">Emergency shutdown</td>
                        <td className="py-2">Close all dampers</td>
                        <td className="py-2">Dedicated extract only</td>
                        <td className="py-2">Lock down area</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Equipment Protection Shutdowns:</h4>
                <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-blue-200 mb-2">Critical Equipment Protection Sequences</h5>
                  <div className="space-y-3 text-blue-100 text-sm">
                    <div>
                      <p><strong>Chiller Protection:</strong> High discharge pressure, low refrigerant flow, or compressor fault</p>
                      <p>Sequence: Stage down compressors → Close refrigerant valves → Start condenser purge → Lockout</p>
                    </div>
                    <div>
                      <p><strong>Boiler Safety Shutdown:</strong> Flame failure, low water level, or high pressure conditions</p>
                      <p>Sequence: Close gas valve → Stop combustion → Post-purge operation → Manual reset required</p>
                    </div>
                    <div>
                      <p><strong>Pump Protection:</strong> Dry running, cavitation, or mechanical seal failure detection</p>
                      <p>Sequence: Immediate stop → Close isolation valves → Start standby if available</p>
                    </div>
                    <div>
                      <p><strong>Motor Overload:</strong> Thermal protection or current overload conditions</p>
                      <p>Sequence: Immediate disconnect → Cool-down period → Restart inhibit until fault cleared</p>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Cascade Protection:</strong> Shutdown of dependent equipment to prevent damage propagation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Restart Inhibit:</strong> Prevent automatic restart until fault is investigated and cleared</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Manual Reset:</strong> Require operator intervention before resuming normal operation</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Gas Detection and Hazmat Response:</h4>
                <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-amber-200 mb-2">Hazardous Gas Response Procedures</h5>
                  <div className="space-y-2 text-amber-100 text-sm">
                    <p><strong>Natural Gas Detection:</strong> Automatic closure of gas supply valves and elimination of ignition sources</p>
                    <p><strong>CO Detection:</strong> Immediate ventilation increase and evacuation alerts for affected areas</p>
                    <p><strong>Refrigerant Leaks:</strong> Equipment shutdown and emergency ventilation to prevent accumulation</p>
                    <p><strong>Chemical Storage Areas:</strong> Containment ventilation and emergency response notification</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Power Failure and Black Start Procedures:</h4>
                <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                  <h5 className="font-semibold text-red-200 mb-2">Emergency Power Management</h5>
                  <div className="space-y-2 text-red-100 text-sm">
                    <p><strong>Orderly Shutdown:</strong> Graceful system shutdown on UPS low battery to preserve data and settings</p>
                    <p><strong>Priority Restoration:</strong> Staggered restart sequence to avoid transformer inrush current</p>
                    <p><strong>Safe Mode Operation:</strong> Resume operation with conservative settings until full system verification</p>
                    <p><strong>Generator Integration:</strong> Automatic transfer and load management during backup power operation</p>
                  </div>
                </div>
              </div>

              <InlineCheckComponent
                checkId="check2"
                question="What action might the BMS take during a fire alarm event?"
                options={[
                  "Increase heating to all zones",
                  "Shut down AHUs to prevent smoke spread and open smoke dampers",
                  "Start all ventilation fans at maximum speed",
                  "Turn on all lighting circuits"
                ]}
                correctAnswer={1}
                explanation="During a fire alarm event, the BMS typically shuts down air handling units to prevent smoke spread through ductwork and opens designated smoke dampers while activating smoke extract systems according to the fire strategy."
              />
            </CardContent>
          </Card>

          {/* Section 3: Electrician's Role in Safety Systems */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                3. Electrician's Role in Safety System Implementation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Electricians play a crucial role in ensuring safety functions operate correctly through proper installation, 
                wiring, and testing of alarm circuits, interlocks, and emergency control devices. Safety-critical circuits 
                require special attention to detail and rigorous testing procedures.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Safety Circuit Installation Requirements:</h4>
                <div className="space-y-3 text-white">
                  <div>
                    <h5 className="font-medium text-white mb-1">Fire System Integration Wiring</h5>
                    <p className="text-sm text-white">Install monitored circuits between fire alarm panels and BMS with appropriate cable types (fire-rated) and proper termination methods</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Emergency Relay and Contactor Installation</h5>
                    <p className="text-sm text-white">Install safety-rated relays and contactors that allow BMS to interrupt power safely during emergency conditions</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Gas Detection System Wiring</h5>
                    <p className="text-sm text-white">Connect gas detection systems to BMS with appropriate intrinsically safe circuits where required</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Critical Circuit Segregation</h5>
                    <p className="text-sm text-white">Maintain physical separation between safety circuits and standard control wiring using dedicated conduits and cable trays</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Interlock Wiring and Configuration:</h4>
                <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-blue-200 mb-2">Critical Interlock Implementation</h5>
                  <div className="space-y-3 text-blue-100 text-sm">
                    <div>
                      <p><strong>Hardwired Safety Interlocks:</strong> Direct wiring between safety devices and equipment</p>
                      <p>Example: Gas valve interlock directly wired to flame scanner, bypassing BMS control</p>
                    </div>
                    <div>
                      <p><strong>Monitored Interlock Circuits:</strong> BMS monitors interlock status but cannot override safety functions</p>
                      <p>Example: Fire damper end switches monitored but controlled by fire panel</p>
                    </div>
                    <div>
                      <p><strong>Redundant Safety Circuits:</strong> Multiple independent paths for critical safety functions</p>
                      <p>Example: Boiler flame failure detected by multiple independent flame sensors</p>
                    </div>
                    <div>
                      <p><strong>Fail-Safe Circuit Design:</strong> Circuits designed to fail to safe state during power or component failure</p>
                      <p>Example: Fire dampers close on power loss, normally energised to remain open</p>
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Wire Rating:</strong> Use appropriately rated conductors for safety circuit applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Circuit Protection:</strong> Proper fusing and protection to maintain safety integrity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Environmental Protection:</strong> Weatherproof terminations for external safety devices</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Labelling and Documentation Standards:</h4>
                <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-amber-200 mb-2">Safety Circuit Identification</h5>
                  <div className="space-y-2 text-amber-100 text-sm">
                    <p><strong>Colour Coding:</strong> Use red labels/conduits for fire circuits, yellow for gas detection, orange for emergency stops</p>
                    <p><strong>Circuit Identification:</strong> Clear labelling at both ends of all safety circuits with unique identifiers</p>
                    <p><strong>Interlock Documentation:</strong> Detailed drawings showing all safety interlocks and their logic</p>
                    <p><strong>Test Procedures:</strong> Step-by-step procedures for testing each safety function during commissioning</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Emergency Power and UPS Integration:</h4>
                <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                  <h5 className="font-semibold text-red-200 mb-2">Critical Power System Requirements</h5>
                  <div className="space-y-2 text-red-100 text-sm">
                    <p><strong>UPS-Backed Circuits:</strong> Safety systems requiring continuous power during outages</p>
                    <p><strong>Generator Integration:</strong> Automatic transfer systems for extended emergency operation</p>
                    <p><strong>Battery Backup:</strong> Local battery backup for critical safety devices where UPS is not available</p>
                    <p><strong>Power Quality:</strong> Clean power supplies for sensitive safety monitoring equipment</p>
                  </div>
                </div>
              </div>

              <InlineCheckComponent
                checkId="check3"
                question="Why must alarm and shutdown circuits be labelled differently from standard control wiring?"
                options={[
                  "To make the installation look more organised",
                  "To prevent confusion during maintenance and ensure safety circuits are not accidentally modified",
                  "To reduce installation costs",
                  "To comply with manufacturer colour preferences"
                ]}
                correctAnswer={1}
                explanation="Alarm and shutdown circuits must be clearly labelled to prevent confusion during maintenance and ensure safety-critical circuits are not accidentally modified, disconnected, or interfered with during routine work."
              />
            </CardContent>
          </Card>

          {/* Section 4: Testing and Commissioning */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Eye className="h-6 w-6 text-yellow-400" />
                4. Testing and Commissioning Safety Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Comprehensive testing and commissioning of safety systems is essential to ensure they operate correctly 
                during actual emergencies. Testing must verify both individual component function and complete system 
                response under simulated emergency conditions.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Systematic Testing Procedures:</h4>
                <div className="space-y-3 text-white">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</div>
                    <div>
                      <h5 className="font-medium text-white mb-1">Individual Device Testing</h5>
                      <p className="text-sm text-white">Test each alarm sensor, shutdown relay, and safety device independently to verify correct operation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</div>
                    <div>
                      <h5 className="font-medium text-white mb-1">Circuit Continuity and Insulation</h5>
                      <p className="text-sm text-white">Verify wiring integrity, insulation resistance, and proper termination of all safety circuits</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</div>
                    <div>
                      <h5 className="font-medium text-white mb-1">Interlock Logic Verification</h5>
                      <p className="text-sm text-white">Test all safety interlocks to ensure proper sequence and timing of shutdown procedures</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">4</div>
                    <div>
                      <h5 className="font-medium text-white mb-1">End-to-End System Testing</h5>
                      <p className="text-sm text-white">Simulate complete emergency scenarios to verify total system response</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">5</div>
                    <div>
                      <h5 className="font-medium text-white mb-1">Documentation and Certification</h5>
                      <p className="text-sm text-white">Record all test results and obtain necessary certifications for safety system operation</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Fire System Integration Testing:</h4>
                <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-red-200 mb-2">Fire Alarm Interface Verification</h5>
                  <div className="space-y-2 text-red-100 text-sm">
                    <p><strong>Smoke Detector Simulation:</strong> Use smoke simulator to test detector response and BMS integration</p>
                    <p><strong>Manual Call Point Testing:</strong> Verify BMS receives fire alarm signals from manual activation points</p>
                    <p><strong>Damper Operation:</strong> Test fire damper closure and smoke damper opening during alarm conditions</p>
                    <p><strong>Fan Control Verification:</strong> Confirm supply fans stop and extract fans start as per fire strategy</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Equipment Protection Testing:</h4>
                <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-blue-200 mb-2">Fault Simulation and Response</h5>
                  <div className="space-y-2 text-blue-100 text-sm">
                    <p><strong>Sensor Simulation:</strong> Use calibrated test equipment to simulate fault conditions safely</p>
                    <p><strong>Timing Verification:</strong> Measure response times for critical shutdown sequences</p>
                    <p><strong>Cascade Testing:</strong> Verify dependent equipment shuts down in correct sequence</p>
                    <p><strong>Reset Procedures:</strong> Test manual reset requirements and automatic restart inhibits</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Ongoing Maintenance and Testing:</h4>
                <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                  <h5 className="font-semibold text-amber-200 mb-2">Regular Testing Schedule</h5>
                  <div className="space-y-2 text-amber-100 text-sm">
                    <p><strong>Weekly Tests:</strong> Alarm notification systems and basic sensor function checks</p>
                    <p><strong>Monthly Tests:</strong> Manual shutdown testing and interlock verification</p>
                    <p><strong>Annual Tests:</strong> Complete system testing including fire system integration</p>
                    <p><strong>Trend Analysis:</strong> Review alarm patterns to identify potential equipment issues</p>
                  </div>
                </div>
              </div>

              <InlineCheckComponent
                checkId="check4"
                question="What commissioning step is required to test shutdown sequences?"
                options={[
                  "Visual inspection of wiring only",
                  "Simulate fire, gas, and fault alarms to prove sequences work correctly",
                  "Test only during actual emergencies", 
                  "Check manufacturer documentation only"
                ]}
                correctAnswer={1}
                explanation="Commissioning must include simulating fire, gas, and fault alarms using appropriate test equipment to prove that all shutdown sequences work correctly, respond within acceptable time limits, and operate in the correct sequence."
              />
            </CardContent>
          </Card>

          {/* Real-world Case Study */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Flame className="h-6 w-6 text-yellow-400" />
                Real-world Case Study: Shopping Mall Fire System Integration Failure
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">The Incident</h4>
                <p className="text-amber-100 text-sm">
                  A large shopping mall's fire alarm system was integrated with the BMS to provide coordinated emergency response. 
                  The design required all Air Handling Units (AHUs) to shut down when fire alarms activated, while smoke extract 
                  fans started to create positive pressure in escape routes. During commissioning testing, one AHU continued 
                  running when the fire alarm was triggered, potentially compromising the fire evacuation strategy.
                </p>
              </div>
              
              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2">Investigation Process</h4>
                <div className="space-y-2 text-blue-100 text-sm">
                  <p><strong>Initial Testing:</strong> Commissioning team activated fire alarm and observed AHU responses</p>
                  <p><strong>Problem Identification:</strong> AHU-7 (serving food court area) remained operational during alarm</p>
                  <p><strong>Circuit Tracing:</strong> Electricians traced fire alarm interface wiring to BMS control panel</p>
                  <p><strong>Root Cause:</strong> Fire alarm relay output connected to wrong BMS input terminal</p>
                </div>
              </div>

              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-2">Technical Details</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-white text-sm">
                  <div>
                    <h5 className="font-medium text-white mb-2">Original Installation Error</h5>
                    <p className="mb-2">• Fire panel Zone 7 output wired to BMS Input 8</p>
                    <p className="mb-2">• BMS Input 7 connected to different fire zone</p>
                    <p className="mb-2">• Control logic programmed for correct inputs</p>
                    <p>• No verification testing performed initially</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-2">Correction Required</h5>
                    <p className="mb-2">• Rewire Zone 7 output to correct BMS input</p>
                    <p className="mb-2">• Test all fire zone interfaces individually</p>
                    <p className="mb-2">• Verify AHU shutdown for each zone</p>
                    <p>• Update circuit documentation</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-200 mb-2">Potential Consequences</h4>
                <div className="space-y-2 text-red-100 text-sm">
                  <p><strong>Fire Spread Risk:</strong> Operating AHU could spread smoke from food court to other mall areas</p>
                  <p><strong>Evacuation Compromise:</strong> Smoke in escape routes could impede safe evacuation</p>
                  <p><strong>Legal Implications:</strong> Non-compliance with fire safety regulations and building codes</p>
                  <p><strong>Insurance Issues:</strong> Potential insurance claim disputes due to safety system failures</p>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-2">Lessons Learned and Improvements</h4>
                <div className="space-y-2 text-green-100 text-sm">
                  <p><strong>Systematic Testing:</strong> Individual testing of each fire zone interface implemented</p>
                  <p><strong>Documentation Standards:</strong> Improved circuit labelling and as-built drawing accuracy</p>
                  <p><strong>Verification Procedures:</strong> Multi-stage verification of safety circuit terminations</p>
                  <p><strong>Training Enhancement:</strong> Additional training for electricians on safety circuit importance</p>
                  <p><strong>Regular Audits:</strong> Annual verification testing of all fire system interfaces</p>
                </div>
              </div>

              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-2">Key Takeaways for Electricians</h4>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Circuit Verification:</strong> Always verify safety circuit terminations match design drawings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Individual Testing:</strong> Test each safety function independently before system integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Documentation Accuracy:</strong> Ensure as-built drawings reflect actual installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Safety First:</strong> A single wiring error can compromise entire building safety systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <span><strong>Professional Responsibility:</strong> Safety system installation requires highest attention to detail</span>
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
              <p className="text-sm sm:text-base">
                Alarm responses and safety shutdowns form the critical safety backbone of any BMS installation. These systems 
                must respond quickly and reliably to protect both people and property during emergency conditions. From fire 
                system integration to equipment protection sequences, every aspect requires careful design and meticulous implementation.
              </p>
              <p className="text-sm sm:text-base">
                For electricians, the responsibility extends beyond simple wiring to ensuring the integrity of life safety systems. 
                Proper installation techniques, rigorous testing procedures, and accurate documentation are essential for creating 
                systems that will perform correctly when lives depend on them.
              </p>
              <p className="text-sm sm:text-base">
                The shopping mall case study demonstrates how a seemingly minor wiring error could have had serious consequences. 
                This reinforces the critical importance of systematic testing, proper documentation, and treating all safety-related 
                work with the highest level of professional care and attention to detail.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4 mt-6">
                <h4 className="font-semibold text-yellow-400 mb-3">Key Takeaways for Electricians:</h4>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Safety systems require the highest standard of installation and testing procedures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Fire system integration must be thoroughly tested and verified during commissioning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Equipment protection shutdowns prevent minor faults from becoming major failures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Proper labelling and documentation prevent dangerous confusion during maintenance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>A single wiring error can compromise entire building safety strategies</span>
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
                Test your understanding of alarm responses and safety shutdown systems. This quiz covers fire system integration, equipment protection procedures, safety circuit installation, and commissioning requirements.
              </p>
              <SingleQuestionQuiz 
                questions={bmsModule3Section6QuizData} 
                title="Alarm Responses and Safety Shutdowns Quiz"
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between mt-12 max-w-4xl mx-auto">
          <Link to="../bms-module-3-section-5" className={isMobile ? 'w-full mr-2' : ''}>
            <Button variant="outline" className={`border-gray-600 text-white hover:bg-card ${isMobile ? 'w-full py-3' : ''}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Section
            </Button>
          </Link>
          <Link to="../bms-module-4" className={isMobile ? 'w-full ml-2' : ''}>
            <Button className={`bg-yellow-400 text-black hover:bg-yellow-600 ${isMobile ? 'w-full py-3' : ''}`}>
              Next Module
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BMSModule3Section6;