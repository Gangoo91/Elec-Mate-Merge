import { ArrowLeft, ArrowRight, Signal, AlertTriangle, CheckCircle, Zap, Lightbulb, Activity, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const InstrumentationModule3Section1 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What are the advantages of 4–20mA signals?",
      options: [
        "They are cheaper to implement than voltage signals",
        "Excellent noise immunity and live-zero detection capability",
        "They require less power than other signal types",
        "They provide higher resolution than digital signals"
      ],
      correct: 1,
      explanation: "4-20mA signals offer excellent noise immunity because current is less affected by electrical interference than voltage. The 4mA live-zero allows detection of broken wires or sensor failures, as 0mA indicates a fault condition."
    },
    {
      id: 2,
      question: "Which signal type is most common with RTDs?",
      options: [
        "Voltage signals (0-10V)",
        "Current signals (4-20mA)",
        "Resistance signals (varying ohms)",
        "Frequency signals (Hz)"
      ],
      correct: 2,
      explanation: "RTDs (Resistance Temperature Detectors) inherently produce resistance changes with temperature variations. The RTD's resistance typically changes from around 100Ω to 138Ω over a 0-100°C range for Pt100 sensors."
    },
    {
      id: 3,
      question: "What's a downside of voltage signals over long distances?",
      options: [
        "They consume too much power",
        "Voltage drop and susceptibility to electrical noise interference",
        "They require special cables",
        "They cannot be digitally processed"
      ],
      correct: 1,
      explanation: "Voltage signals suffer from voltage drop due to cable resistance over long distances, and they are more susceptible to electrical noise pickup, which can cause measurement errors and signal degradation."
    },
    {
      id: 4,
      question: "Why might a system use frequency output?",
      options: [
        "Frequency signals are always more accurate",
        "They use less power than other signal types",
        "Excellent for totalising applications and noise immunity",
        "They are required by safety regulations"
      ],
      correct: 2,
      explanation: "Frequency signals are excellent for totalising applications (like flow measurement) because pulses can be easily counted. They also provide good noise immunity since noise rarely creates false pulses at the correct frequency."
    },
    {
      id: 5,
      question: "Which signal type is best for environments with electrical noise?",
      options: [
        "0-10V voltage signals",
        "4-20mA current signals",
        "Millivolt signals",
        "Variable resistance signals"
      ],
      correct: 1,
      explanation: "4-20mA current signals are best for noisy electrical environments because current loops are inherently less susceptible to electrical interference than voltage-based signals, providing more reliable measurements."
  }  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:pt-8 sm:pb-12">
        <Link to="../instrumentation-module-3">
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
              <Signal className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Signal Types – Voltage, Current, Resistance, Frequency
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-400 mt-1">
                  Understanding the core electrical signal types used to carry measurement data
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
                Module 3.1
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
                <Signal className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-sm sm:text-base leading-relaxed">
                Instrumentation systems rely on accurate signal representation to convey measurement information from sensors to control systems. Understanding the fundamental electrical signal types—voltage, current, resistance, and frequency—is essential for designing robust measurement systems that perform reliably in industrial environments.
              </p>
              <Alert className="bg-yellow-400/10 border-blue-600/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-gray-300 text-sm sm:text-base">
                  The choice of signal type significantly impacts system performance, noise immunity, and troubleshooting capabilities. Understanding each type's characteristics is crucial for optimal system design.
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
                    <span>Identify the key electrical signal types used in instrumentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Understand the behaviour and application of each signal type</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Recognise how different sensors output different signal types</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Compare signal types for range, noise susceptibility, and distance performance</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Voltage Signals */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Voltage Signals
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Voltage signals represent measurement data as varying electrical potential between two points. They are commonly used in analogue sensors and provide direct interfacing with many measurement systems.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Common Voltage Signal Ranges</h4>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">0-10V DC</h5>
                      <p className="text-xs sm:text-sm mb-2">Most common industrial voltage signal range, providing good resolution and simple interfacing.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Advantages:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Simple to interface</li>
                            <li>• High input impedance</li>
                            <li>• Good resolution capability</li>
                            <li>• Direct ADC connection</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Applications:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• PLC analogue inputs</li>
                            <li>• Chart recorders</li>
                            <li>• Local panel meters</li>
                            <li>• Data acquisition systems</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">±10V Bipolar</h5>
                      <p className="text-xs sm:text-sm mb-2">Allows representation of both positive and negative values around a zero reference.</p>
                      <div className="text-xs sm:text-sm">
                        <strong className="text-white">Applications:</strong> Position sensors, displacement measurements, differential measurements
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Millivolt Signals</h5>
                      <p className="text-xs sm:text-sm mb-2">Low-level signals typically from thermocouples and strain gauges (0-100mV range).</p>
                      <div className="text-xs sm:text-sm">
                        <strong className="text-white">Considerations:</strong> Require amplification, very sensitive to noise, need careful shielding
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Voltage Signal Characteristics</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Advantages</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• Simple measurement circuits</li>
                        <li>• High input impedance (minimal loading)</li>
                        <li>• Direct digital conversion</li>
                        <li>• Good dynamic range</li>
                        <li>• Cost-effective implementation</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Disadvantages</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• Susceptible to electrical noise</li>
                        <li>• Voltage drop over long cables</li>
                        <li>• Ground loop problems</li>
                        <li>• EMI interference pickup</li>
                        <li>• Limited transmission distance</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Best Applications</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• Local measurements (&lt;50m)</li>
                        <li>• Laboratory instruments</li>
                        <li>• Control room panels</li>
                        <li>• High-accuracy applications</li>
                        <li>• Clean electrical environments</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Signals */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Current Signals
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Current signals, particularly the industry-standard 4-20mA, provide excellent noise immunity and are ideal for long-distance transmission in industrial environments.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">4-20mA Current Loop Standard</h4>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Why 4-20mA?</h5>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs sm:text-sm mb-3">The 4mA offset provides "live zero" capability - allowing distinction between a true zero reading and a system fault.</p>
                          <ul className="space-y-1 text-xs sm:text-sm">
                            <li>• <strong>4mA = 0% scale (0°C, 0 bar, etc.)</strong></li>
                            <li>• <strong>12mA = 50% scale</strong></li>
                            <li>• <strong>20mA = 100% scale</strong></li>
                            <li>• <strong>0mA = Fault condition</strong></li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-white font-medium mb-2 text-xs sm:text-sm">Signal Calculation:</h6>
                          <div className="bg-card p-2 rounded text-xs">
                            <p><strong>Current (mA) = 4 + (16 × %Scale/100)</strong></p>
                            <p className="mt-1">Example: 50% scale = 4 + (16 × 0.5) = 12mA</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Current Loop Characteristics</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Superior Performance:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Excellent noise immunity</li>
                            <li>• Long transmission distances (1000m+)</li>
                            <li>• Two-wire operation possible</li>
                            <li>• Fault detection capability</li>
                            <li>• Consistent accuracy</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Implementation:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Requires precision resistor (250Ω)</li>
                            <li>• Loop power supply needed</li>
                            <li>• Higher complexity than voltage</li>
                            <li>• Industry standard acceptance</li>
                            <li>• HART communication compatible</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Current Signal Applications</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Ideal Applications</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Process control transmitters</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Long-distance signal transmission</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Noisy industrial environments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>SCADA and DCS systems</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Safety-critical measurements</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Common Devices</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Pressure transmitters</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Temperature transmitters</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Flow transmitters</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Level transmitters</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Analytical transmitters</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resistance Signals */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Resistance Signals
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Resistance signals are the fundamental output of RTDs and thermistors, where the sensor's resistance changes proportionally to the measured parameter, typically temperature.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">RTD Resistance Characteristics</h4>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Pt100 RTD Example</h5>
                      <p className="text-xs sm:text-sm mb-3">Most common RTD type with 100Ω resistance at 0°C</p>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <h6 className="text-white font-medium mb-2 text-xs sm:text-sm">Temperature vs Resistance:</h6>
                          <ul className="space-y-1 text-xs sm:text-sm">
                            <li>• 0°C = 100.00Ω</li>
                            <li>• 25°C = 109.73Ω</li>
                            <li>• 50°C = 119.40Ω</li>
                            <li>• 100°C = 138.51Ω</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-white font-medium mb-2 text-xs sm:text-sm">Key Parameters:</h6>
                          <ul className="space-y-1 text-xs sm:text-sm">
                            <li>• <strong>α = 0.00385Ω/Ω/°C</strong></li>
                            <li>• Linear response</li>
                            <li>• High accuracy (±0.1°C)</li>
                            <li>• Excellent stability</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Measurement Methods</h5>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
                        <div className="bg-card p-3 rounded">
                          <h6 className="text-white font-medium mb-2">2-Wire</h6>
                          <p className="mb-2">Simplest connection but includes lead wire resistance in measurement.</p>
                          <p><strong>Error:</strong> ±0.5°C typical</p>
                        </div>
                        
                        <div className="bg-card p-3 rounded">
                          <h6 className="text-white font-medium mb-2">3-Wire</h6>
                          <p className="mb-2">Compensates for lead resistance, most common industrial method.</p>
                          <p><strong>Error:</strong> ±0.1°C typical</p>
                        </div>
                        
                        <div className="bg-card p-3 rounded">
                          <h6 className="text-white font-medium mb-2">4-Wire</h6>
                          <p className="mb-2">Highest accuracy by eliminating lead wire effects completely.</p>
                          <p><strong>Error:</strong> ±0.01°C possible</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Thermistor Characteristics</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">NTC Thermistors</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Negative Temperature Coefficient</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>High sensitivity (large resistance change)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Non-linear response</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Lower cost than RTDs</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Applications</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>HVAC temperature sensing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Automotive applications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Consumer electronics</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Medical devices</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Frequency Signals */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Frequency Signals
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Frequency signals encode measurement data as varying pulse rates or frequencies, providing excellent noise immunity and natural totalising capability for flow and speed measurements.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Frequency Signal Types</h4>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Pulse Output Sensors</h5>
                      <p className="text-xs sm:text-sm mb-2">Generate discrete pulses where frequency is proportional to the measured parameter.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Typical Ranges:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• 0-1000 Hz</li>
                            <li>• 0-10 kHz</li>
                            <li>• Pulse per unit measurement</li>
                            <li>• Square wave output</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Applications:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Turbine flow meters</li>
                            <li>• Positive displacement meters</li>
                            <li>• Speed sensors</li>
                            <li>• Encoder feedback</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Advantages of Frequency Signals</h5>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <ul className="space-y-2 text-xs sm:text-sm">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                              <span><strong>Excellent Noise Immunity:</strong> Digital nature resists interference</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                              <span><strong>Natural Totalising:</strong> Easy pulse counting for totals</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                              <span><strong>Long Distance:</strong> Can transmit over long cables</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-2 text-xs sm:text-sm">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                              <span><strong>High Resolution:</strong> Limited only by counting time</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                              <span><strong>Self-Powered:</strong> Many sensors are passive</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                              <span><strong>Simple Processing:</strong> Standard counter circuits</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Signal Processing Considerations</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Frequency-to-Analogue Conversion</h5>
                      <p className="text-xs sm:text-sm mb-2">Convert frequency signals to 4-20mA or 0-10V for standard control systems.</p>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• F/V converter circuits</li>
                        <li>• PLC high-speed counter modules</li>
                        <li>• Frequency transmitters</li>
                        <li>• Software-based conversion</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Totalising Applications</h5>
                      <p className="text-xs sm:text-sm mb-2">Direct pulse counting for accumulated measurements.</p>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• Flow totalisation (litres, m³)</li>
                        <li>• Energy measurement (kWh)</li>
                        <li>• Production counting</li>
                        <li>• Distance measurement</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Signal Comparison */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Signal Type Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Understanding the comparative strengths and weaknesses of each signal type enables optimal selection for specific applications and environments.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border border-gray-600 rounded-lg">
                  <thead>
                    <tr className="bg-card">
                      <th className="border border-gray-600 p-3 text-left text-xs sm:text-sm font-semibold text-yellow-400">Characteristic</th>
                      <th className="border border-gray-600 p-3 text-left text-xs sm:text-sm font-semibold text-white">Voltage</th>
                      <th className="border border-gray-600 p-3 text-left text-xs sm:text-sm font-semibold text-white">Current</th>
                      <th className="border border-gray-600 p-3 text-left text-xs sm:text-sm font-semibold text-white">Resistance</th>
                      <th className="border border-gray-600 p-3 text-left text-xs sm:text-sm font-semibold text-white">Frequency</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    <tr>
                      <td className="border border-gray-600 p-3 font-medium text-yellow-400">Noise Immunity</td>
                      <td className="border border-gray-600 p-3">Poor</td>
                      <td className="border border-gray-600 p-3 text-green-400">Excellent</td>
                      <td className="border border-gray-600 p-3">Moderate</td>
                      <td className="border border-gray-600 p-3 text-green-400">Excellent</td>
                    </tr>
                    <tr className="bg-card">
                      <td className="border border-gray-600 p-3 font-medium text-yellow-400">Distance Performance</td>
                      <td className="border border-gray-600 p-3">Limited (&lt;50m)</td>
                      <td className="border border-gray-600 p-3 text-green-400">Excellent (1000m+)</td>
                      <td className="border border-gray-600 p-3">Limited (&lt;100m)</td>
                      <td className="border border-gray-600 p-3 text-green-400">Excellent (1000m+)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 p-3 font-medium text-yellow-400">Resolution</td>
                      <td className="border border-gray-600 p-3 text-green-400">High</td>
                      <td className="border border-gray-600 p-3 text-green-400">High</td>
                      <td className="border border-gray-600 p-3 text-green-400">Very High</td>
                      <td className="border border-gray-600 p-3">Variable</td>
                    </tr>
                    <tr className="bg-card">
                      <td className="border border-gray-600 p-3 font-medium text-yellow-400">Implementation Cost</td>
                      <td className="border border-gray-600 p-3 text-green-400">Low</td>
                      <td className="border border-gray-600 p-3">Moderate</td>
                      <td className="border border-gray-600 p-3">Moderate</td>
                      <td className="border border-gray-600 p-3">Low-Moderate</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 p-3 font-medium text-yellow-400">Fault Detection</td>
                      <td className="border border-gray-600 p-3">Difficult</td>
                      <td className="border border-gray-600 p-3 text-green-400">Built-in (4mA)</td>
                      <td className="border border-gray-600 p-3">Moderate</td>
                      <td className="border border-gray-600 p-3">Good</td>
                    </tr>
                    <tr className="bg-card">
                      <td className="border border-gray-600 p-3 font-medium text-yellow-400">Processing Complexity</td>
                      <td className="border border-gray-600 p-3 text-green-400">Simple</td>
                      <td className="border border-gray-600 p-3">Simple</td>
                      <td className="border border-gray-600 p-3">Moderate</td>
                      <td className="border border-gray-600 p-3">Moderate</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Alert className="bg-green-600/10 border-green-600/30">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription className="text-gray-300 text-sm sm:text-base">
                  <strong>Selection Guide:</strong> Choose current signals for industrial environments and long distances, voltage for laboratory/local applications, resistance for highest accuracy temperature measurement, and frequency for totalising applications.
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
                <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Wind Turbine Monitoring System</h4>
                <p className="text-xs sm:text-sm leading-relaxed mb-4">
                  A wind turbine installation demonstrates the strategic use of different signal types to optimize performance monitoring and maintenance scheduling:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Rotational Speed Monitoring (Frequency Signal)</h5>
                      <p className="text-xs">Magnetic pickup sensor generates pulse output proportional to blade rotation (0-50 Hz range), enabling precise RPM calculation and vibration analysis.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Temperature Monitoring (4-20mA Current)</h5>
                      <p className="text-xs">Gearbox and generator temperature sensors use 4-20mA signals for reliable transmission to control room 500m away, immune to electrical noise from power systems.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Signal Integration</h5>
                      <p className="text-xs">SCADA system processes frequency signals for real-time speed display and integrates current signals for temperature trending and alarm management.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Predictive Maintenance</h5>
                      <p className="text-xs">Frequency analysis detects bearing wear patterns while temperature trends predict gearbox issues, enabling proactive maintenance scheduling.</p>
                    </div>
                  </div>
                </div>
                
                <Alert className="mt-4 bg-green-600/10 border-green-600/30">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-gray-300 text-xs sm:text-sm">
                    <strong>Results:</strong> The multi-signal approach achieved 98% uptime through early fault detection, with frequency signals providing precise speed control and current signals ensuring reliable temperature monitoring despite harsh electrical environment.
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
                Understanding the properties of voltage, current, resistance, and frequency signals is crucial to designing robust measurement systems. Each signal type has distinct advantages that make it suitable for specific applications and environments.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2 text-sm sm:text-base">Key Concepts</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-white">Voltage Signals:</strong> Simple implementation but limited by noise and distance constraints
                  </div>
                  <div>
                    <strong className="text-white">Current Signals:</strong> Excellent noise immunity and long-distance capability, industry standard
                  </div>
                  <div>
                    <strong className="text-white">Resistance Signals:</strong> Direct sensor output requiring careful measurement techniques
                  </div>
                  <div>
                    <strong className="text-white">Frequency Signals:</strong> Superior for totalising applications and digital noise immunity
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
            <Link to="../instrumentation-module-3" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400 touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Module 3
              </Button>
            </Link>
            <Link to="../instrumentation-module-3-section-2" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-yellow-400 text-black hover:bg-yellow-400/10 touch-manipulation active:scale-[0.98]">
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

export default InstrumentationModule3Section1;