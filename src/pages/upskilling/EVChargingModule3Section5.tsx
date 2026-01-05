import { ArrowLeft, ArrowRight, Zap, BookOpen, Target, Lightbulb, TrendingUp, Battery, Sun, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { EVChargingModule3Section5Quiz } from '@/components/upskilling/quiz/EVChargingModule3Section5Quiz';

const EVChargingModule3Section5 = () => {
  useEffect(() => {
    document.title = 'Future-Proofing Installations - EV Charging Module 3 Section 5';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn to design future-proof EV charging installations with dual EV capability, PV integration, smart grid connectivity and expansion planning.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../ev-charging-module-3">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 3 - Section 5
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Future-Proofing Installations
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Designing EV charging installations for expansion, dual EV capability, PV integration, and smart grid connectivity
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Introduction</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Future-proofing EV charging installations is essential as electric vehicle adoption accelerates and charging technology evolves. This section covers strategies for designing installations that can accommodate multiple EVs, integrate renewable energy sources, and adapt to emerging smart grid technologies.
              </p>
              <p>
                Effective future-proofing requires understanding load growth patterns, renewable energy integration opportunities, and the evolving landscape of charging standards. By implementing scalable infrastructure and smart charging systems, installations can evolve with changing requirements whilst maximising investment value.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Learning Outcomes</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-4">Upon completion of this section, you will be able to:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Plan electrical infrastructure for multiple EV charging scenarios</li>
                <li>Design dual EV charging systems with intelligent load management</li>
                <li>Integrate PV solar systems with EV charging infrastructure</li>
                <li>Implement infrastructure sizing strategies for future expansion</li>
                <li>Specify smart grid integration capabilities and V2G systems</li>
                <li>Plan for evolving charging technologies and higher power levels</li>
              </ul>
            </CardContent>
          </Card>

          {/* Load Growth Planning */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-yellow-400" />
                Load Growth Planning
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Anticipating Additional Charging Points</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Statistical analysis: 40% of properties will have 2+ EVs by 2030</li>
                    <li>Workplace installations: 20% employee uptake rising to 60% by 2035</li>
                    <li>Infrastructure sizing for 150% of current requirements</li>
                    <li>Modular expansion points every 25m along cable routes</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Diversity Factor Evolution</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-600 p-2 text-left">Number of Charge Points</th>
                          <th className="border border-gray-600 p-2 text-left">Current Factor</th>
                          <th className="border border-gray-600 p-2 text-left">Smart Charging Factor</th>
                          <th className="border border-gray-600 p-2 text-left">Future Scenario</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 p-2">1-2</td>
                          <td className="border border-gray-600 p-2">1.0</td>
                          <td className="border border-gray-600 p-2">0.8</td>
                          <td className="border border-gray-600 p-2">Domestic dual charging</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">3-10</td>
                          <td className="border border-gray-600 p-2">0.7</td>
                          <td className="border border-gray-600 p-2">0.5</td>
                          <td className="border border-gray-600 p-2">Small commercial</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">11-50</td>
                          <td className="border border-gray-600 p-2">0.5</td>
                          <td className="border border-gray-600 p-2">0.3</td>
                          <td className="border border-gray-600 p-2">Workplace/retail</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">50+</td>
                          <td className="border border-gray-600 p-2">0.3</td>
                          <td className="border border-gray-600 p-2">0.2</td>
                          <td className="border border-gray-600 p-2">Fleet/destination</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Demand Forecasting Methods</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Household income correlation with EV adoption rates</li>
                    <li>Local authority EV strategy alignment</li>
                    <li>Building use pattern analysis (commuter vs visitor parking)</li>
                    <li>Grid connection capacity and upgrade pathways</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dual EV Charging Systems */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-green-400" />
                Dual EV Charging Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Load Balancing Strategies</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Dynamic load balancing: Real-time power allocation between charge points</li>
                    <li>Sequential charging: Priority-based charging queue management</li>
                    <li>Time-based balancing: Off-peak scheduling for overnight charging</li>
                    <li>Grid constraint management: Response to network capacity limitations</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Smart Charging Protocols</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>OCPP (Open Charge Point Protocol) for interoperability</li>
                    <li>ISO 15118 for plug-and-charge authentication</li>
                    <li>IEC 61851 safety and control pilot communication</li>
                    <li>Modbus/Ethernet integration with building management systems</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Priority Management Systems</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-800 p-3 rounded">
                      <h5 className="font-medium text-green-300 mb-2">Example: Dual 7kW Home Installation</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Total capacity: 11kW available (within DNO limit)</li>
                        <li>• Primary vehicle: Full 7kW when charging alone</li>
                        <li>• Dual charging: 5.5kW each (dynamic balancing)</li>
                        <li>• House load priority: EV charging reduces during peak demand</li>
                        <li>• Off-peak optimisation: Full power available 00:30-05:30</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PV Integration Strategies */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sun className="h-5 w-5 text-yellow-400" />
                PV Integration Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Solar-to-EV Direct Charging</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>DC-coupled systems: Direct DC charging from PV arrays</li>
                    <li>AC-coupled systems: Grid-tie inverter with smart charging control</li>
                    <li>Surplus energy diverters: Automatic switching to EV charging</li>
                    <li>Generation forecasting: Weather-based charging scheduling</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Battery Storage Integration</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>AC-coupled battery systems: 5-20kWh domestic storage</li>
                    <li>DC-coupled systems: Higher efficiency direct charging</li>
                    <li>Time-shifting strategies: Store solar for evening EV charging</li>
                    <li>Grid services: Battery arbitrage and frequency response</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">System Sizing Examples</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-800 p-3 rounded">
                      <h5 className="font-medium text-yellow-300 mb-2">Residential PV-EV System</h5>
                      <ul className="text-sm space-y-1">
                        <li>• PV Array: 6kWp (24 × 250W panels)</li>
                        <li>• Annual generation: ~5,400kWh</li>
                        <li>• EV consumption: 3,500kWh/year (12,000 miles)</li>
                        <li>• Solar charging: 60-70% of EV energy from PV</li>
                        <li>• Battery storage: 10kWh for evening charging</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Grid-Tie Considerations</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>G98/G99 connection requirements for PV systems</li>
                    <li>Export limitation and curtailment strategies</li>
                    <li>DNO notification for combined PV-EV installations</li>
                    <li>Smart export guarantee (SEG) integration</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Infrastructure Sizing */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Battery className="h-5 w-5 text-purple-400" />
                Infrastructure Sizing Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Oversizing Strategies</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Cable sizing: Install for ultimate load (not initial)</li>
                    <li>Consumer unit: 25% spare MCB capacity minimum</li>
                    <li>Main switch: Size for full charging load plus household</li>
                    <li>DNO connection: Consider upgrade pathways early</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Spare Capacity Calculations</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-600 p-2 text-left">Installation Type</th>
                          <th className="border border-gray-600 p-2 text-left">Current Load</th>
                          <th className="border border-gray-600 p-2 text-left">Future Provision</th>
                          <th className="border border-gray-600 p-2 text-left">Total Capacity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 p-2">Single dwelling</td>
                          <td className="border border-gray-600 p-2">7kW EV + 8kW house</td>
                          <td className="border border-gray-600 p-2">Second 7kW EV</td>
                          <td className="border border-gray-600 p-2">22kW supply</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Commercial 10 spaces</td>
                          <td className="border border-gray-600 p-2">3 × 7kW points</td>
                          <td className="border border-gray-600 p-2">10 × 7kW + 2 × 22kW</td>
                          <td className="border border-gray-600 p-2">150kW capacity</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Destination charging</td>
                          <td className="border border-gray-600 p-2">5 × 22kW</td>
                          <td className="border border-gray-600 p-2">20 × 22kW + 4 × 50kW</td>
                          <td className="border border-gray-600 p-2">800kW capacity</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Modular Expansion Approaches</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Submain cables: Install larger sizes with tapping points</li>
                    <li>Distribution boards: Modular systems for easy expansion</li>
                    <li>Earthing systems: Provision for additional earth electrodes</li>
                    <li>Containment routes: 40% spare capacity for additional cables</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Smart Grid Integration */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wifi className="h-5 w-5 text-cyan-400" />
                Smart Grid Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-2">Vehicle-to-Grid (V2G) Capabilities</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Bidirectional charging infrastructure: CCS and CHAdeMO compatibility</li>
                    <li>Grid connection requirements: G98/G99 bidirectional approval</li>
                    <li>Revenue opportunities: Frequency response (£10-40/MW/hour)</li>
                    <li>Technical requirements: Reactive power capability ±0.95 power factor</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-2">Demand Response Participation</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Automated demand reduction during network constraints</li>
                    <li>Time-of-use tariff optimization (Economy 7 evolution)</li>
                    <li>Distribution network operator (DNO) flexibility services</li>
                    <li>Aggregated response: Virtual power plant participation</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-cyan-400 mb-2">Time-of-Use Optimization</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-800 p-3 rounded">
                      <h5 className="font-medium text-cyan-300 mb-2">Example: Octopus Go Tariff Integration</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Off-peak: 00:30-04:30 at 7.5p/kWh</li>
                        <li>• Day rate: 05:00-00:00 at 30.9p/kWh</li>
                        <li>• Smart charging: 90% of charging in off-peak window</li>
                        <li>• Annual saving: £800-1,200 vs day rate charging</li>
                        <li>• V2G potential: Additional £300-600 revenue</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technology Evolution */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-red-400" />
                Technology Evolution Planning
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Higher Power Charging Standards</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Current: 7-22kW AC, 50-150kW DC mainstream</li>
                    <li>2025-2027: 350kW DC, 22kW AC standard for new installations</li>
                    <li>2028-2030: 800V vehicle architectures, MW-level charging</li>
                    <li>Infrastructure: 3-phase 400A supplies for commercial sites</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Wireless Charging Readiness</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Ground-mounted inductive charging pads (11-22kW)</li>
                    <li>Infrastructure requirements: Power electronics housing</li>
                    <li>Safety considerations: EMF exposure limits (ICNIRP)</li>
                    <li>Installation preparation: Ducted power feeds to parking areas</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Autonomous Vehicle Integration</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Automated connection systems: Robotic plug insertion</li>
                    <li>Communication infrastructure: 5G and V2X protocols</li>
                    <li>Charging bay design: Precise positioning requirements</li>
                    <li>Fleet management: Centralized charging optimization</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Future-Proofing Checklist</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>✓ Cable infrastructure sized for 150% current requirements</li>
                    <li>✓ Three-phase supply provision for single-phase installations</li>
                    <li>✓ Communication cable routes to all charge point locations</li>
                    <li>✓ Space provision for additional switchgear and meters</li>
                    <li>✓ Grid connection pathway for supply upgrades</li>
                    <li>✓ PV and battery storage integration readiness</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comprehensive Design Examples */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Battery className="h-5 w-5 text-indigo-400" />
                Comprehensive Design Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div>
                <h4 className="font-semibold text-indigo-400 mb-3">Case Study 1: Future-Proof Residential Development</h4>
                <div className="bg-gray-800 p-4 rounded-lg space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-indigo-300 mb-2">Development Overview</h5>
                      <ul className="text-sm space-y-1">
                        <li>• 50 new homes with integrated EV charging</li>
                        <li>• Phase 1: Single 7kW point per home</li>
                        <li>• Phase 2: Dual charging capability</li>
                        <li>• Phase 3: PV integration and storage</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-indigo-300 mb-2">Infrastructure Strategy</h5>
                      <ul className="text-sm space-y-1">
                        <li>• 11kV ring main with 4 × 500kVA substations</li>
                        <li>• Ducted network for future cable upgrades</li>
                        <li>• Smart meter infrastructure with OCPP backend</li>
                        <li>• Community energy storage (2MWh)</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-indigo-300 mb-2">Load Management Architecture</h5>
                    <div className="text-sm space-y-2">
                      <p><strong>Current Load:</strong> 50 × 7kW = 350kW (with 0.6 diversity = 210kW actual)</p>
                      <p><strong>Future Load:</strong> 100 × 7kW = 700kW (with smart charging = 300kW peak)</p>
                      <p><strong>PV Integration:</strong> 50 × 4kWp rooftop = 200kWp total generation</p>
                      <p><strong>Storage Strategy:</strong> 2MWh community + 50 × 13.5kWh domestic = 2.675MWh total</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-indigo-400 mb-3">Case Study 2: Commercial Office Complex</h4>
                <div className="bg-gray-800 p-4 rounded-lg space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-indigo-300 mb-2">Current Requirements</h5>
                      <ul className="text-sm space-y-1">
                        <li>• 200 parking spaces for 800 employees</li>
                        <li>• Phase 1: 40 × 7kW charging points</li>
                        <li>• EV adoption: 20% staff (160 employees)</li>
                        <li>• Peak demand: 8AM-6PM weekdays</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-indigo-300 mb-2">Expansion Planning</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Phase 2: 100 × 7kW (50% staff by 2027)</li>
                        <li>• Phase 3: 200 × 11kW (full coverage by 2030)</li>
                        <li>• Visitor rapid charging: 4 × 50kW</li>
                        <li>• Fleet charging: 10 × 22kW dedicated</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-indigo-300 mb-2">Renewable Integration Strategy</h5>
                    <div className="text-sm space-y-2">
                      <p><strong>Solar Canopy:</strong> 1MWp installation over 50% of parking area</p>
                      <p><strong>Battery Storage:</strong> 2MWh system for demand shifting and solar storage</p>
                      <p><strong>Grid Integration:</strong> Peak shaving from 2MW to 1.2MW during charging hours</p>
                      <p><strong>Smart Charging:</strong> Dynamic load balancing with building HVAC systems</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Economic Considerations */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-yellow-400" />
                Economic and Financial Planning
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Investment Strategies</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-medium text-emerald-300 mb-2">Phased Investment Approach</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Phase 1: Core infrastructure (50% capacity)</li>
                      <li>• Phase 2: Demand-driven expansion</li>
                      <li>• Phase 3: Advanced features and integration</li>
                      <li>• ROI target: 7-10 years for commercial installations</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-medium text-emerald-300 mb-2">Revenue Opportunities</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Charging fees: £0.30-0.50/kWh typical</li>
                      <li>• Grid services: £50-200/MW/hour</li>
                      <li>• Demand response: £0.10-0.30/kWh</li>
                      <li>• Solar export: £0.05-0.15/kWh (SEG rates)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">Cost-Benefit Analysis Example</h4>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium text-emerald-300 mb-2">25-Space Workplace Installation</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p><strong>Initial Costs:</strong></p>
                      <ul className="space-y-1">
                        <li>• Infrastructure: £45,000</li>
                        <li>• Charge points: £35,000</li>
                        <li>• Installation: £25,000</li>
                        <li>• Total: £105,000</li>
                      </ul>
                    </div>
                    <div>
                      <p><strong>Annual Revenue:</strong></p>
                      <ul className="space-y-1">
                        <li>• Charging income: £18,000</li>
                        <li>• Workplace benefit: £8,000</li>
                        <li>• Grid services: £3,000</li>
                        <li>• Total: £29,000</li>
                      </ul>
                    </div>
                    <div>
                      <p><strong>Payback Analysis:</strong></p>
                      <ul className="space-y-1">
                        <li>• Operating costs: £4,000/year</li>
                        <li>• Net annual return: £25,000</li>
                        <li>• Simple payback: 4.2 years</li>
                        <li>• 10-year NPV: £145,000</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emerging Technologies */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wifi className="h-5 w-5 text-violet-400" />
                Emerging Technology Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div>
                <h4 className="font-semibold text-violet-400 mb-3">Ultra-High Power Charging (350kW+)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-violet-300 mb-2">Infrastructure Requirements</h5>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Liquid-cooled cable systems (400A+ rating)</li>
                      <li>Dedicated 33kV supply with local transformation</li>
                      <li>Active cooling systems for power electronics</li>
                      <li>High-speed communication networks (5G integration)</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-violet-300 mb-2">Vehicle Compatibility</h5>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>800V vehicle architectures (Porsche, Hyundai)</li>
                      <li>Silicon carbide inverters for efficiency</li>
                      <li>Thermal management integration</li>
                      <li>Plug-and-charge authentication (ISO 15118-20)</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-violet-400 mb-3">Wireless Power Transfer Systems</h4>
                <div className="space-y-3">
                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-medium text-violet-300 mb-2">Static Wireless Charging</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <p><strong>Power Levels:</strong></p>
                        <ul className="space-y-1">
                          <li>• Level 1: 3.7kW domestic applications</li>
                          <li>• Level 2: 11kW commercial/public</li>
                          <li>• Level 3: 22kW fleet and depot charging</li>
                        </ul>
                      </div>
                      <div>
                        <p><strong>Installation Considerations:</strong></p>
                        <ul className="space-y-1">
                          <li>• Ground preparation and coil embedding</li>
                          <li>• Position accuracy requirements (±50mm)</li>
                          <li>• EMF shielding and safety compliance</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-violet-400 mb-3">Artificial Intelligence Applications</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-medium text-violet-300 mb-2">Predictive Analytics</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Demand forecasting using weather and traffic data</li>
                      <li>• Equipment failure prediction and maintenance</li>
                      <li>• User behaviour analysis for optimal pricing</li>
                      <li>• Grid stability prediction and response</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800 p-3 rounded">
                    <h5 className="font-medium text-violet-300 mb-2">Optimization Algorithms</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Multi-objective optimization (cost, time, grid impact)</li>
                      <li>• Machine learning for charging pattern recognition</li>
                      <li>• Real-time load balancing with renewable integration</li>
                      <li>• Dynamic pricing based on grid conditions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <EVChargingModule3Section5Quiz />

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8">
            <Link to="../ev-charging-module-3-section-4">
              <Button variant="outline" className="bg-card border-gray-600 text-white hover:bg-gray-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../ev-charging-module-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Module
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
};

export default EVChargingModule3Section5;