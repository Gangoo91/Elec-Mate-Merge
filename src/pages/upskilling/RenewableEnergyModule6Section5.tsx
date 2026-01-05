import { ArrowLeft, Zap, Lightbulb, Shield, AlertTriangle, Settings, Battery, Activity, Network, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import LoadPriorityFAQ from '@/components/upskilling/renewable-energy/LoadPriorityFAQ';
import LoadPriorityPractical from '@/components/upskilling/renewable-energy/LoadPriorityPractical';

const RenewableEnergyModule6Section5 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What's a critical load panel?",
      options: [
        "A panel that controls all electrical loads",
        "A separate distribution board for essential circuits only",
        "The main electrical panel in a building",
        "A panel used only for solar systems"
      ],
      correct: 1,
      explanation: "A critical load panel is a separate distribution board that supplies only essential circuits that must remain powered during outages, such as lighting, refrigeration, and security systems."
    },
    {
      id: 2,
      question: "Why is load sequencing important?",
      options: [
        "To reduce installation costs",
        "To prevent battery damage from simultaneous high inrush currents",
        "To meet building regulations",
        "To improve solar panel efficiency"
      ],
      correct: 1,
      explanation: "Load sequencing prevents multiple high-power loads from starting simultaneously, which could cause battery voltage sag, inverter overload, or system shutdown due to excessive inrush currents."
    },
    {
      id: 3,
      question: "How do you size for critical loads?",
      options: [
        "Use total building load capacity",
        "Calculate critical load power demand and required runtime",
        "Use solar panel capacity",
        "Base on battery manufacturer recommendations only"
      ],
      correct: 1,
      explanation: "Critical load sizing requires calculating the total power demand of essential circuits and multiplying by the required backup runtime, then adding safety margins for battery efficiency and aging."
    },
    {
      id: 4,
      question: "What's a typical critical load in commercial systems?",
      options: [
        "Air conditioning systems",
        "Emergency lighting and fire safety systems",
        "Coffee machines",
        "Decorative lighting"
      ],
      correct: 1,
      explanation: "Emergency lighting, fire safety systems, security systems, and telecommunications equipment are typical critical loads in commercial buildings as they're essential for safety and business continuity."
    },
    {
      id: 5,
      question: "Can load priority change throughout the day?",
      options: [
        "No, priorities are fixed at installation",
        "Yes, through time-based or conditional automation",
        "Only during emergencies",
        "Only with manual intervention"
      ],
      correct: 1,
      explanation: "Modern energy management systems can dynamically adjust load priorities based on time of day, battery SOC, grid status, or user-defined conditions to optimize energy use and system performance."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 md:px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-6">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Load Priority, Critical Loads, and Energy Routing
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Designing energy systems with intelligent load prioritization and routing strategies
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 5
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Energy Management
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Identify critical loads in residential and commercial setups
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Learn how to route energy using priorities
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Understand how hybrid systems isolate loads
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                Designing an energy system involves choosing what loads matter most and routing power accordingly. Effective load prioritization ensures that essential functions remain operational during grid outages or energy shortages while optimizing battery usage and system efficiency.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-400" />
                Critical Load Panels and Essential Circuits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Critical load panels separate essential circuits from non-essential loads, enabling selective backup power and optimized battery utilization during grid outages or energy constraints.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Critical Load Panel Design:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Separate distribution board:</strong> Independent from main panel</li>
                    <li>• <strong>Dedicated supply:</strong> Fed from hybrid inverter or ATS</li>
                    <li>• <strong>Load limitation:</strong> Sized for backup system capacity</li>
                    <li>• <strong>Circuit selection:</strong> Only essential loads included</li>
                    <li>• <strong>Labelling:</strong> Clear identification of critical vs non-critical</li>
                    <li>• <strong>Isolation capability:</strong> Manual override for maintenance</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-3">Essential Circuit Categories:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Safety systems:</strong> Emergency lighting, fire alarms</li>
                    <li>• <strong>Security:</strong> CCTV, access control, alarms</li>
                    <li>• <strong>Communication:</strong> Internet, telephone, data systems</li>
                    <li>• <strong>Refrigeration:</strong> Food storage, medical supplies</li>
                    <li>• <strong>Basic lighting:</strong> Essential areas only</li>
                    <li>• <strong>Control systems:</strong> Building automation, HVAC controls</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Installation Configuration Example:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Main Panel Circuits:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• HVAC systems (heating/cooling)</li>
                      <li>• Hot water cylinders</li>
                      <li>• Kitchen appliances (ovens, hobs)</li>
                      <li>• Washing machines and dryers</li>
                      <li>• Entertainment systems</li>
                      <li>• General power outlets</li>
                      <li>• External lighting</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Critical Panel Circuits:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Emergency lighting circuits</li>
                      <li>• Refrigerator and freezer</li>
                      <li>• Internet router and modem</li>
                      <li>• Security system and CCTV</li>
                      <li>• Essential power outlets</li>
                      <li>• Garage door opener</li>
                      <li>• Medical equipment supplies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Battery className="h-6 w-6 text-orange-400" />
                Battery-Backed vs Grid-Only Loads
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Strategic separation of battery-backed and grid-only loads optimizes backup system sizing, reduces costs, and ensures critical functions remain operational during all grid conditions.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Battery-Backed Loads:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Life safety:</strong> Emergency lighting, fire systems</li>
                    <li>• <strong>Security:</strong> Alarms, CCTV, access control</li>
                    <li>• <strong>Communication:</strong> Phones, internet, data centres</li>
                    <li>• <strong>Medical:</strong> Life support, refrigerated medicines</li>
                    <li>• <strong>Food preservation:</strong> Refrigerators, freezers</li>
                    <li>• <strong>Essential comfort:</strong> Selected lighting circuits</li>
                  </ul>
                </div>
                <div className="bg-teal-900/20 p-4 rounded-lg border border-teal-500/30">
                  <h4 className="text-teal-400 font-semibold mb-3">Grid-Only Loads:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>High power appliances:</strong> Electric cookers, ovens</li>
                    <li>• <strong>HVAC systems:</strong> Central heating, air conditioning</li>
                    <li>• <strong>Water heating:</strong> Immersion heaters, heat pumps</li>
                    <li>• <strong>Laundry:</strong> Washing machines, tumble dryers</li>
                    <li>• <strong>Entertainment:</strong> TVs, gaming systems, audio</li>
                    <li>• <strong>EV charging:</strong> Electric vehicle charge points</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Switchable Loads:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Flexible circuits:</strong> Can switch between modes</li>
                    <li>• <strong>Time-based:</strong> Different priorities by time of day</li>
                    <li>• <strong>SOC dependent:</strong> Available when battery high</li>
                    <li>• <strong>Load managed:</strong> Controlled power levels</li>
                    <li>• <strong>Optional comfort:</strong> Non-essential but desirable</li>
                    <li>• <strong>Weather dependent:</strong> Pool pumps, garden systems</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-orange-400 font-semibold mb-3">Load Classification Decision Matrix:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-gray-300">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-2">Load Type</th>
                        <th className="text-left p-2">Safety Impact</th>
                        <th className="text-left p-2">Power Requirement</th>
                        <th className="text-left p-2">Runtime Needed</th>
                        <th className="text-left p-2">Classification</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-700">
                        <td className="p-2">Emergency lighting</td>
                        <td className="p-2 text-red-400">Critical</td>
                        <td className="p-2 text-green-400">Low</td>
                        <td className="p-2">Hours</td>
                        <td className="p-2 text-orange-400">Battery-backed</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2">HVAC system</td>
                        <td className="p-2 text-yellow-400">Comfort</td>
                        <td className="p-2 text-red-400">High</td>
                        <td className="p-2">Continuous</td>
                        <td className="p-2 text-teal-400">Grid-only</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2">Internet router</td>
                        <td className="p-2 text-orange-400">Important</td>
                        <td className="p-2 text-green-400">Very low</td>
                        <td className="p-2">Hours</td>
                        <td className="p-2 text-orange-400">Battery-backed</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2">Electric cooker</td>
                        <td className="p-2 text-yellow-400">Convenience</td>
                        <td className="p-2 text-red-400">Very high</td>
                        <td className="p-2">Intermittent</td>
                        <td className="p-2 text-teal-400">Grid-only</td>
                      </tr>
                      <tr>
                        <td className="p-2">Refrigerator</td>
                        <td className="p-2 text-orange-400">Important</td>
                        <td className="p-2 text-green-400">Medium</td>
                        <td className="p-2">Hours</td>
                        <td className="p-2 text-orange-400">Battery-backed</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-6 w-6 text-yellow-400" />
                Load Shedding and Sequencing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Intelligent load shedding and sequencing prevents system overload, maximizes backup runtime, and ensures critical loads maintain power during energy shortages or equipment limitations.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-400/30">
                  <h4 className="text-yellow-400 font-semibold mb-3">Load Shedding Strategies:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Voltage-based:</strong> Shed loads when battery voltage drops</li>
                    <li>• <strong>SOC-based:</strong> Progressive shedding as battery depletes</li>
                    <li>• <strong>Time-based:</strong> Scheduled load reduction periods</li>
                    <li>• <strong>Power-based:</strong> Shed when demand exceeds capacity</li>
                    <li>• <strong>Priority-based:</strong> Remove lowest priority loads first</li>
                    <li>• <strong>Combination:</strong> Multiple triggers for robust control</li>
                  </ul>
                </div>
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">Load Sequencing Benefits:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Inrush control:</strong> Prevents simultaneous motor starts</li>
                    <li>• <strong>Battery protection:</strong> Avoids voltage sag damage</li>
                    <li>• <strong>Inverter protection:</strong> Prevents overload shutdown</li>
                    <li>• <strong>System stability:</strong> Smooth power transitions</li>
                    <li>• <strong>Extended runtime:</strong> Optimized energy utilization</li>
                    <li>• <strong>Equipment protection:</strong> Controlled startup sequences</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-yellow-400 font-semibold mb-3">Load Shedding Implementation Example:</h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-red-900/20 p-3 rounded border border-red-500/30">
                    <h5 className="text-red-400 font-medium mb-2">Stage 1: SOC 30% - Non-Essential Shedding</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Entertainment systems disconnected</li>
                      <li>• Decorative lighting circuits off</li>
                      <li>• Pool/spa equipment disabled</li>
                      <li>• Workshop power outlets isolated</li>
                      <li>• External security lighting reduced</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-900/20 p-3 rounded border border-orange-500/30">
                    <h5 className="text-orange-400 font-medium mb-2">Stage 2: SOC 20% - Comfort Load Reduction</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• General power outlets 50% reduction</li>
                      <li>• Non-essential lighting circuits off</li>
                      <li>• Garage door opener disabled</li>
                      <li>• Water feature pumps stopped</li>
                      <li>• Guest area circuits isolated</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-900/20 p-3 rounded border border-yellow-400/30">
                    <h5 className="text-yellow-400 font-medium mb-2">Stage 3: SOC 10% - Critical Only</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Only emergency lighting remains</li>
                      <li>• Refrigeration maintained</li>
                      <li>• Security systems priority</li>
                      <li>• Medical equipment protected</li>
                      <li>• Communication systems essential</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-6 w-6 text-green-400" />
                Sizing Storage for Critical Demand
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Accurate sizing of energy storage for critical loads ensures adequate backup duration while optimizing system cost and performance across varying operating conditions.
              </p>
              
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-green-400 font-semibold mb-3">Critical Load Sizing Methodology:</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Step 1: Load Assessment</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Identify all critical circuits</li>
                      <li>• Measure or calculate power consumption</li>
                      <li>• Account for startup/inrush currents</li>
                      <li>• Consider duty cycles and diversity</li>
                      <li>• Document seasonal variations</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Step 2: Runtime Requirements</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Define minimum backup duration</li>
                      <li>• Consider grid outage statistics</li>
                      <li>• Account for generator start time</li>
                      <li>• Include safety margins</li>
                      <li>• Plan for future load growth</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-green-400 font-semibold mb-3">Sizing Calculation Example - Residential:</h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-blue-900/20 p-3 rounded border border-yellow-400/30">
                    <h5 className="text-yellow-400 font-medium mb-2">Critical Load Inventory:</h5>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-gray-300">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left p-1">Load</th>
                            <th className="text-left p-1">Power (W)</th>
                            <th className="text-left p-1">Duty Cycle</th>
                            <th className="text-left p-1">Average (W)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-700">
                            <td className="p-1">Emergency lighting</td>
                            <td className="p-1">200</td>
                            <td className="p-1">100%</td>
                            <td className="p-1">200</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-1">Refrigerator</td>
                            <td className="p-1">150</td>
                            <td className="p-1">40%</td>
                            <td className="p-1">60</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-1">Freezer</td>
                            <td className="p-1">120</td>
                            <td className="p-1">35%</td>
                            <td className="p-1">42</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-1">Internet/Router</td>
                            <td className="p-1">25</td>
                            <td className="p-1">100%</td>
                            <td className="p-1">25</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-1">Security system</td>
                            <td className="p-1">50</td>
                            <td className="p-1">100%</td>
                            <td className="p-1">50</td>
                          </tr>
                          <tr>
                            <td className="p-1 font-bold">Total</td>
                            <td className="p-1">545</td>
                            <td className="p-1">-</td>
                            <td className="p-1 font-bold">377</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
                    <h5 className="text-green-400 font-medium mb-2">Battery Sizing Calculation:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Average critical load: 377W</li>
                      <li>• Required backup time: 8 hours</li>
                      <li>• Gross energy required: 377W × 8h = 3.02 kWh</li>
                      <li>• Inverter efficiency: 95% → 3.02 ÷ 0.95 = 3.18 kWh</li>
                      <li>• Battery depth of discharge: 80% → 3.18 ÷ 0.8 = 3.98 kWh</li>
                      <li>• Temperature/aging factor: 90% → 3.98 ÷ 0.9 = 4.42 kWh</li>
                      <li>• <strong>Recommended battery capacity: 5 kWh</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Network className="h-6 w-6 text-purple-400" />
                Application Examples: Lighting, Refrigeration, Telecoms, Servers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Different critical load types have unique requirements for power quality, backup duration, and redundancy that must be considered in system design and energy routing strategies.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-purple-400 font-semibold mb-3">Lighting Systems:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Emergency lighting:</strong> 1-3W LED per luminaire</li>
                    <li>• <strong>Maintained lighting:</strong> Always on, battery backed</li>
                    <li>• <strong>Non-maintained:</strong> Emergency use only</li>
                    <li>• <strong>Self-contained:</strong> Individual battery backup</li>
                    <li>• <strong>Central battery:</strong> Single backup system</li>
                    <li>• <strong>Duration:</strong> 1-3 hours typical requirement</li>
                  </ul>
                </div>
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">Refrigeration:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Domestic fridges:</strong> 100-200W average consumption</li>
                    <li>• <strong>Commercial units:</strong> 500-2000W depending on size</li>
                    <li>• <strong>Medical fridges:</strong> Temperature monitoring critical</li>
                    <li>• <strong>Thermal mass:</strong> 4-8 hours without power</li>
                    <li>• <strong>Startup surge:</strong> 3-6x running current</li>
                    <li>• <strong>Backup priority:</strong> High for food/medicine safety</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-orange-400 font-semibold mb-3">Telecommunications:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Broadband routers:</strong> 10-30W continuous</li>
                    <li>• <strong>VOIP phones:</strong> 5-15W per handset</li>
                    <li>• <strong>Mobile boosters:</strong> 20-100W depending on coverage</li>
                    <li>• <strong>Network switches:</strong> 50-300W for managed switches</li>
                    <li>• <strong>Backup duration:</strong> Hours to days for business continuity</li>
                    <li>• <strong>Power quality:</strong> Clean supply essential</li>
                  </ul>
                </div>
                <div className="bg-teal-900/20 p-4 rounded-lg border border-teal-500/30">
                  <h4 className="text-teal-400 font-semibold mb-3">Server Systems:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Rack servers:</strong> 300-800W per 1U server</li>
                    <li>• <strong>Network storage:</strong> 100-500W depending on drives</li>
                    <li>• <strong>Cooling requirements:</strong> 1.3-2.0x server power</li>
                    <li>• <strong>UPS integration:</strong> Double conversion preferred</li>
                    <li>• <strong>Redundancy:</strong> N+1 power supply design</li>
                    <li>• <strong>Shutdown sequences:</strong> Graceful system shutdown</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-purple-400 font-semibold mb-3">Commercial Building Case Study:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="text-white font-medium">Building Profile:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 500m² office building</li>
                      <li>• 50 staff capacity</li>
                      <li>• Server room with 5kW load</li>
                      <li>• Total building load: 25kW</li>
                      <li>• Critical load requirement: 8kW</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Critical Load Breakdown:</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Emergency lighting: 500W</li>
                      <li>• Fire safety systems: 300W</li>
                      <li>• Server room: 5,000W</li>
                      <li>• Communications: 200W</li>
                      <li>• Security systems: 400W</li>
                      <li>• Essential lighting: 1,600W</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-green-900/20 p-3 rounded border border-green-500/30 mt-3">
                  <h5 className="text-green-400 font-medium mb-2">Backup System Design:</h5>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• 10kW hybrid inverter (25% headroom)</li>
                    <li>• 40kWh lithium battery (5-hour backup)</li>
                    <li>• 15kW diesel generator (extended outages)</li>
                    <li>• Automatic load shedding at 20% SOC</li>
                    <li>• Critical-only mode preserves server operation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Home className="h-6 w-6 text-cyan-400" />
                Dynamic Load Priority Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Advanced energy management systems can dynamically adjust load priorities based on time, conditions, and user preferences to optimize energy utilization and system performance.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                  <h4 className="text-cyan-400 font-semibold mb-3">Time-Based Priority Changes:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>Business hours:</strong> Office equipment high priority</li>
                    <li>• <strong>Evening:</strong> Residential comfort loads priority</li>
                    <li>• <strong>Night time:</strong> Security and emergency only</li>
                    <li>• <strong>Weekends:</strong> Reduced commercial load priority</li>
                    <li>• <strong>Holidays:</strong> Minimum essential loads only</li>
                    <li>• <strong>Seasonal:</strong> Heating/cooling priority adjustment</li>
                  </ul>
                </div>
                <div className="bg-indigo-900/20 p-4 rounded-lg border border-indigo-500/30">
                  <h4 className="text-indigo-400 font-semibold mb-3">Conditional Priority Logic:</h4>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• <strong>SOC-dependent:</strong> More loads available when battery full</li>
                    <li>• <strong>Weather-responsive:</strong> Storm preparation mode</li>
                    <li>• <strong>Grid-status dependent:</strong> Different rules for outages</li>
                    <li>• <strong>Occupancy-based:</strong> Room sensors adjust priorities</li>
                    <li>• <strong>Economic mode:</strong> Peak tariff load reduction</li>
                    <li>• <strong>Emergency override:</strong> Manual priority escalation</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h4 className="text-cyan-400 font-semibold mb-3">Smart Priority Examples:</h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-blue-900/20 p-3 rounded border border-yellow-400/30">
                    <h5 className="text-yellow-400 font-medium mb-2">Example 1: Office Building - Peak Tariff Period</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Reduce HVAC to minimum comfort levels</li>
                      <li>• Defer non-essential equipment operation</li>
                      <li>• Increase battery discharge to offset grid import</li>
                      <li>• Maintain critical server and safety systems</li>
                      <li>• Resume normal operation after peak period</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-900/20 p-3 rounded border border-purple-500/30">
                    <h5 className="text-purple-400 font-medium mb-2">Example 2: Residential - Storm Warning Mode</h5>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Force battery to 100% charge before storm arrival</li>
                      <li>• Pre-cool/heat house to extend comfort during outage</li>
                      <li>• Ensure critical communications are fully charged</li>
                      <li>• Fill electric vehicle battery for emergency transport</li>
                      <li>• Switch to extended backup priority hierarchy</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed mb-4">
                Designing with load priority improves resilience and battery efficiency. You power what matters, when it matters. Effective load prioritization and energy routing strategies ensure critical functions maintain operation while optimizing system performance and costs.
              </p>
              <p className="text-yellow-400 font-medium">
                Strategic separation of critical and non-critical loads, combined with intelligent sequencing and dynamic priority management, creates robust energy systems that adapt to changing conditions while maintaining essential services.
              </p>
            </CardContent>
          </Card>

          <LoadPriorityFAQ />
          
          <LoadPriorityPractical />

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Test Your Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz 
                questions={quizQuestions}
                title="Load Priority and Energy Routing Quiz"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule6Section5;