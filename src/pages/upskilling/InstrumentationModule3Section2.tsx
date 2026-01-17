import { ArrowLeft, ArrowRight, Gauge, AlertTriangle, CheckCircle, Zap, Lightbulb, Activity, BarChart3, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const InstrumentationModule3Section2 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What does a 4 mA signal typically represent?",
      options: [
        "A system fault condition",
        "The zero or minimum scale value (0% of measurement range)",
        "The maximum scale value",
        "50% of the measurement range"
      ],
      correct: 1,
      explanation: "In the 4-20mA standard, 4mA represents 0% of the measurement range (zero scale). For example, in a 0-100°C temperature measurement, 4mA = 0°C, providing 'live zero' capability."
    },
    {
      id: 2,
      question: "Why use 4–20mA over 0–20mA?",
      options: [
        "4-20mA signals are cheaper to implement",
        "The 4mA offset provides live-zero for fault detection",
        "4-20mA signals have better accuracy",
        "They consume less power"
      ],
      correct: 1,
      explanation: "The 4mA offset in 4-20mA signals provides 'live-zero' capability, allowing differentiation between a true zero reading (4mA) and a system fault (0mA from broken wire). This enables automatic fault detection."
    },
    {
      id: 3,
      question: "Which signal is most affected by cable length?",
      options: [
        "4-20mA current signals",
        "0-10V voltage signals",
        "Frequency pulse signals",
        "Digital communication signals"
      ],
      correct: 1,
      explanation: "0-10V voltage signals are most affected by cable length due to voltage drop caused by cable resistance and increased susceptibility to electrical noise pickup over long distances."
    },
    {
      id: 4,
      question: "When would you use a pulse signal?",
      options: [
        "For high-accuracy temperature measurement",
        "For pressure measurement in hydraulic systems",
        "For flow totalisation and speed measurement applications",
        "For pH measurement in chemical processes"
      ],
      correct: 2,
      explanation: "Pulse signals are ideal for flow totalisation (counting total volume) and speed measurement because pulses can be easily counted and totalled, providing natural integration of flow or rotational data."
    },
    {
      id: 5,
      question: "What does it mean if a 4–20mA signal reads 0 mA?",
      options: [
        "The measurement is at minimum scale",
        "The system is operating normally",
        "There is a fault condition such as broken wire or sensor failure",
        "The measurement is at 50% scale"
      ],
      correct: 2,
      explanation: "In a 4-20mA system, 0mA indicates a fault condition such as a broken wire, power failure, or sensor malfunction. Normal operation should never produce 0mA since the minimum signal is 4mA."
  }  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:pt-8 sm:pb-12">
        <Link to="/study-centre/upskilling/instrumentation-module-3">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-6 sm:mb-8 px-3 py-2 rounded-md text-sm sm:text-base touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
              <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Standard Ranges – 4–20mA, 0–10V, Pulse Signals
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-400 mt-1">
                  Exploring industry-standard signal formats and their benefits for system integration
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
                Module 3.2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs sm:text-sm">
                45 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-sm sm:text-base leading-relaxed">
                Standardised signal ranges form the backbone of industrial instrumentation, enabling interoperability between devices from different manufacturers and simplifying system integration and troubleshooting. This section explores the most widely adopted standards: 4–20mA current loops, 0–10V voltage signals, and pulse-based communication.
              </p>
              <Alert className="bg-yellow-400/10 border-blue-600/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-gray-300 text-sm sm:text-base">
                  Understanding standard signal ranges is essential for compatibility, diagnostics, and effective communication across diverse instrumentation systems.
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
                    <span>Learn the benefits of standardised signal ranges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Understand how to interpret 4–20mA and 0–10V signals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Know where and why pulse signals are used</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Apply troubleshooting techniques using signal range behaviour</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 4-20mA Standard */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                4–20mA Current Loop Standard
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                The 4-20mA current loop is the most widely used analogue signal standard in industrial instrumentation, chosen for its excellent noise immunity, long-distance transmission capability, and built-in fault detection through live-zero operation.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Signal Scaling and Interpretation</h4>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Linear Scaling Formula</h5>
                      <div className="bg-card p-3 rounded mb-3">
                        <p className="text-sm font-mono text-center">
                          <strong>Current (mA) = 4 + (Process Value / Full Scale) × 16</strong>
                        </p>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <h6 className="text-white font-medium mb-2 text-xs sm:text-sm">Example: 0-100°C Temperature</h6>
                          <ul className="space-y-1 text-xs sm:text-sm">
                            <li>• 0°C = 4mA + (0/100) × 16 = 4.0mA</li>
                            <li>• 25°C = 4mA + (25/100) × 16 = 8.0mA</li>
                            <li>• 50°C = 4mA + (50/100) × 16 = 12.0mA</li>
                            <li>• 100°C = 4mA + (100/100) × 16 = 20.0mA</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-white font-medium mb-2 text-xs sm:text-sm">Reverse Calculation:</h6>
                          <div className="bg-card p-2 rounded text-xs">
                            <p><strong>Process Value = (Current - 4) × Full Scale / 16</strong></p>
                            <p className="mt-1">Example: 14mA reading</p>
                            <p>Temperature = (14-4) × 100/16 = 62.5°C</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Live-Zero Benefits</h5>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
                        <div className="bg-card p-3 rounded">
                          <h6 className="text-white font-medium mb-2">Normal Operation</h6>
                          <ul className="space-y-1">
                            <li>• 4.0mA = 0% scale</li>
                            <li>• 4.1-19.9mA = Valid readings</li>
                            <li>• 20.0mA = 100% scale</li>
                            <li>• Continuous current flow</li>
                          </ul>
                        </div>
                        
                        <div className="bg-card p-3 rounded">
                          <h6 className="text-white font-medium mb-2">Fault Conditions</h6>
                          <ul className="space-y-1">
                            <li>• 0mA = Wire break/power loss</li>
                            <li>• &lt;3.8mA = Sensor fault</li>
                            <li>• &gt;20.5mA = Over-range/fault</li>
                            <li>• Immediate fault detection</li>
                          </ul>
                        </div>
                        
                        <div className="bg-card p-3 rounded">
                          <h6 className="text-white font-medium mb-2">Diagnostic Benefits</h6>
                          <ul className="space-y-1">
                            <li>• Automatic fault alarms</li>
                            <li>• Loop integrity checking</li>
                            <li>• Calibration verification</li>
                            <li>• Maintenance scheduling</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Why 4-20mA Became the Standard</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Technical Advantages</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Noise Immunity:</strong> Current loops resist EMI better than voltage signals</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Distance:</strong> Reliable transmission over 1000m+ without amplification</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Two-Wire:</strong> Power and signal in same loop reduces wiring</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Linear:</strong> Direct relationship between current and process value</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Industry Benefits</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Standardisation:</strong> Universal acceptance across manufacturers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Troubleshooting:</strong> Easy measurement with standard multimeter</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Compatibility:</strong> Direct interface to PLCs and DCS systems</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Training:</strong> Widely understood by technicians worldwide</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 0-10V Standard */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                0–10V Voltage Standard
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                The 0-10V voltage standard provides simple analogue signalling for local applications where simplicity and direct interfacing are more important than noise immunity or long-distance transmission.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Signal Characteristics and Scaling</h4>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Linear Voltage Scaling</h5>
                      <div className="bg-card p-3 rounded mb-3">
                        <p className="text-sm font-mono text-center">
                          <strong>Voltage (V) = (Process Value / Full Scale) × 10</strong>
                        </p>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <h6 className="text-white font-medium mb-2 text-xs sm:text-sm">Example: 0-500°C Temperature</h6>
                          <ul className="space-y-1 text-xs sm:text-sm">
                            <li>• 0°C = (0/500) × 10 = 0.0V</li>
                            <li>• 125°C = (125/500) × 10 = 2.5V</li>
                            <li>• 250°C = (250/500) × 10 = 5.0V</li>
                            <li>• 500°C = (500/500) × 10 = 10.0V</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-white font-medium mb-2 text-xs sm:text-sm">Resolution Calculation:</h6>
                          <div className="bg-card p-2 rounded text-xs">
                            <p><strong>12-bit ADC Resolution:</strong></p>
                            <p>4096 steps over 10V = 2.44mV/step</p>
                            <p>Temperature resolution = 500°C/4096 = 0.12°C</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Implementation Considerations</h5>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
                        <div className="bg-card p-3 rounded">
                          <h6 className="text-white font-medium mb-2">Circuit Design</h6>
                          <ul className="space-y-1">
                            <li>• High input impedance (&gt;10MΩ)</li>
                            <li>• Low output impedance (&lt;100Ω)</li>
                            <li>• Buffered outputs preferred</li>
                            <li>• Ground reference critical</li>
                          </ul>
                        </div>
                        
                        <div className="bg-card p-3 rounded">
                          <h6 className="text-white font-medium mb-2">Cable Requirements</h6>
                          <ul className="space-y-1">
                            <li>• Shielded twisted pair</li>
                            <li>• Low capacitance cable</li>
                            <li>• Maximum 50-100m distance</li>
                            <li>• Proper shield grounding</li>
                          </ul>
                        </div>
                        
                        <div className="bg-card p-3 rounded">
                          <h6 className="text-white font-medium mb-2">Environmental Limits</h6>
                          <ul className="space-y-1">
                            <li>• Clean electrical environment</li>
                            <li>• Avoid high EMI areas</li>
                            <li>• Temperature stable conditions</li>
                            <li>• Minimal vibration</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Advantages and Limitations</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Key Advantages</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Simple Interface:</strong> Direct connection to ADC inputs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>High Resolution:</strong> Full 10V range provides excellent precision</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Low Cost:</strong> Simple circuits and standard components</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Fast Response:</strong> No current loop settling time</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Primary Limitations</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-yellow-400 mt-1 flex-shrink-0" />
                          <span><strong>Noise Susceptible:</strong> Electrical interference affects accuracy</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-yellow-400 mt-1 flex-shrink-0" />
                          <span><strong>Distance Limited:</strong> Voltage drop and noise over long cables</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-yellow-400 mt-1 flex-shrink-0" />
                          <span><strong>Ground Loops:</strong> Potential difference between ground points</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-yellow-400 mt-1 flex-shrink-0" />
                          <span><strong>No Fault Detection:</strong> Cannot distinguish between 0V and fault</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pulse Signals */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Radio className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Pulse Signals
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Pulse signals encode measurement data through frequency or pulse count, providing natural totalising capability and excellent noise immunity for applications like flow measurement and speed sensing.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Pulse Signal Types and Applications</h4>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Flow Totalisation Example</h5>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <h6 className="text-white font-medium mb-2 text-xs sm:text-sm">Turbine Flow Meter:</h6>
                          <ul className="space-y-1 text-xs sm:text-sm">
                            <li>• K-factor: 1000 pulses/litre</li>
                            <li>• 60Hz = 60 pulses/second</li>
                            <li>• Flow rate = 60/1000 = 0.06 L/s = 3.6 L/min</li>
                            <li>• Total = pulse count ÷ K-factor</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-white font-medium mb-2 text-xs sm:text-sm">Calculation Example:</h6>
                          <div className="bg-card p-2 rounded text-xs">
                            <p><strong>1 hour operation at 60Hz:</strong></p>
                            <p>Total pulses = 60 × 3600 = 216,000</p>
                            <p>Total flow = 216,000/1000 = 216 litres</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Pulse Signal Characteristics</h5>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
                        <div className="bg-card p-3 rounded">
                          <h6 className="text-white font-medium mb-2">Signal Properties</h6>
                          <ul className="space-y-1">
                            <li>• Square wave output</li>
                            <li>• TTL/CMOS logic levels</li>
                            <li>• Frequency proportional to rate</li>
                            <li>• Pulse count for totals</li>
                          </ul>
                        </div>
                        
                        <div className="bg-card p-3 rounded">
                          <h6 className="text-white font-medium mb-2">Typical Ranges</h6>
                          <ul className="space-y-1">
                            <li>• 0-1000 Hz</li>
                            <li>• 0-10 kHz</li>
                            <li>• 5V or 24V logic</li>
                            <li>• Open collector output</li>
                          </ul>
                        </div>
                        
                        <div className="bg-card p-3 rounded">
                          <h6 className="text-white font-medium mb-2">Processing Methods</h6>
                          <ul className="space-y-1">
                            <li>• Frequency-to-voltage converters</li>
                            <li>• High-speed counters</li>
                            <li>• PLC pulse input modules</li>
                            <li>• Microprocessor timer inputs</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Pulse Signal Advantages</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Technical Benefits</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Excellent Noise Immunity:</strong> Digital nature resists interference</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Natural Totalising:</strong> Pulse counting provides running totals</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>High Accuracy:</strong> Each pulse represents precise quantity</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Long Distance:</strong> Digital signals transmit reliably</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Application Benefits</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Billing Accuracy:</strong> Precise custody transfer measurements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Batch Control:</strong> Exact quantity dispensing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Process Monitoring:</strong> Real-time rate and total information</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Energy Measurement:</strong> kWh metering and monitoring</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Standards Benefits */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Why Standards Matter
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Standardised signal ranges provide the foundation for reliable, interoperable instrumentation systems. Understanding their importance enables better system design decisions and more effective troubleshooting.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3 text-base sm:text-lg">Compatibility</h4>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span>Universal manufacturer acceptance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span>Direct system integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span>Reduced interface complexity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span>Mix-and-match components</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3 text-base sm:text-lg">Diagnostics</h4>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span>Predictable signal behaviour</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span>Standard test procedures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span>Common troubleshooting tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span>Fault isolation techniques</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3 text-base sm:text-lg">Calibration</h4>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span>Standard reference values</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span>Traceable calibration sources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span>Consistent accuracy verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span>Simplified maintenance procedures</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Troubleshooting Guide */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Troubleshooting Using Signal Range Behaviour
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Understanding normal signal behaviour enables rapid fault diagnosis and system troubleshooting. Each standard has characteristic patterns that indicate specific problems.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">4-20mA Troubleshooting</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-600 rounded-lg">
                      <thead>
                        <tr className="bg-card">
                          <th className="border border-gray-600 p-3 text-left text-xs sm:text-sm font-semibold text-yellow-400">Reading</th>
                          <th className="border border-gray-600 p-3 text-left text-xs sm:text-sm font-semibold text-white">Indication</th>
                          <th className="border border-gray-600 p-3 text-left text-xs sm:text-sm font-semibold text-white">Likely Cause</th>
                          <th className="border border-gray-600 p-3 text-left text-xs sm:text-sm font-semibold text-white">Action Required</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs sm:text-sm">
                        <tr>
                          <td className="border border-gray-600 p-3 font-medium">0 mA</td>
                          <td className="border border-gray-600 p-3 text-red-400">System Fault</td>
                          <td className="border border-gray-600 p-3">Wire break, power loss, sensor failure</td>
                          <td className="border border-gray-600 p-3">Check wiring, power supply, sensor</td>
                        </tr>
                        <tr className="bg-card">
                          <td className="border border-gray-600 p-3 font-medium">&lt;3.8 mA</td>
                          <td className="border border-gray-600 p-3 text-yellow-400">Under-range</td>
                          <td className="border border-gray-600 p-3">Sensor fault, calibration error</td>
                          <td className="border border-gray-600 p-3">Calibrate sensor, check range</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-3 font-medium">4-20 mA</td>
                          <td className="border border-gray-600 p-3 text-green-400">Normal</td>
                          <td className="border border-gray-600 p-3">System operating correctly</td>
                          <td className="border border-gray-600 p-3">No action required</td>
                        </tr>
                        <tr className="bg-card">
                          <td className="border border-gray-600 p-3 font-medium">&gt;20.5 mA</td>
                          <td className="border border-gray-600 p-3 text-yellow-400">Over-range</td>
                          <td className="border border-gray-600 p-3">Process over-range, sensor fault</td>
                          <td className="border border-gray-600 p-3">Check process, verify calibration</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Common Diagnostic Techniques</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Signal Injection Testing</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>4-20mA:</strong> Use calibrated current source</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>0-10V:</strong> Use precision voltage source</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Pulse:</strong> Use function generator</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Verify system response at key points</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Loop Resistance Testing</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Measure loop resistance with power off</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Check for cable damage or corrosion</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Verify connection integrity</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Compare with cable specifications</span>
                        </li>
                      </ul>
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
                <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Real-World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Wastewater Treatment Plant Monitoring</h4>
                <p className="text-xs sm:text-sm leading-relaxed mb-4">
                  A wastewater treatment facility demonstrates the practical application of multiple signal standards working together for process control and regulatory compliance:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Flow Monitoring (Pulse Output)</h5>
                      <p className="text-xs">Turbine meter with 1000 pulses/m³ enables precise custody transfer measurement for billing and regulatory reporting, with totalisation accuracy of ±0.1%.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Chemical Dosing Control (4-20mA)</h5>
                      <p className="text-xs">pH sensors provide 4-20mA signals for automated chemical dosing control, with live-zero detection preventing overdosing during sensor failures.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Process Integration</h5>
                      <p className="text-xs">SCADA system integrates pulse totals for flow reporting and 4-20mA signals for real-time pH control, maintaining treatment effectiveness and regulatory compliance.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Fault Management</h5>
                      <p className="text-xs">Standard signal ranges enable rapid troubleshooting - 0mA readings trigger immediate alarms while pulse signal failures prevent billing disputes.</p>
                    </div>
                  </div>
                </div>
                
                <Alert className="mt-4 bg-green-600/10 border-green-600/30">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-gray-300 text-xs sm:text-sm">
                    <strong>Results:</strong> Standardised signals achieved 99.5% measurement uptime, reduced troubleshooting time by 60%, and ensured zero billing disputes through accurate pulse-based flow totalisation.
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
                Familiarity with 4–20mA, 0–10V, and pulse standards enables effective system setup, troubleshooting, and communication across devices. These standards form the foundation of reliable industrial instrumentation systems.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2 text-sm sm:text-base">Key Concepts</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-white">4-20mA Standard:</strong> Industry workhorse with live-zero and excellent noise immunity
                  </div>
                  <div>
                    <strong className="text-white">0-10V Standard:</strong> Simple local signalling with high resolution but distance limitations
                  </div>
                  <div>
                    <strong className="text-white">Pulse Signals:</strong> Ideal for totalising applications with natural digital noise immunity
                  </div>
                  <div>
                    <strong className="text-white">Standards Benefits:</strong> Enable compatibility, diagnostics, and consistent troubleshooting approaches
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
            <Link to="/study-centre/upskilling/instrumentation-module-3-section-1" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400 touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/study-centre/upskilling/instrumentation-course" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-yellow-400 text-black hover:bg-yellow-400/10 touch-manipulation active:scale-[0.98]">
                Complete Module 3
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule3Section2;