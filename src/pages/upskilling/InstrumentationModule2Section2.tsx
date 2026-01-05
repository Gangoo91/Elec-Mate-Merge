import { ArrowLeft, ArrowRight, Thermometer, AlertTriangle, CheckCircle, Zap, TrendingUp, Lightbulb, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const InstrumentationModule2Section2 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What principle does an RTD work on?",
      options: [
        "Voltage generation from dissimilar metals",
        "Resistance change with temperature",
        "Capacitance variation with heat",
        "Magnetic field strength changes"
      ],
      correct: 1,
      explanation: "RTDs (Resistance Temperature Detectors) work on the principle that the electrical resistance of certain metals increases predictably with temperature."
    },
    {
      id: 2,
      question: "Which sensor is best for high-temperature environments?",
      options: [
        "Thermistor",
        "RTD",
        "Thermocouple",
        "Infrared sensor"
      ],
      correct: 2,
      explanation: "Thermocouples can withstand the highest temperatures (up to 2000°C or more) and are most suitable for harsh, high-temperature industrial environments."
    },
    {
      id: 3,
      question: "What's the main advantage of a thermistor?",
      options: [
        "Wide temperature range",
        "High sensitivity and precision in narrow temperature ranges",
        "Rugged construction",
        "Self-powered operation"
      ],
      correct: 1,
      explanation: "Thermistors offer the highest sensitivity and precision for temperature measurement, but only within their specific, relatively narrow temperature range."
    },
    {
      id: 4,
      question: "Why might you avoid using an RTD in harsh environments?",
      options: [
        "Too expensive",
        "Fragile construction and susceptibility to vibration and shock",
        "Requires external power",
        "Poor accuracy"
      ],
      correct: 1,
      explanation: "RTDs have delicate wire elements that can be damaged by vibration, shock, and mechanical stress, making them less suitable for harsh industrial environments."
    },
    {
      id: 5,
      question: "Which sensor offers the fastest response time?",
      options: [
        "RTD",
        "Thermistor",
        "Thermocouple",
        "Bimetallic strip"
      ],
      correct: 2,
      explanation: "Thermocouples have the fastest response time due to their small thermal mass and direct junction construction, making them ideal for rapid temperature changes."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
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
              <Thermometer className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Temperature Sensors
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-400 mt-1">
                  Thermocouples, RTDs, and Thermistors - Principles and Applications
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
                Module 2.2
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
                <Thermometer className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-sm sm:text-base leading-relaxed">
                Temperature is one of the most frequently measured variables in industrial processes, HVAC systems, and scientific applications. The choice of temperature sensor significantly impacts measurement accuracy, system reliability, and overall performance. This section explores the three primary electrical temperature sensors and their characteristics.
              </p>
              <Alert className="bg-yellow-400/10 border-blue-600/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-gray-300 text-sm sm:text-base">
                  Each temperature sensor type has distinct advantages and limitations. Proper selection depends on temperature range, accuracy requirements, environmental conditions, and cost considerations.
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
                    <span>Identify the differences between thermocouples, RTDs, and thermistors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Understand how temperature affects electrical properties in each sensor type</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Know where each sensor type is best applied</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Apply selection criteria based on environment, accuracy, and budget</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Thermocouples */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Thermocouples: Voltage Generation from Dissimilar Metals
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Thermocouples operate on the <strong>thermoelectric effect</strong> (Seebeck effect), where a voltage is generated when two dissimilar metals are joined at one end and exposed to a temperature difference. This simple yet robust principle makes thermocouples the most widely used temperature sensors in harsh industrial environments.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3 text-base sm:text-lg">Operating Principle</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Seebeck Effect:</h5>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• Two dissimilar metal wires joined at measuring junction</li>
                        <li>• Temperature difference creates electron flow</li>
                        <li>• Voltage generated proportional to temperature</li>
                        <li>• Cold junction compensation required</li>
                        <li>• Self-powered (no external excitation needed)</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Construction:</h5>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• Simple junction of two metal wires</li>
                        <li>• Various junction types (grounded, ungrounded, exposed)</li>
                        <li>• Protective sheaths for harsh environments</li>
                        <li>• Mineral insulation for electrical isolation</li>
                        <li>• Extension/compensation cables for long runs</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3 text-base sm:text-lg">Common Thermocouple Types</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-1 text-sm">Type K (Chromel-Alumel)</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Range: -200°C to +1260°C</li>
                        <li>• Most popular general purpose</li>
                        <li>• Good oxidation resistance</li>
                        <li>• ±2.2°C or ±0.75% accuracy</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-1 text-sm">Type J (Iron-Constantan)</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Range: -210°C to +760°C</li>
                        <li>• Higher sensitivity than K</li>
                        <li>• Limited to reducing atmospheres</li>
                        <li>• ±2.2°C or ±0.75% accuracy</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-1 text-sm">Type T (Copper-Constantan)</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Range: -250°C to +400°C</li>
                        <li>• Excellent for low temperatures</li>
                        <li>• Good in moist conditions</li>
                        <li>• ±1°C or ±0.75% accuracy</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2 text-sm sm:text-base">Advantages</h5>
                    <ul className="text-xs sm:text-sm space-y-1">
                      <li>• Wide temperature range capability</li>
                      <li>• Rugged and robust construction</li>
                      <li>• Fast response time (low thermal mass)</li>
                      <li>• Self-powered operation</li>
                      <li>• Relatively inexpensive</li>
                      <li>• Suitable for harsh environments</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2 text-sm sm:text-base">Limitations</h5>
                    <ul className="text-xs sm:text-sm space-y-1">
                      <li>• Low voltage output (mV range)</li>
                      <li>• Requires cold junction compensation</li>
                      <li>• Non-linear temperature relationship</li>
                      <li>• Susceptible to electrical noise</li>
                      <li>• Accuracy limited by reference junction</li>
                      <li>• Aging and drift over time</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* RTDs */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                RTDs: Precision Resistance Temperature Detectors
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Resistance Temperature Detectors (RTDs) utilize the predictable change in electrical resistance of pure metals with temperature. Platinum RTDs are the most common due to their excellent stability, linearity, and wide temperature range, making them the standard for precision temperature measurement.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3 text-base sm:text-lg">Operating Principle</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Resistance-Temperature Relationship:</h5>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• Resistance increases linearly with temperature</li>
                        <li>• Pure metals exhibit predictable coefficient</li>
                        <li>• Temperature Coefficient of Resistance (TCR)</li>
                        <li>• Platinum: ~0.385% per °C</li>
                        <li>• Requires measurement current (excitation)</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Common RTD Types:</h5>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• <strong>Pt100:</strong> 100Ω at 0°C (most common)</li>
                        <li>• <strong>Pt1000:</strong> 1000Ω at 0°C (higher sensitivity)</li>
                        <li>• <strong>Pt500:</strong> 500Ω at 0°C (compromise option)</li>
                        <li>• Nickel and copper RTDs (specific applications)</li>
                        <li>• Various accuracy classes (AA, A, B)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3 text-base sm:text-lg">Wiring Configurations</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-1 text-sm">2-Wire</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Simplest wiring</li>
                        <li>• Lead resistance causes error</li>
                        <li>• Short cable runs only</li>
                        <li>• Lower accuracy</li>
                        <li>• Lowest cost</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-1 text-sm">3-Wire</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Compensates lead resistance</li>
                        <li>• Most common configuration</li>
                        <li>• Good accuracy vs cost</li>
                        <li>• Moderate cable lengths</li>
                        <li>• Industry standard</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-1 text-sm">4-Wire</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Highest accuracy</li>
                        <li>• Eliminates lead resistance</li>
                        <li>• Long cable runs possible</li>
                        <li>• Laboratory/precision use</li>
                        <li>• Highest cost</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2 text-sm sm:text-base">Advantages</h5>
                    <ul className="text-xs sm:text-sm space-y-1">
                      <li>• Excellent accuracy and stability</li>
                      <li>• Nearly linear temperature response</li>
                      <li>• Wide temperature range (-200°C to +850°C)</li>
                      <li>• Good long-term stability</li>
                      <li>• Interchangeable sensors available</li>
                      <li>• No cold junction compensation needed</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2 text-sm sm:text-base">Limitations</h5>
                    <ul className="text-xs sm:text-sm space-y-1">
                      <li>• Requires excitation current</li>
                      <li>• Self-heating effects possible</li>
                      <li>• Slower response than thermocouples</li>
                      <li>• More expensive than thermocouples</li>
                      <li>• Fragile in high-vibration environments</li>
                      <li>• Lead resistance compensation needed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Thermistors */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Thermistors: High-Sensitivity Temperature Sensors
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Thermistors are temperature-sensitive resistors made from semiconductor materials that exhibit large, predictable changes in electrical resistance with small temperature variations. Their high sensitivity makes them ideal for precise temperature control and measurement in narrow temperature ranges.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3 text-base sm:text-lg">Types and Characteristics</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">NTC (Negative Temperature Coefficient):</h5>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• Resistance decreases with temperature increase</li>
                        <li>• Most common type for temperature sensing</li>
                        <li>• High sensitivity (3-5% per °C)</li>
                        <li>• Non-linear response curve</li>
                        <li>• Range typically -55°C to +200°C</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">PTC (Positive Temperature Coefficient):</h5>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• Resistance increases with temperature</li>
                        <li>• Often used for over-temperature protection</li>
                        <li>• Sharp resistance change at specific temperature</li>
                        <li>• Self-limiting heating applications</li>
                        <li>• Current limiting and circuit protection</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3 text-base sm:text-lg">Construction and Materials</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Materials:</h5>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• Metal oxide semiconductors</li>
                        <li>• Ceramic materials (manganese, cobalt, nickel)</li>
                        <li>• Polymer-based thermistors</li>
                        <li>• Single crystal silicon</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Package Types:</h5>
                      <ul className="text-xs sm:text-sm space-y-1">
                        <li>• Bead type (fast response)</li>
                        <li>• Disc and chip forms</li>
                        <li>• Probe assemblies</li>
                        <li>• Surface mount packages</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2 text-sm sm:text-base">Advantages</h5>
                    <ul className="text-xs sm:text-sm space-y-1">
                      <li>• Extremely high sensitivity</li>
                      <li>• High precision in narrow ranges</li>
                      <li>• Fast response time</li>
                      <li>• Small size and low thermal mass</li>
                      <li>• Low cost for volume applications</li>
                      <li>• No self-heating at low currents</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border border-gray-600">
                    <h5 className="text-yellow-400 font-semibold mb-2 text-sm sm:text-base">Limitations</h5>
                    <ul className="text-xs sm:text-sm space-y-1">
                      <li>• Limited temperature range</li>
                      <li>• Highly non-linear response</li>
                      <li>• Not easily interchangeable</li>
                      <li>• Requires linearization circuitry</li>
                      <li>• Fragile construction</li>
                      <li>• Long-term stability concerns</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selection Criteria */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Selection Criteria and Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Selecting the appropriate temperature sensor requires careful consideration of application requirements, environmental conditions, performance specifications, and cost constraints. Each sensor type excels in specific scenarios.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3 text-base sm:text-lg">Comparative Analysis</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm">
                      <thead>
                        <tr className="text-white">
                          <th className="text-left p-2 border-b border-gray-600">Characteristic</th>
                          <th className="text-left p-2 border-b border-gray-600">Thermocouple</th>
                          <th className="text-left p-2 border-b border-gray-600">RTD</th>
                          <th className="text-left p-2 border-b border-gray-600">Thermistor</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-300">
                        <tr>
                          <td className="p-2 border-b border-gray-700 font-medium">Temperature Range</td>
                          <td className="p-2 border-b border-gray-700">-200°C to +2000°C</td>
                          <td className="p-2 border-b border-gray-700">-200°C to +850°C</td>
                          <td className="p-2 border-b border-gray-700">-55°C to +200°C</td>
                        </tr>
                        <tr>
                          <td className="p-2 border-b border-gray-700 font-medium">Accuracy</td>
                          <td className="p-2 border-b border-gray-700">±0.5°C to ±2°C</td>
                          <td className="p-2 border-b border-gray-700">±0.1°C to ±0.5°C</td>
                          <td className="p-2 border-b border-gray-700">±0.05°C to ±0.2°C</td>
                        </tr>
                        <tr>
                          <td className="p-2 border-b border-gray-700 font-medium">Response Time</td>
                          <td className="p-2 border-b border-gray-700">Very Fast (ms)</td>
                          <td className="p-2 border-b border-gray-700">Moderate (seconds)</td>
                          <td className="p-2 border-b border-gray-700">Fast (ms to seconds)</td>
                        </tr>
                        <tr>
                          <td className="p-2 border-b border-gray-700 font-medium">Cost</td>
                          <td className="p-2 border-b border-gray-700">Low</td>
                          <td className="p-2 border-b border-gray-700">Medium to High</td>
                          <td className="p-2 border-b border-gray-700">Low to Medium</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Linearity</td>
                          <td className="p-2">Non-linear</td>
                          <td className="p-2">Excellent</td>
                          <td className="p-2">Highly Non-linear</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3 text-base sm:text-lg">Application Guidelines</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm">Choose Thermocouples For:</h5>
                      <ul className="text-xs space-y-1">
                        <li>• High-temperature processes</li>
                        <li>• Harsh environments</li>
                        <li>• Fast response requirements</li>
                        <li>• Wide temperature ranges</li>
                        <li>• Cost-sensitive applications</li>
                        <li>• Furnace and kiln monitoring</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm">Choose RTDs For:</h5>
                      <ul className="text-xs space-y-1">
                        <li>• High accuracy requirements</li>
                        <li>• Laboratory measurements</li>
                        <li>• Process control applications</li>
                        <li>• Long-term stability needed</li>
                        <li>• Moderate temperature ranges</li>
                        <li>• Pharmaceutical processes</li>
                      </ul>
                    </div>
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm">Choose Thermistors For:</h5>
                      <ul className="text-xs space-y-1">
                        <li>• Precise temperature control</li>
                        <li>• HVAC applications</li>
                        <li>• Medical devices</li>
                        <li>• Consumer electronics</li>
                        <li>• Narrow temperature ranges</li>
                        <li>• High-sensitivity needs</li>
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
                <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Commercial HVAC System Temperature Strategy</h4>
                <p className="text-xs sm:text-sm leading-relaxed mb-4">
                  A modern office building's HVAC system demonstrates optimal temperature sensor selection based on specific requirements and environmental conditions:
                </p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-yellow-400 font-medium mb-2 text-xs sm:text-sm">Indoor Climate Control (RTDs)</h5>
                      <ul className="text-xs space-y-1">
                        <li>• <strong>Application:</strong> Zone temperature control</li>
                        <li>• <strong>Requirement:</strong> ±0.5°C accuracy for comfort</li>
                        <li>• <strong>Environment:</strong> Clean, stable conditions</li>
                        <li>• <strong>Range:</strong> 18°C to 26°C (narrow range)</li>
                        <li>• <strong>Why RTD:</strong> Excellent accuracy and stability</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-yellow-400 font-medium mb-2 text-xs sm:text-sm">Boiler Room Monitoring (Thermocouples)</h5>
                      <ul className="text-xs space-y-1">
                        <li>• <strong>Application:</strong> High-heat equipment monitoring</li>
                        <li>• <strong>Requirement:</strong> Wide range, fast response</li>
                        <li>• <strong>Environment:</strong> Hot, harsh, vibration</li>
                        <li>• <strong>Range:</strong> 50°C to 800°C</li>
                        <li>• <strong>Why Thermocouple:</strong> Rugged, high-temperature capability</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-card p-3 rounded">
                    <h5 className="text-yellow-400 font-medium mb-2 text-xs sm:text-sm">System Integration Benefits</h5>
                    <ul className="text-xs space-y-1">
                      <li>• <strong>Optimal Performance:</strong> Each sensor type used where it performs best</li>
                      <li>• <strong>Cost Effectiveness:</strong> RTDs where precision needed, thermocouples for rugged applications</li>
                      <li>• <strong>Maintenance Efficiency:</strong> Sensors matched to environmental demands reduce failures</li>
                      <li>• <strong>Energy Savings:</strong> Precise control reduces heating/cooling waste</li>
                    </ul>
                  </div>
                </div>
                
                <Alert className="mt-4 bg-green-600/10 border-green-600/30">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-gray-300 text-xs sm:text-sm">
                    <strong>Result:</strong> By selecting the appropriate sensor for each application, the system achieves optimal comfort control while maintaining reliability and cost-effectiveness.
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
                Temperature sensor selection requires understanding the unique characteristics and trade-offs of each type. Thermocouples excel in harsh, high-temperature environments; RTDs provide superior accuracy for process control; and thermistors offer highest sensitivity for precise applications. Successful implementation depends on matching sensor capabilities to application requirements.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2 text-sm sm:text-base">Key Selection Factors</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-white">Temperature Range:</strong> Match sensor capability to process requirements
                  </div>
                  <div>
                    <strong className="text-white">Accuracy Needs:</strong> Balance precision requirements with cost
                  </div>
                  <div>
                    <strong className="text-white">Environmental Conditions:</strong> Consider harsh vs controlled environments
                  </div>
                  <div>
                    <strong className="text-white">Response Time:</strong> Fast vs precise measurement trade-offs
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
            <Link to="../instrumentation-module-2-section-1" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../instrumentation-module-2" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-yellow-400 text-black hover:bg-yellow-400/10">
                Complete Module 2
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule2Section2;