import { TrendingUp, Zap, Battery, Cpu, Shield, Home, Info, AlertTriangle, CheckCircle, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const Amendment2Content = () => {
  return (
    <div className="space-y-8">
      {/* Comprehensive Amendment 2 Overview */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-elec-yellow" />
            BS 7671 Amendment 2: Complete Transformation Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p className="text-base leading-relaxed">
            Amendment 2 represents the most significant update to BS 7671 in decades, introducing comprehensive provisions for modern 
            electrical installations including energy storage, electric vehicles, smart technology, and enhanced safety measures. 
            These changes reflect the transformation of electrical installations from simple power distribution to intelligent energy management systems.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
              <h4 className="text-green-300 font-semibold text-lg mb-3">Key Drivers for Amendment 2</h4>
              <ul className="text-sm space-y-2">
                <li>• <strong>Net Zero Carbon Targets:</strong> Government commitment to net zero by 2050</li>
                <li>• <strong>Renewable Energy Growth:</strong> Massive expansion of solar PV and wind generation</li>
                <li>• <strong>Electric Vehicle Adoption:</strong> Rapid growth in EV ownership and charging infrastructure</li>
                <li>• <strong>Smart Technology Integration:</strong> IoT devices and intelligent control systems</li>
                <li>• <strong>Energy Storage Revolution:</strong> Battery systems becoming economically viable</li>
                <li>• <strong>Grid Modernisation:</strong> Smart grids and bidirectional energy flow</li>
              </ul>
            </div>

            <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
              <h4 className="text-blue-300 font-semibold text-lg mb-3">Amendment 2 Timeline and Implementation</h4>
              <div className="space-y-3">
                <div className="bg-blue-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm">Publication: March 2022</p>
                  <p className="text-xs text-foreground">Amendment 2 officially published and available</p>
                </div>
                <div className="bg-blue-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm">Implementation: September 2022</p>
                  <p className="text-xs text-foreground">Mandatory compliance for all new installations</p>
                </div>
                <div className="bg-blue-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm">Existing Installations</p>
                  <p className="text-xs text-foreground">No retrospective requirements, but recommended for major alterations</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prosumer Electrical Installations (PEI) */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Home className="h-6 w-6 text-green-500" />
            Prosumer Electrical Installations (PEI) - Revolutionary Concept
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p className="text-base leading-relaxed">
            The introduction of Prosumer Electrical Installations (PEI) recognition represents a fundamental shift in how BS 7671 
            views modern electrical installations. No longer just consumers of electricity, buildings now actively participate in energy generation, 
            storage, and grid services.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
              <h4 className="text-green-300 font-semibold mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Generation Technologies
              </h4>
              <div className="space-y-3">
                <div className="bg-green-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm">Solar Photovoltaic (PV)</p>
                  <ul className="text-xs space-y-1 mt-1">
                    <li>• Rooftop and ground-mounted arrays</li>
                    <li>• DC isolation and switching requirements</li>
                    <li>• Arc fault detection systems (AFDD)</li>
                    <li>• Rapid shutdown capabilities</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm">Wind Generation</p>
                  <ul className="text-xs space-y-1 mt-1">
                    <li>• Small-scale turbines</li>
                    <li>• Variable frequency output</li>
                    <li>• Power conditioning systems</li>
                    <li>• Lightning protection</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm">Combined Heat and Power (CHP)</p>
                  <ul className="text-xs space-y-1 mt-1">
                    <li>• Gas-fired micro-CHP units</li>
                    <li>• Fuel cell systems</li>
                    <li>• Heat recovery systems</li>
                    <li>• Grid synchronisation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
              <h4 className="text-blue-300 font-semibold mb-3 flex items-center gap-2">
                <Battery className="h-5 w-5" />
                Energy Storage Systems
              </h4>
              <div className="space-y-3">
                <div className="bg-blue-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm">Battery Technologies</p>
                  <ul className="text-xs space-y-1 mt-1">
                    <li>• Lithium-ion systems (most common)</li>
                    <li>• Lead-acid (traditional applications)</li>
                    <li>• Flow batteries (large scale)</li>
                    <li>• Emerging technologies</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm">Safety Requirements</p>
                  <ul className="text-xs space-y-1 mt-1">
                    <li>• Thermal runaway protection</li>
                    <li>• Ventilation systems</li>
                    <li>• Fire suppression</li>
                    <li>• Emergency isolation</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm">Installation Considerations</p>
                  <ul className="text-xs space-y-1 mt-1">
                    <li>• Location and access</li>
                    <li>• Temperature control</li>
                    <li>• Structural support</li>
                    <li>• Maintenance access</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
              <h4 className="text-purple-300 font-semibold mb-3 flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                Smart Grid Integration
              </h4>
              <div className="space-y-3">
                <div className="bg-purple-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm">Grid Services</p>
                  <ul className="text-xs space-y-1 mt-1">
                    <li>• Frequency response</li>
                    <li>• Voltage support</li>
                    <li>• Peak shaving</li>
                    <li>• Load balancing</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm">Communication Systems</p>
                  <ul className="text-xs space-y-1 mt-1">
                    <li>• Smart meters</li>
                    <li>• Real-time data exchange</li>
                    <li>• Remote monitoring</li>
                    <li>• Cybersecurity protocols</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm">Economic Benefits</p>
                  <ul className="text-xs space-y-1 mt-1">
                    <li>• Time-of-use tariffs</li>
                    <li>• Export payments</li>
                    <li>• Grid service revenues</li>
                    <li>• Carbon credit trading</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Alert className="border-green-600/30 bg-green-900/20">
            <Info className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-foreground">
              <strong className="text-green-300">PEI Design Principle:</strong> Amendment 2 requires that PEI installations are designed from the outset 
              to accommodate bidirectional energy flow, future expansion, and integration with smart grid services.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Enhanced Protection Requirements */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Shield className="h-6 w-6 text-red-500" />
            Enhanced Protection Requirements and Safety Measures
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Arc Fault Detection Devices */}
            <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
              <h4 className="text-red-300 font-semibold text-lg mb-3">Arc Fault Detection Devices (AFDD)</h4>
              <div className="space-y-3">
                <p className="text-sm">AFDDs detect dangerous arcing conditions that traditional protective devices cannot identify.</p>
                <div className="bg-red-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Mandatory Applications:</p>
                  <ul className="text-xs space-y-1">
                    <li>• AC final circuits in houses of multiple occupation (HMO)</li>
                    <li>• Sleeping accommodation circuits</li>
                    <li>• Circuits supplying PV installations</li>
                    <li>• Locations with particular fire risk</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Technical Requirements:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Detection algorithms for series and parallel arcs</li>
                    <li>• Immunity to normal switching operations</li>
                    <li>• Testing and maintenance procedures</li>
                    <li>• Integration with existing protective devices</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Surge Protection Devices */}
            <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-600/30">
              <h4 className="text-yellow-300 font-semibold text-lg mb-3">Surge Protection Devices (SPD)</h4>
              <div className="space-y-3">
                <p className="text-sm">Enhanced requirements for surge protection due to increased electronic equipment sensitivity.</p>
                <div className="bg-yellow-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Installation Requirements:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Risk assessment to determine SPD necessity</li>
                    <li>• Type 1 SPDs at main distribution board</li>
                    <li>• Type 2 SPDs for sub-distribution</li>
                    <li>• Type 3 SPDs for sensitive equipment</li>
                  </ul>
                </div>
                <div className="bg-yellow-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Coordination Strategy:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Proper voltage protection levels (Up)</li>
                    <li>• Current handling capabilities</li>
                    <li>• Installation distances and cable lengths</li>
                    <li>• Backup protection for SPD failure</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* RCD Enhancements */}
            <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
              <h4 className="text-blue-300 font-semibold text-lg mb-3">RCD Protection Enhancements</h4>
              <div className="space-y-3">
                <p className="text-sm">Amendment 2 introduces more stringent RCD requirements and new applications.</p>
                <div className="bg-blue-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Enhanced Requirements:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Type A RCDs for EV charging circuits</li>
                    <li>• Type B RCDs for certain DC applications</li>
                    <li>• Time-delayed RCDs for selectivity</li>
                    <li>• RCD monitoring in critical applications</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">New Applications:</p>
                  <ul className="text-xs space-y-1">
                    <li>• All socket outlets ≤20A (extended scope)</li>
                    <li>• Mobile equipment in commercial premises</li>
                    <li>• Outdoor installations and wet locations</li>
                    <li>• PV installation earthing arrangements</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Fire Safety Measures */}
            <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
              <h4 className="text-orange-300 font-semibold text-lg mb-3">Fire Safety and Emergency Provisions</h4>
              <div className="space-y-3">
                <p className="text-sm">Enhanced fire safety measures reflecting lessons learned from tragic events.</p>
                <div className="bg-orange-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Cable Selection:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Enhanced fire resistance requirements</li>
                    <li>• Low smoke and fume (LSF) cables</li>
                    <li>• Fire barrier penetration sealing</li>
                    <li>• Emergency lighting circuit protection</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Emergency Systems:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Emergency shutdown systems</li>
                    <li>• Rapid isolation capabilities</li>
                    <li>• Fire service access panels</li>
                    <li>• Life safety system priorities</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Energy Efficiency and Environmental Impact */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Star className="h-6 w-6 text-green-500" />
            Energy Efficiency and Environmental Considerations
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p className="text-base leading-relaxed">
            Appendix 17 has been significantly expanded to provide comprehensive guidance on energy efficiency measures, 
            reflecting the critical importance of reducing electrical energy consumption and carbon emissions.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
              <h4 className="text-green-300 font-semibold text-lg mb-3">Design for Energy Efficiency</h4>
              <div className="space-y-3">
                <div className="bg-green-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Load Management:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Demand profiling and peak shaving</li>
                    <li>• Automatic load shedding systems</li>
                    <li>• Time-of-use optimization</li>
                    <li>• Power factor correction</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Equipment Selection:</p>
                  <ul className="text-xs space-y-1">
                    <li>• High-efficiency motors and drives</li>
                    <li>• LED lighting systems</li>
                    <li>• Smart controls and sensors</li>
                    <li>• Energy monitoring systems</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">System Design:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Minimized cable losses</li>
                    <li>• Optimized voltage levels</li>
                    <li>• Harmonic mitigation</li>
                    <li>• Reactive power management</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
              <h4 className="text-blue-300 font-semibold text-lg mb-3">Monitoring and Control Systems</h4>
              <div className="space-y-3">
                <div className="bg-blue-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Smart Metering:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Real-time energy consumption data</li>
                    <li>• Sub-metering for individual circuits</li>
                    <li>• Remote monitoring capabilities</li>
                    <li>• Data analytics and reporting</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Building Management Integration:</p>
                  <ul className="text-xs space-y-1">
                    <li>• HVAC system coordination</li>
                    <li>• Lighting control integration</li>
                    <li>• Occupancy-based switching</li>
                    <li>• Weather compensation systems</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Performance Optimization:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Continuous commissioning</li>
                    <li>• Performance benchmarking</li>
                    <li>• Predictive maintenance</li>
                    <li>• Energy audit capabilities</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
            <h4 className="text-purple-300 font-semibold text-lg mb-3">Carbon Impact Assessment</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Lifecycle Considerations:</p>
                <ul className="text-xs space-y-1">
                  <li>• Embodied carbon in equipment</li>
                  <li>• Manufacturing impact</li>
                  <li>• Transportation and installation</li>
                  <li>• End-of-life disposal</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Operational Efficiency:</p>
                <ul className="text-xs space-y-1">
                  <li>• Grid carbon intensity factors</li>
                  <li>• Peak vs. off-peak emissions</li>
                  <li>• Renewable energy integration</li>
                  <li>• Energy storage optimization</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold text-sm mb-2">Future-Proofing:</p>
                <ul className="text-xs space-y-1">
                  <li>• Scalable system architecture</li>
                  <li>• Technology upgrade paths</li>
                  <li>• Grid decarbonization readiness</li>
                  <li>• Circular economy principles</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation and Compliance Strategy */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-blue-500" />
            Implementation Strategy and Professional Impact
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
              <h4 className="text-blue-300 font-semibold text-lg mb-3">Transition Planning</h4>
              <div className="space-y-3">
                <div className="bg-blue-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Training Requirements:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Updated technical knowledge</li>
                    <li>• New testing procedures</li>
                    <li>• Safety protocol changes</li>
                    <li>• Software tool updates</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Business Adaptation:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Service offering expansion</li>
                    <li>• Equipment investment</li>
                    <li>• Certification updates</li>
                    <li>• Partnership development</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
              <h4 className="text-orange-300 font-semibold text-lg mb-3">Client Communication</h4>
              <div className="space-y-3">
                <div className="bg-orange-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Value Proposition:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Enhanced safety features</li>
                    <li>• Future-proofing benefits</li>
                    <li>• Energy cost savings</li>
                    <li>• Environmental impact reduction</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm mb-2">Cost Justification:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Long-term return on investment</li>
                    <li>• Reduced maintenance costs</li>
                    <li>• Insurance implications</li>
                    <li>• Property value enhancement</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Alert className="border-yellow-600/30 bg-yellow-900/20">
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-foreground">
              <strong className="text-yellow-300">Professional Development Priority:</strong> Amendment 2 represents a paradigm shift 
              requiring continuous professional development. Staying current with these changes is essential for maintaining competence 
              and delivering value to clients in the evolving electrical industry.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};