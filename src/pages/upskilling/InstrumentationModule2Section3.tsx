import { ArrowLeft, ArrowRight, Gauge, AlertTriangle, CheckCircle, Zap, Lightbulb, Droplets, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const InstrumentationModule2Section3 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What's the difference between gauge and absolute pressure?",
      options: [
        "Gauge pressure includes atmospheric pressure, absolute pressure doesn't",
        "Absolute pressure includes atmospheric pressure, gauge pressure doesn't", 
        "There is no difference between them",
        "Gauge pressure is always higher than absolute pressure"
      ],
      correct: 1,
      explanation: "Absolute pressure is measured relative to a perfect vacuum and includes atmospheric pressure. Gauge pressure is measured relative to atmospheric pressure, so it doesn't include atmospheric pressure in its reading."
    },
    {
      id: 2,
      question: "Name one type of flow sensor and its working principle.",
      options: [
        "Electromagnetic flow sensor - uses magnetic fields to measure conductive fluid velocity",
        "Temperature sensor - measures heat transfer in flowing fluids",
        "Pressure sensor - measures static pressure in pipes",
        "Level sensor - measures liquid height"
      ],
      correct: 0,
      explanation: "Electromagnetic flow sensors work by applying a magnetic field across a pipe containing conductive fluid. As the fluid moves through the magnetic field, it generates a voltage proportional to its velocity."
    },
    {
      id: 3,
      question: "What is a common application of a pressure sensor?",
      options: [
        "Measuring electrical current flow",
        "Monitoring hydraulic system pressure for safety protection",
        "Detecting light intensity changes",
        "Measuring temperature variations"
      ],
      correct: 1,
      explanation: "Pressure sensors are commonly used in hydraulic systems to monitor operating pressure and provide safety protection by triggering alarms or shutdowns when pressure exceeds safe limits."
    },
    {
      id: 4,
      question: "Why is material compatibility important in pressure sensors?",
      options: [
        "To ensure proper electrical conductivity",
        "To prevent corrosion and ensure accurate readings over time",
        "To improve the sensor's response time",
        "To reduce manufacturing costs"
      ],
      correct: 1,
      explanation: "Material compatibility is crucial because incompatible materials can corrode when exposed to certain fluids or gases, leading to sensor failure, inaccurate readings, and potential safety hazards."
    },
    {
      id: 5,
      question: "What does a differential pressure sensor measure?",
      options: [
        "The absolute pressure at a single point",
        "The pressure relative to atmospheric pressure",
        "The difference in pressure between two points",
        "The rate of pressure change over time"
      ],
      correct: 2,
      explanation: "A differential pressure sensor measures the difference in pressure between two points. This is useful for applications like flow measurement across an orifice plate or filter monitoring."
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
              <Droplets className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Pressure and Flow Sensors
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-400 mt-1">
                  Understanding pressure and flow measurement for fluid and gas systems
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
                Module 2.3
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
                <Droplets className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-sm sm:text-base leading-relaxed">
                Pressure and flow are critical parameters in systems involving fluids or gases. From water distribution networks to industrial process control, accurate measurement of these parameters ensures system safety, efficiency, and optimal performance. This section covers the sensors used to monitor pressure and flow, their operating principles, and practical considerations for selection and implementation.
              </p>
              <Alert className="bg-yellow-400/10 border-blue-600/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-gray-300 text-sm sm:text-base">
                  Understanding pressure and flow measurement is essential for system safety. Incorrect measurements can lead to equipment damage, process inefficiency, or dangerous operating conditions.
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
                    <span>Understand the principles of pressure and flow measurement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Identify common pressure and flow sensor types and their applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Learn how sensor selection affects system design and performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Apply selection criteria for pressure and flow measurement applications</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Pressure Sensors */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Gauge className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Pressure Sensors
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Pressure sensors convert mechanical pressure into electrical signals. They are fundamental to many industrial processes and safety systems, providing critical feedback for control and monitoring applications.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Common Pressure Sensor Types</h4>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Strain Gauge Pressure Sensors</h5>
                      <p className="text-xs sm:text-sm mb-2">Use a flexible diaphragm with strain gauges that change resistance when the diaphragm deflects under pressure.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Advantages:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• High accuracy and stability</li>
                            <li>• Wide pressure ranges</li>
                            <li>• Good temperature compensation</li>
                            <li>• Cost-effective</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Applications:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Hydraulic systems</li>
                            <li>• Process control</li>
                            <li>• Medical equipment</li>
                            <li>• Automotive systems</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Piezoelectric Pressure Sensors</h5>
                      <p className="text-xs sm:text-sm mb-2">Generate electrical charge when subjected to mechanical stress, ideal for dynamic pressure measurements.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Advantages:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Excellent dynamic response</li>
                            <li>• High-frequency capability</li>
                            <li>• Self-generating (no power needed)</li>
                            <li>• Rugged construction</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Applications:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Combustion monitoring</li>
                            <li>• Shock and vibration</li>
                            <li>• Pressure pulsation measurement</li>
                            <li>• Engine cylinder pressure</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Capacitive Pressure Sensors</h5>
                      <p className="text-xs sm:text-sm mb-2">Use changes in capacitance as a diaphragm moves between two plates under pressure.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Advantages:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Very high accuracy</li>
                            <li>• Low temperature sensitivity</li>
                            <li>• Low power consumption</li>
                            <li>• Good long-term stability</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Applications:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Weather monitoring</li>
                            <li>• Laboratory instruments</li>
                            <li>• Clean room monitoring</li>
                            <li>• Precision process control</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Pressure Reference Types</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Absolute Pressure</h5>
                      <p className="text-xs sm:text-sm mb-2">Measured relative to a perfect vacuum (zero pressure reference).</p>
                      <p className="text-xs"><strong>Example:</strong> 101.3 kPa absolute = atmospheric pressure at sea level</p>
                    </div>
                    
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Gauge Pressure</h5>
                      <p className="text-xs sm:text-sm mb-2">Measured relative to atmospheric pressure.</p>
                      <p className="text-xs"><strong>Example:</strong> 0 kPa gauge = atmospheric pressure</p>
                    </div>
                    
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Differential Pressure</h5>
                      <p className="text-xs sm:text-sm mb-2">Measured as the difference between two pressure points.</p>
                      <p className="text-xs"><strong>Example:</strong> Filter monitoring, flow measurement</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Flow Sensors */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Flow Sensors
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Flow sensors measure the movement of liquids or gases through pipes or ducts. They provide essential data for process control, billing, environmental monitoring, and safety systems.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Flow Sensor Technologies</h4>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Turbine Flow Sensors</h5>
                      <p className="text-xs sm:text-sm mb-2">A rotor with helical blades spins at a rate proportional to flow velocity.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Advantages:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• High accuracy</li>
                            <li>• Wide turndown ratio</li>
                            <li>• Good repeatability</li>
                            <li>• Digital output available</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Considerations:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Moving parts require maintenance</li>
                            <li>• Sensitive to fluid cleanliness</li>
                            <li>• Pressure drop across sensor</li>
                            <li>• Viscosity affects accuracy</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Electromagnetic Flow Sensors</h5>
                      <p className="text-xs sm:text-sm mb-2">Measure conductive fluid velocity using Faraday's law of electromagnetic induction.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Advantages:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• No moving parts</li>
                            <li>• No pressure drop</li>
                            <li>• Excellent accuracy</li>
                            <li>• Bidirectional measurement</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Limitations:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Only conductive fluids</li>
                            <li>• Requires full pipe</li>
                            <li>• Higher initial cost</li>
                            <li>• Power consumption</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Ultrasonic Flow Sensors</h5>
                      <p className="text-xs sm:text-sm mb-2">Use ultrasonic waves to measure flow velocity through transit time or Doppler shift methods.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Advantages:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Non-intrusive options available</li>
                            <li>• No pressure drop</li>
                            <li>• Works with various fluids</li>
                            <li>• Low maintenance</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Applications:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Water distribution</li>
                            <li>• Wastewater treatment</li>
                            <li>• Oil and gas pipelines</li>
                            <li>• HVAC systems</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Flow Measurement Types</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-card p-4 rounded">
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Volumetric Flow</h5>
                      <p className="text-xs sm:text-sm mb-3">Measures the volume of fluid passing through a cross-section per unit time.</p>
                      <div className="space-y-2 text-xs sm:text-sm">
                        <p><strong>Units:</strong> m³/h, L/min, gal/min</p>
                        <p><strong>Applications:</strong> Water billing, chemical dosing, HVAC systems</p>
                        <p><strong>Note:</strong> Volume changes with temperature and pressure</p>
                      </div>
                    </div>
                    
                    <div className="bg-card p-4 rounded">
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Mass Flow</h5>
                      <p className="text-xs sm:text-sm mb-3">Measures the mass of fluid passing through a cross-section per unit time.</p>
                      <div className="space-y-2 text-xs sm:text-sm">
                        <p><strong>Units:</strong> kg/h, kg/s, lb/min</p>
                        <p><strong>Applications:</strong> Custody transfer, batch processes, gas measurement</p>
                        <p><strong>Advantage:</strong> Independent of temperature and pressure changes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selection Considerations */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Selection Considerations
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Proper sensor selection requires careful consideration of multiple factors to ensure optimal performance, reliability, and cost-effectiveness throughout the sensor's operational life.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3 text-sm sm:text-base">Operating Range</h4>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span><strong>Pressure Range:</strong> Ensure sensor covers expected operating and peak pressures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span><strong>Flow Range:</strong> Consider minimum and maximum flow rates with adequate turndown</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span><strong>Temperature Range:</strong> Account for ambient and process temperatures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span><strong>Accuracy Requirements:</strong> Match sensor accuracy to application needs</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3 text-sm sm:text-base">Material Compatibility</h4>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span><strong>Wetted Materials:</strong> Must be compatible with process fluid</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span><strong>Corrosion Resistance:</strong> Consider chemical compatibility and pH levels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span><strong>Seal Materials:</strong> O-rings and gaskets must withstand process conditions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span><strong>Food Grade:</strong> FDA/EHEDG approval for food and pharmaceutical applications</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3 text-sm sm:text-base">Response Time</h4>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span><strong>Dynamic Response:</strong> Must be fast enough for control loop requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span><strong>Settling Time:</strong> Time to reach stable reading after disturbance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span><strong>Frequency Response:</strong> Ability to track rapid pressure or flow changes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                      <span><strong>Damping:</strong> May be required to smooth noisy signals</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Alert className="bg-yellow-600/10 border-yellow-600/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-gray-300 text-sm sm:text-base">
                  <strong>Selection Tip:</strong> Always consider the total cost of ownership including installation, calibration, maintenance, and replacement costs, not just the initial purchase price.
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
                <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Brewery Process Control System</h4>
                <p className="text-xs sm:text-sm leading-relaxed mb-4">
                  A craft brewery implements comprehensive pressure and flow monitoring to optimise water usage, monitor fermentation, and ensure product quality. The system demonstrates practical applications of various sensor technologies:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Water Flow Monitoring</h5>
                      <p className="text-xs">Electromagnetic flow sensors monitor incoming water supply for brewing, providing accurate measurement for recipe consistency and cost control.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Fermentation Tank Pressure</h5>
                      <p className="text-xs">Gauge pressure sensors monitor CO₂ buildup during fermentation, ensuring safe operating conditions and optimal fermentation progress.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Transfer Line Monitoring</h5>
                      <p className="text-xs">Differential pressure sensors across filters monitor clogging, triggering maintenance alerts before flow restriction affects production.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Safety Integration</h5>
                      <p className="text-xs">All sensors integrate with the control system, providing alarms for abnormal conditions and enabling automated safety shutdowns.</p>
                    </div>
                  </div>
                </div>
                
                <Alert className="mt-4 bg-green-600/10 border-green-600/30">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-gray-300 text-xs sm:text-sm">
                    <strong>Results:</strong> The brewery achieved 15% water savings, reduced batch-to-batch variation by 8%, and eliminated production stoppages due to unexpected filter blockages.
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
                Accurate pressure and flow sensing ensures system safety and efficiency in fluid-dependent processes. Understanding the different sensor technologies, measurement types, and selection criteria enables optimal sensor choice for specific applications.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2 text-sm sm:text-base">Key Concepts</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-white">Pressure Types:</strong> Absolute, gauge, and differential pressure measurement serve different applications
                  </div>
                  <div>
                    <strong className="text-white">Flow Technologies:</strong> Turbine, electromagnetic, and ultrasonic sensors each have specific advantages
                  </div>
                  <div>
                    <strong className="text-white">Selection Factors:</strong> Range, material compatibility, and response time are critical considerations
                  </div>
                  <div>
                    <strong className="text-white">System Integration:</strong> Proper sensor selection supports overall system safety and efficiency
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
            <Link to="../instrumentation-module-2-section-2" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../instrumentation-module-2-section-4" className="w-full sm:w-auto">
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

export default InstrumentationModule2Section3;