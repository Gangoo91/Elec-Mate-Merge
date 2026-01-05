import { Zap, Power, Cpu, HardDrive, Cable, Router, Gauge, AlertTriangle, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const PassiveActiveContent = () => {
  return (
    <div className="space-y-6">
      {/* Simple Explanation */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Cpu className="h-5 w-5 text-elec-yellow" />
            What Are Passive and Active Components?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <p className="leading-relaxed text-lg">
            Think of network components like the difference between pipes and pumps in a water system.
          </p>
          
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-3">Simple Analogy</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-blue-300 mb-2">Passive = Pipes & Fittings</h5>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Just like water pipes, cables and connectors simply carry signals from one place to another. 
                  They don&apos;t need power and don&apos;t change the signal.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-green-300 mb-2">Active = Pumps & Valves</h5>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Like pumps that boost water pressure, switches and routers need power to amplify, 
                  direct, and manage network signals.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Passive Components */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Cable className="h-5 w-5 text-elec-yellow" />
            Passive Network Components
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <p className="leading-relaxed">
            Passive components do not require electrical power to function and simply provide physical 
            pathways for signals to travel. They form the foundation of structured cabling systems.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-300 mb-3">Cable Types</h4>
                <ul className="space-y-2 text-blue-100 text-sm">
                  <li>• <strong>Copper cables:</strong> Cat 5e, Cat 6, Cat 6A, Cat 8</li>
                  <li>• <strong>Fibre optic cables:</strong> Single-mode, multi-mode</li>
                  <li>• <strong>Coaxial cables:</strong> For specific applications</li>
                  <li>• <strong>Backbone cables:</strong> High-capacity inter-building links</li>
                </ul>
              </div>
              
              <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-300 mb-3">Connectors & Outlets</h4>
                <ul className="space-y-2 text-green-100 text-sm">
                  <li>• RJ45 connectors and wall outlets</li>
                  <li>• Fibre optic connectors (SC, LC, ST)</li>
                  <li>• Patch panels and cross-connect blocks</li>
                  <li>• Keystone jacks and faceplates</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-purple-300 mb-3">Infrastructure Components</h4>
                <ul className="space-y-2 text-purple-100 text-sm">
                  <li>• Cable trays and conduits</li>
                  <li>• Racks and cabinets</li>
                  <li>• Cable management systems</li>
                  <li>• Grounding and bonding equipment</li>
                </ul>
              </div>
              
              <div className="bg-orange-600/20 border border-orange-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-orange-300 mb-3">Testing Equipment</h4>
                <ul className="space-y-2 text-orange-100 text-sm">
                  <li>• Cable testers and certifiers</li>
                  <li>• Patch cords and test leads</li>
                  <li>• Optical time domain reflectometers (OTDR)</li>
                  <li>• Network analysers</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/30 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">Key Characteristics of Passive Components</h4>
            <div className="grid md:grid-cols-3 gap-4 mt-3">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600/30 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Zap className="h-6 w-6 text-green-400" />
                </div>
                <p className="text-sm font-medium text-green-300">No Power Required</p>
                <p className="text-xs text-gray-400">Operate without electricity</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600/30 rounded-full flex items-center justify-center mx-auto mb-2">
                  <HardDrive className="h-6 w-6 text-blue-400" />
                </div>
                <p className="text-sm font-medium text-blue-300">High Reliability</p>
                <p className="text-xs text-gray-400">Fewer points of failure</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600/30 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Gauge className="h-6 w-6 text-purple-400" />
                </div>
                <p className="text-sm font-medium text-purple-300">Lower Maintenance</p>
                <p className="text-xs text-gray-400">Minimal ongoing costs</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Components */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Router className="h-5 w-5 text-elec-yellow" />
            Active Network Components
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <p className="leading-relaxed">
            Active components require electrical power to operate and provide signal processing, 
            amplification, switching, and routing capabilities. They enable network intelligence and management.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-red-300 mb-3">Network Switches</h4>
                <ul className="space-y-2 text-red-100 text-sm">
                  <li>• <strong>Unmanaged switches:</strong> Basic plug-and-play operation</li>
                  <li>• <strong>Managed switches:</strong> Advanced features and control</li>
                  <li>• <strong>PoE switches:</strong> Power over Ethernet capability</li>
                  <li>• <strong>Layer 3 switches:</strong> Routing capabilities</li>
                </ul>
              </div>
              
              <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-300 mb-3">Routers & Gateways</h4>
                <ul className="space-y-2 text-yellow-100 text-sm">
                  <li>• Internet routers and firewalls</li>
                  <li>• Wireless access points</li>
                  <li>• VPN concentrators</li>
                  <li>• Network gateways</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-cyan-600/20 border border-cyan-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-cyan-300 mb-3">Signal Processing</h4>
                <ul className="space-y-2 text-cyan-100 text-sm">
                  <li>• Media converters (copper to fibre)</li>
                  <li>• Signal repeaters and amplifiers</li>
                  <li>• Protocol converters</li>
                  <li>• Network interface cards (NICs)</li>
                </ul>
              </div>
              
              <div className="bg-indigo-600/20 border border-indigo-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-indigo-300 mb-3">Management & Monitoring</h4>
                <ul className="space-y-2 text-indigo-100 text-sm">
                  <li>• Network management systems</li>
                  <li>• Monitoring appliances</li>
                  <li>• Power distribution units (PDUs)</li>
                  <li>• Uninterruptible power supplies (UPS)</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/30 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">Key Characteristics of Active Components</h4>
            <div className="grid md:grid-cols-3 gap-4 mt-3">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-600/30 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Power className="h-6 w-6 text-red-400" />
                </div>
                <p className="text-sm font-medium text-red-300">Power Dependent</p>
                <p className="text-xs text-gray-400">Require electrical supply</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600/30 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Cpu className="h-6 w-6 text-green-400" />
                </div>
                <p className="text-sm font-medium text-green-300">Intelligent Processing</p>
                <p className="text-xs text-gray-400">Manage and route traffic</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-600/30 rounded-full flex items-center justify-center mx-auto mb-2">
                  <AlertTriangle className="h-6 w-6 text-yellow-400" />
                </div>
                <p className="text-sm font-medium text-yellow-300">Higher Complexity</p>
                <p className="text-xs text-gray-400">More maintenance required</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Gauge className="h-5 w-5 text-elec-yellow" />
            Passive vs Active Comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-3 text-foreground">Aspect</th>
                  <th className="text-left p-3 text-foreground">Passive Components</th>
                  <th className="text-left p-3 text-foreground">Active Components</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="p-3 font-medium">Power Requirements</td>
                  <td className="p-3 text-green-400">None required</td>
                  <td className="p-3 text-red-400">Electrical power needed</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3 font-medium">Cost</td>
                  <td className="p-3 text-green-400">Lower initial & operating</td>
                  <td className="p-3 text-yellow-400">Higher initial & operating</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3 font-medium">Reliability</td>
                  <td className="p-3 text-green-400">Very high</td>
                  <td className="p-3 text-yellow-400">Good (power dependent)</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3 font-medium">Functionality</td>
                  <td className="p-3 text-red-400">Signal transmission only</td>
                  <td className="p-3 text-green-400">Signal processing & management</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3 font-medium">Maintenance</td>
                  <td className="p-3 text-green-400">Minimal</td>
                  <td className="p-3 text-yellow-400">Regular updates & monitoring</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Lifespan</td>
                  <td className="p-3 text-green-400">15-25 years</td>
                  <td className="p-3 text-yellow-400">3-7 years</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Cost Analysis */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            Total Cost of Ownership Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <p className="leading-relaxed">
            Understanding the true cost of passive vs active components requires analysing both initial 
            investment and ongoing operational expenses over the entire lifecycle of the infrastructure.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-300 mb-3">Passive Infrastructure Costs</h4>
              <div className="space-y-3 text-blue-100 text-sm">
                <div>
                  <strong>Initial Investment:</strong>
                  <ul className="mt-1 space-y-1 ml-4">
                    <li>• High-quality cables and connectors</li>
                    <li>• Installation labour and certification</li>
                    <li>• Cable management systems</li>
                    <li>• Testing and documentation</li>
                  </ul>
                </div>
                <div>
                  <strong>Ongoing Costs (per year):</strong>
                  <ul className="mt-1 space-y-1 ml-4">
                    <li>• Minimal maintenance (1-2% of initial cost)</li>
                    <li>• Occasional re-certification</li>
                    <li>• Physical damage repairs</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-red-300 mb-3">Active Equipment Costs</h4>
              <div className="space-y-3 text-red-100 text-sm">
                <div>
                  <strong>Initial Investment:</strong>
                  <ul className="mt-1 space-y-1 ml-4">
                    <li>• Switches, routers, and management systems</li>
                    <li>• Power and cooling infrastructure</li>
                    <li>• Monitoring and management software</li>
                    <li>• Initial configuration and setup</li>
                  </ul>
                </div>
                <div>
                  <strong>Ongoing Costs (per year):</strong>
                  <ul className="mt-1 space-y-1 ml-4">
                    <li>• Power consumption (10-15% of purchase price)</li>
                    <li>• Cooling and environmental control</li>
                    <li>• Software licenses and support</li>
                    <li>• Regular firmware updates</li>
                    <li>• Replacement every 3-7 years</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/30 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">15-Year Cost Comparison Example</h4>
            <p className="text-gray-300 text-sm mb-3">
              For a 100-port network installation:
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-blue-300">Passive Infrastructure:</strong>
                <ul className="mt-1 space-y-1 text-gray-300">
                  <li>• Initial: £15,000 (Cat 6A cabling)</li>
                  <li>• Annual: £300 (2% maintenance)</li>
                  <li>• 15-year total: £19,500</li>
                </ul>
              </div>
              <div>
                <strong className="text-red-300">Active Equipment:</strong>
                <ul className="mt-1 space-y-1 text-gray-300">
                  <li>• Initial: £12,000 (switches)</li>
                  <li>• Annual: £2,400 (power, support, refresh)</li>
                  <li>• 15-year total: £48,000</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance and Reliability */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Shield className="h-5 w-5 text-elec-yellow" />
            Maintenance and Reliability Considerations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <p className="leading-relaxed">
            Maintenance requirements and reliability characteristics differ significantly between 
            passive and active components, affecting both operational costs and network availability.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-300 mb-3">Passive Component Maintenance</h4>
                <ul className="space-y-2 text-green-100 text-sm">
                  <li>• <strong>Visual inspections:</strong> Annual cable tray and pathway checks</li>
                  <li>• <strong>Performance testing:</strong> 3-5 year certification testing</li>
                  <li>• <strong>Physical protection:</strong> Monitor for damage or degradation</li>
                  <li>• <strong>Documentation updates:</strong> Track any moves, adds, changes</li>
                  <li>• <strong>Cleaning:</strong> Fibre connector maintenance as needed</li>
                </ul>
                <div className="mt-3 p-2 bg-green-700/20 rounded">
                  <p className="text-green-200 text-xs">
                    <strong>MTBF:</strong> 25+ years for quality copper cables<br/>
                    <strong>Typical failure rate:</strong> &lt;0.1% annually
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-300 mb-3">Passive Troubleshooting</h4>
                <ul className="space-y-1 text-blue-100 text-sm">
                  <li>• Cable testing with certification equipment</li>
                  <li>• Visual inspection of connectors and terminations</li>
                  <li>• OTDR testing for fibre optic cables</li>
                  <li>• Physical pathway inspection</li>
                  <li>• Documentation review and verification</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-300 mb-3">Active Equipment Maintenance</h4>
                <ul className="space-y-2 text-yellow-100 text-sm">
                  <li>• <strong>Firmware updates:</strong> Quarterly security and feature updates</li>
                  <li>• <strong>Performance monitoring:</strong> Continuous traffic and health monitoring</li>
                  <li>• <strong>Environmental control:</strong> Temperature and power monitoring</li>
                  <li>• <strong>Backup procedures:</strong> Configuration backup and recovery</li>
                  <li>• <strong>Preventive replacement:</strong> Fans, power supplies, batteries</li>
                </ul>
                <div className="mt-3 p-2 bg-yellow-700/20 rounded">
                  <p className="text-yellow-200 text-xs">
                    <strong>MTBF:</strong> 5-8 years for enterprise switches<br/>
                    <strong>Typical failure rate:</strong> 2-5% annually
                  </p>
                </div>
              </div>
              
              <div className="bg-orange-600/20 border border-orange-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-orange-300 mb-3">Active Troubleshooting</h4>
                <ul className="space-y-1 text-orange-100 text-sm">
                  <li>• Log analysis and event monitoring</li>
                  <li>• Performance metrics and trending</li>
                  <li>• Protocol analysis and debugging</li>
                  <li>• Hardware diagnostic commands</li>
                  <li>• Configuration verification and rollback</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Examples */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <HardDrive className="h-5 w-5 text-elec-yellow" />
            Real-World Implementation Examples
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <p className="leading-relaxed">
            Different environments and applications require different approaches to balancing 
            passive and active components. Here are practical implementation strategies.
          </p>
          
          <div className="space-y-4">
            <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-purple-300 mb-3">Data Centre Implementation</h4>
              <div className="grid md:grid-cols-2 gap-4 text-purple-100 text-sm">
                <div>
                  <strong>Passive Foundation:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Single-mode fibre backbone (40+ year lifespan)</li>
                    <li>• Pre-terminated copper for server connections</li>
                    <li>• Structured cable management with 40% spare capacity</li>
                    <li>• Multiple pathway diversity for resilience</li>
                  </ul>
                </div>
                <div>
                  <strong>Active Layer:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Top-of-rack switches for server connectivity</li>
                    <li>• Core switches with redundant designs</li>
                    <li>• Intelligent PDUs for power management</li>
                    <li>• Monitoring systems for proactive management</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-cyan-600/20 border border-cyan-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-cyan-300 mb-3">Industrial Environment</h4>
              <div className="grid md:grid-cols-2 gap-4 text-cyan-100 text-sm">
                <div>
                  <strong>Passive Emphasis:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Ruggedised cables in sealed conduits</li>
                    <li>• Industrial connectors with IP67 rating</li>
                    <li>• Fiber to harsh areas, copper in protected zones</li>
                    <li>• Passive optical splitters for sensor networks</li>
                  </ul>
                </div>
                <div>
                  <strong>Protected Active Equipment:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Industrial switches in climate-controlled rooms</li>
                    <li>• Media converters at environment boundaries</li>
                    <li>• Redundant power with UPS protection</li>
                    <li>• Remote monitoring from safe locations</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-600/20 border border-indigo-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-300 mb-3">Modern Office Building</h4>
              <div className="grid md:grid-cols-2 gap-4 text-indigo-100 text-sm">
                <div>
                  <strong>Structured Passive Infrastructure:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Cat 6A horizontal cabling to all outlets</li>
                    <li>• Fibre backbone between floors and buildings</li>
                    <li>• High-density patch panels in telecom rooms</li>
                    <li>• Future-ready conduit space for expansion</li>
                  </ul>
                </div>
                <div>
                  <strong>Intelligent Active Layer:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• PoE+ switches for device power delivery</li>
                    <li>• Managed switches with VLAN capabilities</li>
                    <li>• Wireless controllers and access points</li>
                    <li>• Network management and security appliances</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Design Strategies */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            Design Strategy: When to Use Each Approach
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-green-300 mb-2">Favour Passive When:</h4>
                <ul className="space-y-1 text-green-100 text-sm">
                  <li>• Long-term infrastructure investment needed</li>
                  <li>• Minimal ongoing maintenance desired</li>
                  <li>• High reliability is critical</li>
                  <li>• Power availability is limited</li>
                  <li>• Environmental conditions are harsh</li>
                  <li>• Simple point-to-point connections sufficient</li>
                </ul>
              </div>
              
              <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-blue-300 mb-2">Best Practices for Passive Design</h4>
                <ul className="space-y-1 text-blue-100 text-sm">
                  <li>• Use high-quality cables and connectors</li>
                  <li>• Plan for future capacity needs</li>
                  <li>• Implement proper cable management</li>
                  <li>• Follow structured cabling standards</li>
                  <li>• Document all connections thoroughly</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-purple-300 mb-2">Favour Active When:</h4>
                <ul className="space-y-1 text-purple-100 text-sm">
                  <li>• Network intelligence and management needed</li>
                  <li>• Multiple protocols must be supported</li>
                  <li>• Traffic prioritisation is required</li>
                  <li>• Security features are essential</li>
                  <li>• Remote monitoring and control needed</li>
                  <li>• Flexible configuration changes required</li>
                </ul>
              </div>
              
              <div className="bg-orange-600/20 border border-orange-600/30 rounded-lg p-4">
                <h4 className="font-semibold text-orange-300 mb-2">Best Practices for Active Design</h4>
                <ul className="space-y-1 text-orange-100 text-sm">
                  <li>• Plan for redundant power supplies</li>
                  <li>• Implement proper cooling systems</li>
                  <li>• Schedule regular firmware updates</li>
                  <li>• Monitor performance continuously</li>
                  <li>• Maintain spare equipment inventory</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};