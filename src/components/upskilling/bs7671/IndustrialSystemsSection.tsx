import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Factory, Zap, Settings } from 'lucide-react';

export const IndustrialSystemsSection = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-900/20 to-elec-gray border-blue-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Factory className="h-5 w-5 text-elec-yellow" />
          Industrial Power Systems & Continuity
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-blue-600 text-foreground">High Availability</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-elec-dark p-3 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-2">Industrial Electrical Systems Overview</h5>
          <p className="text-sm">High-availability power systems requiring selective coordination, load management, and comprehensive protection against production disruption</p>
        </div>

        <div className="grid gap-6">
          {/* Selective Coordination */}
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-blue-400" />
              <h5 className="text-blue-400 font-semibold">Selective Coordination Principles</h5>
            </div>
            
            <div className="grid gap-4">
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">Protection Hierarchy:</h6>
                <div className="space-y-3">
                  {/* Incoming Protection */}
                  <div className="p-3 bg-blue-900/20 border border-blue-600/50 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <h6 className="font-bold text-blue-300">Incoming Protection Level</h6>
                      <Badge className="bg-blue-600">MCCB/ACB</Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm mb-1"><strong>Device Types:</strong> Air Circuit Breakers (ACB), Moulded Case Circuit Breakers (MCCB)</p>
                        <p className="text-sm"><strong>Typical Ratings:</strong> 630A-6300A, 65kA-150kA breaking capacity</p>
                      </div>
                      <div>
                        <p className="text-sm mb-1"><strong>Time Delay:</strong> Long time delay (0.4-1.2 seconds)</p>
                        <p className="text-sm"><strong>Application:</strong> Main distribution, supply transformer protection</p>
                      </div>
                    </div>
                  </div>

                  {/* Distribution Protection */}
                  <div className="p-3 bg-green-900/20 border border-green-600/50 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <h6 className="font-bold text-green-300">Distribution Protection Level</h6>
                      <Badge className="bg-green-600">MCCB</Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm mb-1"><strong>Device Types:</strong> Moulded Case Circuit Breakers with electronic trip units</p>
                        <p className="text-sm"><strong>Typical Ratings:</strong> 100A-1600A, 25kA-100kA breaking capacity</p>
                      </div>
                      <div>
                        <p className="text-sm mb-1"><strong>Time Delay:</strong> Short time delay (0.1-0.4 seconds)</p>
                        <p className="text-sm"><strong>Application:</strong> Sub-distribution boards, motor control centres</p>
                      </div>
                    </div>
                  </div>

                  {/* Final Circuit Protection */}
                  <div className="p-3 bg-orange-900/20 border border-orange-600/50 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <h6 className="font-bold text-orange-300">Final Circuit Protection Level</h6>
                      <Badge className="bg-orange-600">MCB/Contactors</Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm mb-1"><strong>Device Types:</strong> Miniature Circuit Breakers, Motor Protection Switches</p>
                        <p className="text-sm"><strong>Typical Ratings:</strong> 6A-125A, 6kA-25kA breaking capacity</p>
                      </div>
                      <div>
                        <p className="text-sm mb-1"><strong>Time Delay:</strong> Instantaneous operation (0.01-0.1 seconds)</p>
                        <p className="text-sm"><strong>Application:</strong> Individual load protection, lighting circuits</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-800/30 border border-blue-600/50 rounded">
                <p className="text-blue-200 text-sm">
                  <strong>Coordination Requirement:</strong> Each protection level must operate only for faults in its zone, allowing continued operation of healthy circuits during fault conditions.
                </p>
              </div>
            </div>
          </div>

          {/* Industrial Earthing Systems */}
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <h5 className="text-elec-yellow font-semibold mb-3">Industrial Earthing & Protection Systems</h5>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-green-400 font-medium mb-2">TN-S Systems (Preferred for Industry):</h6>
                <ul className="text-sm space-y-1">
                  <li>• Separate neutral and protective earth conductors</li>
                  <li>• Lower earth loop impedance values</li>
                  <li>• Better fault current discrimination capability</li>
                  <li>• Reduced electromagnetic interference</li>
                  <li>• Suitable for variable speed drives and sensitive equipment</li>
                  <li>• Easier fault location and diagnosis</li>
                </ul>
              </div>
              <div>
                <h6 className="text-green-400 font-medium mb-2">TT Systems (Remote Industrial Sites):</h6>
                <ul className="text-sm space-y-1">
                  <li>• Independent earth electrode systems</li>
                  <li>• RCD protection mandatory for all circuits</li>
                  <li>• Higher earth resistance values acceptable</li>
                  <li>• Suitable for remote or mobile installations</li>
                  <li>• Requires careful earth electrode design</li>  
                  <li>• Regular earth resistance testing essential</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4">
              <h6 className="text-blue-400 font-medium mb-2">Industrial Earth Electrode Systems:</h6>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h6 className="text-foreground font-medium mb-1">Foundation Electrodes:</h6>
                  <ul className="text-sm space-y-1">
                    <li>• Concrete-encased conductor systems</li>
                    <li>• 25mm² minimum copper conductor</li>
                    <li>• Corrosion protection in concrete</li>
                    <li>• Integration with building structure</li>
                  </ul>
                </div>
                <div>
                  <h6 className="text-foreground font-medium mb-1">Deep Drive Electrodes:</h6>
                  <ul className="text-sm space-y-1">
                    <li>• 3-6 metre driven copper rods</li>
                    <li>• Multiple parallel electrodes</li>
                    <li>• Bentonite clay enhancement</li>
                    <li>• Seasonal resistance monitoring</li>
                  </ul>
                </div>
                <div>
                  <h6 className="text-foreground font-medium mb-1">Grid Earth Systems:</h6>
                  <ul className="text-sm space-y-1">
                    <li>• Comprehensive site earthing grid</li>
                    <li>• Equipment and structural bonding</li>
                    <li>• Lightning protection integration</li>
                    <li>• Step and touch voltage control</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Motor Protection */}
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="h-4 w-4 text-purple-400" />
              <h5 className="text-purple-400 font-semibold">Industrial Motor Protection Systems</h5>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">Protection Requirements:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Overload protection for thermal damage prevention</li>
                  <li>• Short circuit protection for fault clearance</li>
                  <li>• Phase imbalance and loss detection</li>
                  <li>• Under-voltage and over-voltage protection</li>
                  <li>• Earth fault protection systems</li>
                  <li>• Locked rotor and stall protection</li>
                </ul>
              </div>
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">Motor Control Methods:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Direct-on-line (DOL) starting for smaller motors</li>
                  <li>• Star-delta starting for reduced inrush current</li>
                  <li>• Soft starters for smooth acceleration</li>
                  <li>• Variable frequency drives (VFDs) for speed control</li>
                  <li>• Servo drives for precision applications</li>
                  <li>• Emergency stop and isolation systems</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-purple-900/20 border border-purple-600/50 rounded">
              <p className="text-purple-200 text-sm">
                <strong>Motor Cable Sizing:</strong> Cables must be sized for 125% of motor full-load current, with additional considerations for starting current, voltage drop, and harmonic content from VFDs.
              </p>
            </div>
          </div>

          {/* Load Management */}
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <h5 className="text-elec-yellow font-semibold mb-3">Industrial Load Management Systems</h5>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h6 className="text-orange-400 font-medium mb-2">Demand Management:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Peak demand monitoring and control</li>
                  <li>• Load shedding during peak periods</li>
                  <li>• Time-of-use optimisation</li>
                  <li>• Power factor correction systems</li>
                  <li>• Harmonic filtering and mitigation</li>
                </ul>
              </div>
              <div>
                <h6 className="text-orange-400 font-medium mb-2">Process Continuity:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Critical load identification and protection</li>
                  <li>• Automatic changeover systems</li>
                  <li>• UPS systems for control equipment</li>
                  <li>• Generator backup for essential loads</li>
                  <li>• Restart sequencing after outages</li>
                </ul>
              </div>
              <div>
                <h6 className="text-orange-400 font-medium mb-2">Energy Monitoring:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Real-time energy consumption monitoring</li>
                  <li>• Power quality analysis systems</li>
                  <li>• Historical data logging and analysis</li>
                  <li>• Efficiency optimisation programs</li>
                  <li>• Carbon footprint tracking</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hazardous Area Considerations */}
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <h5 className="text-elec-yellow font-semibold mb-3">Hazardous Area Electrical Systems</h5>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-red-400 font-medium mb-2">Zone Classification:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Zone 0: Explosive atmosphere continuously present</li>
                  <li>• Zone 1: Explosive atmosphere likely during normal operation</li>
                  <li>• Zone 2: Explosive atmosphere unlikely during normal operation</li>
                  <li>• Zone 20/21/22: Combustible dust environments</li>
                  <li>• Area classification drawings required</li>
                </ul>
              </div>
              <div>
                <h6 className="text-red-400 font-medium mb-2">Protection Methods:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Ex d: Flameproof enclosures</li>
                  <li>• Ex e: Increased safety equipment</li>
                  <li>• Ex i: Intrinsically safe circuits</li>
                  <li>• Ex n: Non-sparking equipment</li>
                  <li>• Ex p: Pressurised enclosures</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-red-900/20 border border-red-600/50 rounded">
              <p className="text-red-200 text-sm">
                <strong>Certification Requirement:</strong> All electrical equipment in hazardous areas must have appropriate ATEX or IECEx certification for the specific zone and gas/dust group.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};