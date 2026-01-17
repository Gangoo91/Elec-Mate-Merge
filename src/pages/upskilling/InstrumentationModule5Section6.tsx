import { ArrowLeft, FileText, CheckCircle2, AlertTriangle, TrendingUp, BarChart, Settings, Zap, Brain, XCircle, Lightbulb, Users, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const InstrumentationModule5Section6 = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "In HVAC control, what is the most common control strategy for maintaining room temperature?",
      options: [
        "On/off control with large deadband",
        "PI control with reset windup prevention",
        "Proportional-only control",
        "Manual control with operator intervention"
      ],
      correctAnswer: 1,
      explanation: "PI control is most common for HVAC temperature control because it eliminates steady-state error while avoiding the noise sensitivity of derivative control."
    },
    {
      id: 2,
      question: "Why is cascade control often used in pressure systems?",
      options: [
        "To reduce equipment costs",
        "To improve response to flow disturbances",
        "To eliminate the need for pressure sensors",
        "To simplify system operation"
      ],
      correctAnswer: 1,
      explanation: "Cascade control uses a fast inner loop (often flow) to quickly reject disturbances before they significantly affect the outer pressure loop."
    },
    {
      id: 3,
      question: "In motor speed control, what advantage does closed-loop control have over open-loop?",
      options: [
        "Lower initial cost",
        "Simpler wiring requirements",
        "Automatic compensation for load changes",
        "Reduced maintenance needs"
      ],
      correctAnswer: 2,
      explanation: "Closed-loop speed control automatically compensates for load changes, maintaining constant speed regardless of varying mechanical loads on the motor."
    },
    {
      id: 4,
      question: "What is the primary challenge when controlling air handling unit (AHU) discharge temperature?",
      options: [
        "High measurement noise",
        "Large dead time in the system",
        "Excessive actuator wear",
        "Frequent setpoint changes"
      ],
      correctAnswer: 1,
      explanation: "AHU systems have significant dead time due to air transport delays and thermal mass, making temperature control challenging and requiring careful tuning."
    },
    {
      id: 5,
      question: "Why might feedforward control be added to a pressure control system?",
      options: [
        "To reduce sensor costs",
        "To anticipate and compensate for known disturbances",
        "To eliminate the need for tuning",
        "To increase system complexity"
      ],
      correctAnswer: 1,
      explanation: "Feedforward control measures disturbances (like flow demand changes) and takes corrective action before they affect the controlled pressure."
    },
    {
      id: 6,
      question: "In variable frequency drive (VFD) motor control, what parameter is typically controlled in the inner loop?",
      options: [
        "Motor power consumption",
        "Motor current or torque",
        "Motor temperature",
        "Motor vibration"
      ],
      correctAnswer: 1,
      explanation: "VFD control typically uses current or torque as the inner loop variable because it responds quickly and directly relates to motor output."
  }
  ];

  function handleAnswerSelect(answerIndex: number) {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
    }));
};

  function handleNext() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
  };
};

  function handlePrevious() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
  };
};

  function calculateScore() {
    let correct = 0;
    quizQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
    };
    });
    return correct;
};

  function resetQuiz() {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizStarted(false);
};

  function startQuiz() {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
};

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const score = calculateScore();
  const percentage = Math.round((score / quizQuestions.length) * 100);

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8 bg-[#1a1a1a]/95">
        <Link to="/study-centre/upskilling/instrumentation-module-5">
          <Button
            variant="ghost"
            className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-elec-yellow" />
            <Badge 
              variant="secondary" 
              className="bg-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 5 - Section 6
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Examples: HVAC, Pressure Systems, and Motor Speed Control
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Real-world applications of control loops in common industrial and building systems
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Learning Outcomes */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">By the end of this section, you'll be able to:</p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Understand HVAC control strategies and challenges</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Analyse pressure control systems and their applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Apply control principles to motor speed control systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Select appropriate control strategies for different applications</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* HVAC Control Systems */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Settings className="h-5 w-5 text-elec-yellow" />
                HVAC Control Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Temperature Control Strategies</h4>
                <p className="text-gray-300 mb-3">
                  HVAC systems require precise temperature control for comfort, energy efficiency, and equipment protection
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-elec-yellow/10 border border-blue-600/20 rounded-lg p-4">
                    <h5 className="text-blue-200 font-medium mb-2">Zone Temperature Control</h5>
                    <p className="text-gray-300 text-sm mb-2">
                      Individual room or area temperature control
                    </p>
                    <ul className="text-gray-300 text-xs space-y-1">
                      <li>• PI control for steady-state accuracy</li>
                      <li>• Slow response acceptable (comfort)</li>
                      <li>• Deadband to prevent short cycling</li>
                      <li>• Occupied/unoccupied setpoint scheduling</li>
                    </ul>
                  </div>
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <h5 className="text-green-200 font-medium mb-2">Air Handling Unit Control</h5>
                    <p className="text-gray-300 text-sm mb-2">
                      Central air system discharge temperature control
                    </p>
                    <ul className="text-gray-300 text-xs space-y-1">
                      <li>• PID control for fast response</li>
                      <li>• Large thermal mass and dead time</li>
                      <li>• Cascade control with flow loops</li>
                      <li>• Economizer and mixed air control</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Multi-Loop Control Strategies</h4>
                <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                  <h5 className="text-purple-200 font-medium mb-2">Cascade Control Example</h5>
                  <p className="text-gray-300 text-sm mb-3">
                    Temperature control with secondary air flow control
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h6 className="text-white font-medium mb-1">Primary Loop (Temperature):</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Measures room or discharge air temperature</li>
                        <li>• Slower response, integrates to eliminate offset</li>
                        <li>• Provides setpoint to secondary loop</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-1">Secondary Loop (Flow/Damper):</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Controls air flow or damper position</li>
                        <li>• Fast response to reject flow disturbances</li>
                        <li>• Improves overall system stability</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Common HVAC Control Challenges</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                    <h5 className="text-red-200 font-medium mb-2">Dead Time and Lag</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Air transport delays in ducts</li>
                      <li>• Thermal mass of building materials</li>
                      <li>• Sensor location and response time</li>
                      <li>• Solution: Conservative tuning, anticipatory control</li>
                    </ul>
                  </div>
                  <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                    <h5 className="text-orange-200 font-medium mb-2">Load Variations</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Occupancy changes throughout day</li>
                      <li>• Weather and solar load variations</li>
                      <li>• Equipment heat gains</li>
                      <li>• Solution: Adaptive control, scheduling</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Energy Optimisation Control</h4>
                <div className="bg-cyan-600/10 border border-cyan-600/20 rounded-lg p-4">
                  <h5 className="text-cyan-200 font-medium mb-2">Advanced Control Strategies</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Economizer Control:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Compares outdoor vs return air conditions</li>
                        <li>• Maximises free cooling when available</li>
                        <li>• Coordinates with mechanical cooling</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-2">Variable Air Volume (VAV):</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Modulates air flow based on demand</li>
                        <li>• Maintains minimum ventilation rates</li>
                        <li>• Coordinates with supply fan control</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pressure Control Systems */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <BarChart className="h-5 w-5 text-elec-yellow" />
                Pressure Control Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Types of Pressure Control</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-elec-yellow/10 border border-blue-600/20 rounded-lg p-4">
                    <h5 className="text-blue-200 font-medium mb-2">Gas Pressure Control</h5>
                    <p className="text-gray-300 text-sm mb-2">
                      Natural gas, compressed air, process gases
                    </p>
                    <ul className="text-gray-300 text-xs space-y-1">
                      <li>• Fast dynamics due to compressibility</li>
                      <li>• Pressure reducing valves (PRV)</li>
                      <li>• Back pressure regulation</li>
                      <li>• Safety relief integration</li>
                    </ul>
                  </div>
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <h5 className="text-green-200 font-medium mb-2">Liquid Pressure Control</h5>
                    <p className="text-gray-300 text-sm mb-2">
                      Water systems, hydraulics, process liquids
                    </p>
                    <ul className="text-gray-300 text-xs space-y-1">
                      <li>• Slower response due to liquid inertia</li>
                      <li>• Pump speed or bypass control</li>
                      <li>• Water hammer considerations</li>
                      <li>• Cavitation prevention</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Compressed Air System Control</h4>
                <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                  <h5 className="text-orange-200 font-medium mb-2">Multi-Compressor Control Strategy</h5>
                  <p className="text-gray-300 text-sm mb-3">
                    Maintaining header pressure with multiple compressors
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h6 className="text-white font-medium mb-1">Load/Unload Control:</h6>
                      <p className="text-gray-300 text-sm">Compressors switch between loaded and unloaded states based on pressure band</p>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-1">Variable Speed Control:</h6>
                      <p className="text-gray-300 text-sm">VFD-controlled compressor modulates speed to maintain exact pressure</p>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-1">Sequencing Logic:</h6>
                      <p className="text-gray-300 text-sm">Automatic staging of multiple compressors based on demand</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Steam Pressure Control</h4>
                <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                  <h5 className="text-purple-200 font-medium mb-2">Boiler and Steam System Control</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Steam Header Pressure:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Multiple boiler coordination</li>
                        <li>• Load-based firing control</li>
                        <li>• Safety interlocks and limits</li>
                        <li>• Feedwater and combustion control</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-2">Pressure Reducing Stations:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• High to low pressure conversion</li>
                        <li>• Temperature control via desuperheating</li>
                        <li>• Cascade control for precision</li>
                        <li>• Bypass and safety valve coordination</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Hydraulic System Control</h4>
                <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
                  <h5 className="text-yellow-200 font-medium mb-2">Variable Pump Control</h5>
                  <p className="text-gray-300 text-sm mb-3">
                    Maintaining system pressure while varying demand
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h6 className="text-white font-medium mb-1">Pump Speed Control:</h6>
                      <p className="text-gray-300 text-sm">VFD adjusts pump speed to maintain differential pressure across system</p>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-1">Bypass Control:</h6>
                      <p className="text-gray-300 text-sm">Three-way valve bypasses excess flow back to tank</p>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-1">Accumulator Systems:</h6>
                      <p className="text-gray-300 text-sm">Pressure vessels smooth out demand variations and reduce cycling</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Motor Speed Control */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Zap className="h-5 w-5 text-elec-yellow" />
                Motor Speed Control Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">AC Motor Speed Control</h4>
                <p className="text-gray-300 mb-3">
                  Variable Frequency Drives (VFDs) provide precise speed control for AC motors
                </p>
                <div className="bg-elec-yellow/10 border border-blue-600/20 rounded-lg p-4">
                  <h5 className="text-blue-200 font-medium mb-2">VFD Control Structure</h5>
                  <div className="space-y-3">
                    <div>
                      <h6 className="text-white font-medium mb-1">Speed Control Loop:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Outer loop controls motor speed (RPM)</li>
                        <li>• PI control eliminates steady-state speed error</li>
                        <li>• Speed reference from operator or process controller</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-1">Current/Torque Control Loop:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Inner loop controls motor current/torque</li>
                        <li>• Very fast response (sub-millisecond)</li>
                        <li>• Provides torque limiting and protection</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Process Control with VFDs</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <h5 className="text-green-200 font-medium mb-2">Fan Speed Control</h5>
                    <p className="text-gray-300 text-sm mb-2">
                      Variable air volume and pressure control
                    </p>
                    <ul className="text-gray-300 text-xs space-y-1">
                      <li>• Cubic relationship: speed vs flow</li>
                      <li>• Square relationship: speed vs pressure</li>
                      <li>• Significant energy savings at reduced speeds</li>
                      <li>• Minimum speed limits for stability</li>
                    </ul>
                  </div>
                  <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                    <h5 className="text-purple-200 font-medium mb-2">Pump Speed Control</h5>
                    <p className="text-gray-300 text-sm mb-2">
                      Flow and pressure control applications
                    </p>
                    <ul className="text-gray-300 text-xs space-y-1">
                      <li>• Affinity laws govern performance</li>
                      <li>• Constant pressure control common</li>
                      <li>• Cavitation protection required</li>
                      <li>• Energy optimisation opportunities</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Servo Motor Control</h4>
                <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                  <h5 className="text-orange-200 font-medium mb-2">Precision Motion Control</h5>
                  <p className="text-gray-300 text-sm mb-3">
                    High-performance applications requiring precise speed and position control
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h6 className="text-white font-medium mb-1">Multi-Loop Control Structure:</h6>
                      <div className="text-gray-300 text-sm space-y-1">
                        <p>• <span className="text-cyan-200">Position Loop:</span> Outermost, controls final position</p>
                        <p>• <span className="text-blue-200">Velocity Loop:</span> Middle, controls speed profile</p>
                        <p>• <span className="text-green-200">Current Loop:</span> Innermost, controls motor torque</p>
                      </div>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-1">Advanced Features:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Feedforward compensation for known disturbances</li>
                        <li>• Adaptive tuning for varying load conditions</li>
                        <li>• Vibration suppression and resonance damping</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">DC Motor Speed Control</h4>
                <div className="bg-cyan-600/10 border border-cyan-600/20 rounded-lg p-4">
                  <h5 className="text-cyan-200 font-medium mb-2">Traditional DC Drive Control</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Armature Voltage Control:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Variable voltage for speed control</li>
                        <li>• Constant torque characteristic</li>
                        <li>• Good low-speed performance</li>
                        <li>• Thyristor or transistor-based drives</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-2">Field Weakening Control:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Reduces field current for high speeds</li>
                        <li>• Constant power characteristic</li>
                        <li>• Used above base speed</li>
                        <li>• Careful control required for stability</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Integration */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <TrendingUp className="h-5 w-5 text-elec-yellow" />
                System Integration and Coordination
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Multi-Variable Control</h4>
                <p className="text-gray-300 mb-3">
                  Real systems often require coordination between multiple control loops
                </p>
                <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                  <h5 className="text-purple-200 font-medium mb-2">HVAC System Coordination</h5>
                  <div className="space-y-3">
                    <div>
                      <h6 className="text-white font-medium mb-1">Temperature and Humidity Control:</h6>
                      <p className="text-gray-300 text-sm">Cooling and dehumidification must be coordinated to avoid fighting between loops</p>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-1">Supply and Return Fan Coordination:</h6>
                      <p className="text-gray-300 text-sm">Maintain building pressure while providing adequate ventilation</p>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-1">Economizer and Mechanical Cooling:</h6>
                      <p className="text-gray-300 text-sm">Seamless transition between free cooling and mechanical cooling modes</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Energy Management Integration</h4>
                <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                  <h5 className="text-green-200 font-medium mb-2">Demand Response Control</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Load Shedding:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Prioritised equipment shutdown</li>
                        <li>• Temporary setpoint adjustments</li>
                        <li>• Motor speed reduction</li>
                        <li>• Non-critical system disabling</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-2">Peak Demand Management:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Predictive control algorithms</li>
                        <li>• Thermal storage utilisation</li>
                        <li>• Staggered equipment startup</li>
                        <li>• Real-time pricing response</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-elec-yellow font-semibold mb-2">Safety and Protection Integration</h4>
                <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                  <h5 className="text-red-200 font-medium mb-2">Integrated Safety Systems</h5>
                  <p className="text-gray-300 text-sm mb-3">
                    Control systems must integrate with safety and protection systems
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-white font-medium mb-2">Fire Safety Integration:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Smoke damper control</li>
                        <li>• Pressurisation system activation</li>
                        <li>• Elevator recall and HVAC shutdown</li>
                        <li>• Emergency lighting and communication</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="text-white font-medium mb-2">Equipment Protection:</h6>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Motor overload and overheating</li>
                        <li>• Pressure and temperature limits</li>
                        <li>• Flow and level protection</li>
                        <li>• Vibration and bearing monitoring</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Scenario */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-white">Real-World Scenario</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="bg-blue-900/20 border border-elec-yellow/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white mb-2">Data Centre Cooling System</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-blue-200 font-medium">Challenge:</span>
                        <p className="text-sm">Maintain precise temperature (±1°C) in data centre while optimising energy consumption and providing redundancy.</p>
                      </div>
                      <div>
                        <span className="text-green-200 font-medium">Solution:</span>
                        <p className="text-sm">Implement cascade control: room temperature controls chilled water temperature setpoint, which controls chiller staging and pump speeds. Add economizer control for free cooling when outdoor conditions permit.</p>
                      </div>
                      <div>
                        <span className="text-orange-200 font-medium">Result:</span>
                        <p className="text-sm">Achieved ±0.5°C temperature control with 30% energy reduction through intelligent equipment staging and free cooling optimisation.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-elec-yellow" />
                <CardTitle className="text-white">Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Real-world control applications require understanding of process dynamics, appropriate control strategies, and system integration. HVAC, pressure, and motor control systems each have unique characteristics and challenges that must be addressed through proper design, tuning, and coordination with other building and process systems.
              </p>
            </CardContent>
          </Card>

          {/* Interactive Quiz */}
          <Card className="bg-transparent border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Brain className="h-5 w-5 text-elec-yellow" />
                Knowledge Check Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!quizStarted ? (
                <div className="text-center space-y-4">
                  <p className="text-gray-300">
                    Test your understanding of real-world control system applications.
                  </p>
                  <Button 
                    onClick={startQuiz}
                    className="bg-elec-yellow text-black hover:bg-elec-yellow font-semibold px-8 py-2"
                  >
                    Start Quiz
                  </Button>
                </div>
              ) : !showResults ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">
                      Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </span>
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-medium mb-4">{currentQuestion.question}</h3>
                    <div className="space-y-2">
                      {currentQuestion.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          className={`w-full text-left p-3 rounded border transition-colors ${
                            selectedAnswers[currentQuestionIndex] === index
                              ? 'border-elec-yellow bg-elec-yellow/20 text-elec-yellow'
                              : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      onClick={handlePrevious}
                      disabled={currentQuestionIndex === 0}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-transparent disabled:opacity-50"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={selectedAnswers[currentQuestionIndex] === undefined}
                      className="bg-elec-yellow text-black hover:bg-elec-yellow disabled:opacity-50"
                    >
                      {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                      percentage >= 70 ? 'bg-green-600/20' : 'bg-red-600/20'
                    }`}>
                      {percentage >= 70 ? (
                        <CheckCircle2 className="h-8 w-8 text-green-400" />
                      ) : (
                        <XCircle className="h-8 w-8 text-red-400" />
                      )}
                    </div>
                    <h3 className="text-white text-xl font-semibold mb-2">Quiz Complete!</h3>
                    <p className="text-gray-300 mb-4">
                      You scored {score} out of {quizQuestions.length} ({percentage}%)
                    </p>
                    {percentage >= 70 ? (
                      <p className="text-green-400">Excellent! You understand real-world control applications well.</p>
                    ) : (
                      <p className="text-red-400">Consider reviewing the material and trying again.</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-medium">Review Your Answers:</h4>
                    {quizQuestions.map((question, index) => (
                      <div key={question.id} className="border border-gray-600 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          {selectedAnswers[index] === question.correctAnswer ? (
                            <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-white font-medium mb-2">{question.question}</p>
                            <p className="text-gray-300 text-sm mb-2">
                              <span className="font-medium">Your answer:</span> {question.options[selectedAnswers[index]]}
                            </p>
                            {selectedAnswers[index] !== question.correctAnswer && (
                              <p className="text-gray-300 text-sm mb-2">
                                <span className="font-medium">Correct answer:</span> {question.options[question.correctAnswer]}
                              </p>
                            )}
                            <p className="text-gray-400 text-sm">{question.explanation}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <Button 
                      onClick={resetQuiz}
                      className="bg-elec-yellow text-black hover:bg-elec-yellow font-semibold px-8 py-2"
                    >
                      Retake Quiz
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default InstrumentationModule5Section6;