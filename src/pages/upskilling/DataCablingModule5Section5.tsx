import { ArrowLeft, Globe, AlertTriangle, CheckCircle, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/upskilling/Quiz';

const DataCablingModule5Section5 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is the maximum supported frequency range for Category 8 cabling systems?",
      options: [
        "500 MHz",
        "1000 MHz",
        "1600 MHz",
        "2000 MHz"
      ],
      correctAnswer: 3,
      explanation: "Category 8 cabling systems support frequencies up to 2000 MHz (2 GHz), enabling 25GBASE-T and 40GBASE-T applications over shorter distances."
    },
    {
      id: 2,
      question: "What is the maximum channel length for Category 8 installations?",
      options: [
        "30 metres",
        "50 metres", 
        "90 metres",
        "100 metres"
      ],
      correctAnswer: 0,
      explanation: "Category 8 has a maximum channel length of 30 metres (24m permanent link + 6m patch cords) to support high-speed applications while maintaining signal integrity."
    },
    {
      id: 3,
      question: "Which connector type is mandatory for Category 8.1 applications?",
      options: [
        "RJ45 (8P8C)",
        "GG45",
        "TERA",
        "ARJ45"
      ],
      correctAnswer: 0,
      explanation: "Category 8.1 uses standard RJ45 (8P8C) connectors for backward compatibility with existing systems, while Cat 8.2 uses different connector types like GG45 or TERA."
    },
    {
      id: 4,
      question: "What is the primary application for Category 8 cabling in data centres?",
      options: [
        "Desktop computer connections",
        "Server-to-switch and switch-to-switch connections",
        "Wireless access point connections",
        "Building backbone cabling"
      ],
      correctAnswer: 1,
      explanation: "Category 8 is primarily designed for short-distance, high-speed data centre applications, particularly server-to-switch and switch-to-switch connections requiring 25G or 40G speeds."
    },
    {
      id: 5,
      question: "What is the key electromagnetic compatibility requirement for Category 8 installations?",
      options: [
        "Unshielded cable is preferred",
        "Shielded cable with proper grounding",
        "Special fire-rated jackets only",
        "Increased bend radius requirements"
      ],
      correctAnswer: 1,
      explanation: "Category 8 requires shielded cable (S/FTP) with proper grounding to handle the high frequencies up to 2 GHz and prevent electromagnetic interference in dense data centre environments."
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
              Module 5 • Section 5
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Future-Proofing Network Infrastructure
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
              Emerging technologies, Category 8 systems, and strategic planning for next-generation network requirements
            </p>
          </div>

          <Alert className="border-yellow-400/30 bg-yellow-400/10">
            <Globe className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-foreground">
              <strong className="text-yellow-400">Future-Ready:</strong> Network infrastructure investments must consider emerging technologies and bandwidth requirements to maintain relevance over 15-20 year lifecycles.
            </AlertDescription>
          </Alert>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center">
                <Wifi className="mr-2 h-5 w-5" />
                Category 8 Technology and Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Next-Generation Copper Technology</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Category 8 represents the latest evolution in copper cabling technology, designed specifically for short-distance, 
                  high-speed data centre applications requiring 25 Gbps and 40 Gbps transmission rates. While not suitable for general 
                  office installations due to distance limitations, Cat 8 fills a crucial niche in data centre server connectivity.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Category 8.1 Specifications and Use Cases</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Frequency Range:</strong> Up to 2000 MHz (2 GHz) - 4x higher than Cat 6A</li>
                      <li><strong>Channel Length:</strong> Maximum 30 metres (vs 100m for other categories)</li>
                      <li><strong>Permanent Link:</strong> Maximum 24 metres (shorter for better performance)</li>
                      <li><strong>Patch Cords:</strong> Maximum 6 metres total (3m each end recommended)</li>
                      <li><strong>Connector:</strong> Standard RJ45 (8P8C) - existing tooling works</li>
                      <li><strong>Backward Compatibility:</strong> Works with Cat 6A infrastructure and equipment</li>
                      <li><strong>Cost Factor:</strong> 3-5x more expensive than Cat 6A but cheaper than fibre + transceivers</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Category 8.2 Specifications and Applications</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Frequency Range:</strong> Up to 2000 MHz (2 GHz) - same as 8.1</li>
                      <li><strong>Channel Length:</strong> Maximum 30 metres (optimised for data centres)</li>
                      <li><strong>Connectors:</strong> GG45, TERA, or ARJ45 (non-RJ45 options)</li>
                      <li><strong>Applications:</strong> Specialised data centre use, future-proofing</li>
                      <li><strong>Compatibility:</strong> Limited backward compatibility with existing systems</li>
                      <li><strong>Performance:</strong> Enhanced alien crosstalk rejection in dense bundles</li>
                      <li><strong>Market Reality:</strong> Limited adoption due to connector incompatibility</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-800/30 mt-4">
                  <h4 className="font-medium text-purple-400 mb-2">🏢 Where Cat 8 Makes Sense</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-white font-medium mb-1">Data Centre Top-of-Rack</p>
                      <ul className="text-purple-300 space-y-1">
                        <li>• Server to switch connections</li>
                        <li>• Storage area network links</li>
                        <li>• High-frequency trading systems</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">Equipment Rooms</p>
                      <ul className="text-purple-300 space-y-1">
                        <li>• Switch-to-switch interconnects</li>
                        <li>• Core network equipment links</li>
                        <li>• High-performance computing clusters</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">Specialised Applications</p>
                      <ul className="text-purple-300 space-y-1">
                        <li>• Broadcast video production</li>
                        <li>• Medical imaging systems</li>
                        <li>• Industrial automation control</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">High-Speed Ethernet Applications and Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">25GBASE-T and 40GBASE-T Implementation</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Category 8 enables 25 Gigabit and 40 Gigabit Ethernet over copper, providing cost-effective alternatives 
                  to fibre optic solutions for short-distance data centre interconnections.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-3 text-yellow-400">Ethernet Standard</th>
                        <th className="text-left p-3 text-yellow-400">Speed</th>
                        <th className="text-left p-3 text-yellow-400">Cable Type</th>
                        <th className="text-left p-3 text-yellow-400">Max Distance</th>
                        <th className="text-left p-3 text-yellow-400">Power Consumption</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700">
                        <td className="p-3">10GBASE-T</td>
                        <td className="p-3">10 Gbps</td>
                        <td className="p-3">Cat 6A</td>
                        <td className="p-3">100 metres</td>
                        <td className="p-3">4-8W per port</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">25GBASE-T</td>
                        <td className="p-3">25 Gbps</td>
                        <td className="p-3">Cat 8</td>
                        <td className="p-3">30 metres</td>
                        <td className="p-3">8-12W per port</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">40GBASE-T</td>
                        <td className="p-3">40 Gbps</td>
                        <td className="p-3">Cat 8</td>
                        <td className="p-3">30 metres</td>
                        <td className="p-3">12-16W per port</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">100GBASE-T</td>
                        <td className="p-3">100 Gbps</td>
                        <td className="p-3">Future Cat 8+</td>
                        <td className="p-3">15 metres (projected)</td>
                        <td className="p-3">20-25W per port</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Data Centre Architecture and Deployment Strategies</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Top-of-Rack (ToR) Design</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Cat 8 for server-to-switch connections</li>
                      <li>• Fibre for switch-to-spine uplinks</li>
                      <li>• Reduced latency and power consumption</li>
                      <li>• Simplified cable management</li>
                      <li>• Cost-effective for 25G applications</li>
                      <li>• Easy maintenance and upgrades</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">End-of-Row (EoR) Design</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Longer cable runs within 30m limit</li>
                      <li>• Centralised switching architecture</li>
                      <li>• Higher density switch ports</li>
                      <li>• Cat 8 for high-speed interconnects</li>
                      <li>• Potential for future 40G upgrades</li>
                      <li>• Structured cabling approach</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Hybrid Architectures</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Cat 8 for critical high-speed links</li>
                      <li>• Cat 6A for general purpose connections</li>
                      <li>• Fibre for long-distance backbone</li>
                      <li>• Flexible migration strategies</li>
                      <li>• Cost-optimised implementations</li>
                      <li>• Performance where needed approach</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Emerging Technologies and Market Trends</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Next-Generation Network Requirements</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Artificial Intelligence and Machine Learning Infrastructure</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>GPU Clusters:</strong> High-bandwidth interconnect requirements (25-100Gbps per connection)</li>
                      <li><strong>Data Processing:</strong> Low-latency, high-speed connections for real-time analytics</li>
                      <li><strong>Model Training:</strong> Sustained high throughput demands between compute nodes</li>
                      <li><strong>Real-time Inference:</strong> Minimal latency requirements (&lt;1ms) for live applications</li>
                      <li><strong>Storage Access:</strong> High-speed data retrieval needs for large datasets</li>
                      <li><strong>Distributed Computing:</strong> Inter-node communication in compute clusters</li>
                      <li><strong>Network Impact:</strong> Traditional 1Gbps networks become bottlenecks</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Internet of Things (IoT) and Smart Building Integration</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Massive Connectivity:</strong> Thousands of devices per switch port (time-division access)</li>
                      <li><strong>Edge Computing:</strong> Local processing requirements reduce cloud dependence</li>
                      <li><strong>Sensor Networks:</strong> Low-power device support with centralised management</li>
                      <li><strong>Real-time Analytics:</strong> Immediate data processing for automated responses</li>
                      <li><strong>Security Integration:</strong> Network-level device protection and access control</li>
                      <li><strong>Bandwidth Aggregation:</strong> Collective traffic management from many small devices</li>
                      <li><strong>Infrastructure Challenge:</strong> Balancing individual device needs with network capacity</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-green-900/20 p-4 rounded-lg border border-green-800/30 mt-4">
                  <h4 className="font-medium text-green-400 mb-3">📊 Bandwidth Growth Reality Check</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-white font-medium mb-2">Historical Growth (2010-2020)</p>
                      <ul className="text-green-300 space-y-1">
                        <li>• 2010: 100Mbps typical desktop</li>
                        <li>• 2015: 1Gbps becoming standard</li>
                        <li>• 2020: 1Gbps universal, 10Gbps emerging</li>
                        <li>• Average annual growth: ~26%</li>
                        <li>• Driving factors: Video, cloud, remote work</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Current Trends (2020-2025)</p>
                      <ul className="text-green-300 space-y-1">
                        <li>• Multi-gigabit to desktop emerging</li>
                        <li>• 10Gbps for power users/servers</li>
                        <li>• 25Gbps in data centres</li>
                        <li>• Wi-Fi 6/6E increasing wireless demands</li>
                        <li>• 4K/8K video, VR/AR applications</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-medium mb-2">Future Projections (2025-2030)</p>
                      <ul className="text-green-300 space-y-1">
                        <li>• 2.5/5Gbps standard desktop</li>
                        <li>• 10Gbps common for workstations</li>
                        <li>• 25/40Gbps in server environments</li>
                        <li>• 100Gbps for backbone connections</li>
                        <li>• Metaverse, holographic applications</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Cloud and Virtualisation Evolution</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Hyperconverged Infrastructure</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Software-defined networking requirements</li>
                      <li>• Storage traffic convergence on Ethernet</li>
                      <li>• Virtual machine mobility support</li>
                      <li>• Container orchestration networking</li>
                      <li>• Microservices communication patterns</li>
                      <li>• Multi-tenant network isolation</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">5G and Edge Computing</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Ultra-low latency requirements (1ms)</li>
                      <li>• Massive MIMO antenna system support</li>
                      <li>• Network slicing implementation</li>
                      <li>• Edge data centre interconnection</li>
                      <li>• Fronthaul and backhaul convergence</li>
                      <li>• Mission-critical application support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Strategic Infrastructure Planning and Investment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Long-term Technology Roadmap Planning</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Short-term (1-3 years)</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Cat 6A deployments for 10G readiness</li>
                      <li>• PoE+ infrastructure for device support</li>
                      <li>• Wi-Fi 6 access point upgrades</li>
                      <li>• Basic IoT device integration</li>
                      <li>• Security system modernisation</li>
                      <li>• Building automation expansion</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Medium-term (3-7 years)</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Selective Cat 8 implementations</li>
                      <li>• 25G switch infrastructure</li>
                      <li>• Advanced PoE (60-90W) systems</li>
                      <li>• Edge computing deployment</li>
                      <li>• 5G small cell integration</li>
                      <li>• AI/ML infrastructure support</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Long-term (7-15 years)</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• 40G copper where applicable</li>
                      <li>• Converged fibre/copper architectures</li>
                      <li>• Autonomous building systems</li>
                      <li>• Massive IoT deployments</li>
                      <li>• Quantum networking preparation</li>
                      <li>• Sustainable technology integration</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Cost-Benefit Analysis and ROI Considerations</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Investment Strategies</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• <strong>Pathway Planning:</strong> Install Cat 6A now, upgrade to Cat 8 later</li>
                      <li>• <strong>Zone-based Approach:</strong> Cat 8 in data centres, Cat 6A elsewhere</li>
                      <li>• <strong>Application-driven:</strong> Match cable category to specific needs</li>
                      <li>• <strong>Future-ready Infrastructure:</strong> Over-specify for unknown requirements</li>
                      <li>• <strong>Hybrid Solutions:</strong> Mix copper and fibre strategically</li>
                      <li>• <strong>Modular Deployment:</strong> Expandable architecture design</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Risk Mitigation</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• <strong>Technology Obsolescence:</strong> Plan for 15-20 year lifecycles</li>
                      <li>• <strong>Bandwidth Growth:</strong> Account for 50% annual growth</li>
                      <li>• <strong>Application Changes:</strong> Flexible infrastructure design</li>
                      <li>• <strong>Standard Evolution:</strong> Monitor emerging standards</li>
                      <li>• <strong>Vendor Independence:</strong> Open standard compliance</li>
                      <li>• <strong>Retrofit Costs:</strong> Consider replacement complexity</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Quiz 
            questions={quizQuestions} 
            title="Future-Proofing Infrastructure Knowledge Check"
            description="Test your understanding of Category 8 technology, emerging trends, and strategic infrastructure planning"
          />

          <div className="flex justify-between">
            <Link to="../data-cabling-module-5-section-4">
              <Button variant="outline" className="border-gray-600">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../data-cabling-module-5">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Module Overview
                <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCablingModule5Section5;