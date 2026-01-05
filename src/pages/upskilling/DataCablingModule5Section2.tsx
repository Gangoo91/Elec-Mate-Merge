import { ArrowLeft, ArrowRight, TestTube, AlertTriangle, CheckCircle, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/upskilling/Quiz';

const DataCablingModule5Section2 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "What is the primary difference between Link testing and Channel testing in data cabling?",
      options: [
        "Link testing includes patch cords, Channel testing does not",
        "Channel testing includes patch cords, Link testing does not", 
        "Link testing is for copper only, Channel testing is for fibre only",
        "There is no difference between the two methods"
      ],
      correctAnswer: 1,
      explanation: "Channel testing includes the entire transmission path including equipment cords and patch cords, while Link testing only tests the permanent link without patch cords or equipment cords."
    },
    {
      id: 2,
      question: "According to TIA-568, what is the maximum length for equipment cords in Channel testing?",
      options: [
        "3 metres",
        "5 metres",
        "7 metres", 
        "10 metres"
      ],
      correctAnswer: 1,
      explanation: "TIA-568 specifies that equipment cords (including patch cords) should not exceed 5 metres in total length for Channel testing to ensure accurate performance measurements."
    },
    {
      id: 3,
      question: "Which testing method is more commonly used for field certification of installed cabling?",
      options: [
        "Link testing",
        "Channel testing",
        "Both are equally common",
        "Neither method is used for field certification"
      ],
      correctAnswer: 0,
      explanation: "Link testing is more commonly used for field certification because it tests only the installed permanent cabling infrastructure, excluding variables introduced by patch cords and equipment cords."
    },
    {
      id: 4,
      question: "What is the maximum permanent link length for Link testing according to TIA-568?",
      options: [
        "90 metres",
        "100 metres",
        "110 metres",
        "120 metres"
      ],
      correctAnswer: 0,
      explanation: "TIA-568 specifies a maximum permanent link length of 90 metres for Link testing, which excludes patch cords and equipment cords that make up the additional 10 metres in Channel testing."
    },
    {
      id: 5,
      question: "Which parameter typically shows the greatest difference between Link and Channel test results?",
      options: [
        "Wire map",
        "Cable length",
        "Return loss",
        "Propagation delay"
      ],
      correctAnswer: 2,
      explanation: "Return loss typically shows the greatest difference between Link and Channel testing because Channel testing includes additional connectors from patch cords, which introduce more reflections and impedance discontinuities."
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
              Module 5 • Section 2
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Link Testing vs Channel Testing
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
              Different testing methodologies and applications
            </p>
          </div>

          <Alert className="border-yellow-400/30 bg-yellow-400/10">
            <Network className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-foreground">
              <strong className="text-yellow-400">Testing Standard:</strong> Understanding the difference between Link and Channel testing is crucial for proper certification and ensuring compliance with performance standards.
            </AlertDescription>
          </Alert>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center">
                <TestTube className="mr-2 h-5 w-5" />
                Testing Methodology Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Fundamental Testing Approaches</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Data cabling testing is divided into two primary methodologies: Link testing and Channel testing. 
                  Each serves specific purposes in the installation lifecycle and provides different perspectives on system performance.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Link Testing (Permanent Link)</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Scope:</strong> Tests only the permanent installed cabling</li>
                      <li><strong>Exclusions:</strong> Patch cords and equipment cords</li>
                      <li><strong>Maximum Length:</strong> 90 metres</li>
                      <li><strong>Use Case:</strong> Installation acceptance and warranty</li>
                      <li><strong>Repeatability:</strong> High consistency due to fixed components</li>
                      <li><strong>Standards:</strong> TIA-568.3-D, ISO/IEC 11801-1</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Channel Testing (End-to-End)</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Scope:</strong> Complete transmission path</li>
                      <li><strong>Inclusions:</strong> All cables, connectors, and patch cords</li>
                      <li><strong>Maximum Length:</strong> 100 metres total</li>
                      <li><strong>Use Case:</strong> Application performance validation</li>
                      <li><strong>Variability:</strong> Results depend on patch cord quality</li>
                      <li><strong>Real-world:</strong> Reflects actual operating conditions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Link Testing (Permanent Link) Detailed Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Permanent Link Configuration</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Link testing evaluates only the permanent cabling infrastructure, providing a pure assessment 
                  of the installed cable plant without variables introduced by patch cords.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Components Included</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Horizontal cable runs (up to 90m)</li>
                      <li>• Telecommunications outlets</li>
                      <li>• Patch panel terminations</li>
                      <li>• Cross-connect hardware</li>
                      <li>• Consolidation points (if present)</li>
                      <li>• Splice connections (fibre only)</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Components Excluded</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Equipment cords at workstation</li>
                      <li>• Patch cords in telecommunications room</li>
                      <li>• Active equipment interfaces</li>
                      <li>• Network switches and hubs</li>
                      <li>• User terminal equipment</li>
                      <li>• Jumper cables</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Performance Advantages</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Isolates cabling infrastructure performance</li>
                      <li>• Eliminates patch cord variable factors</li>
                      <li>• Provides repeatable test results</li>
                      <li>• Supports warranty validation</li>
                      <li>• Better troubleshooting capability</li>
                      <li>• Industry standard for acceptance</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Link Testing Procedures and Parameters</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Test Setup Requirements</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Direct connection to permanent link outlets</li>
                      <li>• Use of calibrated test adapters at each end</li>
                      <li>• Environmental condition documentation</li>
                      <li>• Equipment warm-up and calibration verification</li>
                      <li>• Proper grounding and safety procedures</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Measured Parameters</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Wire map and pair continuity verification</li>
                      <li>• Length measurement and NVP calculation</li>
                      <li>• Insertion loss across frequency spectrum</li>
                      <li>• Return loss and impedance matching</li>
                      <li>• NEXT, FEXT, and alien crosstalk</li>
                      <li>• Propagation delay and delay skew</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Channel Testing (End-to-End) Comprehensive Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Complete Channel Configuration</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Channel testing evaluates the entire transmission path from end-user equipment to network equipment, 
                  including all cables, connectors, and patch cords that affect signal transmission.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Channel Components and Limits</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Equipment Cord:</strong> User end (max 5m)</li>
                      <li><strong>Outlet Connection:</strong> RJ45 or similar interface</li>
                      <li><strong>Horizontal Cable:</strong> Permanent link (max 90m)</li>
                      <li><strong>Patch Panel:</strong> Telecommunications room termination</li>
                      <li><strong>Patch Cord:</strong> Network equipment end (max 5m)</li>
                      <li><strong>Total Channel:</strong> Maximum 100m end-to-end</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-3">Configuration Constraints</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Maximum Channel Length:</strong> 100 metres total</li>
                      <li><strong>Patch Cord Limit:</strong> 5m each end (10m total)</li>
                      <li><strong>Minimum Permanent Link:</strong> 15 metres</li>
                      <li><strong>Maximum Connectors:</strong> 4 connector pairs</li>
                      <li><strong>Consolidation Points:</strong> 1 maximum allowed</li>
                      <li><strong>Cross-connects:</strong> 1 maximum in channel</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Channel Testing Applications and Considerations</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Primary Applications</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• End-user experience validation</li>
                      <li>• Application-specific performance testing</li>
                      <li>• Network troubleshooting procedures</li>
                      <li>• System integration verification</li>
                      <li>• Real-world performance assessment</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Performance Factors</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Patch cord quality impact</li>
                      <li>• Connector mating consistency</li>
                      <li>• Environmental effects inclusion</li>
                      <li>• Installation practice reflection</li>
                      <li>• User equipment compatibility</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Testing Limitations</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Variable test results possible</li>
                      <li>• Patch cord dependency</li>
                      <li>• Less suitable for warranty testing</li>
                      <li>• Environmental sensitivity</li>
                      <li>• Equipment-specific requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Performance Comparison and Standards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Detailed Performance Limit Analysis</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-3 text-yellow-400">Parameter</th>
                        <th className="text-left p-3 text-yellow-400">Link Testing</th>
                        <th className="text-left p-3 text-yellow-400">Channel Testing</th>
                        <th className="text-left p-3 text-yellow-400">Impact/Difference</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700">
                        <td className="p-3">Maximum Length</td>
                        <td className="p-3">90 metres</td>
                        <td className="p-3">100 metres</td>
                        <td className="p-3">+10m from patch cords</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">Insertion Loss (Cat 6 @ 250MHz)</td>
                        <td className="p-3">21.3 dB maximum</td>
                        <td className="p-3">23.6 dB maximum</td>
                        <td className="p-3">~2.3dB patch cord allowance</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">Return Loss (Cat 6 @ 250MHz)</td>
                        <td className="p-3">12.0 dB minimum</td>
                        <td className="p-3">10.0 dB minimum</td>
                        <td className="p-3">Connector impact accommodation</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">NEXT (Cat 6 @ 250MHz)</td>
                        <td className="p-3">33.1 dB minimum</td>
                        <td className="p-3">30.1 dB minimum</td>
                        <td className="p-3">3dB reduction for patch cords</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">Test Repeatability</td>
                        <td className="p-3">High (±0.1dB typical)</td>
                        <td className="p-3">Variable (±0.5dB possible)</td>
                        <td className="p-3">Patch cord quality dependency</td>
                      </tr>
                      <tr>
                        <td className="p-3">Typical Test Duration</td>
                        <td className="p-3">2-3 minutes</td>
                        <td className="p-3">3-5 minutes</td>
                        <td className="p-3">Setup complexity difference</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Testing Method Selection Guidelines</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Choose Link Testing When:</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Certifying new cable installations</li>
                      <li>• Validating contractor work and warranties</li>
                      <li>• Establishing infrastructure performance baselines</li>
                      <li>• Troubleshooting permanent cabling issues</li>
                      <li>• Meeting standards compliance requirements</li>
                      <li>• Isolating cabling vs. patch cord problems</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Choose Channel Testing When:</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Verifying application-specific performance</li>
                      <li>• Validating end-user experience</li>
                      <li>• Troubleshooting network performance issues</li>
                      <li>• Conducting system integration testing</li>
                      <li>• Monitoring operational performance</li>
                      <li>• Qualifying specific application requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Industry Standards and Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">International Testing Standards</h3>
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
                        <td className="p-3">TIA-568.3-D</td>
                        <td className="p-3">Optical fiber cabling components standard</td>
                        <td className="p-3">North American testing requirements</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">ISO/IEC 11801-1</td>
                        <td className="p-3">Information technology - Generic cabling</td>
                        <td className="p-3">International cabling standards</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">IEC 61935-1</td>
                        <td className="p-3">Specification for the testing of balanced cables</td>
                        <td className="p-3">Testing method specifications</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">ANSI/TIA-1152-A</td>
                        <td className="p-3">Requirements for field test instruments</td>
                        <td className="p-3">Test equipment specifications</td>
                      </tr>
                      <tr>
                        <td className="p-3">BS EN 50173</td>
                        <td className="p-3">Information technology - Generic cabling systems</td>
                        <td className="p-3">European testing standards</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-3">Professional Testing Protocols</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white font-medium mb-2">Installation Phase</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Use Link testing for acceptance criteria</li>
                      <li>• Document permanent link performance</li>
                      <li>• Establish performance baselines</li>
                      <li>• Verify standards compliance</li>
                      <li>• Support warranty requirements</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Deployment Phase</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Channel testing for application validation</li>
                      <li>• End-to-end performance verification</li>
                      <li>• User experience quality assessment</li>
                      <li>• Network integration testing</li>
                      <li>• Application-specific requirement validation</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2">Operational Phase</p>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Link testing for infrastructure maintenance</li>
                      <li>• Channel testing for user issue resolution</li>
                      <li>• Comparative analysis between methods</li>
                      <li>• Performance trend monitoring</li>
                      <li>• Systematic fault isolation procedures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">Advanced Testing Considerations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Environmental and Operational Factors</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-green-400 mb-3">
                      <CheckCircle className="inline mr-2 h-4 w-4" />
                      Best Practices
                    </h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Temperature Compensation:</strong> Account for environmental effects on measurements</li>
                      <li><strong>Documentation Standards:</strong> Maintain comprehensive test records</li>
                      <li><strong>Future-Proofing:</strong> Test to higher category when possible</li>
                      <li><strong>Margin Analysis:</strong> Document headroom for future applications</li>
                      <li><strong>Trend Monitoring:</strong> Track performance changes over time</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <h4 className="font-medium text-red-400 mb-3">
                      <AlertTriangle className="inline mr-2 h-4 w-4" />
                      Common Pitfalls
                    </h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li><strong>Test Configuration Errors:</strong> Using wrong test method for purpose</li>
                      <li><strong>Environmental Neglect:</strong> Ignoring temperature and humidity effects</li>
                      <li><strong>Patch Cord Quality:</strong> Using poor quality cords in Channel testing</li>
                      <li><strong>Documentation Gaps:</strong> Inadequate record keeping</li>
                      <li><strong>Calibration Issues:</strong> Using uncalibrated test equipment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Quiz 
            questions={quizQuestions} 
            title="Link vs Channel Testing Knowledge Check"
            description="Test your understanding of different testing methodologies"
          />

          <div className="flex justify-between">
            <Link to="../data-cabling-module-5-section-1">
              <Button variant="outline" className="border-gray-600">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../data-cabling-module-5-section-3">
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

export default DataCablingModule5Section2;