import { ArrowLeft, ArrowRight, Target, AlertTriangle, CheckCircle, Zap, Lightbulb, Settings, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';

const InstrumentationModule2Section6 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "Name three critical factors when selecting a sensor.",
      options: [
        "Cost, colour, and brand name",
        "Environmental conditions, accuracy requirements, and measured variable",
        "Size, weight, and appearance",
        "Manufacturer location, warranty, and packaging"
      ],
      correct: 1,
      explanation: "The three most critical factors are environmental conditions (temperature, humidity, chemicals), accuracy requirements (precision and resolution needed), and the measured variable (what parameter you're measuring)."
    },
    {
      id: 2,
      question: "Why would you choose a rugged sensor over a more accurate one?",
      options: [
        "Rugged sensors are always cheaper",
        "In harsh environments, reliability is more important than absolute accuracy",
        "Rugged sensors consume less power",
        "They require less maintenance documentation"
      ],
      correct: 1,
      explanation: "In harsh industrial environments, a sensor that continues to operate reliably with good accuracy is better than a highly accurate sensor that fails frequently due to environmental stress."
    },
    {
      id: 3,
      question: "What is the risk of ignoring datasheets?",
      options: [
        "Legal liability issues only",
        "Higher insurance premiums",
        "Sensor failure, safety hazards, and system malfunction",
        "Warranty void only"
      ],
      correct: 2,
      explanation: "Ignoring datasheets can lead to sensors operating outside their specifications, causing premature failure, safety hazards, inaccurate measurements, and complete system malfunction."
    },
    {
      id: 4,
      question: "What role does environment play in sensor choice?",
      options: [
        "Environment only affects sensor appearance",
        "Environmental conditions determine sensor survival, accuracy, and reliability",
        "Environment only matters for outdoor installations",
        "Environmental factors are less important than cost"
      ],
      correct: 1,
      explanation: "Environmental conditions (temperature, humidity, vibration, chemicals, pressure) directly affect sensor survival, measurement accuracy, and long-term reliability. Proper environmental matching is crucial for successful applications."
    },
    {
      id: 5,
      question: "What does sensor redundancy mean?",
      options: [
        "Using the same sensor brand throughout the system",
        "Installing backup sensors to maintain operation if the primary sensor fails",
        "Having spare sensors in storage",
        "Using sensors with multiple output signals"
      ],
      correct: 1,
      explanation: "Sensor redundancy means installing multiple sensors (usually 2 or 3) to measure the same parameter, so if one fails, the system can continue operating using the backup sensors. This is critical in safety and process-critical applications."
  }  ];

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
              <Target className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Choosing the Right Sensor for the Application
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-400 mt-1">
                  Decision-making framework for sensor selection based on technical and environmental criteria
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
                Module 2.6
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs sm:text-sm">
                35 minutes
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
                The final step in sensor implementation is applying your knowledge to match the right sensor to a specific industrial task. This section provides a comprehensive decision-making framework that balances technical requirements, environmental constraints, and economic considerations. Poor sensor selection can compromise an entire system, making this one of the most critical skills in instrumentation engineering.
              </p>
              <Alert className="bg-yellow-400/10 border-blue-600/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-gray-300 text-sm sm:text-base">
                  Smart sensor selection balances technical needs, budget constraints, and reliability requirements. A systematic approach prevents costly mistakes and ensures optimal system performance.
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
                    <span>Learn a systematic decision-making framework for sensor selection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Evaluate key criteria including environment, signal requirements, and accuracy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Prevent common sensor selection mistakes that lead to system failures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Apply trade-off analysis to balance performance requirements and budget constraints</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Selection Framework */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Systematic Selection Framework
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                A structured approach to sensor selection ensures all critical factors are considered and documented. This framework prevents oversight and enables consistent decision-making across projects.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Step 1: Define the Measurement Requirements</h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Measured Variable</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Parameter:</strong> What exactly needs to be measured?</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Range:</strong> Minimum and maximum expected values</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Units:</strong> Engineering units required for display/control</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Media:</strong> What substance is being measured?</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Performance Requirements</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Accuracy:</strong> Required measurement precision</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Response Time:</strong> Speed of measurement updates needed</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Resolution:</strong> Smallest detectable change required</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Repeatability:</strong> Consistency of readings over time</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Step 2: Assess Environmental Conditions</h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Physical Environment</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• Temperature range (ambient and process)</li>
                        <li>• Humidity levels</li>
                        <li>• Pressure conditions</li>
                        <li>• Vibration and shock</li>
                        <li>• Dust and contamination</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Chemical Environment</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• Corrosive substances</li>
                        <li>• pH levels</li>
                        <li>• Chemical compatibility</li>
                        <li>• Cleaning agents used</li>
                        <li>• Explosive atmospheres</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Electrical Environment</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• Power supply availability</li>
                        <li>• EMI/RFI interference</li>
                        <li>• Grounding systems</li>
                        <li>• Safety classifications</li>
                        <li>• Cable routing constraints</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Step 3: Determine System Integration Requirements</h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Signal Requirements</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Output Type:</strong> Analog (4-20mA, 0-10V) or Digital</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Communication:</strong> HART, Modbus, Profibus, etc.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Power Supply:</strong> Loop-powered or separate supply</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Wiring:</strong> 2-wire, 3-wire, or 4-wire connection</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Installation Constraints</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Mounting:</strong> Available space and orientation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Access:</strong> Maintenance and calibration requirements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Safety:</strong> Hazardous area classifications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Approval:</strong> Required certifications and standards</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trade-offs and Economics */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Performance vs Budget Trade-offs
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Real-world sensor selection requires balancing performance requirements against budget constraints and availability. Understanding these trade-offs enables optimal decisions that meet project objectives.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Cost Considerations</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Initial Costs:</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• Sensor purchase price</li>
                        <li>• Installation materials and labour</li>
                        <li>• Calibration equipment and setup</li>
                        <li>• Documentation and training</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Operating Costs:</h5>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        <li>• Maintenance and calibration</li>
                        <li>• Replacement parts and consumables</li>
                        <li>• Energy consumption</li>
                        <li>• Downtime and lost production</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Performance Trade-offs</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Accuracy vs Cost:</h5>
                      <p className="text-xs sm:text-sm mb-2">Higher accuracy sensors cost more but may be essential for process control or regulatory compliance.</p>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Reliability vs Features:</h5>
                      <p className="text-xs sm:text-sm mb-2">Simple, proven designs may be more reliable than feature-rich smart sensors in harsh environments.</p>
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Response Time vs Stability:</h5>
                      <p className="text-xs sm:text-sm">Fast-response sensors may be more sensitive to noise and require additional filtering.</p>
                    </div>
                  </div>
                </div>
              </div>

              <Alert className="bg-yellow-600/10 border-yellow-600/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-gray-300 text-sm sm:text-base">
                  <strong>Economic Reality:</strong> The lowest-cost sensor is rarely the most economical choice when total cost of ownership is considered. Factor in reliability, maintenance, and downtime costs.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Redundancy and Fail-safes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                Redundancy and Fail-safes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <p className="text-sm sm:text-base leading-relaxed">
                Critical applications require redundancy and fail-safe strategies to maintain operation and safety when sensors fail. Understanding these concepts is essential for safety-critical and process-critical systems.
              </p>

              <div className="space-y-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Redundancy Strategies</h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">1oo2 (1 out of 2)</h5>
                      <p className="text-xs sm:text-sm mb-2">Two sensors, system operates if one is working. Good for availability.</p>
                      <ul className="text-xs space-y-1">
                        <li>• High availability</li>
                        <li>• Moderate cost</li>
                        <li>• Voting logic required</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">2oo3 (2 out of 3)</h5>
                      <p className="text-xs sm:text-sm mb-2">Three sensors, system operates if two agree. Excellent for critical safety.</p>
                      <ul className="text-xs space-y-1">
                        <li>• Highest safety integrity</li>
                        <li>• Fault tolerance</li>
                        <li>• Higher cost and complexity</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card p-3 rounded">
                      <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Standby Redundancy</h5>
                      <p className="text-xs sm:text-sm mb-2">Backup sensor activates when primary fails. Lower cost option.</p>
                      <ul className="text-xs space-y-1">
                        <li>• Cost-effective</li>
                        <li>• Automatic switchover</li>
                        <li>• Brief interruption possible</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-4 text-base sm:text-lg">Fail-safe Design Principles</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Fail-safe States</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Fail-Open:</strong> Circuit opens on failure (de-energise to trip)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Fail-Closed:</strong> Circuit closes on failure (energise to trip)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Fail-Fixed:</strong> Output goes to predetermined safe value</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Fail-Last:</strong> Maintains last known good value</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-3 text-sm sm:text-base">Diagnostic Features</h5>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Self-Diagnostics:</strong> Built-in tests detect internal faults</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Range Checking:</strong> Detect out-of-range readings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Rate of Change:</strong> Detect unrealistic signal changes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Cross-checking:</strong> Compare multiple sensor readings</span>
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
                <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Offshore Platform Wave Monitoring System</h4>
                <p className="text-xs sm:text-sm leading-relaxed mb-4">
                  An offshore oil platform requires wave height monitoring for helicopter landing safety and structural load management. The selection process demonstrates prioritising durability and reliability over absolute accuracy:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Environmental Assessment</h5>
                      <p className="text-xs">Salt spray, temperature extremes (-20°C to +50°C), vibration from waves, and no maintenance access for months at a time.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Technology Selection</h5>
                      <p className="text-xs">Radar level sensors chosen over ultrasonic for immunity to salt spray and fog. Marine-grade housings specified for corrosion resistance.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Redundancy Strategy</h5>
                      <p className="text-xs">Three sensors in 2oo3 configuration ensure helicopter landing decisions aren't compromised by single sensor failures.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                    <div>
                      <h5 className="text-white font-medium text-xs sm:text-sm">Economic Justification</h5>
                      <p className="text-xs">Higher initial cost justified by avoiding helicopter flight delays, which cost £10,000+ per incident.</p>
                    </div>
                  </div>
                </div>
                
                <Alert className="mt-4 bg-green-600/10 border-green-600/30">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-gray-300 text-xs sm:text-sm">
                    <strong>Results:</strong> System achieved 99.9% availability over three years with zero maintenance-related helicopter delays, fully justifying the premium sensor selection.
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
                Smart sensor selection balances technical needs, budget, and reliability requirements using a systematic approach. Understanding environmental constraints, performance trade-offs, and fail-safe strategies enables optimal decisions that ensure long-term system success.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-2 text-sm sm:text-base">Key Concepts</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-white">Systematic Approach:</strong> Use structured framework to evaluate all critical factors
                  </div>
                  <div>
                    <strong className="text-white">Environmental Matching:</strong> Ensure sensors can survive and perform in actual conditions
                  </div>
                  <div>
                    <strong className="text-white">Economic Balance:</strong> Consider total cost of ownership, not just purchase price
                  </div>
                  <div>
                    <strong className="text-white">Risk Management:</strong> Apply redundancy and fail-safe strategies for critical applications
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
            <Link to="../instrumentation-module-2-section-5" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../instrumentation-course" className="w-full sm:w-auto">
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

export default InstrumentationModule2Section6;