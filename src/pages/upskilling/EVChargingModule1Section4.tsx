import { ArrowLeft, ArrowRight, FileText, BookOpen, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { evModule1Section1Questions } from '@/data/upskilling/evChargingQuizzes';

const EVChargingModule1Section4 = () => {
  const quizQuestions = evModule1Section1Questions?.slice(6, 8)?.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options,
    correct: q.correctAnswer,
    explanation: q.explanation
  })) || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-8 sm:pb-12">
        <Link to="../ev-charging-module-1">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                <Scale className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  Key Standards: BS 7671, IET CoP, G98/G99
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  Essential standards and codes of practice for EV charging
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                Section 4
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                EV charging installations must comply with multiple technical standards and codes of practice. These documents provide the technical foundation for safe, reliable, and compliant installations, covering everything from basic electrical safety to grid connection requirements.
              </p>
              <div className="bg-blue-900/30 p-4 rounded-lg border-l-4 border-yellow-400">
                <p className="text-blue-200">
                  <strong className="text-blue-300">Standards Hierarchy:</strong> BS 7671 provides the fundamental electrical safety requirements, while IET Code of Practice offers specific EV guidance. G98/G99 govern grid connections, ensuring installations integrate safely with the distribution network.
                </p>
              </div>
              <p>
                Understanding these standards is essential for professional compliance and successful project delivery. This section provides comprehensive coverage of the key requirements and their practical application.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Learning Outcomes</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-3">
              <p className="text-sm text-white mb-4">By the end of this section, you should be able to:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <span>Apply BS 7671 Section 722 requirements to EV charging installations</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <span>Implement IET Code of Practice recommendations effectively</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <span>Navigate G98/G99 grid connection procedures</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <span>Understand interrelationships between different standards</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <span>Select appropriate protection and earthing arrangements</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">BS 7671:2018+A2:2022 - Section 722</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-card p-4 rounded-lg mb-4 border-l-4 border-yellow-400">
                <h4 className="text-yellow-400 font-semibold mb-3">Requirements for Electric Vehicle Charging Installations</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg border border-yellow-400">
                  <h5 className="text-blue-300 font-bold mb-4">Scope and Application</h5>
                  <div className="space-y-3">
                    <div className="bg-blue-900/20 p-3 rounded">
                      <h6 className="text-blue-200 font-semibold mb-2">Section 722 Coverage:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• AC and DC charging point installations</li>
                        <li>• Supply equipment and cable connections</li>
                        <li>• Fixed and portable charging equipment</li>
                        <li>• Domestic, commercial and public installations</li>
                        <li>• Power levels up to 1000V AC / 1500V DC</li>
                        <li>• Both tethered and socketed charging points</li>
                      </ul>
                    </div>
                    <div className="bg-blue-900/20 p-3 rounded">
                      <h6 className="text-blue-200 font-semibold mb-2">Key Exclusions:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Vehicle electrical systems</li>
                        <li>• Battery replacement facilities</li>
                        <li>• Battery charging/maintenance facilities</li>
                        <li>• Trolley bus and railway systems</li>
                        <li>• Industrial trucks and vehicles</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-green-500">
                  <h5 className="text-green-300 font-bold mb-4">Fundamental Requirements</h5>
                  <div className="space-y-3">
                    <div className="bg-green-900/20 p-3 rounded">
                      <h6 className="text-green-200 font-semibold mb-2">Protection Against Electric Shock:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Basic protection by insulation/enclosures</li>
                        <li>• Fault protection by automatic disconnection</li>
                        <li>• RCD protection mandatory (30mA max)</li>
                        <li>• Additional protection for PME supplies</li>
                        <li>• Equipotential bonding requirements</li>
                      </ul>
                    </div>
                    <div className="bg-green-900/20 p-3 rounded">
                      <h6 className="text-green-200 font-semibold mb-2">Circuit Design Requirements:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Dedicated final circuits preferred</li>
                        <li>• Appropriate overcurrent protection</li>
                        <li>• Voltage drop limitations (5% max)</li>
                        <li>• Conductor sizing for load and environment</li>
                        <li>• Suitable cable types and installation methods</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-red-500">
                <h5 className="text-red-300 font-bold mb-4">Critical Protection Requirements</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h6 className="text-red-200 font-semibold mb-2">RCD Protection:</h6>
                    <div className="space-y-2 text-sm">
                      <div className="bg-red-900/20 p-2 rounded">
                        <strong>Type A RCD:</strong>
                        <p>Minimum requirement, detects AC and pulsating DC fault currents</p>
                      </div>
                      <div className="bg-red-900/20 p-2 rounded">
                        <strong>Type B RCD:</strong>
                        <p>Preferred for EV charging, detects all fault current types including smooth DC</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h6 className="text-red-200 font-semibold mb-2">Earthing Systems:</h6>
                    <div className="space-y-2 text-sm">
                      <div className="bg-red-900/20 p-2 rounded">
                        <strong>TN-S Systems:</strong>
                        <p>Preferred earthing arrangement for EV charging installations</p>
                      </div>
                      <div className="bg-red-900/20 p-2 rounded">
                        <strong>PME (TN-C-S):</strong>
                        <p>Requires additional protective measures and risk assessment</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h6 className="text-red-200 font-semibold mb-2">Additional Measures:</h6>
                    <div className="space-y-2 text-sm">
                      <div className="bg-red-900/20 p-2 rounded">
                        <strong>Surge Protection:</strong>
                        <p>SPD Type 2 recommended for all installations</p>
                      </div>
                      <div className="bg-red-900/20 p-2 rounded">
                        <strong>Isolation:</strong>
                        <p>Local isolation switch within 2m of charging point</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500">
                <h5 className="text-purple-300 font-semibold mb-3">PME Special Requirements (722.411.4.1)</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h6 className="text-purple-200 font-medium mb-2">Risk Assessment Factors:</h6>
                    <ul className="space-y-1">
                      <li>• Location and environment of installation</li>
                      <li>• Type and construction of charging equipment</li>
                      <li>• Extraneous conductive parts proximity</li>
                      <li>• PEN conductor integrity assessment</li>
                      <li>• DNO supply reliability and maintenance</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-purple-200 font-medium mb-2">Additional Protective Measures:</h6>
                    <ul className="space-y-1">
                      <li>• Insulation monitoring devices</li>
                      <li>• Enhanced equipotential bonding</li>
                      <li>• Alternative earthing arrangements</li>
                      <li>• Increased electrical separation</li>
                      <li>• Regular inspection and testing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">IET Code of Practice for Electric Vehicle Charging Equipment Installation</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-card p-4 rounded-lg mb-4 border-l-4 border-yellow-400">
                <h4 className="text-yellow-400 font-semibold mb-3">Comprehensive Guidance for EV Charging Installations</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg border border-green-500">
                  <h5 className="text-green-300 font-bold mb-4">Design Considerations</h5>
                  <div className="space-y-3">
                    <div className="bg-green-900/20 p-3 rounded">
                      <h6 className="text-green-200 font-semibold mb-2">Load Assessment:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Maximum demand calculations</li>
                        <li>• Diversity factors for multiple charging points</li>
                        <li>• Future expansion considerations</li>
                        <li>• Supply capacity verification</li>
                        <li>• Load management system requirements</li>
                        <li>• Grid connection impact assessment</li>
                      </ul>
                    </div>
                    <div className="bg-green-900/20 p-3 rounded">
                      <h6 className="text-green-200 font-semibold mb-2">Circuit Design:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Radial vs ring circuit considerations</li>
                        <li>• Cable selection and sizing methodology</li>
                        <li>• Installation method impact on current rating</li>
                        <li>• Voltage drop calculations and limits</li>
                        <li>• Protective device coordination</li>
                        <li>• Emergency isolation requirements</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-yellow-400">
                  <h5 className="text-blue-300 font-bold mb-4">Installation Best Practices</h5>
                  <div className="space-y-3">
                    <div className="bg-blue-900/20 p-3 rounded">
                      <h6 className="text-blue-200 font-semibold mb-2">Physical Installation:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Mounting height and accessibility</li>
                        <li>• Vehicle approach and maneuvering space</li>
                        <li>• Cable management and protection</li>
                        <li>• Weather protection and IP ratings</li>
                        <li>• Mechanical protection from impact</li>
                        <li>• Security and anti-theft measures</li>
                      </ul>
                    </div>
                    <div className="bg-blue-900/20 p-3 rounded">
                      <h6 className="text-blue-200 font-semibold mb-2">Commissioning Procedures:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Initial verification testing sequence</li>
                        <li>• Functional testing of charging equipment</li>
                        <li>• Communication system verification</li>
                        <li>• Load management system testing</li>
                        <li>• User interface and safety system checks</li>
                        <li>• Documentation and handover procedures</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-500">
                <h5 className="text-orange-300 font-semibold mb-3">Smart Charging and Load Management</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h6 className="text-orange-200 font-medium mb-2">Static Load Management:</h6>
                    <ul className="space-y-1">
                      <li>• Fixed power allocation per charging point</li>
                      <li>• Simple current limiting arrangements</li>
                      <li>• Time-based charging restrictions</li>
                      <li>• Manual override capabilities</li>
                      <li>• Basic monitoring and reporting</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-orange-200 font-medium mb-2">Dynamic Load Management:</h6>
                    <ul className="space-y-1">
                      <li>• Real-time power allocation adjustment</li>
                      <li>• Building load monitoring integration</li>
                      <li>• Automatic charging optimisation</li>
                      <li>• Grid response capabilities</li>
                      <li>• Advanced analytics and reporting</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-orange-200 font-medium mb-2">OCPP Implementation:</h6>
                    <ul className="space-y-1">
                      <li>• Open Charge Point Protocol compliance</li>
                      <li>• Vendor-neutral management systems</li>
                      <li>• Remote monitoring and control</li>
                      <li>• Firmware update capabilities</li>
                      <li>• Standardised communication protocols</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Grid Connection Standards: G98 and G99</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-card p-4 rounded-lg mb-4 border-l-4 border-yellow-400">
                <h4 className="text-yellow-400 font-semibold mb-3">Distribution Network Integration Requirements</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg border border-yellow-400">
                  <h5 className="text-blue-300 font-bold mb-4">G98: Smaller Connections (≤16A per phase)</h5>
                  <div className="space-y-3">
                    <div className="bg-blue-900/20 p-3 rounded">
                      <h6 className="text-blue-200 font-semibold mb-2">Scope and Application:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Domestic single-phase installations</li>
                        <li>• Small commercial charging points</li>
                        <li>• Installations up to 11kW (3-phase)</li>
                        <li>• Type testing requirements</li>
                        <li>• Simplified connection procedures</li>
                      </ul>
                    </div>
                    <div className="bg-blue-900/20 p-3 rounded">
                      <h6 className="text-blue-200 font-semibold mb-2">Technical Requirements:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Power quality limits (harmonics, flicker)</li>
                        <li>• Protection settings and coordination</li>
                        <li>• Loss of mains detection</li>
                        <li>• Electromagnetic compatibility (EMC)</li>
                        <li>• Safety and performance standards</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-orange-500">
                  <h5 className="text-orange-300 font-bold mb-4">G99: Larger Connections (&gt;16A per phase)</h5>
                  <div className="space-y-3">
                    <div className="bg-orange-900/20 p-3 rounded">
                      <h6 className="text-orange-200 font-semibold mb-2">Enhanced Requirements:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Formal application process required</li>
                        <li>• Network impact assessment</li>
                        <li>• Connection agreement necessary</li>
                        <li>• Comprehensive technical compliance</li>
                        <li>• Ongoing operational requirements</li>
                      </ul>
                    </div>
                    <div className="bg-orange-900/20 p-3 rounded">
                      <h6 className="text-orange-200 font-semibold mb-2">Power Quality Management:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Harmonic distortion limits</li>
                        <li>• Voltage fluctuation and flicker control</li>
                        <li>• Power factor requirements</li>
                        <li>• Frequency response capabilities</li>
                        <li>• Reactive power management</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Standards Interaction Matrix</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-card p-4 rounded-lg mb-4 border-l-4 border-yellow-400">
                <h4 className="text-yellow-400 font-semibold mb-3">How Standards Work Together</h4>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-600">
                  <thead>
                    <tr className="bg-card">
                      <th className="border border-gray-600 p-3 text-left text-yellow-400">Installation Aspect</th>
                      <th className="border border-gray-600 p-3 text-left text-blue-300">BS 7671</th>
                      <th className="border border-gray-600 p-3 text-left text-green-300">IET CoP</th>
                      <th className="border border-gray-600 p-3 text-left text-purple-300">G98/G99</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-600 p-3 font-medium text-yellow-400">Circuit Protection</td>
                      <td className="border border-gray-600 p-3">RCD requirements, overcurrent protection, isolation</td>
                      <td className="border border-gray-600 p-3">Practical guidance, device selection</td>
                      <td className="border border-gray-600 p-3">Grid interface protection</td>
                    </tr>
                    <tr className="bg-card/50">
                      <td className="border border-gray-600 p-3 font-medium text-yellow-400">Earthing Systems</td>
                      <td className="border border-gray-600 p-3">PME restrictions, equipotential bonding</td>
                      <td className="border border-gray-600 p-3">Risk assessment methodology</td>
                      <td className="border border-gray-600 p-3">DNO earthing requirements</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 p-3 font-medium text-yellow-400">Load Management</td>
                      <td className="border border-gray-600 p-3">Basic safety requirements</td>
                      <td className="border border-gray-600 p-3">Detailed implementation guidance</td>
                      <td className="border border-gray-600 p-3">Grid connection limits</td>
                    </tr>
                    <tr className="bg-card/50">
                      <td className="border border-gray-600 p-3 font-medium text-yellow-400">Documentation</td>
                      <td className="border border-gray-600 p-3">Installation certificates</td>
                      <td className="border border-gray-600 p-3">Commissioning procedures</td>
                      <td className="border border-gray-600 p-3">Grid application forms</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-600 p-3 font-medium text-yellow-400">Testing</td>
                      <td className="border border-gray-600 p-3">Initial verification requirements</td>
                      <td className="border border-gray-600 p-3">Specific test procedures</td>
                      <td className="border border-gray-600 p-3">Commissioning tests</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <SingleQuestionQuiz 
            questions={quizQuestions}
            title="Knowledge Check: Key Standards"
          />

          <div className="flex justify-between mt-8">
            <Link to="../ev-charging-module-1-section-3">
              <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../ev-charging-module-1-section-5">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400">
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

export default EVChargingModule1Section4;