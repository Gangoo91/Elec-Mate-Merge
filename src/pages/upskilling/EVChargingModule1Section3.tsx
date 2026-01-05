import { ArrowLeft, ArrowRight, Users, Shield, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import { evModule1Section1Questions } from '@/data/upskilling/evChargingQuizzes';

const EVChargingModule1Section3 = () => {
  const quizQuestions = evModule1Section1Questions?.slice(3, 6)?.map(q => ({
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
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  Installer Responsibilities and Regulations
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  Professional duties and regulatory compliance for EV charging
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                Section 3
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Installing EV charging equipment carries significant professional responsibilities that extend far beyond basic electrical work. Installers must navigate complex regulations, ensure safety compliance, and maintain professional standards throughout the installation lifecycle.
              </p>
              <div className="bg-red-900/30 p-4 rounded-lg border-l-4 border-red-500">
                <p className="text-red-200">
                  <strong className="text-red-300">Critical Responsibility:</strong> EV charging installations operate at high power levels with potentially lethal voltages. Professional competence, regulatory compliance, and safety awareness are non-negotiable requirements.
                </p>
              </div>
              <p>
                This section outlines the essential responsibilities, legal requirements, and professional duties that all EV charging installers must understand and fulfil.
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
                  <span>Identify key legal responsibilities for EV charging installers</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <span>Understand competent person scheme requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <span>Apply appropriate risk assessment and safety procedures</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <span>Complete proper documentation and certification requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <span>Recognise ongoing maintenance and inspection responsibilities</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Legal Framework and Professional Requirements</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-card p-4 rounded-lg mb-4 border-l-4 border-yellow-400">
                <h4 className="text-yellow-400 font-semibold mb-3">Understanding Your Legal Position</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg border border-red-500">
                  <h5 className="text-red-300 font-bold mb-4">Primary Legal Obligations</h5>
                  <div className="space-y-3">
                    <div className="bg-red-900/20 p-3 rounded">
                      <h6 className="text-red-200 font-semibold mb-2">Health & Safety at Work Act 1974:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Duty of care to employees and public</li>
                        <li>• Risk assessment and control measures</li>
                        <li>• Safe systems of work implementation</li>
                        <li>• Provision of adequate training and supervision</li>
                        <li>• Maintenance of safe working environment</li>
                      </ul>
                    </div>
                    <div className="bg-red-900/20 p-3 rounded">
                      <h6 className="text-red-200 font-semibold mb-2">Electricity at Work Regulations 1989:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Competence requirement for electrical work</li>
                        <li>• Proper construction and maintenance of systems</li>
                        <li>• Safe working practices and procedures</li>
                        <li>• Adequate precautions against electrical danger</li>
                        <li>• Regular inspection and testing requirements</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-yellow-400">
                  <h5 className="text-blue-300 font-bold mb-4">Building Regulations Compliance</h5>
                  <div className="space-y-3">
                    <div className="bg-blue-900/20 p-3 rounded">
                      <h6 className="text-blue-200 font-semibold mb-2">Part P Requirements:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Notification to Building Control for new circuits</li>
                        <li>• Self-certification via competent person schemes</li>
                        <li>• Installation certificates and documentation</li>
                        <li>• Compliance with BS 7671 wiring regulations</li>
                        <li>• Inspection and testing obligations</li>
                      </ul>
                    </div>
                    <div className="bg-blue-900/20 p-3 rounded">
                      <h6 className="text-blue-200 font-semibold mb-2">Approved Document P:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Definition of notifiable electrical work</li>
                        <li>• Competency requirements specification</li>
                        <li>• Testing and inspection procedures</li>
                        <li>• Certification and record keeping</li>
                        <li>• Third-party inspection alternatives</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-400">
                <h5 className="text-yellow-300 font-semibold mb-2">Professional Indemnity and Insurance</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h6 className="text-yellow-200 font-medium mb-2">Essential Coverage:</h6>
                    <ul className="space-y-1">
                      <li>• Public liability (minimum £2M recommended)</li>
                      <li>• Professional indemnity insurance</li>
                      <li>• Employer's liability (if employing staff)</li>
                      <li>• Product liability for equipment defects</li>
                      <li>• Cyber liability for smart charging systems</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-yellow-200 font-medium mb-2">Risk Considerations:</h6>
                    <ul className="space-y-1">
                      <li>• High-value property damage potential</li>
                      <li>• Personal injury from electrical faults</li>
                      <li>• Business interruption claims</li>
                      <li>• Design and specification errors</li>
                      <li>• Data breach and privacy violations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Competent Person Schemes and Qualifications</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-card p-4 rounded-lg mb-4 border-l-4 border-yellow-400">
                <h4 className="text-yellow-400 font-semibold mb-3">Demonstrating Professional Competence</h4>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-card p-4 rounded-lg border border-green-500">
                  <h5 className="text-green-300 font-bold mb-3 text-lg">NICEIC</h5>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-yellow-400 font-medium">Scope:</span>
                      <p className="mt-1">Approved contractor and domestic installer schemes covering EV charging installations</p>
                    </div>
                    <div>
                      <span className="text-yellow-400 font-medium">Requirements:</span>
                      <ul className="mt-1 space-y-1">
                        <li>• Level 3 electrical qualification minimum</li>
                        <li>• 18th Edition BS 7671 certification</li>
                        <li>• Inspection and Testing (2391-52) qualification</li>
                        <li>• EV charging specific training</li>
                        <li>• Annual assessment and technical monitoring</li>
                      </ul>
                    </div>
                    <div className="bg-green-900/30 p-2 rounded text-xs">
                      <strong>Benefits:</strong> Self-certification, reduced insurance premiums, marketing support
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-yellow-400">
                  <h5 className="text-blue-300 font-bold mb-3 text-lg">NAPIT</h5>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-yellow-400 font-medium">Scope:</span>
                      <p className="mt-1">Electrical and EV charging competent person scheme with flexible membership options</p>
                    </div>
                    <div>
                      <span className="text-yellow-400 font-medium">Requirements:</span>
                      <ul className="mt-1 space-y-1">
                        <li>• NVQ Level 3 or equivalent experience</li>
                        <li>• Current 18th Edition certification</li>
                        <li>• Testing and inspection competence</li>
                        <li>• EV charging installation training</li>
                        <li>• Continuous professional development</li>
                      </ul>
                    </div>
                    <div className="bg-blue-900/30 p-2 rounded text-xs">
                      <strong>Benefits:</strong> Comprehensive support, technical helpline, business development
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-purple-500">
                  <h5 className="text-purple-300 font-bold mb-3 text-lg">ECA/JIB</h5>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-yellow-400 font-medium">Scope:</span>
                      <p className="mt-1">Trade association schemes focusing on contractor competence and professional standards</p>
                    </div>
                    <div>
                      <span className="text-yellow-400 font-medium">Requirements:</span>
                      <ul className="mt-1 space-y-1">
                        <li>• Appropriate electrical qualifications</li>
                        <li>• Industry recognised training certificates</li>
                        <li>• Health and safety competence</li>
                        <li>• Business and technical insurance</li>
                        <li>• Regular competence monitoring</li>
                      </ul>
                    </div>
                    <div className="bg-purple-900/30 p-2 rounded text-xs">
                      <strong>Benefits:</strong> Industry recognition, networking, technical support
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <h5 className="text-yellow-400 font-semibold mb-3">Additional Competency Requirements</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="text-white font-medium mb-2">EV-Specific Training:</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• OZEV approved installer training courses</li>
                      <li>• Manufacturer-specific installation training</li>
                      <li>• Smart charging and load management systems</li>
                      <li>• Grid connection procedures (G98/G99)</li>
                      <li>• Renewable energy integration</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-white font-medium mb-2">Ongoing Development:</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Annual CPD requirements</li>
                      <li>• Technology update training</li>
                      <li>• Regulatory change awareness</li>
                      <li>• Safety practice refreshers</li>
                      <li>• Business development support</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-green-600 mt-4">
                <h5 className="text-green-300 font-semibold mb-3">OZEV Approved Installer Scheme</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="text-green-200 font-medium mb-2">Registration Requirements:</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• MCS or equivalent certification</li>
                      <li>• Valid electrical qualification (Level 3+)</li>
                      <li>• 18th Edition certification (current)</li>
                      <li>• Inspection & Testing qualification</li>
                      <li>• Appropriate insurance coverage</li>
                      <li>• Annual compliance monitoring</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-green-200 font-medium mb-2">Scheme Benefits:</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• Grant application eligibility</li>
                      <li>• Government scheme participation</li>
                      <li>• Customer confidence building</li>
                      <li>• Technical support access</li>
                      <li>• Market differentiation</li>
                      <li>• Professional recognition</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Risk Assessment and Safety Procedures</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-card p-4 rounded-lg mb-4 border-l-4 border-yellow-400">
                <h4 className="text-yellow-400 font-semibold mb-3">Systematic Approach to Safety Management</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg border border-red-500">
                  <h5 className="text-red-300 font-bold mb-4">Pre-Installation Risk Assessment</h5>
                  <div className="space-y-3">
                    <div className="bg-red-900/20 p-3 rounded">
                      <h6 className="text-red-200 font-semibold mb-2">Site-Specific Hazards:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Existing electrical installation condition</li>
                        <li>• Working at height requirements</li>
                        <li>• Confined space or restricted access</li>
                        <li>• Underground services and utilities</li>
                        <li>• Environmental conditions and weather</li>
                        <li>• Public access and traffic management</li>
                      </ul>
                    </div>
                    <div className="bg-red-900/20 p-3 rounded">
                      <h6 className="text-red-200 font-semibold mb-2">Electrical Safety Considerations:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Live working elimination where possible</li>
                        <li>• Isolation and lock-off procedures</li>
                        <li>• Voltage testing and proving</li>
                        <li>• Personal protective equipment requirements</li>
                        <li>• Emergency procedures and first aid</li>
                        <li>• Arc flash and shock protection</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-green-500">
                  <h5 className="text-green-300 font-bold mb-4">Safe Systems of Work</h5>
                  <div className="space-y-3">
                    <div className="bg-green-900/20 p-3 rounded">
                      <h6 className="text-green-200 font-semibold mb-2">Method Statements:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Step-by-step installation procedures</li>
                        <li>• Tool and equipment requirements</li>
                        <li>• Safety precautions at each stage</li>
                        <li>• Emergency response procedures</li>
                        <li>• Quality control checkpoints</li>
                        <li>• Client communication protocols</li>
                      </ul>
                    </div>
                    <div className="bg-green-900/20 p-3 rounded">
                      <h6 className="text-green-200 font-semibold mb-2">Permit to Work Systems:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• High-risk activity identification</li>
                        <li>• Isolation and energy control</li>
                        <li>• Competent person authorisation</li>
                        <li>• Work completion verification</li>
                        <li>• System reinstatement procedures</li>
                        <li>• Documentation and record keeping</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-500">
                <h5 className="text-orange-300 font-semibold mb-2">CDM Regulations 2015 Compliance</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h6 className="text-orange-200 font-medium mb-2">Designer Duties:</h6>
                    <ul className="space-y-1">
                      <li>• Eliminate risks in design phase</li>
                      <li>• Reduce remaining risks</li>
                      <li>• Provide design risk information</li>
                      <li>• Coordinate with other designers</li>
                      <li>• Check client awareness of duties</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-orange-200 font-medium mb-2">Contractor Obligations:</h6>
                    <ul className="space-y-1">
                      <li>• Plan, manage and monitor work</li>
                      <li>• Check worker competence</li>
                      <li>• Ensure adequate welfare facilities</li>
                      <li>• Provide information and training</li>
                      <li>• Cooperate with others</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-orange-200 font-medium mb-2">Documentation Requirements:</h6>
                    <ul className="space-y-1">
                      <li>• Construction phase plans</li>
                      <li>• Risk assessment records</li>
                      <li>• Method statement documentation</li>
                      <li>• Competence evidence</li>
                      <li>• Health and safety file</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Documentation and Certification Requirements</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-card p-4 rounded-lg mb-4 border-l-4 border-yellow-400">
                <h4 className="text-yellow-400 font-semibold mb-3">Essential Paperwork and Record Keeping</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg border border-yellow-400">
                  <h5 className="text-blue-300 font-bold mb-4">Installation Certificates</h5>
                  <div className="space-y-4">
                    <div className="bg-blue-900/20 p-3 rounded">
                      <h6 className="text-blue-200 font-semibold mb-2">Electrical Installation Certificate (EIC):</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Required for all new circuits</li>
                        <li>• Design, construction and inspection details</li>
                        <li>• Schedule of test results</li>
                        <li>• Departure from BS 7671 if applicable</li>
                        <li>• Installer and inspector signatures</li>
                      </ul>
                    </div>
                    <div className="bg-blue-900/20 p-3 rounded">
                      <h6 className="text-blue-200 font-semibold mb-2">Minor Electrical Installation Works Certificate:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• For additions to existing circuits</li>
                        <li>• Limited scope installation work</li>
                        <li>• Essential test results documentation</li>
                        <li>• Circuit protection verification</li>
                        <li>• Single person certification allowed</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-green-500">
                  <h5 className="text-green-300 font-bold mb-4">Testing and Inspection Documentation</h5>
                  <div className="space-y-4">
                    <div className="bg-green-900/20 p-3 rounded">
                      <h6 className="text-green-200 font-semibold mb-2">Initial Verification Tests:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Continuity of protective conductors</li>
                        <li>• Continuity of ring final circuits</li>
                        <li>• Insulation resistance testing</li>
                        <li>• Protection by SELV/PELV/electrical separation</li>
                        <li>• RCD operation and effectiveness</li>
                        <li>• Polarity verification</li>
                      </ul>
                    </div>
                    <div className="bg-green-900/20 p-3 rounded">
                      <h6 className="text-green-200 font-semibold mb-2">EV-Specific Testing:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Type B RCD operation (if fitted)</li>
                        <li>• PME earthing arrangements</li>
                        <li>• Charging unit functionality</li>
                        <li>• Communication systems testing</li>
                        <li>• Load management verification</li>
                        <li>• Emergency isolation testing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500">
                <h5 className="text-purple-300 font-semibold mb-3">Additional Documentation Requirements</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h6 className="text-purple-200 font-medium mb-2">Building Control:</h6>
                    <ul className="space-y-1">
                      <li>• Building Regulations compliance certificate</li>
                      <li>• Competent person self-certification</li>
                      <li>• Third-party inspection reports</li>
                      <li>• Remedial work certificates</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-purple-200 font-medium mb-2">DNO Notifications:</h6>
                    <ul className="space-y-1">
                      <li>• G98 application (&lt;16A per phase)</li>
                      <li>• G99 application (&gt;16A per phase)</li>
                      <li>• Connection agreement documentation</li>
                      <li>• Commissioning certificates</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-purple-200 font-medium mb-2">Client Handover:</h6>
                    <ul className="space-y-1">
                      <li>• User manuals and instructions</li>
                      <li>• Warranty documentation</li>
                      <li>• Maintenance requirements</li>
                      <li>• Emergency contact information</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Ongoing Responsibilities and Maintenance</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="bg-card p-4 rounded-lg mb-4 border-l-4 border-yellow-400">
                <h4 className="text-yellow-400 font-semibold mb-3">Post-Installation Obligations</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card p-4 rounded-lg border border-orange-500">
                  <h5 className="text-orange-300 font-bold mb-4">Periodic Inspection and Testing</h5>
                  <div className="space-y-4">
                    <div className="bg-orange-900/20 p-3 rounded">
                      <h6 className="text-orange-200 font-semibold mb-2">Recommended Intervals:</h6>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Domestic installations:</span>
                          <span className="text-white">10 years</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Commercial workplace:</span>
                          <span className="text-white">5 years</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Public charging:</span>
                          <span className="text-white">1-3 years</span>
                        </div>
                        <div className="flex justify-between">
                          <span>High-usage locations:</span>
                          <span className="text-white">1 year</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-orange-900/20 p-3 rounded">
                      <h6 className="text-orange-200 font-semibold mb-2">Inspection Scope:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Visual inspection of all components</li>
                        <li>• Electrical testing and verification</li>
                        <li>• Mechanical integrity assessment</li>
                        <li>• Protection device functionality</li>
                        <li>• Software and firmware updates</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg border border-green-500">
                  <h5 className="text-green-300 font-bold mb-4">Maintenance Service Opportunities</h5>
                  <div className="space-y-4">
                    <div className="bg-green-900/20 p-3 rounded">
                      <h6 className="text-green-200 font-semibold mb-2">Service Contract Benefits:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Planned maintenance schedules</li>
                        <li>• Emergency breakdown response</li>
                        <li>• Software updates and upgrades</li>
                        <li>• Compliance monitoring and reporting</li>
                        <li>• Warranty extension services</li>
                        <li>• Performance optimisation</li>
                      </ul>
                    </div>
                    <div className="bg-green-900/20 p-3 rounded">
                      <h6 className="text-green-200 font-semibold mb-2">Revenue Opportunities:</h6>
                      <ul className="text-sm space-y-1">
                        <li>• Regular inspection contracts</li>
                        <li>• Maintenance service agreements</li>
                        <li>• Upgrade and expansion work</li>
                        <li>• Energy management consultancy</li>
                        <li>• Training and support services</li>
                        <li>• Technology refresh projects</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <div className="space-y-4">
                <p>
                  Professional responsibility in EV charging installation extends far beyond technical competence. It encompasses legal compliance, safety management, documentation, and ongoing service obligations that protect both installers and clients.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-900/30 p-4 rounded-lg border border-red-500">
                    <h5 className="text-red-300 font-semibold mb-2">Key Responsibilities:</h5>
                    <p className="text-red-200 text-sm">
                      Legal compliance, professional competence, safety management, proper documentation, and ongoing service obligations are all essential elements of professional practice.
                    </p>
                  </div>
                  <div className="bg-green-900/30 p-4 rounded-lg border border-green-500">
                    <h5 className="text-green-300 font-semibold mb-2">Business Benefits:</h5>
                    <p className="text-green-200 text-sm">
                      Professional compliance reduces liability, builds client confidence, creates service opportunities, and establishes competitive advantage in the growing EV market.
                    </p>
                  </div>
                </div>
                <p>
                  The regulatory framework provides structure and protection for professional electrical contractors. Understanding and embracing these responsibilities is essential for sustainable success in the EV charging sector.
                </p>
              </div>
            </CardContent>
          </Card>

          {quizQuestions.length > 0 && (
            <SingleQuestionQuiz 
              questions={quizQuestions}
              title="Section 3 Knowledge Check"
            />
          )}

          <div className="flex justify-between items-center pt-6">
            <Link to="../ev-charging-module-1-section-2">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../ev-charging-module-1-section-4">
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

export default EVChargingModule1Section3;