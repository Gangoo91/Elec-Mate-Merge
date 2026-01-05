import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Scale, HelpCircle, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';
import BS7671Module6Section4Quiz from '@/components/upskilling/quiz/BS7671Module6Section4Quiz';

const BS7671Module6Section4 = () => {
  const [openInlineCheck, setOpenInlineCheck] = useState<string | null>(null);

  const toggleInlineCheck = (checkId: string) => {
    setOpenInlineCheck(openInlineCheck === checkId ? null : checkId);
  };

  return (
    <div className="min-h-screen bg-background">
      <div>
        <Link to="../bs7671-module-6">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <FileText className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                  Model Forms and Certification Overview
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  Module 6, Section 4
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 6.4
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                30 minutes
              </Badge>
            </div>
          </div>
          {/* Introduction */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                After inspection and testing, results must be formally documented. BS 7671 (Amendment 3) includes model forms for certification and reporting, which are mandatory for compliance. These aren't just "paperwork" — they are legal records proving that an installation has been checked, tested, and declared safe.
              </p>
              <p>
                Certificates also provide a baseline for future inspections and condition reporting, ensuring continued safety throughout the installation's operational life.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="mb-4">By the end of this section, you should be able to:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Identify the three main types of certification used under BS 7671</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Understand the purpose of EIC, MEIWC, and EICR forms</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Recognise what information must be included on each form</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Explain why certification is legally and professionally important</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* EIC Section */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-400" />
                1. Electrical Installation Certificate (EIC)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Required for all new installations or significant alterations involving new circuits. The EIC is the primary certificate demonstrating BS 7671 compliance.
              </p>
              
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">When EIC Must Be Issued</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• New electrical installations (domestic, commercial, industrial)</li>
                    <li>• Significant alterations including new circuit additions</li>
                    <li>• Consumer unit replacements or upgrades</li>
                    <li>• Major modifications affecting multiple circuits</li>
                    <li>• Any work creating new final circuits</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Required Content and Information</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Confirms design, construction, inspection, and testing comply with BS 7671</li>
                    <li>• Schedules of inspection with detailed visual inspection results</li>
                    <li>• Complete test results for all circuits and safety systems</li>
                    <li>• Circuit details including cable types, protective device ratings</li>
                    <li>• Signatures from designer, installer, and tester (may be same person)</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Professional Responsibilities</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Designer must be competent and sign to confirm design compliance</li>
                    <li>• Installer must be competent and confirm construction compliance</li>
                    <li>• Tester must be competent and verify inspection/testing compliance</li>
                    <li>• Each role requires appropriate technical knowledge and experience</li>
                    <li>• Single person may fulfil multiple roles if competent in each area</li>
                  </ul>
                </div>
              </div>

              {/* Interactive In-line Check */}
              <div className="mt-6">
                <Collapsible 
                  open={openInlineCheck === 'check1'} 
                  onOpenChange={() => toggleInlineCheck('check1')}
                >
                  <CollapsibleTrigger className="flex items-center gap-2 w-full bg-card p-4 rounded-lg hover:bg-card/50 transition-colors">
                    <HelpCircle className="h-5 w-5 text-yellow-400" />
                    <span className="text-white font-medium">In-line Check: When must an EIC be issued?</span>
                    <span className="ml-auto text-yellow-400">
                      {openInlineCheck === 'check1' ? '−' : '+'}
                    </span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="bg-green-900/20 border border-green-700/50 p-4 rounded-lg">
                      <p className="text-white font-medium mb-2">Answer: For all new installations or significant alterations involving new circuits</p>
                      <p className="text-white text-sm">
                        An EIC must be issued whenever a new electrical installation is completed or when significant alterations are made that involve creating new circuits. This includes new buildings, consumer unit replacements, and any major modifications that add new final circuits to an existing installation.
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>
          </Card>

          {/* MEIWC Section */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-yellow-400" />
                2. Minor Electrical Installation Works Certificate (MEIWC)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Used for small works such as adding a socket to an existing circuit. The MEIWC covers modifications where no new circuit is created.
              </p>
              
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Scope of MEIWC Works</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Adding socket outlets to existing ring or radial circuits</li>
                    <li>• Extending lighting circuits with additional points</li>
                    <li>• Adding fused connection units to existing circuits</li>
                    <li>• Replacing accessories without circuit modifications</li>
                    <li>• Small extensions not requiring new circuit protection</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Testing and Inspection Requirements</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Still requires inspection, testing, and confirmation of compliance</li>
                    <li>• Must verify existing circuit can accommodate additional load</li>
                    <li>• Confirmation that protective device ratings remain appropriate</li>
                    <li>• Earth fault loop impedance verification at new points</li>
                    <li>• RCD operation testing where applicable</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Competence Requirements</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Must be completed by a competent person</li>
                    <li>• Understanding of existing installation characteristics required</li>
                    <li>• Knowledge of load calculations and diversity factors</li>
                    <li>• Ability to verify continued compliance with BS 7671</li>
                    <li>• Same level of care required as for major works</li>
                  </ul>
                </div>
              </div>

              {/* Interactive In-line Check */}
              <div className="mt-6">
                <Collapsible 
                  open={openInlineCheck === 'check2'} 
                  onOpenChange={() => toggleInlineCheck('check2')}
                >
                  <CollapsibleTrigger className="flex items-center gap-2 w-full bg-card p-4 rounded-lg hover:bg-card/50 transition-colors">
                    <HelpCircle className="h-5 w-5 text-yellow-400" />
                    <span className="text-white font-medium">In-line Check: What certificate should be used for extending an existing lighting circuit by one point?</span>
                    <span className="ml-auto text-yellow-400">
                      {openInlineCheck === 'check2' ? '−' : '+'}
                    </span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="bg-green-900/20 border border-green-700/50 p-4 rounded-lg">
                      <p className="text-white font-medium mb-2">Answer: Minor Electrical Installation Works Certificate (MEIWC)</p>
                      <p className="text-white text-sm">
                        Adding a single lighting point to an existing circuit is considered minor works as it doesn't create a new circuit, only extends an existing one. The MEIWC is the appropriate certificate, but still requires proper testing and verification that the existing circuit can safely accommodate the additional load.
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>
          </Card>

          {/* EICR Section */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                3. Electrical Installation Condition Report (EICR)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Used to assess the safety of existing installations. The EICR identifies defects, departures from BS 7671, and safety risks using a standardised coding system.
              </p>
              
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Purpose and Applications</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Periodic inspection and testing of existing installations</li>
                    <li>• Pre-purchase surveys for property transactions</li>
                    <li>• Landlord compliance with rental property regulations</li>
                    <li>• Insurance requirements and risk assessments</li>
                    <li>• Workplace safety compliance inspections</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">EICR Coding System</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">C1</span>
                      <div>
                        <p className="text-white font-medium">Danger present (immediate action required)</p>
                        <p className="text-white text-sm">Installation unsafe, immediate remedial action required before continued use</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-bold">C2</span>
                      <div>
                        <p className="text-white font-medium">Potentially dangerous</p>
                        <p className="text-white text-sm">Urgent remedial action required to remove potential danger</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs font-bold">C3</span>
                      <div>
                        <p className="text-white font-medium">Improvement recommended</p>
                        <p className="text-white text-sm">Departure from current standards, improvement recommended</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-yellow-400 text-white px-2 py-1 rounded text-xs font-bold">FI</span>
                      <div>
                        <p className="text-white font-medium">Further investigation required</p>
                        <p className="text-white text-sm">Investigation required to determine if defect exists</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Inspection Intervals</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Domestic properties: typically 10 years, 5 years for rental properties</li>
                    <li>• Commercial premises: typically 5 years, may be shorter for high-risk environments</li>
                    <li>• Industrial installations: typically 3-5 years depending on environment</li>
                    <li>• Special locations may require annual or more frequent inspection</li>
                    <li>• Intervals may be adjusted based on installation condition and use</li>
                  </ul>
                </div>
              </div>

              {/* Interactive In-line Check */}
              <div className="mt-6">
                <Collapsible 
                  open={openInlineCheck === 'check3'} 
                  onOpenChange={() => toggleInlineCheck('check3')}
                >
                  <CollapsibleTrigger className="flex items-center gap-2 w-full bg-card p-4 rounded-lg hover:bg-card/50 transition-colors">
                    <HelpCircle className="h-5 w-5 text-yellow-400" />
                    <span className="text-white font-medium">In-line Check: What does a C2 code mean on an EICR?</span>
                    <span className="ml-auto text-yellow-400">
                      {openInlineCheck === 'check3' ? '−' : '+'}
                    </span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="bg-green-900/20 border border-green-700/50 p-4 rounded-lg">
                      <p className="text-white font-medium mb-2">Answer: Potentially dangerous - urgent remedial action required</p>
                      <p className="text-white text-sm">
                        A C2 code indicates a potentially dangerous condition that requires urgent remedial action to remove the potential danger. While not immediately dangerous like C1, C2 defects represent significant safety risks that must be addressed promptly to prevent potential harm.
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>
          </Card>

          {/* Legal and Professional Importance */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Scale className="h-5 w-5 text-yellow-400" />
                4. Legal and Professional Importance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Certification provides documented evidence of compliance, protects electricians legally, and satisfies regulatory requirements across multiple sectors.
              </p>
              
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Legal Protection and Evidence</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Certification provides documented evidence of BS 7671 compliance</li>
                    <li>• Protects electricians legally in the event of disputes or incidents</li>
                    <li>• Demonstrates due diligence and professional competence</li>
                    <li>• Essential evidence for insurance claims and legal proceedings</li>
                    <li>• Required for warranty protection and manufacturer compliance</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Regulatory and Compliance Requirements</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Required for landlords under electrical safety regulations</li>
                    <li>• Building control sign-off for notifiable works</li>
                    <li>• Insurance requirements for commercial and domestic properties</li>
                    <li>• Health and safety compliance in workplace environments</li>
                    <li>• Competent person scheme notification requirements</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Client and Business Benefits</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Certificates must be provided to client and retained for future reference</li>
                    <li>• Creates baseline for future maintenance and inspections</li>
                    <li>• Facilitates property sales and rental compliance</li>
                    <li>• Supports asset management and maintenance planning</li>
                    <li>• Demonstrates professional standards and quality assurance</li>
                  </ul>
                </div>
              </div>

              {/* Interactive In-line Check */}
              <div className="mt-6">
                <Collapsible 
                  open={openInlineCheck === 'check4'} 
                  onOpenChange={() => toggleInlineCheck('check4')}
                >
                  <CollapsibleTrigger className="flex items-center gap-2 w-full bg-card p-4 rounded-lg hover:bg-card/50 transition-colors">
                    <HelpCircle className="h-5 w-5 text-yellow-400" />
                    <span className="text-white font-medium">In-line Check: Why must clients always receive copies of completed certificates?</span>
                    <span className="ml-auto text-yellow-400">
                      {openInlineCheck === 'check4' ? '−' : '+'}
                    </span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="bg-green-900/20 border border-green-700/50 p-4 rounded-lg">
                      <p className="text-white font-medium mb-2">Answer: Legal requirement and for future reference and compliance</p>
                      <p className="text-white text-sm">
                        Clients must receive certificates as legal evidence of compliance, for insurance purposes, future maintenance planning, property transactions, and regulatory compliance (such as landlord requirements). The certificates also provide essential information for future electrical work and periodic inspections.
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>
          </Card>

          {/* Practical Guidance */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-yellow-400" />
                Practical Guidance
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>As an electrician:</p>
              
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Certificate Completion Standards</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Complete forms carefully, with no missing results or information</li>
                    <li>• Ensure all signatures, dates, and qualifications are clearly recorded</li>
                    <li>• Use clear, legible handwriting or preferably digital completion</li>
                    <li>• Cross-reference all circuit details with actual installation</li>
                    <li>• Include all relevant schedules and supporting documentation</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Professional Responsibility</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Never sign certificates unless you personally carried out or supervised the work</li>
                    <li>• Ensure you are competent for the specific type of work being certified</li>
                    <li>• Maintain professional indemnity insurance appropriate to your work scope</li>
                    <li>• Keep detailed records of your involvement in each certified installation</li>
                    <li>• Be prepared to justify and explain all certification decisions</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Digital Systems and Quality Control</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Use digital certification software where possible to reduce errors</li>
                    <li>• Implement peer review processes for critical or complex installations</li>
                    <li>• Maintain backup copies of all certificates and test results</li>
                    <li>• Regular calibration records for all test equipment used</li>
                    <li>• Version control for certificates to track any amendments</li>
                  </ul>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Document Management</h4>
                  <ul className="space-y-2 text-white text-sm">
                    <li>• Keep copies securely — certificates are legal documents</li>
                    <li>• Establish retention periods in line with business and legal requirements</li>
                    <li>• Ensure client receives original certificates promptly after completion</li>
                    <li>• Maintain confidentiality of client installation details</li>
                    <li>• Provide clear instructions to clients on certificate importance and storage</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Example */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Real World Example: Manchester Landlord Prosecution
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-400 mb-3">The Situation</h4>
                <p className="text-white text-sm mb-3">
                  A landlord in Manchester was prosecuted for failing to provide a valid EICR on a rental property. The property had been let for three years without any electrical safety certification, despite the legal requirement for five-yearly inspections in rental properties.
                </p>
                
                <h4 className="font-semibold text-yellow-400 mb-2">The Investigation</h4>
                <p className="text-white text-sm mb-3">
                  Following a tenant complaint about electrical problems, the local authority housing team conducted an inspection. When inspected by a qualified electrician, the installation was found to have several serious defects:
                </p>
                <ul className="space-y-1 text-white text-sm mb-3">
                  <li>• C1 defect: Exposed live parts in damaged consumer unit</li>
                  <li>• C2 defects: Multiple sockets without RCD protection</li>
                  <li>• C2 defect: Inadequate earthing and bonding arrangements</li>
                  <li>• Multiple C3 observations: Outdated wiring and accessories</li>
                </ul>

                <h4 className="font-semibold text-yellow-400 mb-2">Legal Consequences</h4>
                <p className="text-white text-sm mb-3">
                  Because no EICR certification had been issued, the landlord could not demonstrate compliance with BS 7671 or housing regulations. The consequences included:
                </p>
                <ul className="space-y-1 text-white text-sm mb-3">
                  <li>• £5,000 fine for failure to ensure electrical safety</li>
                  <li>• £3,000 additional penalty for lack of required documentation</li>
                  <li>• Prohibition order preventing further letting until compliance achieved</li>
                  <li>• Enforcement notice requiring immediate remedial works</li>
                  <li>• Legal costs and loss of rental income during remediation</li>
                </ul>

                <h4 className="font-semibold text-yellow-400 mb-2">The Electrical Contractor's Involvement</h4>
                <p className="text-white text-sm mb-3">
                  The electrical contractor called to carry out emergency repairs faced additional challenges:
                </p>
                <ul className="space-y-1 text-white text-sm mb-3">
                  <li>• No baseline documentation to understand installation history</li>
                  <li>• Unknown cable routes and circuit arrangements</li>
                  <li>• Uncertainty about previous modifications and their compliance</li>
                  <li>• Need for extensive investigation before safe remedial work could begin</li>
                </ul>

                <h4 className="font-semibold text-yellow-400 mb-2">Lessons Learned</h4>
                <ul className="space-y-1 text-white text-sm">
                  <li>• Regular EICR certification could have identified defects before they became dangerous</li>
                  <li>• Proper documentation saves time and cost during any future electrical work</li>
                  <li>• Certification provides legal protection for both landlords and tenants</li>
                  <li>• Cost of compliance is minimal compared to consequences of non-compliance</li>
                  <li>• Professional electricians play a crucial role in maintaining rental property safety</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>EIC – for new installations or major alterations</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>MEIWC – for minor works (no new circuit)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>EICR – for reporting on existing installations</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Certificates prove compliance, protect electricians legally, and provide a safety baseline</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Always provide copies to clients and keep accurate records</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <BS7671Module6Section4Quiz />

        </div>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link to="../bs7671-module-6-section-3">
              <Button
                variant="outline"
                className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-200 w-full sm:w-auto"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Testing Sequence
              </Button>
            </Link>
            <Link to="../bs7671-module-6-section-5">
              <Button
                className="bg-yellow-400 text-black hover:bg-yellow-400 transition-all duration-200 w-full sm:w-auto"
              >
                Next: Common Pitfalls
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BS7671Module6Section4;
