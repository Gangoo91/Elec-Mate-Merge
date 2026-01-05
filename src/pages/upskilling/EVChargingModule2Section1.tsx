import { ArrowLeft, BookOpen, CheckCircle, Clock, Gauge, Zap, Battery, Power, Plug2, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/upskilling/Quiz';
import { evModule1Section1Questions } from '@/data/upskilling/evChargingQuizzes';

const EVChargingModule2Section1 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12 max-w-6xl mx-auto">
        <Link to="../ev-charging-module-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-8">
          {/* Header Section */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-yellow-400/10 rounded-lg">
                <Gauge className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Mode 1–4 and Charging Speeds
                </h1>
                <p className="text-xl text-gray-400 mt-2">
                  Charging modes and power levels per IEC 61851-1
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Section 1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                <Clock className="w-4 h-4 mr-1" />
                15 minutes
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                <BookOpen className="w-4 h-4 mr-1" />
                Advanced
              </Badge>
            </div>
          </div>

          {/* Learning Objectives */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  Understand the four charging modes defined in IEC 61851-1 standard
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  Identify appropriate charging speeds for different applications
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  Recognise safety features and protection mechanisms for each mode
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  Apply knowledge to select appropriate charging solutions
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction to EV Charging Modes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>
                The IEC 61851-1 standard defines four charging modes with specific safety requirements, power levels, 
                and installation considerations. Each mode represents increasing sophistication in communication, 
                safety protection, and control systems.
              </p>
            </CardContent>
          </Card>

          {/* Mode 1 Charging */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Plug2 className="h-5 w-5 text-yellow-400" />
                Mode 1 Charging: Basic AC Connection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Characteristics</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      Direct connection to standard AC mains supply (230V, 16A max)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      No communication between vehicle and supply
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      Basic protection via household RCD and MCB
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      Maximum power: 3.7kW (single phase)
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Applications & Limitations</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-red-400">Not permitted in UK for EV charging</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-red-400">Lacks essential safety features for EV charging</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-red-400">No earth fault detection during charging</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-yellow-400">Historical reference only</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mt-4">
                <h5 className="text-red-300 font-semibold mb-2">⚠️ UK Regulation Notice</h5>
                <p className="text-red-200 text-sm">
                  Mode 1 charging is prohibited in the UK due to safety concerns. IET Code of Practice and BS 7671 require 
                  additional safety measures that Mode 1 cannot provide, including earth fault detection and communication systems.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Mode 2 Charging */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Battery className="h-5 w-5 text-yellow-400" />
                Mode 2 Charging: Portable EVSE
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Characteristics</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      Portable EVSE with in-cable control and protection device (IC-CPD)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      Built-in RCD protection (Type A or Type B)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      Basic pilot signal communication (CP - Control Pilot)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      Maximum power: 7.4kW (single phase), 22kW (three phase)
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Safety Features</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-green-300">Integrated RCD protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-green-300">Control pilot communication</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-green-300">Temperature monitoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-green-300">Plug presence detection</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-900/20 border border-yellow-400/30 rounded-lg p-4 mt-4">
                <h5 className="text-blue-300 font-semibold mb-2">📱 Typical Applications</h5>
                <p className="text-blue-200 text-sm">
                  Mode 2 charging is ideal for temporary or emergency charging situations, using standard domestic or 
                  industrial outlets. Common in apartments, rental properties, or as backup charging solutions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Mode 3 Charging */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Power className="h-5 w-5 text-yellow-400" />
                Mode 3 Charging: Dedicated EVSE
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Characteristics</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      Dedicated EVSE permanently connected to AC supply
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      Advanced control pilot (CP) and proximity pilot (PP) signals
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      Integrated protection and control systems
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      Power range: 3.7kW to 43kW (AC supply)
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Advanced Features</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-green-300">Smart charging capabilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-green-300">Load management systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-green-300">Network connectivity options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-green-300">User authentication systems</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-white mb-4">Mode 3 Power Levels</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-[#404040] rounded-lg p-4">
                    <div className="text-yellow-400 font-semibold mb-2">Single Phase</div>
                    <div className="space-y-1 text-sm text-gray-300">
                      <div>230V AC</div>
                      <div>16A: 3.7kW</div>
                      <div>32A: 7.4kW</div>
                    </div>
                  </div>
                  <div className="bg-[#404040] rounded-lg p-4">
                    <div className="text-yellow-400 font-semibold mb-2">Three Phase</div>
                    <div className="space-y-1 text-sm text-gray-300">
                      <div>400V AC</div>
                      <div>16A: 11kW</div>
                      <div>32A: 22kW</div>
                    </div>
                  </div>
                  <div className="bg-[#404040] rounded-lg p-4">
                    <div className="text-yellow-400 font-semibold mb-2">High Power</div>
                    <div className="space-y-1 text-sm text-gray-300">
                      <div>400V AC</div>
                      <div>63A: 43kW</div>
                      <div>(Commercial only)</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mode 4 Charging */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Mode 4 Charging: DC Fast Charging
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Characteristics</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      Direct DC supply to vehicle battery
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      External DC converter/charger in EVSE
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      Advanced communication protocols (CAN bus)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      Power range: 50kW to 350kW+
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Communication Systems</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-purple-300">Digital communication protocol</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-purple-300">Battery management integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-purple-300">Real-time parameter monitoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-purple-300">Dynamic power adjustment</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-white mb-4">DC Charging Standards</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-[#404040] rounded-lg p-4">
                    <div className="text-yellow-400 font-semibold mb-2">CCS (Combined Charging System)</div>
                    <div className="space-y-1 text-sm text-gray-300">
                      <div>Type 2 + DC pins</div>
                      <div>Up to 350kW</div>
                      <div>European standard</div>
                    </div>
                  </div>
                  <div className="bg-[#404040] rounded-lg p-4">
                    <div className="text-yellow-400 font-semibold mb-2">CHAdeMO</div>
                    <div className="space-y-1 text-sm text-gray-300">
                      <div>Separate DC connector</div>
                      <div>Up to 100kW (v1.0)</div>
                      <div>Japanese standard</div>
                    </div>
                  </div>
                  <div className="bg-[#404040] rounded-lg p-4">
                    <div className="text-yellow-400 font-semibold mb-2">Tesla Supercharger</div>
                    <div className="space-y-1 text-sm text-gray-300">
                      <div>Proprietary connector</div>
                      <div>Up to 250kW</div>
                      <div>Tesla vehicles only</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charging Speed Comparison */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-yellow-400" />
                Charging Speed Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left p-3 text-white font-semibold">Mode</th>
                      <th className="text-left p-3 text-white font-semibold">Power Range</th>
                      <th className="text-left p-3 text-white font-semibold">Typical Use</th>
                      <th className="text-left p-3 text-white font-semibold">Charging Time*</th>
                      <th className="text-left p-3 text-white font-semibold">Installation</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="p-3">
                        <span className="text-red-400">Mode 1</span>
                      </td>
                      <td className="p-3">Up to 3.7kW</td>
                      <td className="p-3 text-red-400">Not permitted in UK</td>
                      <td className="p-3">12-16 hours</td>
                      <td className="p-3">Standard outlet</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3">
                        <span className="text-yellow-400">Mode 2</span>
                      </td>
                      <td className="p-3">3.7kW - 7.4kW</td>
                      <td className="p-3">Portable/Emergency</td>
                      <td className="p-3">6-12 hours</td>
                      <td className="p-3">Portable EVSE</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3">
                        <span className="text-green-400">Mode 3</span>
                      </td>
                      <td className="p-3">3.7kW - 43kW</td>
                      <td className="p-3">Home/Workplace</td>
                      <td className="p-3">1-8 hours</td>
                      <td className="p-3">Fixed installation</td>
                    </tr>
                    <tr>
                      <td className="p-3">
                        <span className="text-purple-400">Mode 4</span>
                      </td>
                      <td className="p-3">50kW - 350kW+</td>
                      <td className="p-3">Public/Rapid</td>
                      <td className="p-3">15-45 minutes</td>
                      <td className="p-3">Commercial installation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                *Charging times are approximate for 50kWh battery from 20% to 80% state of charge
              </p>
            </CardContent>
          </Card>

          {/* Real-World Implementation Examples */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Real-World Implementation Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#404040] rounded-lg p-4">
                  <h4 className="text-yellow-400 font-semibold mb-3">Mode 2 Implementation: Granny Cable</h4>
                  <div className="space-y-3 text-sm text-gray-300">
                    <p><strong>Typical Scenario:</strong> Emergency charging at remote locations</p>
                    <p><strong>User Case:</strong> Rural cottage rental, workplace without dedicated EVSE</p>
                    <div className="space-y-1">
                      <p><strong>Technical Specifications:</strong></p>
                      <ul className="text-xs space-y-1 ml-4">
                        <li>• 13A domestic plug with 10A charging limit</li>
                        <li>• 2.3kW charging power (230V × 10A)</li>
                        <li>• Built-in Type A RCD (30mA)</li>
                        <li>• Temperature monitoring in plug</li>
                        <li>• 6-8 hour charge time for typical EV</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-900/30 rounded p-2 text-xs">
                      <strong>UK Regulation:</strong> Must comply with BS EN 62752 and include earth fault detection
                    </div>
                  </div>
                </div>

                <div className="bg-[#404040] rounded-lg p-4">
                  <h4 className="text-yellow-400 font-semibold mb-3">Mode 3 Implementation: Home Wallbox</h4>
                  <div className="space-y-3 text-sm text-gray-300">
                    <p><strong>Typical Scenario:</strong> Domestic driveway installation</p>
                    <p><strong>User Case:</strong> Daily commuter with regular charging needs</p>
                    <div className="space-y-1">
                      <p><strong>Technical Specifications:</strong></p>
                      <ul className="text-xs space-y-1 ml-4">
                        <li>• 32A single-phase supply</li>
                        <li>• 7.4kW charging power (230V × 32A)</li>
                        <li>• Type B RCD protection</li>
                        <li>• Smart charging capability</li>
                        <li>• 3-4 hour charge time for typical EV</li>
                      </ul>
                    </div>
                    <div className="bg-green-900/30 rounded p-2 text-xs">
                      <strong>UK Regulation:</strong> Must meet BS 7671 requirements and include O-PEN protection
                    </div>
                  </div>
                </div>

                <div className="bg-[#404040] rounded-lg p-4">
                  <h4 className="text-yellow-400 font-semibold mb-3">Mode 3 Commercial: Three-Phase Installation</h4>
                  <div className="space-y-3 text-sm text-gray-300">
                    <p><strong>Typical Scenario:</strong> Workplace car park</p>
                    <p><strong>User Case:</strong> Fleet vehicles and employee charging</p>
                    <div className="space-y-1">
                      <p><strong>Technical Specifications:</strong></p>
                      <ul className="text-xs space-y-1 ml-4">
                        <li>• 32A three-phase supply (400V)</li>
                        <li>• 22kW charging power</li>
                        <li>• Load management system</li>
                        <li>• RFID access control</li>
                        <li>• 1-2 hour charge time for typical EV</li>
                      </ul>
                    </div>
                    <div className="bg-blue-900/30 rounded p-2 text-xs">
                      <strong>Features:</strong> Dynamic load balancing, billing systems, remote monitoring
                    </div>
                  </div>
                </div>

                <div className="bg-[#404040] rounded-lg p-4">
                  <h4 className="text-yellow-400 font-semibold mb-3">Mode 4 Implementation: Rapid Charging Hub</h4>
                  <div className="space-y-3 text-sm text-gray-300">
                    <p><strong>Typical Scenario:</strong> Motorway service station</p>
                    <p><strong>User Case:</strong> Long-distance travel charging</p>
                    <div className="space-y-1">
                      <p><strong>Technical Specifications:</strong></p>
                      <ul className="text-xs space-y-1 ml-4">
                        <li>• 150kW DC charging capability</li>
                        <li>• CCS Combo 2 and CHAdeMO connectors</li>
                        <li>• 800V battery compatibility</li>
                        <li>• Payment terminal integration</li>
                        <li>• 20-30 minute charge time (20-80%)</li>
                      </ul>
                    </div>
                    <div className="bg-purple-900/30 rounded p-2 text-xs">
                      <strong>Infrastructure:</strong> High-voltage switchgear, transformer, cooling systems
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Deep Dive: Control Pilot Signals */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Technical Deep Dive: Control Pilot (CP) Communication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">CP Signal States (IEC 61851-1)</h4>
                  <div className="space-y-3">
                    <div className="bg-[#404040] rounded p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-yellow-400 font-semibold">State A</span>
                        <span className="text-green-400">+12V</span>
                      </div>
                      <p className="text-xs text-gray-300">Vehicle not connected - EVSE in standby</p>
                    </div>
                    <div className="bg-[#404040] rounded p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-yellow-400 font-semibold">State B</span>
                        <span className="text-yellow-400">+9V</span>
                      </div>
                      <p className="text-xs text-gray-300">Vehicle connected - No charging permitted</p>
                    </div>
                    <div className="bg-[#404040] rounded p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-yellow-400 font-semibold">State C</span>
                        <span className="text-yellow-400">+6V</span>
                      </div>
                      <p className="text-xs text-gray-300">Vehicle ready - Charging permitted</p>
                    </div>
                    <div className="bg-[#404040] rounded p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-yellow-400 font-semibold">State D</span>
                        <span className="text-purple-400">+3V</span>
                      </div>
                      <p className="text-xs text-gray-300">Charging with ventilation required</p>
                    </div>
                    <div className="bg-[#404040] rounded p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-yellow-400 font-semibold">State E</span>
                        <span className="text-red-400">0V</span>
                      </div>
                      <p className="text-xs text-gray-300">Error condition - No charging</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">PWM Duty Cycle Encoding</h4>
                  <p className="text-sm text-gray-300">
                    The CP signal uses PWM (Pulse Width Modulation) to communicate maximum available current:
                  </p>
                  <div className="space-y-2">
                    <div className="bg-[#404040] rounded p-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">10% duty cycle:</span>
                        <span className="text-yellow-400">6A maximum</span>
                      </div>
                    </div>
                    <div className="bg-[#404040] rounded p-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">20% duty cycle:</span>
                        <span className="text-yellow-400">8A maximum</span>
                      </div>
                    </div>
                    <div className="bg-[#404040] rounded p-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">30% duty cycle:</span>
                        <span className="text-yellow-400">12A maximum</span>
                      </div>
                    </div>
                    <div className="bg-[#404040] rounded p-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">40% duty cycle:</span>
                        <span className="text-yellow-400">16A maximum</span>
                      </div>
                    </div>
                    <div className="bg-[#404040] rounded p-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">50% duty cycle:</span>
                        <span className="text-yellow-400">20A maximum</span>
                      </div>
                    </div>
                    <div className="bg-[#404040] rounded p-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">60% duty cycle:</span>
                        <span className="text-yellow-400">24A maximum</span>
                      </div>
                    </div>
                    <div className="bg-[#404040] rounded p-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">70% duty cycle:</span>
                        <span className="text-yellow-400">32A maximum</span>
                      </div>
                    </div>
                    <div className="bg-[#404040] rounded p-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">80% duty cycle:</span>
                        <span className="text-yellow-400">40A maximum</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-white mb-4">Proximity Pilot (PP) Signal</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-[#404040] rounded p-3">
                    <div className="text-yellow-400 font-semibold mb-2">Cable Rating Detection</div>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li>480Ω: 32A cable</li>
                      <li>220Ω: 20A cable</li>
                      <li>680Ω: 16A cable</li>
                      <li>1.5kΩ: 10A cable</li>
                    </ul>
                  </div>
                  <div className="bg-[#404040] rounded p-3">
                    <div className="text-yellow-400 font-semibold mb-2">Connection Verification</div>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li>Continuous monitoring</li>
                      <li>Plug insertion detection</li>
                      <li>Cable disconnection safety</li>
                      <li>Automatic power isolation</li>
                    </ul>
                  </div>
                  <div className="bg-[#404040] rounded p-3">
                    <div className="text-yellow-400 font-semibold mb-2">Safety Interlocks</div>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li>Power isolation on disconnect</li>
                      <li>Cable rating enforcement</li>
                      <li>Temperature monitoring</li>
                      <li>Fault condition detection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Power Infrastructure Requirements */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Power Infrastructure Requirements by Mode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Mode 2 & 3 AC Infrastructure</h4>
                  <div className="space-y-3">
                    <div className="bg-[#404040] rounded p-3">
                      <h5 className="text-yellow-400 font-semibold mb-2">Single Phase (230V)</h5>
                      <div className="text-xs text-gray-300 space-y-1">
                        <div className="flex justify-between">
                          <span>16A supply:</span>
                          <span>3.7kW maximum</span>
                        </div>
                        <div className="flex justify-between">
                          <span>32A supply:</span>
                          <span>7.4kW maximum</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cable requirement:</span>
                          <span>6mm² minimum (32A)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Earthing:</span>
                          <span>TN-C-S or TN-S</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#404040] rounded p-3">
                      <h5 className="text-yellow-400 font-semibold mb-2">Three Phase (400V)</h5>
                      <div className="text-xs text-gray-300 space-y-1">
                        <div className="flex justify-between">
                          <span>16A supply:</span>
                          <span>11kW maximum</span>
                        </div>
                        <div className="flex justify-between">
                          <span>32A supply:</span>
                          <span>22kW maximum</span>
                        </div>
                        <div className="flex justify-between">
                          <span>63A supply:</span>
                          <span>43kW maximum</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cable requirement:</span>
                          <span>10mm² minimum (32A)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Mode 4 DC Infrastructure</h4>
                  <div className="space-y-3">
                    <div className="bg-[#404040] rounded p-3">
                      <h5 className="text-yellow-400 font-semibold mb-2">50kW DC Charger</h5>
                      <div className="text-xs text-gray-300 space-y-1">
                        <div className="flex justify-between">
                          <span>AC input:</span>
                          <span>400V 3-phase 80A</span>
                        </div>
                        <div className="flex justify-between">
                          <span>DC output:</span>
                          <span>150-500V 125A</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Efficiency:</span>
                          <span>~94%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Infrastructure:</span>
                          <span>Dedicated transformer</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#404040] rounded p-3">
                      <h5 className="text-yellow-400 font-semibold mb-2">150kW+ Ultra-Rapid</h5>
                      <div className="text-xs text-gray-300 space-y-1">
                        <div className="flex justify-between">
                          <span>AC input:</span>
                          <span>11kV or 33kV</span>
                        </div>
                        <div className="flex justify-between">
                          <span>DC output:</span>
                          <span>200-1000V 500A+</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cooling:</span>
                          <span>Liquid cooled cables</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Infrastructure:</span>
                          <span>HV switchgear required</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safety Considerations */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Safety Considerations by Mode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Mode 2 & 3 Safety Features</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      RCD protection (Type A minimum, Type B preferred)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      Control pilot signal monitoring
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      Temperature monitoring and protection
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      Overcurrent and overvoltage protection
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Mode 4 Additional Safety</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      Insulation monitoring systems
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      High-voltage safety interlocks
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      Emergency stop capabilities
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      Digital safety verification
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Standards Compliance */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Standards Compliance and Certification Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">UK/EU Standards Hierarchy</h4>
                  <div className="space-y-3">
                    <div className="bg-[#404040] rounded p-3">
                      <div className="text-yellow-400 font-semibold mb-2">IEC 61851-1 (International)</div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• Defines charging modes and safety requirements</li>
                        <li>• Control pilot and proximity pilot specifications</li>
                        <li>• Temperature monitoring requirements</li>
                        <li>• Ground fault protection standards</li>
                      </ul>
                    </div>
                    <div className="bg-[#404040] rounded p-3">
                      <div className="text-yellow-400 font-semibold mb-2">BS 7671:2018+A2:2022 (UK)</div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• Section 722: EV charging installations</li>
                        <li>• RCD requirements (Type A minimum, Type B preferred)</li>
                        <li>• O-PEN protection for TN-C-S supplies</li>
                        <li>• Earthing and bonding requirements</li>
                      </ul>
                    </div>
                    <div className="bg-[#404040] rounded p-3">
                      <div className="text-yellow-400 font-semibold mb-2">IET Code of Practice</div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• Installation best practices</li>
                        <li>• Risk assessment procedures</li>
                        <li>• Maintenance schedules</li>
                        <li>• Documentation requirements</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Certification Marks Required</h4>
                  <div className="space-y-3">
                    <div className="bg-[#404040] rounded p-3">
                      <div className="text-yellow-400 font-semibold mb-2">CE Marking (EU)</div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• EMC Directive compliance</li>
                        <li>• Low Voltage Directive</li>
                        <li>• RoHS compliance</li>
                        <li>• Declaration of conformity required</li>
                      </ul>
                    </div>
                    <div className="bg-[#404040] rounded p-3">
                      <div className="text-yellow-400 font-semibold mb-2">UKCA Marking (UK)</div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• Post-Brexit compliance mark</li>
                        <li>• UK designated standards</li>
                        <li>• Approved body testing</li>
                        <li>• Technical documentation</li>
                      </ul>
                    </div>
                    <div className="bg-[#404040] rounded p-3">
                      <div className="text-yellow-400 font-semibold mb-2">OZEV Approval (Grant Eligibility)</div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• Smart charging capability</li>
                        <li>• Minimum 3-year warranty</li>
                        <li>• Safety certification</li>
                        <li>• Approved installer network</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Safety Systems */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Advanced Safety Systems and Protection Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#404040] rounded p-4">
                  <h4 className="text-yellow-400 font-semibold mb-3">Earth Fault Protection</h4>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div>
                      <div className="text-white font-semibold mb-1">Type A RCD (Standard)</div>
                      <ul className="text-xs space-y-1">
                        <li>• AC earth fault detection</li>
                        <li>• 30mA sensitivity</li>
                        <li>• Pulsating DC blind spot</li>
                        <li>• Basic EV compatibility</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-1">Type B RCD (Preferred)</div>
                      <ul className="text-xs space-y-1">
                        <li>• AC + DC earth fault detection</li>
                        <li>• 30mA AC + 6mA DC sensitivity</li>
                        <li>• Full EV charger compatibility</li>
                        <li>• Higher cost but better protection</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-1">Type F RCD (Alternative)</div>
                      <ul className="text-xs space-y-1">
                        <li>• Composite frequency detection</li>
                        <li>• Time delay capability</li>
                        <li>• Mixed frequency immunity</li>
                        <li>• Cost-effective solution</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[#404040] rounded p-4">
                  <h4 className="text-yellow-400 font-semibold mb-3">O-PEN Protection</h4>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div>
                      <div className="text-white font-semibold mb-1">TN-C-S Supply Issues</div>
                      <ul className="text-xs space-y-1">
                        <li>• Open PEN conductor risk</li>
                        <li>• Voltage rise on metalwork</li>
                        <li>• Shock/fire hazard potential</li>
                        <li>• PME earthing limitations</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-1">Protection Methods</div>
                      <ul className="text-xs space-y-1">
                        <li>• TT earthing conversion</li>
                        <li>• O-PEN detection devices</li>
                        <li>• Voltage monitoring relays</li>
                        <li>• Automatic disconnection</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-1">Implementation</div>
                      <ul className="text-xs space-y-1">
                        <li>• Earth rod installation</li>
                        <li>• Voltage monitoring settings</li>
                        <li>• Time delay coordination</li>
                        <li>• Regular testing schedule</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[#404040] rounded p-4">
                  <h4 className="text-yellow-400 font-semibold mb-3">Smart Protection Features</h4>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div>
                      <div className="text-white font-semibold mb-1">Temperature Monitoring</div>
                      <ul className="text-xs space-y-1">
                        <li>• NTC thermistor sensors</li>
                        <li>• Connector temperature limits</li>
                        <li>• De-rating algorithms</li>
                        <li>• Thermal shutdown protection</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-1">Current Monitoring</div>
                      <ul className="text-xs space-y-1">
                        <li>• Hall effect sensors</li>
                        <li>• Phase imbalance detection</li>
                        <li>• Overcurrent protection</li>
                        <li>• Load progression monitoring</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-1">Communication Safety</div>
                      <ul className="text-xs space-y-1">
                        <li>• CP signal integrity monitoring</li>
                        <li>• PP continuity verification</li>
                        <li>• State machine validation</li>
                        <li>• Timeout protection</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mode-Specific Implementation Guide */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Mode-Specific Implementation and Installation Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="bg-[#404040] rounded p-4">
                  <h4 className="text-yellow-400 font-semibold mb-4">Mode 2 Implementation Details</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h5 className="text-white font-semibold">Technical Requirements</h5>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Portable IC-CPD device</li>
                        <li>• 13A plug with 10A charging limit</li>
                        <li>• Integrated Type A RCD minimum</li>
                        <li>• Temperature monitoring in plug</li>
                        <li>• Control pilot generation</li>
                        <li>• Proximity pilot detection</li>
                        <li>• Manual reset after fault</li>
                      </ul>
                      
                      <h5 className="text-white font-semibold mt-4">Safety Features</h5>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Earth leakage protection (30mA)</li>
                        <li>• Overcurrent protection</li>
                        <li>• Temperature cut-off</li>
                        <li>• Loss of earth detection</li>
                        <li>• Voltage monitoring</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-3">
                      <h5 className="text-white font-semibold">Installation Considerations</h5>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Socket outlet condition assessment</li>
                        <li>• Circuit loading evaluation</li>
                        <li>• Earth fault loop impedance check</li>
                        <li>• RCD compatibility verification</li>
                        <li>• Ventilation requirements</li>
                        <li>• Cable routing and protection</li>
                      </ul>
                      
                      <h5 className="text-white font-semibold mt-4">Limitations</h5>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Maximum 10A continuous current</li>
                        <li>• 2.3kW power limitation</li>
                        <li>• Domestic socket dependency</li>
                        <li>• Manual intervention required</li>
                        <li>• No smart charging capability</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[#404040] rounded p-4">
                  <h4 className="text-yellow-400 font-semibold mb-4">Mode 3 Implementation Details</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-3">
                      <h5 className="text-white font-semibold">Single Phase (7.4kW)</h5>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• 32A Type B MCB</li>
                        <li>• 6mm² cable minimum</li>
                        <li>• Type B RCD (30mA)</li>
                        <li>• O-PEN protection required</li>
                        <li>• Smart meter compatibility</li>
                        <li>• Load balancing capability</li>
                        <li>• WiFi/Ethernet connectivity</li>
                        <li>• RFID access control</li>
                        <li>• Energy metering</li>
                        <li>• Fault logging</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-3">
                      <h5 className="text-white font-semibold">Three Phase (22kW)</h5>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• 32A Type B MCB (3-pole)</li>
                        <li>• 6mm² cable (5-core)</li>
                        <li>• Type B RCD (30mA, 4-pole)</li>
                        <li>• Phase rotation checking</li>
                        <li>• Load monitoring per phase</li>
                        <li>• Dynamic load management</li>
                        <li>• Grid services capability</li>
                        <li>• Time-of-use scheduling</li>
                        <li>• Solar PV integration</li>
                        <li>• Vehicle-to-load capability</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-3">
                      <h5 className="text-white font-semibold">High Power (43kW)</h5>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• 63A Type B MCB (3-pole)</li>
                        <li>• 16mm² cable minimum</li>
                        <li>• Dedicated transformer</li>
                        <li>• Active cooling system</li>
                        <li>• Commercial grade components</li>
                        <li>• Network management system</li>
                        <li>• Billing integration</li>
                        <li>• Remote diagnostics</li>
                        <li>• Maintenance scheduling</li>
                        <li>• Performance analytics</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Battery Technology Integration */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Battery Technology and Charging Curve Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Battery Chemistry Impact on Charging</h4>
                  <div className="space-y-3">
                    <div className="bg-[#404040] rounded p-3">
                      <div className="text-yellow-400 font-semibold mb-2">Lithium Iron Phosphate (LFP)</div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                        <div>Max C-rate: 1C-3C</div>
                        <div>Voltage: 3.2V nominal</div>
                        <div>Charge curve: Flat</div>
                        <div>Temperature: -20°C to +60°C</div>
                        <div>Life cycles: 3000-5000</div>
                        <div>Cost: Lower</div>
                      </div>
                      <div className="text-xs text-gray-300 mt-2">
                        Optimal for Mode 3 charging, tolerates high power well, consistent charging speeds
                      </div>
                    </div>
                    
                    <div className="bg-[#404040] rounded p-3">
                      <div className="text-yellow-400 font-semibold mb-2">Nickel Manganese Cobalt (NMC)</div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                        <div>Max C-rate: 1C-2C</div>
                        <div>Voltage: 3.7V nominal</div>
                        <div>Charge curve: Declining</div>
                        <div>Temperature: -10°C to +50°C</div>
                        <div>Life cycles: 1000-2000</div>
                        <div>Cost: Higher</div>
                      </div>
                      <div className="text-xs text-gray-300 mt-2">
                        Higher energy density, requires careful thermal management, power decreases with SOC
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Charging Curve Characteristics</h4>
                  <div className="space-y-3">
                    <div className="bg-[#404040] rounded p-3">
                      <div className="text-yellow-400 font-semibold mb-2">Constant Current Phase (CC)</div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• SOC: 0-80% typically</li>
                        <li>• Maximum power delivery</li>
                        <li>• Temperature limited</li>
                        <li>• BMS controlled current</li>
                        <li>• Linear voltage rise</li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#404040] rounded p-3">
                      <div className="text-yellow-400 font-semibold mb-2">Constant Voltage Phase (CV)</div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• SOC: 80-100% typically</li>
                        <li>• Tapering current</li>
                        <li>• Cell balancing active</li>
                        <li>• Voltage regulation critical</li>
                        <li>• Longest time per % SOC</li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#404040] rounded p-3">
                      <div className="text-yellow-400 font-semibold mb-2">Temperature Derating</div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• &lt;0°C: Significant reduction</li>
                        <li>• 0-25°C: Optimal performance</li>
                        <li>• 25-45°C: Slight reduction</li>
                        <li>• &gt;45°C: Major derating</li>
                        <li>• Thermal conditioning required</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-white mb-4">Mode 4 DC Charging Optimisation</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-[#404040] rounded p-3">
                    <div className="text-yellow-400 font-semibold mb-2">Pre-conditioning</div>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li>• Battery thermal management</li>
                      <li>• Optimal temperature targeting</li>
                      <li>• Route planning integration</li>
                      <li>• Energy consumption for heating</li>
                      <li>• Charging time reduction</li>
                    </ul>
                  </div>
                  
                  <div className="bg-[#404040] rounded p-3">
                    <div className="text-yellow-400 font-semibold mb-2">Power Electronics</div>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li>• SiC/GaN semiconductors</li>
                      <li>• 98%+ efficiency targets</li>
                      <li>• Galvanic isolation</li>
                      <li>• Ripple current minimisation</li>
                      <li>• EMC compliance</li>
                    </ul>
                  </div>
                  
                  <div className="bg-[#404040] rounded p-3">
                    <div className="text-yellow-400 font-semibold mb-2">Communication Protocol</div>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li>• CAN bus implementation</li>
                      <li>• ISO 15118 messaging</li>
                      <li>• Real-time parameter exchange</li>
                      <li>• Security authentication</li>
                      <li>• Error handling protocols</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Key Takeaways</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Mode Selection Criteria</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Mode 2: Temporary or backup charging</li>
                    <li>• Mode 3: Primary home and workplace charging</li>
                    <li>• Mode 4: Rapid public charging infrastructure</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-white font-semibold">UK Compliance</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Mode 1 prohibited for EV charging</li>
                    <li>• BS 7671 compliance required for all modes</li>
                    <li>• IET Code of Practice recommendations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Knowledge Check */}
          <div className="mt-12">
            <Quiz 
              questions={evModule1Section1Questions}
              title="Mode 1-4 and Charging Speeds - Knowledge Check"
              description="Test your understanding of EV charging modes and power levels"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EVChargingModule2Section1;