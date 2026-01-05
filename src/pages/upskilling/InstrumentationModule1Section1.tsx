import { ArrowLeft, ArrowRight, BookOpen, AlertTriangle, CheckCircle, Gauge, Cpu, Network, Lightbulb, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const InstrumentationModule1Section1 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is the primary function of instrumentation in an industrial setting?",
      options: [
        "To generate electricity",
        "To measure, monitor, and control process variables",
        "To provide lighting",
        "To store data only"
      ],
      correct: 1,
      explanation: "Instrumentation's primary role is to measure, monitor, and control critical process variables to ensure safe and efficient operation."
    },
    {
      id: 2,
      question: "Give two examples of measured variables in electrical instrumentation.",
      options: [
        "Temperature and pressure",
        "Colour and texture",
        "Weight and height",
        "Speed and direction only"
      ],
      correct: 0,
      explanation: "Temperature and pressure are common measured variables, along with flow, level, voltage, current, and many others."
    },
    {
      id: 3,
      question: "How does instrumentation relate to control systems like PLCs?",
      options: [
        "They are completely separate systems",
        "Instrumentation provides data inputs to PLCs for automated control decisions",
        "PLCs replace all instrumentation",
        "They only work with manual systems"
      ],
      correct: 1,
      explanation: "Instrumentation provides critical sensor data that PLCs use to make automated control decisions in industrial processes."
    },
    {
      id: 4,
      question: "What is the difference between an instrument and a sensor?",
      options: [
        "There is no difference",
        "A sensor detects physical changes; an instrument is the complete measurement device",
        "Instruments are always digital",
        "Sensors are only used in computers"
      ],
      correct: 1,
      explanation: "A sensor is the detection element, while an instrument is the complete device that includes sensing, signal processing, and often display or output functions."
    },
    {
      id: 5,
      question: "Why is accurate measurement critical in industrial processes?",
      options: [
        "For regulatory compliance only",
        "To ensure safety, quality, efficiency, and regulatory compliance",
        "Only for cost savings",
        "Just for documentation purposes"
      ],
      correct: 1,
      explanation: "Accurate measurement is essential for maintaining safety, product quality, operational efficiency, and meeting regulatory requirements."
    }
  ];


  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:pt-8 sm:pb-12">
        <Link to="../instrumentation-module-1">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-6 sm:mb-8 px-3 py-2 rounded-md text-sm sm:text-base"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
              <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  What Is Instrumentation?
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-400 mt-1">
                  Understanding the fundamentals of instrumentation and its role in industrial systems
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
                Module 1.1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs sm:text-sm">
                15 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-base leading-relaxed">
                Instrumentation forms the backbone of modern industrial operations, providing the eyes and ears that allow engineers to monitor, control, and optimise complex processes. From the pressure gauge on a boiler to sophisticated digital control systems managing entire manufacturing plants, instrumentation enables safe, efficient, and reliable operation across all industrial sectors.
              </p>
              <Alert className="bg-yellow-400/10 border-blue-600/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-gray-300">
                  Understanding instrumentation fundamentals is essential for anyone working in industrial environments, as it directly impacts safety, efficiency, and regulatory compliance.
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
                    Understand what electrical instrumentation is
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Recognise its role in system monitoring and automation
                  </li>
                </ul>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Identify key components involved in instrumentation systems
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Understand the relationship between measurement and control
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Definition and Purpose */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Gauge className="h-6 w-6 text-yellow-400" />
                Definition and Purpose of Instrumentation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  <strong>Instrumentation</strong> is the science and technology of measurement and control. It encompasses all devices, systems, and methods used to detect, measure, monitor, and control physical variables in industrial processes and systems.
                </p>
                
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">Core Functions of Instrumentation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-yellow-400 font-medium mb-2">Measurement</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Quantifying physical variables</li>
                        <li>• Converting physical parameters to electrical signals</li>
                        <li>• Providing accurate, repeatable readings</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-medium mb-2">Control</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Maintaining desired process conditions</li>
                        <li>• Automatic adjustment of system parameters</li>
                        <li>• Safety shutdown and protection functions</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Common Examples of Instrumentation</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-card p-3 sm:p-4 rounded-lg border border-gray-600">
                      <h5 className="text-yellow-400 font-semibold mb-2 text-sm sm:text-base">Pressure Instruments</h5>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• Bourdon tube pressure gauges</li>
                        <li>• Electronic pressure transmitters</li>
                        <li>• Differential pressure sensors</li>
                        <li>• Vacuum measurement devices</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card p-3 sm:p-4 rounded-lg border border-gray-600">
                      <h5 className="text-yellow-400 font-semibold mb-2 text-sm sm:text-base">Temperature Instruments</h5>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• RTDs (Resistance Temperature Detectors)</li>
                        <li>• Thermocouples</li>
                        <li>• Infrared thermometers</li>
                        <li>• Bimetallic temperature switches</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card p-3 sm:p-4 rounded-lg border border-gray-600 sm:col-span-2 lg:col-span-1">
                      <h5 className="text-yellow-400 font-semibold mb-2 text-sm sm:text-base">Flow Instruments</h5>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• Electromagnetic flow meters</li>
                        <li>• Turbine flow meters</li>
                        <li>• Ultrasonic flow measurement</li>
                        <li>• Variable area flow meters</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Connection to Control Systems */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Cpu className="h-6 w-6 text-yellow-400" />
                Connection to Control Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-base leading-relaxed">
                Modern instrumentation rarely operates in isolation. Instead, it forms integrated systems with control equipment like PLCs (Programmable Logic Controllers), SCADA (Supervisory Control and Data Acquisition) systems, and DCS (Distributed Control Systems).
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Integration with PLCs</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-white font-medium mb-2">Input Functions</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Analogue inputs (4-20mA, 0-10V)</li>
                        <li>• Digital inputs (contact closure, voltage levels)</li>
                        <li>• Smart sensor communications (HART, Profibus)</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2">Processing & Control</h5>
                      <ul className="text-sm space-y-1">
                        <li>• PID control algorithms</li>
                        <li>• Logic-based control sequences</li>
                        <li>• Safety interlocks and alarms</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">SCADA Integration</h4>
                  <ul className="text-sm space-y-2">
                    <li>• Real-time data acquisition from multiple locations</li>
                    <li>• Central monitoring and control capabilities</li>
                    <li>• Historical data logging and trending</li>
                    <li>• Alarm management and notification systems</li>
                    <li>• Remote access and control functionality</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Measurement and Control Relationship */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Network className="h-6 w-6 text-yellow-400" />
                Relationship Between Measurement and Control
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-base leading-relaxed">
                Measurement and control are intrinsically linked in instrumentation systems. Accurate measurement provides the foundation for effective control, while control systems rely on continuous measurement feedback to maintain desired process conditions.
              </p>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">The Control Loop Concept</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium">1. Measurement</h5>
                      <p className="text-xs mt-1">Sensor detects process variable</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium">2. Comparison</h5>
                      <p className="text-xs mt-1">Actual vs setpoint value</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium">3. Control Action</h5>
                      <p className="text-xs mt-1">Controller determines response</p>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium">4. Process Response</h5>
                      <p className="text-xs mt-1">System adjusts to correction</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-semibold text-lg">Key Relationships</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Measurement Accuracy Impact</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Poor measurement = poor control</li>
                      <li>• Instrument uncertainty affects control precision</li>
                      <li>• Calibration critical for system performance</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Response Time Considerations</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Fast processes need quick-response sensors</li>
                      <li>• Slow sensors can cause control instability</li>
                      <li>• Matching sensor and process time constants</li>
                    </ul>
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
                <h4 className="text-white font-semibold mb-3">Food Processing Facility Temperature Control</h4>
                <p className="text-sm leading-relaxed mb-4">
                  A food processing facility uses instrumentation to monitor and control tank temperature during pasteurisation. Here's how the system works:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <h5 className="text-white font-medium">Temperature Measurement</h5>
                      <p className="text-xs">RTD sensors immersed in the tank continuously measure product temperature with ±0.1°C accuracy</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <h5 className="text-white font-medium">Signal Processing</h5>
                      <p className="text-xs">Temperature transmitter converts RTD resistance to 4-20mA signal and sends to PLC</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <h5 className="text-white font-medium">Control Action</h5>
                      <p className="text-xs">PLC compares actual temperature (72°C) with setpoint (75°C) and increases heating</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                    <div>
                      <h5 className="text-white font-medium">Safety Protection</h5>
                      <p className="text-xs">If temperature exceeds 80°C, system automatically triggers cooling to prevent product damage</p>
                    </div>
                  </div>
                </div>
                
                <Alert className="mt-4 bg-green-600/10 border-green-600/30">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-gray-300">
                    <strong>Result:</strong> Consistent product quality, regulatory compliance, and energy efficiency through precise temperature control
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
                Instrumentation is the foundation of modern industrial automation, enabling engineers to measure, monitor, and control variables critical to safe and efficient operation of systems. From simple pressure gauges to sophisticated digital control networks, instrumentation provides the essential link between physical processes and automated control systems.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2">Key Takeaways</h4>
                <ul className="text-sm space-y-1">
                  <li>• Instrumentation encompasses measurement, monitoring, and control functions</li>
                  <li>• Integration with PLCs and SCADA systems enables automation</li>
                  <li>• Accurate measurement is fundamental to effective control</li>
                  <li>• Real-world applications span all industrial sectors</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <SingleQuestionQuiz 
            questions={quizQuestions}
            title="Knowledge Check"
          />

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 pt-6 sm:pt-8">
            <Link to="../instrumentation-module-1" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Module 1
              </Button>
            </Link>
            <Link to="../instrumentation-module-1-section-2" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-yellow-400 text-black hover:bg-yellow-400/10">
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

export default InstrumentationModule1Section1;