import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Building, Zap, Network, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';

const DataCablingModule6Section1 = () => {
  const quiz = [
    {
      question: "Which organisation publishes the TIA/EIA-568 standard?",
      options: [
        "International Organization for Standardization (ISO)",
        "Telecommunications Industry Association (TIA)",
        "Institute of Electrical and Electronics Engineers (IEEE)",
        "International Electrotechnical Commission (IEC)"
      ],
      correct: 1,
      explanation: "TIA/EIA-568 is published by the Telecommunications Industry Association (TIA), which was formerly part of the Electronic Industries Alliance (EIA)."
    },
    {
      question: "What is the maximum horizontal cable length specified in TIA/EIA-568?",
      options: [
        "90 metres",
        "100 metres",
        "110 metres",
        "150 metres"
      ],
      correct: 0,
      explanation: "TIA/EIA-568 specifies a maximum horizontal cable length of 90 metres, with an additional 10 metres allowed for patch cords (5m at each end)."
    },
    {
      question: "Which standard provides the European equivalent to TIA/EIA-568?",
      options: [
        "ISO/IEC 11801",
        "EN 50173",
        "Both ISO/IEC 11801 and EN 50173",
        "IEEE 802.3"
      ],
      correct: 2,
      explanation: "Both ISO/IEC 11801 (international) and EN 50173 (European) provide equivalent standards to TIA/EIA-568, with EN 50173 being the European implementation of ISO/IEC 11801."
    },
    {
      question: "What does the 'channel' refer to in cabling standards?",
      options: [
        "Only the horizontal cable",
        "The entire transmission path including patch cords",
        "Only the backbone cabling",
        "The telecommunications room equipment"
      ],
      correct: 1,
      explanation: "A 'channel' refers to the complete end-to-end transmission path, including horizontal cables, patch cords, connectors, and all interconnection hardware."
    },
    {
      question: "Which topology is specified as the primary architecture in TIA/EIA-568?",
      options: [
        "Ring topology",
        "Bus topology",
        "Star topology",
        "Mesh topology"
      ],
      correct: 2,
      explanation: "TIA/EIA-568 specifies star topology as the primary architecture, with each outlet connected directly to a telecommunications room via horizontal cabling."
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
            <BookOpen className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                TIA/EIA 568 and ISO/IEC 11801 Overview
              </h1>
              <p className="text-base md:text-lg text-gray-400">
                International cabling standards and requirements
              </p>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <Badge variant="secondary" className="bg-yellow-400 text-black">
              Section 1
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              12 minutes
            </Badge>
          </div>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-yellow-400" />
                Introduction to International Cabling Standards
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                International cabling standards provide the foundation for modern network infrastructure. 
                Understanding TIA/EIA-568 and ISO/IEC 11801 is essential for designing, installing, and 
                maintaining reliable data communication systems that meet global requirements.
              </p>
              <p>
                These standards ensure interoperability, performance consistency, and future-proofing of 
                network installations worldwide. They cover everything from cable specifications to 
                installation practices and testing requirements.
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
                <li>Understand the scope and purpose of TIA/EIA-568 and ISO/IEC 11801 standards</li>
                <li>Compare North American and international cabling approaches</li>
                <li>Identify key architectural requirements and topologies</li>
                <li>Learn about cable specifications and performance parameters</li>
                <li>Understand testing and certification requirements</li>
                <li>Apply standards to real-world installation scenarios</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="h-5 w-5 text-yellow-400" />
                TIA/EIA-568: North American Standard
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Standard Overview</h4>
                <p className="mb-4">
                  TIA/EIA-568 is the premier North American standard for commercial building 
                  telecommunications cabling infrastructure. Originally published in 1991, 
                  it has evolved through multiple revisions to address advancing technology needs.
                </p>
                
                <div className="bg-card p-4 rounded-lg mb-4">
                  <h5 className="text-white font-semibold mb-2">Current Standard Structure:</h5>
                  <ul className="space-y-2 text-sm">
                    <li><strong>TIA-568.0-E:</strong> Generic Telecommunications Cabling (2020)</li>
                    <li><strong>TIA-568.1-E:</strong> Commercial Building Cabling (2020)</li>
                    <li><strong>TIA-568.2-D:</strong> Balanced Twisted-Pair Cabling (2018)</li>
                    <li><strong>TIA-568.3-D:</strong> Optical Fibre Cabling (2016)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Key Architectural Requirements</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Star Topology</h5>
                    <p className="text-sm">
                      Each work area outlet connects directly to a telecommunications room 
                      via horizontal cabling. No splices or bridged taps allowed in horizontal runs.
                    </p>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Distance Limitations</h5>
                    <p className="text-sm">
                      Maximum 90m horizontal cable + 10m total patch cord length (5m each end). 
                      Total channel length must not exceed 100m.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Cable Categories and Applications</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-2 text-yellow-400">Category</th>
                        <th className="text-left p-2 text-yellow-400">Frequency</th>
                        <th className="text-left p-2 text-yellow-400">Applications</th>
                        <th className="text-left p-2 text-yellow-400">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-semibold">Cat 5e</td>
                        <td className="p-2">100 MHz</td>
                        <td className="p-2">1000BASE-T, Basic PoE</td>
                        <td className="p-2 text-green-400">Current</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-semibold">Cat 6</td>
                        <td className="p-2">250 MHz</td>
                        <td className="p-2">1000BASE-T, PoE+</td>
                        <td className="p-2 text-green-400">Current</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-semibold">Cat 6A</td>
                        <td className="p-2">500 MHz</td>
                        <td className="p-2">10GBASE-T, PoE++</td>
                        <td className="p-2 text-green-400">Current</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-semibold">Cat 8</td>
                        <td className="p-2">2000 MHz</td>
                        <td className="p-2">25/40GBASE-T</td>
                        <td className="p-2 text-yellow-400">Latest</td>
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
                <Building className="h-5 w-5 text-purple-400" />
                ISO/IEC 11801: International Standard
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Global Harmonisation</h4>
                <p className="mb-4">
                  ISO/IEC 11801 provides the international framework for structured cabling 
                  systems. It harmonises cabling standards globally while allowing regional 
                  adaptations through national standards like EN 50173 in Europe.
                </p>
                
                <div className="bg-card p-4 rounded-lg mb-4">
                  <h5 className="text-white font-semibold mb-2">Standard Series Structure:</h5>
                  <ul className="space-y-2 text-sm">
                    <li><strong>ISO/IEC 11801-1:</strong> General Requirements and Office Areas (2017)</li>
                    <li><strong>ISO/IEC 11801-2:</strong> Office Premises (2017)</li>
                    <li><strong>ISO/IEC 11801-3:</strong> Industrial Premises (2017)</li>
                    <li><strong>ISO/IEC 11801-4:</strong> Single Tenant Houses (2017)</li>
                    <li><strong>ISO/IEC 11801-5:</strong> Data Centres (2017)</li>
                    <li><strong>ISO/IEC 11801-6:</strong> Distributed Building Services (2017)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Channel vs Link Performance</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Permanent Link</h5>
                    <p className="text-sm mb-2">
                      Fixed cabling from telecommunications outlet to patch panel 
                      (90m maximum). Excludes equipment and patch cords.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Used for installation verification</li>
                      <li>• Tests cabling infrastructure only</li>
                      <li>• More stringent requirements</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Channel</h5>
                    <p className="text-sm mb-2">
                      Complete transmission path including patch cords 
                      (100m maximum total). End-to-end performance.
                    </p>
                    <ul className="text-xs space-y-1">
                      <li>• Used for application support verification</li>
                      <li>• Tests complete signal path</li>
                      <li>• Reflects real-world performance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Class Specifications Comparison</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-2 text-yellow-400">ISO Class</th>
                        <th className="text-left p-2 text-yellow-400">TIA Category</th>
                        <th className="text-left p-2 text-yellow-400">Frequency</th>
                        <th className="text-left p-2 text-yellow-400">Typical Applications</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-semibold">Class D</td>
                        <td className="p-2">Cat 5e</td>
                        <td className="p-2">100 MHz</td>
                        <td className="p-2">Fast Ethernet, Gigabit Ethernet</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-semibold">Class E</td>
                        <td className="p-2">Cat 6</td>
                        <td className="p-2">250 MHz</td>
                        <td className="p-2">Gigabit Ethernet, PoE+</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-semibold">Class EA</td>
                        <td className="p-2">Cat 6A</td>
                        <td className="p-2">500 MHz</td>
                        <td className="p-2">10 Gigabit Ethernet, PoE++</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-semibold">Class FA</td>
                        <td className="p-2">Cat 7A</td>
                        <td className="p-2">1000 MHz</td>
                        <td className="p-2">10+ Gigabit applications</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-2 font-semibold">Class I/II</td>
                        <td className="p-2">Cat 8.1/8.2</td>
                        <td className="p-2">2000 MHz</td>
                        <td className="p-2">25/40 Gigabit Ethernet</td>
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
                <Network className="h-5 w-5 text-green-400" />
                Practical Implementation Considerations
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Regional Differences and Adaptations</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">North America</h5>
                    <ul className="text-sm space-y-1">
                      <li>• TIA/EIA-568 primary</li>
                      <li>• RJ45 connectors standard</li>
                      <li>• T568A/B wiring schemes</li>
                      <li>• 110-style terminations</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Europe</h5>
                    <ul className="text-sm space-y-1">
                      <li>• EN 50173 implementation</li>
                      <li>• ISO/IEC 11801 alignment</li>
                      <li>• Class-based specifications</li>
                      <li>• LSA-PLUS terminations</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">International</h5>
                    <ul className="text-sm space-y-1">
                      <li>• ISO/IEC 11801 framework</li>
                      <li>• Regional adaptations</li>
                      <li>• Harmonised testing</li>
                      <li>• Global interoperability</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Installation Requirements</h4>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Bend Radius Requirements</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>During Installation:</strong></p>
                        <ul className="space-y-1">
                          <li>• Cat 5e/6: 4× cable diameter minimum</li>
                          <li>• Cat 6A: 6× cable diameter minimum</li>
                          <li>• No kinks or sharp bends</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>After Installation:</strong></p>
                        <ul className="space-y-1">
                          <li>• Cat 5e/6: 8× cable diameter minimum</li>
                          <li>• Cat 6A: 10× cable diameter minimum</li>
                          <li>• Maintain throughout cable run</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card p-4 rounded-lg">
                    <h5 className="text-yellow-400 font-semibold mb-2">Pulling Tension Limits</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="mb-2"><strong>Maximum Pulling Force:</strong></p>
                        <ul className="space-y-1">
                          <li>• 4-pair UTP: 25 lbf (110 N)</li>
                          <li>• 4-pair STP: 25 lbf (110 N)</li>
                          <li>• Use pulling grips/lubricants</li>
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2"><strong>Installation Practices:</strong></p>
                        <ul className="space-y-1">
                          <li>• Avoid crushing or pinching</li>
                          <li>• Support cable weight properly</li>
                          <li>• Use appropriate cable management</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert className="bg-blue-900/20 border-yellow-400">
            <Zap className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-blue-100">
              <strong>Pro Tip:</strong> When working on international projects, always verify which standard 
              applies in the specific region. Some countries adopt ISO/IEC 11801 directly, while others 
              create national versions with regional modifications. Understanding these differences is 
              crucial for compliance and successful project completion.
            </AlertDescription>
          </Alert>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-400" />
                Real-World Scenario: Multi-National Installation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-card p-4 rounded-lg">
                <h5 className="text-yellow-400 font-semibold mb-2">Scenario:</h5>
                <p className="text-sm mb-4">
                  A global technology company is standardising their network infrastructure across 
                  offices in New York (USA), London (UK), and Singapore. Each location has different 
                  local requirements but needs interoperable systems.
                </p>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h6 className="text-white font-semibold mb-1">New York Office</h6>
                    <ul className="space-y-1">
                      <li>• Follow TIA-568.1-E</li>
                      <li>• Cat 6A throughout</li>
                      <li>• T568B wiring standard</li>
                      <li>• 110-style patch panels</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-white font-semibold mb-1">London Office</h6>
                    <ul className="space-y-1">
                      <li>• Follow EN 50173-1</li>
                      <li>• Class EA specification</li>
                      <li>• T568A wiring standard</li>
                      <li>• LSA-PLUS terminations</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-white font-semibold mb-1">Singapore Office</h6>
                    <ul className="space-y-1">
                      <li>• Follow ISO/IEC 11801-2</li>
                      <li>• Class EA specification</li>
                      <li>• Local building codes</li>
                      <li>• Climate considerations</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-900/20 rounded-lg">
                  <p className="text-green-200 text-sm">
                    <strong>Solution:</strong> All three installations use Cat 6A/Class EA cables and 
                    RJ45 connectors for compatibility. Performance specifications align across standards, 
                    ensuring seamless network operation regardless of regional differences in installation practices.
                  </p>
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
                <li>TIA/EIA-568 and ISO/IEC 11801 provide the foundation for structured cabling worldwide</li>
                <li>Both standards specify star topology with 90m horizontal + 10m patch cord limits</li>
                <li>Regional implementations maintain global interoperability while addressing local needs</li>
                <li>Understanding both channel and permanent link concepts is essential for proper testing</li>
                <li>Installation practices must follow strict bend radius and tension requirements</li>
                <li>Category/Class equivalencies ensure compatibility across different standard frameworks</li>
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
            <Link to="../data-cabling-module-6">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Module 6
              </Button>
            </Link>
            <Link to="../data-cabling-module-6-section-2">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next: Class D, E, EA, F Standards
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCablingModule6Section1;