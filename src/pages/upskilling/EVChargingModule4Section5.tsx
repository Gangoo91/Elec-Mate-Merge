import { ArrowLeft, ArrowRight, Zap, BookOpen, Target, AlertTriangle, CheckCircle, Lightbulb, Shield, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { EVChargingModule4Section5Quiz } from '@/components/upskilling/quiz/EVChargingModule4Section5Quiz';

const EVChargingModule4Section5 = () => {
  useEffect(() => {
    document.title = 'Surge and Lightning Protection (SPD) - EV Charging Module 4 Section 5';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn to protect EV charging systems from electrical surges and lightning strikes. Covers SPD selection, installation, coordination, and BS 7671 requirements.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../ev-charging-module-4">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 5
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Surge and Lightning Protection (SPD)
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Protecting EV charging systems from electrical surges and transient overvoltages
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
                Surge protection devices (SPDs) are essential for safeguarding EV charging infrastructure from transient overvoltages caused by lightning strikes, switching operations, and other electrical disturbances. Modern EV chargers contain sophisticated electronic controls that are particularly vulnerable to surge damage.
              </p>
              <p>
                Effective surge protection requires careful selection, coordination, and installation of SPDs at appropriate points in the electrical system. The protection scheme must consider the charging equipment specifications, installation environment, and applicable standards including BS 7671 and BS EN 62305.
              </p>
              <p>
                This section covers SPD types, selection criteria, installation requirements, and coordination strategies specific to EV charging installations, ensuring comprehensive protection against surge-related failures and maintaining system availability.
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
                <li>Identify surge protection requirements for EV charging systems</li>
                <li>Select appropriate SPD types and ratings for different applications</li>
                <li>Design coordinated surge protection schemes</li>
                <li>Install SPDs in accordance with BS 7671 requirements</li>
                <li>Verify surge protection effectiveness and maintenance requirements</li>
                <li>Implement lightning protection zone concepts for EV infrastructure</li>
              </ul>
            </CardContent>
          </Card>

          {/* Real-World Examples */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Real-World Case Studies</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Case Study 1 */}
              <div className="bg-card/80 p-6 rounded-lg border border-gray-600">
                <h4 className="text-lg font-semibold text-yellow-400 mb-3">Case Study 1: Coastal EV Charging Hub</h4>
                <div className="text-gray-300 space-y-3">
                  <p><strong>Challenge:</strong> High lightning activity and salt air corrosion at coastal rapid charging facility with 150kW chargers.</p>
                  <p><strong>Solution:</strong> Comprehensive three-stage SPD protection with Type 1+2 combined devices at main panel, Type 2 devices at charger supplies, and integrated Type 3 protection within charge points.</p>
                  <p><strong>Result:</strong> Zero surge-related failures over two storm seasons. Protection system prevented £45,000 in potential charger replacements during one lightning event.</p>
                  <div className="bg-card p-3 rounded border-l-4 border-yellow-400">
                    <p className="text-blue-200"><strong>Key Learning:</strong> Marine environments require enhanced surge protection due to increased lightning attraction and corrosive conditions affecting protection devices.</p>
                  </div>
                </div>
              </div>

              {/* Case Study 2 */}
              <div className="bg-card/80 p-6 rounded-lg border border-gray-600">
                <h4 className="text-lg font-semibold text-yellow-400 mb-3">Case Study 2: Industrial EV Fleet Charging</h4>
                <div className="text-gray-300 space-y-3">
                  <p><strong>Challenge:</strong> Multiple 22kW charging points experiencing frequent control circuit failures due to switching surges from large industrial loads.</p>
                  <p><strong>Solution:</strong> Installation of coordinated SPD protection with enhanced filtering for control circuits and improved earthing arrangements.</p>
                  <p><strong>Result:</strong> 95% reduction in charger downtime. Annual maintenance costs reduced by £12,000. Enhanced protection improved charging availability for fleet operations.</p>
                  <div className="bg-card p-3 rounded border-l-4 border-yellow-400">
                    <p className="text-blue-200"><strong>Key Learning:</strong> Industrial environments with heavy switching loads require enhanced surge protection particularly for sensitive electronic controls.</p>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Content Sections */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Lightning Risk Assessment and Protection Zones</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">BS EN 62305 Lightning Protection Zones</h3>
                <div className="space-y-4">
                  
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Zone Classification System</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>LPZ 0A:</strong> Exposed to direct lightning strikes and full electromagnetic field</p>
                      <p><strong>LPZ 0B:</strong> Protected from direct strikes but exposed to electromagnetic field</p>
                      <p><strong>LPZ 1:</strong> Protected from direct strikes, limited electromagnetic field</p>
                      <p><strong>LPZ 2+:</strong> Further electromagnetic field reduction as required</p>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">EV Charging Zone Applications</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Outdoor Charge Points:</strong> Typically LPZ 0A - require comprehensive Type 1 protection</p>
                      <p><strong>Covered Car Parks:</strong> Usually LPZ 0B - need coordinated Type 1+2 protection</p>
                      <p><strong>Internal Equipment:</strong> LPZ 1 or higher - primarily Type 2 and Type 3 SPDs</p>
                      <p><strong>Control Systems:</strong> LPZ 2+ - enhanced filtering and signal line protection</p>
                    </div>
                  </div>

                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-yellow-400/30">
                <h4 className="font-semibold text-blue-300 mb-2">⚡ Risk Assessment Process</h4>
                <p className="text-sm text-blue-200">
                  Use BS EN 62305-2 risk assessment to determine if lightning protection is economically justified and which protection level is required. Consider structure characteristics, environment, and consequences of lightning damage.
                </p>
              </div>

            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">SPD Types and Classifications</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">SPD Classification System</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-400">Type 1 SPDs</h4>
                    <ul className="space-y-1 text-sm list-disc list-inside">
                      <li>Direct lightning current protection</li>
                      <li>Tested with 10/350μs waveform</li>
                      <li>Typical Iimp: 12.5kA to 25kA</li>
                      <li>Installed at service entrance</li>
                      <li>Spark gap or gas discharge tube technology</li>
                      <li>Higher energy handling capability</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-400">Type 2 SPDs</h4>
                    <ul className="space-y-1 text-sm list-disc list-inside">
                      <li>Indirect lightning protection</li>
                      <li>Tested with 8/20μs waveform</li>
                      <li>Typical In: 5kA to 40kA</li>
                      <li>Distribution board installation</li>
                      <li>Metal oxide varistor technology</li>
                      <li>Fast response times (&lt;25ns)</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-400">Type 3 SPDs</h4>
                    <ul className="space-y-1 text-sm list-disc list-inside">
                      <li>Local equipment protection</li>
                      <li>Combination wave testing</li>
                      <li>Low energy, fast response</li>
                      <li>Socket outlet or equipment level</li>
                      <li>Coordinated with upstream SPDs</li>
                      <li>Fine protection for sensitive circuits</li>
                    </ul>
                  </div>

                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Combined SPD Types</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-400">Type 1+2 Combined SPDs</h4>
                    <ul className="space-y-1 text-sm list-disc list-inside">
                      <li>Single device providing both Type 1 and Type 2 protection</li>
                      <li>Suitable for main distribution boards</li>
                      <li>Space-saving installation solution</li>
                      <li>Tested to both 10/350μs and 8/20μs waveforms</li>
                      <li>Ideal for smaller EV charging installations</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-400">Type 2+3 Combined SPDs</h4>
                    <ul className="space-y-1 text-sm list-disc list-inside">
                      <li>Protection for final distribution circuits</li>
                      <li>Combines 8/20μs and combination wave testing</li>
                      <li>Suitable for individual charger protection</li>
                      <li>Enhanced filtering characteristics</li>
                      <li>Cost-effective for multiple charge points</li>
                    </ul>
                  </div>

                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-yellow-400/30">
                <h4 className="font-semibold text-blue-300 mb-2">SPD Selection Criteria</h4>
                <p className="text-sm text-blue-200">
                  SPD selection must consider system voltage, earthing arrangement, expected surge levels, installation location, and coordination requirements. Always verify compatibility with protective devices and equipment specifications.
                </p>
              </div>

            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Advanced SPD Installation and Coordination</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Installation Requirements and Best Practices</h3>
                
                <div className="space-y-4">
                  
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Connection Requirements</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Lead Length:</strong> Keep connecting leads as short as possible, ideally less than 0.5m total</p>
                      <p><strong>Cable Routing:</strong> Avoid loops in SPD connections to minimise inductance</p>
                      <p><strong>Cross-sectional Area:</strong> Minimum 2.5mm² for Type 2, 16mm² for Type 1</p>
                      <p><strong>Disconnection:</strong> Provide means of isolation for maintenance and testing</p>
                      <p><strong>Earthing:</strong> Connect to main earthing terminal with shortest possible path</p>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Protection Coordination Theory</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Energy Coordination:</strong> Upstream SPDs must handle higher energy surges</p>
                      <p><strong>Voltage Protection Levels:</strong> Each stage should have progressively lower Up values</p>
                      <p><strong>Distance Requirements:</strong> Minimum 10m between protection stages or use decoupling inductors</p>
                      <p><strong>Backup Protection:</strong> Provide overcurrent protection for each SPD</p>
                      <p><strong>Status Monitoring:</strong> Install indication systems for SPD condition monitoring</p>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Decoupling Inductors</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Purpose:</strong> Allow closer spacing between SPD stages when 10m separation not possible</p>
                      <p><strong>Typical Values:</strong> 10-15μH for power circuits, higher values for signal circuits</p>
                      <p><strong>Installation:</strong> Must handle full load current without excessive voltage drop</p>
                      <p><strong>Benefits:</strong> Improved coordination, reduced installation constraints</p>
                    </div>
                  </div>

                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-yellow-400/30">
                <h4 className="font-semibold text-blue-300 mb-2">💡 Installation Best Practices</h4>
                <ul className="text-sm text-blue-200 space-y-1 list-disc list-inside">
                  <li>Install SPDs as close as possible to equipment being protected</li>
                  <li>Use dedicated MCBs for SPD protection, not combined with other circuits</li>
                  <li>Ensure good earth connections with low impedance paths</li>
                  <li>Label SPDs clearly and provide maintenance instructions</li>
                  <li>Consider environmental conditions (temperature, humidity, pollution)</li>
                  <li>Plan for future testing and replacement access</li>
                </ul>
              </div>

            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">EV Charger SPD Applications and Design</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Charger-Specific Protection Requirements</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-400">AC Charging (Type 2)</h4>
                    <ul className="space-y-1 text-sm list-disc list-inside">
                      <li>Three-phase Type 2 SPDs at main panel</li>
                      <li>Individual Type 3 protection per charge point</li>
                      <li>Control pilot signal protection (CP/PP lines)</li>
                      <li>Communication circuit protection (Ethernet/WiFi)</li>
                      <li>Consider earth leakage implications</li>
                      <li>Neutral-earth voltage limiting required</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-400">DC Rapid Charging (CCS/CHAdeMO)</h4>
                    <ul className="space-y-1 text-sm list-disc list-inside">
                      <li>Enhanced AC side protection due to higher power</li>
                      <li>DC output surge protection devices</li>
                      <li>Power electronics protection</li>
                      <li>Cooling system circuit protection</li>
                      <li>Communication interface shielding</li>
                      <li>High-voltage isolation monitoring</li>
                    </ul>
                  </div>

                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Signal and Communication Line Protection</h3>
                
                <div className="space-y-4">
                  
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Control Pilot Signal Protection</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>CP Line SPDs:</strong> Protect ±12V/±6V control pilot signals from vehicle to charger</p>
                      <p><strong>PP Line SPDs:</strong> Protect proximity pilot resistance detection circuits</p>
                      <p><strong>Voltage Ratings:</strong> Typically 24V or 48V rated devices for control circuits</p>
                      <p><strong>Response Time:</strong> Sub-nanosecond response required for sensitive control circuits</p>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Data Communication Protection</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Ethernet SPDs:</strong> Protect network management and monitoring communications</p>
                      <p><strong>RS485 SPDs:</strong> Protect Modbus and other serial communications</p>
                      <p><strong>4G/WiFi Protection:</strong> Antenna feed surge protection for wireless communications</p>
                      <p><strong>OCPP Protection:</strong> Ensure reliable cloud connectivity for charging management</p>
                    </div>
                  </div>

                </div>
              </div>

              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-400 mb-3">Common Protection Schemes</h4>
                <div className="space-y-3 text-sm">
                  
                  <div>
                    <p><strong>Single Charger Installation:</strong></p>
                    <p>Type 2 SPD at distribution board + integrated Type 3 protection in charger unit + signal line protection</p>
                  </div>

                  <div>
                    <p><strong>Multiple Charger Hub:</strong></p>
                    <p>Type 1+2 combined SPD at main incomer + Type 2 SPDs at sub-distribution + local Type 3 protection + centralised communication protection</p>
                  </div>

                  <div>
                    <p><strong>Rapid Charging Station:</strong></p>
                    <p>Type 1 protection at HV supply + enhanced Type 1+2 at transformer + dedicated DC SPDs + comprehensive signal protection</p>
                  </div>

                  <div>
                    <p><strong>Remote/Exposed Location:</strong></p>
                    <p>Enhanced Type 1 protection + coordinated multi-stage scheme + comprehensive earthing system + environmental protection</p>
                  </div>

                </div>
              </div>

            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">SPD Testing, Monitoring and Maintenance</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Installation Testing and Commissioning</h3>
                
                <div className="space-y-4">
                  
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Initial Testing Requirements</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Insulation Resistance:</strong> Test between SPD terminals and earth when isolated</p>
                      <p><strong>Continuity Testing:</strong> Verify all SPD earth connections and bonding</p>
                      <p><strong>Protection Device Testing:</strong> Confirm SPD backup protection operates correctly</p>
                      <p><strong>Indication Systems:</strong> Test status indication and remote monitoring functions</p>
                      <p><strong>Documentation:</strong> Record all SPD specifications, installation details, and test results</p>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Ongoing Maintenance Schedule</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Monthly:</strong> Visual inspection of SPD status indicators and enclosures</p>
                      <p><strong>Quarterly:</strong> Check connection tightness and clean terminals if accessible</p>
                      <p><strong>Annually:</strong> Detailed inspection, thermal imaging, and performance verification</p>
                      <p><strong>Post-Storm:</strong> Immediate inspection after significant lightning activity</p>
                      <p><strong>Replacement:</strong> Follow manufacturer guidance on SPD end-of-life indicators</p>
                    </div>
                  </div>

                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Monitoring and Alarm Systems</h3>
                
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-3">SPD Status Monitoring</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Local Indicators:</strong> LED status displays, mechanical flags, or thermal disconnection</p>
                    <p><strong>Remote Monitoring:</strong> Dry contact outputs for building management systems</p>
                    <p><strong>Smart SPDs:</strong> Digital communication interfaces with diagnostic data</p>
                    <p><strong>Alarm Integration:</strong> Connect to charging network monitoring systems</p>
                    <p><strong>Trending:</strong> Monitor SPD leakage current trends for predictive maintenance</p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-yellow-400/30">
                <h4 className="font-semibold text-yellow-300 mb-2">⚠️ Safety Considerations</h4>
                <ul className="text-sm text-yellow-200 space-y-1 list-disc list-inside">
                  <li>Never test SPDs with insulation resistance testers above manufacturer's limits</li>
                  <li>Ensure SPDs are isolated before performing any resistance measurements</li>
                  <li>Replace SPDs showing degradation indicators immediately</li>
                  <li>Use appropriate PPE when working near SPD installations</li>
                  <li>Follow lockout/tagout procedures during maintenance activities</li>
                </ul>
              </div>

            </CardContent>
          </Card>

          {/* Quick Check */}
          <Card className="bg-card border-yellow-400/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Quick Check</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-blue-200 font-medium">Test your understanding:</p>
                <div className="space-y-3">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <p className="text-white font-medium mb-2">Question: What is the maximum recommended lead length for SPD connections?</p>
                    <details className="text-gray-300">
                      <summary className="cursor-pointer text-yellow-400 hover:text-blue-300">Show Answer</summary>
                      <p className="mt-2 text-sm">
                        SPD connecting leads should be kept as short as possible, ideally less than 0.5m total length (0.25m each way) to minimise inductance and maintain protection effectiveness.
                      </p>
                    </details>
                  </div>
                  <div className="bg-card/80 p-4 rounded-lg">
                    <p className="text-white font-medium mb-2">Question: Which SPD type is required for direct lightning protection?</p>
                    <details className="text-gray-300">
                      <summary className="cursor-pointer text-yellow-400 hover:text-blue-300">Show Answer</summary>
                      <p className="mt-2 text-sm">
                        Type 1 SPDs are required for direct lightning protection, tested with 10/350μs current waveforms and capable of handling the high energy content of lightning currents.
                      </p>
                    </details>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="space-y-4">
                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">Do all EV chargers need surge protection?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>BS 7671 requires surge protection for circuits supplying equipment with rated impulse withstand voltage less than 2.5kV. Most EV chargers contain sensitive electronics requiring SPD protection, particularly in areas with high lightning activity.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">Can I use domestic SPDs for commercial EV chargers?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Commercial EV chargers typically require higher capacity SPDs due to increased power levels and exposure. Use SPDs rated appropriately for the installation's expected fault levels and energy requirements.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">How do I coordinate SPDs with RCD protection?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>SPDs can cause temporary earth leakage during operation. Use Type A or Type B RCDs suitable for EV charging, and ensure SPD earth leakage characteristics are considered in RCD selection and discrimination studies.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">What maintenance do SPDs require?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Regular visual inspection for damage, checking indication windows or status indicators, verifying connection tightness, and testing isolation facilities. Replace SPDs when indicators show degradation or after significant surge events.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">How do I determine the required SPD rating?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Consider lightning protection level, system earthing arrangement, installation environment, and equipment sensitivity. Use risk assessment methods in BS EN 62305-2 to determine appropriate protection levels and SPD specifications.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">Can SPDs affect power quality?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Well-designed SPDs should not affect normal operation. However, degraded SPDs may introduce harmonics or affect voltage regulation. Monitor SPD condition and replace when performance indicators suggest degradation.</p>
                  </div>
                </details>

              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-green-500/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <CardTitle className="text-white">Section Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-green-200 space-y-4">
              <p>
                Surge protection is essential for EV charging infrastructure reliability and safety. Proper SPD selection, installation, and coordination protects sensitive electronic equipment from lightning and switching surge damage whilst maintaining system availability.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2 text-green-300">Protection Strategy:</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Multi-stage coordinated protection scheme</li>
                    <li>Appropriate SPD types for each protection level</li>
                    <li>Short connection leads and proper earthing</li>
                    <li>Integration with existing protection systems</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-green-300">Maintenance Requirements:</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Regular visual inspection and testing</li>
                    <li>Monitor SPD status indicators</li>
                    <li>Replace degraded or failed devices promptly</li>
                    <li>Document surge events and system performance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Component */}
          <EVChargingModule4Section5Quiz />

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8">
            <Link to="../ev-charging-module-4-section-4">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-card/80 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../ev-charging-module-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400">
                Back to Module 4
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
};

export default EVChargingModule4Section5;