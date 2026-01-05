import { ArrowLeft, ArrowRight, Settings, AlertTriangle, CheckCircle, Eye, Gauge, Sliders, Lightbulb, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const InstrumentationModule1Section3 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is the difference between measurement and indication?",
      options: [
        "There is no difference",
        "Measurement captures data; indication displays or signals the value",
        "Indication is always digital",
        "Measurement is only for temperature"
      ],
      correct: 1,
      explanation: "Measurement is the process of capturing and quantifying data, while indication is the display or signalling of that measured value to operators or systems."
    },
    {
      id: 2,
      question: "Give an example of a control action triggered by instrumentation.",
      options: [
        "Manually turning a valve",
        "Automatic boiler shutdown when pressure limits are exceeded",
        "Reading a gauge visually",
        "Painting equipment"
      ],
      correct: 1,
      explanation: "A control action is an automatic response based on measured values, such as shutting down equipment when safety limits are exceeded."
    },
    {
      id: 3,
      question: "What is a closed-loop system?",
      options: [
        "A system with no outputs",
        "A system where output affects the input through feedback",
        "A broken system",
        "A system that never changes"
      ],
      correct: 1,
      explanation: "A closed-loop system uses feedback from the output to adjust the input, creating automatic control that responds to changes in conditions."
    },
    {
      id: 4,
      question: "Name a device that performs control functions.",
      options: [
        "Thermometer only",
        "PID controller",
        "Light bulb",
        "Wire"
      ],
      correct: 1,
      explanation: "A PID controller is a device that performs control functions by calculating the required output based on the difference between setpoint and measured values."
    },
    {
      id: 5,
      question: "Why is indication still important in automated systems?",
      options: [
        "It's not important in automated systems",
        "For operator awareness, troubleshooting, and system monitoring",
        "Only for decoration",
        "To increase costs"
      ],
      correct: 1,
      explanation: "Even in automated systems, indication provides essential operator awareness, enables troubleshooting, supports system monitoring, and ensures safety oversight."
    }
  ];


  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <Link to="../instrumentation-module-1">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Settings className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  Measurement vs Control vs Indication
                </h1>
                <p className="text-lg sm:text-xl text-gray-400">
                  Understanding the different functions and purposes of instrumentation systems
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 1.3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                15 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-6 w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-base leading-relaxed">
                Instrumentation systems perform three fundamental functions: measurement, control, and indication. While these functions often work together seamlessly, understanding their distinct roles and interactions is crucial for effective system design, operation, and troubleshooting.
              </p>
              <Alert className="bg-yellow-400/10 border-blue-600/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-gray-300">
                  Each function serves a specific purpose in the instrumentation chain, and their proper coordination is essential for safe and efficient system operation.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>By the end of this section, you should be able to:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Distinguish between measurement, control, and indication
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Understand where each fits in the control loop
                  </li>
                </ul>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Identify instrumentation devices for each function
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Understand the interaction of sensors, indicators, and actuators
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Measurement Function */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Gauge className="h-6 w-6 text-yellow-400" />
                Measurement: Data Acquisition
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-base leading-relaxed">
                <strong>Measurement</strong> is the process of determining the magnitude of a physical quantity. It involves sensing the variable, converting it to a usable signal, and ensuring the data is accurate and reliable for further processing or decision-making.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Measurement Process</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="bg-card p-3 rounded mb-2">
                        <h5 className="text-white font-medium">1. Sensing</h5>
                      </div>
                      <p className="text-xs">Detect physical change</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-card p-3 rounded mb-2">
                        <h5 className="text-white font-medium">2. Conversion</h5>
                      </div>
                      <p className="text-xs">Transform to electrical signal</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-card p-3 rounded mb-2">
                        <h5 className="text-white font-medium">3. Processing</h5>
                      </div>
                      <p className="text-xs">Condition and scale signal</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-card p-3 rounded mb-2">
                        <h5 className="text-white font-medium">4. Output</h5>
                      </div>
                      <p className="text-xs">Provide usable data</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2">Common Measurement Examples</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Temperature:</strong> Thermocouple measures heat and produces mV signal</li>
                      <li>• <strong>Pressure:</strong> Strain gauge sensor converts pressure to resistance change</li>
                      <li>• <strong>Flow:</strong> Electromagnetic meter measures liquid velocity</li>
                      <li>• <strong>Level:</strong> Ultrasonic sensor measures distance to liquid surface</li>
                      <li>• <strong>Vibration:</strong> Accelerometer detects mechanical oscillations</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2">Key Measurement Characteristics</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Accuracy:</strong> How close to the true value</li>
                      <li>• <strong>Precision:</strong> Repeatability of measurements</li>
                      <li>• <strong>Resolution:</strong> Smallest detectable change</li>
                      <li>• <strong>Range:</strong> Minimum to maximum measurable values</li>
                      <li>• <strong>Response Time:</strong> Speed of measurement update</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Indication Function */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="h-6 w-6 text-yellow-400" />
                Indication: Display and Signalling
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-base leading-relaxed">
                <strong>Indication</strong> presents measurement data in a form that operators, maintenance personnel, or automated systems can interpret and act upon. It bridges the gap between raw measurement data and human understanding or system communication.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Types of Indication</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="text-white font-medium mb-2">Visual Indication</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Analogue gauges and meters</li>
                        <li>• Digital displays (LCD, LED)</li>
                        <li>• Status lights and indicators</li>
                        <li>• Graphical displays and trends</li>
                        <li>• Colour-coded warnings</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Audible Indication</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Alarm horns and sirens</li>
                        <li>• Beepers and chimes</li>
                        <li>• Voice annunciators</li>
                        <li>• Coded sound patterns</li>
                        <li>• Frequency-based alerts</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Digital Communication</h5>
                      <ul className="text-sm space-y-1">
                        <li>• 4-20mA current signals</li>
                        <li>• Digital protocols (Modbus, HART)</li>
                        <li>• Network communications</li>
                        <li>• SMS and email alerts</li>
                        <li>• HMI screen displays</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2">Local Indication Examples</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Pressure gauge on boiler showing PSI reading</li>
                      <li>• Temperature display on oven control panel</li>
                      <li>• Level indicator on storage tank</li>
                      <li>• Flow totaliser on water meter</li>
                      <li>• LED status lights on control panel</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2">Remote Indication Examples</h5>
                    <ul className="text-sm space-y-1">
                      <li>• SCADA system displaying plant overview</li>
                      <li>• Mobile app showing building energy usage</li>
                      <li>• Central monitoring screen in control room</li>
                      <li>• Email alerts for alarm conditions</li>
                      <li>• Historian trends showing performance data</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Control Function */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sliders className="h-6 w-6 text-yellow-400" />
                Control: Action Based on Values
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-base leading-relaxed">
                <strong>Control</strong> uses measurement data to make decisions and take automated actions to maintain desired system conditions. Control functions ensure processes operate within safe, efficient, and optimal parameters without constant human intervention.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Control System Types</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-2">Open-Loop Control</h5>
                      <p className="text-sm mb-2">Control action is independent of output (no feedback)</p>
                      <ul className="text-sm space-y-1">
                        <li>• Timer-based systems</li>
                        <li>• Sequential control logic</li>
                        <li>• Manual setpoint adjustments</li>
                        <li>• Pre-programmed responses</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Closed-Loop Control</h5>
                      <p className="text-sm mb-2">Control action based on feedback from output</p>
                      <ul className="text-sm space-y-1">
                        <li>• PID control algorithms</li>
                        <li>• Feedback compensation</li>
                        <li>• Automatic error correction</li>
                        <li>• Self-adjusting systems</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Control Devices and Functions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="text-white font-medium mb-2">Controllers</h5>
                      <ul className="text-sm space-y-1">
                        <li>• PID controllers</li>
                        <li>• PLCs (Programmable Logic Controllers)</li>
                        <li>• Temperature controllers</li>
                        <li>• Flow controllers</li>
                        <li>• Safety controllers</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Final Control Elements</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Control valves</li>
                        <li>• Variable frequency drives</li>
                        <li>• Dampers and actuators</li>
                        <li>• Heaters and coolers</li>
                        <li>• Pumps and motors</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Safety Systems</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Emergency shutdown systems</li>
                        <li>• Pressure relief valves</li>
                        <li>• Fire suppression systems</li>
                        <li>• Interlock systems</li>
                        <li>• Alarm management</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Control Loop Concept */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-6 w-6 text-yellow-400" />
                The Control Loop: Integration of All Functions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-base leading-relaxed">
                A control loop demonstrates how measurement, indication, and control work together in a continuous cycle to maintain desired process conditions. Understanding this integration is fundamental to instrumentation system design and operation.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Control Loop Components</h4>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-1">Process Variable</h5>
                      <p className="text-xs">Current condition being controlled</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-1">Sensor</h5>
                      <p className="text-xs">Measures process variable</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-1">Controller</h5>
                      <p className="text-xs">Compares & calculates response</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-1">Final Element</h5>
                      <p className="text-xs">Implements control action</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-1">Process</h5>
                      <p className="text-xs">System being controlled</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2">Closed-Loop Benefits</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Automatic error correction</li>
                      <li>• Consistent performance despite disturbances</li>
                      <li>• Reduced operator workload</li>
                      <li>• Improved process stability</li>
                      <li>• Better product quality</li>
                      <li>• Enhanced safety through quick response</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2">Open-Loop Applications</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Simple on/off control</li>
                      <li>• Batch process sequences</li>
                      <li>• Time-based operations</li>
                      <li>• Manual control backup systems</li>
                      <li>• Emergency response procedures</li>
                      <li>• Start-up and shutdown sequences</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interaction of Functions */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-6 w-6 text-yellow-400" />
                Interaction of Sensors, Indicators, and Actuators
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-base leading-relaxed">
                Modern instrumentation systems integrate sensors (measurement), indicators (display), and actuators (control) to create comprehensive automation solutions. Understanding their interactions is crucial for system design and troubleshooting.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Functional Integration</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="text-white font-medium mb-2">Measurement ↔ Indication</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Sensor data feeds displays</li>
                        <li>• Signal conditioning for meters</li>
                        <li>• Alarm thresholds from measurements</li>
                        <li>• Historical data logging</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Measurement ↔ Control</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Feedback for closed-loop control</li>
                        <li>• Safety interlocks from sensors</li>
                        <li>• Process optimization algorithms</li>
                        <li>• Predictive control strategies</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Indication ↔ Control</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Operator interface for setpoints</li>
                        <li>• Status feedback to displays</li>
                        <li>• Manual override capabilities</li>
                        <li>• Control mode indication</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Signal Flow and Processing</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-card p-3 rounded">
                      <span className="text-sm font-medium">Physical Variable</span>
                      <span className="text-yellow-400">→</span>
                      <span className="text-sm font-medium">Sensor</span>
                      <span className="text-yellow-400">→</span>
                      <span className="text-sm font-medium">Signal Conditioning</span>
                      <span className="text-yellow-400">→</span>
                      <span className="text-sm font-medium">Processing/Display</span>
                    </div>
                    <div className="text-center">
                      <span className="text-yellow-400 text-sm">↓ Feedback Loop ↑</span>
                    </div>
                    <div className="flex items-center justify-between bg-card p-3 rounded">
                      <span className="text-sm font-medium">Process Change</span>
                      <span className="text-yellow-400">←</span>
                      <span className="text-sm font-medium">Final Element</span>
                      <span className="text-yellow-400">←</span>
                      <span className="text-sm font-medium">Controller Output</span>
                      <span className="text-yellow-400">←</span>
                      <span className="text-sm font-medium">Control Algorithm</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Scenario */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Real-World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-white font-semibold mb-3">Boiler System Pressure Control</h4>
                <p className="text-sm leading-relaxed mb-4">
                  A boiler system demonstrates the integration of measurement, indication, and control functions working together for safe operation:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">M</div>
                    <div>
                      <h5 className="text-white font-medium">Measurement Function</h5>
                      <p className="text-xs">Pressure sensor continuously measures boiler pressure (0-10 bar range) with ±0.1 bar accuracy</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">I</div>
                    <div>
                      <h5 className="text-white font-medium">Indication Function</h5>
                      <p className="text-xs">Local pressure gauge shows 6.5 bar, control panel displays digital reading, and SCADA system logs trends</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">C</div>
                    <div>
                      <h5 className="text-white font-medium">Control Function</h5>
                      <p className="text-xs">When pressure exceeds 8 bar limit, controller automatically shuts down heater and opens relief valve</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">R</div>
                    <div>
                      <h5 className="text-white font-medium">Integrated Response</h5>
                      <p className="text-xs">System maintains safe operation while indicating status to operators and logging data for maintenance analysis</p>
                    </div>
                  </div>
                </div>
                
                <Alert className="mt-4 bg-green-600/10 border-green-600/30">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-gray-300">
                    <strong>Result:</strong> Safe operation through coordinated measurement, clear indication for operators, and automatic protection through control actions
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-base leading-relaxed">
                Understanding the distinction between measurement, control, and indication is fundamental to instrumentation system design and operation. These three functions work together seamlessly - measurement provides the data, indication communicates it effectively, and control takes automated action based on the information.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2">Function Integration</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong className="text-yellow-400">Measurement:</strong> Accurate data acquisition forms the foundation
                  </div>
                  <div>
                    <strong className="text-yellow-400">Indication:</strong> Clear communication enables operator awareness
                  </div>
                  <div>
                    <strong className="text-yellow-400">Control:</strong> Automated responses maintain optimal conditions
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <SingleQuestionQuiz 
            questions={quizQuestions}
            title="Knowledge Check"
          />

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8">
            <Link to="../instrumentation-module-1-section-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../instrumentation-module-1-section-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400/10">
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

export default InstrumentationModule1Section3;