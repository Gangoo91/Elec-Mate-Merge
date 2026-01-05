import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, TrendingDown, Zap, CheckCircle, AlertTriangle, Settings } from 'lucide-react';

export const BMSModule4Section5RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building className="h-5 w-5 text-elec-yellow" />
          Real World Implementation Case Study
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-gradient-to-r from-elec-gray to-gray-800/50 border border-gray-600/40 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Manchester Business Park: Advanced Integration Success</h3>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-red-900/40 rounded-lg border border-red-500/40">
                  <AlertTriangle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-red-400">The Challenge</h4>
                    <p className="text-sm text-gray-300">
                      A 15,000m² Manchester business park struggled with excessive energy costs, occupant complaints about inconsistent comfort, and inability to meet carbon reduction targets.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-800/60 rounded-lg p-4">
                  <h4 className="font-semibold mb-3 text-foreground">Original System Problems:</h4>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>• Independent lighting and HVAC control systems with no coordination</li>
                    <li>• Energy costs 60% above industry benchmarks for similar buildings</li>
                    <li>• Frequent occupant complaints about temperature swings and glare issues</li>
                    <li>• Manual lighting systems remained on continuously during daylight hours</li>
                    <li>• HVAC systems operated at full capacity regardless of actual occupancy</li>
                    <li>• Peak demand charges represented 40% of total electricity costs</li>
                    <li>• Poor air quality affecting tenant satisfaction and lease renewals</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-green-900/40 rounded-lg border border-green-500/40">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-green-400">The Integration Solution</h4>
                    <p className="text-sm text-gray-300">
                      Complete integration of lighting, HVAC, and environmental controls through advanced BMS coordination, featuring intelligent sensors and predictive algorithms.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-800/60 rounded-lg p-4">
                  <h4 className="font-semibold mb-3 text-foreground">Implementation Components:</h4>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>• 450 multi-technology occupancy sensors with PIR and ultrasonic detection</li>
                    <li>• Comprehensive daylight harvesting system with photocells and automated blinds</li>
                    <li>• BACnet integration linking lighting controllers with HVAC system</li>
                    <li>• CO₂ and air quality sensors coordinating ventilation with occupancy</li>
                    <li>• Weather station providing predictive environmental data for system optimization</li>
                    <li>• Energy meters enabling real-time monitoring and demand response</li>
                    <li>• Mobile app providing tenant control whilst maintaining energy efficiency</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Detailed Technical Implementation */}
            <div className="bg-gray-800/40 rounded-lg p-5">
              <h4 className="font-semibold mb-4 text-foreground text-lg">Technical Implementation Details</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <h5 className="font-semibold text-blue-300">Advanced Occupancy Control</h5>
                  <div className="text-sm text-foreground space-y-1">
                    <p>• Dual-technology sensors eliminate false triggers and improve accuracy</p>
                    <p>• Immediate lighting response with 5-minute HVAC delay for comfort</p>
                    <p>• Zone-based control allowing partial area conditioning</p>
                    <p>• Calendar integration for predictive pre-conditioning</p>
                    <p>• Machine learning algorithms adapt to usage patterns</p>
                    <p>• Override functions with automatic timeout after 2 hours</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-semibold text-green-300">Daylight Integration Strategy</h5>
                  <div className="text-sm text-foreground space-y-1">
                    <p>• Photocells on each facade provide zone-specific daylight data</p>
                    <p>• Gradual LED dimming prevents occupant distraction</p>
                    <p>• HVAC cooling loads automatically reduced as lighting dims</p>
                    <p>• Automated blind control coordinates with lighting for glare prevention</p>
                    <p>• Seasonal daylight compensation maintains consistent illumination</p>
                    <p>• Task lighting adjustment based on workstation requirements</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-semibold text-yellow-300">Peak Demand Management</h5>
                  <div className="text-sm text-foreground space-y-1">
                    <p>• Real-time utility pricing integration for cost optimization</p>
                    <p>• Coordinated load shedding during peak tariff periods</p>
                    <p>• Thermal mass utilization for pre-cooling during off-peak hours</p>
                    <p>• Battery storage system integration for demand smoothing</p>
                    <p>• Tenant notification system for voluntary conservation periods</p>
                    <p>• Grid-interactive demand response participation</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Electrician's Installation Process */}
            <div className="bg-blue-900/30 border border-blue-600/40 rounded-lg p-5">
              <h4 className="font-semibold mb-4 text-blue-400 text-lg">Electrician's Integration Installation Process</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold mb-3 text-foreground">Phase 1: Infrastructure Installation</h5>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>• Installed dedicated communication backbone using CAT6 cabling</li>
                    <li>• Retrofitted existing lighting circuits with DALI control modules</li>
                    <li>• Added interface relays between lighting and HVAC control systems</li>
                    <li>• Implemented proper earthing and surge protection throughout</li>
                    <li>• Created comprehensive circuit labelling system for commissioning</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-3 text-foreground">Phase 2: Sensor Integration</h5>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>• Strategically positioned multi-zone occupancy sensors for optimal coverage</li>
                    <li>• Installed daylight sensors with signal conditioning for accurate readings</li>
                    <li>• Connected CO₂ sensors to both ventilation and occupancy logic</li>
                    <li>• Established weather station with data distribution to multiple systems</li>
                    <li>• Implemented redundant sensor backup systems for critical areas</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Comprehensive Results and Benefits */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-900/30 border border-green-600/40 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingDown className="h-6 w-6 text-green-400" />
                  <h4 className="font-semibold text-green-400">Measured Performance Results</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground">Total Energy Reduction:</span>
                    <span className="text-green-400 font-semibold">42%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Lighting Energy Savings:</span>
                    <span className="text-green-400 font-semibold">55%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">HVAC Energy Reduction:</span>
                    <span className="text-green-400 font-semibold">35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Peak Demand Reduction:</span>
                    <span className="text-green-400 font-semibold">28%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Annual Cost Savings:</span>
                    <span className="text-green-400 font-semibold">£125,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Carbon Reduction:</span>
                    <span className="text-green-400 font-semibold">380 tonnes CO₂</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground">Investment Payback:</span>
                    <span className="text-green-400 font-semibold">2.8 years</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-900/30 border border-blue-600/40 rounded-lg p-4">
                <h4 className="font-semibold mb-3 text-blue-400">Occupant and Operational Benefits</h4>
                <div className="space-y-2 text-sm text-foreground">
                  <p>• 70% reduction in temperature-related comfort complaints</p>
                  <p>• Improved air quality scores (IAQ Index: 8.5/10)</p>
                  <p>• Enhanced natural light utilisation increasing productivity</p>
                  <p>• Automated systems reducing facility management workload</p>
                  <p>• Real-time energy monitoring enabling proactive management</p>
                  <p>• Tenant satisfaction scores increased from 6.2 to 8.9/10</p>
                  <p>• Reduced maintenance calls due to improved system coordination</p>
                  <p>• Achievement of BREEAM Excellent rating enabling premium rents</p>
                </div>
              </div>
            </div>
            
            {/* Technical Performance Monitoring */}
            <div className="bg-gray-800/40 rounded-lg p-5">
              <h4 className="font-semibold mb-4 text-foreground text-lg">Ongoing Performance Monitoring and Optimization</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <h5 className="font-semibold text-purple-300">System Performance Metrics</h5>
                  <div className="text-sm text-foreground space-y-1">
                    <p>• Continuous monitoring of energy consumption patterns</p>
                    <p>• Occupancy detection accuracy tracking (97.2% reliability)</p>
                    <p>• Daylight sensor calibration monitoring and adjustment</p>
                    <p>• HVAC response time optimization (average 8 minutes)</p>
                    <p>• Integration system uptime tracking (99.8% availability)</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-semibold text-orange-300">Machine Learning Optimization</h5>
                  <div className="text-sm text-foreground space-y-1">
                    <p>• Predictive algorithms learning occupancy patterns</p>
                    <p>• Weather-based pre-conditioning optimization</p>
                    <p>• Seasonal adaptation of control strategies</p>
                    <p>• Tenant behavior analysis for system fine-tuning</p>
                    <p>• Continuous improvement in energy performance</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-semibold text-cyan-300">Future Enhancement Planning</h5>
                  <div className="text-sm text-foreground space-y-1">
                    <p>• Integration with electric vehicle charging infrastructure</p>
                    <p>• Solar panel coordination with building energy management</p>
                    <p>• Advanced air quality monitoring and response systems</p>
                    <p>• Expansion to include water management systems</p>
                    <p>• Integration with smart grid technologies</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-900/30 border border-yellow-600/40 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-yellow-400">Critical Success Factors for Integration Projects</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium mb-2 text-yellow-300">Technical Implementation:</h5>
                  <ul className="space-y-1 text-foreground">
                    <li>• Comprehensive system mapping and zone definition before installation</li>
                    <li>• Robust communication networks with redundancy and error handling</li>
                    <li>• Extensive commissioning period with full seasonal testing</li>
                    <li>• Proper sensor placement validated through coverage analysis</li>
                    <li>• Clear documentation enabling effective ongoing maintenance</li>
                    <li>• Regular performance monitoring and optimization protocols</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2 text-yellow-300">Organizational Success:</h5>
                  <ul className="space-y-1 text-foreground">
                    <li>• Comprehensive user training covering system benefits and operation</li>
                    <li>• Clear communication about temporary disruptions during installation</li>
                    <li>• Stakeholder engagement ensuring buy-in from all building occupants</li>
                    <li>• Ongoing support and system optimization based on user feedback</li>
                    <li>• Regular performance reporting demonstrating achieved benefits</li>
                    <li>• Continuous improvement culture with systematic enhancement processes</li>
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