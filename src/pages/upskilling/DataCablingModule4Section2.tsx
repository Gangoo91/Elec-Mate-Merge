import { ArrowLeft, ArrowRight, Route, AlertTriangle, Zap, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/upskilling/Quiz';

const DataCablingModule4Section2 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is the minimum separation distance between data and mains power cables in the same trunking?",
      options: [
        "10mm",
        "25mm", 
        "50mm",
        "100mm"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 requires a minimum 25mm separation between data and mains power cables, or use of a metallic barrier."
    },
    {
      id: 2,
      question: "What is the maximum pulling tension for Cat6 cable?",
      options: [
        "25N (5.6 lbs)",
        "40N (9 lbs)",
        "110N (25 lbs)",
        "200N (45 lbs)"
      ],
      correctAnswer: 2,
      explanation: "Cat6 cable has a maximum pulling tension of 110N (25 lbs) to prevent damage to the twisted pairs and jacket."
    },
    {
      id: 3,
      question: "How far should data cables be separated from fluorescent lighting?",
      options: [
        "50mm minimum",
        "100mm minimum",
        "150mm minimum", 
        "200mm minimum"
      ],
      correctAnswer: 2,
      explanation: "Data cables should maintain at least 150mm separation from fluorescent lighting to avoid electromagnetic interference."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12 max-w-6xl mx-auto">
        <Link to="../data-cabling-module-4">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
        
        <div className="space-y-8">
          <div className="text-center">
            <Badge variant="secondary" className="bg-yellow-400 text-black mb-4">
              Module 4 • Section 2
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Cable Separation and Bend Radius
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
              Installation guidelines and physical constraints
            </p>
          </div>

          <Alert className="border-yellow-400/30 bg-yellow-400/10">
            <Route className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-foreground">
              <strong className="text-yellow-400">Critical Success Factor:</strong> Proper cable separation and bend radius control are essential for maintaining signal integrity and preventing crosstalk.
            </AlertDescription>
          </Alert>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                Cable Separation Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">EMC and Interference Prevention</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Electromagnetic compatibility requires careful separation of data cables from power sources and other potential interference sources. 
                  These requirements ensure reliable data transmission and compliance with performance standards.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-3 text-yellow-400">Interference Source</th>
                        <th className="text-left p-3 text-yellow-400">Minimum Separation</th>
                        <th className="text-left p-3 text-yellow-400">Alternative Solution</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700">
                        <td className="p-3">Mains Power (230V)</td>
                        <td className="p-3">25mm or metallic barrier</td>
                        <td className="p-3">Separate compartment in trunking</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">High Voltage (&gt;1kV)</td>
                        <td className="p-3">300mm minimum</td>
                        <td className="p-3">Screened cable + earthed containment</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">Fluorescent Lighting</td>
                        <td className="p-3">150mm minimum</td>
                        <td className="p-3">Cross at 90° only</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">Motor Control Cables</td>
                        <td className="p-3">200mm minimum</td>
                        <td className="p-3">Separate cable routes</td>
                      </tr>
                      <tr>
                        <td className="p-3">Radio Transmitters</td>
                        <td className="p-3">1m minimum</td>
                        <td className="p-3">Screened installation required</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center">
                <Ruler className="mr-2 h-5 w-5" />
                Bend Radius Specifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Cable Type Requirements</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Each cable type has specific bend radius requirements to prevent damage to internal conductors and maintain performance characteristics.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Copper Cables</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Cat5e UTP:</span>
                        <span className="text-white">4 × cable diameter</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Cat6 UTP:</span>
                        <span className="text-white">4 × cable diameter</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Cat6a UTP:</span>
                        <span className="text-white">6 × cable diameter</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Cat6a STP:</span>
                        <span className="text-white">8 × cable diameter</span>
                      </div>
                      <div className="border-t border-gray-600 pt-2 mt-3">
                        <p className="text-xs text-gray-400">During installation: 8× cable diameter minimum</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Fibre Optic Cables</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Single Mode:</span>
                        <span className="text-white">20 × cable diameter</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Multi Mode 50/125:</span>
                        <span className="text-white">15 × cable diameter</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Multi Mode 62.5/125:</span>
                        <span className="text-white">15 × cable diameter</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Armoured Fibre:</span>
                        <span className="text-white">25 × cable diameter</span>
                      </div>
                      <div className="border-t border-gray-600 pt-2 mt-3">
                        <p className="text-xs text-gray-400">Under tension: 30× cable diameter minimum</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Installation Stress Limits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-white mb-3">Pulling Tensions</h4>
                  <div className="bg-card p-4 rounded-lg">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Cat5e/6 4-pair:</span>
                        <span className="text-white">110N (25 lbs)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Cat6a 4-pair:</span>
                        <span className="text-white">180N (40 lbs)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Fibre 2-core:</span>
                        <span className="text-white">270N (60 lbs)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Fibre 12-core:</span>
                        <span className="text-white">600N (135 lbs)</span>
                      </div>
                    </div>
                    <Alert className="mt-4 border-amber-500/20 bg-card">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <AlertDescription className="text-gray-300 text-sm">
                        Never exceed 50% of maximum rated tension during normal installation.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-3">Support Spacing</h4>
                  <div className="bg-card p-4 rounded-lg">
                    <div className="space-y-3">
                      <div>
                        <p className="text-yellow-400 text-sm font-medium mb-1">Horizontal Runs</p>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• Copper cables: 1.5m maximum</li>
                          <li>• Fibre cables: 1.0m maximum</li>
                          <li>• Heavy armoured: 0.5m maximum</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-yellow-400 text-sm font-medium mb-1">Vertical Runs</p>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• Copper cables: 1.0m maximum</li>
                          <li>• Fibre cables: 0.5m maximum</li>
                          <li>• Use strain relief boots</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-yellow-400 text-sm font-medium mb-1">Equipment Areas</p>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• Within 300mm of equipment</li>
                          <li>• Use service loops where required</li>
                          <li>• Avoid tight bends near terminations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Environmental Considerations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-400 mb-2">Temperature Effects</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Cold: Cables become brittle</li>
                    <li>• Heat: Increased flexibility but thermal expansion</li>
                    <li>• Install at moderate temperatures (15-25°C)</li>
                    <li>• Allow for thermal movement</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-400 mb-2">Moisture Control</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Prevent water ingress in containment</li>
                    <li>• Use appropriate cable ratings</li>
                    <li>• Seal penetrations properly</li>
                    <li>• Consider condensation risks</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-400 mb-2">Mechanical Stress</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Avoid crushing under heavy loads</li>
                    <li>• Protect from impact damage</li>
                    <li>• Use appropriate containment depth</li>
                    <li>• Consider building movement</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Common Installation Errors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-white mb-3 flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4 text-red-400" />
                    Separation Violations
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-2 bg-card p-4 rounded-lg">
                    <li>• Running data cables alongside mains power</li>
                    <li>• Insufficient separation from fluorescent fittings</li>
                    <li>• Crossing high-voltage cables without screening</li>
                    <li>• Installing near high-frequency equipment</li>
                    <li>• Ignoring motor control cable interference</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-3 flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4 text-red-400" />
                    Bend Radius Violations
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-2 bg-card p-4 rounded-lg">
                    <li>• Sharp bends around containment edges</li>
                    <li>• Excessive tension during cable pulling</li>
                    <li>• Inadequate support causing cable sag</li>
                    <li>• Kinking during equipment connections</li>
                    <li>• Poor service loop management</li>
                  </ul>
                </div>
              </div>
              
              <Alert className="border-red-500/20 bg-card">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-gray-300">
                  <strong className="text-red-400">Performance Impact:</strong> Violations of separation and bend radius requirements can cause significant signal degradation, 
                  failed certification tests, and unreliable network performance.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Advanced Installation Techniques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Cable Pulling Methods</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Professional installation techniques ensure cable integrity whilst maximising efficiency and minimising installation time.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Manual Pulling Techniques</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Single Cable:</strong> Use pulling sock or tape</li>
                      <li><strong>Multiple Cables:</strong> Bundle with breakout point</li>
                      <li><strong>Pull String:</strong> Always install for future use</li>
                      <li><strong>Lubrication:</strong> Use approved cable lubricant</li>
                      <li><strong>Team Coordination:</strong> One puller, one feeder minimum</li>
                      <li><strong>Force Monitoring:</strong> Stop if resistance increases</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Mechanical Pulling Systems</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Cable Winch:</strong> For long runs over 100m</li>
                      <li><strong>Capstan Winch:</strong> Maintains constant tension</li>
                      <li><strong>Pulling Eyes:</strong> Secure attachment points</li>
                      <li><strong>Force Gauges:</strong> Monitor tension continuously</li>
                      <li><strong>Guide Wheels:</strong> Reduce friction at bends</li>
                      <li><strong>Cable Rollers:</strong> Support long cable lengths</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Quality Control During Installation</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Pre-Installation Checks</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Verify containment route is clear</li>
                      <li>• Check for sharp edges or obstructions</li>
                      <li>• Measure cable lengths required</li>
                      <li>• Prepare pulling equipment and lubricants</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">During Installation</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Monitor pulling tension continuously</li>
                      <li>• Check for cable damage at regular intervals</li>
                      <li>• Maintain minimum bend radius requirements</li>
                      <li>• Document any issues or deviations</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Post-Installation Verification</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Visual inspection for physical damage</li>
                      <li>• Continuity testing on all pairs/fibres</li>
                      <li>• Jacket integrity check</li>
                      <li>• Documentation of installed cable details</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Electromagnetic Compatibility (EMC) Design</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">EMC Zone Concept</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Effective EMC design requires understanding of interference sources and implementing appropriate zoning strategies to maintain signal integrity.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Zone 0 - Clean Environment</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Computer rooms and data centres</li>
                      <li>• Standard containment acceptable</li>
                      <li>• Normal separation distances apply</li>
                      <li>• UTP cables generally suitable</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Zone 1 - Light Industrial</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Offices with some electrical equipment</li>
                      <li>• Increased separation distances required</li>
                      <li>• Consider screened containment</li>
                      <li>• FTP cables may be necessary</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Zone 2 - Heavy Industrial</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Manufacturing environments</li>
                      <li>• Screened containment mandatory</li>
                      <li>• STP cables required</li>
                      <li>• Comprehensive bonding essential</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Bonding and Earthing Requirements</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Metallic Containment Bonding</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Continuous earth throughout system length</li>
                      <li>• Maximum 2Ω resistance between any two points</li>
                      <li>• Use bonding straps at all joints</li>
                      <li>• Connect to main earth terminal via 6mm² minimum</li>
                      <li>• Regular testing of bonding integrity</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Screen Termination</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 360° screen connection at patch panels</li>
                      <li>• Minimise pigtail lengths (&lt;6mm)</li>
                      <li>• Use appropriate screen termination hardware</li>
                      <li>• Maintain screen integrity through containment</li>
                      <li>• Document all screen termination points</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Temperature Management and Derating</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Thermal Considerations</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Elevated temperatures in cable containment can significantly affect cable performance and require derating calculations for reliable operation.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Temperature Derating Factors</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">20°C ambient:</span>
                        <span className="text-white">No derating (1.0)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">30°C ambient:</span>
                        <span className="text-white">0.94 factor</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">40°C ambient:</span>
                        <span className="text-white">0.87 factor</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">50°C ambient:</span>
                        <span className="text-white">0.78 factor</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">60°C ambient:</span>
                        <span className="text-white">0.67 factor</span>
                      </div>
                    </div>
                    <div className="border-t border-gray-600 pt-2 mt-3">
                      <p className="text-xs text-gray-400">Based on 70°C maximum cable temperature</p>
                    </div>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Heat Sources and Mitigation</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Solar Loading:</strong> Consider roof-mounted containment shading</li>
                      <li><strong>Equipment Heat:</strong> Maintain distance from hot surfaces</li>
                      <li><strong>Cable Bundling:</strong> Reduce bundle size in hot areas</li>
                      <li><strong>Ventilation:</strong> Ensure adequate air circulation</li>
                      <li><strong>Thermal Barriers:</strong> Use heat shields where necessary</li>
                      <li><strong>Cable Spacing:</strong> Increase spacing in hot environments</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Thermal Management Strategies</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Natural Ventilation</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Use perforated or mesh containment</li>
                      <li>• Allow air gaps between cable layers</li>
                      <li>• Position intake and exhaust points</li>
                      <li>• Consider stack effect for vertical runs</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Forced Air Cooling</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Install ventilation fans in containment</li>
                      <li>• Use plenum-rated equipment only</li>
                      <li>• Monitor air flow rates regularly</li>
                      <li>• Provide backup systems for critical areas</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Load Management</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Distribute cables across multiple routes</li>
                      <li>• Use larger containment to reduce density</li>
                      <li>• Schedule installation during cooler periods</li>
                      <li>• Monitor cable temperatures during operation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Quiz 
            title="Section 2 Knowledge Check"
            description="Test your understanding of cable separation and bend radius requirements"
            questions={quizQuestions}
          />

          <div className="flex justify-between items-center pt-8 border-t border-gray-700">
            <Link to="../data-cabling-module-4-section-1">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../data-cabling-module-4-section-3">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400/10">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCablingModule4Section2;