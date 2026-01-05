import { ArrowLeft, FileText, CheckCircle2, AlertTriangle, Settings, Target, Activity, Brain, XCircle, Lightbulb, Users } from 'lucide-react';
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

const InstrumentationModule5Section2 = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What does PV stand for?",
      options: [
        "Power Variable",
        "Process Variable",
        "Pressure Valve",
        "Primary Value"
      ],
      correctAnswer: 1,
      explanation: "PV stands for Process Variable - the actual measured value in the system that is being controlled or monitored."
    },
    {
      id: 2,
      question: "What happens if PV < SP?",
      options: [
        "The system shuts down",
        "Nothing happens",
        "The controller increases the output to bring PV up to SP",
        "An alarm sounds"
      ],
      correctAnswer: 2,
      explanation: "When the Process Variable is less than the Setpoint, the controller increases the output to bring the PV up to match the desired SP."
    },
    {
      id: 3,
      question: "What adjusts the system in response?",
      options: [
        "The sensor",
        "The setpoint",
        "The output (OP) from the controller",
        "The process variable"
      ],
      correctAnswer: 2,
      explanation: "The output (OP) from the controller adjusts the system in response to the difference between PV and SP. This output controls actuators like valves, dampers, or motors."
    },
    {
      id: 4,
      question: "What is SP used for?",
      options: [
        "To measure the actual value",
        "To set the desired target value for the system",
        "To power the controller",
        "To calibrate sensors"
      ],
      correctAnswer: 1,
      explanation: "SP (Setpoint) is used to set the desired target value for the system. It represents what we want the process variable to maintain."
    },
    {
      id: 5,
      question: "Who measures the PV?",
      options: [
        "The controller",
        "The actuator",
        "The sensor or transmitter",
        "The operator"
      ],
      correctAnswer: 2,
      explanation: "The sensor or transmitter measures the Process Variable (PV) and sends this information to the controller for comparison with the setpoint."
    },
    {
      id: 6,
      question: "What is the relationship between error and controller output?",
      options: [
        "Error has no effect on output",
        "Larger error typically produces larger output change",
        "Error and output are inversely related",
        "Output is always constant regardless of error"
      ],
      correctAnswer: 1,
      explanation: "In most control systems, larger errors between PV and SP produce proportionally larger changes in controller output to correct the deviation more quickly."
    },
    {
      id: 7,
      question: "In a temperature control system, what represents the manipulated variable?",
      options: [
        "The room temperature (PV)",
        "The desired temperature (SP)",
        "The heating valve position (OP)",
        "The temperature sensor"
      ],
      correctAnswer: 2,
      explanation: "The manipulated variable is what the controller adjusts to influence the process - in this case, the heating valve position (output) that controls heat input."
    },
    {
      id: 8,
      question: "What happens in a control loop when the setpoint changes?",
      options: [
        "Only the PV changes",
        "The controller calculates a new error and adjusts output",
        "The system shuts down",
        "Nothing changes until manually reset"
      ],
      correctAnswer: 1,
      explanation: "When the setpoint changes, the controller immediately calculates a new error (SP-PV) and adjusts its output accordingly to drive the process variable to the new target."
    }
  ];

  function handleAnswerSelect(answerIndex: number) {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
    }));
  }

  function handleNext() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  }

  function handlePrevious() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }

  function calculateScore() {
    let correct = 0;
    quizQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  }

  function resetQuiz() {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizStarted(false);
  }

  function startQuiz() {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const score = calculateScore();
  const percentage = Math.round((score / quizQuestions.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../instrumentation-module-5">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 5 - Section 2
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Components of a Control Loop: PV, Setpoint, Output
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Explore the essential elements that form the core of every control loop
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">By the end of this section, you'll be able to:</p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Define process variable (PV), setpoint (SP), and output (OP)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Understand how they interact in real time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Identify their roles in system performance</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Process Variable (PV) */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Activity className="h-5 w-5 text-yellow-400" />
                Process Variable (PV)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Definition</h4>
                  <p className="text-gray-300 mb-3">
                    The Process Variable (PV) is the actual measured value of the parameter being controlled. It represents the current state of the system that we want to maintain or adjust.
                  </p>
                  <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                    <h5 className="text-blue-200 font-medium mb-2">Examples of Process Variables</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Temperature: 65°C</li>
                        <li>• Pressure: 150 kPa</li>
                        <li>• Flow rate: 50 L/min</li>
                      </ul>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Level: 75% full</li>
                        <li>• Speed: 1500 RPM</li>
                        <li>• pH value: 7.2</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">How PV is Measured</h4>
                  <p className="text-gray-300 mb-3">
                    Process variables are measured using various sensors and transmitters that convert physical quantities into electrical signals.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-3">
                      <h5 className="text-purple-200 font-medium mb-1">Temperature</h5>
                      <p className="text-gray-300 text-sm mb-2">RTDs, Thermocouples, Thermistors</p>
                      <p className="text-gray-400 text-xs">Accuracy: ±0.1°C to ±2°C</p>
                    </div>
                    <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-3">
                      <h5 className="text-green-200 font-medium mb-1">Pressure</h5>
                      <p className="text-gray-300 text-sm mb-2">Strain gauge, Capacitive, Piezoelectric</p>
                      <p className="text-gray-400 text-xs">Accuracy: ±0.05% to ±0.5% FS</p>
                    </div>
                    <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-3">
                      <h5 className="text-orange-200 font-medium mb-1">Flow</h5>
                      <p className="text-gray-300 text-sm mb-2">Electromagnetic, Ultrasonic, Turbine</p>
                      <p className="text-gray-400 text-xs">Accuracy: ±0.2% to ±2% of reading</p>
                    </div>
                    <div className="bg-cyan-600/10 border border-cyan-600/20 rounded-lg p-3">
                      <h5 className="text-cyan-200 font-medium mb-1">Level</h5>
                      <p className="text-gray-300 text-sm mb-2">Radar, Ultrasonic, Float switches</p>
                      <p className="text-gray-400 text-xs">Accuracy: ±1mm to ±10mm</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Signal Types and Ranges</h4>
                  <p className="text-gray-300 mb-3">
                    Industrial process variables are typically transmitted as standardised electrical signals:
                  </p>
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-white font-medium mb-2">Analogue Signals</h5>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• 4-20mA current loop (most common)</li>
                          <li>• 0-10V or 0-5V voltage signals</li>
                          <li>• 1-5V DC signals</li>
                          <li>• Pneumatic 3-15 psi (legacy systems)</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-white font-medium mb-2">Digital Signals</h5>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• HART protocol (over 4-20mA)</li>
                          <li>• Profibus, Foundation Fieldbus</li>
                          <li>• Modbus RTU/TCP</li>
                          <li>• Ethernet/IP, DeviceNet</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Setpoint (SP) */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Target className="h-5 w-5 text-yellow-400" />
                Setpoint (SP)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Definition</h4>
                  <p className="text-gray-300 mb-3">
                    The Setpoint (SP) is the desired target value for the process variable. It represents what we want the system to achieve and maintain.
                  </p>
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <h5 className="text-green-200 font-medium mb-2">Setpoint Examples</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Room Temperature:</span>
                        <span className="text-yellow-400 font-medium">22°C</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Tank Pressure:</span>
                        <span className="text-yellow-400 font-medium">200 kPa</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Motor Speed:</span>
                        <span className="text-yellow-400 font-medium">1800 RPM</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Setpoint Sources</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                      <h5 className="text-blue-200 font-medium mb-2">Local Manual Entry</h5>
                      <p className="text-gray-300 text-sm mb-2">Operator sets desired value through HMI or control panel</p>
                      <p className="text-gray-400 text-xs">Used for: Simple loops, local control</p>
                    </div>
                    <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                      <h5 className="text-purple-200 font-medium mb-2">Remote/Cascade Control</h5>
                      <p className="text-gray-300 text-sm mb-2">Another controller or system provides the setpoint</p>
                      <p className="text-gray-400 text-xs">Used for: Complex systems, coordinated control</p>
                    </div>
                    <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                      <h5 className="text-green-200 font-medium mb-2">Scheduled/Programmed</h5>
                      <p className="text-gray-300 text-sm mb-2">Time-based or condition-based setpoint changes</p>
                      <p className="text-gray-400 text-xs">Used for: Batch processes, energy saving</p>
                    </div>
                    <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                      <h5 className="text-orange-200 font-medium mb-2">Adaptive/Calculated</h5>
                      <p className="text-gray-300 text-sm mb-2">Automatically calculated based on other process conditions</p>
                      <p className="text-gray-400 text-xs">Used for: Optimisation, feed-forward control</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Setpoint Considerations</h4>
                  <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-yellow-200 font-medium mb-2">Safety Limits</h5>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• High/Low limits prevent unsafe operation</li>
                          <li>• Rate of change limits prevent shock</li>
                          <li>• Operational envelope constraints</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-yellow-200 font-medium mb-2">Optimisation Factors</h5>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Energy efficiency considerations</li>
                          <li>• Product quality requirements</li>
                          <li>• Equipment protection needs</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Output (OP) */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Settings className="h-5 w-5 text-yellow-400" />
                Output (OP)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Definition</h4>
                  <p className="text-gray-300 mb-3">
                    The Output (OP) is the control action taken by the controller to bring the process variable closer to the setpoint. It's the controller's response to the error between PV and SP.
                  </p>
                  <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                    <h5 className="text-orange-200 font-medium mb-2">Output Actions</h5>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">If PV &lt; SP:</span>
                        <span className="text-green-300">Increase Output</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">If PV &gt; SP:</span>
                        <span className="text-red-300">Decrease Output</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">If PV = SP:</span>
                        <span className="text-blue-300">Maintain Output</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Output Devices</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                      <h5 className="text-red-200 font-medium mb-2">Control Valves</h5>
                      <p className="text-gray-300 text-sm mb-2">Adjust flow rates in piping systems</p>
                      <p className="text-gray-400 text-xs">Response: 1-30 seconds</p>
                    </div>
                    <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                      <h5 className="text-blue-200 font-medium mb-2">Variable Frequency Drives</h5>
                      <p className="text-gray-300 text-sm mb-2">Control motor speed and power</p>
                      <p className="text-gray-400 text-xs">Response: 0.1-5 seconds</p>
                    </div>
                    <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                      <h5 className="text-green-200 font-medium mb-2">Dampers & Louvers</h5>
                      <p className="text-gray-300 text-sm mb-2">Control airflow in HVAC systems</p>
                      <p className="text-gray-400 text-xs">Response: 5-60 seconds</p>
                    </div>
                    <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                      <h5 className="text-purple-200 font-medium mb-2">Heating Elements</h5>
                      <p className="text-gray-300 text-sm mb-2">Electric or steam heating control</p>
                      <p className="text-gray-400 text-xs">Response: 10-300 seconds</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-yellow-400 font-semibold mb-2">Output Signal Types</h4>
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="text-white font-medium mb-2">Analogue Outputs</h5>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• 4-20mA to I/P converters</li>
                          <li>• 0-10V DC signals</li>
                          <li>• Variable voltage/current</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-white font-medium mb-2">Digital Outputs</h5>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• PWM (Pulse Width Modulation)</li>
                          <li>• Step/Direction for motors</li>
                          <li>• Digital communication protocols</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-white font-medium mb-2">On/Off Outputs</h5>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Relay contacts</li>
                          <li>• Solid state outputs</li>
                          <li>• Solenoid valve control</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Control Loop Information Flow */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Information Flow in Control Loops</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">The Control Loop Cycle</h4>
                <p className="text-gray-300 mb-4">
                  Understanding how sensors, controllers, and actuators work together to maintain control:
                </p>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                      <div>
                        <h5 className="text-white font-medium">Sensor Measures PV</h5>
                        <p className="text-gray-300 text-sm">Temperature sensor reads actual temperature: 18°C</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                      <div>
                        <h5 className="text-white font-medium">Controller Compares PV to SP</h5>
                        <p className="text-gray-300 text-sm">Error = SP - PV = 22°C - 18°C = 4°C</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                      <div>
                        <h5 className="text-white font-medium">Controller Calculates Output</h5>
                        <p className="text-gray-300 text-sm">Determines how much to open heating valve</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                      <div>
                        <h5 className="text-white font-medium">Actuator Responds</h5>
                        <p className="text-gray-300 text-sm">Valve opens to increase heating, process repeats</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Calculation and Control Algorithms */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Error Calculation and Control Algorithms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Basic Error Calculation</h4>
                <p className="text-gray-300 mb-3">
                  The foundation of all control systems is the error calculation that drives controller response:
                </p>
                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                  <div className="text-center mb-4">
                    <h5 className="text-blue-200 font-medium text-lg mb-2">Error (e) = Setpoint (SP) - Process Variable (PV)</h5>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="text-center">
                       <h6 className="text-white font-medium">Positive Error (e &gt; 0)</h6>
                       <p className="text-gray-300 text-sm">PV below SP - Increase output</p>
                       <p className="text-green-300 text-xs">Example: SP=70°C, PV=65°C, e=+5°C</p>
                     </div>
                     <div className="text-center">
                       <h6 className="text-white font-medium">Zero Error (e = 0)</h6>
                       <p className="text-gray-300 text-sm">PV equals SP - Maintain output</p>
                       <p className="text-blue-300 text-xs">Example: SP=70°C, PV=70°C, e=0°C</p>
                     </div>
                     <div className="text-center">
                       <h6 className="text-white font-medium">Negative Error (e &lt; 0)</h6>
                       <p className="text-gray-300 text-sm">PV above SP - Decrease output</p>
                       <p className="text-red-300 text-xs">Example: SP=70°C, PV=75°C, e=-5°C</p>
                     </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Control Response Types</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <h5 className="text-green-200 font-medium mb-2">Direct Acting Control</h5>
                    <p className="text-gray-300 text-sm mb-2">Output increases when PV increases</p>
                    <p className="text-gray-400 text-xs">Example: Cooling system - higher temperature → more cooling</p>
                  </div>
                  <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                    <h5 className="text-orange-200 font-medium mb-2">Reverse Acting Control</h5>
                    <p className="text-gray-300 text-sm mb-2">Output decreases when PV increases</p>
                    <p className="text-gray-400 text-xs">Example: Heating system - higher temperature → less heating</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Advanced Control Concepts</h4>
                <div className="space-y-3">
                  <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                    <h5 className="text-purple-200 font-medium mb-2">Deadband/Hysteresis</h5>
                    <p className="text-gray-300 text-sm mb-2">A zone around the setpoint where no control action occurs</p>
                    <p className="text-gray-400 text-xs">Prevents excessive switching in on/off controllers (e.g., ±1°C deadband)</p>
                  </div>
                  <div className="bg-cyan-600/10 border border-cyan-600/20 rounded-lg p-4">
                    <h5 className="text-cyan-200 font-medium mb-2">Proportional Band</h5>
                    <p className="text-gray-300 text-sm mb-2">The range of PV values that produces full-scale output change</p>
                    <p className="text-gray-400 text-xs">Narrower band = more sensitive control, wider band = more stable control</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sensor Technology Deep Dive */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Advanced Sensor Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Temperature Measurement Detailed</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                    <h5 className="text-red-200 font-medium mb-2">RTD (Resistance Temperature Detector)</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Pt100, Pt1000 most common</li>
                      <li>• Temperature range: -200°C to +850°C</li>
                      <li>• Accuracy: ±0.1°C to ±0.5°C</li>
                      <li>• Response time: 1-60 seconds</li>
                      <li>• Excellent stability and repeatability</li>
                    </ul>
                  </div>
                  <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                    <h5 className="text-orange-200 font-medium mb-2">Thermocouple</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Type K, J, T, E most common</li>
                      <li>• Temperature range: -270°C to +1800°C</li>
                      <li>• Accuracy: ±1°C to ±5°C</li>
                      <li>• Response time: 0.1-10 seconds</li>
                      <li>• Fast response, wide range, rugged</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Pressure Measurement Technologies</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                    <h5 className="text-blue-200 font-medium mb-2">Strain Gauge</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Range: 0-10,000+ bar</li>
                      <li>• Accuracy: ±0.05% FS</li>
                      <li>• Temperature compensation</li>
                      <li>• Most versatile type</li>
                    </ul>
                  </div>
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <h5 className="text-green-200 font-medium mb-2">Capacitive</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Range: 0.1 mbar - 100 bar</li>
                      <li>• Accuracy: ±0.075% FS</li>
                      <li>• Excellent for low pressures</li>
                      <li>• High precision</li>
                    </ul>
                  </div>
                  <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                    <h5 className="text-purple-200 font-medium mb-2">Piezoelectric</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Range: 0.1-10,000 bar</li>
                      <li>• Dynamic measurements</li>
                      <li>• High frequency response</li>
                      <li>• Shock and vibration</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Flow Measurement Methods</h4>
                <div className="space-y-3">
                  <div className="bg-cyan-600/10 border border-cyan-600/20 rounded-lg p-4">
                    <h5 className="text-cyan-200 font-medium mb-2">Electromagnetic Flow Meters</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-300 text-sm mb-2">Advantages:</p>
                        <ul className="text-gray-300 text-xs space-y-1">
                          <li>• No pressure drop</li>
                          <li>• Bidirectional measurement</li>
                          <li>• ±0.2% accuracy</li>
                          <li>• No moving parts</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm mb-2">Limitations:</p>
                        <ul className="text-gray-300 text-xs space-y-1">
                          <li>• Conductive fluids only</li>
                          <li>• Higher initial cost</li>
                          <li>• Electrical noise sensitivity</li>
                          <li>• Minimum conductivity required</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calibration and Maintenance */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Calibration and Maintenance Procedures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Sensor Calibration</h4>
                <p className="text-gray-300 mb-3">
                  Regular calibration ensures measurement accuracy and system performance:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                    <h5 className="text-blue-200 font-medium mb-2">Zero Point Calibration</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Adjust 4mA output at minimum measurement</li>
                      <li>• Use reference standard</li>
                      <li>• Record before/after readings</li>
                      <li>• Check ambient conditions</li>
                    </ul>
                  </div>
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <h5 className="text-green-200 font-medium mb-2">Span Calibration</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Adjust 20mA output at maximum measurement</li>
                      <li>• Use certified reference</li>
                      <li>• Verify linearity at mid-points</li>
                      <li>• Document calibration certificate</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Calibration Frequency</h4>
                <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center">
                        <h5 className="text-yellow-200 font-medium">Critical Safety</h5>
                        <p className="text-white text-lg font-bold">3-6 months</p>
                        <p className="text-gray-300 text-xs">Emergency shutdown systems</p>
                      </div>
                      <div className="text-center">
                        <h5 className="text-yellow-200 font-medium">Process Control</h5>
                        <p className="text-white text-lg font-bold">6-12 months</p>
                        <p className="text-gray-300 text-xs">Production quality control</p>
                      </div>
                      <div className="text-center">
                        <h5 className="text-yellow-200 font-medium">Monitoring</h5>
                        <p className="text-white text-lg font-bold">12-24 months</p>
                        <p className="text-gray-300 text-xs">General monitoring systems</p>
                      </div>
                      <div className="text-center">
                        <h5 className="text-yellow-200 font-medium">Indication Only</h5>
                        <p className="text-white text-lg font-bold">24+ months</p>
                        <p className="text-gray-300 text-xs">Non-critical displays</p>
                      </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Common Calibration Issues</h4>
                <div className="space-y-3">
                  <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                    <h5 className="text-red-200 font-medium mb-2">Drift and Accuracy Problems</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-300 text-sm mb-2">Causes:</p>
                        <ul className="text-gray-300 text-xs space-y-1">
                          <li>• Temperature effects</li>
                          <li>• Component aging</li>
                          <li>• Electrical interference</li>
                          <li>• Mechanical wear</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm mb-2">Solutions:</p>
                        <ul className="text-gray-300 text-xs space-y-1">
                          <li>• Regular calibration</li>
                          <li>• Temperature compensation</li>
                          <li>• Proper shielding</li>
                          <li>• Preventive maintenance</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Troubleshooting Guide */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Control Loop Troubleshooting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Common Problems and Solutions</h4>
                <div className="space-y-4">
                  <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                    <h5 className="text-red-200 font-medium mb-2">PV Reading Problems</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-300 text-sm font-medium mb-2">Symptoms:</p>
                        <ul className="text-gray-300 text-xs space-y-1">
                          <li>• Erratic or noisy readings</li>
                          <li>• Fixed at 4mA or 20mA</li>
                          <li>• Slow response to changes</li>
                          <li>• Reading doesn't match reality</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm font-medium mb-2">Troubleshooting Steps:</p>
                        <ul className="text-gray-300 text-xs space-y-1">
                          <li>• Check sensor wiring connections</li>
                          <li>• Verify power supply voltage</li>
                          <li>• Test sensor with multimeter</li>
                          <li>• Check for electromagnetic interference</li>
                          <li>• Verify sensor calibration</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
                    <h5 className="text-orange-200 font-medium mb-2">Controller Output Problems</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-300 text-sm font-medium mb-2">Symptoms:</p>
                        <ul className="text-gray-300 text-xs space-y-1">
                          <li>• Output stuck at 0% or 100%</li>
                          <li>• Oscillating output</li>
                          <li>• No response to setpoint changes</li>
                          <li>• Opposite response to expected</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm font-medium mb-2">Solutions:</p>
                        <ul className="text-gray-300 text-xs space-y-1">
                          <li>• Check controller configuration</li>
                          <li>• Verify direct/reverse action</li>
                          <li>• Inspect output wiring</li>
                          <li>• Test actuator operation</li>
                          <li>• Review control parameters</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                    <h5 className="text-blue-200 font-medium mb-2">Actuator Response Issues</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-300 text-sm font-medium mb-2">Common Issues:</p>
                        <ul className="text-gray-300 text-xs space-y-1">
                          <li>• Valve sticking or binding</li>
                          <li>• Motor not responding</li>
                          <li>• Slow actuator response</li>
                          <li>• Actuator position feedback error</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm font-medium mb-2">Maintenance Actions:</p>
                        <ul className="text-gray-300 text-xs space-y-1">
                          <li>• Lubricate mechanical components</li>
                          <li>• Check air supply pressure</li>
                          <li>• Inspect electrical connections</li>
                          <li>• Calibrate position feedback</li>
                          <li>• Replace worn components</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Optimization */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl">Performance Optimization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">System Performance Metrics</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4 text-center">
                    <h5 className="text-green-200 font-medium mb-2">Accuracy</h5>
                    <p className="text-white text-lg font-bold">±0.1%</p>
                    <p className="text-gray-300 text-xs">Closeness to true value</p>
                  </div>
                  <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4 text-center">
                    <h5 className="text-blue-200 font-medium mb-2">Repeatability</h5>
                    <p className="text-white text-lg font-bold">±0.05%</p>
                    <p className="text-gray-300 text-xs">Consistency of readings</p>
                  </div>
                   <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4 text-center">
                     <h5 className="text-purple-200 font-medium mb-2">Response Time</h5>
                     <p className="text-white text-lg font-bold">&lt; 2 sec</p>
                     <p className="text-gray-300 text-xs">Time to 90% of final value</p>
                   </div>
                  <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4 text-center">
                    <h5 className="text-orange-200 font-medium mb-2">Stability</h5>
                    <p className="text-white text-lg font-bold">±0.02%/°C</p>
                    <p className="text-gray-300 text-xs">Temperature coefficient</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Optimization Strategies</h4>
                <div className="space-y-3">
                  <div className="bg-cyan-600/10 border border-cyan-600/20 rounded-lg p-4">
                    <h5 className="text-cyan-200 font-medium mb-2">Signal Conditioning</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Use appropriate signal isolators</li>
                      <li>• Implement proper grounding techniques</li>
                      <li>• Apply filtering for noisy environments</li>
                      <li>• Ensure adequate signal-to-noise ratio</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
                    <h5 className="text-yellow-200 font-medium mb-2">Installation Best Practices</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Route sensor cables away from power cables</li>
                      <li>• Use twisted pair or shielded cables</li>
                      <li>• Maintain proper cable bend radius</li>
                      <li>• Provide adequate vibration isolation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Scenario */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-yellow-400" />
                <CardTitle className="text-white">Real-World Scenario</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="bg-blue-900/20 border border-yellow-400/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white mb-2">Pressure Tank Control System</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-blue-200 font-medium">PV (Process Variable):</span>
                        <p className="text-sm">Pressure sensor detects actual tank pressure: 180 kPa</p>
                      </div>
                      <div>
                        <span className="text-green-200 font-medium">SP (Setpoint):</span>
                        <p className="text-sm">Target pressure is set to: 200 kPa</p>
                      </div>
                      <div>
                        <span className="text-orange-200 font-medium">OP (Output):</span>
                        <p className="text-sm">Controller opens inlet valve to increase pressure and reach the target</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-400" />
                <CardTitle className="text-white">Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                A functional control loop continuously compares PV to SP and adjusts the OP to maintain system balance. These three components work together: sensors measure the process variable, controllers compare it to the setpoint, and actuators implement the output to maintain control.
              </p>
            </CardContent>
          </Card>

          {/* Interactive Quiz */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Brain className="h-5 w-5 text-yellow-400" />
                Knowledge Check Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!quizStarted ? (
                <div className="text-center space-y-4">
                  <p className="text-gray-300">
                    Test your understanding of control loop components.
                  </p>
                  <Button 
                    onClick={startQuiz}
                    className="bg-yellow-400 text-black hover:bg-yellow-600 font-semibold px-8 py-2"
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
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
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
                              ? 'border-yellow-400 bg-yellow-600/20 text-yellow-400'
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
                      className="border-gray-600 text-gray-300 hover:bg-card disabled:opacity-50"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={selectedAnswers[currentQuestionIndex] === undefined}
                      className="bg-yellow-400 text-black hover:bg-yellow-600 disabled:opacity-50"
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
                      <p className="text-green-400">Excellent! You understand control loop components well.</p>
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
                      className="bg-yellow-400 text-black hover:bg-yellow-600 font-semibold px-8 py-2"
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

export default InstrumentationModule5Section2;