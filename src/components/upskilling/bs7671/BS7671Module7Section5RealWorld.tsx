import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Home, Factory } from 'lucide-react';

export const BS7671Module7Section5RealWorld = () => {
  return (
    <Card className="bg-gradient-to-r from-emerald-900/20 to-elec-gray border-emerald-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building className="h-5 w-5 text-elec-yellow" />
          Real-World Implementation Scenarios
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-emerald-600 text-foreground">Case Studies</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-elec-dark border-blue-600/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-foreground flex items-center gap-2 text-lg">
                <Home className="h-4 w-4 text-blue-400" />
                Domestic PEI System
              </CardTitle>
              <Badge variant="outline" className="w-fit text-blue-400 border-blue-400">4kW Solar + 9.6kWh Battery</Badge>
            </CardHeader>
            <CardContent className="text-foreground space-y-3">
              <div className="space-y-2">
                <h6 className="text-blue-400 font-medium">System Configuration:</h6>
                <ul className="text-sm space-y-1">
                  <li>• 4kWp solar PV array (16 × 250W panels)</li>
                  <li>• 4kW hybrid inverter with MPPT</li>
                  <li>• 9.6kWh lithium-ion battery storage</li>
                  <li>• 7kW EV charger with smart scheduling</li>
                  <li>• Home energy management system</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h6 className="text-blue-400 font-medium">Typical Performance:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Annual generation: 3,500kWh</li>
                  <li>• Self-consumption: 75% (2,625kWh)</li>
                  <li>• Grid export: 875kWh</li>
                  <li>• Grid import reduction: 60%</li>
                  <li>• Annual savings: £800-£1,200</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h6 className="text-blue-400 font-medium">Key Benefits:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Reduced electricity bills</li>
                  <li>• Backup power during outages</li>
                  <li>• EV charging cost optimisation</li>
                  <li>• Carbon footprint reduction</li>
                  <li>• Increased property value</li>
                </ul>
              </div>

              <div className="bg-gray-800 p-2 rounded">
                <p className="text-xs text-gray-400 mb-1">Investment Recovery</p>
                <p className="text-sm text-green-400">7-10 years typical payback</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-elec-dark border-green-600/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-foreground flex items-center gap-2 text-lg">
                <Building className="h-4 w-4 text-green-400" />
                Commercial Office Building
              </CardTitle>
              <Badge variant="outline" className="w-fit text-green-400 border-green-400">50kW Solar + 100kWh Storage</Badge>
            </CardHeader>
            <CardContent className="text-foreground space-y-3">
              <div className="space-y-2">
                <h6 className="text-green-400 font-medium">System Configuration:</h6>
                <ul className="text-sm space-y-1">
                  <li>• 50kWp rooftop solar installation</li>
                  <li>• 50kW three-phase inverter system</li>
                  <li>• 100kWh commercial battery system</li>
                  <li>• Advanced energy management system</li>
                  <li>• EV charging infrastructure (10 × 7kW)</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h6 className="text-green-400 font-medium">Business Benefits:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Peak demand reduction: 30%</li>
                  <li>• Annual electricity savings: £15,000</li>
                  <li>• Carbon reduction: 25 tonnes CO₂/year</li>
                  <li>• Employee EV charging benefits</li>
                  <li>• Enhanced corporate sustainability</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h6 className="text-green-400 font-medium">Grid Services Revenue:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Frequency response: £3,000/year</li>
                  <li>• Demand side response: £2,000/year</li>
                  <li>• Capacity market: £5,000/year</li>
                  <li>• Time-of-use optimisation</li>
                  <li>• Export revenue during low demand</li>
                </ul>
              </div>

              <div className="bg-gray-800 p-2 rounded">
                <p className="text-xs text-gray-400 mb-1">Total Annual Benefit</p>
                <p className="text-sm text-green-400">£25,000 cost savings + revenue</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-elec-dark border-purple-600/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-foreground flex items-center gap-2 text-lg">
                <Factory className="h-4 w-4 text-purple-400" />
                Industrial Microgrid
              </CardTitle>
              <Badge variant="outline" className="w-fit text-purple-400 border-purple-400">500kW Solar + 1MWh Storage</Badge>
            </CardHeader>
            <CardContent className="text-foreground space-y-3">
              <div className="space-y-2">
                <h6 className="text-purple-400 font-medium">System Configuration:</h6>
                <ul className="text-sm space-y-1">
                  <li>• 500kWp ground-mounted solar farm</li>
                  <li>• 500kW central inverter station</li>
                  <li>• 1MWh containerised battery system</li>
                  <li>• Advanced microgrid controller</li>
                  <li>• CHP backup generation (200kW)</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h6 className="text-purple-400 font-medium">Operational Advantages:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Energy independence: 70% self-sufficient</li>
                  <li>• Demand charge reduction: 40%</li>
                  <li>• Process continuity during grid outages</li>
                  <li>• Power quality improvement</li>
                  <li>• Predictable energy costs</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h6 className="text-purple-400 font-medium">Advanced Features:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Island mode operation capability</li>
                  <li>• Grid services participation</li>
                  <li>• Process load optimisation</li>
                  <li>• Waste heat recovery integration</li>
                  <li>• Predictive maintenance systems</li>
                </ul>
              </div>

              <div className="bg-gray-800 p-2 rounded">
                <p className="text-xs text-gray-400 mb-1">Annual Savings</p>
                <p className="text-sm text-green-400">£150,000+ energy costs</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Implementation Challenges & Solutions:</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="text-red-400 font-medium mb-2">Common Installation Challenges:</h6>
              <div className="space-y-3">
                <div className="bg-gray-800 p-3 rounded">
                  <h6 className="text-orange-400 text-sm font-medium">Network Capacity Constraints</h6>
                  <p className="text-xs text-gray-300 mb-2">Limited export capacity on local distribution network</p>
                  <p className="text-xs text-blue-300">Solution: Dynamic export limitation and flexible connection agreements</p>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <h6 className="text-orange-400 text-sm font-medium">Planning Permission Delays</h6>
                  <p className="text-xs text-gray-300 mb-2">Extended approval times for larger installations</p>
                  <p className="text-xs text-blue-300">Solution: Early engagement with planning authorities and pre-application discussions</p>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <h6 className="text-orange-400 text-sm font-medium">Grid Connection Complexity</h6>
                  <p className="text-xs text-gray-300 mb-2">Technical requirements for G99 applications</p>
                  <p className="text-xs text-blue-300">Solution: Specialist grid connection consultancy and phased implementation</p>
                </div>
              </div>
            </div>
            <div>
              <h6 className="text-green-400 font-medium mb-2">Success Factors:</h6>
              <div className="space-y-3">
                <div className="bg-gray-800 p-3 rounded">
                  <h6 className="text-emerald-400 text-sm font-medium">Early Stakeholder Engagement</h6>
                  <p className="text-xs text-gray-300">Involving DNO, planners, and end users from project inception</p>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <h6 className="text-emerald-400 text-sm font-medium">Comprehensive Energy Audit</h6>
                  <p className="text-xs text-gray-300">Detailed analysis of load profiles and energy usage patterns</p>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <h6 className="text-emerald-400 text-sm font-medium">Modular System Design</h6>
                  <p className="text-xs text-gray-300">Scalable architecture allowing phased deployment and expansion</p>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <h6 className="text-emerald-400 text-sm font-medium">Ongoing Performance Monitoring</h6>
                  <p className="text-xs text-gray-300">Continuous optimisation and predictive maintenance programmes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Future Trends & Emerging Applications:</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="text-cyan-400 font-medium mb-2">Technology Integration Trends:</h6>
              <ul className="text-sm space-y-1">
                <li>• Vehicle-to-Grid (V2G) becoming mainstream</li>
                <li>• Heat pump integration with PV and storage</li>
                <li>• Hydrogen production for long-term storage</li>
                <li>• AI-driven energy management optimisation</li>
                <li>• Peer-to-peer energy trading platforms</li>
                <li>• Integration with smart home ecosystems</li>
              </ul>
            </div>
            <div>
              <h6 className="text-sky-400 font-medium mb-2">Market Developments:</h6>
              <ul className="text-sm space-y-1">
                <li>• Community energy schemes expansion</li>
                <li>• Corporate renewable energy procurement</li>
                <li>• Energy-as-a-Service business models</li>
                <li>• Green finance and sustainability reporting</li>
                <li>• Regulatory support for flexibility services</li>
                <li>• Carbon pricing mechanisms integration</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Key Performance Indicators (KPIs) for PEI Systems:</h5>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-gray-800 p-3 rounded text-center">
              <h6 className="text-green-400 font-medium mb-1">Self-Consumption</h6>
              <p className="text-2xl font-bold text-foreground">75%+</p>
              <p className="text-xs text-gray-400">Target for residential systems</p>
            </div>
            <div className="bg-gray-800 p-3 rounded text-center">
              <h6 className="text-blue-400 font-medium mb-1">System Efficiency</h6>
              <p className="text-2xl font-bold text-foreground">85%+</p>
              <p className="text-xs text-gray-400">Overall energy conversion</p>
            </div>
            <div className="bg-gray-800 p-3 rounded text-center">
              <h6 className="text-purple-400 font-medium mb-1">Availability</h6>
              <p className="text-2xl font-bold text-foreground">99.5%+</p>
              <p className="text-xs text-gray-400">System uptime target</p>
            </div>
            <div className="bg-gray-800 p-3 rounded text-center">
              <h6 className="text-orange-400 font-medium mb-1">Payback Period</h6>
              <p className="text-2xl font-bold text-foreground">6-8</p>
              <p className="text-xs text-gray-400">Years for commercial systems</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};