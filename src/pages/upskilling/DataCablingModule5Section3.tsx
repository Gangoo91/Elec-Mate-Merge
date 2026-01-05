import { ArrowLeft, ArrowRight, Shield, AlertTriangle, CheckCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/upskilling/Quiz';

const DataCablingModule5Section3 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is the maximum allowable length for a work area cable according to TIA-568?",
      options: [
        "3 metres",
        "5 metres",
        "7 metres", 
        "10 metres"
      ],
      correctAnswer: 1,
      explanation: "TIA-568 specifies that work area cables (equipment cords) should not exceed 5 metres in length to maintain proper signal integrity and prevent excessive attenuation."
    },
    {
      id: 2,
      question: "Which connector performance category must match the cable category for proper system operation?",
      options: [
        "One category lower is acceptable",
        "Must match exactly",
        "One category higher is required",
        "Any category above Cat 5e is suitable"
      ],
      correctAnswer: 1,
      explanation: "The connector performance category must match the cable category exactly to ensure the system meets its intended performance specifications and doesn't create a bottleneck."
    },
    {
      id: 3,
      question: "What is the primary purpose of strain relief in patch cord design?",
      options: [
        "Aesthetic appearance only",
        "Prevent cable damage at connection points",
        "Improve electrical performance",
        "Meet colour coding requirements"
      ],
      correctAnswer: 1,
      explanation: "Strain relief prevents mechanical stress from being transferred to the cable-connector interface, which could cause conductor damage, connection failure, or performance degradation."
    },
    {
      id: 4,
      question: "According to ISO/IEC 11801, what is the maximum NEXT loss for a Cat 6A patch cord at 500MHz?",
      options: [
        "35.3 dB",
        "39.9 dB",
        "44.3 dB",
        "47.4 dB"
      ],
      correctAnswer: 2,
      explanation: "ISO/IEC 11801 specifies that Cat 6A patch cords must achieve a minimum NEXT loss of 44.3 dB at 500MHz to meet Category 6A performance requirements."
    },
    {
      id: 5,
      question: "What is the recommended practice for patch cord management in high-density installations?",
      options: [
        "Use the shortest possible cables only",
        "Implement proper cable management and service loops",
        "Avoid any cable management systems",
        "Use only rigid cables for stability"
      ],
      correctAnswer: 1,
      explanation: "Proper cable management with appropriate service loops ensures reliable connections while allowing for future maintenance and changes without stressing the cables or connectors."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12 max-w-6xl mx-auto">
        <Link to="../data-cabling-module-5">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-8">
          <div className="text-center">
            <Badge variant="secondary" className="bg-yellow-400 text-black mb-4">
              Module 5 • Section 3
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Patch Cord Design and Performance Requirements
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
              Understanding patch cord specifications, design principles, and performance criteria for professional installations
            </p>
          </div>

          <Alert className="border-yellow-400/30 bg-yellow-400/10">
            <Shield className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-foreground">
              <strong className="text-yellow-400">Critical Component:</strong> Patch cords are often the weakest link in network performance. Proper selection and design are essential for maintaining system integrity.
            </AlertDescription>
          </Alert>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Patch Cord Fundamentals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Design Principles and Construction</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Patch cords represent the flexible connection interface between fixed cabling infrastructure and active equipment. 
                  Their design must balance flexibility, durability, and electrical performance whilst maintaining compatibility with connector standards.
                  Understanding these fundamentals helps you select the right patch cord for each application and avoid common installation mistakes.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Construction Requirements</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Cable Type:</strong> Stranded conductors for flexibility (vs solid for permanent links)</li>
                      <li><strong>Jacket Material:</strong> PVC (standard), LSZH (low smoke), or plenum-rated for air handling spaces</li>
                      <li><strong>Conductor Count:</strong> 4-pair (8-conductor) configuration matching TIA-568 standards</li>
                      <li><strong>Impedance:</strong> 100Ω ±15Ω characteristic impedance for proper signal matching</li>
                      <li><strong>Bend Radius:</strong> Minimum 4x cable diameter (typically 25mm for Cat 6A)</li>
                      <li><strong>Temperature Range:</strong> -20°C to +60°C operation, -40°C to +70°C storage</li>
                      <li><strong>Conductor Size:</strong> 24 AWG (Cat 5e), 23 AWG (Cat 6/6A), 22 AWG (Cat 8)</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Performance Categories and Real-World Use</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Category 5e:</strong> Up to 100MHz, supports 1Gbps Ethernet (most desktop computers)</li>
                      <li><strong>Category 6:</strong> Up to 250MHz, guaranteed 1Gbps, short 10Gbps runs (workstations)</li>
                      <li><strong>Category 6A:</strong> Up to 500MHz, full 10Gbps at 100m (servers, high-performance workstations)</li>
                      <li><strong>Category 8:</strong> Up to 2000MHz, 25/40Gbps at 30m (data centre server connections)</li>
                      <li><strong>Shielding Options:</strong> UTP (most common), FTP (foil), SFTP (screen + foil) for EMI environments</li>
                      <li><strong>Length Limits:</strong> 5m maximum for channel testing, 3m recommended for equipment cords</li>
                      <li><strong>Cost Considerations:</strong> Cat 5e ~£2-3, Cat 6 ~£3-5, Cat 6A ~£5-8, Cat 8 ~£15-25</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-800/30 mt-4">
                  <h4 className="font-medium text-green-400 mb-2">💡 Pro Tip: Patch Cord Selection</h4>
                  <p className="text-sm text-green-300">
                    Always match or exceed your permanent link category. Using Cat 5e patch cords on a Cat 6A installation 
                    will limit your entire channel to Cat 5e performance. It's like having a motorway that narrows to a single lane - 
                    the narrowest point determines your overall capacity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Connector Technology and Compatibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">RJ45 Connector Design and Specifications</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The RJ45 connector system forms the critical interface between patch cords and equipment ports. 
                  Proper connector selection and termination directly impact system performance and reliability. Understanding connector technology 
                  helps you troubleshoot connection issues and specify the right components for your installations.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Connector Categories and Applications</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• <strong>Category 5e:</strong> 100MHz performance - Basic office applications, VoIP phones</li>
                      <li>• <strong>Category 6:</strong> 250MHz performance - Desktop computers, wireless access points</li>
                      <li>• <strong>Category 6A:</strong> 500MHz performance - Servers, high-performance workstations</li>
                      <li>• <strong>Category 8:</strong> 2000MHz performance - Data centre equipment, high-speed switches</li>
                      <li>• <strong>Shielded variants:</strong> Industrial environments, hospitals, EMI-sensitive areas</li>
                      <li>• <strong>Industrial-grade:</strong> Harsh environments, outdoor applications, vibration resistance</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Contact Technology Deep Dive</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• <strong>Phosphor bronze:</strong> Standard contact springs, good conductivity and spring properties</li>
                      <li>• <strong>Gold plating:</strong> 50 microinch minimum thickness prevents corrosion and oxidation</li>
                      <li>• <strong>Contact geometry:</strong> Multi-tine design ensures reliable connection even with wear</li>
                      <li>• <strong>Beryllium copper:</strong> High-end applications requiring superior spring characteristics</li>
                      <li>• <strong>Contact resistance:</strong> &lt;20mΩ initial, &lt;40mΩ after 750 mating cycles</li>
                      <li>• <strong>Gas-tight seal:</strong> Prevents oxidation and maintains low resistance over time</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Durability and Testing Standards</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• <strong>Mating cycles:</strong> 750+ minimum (office), 1000+ (data centre), 5000+ (industrial)</li>
                      <li>• <strong>Insertion force:</strong> 40N maximum (about 4kg force) for easy connection</li>
                      <li>• <strong>Retention force:</strong> 20N minimum to prevent accidental disconnection</li>
                      <li>• <strong>Environmental testing:</strong> Salt spray, thermal cycling, humidity exposure</li>
                      <li>• <strong>Mechanical testing:</strong> Cable pull, connector twist, bend testing</li>
                      <li>• <strong>Real-world lifespan:</strong> 5-10 years typical in office environment</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800/30 mt-4">
                  <h4 className="font-medium text-yellow-400 mb-3">🔧 Hands-On: Connector Quality Check</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white font-medium mb-2">Visual Inspection Steps</p>
                      <ol className="text-blue-300 space-y-1 list-decimal list-inside">
                        <li>Check for bent or damaged contact pins</li>
                        <li>Ensure gold plating is intact (no black spots)</li>
                        <li>Verify plastic housing isn't cracked</li>
                        <li>Confirm strain relief boot is properly attached</li>
                        <li>Check latch mechanism operates smoothly</li>
                      </ol>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Performance Testing</p>
                      <ol className="text-blue-300 space-y-1 list-decimal list-inside">
                        <li>Test insertion/extraction force with gauge</li>
                        <li>Measure contact resistance with multimeter</li>
                        <li>Check continuity on all 8 conductors</li>
                        <li>Verify proper pair assignment (T568A/B)</li>
                        <li>Test with cable analyser for full performance</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Advanced Connector Features and Technologies</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Enhanced Performance Features</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Load bar technology for conductor alignment</li>
                      <li>• Compensated connector designs for improved NEXT</li>
                      <li>• Integrated strain relief systems</li>
                      <li>• Anti-snag boot designs for high-density applications</li>
                      <li>• Colour-coded options for circuit identification</li>
                      <li>• Keyed connectors for critical applications</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Environmental Protection</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• IP67-rated connectors for harsh environments</li>
                      <li>• Dust and moisture protection systems</li>
                      <li>• Chemical resistance specifications</li>
                      <li>• UV resistance for outdoor applications</li>
                      <li>• Extended temperature range options</li>
                      <li>• Flame-retardant materials compliance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Electrical Performance Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Critical Performance Parameters</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-3 text-yellow-400">Parameter</th>
                        <th className="text-left p-3 text-yellow-400">Cat 5e</th>
                        <th className="text-left p-3 text-yellow-400">Cat 6</th>
                        <th className="text-left p-3 text-yellow-400">Cat 6A</th>
                        <th className="text-left p-3 text-yellow-400">Significance</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700">
                        <td className="p-3">Insertion Loss @ Max Freq</td>
                        <td className="p-3">0.5 dB @ 100MHz</td>
                        <td className="p-3">0.8 dB @ 250MHz</td>
                        <td className="p-3">1.2 dB @ 500MHz</td>
                        <td className="p-3">Signal strength preservation</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">NEXT @ Max Freq</td>
                        <td className="p-3">35.3 dB @ 100MHz</td>
                        <td className="p-3">39.9 dB @ 250MHz</td>
                        <td className="p-3">44.3 dB @ 500MHz</td>
                        <td className="p-3">Near-end crosstalk rejection</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">Return Loss @ Max Freq</td>
                        <td className="p-3">20.0 dB @ 100MHz</td>
                        <td className="p-3">20.0 dB @ 250MHz</td>
                        <td className="p-3">20.0 dB @ 500MHz</td>
                        <td className="p-3">Impedance matching quality</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">Propagation Delay</td>
                        <td className="p-3">1.112 ns/m max</td>
                        <td className="p-3">1.112 ns/m max</td>
                        <td className="p-3">1.112 ns/m max</td>
                        <td className="p-3">Signal timing preservation</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">Delay Skew</td>
                        <td className="p-3">0.2 ns/m max</td>
                        <td className="p-3">0.2 ns/m max</td>
                        <td className="p-3">0.2 ns/m max</td>
                        <td className="p-3">Pair-to-pair timing difference</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Performance Testing and Validation</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Factory Testing</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• 100% electrical continuity testing</li>
                      <li>• Sample-based performance verification</li>
                      <li>• Environmental stress screening</li>
                      <li>• Mechanical durability testing</li>
                      <li>• Quality control documentation</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Field Verification</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Visual inspection for damage</li>
                      <li>• Connector engagement verification</li>
                      <li>• Cable service loop inspection</li>
                      <li>• Bend radius compliance checking</li>
                      <li>• Length measurement validation</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Performance Impact</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• System bandwidth limitation</li>
                      <li>• Error rate increase potential</li>
                      <li>• Signal integrity degradation</li>
                      <li>• Network reliability impact</li>
                      <li>• Future upgrade limitations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Installation Best Practices and Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Professional Installation Techniques</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Proper Handling Procedures</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Bend Radius:</strong> Never exceed 4x cable diameter</li>
                      <li><strong>Pulling Tension:</strong> Maximum 25lbf (110N) during installation</li>
                      <li><strong>Temperature:</strong> Avoid installation below -10°C</li>
                      <li><strong>Connector Protection:</strong> Use dust caps during storage</li>
                      <li><strong>Cable Routing:</strong> Avoid sharp edges and pinch points</li>
                      <li><strong>Length Planning:</strong> Include service loops in calculations</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Cable Management Systems</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Patch Panels:</strong> Use appropriate density for application</li>
                      <li><strong>Cable Managers:</strong> Horizontal and vertical routing systems</li>
                      <li><strong>Service Loops:</strong> 6-12 inches for future maintenance</li>
                      <li><strong>Velcro Ties:</strong> Preferred over cable ties for flexibility</li>
                      <li><strong>Labelling:</strong> Clear identification at both ends</li>
                      <li><strong>Documentation:</strong> Maintain accurate cable records</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Quality Assurance and Troubleshooting</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Common Issues and Solutions</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• <strong>Intermittent connections:</strong> Check connector seating and corrosion</li>
                      <li>• <strong>Performance degradation:</strong> Verify cable category matching</li>
                      <li>• <strong>Physical damage:</strong> Inspect for kinks, cuts, or excessive bending</li>
                      <li>• <strong>Connector wear:</strong> Monitor mating cycle count and replace when necessary</li>
                      <li>• <strong>Environmental effects:</strong> Consider temperature and humidity impacts</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Preventive Maintenance</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• <strong>Regular inspection:</strong> Quarterly visual examination</li>
                      <li>• <strong>Cleaning protocols:</strong> Use appropriate solvents for contacts</li>
                      <li>• <strong>Replacement scheduling:</strong> Proactive replacement based on usage</li>
                      <li>• <strong>Environmental monitoring:</strong> Track temperature and humidity</li>
                      <li>• <strong>Performance testing:</strong> Annual verification of critical links</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Quiz 
            questions={quizQuestions} 
            title="Patch Cord Design Knowledge Check"
            description="Test your understanding of patch cord design, performance requirements, and installation practices"
          />

          <div className="flex justify-between">
            <Link to="../data-cabling-module-5-section-2">
              <Button variant="outline" className="border-gray-600">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../data-cabling-module-5-section-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
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

export default DataCablingModule5Section3;