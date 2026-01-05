import { ArrowLeft, ArrowRight, Filter, Shield, Volume2, CheckCircle, AlertTriangle, Lightbulb, Settings, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const InstrumentationModule3Section3 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "Why is signal isolation used?",
      options: [
        "To increase signal amplitude",
        "To protect equipment and improve signal integrity by breaking ground loops",
        "To filter out high-frequency noise",
        "To convert analog signals to digital"
      ],
      correct: 1,
      explanation: "Signal isolation protects equipment from dangerous voltages, eliminates ground loops, and improves signal integrity by providing electrical separation between input and output circuits."
    },
    {
      id: 2,
      question: "What does a low-pass filter do?",
      options: [
        "Blocks all frequencies below the cutoff point",
        "Allows all frequencies to pass through unchanged",
        "Allows frequencies below the cutoff point to pass while attenuating higher frequencies",
        "Amplifies low-frequency signals only"
      ],
      correct: 2,
      explanation: "A low-pass filter allows frequencies below the cutoff frequency to pass through while attenuating (reducing) frequencies above the cutoff point, effectively removing high-frequency noise."
    },
    {
      id: 3,
      question: "When would you need amplification?",
      options: [
        "Only when signals are too strong",
        "When dealing with weak signals from sensors like thermocouples or strain gauges",
        "To reduce signal noise",
        "To convert current signals to voltage"
      ],
      correct: 1,
      explanation: "Amplification is needed when dealing with weak signals from sensors like thermocouples (millivolts) or strain gauges to boost the signal level for better resolution and noise immunity."
    },
    {
      id: 4,
      question: "What are the benefits of digital conditioning?",
      options: [
        "Lower cost than analog methods",
        "Faster response times",
        "Better accuracy, flexibility, and software-based adjustments",
        "Simpler circuit design"
      ],
      correct: 2,
      explanation: "Digital signal conditioning offers better accuracy through precise algorithms, flexibility to modify parameters via software, and immunity to component drift and temperature effects."
    },
    {
      id: 5,
      question: "Name one risk of unfiltered signals in a control system.",
      options: [
        "Reduced power consumption",
        "False triggering and incorrect control actions due to noise",
        "Improved signal quality",
        "Better system response time"
      ],
      correct: 1,
      explanation: "Unfiltered signals can contain noise that causes false triggering of alarms, incorrect control actions, and unstable system behaviour, potentially leading to equipment damage or safety issues."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:pt-8 sm:pb-12">
        <Link to="../instrumentation-module-3">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-6 sm:mb-8 px-3 py-2 rounded-md text-sm sm:text-base"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
              <Filter className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Signal Conditioning – Filtering, Isolation, Amplification
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-400 mt-1">
                  Preparing raw signals for reliable measurement and control systems
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
                Module 3.3
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs sm:text-sm">
                50 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-sm sm:text-base leading-relaxed">
                Raw signals from sensors rarely arrive in perfect condition for immediate use. Signal conditioning is the essential process of preparing these signals for reliable measurement and control applications. Through filtering, isolation, and amplification, we transform imperfect sensor outputs into clean, usable signals that ensure accuracy, safety, and system reliability.
              </p>
              <Alert className="bg-yellow-400/10 border-blue-600/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-gray-300 text-sm sm:text-base">
                  Proper signal conditioning is often the difference between a reliable measurement system and one prone to errors, false alarms, and equipment damage.
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
                    <span>Understand why signal conditioning is required in measurement systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Identify common conditioning methods and their applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Learn the impact of each technique on signal quality and system performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Compare analog and digital signal conditioning approaches</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Signal Filtering */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Filter className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Signal Filtering
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Filtering removes unwanted frequency components from signals, primarily noise that can interfere with accurate measurements. Different filter types target specific frequency ranges to preserve the desired signal while eliminating interference.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Filter Types and Applications</h4>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Low-Pass Filters</h5>
                      <p className="text-xs sm:text-sm mb-2">Allow frequencies below the cutoff frequency to pass while attenuating higher frequencies.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Applications:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Anti-aliasing before ADC</li>
                            <li>• Removing high-frequency noise</li>
                            <li>• Smoothing control signals</li>
                            <li>• EMI reduction</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Typical Cutoff Frequencies:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Temperature: 0.1-1 Hz</li>
                            <li>• Pressure: 1-10 Hz</li>
                            <li>• Flow: 0.5-5 Hz</li>
                            <li>• Level: 0.1-1 Hz</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">High-Pass Filters</h5>
                      <p className="text-xs sm:text-sm mb-2">Allow frequencies above the cutoff frequency while blocking lower frequencies.</p>
                      <div className="text-xs sm:text-sm">
                        <strong className="text-white">Applications:</strong> DC offset removal, vibration monitoring, AC coupling, removing low-frequency drift
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Band-Pass Filters</h5>
                      <p className="text-xs sm:text-sm mb-2">Allow only a specific frequency range to pass through.</p>
                      <div className="text-xs sm:text-sm">
                        <strong className="text-white">Applications:</strong> Isolating specific signal frequencies, communication systems, vibration analysis, harmonic analysis
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Filter Implementation Methods</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Analog Filters</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>RC Filters:</strong> Simple, low-cost passive filters</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Active Filters:</strong> Op-amp based with gain control</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Sallen-Key:</strong> Popular active filter topology</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Butterworth:</strong> Flat passband response</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Digital Filters</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>FIR Filters:</strong> Finite impulse response, stable</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>IIR Filters:</strong> Infinite impulse response, efficient</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Moving Average:</strong> Simple noise reduction</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Kalman Filters:</strong> Advanced noise reduction</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Signal Isolation */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Signal Isolation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Signal isolation provides electrical separation between input and output circuits, protecting equipment and personnel while improving signal integrity by eliminating ground loops and common-mode interference.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Isolation Methods</h4>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Optical Isolation (Optocouplers)</h5>
                      <p className="text-xs sm:text-sm mb-2">Uses light to transfer signals across an isolation barrier.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Advantages:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Complete electrical isolation</li>
                            <li>• Fast response time</li>
                            <li>• High voltage isolation (&gt;1kV)</li>
                            <li>• Immune to electromagnetic interference</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Applications:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Digital signal isolation</li>
                            <li>• Gate driver circuits</li>
                            <li>• High-voltage applications</li>
                            <li>• Safety systems</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Transformer Isolation</h5>
                      <p className="text-xs sm:text-sm mb-2">Magnetic coupling provides isolation for analog signals.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Characteristics:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• AC signal coupling only</li>
                            <li>• High isolation voltage</li>
                            <li>• Good linearity</li>
                            <li>• Wide bandwidth possible</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Applications:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Audio signals</li>
                            <li>• Communication systems</li>
                            <li>• AC measurement circuits</li>
                            <li>• Power supply isolation</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Capacitive Isolation</h5>
                      <p className="text-xs sm:text-sm mb-2">Silicon-based isolation using capacitive coupling.</p>
                      <div className="text-xs sm:text-sm">
                        <strong className="text-white">Benefits:</strong> Small size, integrated with other functions, precise timing, digital signal compatibility
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Isolation Applications</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Safety Protection</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• High-voltage protection</li>
                        <li>• Personnel safety</li>
                        <li>• Equipment protection</li>
                        <li>• Fault containment</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Signal Integrity</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• Ground loop elimination</li>
                        <li>• Common-mode rejection</li>
                        <li>• Noise reduction</li>
                        <li>• Interference immunity</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">System Integration</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• Different ground potentials</li>
                        <li>• Level shifting</li>
                        <li>• Interface compatibility</li>
                        <li>• System modularity</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Signal Amplification */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Volume2 className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Signal Amplification
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Amplification increases signal levels to improve measurement resolution, overcome transmission losses, and ensure adequate signal-to-noise ratios for reliable system operation.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Amplifier Types and Characteristics</h4>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Instrumentation Amplifiers</h5>
                      <p className="text-xs sm:text-sm mb-2">Specialized amplifiers designed for precision measurement applications.</p>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Key Features:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• High input impedance (&gt;1GΩ)</li>
                            <li>• Low offset and drift</li>
                            <li>• High common-mode rejection</li>
                            <li>• Precise gain setting</li>
                            <li>• Low noise performance</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Applications:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Thermocouple amplification</li>
                            <li>• Strain gauge conditioning</li>
                            <li>• Bridge circuit measurements</li>
                            <li>• Medical instrumentation</li>
                            <li>• Data acquisition systems</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Operational Amplifiers</h5>
                      <p className="text-xs sm:text-sm mb-2">Versatile amplifiers used in various signal conditioning configurations.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Configurations:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Non-inverting amplifier</li>
                            <li>• Inverting amplifier</li>
                            <li>• Differential amplifier</li>
                            <li>• Summing amplifier</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Considerations:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Bandwidth limitations</li>
                            <li>• Input bias current</li>
                            <li>• Offset voltage</li>
                            <li>• Slew rate requirements</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Programmable Gain Amplifiers (PGA)</h5>
                      <p className="text-xs sm:text-sm mb-2">Digitally controlled amplifiers allowing software-selectable gain.</p>
                      <div className="text-xs sm:text-sm">
                        <strong className="text-white">Benefits:</strong> Flexible gain adjustment, auto-ranging capability, improved dynamic range, digital control interface
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Amplification Considerations</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Design Factors</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Gain Requirements:</strong> Balance resolution vs noise</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Bandwidth:</strong> Maintain signal fidelity</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Input Impedance:</strong> Avoid loading effects</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Power Supply:</strong> Adequate voltage ranges</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Common Challenges</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-red-500 mt-1 flex-shrink-0" />
                          <span><strong>Noise Amplification:</strong> Amplifies noise with signal</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-red-500 mt-1 flex-shrink-0" />
                          <span><strong>Offset Drift:</strong> Temperature-dependent errors</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-red-500 mt-1 flex-shrink-0" />
                          <span><strong>Saturation:</strong> Limited output swing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-red-500 mt-1 flex-shrink-0" />
                          <span><strong>Stability:</strong> Oscillation prevention</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analog vs Digital Conditioning */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Analog vs Digital Signal Conditioning
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                The choice between analog and digital signal conditioning depends on performance requirements, cost constraints, and system architecture considerations.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border border-gray-600 rounded-lg">
                  <thead>
                    <tr className="bg-card">
                      <th className="border border-gray-600 p-3 text-left text-xs sm:text-sm font-semibold text-yellow-400">Aspect</th>
                      <th className="border border-gray-600 p-3 text-left text-xs sm:text-sm font-semibold text-white">Analog Conditioning</th>
                      <th className="border border-gray-600 p-3 text-left text-xs sm:text-sm font-semibold text-white">Digital Conditioning</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    <tr>
                      <td className="border border-gray-600 p-3 font-medium text-yellow-400">Processing Speed</td>
                      <td className="border border-gray-600 p-3 text-green-400">Real-time, no delay</td>
                      <td className="border border-gray-600 p-3">Limited by sampling rate</td>
                    </tr>
                    <tr className="bg-card">
                      <td className="border border-gray-600 p-3 font-medium text-yellow-400">Flexibility</td>
                      <td className="border border-gray-600 p-3">Fixed hardware design</td>
                      <td className="border border-gray-600 p-3 text-green-400">Software programmable</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 p-3 font-medium text-yellow-400">Accuracy</td>
                      <td className="border border-gray-600 p-3">Component dependent</td>
                      <td className="border border-gray-600 p-3 text-green-400">High precision possible</td>
                    </tr>
                    <tr className="bg-card">
                      <td className="border border-gray-600 p-3 font-medium text-yellow-400">Temperature Drift</td>
                      <td className="border border-gray-600 p-3">Significant drift possible</td>
                      <td className="border border-gray-600 p-3 text-green-400">Minimal drift</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 p-3 font-medium text-yellow-400">Power Consumption</td>
                      <td className="border border-gray-600 p-3 text-green-400">Generally lower</td>
                      <td className="border border-gray-600 p-3">Higher due to ADC/DSP</td>
                    </tr>
                    <tr className="bg-card">
                      <td className="border border-gray-600 p-3 font-medium text-yellow-400">Cost</td>
                      <td className="border border-gray-600 p-3 text-green-400">Lower for simple circuits</td>
                      <td className="border border-gray-600 p-3">Higher initial cost</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Alert className="bg-green-600/10 border-green-600/30">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription className="text-gray-300 text-sm sm:text-base">
                  <strong>Best Practice:</strong> Use analog conditioning for time-critical applications and digital conditioning where flexibility and precision are paramount. Hybrid approaches often provide optimal solutions.
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
                <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Factory Temperature Control System</h4>
                <p className="text-xs sm:text-sm leading-relaxed mb-4">
                  A manufacturing facility with heavy motor noise requires precise temperature monitoring for quality control. RTD sensors must provide accurate readings despite electromagnetic interference from nearby equipment:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Signal Isolation Implementation</h5>
                      <p className="text-xs">Isolated RTD transmitters break ground loops between sensor circuits and control system, eliminating 50Hz noise pickup from motor drives.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Low-Pass Filtering</h5>
                      <p className="text-xs">0.5Hz cutoff filters remove high-frequency EMI while preserving temperature response. Analog filters provide immediate noise reduction before ADC conversion.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Signal Amplification</h5>
                      <p className="text-xs">Instrumentation amplifiers boost millivolt RTD signals to 4-20mA for long-distance transmission to control room 200m away.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Digital Processing</h5>
                      <p className="text-xs">PLC applies additional digital filtering and linearisation to achieve ±0.1°C accuracy for critical process control.</p>
                    </div>
                  </div>
                </div>
                
                <Alert className="mt-4 bg-green-600/10 border-green-600/30">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-gray-300 text-xs sm:text-sm">
                    <strong>Results:</strong> Multi-stage conditioning reduced temperature measurement noise by 95%, eliminated false alarms, and improved process control stability, resulting in 2% quality improvement and reduced waste.
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
                Signal conditioning maximises measurement accuracy and system stability by preparing raw signals for processing. Through filtering, isolation, and amplification, we transform imperfect sensor outputs into reliable, usable signals that form the foundation of effective measurement and control systems.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2 text-sm sm:text-base">Key Conditioning Techniques</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-white">Filtering:</strong> Removes unwanted frequency components and noise interference
                  </div>
                  <div>
                    <strong className="text-white">Isolation:</strong> Provides safety protection and eliminates ground loops
                  </div>
                  <div>
                    <strong className="text-white">Amplification:</strong> Boosts weak signals for better resolution and transmission
                  </div>
                  <div>
                    <strong className="text-white">Integration:</strong> Combines multiple techniques for optimal performance
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
            <Link to="../instrumentation-module-3-section-2" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../instrumentation-module-3-section-4" className="w-full sm:w-auto">
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

export default InstrumentationModule3Section3;