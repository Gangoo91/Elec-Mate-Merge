import { ArrowLeft, ArrowRight, Flame, AlertTriangle, CheckCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/upskilling/Quiz';

const DataCablingModule4Section3 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is the minimum fire resistance rating required for penetration sealing in 60-minute fire walls?",
      options: [
        "30 minutes",
        "60 minutes", 
        "90 minutes",
        "120 minutes"
      ],
      correctAnswer: 1,
      explanation: "Penetration sealing must maintain the same fire resistance rating as the element being penetrated - 60 minutes for 60-minute walls."
    },
    {
      id: 2,
      question: "Which intumescent material provides the best performance for cable containment fire-stopping?",
      options: [
        "Intumescent putty",
        "Intumescent pillows",
        "Intumescent blocks", 
        "Intumescent sealant"
      ],
      correctAnswer: 2,
      explanation: "Intumescent blocks provide excellent performance for cable containment as they expand uniformly and maintain structural integrity."
    },
    {
      id: 3,
      question: "What is the maximum percentage of penetration area that cables can occupy in a fire-rated wall?",
      options: [
        "25%",
        "40%",
        "60%", 
        "80%"
      ],
      correctAnswer: 2,
      explanation: "Cables should not exceed 60% of the penetration opening area to allow proper intumescent material expansion and sealing."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
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
              Module 4 • Section 3
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Fire-Stopping and Penetration Sealing
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
              Fire protection and building penetration sealing requirements
            </p>
          </div>

          <Alert className="border-yellow-400/30 bg-yellow-400/10">
            <Flame className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-foreground">
              <strong className="text-yellow-400">Critical Safety Requirement:</strong> All penetrations through fire-rated elements must maintain the fire resistance rating of the building element.
            </AlertDescription>
          </Alert>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Fire Compartmentation Principles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Building Regulations Requirements</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Building Regulations Part B (Fire Safety) requires that the fire resistance of building elements is not compromised by service penetrations. 
                  All cable penetrations must be properly sealed to maintain compartmentation integrity.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Fire Resistance Criteria</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Integrity (E):</strong> No passage of flames or hot gases</li>
                      <li><strong>Insulation (I):</strong> Temperature rise limitation on unexposed face</li>
                      <li><strong>Load Bearing (R):</strong> Structural stability under fire conditions</li>
                      <li><strong>Smoke Leakage (S):</strong> Limitation of smoke and gas passage</li>
                      <li><strong>Mechanical Impact (M):</strong> Resistance to mechanical shock</li>
                      <li><strong>Self-Closing (C):</strong> Automatic closure capability</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Common Fire Ratings</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>30 minutes:</strong> Internal partitions and some floors</li>
                      <li><strong>60 minutes:</strong> Escape route walls and most floors</li>
                      <li><strong>90 minutes:</strong> Structural elements in high buildings</li>
                      <li><strong>120 minutes:</strong> Basement separations and some walls</li>
                      <li><strong>240 minutes:</strong> High-risk areas and critical structures</li>
                      <li><strong>Test Standards:</strong> BS EN 1366-3 for service penetrations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Fire-Stopping Materials and Systems</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Intumescent Materials</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Intumescent materials expand when exposed to heat, forming a char that seals penetration openings and prevents fire spread.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Intumescent Putty</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Easy application and adjustment</li>
                      <li>• Good for small penetrations</li>
                      <li>• Re-enterable for maintenance</li>
                      <li>• Suitable for mixed services</li>
                      <li>• Expansion ratio: 3:1 to 7:1</li>
                      <li>• Operating temp: -40°C to +200°C</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Intumescent Pillows</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Pre-formed standard sizes</li>
                      <li>• Quick installation method</li>
                      <li>• Excellent for cable bundles</li>
                      <li>• Stackable for different depths</li>
                      <li>• Typical ratings: 60-120 minutes</li>
                      <li>• Fabric covering for protection</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Intumescent Blocks</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• High structural integrity</li>
                      <li>• Excellent for large openings</li>
                      <li>• Can be cut to size on site</li>
                      <li>• Good load-bearing capability</li>
                      <li>• Suitable for horizontal installations</li>
                      <li>• Fire ratings up to 240 minutes</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Specialist Fire-Stop Systems</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Cable Transit Systems</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Modular blocks with pre-formed cable slots</li>
                      <li>• Multiple cable sizes in single system</li>
                      <li>• Maintains seal during cable removal</li>
                      <li>• Ideal for equipment rooms and data centres</li>
                      <li>• Easy maintenance and future expansion</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Wrap-Around Systems</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Applied around cables before installation</li>
                      <li>• Suitable for retrofit applications</li>
                      <li>• Self-adhesive tape application</li>
                      <li>• Good for complex cable configurations</li>
                      <li>• Maintains flexibility during installation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Installation Procedures and Standards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Step-by-Step Installation Process</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Pre-Installation Requirements</h4>
                    <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
                      <li>Identify fire rating of penetrated element</li>
                      <li>Select appropriate fire-stop system and materials</li>
                      <li>Verify compatibility with cable types</li>
                      <li>Check environmental conditions and temperatures</li>
                      <li>Prepare surface and remove debris from opening</li>
                      <li>Install any required backing materials or supports</li>
                    </ol>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Installation Steps</h4>
                    <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
                      <li>Install cables through opening maintaining grouping</li>
                      <li>Position intumescent material around cable perimeter</li>
                      <li>Ensure complete contact with wall/floor surfaces</li>
                      <li>Fill voids completely with appropriate material</li>
                      <li>Apply surface protection if required</li>
                      <li>Install identification labels and documentation</li>
                    </ol>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Quality Assurance and Testing</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Visual Inspection</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Complete filling of all voids</li>
                      <li>• Proper material application thickness</li>
                      <li>• No gaps or weak points visible</li>
                      <li>• Correct positioning of support materials</li>
                      <li>• Surface finish meeting specification</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Documentation Requirements</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Penetration location and dimensions</li>
                      <li>• Cable types and quantities installed</li>
                      <li>• Fire-stop materials and system used</li>
                      <li>• Installation date and installer details</li>
                      <li>• Test certificates and approvals</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Ongoing Maintenance</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Regular visual inspection schedule</li>
                      <li>• Check for cracks or deterioration</li>
                      <li>• Verify seal integrity after cable changes</li>
                      <li>• Update documentation for modifications</li>
                      <li>• Professional inspection every 5 years</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Regulatory Compliance and Approvals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">British Standards and European Norms</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-3 text-yellow-400">Standard</th>
                        <th className="text-left p-3 text-yellow-400">Title</th>
                        <th className="text-left p-3 text-yellow-400">Application</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700">
                        <td className="p-3">BS EN 1366-3</td>
                        <td className="p-3">Fire resistance tests for service installations</td>
                        <td className="p-3">Penetration sealing systems</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">BS 476-20</td>
                        <td className="p-3">Fire resistance of elements of construction</td>
                        <td className="p-3">Building element fire testing</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">BS EN 13501-1</td>
                        <td className="p-3">Fire classification of construction products</td>
                        <td className="p-3">Material reaction to fire ratings</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">BS 9999</td>
                        <td className="p-3">Fire safety in the design, management and use of buildings</td>
                        <td className="p-3">Overall fire safety strategy</td>
                      </tr>
                      <tr>
                        <td className="p-3">Building Regulations Part B</td>
                        <td className="p-3">Fire safety</td>
                        <td className="p-3">Legal requirements for fire safety</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Third-Party Certification</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">CERTIFIRE Scheme</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• BRE Global certification programme</li>
                      <li>• Covers fire-stopping products and systems</li>
                      <li>• Regular factory production control</li>
                      <li>• Market surveillance testing</li>
                      <li>• Recognised by Building Control</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Installation Certification</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• FIRAS installer registration scheme</li>
                      <li>• UKAS accredited inspection bodies</li>
                      <li>• Site-specific installation certificates</li>
                      <li>• Warranty and insurance coverage</li>
                      <li>• Professional development requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Advanced Fire-Stop Applications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">High-Risk Environment Solutions</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Specialised fire-stopping applications require enhanced materials and installation techniques to address unique environmental challenges and regulatory requirements.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Hospital and Healthcare Facilities</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Smoke Barriers:</strong> Enhanced sealing for smoke compartments</li>
                      <li><strong>Negative Pressure:</strong> Maintain room pressure differentials</li>
                      <li><strong>Infection Control:</strong> Sealed penetrations prevent contamination</li>
                      <li><strong>Emergency Systems:</strong> Fire alarm and nurse call protection</li>
                      <li><strong>Critical Areas:</strong> Operating theatres and ICU protection</li>
                      <li><strong>Regulatory Compliance:</strong> HTM and NHS guidelines</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Data Centres and Server Rooms</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Raised Floor Systems:</strong> Under-floor cable protection</li>
                      <li><strong>Clean Agent Systems:</strong> Compatibility with FM200/Novec</li>
                      <li><strong>Continuous Operation:</strong> Minimal downtime requirements</li>
                      <li><strong>Cable Density:</strong> High-capacity penetration solutions</li>
                      <li><strong>Future Expansion:</strong> Re-enterable systems for changes</li>
                      <li><strong>Environmental Control:</strong> Maintain room pressurisation</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Offshore and Marine Applications</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Environmental Challenges</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Salt water corrosion resistance</li>
                      <li>• Extreme temperature variations</li>
                      <li>• High humidity and condensation</li>
                      <li>• Vibration and movement stresses</li>
                      <li>• UV radiation exposure</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Material Requirements</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Marine-grade intumescent materials</li>
                      <li>• Stainless steel fixing systems</li>
                      <li>• Halogen-free formulations</li>
                      <li>• Enhanced UV stability</li>
                      <li>• Flexible expansion characteristics</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Installation Considerations</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Weather protection during installation</li>
                      <li>• Surface preparation in salt environments</li>
                      <li>• Enhanced quality control procedures</li>
                      <li>• Regular inspection and maintenance</li>
                      <li>• Emergency repair procedures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Installation Procedures and Techniques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Detailed Installation Methodology</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Professional fire-stopping installation requires systematic approach, proper preparation, and adherence to manufacturer specifications for reliable performance.
                </p>
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-400 mb-3">Pre-Installation Assessment</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-white font-medium mb-2">Site Survey Requirements</p>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Identify all penetration locations and sizes</li>
                        <li>• Determine wall/floor construction and fire ratings</li>
                        <li>• Assess cable types, quantities, and future requirements</li>
                        <li>• Check environmental conditions and access limitations</li>
                        <li>• Review architectural and MEP drawings for conflicts</li>
                        <li>• Coordinate with other trades and building occupants</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Material Selection Process</p>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Match fire-stop rating to building element rating</li>
                        <li>• Verify compatibility with all cable jacket materials</li>
                        <li>• Consider environmental factors and operating temperatures</li>
                        <li>• Check for specific performance requirements (smoke, water)</li>
                        <li>• Ensure compliance with local building codes</li>
                        <li>• Obtain necessary approvals and test certificates</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Step-by-Step Installation Process</h4>
                <div className="space-y-4">
                  <div className="border border-gray-600 p-3 rounded">
                    <p className="text-white font-medium mb-2">Step 1: Surface Preparation</p>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Clean penetration opening of debris, dust, and loose material</li>
                      <li>• Remove any oil, grease, or other contaminants from surfaces</li>
                      <li>• Ensure surfaces are dry and at appropriate temperature</li>
                      <li>• Install backing materials if required for deep penetrations</li>
                    </ul>
                  </div>
                  <div className="border border-gray-600 p-3 rounded">
                    <p className="text-white font-medium mb-2">Step 2: Cable Installation and Grouping</p>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Install cables through opening maintaining proper spacing</li>
                      <li>• Group similar cable types together where possible</li>
                      <li>• Ensure cables are properly supported on both sides</li>
                      <li>• Leave adequate working space around cable bundle</li>
                    </ul>
                  </div>
                  <div className="border border-gray-600 p-3 rounded">
                    <p className="text-white font-medium mb-2">Step 3: Fire-Stop Material Application</p>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Apply intumescent material around cable perimeter</li>
                      <li>• Ensure complete contact between material and wall surfaces</li>
                      <li>• Fill all voids completely with appropriate material</li>
                      <li>• Maintain manufacturer's specified thickness requirements</li>
                    </ul>
                  </div>
                  <div className="border border-gray-600 p-3 rounded">
                    <p className="text-white font-medium mb-2">Step 4: Finishing and Protection</p>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Apply surface protection or covering if required</li>
                      <li>• Install identification labels and documentation</li>
                      <li>• Clean excess material from surrounding surfaces</li>
                      <li>• Conduct visual inspection and quality checks</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Testing and Certification Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Performance Testing Standards</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Fire-stop systems must undergo rigorous testing to verify performance under fire conditions and ensure compliance with building safety requirements.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">BS EN 1366-3 Test Methodology</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Test Specimen:</strong> Representative wall/floor construction</li>
                      <li><strong>Cable Configuration:</strong> Typical installation arrangement</li>
                      <li><strong>Heating Regime:</strong> Standard fire curve (ISO 834)</li>
                      <li><strong>Pressure Differential:</strong> 25 Pa across specimen</li>
                      <li><strong>Duration:</strong> Required fire resistance period</li>
                      <li><strong>Measurement:</strong> Temperature, integrity, and insulation</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Performance Criteria</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Integrity (E):</strong> No flame penetration or critical crack</li>
                      <li><strong>Insulation (I):</strong> Temperature rise &lt;140°C average, &lt;180°C max</li>
                      <li><strong>Smoke Leakage (S):</strong> Limited gas flow rate</li>
                      <li><strong>Mechanical Impact (M):</strong> Resistance to impact loading</li>
                      <li><strong>Water Tightness (W):</strong> Resistance to water penetration</li>
                      <li><strong>Classification:</strong> EI 60, EI 120, etc.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Certification and Approval Process</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Product Certification</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• CERTIFIRE product certification</li>
                      <li>• CE marking compliance</li>
                      <li>• Third-party test laboratory reports</li>
                      <li>• Product data sheets and installation guides</li>
                      <li>• Quality management system certification</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Installation Certification</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• FIRAS contractor registration</li>
                      <li>• Installer training and competency</li>
                      <li>• Site-specific installation certificates</li>
                      <li>• Quality control inspection records</li>
                      <li>• As-installed documentation</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Ongoing Compliance</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Regular surveillance testing</li>
                      <li>• Factory production control</li>
                      <li>• Market surveillance compliance</li>
                      <li>• Change control procedures</li>
                      <li>• Technical assessment updates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Maintenance and Inspection Procedures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Scheduled Maintenance Requirements</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Regular inspection and maintenance of fire-stopping systems ensures continued performance and compliance with building safety obligations.
                </p>
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-400 mb-3">Inspection Schedule and Criteria</h4>
                  <div className="space-y-4">
                    <div className="border border-gray-600 p-3 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">Monthly Visual Inspection</span>
                        <span className="text-yellow-400">Building Occupier</span>
                      </div>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Check for obvious damage or deterioration</li>
                        <li>• Verify penetration seals are intact</li>
                        <li>• Look for signs of water damage or leaks</li>
                        <li>• Document any changes or additions</li>
                      </ul>
                    </div>
                    <div className="border border-gray-600 p-3 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">Annual Detailed Inspection</span>
                        <span className="text-yellow-400">Competent Person</span>
                      </div>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Detailed examination of all fire-stop installations</li>
                        <li>• Check material condition and adhesion</li>
                        <li>• Verify compliance with original specifications</li>
                        <li>• Update documentation and asset registers</li>
                      </ul>
                    </div>
                    <div className="border border-gray-600 p-3 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">Five-Year Professional Assessment</span>
                        <span className="text-yellow-400">FIRAS Approved</span>
                      </div>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Comprehensive system performance review</li>
                        <li>• Compliance verification with current standards</li>
                        <li>• Recommendations for upgrades or replacements</li>
                        <li>• Professional certification of continued performance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Repair and Remediation Procedures</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Common Repair Requirements</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Material shrinkage or cracking repair</li>
                      <li>• Additional cable installation accommodation</li>
                      <li>• Damage from building modifications</li>
                      <li>• Environmental degradation remediation</li>
                      <li>• Non-compliant installation correction</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Emergency Response Procedures</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Immediate temporary sealing measures</li>
                      <li>• Risk assessment and mitigation</li>
                      <li>• Notification of building control authority</li>
                      <li>• Priority permanent repair scheduling</li>
                      <li>• Documentation of emergency actions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Common Problems and Solutions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-white mb-3 flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4 text-red-400" />
                    Common Installation Errors
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-2 bg-card p-4 rounded-lg">
                    <li>• Incomplete filling of penetration voids</li>
                    <li>• Wrong material selection for cable types</li>
                    <li>• Inadequate surface preparation</li>
                    <li>• Missing backing materials in deep penetrations</li>
                    <li>• Insufficient material thickness or coverage</li>
                    <li>• Mixing incompatible fire-stop materials</li>
                    <li>• Poor documentation and labelling</li>
                    <li>• Ignoring manufacturer's installation instructions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-3 flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                    Best Practice Solutions
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-2 bg-card p-4 rounded-lg">
                    <li>• Use only tested and certified systems</li>
                    <li>• Follow manufacturer's instructions exactly</li>
                    <li>• Provide adequate installer training</li>
                    <li>• Implement quality control inspection process</li>
                    <li>• Maintain detailed installation records</li>
                    <li>• Use appropriate tools and equipment</li>
                    <li>• Plan penetrations during design stage</li>
                    <li>• Regular review and updating of procedures</li>
                  </ul>
                </div>
              </div>
              
              <Alert className="border-red-500/20 bg-card">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-gray-300">
                  <strong className="text-red-400">Critical Warning:</strong> Improper fire-stopping can compromise building safety and violate Building Regulations. 
                  Always use certified materials and qualified installers for fire-stopping work.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Quiz 
            title="Section 3 Knowledge Check"
            description="Test your understanding of fire-stopping and penetration sealing"
            questions={quizQuestions}
          />

          <div className="flex justify-between items-center pt-8 border-t border-gray-700">
            <Link to="../data-cabling-module-4-section-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../data-cabling-module-4-section-4">
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

export default DataCablingModule4Section3;