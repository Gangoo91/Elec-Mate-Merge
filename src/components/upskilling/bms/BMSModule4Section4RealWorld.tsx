import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, TrendingDown, Sun, CheckCircle } from 'lucide-react';

export const BMSModule4Section4RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building className="h-5 w-5 text-elec-yellow" />
          Real World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-gradient-to-r from-elec-gray to-gray-800/50 border border-gray-600/40 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-foreground">London Office Tower: Integrated Façade Automation</h3>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-blue-900/40 rounded-lg border border-blue-500/40">
                  <Sun className="h-6 w-6 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-blue-400">The Challenge</h4>
                    <p className="text-sm text-gray-300">
                      A 20-storey London office tower faced excessive cooling costs and occupant complaints about glare and heat gain, particularly on the west-facing façade during afternoon hours.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-800/60 rounded-lg p-4">
                  <h4 className="font-semibold mb-3 text-foreground">Original Problems:</h4>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>• West façade temperatures reaching 45°C in summer</li>
                    <li>• Cooling costs 40% above industry benchmarks</li>
                    <li>• Staff productivity issues due to glare and heat</li>
                    <li>• Manual blinds remained closed, blocking natural light</li>
                    <li>• Inconsistent internal temperatures across floors</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-green-900/40 rounded-lg border border-green-500/40">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-green-400">The Solution</h4>
                    <p className="text-sm text-gray-300">
                      Installation of intelligent motorised blinds integrated with solar sensors, BMS coordination for daylight harvesting, and automatic HVAC integration.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-800/60 rounded-lg p-4">
                  <h4 className="font-semibold mb-3 text-foreground">Implementation Details:</h4>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>• 240 motorised venetian blinds with individual control</li>
                    <li>• Solar tracking sensors on each façade</li>
                    <li>• BACnet integration with existing BMS system</li>
                    <li>• Daylight sensors linked to LED lighting controls</li>
                    <li>• Occupant override panels with 2-hour timeout</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Technical Implementation */}
            <div className="bg-gray-800/40 rounded-lg p-5">
              <h4 className="font-semibold mb-4 text-foreground text-lg">Technical Implementation</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <h5 className="font-semibold text-blue-300">Solar Control Strategy</h5>
                  <div className="text-sm text-foreground space-y-1">
                    <p>• Blinds automatically close when solar gain exceeds 300W/m²</p>
                    <p>• Angled slats redirect light to ceiling for natural illumination</p>
                    <p>• Tracking follows sun path throughout the day</p>
                    <p>• Weather station integration for cloud/storm response</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-semibold text-green-300">HVAC Integration</h5>
                  <div className="text-sm text-foreground space-y-1">
                    <p>• Reduced cooling setpoints when blinds provide shading</p>
                    <p>• Zone-based temperature control coordination</p>
                    <p>• Thermal mass utilisation during cooler periods</p>
                    <p>• Peak demand reduction during high-cost periods</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-semibold text-yellow-300">Lighting Coordination</h5>
                  <div className="text-sm text-foreground space-y-1">
                    <p>• Daylight harvesting reduces artificial lighting by 60%</p>
                    <p>• Gradual dimming prevents occupant distraction</p>
                    <p>• Task lighting automatically adjusts to blind position</p>
                    <p>• Emergency override maintains egress lighting</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Results and Benefits */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-900/30 border border-green-600/40 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingDown className="h-6 w-6 text-green-400" />
                  <h4 className="font-semibold text-green-400">Measured Results</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground">Energy Reduction:</span>
                    <span className="text-green-400 font-semibold">18%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Cooling Load Reduction:</span>
                    <span className="text-green-400 font-semibold">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Lighting Energy Savings:</span>
                    <span className="text-green-400 font-semibold">35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Annual Cost Savings:</span>
                    <span className="text-green-400 font-semibold">£47,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Payback Period:</span>
                    <span className="text-green-400 font-semibold">3.2 years</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-900/30 border border-blue-600/40 rounded-lg p-4">
                <h4 className="font-semibold mb-3 text-blue-400">Occupant Benefits</h4>
                <div className="space-y-2 text-sm text-foreground">
                  <p>• 40% reduction in glare complaints</p>
                  <p>• Improved thermal comfort scores (8.2/10)</p>
                  <p>• Increased natural light availability</p>
                  <p>• Better task lighting conditions</p>
                  <p>• Reduced eye strain and headaches</p>
                  <p>• Enhanced views while controlling heat</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-900/30 border border-yellow-600/40 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-yellow-400">Key Success Factors</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium mb-2 text-yellow-300">Technical:</h5>
                  <ul className="space-y-1 text-foreground">
                    <li>• Comprehensive sensor network providing accurate data</li>
                    <li>• Gradual blind movement preventing occupant disruption</li>
                    <li>• Proper integration testing before system handover</li>
                    <li>• Regular calibration maintaining optimal performance</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2 text-yellow-300">Operational:</h5>
                  <ul className="space-y-1 text-foreground">
                    <li>• Staff training on override functions and benefits</li>
                    <li>• Clear visual feedback on system operation</li>
                    <li>• Preventive maintenance programme ensuring reliability</li>
                    <li>• Continuous monitoring and performance optimisation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};