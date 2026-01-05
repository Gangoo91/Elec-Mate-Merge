import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Settings, Target, CheckCircle, Zap, Cog, Wrench, AlertTriangle, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule2Section3QuizData } from '@/data/upskilling/bmsModule2Section3QuizData';

const BMSModule2Section3 = () => {
  const [inlineChecks, setInlineChecks] = useState<Record<string, number | null>>({
    check1: null,
    check2: null,
    check3: null,
    check4: null
  });

  // SEO
  useEffect(() => {
    const title = 'Actuators, Valves, and Dampers | BMS Module 2 Section 3';
    document.title = title;
    const desc = 'Learn about actuators, valves, and dampers in Building Management Systems. Understand control devices, installation requirements, and wiring for HVAC control systems.';
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
              <Settings className="h-8 w-8 text-yellow-400 flex-shrink-0" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Actuators, Valves, and Dampers
                </h1>
                <p className="text-base text-white mt-2">
                  Control devices and mechanical components
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                Section 3
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
                In a Building Management System (BMS), actuators are the <strong>"muscles"</strong> that carry out commands. 
                They take signals from the BMS (digital or analog) and physically move devices such as valves 
                (for water flow) or dampers (for air control).
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                Electricians often install and wire these components, making it essential to understand how they function, 
                where they are used, and how correct installation ensures system reliability. Understanding the difference 
                between digital (on/off) and analog (modulating) control is crucial for proper implementation.
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
                  "Explain the role of actuators in a BMS",
                  "Identify different types of actuators used with valves and dampers", 
                  "Understand the difference between digital (on/off) and analog (modulating) control",
                  "Recognise the electrician's responsibilities in installing and wiring actuators"
                ].map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 1: Actuators - The Basics */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                1. Actuators – The Basics
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Actuators convert electrical signals into mechanical movement, serving as the physical interface 
                between the digital BMS and mechanical building systems.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Types of Actuators:</h4>
                <div className="space-y-3 text-white">
                  <div>
                    <h5 className="font-medium text-white mb-1">On/Off (Digital) Actuators</h5>
                    <p className="text-sm text-white">Provide binary control - fully open or fully closed position only. Typically 24V AC/DC operation with 2-position control.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Modulating (Analog) Actuators</h5>
                    <p className="text-sm text-white">Allow precise positioning anywhere between 0-100%. Accept 0-10V DC or 4-20mA control signals for proportional control.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Spring Return vs Non-Spring Return</h5>
                    <p className="text-sm text-white">Spring return fail to predetermined position on power loss. Non-spring return hold last position during power failure.</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2">Technical Specifications</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-blue-100 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-300 mb-2">Power Requirements</h5>
                    <p className="mb-2">24V AC/DC most common for HVAC</p>
                    <p className="mb-2">230V AC for larger industrial actuators</p>
                    <p>Power consumption: 3-10VA typical</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300 mb-2">Control Signals</h5>
                    <p className="mb-2">Digital: 24V AC/DC or dry contacts</p>
                    <p className="mb-2">Analog: 0-10V DC or 4-20mA</p>
                    <p>Operating time: 15 seconds to 4 minutes full stroke</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-200 mb-2">Applications</h4>
                <div className="space-y-3 text-purple-100 text-sm">
                  <div>
                    <h5 className="font-medium text-purple-300">HVAC Control</h5>
                    <p>Temperature control through valve and damper positioning for optimal comfort and energy efficiency</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300">Energy Optimisation</h5>
                    <p>Variable flow control in chilled water and heating systems to match building demand</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300">Safety Systems</h5>
                    <p>Fire and smoke dampers for emergency isolation and smoke control systems</p>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="check1"
                question="What is the difference between an on/off actuator and a modulating actuator?"
                options={[
                  "On/off actuators are faster than modulating actuators",
                  "On/off actuators move fully open or closed, while modulating actuators adjust position gradually",
                  "On/off actuators use more power than modulating actuators", 
                  "On/off actuators are only used for safety systems"
                ]}
                correctAnswer={1}
                explanation="On/off (digital) actuators provide binary control with only two positions - fully open or fully closed. Modulating (analog) actuators allow precise positioning at any point between 0-100% for proportional control."
              />
            </CardContent>
          </Card>

          {/* Section 2: Valves in BMS */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Cog className="h-6 w-6 text-yellow-400" />
                2. Valves in BMS
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Control valves regulate the flow of water or other fluids in HVAC systems. Combined with actuators, 
                they provide precise flow control for heating, cooling, and domestic water systems.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Types of Valves:</h4>
                <div className="space-y-3 text-white">
                  <div>
                    <h5 className="font-medium text-white mb-1">2-Way Valves</h5>
                    <p className="text-sm text-white">Regulate flow rate in a single circuit. Used for flow control and on/off isolation in heating and cooling coils.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">3-Way Valves</h5>
                    <p className="text-sm text-white">Divert flow between two circuits. Mixing valves blend hot and cold water. Diverting valves switch flow direction.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Ball Valves vs Globe Valves</h5>
                    <p className="text-sm text-white">Ball valves: Quick 90° operation, full bore flow. Globe valves: Better for throttling control, linear flow characteristics.</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-2">Valve Sizing and Flow Characteristics</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-green-100 text-sm">
                  <div>
                    <h5 className="font-medium text-green-300 mb-2">Cv Rating</h5>
                    <p className="mb-2">Flow coefficient: GPM at 1 PSI pressure drop</p>
                    <p className="mb-2">Critical for proper system performance</p>
                    <p>Oversized valves cause poor control resolution</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300 mb-2">Flow Characteristics</h5>
                    <p className="mb-2">Linear: Flow proportional to valve position</p>
                    <p className="mb-2">Equal percentage: Better for variable loads</p>
                    <p>Quick opening: Maximum flow with small movement</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2">Installation and Connection</h4>
                <div className="space-y-3 text-blue-100 text-sm">
                  <div>
                    <h5 className="font-medium text-blue-300">Actuator Mounting</h5>
                    <p>Direct mount to valve stem with coupling. Ensure proper alignment to prevent binding and wear</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Pipe Installation</h5>
                    <p>Install with flow direction arrow. Provide isolation valves and bypass where required for maintenance</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300">Control Wiring</h5>
                    <p>Separate power and control circuits. Label all connections clearly for maintenance access</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">Applications</h4>
                <div className="space-y-3 text-amber-100 text-sm">
                  <div>
                    <h5 className="font-medium text-amber-300">Chilled Water Systems</h5>
                    <p>Control cooling coil capacity in AHUs and FCUs. 2-way valves for variable flow, 3-way for constant flow systems</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">Heating Coils</h5>
                    <p>LTHW and steam heating control. Often require spring return actuators for freeze protection</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">Hot Water Distribution</h5>
                    <p>Domestic hot water temperature control and circulation system management</p>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="check2"
                question="What type of valve diverts flow between two different circuits?"
                options={[
                  "2-way valve",
                  "Ball valve",
                  "3-way valve", 
                  "Globe valve"
                ]}
                correctAnswer={2}
                explanation="3-way valves can divert flow between two different circuits. They can be configured as mixing valves (combining two inlet flows) or diverting valves (splitting one inlet to two outlets)."
              />
            </CardContent>
          </Card>

          {/* Section 3: Dampers in BMS */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Wrench className="h-6 w-6 text-yellow-400" />
                3. Dampers in BMS
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Dampers control airflow in ducts and ventilation systems. They can operate digitally 
                (fully open/closed) or with analog control for precise airflow modulation.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Types of Dampers:</h4>
                <div className="space-y-3 text-white">
                  <div>
                    <h5 className="font-medium text-white mb-1">Volume Control Dampers</h5>
                    <p className="text-sm text-white">Regulate airflow quantity in supply, return, and exhaust systems for comfort and energy efficiency.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Fire/Smoke Dampers</h5>
                    <p className="text-sm text-white">Safety devices that close automatically during fire conditions to prevent smoke spread through ductwork.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Outside Air Dampers</h5>
                    <p className="text-sm text-white">Control fresh air intake for ventilation and economiser operation. Often linked to CO₂ sensors.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Mixed Air Dampers</h5>
                    <p className="text-sm text-white">Coordinate outside air, return air, and exhaust air for optimal temperature and energy control.</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-200 mb-2">Damper Construction and Operation</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-purple-100 text-sm">
                  <div>
                    <h5 className="font-medium text-purple-300 mb-2">Blade Types</h5>
                    <p className="mb-2">Parallel blade: Better shutoff, higher pressure drop</p>
                    <p className="mb-2">Opposed blade: Better flow control characteristics</p>
                    <p>Multi-blade: Large area applications</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-300 mb-2">Leakage Classes</h5>
                    <p className="mb-2">Class I: Standard leakage (3-4 CFM/ft²)</p>
                    <p className="mb-2">Class II: Low leakage (1-2 CFM/ft²)</p>
                    <p>Class III: Extra low leakage (&lt;1 CFM/ft²)</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-2">Control Applications</h4>
                <div className="space-y-3 text-green-100 text-sm">
                  <div>
                    <h5 className="font-medium text-green-300">Fresh Air Intake Control</h5>
                    <p>Minimum ventilation rates per BS EN 16798. Variable control based on occupancy and CO₂ levels</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Smoke Control Systems</h5>
                    <p>Automatic fire dampers linked to fire alarm systems. Spring return operation for fail-safe closure</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Pressure Regulation</h5>
                    <p>Building pressure control and zone pressure management for comfort and energy efficiency</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300">Free Cooling (Economiser)</h5>
                    <p>Automatic control when outside air temperature is suitable for cooling, reducing mechanical cooling load</p>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="check3"
                question="Give one example of how dampers are used in a ventilation system."
                options={[
                  "To control water temperature in heating coils",
                  "To detect occupancy in meeting rooms",
                  "To control fresh air intake for ventilation", 
                  "To measure CO₂ levels in classrooms"
                ]}
                correctAnswer={2}
                explanation="Dampers are commonly used to control fresh air intake in ventilation systems, regulating the amount of outside air entering the building for proper ventilation and energy efficiency."
              />
            </CardContent>
          </Card>

          {/* Section 4: Installation and Electrician's Role */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                4. Installation and Electrician's Role
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg">
                Proper installation and wiring of actuators is critical for system performance and reliability. 
                Electricians must understand control signal types and follow best practices for installation.
              </p>
              
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Wiring Requirements:</h4>
                <div className="space-y-3 text-white">
                  <div>
                    <h5 className="font-medium text-white mb-1">Digital Control (DI/DO)</h5>
                    <p className="text-sm text-white">24V AC/DC or dry contact switching for on/off actuators. Simple 2-wire or 3-wire configurations.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Analog Control (AI/AO)</h5>
                    <p className="text-sm text-white">0-10V DC or 4-20mA signals for modulating actuators. Requires screened cable and proper earthing.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-white mb-1">Power Supply Separation</h5>
                    <p className="text-sm text-white">Keep power and control circuits separate. Use different cable routes to avoid interference.</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-200 mb-2">Critical Installation Checks</h4>
                <div className="space-y-3 text-red-100 text-sm">
                  <div>
                    <h5 className="font-medium text-red-300">Power Supply Verification</h5>
                    <p>Confirm voltage matches actuator requirements. Check for proper earthing and circuit protection</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">Control Signal Testing</h5>
                    <p>Verify signal levels and polarity. Test full range operation for modulating actuators</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">Mechanical Installation</h5>
                    <p>Check actuator alignment and coupling. Ensure no binding or excessive force required</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-300">Safety Considerations</h5>
                    <p>Verify spring return operation for safety applications. Test emergency stop functions</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">Commissioning and Testing</h4>
                <div className="space-y-3 text-amber-100 text-sm">
                  <div>
                    <h5 className="font-medium text-amber-300">Movement Testing</h5>
                    <p>Test full stroke operation and verify correct direction. Check operating time meets specification</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">Control Response</h5>
                    <p>Verify actuator responds correctly to BMS commands. Test both manual override and automatic operation</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-amber-300">Documentation</h5>
                    <p>Record actuator settings, stroke times, and calibration data for maintenance teams</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-200 mb-2">Coordination with HVAC Engineers</h4>
                <p className="text-blue-100 text-sm mb-3">
                  Close collaboration with HVAC engineers ensures actuators match system design requirements:
                </p>
                <ul className="text-blue-100 text-sm space-y-1">
                  <li>• Confirm actuator torque ratings match valve/damper requirements</li>
                  <li>• Verify stroke time specifications for system response needs</li>
                  <li>• Check spring return requirements for safety applications</li>
                  <li>• Coordinate control sequences and interlocks</li>
                </ul>
              </div>

              <InlineCheck
                id="check4"
                question="Why must electricians test actuator movement during commissioning?"
                options={[
                  "To check the actuator's power consumption",
                  "To confirm correct operation and system response before handover",
                  "To measure the actuator's noise levels", 
                  "To verify the actuator's warranty coverage"
                ]}
                correctAnswer={1}
                explanation="Testing actuator movement during commissioning confirms that the actuator operates correctly, responds to control signals, and moves in the right direction before the system is handed over to the client. This prevents operational issues and ensures system reliability."
              />
            </CardContent>
          </Card>

          {/* Practical Guidance */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Wrench className="h-6 w-6 text-yellow-400" />
                Practical Guidance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base sm:text-lg font-medium text-yellow-400">As an electrician:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-white">Always verify the actuator type before installation — digital and analog wiring differ significantly</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-white">Label cables clearly; actuator wiring often involves multiple conductors and signal types</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-white">Check actuator stroke time (speed of movement) to ensure it matches system design needs</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-white">Keep documentation of actuator settings and configurations for maintenance teams</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Example */}
          <Card className="bg-gradient-to-br from-elec-gray to-gray-800 border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Activity className="h-6 w-6 text-yellow-400" />
                Real World Example
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-200 mb-2">The Problem</h4>
                <p className="text-red-100 text-sm">
                  On a commercial office project, several modulating valve actuators were mistakenly wired as on/off devices. 
                  This meant the BMS could only open or close valves fully, instead of adjusting flow gradually.
                </p>
              </div>
              <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-200 mb-2">The Impact</h4>
                <p className="text-amber-100 text-sm">
                  The result was poor temperature control and occupant complaints. Rooms were either too hot or too cold, 
                  with no ability to maintain comfortable intermediate temperatures. Energy consumption increased due to 
                  inefficient operation.
                </p>
              </div>
              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-200 mb-2">The Solution</h4>
                <p className="text-green-100 text-sm">
                  After rewiring correctly into analog input/output channels with proper 0-10V control signals, 
                  the system delivered smooth modulation and improved comfort. The building achieved its target 
                  temperatures and reduced energy consumption by 15%.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-gradient-to-br from-elec-gray to-gray-800 border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p>Actuators are the mechanical output devices of a BMS, converting electrical signals into physical movement</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p>Valves control fluid flow in water systems; dampers control air movement in ventilation systems</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p>On/off actuators provide binary control, while modulating actuators allow precise positional adjustment</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p>Correct wiring, thorough testing, and close coordination with HVAC engineers are essential for reliable operation</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Activity className="h-6 w-6 text-yellow-400" />
                Knowledge Check Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz 
                questions={bmsModule2Section3QuizData}
                title="Actuators, Valves, and Dampers Quiz"
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between pt-8">
            <Link to="../bms-module-2-section-2">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bms-module-2-section-4">
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

export default BMSModule2Section3;