import { useState } from 'react';
import { ArrowLeft, ArrowRight, Users, Wrench, Zap, Network, CheckCircle, AlertTriangle, Cable, Shield, Settings, Lightbulb, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { bmsModule1Section6QuizData } from '@/data/upskilling/bmsModule1Section6QuizData';

const BMSModule1Section6 = () => {
  const [inlineChecks, setInlineChecks] = useState<Record<string, number | null>>({
    check1: null,
    check2: null,
    check3: null,
    check4: null
  });

  const handleInlineAnswer = (checkId: string, answerIndex: number) => {
    setInlineChecks(prev => ({ ...prev, [checkId]: answerIndex }));
  };

  const InlineCheck = ({ 
    id, 
    question, 
    options, 
    correctAnswer, 
    explanation 
  }: { 
    id: string; 
    question: string; 
    options: string[]; 
    correctAnswer: number; 
    explanation: string; 
  }) => {
    const selectedAnswer = inlineChecks[id];
    const showFeedback = selectedAnswer !== null;

    return (
      <Card className="bg-card border-gray-700 mt-4">
        <CardContent className="p-4">
          <p className="text-white font-medium mb-3">{question}</p>
          <div className="space-y-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleInlineAnswer(id, index)}
                disabled={showFeedback}
                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                  showFeedback
                    ? index === correctAnswer
                      ? 'border-green-500 bg-green-500/20 text-white'
                      : selectedAnswer === index
                      ? 'border-red-500 bg-red-500/20 text-white'
                      : 'border-gray-600 bg-gray-800 text-white'
                    : selectedAnswer === index
                    ? 'border-yellow-400 bg-yellow-600/20 text-white'
                    : 'border-gray-600 bg-gray-800 text-white hover:border-gray-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    showFeedback
                      ? index === correctAnswer
                        ? 'border-green-500 bg-green-500'
                        : selectedAnswer === index
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-500'
                      : selectedAnswer === index
                      ? 'border-yellow-400 bg-yellow-400'
                      : 'border-gray-500'
                  }`}>
                    {showFeedback && index === correctAnswer && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                    {showFeedback && selectedAnswer === index && index !== correctAnswer && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                    {!showFeedback && selectedAnswer === index && (
                      <div className="w-2 h-2 rounded-full bg-black"></div>
                    )}
                  </div>
                  <span className="text-sm">{option}</span>
                </div>
              </button>
            ))}
          </div>
          {showFeedback && (
            <div className="mt-3 p-3 bg-blue-900/30 border border-blue-700/50 rounded-lg">
              <p className="text-blue-200 text-sm">{explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12">
        <Link to="../bms-module-1">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-6 sm:mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
          {/* Header */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <Users className="h-8 w-8 text-yellow-400 flex-shrink-0" />
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  The Electrician's Role in BMS Installations
                </h1>
                <p className="text-lg sm:text-xl text-white mt-2">
                  Professional responsibilities and best practices
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 1
              </Badge>
               <Badge variant="outline" className="border-gray-600 text-white">
                Section 6
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                30 min read
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base sm:text-lg leading-relaxed">
                A Building Management System (BMS) involves many disciplines — IT specialists, mechanical engineers, 
                and commissioning engineers — but <strong>electricians are at the core of installation</strong>. 
                From wiring sensors and actuators to integrating panels with lighting or HVAC equipment, electricians 
                ensure the system is safe, compliant, and functional.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                This section highlights the practical responsibilities electricians face on-site and how their work 
                impacts the overall success of a BMS project. Your role extends far beyond basic wiring — you're 
                the foundation that enables intelligent building automation.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="mb-4 text-base sm:text-lg">By the end of this section, you should be able to:</p>
              <div className="grid gap-3 sm:gap-4">
                {[
                  "Identify the key BMS components electricians typically install",
                  "Understand the wiring and containment requirements for BMS systems", 
                  "Recognise the electrician's role in collaboration with other trades",
                  "Explain why correct installation directly affects system performance"
                ].map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 1: Key BMS Components */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Wrench className="h-6 w-6 text-yellow-400" />
                1. Key BMS Components for Electricians
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <Card className="bg-card/80 border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-base sm:text-lg flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-400" />
                      Sensors
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm sm:text-base">
                     <ul className="space-y-2 text-white">
                      <li>• <strong>Temperature sensors:</strong> -40°C to +85°C range, typically RTD or thermistor</li>
                      <li>• <strong>Humidity sensors:</strong> 0-100% RH, usually combined with temperature</li>
                      <li>• <strong>CO₂ sensors:</strong> 0-5000ppm range for air quality monitoring</li>
                      <li>• <strong>Occupancy sensors:</strong> PIR or ultrasonic for presence detection</li>
                      <li>• <strong>Pressure sensors:</strong> For ductwork and water systems</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-base sm:text-lg flex items-center gap-2">
                      <Settings className="h-5 w-5 text-yellow-400" />
                      Actuators
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm sm:text-base">
                     <ul className="space-y-2 text-white">
                      <li>• <strong>Valve actuators:</strong> Modulating or on/off control for heating/cooling</li>
                      <li>• <strong>Damper actuators:</strong> Air flow control in ductwork</li>
                      <li>• <strong>Relay modules:</strong> Switching of pumps, fans, and lighting</li>
                      <li>• <strong>Variable speed drives:</strong> Motor speed control integration</li>
                      <li>• <strong>Smart switches:</strong> Intelligent lighting control</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-base sm:text-lg flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-400" />
                      Controllers & Panels
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm sm:text-base">
                     <ul className="space-y-2 text-white">
                      <li>• <strong>Room controllers:</strong> Local processing and I/O expansion</li>
                      <li>• <strong>Plant controllers:</strong> Central equipment management</li>
                      <li>• <strong>Gateway devices:</strong> Protocol conversion and communication</li>
                      <li>• <strong>Control panels:</strong> Housing for controllers and power supplies</li>
                      <li>• <strong>HMI displays:</strong> Local operator interfaces</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-base sm:text-lg flex items-center gap-2">
                      <Network className="h-5 w-5 text-purple-400" />
                      Network Cabling
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm sm:text-base">
                    <ul className="space-y-2 text-white">
                      <li>• <strong>RS485 twisted pair:</strong> For BACnet/Modbus communications</li>
                      <li>• <strong>Cat5e/Cat6 Ethernet:</strong> IP-based protocols and web interfaces</li>
                      <li>• <strong>Screened cables:</strong> EMC protection in industrial environments</li>
                      <li>• <strong>Low voltage power:</strong> 24V DC/AC for sensors and small actuators</li>
                      <li>• <strong>Fibre optic:</strong> Long distance, high-speed connections</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <InlineCheck
                id="check1"
                question="Which option provides two examples of BMS components an electrician may be required to install?"
                options={[
                  "Temperature sensors and valve actuators",
                  "Software databases and algorithms", 
                  "Mechanical pumps and boilers",
                  "Architectural drawings and specifications"
                ]}
                correctAnswer={0}
                explanation="Electricians install the physical components of BMS systems including sensors (temperature, humidity, CO₂, occupancy), actuators (valves, dampers, relays), controllers, and the associated wiring infrastructure."
              />
            </CardContent>
          </Card>

          {/* Section 2: Wiring and Containment */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Cable className="h-6 w-6 text-yellow-400" />
                2. Wiring and Containment Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <div className="bg-orange-900/20 border border-orange-700/50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-orange-200 mb-2">Critical BS 7671 Requirements</h4>
                    <p className="text-orange-100 text-sm sm:text-base">
                      BMS installations must comply with BS 7671 wiring regulations while meeting manufacturer specifications. 
                      Incorrect segregation or poor containment can cause system failures and safety hazards.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-yellow-400">Cable Segregation Requirements</h4>
                  <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-green-400 mb-2">Mains Voltage Circuits</h5>
                         <ul className="text-sm space-y-1 text-white">
                          <li>• 230V/400V power circuits</li>
                          <li>• Motor control circuits</li>
                          <li>• Lighting circuits</li>
                          <li>• High current actuators</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Low Voltage/Data Circuits</h5>
                         <ul className="text-sm space-y-1 text-white">
                          <li>• 24V sensor circuits</li>
                          <li>• Communication cables (RS485, Ethernet)</li>
                          <li>• Analogue signal cables (0-10V, 4-20mA)</li>
                          <li>• Control panel interconnections</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700/50 rounded">
                      <p className="text-yellow-200 text-sm">
                        <strong>Minimum separation:</strong> 300mm for parallel runs, or use screened cable with earthed screen
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-yellow-400">Containment Systems</h4>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Card className="bg-card/80 border-gray-700">
                      <CardContent className="p-4">
                        <h5 className="font-medium text-white mb-2">Trunking Systems</h5>
                         <ul className="text-sm space-y-1 text-white">
                          <li>• Compartmentalised for segregation</li>
                          <li>• Easy cable access</li>
                          <li>• Clean installation appearance</li>
                          <li>• IP rated for environment</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="bg-card/80 border-gray-700">
                      <CardContent className="p-4">
                        <h5 className="font-medium text-white mb-2">Conduit Installation</h5>
                         <ul className="text-sm space-y-1 text-white">
                          <li>• Individual circuit protection</li>
                          <li>• Suitable for wet areas</li>
                          <li>• Prevents cable damage</li>
                          <li>• Easy fault identification</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="bg-card/80 border-gray-700">
                      <CardContent className="p-4">
                        <h5 className="font-medium text-white mb-2">Cable Trays</h5>
                         <ul className="text-sm space-y-1 text-white">
                          <li>• High capacity installations</li>
                          <li>• Natural cable cooling</li>
                          <li>• Easy cable management</li>
                          <li>• Cost-effective for large runs</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-yellow-400">Termination Standards</h4>
                  <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Neat and secure connections</p>
                          <p className="text-sm text-white">Use proper crimping tools and terminals, avoid loose connections that create resistance and heat</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Clear cable labelling</p>
                          <p className="text-sm text-white">Use consistent labelling system matching circuit schedules and commissioning documents</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Future maintenance access</p>
                          <p className="text-sm text-white">Ensure terminations can be accessed without disturbing adjacent circuits</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="check2"
                question="Why must mains and data cables be segregated in BMS installations?"
                options={[
                  "To reduce cable costs",
                  "To prevent electromagnetic interference and ensure safety compliance", 
                  "To make installation faster",
                  "To improve cable appearance"
                ]}
                correctAnswer={1}
                explanation="BS 7671 requires segregation to prevent electromagnetic interference (EMI) that can cause false sensor readings and communication errors. It also ensures electrical safety by preventing dangerous voltage transfer between circuits."
              />
            </CardContent>
          </Card>

          {/* Section 3: Collaboration */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Users className="h-6 w-6 text-yellow-400" />
                3. Collaboration with Other Trades
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg leading-relaxed">
                BMS installation requires seamless coordination between multiple disciplines. 
                <strong> Electricians are often the critical link</strong> that enables other trades to complete their work successfully.
              </p>

              <div className="grid gap-4 sm:gap-6">
                <Card className="bg-card/80 border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      <Wrench className="h-5 w-5 text-yellow-400" />
                      Working with HVAC Engineers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-blue-300 mb-2">HVAC Dependencies</h5>
                         <ul className="text-sm space-y-1 text-white">
                          <li>• Valve actuator wiring and control</li>
                          <li>• Damper motor connections</li>
                          <li>• Fan and pump control integration</li>
                          <li>• Temperature and pressure sensor installation</li>
                          <li>• VFD control and feedback signals</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-blue-300 mb-2">Coordination Points</h5>
                         <ul className="text-sm space-y-1 text-white">
                          <li>• Sensor locations and mounting requirements</li>
                          <li>• Cable routes through mechanical areas</li>
                          <li>• Control panel locations and access</li>
                          <li>• Testing and commissioning sequences</li>
                          <li>• Maintenance access preservation</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      <Network className="h-5 w-5 text-green-400" />
                      IT/Network Team Collaboration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-green-300 mb-2">Network Infrastructure</h5>
                         <ul className="text-sm space-y-1 text-white">
                          <li>• Ethernet backbone installation</li>
                          <li>• Switch and router connections</li>
                          <li>• Server room cable management</li>
                          <li>• Wireless access point power (PoE)</li>
                          <li>• Network equipment grounding</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-green-300 mb-2">Interface Requirements</h5>
                         <ul className="text-sm space-y-1 text-white">
                          <li>• IP address planning coordination</li>
                          <li>• VLAN configuration requirements</li>
                          <li>• Security and firewall considerations</li>
                          <li>• Remote access infrastructure</li>
                          <li>• Backup power systems</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      <Settings className="h-5 w-5 text-purple-400" />
                      Commissioning Engineers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-purple-900/20 border border-purple-700/50 rounded p-3 mb-3">
                      <p className="text-purple-200 text-sm">
                        <strong>Critical relationship:</strong> Commissioning engineers depend entirely on correct electrical installation 
                        to programme and test the BMS. Poor wiring quality directly impacts their ability to complete the project.
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-purple-300 mb-2">Pre-Commissioning Support</h5>
                         <ul className="text-sm space-y-1 text-white">
                          <li>• Circuit testing and verification</li>
                          <li>• Cable schedule documentation</li>
                          <li>• Point-to-point testing</li>
                          <li>• Communication network verification</li>
                          <li>• Power supply validation</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-purple-300 mb-2">Ongoing Collaboration</h5>
                         <ul className="text-sm space-y-1 text-white">
                          <li>• Fault finding and troubleshooting</li>
                          <li>• System modifications and additions</li>
                          <li>• Performance optimisation support</li>
                          <li>• Documentation updates</li>
                          <li>• Training and handover assistance</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-red-200 mb-2">Communication Breakdown Consequences</h4>
                    <p className="text-red-100 text-sm sm:text-base mb-2">
                      Poor communication between trades is the most common cause of BMS project delays and cost overruns.
                    </p>
                    <ul className="text-red-100 text-sm space-y-1">
                      <li>• Rework due to conflicts between systems</li>
                      <li>• Extended commissioning periods</li>
                      <li>• Client dissatisfaction and contract disputes</li>
                      <li>• Delayed building handover and occupancy</li>
                    </ul>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="check3"
                question="Why is collaboration with HVAC engineers important during a BMS installation?"
                options={[
                  "HVAC engineers do the electrical work",
                  "Electricians install the wiring that connects HVAC equipment to BMS controllers", 
                  "It reduces project costs",
                  "HVAC engineers provide electrical materials"
                ]}
                correctAnswer={1}
                explanation="HVAC engineers design mechanical systems, but electricians must correctly wire actuators, sensors, and control interfaces that allow the BMS to monitor and control HVAC equipment. Without proper electrical installation, even the best HVAC design cannot function."
              />
            </CardContent>
          </Card>

          {/* Section 4: Installation Quality Impact */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                4. Impact of Installation Quality
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <div className="bg-gradient-to-r from-red-900/30 to-green-900/30 border border-gray-700 rounded-lg p-4 sm:p-6">
                <div className="text-center mb-4">
                  <h4 className="text-lg sm:text-xl font-semibold text-white">Installation Quality: The Foundation of BMS Success</h4>
                  <p className="text-white text-sm sm:text-base mt-2">Every aspect of system performance traces back to installation quality</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-red-300 mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Poor Installation Consequences
                    </h5>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        <span><strong>False sensor readings:</strong> Incorrect wiring causes wrong temperature, humidity, or CO₂ data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        <span><strong>Actuator malfunction:</strong> Valves and dampers operate incorrectly or fail completely</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        <span><strong>Communication failures:</strong> Network issues prevent system coordination</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        <span><strong>System downtime:</strong> Critical building services unavailable</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        <span><strong>Expensive call-backs:</strong> Emergency repairs and extended commissioning</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-green-300 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Quality Installation Benefits
                    </h5>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span><strong>Accurate control:</strong> Precise environmental management and energy efficiency</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span><strong>Reliable operation:</strong> Consistent performance with minimal faults</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span><strong>Easy maintenance:</strong> Clear documentation and accessible terminations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span><strong>Client satisfaction:</strong> System meets performance expectations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span><strong>Professional reputation:</strong> Successful projects lead to future work</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-yellow-400">Technical Impact Analysis</h4>
                  <div className="grid gap-4">
                    <Card className="bg-card/80 border-gray-700">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-base sm:text-lg">Sensor Accuracy Impact</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm sm:text-base">
                        <div className="space-y-3">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <h6 className="font-medium text-red-300 mb-2">Poor Installation Effects</h6>
                               <ul className="space-y-1 text-white text-sm">
                                <li>• Temperature errors up to ±5°C</li>
                                <li>• Humidity readings ±20% inaccurate</li>
                                <li>• CO₂ sensors providing false alarms</li>
                                <li>• Pressure sensors showing incorrect values</li>
                              </ul>
                            </div>
                            <div>
                              <h6 className="font-medium text-green-300 mb-2">Quality Installation Results</h6>
                              <ul className="space-y-1 text-white text-sm">
                                <li>• Temperature accuracy ±0.5°C</li>
                                <li>• Humidity readings ±3% accurate</li>
                                <li>• CO₂ sensors reliable and stable</li>
                                <li>• Pressure measurements precise</li>
                              </ul>
                            </div>
                          </div>
                          <div className="bg-blue-900/20 border border-blue-700/50 rounded p-3">
                            <p className="text-blue-200 text-sm">
                              <strong>Result:</strong> Accurate sensors enable precise control, reducing energy consumption by up to 30% 
                              and ensuring optimal comfort conditions for building occupants.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card/80 border-gray-700">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-base sm:text-lg">System Reliability Factors</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm sm:text-base">
                        <div className="space-y-3">
                          <div className="grid sm:grid-cols-3 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-red-400 mb-1">75%</div>
                              <p className="text-xs text-white">BMS failures caused by installation issues</p>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-yellow-400 mb-1">40%</div>
                              <p className="text-xs text-white">Project delays due to wiring problems</p>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-400 mb-1">90%</div>
                              <p className="text-xs text-white">Issues preventable with quality installation</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-yellow-400">Documentation and Labelling Impact</h4>
                  <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-orange-300 mb-3">Poor Labelling Consequences</h5>
                         <ul className="space-y-2 text-sm text-white">
                          <li>• <strong>Troubleshooting time:</strong> 4-8 hours to trace unmarked circuits</li>
                          <li>• <strong>Wrong connections:</strong> Risk of damage during maintenance</li>
                          <li>• <strong>System modifications:</strong> Nearly impossible without proper documentation</li>
                          <li>• <strong>Safety risks:</strong> Working on wrong circuits under live conditions</li>
                          <li>• <strong>Client confidence:</strong> Unprofessional appearance affects trust</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-green-300 mb-3">Quality Documentation Benefits</h5>
                        <ul className="space-y-2 text-sm text-white">
                          <li>• <strong>Fast fault finding:</strong> 15-30 minutes to identify and resolve issues</li>
                          <li>• <strong>Safe maintenance:</strong> Clear identification prevents accidents</li>
                          <li>• <strong>Easy modifications:</strong> System changes can be implemented quickly</li>
                          <li>• <strong>Reduced call-backs:</strong> Other engineers can work on the system</li>
                          <li>• <strong>Professional image:</strong> Quality work attracts future projects</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <InlineCheck
                id="check4"
                question="How does poor wiring quality affect the performance of a BMS?"
                options={[
                  "It improves system efficiency",
                  "It causes false readings, poor control, and potential system failure", 
                  "It has no impact on performance",
                  "It only affects the appearance"
                ]}
                correctAnswer={1}
                explanation="Poor wiring quality can cause sensors to provide false readings, actuators to malfunction, communication networks to fail, and even complete system breakdowns. This leads to poor environmental control, energy waste, equipment damage, and expensive repairs."
              />
            </CardContent>
          </Card>

          {/* Practical Guidance */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Practical Guidance for Electricians
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4 sm:space-y-6">
              <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-200 mb-2">Professional Best Practices</h4>
                    <p className="text-yellow-100 text-sm sm:text-base">
                      Apply the same level of care to BMS wiring as you would to any critical electrical installation. 
                      The building's intelligence depends on your craftsmanship.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <Card className="bg-card/80 border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-base sm:text-lg">Installation Excellence</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Treat BMS wiring with precision</p>
                          <p className="text-xs text-white">Use the same care as mains installation — every connection matters</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Label every termination point</p>
                          <p className="text-xs text-white">Clear labelling prevents hours of troubleshooting later</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Check manufacturer datasheets</p>
                          <p className="text-xs text-white">Always verify wiring requirements before connecting devices</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Maintain clear communication</p>
                          <p className="text-xs text-white">Keep commissioning engineers informed of installation progress</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-base sm:text-lg">Quality Checklist</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 border border-gray-500 rounded mt-1 flex-shrink-0"></div>
                        <p className="text-sm">Verify cable specifications and ratings</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 border border-gray-500 rounded mt-1 flex-shrink-0"></div>
                        <p className="text-sm">Test continuity and insulation resistance</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 border border-gray-500 rounded mt-1 flex-shrink-0"></div>
                        <p className="text-sm">Check segregation distances and screening</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 border border-gray-500 rounded mt-1 flex-shrink-0"></div>
                        <p className="text-sm">Verify termination tightness and polarity</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 border border-gray-500 rounded mt-1 flex-shrink-0"></div>
                        <p className="text-sm">Complete circuit documentation and labelling</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 border border-gray-500 rounded mt-1 flex-shrink-0"></div>
                        <p className="text-sm">Conduct point-to-point verification tests</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h5 className="font-medium text-blue-200 mb-3">Key Success Factors</h5>
                <div className="grid sm:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm text-blue-100">
                    <li>• <strong>Planning:</strong> Review drawings and specifications thoroughly before starting</li>
                    <li>• <strong>Materials:</strong> Use quality cables and termination hardware</li>
                    <li>• <strong>Installation:</strong> Follow manufacturer instructions precisely</li>
                  </ul>
                  <ul className="space-y-2 text-sm text-blue-100">
                    <li>• <strong>Testing:</strong> Verify every circuit before energising</li>
                    <li>• <strong>Documentation:</strong> Complete accurate as-built drawings</li>
                    <li>• <strong>Handover:</strong> Provide clear documentation to commissioning team</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Example */}
          <Card className="bg-card border-gray-700">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-white text-lg sm:text-xl flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                Real World Example: Manchester Office Project
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-card/80 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-3">Project Overview</h4>
                <p className="text-sm sm:text-base leading-relaxed mb-4">
                  A large office project in Manchester required BMS installation for HVAC and lighting control across 
                  five floors. The electrical contractor installed over 200 sensors, 150 actuators, and 15 control panels 
                  with extensive data and power cabling throughout the building.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h5 className="font-medium text-red-300 mb-2">The Problem</h5>
                     <ul className="text-sm space-y-1 text-white">
                      <li>• Multiple temperature sensors miswired</li>
                      <li>• Incorrect polarity on analogue circuits</li>
                      <li>• Mixed up sensor locations in documentation</li>
                      <li>• Poor cable labelling throughout installation</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-orange-300 mb-2">Initial Symptoms</h5>
                     <ul className="text-sm space-y-1 text-white">
                      <li>• Heating running when cooling was needed</li>
                      <li>• Some areas too hot, others too cold</li>
                      <li>• Erratic system behaviour and alarms</li>
                      <li>• Client complaints about comfort conditions</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-red-900/20 border border-red-700/50 rounded p-3 mb-4">
                  <h5 className="font-medium text-red-200 mb-2">Investigation Process</h5>
                  <p className="text-red-100 text-sm">
                    The commissioning team spent <strong>3 days</strong> fault-finding, checking sensor readings against 
                    actual conditions. They discovered that several temperature sensors were reading 5-10°C incorrectly 
                    due to wiring errors. Without clear cable labels, tracing each circuit took hours.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-green-300 mb-2">Resolution</h5>
                     <ul className="text-sm space-y-1 text-white">
                      <li>• Systematic circuit testing and correction</li>
                      <li>• Proper sensor wiring and calibration</li>
                      <li>• Complete re-labelling of all circuits</li>
                      <li>• Updated documentation and drawings</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300 mb-2">Final Outcome</h5>
                    <ul className="text-sm space-y-1 text-white">
                      <li>• System operated exactly as designed</li>
                      <li>• Optimal comfort conditions achieved</li>
                      <li>• Energy consumption within targets</li>
                      <li>• Client satisfaction and system acceptance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-700/50 rounded p-3">
                <p className="text-yellow-200 text-sm sm:text-base">
                  <strong>Key Lesson:</strong> This project demonstrates how electrician workmanship directly impacts 
                  BMS performance. Quality installation from the start would have prevented delays, additional costs, 
                  and client dissatisfaction. The extra time spent on proper installation is always less than the time 
                  needed for fault-finding and correction.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <div className="grid gap-3 sm:gap-4">
                {[
                  "Electricians are responsible for installing sensors, actuators, controllers, and cabling that form the BMS foundation",
                  "Wiring and containment must be neat, labelled, and compliant with BS 7671 while meeting manufacturer specifications", 
                  "Collaboration with HVAC, IT, and commissioning engineers is essential for project success",
                  "Installation quality directly affects BMS reliability, performance, and long-term client satisfaction"
                ].map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{point}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Final Quiz */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl">Section Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz 
                questions={bmsModule1Section6QuizData}
                title="Test your knowledge of the electrician's role in BMS installations"
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
            <Link to="../bms-module-1-section-5" className="w-full sm:w-auto">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card w-full sm:w-auto">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bms-module-2" className="w-full sm:w-auto">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 w-full sm:w-auto">
                Next Module
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMSModule1Section6;