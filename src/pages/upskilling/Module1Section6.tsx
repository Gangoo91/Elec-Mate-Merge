import { ArrowLeft, BookOpen, FileText, AlertTriangle, CheckCircle, XCircle, Clock, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import TestDocumentationQuiz from '@/components/upskilling/TestDocumentationQuiz';

const Module1Section6 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../module-1">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-3">
          <Badge variant="secondary" className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30">
            Section 6
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Overview of Test Documentation
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Essential documentation requirements and certification procedures for electrical installations
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Quick Intro */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-yellow-400" />
                <CardTitle className="text-white">Quick Intro</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white leading-relaxed mb-4">
                This section introduces the core documents used to record the results of inspection and testing. 
                If it's not documented—it didn't happen.
              </p>
              <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                <p className="text-red-200 font-medium">
                  Remember: Proper documentation isn't just paperwork—it's your legal protection and proof of compliance with BS 7671.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                <CardTitle className="text-white">Learning Outcomes</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-4">By the end of this section, you'll be able to:</p>
              <ul className="space-y-2 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Identify the main types of test certificates and reports and their specific applications
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Understand when each form is used and the legal implications of each
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Recognise the importance of accurate and honest documentation for safety and legal compliance
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Understand the roles and responsibilities of different parties in the certification process
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Know the essential information that must be included on all electrical certificates
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-yellow-400" />
                <CardTitle className="text-white">Main Content</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Why Documentation Matters */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-yellow-400">1.</span>
                  Why Documentation Matters
                </h3>
                <div className="bg-card/50 p-4 rounded-lg space-y-3">
                  <p className="text-white">Test certificates are legal records that serve multiple critical purposes:</p>
                  <p className="text-white font-medium">Legal Protection:</p>
                  <ul className="space-y-1 text-white ml-4">
                    <li>• Demonstrate compliance with BS 7671 and Building Regulations</li>
                    <li>• Provide evidence that work was carried out by a competent person</li>
                    <li>• Protect against liability claims if accidents occur</li>
                    <li>• Required for insurance claims and legal proceedings</li>
                  </ul>
                  <p className="text-white font-medium">Practical Benefits:</p>
                  <ul className="space-y-1 text-white ml-4">
                    <li>• Enable future maintenance and additions to be planned safely</li>
                    <li>• Provide baseline information for periodic inspection and testing</li>
                    <li>• Help identify design intent and circuit arrangements</li>
                    <li>• Support property transactions and rental requirements</li>
                  </ul>
                  <div className="bg-amber-900/20 border border-amber-500/30 p-3 rounded mt-4">
                    <p className="text-amber-200">
                      <strong>Important:</strong> In court, if there's no certificate, the assumption is that proper testing wasn't carried out.
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-600" />

              {/* Electrical Installation Certificate */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-yellow-400">2.</span>
                  Electrical Installation Certificate (EIC)
                </h3>
                <div className="bg-card/50 p-4 rounded-lg space-y-4">
                  <p className="text-white font-medium">Used for new installations and major alterations:</p>
                  <ul className="space-y-1 text-white ml-4">
                    <li>• Complete new electrical installations</li>
                    <li>• New consumer units and distribution boards</li>
                    <li>• Complete rewires or significant circuit alterations</li>
                    <li>• New circuits added to existing installations</li>
                    <li>• Major additions like electric vehicle charging points</li>
                  </ul>
                  
                  <p className="text-white font-medium">Key sections include:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-card/50 p-3 rounded">
                      <p className="text-white font-medium mb-2">Design Section:</p>
                      <ul className="text-sm text-white space-y-1">
                        <li>• Circuit design details</li>
                        <li>• Cable calculations</li>
                        <li>• Protection coordination</li>
                        <li>• Special locations considerations</li>
                      </ul>
                    </div>
                    <div className="bg-card/50 p-3 rounded">
                      <p className="text-white font-medium mb-2">Test Results:</p>
                      <ul className="text-sm text-white space-y-1">
                        <li>• Continuity measurements</li>
                        <li>• Insulation resistance values</li>
                        <li>• Earth fault loop impedance</li>
                        <li>• RCD test results</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-blue-900/20 border border-yellow-400/30 p-3 rounded">
                    <p className="text-blue-200">
                      <strong>Note:</strong> An EIC requires three signatures: Designer, Installer, and Inspector & Tester (may be the same person).
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-600" />

              {/* Minor Electrical Installation Works Certificate */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-yellow-400">3.</span>
                  Minor Electrical Installation Works Certificate (MEIWC)
                </h3>
                <div className="bg-card/50 p-4 rounded-lg space-y-4">
                  <p className="text-white font-medium">Used for small-scale electrical work:</p>
                  <ul className="space-y-1 text-white ml-4">
                    <li>• Adding sockets to existing ring final circuits</li>
                    <li>• Installing additional lighting points on existing circuits</li>
                    <li>• Replacing accessories (switches, sockets) like-for-like</li>
                    <li>• Minor alterations that don't affect other circuits</li>
                  </ul>
                  
                  <div className="bg-amber-900/20 border border-amber-500/30 p-3 rounded">
                    <p className="text-amber-200 font-medium">What makes work "minor"?</p>
                    <ul className="text-amber-200 mt-2 space-y-1">
                      <li>• No new circuits created</li>
                      <li>• No alterations to existing protection</li>
                      <li>• No impact on other circuits' safety</li>
                      <li>• Limited scope of testing required</li>
                    </ul>
                  </div>
                  
                  <p className="text-white">
                    MEIWCs are streamlined but still legally binding. They require testing of the work carried out and 
                    verification that it doesn't adversely affect the existing installation.
                  </p>
                </div>
              </div>

              <Separator className="bg-gray-600" />

              {/* Electrical Installation Condition Report */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-yellow-400">4.</span>
                  Electrical Installation Condition Report (EICR)
                </h3>
                <div className="bg-card/50 p-4 rounded-lg space-y-4">
                  <p className="text-white font-medium">Used for periodic inspection of existing installations:</p>
                  <ul className="space-y-1 text-white ml-4">
                    <li>• Rental properties (required every 5 years by law)</li>
                    <li>• Commercial premises (typically every 5 years)</li>
                    <li>• Industrial installations (frequency varies)</li>
                    <li>• Change of occupancy or property sales</li>
                    <li>• Insurance requirements</li>
                  </ul>
                  
                  <p className="text-gray-300 font-medium">Observation codes used in EICRs:</p>
                  <div className="grid gap-3">
                    <div className="bg-red-900/20 border border-red-500/30 p-3 rounded">
                      <p className="text-red-300 font-bold">C1 - Danger Present</p>
                      <p className="text-red-200 text-sm">Risk of injury exists. Immediate remedial action required.</p>
                    </div>
                    <div className="bg-orange-900/20 border border-orange-500/30 p-3 rounded">
                      <p className="text-orange-300 font-bold">C2 - Potentially Dangerous</p>
                      <p className="text-orange-200 text-sm">Urgent remedial action required to remove potential danger.</p>
                    </div>
                    <div className="bg-yellow-900/20 border border-yellow-400/30 p-3 rounded">
                      <p className="text-yellow-300 font-bold">C3 - Improvement Recommended</p>
                      <p className="text-yellow-200 text-sm">Improvement would enhance safety, though not immediately dangerous.</p>
                    </div>
                    <div className="bg-blue-900/20 border border-yellow-400/30 p-3 rounded">
                      <p className="text-blue-300 font-bold">FI - Further Investigation</p>
                      <p className="text-blue-200 text-sm">Investigation required to determine if a code is necessary.</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-600" />

              {/* Key Document Features */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-yellow-400">5.</span>
                  Essential Information Required on All Certificates
                </h3>
                <div className="bg-card/50 p-4 rounded-lg space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-card/50 p-3 rounded">
                      <p className="text-white font-medium mb-2">Installation Details:</p>
                      <ul className="text-sm text-white space-y-1">
                        <li>• Full installation address</li>
                        <li>• Description of work carried out</li>
                        <li>• Installation use (domestic, commercial, etc.)</li>
                        <li>• Earthing arrangements</li>
                        <li>• Main switch/protective device details</li>
                      </ul>
                    </div>
                    <div className="bg-card/50 p-3 rounded">
                      <p className="text-white font-medium mb-2">Test Information:</p>
                      <ul className="text-sm text-white space-y-1">
                        <li>• Test results and values</li>
                        <li>• Test methods used</li>
                        <li>• Test equipment details</li>
                        <li>• Date of testing</li>
                        <li>• Next inspection date</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-green-900/20 border border-green-500/30 p-3 rounded">
                    <p className="text-green-200 font-medium">Competent Person Requirements:</p>
                    <ul className="text-green-200 mt-2 space-y-1">
                      <li>• Must be qualified and experienced</li>
                      <li>• Must have appropriate test equipment</li>
                      <li>• Must understand BS 7671 requirements</li>
                      <li>• Signature makes them legally responsible</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-600" />

              {/* Record Keeping and Retention */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-yellow-400">6.</span>
                  Record Keeping and Retention
                </h3>
                <div className="bg-card/50 p-4 rounded-lg space-y-3">
                  <p className="text-white font-medium">Who should keep copies?</p>
                  <ul className="space-y-1 text-white ml-4">
                    <li>• Person responsible for the installation (building owner/occupier)</li>
                    <li>• Electrical contractor who carried out the work</li>
                    <li>• Building Control (for notifiable work under Part P)</li>
                    <li>• Competent Person Scheme operator (if applicable)</li>
                  </ul>
                  
                  <p className="text-white font-medium">Retention periods:</p>
                  <ul className="space-y-1 text-white ml-4">
                    <li>• Installation certificates: Life of the installation</li>
                    <li>• EICR reports: Until the next inspection</li>
                    <li>• Test records: Minimum 7 years for commercial liability</li>
                  </ul>
                  
                  <div className="bg-purple-900/20 border border-purple-500/30 p-3 rounded">
                    <p className="text-purple-200">
                      <strong>Best Practice:</strong> Keep digital copies as backup and ensure they're accessible to future contractors and inspectors.
                    </p>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Multiple Scenarios */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <CardTitle className="text-white">Practical Scenarios</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-900/20 border border-yellow-400/30 p-4 rounded-lg">
                <p className="text-white mb-3 font-medium">
                  Scenario 1: You extend a ring final circuit in a kitchen and test it thoroughly. Do you issue an EIC or MEIWC?
                </p>
                <div className="bg-green-900/20 border border-green-500/30 p-3 rounded">
                  <p className="text-green-300 font-medium">Answer:</p>
                  <p className="text-green-200">
                    MEIWC – the work is minor and doesn't impact the safety of other parts of the installation.
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-900/20 border border-yellow-400/30 p-4 rounded-lg">
                <p className="text-white mb-3 font-medium">
                  Scenario 2: A landlord asks for an electrical certificate for a rental property that hasn't been inspected for 7 years.
                </p>
                <div className="bg-green-900/20 border border-green-500/30 p-3 rounded">
                  <p className="text-green-300 font-medium">Answer:</p>
                  <p className="text-green-200">
                    EICR – this is periodic inspection of an existing installation. The landlord is legally required to have this done every 5 years.
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-900/20 border border-yellow-400/30 p-4 rounded-lg">
                <p className="text-white mb-3 font-medium">
                  Scenario 3: You install a new consumer unit in a house built in 1960.
                </p>
                <div className="bg-green-900/20 border border-green-500/30 p-3 rounded">
                  <p className="text-green-300 font-medium">Answer:</p>
                  <p className="text-green-200">
                    EIC – installing a new consumer unit is major work requiring full testing and certification of the entire installation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Mistakes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-yellow-400" />
                <CardTitle className="text-white">Common Documentation Mistakes</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-red-900/20 border border-red-500/30 p-3 rounded">
                  <p className="text-red-300 font-medium">❌ Signing certificates for work you didn't do or verify</p>
                  <p className="text-red-200 text-sm">This is illegal and makes you liable for someone else's work.</p>
                </div>
                <div className="bg-red-900/20 border border-red-500/30 p-3 rounded">
                  <p className="text-red-300 font-medium">❌ Using generic or estimated test results</p>
                  <p className="text-red-200 text-sm">All values must be actual measured results from proper testing.</p>
                </div>
                <div className="bg-red-900/20 border border-red-500/30 p-3 rounded">
                  <p className="text-red-300 font-medium">❌ Incomplete or illegible documentation</p>
                  <p className="text-red-200 text-sm">Missing information or poor handwriting can invalidate certificates.</p>
                </div>
                <div className="bg-red-900/20 border border-red-500/30 p-3 rounded">
                  <p className="text-red-300 font-medium">❌ Not providing copies to the right people</p>
                  <p className="text-red-200 text-sm">Building Control, customers, and scheme operators all need appropriate copies.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Industry Standards */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-400" />
                <CardTitle className="text-white">Industry Standards & Digital Solutions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-white">Modern electrical testing increasingly uses digital solutions:</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card/50 p-3 rounded">
                  <p className="text-white font-medium mb-2">Digital Certificates:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>• Faster completion and distribution</li>
                    <li>• Automatic calculations and validations</li>
                    <li>• Better legibility and professional appearance</li>
                    <li>• Easier storage and retrieval</li>
                  </ul>
                </div>
                <div className="bg-card/50 p-3 rounded">
                  <p className="text-white font-medium mb-2">Cloud Storage Benefits:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>• Secure backup and access from anywhere</li>
                    <li>• Easy sharing with relevant parties</li>
                    <li>• Audit trails and version control</li>
                    <li>• Integration with test equipment</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-green-900/20 border border-green-500/30 p-3 rounded">
                <p className="text-green-200">
                  <strong>Future-proofing:</strong> Digital solutions help ensure compliance with evolving regulations and industry standards.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Key Takeaways */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                <CardTitle className="text-white">Key Takeaways</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-white">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Test documentation is legally required and must be accurate—it's your primary protection against liability
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Use EIC for major work, MEIWC for minor additions, and EICR for periodic inspections
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  All certificates must include actual test results, proper descriptions, and competent person signatures
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Never sign a certificate unless you personally completed or verified the testing—this makes you legally responsible
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Proper record keeping and distribution ensures compliance and protects all parties involved
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  Digital solutions can improve accuracy, efficiency, and long-term accessibility of test documentation
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Quick Knowledge Checks */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                Quick Knowledge Checks
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-400/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 1: EIC vs EICR</h4>
                  <p className="text-sm">When do you use an EIC vs an EICR?</p>
                  <details className="mt-2">
                    <summary className="text-yellow-400 cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">EIC: New installations/major work. EICR: Periodic inspection of existing installations</p>
                  </details>
                </div>
                <div className="bg-green-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 2: Observation Codes</h4>
                  <p className="text-sm">What does a C1 observation code indicate?</p>
                  <details className="mt-2">
                    <summary className="text-yellow-400 cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">Danger present - immediate remedial action required</p>
                  </details>
                </div>
                <div className="bg-purple-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 3: MEIWC Usage</h4>
                  <p className="text-sm">Can a MEIWC be used for installing a new consumer unit?</p>
                  <details className="mt-2">
                    <summary className="text-yellow-400 cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">No - this is major work requiring an EIC</p>
                  </details>
                </div>
                <div className="bg-orange-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 4: Record Retention</h4>
                  <p className="text-sm">How long should installation certificates be kept?</p>
                  <details className="mt-2">
                    <summary className="text-yellow-400 cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">Life of the installation</p>
                  </details>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Frequently Asked Questions */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="space-y-4">
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: What happens if I lose an electrical certificate?</h4>
                  <p className="text-sm text-white">A: Contact the original installer or competent person who issued it. If unavailable, you may need a new inspection and test to generate replacement documentation. Some scheme operators keep copies that may be retrievable.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: Can I modify or correct a certificate after signing it?</h4>
                  <p className="text-sm text-white">A: No, signed certificates cannot be altered. If errors are discovered, a new certificate must be issued. Any changes should be documented and the original marked as superseded.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: Who needs to receive copies of electrical certificates?</h4>
                  <p className="text-sm text-white">A: The person ordering the work, the installation owner/occupier, Building Control (for notifiable work), and the competent person/contractor should retain copies. Landlords must provide copies to tenants within 28 days of EICR completion.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: What if I find dangerous conditions during inspection?</h4>
                  <p className="text-sm text-white">A: Code as C1 (danger present), advise immediate isolation if safe to do so, inform the responsible person in writing, and ensure the installation is not used until made safe. Document everything clearly on the EICR.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: Is a schedule of test results always required?</h4>
                  <p className="text-sm text-white">A: Yes, for EICs and EICRs. The schedule provides the detailed test results that support the certificate. It's an integral part of the certification process and must be completed accurately.</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Q: Can I use electronic certificates instead of paper ones?</h4>
                  <p className="text-sm text-white">A: Yes, electronic certificates are acceptable provided they include all required information, are properly secured against tampering, and can be printed or stored permanently. Many scheme operators now provide electronic certificate systems.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Certification Mistakes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <XCircle className="h-6 w-6 text-red-400" />
                Common Certification Mistakes to Avoid
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">❌ Incomplete Information</h4>
                  <p className="text-sm">Missing installation details, test results, or next inspection dates makes certificates legally incomplete.</p>
                </div>
                <div className="bg-red-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">❌ Wrong Certificate Type</h4>
                  <p className="text-sm">Using MEIWC for major work or EIC for minor work invalidates the certification process.</p>
                </div>
                <div className="bg-red-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">❌ Inadequate Testing</h4>
                  <p className="text-sm">Skipping required tests or using incorrect test methods compromises safety assessment.</p>
                </div>
                <div className="bg-red-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">❌ Delayed Certification</h4>
                  <p className="text-sm">Issuing certificates long after work completion may not reflect actual installation condition.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Scenario */}
          <Card className="bg-yellow-400/10 border-blue-600/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-yellow-400" />
                Real-World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-yellow-400/20 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Scenario: EICR Discovers Multiple Issues</h4>
                <p className="text-sm mb-3">
                  During a rental property EICR, you discover: loose connections at the consumer unit (C2), missing RCD protection for bathroom circuits (C2), damaged cable in the garage (C1), and old rubber cable that should be replaced (C3). The landlord wants a "satisfactory" report to avoid tenant issues.
                </p>
                <h5 className="text-white font-semibold mb-2">Certification Requirements:</h5>
                <ul className="text-sm space-y-1">
                  <li>• C1 findings mean "unsatisfactory" overall condition</li>
                  <li>• All defects must be accurately coded regardless of pressure</li>
                  <li>• Remedial work schedule must clearly identify urgent items</li>
                  <li>• Professional integrity requires honest reporting</li>
                  <li>• Tenant safety takes absolute priority over commercial considerations</li>
                </ul>
                <div className="mt-3 p-3 bg-yellow-600/20 rounded">
                  <p className="text-xs"><strong>Correct Action:</strong> Issue an "unsatisfactory" EICR with all defects properly coded. Explain legal obligations and liability risks. Provide clear guidance on immediate actions required for C1 items.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-yellow-400" />
                <CardTitle className="text-white">Test Your Knowledge - 10 Questions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-4">
                Complete this comprehensive quiz to test your understanding of electrical test documentation and certification requirements:
              </p>
              <TestDocumentationQuiz />
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default Module1Section6;
