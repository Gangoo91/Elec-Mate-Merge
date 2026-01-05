import { ArrowLeft, ArrowRight, Cable, CheckCircle, Users, Lightbulb, HelpCircle, Settings, BookOpen, Target, AlertTriangle, Zap, Eye, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { EVChargingModule6Section2Quiz } from '@/components/upskilling/quiz/EVChargingModule6Section2Quiz';

const EVChargingModule6Section2 = () => {
  useEffect(() => {
    document.title = 'Cable Termination and Routing - EV Charging Module 6 Section 2';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Master professional cable termination and routing practices for EV charging installations. Learn BS 7671 compliance, voltage drop calculations, and installation techniques.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../ev-charging-module-6">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Cable className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 6 - Section 2
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Cable Termination and Routing
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Professional cable termination and routing practices for reliable EV charging installations
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Introduction</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Professional cable termination and routing are critical for the safety, reliability, and longevity 
                of EV charging installations. This section covers the technical requirements for cable selection, 
                routing methods, termination techniques, and compliance with BS 7671 standards. Proper cable 
                management ensures optimal performance whilst maintaining electrical and mechanical integrity.
              </p>
              
              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Cable Installation Fundamentals</h4>
                <ul className="text-sm space-y-1">
                  <li>• Correct cable selection for application and environment</li>
                  <li>• Voltage drop calculations and current carrying capacity</li>
                  <li>• Mechanical protection and environmental considerations</li>
                  <li>• Proper termination techniques and torque requirements</li>
                  <li>• Earth continuity and fault path integrity</li>
                  <li>• Fire safety and compartmentation compliance</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Learning Outcomes</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="space-y-3">
                {[
                  "Select appropriate cables for EV charging applications and environments",
                  "Calculate voltage drop and current carrying capacity for charging circuits",
                  "Implement proper cable routing and mechanical protection methods",
                  "Execute professional termination techniques with correct torque settings",
                  "Ensure earth continuity and fault protection integrity",
                  "Apply fire safety and building regulation requirements",
                  "Install cable management systems and identification markers",
                  "Comply with BS 7671 installation requirements and best practices"
                ].map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Content/Learning */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Cable className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Cable Termination and Routing Practices</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              {/* Advanced Cable Selection */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Advanced Cable Selection and Specification</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Comprehensive Cable Selection Matrix</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left p-2 text-yellow-400">Cable Type</th>
                            <th className="text-left p-2 text-yellow-400">Construction</th>
                            <th className="text-left p-2 text-yellow-400">Max Current</th>
                            <th className="text-left p-2 text-yellow-400">Installation Method</th>
                            <th className="text-left p-2 text-yellow-400">Environmental Rating</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs">
                          <tr className="border-b border-gray-700">
                            <td className="p-2">6242Y Twin & Earth</td>
                            <td className="p-2">PVC/PVC with CPC</td>
                            <td className="p-2">32A (clipped direct)</td>
                            <td className="p-2">Internal dry locations</td>
                            <td className="p-2">Indoors only, temperature limited</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">6943X LSF 3-core</td>
                            <td className="p-2">LSF copper conductors</td>
                            <td className="p-2">32A (in trunking)</td>
                            <td className="p-2">Commercial/public buildings</td>
                            <td className="p-2">Fire retardant, low smoke emission</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">6491X XLPE SWA</td>
                            <td className="p-2">XLPE/SWA/PVC</td>
                            <td className="p-2">41A (underground)</td>
                            <td className="p-2">Direct burial/external</td>
                            <td className="p-2">UV resistant, moisture proof</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">N2XY-J VDE 0276</td>
                            <td className="p-2">XLPE/copper screen</td>
                            <td className="p-2">50A (underground)</td>
                            <td className="p-2">High-power installations</td>
                            <td className="p-2">Enhanced fault protection</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">FP200 Fire Cable</td>
                            <td className="p-2">Mineral insulated</td>
                            <td className="p-2">27A (surface)</td>
                            <td className="p-2">Emergency circuits</td>
                            <td className="p-2">Fire survival, 950°C rated</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Detailed Derating Factor Calculations</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Temperature Derating (Ca)</h5>
                        <ul className="text-sm space-y-1">
                          <li>• 20°C ambient: 1.22 factor</li>
                          <li>• 25°C ambient: 1.06 factor</li>
                          <li>• 30°C ambient: 1.00 factor (reference)</li>
                          <li>• 35°C ambient: 0.94 factor</li>
                          <li>• 40°C ambient: 0.87 factor</li>
                          <li>• 45°C ambient: 0.79 factor</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Grouping Factors (Cg)</h5>
                        <ul className="text-sm space-y-1">
                          <li>• 1 circuit: 1.00 factor</li>
                          <li>• 2 circuits: 0.80 factor</li>
                          <li>• 3 circuits: 0.70 factor</li>
                          <li>• 4-5 circuits: 0.65 factor</li>
                          <li>• 6-8 circuits: 0.60 factor</li>
                          <li>• 9+ circuits: 0.50 factor</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Thermal Insulation (Ci)</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Not in contact: 1.00 factor</li>
                          <li>• Touching one side: 0.89 factor</li>
                          <li>• Surrounded &lt;50mm: 0.78 factor</li>
                          <li>• Surrounded 50-100mm: 0.67 factor</li>
                          <li>• Surrounded &gt;100mm: 0.57 factor</li>
                          <li>• Completely surrounded: 0.50 factor</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Advanced Voltage Drop Calculations</h4>
                    <div className="space-y-3">
                      <div className="bg-[#404040] p-3 rounded">
                        <h5 className="font-medium text-yellow-400 mb-2">Three-Phase Voltage Drop Formula</h5>
                        <p className="text-sm">VD = √3 × I × L × (R cos φ + X sin φ) / 1000</p>
                        <p className="text-xs text-gray-400">Where: VD = voltage drop (V), I = current (A), L = length (m), R = resistance (mΩ/m), X = reactance (mΩ/m)</p>
                      </div>
                      <div className="bg-[#404040] p-3 rounded">
                        <h5 className="font-medium text-yellow-400 mb-2">Power Factor Considerations</h5>
                        <p className="text-sm">EV chargers typically operate at 0.9-0.95 power factor. Use reactive component tables for accurate calculations. Consider harmonic distortion effects on voltage regulation.</p>
                      </div>
                      <div className="bg-[#404040] p-3 rounded">
                        <h5 className="font-medium text-yellow-400 mb-2">Dynamic Load Assessment</h5>
                        <p className="text-sm">Consider charging profiles, diversity factors, and future expansion. Smart charging may reduce simultaneous maximum demand. Include measurement and verification protocols.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-600 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-200 mb-3">Complex Installation Example</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-yellow-400 font-medium">Installation Requirements:</p>
                        <p>4 × 22kW three-phase chargers, 50m cable run, SWA underground installation, grouped with 2 other circuits, 35°C soil temperature, surrounded by thermal insulation</p>
                      </div>
                      <div>
                        <p className="text-yellow-400 font-medium">Design Calculation:</p>
                        <p>Required: 4 × 32A = 128A with diversity factor 0.7 = 90A<br/>
                        16mm² SWA: 76A × 0.94 (temp) × 0.80 (grouping) × 0.78 (insulation) = 45A per cable<br/>
                        Solution: 2 × 16mm² cables in parallel</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-900/20 border border-red-600 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-200 mb-2">Critical Design Considerations</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-yellow-400 font-medium">Parallel Cable Installation:</p>
                        <p>Equal length routing essential. Same installation method and environmental conditions. Individual protection may be required. Load sharing verification testing.</p>
                      </div>
                      <div>
                        <p className="text-yellow-400 font-medium">Future Expansion Planning:</p>
                        <p>Allow for 50% additional capacity where practical. Install spare ducts and draw wires. Consider smart charging integration. Plan for rapid charging upgrades.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cable Routing Methods */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Cable Routing Methods</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Underground Installation</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Installation Requirements</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Minimum 600mm burial depth</li>
                          <li>• SWA cable with appropriate glands</li>
                          <li>• Warning tape 150mm above cable</li>
                          <li>• Cable route marking and records</li>
                          <li>• Avoid tree roots and services</li>
                          <li>• Use ducting for easy replacement</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Mechanical Protection</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Concrete slabs over cables in driveways</li>
                          <li>• Plastic or steel ducting where required</li>
                          <li>• Sand bedding for irregular surfaces</li>
                          <li>• Cable tiles for multiple cable runs</li>
                          <li>• Avoid sharp objects and heavy machinery</li>
                          <li>• Inspection chambers at direction changes</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Surface and Overhead Routing</h4>
                    <div className="space-y-3">
                      <div className="bg-[#404040] p-3 rounded">
                        <h5 className="font-medium text-yellow-400 mb-2">Wall-Mounted Installation</h5>
                        <p className="text-sm">Use SWA cable with appropriate clipping at 300mm intervals for horizontal runs, 400mm for vertical. Maintain 150mm clearance from corners and joints. Use fire-resistant cable clips in escape routes.</p>
                      </div>
                      <div className="bg-[#404040] p-3 rounded">
                        <h5 className="font-medium text-yellow-400 mb-2">Trunking and Conduit Systems</h5>
                        <p className="text-sm">PVC trunking for internal routes with appropriate IP rating. Metal conduit for mechanical protection. Ensure adequate space for cable pulling and thermal expansion. Fire barriers at compartment boundaries.</p>
                      </div>
                      <div className="bg-[#404040] p-3 rounded">
                        <h5 className="font-medium text-yellow-400 mb-2">Overhead Catenary Systems</h5>
                        <p className="text-sm">For long spans between buildings using galvanised steel wire rope. Ensure adequate clearances (5.2m over roads, 3.5m over private areas). Use strain insulators and proper terminations.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Building Penetrations and Compartmentation</h4>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="text-center p-3 border border-gray-600 rounded">
                        <h5 className="font-medium text-yellow-400 mb-1">Fire Stopping</h5>
                        <p className="text-xs">Use approved fire-resistant seals maintaining compartment integrity</p>
                      </div>
                      <div className="text-center p-3 border border-gray-600 rounded">
                        <h5 className="font-medium text-yellow-400 mb-1">Weather Sealing</h5>
                        <p className="text-xs">External-grade sealant with appropriate movement accommodation</p>
                      </div>
                      <div className="text-center p-3 border border-gray-600 rounded">
                        <h5 className="font-medium text-yellow-400 mb-1">Pest Protection</h5>
                        <p className="text-xs">Wire mesh or grilles preventing rodent ingress to cable routes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Termination Techniques */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Professional Termination Techniques</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">SWA Cable Termination</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                        <div>
                          <p className="font-medium text-white">Cable Preparation</p>
                          <p className="text-sm text-gray-400">Strip outer sheath to expose conductors and armour. Clean and prepare cable end.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                        <div>
                          <p className="font-medium text-white">Gland Installation</p>
                          <p className="text-sm text-gray-400">Select correct CW gland size. Install compression ring and ensuring proper armour contact.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                        <div>
                          <p className="font-medium text-white">Conductor Termination</p>
                          <p className="text-sm text-gray-400">Strip conductors to correct length. Use appropriate terminals and apply specified torque.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                        <div>
                          <p className="font-medium text-white">Earth Continuity</p>
                          <p className="text-sm text-gray-400">Connect armour to earth terminal via CPC or separate earth strap.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Torque Requirements and Terminal Selection</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left p-2 text-yellow-400">Conductor Size</th>
                            <th className="text-left p-2 text-yellow-400">Terminal Type</th>
                            <th className="text-left p-2 text-yellow-400">Torque Setting</th>
                            <th className="text-left p-2 text-yellow-400">Strip Length</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs">
                          <tr className="border-b border-gray-700">
                            <td className="p-2">1.5mm²</td>
                            <td className="p-2">Screwless/MCB</td>
                            <td className="p-2">0.8 Nm</td>
                            <td className="p-2">10mm</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">2.5mm²</td>
                            <td className="p-2">Screwless/MCB</td>
                            <td className="p-2">1.2 Nm</td>
                            <td className="p-2">12mm</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">6mm²</td>
                            <td className="p-2">Terminal block</td>
                            <td className="p-2">2.5 Nm</td>
                            <td className="p-2">15mm</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">10mm²</td>
                            <td className="p-2">Lug connector</td>
                            <td className="p-2">4.0 Nm</td>
                            <td className="p-2">18mm</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-card/80 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Quality Termination Checklist</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Clean, straight cuts on conductors</li>
                        <li>• No damaged or nicked copper strands</li>
                        <li>• Correct stripping length (no exposed copper)</li>
                        <li>• Tight connections to specified torque</li>
                        <li>• Proper earth continuity throughout</li>
                        <li>• Adequate cable strain relief</li>
                      </ul>
                    </div>
                    <div className="bg-card/80 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Common Termination Faults</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Loose connections causing overheating</li>
                        <li>• Over-stripped conductors exposing copper</li>
                        <li>• Damaged strands reducing current capacity</li>
                        <li>• Poor earth connections</li>
                        <li>• Inadequate cable strain relief</li>
                        <li>• Wrong terminal size selection</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cable Management and Identification */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Cable Management and Identification</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Cable Support and Management</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Support Intervals</h5>
                        <ul className="text-sm space-y-1">
                          <li>• PVC cables: 300mm horizontal, 400mm vertical</li>
                          <li>• SWA cables: 600mm horizontal, 800mm vertical</li>
                          <li>• Flexible cables: 200mm horizontal, 300mm vertical</li>
                          <li>• Additional support at terminations</li>
                          <li>• Consider cable weight and environmental factors</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Bending Radius</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Single-core cables: 12 × cable diameter</li>
                          <li>• Multi-core cables: 6 × cable diameter</li>
                          <li>• SWA cables: 12 × overall diameter</li>
                          <li>• Flexible cables: 4 × cable diameter</li>
                          <li>• Use proprietary bending supports where required</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Cable Identification and Labelling</h4>
                    <div className="space-y-3">
                      <div className="bg-[#404040] p-3 rounded">
                        <h5 className="font-medium text-yellow-400 mb-2">Circuit Identification Requirements</h5>
                        <p className="text-sm">All circuits must be clearly identified at both ends and at intermediate points. Use durable labels indicating: Circuit designation, Final circuit number, Protective device rating, Circuit function (e.g., "EV CHARGING CIRCUIT").</p>
                      </div>
                      <div className="bg-[#404040] p-3 rounded">
                        <h5 className="font-medium text-yellow-400 mb-2">Cable Marking Standards</h5>
                        <p className="text-sm">Use self-adhesive labels or cable markers at: Cable origin and destination, Every accessible point, Junction boxes and distribution boards, Building entry/exit points. Include installation date and installer details.</p>
                      </div>
                      <div className="bg-[#404040] p-3 rounded">
                        <h5 className="font-medium text-yellow-400 mb-2">Underground Cable Marking</h5>
                        <p className="text-sm">Install permanent route markers at: Changes of direction, Building entry/exit points, Property boundaries, Accessible locations every 25m. Include depth information and installation date.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-900/20 border border-green-600 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-200 mb-3">Best Practice Cable Management</h4>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-yellow-400 font-medium">Segregation:</p>
                        <p>Separate power and data cables, maintain clearances from heat sources</p>
                      </div>
                      <div>
                        <p className="text-yellow-400 font-medium">Accessibility:</p>
                        <p>Ensure maintenance access to all connection points and junction boxes</p>
                      </div>
                      <div>
                        <p className="text-yellow-400 font-medium">Future-Proofing:</p>
                        <p>Install spare ways and over-size trunking for future expansion</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Check */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Quick Check</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3">Cable Installation Verification</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-yellow-400 font-medium">Installation Example:</p>
                    <p>22kW three-phase EV charger, 40m cable run, installed in trunking</p>
                    <p><strong>Selected cable:</strong> 10mm² 4-core SWA</p>
                  </div>
                  <div>
                    <p className="text-yellow-400 font-medium">Verification Checks:</p>
                    <p>✓ Current capacity: 57A &gt; 32A per phase<br/>
                    ✓ Voltage drop: 4.4mV/A/m × 32A × 40m = 5.6V (2.4%)<br/>
                    ✓ Earth continuity via SWA armour</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Examples */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Wrench className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Real World Examples</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card/80 p-5 rounded-lg">
                  <h4 className="font-semibold text-white mb-3">Example 1: Residential Underground Installation</h4>
                  <div className="space-y-3">
                    <div className="bg-[#404040] p-3 rounded">
                      <p className="text-yellow-400 font-medium text-sm">Installation Challenge:</p>
                      <p className="text-sm">35m run from house to detached garage, crossing under driveway and flower bed</p>
                    </div>
                    <div className="bg-[#404040] p-3 rounded">
                      <p className="text-yellow-400 font-medium text-sm">Solution Implemented:</p>
                      <ul className="text-sm space-y-1">
                        <li>• 6mm² 3-core SWA cable selected</li>
                        <li>• 750mm burial depth under driveway</li>
                        <li>• Concrete protection slab over cable</li>
                        <li>• Warning tape installed 300mm above</li>
                        <li>• Route marked with permanent posts</li>
                      </ul>
                    </div>
                    <div className="bg-green-800/30 p-3 rounded">
                      <p className="text-green-200 font-medium text-sm">Result:</p>
                      <p className="text-sm">Installation completed with 2.8% voltage drop, full mechanical protection, and clear route marking for future reference.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-5 rounded-lg">
                  <h4 className="font-semibold text-white mb-3">Example 2: Commercial Building Installation</h4>
                  <div className="space-y-3">
                    <div className="bg-[#404040] p-3 rounded">
                      <p className="text-yellow-400 font-medium text-sm">Installation Challenge:</p>
                      <p className="text-sm">Multiple charging points in basement car park, fire compartmentation requirements</p>
                    </div>
                    <div className="bg-[#404040] p-3 rounded">
                      <p className="text-yellow-400 font-medium text-sm">Technical Solution:</p>
                      <ul className="text-sm space-y-1">
                        <li>• LSF cable throughout building</li>
                        <li>• Fire-rated cable tray system</li>
                        <li>• Intumescent seals at compartment boundaries</li>
                        <li>• Individual circuit isolation for each charger</li>
                        <li>• Emergency lighting integration</li>
                      </ul>
                    </div>
                    <div className="bg-blue-800/30 p-3 rounded">
                      <p className="text-blue-200 font-medium text-sm">Compliance Achievement:</p>
                      <p className="text-sm">Full building regulation compliance achieved with approved installer certification and local authority sign-off.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-600 p-5 rounded-lg">
                <h4 className="font-semibold text-purple-200 mb-3">Complex Installation: Multi-Storey Car Park</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-yellow-400 font-medium text-sm mb-2">Project Scope:</p>
                    <ul className="text-sm space-y-1">
                      <li>• 24 × 22kW charging points</li>
                      <li>• 6-floor building with central distribution</li>
                      <li>• Existing building retrofit</li>
                      <li>• Minimal disruption requirement</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-yellow-400 font-medium text-sm mb-2">Cable Strategy:</p>
                    <ul className="text-sm space-y-1">
                      <li>• Central riser with sub-distribution</li>
                      <li>• 95mm² SWA main feeders</li>
                      <li>• 10mm² branch circuits</li>
                      <li>• Modular system for future expansion</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-yellow-400 font-medium text-sm mb-2">Installation Innovation:</p>
                    <ul className="text-sm space-y-1">
                      <li>• Prefabricated cable assemblies</li>
                      <li>• Plug-and-play terminations</li>
                      <li>• Overhead cable tray installation</li>
                      <li>• Integrated load management system</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <HelpCircle className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  question: "What happens if my voltage drop calculation exceeds 5%?",
                  answer: "Increase cable size to reduce voltage drop. Consider splitting long runs with intermediate distribution points. For existing installations, check actual voltage under load - calculations include safety margins."
                },
                {
                  question: "Can I use standard Twin & Earth cable for EV charging outdoors?",
                  answer: "No, Twin & Earth lacks mechanical protection for outdoor use. Use SWA cable with appropriate environmental rating. Indoor routing of T&E is acceptable with proper protection."
                },
                {
                  question: "How do I connect the SWA armour to earth?",
                  answer: "Use a CW (Cable Wire) gland with integral earth connection, or connect armour to a separate earth terminal. Ensure continuity throughout the cable run and test resistance."
                },
                {
                  question: "What's the maximum length for an EV charging circuit?",
                  answer: "No specific limit, but voltage drop constrains practical length. Typically 50-80m for 6mm² cable depending on load. Consider sub-distribution for longer runs."
                },
                {
                  question: "Do I need special cable for smart charging systems?",
                  answer: "Standard installation cables are suitable. Smart features typically use separate data connections (Cat5/6) or wireless communication. Keep data and power cables segregated."
                },
                {
                  question: "How should I protect underground cables from future excavation?",
                  answer: "Use warning tape, concrete protection slabs in high-risk areas, maintain records with accurate measurements, and mark the route with permanent surface indicators."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">{faq.question}</h4>
                  <p className="text-gray-300 text-sm">{faq.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-green-900/20 border-green-600 border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <CardTitle className="text-green-200">Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-200 mb-3">Key Cable Installation Principles</h4>
                  <ul className="space-y-2 text-sm text-green-100">
                    <li>• Proper cable selection ensures safe and reliable operation</li>
                    <li>• Voltage drop calculations are critical for performance</li>
                    <li>• Mechanical protection prevents future failures</li>
                    <li>• Professional termination techniques ensure electrical integrity</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-200 mb-3">Quality Installation Standards</h4>
                  <ul className="space-y-2 text-sm text-green-100">
                    <li>• Earth continuity must be maintained throughout the installation</li>
                    <li>• Proper cable support prevents mechanical stress</li>
                    <li>• Clear identification aids future maintenance</li>
                    <li>• Compliance with BS 7671 ensures safety and legal requirements</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz */}
          <EVChargingModule6Section2Quiz />
        </div>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto mt-8 flex justify-between">
          <Link to="../ev-charging-module-6-section-1">
            <Button 
              variant="outline" 
              className="bg-card border-gray-600 text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Section
            </Button>
          </Link>
          <Link to="../ev-charging-module-6-section-3">
            <Button 
              variant="outline" 
              className="bg-card border-gray-600 text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200"
            >
              Next Section
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default EVChargingModule6Section2;