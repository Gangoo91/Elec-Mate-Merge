import { ArrowLeft, ArrowRight, Signal, AlertTriangle, CheckCircle, Zap, Lightbulb, Binary, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const InstrumentationModule2Section5 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What type of output is used to send continuous temperature data?",
      options: [
        "Digital output with discrete states",
        "Analog output with continuous voltage or current",
        "Binary pulse output",
        "On/off switching output"
      ],
      correct: 1,
      explanation: "Analog output is used for continuous temperature data because it can represent the full range of temperature values with a continuous voltage (0-10V) or current signal (4-20mA)."
    },
    {
      id: 2,
      question: "Give an example of a digital output device.",
      options: [
        "Thermocouple with voltage output",
        "4-20mA pressure transmitter",
        "Proximity sensor with on/off output",
        "RTD with resistance output"
      ],
      correct: 2,
      explanation: "A proximity sensor with on/off output is a classic example of a digital output device - it provides discrete states (object present/absent) rather than continuous values."
    },
    {
      id: 3,
      question: "What's a key advantage of analog signals?",
      options: [
        "Better noise immunity than digital signals",
        "They provide continuous information and can represent precise values",
        "They require less wiring than digital signals",
        "They consume less power than digital signals"
      ],
      correct: 1,
      explanation: "Analog signals provide continuous information and can represent precise values across their full range, making them ideal for applications requiring detailed measurement data."
    },
    {
      id: 4,
      question: "Why use a digital sensor in safety systems?",
      options: [
        "Digital sensors are always more accurate",
        "They provide better noise immunity and definitive on/off states for safety decisions",
        "Digital sensors are cheaper than analog sensors",
        "They consume less power"
      ],
      correct: 1,
      explanation: "Digital sensors are preferred in safety systems because they provide excellent noise immunity and clear, definitive on/off states that are essential for making reliable safety decisions without ambiguity."
    },
    {
      id: 5,
      question: "What does an ADC do?",
      options: [
        "Amplifies digital control signals",
        "Converts analog signals to digital form for processing",
        "Provides automatic device calibration",
        "Adds digital communication to analog devices"
      ],
      correct: 1,
      explanation: "An ADC (Analog-to-Digital Converter) converts continuous analog signals into digital format so they can be processed by digital systems like computers and PLCs."
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
              <Signal className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Digital vs Analog Sensor Output
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-400 mt-1">
                  Understanding output types and their implications for signal processing and system integration
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
                Module 2.5
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs sm:text-sm">
                25 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Signal className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-sm sm:text-base leading-relaxed">
                Sensor outputs determine how measurement information is communicated to control systems and processing equipment. Understanding the fundamental differences between analog and digital outputs is crucial for proper system design, signal processing, and data acquisition. This section breaks down the characteristics, advantages, and applications of each output type.
              </p>
              <Alert className="bg-yellow-400/10 border-blue-600/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-gray-300 text-sm sm:text-base">
                  Choosing the wrong output type can lead to compatibility issues, poor system performance, or loss of critical measurement information.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Learning Objectives */}
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
                    <span>Understand the difference between analog and digital outputs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Know typical signal formats and their applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Choose appropriate output types based on application needs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Understand signal conversion and processing methods</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Analog Output */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Analog Output
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Analog outputs provide continuous signals that can represent any value within their specified range. They are ideal for applications requiring precise measurement data and smooth control responses.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Common Analog Signal Types</h4>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">4-20mA Current Loop</h5>
                      <p className="text-xs sm:text-sm mb-2">Industry standard for long-distance signal transmission with excellent noise immunity.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Advantages:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Excellent noise immunity</li>
                            <li>• Long transmission distances</li>
                            <li>• Two-wire operation possible</li>
                            <li>• 4mA live zero for fault detection</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Applications:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Process control systems</li>
                            <li>• Industrial transmitters</li>
                            <li>• SCADA systems</li>
                            <li>• Remote monitoring</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">0-10V DC Voltage</h5>
                      <p className="text-xs sm:text-sm mb-2">Common voltage signal for local measurements and control applications.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Advantages:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Simple to interface</li>
                            <li>• High input impedance</li>
                            <li>• Low power consumption</li>
                            <li>• Direct ADC interface</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Limitations:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Susceptible to noise</li>
                            <li>• Limited transmission distance</li>
                            <li>• Voltage drop issues</li>
                            <li>• Ground loop problems</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">mV Sensor Outputs</h5>
                      <p className="text-xs sm:text-sm mb-2">Low-level signals from sensors like thermocouples and strain gauges.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Characteristics:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Very low signal levels</li>
                            <li>• High sensitivity to noise</li>
                            <li>• Requires amplification</li>
                            <li>• Temperature compensation needed</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Applications:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Thermocouple inputs</li>
                            <li>• Strain gauge bridges</li>
                            <li>• pH measurement</li>
                            <li>• Precision weighing</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Analog Signal Characteristics</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Signal Resolution</h5>
                      <p className="text-xs sm:text-sm mb-2">Theoretically infinite resolution limited only by noise and converter accuracy.</p>
                      <p className="text-xs"><strong>Practical:</strong> 12-16 bit ADC provides 4096-65536 discrete levels</p>
                    </div>
                    
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Noise Immunity</h5>
                      <p className="text-xs sm:text-sm mb-2">Current loops excel, voltage signals more susceptible to interference.</p>
                      <p className="text-xs"><strong>Mitigation:</strong> Shielded cables, twisted pairs, proper grounding</p>
                    </div>
                    
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Processing Methods</h5>
                      <p className="text-xs sm:text-sm mb-2">Filtering, scaling, linearisation, and compensation.</p>
                      <p className="text-xs"><strong>Tools:</strong> Signal conditioners, isolators, amplifiers</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Digital Output */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Binary className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Digital Output
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Digital outputs provide discrete states or data packets, offering excellent noise immunity and direct compatibility with digital control systems.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Digital Signal Types</h4>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">On/Off (Binary) Signals</h5>
                      <p className="text-xs sm:text-sm mb-2">Simple two-state outputs for presence detection and switching applications.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Characteristics:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Two states: HIGH/LOW</li>
                            <li>• Typically 24VDC or 5VDC logic</li>
                            <li>• Simple interface circuits</li>
                            <li>• Immediate response</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Applications:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Proximity detection</li>
                            <li>• Limit switches</li>
                            <li>• Safety interlocks</li>
                            <li>• Alarm contacts</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Pulse/Frequency Outputs</h5>
                      <p className="text-xs sm:text-sm mb-2">Variable frequency signals proportional to measured values.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Advantages:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Excellent transmission capability</li>
                            <li>• Simple totalising function</li>
                            <li>• Good noise immunity</li>
                            <li>• No signal degradation</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Applications:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Flow totalisation</li>
                            <li>• Speed measurement</li>
                            <li>• Position encoding</li>
                            <li>• Energy metering</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Serial Data Communication</h5>
                      <p className="text-xs sm:text-sm mb-2">Structured data packets containing measurement values and status information.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Protocols:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• HART (4-20mA + digital)</li>
                            <li>• Modbus RTU/TCP</li>
                            <li>• Profibus/Profinet</li>
                            <li>• Foundation Fieldbus</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Benefits:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Multiple parameters</li>
                            <li>• Diagnostic information</li>
                            <li>• Configuration capability</li>
                            <li>• Network integration</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Signal Conversion */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Signal Conversion and Processing
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Modern control systems often require conversion between analog and digital signals, along with various signal processing functions to ensure optimal performance.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Analog-to-Digital Conversion (ADC)</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Function:</h5>
                      <p className="text-xs sm:text-sm mb-3">Converts continuous analog signals into discrete digital values for computer processing.</p>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Key Parameters:</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• <strong>Resolution:</strong> Number of bits (8, 12, 16, 24-bit)</li>
                        <li>• <strong>Sampling Rate:</strong> Conversions per second</li>
                        <li>• <strong>Accuracy:</strong> How close to true value</li>
                        <li>• <strong>Input Range:</strong> Voltage/current limits</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Applications:</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• PLC analog input modules</li>
                        <li>• Data acquisition systems</li>
                        <li>• Digital multimeters</li>
                        <li>• Process controllers</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Digital-to-Analog Conversion (DAC)</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Function:</h5>
                      <p className="text-xs sm:text-sm mb-3">Converts digital control signals into analog outputs for actuators and control devices.</p>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Key Parameters:</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• <strong>Resolution:</strong> Number of output steps</li>
                        <li>• <strong>Settling Time:</strong> Response speed</li>
                        <li>• <strong>Linearity:</strong> Output accuracy</li>
                        <li>• <strong>Output Range:</strong> Voltage/current limits</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Applications:</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• PLC analog output modules</li>
                        <li>• Motor speed control</li>
                        <li>• Valve positioning</li>
                        <li>• Process setpoint control</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Application Fit Considerations</h4>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="bg-card p-3 rounded">
                    <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Real-Time Control</h5>
                    <p className="text-xs sm:text-sm mb-2">Analog signals provide immediate, continuous feedback for closed-loop control.</p>
                    <p className="text-xs"><strong>Best for:</strong> Temperature control, pressure regulation, flow control</p>
                  </div>
                  
                  <div className="bg-card p-3 rounded">
                    <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Data Logging</h5>
                    <p className="text-xs sm:text-sm mb-2">Digital systems excel at storing and processing large amounts of measurement data.</p>
                    <p className="text-xs"><strong>Best for:</strong> Historical trending, batch records, compliance documentation</p>
                  </div>
                  
                  <div className="bg-card p-3 rounded">
                    <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Alarm Systems</h5>
                    <p className="text-xs sm:text-sm mb-2">Digital outputs provide definitive states for reliable alarm and safety functions.</p>
                    <p className="text-xs"><strong>Best for:</strong> Safety interlocks, equipment protection, status indication</p>
                  </div>
                </div>
              </div>
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
                <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">HVAC System Integration</h4>
                <p className="text-xs sm:text-sm leading-relaxed mb-4">
                  A modern HVAC system demonstrates the strategic use of both analog and digital sensor outputs to optimise comfort and energy efficiency:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Temperature Control (Analog)</h5>
                      <p className="text-xs">Temperature sensors provide 4-20mA signals for precise control of heating/cooling systems, enabling smooth temperature regulation without oscillation.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Occupancy Detection (Digital)</h5>
                      <p className="text-xs">Motion sensors provide digital on/off signals to trigger lighting and ventilation, ensuring energy efficiency when spaces are unoccupied.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Airflow Monitoring (Analog + Digital)</h5>
                      <p className="text-xs">Flow sensors provide analog signals for variable speed fan control, while digital outputs trigger alarms for filter maintenance.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">System Integration</h5>
                      <p className="text-xs">Building management system processes both signal types through ADC/DAC conversion for unified control and monitoring.</p>
                    </div>
                  </div>
                </div>
                
                <Alert className="mt-4 bg-green-600/10 border-green-600/30">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-gray-300 text-xs sm:text-sm">
                    <strong>Results:</strong> The hybrid approach achieved 30% energy savings through precise analog control and efficient digital switching, while maintaining optimal comfort conditions.
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
                Choosing the right output format ensures compatibility with the control system and directly impacts data quality and control precision. Understanding both analog and digital characteristics enables optimal system design and performance.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2 text-sm sm:text-base">Key Concepts</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-white">Analog Outputs:</strong> Continuous signals ideal for precise control and measurement applications
                  </div>
                  <div>
                    <strong className="text-white">Digital Outputs:</strong> Discrete states perfect for switching, safety, and data communication
                  </div>
                  <div>
                    <strong className="text-white">Signal Conversion:</strong> ADC/DAC enable integration between analog and digital systems
                  </div>
                  <div>
                    <strong className="text-white">Application Matching:</strong> Choose output type based on control requirements and system compatibility
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
            <Link to="../instrumentation-module-2-section-4" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../instrumentation-module-2-section-6" className="w-full sm:w-auto">
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

export default InstrumentationModule2Section5;