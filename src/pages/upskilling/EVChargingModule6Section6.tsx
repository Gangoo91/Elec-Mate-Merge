import { ArrowLeft, FileText, BookOpen, Target, AlertTriangle, CheckCircle, HelpCircle, Lightbulb, Award, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import EVChargingModule6Section6Quiz from '@/components/upskilling/quiz/EVChargingModule6Section6Quiz';

const EVChargingModule6Section6 = () => {
  useEffect(() => {
    document.title = 'Certificate, Test Sheet, and Handover Pack - EV Charging Module 6 Section 6';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Master certification completion, test sheet documentation, and handover pack preparation for EV charging installations. Ensure compliance and professional delivery.');
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
            <FileText className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 6 - Section 6
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Certificate, Test Sheet, and Handover Pack
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Completing documentation and ensuring professional customer handover
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">

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
                Proper completion of certification, test sheets, and handover documentation is essential for 
                regulatory compliance, safety assurance, and professional accountability. This final stage of 
                the installation process provides legal protection, enables future maintenance and inspection, 
                and ensures customers have all necessary information for safe operation and ongoing care of 
                their EV charging installation.
              </p>
              
              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Legal Requirements</h4>
                <ul className="text-sm space-y-1">
                  <li>• Electrical Installation Certificates required by BS 7671</li>
                  <li>• Building Regulations Part P compliance documentation</li>
                  <li>• Test results and schedule completion</li>
                  <li>• Customer documentation within 28 days</li>
                  <li>• Warranty and maintenance information provision</li>
                  <li>• Competent person registration and notification</li>
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
                  "Complete Electrical Installation Certificates accurately",
                  "Record and verify all test results comprehensively",
                  "Understand notification and compliance requirements",
                  "Prepare comprehensive handover packages",
                  "Document warranty and maintenance requirements",
                  "Provide operational and safety guidance documentation",
                  "Establish maintenance schedules and record systems",
                  "Create customer support pathways and contacts"
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
                <FileText className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Certificate and Documentation Requirements</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              {/* Electrical Installation Certificate */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Electrical Installation Certificate (EIC)</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Certificate Requirements and Purpose</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Legal Requirements</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Required by BS 7671 for new installations</li>
                          <li>• Mandatory under Building Regulations Part P</li>
                          <li>• Must be completed by competent person</li>
                          <li>• Copy provided to customer within 28 days</li>
                          <li>• Copy sent to Building Control (if required)</li>
                          <li>• Retained for life of installation</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Certificate Contents</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Installation details and description</li>
                          <li>• Design and construction compliance</li>
                          <li>• Inspection and test results</li>
                          <li>• Limitations and recommendations</li>
                          <li>• Next inspection date</li>
                          <li>• Designer and installer signatures</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Certificate Completion Process</h4>
                    <div className="space-y-4">
                      <div className="border-l-4 border-yellow-400 pl-4">
                        <h6 className="font-semibold text-white mb-2">Section 1: Installation Details</h6>
                        <ul className="space-y-1 text-sm">
                          <li>• Customer name and installation address</li>
                          <li>• Description: "Installation of EV charging point(s)"</li>
                          <li>• Date of installation completion</li>
                          <li>• Extent of installation (circuits added/modified)</li>
                        </ul>
                      </div>
                      
                      <div className="border-l-4 border-yellow-400 pl-4">
                        <h6 className="font-semibold text-white mb-2">Section 2: Design and Construction</h6>
                        <ul className="space-y-1 text-sm">
                          <li>• Reference to BS 7671:2018+A2:2022</li>
                          <li>• IET Code of Practice compliance</li>
                          <li>• Manufacturer's instructions followed</li>
                          <li>• Special installations (Part 7) compliance noted</li>
                        </ul>
                      </div>
                      
                      <div className="border-l-4 border-yellow-400 pl-4">
                        <h6 className="font-semibold text-white mb-2">Section 3: Inspection and Testing</h6>
                        <ul className="space-y-1 text-sm">
                          <li>• All required tests completed satisfactorily</li>
                          <li>• Test results recorded on schedule</li>
                          <li>• Any limitations or omissions noted</li>
                          <li>• Recommendations for improvement listed</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Test Result Documentation */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Test Result Documentation</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Mandatory Test Results Record</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left py-2 text-yellow-400">Test Type</th>
                            <th className="text-left py-2 text-yellow-400">Circuit</th>
                            <th className="text-left py-2 text-yellow-400">Result</th>
                            <th className="text-left py-2 text-yellow-400">Standard</th>
                            <th className="text-left py-2 text-yellow-400">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-700">
                            <td className="py-2">Continuity (cpc)</td>
                            <td className="py-2">EV Charging C1</td>
                            <td className="py-2">0.03Ω</td>
                            <td className="py-2">≤0.05Ω</td>
                            <td className="py-2 text-green-400">✓ Pass</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="py-2">Insulation Resistance</td>
                            <td className="py-2">EV Charging C1</td>
                            <td className="py-2">{'>'} 999MΩ</td>
                            <td className="py-2">≥1MΩ</td>
                            <td className="py-2 text-green-400">✓ Pass</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="py-2">Earth Fault Loop (Zs)</td>
                            <td className="py-2">EV Charging C1</td>
                            <td className="py-2">0.85Ω</td>
                            <td className="py-2">≤1.44Ω</td>
                            <td className="py-2 text-green-400">✓ Pass</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="py-2">RCD Operating Time</td>
                            <td className="py-2">EV Charging C1</td>
                            <td className="py-2">28ms</td>
                            <td className="py-2">≤40ms</td>
                            <td className="py-2 text-green-400">✓ Pass</td>
                          </tr>
                          <tr>
                            <td className="py-2">Functional Test</td>
                            <td className="py-2">EV Charging C1</td>
                            <td className="py-2">Satisfactory</td>
                            <td className="py-2">Per Manufacturer</td>
                            <td className="py-2 text-green-400">✓ Pass</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Handover Package Components */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Comprehensive Handover Package</h3>
                <div className="space-y-4">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">Essential Documentation Package</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Certification Documents</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Electrical Installation Certificate</li>
                          <li>• Schedule of Test Results</li>
                          <li>• Schedule of Items Inspected</li>
                          <li>• Building Regulation compliance</li>
                          <li>• Competent person notification</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Operation and Safety</h5>
                        <ul className="text-sm space-y-1">
                          <li>• User manual and quick start guide</li>
                          <li>• Safety instructions and warnings</li>
                          <li>• Emergency procedures</li>
                          <li>• Operating instructions</li>
                          <li>• Troubleshooting guide</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-400 mb-2">Warranty and Support</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Warranty certificates and terms</li>
                          <li>• Maintenance schedule and requirements</li>
                          <li>• Service contact information</li>
                          <li>• Spare parts information</li>
                          <li>• Software update procedures</li>
                        </ul>
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
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Quick Check</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="font-medium text-white">Test your understanding with these quick questions:</p>
              
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <p className="font-medium text-white mb-2">1. When must the customer receive their installation certificate?</p>
                  <p className="text-sm text-gray-400">Answer: Within 28 days of installation completion, as required by BS 7671</p>
                </div>
                
                <div className="bg-card/80 p-4 rounded-lg">
                  <p className="font-medium text-white mb-2">2. What are the four main sections of an Electrical Installation Certificate?</p>
                  <p className="text-sm text-gray-400">Answer: 1) Installation Details, 2) Design and Construction, 3) Inspection and Testing, 4) Declaration and Signatures</p>
                </div>
                
                <div className="bg-card/80 p-4 rounded-lg">
                  <p className="font-medium text-white mb-2">3. Which regulation makes installation certificates mandatory?</p>
                  <p className="text-sm text-gray-400">Answer: Building Regulations Part P and BS 7671</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Examples */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Real World Examples</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3">Case Study 1: Residential Installation Documentation</h4>
                <p className="text-sm mb-3">Single-phase 7kW home charger installation requiring complete certification package.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-yellow-400 mb-2">Certificate Details</h5>
                    <ul className="text-sm space-y-1">
                      <li>• New circuit installation from consumer unit</li>
                      <li>• 32A Type B MCB and 30mA Type A RCD</li>
                      <li>• 6mm² T&E cable installation</li>
                      <li>• External wall-mounted charging unit</li>
                      <li>• All tests satisfactory and recorded</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-yellow-400 mb-2">Handover Package</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Installation certificate and test results</li>
                      <li>• Manufacturer's user manual</li>
                      <li>• Mobile app setup instructions</li>
                      <li>• 5-year warranty documentation</li>
                      <li>• Annual service reminder card</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3">Case Study 2: Commercial Installation Certification</h4>
                <p className="text-sm mb-3">Multi-unit commercial car park with six 22kW charging points requiring comprehensive documentation.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-yellow-400 mb-2">Complex Certification</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Three-phase supply modifications</li>
                      <li>• Multiple circuit installations</li>
                      <li>• Load management system integration</li>
                      <li>• Network communications setup</li>
                      <li>• Emergency isolation arrangements</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-yellow-400 mb-2">Documentation Requirements</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Individual certificates for each charging point</li>
                      <li>• System commissioning documentation</li>
                      <li>• Network configuration records</li>
                      <li>• Maintenance contract details</li>
                      <li>• Staff training records</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3">Case Study 3: Public DC Fast Charging Installation</h4>
                <p className="text-sm mb-3">High-power 150kW DC fast charging installation requiring specialized documentation.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-yellow-400 mb-2">Specialized Requirements</h5>
                    <ul className="text-sm space-y-1">
                      <li>• HV supply connection certification</li>
                      <li>• DC isolation and protection verification</li>
                      <li>• Communication protocol testing</li>
                      <li>• Safety system integration testing</li>
                      <li>• Environmental protection compliance</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-yellow-400 mb-2">Extended Documentation</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Network operator approval certificates</li>
                      <li>• Type testing compliance documentation</li>
                      <li>• Software configuration records</li>
                      <li>• Periodic inspection schedule</li>
                      <li>• Emergency response procedures</li>
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
            <CardContent className="text-gray-300 space-y-4">
              
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <p className="font-medium text-white mb-2">Q: Can the customer refuse to accept the installation certificate?</p>
                  <p className="text-sm">A: No, providing the certificate is a legal requirement. The customer must be informed that without it, they have no proof of compliance and may face insurance and legal issues. The installation is not complete until certificate handover.</p>
                </div>
                
                <div className="bg-card/80 p-4 rounded-lg">
                  <p className="font-medium text-white mb-2">Q: What happens if test results don't meet the required standards?</p>
                  <p className="text-sm">A: The installation cannot be certified until all test results are satisfactory. Investigate and rectify any failures, then retest. Only issue the certificate when all tests pass the required standards.</p>
                </div>
                
                <div className="bg-card/80 p-4 rounded-lg">
                  <p className="font-medium text-white mb-2">Q: How long should certificates and test results be retained?</p>
                  <p className="text-sm">A: Certificates and test results must be retained for the lifetime of the installation. Recommend customers keep copies in a safe place and consider digital backups for long-term storage.</p>
                </div>
                
                <div className="bg-card/80 p-4 rounded-lg">
                  <p className="font-medium text-white mb-2">Q: Is notification to Building Control always required?</p>
                  <p className="text-sm">A: Notification is required unless the work is carried out by a competent person registered with an approved scheme. Most EV charging installations by registered electricians are self-certifying under Building Regulations Part P.</p>
                </div>
                
                <div className="bg-card/80 p-4 rounded-lg">
                  <p className="font-medium text-white mb-2">Q: What if the customer loses their installation certificate?</p>
                  <p className="text-sm">A: The installer should retain copies and can issue duplicates. For registered installations, copies may be available from the relevant competent person scheme. Emphasize the importance of safe storage during handover.</p>
                </div>
                
                <div className="bg-card/80 p-4 rounded-lg">
                  <p className="font-medium text-white mb-2">Q: Are digital certificates acceptable?</p>
                  <p className="text-sm">A: Digital certificates are increasingly acceptable, but check with local Building Control and relevant authorities. Ensure digital documents are properly signed and cannot be altered. Provide both digital and hard copies when possible.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Award className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Section Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3">Key Takeaways</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Installation certificates are legal documents required by BS 7671 and Building Regulations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>All test results must be recorded accurately and completely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Customer documentation must be provided within 28 days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Comprehensive handover packages ensure customer safety and satisfaction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Proper documentation provides legal protection for installer and customer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Maintenance schedules and support information ensure ongoing safety</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
                <p className="text-green-200 text-sm">
                  <strong>Professional Excellence:</strong> Complete and accurate certification, thorough test 
                  documentation, and comprehensive handover packages represent the hallmark of professional 
                  installation practice. They ensure compliance, safety, and customer confidence while 
                  protecting both installer and customer interests.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <EVChargingModule6Section6Quiz />

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="../ev-charging-module-6-section-5">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Customer Walkthrough and Labelling
              </Button>
            </Link>
            <Link to="../ev-charging-module-6">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400">
                Complete Module 6
                <Award className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EVChargingModule6Section6;