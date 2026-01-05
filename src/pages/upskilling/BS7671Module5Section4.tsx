import { ArrowLeft, ArrowRight, Power, CheckCircle, AlertTriangle, Target, Lightbulb, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import BS7671EmbeddedQuiz from '@/components/upskilling/BS7671EmbeddedQuiz';

const BS7671Module5Section4 = () => {

  const quizQuestions = [
    {
      id: 1,
      question: "What is the main purpose of isolation in electrical systems?",
      options: [
        "To control lighting levels",
        "To provide complete disconnection from live supply for safe maintenance work",
        "To improve system efficiency",
        "To reduce energy consumption"
      ],
      correct: 1,
      explanation: "Isolation provides complete disconnection from live supply to ensure safety during maintenance work, preventing accidental energisation and protecting personnel from electric shock."
    },
    {
      id: 2,
      question: "Give an example of emergency switching.",
      options: [
        "Routine maintenance disconnection",
        "Immediate power disconnection during fire or electric shock emergency",
        "Normal lighting control",
        "Seasonal equipment shutdown"
      ],
      correct: 1,
      explanation: "Emergency switching provides immediate power disconnection in dangerous situations such as fire, electric shock, or other emergencies to prevent injury or damage."
    },
    {
      id: 3,
      question: "What must be ensured about the location of isolation devices?",
      options: [
        "They should be hidden from view",
        "They must be easily accessible, clearly marked, and unobstructed",
        "They should be as high as possible",
        "They must be located only in electrical panels"
      ],
      correct: 1,
      explanation: "Isolation devices must be easily accessible, clearly marked with appropriate labelling, and free from obstruction to ensure they can be operated quickly and safely when needed."
    },
    {
      id: 4,
      question: "Which type of switching is used for routine maintenance tasks?",
      options: [
        "Emergency switching",
        "Switching for mechanical maintenance with appropriate safety procedures",
        "Automatic switching",
        "Remote switching only"
      ],
      correct: 1,
      explanation: "Switching for mechanical maintenance involves planned disconnection with appropriate safety procedures including locking off, permits to work, and safety notices."
    },
    {
      id: 5,
      question: "Why is clear labelling of isolation points important?",
      options: [
        "For aesthetic purposes only",
        "To ensure correct identification and prevent accidental operation of wrong devices",
        "To comply with colour coding standards",
        "To reduce installation costs"
      ],
      correct: 1,
      explanation: "Clear labelling ensures correct identification of isolation points, prevents operation of wrong devices, and enables quick location during emergencies or maintenance work."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div>
        <Link to="../bs7671-module-5">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Power className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Isolation, Switching, and Emergency Controls
                </h1>
                <p className="text-white">
                  Essential safety controls for electrical installations
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 5.4
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                25 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                Switching and isolation devices are essential for safe operation, maintenance, and emergency response. Understanding their functions and placement is key to protecting both personnel and equipment.
              </p>
              <p className="text-base leading-relaxed">
                This section covers the different types of switching functions, their specific applications, and the legal requirements for their implementation in electrical installations.
              </p>
            </CardContent>
          </Card>

          {/* Learning Goals */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-yellow-400" />
                Learning Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Understand the differences between isolation, switching off for mechanical maintenance, and emergency switching</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Identify types of switches and control devices</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Comprehend the legal and safety requirements for each function</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Apply appropriate labelling and accessibility requirements</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Types of Switching Functions */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Power className="h-6 w-6 text-yellow-400" />
                Types of Switching Functions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-white font-semibold mb-3">Distinct Switching Requirements</h4>
                <p className="text-sm">
                  Each switching function serves a specific safety purpose with different requirements for device type, location, operation, and safety procedures to ensure personnel and equipment protection.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold text-lg mb-3">Isolation</h4>
                  <div className="space-y-3">
                    <div className="bg-yellow-400/20 p-3 rounded border border-blue-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Purpose:</p>
                      <p className="text-xs">Complete disconnection from live supply for safety during maintenance or inspection work</p>
                    </div>
                    <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Requirements:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Visible break or clear OFF indication</li>
                        <li>• Provision for locking in OFF position</li>
                        <li>• Suitable for the fault current</li>
                        <li>• Accessible and clearly marked</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-600/20 p-3 rounded border border-yellow-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Applications:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Equipment maintenance</li>
                        <li>• Installation work</li>
                        <li>• Fault investigation</li>
                        <li>• Safety inspection</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-orange-400 font-semibold text-lg mb-3">Switching for Mechanical Maintenance</h4>
                  <div className="space-y-3">
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Purpose:</p>
                      <p className="text-xs">Controlled disconnection with safeguards for planned maintenance on mechanical equipment</p>
                    </div>
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Safety Procedures:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Lock-off procedures (LOTO)</li>
                        <li>• Permit to work systems</li>
                        <li>• Warning notices and tags</li>
                        <li>• Authorised person controls</li>
                      </ul>
                    </div>
                    <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Applications:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Motor and drive maintenance</li>
                        <li>• Conveyor system work</li>
                        <li>• Industrial machinery service</li>
                        <li>• Process equipment maintenance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-red-400 font-semibold text-lg mb-3">Emergency Switching</h4>
                  <div className="space-y-3">
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Purpose:</p>
                      <p className="text-xs">Immediate disconnection in danger situations to prevent injury or equipment damage</p>
                    </div>
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Critical Features:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Rapid operation capability</li>
                        <li>• Highly visible and accessible</li>
                        <li>• Distinctive red colour coding</li>
                        <li>• Latching OFF operation</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-600/20 p-3 rounded border border-yellow-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Emergency Scenarios:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Electric shock incidents</li>
                        <li>• Fire emergency situations</li>
                        <li>• Equipment malfunction hazards</li>
                        <li>• Personnel entrapment</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                <h4 className="text-green-400 font-semibold mb-3">Functional Comparison</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-green-600/30">
                        <th className="text-left p-2 text-white">Function</th>
                        <th className="text-left p-2 text-white">Speed</th>
                        <th className="text-left p-2 text-white">Safety Procedures</th>
                        <th className="text-left p-2 text-white">Load Disconnection</th>
                        <th className="text-left p-2 text-white">Typical Use</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-600/30">
                        <td className="p-2 text-yellow-400">Isolation</td>
                        <td className="p-2">Controlled</td>
                        <td className="p-2">Planned procedures</td>
                        <td className="p-2">Yes, after load switching</td>
                        <td className="p-2">Maintenance access</td>
                      </tr>
                      <tr className="border-b border-gray-600/30">
                        <td className="p-2 text-orange-400">Mechanical Maintenance</td>
                        <td className="p-2">Planned</td>
                        <td className="p-2">Lock-off systems</td>
                        <td className="p-2">Load and control circuits</td>
                        <td className="p-2">Equipment servicing</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-red-400">Emergency</td>
                        <td className="p-2">Immediate</td>
                        <td className="p-2">Instant operation</td>
                        <td className="p-2">All associated circuits</td>
                        <td className="p-2">Danger prevention</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Switchgear Types */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-green-500" />
                Switchgear Types and Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                <h4 className="text-white font-semibold mb-3">Device Selection Criteria</h4>
                <p className="text-sm">
                  Different switching devices are suited to specific functions based on their operating characteristics, current ratings, and ability to safely make and break electrical circuits under various conditions.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Isolation Devices</h4>
                  <div className="space-y-3">
                    <div className="bg-yellow-400/20 p-3 rounded border border-blue-600/40">
                      <p className="text-yellow-400 font-semibold text-sm mb-2">Isolator Switches:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Designed for OFF-load operation only</li>
                        <li>• Visible break or clear indication</li>
                        <li>• Lockable in OFF position</li>
                        <li>• High fault current withstand capability</li>
                        <li>• Available in various ratings and configurations</li>
                      </ul>
                    </div>
                    <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                      <p className="text-green-400 font-semibold text-sm mb-2">MCB/MCCB as Isolators:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Can provide isolation function when suitable</li>
                        <li>• Must have clear OFF indication</li>
                        <li>• Lockable operating mechanism</li>
                        <li>• Appropriate for the system voltage</li>
                        <li>• Consider contact separation distance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Control and Emergency Devices</h4>
                  <div className="space-y-3">
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-red-400 font-semibold text-sm mb-2">Emergency Stop Devices:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Red mushroom-head push buttons</li>
                        <li>• Twist-to-release or pull-to-release</li>
                        <li>• NC contacts for fail-safe operation</li>
                        <li>• Prominent and accessible location</li>
                        <li>• Connected to safety relay systems</li>
                      </ul>
                    </div>
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-orange-400 font-semibold text-sm mb-2">Contactors and Control Devices:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Remote switching capability</li>
                        <li>• Suitable for frequent operation</li>
                        <li>• Control circuit protection required</li>
                        <li>• Auxiliary contacts for interlocking</li>
                        <li>• Manual override capability</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Device Application Matrix</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Domestic Applications:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Consumer unit main switch</li>
                      <li>• MCBs for circuit isolation</li>
                      <li>• Local isolators for fixed equipment</li>
                      <li>• Emergency switches for high-risk areas</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Commercial Buildings:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Distribution board isolators</li>
                      <li>• Local equipment isolators</li>
                      <li>• Emergency lighting bypass switches</li>
                      <li>• Fire alarm isolation facilities</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Industrial Installations:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Motor control centres</li>
                      <li>• Emergency stop systems</li>
                      <li>• High-voltage isolators</li>
                      <li>• Process control interlocks</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Special Applications:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Photovoltaic DC isolators</li>
                      <li>• EV charging isolation</li>
                      <li>• Data centre emergency power off</li>
                      <li>• Medical equipment isolation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Labelling and Accessibility */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                Labelling and Accessibility Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                <h4 className="text-white font-semibold mb-3">Clear Identification and Access</h4>
                <p className="text-sm">
                  Proper labelling and accessibility ensure switching devices can be located and operated quickly and safely, especially during emergencies when time is critical for personnel safety.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Labelling Requirements</h4>
                  <div className="space-y-3">
                    <div className="bg-yellow-400/20 p-3 rounded border border-blue-600/40">
                      <p className="text-yellow-400 font-semibold text-sm mb-2">Identification Labels:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Clear circuit or equipment identification</li>
                        <li>• Durable materials resistant to environment</li>
                        <li>• Legible text size and contrast</li>
                        <li>• Unique identification numbers/codes</li>
                        <li>• Consistent labelling system throughout</li>
                      </ul>
                    </div>
                    <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                      <p className="text-green-400 font-semibold text-sm mb-2">Function Labels:</p>
                      <ul className="text-xs space-y-1">
                        <li>• "ISOLATOR" or "MAIN SWITCH" marking</li>
                        <li>• "EMERGENCY STOP" with pictogram</li>
                        <li>• Voltage and current ratings</li>
                        <li>• Operating instructions where needed</li>
                        <li>• Danger and warning notices</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold text-lg mb-3">Accessibility Standards</h4>
                  <div className="space-y-3">
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-red-400 font-semibold text-sm mb-2">Location Requirements:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Easily accessible to authorised personnel</li>
                        <li>• Unobstructed access and operation</li>
                        <li>• Adequate lighting for identification</li>
                        <li>• Safe working space around devices</li>
                        <li>• Protection from unauthorised access</li>
                      </ul>
                    </div>
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-orange-400 font-semibold text-sm mb-2">Emergency Accessibility:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Immediate access without tools</li>
                        <li>• Visible from normal work positions</li>
                        <li>• Multiple emergency stops where needed</li>
                        <li>• No obstructions during emergency</li>
                        <li>• Illuminated or glow-in-dark marking</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Documentation and Training</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Installation Records:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Location schedules and drawings</li>
                      <li>• Device type and rating records</li>
                      <li>• Testing and commissioning results</li>
                      <li>• Maintenance history logs</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Operating Procedures:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Normal operation sequences</li>
                      <li>• Emergency operation procedures</li>
                      <li>• Lock-off and safety procedures</li>
                      <li>• Fault reporting procedures</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Personnel Training:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Device location and identification</li>
                      <li>• Emergency operation procedures</li>
                      <li>• Safety precautions and risks</li>
                      <li>• Regular refresher training</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Installation Locations */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-6 w-6 text-purple-500" />
                Strategic Installation Locations
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
                <h4 className="text-white font-semibold mb-3">Location Planning Strategy</h4>
                <p className="text-sm">
                  Switching devices must be strategically located at entrance points, near machinery, and in distribution boards to ensure effective control and safety throughout the installation.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-purple-400 font-semibold text-lg mb-3">Entrance and Origin Points</h4>
                  <div className="space-y-3">
                    <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Main Installation Points:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Service entrance main isolator</li>
                        <li>• Consumer unit main switch</li>
                        <li>• Distribution board isolators</li>
                        <li>• Sub-main disconnection points</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-400/20 p-3 rounded border border-blue-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Access Requirements:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Readily accessible to occupants</li>
                        <li>• Clear identification and labelling</li>
                        <li>• Protected from weather and damage</li>
                        <li>• Adequate working space provision</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-green-400 font-semibold text-lg mb-3">Equipment and Machinery</h4>
                  <div className="space-y-3">
                    <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Local Isolation:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Within sight of controlled equipment</li>
                        <li>• Fixed equipment local isolators</li>
                        <li>• Motor control panel isolators</li>
                        <li>• Heating and cooling equipment</li>
                      </ul>
                    </div>
                    <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Industrial Requirements:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Production line emergency stops</li>
                        <li>• Conveyor system controls</li>
                        <li>• Process equipment isolation</li>
                        <li>• Maintenance access switches</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-red-400 font-semibold text-lg mb-3">Emergency and Safety</h4>
                  <div className="space-y-3">
                    <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Emergency Locations:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Kitchen and catering areas</li>
                        <li>• Laboratory and workshop spaces</li>
                        <li>• Swimming pool plant rooms</li>
                        <li>• High-risk industrial processes</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-600/20 p-3 rounded border border-yellow-600/40">
                      <p className="text-white font-semibold text-sm mb-2">Safety Considerations:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Multiple escape route access</li>
                        <li>• Protected from process hazards</li>
                        <li>• Clear sight lines and lighting</li>
                        <li>• Regular inspection and testing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-400/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-yellow-400 font-semibold mb-3">Installation Height and Positioning</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Standard Heights:</p>
                    <ul className="text-xs space-y-1">
                      <li>• General switches: 0.45m - 1.2m above floor</li>
                      <li>• Distribution boards: centre 1.4m - 1.8m</li>
                      <li>• Emergency stops: 0.8m - 1.7m (accessible range)</li>
                      <li>• Industrial equipment: as required for safety</li>
                      <li>• Consider accessibility regulations</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-2">Positioning Factors:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Avoid locations behind doors when open</li>
                      <li>• Consider furniture and equipment placement</li>
                      <li>• Ensure adequate illumination</li>
                      <li>• Protect from mechanical damage</li>
                      <li>• Allow for future access requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Scenario */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                Real World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                <h4 className="text-white font-semibold mb-3">Commercial Kitchen Emergency Control System</h4>
                <p className="text-sm mb-3">
                  In a commercial kitchen, emergency stop buttons are installed near cooking equipment and at exit points. During a fire risk event, staff are trained to activate the emergency stop to isolate circuits, cutting power to high-load appliances including ovens, fryers, and extraction systems.
                </p>
                <div className="bg-card p-3 rounded">
                  <p className="text-xs text-gray-400 mb-2">
                    <strong>Risk Assessment:</strong> High fire risk from cooking equipment, hot oil, gas supplies, and electrical heating elements requiring immediate power disconnection capability.
                  </p>
                  <p className="text-xs text-gray-400 mb-2">
                    <strong>Solution:</strong> Red mushroom-head emergency stops at three locations: main cooking area, exit door, and service entrance. All connected to safety relay system.
                  </p>
                  <p className="text-xs text-gray-400 mb-2">
                    <strong>Implementation:</strong> Stops disconnect cooking circuits via contactors, maintain emergency lighting, and activate fire suppression systems. Clear labelling and staff training provided.
                  </p>
                  <p className="text-xs text-gray-400">
                    <strong>Outcome:</strong> Rapid emergency response capability, reduced fire risk, staff confidence in emergency procedures, and compliance with commercial kitchen safety standards.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-base leading-relaxed">
                Switching and isolation functions are designed to protect both people and systems. Proper identification, installation, and training are vital for compliance with safety regulations and BS 7671 requirements.
              </p>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Key Points</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Isolation provides complete disconnection for safe maintenance with lockable OFF position</li>
                  <li>• Mechanical maintenance switching requires controlled procedures with lock-off systems</li>
                  <li>• Emergency switching enables immediate disconnection during dangerous situations</li>
                  <li>• Device selection depends on function: isolators, MCBs, contactors, and emergency stops</li>
                  <li>• Clear labelling and accessibility are essential for safe and effective operation</li>
                  <li>• Strategic location at entry points, near equipment, and emergency areas is crucial</li>
                  <li>• Training and documentation ensure personnel can operate devices correctly</li>
                  <li>• Regular testing and maintenance maintain reliability when needed most</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Knowledge Check Quiz
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-white">
                Test your understanding of isolation, switching, and emergency controls.
              </p>
              
              <BS7671EmbeddedQuiz 
                questions={quizQuestions}
                title="Switching & Controls Quiz"
                description="Test your knowledge of isolation, switching, and emergency control systems"
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../bs7671-module-5-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../bs7671-module-5">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Back to Module 5
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BS7671Module5Section4;