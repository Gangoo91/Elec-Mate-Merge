import { ArrowLeft, ArrowRight, Anchor, BookOpen, Target, AlertTriangle, CheckCircle, Lightbulb, Zap, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { EVChargingModule4Section1Quiz } from '@/components/upskilling/quiz/EVChargingModule4Section1Quiz';

const EVChargingModule4Section1 = () => {
  useEffect(() => {
    document.title = 'Earthing System Selection: TT, TN-S, TN-C-S - EV Charging Module 4 Section 1';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn to select appropriate earthing systems (TT, TN-S, TN-C-S) for EV charging installations. Covers BS 7671 requirements, fault protection, and system characteristics.');
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
            <Anchor className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 1
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Earthing System Selection: TT, TN-S, TN-C-S
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Understanding and selecting appropriate earthing systems for EV charging installations with BS 7671 compliance
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
                Earthing system selection is fundamental to the safe operation of EV charging installations. The choice between TT, TN-S, and TN-C-S earthing systems directly impacts fault protection, equipment selection, and installation methods for EV charge points.
              </p>
              <p>
                Understanding the characteristics, advantages, and limitations of each earthing system is essential for designing compliant installations that provide effective protection against electric shock and fire hazards whilst ensuring reliable operation of charging infrastructure.
              </p>
              <p>
                This section covers the technical requirements, protection coordination, and practical considerations for each earthing system type in accordance with BS 7671 and IET Code of Practice for Electric Vehicle Charging Equipment Installation.
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
                <li>Identify and classify different earthing system types (TT, TN-S, TN-C-S)</li>
                <li>Evaluate earthing system suitability for EV charging applications</li>
                <li>Apply BS 7671 earthing requirements for charge point installations</li>
                <li>Design effective fault protection schemes for each earthing system</li>
                <li>Calculate earth fault loop impedance and RCD requirements</li>
                <li>Specify appropriate protective devices for different earthing arrangements</li>
              </ul>
            </CardContent>
          </Card>

          {/* Real-World Examples */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="h-5 w-5 text-cyan-400" />
                Real-World Case Studies
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div className="space-y-6">
                <div className="border-l-4 border-cyan-400 pl-4 bg-gray-800 p-4 rounded-r">
                  <h4 className="font-semibold text-cyan-400 mb-2">Case Study 1: Urban Shopping Centre</h4>
                  <div className="space-y-3">
                    <p><strong>Situation:</strong> 50-bay underground car park requiring rapid charging facilities</p>
                    <p><strong>Challenge:</strong> Existing TN-C-S supply with steel reinforced concrete structure</p>
                    <p><strong>Solution:</strong> Converted to TT system with mesh earth electrode and selective RCD protection</p>
                    <p><strong>Outcome:</strong> Safe installation meeting all PME restrictions, 100% uptime achieved</p>
                  </div>
                </div>
                
                <div className="border-l-4 border-cyan-400 pl-4 bg-gray-800 p-4 rounded-r">
                  <h4 className="font-semibold text-cyan-400 mb-2">Case Study 2: Domestic Installation</h4>
                  <div className="space-y-3">
                    <p><strong>Situation:</strong> Home charger on driveway adjacent to metal garage doors</p>
                    <p><strong>Challenge:</strong> PME supply with metallic extraneous parts within reach</p>
                    <p><strong>Solution:</strong> Equipotential bonding extended to include garage metalwork</p>
                    <p><strong>Outcome:</strong> Compliant TN-C-S installation with enhanced safety measures</p>
                  </div>
                </div>
                
                <div className="border-l-4 border-cyan-400 pl-4 bg-gray-800 p-4 rounded-r">
                  <h4 className="font-semibold text-cyan-400 mb-2">Case Study 3: Industrial Fleet Depot</h4>
                  <div className="space-y-3">
                    <p><strong>Situation:</strong> 20 overnight charging points for delivery vans</p>
                    <p><strong>Challenge:</strong> TN-S supply available but high earth fault loop impedance</p>
                    <p><strong>Solution:</strong> Parallel earth electrode to reduce Zs, upgraded protective devices</p>
                    <p><strong>Outcome:</strong> Achieved required disconnection times, reliable overnight charging</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQs Section */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-400" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="border border-gray-600 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-400 mb-2">Q: Can I use my existing TN-C-S supply for outdoor EV charging?</h4>
                  <p className="text-sm">A: It depends on the specific installation. PME restrictions under Regulation 722.411.4.1 may require additional measures such as earth electrodes or equipotential bonding.</p>
                </div>
                
                <div className="border border-gray-600 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-400 mb-2">Q: What's the maximum earth electrode resistance for TT systems?</h4>
                  <p className="text-sm">A: For 30mA RCD protection, the electrode should not exceed 200Ω, though lower resistance (50-100Ω) provides better performance and safety margins.</p>
                </div>
                
                <div className="border border-gray-600 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-400 mb-2">Q: Why can't I always use Type A RCDs for EV charging?</h4>
                  <p className="text-sm">A: Modern EV chargers can produce DC fault currents that Type A RCDs cannot detect. Type B RCDs are increasingly specified for comprehensive protection.</p>
                </div>
                
                <div className="border border-gray-600 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-400 mb-2">Q: How do I determine if my supply is TN-S or TN-C-S?</h4>
                  <p className="text-sm">A: Check the supply arrangement at the meter position. TN-S has separate neutral and earth conductors; TN-C-S has a combined PEN conductor that splits into separate N and PE.</p>
                </div>
                
                <div className="border border-gray-600 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-400 mb-2">Q: What's the benefit of converting to TT for public charging?</h4>
                  <p className="text-sm">A: TT systems eliminate PME restrictions and provide enhanced safety isolation from supply earth faults, making them ideal for publicly accessible charging points.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* TN-S Earthing Systems */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                TN-S Earthing Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                TN-S earthing systems utilize separate neutral and protective earth conductors throughout the installation, providing a direct, low-impedance path for fault currents back to the source. This arrangement ensures rapid disconnection of faulty circuits and minimizes the risk of electric shock.
              </p>
              <p>
                TN-S systems are characterized by their robust fault protection, predictable performance, and suitability for installations with sensitive electronic equipment. However, they require a dedicated earth conductor from the supply transformer, which may not always be available.
              </p>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-2">System Characteristics</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Separate neutral and protective earthing conductors throughout</li>
                    <li>Single point of earthing at supply transformer neutral</li>
                    <li>Protective conductor (PE) separate from neutral conductor (N)</li>
                    <li>Typical in new installations with underground supply cables</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-2">Advantages for EV Charging</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Low earth fault loop impedance for effective overcurrent protection</li>
                    <li>Minimal risk of neutral-earth voltage differences</li>
                    <li>Excellent electromagnetic compatibility characteristics</li>
                    <li>Predictable fault current paths for protection coordination</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-cyan-400 mb-2">Protection Requirements</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-600 p-2 text-left">Protection Type</th>
                          <th className="border border-gray-600 p-2 text-left">Requirement</th>
                          <th className="border border-gray-600 p-2 text-left">Typical Values</th>
                          <th className="border border-gray-600 p-2 text-left">BS 7671 Reference</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 p-2">Overcurrent Protection</td>
                          <td className="border border-gray-600 p-2">MCB/RCBO coordination</td>
                          <td className="border border-gray-600 p-2">≤0.4s disconnection (≤32A)</td>
                          <td className="border border-gray-600 p-2">Table 41.1</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Earth Fault Loop</td>
                          <td className="border border-gray-600 p-2">Zs ≤ Zs(max)</td>
                          <td className="border border-gray-600 p-2">1.44Ω (32A Type B MCB)</td>
                          <td className="border border-gray-600 p-2">Appendix 3</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">RCD Protection</td>
                          <td className="border border-gray-600 p-2">≤30mA (socket outlets)</td>
                          <td className="border border-gray-600 p-2">Type A or Type B RCD</td>
                          <td className="border border-gray-600 p-2">722.531.2</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Equipotential Bonding</td>
                          <td className="border border-gray-600 p-2">Main and supplementary</td>
                          <td className="border border-gray-600 p-2">≥10mm² (main bonding)</td>
                          <td className="border border-gray-600 p-2">544.1</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-cyan-400 mb-2">Installation Considerations</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Verify TN-S system availability from DNO supply documentation</li>
                    <li>Ensure PE conductor integrity throughout installation</li>
                    <li>Install appropriate earth electrode for enhanced protection</li>
                    <li>Consider voltage optimisation for improved charging efficiency</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* TN-C-S Earthing Systems */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-400" />
                TN-C-S Earthing Systems (PME)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                TN-C-S earthing systems, also known as Protective Multiple Earthing (PME), combine the neutral and protective functions into a single conductor (PEN) in the supply network. Within the installation, the PEN conductor is split into separate neutral (N) and protective earth (PE) conductors.
              </p>
              <p>
                TN-C-S systems are widely used in the UK but have specific restrictions for EV charging installations due to the potential for dangerous voltages on the earthing system in the event of a broken PEN conductor. BS 7671 Regulation 722.411.4.1 outlines these restrictions and requires additional protection measures.
              </p>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-amber-400 mb-2">System Characteristics</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Combined neutral-earth conductor (PEN) in supply network</li>
                    <li>Separate neutral (N) and protective earth (PE) in installation</li>
                    <li>Multiple earthing points throughout distribution network</li>
                    <li>Most common system in UK domestic and commercial supplies</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-amber-400 mb-2">PME Conditions and Restrictions</h4>
                  <div className="bg-gray-800 p-4 rounded-lg space-y-3">
                    <h5 className="font-medium text-amber-300 mb-2">Regulation 722.411.4.1 Requirements</h5>
                    <ul className="text-sm space-y-2">
                      <li>• <strong>Metallic contact:</strong> EV charging equipment must not be used where accessible conductive parts may be touched simultaneously with metallic masses connected to Earth</li>
                      <li>• <strong>Location restrictions:</strong> Outdoor charging points require special consideration for PME limitations</li>
                      <li>• <strong>Extraneous conductive parts:</strong> Bonding requirements for metallic structures and services</li>
                      <li>• <strong>Earth electrode:</strong> Additional earth electrode required in many cases</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-amber-400 mb-2">Protection Measures for TN-C-S</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-800 p-3 rounded">
                      <h5 className="font-medium text-amber-300 mb-2">Method 1: Additional Earth Electrode</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Install separate TT earth electrode (≤200Ω)</li>
                        <li>• RCD protection mandatory (≤30mA)</li>
                        <li>• Isolate installation earth from PME</li>
                        <li>• Suitable for outdoor charging posts</li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                      <h5 className="font-medium text-amber-300 mb-2">Method 2: Equipotential Zone</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Create local equipotential bonding network</li>
                        <li>• Bond all metallic structures within 2.5m</li>
                        <li>• Install mesh earthing system if required</li>
                        <li>• Suitable for dedicated charging areas</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-amber-400 mb-2">Practical Implementation</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-600 p-2 text-left">Installation Type</th>
                          <th className="border border-gray-600 p-2 text-left">PME Suitability</th>
                          <th className="border border-gray-600 p-2 text-left">Additional Measures</th>
                          <th className="border border-gray-600 p-2 text-left">Protection Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 p-2">Domestic garage (internal)</td>
                          <td className="border border-gray-600 p-2">Suitable</td>
                          <td className="border border-gray-600 p-2">Standard bonding</td>
                          <td className="border border-gray-600 p-2">RCD + MCB</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Domestic driveway</td>
                          <td className="border border-gray-600 p-2">Restricted</td>
                          <td className="border border-gray-600 p-2">Earth electrode or bonding</td>
                          <td className="border border-gray-600 p-2">30mA RCD mandatory</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Public charging</td>
                          <td className="border border-gray-600 p-2">Not suitable</td>
                          <td className="border border-gray-600 p-2">Convert to TT system</td>
                          <td className="border border-gray-600 p-2">TT earth electrode</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">Commercial car park</td>
                          <td className="border border-gray-600 p-2">Case by case</td>
                          <td className="border border-gray-600 p-2">Risk assessment required</td>
                          <td className="border border-gray-600 p-2">Specialist design</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* TT Earthing Systems */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-green-400" />
                TT Earthing Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                TT earthing systems utilize a local earth electrode to provide a dedicated earth connection for the installation, completely independent of the supply earthing arrangement. This isolation eliminates the risk of imported earth faults and voltage rises, making TT systems ideal for EV charging in public or exposed locations.
              </p>
              <p>
                TT systems rely on Residual Current Devices (RCDs) for fault protection, as the earth fault loop impedance is typically too high for overcurrent devices to operate quickly enough. Careful selection and installation of earth electrodes are essential to achieve reliable RCD performance.
              </p>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">System Characteristics</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>Local earth electrode completely independent of supply earthing</li>
                    <li>Installation earth system isolated from supply neutral</li>
                    <li>High earth fault loop impedance requires RCD protection</li>
                    <li>Preferred system for EV charging in many applications</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Advantages for EV Charging</h4>
                  <ul className="space-y-1 list-disc list-inside ml-4">
                    <li>No restrictions on outdoor installation locations</li>
                    <li>Immunity from supply neutral voltage variations</li>
                    <li>Enhanced safety for public accessible locations</li>
                    <li>Compliance with PME restrictions automatically achieved</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Earth Electrode Requirements</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-800 p-3 rounded">
                      <h5 className="font-medium text-emerald-300 mb-2">Electrode Types and Performance</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="font-medium text-emerald-200 mb-1">Rod Electrodes</p>
                          <ul className="space-y-1">
                            <li>• Copper-bonded steel: 20-200Ω typical</li>
                            <li>• Stainless steel: enhanced corrosion resistance</li>
                            <li>• Multiple rods: parallel connection reduces resistance</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-emerald-200 mb-1">Plate/Grid Electrodes</p>
                          <ul className="space-y-1">
                            <li>• Copper plates: 5-50Ω in suitable soil</li>
                            <li>• Mesh grids: ideal for large installations</li>
                            <li>• Strip electrodes: cost-effective for linear layouts</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">RCD Protection Requirements</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="border border-gray-600 p-2 text-left">Earth Resistance</th>
                          <th className="border border-gray-600 p-2 text-left">Fault Current</th>
                          <th className="border border-gray-600 p-2 text-left">RCD Rating</th>
                          <th className="border border-gray-600 p-2 text-left">Touch Voltage</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 p-2">50Ω</td>
                          <td className="border border-gray-600 p-2">4.6A</td>
                          <td className="border border-gray-600 p-2">30mA adequate</td>
                          <td className="border border-gray-600 p-2">1.5V (safe)</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">100Ω</td>
                          <td className="border border-gray-600 p-2">2.3A</td>
                          <td className="border border-gray-600 p-2">30mA adequate</td>
                          <td className="border border-gray-600 p-2">3V (safe)</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">200Ω</td>
                          <td className="border border-gray-600 p-2">1.15A</td>
                          <td className="border border-gray-600 p-2">30mA adequate</td>
                          <td className="border border-gray-600 p-2">6V (safe)</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 p-2">500Ω</td>
                          <td className="border border-gray-600 p-2">0.46A</td>
                          <td className="border border-gray-600 p-2">30mA adequate</td>
                          <td className="border border-gray-600 p-2">15V (safe)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Takeaways */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                Key Takeaways
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-yellow-400 mb-2">System Selection Priorities</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• TT systems preferred for public charging installations</li>
                    <li>• TN-S excellent for private/commercial where available</li>
                    <li>• TN-C-S suitable with appropriate PME measures</li>
                    <li>• Risk assessment essential for all outdoor installations</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-yellow-400 mb-2">Protection Essentials</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• RCD protection mandatory for EV charging circuits</li>
                    <li>• Type B RCDs increasingly specified for comprehensive protection</li>
                    <li>• Earth fault loop impedance critical for TN systems</li>
                    <li>• Regular testing and maintenance schedules essential</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <EVChargingModule4Section1Quiz />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../ev-charging-module-4">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Module 4
              </Button>
            </Link>
            <Link to="../ev-charging-module-4-section-2">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
};

export default EVChargingModule4Section1;
