import { ArrowLeft, Wrench, Zap, Settings, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { evModule1Section1Questions } from '@/data/upskilling/evChargingQuizzes';

const EVChargingModule1Section5 = () => {
  const quizQuestions = evModule1Section1Questions?.slice(0, 5)?.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options,
    correct: q.correctAnswer,
    explanation: q.explanation
  })) || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-8 sm:pb-12">
        <Link to="../ev-charging-module-1">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  Overview of Market-Ready Hardware
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  Current charging equipment and manufacturers
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                Section 5
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                The EV charging hardware market offers an extensive range of solutions from multiple manufacturers, each with distinct features, capabilities, and target applications. Understanding the market landscape helps installers select appropriate equipment and develop manufacturer relationships.
              </p>
              <div className="bg-green-900/30 p-4 rounded-lg border-l-4 border-green-500">
                <p className="text-green-200">
                  <strong className="text-green-300">Market Dynamics:</strong> The EV charging equipment market is rapidly evolving, with new technologies, standards, and manufacturers emerging regularly. Staying current with hardware developments is essential for competitive advantage and customer satisfaction.
                </p>
              </div>
              <p>
                This section provides comprehensive coverage of current market-ready hardware, from domestic wall-mounted units to high-power commercial charging systems, including key manufacturers, technologies, and selection criteria.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Learning Outcomes</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-3">
              <p className="text-sm text-white mb-4">By the end of this section, you should be able to:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <span>Identify major EV charging equipment manufacturers and their product ranges</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <span>Compare different charging technologies and their applications</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <span>Select appropriate hardware for specific installation requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <span>Understand smart charging features and connectivity options</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <span>Evaluate total cost of ownership and business considerations</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Domestic Charging Solutions</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-card p-4 rounded-lg mb-4 border-l-4 border-yellow-400">
                <h4 className="text-yellow-400 font-semibold mb-3">Home Charging Equipment Overview</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-card p-4 rounded-lg border border-yellow-400">
                  <h5 className="text-blue-300 font-bold mb-3 text-lg">Pod Point</h5>
                  <div className="space-y-3 text-sm">
                    <div className="bg-blue-900/20 p-3 rounded">
                      <h6 className="text-blue-200 font-semibold mb-2">Solo 3 Series:</h6>
                      <ul className="space-y-1">
                        <li>• 7kW single-phase, 22kW three-phase</li>
                        <li>• Tethered Type 2 cable</li>
                        <li>• App-based control and monitoring</li>
                        <li>• Smart charging capabilities</li>
                        <li>• 3-year warranty standard</li>
                      </ul>
                    </div>
                    <div className="bg-blue-900/20 p-3 rounded">
                      <h6 className="text-blue-200 font-semibold mb-2">Key Features:</h6>
                      <ul className="space-y-1">
                        <li>• OLEV grant eligible</li>
                        <li>• Integrated load balancing</li>
                        <li>• Weather-resistant (IP65)</li>
                        <li>• LED status indicators</li>
                        <li>• Open protocol support</li>
                      </ul>
                    </div>
                    <div className="bg-blue-900/30 p-2 rounded text-xs">
                      <strong>Target Market:</strong> Domestic and small commercial
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-green-500">
                  <h5 className="text-green-300 font-bold mb-3 text-lg">Zappi (myenergi)</h5>
                  <div className="space-y-3 text-sm">
                    <div className="bg-green-900/20 p-3 rounded">
                      <h6 className="text-green-200 font-semibold mb-2">Zappi v2:</h6>
                      <ul className="space-y-1">
                        <li>• 7kW single-phase charging</li>
                        <li>• PV solar diversion capability</li>
                        <li>• Three charging modes</li>
                        <li>• Tethered or socketed options</li>
                        <li>• Advanced load management</li>
                      </ul>
                    </div>
                    <div className="bg-green-900/20 p-3 rounded">
                      <h6 className="text-green-200 font-semibold mb-2">Unique Selling Points:</h6>
                      <ul className="space-y-1">
                        <li>• Solar PV integration specialist</li>
                        <li>• Eco, Eco+ and Fast modes</li>
                        <li>• Real-time energy monitoring</li>
                        <li>• myenergi ecosystem compatibility</li>
                        <li>• British designed and manufactured</li>
                      </ul>
                    </div>
                    <div className="bg-green-900/30 p-2 rounded text-xs">
                      <strong>Target Market:</strong> Eco-conscious homeowners with solar PV
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-purple-500">
                  <h5 className="text-purple-300 font-bold mb-3 text-lg">Ohme</h5>
                  <div className="space-y-3 text-sm">
                    <div className="bg-purple-900/20 p-3 rounded">
                      <h6 className="text-purple-200 font-semibold mb-2">Home Pro:</h6>
                      <ul className="space-y-1">
                        <li>• 7kW single-phase charging</li>
                        <li>• Advanced smart charging algorithms</li>
                        <li>• Tariff optimisation features</li>
                        <li>• Sleek minimalist design</li>
                        <li>• Premium build quality</li>
                      </ul>
                    </div>
                    <div className="bg-purple-900/20 p-3 rounded">
                      <h6 className="text-purple-200 font-semibold mb-2">Software Focus:</h6>
                      <ul className="space-y-1">
                        <li>• AI-powered charging optimisation</li>
                        <li>• Dynamic tariff integration</li>
                        <li>• Carbon intensity awareness</li>
                        <li>• User behaviour learning</li>
                        <li>• Grid services participation</li>
                      </ul>
                    </div>
                    <div className="bg-purple-900/30 p-2 rounded text-xs">
                      <strong>Target Market:</strong> Tech-savvy users prioritising efficiency
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-card p-4 rounded-lg border border-orange-500">
                  <h5 className="text-orange-300 font-bold mb-3 text-lg">Andersen</h5>
                  <div className="space-y-3 text-sm">
                    <div className="bg-orange-900/20 p-3 rounded">
                      <h6 className="text-orange-200 font-semibold mb-2">A2 Wall Mounted:</h6>
                      <ul className="space-y-1">
                        <li>• 7kW and 22kW variants</li>
                        <li>• Premium aesthetic design</li>
                        <li>• Customisable front panels</li>
                        <li>• Integrated cable management</li>
                        <li>• High-end residential focus</li>
                      </ul>
                    </div>
                    <div className="bg-orange-900/20 p-3 rounded">
                      <h6 className="text-orange-200 font-semibold mb-2">Design Philosophy:</h6>
                      <ul className="space-y-1">
                        <li>• Architectural integration</li>
                        <li>• Bespoke colour options</li>
                        <li>• Premium materials and finish</li>
                        <li>• Minimal visual impact</li>
                        <li>• High-end residential market</li>
                      </ul>
                    </div>
                    <div className="bg-orange-900/30 p-2 rounded text-xs">
                      <strong>Target Market:</strong> Premium residential and architectural projects
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-red-500">
                  <h5 className="text-red-300 font-bold mb-3 text-lg">Wallbox</h5>
                  <div className="space-y-3 text-sm">
                    <div className="bg-red-900/20 p-3 rounded">
                      <h6 className="text-red-200 font-semibold mb-2">Pulsar Plus:</h6>
                      <ul className="space-y-1">
                        <li>• 7kW and 22kW options</li>
                        <li>• Compact design (166mm x 193mm)</li>
                        <li>• WiFi and Bluetooth connectivity</li>
                        <li>• myWallbox app control</li>
                        <li>• Cost-effective solution</li>
                      </ul>
                    </div>
                    <div className="bg-red-900/20 p-3 rounded">
                      <h6 className="text-red-200 font-semibold mb-2">Commercial Range:</h6>
                      <ul className="space-y-1">
                        <li>• Commander 2 (business solution)</li>
                        <li>• OCPP 1.6J protocol support</li>
                        <li>• Energy management integration</li>
                        <li>• Fleet management capabilities</li>
                        <li>• Scalable installations</li>
                      </ul>
                    </div>
                    <div className="bg-red-900/30 p-2 rounded text-xs">
                      <strong>Target Market:</strong> Value-conscious domestic and small commercial
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-yellow-400">
                  <h5 className="text-yellow-300 font-bold mb-3 text-lg">EO Charging</h5>
                  <div className="space-y-3 text-sm">
                    <div className="bg-yellow-900/20 p-3 rounded">
                      <h6 className="text-yellow-200 font-semibold mb-2">EO Mini Pro 3:</h6>
                      <ul className="space-y-1">
                        <li>• 7kW single-phase charging</li>
                        <li>• British designed and built</li>
                        <li>• RFID access control</li>
                        <li>• Hub integration for smart features</li>
                        <li>• Robust construction</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-900/20 p-3 rounded">
                      <h6 className="text-yellow-200 font-semibold mb-2">Commercial Focus:</h6>
                      <ul className="space-y-1">
                        <li>• EO Hub for load management</li>
                        <li>• Workplace charging solutions</li>
                        <li>• Fleet operation support</li>
                        <li>• Comprehensive monitoring</li>
                        <li>• Professional installation network</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-900/30 p-2 rounded text-xs">
                      <strong>Target Market:</strong> Domestic and workplace installations
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Commercial and Public Charging Solutions</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-card p-4 rounded-lg mb-4 border-l-4 border-yellow-400">
                <h4 className="text-yellow-400 font-semibold mb-3">Professional Grade Charging Infrastructure</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg border border-yellow-400">
                  <h5 className="text-blue-300 font-bold mb-4 text-lg">Fast AC Charging (7kW - 22kW)</h5>
                  <div className="space-y-4">
                    <div className="bg-blue-900/20 p-3 rounded">
                      <h6 className="text-blue-200 font-semibold mb-2">ABB Terra AC:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• 7kW to 22kW power range</li>
                        <li>• Single and dual socket options</li>
                        <li>• RFID and app-based authentication</li>
                        <li>• OCPP 1.6J and 2.0.1 protocols</li>
                        <li>• Dynamic load management</li>
                        <li>• 4G/WiFi/Ethernet connectivity</li>
                      </ul>
                    </div>
                    <div className="bg-blue-900/20 p-3 rounded">
                      <h6 className="text-blue-200 font-semibold mb-2">ChargePoint CT4000:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Modular design up to 22kW</li>
                        <li>• Cloud-based management platform</li>
                        <li>• Advanced energy management</li>
                        <li>• Revenue-grade metering</li>
                        <li>• Comprehensive analytics dashboard</li>
                        <li>• 24/7 support and monitoring</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-green-500">
                  <h5 className="text-green-300 font-bold mb-4 text-lg">Rapid DC Charging (50kW+)</h5>
                  <div className="space-y-4">
                    <div className="bg-green-900/20 p-3 rounded">
                      <h6 className="text-green-200 font-semibold mb-2">ABB Terra 184:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• 50kW to 180kW power output</li>
                        <li>• CCS, CHAdeMO, AC Type 2 connectors</li>
                        <li>• Liquid-cooled cables available</li>
                        <li>• Advanced power electronics</li>
                        <li>• Grid-tie and islanded operation</li>
                        <li>• Modular expandable design</li>
                      </ul>
                    </div>
                    <div className="bg-green-900/20 p-3 rounded">
                      <h6 className="text-green-200 font-semibold mb-2">Tritium Veefil-PK:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• 50kW, 75kW, 175kW variants</li>
                        <li>• Compact footprint design</li>
                        <li>• Integrated payment systems</li>
                        <li>• Remote monitoring and diagnostics</li>
                        <li>• Weather-resistant construction</li>
                        <li>• Future-proof upgrade capability</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500">
                <h5 className="text-purple-300 font-semibold mb-3">Ultra-Fast DC Charging (150kW+)</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h6 className="text-purple-200 font-medium mb-2">IONITY HPC:</h6>
                    <ul className="space-y-1">
                      <li>• Up to 350kW power output</li>
                      <li>• Liquid-cooled charging cables</li>
                      <li>• CCS2 connector standard</li>
                      <li>• Payment card and app support</li>
                      <li>• Network management integration</li>
                      <li>• Highway corridor installations</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-purple-200 font-medium mb-2">Tesla Supercharger V3:</h6>
                    <ul className="space-y-1">
                      <li>• 250kW peak power per vehicle</li>
                      <li>• Proprietary connector (Tesla)</li>
                      <li>• Dynamic power sharing</li>
                      <li>• Integrated fleet management</li>
                      <li>• Preconditioned battery optimisation</li>
                      <li>• Expanding third-party access</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-purple-200 font-medium mb-2">Fastned Stations:</h6>
                    <ul className="space-y-1">
                      <li>• Multi-standard 300kW+ capability</li>
                      <li>• Solar canopy integration</li>
                      <li>• Battery storage buffering</li>
                      <li>• Automated payment systems</li>
                      <li>• Brand-neutral operation</li>
                      <li>• Renewable energy focus</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Smart Charging Technology Integration</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-card p-4 rounded-lg mb-4 border-l-4 border-yellow-400">
                <h4 className="text-yellow-400 font-semibold mb-3">Advanced Connectivity and Control Systems</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg border border-cyan-500">
                  <h5 className="text-cyan-300 font-bold mb-4">Communication Protocols</h5>
                  <div className="space-y-3">
                    <div className="bg-cyan-900/20 p-3 rounded">
                      <h6 className="text-cyan-200 font-semibold mb-2">OCPP (Open Charge Point Protocol):</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Version 1.6J widely deployed</li>
                        <li>• Version 2.0.1 emerging standard</li>
                        <li>• Vendor-neutral interoperability</li>
                        <li>• Remote monitoring and control</li>
                        <li>• Standardised transaction management</li>
                        <li>• Firmware update capabilities</li>
                      </ul>
                    </div>
                    <div className="bg-cyan-900/20 p-3 rounded">
                      <h6 className="text-cyan-200 font-semibold mb-2">Connectivity Options:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• 4G/5G cellular networks</li>
                        <li>• WiFi and Ethernet connectivity</li>
                        <li>• LoRaWAN for remote locations</li>
                        <li>• Satellite communications backup</li>
                        <li>• Local mesh networking</li>
                        <li>• Edge computing capabilities</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-orange-500">
                  <h5 className="text-orange-300 font-bold mb-4">Load Management Systems</h5>
                  <div className="space-y-3">
                    <div className="bg-orange-900/20 p-3 rounded">
                      <h6 className="text-orange-200 font-semibold mb-2">Static Load Control:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Fixed power allocation per point</li>
                        <li>• Time-based charging restrictions</li>
                        <li>• Simple current limiting</li>
                        <li>• Manual override capabilities</li>
                        <li>• Basic reporting and monitoring</li>
                        <li>• Cost-effective implementation</li>
                      </ul>
                    </div>
                    <div className="bg-orange-900/20 p-3 rounded">
                      <h6 className="text-orange-200 font-semibold mb-2">Dynamic Load Management:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Real-time power monitoring</li>
                        <li>• Automatic load balancing</li>
                        <li>• Building integration systems</li>
                        <li>• Grid demand response participation</li>
                        <li>• Machine learning optimisation</li>
                        <li>• Advanced analytics and prediction</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/30 p-4 rounded-lg border border-green-500">
                <h5 className="text-green-300 font-semibold mb-3">Vehicle-to-Grid (V2G) Technology</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h6 className="text-green-200 font-medium mb-2">Bidirectional Charging:</h6>
                    <ul className="space-y-1">
                      <li>• Vehicle battery as grid storage</li>
                      <li>• Peak shaving capabilities</li>
                      <li>• Frequency regulation services</li>
                      <li>• Emergency backup power supply</li>
                      <li>• Renewable energy balancing</li>
                      <li>• Revenue generation potential</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-green-200 font-medium mb-2">CHAdeMO V2G:</h6>
                    <ul className="space-y-1">
                      <li>• Established V2G standard</li>
                      <li>• Nissan Leaf compatibility</li>
                      <li>• Commercial deployments active</li>
                      <li>• Grid services proven</li>
                      <li>• Home backup applications</li>
                      <li>• DC bidirectional capability</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-green-200 font-medium mb-2">CCS V2G Development:</h6>
                    <ul className="space-y-1">
                      <li>• Emerging European standard</li>
                      <li>• ISO 15118 protocol support</li>
                      <li>• Plug & Charge integration</li>
                      <li>• Future VW Group compatibility</li>
                      <li>• Market trials in progress</li>
                      <li>• Standardisation ongoing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Selection Criteria and Decision Framework</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-card p-4 rounded-lg mb-4 border-l-4 border-yellow-400">
                <h4 className="text-yellow-400 font-semibold mb-3">Strategic Equipment Selection Process</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg border border-yellow-400">
                  <h5 className="text-blue-300 font-bold mb-4">Technical Selection Criteria</h5>
                  <div className="space-y-3">
                    <div className="bg-blue-900/20 p-3 rounded">
                      <h6 className="text-blue-200 font-semibold mb-2">Power and Compatibility:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Power output requirements (7kW, 22kW, 50kW+)</li>
                        <li>• Connector types and vehicle compatibility</li>
                        <li>• Single-phase vs three-phase supply</li>
                        <li>• AC vs DC charging requirements</li>
                        <li>• Future-proofing considerations</li>
                        <li>• Grid connection capacity</li>
                      </ul>
                    </div>
                    <div className="bg-blue-900/20 p-3 rounded">
                      <h6 className="text-blue-200 font-semibold mb-2">Environmental Suitability:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• IP rating for weather protection</li>
                        <li>• Operating temperature range</li>
                        <li>• Vandal resistance requirements</li>
                        <li>• Salt air/marine environment suitability</li>
                        <li>• UV radiation resistance</li>
                        <li>• Altitude and humidity specifications</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-green-500">
                  <h5 className="text-green-300 font-bold mb-4">Commercial Considerations</h5>
                  <div className="space-y-3">
                    <div className="bg-green-900/20 p-3 rounded">
                      <h6 className="text-green-200 font-semibold mb-2">Total Cost of Ownership:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Initial purchase price and installation</li>
                        <li>• Maintenance and support costs</li>
                        <li>• Energy efficiency ratings</li>
                        <li>• Warranty terms and coverage</li>
                        <li>• Spare parts availability</li>
                        <li>• Lifecycle replacement planning</li>
                      </ul>
                    </div>
                    <div className="bg-green-900/20 p-3 rounded">
                      <h6 className="text-green-200 font-semibold mb-2">Business Support:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Technical support quality and availability</li>
                        <li>• Training and certification programmes</li>
                        <li>• Marketing and sales support</li>
                        <li>• Installation network partnerships</li>
                        <li>• Software updates and feature development</li>
                        <li>• Grant and incentive programme participation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500">
                <h5 className="text-purple-300 font-semibold mb-3">Smart Technology Evaluation</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h6 className="text-purple-200 font-medium mb-2">Connectivity Features:</h6>
                    <ul className="space-y-1">
                      <li>• WiFi, 4G, and Ethernet options</li>
                      <li>• OCPP protocol compliance</li>
                      <li>• API availability for integration</li>
                      <li>• Cloud-based management platforms</li>
                      <li>• Mobile app functionality</li>
                      <li>• Remote diagnostics capabilities</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-purple-200 font-medium mb-2">Energy Management:</h6>
                    <ul className="space-y-1">
                      <li>• Load balancing capabilities</li>
                      <li>• Solar PV integration options</li>
                      <li>• Time-of-use tariff optimisation</li>
                      <li>• Grid services participation</li>
                      <li>• Energy storage integration</li>
                      <li>• Demand response functionality</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-purple-200 font-medium mb-2">User Experience:</h6>
                    <ul className="space-y-1">
                      <li>• Authentication methods (RFID, app)</li>
                      <li>• Payment processing integration</li>
                      <li>• User interface design</li>
                      <li>• Accessibility compliance</li>
                      <li>• Multi-language support</li>
                      <li>• Customer support integration</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Market Trends and Future Developments</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-card p-4 rounded-lg mb-4 border-l-4 border-yellow-400">
                <h4 className="text-yellow-400 font-semibold mb-3">Emerging Technologies and Market Direction</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg border border-orange-500">
                  <h5 className="text-orange-300 font-bold mb-4">Technology Developments</h5>
                  <div className="space-y-3">
                    <div className="bg-orange-900/20 p-3 rounded">
                      <h6 className="text-orange-200 font-semibold mb-2">Ultra-Fast Charging:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• 350kW+ DC charging capabilities</li>
                        <li>• Liquid-cooled cable systems</li>
                        <li>• Battery thermal management integration</li>
                        <li>• Grid reinforcement requirements</li>
                        <li>• Vehicle compatibility limitations</li>
                      </ul>
                    </div>
                    <div className="bg-orange-900/20 p-3 rounded">
                      <h6 className="text-orange-200 font-semibold mb-2">Wireless Charging:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Inductive power transfer technology</li>
                        <li>• Static and dynamic charging options</li>
                        <li>• Efficiency and safety considerations</li>
                        <li>• Installation complexity factors</li>
                        <li>• Cost and maintenance implications</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-cyan-500">
                  <h5 className="text-cyan-300 font-bold mb-4">Market Evolution</h5>
                  <div className="space-y-3">
                    <div className="bg-cyan-900/20 p-3 rounded">
                      <h6 className="text-cyan-200 font-semibold mb-2">Integration Trends:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Vehicle-to-Grid (V2G) implementation</li>
                        <li>• Energy storage system integration</li>
                        <li>• Smart building system connectivity</li>
                        <li>• Renewable energy optimisation</li>
                        <li>• Carbon footprint reduction focus</li>
                      </ul>
                    </div>
                    <div className="bg-cyan-900/20 p-3 rounded">
                      <h6 className="text-cyan-200 font-semibold mb-2">Business Model Innovation:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Charging-as-a-Service offerings</li>
                        <li>• Subscription-based models</li>
                        <li>• Energy trading platforms</li>
                        <li>• Fleet management integration</li>
                        <li>• Multi-modal transport hubs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/30 p-4 rounded-lg border border-green-500">
                <h5 className="text-green-300 font-semibold mb-3">Professional Preparation Strategies</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h6 className="text-green-200 font-medium mb-2">Skills Development:</h6>
                    <ul className="space-y-1">
                      <li>• Continuous technology monitoring</li>
                      <li>• Manufacturer training participation</li>
                      <li>• Industry event attendance</li>
                      <li>• Professional network development</li>
                      <li>• Certification programme engagement</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-green-200 font-medium mb-2">Business Positioning:</h6>
                    <ul className="space-y-1">
                      <li>• Technology partnership development</li>
                      <li>• Service offering expansion</li>
                      <li>• Market niche identification</li>
                      <li>• Customer education programmes</li>
                      <li>• Competitive advantage building</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <SingleQuestionQuiz 
            questions={quizQuestions}
            title="Knowledge Check: Market-Ready Hardware"
          />

          <div className="flex justify-between mt-8">
            <Link to="../ev-charging-module-1-section-4">
              <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../ev-charging-module-1">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400">
                Complete Module
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EVChargingModule1Section5;