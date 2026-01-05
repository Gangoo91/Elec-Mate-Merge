import { ArrowLeft, ArrowRight, Container, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/upskilling/Quiz';

const DataCablingModule4Section1 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is the minimum radius for bending Cat6 cable during installation?",
      options: [
        "2 times the cable diameter",
        "4 times the cable diameter", 
        "6 times the cable diameter",
        "8 times the cable diameter"
      ],
      correctAnswer: 1,
      explanation: "Cat6 cable should have a minimum bend radius of 4 times the cable diameter to prevent damage to internal conductors."
    },
    {
      id: 2,
      question: "Which containment system provides the best EMC protection?",
      options: [
        "Plastic trunking",
        "Cable basket",
        "Steel conduit",
        "Cable tray"
      ],
      correctAnswer: 2,
      explanation: "Steel conduit provides excellent EMC protection by creating a continuous metallic screen around cables."
    },
    {
      id: 3,
      question: "What is the maximum cable fill ratio for conduit?",
      options: [
        "30%",
        "40%",
        "50%",
        "60%"
      ],
      correctAnswer: 1,
      explanation: "Conduit should not exceed 40% fill ratio to allow for heat dissipation and future cable additions."
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
              Module 4 • Section 1
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Containment Systems: Basket, Conduit, Trunking
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
              Cable containment systems and installation methods
            </p>
          </div>

          <Alert className="border-yellow-400/30 bg-yellow-400/10">
            <Container className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-foreground">
              <strong className="text-yellow-400">BS 7671 Compliance:</strong> All containment systems must comply with current wiring regulations for fire performance and mechanical protection.
            </AlertDescription>
          </Alert>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center">
                <Container className="mr-2 h-5 w-5" />
                Cable Containment Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Purpose and Requirements</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Cable containment systems provide mechanical protection, support, and organisation for data cabling installations. 
                  They must be selected based on environmental conditions, cable type, fire requirements, and electromagnetic compatibility needs.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Primary Functions</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Physical protection from damage</li>
                      <li>• Cable organisation and routing</li>
                      <li>• Heat dissipation management</li>
                      <li>• EMC screening (if required)</li>
                      <li>• Fire compartmentation support</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Selection Criteria</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Environmental classification</li>
                      <li>• Fire performance requirements</li>
                      <li>• Mechanical strength needed</li>
                      <li>• EMC considerations</li>
                      <li>• Installation accessibility</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Cable Basket Systems</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Cable basket systems provide excellent ventilation and easy access for maintenance whilst offering good cable support over long spans.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Advantages</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Excellent ventilation</li>
                    <li>• Easy cable access</li>
                    <li>• Good span capability</li>
                    <li>• Cost effective</li>
                    <li>• Various load ratings</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Applications</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Plant rooms</li>
                    <li>• Office environments</li>
                    <li>• Long horizontal runs</li>
                    <li>• High cable density areas</li>
                    <li>• Above suspended ceilings</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Specifications</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Widths: 50-600mm</li>
                    <li>• Depths: 25-150mm</li>
                    <li>• Material: Steel/Stainless</li>
                    <li>• Finish: Galvanised/Powder</li>
                    <li>• Spans: Up to 3m</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Conduit Systems</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Conduit provides maximum mechanical and EMC protection for cables in demanding environments or where high security is required.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-white mb-3">Steel Conduit</h4>
                  <div className="bg-card p-4 rounded-lg">
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Heavy Gauge:</strong> Maximum protection, exterior use</li>
                      <li><strong>Light Gauge:</strong> Interior installations, cost effective</li>
                      <li><strong>Flexible:</strong> Short runs, equipment connections</li>
                      <li><strong>EMC Performance:</strong> Excellent screening when properly bonded</li>
                      <li><strong>Fire Rating:</strong> Non-combustible, maintains integrity</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-3">PVC Conduit</h4>
                  <div className="bg-card p-4 rounded-lg">
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Standard:</strong> Interior dry locations only</li>
                      <li><strong>LSZH:</strong> Low smoke zero halogen for public areas</li>
                      <li><strong>Flexible:</strong> Equipment connections, tight bends</li>
                      <li><strong>Corrosion:</strong> Excellent chemical resistance</li>
                      <li><strong>Installation:</strong> Lighter weight, easier handling</li>
                    </ul>
                  </div>
                </div>
              </div>
              <Alert className="border-amber-500/20 bg-card">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <AlertDescription className="text-gray-300">
                  <strong>Fill Ratios:</strong> Maximum 40% for single cable type, 35% for mixed cables. Always allow space for heat dissipation and future additions.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Trunking Systems</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Trunking systems offer a balance between protection, accessibility, and cable capacity for medium to large installations.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-white mb-3">Mini Trunking (25-50mm)</h4>
                  <div className="bg-card p-4 rounded-lg space-y-3">
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Desktop cable management</li>
                      <li>• Small office installations</li>
                      <li>• Patch cord organisation</li>
                      <li>• Surface mounted applications</li>
                    </ul>
                    <div className="border-t border-gray-600 pt-2">
                      <p className="text-xs text-gray-400">Typical capacity: 2-8 Cat6 cables</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-3">Maxi Trunking (75-300mm)</h4>
                  <div className="bg-card p-4 rounded-lg space-y-3">
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Backbone cable routes</li>
                      <li>• Floor/ceiling distribution</li>
                      <li>• Mixed cable types</li>
                      <li>• Compartmentalised designs</li>
                    </ul>
                    <div className="border-t border-gray-600 pt-2">
                      <p className="text-xs text-gray-400">Typical capacity: 20-200+ Cat6 cables</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Compartmentalisation Requirements</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-1">Power Separation</p>
                    <p className="text-gray-300">Minimum 25mm partition between mains and data cables</p>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Fire Barriers</p>
                    <p className="text-gray-300">Intumescent barriers at fire compartment boundaries</p>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Access Points</p>
                    <p className="text-gray-300">Maximum 3m spacing for cable access and maintenance</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Fire Performance and Safety</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Reaction to Fire Classifications</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Containment systems must meet appropriate fire performance standards depending on their location and application. 
                  BS EN 13501-1 provides the European classification system for reaction to fire performance.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Steel Containment</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Classification:</strong> A1 - Non-combustible</li>
                      <li><strong>Fire Spread:</strong> No contribution to fire</li>
                      <li><strong>Smoke Production:</strong> None</li>
                      <li><strong>Flaming Droplets:</strong> None</li>
                      <li><strong>Applications:</strong> All areas including escape routes</li>
                      <li><strong>Integrity:</strong> Maintains structural properties</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Plastic Containment</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Standard PVC:</strong> Typically B2-d0 classification</li>
                      <li><strong>LSZH Materials:</strong> Better smoke characteristics</li>
                      <li><strong>Halogen-Free:</strong> Reduced toxic gas emission</li>
                      <li><strong>Flame Retardant:</strong> Self-extinguishing properties</li>
                      <li><strong>Restrictions:</strong> May be limited in escape routes</li>
                      <li><strong>Testing:</strong> Regular assessment of ageing effects</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Fire Compartmentation Requirements</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Penetration Sealing</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Use approved fire-stopping materials</li>
                      <li>• Maintain fire rating of penetrated element</li>
                      <li>• Install intumescent barriers in containment</li>
                      <li>• Document all penetrations and sealing methods</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Integrity Maintenance</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Regular inspection of fire barriers</li>
                      <li>• Check for gaps or damage after cable additions</li>
                      <li>• Use only compatible sealing products</li>
                      <li>• Maintain access for emergency services</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Environmental Classifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">IP Rating Requirements</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Containment systems must provide appropriate ingress protection based on environmental conditions and installation location.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-3 text-yellow-400">Location</th>
                        <th className="text-left p-3 text-yellow-400">Minimum IP Rating</th>
                        <th className="text-left p-3 text-yellow-400">Containment Type</th>
                        <th className="text-left p-3 text-yellow-400">Additional Requirements</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700">
                        <td className="p-3">Internal Dry Areas</td>
                        <td className="p-3">IP20</td>
                        <td className="p-3">Standard trunking, basket</td>
                        <td className="p-3">Basic dust protection</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">Plant Rooms</td>
                        <td className="p-3">IP44</td>
                        <td className="p-3">Sealed trunking, conduit</td>
                        <td className="p-3">Water spray protection</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">External Applications</td>
                        <td className="p-3">IP65</td>
                        <td className="p-3">Sealed conduit systems</td>
                        <td className="p-3">UV stabilised materials</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">Wash-down Areas</td>
                        <td className="p-3">IP66</td>
                        <td className="p-3">Stainless steel, sealed</td>
                        <td className="p-3">High-pressure water jets</td>
                      </tr>
                      <tr>
                        <td className="p-3">Hazardous Areas</td>
                        <td className="p-3">IP66+</td>
                        <td className="p-3">ATEX certified systems</td>
                        <td className="p-3">Explosion prevention</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Load Calculations and Structural Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Cable Weight Considerations</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Accurate load calculations are essential for safe containment system design and prevent structural failure or excessive deflection.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Typical Cable Weights (per metre)</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Cat5e UTP:</span>
                        <span className="text-white">40g/m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Cat6 UTP:</span>
                        <span className="text-white">55g/m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Cat6a UTP:</span>
                        <span className="text-white">75g/m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Cat6a STP:</span>
                        <span className="text-white">120g/m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Fibre 4-core:</span>
                        <span className="text-white">25g/m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Fibre 24-core:</span>
                        <span className="text-white">180g/m</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Load Calculation Example</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-white font-medium">100m basket with 50 × Cat6 cables:</p>
                        <p className="text-gray-300">Cable weight: 50 × 55g/m × 100m = 275kg</p>
                        <p className="text-gray-300">Safety factor: 275kg × 2.5 = 687.5kg</p>
                        <p className="text-yellow-400">Required basket rating: 700kg minimum</p>
                      </div>
                      <div className="border-t border-gray-600 pt-2">
                        <p className="text-xs text-gray-400">
                          Always apply minimum 2.5 safety factor for static loads
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Support Structure Requirements</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Bracket Spacing</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Light loads (&lt;25kg): 1.5m max</li>
                      <li>• Medium loads (25-50kg): 1.0m max</li>
                      <li>• Heavy loads (&gt;50kg): 0.75m max</li>
                      <li>• Within 300mm of changes in direction</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Fixing Requirements</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Use appropriate fixings for substrate</li>
                      <li>• Minimum M8 for medium loads</li>
                      <li>• Chemical anchors for hollow sections</li>
                      <li>• Regular inspection of fixing integrity</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Deflection Limits</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Maximum span/200 under full load</li>
                      <li>• Typically 5mm maximum for 1m span</li>
                      <li>• Consider dynamic loading effects</li>
                      <li>• Account for cable installation forces</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Installation Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-white mb-3 flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                    Do's
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-2 bg-card p-4 rounded-lg">
                    <li>• Plan routes to minimise bends and joints</li>
                    <li>• Maintain proper support spacing (max 1.5m)</li>
                    <li>• Use appropriate load ratings for cable weight</li>
                    <li>• Ensure adequate ventilation for heat dissipation</li>
                    <li>• Bond metallic systems for EMC continuity</li>
                    <li>• Label all containment sections clearly</li>
                    <li>• Allow 25% spare capacity for future expansion</li>
                    <li>• Install containment before cable pulling</li>
                    <li>• Use proper lifting equipment for heavy sections</li>
                    <li>• Check alignment before final fixing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-3 flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4 text-red-400" />
                    Don'ts
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-2 bg-card p-4 rounded-lg">
                    <li>• Exceed maximum fill ratios (40% max)</li>
                    <li>• Install sharp bends or tight radius curves</li>
                    <li>• Mix incompatible cable types without separation</li>
                    <li>• Use damaged or corroded containment</li>
                    <li>• Install in areas exceeding temperature ratings</li>
                    <li>• Forget fire-stopping at compartment boundaries</li>
                    <li>• Block access for future maintenance</li>
                    <li>• Ignore manufacturer's installation instructions</li>
                    <li>• Use incorrect fixings for the substrate type</li>
                    <li>• Install without considering thermal expansion</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Quiz 
            title="Section 1 Knowledge Check"
            description="Test your understanding of cable containment systems"
            questions={quizQuestions}
          />

          <div className="flex justify-between items-center pt-8 border-t border-gray-700">
            <div></div>
            <Link to="../data-cabling-module-4-section-2">
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

export default DataCablingModule4Section1;