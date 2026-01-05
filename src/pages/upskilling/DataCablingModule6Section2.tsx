import { ArrowLeft, Award, CheckCircle, AlertTriangle, Zap, TrendingUp, Settings, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';

const DataCablingModule6Section2 = () => {
  const quiz = [
    {
      question: "What is the maximum frequency specification for Class EA cabling?",
      options: [
        "250 MHz",
        "500 MHz",
        "600 MHz",
        "1000 MHz"
      ],
      correct: 1,
      explanation: "Class EA (Category 6A equivalent) supports frequencies up to 500 MHz, enabling 10GBASE-T applications over the full 100-metre channel length."
    },
    {
      question: "Which application requires Class F cabling as a minimum?",
      options: [
        "1000BASE-T Ethernet",
        "10GBASE-T Ethernet",
        "25GBASE-T Ethernet",
        "100BASE-TX Ethernet"
      ],
      correct: 2,
      explanation: "25GBASE-T Ethernet requires Class F cabling (1000 MHz) as a minimum. 10GBASE-T can run on Class EA, while 1000BASE-T and 100BASE-TX require much lower class specifications."
    },
    {
      question: "What is the key difference between Class E and Class EA?",
      options: [
        "Connector type used",
        "Cable length supported",
        "Alien crosstalk performance",
        "Installation requirements"
      ],
      correct: 2,
      explanation: "Class EA includes specifications for alien crosstalk (AXT) which is critical for 10 Gigabit Ethernet. Class E does not have alien crosstalk requirements."
    },
    {
      question: "Which PoE standard can be supported by Class D cabling?",
      options: [
        "PoE+ (IEEE 802.3at)",
        "PoE++ Type 3 (IEEE 802.3bt)",
        "PoE++ Type 4 (IEEE 802.3bt)",
        "All of the above"
      ],
      correct: 0,
      explanation: "Class D cabling can reliably support PoE+ (25.5W). Higher power PoE++ applications typically require Class EA cabling for better thermal and electrical performance."
    },
    {
      question: "What is the typical application distance limitation for 25GBASE-T over Class F cabling?",
      options: [
        "30 metres",
        "55 metres",
        "100 metres",
        "150 metres"
      ],
      correct: 0,
      explanation: "25GBASE-T typically operates reliably up to 30 metres over Class F cabling due to the high frequency requirements and signal integrity challenges."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
        <Link to="../data-cabling-module-6">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>

        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <Award className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Class D, E, EA, F Standards
              </h1>
              <p className="text-base md:text-lg text-gray-400">
                Performance class specifications and applications
              </p>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <Badge variant="secondary" className="bg-yellow-400 text-black">
              Section 2
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              15 minutes
            </Badge>
          </div>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-400" />
                Understanding Performance Classes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Performance classes define the transmission characteristics of structured cabling systems. 
                Each class specifies frequency range, electrical parameters, and supported applications. 
                Understanding these classes is essential for selecting appropriate cabling for current and 
                future network requirements.
              </p>
              <p>
                The evolution from Class D through to Class F represents advancing technology demands, 
                from basic Ethernet to multi-gigabit applications and high-power PoE systems.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <ul className="space-y-2 list-disc list-inside">
                <li>Understand the specifications and applications for each performance class</li>
                <li>Compare frequency ranges and transmission parameters across classes</li>
                <li>Identify appropriate class selection for specific applications</li>
                <li>Learn about alien crosstalk and its impact on performance</li>
                <li>Understand PoE compatibility across different classes</li>
                <li>Apply class knowledge to future-proofing strategies</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-yellow-400" />
                Class D: Foundation Level Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Technical Specifications</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Performance Parameters</h5>
                    <ul className="text-sm space-y-1">
                      <li><strong>Frequency Range:</strong> 1-100 MHz</li>
                      <li><strong>Insertion Loss:</strong> ≤ 24 dB at 100 MHz</li>
                      <li><strong>NEXT:</strong> ≥ 30 dB at 100 MHz</li>
                      <li><strong>Return Loss:</strong> ≥ 10 dB (1-100 MHz)</li>
                      <li><strong>ELFEXT:</strong> ≥ 17 dB at 100 MHz</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Cable Characteristics</h5>
                    <ul className="text-sm space-y-1">
                      <li><strong>Equivalent:</strong> Category 5e</li>
                      <li><strong>Conductor:</strong> 24 AWG solid copper</li>
                      <li><strong>Pairs:</strong> 4 twisted pairs</li>
                      <li><strong>Impedance:</strong> 100Ω ± 15%</li>
                      <li><strong>Capacitance:</strong> ≤ 5.6 nF/100m</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Applications and Use Cases</h4>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Ethernet Applications</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Primary Applications:</strong></p>
                        <ul className="space-y-1">
                          <li>• 100BASE-TX (100 Mbps)</li>
                          <li>• 1000BASE-T (1 Gbps)</li>
                          <li>• Basic telephony systems</li>
                          <li>• Security cameras (basic)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>PoE Support:</strong></p>
                        <ul className="space-y-1">
                          <li>• PoE (IEEE 802.3af) - 15.4W</li>
                          <li>• PoE+ (IEEE 802.3at) - 25.5W</li>
                          <li>• Limited PoE++ applications</li>
                          <li>• Temperature derating required</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Installation Considerations</h5>
                    <div className="text-sm space-y-2">
                      <p><strong>Bundle Size Limitations:</strong> Large cable bundles can cause temperature rise, affecting PoE performance. Consider derating for bundles over 24 cables.</p>
                      <p><strong>Legacy Upgrade:</strong> Often used when upgrading from Cat 5 systems where existing pathways limit cable size.</p>
                      <p><strong>Cost Optimization:</strong> Suitable for basic applications where higher performance isn't required.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                Class E: Enhanced Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Technical Specifications</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Performance Parameters</h5>
                    <ul className="text-sm space-y-1">
                      <li><strong>Frequency Range:</strong> 1-250 MHz</li>
                      <li><strong>Insertion Loss:</strong> ≤ 36 dB at 250 MHz</li>
                      <li><strong>NEXT:</strong> ≥ 21 dB at 250 MHz</li>
                      <li><strong>Return Loss:</strong> ≥ 8 dB at 250 MHz</li>
                      <li><strong>ELFEXT:</strong> ≥ 14 dB at 250 MHz</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Improvements over Class D</h5>
                    <ul className="text-sm space-y-1">
                      <li><strong>Equivalent:</strong> Category 6</li>
                      <li><strong>Tighter Tolerances:</strong> ± 5% impedance</li>
                      <li><strong>Better Separation:</strong> Pair separation/spline</li>
                      <li><strong>Reduced Crosstalk:</strong> Improved pair geometry</li>
                      <li><strong>Higher Headroom:</strong> Better margin for applications</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Applications and Performance</h4>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Network Applications</h5>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left p-2 text-yellow-400">Application</th>
                            <th className="text-left p-2 text-yellow-400">Speed</th>
                            <th className="text-left p-2 text-yellow-400">Distance</th>
                            <th className="text-left p-2 text-yellow-400">Notes</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-300">
                          <tr className="border-b border-gray-700">
                            <td className="p-2">1000BASE-T</td>
                            <td className="p-2">1 Gbps</td>
                            <td className="p-2">100m</td>
                            <td className="p-2">Excellent margins</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">10GBASE-T</td>
                            <td className="p-2">10 Gbps</td>
                            <td className="p-2">55m</td>
                            <td className="p-2">Limited distance</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">5GBASE-T</td>
                            <td className="p-2">5 Gbps</td>
                            <td className="p-2">100m</td>
                            <td className="p-2">Full distance</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">2.5GBASE-T</td>
                            <td className="p-2">2.5 Gbps</td>
                            <td className="p-2">100m</td>
                            <td className="p-2">Full distance</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">PoE Capabilities</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Standard PoE Support:</strong></p>
                        <ul className="space-y-1">
                          <li>• PoE+ (25.5W) - Excellent</li>
                          <li>• PoE++ Type 3 (60W) - Good</li>
                          <li>• PoE++ Type 4 (90W) - Limited</li>
                          <li>• Better thermal characteristics</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Thermal Considerations:</strong></p>
                        <ul className="space-y-1">
                          <li>• Lower DC resistance than Class D</li>
                          <li>• Better heat dissipation</li>
                          <li>• Suitable for larger bundles</li>
                          <li>• Reduced temperature derating</li>
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
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-400" />
                Class EA: Augmented Performance with Alien Crosstalk Control
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Technical Specifications</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Performance Parameters</h5>
                    <ul className="text-sm space-y-1">
                      <li><strong>Frequency Range:</strong> 1-500 MHz</li>
                      <li><strong>Insertion Loss:</strong> ≤ 54 dB at 500 MHz</li>
                      <li><strong>NEXT:</strong> ≥ 15 dB at 500 MHz</li>
                      <li><strong>Return Loss:</strong> ≥ 8 dB at 500 MHz</li>
                      <li><strong>ELFEXT:</strong> ≥ 14 dB at 500 MHz</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Alien Crosstalk (AXT) Specifications</h5>
                    <ul className="text-sm space-y-1">
                      <li><strong>ANEXT:</strong> ≥ 43 dB at 500 MHz</li>
                      <li><strong>AELFEXT:</strong> ≥ 37 dB at 500 MHz</li>
                      <li><strong>Bundle Testing:</strong> 6-around-1 configuration</li>
                      <li><strong>Critical for:</strong> 10GBASE-T performance</li>
                      <li><strong>Cable Design:</strong> Enhanced shielding/geometry</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Understanding Alien Crosstalk</h4>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">What is Alien Crosstalk?</h5>
                    <p className="text-sm mb-3">
                      Alien crosstalk occurs when signals from one cable interfere with signals in 
                      adjacent cables within a bundle. This becomes critical at higher frequencies 
                      and affects 10GBASE-T performance significantly.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Sources of AXT:</strong></p>
                        <ul className="space-y-1">
                          <li>• Cable-to-cable coupling</li>
                          <li>• Connector-to-connector coupling</li>
                          <li>• Unbalanced terminations</li>
                          <li>• Poor cable management</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Mitigation Strategies:</strong></p>
                        <ul className="space-y-1">
                          <li>• Enhanced cable shielding</li>
                          <li>• Improved pair geometry</li>
                          <li>• Quality connectors</li>
                          <li>• Proper installation practices</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">10GBASE-T Applications</h5>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left p-2 text-yellow-400">Configuration</th>
                            <th className="text-left p-2 text-yellow-400">Distance</th>
                            <th className="text-left p-2 text-yellow-400">Performance</th>
                            <th className="text-left p-2 text-yellow-400">Notes</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-300">
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Single cable</td>
                            <td className="p-2">100m</td>
                            <td className="p-2">Full rate</td>
                            <td className="p-2">No AXT concerns</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Small bundle (&lt;24)</td>
                            <td className="p-2">100m</td>
                            <td className="p-2">Full rate</td>
                            <td className="p-2">Minimal AXT impact</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Large bundle (≥24)</td>
                            <td className="p-2">90-100m</td>
                            <td className="p-2">Full rate</td>
                            <td className="p-2">AXT testing required</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Poor installation</td>
                            <td className="p-2">Variable</td>
                            <td className="p-2">Degraded</td>
                            <td className="p-2">May not support 10G</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">PoE++ Compatibility</h4>
                <div className="bg-card p-4 rounded-lg">
                  <h5 className="text-yellow-400 font-semibold mb-2">High-Power PoE Applications</h5>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="mb-2"><strong>Supported Applications:</strong></p>
                      <ul className="space-y-1">
                        <li>• PoE++ Type 3 (60W) - Excellent</li>
                        <li>• PoE++ Type 4 (90W) - Good</li>
                        <li>• High-power wireless APs</li>
                        <li>• PTZ security cameras</li>
                        <li>• LED lighting systems</li>
                      </ul>
                    </div>
                    <div>
                      <p className="mb-2"><strong>Cable Characteristics:</strong></p>
                      <ul className="space-y-1">
                        <li>• 23 AWG conductors (larger)</li>
                        <li>• Lower DC resistance</li>
                        <li>• Better heat dissipation</li>
                        <li>• Minimal bundle derating</li>
                        <li>• Suitable for large installations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-orange-400" />
                Class F: High-Frequency Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Technical Specifications</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Performance Parameters</h5>
                    <ul className="text-sm space-y-1">
                      <li><strong>Frequency Range:</strong> 1-600 MHz</li>
                      <li><strong>Insertion Loss:</strong> ≤ 65 dB at 600 MHz</li>
                      <li><strong>NEXT:</strong> ≥ 12 dB at 600 MHz</li>
                      <li><strong>Return Loss:</strong> ≥ 8 dB at 600 MHz</li>
                      <li><strong>ELFEXT:</strong> ≥ 12 dB at 600 MHz</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Advanced Features</h5>
                    <ul className="text-sm space-y-1">
                      <li><strong>Equivalent:</strong> Category 7/7A</li>
                      <li><strong>Shielding:</strong> Individual pair + overall</li>
                      <li><strong>Connectors:</strong> GG45/TERA or RJ45</li>
                      <li><strong>Alien Crosstalk:</strong> Superior performance</li>
                      <li><strong>EMI Immunity:</strong> Excellent</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Multi-Gigabit Applications</h4>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Ethernet Performance</h5>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left p-2 text-yellow-400">Application</th>
                            <th className="text-left p-2 text-yellow-400">Speed</th>
                            <th className="text-left p-2 text-yellow-400">Distance</th>
                            <th className="text-left p-2 text-yellow-400">Market Status</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-300">
                          <tr className="border-b border-gray-700">
                            <td className="p-2">10GBASE-T</td>
                            <td className="p-2">10 Gbps</td>
                            <td className="p-2">100m</td>
                            <td className="p-2">Mainstream</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">25GBASE-T</td>
                            <td className="p-2">25 Gbps</td>
                            <td className="p-2">30m</td>
                            <td className="p-2">Emerging</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">40GBASE-T</td>
                            <td className="p-2">40 Gbps</td>
                            <td className="p-2">30m</td>
                            <td className="p-2">Development</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Multiple 10G</td>
                            <td className="p-2">4×10 Gbps</td>
                            <td className="p-2">100m</td>
                            <td className="p-2">Custom solutions</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Installation Considerations</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Cable Requirements:</strong></p>
                        <ul className="space-y-1">
                          <li>• S/FTP construction (shielded)</li>
                          <li>• Larger diameter (6-8mm)</li>
                          <li>• Stiffer bend radius requirements</li>
                          <li>• Grounding/bonding critical</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Pathway Planning:</strong></p>
                        <ul className="space-y-1">
                          <li>• Larger conduit requirements</li>
                          <li>• EMI source separation</li>
                          <li>• Proper grounding infrastructure</li>
                          <li>• Climate control considerations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert className="bg-orange-900/20 border-orange-400">
            <AlertTriangle className="h-4 w-4 text-orange-400" />
            <AlertDescription className="text-orange-100">
              <strong>Important:</strong> Class F (Category 7/7A) cables require specialised installation 
              practices due to shielding requirements. Improper grounding can actually worsen performance 
              compared to unshielded alternatives. Always follow manufacturer guidelines for shield 
              termination and grounding.
            </AlertDescription>
          </Alert>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-red-400" />
                Class Selection Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Application-Based Selection</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Basic Office Environment</h5>
                    <ul className="text-sm space-y-1">
                      <li><strong>Requirement:</strong> 1 Gbps, basic PoE</li>
                      <li><strong>Recommendation:</strong> Class D minimum</li>
                      <li><strong>Future-proof:</strong> Class E preferred</li>
                      <li><strong>Benefits:</strong> Cost-effective, proven</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Modern Office/Campus</h5>
                    <ul className="text-sm space-y-1">
                      <li><strong>Requirement:</strong> Multi-gigabit, PoE++</li>
                      <li><strong>Recommendation:</strong> Class EA minimum</li>
                      <li><strong>Future-proof:</strong> Class EA sufficient</li>
                      <li><strong>Benefits:</strong> 10G ready, high-power PoE</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Performance vs Cost Analysis</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-2 text-yellow-400">Class</th>
                        <th className="text-left p-2 text-yellow-400">Relative Cost</th>
                        <th className="text-left p-2 text-yellow-400">Installation</th>
                        <th className="text-left p-2 text-yellow-400">Longevity</th>
                        <th className="text-left p-2 text-yellow-400">Best For</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-semibold">Class D</td>
                        <td className="p-2 text-green-400">Lowest</td>
                        <td className="p-2 text-green-400">Simple</td>
                        <td className="p-2 text-yellow-400">5-7 years</td>
                        <td className="p-2">Budget, basic needs</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-semibold">Class E</td>
                        <td className="p-2 text-yellow-400">Low</td>
                        <td className="p-2 text-green-400">Simple</td>
                        <td className="p-2 text-green-400">7-10 years</td>
                        <td className="p-2">Standard office</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-semibold">Class EA</td>
                        <td className="p-2 text-orange-400">Medium</td>
                        <td className="p-2 text-yellow-400">Moderate</td>
                        <td className="p-2 text-green-400">10-15 years</td>
                        <td className="p-2">Modern enterprise</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-semibold">Class F</td>
                        <td className="p-2 text-red-400">High</td>
                        <td className="p-2 text-red-400">Complex</td>
                        <td className="p-2 text-green-400">15+ years</td>
                        <td className="p-2">Specialised/data centres</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-400" />
                Real-World Scenario: Hospital Network Upgrade
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-card p-4 rounded-lg">
                <h5 className="text-yellow-400 font-semibold mb-2">Scenario:</h5>
                <p className="text-sm mb-4">
                  A 500-bed hospital needs to upgrade their network infrastructure to support new 
                  medical imaging systems, IoT devices, and wireless infrastructure. The existing 
                  Cat 5e installation is 12 years old and showing performance limitations.
                </p>

                <div className="space-y-4">
                  <div>
                    <h6 className="text-white font-semibold mb-2">Requirements Analysis:</h6>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Current Issues:</strong></p>
                        <ul className="space-y-1">
                          <li>• Slow imaging file transfers</li>
                          <li>• Insufficient PoE for new APs</li>
                          <li>• Network congestion</li>
                          <li>• Future-proofing needed</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>New Requirements:</strong></p>
                        <ul className="space-y-1">
                          <li>• 10 Gbps backbone capability</li>
                          <li>• High-power PoE for APs/cameras</li>
                          <li>• 15-year service life</li>
                          <li>• EMI resistance (medical equipment)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h6 className="text-white font-semibold mb-2">Solution Selection:</h6>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Chosen: Class EA (Cat 6A)</strong></p>
                        <ul className="space-y-1">
                          <li>• Supports 10GBASE-T to 100m</li>
                          <li>• PoE++ capability for high-power devices</li>
                          <li>• Proven technology with good longevity</li>
                          <li>• Reasonable cost vs Class F</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Implementation Notes:</strong></p>
                        <ul className="space-y-1">
                          <li>• UTP chosen over STP (easier installation)</li>
                          <li>• Alien crosstalk testing in large bundles</li>
                          <li>• Staged rollout by department priority</li>
                          <li>• Comprehensive testing program</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-900/20 rounded-lg">
                    <p className="text-green-200 text-sm">
                      <strong>Result:</strong> The Class EA installation successfully supports all current 
                      requirements and provides headroom for future 25GBASE-T applications. The hospital 
                      achieved 3× faster file transfers and deployed advanced wireless infrastructure 
                      supporting 500+ concurrent devices.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                Section Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <ul className="space-y-2 list-disc list-inside">
                <li>Class D provides basic performance for standard office applications and basic PoE</li>
                <li>Class E offers enhanced performance with better margins and limited 10GBASE-T support</li>
                <li>Class EA includes alien crosstalk specifications essential for reliable 10GBASE-T</li>
                <li>Class F enables multi-gigabit applications but requires specialised installation</li>
                <li>Selection should balance current needs, future requirements, and budget constraints</li>
                <li>PoE compatibility increases with higher performance classes due to better thermal characteristics</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                Knowledge Check
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {quiz.map((q, index) => (
                <div key={index} className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">
                    Question {index + 1}: {q.question}
                  </h4>
                  <div className="space-y-2">
                    {q.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-2 rounded cursor-pointer transition-colors ${
                          optIndex === q.correct
                            ? 'bg-green-900/30 border border-green-500 text-green-200'
                            : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        }`}
                      >
                        {String.fromCharCode(65 + optIndex)}. {option}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 p-3 bg-blue-900/20 rounded border border-yellow-400">
                    <p className="text-blue-200 text-sm">
                      <strong>Answer:</strong> {String.fromCharCode(65 + q.correct)}. {q.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-between pt-6">
            <Link to="../data-cabling-module-6-section-1">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: TIA/EIA 568 Overview
              </Button>
            </Link>
            <Link to="../data-cabling-module-6-section-3">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next: Building and Campus Standards
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCablingModule6Section2;