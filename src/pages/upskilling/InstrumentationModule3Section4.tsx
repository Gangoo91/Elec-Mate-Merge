import { ArrowLeft, ArrowRight, Calculator, Target, AlertTriangle, CheckCircle, Lightbulb, TrendingUp, BarChart3, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const InstrumentationModule3Section4 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What does signal scaling mean?",
      options: [
        "Making signals larger in amplitude",
        "Converting one signal range to match another range requirement",
        "Filtering unwanted frequencies from signals",
        "Isolating signals electrically"
      ],
      correct: 1,
      explanation: "Signal scaling is the process of converting one signal range (e.g., 0-5V) to match another range requirement (e.g., 0-100°C) to ensure proper interpretation by receiving systems."
    },
    {
      id: 2,
      question: "What is quantisation error?",
      options: [
        "Error caused by filtering",
        "The difference between actual analog value and its digital representation",
        "Error in signal timing",
        "Noise introduced by amplification"
      ],
      correct: 1,
      explanation: "Quantisation error is the difference between the actual analog signal value and its nearest digital representation, caused by the finite resolution of analog-to-digital converters."
    },
    {
      id: 3,
      question: "Why would you convert a voltage signal to current?",
      options: [
        "To reduce power consumption",
        "To improve noise immunity and enable long-distance transmission",
        "To increase signal frequency",
        "To reduce system complexity"
      ],
      correct: 1,
      explanation: "Converting voltage to current (typically 4-20mA) improves noise immunity and enables reliable long-distance transmission, as current signals are less affected by cable resistance and electrical interference."
    },
    {
      id: 4,
      question: "How can scaling affect accuracy?",
      options: [
        "Scaling always improves accuracy",
        "Poor scaling can introduce errors and reduce resolution",
        "Scaling has no effect on accuracy",
        "Scaling only affects signal speed"
      ],
      correct: 1,
      explanation: "Poor scaling can introduce errors through mathematical rounding, inappropriate range matching, and resolution loss. Proper scaling maintains or enhances measurement accuracy."
    },
    {
      id: 5,
      question: "Give an example of a conversion used in instrumentation.",
      options: [
        "Converting temperature to humidity",
        "Converting RTD resistance to temperature display (°C)",
        "Converting pressure to flow",
        "Converting AC to battery power"
      ],
      correct: 1,
      explanation: "Converting RTD resistance changes to temperature values in °C is a common instrumentation conversion, where the sensor's resistance variation is mathematically converted to meaningful temperature units."
  }  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
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
              <Calculator className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Signal Scaling, Conversions, and Error Introduction
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-400 mt-1">
                  Ensuring accurate signal interpretation through proper scaling and conversion techniques
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
                Module 3.4
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
                <Target className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-sm sm:text-base leading-relaxed">
                To ensure accurate interpretation across different system components, signals must often be scaled or converted between different ranges and formats. This critical process transforms raw sensor outputs into meaningful engineering units while maintaining measurement integrity. However, each conversion step introduces potential sources of error that must be understood and managed.
              </p>
              <Alert className="bg-yellow-400/10 border-blue-600/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-gray-300 text-sm sm:text-base">
                  Poor scaling and conversion practices can distort measurements, leading to incorrect control actions and system failures. Understanding error sources is crucial for maintaining measurement accuracy.
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
                    <span>Learn how to scale signals to match system requirements effectively</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Understand analog-to-digital conversion processes and limitations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Identify sources of error during conversion and scaling operations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Balance resolution requirements with accuracy considerations</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Signal Scaling */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Signal Scaling Fundamentals
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Signal scaling ensures that different system components can properly interpret measurement data by converting between different ranges and units. This process maintains proportional relationships while adapting signals to match receiving system requirements.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Scaling Methods and Applications</h4>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Linear Scaling</h5>
                      <p className="text-xs sm:text-sm mb-3">Most common method using direct proportional relationships.</p>
                      <div className="bg-card p-3 rounded text-xs sm:text-sm">
                        <p className="font-mono mb-2"><strong>Formula: Output = (Input - Input_Min) × (Output_Range / Input_Range) + Output_Min</strong></p>
                        <p className="mb-2"><strong>Example:</strong> Converting 0-10V sensor to 0-100°C display</p>
                        <p>For 5V input: Temperature = (5-0) × (100/10) + 0 = 50°C</p>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Non-Linear Scaling</h5>
                      <p className="text-xs sm:text-sm mb-2">Required when sensor response is not linear with the measured parameter.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Common Applications:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Thermocouple linearisation</li>
                            <li>• Flow measurement (square root)</li>
                            <li>• Tank level (irregular shapes)</li>
                            <li>• pH measurement</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Implementation:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Lookup tables</li>
                            <li>• Polynomial equations</li>
                            <li>• Piecewise linear approximation</li>
                            <li>• Mathematical functions</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Engineering Unit Conversion</h5>
                      <p className="text-xs sm:text-sm mb-2">Converting between different measurement units for display and analysis.</p>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
                        <div className="bg-card p-2 rounded">
                          <h6 className="text-white font-medium mb-1">Temperature</h6>
                          <p>°C ↔ °F ↔ K ↔ °R</p>
                        </div>
                        <div className="bg-card p-2 rounded">
                          <h6 className="text-white font-medium mb-1">Pressure</h6>
                          <p>bar ↔ PSI ↔ kPa ↔ mmHg</p>
                        </div>
                        <div className="bg-card p-2 rounded">
                          <h6 className="text-white font-medium mb-1">Flow</h6>
                          <p>L/min ↔ GPM ↔ m³/h</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Scaling Implementation Considerations</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Resolution Requirements</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Match scaling to required measurement precision</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Consider ADC resolution limitations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Avoid unnecessary over-scaling</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Maintain meaningful decimal places</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Range Matching</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Ensure output range suits receiving system</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Prevent saturation and clipping</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Account for signal variations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Include safety margins</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Signal Conversions */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Signal Conversions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Signal conversion transforms signals between different formats (analog/digital) and types (voltage/current) to enable compatibility between system components while maintaining signal integrity.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Analog-to-Digital Conversion (ADC)</h4>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">ADC Types and Characteristics</h5>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <h6 className="text-white font-medium mb-2">Successive Approximation (SAR)</h6>
                          <ul className="space-y-1">
                            <li>• Medium speed (1-5 MSPS)</li>
                            <li>• Good accuracy (12-18 bits)</li>
                            <li>• Low power consumption</li>
                            <li>• Most common in instrumentation</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-white font-medium mb-2">Sigma-Delta (ΔΣ)</h6>
                          <ul className="space-y-1">
                            <li>• High resolution (16-24 bits)</li>
                            <li>• Lower sampling rates</li>
                            <li>• Excellent noise performance</li>
                            <li>• Ideal for precision measurements</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">ADC Specifications</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Resolution:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• 12-bit: 1 part in 4,096</li>
                            <li>• 16-bit: 1 part in 65,536</li>
                            <li>• 24-bit: 1 part in 16,777,216</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Key Parameters:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Sampling rate (SPS)</li>
                            <li>• Input range and gain</li>
                            <li>• Reference voltage accuracy</li>
                            <li>• Temperature coefficient</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Digital-to-Analog Conversion (DAC)</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Applications</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Control signal generation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Actuator drive signals</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Reference voltage generation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span>Calibration and testing</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Performance Factors</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-yellow-400 mt-1 flex-shrink-0" />
                          <span>Resolution vs settling time</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-yellow-400 mt-1 flex-shrink-0" />
                          <span>Output buffer drive capability</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-yellow-400 mt-1 flex-shrink-0" />
                          <span>Reference stability requirements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-yellow-400 mt-1 flex-shrink-0" />
                          <span>Temperature drift characteristics</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Signal Type Conversions</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Voltage-to-Current (V/I) Conversion</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Implementation:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Op-amp based V/I converter</li>
                            <li>• Precision resistor for current sensing</li>
                            <li>• Output compliance voltage consideration</li>
                            <li>• Loop power supply requirements</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Benefits:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Noise immunity improvement</li>
                            <li>• Long-distance transmission</li>
                            <li>• Standard 4-20mA compatibility</li>
                            <li>• Ground loop elimination</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Current-to-Voltage (I/V) Conversion</h5>
                      <p className="text-xs sm:text-sm mb-2">Simple precision resistor converts current to proportional voltage for ADC input.</p>
                      <div className="bg-card p-2 rounded text-xs">
                        <p><strong>Example:</strong> 4-20mA × 250Ω = 1-5V (compatible with 0-5V ADC input)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Sources */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Error Sources in Conversion and Scaling
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Every conversion and scaling operation introduces potential sources of error that can degrade measurement accuracy. Understanding these error sources enables proper system design and error minimisation strategies.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Quantisation and Resolution Errors</h4>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-red-500 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Quantisation Error</h5>
                      <p className="text-xs sm:text-sm mb-2">The inherent error in representing continuous analog signals with discrete digital values.</p>
                      <div className="bg-card p-3 rounded text-xs sm:text-sm">
                        <p className="mb-2"><strong>Maximum Error = ±0.5 LSB (Least Significant Bit)</strong></p>
                        <p className="mb-1">Example for 12-bit ADC with 10V range:</p>
                        <p>LSB = 10V / 4096 = 2.44mV</p>
                        <p>Maximum quantisation error = ±1.22mV</p>
                      </div>
                    </div>

                    <div className="border-l-4 border-red-500 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Resolution Limitations</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Impact Factors:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• ADC bit resolution</li>
                            <li>• Signal range utilisation</li>
                            <li>• Scaling factor selection</li>
                            <li>• Display resolution requirements</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Improvement Strategies:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Higher resolution converters</li>
                            <li>• Optimal range matching</li>
                            <li>• Signal amplification</li>
                            <li>• Oversampling techniques</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Systematic Errors</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Linearity Errors</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-red-500 mt-1 flex-shrink-0" />
                          <span><strong>Integral Linearity Error (INL):</strong> Deviation from ideal transfer function</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-red-500 mt-1 flex-shrink-0" />
                          <span><strong>Differential Linearity Error (DNL):</strong> Unequal step sizes between codes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-red-500 mt-1 flex-shrink-0" />
                          <span><strong>Gain Error:</strong> Incorrect scaling factor</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-red-500 mt-1 flex-shrink-0" />
                          <span><strong>Offset Error:</strong> Zero-point deviation</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Temperature Effects</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-orange-500 mt-1 flex-shrink-0" />
                          <span><strong>Reference Drift:</strong> Voltage reference temperature coefficient</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-orange-500 mt-1 flex-shrink-0" />
                          <span><strong>Component Drift:</strong> Resistor and capacitor variations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-orange-500 mt-1 flex-shrink-0" />
                          <span><strong>Amplifier Drift:</strong> Op-amp offset and gain changes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-orange-500 mt-1 flex-shrink-0" />
                          <span><strong>Timing Variations:</strong> Clock frequency changes</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Error Minimisation Techniques</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Calibration</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• Multi-point calibration</li>
                        <li>• Gain and offset correction</li>
                        <li>• Temperature compensation</li>
                        <li>• Periodic recalibration</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Component Selection</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• Precision references</li>
                        <li>• Temperature stable components</li>
                        <li>• High-resolution converters</li>
                        <li>• Low-drift amplifiers</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Design Practices</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• Ratiometric measurements</li>
                        <li>• Differential signaling</li>
                        <li>• Thermal management</li>
                        <li>• Shielding and grounding</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resolution vs Accuracy */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Resolution vs Accuracy Balance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Understanding the distinction between resolution and accuracy is crucial for proper system design. High resolution doesn't guarantee high accuracy, and excessive resolution can sometimes mask accuracy problems.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border border-gray-600 rounded-lg">
                  <thead>
                    <tr className="bg-card">
                      <th className="border border-gray-600 p-3 text-left text-xs sm:text-sm font-semibold text-yellow-400">Aspect</th>
                      <th className="border border-gray-600 p-3 text-left text-xs sm:text-sm font-semibold text-white">Resolution</th>
                      <th className="border border-gray-600 p-3 text-left text-xs sm:text-sm font-semibold text-white">Accuracy</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    <tr>
                      <td className="border border-gray-600 p-3 font-medium text-yellow-400">Definition</td>
                      <td className="border border-gray-600 p-3">Smallest measurable change</td>
                      <td className="border border-gray-600 p-3">Closeness to true value</td>
                    </tr>
                    <tr className="bg-card">
                      <td className="border border-gray-600 p-3 font-medium text-yellow-400">Limiting Factors</td>
                      <td className="border border-gray-600 p-3">ADC bits, display digits</td>
                      <td className="border border-gray-600 p-3">Calibration, component tolerances</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 p-3 font-medium text-yellow-400">Improvement Cost</td>
                      <td className="border border-gray-600 p-3">Moderate (higher bit ADCs)</td>
                      <td className="border border-gray-600 p-3">Higher (precision components)</td>
                    </tr>
                    <tr className="bg-card">
                      <td className="border border-gray-600 p-3 font-medium text-yellow-400">Practical Limit</td>
                      <td className="border border-gray-600 p-3">Noise floor determines useful resolution</td>
                      <td className="border border-gray-600 p-3">System errors limit achievable accuracy</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Alert className="bg-green-600/10 border-green-600/30">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription className="text-gray-300 text-sm sm:text-base">
                  <strong>Design Principle:</strong> Match resolution to accuracy requirements. Excessive resolution beyond accuracy capabilities wastes resources and can give false confidence in measurement quality.
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
                <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">PLC Pressure Control System</h4>
                <p className="text-xs sm:text-sm leading-relaxed mb-4">
                  A PLC system scales 0-10V sensor output to represent 0-200 bar pressure for accurate data logging and control, demonstrating the importance of proper scaling and error management:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Signal Scaling Implementation</h5>
                      <p className="text-xs">0-10V sensor output scaled to 0-200 bar: Pressure = (Voltage / 10) × 200. 5V input = 100 bar output.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Resolution Analysis</h5>
                      <p className="text-xs">12-bit ADC provides 4096 steps over 10V range = 2.44mV resolution, equivalent to 0.049 bar pressure resolution - adequate for ±1 bar control accuracy.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Error Management</h5>
                      <p className="text-xs">Two-point calibration at 0V (0 bar) and 10V (200 bar) corrects for gain and offset errors, achieving ±0.5% accuracy specification.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">System Integration</h5>
                      <p className="text-xs">Scaled data feeds both data logger (0.1 bar resolution) and control algorithm (proportional band = 10 bar) with appropriate formatting for each application.</p>
                    </div>
                  </div>
                </div>
                
                <Alert className="mt-4 bg-green-600/10 border-green-600/30">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-gray-300 text-xs sm:text-sm">
                    <strong>Results:</strong> Proper scaling and error management achieved stable process control with ±0.2 bar accuracy over 6-month calibration intervals, meeting both control and data logging requirements.
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
                Signal scaling and conversion are essential processes in aligning devices and minimising error, but poor implementation can distort measurements and compromise system performance. Understanding error sources and applying proper design techniques ensures reliable signal processing throughout measurement systems.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2 text-sm sm:text-base">Key Design Principles</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-white">Scaling:</strong> Match ranges appropriately while maintaining required resolution
                  </div>
                  <div>
                    <strong className="text-white">Conversion:</strong> Select converters based on accuracy and speed requirements
                  </div>
                  <div>
                    <strong className="text-white">Error Management:</strong> Identify and minimise all significant error sources
                  </div>
                  <div>
                    <strong className="text-white">Calibration:</strong> Implement regular calibration to maintain system accuracy
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
            <Link to="../instrumentation-module-3-section-3" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../instrumentation-module-3-section-5" className="w-full sm:w-auto">
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

export default InstrumentationModule3Section4;