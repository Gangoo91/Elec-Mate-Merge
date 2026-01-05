import { ArrowLeft, ArrowRight, Gauge, AlertTriangle, CheckCircle, Zap, ArrowRight as ArrowRightIcon, Lightbulb, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const InstrumentationModule2Section1 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is the main role of a sensor?",
      options: [
        "To convert energy from one form to another",
        "To detect and respond to physical changes in the environment",
        "To amplify electrical signals",
        "To store measurement data"
      ],
      correct: 1,
      explanation: "A sensor's primary function is to detect and respond to physical changes in the environment, such as temperature, pressure, light, or motion."
    },
    {
      id: 2,
      question: "What does a transducer convert?",
      options: [
        "Digital signals to analogue signals",
        "One form of energy into another form of energy",
        "AC current to DC current",
        "High voltage to low voltage"
      ],
      correct: 1,
      explanation: "A transducer converts one form of energy into another form of energy, typically converting physical quantities into electrical signals for measurement and control purposes."
    },
    {
      id: 3,
      question: "Give an example of a sensor and transducer combination.",
      options: [
        "A light bulb and switch",
        "A thermocouple measuring temperature",
        "A battery and resistor",
        "A motor and gearbox"
      ],
      correct: 1,
      explanation: "A thermocouple is an excellent example as it acts as both sensor (detecting temperature changes) and transducer (converting thermal energy into electrical voltage)."
    },
    {
      id: 4,
      question: "Can a device be both a sensor and a transducer?",
      options: [
        "No, they must always be separate devices",
        "Yes, many modern devices combine both functions",
        "Only in digital systems",
        "Only in high-temperature applications"
      ],
      correct: 1,
      explanation: "Many modern devices combine both sensor and transducer functions in a single unit, such as thermocouples, strain gauges, and pressure transmitters."
    },
    {
      id: 5,
      question: "Why is it important to distinguish between the two?",
      options: [
        "It's not important in practical applications",
        "For proper system design, troubleshooting, and component selection",
        "Only for academic purposes",
        "To increase system complexity"
      ],
      correct: 1,
      explanation: "Understanding the distinction helps with proper system design, effective troubleshooting, correct component selection, and understanding signal flow in instrumentation systems."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:pt-8 sm:pb-12">
        <Link to="../instrumentation-module-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-6 sm:mb-8 px-3 py-2 rounded-md text-sm sm:text-base"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
              <Gauge className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Difference Between Sensors and Transducers
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-400 mt-1">
                  Understanding the distinction and relationship between sensors and transducers
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
                Module 2.1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs sm:text-sm">
                20 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Gauge className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-sm sm:text-base leading-relaxed">
                The distinction between sensors and transducers is fundamental to understanding instrumentation systems. While these terms are often used interchangeably in everyday conversation, they represent different functions in the measurement chain. Understanding their relationship is crucial for proper system design, troubleshooting, and component selection.
              </p>
              <Alert className="bg-yellow-400/10 border-blue-600/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-gray-300 text-sm sm:text-base">
                  Many modern devices combine both sensor and transducer functions, but understanding their individual roles helps in system analysis and component specification.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-sm sm:text-base">By the end of this section, you should be able to:</p>
              <div className="grid grid-cols-1 gap-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Define and differentiate sensors and transducers clearly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Understand the flow of information from physical quantity to electrical signal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Recognize combined vs separate sensor/transducer setups</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Apply this knowledge to practical instrumentation scenarios</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Core Definitions */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Core Definitions and Functions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3 text-base sm:text-lg">Sensor Definition</h4>
                  <p className="text-sm sm:text-base leading-relaxed mb-4">
                    A <strong>sensor</strong> is a device that detects and responds to physical changes in its environment. It perceives external stimuli such as temperature, pressure, light, motion, moisture, or any other environmental phenomenon.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Key Characteristics:</h5>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• Detects physical phenomena</li>
                        <li>• Responds to environmental changes</li>
                        <li>• Provides input to measurement systems</li>
                        <li>• Acts as the "sensing element"</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Common Examples:</h5>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• Bimetallic strip (temperature)</li>
                        <li>• Photodiode (light)</li>
                        <li>• Strain gauge (mechanical stress)</li>
                        <li>• Accelerometer chip (motion)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3 text-base sm:text-lg">Transducer Definition</h4>
                  <p className="text-sm sm:text-base leading-relaxed mb-4">
                    A <strong>transducer</strong> is a device that converts one form of energy into another form of energy. In instrumentation, transducers typically convert physical quantities (mechanical, thermal, optical) into electrical signals that can be measured, processed, and transmitted.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Key Characteristics:</h5>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• Converts energy forms</li>
                        <li>• Usually produces electrical output</li>
                        <li>• Enables signal processing</li>
                        <li>• Provides measurable output</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Energy Conversions:</h5>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• Mechanical → Electrical</li>
                        <li>• Thermal → Electrical</li>
                        <li>• Optical → Electrical</li>
                        <li>• Chemical → Electrical</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Signal Flow */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <ArrowRightIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Information Flow in Measurement Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Understanding how information flows from physical phenomena to usable electrical signals is crucial for instrumentation system design and analysis.
              </p>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-4 text-center text-base sm:text-lg">Complete Signal Chain</h4>
                <div className="space-y-4">
                  {/* Flow diagram */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium text-sm sm:text-base">1. Physical Variable</h5>
                      <p className="text-xs mt-1">Temperature, Pressure, Flow, etc.</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <ArrowRightIcon className="h-4 w-4 text-yellow-400 hidden sm:block" />
                      <span className="text-yellow-400 sm:hidden">↓</span>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium text-sm sm:text-base">2. Sensor Detection</h5>
                      <p className="text-xs mt-1">Physical change detected</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <ArrowRightIcon className="h-4 w-4 text-yellow-400 hidden sm:block" />
                      <span className="text-yellow-400 sm:hidden">↓</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium text-sm sm:text-base">3. Energy Conversion</h5>
                      <p className="text-xs mt-1">Transducer converts to electrical</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <ArrowRightIcon className="h-4 w-4 text-yellow-400 hidden sm:block" />
                      <span className="text-yellow-400 sm:hidden">↓</span>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium text-sm sm:text-base">4. Signal Processing</h5>
                      <p className="text-xs mt-1">Amplification, filtering, scaling</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <ArrowRightIcon className="h-4 w-4 text-yellow-400 hidden sm:block" />
                      <span className="text-yellow-400 sm:hidden">↓</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-card p-3 rounded inline-block">
                      <h5 className="text-white font-medium text-sm sm:text-base">5. Output Signal</h5>
                      <p className="text-xs mt-1">4-20mA, 0-10V, Digital</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h5 className="text-yellow-400 font-semibold mb-2 text-sm sm:text-base">Separate Components Example</h5>
                  <p className="text-xs sm:text-sm mb-2"><strong>RTD + Signal Conditioner:</strong></p>
                  <ul className="text-xs sm:text-sm space-y-1">
                    <li>• RTD detects temperature change (sensor)</li>
                    <li>• Resistance change occurs</li>
                    <li>• Signal conditioner converts resistance to 4-20mA (transducer)</li>
                    <li>• Standard signal sent to control system</li>
                  </ul>
                </div>
                
                <div className="bg-card p-4 rounded-lg border border-gray-600">
                  <h5 className="text-yellow-400 font-semibold mb-2 text-sm sm:text-base">Integrated Device Example</h5>
                  <p className="text-xs sm:text-sm mb-2"><strong>Thermocouple:</strong></p>
                  <ul className="text-xs sm:text-sm space-y-1">
                    <li>• Junction detects temperature (sensor function)</li>
                    <li>• Dissimilar metals generate voltage (transducer function)</li>
                    <li>• Direct electrical output</li>
                    <li>• Single device performs both functions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Combined vs Separate Systems */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Gauge className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Integrated vs Modular Configurations
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Modern instrumentation employs both integrated devices that combine sensor and transducer functions, and modular systems where components are separate. Each approach has distinct advantages depending on the application requirements.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Integrated Sensor/Transducer Devices</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Advantages:</h5>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• Compact design saves space</li>
                        <li>• Reduced wiring and connections</li>
                        <li>• Lower installation costs</li>
                        <li>• Fewer failure points</li>
                        <li>• Factory calibration</li>
                        <li>• Simplified maintenance</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Examples:</h5>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• <strong>Pressure transmitters:</strong> Diaphragm + electronics</li>
                        <li>• <strong>Smart temperature transmitters:</strong> RTD/TC + digital processing</li>
                        <li>• <strong>Flow meters:</strong> Sensor + signal processing</li>
                        <li>• <strong>Level transmitters:</strong> Sensing element + output circuitry</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Modular Sensor/Transducer Systems</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Advantages:</h5>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• Flexibility in component selection</li>
                        <li>• Easier troubleshooting and repair</li>
                        <li>• Component-specific replacement</li>
                        <li>• Custom signal conditioning</li>
                        <li>• Better harsh environment protection</li>
                        <li>• Cost-effective for simple applications</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Examples:</h5>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• <strong>RTD + transmitter:</strong> Separate sensor and signal conditioner</li>
                        <li>• <strong>Strain gauge + amplifier:</strong> Separate sensing and conditioning</li>
                        <li>• <strong>Photodiode + current-to-voltage converter:</strong> Modular light measurement</li>
                        <li>• <strong>LVDT + demodulator:</strong> Position sensing system</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <Alert className="bg-green-600/10 border-green-600/30">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription className="text-gray-300 text-sm sm:text-base">
                  <strong>Selection Criteria:</strong> Choose integrated devices for standard applications requiring simplicity and reliability. Choose modular systems for specialized requirements, harsh environments, or when flexibility is paramount.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Real-World Scenario */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Real-World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Hydraulic System Safety Protection</h4>
                <p className="text-xs sm:text-sm leading-relaxed mb-4">
                  In a manufacturing facility, a hydraulic press system requires pressure monitoring to prevent dangerous over-pressurisation that could cause equipment damage or injury. The system uses both sensor and transducer principles:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Pressure Sensing</h5>
                      <p className="text-xs">A diaphragm inside the hydraulic line physically responds to pressure changes (sensor function)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Energy Conversion</h5>
                      <p className="text-xs">Diaphragm movement is converted to electrical signal via strain gauges (transducer function)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Signal Processing</h5>
                      <p className="text-xs">Electronic circuitry amplifies and converts the signal to standard 4-20mA output</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Safety Action</h5>
                      <p className="text-xs">When pressure exceeds safe limits, the control system triggers automatic shutdown valves</p>
                    </div>
                  </div>
                </div>
                
                <Alert className="mt-4 bg-green-600/10 border-green-600/30">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-gray-300 text-xs sm:text-sm">
                    <strong>Result:</strong> This integrated pressure transmitter combines both sensor and transducer functions in one device, providing reliable safety protection while simplifying installation and maintenance.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-sm sm:text-base leading-relaxed">
                Understanding the distinction between sensors and transducers is fundamental to instrumentation system design. Sensors detect physical changes while transducers convert those changes into usable electrical signals. Modern devices often combine both functions for simplicity and reliability, while modular systems offer flexibility for specialized applications.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2 text-sm sm:text-base">Key Concepts</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-white">Sensors:</strong> Detect and respond to physical phenomena in the environment
                  </div>
                  <div>
                    <strong className="text-white">Transducers:</strong> Convert one form of energy into another, typically electrical
                  </div>
                  <div>
                    <strong className="text-white">Integration:</strong> Many devices combine both functions for improved performance
                  </div>
                  <div>
                    <strong className="text-white">Selection:</strong> Choose based on application requirements and environmental conditions
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
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 pt-6 sm:pt-8">
            <Link to="../instrumentation-module-2" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Module 2
              </Button>
            </Link>
            <Link to="../instrumentation-module-2-section-2" className="w-full sm:w-auto">
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

export default InstrumentationModule2Section1;