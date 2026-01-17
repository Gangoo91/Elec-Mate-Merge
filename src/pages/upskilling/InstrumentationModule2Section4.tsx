import { ArrowLeft, ArrowRight, Gauge, AlertTriangle, CheckCircle, Zap, Lightbulb, Ruler, Eye, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const InstrumentationModule2Section4 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is the main use of a proximity sensor?",
      options: [
        "To measure temperature changes in objects",
        "To detect the presence or absence of objects without physical contact",
        "To measure electrical current flow",
        "To monitor pressure variations"
      ],
      correct: 1,
      explanation: "Proximity sensors are primarily used to detect the presence or absence of objects without requiring physical contact. They're essential for automation, safety systems, and position feedback."
    },
    {
      id: 2,
      question: "Which type of sensor is ideal for measuring liquid level without contact?",
      options: [
        "Float sensor",
        "Ultrasonic level sensor",
        "Mechanical gauge",
        "Pressure switch"
      ],
      correct: 1,
      explanation: "Ultrasonic level sensors are ideal for non-contact liquid level measurement. They use sound waves to measure the distance to the liquid surface, providing accurate readings without contaminating the liquid."
    },
    {
      id: 3,
      question: "What's the difference between an encoder and a potentiometer?",
      options: [
        "There is no difference between them",
        "Encoders provide digital output while potentiometers provide analogue output",
        "Encoders measure temperature while potentiometers measure position",
        "Potentiometers are more accurate than encoders"
      ],
      correct: 1,
      explanation: "Encoders provide digital position feedback with high resolution and no wear issues, while potentiometers provide analogue voltage output but have limited life due to mechanical wipers."
    },
    {
      id: 4,
      question: "Give an example where a photoelectric sensor would be useful.",
      options: [
        "Measuring water temperature",
        "Monitoring electrical voltage",
        "Counting products on a conveyor belt",
        "Measuring gas pressure"
      ],
      correct: 2,
      explanation: "Photoelectric sensors are excellent for counting products on conveyor belts. They can detect objects as they pass through a light beam, providing reliable counting without physical contact."
    },
    {
      id: 5,
      question: "Why choose a non-contact sensor?",
      options: [
        "They are always cheaper than contact sensors",
        "To avoid contamination, wear, and mechanical interference",
        "They consume less power",
        "They are easier to install"
      ],
      correct: 1,
      explanation: "Non-contact sensors are chosen to avoid contamination (especially in food/medical applications), eliminate mechanical wear, and prevent interference with the measured object or process."
  }  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in overflow-x-hidden bg-[#1a1a1a]">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:pt-8 sm:pb-12">
        <Link to="/study-centre/upskilling/instrumentation-module-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-6 sm:mb-8 px-3 py-2 rounded-md text-sm sm:text-base touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
              <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Level, Position, and Proximity Sensors
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-400 mt-1">
                  Understanding spatial awareness sensors for level detection, positioning, and proximity monitoring
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
                Module 2.4
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs sm:text-sm">
                30 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-sm sm:text-base leading-relaxed">
                Level, position, and proximity sensors are vital for spatial awareness in modern systems. Whether detecting how full a container is, determining the exact position of a moving part, or sensing when objects enter restricted zones, these sensors provide essential feedback for automation, safety, and control applications. Understanding their principles and applications is crucial for effective system design.
              </p>
              <Alert className="bg-yellow-400/10 border-blue-600/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-gray-300 text-sm sm:text-base">
                  Spatial sensing is fundamental to modern automation. Poor sensor selection can lead to system failures, safety hazards, or inefficient operations.
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
                    <span>Understand how level, position, and proximity are sensed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Compare contact and non-contact sensor methods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Identify ideal sensor choices for different environmental conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Apply selection criteria for spatial monitoring applications</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Level Sensors */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Gauge className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Level Sensors
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Level sensors determine the height of liquids, solids, or interfaces between different materials. They range from simple float switches to sophisticated radar systems, each suited to specific applications and environmental conditions.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Level Sensor Technologies</h4>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Float Sensors</h5>
                      <p className="text-xs sm:text-sm mb-2">Use buoyancy principles with mechanical switches or continuous position feedback.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Advantages:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Simple and reliable</li>
                            <li>• No external power required</li>
                            <li>• Direct mechanical action</li>
                            <li>• Cost-effective</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Limitations:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Moving parts can stick</li>
                            <li>• Affected by foam and turbulence</li>
                            <li>• Limited accuracy</li>
                            <li>• Requires tank access</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Ultrasonic Level Sensors</h5>
                      <p className="text-xs sm:text-sm mb-2">Measure time-of-flight of ultrasonic pulses reflected from the surface.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Advantages:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Non-contact measurement</li>
                            <li>• No moving parts</li>
                            <li>• Works with most liquids</li>
                            <li>• Continuous measurement</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Considerations:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Affected by temperature</li>
                            <li>• Foam can absorb sound</li>
                            <li>• Dead zones near sensor</li>
                            <li>• Vapours may interfere</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Radar Level Sensors</h5>
                      <p className="text-xs sm:text-sm mb-2">Use microwave signals to measure distance to the surface with high accuracy.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Advantages:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Excellent accuracy</li>
                            <li>• Unaffected by temperature</li>
                            <li>• Works through vapours</li>
                            <li>• Long measuring range</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Applications:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Chemical storage tanks</li>
                            <li>• Oil and gas facilities</li>
                            <li>• Water treatment plants</li>
                            <li>• Custody transfer</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Capacitive Level Sensors</h5>
                      <p className="text-xs sm:text-sm mb-2">Detect level changes by measuring capacitance variations between electrodes.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Advantages:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Works with various materials</li>
                            <li>• No moving parts</li>
                            <li>• Can detect interface levels</li>
                            <li>• Compact design</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Applications:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Powder level detection</li>
                            <li>• Pharmaceutical processes</li>
                            <li>• Food and beverage</li>
                            <li>• Chemical interface detection</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Position Sensors */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Ruler className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Position Sensors
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Position sensors provide feedback on the location of moving components. They are essential for precise control in automation systems, robotics, and machinery positioning applications.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Position Sensor Types</h4>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Potentiometers (Linear and Rotary)</h5>
                      <p className="text-xs sm:text-sm mb-2">Provide analogue voltage output proportional to mechanical position.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Advantages:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Simple analogue output</li>
                            <li>• Direct position measurement</li>
                            <li>• Cost-effective</li>
                            <li>• No digital processing needed</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Limitations:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Mechanical wear of wiper</li>
                            <li>• Limited resolution</li>
                            <li>• Noise and dead spots</li>
                            <li>• Environmental sensitivity</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Encoders (Incremental and Absolute)</h5>
                      <p className="text-xs sm:text-sm mb-2">Provide digital position feedback with high resolution and reliability.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Incremental Encoders:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Provide pulse counts</li>
                            <li>• Require reference position</li>
                            <li>• Lower cost</li>
                            <li>• High resolution available</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Absolute Encoders:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Unique position code</li>
                            <li>• No reference needed</li>
                            <li>• Power-fail safe</li>
                            <li>• Network communication</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Linear Variable Differential Transformers (LVDT)</h5>
                      <p className="text-xs sm:text-sm mb-2">Electromagnetic sensors providing highly accurate linear position measurement.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Advantages:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Extremely high accuracy</li>
                            <li>• No physical contact</li>
                            <li>• Infinite resolution</li>
                            <li>• Excellent repeatability</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Applications:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Precision measurement</li>
                            <li>• Hydraulic cylinder position</li>
                            <li>• Quality control systems</li>
                            <li>• Research and development</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Proximity Sensors */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Proximity Sensors
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Proximity sensors detect the presence or absence of objects without physical contact. They are fundamental to automation systems, providing input for safety systems, counting applications, and position feedback.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Proximity Sensor Technologies</h4>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Inductive Proximity Sensors</h5>
                      <p className="text-xs sm:text-sm mb-2">Detect metallic objects by sensing changes in electromagnetic field.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Advantages:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Immune to dirt and moisture</li>
                            <li>• Fast switching speed</li>
                            <li>• Long service life</li>
                            <li>• No wear parts</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Applications:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Metal part detection</li>
                            <li>• Position sensing</li>
                            <li>• Counting applications</li>
                            <li>• Safety systems</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Capacitive Proximity Sensors</h5>
                      <p className="text-xs sm:text-sm mb-2">Detect both metallic and non-metallic objects by sensing capacitance changes.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Advantages:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Detects all materials</li>
                            <li>• Adjustable sensitivity</li>
                            <li>• Can sense through containers</li>
                            <li>• Compact design</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Applications:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Liquid level in bottles</li>
                            <li>• Non-metal object detection</li>
                            <li>• Bulk material presence</li>
                            <li>• Food processing</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Ultrasonic Proximity Sensors</h5>
                      <p className="text-xs sm:text-sm mb-2">Use sound waves to detect objects regardless of material, colour, or transparency.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Advantages:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Material independent</li>
                            <li>• Distance measurement</li>
                            <li>• Immune to dust/dirt</li>
                            <li>• Transparent object detection</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Limitations:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Temperature dependent</li>
                            <li>• Sound-absorbing materials</li>
                            <li>• Angular surfaces</li>
                            <li>• Air movement effects</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Photoelectric Sensors</h5>
                      <p className="text-xs sm:text-sm mb-2">Use light beams to detect objects, available in various configurations.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div>
                          <strong className="text-white">Types:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Through-beam (separate transmitter/receiver)</li>
                            <li>• Retro-reflective (uses reflector)</li>
                            <li>• Diffuse reflective (object reflection)</li>
                            <li>• Laser-based for precision</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-white">Applications:</strong>
                          <ul className="space-y-1 mt-1">
                            <li>• Conveyor counting</li>
                            <li>• Safety light curtains</li>
                            <li>• Small object detection</li>
                            <li>• Precise positioning</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact vs Non-Contact */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Contact vs Non-Contact Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Understanding when to use contact versus non-contact sensing methods is crucial for optimal system performance and reliability.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Contact Sensors</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Advantages:</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• Direct mechanical action</li>
                        <li>• Simple and reliable</li>
                        <li>• Often lower cost</li>
                        <li>• No power required (mechanical switches)</li>
                        <li>• Immune to environmental conditions</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Disadvantages:</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• Mechanical wear</li>
                        <li>• Can contaminate process</li>
                        <li>• May interfere with operation</li>
                        <li>• Limited switching frequency</li>
                        <li>• Physical access required</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Best Applications:</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• Safety interlocks</li>
                        <li>• Limit switches</li>
                        <li>• Emergency stops</li>
                        <li>• Simple presence detection</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Non-Contact Sensors</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Advantages:</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• No mechanical wear</li>
                        <li>• High switching frequency</li>
                        <li>• No contamination risk</li>
                        <li>• Distance measurement capability</li>
                        <li>• Suitable for harsh environments</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Disadvantages:</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• Higher complexity</li>
                        <li>• Power requirements</li>
                        <li>• Environmental sensitivity</li>
                        <li>• Initial cost often higher</li>
                        <li>• Requires electrical isolation</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Best Applications:</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• High-speed counting</li>
                        <li>• Sterile environments</li>
                        <li>• Precision positioning</li>
                        <li>• Continuous monitoring</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Considerations */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Application Considerations
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Successful sensor selection requires careful consideration of environmental conditions, performance requirements, and system constraints.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="text-yellow-400 font-semibold mb-3 text-sm sm:text-base">Environmental Factors</h4>
                    <ul className="space-y-2 text-xs sm:text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                        <span><strong>Dirt and Contamination:</strong> Choose sensors immune to build-up and contamination</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                        <span><strong>Vibration:</strong> Consider mounting and sensor technology for high-vibration environments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                        <span><strong>Temperature Extremes:</strong> Ensure sensor operates within temperature range</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                        <span><strong>Moisture and Chemicals:</strong> Select appropriate protection ratings and materials</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="text-yellow-400 font-semibold mb-3 text-sm sm:text-base">Performance Requirements</h4>
                    <ul className="space-y-2 text-xs sm:text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                        <span><strong>Detection Distance:</strong> Match sensor range to application requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                        <span><strong>Accuracy:</strong> Consider resolution and repeatability needs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                        <span><strong>Response Time:</strong> Ensure sensor speed matches application requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                        <span><strong>Output Type:</strong> Match digital/analogue output to control system inputs</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="text-yellow-400 font-semibold mb-3 text-sm sm:text-base">Installation Factors</h4>
                    <ul className="space-y-2 text-xs sm:text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                        <span><strong>Mounting Options:</strong> Consider space constraints and accessibility</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                        <span><strong>Wiring Requirements:</strong> Account for cable lengths and routing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                        <span><strong>Calibration Needs:</strong> Consider setup and maintenance requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                        <span><strong>Safety Requirements:</strong> Ensure compliance with safety standards</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="text-yellow-400 font-semibold mb-3 text-sm sm:text-base">Economic Considerations</h4>
                    <ul className="space-y-2 text-xs sm:text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                        <span><strong>Total Cost:</strong> Include purchase, installation, and maintenance costs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                        <span><strong>Life Expectancy:</strong> Consider sensor lifespan and replacement frequency</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                        <span><strong>Downtime Impact:</strong> Factor in consequences of sensor failure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                        <span><strong>Spare Parts:</strong> Consider availability and cost of replacement components</span>
                      </li>
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
                <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Real-World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Automated Warehouse Safety System</h4>
                <p className="text-xs sm:text-sm leading-relaxed mb-4">
                  In an automated warehouse, proximity sensors provide critical safety protection when objects or personnel enter restricted zones around robotic equipment. The system demonstrates the practical application of various sensor technologies:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Zone Protection</h5>
                      <p className="text-xs">Photoelectric light curtains create invisible barriers around robotic work areas, immediately stopping equipment when the beam is broken.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Pallet Detection</h5>
                      <p className="text-xs">Ultrasonic sensors detect pallets on conveyor systems regardless of their material or colour, ensuring proper positioning for automated handling.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Positioning Feedback</h5>
                      <p className="text-xs">Incremental encoders on automated guided vehicles (AGVs) provide precise position feedback for navigation and positioning accuracy.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Level Monitoring</h5>
                      <p className="text-xs">Capacitive level sensors monitor bulk material levels in storage silos, triggering refill requests before materials run out.</p>
                    </div>
                  </div>
                </div>
                
                <Alert className="mt-4 bg-green-600/10 border-green-600/30">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-gray-300 text-xs sm:text-sm">
                    <strong>Results:</strong> The integrated sensor system eliminated workplace accidents in robotic zones, improved positioning accuracy by 99.8%, and reduced material shortage incidents by 95%.
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
                Level, position, and proximity sensors are key to spatial monitoring and automation in modern systems. Understanding the various technologies, their strengths and limitations, and proper selection criteria enables optimal sensor choice for specific applications.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2 text-sm sm:text-base">Key Concepts</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-white">Level Sensing:</strong> Float, ultrasonic, radar, and capacitive technologies serve different applications
                  </div>
                  <div>
                    <strong className="text-white">Position Feedback:</strong> Potentiometers, encoders, and LVDTs provide varying degrees of accuracy and reliability
                  </div>
                  <div>
                    <strong className="text-white">Proximity Detection:</strong> Inductive, capacitive, ultrasonic, and photoelectric sensors suit different object types
                  </div>
                  <div>
                    <strong className="text-white">Selection Criteria:</strong> Environmental conditions, performance requirements, and economic factors guide choice
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
            <Link to="/study-centre/upskilling/instrumentation-module-2-section-3" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400 touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/study-centre/upskilling/instrumentation-module-2" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-yellow-400 text-black hover:bg-yellow-400/10 touch-manipulation active:scale-[0.98]">
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

export default InstrumentationModule2Section4;